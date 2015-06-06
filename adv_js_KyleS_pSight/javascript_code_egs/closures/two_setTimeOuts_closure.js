
function foo () {
	var bar =0;

	setTimeout(function () {
		console.log(bar++);
	}, 2000);
	setTimeout(function() {
		console.log(bar++);
	},2500);
}

foo();
