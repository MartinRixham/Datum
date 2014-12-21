function Matrix() {

	this.one = 
		[
			{ character: new Binding({	text: function() { return "a"; } }) },
			{ character: new Binding({	text: function() { return "b"; } }) },
			{ character: new Binding({	text: function() { return "c"; } }) },
			{ character: new Binding({	text: function() { return "d"; } }) },
			{ character: new Binding({	text: function() { return "e"; } }) },
			{ character: new Binding({	text: function() { return "f"; } }) },
			{ character: new Binding({	text: function() { return "g"; } }) },
			{ character: new Binding({	text: function() { return "h"; } }) },
			{ character: new Binding({	text: function() { return "i"; } }) },
			{ character: new Binding({	text: function() { return "j"; } }) },
			{ character: new Binding({	text: function() { return "k"; } }) },
			{ character: new Binding({	text: function() { return "l"; } }) },
			{ character: new Binding({	text: function() { return "n"; } }) },
			{ character: new Binding({	text: function() { return "o"; } }) },
			{ character: new Binding({	text: function() { return "p"; } }) },
			{ character: new Binding({	text: function() { return "q"; } }) },
			{ character: new Binding({	text: function() { return "r"; } }) },
			{ character: new Binding({	text: function() { return "s"; } }) },
			{ character: new Binding({	text: function() { return "t"; } }) },
			{ character: new Binding({	text: function() { return "u"; } }) },
			{ character: new Binding({	text: function() { return "v"; } }) },
			{ character: new Binding({	text: function() { return "w"; } }) },
			{ character: new Binding({	text: function() { return "x"; } }) },
			{ character: new Binding({	text: function() { return "y"; } }) },
			{ character: new Binding({	text: function() { return "z"; } }) }
		];
}

document.addEventListener("DOMContentLoaded", function() {

	new BindingRoot(matrix = new Matrix());
});
