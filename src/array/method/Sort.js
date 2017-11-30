define([], function() {

	function Sort(model, elements, properties) {

		model.sort = function(comparison) {

			if (comparison) {

				sort(model, elements, properties, comparison);
			}
			else {

				sort(model, elements, properties, defaultComparison);
			}

			model.indexOf();
		};
	}

	function defaultComparison(a, b) {

		if (a > b) {

			return 1;
		}
		else if (b > a) {

			return -1;
		}
		else {

			return 0;
		}
	}

	function sort(model, elements, properties, comparison) {

		var modelChildrenProperties =
			getModelChildrenProperties(model, elements, properties);

		modelChildrenProperties.sort(function(a, b) {

			return comparison(a.model, b.model);
		});

		replaceSortedObjects(model, elements, properties, modelChildrenProperties);
	}

	function getModelChildrenProperties(model, elements, properties) {

		var allChildren = getAllChildren(elements);
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

	function getAllChildren(elements) {

		var allChildren = [];

		for (var i = 0; i < elements.length; i++) {

			var children = elements[i].removeChildren();

			for (var j = 0; j < children.length; j++) {

				if (!allChildren[j]) {

					allChildren[j] = [];
				}

				allChildren[j][i] = children[j];
			}
		}

		return allChildren;
	}

	function replaceSortedObjects(model, elements, properties, modelChildrenProperties) {

		for (var i = 0; i < model.length; i++) {

			model[i] = modelChildrenProperties[i].model;
			properties[i] = modelChildrenProperties[i].property;

			for (var j = 0; j < elements.length; j++) {

				elements[j].appendChild(modelChildrenProperties[i].children[j]);
			}
		}
	}

	return Sort;
});
