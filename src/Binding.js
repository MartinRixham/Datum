function Binding(bindings) {

	this.requestRebind();

	setTimeout(this.rebindDataStructure);

	this.applyBinding = function(scope, name, model) {

		if (bindings.text) {

			var text = new Text(bindings.text);

			text.applyBinding(scope, name, model);
		}
		
		if (bindings.value) {

			var value = new Value(bindings.value);

			value.applyBinding(scope, name, model);
		}
		
		if (bindings.click) {

			var click = new Click(bindings.click);

			click.applyBinding(scope, name, model);
		}

		if (bindings.init) {

			var init = new Init(bindings.init);

			init.bind(scope, name, model);
		}

		if (bindings.update) {

			var update = new Upudate(bindings.update);

			update.applyBinding(scope, name, model);
		}

		if (bindings.visible) {

			var visible = new Visible(bindings.visible);

			visible.applyBinding(scope, name, model);
		}
	};
}

Binding.prototype = new Subscriber();
