define([], function() {

	function Value(value) {

		this.setUpElement = function(model, element) {

			element.addEventListener("change", function(event) {

				value.call(model, event.target.value, element);
			});
		};

		this.updateElement = function(model, element) {

			var evaluated = value.call(model, undefined, element);

			if (typeof(evaluated) != "undefined") {

				element.value = evaluated;
			}
		};

		this.resetElement = function() {};

		this.call = function() {

			value.apply(this, arguments);
		};
	}

	return Value;
});
