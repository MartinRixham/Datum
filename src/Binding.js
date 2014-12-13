function Binding(bindings) {

	this.requestRebind();

	setTimeout(this.rebindDataStructure);

	var element = false;

	this.bind = function(scope, name) {

		if (!element) {

			this.rebind(scope, name);
		}	
	};

	this.rebind = function(scope, name) {

		element = !!scope.querySelector("[data-bind=" + name + "]");

		if (!element) {

			return;
		}

		if (bindings.text) {

			var text = new Text(bindings.text);

			text.bind(scope, name);
		}
		
		if (bindings.value) {

			var value = new Value(bindings.value);

			value.bind(scope, name);
		}
	};

	this.isBinding = true;
}

Binding.prototype = new Subscriber();
