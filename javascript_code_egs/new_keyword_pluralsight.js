function foo() {
	this.baz = "baz";
	console.log(this.bar + " " + baz);
}
var baz = "bar";
var baz = new foo();
baz.baz
