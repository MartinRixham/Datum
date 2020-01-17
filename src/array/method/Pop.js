define([], function() {

	function Pop(model, elements, properties) {

		this.model = model;

		this.originalPop = model.pop;

		var self = this;

		model.pop = function() {

			var popped = self.originalPop.apply(this, arguments);

			pop(model, elements, properties);

			return popped;
		};
	}

	function pop(model, elements, properties) {

		var property = properties.pop();

		if (property) {

			property.removeBinding();
		}

		for (var i = 0; i < elements.length; i++) {

			elements[i].removeLast();
		}

		model.subscribableLength = model.length;
		model.indexOf();
	}

	Pop.prototype.unbind = function() {

		this.model.pop = this.originalPop;
	};

	return Pop;
});
