define([
	"ViewModel",
	"DomWatcher",
	"Rebinder"
], function BindingRoot(
	ViewModel,
	DomWatcher,
	Rebinder) {

	var flag = false;

	function BindingRoot(model) {

		assertUniqueness();

		var rootViewModel = new ViewModel(model);
		rootViewModel.applyBinding();

		new Rebinder().registerRebinder(function() {

			rootViewModel.applyBinding();
		});

		var domWatcher = new DomWatcher(document.body);

		this.disconnect = function() {

			domWatcher.disconnect();
		};
	}

	function assertUniqueness() {

		if (flag) {

			throw new Error(
				"The binding root is unique and cannot be instantiated multiple times.");
		}
		else {

			flag = true;
		}
	}

	return BindingRoot;
});
