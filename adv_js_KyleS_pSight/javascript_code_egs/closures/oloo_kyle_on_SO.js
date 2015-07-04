var  FooObj ={y: 11};

var BarObj = Object.create(FooObj);
BarObj.z=31;

var x = Object.create(BarObj);

console.log('--');
console.log(FooObj.toString());
console.log(FooObj);
console.log(JSON.stringify(FooObj));
console.log('----');
console.log(BarObj.toString());
console.log(BarObj);
console.log(JSON.stringify(BarObj));
console.log('---');
console.log(BarObj.__proto__);
console.log(x.y + x.z);
console.log('------------');

console.log(BarObj.prototype);
console.log(FooObj.prototype);
console.log(x);
