define([
	"callback/binding/ValueBinding",
	"callback/CallbackBinder"
], function Value(
	ValueBinding,
	CallbackBinder) {

	function Value(value) {

		return new CallbackBinder(new ValueBinding(value));
	}

	return Value;
});
