define(["VisibleBinding", "Binder"], function Visible(VisibleBinding, Binder) {

	function Visible(visible) {

		return new Binder(new VisibleBinding(visible));
	}

	return Visible;
});
