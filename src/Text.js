define(["TextBinding", "Binder"], function Text(TextBinding, Binder) {

	function Text(text) {

		return new Binder(new TextBinding(text));
	}

	return Text;
});
