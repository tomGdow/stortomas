
var foo = (function () {

		var o = {bar: "bar"};
		return {obj: o};
		})();

console.log(foo.obj.bar);  
