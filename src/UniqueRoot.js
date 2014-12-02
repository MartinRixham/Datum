function UniqueRoot() {

	var flag = false;

	this.assertUniqueness = function() {

		if (flag) {

			throw { 
				
				message: "The binding root is unique and " + 
						"cannot be instantiated multiple times.",

				name: "DatumException"
			}
		}
		else {

			flag = true;
		}
	};
}
