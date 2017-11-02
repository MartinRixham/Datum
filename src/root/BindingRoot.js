define([
	"object/ViewModel",
	"root/DOMWatcher",
	"element/DOMElement"
], function BindingRoot(
	ViewModel,
	DOMWatcher,
	DOMElement) {

	var flag = false;

	function BindingRoot(model) {

		(function checkModelType() {

			if (typeof model != "object") {

				throw new Error("The binding root must be an object.");
			}

			if (model instanceof Array) {

				throw new Error("The binding root cannot be an array.");
			}
		})();

		(function assertUniqueness() {

			if (flag) {

				throw new Error(
					"The binding root is unique and " +
					"cannot be instantiated multiple times.");
			}
			else {

				flag = true;
			}
		})();

		var rootViewModel = new ViewModel(model);
		rootViewModel.applyBinding(new DOMElement(document.body));

		var domWatcher = new DOMWatcher(document.body);

		function disconnect() {

			rootViewModel.removeBinding();
			domWatcher.disconnect();
			flag = false;
		}

		return {

			disconnect: disconnect
		};
	}

	return BindingRoot;
});
