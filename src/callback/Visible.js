define([
	"callback/binding/VisibleBinding",
	"callback/CallbackBinder"
], function Visible(
	VisibleBinding,
	CallbackBinder) {

	function Visible(visible) {

		return new CallbackBinder(new VisibleBinding(visible));
	}

	return Visible;
});
