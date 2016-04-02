BindingRoot.ViewModel.Property = function(property) {

	if (typeof(property) == "object") {

		this.objectBinding = new BindingRoot.With(property);
	}

	this.applyBinding = function(scope, key, model) {

		injectProperty(model, key);

		if (this.objectBinding) {

			this.objectBinding.applyBinding(scope, key, model);
		}
	};

	function injectProperty(model, key) {

		var datum = new Datum(property);

		Object.defineProperty(model, key, {

			get: function() { return datum(); },
			set: function(value) { datum(value); }
		});
	}

	this.removeBinding = function() {

		if (this.objectBinding) {

			this.objectBinding.removeBinding();
		}
	};

	this.isOlderThan = function(other) {

		return !property || !other || property != other;
	};
};
