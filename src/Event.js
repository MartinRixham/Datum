define(["EventBinding", "CallbackBinder"], function Event(EventBinding, CallbackBinder) {

	function Event(callbacks) {

		return new CallbackBinder(new EventBinding(callbacks));
	}

	return Event;
});
