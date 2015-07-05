var run = coroutine(function () {
    var x = 1 + (yield null);
    var y = 1 + (yield null);
    yield (x + y);
});

run();
run(10);
console.log(
        "Meaning of life: " + run(30).value
        );

