define(["ClickBinding", "CallbackBinder"], function Click(ClickBinding, CallbackBinder) {

	function Click(click) {

		return new CallbackBinder(new ClickBinding(click));
	}

	return Click;
});
