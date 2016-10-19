define([], function() {

	function Sort(model, elementChildren, properties) {

		model.sort = function(comparison) {

			var modelChildrenProperties = getModelChildrenProperties();

			modelChildrenProperties.sort(function(a, b) {

				return comparison(a.model, b.model);
			});

			replaceSortedObjects(modelChildrenProperties);
		};

		function getModelChildrenProperties() {

			var allChildren = getAllChildren();
			var modelChildrenProperties = [];

			for (var i = 0; i < model.length; i++) {

				modelChildrenProperties.push({

					model: model[i],
					property: properties[i],
					children: allChildren[i]
				});
			}

			return modelChildrenProperties;
		}

		function getAllChildren() {

			var allChildren = [];

			for (var i = 0; i < elementChildren.length; i++) {

				var element = elementChildren[i].element;
				var children = [].slice.call(element.children);

				removeChildren(element);

				for (var j = 0; j < children.length; j++) {

					if (!allChildren[j]) {

						allChildren[j] = [];
					}

					allChildren[j][i] = children[j];
				}
			}

			return allChildren;
		}

		function removeChildren(element) {

			while (element.lastChild) {

				element.removeChild(element.lastChild);
			}
		}

		function replaceSortedObjects(modelChildrenProperties) {

			for (var i = 0; i < model.length; i++) {

				model[i] = modelChildrenProperties[i].model;
				properties[i] = modelChildrenProperties[i].property;

				for (var j = 0; j < elementChildren.length; j++) {

					var element = elementChildren[j].element;

					replaceChildren(element, modelChildrenProperties[i].children);
				}
			}
		}

		function replaceChildren(element, children) {

			for (var i = 0; i < children.length; i++) {

				element.appendChild(children[i]);
			}
		}
	}

	return Sort;
});
