define([], function() {

	function PushBinding(/*properties, propertyType, arrayElement*/) {

		this.setUpElement = function(parentModel, element, model) {

			var originalPush = model.push;

			model.push = function() {

				var child = document.createElement("DIV");
				element.appendChild(child);

				originalPush.apply(this, arguments);
			};
		};

		this.updateElement = function() {};

		this.resetElement = function() {};
	}

	return PushBinding;
});
