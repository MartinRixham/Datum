define([], function() {

	function Pop(model, elements, properties) {

		var originalPop = model.pop;

		model.pop = function() {

			originalPop.apply(this, arguments);

			var property = properties.pop();

			if (property) {

				property.removeBinding();
			}

			for (var i = 0; i < elements.length; i++) {

				elements[i].removeLast();
			}

			model.subscribableLength = model.length;
		};
	}

	return Pop;
});
