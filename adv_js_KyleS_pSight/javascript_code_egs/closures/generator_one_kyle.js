'use strict'
function gen () {

    console.log('Hello');
    yield ;
    console.log('World');
}

var it = gen();
it.next();
