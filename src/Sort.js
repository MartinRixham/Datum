define([], function() {

	function Sort(model, elementChildren, properties) {

		model.sort = function(comparison) {

			var modelProperties = [];

			for (var i = 0; i < model.length; i++) {

				modelProperties.push({ model: model[i], property: properties[i] });
			}

			modelProperties.sort(function(a, b) {

				return comparison(a.model, b.model);
			});

			for (i = 0; i < model.length; i++) {

				model[i] = modelProperties[i].model;
				properties[i] = modelProperties[i].property;
			}
		};
	}

	return Sort;
});
