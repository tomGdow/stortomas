
function Foo (who) {
	this.me = who;
}

Foo.prototype.identify = function () {
	return "I am " + this.me;
};

function Bar(who) {
	Foo.call(this, who);
}
//Bar.prototype = new Foo();
Bar.prototype = Object.create(Foo.prototype);
//Note .constructor is borked here.  Need to fix.

Bar.prototype.speak = function () {
	console.log("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Nar("b2");

b1.speak();
b2.speak();
//Hello, I am b1.
//Hello, I am b2.
