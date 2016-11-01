define([], function() {

	function ElementSet() {

		var elements = [];

		this.add = function(element) {

			if (isNew(element)) {

				elements.push(element);
			}
		};

		function isNew(element) {

			var isNew = true;

			for (var i = 0; i < elements.length; i++) {

				if (elements[i].equals(element)) {

					isNew = false;
				}
			}

			return !isNew;
		}

		 this.removeOld = function() {

		 	var removed = [];

			for (var i = 0; i < elements.length; i++) {

				var element = elements[i];

				if (element.removedFromDocument()) {

					elements.splice(i, 1);
					removed.push(element);
				}
			}

			return removed;
		}
	}

	return ElementSet;
});