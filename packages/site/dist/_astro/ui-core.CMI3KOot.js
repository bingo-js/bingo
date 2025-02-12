import { _ as is } from "./Search.astro_astro_type_script_index_0_lang.Di8WMhrZ.js";
var os = Object.defineProperty,
	F = (e, u) => {
		for (var t in u) {
			os(e, t, { get: u[t], enumerable: !0 });
		}
	};
function P() {}
function hu(e) {
	return e();
}
function ye() {
	return Object.create(null);
}
function W(e) {
	e.forEach(hu);
}
function Cu(e) {
	return typeof e == "function";
}
function fe(e, u) {
	return e != e
		? u == u
		: e !== u || (e && typeof e == "object") || typeof e == "function";
}
var oe;
function ce(e, u) {
	return oe || (oe = document.createElement("a")), (oe.href = u), e === oe.href;
}
function _s(e) {
	return Object.keys(e).length === 0;
}
function B(e, u) {
	e.appendChild(u);
}
function T(e, u, t) {
	e.insertBefore(u, t || null);
}
function v(e) {
	e.parentNode && e.parentNode.removeChild(e);
}
function ie(e, u) {
	for (let t = 0; t < e.length; t += 1) {
		e[t] && e[t].d(u);
	}
}
function p(e) {
	return document.createElement(e);
}
function cs(e) {
	return document.createElementNS("http://www.w3.org/2000/svg", e);
}
function M(e) {
	return document.createTextNode(e);
}
function b() {
	return M(" ");
}
function ee() {
	return M("");
}
function G(e, u, t, r) {
	return e.addEventListener(u, t, r), () => e.removeEventListener(u, t, r);
}
function g(e, u, t) {
	t == null
		? e.removeAttribute(u)
		: e.getAttribute(u) !== t && e.setAttribute(u, t);
}
function fs(e) {
	return Array.from(e.childNodes);
}
function j(e, u) {
	(u = "" + u), e.data !== u && (e.data = u);
}
function ze(e, u) {
	e.value = u ?? "";
}
function K(e, u, t) {
	e.classList[t ? "add" : "remove"](u);
}
var Es = class {
		constructor(e = !1) {
			(this.is_svg = !1), (this.is_svg = e), (this.e = this.n = null);
		}
		c(e) {
			this.h(e);
		}
		m(e, u, t = null) {
			this.e ||
				(this.is_svg
					? (this.e = cs(u.nodeName))
					: (this.e = p(u.nodeType === 11 ? "TEMPLATE" : u.nodeName)),
				(this.t = u.tagName !== "TEMPLATE" ? u : u.content),
				this.c(e)),
				this.i(t);
		}
		h(e) {
			(this.e.innerHTML = e),
				(this.n = Array.from(
					this.e.nodeName === "TEMPLATE"
						? this.e.content.childNodes
						: this.e.childNodes,
				));
		}
		i(e) {
			for (let u = 0; u < this.n.length; u += 1) {
				T(this.t, this.n[u], e);
			}
		}
		p(e) {
			this.d(), this.h(e), this.i(this.a);
		}
		d() {
			this.n.forEach(v);
		}
	},
	se;
function re(e) {
	se = e;
}
function mu() {
	if (!se) {
		throw new Error("Function called outside component initialization");
	}
	return se;
}
function ds(e) {
	mu().$$.on_mount.push(e);
}
function hs(e) {
	mu().$$.on_destroy.push(e);
}
var X = [],
	ae = [],
	$ = [],
	pe = [],
	Cs = Promise.resolve(),
	ve = !1;
function ms() {
	ve || ((ve = !0), Cs.then(gu));
}
function Te(e) {
	$.push(e);
}
function gs(e) {
	pe.push(e);
}
var Be = new Set(),
	Y = 0;
function gu() {
	if (Y !== 0) {
		return;
	}
	const e = se;
	do {
		try {
			for (; Y < X.length; ) {
				const u = X[Y];
				Y++, re(u), As(u.$$);
			}
		} catch (u) {
			throw ((X.length = 0), (Y = 0), u);
		}
		for (re(null), X.length = 0, Y = 0; ae.length; ) {
			ae.pop()();
		}
		for (let u = 0; u < $.length; u += 1) {
			const t = $[u];
			Be.has(t) || (Be.add(t), t());
		}
		$.length = 0;
	} while (X.length);
	for (; pe.length; ) {
		pe.pop()();
	}
	(ve = !1), Be.clear(), re(e);
}
function As(e) {
	if (e.fragment !== null) {
		e.update(), W(e.before_update);
		const u = e.dirty;
		(e.dirty = [-1]),
			e.fragment && e.fragment.p(e.ctx, u),
			e.after_update.forEach(Te);
	}
}
function Rs(e) {
	const u = [],
		t = [];
	$.forEach((r) => (e.indexOf(r) === -1 ? u.push(r) : t.push(r))),
		t.forEach((r) => r()),
		($ = u);
}
var _e = new Set(),
	J;
function le() {
	J = { r: 0, c: [], p: J };
}
function ne() {
	J.r || W(J.c), (J = J.p);
}
function z(e, u) {
	e && e.i && (_e.delete(e), e.i(u));
}
function U(e, u, t, r) {
	if (e && e.o) {
		if (_e.has(e)) {
			return;
		}
		_e.add(e),
			J.c.push(() => {
				_e.delete(e), r && (t && e.d(1), r());
			}),
			e.o(u);
	} else {
		r && r();
	}
}
function Bs(e, u) {
	U(e, 1, 1, () => {
		u.delete(e.key);
	});
}
function ps(e, u, t, r, s, a, l, n, i, f, o, h) {
	let C = e.length,
		E = a.length,
		c = C;
	const _ = {};
	for (; c--; ) {
		_[e[c].key] = c;
	}
	const d = [],
		R = new Map(),
		A = new Map(),
		k = [];
	for (c = E; c--; ) {
		const D = h(s, a, c),
			S = t(D);
		let w = l.get(S);
		w ? k.push(() => w.p(D, u)) : ((w = f(S, D)), w.c()),
			R.set(S, (d[c] = w)),
			S in _ && A.set(S, Math.abs(c - _[S]));
	}
	const y = new Set(),
		q = new Set();
	function L(D) {
		z(D, 1), D.m(n, o), l.set(D.key, D), (o = D.first), E--;
	}
	for (; C && E; ) {
		const D = d[E - 1],
			S = e[C - 1],
			w = D.key,
			x = S.key;
		D === S
			? ((o = D.first), C--, E--)
			: R.has(x)
				? !l.has(w) || y.has(w)
					? L(D)
					: q.has(x)
						? C--
						: A.get(w) > A.get(x)
							? (q.add(w), L(D))
							: (y.add(x), C--)
				: (i(S, l), C--);
	}
	for (; C--; ) {
		const D = e[C];
		R.has(D.key) || i(D, l);
	}
	for (; E; ) {
		L(d[E - 1]);
	}
	return W(k), d;
}
function vs(e, u, t) {
	const r = e.$$.props[u];
	r !== void 0 && ((e.$$.bound[r] = t), t(e.$$.ctx[r]));
}
function ke(e) {
	e && e.c();
}
function Ee(e, u, t, r) {
	const { fragment: s, after_update: a } = e.$$;
	s && s.m(u, t),
		r ||
			Te(() => {
				const l = e.$$.on_mount.map(hu).filter(Cu);
				e.$$.on_destroy ? e.$$.on_destroy.push(...l) : W(l),
					(e.$$.on_mount = []);
			}),
		a.forEach(Te);
}
function de(e, u) {
	const t = e.$$;
	t.fragment !== null &&
		(Rs(t.after_update),
		W(t.on_destroy),
		t.fragment && t.fragment.d(u),
		(t.on_destroy = t.fragment = null),
		(t.ctx = []));
}
function Ts(e, u) {
	e.$$.dirty[0] === -1 && (X.push(e), ms(), e.$$.dirty.fill(0)),
		(e.$$.dirty[(u / 31) | 0] |= 1 << u % 31);
}
function he(e, u, t, r, s, a, l, n = [-1]) {
	const i = se;
	re(e);
	const f = (e.$$ = {
		fragment: null,
		ctx: [],
		props: a,
		update: P,
		not_equal: s,
		bound: ye(),
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(u.context || (i ? i.$$.context : [])),
		callbacks: ye(),
		dirty: n,
		skip_bound: !1,
		root: u.target || i.$$.root,
	});
	l && l(f.root);
	let o = !1;
	if (
		((f.ctx = t
			? t(e, u.props || {}, (h, C, ...E) => {
					const c = E.length ? E[0] : C;
					return (
						f.ctx &&
							s(f.ctx[h], (f.ctx[h] = c)) &&
							(!f.skip_bound && f.bound[h] && f.bound[h](c), o && Ts(e, h)),
						C
					);
				})
			: []),
		f.update(),
		(o = !0),
		W(f.before_update),
		(f.fragment = r ? r(f.ctx) : !1),
		u.target)
	) {
		if (u.hydrate) {
			const h = fs(u.target);
			f.fragment && f.fragment.l(h), h.forEach(v);
		} else {
			f.fragment && f.fragment.c();
		}
		u.intro && z(e.$$.fragment),
			Ee(e, u.target, u.anchor, u.customElement),
			gu();
	}
	re(i);
}
var Ce = class {
	$destroy() {
		de(this, 1), (this.$destroy = P);
	}
	$on(e, u) {
		if (!Cu(u)) {
			return P;
		}
		const t = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
		return (
			t.push(u),
			() => {
				const r = t.indexOf(u);
				r !== -1 && t.splice(r, 1);
			}
		);
	}
	$set(e) {
		this.$$set &&
			!_s(e) &&
			((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
	}
};
function O(e) {
	const u = typeof e == "string" ? e.charCodeAt(0) : e;
	return (u >= 97 && u <= 122) || (u >= 65 && u <= 90);
}
function Q(e) {
	const u = typeof e == "string" ? e.charCodeAt(0) : e;
	return u >= 48 && u <= 57;
}
function V(e) {
	return O(e) || Q(e);
}
var Fs = [
		"art-lojban",
		"cel-gaulish",
		"no-bok",
		"no-nyn",
		"zh-guoyu",
		"zh-hakka",
		"zh-min",
		"zh-min-nan",
		"zh-xiang",
	],
	je = {
		"en-gb-oed": "en-GB-oxendict",
		"i-ami": "ami",
		"i-bnn": "bnn",
		"i-default": null,
		"i-enochian": null,
		"i-hak": "hak",
		"i-klingon": "tlh",
		"i-lux": "lb",
		"i-mingo": null,
		"i-navajo": "nv",
		"i-pwn": "pwn",
		"i-tao": "tao",
		"i-tay": "tay",
		"i-tsu": "tsu",
		"sgn-be-fr": "sfb",
		"sgn-be-nl": "vgt",
		"sgn-ch-de": "sgg",
		"art-lojban": "jbo",
		"cel-gaulish": null,
		"no-bok": "nb",
		"no-nyn": "nn",
		"zh-guoyu": "cmn",
		"zh-hakka": "hak",
		"zh-min": null,
		"zh-min-nan": "nan",
		"zh-xiang": "hsn",
	},
	ks = {}.hasOwnProperty;
function Au(e, u = {}) {
	const t = Oe(),
		r = String(e),
		s = r.toLowerCase();
	let a = 0;
	if (e == null) {
		throw new Error("Expected string, got `" + e + "`");
	}
	if (ks.call(je, s)) {
		const n = je[s];
		return (u.normalize === void 0 || u.normalize === null || u.normalize) &&
			typeof n == "string"
			? Au(n)
			: ((t[Fs.includes(s) ? "regular" : "irregular"] = r), t);
	}
	for (; O(s.charCodeAt(a)) && a < 9; ) {
		a++;
	}
	if (a > 1 && a < 9) {
		if (((t.language = r.slice(0, a)), a < 4)) {
			let n = 0;
			for (
				;
				s.charCodeAt(a) === 45 &&
				O(s.charCodeAt(a + 1)) &&
				O(s.charCodeAt(a + 2)) &&
				O(s.charCodeAt(a + 3)) &&
				!O(s.charCodeAt(a + 4));

			) {
				if (n > 2) {
					return l(
						a,
						3,
						"Too many extended language subtags, expected at most 3 subtags",
					);
				}
				t.extendedLanguageSubtags.push(r.slice(a + 1, a + 4)), (a += 4), n++;
			}
		}
		for (
			s.charCodeAt(a) === 45 &&
				O(s.charCodeAt(a + 1)) &&
				O(s.charCodeAt(a + 2)) &&
				O(s.charCodeAt(a + 3)) &&
				O(s.charCodeAt(a + 4)) &&
				!O(s.charCodeAt(a + 5)) &&
				((t.script = r.slice(a + 1, a + 5)), (a += 5)),
				s.charCodeAt(a) === 45 &&
					(O(s.charCodeAt(a + 1)) &&
					O(s.charCodeAt(a + 2)) &&
					!O(s.charCodeAt(a + 3))
						? ((t.region = r.slice(a + 1, a + 3)), (a += 3))
						: Q(s.charCodeAt(a + 1)) &&
							Q(s.charCodeAt(a + 2)) &&
							Q(s.charCodeAt(a + 3)) &&
							!Q(s.charCodeAt(a + 4)) &&
							((t.region = r.slice(a + 1, a + 4)), (a += 4)));
			s.charCodeAt(a) === 45;

		) {
			const n = a + 1;
			let i = n;
			for (; V(s.charCodeAt(i)); ) {
				if (i - n > 7) {
					return l(i, 1, "Too long variant, expected at most 8 characters");
				}
				i++;
			}
			if (i - n > 4 || (i - n > 3 && Q(s.charCodeAt(n)))) {
				t.variants.push(r.slice(n, i)), (a = i);
			} else {
				break;
			}
		}
		for (
			;
			s.charCodeAt(a) === 45 &&
			!(
				s.charCodeAt(a + 1) === 120 ||
				!V(s.charCodeAt(a + 1)) ||
				s.charCodeAt(a + 2) !== 45 ||
				!V(s.charCodeAt(a + 3))
			);

		) {
			let n = a + 2,
				i = 0;
			for (
				;
				s.charCodeAt(n) === 45 &&
				V(s.charCodeAt(n + 1)) &&
				V(s.charCodeAt(n + 2));

			) {
				const f = n + 1;
				for (n = f + 2, i++; V(s.charCodeAt(n)); ) {
					if (n - f > 7) {
						return l(n, 2, "Too long extension, expected at most 8 characters");
					}
					n++;
				}
			}
			if (!i) {
				return l(
					n,
					4,
					"Empty extension, extensions must have at least 2 characters of content",
				);
			}
			t.extensions.push({
				singleton: r.charAt(a + 1),
				extensions: r.slice(a + 3, n).split("-"),
			}),
				(a = n);
		}
	} else {
		a = 0;
	}
	if (
		(a === 0 && s.charCodeAt(a) === 120) ||
		(s.charCodeAt(a) === 45 && s.charCodeAt(a + 1) === 120)
	) {
		a = a ? a + 2 : 1;
		let n = a;
		for (; s.charCodeAt(n) === 45 && V(s.charCodeAt(n + 1)); ) {
			const i = a + 1;
			for (n = i; V(s.charCodeAt(n)); ) {
				if (n - i > 7) {
					return l(
						n,
						5,
						"Too long private-use area, expected at most 8 characters",
					);
				}
				n++;
			}
			t.privateuse.push(r.slice(a + 1, n)), (a = n);
		}
	}
	if (a !== r.length) {
		return l(a, 6, "Found superfluous content after tag");
	}
	return t;
	function l(n, i, f) {
		return u.warning && u.warning(f, i, n), u.forgiving ? t : Oe();
	}
}
function Oe() {
	return {
		language: null,
		extendedLanguageSubtags: [],
		script: null,
		region: null,
		variants: [],
		extensions: [],
		privateuse: [],
		irregular: null,
		regular: null,
	};
}
function Ue(e, u, t) {
	const r = e.slice();
	return (r[8] = u[t][0]), (r[9] = u[t][1]), r;
}
function Ds(e) {
	let u,
		t,
		r,
		s,
		a,
		l = e[0] && Ie();
	return {
		c() {
			l && l.c(),
				(u = b()),
				(t = p("div")),
				(r = p("p")),
				(r.textContent = `${e[3](30)}`),
				(s = b()),
				(a = p("p")),
				(a.textContent = `${e[3](40)}`),
				g(
					r,
					"class",
					"pagefind-ui__result-title pagefind-ui__loading svelte-j9e30",
				),
				g(
					a,
					"class",
					"pagefind-ui__result-excerpt pagefind-ui__loading svelte-j9e30",
				),
				g(t, "class", "pagefind-ui__result-inner svelte-j9e30");
		},
		m(n, i) {
			l && l.m(n, i), T(n, u, i), T(n, t, i), B(t, r), B(t, s), B(t, a);
		},
		p(n, i) {
			n[0]
				? l || ((l = Ie()), l.c(), l.m(u.parentNode, u))
				: l && (l.d(1), (l = null));
		},
		d(n) {
			l && l.d(n), n && v(u), n && v(t);
		},
	};
}
function bs(e) {
	let u,
		t,
		r,
		s,
		a = e[1].meta?.title + "",
		l,
		n,
		i,
		f,
		o = e[1].excerpt + "",
		h,
		C = e[0] && Pe(e),
		E = e[2].length && xe(e);
	return {
		c() {
			C && C.c(),
				(u = b()),
				(t = p("div")),
				(r = p("p")),
				(s = p("a")),
				(l = M(a)),
				(i = b()),
				(f = p("p")),
				(h = b()),
				E && E.c(),
				g(s, "class", "pagefind-ui__result-link svelte-j9e30"),
				g(s, "href", (n = e[1].meta?.url || e[1].url)),
				g(r, "class", "pagefind-ui__result-title svelte-j9e30"),
				g(f, "class", "pagefind-ui__result-excerpt svelte-j9e30"),
				g(t, "class", "pagefind-ui__result-inner svelte-j9e30");
		},
		m(c, _) {
			C && C.m(c, _),
				T(c, u, _),
				T(c, t, _),
				B(t, r),
				B(r, s),
				B(s, l),
				B(t, i),
				B(t, f),
				(f.innerHTML = o),
				B(t, h),
				E && E.m(t, null);
		},
		p(c, _) {
			c[0]
				? C
					? C.p(c, _)
					: ((C = Pe(c)), C.c(), C.m(u.parentNode, u))
				: C && (C.d(1), (C = null)),
				_ & 2 && a !== (a = c[1].meta?.title + "") && j(l, a),
				_ & 2 && n !== (n = c[1].meta?.url || c[1].url) && g(s, "href", n),
				_ & 2 && o !== (o = c[1].excerpt + "") && (f.innerHTML = o),
				c[2].length
					? E
						? E.p(c, _)
						: ((E = xe(c)), E.c(), E.m(t, null))
					: E && (E.d(1), (E = null));
		},
		d(c) {
			C && C.d(c), c && v(u), c && v(t), E && E.d();
		},
	};
}
function Ie(e) {
	let u;
	return {
		c() {
			(u = p("div")),
				g(
					u,
					"class",
					"pagefind-ui__result-thumb pagefind-ui__loading svelte-j9e30",
				);
		},
		m(t, r) {
			T(t, u, r);
		},
		d(t) {
			t && v(u);
		},
	};
}
function Pe(e) {
	let u,
		t = e[1].meta.image && Le(e);
	return {
		c() {
			(u = p("div")),
				t && t.c(),
				g(u, "class", "pagefind-ui__result-thumb svelte-j9e30");
		},
		m(r, s) {
			T(r, u, s), t && t.m(u, null);
		},
		p(r, s) {
			r[1].meta.image
				? t
					? t.p(r, s)
					: ((t = Le(r)), t.c(), t.m(u, null))
				: t && (t.d(1), (t = null));
		},
		d(r) {
			r && v(u), t && t.d();
		},
	};
}
function Le(e) {
	let u, t, r;
	return {
		c() {
			(u = p("img")),
				g(u, "class", "pagefind-ui__result-image svelte-j9e30"),
				ce(u.src, (t = e[1].meta?.image)) || g(u, "src", t),
				g(u, "alt", (r = e[1].meta?.image_alt || e[1].meta?.title));
		},
		m(s, a) {
			T(s, u, a);
		},
		p(s, a) {
			a & 2 && !ce(u.src, (t = s[1].meta?.image)) && g(u, "src", t),
				a & 2 &&
					r !== (r = s[1].meta?.image_alt || s[1].meta?.title) &&
					g(u, "alt", r);
		},
		d(s) {
			s && v(u);
		},
	};
}
function xe(e) {
	let u,
		t = e[2],
		r = [];
	for (let s = 0; s < t.length; s += 1) {
		r[s] = qe(Ue(e, t, s));
	}
	return {
		c() {
			u = p("ul");
			for (let s = 0; s < r.length; s += 1) {
				r[s].c();
			}
			g(u, "class", "pagefind-ui__result-tags svelte-j9e30");
		},
		m(s, a) {
			T(s, u, a);
			for (let l = 0; l < r.length; l += 1) {
				r[l] && r[l].m(u, null);
			}
		},
		p(s, a) {
			if (a & 4) {
				t = s[2];
				let l;
				for (l = 0; l < t.length; l += 1) {
					const n = Ue(s, t, l);
					r[l] ? r[l].p(n, a) : ((r[l] = qe(n)), r[l].c(), r[l].m(u, null));
				}
				for (; l < r.length; l += 1) {
					r[l].d(1);
				}
				r.length = t.length;
			}
		},
		d(s) {
			s && v(u), ie(r, s);
		},
	};
}
function qe(e) {
	let u,
		t = e[8].replace(/^(\w)/, Ve) + "",
		r,
		s,
		a = e[9] + "",
		l,
		n,
		i;
	return {
		c() {
			(u = p("li")),
				(r = M(t)),
				(s = M(": ")),
				(l = M(a)),
				(n = b()),
				g(u, "class", "pagefind-ui__result-tag svelte-j9e30"),
				g(u, "data-pagefind-ui-meta", (i = e[8]));
		},
		m(f, o) {
			T(f, u, o), B(u, r), B(u, s), B(u, l), B(u, n);
		},
		p(f, o) {
			o & 4 && t !== (t = f[8].replace(/^(\w)/, Ve) + "") && j(r, t),
				o & 4 && a !== (a = f[9] + "") && j(l, a),
				o & 4 && i !== (i = f[8]) && g(u, "data-pagefind-ui-meta", i);
		},
		d(f) {
			f && v(u);
		},
	};
}
function Ms(e) {
	let u;
	function t(a, l) {
		return a[1] ? bs : Ds;
	}
	let r = t(e),
		s = r(e);
	return {
		c() {
			(u = p("li")), s.c(), g(u, "class", "pagefind-ui__result svelte-j9e30");
		},
		m(a, l) {
			T(a, u, l), s.m(u, null);
		},
		p(a, [l]) {
			r === (r = t(a)) && s
				? s.p(a, l)
				: (s.d(1), (s = r(a)), s && (s.c(), s.m(u, null)));
		},
		i: P,
		o: P,
		d(a) {
			a && v(u), s.d();
		},
	};
}
var Ve = (e) => e.toLocaleUpperCase();
function Ss(e, u, t) {
	let { show_images: r = !0 } = u,
		{ process_result: s = null } = u,
		{ result: a = { data: async () => {} } } = u;
	const l = ["title", "image", "image_alt", "url"];
	let n,
		i = [];
	const f = async (h) => {
			t(1, (n = await h.data())),
				t(1, (n = s?.(n) ?? n)),
				t(2, (i = Object.entries(n.meta).filter(([C]) => !l.includes(C))));
		},
		o = (h = 30) => ". ".repeat(Math.floor(10 + Math.random() * h));
	return (
		(e.$$set = (h) => {
			"show_images" in h && t(0, (r = h.show_images)),
				"process_result" in h && t(4, (s = h.process_result)),
				"result" in h && t(5, (a = h.result));
		}),
		(e.$$.update = () => {
			e.$$.dirty & 32 && f(a);
		}),
		[r, n, i, o, s, a]
	);
}
var Hs = class extends Ce {
		constructor(e) {
			super(),
				he(this, e, Ss, Ms, fe, {
					show_images: 0,
					process_result: 4,
					result: 5,
				});
		}
	},
	ws = Hs;
function Ke(e, u, t) {
	const r = e.slice();
	return (r[11] = u[t][0]), (r[12] = u[t][1]), r;
}
function Ge(e, u, t) {
	const r = e.slice();
	return (r[15] = u[t]), r;
}
function Ns(e) {
	let u,
		t,
		r,
		s,
		a,
		l = e[0] && Je();
	return {
		c() {
			l && l.c(),
				(u = b()),
				(t = p("div")),
				(r = p("p")),
				(r.textContent = `${e[5](30)}`),
				(s = b()),
				(a = p("p")),
				(a.textContent = `${e[5](40)}`),
				g(
					r,
					"class",
					"pagefind-ui__result-title pagefind-ui__loading svelte-4xnkmf",
				),
				g(
					a,
					"class",
					"pagefind-ui__result-excerpt pagefind-ui__loading svelte-4xnkmf",
				),
				g(t, "class", "pagefind-ui__result-inner svelte-4xnkmf");
		},
		m(n, i) {
			l && l.m(n, i), T(n, u, i), T(n, t, i), B(t, r), B(t, s), B(t, a);
		},
		p(n, i) {
			n[0]
				? l || ((l = Je()), l.c(), l.m(u.parentNode, u))
				: l && (l.d(1), (l = null));
		},
		d(n) {
			l && l.d(n), n && v(u), n && v(t);
		},
	};
}
function ys(e) {
	let u,
		t,
		r,
		s,
		a = e[1].meta?.title + "",
		l,
		n,
		i,
		f,
		o,
		h = e[0] && We(e),
		C = e[4] && Ye(e),
		E = e[3],
		c = [];
	for (let d = 0; d < E.length; d += 1) {
		c[d] = Xe(Ge(e, E, d));
	}
	let _ = e[2].length && Qe(e);
	return {
		c() {
			h && h.c(),
				(u = b()),
				(t = p("div")),
				(r = p("p")),
				(s = p("a")),
				(l = M(a)),
				(i = b()),
				C && C.c(),
				(f = b());
			for (let d = 0; d < c.length; d += 1) {
				c[d].c();
			}
			(o = b()),
				_ && _.c(),
				g(s, "class", "pagefind-ui__result-link svelte-4xnkmf"),
				g(s, "href", (n = e[1].meta?.url || e[1].url)),
				g(r, "class", "pagefind-ui__result-title svelte-4xnkmf"),
				g(t, "class", "pagefind-ui__result-inner svelte-4xnkmf");
		},
		m(d, R) {
			h && h.m(d, R),
				T(d, u, R),
				T(d, t, R),
				B(t, r),
				B(r, s),
				B(s, l),
				B(t, i),
				C && C.m(t, null),
				B(t, f);
			for (let A = 0; A < c.length; A += 1) {
				c[A] && c[A].m(t, null);
			}
			B(t, o), _ && _.m(t, null);
		},
		p(d, R) {
			if (
				(d[0]
					? h
						? h.p(d, R)
						: ((h = We(d)), h.c(), h.m(u.parentNode, u))
					: h && (h.d(1), (h = null)),
				R & 2 && a !== (a = d[1].meta?.title + "") && j(l, a),
				R & 2 && n !== (n = d[1].meta?.url || d[1].url) && g(s, "href", n),
				d[4]
					? C
						? C.p(d, R)
						: ((C = Ye(d)), C.c(), C.m(t, f))
					: C && (C.d(1), (C = null)),
				R & 8)
			) {
				E = d[3];
				let A;
				for (A = 0; A < E.length; A += 1) {
					const k = Ge(d, E, A);
					c[A] ? c[A].p(k, R) : ((c[A] = Xe(k)), c[A].c(), c[A].m(t, o));
				}
				for (; A < c.length; A += 1) {
					c[A].d(1);
				}
				c.length = E.length;
			}
			d[2].length
				? _
					? _.p(d, R)
					: ((_ = Qe(d)), _.c(), _.m(t, null))
				: _ && (_.d(1), (_ = null));
		},
		d(d) {
			h && h.d(d), d && v(u), d && v(t), C && C.d(), ie(c, d), _ && _.d();
		},
	};
}
function Je(e) {
	let u;
	return {
		c() {
			(u = p("div")),
				g(
					u,
					"class",
					"pagefind-ui__result-thumb pagefind-ui__loading svelte-4xnkmf",
				);
		},
		m(t, r) {
			T(t, u, r);
		},
		d(t) {
			t && v(u);
		},
	};
}
function We(e) {
	let u,
		t = e[1].meta.image && Ze(e);
	return {
		c() {
			(u = p("div")),
				t && t.c(),
				g(u, "class", "pagefind-ui__result-thumb svelte-4xnkmf");
		},
		m(r, s) {
			T(r, u, s), t && t.m(u, null);
		},
		p(r, s) {
			r[1].meta.image
				? t
					? t.p(r, s)
					: ((t = Ze(r)), t.c(), t.m(u, null))
				: t && (t.d(1), (t = null));
		},
		d(r) {
			r && v(u), t && t.d();
		},
	};
}
function Ze(e) {
	let u, t, r;
	return {
		c() {
			(u = p("img")),
				g(u, "class", "pagefind-ui__result-image svelte-4xnkmf"),
				ce(u.src, (t = e[1].meta?.image)) || g(u, "src", t),
				g(u, "alt", (r = e[1].meta?.image_alt || e[1].meta?.title));
		},
		m(s, a) {
			T(s, u, a);
		},
		p(s, a) {
			a & 2 && !ce(u.src, (t = s[1].meta?.image)) && g(u, "src", t),
				a & 2 &&
					r !== (r = s[1].meta?.image_alt || s[1].meta?.title) &&
					g(u, "alt", r);
		},
		d(s) {
			s && v(u);
		},
	};
}
function Ye(e) {
	let u,
		t = e[1].excerpt + "";
	return {
		c() {
			(u = p("p")), g(u, "class", "pagefind-ui__result-excerpt svelte-4xnkmf");
		},
		m(r, s) {
			T(r, u, s), (u.innerHTML = t);
		},
		p(r, s) {
			s & 2 && t !== (t = r[1].excerpt + "") && (u.innerHTML = t);
		},
		d(r) {
			r && v(u);
		},
	};
}
function Xe(e) {
	let u,
		t,
		r,
		s = e[15].title + "",
		a,
		l,
		n,
		i,
		f = e[15].excerpt + "";
	return {
		c() {
			(u = p("div")),
				(t = p("p")),
				(r = p("a")),
				(a = M(s)),
				(n = b()),
				(i = p("p")),
				g(r, "class", "pagefind-ui__result-link svelte-4xnkmf"),
				g(r, "href", (l = e[15].url)),
				g(t, "class", "pagefind-ui__result-title svelte-4xnkmf"),
				g(i, "class", "pagefind-ui__result-excerpt svelte-4xnkmf"),
				g(u, "class", "pagefind-ui__result-nested svelte-4xnkmf");
		},
		m(o, h) {
			T(o, u, h),
				B(u, t),
				B(t, r),
				B(r, a),
				B(u, n),
				B(u, i),
				(i.innerHTML = f);
		},
		p(o, h) {
			h & 8 && s !== (s = o[15].title + "") && j(a, s),
				h & 8 && l !== (l = o[15].url) && g(r, "href", l),
				h & 8 && f !== (f = o[15].excerpt + "") && (i.innerHTML = f);
		},
		d(o) {
			o && v(u);
		},
	};
}
function Qe(e) {
	let u,
		t = e[2],
		r = [];
	for (let s = 0; s < t.length; s += 1) {
		r[s] = $e(Ke(e, t, s));
	}
	return {
		c() {
			u = p("ul");
			for (let s = 0; s < r.length; s += 1) {
				r[s].c();
			}
			g(u, "class", "pagefind-ui__result-tags svelte-4xnkmf");
		},
		m(s, a) {
			T(s, u, a);
			for (let l = 0; l < r.length; l += 1) {
				r[l] && r[l].m(u, null);
			}
		},
		p(s, a) {
			if (a & 4) {
				t = s[2];
				let l;
				for (l = 0; l < t.length; l += 1) {
					const n = Ke(s, t, l);
					r[l] ? r[l].p(n, a) : ((r[l] = $e(n)), r[l].c(), r[l].m(u, null));
				}
				for (; l < r.length; l += 1) {
					r[l].d(1);
				}
				r.length = t.length;
			}
		},
		d(s) {
			s && v(u), ie(r, s);
		},
	};
}
function $e(e) {
	let u,
		t = e[11].replace(/^(\w)/, eu) + "",
		r,
		s,
		a = e[12] + "",
		l,
		n,
		i;
	return {
		c() {
			(u = p("li")),
				(r = M(t)),
				(s = M(": ")),
				(l = M(a)),
				(n = b()),
				g(u, "class", "pagefind-ui__result-tag svelte-4xnkmf"),
				g(u, "data-pagefind-ui-meta", (i = e[11]));
		},
		m(f, o) {
			T(f, u, o), B(u, r), B(u, s), B(u, l), B(u, n);
		},
		p(f, o) {
			o & 4 && t !== (t = f[11].replace(/^(\w)/, eu) + "") && j(r, t),
				o & 4 && a !== (a = f[12] + "") && j(l, a),
				o & 4 && i !== (i = f[11]) && g(u, "data-pagefind-ui-meta", i);
		},
		d(f) {
			f && v(u);
		},
	};
}
function zs(e) {
	let u;
	function t(a, l) {
		return a[1] ? ys : Ns;
	}
	let r = t(e),
		s = r(e);
	return {
		c() {
			(u = p("li")), s.c(), g(u, "class", "pagefind-ui__result svelte-4xnkmf");
		},
		m(a, l) {
			T(a, u, l), s.m(u, null);
		},
		p(a, [l]) {
			r === (r = t(a)) && s
				? s.p(a, l)
				: (s.d(1), (s = r(a)), s && (s.c(), s.m(u, null)));
		},
		i: P,
		o: P,
		d(a) {
			a && v(u), s.d();
		},
	};
}
var eu = (e) => e.toLocaleUpperCase();
function js(e, u, t) {
	let { show_images: r = !0 } = u,
		{ process_result: s = null } = u,
		{ result: a = { data: async () => {} } } = u;
	const l = ["title", "image", "image_alt", "url"];
	let n,
		i = [],
		f = [],
		o = !1;
	const h = (c, _) => {
			if (c.length <= _) {
				return c;
			}
			const d = [...c]
				.sort((R, A) => A.locations.length - R.locations.length)
				.slice(0, 3)
				.map((R) => R.url);
			return c.filter((R) => d.includes(R.url));
		},
		C = async (c) => {
			t(1, (n = await c.data())),
				t(1, (n = s?.(n) ?? n)),
				t(2, (i = Object.entries(n.meta).filter(([_]) => !l.includes(_)))),
				Array.isArray(n.sub_results) &&
					(t(4, (o = n.sub_results?.[0]?.url === (n.meta?.url || n.url))),
					o
						? t(3, (f = h(n.sub_results.slice(1), 3)))
						: t(3, (f = h([...n.sub_results], 3))));
		},
		E = (c = 30) => ". ".repeat(Math.floor(10 + Math.random() * c));
	return (
		(e.$$set = (c) => {
			"show_images" in c && t(0, (r = c.show_images)),
				"process_result" in c && t(6, (s = c.process_result)),
				"result" in c && t(7, (a = c.result));
		}),
		(e.$$.update = () => {
			e.$$.dirty & 128 && C(a);
		}),
		[r, n, i, f, o, E, s, a]
	);
}
var Os = class extends Ce {
		constructor(e) {
			super(),
				he(this, e, js, zs, fe, {
					show_images: 0,
					process_result: 6,
					result: 7,
				});
		}
	},
	Us = Os;
function uu(e, u, t) {
	const r = e.slice();
	return (r[10] = u[t][0]), (r[11] = u[t][1]), (r[12] = u), (r[13] = t), r;
}
function tu(e, u, t) {
	const r = e.slice();
	return (r[14] = u[t][0]), (r[15] = u[t][1]), (r[16] = u), (r[17] = t), r;
}
function ru(e) {
	let u,
		t,
		r = e[4]("filters_label", e[5], e[6]) + "",
		s,
		a,
		l = Object.entries(e[1]),
		n = [];
	for (let i = 0; i < l.length; i += 1) {
		n[i] = lu(uu(e, l, i));
	}
	return {
		c() {
			(u = p("fieldset")), (t = p("legend")), (s = M(r)), (a = b());
			for (let i = 0; i < n.length; i += 1) {
				n[i].c();
			}
			g(t, "class", "pagefind-ui__filter-panel-label svelte-1v2r7ls"),
				g(u, "class", "pagefind-ui__filter-panel svelte-1v2r7ls");
		},
		m(i, f) {
			T(i, u, f), B(u, t), B(t, s), B(u, a);
			for (let o = 0; o < n.length; o += 1) {
				n[o] && n[o].m(u, null);
			}
		},
		p(i, f) {
			if (
				(f & 112 &&
					r !== (r = i[4]("filters_label", i[5], i[6]) + "") &&
					j(s, r),
				f & 143)
			) {
				l = Object.entries(i[1]);
				let o;
				for (o = 0; o < l.length; o += 1) {
					const h = uu(i, l, o);
					n[o] ? n[o].p(h, f) : ((n[o] = lu(h)), n[o].c(), n[o].m(u, null));
				}
				for (; o < n.length; o += 1) {
					n[o].d(1);
				}
				n.length = l.length;
			}
		},
		d(i) {
			i && v(u), ie(n, i);
		},
	};
}
function su(e) {
	let u,
		t,
		r,
		s,
		a,
		l,
		n,
		i,
		f = e[14] + "",
		o,
		h = e[15] + "",
		C,
		E,
		c,
		_,
		d,
		R;
	function A() {
		e[9].call(t, e[10], e[14]);
	}
	return {
		c() {
			(u = p("div")),
				(t = p("input")),
				(l = b()),
				(n = p("label")),
				(i = new Es(!1)),
				(o = M(" (")),
				(C = M(h)),
				(E = M(")")),
				(_ = b()),
				g(t, "class", "pagefind-ui__filter-checkbox svelte-1v2r7ls"),
				g(t, "type", "checkbox"),
				g(t, "id", (r = e[10] + "-" + e[14])),
				g(t, "name", (s = e[10])),
				(t.__value = a = e[14]),
				(t.value = t.__value),
				(i.a = o),
				g(n, "class", "pagefind-ui__filter-label svelte-1v2r7ls"),
				g(n, "for", (c = e[10] + "-" + e[14])),
				g(u, "class", "pagefind-ui__filter-value svelte-1v2r7ls"),
				K(u, "pagefind-ui__filter-value--checked", e[0][`${e[10]}:${e[14]}`]);
		},
		m(k, y) {
			T(k, u, y),
				B(u, t),
				(t.checked = e[0][`${e[10]}:${e[14]}`]),
				B(u, l),
				B(u, n),
				i.m(f, n),
				B(n, o),
				B(n, C),
				B(n, E),
				B(u, _),
				d || ((R = G(t, "change", A)), (d = !0));
		},
		p(k, y) {
			(e = k),
				y & 2 && r !== (r = e[10] + "-" + e[14]) && g(t, "id", r),
				y & 2 && s !== (s = e[10]) && g(t, "name", s),
				y & 2 && a !== (a = e[14]) && ((t.__value = a), (t.value = t.__value)),
				y & 3 && (t.checked = e[0][`${e[10]}:${e[14]}`]),
				y & 2 && f !== (f = e[14] + "") && i.p(f),
				y & 2 && h !== (h = e[15] + "") && j(C, h),
				y & 2 && c !== (c = e[10] + "-" + e[14]) && g(n, "for", c),
				y & 3 &&
					K(u, "pagefind-ui__filter-value--checked", e[0][`${e[10]}:${e[14]}`]);
		},
		d(k) {
			k && v(u), (d = !1), R();
		},
	};
}
function au(e) {
	let u,
		t = (e[2] || e[15] || e[0][`${e[10]}:${e[14]}`]) && su(e);
	return {
		c() {
			t && t.c(), (u = ee());
		},
		m(r, s) {
			t && t.m(r, s), T(r, u, s);
		},
		p(r, s) {
			r[2] || r[15] || r[0][`${r[10]}:${r[14]}`]
				? t
					? t.p(r, s)
					: ((t = su(r)), t.c(), t.m(u.parentNode, u))
				: t && (t.d(1), (t = null));
		},
		d(r) {
			t && t.d(r), r && v(u);
		},
	};
}
function lu(e) {
	let u,
		t,
		r = e[10].replace(/^(\w)/, nu) + "",
		s,
		a,
		l,
		n = e[10] + "",
		i,
		f,
		o,
		h = Object.entries(e[11] || {}),
		C = [];
	for (let E = 0; E < h.length; E += 1) {
		C[E] = au(tu(e, h, E));
	}
	return {
		c() {
			(u = p("details")),
				(t = p("summary")),
				(s = b()),
				(a = p("fieldset")),
				(l = p("legend")),
				(i = b());
			for (let E = 0; E < C.length; E += 1) {
				C[E].c();
			}
			(f = b()),
				g(t, "class", "pagefind-ui__filter-name svelte-1v2r7ls"),
				g(l, "class", "pagefind-ui__filter-group-label svelte-1v2r7ls"),
				g(a, "class", "pagefind-ui__filter-group svelte-1v2r7ls"),
				g(u, "class", "pagefind-ui__filter-block svelte-1v2r7ls"),
				(u.open = o = e[7] || e[3].map(iu).includes(e[10].toLowerCase()));
		},
		m(E, c) {
			T(E, u, c),
				B(u, t),
				(t.innerHTML = r),
				B(u, s),
				B(u, a),
				B(a, l),
				(l.innerHTML = n),
				B(a, i);
			for (let _ = 0; _ < C.length; _ += 1) {
				C[_] && C[_].m(a, null);
			}
			B(u, f);
		},
		p(E, c) {
			if (
				(c & 2 &&
					r !== (r = E[10].replace(/^(\w)/, nu) + "") &&
					(t.innerHTML = r),
				c & 2 && n !== (n = E[10] + "") && (l.innerHTML = n),
				c & 7)
			) {
				h = Object.entries(E[11] || {});
				let _;
				for (_ = 0; _ < h.length; _ += 1) {
					const d = tu(E, h, _);
					C[_] ? C[_].p(d, c) : ((C[_] = au(d)), C[_].c(), C[_].m(a, null));
				}
				for (; _ < C.length; _ += 1) {
					C[_].d(1);
				}
				C.length = h.length;
			}
			c & 138 &&
				o !== (o = E[7] || E[3].map(iu).includes(E[10].toLowerCase())) &&
				(u.open = o);
		},
		d(E) {
			E && v(u), ie(C, E);
		},
	};
}
function Is(e) {
	let u = e[1] && Object.entries(e[1]).length,
		t,
		r = u && ru(e);
	return {
		c() {
			r && r.c(), (t = ee());
		},
		m(s, a) {
			r && r.m(s, a), T(s, t, a);
		},
		p(s, [a]) {
			a & 2 && (u = s[1] && Object.entries(s[1]).length),
				u
					? r
						? r.p(s, a)
						: ((r = ru(s)), r.c(), r.m(t.parentNode, t))
					: r && (r.d(1), (r = null));
		},
		i: P,
		o: P,
		d(s) {
			r && r.d(s), s && v(t);
		},
	};
}
var nu = (e) => e.toLocaleUpperCase(),
	iu = (e) => e.toLowerCase();
function Ps(e, u, t) {
	let { available_filters: r = null } = u,
		{ show_empty_filters: s = !0 } = u,
		{ open_filters: a = [] } = u,
		{ translate: l = () => "" } = u,
		{ automatic_translations: n = {} } = u,
		{ translations: i = {} } = u,
		{ selected_filters: f = {} } = u,
		o = !1,
		h = !1;
	function C(E, c) {
		(f[`${E}:${c}`] = this.checked), t(0, f);
	}
	return (
		(e.$$set = (E) => {
			"available_filters" in E && t(1, (r = E.available_filters)),
				"show_empty_filters" in E && t(2, (s = E.show_empty_filters)),
				"open_filters" in E && t(3, (a = E.open_filters)),
				"translate" in E && t(4, (l = E.translate)),
				"automatic_translations" in E && t(5, (n = E.automatic_translations)),
				"translations" in E && t(6, (i = E.translations)),
				"selected_filters" in E && t(0, (f = E.selected_filters));
		}),
		(e.$$.update = () => {
			if (e.$$.dirty & 258 && r && !o) {
				t(8, (o = !0));
				let E = Object.entries(r || {});
				E.length === 1 &&
					Object.entries(E[0][1])?.length <= 6 &&
					t(7, (h = !0));
			}
		}),
		[f, r, s, a, l, n, i, h, o, C]
	);
}
var Ls = class extends Ce {
		constructor(e) {
			super(),
				he(this, e, Ps, Is, fe, {
					available_filters: 1,
					show_empty_filters: 2,
					open_filters: 3,
					translate: 4,
					automatic_translations: 5,
					translations: 6,
					selected_filters: 0,
				});
		}
	},
	xs = Ls,
	Ru = {};
F(Ru, {
	comments: () => pu,
	default: () => qs,
	direction: () => vu,
	strings: () => Tu,
	thanks_to: () => Bu,
});
var Bu = "Jan Claasen <jan@cloudcannon.com>",
	pu = "",
	vu = "ltr",
	Tu = {
		placeholder: "Soek",
		clear_search: "Opruim",
		load_more: "Laai nog resultate",
		search_label: "Soek hierdie webwerf",
		filters_label: "Filters",
		zero_results: "Geen resultate vir [SEARCH_TERM]",
		many_results: "[COUNT] resultate vir [SEARCH_TERM]",
		one_result: "[COUNT] resultate vir [SEARCH_TERM]",
		alt_search:
			"Geen resultate vir [SEARCH_TERM]. Toon resultate vir [DIFFERENT_TERM] in plaas daarvan",
		search_suggestion:
			"Geen resultate vir [SEARCH_TERM]. Probeer eerder een van die volgende terme:",
		searching: "Soek vir [SEARCH_TERM]",
	},
	qs = { thanks_to: Bu, comments: pu, direction: vu, strings: Tu },
	Fu = {};
F(Fu, {
	comments: () => Du,
	default: () => Vs,
	direction: () => bu,
	strings: () => Mu,
	thanks_to: () => ku,
});
var ku = "Jermanuts",
	Du = "",
	bu = "rtl",
	Mu = {
		placeholder: "بحث",
		clear_search: "امسح",
		load_more: "حمِّل المزيد من النتائج",
		search_label: "ابحث في هذا الموقع",
		filters_label: "تصفيات",
		zero_results: "لا توجد نتائج ل [SEARCH_TERM]",
		many_results: "[COUNT] نتائج ل [SEARCH_TERM]",
		one_result: "[COUNT] نتيجة ل [SEARCH_TERM]",
		alt_search:
			"لا توجد نتائج ل [SEARCH_TERM]. يعرض النتائج ل [DIFFERENT_TERM] بدلاً من ذلك",
		search_suggestion:
			"لا توجد نتائج ل [SEARCH_TERM]. جرب أحد عمليات البحث التالية:",
		searching: "يبحث عن [SEARCH_TERM]...",
	},
	Vs = { thanks_to: ku, comments: Du, direction: bu, strings: Mu },
	Su = {};
F(Su, {
	comments: () => wu,
	default: () => Ks,
	direction: () => Nu,
	strings: () => yu,
	thanks_to: () => Hu,
});
var Hu = "Maruf Alom <mail@marufalom.com>",
	wu = "",
	Nu = "ltr",
	yu = {
		placeholder: "অনুসন্ধান করুন",
		clear_search: "মুছে ফেলুন",
		load_more: "আরো ফলাফল দেখুন",
		search_label: "এই ওয়েবসাইটে অনুসন্ধান করুন",
		filters_label: "ফিল্টার",
		zero_results: "[SEARCH_TERM] এর জন্য কিছু খুঁজে পাওয়া যায়নি",
		many_results: "[COUNT]-টি ফলাফল পাওয়া গিয়েছে [SEARCH_TERM] এর জন্য",
		one_result: "[COUNT]-টি ফলাফল পাওয়া গিয়েছে [SEARCH_TERM] এর জন্য",
		alt_search:
			"কোন কিছু খুঁজে পাওয়া যায়নি [SEARCH_TERM] এর জন্য. পরিবর্তে [DIFFERENT_TERM] এর জন্য দেখানো হচ্ছে",
		search_suggestion:
			"কোন কিছু খুঁজে পাওয়া যায়নি [SEARCH_TERM] এর বিষয়ে. নিন্মের বিষয়বস্তু খুঁজে দেখুন:",
		searching: "অনুসন্ধান চলছে [SEARCH_TERM]...",
	},
	Ks = { thanks_to: Hu, comments: wu, direction: Nu, strings: yu },
	zu = {};
F(zu, {
	comments: () => Ou,
	default: () => Gs,
	direction: () => Uu,
	strings: () => Iu,
	thanks_to: () => ju,
});
var ju = "Pablo Villaverde <https://github.com/pvillaverde>",
	Ou = "",
	Uu = "ltr",
	Iu = {
		placeholder: "Cerca",
		clear_search: "Netejar",
		load_more: "Veure més resultats",
		search_label: "Cerca en aquest lloc",
		filters_label: "Filtres",
		zero_results: "No es van trobar resultats per [SEARCH_TERM]",
		many_results: "[COUNT] resultats trobats per [SEARCH_TERM]",
		one_result: "[COUNT] resultat trobat per [SEARCH_TERM]",
		alt_search:
			"No es van trobar resultats per [SEARCH_TERM]. Mostrant al seu lloc resultats per [DIFFERENT_TERM]",
		search_suggestion:
			"No es van trobar resultats per [SEARCH_TERM]. Proveu una de les cerques següents:",
		searching: "Cercant [SEARCH_TERM]...",
	},
	Gs = { thanks_to: ju, comments: Ou, direction: Uu, strings: Iu },
	Pu = {};
F(Pu, {
	comments: () => xu,
	default: () => Js,
	direction: () => qu,
	strings: () => Vu,
	thanks_to: () => Lu,
});
var Lu = "Dalibor Hon <https://github.com/dallyh>",
	xu = "",
	qu = "ltr",
	Vu = {
		placeholder: "Hledat",
		clear_search: "Smazat",
		load_more: "Načíst další výsledky",
		search_label: "Prohledat tuto stránku",
		filters_label: "Filtry",
		zero_results: "Žádné výsledky pro [SEARCH_TERM]",
		many_results: "[COUNT] výsledků pro [SEARCH_TERM]",
		one_result: "[COUNT] výsledek pro [SEARCH_TERM]",
		alt_search:
			"Žádné výsledky pro [SEARCH_TERM]. Zobrazují se výsledky pro [DIFFERENT_TERM]",
		search_suggestion:
			"Žádné výsledky pro [SEARCH_TERM]. Související výsledky hledání:",
		searching: "Hledám [SEARCH_TERM]...",
	},
	Js = { thanks_to: Lu, comments: xu, direction: qu, strings: Vu },
	Ku = {};
F(Ku, {
	comments: () => Ju,
	default: () => Ws,
	direction: () => Wu,
	strings: () => Zu,
	thanks_to: () => Gu,
});
var Gu = "Jonas Smedegaard <dr@jones.dk>",
	Ju = "",
	Wu = "ltr",
	Zu = {
		placeholder: "Søg",
		clear_search: "Nulstil",
		load_more: "Indlæs flere resultater",
		search_label: "Søg på dette website",
		filters_label: "Filtre",
		zero_results: "Ingen resultater for [SEARCH_TERM]",
		many_results: "[COUNT] resultater for [SEARCH_TERM]",
		one_result: "[COUNT] resultat for [SEARCH_TERM]",
		alt_search:
			"Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
		search_suggestion:
			"Ingen resultater for [SEARCH_TERM]. Prøv et af disse søgeord i stedet:",
		searching: "Søger efter [SEARCH_TERM]...",
	},
	Ws = { thanks_to: Gu, comments: Ju, direction: Wu, strings: Zu },
	Yu = {};
F(Yu, {
	comments: () => Qu,
	default: () => Zs,
	direction: () => $u,
	strings: () => et,
	thanks_to: () => Xu,
});
var Xu = "Jan Claasen <jan@cloudcannon.com>",
	Qu = "",
	$u = "ltr",
	et = {
		placeholder: "Suche",
		clear_search: "Löschen",
		load_more: "Mehr Ergebnisse laden",
		search_label: "Suche diese Seite",
		filters_label: "Filter",
		zero_results: "Keine Ergebnisse für [SEARCH_TERM]",
		many_results: "[COUNT] Ergebnisse für [SEARCH_TERM]",
		one_result: "[COUNT] Ergebnis für [SEARCH_TERM]",
		alt_search:
			"Keine Ergebnisse für [SEARCH_TERM]. Stattdessen werden Ergebnisse für [DIFFERENT_TERM] angezeigt",
		search_suggestion:
			"Keine Ergebnisse für [SEARCH_TERM]. Versuchen Sie eine der folgenden Suchen:",
		searching: "Suche für [SEARCH_TERM]",
	},
	Zs = { thanks_to: Xu, comments: Qu, direction: $u, strings: et },
	ut = {};
F(ut, {
	comments: () => rt,
	default: () => Ys,
	direction: () => st,
	strings: () => at,
	thanks_to: () => tt,
});
var tt = "Liam Bigelow <liam@cloudcannon.com>",
	rt = "",
	st = "ltr",
	at = {
		placeholder: "Search",
		clear_search: "Clear",
		load_more: "Load more results",
		search_label: "Search this site",
		filters_label: "Filters",
		zero_results: "No results for [SEARCH_TERM]",
		many_results: "[COUNT] results for [SEARCH_TERM]",
		one_result: "[COUNT] result for [SEARCH_TERM]",
		alt_search:
			"No results for [SEARCH_TERM]. Showing results for [DIFFERENT_TERM] instead",
		search_suggestion:
			"No results for [SEARCH_TERM]. Try one of the following searches:",
		searching: "Searching for [SEARCH_TERM]...",
	},
	Ys = { thanks_to: tt, comments: rt, direction: st, strings: at },
	lt = {};
F(lt, {
	comments: () => it,
	default: () => Xs,
	direction: () => ot,
	strings: () => _t,
	thanks_to: () => nt,
});
var nt = "Pablo Villaverde <https://github.com/pvillaverde>",
	it = "",
	ot = "ltr",
	_t = {
		placeholder: "Buscar",
		clear_search: "Limpiar",
		load_more: "Ver más resultados",
		search_label: "Buscar en este sitio",
		filters_label: "Filtros",
		zero_results: "No se encontraron resultados para [SEARCH_TERM]",
		many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
		one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
		alt_search:
			"No se encontraron resultados para [SEARCH_TERM]. Mostrando en su lugar resultados para [DIFFERENT_TERM]",
		search_suggestion:
			"No se encontraron resultados para [SEARCH_TERM]. Prueba una de las siguientes búsquedas:",
		searching: "Buscando [SEARCH_TERM]...",
	},
	Xs = { thanks_to: nt, comments: it, direction: ot, strings: _t },
	ct = {};
F(ct, {
	comments: () => Et,
	default: () => Qs,
	direction: () => dt,
	strings: () => ht,
	thanks_to: () => ft,
});
var ft = "Ali Khaleqi Yekta <https://yekta.dev>",
	Et = "",
	dt = "rtl",
	ht = {
		placeholder: "جستجو",
		clear_search: "پاکسازی",
		load_more: "بارگذاری نتایج بیشتر",
		search_label: "جستجو در سایت",
		filters_label: "فیلترها",
		zero_results: "نتیجه‌ای برای [SEARCH_TERM] یافت نشد",
		many_results: "[COUNT] نتیجه برای [SEARCH_TERM] یافت شد",
		one_result: "[COUNT] نتیجه برای [SEARCH_TERM] یافت شد",
		alt_search:
			"نتیجه‌ای برای [SEARCH_TERM] یافت نشد. در عوض نتایج برای [DIFFERENT_TERM] نمایش داده می‌شود",
		search_suggestion:
			"نتیجه‌ای برای [SEARCH_TERM] یافت نشد. یکی از جستجوهای زیر را امتحان کنید:",
		searching: "در حال جستجوی [SEARCH_TERM]...",
	},
	Qs = { thanks_to: ft, comments: Et, direction: dt, strings: ht },
	Ct = {};
F(Ct, {
	comments: () => gt,
	default: () => $s,
	direction: () => At,
	strings: () => Rt,
	thanks_to: () => mt,
});
var mt = "Valtteri Laitinen <dev@valtlai.fi>",
	gt = "",
	At = "ltr",
	Rt = {
		placeholder: "Haku",
		clear_search: "Tyhjennä",
		load_more: "Lataa lisää tuloksia",
		search_label: "Hae tältä sivustolta",
		filters_label: "Suodattimet",
		zero_results: "Ei tuloksia haulle [SEARCH_TERM]",
		many_results: "[COUNT] tulosta haulle [SEARCH_TERM]",
		one_result: "[COUNT] tulos haulle [SEARCH_TERM]",
		alt_search:
			"Ei tuloksia haulle [SEARCH_TERM]. Näytetään tulokset sen sijaan haulle [DIFFERENT_TERM]",
		search_suggestion:
			"Ei tuloksia haulle [SEARCH_TERM]. Kokeile jotain seuraavista:",
		searching: "Haetaan [SEARCH_TERM]...",
	},
	$s = { thanks_to: mt, comments: gt, direction: At, strings: Rt },
	Bt = {};
F(Bt, {
	comments: () => vt,
	default: () => ea,
	direction: () => Tt,
	strings: () => Ft,
	thanks_to: () => pt,
});
var pt = "Nicolas Friedli <nicolas@theologique.ch>",
	vt = "",
	Tt = "ltr",
	Ft = {
		placeholder: "Rechercher",
		clear_search: "Nettoyer",
		load_more: "Charger plus de résultats",
		search_label: "Recherche sur ce site",
		filters_label: "Filtres",
		zero_results: "Pas de résultat pour [SEARCH_TERM]",
		many_results: "[COUNT] résultats pour [SEARCH_TERM]",
		one_result: "[COUNT] résultat pour [SEARCH_TERM]",
		alt_search:
			"Pas de résultat pour [SEARCH_TERM]. Montre les résultats pour [DIFFERENT_TERM] à la place",
		search_suggestion:
			"Pas de résultat pour [SEARCH_TERM]. Essayer une des recherches suivantes:",
		searching: "Recherche [SEARCH_TERM]...",
	},
	ea = { thanks_to: pt, comments: vt, direction: Tt, strings: Ft },
	kt = {};
F(kt, {
	comments: () => bt,
	default: () => ua,
	direction: () => Mt,
	strings: () => St,
	thanks_to: () => Dt,
});
var Dt = "Pablo Villaverde <https://github.com/pvillaverde>",
	bt = "",
	Mt = "ltr",
	St = {
		placeholder: "Buscar",
		clear_search: "Limpar",
		load_more: "Ver máis resultados",
		search_label: "Buscar neste sitio",
		filters_label: "Filtros",
		zero_results: "Non se atoparon resultados para [SEARCH_TERM]",
		many_results: "[COUNT] resultados atopados para [SEARCH_TERM]",
		one_result: "[COUNT] resultado atopado para [SEARCH_TERM]",
		alt_search:
			"Non se atoparon resultados para [SEARCH_TERM]. Amosando no seu lugar resultados para [DIFFERENT_TERM]",
		search_suggestion:
			"Non se atoparon resultados para [SEARCH_TERM]. Probe unha das seguintes pesquisas:",
		searching: "Buscando [SEARCH_TERM]...",
	},
	ua = { thanks_to: Dt, comments: bt, direction: Mt, strings: St },
	Ht = {};
F(Ht, {
	comments: () => Nt,
	default: () => ta,
	direction: () => yt,
	strings: () => zt,
	thanks_to: () => wt,
});
var wt = "Nir Tamir <nirtamir2@gmail.com>",
	Nt = "",
	yt = "rtl",
	zt = {
		placeholder: "חיפוש",
		clear_search: "ניקוי",
		load_more: "עוד תוצאות",
		search_label: "חיפוש באתר זה",
		filters_label: "מסננים",
		zero_results: "לא נמצאו תוצאות עבור [SEARCH_TERM]",
		many_results: "נמצאו [COUNT] תוצאות עבור [SEARCH_TERM]",
		one_result: "נמצאה תוצאה אחת עבור [SEARCH_TERM]",
		alt_search:
			"לא נמצאו תוצאות עבור [SEARCH_TERM]. מוצגות תוצאות עבור [DIFFERENT_TERM]",
		search_suggestion:
			"לא נמצאו תוצאות עבור [SEARCH_TERM]. נסו אחד מהחיפושים הבאים:",
		searching: "מחפש את [SEARCH_TERM]...",
	},
	ta = { thanks_to: wt, comments: Nt, direction: yt, strings: zt },
	jt = {};
F(jt, {
	comments: () => Ut,
	default: () => ra,
	direction: () => It,
	strings: () => Pt,
	thanks_to: () => Ot,
});
var Ot = "Amit Yadav <amit@thetechbasket.com>",
	Ut = "",
	It = "ltr",
	Pt = {
		placeholder: "खोजें",
		clear_search: "साफ करें",
		load_more: "और अधिक परिणाम लोड करें",
		search_label: "इस साइट में खोजें",
		filters_label: "फ़िल्टर",
		zero_results: "कोई परिणाम [SEARCH_TERM] के लिए नहीं मिला",
		many_results: "[COUNT] परिणाम [SEARCH_TERM] के लिए मिले",
		one_result: "[COUNT] परिणाम [SEARCH_TERM] के लिए मिला",
		alt_search:
			"[SEARCH_TERM] के लिए कोई परिणाम नहीं मिला। इसके बजाय [DIFFERENT_TERM] के लिए परिणाम दिखा रहा है",
		search_suggestion:
			"[SEARCH_TERM] के लिए कोई परिणाम नहीं मिला। निम्नलिखित खोजों में से कोई एक आज़माएं:",
		searching: "[SEARCH_TERM] की खोज की जा रही है...",
	},
	ra = { thanks_to: Ot, comments: Ut, direction: It, strings: Pt },
	Lt = {};
F(Lt, {
	comments: () => qt,
	default: () => sa,
	direction: () => Vt,
	strings: () => Kt,
	thanks_to: () => xt,
});
var xt = "Diomed <https://github.com/diomed>",
	qt = "",
	Vt = "ltr",
	Kt = {
		placeholder: "Traži",
		clear_search: "Očisti",
		load_more: "Učitaj više rezultata",
		search_label: "Pretraži ovu stranicu",
		filters_label: "Filteri",
		zero_results: "Nema rezultata za [SEARCH_TERM]",
		many_results: "[COUNT] rezultata za [SEARCH_TERM]",
		one_result: "[COUNT] rezultat za [SEARCH_TERM]",
		alt_search:
			"Nema rezultata za [SEARCH_TERM]. Prikazujem rezultate za [DIFFERENT_TERM]",
		search_suggestion:
			"Nema rezultata za [SEARCH_TERM]. Pokušaj s jednom od ovih pretraga:",
		searching: "Pretražujem [SEARCH_TERM]...",
	},
	sa = { thanks_to: xt, comments: qt, direction: Vt, strings: Kt },
	Gt = {};
F(Gt, {
	comments: () => Wt,
	default: () => aa,
	direction: () => Zt,
	strings: () => Yt,
	thanks_to: () => Jt,
});
var Jt = "Adam Laki <info@adamlaki.com>",
	Wt = "",
	Zt = "ltr",
	Yt = {
		placeholder: "Keresés",
		clear_search: "Törlés",
		load_more: "További találatok betöltése",
		search_label: "Keresés az oldalon",
		filters_label: "Szűrés",
		zero_results: "Nincs találat a(z) [SEARCH_TERM] kifejezésre",
		many_results: "[COUNT] db találat a(z) [SEARCH_TERM] kifejezésre",
		one_result: "[COUNT] db találat a(z) [SEARCH_TERM] kifejezésre",
		alt_search:
			"Nincs találat a(z) [SEARCH_TERM] kifejezésre. Találatok mutatása inkább a(z) [DIFFERENT_TERM] kifejezésre",
		search_suggestion:
			"Nincs találat a(z) [SEARCH_TERM] kifejezésre. Próbáld meg a következő keresések egyikét:",
		searching: "Keresés a(z) [SEARCH_TERM] kifejezésre...",
	},
	aa = { thanks_to: Jt, comments: Wt, direction: Zt, strings: Yt },
	Xt = {};
F(Xt, {
	comments: () => $t,
	default: () => la,
	direction: () => er,
	strings: () => ur,
	thanks_to: () => Qt,
});
var Qt = "Nixentric",
	$t = "",
	er = "ltr",
	ur = {
		placeholder: "Cari",
		clear_search: "Bersihkan",
		load_more: "Muat lebih banyak hasil",
		search_label: "Telusuri situs ini",
		filters_label: "Filter",
		zero_results: "[SEARCH_TERM] tidak ditemukan",
		many_results: "Ditemukan [COUNT] hasil untuk [SEARCH_TERM]",
		one_result: "Ditemukan [COUNT] hasil untuk [SEARCH_TERM]",
		alt_search:
			"[SEARCH_TERM] tidak ditemukan. Menampilkan hasil [DIFFERENT_TERM] sebagai gantinya",
		search_suggestion:
			"[SEARCH_TERM] tidak ditemukan. Coba salah satu pencarian berikut ini:",
		searching: "Mencari [SEARCH_TERM]...",
	},
	la = { thanks_to: Qt, comments: $t, direction: er, strings: ur },
	tr = {};
F(tr, {
	comments: () => sr,
	default: () => na,
	direction: () => ar,
	strings: () => lr,
	thanks_to: () => rr,
});
var rr = "Cosette Bruhns Alonso, Andrew Janco <apjanco@upenn.edu>",
	sr = "",
	ar = "ltr",
	lr = {
		placeholder: "Cerca",
		clear_search: "Cancella la cronologia",
		load_more: "Mostra più risultati",
		search_label: "Cerca nel sito",
		filters_label: "Filtri di ricerca",
		zero_results: "Nessun risultato per [SEARCH_TERM]",
		many_results: "[COUNT] risultati per [SEARCH_TERM]",
		one_result: "[COUNT] risultato per [SEARCH_TERM]",
		alt_search:
			"Nessun risultato per [SEARCH_TERM]. Mostrando risultati per [DIFFERENT_TERM] come alternativa.",
		search_suggestion:
			"Nessun risultato per [SEARCH_TERM]. Prova una delle seguenti ricerche:",
		searching: "Cercando [SEARCH_TERM]...",
	},
	na = { thanks_to: rr, comments: sr, direction: ar, strings: lr },
	nr = {};
F(nr, {
	comments: () => or,
	default: () => ia,
	direction: () => _r,
	strings: () => cr,
	thanks_to: () => ir,
});
var ir = "Tate",
	or = "",
	_r = "ltr",
	cr = {
		placeholder: "検索",
		clear_search: "クリア",
		load_more: "次を読み込む",
		search_label: "このサイトを検索",
		filters_label: "フィルタ",
		zero_results: "[SEARCH_TERM]の検索に一致する情報はありませんでした",
		many_results: "[SEARCH_TERM]の[COUNT]件の検索結果",
		one_result: "[SEARCH_TERM]の[COUNT]件の検索結果",
		alt_search:
			"[SEARCH_TERM]の検索に一致する情報はありませんでした。[DIFFERENT_TERM]の検索結果を表示しています",
		search_suggestion:
			"[SEARCH_TERM]の検索に一致する情報はありませんでした。次のいずれかの検索を試してください",
		searching: "[SEARCH_TERM]を検索しています",
	},
	ia = { thanks_to: ir, comments: or, direction: _r, strings: cr },
	fr = {};
F(fr, {
	comments: () => dr,
	default: () => oa,
	direction: () => hr,
	strings: () => Cr,
	thanks_to: () => Er,
});
var Er = "Seokho Son <https://github.com/seokho-son>",
	dr = "",
	hr = "ltr",
	Cr = {
		placeholder: "검색어",
		clear_search: "비우기",
		load_more: "검색 결과 더 보기",
		search_label: "사이트 검색",
		filters_label: "필터",
		zero_results: "[SEARCH_TERM]에 대한 결과 없음",
		many_results: "[SEARCH_TERM]에 대한 결과 [COUNT]건",
		one_result: "[SEARCH_TERM]에 대한 결과 [COUNT]건",
		alt_search: "[SEARCH_TERM]에 대한 결과 없음. [DIFFERENT_TERM]에 대한 결과",
		search_suggestion: "[SEARCH_TERM]에 대한 결과 없음. 추천 검색어: ",
		searching: "[SEARCH_TERM] 검색 중...",
	},
	oa = { thanks_to: Er, comments: dr, direction: hr, strings: Cr },
	mr = {};
F(mr, {
	comments: () => Ar,
	default: () => _a,
	direction: () => Rr,
	strings: () => Br,
	thanks_to: () => gr,
});
var gr = "",
	Ar = "",
	Rr = "ltr",
	Br = {
		placeholder: "Rapu",
		clear_search: "Whakakore",
		load_more: "Whakauta ētahi otinga kē",
		search_label: "Rapu",
		filters_label: "Tātari",
		zero_results: "Otinga kore ki [SEARCH_TERM]",
		many_results: "[COUNT] otinga ki [SEARCH_TERM]",
		one_result: "[COUNT] otinga ki [SEARCH_TERM]",
		alt_search: "Otinga kore ki [SEARCH_TERM]. Otinga kē ki [DIFFERENT_TERM]",
		search_suggestion:
			"Otinga kore ki [SEARCH_TERM]. whakamātau ki ngā mea atu:",
		searching: "Rapu ki [SEARCH_TERM]...",
	},
	_a = { thanks_to: gr, comments: Ar, direction: Rr, strings: Br },
	pr = {};
F(pr, {
	comments: () => Tr,
	default: () => ca,
	direction: () => Fr,
	strings: () => kr,
	thanks_to: () => vr,
});
var vr = "Paul van Brouwershaven",
	Tr = "",
	Fr = "ltr",
	kr = {
		placeholder: "Zoeken",
		clear_search: "Reset",
		load_more: "Meer resultaten laden",
		search_label: "Doorzoek deze site",
		filters_label: "Filters",
		zero_results: "Geen resultaten voor [SEARCH_TERM]",
		many_results: "[COUNT] resultaten voor [SEARCH_TERM]",
		one_result: "[COUNT] resultaat voor [SEARCH_TERM]",
		alt_search:
			"Geen resultaten voor [SEARCH_TERM]. In plaats daarvan worden resultaten voor [DIFFERENT_TERM] weergegeven",
		search_suggestion:
			"Geen resultaten voor [SEARCH_TERM]. Probeer een van de volgende zoekopdrachten:",
		searching: "Zoeken naar [SEARCH_TERM]...",
	},
	ca = { thanks_to: vr, comments: Tr, direction: Fr, strings: kr },
	Dr = {};
F(Dr, {
	comments: () => Mr,
	default: () => fa,
	direction: () => Sr,
	strings: () => Hr,
	thanks_to: () => br,
});
var br = "Christopher Wingate",
	Mr = "",
	Sr = "ltr",
	Hr = {
		placeholder: "Søk",
		clear_search: "Fjern",
		load_more: "Last flere resultater",
		search_label: "Søk på denne siden",
		filters_label: "Filtre",
		zero_results: "Ingen resultater for [SEARCH_TERM]",
		many_results: "[COUNT] resultater for [SEARCH_TERM]",
		one_result: "[COUNT] resultat for [SEARCH_TERM]",
		alt_search:
			"Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
		search_suggestion:
			"Ingen resultater for [SEARCH_TERM]. Prøv en av disse søkeordene i stedet:",
		searching: "Søker etter [SEARCH_TERM]",
	},
	fa = { thanks_to: br, comments: Mr, direction: Sr, strings: Hr },
	wr = {};
F(wr, {
	comments: () => yr,
	default: () => Ea,
	direction: () => zr,
	strings: () => jr,
	thanks_to: () => Nr,
});
var Nr = "",
	yr = "",
	zr = "ltr",
	jr = {
		placeholder: "Szukaj",
		clear_search: "Wyczyść",
		load_more: "Załaduj więcej",
		search_label: "Przeszukaj tę stronę",
		filters_label: "Filtry",
		zero_results: "Brak wyników dla [SEARCH_TERM]",
		many_results: "[COUNT] wyników dla [SEARCH_TERM]",
		one_result: "[COUNT] wynik dla [SEARCH_TERM]",
		alt_search:
			"Brak wyników dla [SEARCH_TERM]. Wyświetlam wyniki dla [DIFFERENT_TERM]",
		search_suggestion:
			"Brak wyników dla [SEARCH_TERM]. Pokrewne wyniki wyszukiwania:",
		searching: "Szukam [SEARCH_TERM]...",
	},
	Ea = { thanks_to: Nr, comments: yr, direction: zr, strings: jr },
	Or = {};
F(Or, {
	comments: () => Ir,
	default: () => da,
	direction: () => Pr,
	strings: () => Lr,
	thanks_to: () => Ur,
});
var Ur = "Jonatah",
	Ir = "",
	Pr = "ltr",
	Lr = {
		placeholder: "Pesquisar",
		clear_search: "Limpar",
		load_more: "Ver mais resultados",
		search_label: "Pesquisar",
		filters_label: "Filtros",
		zero_results: "Nenhum resultado encontrado para [SEARCH_TERM]",
		many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
		one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
		alt_search:
			"Nenhum resultado encontrado para [SEARCH_TERM]. Exibindo resultados para [DIFFERENT_TERM]",
		search_suggestion:
			"Nenhum resultado encontrado para [SEARCH_TERM]. Tente uma das seguintes pesquisas:",
		searching: "Pesquisando por [SEARCH_TERM]...",
	},
	da = { thanks_to: Ur, comments: Ir, direction: Pr, strings: Lr },
	xr = {};
F(xr, {
	comments: () => Vr,
	default: () => ha,
	direction: () => Kr,
	strings: () => Gr,
	thanks_to: () => qr,
});
var qr = "Bogdan Mateescu <bogdan@surfverse.com>",
	Vr = "",
	Kr = "ltr",
	Gr = {
		placeholder: "Căutare",
		clear_search: "Ştergeţi",
		load_more: "Încărcați mai multe rezultate",
		search_label: "Căutați în acest site",
		filters_label: "Filtre",
		zero_results: "Niciun rezultat pentru [SEARCH_TERM]",
		many_results: "[COUNT] rezultate pentru [SEARCH_TERM]",
		one_result: "[COUNT] rezultat pentru [SEARCH_TERM]",
		alt_search:
			"Niciun rezultat pentru [SEARCH_TERM]. Se afișează în schimb rezultatele pentru [DIFFERENT_TERM]",
		search_suggestion:
			"Niciun rezultat pentru [SEARCH_TERM]. Încercați una dintre următoarele căutări:",
		searching: "Se caută după: [SEARCH_TERM]...",
	},
	ha = { thanks_to: qr, comments: Vr, direction: Kr, strings: Gr },
	Jr = {};
F(Jr, {
	comments: () => Zr,
	default: () => Ca,
	direction: () => Yr,
	strings: () => Xr,
	thanks_to: () => Wr,
});
var Wr = "Aleksandr Gordeev",
	Zr = "",
	Yr = "ltr",
	Xr = {
		placeholder: "Поиск",
		clear_search: "Очистить поле",
		load_more: "Загрузить еще",
		search_label: "Поиск по сайту",
		filters_label: "Фильтры",
		zero_results: "Ничего не найдено по запросу: [SEARCH_TERM]",
		many_results: "[COUNT] результатов по запросу: [SEARCH_TERM]",
		one_result: "[COUNT] результат по запросу: [SEARCH_TERM]",
		alt_search:
			"Ничего не найдено по запросу: [SEARCH_TERM]. Показаны результаты по запросу: [DIFFERENT_TERM]",
		search_suggestion:
			"Ничего не найдено по запросу: [SEARCH_TERM]. Попробуйте один из следующих вариантов",
		searching: "Поиск по запросу: [SEARCH_TERM]",
	},
	Ca = { thanks_to: Wr, comments: Zr, direction: Yr, strings: Xr },
	Qr = {};
F(Qr, {
	comments: () => e0,
	default: () => ma,
	direction: () => u0,
	strings: () => t0,
	thanks_to: () => $r,
});
var $r = "Andrija Sagicc",
	e0 = "",
	u0 = "ltr",
	t0 = {
		placeholder: "Претрага",
		clear_search: "Брисање",
		load_more: "Приказ више резултата",
		search_label: "Претрага сајта",
		filters_label: "Филтери",
		zero_results: "Нема резултата за [SEARCH_TERM]",
		many_results: "[COUNT] резултата за [SEARCH_TERM]",
		one_result: "[COUNT] резултата за [SEARCH_TERM]",
		alt_search:
			"Нема резултата за [SEARCH_TERM]. Приказ додатник резултата за [DIFFERENT_TERM]",
		search_suggestion:
			"Нема резултата за [SEARCH_TERM]. Покушајте са неком од следећих претрага:",
		searching: "Претрага термина [SEARCH_TERM]...",
	},
	ma = { thanks_to: $r, comments: e0, direction: u0, strings: t0 },
	r0 = {};
F(r0, {
	comments: () => a0,
	default: () => ga,
	direction: () => l0,
	strings: () => n0,
	thanks_to: () => s0,
});
var s0 = "Montazar Al-Jaber <montazar@nanawee.tech>",
	a0 = "",
	l0 = "ltr",
	n0 = {
		placeholder: "Sök",
		clear_search: "Rensa",
		load_more: "Visa fler träffar",
		search_label: "Sök på denna sida",
		filters_label: "Filter",
		zero_results: "[SEARCH_TERM] gav inga träffar",
		many_results: "[SEARCH_TERM] gav [COUNT] träffar",
		one_result: "[SEARCH_TERM] gav [COUNT] träff",
		alt_search:
			"[SEARCH_TERM] gav inga träffar. Visar resultat för [DIFFERENT_TERM] istället",
		search_suggestion:
			"[SEARCH_TERM] gav inga träffar. Försök igen med en av följande sökord:",
		searching: "Söker efter [SEARCH_TERM]...",
	},
	ga = { thanks_to: s0, comments: a0, direction: l0, strings: n0 },
	i0 = {};
F(i0, {
	comments: () => _0,
	default: () => Aa,
	direction: () => c0,
	strings: () => f0,
	thanks_to: () => o0,
});
var o0 = "Anonymous",
	_0 = "",
	c0 = "ltr",
	f0 = {
		placeholder: "Tafuta",
		clear_search: "Futa",
		load_more: "Pakia matokeo zaidi",
		search_label: "Tafuta tovuti hii",
		filters_label: "Vichujio",
		zero_results: "Hakuna matokeo ya [SEARCH_TERM]",
		many_results: "Matokeo [COUNT] ya [SEARCH_TERM]",
		one_result: "Tokeo [COUNT] la [SEARCH_TERM]",
		alt_search:
			"Hakuna mayokeo ya [SEARCH_TERM]. Badala yake, inaonyesha matokeo ya [DIFFERENT_TERM]",
		search_suggestion:
			"Hakuna matokeo ya [SEARCH_TERM]. Jaribu mojawapo ya utafutaji ufuatao:",
		searching: "Kutafuta [SEARCH_TERM]...",
	},
	Aa = { thanks_to: o0, comments: _0, direction: c0, strings: f0 },
	E0 = {};
F(E0, {
	comments: () => h0,
	default: () => Ra,
	direction: () => C0,
	strings: () => m0,
	thanks_to: () => d0,
});
var d0 = "",
	h0 = "",
	C0 = "ltr",
	m0 = {
		placeholder: "தேடுக",
		clear_search: "அழிக்குக",
		load_more: "மேலும் முடிவுகளைக் காட்டுக",
		search_label: "இந்த தளத்தில் தேடுக",
		filters_label: "வடிகட்டல்கள்",
		zero_results: "[SEARCH_TERM] க்கான முடிவுகள் இல்லை",
		many_results: "[SEARCH_TERM] க்கான [COUNT] முடிவுகள்",
		one_result: "[SEARCH_TERM] க்கான முடிவு",
		alt_search:
			"[SEARCH_TERM] இத்தேடலுக்கான முடிவுகள் இல்லை, இந்த தேடல்களுக்கான ஒத்த முடிவுகள் [DIFFERENT_TERM]",
		search_suggestion:
			"[SEARCH_TERM] இத் தேடலுக்கான முடிவுகள் இல்லை.இதற்கு பதிலீடான தேடல்களை தேடுக:",
		searching: "[SEARCH_TERM] தேடப்படுகின்றது",
	},
	Ra = { thanks_to: d0, comments: h0, direction: C0, strings: m0 },
	g0 = {};
F(g0, {
	comments: () => R0,
	default: () => Ba,
	direction: () => B0,
	strings: () => p0,
	thanks_to: () => A0,
});
var A0 = "Taylan Özgür Bildik",
	R0 = "",
	B0 = "ltr",
	p0 = {
		placeholder: "Araştır",
		clear_search: "Temizle",
		load_more: "Daha fazla sonuç",
		search_label: "Site genelinde arama",
		filters_label: "Filtreler",
		zero_results: "[SEARCH_TERM] için sonuç yok",
		many_results: "[SEARCH_TERM] için [COUNT] sonuç bulundu",
		one_result: "[SEARCH_TERM] için [COUNT] sonuç bulundu",
		alt_search:
			"[SEARCH_TERM] için sonuç yok. Bunun yerine [DIFFERENT_TERM] için sonuçlar gösteriliyor",
		search_suggestion:
			"[SEARCH_TERM] için sonuç yok. Alternatif olarak aşağıdaki kelimelerden birini deneyebilirsiniz:",
		searching: "[SEARCH_TERM] araştırılıyor...",
	},
	Ba = { thanks_to: A0, comments: R0, direction: B0, strings: p0 },
	v0 = {};
F(v0, {
	comments: () => F0,
	default: () => pa,
	direction: () => k0,
	strings: () => D0,
	thanks_to: () => T0,
});
var T0 = "Vladyslav Lyshenko <vladdnepr1989@gmail.com>",
	F0 = "",
	k0 = "ltr",
	D0 = {
		placeholder: "Пошук",
		clear_search: "Очистити поле",
		load_more: "Завантажити ще",
		search_label: "Пошук по сайту",
		filters_label: "Фільтри",
		zero_results: "Нічого не знайдено за запитом: [SEARCH_TERM]",
		many_results: "[COUNT] результатів на запит: [SEARCH_TERM]",
		one_result: "[COUNT] результат за запитом: [SEARCH_TERM]",
		alt_search:
			"Нічого не знайдено на запит: [SEARCH_TERM]. Показано результати на запит: [DIFFERENT_TERM]",
		search_suggestion:
			"Нічого не знайдено на запит: [SEARCH_TERM]. Спробуйте один із таких варіантів",
		searching: "Пошук за запитом: [SEARCH_TERM]",
	},
	pa = { thanks_to: T0, comments: F0, direction: k0, strings: D0 },
	b0 = {};
F(b0, {
	comments: () => S0,
	default: () => va,
	direction: () => H0,
	strings: () => w0,
	thanks_to: () => M0,
});
var M0 = "Long Nhat Nguyen",
	S0 = "",
	H0 = "ltr",
	w0 = {
		placeholder: "Tìm kiếm",
		clear_search: "Xóa",
		load_more: "Nhiều kết quả hơn",
		search_label: "Tìm kiếm trong trang này",
		filters_label: "Bộ lọc",
		zero_results: "Không tìm thấy kết quả cho [SEARCH_TERM]",
		many_results: "[COUNT] kết quả cho [SEARCH_TERM]",
		one_result: "[COUNT] kết quả cho [SEARCH_TERM]",
		alt_search:
			"Không tìm thấy kết quả cho [SEARCH_TERM]. Kiểm thị kết quả thay thế với [DIFFERENT_TERM]",
		search_suggestion:
			"Không tìm thấy kết quả cho [SEARCH_TERM]. Thử một trong các tìm kiếm:",
		searching: "Đang tìm kiếm cho [SEARCH_TERM]...",
	},
	va = { thanks_to: M0, comments: S0, direction: H0, strings: w0 },
	N0 = {};
F(N0, {
	comments: () => z0,
	default: () => Ta,
	direction: () => j0,
	strings: () => O0,
	thanks_to: () => y0,
});
var y0 = "Amber Song",
	z0 = "",
	j0 = "ltr",
	O0 = {
		placeholder: "搜索",
		clear_search: "清除",
		load_more: "加载更多结果",
		search_label: "站内搜索",
		filters_label: "筛选",
		zero_results: "未找到 [SEARCH_TERM] 的相关结果",
		many_results: "找到 [COUNT] 个 [SEARCH_TERM] 的相关结果",
		one_result: "找到 [COUNT] 个 [SEARCH_TERM] 的相关结果",
		alt_search:
			"未找到 [SEARCH_TERM] 的相关结果。改为显示 [DIFFERENT_TERM] 的相关结果",
		search_suggestion: "未找到 [SEARCH_TERM] 的相关结果。请尝试以下搜索。",
		searching: "正在搜索 [SEARCH_TERM]...",
	},
	Ta = { thanks_to: y0, comments: z0, direction: j0, strings: O0 },
	U0 = {};
F(U0, {
	comments: () => P0,
	default: () => Fa,
	direction: () => L0,
	strings: () => x0,
	thanks_to: () => I0,
});
var I0 = "Amber Song",
	P0 = "",
	L0 = "ltr",
	x0 = {
		placeholder: "搜索",
		clear_search: "清除",
		load_more: "加載更多結果",
		search_label: "站內搜索",
		filters_label: "篩選",
		zero_results: "未找到 [SEARCH_TERM] 的相關結果",
		many_results: "找到 [COUNT] 個 [SEARCH_TERM] 的相關結果",
		one_result: "找到 [COUNT] 個 [SEARCH_TERM] 的相關結果",
		alt_search:
			"未找到 [SEARCH_TERM] 的相關結果。改為顯示 [DIFFERENT_TERM] 的相關結果",
		search_suggestion: "未找到 [SEARCH_TERM] 的相關結果。請嘗試以下搜索。",
		searching: "正在搜索 [SEARCH_TERM]...",
	},
	Fa = { thanks_to: I0, comments: P0, direction: L0, strings: x0 },
	q0 = {};
F(q0, {
	comments: () => K0,
	default: () => ka,
	direction: () => G0,
	strings: () => J0,
	thanks_to: () => V0,
});
var V0 = "Amber Song",
	K0 = "",
	G0 = "ltr",
	J0 = {
		placeholder: "搜索",
		clear_search: "清除",
		load_more: "加载更多结果",
		search_label: "站内搜索",
		filters_label: "筛选",
		zero_results: "未找到 [SEARCH_TERM] 的相关结果",
		many_results: "找到 [COUNT] 个 [SEARCH_TERM] 的相关结果",
		one_result: "找到 [COUNT] 个 [SEARCH_TERM] 的相关结果",
		alt_search:
			"未找到 [SEARCH_TERM] 的相关结果。改为显示 [DIFFERENT_TERM] 的相关结果",
		search_suggestion: "未找到 [SEARCH_TERM] 的相关结果。请尝试以下搜索。",
		searching: "正在搜索 [SEARCH_TERM]...",
	},
	ka = { thanks_to: V0, comments: K0, direction: G0, strings: J0 },
	Da = [
		Ru,
		Fu,
		Su,
		zu,
		Pu,
		Ku,
		Yu,
		ut,
		lt,
		ct,
		Ct,
		Bt,
		kt,
		Ht,
		jt,
		Lt,
		Gt,
		Xt,
		tr,
		nr,
		fr,
		mr,
		pr,
		Dr,
		wr,
		Or,
		xr,
		Jr,
		Qr,
		r0,
		i0,
		E0,
		g0,
		v0,
		b0,
		N0,
		U0,
		q0,
	],
	ba = Da,
	Ma = [
		"../../translations/af.json",
		"../../translations/ar.json",
		"../../translations/bn.json",
		"../../translations/ca.json",
		"../../translations/cs.json",
		"../../translations/da.json",
		"../../translations/de.json",
		"../../translations/en.json",
		"../../translations/es.json",
		"../../translations/fa.json",
		"../../translations/fi.json",
		"../../translations/fr.json",
		"../../translations/gl.json",
		"../../translations/he.json",
		"../../translations/hi.json",
		"../../translations/hr.json",
		"../../translations/hu.json",
		"../../translations/id.json",
		"../../translations/it.json",
		"../../translations/ja.json",
		"../../translations/ko.json",
		"../../translations/mi.json",
		"../../translations/nl.json",
		"../../translations/no.json",
		"../../translations/pl.json",
		"../../translations/pt.json",
		"../../translations/ro.json",
		"../../translations/ru.json",
		"../../translations/sr.json",
		"../../translations/sv.json",
		"../../translations/sw.json",
		"../../translations/ta.json",
		"../../translations/tr.json",
		"../../translations/uk.json",
		"../../translations/vi.json",
		"../../translations/zh-cn.json",
		"../../translations/zh-tw.json",
		"../../translations/zh.json",
	];
function ou(e, u, t) {
	const r = e.slice();
	return (r[51] = u[t]), r;
}
function _u(e) {
	let u, t, r;
	function s(l) {
		e[37](l);
	}
	let a = {
		show_empty_filters: e[5],
		open_filters: e[6],
		available_filters: e[18],
		translate: e[20],
		automatic_translations: e[19],
		translations: e[7],
	};
	return (
		e[0] !== void 0 && (a.selected_filters = e[0]),
		(u = new xs({ props: a })),
		ae.push(() => vs(u, "selected_filters", s)),
		{
			c() {
				ke(u.$$.fragment);
			},
			m(l, n) {
				Ee(u, l, n), (r = !0);
			},
			p(l, n) {
				const i = {};
				n[0] & 32 && (i.show_empty_filters = l[5]),
					n[0] & 64 && (i.open_filters = l[6]),
					n[0] & 262144 && (i.available_filters = l[18]),
					n[0] & 524288 && (i.automatic_translations = l[19]),
					n[0] & 128 && (i.translations = l[7]),
					!t &&
						n[0] & 1 &&
						((t = !0), (i.selected_filters = l[0]), gs(() => (t = !1))),
					u.$set(i);
			},
			i(l) {
				r || (z(u.$$.fragment, l), (r = !0));
			},
			o(l) {
				U(u.$$.fragment, l), (r = !1);
			},
			d(l) {
				de(u, l);
			},
		}
	);
}
function cu(e) {
	let u, t, r, s;
	const a = [Ha, Sa],
		l = [];
	function n(i, f) {
		return i[14] ? 0 : 1;
	}
	return (
		(t = n(e)),
		(r = l[t] = a[t](e)),
		{
			c() {
				(u = p("div")),
					r.c(),
					g(u, "class", "pagefind-ui__results-area svelte-e9gkc3");
			},
			m(i, f) {
				T(i, u, f), l[t].m(u, null), (s = !0);
			},
			p(i, f) {
				let o = t;
				(t = n(i)),
					t === o
						? l[t].p(i, f)
						: (le(),
							U(l[o], 1, 1, () => {
								l[o] = null;
							}),
							ne(),
							(r = l[t]),
							r ? r.p(i, f) : ((r = l[t] = a[t](i)), r.c()),
							z(r, 1),
							r.m(u, null));
			},
			i(i) {
				s || (z(r), (s = !0));
			},
			o(i) {
				U(r), (s = !1);
			},
			d(i) {
				i && v(u), l[t].d();
			},
		}
	);
}
function Sa(e) {
	let u,
		t,
		r,
		s = [],
		a = new Map(),
		l,
		n,
		i;
	function f(_, d) {
		return _[13].results.length === 0
			? ya
			: _[13].results.length === 1
				? Na
				: wa;
	}
	let o = f(e),
		h = o(e),
		C = e[13].results.slice(0, e[17]);
	const E = (_) => _[51].id;
	for (let _ = 0; _ < C.length; _ += 1) {
		let d = ou(e, C, _),
			R = E(d);
		a.set(R, (s[_] = fu(R, d)));
	}
	let c = e[13].results.length > e[17] && Eu(e);
	return {
		c() {
			(u = p("p")), h.c(), (t = b()), (r = p("ol"));
			for (let _ = 0; _ < s.length; _ += 1) {
				s[_].c();
			}
			(l = b()),
				c && c.c(),
				(n = ee()),
				g(u, "class", "pagefind-ui__message svelte-e9gkc3"),
				g(r, "class", "pagefind-ui__results svelte-e9gkc3");
		},
		m(_, d) {
			T(_, u, d), h.m(u, null), T(_, t, d), T(_, r, d);
			for (let R = 0; R < s.length; R += 1) {
				s[R] && s[R].m(r, null);
			}
			T(_, l, d), c && c.m(_, d), T(_, n, d), (i = !0);
		},
		p(_, d) {
			o === (o = f(_)) && h
				? h.p(_, d)
				: (h.d(1), (h = o(_)), h && (h.c(), h.m(u, null))),
				d[0] & 139292 &&
					((C = _[13].results.slice(0, _[17])),
					le(),
					(s = ps(s, d, E, 1, _, C, a, r, Bs, fu, null, ou)),
					ne()),
				_[13].results.length > _[17]
					? c
						? c.p(_, d)
						: ((c = Eu(_)), c.c(), c.m(n.parentNode, n))
					: c && (c.d(1), (c = null));
		},
		i(_) {
			if (!i) {
				for (let d = 0; d < C.length; d += 1) {
					z(s[d]);
				}
				i = !0;
			}
		},
		o(_) {
			for (let d = 0; d < s.length; d += 1) {
				U(s[d]);
			}
			i = !1;
		},
		d(_) {
			_ && v(u), h.d(), _ && v(t), _ && v(r);
			for (let d = 0; d < s.length; d += 1) {
				s[d].d();
			}
			_ && v(l), c && c.d(_), _ && v(n);
		},
	};
}
function Ha(e) {
	let u,
		t = e[16] && du(e);
	return {
		c() {
			t && t.c(), (u = ee());
		},
		m(r, s) {
			t && t.m(r, s), T(r, u, s);
		},
		p(r, s) {
			r[16]
				? t
					? t.p(r, s)
					: ((t = du(r)), t.c(), t.m(u.parentNode, u))
				: t && (t.d(1), (t = null));
		},
		i: P,
		o: P,
		d(r) {
			t && t.d(r), r && v(u);
		},
	};
}
function wa(e) {
	let u =
			e[20]("many_results", e[19], e[7])
				.replace(/\[SEARCH_TERM\]/, e[16])
				.replace(
					/\[COUNT\]/,
					new Intl.NumberFormat(e[7].language).format(e[13].results.length),
				) + "",
		t;
	return {
		c() {
			t = M(u);
		},
		m(r, s) {
			T(r, t, s);
		},
		p(r, s) {
			s[0] & 598144 &&
				u !==
					(u =
						r[20]("many_results", r[19], r[7])
							.replace(/\[SEARCH_TERM\]/, r[16])
							.replace(
								/\[COUNT\]/,
								new Intl.NumberFormat(r[7].language).format(
									r[13].results.length,
								),
							) + "") &&
				j(t, u);
		},
		d(r) {
			r && v(t);
		},
	};
}
function Na(e) {
	let u =
			e[20]("one_result", e[19], e[7])
				.replace(/\[SEARCH_TERM\]/, e[16])
				.replace(/\[COUNT\]/, new Intl.NumberFormat(e[7].language).format(1)) +
			"",
		t;
	return {
		c() {
			t = M(u);
		},
		m(r, s) {
			T(r, t, s);
		},
		p(r, s) {
			s[0] & 589952 &&
				u !==
					(u =
						r[20]("one_result", r[19], r[7])
							.replace(/\[SEARCH_TERM\]/, r[16])
							.replace(
								/\[COUNT\]/,
								new Intl.NumberFormat(r[7].language).format(1),
							) + "") &&
				j(t, u);
		},
		d(r) {
			r && v(t);
		},
	};
}
function ya(e) {
	let u =
			e[20]("zero_results", e[19], e[7]).replace(/\[SEARCH_TERM\]/, e[16]) + "",
		t;
	return {
		c() {
			t = M(u);
		},
		m(r, s) {
			T(r, t, s);
		},
		p(r, s) {
			s[0] & 589952 &&
				u !==
					(u =
						r[20]("zero_results", r[19], r[7]).replace(
							/\[SEARCH_TERM\]/,
							r[16],
						) + "") &&
				j(t, u);
		},
		d(r) {
			r && v(t);
		},
	};
}
function za(e) {
	let u, t;
	return (
		(u = new ws({
			props: { show_images: e[2], process_result: e[4], result: e[51] },
		})),
		{
			c() {
				ke(u.$$.fragment);
			},
			m(r, s) {
				Ee(u, r, s), (t = !0);
			},
			p(r, s) {
				const a = {};
				s[0] & 4 && (a.show_images = r[2]),
					s[0] & 16 && (a.process_result = r[4]),
					s[0] & 139264 && (a.result = r[51]),
					u.$set(a);
			},
			i(r) {
				t || (z(u.$$.fragment, r), (t = !0));
			},
			o(r) {
				U(u.$$.fragment, r), (t = !1);
			},
			d(r) {
				de(u, r);
			},
		}
	);
}
function ja(e) {
	let u, t;
	return (
		(u = new Us({
			props: { show_images: e[2], process_result: e[4], result: e[51] },
		})),
		{
			c() {
				ke(u.$$.fragment);
			},
			m(r, s) {
				Ee(u, r, s), (t = !0);
			},
			p(r, s) {
				const a = {};
				s[0] & 4 && (a.show_images = r[2]),
					s[0] & 16 && (a.process_result = r[4]),
					s[0] & 139264 && (a.result = r[51]),
					u.$set(a);
			},
			i(r) {
				t || (z(u.$$.fragment, r), (t = !0));
			},
			o(r) {
				U(u.$$.fragment, r), (t = !1);
			},
			d(r) {
				de(u, r);
			},
		}
	);
}
function fu(e, u) {
	let t, r, s, a, l;
	const n = [ja, za],
		i = [];
	function f(o, h) {
		return o[3] ? 0 : 1;
	}
	return (
		(r = f(u)),
		(s = i[r] = n[r](u)),
		{
			key: e,
			first: null,
			c() {
				(t = ee()), s.c(), (a = ee()), (this.first = t);
			},
			m(o, h) {
				T(o, t, h), i[r].m(o, h), T(o, a, h), (l = !0);
			},
			p(o, h) {
				u = o;
				let C = r;
				(r = f(u)),
					r === C
						? i[r].p(u, h)
						: (le(),
							U(i[C], 1, 1, () => {
								i[C] = null;
							}),
							ne(),
							(s = i[r]),
							s ? s.p(u, h) : ((s = i[r] = n[r](u)), s.c()),
							z(s, 1),
							s.m(a.parentNode, a));
			},
			i(o) {
				l || (z(s), (l = !0));
			},
			o(o) {
				U(s), (l = !1);
			},
			d(o) {
				o && v(t), i[r].d(o), o && v(a);
			},
		}
	);
}
function Eu(e) {
	let u,
		t = e[20]("load_more", e[19], e[7]) + "",
		r,
		s,
		a;
	return {
		c() {
			(u = p("button")),
				(r = M(t)),
				g(u, "type", "button"),
				g(u, "class", "pagefind-ui__button svelte-e9gkc3");
		},
		m(l, n) {
			T(l, u, n), B(u, r), s || ((a = G(u, "click", e[22])), (s = !0));
		},
		p(l, n) {
			n[0] & 524416 &&
				t !== (t = l[20]("load_more", l[19], l[7]) + "") &&
				j(r, t);
		},
		d(l) {
			l && v(u), (s = !1), a();
		},
	};
}
function du(e) {
	let u,
		t = e[20]("searching", e[19], e[7]).replace(/\[SEARCH_TERM\]/, e[16]) + "",
		r;
	return {
		c() {
			(u = p("p")),
				(r = M(t)),
				g(u, "class", "pagefind-ui__message svelte-e9gkc3");
		},
		m(s, a) {
			T(s, u, a), B(u, r);
		},
		p(s, a) {
			a[0] & 589952 &&
				t !==
					(t =
						s[20]("searching", s[19], s[7]).replace(/\[SEARCH_TERM\]/, s[16]) +
						"") &&
				j(r, t);
		},
		d(s) {
			s && v(u);
		},
	};
}
function Oa(e) {
	let u,
		t,
		r,
		s,
		a,
		l,
		n = e[20]("clear_search", e[19], e[7]) + "",
		i,
		f,
		o,
		h,
		C,
		E,
		c,
		_,
		d = e[12] && _u(e),
		R = e[15] && cu(e);
	return {
		c() {
			(u = p("div")),
				(t = p("form")),
				(r = p("input")),
				(a = b()),
				(l = p("button")),
				(i = M(n)),
				(f = b()),
				(o = p("div")),
				d && d.c(),
				(h = b()),
				R && R.c(),
				g(r, "class", "pagefind-ui__search-input svelte-e9gkc3"),
				g(r, "type", "text"),
				g(r, "placeholder", (s = e[20]("placeholder", e[19], e[7]))),
				g(r, "autocapitalize", "none"),
				g(r, "enterkeyhint", "search"),
				(r.autofocus = e[8]),
				g(l, "class", "pagefind-ui__search-clear svelte-e9gkc3"),
				K(l, "pagefind-ui__suppressed", !e[9]),
				g(o, "class", "pagefind-ui__drawer svelte-e9gkc3"),
				K(o, "pagefind-ui__hidden", !e[15]),
				g(t, "class", "pagefind-ui__form svelte-e9gkc3"),
				g(t, "role", "search"),
				g(t, "aria-label", (C = e[20]("search_label", e[19], e[7]))),
				g(t, "action", "javascript:void(0);"),
				g(u, "class", "pagefind-ui svelte-e9gkc3"),
				K(u, "pagefind-ui--reset", e[1]);
		},
		m(A, k) {
			T(A, u, k),
				B(u, t),
				B(t, r),
				ze(r, e[9]),
				e[34](r),
				B(t, a),
				B(t, l),
				B(l, i),
				e[35](l),
				B(t, f),
				B(t, o),
				d && d.m(o, null),
				B(o, h),
				R && R.m(o, null),
				(E = !0),
				e[8] && r.focus(),
				c ||
					((_ = [
						G(r, "focus", e[21]),
						G(r, "keydown", e[32]),
						G(r, "input", e[33]),
						G(l, "click", e[36]),
						G(t, "submit", Ua),
					]),
					(c = !0));
		},
		p(A, k) {
			(!E ||
				(k[0] & 524416 && s !== (s = A[20]("placeholder", A[19], A[7])))) &&
				g(r, "placeholder", s),
				(!E || k[0] & 256) && (r.autofocus = A[8]),
				k[0] & 512 && r.value !== A[9] && ze(r, A[9]),
				(!E || k[0] & 524416) &&
					n !== (n = A[20]("clear_search", A[19], A[7]) + "") &&
					j(i, n),
				(!E || k[0] & 512) && K(l, "pagefind-ui__suppressed", !A[9]),
				A[12]
					? d
						? (d.p(A, k), k[0] & 4096 && z(d, 1))
						: ((d = _u(A)), d.c(), z(d, 1), d.m(o, h))
					: d &&
						(le(),
						U(d, 1, 1, () => {
							d = null;
						}),
						ne()),
				A[15]
					? R
						? (R.p(A, k), k[0] & 32768 && z(R, 1))
						: ((R = cu(A)), R.c(), z(R, 1), R.m(o, null))
					: R &&
						(le(),
						U(R, 1, 1, () => {
							R = null;
						}),
						ne()),
				(!E || k[0] & 32768) && K(o, "pagefind-ui__hidden", !A[15]),
				(!E ||
					(k[0] & 524416 && C !== (C = A[20]("search_label", A[19], A[7])))) &&
					g(t, "aria-label", C),
				(!E || k[0] & 2) && K(u, "pagefind-ui--reset", A[1]);
		},
		i(A) {
			E || (z(d), z(R), (E = !0));
		},
		o(A) {
			U(d), U(R), (E = !1);
		},
		d(A) {
			A && v(u),
				e[34](null),
				e[35](null),
				d && d.d(),
				R && R.d(),
				(c = !1),
				W(_);
		},
	};
}
var Ua = (e) => e.preventDefault();
function Ia(e, u, t) {
	const r = {},
		s = Ma.map((m) => m.match(/([^\/]+)\.json$/)[1]);
	for (let m = 0; m < s.length; m++) {
		r[s[m]] = { language: s[m], ...ba[m].strings };
	}
	let { base_path: a = "/pagefind/" } = u,
		{ page_size: l = 5 } = u,
		{ reset_styles: n = !0 } = u,
		{ show_images: i = !0 } = u,
		{ show_sub_results: f = !1 } = u,
		{ excerpt_length: o } = u,
		{ process_result: h = null } = u,
		{ process_term: C = null } = u,
		{ show_empty_filters: E = !0 } = u,
		{ open_filters: c = [] } = u,
		{ debounce_timeout_ms: _ = 300 } = u,
		{ pagefind_options: d = {} } = u,
		{ merge_index: R = [] } = u,
		{ trigger_search_term: A = "" } = u,
		{ translations: k = {} } = u,
		{ autofocus: y = !1 } = u,
		{ sort: q = null } = u,
		{ selected_filters: L = {} } = u,
		D = "",
		S,
		w,
		x,
		W0 = 40,
		me = !1,
		De = [],
		ge = !1,
		Ae = !1,
		be = 0,
		Me = "",
		Re = l,
		Se = null,
		ue = null,
		He = r.en;
	const Z0 = (m, H, N) => N[m] ?? H[m] ?? "";
	ds(() => {
		let m = document?.querySelector?.("html")?.getAttribute?.("lang") || "en",
			H = Au(m.toLocaleLowerCase());
		t(
			19,
			(He =
				r[`${H.language}-${H.script}-${H.region}`] ||
				r[`${H.language}-${H.region}`] ||
				r[`${H.language}`] ||
				r.en),
		);
	}),
		hs(() => {
			S?.destroy?.(), (S = null);
		});
	const we = async () => {
			if (!me && (t(12, (me = !0)), !S)) {
				let m;
				try {
					m = await is(() => import(`${a}pagefind.js`), []);
				} catch (N) {
					console.error(N),
						console.error(
							[
								`Pagefind couldn't be loaded from ${this.options.bundlePath}pagefind.js`,
								"You can configure this by passing a bundlePath option to PagefindUI",
							].join(`
`),
						),
						document?.currentScript &&
						document.currentScript.tagName.toUpperCase() === "SCRIPT"
							? console.error(
									`[DEBUG: Loaded from ${document.currentScript.src ?? "bad script location"}]`,
								)
							: console.error("no known script location");
				}
				o || t(24, (o = f ? 12 : 30));
				let H = { ...(d || {}), excerptLength: o };
				await m.options(H);
				for (const N of R) {
					if (!N.bundlePath) {
						throw new Error("mergeIndex requires a bundlePath parameter");
					}
					const I = N.bundlePath;
					delete N.bundlePath, await m.mergeIndex(I, N);
				}
				(S = m), Y0();
			}
		},
		Y0 = async () => {
			S &&
				((Se = await S.filters()),
				(!ue || !Object.keys(ue).length) && t(18, (ue = Se)));
		},
		X0 = (m) => {
			let H = {};
			return (
				Object.entries(m)
					.filter(([, N]) => N)
					.forEach(([N]) => {
						let [I, Z] = N.split(/:(.*)$/);
						(H[I] = H[I] || []), H[I].push(Z);
					}),
				H
			);
		};
	let te;
	const Q0 = async (m, H) => {
			if (!m) {
				t(15, (Ae = !1)), te && clearTimeout(te);
				return;
			}
			const N = X0(H),
				I = () => $0(m, N);
			_ > 0 && m
				? (te && clearTimeout(te),
					(te = setTimeout(I, _)),
					await Ne(),
					S.preload(m, { filters: N }))
				: I(),
				es();
		},
		Ne = async () => {
			for (; !S; ) {
				we(), await new Promise((m) => setTimeout(m, 50));
			}
		},
		$0 = async (m, H) => {
			t(16, (Me = m || "")),
				typeof C == "function" && (m = C(m)),
				t(14, (ge = !0)),
				t(15, (Ae = !0)),
				await Ne();
			const N = ++be,
				I = { filters: H };
			q && typeof q == "object" && (I.sort = q);
			const Z = await S.search(m, I);
			be === N &&
				(Z.filters && Object.keys(Z.filters)?.length && t(18, (ue = Z.filters)),
				t(13, (De = Z)),
				t(14, (ge = !1)),
				t(17, (Re = l)));
		},
		es = () => {
			const m = x.offsetWidth;
			m != W0 && t(10, (w.style.paddingRight = `${m + 2}px`), w);
		},
		us = (m) => {
			m?.preventDefault(), t(17, (Re += l));
		},
		ts = (m) => {
			m.key === "Escape" && (t(9, (D = "")), w.blur()),
				m.key === "Enter" && m.preventDefault();
		};
	function rs() {
		(D = this.value), t(9, D), t(23, A);
	}
	function ss(m) {
		ae[m ? "unshift" : "push"](() => {
			(w = m), t(10, w);
		});
	}
	function as(m) {
		ae[m ? "unshift" : "push"](() => {
			(x = m), t(11, x);
		});
	}
	const ls = () => {
		t(9, (D = "")), w.blur();
	};
	function ns(m) {
		(L = m), t(0, L);
	}
	return (
		(e.$$set = (m) => {
			"base_path" in m && t(25, (a = m.base_path)),
				"page_size" in m && t(26, (l = m.page_size)),
				"reset_styles" in m && t(1, (n = m.reset_styles)),
				"show_images" in m && t(2, (i = m.show_images)),
				"show_sub_results" in m && t(3, (f = m.show_sub_results)),
				"excerpt_length" in m && t(24, (o = m.excerpt_length)),
				"process_result" in m && t(4, (h = m.process_result)),
				"process_term" in m && t(27, (C = m.process_term)),
				"show_empty_filters" in m && t(5, (E = m.show_empty_filters)),
				"open_filters" in m && t(6, (c = m.open_filters)),
				"debounce_timeout_ms" in m && t(28, (_ = m.debounce_timeout_ms)),
				"pagefind_options" in m && t(29, (d = m.pagefind_options)),
				"merge_index" in m && t(30, (R = m.merge_index)),
				"trigger_search_term" in m && t(23, (A = m.trigger_search_term)),
				"translations" in m && t(7, (k = m.translations)),
				"autofocus" in m && t(8, (y = m.autofocus)),
				"sort" in m && t(31, (q = m.sort)),
				"selected_filters" in m && t(0, (L = m.selected_filters));
		}),
		(e.$$.update = () => {
			e.$$.dirty[0] & 8388608 && A && (t(9, (D = A)), t(23, (A = ""))),
				e.$$.dirty[0] & 513 && Q0(D, L);
		}),
		[
			L,
			n,
			i,
			f,
			h,
			E,
			c,
			k,
			y,
			D,
			w,
			x,
			me,
			De,
			ge,
			Ae,
			Me,
			Re,
			ue,
			He,
			Z0,
			we,
			us,
			A,
			o,
			a,
			l,
			C,
			_,
			d,
			R,
			q,
			ts,
			rs,
			ss,
			as,
			ls,
			ns,
		]
	);
}
var Pa = class extends Ce {
		constructor(e) {
			super(),
				he(
					this,
					e,
					Ia,
					Oa,
					fe,
					{
						base_path: 25,
						page_size: 26,
						reset_styles: 1,
						show_images: 2,
						show_sub_results: 3,
						excerpt_length: 24,
						process_result: 4,
						process_term: 27,
						show_empty_filters: 5,
						open_filters: 6,
						debounce_timeout_ms: 28,
						pagefind_options: 29,
						merge_index: 30,
						trigger_search_term: 23,
						translations: 7,
						autofocus: 8,
						sort: 31,
						selected_filters: 0,
					},
					null,
					[-1, -1],
				);
		}
	},
	La = Pa,
	Fe;
try {
	document?.currentScript &&
		document.currentScript.tagName.toUpperCase() === "SCRIPT" &&
		(Fe = new URL(document.currentScript.src).pathname.match(
			/^(.*\/)(?:pagefind-)?ui.js.*$/,
		)[1]);
} catch {
	Fe = "/pagefind/";
}
var qa = class {
	constructor(e) {
		this._pfs = null;
		let u = e.element ?? "[data-pagefind-ui]",
			t = e.bundlePath ?? Fe,
			r = e.pageSize ?? 5,
			s = e.resetStyles ?? !0,
			a = e.showImages ?? !0,
			l = e.showSubResults ?? !1,
			n = e.excerptLength ?? 0,
			i = e.processResult ?? null,
			f = e.processTerm ?? null,
			o = e.showEmptyFilters ?? !0,
			h = e.openFilters ?? [],
			C = e.debounceTimeoutMs ?? 300,
			E = e.mergeIndex ?? [],
			c = e.translations ?? [],
			_ = e.autofocus ?? !1,
			d = e.sort ?? null;
		delete e.element,
			delete e.bundlePath,
			delete e.pageSize,
			delete e.resetStyles,
			delete e.showImages,
			delete e.showSubResults,
			delete e.excerptLength,
			delete e.processResult,
			delete e.processTerm,
			delete e.showEmptyFilters,
			delete e.openFilters,
			delete e.debounceTimeoutMs,
			delete e.mergeIndex,
			delete e.translations,
			delete e.autofocus,
			delete e.sort;
		const R = u instanceof HTMLElement ? u : document.querySelector(u);
		R
			? (this._pfs = new La({
					target: R,
					props: {
						base_path: t,
						page_size: r,
						reset_styles: s,
						show_images: a,
						show_sub_results: l,
						excerpt_length: n,
						process_result: i,
						process_term: f,
						show_empty_filters: o,
						open_filters: h,
						debounce_timeout_ms: C,
						merge_index: E,
						translations: c,
						autofocus: _,
						sort: d,
						pagefind_options: e,
					},
				}))
			: console.error(`Pagefind UI couldn't find the selector ${u}`);
	}
	triggerSearch(e) {
		this._pfs.$$set({ trigger_search_term: e });
	}
	triggerFilters(e) {
		let u = {};
		for (let [t, r] of Object.entries(e)) {
			if (Array.isArray(r)) {
				for (let s of r) {
					u[`${t}:${s}`] = !0;
				}
			} else {
				u[`${t}:${r}`] = !0;
			}
		}
		this._pfs.$$set({ selected_filters: u });
	}
	destroy() {
		this._pfs.$destroy();
	}
};
export { qa as PagefindUI };
