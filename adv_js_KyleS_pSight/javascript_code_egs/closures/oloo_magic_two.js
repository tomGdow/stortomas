function Foo(who) {
	this.me = who;
}

Foo.prototype.identify  = function () {
	return "I am " + this.me;
};

var Bar = Object.create(Foo.prototype);
Bar.init = function (who) {
	Foo.call(this, who);
}

Bar.speak = function () {
	console.log("Hello" + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
b1.speak();
