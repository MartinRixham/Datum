define([
	"callback/CallbackBinder",
	"callback/binding/TextBinding",
	"callback/binding/ValueBinding",
	"callback/binding/EventsBinding",
	"callback/binding/InitBinding",
	"callback/binding/UpdateBinding",
	"callback/binding/VisibleBinding",
	"callback/binding/DestroyBinding",
	"callback/binding/ClassesBinding"
], function Binding(
	CallbackBinder,
	TextBinding,
	ValueBinding,
	EventsBinding,
	InitBinding,
	UpdateBinding,
	VisibleBinding,
	DestroyBinding,
	ClassesBinding) {

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
				new CallbackBinder(new EventsBinding({ click: callbacks.click })));
		}

		if (callbacks.events) {

			bindings.push(new CallbackBinder(new EventsBinding(callbacks.events)));
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

		if (callbacks.classes) {

			bindings.push(new CallbackBinder(new ClassesBinding(callbacks.classes)));
		}

		function provider() {

			return mergeCallbacks(bindings, this);
		}

		provider.applyBinding = function(element, model) {

			for (var i = 0; i < bindings.length; i++) {

				bindings[i].applyBinding(element, model);
			}
		};

		provider.removeBinding = function() {

			for (var i = 0; i < bindings.length; i++) {

				bindings[i].removeBinding();
			}
		};

		return provider;
	}

	function mergeCallbacks(bindings, parentModel) {

		var handle = {};

		for (var i = 0; i < bindings.length; i++) {

			var callbacks = bindings[i].call(parentModel);

			for (var key in callbacks) {

				handle[key] = callbacks[key];
			}
		}

		return handle;
	}

	return Binding;
});
