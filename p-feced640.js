import { i as r, S as n } from "./p-fbb3c5ee.js";
function e(r, n) {
	var e = -1,
		t = r == null ? 0 : r.length,
		u = Array(t);
	while (++e < t) {
		u[e] = n(r[e], e, r);
	}
	return u;
}
var t = Array.isArray;
const u = t;
var i = 1 / 0;
var f = n ? n.prototype : undefined,
	a = f ? f.toString : undefined;
function o(n) {
	if (typeof n == "string") {
		return n;
	}
	if (u(n)) {
		return e(n, o) + "";
	}
	if (r(n)) {
		return a ? a.call(n) : "";
	}
	var t = n + "";
	return t == "0" && 1 / n == -i ? "-0" : t;
}
function s(r) {
	return r == null ? "" : o(r);
}
export { s as t };
//# sourceMappingURL=p-feced640.js.map
