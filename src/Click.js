define([
	"EventsBinding",
	"CallbackBinder"
], function Click(
	EventsBinding,
	CallbackBinder) {

	function Click(click) {

		return new CallbackBinder(new EventsBinding({ click: click }));
	}

	return Click;
});
