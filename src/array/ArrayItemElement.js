define([], function() {

	function ArrayItemElement(element) {

		this.element = element;

		this.index = 0;
	}

	ArrayItemElement.prototype.clone = function() {

		var clone = this.element.cloneNode(true);

		this.number(clone, this.index++);

		return clone;
	};

	ArrayItemElement.prototype.number = function(element, index) {

		if (element.id) {

			element.id = element.id + "_" + index;
		}

		if (element.hasAttribute("name")) {

			var name = element.getAttribute("name") + "_" + index;

			element.setAttribute("name", name);
		}

		for (var i = 0; i < element.children.length; i++) {

			this.number(element.children[i], index);
		}
	};

	ArrayItemElement.prototype.get = function() {

		return this.element;
	};

	return ArrayItemElement;
});
