define([], function() {

	function Elements() {

		var elements = [];

		this.add = function(element) {

			elements.push(element);
		};

		this.removeOld = function() {

			var removed = [];

			for (var i = elements.length - 1; i >= 0; i--) {

				var element = elements[i];

				if (element.removedFromDocument()) {

					elements.splice(i, 1);
					removed.push(element);
				}
			}

			return removed;
		};

		this.getElementEqualTo = function(element) {

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					return elements[i];
				}
			}
		};

		this.contains = function(element) {

			var contains = false;

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					contains = true;
				}
			}

			return contains;
		};

		this.remove = function(element) {

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					elements.splice(i, 1);
				}
			}
		};

		this.get = function() {

			return elements;
		};
	}

	return Elements;
});
