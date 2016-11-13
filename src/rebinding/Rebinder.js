define([], function() {

	var rebind = null;

	var rebindRequested = false;

	function Rebinder() {

		// The rebind callback, the rebind requested flag
		// and the following three methods
		// organise the application of new bindings.
		// After the binding root has performed the initial binding
		// it supplies a rebinding callback to the registry.
		// When a new binding is instantiated it requests a rebinding.
		// The rebinding is then initialised by the next datum to be called.
		this.registerRebinder = function(callback) {

			rebind = callback;
		};

		this.rebindDataStructure = function() {

			if (rebind && rebindRequested) {

				rebindRequested = false;
				rebind();
			}
		};

		this.requestRebind = function() {

			if (rebind) {

				rebindRequested = true;
			}
		};
	}

	return Rebinder;
});
