require([
	"tracking/Datum",
	"callback/Binding",
	"callback/Text",
	"callback/Value",
	"callback/Click",
	"root/BindingRoot"
], function(
	Datum,
	Binding,
	Text,
	Value,
	Click,
	BindingRoot) {

	function Form() {

		var firstQuestion = new Datum("answer");
		var secondQuestion = new Datum("another answer");
		var newQuestion = new Datum("");

		this.date = new DatePicker();

		this.firstQuestion =
			new Binding({

				value: firstQuestion,
				text: firstQuestion
			});

		this.secondQuestion =
			new Binding({

				value: secondQuestion,
				text: secondQuestion
			});

		this.yesnos =
			[
				new YesNoQuestion("Is this the first question?"),
				new YesNoQuestion("Is this the second question?")
			];

		this.hideDate =
			new Binding({

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

		this.newQuestion = new Value(newQuestion);

		this.addQuestion =
			new Click(function() {

				this.yesnos.push(new YesNoQuestion(newQuestion() + "?"));
				newQuestion("");
			});

		this.sort =
			new Click(function() {

				this.yesnos.sort(function(a, b) {

					return a.compareTo(b);
				});
			});

		this.go =
			new Click(function() {

				var request = new XMLHttpRequest();

				request.open("GET", "form-readonly.html");
				request.onload = function() {

					document.body.innerHTML = request.responseText;
				};
				request.send();
			});

		function DatePicker() {

			var date = new Date();
			var day = new Datum(date.getDate());
			var month = new Datum(date.getMonth() + 1);
			var year = new Datum(date.getFullYear());

			this.day =
				new Binding({

					value: day,
					text: day
				});

			this.month =
				new Binding({

					value: month,
					text: month
				});

			this.year =
				new Binding({

					value: year,
					text: year
				});
		}

		var getNumber = (function(yesnos) {

			return function(item) {

				return yesnos.indexOf(item) + 1 + ".";
			};
		})(this.yesnos);

		function YesNoQuestion(question) {

			question = new Datum(question);
			var answer = new Datum("no answer given");

			this.number =
				new Text(function() {

					return getNumber(this);
				});

			this.question = new Text(question);

			this.yesno =
				new Binding({

					value: function(value, element) {

						if (value) {

							answer(value);
						}

						return element.value;
					},
					text: answer
				});

			this.compareTo = function(other) {

				return -other.compareQuestion(question());
			};

			this.compareQuestion = function(otherQuestion) {

				var language = window.navigator.language;
				var options = { sensitivity: "base" };

				return question().localeCompare(otherQuestion, language, options);
			};
		}
	}

	new BindingRoot(form = new Form());
});
