define([
	"callback/binding/EventsBinding",
	"callback/CallbackBinder"
], function Events(
	EventsBinding,
	CallbackBinder) {

	function Events(callbacks) {

		return new CallbackBinder(new EventsBinding(callbacks));
	}

	return Events;
});
