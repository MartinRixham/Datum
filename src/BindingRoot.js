function BindingRoot(model) {

	this.assertUniqueness();

	var bindObject = function(model) {

		for(var key in model)
		{
			var injectProperty = function(key, property) {

				var datum = new Datum(property);

				Object.defineProperty(model, key, {

					get: function() { return datum(); },
					set: function(value) { datum(value); }
				});
			};

			var property = model[key];
	
			if (property && property.constructor == Binding) {
	
				property.bind(model._scope, key);
			}
			else if (property && typeof(property) == "object") {

				element = model._scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					property._scope = element;

					bindObject(property);
				}
			}
			else if (typeof(property) != "function") {

				injectProperty(key, property);
			}
		}
	};

	model._scope = document.querySelector("body");

	bindObject(model);

	this.rebind = function() {

		bindObject(model);
	};
}

BindingRoot.prototype = new UniqueRoot();
