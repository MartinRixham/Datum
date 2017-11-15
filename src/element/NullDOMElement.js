define([], function() {

	function NullDOMElement() {}

	NullDOMElement.prototype.isInScope = function() {

		return true;
	};

	NullDOMElement.prototype.removedFromDocument = function() {

		return true;
	};

	NullDOMElement.prototype.getMatchingElements = function() {

		return [];
	};

	NullDOMElement.prototype.createRebinder = function() {};

	NullDOMElement.prototype.callBindingCallback = function() {};

	NullDOMElement.prototype.equals = function(other) {

		return other instanceof NullDOMElement;
	};

	NullDOMElement.prototype.hasEqual = function() {

		return false;
	};

	NullDOMElement.prototype.get = function() {

		return null;
	};

	return NullDOMElement;
});
