define([], function() {

	function Elements() {

		this.elements = [];
	}

	Elements.prototype.add = function(element) {

		this.elements.push(element);
	};

	Elements.prototype.removeOld = function() {

		var removed = [];

		for (var i = this.elements.length - 1; i >= 0; i--) {

			var element = this.elements[i];

			if (element.removedFromDocument()) {

				this.elements.splice(i, 1);
				removed.push(element);
			}
		}

		return removed;
	};

	Elements.prototype.getElementEqualTo = function(element) {

		for (var i = 0; i < this.elements.length; i++) {

			if (this.elements[i].equals(element)) {

				return this.elements[i];
			}
		}
	};

	Elements.prototype.contains = function(element) {

		var contains = false;

		for (var i = 0; i < this.elements.length; i++) {

			if (this.elements[i].equals(element)) {

				contains = true;
			}
		}

		return contains;
	};

	Elements.prototype.remove = function(element) {

		for (var i = 0; i < this.elements.length; i++) {

			if (this.elements[i].equals(element)) {

				this.elements.splice(i, 1);
			}
		}
	};

	Elements.prototype.get = function() {

		return this.elements;
	};

	return Elements;
});
