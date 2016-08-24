define([
	"ViewModel",
	"DomWatcher",
	"UniqueRoot",
	"Registry"
], function BindingRoot(
	ViewModel,
	DomWatcher,
	UniqueRoot,
	Registry) {

	function BindingRoot(model) {

		this.assertUniqueness();

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

	BindingRoot.prototype = new UniqueRoot();

	return BindingRoot;
});
