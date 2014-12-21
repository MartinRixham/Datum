function Binding(bindings) {

	this.requestRebind();

	setTimeout(this.rebindDataStructure);

	var element = false;

	this.bind = function(scope, name, model) {

		if (!element) {

			this.rebind(scope, name, model);
		}	
	};

	this.rebind = function(scope, name, model) {

		element = !!scope.querySelector("[data-bind=" + name + "]");

		if (!element) {

			return;
		}

		if (bindings.text) {

			var text = new Text(bindings.text);

			text.bind(scope, name, model);
		}
		
		if (bindings.value) {

			var value = new Value(bindings.value);

			value.bind(scope, name, model);
		}
		
		if (bindings.click) {

			var click = new Click(bindings.click);

			click.bind(scope, name, model);
		}

		if (bindings.init) {

			var init = new Init(bindings.init);

			init.bind(scope, name, model);
		}
	};

	this.isBinding = true;
}

Binding.prototype = new Subscriber();
