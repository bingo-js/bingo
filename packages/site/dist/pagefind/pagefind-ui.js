(() => {
	var Ms = Object.defineProperty;
	var y = (n, e) => {
		for (var t in e) {
			Ms(n, t, { get: e[t], enumerable: !0 });
		}
	};
	function z() {}
	function mt(n) {
		return n();
	}
	function gn() {
		return Object.create(null);
	}
	function G(n) {
		n.forEach(mt);
	}
	function nt(n) {
		return typeof n == "function";
	}
	function K(n, e) {
		return n != n
			? e == e
			: n !== e || (n && typeof n == "object") || typeof n == "function";
	}
	var et;
	function ie(n, e) {
		return (
			et || (et = document.createElement("a")), (et.href = e), n === et.href
		);
	}
	function En(n) {
		return Object.keys(n).length === 0;
	}
	var Rn =
			typeof window < "u"
				? window
				: typeof globalThis < "u"
					? globalThis
					: global,
		de = class {
			constructor(e) {
				(this.options = e),
					(this._listeners = "WeakMap" in Rn ? new WeakMap() : void 0);
			}
			observe(e, t) {
				return (
					this._listeners.set(e, t),
					this._getObserver().observe(e, this.options),
					() => {
						this._listeners.delete(e), this._observer.unobserve(e);
					}
				);
			}
			_getObserver() {
				var e;
				return (e = this._observer) !== null && e !== void 0
					? e
					: (this._observer = new ResizeObserver((t) => {
							var s;
							for (let r of t) {
								de.entries.set(r.target, r),
									(s = this._listeners.get(r.target)) === null ||
										s === void 0 ||
										s(r);
							}
						}));
			}
		};
	de.entries = "WeakMap" in Rn ? new WeakMap() : void 0;
	var bn = !1;
	function As() {
		bn = !0;
	}
	function vs() {
		bn = !1;
	}
	function b(n, e) {
		n.appendChild(e);
	}
	function S(n, e, t) {
		n.insertBefore(e, t || null);
	}
	function k(n) {
		n.parentNode && n.parentNode.removeChild(n);
	}
	function Q(n, e) {
		for (let t = 0; t < n.length; t += 1) {
			n[t] && n[t].d(e);
		}
	}
	function C(n) {
		return document.createElement(n);
	}
	function ws(n) {
		return document.createElementNS("http://www.w3.org/2000/svg", n);
	}
	function w(n) {
		return document.createTextNode(n);
	}
	function A() {
		return w(" ");
	}
	function x() {
		return w("");
	}
	function J(n, e, t, s) {
		return n.addEventListener(e, t, s), () => n.removeEventListener(e, t, s);
	}
	function g(n, e, t) {
		t == null
			? n.removeAttribute(e)
			: n.getAttribute(e) !== t && n.setAttribute(e, t);
	}
	function Hs(n) {
		return Array.from(n.childNodes);
	}
	function N(n, e) {
		(e = "" + e), n.data !== e && (n.data = e);
	}
	function pt(n, e) {
		n.value = e ?? "";
	}
	function B(n, e, t) {
		n.classList[t ? "add" : "remove"](e);
	}
	var st = class {
		constructor(e = !1) {
			(this.is_svg = !1), (this.is_svg = e), (this.e = this.n = null);
		}
		c(e) {
			this.h(e);
		}
		m(e, t, s = null) {
			this.e ||
				(this.is_svg
					? (this.e = ws(t.nodeName))
					: (this.e = C(t.nodeType === 11 ? "TEMPLATE" : t.nodeName)),
				(this.t = t.tagName !== "TEMPLATE" ? t : t.content),
				this.c(e)),
				this.i(s);
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
			for (let t = 0; t < this.n.length; t += 1) {
				S(this.t, this.n[t], e);
			}
		}
		p(e) {
			this.d(), this.h(e), this.i(this.a);
		}
		d() {
			this.n.forEach(k);
		}
	};
	var he;
	function fe(n) {
		he = n;
	}
	function Tn() {
		if (!he) {
			throw new Error("Function called outside component initialization");
		}
		return he;
	}
	function gt(n) {
		Tn().$$.on_mount.push(n);
	}
	function Et(n) {
		Tn().$$.on_destroy.push(n);
	}
	var se = [];
	var le = [],
		re = [],
		ft = [],
		Fs = Promise.resolve(),
		dt = !1;
	function Ns() {
		dt || ((dt = !0), Fs.then(kn));
	}
	function ht(n) {
		re.push(n);
	}
	function Cn(n) {
		ft.push(n);
	}
	var _t = new Set(),
		ne = 0;
	function kn() {
		if (ne !== 0) {
			return;
		}
		let n = he;
		do {
			try {
				for (; ne < se.length; ) {
					let e = se[ne];
					ne++, fe(e), Os(e.$$);
				}
			} catch (e) {
				throw ((se.length = 0), (ne = 0), e);
			}
			for (fe(null), se.length = 0, ne = 0; le.length; ) {
				le.pop()();
			}
			for (let e = 0; e < re.length; e += 1) {
				let t = re[e];
				_t.has(t) || (_t.add(t), t());
			}
			re.length = 0;
		} while (se.length);
		for (; ft.length; ) {
			ft.pop()();
		}
		(dt = !1), _t.clear(), fe(n);
	}
	function Os(n) {
		if (n.fragment !== null) {
			n.update(), G(n.before_update);
			let e = n.dirty;
			(n.dirty = [-1]),
				n.fragment && n.fragment.p(n.ctx, e),
				n.after_update.forEach(ht);
		}
	}
	function js(n) {
		let e = [],
			t = [];
		re.forEach((s) => (n.indexOf(s) === -1 ? e.push(s) : t.push(s))),
			t.forEach((s) => s()),
			(re = e);
	}
	var tt = new Set(),
		ee;
	function ae() {
		ee = { r: 0, c: [], p: ee };
	}
	function oe() {
		ee.r || G(ee.c), (ee = ee.p);
	}
	function U(n, e) {
		n && n.i && (tt.delete(n), n.i(e));
	}
	function P(n, e, t, s) {
		if (n && n.o) {
			if (tt.has(n)) {
				return;
			}
			tt.add(n),
				ee.c.push(() => {
					tt.delete(n), s && (t && n.d(1), s());
				}),
				n.o(e);
		} else {
			s && s();
		}
	}
	function Sn(n, e) {
		P(n, 1, 1, () => {
			e.delete(n.key);
		});
	}
	function yn(n, e, t, s, r, l, i, a, o, f, u, m) {
		let p = n.length,
			h = l.length,
			_ = p,
			c = {};
		for (; _--; ) {
			c[n[_].key] = _;
		}
		let d = [],
			T = new Map(),
			R = new Map(),
			M = [];
		for (_ = h; _--; ) {
			let v = m(r, l, _),
				H = t(v),
				O = i.get(H);
			O ? s && M.push(() => O.p(v, e)) : ((O = f(H, v)), O.c()),
				T.set(H, (d[_] = O)),
				H in c && R.set(H, Math.abs(_ - c[H]));
		}
		let D = new Set(),
			X = new Set();
		function V(v) {
			U(v, 1), v.m(a, u), i.set(v.key, v), (u = v.first), h--;
		}
		for (; p && h; ) {
			let v = d[h - 1],
				H = n[p - 1],
				O = v.key,
				W = H.key;
			v === H
				? ((u = v.first), p--, h--)
				: T.has(W)
					? !i.has(O) || D.has(O)
						? V(v)
						: X.has(W)
							? p--
							: R.get(O) > R.get(W)
								? (X.add(O), V(v))
								: (D.add(W), p--)
					: (o(H, i), p--);
		}
		for (; p--; ) {
			let v = n[p];
			T.has(v.key) || o(v, i);
		}
		for (; h; ) {
			V(d[h - 1]);
		}
		return G(M), d;
	}
	var zs = [
			"allowfullscreen",
			"allowpaymentrequest",
			"async",
			"autofocus",
			"autoplay",
			"checked",
			"controls",
			"default",
			"defer",
			"disabled",
			"formnovalidate",
			"hidden",
			"inert",
			"ismap",
			"loop",
			"multiple",
			"muted",
			"nomodule",
			"novalidate",
			"open",
			"playsinline",
			"readonly",
			"required",
			"reversed",
			"selected",
		],
		Ua = new Set([...zs]);
	function Mn(n, e, t) {
		let s = n.$$.props[e];
		s !== void 0 && ((n.$$.bound[s] = t), t(n.$$.ctx[s]));
	}
	function rt(n) {
		n && n.c();
	}
	function me(n, e, t, s) {
		let { fragment: r, after_update: l } = n.$$;
		r && r.m(e, t),
			s ||
				ht(() => {
					let i = n.$$.on_mount.map(mt).filter(nt);
					n.$$.on_destroy ? n.$$.on_destroy.push(...i) : G(i),
						(n.$$.on_mount = []);
				}),
			l.forEach(ht);
	}
	function ue(n, e) {
		let t = n.$$;
		t.fragment !== null &&
			(js(t.after_update),
			G(t.on_destroy),
			t.fragment && t.fragment.d(e),
			(t.on_destroy = t.fragment = null),
			(t.ctx = []));
	}
	function Us(n, e) {
		n.$$.dirty[0] === -1 && (se.push(n), Ns(), n.$$.dirty.fill(0)),
			(n.$$.dirty[(e / 31) | 0] |= 1 << e % 31);
	}
	function Y(n, e, t, s, r, l, i, a = [-1]) {
		let o = he;
		fe(n);
		let f = (n.$$ = {
			fragment: null,
			ctx: [],
			props: l,
			update: z,
			not_equal: r,
			bound: gn(),
			on_mount: [],
			on_destroy: [],
			on_disconnect: [],
			before_update: [],
			after_update: [],
			context: new Map(e.context || (o ? o.$$.context : [])),
			callbacks: gn(),
			dirty: a,
			skip_bound: !1,
			root: e.target || o.$$.root,
		});
		i && i(f.root);
		let u = !1;
		if (
			((f.ctx = t
				? t(n, e.props || {}, (m, p, ...h) => {
						let _ = h.length ? h[0] : p;
						return (
							f.ctx &&
								r(f.ctx[m], (f.ctx[m] = _)) &&
								(!f.skip_bound && f.bound[m] && f.bound[m](_), u && Us(n, m)),
							p
						);
					})
				: []),
			f.update(),
			(u = !0),
			G(f.before_update),
			(f.fragment = s ? s(f.ctx) : !1),
			e.target)
		) {
			if (e.hydrate) {
				As();
				let m = Hs(e.target);
				f.fragment && f.fragment.l(m), m.forEach(k);
			} else {
				f.fragment && f.fragment.c();
			}
			e.intro && U(n.$$.fragment),
				me(n, e.target, e.anchor, e.customElement),
				vs(),
				kn();
		}
		fe(o);
	}
	var Ds;
	typeof HTMLElement == "function" &&
		(Ds = class extends HTMLElement {
			constructor() {
				super(), this.attachShadow({ mode: "open" });
			}
			connectedCallback() {
				let { on_mount: n } = this.$$;
				this.$$.on_disconnect = n.map(mt).filter(nt);
				for (let e in this.$$.slotted) {
					this.appendChild(this.$$.slotted[e]);
				}
			}
			attributeChangedCallback(n, e, t) {
				this[n] = t;
			}
			disconnectedCallback() {
				G(this.$$.on_disconnect);
			}
			$destroy() {
				ue(this, 1), (this.$destroy = z);
			}
			$on(n, e) {
				if (!nt(e)) {
					return z;
				}
				let t = this.$$.callbacks[n] || (this.$$.callbacks[n] = []);
				return (
					t.push(e),
					() => {
						let s = t.indexOf(e);
						s !== -1 && t.splice(s, 1);
					}
				);
			}
			$set(n) {
				this.$$set &&
					!En(n) &&
					((this.$$.skip_bound = !0), this.$$set(n), (this.$$.skip_bound = !1));
			}
		});
	var q = class {
		$destroy() {
			ue(this, 1), (this.$destroy = z);
		}
		$on(e, t) {
			if (!nt(t)) {
				return z;
			}
			let s = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
			return (
				s.push(t),
				() => {
					let r = s.indexOf(t);
					r !== -1 && s.splice(r, 1);
				}
			);
		}
		$set(e) {
			this.$$set &&
				!En(e) &&
				((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
		}
	};
	function I(n) {
		let e = typeof n == "string" ? n.charCodeAt(0) : n;
		return (e >= 97 && e <= 122) || (e >= 65 && e <= 90);
	}
	function $(n) {
		let e = typeof n == "string" ? n.charCodeAt(0) : n;
		return e >= 48 && e <= 57;
	}
	function Z(n) {
		return I(n) || $(n);
	}
	var An = [
		"art-lojban",
		"cel-gaulish",
		"no-bok",
		"no-nyn",
		"zh-guoyu",
		"zh-hakka",
		"zh-min",
		"zh-min-nan",
		"zh-xiang",
	];
	var Rt = {
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
	};
	var Is = {}.hasOwnProperty;
	function lt(n, e = {}) {
		let t = vn(),
			s = String(n),
			r = s.toLowerCase(),
			l = 0;
		if (n == null) {
			throw new Error("Expected string, got `" + n + "`");
		}
		if (Is.call(Rt, r)) {
			let a = Rt[r];
			return (e.normalize === void 0 || e.normalize === null || e.normalize) &&
				typeof a == "string"
				? lt(a)
				: ((t[An.includes(r) ? "regular" : "irregular"] = s), t);
		}
		for (; I(r.charCodeAt(l)) && l < 9; ) {
			l++;
		}
		if (l > 1 && l < 9) {
			if (((t.language = s.slice(0, l)), l < 4)) {
				let a = 0;
				for (
					;
					r.charCodeAt(l) === 45 &&
					I(r.charCodeAt(l + 1)) &&
					I(r.charCodeAt(l + 2)) &&
					I(r.charCodeAt(l + 3)) &&
					!I(r.charCodeAt(l + 4));

				) {
					if (a > 2) {
						return i(
							l,
							3,
							"Too many extended language subtags, expected at most 3 subtags",
						);
					}
					t.extendedLanguageSubtags.push(s.slice(l + 1, l + 4)), (l += 4), a++;
				}
			}
			for (
				r.charCodeAt(l) === 45 &&
					I(r.charCodeAt(l + 1)) &&
					I(r.charCodeAt(l + 2)) &&
					I(r.charCodeAt(l + 3)) &&
					I(r.charCodeAt(l + 4)) &&
					!I(r.charCodeAt(l + 5)) &&
					((t.script = s.slice(l + 1, l + 5)), (l += 5)),
					r.charCodeAt(l) === 45 &&
						(I(r.charCodeAt(l + 1)) &&
						I(r.charCodeAt(l + 2)) &&
						!I(r.charCodeAt(l + 3))
							? ((t.region = s.slice(l + 1, l + 3)), (l += 3))
							: $(r.charCodeAt(l + 1)) &&
								$(r.charCodeAt(l + 2)) &&
								$(r.charCodeAt(l + 3)) &&
								!$(r.charCodeAt(l + 4)) &&
								((t.region = s.slice(l + 1, l + 4)), (l += 4)));
				r.charCodeAt(l) === 45;

			) {
				let a = l + 1,
					o = a;
				for (; Z(r.charCodeAt(o)); ) {
					if (o - a > 7) {
						return i(o, 1, "Too long variant, expected at most 8 characters");
					}
					o++;
				}
				if (o - a > 4 || (o - a > 3 && $(r.charCodeAt(a)))) {
					t.variants.push(s.slice(a, o)), (l = o);
				} else {
					break;
				}
			}
			for (
				;
				r.charCodeAt(l) === 45 &&
				!(
					r.charCodeAt(l + 1) === 120 ||
					!Z(r.charCodeAt(l + 1)) ||
					r.charCodeAt(l + 2) !== 45 ||
					!Z(r.charCodeAt(l + 3))
				);

			) {
				let a = l + 2,
					o = 0;
				for (
					;
					r.charCodeAt(a) === 45 &&
					Z(r.charCodeAt(a + 1)) &&
					Z(r.charCodeAt(a + 2));

				) {
					let f = a + 1;
					for (a = f + 2, o++; Z(r.charCodeAt(a)); ) {
						if (a - f > 7) {
							return i(
								a,
								2,
								"Too long extension, expected at most 8 characters",
							);
						}
						a++;
					}
				}
				if (!o) {
					return i(
						a,
						4,
						"Empty extension, extensions must have at least 2 characters of content",
					);
				}
				t.extensions.push({
					singleton: s.charAt(l + 1),
					extensions: s.slice(l + 3, a).split("-"),
				}),
					(l = a);
			}
		} else {
			l = 0;
		}
		if (
			(l === 0 && r.charCodeAt(l) === 120) ||
			(r.charCodeAt(l) === 45 && r.charCodeAt(l + 1) === 120)
		) {
			l = l ? l + 2 : 1;
			let a = l;
			for (; r.charCodeAt(a) === 45 && Z(r.charCodeAt(a + 1)); ) {
				let o = l + 1;
				for (a = o; Z(r.charCodeAt(a)); ) {
					if (a - o > 7) {
						return i(
							a,
							5,
							"Too long private-use area, expected at most 8 characters",
						);
					}
					a++;
				}
				t.privateuse.push(s.slice(l + 1, a)), (l = a);
			}
		}
		if (l !== s.length) {
			return i(l, 6, "Found superfluous content after tag");
		}
		return t;
		function i(a, o, f) {
			return e.warning && e.warning(f, o, a), e.forgiving ? t : vn();
		}
	}
	function vn() {
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
	function wn(n, e, t) {
		let s = n.slice();
		return (s[8] = e[t][0]), (s[9] = e[t][1]), s;
	}
	function Ps(n) {
		let e,
			t,
			s,
			r,
			l,
			i = n[0] && Hn(n);
		return {
			c() {
				i && i.c(),
					(e = A()),
					(t = C("div")),
					(s = C("p")),
					(s.textContent = `${n[3](30)}`),
					(r = A()),
					(l = C("p")),
					(l.textContent = `${n[3](40)}`),
					g(
						s,
						"class",
						"pagefind-ui__result-title pagefind-ui__loading svelte-j9e30",
					),
					g(
						l,
						"class",
						"pagefind-ui__result-excerpt pagefind-ui__loading svelte-j9e30",
					),
					g(t, "class", "pagefind-ui__result-inner svelte-j9e30");
			},
			m(a, o) {
				i && i.m(a, o), S(a, e, o), S(a, t, o), b(t, s), b(t, r), b(t, l);
			},
			p(a, o) {
				a[0]
					? i || ((i = Hn(a)), i.c(), i.m(e.parentNode, e))
					: i && (i.d(1), (i = null));
			},
			d(a) {
				i && i.d(a), a && k(e), a && k(t);
			},
		};
	}
	function Ls(n) {
		let e,
			t,
			s,
			r,
			l = n[1].meta?.title + "",
			i,
			a,
			o,
			f,
			u = n[1].excerpt + "",
			m,
			p = n[0] && Fn(n),
			h = n[2].length && On(n);
		return {
			c() {
				p && p.c(),
					(e = A()),
					(t = C("div")),
					(s = C("p")),
					(r = C("a")),
					(i = w(l)),
					(o = A()),
					(f = C("p")),
					(m = A()),
					h && h.c(),
					g(r, "class", "pagefind-ui__result-link svelte-j9e30"),
					g(r, "href", (a = n[1].meta?.url || n[1].url)),
					g(s, "class", "pagefind-ui__result-title svelte-j9e30"),
					g(f, "class", "pagefind-ui__result-excerpt svelte-j9e30"),
					g(t, "class", "pagefind-ui__result-inner svelte-j9e30");
			},
			m(_, c) {
				p && p.m(_, c),
					S(_, e, c),
					S(_, t, c),
					b(t, s),
					b(s, r),
					b(r, i),
					b(t, o),
					b(t, f),
					(f.innerHTML = u),
					b(t, m),
					h && h.m(t, null);
			},
			p(_, c) {
				_[0]
					? p
						? p.p(_, c)
						: ((p = Fn(_)), p.c(), p.m(e.parentNode, e))
					: p && (p.d(1), (p = null)),
					c & 2 && l !== (l = _[1].meta?.title + "") && N(i, l),
					c & 2 && a !== (a = _[1].meta?.url || _[1].url) && g(r, "href", a),
					c & 2 && u !== (u = _[1].excerpt + "") && (f.innerHTML = u),
					_[2].length
						? h
							? h.p(_, c)
							: ((h = On(_)), h.c(), h.m(t, null))
						: h && (h.d(1), (h = null));
			},
			d(_) {
				p && p.d(_), _ && k(e), _ && k(t), h && h.d();
			},
		};
	}
	function Hn(n) {
		let e;
		return {
			c() {
				(e = C("div")),
					g(
						e,
						"class",
						"pagefind-ui__result-thumb pagefind-ui__loading svelte-j9e30",
					);
			},
			m(t, s) {
				S(t, e, s);
			},
			d(t) {
				t && k(e);
			},
		};
	}
	function Fn(n) {
		let e,
			t = n[1].meta.image && Nn(n);
		return {
			c() {
				(e = C("div")),
					t && t.c(),
					g(e, "class", "pagefind-ui__result-thumb svelte-j9e30");
			},
			m(s, r) {
				S(s, e, r), t && t.m(e, null);
			},
			p(s, r) {
				s[1].meta.image
					? t
						? t.p(s, r)
						: ((t = Nn(s)), t.c(), t.m(e, null))
					: t && (t.d(1), (t = null));
			},
			d(s) {
				s && k(e), t && t.d();
			},
		};
	}
	function Nn(n) {
		let e, t, s;
		return {
			c() {
				(e = C("img")),
					g(e, "class", "pagefind-ui__result-image svelte-j9e30"),
					ie(e.src, (t = n[1].meta?.image)) || g(e, "src", t),
					g(e, "alt", (s = n[1].meta?.image_alt || n[1].meta?.title));
			},
			m(r, l) {
				S(r, e, l);
			},
			p(r, l) {
				l & 2 && !ie(e.src, (t = r[1].meta?.image)) && g(e, "src", t),
					l & 2 &&
						s !== (s = r[1].meta?.image_alt || r[1].meta?.title) &&
						g(e, "alt", s);
			},
			d(r) {
				r && k(e);
			},
		};
	}
	function On(n) {
		let e,
			t = n[2],
			s = [];
		for (let r = 0; r < t.length; r += 1) {
			s[r] = jn(wn(n, t, r));
		}
		return {
			c() {
				e = C("ul");
				for (let r = 0; r < s.length; r += 1) {
					s[r].c();
				}
				g(e, "class", "pagefind-ui__result-tags svelte-j9e30");
			},
			m(r, l) {
				S(r, e, l);
				for (let i = 0; i < s.length; i += 1) {
					s[i] && s[i].m(e, null);
				}
			},
			p(r, l) {
				if (l & 4) {
					t = r[2];
					let i;
					for (i = 0; i < t.length; i += 1) {
						let a = wn(r, t, i);
						s[i] ? s[i].p(a, l) : ((s[i] = jn(a)), s[i].c(), s[i].m(e, null));
					}
					for (; i < s.length; i += 1) {
						s[i].d(1);
					}
					s.length = t.length;
				}
			},
			d(r) {
				r && k(e), Q(s, r);
			},
		};
	}
	function jn(n) {
		let e,
			t = n[8].replace(/^(\w)/, zn) + "",
			s,
			r,
			l = n[9] + "",
			i,
			a,
			o;
		return {
			c() {
				(e = C("li")),
					(s = w(t)),
					(r = w(": ")),
					(i = w(l)),
					(a = A()),
					g(e, "class", "pagefind-ui__result-tag svelte-j9e30"),
					g(e, "data-pagefind-ui-meta", (o = n[8]));
			},
			m(f, u) {
				S(f, e, u), b(e, s), b(e, r), b(e, i), b(e, a);
			},
			p(f, u) {
				u & 4 && t !== (t = f[8].replace(/^(\w)/, zn) + "") && N(s, t),
					u & 4 && l !== (l = f[9] + "") && N(i, l),
					u & 4 && o !== (o = f[8]) && g(e, "data-pagefind-ui-meta", o);
			},
			d(f) {
				f && k(e);
			},
		};
	}
	function qs(n) {
		let e;
		function t(l, i) {
			return l[1] ? Ls : Ps;
		}
		let s = t(n, -1),
			r = s(n);
		return {
			c() {
				(e = C("li")), r.c(), g(e, "class", "pagefind-ui__result svelte-j9e30");
			},
			m(l, i) {
				S(l, e, i), r.m(e, null);
			},
			p(l, [i]) {
				s === (s = t(l, i)) && r
					? r.p(l, i)
					: (r.d(1), (r = s(l)), r && (r.c(), r.m(e, null)));
			},
			i: z,
			o: z,
			d(l) {
				l && k(e), r.d();
			},
		};
	}
	var zn = (n) => n.toLocaleUpperCase();
	function Bs(n, e, t) {
		let { show_images: s = !0 } = e,
			{ process_result: r = null } = e,
			{ result: l = { data: async () => {} } } = e,
			i = ["title", "image", "image_alt", "url"],
			a,
			o = [],
			f = async (m) => {
				t(1, (a = await m.data())),
					t(1, (a = r?.(a) ?? a)),
					t(2, (o = Object.entries(a.meta).filter(([p]) => !i.includes(p))));
			},
			u = (m = 30) => ". ".repeat(Math.floor(10 + Math.random() * m));
		return (
			(n.$$set = (m) => {
				"show_images" in m && t(0, (s = m.show_images)),
					"process_result" in m && t(4, (r = m.process_result)),
					"result" in m && t(5, (l = m.result));
			}),
			(n.$$.update = () => {
				if (n.$$.dirty & 32) {
					e: f(l);
				}
			}),
			[s, a, o, u, r, l]
		);
	}
	var bt = class extends q {
			constructor(e) {
				super(),
					Y(this, e, Bs, qs, K, {
						show_images: 0,
						process_result: 4,
						result: 5,
					});
			}
		},
		Un = bt;
	function Dn(n, e, t) {
		let s = n.slice();
		return (s[11] = e[t][0]), (s[12] = e[t][1]), s;
	}
	function In(n, e, t) {
		let s = n.slice();
		return (s[15] = e[t]), s;
	}
	function Vs(n) {
		let e,
			t,
			s,
			r,
			l,
			i = n[0] && Pn(n);
		return {
			c() {
				i && i.c(),
					(e = A()),
					(t = C("div")),
					(s = C("p")),
					(s.textContent = `${n[5](30)}`),
					(r = A()),
					(l = C("p")),
					(l.textContent = `${n[5](40)}`),
					g(
						s,
						"class",
						"pagefind-ui__result-title pagefind-ui__loading svelte-4xnkmf",
					),
					g(
						l,
						"class",
						"pagefind-ui__result-excerpt pagefind-ui__loading svelte-4xnkmf",
					),
					g(t, "class", "pagefind-ui__result-inner svelte-4xnkmf");
			},
			m(a, o) {
				i && i.m(a, o), S(a, e, o), S(a, t, o), b(t, s), b(t, r), b(t, l);
			},
			p(a, o) {
				a[0]
					? i || ((i = Pn(a)), i.c(), i.m(e.parentNode, e))
					: i && (i.d(1), (i = null));
			},
			d(a) {
				i && i.d(a), a && k(e), a && k(t);
			},
		};
	}
	function Ws(n) {
		let e,
			t,
			s,
			r,
			l = n[1].meta?.title + "",
			i,
			a,
			o,
			f,
			u,
			m = n[0] && Ln(n),
			p = n[4] && Bn(n),
			h = n[3],
			_ = [];
		for (let d = 0; d < h.length; d += 1) {
			_[d] = Vn(In(n, h, d));
		}
		let c = n[2].length && Wn(n);
		return {
			c() {
				m && m.c(),
					(e = A()),
					(t = C("div")),
					(s = C("p")),
					(r = C("a")),
					(i = w(l)),
					(o = A()),
					p && p.c(),
					(f = A());
				for (let d = 0; d < _.length; d += 1) {
					_[d].c();
				}
				(u = A()),
					c && c.c(),
					g(r, "class", "pagefind-ui__result-link svelte-4xnkmf"),
					g(r, "href", (a = n[1].meta?.url || n[1].url)),
					g(s, "class", "pagefind-ui__result-title svelte-4xnkmf"),
					g(t, "class", "pagefind-ui__result-inner svelte-4xnkmf");
			},
			m(d, T) {
				m && m.m(d, T),
					S(d, e, T),
					S(d, t, T),
					b(t, s),
					b(s, r),
					b(r, i),
					b(t, o),
					p && p.m(t, null),
					b(t, f);
				for (let R = 0; R < _.length; R += 1) {
					_[R] && _[R].m(t, null);
				}
				b(t, u), c && c.m(t, null);
			},
			p(d, T) {
				if (
					(d[0]
						? m
							? m.p(d, T)
							: ((m = Ln(d)), m.c(), m.m(e.parentNode, e))
						: m && (m.d(1), (m = null)),
					T & 2 && l !== (l = d[1].meta?.title + "") && N(i, l),
					T & 2 && a !== (a = d[1].meta?.url || d[1].url) && g(r, "href", a),
					d[4]
						? p
							? p.p(d, T)
							: ((p = Bn(d)), p.c(), p.m(t, f))
						: p && (p.d(1), (p = null)),
					T & 8)
				) {
					h = d[3];
					let R;
					for (R = 0; R < h.length; R += 1) {
						let M = In(d, h, R);
						_[R] ? _[R].p(M, T) : ((_[R] = Vn(M)), _[R].c(), _[R].m(t, u));
					}
					for (; R < _.length; R += 1) {
						_[R].d(1);
					}
					_.length = h.length;
				}
				d[2].length
					? c
						? c.p(d, T)
						: ((c = Wn(d)), c.c(), c.m(t, null))
					: c && (c.d(1), (c = null));
			},
			d(d) {
				m && m.d(d), d && k(e), d && k(t), p && p.d(), Q(_, d), c && c.d();
			},
		};
	}
	function Pn(n) {
		let e;
		return {
			c() {
				(e = C("div")),
					g(
						e,
						"class",
						"pagefind-ui__result-thumb pagefind-ui__loading svelte-4xnkmf",
					);
			},
			m(t, s) {
				S(t, e, s);
			},
			d(t) {
				t && k(e);
			},
		};
	}
	function Ln(n) {
		let e,
			t = n[1].meta.image && qn(n);
		return {
			c() {
				(e = C("div")),
					t && t.c(),
					g(e, "class", "pagefind-ui__result-thumb svelte-4xnkmf");
			},
			m(s, r) {
				S(s, e, r), t && t.m(e, null);
			},
			p(s, r) {
				s[1].meta.image
					? t
						? t.p(s, r)
						: ((t = qn(s)), t.c(), t.m(e, null))
					: t && (t.d(1), (t = null));
			},
			d(s) {
				s && k(e), t && t.d();
			},
		};
	}
	function qn(n) {
		let e, t, s;
		return {
			c() {
				(e = C("img")),
					g(e, "class", "pagefind-ui__result-image svelte-4xnkmf"),
					ie(e.src, (t = n[1].meta?.image)) || g(e, "src", t),
					g(e, "alt", (s = n[1].meta?.image_alt || n[1].meta?.title));
			},
			m(r, l) {
				S(r, e, l);
			},
			p(r, l) {
				l & 2 && !ie(e.src, (t = r[1].meta?.image)) && g(e, "src", t),
					l & 2 &&
						s !== (s = r[1].meta?.image_alt || r[1].meta?.title) &&
						g(e, "alt", s);
			},
			d(r) {
				r && k(e);
			},
		};
	}
	function Bn(n) {
		let e,
			t = n[1].excerpt + "";
		return {
			c() {
				(e = C("p")),
					g(e, "class", "pagefind-ui__result-excerpt svelte-4xnkmf");
			},
			m(s, r) {
				S(s, e, r), (e.innerHTML = t);
			},
			p(s, r) {
				r & 2 && t !== (t = s[1].excerpt + "") && (e.innerHTML = t);
			},
			d(s) {
				s && k(e);
			},
		};
	}
	function Vn(n) {
		let e,
			t,
			s,
			r = n[15].title + "",
			l,
			i,
			a,
			o,
			f = n[15].excerpt + "";
		return {
			c() {
				(e = C("div")),
					(t = C("p")),
					(s = C("a")),
					(l = w(r)),
					(a = A()),
					(o = C("p")),
					g(s, "class", "pagefind-ui__result-link svelte-4xnkmf"),
					g(s, "href", (i = n[15].url)),
					g(t, "class", "pagefind-ui__result-title svelte-4xnkmf"),
					g(o, "class", "pagefind-ui__result-excerpt svelte-4xnkmf"),
					g(e, "class", "pagefind-ui__result-nested svelte-4xnkmf");
			},
			m(u, m) {
				S(u, e, m),
					b(e, t),
					b(t, s),
					b(s, l),
					b(e, a),
					b(e, o),
					(o.innerHTML = f);
			},
			p(u, m) {
				m & 8 && r !== (r = u[15].title + "") && N(l, r),
					m & 8 && i !== (i = u[15].url) && g(s, "href", i),
					m & 8 && f !== (f = u[15].excerpt + "") && (o.innerHTML = f);
			},
			d(u) {
				u && k(e);
			},
		};
	}
	function Wn(n) {
		let e,
			t = n[2],
			s = [];
		for (let r = 0; r < t.length; r += 1) {
			s[r] = Gn(Dn(n, t, r));
		}
		return {
			c() {
				e = C("ul");
				for (let r = 0; r < s.length; r += 1) {
					s[r].c();
				}
				g(e, "class", "pagefind-ui__result-tags svelte-4xnkmf");
			},
			m(r, l) {
				S(r, e, l);
				for (let i = 0; i < s.length; i += 1) {
					s[i] && s[i].m(e, null);
				}
			},
			p(r, l) {
				if (l & 4) {
					t = r[2];
					let i;
					for (i = 0; i < t.length; i += 1) {
						let a = Dn(r, t, i);
						s[i] ? s[i].p(a, l) : ((s[i] = Gn(a)), s[i].c(), s[i].m(e, null));
					}
					for (; i < s.length; i += 1) {
						s[i].d(1);
					}
					s.length = t.length;
				}
			},
			d(r) {
				r && k(e), Q(s, r);
			},
		};
	}
	function Gn(n) {
		let e,
			t = n[11].replace(/^(\w)/, Kn) + "",
			s,
			r,
			l = n[12] + "",
			i,
			a,
			o;
		return {
			c() {
				(e = C("li")),
					(s = w(t)),
					(r = w(": ")),
					(i = w(l)),
					(a = A()),
					g(e, "class", "pagefind-ui__result-tag svelte-4xnkmf"),
					g(e, "data-pagefind-ui-meta", (o = n[11]));
			},
			m(f, u) {
				S(f, e, u), b(e, s), b(e, r), b(e, i), b(e, a);
			},
			p(f, u) {
				u & 4 && t !== (t = f[11].replace(/^(\w)/, Kn) + "") && N(s, t),
					u & 4 && l !== (l = f[12] + "") && N(i, l),
					u & 4 && o !== (o = f[11]) && g(e, "data-pagefind-ui-meta", o);
			},
			d(f) {
				f && k(e);
			},
		};
	}
	function Gs(n) {
		let e;
		function t(l, i) {
			return l[1] ? Ws : Vs;
		}
		let s = t(n, -1),
			r = s(n);
		return {
			c() {
				(e = C("li")),
					r.c(),
					g(e, "class", "pagefind-ui__result svelte-4xnkmf");
			},
			m(l, i) {
				S(l, e, i), r.m(e, null);
			},
			p(l, [i]) {
				s === (s = t(l, i)) && r
					? r.p(l, i)
					: (r.d(1), (r = s(l)), r && (r.c(), r.m(e, null)));
			},
			i: z,
			o: z,
			d(l) {
				l && k(e), r.d();
			},
		};
	}
	var Kn = (n) => n.toLocaleUpperCase();
	function Ks(n, e, t) {
		let { show_images: s = !0 } = e,
			{ process_result: r = null } = e,
			{ result: l = { data: async () => {} } } = e,
			i = ["title", "image", "image_alt", "url"],
			a,
			o = [],
			f = [],
			u = !1,
			m = (_, c) => {
				if (_.length <= c) {
					return _;
				}
				let d = [..._]
					.sort((T, R) => R.locations.length - T.locations.length)
					.slice(0, 3)
					.map((T) => T.url);
				return _.filter((T) => d.includes(T.url));
			},
			p = async (_) => {
				t(1, (a = await _.data())),
					t(1, (a = r?.(a) ?? a)),
					t(2, (o = Object.entries(a.meta).filter(([c]) => !i.includes(c)))),
					Array.isArray(a.sub_results) &&
						(t(4, (u = a.sub_results?.[0]?.url === (a.meta?.url || a.url))),
						u
							? t(3, (f = m(a.sub_results.slice(1), 3)))
							: t(3, (f = m([...a.sub_results], 3))));
			},
			h = (_ = 30) => ". ".repeat(Math.floor(10 + Math.random() * _));
		return (
			(n.$$set = (_) => {
				"show_images" in _ && t(0, (s = _.show_images)),
					"process_result" in _ && t(6, (r = _.process_result)),
					"result" in _ && t(7, (l = _.result));
			}),
			(n.$$.update = () => {
				if (n.$$.dirty & 128) {
					e: p(l);
				}
			}),
			[s, a, o, f, u, h, r, l]
		);
	}
	var Tt = class extends q {
			constructor(e) {
				super(),
					Y(this, e, Ks, Gs, K, {
						show_images: 0,
						process_result: 6,
						result: 7,
					});
			}
		},
		Jn = Tt;
	function Yn(n, e, t) {
		let s = n.slice();
		return (s[10] = e[t][0]), (s[11] = e[t][1]), (s[12] = e), (s[13] = t), s;
	}
	function Zn(n, e, t) {
		let s = n.slice();
		return (s[14] = e[t][0]), (s[15] = e[t][1]), (s[16] = e), (s[17] = t), s;
	}
	function Xn(n) {
		let e,
			t,
			s = n[4]("filters_label", n[5], n[6]) + "",
			r,
			l,
			i = Object.entries(n[1]),
			a = [];
		for (let o = 0; o < i.length; o += 1) {
			a[o] = $n(Yn(n, i, o));
		}
		return {
			c() {
				(e = C("fieldset")), (t = C("legend")), (r = w(s)), (l = A());
				for (let o = 0; o < a.length; o += 1) {
					a[o].c();
				}
				g(t, "class", "pagefind-ui__filter-panel-label svelte-1v2r7ls"),
					g(e, "class", "pagefind-ui__filter-panel svelte-1v2r7ls");
			},
			m(o, f) {
				S(o, e, f), b(e, t), b(t, r), b(e, l);
				for (let u = 0; u < a.length; u += 1) {
					a[u] && a[u].m(e, null);
				}
			},
			p(o, f) {
				if (
					(f & 112 &&
						s !== (s = o[4]("filters_label", o[5], o[6]) + "") &&
						N(r, s),
					f & 143)
				) {
					i = Object.entries(o[1]);
					let u;
					for (u = 0; u < i.length; u += 1) {
						let m = Yn(o, i, u);
						a[u] ? a[u].p(m, f) : ((a[u] = $n(m)), a[u].c(), a[u].m(e, null));
					}
					for (; u < a.length; u += 1) {
						a[u].d(1);
					}
					a.length = i.length;
				}
			},
			d(o) {
				o && k(e), Q(a, o);
			},
		};
	}
	function Qn(n) {
		let e,
			t,
			s,
			r,
			l,
			i,
			a,
			o,
			f = n[14] + "",
			u,
			m = n[15] + "",
			p,
			h,
			_,
			c,
			d,
			T;
		function R() {
			n[9].call(t, n[10], n[14]);
		}
		return {
			c() {
				(e = C("div")),
					(t = C("input")),
					(i = A()),
					(a = C("label")),
					(o = new st(!1)),
					(u = w(" (")),
					(p = w(m)),
					(h = w(")")),
					(c = A()),
					g(t, "class", "pagefind-ui__filter-checkbox svelte-1v2r7ls"),
					g(t, "type", "checkbox"),
					g(t, "id", (s = n[10] + "-" + n[14])),
					g(t, "name", (r = n[10])),
					(t.__value = l = n[14]),
					(t.value = t.__value),
					(o.a = u),
					g(a, "class", "pagefind-ui__filter-label svelte-1v2r7ls"),
					g(a, "for", (_ = n[10] + "-" + n[14])),
					g(e, "class", "pagefind-ui__filter-value svelte-1v2r7ls"),
					B(e, "pagefind-ui__filter-value--checked", n[0][`${n[10]}:${n[14]}`]);
			},
			m(M, D) {
				S(M, e, D),
					b(e, t),
					(t.checked = n[0][`${n[10]}:${n[14]}`]),
					b(e, i),
					b(e, a),
					o.m(f, a),
					b(a, u),
					b(a, p),
					b(a, h),
					b(e, c),
					d || ((T = J(t, "change", R)), (d = !0));
			},
			p(M, D) {
				(n = M),
					D & 2 && s !== (s = n[10] + "-" + n[14]) && g(t, "id", s),
					D & 2 && r !== (r = n[10]) && g(t, "name", r),
					D & 2 &&
						l !== (l = n[14]) &&
						((t.__value = l), (t.value = t.__value)),
					D & 3 && (t.checked = n[0][`${n[10]}:${n[14]}`]),
					D & 2 && f !== (f = n[14] + "") && o.p(f),
					D & 2 && m !== (m = n[15] + "") && N(p, m),
					D & 2 && _ !== (_ = n[10] + "-" + n[14]) && g(a, "for", _),
					D & 3 &&
						B(
							e,
							"pagefind-ui__filter-value--checked",
							n[0][`${n[10]}:${n[14]}`],
						);
			},
			d(M) {
				M && k(e), (d = !1), T();
			},
		};
	}
	function xn(n) {
		let e,
			t = (n[2] || n[15] || n[0][`${n[10]}:${n[14]}`]) && Qn(n);
		return {
			c() {
				t && t.c(), (e = x());
			},
			m(s, r) {
				t && t.m(s, r), S(s, e, r);
			},
			p(s, r) {
				s[2] || s[15] || s[0][`${s[10]}:${s[14]}`]
					? t
						? t.p(s, r)
						: ((t = Qn(s)), t.c(), t.m(e.parentNode, e))
					: t && (t.d(1), (t = null));
			},
			d(s) {
				t && t.d(s), s && k(e);
			},
		};
	}
	function $n(n) {
		let e,
			t,
			s = n[10].replace(/^(\w)/, es) + "",
			r,
			l,
			i,
			a = n[10] + "",
			o,
			f,
			u,
			m = Object.entries(n[11] || {}),
			p = [];
		for (let h = 0; h < m.length; h += 1) {
			p[h] = xn(Zn(n, m, h));
		}
		return {
			c() {
				(e = C("details")),
					(t = C("summary")),
					(r = A()),
					(l = C("fieldset")),
					(i = C("legend")),
					(o = A());
				for (let h = 0; h < p.length; h += 1) {
					p[h].c();
				}
				(f = A()),
					g(t, "class", "pagefind-ui__filter-name svelte-1v2r7ls"),
					g(i, "class", "pagefind-ui__filter-group-label svelte-1v2r7ls"),
					g(l, "class", "pagefind-ui__filter-group svelte-1v2r7ls"),
					g(e, "class", "pagefind-ui__filter-block svelte-1v2r7ls"),
					(e.open = u = n[7] || n[3].map(ts).includes(n[10].toLowerCase()));
			},
			m(h, _) {
				S(h, e, _),
					b(e, t),
					(t.innerHTML = s),
					b(e, r),
					b(e, l),
					b(l, i),
					(i.innerHTML = a),
					b(l, o);
				for (let c = 0; c < p.length; c += 1) {
					p[c] && p[c].m(l, null);
				}
				b(e, f);
			},
			p(h, _) {
				if (
					(_ & 2 &&
						s !== (s = h[10].replace(/^(\w)/, es) + "") &&
						(t.innerHTML = s),
					_ & 2 && a !== (a = h[10] + "") && (i.innerHTML = a),
					_ & 7)
				) {
					m = Object.entries(h[11] || {});
					let c;
					for (c = 0; c < m.length; c += 1) {
						let d = Zn(h, m, c);
						p[c] ? p[c].p(d, _) : ((p[c] = xn(d)), p[c].c(), p[c].m(l, null));
					}
					for (; c < p.length; c += 1) {
						p[c].d(1);
					}
					p.length = m.length;
				}
				_ & 138 &&
					u !== (u = h[7] || h[3].map(ts).includes(h[10].toLowerCase())) &&
					(e.open = u);
			},
			d(h) {
				h && k(e), Q(p, h);
			},
		};
	}
	function Js(n) {
		let e = n[1] && Object.entries(n[1]).length,
			t,
			s = e && Xn(n);
		return {
			c() {
				s && s.c(), (t = x());
			},
			m(r, l) {
				s && s.m(r, l), S(r, t, l);
			},
			p(r, [l]) {
				l & 2 && (e = r[1] && Object.entries(r[1]).length),
					e
						? s
							? s.p(r, l)
							: ((s = Xn(r)), s.c(), s.m(t.parentNode, t))
						: s && (s.d(1), (s = null));
			},
			i: z,
			o: z,
			d(r) {
				s && s.d(r), r && k(t);
			},
		};
	}
	var es = (n) => n.toLocaleUpperCase(),
		ts = (n) => n.toLowerCase();
	function Ys(n, e, t) {
		let { available_filters: s = null } = e,
			{ show_empty_filters: r = !0 } = e,
			{ open_filters: l = [] } = e,
			{ translate: i = () => "" } = e,
			{ automatic_translations: a = {} } = e,
			{ translations: o = {} } = e,
			{ selected_filters: f = {} } = e,
			u = !1,
			m = !1;
		function p(h, _) {
			(f[`${h}:${_}`] = this.checked), t(0, f);
		}
		return (
			(n.$$set = (h) => {
				"available_filters" in h && t(1, (s = h.available_filters)),
					"show_empty_filters" in h && t(2, (r = h.show_empty_filters)),
					"open_filters" in h && t(3, (l = h.open_filters)),
					"translate" in h && t(4, (i = h.translate)),
					"automatic_translations" in h && t(5, (a = h.automatic_translations)),
					"translations" in h && t(6, (o = h.translations)),
					"selected_filters" in h && t(0, (f = h.selected_filters));
			}),
			(n.$$.update = () => {
				if (n.$$.dirty & 258) {
					e: if (s && !u) {
						t(8, (u = !0));
						let h = Object.entries(s || {});
						h.length === 1 &&
							Object.entries(h[0][1])?.length <= 6 &&
							t(7, (m = !0));
					}
				}
			}),
			[f, s, r, l, i, a, o, m, u, p]
		);
	}
	var Ct = class extends q {
			constructor(e) {
				super(),
					Y(this, e, Ys, Js, K, {
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
		ns = Ct;
	var kt = {};
	y(kt, {
		comments: () => Xs,
		default: () => $s,
		direction: () => Qs,
		strings: () => xs,
		thanks_to: () => Zs,
	});
	var Zs = "Jan Claasen <jan@cloudcannon.com>",
		Xs = "",
		Qs = "ltr",
		xs = {
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
		$s = { thanks_to: Zs, comments: Xs, direction: Qs, strings: xs };
	var St = {};
	y(St, {
		comments: () => tr,
		default: () => rr,
		direction: () => nr,
		strings: () => sr,
		thanks_to: () => er,
	});
	var er = "Jermanuts",
		tr = "",
		nr = "rtl",
		sr = {
			placeholder: "\u0628\u062D\u062B",
			clear_search: "\u0627\u0645\u0633\u062D",
			load_more:
				"\u062D\u0645\u0651\u0650\u0644 \u0627\u0644\u0645\u0632\u064A\u062F \u0645\u0646 \u0627\u0644\u0646\u062A\u0627\u0626\u062C",
			search_label:
				"\u0627\u0628\u062D\u062B \u0641\u064A \u0647\u0630\u0627 \u0627\u0644\u0645\u0648\u0642\u0639",
			filters_label: "\u062A\u0635\u0641\u064A\u0627\u062A",
			zero_results:
				"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644 [SEARCH_TERM]",
			many_results:
				"[COUNT] \u0646\u062A\u0627\u0626\u062C \u0644 [SEARCH_TERM]",
			one_result: "[COUNT] \u0646\u062A\u064A\u062C\u0629 \u0644 [SEARCH_TERM]",
			alt_search:
				"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644 [SEARCH_TERM]. \u064A\u0639\u0631\u0636 \u0627\u0644\u0646\u062A\u0627\u0626\u062C \u0644 [DIFFERENT_TERM] \u0628\u062F\u0644\u0627\u064B \u0645\u0646 \u0630\u0644\u0643",
			search_suggestion:
				"\u0644\u0627 \u062A\u0648\u062C\u062F \u0646\u062A\u0627\u0626\u062C \u0644 [SEARCH_TERM]. \u062C\u0631\u0628 \u0623\u062D\u062F \u0639\u0645\u0644\u064A\u0627\u062A \u0627\u0644\u0628\u062D\u062B \u0627\u0644\u062A\u0627\u0644\u064A\u0629:",
			searching: "\u064A\u0628\u062D\u062B \u0639\u0646 [SEARCH_TERM]...",
		},
		rr = { thanks_to: er, comments: tr, direction: nr, strings: sr };
	var yt = {};
	y(yt, {
		comments: () => ir,
		default: () => ur,
		direction: () => ar,
		strings: () => or,
		thanks_to: () => lr,
	});
	var lr = "Maruf Alom <mail@marufalom.com>",
		ir = "",
		ar = "ltr",
		or = {
			placeholder:
				"\u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8",
			clear_search: "\u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2\u09C1\u09A8",
			load_more:
				"\u0986\u09B0\u09CB \u09AB\u09B2\u09BE\u09AB\u09B2 \u09A6\u09C7\u0996\u09C1\u09A8",
			search_label:
				"\u098F\u0987 \u0993\u09DF\u09C7\u09AC\u09B8\u09BE\u0987\u099F\u09C7 \u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8",
			filters_label: "\u09AB\u09BF\u09B2\u09CD\u099F\u09BE\u09B0",
			zero_results:
				"[SEARCH_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF \u0995\u09BF\u099B\u09C1 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF",
			many_results:
				"[COUNT]-\u099F\u09BF \u09AB\u09B2\u09BE\u09AB\u09B2 \u09AA\u09BE\u0993\u09DF\u09BE \u0997\u09BF\u09DF\u09C7\u099B\u09C7 [SEARCH_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF",
			one_result:
				"[COUNT]-\u099F\u09BF \u09AB\u09B2\u09BE\u09AB\u09B2 \u09AA\u09BE\u0993\u09DF\u09BE \u0997\u09BF\u09DF\u09C7\u099B\u09C7 [SEARCH_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF",
			alt_search:
				"\u0995\u09CB\u09A8 \u0995\u09BF\u099B\u09C1 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF [SEARCH_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF. \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09C7 [DIFFERENT_TERM] \u098F\u09B0 \u099C\u09A8\u09CD\u09AF \u09A6\u09C7\u0996\u09BE\u09A8\u09CB \u09B9\u099A\u09CD\u099B\u09C7",
			search_suggestion:
				"\u0995\u09CB\u09A8 \u0995\u09BF\u099B\u09C1 \u0996\u09C1\u0981\u099C\u09C7 \u09AA\u09BE\u0993\u09DF\u09BE \u09AF\u09BE\u09DF\u09A8\u09BF [SEARCH_TERM] \u098F\u09B0 \u09AC\u09BF\u09B7\u09DF\u09C7. \u09A8\u09BF\u09A8\u09CD\u09AE\u09C7\u09B0 \u09AC\u09BF\u09B7\u09DF\u09AC\u09B8\u09CD\u09A4\u09C1 \u0996\u09C1\u0981\u099C\u09C7 \u09A6\u09C7\u0996\u09C1\u09A8:",
			searching:
				"\u0985\u09A8\u09C1\u09B8\u09A8\u09CD\u09A7\u09BE\u09A8 \u099A\u09B2\u099B\u09C7 [SEARCH_TERM]...",
		},
		ur = { thanks_to: lr, comments: ir, direction: ar, strings: or };
	var Mt = {};
	y(Mt, {
		comments: () => _r,
		default: () => hr,
		direction: () => fr,
		strings: () => dr,
		thanks_to: () => cr,
	});
	var cr = "Pablo Villaverde <https://github.com/pvillaverde>",
		_r = "",
		fr = "ltr",
		dr = {
			placeholder: "Cerca",
			clear_search: "Netejar",
			load_more: "Veure m\xE9s resultats",
			search_label: "Cerca en aquest lloc",
			filters_label: "Filtres",
			zero_results: "No es van trobar resultats per [SEARCH_TERM]",
			many_results: "[COUNT] resultats trobats per [SEARCH_TERM]",
			one_result: "[COUNT] resultat trobat per [SEARCH_TERM]",
			alt_search:
				"No es van trobar resultats per [SEARCH_TERM]. Mostrant al seu lloc resultats per [DIFFERENT_TERM]",
			search_suggestion:
				"No es van trobar resultats per [SEARCH_TERM]. Proveu una de les cerques seg\xFCents:",
			searching: "Cercant [SEARCH_TERM]...",
		},
		hr = { thanks_to: cr, comments: _r, direction: fr, strings: dr };
	var At = {};
	y(At, {
		comments: () => pr,
		default: () => Rr,
		direction: () => gr,
		strings: () => Er,
		thanks_to: () => mr,
	});
	var mr = "Dalibor Hon <https://github.com/dallyh>",
		pr = "",
		gr = "ltr",
		Er = {
			placeholder: "Hledat",
			clear_search: "Smazat",
			load_more: "Na\u010D\xEDst dal\u0161\xED v\xFDsledky",
			search_label: "Prohledat tuto str\xE1nku",
			filters_label: "Filtry",
			zero_results: "\u017D\xE1dn\xE9 v\xFDsledky pro [SEARCH_TERM]",
			many_results: "[COUNT] v\xFDsledk\u016F pro [SEARCH_TERM]",
			one_result: "[COUNT] v\xFDsledek pro [SEARCH_TERM]",
			alt_search:
				"\u017D\xE1dn\xE9 v\xFDsledky pro [SEARCH_TERM]. Zobrazuj\xED se v\xFDsledky pro [DIFFERENT_TERM]",
			search_suggestion:
				"\u017D\xE1dn\xE9 v\xFDsledky pro [SEARCH_TERM]. Souvisej\xEDc\xED v\xFDsledky hled\xE1n\xED:",
			searching: "Hled\xE1m [SEARCH_TERM]...",
		},
		Rr = { thanks_to: mr, comments: pr, direction: gr, strings: Er };
	var vt = {};
	y(vt, {
		comments: () => Tr,
		default: () => Sr,
		direction: () => Cr,
		strings: () => kr,
		thanks_to: () => br,
	});
	var br = "Jonas Smedegaard <dr@jones.dk>",
		Tr = "",
		Cr = "ltr",
		kr = {
			placeholder: "S\xF8g",
			clear_search: "Nulstil",
			load_more: "Indl\xE6s flere resultater",
			search_label: "S\xF8g p\xE5 dette website",
			filters_label: "Filtre",
			zero_results: "Ingen resultater for [SEARCH_TERM]",
			many_results: "[COUNT] resultater for [SEARCH_TERM]",
			one_result: "[COUNT] resultat for [SEARCH_TERM]",
			alt_search:
				"Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
			search_suggestion:
				"Ingen resultater for [SEARCH_TERM]. Pr\xF8v et af disse s\xF8geord i stedet:",
			searching: "S\xF8ger efter [SEARCH_TERM]...",
		},
		Sr = { thanks_to: br, comments: Tr, direction: Cr, strings: kr };
	var wt = {};
	y(wt, {
		comments: () => Mr,
		default: () => wr,
		direction: () => Ar,
		strings: () => vr,
		thanks_to: () => yr,
	});
	var yr = "Jan Claasen <jan@cloudcannon.com>",
		Mr = "",
		Ar = "ltr",
		vr = {
			placeholder: "Suche",
			clear_search: "L\xF6schen",
			load_more: "Mehr Ergebnisse laden",
			search_label: "Suche diese Seite",
			filters_label: "Filter",
			zero_results: "Keine Ergebnisse f\xFCr [SEARCH_TERM]",
			many_results: "[COUNT] Ergebnisse f\xFCr [SEARCH_TERM]",
			one_result: "[COUNT] Ergebnis f\xFCr [SEARCH_TERM]",
			alt_search:
				"Keine Ergebnisse f\xFCr [SEARCH_TERM]. Stattdessen werden Ergebnisse f\xFCr [DIFFERENT_TERM] angezeigt",
			search_suggestion:
				"Keine Ergebnisse f\xFCr [SEARCH_TERM]. Versuchen Sie eine der folgenden Suchen:",
			searching: "Suche f\xFCr [SEARCH_TERM]",
		},
		wr = { thanks_to: yr, comments: Mr, direction: Ar, strings: vr };
	var Ht = {};
	y(Ht, {
		comments: () => Fr,
		default: () => jr,
		direction: () => Nr,
		strings: () => Or,
		thanks_to: () => Hr,
	});
	var Hr = "Liam Bigelow <liam@cloudcannon.com>",
		Fr = "",
		Nr = "ltr",
		Or = {
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
		jr = { thanks_to: Hr, comments: Fr, direction: Nr, strings: Or };
	var Ft = {};
	y(Ft, {
		comments: () => Ur,
		default: () => Pr,
		direction: () => Dr,
		strings: () => Ir,
		thanks_to: () => zr,
	});
	var zr = "Pablo Villaverde <https://github.com/pvillaverde>",
		Ur = "",
		Dr = "ltr",
		Ir = {
			placeholder: "Buscar",
			clear_search: "Limpiar",
			load_more: "Ver m\xE1s resultados",
			search_label: "Buscar en este sitio",
			filters_label: "Filtros",
			zero_results: "No se encontraron resultados para [SEARCH_TERM]",
			many_results: "[COUNT] resultados encontrados para [SEARCH_TERM]",
			one_result: "[COUNT] resultado encontrado para [SEARCH_TERM]",
			alt_search:
				"No se encontraron resultados para [SEARCH_TERM]. Mostrando en su lugar resultados para [DIFFERENT_TERM]",
			search_suggestion:
				"No se encontraron resultados para [SEARCH_TERM]. Prueba una de las siguientes b\xFAsquedas:",
			searching: "Buscando [SEARCH_TERM]...",
		},
		Pr = { thanks_to: zr, comments: Ur, direction: Dr, strings: Ir };
	var Nt = {};
	y(Nt, {
		comments: () => qr,
		default: () => Wr,
		direction: () => Br,
		strings: () => Vr,
		thanks_to: () => Lr,
	});
	var Lr = "Ali Khaleqi Yekta <https://yekta.dev>",
		qr = "",
		Br = "rtl",
		Vr = {
			placeholder: "\u062C\u0633\u062A\u062C\u0648",
			clear_search: "\u067E\u0627\u06A9\u0633\u0627\u0632\u06CC",
			load_more:
				"\u0628\u0627\u0631\u06AF\u0630\u0627\u0631\u06CC \u0646\u062A\u0627\u06CC\u062C \u0628\u06CC\u0634\u062A\u0631",
			search_label:
				"\u062C\u0633\u062A\u062C\u0648 \u062F\u0631 \u0633\u0627\u06CC\u062A",
			filters_label: "\u0641\u06CC\u0644\u062A\u0631\u0647\u0627",
			zero_results:
				"\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0646\u0634\u062F",
			many_results:
				"[COUNT] \u0646\u062A\u06CC\u062C\u0647 \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0634\u062F",
			one_result:
				"[COUNT] \u0646\u062A\u06CC\u062C\u0647 \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0634\u062F",
			alt_search:
				"\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0646\u0634\u062F. \u062F\u0631 \u0639\u0648\u0636 \u0646\u062A\u0627\u06CC\u062C \u0628\u0631\u0627\u06CC [DIFFERENT_TERM] \u0646\u0645\u0627\u06CC\u0634 \u062F\u0627\u062F\u0647 \u0645\u06CC\u200C\u0634\u0648\u062F",
			search_suggestion:
				"\u0646\u062A\u06CC\u062C\u0647\u200C\u0627\u06CC \u0628\u0631\u0627\u06CC [SEARCH_TERM] \u06CC\u0627\u0641\u062A \u0646\u0634\u062F. \u06CC\u06A9\u06CC \u0627\u0632 \u062C\u0633\u062A\u062C\u0648\u0647\u0627\u06CC \u0632\u06CC\u0631 \u0631\u0627 \u0627\u0645\u062A\u062D\u0627\u0646 \u06A9\u0646\u06CC\u062F:",
			searching:
				"\u062F\u0631 \u062D\u0627\u0644 \u062C\u0633\u062A\u062C\u0648\u06CC [SEARCH_TERM]...",
		},
		Wr = { thanks_to: Lr, comments: qr, direction: Br, strings: Vr };
	var Ot = {};
	y(Ot, {
		comments: () => Kr,
		default: () => Zr,
		direction: () => Jr,
		strings: () => Yr,
		thanks_to: () => Gr,
	});
	var Gr = "Valtteri Laitinen <dev@valtlai.fi>",
		Kr = "",
		Jr = "ltr",
		Yr = {
			placeholder: "Haku",
			clear_search: "Tyhjenn\xE4",
			load_more: "Lataa lis\xE4\xE4 tuloksia",
			search_label: "Hae t\xE4lt\xE4 sivustolta",
			filters_label: "Suodattimet",
			zero_results: "Ei tuloksia haulle [SEARCH_TERM]",
			many_results: "[COUNT] tulosta haulle [SEARCH_TERM]",
			one_result: "[COUNT] tulos haulle [SEARCH_TERM]",
			alt_search:
				"Ei tuloksia haulle [SEARCH_TERM]. N\xE4ytet\xE4\xE4n tulokset sen sijaan haulle [DIFFERENT_TERM]",
			search_suggestion:
				"Ei tuloksia haulle [SEARCH_TERM]. Kokeile jotain seuraavista:",
			searching: "Haetaan [SEARCH_TERM]...",
		},
		Zr = { thanks_to: Gr, comments: Kr, direction: Jr, strings: Yr };
	var jt = {};
	y(jt, {
		comments: () => Qr,
		default: () => el,
		direction: () => xr,
		strings: () => $r,
		thanks_to: () => Xr,
	});
	var Xr = "Nicolas Friedli <nicolas@theologique.ch>",
		Qr = "",
		xr = "ltr",
		$r = {
			placeholder: "Rechercher",
			clear_search: "Nettoyer",
			load_more: "Charger plus de r\xE9sultats",
			search_label: "Recherche sur ce site",
			filters_label: "Filtres",
			zero_results: "Pas de r\xE9sultat pour [SEARCH_TERM]",
			many_results: "[COUNT] r\xE9sultats pour [SEARCH_TERM]",
			one_result: "[COUNT] r\xE9sultat pour [SEARCH_TERM]",
			alt_search:
				"Pas de r\xE9sultat pour [SEARCH_TERM]. Montre les r\xE9sultats pour [DIFFERENT_TERM] \xE0 la place",
			search_suggestion:
				"Pas de r\xE9sultat pour [SEARCH_TERM]. Essayer une des recherches suivantes:",
			searching: "Recherche [SEARCH_TERM]...",
		},
		el = { thanks_to: Xr, comments: Qr, direction: xr, strings: $r };
	var zt = {};
	y(zt, {
		comments: () => nl,
		default: () => ll,
		direction: () => sl,
		strings: () => rl,
		thanks_to: () => tl,
	});
	var tl = "Pablo Villaverde <https://github.com/pvillaverde>",
		nl = "",
		sl = "ltr",
		rl = {
			placeholder: "Buscar",
			clear_search: "Limpar",
			load_more: "Ver m\xE1is resultados",
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
		ll = { thanks_to: tl, comments: nl, direction: sl, strings: rl };
	var Ut = {};
	y(Ut, {
		comments: () => al,
		default: () => cl,
		direction: () => ol,
		strings: () => ul,
		thanks_to: () => il,
	});
	var il = "Nir Tamir <nirtamir2@gmail.com>",
		al = "",
		ol = "rtl",
		ul = {
			placeholder: "\u05D7\u05D9\u05E4\u05D5\u05E9",
			clear_search: "\u05E0\u05D9\u05E7\u05D5\u05D9",
			load_more: "\u05E2\u05D5\u05D3 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA",
			search_label:
				"\u05D7\u05D9\u05E4\u05D5\u05E9 \u05D1\u05D0\u05EA\u05E8 \u05D6\u05D4",
			filters_label: "\u05DE\u05E1\u05E0\u05E0\u05D9\u05DD",
			zero_results:
				"\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]",
			many_results:
				"\u05E0\u05DE\u05E6\u05D0\u05D5 [COUNT] \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]",
			one_result:
				"\u05E0\u05DE\u05E6\u05D0\u05D4 \u05EA\u05D5\u05E6\u05D0\u05D4 \u05D0\u05D7\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]",
			alt_search:
				"\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]. \u05DE\u05D5\u05E6\u05D2\u05D5\u05EA \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [DIFFERENT_TERM]",
			search_suggestion:
				"\u05DC\u05D0 \u05E0\u05DE\u05E6\u05D0\u05D5 \u05EA\u05D5\u05E6\u05D0\u05D5\u05EA \u05E2\u05D1\u05D5\u05E8 [SEARCH_TERM]. \u05E0\u05E1\u05D5 \u05D0\u05D7\u05D3 \u05DE\u05D4\u05D7\u05D9\u05E4\u05D5\u05E9\u05D9\u05DD \u05D4\u05D1\u05D0\u05D9\u05DD:",
			searching: "\u05DE\u05D7\u05E4\u05E9 \u05D0\u05EA [SEARCH_TERM]...",
		},
		cl = { thanks_to: il, comments: al, direction: ol, strings: ul };
	var Dt = {};
	y(Dt, {
		comments: () => fl,
		default: () => ml,
		direction: () => dl,
		strings: () => hl,
		thanks_to: () => _l,
	});
	var _l = "Amit Yadav <amit@thetechbasket.com>",
		fl = "",
		dl = "ltr",
		hl = {
			placeholder: "\u0916\u094B\u091C\u0947\u0902",
			clear_search: "\u0938\u093E\u092B \u0915\u0930\u0947\u0902",
			load_more:
				"\u0914\u0930 \u0905\u0927\u093F\u0915 \u092A\u0930\u093F\u0923\u093E\u092E \u0932\u094B\u0921 \u0915\u0930\u0947\u0902",
			search_label:
				"\u0907\u0938 \u0938\u093E\u0907\u091F \u092E\u0947\u0902 \u0916\u094B\u091C\u0947\u0902",
			filters_label: "\u092B\u093C\u093F\u0932\u094D\u091F\u0930",
			zero_results:
				"\u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E",
			many_results:
				"[COUNT] \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u092E\u093F\u0932\u0947",
			one_result:
				"[COUNT] \u092A\u0930\u093F\u0923\u093E\u092E [SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u092E\u093F\u0932\u093E",
			alt_search:
				"[SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0907\u0938\u0915\u0947 \u092C\u091C\u093E\u092F [DIFFERENT_TERM] \u0915\u0947 \u0932\u093F\u090F \u092A\u0930\u093F\u0923\u093E\u092E \u0926\u093F\u0916\u093E \u0930\u0939\u093E \u0939\u0948",
			search_suggestion:
				"[SEARCH_TERM] \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u092A\u0930\u093F\u0923\u093E\u092E \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E\u0964 \u0928\u093F\u092E\u094D\u0928\u0932\u093F\u0916\u093F\u0924 \u0916\u094B\u091C\u094B\u0902 \u092E\u0947\u0902 \u0938\u0947 \u0915\u094B\u0908 \u090F\u0915 \u0906\u091C\u093C\u092E\u093E\u090F\u0902:",
			searching:
				"[SEARCH_TERM] \u0915\u0940 \u0916\u094B\u091C \u0915\u0940 \u091C\u093E \u0930\u0939\u0940 \u0939\u0948...",
		},
		ml = { thanks_to: _l, comments: fl, direction: dl, strings: hl };
	var It = {};
	y(It, {
		comments: () => gl,
		default: () => bl,
		direction: () => El,
		strings: () => Rl,
		thanks_to: () => pl,
	});
	var pl = "Diomed <https://github.com/diomed>",
		gl = "",
		El = "ltr",
		Rl = {
			placeholder: "Tra\u017Ei",
			clear_search: "O\u010Disti",
			load_more: "U\u010Ditaj vi\u0161e rezultata",
			search_label: "Pretra\u017Ei ovu stranicu",
			filters_label: "Filteri",
			zero_results: "Nema rezultata za [SEARCH_TERM]",
			many_results: "[COUNT] rezultata za [SEARCH_TERM]",
			one_result: "[COUNT] rezultat za [SEARCH_TERM]",
			alt_search:
				"Nema rezultata za [SEARCH_TERM]. Prikazujem rezultate za [DIFFERENT_TERM]",
			search_suggestion:
				"Nema rezultata za [SEARCH_TERM]. Poku\u0161aj s jednom od ovih pretraga:",
			searching: "Pretra\u017Eujem [SEARCH_TERM]...",
		},
		bl = { thanks_to: pl, comments: gl, direction: El, strings: Rl };
	var Pt = {};
	y(Pt, {
		comments: () => Cl,
		default: () => yl,
		direction: () => kl,
		strings: () => Sl,
		thanks_to: () => Tl,
	});
	var Tl = "Adam Laki <info@adamlaki.com>",
		Cl = "",
		kl = "ltr",
		Sl = {
			placeholder: "Keres\xE9s",
			clear_search: "T\xF6rl\xE9s",
			load_more: "Tov\xE1bbi tal\xE1latok bet\xF6lt\xE9se",
			search_label: "Keres\xE9s az oldalon",
			filters_label: "Sz\u0171r\xE9s",
			zero_results: "Nincs tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre",
			many_results: "[COUNT] db tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre",
			one_result: "[COUNT] db tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre",
			alt_search:
				"Nincs tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre. Tal\xE1latok mutat\xE1sa ink\xE1bb a(z) [DIFFERENT_TERM] kifejez\xE9sre",
			search_suggestion:
				"Nincs tal\xE1lat a(z) [SEARCH_TERM] kifejez\xE9sre. Pr\xF3b\xE1ld meg a k\xF6vetkez\u0151 keres\xE9sek egyik\xE9t:",
			searching: "Keres\xE9s a(z) [SEARCH_TERM] kifejez\xE9sre...",
		},
		yl = { thanks_to: Tl, comments: Cl, direction: kl, strings: Sl };
	var Lt = {};
	y(Lt, {
		comments: () => Al,
		default: () => Hl,
		direction: () => vl,
		strings: () => wl,
		thanks_to: () => Ml,
	});
	var Ml = "Nixentric",
		Al = "",
		vl = "ltr",
		wl = {
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
		Hl = { thanks_to: Ml, comments: Al, direction: vl, strings: wl };
	var qt = {};
	y(qt, {
		comments: () => Nl,
		default: () => zl,
		direction: () => Ol,
		strings: () => jl,
		thanks_to: () => Fl,
	});
	var Fl = "Cosette Bruhns Alonso, Andrew Janco <apjanco@upenn.edu>",
		Nl = "",
		Ol = "ltr",
		jl = {
			placeholder: "Cerca",
			clear_search: "Cancella la cronologia",
			load_more: "Mostra pi\xF9 risultati",
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
		zl = { thanks_to: Fl, comments: Nl, direction: Ol, strings: jl };
	var Bt = {};
	y(Bt, {
		comments: () => Dl,
		default: () => Ll,
		direction: () => Il,
		strings: () => Pl,
		thanks_to: () => Ul,
	});
	var Ul = "Tate",
		Dl = "",
		Il = "ltr",
		Pl = {
			placeholder: "\u691C\u7D22",
			clear_search: "\u30AF\u30EA\u30A2",
			load_more: "\u6B21\u3092\u8AAD\u307F\u8FBC\u3080",
			search_label: "\u3053\u306E\u30B5\u30A4\u30C8\u3092\u691C\u7D22",
			filters_label: "\u30D5\u30A3\u30EB\u30BF",
			zero_results:
				"[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u60C5\u5831\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F",
			many_results:
				"[SEARCH_TERM]\u306E[COUNT]\u4EF6\u306E\u691C\u7D22\u7D50\u679C",
			one_result:
				"[SEARCH_TERM]\u306E[COUNT]\u4EF6\u306E\u691C\u7D22\u7D50\u679C",
			alt_search:
				"[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u60C5\u5831\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002[DIFFERENT_TERM]\u306E\u691C\u7D22\u7D50\u679C\u3092\u8868\u793A\u3057\u3066\u3044\u307E\u3059",
			search_suggestion:
				"[SEARCH_TERM]\u306E\u691C\u7D22\u306B\u4E00\u81F4\u3059\u308B\u60C5\u5831\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u6B21\u306E\u3044\u305A\u308C\u304B\u306E\u691C\u7D22\u3092\u8A66\u3057\u3066\u304F\u3060\u3055\u3044",
			searching:
				"[SEARCH_TERM]\u3092\u691C\u7D22\u3057\u3066\u3044\u307E\u3059",
		},
		Ll = { thanks_to: Ul, comments: Dl, direction: Il, strings: Pl };
	var Vt = {};
	y(Vt, {
		comments: () => Bl,
		default: () => Gl,
		direction: () => Vl,
		strings: () => Wl,
		thanks_to: () => ql,
	});
	var ql = "Seokho Son <https://github.com/seokho-son>",
		Bl = "",
		Vl = "ltr",
		Wl = {
			placeholder: "\uAC80\uC0C9\uC5B4",
			clear_search: "\uBE44\uC6B0\uAE30",
			load_more: "\uAC80\uC0C9 \uACB0\uACFC \uB354 \uBCF4\uAE30",
			search_label: "\uC0AC\uC774\uD2B8 \uAC80\uC0C9",
			filters_label: "\uD544\uD130",
			zero_results:
				"[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC \uC5C6\uC74C",
			many_results:
				"[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC [COUNT]\uAC74",
			one_result: "[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC [COUNT]\uAC74",
			alt_search:
				"[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC \uC5C6\uC74C. [DIFFERENT_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC",
			search_suggestion:
				"[SEARCH_TERM]\uC5D0 \uB300\uD55C \uACB0\uACFC \uC5C6\uC74C. \uCD94\uCC9C \uAC80\uC0C9\uC5B4: ",
			searching: "[SEARCH_TERM] \uAC80\uC0C9 \uC911...",
		},
		Gl = { thanks_to: ql, comments: Bl, direction: Vl, strings: Wl };
	var Wt = {};
	y(Wt, {
		comments: () => Jl,
		default: () => Xl,
		direction: () => Yl,
		strings: () => Zl,
		thanks_to: () => Kl,
	});
	var Kl = "",
		Jl = "",
		Yl = "ltr",
		Zl = {
			placeholder: "Rapu",
			clear_search: "Whakakore",
			load_more: "Whakauta \u0113tahi otinga k\u0113",
			search_label: "Rapu",
			filters_label: "T\u0101tari",
			zero_results: "Otinga kore ki [SEARCH_TERM]",
			many_results: "[COUNT] otinga ki [SEARCH_TERM]",
			one_result: "[COUNT] otinga ki [SEARCH_TERM]",
			alt_search:
				"Otinga kore ki [SEARCH_TERM]. Otinga k\u0113 ki [DIFFERENT_TERM]",
			search_suggestion:
				"Otinga kore ki [SEARCH_TERM]. whakam\u0101tau ki ng\u0101 mea atu:",
			searching: "Rapu ki [SEARCH_TERM]...",
		},
		Xl = { thanks_to: Kl, comments: Jl, direction: Yl, strings: Zl };
	var Gt = {};
	y(Gt, {
		comments: () => xl,
		default: () => ti,
		direction: () => $l,
		strings: () => ei,
		thanks_to: () => Ql,
	});
	var Ql = "Paul van Brouwershaven",
		xl = "",
		$l = "ltr",
		ei = {
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
		ti = { thanks_to: Ql, comments: xl, direction: $l, strings: ei };
	var Kt = {};
	y(Kt, {
		comments: () => si,
		default: () => ii,
		direction: () => ri,
		strings: () => li,
		thanks_to: () => ni,
	});
	var ni = "Christopher Wingate",
		si = "",
		ri = "ltr",
		li = {
			placeholder: "S\xF8k",
			clear_search: "Fjern",
			load_more: "Last flere resultater",
			search_label: "S\xF8k p\xE5 denne siden",
			filters_label: "Filtre",
			zero_results: "Ingen resultater for [SEARCH_TERM]",
			many_results: "[COUNT] resultater for [SEARCH_TERM]",
			one_result: "[COUNT] resultat for [SEARCH_TERM]",
			alt_search:
				"Ingen resultater for [SEARCH_TERM]. Viser resultater for [DIFFERENT_TERM] i stedet",
			search_suggestion:
				"Ingen resultater for [SEARCH_TERM]. Pr\xF8v en av disse s\xF8keordene i stedet:",
			searching: "S\xF8ker etter [SEARCH_TERM]",
		},
		ii = { thanks_to: ni, comments: si, direction: ri, strings: li };
	var Jt = {};
	y(Jt, {
		comments: () => oi,
		default: () => _i,
		direction: () => ui,
		strings: () => ci,
		thanks_to: () => ai,
	});
	var ai = "",
		oi = "",
		ui = "ltr",
		ci = {
			placeholder: "Szukaj",
			clear_search: "Wyczy\u015B\u0107",
			load_more: "Za\u0142aduj wi\u0119cej",
			search_label: "Przeszukaj t\u0119 stron\u0119",
			filters_label: "Filtry",
			zero_results: "Brak wynik\xF3w dla [SEARCH_TERM]",
			many_results: "[COUNT] wynik\xF3w dla [SEARCH_TERM]",
			one_result: "[COUNT] wynik dla [SEARCH_TERM]",
			alt_search:
				"Brak wynik\xF3w dla [SEARCH_TERM]. Wy\u015Bwietlam wyniki dla [DIFFERENT_TERM]",
			search_suggestion:
				"Brak wynik\xF3w dla [SEARCH_TERM]. Pokrewne wyniki wyszukiwania:",
			searching: "Szukam [SEARCH_TERM]...",
		},
		_i = { thanks_to: ai, comments: oi, direction: ui, strings: ci };
	var Yt = {};
	y(Yt, {
		comments: () => di,
		default: () => pi,
		direction: () => hi,
		strings: () => mi,
		thanks_to: () => fi,
	});
	var fi = "Jonatah",
		di = "",
		hi = "ltr",
		mi = {
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
		pi = { thanks_to: fi, comments: di, direction: hi, strings: mi };
	var Zt = {};
	y(Zt, {
		comments: () => Ei,
		default: () => Ti,
		direction: () => Ri,
		strings: () => bi,
		thanks_to: () => gi,
	});
	var gi = "Bogdan Mateescu <bogdan@surfverse.com>",
		Ei = "",
		Ri = "ltr",
		bi = {
			placeholder: "C\u0103utare",
			clear_search: "\u015Eterge\u0163i",
			load_more: "\xCEnc\u0103rca\u021Bi mai multe rezultate",
			search_label: "C\u0103uta\u021Bi \xEEn acest site",
			filters_label: "Filtre",
			zero_results: "Niciun rezultat pentru [SEARCH_TERM]",
			many_results: "[COUNT] rezultate pentru [SEARCH_TERM]",
			one_result: "[COUNT] rezultat pentru [SEARCH_TERM]",
			alt_search:
				"Niciun rezultat pentru [SEARCH_TERM]. Se afi\u0219eaz\u0103 \xEEn schimb rezultatele pentru [DIFFERENT_TERM]",
			search_suggestion:
				"Niciun rezultat pentru [SEARCH_TERM]. \xCEncerca\u021Bi una dintre urm\u0103toarele c\u0103ut\u0103ri:",
			searching: "Se caut\u0103 dup\u0103: [SEARCH_TERM]...",
		},
		Ti = { thanks_to: gi, comments: Ei, direction: Ri, strings: bi };
	var Xt = {};
	y(Xt, {
		comments: () => ki,
		default: () => Mi,
		direction: () => Si,
		strings: () => yi,
		thanks_to: () => Ci,
	});
	var Ci = "Aleksandr Gordeev",
		ki = "",
		Si = "ltr",
		yi = {
			placeholder: "\u041F\u043E\u0438\u0441\u043A",
			clear_search:
				"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u043F\u043E\u043B\u0435",
			load_more:
				"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044C \u0435\u0449\u0435",
			search_label:
				"\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443",
			filters_label: "\u0424\u0438\u043B\u044C\u0442\u0440\u044B",
			zero_results:
				"\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
			many_results:
				"[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u043E\u0432 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
			one_result:
				"[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
			alt_search:
				"\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]. \u041F\u043E\u043A\u0430\u0437\u0430\u043D\u044B \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [DIFFERENT_TERM]",
			search_suggestion:
				"\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0438\u0437 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0445 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u043E\u0432",
			searching:
				"\u041F\u043E\u0438\u0441\u043A \u043F\u043E \u0437\u0430\u043F\u0440\u043E\u0441\u0443: [SEARCH_TERM]",
		},
		Mi = { thanks_to: Ci, comments: ki, direction: Si, strings: yi };
	var Qt = {};
	y(Qt, {
		comments: () => vi,
		default: () => Fi,
		direction: () => wi,
		strings: () => Hi,
		thanks_to: () => Ai,
	});
	var Ai = "Andrija Sagicc",
		vi = "",
		wi = "ltr",
		Hi = {
			placeholder: "\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430",
			clear_search: "\u0411\u0440\u0438\u0441\u0430\u045A\u0435",
			load_more:
				"\u041F\u0440\u0438\u043A\u0430\u0437 \u0432\u0438\u0448\u0435 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430",
			search_label:
				"\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430 \u0441\u0430\u0458\u0442\u0430",
			filters_label: "\u0424\u0438\u043B\u0442\u0435\u0440\u0438",
			zero_results:
				"\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
			many_results:
				"[COUNT] \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
			one_result:
				"[COUNT] \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]",
			alt_search:
				"\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]. \u041F\u0440\u0438\u043A\u0430\u0437 \u0434\u043E\u0434\u0430\u0442\u043D\u0438\u043A \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [DIFFERENT_TERM]",
			search_suggestion:
				"\u041D\u0435\u043C\u0430 \u0440\u0435\u0437\u0443\u043B\u0442\u0430\u0442\u0430 \u0437\u0430 [SEARCH_TERM]. \u041F\u043E\u043A\u0443\u0448\u0430\u0458\u0442\u0435 \u0441\u0430 \u043D\u0435\u043A\u043E\u043C \u043E\u0434 \u0441\u043B\u0435\u0434\u0435\u045B\u0438\u0445 \u043F\u0440\u0435\u0442\u0440\u0430\u0433\u0430:",
			searching:
				"\u041F\u0440\u0435\u0442\u0440\u0430\u0433\u0430 \u0442\u0435\u0440\u043C\u0438\u043D\u0430 [SEARCH_TERM]...",
		},
		Fi = { thanks_to: Ai, comments: vi, direction: wi, strings: Hi };
	var xt = {};
	y(xt, {
		comments: () => Oi,
		default: () => Ui,
		direction: () => ji,
		strings: () => zi,
		thanks_to: () => Ni,
	});
	var Ni = "Montazar Al-Jaber <montazar@nanawee.tech>",
		Oi = "",
		ji = "ltr",
		zi = {
			placeholder: "S\xF6k",
			clear_search: "Rensa",
			load_more: "Visa fler tr\xE4ffar",
			search_label: "S\xF6k p\xE5 denna sida",
			filters_label: "Filter",
			zero_results: "[SEARCH_TERM] gav inga tr\xE4ffar",
			many_results: "[SEARCH_TERM] gav [COUNT] tr\xE4ffar",
			one_result: "[SEARCH_TERM] gav [COUNT] tr\xE4ff",
			alt_search:
				"[SEARCH_TERM] gav inga tr\xE4ffar. Visar resultat f\xF6r [DIFFERENT_TERM] ist\xE4llet",
			search_suggestion:
				"[SEARCH_TERM] gav inga tr\xE4ffar. F\xF6rs\xF6k igen med en av f\xF6ljande s\xF6kord:",
			searching: "S\xF6ker efter [SEARCH_TERM]...",
		},
		Ui = { thanks_to: Ni, comments: Oi, direction: ji, strings: zi };
	var $t = {};
	y($t, {
		comments: () => Ii,
		default: () => qi,
		direction: () => Pi,
		strings: () => Li,
		thanks_to: () => Di,
	});
	var Di = "Anonymous",
		Ii = "",
		Pi = "ltr",
		Li = {
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
		qi = { thanks_to: Di, comments: Ii, direction: Pi, strings: Li };
	var en = {};
	y(en, {
		comments: () => Vi,
		default: () => Ki,
		direction: () => Wi,
		strings: () => Gi,
		thanks_to: () => Bi,
	});
	var Bi = "",
		Vi = "",
		Wi = "ltr",
		Gi = {
			placeholder: "\u0BA4\u0BC7\u0B9F\u0BC1\u0B95",
			clear_search: "\u0B85\u0BB4\u0BBF\u0B95\u0BCD\u0B95\u0BC1\u0B95",
			load_more:
				"\u0BAE\u0BC7\u0BB2\u0BC1\u0BAE\u0BCD \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BC8\u0B95\u0BCD \u0B95\u0BBE\u0B9F\u0BCD\u0B9F\u0BC1\u0B95",
			search_label:
				"\u0B87\u0BA8\u0BCD\u0BA4 \u0BA4\u0BB3\u0BA4\u0BCD\u0BA4\u0BBF\u0BB2\u0BCD \u0BA4\u0BC7\u0B9F\u0BC1\u0B95",
			filters_label:
				"\u0BB5\u0B9F\u0BBF\u0B95\u0B9F\u0BCD\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BCD",
			zero_results:
				"[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8",
			many_results:
				"[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 [COUNT] \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD",
			one_result:
				"[SEARCH_TERM] \u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1",
			alt_search:
				"[SEARCH_TERM] \u0B87\u0BA4\u0BCD\u0BA4\u0BC7\u0B9F\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8, \u0B87\u0BA8\u0BCD\u0BA4 \u0BA4\u0BC7\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0B92\u0BA4\u0BCD\u0BA4 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD [DIFFERENT_TERM]",
			search_suggestion:
				"[SEARCH_TERM] \u0B87\u0BA4\u0BCD \u0BA4\u0BC7\u0B9F\u0BB2\u0BC1\u0B95\u0BCD\u0B95\u0BBE\u0BA9 \u0BAE\u0BC1\u0B9F\u0BBF\u0BB5\u0BC1\u0B95\u0BB3\u0BCD \u0B87\u0BB2\u0BCD\u0BB2\u0BC8.\u0B87\u0BA4\u0BB1\u0BCD\u0B95\u0BC1 \u0BAA\u0BA4\u0BBF\u0BB2\u0BC0\u0B9F\u0BBE\u0BA9 \u0BA4\u0BC7\u0B9F\u0BB2\u0BCD\u0B95\u0BB3\u0BC8 \u0BA4\u0BC7\u0B9F\u0BC1\u0B95:",
			searching:
				"[SEARCH_TERM] \u0BA4\u0BC7\u0B9F\u0BAA\u0BCD\u0BAA\u0B9F\u0BC1\u0B95\u0BBF\u0BA9\u0BCD\u0BB1\u0BA4\u0BC1",
		},
		Ki = { thanks_to: Bi, comments: Vi, direction: Wi, strings: Gi };
	var tn = {};
	y(tn, {
		comments: () => Yi,
		default: () => Qi,
		direction: () => Zi,
		strings: () => Xi,
		thanks_to: () => Ji,
	});
	var Ji = "Taylan \xD6zg\xFCr Bildik",
		Yi = "",
		Zi = "ltr",
		Xi = {
			placeholder: "Ara\u015Ft\u0131r",
			clear_search: "Temizle",
			load_more: "Daha fazla sonu\xE7",
			search_label: "Site genelinde arama",
			filters_label: "Filtreler",
			zero_results: "[SEARCH_TERM] i\xE7in sonu\xE7 yok",
			many_results: "[SEARCH_TERM] i\xE7in [COUNT] sonu\xE7 bulundu",
			one_result: "[SEARCH_TERM] i\xE7in [COUNT] sonu\xE7 bulundu",
			alt_search:
				"[SEARCH_TERM] i\xE7in sonu\xE7 yok. Bunun yerine [DIFFERENT_TERM] i\xE7in sonu\xE7lar g\xF6steriliyor",
			search_suggestion:
				"[SEARCH_TERM] i\xE7in sonu\xE7 yok. Alternatif olarak a\u015Fa\u011F\u0131daki kelimelerden birini deneyebilirsiniz:",
			searching: "[SEARCH_TERM] ara\u015Ft\u0131r\u0131l\u0131yor...",
		},
		Qi = { thanks_to: Ji, comments: Yi, direction: Zi, strings: Xi };
	var nn = {};
	y(nn, {
		comments: () => $i,
		default: () => na,
		direction: () => ea,
		strings: () => ta,
		thanks_to: () => xi,
	});
	var xi = "Vladyslav Lyshenko <vladdnepr1989@gmail.com>",
		$i = "",
		ea = "ltr",
		ta = {
			placeholder: "\u041F\u043E\u0448\u0443\u043A",
			clear_search:
				"\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u0438 \u043F\u043E\u043B\u0435",
			load_more:
				"\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0449\u0435",
			search_label:
				"\u041F\u043E\u0448\u0443\u043A \u043F\u043E \u0441\u0430\u0439\u0442\u0443",
			filters_label: "\u0424\u0456\u043B\u044C\u0442\u0440\u0438",
			zero_results:
				"\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0437\u0430 \u0437\u0430\u043F\u0438\u0442\u043E\u043C: [SEARCH_TERM]",
			many_results:
				"[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0456\u0432 \u043D\u0430 \u0437\u0430\u043F\u0438\u0442: [SEARCH_TERM]",
			one_result:
				"[COUNT] \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442 \u0437\u0430 \u0437\u0430\u043F\u0438\u0442\u043E\u043C: [SEARCH_TERM]",
			alt_search:
				"\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0430 \u0437\u0430\u043F\u0438\u0442: [SEARCH_TERM]. \u041F\u043E\u043A\u0430\u0437\u0430\u043D\u043E \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u043D\u0430 \u0437\u0430\u043F\u0438\u0442: [DIFFERENT_TERM]",
			search_suggestion:
				"\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u043D\u0430 \u0437\u0430\u043F\u0438\u0442: [SEARCH_TERM]. \u0421\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043E\u0434\u0438\u043D \u0456\u0437 \u0442\u0430\u043A\u0438\u0445 \u0432\u0430\u0440\u0456\u0430\u043D\u0442\u0456\u0432",
			searching:
				"\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u0437\u0430\u043F\u0438\u0442\u043E\u043C: [SEARCH_TERM]",
		},
		na = { thanks_to: xi, comments: $i, direction: ea, strings: ta };
	var sn = {};
	y(sn, {
		comments: () => ra,
		default: () => aa,
		direction: () => la,
		strings: () => ia,
		thanks_to: () => sa,
	});
	var sa = "Long Nhat Nguyen",
		ra = "",
		la = "ltr",
		ia = {
			placeholder: "T\xECm ki\u1EBFm",
			clear_search: "X\xF3a",
			load_more: "Nhi\u1EC1u k\u1EBFt qu\u1EA3 h\u01A1n",
			search_label: "T\xECm ki\u1EBFm trong trang n\xE0y",
			filters_label: "B\u1ED9 l\u1ECDc",
			zero_results:
				"Kh\xF4ng t\xECm th\u1EA5y k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]",
			many_results: "[COUNT] k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]",
			one_result: "[COUNT] k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]",
			alt_search:
				"Kh\xF4ng t\xECm th\u1EA5y k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]. Ki\u1EC3m th\u1ECB k\u1EBFt qu\u1EA3 thay th\u1EBF v\u1EDBi [DIFFERENT_TERM]",
			search_suggestion:
				"Kh\xF4ng t\xECm th\u1EA5y k\u1EBFt qu\u1EA3 cho [SEARCH_TERM]. Th\u1EED m\u1ED9t trong c\xE1c t\xECm ki\u1EBFm:",
			searching: "\u0110ang t\xECm ki\u1EBFm cho [SEARCH_TERM]...",
		},
		aa = { thanks_to: sa, comments: ra, direction: la, strings: ia };
	var rn = {};
	y(rn, {
		comments: () => ua,
		default: () => fa,
		direction: () => ca,
		strings: () => _a,
		thanks_to: () => oa,
	});
	var oa = "Amber Song",
		ua = "",
		ca = "ltr",
		_a = {
			placeholder: "\u641C\u7D22",
			clear_search: "\u6E05\u9664",
			load_more: "\u52A0\u8F7D\u66F4\u591A\u7ED3\u679C",
			search_label: "\u7AD9\u5185\u641C\u7D22",
			filters_label: "\u7B5B\u9009",
			zero_results:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
			many_results:
				"\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
			one_result:
				"\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
			alt_search:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u6539\u4E3A\u663E\u793A [DIFFERENT_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
			search_suggestion:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u8BF7\u5C1D\u8BD5\u4EE5\u4E0B\u641C\u7D22\u3002",
			searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]...",
		},
		fa = { thanks_to: oa, comments: ua, direction: ca, strings: _a };
	var ln = {};
	y(ln, {
		comments: () => ha,
		default: () => ga,
		direction: () => ma,
		strings: () => pa,
		thanks_to: () => da,
	});
	var da = "Amber Song",
		ha = "",
		ma = "ltr",
		pa = {
			placeholder: "\u641C\u7D22",
			clear_search: "\u6E05\u9664",
			load_more: "\u52A0\u8F09\u66F4\u591A\u7D50\u679C",
			search_label: "\u7AD9\u5167\u641C\u7D22",
			filters_label: "\u7BE9\u9078",
			zero_results:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
			many_results:
				"\u627E\u5230 [COUNT] \u500B [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
			one_result:
				"\u627E\u5230 [COUNT] \u500B [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
			alt_search:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C\u3002\u6539\u70BA\u986F\u793A [DIFFERENT_TERM] \u7684\u76F8\u95DC\u7D50\u679C",
			search_suggestion:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u95DC\u7D50\u679C\u3002\u8ACB\u5617\u8A66\u4EE5\u4E0B\u641C\u7D22\u3002",
			searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]...",
		},
		ga = { thanks_to: da, comments: ha, direction: ma, strings: pa };
	var an = {};
	y(an, {
		comments: () => Ra,
		default: () => Ca,
		direction: () => ba,
		strings: () => Ta,
		thanks_to: () => Ea,
	});
	var Ea = "Amber Song",
		Ra = "",
		ba = "ltr",
		Ta = {
			placeholder: "\u641C\u7D22",
			clear_search: "\u6E05\u9664",
			load_more: "\u52A0\u8F7D\u66F4\u591A\u7ED3\u679C",
			search_label: "\u7AD9\u5185\u641C\u7D22",
			filters_label: "\u7B5B\u9009",
			zero_results:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
			many_results:
				"\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
			one_result:
				"\u627E\u5230 [COUNT] \u4E2A [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
			alt_search:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u6539\u4E3A\u663E\u793A [DIFFERENT_TERM] \u7684\u76F8\u5173\u7ED3\u679C",
			search_suggestion:
				"\u672A\u627E\u5230 [SEARCH_TERM] \u7684\u76F8\u5173\u7ED3\u679C\u3002\u8BF7\u5C1D\u8BD5\u4EE5\u4E0B\u641C\u7D22\u3002",
			searching: "\u6B63\u5728\u641C\u7D22 [SEARCH_TERM]...",
		},
		Ca = { thanks_to: Ea, comments: Ra, direction: ba, strings: Ta };
	var ka = [
			kt,
			St,
			yt,
			Mt,
			At,
			vt,
			wt,
			Ht,
			Ft,
			Nt,
			Ot,
			jt,
			zt,
			Ut,
			Dt,
			It,
			Pt,
			Lt,
			qt,
			Bt,
			Vt,
			Wt,
			Gt,
			Kt,
			Jt,
			Yt,
			Zt,
			Xt,
			Qt,
			xt,
			$t,
			en,
			tn,
			nn,
			sn,
			rn,
			ln,
			an,
		],
		ss = ka,
		rs = [
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
	function ls(n, e, t) {
		let s = n.slice();
		return (s[51] = e[t]), s;
	}
	function is(n) {
		let e, t, s;
		function r(i) {
			n[37](i);
		}
		let l = {
			show_empty_filters: n[5],
			open_filters: n[6],
			available_filters: n[18],
			translate: n[20],
			automatic_translations: n[19],
			translations: n[7],
		};
		return (
			n[0] !== void 0 && (l.selected_filters = n[0]),
			(e = new ns({ props: l })),
			le.push(() => Mn(e, "selected_filters", r)),
			{
				c() {
					rt(e.$$.fragment);
				},
				m(i, a) {
					me(e, i, a), (s = !0);
				},
				p(i, a) {
					let o = {};
					a[0] & 32 && (o.show_empty_filters = i[5]),
						a[0] & 64 && (o.open_filters = i[6]),
						a[0] & 262144 && (o.available_filters = i[18]),
						a[0] & 524288 && (o.automatic_translations = i[19]),
						a[0] & 128 && (o.translations = i[7]),
						!t &&
							a[0] & 1 &&
							((t = !0), (o.selected_filters = i[0]), Cn(() => (t = !1))),
						e.$set(o);
				},
				i(i) {
					s || (U(e.$$.fragment, i), (s = !0));
				},
				o(i) {
					P(e.$$.fragment, i), (s = !1);
				},
				d(i) {
					ue(e, i);
				},
			}
		);
	}
	function as(n) {
		let e,
			t,
			s,
			r,
			l = [Ma, ya],
			i = [];
		function a(o, f) {
			return o[14] ? 0 : 1;
		}
		return (
			(t = a(n, [-1, -1])),
			(s = i[t] = l[t](n)),
			{
				c() {
					(e = C("div")),
						s.c(),
						g(e, "class", "pagefind-ui__results-area svelte-e9gkc3");
				},
				m(o, f) {
					S(o, e, f), i[t].m(e, null), (r = !0);
				},
				p(o, f) {
					let u = t;
					(t = a(o, f)),
						t === u
							? i[t].p(o, f)
							: (ae(),
								P(i[u], 1, 1, () => {
									i[u] = null;
								}),
								oe(),
								(s = i[t]),
								s ? s.p(o, f) : ((s = i[t] = l[t](o)), s.c()),
								U(s, 1),
								s.m(e, null));
				},
				i(o) {
					r || (U(s), (r = !0));
				},
				o(o) {
					P(s), (r = !1);
				},
				d(o) {
					o && k(e), i[t].d();
				},
			}
		);
	}
	function ya(n) {
		let e,
			t,
			s,
			r = [],
			l = new Map(),
			i,
			a,
			o;
		function f(c, d) {
			return c[13].results.length === 0
				? wa
				: c[13].results.length === 1
					? va
					: Aa;
		}
		let u = f(n, [-1, -1]),
			m = u(n),
			p = n[13].results.slice(0, n[17]),
			h = (c) => c[51].id;
		for (let c = 0; c < p.length; c += 1) {
			let d = ls(n, p, c),
				T = h(d);
			l.set(T, (r[c] = os(T, d)));
		}
		let _ = n[13].results.length > n[17] && us(n);
		return {
			c() {
				(e = C("p")), m.c(), (t = A()), (s = C("ol"));
				for (let c = 0; c < r.length; c += 1) {
					r[c].c();
				}
				(i = A()),
					_ && _.c(),
					(a = x()),
					g(e, "class", "pagefind-ui__message svelte-e9gkc3"),
					g(s, "class", "pagefind-ui__results svelte-e9gkc3");
			},
			m(c, d) {
				S(c, e, d), m.m(e, null), S(c, t, d), S(c, s, d);
				for (let T = 0; T < r.length; T += 1) {
					r[T] && r[T].m(s, null);
				}
				S(c, i, d), _ && _.m(c, d), S(c, a, d), (o = !0);
			},
			p(c, d) {
				u === (u = f(c, d)) && m
					? m.p(c, d)
					: (m.d(1), (m = u(c)), m && (m.c(), m.m(e, null))),
					d[0] & 139292 &&
						((p = c[13].results.slice(0, c[17])),
						ae(),
						(r = yn(r, d, h, 1, c, p, l, s, Sn, os, null, ls)),
						oe()),
					c[13].results.length > c[17]
						? _
							? _.p(c, d)
							: ((_ = us(c)), _.c(), _.m(a.parentNode, a))
						: _ && (_.d(1), (_ = null));
			},
			i(c) {
				if (!o) {
					for (let d = 0; d < p.length; d += 1) {
						U(r[d]);
					}
					o = !0;
				}
			},
			o(c) {
				for (let d = 0; d < r.length; d += 1) {
					P(r[d]);
				}
				o = !1;
			},
			d(c) {
				c && k(e), m.d(), c && k(t), c && k(s);
				for (let d = 0; d < r.length; d += 1) {
					r[d].d();
				}
				c && k(i), _ && _.d(c), c && k(a);
			},
		};
	}
	function Ma(n) {
		let e,
			t = n[16] && cs(n);
		return {
			c() {
				t && t.c(), (e = x());
			},
			m(s, r) {
				t && t.m(s, r), S(s, e, r);
			},
			p(s, r) {
				s[16]
					? t
						? t.p(s, r)
						: ((t = cs(s)), t.c(), t.m(e.parentNode, e))
					: t && (t.d(1), (t = null));
			},
			i: z,
			o: z,
			d(s) {
				t && t.d(s), s && k(e);
			},
		};
	}
	function Aa(n) {
		let e =
				n[20]("many_results", n[19], n[7])
					.replace(/\[SEARCH_TERM\]/, n[16])
					.replace(
						/\[COUNT\]/,
						new Intl.NumberFormat(n[7].language).format(n[13].results.length),
					) + "",
			t;
		return {
			c() {
				t = w(e);
			},
			m(s, r) {
				S(s, t, r);
			},
			p(s, r) {
				r[0] & 598144 &&
					e !==
						(e =
							s[20]("many_results", s[19], s[7])
								.replace(/\[SEARCH_TERM\]/, s[16])
								.replace(
									/\[COUNT\]/,
									new Intl.NumberFormat(s[7].language).format(
										s[13].results.length,
									),
								) + "") &&
					N(t, e);
			},
			d(s) {
				s && k(t);
			},
		};
	}
	function va(n) {
		let e =
				n[20]("one_result", n[19], n[7])
					.replace(/\[SEARCH_TERM\]/, n[16])
					.replace(
						/\[COUNT\]/,
						new Intl.NumberFormat(n[7].language).format(1),
					) + "",
			t;
		return {
			c() {
				t = w(e);
			},
			m(s, r) {
				S(s, t, r);
			},
			p(s, r) {
				r[0] & 589952 &&
					e !==
						(e =
							s[20]("one_result", s[19], s[7])
								.replace(/\[SEARCH_TERM\]/, s[16])
								.replace(
									/\[COUNT\]/,
									new Intl.NumberFormat(s[7].language).format(1),
								) + "") &&
					N(t, e);
			},
			d(s) {
				s && k(t);
			},
		};
	}
	function wa(n) {
		let e =
				n[20]("zero_results", n[19], n[7]).replace(/\[SEARCH_TERM\]/, n[16]) +
				"",
			t;
		return {
			c() {
				t = w(e);
			},
			m(s, r) {
				S(s, t, r);
			},
			p(s, r) {
				r[0] & 589952 &&
					e !==
						(e =
							s[20]("zero_results", s[19], s[7]).replace(
								/\[SEARCH_TERM\]/,
								s[16],
							) + "") &&
					N(t, e);
			},
			d(s) {
				s && k(t);
			},
		};
	}
	function Ha(n) {
		let e, t;
		return (
			(e = new Un({
				props: { show_images: n[2], process_result: n[4], result: n[51] },
			})),
			{
				c() {
					rt(e.$$.fragment);
				},
				m(s, r) {
					me(e, s, r), (t = !0);
				},
				p(s, r) {
					let l = {};
					r[0] & 4 && (l.show_images = s[2]),
						r[0] & 16 && (l.process_result = s[4]),
						r[0] & 139264 && (l.result = s[51]),
						e.$set(l);
				},
				i(s) {
					t || (U(e.$$.fragment, s), (t = !0));
				},
				o(s) {
					P(e.$$.fragment, s), (t = !1);
				},
				d(s) {
					ue(e, s);
				},
			}
		);
	}
	function Fa(n) {
		let e, t;
		return (
			(e = new Jn({
				props: { show_images: n[2], process_result: n[4], result: n[51] },
			})),
			{
				c() {
					rt(e.$$.fragment);
				},
				m(s, r) {
					me(e, s, r), (t = !0);
				},
				p(s, r) {
					let l = {};
					r[0] & 4 && (l.show_images = s[2]),
						r[0] & 16 && (l.process_result = s[4]),
						r[0] & 139264 && (l.result = s[51]),
						e.$set(l);
				},
				i(s) {
					t || (U(e.$$.fragment, s), (t = !0));
				},
				o(s) {
					P(e.$$.fragment, s), (t = !1);
				},
				d(s) {
					ue(e, s);
				},
			}
		);
	}
	function os(n, e) {
		let t,
			s,
			r,
			l,
			i,
			a = [Fa, Ha],
			o = [];
		function f(u, m) {
			return u[3] ? 0 : 1;
		}
		return (
			(s = f(e, [-1, -1])),
			(r = o[s] = a[s](e)),
			{
				key: n,
				first: null,
				c() {
					(t = x()), r.c(), (l = x()), (this.first = t);
				},
				m(u, m) {
					S(u, t, m), o[s].m(u, m), S(u, l, m), (i = !0);
				},
				p(u, m) {
					e = u;
					let p = s;
					(s = f(e, m)),
						s === p
							? o[s].p(e, m)
							: (ae(),
								P(o[p], 1, 1, () => {
									o[p] = null;
								}),
								oe(),
								(r = o[s]),
								r ? r.p(e, m) : ((r = o[s] = a[s](e)), r.c()),
								U(r, 1),
								r.m(l.parentNode, l));
				},
				i(u) {
					i || (U(r), (i = !0));
				},
				o(u) {
					P(r), (i = !1);
				},
				d(u) {
					u && k(t), o[s].d(u), u && k(l);
				},
			}
		);
	}
	function us(n) {
		let e,
			t = n[20]("load_more", n[19], n[7]) + "",
			s,
			r,
			l;
		return {
			c() {
				(e = C("button")),
					(s = w(t)),
					g(e, "type", "button"),
					g(e, "class", "pagefind-ui__button svelte-e9gkc3");
			},
			m(i, a) {
				S(i, e, a), b(e, s), r || ((l = J(e, "click", n[22])), (r = !0));
			},
			p(i, a) {
				a[0] & 524416 &&
					t !== (t = i[20]("load_more", i[19], i[7]) + "") &&
					N(s, t);
			},
			d(i) {
				i && k(e), (r = !1), l();
			},
		};
	}
	function cs(n) {
		let e,
			t =
				n[20]("searching", n[19], n[7]).replace(/\[SEARCH_TERM\]/, n[16]) + "",
			s;
		return {
			c() {
				(e = C("p")),
					(s = w(t)),
					g(e, "class", "pagefind-ui__message svelte-e9gkc3");
			},
			m(r, l) {
				S(r, e, l), b(e, s);
			},
			p(r, l) {
				l[0] & 589952 &&
					t !==
						(t =
							r[20]("searching", r[19], r[7]).replace(
								/\[SEARCH_TERM\]/,
								r[16],
							) + "") &&
					N(s, t);
			},
			d(r) {
				r && k(e);
			},
		};
	}
	function Na(n) {
		let e,
			t,
			s,
			r,
			l,
			i,
			a = n[20]("clear_search", n[19], n[7]) + "",
			o,
			f,
			u,
			m,
			p,
			h,
			_,
			c,
			d = n[12] && is(n),
			T = n[15] && as(n);
		return {
			c() {
				(e = C("div")),
					(t = C("form")),
					(s = C("input")),
					(l = A()),
					(i = C("button")),
					(o = w(a)),
					(f = A()),
					(u = C("div")),
					d && d.c(),
					(m = A()),
					T && T.c(),
					g(s, "class", "pagefind-ui__search-input svelte-e9gkc3"),
					g(s, "type", "text"),
					g(s, "placeholder", (r = n[20]("placeholder", n[19], n[7]))),
					g(s, "autocapitalize", "none"),
					g(s, "enterkeyhint", "search"),
					(s.autofocus = n[8]),
					g(i, "class", "pagefind-ui__search-clear svelte-e9gkc3"),
					B(i, "pagefind-ui__suppressed", !n[9]),
					g(u, "class", "pagefind-ui__drawer svelte-e9gkc3"),
					B(u, "pagefind-ui__hidden", !n[15]),
					g(t, "class", "pagefind-ui__form svelte-e9gkc3"),
					g(t, "role", "search"),
					g(t, "aria-label", (p = n[20]("search_label", n[19], n[7]))),
					g(t, "action", "javascript:void(0);"),
					g(e, "class", "pagefind-ui svelte-e9gkc3"),
					B(e, "pagefind-ui--reset", n[1]);
			},
			m(R, M) {
				S(R, e, M),
					b(e, t),
					b(t, s),
					pt(s, n[9]),
					n[34](s),
					b(t, l),
					b(t, i),
					b(i, o),
					n[35](i),
					b(t, f),
					b(t, u),
					d && d.m(u, null),
					b(u, m),
					T && T.m(u, null),
					(h = !0),
					n[8] && s.focus(),
					_ ||
						((c = [
							J(s, "focus", n[21]),
							J(s, "keydown", n[32]),
							J(s, "input", n[33]),
							J(i, "click", n[36]),
							J(t, "submit", Oa),
						]),
						(_ = !0));
			},
			p(R, M) {
				(!h ||
					(M[0] & 524416 && r !== (r = R[20]("placeholder", R[19], R[7])))) &&
					g(s, "placeholder", r),
					(!h || M[0] & 256) && (s.autofocus = R[8]),
					M[0] & 512 && s.value !== R[9] && pt(s, R[9]),
					(!h || M[0] & 524416) &&
						a !== (a = R[20]("clear_search", R[19], R[7]) + "") &&
						N(o, a),
					(!h || M[0] & 512) && B(i, "pagefind-ui__suppressed", !R[9]),
					R[12]
						? d
							? (d.p(R, M), M[0] & 4096 && U(d, 1))
							: ((d = is(R)), d.c(), U(d, 1), d.m(u, m))
						: d &&
							(ae(),
							P(d, 1, 1, () => {
								d = null;
							}),
							oe()),
					R[15]
						? T
							? (T.p(R, M), M[0] & 32768 && U(T, 1))
							: ((T = as(R)), T.c(), U(T, 1), T.m(u, null))
						: T &&
							(ae(),
							P(T, 1, 1, () => {
								T = null;
							}),
							oe()),
					(!h || M[0] & 32768) && B(u, "pagefind-ui__hidden", !R[15]),
					(!h ||
						(M[0] & 524416 &&
							p !== (p = R[20]("search_label", R[19], R[7])))) &&
						g(t, "aria-label", p),
					(!h || M[0] & 2) && B(e, "pagefind-ui--reset", R[1]);
			},
			i(R) {
				h || (U(d), U(T), (h = !0));
			},
			o(R) {
				P(d), P(T), (h = !1);
			},
			d(R) {
				R && k(e),
					n[34](null),
					n[35](null),
					d && d.d(),
					T && T.d(),
					(_ = !1),
					G(c);
			},
		};
	}
	var Oa = (n) => n.preventDefault();
	function ja(n, e, t) {
		let s = {},
			r = rs.map((E) => E.match(/([^\/]+)\.json$/)[1]);
		for (let E = 0; E < r.length; E++) {
			s[r[E]] = { language: r[E], ...ss[E].strings };
		}
		let { base_path: l = "/pagefind/" } = e,
			{ page_size: i = 5 } = e,
			{ reset_styles: a = !0 } = e,
			{ show_images: o = !0 } = e,
			{ show_sub_results: f = !1 } = e,
			{ excerpt_length: u } = e,
			{ process_result: m = null } = e,
			{ process_term: p = null } = e,
			{ show_empty_filters: h = !0 } = e,
			{ open_filters: _ = [] } = e,
			{ debounce_timeout_ms: c = 300 } = e,
			{ pagefind_options: d = {} } = e,
			{ merge_index: T = [] } = e,
			{ trigger_search_term: R = "" } = e,
			{ translations: M = {} } = e,
			{ autofocus: D = !1 } = e,
			{ sort: X = null } = e,
			{ selected_filters: V = {} } = e,
			v = "",
			H,
			O,
			W,
			fs = 40,
			at = !1,
			cn = [],
			ot = !1,
			ut = !1,
			_n = 0,
			fn = "",
			ct = i,
			dn = null,
			ce = null,
			hn = s.en,
			ds = (E, F, j) => j[E] ?? F[E] ?? "";
		gt(() => {
			let E = document?.querySelector?.("html")?.getAttribute?.("lang") || "en",
				F = lt(E.toLocaleLowerCase());
			t(
				19,
				(hn =
					s[`${F.language}-${F.script}-${F.region}`] ||
					s[`${F.language}-${F.region}`] ||
					s[`${F.language}`] ||
					s.en),
			);
		}),
			Et(() => {
				H?.destroy?.(), (H = null);
			});
		let mn = async () => {
				if (!at && (t(12, (at = !0)), !H)) {
					let E;
					try {
						E = await import(`${l}pagefind.js`);
					} catch (j) {
						console.error(j),
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
					u || t(24, (u = f ? 12 : 30));
					let F = { ...(d || {}), excerptLength: u };
					await E.options(F);
					for (let j of T) {
						if (!j.bundlePath) {
							throw new Error("mergeIndex requires a bundlePath parameter");
						}
						let L = j.bundlePath;
						delete j.bundlePath, await E.mergeIndex(L, j);
					}
					(H = E), hs();
				}
			},
			hs = async () => {
				H &&
					((dn = await H.filters()),
					(!ce || !Object.keys(ce).length) && t(18, (ce = dn)));
			},
			ms = (E) => {
				let F = {};
				return (
					Object.entries(E)
						.filter(([, j]) => j)
						.forEach(([j]) => {
							let [L, te] = j.split(/:(.*)$/);
							(F[L] = F[L] || []), F[L].push(te);
						}),
					F
				);
			},
			_e,
			ps = async (E, F) => {
				if (!E) {
					t(15, (ut = !1)), _e && clearTimeout(_e);
					return;
				}
				let j = ms(F),
					L = () => gs(E, j);
				c > 0 && E
					? (_e && clearTimeout(_e),
						(_e = setTimeout(L, c)),
						await pn(),
						H.preload(E, { filters: j }))
					: L(),
					Es();
			},
			pn = async () => {
				for (; !H; ) {
					mn(), await new Promise((E) => setTimeout(E, 50));
				}
			},
			gs = async (E, F) => {
				t(16, (fn = E || "")),
					typeof p == "function" && (E = p(E)),
					t(14, (ot = !0)),
					t(15, (ut = !0)),
					await pn();
				let j = ++_n,
					L = { filters: F };
				X && typeof X == "object" && (L.sort = X);
				let te = await H.search(E, L);
				_n === j &&
					(te.filters &&
						Object.keys(te.filters)?.length &&
						t(18, (ce = te.filters)),
					t(13, (cn = te)),
					t(14, (ot = !1)),
					t(17, (ct = i)));
			},
			Es = () => {
				let E = W.offsetWidth;
				E != fs && t(10, (O.style.paddingRight = `${E + 2}px`), O);
			},
			Rs = (E) => {
				E?.preventDefault(), t(17, (ct += i));
			},
			bs = (E) => {
				E.key === "Escape" && (t(9, (v = "")), O.blur()),
					E.key === "Enter" && E.preventDefault();
			};
		function Ts() {
			(v = this.value), t(9, v), t(23, R);
		}
		function Cs(E) {
			le[E ? "unshift" : "push"](() => {
				(O = E), t(10, O);
			});
		}
		function ks(E) {
			le[E ? "unshift" : "push"](() => {
				(W = E), t(11, W);
			});
		}
		let Ss = () => {
			t(9, (v = "")), O.blur();
		};
		function ys(E) {
			(V = E), t(0, V);
		}
		return (
			(n.$$set = (E) => {
				"base_path" in E && t(25, (l = E.base_path)),
					"page_size" in E && t(26, (i = E.page_size)),
					"reset_styles" in E && t(1, (a = E.reset_styles)),
					"show_images" in E && t(2, (o = E.show_images)),
					"show_sub_results" in E && t(3, (f = E.show_sub_results)),
					"excerpt_length" in E && t(24, (u = E.excerpt_length)),
					"process_result" in E && t(4, (m = E.process_result)),
					"process_term" in E && t(27, (p = E.process_term)),
					"show_empty_filters" in E && t(5, (h = E.show_empty_filters)),
					"open_filters" in E && t(6, (_ = E.open_filters)),
					"debounce_timeout_ms" in E && t(28, (c = E.debounce_timeout_ms)),
					"pagefind_options" in E && t(29, (d = E.pagefind_options)),
					"merge_index" in E && t(30, (T = E.merge_index)),
					"trigger_search_term" in E && t(23, (R = E.trigger_search_term)),
					"translations" in E && t(7, (M = E.translations)),
					"autofocus" in E && t(8, (D = E.autofocus)),
					"sort" in E && t(31, (X = E.sort)),
					"selected_filters" in E && t(0, (V = E.selected_filters));
			}),
			(n.$$.update = () => {
				if (n.$$.dirty[0] & 8388608) {
					e: R && (t(9, (v = R)), t(23, (R = "")));
				}
				if (n.$$.dirty[0] & 513) {
					e: ps(v, V);
				}
			}),
			[
				V,
				a,
				o,
				f,
				m,
				h,
				_,
				M,
				D,
				v,
				O,
				W,
				at,
				cn,
				ot,
				ut,
				fn,
				ct,
				ce,
				hn,
				ds,
				mn,
				Rs,
				R,
				u,
				l,
				i,
				p,
				c,
				d,
				T,
				X,
				bs,
				Ts,
				Cs,
				ks,
				Ss,
				ys,
			]
		);
	}
	var on = class extends q {
			constructor(e) {
				super(),
					Y(
						this,
						e,
						ja,
						Na,
						K,
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
		_s = on;
	var un;
	try {
		document?.currentScript &&
			document.currentScript.tagName.toUpperCase() === "SCRIPT" &&
			(un = new URL(document.currentScript.src).pathname.match(
				/^(.*\/)(?:pagefind-)?ui.js.*$/,
			)[1]);
	} catch {
		un = "/pagefind/";
	}
	var it = class {
		constructor(e) {
			this._pfs = null;
			let t = e.element ?? "[data-pagefind-ui]",
				s = e.bundlePath ?? un,
				r = e.pageSize ?? 5,
				l = e.resetStyles ?? !0,
				i = e.showImages ?? !0,
				a = e.showSubResults ?? !1,
				o = e.excerptLength ?? 0,
				f = e.processResult ?? null,
				u = e.processTerm ?? null,
				m = e.showEmptyFilters ?? !0,
				p = e.openFilters ?? [],
				h = e.debounceTimeoutMs ?? 300,
				_ = e.mergeIndex ?? [],
				c = e.translations ?? [],
				d = e.autofocus ?? !1,
				T = e.sort ?? null;
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
			let R = t instanceof HTMLElement ? t : document.querySelector(t);
			R
				? (this._pfs = new _s({
						target: R,
						props: {
							base_path: s,
							page_size: r,
							reset_styles: l,
							show_images: i,
							show_sub_results: a,
							excerpt_length: o,
							process_result: f,
							process_term: u,
							show_empty_filters: m,
							open_filters: p,
							debounce_timeout_ms: h,
							merge_index: _,
							translations: c,
							autofocus: d,
							sort: T,
							pagefind_options: e,
						},
					}))
				: console.error(`Pagefind UI couldn't find the selector ${t}`);
		}
		triggerSearch(e) {
			this._pfs.$$set({ trigger_search_term: e });
		}
		triggerFilters(e) {
			let t = {};
			for (let [s, r] of Object.entries(e)) {
				if (Array.isArray(r)) {
					for (let l of r) {
						t[`${s}:${l}`] = !0;
					}
				} else {
					t[`${s}:${r}`] = !0;
				}
			}
			this._pfs.$$set({ selected_filters: t });
		}
		destroy() {
			this._pfs.$destroy();
		}
	};
	window.PagefindUI = it;
})();
