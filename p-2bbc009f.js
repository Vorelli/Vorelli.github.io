const e = "webcomponents";
const t = {
	allRenderFn: true,
	appendChildSlotFix: false,
	asyncLoading: true,
	asyncQueue: false,
	attachStyles: true,
	cloneNodeFix: false,
	cmpDidLoad: true,
	cmpDidRender: true,
	cmpDidUnload: false,
	cmpDidUpdate: true,
	cmpShouldUpdate: false,
	cmpWillLoad: true,
	cmpWillRender: false,
	cmpWillUpdate: true,
	connectedCallback: true,
	constructableCSS: true,
	cssAnnotations: true,
	devTools: false,
	disconnectedCallback: true,
	element: false,
	event: true,
	experimentalScopedSlotChanges: false,
	experimentalSlotFixes: false,
	formAssociated: true,
	hasRenderFn: true,
	hostListener: true,
	hostListenerTarget: true,
	hostListenerTargetBody: false,
	hostListenerTargetDocument: false,
	hostListenerTargetParent: false,
	hostListenerTargetWindow: true,
	hotModuleReplacement: false,
	hydrateClientSide: false,
	hydrateServerSide: false,
	hydratedAttribute: false,
	hydratedClass: true,
	initializeNextTick: false,
	invisiblePrehydration: true,
	isDebug: false,
	isDev: false,
	isTesting: false,
	lazyLoad: true,
	lifecycle: true,
	lifecycleDOMEvents: false,
	member: true,
	method: true,
	mode: false,
	observeAttribute: true,
	profile: false,
	prop: true,
	propBoolean: true,
	propMutable: true,
	propNumber: true,
	propString: true,
	reflect: true,
	scoped: false,
	scopedSlotTextContentFix: false,
	scriptDataOpts: false,
	shadowDelegatesFocus: false,
	shadowDom: true,
	slot: true,
	slotChildNodesFix: false,
	slotRelocation: true,
	state: true,
	style: true,
	svg: true,
	taskQueue: true,
	transformTagName: false,
	updatable: true,
	vdomAttribute: true,
	vdomClass: true,
	vdomFunctional: true,
	vdomKey: true,
	vdomListener: true,
	vdomPropOrAttr: true,
	vdomRef: true,
	vdomRender: true,
	vdomStyle: true,
	vdomText: true,
	vdomXlink: true,
	watchCallback: true,
};
let n;
let s;
let l;
let o = false;
let i = false;
let c = false;
let f = false;
let r = false;
const a = (e) => {
	const t = new URL(e, Ie.t);
	return t.origin !== Qe.location.origin ? t.href : t.pathname;
};
const u = (e, t = "") => {
	{
		return () => {};
	}
};
const d = (e, t) => {
	{
		return () => {};
	}
};
const p = "{visibility:hidden}.hydrated{visibility:inherit}";
const v = "slot-fb{display:contents}slot-fb[hidden]{display:none}";
const m = "http://www.w3.org/1999/xlink";
const h = ["formAssociatedCallback", "formResetCallback", "formDisabledCallback", "formStateRestoreCallback"];
const y = {};
const b = "http://www.w3.org/2000/svg";
const w = "http://www.w3.org/1999/xhtml";
const g = (e) => e != null;
const $ = (e) => {
	e = typeof e;
	return e === "object" || e === "function";
};
function S(e) {
	var t, n, s;
	return (s =
		(n = (t = e.head) === null || t === void 0 ? void 0 : t.querySelector('meta[name="csp-nonce"]')) === null ||
		n === void 0
			? void 0
			: n.getAttribute("content")) !== null && s !== void 0
		? s
		: undefined;
}
const k = (e, t, ...n) => {
	let s = null;
	let l = null;
	let o = null;
	let i = false;
	let c = false;
	const f = [];
	const r = (t) => {
		for (let n = 0; n < t.length; n++) {
			s = t[n];
			if (Array.isArray(s)) {
				r(s);
			} else if (s != null && typeof s !== "boolean") {
				if ((i = typeof e !== "function" && !$(s))) {
					s = String(s);
				}
				if (i && c) {
					f[f.length - 1].l += s;
				} else {
					f.push(i ? C(null, s) : s);
				}
				c = i;
			}
		}
	};
	r(n);
	if (t) {
		if (t.key) {
			l = t.key;
		}
		if (t.name) {
			o = t.name;
		}
		{
			const e = t.className || t.class;
			if (e) {
				t.class =
					typeof e !== "object"
						? e
						: Object.keys(e)
								.filter((t) => e[t])
								.join(" ");
			}
		}
	}
	if (typeof e === "function") {
		return e(t === null ? {} : t, f, O);
	}
	const a = C(e, null);
	a.o = t;
	if (f.length > 0) {
		a.i = f;
	}
	{
		a.u = l;
	}
	{
		a.p = o;
	}
	return a;
};
const C = (e, t) => {
	const n = { v: 0, m: e, l: t, h: null, i: null };
	{
		n.o = null;
	}
	{
		n.u = null;
	}
	{
		n.p = null;
	}
	return n;
};
const j = {};
const x = (e) => e && e.m === j;
const O = { forEach: (e, t) => e.map(R).forEach(t), map: (e, t) => e.map(R).map(t).map(L) };
const R = (e) => ({ vattrs: e.o, vchildren: e.i, vkey: e.u, vname: e.p, vtag: e.m, vtext: e.l });
const L = (e) => {
	if (typeof e.vtag === "function") {
		const t = Object.assign({}, e.vattrs);
		if (e.vkey) {
			t.key = e.vkey;
		}
		if (e.vname) {
			t.name = e.vname;
		}
		return k(e.vtag, t, ...(e.vchildren || []));
	}
	const t = C(e.vtag, e.vtext);
	t.o = e.vattrs;
	t.i = e.vchildren;
	t.u = e.vkey;
	t.p = e.vname;
	return t;
};
const T = (e, t) => {
	if (e != null && !$(e)) {
		if (t & 4) {
			return e === "false" ? false : e === "" || !!e;
		}
		if (t & 2) {
			return parseFloat(e);
		}
		if (t & 1) {
			return String(e);
		}
		return e;
	}
	return e;
};
const D = (e) => Ae(e).$hostElement$;
const F = (e, t, n) => {
	const s = D(e);
	return { emit: (e) => M(s, t, { bubbles: !!(n & 4), composed: !!(n & 2), cancelable: !!(n & 1), detail: e }) };
};
const M = (e, t, n) => {
	const s = Ie.ce(t, n);
	e.dispatchEvent(s);
	return s;
};
const U = new WeakMap();
const A = (e, t, n) => {
	let s = He.get(e);
	if (Xe && n) {
		s = s || new CSSStyleSheet();
		if (typeof s === "string") {
			s = t;
		} else {
			s.replaceSync(t);
		}
	} else {
		s = t;
	}
	He.set(e, s);
};
const N = (e, t, n) => {
	var s;
	const l = W(t);
	const o = He.get(l);
	e = e.nodeType === 11 ? e : qe;
	if (o) {
		if (typeof o === "string") {
			e = e.head || e;
			let n = U.get(e);
			let i;
			if (!n) {
				U.set(e, (n = new Set()));
			}
			if (!n.has(l)) {
				{
					i = qe.createElement("style");
					i.innerHTML = o;
					const t = (s = Ie.$) !== null && s !== void 0 ? s : S(qe);
					if (t != null) {
						i.setAttribute("nonce", t);
					}
					e.insertBefore(i, e.querySelector("link"));
				}
				if (t.v & 4) {
					i.innerHTML += v;
				}
				if (n) {
					n.add(l);
				}
			}
		} else if (!e.adoptedStyleSheets.includes(o)) {
			e.adoptedStyleSheets = [...e.adoptedStyleSheets, o];
		}
	}
	return l;
};
const P = (e) => {
	const t = e.S;
	const n = e.$hostElement$;
	const s = t.v;
	const l = u("attachStyles", t.k);
	const o = N(n.shadowRoot ? n.shadowRoot : n.getRootNode(), t);
	if (s & 10) {
		n["s-sc"] = o;
		n.classList.add(o + "-h");
	}
	l();
};
const W = (e, t) => "sc-" + e.k;
const E = (e, t, n, s, l, o) => {
	if (n !== s) {
		let i = We(e, t);
		let c = t.toLowerCase();
		if (t === "class") {
			const t = e.classList;
			const l = B(n);
			const o = B(s);
			t.remove(...l.filter((e) => e && !o.includes(e)));
			t.add(...o.filter((e) => e && !l.includes(e)));
		} else if (t === "style") {
			{
				for (const t in n) {
					if (!s || s[t] == null) {
						if (t.includes("-")) {
							e.style.removeProperty(t);
						} else {
							e.style[t] = "";
						}
					}
				}
			}
			for (const t in s) {
				if (!n || s[t] !== n[t]) {
					if (t.includes("-")) {
						e.style.setProperty(t, s[t]);
					} else {
						e.style[t] = s[t];
					}
				}
			}
		} else if (t === "key");
		else if (t === "ref") {
			if (s) {
				s(e);
			}
		} else if (!i && t[0] === "o" && t[1] === "n") {
			if (t[2] === "-") {
				t = t.slice(3);
			} else if (We(Qe, c)) {
				t = c.slice(2);
			} else {
				t = c[2] + t.slice(3);
			}
			if (n || s) {
				const l = t.endsWith(H);
				t = t.replace(Q, "");
				if (n) {
					Ie.rel(e, t, n, l);
				}
				if (s) {
					Ie.ael(e, t, s, l);
				}
			}
		} else {
			const f = $(s);
			if ((i || (f && s !== null)) && !l) {
				try {
					if (!e.tagName.includes("-")) {
						const l = s == null ? "" : s;
						if (t === "list") {
							i = false;
						} else if (n == null || e[t] != l) {
							e[t] = l;
						}
					} else {
						e[t] = s;
					}
				} catch (e) {}
			}
			let r = false;
			{
				if (c !== (c = c.replace(/^xlink\:?/, ""))) {
					t = c;
					r = true;
				}
			}
			if (s == null || s === false) {
				if (s !== false || e.getAttribute(t) === "") {
					if (r) {
						e.removeAttributeNS(m, t);
					} else {
						e.removeAttribute(t);
					}
				}
			} else if ((!i || o & 4 || l) && !f) {
				s = s === true ? "" : s;
				if (r) {
					e.setAttributeNS(m, t, s);
				} else {
					e.setAttribute(t, s);
				}
			}
		}
	}
};
const z = /\s/;
const B = (e) => (!e ? [] : e.split(z));
const H = "Capture";
const Q = new RegExp(H + "$");
const q = (e, t, n, s) => {
	const l = t.h.nodeType === 11 && t.h.host ? t.h.host : t.h;
	const o = (e && e.o) || y;
	const i = t.o || y;
	{
		for (s in o) {
			if (!(s in i)) {
				E(l, s, o[s], undefined, n, t.v);
			}
		}
	}
	for (s in i) {
		E(l, s, o[s], i[s], n, t.v);
	}
};
const I = (e, t, i, r) => {
	const a = t.i[i];
	let u = 0;
	let d;
	let p;
	let v;
	if (!o) {
		c = true;
		if (a.m === "slot") {
			if (n) {
				r.classList.add(n + "-s");
			}
			a.v |= a.i ? 2 : 1;
		}
	}
	if (a.l !== null) {
		d = a.h = qe.createTextNode(a.l);
	} else if (a.v & 1) {
		d = a.h = qe.createTextNode("");
	} else {
		if (!f) {
			f = a.m === "svg";
		}
		d = a.h = qe.createElementNS(f ? b : w, a.v & 2 ? "slot-fb" : a.m);
		if (f && a.m === "foreignObject") {
			f = false;
		}
		{
			q(null, a, f);
		}
		if (g(n) && d["s-si"] !== n) {
			d.classList.add((d["s-si"] = n));
		}
		if (a.i) {
			for (u = 0; u < a.i.length; ++u) {
				p = I(e, a, u, d);
				if (p) {
					d.appendChild(p);
				}
			}
		}
		{
			if (a.m === "svg") {
				f = false;
			} else if (d.tagName === "foreignObject") {
				f = true;
			}
		}
	}
	d["s-hn"] = l;
	{
		if (a.v & (2 | 1)) {
			d["s-sr"] = true;
			d["s-cr"] = s;
			d["s-sn"] = a.p || "";
			v = e && e.i && e.i[i];
			if (v && v.m === a.m && e.h) {
				{
					K(e.h, false);
				}
			}
		}
	}
	return d;
};
const K = (e, t) => {
	Ie.v |= 1;
	const n = e.childNodes;
	for (let e = n.length - 1; e >= 0; e--) {
		const s = n[e];
		if (s["s-hn"] !== l && s["s-ol"]) {
			Y(s).insertBefore(s, J(s));
			s["s-ol"].remove();
			s["s-ol"] = undefined;
			s["s-sh"] = undefined;
			c = true;
		}
		if (t) {
			K(s, t);
		}
	}
	Ie.v &= ~1;
};
const V = (e, t, n, s, o, i) => {
	let c = (e["s-cr"] && e["s-cr"].parentNode) || e;
	let f;
	if (c.shadowRoot && c.tagName === l) {
		c = c.shadowRoot;
	}
	for (; o <= i; ++o) {
		if (s[o]) {
			f = I(null, n, o, e);
			if (f) {
				s[o].h = f;
				c.insertBefore(f, J(t));
			}
		}
	}
};
const X = (e, t, n) => {
	for (let s = t; s <= n; ++s) {
		const t = e[s];
		if (t) {
			const e = t.h;
			le(t);
			if (e) {
				{
					i = true;
					if (e["s-ol"]) {
						e["s-ol"].remove();
					} else {
						K(e, true);
					}
				}
				e.remove();
			}
		}
	}
};
const _ = (e, t, n, s, l = false) => {
	let o = 0;
	let i = 0;
	let c = 0;
	let f = 0;
	let r = t.length - 1;
	let a = t[0];
	let u = t[r];
	let d = s.length - 1;
	let p = s[0];
	let v = s[d];
	let m;
	let h;
	while (o <= r && i <= d) {
		if (a == null) {
			a = t[++o];
		} else if (u == null) {
			u = t[--r];
		} else if (p == null) {
			p = s[++i];
		} else if (v == null) {
			v = s[--d];
		} else if (G(a, p, l)) {
			Z(a, p, l);
			a = t[++o];
			p = s[++i];
		} else if (G(u, v, l)) {
			Z(u, v, l);
			u = t[--r];
			v = s[--d];
		} else if (G(a, v, l)) {
			if (a.m === "slot" || v.m === "slot") {
				K(a.h.parentNode, false);
			}
			Z(a, v, l);
			e.insertBefore(a.h, u.h.nextSibling);
			a = t[++o];
			v = s[--d];
		} else if (G(u, p, l)) {
			if (a.m === "slot" || v.m === "slot") {
				K(u.h.parentNode, false);
			}
			Z(u, p, l);
			e.insertBefore(u.h, a.h);
			u = t[--r];
			p = s[++i];
		} else {
			c = -1;
			{
				for (f = o; f <= r; ++f) {
					if (t[f] && t[f].u !== null && t[f].u === p.u) {
						c = f;
						break;
					}
				}
			}
			if (c >= 0) {
				h = t[c];
				if (h.m !== p.m) {
					m = I(t && t[i], n, c, e);
				} else {
					Z(h, p, l);
					t[c] = undefined;
					m = h.h;
				}
				p = s[++i];
			} else {
				m = I(t && t[i], n, i, e);
				p = s[++i];
			}
			if (m) {
				{
					Y(a.h).insertBefore(m, J(a.h));
				}
			}
		}
	}
	if (o > r) {
		V(e, s[d + 1] == null ? null : s[d + 1].h, n, s, i, d);
	} else if (i > d) {
		X(t, o, r);
	}
};
const G = (e, t, n = false) => {
	if (e.m === t.m) {
		if (e.m === "slot") {
			return e.p === t.p;
		}
		if (!n) {
			return e.u === t.u;
		}
		return true;
	}
	return false;
};
const J = (e) => (e && e["s-ol"]) || e;
const Y = (e) => (e["s-ol"] ? e["s-ol"] : e).parentNode;
const Z = (e, t, n = false) => {
	const s = (t.h = e.h);
	const l = e.i;
	const o = t.i;
	const i = t.m;
	const c = t.l;
	let r;
	if (c === null) {
		{
			f = i === "svg" ? true : i === "foreignObject" ? false : f;
		}
		{
			if (i === "slot");
			else {
				q(e, t, f);
			}
		}
		if (l !== null && o !== null) {
			_(s, l, t, o, n);
		} else if (o !== null) {
			if (e.l !== null) {
				s.textContent = "";
			}
			V(s, null, t, o, 0, o.length - 1);
		} else if (l !== null) {
			X(l, 0, l.length - 1);
		}
		if (f && i === "svg") {
			f = false;
		}
	} else if ((r = s["s-cr"])) {
		r.parentNode.textContent = c;
	} else if (e.l !== c) {
		s.data = c;
	}
};
const ee = (e) => {
	const t = e.childNodes;
	for (const e of t) {
		if (e.nodeType === 1) {
			if (e["s-sr"]) {
				const n = e["s-sn"];
				e.hidden = false;
				for (const s of t) {
					if (s !== e) {
						if (s["s-hn"] !== e["s-hn"] || n !== "") {
							if (s.nodeType === 1 && (n === s.getAttribute("slot") || n === s["s-sn"])) {
								e.hidden = true;
								break;
							}
						} else {
							if (s.nodeType === 1 || (s.nodeType === 3 && s.textContent.trim() !== "")) {
								e.hidden = true;
								break;
							}
						}
					}
				}
			}
			ee(e);
		}
	}
};
const te = [];
const ne = (e) => {
	let n;
	let s;
	let l;
	for (const o of e.childNodes) {
		if (o["s-sr"] && (n = o["s-cr"]) && n.parentNode) {
			s = n.parentNode.childNodes;
			const e = o["s-sn"];
			for (l = s.length - 1; l >= 0; l--) {
				n = s[l];
				if (!n["s-cn"] && !n["s-nr"] && n["s-hn"] !== o["s-hn"] && !t.experimentalSlotFixes) {
					if (se(n, e)) {
						let t = te.find((e) => e.C === n);
						i = true;
						n["s-sn"] = n["s-sn"] || e;
						if (t) {
							t.C["s-sh"] = o["s-hn"];
							t.j = o;
						} else {
							n["s-sh"] = o["s-hn"];
							te.push({ j: o, C: n });
						}
						if (n["s-sr"]) {
							te.map((e) => {
								if (se(e.C, n["s-sn"])) {
									t = te.find((e) => e.C === n);
									if (t && !e.j) {
										e.j = t.j;
									}
								}
							});
						}
					} else if (!te.some((e) => e.C === n)) {
						te.push({ C: n });
					}
				}
			}
		}
		if (o.nodeType === 1) {
			ne(o);
		}
	}
};
const se = (e, t) => {
	if (e.nodeType === 1) {
		if (e.getAttribute("slot") === null && t === "") {
			return true;
		}
		if (e.getAttribute("slot") === t) {
			return true;
		}
		return false;
	}
	if (e["s-sn"] === t) {
		return true;
	}
	return t === "";
};
const le = (e) => {
	{
		e.o && e.o.ref && e.o.ref(null);
		e.i && e.i.map(le);
	}
};
const oe = (e, t, f = false) => {
	var r, a, u, d;
	const p = e.$hostElement$;
	const v = e.S;
	const m = e.O || C(null, null);
	const h = x(t) ? t : k(null, null, t);
	l = p.tagName;
	if (v.R) {
		h.o = h.o || {};
		v.R.map(([e, t]) => (h.o[t] = p[e]));
	}
	if (f && h.o) {
		for (const e of Object.keys(h.o)) {
			if (p.hasAttribute(e) && !["key", "ref", "style", "class"].includes(e)) {
				h.o[e] = p[e];
			}
		}
	}
	h.m = null;
	h.v |= 4;
	e.O = h;
	h.h = m.h = p.shadowRoot || p;
	{
		n = p["s-sc"];
	}
	{
		s = p["s-cr"];
		o = (v.v & 1) !== 0;
		i = false;
	}
	Z(m, h, f);
	{
		Ie.v |= 1;
		if (c) {
			ne(h.h);
			for (const e of te) {
				const t = e.C;
				if (!t["s-ol"]) {
					const e = qe.createTextNode("");
					e["s-nr"] = t;
					t.parentNode.insertBefore((t["s-ol"] = e), t);
				}
			}
			for (const e of te) {
				const t = e.C;
				const n = e.j;
				if (n) {
					const e = n.parentNode;
					let s = n.nextSibling;
					{
						let n = (r = t["s-ol"]) === null || r === void 0 ? void 0 : r.previousSibling;
						while (n) {
							let l = (a = n["s-nr"]) !== null && a !== void 0 ? a : null;
							if (l && l["s-sn"] === t["s-sn"] && e === l.parentNode) {
								l = l.nextSibling;
								if (!l || !l["s-nr"]) {
									s = l;
									break;
								}
							}
							n = n.previousSibling;
						}
					}
					if ((!s && e !== t.parentNode) || t.nextSibling !== s) {
						if (t !== s) {
							if (!t["s-hn"] && t["s-ol"]) {
								t["s-hn"] = t["s-ol"].parentNode.nodeName;
							}
							e.insertBefore(t, s);
							if (t.nodeType === 1) {
								t.hidden = (u = t["s-ih"]) !== null && u !== void 0 ? u : false;
							}
						}
					}
				} else {
					if (t.nodeType === 1) {
						if (f) {
							t["s-ih"] = (d = t.hidden) !== null && d !== void 0 ? d : false;
						}
						t.hidden = true;
					}
				}
			}
		}
		if (i) {
			ee(h.h);
		}
		Ie.v &= ~1;
		te.length = 0;
	}
	s = undefined;
};
const ie = (e, t) => {
	if (t && !e.L && t["s-p"]) {
		t["s-p"].push(new Promise((t) => (e.L = t)));
	}
};
const ce = (e, t) => {
	{
		e.v |= 16;
	}
	if (e.v & 4) {
		e.v |= 512;
		return;
	}
	ie(e, e.T);
	const n = () => fe(e, t);
	return tt(n);
};
const fe = (e, t) => {
	const n = u("scheduleUpdate", e.S.k);
	const s = e.D;
	let l;
	if (t) {
		{
			e.v |= 256;
			if (e.F) {
				e.F.map(([e, t]) => he(s, e, t));
				e.F = undefined;
			}
		}
		{
			l = he(s, "componentWillLoad");
		}
	} else {
		{
			l = he(s, "componentWillUpdate");
		}
	}
	n();
	return re(l, () => ue(e, s, t));
};
const re = (e, t) => (ae(e) ? e.then(t) : t());
const ae = (e) => e instanceof Promise || (e && e.then && typeof e.then === "function");
const ue = async (e, t, n) => {
	var s;
	const l = e.$hostElement$;
	const o = u("update", e.S.k);
	const i = l["s-rc"];
	if (n) {
		P(e);
	}
	const c = u("render", e.S.k);
	{
		de(e, t, l, n);
	}
	if (i) {
		i.map((e) => e());
		l["s-rc"] = undefined;
	}
	c();
	o();
	{
		const t = (s = l["s-p"]) !== null && s !== void 0 ? s : [];
		const n = () => pe(e);
		if (t.length === 0) {
			n();
		} else {
			Promise.all(t).then(n);
			e.v |= 4;
			t.length = 0;
		}
	}
};
const de = (e, t, n, s) => {
	try {
		t = t.render();
		{
			e.v &= ~16;
		}
		{
			e.v |= 2;
		}
		{
			{
				{
					oe(e, t, s);
				}
			}
		}
	} catch (t) {
		Ee(t, e.$hostElement$);
	}
	return null;
};
const pe = (e) => {
	const t = e.S.k;
	const n = e.$hostElement$;
	const s = u("postUpdate", t);
	const l = e.D;
	const o = e.T;
	{
		he(l, "componentDidRender");
	}
	if (!(e.v & 64)) {
		e.v |= 64;
		{
			ye(n);
		}
		{
			he(l, "componentDidLoad");
		}
		s();
		{
			e.M(n);
			if (!o) {
				me();
			}
		}
	} else {
		{
			he(l, "componentDidUpdate");
		}
		s();
	}
	{
		e.U(n);
	}
	{
		if (e.L) {
			e.L();
			e.L = undefined;
		}
		if (e.v & 512) {
			et(() => ce(e, false));
		}
		e.v &= ~(4 | 512);
	}
};
const ve = (e) => {
	{
		const t = Ae(e);
		const n = t.$hostElement$.isConnected;
		if (n && (t.v & (2 | 16)) === 2) {
			ce(t, false);
		}
		return n;
	}
};
const me = (t) => {
	{
		ye(qe.documentElement);
	}
	et(() => M(Qe, "appload", { detail: { namespace: e } }));
};
const he = (e, t, n) => {
	if (e && e[t]) {
		try {
			return e[t](n);
		} catch (e) {
			Ee(e);
		}
	}
	return undefined;
};
const ye = (e) => e.classList.add("hydrated");
const be = (e, t) => Ae(e).A.get(t);
const we = (e, t, n, s) => {
	const l = Ae(e);
	const o = l.$hostElement$;
	const i = l.A.get(t);
	const c = l.v;
	const f = l.D;
	n = T(n, s.N[t][0]);
	const r = Number.isNaN(i) && Number.isNaN(n);
	const a = n !== i && !r;
	if ((!(c & 8) || i === undefined) && a) {
		l.A.set(t, n);
		if (f) {
			if (s.P && c & 128) {
				const e = s.P[t];
				if (e) {
					e.map((e) => {
						try {
							f[e](n, i, t);
						} catch (e) {
							Ee(e, o);
						}
					});
				}
			}
			if ((c & (2 | 16)) === 2) {
				ce(l, false);
			}
		}
	}
};
const ge = (e, t, n) => {
	var s;
	const l = e.prototype;
	if (t.v & 64 && n & 1) {
		h.forEach((e) =>
			Object.defineProperty(l, e, {
				value(...t) {
					const n = Ae(this);
					const s = n.D;
					if (!s) {
						n.W.then((n) => {
							const s = n[e];
							typeof s === "function" && s.call(n, ...t);
						});
					} else {
						const n = s[e];
						typeof n === "function" && n.call(s, ...t);
					}
				},
			}),
		);
	}
	if (t.N) {
		if (e.watchers) {
			t.P = e.watchers;
		}
		const o = Object.entries(t.N);
		o.map(([e, [s]]) => {
			if (s & 31 || (n & 2 && s & 32)) {
				Object.defineProperty(l, e, {
					get() {
						return be(this, e);
					},
					set(n) {
						we(this, e, n, t);
					},
					configurable: true,
					enumerable: true,
				});
			} else if (n & 1 && s & 64) {
				Object.defineProperty(l, e, {
					value(...t) {
						var n;
						const s = Ae(this);
						return (n = s === null || s === void 0 ? void 0 : s.B) === null || n === void 0
							? void 0
							: n.then(() => {
									var n;
									return (n = s.D) === null || n === void 0 ? void 0 : n[e](...t);
								});
					},
				});
			}
		});
		if (n & 1) {
			const n = new Map();
			l.attributeChangedCallback = function (e, s, o) {
				Ie.jmp(() => {
					var i;
					const c = n.get(e);
					if (this.hasOwnProperty(c)) {
						o = this[c];
						delete this[c];
					} else if (l.hasOwnProperty(c) && typeof this[c] === "number" && this[c] == o) {
						return;
					} else if (c == null) {
						const n = Ae(this);
						const l = n === null || n === void 0 ? void 0 : n.v;
						if (l && !(l & 8) && l & 128 && o !== s) {
							const l = n.D;
							const c = (i = t.P) === null || i === void 0 ? void 0 : i[e];
							c === null || c === void 0
								? void 0
								: c.forEach((t) => {
										if (l[t] != null) {
											l[t].call(l, o, s, e);
										}
									});
						}
						return;
					}
					this[c] = o === null && typeof this[c] === "boolean" ? false : o;
				});
			};
			e.observedAttributes = Array.from(
				new Set([
					...Object.keys((s = t.P) !== null && s !== void 0 ? s : {}),
					...o
						.filter(([e, t]) => t[0] & 15)
						.map(([e, s]) => {
							var l;
							const o = s[1] || e;
							n.set(o, e);
							if (s[0] & 512) {
								(l = t.R) === null || l === void 0 ? void 0 : l.push([e, o]);
							}
							return o;
						}),
				]),
			);
		}
	}
	return e;
};
const $e = async (e, t, n, s) => {
	let l;
	if ((t.v & 32) === 0) {
		t.v |= 32;
		{
			l = Be(n);
			if (l.then) {
				const e = d();
				l = await l;
				e();
			}
			if (!l.isProxied) {
				{
					n.P = l.watchers;
				}
				ge(l, n, 2);
				l.isProxied = true;
			}
			const e = u("createInstance", n.k);
			{
				t.v |= 8;
			}
			try {
				new l(t);
			} catch (e) {
				Ee(e);
			}
			{
				t.v &= ~8;
			}
			{
				t.v |= 128;
			}
			e();
			Se(t.D);
		}
		if (l.style) {
			let e = l.style;
			const t = W(n);
			if (!He.has(t)) {
				const s = u("registerStyles", n.k);
				A(t, e, !!(n.v & 1));
				s();
			}
		}
	}
	const o = t.T;
	const i = () => ce(t, true);
	if (o && o["s-rc"]) {
		o["s-rc"].push(i);
	} else {
		i();
	}
};
const Se = (e) => {
	{
		he(e, "connectedCallback");
	}
};
const ke = (e) => {
	if ((Ie.v & 1) === 0) {
		const t = Ae(e);
		const n = t.S;
		const s = u("connectedCallback", n.k);
		if (!(t.v & 1)) {
			t.v |= 1;
			{
				if (n.v & (4 | 8)) {
					Ce(e);
				}
			}
			{
				let n = e;
				while ((n = n.parentNode || n.host)) {
					if (n["s-p"]) {
						ie(t, (t.T = n));
						break;
					}
				}
			}
			if (n.N) {
				Object.entries(n.N).map(([t, [n]]) => {
					if (n & 31 && e.hasOwnProperty(t)) {
						const n = e[t];
						delete e[t];
						e[t] = n;
					}
				});
			}
			{
				$e(e, t, n);
			}
		} else {
			Le(e, t, n.H);
			if (t === null || t === void 0 ? void 0 : t.D) {
				Se(t.D);
			} else if (t === null || t === void 0 ? void 0 : t.W) {
				t.W.then(() => Se(t.D));
			}
		}
		s();
	}
};
const Ce = (e) => {
	const t = (e["s-cr"] = qe.createComment(""));
	t["s-cn"] = true;
	e.insertBefore(t, e.firstChild);
};
const je = (e) => {
	{
		he(e, "disconnectedCallback");
	}
};
const xe = async (e) => {
	if ((Ie.v & 1) === 0) {
		const t = Ae(e);
		{
			if (t.q) {
				t.q.map((e) => e());
				t.q = undefined;
			}
		}
		if (t === null || t === void 0 ? void 0 : t.D) {
			je(t.D);
		} else if (t === null || t === void 0 ? void 0 : t.W) {
			t.W.then(() => je(t.D));
		}
	}
};
const Oe = (e, t = {}) => {
	var n;
	const s = u();
	const l = [];
	const o = t.exclude || [];
	const i = Qe.customElements;
	const c = qe.head;
	const f = c.querySelector("meta[charset]");
	const r = qe.createElement("style");
	const a = [];
	let d;
	let m = true;
	Object.assign(Ie, t);
	Ie.t = new URL(t.resourcesUrl || "./", qe.baseURI).href;
	let h = false;
	e.map((e) => {
		e[1].map((t) => {
			var n;
			const s = { v: t[0], k: t[1], N: t[2], H: t[3] };
			if (s.v & 4) {
				h = true;
			}
			{
				s.N = t[2];
			}
			{
				s.H = t[3];
			}
			{
				s.R = [];
			}
			{
				s.P = (n = t[4]) !== null && n !== void 0 ? n : {};
			}
			const c = s.k;
			const f = class extends HTMLElement {
				constructor(e) {
					super(e);
					e = this;
					Pe(e, s);
					if (s.v & 1) {
						{
							{
								e.attachShadow({ mode: "open" });
							}
						}
					}
				}
				connectedCallback() {
					if (d) {
						clearTimeout(d);
						d = null;
					}
					if (m) {
						a.push(this);
					} else {
						Ie.jmp(() => ke(this));
					}
				}
				disconnectedCallback() {
					Ie.jmp(() => xe(this));
				}
				componentOnReady() {
					return Ae(this).W;
				}
			};
			if (s.v & 64) {
				f.formAssociated = true;
			}
			s.I = e[0];
			if (!o.includes(c) && !i.get(c)) {
				l.push(c);
				i.define(c, ge(f, s, 1));
			}
		});
	});
	if (h) {
		r.innerHTML += v;
	}
	{
		r.innerHTML += l + p;
	}
	if (r.innerHTML.length) {
		r.setAttribute("data-styles", "");
		const e = (n = Ie.$) !== null && n !== void 0 ? n : S(qe);
		if (e != null) {
			r.setAttribute("nonce", e);
		}
		c.insertBefore(r, f ? f.nextSibling : c.firstChild);
	}
	m = false;
	if (a.length) {
		a.map((e) => e.connectedCallback());
	} else {
		{
			Ie.jmp(() => (d = setTimeout(me, 30)));
		}
	}
	s();
};
const Re = (e, t) => t;
const Le = (e, t, n, s) => {
	if (n) {
		n.map(([n, s, l]) => {
			const o = De(e, n);
			const i = Te(t, l);
			const c = Fe(n);
			Ie.ael(o, s, i, c);
			(t.q = t.q || []).push(() => Ie.rel(o, s, i, c));
		});
	}
};
const Te = (e, t) => (n) => {
	try {
		{
			if (e.v & 256) {
				e.D[t](n);
			} else {
				(e.F = e.F || []).push([t, n]);
			}
		}
	} catch (e) {
		Ee(e);
	}
};
const De = (e, t) => {
	if (t & 8) return Qe;
	return e;
};
const Fe = (e) => (Ke ? { passive: (e & 1) !== 0, capture: (e & 2) !== 0 } : (e & 2) !== 0);
const Me = (e) => (Ie.$ = e);
const Ue = new WeakMap();
const Ae = (e) => Ue.get(e);
const Ne = (e, t) => Ue.set((t.D = e), t);
const Pe = (e, t) => {
	const n = { v: 0, $hostElement$: e, S: t, A: new Map() };
	{
		n.B = new Promise((e) => (n.U = e));
	}
	{
		n.W = new Promise((e) => (n.M = e));
		e["s-p"] = [];
		e["s-rc"] = [];
	}
	Le(e, n, t.H);
	return Ue.set(e, n);
};
const We = (e, t) => t in e;
const Ee = (e, t) => (0, console.error)(e, t);
const ze = new Map();
const Be = (e, t, n) => {
	const s = e.k.replace(/-/g, "_");
	const l = e.I;
	const o = ze.get(l);
	if (o) {
		return o[s];
	}
	/*!__STENCIL_STATIC_IMPORT_SWITCH__*/ return import(`./${l}.entry.js${""}`).then((e) => {
		{
			ze.set(l, e);
		}
		return e[s];
	}, Ee);
};
const He = new Map();
const Qe = typeof window !== "undefined" ? window : {};
const qe = Qe.document || { head: {} };
const Ie = {
	v: 0,
	t: "",
	jmp: (e) => e(),
	raf: (e) => requestAnimationFrame(e),
	ael: (e, t, n, s) => e.addEventListener(t, n, s),
	rel: (e, t, n, s) => e.removeEventListener(t, n, s),
	ce: (e, t) => new CustomEvent(e, t),
};
const Ke = (() => {
	let e = false;
	try {
		qe.addEventListener(
			"e",
			null,
			Object.defineProperty({}, "passive", {
				get() {
					e = true;
				},
			}),
		);
	} catch (e) {}
	return e;
})();
const Ve = (e) => Promise.resolve(e);
const Xe = (() => {
	try {
		new CSSStyleSheet();
		return typeof new CSSStyleSheet().replaceSync === "function";
	} catch (e) {}
	return false;
})();
const _e = [];
const Ge = [];
const Je = (e, t) => (n) => {
	e.push(n);
	if (!r) {
		r = true;
		if (t && Ie.v & 4) {
			et(Ze);
		} else {
			Ie.raf(Ze);
		}
	}
};
const Ye = (e) => {
	for (let t = 0; t < e.length; t++) {
		try {
			e[t](performance.now());
		} catch (e) {
			Ee(e);
		}
	}
	e.length = 0;
};
const Ze = () => {
	Ye(_e);
	{
		Ye(Ge);
		if ((r = _e.length > 0)) {
			Ie.raf(Ze);
		}
	}
};
const et = (e) => Ve().then(e);
const tt = Je(Ge, true);
export { Re as F, j as H, a, Oe as b, F as c, ve as f, D as g, k as h, Ve as p, Ne as r, Me as s };
//# sourceMappingURL=p-2bbc009f.js.map
