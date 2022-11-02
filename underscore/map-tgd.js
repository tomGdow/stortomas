var _ = require('underscore');


function mapThreadBoolean (arr, myboolean) {
    var stringArr = _.map(arr, function(item) {return item.toString();});
    var len = stringArr.length;
    var tempArr = [];
    var bool= JSON.parse(myboolean);

    for (i = 0; i < len; ++i) {
        tempArr[i] = myboolean;
    }
    return _.object(stringArr, tempArr);

}

console.log(mapThreadBoolean(['hello', 1,  "there", "julia"], true));
console.log(JSON.parse("true"));
function ragg (arr) {

    return _.map(arr, function(item) {return item.toString() });

}


console.log(ragg(["hello",false, 1,2,3]));
