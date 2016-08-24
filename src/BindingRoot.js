define([
	"ViewModel",
	"DomWatcher",
	"Registry"
], function BindingRoot(
	ViewModel,
	DomWatcher,
	Registry) {

	var flag = false;

	function BindingRoot(model) {

		if (flag) {

			throw new Error(
				"The binding root is unique and cannot be instantiated multiple times.");
		}
		else {

			flag = true;
		}

		var rootViewModel = new ViewModel(model);

		rootViewModel.applyBinding();

		new Registry().registerRebinder(function() {

			rootViewModel.applyBinding();
		});

		var domWatcher = new DomWatcher(document.body);

		this.disconnect = function() {

			domWatcher.disconnect();
		};
	}

	return BindingRoot;
});
