function Init(init) {

	this.bind = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		for (var i = 0; i < elements.length; i++) {

			init.call(model, elements[i]);
		}
	};
}

Init.prototype = new Subscriber();
