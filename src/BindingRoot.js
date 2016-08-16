define([
	"ViewModel",
	"DomWatcher",
	"UniqueRoot"
], function BindingRoot(
	ViewModel,
	DomWatcher,
	UniqueRoot) {

	function BindingRoot(model) {

		this.assertUniqueness();

		var rootViewModel = new ViewModel(model);

		rootViewModel.applyBinding();

		this.registerRebinder(function() {

			rootViewModel.applyBinding();
		});

		var domWatcher = new DomWatcher(document.body);

		this.disconnect = function() {

			domWatcher.disconnect();
		};
	}

	BindingRoot.prototype = new UniqueRoot();

	return BindingRoot;
});
