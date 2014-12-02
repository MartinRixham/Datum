function Registry() {

	var registry = [];

	var registering = false;

	this.registerUpdaterAssigner = function(assigner) {

		registry.push(assigner);
	};

	this.requestRegistrations = function() {

		registry = [];

		registering = true;
	};

	this.registeringUpdates = function() {

		return registering;
	};

	this.applyUpdaters = function(callback) {

		for (var i = 0; i < registry.length; i++) {

			registry[i](callback);
		}

		registering = false;
	};

	var rebind = null;

	var rebindRequested = false;

	this.rebind = function(callback) {

		if (callback && !rebind) {

			rebind = callback;
		}
		else if (rebind && rebindRequested) {

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
