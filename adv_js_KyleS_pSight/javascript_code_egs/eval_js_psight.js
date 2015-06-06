var bar = "bar"
function foo(str)  {
	eval(str); 
	console.log(bar);
}
foo();
foo("2+2");
foo("var bar = 42;");
