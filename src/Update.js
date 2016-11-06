define([
	"UpdateBinding",
	"CallbackBinder"
], function Update(
	UpdateBinding,
	CallbackBinder) {

	function Update(update) {

		return new CallbackBinder(new UpdateBinding(update));
	}

	return Update;
});
