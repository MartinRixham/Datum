define(["EventBinding", "CallbackBinder"], function Click(EventBinding, CallbackBinder) {

	function Click(click) {

		return new CallbackBinder(new EventBinding({ click: click }));
	}

	return Click;
});
