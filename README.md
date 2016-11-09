# Datum.js

An opinionated data binding library.

## The Basics of Data Binding with Datum

### Initialisation

The two components of a web page built with Datum.js are the *template* and the *view model*.
The template is the HTML between the `<body> </body>` tags before Datum.js has modified it.
You the developer are responsible for putting the tempate in the body of the DOM.
Datum.js is agnostic about how you do this.
(If you're having trouble jQuery's [load](https://api.jquery.com/load/) method is a good option.)

The view model is a single JavaScript object that contains all of the data that will be displayed on the web page and all of the logic for interacting with the web page.
You tell Datum.js what object this is by passing it to a constructor called `BindingRoot`.

    var viewModel = {};
    
    new BindingRoot(viewModel);
    
Declaring the binding root can be done only once, presumably as soon as the page loads.

### The View Model

The view model has two kinds of property, *data properties* and *bindings*.
The data properties contain the data that define the state of the view model.
The bindings are special objects that define how that data is displayed on the page.
You can create a binding using the `Binding` constructor.

    var viewModel = {
    
        myDatum: "Hello world.",
        myBinding: new Binding();
    };
    
    new BindingRoot(viewModel);
    
### Binding Attributes

Each binding property has at least one corresponding *binding attribute* on the template.
This attribute tells Datum.js which DOM element to bind each binding to.
A Binding attribute is always called `data-bind` and its value is the name of the binding property in the view model.

    <body>
      <div data-bind="myBinding"></div>
    </body>

### Callbacks

The binding `myBinding` above will have no effect on the page.
To make something happen you need to construct the binding with a callback.
There are a few different callbacks you can use.
The one called `text` is used to put text on the page.

    var viewModel = {
    
        myDatum: "Hello world.",
        myBinding: new Binding({
        
            text: function() { return this.myDatum; }
        });
    };
    
    new BindingRoot(viewModel);
    
### Text

As seen above, the *text callback* sets the text content of the elements to which it is bound.
The callback can contain any logic so long as it returns the value which is to be displayed.
If any of the data properties used in the body of the callback changes, the text callback will be reevaluated and the text on the page updated.
In the example above you can change the text on the page by assigning to the `myDatum` proprety.

    viewModel.myDatum = "Eh up planet.";
    
The text callback has a parameter which is the element to which it is bound.
You can also create a text binding using the `Text` constructor, but generally it is more useful to use the `Binding` constructor so you can also pass it some of the callbacks described below.

    var viewModel = {
    
        myDatum: "Hello world.",
        myBinding: new Text(function(element) { return this.myDatum; });
    };
    
    new BindingRoot(viewModel);
    
### Value

The *value callback* provides a two way binding between an `<input />` element and a data property.
It is a single callback that is called when either a change event is triggered on the input element or one of the data dependencies of the callback changes.
In the first case the value of the input element is passed as the first parameter to the callback.
In the second case `undefined` is passed.
The second parameter is always the element to which it is bound.

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
A standard two way binding will have the above form, though of course you are free to experiment.
There is also a `Value` constructor to which you can pass the callback directly.

### Click

The *click callback* is called whenever a click event is raised on an element to which it is bound.
Again the element is passed as the first paramenter and there is also a `Click` constructor.

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
### Visible

The *visible callback* can be used to hide and show elements.
If the callback returns false the element will have the style `display: none;` applied to it.
If the callback returns true the display style will be set to the value it had when the element was first bound.

### The Object Binding

The view model will typically be a nested data structure with sub-objects bound to parts of the DOM.
A sub-object bound to an element becomes the view model for the part of the DOM made up of that element and its sub-elements.
Just like its parent view model it can have data properties, binding properties and its own sub-objects.
Objects are bound to elements in the same way as bindings by putting a `data-bind` attribute on the element whose value is the name of object property.

```
    <body>
      <div data-bind="mySubobject">
        <span data-bind="text"></span>
      </div>
    </body>
```
```
    var viewModel = {
    
        mySubobject: {

            text: new Text(function() { return "Hello world."; })
        }
    };
    
    new BindingRoot(viewModel);
```
Be careful to ensure that the structure of the view model is mirrored in the DOM hierarchy.
An object bound to an element must contain all bindings within that element.
No binding can be applied from outside the bound object even if the property name is that same as the binding attribute.

The object binding has one more useful feature.
If the a bound object is set to null then the child elements of the element to which it is bound will be removed from the DOM.
If the object is replaced then the elements are put back too.
Thus parts of the DOM can be shown only when there is data available to populate them.
This is a more natural way to hide and show elements than the visible binding.

## Advanced Topics

### DOM Mutation

A unique feature of Datum is its ability to cope with updates to both the view model and the DOM.
As expected the DOM will be automatically updated to reflect changes in the view model.
But if you manually update the DOM say by attaching a new template, the view model will simply bind to the new template poplating it with the same data, but potentially with a new layout.

The best practice when using Datum is to take full advantage of this capability by incremetally biding templates to the view model only when they are need on the page.
So although Datum only allows one view model and one template on a page it is perfectly possible to asynchronously load components onto the page at any point during the running of the application.

### The Binding Callback

Often the most convenient time to load a new template is just after binding its view model to the DOM using the object binding.
This way the template can be placed straight inside the element to which the view model was just bound.
To facilitate this when applying the object binding Datum will look for and call a method called `onBind` if it exists on the object being bound.
The element to which the object was just bound is passed as the first parameter to `onBind` so a new template can be easily placed inside the element.

    var viewModel = {

        onBind: function(element) {

			$(element).load("myTemplate.html");
		},
    };

	new BindingRoot(viewModel);

### Dependency tracking

All of the binding callbacks that can be passed to the `Binding` constructor track their own dependencies.
This means that you don't have to worry about updating any of the data on the page when the data in the view model changes.
This will happen automatically.

### Serialisation

It is common to want to be able to turn objects into JSON to send to the server.
For this reason Datum attaches a `toJSON` method to each object in the view model.
This method returns an object containing only data properties and subobjects that can be easily stringified and sent to the server.

    var viewModel = {
    
        datum: "Hello world."
    };
    
    new BindingRoot(viewModel);

	var jsonString = JSON.stringify(viewModel);

If an object contains data that should not be serialised then it can implement its own `toJSON` method.
This method should return an object that contains just its serialisable data.
Beginners are encouraged to use the default implementation of `toJSON` and not to worry if a few redundant properties are sent to the server.

### The Array Binding

The array binding is quite like the object binding except the contents of the element to which an array is bound will be repeated for each element of the bound array.

```
    <body>
      <div data-bind="array">
        <div>
          <div data-bind="text></div>
        </div>
      </div>
    </body>
```
```
    var viewModel = {
    
        array: [

            { text: new Text(function() { return "this"; }) },
            { text: new Text(function() { return "that"; }) },
            { text: new Text(function() { return "tother"; }) }
        ]
    };
    
    new BindingRoot(viewModel);
```
The above template and view model would produce the following HTML when bound.

```
    <body>
      <div data-bind="array">
        <div>
          <div data-bind="text>this</div>
        </div>
        <div>
          <div data-bind="text>that</div>
        </div>
        <div>
          <div data-bind="text>tother</div>
        </div>
      </div>
    </body>
```
Note that the children of the element to which the array is bound are the elements to which each of the objects in the array are bound.

### Classes

The *classes binding* allows you to add and remove CSS classes from elements.
It requires an object containing callbacks named for the classes to be added or removed.

    var viewModel = {

        myBinding: new Binding({
        
            classes: {
            
                enabled: function() { return false; },
                "first-item": function() { return true; }
            }
        });
    };
    
    new BindingRoot(viewModel);

### Events

The *events binding* registers event handlers on an element.

    var viewModel = {

        myBinding: new Binding({
        
            events: {
            
                change: function() { alert("Value changed!"); },
                keyup: function() { alert("Key was pressed!"); }
            }
        });
    };
    
    new BindingRoot(viewModel);

### The Init, Update and Destroy bindings

In some cases the provided bindings will not cover all of the functionality of an application.
When this is so the *init*, *update* and *destroy* bindings can be used to create custom bindings.

The *init callback* is called when the binding is bound to an element.
Afterwards the init callback will not be called again for that element, but will be called if the binding is bound to a new element, each time passing the bound element as the first parameter.
The *update callback* is called when the binding is first attached to an element and then again whenever one of its dependencies changes.
The *destroy callback* is called when the binding is removed from an element.

## Installation

Install with NPM:

    npm install Datum

## Bugs

Bugs can be reported on [GitHub](https://github.com/MartinRixham/Datum/issues).

## Examples

The following websites were created with Datum:

* [fifteenpuzzzle.co.uk](http://fifteenpuzzzle.co.uk)