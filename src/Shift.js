define(["Subscriber"], function(Subscriber) {

	function Shift(model) {

		this.applyBinding = function(scope, name) {

			var element = this.getMatchingElement(scope, name);

			var originalShift = model.shift;

			model.shift = function() {

				originalShift.apply(model, arguments);

				element.removeChild(element.firstElementChild);

				model.subscribableLength = model.length;
			};
		};

		this.removeBinding = function() {
		};
	}

	Shift.prototype = new Subscriber();

	return Shift;
});
