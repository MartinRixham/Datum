define([], function() {

	function Pop(model, elements, properties) {

		var originalPop = model.pop;

		model.pop = function() {

			var popped = originalPop.apply(this, arguments);

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

	return Pop;
});
