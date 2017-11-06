define([], function() {

	function ClassesBinding(callbacks) {

		this.callbacks = callbacks;
	}

	ClassesBinding.prototype.setUpElement = function() {};

	ClassesBinding.prototype.updateElement = function(parentModel, element) {

		var classes = this.splitClasses(element);

		for (var key in this.callbacks) {

			var index = classes.indexOf(key);

			if (this.callbacks[key].call(parentModel, element)) {

				if (index < 0) {

					classes.push(key);
				}
			}
			else {

				if (index + 1) {

					classes.splice(index, 1);
				}
			}
		}

		element.className = classes.join(" ");
	};

	ClassesBinding.prototype.splitClasses = function(element) {

		var classes;

		if (element.className) {

			classes = element.className.split(" ");
		}
		else {

			classes = [];
		}

		return classes;
	};

	ClassesBinding.prototype.resetElement = function() {};

	ClassesBinding.prototype.call = function(parentModel, element) {

		for (var key in this.callbacks) {

			this.callbacks[key].call(parentModel, element);
		}
	};

	ClassesBinding.prototype.test = function(parentModel) {

		var self = this;

		var classes = {

			classes: {}
		};

		function attachCallback(key) {

			classes.classes[key] = function(element) {

				return self.callbacks[key].call(parentModel, element);
			};
		}

		for (var key in this.callbacks) {

			attachCallback(key);
		}

		return classes;
	};

	return ClassesBinding;
});
