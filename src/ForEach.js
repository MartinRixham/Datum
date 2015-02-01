BindingRoot.importForeach(function(bindObject) {

	// The "foreach" binding is applied when an array is bound to an element.
	// It copies the contents of the element to which it is bound once
	// for each element of the array.
	function ForEach(scope, model) {

		var currentScope = null;

		this.number = function(element, index) {

			if (element.id) {

				element.id = element.id + "_" + index;
			}

			if (element.hasAttribute && element.hasAttribute("name")) {

				element.setAttribute("name", element.getAttribute("name") + "_" + index);
			}

			if (element.children) {

				for (var i = 0; i < element.children.length; i++) {

					var subelement = element.children[i];

					this.number(subelement, index);
				}
			}
		};

		var self = this;

		this.bind = function(scope) {

			if (scope == currentScope) {

				for (var k = 0; k < model.length; k++) {

					bindObject(scope.children[k], model[k]);
				}

				return;
			}

			scope._rebind = function() {};

			currentScope = scope;

			var children = [];

			for (var i = scope.childNodes.length - 1; i >= 0; i--) {

				children[i] = scope.childNodes[i];

				scope.removeChild(scope.childNodes[i]);
			}

			var index = 0;

			var newElement = function() {

				var element = document.createElement(scope.nodeName);

				for (var j = 0; j < children.length; j++) {

					var child = children[j];

					var clone = child.cloneNode(true);

					self.number(clone, index);

					element.appendChild(clone);
				}

				index += 1;

				return element;
			}

			var append = function(array) {

				for (var i = 0; i < array.length; i++) {

					var property = array[i];

					var element = newElement();

					scope.appendChild(element);

					if (typeof(property) == "object") {

						bindObject(element, property);
					}
				}
			};

			var prepend = function(array) {

				for (var i = 0; i < array.length; i++) {

					var property = array[i];

					var element = newElement();

					scope.insertBefore(element, scope.firstChild);

					if (typeof(property) == "object") {

						bindObject(element, property);
					}
				}
			}

			append(model);

			var originalPush = model.push;

			model.push = function() {

				originalPush.apply(model, arguments);

				append(arguments);
			};

			var originalPop = model.pop;

			model.pop = function() {

				originalPop.apply(model, arguments);

				scope.removeChild(scope.lastElementChild);
			}

			var originalShift = model.shift;

			model.shift = function() {

				originalShift.apply(model, arguments);

				scope.removeChild(scope.firstElementChild);
			}

			var originalUnshift = model.unshift;

			model.unshift = function() {

				originalUnshift.apply(model, arguments);

				prepend(arguments);
			};
		};

		model.applyBinding = function(scope, name, model) {

			scope = scope.querySelector("[data-bind=" + name + "]"); 

			//applyWithBinding(model, name, scope);

			self.bind(scope);
		};

		this.bind(scope);

		return model;
	}

	return ForEach;
});
