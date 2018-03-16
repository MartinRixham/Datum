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

		for (var i = 0; i < this.elements.length; i++) {

			if (this.elements[i].equals(element)) {

				return true;
			}
		}

		return false;
	};

	Elements.prototype.empty = function() {

		var elements = this.elements;

		this.elements = [];

		return elements;
	};

	Elements.prototype.get = function() {

		return this.elements;
	};

	return Elements;
});
