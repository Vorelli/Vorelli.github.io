import { h as e, r as t, c as i, a as n, H as o, g as a } from "./p-2bbc009f.js";
import { t as r } from "./p-feced640.js";
import { o as l } from "./p-9e1eebe9.js";
import {
	q as s,
	u as d,
	a as h,
	v as c,
	o as u,
	k as f,
	n as m,
	x as p,
	y as x,
	b as k,
	t as g,
	m as b,
	h as v,
} from "./p-c0077c72.js";
import { b as y } from "./p-146b83ed.js";
import "./p-fbb3c5ee.js";
var w = Symbol.for("immer-nothing");
var z = Symbol.for("immer-draftable");
var S = Symbol.for("immer-state");
function C(e, ...t) {
	throw new Error(`[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`);
}
var A = Object.getPrototypeOf;
function j(e) {
	return !!e && !!e[S];
}
function O(e) {
	if (!e) return false;
	return I(e) || Array.isArray(e) || !!e[z] || !!e.constructor?.[z] || M(e) || P(e);
}
var E = Object.prototype.constructor.toString();
function I(e) {
	if (!e || typeof e !== "object") return false;
	const t = A(e);
	if (t === null) {
		return true;
	}
	const i = Object.hasOwnProperty.call(t, "constructor") && t.constructor;
	if (i === Object) return true;
	return typeof i == "function" && Function.toString.call(i) === E;
}
function L(e, t) {
	if (D(e) === 0) {
		Object.entries(e).forEach(([i, n]) => {
			t(i, n, e);
		});
	} else {
		e.forEach((i, n) => t(n, i, e));
	}
}
function D(e) {
	const t = e[S];
	return t ? t.type_ : Array.isArray(e) ? 1 : M(e) ? 2 : P(e) ? 3 : 0;
}
function _(e, t) {
	return D(e) === 2 ? e.has(t) : Object.prototype.hasOwnProperty.call(e, t);
}
function N(e, t, i) {
	const n = D(e);
	if (n === 2) e.set(t, i);
	else if (n === 3) {
		e.add(i);
	} else e[t] = i;
}
function T(e, t) {
	if (e === t) {
		return e !== 0 || 1 / e === 1 / t;
	} else {
		return e !== e && t !== t;
	}
}
function M(e) {
	return e instanceof Map;
}
function P(e) {
	return e instanceof Set;
}
function U(e) {
	return e.copy_ || e.base_;
}
function $(e, t) {
	if (M(e)) {
		return new Map(e);
	}
	if (P(e)) {
		return new Set(e);
	}
	if (Array.isArray(e)) return Array.prototype.slice.call(e);
	if (!t && I(e)) {
		if (!A(e)) {
			const t = Object.create(null);
			return Object.assign(t, e);
		}
		return { ...e };
	}
	const i = Object.getOwnPropertyDescriptors(e);
	delete i[S];
	let n = Reflect.ownKeys(i);
	for (let t = 0; t < n.length; t++) {
		const o = n[t];
		const a = i[o];
		if (a.writable === false) {
			a.writable = true;
			a.configurable = true;
		}
		if (a.get || a.set) i[o] = { configurable: true, writable: true, enumerable: a.enumerable, value: e[o] };
	}
	return Object.create(A(e), i);
}
function H(e, t = false) {
	if (F(e) || j(e) || !O(e)) return e;
	if (D(e) > 1) {
		e.set = e.add = e.clear = e.delete = R;
	}
	Object.freeze(e);
	if (t) L(e, (e, t) => H(t, true));
	return e;
}
function R() {
	C(2);
}
function F(e) {
	return Object.isFrozen(e);
}
var W = {};
function Z(e) {
	const t = W[e];
	if (!t) {
		C(0, e);
	}
	return t;
}
var B;
function Y() {
	return B;
}
function K(e, t) {
	return { drafts_: [], parent_: e, immer_: t, canAutoFreeze_: true, unfinalizedDrafts_: 0 };
}
function G(e, t) {
	if (t) {
		Z("Patches");
		e.patches_ = [];
		e.inversePatches_ = [];
		e.patchListener_ = t;
	}
}
function X(e) {
	J(e);
	e.drafts_.forEach(V);
	e.drafts_ = null;
}
function J(e) {
	if (e === B) {
		B = e.parent_;
	}
}
function q(e) {
	return (B = K(B, e));
}
function V(e) {
	const t = e[S];
	if (t.type_ === 0 || t.type_ === 1) t.revoke_();
	else t.revoked_ = true;
}
function Q(e, t) {
	t.unfinalizedDrafts_ = t.drafts_.length;
	const i = t.drafts_[0];
	const n = e !== void 0 && e !== i;
	if (n) {
		if (i[S].modified_) {
			X(t);
			C(4);
		}
		if (O(e)) {
			e = ee(t, e);
			if (!t.parent_) ie(t, e);
		}
		if (t.patches_) {
			Z("Patches").generateReplacementPatches_(i[S].base_, e, t.patches_, t.inversePatches_);
		}
	} else {
		e = ee(t, i, []);
	}
	X(t);
	if (t.patches_) {
		t.patchListener_(t.patches_, t.inversePatches_);
	}
	return e !== w ? e : void 0;
}
function ee(e, t, i) {
	if (F(t)) return t;
	const n = t[S];
	if (!n) {
		L(t, (o, a) => te(e, n, t, o, a, i));
		return t;
	}
	if (n.scope_ !== e) return t;
	if (!n.modified_) {
		ie(e, n.base_, true);
		return n.base_;
	}
	if (!n.finalized_) {
		n.finalized_ = true;
		n.scope_.unfinalizedDrafts_--;
		const t = n.copy_;
		let o = t;
		let a = false;
		if (n.type_ === 3) {
			o = new Set(t);
			t.clear();
			a = true;
		}
		L(o, (o, r) => te(e, n, t, o, r, i, a));
		ie(e, t, false);
		if (i && e.patches_) {
			Z("Patches").generatePatches_(n, i, e.patches_, e.inversePatches_);
		}
	}
	return n.copy_;
}
function te(e, t, i, n, o, a, r) {
	if (j(o)) {
		const r = a && t && t.type_ !== 3 && !_(t.assigned_, n) ? a.concat(n) : void 0;
		const l = ee(e, o, r);
		N(i, n, l);
		if (j(l)) {
			e.canAutoFreeze_ = false;
		} else return;
	} else if (r) {
		i.add(o);
	}
	if (O(o) && !F(o)) {
		if (!e.immer_.autoFreeze_ && e.unfinalizedDrafts_ < 1) {
			return;
		}
		ee(e, o);
		if (!t || !t.scope_.parent_) ie(e, o);
	}
}
function ie(e, t, i = false) {
	if (!e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_) {
		H(t, i);
	}
}
function ne(e, t) {
	const i = Array.isArray(e);
	const n = {
		type_: i ? 1 : 0,
		scope_: t ? t.scope_ : Y(),
		modified_: false,
		finalized_: false,
		assigned_: {},
		parent_: t,
		base_: e,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: false,
	};
	let o = n;
	let a = oe;
	if (i) {
		o = [n];
		a = ae;
	}
	const { revoke: r, proxy: l } = Proxy.revocable(o, a);
	n.draft_ = l;
	n.revoke_ = r;
	return l;
}
var oe = {
	get(e, t) {
		if (t === S) return e;
		const i = U(e);
		if (!_(i, t)) {
			return le(e, i, t);
		}
		const n = i[t];
		if (e.finalized_ || !O(n)) {
			return n;
		}
		if (n === re(e.base_, t)) {
			he(e);
			return (e.copy_[t] = ue(n, e));
		}
		return n;
	},
	has(e, t) {
		return t in U(e);
	},
	ownKeys(e) {
		return Reflect.ownKeys(U(e));
	},
	set(e, t, i) {
		const n = se(U(e), t);
		if (n?.set) {
			n.set.call(e.draft_, i);
			return true;
		}
		if (!e.modified_) {
			const n = re(U(e), t);
			const o = n?.[S];
			if (o && o.base_ === i) {
				e.copy_[t] = i;
				e.assigned_[t] = false;
				return true;
			}
			if (T(i, n) && (i !== void 0 || _(e.base_, t))) return true;
			he(e);
			de(e);
		}
		if ((e.copy_[t] === i && (i !== void 0 || t in e.copy_)) || (Number.isNaN(i) && Number.isNaN(e.copy_[t])))
			return true;
		e.copy_[t] = i;
		e.assigned_[t] = true;
		return true;
	},
	deleteProperty(e, t) {
		if (re(e.base_, t) !== void 0 || t in e.base_) {
			e.assigned_[t] = false;
			he(e);
			de(e);
		} else {
			delete e.assigned_[t];
		}
		if (e.copy_) {
			delete e.copy_[t];
		}
		return true;
	},
	getOwnPropertyDescriptor(e, t) {
		const i = U(e);
		const n = Reflect.getOwnPropertyDescriptor(i, t);
		if (!n) return n;
		return { writable: true, configurable: e.type_ !== 1 || t !== "length", enumerable: n.enumerable, value: i[t] };
	},
	defineProperty() {
		C(11);
	},
	getPrototypeOf(e) {
		return A(e.base_);
	},
	setPrototypeOf() {
		C(12);
	},
};
var ae = {};
L(oe, (e, t) => {
	ae[e] = function () {
		arguments[0] = arguments[0][0];
		return t.apply(this, arguments);
	};
});
ae.deleteProperty = function (e, t) {
	return ae.set.call(this, e, t, void 0);
};
ae.set = function (e, t, i) {
	return oe.set.call(this, e[0], t, i, e[0]);
};
function re(e, t) {
	const i = e[S];
	const n = i ? U(i) : e;
	return n[t];
}
function le(e, t, i) {
	const n = se(t, i);
	return n ? (`value` in n ? n.value : n.get?.call(e.draft_)) : void 0;
}
function se(e, t) {
	if (!(t in e)) return void 0;
	let i = A(e);
	while (i) {
		const e = Object.getOwnPropertyDescriptor(i, t);
		if (e) return e;
		i = A(i);
	}
	return void 0;
}
function de(e) {
	if (!e.modified_) {
		e.modified_ = true;
		if (e.parent_) {
			de(e.parent_);
		}
	}
}
function he(e) {
	if (!e.copy_) {
		e.copy_ = $(e.base_, e.scope_.immer_.useStrictShallowCopy_);
	}
}
var ce = class {
	constructor(e) {
		this.autoFreeze_ = true;
		this.useStrictShallowCopy_ = false;
		this.produce = (e, t, i) => {
			if (typeof e === "function" && typeof t !== "function") {
				const i = t;
				t = e;
				const n = this;
				return function e(o = i, ...a) {
					return n.produce(o, (e) => t.call(this, e, ...a));
				};
			}
			if (typeof t !== "function") C(6);
			if (i !== void 0 && typeof i !== "function") C(7);
			let n;
			if (O(e)) {
				const o = q(this);
				const a = ue(e, void 0);
				let r = true;
				try {
					n = t(a);
					r = false;
				} finally {
					if (r) X(o);
					else J(o);
				}
				G(o, i);
				return Q(n, o);
			} else if (!e || typeof e !== "object") {
				n = t(e);
				if (n === void 0) n = e;
				if (n === w) n = void 0;
				if (this.autoFreeze_) H(n, true);
				if (i) {
					const t = [];
					const o = [];
					Z("Patches").generateReplacementPatches_(e, n, t, o);
					i(t, o);
				}
				return n;
			} else C(1, e);
		};
		this.produceWithPatches = (e, t) => {
			if (typeof e === "function") {
				return (t, ...i) => this.produceWithPatches(t, (t) => e(t, ...i));
			}
			let i, n;
			const o = this.produce(e, t, (e, t) => {
				i = e;
				n = t;
			});
			return [o, i, n];
		};
		if (typeof e?.autoFreeze === "boolean") this.setAutoFreeze(e.autoFreeze);
		if (typeof e?.useStrictShallowCopy === "boolean") this.setUseStrictShallowCopy(e.useStrictShallowCopy);
	}
	createDraft(e) {
		if (!O(e)) C(8);
		if (j(e)) e = fe(e);
		const t = q(this);
		const i = ue(e, void 0);
		i[S].isManual_ = true;
		J(t);
		return i;
	}
	finishDraft(e, t) {
		const i = e && e[S];
		if (!i || !i.isManual_) C(9);
		const { scope_: n } = i;
		G(n, t);
		return Q(void 0, n);
	}
	setAutoFreeze(e) {
		this.autoFreeze_ = e;
	}
	setUseStrictShallowCopy(e) {
		this.useStrictShallowCopy_ = e;
	}
	applyPatches(e, t) {
		let i;
		for (i = t.length - 1; i >= 0; i--) {
			const n = t[i];
			if (n.path.length === 0 && n.op === "replace") {
				e = n.value;
				break;
			}
		}
		if (i > -1) {
			t = t.slice(i + 1);
		}
		const n = Z("Patches").applyPatches_;
		if (j(e)) {
			return n(e, t);
		}
		return this.produce(e, (e) => n(e, t));
	}
};
function ue(e, t) {
	const i = M(e) ? Z("MapSet").proxyMap_(e, t) : P(e) ? Z("MapSet").proxySet_(e, t) : ne(e, t);
	const n = t ? t.scope_ : Y();
	n.drafts_.push(i);
	return i;
}
function fe(e) {
	if (!j(e)) C(10, e);
	return me(e);
}
function me(e) {
	if (!O(e) || F(e)) return e;
	const t = e[S];
	let i;
	if (t) {
		if (!t.modified_) return t.base_;
		t.finalized_ = true;
		i = $(e, t.scope_.immer_.useStrictShallowCopy_);
	} else {
		i = $(e, true);
	}
	L(i, (e, t) => {
		N(i, e, me(t));
	});
	if (t) {
		t.finalized_ = false;
	}
	return i;
}
var pe = new ce();
var xe = pe.produce;
pe.produceWithPatches.bind(pe);
pe.setAutoFreeze.bind(pe);
pe.setUseStrictShallowCopy.bind(pe);
pe.applyPatches.bind(pe);
pe.createDraft.bind(pe);
pe.finishDraft.bind(pe);
function ke(e, t, i, n) {
	var o = -1,
		a = e == null ? 0 : e.length;
	if (n && a) {
		i = e[++o];
	}
	while (++o < a) {
		i = t(i, e[o], o, e);
	}
	return i;
}
function ge(e) {
	return function (t) {
		return e == null ? undefined : e[t];
	};
}
var be = {
	À: "A",
	Á: "A",
	Â: "A",
	Ã: "A",
	Ä: "A",
	Å: "A",
	à: "a",
	á: "a",
	â: "a",
	ã: "a",
	ä: "a",
	å: "a",
	Ç: "C",
	ç: "c",
	Ð: "D",
	ð: "d",
	È: "E",
	É: "E",
	Ê: "E",
	Ë: "E",
	è: "e",
	é: "e",
	ê: "e",
	ë: "e",
	Ì: "I",
	Í: "I",
	Î: "I",
	Ï: "I",
	ì: "i",
	í: "i",
	î: "i",
	ï: "i",
	Ñ: "N",
	ñ: "n",
	Ò: "O",
	Ó: "O",
	Ô: "O",
	Õ: "O",
	Ö: "O",
	Ø: "O",
	ò: "o",
	ó: "o",
	ô: "o",
	õ: "o",
	ö: "o",
	ø: "o",
	Ù: "U",
	Ú: "U",
	Û: "U",
	Ü: "U",
	ù: "u",
	ú: "u",
	û: "u",
	ü: "u",
	Ý: "Y",
	ý: "y",
	ÿ: "y",
	Æ: "Ae",
	æ: "ae",
	Þ: "Th",
	þ: "th",
	ß: "ss",
	Ā: "A",
	Ă: "A",
	Ą: "A",
	ā: "a",
	ă: "a",
	ą: "a",
	Ć: "C",
	Ĉ: "C",
	Ċ: "C",
	Č: "C",
	ć: "c",
	ĉ: "c",
	ċ: "c",
	č: "c",
	Ď: "D",
	Đ: "D",
	ď: "d",
	đ: "d",
	Ē: "E",
	Ĕ: "E",
	Ė: "E",
	Ę: "E",
	Ě: "E",
	ē: "e",
	ĕ: "e",
	ė: "e",
	ę: "e",
	ě: "e",
	Ĝ: "G",
	Ğ: "G",
	Ġ: "G",
	Ģ: "G",
	ĝ: "g",
	ğ: "g",
	ġ: "g",
	ģ: "g",
	Ĥ: "H",
	Ħ: "H",
	ĥ: "h",
	ħ: "h",
	Ĩ: "I",
	Ī: "I",
	Ĭ: "I",
	Į: "I",
	İ: "I",
	ĩ: "i",
	ī: "i",
	ĭ: "i",
	į: "i",
	ı: "i",
	Ĵ: "J",
	ĵ: "j",
	Ķ: "K",
	ķ: "k",
	ĸ: "k",
	Ĺ: "L",
	Ļ: "L",
	Ľ: "L",
	Ŀ: "L",
	Ł: "L",
	ĺ: "l",
	ļ: "l",
	ľ: "l",
	ŀ: "l",
	ł: "l",
	Ń: "N",
	Ņ: "N",
	Ň: "N",
	Ŋ: "N",
	ń: "n",
	ņ: "n",
	ň: "n",
	ŋ: "n",
	Ō: "O",
	Ŏ: "O",
	Ő: "O",
	ō: "o",
	ŏ: "o",
	ő: "o",
	Ŕ: "R",
	Ŗ: "R",
	Ř: "R",
	ŕ: "r",
	ŗ: "r",
	ř: "r",
	Ś: "S",
	Ŝ: "S",
	Ş: "S",
	Š: "S",
	ś: "s",
	ŝ: "s",
	ş: "s",
	š: "s",
	Ţ: "T",
	Ť: "T",
	Ŧ: "T",
	ţ: "t",
	ť: "t",
	ŧ: "t",
	Ũ: "U",
	Ū: "U",
	Ŭ: "U",
	Ů: "U",
	Ű: "U",
	Ų: "U",
	ũ: "u",
	ū: "u",
	ŭ: "u",
	ů: "u",
	ű: "u",
	ų: "u",
	Ŵ: "W",
	ŵ: "w",
	Ŷ: "Y",
	ŷ: "y",
	Ÿ: "Y",
	Ź: "Z",
	Ż: "Z",
	Ž: "Z",
	ź: "z",
	ż: "z",
	ž: "z",
	Ĳ: "IJ",
	ĳ: "ij",
	Œ: "Oe",
	œ: "oe",
	ŉ: "'n",
	ſ: "s",
};
var ve = ge(be);
const ye = ve;
var we = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var ze = "\\u0300-\\u036f",
	Se = "\\ufe20-\\ufe2f",
	Ce = "\\u20d0-\\u20ff",
	Ae = ze + Se + Ce;
var je = "[" + Ae + "]";
var Oe = RegExp(je, "g");
function Ee(e) {
	e = r(e);
	return e && e.replace(we, ye).replace(Oe, "");
}
var Ie = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function Le(e) {
	return e.match(Ie) || [];
}
var De = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function _e(e) {
	return De.test(e);
}
var Ne = "\\ud800-\\udfff",
	Te = "\\u0300-\\u036f",
	Me = "\\ufe20-\\ufe2f",
	Pe = "\\u20d0-\\u20ff",
	Ue = Te + Me + Pe,
	$e = "\\u2700-\\u27bf",
	He = "a-z\\xdf-\\xf6\\xf8-\\xff",
	Re = "\\xac\\xb1\\xd7\\xf7",
	Fe = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf",
	We = "\\u2000-\\u206f",
	Ze =
		" \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",
	Be = "A-Z\\xc0-\\xd6\\xd8-\\xde",
	Ye = "\\ufe0e\\ufe0f",
	Ke = Re + Fe + We + Ze;
var Ge = "['’]",
	Xe = "[" + Ke + "]",
	Je = "[" + Ue + "]",
	qe = "\\d+",
	Ve = "[" + $e + "]",
	Qe = "[" + He + "]",
	et = "[^" + Ne + Ke + qe + $e + He + Be + "]",
	tt = "\\ud83c[\\udffb-\\udfff]",
	it = "(?:" + Je + "|" + tt + ")",
	nt = "[^" + Ne + "]",
	ot = "(?:\\ud83c[\\udde6-\\uddff]){2}",
	at = "[\\ud800-\\udbff][\\udc00-\\udfff]",
	rt = "[" + Be + "]",
	lt = "\\u200d";
var st = "(?:" + Qe + "|" + et + ")",
	dt = "(?:" + rt + "|" + et + ")",
	ht = "(?:" + Ge + "(?:d|ll|m|re|s|t|ve))?",
	ct = "(?:" + Ge + "(?:D|LL|M|RE|S|T|VE))?",
	ut = it + "?",
	ft = "[" + Ye + "]?",
	mt = "(?:" + lt + "(?:" + [nt, ot, at].join("|") + ")" + ft + ut + ")*",
	pt = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",
	xt = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])",
	kt = ft + ut + mt,
	gt = "(?:" + [Ve, ot, at].join("|") + ")" + kt;
var bt = RegExp(
	[
		rt + "?" + Qe + "+" + ht + "(?=" + [Xe, rt, "$"].join("|") + ")",
		dt + "+" + ct + "(?=" + [Xe, rt + st, "$"].join("|") + ")",
		rt + "?" + st + "+" + ht,
		rt + "+" + ct,
		xt,
		pt,
		qe,
		gt,
	].join("|"),
	"g",
);
function vt(e) {
	return e.match(bt) || [];
}
function yt(e, t, i) {
	e = r(e);
	t = i ? undefined : t;
	if (t === undefined) {
		return _e(e) ? vt(e) : Le(e);
	}
	return e.match(t) || [];
}
var wt = "['’]";
var zt = RegExp(wt, "g");
function St(e) {
	return function (t) {
		return ke(yt(Ee(t).replace(zt, "")), e, "");
	};
}
var Ct = St(function (e, t, i) {
	return e + (i ? "-" : "") + t.toLowerCase();
});
const At = Ct;
let jt = () => undefined;
function Ot(e) {
	jt = e;
}
function Et(e) {
	const t = _t(e.children);
	return !!e.href && (!t.length || !!e.hasLeftHandMenu);
}
function It() {
	return {
		accordion: { border: "none" },
		header: { fontSize: "inherit", fontWeight: "inherit", lineHeight: "inherit", padding: "0" },
		arrow: { background: "#015" },
		body: { marginRight: "0", marginBottom: "0" },
	};
}
function Lt(e, t, i = Infinity, n = 0) {
	return { item: true, active: t.includes(e), leaf: n === i };
}
function Dt(t, i = {}, n, o = () => undefined) {
	let a = t.label;
	if (t.slot && !t.showLabelOnDesktop) {
		a = undefined;
	}
	return e(
		"a",
		{
			onClick: (e) => {
				if (Et(t)) {
					jt(e, t);
				}
			},
			href: t.href,
			class: "link",
			rel: t.rel,
			"aria-current": t.active ? "location" : false,
			"aria-label": t.ariaLabel || t.label || t.iconName,
			"aria-expanded": t.ariaExpanded,
			...l(t.dataset, (e, t) => ({ [`data-${At(e)}`]: t })),
			...i,
		},
		n
			? n
			: t.iconName
			  ? e(
						"span",
						{ class: "icon-label-wrapper" },
						e("sdx-icon", { size: t.iconSize, iconName: t.iconName, class: { icon: true, [t.iconName]: true } }),
						a && e("span", { class: "label", ref: o }, a),
						t.badge && e("span", { class: "badge" }, t.badge),
				  )
			  : e("span", null, a),
	);
}
function _t(e = []) {
	return e.filter((e) => !e.hidden);
}
function Nt(t, i, n, o, a, r, l = 0) {
	if (t.hidden) {
		return;
	}
	const { accordion: s, header: d, arrow: h, body: c } = It();
	const u = _t(t.children);
	const f = !!(u.length && !(t.hasLeftHandMenu && a));
	l = l + 1;
	return e(
		"li",
		{ class: Lt(t, i, r, l) },
		f
			? e(
					"sdx-accordion",
					{ arrowPosition: n, componentStyle: { ...s, ...o.accordion } },
					e(
						"sdx-accordion-item",
						{ open: i.includes(t) },
						e(
							"sdx-accordion-item-header",
							{ buttonStyle: { ...d, ...o.header }, arrowStyle: { ...h, ...o.arrow } },
							Dt(t, { href: "javascript:;" }),
						),
						e(
							"sdx-accordion-item-body",
							{ componentStyle: { ...c, ...o.body } },
							e(
								"ul",
								{ class: "ul vertical" },
								u.map((e) => Nt(e, i, n, o, a, r, l)),
							),
						),
					),
			  )
			: Dt(t),
	);
}
const Tt =
	'@charset "UTF-8";:host,*,*:before,*:after{box-sizing:border-box}.text-body-1,.text-standard{line-height:24px;letter-spacing:-0.1px;font-size:18px}.text-body-2,.text-small{line-height:21px;letter-spacing:0;font-size:16px}h1,h2,h3,h4,h5,h6,p{margin:0;text-align:left;word-wrap:break-word}.h1,.h2,.h3,.h4,.h5,.h6,.hero,.d1,.d2,.d3{color:#015}.h1,.text-h1,h1{line-height:40px;letter-spacing:-1px;font-size:32px;font-weight:700;margin-bottom:24px}@media (min-width: 1024px){.h1,.text-h1,h1{line-height:48px;letter-spacing:-1.2px;font-size:40px}}@media (min-width: 1024px){.h1,.text-h1,h1{margin-bottom:32px}}.h2,.text-h2,h2{line-height:32px;letter-spacing:-0.75px;font-size:28px;font-weight:700;margin-bottom:20px}@media (min-width: 1024px){.h2,.text-h2,h2{line-height:40px;letter-spacing:-1px;font-size:32px}}@media (min-width: 1024px){.h2,.text-h2,h2{margin-bottom:24px}}.h3,.h4,.text-h3,.text-h4,h3,h4{margin-bottom:16px}@media (min-width: 1024px){.h3,.h4,.text-h3,.text-h4,h3,h4{margin-bottom:20px}}.h3,.text-h3,h3{line-height:32px;letter-spacing:-0.35px;font-size:24px;font-weight:600}@media (min-width: 1024px){.h3,.text-h3,h3{line-height:32px;letter-spacing:-0.75px;font-size:28px}}.h4,.text-h4,h4{line-height:24px;letter-spacing:-0.1px;font-size:20px;font-weight:600}@media (min-width: 1024px){.h4,.text-h4,h4{line-height:32px;letter-spacing:-0.35px;font-size:24px}}.text-h3.text-compact{line-height:31px}.text-h4.text-compact{line-height:27px}.h5,.h6,.text-h5,.text-h6,h5,h6{margin-bottom:8px}.h5,.text-h5,h5{line-height:24px;letter-spacing:-0.1px;font-size:18px;font-weight:600}.h6,.text-h6,h6{line-height:24px;letter-spacing:-0.1px;font-size:16px;font-weight:600}.paragraph,p{line-height:24px;letter-spacing:-0.1px;font-size:18px;margin-bottom:20px}@media (min-width: 1024px){.paragraph,p{margin-bottom:24px}}.paragraph:last-child,p:last-child{margin-bottom:0}.hero,.text-hero,.d1,.text-d1,.d2,.text-d2,.d3,.text-d3{font-weight:700}.hero,.text-hero{line-height:80px;letter-spacing:-1.75px;font-size:70px}@media (min-width: 1024px){.hero,.text-hero{line-height:104px;letter-spacing:-2px;font-size:96px}}.d1,.text-d1{line-height:64px;letter-spacing:-1.35px;font-size:54px}@media (min-width: 1024px){.d1,.text-d1{line-height:80px;letter-spacing:-1.75px;font-size:70px}}.d2,.text-d2{line-height:56px;letter-spacing:-1.2px;font-size:48px}@media (min-width: 1024px){.d2,.text-d2{line-height:64px;letter-spacing:-1.35px;font-size:54px}}.d3,.text-d3{line-height:48px;letter-spacing:-1.2px;font-size:40px}@media (min-width: 1024px){.d3,.text-d3{line-height:56px;letter-spacing:-1.2px;font-size:48px}}.text-b1{line-height:24px;letter-spacing:-0.1px;font-size:18px;font-weight:400}.text-b2{line-height:21px;letter-spacing:0;font-size:16px;font-weight:400}.text-sm,.text-smaller{line-height:18px;letter-spacing:0.1px;font-size:14px;font-weight:400}.text-compact{line-height:21px}.figcaption{line-height:18px;letter-spacing:0.1px;font-size:14px}.code{font-family:monospace;background-color:#f8fafb;border-radius:4px;border:1px solid #d6d6d6;color:#474747;font-size:16px;padding:0 6px}address{font-style:normal}strong{font-weight:600}em{font-style:italic}.font{font-family:TheSans, sans-serif}.font--sans{font-family:TheSans, sans-serif}.font--serif{font-family:TheSerif, serif}.font--light{font-weight:300}.font--semi-light{font-weight:400}.font--semi-bold{font-weight:600}.sdx--dark-theme .h1,.sdx--dark-theme .h2,.sdx--dark-theme .h3,.sdx--dark-theme .h4,.sdx--dark-theme .h5,.sdx--dark-theme .h6,.sdx--dark-theme .hero,.sdx--dark-theme .d1,.sdx--dark-theme .d2,.sdx--dark-theme .d3{color:unset}.sdx--dark-theme .h1,.sdx--dark-theme .text-h1,.sdx--dark-theme h1,.sdx--dark-theme .h2,.sdx--dark-theme .text-h2,.sdx--dark-theme h2,.sdx--dark-theme .h3,.sdx--dark-theme .text-h3,.sdx--dark-theme h3,.sdx--dark-theme .h4,.sdx--dark-theme .text-h4,.sdx--dark-theme h4,.sdx--dark-theme .d1,.sdx--dark-theme .text-d1,.sdx--dark-theme .d2,.sdx--dark-theme .text-d2,.sdx--dark-theme .d3,.sdx--dark-theme .text-d3{font-weight:600}.sdx--dark-theme .p,.sdx--dark-theme .paragraph,.sdx--dark-theme p{font-weight:500}.sdx--dark-theme .h1,.sdx--dark-theme .text-h1,.sdx--dark-theme h1{letter-spacing:-0.8px}.sdx--dark-theme .h2,.sdx--dark-theme .text-h2,.sdx--dark-theme h2{letter-spacing:-0.6px}.sdx--dark-theme .h3,.sdx--dark-theme .text-h3,.sdx--dark-theme h3{letter-spacing:-0.5px}.sdx--dark-theme .h4,.sdx--dark-theme .text-h4,.sdx--dark-theme h4{letter-spacing:-0.2px}.sdx--dark-theme .h5,.sdx--dark-theme .text-h5,.sdx--dark-theme h5{letter-spacing:-0.1px}.sdx--dark-theme .h6,.sdx--dark-theme .text-h6,.sdx--dark-theme h6{letter-spacing:0px}.sdx--dark-theme .d1,.sdx--dark-theme .text-d1{letter-spacing:-1.4px}.sdx--dark-theme .d2,.sdx--dark-theme .text-d2{letter-spacing:-1px}.sdx--dark-theme .d3,.sdx--dark-theme .text-d3{letter-spacing:-0.9px}.sdx--dark-theme .code{background-color:#242424;border:1px solid #b1b9be;border-radius:4px;color:#cfd5d9;font-size:16px}.sdx--dark-theme strong,.sdx--dark-theme b{color:#fff}a,a.link,button.link{position:relative;transition:color 200ms cubic-bezier(0.4, 0, 0.6, 1), text-decoration-color 200ms cubic-bezier(0.4, 0, 0.6, 1);outline:none;text-decoration:underline;text-underline-offset:5px;color:#086adb}a:where(:any-link,button):active,a.link:where(:any-link,button):active,button.link:where(:any-link,button):active{text-decoration-thickness:2px;color:#0048cf;text-decoration-color:#0048cf}@media (hover: hover){a:where(:any-link,button):hover,a:where(:any-link,button):focus-visible,a.link:where(:any-link,button):hover,a.link:where(:any-link,button):focus-visible,button.link:where(:any-link,button):hover,button.link:where(:any-link,button):focus-visible{text-decoration-thickness:2px;color:#0048cf;text-decoration-color:#0048cf}}a:focus,a.link:focus,button.link:focus{outline:none}a+a,a+a.link,a+button.link,a.link+a,a.link+a.link,a.link+button.link,button.link+a,button.link+a.link,button.link+button.link{margin-left:24px}a[class*=icon-],a.link--standalone,a.link--anchor,a.link[class*=icon-],a.link.link--standalone,a.link.link--anchor,button.link[class*=icon-],button.link.link--standalone,button.link.link--anchor{display:inline-block;margin-left:24px;text-decoration-color:transparent}a[class*=icon-]:active,a.link--standalone:active,a.link--anchor:active,a.link[class*=icon-]:active,a.link.link--standalone:active,a.link.link--anchor:active,button.link[class*=icon-]:active,button.link.link--standalone:active,button.link.link--anchor:active{text-decoration-color:unset}@media (hover: hover){a[class*=icon-]:hover,a[class*=icon-]:focus-visible,a.link--standalone:hover,a.link--standalone:focus-visible,a.link--anchor:hover,a.link--anchor:focus-visible,a.link[class*=icon-]:hover,a.link[class*=icon-]:focus-visible,a.link.link--standalone:hover,a.link.link--standalone:focus-visible,a.link.link--anchor:hover,a.link.link--anchor:focus-visible,button.link[class*=icon-]:hover,button.link[class*=icon-]:focus-visible,button.link.link--standalone:hover,button.link.link--standalone:focus-visible,button.link.link--anchor:hover,button.link.link--anchor:focus-visible{text-decoration-color:unset}}a[class*=icon-]::before,a.link--standalone::before,a.link--anchor::before,a.link[class*=icon-]::before,a.link.link--standalone::before,a.link.link--anchor::before,button.link[class*=icon-]::before,button.link.link--standalone::before,button.link.link--anchor::before{margin-left:-24px;display:inline-block;font-family:sdx-icons;padding-right:6px;position:relative}a.link--standalone::before,a.link.link--standalone::before,button.link.link--standalone::before{content:"\\e004"}a.link--anchor::before,a.link.link--anchor::before,button.link.link--anchor::before{content:"\\e002"}a:not(:any-link){text-decoration:none}p a+a,p a+a.link,p a+button.link,p a.link+a,p a.link+a.link,p a.link+button.link,p button.link+a,p button.link+a.link,p button.link+button.link,.list a+a,.list a+a.link,.list a+button.link,.list a.link+a,.list a.link+a.link,.list a.link+button.link,.list button.link+a,.list button.link+a.link,.list button.link+button.link{margin-left:0}.sdx--dark-theme a,.sdx--dark-theme a.link,.sdx--dark-theme button.link{color:#4294ff}.sdx--dark-theme a:active,.sdx--dark-theme a.link:active,.sdx--dark-theme button.link:active{color:#5ca3ff;text-decoration-color:#5ca3ff}@media (hover: hover){.sdx--dark-theme a:hover,.sdx--dark-theme a:focus-visible,.sdx--dark-theme a.link:hover,.sdx--dark-theme a.link:focus-visible,.sdx--dark-theme button.link:hover,.sdx--dark-theme button.link:focus-visible{color:#5ca3ff;text-decoration-color:#5ca3ff}}.bg--dark a,.bg--dark a.link,.bg--dark button.link,a.link.link--dark,a.link.link--white,button.link.link--dark,a.link--dark,a.link--white,button.link--dark,button.link--white{color:#fff}.bg--dark a:active,.bg--dark a.link:active,.bg--dark button.link:active,a.link.link--dark:active,a.link.link--white:active,button.link.link--dark:active,a.link--dark:active,a.link--white:active,button.link--dark:active,button.link--white:active{color:#fff;text-decoration-color:#fff}@media (hover: hover){.bg--dark a:hover,.bg--dark a:focus-visible,.bg--dark a.link:hover,.bg--dark a.link:focus-visible,.bg--dark button.link:hover,.bg--dark button.link:focus-visible,a.link.link--dark:hover,a.link.link--dark:focus-visible,a.link.link--white:hover,a.link.link--white:focus-visible,button.link.link--dark:hover,button.link.link--dark:focus-visible,a.link--dark:hover,a.link--dark:focus-visible,a.link--white:hover,a.link--white:focus-visible,button.link--dark:hover,button.link--dark:focus-visible,button.link--white:hover,button.link--white:focus-visible{color:#fff;text-decoration-color:#fff}}ul,menu,dir{display:block;padding:0}ul,ol{margin:0;padding:0;list-style:none}ul.list,ol.list{margin-top:16px;margin-bottom:16px}@media (min-width: 1024px){ul.list,ol.list{margin-top:24px;margin-bottom:24px}}ul.list ul.list,ul.list ol.list,ol.list ul.list,ol.list ol.list{margin-top:8px;margin-bottom:8px}@media (min-width: 1024px){ul.list ul.list,ul.list ol.list,ol.list ul.list,ol.list ol.list{margin-top:16px;margin-bottom:16px}}ul.list li::before,ol.list li::before{color:#086adb}ul.list.single-line li:not(:last-of-type){margin-bottom:6px}ul.list li{margin-left:18px}ul.list li:not(:last-of-type){margin-bottom:12px}ul.list li::before{float:left;margin-left:-18px;font-size:33px}ul.list li:not([class*=icon-])::before{content:"•"}ul.list li[class*=icon-],ul.list li.list--link,ul.list li.list--anchor{margin-left:24px}ul.list li[class*=icon-]::before,ul.list li.list--link::before,ul.list li.list--anchor::before{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;text-transform:none;text-decoration:none;text-rendering:auto;line-height:1;font-family:"sdx-icons";font-size:inherit;font-weight:normal;font-style:normal;font-variant:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-stretch:normal;position:relative;top:3px;margin-left:-24px}ul.list li[class*=icon-]>a,ul.list li.list--link>a,ul.list li.list--anchor>a{text-decoration:none}ul.list li[class*=icon-]>a:hover,ul.list li[class*=icon-]>a:focus-visible,ul.list li.list--link>a:hover,ul.list li.list--link>a:focus-visible,ul.list li.list--anchor>a:hover,ul.list li.list--anchor>a:focus-visible{text-decoration:underline;text-decoration-thickness:2px}ul.list li.list--link:before{content:"\\e004"}ul.list li.list--anchor:before{content:"\\e002"}ul.list li.single-line:not(:last-of-type){margin-bottom:6px}ol.list{counter-reset:mycounter;display:table}ol.list.single-line li:not(:last-of-type)::after{margin-bottom:6px}ol.list li{list-style:none;counter-increment:mycounter;display:table-row}ol.list li:not(:last-of-type)::after{margin-bottom:12px}ol.list li::before{content:counter(mycounter) ".";font-weight:600;display:table-cell;text-align:right;padding-right:8px}ol.list li::after{content:"";display:block}dt.list{font-weight:300}.sdx--dark-theme ul.list,.sdx--dark-theme ol.list{font-weight:500}.sdx--dark-theme ul.list li::before,.sdx--dark-theme ol.list li::before{color:#4294ff}ul.list.list--dark li::before,ul.list.list--white li::before,ol.list.list--dark li::before,ol.list.list--white li::before{color:#fff}a.link{color:#015;text-decoration:none;white-space:nowrap}a.link .icon{display:none}.container{display:flex}@media (min-width: 0){.container{margin-left:calc(24px - 6px);margin-right:calc(24px - 6px);padding-left:6px;padding-right:6px;width:auto}}@media (min-width: 1440px){.container{margin-left:auto;margin-right:auto;padding-left:12px;padding-right:12px;width:1380px}}.push-right{margin-right:auto}.pull-left{margin-left:-12px}.pull-right{margin-right:-12px}.icon-label-wrapper{position:relative;display:flex;align-items:center;gap:6px}.icon-label-wrapper:hover .badge{background:#ba3e06}.icon-label-wrapper .badge{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;border-radius:18px;color:#fff;font-size:13px;height:18px;line-height:18px;min-width:18px;max-width:50px;text-align:center;padding:0 5px;user-select:none;animation:badge 300ms linear both;background:#cf4a0c;pointer-events:none;transition:background 150ms cubic-bezier(0.4, 0, 0.6, 1);position:absolute;bottom:calc(100% - 13px);left:calc(100% - 9px)}@keyframes badge{0%{transform:scale(1)}25%{transform:scale(1.15)}50%{transform:scale(1)}75%{transform:scale(0.85)}100%{transform:scale(1)}}.ul{list-style-type:none;margin:0;padding:0;display:flex}.ul.main .icon.icon-214-present,.ul.main .icon.icon-present{display:block}.ul .item{display:flex}.ul .item.active>a.link:not(:hover):not(:focus-visible),.ul .item.active .toggle>a.link:not(:hover):not(:focus-visible){color:#086adb}.ul .item.active>a.link:not(:hover):not(:focus-visible).arrow::before,.ul .item.active>a.link:not(:hover):not(:focus-visible).arrow::after,.ul .item.active .toggle>a.link:not(:hover):not(:focus-visible).arrow::before,.ul .item.active .toggle>a.link:not(:hover):not(:focus-visible).arrow::after{background:#086adb}.ul .item sdx-header-menu .toggle>a.link:active::before,.ul .item sdx-header-menu .toggle>a.link:active::after,.ul .item sdx-header-menu .toggle>a.link:active .initials{background:#0048cf}@media (hover: hover){.ul .item sdx-header-menu .toggle>a.link:hover::before,.ul .item sdx-header-menu .toggle>a.link:hover::after,.ul .item sdx-header-menu .toggle>a.link:hover .initials,.ul .item sdx-header-menu .toggle>a.link:focus-visible::before,.ul .item sdx-header-menu .toggle>a.link:focus-visible::after,.ul .item sdx-header-menu .toggle>a.link:focus-visible .initials{background:#0048cf}}.ul .item sdx-header-menu .toggle>a.link .initials{transition:background 150ms cubic-bezier(0.4, 0, 0.2, 1);background:#015;height:24px;width:24px;border-radius:100%;color:#fff;font-size:12px;display:flex;justify-content:center;align-items:center}.ul .item a.link{display:flex;align-items:center}.ul.horizontal>.item{margin-left:12px;margin-right:12px}.ul.vertical{flex-flow:column}.ul.vertical a.link{flex-grow:1}.ul.vertical>.item:not(:first-of-type){margin-top:6px}.ul.vertical>.item:not(:last-of-type){margin-bottom:6px}.ul.secondary a.link .icon,.ul.slots a.link .icon,.ul.login a.link .icon,.ul.hamburger a.link .icon{display:block}.ul.secondary a.link:not(:hover):not(:focus-visible),.ul.tertiary a.link:not(:hover):not(:focus-visible){color:#333}.ul.secondary .toggle a.link:not(:hover):not(:focus-visible)::before,.ul.secondary .toggle a.link:not(:hover):not(:focus-visible)::after,.ul.tertiary .toggle a.link:not(:hover):not(:focus-visible)::before,.ul.tertiary .toggle a.link:not(:hover):not(:focus-visible)::after{background:#333}.ul.accordion:not(:last-of-type)::after{content:"";width:100%;height:1px;background:#d6d6d6;margin:16px 0}.ul.accordion.main,.ul.accordion.left-hand-menu{font-weight:600}.ul.accordion.main .item.leaf a.link,.ul.accordion.left-hand-menu .item.leaf a.link{font-weight:400}.ul.accordion.left-hand-menu a.link .icon{display:block}.ul.accordion sdx-accordion{width:100%}.ul.accordion sdx-accordion sdx-accordion-item-body>.ul{margin-top:12px}.ul.accordion sdx-accordion sdx-accordion-item-body>.ul>.item:last-of-type{margin-bottom:0}.component{font-weight:400;font-size:16px}.component.closing .wrapper,.component.closed .wrapper{background:rgba(255, 255, 255, 0.8)}.component .wrapper{display:flex;flex-direction:column;background:#fff;transition:background 150ms cubic-bezier(0.4, 0, 0.2, 1);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);position:relative}.component .wrapper.meta{z-index:50000}.component .wrapper.main{z-index:49999;top:0}.component .wrapper.main::before{content:"";position:absolute;bottom:0;right:0;left:0;height:1px;background:#dde3e7}.component .wrapper.breadcrumb-list{z-index:49998}.component .header .meta>.container{height:40px}.component .header .main>.container{height:72px}.component .header .main>.container>.ul.logo{width:18px;margin-right:16px}.component .header .main>.container>.ul.logo .img{background-size:3600px 40px;background-position:0 0;background-repeat:no-repeat;background-image:url("../images/lifeform-spritesheet.png");width:40px;height:40px;backface-visibility:hidden;min-width:40px;animation:repeatingAnimation 30s steps(90) infinite, initialAnimation 6s steps(90);transform:translateX(-18px)}@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx){.component .header .main>.container>.ul.logo .img{background-image:url("../images/lifeform-spritesheet@2x.png")}}@keyframes initialAnimation{100%{background-position:-3600px}}@keyframes repeatingAnimation{0%{background-position:0}80%{background-position:0}100%{background-position:-3600px}}.component .header .main>.container>.ul.main .toggle{font-weight:600;font-size:20px}.component .header .breadcrumb-list>.container{font-size:14px}.component .header .breadcrumb-list>.container .ul{height:48px}.component .header .breadcrumb-list>.container .item{margin:0}.component .header .breadcrumb-list>.container .item:first-of-type a.link .label{display:none}.component .header .breadcrumb-list>.container .item:first-of-type a.link .icon{display:block}.component .header .breadcrumb-list>.container .item:not(:first-of-type)::before{content:">";align-self:center;margin:0 8px}.component .header .slot-menu-header,.component .header .slot-menu-content{padding-left:16px;padding-right:16px}.component .header .slot-menu-header{padding-top:24px;padding-bottom:16px;display:flex;align-items:start}.component .header .slot-menu-header .title{flex:1;margin:0}.component .header .slot-menu-content{padding-top:16px;padding-bottom:24px}.component .header .slot-menu-content a.link:not(:hover):not(:focus-visible){color:#086adb}.component .header .slot-menu-content .list{margin:0}.component .header .icon-gateway::before{font-family:sdx-icons;content:"\\e0e5"}sdx-button{display:flex;align-items:center}.component.sdx--dark-theme a.link{color:#e6e6e6}.component.sdx--dark-theme a.link:active{color:#5ca3ff}@media (hover: hover){.component.sdx--dark-theme a.link:hover,.component.sdx--dark-theme a.link:focus-visible{color:#5ca3ff}}.component.sdx--dark-theme .ul.secondary a.link:not(:hover),.component.sdx--dark-theme .ul.tertiary a.link:not(:hover){color:#adadad}.component.sdx--dark-theme .ul.secondary .toggle a.link:not(:hover)::before,.component.sdx--dark-theme .ul.secondary .toggle a.link:not(:hover)::after,.component.sdx--dark-theme .ul.tertiary .toggle a.link:not(:hover)::before,.component.sdx--dark-theme .ul.tertiary .toggle a.link:not(:hover)::after{background:#adadad}.component.sdx--dark-theme .ul.accordion:not(:last-of-type)::after{background:#5c5c5c}.component.sdx--dark-theme .ul .item.active>a.link:not(:hover):not(:focus-visible),.component.sdx--dark-theme .ul .item.active .toggle>a.link:not(:hover):not(:focus-visible){color:#4294ff}.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:active::before,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:active::after,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:active .initials{background:#5ca3ff}@media (hover: hover){.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:hover::before,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:hover::after,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:hover .initials,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:focus-visible::before,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:focus-visible::after,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:focus-visible .initials{background:#5ca3ff}}.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link .initials{background:#5c5c5c}.component.sdx--dark-theme .wrapper{background:#1d1d1d}.component.sdx--dark-theme .wrapper.main{border-bottom-color:#707070}.component.sdx--dark-theme .wrapper.breadcrumb-list{background:#141414}.component.sdx--dark-theme .header .slot-menu-content a.link:not(:hover):not(:focus-visible){color:#4294ff}';
const Mt = Tt;
const Pt = class {
	navigationChanged() {
		this.setNavigationParsed(this.getParsedNavigationProp());
	}
	indexChanged() {
		this.indexParsed = s(this.index);
	}
	loginChanged() {
		this.loginParsed = s(this.login);
	}
	slotsChanged() {
		this.slotsParsed = s(this.slots) || [];
	}
	onKeyDown(e) {
		if (e.key === "Escape") {
			this.didClickOnAnotherSdxHeaderMenuEl = false;
		}
	}
	onWindowMouseup(e) {
		this.didClickOnAnotherSdxHeaderMenuEl = false;
		if (!this.openSdxHeaderMenuEl) {
			return;
		}
		const t = e.composedPath().find((e) => e instanceof HTMLElement && e.tagName === "SDX-HEADER-MENU");
		if (!t) {
			return;
		}
		if (!e.composedPath().includes(this.openSdxHeaderMenuEl)) {
			this.didClickOnAnotherSdxHeaderMenuEl = true;
		}
	}
	onWindowScroll() {
		if (!this.componentDidLoadComplete) {
			return;
		}
		this.makeHeaderSticky();
	}
	onWindowResizeDebounced() {
		const e = innerWidth !== this.innerWidth;
		if (!e) {
			return;
		}
		this.innerWidth = innerWidth;
		if (this.resizeTimer) {
			clearTimeout(this.resizeTimer);
		}
		this.resizeTimer = setTimeout(() => {
			this.layout();
		}, 10);
	}
	async openSlot(e) {
		const t = this.slotsWithSdxHeaderMenuEl.get(e);
		t === null || t === void 0 ? void 0 : t.open();
	}
	async closeSlot(e) {
		const t = this.slotsWithSdxHeaderMenuEl.get(e);
		t === null || t === void 0 ? void 0 : t.close();
	}
	async getNavigationHelpers() {
		return this.navigationHelpers;
	}
	constructor(e) {
		t(this, e);
		this.sdxnavigate = i(this, "sdxnavigate", 7);
		this.sdxslotdisplaychange = i(this, "sdxslotdisplaychange", 7);
		this.animationDuration = 200;
		this.didClickOnAnotherSdxHeaderMenuEl = false;
		this.display = "desktop";
		this.scrollbarWidth = d();
		this.innerWidth = innerWidth;
		this.slotLabelEls = [];
		this.pathLogo = "./assets/lifeform-spritesheet@2x.png";
		this.pathLogoPride = "./assets/lifeform-pride.png";
		this.componentDidLoadComplete = false;
		this.slotsWithSdxHeaderMenuEl = new Map();
		this.navigationHelpers = {
			setActive: (e, t = "main") => {
				if (!e) {
					return;
				}
				const i = xe(this.navigationParsed, (i) => {
					const { find: n } = this.navigationHelpers;
					const o = n({ active: true }, t, i);
					const a = n(e, t, i);
					if (a) {
						if (o) {
							delete o.active;
						}
						a.active = true;
					}
				});
				this.setNavigationParsed(i);
			},
			getParents: (e, t = "main", i = []) => {
				var n;
				if (!e) {
					return;
				}
				let o;
				let a = i[i.length - 1] || this.navigationParsed[t];
				if ((n = a.children) === null || n === void 0 ? void 0 : n.length) {
					for (const n of a.children) {
						o = this.navigationHelpers.getParents(e, t, [...i, n]);
						if (o) {
							break;
						}
					}
				} else {
					if (a === e) {
						return i.slice(0, i.length - 1);
					}
				}
				return o;
			},
			find: (e, t = "main", i = this.navigationParsed, n) => {
				var o;
				n = n || i[t];
				let a;
				const r = Object.keys(e);
				const l = r.every((t) => n[t] === e[t]);
				if (l) {
					return n;
				}
				if ((o = n.children) === null || o === void 0 ? void 0 : o.length) {
					for (const o of n.children) {
						a = this.navigationHelpers.find(e, t, i, o);
						if (a) {
							break;
						}
					}
				}
				return a;
			},
		};
		this.navigationParsed = undefined;
		this.navigation = {};
		this.index = { href: "/" };
		this.login = undefined;
		this.slots = undefined;
		this.animated = true;
		this.indexParsed = s(this.index);
		this.loginParsed = s(this.login);
		this.slotsParsed = s(this.slots) || [];
		this.setNavigationParsed(this.getParsedNavigationProp());
		Ot((e, t) => this.onExternalLinkClick(e, t));
	}
	componentDidLoad() {
		var e, t;
		this.layout();
		(e = this.slotsSdxScrollViewEl) === null || e === void 0 ? void 0 : e.scrollToLeft(0, false);
		(t = this.breadcrumbListSdxScrollViewEl) === null || t === void 0 ? void 0 : t.scrollToLeft(Infinity, false);
		this.componentDidLoadComplete = true;
	}
	componentDidUpdate() {
		this.layout();
	}
	headerMenuDisplayChangeCallback(e, t, i) {
		var n, o;
		const a = this.sdxBackdropEl;
		switch (t) {
			case "opening":
				h.set(a, this.getBackdropStyle(e.level));
				if (this.didClickOnAnotherSdxHeaderMenuEl) {
					c(this.openSdxHeaderMenuEl, e);
				}
				this.openSdxHeaderMenuEl = e;
				break;
			case "open":
				e.doFocus();
				break;
			case "closing":
				if (!this.didClickOnAnotherSdxHeaderMenuEl) {
					this.openSdxHeaderMenuEl = undefined;
				}
				break;
			case "closed":
				if (!this.didClickOnAnotherSdxHeaderMenuEl) {
					i === null || i === void 0 ? void 0 : i.focus();
				}
				break;
		}
		if (this.didClickOnAnotherSdxHeaderMenuEl) {
			return;
		}
		const r = new Set(["open", "opening", "closed", "closing"]);
		(n = this.componentEl) === null || n === void 0 ? void 0 : n.classList.remove(...r);
		(o = this.componentEl) === null || o === void 0 ? void 0 : o.classList.add(t);
		if (t === "opening") {
			u();
			f(a, document.body, e);
			h.set(a, { display: "block" });
			h.start({
				targets: a,
				duration: this.animated ? this.animationDuration : 0,
				backdropFilter: ["blur(0px) brightness(100%)", "blur(4px) brightness(50%)"],
				"-webkit-backdrop-filter": ["blur(0px) brightness(100%)", "blur(4px) brightness(50%)"],
			});
		} else if (t === "closing") {
			m();
			h.start({
				targets: a,
				duration: this.animated ? this.animationDuration : 0,
				backdropFilter: "blur(0px) brightness(100%)",
				"-webkit-backdrop-filter": "blur(0px) brightness(100%)",
				complete: () => {
					f(a, this.el, e);
					h.set(a, { display: "none" });
				},
			});
		}
	}
	getParsedNavigationProp() {
		const e = s(this.navigation) || {};
		return {
			primary: { children: [] },
			secondary: { children: [] },
			tertiary: { children: [] },
			main: { children: [] },
			...e,
		};
	}
	setNavigationParsed(e) {
		this.navigationParsed = e;
		const t = this.navigationHelpers;
		const i = (e) => {
			var t;
			return e.label || ((t = e.children) === null || t === void 0 ? void 0 : t.length);
		};
		this.allVisibleMetaItems = _t([
			...p(this.navigationParsed.primary, "children"),
			...p(this.navigationParsed.secondary, "children"),
			...p(this.navigationParsed.tertiary, "children"),
		]).filter(i);
		this.allVisibleItems = _t([...p(this.navigationParsed.main, "children")])
			.filter(i)
			.concat(this.allVisibleMetaItems);
		this.breadcrumbList = [];
		this.activeItems = [];
		const n = t.find({ active: true });
		const o = t.find({ active: true }, "primary");
		if (n) {
			this.activeItems = [...(t.getParents(n) || []), n];
		}
		this.breadcrumbList = [{ ...this.indexParsed, iconName: "icon-home" }, ...this.activeItems];
		if (o) {
			this.activeItems = [...this.activeItems, ...(t.getParents(o, "primary") || []), o];
		}
		this.maxDepth = this.getMaxDepth(this.navigationParsed.main);
		this.createBreadcrumbListScriptEl();
	}
	onExternalLinkClick(e, t) {
		var i;
		if (e.ctrlKey || e.metaKey || e.shiftKey) {
			return;
		}
		(i = this.openSdxHeaderMenuEl) === null || i === void 0 ? void 0 : i.close();
		const n = this.sdxnavigate.emit({ item: t });
		if (n.defaultPrevented) {
			e.preventDefault();
		}
	}
	createBreadcrumbListScriptEl() {
		var e;
		(e = this.breadcrumbListScriptEl) === null || e === void 0 ? void 0 : e.remove();
		if (!this.hasBreadcrumbs()) {
			return;
		}
		this.breadcrumbListScriptEl = document.createElement("script");
		this.breadcrumbListScriptEl.type = "application/ld+json";
		this.breadcrumbListScriptEl.innerHTML = JSON.stringify(this.createBreadcrumbListSchema());
		this.el.after(this.breadcrumbListScriptEl);
	}
	createListForDesktop(t, i, n) {
		const o = _t(this.navigationParsed[t].children);
		if (!o.length) {
			return;
		}
		return e(
			"ul",
			{ class: { [t]: true, "ul horizontal": true }, role: "navigation", "aria-label": t, ref: i },
			n ? n : o.map((e) => this.createItemForMeta(e)),
		);
	}
	createListForMobile(t, i) {
		const n = _t(this.navigationParsed[t].children);
		if (!n.length) {
			return;
		}
		return e(
			"ul",
			{ class: { [t]: true, "ul vertical accordion": true }, role: "navigation", "aria-label": t },
			n.map((e) =>
				Nt(e, this.activeItems, "right", { ...(i ? { arrow: { background: i } } : undefined) }, false, this.maxDepth),
			),
		);
	}
	getMaxDepth(e, t = [], i = []) {
		var n;
		if ((n = e.children) === null || n === void 0 ? void 0 : n.length) {
			e.children.forEach((e) => {
				if (e.hidden) {
					i.push(t);
				} else {
					this.getMaxDepth(e, [...t, e], i);
				}
			});
		} else {
			i.push(t);
		}
		return Math.max(...i.map((e) => e.length));
	}
	createBreadcrumbListSchema() {
		return {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: this.breadcrumbList
				.filter((e) => e.href || e.active)
				.map((e, t) => ({ "@type": "ListItem", position: t + 1, name: e.label, item: e.active ? undefined : e.href })),
		};
	}
	getMetaHeight() {
		var e;
		return ((e = this.metaWrapperEl) === null || e === void 0 ? void 0 : e.clientHeight) || 0;
	}
	hasBreadcrumbs() {
		return this.breadcrumbList.length > 1;
	}
	hasLeftHandMenu() {
		const e = document.getElementById("sdx-left-hand-menu-outlet");
		return !!(this.getLeftHandMenuItems().length && e);
	}
	getLeftHandMenuItems() {
		var e;
		const t = this.breadcrumbList.findIndex((e) => e.hasLeftHandMenu);
		return ((e = this.breadcrumbList[t]) === null || e === void 0 ? void 0 : e.children) || [];
	}
	getBackdropStyle(e) {
		const t = 5e4 - 3;
		switch (e) {
			case "meta":
				const e = this.metaWrapperEl.getBoundingClientRect().bottom;
				return { top: `${e}px`, zIndex: `${t + 2}` };
			case "main":
				const i = this.mainWrapperEl.getBoundingClientRect().bottom;
				return { top: `${i}px`, zIndex: `${t + 1}` };
			default:
				return { top: "0", zIndex: `${t}` };
		}
	}
	layout() {
		this.componentEl.classList.remove("desktop");
		this.componentEl.classList.remove("mobile");
		this.componentEl.classList.add("desktop");
		this.componentEl.style.display = "block";
		if (this.metaWrapperEl) {
			this.metaWrapperEl.style.display = "flex";
		}
		if (this.hamburgerEl) {
			this.hamburgerEl.style.display = "none";
		}
		if (this.mainListEl) {
			this.mainListEl.style.display = "flex";
		}
		this.showSecondaryIfEnoughSpace();
		this.showSlotLabelsIfEnoughSpace();
		this.setDisplayToDesktopOrMobile();
		this.makeHeaderSticky();
		this.hidePartsOnMobile();
		const e = this.hasBreadcrumbs() ? "-with-breadcrumbs" : "";
		const t = this.display === "desktop" && this.getMetaHeight() === 0 ? "-without-meta" : "";
		this.el.style.height = `var(--sdx-header-height-${this.display}${e}${t})`;
		if (this.leftHandMenuEl) {
			const e = document.getElementById("sdx-left-hand-menu-outlet");
			if (e) {
				e.style.display = "block";
				e.append(this.leftHandMenuEl);
			}
		}
	}
	showSecondaryIfEnoughSpace() {
		if (this.secondaryEl) {
			this.secondaryEl.style.display = "none";
		}
		if (this.secondaryListEl) {
			this.secondaryListEl.style.display = "flex";
		}
		const e =
			x(this.metaContainerEl) -
			x(this.metaPullLeftEl, true) -
			x(this.primaryListEl, true) -
			x(this.tertiaryListEl, true) -
			x(this.metaPullRightEl, true);
		if (x(this.secondaryListEl, true) > e) {
			if (this.secondaryEl) {
				this.secondaryEl.style.display = "flex";
			}
			if (this.secondaryListEl) {
				this.secondaryListEl.style.display = "none";
			}
		}
	}
	showSlotLabelsIfEnoughSpace() {
		this.slotLabelEls.forEach((e) => (e.style.display = "block"));
		const e =
			x(this.mainContainerEl) -
			x(this.swisscomLogoEl, true) -
			x(this.mainListEl, true) -
			x(this.slotsEl, true) -
			x(this.loginEl, true) -
			x(this.mainPullRightEl, true);
		if (e < 0) {
			this.slotLabelEls.forEach((e) => (e.style.display = "none"));
		}
	}
	setDisplayToDesktopOrMobile() {
		const e =
			x(this.metaPullLeftEl, true) +
			x(this.primaryListEl, true) +
			x(this.secondaryListEl, true) +
			x(this.secondaryEl, true) +
			x(this.tertiaryListEl, true) +
			x(this.metaPullRightEl, true);
		const t =
			x(this.swisscomLogoEl, true) +
			x(this.mainListEl, true) +
			x(this.slotsEl, true) +
			x(this.loginEl, true) +
			x(this.mainPullRightEl, true);
		const i = x(this.metaContainerEl) >= e;
		const n = x(this.mainContainerEl) >= t;
		this.display = i && n && y("lg") ? "desktop" : "mobile";
	}
	makeHeaderSticky() {
		const e = this.getMetaHeight();
		const t = scrollY < e;
		this.mainWrapperEl.style.width = "";
		if (t) {
			this.mainWrapperEl.style.position = "sticky";
			this.breadcrumbListWrapperEl.style.top = "";
		} else {
			this.mainWrapperEl.style.position = "fixed";
			this.breadcrumbListWrapperEl.style.top = "72px";
			this.mainWrapperEl.style.width = `calc(100vw - ${this.scrollbarWidth}px)`;
		}
	}
	hidePartsOnMobile() {
		if (this.display === "desktop") {
			return;
		}
		this.componentEl.classList.remove("desktop");
		this.componentEl.classList.add("mobile");
		this.slotLabelEls.forEach((e) => (e.style.display = "none"));
		if (this.metaWrapperEl) {
			this.metaWrapperEl.style.display = "none";
		}
		if (this.hamburgerEl) {
			this.hamburgerEl.style.display = "flex";
		}
		if (this.mainListEl) {
			this.mainListEl.style.display = "none";
		}
	}
	createItemForMeta(t) {
		const i = _t(t.children);
		let n;
		return e(
			"li",
			{ class: Lt(t, this.activeItems) },
			e(
				"sdx-header-menu",
				{
					level: "meta",
					animated: this.animated,
					displayChangeCallback: (e, t) => this.headerMenuDisplayChangeCallback(e, t, n),
				},
				Dt(t, { href: t.href || "javascript:;", slot: "toggle", ref: (e) => (n = e) }),
				!!i.length &&
					e(
						"div",
						{ slot: "content" },
						e(
							"ul",
							{ class: "ul vertical" },
							i.map((t) => e("li", { class: Lt(t, this.activeItems) }, Dt(t))),
						),
					),
			),
		);
	}
	createItemForMain(t) {
		const i = _t(t.children);
		const n = Et(t);
		let o;
		return e(
			"li",
			{ class: Lt(t, this.activeItems) },
			e(
				"sdx-header-menu",
				{
					level: "main",
					layout: "fixed-left",
					animated: this.animated,
					displayChangeCallback: (e, t) => this.headerMenuDisplayChangeCallback(e, t, o),
				},
				Dt(t, { href: n ? t.href : "javascript:;", slot: "toggle", ref: (e) => (o = e) }),
				!n &&
					e(
						"ul",
						{ class: "ul vertical accordion main", slot: "content" },
						i.map((e) =>
							Nt(
								e,
								this.activeItems,
								"right",
								k(this.el) === "sdx--light-theme" ? {} : { arrow: { background: "#e6e6e6" } },
								true,
								2,
							),
						),
					),
			),
		);
	}
	createItemForSlot(t, i, n) {
		let o;
		return e(
			"li",
			{ class: "item" },
			e(
				"sdx-header-menu",
				{
					level: "main",
					layout: "fixed-right",
					class: "slot",
					animated: this.animated,
					width: t.menuWidth,
					scrollable: t.scrollable,
					displayChangeCallback: (e, t) => {
						this.headerMenuDisplayChangeCallback(e, t, o);
					},
					displayChangeByUserInteractionCallback: (e) => {
						this.sdxslotdisplaychange.emit({ slot: t, display: e });
					},
					ref: (e) => this.slotsWithSdxHeaderMenuEl.set(t.slot, e),
				},
				Dt({ ...t, iconSize: 2 }, { slot: "toggle", href: t.href || "javascript:;", ref: (e) => (o = e) }, i, (e) => {
					if (e) {
						this.slotLabelEls.push(e);
					}
				}),
				(t.slot || n) &&
					e(
						"div",
						{ slot: "content" },
						e(
							"div",
							{ class: "slot-menu-header" },
							e("div", { class: "h5 title" }, t.label),
							e("sdx-button", {
								theme: "transparent",
								iconName: "icon-close",
								iconSize: 2,
								onClick: () => {
									this.slotsWithSdxHeaderMenuEl.get(t.slot).toggle();
								},
							}),
						),
						t.slot && e("slot", { name: t.slot }),
						n && e("div", { class: "slot-menu-content" }, n),
					),
			),
		);
	}
	createInitials(e) {
		if (!e) {
			return "";
		}
		return e
			.split(/\s+/)
			.filter(Boolean)
			.map((e) => e[0].toLocaleUpperCase())
			.join("");
	}
	getComponentClassNames() {
		return { component: true, closed: true, [k(this.el)]: true };
	}
	render() {
		var t, i, a, r;
		const { secondary: l, main: s } = this.navigationParsed;
		this.slotsWithSdxHeaderMenuEl.clear();
		this.slotLabelEls = [];
		const d =
			this.createInitials(
				(i = (t = this.loginParsed) === null || t === void 0 ? void 0 : t.customer) === null || i === void 0
					? void 0
					: i.fullName,
			) || ((a = this.loginParsed) === null || a === void 0 ? void 0 : a.initials);
		const h = !!d;
		let c;
		return e(
			o,
			null,
			e(
				"div",
				{ class: this.getComponentClassNames(), ref: (e) => (this.componentEl = e), style: { display: "none" } },
				e(
					"div",
					{ class: "header" },
					this.allVisibleMetaItems.length > 0 &&
						e(
							"div",
							{ class: "wrapper meta", key: "meta", ref: (e) => (this.metaWrapperEl = e) },
							e(
								"div",
								{ class: "container", ref: (e) => (this.metaContainerEl = e) },
								e("div", { class: "pull-left", ref: (e) => (this.metaPullLeftEl = e) }),
								this.createListForDesktop("primary", (e) => (this.primaryListEl = e)),
								e("div", { class: "push-right" }),
								this.createListForDesktop("secondary", (e) => (this.secondaryEl = e), this.createItemForMeta(l)),
								this.createListForDesktop("secondary", (e) => (this.secondaryListEl = e)),
								this.createListForDesktop("tertiary", (e) => (this.tertiaryListEl = e)),
								e("div", { class: "pull-right", ref: (e) => (this.metaPullRightEl = e) }),
							),
						),
					e(
						"div",
						{ class: "wrapper main", ref: (e) => (this.mainWrapperEl = e) },
						e(
							"div",
							{ class: "container", ref: (e) => (this.mainContainerEl = e) },
							e(
								"ul",
								{ class: "ul logo", ref: (e) => (this.swisscomLogoEl = e) },
								e(
									"li",
									{ class: "item" },
									Dt(
										{ ...this.indexParsed, ariaLabel: "swisscom home" },
										undefined,
										e("span", {
											class: "img",
											style: {
												backgroundImage: `url(${n(new Date().getMonth() === 5 ? this.pathLogoPride : this.pathLogo)})`,
											},
										}),
									),
								),
							),
							this.createListForDesktop(
								"main",
								(e) => (this.mainListEl = e),
								_t(s.children).map((e) => this.createItemForMain(e)),
							),
							e("div", { class: "push-right" }),
							!!this.slotsParsed.length &&
								e(
									"sdx-scroll-view",
									{ ref: (e) => (this.slotsSdxScrollViewEl = e) },
									e(
										"ul",
										{ class: "ul horizontal slots", ref: (e) => (this.slotsEl = e) },
										!!this.slotsParsed.length && this.slotsParsed.map((e) => this.createItemForSlot(e)),
									),
								),
							!!this.loginParsed &&
								e(
									"ul",
									{ class: "ul horizontal login", ref: (e) => (this.loginEl = e) },
									this.createItemForSlot(
										{
											...this.loginParsed,
											label: h
												? `${g("Hello", this.el.lang)} ${
														(r = this.loginParsed.customer) === null || r === void 0 ? void 0 : r.fullName
												  }`
												: g("Login", this.el.lang),
											iconName: "icon-account",
											showLabelOnDesktop: true,
										},
										h ? e("span", { class: "initials" }, d) : undefined,
										h &&
											!!this.loginParsed.logout &&
											e(
												"ul",
												{ class: "list single-line" },
												e(
													"li",
													{ class: "icon-gateway" },
													Dt({ ...this.loginParsed.logout, label: g("Logout", this.el.lang) }),
												),
											),
									),
								),
							this.allVisibleItems.length > 0 &&
								e(
									"ul",
									{ class: "ul horizontal hamburger", key: "hamburger", ref: (e) => (this.hamburgerEl = e) },
									e(
										"li",
										{ class: "item" },
										e(
											"sdx-header-menu",
											{
												level: "main",
												layout: "fixed-right",
												animated: this.animated,
												displayChangeCallback: (e, t) => this.headerMenuDisplayChangeCallback(e, t, c),
											},
											Dt(
												{ iconName: "icon-menu", iconSize: 3, ariaLabel: "open the menu", ariaExpanded: "false" },
												{ href: "javascript:;", slot: "toggle", ref: (e) => (c = e) },
											),
											e(
												"div",
												{ slot: "content" },
												this.createListForMobile("main", k(this.el) === "sdx--light-theme" ? undefined : "#e6e6e6"),
												this.createListForMobile("primary", k(this.el) === "sdx--light-theme" ? undefined : "#e6e6e6"),
												this.createListForMobile("secondary", k(this.el) === "sdx--light-theme" ? "#666" : "#adadad"),
												this.createListForMobile("tertiary", k(this.el) === "sdx--light-theme" ? "#666" : "#adadad"),
											),
										),
									),
								),
							e("div", { class: "pull-right", ref: (e) => (this.mainPullRightEl = e) }),
						),
					),
					e(
						"div",
						{ class: "wrapper breadcrumb-list", ref: (e) => (this.breadcrumbListWrapperEl = e) },
						this.hasBreadcrumbs() &&
							e(
								"nav",
								{ class: "container", "aria-label": "breadcrumb" },
								e(
									"sdx-scroll-view",
									{ arrowsHidden: true, ref: (e) => (this.breadcrumbListSdxScrollViewEl = e) },
									e(
										"ul",
										{ class: "ul horizontal" },
										this.breadcrumbList.map((t, i) =>
											e(
												"li",
												{ class: "item" },
												Dt({ ...t, href: i === this.breadcrumbList.length - 1 ? undefined : t.href }),
											),
										),
									),
								),
							),
					),
				),
			),
			this.hasLeftHandMenu() &&
				e("sdx-header-left-hand-menu", {
					items: this.getLeftHandMenuItems(),
					activeItems: this.activeItems,
					ref: (e) => (this.leftHandMenuEl = e),
				}),
			e("sdx-backdrop", { ref: (e) => (this.sdxBackdropEl = e) }),
		);
	}
	static get assetsDirs() {
		return ["assets"];
	}
	get el() {
		return a(this);
	}
	static get watchers() {
		return {
			navigation: ["navigationChanged"],
			index: ["indexChanged"],
			login: ["loginChanged"],
			slots: ["slotsChanged"],
		};
	}
};
Pt.style = Mt;
const Ut =
	'@charset "UTF-8";:host,*,*:before,*:after{box-sizing:border-box}.text-body-1,.text-standard{line-height:24px;letter-spacing:-0.1px;font-size:18px}.text-body-2,.text-small{line-height:21px;letter-spacing:0;font-size:16px}h1,h2,h3,h4,h5,h6,p{margin:0;text-align:left;word-wrap:break-word}.h1,.h2,.h3,.h4,.h5,.h6,.hero,.d1,.d2,.d3{color:#015}.h1,.text-h1,h1{line-height:40px;letter-spacing:-1px;font-size:32px;font-weight:700;margin-bottom:24px}@media (min-width: 1024px){.h1,.text-h1,h1{line-height:48px;letter-spacing:-1.2px;font-size:40px}}@media (min-width: 1024px){.h1,.text-h1,h1{margin-bottom:32px}}.h2,.text-h2,h2{line-height:32px;letter-spacing:-0.75px;font-size:28px;font-weight:700;margin-bottom:20px}@media (min-width: 1024px){.h2,.text-h2,h2{line-height:40px;letter-spacing:-1px;font-size:32px}}@media (min-width: 1024px){.h2,.text-h2,h2{margin-bottom:24px}}.h3,.h4,.text-h3,.text-h4,h3,h4{margin-bottom:16px}@media (min-width: 1024px){.h3,.h4,.text-h3,.text-h4,h3,h4{margin-bottom:20px}}.h3,.text-h3,h3{line-height:32px;letter-spacing:-0.35px;font-size:24px;font-weight:600}@media (min-width: 1024px){.h3,.text-h3,h3{line-height:32px;letter-spacing:-0.75px;font-size:28px}}.h4,.text-h4,h4{line-height:24px;letter-spacing:-0.1px;font-size:20px;font-weight:600}@media (min-width: 1024px){.h4,.text-h4,h4{line-height:32px;letter-spacing:-0.35px;font-size:24px}}.text-h3.text-compact{line-height:31px}.text-h4.text-compact{line-height:27px}.h5,.h6,.text-h5,.text-h6,h5,h6{margin-bottom:8px}.h5,.text-h5,h5{line-height:24px;letter-spacing:-0.1px;font-size:18px;font-weight:600}.h6,.text-h6,h6{line-height:24px;letter-spacing:-0.1px;font-size:16px;font-weight:600}.paragraph,p{line-height:24px;letter-spacing:-0.1px;font-size:18px;margin-bottom:20px}@media (min-width: 1024px){.paragraph,p{margin-bottom:24px}}.paragraph:last-child,p:last-child{margin-bottom:0}.hero,.text-hero,.d1,.text-d1,.d2,.text-d2,.d3,.text-d3{font-weight:700}.hero,.text-hero{line-height:80px;letter-spacing:-1.75px;font-size:70px}@media (min-width: 1024px){.hero,.text-hero{line-height:104px;letter-spacing:-2px;font-size:96px}}.d1,.text-d1{line-height:64px;letter-spacing:-1.35px;font-size:54px}@media (min-width: 1024px){.d1,.text-d1{line-height:80px;letter-spacing:-1.75px;font-size:70px}}.d2,.text-d2{line-height:56px;letter-spacing:-1.2px;font-size:48px}@media (min-width: 1024px){.d2,.text-d2{line-height:64px;letter-spacing:-1.35px;font-size:54px}}.d3,.text-d3{line-height:48px;letter-spacing:-1.2px;font-size:40px}@media (min-width: 1024px){.d3,.text-d3{line-height:56px;letter-spacing:-1.2px;font-size:48px}}.text-b1{line-height:24px;letter-spacing:-0.1px;font-size:18px;font-weight:400}.text-b2{line-height:21px;letter-spacing:0;font-size:16px;font-weight:400}.text-sm,.text-smaller{line-height:18px;letter-spacing:0.1px;font-size:14px;font-weight:400}.text-compact{line-height:21px}.figcaption{line-height:18px;letter-spacing:0.1px;font-size:14px}.code{font-family:monospace;background-color:#f8fafb;border-radius:4px;border:1px solid #d6d6d6;color:#474747;font-size:16px;padding:0 6px}address{font-style:normal}strong{font-weight:600}em{font-style:italic}.font{font-family:TheSans, sans-serif}.font--sans{font-family:TheSans, sans-serif}.font--serif{font-family:TheSerif, serif}.font--light{font-weight:300}.font--semi-light{font-weight:400}.font--semi-bold{font-weight:600}.sdx--dark-theme .h1,.sdx--dark-theme .h2,.sdx--dark-theme .h3,.sdx--dark-theme .h4,.sdx--dark-theme .h5,.sdx--dark-theme .h6,.sdx--dark-theme .hero,.sdx--dark-theme .d1,.sdx--dark-theme .d2,.sdx--dark-theme .d3{color:unset}.sdx--dark-theme .h1,.sdx--dark-theme .text-h1,.sdx--dark-theme h1,.sdx--dark-theme .h2,.sdx--dark-theme .text-h2,.sdx--dark-theme h2,.sdx--dark-theme .h3,.sdx--dark-theme .text-h3,.sdx--dark-theme h3,.sdx--dark-theme .h4,.sdx--dark-theme .text-h4,.sdx--dark-theme h4,.sdx--dark-theme .d1,.sdx--dark-theme .text-d1,.sdx--dark-theme .d2,.sdx--dark-theme .text-d2,.sdx--dark-theme .d3,.sdx--dark-theme .text-d3{font-weight:600}.sdx--dark-theme .p,.sdx--dark-theme .paragraph,.sdx--dark-theme p{font-weight:500}.sdx--dark-theme .h1,.sdx--dark-theme .text-h1,.sdx--dark-theme h1{letter-spacing:-0.8px}.sdx--dark-theme .h2,.sdx--dark-theme .text-h2,.sdx--dark-theme h2{letter-spacing:-0.6px}.sdx--dark-theme .h3,.sdx--dark-theme .text-h3,.sdx--dark-theme h3{letter-spacing:-0.5px}.sdx--dark-theme .h4,.sdx--dark-theme .text-h4,.sdx--dark-theme h4{letter-spacing:-0.2px}.sdx--dark-theme .h5,.sdx--dark-theme .text-h5,.sdx--dark-theme h5{letter-spacing:-0.1px}.sdx--dark-theme .h6,.sdx--dark-theme .text-h6,.sdx--dark-theme h6{letter-spacing:0px}.sdx--dark-theme .d1,.sdx--dark-theme .text-d1{letter-spacing:-1.4px}.sdx--dark-theme .d2,.sdx--dark-theme .text-d2{letter-spacing:-1px}.sdx--dark-theme .d3,.sdx--dark-theme .text-d3{letter-spacing:-0.9px}.sdx--dark-theme .code{background-color:#242424;border:1px solid #b1b9be;border-radius:4px;color:#cfd5d9;font-size:16px}.sdx--dark-theme strong,.sdx--dark-theme b{color:#fff}a,a.link,button.link{position:relative;transition:color 200ms cubic-bezier(0.4, 0, 0.6, 1), text-decoration-color 200ms cubic-bezier(0.4, 0, 0.6, 1);outline:none;text-decoration:underline;text-underline-offset:5px;color:#086adb}a:where(:any-link,button):active,a.link:where(:any-link,button):active,button.link:where(:any-link,button):active{text-decoration-thickness:2px;color:#0048cf;text-decoration-color:#0048cf}@media (hover: hover){a:where(:any-link,button):hover,a:where(:any-link,button):focus-visible,a.link:where(:any-link,button):hover,a.link:where(:any-link,button):focus-visible,button.link:where(:any-link,button):hover,button.link:where(:any-link,button):focus-visible{text-decoration-thickness:2px;color:#0048cf;text-decoration-color:#0048cf}}a:focus,a.link:focus,button.link:focus{outline:none}a+a,a+a.link,a+button.link,a.link+a,a.link+a.link,a.link+button.link,button.link+a,button.link+a.link,button.link+button.link{margin-left:24px}a[class*=icon-],a.link--standalone,a.link--anchor,a.link[class*=icon-],a.link.link--standalone,a.link.link--anchor,button.link[class*=icon-],button.link.link--standalone,button.link.link--anchor{display:inline-block;margin-left:24px;text-decoration-color:transparent}a[class*=icon-]:active,a.link--standalone:active,a.link--anchor:active,a.link[class*=icon-]:active,a.link.link--standalone:active,a.link.link--anchor:active,button.link[class*=icon-]:active,button.link.link--standalone:active,button.link.link--anchor:active{text-decoration-color:unset}@media (hover: hover){a[class*=icon-]:hover,a[class*=icon-]:focus-visible,a.link--standalone:hover,a.link--standalone:focus-visible,a.link--anchor:hover,a.link--anchor:focus-visible,a.link[class*=icon-]:hover,a.link[class*=icon-]:focus-visible,a.link.link--standalone:hover,a.link.link--standalone:focus-visible,a.link.link--anchor:hover,a.link.link--anchor:focus-visible,button.link[class*=icon-]:hover,button.link[class*=icon-]:focus-visible,button.link.link--standalone:hover,button.link.link--standalone:focus-visible,button.link.link--anchor:hover,button.link.link--anchor:focus-visible{text-decoration-color:unset}}a[class*=icon-]::before,a.link--standalone::before,a.link--anchor::before,a.link[class*=icon-]::before,a.link.link--standalone::before,a.link.link--anchor::before,button.link[class*=icon-]::before,button.link.link--standalone::before,button.link.link--anchor::before{margin-left:-24px;display:inline-block;font-family:sdx-icons;padding-right:6px;position:relative}a.link--standalone::before,a.link.link--standalone::before,button.link.link--standalone::before{content:"\\e004"}a.link--anchor::before,a.link.link--anchor::before,button.link.link--anchor::before{content:"\\e002"}a:not(:any-link){text-decoration:none}p a+a,p a+a.link,p a+button.link,p a.link+a,p a.link+a.link,p a.link+button.link,p button.link+a,p button.link+a.link,p button.link+button.link,.list a+a,.list a+a.link,.list a+button.link,.list a.link+a,.list a.link+a.link,.list a.link+button.link,.list button.link+a,.list button.link+a.link,.list button.link+button.link{margin-left:0}.sdx--dark-theme a,.sdx--dark-theme a.link,.sdx--dark-theme button.link{color:#4294ff}.sdx--dark-theme a:active,.sdx--dark-theme a.link:active,.sdx--dark-theme button.link:active{color:#5ca3ff;text-decoration-color:#5ca3ff}@media (hover: hover){.sdx--dark-theme a:hover,.sdx--dark-theme a:focus-visible,.sdx--dark-theme a.link:hover,.sdx--dark-theme a.link:focus-visible,.sdx--dark-theme button.link:hover,.sdx--dark-theme button.link:focus-visible{color:#5ca3ff;text-decoration-color:#5ca3ff}}.bg--dark a,.bg--dark a.link,.bg--dark button.link,a.link.link--dark,a.link.link--white,button.link.link--dark,a.link--dark,a.link--white,button.link--dark,button.link--white{color:#fff}.bg--dark a:active,.bg--dark a.link:active,.bg--dark button.link:active,a.link.link--dark:active,a.link.link--white:active,button.link.link--dark:active,a.link--dark:active,a.link--white:active,button.link--dark:active,button.link--white:active{color:#fff;text-decoration-color:#fff}@media (hover: hover){.bg--dark a:hover,.bg--dark a:focus-visible,.bg--dark a.link:hover,.bg--dark a.link:focus-visible,.bg--dark button.link:hover,.bg--dark button.link:focus-visible,a.link.link--dark:hover,a.link.link--dark:focus-visible,a.link.link--white:hover,a.link.link--white:focus-visible,button.link.link--dark:hover,button.link.link--dark:focus-visible,a.link--dark:hover,a.link--dark:focus-visible,a.link--white:hover,a.link--white:focus-visible,button.link--dark:hover,button.link--dark:focus-visible,button.link--white:hover,button.link--white:focus-visible{color:#fff;text-decoration-color:#fff}}ul,menu,dir{display:block;padding:0}ul,ol{margin:0;padding:0;list-style:none}ul.list,ol.list{margin-top:16px;margin-bottom:16px}@media (min-width: 1024px){ul.list,ol.list{margin-top:24px;margin-bottom:24px}}ul.list ul.list,ul.list ol.list,ol.list ul.list,ol.list ol.list{margin-top:8px;margin-bottom:8px}@media (min-width: 1024px){ul.list ul.list,ul.list ol.list,ol.list ul.list,ol.list ol.list{margin-top:16px;margin-bottom:16px}}ul.list li::before,ol.list li::before{color:#086adb}ul.list.single-line li:not(:last-of-type){margin-bottom:6px}ul.list li{margin-left:18px}ul.list li:not(:last-of-type){margin-bottom:12px}ul.list li::before{float:left;margin-left:-18px;font-size:33px}ul.list li:not([class*=icon-])::before{content:"•"}ul.list li[class*=icon-],ul.list li.list--link,ul.list li.list--anchor{margin-left:24px}ul.list li[class*=icon-]::before,ul.list li.list--link::before,ul.list li.list--anchor::before{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;display:inline-block;text-transform:none;text-decoration:none;text-rendering:auto;line-height:1;font-family:"sdx-icons";font-size:inherit;font-weight:normal;font-style:normal;font-variant:normal;font-variant-ligatures:normal;font-variant-caps:normal;font-variant-numeric:normal;font-stretch:normal;position:relative;top:3px;margin-left:-24px}ul.list li[class*=icon-]>a,ul.list li.list--link>a,ul.list li.list--anchor>a{text-decoration:none}ul.list li[class*=icon-]>a:hover,ul.list li[class*=icon-]>a:focus-visible,ul.list li.list--link>a:hover,ul.list li.list--link>a:focus-visible,ul.list li.list--anchor>a:hover,ul.list li.list--anchor>a:focus-visible{text-decoration:underline;text-decoration-thickness:2px}ul.list li.list--link:before{content:"\\e004"}ul.list li.list--anchor:before{content:"\\e002"}ul.list li.single-line:not(:last-of-type){margin-bottom:6px}ol.list{counter-reset:mycounter;display:table}ol.list.single-line li:not(:last-of-type)::after{margin-bottom:6px}ol.list li{list-style:none;counter-increment:mycounter;display:table-row}ol.list li:not(:last-of-type)::after{margin-bottom:12px}ol.list li::before{content:counter(mycounter) ".";font-weight:600;display:table-cell;text-align:right;padding-right:8px}ol.list li::after{content:"";display:block}dt.list{font-weight:300}.sdx--dark-theme ul.list,.sdx--dark-theme ol.list{font-weight:500}.sdx--dark-theme ul.list li::before,.sdx--dark-theme ol.list li::before{color:#4294ff}ul.list.list--dark li::before,ul.list.list--white li::before,ol.list.list--dark li::before,ol.list.list--white li::before{color:#fff}a.link{color:#015;text-decoration:none;white-space:nowrap}a.link .icon{display:none}.container{display:flex}@media (min-width: 0){.container{margin-left:calc(24px - 6px);margin-right:calc(24px - 6px);padding-left:6px;padding-right:6px;width:auto}}@media (min-width: 1440px){.container{margin-left:auto;margin-right:auto;padding-left:12px;padding-right:12px;width:1380px}}.push-right{margin-right:auto}.pull-left{margin-left:-12px}.pull-right{margin-right:-12px}.icon-label-wrapper{position:relative;display:flex;align-items:center;gap:6px}.icon-label-wrapper:hover .badge{background:#ba3e06}.icon-label-wrapper .badge{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-weight:600;border-radius:18px;color:#fff;font-size:13px;height:18px;line-height:18px;min-width:18px;max-width:50px;text-align:center;padding:0 5px;user-select:none;animation:badge 300ms linear both;background:#cf4a0c;pointer-events:none;transition:background 150ms cubic-bezier(0.4, 0, 0.6, 1);position:absolute;bottom:calc(100% - 13px);left:calc(100% - 9px)}@keyframes badge{0%{transform:scale(1)}25%{transform:scale(1.15)}50%{transform:scale(1)}75%{transform:scale(0.85)}100%{transform:scale(1)}}.ul{list-style-type:none;margin:0;padding:0;display:flex}.ul.main .icon.icon-214-present,.ul.main .icon.icon-present{display:block}.ul .item{display:flex}.ul .item.active>a.link:not(:hover):not(:focus-visible),.ul .item.active .toggle>a.link:not(:hover):not(:focus-visible){color:#086adb}.ul .item.active>a.link:not(:hover):not(:focus-visible).arrow::before,.ul .item.active>a.link:not(:hover):not(:focus-visible).arrow::after,.ul .item.active .toggle>a.link:not(:hover):not(:focus-visible).arrow::before,.ul .item.active .toggle>a.link:not(:hover):not(:focus-visible).arrow::after{background:#086adb}.ul .item sdx-header-menu .toggle>a.link:active::before,.ul .item sdx-header-menu .toggle>a.link:active::after,.ul .item sdx-header-menu .toggle>a.link:active .initials{background:#0048cf}@media (hover: hover){.ul .item sdx-header-menu .toggle>a.link:hover::before,.ul .item sdx-header-menu .toggle>a.link:hover::after,.ul .item sdx-header-menu .toggle>a.link:hover .initials,.ul .item sdx-header-menu .toggle>a.link:focus-visible::before,.ul .item sdx-header-menu .toggle>a.link:focus-visible::after,.ul .item sdx-header-menu .toggle>a.link:focus-visible .initials{background:#0048cf}}.ul .item sdx-header-menu .toggle>a.link .initials{transition:background 150ms cubic-bezier(0.4, 0, 0.2, 1);background:#015;height:24px;width:24px;border-radius:100%;color:#fff;font-size:12px;display:flex;justify-content:center;align-items:center}.ul .item a.link{display:flex;align-items:center}.ul.horizontal>.item{margin-left:12px;margin-right:12px}.ul.vertical{flex-flow:column}.ul.vertical a.link{flex-grow:1}.ul.vertical>.item:not(:first-of-type){margin-top:6px}.ul.vertical>.item:not(:last-of-type){margin-bottom:6px}.ul.secondary a.link .icon,.ul.slots a.link .icon,.ul.login a.link .icon,.ul.hamburger a.link .icon{display:block}.ul.secondary a.link:not(:hover):not(:focus-visible),.ul.tertiary a.link:not(:hover):not(:focus-visible){color:#333}.ul.secondary .toggle a.link:not(:hover):not(:focus-visible)::before,.ul.secondary .toggle a.link:not(:hover):not(:focus-visible)::after,.ul.tertiary .toggle a.link:not(:hover):not(:focus-visible)::before,.ul.tertiary .toggle a.link:not(:hover):not(:focus-visible)::after{background:#333}.ul.accordion:not(:last-of-type)::after{content:"";width:100%;height:1px;background:#d6d6d6;margin:16px 0}.ul.accordion.main,.ul.accordion.left-hand-menu{font-weight:600}.ul.accordion.main .item.leaf a.link,.ul.accordion.left-hand-menu .item.leaf a.link{font-weight:400}.ul.accordion.left-hand-menu a.link .icon{display:block}.ul.accordion sdx-accordion{width:100%}.ul.accordion sdx-accordion sdx-accordion-item-body>.ul{margin-top:12px}.ul.accordion sdx-accordion sdx-accordion-item-body>.ul>.item:last-of-type{margin-bottom:0}.component{font-weight:400;font-size:16px}.component.closing .wrapper,.component.closed .wrapper{background:rgba(255, 255, 255, 0.8)}.component .wrapper{display:flex;flex-direction:column;background:#fff;transition:background 150ms cubic-bezier(0.4, 0, 0.2, 1);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);position:relative}.component .wrapper.meta{z-index:50000}.component .wrapper.main{z-index:49999;top:0}.component .wrapper.main::before{content:"";position:absolute;bottom:0;right:0;left:0;height:1px;background:#dde3e7}.component .wrapper.breadcrumb-list{z-index:49998}.component .header .meta>.container{height:40px}.component .header .main>.container{height:72px}.component .header .main>.container>.ul.logo{width:18px;margin-right:16px}.component .header .main>.container>.ul.logo .img{background-size:3600px 40px;background-position:0 0;background-repeat:no-repeat;background-image:url("../images/lifeform-spritesheet.png");width:40px;height:40px;backface-visibility:hidden;min-width:40px;animation:repeatingAnimation 30s steps(90) infinite, initialAnimation 6s steps(90);transform:translateX(-18px)}@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx){.component .header .main>.container>.ul.logo .img{background-image:url("../images/lifeform-spritesheet@2x.png")}}@keyframes initialAnimation{100%{background-position:-3600px}}@keyframes repeatingAnimation{0%{background-position:0}80%{background-position:0}100%{background-position:-3600px}}.component .header .main>.container>.ul.main .toggle{font-weight:600;font-size:20px}.component .header .breadcrumb-list>.container{font-size:14px}.component .header .breadcrumb-list>.container .ul{height:48px}.component .header .breadcrumb-list>.container .item{margin:0}.component .header .breadcrumb-list>.container .item:first-of-type a.link .label{display:none}.component .header .breadcrumb-list>.container .item:first-of-type a.link .icon{display:block}.component .header .breadcrumb-list>.container .item:not(:first-of-type)::before{content:">";align-self:center;margin:0 8px}.component .header .slot-menu-header,.component .header .slot-menu-content{padding-left:16px;padding-right:16px}.component .header .slot-menu-header{padding-top:24px;padding-bottom:16px;display:flex;align-items:start}.component .header .slot-menu-header .title{flex:1;margin:0}.component .header .slot-menu-content{padding-top:16px;padding-bottom:24px}.component .header .slot-menu-content a.link:not(:hover):not(:focus-visible){color:#086adb}.component .header .slot-menu-content .list{margin:0}.component .header .icon-gateway::before{font-family:sdx-icons;content:"\\e0e5"}sdx-button{display:flex;align-items:center}.component.sdx--dark-theme a.link{color:#e6e6e6}.component.sdx--dark-theme a.link:active{color:#5ca3ff}@media (hover: hover){.component.sdx--dark-theme a.link:hover,.component.sdx--dark-theme a.link:focus-visible{color:#5ca3ff}}.component.sdx--dark-theme .ul.secondary a.link:not(:hover),.component.sdx--dark-theme .ul.tertiary a.link:not(:hover){color:#adadad}.component.sdx--dark-theme .ul.secondary .toggle a.link:not(:hover)::before,.component.sdx--dark-theme .ul.secondary .toggle a.link:not(:hover)::after,.component.sdx--dark-theme .ul.tertiary .toggle a.link:not(:hover)::before,.component.sdx--dark-theme .ul.tertiary .toggle a.link:not(:hover)::after{background:#adadad}.component.sdx--dark-theme .ul.accordion:not(:last-of-type)::after{background:#5c5c5c}.component.sdx--dark-theme .ul .item.active>a.link:not(:hover):not(:focus-visible),.component.sdx--dark-theme .ul .item.active .toggle>a.link:not(:hover):not(:focus-visible){color:#4294ff}.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:active::before,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:active::after,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:active .initials{background:#5ca3ff}@media (hover: hover){.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:hover::before,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:hover::after,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:hover .initials,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:focus-visible::before,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:focus-visible::after,.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link:focus-visible .initials{background:#5ca3ff}}.component.sdx--dark-theme .ul .item sdx-header-menu .toggle>a.link .initials{background:#5c5c5c}.component.sdx--dark-theme .wrapper{background:#1d1d1d}.component.sdx--dark-theme .wrapper.main{border-bottom-color:#707070}.component.sdx--dark-theme .wrapper.breadcrumb-list{background:#141414}.component.sdx--dark-theme .header .slot-menu-content a.link:not(:hover):not(:focus-visible){color:#4294ff}';
const $t = Ut;
const Ht = class {
	constructor(e) {
		t(this, e);
		this.items = [];
		this.activeItems = [];
	}
	getComponentClassNames() {
		return { [k(this.el)]: true, component: true };
	}
	render() {
		return e(
			"nav",
			{ class: this.getComponentClassNames() },
			e(
				"ul",
				{ class: "ul vertical accordion left-hand-menu" },
				this.items.map((e) =>
					Nt(
						e,
						this.activeItems,
						"left",
						{
							body: { marginLeft: "23px" },
							arrow: { background: k(this.el) === "sdx--light-theme" ? "#015" : "#adadad" },
						},
						false,
						2,
					),
				),
			),
		);
	}
	get el() {
		return a(this);
	}
};
Ht.style = $t;
const Rt =
	':host,*,*:before,*:after{box-sizing:border-box}sdx-header-menu{display:flex;height:100%;position:relative}sdx-header-menu:not(.slot) .content{padding:24px 16px}sdx-header-menu.scrollable .content{-webkit-overflow-scrolling:touch;overflow-y:auto}sdx-header-menu.meta.open .toggle.arrow>a.link::before,sdx-header-menu.meta.opening .toggle.arrow>a.link::before{transform:rotate(-45deg)}sdx-header-menu.meta.open .toggle.arrow>a.link::after,sdx-header-menu.meta.opening .toggle.arrow>a.link::after{transform:rotate(45deg)}sdx-header-menu.meta .toggle.arrow>a.link{position:relative;padding-right:21px}sdx-header-menu.meta .toggle.arrow>a.link::before,sdx-header-menu.meta .toggle.arrow>a.link::after{position:absolute;top:50%;transition:all 300ms cubic-bezier(0.4, 0, 0.2, 1);border-radius:2px;background:#015;width:10px;height:2px;backface-visibility:hidden;content:""}sdx-header-menu.meta .toggle.arrow>a.link::before{left:0}sdx-header-menu.meta .toggle.arrow>a.link::after{left:6px}sdx-header-menu.meta .toggle.arrow>a.link::before{transform:rotate(45deg)}sdx-header-menu.meta .toggle.arrow>a.link::after{transform:rotate(-45deg)}sdx-header-menu.meta .toggle.arrow>a.link::before{left:auto;right:6px}sdx-header-menu.meta .toggle.arrow>a.link::after{left:auto;right:0}sdx-header-menu.main.open .toggle>a.link::after,sdx-header-menu.main.opening .toggle>a.link::after,sdx-header-menu.slots.open .toggle>a.link::after,sdx-header-menu.slots.opening .toggle>a.link::after{left:-4px;right:-4px}sdx-header-menu.main .toggle>a.link:active::after,sdx-header-menu.slots .toggle>a.link:active::after{left:-4px;right:-4px}@media (hover: hover){sdx-header-menu.main .toggle>a.link:hover::after,sdx-header-menu.main .toggle>a.link:focus-visible::after,sdx-header-menu.slots .toggle>a.link:hover::after,sdx-header-menu.slots .toggle>a.link:focus-visible::after{left:-4px;right:-4px}}sdx-header-menu.main .toggle>a.link::after,sdx-header-menu.slots .toggle>a.link::after{content:"";background-color:#015;transition:all 150ms cubic-bezier(0.4, 0, 0.2, 1);height:2px;position:absolute;bottom:-1px;bottom:0;left:50%;right:50%}sdx-header-menu.auto,sdx-header-menu.fixed-left{flex-direction:row-reverse}@media (min-width: 480px){sdx-header-menu.auto .content,sdx-header-menu.fixed-left .content{margin-left:-16px}}sdx-header-menu.auto .content{padding:8px 16px 16px}sdx-header-menu.fixed-left .content,sdx-header-menu.fixed-right .content{left:0;right:0}@media (min-width: 480px){sdx-header-menu.fixed-left .content,sdx-header-menu.fixed-right .content{width:360px}}sdx-header-menu.fixed-left .content a.link,sdx-header-menu.fixed-right .content a.link{white-space:normal}@media (min-width: 480px){sdx-header-menu.fixed-left .content{right:unset}}@media (min-width: 1024px){sdx-header-menu.fixed-left .content{left:unset}}@media (min-width: 480px){sdx-header-menu.fixed-right .content{left:unset;margin-left:-344px}}@media (min-width: 1024px){sdx-header-menu.fixed-right .content{right:unset}}sdx-header-menu .toggle{display:flex;cursor:pointer}sdx-header-menu .content{position:fixed;background:#fff;border-radius:0 0 12px 12px;border:1px solid #dde3e7;border-top:0;display:none;max-height:calc(\n      var(--sdx-dialog-window-inner-height, 100vh) - 88px\n    )}@media (min-width: 1024px){sdx-header-menu .content{max-height:calc(\n        var(--sdx-dialog-window-inner-height, 100vh) - 128px\n      )}}sdx-header-menu.sdx--dark-theme.meta .toggle.arrow>a.link::before,sdx-header-menu.sdx--dark-theme.meta .toggle.arrow>a.link::after{background:#adadad}sdx-header-menu.sdx--dark-theme.main .toggle>a.link::after,sdx-header-menu.sdx--dark-theme.slots .toggle>a.link::after{background-color:#e6e6e6}sdx-header-menu.sdx--dark-theme .content{background:#1d1d1d;border-color:#707070}';
const Ft = Rt;
const Wt = class {
	constructor(e) {
		t(this, e);
		this.animationDuration = 200;
		this.isUserInteractionInProgress = false;
		this.display = "closed";
		this.level = "meta";
		this.layout = "auto";
		this.width = undefined;
		this.scrollable = true;
		this.displayChangeCallback = () => undefined;
		this.displayChangeByUserInteractionCallback = () => undefined;
		this.animated = true;
	}
	displayChanged() {
		if (this.display === "opening") {
			b();
		}
		this.displayChangeCallback(this.el, this.display);
	}
	onWindowResize() {
		if (this.display === "open") {
			b();
		}
	}
	async toggle() {
		if (this.display === "open" || this.display === "opening") {
			this.close();
		} else {
			this.open();
		}
	}
	async open() {
		if (this.display === "open" || this.display === "opening") {
			return;
		}
		if (!(this.toggleEl && this.contentEl && this.slotContainerEl)) {
			return;
		}
		const e = this.isUserInteractionInProgress;
		this.setDisplay("opening", e);
		h.set(this.contentEl, { display: "block", top: 0 });
		const t = this.contentEl.getBoundingClientRect().top;
		const { bottom: i } = this.toggleEl.getBoundingClientRect();
		h.set(this.contentEl, { transformOrigin: "50% 0", scaleY: 0, opacity: 0.2, top: i - t });
		h.set(this.slotContainerEl, { opacity: 0 });
		h.start({
			targets: this.contentEl,
			duration: this.animated ? this.animationDuration : 0,
			opacity: 1,
			scaleY: 1,
			complete: () => {
				h.start({
					targets: this.slotContainerEl,
					duration: this.animated ? this.animationDuration : 0,
					opacity: 1,
					complete: () => {
						this.setDisplay("open", e);
					},
				});
			},
		});
	}
	async close() {
		if (this.display === "closed" || this.display === "closing") {
			return;
		}
		if (!(this.toggleEl && this.contentEl)) {
			return;
		}
		const e = this.isUserInteractionInProgress;
		this.setDisplay("closing", e);
		h.start({
			targets: this.contentEl,
			duration: this.animated ? this.animationDuration : 0,
			opacity: 0.2,
			scaleY: 0,
			complete: () => {
				h.set(this.contentEl, { display: "none" });
				this.setDisplay("closed", e);
			},
		});
	}
	async doFocus() {
		var e;
		(e = this.trapFocusEl) === null || e === void 0 ? void 0 : e.doFocus();
	}
	async requestToClose(e) {
		if (!(this.toggleEl && this.contentEl)) {
			return;
		}
		if (e instanceof KeyboardEvent) {
			if (e.key === "Escape") {
				this.isUserInteractionInProgress = true;
				this.close();
				this.isUserInteractionInProgress = false;
			}
			return;
		}
		const t = e.composedPath().includes(this.toggleEl);
		const i = e.composedPath().includes(this.contentEl);
		if (t) {
			return;
		}
		if (i) {
			return;
		}
		this.isUserInteractionInProgress = true;
		this.close();
		this.isUserInteractionInProgress = false;
	}
	setDisplay(e, t) {
		this.display = e;
		if (!t) {
			return;
		}
		this.displayChangeByUserInteractionCallback(this.display);
	}
	componentDidLoad() {
		h.set(this.contentEl, { display: "none" });
	}
	onToggleClick() {
		if (!v(this.el, "content")) {
			return;
		}
		this.isUserInteractionInProgress = true;
		this.toggle();
		this.isUserInteractionInProgress = false;
	}
	getHostClassNames() {
		return {
			scrollable: this.scrollable,
			[k(this.el)]: true,
			[this.display]: true,
			[this.layout]: true,
			[this.level]: true,
		};
	}
	getToggleClassNames() {
		return { toggle: true, arrow: v(this.el, "content") };
	}
	render() {
		return e(
			o,
			{ class: this.getHostClassNames() },
			e(
				"span",
				{ class: this.getToggleClassNames(), onClick: () => this.onToggleClick(), ref: (e) => (this.toggleEl = e) },
				e("slot", { name: "toggle" }),
			),
			e(
				"div",
				null,
				e(
					"div",
					{ class: "content", style: { width: this.width }, ref: (e) => (this.contentEl = e) },
					e(
						"sdx-trap-focus",
						{ lang: this.el.lang, ref: (e) => (this.trapFocusEl = e) },
						e(
							"nav",
							{ ref: (e) => (this.slotContainerEl = e), "data-nosnippet": true },
							e("slot", { name: "content" }),
						),
					),
				),
			),
		);
	}
	get el() {
		return a(this);
	}
	static get watchers() {
		return { display: ["displayChanged"] };
	}
};
Wt.style = Ft;
export { Pt as sdx_header, Ht as sdx_header_left_hand_menu, Wt as sdx_header_menu };
//# sourceMappingURL=p-ccf26d18.entry.js.map
