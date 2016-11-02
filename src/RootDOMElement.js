define(["DOMElement"], function(DOMElement) {

	function RootDOMElement() {

		this.hasInScope = function(other) {

			return other.isInScope(document.body);
		};

		this.isInScope = function() {

			return false;
		};

		this.removedFromDocument = function() {

			return false;
		};

		this.getMatchingElements = function() {

			return [new DOMElement(document.body)];
		};

		this.createRebinder = function() {};

		this.callBindingCallback = function() {};

		this.equals = function(other) {

			return other instanceof RootDOMElement;
		};

		this.hasEqual = function(other) {

			return other instanceof RootDOMElement;
		};

		this.get = function() {

			return null;
		};
	}

	return RootDOMElement;
});
