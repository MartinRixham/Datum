require(["Binding", "Click", "BindingRoot"], function(Binding, Click, BindingRoot) {

	function Form() {

		this.first = "answer";

		this.second = "another answer";

		this.date = new DatePicker();

		this.input1 = new Binding({

			value: function(value) {

				if (value) {

					this.first = value;
				}

				return this.first;
			},
			text: function() {

				return this.first;
			}
		});

		this.yesnos =
			[
				new YesNoQuestion("Is this the first question?"),
				new YesNoQuestion("Is this the second question?")
			];

		this.theNewQuestion = "";

		this.input2 = new Binding({

			value: function(value) {

				if (value) {

					this.second = value;
				}

				return this.second;
			},
			text: function() {

				return this.second;
			}
		});

		this.hideDate = new Binding({

			click: function() {

				if (this.date) {

					this.date = null;
				}
				else {

					this.date = new DatePicker();
				}
			},

			text: function() {

				if (this.date) {

					return "Hide";
				}
				else {

					return "Show";
				}
			}
		});

		this.newQuestion = new Binding({

			value: function(value) {

				if (value) {

					this.theNewQuestion = value;
				}

				return this.theNewQuestion;
			}
		});

		this.addQuestion = new Binding({

			click: function() {

				this.yesnos.push(new YesNoQuestion(this.theNewQuestion + "?"));
				this.theNewQuestion = "";
			}
		});

		this.go = new Binding({

			click: function() {

				var request = new XMLHttpRequest();

				request.open("GET", "form-readonly.html");
				request.onload = function() {

					document.body.innerHTML = request.responseText;
				};
				request.send();
			}
		});
	}

	function DatePicker() {

		var date = new Date();

		this.theday = date.getDate();

		this.themonth = date.getMonth() + 1;

		this.theyear = date.getFullYear();

		this.day = new Binding({

			value: function(value) {

				if (value) {

					this.theday = value;
				}

				return this.theday;
			},
			text: function() {

				return this.theday;
			}
		});

		this.month = new Binding({

			value: function(value) {

				if (value) {

					this.themonth = value;
				}

				return this.themonth;
			},
			text: function() {

				return this.themonth;
			}
		});

		this.year = new Binding({

			value: function(value) {

				if (value) {

					this.theyear = value;
				}

				return this.theyear;
			},
			text: function() {

				return this.theyear;
			}
		});
	}

	function YesNoQuestion(question) {

		this.thequestion = question;

		this.answer = "no answer given";

		this.yesno = new Binding({

			value: function(value) {

				if (value) {

					this.answer = value;
				}
			},
			text: function() {

				return this.answer;
			}
		});

		this.question = new Binding({

			text: function() {

				return this.thequestion;
			}
		});

		this.compareTo = function(other) {

			var thisQuestion =
				this.thequestion.toUpperCase();

			var otherQuestion =
				other.thequestion.toUpperCase();

			if (thisQuestion > otherQuestion) {

				return 1;
			}
			else if (thisQuestion < otherQuestion) {

				return -1;
			}
			else {

				return 0;
			}
		};
	}

	new BindingRoot(form = new Form());
});
