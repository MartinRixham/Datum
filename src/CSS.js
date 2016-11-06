define(["CSSBinding", "CallbackBinder"], function Update(CSSBinding, CallbackBinder) {

	function CSS(callbacks) {

		return new CallbackBinder(new CSSBinding(callbacks));
	}

	return CSS;
});
