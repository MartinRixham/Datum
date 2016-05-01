BindingRoot.ArrayBinding.Splice = function(model, arrayElement, properties) {

	this.applyBinding = function(scope, name) {

		var element = this.getMatchingElement(scope, name);

		var originalSplice = model.splice;

		var self = this;

		model.splice = function(start, deleteCount) {

			originalSplice.apply(model, arguments);

			for (var i = deleteCount - 1; i >= 0; i--) {

				element.removeChild(element.children[start + i]);
			}

			var newObjects =
				Array.prototype.slice.call(arguments, 2);

			insertBefore(start, newObjects, element);

			model.subscribableLength = model.length;

			self.rebindDataStructure();
		};
	};

	function insertBefore(index, array, element) {

		for (var i = array.length - 1; i >= 0; i--) {

			var property = array[i];

			var newElement = arrayElement.clone();

			element.insertBefore(newElement, element.children[index]);

			if (property && typeof(property) == "object") {

				properties.splice(index - 1, 0, new BindingRoot.ViewModel(property));
			}
		}
	}

	this.removeBinding = function() {};
};

BindingRoot.ArrayBinding.Splice.prototype = new Subscriber();
