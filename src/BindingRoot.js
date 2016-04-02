function BindingRoot(model) {

	this.assertUniqueness();

	var rootViewModel = new BindingRoot.ViewModel(model);

	rootViewModel.applyBinding();

	this.rebindDataStructure(function() {

		rootViewModel.applyBinding();
	});

	var domWatcher = new BindingRoot.DomWatcher(document.body);

	this.disconnect = function() {

		domWatcher.disconnect();
	};
}

BindingRoot.prototype = new UniqueRoot();
