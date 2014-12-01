function Text(text) {

	this.bind = function(scope, name) {

		if (typeof(text) == "function") {

			if (text() && text().isDatum) {

				text = text();
			}

			if (text.isDatum) {

				scope.querySelector("[data-bind=" + name + "]").innerHTML = text();

				text.update(function() {

					scope.querySelector("[data-bind=" + name + "]").innerHTML =
						text();
				});
			}
			else {

				this.requestRegistrations();
		
				scope.querySelector("[data-bind=" + name + "]").innerHTML = text();

				this.applyUpdaters(function() {
		
					scope.querySelector("[data-bind=" + name + "]").innerHTML = 
						text();
				});
			}
		}
		else {

			scope.querySelector("[data-bind=" + name + "]").innerHTML = text;
		}
	};
}

Text.prototype = new Subscriber();
