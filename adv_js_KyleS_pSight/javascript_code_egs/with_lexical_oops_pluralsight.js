var obj = {
a: 2,
b: 3,
c: 4,
};

//obj.a = obj.b + obj.c;
//obj.c = obj.b + obj.a;

with (obj) {
	a = b + c;
	c = b - a;
	d =3; 
}

console.log(obj.a);  // 7
console.log(obj.b);  // 3
console.log(obj.c);  // -4
console.log('-----');
console.log(obj.d);// undefined12
console.log(d);    //3 !!
