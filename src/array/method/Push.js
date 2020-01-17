define(["property/TransientProperty"], function(TransientProperty) {

	function Push(model, elements, properties, propertyType) {

		this.model = model;

		this.originalPush = model.push;

		var self = this;

		model.push = function() {

			self.originalPush.apply(this, arguments);

			for (var i = 0; i < arguments.length; i++) {

				var property = new TransientProperty(arguments[i], propertyType);

				push(model, properties, elements, property);
			}

			model.subscribableLength = model.length;
			model.indexOf();
		};
	}

	function push(model, properties, elements, property) {

		properties.push(property);

		for (var j = 0; j < elements.length; j++) {

			var element = elements[j];
			var child = element.append();

			property.applyBinding(child, model);
		}
	}

	Push.prototype.unbind = function() {

		this.model.push = this.originalPush;
	};

	return Push;
});
