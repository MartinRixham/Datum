define([
	"DestroyBinding",
	"CallbackBinder"
], function Destroy(
	DestroyBinding,
	CallbackBinder) {

	function Destroy(destroy) {

		return new CallbackBinder(new DestroyBinding(destroy));
	}

	return Destroy;
});
