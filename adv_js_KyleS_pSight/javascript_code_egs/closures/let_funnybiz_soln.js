"use strict"
function foo () {

	for (let i =0; i <=5; i++) {
		setTimeout( function () {
			console.log("i " + i )
		},5000);
	} 
}

foo();