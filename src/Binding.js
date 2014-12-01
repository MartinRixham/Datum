function Binding(bindings) {

	var query = function(query) {

		return document.querySelector(query);
	};

	this.bind = function(scope, name) {

		var element = scope.querySelector("[data-bind=" + name + "]");

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
}
