// The "foreach" binding is applied when an array is bound to an element.
// It copies the contents of the element to which it is bound once
// for each element of the array.
BindingRoot.ForEach = function(scope, model) {

	var currentScope = null;

	model.subscribableLength = model.length;

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
			
				if (model[k].applyBinding) {

					model[k].applyBinding(
						scope,
						k,
						model);
				}
				else {

					BindingRoot.bindObject(scope.children[k], model[k]);
				}
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

		var childNodeName = function(name, parentName) {

			switch(name) {

				case "TABLE":
					return "TBODY";
				case "TBODY":
					return "TR";
				case "THEAD":
					return "TR";
				case "TR":
					return parentName == "THEAD" ? "TH" : "TD";
				case "SPAN":
					return "SPAN";
				case "OL":
					return "LI";
				case "UL":
					return "LI";
				default:
					return "DIV";
			}
		};

		var newElement = function() {

			var childName =
				childNodeName(
					scope.nodeName,
					scope.parentElement.nodeName);

			var element =
				document.createElement(childName);

			for (var j = 0; j < children.length; j++) {

				var child = children[j];

				var clone = child.cloneNode(true);

				self.number(clone, index);

				element.appendChild(clone);
			}

			index += 1;

			return element;
		};

		var append = function(array) {

			for (var i = 0; i < array.length; i++) {

				var property = array[i];

				var element = newElement();

				scope.appendChild(element);

				if (property && typeof(property) == "object") {

					BindingRoot.bindObject(element, property);
				}
			}
		};

		var insertBefore = function(index, array) {

			for (var i = array.length - 1; i >= 0; i--) {

				var property = array[i];

				var element = newElement();

				scope.insertBefore(element, scope.children[index]);

				if (property && typeof(property) == "object") {

					BindingRoot.bindObject(element, property);
				}
			}
		};

		append(model);

		var originalPush = model.push;

		model.push = function() {

			originalPush.apply(model, arguments);

			append(arguments);

			model.subscribableLength = model.length;
		};

		var originalPop = model.pop;

		model.pop = function() {

			originalPop.apply(model, arguments);

			scope.removeChild(scope.lastElementChild);

			model.subscribableLength = model.length;
		};

		var originalShift = model.shift;

		model.shift = function() {

			originalShift.apply(model, arguments);

			scope.removeChild(scope.firstElementChild);

			model.subscribableLength = model.length;
		};

		var originalUnshift = model.unshift;

		model.unshift = function() {

			originalUnshift.apply(model, arguments);

			insertBefore(0, arguments);

			model.subscribableLength = model.length;
		};
		
		var originalSplice = model.splice;
		
		model.splice = function(start, deleteCount) {
		
			originalSplice.apply(model, arguments);
			
			for (var i = deleteCount - 1; i >= 0; i--) {
			
				scope.removeChild(scope.children[start + i]);
			}
			
			var newObjects =
				Array.prototype.slice.call(arguments, 2);
			
			insertBefore(start, newObjects);

			model.subscribableLength = model.length;
		};

		model.sort = function(compareFunction) {

			var modelElementPairs = [];

			for (var i = 0; i < model.length; i++) {

				modelElementPairs.push({

					model: model[i],
					element: scope.children[i]
				});
			}

			for (i = scope.children.length - 1; i >=0; i--) {

				scope.removeChild(scope.children[i]);
			}

			if (compareFunction) {

				modelElementPairs.sort(function(a, b) {

					return compareFunction(a.model, b.model);
				});
			}
			else {

				modelElementPairs.sort(function(a, b) {

					if (a.model > b.model) {

						return 1;
					}

					if (a.model < b.model) {

						return -1;
					}

					return 0;
				});
			}

			for (i = 0; i < modelElementPairs.length; i++) {

				scope.appendChild(modelElementPairs[i].element);

				model[i] = modelElementPairs[i].model;
			}
		};

		var originalReverse = model.reverse;

		model.reverse = function() {

			var children = [];

			for (var i = scope.children.length - 1; i >= 0; i--) {

				var child = scope.children[i];

				children[i] = child;

				scope.removeChild(child);
			}

			for (i = children.length - 1; i >= 0; i--) {

				scope.appendChild(children[i]);
			}

			originalReverse.apply(model, arguments);
		};
	};

	model.applyBinding = function(scope, name, model) {

		if (isNaN(name)) {
		
			scope = scope.querySelector("[data-bind=" + name + "]"); 
		}
		else {
		
			scope = scope.children[name];
		}

		if (scope) {

			new BindingRoot.With(model, name, scope);

			self.bind(scope);
		}
	};

	this.bind(scope);

	return model;
};
