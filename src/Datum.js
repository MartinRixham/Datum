function Datum(datum) {

	var updateCallbacks = [];

	var provider = function(value) {

		if (value) {

			datum = value;

			for (var i = 0; i < updateCallbacks.length; i++) {

				updateCallbacks[i](value);	
			}
		}
			
		return datum;
	};

	provider.isDatum = true;

	provider.update = function(callback) {

		updateCallbacks.push(callback);
	};

	return provider;
}
