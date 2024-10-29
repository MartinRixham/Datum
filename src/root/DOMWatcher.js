define([], function() {

	function DOMWatcher(scope) {

		var self = this;

		this.observer = new MutationObserver(function() {

			return callback.apply(self, arguments);
		});

		this.observer.observe(scope, { childList: true, subtree: true });
	}

	function callback(mutations) {

		for (var i = 0; i < mutations.length; i++) {

			var mutation = mutations[i];
			var notTextMutation = mutation.target.children.length;

			if (notTextMutation) {

				var element = mutation.target;

				this.rebindElement(element);
			}
		}
	}

	DOMWatcher.prototype.rebindElement = function(element) {

		if (element && element.__DATUM__REBIND) {

			element.__DATUM__REBIND();
		}
		else if (element) {

			this.rebindElement(element.parentElement);
		}
	};

	DOMWatcher.prototype.disconnect = function() {

		this.observer.disconnect();
	};

	return DOMWatcher;
});
