var n = {
	update: null,
	begin: null,
	loopBegin: null,
	changeBegin: null,
	change: null,
	changeComplete: null,
	loopComplete: null,
	complete: null,
	loop: 1,
	direction: "normal",
	autoplay: true,
	timelineOffset: 0,
};
var r = { duration: 1e3, delay: 0, endDelay: 0, easing: "easeOutElastic(1, .5)", round: 0 };
var t = [
	"translateX",
	"translateY",
	"translateZ",
	"rotate",
	"rotateX",
	"rotateY",
	"rotateZ",
	"scale",
	"scaleX",
	"scaleY",
	"scaleZ",
	"skew",
	"skewX",
	"skewY",
	"perspective",
	"matrix",
	"matrix3d",
];
var e = { CSS: {}, springs: {} };
function i(n, r, t) {
	return Math.min(Math.max(n, r), t);
}
function a(n, r) {
	return n.indexOf(r) > -1;
}
function o(n, r) {
	return n.apply(null, r);
}
var u = {
	arr: function (n) {
		return Array.isArray(n);
	},
	obj: function (n) {
		return a(Object.prototype.toString.call(n), "Object");
	},
	pth: function (n) {
		return u.obj(n) && n.hasOwnProperty("totalLength");
	},
	svg: function (n) {
		return n instanceof SVGElement;
	},
	inp: function (n) {
		return n instanceof HTMLInputElement;
	},
	dom: function (n) {
		return n.nodeType || u.svg(n);
	},
	str: function (n) {
		return typeof n === "string";
	},
	fnc: function (n) {
		return typeof n === "function";
	},
	und: function (n) {
		return typeof n === "undefined";
	},
	nil: function (n) {
		return u.und(n) || n === null;
	},
	hex: function (n) {
		return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(n);
	},
	rgb: function (n) {
		return /^rgb/.test(n);
	},
	hsl: function (n) {
		return /^hsl/.test(n);
	},
	col: function (n) {
		return u.hex(n) || u.rgb(n) || u.hsl(n);
	},
	key: function (t) {
		return !n.hasOwnProperty(t) && !r.hasOwnProperty(t) && t !== "targets" && t !== "keyframes";
	},
};
function f(n) {
	var r = /\(([^)]+)\)/.exec(n);
	return r
		? r[1].split(",").map(function (n) {
				return parseFloat(n);
			})
		: [];
}
function s(n, r) {
	var t = f(n);
	var a = i(u.und(t[0]) ? 1 : t[0], 0.1, 100);
	var o = i(u.und(t[1]) ? 100 : t[1], 0.1, 100);
	var s = i(u.und(t[2]) ? 10 : t[2], 0.1, 100);
	var c = i(u.und(t[3]) ? 0 : t[3], 0.1, 100);
	var l = Math.sqrt(o / a);
	var v = s / (2 * Math.sqrt(o * a));
	var d = v < 1 ? l * Math.sqrt(1 - v * v) : 0;
	var h = 1;
	var p = v < 1 ? (v * l + -c) / d : -c + l;
	function m(n) {
		var t = r ? (r * n) / 1e3 : n;
		if (v < 1) {
			t = Math.exp(-t * v * l) * (h * Math.cos(d * t) + p * Math.sin(d * t));
		} else {
			t = (h + p * t) * Math.exp(-t * l);
		}
		if (n === 0 || n === 1) {
			return n;
		}
		return 1 - t;
	}
	function g() {
		var r = e.springs[n];
		if (r) {
			return r;
		}
		var t = 1 / 6;
		var i = 0;
		var a = 0;
		while (true) {
			i += t;
			if (m(i) === 1) {
				a++;
				if (a >= 16) {
					break;
				}
			} else {
				a = 0;
			}
		}
		var o = i * t * 1e3;
		e.springs[n] = o;
		return o;
	}
	return r ? m : g;
}
function c(n) {
	if (n === void 0) n = 10;
	return function (r) {
		return Math.ceil(i(r, 1e-6, 1) * n) * (1 / n);
	};
}
var l = (function () {
	var n = 11;
	var r = 1 / (n - 1);
	function t(n, r) {
		return 1 - 3 * r + 3 * n;
	}
	function e(n, r) {
		return 3 * r - 6 * n;
	}
	function i(n) {
		return 3 * n;
	}
	function a(n, r, a) {
		return ((t(r, a) * n + e(r, a)) * n + i(r)) * n;
	}
	function o(n, r, a) {
		return 3 * t(r, a) * n * n + 2 * e(r, a) * n + i(r);
	}
	function u(n, r, t, e, i) {
		var o,
			u,
			f = 0;
		do {
			u = r + (t - r) / 2;
			o = a(u, e, i) - n;
			if (o > 0) {
				t = u;
			} else {
				r = u;
			}
		} while (Math.abs(o) > 1e-7 && ++f < 10);
		return u;
	}
	function f(n, r, t, e) {
		for (var i = 0; i < 4; ++i) {
			var u = o(r, t, e);
			if (u === 0) {
				return r;
			}
			var f = a(r, t, e) - n;
			r -= f / u;
		}
		return r;
	}
	function s(t, e, i, s) {
		if (!(0 <= t && t <= 1 && 0 <= i && i <= 1)) {
			return;
		}
		var c = new Float32Array(n);
		if (t !== e || i !== s) {
			for (var l = 0; l < n; ++l) {
				c[l] = a(l * r, t, i);
			}
		}
		function v(e) {
			var a = 0;
			var s = 1;
			var l = n - 1;
			for (; s !== l && c[s] <= e; ++s) {
				a += r;
			}
			--s;
			var v = (e - c[s]) / (c[s + 1] - c[s]);
			var d = a + v * r;
			var h = o(d, t, i);
			if (h >= 0.001) {
				return f(e, d, t, i);
			} else if (h === 0) {
				return d;
			} else {
				return u(e, a, a + r, t, i);
			}
		}
		return function (n) {
			if (t === e && i === s) {
				return n;
			}
			if (n === 0 || n === 1) {
				return n;
			}
			return a(v(n), e, s);
		};
	}
	return s;
})();
var v = (function () {
	var n = {
		linear: function () {
			return function (n) {
				return n;
			};
		},
	};
	var r = {
		Sine: function () {
			return function (n) {
				return 1 - Math.cos((n * Math.PI) / 2);
			};
		},
		Expo: function () {
			return function (n) {
				return n ? Math.pow(2, 10 * n - 10) : 0;
			};
		},
		Circ: function () {
			return function (n) {
				return 1 - Math.sqrt(1 - n * n);
			};
		},
		Back: function () {
			return function (n) {
				return n * n * (3 * n - 2);
			};
		},
		Bounce: function () {
			return function (n) {
				var r,
					t = 4;
				while (n < ((r = Math.pow(2, --t)) - 1) / 11) {}
				return 1 / Math.pow(4, 3 - t) - 7.5625 * Math.pow((r * 3 - 2) / 22 - n, 2);
			};
		},
		Elastic: function (n, r) {
			if (n === void 0) n = 1;
			if (r === void 0) r = 0.5;
			var t = i(n, 1, 10);
			var e = i(r, 0.1, 2);
			return function (n) {
				return n === 0 || n === 1
					? n
					: -t *
							Math.pow(2, 10 * (n - 1)) *
							Math.sin(((n - 1 - (e / (Math.PI * 2)) * Math.asin(1 / t)) * (Math.PI * 2)) / e);
			};
		},
	};
	var t = ["Quad", "Cubic", "Quart", "Quint"];
	t.forEach(function (n, t) {
		r[n] = function () {
			return function (n) {
				return Math.pow(n, t + 2);
			};
		};
	});
	Object.keys(r).forEach(function (t) {
		var e = r[t];
		n["easeIn" + t] = e;
		n["easeOut" + t] = function (n, r) {
			return function (t) {
				return 1 - e(n, r)(1 - t);
			};
		};
		n["easeInOut" + t] = function (n, r) {
			return function (t) {
				return t < 0.5 ? e(n, r)(t * 2) / 2 : 1 - e(n, r)(t * -2 + 2) / 2;
			};
		};
		n["easeOutIn" + t] = function (n, r) {
			return function (t) {
				return t < 0.5 ? (1 - e(n, r)(1 - t * 2)) / 2 : (e(n, r)(t * 2 - 1) + 1) / 2;
			};
		};
	});
	return n;
})();
function d(n, r) {
	if (u.fnc(n)) {
		return n;
	}
	var t = n.split("(")[0];
	var e = v[t];
	var i = f(n);
	switch (t) {
		case "spring":
			return s(n, r);
		case "cubicBezier":
			return o(l, i);
		case "steps":
			return o(c, i);
		default:
			return o(e, i);
	}
}
function h(n) {
	try {
		var r = document.querySelectorAll(n);
		return r;
	} catch (n) {
		return;
	}
}
function p(n, r) {
	var t = n.length;
	var e = arguments.length >= 2 ? arguments[1] : void 0;
	var i = [];
	for (var a = 0; a < t; a++) {
		if (a in n) {
			var o = n[a];
			if (r.call(e, o, a, n)) {
				i.push(o);
			}
		}
	}
	return i;
}
function m(n) {
	return n.reduce(function (n, r) {
		return n.concat(u.arr(r) ? m(r) : r);
	}, []);
}
function g(n) {
	if (u.arr(n)) {
		return n;
	}
	if (u.str(n)) {
		n = h(n) || n;
	}
	if (n instanceof NodeList || n instanceof HTMLCollection) {
		return [].slice.call(n);
	}
	return [n];
}
function y(n, r) {
	return n.some(function (n) {
		return n === r;
	});
}
function w(n) {
	var r = {};
	for (var t in n) {
		r[t] = n[t];
	}
	return r;
}
function b(n, r) {
	var t = w(n);
	for (var e in n) {
		t[e] = r.hasOwnProperty(e) ? r[e] : n[e];
	}
	return t;
}
function M(n, r) {
	var t = w(n);
	for (var e in r) {
		t[e] = u.und(n[e]) ? r[e] : n[e];
	}
	return t;
}
function x(n) {
	var r = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(n);
	return r ? "rgba(" + r[1] + ",1)" : n;
}
function E(n) {
	var r = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	var t = n.replace(r, function (n, r, t, e) {
		return r + r + t + t + e + e;
	});
	var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
	var i = parseInt(e[1], 16);
	var a = parseInt(e[2], 16);
	var o = parseInt(e[3], 16);
	return "rgba(" + i + "," + a + "," + o + ",1)";
}
function A(n) {
	var r =
		/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(n) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(n);
	var t = parseInt(r[1], 10) / 360;
	var e = parseInt(r[2], 10) / 100;
	var i = parseInt(r[3], 10) / 100;
	var a = r[4] || 1;
	function o(n, r, t) {
		if (t < 0) {
			t += 1;
		}
		if (t > 1) {
			t -= 1;
		}
		if (t < 1 / 6) {
			return n + (r - n) * 6 * t;
		}
		if (t < 1 / 2) {
			return r;
		}
		if (t < 2 / 3) {
			return n + (r - n) * (2 / 3 - t) * 6;
		}
		return n;
	}
	var u, f, s;
	if (e == 0) {
		u = f = s = i;
	} else {
		var c = i < 0.5 ? i * (1 + e) : i + e - i * e;
		var l = 2 * i - c;
		u = o(l, c, t + 1 / 3);
		f = o(l, c, t);
		s = o(l, c, t - 1 / 3);
	}
	return "rgba(" + u * 255 + "," + f * 255 + "," + s * 255 + "," + a + ")";
}
function S(n) {
	if (u.rgb(n)) {
		return x(n);
	}
	if (u.hex(n)) {
		return E(n);
	}
	if (u.hsl(n)) {
		return A(n);
	}
}
function N(n) {
	var r =
		/[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(
			n,
		);
	if (r) {
		return r[1];
	}
}
function F(n) {
	if (a(n, "translate") || n === "perspective") {
		return "px";
	}
	if (a(n, "rotate") || a(n, "skew")) {
		return "deg";
	}
}
function I(n, r) {
	if (!u.fnc(n)) {
		return n;
	}
	return n(r.target, r.id, r.total);
}
function k(n, r) {
	return n.getAttribute(r);
}
function C(n, r, t) {
	var i = N(r);
	if (y([t, "deg", "rad", "turn"], i)) {
		return r;
	}
	var a = e.CSS[r + t];
	if (!u.und(a)) {
		return a;
	}
	var o = 100;
	var f = document.createElement(n.tagName);
	var s = n.parentNode && n.parentNode !== document ? n.parentNode : document.body;
	s.appendChild(f);
	f.style.position = "absolute";
	f.style.width = o + t;
	var c = o / f.offsetWidth;
	s.removeChild(f);
	var l = c * parseFloat(r);
	e.CSS[r + t] = l;
	return l;
}
function O(n, r, t) {
	if (r in n.style) {
		var e = r.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
		var i = n.style[r] || getComputedStyle(n).getPropertyValue(e) || "0";
		return t ? C(n, i, t) : i;
	}
}
function j(n, r) {
	if (u.dom(n) && !u.inp(n) && (!u.nil(k(n, r)) || (u.svg(n) && n[r]))) {
		return "attribute";
	}
	if (u.dom(n) && y(t, r)) {
		return "transform";
	}
	if (u.dom(n) && r !== "transform" && O(n, r)) {
		return "css";
	}
	if (n[r] != null) {
		return "object";
	}
}
function L(n) {
	if (!u.dom(n)) {
		return;
	}
	var r = n.style.transform || "";
	var t = /(\w+)\(([^)]*)\)/g;
	var e = new Map();
	var i;
	while ((i = t.exec(r))) {
		e.set(i[1], i[2]);
	}
	return e;
}
function P(n, r, t, e) {
	var i = a(r, "scale") ? 1 : 0 + F(r);
	var o = L(n).get(r) || i;
	if (t) {
		t.transforms.list.set(r, o);
		t.transforms["last"] = r;
	}
	return e ? C(n, o, e) : o;
}
function T(n, r, t, e) {
	switch (j(n, r)) {
		case "transform":
			return P(n, r, e, t);
		case "css":
			return O(n, r, t);
		case "attribute":
			return k(n, r);
		default:
			return n[r] || 0;
	}
}
function B(n, r) {
	var t = /^(\*=|\+=|-=)/.exec(n);
	if (!t) {
		return n;
	}
	var e = N(n) || 0;
	var i = parseFloat(r);
	var a = parseFloat(n.replace(t[0], ""));
	switch (t[0][0]) {
		case "+":
			return i + a + e;
		case "-":
			return i - a + e;
		case "*":
			return i * a + e;
	}
}
function D(n, r) {
	if (u.col(n)) {
		return S(n);
	}
	if (/\s/g.test(n)) {
		return n;
	}
	var t = N(n);
	var e = t ? n.substr(0, n.length - t.length) : n;
	if (r) {
		return e + r;
	}
	return e;
}
function z(n, r) {
	return Math.sqrt(Math.pow(r.x - n.x, 2) + Math.pow(r.y - n.y, 2));
}
function $(n) {
	return Math.PI * 2 * k(n, "r");
}
function J(n) {
	return k(n, "width") * 2 + k(n, "height") * 2;
}
function R(n) {
	return z({ x: k(n, "x1"), y: k(n, "y1") }, { x: k(n, "x2"), y: k(n, "y2") });
}
function Y(n) {
	var r = n.points;
	var t = 0;
	var e;
	for (var i = 0; i < r.numberOfItems; i++) {
		var a = r.getItem(i);
		if (i > 0) {
			t += z(e, a);
		}
		e = a;
	}
	return t;
}
function H(n) {
	var r = n.points;
	return Y(n) + z(r.getItem(r.numberOfItems - 1), r.getItem(0));
}
function Z(n) {
	if (n.getTotalLength) {
		return n.getTotalLength();
	}
	switch (n.tagName.toLowerCase()) {
		case "circle":
			return $(n);
		case "rect":
			return J(n);
		case "line":
			return R(n);
		case "polyline":
			return Y(n);
		case "polygon":
			return H(n);
	}
}
function _(n) {
	var r = Z(n);
	n.setAttribute("stroke-dasharray", r);
	return r;
}
function G(n) {
	var r = n.parentNode;
	while (u.svg(r)) {
		if (!u.svg(r.parentNode)) {
			break;
		}
		r = r.parentNode;
	}
	return r;
}
function W(n, r) {
	var t = r || {};
	var e = t.el || G(n);
	var i = e.getBoundingClientRect();
	var a = k(e, "viewBox");
	var o = i.width;
	var u = i.height;
	var f = t.viewBox || (a ? a.split(" ") : [0, 0, o, u]);
	return { el: e, viewBox: f, x: f[0] / 1, y: f[1] / 1, w: o, h: u, vW: f[2], vH: f[3] };
}
function X(n, r) {
	var t = u.str(n) ? h(n)[0] : n;
	var e = r || 100;
	return function (n) {
		return { property: n, el: t, svg: W(t), totalLength: Z(t) * (e / 100) };
	};
}
function q(n, r, t) {
	function e(t) {
		if (t === void 0) t = 0;
		var e = r + t >= 1 ? r + t : 0;
		return n.el.getPointAtLength(e);
	}
	var i = W(n.el, n.svg);
	var a = e();
	var o = e(-1);
	var u = e(+1);
	var f = t ? 1 : i.w / i.vW;
	var s = t ? 1 : i.h / i.vH;
	switch (n.property) {
		case "x":
			return (a.x - i.x) * f;
		case "y":
			return (a.y - i.y) * s;
		case "angle":
			return (Math.atan2(u.y - o.y, u.x - o.x) * 180) / Math.PI;
	}
}
function K(n, r) {
	var t = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
	var e = D(u.pth(n) ? n.totalLength : n, r) + "";
	return { original: e, numbers: e.match(t) ? e.match(t).map(Number) : [0], strings: u.str(n) || r ? e.split(t) : [] };
}
function Q(n) {
	var r = n ? m(u.arr(n) ? n.map(g) : g(n)) : [];
	return p(r, function (n, r, t) {
		return t.indexOf(n) === r;
	});
}
function U(n) {
	var r = Q(n);
	return r.map(function (n, t) {
		return { target: n, id: t, total: r.length, transforms: { list: L(n) } };
	});
}
function V(n, r) {
	var t = w(r);
	if (/^spring/.test(t.easing)) {
		t.duration = s(t.easing);
	}
	if (u.arr(n)) {
		var e = n.length;
		var i = e === 2 && !u.obj(n[0]);
		if (!i) {
			if (!u.fnc(r.duration)) {
				t.duration = r.duration / e;
			}
		} else {
			n = { value: n };
		}
	}
	var a = u.arr(n) ? n : [n];
	return a
		.map(function (n, t) {
			var e = u.obj(n) && !u.pth(n) ? n : { value: n };
			if (u.und(e.delay)) {
				e.delay = !t ? r.delay : 0;
			}
			if (u.und(e.endDelay)) {
				e.endDelay = t === a.length - 1 ? r.endDelay : 0;
			}
			return e;
		})
		.map(function (n) {
			return M(n, t);
		});
}
function nn(n) {
	var r = p(
		m(
			n.map(function (n) {
				return Object.keys(n);
			}),
		),
		function (n) {
			return u.key(n);
		},
	).reduce(function (n, r) {
		if (n.indexOf(r) < 0) {
			n.push(r);
		}
		return n;
	}, []);
	var t = {};
	var e = function (e) {
		var i = r[e];
		t[i] = n.map(function (n) {
			var r = {};
			for (var t in n) {
				if (u.key(t)) {
					if (t == i) {
						r.value = n[t];
					}
				} else {
					r[t] = n[t];
				}
			}
			return r;
		});
	};
	for (var i = 0; i < r.length; i++) e(i);
	return t;
}
function rn(n, r) {
	var t = [];
	var e = r.keyframes;
	if (e) {
		r = M(nn(e), r);
	}
	for (var i in r) {
		if (u.key(i)) {
			t.push({ name: i, tweens: V(r[i], n) });
		}
	}
	return t;
}
function tn(n, r) {
	var t = {};
	for (var e in n) {
		var i = I(n[e], r);
		if (u.arr(i)) {
			i = i.map(function (n) {
				return I(n, r);
			});
			if (i.length === 1) {
				i = i[0];
			}
		}
		t[e] = i;
	}
	t.duration = parseFloat(t.duration);
	t.delay = parseFloat(t.delay);
	return t;
}
function en(n, r) {
	var t;
	return n.tweens.map(function (e) {
		var i = tn(e, r);
		var a = i.value;
		var o = u.arr(a) ? a[1] : a;
		var f = N(o);
		var s = T(r.target, n.name, f, r);
		var c = t ? t.to.original : s;
		var l = u.arr(a) ? a[0] : c;
		var v = N(l) || N(s);
		var h = f || v;
		if (u.und(o)) {
			o = c;
		}
		i.from = K(l, h);
		i.to = K(B(o, l), h);
		i.start = t ? t.end : 0;
		i.end = i.start + i.delay + i.duration + i.endDelay;
		i.easing = d(i.easing, i.duration);
		i.isPath = u.pth(a);
		i.isPathTargetInsideSVG = i.isPath && u.svg(r.target);
		i.isColor = u.col(i.from.original);
		if (i.isColor) {
			i.round = 1;
		}
		t = i;
		return i;
	});
}
var an = {
	css: function (n, r, t) {
		return (n.style[r] = t);
	},
	attribute: function (n, r, t) {
		return n.setAttribute(r, t);
	},
	object: function (n, r, t) {
		return (n[r] = t);
	},
	transform: function (n, r, t, e, i) {
		e.list.set(r, t);
		if (r === e.last || i) {
			var a = "";
			e.list.forEach(function (n, r) {
				a += r + "(" + n + ") ";
			});
			n.style.transform = a;
		}
	},
};
function on(n, r) {
	var t = U(n);
	t.forEach(function (n) {
		for (var t in r) {
			var e = I(r[t], n);
			var i = n.target;
			var a = N(e);
			var o = T(i, t, a, n);
			var u = a || N(o);
			var f = B(D(e, u), o);
			var s = j(i, t);
			an[s](i, t, f, n.transforms, true);
		}
	});
}
function un(n, r) {
	var t = j(n.target, r.name);
	if (t) {
		var e = en(r, n);
		var i = e[e.length - 1];
		return {
			type: t,
			property: r.name,
			animatable: n,
			tweens: e,
			duration: i.end,
			delay: e[0].delay,
			endDelay: i.endDelay,
		};
	}
}
function fn(n, r) {
	return p(
		m(
			n.map(function (n) {
				return r.map(function (r) {
					return un(n, r);
				});
			}),
		),
		function (n) {
			return !u.und(n);
		},
	);
}
function sn(n, r) {
	var t = n.length;
	var e = function (n) {
		return n.timelineOffset ? n.timelineOffset : 0;
	};
	var i = {};
	i.duration = t
		? Math.max.apply(
				Math,
				n.map(function (n) {
					return e(n) + n.duration;
				}),
			)
		: r.duration;
	i.delay = t
		? Math.min.apply(
				Math,
				n.map(function (n) {
					return e(n) + n.delay;
				}),
			)
		: r.delay;
	i.endDelay = t
		? i.duration -
			Math.max.apply(
				Math,
				n.map(function (n) {
					return e(n) + n.duration - n.endDelay;
				}),
			)
		: r.endDelay;
	return i;
}
var cn = 0;
function ln(t) {
	var e = b(n, t);
	var i = b(r, t);
	var a = rn(i, t);
	var o = U(t.targets);
	var u = fn(o, a);
	var f = sn(u, i);
	var s = cn;
	cn++;
	return M(e, {
		id: s,
		children: [],
		animatables: o,
		animations: u,
		duration: f.duration,
		delay: f.delay,
		endDelay: f.endDelay,
	});
}
var vn = [];
var dn = (function () {
	var n;
	function r() {
		if (!n && (!hn() || !pn.suspendWhenDocumentHidden) && vn.length > 0) {
			n = requestAnimationFrame(t);
		}
	}
	function t(r) {
		var e = vn.length;
		var i = 0;
		while (i < e) {
			var a = vn[i];
			if (!a.paused) {
				a.tick(r);
				i++;
			} else {
				vn.splice(i, 1);
				e--;
			}
		}
		n = i > 0 ? requestAnimationFrame(t) : undefined;
	}
	function e() {
		if (!pn.suspendWhenDocumentHidden) {
			return;
		}
		if (hn()) {
			n = cancelAnimationFrame(n);
		} else {
			vn.forEach(function (n) {
				return n._onDocumentVisibility();
			});
			dn();
		}
	}
	if (typeof document !== "undefined") {
		document.addEventListener("visibilitychange", e);
	}
	return r;
})();
function hn() {
	return !!document && document.hidden;
}
function pn(n) {
	if (n === void 0) n = {};
	var r = 0,
		t = 0,
		e = 0;
	var a,
		o = 0;
	var u = null;
	function f(n) {
		var r =
			window.Promise &&
			new Promise(function (n) {
				return (u = n);
			});
		n.finished = r;
		return r;
	}
	var s = ln(n);
	f(s);
	function c() {
		var n = s.direction;
		if (n !== "alternate") {
			s.direction = n !== "normal" ? "normal" : "reverse";
		}
		s.reversed = !s.reversed;
		a.forEach(function (n) {
			return (n.reversed = s.reversed);
		});
	}
	function l(n) {
		return s.reversed ? s.duration - n : n;
	}
	function v() {
		r = 0;
		t = l(s.currentTime) * (1 / pn.speed);
	}
	function d(n, r) {
		if (r) {
			r.seek(n - r.timelineOffset);
		}
	}
	function h(n) {
		if (!s.reversePlayback) {
			for (var r = 0; r < o; r++) {
				d(n, a[r]);
			}
		} else {
			for (var t = o; t--; ) {
				d(n, a[t]);
			}
		}
	}
	function m(n) {
		var r = 0;
		var t = s.animations;
		var e = t.length;
		while (r < e) {
			var a = t[r];
			var o = a.animatable;
			var u = a.tweens;
			var f = u.length - 1;
			var c = u[f];
			if (f) {
				c =
					p(u, function (r) {
						return n < r.end;
					})[0] || c;
			}
			var l = i(n - c.start - c.delay, 0, c.duration) / c.duration;
			var v = isNaN(l) ? 1 : c.easing(l);
			var d = c.to.strings;
			var h = c.round;
			var m = [];
			var g = c.to.numbers.length;
			var y = void 0;
			for (var w = 0; w < g; w++) {
				var b = void 0;
				var M = c.to.numbers[w];
				var x = c.from.numbers[w] || 0;
				if (!c.isPath) {
					b = x + v * (M - x);
				} else {
					b = q(c.value, v * M, c.isPathTargetInsideSVG);
				}
				if (h) {
					if (!(c.isColor && w > 2)) {
						b = Math.round(b * h) / h;
					}
				}
				m.push(b);
			}
			var E = d.length;
			if (!E) {
				y = m[0];
			} else {
				y = d[0];
				for (var A = 0; A < E; A++) {
					var S = d[A + 1];
					var N = m[A];
					if (!isNaN(N)) {
						if (!S) {
							y += N + " ";
						} else {
							y += N + S;
						}
					}
				}
			}
			an[a.type](o.target, a.property, y, o.transforms);
			a.currentValue = y;
			r++;
		}
	}
	function g(n) {
		if (s[n] && !s.passThrough) {
			s[n](s);
		}
	}
	function y() {
		if (s.remaining && s.remaining !== true) {
			s.remaining--;
		}
	}
	function w(n) {
		var o = s.duration;
		var v = s.delay;
		var d = o - s.endDelay;
		var p = l(n);
		s.progress = i((p / o) * 100, 0, 100);
		s.reversePlayback = p < s.currentTime;
		if (a) {
			h(p);
		}
		if (!s.began && s.currentTime > 0) {
			s.began = true;
			g("begin");
		}
		if (!s.loopBegan && s.currentTime > 0) {
			s.loopBegan = true;
			g("loopBegin");
		}
		if (p <= v && s.currentTime !== 0) {
			m(0);
		}
		if ((p >= d && s.currentTime !== o) || !o) {
			m(o);
		}
		if (p > v && p < d) {
			if (!s.changeBegan) {
				s.changeBegan = true;
				s.changeCompleted = false;
				g("changeBegin");
			}
			g("change");
			m(p);
		} else {
			if (s.changeBegan) {
				s.changeCompleted = true;
				s.changeBegan = false;
				g("changeComplete");
			}
		}
		s.currentTime = i(p, 0, o);
		if (s.began) {
			g("update");
		}
		if (n >= o) {
			t = 0;
			y();
			if (!s.remaining) {
				s.paused = true;
				if (!s.completed) {
					s.completed = true;
					g("loopComplete");
					g("complete");
					if (!s.passThrough && "Promise" in window) {
						u();
						f(s);
					}
				}
			} else {
				r = e;
				g("loopComplete");
				s.loopBegan = false;
				if (s.direction === "alternate") {
					c();
				}
			}
		}
	}
	s.reset = function () {
		var n = s.direction;
		s.passThrough = false;
		s.currentTime = 0;
		s.progress = 0;
		s.paused = true;
		s.began = false;
		s.loopBegan = false;
		s.changeBegan = false;
		s.completed = false;
		s.changeCompleted = false;
		s.reversePlayback = false;
		s.reversed = n === "reverse";
		s.remaining = s.loop;
		a = s.children;
		o = a.length;
		for (var r = o; r--; ) {
			s.children[r].reset();
		}
		if ((s.reversed && s.loop !== true) || (n === "alternate" && s.loop === 1)) {
			s.remaining++;
		}
		m(s.reversed ? s.duration : 0);
	};
	s._onDocumentVisibility = v;
	s.set = function (n, r) {
		on(n, r);
		return s;
	};
	s.tick = function (n) {
		e = n;
		if (!r) {
			r = e;
		}
		w((e + (t - r)) * pn.speed);
	};
	s.seek = function (n) {
		w(l(n));
	};
	s.pause = function () {
		s.paused = true;
		v();
	};
	s.play = function () {
		if (!s.paused) {
			return;
		}
		if (s.completed) {
			s.reset();
		}
		s.paused = false;
		vn.push(s);
		v();
		dn();
	};
	s.reverse = function () {
		c();
		s.completed = s.reversed ? false : true;
		v();
	};
	s.restart = function () {
		s.reset();
		s.play();
	};
	s.remove = function (n) {
		var r = Q(n);
		gn(r, s);
	};
	s.reset();
	if (s.autoplay) {
		s.play();
	}
	return s;
}
function mn(n, r) {
	for (var t = r.length; t--; ) {
		if (y(n, r[t].animatable.target)) {
			r.splice(t, 1);
		}
	}
}
function gn(n, r) {
	var t = r.animations;
	var e = r.children;
	mn(n, t);
	for (var i = e.length; i--; ) {
		var a = e[i];
		var o = a.animations;
		mn(n, o);
		if (!o.length && !a.children.length) {
			e.splice(i, 1);
		}
	}
	if (!t.length && !e.length) {
		r.pause();
	}
}
function yn(n) {
	var r = Q(n);
	for (var t = vn.length; t--; ) {
		var e = vn[t];
		gn(r, e);
	}
}
function wn(n, r) {
	if (r === void 0) r = {};
	var t = r.direction || "normal";
	var e = r.easing ? d(r.easing) : null;
	var i = r.grid;
	var a = r.axis;
	var o = r.from || 0;
	var f = o === "first";
	var s = o === "center";
	var c = o === "last";
	var l = u.arr(n);
	var v = l ? parseFloat(n[0]) : parseFloat(n);
	var h = l ? parseFloat(n[1]) : 0;
	var p = N(l ? n[1] : n) || 0;
	var m = r.start || 0 + (l ? v : 0);
	var g = [];
	var y = 0;
	return function (n, r, u) {
		if (f) {
			o = 0;
		}
		if (s) {
			o = (u - 1) / 2;
		}
		if (c) {
			o = u - 1;
		}
		if (!g.length) {
			for (var d = 0; d < u; d++) {
				if (!i) {
					g.push(Math.abs(o - d));
				} else {
					var w = !s ? o % i[0] : (i[0] - 1) / 2;
					var b = !s ? Math.floor(o / i[0]) : (i[1] - 1) / 2;
					var M = d % i[0];
					var x = Math.floor(d / i[0]);
					var E = w - M;
					var A = b - x;
					var S = Math.sqrt(E * E + A * A);
					if (a === "x") {
						S = -E;
					}
					if (a === "y") {
						S = -A;
					}
					g.push(S);
				}
				y = Math.max.apply(Math, g);
			}
			if (e) {
				g = g.map(function (n) {
					return e(n / y) * y;
				});
			}
			if (t === "reverse") {
				g = g.map(function (n) {
					return a ? (n < 0 ? n * -1 : -n) : Math.abs(y - n);
				});
			}
		}
		var N = l ? (h - v) / y : v;
		return m + N * (Math.round(g[r] * 100) / 100) + p;
	};
}
function bn(n) {
	if (n === void 0) n = {};
	var t = pn(n);
	t.duration = 0;
	t.add = function (e, i) {
		var a = vn.indexOf(t);
		var o = t.children;
		if (a > -1) {
			vn.splice(a, 1);
		}
		function f(n) {
			n.passThrough = true;
		}
		for (var s = 0; s < o.length; s++) {
			f(o[s]);
		}
		var c = M(e, b(r, n));
		c.targets = c.targets || n.targets;
		var l = t.duration;
		c.autoplay = false;
		c.direction = t.direction;
		c.timelineOffset = u.und(i) ? l : B(i, l);
		f(t);
		t.seek(c.timelineOffset);
		var v = pn(c);
		f(v);
		o.push(v);
		var d = sn(o, n);
		t.delay = d.delay;
		t.endDelay = d.endDelay;
		t.duration = d.duration;
		t.seek(0);
		t.reset();
		if (t.autoplay) {
			t.play();
		}
		return t;
	};
	return t;
}
pn.version = "3.2.1";
pn.speed = 1;
pn.suspendWhenDocumentHidden = true;
pn.running = vn;
pn.remove = yn;
pn.get = T;
pn.set = on;
pn.convertPx = C;
pn.path = X;
pn.setDashoffset = _;
pn.stagger = wn;
pn.timeline = bn;
pn.easing = d;
pn.penner = v;
pn.random = function (n, r) {
	return Math.floor(Math.random() * (r - n + 1)) + n;
};
function Mn(n) {
	return (
		"Minified Redux error #" +
		n +
		"; visit https://redux.js.org/Errors?code=" +
		n +
		" for the full message or " +
		"use the non-minified dev environment for full errors. "
	);
}
var xn = (function () {
	return (typeof Symbol === "function" && Symbol.observable) || "@@observable";
})();
var En = function n() {
	return Math.random().toString(36).substring(7).split("").join(".");
};
var An = {
	INIT: "@@redux/INIT" + En(),
	REPLACE: "@@redux/REPLACE" + En(),
	PROBE_UNKNOWN_ACTION: function n() {
		return "@@redux/PROBE_UNKNOWN_ACTION" + En();
	},
};
function Sn(n) {
	if (typeof n !== "object" || n === null) return false;
	var r = n;
	while (Object.getPrototypeOf(r) !== null) {
		r = Object.getPrototypeOf(r);
	}
	return Object.getPrototypeOf(n) === r;
}
function Nn(n, r, t) {
	var e;
	if (
		(typeof r === "function" && typeof t === "function") ||
		(typeof t === "function" && typeof arguments[3] === "function")
	) {
		throw new Error(Mn(0));
	}
	if (typeof r === "function" && typeof t === "undefined") {
		t = r;
		r = undefined;
	}
	if (typeof t !== "undefined") {
		if (typeof t !== "function") {
			throw new Error(Mn(1));
		}
		return t(Nn)(n, r);
	}
	if (typeof n !== "function") {
		throw new Error(Mn(2));
	}
	var i = n;
	var a = r;
	var o = [];
	var u = o;
	var f = false;
	function s() {
		if (u === o) {
			u = o.slice();
		}
	}
	function c() {
		if (f) {
			throw new Error(Mn(3));
		}
		return a;
	}
	function l(n) {
		if (typeof n !== "function") {
			throw new Error(Mn(4));
		}
		if (f) {
			throw new Error(Mn(5));
		}
		var r = true;
		s();
		u.push(n);
		return function t() {
			if (!r) {
				return;
			}
			if (f) {
				throw new Error(Mn(6));
			}
			r = false;
			s();
			var e = u.indexOf(n);
			u.splice(e, 1);
			o = null;
		};
	}
	function v(n) {
		if (!Sn(n)) {
			throw new Error(Mn(7));
		}
		if (typeof n.type === "undefined") {
			throw new Error(Mn(8));
		}
		if (f) {
			throw new Error(Mn(9));
		}
		try {
			f = true;
			a = i(a, n);
		} finally {
			f = false;
		}
		var r = (o = u);
		for (var t = 0; t < r.length; t++) {
			var e = r[t];
			e();
		}
		return n;
	}
	function d(n) {
		if (typeof n !== "function") {
			throw new Error(Mn(10));
		}
		i = n;
		v({ type: An.REPLACE });
	}
	function h() {
		var n;
		var r = l;
		return (
			(n = {
				subscribe: function n(t) {
					if (typeof t !== "object" || t === null) {
						throw new Error(Mn(11));
					}
					function e() {
						if (t.next) {
							t.next(c());
						}
					}
					e();
					var i = r(e);
					return { unsubscribe: i };
				},
			}),
			(n[xn] = function () {
				return this;
			}),
			n
		);
	}
	v({ type: An.INIT });
	return (e = { dispatch: v, subscribe: l, getState: c, replaceReducer: d }), (e[xn] = h), e;
}
const Fn =
	typeof window !== "undefined" &&
	navigator &&
	navigator.platform &&
	(/iP(ad|hone|od)/.test(navigator.platform) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
let In;
let kn;
let Cn;
function On(n) {
	In = n.touches[0].screenY;
}
function jn(n) {
	const r = n.composedPath()[0];
	const t = br(r);
	const e = In > n.touches[0].screenY;
	const i = In < n.touches[0].screenY;
	let a = false;
	if (t) {
		const { scrollHeight: n, clientHeight: r, scrollTop: o } = t;
		const u = o === 0;
		const f = n === r + o;
		if ((e && f) || (i && u)) {
			a = true;
		}
	} else {
		a = true;
	}
	if (a) {
		n.preventDefault();
		n.stopImmediatePropagation();
	}
}
function Ln(n) {
	if (Cn === undefined) {
		const r = !!n && n.reserveScrollBarGap === true;
		const t = innerWidth - document.documentElement.clientWidth;
		if (r && t > 0) {
			Cn = document.body.style.paddingRight;
			document.body.style.paddingRight = `${t}px`;
		}
	}
	if (kn === undefined) {
		kn = document.body.style.overflow;
		document.body.style.overflow = "hidden";
	}
}
function Pn() {
	if (Cn !== undefined) {
		document.body.style.paddingRight = Cn;
		Cn = undefined;
	}
	if (kn !== undefined) {
		document.body.style.overflow = kn;
		kn = undefined;
	}
}
function Tn(n) {
	if (Fn) {
		addEventListener("touchstart", On, { passive: false });
		addEventListener("touchmove", jn, { passive: false });
	} else {
		Ln(n);
	}
}
function Bn() {
	if (Fn) {
		removeEventListener("touchstart", On);
		removeEventListener("touchmove", jn);
	} else {
		Pn();
	}
}
const Dn = {
	DD: ["TT", "JJ", "GG"],
	MM: ["MM", "MM", "MM"],
	YYYY: ["JJJJ", "AAAA", "AAAA"],
	Day: ["Tag", "Jour", "Giorno"],
	Month: ["Monat", "Mois", "Mese"],
	Year: ["Jahr", "Année", "Anno"],
	"Please enter a valid day": [
		"Bitte geben Sie einen gültigen Tag ein",
		"Prière de saisir un jour valable",
		"Inserisca p.f. una data valida",
	],
	"Please enter a valid month": [
		"Bitte geben Sie einen gültigen Monat ein",
		"Prière de saisir un mois valable",
		"Inserisca p.f. un mese valido",
	],
	"Please enter a valid year": [
		"Bitte geben Sie ein gültiges Jahr ein",
		"Prière de saisir une année valable",
		"Inserisca p.f. un anno valido",
	],
	"Please enter a valid date": [
		"Bitte geben Sie ein gültiges Datum ein",
		"Prière de saisir une date valable",
		"Inserisca p.f. una data valida",
	],
	"Start of dialog": [
		"Anfang des Dialogfensters",
		"Début de la fenêtre de dialogue",
		"Inizio della finestra di dialogo",
	],
	"End of dialog": ["Ende des Dialogfensters", "Fin de la fenêtre de dialogue", "Fine della finestra di dialogo"],
	"Open dialog": ["Dialog öffnen", "Ouvrir dialogue", "Apri dialogo"],
	"Show more filters": ["Zeige mehr Filter", "Montrer plus de filtres", "Mostra altri filtri"],
	"Show less filters": ["Zeige weniger Filter", "Montrer moins de filtres", "Mostra meno filtri"],
	"Reset all filters": ["Alle Filter entfernen", "Réinitialiser tous les filtres", "Rimuovi tutti i filtri"],
	Login: ["Anmelden", "Connexion", "Login"],
	Logout: ["Abmelden", "Déconnexion", "Logout"],
	Hello: ["Hallo", "Bonjour", "Salve"],
	Position: ["Position", "Position", "Posizione"],
	"To the left": ["Nach links", "À gauche", "A sinistra"],
	"To the right": ["Nach rechts", "À droite", "A destra"],
	"Content Slider": ["Inhalts-Slider", "Slider de contenu", "Slider di contenuti"],
	"No matches found…": ["Keine Treffer gefunden…", "Aucun résultat…", "Nessun risultato trovato…"],
	"Add to cart": ["Zum Warenkorb hinzufügen", "Ajouter au panier", "Aggiungi al carrello"],
	Added: ["Hinzugefügt", "Ajouté", "Aggiunto"],
	Countdown: ["Countdown", "Compte à rebours", "Conto alla rovescia"],
	day: ["Tag", "jour", "giorno"],
	days: ["Tage", "jours", "giorni"],
	hrs: ["Std", "hrs", "ore"],
	min: ["Min", "min", "min"],
	sec: ["Sek", "sec", "sec"],
	New: ["Neu", "Nouveau", "Nuovo"],
	francs: ["Franken", "francs", "franchi"],
	centimes: ["Rappen", "centimes", "centesimi"],
	per: ["pro", "par", "al"],
	and: ["und", "et", "e"],
	decrease: ["verringern", "diminuer", "diminuire"],
	increase: ["erhöhen", "augmenter", "aumentare"],
	from: ["von", "de", "da"],
	"Show more": ["Mehr anzeigen", "Voir plus", "Mostra altro"],
	"Type to filter…": ["Tippen zum Filtern…", "Tapez pour filtrer…", "Digitare per filtrare…"],
	"information for": ["Informationen für", "Informations pour", "informazioni per"],
	"characters left": ["Zeichen übrig", "caractères restants", "caratteri rimasti"],
	completed: ["abgeschlossen", "complété", "completata"],
	edit: ["bearbeiten", "éditer", "modifica"],
};
const zn = [
	[
		"sdx-accordion",
		"sdx-accordion-item-body",
		"sdx-accordion-item-header",
		"sdx-accordion-item-section",
		"sdx-accordion-item",
	],
	["sdx-dialog", "sdx-dialog-content", "sdx-dialog-toggle"],
	["sdx-header", "sdx-header-left-hand-menu", "sdx-header-menu"],
	["sdx-input", "sdx-input-datepicker"],
	["sdx-input-group", "sdx-input-item"],
	[
		"sdx-menu-flyout",
		"sdx-menu-flyout-content",
		"sdx-menu-flyout-list-item",
		"sdx-menu-flyout-list",
		"sdx-menu-flyout-toggle",
	],
	["sdx-progress-full", "sdx-progress-full-step"],
	["sdx-select", "sdx-select-list", "sdx-select-optgroup", "sdx-select-option"],
	["sdx-tabs", "sdx-tabs-item"],
];
const $n = "__store";
const Jn = "__parent";
const Rn = () => {};
const Yn = [];
let Hn = null;
function Zn(n) {
	if (n.target === Hn) {
		_n(n);
	}
}
function _n(n) {
	var r;
	if (!n.isTrusted) {
		return;
	}
	(r = Yn[0]) === null || r === void 0 ? void 0 : r.requestToClose(n);
}
addEventListener("mousedown", (n) => (Hn = n.target));
addEventListener("mouseup", Zn);
addEventListener("keydown", _n);
function Gn(n, r, t) {
	const e = Yn.indexOf(t);
	if (e > -1) {
		Yn.splice(e, 1);
	} else {
		Yn.unshift(t);
	}
	r.append(n);
}
function Wn(n, r) {
	const t = Yn.indexOf(n);
	Yn[t] = r;
}
const Xn = {
	set: pn.set,
	start(n) {
		const { duration: r, complete: t, targets: e } = n;
		pn.remove(e);
		const i = { easing: "cubicBezier(0.550, 0.085, 0.320, 1)" };
		if (r === 0) {
			delete n.complete;
		}
		const a = pn({ ...n, ...i });
		if (r === 0) {
			t === null || t === void 0 ? void 0 : t(a);
		}
		return a;
	},
	scaleIn(n, r = 200) {
		Xn.set(n, { scale: 0, display: "inline-block" });
		const t = Xn.start({ targets: n, duration: r, scale: 1 });
		return t.finished;
	},
	scaleOut(n, r = 200) {
		Xn.set(n, { scale: 1, display: "inline-block" });
		const t = Xn.start({
			targets: n,
			duration: r,
			scale: 0,
			complete: () => {
				Xn.set(n, { display: "none" });
			},
		});
		return t.finished;
	},
	fadeIn(n, r = 200) {
		Xn.set(n, { opacity: 0, display: "inline-block" });
		const t = Xn.start({ targets: n, duration: r, opacity: 1 });
		return t.finished;
	},
	fadeOut(n, r = 200) {
		Xn.set(n, { opacity: 1, display: "inline-block" });
		const t = Xn.start({
			targets: n,
			duration: r,
			opacity: 0,
			complete: () => {
				Xn.set(n, { display: "none" });
			},
		});
		return t.finished;
	},
};
class qn {
	constructor(n, r, t, e = []) {
		this.cmp = n;
		this.reducer = r;
		this.history = [];
		this.properties = e;
		const i = Qn(n.el.tagName.toLowerCase());
		let a = n.el;
		this.store = a[$n];
		if (i) {
			a = nr(Vn(a), (n) => n.matches(i) || n[Jn] === i);
			this.store = a[$n];
		}
		if (!this.store) {
			this.store = new Kn(r, t);
			a[$n] = this.store;
		}
		n.el[$n] = this.store;
		n.el[Jn] = a.tagName.toLowerCase();
		if (!i) {
			this.store.connected = true;
		}
		const { reduxStore: o } = this.store;
		const u = o.getState();
		n.state = { get: o.getState };
		this.history.push(u);
	}
	set(n, r) {
		this.store.reduxStore.replaceReducer((t) => ({ ...t, [n]: r }));
		this.store.reduxStore.replaceReducer(this.reducer);
	}
	dispatch(n) {
		this.store.dispatch(n);
	}
	flush() {
		this.store.flush();
	}
	subscribe() {
		this.sync();
		this.store.reduxStore.subscribe(() => this.sync());
	}
	sync() {
		const { getState: n } = this.store.reduxStore;
		const r = n();
		const t = this.history[this.history.length - 1];
		this.history.push(r);
		for (const e of this.properties) {
			if (t[e] !== r[e]) {
				this.cmp.state.get = () => this.history[this.history.length - 2];
				this.cmp.state = { get: n };
				break;
			}
		}
		this.history.shift();
	}
}
class Kn {
	constructor(n, r) {
		this.connected = false;
		this.queue = [];
		this.reduxStore = Nn(n, r);
	}
	dispatch(n) {
		if (this.connected) {
			this.reduxStore.dispatch(n);
		} else {
			this.queue.push(n);
		}
	}
	flush() {
		this.queue.forEach((n) => {
			this.reduxStore.dispatch(n);
		});
		this.queue = [];
	}
}
function Qn(n) {
	const r = zn.find((r) => r.includes(n));
	if (r) {
		if (r[0] !== n) {
			return r[0];
		} else {
			return;
		}
	} else {
		console.warn(`Element with tagName ${n} not found in componentGraph`);
		return n;
	}
}
function Un(n) {
	if (typeof n === "string") {
		return new Function(n);
	} else if (typeof n === "function") {
		return n;
	} else {
		return Rn;
	}
}
function Vn(n) {
	if (n.assignedSlot) {
		return n.assignedSlot;
	}
	if (n.parentElement) {
		return n.parentElement;
	}
	const r = n.getRootNode();
	if (r.host) {
		return r.host;
	}
	return undefined;
}
function nr(n, r) {
	let t = n;
	while (t) {
		if (
			(typeof r === "string" && t.matches(r)) ||
			(typeof r === "object" && t === r) ||
			(typeof r === "function" && r(t))
		) {
			return t;
		}
		t = Vn(t);
	}
	return undefined;
}
function rr(n, r, t = true) {
	let e;
	let i = 0;
	if (r) {
		e = n.indexOf(r);
	}
	if (e !== undefined) {
		if (e - 1 >= 0) {
			i = e - 1;
		} else if (t) {
			i = n.length - 1;
		} else {
			i = e;
		}
	}
	return n[i];
}
function tr(n, r, t = true) {
	let e;
	let i = 0;
	if (r) {
		e = n.indexOf(r);
	}
	if (e !== undefined) {
		if (e + 1 < n.length) {
			i = e + 1;
		} else if (t) {
			i = 0;
		} else {
			i = e;
		}
	}
	return n[i];
}
function er(n, r) {
	const t = n.compareDocumentPosition(r);
	return t <= Node.DOCUMENT_POSITION_PRECEDING ? (t <= Node.DOCUMENT_POSITION_FOLLOWING ? 1 : 0) : -1;
}
function ir(n) {
	return n ? { [n]: true } : {};
}
function ar(n) {
	if (n instanceof Object) {
		return n;
	}
	if (typeof n === "string") {
		console.log("n:", n.length, n);
		try {
			const a = JSON.parse(n);
			console.log("a:", a);
			return a;
		} catch (n) {
			console.warn(n);
		}
	}
	return undefined;
}
function or(n) {
	return n.offsetParent === null;
}
function ur(n) {
	return /^sdx-/.test(n.tagName.toLowerCase());
}
function fr() {
	const n = document.getElementById("sdx-overlay-outlet");
	n === null || n === void 0 ? void 0 : n.classList.add("sdx");
	return n || document.body;
}
function sr(n, r = false, t = false) {
	if (!n) {
		return 0;
	}
	const e = getComputedStyle(n);
	const i = e.display === "none";
	let a = n.offsetWidth;
	if (r) {
		a = a + parseFloat(e.marginLeft) + parseFloat(e.marginRight);
	}
	if (!t) {
		a = a - parseFloat(e.paddingLeft) - parseFloat(e.paddingRight);
	}
	if (i) {
		return 0;
	}
	return a;
}
function cr(n) {
	return n.nodeType === Node.TEXT_NODE;
}
function lr(n) {
	return n.nodeType === Node.ELEMENT_NODE;
}
function vr(n, r) {
	if (r) {
		return !!n.querySelector(`[slot=${r}]`);
	} else {
		return [...n.childNodes].some((n) => cr(n) || (lr(n) && !n.hasAttribute("slot")));
	}
}
function dr(n, r, t = []) {
	t.push(n);
	if (Array.isArray(n[r])) {
		n[r].forEach((n) => dr(n, r, t));
	}
	return t;
}
function hr(n, r) {
	const t = getComputedStyle(r);
	return parseFloat(t.getPropertyValue(n));
}
function pr() {
	return "ontouchstart" in window;
}
function mr(n, r) {
	n.dispatchEvent(new Event(r, { cancelable: true, bubbles: true, composed: true }));
}
function gr() {
	Tn({ reserveScrollBarGap: true });
}
function yr() {
	Bn();
}
function wr() {
	return window.innerWidth - document.documentElement.clientWidth;
}
function br(n) {
	let r = n;
	while (r) {
		if (r === document.body) {
			return;
		}
		const { overflow: n } = getComputedStyle(r);
		const t = n.includes("auto") || n.includes("scroll");
		const e = r.scrollHeight > r.clientHeight;
		if (t && e) {
			return r;
		}
		r = Vn(r);
	}
	return;
}
function Mr() {
	document.documentElement.style.setProperty("--sdx-dialog-window-inner-height", `${window.innerHeight}px`);
}
function xr(n, r) {
	var t;
	const e = ["de", "fr", "it"];
	const i = r || document.documentElement.lang || "en";
	return ((t = Dn[n]) === null || t === void 0 ? void 0 : t[e.indexOf(i)]) || n;
}
function Er(n) {
	const r = nr(n, ".sdx--dark-theme");
	if (r) {
		return "sdx--dark-theme";
	}
	return "sdx--light-theme";
}
function Ar() {
	var n;
	return (
		window.orientation ||
		((n = screen === null || screen === void 0 ? void 0 : screen.orientation) === null || n === void 0
			? void 0
			: n.angle) ||
		0
	);
}
function Sr(n) {
	return new Promise((r) => {
		const t = setInterval(() => {
			if (n()) {
				clearInterval(t);
				r();
			}
		}, 10);
	});
}
function Nr(n) {
	if (n !== document.documentElement) {
		return { scrollTop: n.scrollTop, scrollLeft: n.scrollLeft };
	}
	const r = document.scrollingElement || document.documentElement;
	return { scrollTop: r.scrollTop, scrollLeft: r.scrollLeft };
}
function Fr() {
	if ("scrollLeftMax" in Element.prototype) {
		return document.fonts.ready;
	}
	return Promise.resolve();
}
const Ir = (n, r, t, e = false) => {
	let i = n.querySelector("input.aux-input");
	if (r || r === "") {
		if (!i) {
			i = n.ownerDocument.createElement("input");
			i.type = "hidden";
			i.classList.add("aux-input");
			n.appendChild(i);
		}
		i.disabled = e;
		i.name = r;
		i.value = t || "";
	} else if (i) {
		n.removeChild(i);
	}
};
export {
	Ar as A,
	Nr as B,
	pr as C,
	ir as D,
	pn as E,
	Fr as F,
	qn as S,
	Xn as a,
	Er as b,
	nr as c,
	mr as d,
	tr as e,
	rr as f,
	hr as g,
	vr as h,
	or as i,
	ur as j,
	Gn as k,
	fr as l,
	Mr as m,
	yr as n,
	gr as o,
	Un as p,
	ar as q,
	Ir as r,
	er as s,
	xr as t,
	wr as u,
	Wn as v,
	Sr as w,
	dr as x,
	sr as y,
	br as z,
};
//# sourceMappingURL=p-c0077c72.js.map
