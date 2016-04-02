BindingRoot.ViewModel.ArrayBinding.Reverse = function(model) {

	this.applyBinding = function(scope, name) {

		var element = this.getMatchingElement(scope, name);

		var originalReverse = model.reverse;

		model.reverse = function() {

			var children = [];

			for (var i = element.children.length - 1; i >= 0; i--) {

				var child = element.children[i];

				children[i] = child;

				element.removeChild(child);
			}

			for (i = children.length - 1; i >= 0; i--) {

				element.appendChild(children[i]);
			}

			originalReverse.apply(model, arguments);
		};
	};

	this.removeBinding = function() {};
};

BindingRoot.ViewModel.ArrayBinding.Reverse.prototype = new Subscriber();
