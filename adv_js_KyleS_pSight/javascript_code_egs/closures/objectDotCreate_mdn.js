// Shape -superclass
function Shape () {

	this.x = 0;
	this.y =0;
}

//Superclass method
Shape.prototype.move = function(x, y) {
	this.x += x;
	this.y += y;
	console.log('Shape moved');
};

//Rectangle -subclass
function Rectangle() {
	Shape.call(this); //call super constructor
} 

//Subclass extends superclass
Rectangle.prototype=Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();
var shap = new Shape();

console.log(Shape.toString());
console.log(Rectangle.toString());
console.log('----');
console.log('Is rect an instance of Rectangle?' + (rect instanceof Rectangle));

console.log('Is rect an instance of Shape?' + (rect instanceof Shape));
rect.move(1,1);
shap.move(1,1);
