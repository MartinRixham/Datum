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

		var bindings = {};

		if (callbacks.text) {

			bindings.text = new CallbackBinder(new TextBinding(callbacks.text));
		}

		if (callbacks.value) {

			bindings.value = new CallbackBinder(new ValueBinding(callbacks.value));
		}

		if (callbacks.events) {

			bindings.events = new CallbackBinder(new EventsBinding(callbacks.events));
		}

		if (callbacks.click) {

			bindings.events = bindings.events || {};

			bindings.events.click =
				new CallbackBinder(new EventsBinding({ click: callbacks.click }));
		}

		if (callbacks.init) {

			bindings.init = new CallbackBinder(new InitBinding(callbacks.init));
		}

		if (callbacks.update) {

			bindings.update = new CallbackBinder(new UpdateBinding(callbacks.update));
		}

		if (callbacks.destroy) {

			bindings.destroy = new CallbackBinder(new DestroyBinding(callbacks.destroy));
		}

		if (callbacks.visible) {

			bindings.visible = new CallbackBinder(new VisibleBinding(callbacks.visible));
		}

		if (callbacks.classes) {

			bindings.classes = new CallbackBinder(new ClassesBinding(callbacks.classes));
		}

		function provider() {

			var test = {};

			for (var key in bindings) {

				test[key] = bindings[key].call(this)[key];
			}

			return test;
		}

		provider.applyBinding = function(element, model) {

			for (var key in bindings) {

				bindings[key].applyBinding(element, model);
			}
		};

		provider.removeBinding = function() {

			for (var key in bindings) {

				bindings[key].removeBinding();
			}
		};

		return provider;
	}

	return Binding;
});
