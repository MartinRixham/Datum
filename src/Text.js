function Text(text) {

	this.bind = function(name) {
	
		document.querySelector("[data-bind=" + name + "]").innerHTML = text;
	};
}
