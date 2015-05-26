
function b() {
	return c;
}
var a
var c
var d

a = b();
c = d();
console.log(a);
console.log(c);

d = function () {
	return b();
};
