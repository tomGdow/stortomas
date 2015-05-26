var a = b();
var c = d();
console.log(a);
console.log(c);

function b() {
	return c;
}

var d = function () {
	return b();
};




