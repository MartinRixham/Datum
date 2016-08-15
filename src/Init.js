define(["InitBinding", "Binder"], function Init(InitBinding, Binder) {

	function Init(init) {

		return new Binder(new InitBinding(init));
	}

	return Init;
});
