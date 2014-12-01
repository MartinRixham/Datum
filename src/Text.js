function Text(text) {

	this.bind = function(scope, name) {

		if (text.isDatum) {

			scope.querySelector("[data-bind=" + name + "]").innerHTML = text();

			text.update(function() {

				scope
					.querySelector("[data-bind=" + name + "]")
					.innerHTML =
						text();
			});
		}
		else if (typeof(text) == "function") {

			this.requestRegistrations();
		
			scope.querySelector("[data-bind=" + name + "]").innerHTML = text();

			this.applyUpdaters(function() {
		
				scope
					.querySelector("[data-bind=" + name + "]")
					.innerHTML = 
						text();
			});
		}
		else {

			scope.querySelector("[data-bind=" + name + "]").innerHTML = text;
		}
	};
}

Text.prototype = new Subscriber();
