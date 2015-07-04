function Foo(who) {
	this.me = who;
}

Foo.prototype.identify  = function () {
	return "I am " + this.me
};

function Bar(who) {
	Foo.call(this, who);
}

Bar.prototype = Object.create(Foo.prototype);
Bar.prototype.speak = function () {
	console.log("Hello" + this.identify() + ".");
};
var b1 = Object.create(Bar.prototype);
Bar.call(b1,"b1");
b1.speak();
