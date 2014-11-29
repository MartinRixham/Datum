function BindingRoot() {

	this.bind = function() {

		for(var key in this)
		{
			var property = this[key];

			if (property.constructor == Binding) {
	
				property.bind(key);
			}
		}
	};
}
