
function trySomething(cb) {
    setTimeout(function () {
        var num = Math.random();
        if (num > 0.5) cb(null,num);
        else cb("Too low!");
    }, 1000);
}

trySomething( 
        function(err,num) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Number: " + num) 
    console.log("Sorry: " + num);
            }
        });
