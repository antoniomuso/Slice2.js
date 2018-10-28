'use strict';



Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();


/**
 * 
 * @param condition
 * @param s
 */
var invariant = function invariant(condition, s) {
  if (!condition) throw new Error(s);
};

/**
 * Python slice
 * @param v
 * @param start
 * @param end
 * @param step
 * @returns {Array}
 */
var slice = function slice(v, start, end, step) {
  var r = [];
  var i = void 0;
  if (step > 0) {
    for (i = start; i < end; i += step) {
      r.push(v[i]);
    }
  } else {
    for (i = start; i > end; i += step) {
      r.push(v[i]);
    }
  }
  return r;
};

/**
 * parse a string / number to number.
 *
 * parseInt('') === NaN
 * Number('') === 0
 * @param n
 */
var parseNumber = function parseNumber(n) {
  return isNaN(parseInt(n)) ? NaN : Number(n);
};

/**
 * parse slice string
 * start:end:stepß
 * @param path
 * @param l
 * @returns {*[]}
 */
var parseSliceString = function parseSliceString(path, l) {
  var _path$split$map = path.split(':').map(function (s) {
    return parseNumber(s);
  }),
    _path$split$map2 = _slicedToArray(_path$split$map, 3),
    start = _path$split$map2[0],
    end = _path$split$map2[1],
    step = _path$split$map2[2];



  start = isNaN(start) ? 0 : start < 0 ? l + start : start;

  end = isNaN(end) ? l : end < 0 ? l + end : 
    end > l ? l : end; 

  step = isNaN(step) ? 1 : step;

  invariant(step !== 0, 'Step can not be zero!');

  return [start, end, step];
};

function SliceElem(v) {
  invariant(typeof v === 'string' || Array.isArray(v), 'Only string and array can be sliced!');

  if (Array.isArray(v)) {
    for (let i = 0; i < v.length; i++) {
      if (Array.isArray(v[i])) v[i] = SliceElem(v[i])
    }
  }

  return new Proxy(v, {
    
    get: function get(target, path) {
      if (path in target || typeof path === 'symbol') return target[path];

      var l = v.length;
      var n = Number(path);

      var r = slice(target, ...parseSliceString(path, l));
      return Array.isArray(target) ? SliceElem(r) : SliceElem(r.join(''));

    }
  });
};

module.exports = SliceElem;