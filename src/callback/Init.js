define([
	"callback/binding/InitBinding",
	"callback/CallbackBinder"
], function Init(
	InitBinding,
	CallbackBinder) {

	function Init(init) {

		return new CallbackBinder(new InitBinding(init));
	}

	return Init;
});
