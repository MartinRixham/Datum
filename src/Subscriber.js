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
}

Subscriber.prototype = new Registry();
