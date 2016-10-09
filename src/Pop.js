define([], function() {

	function Pop(model, elementChildren) {

		var originalPop = model.pop;

		model.pop = function() {

			var element = elementChildren[0].element;

			element.removeChild(element.firstElementChild);

			originalPop.apply(this, arguments);
		};
	}

	return Pop;
});
