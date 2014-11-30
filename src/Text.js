function Text(text) {

	this.bind = function(scope, name) {
	
		scope.querySelector("[data-bind=" + name + "]").innerHTML = text;
	};
}
