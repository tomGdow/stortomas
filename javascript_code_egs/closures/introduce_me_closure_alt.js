function person (name, age)  {
	var name = name;
	var age = age;
	return {
		introduce : function  () {
			console.log("My age is " + name + ", and I'm " + age);
		}
	};

}
var a = person("jack", 12)
var b = person("Matt", 22)

a.introduce();
b.introduce();
