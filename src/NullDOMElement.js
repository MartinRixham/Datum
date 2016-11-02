define([], function() {

	function NullDOMElement() {

		this.isInScope = function() {

			return true;
		};

		this.removedFromDocument = function() {

			return false;
		};

		this.getMatchingElements = function() {

			return [new NullDOMElement()];
		};

		this.createRebinder = function() {};

		this.callBindingCallback = function() {};

		this.equals = function(other) {

			return other instanceof NullDOMElement;
		};

		this.hasEqual = function(other) {

			return other instanceof NullDOMElement;
		};

		this.get = function() {

			return null;
		};
	}

	return NullDOMElement;
});
