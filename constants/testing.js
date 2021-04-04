// var myFunc = function func(){
//     if( myFunc.fired ) return;
//     myFunc.fired = true;
//     console.log('called once and never again!'); // your stuff here
// };
// var x = [2, 3, 2, true];
// for (var i = 0; i < x.length - 1; i++) {
//   x[i] = x[i + 1];
// }
// console.log(x);

var error = null;
var wasRejected = "was rejected";

console.log(error ? error : wasRejected);
