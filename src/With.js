// The "with" binding is the binding that is applied automatically
// and by convention whenever a plain object is bound to an element.
// Its effect is to remove all child elements from the DOM
// when the object is null.
BindingRoot.With = function(model, key, element, scope) {

	if (!this.isInScope(element, scope)) {

		return;
	}

	if (!element.boundObjects) {

		element.boundObjects = [];
	}

	var alreadyBound = element.boundObjects.indexOf(model) + 1;

	if (alreadyBound) {

		return;
	}

	element.boundObjects.push(model);

	var children = [];

	for (var i = 0; i < element.childNodes.length; i++) {

		children[i] = element.childNodes[i];
	}

	this.requestRegistrations();

	var object = model[key];

	if (!object) {

		children.forEach(function(child) {

			element.removeChild(child);
		});
	}

	this.assignUpdater(function() {

		var object = model[key];

		for (var i = element.childNodes.length - 1; i >= 0; i--) {

			element.removeChild(element.childNodes[i]);
		}

		if (object) {

			children.forEach(function(child) {

				element.appendChild(child);
			});

			BindingRoot.bindObject(element, object);
		}
	},
	this,
	element);
};

BindingRoot.With.prototype = new Subscriber();
