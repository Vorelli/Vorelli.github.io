var e = typeof global == "object" && global && global.Object === Object && global;
const t = e;
var n = typeof self == "object" && self && self.Object === Object && self;
var r = t || n || Function("return this")();
const o = r;
var a = o.Symbol;
const c = a;
var l = Object.prototype;
var f = l.hasOwnProperty;
var u = l.toString;
var b = c ? c.toStringTag : undefined;
function i(e) {
  var t = f.call(e, b),
    n = e[b];
  try {
    e[b] = undefined;
    var r = true;
  } catch (e) { }
  var o = u.call(e);
  if (r) {
    if (t) {
      e[b] = n;
    } else {
      delete e[b];
    }
  }
  return o;
}
var v = Object.prototype;
var s = v.toString;
function d(e) {
  return s.call(e);
}
var j = "[object Null]",
  y = "[object Undefined]";
var p = c ? c.toStringTag : undefined;
function O(e) {
  if (e == null) {
    return e === undefined ? y : j;
  }
  return p && p in Object(e) ? i(e) : d(e);
}
function g(e) {
  return e != null && typeof e == "object";
}
var h = "[object Symbol]";
function m(e) {
  return typeof e == "symbol" || (g(e) && O(e) == h);
}
export { c as S, m as i, o as r };
//# sourceMappingURL=p-fbb3c5ee.js.map
