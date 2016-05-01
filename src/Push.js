BindingRoot.ArrayBinding.Push = function(model, arrayElement) {

	this.applyBinding = function(scope, name) {

		var element = this.getMatchingElement(scope, name);

		var originalPush = model.push;

		var self = this;

		model.push = function() {

			originalPush.apply(model, arguments);

			append(element, arguments);

			model.subscribableLength = model.length;

			self.rebindDataStructure();
		};
	};

	function append(element, array) {

		for (var i = 0; i < array.length; i++) {

			var property = array[i];

			element.appendChild(arrayElement.clone());

			if (property && typeof(property) == "object") {

				new BindingRoot.ViewModel(property);
			}
		}
	}

	this.removeBinding = function() {};
};

BindingRoot.ArrayBinding.Push.prototype = new Subscriber();
