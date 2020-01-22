define([
	"element/Elements",
	"object/Serialisable",
	"property/TransientProperty",
	"property/PermanentProperty",
	"property/PropertyType",
	"element/NullDOMElement"
], function(
	Elements,
	Serialisable,
	TransientProperty,
	PermanentProperty,
	PropertyType,
	NullDOMElement) {

	function ViewModel(model) {

		this.model = model;

		this.boundElements = new Elements();

		this.transientProperties = {};

		this.permanentProperties = {};

		new Serialisable(model);
	}

	ViewModel.prototype.applyBinding = function(element) {

		this.boundElements.removeOld();
		this.unbindOldProperties();

		if (!this.boundElements.contains(element)) {

			this.boundElements.add(element);
			this.createRebinder(element);
			element.callBindingCallback(this.model);
		}

		this.createPermanentProperties(element);
		this.createTransientProperties();
		this.bindProperties(element);
	};

	ViewModel.prototype.createRebinder = function(element) {

		var self = this;

		element.createRebinder(function() {

			ViewModel.prototype.applyBinding.call(self, element);
		});
	};

	ViewModel.prototype.unbindOldProperties = function() {

		for (var key in this.transientProperties) {

			if (!this.model[key]) {

				this.transientProperties[key].removeBinding();
				delete this.transientProperties[key];
			}
		}
	};

	ViewModel.prototype.createPermanentProperties = function(element) {

		for (var key in this.model) {

			if (!this.permanentProperties[key] ||
				!this.permanentProperties[key].hasScope(element)) {

				this.permanentProperties[key] =
					new PermanentProperty(
						this.model[key],
						this.createPropertyType(),
						element);
			}
		}
	};

	ViewModel.prototype.createTransientProperties = function() {

		for (var key in this.model) {

			if (this.isNew(key)) {

				if (this.transientProperties[key]) {

					this.transientProperties[key].removeBinding();
				}

				this.transientProperties[key] =
					new TransientProperty(this.model[key], this.createPropertyType());
			}
		}
	};

	ViewModel.prototype.isNew = function(key) {

		var property = this.transientProperties[key];

		return !property || property.isOlderThan(this.model[key]);
	};

	ViewModel.prototype.createPropertyType = function() {

		return new PropertyType(function(model) { return new ViewModel(model); });
	};

	ViewModel.prototype.bindProperties = function(scope) {

		for (var key in this.permanentProperties) {

			var elements = this.getElements(scope, key);

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				this.permanentProperties[key].applyBinding(element, this.model, key);
				this.transientProperties[key].applyBinding(element, this.model, key);
			}
		}
	};

	ViewModel.prototype.getElements = function(scope, name) {

		var elements = scope.getMatchingElements(name);

		return elements.length ? elements : [new NullDOMElement()];
	};

	ViewModel.prototype.removeBinding = function() {

		for (var key in this.permanentProperties) {

			this.permanentProperties[key].removeBinding();
			this.transientProperties[key].removeBinding();
		}
	};

	return ViewModel;
});
