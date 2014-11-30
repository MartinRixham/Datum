function BindingRoot(model) {

	var bindObject = function(model) {

		for(var key in model)
		{
			var property = model[key];
	
			if (property.constructor == Binding) {
	
				property.bind(model._scope, key);
			}
			else if (typeof(property) == "object") {

				element = model._scope.querySelector("[data-bind=" + key + "]");

				if (element) {

					property._scope = element;

					bindObject(property);
				}
			}
		}
	};

	model._scope = document.querySelector("body");

	bindObject(model);

	this.rebind = function() {

		bindObject(model);
	};
}
