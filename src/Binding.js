function Binding(callbacks) {

	var bindings = [];

	if (callbacks.text) {

		bindings.push(new Text(callbacks.text));
	}

	if (callbacks.value) {

		bindings.push(new Value(callbacks.value));
	}

	if (callbacks.click) {

		bindings.push(new Click(callbacks.click));
	}

	if (callbacks.init) {

		bindings.push(new Init(callbacks.init));
	}

	if (callbacks.update) {

		bindings.push(new Update(callbacks.update));
	}

	if (callbacks.visible) {

		bindings.push(new Visible(callbacks.visible));
	}

	var parentModel = null;

	this.requestRebind();

	// The binding interface is the most important internal interface in Datum.
	// It has two methods applyBinding and removeBinding.
	// Is is implemented by many different objects and is the library's
	// main point of extensibility.
	// The key principle of the interface is that responsibility is left to
	// the implementation to determine whether it is appropriate for
	// the binding to be applied when applyBinding is called.
	// The binding itself makes sure that it is applied correctly,
	// for example that it is not inappropriately applied multiple times.
	// The client code is responsible only for telling the binding where to bind
	// and signalling that the binding may need to be applied.
	this.applyBinding = function(scope, name, model) {

		parentModel = model;

		for (var i = 0; i < bindings.length; i++) {

			bindings[i].applyBinding(scope, name, model);
		}
	};

	this.removeBinding = function() {

		for (var i = 0; i < bindings.length; i++) {

			bindings[i].removeBinding();
		}
	};

	var test = {};

	Object.keys(callbacks).forEach(function(key) {

		test[key] = function(element) {

			callbacks[key].call(parentModel, element);
		};
	});

	this.test = test;
}

Binding.prototype = new Subscriber();
