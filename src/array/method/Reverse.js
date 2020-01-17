define([], function() {

	function Reverse(model, elements, properties) {

		this.model = model;

		this.originalReverse = model.reverse;

		var self = this;

		model.reverse = function() {

			self.originalReverse.apply(this, arguments);

			reverse(elements, properties);

			model.indexOf();
		};
	}

	function reverse(elements, properties) {

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];
			var children = element.removeChildren();

			element.appendChildren(children.reverse());
		}

		properties.reverse();
	}

	Reverse.prototype.unbind = function() {

		this.model.reverse = this.originalReverse;
	};

	return Reverse;
});
