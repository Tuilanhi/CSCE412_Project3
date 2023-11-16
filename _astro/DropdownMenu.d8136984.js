import { r as c, R as E, g as ye } from './index.c35d1a06.js';
var Ie = Object.defineProperty,
  Ee = (e, t, n) =>
    t in e
      ? Ie(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
      : (e[t] = n),
  H = (e, t, n) => (Ee(e, typeof t != 'symbol' ? t + '' : t, n), n);
let xe = class {
    constructor() {
      H(this, 'current', this.detect()),
        H(this, 'handoffState', 'pending'),
        H(this, 'currentId', 0);
    }
    set(t) {
      this.current !== t &&
        ((this.handoffState = 'pending'),
        (this.currentId = 0),
        (this.current = t));
    }
    reset() {
      this.set(this.detect());
    }
    nextId() {
      return ++this.currentId;
    }
    get isServer() {
      return this.current === 'server';
    }
    get isClient() {
      return this.current === 'client';
    }
    detect() {
      return typeof window > 'u' || typeof document > 'u' ? 'server' : 'client';
    }
    handoff() {
      this.handoffState === 'pending' && (this.handoffState = 'complete');
    }
    get isHandoffComplete() {
      return this.handoffState === 'complete';
    }
  },
  j = new xe(),
  M = (e, t) => {
    j.isServer ? c.useEffect(e, t) : c.useLayoutEffect(e, t);
  };
function ce(e) {
  let t = c.useRef(e);
  return (
    M(() => {
      t.current = e;
    }, [e]),
    t
  );
}
function we(e) {
  typeof queueMicrotask == 'function'
    ? queueMicrotask(e)
    : Promise.resolve()
        .then(e)
        .catch((t) =>
          setTimeout(() => {
            throw t;
          })
        );
}
function O() {
  let e = [],
    t = {
      addEventListener(n, r, o, l) {
        return (
          n.addEventListener(r, o, l),
          t.add(() => n.removeEventListener(r, o, l))
        );
      },
      requestAnimationFrame(...n) {
        let r = requestAnimationFrame(...n);
        return t.add(() => cancelAnimationFrame(r));
      },
      nextFrame(...n) {
        return t.requestAnimationFrame(() => t.requestAnimationFrame(...n));
      },
      setTimeout(...n) {
        let r = setTimeout(...n);
        return t.add(() => clearTimeout(r));
      },
      microTask(...n) {
        let r = { current: !0 };
        return (
          we(() => {
            r.current && n[0]();
          }),
          t.add(() => {
            r.current = !1;
          })
        );
      },
      style(n, r, o) {
        let l = n.style.getPropertyValue(r);
        return (
          Object.assign(n.style, { [r]: o }),
          this.add(() => {
            Object.assign(n.style, { [r]: l });
          })
        );
      },
      group(n) {
        let r = O();
        return n(r), this.add(() => r.dispose());
      },
      add(n) {
        return (
          e.push(n),
          () => {
            let r = e.indexOf(n);
            if (r >= 0) for (let o of e.splice(r, 1)) o();
          }
        );
      },
      dispose() {
        for (let n of e.splice(0)) n();
      },
    };
  return t;
}
function ue() {
  let [e] = c.useState(O);
  return c.useEffect(() => () => e.dispose(), [e]), e;
}
let I = function (e) {
  let t = ce(e);
  return E.useCallback((...n) => t.current(...n), [t]);
};
function Se() {
  let [e, t] = c.useState(j.isHandoffComplete);
  return (
    e && j.isHandoffComplete === !1 && t(!1),
    c.useEffect(() => {
      e !== !0 && t(!0);
    }, [e]),
    c.useEffect(() => j.handoff(), []),
    e
  );
}
var oe;
let X =
  (oe = E.useId) != null
    ? oe
    : function () {
        let e = Se(),
          [t, n] = E.useState(e ? () => j.nextId() : null);
        return (
          M(() => {
            t === null && n(j.nextId());
          }, [t]),
          t != null ? '' + t : void 0
        );
      };
function U(e, t, ...n) {
  if (e in t) {
    let o = t[e];
    return typeof o == 'function' ? o(...n) : o;
  }
  let r = new Error(
    `Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(
      t
    )
      .map((o) => `"${o}"`)
      .join(', ')}.`
  );
  throw (Error.captureStackTrace && Error.captureStackTrace(r, U), r);
}
function k(e) {
  return j.isServer
    ? null
    : e instanceof Node
    ? e.ownerDocument
    : e != null && e.hasOwnProperty('current') && e.current instanceof Node
    ? e.current.ownerDocument
    : document;
}
let q = [
  '[contentEditable=true]',
  '[tabindex]',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'iframe',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
]
  .map((e) => `${e}:not([tabindex='-1'])`)
  .join(',');
var W = ((e) => (
    (e[(e.First = 1)] = 'First'),
    (e[(e.Previous = 2)] = 'Previous'),
    (e[(e.Next = 4)] = 'Next'),
    (e[(e.Last = 8)] = 'Last'),
    (e[(e.WrapAround = 16)] = 'WrapAround'),
    (e[(e.NoScroll = 32)] = 'NoScroll'),
    e
  ))(W || {}),
  Me = ((e) => (
    (e[(e.Error = 0)] = 'Error'),
    (e[(e.Overflow = 1)] = 'Overflow'),
    (e[(e.Success = 2)] = 'Success'),
    (e[(e.Underflow = 3)] = 'Underflow'),
    e
  ))(Me || {}),
  Ne = ((e) => (
    (e[(e.Previous = -1)] = 'Previous'), (e[(e.Next = 1)] = 'Next'), e
  ))(Ne || {});
function de(e = document.body) {
  return e == null
    ? []
    : Array.from(e.querySelectorAll(q)).sort((t, n) =>
        Math.sign(
          (t.tabIndex || Number.MAX_SAFE_INTEGER) -
            (n.tabIndex || Number.MAX_SAFE_INTEGER)
        )
      );
}
var J = ((e) => (
  (e[(e.Strict = 0)] = 'Strict'), (e[(e.Loose = 1)] = 'Loose'), e
))(J || {});
function Z(e, t = 0) {
  var n;
  return e === ((n = k(e)) == null ? void 0 : n.body)
    ? !1
    : U(t, {
        [0]() {
          return e.matches(q);
        },
        [1]() {
          let r = e;
          for (; r !== null; ) {
            if (r.matches(q)) return !0;
            r = r.parentElement;
          }
          return !1;
        },
      });
}
function me(e) {
  let t = k(e);
  O().nextFrame(() => {
    t && !Z(t.activeElement, 0) && je(e);
  });
}
var Te = ((e) => (
  (e[(e.Keyboard = 0)] = 'Keyboard'), (e[(e.Mouse = 1)] = 'Mouse'), e
))(Te || {});
typeof window < 'u' &&
  typeof document < 'u' &&
  (document.addEventListener(
    'keydown',
    (e) => {
      e.metaKey ||
        e.altKey ||
        e.ctrlKey ||
        (document.documentElement.dataset.headlessuiFocusVisible = '');
    },
    !0
  ),
  document.addEventListener(
    'click',
    (e) => {
      e.detail === 1
        ? delete document.documentElement.dataset.headlessuiFocusVisible
        : e.detail === 0 &&
          (document.documentElement.dataset.headlessuiFocusVisible = '');
    },
    !0
  ));
function je(e) {
  e?.focus({ preventScroll: !0 });
}
let Oe = ['textarea', 'input'].join(',');
function Re(e) {
  var t, n;
  return (n = (t = e?.matches) == null ? void 0 : t.call(e, Oe)) != null
    ? n
    : !1;
}
function fe(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let o = t(n),
      l = t(r);
    if (o === null || l === null) return 0;
    let i = o.compareDocumentPosition(l);
    return i & Node.DOCUMENT_POSITION_FOLLOWING
      ? -1
      : i & Node.DOCUMENT_POSITION_PRECEDING
      ? 1
      : 0;
  });
}
function Ue(e, t) {
  return Ce(de(), t, { relativeTo: e });
}
function Ce(
  e,
  t,
  { sorted: n = !0, relativeTo: r = null, skipElements: o = [] } = {}
) {
  let l = Array.isArray(e)
      ? e.length > 0
        ? e[0].ownerDocument
        : document
      : e.ownerDocument,
    i = Array.isArray(e) ? (n ? fe(e) : e) : de(e);
  o.length > 0 && i.length > 1 && (i = i.filter((h) => !o.includes(h))),
    (r = r ?? l.activeElement);
  let s = (() => {
      if (t & 5) return 1;
      if (t & 10) return -1;
      throw new Error(
        'Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last'
      );
    })(),
    a = (() => {
      if (t & 1) return 0;
      if (t & 2) return Math.max(0, i.indexOf(r)) - 1;
      if (t & 4) return Math.max(0, i.indexOf(r)) + 1;
      if (t & 8) return i.length - 1;
      throw new Error(
        'Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last'
      );
    })(),
    d = t & 32 ? { preventScroll: !0 } : {},
    f = 0,
    u = i.length,
    p;
  do {
    if (f >= u || f + u <= 0) return 0;
    let h = a + f;
    if (t & 16) h = (h + u) % u;
    else {
      if (h < 0) return 3;
      if (h >= u) return 1;
    }
    (p = i[h]), p?.focus(d), (f += s);
  } while (p !== l.activeElement);
  return t & 6 && Re(p) && p.select(), 2;
}
function K(e, t, n) {
  let r = ce(t);
  c.useEffect(() => {
    function o(l) {
      r.current(l);
    }
    return (
      document.addEventListener(e, o, n),
      () => document.removeEventListener(e, o, n)
    );
  }, [e, n]);
}
function Pe(e, t, n = !0) {
  let r = c.useRef(!1);
  c.useEffect(() => {
    requestAnimationFrame(() => {
      r.current = n;
    });
  }, [n]);
  function o(i, s) {
    if (!r.current || i.defaultPrevented) return;
    let a = (function f(u) {
        return typeof u == 'function'
          ? f(u())
          : Array.isArray(u) || u instanceof Set
          ? u
          : [u];
      })(e),
      d = s(i);
    if (d !== null && d.getRootNode().contains(d)) {
      for (let f of a) {
        if (f === null) continue;
        let u = f instanceof HTMLElement ? f : f.current;
        if (
          (u != null && u.contains(d)) ||
          (i.composed && i.composedPath().includes(u))
        )
          return;
      }
      return !Z(d, J.Loose) && d.tabIndex !== -1 && i.preventDefault(), t(i, d);
    }
  }
  let l = c.useRef(null);
  K(
    'mousedown',
    (i) => {
      var s, a;
      r.current &&
        (l.current =
          ((a = (s = i.composedPath) == null ? void 0 : s.call(i)) == null
            ? void 0
            : a[0]) || i.target);
    },
    !0
  ),
    K(
      'click',
      (i) => {
        l.current && (o(i, () => l.current), (l.current = null));
      },
      !0
    ),
    K(
      'blur',
      (i) =>
        o(i, () =>
          window.document.activeElement instanceof HTMLIFrameElement
            ? window.document.activeElement
            : null
        ),
      !0
    );
}
function ie(e) {
  var t;
  if (e.type) return e.type;
  let n = (t = e.as) != null ? t : 'button';
  if (typeof n == 'string' && n.toLowerCase() === 'button') return 'button';
}
function Fe(e, t) {
  let [n, r] = c.useState(() => ie(e));
  return (
    M(() => {
      r(ie(e));
    }, [e.type, e.as]),
    M(() => {
      n ||
        (t.current &&
          t.current instanceof HTMLButtonElement &&
          !t.current.hasAttribute('type') &&
          r('button'));
    }, [n, t]),
    n
  );
}
let Le = Symbol();
function A(...e) {
  let t = c.useRef(e);
  c.useEffect(() => {
    t.current = e;
  }, [e]);
  let n = I((r) => {
    for (let o of t.current)
      o != null && (typeof o == 'function' ? o(r) : (o.current = r));
  });
  return e.every((r) => r == null || r?.[Le]) ? void 0 : n;
}
function ke({ container: e, accept: t, walk: n, enabled: r = !0 }) {
  let o = c.useRef(t),
    l = c.useRef(n);
  c.useEffect(() => {
    (o.current = t), (l.current = n);
  }, [t, n]),
    M(() => {
      if (!e || !r) return;
      let i = k(e);
      if (!i) return;
      let s = o.current,
        a = l.current,
        d = Object.assign((u) => s(u), { acceptNode: s }),
        f = i.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, d, !1);
      for (; f.nextNode(); ) a(f.currentNode);
    }, [e, r, o, l]);
}
function Ae(e) {
  throw new Error('Unexpected object: ' + e);
}
var S = ((e) => (
  (e[(e.First = 0)] = 'First'),
  (e[(e.Previous = 1)] = 'Previous'),
  (e[(e.Next = 2)] = 'Next'),
  (e[(e.Last = 3)] = 'Last'),
  (e[(e.Specific = 4)] = 'Specific'),
  (e[(e.Nothing = 5)] = 'Nothing'),
  e
))(S || {});
function $e(e, t) {
  let n = t.resolveItems();
  if (n.length <= 0) return null;
  let r = t.resolveActiveIndex(),
    o = r ?? -1,
    l = (() => {
      switch (e.focus) {
        case 0:
          return n.findIndex((i) => !t.resolveDisabled(i));
        case 1: {
          let i = n
            .slice()
            .reverse()
            .findIndex((s, a, d) =>
              o !== -1 && d.length - a - 1 >= o ? !1 : !t.resolveDisabled(s)
            );
          return i === -1 ? i : n.length - 1 - i;
        }
        case 2:
          return n.findIndex((i, s) => (s <= o ? !1 : !t.resolveDisabled(i)));
        case 3: {
          let i = n
            .slice()
            .reverse()
            .findIndex((s) => !t.resolveDisabled(s));
          return i === -1 ? i : n.length - 1 - i;
        }
        case 4:
          return n.findIndex((i) => t.resolveId(i) === e.id);
        case 5:
          return null;
        default:
          Ae(e);
      }
    })();
  return l === -1 ? r : l;
}
function se(...e) {
  return e.filter(Boolean).join(' ');
}
var Y = ((e) => (
    (e[(e.None = 0)] = 'None'),
    (e[(e.RenderStrategy = 1)] = 'RenderStrategy'),
    (e[(e.Static = 2)] = 'Static'),
    e
  ))(Y || {}),
  De = ((e) => (
    (e[(e.Unmount = 0)] = 'Unmount'), (e[(e.Hidden = 1)] = 'Hidden'), e
  ))(De || {});
function $({
  ourProps: e,
  theirProps: t,
  slot: n,
  defaultTag: r,
  features: o,
  visible: l = !0,
  name: i,
}) {
  let s = pe(t, e);
  if (l) return F(s, n, r, i);
  let a = o ?? 0;
  if (a & 2) {
    let { static: d = !1, ...f } = s;
    if (d) return F(f, n, r, i);
  }
  if (a & 1) {
    let { unmount: d = !0, ...f } = s;
    return U(d ? 0 : 1, {
      [0]() {
        return null;
      },
      [1]() {
        return F({ ...f, hidden: !0, style: { display: 'none' } }, n, r, i);
      },
    });
  }
  return F(s, n, r, i);
}
function F(e, t = {}, n, r) {
  let {
      as: o = n,
      children: l,
      refName: i = 'ref',
      ...s
    } = G(e, ['unmount', 'static']),
    a = e.ref !== void 0 ? { [i]: e.ref } : {},
    d = typeof l == 'function' ? l(t) : l;
  'className' in s &&
    s.className &&
    typeof s.className == 'function' &&
    (s.className = s.className(t));
  let f = {};
  if (t) {
    let u = !1,
      p = [];
    for (let [h, g] of Object.entries(t))
      typeof g == 'boolean' && (u = !0), g === !0 && p.push(h);
    u && (f['data-headlessui-state'] = p.join(' '));
  }
  if (o === c.Fragment && Object.keys(le(s)).length > 0) {
    if (!c.isValidElement(d) || (Array.isArray(d) && d.length > 1))
      throw new Error(
        [
          'Passing props on "Fragment"!',
          '',
          `The current component <${r} /> is rendering a "Fragment".`,
          'However we need to passthrough the following props:',
          Object.keys(s).map((g) => `  - ${g}`).join(`
`),
          '',
          'You can apply a few solutions:',
          [
            'Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',
            'Render a single element as the child so that we can forward the props onto that element.',
          ].map((g) => `  - ${g}`).join(`
`),
        ].join(`
`)
      );
    let u = d.props,
      p =
        typeof u?.className == 'function'
          ? (...g) => se(u?.className(...g), s.className)
          : se(u?.className, s.className),
      h = p ? { className: p } : {};
    return c.cloneElement(
      d,
      Object.assign(
        {},
        pe(d.props, le(G(s, ['ref']))),
        f,
        a,
        _e(d.ref, a.ref),
        h
      )
    );
  }
  return c.createElement(
    o,
    Object.assign(
      {},
      G(s, ['ref']),
      o !== c.Fragment && a,
      o !== c.Fragment && f
    ),
    d
  );
}
function _e(...e) {
  return {
    ref: e.every((t) => t == null)
      ? void 0
      : (t) => {
          for (let n of e)
            n != null && (typeof n == 'function' ? n(t) : (n.current = t));
        },
  };
}
function pe(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {},
    n = {};
  for (let r of e)
    for (let o in r)
      o.startsWith('on') && typeof r[o] == 'function'
        ? (n[o] != null || (n[o] = []), n[o].push(r[o]))
        : (t[o] = r[o]);
  if (t.disabled || t['aria-disabled'])
    return Object.assign(
      t,
      Object.fromEntries(Object.keys(n).map((r) => [r, void 0]))
    );
  for (let r in n)
    Object.assign(t, {
      [r](o, ...l) {
        let i = n[r];
        for (let s of i) {
          if (
            (o instanceof Event || o?.nativeEvent instanceof Event) &&
            o.defaultPrevented
          )
            return;
          s(o, ...l);
        }
      },
    });
  return t;
}
function D(e) {
  var t;
  return Object.assign(c.forwardRef(e), {
    displayName: (t = e.displayName) != null ? t : e.name,
  });
}
function le(e) {
  let t = Object.assign({}, e);
  for (let n in t) t[n] === void 0 && delete t[n];
  return t;
}
function G(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function Be(e) {
  let t = e.parentElement,
    n = null;
  for (; t && !(t instanceof HTMLFieldSetElement); )
    t instanceof HTMLLegendElement && (n = t), (t = t.parentElement);
  let r = t?.getAttribute('disabled') === '';
  return r && He(n) ? !1 : r;
}
function He(e) {
  if (!e) return !1;
  let t = e.previousElementSibling;
  for (; t !== null; ) {
    if (t instanceof HTMLLegendElement) return !1;
    t = t.previousElementSibling;
  }
  return !0;
}
let ee = c.createContext(null);
ee.displayName = 'OpenClosedContext';
var R = ((e) => (
  (e[(e.Open = 1)] = 'Open'),
  (e[(e.Closed = 2)] = 'Closed'),
  (e[(e.Closing = 4)] = 'Closing'),
  (e[(e.Opening = 8)] = 'Opening'),
  e
))(R || {});
function Ke() {
  return c.useContext(ee);
}
function Ge({ value: e, children: t }) {
  return E.createElement(ee.Provider, { value: e }, t);
}
var b = ((e) => (
  (e.Space = ' '),
  (e.Enter = 'Enter'),
  (e.Escape = 'Escape'),
  (e.Backspace = 'Backspace'),
  (e.Delete = 'Delete'),
  (e.ArrowLeft = 'ArrowLeft'),
  (e.ArrowUp = 'ArrowUp'),
  (e.ArrowRight = 'ArrowRight'),
  (e.ArrowDown = 'ArrowDown'),
  (e.Home = 'Home'),
  (e.End = 'End'),
  (e.PageUp = 'PageUp'),
  (e.PageDown = 'PageDown'),
  (e.Tab = 'Tab'),
  e
))(b || {});
function ae(e) {
  return [e.screenX, e.screenY];
}
function Ve() {
  let e = c.useRef([-1, -1]);
  return {
    wasMoved(t) {
      let n = ae(t);
      return e.current[0] === n[0] && e.current[1] === n[1]
        ? !1
        : ((e.current = n), !0);
    },
    update(t) {
      e.current = ae(t);
    },
  };
}
function ze(...e) {
  return c.useMemo(() => k(...e), [...e]);
}
var qe = ((e) => (
    (e[(e.Open = 0)] = 'Open'), (e[(e.Closed = 1)] = 'Closed'), e
  ))(qe || {}),
  We = ((e) => (
    (e[(e.Pointer = 0)] = 'Pointer'), (e[(e.Other = 1)] = 'Other'), e
  ))(We || {}),
  Ye = ((e) => (
    (e[(e.OpenMenu = 0)] = 'OpenMenu'),
    (e[(e.CloseMenu = 1)] = 'CloseMenu'),
    (e[(e.GoToItem = 2)] = 'GoToItem'),
    (e[(e.Search = 3)] = 'Search'),
    (e[(e.ClearSearch = 4)] = 'ClearSearch'),
    (e[(e.RegisterItem = 5)] = 'RegisterItem'),
    (e[(e.UnregisterItem = 6)] = 'UnregisterItem'),
    e
  ))(Ye || {});
function V(e, t = (n) => n) {
  let n = e.activeItemIndex !== null ? e.items[e.activeItemIndex] : null,
    r = fe(t(e.items.slice()), (l) => l.dataRef.current.domRef.current),
    o = n ? r.indexOf(n) : null;
  return o === -1 && (o = null), { items: r, activeItemIndex: o };
}
let Qe = {
    [1](e) {
      return e.menuState === 1
        ? e
        : { ...e, activeItemIndex: null, menuState: 1 };
    },
    [0](e) {
      return e.menuState === 0 ? e : { ...e, menuState: 0 };
    },
    [2]: (e, t) => {
      var n;
      let r = V(e),
        o = $e(t, {
          resolveItems: () => r.items,
          resolveActiveIndex: () => r.activeItemIndex,
          resolveId: (l) => l.id,
          resolveDisabled: (l) => l.dataRef.current.disabled,
        });
      return {
        ...e,
        ...r,
        searchQuery: '',
        activeItemIndex: o,
        activationTrigger: (n = t.trigger) != null ? n : 1,
      };
    },
    [3]: (e, t) => {
      let n = e.searchQuery !== '' ? 0 : 1,
        r = e.searchQuery + t.value.toLowerCase(),
        o = (
          e.activeItemIndex !== null
            ? e.items
                .slice(e.activeItemIndex + n)
                .concat(e.items.slice(0, e.activeItemIndex + n))
            : e.items
        ).find((i) => {
          var s;
          return (
            ((s = i.dataRef.current.textValue) == null
              ? void 0
              : s.startsWith(r)) && !i.dataRef.current.disabled
          );
        }),
        l = o ? e.items.indexOf(o) : -1;
      return l === -1 || l === e.activeItemIndex
        ? { ...e, searchQuery: r }
        : { ...e, searchQuery: r, activeItemIndex: l, activationTrigger: 1 };
    },
    [4](e) {
      return e.searchQuery === ''
        ? e
        : { ...e, searchQuery: '', searchActiveItemIndex: null };
    },
    [5]: (e, t) => {
      let n = V(e, (r) => [...r, { id: t.id, dataRef: t.dataRef }]);
      return { ...e, ...n };
    },
    [6]: (e, t) => {
      let n = V(e, (r) => {
        let o = r.findIndex((l) => l.id === t.id);
        return o !== -1 && r.splice(o, 1), r;
      });
      return { ...e, ...n, activationTrigger: 1 };
    },
  },
  te = c.createContext(null);
te.displayName = 'MenuContext';
function _(e) {
  let t = c.useContext(te);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Menu /> component.`);
    throw (Error.captureStackTrace && Error.captureStackTrace(n, _), n);
  }
  return t;
}
function Xe(e, t) {
  return U(t.type, Qe, e, t);
}
let Je = c.Fragment;
function Ze(e, t) {
  let n = c.useReducer(Xe, {
      menuState: 1,
      buttonRef: c.createRef(),
      itemsRef: c.createRef(),
      items: [],
      searchQuery: '',
      activeItemIndex: null,
      activationTrigger: 1,
    }),
    [{ menuState: r, itemsRef: o, buttonRef: l }, i] = n,
    s = A(t);
  Pe(
    [l, o],
    (p, h) => {
      var g;
      i({ type: 1 }),
        Z(h, J.Loose) ||
          (p.preventDefault(), (g = l.current) == null || g.focus());
    },
    r === 0
  );
  let a = I(() => {
      i({ type: 1 });
    }),
    d = c.useMemo(() => ({ open: r === 0, close: a }), [r, a]),
    f = e,
    u = { ref: s };
  return E.createElement(
    te.Provider,
    { value: n },
    E.createElement(
      Ge,
      { value: U(r, { [0]: R.Open, [1]: R.Closed }) },
      $({ ourProps: u, theirProps: f, slot: d, defaultTag: Je, name: 'Menu' })
    )
  );
}
let et = 'button';
function tt(e, t) {
  var n;
  let r = X(),
    { id: o = `headlessui-menu-button-${r}`, ...l } = e,
    [i, s] = _('Menu.Button'),
    a = A(i.buttonRef, t),
    d = ue(),
    f = I((v) => {
      switch (v.key) {
        case b.Space:
        case b.Enter:
        case b.ArrowDown:
          v.preventDefault(),
            v.stopPropagation(),
            s({ type: 0 }),
            d.nextFrame(() => s({ type: 2, focus: S.First }));
          break;
        case b.ArrowUp:
          v.preventDefault(),
            v.stopPropagation(),
            s({ type: 0 }),
            d.nextFrame(() => s({ type: 2, focus: S.Last }));
          break;
      }
    }),
    u = I((v) => {
      switch (v.key) {
        case b.Space:
          v.preventDefault();
          break;
      }
    }),
    p = I((v) => {
      if (Be(v.currentTarget)) return v.preventDefault();
      e.disabled ||
        (i.menuState === 0
          ? (s({ type: 1 }),
            d.nextFrame(() => {
              var T;
              return (T = i.buttonRef.current) == null
                ? void 0
                : T.focus({ preventScroll: !0 });
            }))
          : (v.preventDefault(), s({ type: 0 })));
    }),
    h = c.useMemo(() => ({ open: i.menuState === 0 }), [i]),
    g = {
      ref: a,
      id: o,
      type: Fe(e, i.buttonRef),
      'aria-haspopup': 'menu',
      'aria-controls': (n = i.itemsRef.current) == null ? void 0 : n.id,
      'aria-expanded': e.disabled ? void 0 : i.menuState === 0,
      onKeyDown: f,
      onKeyUp: u,
      onClick: p,
    };
  return $({
    ourProps: g,
    theirProps: l,
    slot: h,
    defaultTag: et,
    name: 'Menu.Button',
  });
}
let nt = 'div',
  rt = Y.RenderStrategy | Y.Static;
function ot(e, t) {
  var n, r;
  let o = X(),
    { id: l = `headlessui-menu-items-${o}`, ...i } = e,
    [s, a] = _('Menu.Items'),
    d = A(s.itemsRef, t),
    f = ze(s.itemsRef),
    u = ue(),
    p = Ke(),
    h = (() => (p !== null ? (p & R.Open) === R.Open : s.menuState === 0))();
  c.useEffect(() => {
    let m = s.itemsRef.current;
    m &&
      s.menuState === 0 &&
      m !== f?.activeElement &&
      m.focus({ preventScroll: !0 });
  }, [s.menuState, s.itemsRef, f]),
    ke({
      container: s.itemsRef.current,
      enabled: s.menuState === 0,
      accept(m) {
        return m.getAttribute('role') === 'menuitem'
          ? NodeFilter.FILTER_REJECT
          : m.hasAttribute('role')
          ? NodeFilter.FILTER_SKIP
          : NodeFilter.FILTER_ACCEPT;
      },
      walk(m) {
        m.setAttribute('role', 'none');
      },
    });
  let g = I((m) => {
      var P, y;
      switch ((u.dispose(), m.key)) {
        case b.Space:
          if (s.searchQuery !== '')
            return (
              m.preventDefault(),
              m.stopPropagation(),
              a({ type: 3, value: m.key })
            );
        case b.Enter:
          if (
            (m.preventDefault(),
            m.stopPropagation(),
            a({ type: 1 }),
            s.activeItemIndex !== null)
          ) {
            let { dataRef: x } = s.items[s.activeItemIndex];
            (y = (P = x.current) == null ? void 0 : P.domRef.current) == null ||
              y.click();
          }
          me(s.buttonRef.current);
          break;
        case b.ArrowDown:
          return (
            m.preventDefault(),
            m.stopPropagation(),
            a({ type: 2, focus: S.Next })
          );
        case b.ArrowUp:
          return (
            m.preventDefault(),
            m.stopPropagation(),
            a({ type: 2, focus: S.Previous })
          );
        case b.Home:
        case b.PageUp:
          return (
            m.preventDefault(),
            m.stopPropagation(),
            a({ type: 2, focus: S.First })
          );
        case b.End:
        case b.PageDown:
          return (
            m.preventDefault(),
            m.stopPropagation(),
            a({ type: 2, focus: S.Last })
          );
        case b.Escape:
          m.preventDefault(),
            m.stopPropagation(),
            a({ type: 1 }),
            O().nextFrame(() => {
              var x;
              return (x = s.buttonRef.current) == null
                ? void 0
                : x.focus({ preventScroll: !0 });
            });
          break;
        case b.Tab:
          m.preventDefault(),
            m.stopPropagation(),
            a({ type: 1 }),
            O().nextFrame(() => {
              Ue(s.buttonRef.current, m.shiftKey ? W.Previous : W.Next);
            });
          break;
        default:
          m.key.length === 1 &&
            (a({ type: 3, value: m.key }),
            u.setTimeout(() => a({ type: 4 }), 350));
          break;
      }
    }),
    v = I((m) => {
      switch (m.key) {
        case b.Space:
          m.preventDefault();
          break;
      }
    }),
    T = c.useMemo(() => ({ open: s.menuState === 0 }), [s]),
    C = {
      'aria-activedescendant':
        s.activeItemIndex === null || (n = s.items[s.activeItemIndex]) == null
          ? void 0
          : n.id,
      'aria-labelledby': (r = s.buttonRef.current) == null ? void 0 : r.id,
      id: l,
      onKeyDown: g,
      onKeyUp: v,
      role: 'menu',
      tabIndex: 0,
      ref: d,
    };
  return $({
    ourProps: C,
    theirProps: i,
    slot: T,
    defaultTag: nt,
    features: rt,
    visible: h,
    name: 'Menu.Items',
  });
}
let it = c.Fragment;
function st(e, t) {
  let n = X(),
    { id: r = `headlessui-menu-item-${n}`, disabled: o = !1, ...l } = e,
    [i, s] = _('Menu.Item'),
    a = i.activeItemIndex !== null ? i.items[i.activeItemIndex].id === r : !1,
    d = c.useRef(null),
    f = A(t, d);
  M(() => {
    if (i.menuState !== 0 || !a || i.activationTrigger === 0) return;
    let y = O();
    return (
      y.requestAnimationFrame(() => {
        var x, re;
        (re = (x = d.current) == null ? void 0 : x.scrollIntoView) == null ||
          re.call(x, { block: 'nearest' });
      }),
      y.dispose
    );
  }, [d, a, i.menuState, i.activationTrigger, i.activeItemIndex]);
  let u = c.useRef({ disabled: o, domRef: d });
  M(() => {
    u.current.disabled = o;
  }, [u, o]),
    M(() => {
      var y, x;
      u.current.textValue =
        (x = (y = d.current) == null ? void 0 : y.textContent) == null
          ? void 0
          : x.toLowerCase();
    }, [u, d]),
    M(
      () => (s({ type: 5, id: r, dataRef: u }), () => s({ type: 6, id: r })),
      [u, r]
    );
  let p = I(() => {
      s({ type: 1 });
    }),
    h = I((y) => {
      if (o) return y.preventDefault();
      s({ type: 1 }), me(i.buttonRef.current);
    }),
    g = I(() => {
      if (o) return s({ type: 2, focus: S.Nothing });
      s({ type: 2, focus: S.Specific, id: r });
    }),
    v = Ve(),
    T = I((y) => v.update(y)),
    C = I((y) => {
      v.wasMoved(y) &&
        (o || a || s({ type: 2, focus: S.Specific, id: r, trigger: 0 }));
    }),
    m = I((y) => {
      v.wasMoved(y) && (o || (a && s({ type: 2, focus: S.Nothing })));
    }),
    P = c.useMemo(() => ({ active: a, disabled: o, close: p }), [a, o, p]);
  return $({
    ourProps: {
      id: r,
      ref: f,
      role: 'menuitem',
      tabIndex: o === !0 ? void 0 : -1,
      'aria-disabled': o === !0 ? !0 : void 0,
      disabled: void 0,
      onClick: h,
      onFocus: g,
      onPointerEnter: T,
      onMouseEnter: T,
      onPointerMove: C,
      onMouseMove: C,
      onPointerLeave: m,
      onMouseLeave: m,
    },
    theirProps: l,
    slot: P,
    defaultTag: it,
    name: 'Menu.Item',
  });
}
let lt = D(Ze),
  at = D(tt),
  ct = D(ot),
  ut = D(st),
  L = Object.assign(lt, { Button: at, Items: ct, Item: ut });
var dt = [
    {
      id: 'ci',
      name: 'Circum Icons',
      projectUrl: 'https://circumicons.com/',
      license: 'MPL-2.0 license',
      licenseUrl:
        'https://github.com/Klarr-Agency/Circum-Icons/blob/main/LICENSE',
    },
    {
      id: 'fa',
      name: 'Font Awesome 5',
      projectUrl: 'https://fontawesome.com/',
      license: 'CC BY 4.0 License',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    },
    {
      id: 'io',
      name: 'Ionicons 4',
      projectUrl: 'https://ionicons.com/',
      license: 'MIT',
      licenseUrl: 'https://github.com/ionic-team/ionicons/blob/master/LICENSE',
    },
    {
      id: 'io5',
      name: 'Ionicons 5',
      projectUrl: 'https://ionicons.com/',
      license: 'MIT',
      licenseUrl: 'https://github.com/ionic-team/ionicons/blob/master/LICENSE',
    },
    {
      id: 'md',
      name: 'Material Design icons',
      projectUrl: 'http://google.github.io/material-design-icons/',
      license: 'Apache License Version 2.0',
      licenseUrl:
        'https://github.com/google/material-design-icons/blob/master/LICENSE',
    },
    {
      id: 'ti',
      name: 'Typicons',
      projectUrl: 'http://s-ings.com/typicons/',
      license: 'CC BY-SA 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    },
    {
      id: 'go',
      name: 'Github Octicons icons',
      projectUrl: 'https://octicons.github.com/',
      license: 'MIT',
      licenseUrl: 'https://github.com/primer/octicons/blob/master/LICENSE',
    },
    {
      id: 'fi',
      name: 'Feather',
      projectUrl: 'https://feathericons.com/',
      license: 'MIT',
      licenseUrl: 'https://github.com/feathericons/feather/blob/master/LICENSE',
    },
    {
      id: 'gi',
      name: 'Game Icons',
      projectUrl: 'https://game-icons.net/',
      license: 'CC BY 3.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/3.0/',
    },
    {
      id: 'wi',
      name: 'Weather Icons',
      projectUrl: 'https://erikflowers.github.io/weather-icons/',
      license: 'SIL OFL 1.1',
      licenseUrl: 'http://scripts.sil.org/OFL',
    },
    {
      id: 'di',
      name: 'Devicons',
      projectUrl: 'https://vorillaz.github.io/devicons/',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'ai',
      name: 'Ant Design Icons',
      projectUrl: 'https://github.com/ant-design/ant-design-icons',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'bs',
      name: 'Bootstrap Icons',
      projectUrl: 'https://github.com/twbs/icons',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'ri',
      name: 'Remix Icon',
      projectUrl: 'https://github.com/Remix-Design/RemixIcon',
      license: 'Apache License Version 2.0',
      licenseUrl: 'http://www.apache.org/licenses/',
    },
    {
      id: 'fc',
      name: 'Flat Color Icons',
      projectUrl: 'https://github.com/icons8/flat-color-icons',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'gr',
      name: 'Grommet-Icons',
      projectUrl: 'https://github.com/grommet/grommet-icons',
      license: 'Apache License Version 2.0',
      licenseUrl: 'http://www.apache.org/licenses/',
    },
    {
      id: 'hi',
      name: 'Heroicons',
      projectUrl: 'https://github.com/tailwindlabs/heroicons',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'hi2',
      name: 'Heroicons 2',
      projectUrl: 'https://github.com/tailwindlabs/heroicons',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'si',
      name: 'Simple Icons',
      projectUrl: 'https://simpleicons.org/',
      license: 'CC0 1.0 Universal',
      licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    },
    {
      id: 'sl',
      name: 'Simple Line Icons',
      projectUrl: 'https://thesabbir.github.io/simple-line-icons/',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'im',
      name: 'IcoMoon Free',
      projectUrl: 'https://github.com/Keyamoon/IcoMoon-Free',
      license: 'CC BY 4.0 License',
      licenseUrl:
        'https://github.com/Keyamoon/IcoMoon-Free/blob/master/License.txt',
    },
    {
      id: 'bi',
      name: 'BoxIcons',
      projectUrl: 'https://github.com/atisawd/boxicons',
      license: 'CC BY 4.0 License',
      licenseUrl: 'https://github.com/atisawd/boxicons/blob/master/LICENSE',
    },
    {
      id: 'cg',
      name: 'css.gg',
      projectUrl: 'https://github.com/astrit/css.gg',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'vsc',
      name: 'VS Code Icons',
      projectUrl: 'https://github.com/microsoft/vscode-codicons',
      license: 'CC BY 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
    },
    {
      id: 'tb',
      name: 'Tabler Icons',
      projectUrl: 'https://github.com/tabler/tabler-icons',
      license: 'MIT',
      licenseUrl: 'https://opensource.org/licenses/MIT',
    },
    {
      id: 'tfi',
      name: 'Themify Icons',
      projectUrl: 'https://github.com/lykmapipo/themify-icons',
      license: 'MIT',
      licenseUrl:
        'https://github.com/thecreation/standard-icons/blob/master/modules/themify-icons/LICENSE',
    },
    {
      id: 'rx',
      name: 'Radix Icons',
      projectUrl: 'https://icons.radix-ui.com',
      license: 'MIT',
      licenseUrl: 'https://github.com/radix-ui/icons/blob/master/LICENSE',
    },
  ],
  ne = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  Q = E.createContext && E.createContext(ne),
  N =
    (globalThis && globalThis.__assign) ||
    function () {
      return (
        (N =
          Object.assign ||
          function (e) {
            for (var t, n = 1, r = arguments.length; n < r; n++) {
              t = arguments[n];
              for (var o in t)
                Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
            }
            return e;
          }),
        N.apply(this, arguments)
      );
    },
  mt =
    (globalThis && globalThis.__rest) ||
    function (e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          t.indexOf(r) < 0 &&
          (n[r] = e[r]);
      if (e != null && typeof Object.getOwnPropertySymbols == 'function')
        for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
          t.indexOf(r[o]) < 0 &&
            Object.prototype.propertyIsEnumerable.call(e, r[o]) &&
            (n[r[o]] = e[r[o]]);
      return n;
    };
function he(e) {
  return (
    e &&
    e.map(function (t, n) {
      return E.createElement(t.tag, N({ key: n }, t.attr), he(t.child));
    })
  );
}
function ft(e) {
  return function (t) {
    return E.createElement(ve, N({ attr: N({}, e.attr) }, t), he(e.child));
  };
}
function ve(e) {
  var t = function (n) {
    var r = e.attr,
      o = e.size,
      l = e.title,
      i = mt(e, ['attr', 'size', 'title']),
      s = o || n.size || '1em',
      a;
    return (
      n.className && (a = n.className),
      e.className && (a = (a ? a + ' ' : '') + e.className),
      E.createElement(
        'svg',
        N(
          { stroke: 'currentColor', fill: 'currentColor', strokeWidth: '0' },
          n.attr,
          r,
          i,
          {
            className: a,
            style: N(N({ color: e.color || n.color }, n.style), e.style),
            height: s,
            width: s,
            xmlns: 'http://www.w3.org/2000/svg',
          }
        ),
        l && E.createElement('title', null, l),
        e.children
      )
    );
  };
  return Q !== void 0
    ? E.createElement(Q.Consumer, null, function (n) {
        return t(n);
      })
    : t(ne);
}
const pt = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        DefaultContext: ne,
        GenIcon: ft,
        IconBase: ve,
        IconContext: Q,
        IconsManifest: dt,
      },
      Symbol.toStringTag,
      { value: 'Module' }
    )
  ),
  ht = ye(pt);
var vt = ht.GenIcon,
  gt = function (t) {
    return vt({
      tag: 'svg',
      attr: { viewBox: '0 0 512 512' },
      child: [
        {
          tag: 'path',
          attr: {
            fill: 'none',
            strokeLinecap: 'round',
            strokeMiterlimit: '10',
            strokeWidth: '48',
            d: 'M88 152h336M88 256h336M88 360h336',
          },
        },
      ],
    })(t);
  },
  ge = { exports: {} },
  B = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var bt = c,
  yt = Symbol.for('react.element'),
  It = Symbol.for('react.fragment'),
  Et = Object.prototype.hasOwnProperty,
  xt = bt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  wt = { key: !0, ref: !0, __self: !0, __source: !0 };
function be(e, t, n) {
  var r,
    o = {},
    l = null,
    i = null;
  n !== void 0 && (l = '' + n),
    t.key !== void 0 && (l = '' + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) Et.call(t, r) && !wt.hasOwnProperty(r) && (o[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) o[r] === void 0 && (o[r] = t[r]);
  return {
    $$typeof: yt,
    type: e,
    key: l,
    ref: i,
    props: o,
    _owner: xt.current,
  };
}
B.Fragment = It;
B.jsx = be;
B.jsxs = be;
ge.exports = B;
var w = ge.exports;
function St(...e) {
  return e.filter(Boolean).join(' ');
}
function z({ href: e, children: t }) {
  return w.jsx(L.Item, {
    children: ({ active: n }) =>
      w.jsx('a', {
        href: e,
        className: St(
          n ? 'bg-sky-blue text-black' : '',
          'block px-4 py-2 text-lg'
        ),
        children: t,
      }),
  });
}
function Tt() {
  return w.jsxs(L, {
    as: 'div',
    className: 'relative inline-block text-left',
    children: [
      w.jsx('div', {
        className: 'slide-item',
        'data-transition-duration': '0.6s',
        'data-transition-easing': 'ease',
        children: w.jsx(L.Button, {
          className:
            'inline-flex justify-center rounded-md border border-zinc-400 px-2 py-2 text-sm font-medium shadow-sm hover:bg-sky-blue hover:text-black-gray',
          'aria-label': 'menu',
          children: w.jsx(gt, { className: 'h-5 w-5' }),
        }),
      }),
      w.jsx(L.Items, {
        className:
          'absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md border border-zinc-700 bg-accent-gray',
        children: w.jsxs('div', {
          className: 'py-1 text-sm',
          children: [
            w.jsx(z, { href: '/about/index.html', children: 'About' }),
            w.jsx(z, {
              href: 'https://drive.google.com/file/d/1kEYJiNMHdcBPOI0kir2n3yFmbb4DBuYo/view?usp=sharing',
              children: 'Download CV',
            }),
            w.jsx(z, {
              href: 'mailto:vuthuynhi05@gmail.com',
              children: 'Contact',
            }),
          ],
        }),
      }),
    ],
  });
}
export { Tt as default };
