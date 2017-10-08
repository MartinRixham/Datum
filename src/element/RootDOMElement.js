define(["element/DOMElement"], function(DOMElement) {

	function RootDOMElement() {

		this.hasInScope = function(other) {

			return other.isInScope(document.body);
		};

		this.getMatchingElements = function() {

			return [new DOMElement(document.body)];
		};

		this.createRebinder = function() {};

		this.callBindingCallback = function() {};
	}

	return RootDOMElement;
});
