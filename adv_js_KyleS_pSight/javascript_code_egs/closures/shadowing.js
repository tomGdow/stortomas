function Foo(who) {
	this.me =who;
}
Foo.prototype.identify = function () {
	return "I am " + this.me;
};
var a1 = new Foo("a1");
console.log(a1.identify());
a1.identify = function () {
	console.log("Hello, " + Foo.prototype.identify.call(this) + ".");
};
a1.identify();

