define([], function() {

	function UniqueRoot() {

		var flag = false;

		this.assertUniqueness = function() {

			if (flag) {

				throw new Error(
					"The binding root is unique and cannot be instantiated multiple times.");
			}
			else {

				flag = true;
			}
		};
	}

	return UniqueRoot;
});
