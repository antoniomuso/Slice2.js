# Slice2.js
Extension of repo [Slice.js](https://github.com/hustcc/slice.js)

## Slice.js
```javascript
// for array
const arr = slice([1, '2', 3, '4', 5, '6', 7, '8', 9, '0']);

arr[-2];  		// 9
arr['2:5'];  		// [3, '4', 5]
arr[':-2'];  		// [1, '2', 3, '4', 5, '6', 7, '8']
arr['-2:'];  		// [9, '0']
arr['1:5:2'];  		// ['2', '4']
arr['5:1:-2'];  	// ['6', '4']

// for string
const str = slice('1234567890');

str[-2];  		// '9'
str['2:5'];  		// '345'
str[':-2'];  		// '12345678'
str['-2:'];  		// '90'
str['1:5:2'];  		// '24'
str['5:1:-2'];  	// '64'
```

## Slice2.js
```javascript
// for array
const arr = slice([1, '2', 3, '4', 5, '6', 7, '8', 9, '0']);


arr[':-2'];  		// [1, '2', 3, '4', 5, '6', 7, '8']
arr[':-2']['2::']  //  [3, '4', 5, '6', 7, '8']


const tab = [
    [1,2,3],
    [2,4,5]
]

// it slice recursive the array
var sliceArr = slice(tab) 

sliceArr['1::'] // [ [ 2, 4, 5 ] ]

for (let s of sliceArr) {
    console.log(s['1::']) 
} 
// out:
//      [ 2, 3 ]
//      [ 4, 5 ]

```


## Authors

* **Antonio Musolino** - [antoniomuso](https://github.com/antoniomuso)



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details