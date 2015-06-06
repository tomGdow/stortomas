// See here http://stackoverflow.com/a/17308587/499167
function makeCalculator () {
	var n = 0;
	return {
		add: function (a) {
			n += a;
			return n;
		},
	multiply: function (a) {
		n *= a;
		return n;
		}
	};
}
myCalculatorOne = makeCalculator();
myCalculatorTwo = makeCalculator();
console.log(myCalculatorOne.add(3));
console.log(myCalculatorTwo.add(50));
console.log(myCalculatorOne.multiply(33));
console.log(myCalculatorTwo.multiply(25));
