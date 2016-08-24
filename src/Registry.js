define([], function() {

	var registry = [];

	var registering = false;

	var rebind = null;

	var rebindRequested = false;

	function Registry() {

		// The registry, the registering flag
		// and the following three methods
		// mediate the process of dependency tracking.
		// When a binding callback is supplied to a binding
		// the binding firstly requests registrations
		// then executes the callback.
		// Any datum evaluated during the callback execution
		// will check that updater assigners are being registered
		// and if so will register an updater assigner in the registry.
		// After the callback has been executed the binding will
		// instruct the registry to assign the updater
		// which it supplies to the registry.
		// The updater assigners will then be called to assign
		// the updater to any datum which supplied an assigner.
		// If in the future the value of a datum which has been
		// assigned the updater changes the datum will call the
		// updater which will update the elements which are bound
		// to the binding.
		this.registerUpdaterAssigner = function(assigner) {

			if (registering) {

				registry.push(assigner);
			}
		};

		this.requestRegistrations = function() {

			registry = [];
			registering = true;
		};

		this.assignUpdater = function(dependant) {

			for (var i = 0; i < registry.length; i++) {

				registry[i](dependant);
			}

			registering = false;
		};

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

	return Registry;
});
