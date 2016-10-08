define([], function() {

	function Push(model, elementChildren) {

		var originalPush = model.push;

		model.push = function() {

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;
				var child = elementChildren[i].child;

				element.appendChild(child.clone());
			}

			originalPush.apply(this, arguments);
		};
	}

	return Push;
});
