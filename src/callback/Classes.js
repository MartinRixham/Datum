define([
	"callback/binding/ClassesBinding",
	"callback/CallbackBinder"
], function Classes(
	ClassesBinding,
	CallbackBinder) {

	function Classes(callbacks) {

		return new CallbackBinder(new ClassesBinding(callbacks));
	}

	return Classes;
});
