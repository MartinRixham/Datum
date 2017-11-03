define([
	"element/Elements",
	"tracking/Registry",
	"tracking/Dependant"
], function(
	Elements,
	Registry,
	Dependant) {

	function ObjectBinding(scope) {

		this.scope = scope;

		this.removed = false;

		this.boundElements = new Elements();
	}

	ObjectBinding.prototype.applyBinding = function(element, model, name) {

		var removed = this.boundElements.removeOld();
		this.resetElements(removed);

		if (element.get()) {

			this.bindElements(element, model, name);
		}
	};

	ObjectBinding.prototype.bindElements = function(element, model, name) {

		if (this.boundElements.contains(element)) {

			this.updateElement(element, model && model[name]);
		}
		else {

			this.boundElements.add(element.toObjectElement());
			new Registry().requestRegistrations();
			this.updateElement(element, model && model[name]);
			this.createCallback(this.scope, element);
		}
	};

	ObjectBinding.prototype.updateElement = function(element, model) {

		var objectElement = this.boundElements.getElementEqualTo(element);

		if (model) {

			if (this.removed) {

				this.removed = false;
				objectElement.replaceChildren();
			}
		}
		else {

			this.removed = true;
			objectElement.removeChildren();
		}
	};

	ObjectBinding.prototype.createCallback = function(scope, element) {

		var running = false;

		function callback() {

			if (!running) {

				running = true;
				scope.rebind();
				running = false;
			}
		}

		new Registry().assignUpdater(new Dependant(callback, this, element));
	};

	ObjectBinding.prototype.removeBinding = function() {

		var elements = this.boundElements.get();

		this.resetElements(elements);
	};

	ObjectBinding.prototype.resetElements = function(elements) {

		for (var i = 0; i < elements.length; i++) {

			var element = elements[i];

			element.replaceChildren();
			this.boundElements.remove(element);
		}
	};

	return ObjectBinding;
});
