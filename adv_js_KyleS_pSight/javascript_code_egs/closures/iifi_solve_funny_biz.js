
function foo () {
	for(var i=0; i<=5; i++) { 
		(function(i){
		 setTimeout(function () {
			 console.log("i " + i); 
			 }, i*2000)
		 })(i);
	}
}

foo();

