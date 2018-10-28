var slice = require('./lib/slice');



const arr = slice([1, '2', 3, '4', 5, '6', 7, '8', 9, '0']);


arr[':-2'];  		// [1, '2', 3, '4', 5, '6', 7, '8']
console.log(arr[':-2']['2::'])  //  [3, '4', 5, '6', 7, '8']