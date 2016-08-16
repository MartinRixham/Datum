define(["Registry"], function(Registry) {

	function Subscriber() {}

	Subscriber.prototype = new Registry();

	return Subscriber;
});
