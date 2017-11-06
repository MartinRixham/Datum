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

	ClassesBinding.prototype.test = function(parentModel) {

		var classes = {

			classes: {}
		};

		for (var key in this.callbacks) {

			classes.classes[key] = this.callbacks[key].bind(parentModel);
		}

		return classes;
	};

	return ClassesBinding;
});
