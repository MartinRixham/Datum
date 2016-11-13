define([], function() {

	function DOMWatcher(scope) {

		var observer = new MutationObserver(function(mutations) {

			var mutation = mutations[0];
			var notTextMutation = mutation.target.children.length;

			if (notTextMutation) {

				var element = mutation.target;

				rebindElement(element);
			}
		});

		function rebindElement(element) {

			if (element && element._rebind) {

				element._rebind();
			}
			else if (element) {

				rebindElement(element.parentElement);
			}
		}

		observer.observe(scope, { childList: true, subtree: true });

		this.disconnect = function() {

			observer.disconnect();
		};
	}

	return DOMWatcher;
});
