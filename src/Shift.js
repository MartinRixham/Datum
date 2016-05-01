BindingRoot.ArrayBinding.Shift = function(model) {

	this.applyBinding = function(scope, name) {

		var element = this.getMatchingElement(scope, name);

		var originalShift = model.shift;

		model.shift = function() {

			originalShift.apply(model, arguments);

			element.removeChild(element.firstElementChild);

			model.subscribableLength = model.length;
		};
	};

	this.removeBinding = function() {};
};

BindingRoot.ArrayBinding.Shift.prototype = new Subscriber();
