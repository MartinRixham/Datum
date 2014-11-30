function Binding(bindings) {

	var query = function(query) {

		return document.querySelector(query);
	};

	this.bind = function(name) {

		if (bindings.text) {

			var text = new Text(bindings.text);

			text.bind(name);
		}
		
		if (bindings.value) {

			var value = new Value(bindings.value);

			value.bind(name);
		}
	};
}
