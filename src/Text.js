function Text(text) {

	this.bind = function(scope, name) {

		if (typeof(text) == "function") {

			if (text() && text().isDatum) {

				text = text();
			}

			this.requestRegistrations();
		
			scope.querySelector("[data-bind=" + name + "]").innerHTML = text();

			this.applyUpdaters(function() {
		
				scope.querySelector("[data-bind=" + name + "]").innerHTML = 
					text();
			});
		}
		else {

			scope.querySelector("[data-bind=" + name + "]").innerHTML = text;
		}
	};
}

Text.prototype = new Subscriber();
