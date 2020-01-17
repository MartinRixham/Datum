define(["property/TransientProperty"], function(TransientProperty) {

	function Unshift(model, elements, properties, propertyType) {

		this.model = model;

		this.originalUnshift = model.unshift;

		var self = this;

		model.unshift = function() {

			self.originalUnshift.apply(this, arguments);

			for (var i = arguments.length - 1; i >= 0; i--) {

				var property = new TransientProperty(arguments[i], propertyType);

				unshift(model, elements, properties, property);
			}

			model.subscribableLength = model.length;
			model.indexOf();
		};
	}

	function unshift(model, elements, properties, property) {

		properties.unshift(property);

		for (var j = 0; j < elements.length; j++) {

			var element = elements[j];
			var child = element.prepend();

			property.applyBinding(child, model);
		}
	}

	Unshift.prototype.unbind = function() {

		this.model.unshift = this.originalUnshift;
	};

	return Unshift;
});
