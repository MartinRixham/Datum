function Datum(datum) {

	var provider = function(value) {

		if (value) {

			datum = value;
		}
			
		return datum;
	};

	return provider;
}
