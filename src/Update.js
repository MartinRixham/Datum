define(["UpdateBinding", "Binder"], function Update(UpdateBinding, Binder) {

	function Update(update) {

		return new Binder(new UpdateBinding(update));
	}

	return Update;
});
