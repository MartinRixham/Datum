BindingRoot.ArrayBinding.Sort = function(model) {

	this.applyBinding = function(scope, name) {

		var element = this.getMatchingElement(scope, name);

		model.sort = function(compareFunction) {

			var modelElementPairs = [];

			for (var i = 0; i < model.length; i++) {

				modelElementPairs.push({

					model: model[i],
					element: element.children[i]
				});
			}

			for (i = element.children.length - 1; i >= 0; i--) {

				element.removeChild(element.children[i]);
			}

			if (compareFunction) {

				modelElementPairs.sort(function(a, b) {

					return compareFunction(a.model, b.model);
				});
			}
			else {

				modelElementPairs.sort(function(a, b) {

					if (a.model > b.model) {

						return 1;
					}

					if (a.model < b.model) {

						return -1;
					}

					return 0;
				});
			}

			for (i = 0; i < modelElementPairs.length; i++) {

				element.appendChild(modelElementPairs[i].element);

				model[i] = modelElementPairs[i].model;
			}
		};
	};

	this.removeBinding = function() {};
};

BindingRoot.ArrayBinding.Sort.prototype = new Subscriber();
