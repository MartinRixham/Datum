define(["TextBinding", "CallbackBinder"], function Text(TextBinding, CallbackBinder) {

	function Text(text) {

		return new CallbackBinder(new TextBinding(text));
	}

	return Text;
});
