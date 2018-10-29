'use strict';

/*
MIT License

Copyright (c) 2017 hustcc

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


/**
 * 
 * @param condition
 * @param s
 */
var invariant = function invariant(condition, s) {
  if (!condition) throw new Error(s)
};

/**
 * Python slice
 * @param v
 * @param start
 * @param end
 * @param step
 * @param isReverse is syntax to reverse array
 * @returns {Array}
 */
function slice(v, start, end, step, isReverse) {
  var r = []
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      r.push(v[i])
    }
  } else {
    for (let i = (isReverse ? v.length - 1 : start); i > (isReverse ? -1 : end); i += step) {
      r.push(v[i])
    }
  }
  return r
}

/**
 * parse a string / number to number.
 *
 * parseInt('') === NaN
 * Number('') === 0
 * @param n
 */
function parseNumber(n) {
  return isNaN(parseInt(n)) ? NaN : Number(n)
}

/**
 * parse slice string
 * start:end:stepß
 * @param path
 * @param l
 * @returns {*[]}
 */
var parseSliceString = function parseSliceString(path, l) {
  var _path$split$map = path.split(':').map(parseNumber)

  var _path$split$map2 = _slicedToArray(_path$split$map, 3)
  var start = _path$split$map2[0]
  var end = _path$split$map2[1]
  var step = _path$split$map2[2]


  var isReverse = isNaN(start) && isNaN(end)

  start = isNaN(start) ? 0 : start < 0 ? l + start : start;

  end = isNaN(end) ? l : end < 0 ? l + end :
    end > l ? l : end

  step = isNaN(step) ? 1 : step

  invariant(step !== 0, 'Step can not be zero!')

  return [start, end, step, isReverse]
};

function SliceElem(v) {
  invariant(typeof v === 'string' || Array.isArray(v), 'Only string and array can be sliced!')
  var clone = {}

  if (Array.isArray(v)) {
    var clone = v.slice()
    for (let i = 0; i < v.length; i++) {
      if (Array.isArray(v[i])) clone[i] = SliceElem(v[i])
    }
  } else {
    var clone = new String(v)
  }

  return new Proxy(clone, {

    get: function get(target, path) {
      if (typeof path === 'symbol') {
        return target[path]
      }

      var n = Number(path)
      var l = v.length

      if (path in target || !isNaN(n)) {
        return isNaN(n) ? target[path] : target[n < 0 ? n + l : n]
      }

      var r = slice(target, ...parseSliceString(path, l))

      return Array.isArray(target) ? SliceElem(r) : r.join('')

    }
  });
}

module.exports = SliceElem