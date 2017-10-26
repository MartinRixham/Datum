define([], function() {

	function NullDOMElement() {

		this.hasInScope = function() {

			return false;
		};

		this.isInScope = function() {

			return true;
		};

		this.removedFromDocument = function() {

			return true;
		};

		this.getMatchingElements = function() {

			return [];
		};

		this.createRebinder = function() {};

		this.callBindingCallback = function() {};

		this.equals = function(other) {

			return other instanceof NullDOMElement;
		};

		this.hasEqual = function() {

			return false;
		};

		this.get = function() {

			return null;
		};
	}

	return NullDOMElement;
});
