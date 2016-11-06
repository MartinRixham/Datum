define([
	"CallbackBinder",
	"TextBinding",
	"ValueBinding",
	"ClickBinding",
	"InitBinding",
	"UpdateBinding",
	"VisibleBinding"
], function Binding(
	CallbackBinder,
	TextBinding,
	ValueBinding,
	ClickBinding,
	InitBinding,
	UpdateBinding,
	VisibleBinding) {

	function Binding(callbacks) {

		var bindings = [];

		if (callbacks.text) {

			bindings.push(new CallbackBinder(new TextBinding(callbacks.text)));
		}

		if (callbacks.value) {

			bindings.push(new CallbackBinder(new ValueBinding(callbacks.value)));
		}

		if (callbacks.click) {

			bindings.push(new CallbackBinder(new ClickBinding(callbacks.click)));
		}

		if (callbacks.init) {

			bindings.push(new CallbackBinder(new InitBinding(callbacks.init)));
		}

		if (callbacks.update) {

			bindings.push(new CallbackBinder(new UpdateBinding(callbacks.update)));
		}

		if (callbacks.visible) {

			bindings.push(new CallbackBinder(new VisibleBinding(callbacks.visible)));
		}

		var parentModel = null;

		this.applyBinding = function(scope, name, model) {

			parentModel = model;

			for (var i = 0; i < bindings.length; i++) {

				bindings[i].applyBinding(scope, name, model);
			}
		};

		this.removeBinding = function() {

			for (var i = 0; i < bindings.length; i++) {

				bindings[i].removeBinding();
			}
		};

		var test = {};

		Object.keys(callbacks).forEach(function(key) {

			test[key] = function(element) {

				callbacks[key].call(parentModel, element);
			};
		});

		this.test = test;
	}

	return Binding;
});
