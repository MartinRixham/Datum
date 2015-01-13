// Unlike the other bindings the "update" binding prioritises 
// predictability rather than comprehensiveness when collecting
// dependencies. Dependencies are registered only once when the
// callback is executed during the initial binding.
// After this the callback is called exactly once per change 
// each time the value of a dependency changes.
// This means that expensive operations or AJAX calls etc.
// can be safely placed inside update callbacks
// without them being executed unpredictably.
// However any datum that is not accessed during the initial execution
// will not be registered as a dependency even though the callback may
// indeed depend on the datum.
// Other bindings make further attempts to register dependencies
// and as a result make no guarantee as to when they may execute
// their callbacks.
function Update(update) {

	this.applyBinding = function(scope, name, model) {

		var elements = scope.querySelectorAll("[data-bind=" + name + "]");

		var self = this;

		var applyCallback = function(element) {

			self.assignUpdater(function() {

				update.call(model, element);
			});
		};

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			if (!element.callbacks) {

				element.callbacks = [];
			}

			var alreadyBound = element.callbacks.indexOf(update) + 1;

			if (!alreadyBound) {
	
				this.requestRegistrations();
		
				update.call(model, element);

				applyCallback(element);

				element.callbacks.push(update);
			}
		}
	};
}

Update.prototype = new Subscriber();
