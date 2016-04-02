BindingRoot.ViewModel.ArrayBinding.Pop = function(model) {

	this.applyBinding = function(scope, name) {

		var element = this.getMatchingElement(scope, name);

		var originalPop = model.pop;

		model.pop = function() {

			originalPop.apply(model, arguments);

			element.removeChild(element.lastElementChild);

			model.subscribableLength = model.length;
		};
	};

	this.removeBinding = function() {};
};

BindingRoot.ViewModel.ArrayBinding.Pop.prototype = new Subscriber();
