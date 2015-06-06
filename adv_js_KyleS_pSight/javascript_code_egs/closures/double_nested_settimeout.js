
function foo () {
	var bar = 0;

	setTimeout(function() {
			var baz = 1;
			console.log(bar++);

			setTimeout(function() {
				console.log(bar + baz);
				},2000);
			},1000);
}


foo();

