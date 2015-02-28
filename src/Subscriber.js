function Subscriber() {

	this.isInScope = function(element, scope) {

		element = element.parentElement;

		if (!element) {

			return true;
		}
		else if (element._rebind) {

			return element == scope;
		}
		else {

			return this.isInScope(element, scope);
		}	
	};
	
	this.matchingElements = function(scope, key) {
	
		if (isNaN(key)) {
		
			return scope.querySelectorAll("[data-bind=" + key + "]");
		}
		else {
		
			return [scope.children[key]];
		}
	}
}

Subscriber.prototype = new Registry();
