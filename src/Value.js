define(["ValueBinding", "Binder"], function Value(ValueBinding, Binder) {

	function Value(value) {

		return new Binder(new ValueBinding(value));
	}

	return Value;
});
