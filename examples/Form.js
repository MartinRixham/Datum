function Form() {

	this.first = "answer";

	this.second = "another answer";

	this.date = new DatePicker();

	this.yesnos = 
		[
			new YesNoQuestion("Is this the first question?"),
			new YesNoQuestion("Is this the second question?")
		];

	var self = this;

	this.hideDate = new Binding({

		click: function() { 

			if (self.date) {

				self.date = null; 
			}
			else {

				self.date = new DatePicker();
			}
		},

		text: function() {

			if (self.date) {

				return "Hide";
			}

			else return "Show";
		}
	});

	this.input1 = new Binding({

		value: function(value) {

			if (value) {

				self.first = value;
			}

			return self.first;
		},

		text: function() { return self.first; }
	});

	this.input2 = new Binding({

		value: function(value) {

			if (value) {

				self.second = value;
			}

			return self.second;
		},

		text: function() { return self.second; }
	});

	this.go = new Binding({

		click: function() { 

			var form = document.querySelector("form");

			var request = new XMLHttpRequest();

			request.open("GET", "form-readonly.html");
			request.onload = function() {

				form.innerHTML = request.responseText;
			};

			request.send();
		} 
	});
}

function DatePicker() {

	this.theday = 17;

	this.themonth = 12;

	this.theyear = 2014;

	var self = this;

	this.day = new Binding({

		value: function(value) {

			if (value) {

				self.theday = value;
			}

			return self.theday;
		},

		text: function() { return self.theday; }
	});

	this.month = new Binding({

		value: function(value) {

			if (value) {

				self.themonth = value;
			}

			return self.themonth;
		},

		text: function() { return self.themonth; }
	});

	this.year = new Binding({

		value: function(value) {

			if (value) {

				self.theyear = value;
			}

			return self.theyear;
		},

		text: function() { return self.theyear; }
	});
}

function YesNoQuestion(question) {

	this.thequestion = question;

	this.answer = "no answer given";

	var self = this;

	this.yesno = new Binding({

		value: function(value) {

			if (value) {

				self.answer = value;
			}
		},

		text: function() { return self.answer; }
	});

	this.question = new Binding({

		text: function() { return self.thequestion; }
	});
}

document.addEventListener("DOMContentLoaded", function() {

	new BindingRoot(form = new Form());
});
