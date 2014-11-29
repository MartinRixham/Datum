function Binding(bindings) {

  var query = function(query) {

    return document.querySelector(query);
  };

	this.bind = function(name) {

		if(bindings.text) {

			query("[data-bind=" + name + "]").innerHTML = bindings.text;
		}
	};
}
