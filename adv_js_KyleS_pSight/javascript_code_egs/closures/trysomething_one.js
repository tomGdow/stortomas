
function trySomething(ok, err) {
    setTimeout(function () {
        var num = Math.random();
        if (num > 0.5) ok(num);
        else err(num);
    }, 1000);
}
trySomething( 
        function(num) {
            console.log("Success: " + num);
        },
        function(num) {
            console.log("Sorry: " + num);
        });
