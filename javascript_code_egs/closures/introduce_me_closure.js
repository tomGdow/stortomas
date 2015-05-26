function person (name, age)  {
	var name = name;
	var age = age;
		function introduce  () {
			console.log("My age is " + name + ", and I'm " + age);
		}
return introduce;

}
var a = person("jack", 12);
var b = person("Matt", 22);

a();
b();
