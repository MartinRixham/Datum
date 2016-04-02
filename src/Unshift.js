BindingRoot.ViewModel.ArrayBinding.Unshift = function(model, arrayElement, bindings) {

	this.applyBinding = function(scope, name) {

		var element = this.getMatchingElement(scope, name);

		var originalUnshift = model.unshift;

		var self = this;

		model.unshift = function() {

			originalUnshift.apply(model, arguments);

			insertAtBeginning(arguments, element);

			model.subscribableLength = model.length;

			self.rebindDataStructure();
		};
	};

	function insertAtBeginning(array, element) {

		for (var i = array.length - 1; i >= 0; i--) {

			var property = array[i];

			var newElement = arrayElement.clone();

			element.insertBefore(newElement, element.children[0]);

			if (property && typeof(property) == "object") {

				bindings.unshift(new BindingRoot.ViewModel(property));
			}
		}
	}

	this.removeBinding = function() {};
};

BindingRoot.ViewModel.ArrayBinding.Unshift.prototype = new Subscriber();
