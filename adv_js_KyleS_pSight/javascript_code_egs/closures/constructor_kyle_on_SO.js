function Foo () {}
Foo.prototype.y=11;

function Bar() {}
Bar.prototype=Object.create(Foo.prototype);
Bar.prototype.z = 31;
var x = new Bar();
console.log('--');
console.log(Foo.toString());
console.log(Foo);
console.log(JSON.stringify(Foo));
console.log('----');
console.log(Bar.toString());
console.log(Bar);
console.log(JSON.stringify(Bar));
console.log('---');
console.log(Bar.__proto__);
console.log(x.y + x.z);
console.log('------------');
var output = '';
for (var property in Bar) {
	  output += property + ': ' + object[property]+'; ';
}
console.log(output);
console.log(Bar.prototype);
console.log(Foo.prototype);
console.log(x);
