Datum.js
========

An opinionated data binding library.

The Basics Of Data Binding With Datum.js
---------------------------------------

###Initialisation
The two components of a web page built with Datum.js are the *template* and the *view model*. The template is the HTML between the `<body> </body>` tags before Datum.js has modified it. You the developer are responsible for putting the tempate in the body of the DOM. Datum.js is agnostic about how you do this. (If you're having trouble jQuery's [load](https://api.jquery.com/load/) method is a good option.)

The view model is a single JavaScript object that contains all of the data that will be displayed on the web page and all of the logic for interacting with the web page. You tell Datum.js what object this is by passing it to a constructor called `BindingRoot`.

    var viewModel = {};
    
    new BindingRoot(viewModel);
    
Declaring the binding root can be done only once, presumably as soon as the page loads.

###The View Model
The view model has two kinds of proprety, *data properties* and *bindings*. The data properties contain the data that define the state of the view model. The bindings are special objects that define how that data is displayed on the page. You can create a binding using the `Binding` constructor.

    var viewModel = {
    
        myDatum: "Hello world.",
        myBinding: new Binding();
    };
    
    new BindingRoot(viewModel);
    
###Binding Attributes

Each binding property has at least one corresponding *binding attribute* on the template. This attribute tells Datum.js which DOM element to bind each binding to. A Binding attribute is always called `data-bind` and its value is the name of the binding property in the view model.

    <body>
      <div data-bind="myBinding"></div>
    </body>

###Callbacks
The binding `myBinding` above will have no effect on the page. To make something happen you need to construct the binding with a callback. There are a few different callbacks you can use. The one called `text` is used to put text on the page.

    var viewModel = {
    
        myDatum: "Hello world.",
        myBinding: new Binding({
        
            text: function() { return this.myDatum; }
        });
    };
    
    new BindingRoot(viewModel);
    
###Text
As seen above, the *text callback* sets the text content of the elements to which it is bound. The callback can contain any logic so long as it returns the value which is to be displayed. If any of the data properties used in the body of the callback changes, the text callback will be reevaluated and the text on the page updated. In the example above you can change the text on the page by assigning to the `myDatum` proprety.

    viewModel.myDatum = "Eh up planet.";
    
The text callback has a parameter which is the element to which it is bound. You can also create a text binding using the `Text` constructor, but generally it is more useful to using the `Binding` constructor so you can also pass it some of the callbacks described below.

    var viewModel = {
    
        myDatum: "Hello world.",
        myBinding: new Text(function(element) { return this.myDatum; });
    };
    
    new BindingRoot(viewModel);
    
###Value
The *value callback* provides a two way binding between an `<input />` element and a data property. It is a single callback that is called when either a change event is triggered on the input element or one of the data dependencies of the callback changes. In the first case the value of the input element is passed as the first parameter to the callback. In the second case `undefined` is passed. The second parameter is always the element to which it is bound.

```
    <body>
      <input type="text" data-bind="myBinding" />
    </body>
```
```
    var viewModel = {
    
        myDatum: "Hello world.",
        myBinding: new Binding({
        
            value: function(value) { 
            
                if (value) {
                
                    this.myDatum = value;
                }
                
                return this.myDatum; 
            }
        });
    };
    
    new BindingRoot(viewModel);
```
A standard two way binding will have the above form, though of course you are free to experiment. There is also a `Value` constructor to which you can pass the callback directly.

###Click
The *click callback* is called whenever a click event is raised on an element to which it is bound. Again the element is passed as the first paramenter and there is also a `Click` constructor.

```
    <body>
      <button id="button-id" data-bind="myBinding"></button>
    </body>
```
```
    var viewModel = {
    
        myDatum: "The text on the button",
        myBinding: new Binding({
        
            text: function() { return this.myDatum; },
            click: function(element) { 
            
                alert("You just clicked the button with id " + element.id + ".");
            }
        });
    };
    
    new BindingRoot(viewModel);
```
###Init
The *init callback* is called when the binding is bound to an element. Afterwards the init callback will not be called again for that element, but will be called if the binding is bound to a new element, each time passing the bound element as the first parameter. If you want to manually attach event handlers to an element then this is a good place to do it.

###Update
The *update callback* does not react directly to any DOM event. It is called when the binding is first attached to an element and then again whenever one of its dependencies changes.

An import thing to understand is that unlike other bindings such as text and value, the dependencies of the update callback are registered only when it is first bound. For further details see the sections on dependency collection.

###Visible
The *visible callback* can be used to hide and show elements. If the callback returns false the element will have the style `display: none;` applied to it. If the callback returns true the display style will be set to the value it had when the element was first bound.
