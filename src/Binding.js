define([
	"CallbackBinder",
	"TextBinding",
	"ValueBinding",
	"EventBinding",
	"InitBinding",
	"UpdateBinding",
	"VisibleBinding",
	"DestroyBinding",
	"CSSBinding"
], function Binding(
	CallbackBinder,
	TextBinding,
	ValueBinding,
	EventBinding,
	InitBinding,
	UpdateBinding,
	VisibleBinding,
	DestroyBinding,
	CSSBinding) {

	function Binding(callbacks) {

		var bindings = [];

		if (callbacks.text) {

			bindings.push(new CallbackBinder(new TextBinding(callbacks.text)));
		}

		if (callbacks.value) {

			bindings.push(new CallbackBinder(new ValueBinding(callbacks.value)));
		}

		if (callbacks.click) {

			bindings.push(
				new CallbackBinder(new EventBinding({ click: callbacks.click })));
		}

		if (callbacks.init) {

			bindings.push(new CallbackBinder(new InitBinding(callbacks.init)));
		}

		if (callbacks.update) {

			bindings.push(new CallbackBinder(new UpdateBinding(callbacks.update)));
		}

		if (callbacks.destroy) {

			bindings.push(new CallbackBinder(new DestroyBinding(callbacks.destroy)));
		}

		if (callbacks.visible) {

			bindings.push(new CallbackBinder(new VisibleBinding(callbacks.visible)));
		}

		if (callbacks.event) {

			bindings.push(new CallbackBinder(new EventBinding(callbacks.event)));
		}

		if (callbacks.css) {

			bindings.push(new CallbackBinder(new CSSBinding(callbacks.css)));
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
