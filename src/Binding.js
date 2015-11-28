function Binding(bindings) {

	this.requestRebind();

	setTimeout(this.rebindDataStructure);

	var parentModel = null;
	
	// The applyBinding method is the sole member of the binding interface,
	// the most important internal interface in Datum.
	// Is is implemented by many different objects and is the library's
	// main point of extensibility.
	// The key principle of the interface is that responsibility is left to
	// the implementation to determine whether it is appropriate for
	// the binding to be applied when the method is called.
	// The binding itself makes sure that it is applied correctly,
	// for example that it is not inappropriately applied multiple times.
	// The client code is responsible only for telling the binding where to bind
	// and signalling that the binding may need to be applied.
	this.applyBinding = function(scope, name, model) {

		parentModel = model;

		if (bindings.text) {

			var text = new Text(bindings.text);

			text.applyBinding(scope, name, model);
		}
		
		if (bindings.value) {

			var value = new Value(bindings.value);

			value.applyBinding(scope, name, model);
		}
		
		if (bindings.click) {

			var click = new Click(bindings.click);

			click.applyBinding(scope, name, model);
		}

		if (bindings.init) {

			var init = new Init(bindings.init);

			init.applyBinding(scope, name, model);
		}

		if (bindings.update) {

			var update = new Update(bindings.update);

			update.applyBinding(scope, name, model);
		}

		if (bindings.visible) {

			var visible = new Visible(bindings.visible);

			visible.applyBinding(scope, name, model);
		}
	};

	test = {};

	Object.keys(bindings).forEach(function(key) {

		test[key] = function(element) {

			bindings[key].call(parentModel, element);
		};
	});

	this.test = test;
}

Binding.prototype = new Subscriber();
