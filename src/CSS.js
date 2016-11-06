define(["CSSBinding", "CallbackBinder"], function CSS(CSSBinding, CallbackBinder) {

	function CSS(callbacks) {

		return new CallbackBinder(new CSSBinding(callbacks));
	}

	return CSS;
});
