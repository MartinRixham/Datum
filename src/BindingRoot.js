function BindingRoot(model) {

	for(var key in model)
	{
		var property = model[key];

		if (property.constructor == Binding) {

			property.bind(key);
		}
	}
}
