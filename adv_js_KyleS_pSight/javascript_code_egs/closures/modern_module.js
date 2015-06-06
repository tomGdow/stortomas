
define("foo", function () {

	var o = {bar: "baz"};
		return {
			bar: function() {
				console.log(o.bar);
			}
		};

});
