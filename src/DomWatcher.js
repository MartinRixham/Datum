define([], function() {

	 function DomWatcher(scope) {

		var flag = false;

		var observer = new MutationObserver(function(mutations) {

			if (flag) {

				return;
			}
			else {

				flag = true;
			}

			var mutation = mutations[0];

			var notTextMutation = mutation.target.children.length;

			if (notTextMutation) {

				var element = mutation.target;

				while (element) {

					if (element._rebind) {

						element._rebind();
						break;
					}
					else {

						element = element.parentElement;
					}
				}
			}
		});

		observer.observe(scope, { childList: true, subtree: true });

		this.disconnect = function() {

			observer.disconnect();
		};
	}

	return DomWatcher;
});
