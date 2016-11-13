define([
	"object/ViewModel",
	"root/DOMWatcher",
	"rebinding/Rebinder",
	"element/RootDOMElement"
], function BindingRoot(
	ViewModel,
	DOMWatcher,
	Rebinder,
	RootDOMElement) {

	var flag = false;

	function BindingRoot(model) {

		checkModelType(model);
		assertUniqueness();

		var rootViewModel = new ViewModel(model);
		rootViewModel.applyBinding(new RootDOMElement());

		new Rebinder().registerRebinder(function() {

			rootViewModel.applyBinding(new RootDOMElement());
		});

		var domWatcher = new DOMWatcher(document.body);

		this.disconnect = function() {

			domWatcher.disconnect();
		};
	}

	function checkModelType(model) {

		if (typeof model != "object") {

			throw new Error("The binding root must be an object.");
		}

		if (model instanceof Array) {

			throw new Error("The binding root cannot be an array.");
		}
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
