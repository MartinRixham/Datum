define(["ClickBinding", "Binder"], function Click(ClickBinding, Binder) {

	function Click(click) {

		return new Binder(new ClickBinding(click));
	}

	return Click;
});
