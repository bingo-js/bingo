const d = new Set(),
	c = new WeakSet();
let f = !0,
	h,
	l = !1;
function v(e) {
	l || ((l = !0), (f ??= !1), (h ??= "hover"), g(), p(), w(), L());
}
function g() {
	for (const e of ["touchstart", "mousedown"]) {
		document.body.addEventListener(
			e,
			(t) => {
				i(t.target, "tap") && s(t.target.href, { ignoreSlowConnection: !0 });
			},
			{ passive: !0 },
		);
	}
}
function p() {
	let e;
	document.body.addEventListener(
		"focusin",
		(n) => {
			i(n.target, "hover") && t(n);
		},
		{ passive: !0 },
	),
		document.body.addEventListener("focusout", o, { passive: !0 }),
		u(() => {
			for (const n of document.getElementsByTagName("a")) {
				c.has(n) ||
					(i(n, "hover") &&
						(c.add(n),
						n.addEventListener("mouseenter", t, { passive: !0 }),
						n.addEventListener("mouseleave", o, { passive: !0 })));
			}
		});
	function t(n) {
		const r = n.target.href;
		e && clearTimeout(e),
			(e = setTimeout(() => {
				s(r);
			}, 80));
	}
	function o() {
		e && (clearTimeout(e), (e = 0));
	}
}
function w() {
	let e;
	u(() => {
		for (const t of document.getElementsByTagName("a")) {
			c.has(t) || (i(t, "viewport") && (c.add(t), (e ??= y()), e.observe(t)));
		}
	});
}
function y() {
	const e = new WeakMap();
	return new IntersectionObserver((t, o) => {
		for (const n of t) {
			const r = n.target,
				a = e.get(r);
			n.isIntersecting
				? (a && clearTimeout(a),
					e.set(
						r,
						setTimeout(() => {
							o.unobserve(r), e.delete(r), s(r.href);
						}, 300),
					))
				: a && (clearTimeout(a), e.delete(r));
		}
	});
}
function L() {
	u(() => {
		for (const e of document.getElementsByTagName("a")) {
			i(e, "load") && s(e.href);
		}
	});
}
function s(e, t) {
	e = e.replace(/#.*/, "");
	const o = t?.ignoreSlowConnection ?? !1;
	if (S(e, o)) {
		if (
			(d.add(e),
			document.createElement("link").relList?.supports?.("prefetch") &&
				t?.with !== "fetch")
		) {
			const n = document.createElement("link");
			(n.rel = "prefetch"), n.setAttribute("href", e), document.head.append(n);
		} else {
			fetch(e, { priority: "low" });
		}
	}
}
function S(e, t) {
	if (!navigator.onLine || (!t && m())) {
		return !1;
	}
	try {
		const o = new URL(e, location.href);
		return (
			location.origin === o.origin &&
			(location.pathname !== o.pathname || location.search !== o.search) &&
			!d.has(e)
		);
	} catch {}
	return !1;
}
function i(e, t) {
	if (e?.tagName !== "A") {
		return !1;
	}
	const o = e.dataset.astroPrefetch;
	return o === "false"
		? !1
		: t === "tap" && (o != null || f) && m()
			? !0
			: (o == null && f) || o === ""
				? t === h
				: o === t;
}
function m() {
	if ("connection" in navigator) {
		const e = navigator.connection;
		return e.saveData || /2g/.test(e.effectiveType);
	}
	return !1;
}
function u(e) {
	e();
	let t = !1;
	document.addEventListener("astro:page-load", () => {
		if (!t) {
			t = !0;
			return;
		}
		e();
	});
}
v();
