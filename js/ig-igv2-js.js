!(function (e, n, o) {
  var r = /\+/g;
  function t(e) {
    return e;
  }
  function i(e) {
    return decodeURIComponent(e.replace(r, " "));
  }
  var u = (e.cookie = function (o, r, a) {
    if (void 0 !== r) {
      if (
        ((a = e.extend({}, u.defaults, a)),
        null === r && (a.expires = -1),
        "number" == typeof a.expires)
      ) {
        var s = a.expires,
          p = (a.expires = new Date());
        p.setDate(p.getDate() + s);
      }
      return (
        (r = u.json ? JSON.stringify(r) : String(r)),
        (n.cookie = [
          encodeURIComponent(o),
          "=",
          u.raw ? r : encodeURIComponent(r),
          a.expires ? "; expires=" + a.expires.toUTCString() : "",
          a.path ? "; path=" + a.path : "",
          a.domain ? "; domain=" + a.domain : "",
          a.secure ? "; secure" : "",
        ].join(""))
      );
    }
    for (
      var c = u.raw ? t : i, f = n.cookie.split("; "), l = 0, d = f.length;
      l < d;
      l++
    ) {
      var m = f[l].split("=");
      if (c(m.shift()) === o) {
        var v = c(m.join("="));
        return u.json ? JSON.parse(v) : v;
      }
    }
    return null;
  });
  (u.defaults = {}),
    (e.removeCookie = function (n, o) {
      return null !== e.cookie(n) && (e.cookie(n, null, o), !0);
    });
})(jQuery, document);
/*! sprintf-js v1.1.2 | Copyright (c) 2007-present, Alexandru Mărășteanu <hello@alexei.ro> | BSD-3-Clause */
!(function () {
  "use strict";
  var g = {
    not_string: /[^s]/,
    not_bool: /[^t]/,
    not_type: /[^T]/,
    not_primitive: /[^v]/,
    number: /[diefg]/,
    numeric_arg: /[bcdiefguxX]/,
    json: /[j]/,
    not_json: /[^j]/,
    text: /^[^\x25]+/,
    modulo: /^\x25{2}/,
    placeholder:
      /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
    key: /^([a-z_][a-z_\d]*)/i,
    key_access: /^\.([a-z_][a-z_\d]*)/i,
    index_access: /^\[(\d+)\]/,
    sign: /^[+-]/,
  };
  function y(e) {
    return (function (e, t) {
      var r,
        n,
        i,
        s,
        a,
        o,
        p,
        c,
        l,
        u = 1,
        f = e.length,
        d = "";
      for (n = 0; n < f; n++)
        if ("string" == typeof e[n]) d += e[n];
        else if ("object" == typeof e[n]) {
          if ((s = e[n]).keys)
            for (r = t[u], i = 0; i < s.keys.length; i++) {
              if (null == r)
                throw new Error(
                  y(
                    '[sprintf] Cannot access property "%s" of undefined value "%s"',
                    s.keys[i],
                    s.keys[i - 1]
                  )
                );
              r = r[s.keys[i]];
            }
          else r = s.param_no ? t[s.param_no] : t[u++];
          if (
            (g.not_type.test(s.type) &&
              g.not_primitive.test(s.type) &&
              r instanceof Function &&
              (r = r()),
            g.numeric_arg.test(s.type) && "number" != typeof r && isNaN(r))
          )
            throw new TypeError(
              y("[sprintf] expecting number but found %T", r)
            );
          switch ((g.number.test(s.type) && (c = 0 <= r), s.type)) {
            case "b":
              r = parseInt(r, 10).toString(2);
              break;
            case "c":
              r = String.fromCharCode(parseInt(r, 10));
              break;
            case "d":
            case "i":
              r = parseInt(r, 10);
              break;
            case "j":
              r = JSON.stringify(r, null, s.width ? parseInt(s.width) : 0);
              break;
            case "e":
              r = s.precision
                ? parseFloat(r).toExponential(s.precision)
                : parseFloat(r).toExponential();
              break;
            case "f":
              r = s.precision
                ? parseFloat(r).toFixed(s.precision)
                : parseFloat(r);
              break;
            case "g":
              r = s.precision
                ? String(Number(r.toPrecision(s.precision)))
                : parseFloat(r);
              break;
            case "o":
              r = (parseInt(r, 10) >>> 0).toString(8);
              break;
            case "s":
              (r = String(r)),
                (r = s.precision ? r.substring(0, s.precision) : r);
              break;
            case "t":
              (r = String(!!r)),
                (r = s.precision ? r.substring(0, s.precision) : r);
              break;
            case "T":
              (r = Object.prototype.toString
                .call(r)
                .slice(8, -1)
                .toLowerCase()),
                (r = s.precision ? r.substring(0, s.precision) : r);
              break;
            case "u":
              r = parseInt(r, 10) >>> 0;
              break;
            case "v":
              (r = r.valueOf()),
                (r = s.precision ? r.substring(0, s.precision) : r);
              break;
            case "x":
              r = (parseInt(r, 10) >>> 0).toString(16);
              break;
            case "X":
              r = (parseInt(r, 10) >>> 0).toString(16).toUpperCase();
          }
          g.json.test(s.type)
            ? (d += r)
            : (!g.number.test(s.type) || (c && !s.sign)
                ? (l = "")
                : ((l = c ? "+" : "-"), (r = r.toString().replace(g.sign, ""))),
              (o = s.pad_char
                ? "0" === s.pad_char
                  ? "0"
                  : s.pad_char.charAt(1)
                : " "),
              (p = s.width - (l + r).length),
              (a = s.width && 0 < p ? o.repeat(p) : ""),
              (d += s.align ? l + r + a : "0" === o ? l + a + r : a + l + r));
        }
      return d;
    })(
      (function (e) {
        if (p[e]) return p[e];
        var t,
          r = e,
          n = [],
          i = 0;
        for (; r; ) {
          if (null !== (t = g.text.exec(r))) n.push(t[0]);
          else if (null !== (t = g.modulo.exec(r))) n.push("%");
          else {
            if (null === (t = g.placeholder.exec(r)))
              throw new SyntaxError("[sprintf] unexpected placeholder");
            if (t[2]) {
              i |= 1;
              var s = [],
                a = t[2],
                o = [];
              if (null === (o = g.key.exec(a)))
                throw new SyntaxError(
                  "[sprintf] failed to parse named argument key"
                );
              for (s.push(o[1]); "" !== (a = a.substring(o[0].length)); )
                if (null !== (o = g.key_access.exec(a))) s.push(o[1]);
                else {
                  if (null === (o = g.index_access.exec(a)))
                    throw new SyntaxError(
                      "[sprintf] failed to parse named argument key"
                    );
                  s.push(o[1]);
                }
              t[2] = s;
            } else i |= 2;
            if (3 === i)
              throw new Error(
                "[sprintf] mixing positional and named placeholders is not (yet) supported"
              );
            n.push({
              placeholder: t[0],
              param_no: t[1],
              keys: t[2],
              sign: t[3],
              pad_char: t[4],
              align: t[5],
              width: t[6],
              precision: t[7],
              type: t[8],
            });
          }
          r = r.substring(t[0].length);
        }
        return (p[e] = n);
      })(e),
      arguments
    );
  }
  function e(e, t) {
    return y.apply(null, [e].concat(t || []));
  }
  var p = Object.create(null);
  "undefined" != typeof exports &&
    ((exports.sprintf = y), (exports.vsprintf = e)),
    "undefined" != typeof window &&
      ((window.sprintf = y),
      (window.vsprintf = e),
      "function" == typeof define &&
        define.amd &&
        define(function () {
          return { sprintf: y, vsprintf: e };
        }));
})();
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define(t)
    : (e.moment = t());
})(this, function () {
  "use strict";
  var H;
  function f() {
    return H.apply(null, arguments);
  }
  function a(e) {
    return (
      e instanceof Array ||
      "[object Array]" === Object.prototype.toString.call(e)
    );
  }
  function F(e) {
    return null != e && "[object Object]" === Object.prototype.toString.call(e);
  }
  function c(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function L(e) {
    if (Object.getOwnPropertyNames)
      return 0 === Object.getOwnPropertyNames(e).length;
    for (var t in e) if (c(e, t)) return;
    return 1;
  }
  function o(e) {
    return void 0 === e;
  }
  function u(e) {
    return (
      "number" == typeof e ||
      "[object Number]" === Object.prototype.toString.call(e)
    );
  }
  function V(e) {
    return (
      e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    );
  }
  function G(e, t) {
    for (var n = [], s = e.length, i = 0; i < s; ++i) n.push(t(e[i], i));
    return n;
  }
  function E(e, t) {
    for (var n in t) c(t, n) && (e[n] = t[n]);
    return (
      c(t, "toString") && (e.toString = t.toString),
      c(t, "valueOf") && (e.valueOf = t.valueOf),
      e
    );
  }
  function l(e, t, n, s) {
    return Pt(e, t, n, s, !0).utc();
  }
  function m(e) {
    return (
      null == e._pf &&
        (e._pf = {
          empty: !1,
          unusedTokens: [],
          unusedInput: [],
          overflow: -2,
          charsLeftOver: 0,
          nullInput: !1,
          invalidEra: null,
          invalidMonth: null,
          invalidFormat: !1,
          userInvalidated: !1,
          iso: !1,
          parsedDateParts: [],
          era: null,
          meridiem: null,
          rfc2822: !1,
          weekdayMismatch: !1,
        }),
      e._pf
    );
  }
  function A(e) {
    if (null == e._isValid) {
      var t = m(e),
        n = j.call(t.parsedDateParts, function (e) {
          return null != e;
        }),
        n =
          !isNaN(e._d.getTime()) &&
          t.overflow < 0 &&
          !t.empty &&
          !t.invalidEra &&
          !t.invalidMonth &&
          !t.invalidWeekday &&
          !t.weekdayMismatch &&
          !t.nullInput &&
          !t.invalidFormat &&
          !t.userInvalidated &&
          (!t.meridiem || (t.meridiem && n));
      if (
        (e._strict &&
          (n =
            n &&
            0 === t.charsLeftOver &&
            0 === t.unusedTokens.length &&
            void 0 === t.bigHour),
        null != Object.isFrozen && Object.isFrozen(e))
      )
        return n;
      e._isValid = n;
    }
    return e._isValid;
  }
  function I(e) {
    var t = l(NaN);
    return null != e ? E(m(t), e) : (m(t).userInvalidated = !0), t;
  }
  var j =
      Array.prototype.some ||
      function (e) {
        for (var t = Object(this), n = t.length >>> 0, s = 0; s < n; s++)
          if (s in t && e.call(this, t[s], s, t)) return !0;
        return !1;
      },
    Z = (f.momentProperties = []),
    z = !1;
  function $(e, t) {
    var n,
      s,
      i,
      r = Z.length;
    if (
      (o(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject),
      o(t._i) || (e._i = t._i),
      o(t._f) || (e._f = t._f),
      o(t._l) || (e._l = t._l),
      o(t._strict) || (e._strict = t._strict),
      o(t._tzm) || (e._tzm = t._tzm),
      o(t._isUTC) || (e._isUTC = t._isUTC),
      o(t._offset) || (e._offset = t._offset),
      o(t._pf) || (e._pf = m(t)),
      o(t._locale) || (e._locale = t._locale),
      0 < r)
    )
      for (n = 0; n < r; n++) o((i = t[(s = Z[n])])) || (e[s] = i);
    return e;
  }
  function q(e) {
    $(this, e),
      (this._d = new Date(null != e._d ? e._d.getTime() : NaN)),
      this.isValid() || (this._d = new Date(NaN)),
      !1 === z && ((z = !0), f.updateOffset(this), (z = !1));
  }
  function h(e) {
    return e instanceof q || (null != e && null != e._isAMomentObject);
  }
  function B(e) {
    !1 === f.suppressDeprecationWarnings &&
      "undefined" != typeof console &&
      console.warn &&
      console.warn("Deprecation warning: " + e);
  }
  function e(r, a) {
    var o = !0;
    return E(function () {
      if ((null != f.deprecationHandler && f.deprecationHandler(null, r), o)) {
        for (var e, t, n = [], s = arguments.length, i = 0; i < s; i++) {
          if (((e = ""), "object" == typeof arguments[i])) {
            for (t in ((e += "\n[" + i + "] "), arguments[0]))
              c(arguments[0], t) && (e += t + ": " + arguments[0][t] + ", ");
            e = e.slice(0, -2);
          } else e = arguments[i];
          n.push(e);
        }
        B(
          r +
            "\nArguments: " +
            Array.prototype.slice.call(n).join("") +
            "\n" +
            new Error().stack
        ),
          (o = !1);
      }
      return a.apply(this, arguments);
    }, a);
  }
  var J = {};
  function Q(e, t) {
    null != f.deprecationHandler && f.deprecationHandler(e, t),
      J[e] || (B(t), (J[e] = !0));
  }
  function d(e) {
    return (
      ("undefined" != typeof Function && e instanceof Function) ||
      "[object Function]" === Object.prototype.toString.call(e)
    );
  }
  function X(e, t) {
    var n,
      s = E({}, e);
    for (n in t)
      c(t, n) &&
        (F(e[n]) && F(t[n])
          ? ((s[n] = {}), E(s[n], e[n]), E(s[n], t[n]))
          : null != t[n]
          ? (s[n] = t[n])
          : delete s[n]);
    for (n in e) c(e, n) && !c(t, n) && F(e[n]) && (s[n] = E({}, s[n]));
    return s;
  }
  function K(e) {
    null != e && this.set(e);
  }
  (f.suppressDeprecationWarnings = !1), (f.deprecationHandler = null);
  var ee =
    Object.keys ||
    function (e) {
      var t,
        n = [];
      for (t in e) c(e, t) && n.push(t);
      return n;
    };
  function r(e, t, n) {
    var s = "" + Math.abs(e);
    return (
      (0 <= e ? (n ? "+" : "") : "-") +
      Math.pow(10, Math.max(0, t - s.length))
        .toString()
        .substr(1) +
      s
    );
  }
  var te =
      /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
    ne = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
    se = {},
    ie = {};
  function s(e, t, n, s) {
    var i =
      "string" == typeof s
        ? function () {
            return this[s]();
          }
        : s;
    e && (ie[e] = i),
      t &&
        (ie[t[0]] = function () {
          return r(i.apply(this, arguments), t[1], t[2]);
        }),
      n &&
        (ie[n] = function () {
          return this.localeData().ordinal(i.apply(this, arguments), e);
        });
  }
  function re(e, t) {
    return e.isValid()
      ? ((t = ae(t, e.localeData())),
        (se[t] =
          se[t] ||
          (function (s) {
            for (var e, i = s.match(te), t = 0, r = i.length; t < r; t++)
              ie[i[t]]
                ? (i[t] = ie[i[t]])
                : (i[t] = (e = i[t]).match(/\[[\s\S]/)
                    ? e.replace(/^\[|\]$/g, "")
                    : e.replace(/\\/g, ""));
            return function (e) {
              for (var t = "", n = 0; n < r; n++)
                t += d(i[n]) ? i[n].call(e, s) : i[n];
              return t;
            };
          })(t)),
        se[t](e))
      : e.localeData().invalidDate();
  }
  function ae(e, t) {
    var n = 5;
    function s(e) {
      return t.longDateFormat(e) || e;
    }
    for (ne.lastIndex = 0; 0 <= n && ne.test(e); )
      (e = e.replace(ne, s)), (ne.lastIndex = 0), --n;
    return e;
  }
  var oe = {};
  function t(e, t) {
    var n = e.toLowerCase();
    oe[n] = oe[n + "s"] = oe[t] = e;
  }
  function _(e) {
    return "string" == typeof e ? oe[e] || oe[e.toLowerCase()] : void 0;
  }
  function ue(e) {
    var t,
      n,
      s = {};
    for (n in e) c(e, n) && (t = _(n)) && (s[t] = e[n]);
    return s;
  }
  var le = {};
  function n(e, t) {
    le[e] = t;
  }
  function he(e) {
    return (e % 4 == 0 && e % 100 != 0) || e % 400 == 0;
  }
  function y(e) {
    return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
  }
  function g(e) {
    var e = +e,
      t = 0;
    return (t = 0 != e && isFinite(e) ? y(e) : t);
  }
  function de(t, n) {
    return function (e) {
      return null != e
        ? (fe(this, t, e), f.updateOffset(this, n), this)
        : ce(this, t);
    };
  }
  function ce(e, t) {
    return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN;
  }
  function fe(e, t, n) {
    e.isValid() &&
      !isNaN(n) &&
      ("FullYear" === t && he(e.year()) && 1 === e.month() && 29 === e.date()
        ? ((n = g(n)),
          e._d["set" + (e._isUTC ? "UTC" : "") + t](
            n,
            e.month(),
            We(n, e.month())
          ))
        : e._d["set" + (e._isUTC ? "UTC" : "") + t](n));
  }
  var i = /\d/,
    w = /\d\d/,
    me = /\d{3}/,
    _e = /\d{4}/,
    ye = /[+-]?\d{6}/,
    p = /\d\d?/,
    ge = /\d\d\d\d?/,
    we = /\d\d\d\d\d\d?/,
    pe = /\d{1,3}/,
    ke = /\d{1,4}/,
    ve = /[+-]?\d{1,6}/,
    Me = /\d+/,
    De = /[+-]?\d+/,
    Se = /Z|[+-]\d\d:?\d\d/gi,
    Ye = /Z|[+-]\d\d(?::?\d\d)?/gi,
    k =
      /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;
  function v(e, n, s) {
    be[e] = d(n)
      ? n
      : function (e, t) {
          return e && s ? s : n;
        };
  }
  function Oe(e, t) {
    return c(be, e)
      ? be[e](t._strict, t._locale)
      : new RegExp(
          M(
            e
              .replace("\\", "")
              .replace(
                /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                function (e, t, n, s, i) {
                  return t || n || s || i;
                }
              )
          )
        );
  }
  function M(e) {
    return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  }
  var be = {},
    xe = {};
  function D(e, n) {
    var t,
      s,
      i = n;
    for (
      "string" == typeof e && (e = [e]),
        u(n) &&
          (i = function (e, t) {
            t[n] = g(e);
          }),
        s = e.length,
        t = 0;
      t < s;
      t++
    )
      xe[e[t]] = i;
  }
  function Te(e, i) {
    D(e, function (e, t, n, s) {
      (n._w = n._w || {}), i(e, n._w, n, s);
    });
  }
  var S,
    Y = 0,
    O = 1,
    b = 2,
    x = 3,
    T = 4,
    N = 5,
    Ne = 6,
    Pe = 7,
    Re = 8;
  function We(e, t) {
    if (isNaN(e) || isNaN(t)) return NaN;
    var n = ((t % (n = 12)) + n) % n;
    return (e += (t - n) / 12), 1 == n ? (he(e) ? 29 : 28) : 31 - ((n % 7) % 2);
  }
  (S =
    Array.prototype.indexOf ||
    function (e) {
      for (var t = 0; t < this.length; ++t) if (this[t] === e) return t;
      return -1;
    }),
    s("M", ["MM", 2], "Mo", function () {
      return this.month() + 1;
    }),
    s("MMM", 0, 0, function (e) {
      return this.localeData().monthsShort(this, e);
    }),
    s("MMMM", 0, 0, function (e) {
      return this.localeData().months(this, e);
    }),
    t("month", "M"),
    n("month", 8),
    v("M", p),
    v("MM", p, w),
    v("MMM", function (e, t) {
      return t.monthsShortRegex(e);
    }),
    v("MMMM", function (e, t) {
      return t.monthsRegex(e);
    }),
    D(["M", "MM"], function (e, t) {
      t[O] = g(e) - 1;
    }),
    D(["MMM", "MMMM"], function (e, t, n, s) {
      s = n._locale.monthsParse(e, s, n._strict);
      null != s ? (t[O] = s) : (m(n).invalidMonth = e);
    });
  var Ce =
      "January_February_March_April_May_June_July_August_September_October_November_December".split(
        "_"
      ),
    Ue = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    He = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
    Fe = k,
    Le = k;
  function Ve(e, t) {
    var n;
    if (e.isValid()) {
      if ("string" == typeof t)
        if (/^\d+$/.test(t)) t = g(t);
        else if (!u((t = e.localeData().monthsParse(t)))) return;
      (n = Math.min(e.date(), We(e.year(), t))),
        e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, n);
    }
  }
  function Ge(e) {
    return null != e
      ? (Ve(this, e), f.updateOffset(this, !0), this)
      : ce(this, "Month");
  }
  function Ee() {
    function e(e, t) {
      return t.length - e.length;
    }
    for (var t, n = [], s = [], i = [], r = 0; r < 12; r++)
      (t = l([2e3, r])),
        n.push(this.monthsShort(t, "")),
        s.push(this.months(t, "")),
        i.push(this.months(t, "")),
        i.push(this.monthsShort(t, ""));
    for (n.sort(e), s.sort(e), i.sort(e), r = 0; r < 12; r++)
      (n[r] = M(n[r])), (s[r] = M(s[r]));
    for (r = 0; r < 24; r++) i[r] = M(i[r]);
    (this._monthsRegex = new RegExp("^(" + i.join("|") + ")", "i")),
      (this._monthsShortRegex = this._monthsRegex),
      (this._monthsStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")),
      (this._monthsShortStrictRegex = new RegExp(
        "^(" + n.join("|") + ")",
        "i"
      ));
  }
  function Ae(e) {
    return he(e) ? 366 : 365;
  }
  s("Y", 0, 0, function () {
    var e = this.year();
    return e <= 9999 ? r(e, 4) : "+" + e;
  }),
    s(0, ["YY", 2], 0, function () {
      return this.year() % 100;
    }),
    s(0, ["YYYY", 4], 0, "year"),
    s(0, ["YYYYY", 5], 0, "year"),
    s(0, ["YYYYYY", 6, !0], 0, "year"),
    t("year", "y"),
    n("year", 1),
    v("Y", De),
    v("YY", p, w),
    v("YYYY", ke, _e),
    v("YYYYY", ve, ye),
    v("YYYYYY", ve, ye),
    D(["YYYYY", "YYYYYY"], Y),
    D("YYYY", function (e, t) {
      t[Y] = 2 === e.length ? f.parseTwoDigitYear(e) : g(e);
    }),
    D("YY", function (e, t) {
      t[Y] = f.parseTwoDigitYear(e);
    }),
    D("Y", function (e, t) {
      t[Y] = parseInt(e, 10);
    }),
    (f.parseTwoDigitYear = function (e) {
      return g(e) + (68 < g(e) ? 1900 : 2e3);
    });
  var Ie = de("FullYear", !0);
  function je(e, t, n, s, i, r, a) {
    var o;
    return (
      e < 100 && 0 <= e
        ? ((o = new Date(e + 400, t, n, s, i, r, a)),
          isFinite(o.getFullYear()) && o.setFullYear(e))
        : (o = new Date(e, t, n, s, i, r, a)),
      o
    );
  }
  function Ze(e) {
    var t;
    return (
      e < 100 && 0 <= e
        ? (((t = Array.prototype.slice.call(arguments))[0] = e + 400),
          (t = new Date(Date.UTC.apply(null, t))),
          isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e))
        : (t = new Date(Date.UTC.apply(null, arguments))),
      t
    );
  }
  function ze(e, t, n) {
    n = 7 + t - n;
    return n - ((7 + Ze(e, 0, n).getUTCDay() - t) % 7) - 1;
  }
  function $e(e, t, n, s, i) {
    var r,
      t = 1 + 7 * (t - 1) + ((7 + n - s) % 7) + ze(e, s, i),
      n =
        t <= 0
          ? Ae((r = e - 1)) + t
          : t > Ae(e)
          ? ((r = e + 1), t - Ae(e))
          : ((r = e), t);
    return { year: r, dayOfYear: n };
  }
  function qe(e, t, n) {
    var s,
      i,
      r = ze(e.year(), t, n),
      r = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
    return (
      r < 1
        ? (s = r + P((i = e.year() - 1), t, n))
        : r > P(e.year(), t, n)
        ? ((s = r - P(e.year(), t, n)), (i = e.year() + 1))
        : ((i = e.year()), (s = r)),
      { week: s, year: i }
    );
  }
  function P(e, t, n) {
    var s = ze(e, t, n),
      t = ze(e + 1, t, n);
    return (Ae(e) - s + t) / 7;
  }
  s("w", ["ww", 2], "wo", "week"),
    s("W", ["WW", 2], "Wo", "isoWeek"),
    t("week", "w"),
    t("isoWeek", "W"),
    n("week", 5),
    n("isoWeek", 5),
    v("w", p),
    v("ww", p, w),
    v("W", p),
    v("WW", p, w),
    Te(["w", "ww", "W", "WW"], function (e, t, n, s) {
      t[s.substr(0, 1)] = g(e);
    });
  function Be(e, t) {
    return e.slice(t, 7).concat(e.slice(0, t));
  }
  s("d", 0, "do", "day"),
    s("dd", 0, 0, function (e) {
      return this.localeData().weekdaysMin(this, e);
    }),
    s("ddd", 0, 0, function (e) {
      return this.localeData().weekdaysShort(this, e);
    }),
    s("dddd", 0, 0, function (e) {
      return this.localeData().weekdays(this, e);
    }),
    s("e", 0, 0, "weekday"),
    s("E", 0, 0, "isoWeekday"),
    t("day", "d"),
    t("weekday", "e"),
    t("isoWeekday", "E"),
    n("day", 11),
    n("weekday", 11),
    n("isoWeekday", 11),
    v("d", p),
    v("e", p),
    v("E", p),
    v("dd", function (e, t) {
      return t.weekdaysMinRegex(e);
    }),
    v("ddd", function (e, t) {
      return t.weekdaysShortRegex(e);
    }),
    v("dddd", function (e, t) {
      return t.weekdaysRegex(e);
    }),
    Te(["dd", "ddd", "dddd"], function (e, t, n, s) {
      s = n._locale.weekdaysParse(e, s, n._strict);
      null != s ? (t.d = s) : (m(n).invalidWeekday = e);
    }),
    Te(["d", "e", "E"], function (e, t, n, s) {
      t[s] = g(e);
    });
  var Je = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
      "_"
    ),
    Qe = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    Xe = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
    Ke = k,
    et = k,
    tt = k;
  function nt() {
    function e(e, t) {
      return t.length - e.length;
    }
    for (var t, n, s, i = [], r = [], a = [], o = [], u = 0; u < 7; u++)
      (s = l([2e3, 1]).day(u)),
        (t = M(this.weekdaysMin(s, ""))),
        (n = M(this.weekdaysShort(s, ""))),
        (s = M(this.weekdays(s, ""))),
        i.push(t),
        r.push(n),
        a.push(s),
        o.push(t),
        o.push(n),
        o.push(s);
    i.sort(e),
      r.sort(e),
      a.sort(e),
      o.sort(e),
      (this._weekdaysRegex = new RegExp("^(" + o.join("|") + ")", "i")),
      (this._weekdaysShortRegex = this._weekdaysRegex),
      (this._weekdaysMinRegex = this._weekdaysRegex),
      (this._weekdaysStrictRegex = new RegExp("^(" + a.join("|") + ")", "i")),
      (this._weekdaysShortStrictRegex = new RegExp(
        "^(" + r.join("|") + ")",
        "i"
      )),
      (this._weekdaysMinStrictRegex = new RegExp(
        "^(" + i.join("|") + ")",
        "i"
      ));
  }
  function st() {
    return this.hours() % 12 || 12;
  }
  function it(e, t) {
    s(e, 0, 0, function () {
      return this.localeData().meridiem(this.hours(), this.minutes(), t);
    });
  }
  function rt(e, t) {
    return t._meridiemParse;
  }
  s("H", ["HH", 2], 0, "hour"),
    s("h", ["hh", 2], 0, st),
    s("k", ["kk", 2], 0, function () {
      return this.hours() || 24;
    }),
    s("hmm", 0, 0, function () {
      return "" + st.apply(this) + r(this.minutes(), 2);
    }),
    s("hmmss", 0, 0, function () {
      return "" + st.apply(this) + r(this.minutes(), 2) + r(this.seconds(), 2);
    }),
    s("Hmm", 0, 0, function () {
      return "" + this.hours() + r(this.minutes(), 2);
    }),
    s("Hmmss", 0, 0, function () {
      return "" + this.hours() + r(this.minutes(), 2) + r(this.seconds(), 2);
    }),
    it("a", !0),
    it("A", !1),
    t("hour", "h"),
    n("hour", 13),
    v("a", rt),
    v("A", rt),
    v("H", p),
    v("h", p),
    v("k", p),
    v("HH", p, w),
    v("hh", p, w),
    v("kk", p, w),
    v("hmm", ge),
    v("hmmss", we),
    v("Hmm", ge),
    v("Hmmss", we),
    D(["H", "HH"], x),
    D(["k", "kk"], function (e, t, n) {
      e = g(e);
      t[x] = 24 === e ? 0 : e;
    }),
    D(["a", "A"], function (e, t, n) {
      (n._isPm = n._locale.isPM(e)), (n._meridiem = e);
    }),
    D(["h", "hh"], function (e, t, n) {
      (t[x] = g(e)), (m(n).bigHour = !0);
    }),
    D("hmm", function (e, t, n) {
      var s = e.length - 2;
      (t[x] = g(e.substr(0, s))), (t[T] = g(e.substr(s))), (m(n).bigHour = !0);
    }),
    D("hmmss", function (e, t, n) {
      var s = e.length - 4,
        i = e.length - 2;
      (t[x] = g(e.substr(0, s))),
        (t[T] = g(e.substr(s, 2))),
        (t[N] = g(e.substr(i))),
        (m(n).bigHour = !0);
    }),
    D("Hmm", function (e, t, n) {
      var s = e.length - 2;
      (t[x] = g(e.substr(0, s))), (t[T] = g(e.substr(s)));
    }),
    D("Hmmss", function (e, t, n) {
      var s = e.length - 4,
        i = e.length - 2;
      (t[x] = g(e.substr(0, s))),
        (t[T] = g(e.substr(s, 2))),
        (t[N] = g(e.substr(i)));
    });
  k = de("Hours", !0);
  var at,
    ot = {
      calendar: {
        sameDay: "[Today at] LT",
        nextDay: "[Tomorrow at] LT",
        nextWeek: "dddd [at] LT",
        lastDay: "[Yesterday at] LT",
        lastWeek: "[Last] dddd [at] LT",
        sameElse: "L",
      },
      longDateFormat: {
        LTS: "h:mm:ss A",
        LT: "h:mm A",
        L: "MM/DD/YYYY",
        LL: "MMMM D, YYYY",
        LLL: "MMMM D, YYYY h:mm A",
        LLLL: "dddd, MMMM D, YYYY h:mm A",
      },
      invalidDate: "Invalid date",
      ordinal: "%d",
      dayOfMonthOrdinalParse: /\d{1,2}/,
      relativeTime: {
        future: "in %s",
        past: "%s ago",
        s: "a few seconds",
        ss: "%d seconds",
        m: "a minute",
        mm: "%d minutes",
        h: "an hour",
        hh: "%d hours",
        d: "a day",
        dd: "%d days",
        w: "a week",
        ww: "%d weeks",
        M: "a month",
        MM: "%d months",
        y: "a year",
        yy: "%d years",
      },
      months: Ce,
      monthsShort: Ue,
      week: { dow: 0, doy: 6 },
      weekdays: Je,
      weekdaysMin: Xe,
      weekdaysShort: Qe,
      meridiemParse: /[ap]\.?m?\.?/i,
    },
    R = {},
    ut = {};
  function lt(e) {
    return e && e.toLowerCase().replace("_", "-");
  }
  function ht(e) {
    for (var t, n, s, i, r = 0; r < e.length; ) {
      for (
        t = (i = lt(e[r]).split("-")).length,
          n = (n = lt(e[r + 1])) ? n.split("-") : null;
        0 < t;

      ) {
        if ((s = dt(i.slice(0, t).join("-")))) return s;
        if (
          n &&
          n.length >= t &&
          (function (e, t) {
            for (var n = Math.min(e.length, t.length), s = 0; s < n; s += 1)
              if (e[s] !== t[s]) return s;
            return n;
          })(i, n) >=
            t - 1
        )
          break;
        t--;
      }
      r++;
    }
    return at;
  }
  function dt(t) {
    var e;
    if (
      void 0 === R[t] &&
      "undefined" != typeof module &&
      module &&
      module.exports &&
      null != t.match("^[^/\\\\]*$")
    )
      try {
        (e = at._abbr), require("./locale/" + t), ct(e);
      } catch (e) {
        R[t] = null;
      }
    return R[t];
  }
  function ct(e, t) {
    return (
      e &&
        ((t = o(t) ? mt(e) : ft(e, t))
          ? (at = t)
          : "undefined" != typeof console &&
            console.warn &&
            console.warn(
              "Locale " + e + " not found. Did you forget to load it?"
            )),
      at._abbr
    );
  }
  function ft(e, t) {
    if (null === t) return delete R[e], null;
    var n,
      s = ot;
    if (((t.abbr = e), null != R[e]))
      Q(
        "defineLocaleOverride",
        "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
      ),
        (s = R[e]._config);
    else if (null != t.parentLocale)
      if (null != R[t.parentLocale]) s = R[t.parentLocale]._config;
      else {
        if (null == (n = dt(t.parentLocale)))
          return (
            ut[t.parentLocale] || (ut[t.parentLocale] = []),
            ut[t.parentLocale].push({ name: e, config: t }),
            null
          );
        s = n._config;
      }
    return (
      (R[e] = new K(X(s, t))),
      ut[e] &&
        ut[e].forEach(function (e) {
          ft(e.name, e.config);
        }),
      ct(e),
      R[e]
    );
  }
  function mt(e) {
    var t;
    if (!(e = e && e._locale && e._locale._abbr ? e._locale._abbr : e))
      return at;
    if (!a(e)) {
      if ((t = dt(e))) return t;
      e = [e];
    }
    return ht(e);
  }
  function _t(e) {
    var t = e._a;
    return (
      t &&
        -2 === m(e).overflow &&
        ((t =
          t[O] < 0 || 11 < t[O]
            ? O
            : t[b] < 1 || t[b] > We(t[Y], t[O])
            ? b
            : t[x] < 0 ||
              24 < t[x] ||
              (24 === t[x] && (0 !== t[T] || 0 !== t[N] || 0 !== t[Ne]))
            ? x
            : t[T] < 0 || 59 < t[T]
            ? T
            : t[N] < 0 || 59 < t[N]
            ? N
            : t[Ne] < 0 || 999 < t[Ne]
            ? Ne
            : -1),
        m(e)._overflowDayOfYear && (t < Y || b < t) && (t = b),
        m(e)._overflowWeeks && -1 === t && (t = Pe),
        m(e)._overflowWeekday && -1 === t && (t = Re),
        (m(e).overflow = t)),
      e
    );
  }
  var yt =
      /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    gt =
      /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
    wt = /Z|[+-]\d\d(?::?\d\d)?/,
    pt = [
      ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
      ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
      ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
      ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
      ["YYYY-DDD", /\d{4}-\d{3}/],
      ["YYYY-MM", /\d{4}-\d\d/, !1],
      ["YYYYYYMMDD", /[+-]\d{10}/],
      ["YYYYMMDD", /\d{8}/],
      ["GGGG[W]WWE", /\d{4}W\d{3}/],
      ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
      ["YYYYDDD", /\d{7}/],
      ["YYYYMM", /\d{6}/, !1],
      ["YYYY", /\d{4}/, !1],
    ],
    kt = [
      ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
      ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
      ["HH:mm:ss", /\d\d:\d\d:\d\d/],
      ["HH:mm", /\d\d:\d\d/],
      ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
      ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
      ["HHmmss", /\d\d\d\d\d\d/],
      ["HHmm", /\d\d\d\d/],
      ["HH", /\d\d/],
    ],
    vt = /^\/?Date\((-?\d+)/i,
    Mt =
      /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
    Dt = {
      UT: 0,
      GMT: 0,
      EDT: -240,
      EST: -300,
      CDT: -300,
      CST: -360,
      MDT: -360,
      MST: -420,
      PDT: -420,
      PST: -480,
    };
  function St(e) {
    var t,
      n,
      s,
      i,
      r,
      a,
      o = e._i,
      u = yt.exec(o) || gt.exec(o),
      o = pt.length,
      l = kt.length;
    if (u) {
      for (m(e).iso = !0, t = 0, n = o; t < n; t++)
        if (pt[t][1].exec(u[1])) {
          (i = pt[t][0]), (s = !1 !== pt[t][2]);
          break;
        }
      if (null == i) e._isValid = !1;
      else {
        if (u[3]) {
          for (t = 0, n = l; t < n; t++)
            if (kt[t][1].exec(u[3])) {
              r = (u[2] || " ") + kt[t][0];
              break;
            }
          if (null == r) return void (e._isValid = !1);
        }
        if (s || null == r) {
          if (u[4]) {
            if (!wt.exec(u[4])) return void (e._isValid = !1);
            a = "Z";
          }
          (e._f = i + (r || "") + (a || "")), Tt(e);
        } else e._isValid = !1;
      }
    } else e._isValid = !1;
  }
  function Yt(e, t, n, s, i, r) {
    e = [
      (function (e) {
        e = parseInt(e, 10);
        {
          if (e <= 49) return 2e3 + e;
          if (e <= 999) return 1900 + e;
        }
        return e;
      })(e),
      Ue.indexOf(t),
      parseInt(n, 10),
      parseInt(s, 10),
      parseInt(i, 10),
    ];
    return r && e.push(parseInt(r, 10)), e;
  }
  function Ot(e) {
    var t,
      n,
      s,
      i,
      r = Mt.exec(
        e._i
          .replace(/\([^()]*\)|[\n\t]/g, " ")
          .replace(/(\s\s+)/g, " ")
          .replace(/^\s\s*/, "")
          .replace(/\s\s*$/, "")
      );
    r
      ? ((t = Yt(r[4], r[3], r[2], r[5], r[6], r[7])),
        (n = r[1]),
        (s = t),
        (i = e),
        n && Qe.indexOf(n) !== new Date(s[0], s[1], s[2]).getDay()
          ? ((m(i).weekdayMismatch = !0), (i._isValid = !1))
          : ((e._a = t),
            (e._tzm =
              ((n = r[8]),
              (s = r[9]),
              (i = r[10]),
              n
                ? Dt[n]
                : s
                ? 0
                : 60 * (((n = parseInt(i, 10)) - (s = n % 100)) / 100) + s)),
            (e._d = Ze.apply(null, e._a)),
            e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
            (m(e).rfc2822 = !0)))
      : (e._isValid = !1);
  }
  function bt(e, t, n) {
    return null != e ? e : null != t ? t : n;
  }
  function xt(e) {
    var t,
      n,
      s,
      i,
      r,
      a,
      o,
      u,
      l,
      h,
      d,
      c = [];
    if (!e._d) {
      for (
        s = e,
          i = new Date(f.now()),
          n = s._useUTC
            ? [i.getUTCFullYear(), i.getUTCMonth(), i.getUTCDate()]
            : [i.getFullYear(), i.getMonth(), i.getDate()],
          e._w &&
            null == e._a[b] &&
            null == e._a[O] &&
            (null != (i = (s = e)._w).GG || null != i.W || null != i.E
              ? ((u = 1),
                (l = 4),
                (r = bt(i.GG, s._a[Y], qe(W(), 1, 4).year)),
                (a = bt(i.W, 1)),
                ((o = bt(i.E, 1)) < 1 || 7 < o) && (h = !0))
              : ((u = s._locale._week.dow),
                (l = s._locale._week.doy),
                (d = qe(W(), u, l)),
                (r = bt(i.gg, s._a[Y], d.year)),
                (a = bt(i.w, d.week)),
                null != i.d
                  ? ((o = i.d) < 0 || 6 < o) && (h = !0)
                  : null != i.e
                  ? ((o = i.e + u), (i.e < 0 || 6 < i.e) && (h = !0))
                  : (o = u)),
            a < 1 || a > P(r, u, l)
              ? (m(s)._overflowWeeks = !0)
              : null != h
              ? (m(s)._overflowWeekday = !0)
              : ((d = $e(r, a, o, u, l)),
                (s._a[Y] = d.year),
                (s._dayOfYear = d.dayOfYear))),
          null != e._dayOfYear &&
            ((i = bt(e._a[Y], n[Y])),
            (e._dayOfYear > Ae(i) || 0 === e._dayOfYear) &&
              (m(e)._overflowDayOfYear = !0),
            (h = Ze(i, 0, e._dayOfYear)),
            (e._a[O] = h.getUTCMonth()),
            (e._a[b] = h.getUTCDate())),
          t = 0;
        t < 3 && null == e._a[t];
        ++t
      )
        e._a[t] = c[t] = n[t];
      for (; t < 7; t++)
        e._a[t] = c[t] = null == e._a[t] ? (2 === t ? 1 : 0) : e._a[t];
      24 === e._a[x] &&
        0 === e._a[T] &&
        0 === e._a[N] &&
        0 === e._a[Ne] &&
        ((e._nextDay = !0), (e._a[x] = 0)),
        (e._d = (e._useUTC ? Ze : je).apply(null, c)),
        (r = e._useUTC ? e._d.getUTCDay() : e._d.getDay()),
        null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm),
        e._nextDay && (e._a[x] = 24),
        e._w &&
          void 0 !== e._w.d &&
          e._w.d !== r &&
          (m(e).weekdayMismatch = !0);
    }
  }
  function Tt(e) {
    if (e._f === f.ISO_8601) St(e);
    else if (e._f === f.RFC_2822) Ot(e);
    else {
      (e._a = []), (m(e).empty = !0);
      for (
        var t,
          n,
          s,
          i,
          r,
          a = "" + e._i,
          o = a.length,
          u = 0,
          l = ae(e._f, e._locale).match(te) || [],
          h = l.length,
          d = 0;
        d < h;
        d++
      )
        (n = l[d]),
          (t = (a.match(Oe(n, e)) || [])[0]) &&
            (0 < (s = a.substr(0, a.indexOf(t))).length &&
              m(e).unusedInput.push(s),
            (a = a.slice(a.indexOf(t) + t.length)),
            (u += t.length)),
          ie[n]
            ? (t ? (m(e).empty = !1) : m(e).unusedTokens.push(n),
              (s = n),
              (r = e),
              null != (i = t) && c(xe, s) && xe[s](i, r._a, r, s))
            : e._strict && !t && m(e).unusedTokens.push(n);
      (m(e).charsLeftOver = o - u),
        0 < a.length && m(e).unusedInput.push(a),
        e._a[x] <= 12 &&
          !0 === m(e).bigHour &&
          0 < e._a[x] &&
          (m(e).bigHour = void 0),
        (m(e).parsedDateParts = e._a.slice(0)),
        (m(e).meridiem = e._meridiem),
        (e._a[x] = (function (e, t, n) {
          if (null == n) return t;
          return null != e.meridiemHour
            ? e.meridiemHour(t, n)
            : null != e.isPM
            ? ((e = e.isPM(n)) && t < 12 && (t += 12),
              (t = e || 12 !== t ? t : 0))
            : t;
        })(e._locale, e._a[x], e._meridiem)),
        null !== (o = m(e).era) &&
          (e._a[Y] = e._locale.erasConvertYear(o, e._a[Y])),
        xt(e),
        _t(e);
    }
  }
  function Nt(e) {
    var t,
      n,
      s,
      i = e._i,
      r = e._f;
    if (
      ((e._locale = e._locale || mt(e._l)),
      null === i || (void 0 === r && "" === i))
    )
      return I({ nullInput: !0 });
    if (("string" == typeof i && (e._i = i = e._locale.preparse(i)), h(i)))
      return new q(_t(i));
    if (V(i)) e._d = i;
    else if (a(r))
      !(function (e) {
        var t,
          n,
          s,
          i,
          r,
          a,
          o = !1,
          u = e._f.length;
        if (0 === u) return (m(e).invalidFormat = !0), (e._d = new Date(NaN));
        for (i = 0; i < u; i++)
          (r = 0),
            (a = !1),
            (t = $({}, e)),
            null != e._useUTC && (t._useUTC = e._useUTC),
            (t._f = e._f[i]),
            Tt(t),
            A(t) && (a = !0),
            (r = (r += m(t).charsLeftOver) + 10 * m(t).unusedTokens.length),
            (m(t).score = r),
            o
              ? r < s && ((s = r), (n = t))
              : (null == s || r < s || a) && ((s = r), (n = t), a && (o = !0));
        E(e, n || t);
      })(e);
    else if (r) Tt(e);
    else if (o((r = (i = e)._i))) i._d = new Date(f.now());
    else
      V(r)
        ? (i._d = new Date(r.valueOf()))
        : "string" == typeof r
        ? ((n = i),
          null !== (t = vt.exec(n._i))
            ? (n._d = new Date(+t[1]))
            : (St(n),
              !1 === n._isValid &&
                (delete n._isValid,
                Ot(n),
                !1 === n._isValid &&
                  (delete n._isValid,
                  n._strict
                    ? (n._isValid = !1)
                    : f.createFromInputFallback(n)))))
        : a(r)
        ? ((i._a = G(r.slice(0), function (e) {
            return parseInt(e, 10);
          })),
          xt(i))
        : F(r)
        ? (t = i)._d ||
          ((s = void 0 === (n = ue(t._i)).day ? n.date : n.day),
          (t._a = G(
            [n.year, n.month, s, n.hour, n.minute, n.second, n.millisecond],
            function (e) {
              return e && parseInt(e, 10);
            }
          )),
          xt(t))
        : u(r)
        ? (i._d = new Date(r))
        : f.createFromInputFallback(i);
    return A(e) || (e._d = null), e;
  }
  function Pt(e, t, n, s, i) {
    var r = {};
    return (
      (!0 !== t && !1 !== t) || ((s = t), (t = void 0)),
      (!0 !== n && !1 !== n) || ((s = n), (n = void 0)),
      ((F(e) && L(e)) || (a(e) && 0 === e.length)) && (e = void 0),
      (r._isAMomentObject = !0),
      (r._useUTC = r._isUTC = i),
      (r._l = n),
      (r._i = e),
      (r._f = t),
      (r._strict = s),
      (i = new q(_t(Nt((i = r)))))._nextDay &&
        (i.add(1, "d"), (i._nextDay = void 0)),
      i
    );
  }
  function W(e, t, n, s) {
    return Pt(e, t, n, s, !1);
  }
  (f.createFromInputFallback = e(
    "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
    function (e) {
      e._d = new Date(e._i + (e._useUTC ? " UTC" : ""));
    }
  )),
    (f.ISO_8601 = function () {}),
    (f.RFC_2822 = function () {});
  (ge = e(
    "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
    function () {
      var e = W.apply(null, arguments);
      return this.isValid() && e.isValid() ? (e < this ? this : e) : I();
    }
  )),
    (we = e(
      "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
      function () {
        var e = W.apply(null, arguments);
        return this.isValid() && e.isValid() ? (this < e ? this : e) : I();
      }
    ));
  function Rt(e, t) {
    var n, s;
    if (!(t = 1 === t.length && a(t[0]) ? t[0] : t).length) return W();
    for (n = t[0], s = 1; s < t.length; ++s)
      (t[s].isValid() && !t[s][e](n)) || (n = t[s]);
    return n;
  }
  var Wt = [
    "year",
    "quarter",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
    "millisecond",
  ];
  function Ct(e) {
    var e = ue(e),
      t = e.year || 0,
      n = e.quarter || 0,
      s = e.month || 0,
      i = e.week || e.isoWeek || 0,
      r = e.day || 0,
      a = e.hour || 0,
      o = e.minute || 0,
      u = e.second || 0,
      l = e.millisecond || 0;
    (this._isValid = (function (e) {
      var t,
        n,
        s = !1,
        i = Wt.length;
      for (t in e)
        if (c(e, t) && (-1 === S.call(Wt, t) || (null != e[t] && isNaN(e[t]))))
          return !1;
      for (n = 0; n < i; ++n)
        if (e[Wt[n]]) {
          if (s) return !1;
          parseFloat(e[Wt[n]]) !== g(e[Wt[n]]) && (s = !0);
        }
      return !0;
    })(e)),
      (this._milliseconds = +l + 1e3 * u + 6e4 * o + 1e3 * a * 60 * 60),
      (this._days = +r + 7 * i),
      (this._months = +s + 3 * n + 12 * t),
      (this._data = {}),
      (this._locale = mt()),
      this._bubble();
  }
  function Ut(e) {
    return e instanceof Ct;
  }
  function Ht(e) {
    return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e);
  }
  function Ft(e, n) {
    s(e, 0, 0, function () {
      var e = this.utcOffset(),
        t = "+";
      return (
        e < 0 && ((e = -e), (t = "-")),
        t + r(~~(e / 60), 2) + n + r(~~e % 60, 2)
      );
    });
  }
  Ft("Z", ":"),
    Ft("ZZ", ""),
    v("Z", Ye),
    v("ZZ", Ye),
    D(["Z", "ZZ"], function (e, t, n) {
      (n._useUTC = !0), (n._tzm = Vt(Ye, e));
    });
  var Lt = /([\+\-]|\d\d)/gi;
  function Vt(e, t) {
    var t = (t || "").match(e);
    return null === t
      ? null
      : 0 ===
        (t =
          60 *
            (e = ((t[t.length - 1] || []) + "").match(Lt) || ["-", 0, 0])[1] +
          g(e[2]))
      ? 0
      : "+" === e[0]
      ? t
      : -t;
  }
  function Gt(e, t) {
    var n;
    return t._isUTC
      ? ((t = t.clone()),
        (n = (h(e) || V(e) ? e : W(e)).valueOf() - t.valueOf()),
        t._d.setTime(t._d.valueOf() + n),
        f.updateOffset(t, !1),
        t)
      : W(e).local();
  }
  function Et(e) {
    return -Math.round(e._d.getTimezoneOffset());
  }
  function At() {
    return !!this.isValid() && this._isUTC && 0 === this._offset;
  }
  f.updateOffset = function () {};
  var It = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
    jt =
      /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
  function C(e, t) {
    var n,
      s = e,
      i = null;
    return (
      Ut(e)
        ? (s = { ms: e._milliseconds, d: e._days, M: e._months })
        : u(e) || !isNaN(+e)
        ? ((s = {}), t ? (s[t] = +e) : (s.milliseconds = +e))
        : (i = It.exec(e))
        ? ((n = "-" === i[1] ? -1 : 1),
          (s = {
            y: 0,
            d: g(i[b]) * n,
            h: g(i[x]) * n,
            m: g(i[T]) * n,
            s: g(i[N]) * n,
            ms: g(Ht(1e3 * i[Ne])) * n,
          }))
        : (i = jt.exec(e))
        ? ((n = "-" === i[1] ? -1 : 1),
          (s = {
            y: Zt(i[2], n),
            M: Zt(i[3], n),
            w: Zt(i[4], n),
            d: Zt(i[5], n),
            h: Zt(i[6], n),
            m: Zt(i[7], n),
            s: Zt(i[8], n),
          }))
        : null == s
        ? (s = {})
        : "object" == typeof s &&
          ("from" in s || "to" in s) &&
          ((t = (function (e, t) {
            var n;
            if (!e.isValid() || !t.isValid())
              return { milliseconds: 0, months: 0 };
            (t = Gt(t, e)),
              e.isBefore(t)
                ? (n = zt(e, t))
                : (((n = zt(t, e)).milliseconds = -n.milliseconds),
                  (n.months = -n.months));
            return n;
          })(W(s.from), W(s.to))),
          ((s = {}).ms = t.milliseconds),
          (s.M = t.months)),
      (i = new Ct(s)),
      Ut(e) && c(e, "_locale") && (i._locale = e._locale),
      Ut(e) && c(e, "_isValid") && (i._isValid = e._isValid),
      i
    );
  }
  function Zt(e, t) {
    e = e && parseFloat(e.replace(",", "."));
    return (isNaN(e) ? 0 : e) * t;
  }
  function zt(e, t) {
    var n = {};
    return (
      (n.months = t.month() - e.month() + 12 * (t.year() - e.year())),
      e.clone().add(n.months, "M").isAfter(t) && --n.months,
      (n.milliseconds = +t - +e.clone().add(n.months, "M")),
      n
    );
  }
  function $t(s, i) {
    return function (e, t) {
      var n;
      return (
        null === t ||
          isNaN(+t) ||
          (Q(
            i,
            "moment()." +
              i +
              "(period, number) is deprecated. Please use moment()." +
              i +
              "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
          ),
          (n = e),
          (e = t),
          (t = n)),
        qt(this, C(e, t), s),
        this
      );
    };
  }
  function qt(e, t, n, s) {
    var i = t._milliseconds,
      r = Ht(t._days),
      t = Ht(t._months);
    e.isValid() &&
      ((s = null == s || s),
      t && Ve(e, ce(e, "Month") + t * n),
      r && fe(e, "Date", ce(e, "Date") + r * n),
      i && e._d.setTime(e._d.valueOf() + i * n),
      s && f.updateOffset(e, r || t));
  }
  (C.fn = Ct.prototype),
    (C.invalid = function () {
      return C(NaN);
    });
  (Ce = $t(1, "add")), (Je = $t(-1, "subtract"));
  function Bt(e) {
    return "string" == typeof e || e instanceof String;
  }
  function Jt(e) {
    return (
      h(e) ||
      V(e) ||
      Bt(e) ||
      u(e) ||
      (function (t) {
        var e = a(t),
          n = !1;
        e &&
          (n =
            0 ===
            t.filter(function (e) {
              return !u(e) && Bt(t);
            }).length);
        return e && n;
      })(e) ||
      (function (e) {
        var t,
          n,
          s = F(e) && !L(e),
          i = !1,
          r = [
            "years",
            "year",
            "y",
            "months",
            "month",
            "M",
            "days",
            "day",
            "d",
            "dates",
            "date",
            "D",
            "hours",
            "hour",
            "h",
            "minutes",
            "minute",
            "m",
            "seconds",
            "second",
            "s",
            "milliseconds",
            "millisecond",
            "ms",
          ],
          a = r.length;
        for (t = 0; t < a; t += 1) (n = r[t]), (i = i || c(e, n));
        return s && i;
      })(e) ||
      null == e
    );
  }
  function Qt(e, t) {
    if (e.date() < t.date()) return -Qt(t, e);
    var n = 12 * (t.year() - e.year()) + (t.month() - e.month()),
      s = e.clone().add(n, "months"),
      t =
        t - s < 0
          ? (t - s) / (s - e.clone().add(n - 1, "months"))
          : (t - s) / (e.clone().add(1 + n, "months") - s);
    return -(n + t) || 0;
  }
  function Xt(e) {
    return void 0 === e
      ? this._locale._abbr
      : (null != (e = mt(e)) && (this._locale = e), this);
  }
  (f.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
    (f.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
  Xe = e(
    "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
    function (e) {
      return void 0 === e ? this.localeData() : this.locale(e);
    }
  );
  function Kt() {
    return this._locale;
  }
  var en = 126227808e5;
  function tn(e, t) {
    return ((e % t) + t) % t;
  }
  function nn(e, t, n) {
    return e < 100 && 0 <= e
      ? new Date(e + 400, t, n) - en
      : new Date(e, t, n).valueOf();
  }
  function sn(e, t, n) {
    return e < 100 && 0 <= e ? Date.UTC(e + 400, t, n) - en : Date.UTC(e, t, n);
  }
  function rn(e, t) {
    return t.erasAbbrRegex(e);
  }
  function an() {
    for (
      var e = [], t = [], n = [], s = [], i = this.eras(), r = 0, a = i.length;
      r < a;
      ++r
    )
      t.push(M(i[r].name)),
        e.push(M(i[r].abbr)),
        n.push(M(i[r].narrow)),
        s.push(M(i[r].name)),
        s.push(M(i[r].abbr)),
        s.push(M(i[r].narrow));
    (this._erasRegex = new RegExp("^(" + s.join("|") + ")", "i")),
      (this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i")),
      (this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i")),
      (this._erasNarrowRegex = new RegExp("^(" + n.join("|") + ")", "i"));
  }
  function on(e, t) {
    s(0, [e, e.length], 0, t);
  }
  function un(e, t, n, s, i) {
    var r;
    return null == e
      ? qe(this, s, i).year
      : ((r = P(e, s, i)),
        function (e, t, n, s, i) {
          (e = $e(e, t, n, s, i)), (t = Ze(e.year, 0, e.dayOfYear));
          return (
            this.year(t.getUTCFullYear()),
            this.month(t.getUTCMonth()),
            this.date(t.getUTCDate()),
            this
          );
        }.call(this, e, (t = r < t ? r : t), n, s, i));
  }
  s("N", 0, 0, "eraAbbr"),
    s("NN", 0, 0, "eraAbbr"),
    s("NNN", 0, 0, "eraAbbr"),
    s("NNNN", 0, 0, "eraName"),
    s("NNNNN", 0, 0, "eraNarrow"),
    s("y", ["y", 1], "yo", "eraYear"),
    s("y", ["yy", 2], 0, "eraYear"),
    s("y", ["yyy", 3], 0, "eraYear"),
    s("y", ["yyyy", 4], 0, "eraYear"),
    v("N", rn),
    v("NN", rn),
    v("NNN", rn),
    v("NNNN", function (e, t) {
      return t.erasNameRegex(e);
    }),
    v("NNNNN", function (e, t) {
      return t.erasNarrowRegex(e);
    }),
    D(["N", "NN", "NNN", "NNNN", "NNNNN"], function (e, t, n, s) {
      s = n._locale.erasParse(e, s, n._strict);
      s ? (m(n).era = s) : (m(n).invalidEra = e);
    }),
    v("y", Me),
    v("yy", Me),
    v("yyy", Me),
    v("yyyy", Me),
    v("yo", function (e, t) {
      return t._eraYearOrdinalRegex || Me;
    }),
    D(["y", "yy", "yyy", "yyyy"], Y),
    D(["yo"], function (e, t, n, s) {
      var i;
      n._locale._eraYearOrdinalRegex &&
        (i = e.match(n._locale._eraYearOrdinalRegex)),
        n._locale.eraYearOrdinalParse
          ? (t[Y] = n._locale.eraYearOrdinalParse(e, i))
          : (t[Y] = parseInt(e, 10));
    }),
    s(0, ["gg", 2], 0, function () {
      return this.weekYear() % 100;
    }),
    s(0, ["GG", 2], 0, function () {
      return this.isoWeekYear() % 100;
    }),
    on("gggg", "weekYear"),
    on("ggggg", "weekYear"),
    on("GGGG", "isoWeekYear"),
    on("GGGGG", "isoWeekYear"),
    t("weekYear", "gg"),
    t("isoWeekYear", "GG"),
    n("weekYear", 1),
    n("isoWeekYear", 1),
    v("G", De),
    v("g", De),
    v("GG", p, w),
    v("gg", p, w),
    v("GGGG", ke, _e),
    v("gggg", ke, _e),
    v("GGGGG", ve, ye),
    v("ggggg", ve, ye),
    Te(["gggg", "ggggg", "GGGG", "GGGGG"], function (e, t, n, s) {
      t[s.substr(0, 2)] = g(e);
    }),
    Te(["gg", "GG"], function (e, t, n, s) {
      t[s] = f.parseTwoDigitYear(e);
    }),
    s("Q", 0, "Qo", "quarter"),
    t("quarter", "Q"),
    n("quarter", 7),
    v("Q", i),
    D("Q", function (e, t) {
      t[O] = 3 * (g(e) - 1);
    }),
    s("D", ["DD", 2], "Do", "date"),
    t("date", "D"),
    n("date", 9),
    v("D", p),
    v("DD", p, w),
    v("Do", function (e, t) {
      return e
        ? t._dayOfMonthOrdinalParse || t._ordinalParse
        : t._dayOfMonthOrdinalParseLenient;
    }),
    D(["D", "DD"], b),
    D("Do", function (e, t) {
      t[b] = g(e.match(p)[0]);
    });
  ke = de("Date", !0);
  s("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
    t("dayOfYear", "DDD"),
    n("dayOfYear", 4),
    v("DDD", pe),
    v("DDDD", me),
    D(["DDD", "DDDD"], function (e, t, n) {
      n._dayOfYear = g(e);
    }),
    s("m", ["mm", 2], 0, "minute"),
    t("minute", "m"),
    n("minute", 14),
    v("m", p),
    v("mm", p, w),
    D(["m", "mm"], T);
  var ln,
    _e = de("Minutes", !1),
    ve =
      (s("s", ["ss", 2], 0, "second"),
      t("second", "s"),
      n("second", 15),
      v("s", p),
      v("ss", p, w),
      D(["s", "ss"], N),
      de("Seconds", !1));
  for (
    s("S", 0, 0, function () {
      return ~~(this.millisecond() / 100);
    }),
      s(0, ["SS", 2], 0, function () {
        return ~~(this.millisecond() / 10);
      }),
      s(0, ["SSS", 3], 0, "millisecond"),
      s(0, ["SSSS", 4], 0, function () {
        return 10 * this.millisecond();
      }),
      s(0, ["SSSSS", 5], 0, function () {
        return 100 * this.millisecond();
      }),
      s(0, ["SSSSSS", 6], 0, function () {
        return 1e3 * this.millisecond();
      }),
      s(0, ["SSSSSSS", 7], 0, function () {
        return 1e4 * this.millisecond();
      }),
      s(0, ["SSSSSSSS", 8], 0, function () {
        return 1e5 * this.millisecond();
      }),
      s(0, ["SSSSSSSSS", 9], 0, function () {
        return 1e6 * this.millisecond();
      }),
      t("millisecond", "ms"),
      n("millisecond", 16),
      v("S", pe, i),
      v("SS", pe, w),
      v("SSS", pe, me),
      ln = "SSSS";
    ln.length <= 9;
    ln += "S"
  )
    v(ln, Me);
  function hn(e, t) {
    t[Ne] = g(1e3 * ("0." + e));
  }
  for (ln = "S"; ln.length <= 9; ln += "S") D(ln, hn);
  (ye = de("Milliseconds", !1)),
    s("z", 0, 0, "zoneAbbr"),
    s("zz", 0, 0, "zoneName");
  i = q.prototype;
  function dn(e) {
    return e;
  }
  (i.add = Ce),
    (i.calendar = function (e, t) {
      1 === arguments.length &&
        (arguments[0]
          ? Jt(arguments[0])
            ? ((e = arguments[0]), (t = void 0))
            : (function (e) {
                for (
                  var t = F(e) && !L(e),
                    n = !1,
                    s = [
                      "sameDay",
                      "nextDay",
                      "lastDay",
                      "nextWeek",
                      "lastWeek",
                      "sameElse",
                    ],
                    i = 0;
                  i < s.length;
                  i += 1
                )
                  n = n || c(e, s[i]);
                return t && n;
              })(arguments[0]) && ((t = arguments[0]), (e = void 0))
          : (t = e = void 0));
      var e = e || W(),
        n = Gt(e, this).startOf("day"),
        n = f.calendarFormat(this, n) || "sameElse",
        t = t && (d(t[n]) ? t[n].call(this, e) : t[n]);
      return this.format(t || this.localeData().calendar(n, this, W(e)));
    }),
    (i.clone = function () {
      return new q(this);
    }),
    (i.diff = function (e, t, n) {
      var s, i, r;
      if (!this.isValid()) return NaN;
      if (!(s = Gt(e, this)).isValid()) return NaN;
      switch (((i = 6e4 * (s.utcOffset() - this.utcOffset())), (t = _(t)))) {
        case "year":
          r = Qt(this, s) / 12;
          break;
        case "month":
          r = Qt(this, s);
          break;
        case "quarter":
          r = Qt(this, s) / 3;
          break;
        case "second":
          r = (this - s) / 1e3;
          break;
        case "minute":
          r = (this - s) / 6e4;
          break;
        case "hour":
          r = (this - s) / 36e5;
          break;
        case "day":
          r = (this - s - i) / 864e5;
          break;
        case "week":
          r = (this - s - i) / 6048e5;
          break;
        default:
          r = this - s;
      }
      return n ? r : y(r);
    }),
    (i.endOf = function (e) {
      var t, n;
      if (void 0 === (e = _(e)) || "millisecond" === e || !this.isValid())
        return this;
      switch (((n = this._isUTC ? sn : nn), e)) {
        case "year":
          t = n(this.year() + 1, 0, 1) - 1;
          break;
        case "quarter":
          t = n(this.year(), this.month() - (this.month() % 3) + 3, 1) - 1;
          break;
        case "month":
          t = n(this.year(), this.month() + 1, 1) - 1;
          break;
        case "week":
          t =
            n(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
          break;
        case "isoWeek":
          t =
            n(
              this.year(),
              this.month(),
              this.date() - (this.isoWeekday() - 1) + 7
            ) - 1;
          break;
        case "day":
        case "date":
          t = n(this.year(), this.month(), this.date() + 1) - 1;
          break;
        case "hour":
          (t = this._d.valueOf()),
            (t +=
              36e5 -
              tn(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) -
              1);
          break;
        case "minute":
          (t = this._d.valueOf()), (t += 6e4 - tn(t, 6e4) - 1);
          break;
        case "second":
          (t = this._d.valueOf()), (t += 1e3 - tn(t, 1e3) - 1);
          break;
      }
      return this._d.setTime(t), f.updateOffset(this, !0), this;
    }),
    (i.format = function (e) {
      return (
        (e = e || (this.isUtc() ? f.defaultFormatUtc : f.defaultFormat)),
        (e = re(this, e)),
        this.localeData().postformat(e)
      );
    }),
    (i.from = function (e, t) {
      return this.isValid() && ((h(e) && e.isValid()) || W(e).isValid())
        ? C({ to: this, from: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
    }),
    (i.fromNow = function (e) {
      return this.from(W(), e);
    }),
    (i.to = function (e, t) {
      return this.isValid() && ((h(e) && e.isValid()) || W(e).isValid())
        ? C({ from: this, to: e }).locale(this.locale()).humanize(!t)
        : this.localeData().invalidDate();
    }),
    (i.toNow = function (e) {
      return this.to(W(), e);
    }),
    (i.get = function (e) {
      return d(this[(e = _(e))]) ? this[e]() : this;
    }),
    (i.invalidAt = function () {
      return m(this).overflow;
    }),
    (i.isAfter = function (e, t) {
      return (
        (e = h(e) ? e : W(e)),
        !(!this.isValid() || !e.isValid()) &&
          ("millisecond" === (t = _(t) || "millisecond")
            ? this.valueOf() > e.valueOf()
            : e.valueOf() < this.clone().startOf(t).valueOf())
      );
    }),
    (i.isBefore = function (e, t) {
      return (
        (e = h(e) ? e : W(e)),
        !(!this.isValid() || !e.isValid()) &&
          ("millisecond" === (t = _(t) || "millisecond")
            ? this.valueOf() < e.valueOf()
            : this.clone().endOf(t).valueOf() < e.valueOf())
      );
    }),
    (i.isBetween = function (e, t, n, s) {
      return (
        (e = h(e) ? e : W(e)),
        (t = h(t) ? t : W(t)),
        !!(this.isValid() && e.isValid() && t.isValid()) &&
          ("(" === (s = s || "()")[0]
            ? this.isAfter(e, n)
            : !this.isBefore(e, n)) &&
          (")" === s[1] ? this.isBefore(t, n) : !this.isAfter(t, n))
      );
    }),
    (i.isSame = function (e, t) {
      var e = h(e) ? e : W(e);
      return (
        !(!this.isValid() || !e.isValid()) &&
        ("millisecond" === (t = _(t) || "millisecond")
          ? this.valueOf() === e.valueOf()
          : ((e = e.valueOf()),
            this.clone().startOf(t).valueOf() <= e &&
              e <= this.clone().endOf(t).valueOf()))
      );
    }),
    (i.isSameOrAfter = function (e, t) {
      return this.isSame(e, t) || this.isAfter(e, t);
    }),
    (i.isSameOrBefore = function (e, t) {
      return this.isSame(e, t) || this.isBefore(e, t);
    }),
    (i.isValid = function () {
      return A(this);
    }),
    (i.lang = Xe),
    (i.locale = Xt),
    (i.localeData = Kt),
    (i.max = we),
    (i.min = ge),
    (i.parsingFlags = function () {
      return E({}, m(this));
    }),
    (i.set = function (e, t) {
      if ("object" == typeof e)
        for (
          var n = (function (e) {
              var t,
                n = [];
              for (t in e) c(e, t) && n.push({ unit: t, priority: le[t] });
              return (
                n.sort(function (e, t) {
                  return e.priority - t.priority;
                }),
                n
              );
            })((e = ue(e))),
            s = n.length,
            i = 0;
          i < s;
          i++
        )
          this[n[i].unit](e[n[i].unit]);
      else if (d(this[(e = _(e))])) return this[e](t);
      return this;
    }),
    (i.startOf = function (e) {
      var t, n;
      if (void 0 === (e = _(e)) || "millisecond" === e || !this.isValid())
        return this;
      switch (((n = this._isUTC ? sn : nn), e)) {
        case "year":
          t = n(this.year(), 0, 1);
          break;
        case "quarter":
          t = n(this.year(), this.month() - (this.month() % 3), 1);
          break;
        case "month":
          t = n(this.year(), this.month(), 1);
          break;
        case "week":
          t = n(this.year(), this.month(), this.date() - this.weekday());
          break;
        case "isoWeek":
          t = n(
            this.year(),
            this.month(),
            this.date() - (this.isoWeekday() - 1)
          );
          break;
        case "day":
        case "date":
          t = n(this.year(), this.month(), this.date());
          break;
        case "hour":
          (t = this._d.valueOf()),
            (t -= tn(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5));
          break;
        case "minute":
          (t = this._d.valueOf()), (t -= tn(t, 6e4));
          break;
        case "second":
          (t = this._d.valueOf()), (t -= tn(t, 1e3));
          break;
      }
      return this._d.setTime(t), f.updateOffset(this, !0), this;
    }),
    (i.subtract = Je),
    (i.toArray = function () {
      var e = this;
      return [
        e.year(),
        e.month(),
        e.date(),
        e.hour(),
        e.minute(),
        e.second(),
        e.millisecond(),
      ];
    }),
    (i.toObject = function () {
      var e = this;
      return {
        years: e.year(),
        months: e.month(),
        date: e.date(),
        hours: e.hours(),
        minutes: e.minutes(),
        seconds: e.seconds(),
        milliseconds: e.milliseconds(),
      };
    }),
    (i.toDate = function () {
      return new Date(this.valueOf());
    }),
    (i.toISOString = function (e) {
      if (!this.isValid()) return null;
      var t = (e = !0 !== e) ? this.clone().utc() : this;
      return t.year() < 0 || 9999 < t.year()
        ? re(
            t,
            e
              ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
              : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
          )
        : d(Date.prototype.toISOString)
        ? e
          ? this.toDate().toISOString()
          : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3)
              .toISOString()
              .replace("Z", re(t, "Z"))
        : re(
            t,
            e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
          );
    }),
    (i.inspect = function () {
      if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
      var e,
        t = "moment",
        n = "";
      return (
        this.isLocal() ||
          ((t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
          (n = "Z")),
        (t = "[" + t + '("]'),
        (e = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY"),
        this.format(t + e + "-MM-DD[T]HH:mm:ss.SSS" + (n + '[")]'))
      );
    }),
    "undefined" != typeof Symbol &&
      null != Symbol.for &&
      (i[Symbol.for("nodejs.util.inspect.custom")] = function () {
        return "Moment<" + this.format() + ">";
      }),
    (i.toJSON = function () {
      return this.isValid() ? this.toISOString() : null;
    }),
    (i.toString = function () {
      return this.clone()
        .locale("en")
        .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
    }),
    (i.unix = function () {
      return Math.floor(this.valueOf() / 1e3);
    }),
    (i.valueOf = function () {
      return this._d.valueOf() - 6e4 * (this._offset || 0);
    }),
    (i.creationData = function () {
      return {
        input: this._i,
        format: this._f,
        locale: this._locale,
        isUTC: this._isUTC,
        strict: this._strict,
      };
    }),
    (i.eraName = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].name;
        if (t[n].until <= e && e <= t[n].since) return t[n].name;
      }
      return "";
    }),
    (i.eraNarrow = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].narrow;
        if (t[n].until <= e && e <= t[n].since) return t[n].narrow;
      }
      return "";
    }),
    (i.eraAbbr = function () {
      for (
        var e, t = this.localeData().eras(), n = 0, s = t.length;
        n < s;
        ++n
      ) {
        if (
          ((e = this.clone().startOf("day").valueOf()),
          t[n].since <= e && e <= t[n].until)
        )
          return t[n].abbr;
        if (t[n].until <= e && e <= t[n].since) return t[n].abbr;
      }
      return "";
    }),
    (i.eraYear = function () {
      for (
        var e, t, n = this.localeData().eras(), s = 0, i = n.length;
        s < i;
        ++s
      )
        if (
          ((e = n[s].since <= n[s].until ? 1 : -1),
          (t = this.clone().startOf("day").valueOf()),
          (n[s].since <= t && t <= n[s].until) ||
            (n[s].until <= t && t <= n[s].since))
        )
          return (this.year() - f(n[s].since).year()) * e + n[s].offset;
      return this.year();
    }),
    (i.year = Ie),
    (i.isLeapYear = function () {
      return he(this.year());
    }),
    (i.weekYear = function (e) {
      return un.call(
        this,
        e,
        this.week(),
        this.weekday(),
        this.localeData()._week.dow,
        this.localeData()._week.doy
      );
    }),
    (i.isoWeekYear = function (e) {
      return un.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4);
    }),
    (i.quarter = i.quarters =
      function (e) {
        return null == e
          ? Math.ceil((this.month() + 1) / 3)
          : this.month(3 * (e - 1) + (this.month() % 3));
      }),
    (i.month = Ge),
    (i.daysInMonth = function () {
      return We(this.year(), this.month());
    }),
    (i.week = i.weeks =
      function (e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d");
      }),
    (i.isoWeek = i.isoWeeks =
      function (e) {
        var t = qe(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d");
      }),
    (i.weeksInYear = function () {
      var e = this.localeData()._week;
      return P(this.year(), e.dow, e.doy);
    }),
    (i.weeksInWeekYear = function () {
      var e = this.localeData()._week;
      return P(this.weekYear(), e.dow, e.doy);
    }),
    (i.isoWeeksInYear = function () {
      return P(this.year(), 1, 4);
    }),
    (i.isoWeeksInISOWeekYear = function () {
      return P(this.isoWeekYear(), 1, 4);
    }),
    (i.date = ke),
    (i.day = i.days =
      function (e) {
        if (!this.isValid()) return null != e ? this : NaN;
        var t,
          n,
          s = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        return null != e
          ? ((t = e),
            (n = this.localeData()),
            (e =
              "string" != typeof t
                ? t
                : isNaN(t)
                ? "number" == typeof (t = n.weekdaysParse(t))
                  ? t
                  : null
                : parseInt(t, 10)),
            this.add(e - s, "d"))
          : s;
      }),
    (i.weekday = function (e) {
      if (!this.isValid()) return null != e ? this : NaN;
      var t = (this.day() + 7 - this.localeData()._week.dow) % 7;
      return null == e ? t : this.add(e - t, "d");
    }),
    (i.isoWeekday = function (e) {
      return this.isValid()
        ? null != e
          ? ((t = e),
            (n = this.localeData()),
            (n =
              "string" == typeof t
                ? n.weekdaysParse(t) % 7 || 7
                : isNaN(t)
                ? null
                : t),
            this.day(this.day() % 7 ? n : n - 7))
          : this.day() || 7
        : null != e
        ? this
        : NaN;
      var t, n;
    }),
    (i.dayOfYear = function (e) {
      var t =
        Math.round(
          (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
        ) + 1;
      return null == e ? t : this.add(e - t, "d");
    }),
    (i.hour = i.hours = k),
    (i.minute = i.minutes = _e),
    (i.second = i.seconds = ve),
    (i.millisecond = i.milliseconds = ye),
    (i.utcOffset = function (e, t, n) {
      var s,
        i = this._offset || 0;
      if (!this.isValid()) return null != e ? this : NaN;
      if (null == e) return this._isUTC ? i : Et(this);
      if ("string" == typeof e) {
        if (null === (e = Vt(Ye, e))) return this;
      } else Math.abs(e) < 16 && !n && (e *= 60);
      return (
        !this._isUTC && t && (s = Et(this)),
        (this._offset = e),
        (this._isUTC = !0),
        null != s && this.add(s, "m"),
        i !== e &&
          (!t || this._changeInProgress
            ? qt(this, C(e - i, "m"), 1, !1)
            : this._changeInProgress ||
              ((this._changeInProgress = !0),
              f.updateOffset(this, !0),
              (this._changeInProgress = null))),
        this
      );
    }),
    (i.utc = function (e) {
      return this.utcOffset(0, e);
    }),
    (i.local = function (e) {
      return (
        this._isUTC &&
          (this.utcOffset(0, e),
          (this._isUTC = !1),
          e && this.subtract(Et(this), "m")),
        this
      );
    }),
    (i.parseZone = function () {
      var e;
      return (
        null != this._tzm
          ? this.utcOffset(this._tzm, !1, !0)
          : "string" == typeof this._i &&
            (null != (e = Vt(Se, this._i))
              ? this.utcOffset(e)
              : this.utcOffset(0, !0)),
        this
      );
    }),
    (i.hasAlignedHourOffset = function (e) {
      return (
        !!this.isValid() &&
        ((e = e ? W(e).utcOffset() : 0), (this.utcOffset() - e) % 60 == 0)
      );
    }),
    (i.isDST = function () {
      return (
        this.utcOffset() > this.clone().month(0).utcOffset() ||
        this.utcOffset() > this.clone().month(5).utcOffset()
      );
    }),
    (i.isLocal = function () {
      return !!this.isValid() && !this._isUTC;
    }),
    (i.isUtcOffset = function () {
      return !!this.isValid() && this._isUTC;
    }),
    (i.isUtc = At),
    (i.isUTC = At),
    (i.zoneAbbr = function () {
      return this._isUTC ? "UTC" : "";
    }),
    (i.zoneName = function () {
      return this._isUTC ? "Coordinated Universal Time" : "";
    }),
    (i.dates = e("dates accessor is deprecated. Use date instead.", ke)),
    (i.months = e("months accessor is deprecated. Use month instead", Ge)),
    (i.years = e("years accessor is deprecated. Use year instead", Ie)),
    (i.zone = e(
      "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
      function (e, t) {
        return null != e
          ? (this.utcOffset((e = "string" != typeof e ? -e : e), t), this)
          : -this.utcOffset();
      }
    )),
    (i.isDSTShifted = e(
      "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
      function () {
        if (!o(this._isDSTShifted)) return this._isDSTShifted;
        var e,
          t = {};
        return (
          $(t, this),
          (t = Nt(t))._a
            ? ((e = (t._isUTC ? l : W)(t._a)),
              (this._isDSTShifted =
                this.isValid() &&
                0 <
                  (function (e, t, n) {
                    for (
                      var s = Math.min(e.length, t.length),
                        i = Math.abs(e.length - t.length),
                        r = 0,
                        a = 0;
                      a < s;
                      a++
                    )
                      ((n && e[a] !== t[a]) || (!n && g(e[a]) !== g(t[a]))) &&
                        r++;
                    return r + i;
                  })(t._a, e.toArray())))
            : (this._isDSTShifted = !1),
          this._isDSTShifted
        );
      }
    ));
  w = K.prototype;
  function cn(e, t, n, s) {
    var i = mt(),
      s = l().set(s, t);
    return i[n](s, e);
  }
  function fn(e, t, n) {
    if ((u(e) && ((t = e), (e = void 0)), (e = e || ""), null != t))
      return cn(e, t, n, "month");
    for (var s = [], i = 0; i < 12; i++) s[i] = cn(e, i, n, "month");
    return s;
  }
  function mn(e, t, n, s) {
    t =
      ("boolean" == typeof e
        ? u(t) && ((n = t), (t = void 0))
        : ((t = e), (e = !1), u((n = t)) && ((n = t), (t = void 0))),
      t || "");
    var i,
      r = mt(),
      a = e ? r._week.dow : 0,
      o = [];
    if (null != n) return cn(t, (n + a) % 7, s, "day");
    for (i = 0; i < 7; i++) o[i] = cn(t, (i + a) % 7, s, "day");
    return o;
  }
  (w.calendar = function (e, t, n) {
    return d((e = this._calendar[e] || this._calendar.sameElse))
      ? e.call(t, n)
      : e;
  }),
    (w.longDateFormat = function (e) {
      var t = this._longDateFormat[e],
        n = this._longDateFormat[e.toUpperCase()];
      return t || !n
        ? t
        : ((this._longDateFormat[e] = n
            .match(te)
            .map(function (e) {
              return "MMMM" === e || "MM" === e || "DD" === e || "dddd" === e
                ? e.slice(1)
                : e;
            })
            .join("")),
          this._longDateFormat[e]);
    }),
    (w.invalidDate = function () {
      return this._invalidDate;
    }),
    (w.ordinal = function (e) {
      return this._ordinal.replace("%d", e);
    }),
    (w.preparse = dn),
    (w.postformat = dn),
    (w.relativeTime = function (e, t, n, s) {
      var i = this._relativeTime[n];
      return d(i) ? i(e, t, n, s) : i.replace(/%d/i, e);
    }),
    (w.pastFuture = function (e, t) {
      return d((e = this._relativeTime[0 < e ? "future" : "past"]))
        ? e(t)
        : e.replace(/%s/i, t);
    }),
    (w.set = function (e) {
      var t, n;
      for (n in e)
        c(e, n) && (d((t = e[n])) ? (this[n] = t) : (this["_" + n] = t));
      (this._config = e),
        (this._dayOfMonthOrdinalParseLenient = new RegExp(
          (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
            "|" +
            /\d{1,2}/.source
        ));
    }),
    (w.eras = function (e, t) {
      for (
        var n, s = this._eras || mt("en")._eras, i = 0, r = s.length;
        i < r;
        ++i
      ) {
        switch (typeof s[i].since) {
          case "string":
            (n = f(s[i].since).startOf("day")), (s[i].since = n.valueOf());
            break;
        }
        switch (typeof s[i].until) {
          case "undefined":
            s[i].until = 1 / 0;
            break;
          case "string":
            (n = f(s[i].until).startOf("day").valueOf()),
              (s[i].until = n.valueOf());
            break;
        }
      }
      return s;
    }),
    (w.erasParse = function (e, t, n) {
      var s,
        i,
        r,
        a,
        o,
        u = this.eras();
      for (e = e.toUpperCase(), s = 0, i = u.length; s < i; ++s)
        if (
          ((r = u[s].name.toUpperCase()),
          (a = u[s].abbr.toUpperCase()),
          (o = u[s].narrow.toUpperCase()),
          n)
        )
          switch (t) {
            case "N":
            case "NN":
            case "NNN":
              if (a === e) return u[s];
              break;
            case "NNNN":
              if (r === e) return u[s];
              break;
            case "NNNNN":
              if (o === e) return u[s];
              break;
          }
        else if (0 <= [r, a, o].indexOf(e)) return u[s];
    }),
    (w.erasConvertYear = function (e, t) {
      var n = e.since <= e.until ? 1 : -1;
      return void 0 === t
        ? f(e.since).year()
        : f(e.since).year() + (t - e.offset) * n;
    }),
    (w.erasAbbrRegex = function (e) {
      return (
        c(this, "_erasAbbrRegex") || an.call(this),
        e ? this._erasAbbrRegex : this._erasRegex
      );
    }),
    (w.erasNameRegex = function (e) {
      return (
        c(this, "_erasNameRegex") || an.call(this),
        e ? this._erasNameRegex : this._erasRegex
      );
    }),
    (w.erasNarrowRegex = function (e) {
      return (
        c(this, "_erasNarrowRegex") || an.call(this),
        e ? this._erasNarrowRegex : this._erasRegex
      );
    }),
    (w.months = function (e, t) {
      return e
        ? (a(this._months)
            ? this._months
            : this._months[
                (this._months.isFormat || He).test(t) ? "format" : "standalone"
              ])[e.month()]
        : a(this._months)
        ? this._months
        : this._months.standalone;
    }),
    (w.monthsShort = function (e, t) {
      return e
        ? (a(this._monthsShort)
            ? this._monthsShort
            : this._monthsShort[He.test(t) ? "format" : "standalone"])[
            e.month()
          ]
        : a(this._monthsShort)
        ? this._monthsShort
        : this._monthsShort.standalone;
    }),
    (w.monthsParse = function (e, t, n) {
      var s, i;
      if (this._monthsParseExact)
        return function (e, t, n) {
          var s,
            i,
            r,
            e = e.toLocaleLowerCase();
          if (!this._monthsParse)
            for (
              this._monthsParse = [],
                this._longMonthsParse = [],
                this._shortMonthsParse = [],
                s = 0;
              s < 12;
              ++s
            )
              (r = l([2e3, s])),
                (this._shortMonthsParse[s] = this.monthsShort(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._longMonthsParse[s] = this.months(
                  r,
                  ""
                ).toLocaleLowerCase());
          return n
            ? "MMM" === t
              ? -1 !== (i = S.call(this._shortMonthsParse, e))
                ? i
                : null
              : -1 !== (i = S.call(this._longMonthsParse, e))
              ? i
              : null
            : "MMM" === t
            ? -1 !== (i = S.call(this._shortMonthsParse, e)) ||
              -1 !== (i = S.call(this._longMonthsParse, e))
              ? i
              : null
            : -1 !== (i = S.call(this._longMonthsParse, e)) ||
              -1 !== (i = S.call(this._shortMonthsParse, e))
            ? i
            : null;
        }.call(this, e, t, n);
      for (
        this._monthsParse ||
          ((this._monthsParse = []),
          (this._longMonthsParse = []),
          (this._shortMonthsParse = [])),
          s = 0;
        s < 12;
        s++
      ) {
        if (
          ((i = l([2e3, s])),
          n &&
            !this._longMonthsParse[s] &&
            ((this._longMonthsParse[s] = new RegExp(
              "^" + this.months(i, "").replace(".", "") + "$",
              "i"
            )),
            (this._shortMonthsParse[s] = new RegExp(
              "^" + this.monthsShort(i, "").replace(".", "") + "$",
              "i"
            ))),
          n ||
            this._monthsParse[s] ||
            ((i = "^" + this.months(i, "") + "|^" + this.monthsShort(i, "")),
            (this._monthsParse[s] = new RegExp(i.replace(".", ""), "i"))),
          n && "MMMM" === t && this._longMonthsParse[s].test(e))
        )
          return s;
        if (n && "MMM" === t && this._shortMonthsParse[s].test(e)) return s;
        if (!n && this._monthsParse[s].test(e)) return s;
      }
    }),
    (w.monthsRegex = function (e) {
      return this._monthsParseExact
        ? (c(this, "_monthsRegex") || Ee.call(this),
          e ? this._monthsStrictRegex : this._monthsRegex)
        : (c(this, "_monthsRegex") || (this._monthsRegex = Le),
          this._monthsStrictRegex && e
            ? this._monthsStrictRegex
            : this._monthsRegex);
    }),
    (w.monthsShortRegex = function (e) {
      return this._monthsParseExact
        ? (c(this, "_monthsRegex") || Ee.call(this),
          e ? this._monthsShortStrictRegex : this._monthsShortRegex)
        : (c(this, "_monthsShortRegex") || (this._monthsShortRegex = Fe),
          this._monthsShortStrictRegex && e
            ? this._monthsShortStrictRegex
            : this._monthsShortRegex);
    }),
    (w.week = function (e) {
      return qe(e, this._week.dow, this._week.doy).week;
    }),
    (w.firstDayOfYear = function () {
      return this._week.doy;
    }),
    (w.firstDayOfWeek = function () {
      return this._week.dow;
    }),
    (w.weekdays = function (e, t) {
      return (
        (t = a(this._weekdays)
          ? this._weekdays
          : this._weekdays[
              e && !0 !== e && this._weekdays.isFormat.test(t)
                ? "format"
                : "standalone"
            ]),
        !0 === e ? Be(t, this._week.dow) : e ? t[e.day()] : t
      );
    }),
    (w.weekdaysMin = function (e) {
      return !0 === e
        ? Be(this._weekdaysMin, this._week.dow)
        : e
        ? this._weekdaysMin[e.day()]
        : this._weekdaysMin;
    }),
    (w.weekdaysShort = function (e) {
      return !0 === e
        ? Be(this._weekdaysShort, this._week.dow)
        : e
        ? this._weekdaysShort[e.day()]
        : this._weekdaysShort;
    }),
    (w.weekdaysParse = function (e, t, n) {
      var s, i;
      if (this._weekdaysParseExact)
        return function (e, t, n) {
          var s,
            i,
            r,
            e = e.toLocaleLowerCase();
          if (!this._weekdaysParse)
            for (
              this._weekdaysParse = [],
                this._shortWeekdaysParse = [],
                this._minWeekdaysParse = [],
                s = 0;
              s < 7;
              ++s
            )
              (r = l([2e3, 1]).day(s)),
                (this._minWeekdaysParse[s] = this.weekdaysMin(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._shortWeekdaysParse[s] = this.weekdaysShort(
                  r,
                  ""
                ).toLocaleLowerCase()),
                (this._weekdaysParse[s] = this.weekdays(
                  r,
                  ""
                ).toLocaleLowerCase());
          return n
            ? "dddd" === t
              ? -1 !== (i = S.call(this._weekdaysParse, e))
                ? i
                : null
              : "ddd" === t
              ? -1 !== (i = S.call(this._shortWeekdaysParse, e))
                ? i
                : null
              : -1 !== (i = S.call(this._minWeekdaysParse, e))
              ? i
              : null
            : "dddd" === t
            ? -1 !== (i = S.call(this._weekdaysParse, e)) ||
              -1 !== (i = S.call(this._shortWeekdaysParse, e)) ||
              -1 !== (i = S.call(this._minWeekdaysParse, e))
              ? i
              : null
            : "ddd" === t
            ? -1 !== (i = S.call(this._shortWeekdaysParse, e)) ||
              -1 !== (i = S.call(this._weekdaysParse, e)) ||
              -1 !== (i = S.call(this._minWeekdaysParse, e))
              ? i
              : null
            : -1 !== (i = S.call(this._minWeekdaysParse, e)) ||
              -1 !== (i = S.call(this._weekdaysParse, e)) ||
              -1 !== (i = S.call(this._shortWeekdaysParse, e))
            ? i
            : null;
        }.call(this, e, t, n);
      for (
        this._weekdaysParse ||
          ((this._weekdaysParse = []),
          (this._minWeekdaysParse = []),
          (this._shortWeekdaysParse = []),
          (this._fullWeekdaysParse = [])),
          s = 0;
        s < 7;
        s++
      ) {
        if (
          ((i = l([2e3, 1]).day(s)),
          n &&
            !this._fullWeekdaysParse[s] &&
            ((this._fullWeekdaysParse[s] = new RegExp(
              "^" + this.weekdays(i, "").replace(".", "\\.?") + "$",
              "i"
            )),
            (this._shortWeekdaysParse[s] = new RegExp(
              "^" + this.weekdaysShort(i, "").replace(".", "\\.?") + "$",
              "i"
            )),
            (this._minWeekdaysParse[s] = new RegExp(
              "^" + this.weekdaysMin(i, "").replace(".", "\\.?") + "$",
              "i"
            ))),
          this._weekdaysParse[s] ||
            ((i =
              "^" +
              this.weekdays(i, "") +
              "|^" +
              this.weekdaysShort(i, "") +
              "|^" +
              this.weekdaysMin(i, "")),
            (this._weekdaysParse[s] = new RegExp(i.replace(".", ""), "i"))),
          n && "dddd" === t && this._fullWeekdaysParse[s].test(e))
        )
          return s;
        if (n && "ddd" === t && this._shortWeekdaysParse[s].test(e)) return s;
        if (n && "dd" === t && this._minWeekdaysParse[s].test(e)) return s;
        if (!n && this._weekdaysParse[s].test(e)) return s;
      }
    }),
    (w.weekdaysRegex = function (e) {
      return this._weekdaysParseExact
        ? (c(this, "_weekdaysRegex") || nt.call(this),
          e ? this._weekdaysStrictRegex : this._weekdaysRegex)
        : (c(this, "_weekdaysRegex") || (this._weekdaysRegex = Ke),
          this._weekdaysStrictRegex && e
            ? this._weekdaysStrictRegex
            : this._weekdaysRegex);
    }),
    (w.weekdaysShortRegex = function (e) {
      return this._weekdaysParseExact
        ? (c(this, "_weekdaysRegex") || nt.call(this),
          e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
        : (c(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = et),
          this._weekdaysShortStrictRegex && e
            ? this._weekdaysShortStrictRegex
            : this._weekdaysShortRegex);
    }),
    (w.weekdaysMinRegex = function (e) {
      return this._weekdaysParseExact
        ? (c(this, "_weekdaysRegex") || nt.call(this),
          e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
        : (c(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = tt),
          this._weekdaysMinStrictRegex && e
            ? this._weekdaysMinStrictRegex
            : this._weekdaysMinRegex);
    }),
    (w.isPM = function (e) {
      return "p" === (e + "").toLowerCase().charAt(0);
    }),
    (w.meridiem = function (e, t, n) {
      return 11 < e ? (n ? "pm" : "PM") : n ? "am" : "AM";
    }),
    ct("en", {
      eras: [
        {
          since: "0001-01-01",
          until: 1 / 0,
          offset: 1,
          name: "Anno Domini",
          narrow: "AD",
          abbr: "AD",
        },
        {
          since: "0000-12-31",
          until: -1 / 0,
          offset: 1,
          name: "Before Christ",
          narrow: "BC",
          abbr: "BC",
        },
      ],
      dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
      ordinal: function (e) {
        var t = e % 10;
        return (
          e +
          (1 === g((e % 100) / 10)
            ? "th"
            : 1 == t
            ? "st"
            : 2 == t
            ? "nd"
            : 3 == t
            ? "rd"
            : "th")
        );
      },
    }),
    (f.lang = e("moment.lang is deprecated. Use moment.locale instead.", ct)),
    (f.langData = e(
      "moment.langData is deprecated. Use moment.localeData instead.",
      mt
    ));
  var _n = Math.abs;
  function yn(e, t, n, s) {
    t = C(t, n);
    return (
      (e._milliseconds += s * t._milliseconds),
      (e._days += s * t._days),
      (e._months += s * t._months),
      e._bubble()
    );
  }
  function gn(e) {
    return e < 0 ? Math.floor(e) : Math.ceil(e);
  }
  function wn(e) {
    return (4800 * e) / 146097;
  }
  function pn(e) {
    return (146097 * e) / 4800;
  }
  function kn(e) {
    return function () {
      return this.as(e);
    };
  }
  (pe = kn("ms")),
    (me = kn("s")),
    (Ce = kn("m")),
    (we = kn("h")),
    (ge = kn("d")),
    (Je = kn("w")),
    (k = kn("M")),
    (_e = kn("Q")),
    (ve = kn("y"));
  function vn(e) {
    return function () {
      return this.isValid() ? this._data[e] : NaN;
    };
  }
  var ye = vn("milliseconds"),
    ke = vn("seconds"),
    Ie = vn("minutes"),
    w = vn("hours"),
    Mn = vn("days"),
    Dn = vn("months"),
    Sn = vn("years");
  var Yn = Math.round,
    On = { ss: 44, s: 45, m: 45, h: 22, d: 26, w: null, M: 11 };
  function bn(e, t, n, s) {
    var i = C(e).abs(),
      r = Yn(i.as("s")),
      a = Yn(i.as("m")),
      o = Yn(i.as("h")),
      u = Yn(i.as("d")),
      l = Yn(i.as("M")),
      h = Yn(i.as("w")),
      i = Yn(i.as("y")),
      r =
        (r <= n.ss ? ["s", r] : r < n.s && ["ss", r]) ||
        (a <= 1 && ["m"]) ||
        (a < n.m && ["mm", a]) ||
        (o <= 1 && ["h"]) ||
        (o < n.h && ["hh", o]) ||
        (u <= 1 && ["d"]) ||
        (u < n.d && ["dd", u]);
    return (
      ((r = (r =
        null != n.w ? r || (h <= 1 && ["w"]) || (h < n.w && ["ww", h]) : r) ||
        (l <= 1 && ["M"]) ||
        (l < n.M && ["MM", l]) ||
        (i <= 1 && ["y"]) || ["yy", i])[2] = t),
      (r[3] = 0 < +e),
      (r[4] = s),
      function (e, t, n, s, i) {
        return i.relativeTime(t || 1, !!n, e, s);
      }.apply(null, r)
    );
  }
  var xn = Math.abs;
  function Tn(e) {
    return (0 < e) - (e < 0) || +e;
  }
  function Nn() {
    if (!this.isValid()) return this.localeData().invalidDate();
    var e,
      t,
      n,
      s,
      i,
      r,
      a,
      o = xn(this._milliseconds) / 1e3,
      u = xn(this._days),
      l = xn(this._months),
      h = this.asSeconds();
    return h
      ? ((e = y(o / 60)),
        (t = y(e / 60)),
        (o %= 60),
        (e %= 60),
        (n = y(l / 12)),
        (l %= 12),
        (s = o ? o.toFixed(3).replace(/\.?0+$/, "") : ""),
        (i = Tn(this._months) !== Tn(h) ? "-" : ""),
        (r = Tn(this._days) !== Tn(h) ? "-" : ""),
        (a = Tn(this._milliseconds) !== Tn(h) ? "-" : ""),
        (h < 0 ? "-" : "") +
          "P" +
          (n ? i + n + "Y" : "") +
          (l ? i + l + "M" : "") +
          (u ? r + u + "D" : "") +
          (t || e || o ? "T" : "") +
          (t ? a + t + "H" : "") +
          (e ? a + e + "M" : "") +
          (o ? a + s + "S" : ""))
      : "P0D";
  }
  var U = Ct.prototype;
  return (
    (U.isValid = function () {
      return this._isValid;
    }),
    (U.abs = function () {
      var e = this._data;
      return (
        (this._milliseconds = _n(this._milliseconds)),
        (this._days = _n(this._days)),
        (this._months = _n(this._months)),
        (e.milliseconds = _n(e.milliseconds)),
        (e.seconds = _n(e.seconds)),
        (e.minutes = _n(e.minutes)),
        (e.hours = _n(e.hours)),
        (e.months = _n(e.months)),
        (e.years = _n(e.years)),
        this
      );
    }),
    (U.add = function (e, t) {
      return yn(this, e, t, 1);
    }),
    (U.subtract = function (e, t) {
      return yn(this, e, t, -1);
    }),
    (U.as = function (e) {
      if (!this.isValid()) return NaN;
      var t,
        n,
        s = this._milliseconds;
      if ("month" === (e = _(e)) || "quarter" === e || "year" === e)
        switch (((t = this._days + s / 864e5), (n = this._months + wn(t)), e)) {
          case "month":
            return n;
          case "quarter":
            return n / 3;
          case "year":
            return n / 12;
        }
      else
        switch (((t = this._days + Math.round(pn(this._months))), e)) {
          case "week":
            return t / 7 + s / 6048e5;
          case "day":
            return t + s / 864e5;
          case "hour":
            return 24 * t + s / 36e5;
          case "minute":
            return 1440 * t + s / 6e4;
          case "second":
            return 86400 * t + s / 1e3;
          case "millisecond":
            return Math.floor(864e5 * t) + s;
          default:
            throw new Error("Unknown unit " + e);
        }
    }),
    (U.asMilliseconds = pe),
    (U.asSeconds = me),
    (U.asMinutes = Ce),
    (U.asHours = we),
    (U.asDays = ge),
    (U.asWeeks = Je),
    (U.asMonths = k),
    (U.asQuarters = _e),
    (U.asYears = ve),
    (U.valueOf = function () {
      return this.isValid()
        ? this._milliseconds +
            864e5 * this._days +
            (this._months % 12) * 2592e6 +
            31536e6 * g(this._months / 12)
        : NaN;
    }),
    (U._bubble = function () {
      var e = this._milliseconds,
        t = this._days,
        n = this._months,
        s = this._data;
      return (
        (0 <= e && 0 <= t && 0 <= n) ||
          (e <= 0 && t <= 0 && n <= 0) ||
          ((e += 864e5 * gn(pn(n) + t)), (n = t = 0)),
        (s.milliseconds = e % 1e3),
        (e = y(e / 1e3)),
        (s.seconds = e % 60),
        (e = y(e / 60)),
        (s.minutes = e % 60),
        (e = y(e / 60)),
        (s.hours = e % 24),
        (t += y(e / 24)),
        (n += e = y(wn(t))),
        (t -= gn(pn(e))),
        (e = y(n / 12)),
        (n %= 12),
        (s.days = t),
        (s.months = n),
        (s.years = e),
        this
      );
    }),
    (U.clone = function () {
      return C(this);
    }),
    (U.get = function (e) {
      return (e = _(e)), this.isValid() ? this[e + "s"]() : NaN;
    }),
    (U.milliseconds = ye),
    (U.seconds = ke),
    (U.minutes = Ie),
    (U.hours = w),
    (U.days = Mn),
    (U.weeks = function () {
      return y(this.days() / 7);
    }),
    (U.months = Dn),
    (U.years = Sn),
    (U.humanize = function (e, t) {
      if (!this.isValid()) return this.localeData().invalidDate();
      var n = !1,
        s = On;
      return (
        "object" == typeof e && ((t = e), (e = !1)),
        "boolean" == typeof e && (n = e),
        "object" == typeof t &&
          ((s = Object.assign({}, On, t)),
          null != t.s && null == t.ss && (s.ss = t.s - 1)),
        (e = this.localeData()),
        (t = bn(this, !n, s, e)),
        n && (t = e.pastFuture(+this, t)),
        e.postformat(t)
      );
    }),
    (U.toISOString = Nn),
    (U.toString = Nn),
    (U.toJSON = Nn),
    (U.locale = Xt),
    (U.localeData = Kt),
    (U.toIsoString = e(
      "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
      Nn
    )),
    (U.lang = Xe),
    s("X", 0, 0, "unix"),
    s("x", 0, 0, "valueOf"),
    v("x", De),
    v("X", /[+-]?\d+(\.\d{1,3})?/),
    D("X", function (e, t, n) {
      n._d = new Date(1e3 * parseFloat(e));
    }),
    D("x", function (e, t, n) {
      n._d = new Date(g(e));
    }),
    (f.version = "2.29.4"),
    (H = W),
    (f.fn = i),
    (f.min = function () {
      return Rt("isBefore", [].slice.call(arguments, 0));
    }),
    (f.max = function () {
      return Rt("isAfter", [].slice.call(arguments, 0));
    }),
    (f.now = function () {
      return Date.now ? Date.now() : +new Date();
    }),
    (f.utc = l),
    (f.unix = function (e) {
      return W(1e3 * e);
    }),
    (f.months = function (e, t) {
      return fn(e, t, "months");
    }),
    (f.isDate = V),
    (f.locale = ct),
    (f.invalid = I),
    (f.duration = C),
    (f.isMoment = h),
    (f.weekdays = function (e, t, n) {
      return mn(e, t, n, "weekdays");
    }),
    (f.parseZone = function () {
      return W.apply(null, arguments).parseZone();
    }),
    (f.localeData = mt),
    (f.isDuration = Ut),
    (f.monthsShort = function (e, t) {
      return fn(e, t, "monthsShort");
    }),
    (f.weekdaysMin = function (e, t, n) {
      return mn(e, t, n, "weekdaysMin");
    }),
    (f.defineLocale = ft),
    (f.updateLocale = function (e, t) {
      var n, s;
      return (
        null != t
          ? ((s = ot),
            null != R[e] && null != R[e].parentLocale
              ? R[e].set(X(R[e]._config, t))
              : ((t = X((s = null != (n = dt(e)) ? n._config : s), t)),
                null == n && (t.abbr = e),
                ((s = new K(t)).parentLocale = R[e]),
                (R[e] = s)),
            ct(e))
          : null != R[e] &&
            (null != R[e].parentLocale
              ? ((R[e] = R[e].parentLocale), e === ct() && ct(e))
              : null != R[e] && delete R[e]),
        R[e]
      );
    }),
    (f.locales = function () {
      return ee(R);
    }),
    (f.weekdaysShort = function (e, t, n) {
      return mn(e, t, n, "weekdaysShort");
    }),
    (f.normalizeUnits = _),
    (f.relativeTimeRounding = function (e) {
      return void 0 === e ? Yn : "function" == typeof e && ((Yn = e), !0);
    }),
    (f.relativeTimeThreshold = function (e, t) {
      return (
        void 0 !== On[e] &&
        (void 0 === t ? On[e] : ((On[e] = t), "s" === e && (On.ss = t - 1), !0))
      );
    }),
    (f.calendarFormat = function (e, t) {
      return (e = e.diff(t, "days", !0)) < -6
        ? "sameElse"
        : e < -1
        ? "lastWeek"
        : e < 0
        ? "lastDay"
        : e < 1
        ? "sameDay"
        : e < 2
        ? "nextDay"
        : e < 7
        ? "nextWeek"
        : "sameElse";
    }),
    (f.prototype = i),
    (f.HTML5_FMT = {
      DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
      DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
      DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
      DATE: "YYYY-MM-DD",
      TIME: "HH:mm",
      TIME_SECONDS: "HH:mm:ss",
      TIME_MS: "HH:mm:ss.SSS",
      WEEK: "GGGG-[W]WW",
      MONTH: "YYYY-MM",
    }),
    f
  );
});
!(function (e, d) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? d(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], d)
    : d(e.moment);
})(this, function (e) {
  "use strict";
  return e.defineLocale("da", {
    months:
      "januar_februar_marts_april_maj_juni_juli_august_september_oktober_november_december".split(
        "_"
      ),
    monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
    weekdays: "søndag_mandag_tirsdag_onsdag_torsdag_fredag_lørdag".split("_"),
    weekdaysShort: "søn_man_tir_ons_tor_fre_lør".split("_"),
    weekdaysMin: "sø_ma_ti_on_to_fr_lø".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY HH:mm",
      LLLL: "dddd [d.] D. MMMM YYYY [kl.] HH:mm",
    },
    calendar: {
      sameDay: "[i dag kl.] LT",
      nextDay: "[i morgen kl.] LT",
      nextWeek: "på dddd [kl.] LT",
      lastDay: "[i går kl.] LT",
      lastWeek: "[i] dddd[s kl.] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "om %s",
      past: "%s siden",
      s: "få sekunder",
      ss: "%d sekunder",
      m: "et minut",
      mm: "%d minutter",
      h: "en time",
      hh: "%d timer",
      d: "en dag",
      dd: "%d dage",
      M: "en måned",
      MM: "%d måneder",
      y: "et år",
      yy: "%d år",
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, n) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? n(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], n)
    : n(e.moment);
})(this, function (e) {
  "use strict";
  function n(e, n, t, a) {
    var i = {
      m: ["eine Minute", "einer Minute"],
      h: ["eine Stunde", "einer Stunde"],
      d: ["ein Tag", "einem Tag"],
      dd: [e + " Tage", e + " Tagen"],
      w: ["eine Woche", "einer Woche"],
      M: ["ein Monat", "einem Monat"],
      MM: [e + " Monate", e + " Monaten"],
      y: ["ein Jahr", "einem Jahr"],
      yy: [e + " Jahre", e + " Jahren"],
    };
    return n ? i[t][0] : i[t][1];
  }
  return e.defineLocale("de", {
    months:
      "Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember".split(
        "_"
      ),
    monthsShort:
      "Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.".split("_"),
    monthsParseExact: !0,
    weekdays:
      "Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag".split("_"),
    weekdaysShort: "So._Mo._Di._Mi._Do._Fr._Sa.".split("_"),
    weekdaysMin: "So_Mo_Di_Mi_Do_Fr_Sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D. MMMM YYYY",
      LLL: "D. MMMM YYYY HH:mm",
      LLLL: "dddd, D. MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[heute um] LT [Uhr]",
      sameElse: "L",
      nextDay: "[morgen um] LT [Uhr]",
      nextWeek: "dddd [um] LT [Uhr]",
      lastDay: "[gestern um] LT [Uhr]",
      lastWeek: "[letzten] dddd [um] LT [Uhr]",
    },
    relativeTime: {
      future: "in %s",
      past: "vor %s",
      s: "ein paar Sekunden",
      ss: "%d Sekunden",
      m: n,
      mm: "%d Minuten",
      h: n,
      hh: "%d Stunden",
      d: n,
      dd: n,
      w: n,
      ww: "%d Wochen",
      M: n,
      MM: n,
      y: n,
      yy: n,
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, o) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? o(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], o)
    : o(e.moment);
})(this, function (e) {
  "use strict";
  var o = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split(
      "_"
    ),
    n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
    a = [
      /^ene/i,
      /^feb/i,
      /^mar/i,
      /^abr/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^ago/i,
      /^sep/i,
      /^oct/i,
      /^nov/i,
      /^dic/i,
    ],
    s =
      /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
  return e.defineLocale("es", {
    months:
      "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split(
        "_"
      ),
    monthsShort: function (e, a) {
      return e ? (/-MMM-/.test(a) ? n[e.month()] : o[e.month()]) : o;
    },
    monthsRegex: s,
    monthsShortRegex: s,
    monthsStrictRegex:
      /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
    monthsShortStrictRegex:
      /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
    monthsParse: a,
    longMonthsParse: a,
    shortMonthsParse: a,
    weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
    weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
    weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY H:mm",
      LLLL: "dddd, D [de] MMMM [de] YYYY H:mm",
    },
    calendar: {
      sameDay: function () {
        return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      nextDay: function () {
        return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      nextWeek: function () {
        return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      lastDay: function () {
        return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT";
      },
      lastWeek: function () {
        return (
          "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
        );
      },
      sameElse: "L",
    },
    relativeTime: {
      future: "en %s",
      past: "hace %s",
      s: "unos segundos",
      ss: "%d segundos",
      m: "un minuto",
      mm: "%d minutos",
      h: "una hora",
      hh: "%d horas",
      d: "un día",
      dd: "%d días",
      w: "una semana",
      ww: "%d semanas",
      M: "un mes",
      MM: "%d meses",
      y: "un año",
      yy: "%d años",
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%dº",
    week: { dow: 1, doy: 4 },
    invalidDate: "Fecha inválida",
  });
});
!(function (e, i) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? i(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], i)
    : i(e.moment);
})(this, function (e) {
  "use strict";
  var i =
      /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
    r = [
      /^janv/i,
      /^févr/i,
      /^mars/i,
      /^avr/i,
      /^mai/i,
      /^juin/i,
      /^juil/i,
      /^août/i,
      /^sept/i,
      /^oct/i,
      /^nov/i,
      /^déc/i,
    ];
  return e.defineLocale("fr", {
    months:
      "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split(
        "_"
      ),
    monthsShort:
      "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split(
        "_"
      ),
    monthsRegex: i,
    monthsShortRegex: i,
    monthsStrictRegex:
      /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
    monthsShortStrictRegex:
      /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i,
    monthsParse: r,
    longMonthsParse: r,
    shortMonthsParse: r,
    weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
    weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
    weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[Aujourd’hui à] LT",
      nextDay: "[Demain à] LT",
      nextWeek: "dddd [à] LT",
      lastDay: "[Hier à] LT",
      lastWeek: "dddd [dernier à] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "dans %s",
      past: "il y a %s",
      s: "quelques secondes",
      ss: "%d secondes",
      m: "une minute",
      mm: "%d minutes",
      h: "une heure",
      hh: "%d heures",
      d: "un jour",
      dd: "%d jours",
      w: "une semaine",
      ww: "%d semaines",
      M: "un mois",
      MM: "%d mois",
      y: "un an",
      yy: "%d ans",
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal: function (e, i) {
      switch (i) {
        case "D":
          return e + (1 === e ? "er" : "");
        default:
        case "M":
        case "Q":
        case "DDD":
        case "d":
          return e + (1 === e ? "er" : "e");
        case "w":
        case "W":
          return e + (1 === e ? "re" : "e");
      }
    },
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, o) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? o(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], o)
    : o(e.moment);
})(this, function (e) {
  "use strict";
  return e.defineLocale("it", {
    months:
      "gennaio_febbraio_marzo_aprile_maggio_giugno_luglio_agosto_settembre_ottobre_novembre_dicembre".split(
        "_"
      ),
    monthsShort: "gen_feb_mar_apr_mag_giu_lug_ago_set_ott_nov_dic".split("_"),
    weekdays: "domenica_lunedì_martedì_mercoledì_giovedì_venerdì_sabato".split(
      "_"
    ),
    weekdaysShort: "dom_lun_mar_mer_gio_ven_sab".split("_"),
    weekdaysMin: "do_lu_ma_me_gi_ve_sa".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: function () {
        return (
          "[Oggi a" +
          (this.hours() > 1 ? "lle " : 0 === this.hours() ? " " : "ll'") +
          "]LT"
        );
      },
      nextDay: function () {
        return (
          "[Domani a" +
          (this.hours() > 1 ? "lle " : 0 === this.hours() ? " " : "ll'") +
          "]LT"
        );
      },
      nextWeek: function () {
        return (
          "dddd [a" +
          (this.hours() > 1 ? "lle " : 0 === this.hours() ? " " : "ll'") +
          "]LT"
        );
      },
      lastDay: function () {
        return (
          "[Ieri a" +
          (this.hours() > 1 ? "lle " : 0 === this.hours() ? " " : "ll'") +
          "]LT"
        );
      },
      lastWeek: function () {
        return 0 === this.day()
          ? "[La scorsa] dddd [a" +
              (this.hours() > 1 ? "lle " : 0 === this.hours() ? " " : "ll'") +
              "]LT"
          : "[Lo scorso] dddd [a" +
              (this.hours() > 1 ? "lle " : 0 === this.hours() ? " " : "ll'") +
              "]LT";
      },
      sameElse: "L",
    },
    relativeTime: {
      future: "tra %s",
      past: "%s fa",
      s: "alcuni secondi",
      ss: "%d secondi",
      m: "un minuto",
      mm: "%d minuti",
      h: "un'ora",
      hh: "%d ore",
      d: "un giorno",
      dd: "%d giorni",
      w: "una settimana",
      ww: "%d settimane",
      M: "un mese",
      MM: "%d mesi",
      y: "un anno",
      yy: "%d anni",
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%dº",
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, n) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? n(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], n)
    : n(e.moment);
})(this, function (e) {
  "use strict";
  var n = "jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.".split(
      "_"
    ),
    a = "jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec".split("_"),
    t = [
      /^jan/i,
      /^feb/i,
      /^maart|mrt.?$/i,
      /^apr/i,
      /^mei$/i,
      /^jun[i.]?$/i,
      /^jul[i.]?$/i,
      /^aug/i,
      /^sep/i,
      /^okt/i,
      /^nov/i,
      /^dec/i,
    ],
    r =
      /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
  return e.defineLocale("nl", {
    months:
      "januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december".split(
        "_"
      ),
    monthsShort: function (e, t) {
      return e ? (/-MMM-/.test(t) ? a[e.month()] : n[e.month()]) : n;
    },
    monthsRegex: r,
    monthsShortRegex: r,
    monthsStrictRegex:
      /^(januari|februari|maart|april|mei|ju[nl]i|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex:
      /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    monthsParse: t,
    longMonthsParse: t,
    shortMonthsParse: t,
    weekdays:
      "zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag".split("_"),
    weekdaysShort: "zo._ma._di._wo._do._vr._za.".split("_"),
    weekdaysMin: "zo_ma_di_wo_do_vr_za".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD-MM-YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[vandaag om] LT",
      nextDay: "[morgen om] LT",
      nextWeek: "dddd [om] LT",
      lastDay: "[gisteren om] LT",
      lastWeek: "[afgelopen] dddd [om] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "over %s",
      past: "%s geleden",
      s: "een paar seconden",
      ss: "%d seconden",
      m: "één minuut",
      mm: "%d minuten",
      h: "één uur",
      hh: "%d uur",
      d: "één dag",
      dd: "%d dagen",
      w: "één week",
      ww: "%d weken",
      M: "één maand",
      MM: "%d maanden",
      y: "één jaar",
      yy: "%d jaar",
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal: function (e) {
      return e + (1 === e || 8 === e || e >= 20 ? "ste" : "de");
    },
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, t) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? t(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], t)
    : t(e.moment);
})(this, function (e) {
  "use strict";
  var t =
      "styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień".split(
        "_"
      ),
    i =
      "stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia".split(
        "_"
      ),
    n = [
      /^sty/i,
      /^lut/i,
      /^mar/i,
      /^kwi/i,
      /^maj/i,
      /^cze/i,
      /^lip/i,
      /^sie/i,
      /^wrz/i,
      /^paź/i,
      /^lis/i,
      /^gru/i,
    ];
  function r(e) {
    return e % 10 < 5 && e % 10 > 1 && ~~(e / 10) % 10 != 1;
  }
  function s(e, t, i) {
    var n = e + " ";
    switch (i) {
      case "ss":
        return n + (r(e) ? "sekundy" : "sekund");
      case "m":
        return t ? "minuta" : "minutę";
      case "mm":
        return n + (r(e) ? "minuty" : "minut");
      case "h":
        return t ? "godzina" : "godzinę";
      case "hh":
        return n + (r(e) ? "godziny" : "godzin");
      case "ww":
        return n + (r(e) ? "tygodnie" : "tygodni");
      case "MM":
        return n + (r(e) ? "miesiące" : "miesięcy");
      case "yy":
        return n + (r(e) ? "lata" : "lat");
    }
  }
  return e.defineLocale("pl", {
    months: function (e, n) {
      return e ? (/D MMMM/.test(n) ? i[e.month()] : t[e.month()]) : t;
    },
    monthsShort: "sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru".split("_"),
    monthsParse: n,
    longMonthsParse: n,
    shortMonthsParse: n,
    weekdays:
      "niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota".split("_"),
    weekdaysShort: "ndz_pon_wt_śr_czw_pt_sob".split("_"),
    weekdaysMin: "Nd_Pn_Wt_Śr_Cz_Pt_So".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY HH:mm",
      LLLL: "dddd, D MMMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[Dziś o] LT",
      nextDay: "[Jutro o] LT",
      nextWeek: function () {
        switch (this.day()) {
          case 0:
            return "[W niedzielę o] LT";
          case 2:
            return "[We wtorek o] LT";
          case 3:
            return "[W środę o] LT";
          case 6:
            return "[W sobotę o] LT";
          default:
            return "[W] dddd [o] LT";
        }
      },
      lastDay: "[Wczoraj o] LT",
      lastWeek: function () {
        switch (this.day()) {
          case 0:
            return "[W zeszłą niedzielę o] LT";
          case 3:
            return "[W zeszłą środę o] LT";
          case 6:
            return "[W zeszłą sobotę o] LT";
          default:
            return "[W zeszły] dddd [o] LT";
        }
      },
      sameElse: "L",
    },
    relativeTime: {
      future: "za %s",
      past: "%s temu",
      s: "kilka sekund",
      ss: s,
      m: s,
      mm: s,
      h: s,
      hh: s,
      d: "1 dzień",
      dd: "%d dni",
      w: "tydzień",
      ww: s,
      M: "miesiąc",
      MM: s,
      y: "rok",
      yy: s,
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: "%d.",
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, a) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? a(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], a)
    : a(e.moment);
})(this, function (e) {
  "use strict";
  return e.defineLocale("pt", {
    months:
      "janeiro_fevereiro_março_abril_maio_junho_julho_agosto_setembro_outubro_novembro_dezembro".split(
        "_"
      ),
    monthsShort: "jan_fev_mar_abr_mai_jun_jul_ago_set_out_nov_dez".split("_"),
    weekdays:
      "Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado".split(
        "_"
      ),
    weekdaysShort: "Dom_Seg_Ter_Qua_Qui_Sex_Sáb".split("_"),
    weekdaysMin: "Do_2ª_3ª_4ª_5ª_6ª_Sá".split("_"),
    weekdaysParseExact: !0,
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD/MM/YYYY",
      LL: "D [de] MMMM [de] YYYY",
      LLL: "D [de] MMMM [de] YYYY HH:mm",
      LLLL: "dddd, D [de] MMMM [de] YYYY HH:mm",
    },
    calendar: {
      sameDay: "[Hoje às] LT",
      nextDay: "[Amanhã às] LT",
      nextWeek: "dddd [às] LT",
      lastDay: "[Ontem às] LT",
      lastWeek: function () {
        return 0 === this.day() || 6 === this.day()
          ? "[Último] dddd [às] LT"
          : "[Última] dddd [às] LT";
      },
      sameElse: "L",
    },
    relativeTime: {
      future: "em %s",
      past: "há %s",
      s: "segundos",
      ss: "%d segundos",
      m: "um minuto",
      mm: "%d minutos",
      h: "uma hora",
      hh: "%d horas",
      d: "um dia",
      dd: "%d dias",
      w: "uma semana",
      ww: "%d semanas",
      M: "um mês",
      MM: "%d meses",
      y: "um ano",
      yy: "%d anos",
    },
    dayOfMonthOrdinalParse: /\d{1,2}º/,
    ordinal: "%dº",
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, _) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? _(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], _)
    : _(e.moment);
})(this, function (e) {
  "use strict";
  function _(e, _, t) {
    var d, s;
    return "m" === t
      ? _
        ? "минута"
        : "минуту"
      : e +
          " " +
          ((d = +e),
          (s = {
            ss: _ ? "секунда_секунды_секунд" : "секунду_секунды_секунд",
            mm: _ ? "минута_минуты_минут" : "минуту_минуты_минут",
            hh: "час_часа_часов",
            dd: "день_дня_дней",
            ww: "неделя_недели_недель",
            MM: "месяц_месяца_месяцев",
            yy: "год_года_лет",
          }[t].split("_")),
          d % 10 == 1 && d % 100 != 11
            ? s[0]
            : d % 10 >= 2 && d % 10 <= 4 && (d % 100 < 10 || d % 100 >= 20)
            ? s[1]
            : s[2]);
  }
  var t = [
    /^янв/i,
    /^фев/i,
    /^мар/i,
    /^апр/i,
    /^ма[йя]/i,
    /^июн/i,
    /^июл/i,
    /^авг/i,
    /^сен/i,
    /^окт/i,
    /^ноя/i,
    /^дек/i,
  ];
  return e.defineLocale("ru", {
    months: {
      format:
        "января_февраля_марта_апреля_мая_июня_июля_августа_сентября_октября_ноября_декабря".split(
          "_"
        ),
      standalone:
        "январь_февраль_март_апрель_май_июнь_июль_август_сентябрь_октябрь_ноябрь_декабрь".split(
          "_"
        ),
    },
    monthsShort: {
      format:
        "янв._февр._мар._апр._мая_июня_июля_авг._сент._окт._нояб._дек.".split(
          "_"
        ),
      standalone:
        "янв._февр._март_апр._май_июнь_июль_авг._сент._окт._нояб._дек.".split(
          "_"
        ),
    },
    weekdays: {
      standalone:
        "воскресенье_понедельник_вторник_среда_четверг_пятница_суббота".split(
          "_"
        ),
      format:
        "воскресенье_понедельник_вторник_среду_четверг_пятницу_субботу".split(
          "_"
        ),
      isFormat: /\[ ?[Вв] ?(?:прошлую|следующую|эту)? ?] ?dddd/,
    },
    weekdaysShort: "вс_пн_вт_ср_чт_пт_сб".split("_"),
    weekdaysMin: "вс_пн_вт_ср_чт_пт_сб".split("_"),
    monthsParse: t,
    longMonthsParse: t,
    shortMonthsParse: t,
    monthsRegex:
      /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    monthsShortRegex:
      /^(январ[ья]|янв\.?|феврал[ья]|февр?\.?|марта?|мар\.?|апрел[ья]|апр\.?|ма[йя]|июн[ья]|июн\.?|июл[ья]|июл\.?|августа?|авг\.?|сентябр[ья]|сент?\.?|октябр[ья]|окт\.?|ноябр[ья]|нояб?\.?|декабр[ья]|дек\.?)/i,
    monthsStrictRegex:
      /^(январ[яь]|феврал[яь]|марта?|апрел[яь]|ма[яй]|июн[яь]|июл[яь]|августа?|сентябр[яь]|октябр[яь]|ноябр[яь]|декабр[яь])/i,
    monthsShortStrictRegex:
      /^(янв\.|февр?\.|мар[т.]|апр\.|ма[яй]|июн[ья.]|июл[ья.]|авг\.|сент?\.|окт\.|нояб?\.|дек\.)/i,
    longDateFormat: {
      LT: "H:mm",
      LTS: "H:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY г.",
      LLL: "D MMMM YYYY г., H:mm",
      LLLL: "dddd, D MMMM YYYY г., H:mm",
    },
    calendar: {
      sameDay: "[Сегодня, в] LT",
      nextDay: "[Завтра, в] LT",
      lastDay: "[Вчера, в] LT",
      nextWeek: function (e) {
        if (e.week() === this.week())
          return 2 === this.day() ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
        switch (this.day()) {
          case 0:
            return "[В следующее] dddd, [в] LT";
          case 1:
          case 2:
          case 4:
            return "[В следующий] dddd, [в] LT";
          case 3:
          case 5:
          case 6:
            return "[В следующую] dddd, [в] LT";
        }
      },
      lastWeek: function (e) {
        if (e.week() === this.week())
          return 2 === this.day() ? "[Во] dddd, [в] LT" : "[В] dddd, [в] LT";
        switch (this.day()) {
          case 0:
            return "[В прошлое] dddd, [в] LT";
          case 1:
          case 2:
          case 4:
            return "[В прошлый] dddd, [в] LT";
          case 3:
          case 5:
          case 6:
            return "[В прошлую] dddd, [в] LT";
        }
      },
      sameElse: "L",
    },
    relativeTime: {
      future: "через %s",
      past: "%s назад",
      s: "несколько секунд",
      ss: _,
      m: _,
      mm: _,
      h: "час",
      hh: _,
      d: "день",
      dd: _,
      w: "неделя",
      ww: _,
      M: "месяц",
      MM: _,
      y: "год",
      yy: _,
    },
    meridiemParse: /ночи|утра|дня|вечера/i,
    isPM: function (e) {
      return /^(дня|вечера)$/.test(e);
    },
    meridiem: function (e, _, t) {
      return e < 4 ? "ночи" : e < 12 ? "утра" : e < 17 ? "дня" : "вечера";
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го|я)/,
    ordinal: function (e, _) {
      switch (_) {
        case "M":
        case "d":
        case "DDD":
          return e + "-й";
        case "D":
          return e + "-го";
        case "w":
        case "W":
          return e + "-я";
        default:
          return e;
      }
    },
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, d) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? d(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], d)
    : d(e.moment);
})(this, function (e) {
  "use strict";
  return e.defineLocale("sv", {
    months:
      "januari_februari_mars_april_maj_juni_juli_augusti_september_oktober_november_december".split(
        "_"
      ),
    monthsShort: "jan_feb_mar_apr_maj_jun_jul_aug_sep_okt_nov_dec".split("_"),
    weekdays: "söndag_måndag_tisdag_onsdag_torsdag_fredag_lördag".split("_"),
    weekdaysShort: "sön_mån_tis_ons_tor_fre_lör".split("_"),
    weekdaysMin: "sö_må_ti_on_to_fr_lö".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "YYYY-MM-DD",
      LL: "D MMMM YYYY",
      LLL: "D MMMM YYYY [kl.] HH:mm",
      LLLL: "dddd D MMMM YYYY [kl.] HH:mm",
      lll: "D MMM YYYY HH:mm",
      llll: "ddd D MMM YYYY HH:mm",
    },
    calendar: {
      sameDay: "[Idag] LT",
      nextDay: "[Imorgon] LT",
      lastDay: "[Igår] LT",
      nextWeek: "[På] dddd LT",
      lastWeek: "[I] dddd[s] LT",
      sameElse: "L",
    },
    relativeTime: {
      future: "om %s",
      past: "för %s sedan",
      s: "några sekunder",
      ss: "%d sekunder",
      m: "en minut",
      mm: "%d minuter",
      h: "en timme",
      hh: "%d timmar",
      d: "en dag",
      dd: "%d dagar",
      M: "en månad",
      MM: "%d månader",
      y: "ett år",
      yy: "%d år",
    },
    dayOfMonthOrdinalParse: /\d{1,2}(\:e|\:a)/,
    ordinal: function (e) {
      var d = e % 10;
      return (
        e + (1 == ~~((e % 100) / 10) ? ":e" : 1 === d || 2 === d ? ":a" : ":e")
      );
    },
    week: { dow: 1, doy: 4 },
  });
});
!(function (e, _) {
  "object" == typeof exports &&
  "undefined" != typeof module &&
  "function" == typeof require
    ? _(require("../moment"))
    : "function" == typeof define && define.amd
    ? define(["../moment"], _)
    : _(e.moment);
})(this, function (e) {
  "use strict";
  function _(e, _, t) {
    var n, i;
    return "m" === t
      ? _
        ? "хвилина"
        : "хвилину"
      : "h" === t
      ? _
        ? "година"
        : "годину"
      : e +
        " " +
        ((n = +e),
        (i = {
          ss: _ ? "секунда_секунди_секунд" : "секунду_секунди_секунд",
          mm: _ ? "хвилина_хвилини_хвилин" : "хвилину_хвилини_хвилин",
          hh: _ ? "година_години_годин" : "годину_години_годин",
          dd: "день_дні_днів",
          MM: "місяць_місяці_місяців",
          yy: "рік_роки_років",
        }[t].split("_")),
        n % 10 == 1 && n % 100 != 11
          ? i[0]
          : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
          ? i[1]
          : i[2]);
  }
  function t(e) {
    return function () {
      return e + "о" + (11 === this.hours() ? "б" : "") + "] LT";
    };
  }
  return e.defineLocale("uk", {
    months: {
      format:
        "січня_лютого_березня_квітня_травня_червня_липня_серпня_вересня_жовтня_листопада_грудня".split(
          "_"
        ),
      standalone:
        "січень_лютий_березень_квітень_травень_червень_липень_серпень_вересень_жовтень_листопад_грудень".split(
          "_"
        ),
    },
    monthsShort: "січ_лют_бер_квіт_трав_черв_лип_серп_вер_жовт_лист_груд".split(
      "_"
    ),
    weekdays: function (e, _) {
      var t = {
        nominative:
          "неділя_понеділок_вівторок_середа_четвер_п’ятниця_субота".split("_"),
        accusative:
          "неділю_понеділок_вівторок_середу_четвер_п’ятницю_суботу".split("_"),
        genitive:
          "неділі_понеділка_вівторка_середи_четверга_п’ятниці_суботи".split(
            "_"
          ),
      };
      return !0 === e
        ? t.nominative.slice(1, 7).concat(t.nominative.slice(0, 1))
        : e
        ? t[
            /(\[[ВвУу]\]) ?dddd/.test(_)
              ? "accusative"
              : /\[?(?:минулої|наступної)? ?\] ?dddd/.test(_)
              ? "genitive"
              : "nominative"
          ][e.day()]
        : t.nominative;
    },
    weekdaysShort: "нд_пн_вт_ср_чт_пт_сб".split("_"),
    weekdaysMin: "нд_пн_вт_ср_чт_пт_сб".split("_"),
    longDateFormat: {
      LT: "HH:mm",
      LTS: "HH:mm:ss",
      L: "DD.MM.YYYY",
      LL: "D MMMM YYYY р.",
      LLL: "D MMMM YYYY р., HH:mm",
      LLLL: "dddd, D MMMM YYYY р., HH:mm",
    },
    calendar: {
      sameDay: t("[Сьогодні "),
      nextDay: t("[Завтра "),
      lastDay: t("[Вчора "),
      nextWeek: t("[У] dddd ["),
      lastWeek: function () {
        switch (this.day()) {
          case 0:
          case 3:
          case 5:
          case 6:
            return t("[Минулої] dddd [").call(this);
          case 1:
          case 2:
          case 4:
            return t("[Минулого] dddd [").call(this);
        }
      },
      sameElse: "L",
    },
    relativeTime: {
      future: "за %s",
      past: "%s тому",
      s: "декілька секунд",
      ss: _,
      m: _,
      mm: _,
      h: "годину",
      hh: _,
      d: "день",
      dd: _,
      M: "місяць",
      MM: _,
      y: "рік",
      yy: _,
    },
    meridiemParse: /ночі|ранку|дня|вечора/,
    isPM: function (e) {
      return /^(дня|вечора)$/.test(e);
    },
    meridiem: function (e, _, t) {
      return e < 4 ? "ночі" : e < 12 ? "ранку" : e < 17 ? "дня" : "вечора";
    },
    dayOfMonthOrdinalParse: /\d{1,2}-(й|го)/,
    ordinal: function (e, _) {
      switch (_) {
        case "M":
        case "d":
        case "DDD":
        case "w":
        case "W":
          return e + "-й";
        case "D":
          return e + "-го";
        default:
          return e;
      }
    },
    week: { dow: 1, doy: 7 },
  });
});
window.EventBus = new Vue();
if ("moment" in window && "user" in window) {
  moment.locale(window.user.lang);
}
Vue.filter("upper", function (value) {
  return value.toUpperCase();
});
Vue.filter("lower", function (value) {
  return value.toLowerCase();
});
Vue.filter("hdate", (value) => {
  return new Date(value * 1000).toLocaleDateString();
});
Vue.filter("hdatetime", function (value, format = "DD/MM/YYYY HH:mm:ss") {
  return moment(value * 1000).format(format);
});
Vue.filter(
  "fromNow",
  function (value, numberOfSecondsFromWhichWeSwitchToNormalDate = null) {
    if (
      null === numberOfSecondsFromWhichWeSwitchToNormalDate ||
      Math.floor(Date.now() / 1000) - value <
        numberOfSecondsFromWhichWeSwitchToNormalDate
    ) {
      let date = moment(value * 1000);
      if (date.isSame(moment().subtract(1, "days").startOf("day"), "d")) {
        return date.calendar().split(" ")[0];
      }
      return date.fromNow();
    }
    return Vue.filter("hdatetime")(value);
  }
);
Vue.filter("formattedDate", function (value, numberOfSecondsSwitch = null) {
  let date = moment(value * 1000);
  if (
    null === numberOfSecondsSwitch ||
    (Math.floor(Date.now() / 1000) - value < numberOfSecondsSwitch &&
      value - Math.floor(Date.now() / 1000) < numberOfSecondsSwitch)
  ) {
    return date.from(new Date().setUTCHours(0, 0, 0, 0));
  }
  return date.format("D MMMM YYYY");
});
Vue.filter("date_format", function (value, format = null) {
  if (null === format) {
    return new Date(value * 1000).toLocaleString();
  }
  return moment(value * 1000)
    .format(format)
    .replace("º", "");
});
Vue.filter("toFixed", (value, decimals = 2) => {
  return parseFloat(value).toFixed(decimals);
});
Vue.filter("br2nl", (value) => {
  const regex = new RegExp("<brs*/?>", "gi");
  return value.replace(regex, "");
});
Vue.filter("number_format", function (value, decimal) {
  return parseFloat(value).toFixed(decimal);
});
Vue.filter("intl_format", function (value, decimals = null) {
  const f = new Intl.NumberFormat(
    undefined,
    decimals ? { minimumFractionDigits: decimals } : undefined
  );
  return f.format(value);
});
Vue.filter("sprintf", function (string, ...arguments) {
  return vsprintf(string, arguments);
});
Vue.filter("capitalize", (value) => {
  if (!value) {
    return "";
  }
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});
Vue.filter("convert_to_eur", function (value, fromCurrency, decimal) {
  return parseFloat(value / fromCurrency.tx_real).toFixed(decimal);
});
Vue.filter("currency_convert", function (value, canFormat = true, decimal = 2) {
  const convertedValue = (
    parseFloat(value) * window.user.currency.rate
  ).toFixed(decimal);
  if (!canFormat) {
    return convertedValue;
  }
  return Vue.filter("currency_format")(convertedValue, decimal);
});
Vue.filter("currency_format", function (value, decimal = 2) {
  return sprintf(
    window.user.currency.format,
    parseFloat(value).toFixed(decimal)
  ).replace(".00", "");
});
Vue.filter("currency_format_with_symbol", function (string, price) {
  if (string.includes("%s")) {
    string = string.replace("%s", price);
    return string.includes("<span>")
      ? string.replaceAll(/<span>|<\/span>/g, "")
      : string;
  }
});
Vue.filter("decode_htmlentities", function (encodedString) {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString;
  var find = "&lt;br /&gt;";
  var regexp = new RegExp(find, "g");
  textArea.innerHTML = textArea.innerHTML.replace(regexp, "");
  return textArea.innerHTML;
});
Vue.filter("product_url", function (product) {
  let seoName = product.seo_name;
  if (
    seoName === undefined &&
    product.product_langs &&
    product.product_langs[window.user.lang]
  ) {
    seoName = product.product_langs[window.user.lang].seo_name;
  }
  return (
    "/" +
    window.user.lang +
    "/" +
    (product.prod_id || product.product_id) +
    "-" +
    window.globalLangs["_URL_BUY_"] +
    "-" +
    seoName +
    "/"
  );
});
Vue.filter("product_cover_url", function (productId, size, timestamp) {
  return (
    window.URLS["CDN"] +
    `images/products/${productId}/${size}/${productId}-cover.jpg?v=${timestamp}`
  );
});
Vue.filter("product_video_url", function (productId, size, seoName, timestamp) {
  return (
    window.URLS["CDN"] +
    `videos/products/${productId}/${size}/${seoName}-preview.webm?v=${timestamp}`
  );
});
Vue.filter("product_cover_title", function (product) {
  if (!("name" in product)) {
    return "";
  }
  let title = product.name;
  if ("type" in product && product.type !== "Other") {
    title = title + " " + product.type;
  }
  if ("price" in product && parseFloat(product.price) > 0) {
    title = title + " " + this.currency_format(product.price);
  }
  return title;
});
Vue.filter("user_profile_url", function (user) {
  return "/" + window.user.lang + "/user/" + user.custom_rname;
});
Vue.directive("uppercase", function (el, binding) {
  el.addEventListener("input", function () {
    this.value = el.value.toUpperCase();
  });
});
Vue.directive("decode-htmlentities", function (el, encodedString) {
  var textArea = document.createElement("textarea");
  textArea.innerHTML = encodedString.value;
  el.value = textArea.innerHTML;
});
var Mixins = {
  resettable: {
    methods: {
      resetData(fields = null) {
        if (fields) {
          if (typeof fields === "string") fields = [fields];
          const fresh_data = this.$options.data.call(this);
          fields.forEach((field) => {
            Vue.set(this, field, fresh_data[field]);
          });
        } else {
          Object.assign(this, this.$options.data.call(this));
        }
      },
    },
  },
  usid: {
    methods: {
      getUsid() {
        return $("meta[name=ig-usid]").attr("content");
      },
    },
  },
  map: {
    methods: {
      orderBy(data, attributeName, isAsc = true) {
        return Object.values(data).sort((left, right) => {
          if (left[attributeName] == null || right[attributeName] == null)
            return -1;
          const leftValue = left[attributeName].trimLeft(),
            rightValue = right[attributeName].trimLeft();
          return leftValue == rightValue
            ? 0
            : leftValue < rightValue
            ? isAsc
              ? -1
              : 1
            : isAsc
            ? 1
            : -1;
        });
      },
    },
  },
  objects: {
    methods: {
      areObjectsEqual(obj1, obj2) {
        const obj1Keys = Object.keys(obj1);
        const obj2Keys = Object.keys(obj2);
        if (obj1Keys.length !== obj2Keys.length) return false;
        for (let objKey of obj1Keys) {
          if (obj1[objKey] !== obj2[objKey]) return false;
        }
        return true;
      },
      isObjectEmpty(obj) {
        if (obj instanceof Object) return Object.keys(obj).length === 0;
      },
    },
  },
  strings: {
    methods: {
      isStringEmpty(string) {
        string = String(string);
        return (
          string === undefined ||
          string === null ||
          string === "null" ||
          string.trim() === ""
        );
      },
      sanitize(string) {
        if (!string) {
          return "";
        }
        const mapping = [
          {
            base: "A",
            letters:
              /[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g,
          },
          { base: "AA", letters: /[\uA732]/g },
          { base: "AE", letters: /[\u00C6\u01FC\u01E2]/g },
          { base: "AO", letters: /[\uA734]/g },
          { base: "AU", letters: /[\uA736]/g },
          { base: "AV", letters: /[\uA738\uA73A]/g },
          { base: "AY", letters: /[\uA73C]/g },
          {
            base: "B",
            letters:
              /[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g,
          },
          {
            base: "C",
            letters:
              /[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g,
          },
          {
            base: "D",
            letters:
              /[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g,
          },
          { base: "DZ", letters: /[\u01F1\u01C4]/g },
          { base: "Dz", letters: /[\u01F2\u01C5]/g },
          {
            base: "E",
            letters:
              /[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g,
          },
          { base: "F", letters: /[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g },
          {
            base: "G",
            letters:
              /[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g,
          },
          {
            base: "H",
            letters:
              /[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g,
          },
          {
            base: "I",
            letters:
              /[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g,
          },
          { base: "J", letters: /[\u004A\u24BF\uFF2A\u0134\u0248]/g },
          {
            base: "K",
            letters:
              /[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g,
          },
          {
            base: "L",
            letters:
              /[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g,
          },
          { base: "LJ", letters: /[\u01C7]/g },
          { base: "Lj", letters: /[\u01C8]/g },
          {
            base: "M",
            letters: /[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g,
          },
          {
            base: "N",
            letters:
              /[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g,
          },
          { base: "NJ", letters: /[\u01CA]/g },
          { base: "Nj", letters: /[\u01CB]/g },
          {
            base: "O",
            letters:
              /[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g,
          },
          { base: "OI", letters: /[\u01A2]/g },
          { base: "OO", letters: /[\uA74E]/g },
          { base: "OU", letters: /[\u0222]/g },
          {
            base: "P",
            letters:
              /[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g,
          },
          { base: "Q", letters: /[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g },
          {
            base: "R",
            letters:
              /[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g,
          },
          {
            base: "S",
            letters:
              /[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g,
          },
          {
            base: "T",
            letters:
              /[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g,
          },
          { base: "TZ", letters: /[\uA728]/g },
          {
            base: "U",
            letters:
              /[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g,
          },
          {
            base: "V",
            letters: /[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g,
          },
          { base: "VY", letters: /[\uA760]/g },
          {
            base: "W",
            letters:
              /[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g,
          },
          { base: "X", letters: /[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g },
          {
            base: "Y",
            letters:
              /[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g,
          },
          {
            base: "Z",
            letters:
              /[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g,
          },
          {
            base: "a",
            letters:
              /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g,
          },
          { base: "aa", letters: /[\uA733]/g },
          { base: "ae", letters: /[\u00E6\u01FD\u01E3]/g },
          { base: "ao", letters: /[\uA735]/g },
          { base: "au", letters: /[\uA737]/g },
          { base: "av", letters: /[\uA739\uA73B]/g },
          { base: "ay", letters: /[\uA73D]/g },
          {
            base: "b",
            letters:
              /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g,
          },
          {
            base: "c",
            letters:
              /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g,
          },
          {
            base: "d",
            letters:
              /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g,
          },
          { base: "dz", letters: /[\u01F3\u01C6]/g },
          {
            base: "e",
            letters:
              /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g,
          },
          { base: "f", letters: /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g },
          {
            base: "g",
            letters:
              /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g,
          },
          {
            base: "h",
            letters:
              /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g,
          },
          { base: "hv", letters: /[\u0195]/g },
          {
            base: "i",
            letters:
              /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g,
          },
          { base: "j", letters: /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g },
          {
            base: "k",
            letters:
              /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g,
          },
          {
            base: "l",
            letters:
              /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g,
          },
          { base: "lj", letters: /[\u01C9]/g },
          {
            base: "m",
            letters: /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g,
          },
          {
            base: "n",
            letters:
              /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g,
          },
          { base: "nj", letters: /[\u01CC]/g },
          {
            base: "o",
            letters:
              /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g,
          },
          { base: "oi", letters: /[\u01A3]/g },
          { base: "ou", letters: /[\u0223]/g },
          { base: "oo", letters: /[\uA74F]/g },
          {
            base: "p",
            letters:
              /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g,
          },
          { base: "q", letters: /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g },
          {
            base: "r",
            letters:
              /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g,
          },
          {
            base: "s",
            letters:
              /[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g,
          },
          {
            base: "t",
            letters:
              /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g,
          },
          { base: "tz", letters: /[\uA729]/g },
          {
            base: "u",
            letters:
              /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g,
          },
          {
            base: "v",
            letters: /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g,
          },
          { base: "vy", letters: /[\uA761]/g },
          {
            base: "w",
            letters:
              /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g,
          },
          { base: "x", letters: /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g },
          {
            base: "y",
            letters:
              /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g,
          },
          {
            base: "z",
            letters:
              /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g,
          },
        ];
        for (let i = 0; i < mapping.length; i++) {
          string = string.replace(mapping[i].letters, mapping[i].base);
        }
        return string.replace(/[^a-zA-Z\d\s]/g, " ").replace(/\s\s+/g, " ");
      },
    },
  },
  fancyboxModal: {
    methods: {
      showModal(id, options = null) {
        let parameters = {
          src: "#" + id,
          animationDuration: 0,
          touch: false,
          afterShow: function () {
            document
              .getElementsByClassName("fancybox-overlay")[0]
              .addEventListener("mousedown", function (event) {
                if (event.target.classList.contains("fancybox-overlay")) {
                  jQuery.fancybox.close();
                }
              });
          },
          helpers: { overlay: { closeClick: false } },
        };
        if (null !== options && typeof options === "object") {
          for (let option in options) {
            if (false === parameters.hasOwnProperty(option)) {
              parameters[option] = options[option];
            }
          }
        }
        jQuery.fancybox.open(parameters);
      },
      closeModal() {
        jQuery.fancybox.close();
      },
    },
  },
  effects: {
    methods: {
      scrollTo(selectors) {
        let target = null;
        if (Array.isArray(selectors)) {
          let container = document.querySelectorAll(selectors.join(", "));
          if (container.length === 0) {
            return;
          }
          target = container[0];
        } else if (typeof selectors === "string") {
          if (selectors.includes("#")) {
            target = document.getElementById(selectors);
          } else if (selectors.includes(".")) {
            let container = document.getElementsByClassName(selectors);
            if (container.length === 0) {
              return;
            }
            target = container[0];
          }
        }
        if (null !== target) {
          window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
        }
      },
    },
  },
  rendering: {
    methods: {
      onRender(callbackFunction) {
        if (
          null !== callbackFunction &&
          typeof callbackFunction === "function"
        ) {
          this.$nextTick(() => callbackFunction());
        }
      },
    },
  },
  socials: {
    methods: {
      shareOnFacebook(url, text, callback = null) {
        FB.ui(
          { method: "share", href: url, display: "popup", quote: text },
          function (response) {
            if (undefined === response) {
              return;
            }
            if (null !== callback && typeof callback === "function") {
              callback(response, url, text);
            }
          }
        );
      },
      shareOnTwitter(url, text) {
        const twitterUrl =
          "https://twitter.com/intent/tweet?" +
          "text=" +
          encodeURIComponent(
            text.length > 278 ? text.substr(0, 277) + "..." : text
          ) +
          "&url=" +
          encodeURIComponent(url);
        if (window.isMobile) {
          window.location = twitterUrl;
        } else {
          window.open(twitterUrl);
        }
      },
      shareOnWhatsapp(text) {
        let baseUrl = "https://api.whatsapp.com/";
        if (window.isMobile) {
          baseUrl = "whatsapp://";
        }
        const url = baseUrl + "send?text=" + text;
        if (window.isMobile) {
          window.location = url;
        } else {
          window.open(url);
        }
      },
    },
  },
  copy: {
    methods: {
      copyPaste(text = null) {
        if (null !== text) {
          const $textarea = $('<textarea style="width: 1px; height: 1px">')
            .val(text)
            .appendTo(document.body);
          $textarea.select();
          try {
            document.execCommand("copy");
          } catch (error) {
            alert("There was an error copying the text.");
          }
          $textarea.remove();
          return false;
        }
      },
    },
  },
  debug: {
    methods: {
      initDump() {
        let refs = this.$refs;
        for (let name in this.$refs) {
          if (name.startsWith("sf-dump-")) {
            Sfdump(name);
          }
          delete refs[name];
        }
        this.$refs = refs;
      },
    },
  },
  product: {
    data() {
      return { displayablePlatformsIds: ["4", "10", "11", "12"] };
    },
    methods: {
      productIconByPlatform(
        product,
        canNormalizeMultiplePlatformsProducts = true
      ) {
        if (canNormalizeMultiplePlatformsProducts) {
          if (
            product.platforms.includes("Xbox serie X S") ||
            product.platforms.includes("12")
          ) {
            return "xbox-serie-x-s";
          } else if (
            product.platforms.includes("Xbox One") ||
            product.platforms.includes("11")
          ) {
            return "xbox-one";
          } else if (
            product.platforms.includes("Switch") ||
            product.platforms.includes("4")
          ) {
            return "switch";
          }
        }
        return product.type.toLowerCase().replace(/\s|\./g, "-");
      },
      canDisplayPlatformBadge(productPlatforms) {
        return this.displayablePlatformsIds.includes(productPlatforms);
      },
    },
  },
  user: {
    methods: {
      getLoggedUser() {
        return window.user;
      },
    },
  },
  lazyLoadImage: {
    methods: {
      lazyLoadImage(el) {
        if (!el.loaded || el.loaded !== el.getAttribute("data-src")) {
          el.loaded = el.getAttribute("data-src");
          window.lazyLoadImage(el);
        }
        return true;
      },
    },
  },
  tracking: {
    methods: {
      trackEvent(eventCategory, eventAction, eventLabel) {
        if (window.dataLayer) {
          dataLayer.push({
            event: "GAEvent",
            dlEventCategory: eventCategory,
            dlEventAction: eventAction,
            dlEventLabel: eventLabel,
          });
        }
      },
    },
  },
  product_reviews: {
    methods: {
      htmlToText(htmlString) {
        const div = document.createElement("div");
        div.innerHTML = htmlString;
        return div.textContent;
      },
      computeReviewDescription(value) {
        return value
          .replace(/[ \t]+/g, " ")
          .replace(/\n{2,}/g, "\n\n")
          .trimStart();
      },
    },
  },
};
Vue.mixin(Mixins.lazyLoadImage);
Vue.component("ig-loader", {
  template:
    '<div class="loader-container">' +
    '<div class="icon-loading icon-s"></div>' +
    "</div>",
});
Vue.component("ig-alert", {
  delimiters: ["%%", "%%"],
  mixins: [Mixins.resettable],
  props: { timeout: { required: false, validator: Number, default: null } },
  data() {
    return { type: null, message: null, resetDataTimeout: null };
  },
  methods: {
    display(message, type = "success") {
      if (false === ["success", "warn", "info", "error"].includes(type)) {
        type = "success";
      }
      const self = this;
      this.type = type;
      this.message = message;
      if (this.timeout && "success" === type) {
        if (null !== this.resetDataTimeout) {
          clearTimeout(this.resetDataTimeout);
        }
        this.resetDataTimeout = setTimeout(function () {
          self.resetData();
        }, this.timeout);
      }
    },
  },
  template:
    '<transition name="v-transition-fade">' +
    '<div v-if="message" :class="[\'alert\', type]">' +
    '<i class="icon-pencil"></i><span>%% message %%</span>' +
    "</div>" +
    "</transition>",
});
Vue.component("select2", {
  props: {
    options: { type: Array, required: false, default: null },
    value: {},
    id: { type: String, required: false, default: null },
    searchable: { type: Boolean, required: false, default: false },
    isBoolean: { type: Boolean, required: false, default: false },
  },
  mounted: function () {
    const vm = this;
    let data = { data: this.options, width: "style" };
    let lastUpdatedValue;
    if (!this.searchable) {
      data["minimumResultsForSearch"] = -1;
    }
    const $el = $(this.$el);
    $el
      .select2(data)
      .val(this.normalize(this.value))
      .trigger("change")
      .on("change", function (nativeEvent, customEvent) {
        if (
          this.value == lastUpdatedValue ||
          ("undefined" !== typeof customEvent &&
            "isRevert" in customEvent &&
            true === customEvent.isRevert)
        ) {
          return true;
        }
        const value = vm.denormalize(this.value);
        if ("before-change" in vm.$listeners) {
          vm.$emit("before-change", {
            value: value,
            continue: function () {
              lastUpdatedValue = value;
              vm.$emit("input", value);
            },
            revert: function () {
              $el
                .val(vm.normalize(vm.value))
                .trigger("change", { isRevert: true });
            },
          });
        } else {
          lastUpdatedValue = value;
          vm.$emit("input", value);
        }
      })
      .maximizeSelect2Height({ cushion: 40 });
  },
  watch: {
    value: function (newValue, oldValue) {
      if (newValue == oldValue) {
        return false;
      }
      $(this.$el).val(this.normalize(newValue)).trigger("change");
      this.$emit("change", newValue);
    },
    options: function (options) {
      $(this.$el).empty().select2({ data: options });
    },
  },
  destroyed: function () {
    $(this.$el).off().select2("destroy");
  },
  methods: {
    denormalize(value) {
      if (!this.isBoolean) {
        return value;
      }
      if ("true" === value) {
        return true;
      }
      return false;
    },
    normalize(value) {
      if (!this.isBoolean) {
        return value;
      }
      if (value) {
        return "true";
      }
      return "false";
    },
  },
  template:
    "<select" +
    ' :id="id"' +
    " :class=\"['selectable2 manual', { 'searchable': searchable }]\"" +
    ">" +
    "<slot></slot>" +
    "</select>",
});
var GlobalMixins = {
  orderStatuses: {
    data: function () {
      return {
        ORDER_STATUSES: Object.freeze({
          PENDING_PAYMENT: 0,
          DELIVERED: 1,
          CANCELLED: 2,
          REFUNDED: 3,
          REFUSED: 6,
          CHARGEBACK: 7,
          PENDING_VERIFICATION: 8,
          REPLACED: 9,
          PREORDER: 10,
          PENDING_REFUND: 12,
          SOFT_CHARGEBACK: 14,
          POTENTIAL_FRAUD: 15,
          CHARGEBACK_REFUND: 16,
          AUTHORIZED: 17,
          PAYMENT_CAPTURED: 18,
          AUTHORIZATION_VOIDED: 19,
          REFUND_REQUESTED: 20,
          REFUND_REVERSED: 21,
        }),
      };
    },
  },
};
!(function (t, e, n, o) {
  "use strict";
  function i(t, e) {
    var o,
      i,
      a,
      s = [],
      r = 0;
    (t && t.isDefaultPrevented()) ||
      (t.preventDefault(),
      (e = e || {}),
      t && t.data && (e = h(t.data.options, e)),
      (o = e.$target || n(t.currentTarget).trigger("blur")),
      ((a = n.fancybox.getInstance()) && a.$trigger && a.$trigger.is(o)) ||
        (e.selector
          ? (s = n(e.selector))
          : ((i = o.attr("data-fancybox") || ""),
            i
              ? ((s = t.data ? t.data.items : []),
                (s = s.length
                  ? s.filter('[data-fancybox="' + i + '"]')
                  : n('[data-fancybox="' + i + '"]')))
              : (s = [o])),
        (r = n(s).index(o)),
        r < 0 && (r = 0),
        (a = n.fancybox.open(s, e, r)),
        (a.$trigger = o)));
  }
  if (((t.console = t.console || { info: function (t) {} }), n)) {
    if (n.fn.fancybox) return void console.info("fancyBox already initialized");
    var a = {
        closeExisting: !1,
        loop: !1,
        gutter: 50,
        keyboard: !0,
        preventCaptionOverlap: !0,
        arrows: !0,
        infobar: !0,
        smallBtn: "auto",
        toolbar: "auto",
        buttons: ["zoom", "slideShow", "thumbs", "close"],
        idleTime: 3,
        protect: !1,
        modal: !1,
        image: { preload: !1 },
        ajax: { settings: { data: { fancybox: !0 } } },
        iframe: {
          tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
          preload: !0,
          css: {},
          attr: { scrolling: "auto" },
        },
        video: {
          tpl: '<video class="fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
          format: "",
          autoStart: !0,
        },
        defaultType: "image",
        animationEffect: "zoom",
        animationDuration: 366,
        zoomOpacity: "auto",
        transitionEffect: "fade",
        transitionDuration: 366,
        slideClass: "",
        baseClass: "",
        baseTpl:
          '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"><div class="fancybox-caption__body"></div></div></div></div>',
        spinnerTpl: '<div class="fancybox-loading"></div>',
        errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
        btnTpl: {
          download:
            '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
          zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
          close:
            '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
          arrowLeft:
            '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
          arrowRight:
            '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
          smallBtn:
            '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
        },
        parentEl: "body",
        hideScrollbar: !0,
        autoFocus: !0,
        backFocus: !0,
        trapFocus: !0,
        fullScreen: { autoStart: !1 },
        touch: { vertical: !0, momentum: !0 },
        hash: null,
        media: {},
        slideShow: { autoStart: !1, speed: 3e3 },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y",
        },
        wheel: "auto",
        onInit: n.noop,
        beforeLoad: n.noop,
        afterLoad: n.noop,
        beforeShow: n.noop,
        afterShow: n.noop,
        beforeClose: n.noop,
        afterClose: n.noop,
        onActivate: n.noop,
        onDeactivate: n.noop,
        clickContent: function (t, e) {
          return "image" === t.type && "zoom";
        },
        clickSlide: "close",
        clickOutside: "close",
        dblclickContent: !1,
        dblclickSlide: !1,
        dblclickOutside: !1,
        mobile: {
          preventCaptionOverlap: !1,
          idleTime: !1,
          clickContent: function (t, e) {
            return "image" === t.type && "toggleControls";
          },
          clickSlide: function (t, e) {
            return "image" === t.type ? "toggleControls" : "close";
          },
          dblclickContent: function (t, e) {
            return "image" === t.type && "zoom";
          },
          dblclickSlide: function (t, e) {
            return "image" === t.type && "zoom";
          },
        },
        lang: "en",
        i18n: {
          en: {
            CLOSE: "Close",
            NEXT: "Next",
            PREV: "Previous",
            ERROR:
              "The requested content cannot be loaded. <br/> Please try again later.",
            PLAY_START: "Start slideshow",
            PLAY_STOP: "Pause slideshow",
            FULL_SCREEN: "Full screen",
            THUMBS: "Thumbnails",
            DOWNLOAD: "Download",
            SHARE: "Share",
            ZOOM: "Zoom",
          },
          de: {
            CLOSE: "Schlie&szlig;en",
            NEXT: "Weiter",
            PREV: "Zur&uuml;ck",
            ERROR:
              "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.",
            PLAY_START: "Diaschau starten",
            PLAY_STOP: "Diaschau beenden",
            FULL_SCREEN: "Vollbild",
            THUMBS: "Vorschaubilder",
            DOWNLOAD: "Herunterladen",
            SHARE: "Teilen",
            ZOOM: "Vergr&ouml;&szlig;ern",
          },
        },
      },
      s = n(t),
      r = n(e),
      c = 0,
      l = function (t) {
        return t && t.hasOwnProperty && t instanceof n;
      },
      d = (function () {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60);
          }
        );
      })(),
      u = (function () {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e);
          }
        );
      })(),
      f = (function () {
        var t,
          n = e.createElement("fakeelement"),
          o = {
            transition: "transitionend",
            OTransition: "oTransitionEnd",
            MozTransition: "transitionend",
            WebkitTransition: "webkitTransitionEnd",
          };
        for (t in o) if (void 0 !== n.style[t]) return o[t];
        return "transitionend";
      })(),
      p = function (t) {
        return t && t.length && t[0].offsetHeight;
      },
      h = function (t, e) {
        var o = n.extend(!0, {}, t, e);
        return (
          n.each(e, function (t, e) {
            n.isArray(e) && (o[t] = e);
          }),
          o
        );
      },
      g = function (t) {
        var o, i;
        return (
          !(!t || t.ownerDocument !== e) &&
          (n(".fancybox-container").css("pointer-events", "none"),
          (o = {
            x: t.getBoundingClientRect().left + t.offsetWidth / 2,
            y: t.getBoundingClientRect().top + t.offsetHeight / 2,
          }),
          (i = e.elementFromPoint(o.x, o.y) === t),
          n(".fancybox-container").css("pointer-events", ""),
          i)
        );
      },
      b = function (t, e, o) {
        var i = this;
        (i.opts = h({ index: o }, n.fancybox.defaults)),
          n.isPlainObject(e) && (i.opts = h(i.opts, e)),
          n.fancybox.isMobile && (i.opts = h(i.opts, i.opts.mobile)),
          (i.id = i.opts.id || ++c),
          (i.currIndex = parseInt(i.opts.index, 10) || 0),
          (i.prevIndex = null),
          (i.prevPos = null),
          (i.currPos = 0),
          (i.firstRun = !0),
          (i.group = []),
          (i.slides = {}),
          i.addContent(t),
          i.group.length && i.init();
      };
    n.extend(b.prototype, {
      init: function () {
        var o,
          i,
          a = this,
          s = a.group[a.currIndex],
          r = s.opts;
        r.closeExisting && n.fancybox.close(!0),
          n("body").addClass("fancybox-active"),
          !n.fancybox.getInstance() &&
            !1 !== r.hideScrollbar &&
            !n.fancybox.isMobile &&
            e.body.scrollHeight > t.innerHeight &&
            (n("head").append(
              '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
                (t.innerWidth - e.documentElement.clientWidth) +
                "px;}</style>"
            ),
            n("body").addClass("compensate-for-scrollbar")),
          (i = ""),
          n.each(r.buttons, function (t, e) {
            i += r.btnTpl[e] || "";
          }),
          (o = n(
            a.translate(
              a,
              r.baseTpl
                .replace("{{buttons}}", i)
                .replace("{{arrows}}", r.btnTpl.arrowLeft + r.btnTpl.arrowRight)
            )
          )
            .attr("id", "fancybox-container-" + a.id)
            .addClass(r.baseClass)
            .data("FancyBox", a)
            .appendTo(r.parentEl)),
          (a.$refs = { container: o }),
          [
            "bg",
            "inner",
            "infobar",
            "toolbar",
            "stage",
            "caption",
            "navigation",
          ].forEach(function (t) {
            a.$refs[t] = o.find(".fancybox-" + t);
          }),
          a.trigger("onInit"),
          a.activate(),
          a.jumpTo(a.currIndex);
      },
      translate: function (t, e) {
        var n = t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
        return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
          return void 0 === n[e] ? t : n[e];
        });
      },
      addContent: function (t) {
        var e,
          o = this,
          i = n.makeArray(t);
        n.each(i, function (t, e) {
          var i,
            a,
            s,
            r,
            c,
            l = {},
            d = {};
          n.isPlainObject(e)
            ? ((l = e), (d = e.opts || e))
            : "object" === n.type(e) && n(e).length
            ? ((i = n(e)),
              (d = i.data() || {}),
              (d = n.extend(!0, {}, d, d.options)),
              (d.$orig = i),
              (l.src = o.opts.src || d.src || i.attr("href")),
              l.type || l.src || ((l.type = "inline"), (l.src = e)))
            : (l = { type: "html", src: e + "" }),
            (l.opts = n.extend(!0, {}, o.opts, d)),
            n.isArray(d.buttons) && (l.opts.buttons = d.buttons),
            n.fancybox.isMobile &&
              l.opts.mobile &&
              (l.opts = h(l.opts, l.opts.mobile)),
            (a = l.type || l.opts.type),
            (r = l.src || ""),
            !a &&
              r &&
              ((s = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                ? ((a = "video"),
                  l.opts.video.format ||
                    (l.opts.video.format =
                      "video/" + ("ogv" === s[1] ? "ogg" : s[1])))
                : r.match(
                    /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                  )
                ? (a = "image")
                : r.match(/\.(pdf)((\?|#).*)?$/i)
                ? ((a = "iframe"),
                  (l = n.extend(!0, l, {
                    contentType: "pdf",
                    opts: { iframe: { preload: !1 } },
                  })))
                : "#" === r.charAt(0) && (a = "inline")),
            a ? (l.type = a) : o.trigger("objectNeedsType", l),
            l.contentType ||
              (l.contentType =
                n.inArray(l.type, ["html", "inline", "ajax"]) > -1
                  ? "html"
                  : l.type),
            (l.index = o.group.length),
            "auto" == l.opts.smallBtn &&
              (l.opts.smallBtn =
                n.inArray(l.type, ["html", "inline", "ajax"]) > -1),
            "auto" === l.opts.toolbar && (l.opts.toolbar = !l.opts.smallBtn),
            (l.$thumb = l.opts.$thumb || null),
            l.opts.$trigger &&
              l.index === o.opts.index &&
              ((l.$thumb = l.opts.$trigger.find("img:first")),
              l.$thumb.length && (l.opts.$orig = l.opts.$trigger)),
            (l.$thumb && l.$thumb.length) ||
              !l.opts.$orig ||
              (l.$thumb = l.opts.$orig.find("img:first")),
            l.$thumb && !l.$thumb.length && (l.$thumb = null),
            (l.thumb = l.opts.thumb || (l.$thumb ? l.$thumb[0].src : null)),
            "function" === n.type(l.opts.caption) &&
              (l.opts.caption = l.opts.caption.apply(e, [o, l])),
            "function" === n.type(o.opts.caption) &&
              (l.opts.caption = o.opts.caption.apply(e, [o, l])),
            l.opts.caption instanceof n ||
              (l.opts.caption =
                void 0 === l.opts.caption ? "" : l.opts.caption + ""),
            "ajax" === l.type &&
              ((c = r.split(/\s+/, 2)),
              c.length > 1 &&
                ((l.src = c.shift()), (l.opts.filter = c.shift()))),
            l.opts.modal &&
              (l.opts = n.extend(!0, l.opts, {
                trapFocus: !0,
                infobar: 0,
                toolbar: 0,
                smallBtn: 0,
                keyboard: 0,
                slideShow: 0,
                fullScreen: 0,
                thumbs: 0,
                touch: 0,
                clickContent: !1,
                clickSlide: !1,
                clickOutside: !1,
                dblclickContent: !1,
                dblclickSlide: !1,
                dblclickOutside: !1,
              })),
            o.group.push(l);
        }),
          Object.keys(o.slides).length &&
            (o.updateControls(),
            (e = o.Thumbs) && e.isActive && (e.create(), e.focus()));
      },
      addEvents: function () {
        var e = this;
        e.removeEvents(),
          e.$refs.container
            .on("click.fb-close", "[data-fancybox-close]", function (t) {
              t.stopPropagation(), t.preventDefault(), e.close(t);
            })
            .on(
              "touchstart.fb-prev click.fb-prev",
              "[data-fancybox-prev]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), e.previous();
              }
            )
            .on(
              "touchstart.fb-next click.fb-next",
              "[data-fancybox-next]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), e.next();
              }
            )
            .on("click.fb", "[data-fancybox-zoom]", function (t) {
              e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
            }),
          s.on("orientationchange.fb resize.fb", function (t) {
            t && t.originalEvent && "resize" === t.originalEvent.type
              ? (e.requestId && u(e.requestId),
                (e.requestId = d(function () {
                  e.update(t);
                })))
              : (e.current &&
                  "iframe" === e.current.type &&
                  e.$refs.stage.hide(),
                setTimeout(
                  function () {
                    e.$refs.stage.show(), e.update(t);
                  },
                  n.fancybox.isMobile ? 600 : 250
                ));
          }),
          r.on("keydown.fb", function (t) {
            var o = n.fancybox ? n.fancybox.getInstance() : null,
              i = o.current,
              a = t.keyCode || t.which;
            if (9 == a) return void (i.opts.trapFocus && e.focus(t));
            if (
              !(
                !i.opts.keyboard ||
                t.ctrlKey ||
                t.altKey ||
                t.shiftKey ||
                n(t.target).is("input,textarea,video,audio,select")
              )
            )
              return 8 === a || 27 === a
                ? (t.preventDefault(), void e.close(t))
                : 37 === a || 38 === a
                ? (t.preventDefault(), void e.previous())
                : 39 === a || 40 === a
                ? (t.preventDefault(), void e.next())
                : void e.trigger("afterKeydown", t, a);
          }),
          e.group[e.currIndex].opts.idleTime &&
            ((e.idleSecondsCounter = 0),
            r.on(
              "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
              function (t) {
                (e.idleSecondsCounter = 0),
                  e.isIdle && e.showControls(),
                  (e.isIdle = !1);
              }
            ),
            (e.idleInterval = t.setInterval(function () {
              ++e.idleSecondsCounter >= e.group[e.currIndex].opts.idleTime &&
                !e.isDragging &&
                ((e.isIdle = !0), (e.idleSecondsCounter = 0), e.hideControls());
            }, 1e3)));
      },
      removeEvents: function () {
        var e = this;
        s.off("orientationchange.fb resize.fb"),
          r.off("keydown.fb .fb-idle"),
          this.$refs.container.off(".fb-close .fb-prev .fb-next"),
          e.idleInterval &&
            (t.clearInterval(e.idleInterval), (e.idleInterval = null));
      },
      previous: function (t) {
        return this.jumpTo(this.currPos - 1, t);
      },
      next: function (t) {
        return this.jumpTo(this.currPos + 1, t);
      },
      jumpTo: function (t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l,
          d,
          u,
          f = this,
          h = f.group.length;
        if (!(f.isDragging || f.isClosing || (f.isAnimating && f.firstRun))) {
          if (
            ((t = parseInt(t, 10)),
            !(a = f.current ? f.current.opts.loop : f.opts.loop) &&
              (t < 0 || t >= h))
          )
            return !1;
          if (
            ((o = f.firstRun = !Object.keys(f.slides).length),
            (r = f.current),
            (f.prevIndex = f.currIndex),
            (f.prevPos = f.currPos),
            (s = f.createSlide(t)),
            h > 1 &&
              ((a || s.index < h - 1) && f.createSlide(t + 1),
              (a || s.index > 0) && f.createSlide(t - 1)),
            (f.current = s),
            (f.currIndex = s.index),
            (f.currPos = s.pos),
            f.trigger("beforeShow", o),
            f.updateControls(),
            (s.forcedDuration = void 0),
            n.isNumeric(e)
              ? (s.forcedDuration = e)
              : (e = s.opts[o ? "animationDuration" : "transitionDuration"]),
            (e = parseInt(e, 10)),
            (i = f.isMoved(s)),
            s.$slide.addClass("fancybox-slide--current"),
            o)
          )
            return (
              s.opts.animationEffect &&
                e &&
                f.$refs.container.css("transition-duration", e + "ms"),
              f.$refs.container.addClass("fancybox-is-open").trigger("focus"),
              f.loadSlide(s),
              void f.preload("image")
            );
          (c = n.fancybox.getTranslate(r.$slide)),
            (l = n.fancybox.getTranslate(f.$refs.stage)),
            n.each(f.slides, function (t, e) {
              n.fancybox.stop(e.$slide, !0);
            }),
            r.pos !== s.pos && (r.isComplete = !1),
            r.$slide.removeClass(
              "fancybox-slide--complete fancybox-slide--current"
            ),
            i
              ? ((u = c.left - (r.pos * c.width + r.pos * r.opts.gutter)),
                n.each(f.slides, function (t, o) {
                  o.$slide
                    .removeClass("fancybox-animated")
                    .removeClass(function (t, e) {
                      return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(
                        " "
                      );
                    });
                  var i = o.pos * c.width + o.pos * o.opts.gutter;
                  n.fancybox.setTranslate(o.$slide, {
                    top: 0,
                    left: i - l.left + u,
                  }),
                    o.pos !== s.pos &&
                      o.$slide.addClass(
                        "fancybox-slide--" +
                          (o.pos > s.pos ? "next" : "previous")
                      ),
                    p(o.$slide),
                    n.fancybox.animate(
                      o.$slide,
                      {
                        top: 0,
                        left:
                          (o.pos - s.pos) * c.width +
                          (o.pos - s.pos) * o.opts.gutter,
                      },
                      e,
                      function () {
                        o.$slide
                          .css({ transform: "", opacity: "" })
                          .removeClass(
                            "fancybox-slide--next fancybox-slide--previous"
                          ),
                          o.pos === f.currPos && f.complete();
                      }
                    );
                }))
              : e &&
                s.opts.transitionEffect &&
                ((d =
                  "fancybox-animated fancybox-fx-" + s.opts.transitionEffect),
                r.$slide.addClass(
                  "fancybox-slide--" + (r.pos > s.pos ? "next" : "previous")
                ),
                n.fancybox.animate(
                  r.$slide,
                  d,
                  e,
                  function () {
                    r.$slide
                      .removeClass(d)
                      .removeClass(
                        "fancybox-slide--next fancybox-slide--previous"
                      );
                  },
                  !1
                )),
            s.isLoaded ? f.revealContent(s) : f.loadSlide(s),
            f.preload("image");
        }
      },
      createSlide: function (t) {
        var e,
          o,
          i = this;
        return (
          (o = t % i.group.length),
          (o = o < 0 ? i.group.length + o : o),
          !i.slides[t] &&
            i.group[o] &&
            ((e = n('<div class="fancybox-slide"></div>').appendTo(
              i.$refs.stage
            )),
            (i.slides[t] = n.extend(!0, {}, i.group[o], {
              pos: t,
              $slide: e,
              isLoaded: !1,
            })),
            i.updateSlide(i.slides[t])),
          i.slides[t]
        );
      },
      scaleToActual: function (t, e, o) {
        var i,
          a,
          s,
          r,
          c,
          l = this,
          d = l.current,
          u = d.$content,
          f = n.fancybox.getTranslate(d.$slide).width,
          p = n.fancybox.getTranslate(d.$slide).height,
          h = d.width,
          g = d.height;
        l.isAnimating ||
          l.isMoved() ||
          !u ||
          "image" != d.type ||
          !d.isLoaded ||
          d.hasError ||
          ((l.isAnimating = !0),
          n.fancybox.stop(u),
          (t = void 0 === t ? 0.5 * f : t),
          (e = void 0 === e ? 0.5 * p : e),
          (i = n.fancybox.getTranslate(u)),
          (i.top -= n.fancybox.getTranslate(d.$slide).top),
          (i.left -= n.fancybox.getTranslate(d.$slide).left),
          (r = h / i.width),
          (c = g / i.height),
          (a = 0.5 * f - 0.5 * h),
          (s = 0.5 * p - 0.5 * g),
          h > f &&
            ((a = i.left * r - (t * r - t)),
            a > 0 && (a = 0),
            a < f - h && (a = f - h)),
          g > p &&
            ((s = i.top * c - (e * c - e)),
            s > 0 && (s = 0),
            s < p - g && (s = p - g)),
          l.updateCursor(h, g),
          n.fancybox.animate(
            u,
            { top: s, left: a, scaleX: r, scaleY: c },
            o || 366,
            function () {
              l.isAnimating = !1;
            }
          ),
          l.SlideShow && l.SlideShow.isActive && l.SlideShow.stop());
      },
      scaleToFit: function (t) {
        var e,
          o = this,
          i = o.current,
          a = i.$content;
        o.isAnimating ||
          o.isMoved() ||
          !a ||
          "image" != i.type ||
          !i.isLoaded ||
          i.hasError ||
          ((o.isAnimating = !0),
          n.fancybox.stop(a),
          (e = o.getFitPos(i)),
          o.updateCursor(e.width, e.height),
          n.fancybox.animate(
            a,
            {
              top: e.top,
              left: e.left,
              scaleX: e.width / a.width(),
              scaleY: e.height / a.height(),
            },
            t || 366,
            function () {
              o.isAnimating = !1;
            }
          ));
      },
      getFitPos: function (t) {
        var e,
          o,
          i,
          a,
          s = this,
          r = t.$content,
          c = t.$slide,
          l = t.width || t.opts.width,
          d = t.height || t.opts.height,
          u = {};
        return (
          !!(t.isLoaded && r && r.length) &&
          ((e = n.fancybox.getTranslate(s.$refs.stage).width),
          (o = n.fancybox.getTranslate(s.$refs.stage).height),
          (e -=
            parseFloat(c.css("paddingLeft")) +
            parseFloat(c.css("paddingRight")) +
            parseFloat(r.css("marginLeft")) +
            parseFloat(r.css("marginRight"))),
          (o -=
            parseFloat(c.css("paddingTop")) +
            parseFloat(c.css("paddingBottom")) +
            parseFloat(r.css("marginTop")) +
            parseFloat(r.css("marginBottom"))),
          (l && d) || ((l = e), (d = o)),
          (i = Math.min(1, e / l, o / d)),
          (l *= i),
          (d *= i),
          l > e - 0.5 && (l = e),
          d > o - 0.5 && (d = o),
          "image" === t.type
            ? ((u.top =
                Math.floor(0.5 * (o - d)) + parseFloat(c.css("paddingTop"))),
              (u.left =
                Math.floor(0.5 * (e - l)) + parseFloat(c.css("paddingLeft"))))
            : "video" === t.contentType &&
              ((a =
                t.opts.width && t.opts.height ? l / d : t.opts.ratio || 16 / 9),
              d > l / a ? (d = l / a) : l > d * a && (l = d * a)),
          (u.width = l),
          (u.height = d),
          u)
        );
      },
      update: function (t) {
        var e = this;
        n.each(e.slides, function (n, o) {
          e.updateSlide(o, t);
        });
      },
      updateSlide: function (t, e) {
        var o = this,
          i = t && t.$content,
          a = t.width || t.opts.width,
          s = t.height || t.opts.height,
          r = t.$slide;
        o.adjustCaption(t),
          i &&
            (a || s || "video" === t.contentType) &&
            !t.hasError &&
            (n.fancybox.stop(i),
            n.fancybox.setTranslate(i, o.getFitPos(t)),
            t.pos === o.currPos && ((o.isAnimating = !1), o.updateCursor())),
          o.adjustLayout(t),
          r.length &&
            (r.trigger("refresh"),
            t.pos === o.currPos &&
              o.$refs.toolbar
                .add(o.$refs.navigation.find(".fancybox-button--arrow_right"))
                .toggleClass(
                  "compensate-for-scrollbar",
                  r.get(0).scrollHeight > r.get(0).clientHeight
                )),
          o.trigger("onUpdate", t, e);
      },
      centerSlide: function (t) {
        var e = this,
          o = e.current,
          i = o.$slide;
        !e.isClosing &&
          o &&
          (i.siblings().css({ transform: "", opacity: "" }),
          i
            .parent()
            .children()
            .removeClass("fancybox-slide--previous fancybox-slide--next"),
          n.fancybox.animate(
            i,
            { top: 0, left: 0, opacity: 1 },
            void 0 === t ? 0 : t,
            function () {
              i.css({ transform: "", opacity: "" }),
                o.isComplete || e.complete();
            },
            !1
          ));
      },
      isMoved: function (t) {
        var e,
          o,
          i = t || this.current;
        return (
          !!i &&
          ((o = n.fancybox.getTranslate(this.$refs.stage)),
          (e = n.fancybox.getTranslate(i.$slide)),
          !i.$slide.hasClass("fancybox-animated") &&
            (Math.abs(e.top - o.top) > 0.5 || Math.abs(e.left - o.left) > 0.5))
        );
      },
      updateCursor: function (t, e) {
        var o,
          i,
          a = this,
          s = a.current,
          r = a.$refs.container;
        s &&
          !a.isClosing &&
          a.Guestures &&
          (r.removeClass(
            "fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"
          ),
          (o = a.canPan(t, e)),
          (i = !!o || a.isZoomable()),
          r.toggleClass("fancybox-is-zoomable", i),
          n("[data-fancybox-zoom]").prop("disabled", !i),
          o
            ? r.addClass("fancybox-can-pan")
            : i &&
              ("zoom" === s.opts.clickContent ||
                (n.isFunction(s.opts.clickContent) &&
                  "zoom" == s.opts.clickContent(s)))
            ? r.addClass("fancybox-can-zoomIn")
            : s.opts.touch &&
              (s.opts.touch.vertical || a.group.length > 1) &&
              "video" !== s.contentType &&
              r.addClass("fancybox-can-swipe"));
      },
      isZoomable: function () {
        var t,
          e = this,
          n = e.current;
        if (n && !e.isClosing && "image" === n.type && !n.hasError) {
          if (!n.isLoaded) return !0;
          if (
            (t = e.getFitPos(n)) &&
            (n.width > t.width || n.height > t.height)
          )
            return !0;
        }
        return !1;
      },
      isScaledDown: function (t, e) {
        var o = this,
          i = !1,
          a = o.current,
          s = a.$content;
        return (
          void 0 !== t && void 0 !== e
            ? (i = t < a.width && e < a.height)
            : s &&
              ((i = n.fancybox.getTranslate(s)),
              (i = i.width < a.width && i.height < a.height)),
          i
        );
      },
      canPan: function (t, e) {
        var o = this,
          i = o.current,
          a = null,
          s = !1;
        return (
          "image" === i.type &&
            (i.isComplete || (t && e)) &&
            !i.hasError &&
            ((s = o.getFitPos(i)),
            void 0 !== t && void 0 !== e
              ? (a = { width: t, height: e })
              : i.isComplete && (a = n.fancybox.getTranslate(i.$content)),
            a &&
              s &&
              (s =
                Math.abs(a.width - s.width) > 1.5 ||
                Math.abs(a.height - s.height) > 1.5)),
          s
        );
      },
      loadSlide: function (t) {
        var e,
          o,
          i,
          a = this;
        if (!t.isLoading && !t.isLoaded) {
          if (((t.isLoading = !0), !1 === a.trigger("beforeLoad", t)))
            return (t.isLoading = !1), !1;
          switch (
            ((e = t.type),
            (o = t.$slide),
            o.off("refresh").trigger("onReset").addClass(t.opts.slideClass),
            e)
          ) {
            case "image":
              a.setImage(t);
              break;
            case "iframe":
              a.setIframe(t);
              break;
            case "html":
              a.setContent(t, t.src || t.content);
              break;
            case "video":
              a.setContent(
                t,
                t.opts.video.tpl
                  .replace(/\{\{src\}\}/gi, t.src)
                  .replace(
                    "{{format}}",
                    t.opts.videoFormat || t.opts.video.format || ""
                  )
                  .replace("{{poster}}", t.thumb || "")
              );
              break;
            case "inline":
              n(t.src).length ? a.setContent(t, n(t.src)) : a.setError(t);
              break;
            case "ajax":
              a.showLoading(t),
                (i = n.ajax(
                  n.extend({}, t.opts.ajax.settings, {
                    url: t.src,
                    success: function (e, n) {
                      "success" === n && a.setContent(t, e);
                    },
                    error: function (e, n) {
                      e && "abort" !== n && a.setError(t);
                    },
                  })
                )),
                o.one("onReset", function () {
                  i.abort();
                });
              break;
            default:
              a.setError(t);
          }
          return !0;
        }
      },
      setImage: function (t) {
        var o,
          i = this;
        setTimeout(function () {
          var e = t.$image;
          i.isClosing ||
            !t.isLoading ||
            (e && e.length && e[0].complete) ||
            t.hasError ||
            i.showLoading(t);
        }, 50),
          i.checkSrcset(t),
          (t.$content = n('<div class="fancybox-content"></div>')
            .addClass("fancybox-is-hidden")
            .appendTo(t.$slide.addClass("fancybox-slide--image"))),
          !1 !== t.opts.preload &&
            t.opts.width &&
            t.opts.height &&
            t.thumb &&
            ((t.width = t.opts.width),
            (t.height = t.opts.height),
            (o = e.createElement("img")),
            (o.onerror = function () {
              n(this).remove(), (t.$ghost = null);
            }),
            (o.onload = function () {
              i.afterLoad(t);
            }),
            (t.$ghost = n(o)
              .addClass("fancybox-image")
              .appendTo(t.$content)
              .attr("src", t.thumb))),
          i.setBigImage(t);
      },
      checkSrcset: function (e) {
        var n,
          o,
          i,
          a,
          s = e.opts.srcset || e.opts.image.srcset;
        if (s) {
          (i = t.devicePixelRatio || 1),
            (a = t.innerWidth * i),
            (o = s.split(",").map(function (t) {
              var e = {};
              return (
                t
                  .trim()
                  .split(/\s+/)
                  .forEach(function (t, n) {
                    var o = parseInt(t.substring(0, t.length - 1), 10);
                    if (0 === n) return (e.url = t);
                    o && ((e.value = o), (e.postfix = t[t.length - 1]));
                  }),
                e
              );
            })),
            o.sort(function (t, e) {
              return t.value - e.value;
            });
          for (var r = 0; r < o.length; r++) {
            var c = o[r];
            if (
              ("w" === c.postfix && c.value >= a) ||
              ("x" === c.postfix && c.value >= i)
            ) {
              n = c;
              break;
            }
          }
          !n && o.length && (n = o[o.length - 1]),
            n &&
              ((e.src = n.url),
              e.width &&
                e.height &&
                "w" == n.postfix &&
                ((e.height = (e.width / e.height) * n.value),
                (e.width = n.value)),
              (e.opts.srcset = s));
        }
      },
      setBigImage: function (t) {
        var o = this,
          i = e.createElement("img"),
          a = n(i);
        (t.$image = a
          .one("error", function () {
            o.setError(t);
          })
          .one("load", function () {
            var e;
            t.$ghost ||
              (o.resolveImageSlideSize(
                t,
                this.naturalWidth,
                this.naturalHeight
              ),
              o.afterLoad(t)),
              o.isClosing ||
                (t.opts.srcset &&
                  ((e = t.opts.sizes),
                  (e && "auto" !== e) ||
                    (e =
                      (t.width / t.height > 1 && s.width() / s.height() > 1
                        ? "100"
                        : Math.round((t.width / t.height) * 100)) + "vw"),
                  a.attr("sizes", e).attr("srcset", t.opts.srcset)),
                t.$ghost &&
                  setTimeout(function () {
                    t.$ghost && !o.isClosing && t.$ghost.hide();
                  }, Math.min(300, Math.max(1e3, t.height / 1600))),
                o.hideLoading(t));
          })
          .addClass("fancybox-image")
          .attr("src", t.src)
          .appendTo(t.$content)),
          (i.complete || "complete" == i.readyState) &&
          a.naturalWidth &&
          a.naturalHeight
            ? a.trigger("load")
            : i.error && a.trigger("error");
      },
      resolveImageSlideSize: function (t, e, n) {
        var o = parseInt(t.opts.width, 10),
          i = parseInt(t.opts.height, 10);
        (t.width = e),
          (t.height = n),
          o > 0 && ((t.width = o), (t.height = Math.floor((o * n) / e))),
          i > 0 && ((t.width = Math.floor((i * e) / n)), (t.height = i));
      },
      setIframe: function (t) {
        var e,
          o = this,
          i = t.opts.iframe,
          a = t.$slide;
        (t.$content = n(
          '<div class="fancybox-content' +
            (i.preload ? " fancybox-is-hidden" : "") +
            '"></div>'
        )
          .css(i.css)
          .appendTo(a)),
          a.addClass("fancybox-slide--" + t.contentType),
          (t.$iframe = e =
            n(i.tpl.replace(/\{rnd\}/g, new Date().getTime()))
              .attr(i.attr)
              .appendTo(t.$content)),
          i.preload
            ? (o.showLoading(t),
              e.on("load.fb error.fb", function (e) {
                (this.isReady = 1), t.$slide.trigger("refresh"), o.afterLoad(t);
              }),
              a.on("refresh.fb", function () {
                var n,
                  o,
                  s = t.$content,
                  r = i.css.width,
                  c = i.css.height;
                if (1 === e[0].isReady) {
                  try {
                    (n = e.contents()), (o = n.find("body"));
                  } catch (t) {}
                  o &&
                    o.length &&
                    o.children().length &&
                    (a.css("overflow", "visible"),
                    s.css({
                      width: "100%",
                      "max-width": "100%",
                      height: "9999px",
                    }),
                    void 0 === r &&
                      (r = Math.ceil(
                        Math.max(o[0].clientWidth, o.outerWidth(!0))
                      )),
                    s.css("width", r || "").css("max-width", ""),
                    void 0 === c &&
                      (c = Math.ceil(
                        Math.max(o[0].clientHeight, o.outerHeight(!0))
                      )),
                    s.css("height", c || ""),
                    a.css("overflow", "auto")),
                    s.removeClass("fancybox-is-hidden");
                }
              }))
            : o.afterLoad(t),
          e.attr("src", t.src),
          a.one("onReset", function () {
            try {
              n(this)
                .find("iframe")
                .hide()
                .unbind()
                .attr("src", "//about:blank");
            } catch (t) {}
            n(this).off("refresh.fb").empty(),
              (t.isLoaded = !1),
              (t.isRevealed = !1);
          });
      },
      setContent: function (t, e) {
        var o = this;
        o.isClosing ||
          (o.hideLoading(t),
          t.$content && n.fancybox.stop(t.$content),
          t.$slide.empty(),
          l(e) && e.parent().length
            ? ((e.hasClass("fancybox-content") ||
                e.parent().hasClass("fancybox-content")) &&
                e.parents(".fancybox-slide").trigger("onReset"),
              (t.$placeholder = n("<div>").hide().insertAfter(e)),
              e.css("display", "flex"))
            : t.hasError ||
              ("string" === n.type(e) &&
                (e = n("<div>").append(n.trim(e)).contents()),
              t.opts.filter && (e = n("<div>").html(e).find(t.opts.filter))),
          t.$slide.one("onReset", function () {
            n(this).find("video,audio").trigger("pause"),
              t.$placeholder &&
                (t.$placeholder
                  .after(e.removeClass("fancybox-content").hide())
                  .remove(),
                (t.$placeholder = null)),
              t.$smallBtn && (t.$smallBtn.remove(), (t.$smallBtn = null)),
              t.hasError ||
                (n(this).empty(), (t.isLoaded = !1), (t.isRevealed = !1));
          }),
          n(e).appendTo(t.$slide),
          n(e).is("video,audio") &&
            (n(e).addClass("fancybox-video"),
            n(e).wrap("<div></div>"),
            (t.contentType = "video"),
            (t.opts.width = t.opts.width || n(e).attr("width")),
            (t.opts.height = t.opts.height || n(e).attr("height"))),
          (t.$content = t.$slide
            .children()
            .filter("div,form,main,video,audio,article,.fancybox-content")
            .first()),
          t.$content.siblings().hide(),
          t.$content.length ||
            (t.$content = t.$slide.wrapInner("<div></div>").children().first()),
          t.$content.addClass("fancybox-content"),
          t.$slide.addClass("fancybox-slide--" + t.contentType),
          o.afterLoad(t));
      },
      setError: function (t) {
        (t.hasError = !0),
          t.$slide
            .trigger("onReset")
            .removeClass("fancybox-slide--" + t.contentType)
            .addClass("fancybox-slide--error"),
          (t.contentType = "html"),
          this.setContent(t, this.translate(t, t.opts.errorTpl)),
          t.pos === this.currPos && (this.isAnimating = !1);
      },
      showLoading: function (t) {
        var e = this;
        (t = t || e.current) &&
          !t.$spinner &&
          (t.$spinner = n(e.translate(e, e.opts.spinnerTpl))
            .appendTo(t.$slide)
            .hide()
            .fadeIn("fast"));
      },
      hideLoading: function (t) {
        var e = this;
        (t = t || e.current) &&
          t.$spinner &&
          (t.$spinner.stop().remove(), delete t.$spinner);
      },
      afterLoad: function (t) {
        var e = this;
        e.isClosing ||
          ((t.isLoading = !1),
          (t.isLoaded = !0),
          e.trigger("afterLoad", t),
          e.hideLoading(t),
          !t.opts.smallBtn ||
            (t.$smallBtn && t.$smallBtn.length) ||
            (t.$smallBtn = n(e.translate(t, t.opts.btnTpl.smallBtn)).appendTo(
              t.$content
            )),
          t.opts.protect &&
            t.$content &&
            !t.hasError &&
            (t.$content.on("contextmenu.fb", function (t) {
              return 2 == t.button && t.preventDefault(), !0;
            }),
            "image" === t.type &&
              n('<div class="fancybox-spaceball"></div>').appendTo(t.$content)),
          e.adjustCaption(t),
          e.adjustLayout(t),
          t.pos === e.currPos && e.updateCursor(),
          e.revealContent(t));
      },
      adjustCaption: function (t) {
        var e,
          n = this,
          o = t || n.current,
          i = o.opts.caption,
          a = o.opts.preventCaptionOverlap,
          s = n.$refs.caption,
          r = !1;
        s.toggleClass("fancybox-caption--separate", a),
          a &&
            i &&
            i.length &&
            (o.pos !== n.currPos
              ? ((e = s.clone().appendTo(s.parent())),
                e.children().eq(0).empty().html(i),
                (r = e.outerHeight(!0)),
                e.empty().remove())
              : n.$caption && (r = n.$caption.outerHeight(!0)),
            o.$slide.css("padding-bottom", r || ""));
      },
      adjustLayout: function (t) {
        var e,
          n,
          o,
          i,
          a = this,
          s = t || a.current;
        s.isLoaded &&
          !0 !== s.opts.disableLayoutFix &&
          (s.$content.css("margin-bottom", ""),
          s.$content.outerHeight() > s.$slide.height() + 0.5 &&
            ((o = s.$slide[0].style["padding-bottom"]),
            (i = s.$slide.css("padding-bottom")),
            parseFloat(i) > 0 &&
              ((e = s.$slide[0].scrollHeight),
              s.$slide.css("padding-bottom", 0),
              Math.abs(e - s.$slide[0].scrollHeight) < 1 && (n = i),
              s.$slide.css("padding-bottom", o))),
          s.$content.css("margin-bottom", n));
      },
      revealContent: function (t) {
        var e,
          o,
          i,
          a,
          s = this,
          r = t.$slide,
          c = !1,
          l = !1,
          d = s.isMoved(t),
          u = t.isRevealed;
        return (
          (t.isRevealed = !0),
          (e = t.opts[s.firstRun ? "animationEffect" : "transitionEffect"]),
          (i = t.opts[s.firstRun ? "animationDuration" : "transitionDuration"]),
          (i = parseInt(
            void 0 === t.forcedDuration ? i : t.forcedDuration,
            10
          )),
          (!d && t.pos === s.currPos && i) || (e = !1),
          "zoom" === e &&
            (t.pos === s.currPos &&
            i &&
            "image" === t.type &&
            !t.hasError &&
            (l = s.getThumbPos(t))
              ? (c = s.getFitPos(t))
              : (e = "fade")),
          "zoom" === e
            ? ((s.isAnimating = !0),
              (c.scaleX = c.width / l.width),
              (c.scaleY = c.height / l.height),
              (a = t.opts.zoomOpacity),
              "auto" == a &&
                (a = Math.abs(t.width / t.height - l.width / l.height) > 0.1),
              a && ((l.opacity = 0.1), (c.opacity = 1)),
              n.fancybox.setTranslate(
                t.$content.removeClass("fancybox-is-hidden"),
                l
              ),
              p(t.$content),
              void n.fancybox.animate(t.$content, c, i, function () {
                (s.isAnimating = !1), s.complete();
              }))
            : (s.updateSlide(t),
              e
                ? (n.fancybox.stop(r),
                  (o =
                    "fancybox-slide--" +
                    (t.pos >= s.prevPos ? "next" : "previous") +
                    " fancybox-animated fancybox-fx-" +
                    e),
                  r.addClass(o).removeClass("fancybox-slide--current"),
                  t.$content.removeClass("fancybox-is-hidden"),
                  p(r),
                  "image" !== t.type && t.$content.hide().show(0),
                  void n.fancybox.animate(
                    r,
                    "fancybox-slide--current",
                    i,
                    function () {
                      r.removeClass(o).css({ transform: "", opacity: "" }),
                        t.pos === s.currPos && s.complete();
                    },
                    !0
                  ))
                : (t.$content.removeClass("fancybox-is-hidden"),
                  u ||
                    !d ||
                    "image" !== t.type ||
                    t.hasError ||
                    t.$content.hide().fadeIn("fast"),
                  void (t.pos === s.currPos && s.complete())))
        );
      },
      getThumbPos: function (t) {
        var e,
          o,
          i,
          a,
          s,
          r = !1,
          c = t.$thumb;
        return (
          !(!c || !g(c[0])) &&
          ((e = n.fancybox.getTranslate(c)),
          (o = parseFloat(c.css("border-top-width") || 0)),
          (i = parseFloat(c.css("border-right-width") || 0)),
          (a = parseFloat(c.css("border-bottom-width") || 0)),
          (s = parseFloat(c.css("border-left-width") || 0)),
          (r = {
            top: e.top + o,
            left: e.left + s,
            width: e.width - i - s,
            height: e.height - o - a,
            scaleX: 1,
            scaleY: 1,
          }),
          e.width > 0 && e.height > 0 && r)
        );
      },
      complete: function () {
        var t,
          e = this,
          o = e.current,
          i = {};
        !e.isMoved() &&
          o.isLoaded &&
          (o.isComplete ||
            ((o.isComplete = !0),
            o.$slide.siblings().trigger("onReset"),
            e.preload("inline"),
            p(o.$slide),
            o.$slide.addClass("fancybox-slide--complete"),
            n.each(e.slides, function (t, o) {
              o.pos >= e.currPos - 1 && o.pos <= e.currPos + 1
                ? (i[o.pos] = o)
                : o && (n.fancybox.stop(o.$slide), o.$slide.off().remove());
            }),
            (e.slides = i)),
          (e.isAnimating = !1),
          e.updateCursor(),
          e.trigger("afterShow"),
          o.opts.video.autoStart &&
            o.$slide
              .find("video,audio")
              .filter(":visible:first")
              .trigger("play")
              .one("ended", function () {
                Document.exitFullscreen
                  ? Document.exitFullscreen()
                  : this.webkitExitFullscreen && this.webkitExitFullscreen(),
                  e.next();
              }),
          o.opts.autoFocus &&
            "html" === o.contentType &&
            ((t = o.$content.find("input[autofocus]:enabled:visible:first")),
            t.length ? t.trigger("focus") : e.focus(null, !0)),
          o.$slide.scrollTop(0).scrollLeft(0));
      },
      preload: function (t) {
        var e,
          n,
          o = this;
        o.group.length < 2 ||
          ((n = o.slides[o.currPos + 1]),
          (e = o.slides[o.currPos - 1]),
          e && e.type === t && o.loadSlide(e),
          n && n.type === t && o.loadSlide(n));
      },
      focus: function (t, o) {
        var i,
          a,
          s = this,
          r = [
            "a[href]",
            "area[href]",
            'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
            "select:not([disabled]):not([aria-hidden])",
            "textarea:not([disabled]):not([aria-hidden])",
            "button:not([disabled]):not([aria-hidden])",
            "iframe",
            "object",
            "embed",
            "video",
            "audio",
            "[contenteditable]",
            '[tabindex]:not([tabindex^="-"])',
          ].join(",");
        s.isClosing ||
          ((i =
            !t && s.current && s.current.isComplete
              ? s.current.$slide.find(
                  "*:visible" + (o ? ":not(.fancybox-close-small)" : "")
                )
              : s.$refs.container.find("*:visible")),
          (i = i.filter(r).filter(function () {
            return (
              "hidden" !== n(this).css("visibility") &&
              !n(this).hasClass("disabled")
            );
          })),
          i.length
            ? ((a = i.index(e.activeElement)),
              t && t.shiftKey
                ? (a < 0 || 0 == a) &&
                  (t.preventDefault(), i.eq(i.length - 1).trigger("focus"))
                : (a < 0 || a == i.length - 1) &&
                  (t && t.preventDefault(), i.eq(0).trigger("focus")))
            : s.$refs.container.trigger("focus"));
      },
      activate: function () {
        var t = this;
        n(".fancybox-container").each(function () {
          var e = n(this).data("FancyBox");
          e &&
            e.id !== t.id &&
            !e.isClosing &&
            (e.trigger("onDeactivate"), e.removeEvents(), (e.isVisible = !1));
        }),
          (t.isVisible = !0),
          (t.current || t.isIdle) && (t.update(), t.updateControls()),
          t.trigger("onActivate"),
          t.addEvents();
      },
      close: function (t, e) {
        var o,
          i,
          a,
          s,
          r,
          c,
          l,
          u = this,
          f = u.current,
          h = function () {
            u.cleanUp(t);
          };
        return (
          !u.isClosing &&
          ((u.isClosing = !0),
          !1 === u.trigger("beforeClose", t)
            ? ((u.isClosing = !1),
              d(function () {
                u.update();
              }),
              !1)
            : (u.removeEvents(),
              (a = f.$content),
              (o = f.opts.animationEffect),
              (i = n.isNumeric(e) ? e : o ? f.opts.animationDuration : 0),
              f.$slide.removeClass(
                "fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"
              ),
              !0 !== t ? n.fancybox.stop(f.$slide) : (o = !1),
              f.$slide.siblings().trigger("onReset").remove(),
              i &&
                u.$refs.container
                  .removeClass("fancybox-is-open")
                  .addClass("fancybox-is-closing")
                  .css("transition-duration", i + "ms"),
              u.hideLoading(f),
              u.hideControls(!0),
              u.updateCursor(),
              "zoom" !== o ||
                (a &&
                  i &&
                  "image" === f.type &&
                  !u.isMoved() &&
                  !f.hasError &&
                  (l = u.getThumbPos(f))) ||
                (o = "fade"),
              "zoom" === o
                ? (n.fancybox.stop(a),
                  (s = n.fancybox.getTranslate(a)),
                  (c = {
                    top: s.top,
                    left: s.left,
                    scaleX: s.width / l.width,
                    scaleY: s.height / l.height,
                    width: l.width,
                    height: l.height,
                  }),
                  (r = f.opts.zoomOpacity),
                  "auto" == r &&
                    (r =
                      Math.abs(f.width / f.height - l.width / l.height) > 0.1),
                  r && (l.opacity = 0),
                  n.fancybox.setTranslate(a, c),
                  p(a),
                  n.fancybox.animate(a, l, i, h),
                  !0)
                : (o && i
                    ? n.fancybox.animate(
                        f.$slide
                          .addClass("fancybox-slide--previous")
                          .removeClass("fancybox-slide--current"),
                        "fancybox-animated fancybox-fx-" + o,
                        i,
                        h
                      )
                    : !0 === t
                    ? setTimeout(h, i)
                    : h(),
                  !0)))
        );
      },
      cleanUp: function (e) {
        var o,
          i,
          a,
          s = this,
          r = s.current.opts.$orig;
        s.current.$slide.trigger("onReset"),
          s.$refs.container.empty().remove(),
          s.trigger("afterClose", e),
          s.current.opts.backFocus &&
            ((r && r.length && r.is(":visible")) || (r = s.$trigger),
            r &&
              r.length &&
              ((i = t.scrollX),
              (a = t.scrollY),
              r.trigger("focus"),
              n("html, body").scrollTop(a).scrollLeft(i))),
          (s.current = null),
          (o = n.fancybox.getInstance()),
          o
            ? o.activate()
            : (n("body").removeClass(
                "fancybox-active compensate-for-scrollbar"
              ),
              n("#fancybox-style-noscroll").remove());
      },
      trigger: function (t, e) {
        var o,
          i = Array.prototype.slice.call(arguments, 1),
          a = this,
          s = e && e.opts ? e : a.current;
        if (
          (s ? i.unshift(s) : (s = a),
          i.unshift(a),
          n.isFunction(s.opts[t]) && (o = s.opts[t].apply(s, i)),
          !1 === o)
        )
          return o;
        "afterClose" !== t && a.$refs
          ? a.$refs.container.trigger(t + ".fb", i)
          : r.trigger(t + ".fb", i);
      },
      updateControls: function () {
        var t = this,
          o = t.current,
          i = o.index,
          a = t.$refs.container,
          s = t.$refs.caption,
          r = o.opts.caption;
        o.$slide.trigger("refresh"),
          r && r.length
            ? ((t.$caption = s), s.children().eq(0).html(r))
            : (t.$caption = null),
          t.hasHiddenControls || t.isIdle || t.showControls(),
          a.find("[data-fancybox-count]").html(t.group.length),
          a.find("[data-fancybox-index]").html(i + 1),
          a
            .find("[data-fancybox-prev]")
            .prop("disabled", !o.opts.loop && i <= 0),
          a
            .find("[data-fancybox-next]")
            .prop("disabled", !o.opts.loop && i >= t.group.length - 1),
          "image" === o.type
            ? a
                .find("[data-fancybox-zoom]")
                .show()
                .end()
                .find("[data-fancybox-download]")
                .attr("href", o.opts.image.src || o.src)
                .show()
            : o.opts.toolbar &&
              a.find("[data-fancybox-download],[data-fancybox-zoom]").hide(),
          n(e.activeElement).is(":hidden,[disabled]") &&
            t.$refs.container.trigger("focus");
      },
      hideControls: function (t) {
        var e = this,
          n = ["infobar", "toolbar", "nav"];
        (!t && e.current.opts.preventCaptionOverlap) || n.push("caption"),
          this.$refs.container.removeClass(
            n
              .map(function (t) {
                return "fancybox-show-" + t;
              })
              .join(" ")
          ),
          (this.hasHiddenControls = !0);
      },
      showControls: function () {
        var t = this,
          e = t.current ? t.current.opts : t.opts,
          n = t.$refs.container;
        (t.hasHiddenControls = !1),
          (t.idleSecondsCounter = 0),
          n
            .toggleClass("fancybox-show-toolbar", !(!e.toolbar || !e.buttons))
            .toggleClass(
              "fancybox-show-infobar",
              !!(e.infobar && t.group.length > 1)
            )
            .toggleClass("fancybox-show-caption", !!t.$caption)
            .toggleClass(
              "fancybox-show-nav",
              !!(e.arrows && t.group.length > 1)
            )
            .toggleClass("fancybox-is-modal", !!e.modal);
      },
      toggleControls: function () {
        this.hasHiddenControls ? this.showControls() : this.hideControls();
      },
    }),
      (n.fancybox = {
        version: "3.5.7",
        defaults: a,
        getInstance: function (t) {
          var e = n(
              '.fancybox-container:not(".fancybox-is-closing"):last'
            ).data("FancyBox"),
            o = Array.prototype.slice.call(arguments, 1);
          return (
            e instanceof b &&
            ("string" === n.type(t)
              ? e[t].apply(e, o)
              : "function" === n.type(t) && t.apply(e, o),
            e)
          );
        },
        open: function (t, e, n) {
          return new b(t, e, n);
        },
        close: function (t) {
          var e = this.getInstance();
          e && (e.close(), !0 === t && this.close(t));
        },
        destroy: function () {
          this.close(!0), r.add("body").off("click.fb-start", "**");
        },
        isMobile:
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
          ),
        use3d: (function () {
          var n = e.createElement("div");
          return (
            t.getComputedStyle &&
            t.getComputedStyle(n) &&
            t.getComputedStyle(n).getPropertyValue("transform") &&
            !(e.documentMode && e.documentMode < 11)
          );
        })(),
        getTranslate: function (t) {
          var e;
          return (
            !(!t || !t.length) &&
            ((e = t[0].getBoundingClientRect()),
            {
              top: e.top || 0,
              left: e.left || 0,
              width: e.width,
              height: e.height,
              opacity: parseFloat(t.css("opacity")),
            })
          );
        },
        setTranslate: function (t, e) {
          var n = "",
            o = {};
          if (t && e)
            return (
              (void 0 === e.left && void 0 === e.top) ||
                ((n =
                  (void 0 === e.left ? t.position().left : e.left) +
                  "px, " +
                  (void 0 === e.top ? t.position().top : e.top) +
                  "px"),
                (n = this.use3d
                  ? "translate3d(" + n + ", 0px)"
                  : "translate(" + n + ")")),
              void 0 !== e.scaleX && void 0 !== e.scaleY
                ? (n += " scale(" + e.scaleX + ", " + e.scaleY + ")")
                : void 0 !== e.scaleX && (n += " scaleX(" + e.scaleX + ")"),
              n.length && (o.transform = n),
              void 0 !== e.opacity && (o.opacity = e.opacity),
              void 0 !== e.width && (o.width = e.width),
              void 0 !== e.height && (o.height = e.height),
              t.css(o)
            );
        },
        animate: function (t, e, o, i, a) {
          var s,
            r = this;
          n.isFunction(o) && ((i = o), (o = null)),
            r.stop(t),
            (s = r.getTranslate(t)),
            t.on(f, function (c) {
              (!c ||
                !c.originalEvent ||
                (t.is(c.originalEvent.target) &&
                  "z-index" != c.originalEvent.propertyName)) &&
                (r.stop(t),
                n.isNumeric(o) && t.css("transition-duration", ""),
                n.isPlainObject(e)
                  ? void 0 !== e.scaleX &&
                    void 0 !== e.scaleY &&
                    r.setTranslate(t, {
                      top: e.top,
                      left: e.left,
                      width: s.width * e.scaleX,
                      height: s.height * e.scaleY,
                      scaleX: 1,
                      scaleY: 1,
                    })
                  : !0 !== a && t.removeClass(e),
                n.isFunction(i) && i(c));
            }),
            n.isNumeric(o) && t.css("transition-duration", o + "ms"),
            n.isPlainObject(e)
              ? (void 0 !== e.scaleX &&
                  void 0 !== e.scaleY &&
                  (delete e.width,
                  delete e.height,
                  t.parent().hasClass("fancybox-slide--image") &&
                    t.parent().addClass("fancybox-is-scaling")),
                n.fancybox.setTranslate(t, e))
              : t.addClass(e),
            t.data(
              "timer",
              setTimeout(function () {
                t.trigger(f);
              }, o + 33)
            );
        },
        stop: function (t, e) {
          t &&
            t.length &&
            (clearTimeout(t.data("timer")),
            e && t.trigger(f),
            t.off(f).css("transition-duration", ""),
            t.parent().removeClass("fancybox-is-scaling"));
        },
      }),
      (n.fn.fancybox = function (t) {
        var e;
        return (
          (t = t || {}),
          (e = t.selector || !1),
          e
            ? n("body")
                .off("click.fb-start", e)
                .on("click.fb-start", e, { options: t }, i)
            : this.off("click.fb-start").on(
                "click.fb-start",
                { items: this, options: t },
                i
              ),
          this
        );
      }),
      r.on("click.fb-start", "[data-fancybox]", i),
      r.on("click.fb-start", "[data-fancybox-trigger]", function (t) {
        n('[data-fancybox="' + n(this).attr("data-fancybox-trigger") + '"]')
          .eq(n(this).attr("data-fancybox-index") || 0)
          .trigger("click.fb-start", { $trigger: n(this) });
      }),
      (function () {
        var t = null;
        r.on("mousedown mouseup focus blur", ".fancybox-button", function (e) {
          switch (e.type) {
            case "mousedown":
              t = n(this);
              break;
            case "mouseup":
              t = null;
              break;
            case "focusin":
              n(".fancybox-button").removeClass("fancybox-focus"),
                n(this).is(t) ||
                  n(this).is("[disabled]") ||
                  n(this).addClass("fancybox-focus");
              break;
            case "focusout":
              n(".fancybox-button").removeClass("fancybox-focus");
          }
        });
      })();
  }
})(window, document, jQuery),
  (function (t) {
    "use strict";
    var e = {
        youtube: {
          matcher:
            /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
          params: {
            autoplay: 1,
            autohide: 1,
            fs: 1,
            rel: 0,
            hd: 1,
            wmode: "transparent",
            enablejsapi: 1,
            html5: 1,
          },
          paramPlace: 8,
          type: "iframe",
          url: "https://www.youtube-nocookie.com/embed/$4",
          thumb: "https://img.youtube.com/vi/$4/hqdefault.jpg",
        },
        vimeo: {
          matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
          params: {
            autoplay: 1,
            hd: 1,
            show_title: 1,
            show_byline: 1,
            show_portrait: 0,
            fullscreen: 1,
          },
          paramPlace: 3,
          type: "iframe",
          url: "//player.vimeo.com/video/$2",
        },
        instagram: {
          matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
          type: "image",
          url: "//$1/p/$2/media/?size=l",
        },
        gmap_place: {
          matcher:
            /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
          type: "iframe",
          url: function (t) {
            return (
              "//maps.google." +
              t[2] +
              "/?ll=" +
              (t[9]
                ? t[9] +
                  "&z=" +
                  Math.floor(t[10]) +
                  (t[12] ? t[12].replace(/^\//, "&") : "")
                : t[12] + ""
              ).replace(/\?/, "&") +
              "&output=" +
              (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
            );
          },
        },
        gmap_search: {
          matcher:
            /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
          type: "iframe",
          url: function (t) {
            return (
              "//maps.google." +
              t[2] +
              "/maps?q=" +
              t[5].replace("query=", "q=").replace("api=1", "") +
              "&output=embed"
            );
          },
        },
      },
      n = function (e, n, o) {
        if (e)
          return (
            (o = o || ""),
            "object" === t.type(o) && (o = t.param(o, !0)),
            t.each(n, function (t, n) {
              e = e.replace("$" + t, n || "");
            }),
            o.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + o),
            e
          );
      };
    t(document).on("objectNeedsType.fb", function (o, i, a) {
      var s,
        r,
        c,
        l,
        d,
        u,
        f,
        p = a.src || "",
        h = !1;
      (s = t.extend(!0, {}, e, a.opts.media)),
        t.each(s, function (e, o) {
          if ((c = p.match(o.matcher))) {
            if (
              ((h = o.type), (f = e), (u = {}), o.paramPlace && c[o.paramPlace])
            ) {
              (d = c[o.paramPlace]),
                "?" == d[0] && (d = d.substring(1)),
                (d = d.split("&"));
              for (var i = 0; i < d.length; ++i) {
                var s = d[i].split("=", 2);
                2 == s.length &&
                  (u[s[0]] = decodeURIComponent(s[1].replace(/\+/g, " ")));
              }
            }
            return (
              (l = t.extend(!0, {}, o.params, a.opts[e], u)),
              (p =
                "function" === t.type(o.url)
                  ? o.url.call(this, c, l, a)
                  : n(o.url, c, l)),
              (r =
                "function" === t.type(o.thumb)
                  ? o.thumb.call(this, c, l, a)
                  : n(o.thumb, c)),
              "youtube" === e
                ? (p = p.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, n, o) {
                    return (
                      "&start=" +
                      ((n ? 60 * parseInt(n, 10) : 0) + parseInt(o, 10))
                    );
                  }))
                : "vimeo" === e && (p = p.replace("&%23", "#")),
              !1
            );
          }
        }),
        h
          ? (a.opts.thumb ||
              (a.opts.$thumb && a.opts.$thumb.length) ||
              (a.opts.thumb = r),
            "iframe" === h &&
              (a.opts = t.extend(!0, a.opts, {
                iframe: { preload: !1, attr: { scrolling: "no" } },
              })),
            t.extend(a, {
              type: h,
              src: p,
              origSrc: a.src,
              contentSource: f,
              contentType:
                "image" === h
                  ? "image"
                  : "gmap_place" == f || "gmap_search" == f
                  ? "map"
                  : "video",
            }))
          : p && (a.type = a.opts.defaultType);
    });
    var o = {
      youtube: {
        src: "https://www.youtube.com/iframe_api",
        class: "YT",
        loading: !1,
        loaded: !1,
      },
      vimeo: {
        src: "https://player.vimeo.com/api/player.js",
        class: "Vimeo",
        loading: !1,
        loaded: !1,
      },
      load: function (t) {
        var e,
          n = this;
        if (this[t].loaded)
          return void setTimeout(function () {
            n.done(t);
          });
        this[t].loading ||
          ((this[t].loading = !0),
          (e = document.createElement("script")),
          (e.type = "text/javascript"),
          (e.src = this[t].src),
          "youtube" === t
            ? (window.onYouTubeIframeAPIReady = function () {
                (n[t].loaded = !0), n.done(t);
              })
            : (e.onload = function () {
                (n[t].loaded = !0), n.done(t);
              }),
          document.body.appendChild(e));
      },
      done: function (e) {
        var n, o, i;
        "youtube" === e && delete window.onYouTubeIframeAPIReady,
          (n = t.fancybox.getInstance()) &&
            ((o = n.current.$content.find("iframe")),
            "youtube" === e && void 0 !== YT && YT
              ? (i = new YT.Player(o.attr("id"), {
                  events: {
                    onStateChange: function (t) {
                      0 == t.data && n.next();
                    },
                  },
                }))
              : "vimeo" === e &&
                void 0 !== Vimeo &&
                Vimeo &&
                ((i = new Vimeo.Player(o)),
                i.on("ended", function () {
                  n.next();
                })));
      },
    };
    t(document).on({
      "afterShow.fb": function (t, e, n) {
        e.group.length > 1 &&
          ("youtube" === n.contentSource || "vimeo" === n.contentSource) &&
          o.load(n.contentSource);
      },
    });
  })(jQuery),
  (function (t, e, n) {
    "use strict";
    var o = (function () {
        return (
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60);
          }
        );
      })(),
      i = (function () {
        return (
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e);
          }
        );
      })(),
      a = function (e) {
        var n = [];
        (e = e.originalEvent || e || t.e),
          (e =
            e.touches && e.touches.length
              ? e.touches
              : e.changedTouches && e.changedTouches.length
              ? e.changedTouches
              : [e]);
        for (var o in e)
          e[o].pageX
            ? n.push({ x: e[o].pageX, y: e[o].pageY })
            : e[o].clientX && n.push({ x: e[o].clientX, y: e[o].clientY });
        return n;
      },
      s = function (t, e, n) {
        return e && t
          ? "x" === n
            ? t.x - e.x
            : "y" === n
            ? t.y - e.y
            : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
          : 0;
      },
      r = function (t) {
        if (
          t.is(
            'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe'
          ) ||
          n.isFunction(t.get(0).onclick) ||
          t.data("selectable")
        )
          return !0;
        for (var e = 0, o = t[0].attributes, i = o.length; e < i; e++)
          if ("data-fancybox-" === o[e].nodeName.substr(0, 14)) return !0;
        return !1;
      },
      c = function (e) {
        var n = t.getComputedStyle(e)["overflow-y"],
          o = t.getComputedStyle(e)["overflow-x"],
          i =
            ("scroll" === n || "auto" === n) && e.scrollHeight > e.clientHeight,
          a = ("scroll" === o || "auto" === o) && e.scrollWidth > e.clientWidth;
        return i || a;
      },
      l = function (t) {
        for (var e = !1; ; ) {
          if ((e = c(t.get(0)))) break;
          if (
            ((t = t.parent()),
            !t.length || t.hasClass("fancybox-stage") || t.is("body"))
          )
            break;
        }
        return e;
      },
      d = function (t) {
        var e = this;
        (e.instance = t),
          (e.$bg = t.$refs.bg),
          (e.$stage = t.$refs.stage),
          (e.$container = t.$refs.container),
          e.destroy(),
          e.$container.on(
            "touchstart.fb.touch mousedown.fb.touch",
            n.proxy(e, "ontouchstart")
          );
      };
    (d.prototype.destroy = function () {
      var t = this;
      t.$container.off(".fb.touch"),
        n(e).off(".fb.touch"),
        t.requestId && (i(t.requestId), (t.requestId = null)),
        t.tapped && (clearTimeout(t.tapped), (t.tapped = null));
    }),
      (d.prototype.ontouchstart = function (o) {
        var i = this,
          c = n(o.target),
          d = i.instance,
          u = d.current,
          f = u.$slide,
          p = u.$content,
          h = "touchstart" == o.type;
        if (
          (h && i.$container.off("mousedown.fb.touch"),
          (!o.originalEvent || 2 != o.originalEvent.button) &&
            f.length &&
            c.length &&
            !r(c) &&
            !r(c.parent()) &&
            (c.is("img") ||
              !(o.originalEvent.clientX > c[0].clientWidth + c.offset().left)))
        ) {
          if (!u || d.isAnimating || u.$slide.hasClass("fancybox-animated"))
            return o.stopPropagation(), void o.preventDefault();
          (i.realPoints = i.startPoints = a(o)),
            i.startPoints.length &&
              (u.touch && o.stopPropagation(),
              (i.startEvent = o),
              (i.canTap = !0),
              (i.$target = c),
              (i.$content = p),
              (i.opts = u.opts.touch),
              (i.isPanning = !1),
              (i.isSwiping = !1),
              (i.isZooming = !1),
              (i.isScrolling = !1),
              (i.canPan = d.canPan()),
              (i.startTime = new Date().getTime()),
              (i.distanceX = i.distanceY = i.distance = 0),
              (i.canvasWidth = Math.round(f[0].clientWidth)),
              (i.canvasHeight = Math.round(f[0].clientHeight)),
              (i.contentLastPos = null),
              (i.contentStartPos = n.fancybox.getTranslate(i.$content) || {
                top: 0,
                left: 0,
              }),
              (i.sliderStartPos = n.fancybox.getTranslate(f)),
              (i.stagePos = n.fancybox.getTranslate(d.$refs.stage)),
              (i.sliderStartPos.top -= i.stagePos.top),
              (i.sliderStartPos.left -= i.stagePos.left),
              (i.contentStartPos.top -= i.stagePos.top),
              (i.contentStartPos.left -= i.stagePos.left),
              n(e)
                .off(".fb.touch")
                .on(
                  h
                    ? "touchend.fb.touch touchcancel.fb.touch"
                    : "mouseup.fb.touch mouseleave.fb.touch",
                  n.proxy(i, "ontouchend")
                )
                .on(
                  h ? "touchmove.fb.touch" : "mousemove.fb.touch",
                  n.proxy(i, "ontouchmove")
                ),
              n.fancybox.isMobile &&
                e.addEventListener("scroll", i.onscroll, !0),
              (((i.opts || i.canPan) &&
                (c.is(i.$stage) || i.$stage.find(c).length)) ||
                (c.is(".fancybox-image") && o.preventDefault(),
                n.fancybox.isMobile &&
                  c.parents(".fancybox-caption").length)) &&
                ((i.isScrollable = l(c) || l(c.parent())),
                (n.fancybox.isMobile && i.isScrollable) || o.preventDefault(),
                (1 === i.startPoints.length || u.hasError) &&
                  (i.canPan
                    ? (n.fancybox.stop(i.$content), (i.isPanning = !0))
                    : (i.isSwiping = !0),
                  i.$container.addClass("fancybox-is-grabbing")),
                2 === i.startPoints.length &&
                  "image" === u.type &&
                  (u.isLoaded || u.$ghost) &&
                  ((i.canTap = !1),
                  (i.isSwiping = !1),
                  (i.isPanning = !1),
                  (i.isZooming = !0),
                  n.fancybox.stop(i.$content),
                  (i.centerPointStartX =
                    0.5 * (i.startPoints[0].x + i.startPoints[1].x) -
                    n(t).scrollLeft()),
                  (i.centerPointStartY =
                    0.5 * (i.startPoints[0].y + i.startPoints[1].y) -
                    n(t).scrollTop()),
                  (i.percentageOfImageAtPinchPointX =
                    (i.centerPointStartX - i.contentStartPos.left) /
                    i.contentStartPos.width),
                  (i.percentageOfImageAtPinchPointY =
                    (i.centerPointStartY - i.contentStartPos.top) /
                    i.contentStartPos.height),
                  (i.startDistanceBetweenFingers = s(
                    i.startPoints[0],
                    i.startPoints[1]
                  )))));
        }
      }),
      (d.prototype.onscroll = function (t) {
        var n = this;
        (n.isScrolling = !0), e.removeEventListener("scroll", n.onscroll, !0);
      }),
      (d.prototype.ontouchmove = function (t) {
        var e = this;
        return void 0 !== t.originalEvent.buttons &&
          0 === t.originalEvent.buttons
          ? void e.ontouchend(t)
          : e.isScrolling
          ? void (e.canTap = !1)
          : ((e.newPoints = a(t)),
            void (
              (e.opts || e.canPan) &&
              e.newPoints.length &&
              e.newPoints.length &&
              ((e.isSwiping && !0 === e.isSwiping) || t.preventDefault(),
              (e.distanceX = s(e.newPoints[0], e.startPoints[0], "x")),
              (e.distanceY = s(e.newPoints[0], e.startPoints[0], "y")),
              (e.distance = s(e.newPoints[0], e.startPoints[0])),
              e.distance > 0 &&
                (e.isSwiping
                  ? e.onSwipe(t)
                  : e.isPanning
                  ? e.onPan()
                  : e.isZooming && e.onZoom()))
            ));
      }),
      (d.prototype.onSwipe = function (e) {
        var a,
          s = this,
          r = s.instance,
          c = s.isSwiping,
          l = s.sliderStartPos.left || 0;
        if (!0 !== c)
          "x" == c &&
            (s.distanceX > 0 &&
            (s.instance.group.length < 2 ||
              (0 === s.instance.current.index && !s.instance.current.opts.loop))
              ? (l += Math.pow(s.distanceX, 0.8))
              : s.distanceX < 0 &&
                (s.instance.group.length < 2 ||
                  (s.instance.current.index === s.instance.group.length - 1 &&
                    !s.instance.current.opts.loop))
              ? (l -= Math.pow(-s.distanceX, 0.8))
              : (l += s.distanceX)),
            (s.sliderLastPos = {
              top: "x" == c ? 0 : s.sliderStartPos.top + s.distanceY,
              left: l,
            }),
            s.requestId && (i(s.requestId), (s.requestId = null)),
            (s.requestId = o(function () {
              s.sliderLastPos &&
                (n.each(s.instance.slides, function (t, e) {
                  var o = e.pos - s.instance.currPos;
                  n.fancybox.setTranslate(e.$slide, {
                    top: s.sliderLastPos.top,
                    left:
                      s.sliderLastPos.left +
                      o * s.canvasWidth +
                      o * e.opts.gutter,
                  });
                }),
                s.$container.addClass("fancybox-is-sliding"));
            }));
        else if (Math.abs(s.distance) > 10) {
          if (
            ((s.canTap = !1),
            r.group.length < 2 && s.opts.vertical
              ? (s.isSwiping = "y")
              : r.isDragging ||
                !1 === s.opts.vertical ||
                ("auto" === s.opts.vertical && n(t).width() > 800)
              ? (s.isSwiping = "x")
              : ((a = Math.abs(
                  (180 * Math.atan2(s.distanceY, s.distanceX)) / Math.PI
                )),
                (s.isSwiping = a > 45 && a < 135 ? "y" : "x")),
            "y" === s.isSwiping && n.fancybox.isMobile && s.isScrollable)
          )
            return void (s.isScrolling = !0);
          (r.isDragging = s.isSwiping),
            (s.startPoints = s.newPoints),
            n.each(r.slides, function (t, e) {
              var o, i;
              n.fancybox.stop(e.$slide),
                (o = n.fancybox.getTranslate(e.$slide)),
                (i = n.fancybox.getTranslate(r.$refs.stage)),
                e.$slide
                  .css({
                    transform: "",
                    opacity: "",
                    "transition-duration": "",
                  })
                  .removeClass("fancybox-animated")
                  .removeClass(function (t, e) {
                    return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(" ");
                  }),
                e.pos === r.current.pos &&
                  ((s.sliderStartPos.top = o.top - i.top),
                  (s.sliderStartPos.left = o.left - i.left)),
                n.fancybox.setTranslate(e.$slide, {
                  top: o.top - i.top,
                  left: o.left - i.left,
                });
            }),
            r.SlideShow && r.SlideShow.isActive && r.SlideShow.stop();
        }
      }),
      (d.prototype.onPan = function () {
        var t = this;
        if (s(t.newPoints[0], t.realPoints[0]) < (n.fancybox.isMobile ? 10 : 5))
          return void (t.startPoints = t.newPoints);
        (t.canTap = !1),
          (t.contentLastPos = t.limitMovement()),
          t.requestId && i(t.requestId),
          (t.requestId = o(function () {
            n.fancybox.setTranslate(t.$content, t.contentLastPos);
          }));
      }),
      (d.prototype.limitMovement = function () {
        var t,
          e,
          n,
          o,
          i,
          a,
          s = this,
          r = s.canvasWidth,
          c = s.canvasHeight,
          l = s.distanceX,
          d = s.distanceY,
          u = s.contentStartPos,
          f = u.left,
          p = u.top,
          h = u.width,
          g = u.height;
        return (
          (i = h > r ? f + l : f),
          (a = p + d),
          (t = Math.max(0, 0.5 * r - 0.5 * h)),
          (e = Math.max(0, 0.5 * c - 0.5 * g)),
          (n = Math.min(r - h, 0.5 * r - 0.5 * h)),
          (o = Math.min(c - g, 0.5 * c - 0.5 * g)),
          l > 0 && i > t && (i = t - 1 + Math.pow(-t + f + l, 0.8) || 0),
          l < 0 && i < n && (i = n + 1 - Math.pow(n - f - l, 0.8) || 0),
          d > 0 && a > e && (a = e - 1 + Math.pow(-e + p + d, 0.8) || 0),
          d < 0 && a < o && (a = o + 1 - Math.pow(o - p - d, 0.8) || 0),
          { top: a, left: i }
        );
      }),
      (d.prototype.limitPosition = function (t, e, n, o) {
        var i = this,
          a = i.canvasWidth,
          s = i.canvasHeight;
        return (
          n > a
            ? ((t = t > 0 ? 0 : t), (t = t < a - n ? a - n : t))
            : (t = Math.max(0, a / 2 - n / 2)),
          o > s
            ? ((e = e > 0 ? 0 : e), (e = e < s - o ? s - o : e))
            : (e = Math.max(0, s / 2 - o / 2)),
          { top: e, left: t }
        );
      }),
      (d.prototype.onZoom = function () {
        var e = this,
          a = e.contentStartPos,
          r = a.width,
          c = a.height,
          l = a.left,
          d = a.top,
          u = s(e.newPoints[0], e.newPoints[1]),
          f = u / e.startDistanceBetweenFingers,
          p = Math.floor(r * f),
          h = Math.floor(c * f),
          g = (r - p) * e.percentageOfImageAtPinchPointX,
          b = (c - h) * e.percentageOfImageAtPinchPointY,
          m = (e.newPoints[0].x + e.newPoints[1].x) / 2 - n(t).scrollLeft(),
          v = (e.newPoints[0].y + e.newPoints[1].y) / 2 - n(t).scrollTop(),
          y = m - e.centerPointStartX,
          x = v - e.centerPointStartY,
          w = l + (g + y),
          $ = d + (b + x),
          S = { top: $, left: w, scaleX: f, scaleY: f };
        (e.canTap = !1),
          (e.newWidth = p),
          (e.newHeight = h),
          (e.contentLastPos = S),
          e.requestId && i(e.requestId),
          (e.requestId = o(function () {
            n.fancybox.setTranslate(e.$content, e.contentLastPos);
          }));
      }),
      (d.prototype.ontouchend = function (t) {
        var o = this,
          s = o.isSwiping,
          r = o.isPanning,
          c = o.isZooming,
          l = o.isScrolling;
        if (
          ((o.endPoints = a(t)),
          (o.dMs = Math.max(new Date().getTime() - o.startTime, 1)),
          o.$container.removeClass("fancybox-is-grabbing"),
          n(e).off(".fb.touch"),
          e.removeEventListener("scroll", o.onscroll, !0),
          o.requestId && (i(o.requestId), (o.requestId = null)),
          (o.isSwiping = !1),
          (o.isPanning = !1),
          (o.isZooming = !1),
          (o.isScrolling = !1),
          (o.instance.isDragging = !1),
          o.canTap)
        )
          return o.onTap(t);
        (o.speed = 100),
          (o.velocityX = (o.distanceX / o.dMs) * 0.5),
          (o.velocityY = (o.distanceY / o.dMs) * 0.5),
          r ? o.endPanning() : c ? o.endZooming() : o.endSwiping(s, l);
      }),
      (d.prototype.endSwiping = function (t, e) {
        var o = this,
          i = !1,
          a = o.instance.group.length,
          s = Math.abs(o.distanceX),
          r = "x" == t && a > 1 && ((o.dMs > 130 && s > 10) || s > 50);
        (o.sliderLastPos = null),
          "y" == t && !e && Math.abs(o.distanceY) > 50
            ? (n.fancybox.animate(
                o.instance.current.$slide,
                {
                  top: o.sliderStartPos.top + o.distanceY + 150 * o.velocityY,
                  opacity: 0,
                },
                200
              ),
              (i = o.instance.close(!0, 250)))
            : r && o.distanceX > 0
            ? (i = o.instance.previous(300))
            : r && o.distanceX < 0 && (i = o.instance.next(300)),
          !1 !== i || ("x" != t && "y" != t) || o.instance.centerSlide(200),
          o.$container.removeClass("fancybox-is-sliding");
      }),
      (d.prototype.endPanning = function () {
        var t,
          e,
          o,
          i = this;
        i.contentLastPos &&
          (!1 === i.opts.momentum || i.dMs > 350
            ? ((t = i.contentLastPos.left), (e = i.contentLastPos.top))
            : ((t = i.contentLastPos.left + 500 * i.velocityX),
              (e = i.contentLastPos.top + 500 * i.velocityY)),
          (o = i.limitPosition(
            t,
            e,
            i.contentStartPos.width,
            i.contentStartPos.height
          )),
          (o.width = i.contentStartPos.width),
          (o.height = i.contentStartPos.height),
          n.fancybox.animate(i.$content, o, 366));
      }),
      (d.prototype.endZooming = function () {
        var t,
          e,
          o,
          i,
          a = this,
          s = a.instance.current,
          r = a.newWidth,
          c = a.newHeight;
        a.contentLastPos &&
          ((t = a.contentLastPos.left),
          (e = a.contentLastPos.top),
          (i = { top: e, left: t, width: r, height: c, scaleX: 1, scaleY: 1 }),
          n.fancybox.setTranslate(a.$content, i),
          r < a.canvasWidth && c < a.canvasHeight
            ? a.instance.scaleToFit(150)
            : r > s.width || c > s.height
            ? a.instance.scaleToActual(
                a.centerPointStartX,
                a.centerPointStartY,
                150
              )
            : ((o = a.limitPosition(t, e, r, c)),
              n.fancybox.animate(a.$content, o, 150)));
      }),
      (d.prototype.onTap = function (e) {
        var o,
          i = this,
          s = n(e.target),
          r = i.instance,
          c = r.current,
          l = (e && a(e)) || i.startPoints,
          d = l[0] ? l[0].x - n(t).scrollLeft() - i.stagePos.left : 0,
          u = l[0] ? l[0].y - n(t).scrollTop() - i.stagePos.top : 0,
          f = function (t) {
            var o = c.opts[t];
            if ((n.isFunction(o) && (o = o.apply(r, [c, e])), o))
              switch (o) {
                case "close":
                  r.close(i.startEvent);
                  break;
                case "toggleControls":
                  r.toggleControls();
                  break;
                case "next":
                  r.next();
                  break;
                case "nextOrClose":
                  r.group.length > 1 ? r.next() : r.close(i.startEvent);
                  break;
                case "zoom":
                  "image" == c.type &&
                    (c.isLoaded || c.$ghost) &&
                    (r.canPan()
                      ? r.scaleToFit()
                      : r.isScaledDown()
                      ? r.scaleToActual(d, u)
                      : r.group.length < 2 && r.close(i.startEvent));
              }
          };
        if (
          (!e.originalEvent || 2 != e.originalEvent.button) &&
          (s.is("img") || !(d > s[0].clientWidth + s.offset().left))
        ) {
          if (
            s.is(
              ".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"
            )
          )
            o = "Outside";
          else if (s.is(".fancybox-slide")) o = "Slide";
          else {
            if (
              !r.current.$content ||
              !r.current.$content.find(s).addBack().filter(s).length
            )
              return;
            o = "Content";
          }
          if (i.tapped) {
            if (
              (clearTimeout(i.tapped),
              (i.tapped = null),
              Math.abs(d - i.tapX) > 50 || Math.abs(u - i.tapY) > 50)
            )
              return this;
            f("dblclick" + o);
          } else
            (i.tapX = d),
              (i.tapY = u),
              c.opts["dblclick" + o] &&
              c.opts["dblclick" + o] !== c.opts["click" + o]
                ? (i.tapped = setTimeout(function () {
                    (i.tapped = null), r.isAnimating || f("click" + o);
                  }, 500))
                : f("click" + o);
          return this;
        }
      }),
      n(e)
        .on("onActivate.fb", function (t, e) {
          e && !e.Guestures && (e.Guestures = new d(e));
        })
        .on("beforeClose.fb", function (t, e) {
          e && e.Guestures && e.Guestures.destroy();
        });
  })(window, document, jQuery),
  (function (t, e) {
    "use strict";
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        slideShow:
          '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
      },
      slideShow: { autoStart: !1, speed: 3e3, progress: !0 },
    });
    var n = function (t) {
      (this.instance = t), this.init();
    };
    e.extend(n.prototype, {
      timer: null,
      isActive: !1,
      $button: null,
      init: function () {
        var t = this,
          n = t.instance,
          o = n.group[n.currIndex].opts.slideShow;
        (t.$button = n.$refs.toolbar
          .find("[data-fancybox-play]")
          .on("click", function () {
            t.toggle();
          })),
          n.group.length < 2 || !o
            ? t.$button.hide()
            : o.progress &&
              (t.$progress = e(
                '<div class="fancybox-progress"></div>'
              ).appendTo(n.$refs.inner));
      },
      set: function (t) {
        var n = this,
          o = n.instance,
          i = o.current;
        i && (!0 === t || i.opts.loop || o.currIndex < o.group.length - 1)
          ? n.isActive &&
            "video" !== i.contentType &&
            (n.$progress &&
              e.fancybox.animate(
                n.$progress.show(),
                { scaleX: 1 },
                i.opts.slideShow.speed
              ),
            (n.timer = setTimeout(function () {
              o.current.opts.loop || o.current.index != o.group.length - 1
                ? o.next()
                : o.jumpTo(0);
            }, i.opts.slideShow.speed)))
          : (n.stop(), (o.idleSecondsCounter = 0), o.showControls());
      },
      clear: function () {
        var t = this;
        clearTimeout(t.timer),
          (t.timer = null),
          t.$progress && t.$progress.removeAttr("style").hide();
      },
      start: function () {
        var t = this,
          e = t.instance.current;
        e &&
          (t.$button
            .attr(
              "title",
              (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_STOP
            )
            .removeClass("fancybox-button--play")
            .addClass("fancybox-button--pause"),
          (t.isActive = !0),
          e.isComplete && t.set(!0),
          t.instance.trigger("onSlideShowChange", !0));
      },
      stop: function () {
        var t = this,
          e = t.instance.current;
        t.clear(),
          t.$button
            .attr(
              "title",
              (e.opts.i18n[e.opts.lang] || e.opts.i18n.en).PLAY_START
            )
            .removeClass("fancybox-button--pause")
            .addClass("fancybox-button--play"),
          (t.isActive = !1),
          t.instance.trigger("onSlideShowChange", !1),
          t.$progress && t.$progress.removeAttr("style").hide();
      },
      toggle: function () {
        var t = this;
        t.isActive ? t.stop() : t.start();
      },
    }),
      e(t).on({
        "onInit.fb": function (t, e) {
          e && !e.SlideShow && (e.SlideShow = new n(e));
        },
        "beforeShow.fb": function (t, e, n, o) {
          var i = e && e.SlideShow;
          o
            ? i && n.opts.slideShow.autoStart && i.start()
            : i && i.isActive && i.clear();
        },
        "afterShow.fb": function (t, e, n) {
          var o = e && e.SlideShow;
          o && o.isActive && o.set();
        },
        "afterKeydown.fb": function (n, o, i, a, s) {
          var r = o && o.SlideShow;
          !r ||
            !i.opts.slideShow ||
            (80 !== s && 32 !== s) ||
            e(t.activeElement).is("button,a,input") ||
            (a.preventDefault(), r.toggle());
        },
        "beforeClose.fb onDeactivate.fb": function (t, e) {
          var n = e && e.SlideShow;
          n && n.stop();
        },
      }),
      e(t).on("visibilitychange", function () {
        var n = e.fancybox.getInstance(),
          o = n && n.SlideShow;
        o && o.isActive && (t.hidden ? o.clear() : o.set());
      });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    var n = (function () {
      for (
        var e = [
            [
              "requestFullscreen",
              "exitFullscreen",
              "fullscreenElement",
              "fullscreenEnabled",
              "fullscreenchange",
              "fullscreenerror",
            ],
            [
              "webkitRequestFullscreen",
              "webkitExitFullscreen",
              "webkitFullscreenElement",
              "webkitFullscreenEnabled",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "webkitRequestFullScreen",
              "webkitCancelFullScreen",
              "webkitCurrentFullScreenElement",
              "webkitCancelFullScreen",
              "webkitfullscreenchange",
              "webkitfullscreenerror",
            ],
            [
              "mozRequestFullScreen",
              "mozCancelFullScreen",
              "mozFullScreenElement",
              "mozFullScreenEnabled",
              "mozfullscreenchange",
              "mozfullscreenerror",
            ],
            [
              "msRequestFullscreen",
              "msExitFullscreen",
              "msFullscreenElement",
              "msFullscreenEnabled",
              "MSFullscreenChange",
              "MSFullscreenError",
            ],
          ],
          n = {},
          o = 0;
        o < e.length;
        o++
      ) {
        var i = e[o];
        if (i && i[1] in t) {
          for (var a = 0; a < i.length; a++) n[e[0][a]] = i[a];
          return n;
        }
      }
      return !1;
    })();
    if (n) {
      var o = {
        request: function (e) {
          (e = e || t.documentElement),
            e[n.requestFullscreen](e.ALLOW_KEYBOARD_INPUT);
        },
        exit: function () {
          t[n.exitFullscreen]();
        },
        toggle: function (e) {
          (e = e || t.documentElement),
            this.isFullscreen() ? this.exit() : this.request(e);
        },
        isFullscreen: function () {
          return Boolean(t[n.fullscreenElement]);
        },
        enabled: function () {
          return Boolean(t[n.fullscreenEnabled]);
        },
      };
      e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
          fullScreen:
            '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
        },
        fullScreen: { autoStart: !1 },
      }),
        e(t).on(n.fullscreenchange, function () {
          var t = o.isFullscreen(),
            n = e.fancybox.getInstance();
          n &&
            (n.current &&
              "image" === n.current.type &&
              n.isAnimating &&
              ((n.isAnimating = !1),
              n.update(!0, !0, 0),
              n.isComplete || n.complete()),
            n.trigger("onFullscreenChange", t),
            n.$refs.container.toggleClass("fancybox-is-fullscreen", t),
            n.$refs.toolbar
              .find("[data-fancybox-fullscreen]")
              .toggleClass("fancybox-button--fsenter", !t)
              .toggleClass("fancybox-button--fsexit", t));
        });
    }
    e(t).on({
      "onInit.fb": function (t, e) {
        var i;
        if (!n)
          return void e.$refs.toolbar
            .find("[data-fancybox-fullscreen]")
            .remove();
        e && e.group[e.currIndex].opts.fullScreen
          ? ((i = e.$refs.container),
            i.on(
              "click.fb-fullscreen",
              "[data-fancybox-fullscreen]",
              function (t) {
                t.stopPropagation(), t.preventDefault(), o.toggle();
              }
            ),
            e.opts.fullScreen &&
              !0 === e.opts.fullScreen.autoStart &&
              o.request(),
            (e.FullScreen = o))
          : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide();
      },
      "afterKeydown.fb": function (t, e, n, o, i) {
        e &&
          e.FullScreen &&
          70 === i &&
          (o.preventDefault(), e.FullScreen.toggle());
      },
      "beforeClose.fb": function (t, e) {
        e &&
          e.FullScreen &&
          e.$refs.container.hasClass("fancybox-is-fullscreen") &&
          o.exit();
      },
    });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    var n = "fancybox-thumbs";
    e.fancybox.defaults = e.extend(
      !0,
      {
        btnTpl: {
          thumbs:
            '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
        },
        thumbs: {
          autoStart: !1,
          hideOnClose: !0,
          parentEl: ".fancybox-container",
          axis: "y",
        },
      },
      e.fancybox.defaults
    );
    var o = function (t) {
      this.init(t);
    };
    e.extend(o.prototype, {
      $button: null,
      $grid: null,
      $list: null,
      isVisible: !1,
      isActive: !1,
      init: function (t) {
        var e = this,
          n = t.group,
          o = 0;
        (e.instance = t),
          (e.opts = n[t.currIndex].opts.thumbs),
          (t.Thumbs = e),
          (e.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]"));
        for (
          var i = 0, a = n.length;
          i < a && (n[i].thumb && o++, !(o > 1));
          i++
        );
        o > 1 && e.opts
          ? (e.$button.removeAttr("style").on("click", function () {
              e.toggle();
            }),
            (e.isActive = !0))
          : e.$button.hide();
      },
      create: function () {
        var t,
          o = this,
          i = o.instance,
          a = o.opts.parentEl,
          s = [];
        o.$grid ||
          ((o.$grid = e(
            '<div class="' + n + " " + n + "-" + o.opts.axis + '"></div>'
          ).appendTo(i.$refs.container.find(a).addBack().filter(a))),
          o.$grid.on("click", "a", function () {
            i.jumpTo(e(this).attr("data-index"));
          })),
          o.$list ||
            (o.$list = e('<div class="' + n + '__list">').appendTo(o.$grid)),
          e.each(i.group, function (e, n) {
            (t = n.thumb),
              t || "image" !== n.type || (t = n.src),
              s.push(
                '<a href="javascript:;" tabindex="0" data-index="' +
                  e +
                  '"' +
                  (t && t.length
                    ? ' style="background-image:url(' + t + ')"'
                    : 'class="fancybox-thumbs-missing"') +
                  "></a>"
              );
          }),
          (o.$list[0].innerHTML = s.join("")),
          "x" === o.opts.axis &&
            o.$list.width(
              parseInt(o.$grid.css("padding-right"), 10) +
                i.group.length * o.$list.children().eq(0).outerWidth(!0)
            );
      },
      focus: function (t) {
        var e,
          n,
          o = this,
          i = o.$list,
          a = o.$grid;
        o.instance.current &&
          ((e = i
            .children()
            .removeClass("fancybox-thumbs-active")
            .filter('[data-index="' + o.instance.current.index + '"]')
            .addClass("fancybox-thumbs-active")),
          (n = e.position()),
          "y" === o.opts.axis &&
          (n.top < 0 || n.top > i.height() - e.outerHeight())
            ? i.stop().animate({ scrollTop: i.scrollTop() + n.top }, t)
            : "x" === o.opts.axis &&
              (n.left < a.scrollLeft() ||
                n.left > a.scrollLeft() + (a.width() - e.outerWidth())) &&
              i.parent().stop().animate({ scrollLeft: n.left }, t));
      },
      update: function () {
        var t = this;
        t.instance.$refs.container.toggleClass(
          "fancybox-show-thumbs",
          this.isVisible
        ),
          t.isVisible
            ? (t.$grid || t.create(),
              t.instance.trigger("onThumbsShow"),
              t.focus(0))
            : t.$grid && t.instance.trigger("onThumbsHide"),
          t.instance.update();
      },
      hide: function () {
        (this.isVisible = !1), this.update();
      },
      show: function () {
        (this.isVisible = !0), this.update();
      },
      toggle: function () {
        (this.isVisible = !this.isVisible), this.update();
      },
    }),
      e(t).on({
        "onInit.fb": function (t, e) {
          var n;
          e &&
            !e.Thumbs &&
            ((n = new o(e)), n.isActive && !0 === n.opts.autoStart && n.show());
        },
        "beforeShow.fb": function (t, e, n, o) {
          var i = e && e.Thumbs;
          i && i.isVisible && i.focus(o ? 0 : 250);
        },
        "afterKeydown.fb": function (t, e, n, o, i) {
          var a = e && e.Thumbs;
          a && a.isActive && 71 === i && (o.preventDefault(), a.toggle());
        },
        "beforeClose.fb": function (t, e) {
          var n = e && e.Thumbs;
          n && n.isVisible && !1 !== n.opts.hideOnClose && n.$grid.hide();
        },
      });
  })(document, jQuery),
  (function (t, e) {
    "use strict";
    function n(t) {
      var e = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;",
      };
      return String(t).replace(/[&<>"'`=\/]/g, function (t) {
        return e[t];
      });
    }
    e.extend(!0, e.fancybox.defaults, {
      btnTpl: {
        share:
          '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
      },
      share: {
        url: function (t, e) {
          return (
            (!t.currentHash &&
              "inline" !== e.type &&
              "html" !== e.type &&
              (e.origSrc || e.src)) ||
            window.location
          );
        },
        tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
      },
    }),
      e(t).on("click", "[data-fancybox-share]", function () {
        var t,
          o,
          i = e.fancybox.getInstance(),
          a = i.current || null;
        a &&
          ("function" === e.type(a.opts.share.url) &&
            (t = a.opts.share.url.apply(a, [i, a])),
          (o = a.opts.share.tpl
            .replace(
              /\{\{media\}\}/g,
              "image" === a.type ? encodeURIComponent(a.src) : ""
            )
            .replace(/\{\{url\}\}/g, encodeURIComponent(t))
            .replace(/\{\{url_raw\}\}/g, n(t))
            .replace(
              /\{\{descr\}\}/g,
              i.$caption ? encodeURIComponent(i.$caption.text()) : ""
            )),
          e.fancybox.open({
            src: i.translate(i, o),
            type: "html",
            opts: {
              touch: !1,
              animationEffect: !1,
              afterLoad: function (t, e) {
                i.$refs.container.one("beforeClose.fb", function () {
                  t.close(null, 0);
                }),
                  e.$content.find(".fancybox-share__button").click(function () {
                    return (
                      window.open(this.href, "Share", "width=550, height=450"),
                      !1
                    );
                  });
              },
              mobile: { autoFocus: !1 },
            },
          }));
      });
  })(document, jQuery),
  (function (t, e, n) {
    "use strict";
    function o() {
      var e = t.location.hash.substr(1),
        n = e.split("-"),
        o =
          n.length > 1 && /^\+?\d+$/.test(n[n.length - 1])
            ? parseInt(n.pop(-1), 10) || 1
            : 1,
        i = n.join("-");
      return { hash: e, index: o < 1 ? 1 : o, gallery: i };
    }
    function i(t) {
      "" !== t.gallery &&
        n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']")
          .eq(t.index - 1)
          .focus()
          .trigger("click.fb-start");
    }
    function a(t) {
      var e, n;
      return (
        !!t &&
        ((e = t.current ? t.current.opts : t.opts),
        "" !==
          (n =
            e.hash ||
            (e.$orig
              ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger")
              : "")) && n)
      );
    }
    n.escapeSelector ||
      (n.escapeSelector = function (t) {
        return (t + "").replace(
          /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
          function (t, e) {
            return e
              ? "\0" === t
                ? "�"
                : t.slice(0, -1) +
                  "\\" +
                  t.charCodeAt(t.length - 1).toString(16) +
                  " "
              : "\\" + t;
          }
        );
      }),
      n(function () {
        !1 !== n.fancybox.defaults.hash &&
          (n(e).on({
            "onInit.fb": function (t, e) {
              var n, i;
              !1 !== e.group[e.currIndex].opts.hash &&
                ((n = o()),
                (i = a(e)) &&
                  n.gallery &&
                  i == n.gallery &&
                  (e.currIndex = n.index - 1));
            },
            "beforeShow.fb": function (n, o, i, s) {
              var r;
              i &&
                !1 !== i.opts.hash &&
                (r = a(o)) &&
                ((o.currentHash =
                  r + (o.group.length > 1 ? "-" + (i.index + 1) : "")),
                t.location.hash !== "#" + o.currentHash &&
                  (s && !o.origHash && (o.origHash = t.location.hash),
                  o.hashTimer && clearTimeout(o.hashTimer),
                  (o.hashTimer = setTimeout(function () {
                    "replaceState" in t.history
                      ? (t.history[s ? "pushState" : "replaceState"](
                          {},
                          e.title,
                          t.location.pathname +
                            t.location.search +
                            "#" +
                            o.currentHash
                        ),
                        s && (o.hasCreatedHistory = !0))
                      : (t.location.hash = o.currentHash),
                      (o.hashTimer = null);
                  }, 300))));
            },
            "beforeClose.fb": function (n, o, i) {
              i &&
                !1 !== i.opts.hash &&
                (clearTimeout(o.hashTimer),
                o.currentHash && o.hasCreatedHistory
                  ? t.history.back()
                  : o.currentHash &&
                    ("replaceState" in t.history
                      ? t.history.replaceState(
                          {},
                          e.title,
                          t.location.pathname +
                            t.location.search +
                            (o.origHash || "")
                        )
                      : (t.location.hash = o.origHash)),
                (o.currentHash = null));
            },
          }),
          n(t).on("hashchange.fb", function () {
            var t = o(),
              e = null;
            n.each(n(".fancybox-container").get().reverse(), function (t, o) {
              var i = n(o).data("FancyBox");
              if (i && i.currentHash) return (e = i), !1;
            }),
              e
                ? e.currentHash === t.gallery + "-" + t.index ||
                  (1 === t.index && e.currentHash == t.gallery) ||
                  ((e.currentHash = null), e.close())
                : "" !== t.gallery && i(t);
          }),
          setTimeout(function () {
            n.fancybox.getInstance() || i(o());
          }, 50));
      });
  })(window, document, jQuery),
  (function (t, e) {
    "use strict";
    var n = new Date().getTime();
    e(t).on({
      "onInit.fb": function (t, e, o) {
        e.$refs.stage.on(
          "mousewheel DOMMouseScroll wheel MozMousePixelScroll",
          function (t) {
            var o = e.current,
              i = new Date().getTime();
            e.group.length < 2 ||
              !1 === o.opts.wheel ||
              ("auto" === o.opts.wheel && "image" !== o.type) ||
              (t.preventDefault(),
              t.stopPropagation(),
              o.$slide.hasClass("fancybox-animated") ||
                ((t = t.originalEvent || t),
                i - n < 250 ||
                  ((n = i),
                  e[
                    (-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0
                      ? "next"
                      : "previous"
                  ]())));
          }
        );
      },
    });
  })(document, jQuery);
defer(function () {
  const $body = $("body");
  let timer = null;
  let videoId = 0;
  $body.on("mouseenter", "a.video", playVideo);
  function playVideo() {
    if ($body.hasClass("no-autoplay")) {
      return false;
    }
    const $this = $(this);
    const $video = $this.find("video");
    const videoObject = $video.get(0);
    const doPlayVideo = ($this, videoObject) => {
      return videoObject.play()?.then(() => {
        $this.on("mouseleave", () => {
          pauseVideo($this);
        });
      });
    };
    if ($video.length > 0) {
      $video.data("video-id", videoId);
      if ($this.hasClass("played")) {
        doPlayVideo($this, videoObject);
      } else {
        timer = setTimeout(
          () => {
            if (!doPlayVideo($this, videoObject)) {
              $body
                .addClass("no-autoplay")
                .off("mouseenter", "a.video")
                .off("mouseleave", "a.video");
              return;
            }
            videoObject.oncanplay = function () {
              $this.addClass("is-playable");
              if (!$this.hasClass("played")) {
                $this.addClass("played");
              }
            };
          },
          window.isMobile ? 0 : 200
        );
      }
      $this.data("title", $this.attr("title"));
      $this.removeAttr("title");
    }
  }
  function pauseVideo($link) {
    const $video = $link.find("video");
    if (timer) {
      clearTimeout(timer);
    }
    if ($video.length > 0) {
      $video.get(0).pause();
    }
    $link.attr("title", $link.data("title"));
    $link.removeData("title");
  }
});
$(function () {
  function initUsidForms() {
    let usid = $('meta[name="ig-usid"]').attr("content");
    $("form[data-need-usid]").each(function () {
      $(this).append($('<input type="hidden" name="usid">').val(usid));
    });
  }
  if ($("meta[name=ig-usid]").length === 0) {
    $.get("/" + $("html").attr("lang") + "/getDataLayer", function (data) {
      $('<meta name="ig-usid">').attr("content", data.usid).appendTo("head");
      if (window.dataLayer) {
        dataLayer.push({ countryCode: data.countryCode });
      }
      if (window.user) {
        window.user.countryCode = data.countryCode;
      }
      initUsidForms();
    });
  } else {
    initUsidForms();
  }
  function setUserRegionCookie(regionCode, reload) {
    $.cookie("user_region", regionCode, { path: "/", expires: 365 });
    $("body").removeClass("has-country-banner");
    if (reload) {
      window.location.reload();
    } else {
      $(".region-select.bottom-select").hide();
    }
  }
  $(".validate-user-region").click(function () {
    let selectedRegion = $("#select-region-banner").val();
    setUserRegionCookie(
      selectedRegion,
      selectedRegion != $('input[name="geoipCountryCode"]').val()
    );
  });
  $(".close-user-region").click(function () {
    setUserRegionCookie($('input[name="geoipCountryCode"]').val(), false);
  });
  $(".settings-user-region").change(function () {
    setUserRegionCookie($(this).val(), true);
  });
});
function formatPreorderDate(availableDate) {
  let availDays = Math.ceil((availableDate - Date.now() / 1000) / 86400);
  if (availDays >= 30 || availDays <= -2) {
    return moment(availableDate * 1000).format("LL");
  } else if (availDays < 30 && availDays >= 2) {
    return window.globalLangs._MENU_PREORDER_PANEL_AVAILABLE_IN_X_DAYS_.replace(
      "%d",
      availDays
    );
  } else if (availDays === 1) {
    return window.globalLangs._MENU_PREORDER_PANEL_AVAILABLE_TOMORROW_;
  } else if (availDays === -1) {
    return window.globalLangs._MENU_PREORDER_PANEL_AVAILABLE_YESTERDAY_;
  } else if (availDays === 0) {
    return window.globalLangs._MENU_PREORDER_PANEL_AVAILABLE_TODAY_;
  } else if (availableDate < 3000) {
    return availableDate;
  }
  return availableDate;
}
$.fn.isInViewport = function () {
  const $element = $(this);
  if (0 === $element.length) {
    return false;
  }
  const elementTop = $(this).offset().top,
    elementBottom = elementTop + $(this).outerHeight() - 100,
    viewportTop = $(window).scrollTop(),
    viewportBottom = viewportTop + $(window).height();
  return elementBottom > viewportTop && elementTop - 300 < viewportBottom;
};
$.extend($.easing, {
  def: "easeOutQuint",
  easeOutQuint: function (x) {
    return 1 - Math.pow(1 - x, 5);
  },
});
function initSelect2($select2) {
  let data = { width: "style" };
  if (!$select2.hasClass("searchable")) {
    data["minimumResultsForSearch"] = -1;
  }
  $select2.select2(data).maximizeSelect2Height({ cushion: 40 });
}
$(function () {
  $(".selectable2").ready(function () {
    $(".selectable2").each(function () {
      const $this = $(this);
      $this.on("select2:open", () => {
        document
          .querySelector(".select2-container--open .select2-search__field")
          .focus();
      });
    });
  });
  $(".selectable2:not(.manual)").ready(function () {
    $(".selectable2:not(.manual)").each(function () {
      initSelect2($(this));
    });
  });
  $("body")
    .on("click", "a.mimic", function (e) {
      e.preventDefault();
    })
    .on("mousedown", "a.mimic", function (e) {
      if (2 === e.which) {
        $(e.target).trigger("click");
        e.target.dispatchEvent(new Event("click"));
      }
      return false;
    });
  window.addEventListener("auxclick", function (e) {
    if (1 !== e.button) {
      return;
    }
    const applyEffect = (node, e) => {
      if (null === node) {
        return true;
      }
      if ("A" === node.nodeName) {
        if (node.classList.contains("mimic")) {
          e.preventDefault();
        }
        return true;
      }
      return false;
    };
    if (applyEffect(e.target, e)) {
      return;
    }
    let parent = e.target.parentNode;
    while (!parent || "BODY" !== parent.nodeName) {
      if (applyEffect(parent, e)) {
        return;
      }
      parent = parent.parentNode;
    }
  });
  if (window.isUAG) {
    window.sendLog = function (message, context = {}, isCritical = false) {
      const callback = function () {
        Rollbar[isCritical ? "error" : "info"](
          "UAG_DEBUG: " + message,
          context
        );
      };
      if (typeof Rollbar === "undefined") {
        $.getScript("/themes/igv2/js/rollbar.js").done(callback);
      } else {
        callback();
      }
    };
  }
});
$('<div id="alert-popin">').appendTo("body");
window.igPopin = new Vue({
  el: "#alert-popin",
  delimiters: ["%%", "%%"],
  mixins: [Mixins.resettable],
  template: `<div id="alert-popin"class="popin"style="display: none"><div v-if="iconName":class="'icon-' + iconName + ' icon-xxl'"></div><h2 class="title"v-if="title">%%title%%</h2><span class="content readable"v-html="message"></span><div data-fancybox-close class="button fancybox-button--close">OK</div></div>`,
  data() {
    return { iconName: null, title: null, message: null };
  },
  methods: {
    showInfo(options) {
      this.show(Object.assign(options, { iconName: "information" }));
    },
    showSuccess(options) {
      this.show(Object.assign(options, { iconName: "success" }));
    },
    showWarning(options) {
      this.show(Object.assign(options, { iconName: "warning" }));
    },
    show(options) {
      this.iconName = options.iconName;
      this.title = options.title;
      if ("message" in options) {
        this.message = options.message;
      } else if ("id" in options) {
        this.message = $("#" + options.id).html();
      }
      $.fancybox.open({
        src: "#alert-popin",
        animationDuration: 0,
        touch: false,
        autoFocus: false,
        afterClose: () => {
          if ("onClose" in options) {
            options.onClose();
          }
          this.resetData();
        },
        baseClass: "fancybox-popin",
      });
    },
  },
});
$('<div id="confirm-popin">').appendTo("body");
window.igConfirmPopin = new Vue({
  el: "#confirm-popin",
  delimiters: ["%%", "%%"],
  template: `<div
id="confirm-popin"
class="popin popin-closing-thread"><div v-if="iconName":class="'icon-' + iconName + ' icon-xxl'"></div><h2 class="title"v-if="title">%%title%%</h2><span class="content readable"v-html="message"></span><div class="actions"><div
data-fancybox-close
id="cancel-button"
class="button button-secondary fancybox-button--close"
v-on="onCancel ? {click: onCancel} : {}">%%cancelMessage%%</div><div
data-fancybox-close
id="confirm-button"
class="button fancybox-button--close"
v-on="onConfirm ? {click: onConfirm} : {}">OK</div></div></div>`,
  data() {
    return {
      iconName: null,
      title: null,
      message: null,
      cancelMessage: null,
      onConfirm: null,
      onCancel: null,
    };
  },
  methods: {
    show(options) {
      this.iconName = options.iconName;
      this.title = options.title;
      this.cancelMessage = options.cancelMessage;
      this.onConfirm = options.onConfirm;
      this.onCancel = options.onCancel;
      if ("message" in options) {
        this.message = options.message;
      }
      $.fancybox.open({
        src: "#confirm-popin",
        animationDuration: 0,
        touch: false,
        autoFocus: false,
        afterClose: options.onClose,
        baseClass: "fancybox-popin",
      });
    },
  },
});
/*! Select2 4.1.0-rc.0 | https://github.com/select2/select2/blob/master/LICENSE.md */
!(function (n) {
  "function" == typeof define && define.amd
    ? define(["jquery"], n)
    : "object" == typeof module && module.exports
    ? (module.exports = function (e, t) {
        return (
          void 0 === t &&
            (t =
              "undefined" != typeof window
                ? require("jquery")
                : require("jquery")(e)),
          n(t),
          t
        );
      })
    : n(jQuery);
})(function (t) {
  var e,
    n,
    s,
    p,
    r,
    o,
    h,
    f,
    g,
    m,
    y,
    v,
    i,
    a,
    _,
    s =
      (t && t.fn && t.fn.select2 && t.fn.select2.amd && (u = t.fn.select2.amd),
      (u && u.requirejs) ||
        (u ? (n = u) : (u = {}),
        (g = {}),
        (m = {}),
        (y = {}),
        (v = {}),
        (i = Object.prototype.hasOwnProperty),
        (a = [].slice),
        (_ = /\.js$/),
        (h = function (e, t) {
          var n,
            s,
            i = c(e),
            r = i[0],
            t = t[1];
          return (
            (e = i[1]),
            r && (n = x((r = l(r, t)))),
            r
              ? (e =
                  n && n.normalize
                    ? n.normalize(
                        e,
                        ((s = t),
                        function (e) {
                          return l(e, s);
                        })
                      )
                    : l(e, t))
              : ((r = (i = c((e = l(e, t))))[0]), (e = i[1]), r && (n = x(r))),
            { f: r ? r + "!" + e : e, n: e, pr: r, p: n }
          );
        }),
        (f = {
          require: function (e) {
            return w(e);
          },
          exports: function (e) {
            var t = g[e];
            return void 0 !== t ? t : (g[e] = {});
          },
          module: function (e) {
            return {
              id: e,
              uri: "",
              exports: g[e],
              config:
                ((t = e),
                function () {
                  return (y && y.config && y.config[t]) || {};
                }),
            };
            var t;
          },
        }),
        (r = function (e, t, n, s) {
          var i,
            r,
            o,
            a,
            l,
            c = [],
            u = typeof n,
            d = A((s = s || e));
          if ("undefined" == u || "function" == u) {
            for (
              t = !t.length && n.length ? ["require", "exports", "module"] : t,
                a = 0;
              a < t.length;
              a += 1
            )
              if ("require" === (r = (o = h(t[a], d)).f)) c[a] = f.require(e);
              else if ("exports" === r) (c[a] = f.exports(e)), (l = !0);
              else if ("module" === r) i = c[a] = f.module(e);
              else if (b(g, r) || b(m, r) || b(v, r)) c[a] = x(r);
              else {
                if (!o.p) throw new Error(e + " missing " + r);
                o.p.load(
                  o.n,
                  w(s, !0),
                  (function (t) {
                    return function (e) {
                      g[t] = e;
                    };
                  })(r),
                  {}
                ),
                  (c[a] = g[r]);
              }
            (u = n ? n.apply(g[e], c) : void 0),
              e &&
                (i && i.exports !== p && i.exports !== g[e]
                  ? (g[e] = i.exports)
                  : (u === p && l) || (g[e] = u));
          } else e && (g[e] = n);
        }),
        (e =
          n =
          o =
            function (e, t, n, s, i) {
              if ("string" == typeof e) return f[e] ? f[e](t) : x(h(e, A(t)).f);
              if (!e.splice) {
                if (((y = e).deps && o(y.deps, y.callback), !t)) return;
                t.splice ? ((e = t), (t = n), (n = null)) : (e = p);
              }
              return (
                (t = t || function () {}),
                "function" == typeof n && ((n = s), (s = i)),
                s
                  ? r(p, e, t, n)
                  : setTimeout(function () {
                      r(p, e, t, n);
                    }, 4),
                o
              );
            }),
        (o.config = function (e) {
          return o(e);
        }),
        (e._defined = g),
        ((s = function (e, t, n) {
          if ("string" != typeof e)
            throw new Error(
              "See almond README: incorrect module build, no module name"
            );
          t.splice || ((n = t), (t = [])),
            b(g, e) || b(m, e) || (m[e] = [e, t, n]);
        }).amd = { jQuery: !0 }),
        (u.requirejs = e),
        (u.require = n),
        (u.define = s)),
      u.define("almond", function () {}),
      u.define("jquery", [], function () {
        var e = t || $;
        return (
          null == e &&
            console &&
            console.error &&
            console.error(
              "Select2: An instance of jQuery or a jQuery-compatible library was not found. Make sure that you are including jQuery before Select2 on your web page."
            ),
          e
        );
      }),
      u.define("select2/utils", ["jquery"], function (r) {
        var s = {};
        function c(e) {
          var t,
            n = e.prototype,
            s = [];
          for (t in n)
            "function" == typeof n[t] && "constructor" !== t && s.push(t);
          return s;
        }
        (s.Extend = function (e, t) {
          var n,
            s = {}.hasOwnProperty;
          function i() {
            this.constructor = e;
          }
          for (n in t) s.call(t, n) && (e[n] = t[n]);
          return (
            (i.prototype = t.prototype),
            (e.prototype = new i()),
            (e.__super__ = t.prototype),
            e
          );
        }),
          (s.Decorate = function (s, i) {
            var e = c(i),
              t = c(s);
            function r() {
              var e = Array.prototype.unshift,
                t = i.prototype.constructor.length,
                n = s.prototype.constructor;
              0 < t &&
                (e.call(arguments, s.prototype.constructor),
                (n = i.prototype.constructor)),
                n.apply(this, arguments);
            }
            (i.displayName = s.displayName),
              (r.prototype = new (function () {
                this.constructor = r;
              })());
            for (var n = 0; n < t.length; n++) {
              var o = t[n];
              r.prototype[o] = s.prototype[o];
            }
            for (var a = 0; a < e.length; a++) {
              var l = e[a];
              r.prototype[l] = (function (e) {
                var t = function () {};
                e in r.prototype && (t = r.prototype[e]);
                var n = i.prototype[e];
                return function () {
                  return (
                    Array.prototype.unshift.call(arguments, t),
                    n.apply(this, arguments)
                  );
                };
              })(l);
            }
            return r;
          });
        function e() {
          this.listeners = {};
        }
        (e.prototype.on = function (e, t) {
          (this.listeners = this.listeners || {}),
            e in this.listeners
              ? this.listeners[e].push(t)
              : (this.listeners[e] = [t]);
        }),
          (e.prototype.trigger = function (e) {
            var t = Array.prototype.slice,
              n = t.call(arguments, 1);
            (this.listeners = this.listeners || {}),
              null == n && (n = []),
              0 === n.length && n.push({}),
              (n[0]._type = e) in this.listeners &&
                this.invoke(this.listeners[e], t.call(arguments, 1)),
              "*" in this.listeners &&
                this.invoke(this.listeners["*"], arguments);
          }),
          (e.prototype.invoke = function (e, t) {
            for (var n = 0, s = e.length; n < s; n++) e[n].apply(this, t);
          }),
          (s.Observable = e),
          (s.generateChars = function (e) {
            for (var t = "", n = 0; n < e; n++)
              t += Math.floor(36 * Math.random()).toString(36);
            return t;
          }),
          (s.bind = function (e, t) {
            return function () {
              e.apply(t, arguments);
            };
          }),
          (s._convertData = function (e) {
            for (var t in e) {
              var n = t.split("-"),
                s = e;
              if (1 !== n.length) {
                for (var i = 0; i < n.length; i++) {
                  var r = n[i];
                  (r = r.substring(0, 1).toLowerCase() + r.substring(1)) in s ||
                    (s[r] = {}),
                    i == n.length - 1 && (s[r] = e[t]),
                    (s = s[r]);
                }
                delete e[t];
              }
            }
            return e;
          }),
          (s.hasScroll = function (e, t) {
            var n = r(t),
              s = t.style.overflowX,
              i = t.style.overflowY;
            return (
              (s !== i || ("hidden" !== i && "visible" !== i)) &&
              ("scroll" === s ||
                "scroll" === i ||
                n.innerHeight() < t.scrollHeight ||
                n.innerWidth() < t.scrollWidth)
            );
          }),
          (s.escapeMarkup = function (e) {
            var t = {
              "\\": "&#92;",
              "&": "&amp;",
              "<": "&lt;",
              ">": "&gt;",
              '"': "&quot;",
              "'": "&#39;",
              "/": "&#47;",
            };
            return "string" != typeof e
              ? e
              : String(e).replace(/[&<>"'\/\\]/g, function (e) {
                  return t[e];
                });
          }),
          (s.__cache = {});
        var n = 0;
        return (
          (s.GetUniqueElementId = function (e) {
            var t = e.getAttribute("data-select2-id");
            return (
              null != t ||
                ((t = e.id
                  ? "select2-data-" + e.id
                  : "select2-data-" +
                    (++n).toString() +
                    "-" +
                    s.generateChars(4)),
                e.setAttribute("data-select2-id", t)),
              t
            );
          }),
          (s.StoreData = function (e, t, n) {
            e = s.GetUniqueElementId(e);
            s.__cache[e] || (s.__cache[e] = {}), (s.__cache[e][t] = n);
          }),
          (s.GetData = function (e, t) {
            var n = s.GetUniqueElementId(e);
            return t
              ? s.__cache[n] && null != s.__cache[n][t]
                ? s.__cache[n][t]
                : r(e).data(t)
              : s.__cache[n];
          }),
          (s.RemoveData = function (e) {
            var t = s.GetUniqueElementId(e);
            null != s.__cache[t] && delete s.__cache[t],
              e.removeAttribute("data-select2-id");
          }),
          (s.copyNonInternalCssClasses = function (e, t) {
            var n = (n = e.getAttribute("class").trim().split(/\s+/)).filter(
                function (e) {
                  return 0 === e.indexOf("select2-");
                }
              ),
              t = (t = t.getAttribute("class").trim().split(/\s+/)).filter(
                function (e) {
                  return 0 !== e.indexOf("select2-");
                }
              ),
              t = n.concat(t);
            e.setAttribute("class", t.join(" "));
          }),
          s
        );
      }),
      u.define("select2/results", ["jquery", "./utils"], function (d, p) {
        function s(e, t, n) {
          (this.$element = e),
            (this.data = n),
            (this.options = t),
            s.__super__.constructor.call(this);
        }
        return (
          p.Extend(s, p.Observable),
          (s.prototype.render = function () {
            var e = d(
              '<ul class="select2-results__options" role="listbox"></ul>'
            );
            return (
              this.options.get("multiple") &&
                e.attr("aria-multiselectable", "true"),
              (this.$results = e)
            );
          }),
          (s.prototype.clear = function () {
            this.$results.empty();
          }),
          (s.prototype.displayMessage = function (e) {
            var t = this.options.get("escapeMarkup");
            this.clear(), this.hideLoading();
            var n = d(
                '<li role="alert" aria-live="assertive" class="select2-results__option"></li>'
              ),
              s = this.options.get("translations").get(e.message);
            n.append(t(s(e.args))),
              (n[0].className += " select2-results__message"),
              this.$results.append(n);
          }),
          (s.prototype.hideMessages = function () {
            this.$results.find(".select2-results__message").remove();
          }),
          (s.prototype.append = function (e) {
            this.hideLoading();
            var t = [];
            if (null != e.results && 0 !== e.results.length) {
              e.results = this.sort(e.results);
              for (var n = 0; n < e.results.length; n++) {
                var s = e.results[n],
                  s = this.option(s);
                t.push(s);
              }
              this.$results.append(t);
            } else
              0 === this.$results.children().length &&
                this.trigger("results:message", { message: "noResults" });
          }),
          (s.prototype.position = function (e, t) {
            t.find(".select2-results").append(e);
          }),
          (s.prototype.sort = function (e) {
            return this.options.get("sorter")(e);
          }),
          (s.prototype.highlightFirstItem = function () {
            var e = this.$results.find(".select2-results__option--selectable"),
              t = e.filter(".select2-results__option--selected");
            (0 < t.length ? t : e).first().trigger("mouseenter"),
              this.ensureHighlightVisible();
          }),
          (s.prototype.setClasses = function () {
            var t = this;
            this.data.current(function (e) {
              var s = e.map(function (e) {
                return e.id.toString();
              });
              t.$results
                .find(".select2-results__option--selectable")
                .each(function () {
                  var e = d(this),
                    t = p.GetData(this, "data"),
                    n = "" + t.id;
                  (null != t.element && t.element.selected) ||
                  (null == t.element && -1 < s.indexOf(n))
                    ? (this.classList.add("select2-results__option--selected"),
                      e.attr("aria-selected", "true"))
                    : (this.classList.remove(
                        "select2-results__option--selected"
                      ),
                      e.attr("aria-selected", "false"));
                });
            });
          }),
          (s.prototype.showLoading = function (e) {
            this.hideLoading();
            (e = {
              disabled: !0,
              loading: !0,
              text: this.options.get("translations").get("searching")(e),
            }),
              (e = this.option(e));
            (e.className += " loading-results"), this.$results.prepend(e);
          }),
          (s.prototype.hideLoading = function () {
            this.$results.find(".loading-results").remove();
          }),
          (s.prototype.option = function (e) {
            var t = document.createElement("li");
            t.classList.add("select2-results__option"),
              t.classList.add("select2-results__option--selectable");
            var n,
              s = { role: "option" },
              i =
                window.Element.prototype.matches ||
                window.Element.prototype.msMatchesSelector ||
                window.Element.prototype.webkitMatchesSelector;
            for (n in (((null != e.element && i.call(e.element, ":disabled")) ||
              (null == e.element && e.disabled)) &&
              ((s["aria-disabled"] = "true"),
              t.classList.remove("select2-results__option--selectable"),
              t.classList.add("select2-results__option--disabled")),
            null == e.id &&
              t.classList.remove("select2-results__option--selectable"),
            null != e._resultId && (t.id = e._resultId),
            e.title && (t.title = e.title),
            e.children &&
              ((s.role = "group"),
              (s["aria-label"] = e.text),
              t.classList.remove("select2-results__option--selectable"),
              t.classList.add("select2-results__option--group")),
            s)) {
              var r = s[n];
              t.setAttribute(n, r);
            }
            if (e.children) {
              var o = d(t),
                a = document.createElement("strong");
              (a.className = "select2-results__group"), this.template(e, a);
              for (var l = [], c = 0; c < e.children.length; c++) {
                var u = e.children[c],
                  u = this.option(u);
                l.push(u);
              }
              i = d("<ul></ul>", {
                class:
                  "select2-results__options select2-results__options--nested",
                role: "none",
              });
              i.append(l), o.append(a), o.append(i);
            } else this.template(e, t);
            return p.StoreData(t, "data", e), t;
          }),
          (s.prototype.bind = function (t, e) {
            var i = this,
              n = t.id + "-results";
            this.$results.attr("id", n),
              t.on("results:all", function (e) {
                i.clear(),
                  i.append(e.data),
                  t.isOpen() && (i.setClasses(), i.highlightFirstItem());
              }),
              t.on("results:append", function (e) {
                i.append(e.data), t.isOpen() && i.setClasses();
              }),
              t.on("query", function (e) {
                i.hideMessages(), i.showLoading(e);
              }),
              t.on("select", function () {
                t.isOpen() &&
                  (i.setClasses(),
                  i.options.get("scrollAfterSelect") && i.highlightFirstItem());
              }),
              t.on("unselect", function () {
                t.isOpen() &&
                  (i.setClasses(),
                  i.options.get("scrollAfterSelect") && i.highlightFirstItem());
              }),
              t.on("open", function () {
                i.$results.attr("aria-expanded", "true"),
                  i.$results.attr("aria-hidden", "false"),
                  i.setClasses(),
                  i.ensureHighlightVisible();
              }),
              t.on("close", function () {
                i.$results.attr("aria-expanded", "false"),
                  i.$results.attr("aria-hidden", "true"),
                  i.$results.removeAttr("aria-activedescendant");
              }),
              t.on("results:toggle", function () {
                var e = i.getHighlightedResults();
                0 !== e.length && e.trigger("mouseup");
              }),
              t.on("results:select", function () {
                var e,
                  t = i.getHighlightedResults();
                0 !== t.length &&
                  ((e = p.GetData(t[0], "data")),
                  t.hasClass("select2-results__option--selected")
                    ? i.trigger("close", {})
                    : i.trigger("select", { data: e }));
              }),
              t.on("results:previous", function () {
                var e,
                  t = i.getHighlightedResults(),
                  n = i.$results.find(".select2-results__option--selectable"),
                  s = n.index(t);
                s <= 0 ||
                  ((e = s - 1),
                  0 === t.length && (e = 0),
                  (s = n.eq(e)).trigger("mouseenter"),
                  (t = i.$results.offset().top),
                  (n = s.offset().top),
                  (s = i.$results.scrollTop() + (n - t)),
                  0 === e
                    ? i.$results.scrollTop(0)
                    : n - t < 0 && i.$results.scrollTop(s));
              }),
              t.on("results:next", function () {
                var e,
                  t = i.getHighlightedResults(),
                  n = i.$results.find(".select2-results__option--selectable"),
                  s = n.index(t) + 1;
                s >= n.length ||
                  ((e = n.eq(s)).trigger("mouseenter"),
                  (t = i.$results.offset().top + i.$results.outerHeight(!1)),
                  (n = e.offset().top + e.outerHeight(!1)),
                  (e = i.$results.scrollTop() + n - t),
                  0 === s
                    ? i.$results.scrollTop(0)
                    : t < n && i.$results.scrollTop(e));
              }),
              t.on("results:focus", function (e) {
                e.element[0].classList.add(
                  "select2-results__option--highlighted"
                ),
                  e.element[0].setAttribute("aria-selected", "true");
              }),
              t.on("results:message", function (e) {
                i.displayMessage(e);
              }),
              d.fn.mousewheel &&
                this.$results.on("mousewheel", function (e) {
                  var t = i.$results.scrollTop(),
                    n = i.$results.get(0).scrollHeight - t + e.deltaY,
                    t = 0 < e.deltaY && t - e.deltaY <= 0,
                    n = e.deltaY < 0 && n <= i.$results.height();
                  t
                    ? (i.$results.scrollTop(0),
                      e.preventDefault(),
                      e.stopPropagation())
                    : n &&
                      (i.$results.scrollTop(
                        i.$results.get(0).scrollHeight - i.$results.height()
                      ),
                      e.preventDefault(),
                      e.stopPropagation());
                }),
              this.$results.on(
                "mouseup",
                ".select2-results__option--selectable",
                function (e) {
                  var t = d(this),
                    n = p.GetData(this, "data");
                  t.hasClass("select2-results__option--selected")
                    ? i.options.get("multiple")
                      ? i.trigger("unselect", { originalEvent: e, data: n })
                      : i.trigger("close", {})
                    : i.trigger("select", { originalEvent: e, data: n });
                }
              ),
              this.$results.on(
                "mouseenter",
                ".select2-results__option--selectable",
                function (e) {
                  var t = p.GetData(this, "data");
                  i
                    .getHighlightedResults()
                    .removeClass("select2-results__option--highlighted")
                    .attr("aria-selected", "false"),
                    i.trigger("results:focus", { data: t, element: d(this) });
                }
              );
          }),
          (s.prototype.getHighlightedResults = function () {
            return this.$results.find(".select2-results__option--highlighted");
          }),
          (s.prototype.destroy = function () {
            this.$results.remove();
          }),
          (s.prototype.ensureHighlightVisible = function () {
            var e,
              t,
              n,
              s,
              i = this.getHighlightedResults();
            0 !== i.length &&
              ((e = this.$results
                .find(".select2-results__option--selectable")
                .index(i)),
              (s = this.$results.offset().top),
              (t = i.offset().top),
              (n = this.$results.scrollTop() + (t - s)),
              (s = t - s),
              (n -= 2 * i.outerHeight(!1)),
              e <= 2
                ? this.$results.scrollTop(0)
                : (s > this.$results.outerHeight() || s < 0) &&
                  this.$results.scrollTop(n));
          }),
          (s.prototype.template = function (e, t) {
            var n = this.options.get("templateResult"),
              s = this.options.get("escapeMarkup"),
              e = n(e, t);
            null == e
              ? (t.style.display = "none")
              : "string" == typeof e
              ? (t.innerHTML = s(e))
              : d(t).append(e);
          }),
          s
        );
      }),
      u.define("select2/keys", [], function () {
        return {
          BACKSPACE: 8,
          TAB: 9,
          ENTER: 13,
          SHIFT: 16,
          CTRL: 17,
          ALT: 18,
          ESC: 27,
          SPACE: 32,
          PAGE_UP: 33,
          PAGE_DOWN: 34,
          END: 35,
          HOME: 36,
          LEFT: 37,
          UP: 38,
          RIGHT: 39,
          DOWN: 40,
          DELETE: 46,
        };
      }),
      u.define(
        "select2/selection/base",
        ["jquery", "../utils", "../keys"],
        function (n, s, i) {
          function r(e, t) {
            (this.$element = e),
              (this.options = t),
              r.__super__.constructor.call(this);
          }
          return (
            s.Extend(r, s.Observable),
            (r.prototype.render = function () {
              var e = n(
                '<span class="select2-selection" role="combobox"  aria-haspopup="true" aria-expanded="false"></span>'
              );
              return (
                (this._tabindex = 0),
                null != s.GetData(this.$element[0], "old-tabindex")
                  ? (this._tabindex = s.GetData(
                      this.$element[0],
                      "old-tabindex"
                    ))
                  : null != this.$element.attr("tabindex") &&
                    (this._tabindex = this.$element.attr("tabindex")),
                e.attr("title", this.$element.attr("title")),
                e.attr("tabindex", this._tabindex),
                e.attr("aria-disabled", "false"),
                (this.$selection = e)
              );
            }),
            (r.prototype.bind = function (e, t) {
              var n = this,
                s = e.id + "-results";
              (this.container = e),
                this.$selection.on("focus", function (e) {
                  n.trigger("focus", e);
                }),
                this.$selection.on("blur", function (e) {
                  n._handleBlur(e);
                }),
                this.$selection.on("keydown", function (e) {
                  n.trigger("keypress", e),
                    e.which === i.SPACE && e.preventDefault();
                }),
                e.on("results:focus", function (e) {
                  n.$selection.attr("aria-activedescendant", e.data._resultId);
                }),
                e.on("selection:update", function (e) {
                  n.update(e.data);
                }),
                e.on("open", function () {
                  n.$selection.attr("aria-expanded", "true"),
                    n.$selection.attr("aria-owns", s),
                    n._attachCloseHandler(e);
                }),
                e.on("close", function () {
                  n.$selection.attr("aria-expanded", "false"),
                    n.$selection.removeAttr("aria-activedescendant"),
                    n.$selection.removeAttr("aria-owns"),
                    n.$selection.trigger("focus"),
                    n._detachCloseHandler(e);
                }),
                e.on("enable", function () {
                  n.$selection.attr("tabindex", n._tabindex),
                    n.$selection.attr("aria-disabled", "false");
                }),
                e.on("disable", function () {
                  n.$selection.attr("tabindex", "-1"),
                    n.$selection.attr("aria-disabled", "true");
                });
            }),
            (r.prototype._handleBlur = function (e) {
              var t = this;
              window.setTimeout(function () {
                document.activeElement == t.$selection[0] ||
                  n.contains(t.$selection[0], document.activeElement) ||
                  t.trigger("blur", e);
              }, 1);
            }),
            (r.prototype._attachCloseHandler = function (e) {
              n(document.body).on("mousedown.select2." + e.id, function (e) {
                var t = n(e.target).closest(".select2");
                n(".select2.select2-container--open").each(function () {
                  this != t[0] && s.GetData(this, "element").select2("close");
                });
              });
            }),
            (r.prototype._detachCloseHandler = function (e) {
              n(document.body).off("mousedown.select2." + e.id);
            }),
            (r.prototype.position = function (e, t) {
              t.find(".selection").append(e);
            }),
            (r.prototype.destroy = function () {
              this._detachCloseHandler(this.container);
            }),
            (r.prototype.update = function (e) {
              throw new Error(
                "The `update` method must be defined in child classes."
              );
            }),
            (r.prototype.isEnabled = function () {
              return !this.isDisabled();
            }),
            (r.prototype.isDisabled = function () {
              return this.options.get("disabled");
            }),
            r
          );
        }
      ),
      u.define(
        "select2/selection/single",
        ["jquery", "./base", "../utils", "../keys"],
        function (e, t, n, s) {
          function i() {
            i.__super__.constructor.apply(this, arguments);
          }
          return (
            n.Extend(i, t),
            (i.prototype.render = function () {
              var e = i.__super__.render.call(this);
              return (
                e[0].classList.add("select2-selection--single"),
                e.html(
                  '<span class="select2-selection__rendered"></span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span>'
                ),
                e
              );
            }),
            (i.prototype.bind = function (t, e) {
              var n = this;
              i.__super__.bind.apply(this, arguments);
              var s = t.id + "-container";
              this.$selection
                .find(".select2-selection__rendered")
                .attr("id", s)
                .attr("role", "textbox")
                .attr("aria-readonly", "true"),
                this.$selection.attr("aria-labelledby", s),
                this.$selection.attr("aria-controls", s),
                this.$selection.on("mousedown", function (e) {
                  1 === e.which && n.trigger("toggle", { originalEvent: e });
                }),
                this.$selection.on("focus", function (e) {}),
                this.$selection.on("blur", function (e) {}),
                t.on("focus", function (e) {
                  t.isOpen() || n.$selection.trigger("focus");
                });
            }),
            (i.prototype.clear = function () {
              var e = this.$selection.find(".select2-selection__rendered");
              e.empty(), e.removeAttr("title");
            }),
            (i.prototype.display = function (e, t) {
              var n = this.options.get("templateSelection");
              return this.options.get("escapeMarkup")(n(e, t));
            }),
            (i.prototype.selectionContainer = function () {
              return e("<span></span>");
            }),
            (i.prototype.update = function (e) {
              var t, n;
              0 !== e.length
                ? ((n = e[0]),
                  (t = this.$selection.find(".select2-selection__rendered")),
                  (e = this.display(n, t)),
                  t.empty().append(e),
                  (n = n.title || n.text)
                    ? t.attr("title", n)
                    : t.removeAttr("title"))
                : this.clear();
            }),
            i
          );
        }
      ),
      u.define(
        "select2/selection/multiple",
        ["jquery", "./base", "../utils"],
        function (i, e, c) {
          function r(e, t) {
            r.__super__.constructor.apply(this, arguments);
          }
          return (
            c.Extend(r, e),
            (r.prototype.render = function () {
              var e = r.__super__.render.call(this);
              return (
                e[0].classList.add("select2-selection--multiple"),
                e.html('<ul class="select2-selection__rendered"></ul>'),
                e
              );
            }),
            (r.prototype.bind = function (e, t) {
              var n = this;
              r.__super__.bind.apply(this, arguments);
              var s = e.id + "-container";
              this.$selection
                .find(".select2-selection__rendered")
                .attr("id", s),
                this.$selection.on("click", function (e) {
                  n.trigger("toggle", { originalEvent: e });
                }),
                this.$selection.on(
                  "click",
                  ".select2-selection__choice__remove",
                  function (e) {
                    var t;
                    n.isDisabled() ||
                      ((t = i(this).parent()),
                      (t = c.GetData(t[0], "data")),
                      n.trigger("unselect", { originalEvent: e, data: t }));
                  }
                ),
                this.$selection.on(
                  "keydown",
                  ".select2-selection__choice__remove",
                  function (e) {
                    n.isDisabled() || e.stopPropagation();
                  }
                );
            }),
            (r.prototype.clear = function () {
              var e = this.$selection.find(".select2-selection__rendered");
              e.empty(), e.removeAttr("title");
            }),
            (r.prototype.display = function (e, t) {
              var n = this.options.get("templateSelection");
              return this.options.get("escapeMarkup")(n(e, t));
            }),
            (r.prototype.selectionContainer = function () {
              return i(
                '<li class="select2-selection__choice"><button type="button" class="select2-selection__choice__remove" tabindex="-1"><span aria-hidden="true">&times;</span></button><span class="select2-selection__choice__display"></span></li>'
              );
            }),
            (r.prototype.update = function (e) {
              if ((this.clear(), 0 !== e.length)) {
                for (
                  var t = [],
                    n =
                      this.$selection
                        .find(".select2-selection__rendered")
                        .attr("id") + "-choice-",
                    s = 0;
                  s < e.length;
                  s++
                ) {
                  var i = e[s],
                    r = this.selectionContainer(),
                    o = this.display(i, r),
                    a = n + c.generateChars(4) + "-";
                  i.id ? (a += i.id) : (a += c.generateChars(4)),
                    r
                      .find(".select2-selection__choice__display")
                      .append(o)
                      .attr("id", a);
                  var l = i.title || i.text;
                  l && r.attr("title", l);
                  (o = this.options.get("translations").get("removeItem")),
                    (l = r.find(".select2-selection__choice__remove"));
                  l.attr("title", o()),
                    l.attr("aria-label", o()),
                    l.attr("aria-describedby", a),
                    c.StoreData(r[0], "data", i),
                    t.push(r);
                }
                this.$selection.find(".select2-selection__rendered").append(t);
              }
            }),
            r
          );
        }
      ),
      u.define("select2/selection/placeholder", [], function () {
        function e(e, t, n) {
          (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))),
            e.call(this, t, n);
        }
        return (
          (e.prototype.normalizePlaceholder = function (e, t) {
            return "string" == typeof t && (t = { id: "", text: t }), t;
          }),
          (e.prototype.createPlaceholder = function (e, t) {
            var n = this.selectionContainer();
            n.html(this.display(t)),
              n[0].classList.add("select2-selection__placeholder"),
              n[0].classList.remove("select2-selection__choice");
            t = t.title || t.text || n.text();
            return (
              this.$selection
                .find(".select2-selection__rendered")
                .attr("title", t),
              n
            );
          }),
          (e.prototype.update = function (e, t) {
            var n = 1 == t.length && t[0].id != this.placeholder.id;
            if (1 < t.length || n) return e.call(this, t);
            this.clear();
            t = this.createPlaceholder(this.placeholder);
            this.$selection.find(".select2-selection__rendered").append(t);
          }),
          e
        );
      }),
      u.define(
        "select2/selection/allowClear",
        ["jquery", "../keys", "../utils"],
        function (i, s, a) {
          function e() {}
          return (
            (e.prototype.bind = function (e, t, n) {
              var s = this;
              e.call(this, t, n),
                null == this.placeholder &&
                  this.options.get("debug") &&
                  window.console &&
                  console.error &&
                  console.error(
                    "Select2: The `allowClear` option should be used in combination with the `placeholder` option."
                  ),
                this.$selection.on(
                  "mousedown",
                  ".select2-selection__clear",
                  function (e) {
                    s._handleClear(e);
                  }
                ),
                t.on("keypress", function (e) {
                  s._handleKeyboardClear(e, t);
                });
            }),
            (e.prototype._handleClear = function (e, t) {
              if (!this.isDisabled()) {
                var n = this.$selection.find(".select2-selection__clear");
                if (0 !== n.length) {
                  t.stopPropagation();
                  var s = a.GetData(n[0], "data"),
                    i = this.$element.val();
                  this.$element.val(this.placeholder.id);
                  var r = { data: s };
                  if ((this.trigger("clear", r), r.prevented))
                    this.$element.val(i);
                  else {
                    for (var o = 0; o < s.length; o++)
                      if (
                        ((r = { data: s[o] }),
                        this.trigger("unselect", r),
                        r.prevented)
                      )
                        return void this.$element.val(i);
                    this.$element.trigger("input").trigger("change"),
                      this.trigger("toggle", {});
                  }
                }
              }
            }),
            (e.prototype._handleKeyboardClear = function (e, t, n) {
              n.isOpen() ||
                (t.which != s.DELETE && t.which != s.BACKSPACE) ||
                this._handleClear(t);
            }),
            (e.prototype.update = function (e, t) {
              var n, s;
              e.call(this, t),
                this.$selection.find(".select2-selection__clear").remove(),
                this.$selection[0].classList.remove(
                  "select2-selection--clearable"
                ),
                0 <
                  this.$selection.find(".select2-selection__placeholder")
                    .length ||
                  0 === t.length ||
                  ((n = this.$selection
                    .find(".select2-selection__rendered")
                    .attr("id")),
                  (s = this.options.get("translations").get("removeAllItems")),
                  (e = i(
                    '<button type="button" class="select2-selection__clear" tabindex="-1"><span aria-hidden="true">&times;</span></button>'
                  )).attr("title", s()),
                  e.attr("aria-label", s()),
                  e.attr("aria-describedby", n),
                  a.StoreData(e[0], "data", t),
                  this.$selection.prepend(e),
                  this.$selection[0].classList.add(
                    "select2-selection--clearable"
                  ));
            }),
            e
          );
        }
      ),
      u.define(
        "select2/selection/search",
        ["jquery", "../utils", "../keys"],
        function (s, a, l) {
          function e(e, t, n) {
            e.call(this, t, n);
          }
          return (
            (e.prototype.render = function (e) {
              var t = this.options.get("translations").get("search"),
                n = s(
                  '<span class="select2-search select2-search--inline"><textarea class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" ></textarea></span>'
                );
              (this.$searchContainer = n),
                (this.$search = n.find("textarea")),
                this.$search.prop(
                  "autocomplete",
                  this.options.get("autocomplete")
                ),
                this.$search.attr("aria-label", t());
              e = e.call(this);
              return (
                this._transferTabIndex(), e.append(this.$searchContainer), e
              );
            }),
            (e.prototype.bind = function (e, t, n) {
              var s = this,
                i = t.id + "-results",
                r = t.id + "-container";
              e.call(this, t, n),
                s.$search.attr("aria-describedby", r),
                t.on("open", function () {
                  s.$search.attr("aria-controls", i),
                    s.$search.trigger("focus");
                }),
                t.on("close", function () {
                  s.$search.val(""),
                    s.resizeSearch(),
                    s.$search.removeAttr("aria-controls"),
                    s.$search.removeAttr("aria-activedescendant"),
                    s.$search.trigger("focus");
                }),
                t.on("enable", function () {
                  s.$search.prop("disabled", !1), s._transferTabIndex();
                }),
                t.on("disable", function () {
                  s.$search.prop("disabled", !0);
                }),
                t.on("focus", function (e) {
                  s.$search.trigger("focus");
                }),
                t.on("results:focus", function (e) {
                  e.data._resultId
                    ? s.$search.attr("aria-activedescendant", e.data._resultId)
                    : s.$search.removeAttr("aria-activedescendant");
                }),
                this.$selection.on(
                  "focusin",
                  ".select2-search--inline",
                  function (e) {
                    s.trigger("focus", e);
                  }
                ),
                this.$selection.on(
                  "focusout",
                  ".select2-search--inline",
                  function (e) {
                    s._handleBlur(e);
                  }
                ),
                this.$selection.on(
                  "keydown",
                  ".select2-search--inline",
                  function (e) {
                    var t;
                    e.stopPropagation(),
                      s.trigger("keypress", e),
                      (s._keyUpPrevented = e.isDefaultPrevented()),
                      e.which !== l.BACKSPACE ||
                        "" !== s.$search.val() ||
                        (0 <
                          (t = s.$selection
                            .find(".select2-selection__choice")
                            .last()).length &&
                          ((t = a.GetData(t[0], "data")),
                          s.searchRemoveChoice(t),
                          e.preventDefault()));
                  }
                ),
                this.$selection.on(
                  "click",
                  ".select2-search--inline",
                  function (e) {
                    s.$search.val() && e.stopPropagation();
                  }
                );
              var t = document.documentMode,
                o = t && t <= 11;
              this.$selection.on(
                "input.searchcheck",
                ".select2-search--inline",
                function (e) {
                  o
                    ? s.$selection.off("input.search input.searchcheck")
                    : s.$selection.off("keyup.search");
                }
              ),
                this.$selection.on(
                  "keyup.search input.search",
                  ".select2-search--inline",
                  function (e) {
                    var t;
                    o && "input" === e.type
                      ? s.$selection.off("input.search input.searchcheck")
                      : (t = e.which) != l.SHIFT &&
                        t != l.CTRL &&
                        t != l.ALT &&
                        t != l.TAB &&
                        s.handleSearch(e);
                  }
                );
            }),
            (e.prototype._transferTabIndex = function (e) {
              this.$search.attr("tabindex", this.$selection.attr("tabindex")),
                this.$selection.attr("tabindex", "-1");
            }),
            (e.prototype.createPlaceholder = function (e, t) {
              this.$search.attr("placeholder", t.text);
            }),
            (e.prototype.update = function (e, t) {
              var n = this.$search[0] == document.activeElement;
              this.$search.attr("placeholder", ""),
                e.call(this, t),
                this.resizeSearch(),
                n && this.$search.trigger("focus");
            }),
            (e.prototype.handleSearch = function () {
              var e;
              this.resizeSearch(),
                this._keyUpPrevented ||
                  ((e = this.$search.val()),
                  this.trigger("query", { term: e })),
                (this._keyUpPrevented = !1);
            }),
            (e.prototype.searchRemoveChoice = function (e, t) {
              this.trigger("unselect", { data: t }),
                this.$search.val(t.text),
                this.handleSearch();
            }),
            (e.prototype.resizeSearch = function () {
              this.$search.css("width", "25px");
              var e = "100%";
              "" === this.$search.attr("placeholder") &&
                (e = 0.75 * (this.$search.val().length + 1) + "em"),
                this.$search.css("width", e);
            }),
            e
          );
        }
      ),
      u.define("select2/selection/selectionCss", ["../utils"], function (n) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              e = this.options.get("selectionCssClass") || "";
            return (
              -1 !== e.indexOf(":all:") &&
                ((e = e.replace(":all:", "")),
                n.copyNonInternalCssClasses(t[0], this.$element[0])),
              t.addClass(e),
              t
            );
          }),
          e
        );
      }),
      u.define("select2/selection/eventRelay", ["jquery"], function (o) {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this,
              i = [
                "open",
                "opening",
                "close",
                "closing",
                "select",
                "selecting",
                "unselect",
                "unselecting",
                "clear",
                "clearing",
              ],
              r = [
                "opening",
                "closing",
                "selecting",
                "unselecting",
                "clearing",
              ];
            e.call(this, t, n),
              t.on("*", function (e, t) {
                var n;
                -1 !== i.indexOf(e) &&
                  ((t = t || {}),
                  (n = o.Event("select2:" + e, { params: t })),
                  s.$element.trigger(n),
                  -1 !== r.indexOf(e) &&
                    (t.prevented = n.isDefaultPrevented()));
              });
          }),
          e
        );
      }),
      u.define("select2/translation", ["jquery", "require"], function (t, n) {
        function s(e) {
          this.dict = e || {};
        }
        return (
          (s.prototype.all = function () {
            return this.dict;
          }),
          (s.prototype.get = function (e) {
            return this.dict[e];
          }),
          (s.prototype.extend = function (e) {
            this.dict = t.extend({}, e.all(), this.dict);
          }),
          (s._cache = {}),
          (s.loadPath = function (e) {
            var t;
            return (
              e in s._cache || ((t = n(e)), (s._cache[e] = t)),
              new s(s._cache[e])
            );
          }),
          s
        );
      }),
      u.define("select2/diacritics", [], function () {
        return {
          "Ⓐ": "A",
          Ａ: "A",
          À: "A",
          Á: "A",
          Â: "A",
          Ầ: "A",
          Ấ: "A",
          Ẫ: "A",
          Ẩ: "A",
          Ã: "A",
          Ā: "A",
          Ă: "A",
          Ằ: "A",
          Ắ: "A",
          Ẵ: "A",
          Ẳ: "A",
          Ȧ: "A",
          Ǡ: "A",
          Ä: "A",
          Ǟ: "A",
          Ả: "A",
          Å: "A",
          Ǻ: "A",
          Ǎ: "A",
          Ȁ: "A",
          Ȃ: "A",
          Ạ: "A",
          Ậ: "A",
          Ặ: "A",
          Ḁ: "A",
          Ą: "A",
          Ⱥ: "A",
          Ɐ: "A",
          Ꜳ: "AA",
          Æ: "AE",
          Ǽ: "AE",
          Ǣ: "AE",
          Ꜵ: "AO",
          Ꜷ: "AU",
          Ꜹ: "AV",
          Ꜻ: "AV",
          Ꜽ: "AY",
          "Ⓑ": "B",
          Ｂ: "B",
          Ḃ: "B",
          Ḅ: "B",
          Ḇ: "B",
          Ƀ: "B",
          Ƃ: "B",
          Ɓ: "B",
          "Ⓒ": "C",
          Ｃ: "C",
          Ć: "C",
          Ĉ: "C",
          Ċ: "C",
          Č: "C",
          Ç: "C",
          Ḉ: "C",
          Ƈ: "C",
          Ȼ: "C",
          Ꜿ: "C",
          "Ⓓ": "D",
          Ｄ: "D",
          Ḋ: "D",
          Ď: "D",
          Ḍ: "D",
          Ḑ: "D",
          Ḓ: "D",
          Ḏ: "D",
          Đ: "D",
          Ƌ: "D",
          Ɗ: "D",
          Ɖ: "D",
          Ꝺ: "D",
          Ǳ: "DZ",
          Ǆ: "DZ",
          ǲ: "Dz",
          ǅ: "Dz",
          "Ⓔ": "E",
          Ｅ: "E",
          È: "E",
          É: "E",
          Ê: "E",
          Ề: "E",
          Ế: "E",
          Ễ: "E",
          Ể: "E",
          Ẽ: "E",
          Ē: "E",
          Ḕ: "E",
          Ḗ: "E",
          Ĕ: "E",
          Ė: "E",
          Ë: "E",
          Ẻ: "E",
          Ě: "E",
          Ȅ: "E",
          Ȇ: "E",
          Ẹ: "E",
          Ệ: "E",
          Ȩ: "E",
          Ḝ: "E",
          Ę: "E",
          Ḙ: "E",
          Ḛ: "E",
          Ɛ: "E",
          Ǝ: "E",
          "Ⓕ": "F",
          Ｆ: "F",
          Ḟ: "F",
          Ƒ: "F",
          Ꝼ: "F",
          "Ⓖ": "G",
          Ｇ: "G",
          Ǵ: "G",
          Ĝ: "G",
          Ḡ: "G",
          Ğ: "G",
          Ġ: "G",
          Ǧ: "G",
          Ģ: "G",
          Ǥ: "G",
          Ɠ: "G",
          Ꞡ: "G",
          Ᵹ: "G",
          Ꝿ: "G",
          "Ⓗ": "H",
          Ｈ: "H",
          Ĥ: "H",
          Ḣ: "H",
          Ḧ: "H",
          Ȟ: "H",
          Ḥ: "H",
          Ḩ: "H",
          Ḫ: "H",
          Ħ: "H",
          Ⱨ: "H",
          Ⱶ: "H",
          Ɥ: "H",
          "Ⓘ": "I",
          Ｉ: "I",
          Ì: "I",
          Í: "I",
          Î: "I",
          Ĩ: "I",
          Ī: "I",
          Ĭ: "I",
          İ: "I",
          Ï: "I",
          Ḯ: "I",
          Ỉ: "I",
          Ǐ: "I",
          Ȉ: "I",
          Ȋ: "I",
          Ị: "I",
          Į: "I",
          Ḭ: "I",
          Ɨ: "I",
          "Ⓙ": "J",
          Ｊ: "J",
          Ĵ: "J",
          Ɉ: "J",
          "Ⓚ": "K",
          Ｋ: "K",
          Ḱ: "K",
          Ǩ: "K",
          Ḳ: "K",
          Ķ: "K",
          Ḵ: "K",
          Ƙ: "K",
          Ⱪ: "K",
          Ꝁ: "K",
          Ꝃ: "K",
          Ꝅ: "K",
          Ꞣ: "K",
          "Ⓛ": "L",
          Ｌ: "L",
          Ŀ: "L",
          Ĺ: "L",
          Ľ: "L",
          Ḷ: "L",
          Ḹ: "L",
          Ļ: "L",
          Ḽ: "L",
          Ḻ: "L",
          Ł: "L",
          Ƚ: "L",
          Ɫ: "L",
          Ⱡ: "L",
          Ꝉ: "L",
          Ꝇ: "L",
          Ꞁ: "L",
          Ǉ: "LJ",
          ǈ: "Lj",
          "Ⓜ": "M",
          Ｍ: "M",
          Ḿ: "M",
          Ṁ: "M",
          Ṃ: "M",
          Ɱ: "M",
          Ɯ: "M",
          "Ⓝ": "N",
          Ｎ: "N",
          Ǹ: "N",
          Ń: "N",
          Ñ: "N",
          Ṅ: "N",
          Ň: "N",
          Ṇ: "N",
          Ņ: "N",
          Ṋ: "N",
          Ṉ: "N",
          Ƞ: "N",
          Ɲ: "N",
          Ꞑ: "N",
          Ꞥ: "N",
          Ǌ: "NJ",
          ǋ: "Nj",
          "Ⓞ": "O",
          Ｏ: "O",
          Ò: "O",
          Ó: "O",
          Ô: "O",
          Ồ: "O",
          Ố: "O",
          Ỗ: "O",
          Ổ: "O",
          Õ: "O",
          Ṍ: "O",
          Ȭ: "O",
          Ṏ: "O",
          Ō: "O",
          Ṑ: "O",
          Ṓ: "O",
          Ŏ: "O",
          Ȯ: "O",
          Ȱ: "O",
          Ö: "O",
          Ȫ: "O",
          Ỏ: "O",
          Ő: "O",
          Ǒ: "O",
          Ȍ: "O",
          Ȏ: "O",
          Ơ: "O",
          Ờ: "O",
          Ớ: "O",
          Ỡ: "O",
          Ở: "O",
          Ợ: "O",
          Ọ: "O",
          Ộ: "O",
          Ǫ: "O",
          Ǭ: "O",
          Ø: "O",
          Ǿ: "O",
          Ɔ: "O",
          Ɵ: "O",
          Ꝋ: "O",
          Ꝍ: "O",
          Œ: "OE",
          Ƣ: "OI",
          Ꝏ: "OO",
          Ȣ: "OU",
          "Ⓟ": "P",
          Ｐ: "P",
          Ṕ: "P",
          Ṗ: "P",
          Ƥ: "P",
          Ᵽ: "P",
          Ꝑ: "P",
          Ꝓ: "P",
          Ꝕ: "P",
          "Ⓠ": "Q",
          Ｑ: "Q",
          Ꝗ: "Q",
          Ꝙ: "Q",
          Ɋ: "Q",
          "Ⓡ": "R",
          Ｒ: "R",
          Ŕ: "R",
          Ṙ: "R",
          Ř: "R",
          Ȑ: "R",
          Ȓ: "R",
          Ṛ: "R",
          Ṝ: "R",
          Ŗ: "R",
          Ṟ: "R",
          Ɍ: "R",
          Ɽ: "R",
          Ꝛ: "R",
          Ꞧ: "R",
          Ꞃ: "R",
          "Ⓢ": "S",
          Ｓ: "S",
          ẞ: "S",
          Ś: "S",
          Ṥ: "S",
          Ŝ: "S",
          Ṡ: "S",
          Š: "S",
          Ṧ: "S",
          Ṣ: "S",
          Ṩ: "S",
          Ș: "S",
          Ş: "S",
          Ȿ: "S",
          Ꞩ: "S",
          Ꞅ: "S",
          "Ⓣ": "T",
          Ｔ: "T",
          Ṫ: "T",
          Ť: "T",
          Ṭ: "T",
          Ț: "T",
          Ţ: "T",
          Ṱ: "T",
          Ṯ: "T",
          Ŧ: "T",
          Ƭ: "T",
          Ʈ: "T",
          Ⱦ: "T",
          Ꞇ: "T",
          Ꜩ: "TZ",
          "Ⓤ": "U",
          Ｕ: "U",
          Ù: "U",
          Ú: "U",
          Û: "U",
          Ũ: "U",
          Ṹ: "U",
          Ū: "U",
          Ṻ: "U",
          Ŭ: "U",
          Ü: "U",
          Ǜ: "U",
          Ǘ: "U",
          Ǖ: "U",
          Ǚ: "U",
          Ủ: "U",
          Ů: "U",
          Ű: "U",
          Ǔ: "U",
          Ȕ: "U",
          Ȗ: "U",
          Ư: "U",
          Ừ: "U",
          Ứ: "U",
          Ữ: "U",
          Ử: "U",
          Ự: "U",
          Ụ: "U",
          Ṳ: "U",
          Ų: "U",
          Ṷ: "U",
          Ṵ: "U",
          Ʉ: "U",
          "Ⓥ": "V",
          Ｖ: "V",
          Ṽ: "V",
          Ṿ: "V",
          Ʋ: "V",
          Ꝟ: "V",
          Ʌ: "V",
          Ꝡ: "VY",
          "Ⓦ": "W",
          Ｗ: "W",
          Ẁ: "W",
          Ẃ: "W",
          Ŵ: "W",
          Ẇ: "W",
          Ẅ: "W",
          Ẉ: "W",
          Ⱳ: "W",
          "Ⓧ": "X",
          Ｘ: "X",
          Ẋ: "X",
          Ẍ: "X",
          "Ⓨ": "Y",
          Ｙ: "Y",
          Ỳ: "Y",
          Ý: "Y",
          Ŷ: "Y",
          Ỹ: "Y",
          Ȳ: "Y",
          Ẏ: "Y",
          Ÿ: "Y",
          Ỷ: "Y",
          Ỵ: "Y",
          Ƴ: "Y",
          Ɏ: "Y",
          Ỿ: "Y",
          "Ⓩ": "Z",
          Ｚ: "Z",
          Ź: "Z",
          Ẑ: "Z",
          Ż: "Z",
          Ž: "Z",
          Ẓ: "Z",
          Ẕ: "Z",
          Ƶ: "Z",
          Ȥ: "Z",
          Ɀ: "Z",
          Ⱬ: "Z",
          Ꝣ: "Z",
          "ⓐ": "a",
          ａ: "a",
          ẚ: "a",
          à: "a",
          á: "a",
          â: "a",
          ầ: "a",
          ấ: "a",
          ẫ: "a",
          ẩ: "a",
          ã: "a",
          ā: "a",
          ă: "a",
          ằ: "a",
          ắ: "a",
          ẵ: "a",
          ẳ: "a",
          ȧ: "a",
          ǡ: "a",
          ä: "a",
          ǟ: "a",
          ả: "a",
          å: "a",
          ǻ: "a",
          ǎ: "a",
          ȁ: "a",
          ȃ: "a",
          ạ: "a",
          ậ: "a",
          ặ: "a",
          ḁ: "a",
          ą: "a",
          ⱥ: "a",
          ɐ: "a",
          ꜳ: "aa",
          æ: "ae",
          ǽ: "ae",
          ǣ: "ae",
          ꜵ: "ao",
          ꜷ: "au",
          ꜹ: "av",
          ꜻ: "av",
          ꜽ: "ay",
          "ⓑ": "b",
          ｂ: "b",
          ḃ: "b",
          ḅ: "b",
          ḇ: "b",
          ƀ: "b",
          ƃ: "b",
          ɓ: "b",
          "ⓒ": "c",
          ｃ: "c",
          ć: "c",
          ĉ: "c",
          ċ: "c",
          č: "c",
          ç: "c",
          ḉ: "c",
          ƈ: "c",
          ȼ: "c",
          ꜿ: "c",
          ↄ: "c",
          "ⓓ": "d",
          ｄ: "d",
          ḋ: "d",
          ď: "d",
          ḍ: "d",
          ḑ: "d",
          ḓ: "d",
          ḏ: "d",
          đ: "d",
          ƌ: "d",
          ɖ: "d",
          ɗ: "d",
          ꝺ: "d",
          ǳ: "dz",
          ǆ: "dz",
          "ⓔ": "e",
          ｅ: "e",
          è: "e",
          é: "e",
          ê: "e",
          ề: "e",
          ế: "e",
          ễ: "e",
          ể: "e",
          ẽ: "e",
          ē: "e",
          ḕ: "e",
          ḗ: "e",
          ĕ: "e",
          ė: "e",
          ë: "e",
          ẻ: "e",
          ě: "e",
          ȅ: "e",
          ȇ: "e",
          ẹ: "e",
          ệ: "e",
          ȩ: "e",
          ḝ: "e",
          ę: "e",
          ḙ: "e",
          ḛ: "e",
          ɇ: "e",
          ɛ: "e",
          ǝ: "e",
          "ⓕ": "f",
          ｆ: "f",
          ḟ: "f",
          ƒ: "f",
          ꝼ: "f",
          "ⓖ": "g",
          ｇ: "g",
          ǵ: "g",
          ĝ: "g",
          ḡ: "g",
          ğ: "g",
          ġ: "g",
          ǧ: "g",
          ģ: "g",
          ǥ: "g",
          ɠ: "g",
          ꞡ: "g",
          ᵹ: "g",
          ꝿ: "g",
          "ⓗ": "h",
          ｈ: "h",
          ĥ: "h",
          ḣ: "h",
          ḧ: "h",
          ȟ: "h",
          ḥ: "h",
          ḩ: "h",
          ḫ: "h",
          ẖ: "h",
          ħ: "h",
          ⱨ: "h",
          ⱶ: "h",
          ɥ: "h",
          ƕ: "hv",
          "ⓘ": "i",
          ｉ: "i",
          ì: "i",
          í: "i",
          î: "i",
          ĩ: "i",
          ī: "i",
          ĭ: "i",
          ï: "i",
          ḯ: "i",
          ỉ: "i",
          ǐ: "i",
          ȉ: "i",
          ȋ: "i",
          ị: "i",
          į: "i",
          ḭ: "i",
          ɨ: "i",
          ı: "i",
          "ⓙ": "j",
          ｊ: "j",
          ĵ: "j",
          ǰ: "j",
          ɉ: "j",
          "ⓚ": "k",
          ｋ: "k",
          ḱ: "k",
          ǩ: "k",
          ḳ: "k",
          ķ: "k",
          ḵ: "k",
          ƙ: "k",
          ⱪ: "k",
          ꝁ: "k",
          ꝃ: "k",
          ꝅ: "k",
          ꞣ: "k",
          "ⓛ": "l",
          ｌ: "l",
          ŀ: "l",
          ĺ: "l",
          ľ: "l",
          ḷ: "l",
          ḹ: "l",
          ļ: "l",
          ḽ: "l",
          ḻ: "l",
          ſ: "l",
          ł: "l",
          ƚ: "l",
          ɫ: "l",
          ⱡ: "l",
          ꝉ: "l",
          ꞁ: "l",
          ꝇ: "l",
          ǉ: "lj",
          "ⓜ": "m",
          ｍ: "m",
          ḿ: "m",
          ṁ: "m",
          ṃ: "m",
          ɱ: "m",
          ɯ: "m",
          "ⓝ": "n",
          ｎ: "n",
          ǹ: "n",
          ń: "n",
          ñ: "n",
          ṅ: "n",
          ň: "n",
          ṇ: "n",
          ņ: "n",
          ṋ: "n",
          ṉ: "n",
          ƞ: "n",
          ɲ: "n",
          ŉ: "n",
          ꞑ: "n",
          ꞥ: "n",
          ǌ: "nj",
          "ⓞ": "o",
          ｏ: "o",
          ò: "o",
          ó: "o",
          ô: "o",
          ồ: "o",
          ố: "o",
          ỗ: "o",
          ổ: "o",
          õ: "o",
          ṍ: "o",
          ȭ: "o",
          ṏ: "o",
          ō: "o",
          ṑ: "o",
          ṓ: "o",
          ŏ: "o",
          ȯ: "o",
          ȱ: "o",
          ö: "o",
          ȫ: "o",
          ỏ: "o",
          ő: "o",
          ǒ: "o",
          ȍ: "o",
          ȏ: "o",
          ơ: "o",
          ờ: "o",
          ớ: "o",
          ỡ: "o",
          ở: "o",
          ợ: "o",
          ọ: "o",
          ộ: "o",
          ǫ: "o",
          ǭ: "o",
          ø: "o",
          ǿ: "o",
          ɔ: "o",
          ꝋ: "o",
          ꝍ: "o",
          ɵ: "o",
          œ: "oe",
          ƣ: "oi",
          ȣ: "ou",
          ꝏ: "oo",
          "ⓟ": "p",
          ｐ: "p",
          ṕ: "p",
          ṗ: "p",
          ƥ: "p",
          ᵽ: "p",
          ꝑ: "p",
          ꝓ: "p",
          ꝕ: "p",
          "ⓠ": "q",
          ｑ: "q",
          ɋ: "q",
          ꝗ: "q",
          ꝙ: "q",
          "ⓡ": "r",
          ｒ: "r",
          ŕ: "r",
          ṙ: "r",
          ř: "r",
          ȑ: "r",
          ȓ: "r",
          ṛ: "r",
          ṝ: "r",
          ŗ: "r",
          ṟ: "r",
          ɍ: "r",
          ɽ: "r",
          ꝛ: "r",
          ꞧ: "r",
          ꞃ: "r",
          "ⓢ": "s",
          ｓ: "s",
          ß: "s",
          ś: "s",
          ṥ: "s",
          ŝ: "s",
          ṡ: "s",
          š: "s",
          ṧ: "s",
          ṣ: "s",
          ṩ: "s",
          ș: "s",
          ş: "s",
          ȿ: "s",
          ꞩ: "s",
          ꞅ: "s",
          ẛ: "s",
          "ⓣ": "t",
          ｔ: "t",
          ṫ: "t",
          ẗ: "t",
          ť: "t",
          ṭ: "t",
          ț: "t",
          ţ: "t",
          ṱ: "t",
          ṯ: "t",
          ŧ: "t",
          ƭ: "t",
          ʈ: "t",
          ⱦ: "t",
          ꞇ: "t",
          ꜩ: "tz",
          "ⓤ": "u",
          ｕ: "u",
          ù: "u",
          ú: "u",
          û: "u",
          ũ: "u",
          ṹ: "u",
          ū: "u",
          ṻ: "u",
          ŭ: "u",
          ü: "u",
          ǜ: "u",
          ǘ: "u",
          ǖ: "u",
          ǚ: "u",
          ủ: "u",
          ů: "u",
          ű: "u",
          ǔ: "u",
          ȕ: "u",
          ȗ: "u",
          ư: "u",
          ừ: "u",
          ứ: "u",
          ữ: "u",
          ử: "u",
          ự: "u",
          ụ: "u",
          ṳ: "u",
          ų: "u",
          ṷ: "u",
          ṵ: "u",
          ʉ: "u",
          "ⓥ": "v",
          ｖ: "v",
          ṽ: "v",
          ṿ: "v",
          ʋ: "v",
          ꝟ: "v",
          ʌ: "v",
          ꝡ: "vy",
          "ⓦ": "w",
          ｗ: "w",
          ẁ: "w",
          ẃ: "w",
          ŵ: "w",
          ẇ: "w",
          ẅ: "w",
          ẘ: "w",
          ẉ: "w",
          ⱳ: "w",
          "ⓧ": "x",
          ｘ: "x",
          ẋ: "x",
          ẍ: "x",
          "ⓨ": "y",
          ｙ: "y",
          ỳ: "y",
          ý: "y",
          ŷ: "y",
          ỹ: "y",
          ȳ: "y",
          ẏ: "y",
          ÿ: "y",
          ỷ: "y",
          ẙ: "y",
          ỵ: "y",
          ƴ: "y",
          ɏ: "y",
          ỿ: "y",
          "ⓩ": "z",
          ｚ: "z",
          ź: "z",
          ẑ: "z",
          ż: "z",
          ž: "z",
          ẓ: "z",
          ẕ: "z",
          ƶ: "z",
          ȥ: "z",
          ɀ: "z",
          ⱬ: "z",
          ꝣ: "z",
          Ά: "Α",
          Έ: "Ε",
          Ή: "Η",
          Ί: "Ι",
          Ϊ: "Ι",
          Ό: "Ο",
          Ύ: "Υ",
          Ϋ: "Υ",
          Ώ: "Ω",
          ά: "α",
          έ: "ε",
          ή: "η",
          ί: "ι",
          ϊ: "ι",
          ΐ: "ι",
          ό: "ο",
          ύ: "υ",
          ϋ: "υ",
          ΰ: "υ",
          ώ: "ω",
          ς: "σ",
          "’": "'",
        };
      }),
      u.define("select2/data/base", ["../utils"], function (n) {
        function s(e, t) {
          s.__super__.constructor.call(this);
        }
        return (
          n.Extend(s, n.Observable),
          (s.prototype.current = function (e) {
            throw new Error(
              "The `current` method must be defined in child classes."
            );
          }),
          (s.prototype.query = function (e, t) {
            throw new Error(
              "The `query` method must be defined in child classes."
            );
          }),
          (s.prototype.bind = function (e, t) {}),
          (s.prototype.destroy = function () {}),
          (s.prototype.generateResultId = function (e, t) {
            e = e.id + "-result-";
            return (
              (e += n.generateChars(4)),
              null != t.id
                ? (e += "-" + t.id.toString())
                : (e += "-" + n.generateChars(4)),
              e
            );
          }),
          s
        );
      }),
      u.define(
        "select2/data/select",
        ["./base", "../utils", "jquery"],
        function (e, a, l) {
          function n(e, t) {
            (this.$element = e),
              (this.options = t),
              n.__super__.constructor.call(this);
          }
          return (
            a.Extend(n, e),
            (n.prototype.current = function (e) {
              var t = this;
              e(
                Array.prototype.map.call(
                  this.$element[0].querySelectorAll(":checked"),
                  function (e) {
                    return t.item(l(e));
                  }
                )
              );
            }),
            (n.prototype.select = function (i) {
              var e,
                r = this;
              if (
                ((i.selected = !0),
                null != i.element &&
                  "option" === i.element.tagName.toLowerCase())
              )
                return (
                  (i.element.selected = !0),
                  void this.$element.trigger("input").trigger("change")
                );
              this.$element.prop("multiple")
                ? this.current(function (e) {
                    var t = [];
                    (i = [i]).push.apply(i, e);
                    for (var n = 0; n < i.length; n++) {
                      var s = i[n].id;
                      -1 === t.indexOf(s) && t.push(s);
                    }
                    r.$element.val(t),
                      r.$element.trigger("input").trigger("change");
                  })
                : ((e = i.id),
                  this.$element.val(e),
                  this.$element.trigger("input").trigger("change"));
            }),
            (n.prototype.unselect = function (i) {
              var r = this;
              if (this.$element.prop("multiple")) {
                if (
                  ((i.selected = !1),
                  null != i.element &&
                    "option" === i.element.tagName.toLowerCase())
                )
                  return (
                    (i.element.selected = !1),
                    void this.$element.trigger("input").trigger("change")
                  );
                this.current(function (e) {
                  for (var t = [], n = 0; n < e.length; n++) {
                    var s = e[n].id;
                    s !== i.id && -1 === t.indexOf(s) && t.push(s);
                  }
                  r.$element.val(t),
                    r.$element.trigger("input").trigger("change");
                });
              }
            }),
            (n.prototype.bind = function (e, t) {
              var n = this;
              (this.container = e).on("select", function (e) {
                n.select(e.data);
              }),
                e.on("unselect", function (e) {
                  n.unselect(e.data);
                });
            }),
            (n.prototype.destroy = function () {
              this.$element.find("*").each(function () {
                a.RemoveData(this);
              });
            }),
            (n.prototype.query = function (t, e) {
              var n = [],
                s = this;
              this.$element.children().each(function () {
                var e;
                ("option" !== this.tagName.toLowerCase() &&
                  "optgroup" !== this.tagName.toLowerCase()) ||
                  ((e = l(this)),
                  (e = s.item(e)),
                  null !== (e = s.matches(t, e)) && n.push(e));
              }),
                e({ results: n });
            }),
            (n.prototype.addOptions = function (e) {
              this.$element.append(e);
            }),
            (n.prototype.option = function (e) {
              var t;
              e.children
                ? ((t = document.createElement("optgroup")).label = e.text)
                : void 0 !== (t = document.createElement("option")).textContent
                ? (t.textContent = e.text)
                : (t.innerText = e.text),
                void 0 !== e.id && (t.value = e.id),
                e.disabled && (t.disabled = !0),
                e.selected && (t.selected = !0),
                e.title && (t.title = e.title);
              e = this._normalizeItem(e);
              return (e.element = t), a.StoreData(t, "data", e), l(t);
            }),
            (n.prototype.item = function (e) {
              var t = {};
              if (null != (t = a.GetData(e[0], "data"))) return t;
              var n = e[0];
              if ("option" === n.tagName.toLowerCase())
                t = {
                  id: e.val(),
                  text: e.text(),
                  disabled: e.prop("disabled"),
                  selected: e.prop("selected"),
                  title: e.prop("title"),
                };
              else if ("optgroup" === n.tagName.toLowerCase()) {
                t = {
                  text: e.prop("label"),
                  children: [],
                  title: e.prop("title"),
                };
                for (
                  var s = e.children("option"), i = [], r = 0;
                  r < s.length;
                  r++
                ) {
                  var o = l(s[r]),
                    o = this.item(o);
                  i.push(o);
                }
                t.children = i;
              }
              return (
                ((t = this._normalizeItem(t)).element = e[0]),
                a.StoreData(e[0], "data", t),
                t
              );
            }),
            (n.prototype._normalizeItem = function (e) {
              e !== Object(e) && (e = { id: e, text: e });
              return (
                null != (e = l.extend({}, { text: "" }, e)).id &&
                  (e.id = e.id.toString()),
                null != e.text && (e.text = e.text.toString()),
                null == e._resultId &&
                  e.id &&
                  null != this.container &&
                  (e._resultId = this.generateResultId(this.container, e)),
                l.extend({}, { selected: !1, disabled: !1 }, e)
              );
            }),
            (n.prototype.matches = function (e, t) {
              return this.options.get("matcher")(e, t);
            }),
            n
          );
        }
      ),
      u.define(
        "select2/data/array",
        ["./select", "../utils", "jquery"],
        function (e, t, c) {
          function s(e, t) {
            (this._dataToConvert = t.get("data") || []),
              s.__super__.constructor.call(this, e, t);
          }
          return (
            t.Extend(s, e),
            (s.prototype.bind = function (e, t) {
              s.__super__.bind.call(this, e, t),
                this.addOptions(this.convertToOptions(this._dataToConvert));
            }),
            (s.prototype.select = function (n) {
              var e = this.$element.find("option").filter(function (e, t) {
                return t.value == n.id.toString();
              });
              0 === e.length && ((e = this.option(n)), this.addOptions(e)),
                s.__super__.select.call(this, n);
            }),
            (s.prototype.convertToOptions = function (e) {
              var t = this,
                n = this.$element.find("option"),
                s = n
                  .map(function () {
                    return t.item(c(this)).id;
                  })
                  .get(),
                i = [];
              for (var r = 0; r < e.length; r++) {
                var o,
                  a,
                  l = this._normalizeItem(e[r]);
                0 <= s.indexOf(l.id)
                  ? ((o = n.filter(
                      (function (e) {
                        return function () {
                          return c(this).val() == e.id;
                        };
                      })(l)
                    )),
                    (a = this.item(o)),
                    (a = c.extend(!0, {}, l, a)),
                    (a = this.option(a)),
                    o.replaceWith(a))
                  : ((a = this.option(l)),
                    l.children &&
                      ((l = this.convertToOptions(l.children)), a.append(l)),
                    i.push(a));
              }
              return i;
            }),
            s
          );
        }
      ),
      u.define(
        "select2/data/ajax",
        ["./array", "../utils", "jquery"],
        function (e, t, r) {
          function n(e, t) {
            (this.ajaxOptions = this._applyDefaults(t.get("ajax"))),
              null != this.ajaxOptions.processResults &&
                (this.processResults = this.ajaxOptions.processResults),
              n.__super__.constructor.call(this, e, t);
          }
          return (
            t.Extend(n, e),
            (n.prototype._applyDefaults = function (e) {
              var t = {
                data: function (e) {
                  return r.extend({}, e, { q: e.term });
                },
                transport: function (e, t, n) {
                  e = r.ajax(e);
                  return e.then(t), e.fail(n), e;
                },
              };
              return r.extend({}, t, e, !0);
            }),
            (n.prototype.processResults = function (e) {
              return e;
            }),
            (n.prototype.query = function (t, n) {
              var s = this;
              null != this._request &&
                ("function" == typeof this._request.abort &&
                  this._request.abort(),
                (this._request = null));
              var i = r.extend({ type: "GET" }, this.ajaxOptions);
              function e() {
                var e = i.transport(
                  i,
                  function (e) {
                    e = s.processResults(e, t);
                    s.options.get("debug") &&
                      window.console &&
                      console.error &&
                      ((e && e.results && Array.isArray(e.results)) ||
                        console.error(
                          "Select2: The AJAX results did not return an array in the `results` key of the response."
                        )),
                      n(e);
                  },
                  function () {
                    ("status" in e && (0 === e.status || "0" === e.status)) ||
                      s.trigger("results:message", { message: "errorLoading" });
                  }
                );
                s._request = e;
              }
              "function" == typeof i.url &&
                (i.url = i.url.call(this.$element, t)),
                "function" == typeof i.data &&
                  (i.data = i.data.call(this.$element, t)),
                this.ajaxOptions.delay && null != t.term
                  ? (this._queryTimeout &&
                      window.clearTimeout(this._queryTimeout),
                    (this._queryTimeout = window.setTimeout(
                      e,
                      this.ajaxOptions.delay
                    )))
                  : e();
            }),
            n
          );
        }
      ),
      u.define("select2/data/tags", ["jquery"], function (t) {
        function e(e, t, n) {
          var s = n.get("tags"),
            i = n.get("createTag");
          void 0 !== i && (this.createTag = i);
          i = n.get("insertTag");
          if (
            (void 0 !== i && (this.insertTag = i),
            e.call(this, t, n),
            Array.isArray(s))
          )
            for (var r = 0; r < s.length; r++) {
              var o = s[r],
                o = this._normalizeItem(o),
                o = this.option(o);
              this.$element.append(o);
            }
        }
        return (
          (e.prototype.query = function (e, c, u) {
            var d = this;
            this._removeOldTags(),
              null != c.term && null == c.page
                ? e.call(this, c, function e(t, n) {
                    for (var s = t.results, i = 0; i < s.length; i++) {
                      var r = s[i],
                        o =
                          null != r.children && !e({ results: r.children }, !0);
                      if (
                        (r.text || "").toUpperCase() ===
                          (c.term || "").toUpperCase() ||
                        o
                      )
                        return !n && ((t.data = s), void u(t));
                    }
                    if (n) return !0;
                    var a,
                      l = d.createTag(c);
                    null != l &&
                      ((a = d.option(l)).attr("data-select2-tag", "true"),
                      d.addOptions([a]),
                      d.insertTag(s, l)),
                      (t.results = s),
                      u(t);
                  })
                : e.call(this, c, u);
          }),
          (e.prototype.createTag = function (e, t) {
            if (null == t.term) return null;
            t = t.term.trim();
            return "" === t ? null : { id: t, text: t };
          }),
          (e.prototype.insertTag = function (e, t, n) {
            t.unshift(n);
          }),
          (e.prototype._removeOldTags = function (e) {
            this.$element.find("option[data-select2-tag]").each(function () {
              this.selected || t(this).remove();
            });
          }),
          e
        );
      }),
      u.define("select2/data/tokenizer", ["jquery"], function (c) {
        function e(e, t, n) {
          var s = n.get("tokenizer");
          void 0 !== s && (this.tokenizer = s), e.call(this, t, n);
        }
        return (
          (e.prototype.bind = function (e, t, n) {
            e.call(this, t, n),
              (this.$search =
                t.dropdown.$search ||
                t.selection.$search ||
                n.find(".select2-search__field"));
          }),
          (e.prototype.query = function (e, t, n) {
            var s = this;
            t.term = t.term || "";
            var i = this.tokenizer(t, this.options, function (e) {
              var t,
                n = s._normalizeItem(e);
              s.$element.find("option").filter(function () {
                return c(this).val() === n.id;
              }).length ||
                ((t = s.option(n)).attr("data-select2-tag", !0),
                s._removeOldTags(),
                s.addOptions([t])),
                (t = n),
                s.trigger("select", { data: t });
            });
            i.term !== t.term &&
              (this.$search.length &&
                (this.$search.val(i.term), this.$search.trigger("focus")),
              (t.term = i.term)),
              e.call(this, t, n);
          }),
          (e.prototype.tokenizer = function (e, t, n, s) {
            for (
              var i = n.get("tokenSeparators") || [],
                r = t.term,
                o = 0,
                a =
                  this.createTag ||
                  function (e) {
                    return { id: e.term, text: e.term };
                  };
              o < r.length;

            ) {
              var l = r[o];
              -1 !== i.indexOf(l)
                ? ((l = r.substr(0, o)),
                  null != (l = a(c.extend({}, t, { term: l })))
                    ? (s(l), (r = r.substr(o + 1) || ""), (o = 0))
                    : o++)
                : o++;
            }
            return { term: r };
          }),
          e
        );
      }),
      u.define("select2/data/minimumInputLength", [], function () {
        function e(e, t, n) {
          (this.minimumInputLength = n.get("minimumInputLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.query = function (e, t, n) {
            (t.term = t.term || ""),
              t.term.length < this.minimumInputLength
                ? this.trigger("results:message", {
                    message: "inputTooShort",
                    args: {
                      minimum: this.minimumInputLength,
                      input: t.term,
                      params: t,
                    },
                  })
                : e.call(this, t, n);
          }),
          e
        );
      }),
      u.define("select2/data/maximumInputLength", [], function () {
        function e(e, t, n) {
          (this.maximumInputLength = n.get("maximumInputLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.query = function (e, t, n) {
            (t.term = t.term || ""),
              0 < this.maximumInputLength &&
              t.term.length > this.maximumInputLength
                ? this.trigger("results:message", {
                    message: "inputTooLong",
                    args: {
                      maximum: this.maximumInputLength,
                      input: t.term,
                      params: t,
                    },
                  })
                : e.call(this, t, n);
          }),
          e
        );
      }),
      u.define("select2/data/maximumSelectionLength", [], function () {
        function e(e, t, n) {
          (this.maximumSelectionLength = n.get("maximumSelectionLength")),
            e.call(this, t, n);
        }
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("select", function () {
                s._checkIfMaximumSelected();
              });
          }),
          (e.prototype.query = function (e, t, n) {
            var s = this;
            this._checkIfMaximumSelected(function () {
              e.call(s, t, n);
            });
          }),
          (e.prototype._checkIfMaximumSelected = function (e, t) {
            var n = this;
            this.current(function (e) {
              e = null != e ? e.length : 0;
              0 < n.maximumSelectionLength && e >= n.maximumSelectionLength
                ? n.trigger("results:message", {
                    message: "maximumSelected",
                    args: { maximum: n.maximumSelectionLength },
                  })
                : t && t();
            });
          }),
          e
        );
      }),
      u.define("select2/dropdown", ["jquery", "./utils"], function (t, e) {
        function n(e, t) {
          (this.$element = e),
            (this.options = t),
            n.__super__.constructor.call(this);
        }
        return (
          e.Extend(n, e.Observable),
          (n.prototype.render = function () {
            var e = t(
              '<span class="select2-dropdown"><span class="select2-results"></span></span>'
            );
            return e.attr("dir", this.options.get("dir")), (this.$dropdown = e);
          }),
          (n.prototype.bind = function () {}),
          (n.prototype.position = function (e, t) {}),
          (n.prototype.destroy = function () {
            this.$dropdown.remove();
          }),
          n
        );
      }),
      u.define("select2/dropdown/search", ["jquery"], function (r) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              n = this.options.get("translations").get("search"),
              e = r(
                '<span class="select2-search select2-search--dropdown"><input class="select2-search__field" type="search" tabindex="-1" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" /></span>'
              );
            return (
              (this.$searchContainer = e),
              (this.$search = e.find("input")),
              this.$search.prop(
                "autocomplete",
                this.options.get("autocomplete")
              ),
              this.$search.attr("aria-label", n()),
              t.prepend(e),
              t
            );
          }),
          (e.prototype.bind = function (e, t, n) {
            var s = this,
              i = t.id + "-results";
            e.call(this, t, n),
              this.$search.on("keydown", function (e) {
                s.trigger("keypress", e),
                  (s._keyUpPrevented = e.isDefaultPrevented());
              }),
              this.$search.on("input", function (e) {
                r(this).off("keyup");
              }),
              this.$search.on("keyup input", function (e) {
                s.handleSearch(e);
              }),
              t.on("open", function () {
                s.$search.attr("tabindex", 0),
                  s.$search.attr("aria-controls", i),
                  s.$search.trigger("focus"),
                  window.setTimeout(function () {
                    s.$search.trigger("focus");
                  }, 0);
              }),
              t.on("close", function () {
                s.$search.attr("tabindex", -1),
                  s.$search.removeAttr("aria-controls"),
                  s.$search.removeAttr("aria-activedescendant"),
                  s.$search.val(""),
                  s.$search.trigger("blur");
              }),
              t.on("focus", function () {
                t.isOpen() || s.$search.trigger("focus");
              }),
              t.on("results:all", function (e) {
                (null != e.query.term && "" !== e.query.term) ||
                  (s.showSearch(e)
                    ? s.$searchContainer[0].classList.remove(
                        "select2-search--hide"
                      )
                    : s.$searchContainer[0].classList.add(
                        "select2-search--hide"
                      ));
              }),
              t.on("results:focus", function (e) {
                e.data._resultId
                  ? s.$search.attr("aria-activedescendant", e.data._resultId)
                  : s.$search.removeAttr("aria-activedescendant");
              });
          }),
          (e.prototype.handleSearch = function (e) {
            var t;
            this._keyUpPrevented ||
              ((t = this.$search.val()), this.trigger("query", { term: t })),
              (this._keyUpPrevented = !1);
          }),
          (e.prototype.showSearch = function (e, t) {
            return !0;
          }),
          e
        );
      }),
      u.define("select2/dropdown/hidePlaceholder", [], function () {
        function e(e, t, n, s) {
          (this.placeholder = this.normalizePlaceholder(n.get("placeholder"))),
            e.call(this, t, n, s);
        }
        return (
          (e.prototype.append = function (e, t) {
            (t.results = this.removePlaceholder(t.results)), e.call(this, t);
          }),
          (e.prototype.normalizePlaceholder = function (e, t) {
            return "string" == typeof t && (t = { id: "", text: t }), t;
          }),
          (e.prototype.removePlaceholder = function (e, t) {
            for (var n = t.slice(0), s = t.length - 1; 0 <= s; s--) {
              var i = t[s];
              this.placeholder.id === i.id && n.splice(s, 1);
            }
            return n;
          }),
          e
        );
      }),
      u.define("select2/dropdown/infiniteScroll", ["jquery"], function (n) {
        function e(e, t, n, s) {
          (this.lastParams = {}),
            e.call(this, t, n, s),
            (this.$loadingMore = this.createLoadingMore()),
            (this.loading = !1);
        }
        return (
          (e.prototype.append = function (e, t) {
            this.$loadingMore.remove(),
              (this.loading = !1),
              e.call(this, t),
              this.showLoadingMore(t) &&
                (this.$results.append(this.$loadingMore),
                this.loadMoreIfNeeded());
          }),
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("query", function (e) {
                (s.lastParams = e), (s.loading = !0);
              }),
              t.on("query:append", function (e) {
                (s.lastParams = e), (s.loading = !0);
              }),
              this.$results.on("scroll", this.loadMoreIfNeeded.bind(this));
          }),
          (e.prototype.loadMoreIfNeeded = function () {
            var e = n.contains(document.documentElement, this.$loadingMore[0]);
            !this.loading &&
              e &&
              ((e = this.$results.offset().top + this.$results.outerHeight(!1)),
              this.$loadingMore.offset().top +
                this.$loadingMore.outerHeight(!1) <=
                e + 50 && this.loadMore());
          }),
          (e.prototype.loadMore = function () {
            this.loading = !0;
            var e = n.extend({}, { page: 1 }, this.lastParams);
            e.page++, this.trigger("query:append", e);
          }),
          (e.prototype.showLoadingMore = function (e, t) {
            return t.pagination && t.pagination.more;
          }),
          (e.prototype.createLoadingMore = function () {
            var e = n(
                '<li class="select2-results__option select2-results__option--load-more"role="option" aria-disabled="true"></li>'
              ),
              t = this.options.get("translations").get("loadingMore");
            return e.html(t(this.lastParams)), e;
          }),
          e
        );
      }),
      u.define(
        "select2/dropdown/attachBody",
        ["jquery", "../utils"],
        function (u, o) {
          function e(e, t, n) {
            (this.$dropdownParent = u(
              n.get("dropdownParent") || document.body
            )),
              e.call(this, t, n);
          }
          return (
            (e.prototype.bind = function (e, t, n) {
              var s = this;
              e.call(this, t, n),
                t.on("open", function () {
                  s._showDropdown(),
                    s._attachPositioningHandler(t),
                    s._bindContainerResultHandlers(t);
                }),
                t.on("close", function () {
                  s._hideDropdown(), s._detachPositioningHandler(t);
                }),
                this.$dropdownContainer.on("mousedown", function (e) {
                  e.stopPropagation();
                });
            }),
            (e.prototype.destroy = function (e) {
              e.call(this), this.$dropdownContainer.remove();
            }),
            (e.prototype.position = function (e, t, n) {
              t.attr("class", n.attr("class")),
                t[0].classList.remove("select2"),
                t[0].classList.add("select2-container--open"),
                t.css({ position: "absolute", top: -999999 }),
                (this.$container = n);
            }),
            (e.prototype.render = function (e) {
              var t = u("<span></span>"),
                e = e.call(this);
              return t.append(e), (this.$dropdownContainer = t);
            }),
            (e.prototype._hideDropdown = function (e) {
              this.$dropdownContainer.detach();
            }),
            (e.prototype._bindContainerResultHandlers = function (e, t) {
              var n;
              this._containerResultsHandlersBound ||
                ((n = this),
                t.on("results:all", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("results:append", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("results:message", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("select", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                t.on("unselect", function () {
                  n._positionDropdown(), n._resizeDropdown();
                }),
                (this._containerResultsHandlersBound = !0));
            }),
            (e.prototype._attachPositioningHandler = function (e, t) {
              var n = this,
                s = "scroll.select2." + t.id,
                i = "resize.select2." + t.id,
                r = "orientationchange.select2." + t.id,
                t = this.$container.parents().filter(o.hasScroll);
              t.each(function () {
                o.StoreData(this, "select2-scroll-position", {
                  x: u(this).scrollLeft(),
                  y: u(this).scrollTop(),
                });
              }),
                t.on(s, function (e) {
                  var t = o.GetData(this, "select2-scroll-position");
                  u(this).scrollTop(t.y);
                }),
                u(window).on(s + " " + i + " " + r, function (e) {
                  n._positionDropdown(), n._resizeDropdown();
                });
            }),
            (e.prototype._detachPositioningHandler = function (e, t) {
              var n = "scroll.select2." + t.id,
                s = "resize.select2." + t.id,
                t = "orientationchange.select2." + t.id;
              this.$container.parents().filter(o.hasScroll).off(n),
                u(window).off(n + " " + s + " " + t);
            }),
            (e.prototype._positionDropdown = function () {
              var e = u(window),
                t = this.$dropdown[0].classList.contains(
                  "select2-dropdown--above"
                ),
                n = this.$dropdown[0].classList.contains(
                  "select2-dropdown--below"
                ),
                s = null,
                i = this.$container.offset();
              i.bottom = i.top + this.$container.outerHeight(!1);
              var r = { height: this.$container.outerHeight(!1) };
              (r.top = i.top), (r.bottom = i.top + r.height);
              var o = this.$dropdown.outerHeight(!1),
                a = e.scrollTop(),
                l = e.scrollTop() + e.height(),
                c = a < i.top - o,
                e = l > i.bottom + o,
                a = { left: i.left, top: r.bottom },
                l = this.$dropdownParent;
              "static" === l.css("position") && (l = l.offsetParent());
              i = { top: 0, left: 0 };
              (u.contains(document.body, l[0]) || l[0].isConnected) &&
                (i = l.offset()),
                (a.top -= i.top),
                (a.left -= i.left),
                t || n || (s = "below"),
                e || !c || t ? !c && e && t && (s = "below") : (s = "above"),
                ("above" == s || (t && "below" !== s)) &&
                  (a.top = r.top - i.top - o),
                null != s &&
                  (this.$dropdown[0].classList.remove(
                    "select2-dropdown--below"
                  ),
                  this.$dropdown[0].classList.remove("select2-dropdown--above"),
                  this.$dropdown[0].classList.add("select2-dropdown--" + s),
                  this.$container[0].classList.remove(
                    "select2-container--below"
                  ),
                  this.$container[0].classList.remove(
                    "select2-container--above"
                  ),
                  this.$container[0].classList.add("select2-container--" + s)),
                this.$dropdownContainer.css(a);
            }),
            (e.prototype._resizeDropdown = function () {
              var e = { width: this.$container.outerWidth(!1) + "px" };
              this.options.get("dropdownAutoWidth") &&
                ((e.minWidth = e.width),
                (e.position = "relative"),
                (e.width = "auto")),
                this.$dropdown.css(e);
            }),
            (e.prototype._showDropdown = function (e) {
              this.$dropdownContainer.appendTo(this.$dropdownParent),
                this._positionDropdown(),
                this._resizeDropdown();
            }),
            e
          );
        }
      ),
      u.define("select2/dropdown/minimumResultsForSearch", [], function () {
        function e(e, t, n, s) {
          (this.minimumResultsForSearch = n.get("minimumResultsForSearch")),
            this.minimumResultsForSearch < 0 &&
              (this.minimumResultsForSearch = 1 / 0),
            e.call(this, t, n, s);
        }
        return (
          (e.prototype.showSearch = function (e, t) {
            return (
              !(
                (function e(t) {
                  for (var n = 0, s = 0; s < t.length; s++) {
                    var i = t[s];
                    i.children ? (n += e(i.children)) : n++;
                  }
                  return n;
                })(t.data.results) < this.minimumResultsForSearch
              ) && e.call(this, t)
            );
          }),
          e
        );
      }),
      u.define("select2/dropdown/selectOnClose", ["../utils"], function (s) {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("close", function (e) {
                s._handleSelectOnClose(e);
              });
          }),
          (e.prototype._handleSelectOnClose = function (e, t) {
            if (t && null != t.originalSelect2Event) {
              var n = t.originalSelect2Event;
              if ("select" === n._type || "unselect" === n._type) return;
            }
            n = this.getHighlightedResults();
            n.length < 1 ||
              (null != (n = s.GetData(n[0], "data")).element &&
                n.element.selected) ||
              (null == n.element && n.selected) ||
              this.trigger("select", { data: n });
          }),
          e
        );
      }),
      u.define("select2/dropdown/closeOnSelect", [], function () {
        function e() {}
        return (
          (e.prototype.bind = function (e, t, n) {
            var s = this;
            e.call(this, t, n),
              t.on("select", function (e) {
                s._selectTriggered(e);
              }),
              t.on("unselect", function (e) {
                s._selectTriggered(e);
              });
          }),
          (e.prototype._selectTriggered = function (e, t) {
            var n = t.originalEvent;
            (n && (n.ctrlKey || n.metaKey)) ||
              this.trigger("close", {
                originalEvent: n,
                originalSelect2Event: t,
              });
          }),
          e
        );
      }),
      u.define("select2/dropdown/dropdownCss", ["../utils"], function (n) {
        function e() {}
        return (
          (e.prototype.render = function (e) {
            var t = e.call(this),
              e = this.options.get("dropdownCssClass") || "";
            return (
              -1 !== e.indexOf(":all:") &&
                ((e = e.replace(":all:", "")),
                n.copyNonInternalCssClasses(t[0], this.$element[0])),
              t.addClass(e),
              t
            );
          }),
          e
        );
      }),
      u.define(
        "select2/dropdown/tagsSearchHighlight",
        ["../utils"],
        function (s) {
          function e() {}
          return (
            (e.prototype.highlightFirstItem = function (e) {
              var t = this.$results.find(
                ".select2-results__option--selectable:not(.select2-results__option--selected)"
              );
              if (0 < t.length) {
                var n = t.first(),
                  t = s.GetData(n[0], "data").element;
                if (
                  t &&
                  t.getAttribute &&
                  "true" === t.getAttribute("data-select2-tag")
                )
                  return void n.trigger("mouseenter");
              }
              e.call(this);
            }),
            e
          );
        }
      ),
      u.define("select2/i18n/en", [], function () {
        return {
          errorLoading: function () {
            return "The results could not be loaded.";
          },
          inputTooLong: function (e) {
            var t = e.input.length - e.maximum,
              e = "Please delete " + t + " character";
            return 1 != t && (e += "s"), e;
          },
          inputTooShort: function (e) {
            return (
              "Please enter " +
              (e.minimum - e.input.length) +
              " or more characters"
            );
          },
          loadingMore: function () {
            return "Loading more results…";
          },
          maximumSelected: function (e) {
            var t = "You can only select " + e.maximum + " item";
            return 1 != e.maximum && (t += "s"), t;
          },
          noResults: function () {
            return "No results found";
          },
          searching: function () {
            return "Searching…";
          },
          removeAllItems: function () {
            return "Remove all items";
          },
          removeItem: function () {
            return "Remove item";
          },
          search: function () {
            return "Search";
          },
        };
      }),
      u.define(
        "select2/defaults",
        [
          "jquery",
          "./results",
          "./selection/single",
          "./selection/multiple",
          "./selection/placeholder",
          "./selection/allowClear",
          "./selection/search",
          "./selection/selectionCss",
          "./selection/eventRelay",
          "./utils",
          "./translation",
          "./diacritics",
          "./data/select",
          "./data/array",
          "./data/ajax",
          "./data/tags",
          "./data/tokenizer",
          "./data/minimumInputLength",
          "./data/maximumInputLength",
          "./data/maximumSelectionLength",
          "./dropdown",
          "./dropdown/search",
          "./dropdown/hidePlaceholder",
          "./dropdown/infiniteScroll",
          "./dropdown/attachBody",
          "./dropdown/minimumResultsForSearch",
          "./dropdown/selectOnClose",
          "./dropdown/closeOnSelect",
          "./dropdown/dropdownCss",
          "./dropdown/tagsSearchHighlight",
          "./i18n/en",
        ],
        function (
          l,
          r,
          o,
          a,
          c,
          u,
          d,
          p,
          h,
          f,
          g,
          t,
          m,
          y,
          v,
          _,
          b,
          $,
          w,
          x,
          A,
          D,
          S,
          E,
          O,
          C,
          L,
          T,
          q,
          I,
          e
        ) {
          function n() {
            this.reset();
          }
          return (
            (n.prototype.apply = function (e) {
              var t;
              null == (e = l.extend(!0, {}, this.defaults, e)).dataAdapter &&
                (null != e.ajax
                  ? (e.dataAdapter = v)
                  : null != e.data
                  ? (e.dataAdapter = y)
                  : (e.dataAdapter = m),
                0 < e.minimumInputLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, $)),
                0 < e.maximumInputLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, w)),
                0 < e.maximumSelectionLength &&
                  (e.dataAdapter = f.Decorate(e.dataAdapter, x)),
                e.tags && (e.dataAdapter = f.Decorate(e.dataAdapter, _)),
                (null == e.tokenSeparators && null == e.tokenizer) ||
                  (e.dataAdapter = f.Decorate(e.dataAdapter, b))),
                null == e.resultsAdapter &&
                  ((e.resultsAdapter = r),
                  null != e.ajax &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, E)),
                  null != e.placeholder &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, S)),
                  e.selectOnClose &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, L)),
                  e.tags &&
                    (e.resultsAdapter = f.Decorate(e.resultsAdapter, I))),
                null == e.dropdownAdapter &&
                  (e.multiple
                    ? (e.dropdownAdapter = A)
                    : ((t = f.Decorate(A, D)), (e.dropdownAdapter = t)),
                  0 !== e.minimumResultsForSearch &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, C)),
                  e.closeOnSelect &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, T)),
                  null != e.dropdownCssClass &&
                    (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, q)),
                  (e.dropdownAdapter = f.Decorate(e.dropdownAdapter, O))),
                null == e.selectionAdapter &&
                  (e.multiple
                    ? (e.selectionAdapter = a)
                    : (e.selectionAdapter = o),
                  null != e.placeholder &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, c)),
                  e.allowClear &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, u)),
                  e.multiple &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, d)),
                  null != e.selectionCssClass &&
                    (e.selectionAdapter = f.Decorate(e.selectionAdapter, p)),
                  (e.selectionAdapter = f.Decorate(e.selectionAdapter, h))),
                (e.language = this._resolveLanguage(e.language)),
                e.language.push("en");
              for (var n = [], s = 0; s < e.language.length; s++) {
                var i = e.language[s];
                -1 === n.indexOf(i) && n.push(i);
              }
              return (
                (e.language = n),
                (e.translations = this._processTranslations(
                  e.language,
                  e.debug
                )),
                e
              );
            }),
            (n.prototype.reset = function () {
              function a(e) {
                return e.replace(/[^\u0000-\u007E]/g, function (e) {
                  return t[e] || e;
                });
              }
              this.defaults = {
                amdLanguageBase: "./i18n/",
                autocomplete: "off",
                closeOnSelect: !0,
                debug: !1,
                dropdownAutoWidth: !1,
                escapeMarkup: f.escapeMarkup,
                language: {},
                matcher: function e(t, n) {
                  if (null == t.term || "" === t.term.trim()) return n;
                  if (n.children && 0 < n.children.length) {
                    for (
                      var s = l.extend(!0, {}, n), i = n.children.length - 1;
                      0 <= i;
                      i--
                    )
                      null == e(t, n.children[i]) && s.children.splice(i, 1);
                    return 0 < s.children.length ? s : e(t, s);
                  }
                  var r = a(n.text).toUpperCase(),
                    o = a(t.term).toUpperCase();
                  return -1 < r.indexOf(o) ? n : null;
                },
                minimumInputLength: 0,
                maximumInputLength: 0,
                maximumSelectionLength: 0,
                minimumResultsForSearch: 0,
                selectOnClose: !1,
                scrollAfterSelect: !1,
                sorter: function (e) {
                  return e;
                },
                templateResult: function (e) {
                  return e.text;
                },
                templateSelection: function (e) {
                  return e.text;
                },
                theme: "default",
                width: "resolve",
              };
            }),
            (n.prototype.applyFromElement = function (e, t) {
              var n = e.language,
                s = this.defaults.language,
                i = t.prop("lang"),
                t = t.closest("[lang]").prop("lang"),
                t = Array.prototype.concat.call(
                  this._resolveLanguage(i),
                  this._resolveLanguage(n),
                  this._resolveLanguage(s),
                  this._resolveLanguage(t)
                );
              return (e.language = t), e;
            }),
            (n.prototype._resolveLanguage = function (e) {
              if (!e) return [];
              if (l.isEmptyObject(e)) return [];
              if (l.isPlainObject(e)) return [e];
              for (
                var t, n = Array.isArray(e) ? e : [e], s = [], i = 0;
                i < n.length;
                i++
              )
                s.push(n[i]),
                  "string" == typeof n[i] &&
                    0 < n[i].indexOf("-") &&
                    ((t = n[i].split("-")[0]), s.push(t));
              return s;
            }),
            (n.prototype._processTranslations = function (e, t) {
              for (var n = new g(), s = 0; s < e.length; s++) {
                var i = new g(),
                  r = e[s];
                if ("string" == typeof r)
                  try {
                    i = g.loadPath(r);
                  } catch (e) {
                    try {
                      (r = this.defaults.amdLanguageBase + r),
                        (i = g.loadPath(r));
                    } catch (e) {
                      t &&
                        window.console &&
                        console.warn &&
                        console.warn(
                          'Select2: The language file for "' +
                            r +
                            '" could not be automatically loaded. A fallback will be used instead.'
                        );
                    }
                  }
                else i = l.isPlainObject(r) ? new g(r) : r;
                n.extend(i);
              }
              return n;
            }),
            (n.prototype.set = function (e, t) {
              var n = {};
              n[l.camelCase(e)] = t;
              n = f._convertData(n);
              l.extend(!0, this.defaults, n);
            }),
            new n()
          );
        }
      ),
      u.define(
        "select2/options",
        ["jquery", "./defaults", "./utils"],
        function (c, n, u) {
          function e(e, t) {
            (this.options = e),
              null != t && this.fromElement(t),
              null != t && (this.options = n.applyFromElement(this.options, t)),
              (this.options = n.apply(this.options));
          }
          return (
            (e.prototype.fromElement = function (e) {
              var t = ["select2"];
              null == this.options.multiple &&
                (this.options.multiple = e.prop("multiple")),
                null == this.options.disabled &&
                  (this.options.disabled = e.prop("disabled")),
                null == this.options.autocomplete &&
                  e.prop("autocomplete") &&
                  (this.options.autocomplete = e.prop("autocomplete")),
                null == this.options.dir &&
                  (e.prop("dir")
                    ? (this.options.dir = e.prop("dir"))
                    : e.closest("[dir]").prop("dir")
                    ? (this.options.dir = e.closest("[dir]").prop("dir"))
                    : (this.options.dir = "ltr")),
                e.prop("disabled", this.options.disabled),
                e.prop("multiple", this.options.multiple),
                u.GetData(e[0], "select2Tags") &&
                  (this.options.debug &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      'Select2: The `data-select2-tags` attribute has been changed to use the `data-data` and `data-tags="true"` attributes and will be removed in future versions of Select2.'
                    ),
                  u.StoreData(e[0], "data", u.GetData(e[0], "select2Tags")),
                  u.StoreData(e[0], "tags", !0)),
                u.GetData(e[0], "ajaxUrl") &&
                  (this.options.debug &&
                    window.console &&
                    console.warn &&
                    console.warn(
                      "Select2: The `data-ajax-url` attribute has been changed to `data-ajax--url` and support for the old attribute will be removed in future versions of Select2."
                    ),
                  e.attr("ajax--url", u.GetData(e[0], "ajaxUrl")),
                  u.StoreData(e[0], "ajax-Url", u.GetData(e[0], "ajaxUrl")));
              var n = {};
              function s(e, t) {
                return t.toUpperCase();
              }
              for (var i = 0; i < e[0].attributes.length; i++) {
                var r = e[0].attributes[i].name,
                  o = "data-";
                r.substr(0, o.length) == o &&
                  ((r = r.substring(o.length)),
                  (o = u.GetData(e[0], r)),
                  (n[r.replace(/-([a-z])/g, s)] = o));
              }
              c.fn.jquery &&
                "1." == c.fn.jquery.substr(0, 2) &&
                e[0].dataset &&
                (n = c.extend(!0, {}, e[0].dataset, n));
              var a,
                l = c.extend(!0, {}, u.GetData(e[0]), n);
              for (a in (l = u._convertData(l)))
                -1 < t.indexOf(a) ||
                  (c.isPlainObject(this.options[a])
                    ? c.extend(this.options[a], l[a])
                    : (this.options[a] = l[a]));
              return this;
            }),
            (e.prototype.get = function (e) {
              return this.options[e];
            }),
            (e.prototype.set = function (e, t) {
              this.options[e] = t;
            }),
            e
          );
        }
      ),
      u.define(
        "select2/core",
        ["jquery", "./options", "./utils", "./keys"],
        function (t, i, r, s) {
          var o = function (e, t) {
            null != r.GetData(e[0], "select2") &&
              r.GetData(e[0], "select2").destroy(),
              (this.$element = e),
              (this.id = this._generateId(e)),
              (t = t || {}),
              (this.options = new i(t, e)),
              o.__super__.constructor.call(this);
            var n = e.attr("tabindex") || 0;
            r.StoreData(e[0], "old-tabindex", n), e.attr("tabindex", "-1");
            t = this.options.get("dataAdapter");
            this.dataAdapter = new t(e, this.options);
            n = this.render();
            this._placeContainer(n);
            t = this.options.get("selectionAdapter");
            (this.selection = new t(e, this.options)),
              (this.$selection = this.selection.render()),
              this.selection.position(this.$selection, n);
            t = this.options.get("dropdownAdapter");
            (this.dropdown = new t(e, this.options)),
              (this.$dropdown = this.dropdown.render()),
              this.dropdown.position(this.$dropdown, n);
            n = this.options.get("resultsAdapter");
            (this.results = new n(e, this.options, this.dataAdapter)),
              (this.$results = this.results.render()),
              this.results.position(this.$results, this.$dropdown);
            var s = this;
            this._bindAdapters(),
              this._registerDomEvents(),
              this._registerDataEvents(),
              this._registerSelectionEvents(),
              this._registerDropdownEvents(),
              this._registerResultsEvents(),
              this._registerEvents(),
              this.dataAdapter.current(function (e) {
                s.trigger("selection:update", { data: e });
              }),
              e[0].classList.add("select2-hidden-accessible"),
              e.attr("aria-hidden", "true"),
              this._syncAttributes(),
              r.StoreData(e[0], "select2", this),
              e.data("select2", this);
          };
          return (
            r.Extend(o, r.Observable),
            (o.prototype._generateId = function (e) {
              return (
                "select2-" +
                (null != e.attr("id")
                  ? e.attr("id")
                  : null != e.attr("name")
                  ? e.attr("name") + "-" + r.generateChars(2)
                  : r.generateChars(4)
                ).replace(/(:|\.|\[|\]|,)/g, "")
              );
            }),
            (o.prototype._placeContainer = function (e) {
              e.insertAfter(this.$element);
              var t = this._resolveWidth(
                this.$element,
                this.options.get("width")
              );
              null != t && e.css("width", t);
            }),
            (o.prototype._resolveWidth = function (e, t) {
              var n =
                /^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;
              if ("resolve" == t) {
                var s = this._resolveWidth(e, "style");
                return null != s ? s : this._resolveWidth(e, "element");
              }
              if ("element" == t) {
                s = e.outerWidth(!1);
                return s <= 0 ? "auto" : s + "px";
              }
              if ("style" != t)
                return "computedstyle" != t
                  ? t
                  : window.getComputedStyle(e[0]).width;
              e = e.attr("style");
              if ("string" != typeof e) return null;
              for (var i = e.split(";"), r = 0, o = i.length; r < o; r += 1) {
                var a = i[r].replace(/\s/g, "").match(n);
                if (null !== a && 1 <= a.length) return a[1];
              }
              return null;
            }),
            (o.prototype._bindAdapters = function () {
              this.dataAdapter.bind(this, this.$container),
                this.selection.bind(this, this.$container),
                this.dropdown.bind(this, this.$container),
                this.results.bind(this, this.$container);
            }),
            (o.prototype._registerDomEvents = function () {
              var t = this;
              this.$element.on("change.select2", function () {
                t.dataAdapter.current(function (e) {
                  t.trigger("selection:update", { data: e });
                });
              }),
                this.$element.on("focus.select2", function (e) {
                  t.trigger("focus", e);
                }),
                (this._syncA = r.bind(this._syncAttributes, this)),
                (this._syncS = r.bind(this._syncSubtree, this)),
                (this._observer = new window.MutationObserver(function (e) {
                  t._syncA(), t._syncS(e);
                })),
                this._observer.observe(this.$element[0], {
                  attributes: !0,
                  childList: !0,
                  subtree: !1,
                });
            }),
            (o.prototype._registerDataEvents = function () {
              var n = this;
              this.dataAdapter.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerSelectionEvents = function () {
              var n = this,
                s = ["toggle", "focus"];
              this.selection.on("toggle", function () {
                n.toggleDropdown();
              }),
                this.selection.on("focus", function (e) {
                  n.focus(e);
                }),
                this.selection.on("*", function (e, t) {
                  -1 === s.indexOf(e) && n.trigger(e, t);
                });
            }),
            (o.prototype._registerDropdownEvents = function () {
              var n = this;
              this.dropdown.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerResultsEvents = function () {
              var n = this;
              this.results.on("*", function (e, t) {
                n.trigger(e, t);
              });
            }),
            (o.prototype._registerEvents = function () {
              var n = this;
              this.on("open", function () {
                n.$container[0].classList.add("select2-container--open");
              }),
                this.on("close", function () {
                  n.$container[0].classList.remove("select2-container--open");
                }),
                this.on("enable", function () {
                  n.$container[0].classList.remove(
                    "select2-container--disabled"
                  );
                }),
                this.on("disable", function () {
                  n.$container[0].classList.add("select2-container--disabled");
                }),
                this.on("blur", function () {
                  n.$container[0].classList.remove("select2-container--focus");
                }),
                this.on("query", function (t) {
                  n.isOpen() || n.trigger("open", {}),
                    this.dataAdapter.query(t, function (e) {
                      n.trigger("results:all", { data: e, query: t });
                    });
                }),
                this.on("query:append", function (t) {
                  this.dataAdapter.query(t, function (e) {
                    n.trigger("results:append", { data: e, query: t });
                  });
                }),
                this.on("keypress", function (e) {
                  var t = e.which;
                  n.isOpen()
                    ? t === s.ESC || (t === s.UP && e.altKey)
                      ? (n.close(e), e.preventDefault())
                      : t === s.ENTER || t === s.TAB
                      ? (n.trigger("results:select", {}), e.preventDefault())
                      : t === s.SPACE && e.ctrlKey
                      ? (n.trigger("results:toggle", {}), e.preventDefault())
                      : t === s.UP
                      ? (n.trigger("results:previous", {}), e.preventDefault())
                      : t === s.DOWN &&
                        (n.trigger("results:next", {}), e.preventDefault())
                    : (t === s.ENTER ||
                        t === s.SPACE ||
                        (t === s.DOWN && e.altKey)) &&
                      (n.open(), e.preventDefault());
                });
            }),
            (o.prototype._syncAttributes = function () {
              this.options.set("disabled", this.$element.prop("disabled")),
                this.isDisabled()
                  ? (this.isOpen() && this.close(), this.trigger("disable", {}))
                  : this.trigger("enable", {});
            }),
            (o.prototype._isChangeMutation = function (e) {
              var t = this;
              if (e.addedNodes && 0 < e.addedNodes.length) {
                for (var n = 0; n < e.addedNodes.length; n++)
                  if (e.addedNodes[n].selected) return !0;
              } else {
                if (e.removedNodes && 0 < e.removedNodes.length) return !0;
                if (Array.isArray(e))
                  return e.some(function (e) {
                    return t._isChangeMutation(e);
                  });
              }
              return !1;
            }),
            (o.prototype._syncSubtree = function (e) {
              var e = this._isChangeMutation(e),
                t = this;
              e &&
                this.dataAdapter.current(function (e) {
                  t.trigger("selection:update", { data: e });
                });
            }),
            (o.prototype.trigger = function (e, t) {
              var n = o.__super__.trigger,
                s = {
                  open: "opening",
                  close: "closing",
                  select: "selecting",
                  unselect: "unselecting",
                  clear: "clearing",
                };
              if ((void 0 === t && (t = {}), e in s)) {
                var i = s[e],
                  s = { prevented: !1, name: e, args: t };
                if ((n.call(this, i, s), s.prevented))
                  return void (t.prevented = !0);
              }
              n.call(this, e, t);
            }),
            (o.prototype.toggleDropdown = function () {
              this.isDisabled() || (this.isOpen() ? this.close() : this.open());
            }),
            (o.prototype.open = function () {
              this.isOpen() || this.isDisabled() || this.trigger("query", {});
            }),
            (o.prototype.close = function (e) {
              this.isOpen() && this.trigger("close", { originalEvent: e });
            }),
            (o.prototype.isEnabled = function () {
              return !this.isDisabled();
            }),
            (o.prototype.isDisabled = function () {
              return this.options.get("disabled");
            }),
            (o.prototype.isOpen = function () {
              return this.$container[0].classList.contains(
                "select2-container--open"
              );
            }),
            (o.prototype.hasFocus = function () {
              return this.$container[0].classList.contains(
                "select2-container--focus"
              );
            }),
            (o.prototype.focus = function (e) {
              this.hasFocus() ||
                (this.$container[0].classList.add("select2-container--focus"),
                this.trigger("focus", {}));
            }),
            (o.prototype.enable = function (e) {
              this.options.get("debug") &&
                window.console &&
                console.warn &&
                console.warn(
                  'Select2: The `select2("enable")` method has been deprecated and will be removed in later Select2 versions. Use $element.prop("disabled") instead.'
                ),
                (null != e && 0 !== e.length) || (e = [!0]);
              e = !e[0];
              this.$element.prop("disabled", e);
            }),
            (o.prototype.data = function () {
              this.options.get("debug") &&
                0 < arguments.length &&
                window.console &&
                console.warn &&
                console.warn(
                  'Select2: Data can no longer be set using `select2("data")`. You should consider setting the value instead using `$element.val()`.'
                );
              var t = [];
              return (
                this.dataAdapter.current(function (e) {
                  t = e;
                }),
                t
              );
            }),
            (o.prototype.val = function (e) {
              if (
                (this.options.get("debug") &&
                  window.console &&
                  console.warn &&
                  console.warn(
                    'Select2: The `select2("val")` method has been deprecated and will be removed in later Select2 versions. Use $element.val() instead.'
                  ),
                null == e || 0 === e.length)
              )
                return this.$element.val();
              e = e[0];
              Array.isArray(e) &&
                (e = e.map(function (e) {
                  return e.toString();
                })),
                this.$element.val(e).trigger("input").trigger("change");
            }),
            (o.prototype.destroy = function () {
              r.RemoveData(this.$container[0]),
                this.$container.remove(),
                this._observer.disconnect(),
                (this._observer = null),
                (this._syncA = null),
                (this._syncS = null),
                this.$element.off(".select2"),
                this.$element.attr(
                  "tabindex",
                  r.GetData(this.$element[0], "old-tabindex")
                ),
                this.$element[0].classList.remove("select2-hidden-accessible"),
                this.$element.attr("aria-hidden", "false"),
                r.RemoveData(this.$element[0]),
                this.$element.removeData("select2"),
                this.dataAdapter.destroy(),
                this.selection.destroy(),
                this.dropdown.destroy(),
                this.results.destroy(),
                (this.dataAdapter = null),
                (this.selection = null),
                (this.dropdown = null),
                (this.results = null);
            }),
            (o.prototype.render = function () {
              var e = t(
                '<span class="select2 select2-container"><span class="selection"></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>'
              );
              return (
                e.attr("dir", this.options.get("dir")),
                (this.$container = e),
                this.$container[0].classList.add(
                  "select2-container--" + this.options.get("theme")
                ),
                r.StoreData(e[0], "element", this.$element),
                e
              );
            }),
            o
          );
        }
      ),
      u.define("jquery-mousewheel", ["jquery"], function (e) {
        return e;
      }),
      u.define(
        "jquery.select2",
        [
          "jquery",
          "jquery-mousewheel",
          "./select2/core",
          "./select2/defaults",
          "./select2/utils",
        ],
        function (i, e, r, t, o) {
          var a;
          return (
            null == i.fn.select2 &&
              ((a = ["open", "close", "destroy"]),
              (i.fn.select2 = function (t) {
                if ("object" == typeof (t = t || {}))
                  return (
                    this.each(function () {
                      var e = i.extend(!0, {}, t);
                      new r(i(this), e);
                    }),
                    this
                  );
                if ("string" != typeof t)
                  throw new Error("Invalid arguments for Select2: " + t);
                var n,
                  s = Array.prototype.slice.call(arguments, 1);
                return (
                  this.each(function () {
                    var e = o.GetData(this, "select2");
                    null == e &&
                      window.console &&
                      console.error &&
                      console.error(
                        "The select2('" +
                          t +
                          "') method was called on an element that is not using Select2."
                      ),
                      (n = e[t].apply(e, s));
                  }),
                  -1 < a.indexOf(t) ? this : n
                );
              })),
            null == i.fn.select2.defaults && (i.fn.select2.defaults = t),
            r
          );
        }
      ),
      { define: u.define, require: u.require });
  function b(e, t) {
    return i.call(e, t);
  }
  function l(e, t) {
    var n,
      s,
      i,
      r,
      o,
      a,
      l,
      c,
      u,
      d,
      p = t && t.split("/"),
      h = y.map,
      f = (h && h["*"]) || {};
    if (e) {
      for (
        t = (e = e.split("/")).length - 1,
          y.nodeIdCompat && _.test(e[t]) && (e[t] = e[t].replace(_, "")),
          "." === e[0].charAt(0) &&
            p &&
            (e = p.slice(0, p.length - 1).concat(e)),
          c = 0;
        c < e.length;
        c++
      )
        "." === (d = e[c])
          ? (e.splice(c, 1), --c)
          : ".." === d &&
            (0 === c ||
              (1 === c && ".." === e[2]) ||
              ".." === e[c - 1] ||
              (0 < c && (e.splice(c - 1, 2), (c -= 2))));
      e = e.join("/");
    }
    if ((p || f) && h) {
      for (c = (n = e.split("/")).length; 0 < c; --c) {
        if (((s = n.slice(0, c).join("/")), p))
          for (u = p.length; 0 < u; --u)
            if (((i = h[p.slice(0, u).join("/")]), (i = i && i[s]))) {
              (r = i), (o = c);
              break;
            }
        if (r) break;
        !a && f && f[s] && ((a = f[s]), (l = c));
      }
      !r && a && ((r = a), (o = l)),
        r && (n.splice(0, o, r), (e = n.join("/")));
    }
    return e;
  }
  function w(t, n) {
    return function () {
      var e = a.call(arguments, 0);
      return (
        "string" != typeof e[0] && 1 === e.length && e.push(null),
        o.apply(p, e.concat([t, n]))
      );
    };
  }
  function x(e) {
    var t;
    if (
      (b(m, e) && ((t = m[e]), delete m[e], (v[e] = !0), r.apply(p, t)),
      !b(g, e) && !b(v, e))
    )
      throw new Error("No " + e);
    return g[e];
  }
  function c(e) {
    var t,
      n = e ? e.indexOf("!") : -1;
    return (
      -1 < n && ((t = e.substring(0, n)), (e = e.substring(n + 1, e.length))),
      [t, e]
    );
  }
  function A(e) {
    return e ? c(e) : [];
  }
  var u = s.require("jquery.select2");
  return (t.fn.select2.amd = s), u;
});
!(function (t) {
  "use strict";
  var e = t(window),
    n = t(document),
    o = function (o, i) {
      return t.extend({ cushion: i && n.width() > e.width() ? 30 : 10 }, o);
    },
    i = function (t, n, i, c, s) {
      var r, u, h;
      return (
        s
          ? (r =
              window.document.documentElement.clientHeight +
              e.scrollTop() -
              n.offset().top)
          : ((h = t.offset().top),
            (u = i.height() - n.height()),
            (r = h - e.scrollTop() - u)),
        r - o(c, s).cushion
      );
    };
  t.fn.maximizeSelect2Height = function (e) {
    return this.each(function (n, o) {
      var c = t(o);
      c.on("select2:open", function () {
        setTimeout(function () {
          var n = t("#select2-" + o.id + "-results"),
            s = n.parent(),
            r = s.parent(),
            u = r.hasClass("select2-dropdown--below"),
            h = i(c, n, r, e, u);
          s.css("max-height", h),
            n.css("max-height", h),
            t(document).trigger("scroll");
        });
      });
    });
  };
})(jQuery);
$(function () {
  $(document).on("click", ".user-report .icon-more", function (e) {
    const $this = $(this).closest(".user-report");
    const $tooltip = $this.find(".tooltip");
    if ($tooltip.hasClass("display")) {
      $this.find(".tooltip").removeClass("display");
      $this.css({ visibility: "", opacity: "" });
    } else {
      $this.find(".tooltip").addClass("display");
      $this.css({ visibility: "visible", opacity: "1" });
    }
  });
  $(document).on("click", ".user-report .report-action", function (e) {
    const $userReport = $(this).closest(".user-report");
    const $item = $(this).closest(".item");
    if (!confirm(window.globalLangs["_REPORT_WIDGET_CONFIRM_"])) {
      $userReport.find(".tooltip, .user-report").removeClass("display");
      $userReport.css({ visibility: "", opacity: "" });
      return false;
    }
    $.ajax({
      url: window.location.href,
      type: "POST",
      data: {
        process: "report",
        type: $item.data("type"),
        id: $item.data("id"),
        usid: $("meta[name=ig-usid]").attr("content"),
      },
      dataType: "JSON",
    }).done((response) => {
      if (response.success) {
        window.igPopin.showInfo({ message: response.message });
      } else {
        window.igPopin.showWarning({ message: response.message });
      }
    });
  });
  $(document).mouseup(function (e) {
    const $userReport = $(".user-report:visible");
    if (
      $userReport.length > 0 &&
      $userReport.get(0).contains(e.target) == false
    ) {
      $userReport.find(".tooltip, .user-report").removeClass("display");
      $userReport.css({ visibility: "", opacity: "" });
    }
  });
});
defer(function () {
  window.cookiesConsentApp = new Vue({
    name: "CookiesBanner",
    el: "#cookies-banner",
    delimiters: ["%%", "%%"],
    data() {
      return {
        visible: false,
        showCustomize: false,
        settings: { analytics: false, marketing: false },
      };
    },
    computed: {
      consentApiUrl() {
        if (window.location.host.match(/^(news|www)\.instant-gaming\.com$/)) {
          return "https://consent-api.instant-gaming.com";
        } else {
          return "https://consent-api.staging.instant-gaming.com";
        }
      },
    },
    methods: {
      show() {
        this.visible = true;
      },
      acceptAll() {
        this.settings.analytics = true;
        this.settings.marketing = true;
        this.saveSettings();
      },
      rejectAll() {
        this.settings.analytics = false;
        this.settings.marketing = false;
        this.saveSettings();
      },
      saveSettings() {
        this.visible = false;
        window.dataLayer.push({
          event: "ig_cookies_consent",
          consentMarketingCookies: this.settings.marketing
            ? "granted"
            : "denied",
          consentAnalyticsCookies: this.settings.analytics
            ? "granted"
            : "denied",
        });
        fetch(this.consentApiUrl, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          body: new URLSearchParams({
            lang: window.user.lang || "en",
            country: window.user.countryCode || "XX",
            value: JSON.stringify(this.settings),
            version: 1,
          }),
        });
      },
    },
  });
  window.askCookiesConsent = function () {
    if (window.isUAG === false) {
      window.cookiesConsentApp.show();
    }
  };
  window.igSetCookiesConsent = function (consentValue) {
    if (consentValue !== "granted" && consentValue !== "denied") {
      throw new Error("Consent value must be either granted or denied");
    }
    if (consentValue === "granted") {
      window.cookiesConsentApp.acceptAll();
    } else {
      window.cookiesConsentApp.rejectAll();
    }
    return true;
  };
});
$(function () {
  window.cart_app = new Vue({
    name: "Cart",
    el: $("#cart-app").length ? "#cart-app" : null,
    delimiters: ["%%", "%%"],
    mixins: [Mixins.usid],
    data() {
      return {
        counter: window.cartCounter,
        items: null,
        currentCartPrice: null,
        popin: { isOpened: false },
        recommendedItem: null,
        isLoading: false,
      };
    },
    computed: {
      readableCounter() {
        return this.counter > 99 ? "99+" : this.counter;
      },
      hasRecommendedItem() {
        return null !== this.recommendedItem;
      },
    },
    watch: {
      items: {
        deep: true,
        handler: function () {
          if (!$("body").hasClass("act-cartPage")) {
            this.$nextTick(() => {
              this.popin.isOpened = true;
              const $body = $("body");
              const $bubble = $("#bubbleContainer");
              if (!$body.hasClass("side-panel-open")) {
                $body.addClass("side-panel-open");
                $bubble.fadeOut();
              }
            });
          }
        },
      },
    },
    methods: {
      add(productId, isFromWishlist, callback) {
        if (this.isLoading) {
          return false;
        }
        this.isLoading = true;
        this._doCartAjax(
          {
            process: "cartAdd",
            productId: productId,
            isFromWishlist: isFromWishlist ? 1 : 0,
            hasRecommendedItem: this.hasRecommendedItem ? 1 : 0,
          },
          callback,
          "eeProductAdded"
        );
      },
      updateQuantity(product, quantity, callback) {
        if (parseInt(product.quantity) === parseInt(quantity)) {
          return false;
        }
        product.quantity = quantity;
        this._doCartAjax(
          {
            process: "cartUpdateQuantity",
            productId: product.product_id,
            quantity: quantity,
            hasRecommendedItem: this.hasRecommendedItem ? 1 : 0,
          },
          callback,
          quantity > 0 ? "eeProductAdded" : "eeProductRemoved"
        );
      },
      updatePanelItemQuantity(item, quantity = null, event = null) {
        let value = null !== quantity ? quantity : item.quantity;
        const previousValue = item.quantity;
        if (null !== event) {
          if (0 === parseInt(event.value)) {
            return false;
          }
          if ("" === event.value) {
            this.$nextTick(() => {
              const $select2 = $(".cart_product_" + item.product_id).first();
              $select2.val(item.quantity).trigger("change");
            });
            return false;
          }
          value = event.value;
        }
        this.updateQuantity(item, value, (data) => {
          if (data.success) {
            if (value === 0) {
              this.items = this.items.filter(
                (i) => i.product_id !== item.product_id
              );
            }
            this.canGoToPayment = true;
            if (data.recommendedItem) {
              this.recommendedItem = data.recommendedItem;
            }
            if (null !== event) {
              event.continue();
            }
          } else if ("currentQuantity" in data) {
            item.quantity = data.currentQuantity;
            if (null !== event) {
              event.revert();
            }
          } else {
            item.quantity = previousValue;
          }
          this.isLoading = false;
        });
      },
      deletePanelItem(item) {
        this.updatePanelItemQuantity(item, 0);
      },
      moveToWishlist(productId, callback) {
        this._doCartAjax(
          { process: "cartMoveToWishlist", productId: productId },
          callback,
          "eeProductRemoved"
        );
      },
      _doCartAjax(postData, callback, trackingEventName) {
        postData.usid = this.getUsid();
        return $.ajax({
          type: "POST",
          url: window.location.href,
          data: postData,
          dataType: "json",
          success: (data) => {
            if (data.success) {
              this.counter = data.counter;
              this.currentCartPrice = data.currentCartPrice;
              this.items = data.items;
              if (null !== data.recommendedItem) {
                this.recommendedItem = data.recommendedItem;
              }
              if (trackingEventName) {
                let productToTrack = this._buildTrackingProduct(
                  data.item.product,
                  data.item.quantity
                );
                this.trackCartEvent(productToTrack, trackingEventName);
              }
            } else if (data.error) {
              let options = { message: data.error };
              if (data.errorTitle) {
                options.title = data.errorTitle;
              }
              window.igPopin.showWarning(options);
            } else {
              window.igPopin.showWarning({
                message: window.globalLangs["_ERROR_OCCURRED_"],
              });
            }
            if (callback) {
              callback(data);
            }
          },
        });
      },
      hidePopin() {
        this.popin.isOpened = false;
        const $body = $("body");
        if ($body.hasClass("side-panel-open")) {
          $body.removeClass("side-panel-open");
        }
      },
      trackCartEvent(product, eventName, callback) {
        let _this = this;
        if (!window.google_tag_manager || !product) {
          if (callback) {
            callback.call(_this);
          }
          return true;
        }
        if (this.items) {
          let totalCurrencyValue = 0.0;
          let totalEuroValue = 0.0;
          let ga4CartItems = this.items.map((item) =>
            this._buildGA4Product(item.product, item.quantity)
          );
          ga4CartItems.forEach((cartItem) => {
            totalCurrencyValue +=
              parseFloat(cartItem.price) * cartItem.quantity;
            totalEuroValue +=
              parseFloat(cartItem.price_eur) * cartItem.quantity;
          });
          window.dataLayer.push({
            event: "cartChanged",
            ecommerce: {
              cart: {
                items: ga4CartItems,
                totalPrice: totalCurrencyValue.toFixed(2),
                totalPriceEuro: totalEuroValue.toFixed(2),
              },
            },
          });
        }
        let dlproducts = [product];
        let ga4Products = [];
        let deltaCurrencyValue = 0.0;
        let deltaEuroValue = 0.0;
        dlproducts.forEach((product) => {
          ga4Products.push({
            item_name: product.name,
            item_id: product.id,
            price: product.price_currency,
            price_eur: product.price,
            item_category: product.category,
            quantity: product.quantity,
            currency: window.user.currency.label,
          });
          deltaCurrencyValue +=
            parseFloat(product.price_currency) * product.quantity;
          deltaEuroValue += parseFloat(product.price) * product.quantity;
        });
        window.dataLayer.push({
          event: eventName,
          ecommerce: {
            currencyCode: window.user.currency.label,
            add: { products: dlproducts },
            items: ga4Products,
            totalCurrencyValue: parseFloat(deltaCurrencyValue).toFixed(2),
            totalEuroValue: parseFloat(deltaEuroValue).toFixed(2),
            itemsValue: parseFloat(deltaCurrencyValue).toFixed(2),
            itemsValueEuro: parseFloat(deltaEuroValue).toFixed(2),
          },
          eventCallback: function (containerId) {
            if (containerId && containerId.indexOf("GTM-") !== 0) return;
            if (callback) {
              callback.call(_this);
            }
          },
          eventTimeout: 1000,
        });
        return false;
      },
      _buildTrackingProduct(item, quantity) {
        return {
          id: item.prod_id,
          name: item.name,
          price: this.$options.filters.currency_convert(item.price, false),
          price_currency: this.$options.filters.currency_convert(
            item.price,
            false
          ),
          category: item.type,
          quantity: quantity || 1,
        };
      },
      addRecommendedProduct(item) {
        this.add(
          item.prod_id,
          false,
          (data) => {
            this.isLoading = false;
            if (data.success) {
              this.recommendedItem = null;
            }
          },
          item
        );
      },
      _buildGA4Product(item, quantity) {
        return {
          item_name: item.name,
          item_id: item.prod_id,
          price: this.$options.filters.currency_convert(item.price, false),
          price_eur: item.price,
          item_category: item.type,
          quantity: quantity,
          currency: window.user.currency.label,
        };
      },
    },
    mounted() {
      $(document).on("click", (event) => {
        const $target = $(event.target);
        if (
          !$target.closest(".cart-content").length &&
          this.popin.isOpened &&
          !this.isLoading
        ) {
          this.hidePopin();
        }
      });
    },
  });
});
$(document).ready(function () {
  $(".geo-selected").click(function () {
    $.fancybox.open({
      src: "#languages-footer",
      animationDuration: 0,
      touch: false,
      autoFocus: false,
    });
  });
});
$(function () {
  const $nav = $(".top-marker"),
    $loginContainer = $(".login-container"),
    $body = $("body");
  let $header = $(".parallax");
  $header.ready(function () {
    $header = $(".parallax");
    $(document).scroll(function () {
      $header
        .css("top", $(window).scrollTop() / 4 + "px")
        .css("bottom", "-" + $(window).scrollTop() / 4 + "px");
      $body.toggleClass("scrolled", $(window).scrollTop() > $nav.height());
    });
  });
  headerHeightCallback = function () {
    const $burgerMenu = $loginContainer.find(".panel ul"),
      scrollTop = $(window).scrollTop();
    if (
      $burgerMenu.length > 0 &&
      $burgerMenu.outerHeight() + $burgerMenu.offset().top - scrollTop >
        window.innerHeight
    ) {
      $burgerMenu
        .css(
          "height",
          window.innerHeight - $burgerMenu.offset().top + scrollTop - 30
        )
        .css("overflow", "auto");
    }
  };
  const resetHeaderHeight = function () {
    $loginContainer
      .find(".panel ul")
      .css("height", "auto")
      .css("overflow", "initial");
  };
  $(window).resize(function () {
    resetHeaderHeight();
    setTimeout(headerHeightCallback, 100);
  });
  if ($(window).scrollTop() > $nav.height()) {
    $body.addClass("scrolled");
  }
  $loginContainer.click(function (e) {
    const target = e.target;
    const isBurgerIcon = target.classList.contains("burger");
    if (
      ("A" === target.nodeName && !isBurgerIcon) ||
      $(target).closest("a").length > 0
    ) {
      closeLoginMenu();
      return;
    }
    if ("A" !== target.nodeName || isBurgerIcon) {
      e.preventDefault();
    }
    $(this).toggleClass("active");
    headerHeightCallback();
  });
  const closeLoginMenu = function () {
    const $activeLoginContainer = $(".login-container.active");
    if (0 === $activeLoginContainer.length) {
      return;
    }
    $activeLoginContainer.removeClass("active");
    $activeLoginContainer.removeClass("back");
    resetHeaderHeight();
  };
  $loginContainer.mouseleave(function () {
    if (window.isMobile) {
      return;
    }
    closeLoginMenu();
  });
  const $regionSelect = $(".region-select");
  if ($regionSelect.length) {
    $body.addClass("region");
    $(".footer-container").after('<div class="region-spacer"></div>');
    $(".region-spacer").css("height", $regionSelect.outerHeight());
  }
  if ($body.hasClass("neon")) {
    $(".neon-toggle").addClass("checked");
  } else {
    $(".neon-toggle").removeClass("checked");
  }
  $(".switch-theme").click(function () {
    $body.toggleClass("neon");
    $(".neon-toggle").toggleClass("checked");
    if ($body.hasClass("neon")) {
      $.ajax({
        url: window.location.href,
        type: "POST",
        data: {
          process: "set-cookie-neon",
          usid: $("meta[name=ig-usid]").attr("content"),
        },
        dataType: "JSON",
      });
    } else {
      $.ajax({
        url: window.location.href,
        type: "POST",
        data: {
          process: "remove-cookie-neon",
          usid: $("meta[name=ig-usid]").attr("content"),
        },
        dataType: "JSON",
      });
    }
    return false;
  });
  $(document)
    .on(
      "click",
      "#partner-menu-qrcode, #affiliation-link .icon-qrcode",
      function (event) {
        event.preventDefault();
        const $this = $(this);
        $.fancybox.open({
          src: "#qrcode-share",
          baseClass: "fancybox-popin",
          animationDuration: 0,
          touch: false,
          autoFocus: false,
          afterLoad: () => {
            let affiliateLink = null;
            if (undefined !== $this.data("link")) {
              affiliateLink = $this.data("link");
            }
            window.qrcode_share.generateQrcode(affiliateLink);
          },
        });
      }
    )
    .on("click", "#qrcode-share .icon-copy", function () {
      const $this = $(this);
      let link = $this.prev();
      link.addClass("copied");
      navigator.clipboard.writeText($this.data("url"));
      setTimeout(function () {
        link.removeClass("copied");
      }, 500);
    });
  if ($body.hasClass("no-autoplay")) {
    $(".autoplay-toggle").removeClass("checked");
  } else {
    $(".autoplay-toggle").addClass("checked");
  }
  $(".autoplay-videos").click(function () {
    $body.toggleClass("no-autoplay");
    $(".autoplay-toggle").toggleClass("checked");
    if ($body.hasClass("no-autoplay")) {
      $.cookie("no_autoplay", 1, { path: "/", expires: 365 });
    } else {
      $.removeCookie("no_autoplay", { path: "/" });
    }
    return false;
  });
  $("body:not(.no-autoplay) .listing-items .cover").on(
    "mouseenter",
    function () {
      $(this).removeAttr("title");
    }
  );
});
var loginError = 0;
var isSubmitting = false;
function handleSuccessfullLogin(response) {
  if (window.after_signup_url) {
    let url = new URL(window.after_signup_url);
    if (response.sso_token) {
      url.searchParams.set("sso_token", response.sso_token);
    }
    window.location = url.toString();
  } else if (window.after_signup_callback) {
    window.after_signup_callback(response);
  } else {
    window.location.reload();
  }
}
$(function () {
  if (window.show2FA) {
    setLoginFieldsRequiredProperty(false);
    displayTwoFactorField();
  }
  $("#loginbox-register .manual").click(function () {
    $(".already").toggleClass("inactive");
    $(".login-button").toggleClass("inactive");
    $(".create").toggleClass("active");
    if ($(".create").hasClass("active")) {
      $(".create .selectable2.manual").each(function () {
        initSelect2($(this));
      });
    }
    $(".wallpaper").toggleClass("inactive");
    $(".register").toggleClass("wide");
  });
  $(document)
    .on("focus", ".ig-login-email", function () {
      if (!this.has_type) this.value = "";
    })
    .on("blur", ".ig-login-email", function () {
      if (!this.value) this.value = "Email";
      else this.has_type = true;
    });
  $(document)
    .on("focus", ".ig-login-pass", function () {
      if (!this.has_type) this.value = "";
    })
    .on("blur", ".ig-login-pass", function () {
      if (this.value) {
        this.has_type = true;
      }
    });
  $(document).on(
    "keyup",
    "#loginbox-register .ig-login-email,#loginbox-register .ig-login-pass",
    function () {
      var $form = $(this).closest(".ig-loginbox-wrapper");
      if (
        $form.find(".ig-login-email").val() != "" &&
        $form.find(".ig-login-email").val() != "Email" &&
        $form.find(".ig-login-pass").val().length > 4 &&
        $form.find(".ig-login-pass").val() != "*********"
      ) {
        $("#ig-productbuy-login .ig-login-input-ok").addClass("validated");
      } else {
        $("#ig-productbuy-login .ig-login-input-ok").removeClass("validated");
      }
    }
  );
  $(".ig-logout-submit").click(function () {
    $("#ig-logout-form").submit();
    return false;
  });
  $(document).on("click", "#register-manual", function () {
    if (!$(".ajax-register").length) {
      $.fancybox.close();
      return false;
    }
    if (isMobileResolution()) {
      let $fancybox = $(".fancybox-inner");
      $fancybox.animate({ scrollTop: $fancybox.height() }, 700);
    }
    return false;
  });
  $(document).on("click", "#loginbox-register .signin-btn-fb", function () {
    const postUrl = $(this).attr("href");
    registerWithFacebook(postUrl, function (response) {
      trackLogin("facebook login", response.is_new_user, function () {
        handleSuccessfullLogin(response);
      });
    });
    return false;
  });
  $(document).on("keyup", "#two-factor-auth-code", function (e) {
    if (/^[0-9]$/i.test(e.key) && this.value.length >= 6) {
      $("#login-submit-2fa").click();
    }
  });
  $(document).on("click", "#two-factor-auth-back", function () {
    $(".already").toggleClass("inactive");
    $(".two-factor-auth").toggleClass("active");
    $(".wallpaper").toggleClass("inactive");
    $("#two-factor-auth-code").removeAttr("required").val("");
    setLoginFieldsRequiredProperty(true);
    resetRecaptcha();
  });
  $(document).on("click", "#loginbox-register .signin-btn-google", function () {
    var postUrl = $(this).attr("href");
    registerWithGoogle(postUrl, function (response) {
      trackLogin("google login", response.is_new_user, function () {
        handleSuccessfullLogin(response);
      });
    });
    return false;
  });
  function handleAppleSignInAjaxResponse(data) {
    if (data.need_email) {
      let email = prompt(data.need_email);
      if (email) {
        $.ajax({
          url: "/" + $("html").attr("lang") + "/sign-in/apple/",
          method: "POST",
          data: {
            confirm_email: email,
            usid: $("meta[name=ig-usid]").attr("content"),
          },
          dataType: "json",
          success: handleAppleSignInAjaxResponse,
        });
      }
    } else if ("two-factor auth" === data.redirect) {
      setLoginFieldsRequiredProperty(false);
      displayTwoFactorField();
    } else if (data.success && data.isAuthenticated) {
      trackLogin("Apple", data.isRegistered, function () {
        handleSuccessfullLogin(data);
      });
    } else if (!data.success) {
      window.igPopin.showWarning({ message: data.error });
    }
  }
  document.addEventListener("AppleIDSignInOnSuccess", (data) => {
    $.ajax({
      url: "/" + $("html").attr("lang") + "/sign-in/apple/",
      method: "POST",
      data: {
        usid: $("meta[name=ig-usid]").attr("content"),
        code: data.detail.authorization.code,
        state: data.detail.authorization.state,
        firstname:
          "user" in data.detail && "name" in data.detail.user
            ? data.detail.user.name.firstName
            : null,
        lastname:
          "user" in data.detail && "name" in data.detail.user
            ? data.detail.user.name.lastName
            : null,
      },
      dataType: "json",
      success: handleAppleSignInAjaxResponse,
    });
  });
  document.addEventListener("AppleIDSignInOnFailure", (error) => {
    if (window.console) {
      console.log("ERROR", error);
    }
  });
  $(document).on("click", "#loginbox-register .signin-btn-apple", function () {
    if (
      window.isIOS &&
      (window.isUAGIGNews || (window.isUAGIG && checkMobileAppVersion(11)))
    ) {
      postMessageToAppHandler({ type: "login_apple", data: {} });
    } else {
      AppleID.auth.signIn().catch(function (error) {
        console.log("ERROR", error);
      });
    }
    return false;
  });
  $(document).on(
    "click",
    "#loginbox-register .signin-btn-discord",
    function () {
      window.location =
        "/user/connect/discord?guest=1&redirect=" + $(this).data("redirect");
      return false;
    }
  );
  $("#ig-register-terms-input").click(function () {
    $submitButton = $("#ig-register-button");
    if ($("#ig-register-terms-input").is(":checked")) {
      $submitButton.removeClass("disabled");
      $submitButton.prop("disabled", false);
    } else {
      $submitButton.addClass("disabled");
      $submitButton.prop("disabled", true);
    }
  });
  $("#ig-consent-form").submit(function () {
    $.ajax({
      url: $(this).attr("action"),
      method: "POST",
      data: $(this).serialize(),
      dataType: "json",
      success: function () {
        $.fancybox.close();
      },
    });
    return false;
  });
  if ($(".ig-login-links").length > 0) {
    $(".ig-loginbox-wrapper,.ig-login-content").mouseover(function () {
      $(".ig-loginbox-wrapper,.ig-login-content").unbind("mouseover");
    });
  }
});
function trackLogin(login_option, is_new_user, callback) {
  if (window.google_tag_manager) {
    dataLayer.push({
      event: is_new_user ? "eeSignup" : "eeLogin",
      method: login_option,
      eventCallback: function (containerId) {
        if (containerId && containerId.indexOf("GTM-") !== 0) return;
        if (typeof callback == "function") {
          callback();
        }
      },
      eventTimeout: 1000,
    });
  } else if (callback && typeof callback == "function") {
    callback();
  }
}
function loginSubmit(formName = null) {
  let $form = $("form.ig-login-form");
  if ("2fa" === formName) {
    if (isSubmitting) {
      return;
    }
    $form = $("form.ig-2fa-form");
  }
  if (!$form.get(0).checkValidity || $form.get(0).checkValidity()) {
    if (window.bxgraph && window.bxgraph.IDs) {
      $('<input type="hidden" name="did" />')
        .val(window.bxgraph.IDs.deviceID)
        .appendTo($form);
    }
    if (navigator.plugins) {
      var pluginsdata = $.map(
        navigator.plugins,
        function (p) {
          var mimeTypes = $.map(p, function (mt) {
            return [mt.type, mt.suffixes].join("~");
          }).join(",");
          return [p.name, p.description, mimeTypes].join("::");
        },
        this
      ).join(";");
      $('<input type="hidden" name="pluginsdata" />')
        .val(pluginsdata)
        .appendTo($form);
    }
    isSubmitting = true;
    $.ajax({
      url: $form.attr("action"),
      method: "POST",
      data: $form.serialize(),
      dataType: "JSON",
      success: function (response) {
        if (!response.success && response.csrf_error) {
          window.igPopin.showWarning({
            message:
              "Unexpected error, please retry or contact the customer support",
            onClose: function () {
              window.location.reload();
            },
          });
          return false;
        }
        if (response.error) {
          window.igPopin.showWarning({
            message: response.error,
            onClose: function () {
              if ("type" in response && "mobile" === response.type) {
                window.location.reload();
              }
            },
          });
          resetRecaptcha();
        } else if ("two-factor auth" === response.redirect) {
          displayTwoFactorField();
          $("form.ig-2fa-form input[name=email]").val(
            $("form.ig-login-form input[name=email]").val()
          );
          $("form.ig-2fa-form input[name=password]").val(
            $("form.ig-login-form input[name=password]").val()
          );
          isSubmitting = false;
        } else {
          if (response.usid) {
            $("meta[name=ig-usid]").attr("content", response.usid);
          }
          trackLogin("Email", false, function () {
            handleSuccessfullLogin(response);
          });
        }
      },
      error: function (xhr, errorstr) {
        resetRecaptcha();
        if (!$("body.is-env-dev").length) {
          const rollbarCallback = function () {
            const formData = new FormData($form[0]);
            formData.delete("password");
            Rollbar.info(
              new Error("Cannot authenticate user"),
              {
                data: Array.from(formData.entries()),
                response: xhr.responseText,
              },
              function () {
                if (errorstr == "parsererror" && xhr.status == 200) {
                  window.igPopin.showWarning({
                    message:
                      "Unexpected error, please retry or contact the customer support",
                    onClose: function () {
                      window.location.reload();
                    },
                  });
                }
              }
            );
          };
          if (typeof Rollbar === "undefined") {
            const rollbarConfig = { canCapture: false };
            $.getScript("/themes/igv2/js/rollbar.js").done(rollbarCallback);
          } else {
            rollbarCallback();
          }
        } else {
          alert("Error when parsing the AJAX response, see console errors");
          console.error(
            new Error(
              "Error when parsing the AJAX user authentication response"
            ),
            xhr
          );
        }
      },
    });
    return false;
  }
  resetRecaptcha();
  return false;
}
let isAuthInit = false;
function onRecaptchaCallback() {
  isAuthInit = true;
  const siteKey = "6LcAtSoUAAAAAPGaTTvQstuQa4RwcuPVYMdNUxt6";
  $("#login-submit").data(
    "recaptcha-id",
    grecaptcha.render("login-submit", {
      sitekey: siteKey,
      callback: loginSubmit,
    })
  );
  $("#ajax-register-btn").data(
    "recaptcha-id",
    grecaptcha.render("ajax-register-btn", {
      sitekey: siteKey,
      callback: registerFormSubmit,
    })
  );
}
function showRegister(after_signup_action, modal, additional_params) {
  loadAppleIdScript();
  loadFbSdk();
  loadFbAnalytics();
  if (!window.grecaptcha && $("button.g-recaptcha").length > 0) {
    $.getScript(
      "https://www.google.com/recaptcha/api.js?onload=onRecaptchaCallback&render=explicit"
    );
  } else if (
    window.grecaptcha &&
    $("button.g-recaptcha").length > 0 &&
    !isAuthInit
  ) {
    onRecaptchaCallback();
  }
  if (typeof after_signup_action == "function") {
    window.after_signup_callback = after_signup_action;
  } else {
    window.after_signup_url = after_signup_action;
  }
  if ($("#loginbox-register").length > 0) {
    $("#loginbox-register").data(
      "gtmtracking",
      additional_params && additional_params.gtm_tracking ? true : null
    );
    $("#ig-loginbox-contactdetails").toggle(
      additional_params && additional_params.contact == 1 ? true : false
    );
    $(".loginbox-register").addClass("open");
    let beforeClose = null;
    if (
      !window.user.isAuthenticated &&
      additional_params &&
      "closeRedirection" in additional_params
    ) {
      beforeClose = function () {
        window.location = additional_params.closeRedirection;
        return false;
      };
    }
    let options = {
      src: "#loginbox-register",
      animationDuration: 0,
      touch: false,
      autoFocus: false,
      beforeClose: beforeClose,
      baseClass: "fancybox-login",
      afterClose() {
        const $registerContainer = $(".register");
        if ($registerContainer.hasClass("wide")) {
          $(".already").toggleClass("inactive");
          $(".create").toggleClass("active");
          $(".wallpaper").toggleClass("inactive");
          $registerContainer.removeClass("wide");
        }
      },
    };
    if (true == modal) {
      options["buttons"] = [];
      options["modal"] = true;
    }
    $.fancybox.open(options);
  } else {
    alert("Fix login box, this case should not appear anymore");
  }
  return false;
}
function registerWithFacebook(postUrl, callback) {
  if (window.isUAG) {
    postMessageToAppHandler({ type: "login_facebook", data: {} });
  }
  if (!window.FB) {
    window.igPopin.showWarning({
      message:
        "You have an extension that prevents Facebook Javascript from running. If you want to use Facebook connect, please disable this extension (Adblock, ABP or Firefox too strong privacy settings...).",
    });
    return false;
  }
  FB.login(
    function (response) {
      if (response.authResponse) {
        let user = {
          action: "register",
          process: "registerFromFacebook",
          usid: $("meta[name=ig-usid]").attr("content"),
        };
        user.did =
          window.bxgraph && window.bxgraph.info
            ? window.bxgraph.info.tor
              ? "TOR"
              : window.bxgraph.IDs.deviceID
            : null;
        $.ajax({
          url: postUrl,
          method: "POST",
          data: user,
          dataType: "json",
          success: function (response) {
            if (response.need_email) {
              var email = prompt(response.need_email);
              if (email) {
                $.ajax({
                  url: postUrl,
                  method: "POST",
                  data: {
                    action: "register",
                    process: "registerFromFacebook",
                    confirm_email: email,
                    country: user.country,
                    city: user.city,
                    did: user.did,
                    usid: $("meta[name=ig-usid]").attr("content"),
                  },
                  dataType: "json",
                  success: function (response_step2) {
                    if (response_step2.error) {
                      window.igPopin.showWarning({
                        message: response_step2.error,
                      });
                      return false;
                    } else {
                      trackLogin("Facebook", response_step2.is_new_user);
                      callback(response_step2);
                    }
                  },
                });
              }
            } else if (response.error) {
              window.igPopin.showWarning({ message: response.error });
              return false;
            } else if ("two-factor auth" === response.redirect) {
              setLoginFieldsRequiredProperty(false);
              displayTwoFactorField();
            } else {
              trackLogin("Facebook", response.is_new_user);
              callback(response);
            }
          },
        });
      }
    },
    { scope: "email,user_location,user_birthday" }
  );
  return false;
}
function isMobileResolution() {
  return window.innerWidth <= 800;
}
function initGSI() {
  window.gsi = google.accounts.oauth2.initTokenClient({
    client_id: $('meta[name="google-signin-clientid"]').attr("content"),
    scope: "openid profile email",
    ux_mode: "popup",
    callback: function (response) {
      if (response && response.access_token) {
        $.ajax({
          url: window.gsi.IgParams.postUrl,
          method: "POST",
          data: {
            action: "register",
            process: "registerFromGoogle",
            access_token: response.access_token,
            did:
              window.bxgraph && window.bxgraph.info
                ? window.bxgraph.info.tor
                  ? "TOR"
                  : window.bxgraph.IDs.deviceID
                : null,
            usid: $("meta[name=ig-usid]").attr("content"),
          },
          dataType: "json",
          success: function (response) {
            if (response.error) {
              window.igPopin.showWarning({ message: response.error });
            } else if ("two-factor auth" === response.redirect) {
              setLoginFieldsRequiredProperty(false);
              displayTwoFactorField();
            } else {
              trackLogin("Google", response.is_new_user);
              window.gsi.IgParams.callback(response);
            }
          },
        });
      }
    },
  });
}
function registerWithGoogle(postUrl, callback) {
  if (window.isUAG) {
    postMessageToAppHandler({ type: "login_google", data: {} });
    return true;
  }
  if (!window.gsi) {
    window.igPopin.showWarning({ message: window.langs.signInError });
    return false;
  }
  window.gsi.IgParams = { postUrl: postUrl, callback: callback };
  window.gsi.requestAccessToken();
}
function loadAppleIdScript() {
  if (
    document.getElementById("appleid.js") == null &&
    !window.AppleID &&
    window.IG_APPLE_INIT
  ) {
    window.IG_APPLE_INIT.nonce = $("meta[name=ig-usid]").attr("content");
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.setAttribute("id", "appleid.js");
    document.getElementsByTagName("head")[0].appendChild(script);
    script.addEventListener("load", function () {
      AppleID.auth.init(window.IG_APPLE_INIT);
    });
    script.src =
      "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.async = true;
  }
}
function loadFbAnalytics() {
  if (document.getElementById("fba.js") == null && !window.fba) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.setAttribute("id", "fba.js");
    let xl = $("meta[name=ig-usid]")
      .attr("content")
      .replace(/[a-z]/gi, (letter) =>
        String.fromCharCode(
          letter.charCodeAt(0) - 32 + (letter.toLowerCase() <= "m" ? 13 : -13)
        )
      );
    let url =
      "https://" +
      window.location.hostname.split(".")[0] +
      ".fb-analytics.com/";
    url += "?xl=" + xl;
    if (navigator.webdriver) {
      url += "&xd=1";
    }
    script.src = url;
    script.async = true;
    document.getElementsByTagName("head")[0].appendChild(script);
  }
}
function showBlackBubble(text) {
  const $body = $("body");
  let $bubbleContainer = $("#bubbleContainer");
  if (
    $bubbleContainer.length === 0 &&
    $(".region-select.bottom-select").length === 0 &&
    !$body.hasClass("side-panel-open")
  ) {
    $bubbleContainer = $('<div id="bubbleContainer">').appendTo("body");
  }
  const $bubble = $('<div class="bubble" style="display: none">')
    .html(text)
    .appendTo($bubbleContainer)
    .fadeIn();
  setTimeout(function () {
    $bubble.fadeOut();
  }, 10000);
}
function postMessageToAppHandler(message) {
  if (
    window.webkit &&
    window.webkit.messageHandlers &&
    window.webkit.messageHandlers.IGABridge
  ) {
    window.webkit.messageHandlers.IGABridge.postMessage(message);
  } else if (window.IGABridge !== undefined) {
    window.IGABridge.sendMessage(JSON.stringify(message));
  }
}
function resetRecaptcha() {
  if (typeof grecaptcha != "undefined") {
    grecaptcha.reset($("#login-submit").data("recaptcha-id"));
  }
}
function displayTwoFactorField() {
  $(".already").toggleClass("inactive");
  $(".two-factor-auth").toggleClass("active");
  $("#two-factor-auth-code").attr("required", "").focus();
}
function setLoginFieldsRequiredProperty(value) {
  $("#login-email").prop("required", value);
  $("#login-password").prop("required", value);
}
function checkMobileAppVersion(requiredVersion, showPopup = true) {
  const uagMajorVersion = navigator.userAgent
    ? parseInt(navigator.userAgent.match(/(\d+)(\.\d+)+/)[1])
    : 0;
  if (uagMajorVersion < requiredVersion) {
    if (showPopup) {
      window.igPopin.showWarning({
        message: window.langs.uagUpdateAppleSignIn,
        onClose: function (a, b, event) {
          if ($(event.target).hasClass("button")) {
            window.location = window.isIOS
              ? "itms-apps://itunes.apple.com/app/id1199040135"
              : "market://details?id=com.instantgaming.android";
          }
        },
      });
    }
    return false;
  }
  return true;
}
/*!
 * jQuery OAuth via popup window plugin
 *
 * @author  Nobu Funaki @nobuf
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
(function ($) {
  $.oauthpopup = function (options) {
    if (!options || !options.path) {
      throw new Error("options.path must not be empty");
    }
    options = $.extend(
      {
        windowName: "ConnectWithOAuth",
        windowOptions: "location=0,status=0,width=800,height=400",
        callback: function () {
          window.location.reload();
        },
      },
      options
    );
    var oauthWindow = window.open(
      options.path,
      options.windowName,
      options.windowOptions
    );
    if (oauthWindow) {
      var oauthInterval = window.setInterval(function () {
        if (oauthWindow.closed) {
          window.clearInterval(oauthInterval);
          options.callback();
        }
      }, 1000);
    }
  };
  $.fn.oauthpopup = function (options) {
    $this = $(this);
    $this.click($.oauthpopup.bind(this, options));
  };
})(jQuery);
(function ($) {
  $.fn.pulse = function (options) {
    var options = $.extend({ times: 3, duration: 1000 }, options);
    var period = function (callback) {
      $(this).animate({ opacity: 0 }, options.duration, function () {
        $(this).animate({ opacity: 1 }, options.duration, callback);
      });
    };
    return this.each(function () {
      var i = +options.times,
        self = this,
        repeat = function () {
          --i && period.call(self, repeat);
        };
      period.call(this, repeat);
    });
  };
})(jQuery);
if (typeof String.prototype.trim !== "function") {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  };
}
$(function () {
  $(document).on("click", ".ig-show-loginbox", function () {
    var additional_params = null;
    if ($(this).hasClass("ig-contact-btn")) additional_params = { contact: 1 };
    var href =
      $(this).attr("href") && $(this).attr("href") != "#"
        ? $(this).attr("href")
        : null;
    showRegister(href, false, additional_params);
    return false;
  });
  if (
    window.document.referrer &&
    window.document.referrer != window.location.href
  )
    $("#ig-responsive-back").addClass("show");
  $("#footer-email").text(
    $("#footer-email").text().split("@").reverse().join("@")
  );
  $(".fancybox, .ig-fancybox").fancybox();
});
if (window.console) {
  console.log("%cWarning!", "color: red; font-size: x-large");
  console.log(
    "%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to get free games or discount, it is a scam and may give them access to your account.",
    "font-size: large"
  );
}
var registerError = 0;
$(document).ready(function () {
  $("#ig-birthdate").blur(checkBirthdate);
  $("#ig-register-form").on("change", function () {
    let canSubmitRegisterForm = true;
    $(
      "#ig-email, #ig-firstname, #ig-lastname, #ig-country, #ig-birthdate, #ig-pass"
    ).each(function () {
      if (false === checkEmpty(this, false)) {
        canSubmitRegisterForm = false;
        return false;
      }
    });
    checkBirthdate();
    if (
      false === $("#ig-register-terms-input").is(":checked") ||
      ($("input[name=isBelowSixteen]").length > 0 &&
        $("input[name=parental_agreement]").is(":not(:checked)"))
    ) {
      canSubmitRegisterForm = false;
    }
    $("#ajax-register-btn").toggleClass(
      "disabled",
      canSubmitRegisterForm === false
    );
  });
  $("#ig-register-terms-input").on("click", function () {
    if ($("#message-agreement").is(":visible")) {
      $("#message-agreement").hide();
      $("#ig-register-message").hide();
      registerError = 0;
      return true;
    }
  });
  $("#ig-register-parents-input").on("click", function () {
    if ($("#message-parents").is(":visible")) {
      $("#message-parents").hide();
      $("#ig-register-message").hide();
      registerError = 0;
      return true;
    }
  });
  $("#ig-birthdate")
    .keydown(function (e) {
      if (
        typeof e.key != "undefined" &&
        e.key.length == 1 &&
        !/[0-9]|\//.test(e.key)
      )
        return false;
      if (this.value.match(/\/$/) && e.key == "/") return false;
      if (
        typeof e.key != "undefined" &&
        e.key.length == 1 &&
        this.value.length >= 10
      )
        return false;
      return true;
    })
    .keyup(function (e) {
      if (
        typeof e.key != "undefined" &&
        e.key.length == 1 &&
        (this.value.length == 2 || this.value.length == 5)
      )
        this.value += "/";
      return true;
    });
  $(
    "#ig-lostpassword-post-new input[type=password], .account input[type=password], .inputs input[type=password]"
  ).hideShowPassword(false, true, {
    wrapper: {
      element: "<div>",
      className: "hide-show-password-wrapper",
      enforceWidth: false,
    },
    toggle: {
      element: '<button type="button">',
      className: "hide-show-password-toggle",
      touchStyles: { pointerEvents: "none" },
      position: "infer",
      verticalAlign: "middle",
      offset: 0,
      attr: {
        role: "button",
        "aria-label": "Show Password",
        title: "Show Password",
        tabIndex: 0,
      },
    },
  });
  $("#ig-newpassword-form").submit(function () {
    return validateNewPassword();
  });
});
function registerFormSubmit() {
  const $errorContainer = $("#ig-register-error-container");
  $errorContainer.slideUp();
  $("#ig-firstname,#ig-lastname,#ig-country,#ig-birthdate").each(function () {
    checkEmpty(this);
  });
  validateEmail();
  validatePass();
  checkBirthdate();
  if ($("input[name=agreement]").is(":not(:checked)")) {
    registerError = 1;
    $("#message-agreement").show();
    $("#ig-register-message").show();
  }
  if (
    $("input[name=parental_agreement]").is(":not(:checked)") &&
    $("input[name=isBelowSixteen]").length > 0
  ) {
    registerError = 1;
    $("#message-parents").show();
    $("#ig-register-message").show();
  }
  const $form = $("#ig-register-form"),
    isAjaxResponse = $form.find("input[name=is_ajax_response]").val() == "1";
  if (
    registerError == 0 &&
    (isAjaxResponse || $("#ig-register-once").val() == "")
  ) {
    if (!isAjaxResponse) {
      $("#ig-register-once").val("1");
    }
    $("#ig-register-post input[name=did]").val(
      window.bxgraph && window.bxgraph.info
        ? window.bxgraph.info.tor
          ? "TOR"
          : window.bxgraph.IDs && window.bxgraph.IDs.deviceID
          ? window.bxgraph.IDs.deviceID
          : null
        : null
    );
    if (isAjaxResponse) {
      $.ajax({
        method: "POST",
        url: $form.attr("action"),
        data: $form.serialize(),
        dataType: "json",
        success: function (data) {
          if ("success" in data) {
            if (data.success) {
              window.location = data.redirectionUrl;
            } else {
              $errorContainer.text(data.errorMessage);
              $errorContainer.slideDown();
            }
          } else {
            alert(
              "An unknown error has occurred, please retry or contact the support"
            );
          }
          if (typeof grecaptcha != "undefined") {
            grecaptcha.reset($("#ajax-register-btn").data("recaptcha-id"));
          }
        },
      });
    } else {
      $form.submit();
    }
  } else {
    if (typeof grecaptcha != "undefined") {
      grecaptcha.reset($("#ajax-register-btn").data("recaptcha-id"));
    }
    registerError = 0;
    return false;
  }
  registerError = 0;
}
function checkEmpty(elem, canDisplayMessage = true) {
  if (
    $(elem).val() == "" ||
    (this.checkValidity && this.checkValidity() == false)
  ) {
    if (canDisplayMessage) {
      registerError = $(elem).attr("name");
      $("#message-" + $(elem).attr("name")).show();
      $("#ig-register-message").show();
    }
    return false;
  } else {
    if (canDisplayMessage) {
      $("#message-" + $(elem).attr("name")).hide();
      if (registerError == 0 || registerError == $(elem).attr("name")) {
        $("#ig-register-message").hide();
        registerError = 0;
      }
    }
    return true;
  }
}
function validateEmail() {
  var filter =
    /^[a-zA-Z0-9]+[a-zA-Z0-9_.+-]*@[a-zA-Z0-9]+([a-zA-Z0-9.-]+[a-zA-Z0-9]+)?\.[a-zA-Z]{2,}$/;
  var typofilter =
    /\.(co[^m]|c[^o]m|com.|ccom|cmp|cin|fe|fre|dw|ft|itc|comar|coim|ti|ocm|cok|xat|conm|copm|con|fe|cpm|vom)$/;
  if (
    filter.test($("#ig-email").val()) &&
    typofilter.test($("#ig-email").val()) == false
  ) {
    $("#message-email").hide();
    if (registerError == 0 || registerError == 1) {
      $("#ig-register-message").hide();
      registerError = 0;
    }
    return true;
  } else {
    registerError = 1;
    $("#message-email").show();
    $("#ig-register-message").show();
    return false;
  }
}
function validatePass() {
  if ($("#ig-pass").val().length < 6) {
    registerError = 3;
    $("#message-pass").show();
    $("#ig-register-message").show();
    return false;
  } else {
    $("#message-pass").hide();
    if (registerError == 0 || registerError == 3) {
      $("#ig-register-message").hide();
      registerError = 0;
    }
    return true;
  }
}
function validateNewPassword() {
  $("#message-pass").hide();
  $("#message-pass2").hide();
  if ($("#ig-new-password-1").val().length < 4) {
    $("#message-pass").show();
    $("#ig-lostpassword-message").show();
    return false;
  }
  if ($("#ig-new-password-1").val() != $("#ig-new-password-2").val()) {
    $("#message-pass2").show();
    $("#ig-lostpassword-message").show();
    return false;
  }
  $("#ig-lostpassword-message").hide();
  return true;
}
function checkBirthdate() {
  if (0 === $("#ig-birthdate").length) {
    return;
  }
  var birthdate = $("#ig-birthdate")
    .val()
    .trim()
    .replace(/^(\d{2})\/(\d{2})\/(\d{4})$/, "$3-$2-$1");
  var birthTimestamp = (new Date(birthdate).getTime() / 1000) | 0;
  var sixteenYearsAgo = ((Date.now() / 1000) | 0) - 86400 * 365 * 16;
  if (birthTimestamp > sixteenYearsAgo) {
    if ($("input[name=isBelowSixteen]").length == 0) {
      $('<input type="hidden" name="isBelowSixteen" value="1">').insertAfter(
        $("#ig-register-once")
      );
    }
    $("#ig-register-parents")
      .show()
      .find("input[type=checkbox]")
      .prop("required", true);
  } else {
    if ($("input[name=isBelowSixteen]").length > 0) {
      $("input[name=isBelowSixteen]").remove();
    }
    $("#ig-register-parents").hide();
  }
}
(function (factory) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    factory(require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($, undef) {
  var dataKey = "plugin_hideShowPassword",
    shorthandArgs = ["show", "innerToggle"],
    SPACE = 32,
    ENTER = 13;
  var canSetInputAttribute = (function () {
    var body = document.body,
      input = document.createElement("input"),
      result = true;
    if (!body) {
      body = document.createElement("body");
    }
    input = body.appendChild(input);
    try {
      input.setAttribute("type", "text");
    } catch (e) {
      result = false;
    }
    body.removeChild(input);
    return result;
  })();
  var defaults = {
    show: "infer",
    innerToggle: false,
    enable: canSetInputAttribute,
    triggerOnToggle: false,
    className: "hideShowPassword-field",
    initEvent: "hideShowPasswordInit",
    changeEvent: "passwordVisibilityChange",
    props: {
      autocapitalize: "off",
      autocomplete: "off",
      autocorrect: "off",
      spellcheck: "false",
    },
    toggle: {
      element: '<button type="button">',
      className: "hideShowPassword-toggle",
      touchSupport:
        typeof Modernizr === "undefined" ? false : Modernizr.touchevents,
      attachToEvent: "click.hideShowPassword",
      attachToTouchEvent:
        "touchstart.hideShowPassword mousedown.hideShowPassword",
      attachToKeyEvent: "keyup",
      attachToKeyCodes: true,
      styles: { position: "absolute" },
      touchStyles: { pointerEvents: "none" },
      position: "infer",
      verticalAlign: "middle",
      offset: 0,
      attr: {
        role: "button",
        "aria-label": "Show Password",
        title: "Show Password",
        tabIndex: 0,
      },
    },
    wrapper: {
      element: "<div>",
      className: "hideShowPassword-wrapper",
      enforceWidth: true,
      styles: { position: "relative" },
      inheritStyles: [
        "display",
        "verticalAlign",
        "marginTop",
        "marginRight",
        "marginBottom",
        "marginLeft",
      ],
      innerElementStyles: {
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
      },
    },
    states: {
      shown: {
        className: "hideShowPassword-shown",
        changeEvent: "passwordShown",
        props: { type: "text" },
        toggle: {
          className: "hideShowPassword-toggle-hide",
          content: "Hide",
          attr: { "aria-pressed": "true", title: "Hide Password" },
        },
      },
      hidden: {
        className: "hideShowPassword-hidden",
        changeEvent: "passwordHidden",
        props: { type: "password" },
        toggle: {
          className: "hideShowPassword-toggle-show",
          content: "Show",
          attr: { "aria-pressed": "false", title: "Show Password" },
        },
      },
    },
  };
  function HideShowPassword(element, options) {
    this.element = $(element);
    this.wrapperElement = $();
    this.toggleElement = $();
    this.init(options);
  }
  HideShowPassword.prototype = {
    init: function (options) {
      if (this.update(options, defaults)) {
        this.element.addClass(this.options.className);
        if (this.options.innerToggle) {
          this.wrapElement(this.options.wrapper);
          this.initToggle(this.options.toggle);
          if (typeof this.options.innerToggle === "string") {
            this.toggleElement.hide();
            this.element.one(
              this.options.innerToggle,
              $.proxy(function () {
                this.toggleElement.show();
              }, this)
            );
          }
        }
        this.element.trigger(this.options.initEvent, [this]);
      }
    },
    update: function (options, base) {
      this.options = this.prepareOptions(options, base);
      if (this.updateElement()) {
        this.element
          .trigger(this.options.changeEvent, [this])
          .trigger(this.state().changeEvent, [this]);
      }
      return this.options.enable;
    },
    toggle: function (showVal) {
      showVal = showVal || "toggle";
      return this.update({ show: showVal });
    },
    prepareOptions: function (options, base) {
      var original = options || {},
        keyCodes = [],
        testElement;
      base = base || this.options;
      options = $.extend(true, {}, base, options);
      if (
        original.hasOwnProperty("wrapper") &&
        original.wrapper.hasOwnProperty("inheritStyles")
      ) {
        options.wrapper.inheritStyles = original.wrapper.inheritStyles;
      }
      if (options.enable) {
        if (options.show === "toggle") {
          options.show = this.isType("hidden", options.states);
        } else if (options.show === "infer") {
          options.show = this.isType("shown", options.states);
        }
        if (options.toggle.position === "infer") {
          options.toggle.position =
            this.element.css("text-direction") === "rtl" ? "left" : "right";
        }
        if (!$.isArray(options.toggle.attachToKeyCodes)) {
          if (options.toggle.attachToKeyCodes === true) {
            testElement = $(options.toggle.element);
            switch (testElement.prop("tagName").toLowerCase()) {
              case "button":
              case "input":
                break;
              case "a":
                if (testElement.filter("[href]").length) {
                  keyCodes.push(SPACE);
                  break;
                }
              default:
                keyCodes.push(SPACE, ENTER);
                break;
            }
          }
          options.toggle.attachToKeyCodes = keyCodes;
        }
      }
      return options;
    },
    updateElement: function () {
      if (!this.options.enable || this.isType()) return false;
      this.element
        .prop($.extend({}, this.options.props, this.state().props))
        .addClass(this.state().className)
        .removeClass(this.otherState().className);
      if (this.options.triggerOnToggle) {
        this.element.trigger(this.options.triggerOnToggle, [this]);
      }
      this.updateToggle();
      return true;
    },
    isType: function (comparison, states) {
      states = states || this.options.states;
      comparison = comparison || this.state(undef, undef, states).props.type;
      if (states[comparison]) {
        comparison = states[comparison].props.type;
      }
      return this.element.prop("type") === comparison;
    },
    state: function (key, invert, states) {
      states = states || this.options.states;
      if (key === undef) {
        key = this.options.show;
      }
      if (typeof key === "boolean") {
        key = key ? "shown" : "hidden";
      }
      if (invert) {
        key = key === "shown" ? "hidden" : "shown";
      }
      return states[key];
    },
    otherState: function (key) {
      return this.state(key, true);
    },
    wrapElement: function (options) {
      var enforceWidth = options.enforceWidth,
        targetWidth;
      if (!this.wrapperElement.length) {
        targetWidth = this.element.outerWidth();
        $.each(
          options.inheritStyles,
          $.proxy(function (index, prop) {
            options.styles[prop] = this.element.css(prop);
          }, this)
        );
        this.element
          .css(options.innerElementStyles)
          .wrap(
            $(options.element).addClass(options.className).css(options.styles)
          );
        this.wrapperElement = this.element.parent();
        if (enforceWidth === true) {
          enforceWidth =
            this.wrapperElement.outerWidth() === targetWidth
              ? false
              : targetWidth;
        }
        if (enforceWidth !== false) {
          this.wrapperElement.css("width", enforceWidth);
        }
      }
      return this.wrapperElement;
    },
    initToggle: function (options) {
      if (!this.toggleElement.length) {
        this.toggleElement = $(options.element)
          .attr(options.attr)
          .addClass(options.className)
          .css(options.styles)
          .appendTo(this.wrapperElement);
        this.updateToggle();
        this.positionToggle(
          options.position,
          options.verticalAlign,
          options.offset
        );
        if (options.touchSupport) {
          this.toggleElement.css(options.touchStyles);
          this.element.on(
            options.attachToTouchEvent,
            $.proxy(this.toggleTouchEvent, this)
          );
        } else {
          this.toggleElement.on(
            options.attachToEvent,
            $.proxy(this.toggleEvent, this)
          );
        }
        if (options.attachToKeyCodes.length) {
          this.toggleElement.on(
            options.attachToKeyEvent,
            $.proxy(this.toggleKeyEvent, this)
          );
        }
      }
      return this.toggleElement;
    },
    positionToggle: function (position, verticalAlign, offset) {
      var styles = {};
      styles[position] = offset;
      switch (verticalAlign) {
        case "top":
        case "bottom":
          styles[verticalAlign] = offset;
          break;
        case "middle":
          styles.top = "50%";
          styles.marginTop = this.toggleElement.outerHeight() / -2;
          break;
      }
      return this.toggleElement.css(styles);
    },
    updateToggle: function (state, otherState) {
      var paddingProp, targetPadding;
      if (this.toggleElement.length) {
        paddingProp = "padding-" + this.options.toggle.position;
        state = state || this.state().toggle;
        otherState = otherState || this.otherState().toggle;
        this.toggleElement
          .attr(state.attr)
          .addClass(state.className)
          .removeClass(otherState.className)
          .html(state.content);
        targetPadding =
          this.toggleElement.outerWidth() + this.options.toggle.offset * 2;
        if (this.element.css(paddingProp) !== targetPadding) {
          this.element.css(paddingProp, targetPadding);
        }
      }
      return this.toggleElement;
    },
    toggleEvent: function (event) {
      event.preventDefault();
      this.toggle();
    },
    toggleKeyEvent: function (event) {
      $.each(
        this.options.toggle.attachToKeyCodes,
        $.proxy(function (index, keyCode) {
          if (event.which === keyCode) {
            this.toggleEvent(event);
            return false;
          }
        }, this)
      );
    },
    toggleTouchEvent: function (event) {
      var toggleX = this.toggleElement.offset().left,
        eventX,
        lesser,
        greater;
      if (toggleX) {
        eventX = event.pageX || event.originalEvent.pageX;
        if (this.options.toggle.position === "left") {
          toggleX += this.toggleElement.outerWidth();
          lesser = eventX;
          greater = toggleX;
        } else {
          lesser = toggleX;
          greater = eventX;
        }
        if (greater >= lesser) {
          this.toggleEvent(event);
        }
      }
    },
  };
  $.fn.hideShowPassword = function () {
    var options = {};
    $.each(arguments, function (index, value) {
      var newOptions = {};
      if (typeof value === "object") {
        newOptions = value;
      } else if (shorthandArgs[index]) {
        newOptions[shorthandArgs[index]] = value;
      } else {
        return false;
      }
      $.extend(true, options, newOptions);
    });
    return this.each(function () {
      var $this = $(this),
        data = $this.data(dataKey);
      if (data) {
        data.update(options);
      } else {
        $this.data(dataKey, new HideShowPassword(this, options));
      }
    });
  };
  $.each(
    { show: true, hide: false, toggle: "toggle" },
    function (verb, showVal) {
      $.fn[verb + "Password"] = function (innerToggle, options) {
        return this.hideShowPassword(showVal, innerToggle, options);
      };
    }
  );
});
$(function () {
  let searchTimeout = null;
  const $resetFiltersButton = $("#reset-all-filters");
  handleReset();
  $(".ig-pm-morefilters-grade")
    .on("click", function () {
      let top = 17 + ($(this).data("grade") / 10 - 1) * 44;
      $("#ig-pm-gradeselector")
        .appendTo(this)
        .css({ top: -top + "px", left: "-17px" })
        .show();
    })
    .on("mouseleave", function () {
      $("#ig-pm-gradeselector").hide();
    });
  $("#ig-pm-filters .filter-min-value").change(function () {
    if (
      0 == $(this).val() &&
      100 ==
        $(this).closest(".ig-sections-content").find(".filter-max-value").val()
    ) {
      $(this).closest(".ig-sections-content").find(".ig-pm-resetfields").hide();
      return false;
    }
    $(this).closest(".ig-sections-content").find(".ig-pm-resetfields").show();
  });
  $("#ig-pm-filters .filter-max-value").change(function () {
    if (
      100 == $(this).val() &&
      0 ==
        $(this).closest(".ig-sections-content").find(".filter-min-value").val()
    ) {
      $(this).closest(".ig-sections-content").find(".ig-pm-resetfields").hide();
      return false;
    }
    $(this).closest(".ig-sections-content").find(".ig-pm-resetfields").show();
  });
  $("#ig-pm-gradeselector a").on("click", function (e) {
    let $g = $(this).closest(".ig-pm-morefilters-grade");
    $("#ig-pm-gradeselector").hide().appendTo($g.parent());
    $g.removeClass("ig-writereview-grade-" + $g.data("grade"));
    $g.addClass("ig-writereview-grade-" + $(this).data("grade"))
      .data("grade", $(this).data("grade"))
      .find(".rate")
      .removeClass("medium high")
      .text($(this).data("grade") / 10);
    $g.find(".circle-meter-bar")
      .removeClass("medium high")
      .get(0)
      .setAttribute("stroke-dasharray", $(this).data("grade") + " 100");
    if ($(this).data("grade") >= 40) {
      $g.find(".rate, .circle-meter-bar").addClass("medium");
    }
    if ($(this).data("grade") >= 70) {
      $g.find(".rate, .circle-meter-bar")
        .removeClass("medium")
        .addClass("high");
    }
    $('input[name="' + $g.data("inputname") + '"]')
      .val($(this).data("grade"))
      .trigger("change");
    e.stopPropagation();
    $(this).closest(".ig-sections-content").find(".ig-pm-resetfields").show();
    return false;
  });
  $("#ck_noreviews").change(function () {
    $(this).closest(".ig-sections-content").find(".ig-pm-resetfields").show();
  });
  $("#ig-pm-filters").on("change", "input[type!=text],select", function () {
    const id = $(this).attr("id"),
      $this = $(this);
    if (true === $this.data("is-reset")) {
      $this.data("is-reset", false);
      return;
    }
    if (id == "show-advanced-search" || id == "ig-search-sortby") {
      return;
    } else if (id == "ig-pm-available-in-checkbox") {
      const $hiddenInput = $("#ig-pm-available-in-hidden");
      if ($this.is(":checked")) {
        $hiddenInput.val($("#ig-pm-available-in-select").val());
      } else {
        $hiddenInput.val("0");
      }
    } else if (id == "ig-pm-available-in-select") {
      $("#ig-pm-available-in-checkbox").prop("checked", true);
      $("#ig-pm-available-in-hidden").val($(this).val());
    } else if (id == "ig-pm-filter-by-lang-select") {
      $("#ig-pm-filters input[name=has_lang]").val($(this).val());
    }
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    searchTimeout = setTimeout(function () {
      $("#ig-pm-filters").submit();
    }, 50);
  });
  $("select[name=sort_by]").on("change", function () {
    let sortByValue = $("select[name=sort_by]").val(),
      sortByFiltersExcludingPricesFilters = [
        "",
        "bestsellers_desc",
        "reviews_avg_desc",
        "reviews_avg_asc",
        "avail_date_asc",
        "avail_date_desc",
      ];
    if (sortByFiltersExcludingPricesFilters.includes(sortByValue)) {
      $("input[name=noprice]").val("1");
      $("#ck_noprice").prop("checked", true);
    } else {
      $("input[name=noprice]").val("0");
      $("#ck_noprice").prop("checked", false);
    }
    $("#ig-pm-filters").submit();
  });
  $("#ig-pm-genrefilters").on("change", "input", function (event) {
    if ($(this).attr("name") == "all_cats") {
      if ($(this).is(":checked")) {
        $('#ig-pm-genrefilters input[name="cat[]"]').prop("checked", false);
      }
    } else {
      if ($(this).is(":checked")) {
        $("#ig-pm-genrefilters input[name=all_cats]").prop("checked", false);
      }
    }
    if ($('#ig-pm-genrefilters input[name="cat[]"]:checked').length == 0) {
      $("#ig-pm-genrefilters input[name=all_cats]").prop("checked", true);
    }
    if (event.isTrigger) {
      event.stopPropagation();
      return false;
    }
    return true;
  });
  $("#ig-pm-filters input[type=text]")
    .on("keyup", function (e) {
      if (
        [38, 40, 39, 37, 27, 32, 17, 18, 16, 9, 36].indexOf(e.keyCode) == -1
      ) {
        if (this.submitTimeout) {
          clearTimeout(this.submitTimeout);
        }
        this.submitTimeout = setTimeout(function () {
          $("#ig-pm-filters").submit();
        }, 300);
      }
    })
    .on("click", function () {
      $(this).val("");
    })
    .on("blur", function () {
      if ($(this).val() == "") {
        $(this).val($(this).data("default"));
        $("#ig-pm-filters").submit();
      } else if ($(this).val() != $(this).data("default")) {
        $(this)
          .closest(".ig-sections-content")
          .find(".ig-pm-resetfields")
          .show();
      }
    });
  $("#ig-pm-filters").on("submit", function () {
    const $this = $(this);
    if ($("select[name=sort_by]").length > 0) {
      $this.find("input[name=sort_by]").val($("select[name=sort_by]").val());
    }
    $this.find("input[name=query]").val($("#ig-header-search-box-input").val());
    $this
      .find("input[name=noreviews]")
      .val($("#ck_noreviews").is(":checked") ? 1 : 0);
    $this
      .find("input[name=noprice]")
      .val($("#ck_noprice").is(":checked") ? 1 : 0);
    const formData = new FormData($this[0]);
    $("#search-category option:selected").each((i, item) => {
      formData.append("cat[]", item.value);
    });
    const urlParams = new URLSearchParams();
    for (let field of formData) {
      urlParams.append(field[0], field[1]);
    }
    urlParams.set("ajax", 1);
    handleReset();
    const $searchWrapper = $(".search-wrapper");
    if ($searchWrapper.length > 0) {
      $(".ig-search-items").css("opacity", 0.5);
      let searchUrl = $(this).attr("action");
      $.get(searchUrl, urlParams.toString(), function (html) {
        $searchWrapper.html(html);
        if ($("#ig-responsive-menu-button:visible").length > 0) {
          $("#ig-responsive-menu-drop").prop("checked", false);
        }
      });
      urlParams.delete("ajax");
      window.history.pushState("", "", searchUrl + "?" + urlParams.toString());
      const $pageCustomization = $("#page-customization");
      if ($pageCustomization.length > 0) {
        $pageCustomization.remove();
      }
      return false;
    }
  });
  $(".ig-pm-resetfields").click(function () {
    let section = $(this).closest(".ig-sections-content");
    if (section.attr("id") == "ig-pm-morefilters-gamersgrade") {
      section.find(".ig-pm-morefilters-grade").each(function () {
        $(this).removeClass("ig-writereview-grade-" + $(this).data("grade"));
        $(this)
          .addClass("ig-writereview-grade-" + $(this).data("default"))
          .data("grade", $(this).data("default"))
          .find(".rate")
          .removeClass("medium high")
          .text($(this).data("default") / 10);
        $(this).find(".circle-meter-bar").removeClass("medium high");
        if ($(this).hasClass("max-review")) {
          $(this).find(".rate, .circle-meter-bar").addClass("high");
          $(this)
            .find(".circle-meter-bar")
            .get(0)
            .setAttribute("stroke-dasharray", "100 100");
        } else {
          $(this)
            .find(".circle-meter-bar")
            .get(0)
            .setAttribute("stroke-dasharray", "10 100");
        }
        $('input[name="' + $(this).data("inputname") + '"]').val(
          $(this).data("grade")
        );
      });
      $("#ck_noreviews").prop("checked", true);
    } else {
      section.find("input").each(function () {
        $(this).val($(this).data("default"));
      });
      if (section.attr("id") == "ig-pm-morefilters-price") {
        $("#ck_noprice").prop("checked", true);
      }
    }
    $("#ig-pm-filters").submit();
    $(this).hide();
  });
  $(".ig-pm-morefilters-sminput").on("focusin", function () {
    this.value = "";
  });
  $("#search-platform").change(function (e) {
    const value = $(e.target).val(),
      $checkboxes = $(
        '#ig-pm-platformfilters input[type="checkbox"][name="platform[]"]'
      );
    selectCriteria($checkboxes, value);
  });
  $("#search-type").change(function (e) {
    const value = $(e.target).val(),
      $checkboxes = $(
        '#ig-pm-platformfilters input[type="checkbox"][name="type[]"]'
      );
    selectCriteria($checkboxes, value);
  });
  $("#search-category").change(function (e) {
    const value = $(e.target).val(),
      $checkboxes = $(
        '#ig-pm-genrefilters input[type="checkbox"][name="cat[]"]'
      );
    selectCriteria($checkboxes, value);
  });
  $("#ig-pm-morefilters-wrapper .selectable2")
    .on("select2:clear", function () {
      $(this).on("select2:opening.cancelOpen", function (evt) {
        evt.preventDefault();
        $(this).off("select2:opening.cancelOpen");
      });
    })
    .on("select2:unselecting", function () {
      $(this).data("unselecting", true);
    })
    .on("select2:opening", function (e) {
      if ($(this).data("unselecting")) {
        $(this).removeData("unselecting");
        e.preventDefault();
      }
    });
  $resetFiltersButton.click(function (e) {
    $("#ig-pm-filters .selectable2").val(null).trigger("change");
    $(".ig-pm-resetfields").trigger("click");
    $("#game-type").val(window.defaultGameType).trigger("change");
    $('input[name="instock"]').prop("checked", false);
    e.stopImmediatePropagation();
  });
  function selectCriteria($checkboxes, value) {
    if ("" !== value) {
      $checkboxes.each(function (i, checkbox) {
        let $checkbox = $(checkbox);
        if (value === $checkbox.val()) {
          $checkbox.trigger("click");
        }
      });
    }
    $checkboxes.each(function (i, checkbox) {
      let $checkbox = $(checkbox);
      if (value !== $checkbox.val() && $checkbox.is(":checked")) {
        $checkbox.trigger("click");
      }
    });
  }
  function handleReset() {
    if ($("#ig-search-form").length > 0) {
      if (
        $("#search-category").val().length > 0 ||
        $("#ig-search-sortby").val() != "" ||
        $("#search-type").val() != "" ||
        $("#search-platform").val() != "" ||
        $("#search-tags").val() != 0 ||
        $("#game-type").val() != window.defaultGameType ||
        $('input[name="instock"]').prop("checked") ||
        $("#min-price").data("default") != $("#min-price").val() ||
        $("#max-price").data("default") != $("#max-price").val()
      ) {
        $resetFiltersButton.css("display", "flex");
      } else {
        $resetFiltersButton.hide();
      }
    }
  }
});
/*! algoliasearch 3.24.7 | © 2014, 2015 Algolia SAS | github.com/algolia/algoliasearch-client-js */
!(function (e) {
  if ("object" == typeof exports && "undefined" != typeof module)
    module.exports = e();
  else if ("function" == typeof define && define.amd) define([], e);
  else {
    var t;
    (t =
      "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : this),
      (t.algoliasearch = e());
  }
})(function () {
  var e;
  return (function t(e, o, r) {
    function n(s, a) {
      if (!o[s]) {
        if (!e[s]) {
          var c = "function" == typeof require && require;
          if (!a && c) return c(s, !0);
          if (i) return i(s, !0);
          var u = new Error("Cannot find module '" + s + "'");
          throw ((u.code = "MODULE_NOT_FOUND"), u);
        }
        var l = (o[s] = { exports: {} });
        e[s][0].call(
          l.exports,
          function (t) {
            var o = e[s][1][t];
            return n(o ? o : t);
          },
          l,
          l.exports,
          t,
          e,
          o,
          r
        );
      }
      return o[s].exports;
    }
    for (
      var i = "function" == typeof require && require, s = 0;
      s < r.length;
      s++
    )
      n(r[s]);
    return n;
  })(
    {
      1: [
        function (e, t, o) {
          (function (r) {
            function n() {
              return (
                !(
                  "undefined" == typeof window ||
                  !window.process ||
                  "renderer" !== window.process.type
                ) ||
                ("undefined" != typeof document &&
                  document.documentElement &&
                  document.documentElement.style &&
                  document.documentElement.style.WebkitAppearance) ||
                ("undefined" != typeof window &&
                  window.console &&
                  (window.console.firebug ||
                    (window.console.exception && window.console.table))) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) &&
                  parseInt(RegExp.$1, 10) >= 31) ||
                ("undefined" != typeof navigator &&
                  navigator.userAgent &&
                  navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
              );
            }
            function i(e) {
              var t = this.useColors;
              if (
                ((e[0] =
                  (t ? "%c" : "") +
                  this.namespace +
                  (t ? " %c" : " ") +
                  e[0] +
                  (t ? "%c " : " ") +
                  "+" +
                  o.humanize(this.diff)),
                t)
              ) {
                var r = "color: " + this.color;
                e.splice(1, 0, r, "color: inherit");
                var n = 0,
                  i = 0;
                e[0].replace(/%[a-zA-Z%]/g, function (e) {
                  "%%" !== e && (n++, "%c" === e && (i = n));
                }),
                  e.splice(i, 0, r);
              }
            }
            function s() {
              return (
                "object" == typeof console &&
                console.log &&
                Function.prototype.apply.call(console.log, console, arguments)
              );
            }
            function a(e) {
              try {
                null == e
                  ? o.storage.removeItem("debug")
                  : (o.storage.debug = e);
              } catch (t) {}
            }
            function c() {
              var e;
              try {
                e = o.storage.debug;
              } catch (t) {}
              return (
                !e &&
                  "undefined" != typeof r &&
                  "env" in r &&
                  (e = r.env.DEBUG),
                e
              );
            }
            function u() {
              try {
                return window.localStorage;
              } catch (e) {}
            }
            (o = t.exports = e(2)),
              (o.log = s),
              (o.formatArgs = i),
              (o.save = a),
              (o.load = c),
              (o.useColors = n),
              (o.storage =
                "undefined" != typeof chrome &&
                "undefined" != typeof chrome.storage
                  ? chrome.storage.local
                  : u()),
              (o.colors = [
                "lightseagreen",
                "forestgreen",
                "goldenrod",
                "dodgerblue",
                "darkorchid",
                "crimson",
              ]),
              (o.formatters.j = function (e) {
                try {
                  return JSON.stringify(e);
                } catch (t) {
                  return "[UnexpectedJSONParseError]: " + t.message;
                }
              }),
              o.enable(c());
          }).call(this, e(11));
        },
        { 11: 11, 2: 2 },
      ],
      2: [
        function (e, t, o) {
          function r(e) {
            var t,
              r = 0;
            for (t in e) (r = (r << 5) - r + e.charCodeAt(t)), (r |= 0);
            return o.colors[Math.abs(r) % o.colors.length];
          }
          function n(e) {
            function t() {
              if (t.enabled) {
                var e = t,
                  r = +new Date(),
                  n = r - (u || r);
                (e.diff = n), (e.prev = u), (e.curr = r), (u = r);
                for (
                  var i = new Array(arguments.length), s = 0;
                  s < i.length;
                  s++
                )
                  i[s] = arguments[s];
                (i[0] = o.coerce(i[0])),
                  "string" != typeof i[0] && i.unshift("%O");
                var a = 0;
                (i[0] = i[0].replace(/%([a-zA-Z%])/g, function (t, r) {
                  if ("%%" === t) return t;
                  a++;
                  var n = o.formatters[r];
                  if ("function" == typeof n) {
                    var s = i[a];
                    (t = n.call(e, s)), i.splice(a, 1), a--;
                  }
                  return t;
                })),
                  o.formatArgs.call(e, i);
                var c = t.log || o.log || console.log.bind(console);
                c.apply(e, i);
              }
            }
            return (
              (t.namespace = e),
              (t.enabled = o.enabled(e)),
              (t.useColors = o.useColors()),
              (t.color = r(e)),
              "function" == typeof o.init && o.init(t),
              t
            );
          }
          function i(e) {
            o.save(e), (o.names = []), (o.skips = []);
            for (
              var t = ("string" == typeof e ? e : "").split(/[\s,]+/),
                r = t.length,
                n = 0;
              n < r;
              n++
            )
              t[n] &&
                ((e = t[n].replace(/\*/g, ".*?")),
                "-" === e[0]
                  ? o.skips.push(new RegExp("^" + e.substr(1) + "$"))
                  : o.names.push(new RegExp("^" + e + "$")));
          }
          function s() {
            o.enable("");
          }
          function a(e) {
            var t, r;
            for (t = 0, r = o.skips.length; t < r; t++)
              if (o.skips[t].test(e)) return !1;
            for (t = 0, r = o.names.length; t < r; t++)
              if (o.names[t].test(e)) return !0;
            return !1;
          }
          function c(e) {
            return e instanceof Error ? e.stack || e.message : e;
          }
          (o = t.exports = n.debug = n["default"] = n),
            (o.coerce = c),
            (o.disable = s),
            (o.enable = i),
            (o.enabled = a),
            (o.humanize = e(8)),
            (o.names = []),
            (o.skips = []),
            (o.formatters = {});
          var u;
        },
        { 8: 8 },
      ],
      3: [
        function (t, o, r) {
          (function (n, i) {
            !(function (t, n) {
              "object" == typeof r && "undefined" != typeof o
                ? (o.exports = n())
                : "function" == typeof e && e.amd
                ? e(n)
                : (t.ES6Promise = n());
            })(this, function () {
              "use strict";
              function e(e) {
                var t = typeof e;
                return null !== e && ("object" === t || "function" === t);
              }
              function o(e) {
                return "function" == typeof e;
              }
              function r(e) {
                Y = e;
              }
              function s(e) {
                z = e;
              }
              function a() {
                return function () {
                  return n.nextTick(f);
                };
              }
              function c() {
                return "undefined" != typeof G
                  ? function () {
                      G(f);
                    }
                  : p();
              }
              function u() {
                var e = 0,
                  t = new Z(f),
                  o = document.createTextNode("");
                return (
                  t.observe(o, { characterData: !0 }),
                  function () {
                    o.data = e = ++e % 2;
                  }
                );
              }
              function l() {
                var e = new MessageChannel();
                return (
                  (e.port1.onmessage = f),
                  function () {
                    return e.port2.postMessage(0);
                  }
                );
              }
              function p() {
                var e = setTimeout;
                return function () {
                  return e(f, 1);
                };
              }
              function f() {
                for (var e = 0; e < V; e += 2) {
                  var t = oe[e],
                    o = oe[e + 1];
                  t(o), (oe[e] = void 0), (oe[e + 1] = void 0);
                }
                V = 0;
              }
              function d() {
                try {
                  var e = t,
                    o = e("vertx");
                  return (G = o.runOnLoop || o.runOnContext), c();
                } catch (r) {
                  return p();
                }
              }
              function h(e, t) {
                var o = arguments,
                  r = this,
                  n = new this.constructor(m);
                void 0 === n[ne] && P(n);
                var i = r._state;
                return (
                  i
                    ? !(function () {
                        var e = o[i - 1];
                        z(function () {
                          return C(i, n, e, r._result);
                        });
                      })()
                    : k(r, n, e, t),
                  n
                );
              }
              function y(e) {
                var t = this;
                if (e && "object" == typeof e && e.constructor === t) return e;
                var o = new t(m);
                return x(o, e), o;
              }
              function m() {}
              function g() {
                return new TypeError(
                  "You cannot resolve a promise with itself"
                );
              }
              function v() {
                return new TypeError(
                  "A promises callback cannot return that same promise."
                );
              }
              function b(e) {
                try {
                  return e.then;
                } catch (t) {
                  return (ce.error = t), ce;
                }
              }
              function w(e, t, o, r) {
                try {
                  e.call(t, o, r);
                } catch (n) {
                  return n;
                }
              }
              function _(e, t, o) {
                z(function (e) {
                  var r = !1,
                    n = w(
                      o,
                      t,
                      function (o) {
                        r || ((r = !0), t !== o ? x(e, o) : j(e, o));
                      },
                      function (t) {
                        r || ((r = !0), O(e, t));
                      },
                      "Settle: " + (e._label || " unknown promise")
                    );
                  !r && n && ((r = !0), O(e, n));
                }, e);
              }
              function T(e, t) {
                t._state === se
                  ? j(e, t._result)
                  : t._state === ae
                  ? O(e, t._result)
                  : k(
                      t,
                      void 0,
                      function (t) {
                        return x(e, t);
                      },
                      function (t) {
                        return O(e, t);
                      }
                    );
              }
              function S(e, t, r) {
                t.constructor === e.constructor &&
                r === h &&
                t.constructor.resolve === y
                  ? T(e, t)
                  : r === ce
                  ? (O(e, ce.error), (ce.error = null))
                  : void 0 === r
                  ? j(e, t)
                  : o(r)
                  ? _(e, t, r)
                  : j(e, t);
              }
              function x(t, o) {
                t === o ? O(t, g()) : e(o) ? S(t, o, b(o)) : j(t, o);
              }
              function A(e) {
                e._onerror && e._onerror(e._result), I(e);
              }
              function j(e, t) {
                e._state === ie &&
                  ((e._result = t),
                  (e._state = se),
                  0 !== e._subscribers.length && z(I, e));
              }
              function O(e, t) {
                e._state === ie && ((e._state = ae), (e._result = t), z(A, e));
              }
              function k(e, t, o, r) {
                var n = e._subscribers,
                  i = n.length;
                (e._onerror = null),
                  (n[i] = t),
                  (n[i + se] = o),
                  (n[i + ae] = r),
                  0 === i && e._state && z(I, e);
              }
              function I(e) {
                var t = e._subscribers,
                  o = e._state;
                if (0 !== t.length) {
                  for (
                    var r = void 0, n = void 0, i = e._result, s = 0;
                    s < t.length;
                    s += 3
                  )
                    (r = t[s]), (n = t[s + o]), r ? C(o, r, n, i) : n(i);
                  e._subscribers.length = 0;
                }
              }
              function E() {
                this.error = null;
              }
              function R(e, t) {
                try {
                  return e(t);
                } catch (o) {
                  return (ue.error = o), ue;
                }
              }
              function C(e, t, r, n) {
                var i = o(r),
                  s = void 0,
                  a = void 0,
                  c = void 0,
                  u = void 0;
                if (i) {
                  if (
                    ((s = R(r, n)),
                    s === ue
                      ? ((u = !0), (a = s.error), (s.error = null))
                      : (c = !0),
                    t === s)
                  )
                    return void O(t, v());
                } else (s = n), (c = !0);
                t._state !== ie ||
                  (i && c
                    ? x(t, s)
                    : u
                    ? O(t, a)
                    : e === se
                    ? j(t, s)
                    : e === ae && O(t, s));
              }
              function N(e, t) {
                try {
                  t(
                    function (t) {
                      x(e, t);
                    },
                    function (t) {
                      O(e, t);
                    }
                  );
                } catch (o) {
                  O(e, o);
                }
              }
              function q() {
                return le++;
              }
              function P(e) {
                (e[ne] = le++),
                  (e._state = void 0),
                  (e._result = void 0),
                  (e._subscribers = []);
              }
              function D(e, t) {
                (this._instanceConstructor = e),
                  (this.promise = new e(m)),
                  this.promise[ne] || P(this.promise),
                  K(t)
                    ? ((this.length = t.length),
                      (this._remaining = t.length),
                      (this._result = new Array(this.length)),
                      0 === this.length
                        ? j(this.promise, this._result)
                        : ((this.length = this.length || 0),
                          this._enumerate(t),
                          0 === this._remaining &&
                            j(this.promise, this._result)))
                    : O(this.promise, U());
              }
              function U() {
                return new Error("Array Methods must be provided an Array");
              }
              function M(e) {
                return new D(this, e).promise;
              }
              function H(e) {
                var t = this;
                return new t(
                  K(e)
                    ? function (o, r) {
                        for (var n = e.length, i = 0; i < n; i++)
                          t.resolve(e[i]).then(o, r);
                      }
                    : function (e, t) {
                        return t(
                          new TypeError("You must pass an array to race.")
                        );
                      }
                );
              }
              function J(e) {
                var t = this,
                  o = new t(m);
                return O(o, e), o;
              }
              function F() {
                throw new TypeError(
                  "You must pass a resolver function as the first argument to the promise constructor"
                );
              }
              function $() {
                throw new TypeError(
                  "Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function."
                );
              }
              function L(e) {
                (this[ne] = q()),
                  (this._result = this._state = void 0),
                  (this._subscribers = []),
                  m !== e &&
                    ("function" != typeof e && F(),
                    this instanceof L ? N(this, e) : $());
              }
              function B() {
                var e = void 0;
                if ("undefined" != typeof i) e = i;
                else if ("undefined" != typeof self) e = self;
                else
                  try {
                    e = Function("return this")();
                  } catch (t) {
                    throw new Error(
                      "polyfill failed because global object is unavailable in this environment"
                    );
                  }
                var o = e.Promise;
                if (o) {
                  var r = null;
                  try {
                    r = Object.prototype.toString.call(o.resolve());
                  } catch (t) {}
                  if ("[object Promise]" === r && !o.cast) return;
                }
                e.Promise = L;
              }
              var X = void 0;
              X = Array.isArray
                ? Array.isArray
                : function (e) {
                    return (
                      "[object Array]" === Object.prototype.toString.call(e)
                    );
                  };
              var K = X,
                V = 0,
                G = void 0,
                Y = void 0,
                z = function (e, t) {
                  (oe[V] = e),
                    (oe[V + 1] = t),
                    (V += 2),
                    2 === V && (Y ? Y(f) : re());
                },
                Q = "undefined" != typeof window ? window : void 0,
                W = Q || {},
                Z = W.MutationObserver || W.WebKitMutationObserver,
                ee =
                  "undefined" == typeof self &&
                  "undefined" != typeof n &&
                  "[object process]" === {}.toString.call(n),
                te =
                  "undefined" != typeof Uint8ClampedArray &&
                  "undefined" != typeof importScripts &&
                  "undefined" != typeof MessageChannel,
                oe = new Array(1e3),
                re = void 0;
              re = ee
                ? a()
                : Z
                ? u()
                : te
                ? l()
                : void 0 === Q && "function" == typeof t
                ? d()
                : p();
              var ne = Math.random().toString(36).substring(16),
                ie = void 0,
                se = 1,
                ae = 2,
                ce = new E(),
                ue = new E(),
                le = 0;
              return (
                (D.prototype._enumerate = function (e) {
                  for (var t = 0; this._state === ie && t < e.length; t++)
                    this._eachEntry(e[t], t);
                }),
                (D.prototype._eachEntry = function (e, t) {
                  var o = this._instanceConstructor,
                    r = o.resolve;
                  if (r === y) {
                    var n = b(e);
                    if (n === h && e._state !== ie)
                      this._settledAt(e._state, t, e._result);
                    else if ("function" != typeof n)
                      this._remaining--, (this._result[t] = e);
                    else if (o === L) {
                      var i = new o(m);
                      S(i, e, n), this._willSettleAt(i, t);
                    } else
                      this._willSettleAt(
                        new o(function (t) {
                          return t(e);
                        }),
                        t
                      );
                  } else this._willSettleAt(r(e), t);
                }),
                (D.prototype._settledAt = function (e, t, o) {
                  var r = this.promise;
                  r._state === ie &&
                    (this._remaining--,
                    e === ae ? O(r, o) : (this._result[t] = o)),
                    0 === this._remaining && j(r, this._result);
                }),
                (D.prototype._willSettleAt = function (e, t) {
                  var o = this;
                  k(
                    e,
                    void 0,
                    function (e) {
                      return o._settledAt(se, t, e);
                    },
                    function (e) {
                      return o._settledAt(ae, t, e);
                    }
                  );
                }),
                (L.all = M),
                (L.race = H),
                (L.resolve = y),
                (L.reject = J),
                (L._setScheduler = r),
                (L._setAsap = s),
                (L._asap = z),
                (L.prototype = {
                  constructor: L,
                  then: h,
                  catch: function (e) {
                    return this.then(null, e);
                  },
                }),
                (L.polyfill = B),
                (L.Promise = L),
                L
              );
            });
          }).call(
            this,
            t(11),
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          );
        },
        { 11: 11 },
      ],
      4: [
        function (e, t, o) {
          var r = Object.prototype.hasOwnProperty,
            n = Object.prototype.toString;
          t.exports = function (e, t, o) {
            if ("[object Function]" !== n.call(t))
              throw new TypeError("iterator must be a function");
            var i = e.length;
            if (i === +i) for (var s = 0; s < i; s++) t.call(o, e[s], s, e);
            else for (var a in e) r.call(e, a) && t.call(o, e[a], a, e);
          };
        },
        {},
      ],
      5: [
        function (e, t, o) {
          (function (e) {
            var o;
            (o =
              "undefined" != typeof window
                ? window
                : "undefined" != typeof e
                ? e
                : "undefined" != typeof self
                ? self
                : {}),
              (t.exports = o);
          }).call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          );
        },
        {},
      ],
      6: [
        function (e, t, o) {
          "function" == typeof Object.create
            ? (t.exports = function (e, t) {
                (e.super_ = t),
                  (e.prototype = Object.create(t.prototype, {
                    constructor: {
                      value: e,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  }));
              })
            : (t.exports = function (e, t) {
                e.super_ = t;
                var o = function () {};
                (o.prototype = t.prototype),
                  (e.prototype = new o()),
                  (e.prototype.constructor = e);
              });
        },
        {},
      ],
      7: [
        function (e, t, o) {
          var r = {}.toString;
          t.exports =
            Array.isArray ||
            function (e) {
              return "[object Array]" == r.call(e);
            };
        },
        {},
      ],
      8: [
        function (e, t, o) {
          function r(e) {
            if (((e = String(e)), !(e.length > 100))) {
              var t =
                /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
                  e
                );
              if (t) {
                var o = parseFloat(t[1]),
                  r = (t[2] || "ms").toLowerCase();
                switch (r) {
                  case "years":
                  case "year":
                  case "yrs":
                  case "yr":
                  case "y":
                    return o * p;
                  case "days":
                  case "day":
                  case "d":
                    return o * l;
                  case "hours":
                  case "hour":
                  case "hrs":
                  case "hr":
                  case "h":
                    return o * u;
                  case "minutes":
                  case "minute":
                  case "mins":
                  case "min":
                  case "m":
                    return o * c;
                  case "seconds":
                  case "second":
                  case "secs":
                  case "sec":
                  case "s":
                    return o * a;
                  case "milliseconds":
                  case "millisecond":
                  case "msecs":
                  case "msec":
                  case "ms":
                    return o;
                  default:
                    return;
                }
              }
            }
          }
          function n(e) {
            return e >= l
              ? Math.round(e / l) + "d"
              : e >= u
              ? Math.round(e / u) + "h"
              : e >= c
              ? Math.round(e / c) + "m"
              : e >= a
              ? Math.round(e / a) + "s"
              : e + "ms";
          }
          function i(e) {
            return (
              s(e, l, "day") ||
              s(e, u, "hour") ||
              s(e, c, "minute") ||
              s(e, a, "second") ||
              e + " ms"
            );
          }
          function s(e, t, o) {
            if (!(e < t))
              return e < 1.5 * t
                ? Math.floor(e / t) + " " + o
                : Math.ceil(e / t) + " " + o + "s";
          }
          var a = 1e3,
            c = 60 * a,
            u = 60 * c,
            l = 24 * u,
            p = 365.25 * l;
          t.exports = function (e, t) {
            t = t || {};
            var o = typeof e;
            if ("string" === o && e.length > 0) return r(e);
            if ("number" === o && isNaN(e) === !1)
              return t["long"] ? i(e) : n(e);
            throw new Error(
              "val is not a non-empty string or a valid number. val=" +
                JSON.stringify(e)
            );
          };
        },
        {},
      ],
      9: [
        function (e, t, o) {
          "use strict";
          var r = Object.prototype.hasOwnProperty,
            n = Object.prototype.toString,
            i = Array.prototype.slice,
            s = e(10),
            a = Object.prototype.propertyIsEnumerable,
            c = !a.call({ toString: null }, "toString"),
            u = a.call(function () {}, "prototype"),
            l = [
              "toString",
              "toLocaleString",
              "valueOf",
              "hasOwnProperty",
              "isPrototypeOf",
              "propertyIsEnumerable",
              "constructor",
            ],
            p = function (e) {
              var t = e.constructor;
              return t && t.prototype === e;
            },
            f = {
              $console: !0,
              $external: !0,
              $frame: !0,
              $frameElement: !0,
              $frames: !0,
              $innerHeight: !0,
              $innerWidth: !0,
              $outerHeight: !0,
              $outerWidth: !0,
              $pageXOffset: !0,
              $pageYOffset: !0,
              $parent: !0,
              $scrollLeft: !0,
              $scrollTop: !0,
              $scrollX: !0,
              $scrollY: !0,
              $self: !0,
              $webkitIndexedDB: !0,
              $webkitStorageInfo: !0,
              $window: !0,
            },
            d = (function () {
              if ("undefined" == typeof window) return !1;
              for (var e in window)
                try {
                  if (
                    !f["$" + e] &&
                    r.call(window, e) &&
                    null !== window[e] &&
                    "object" == typeof window[e]
                  )
                    try {
                      p(window[e]);
                    } catch (t) {
                      return !0;
                    }
                } catch (t) {
                  return !0;
                }
              return !1;
            })(),
            h = function (e) {
              if ("undefined" == typeof window || !d) return p(e);
              try {
                return p(e);
              } catch (t) {
                return !1;
              }
            },
            y = function (e) {
              var t = null !== e && "object" == typeof e,
                o = "[object Function]" === n.call(e),
                i = s(e),
                a = t && "[object String]" === n.call(e),
                p = [];
              if (!t && !o && !i)
                throw new TypeError("Object.keys called on a non-object");
              var f = u && o;
              if (a && e.length > 0 && !r.call(e, 0))
                for (var d = 0; d < e.length; ++d) p.push(String(d));
              if (i && e.length > 0)
                for (var y = 0; y < e.length; ++y) p.push(String(y));
              else
                for (var m in e)
                  (f && "prototype" === m) ||
                    !r.call(e, m) ||
                    p.push(String(m));
              if (c)
                for (var g = h(e), v = 0; v < l.length; ++v)
                  (g && "constructor" === l[v]) ||
                    !r.call(e, l[v]) ||
                    p.push(l[v]);
              return p;
            };
          (y.shim = function () {
            if (Object.keys) {
              var e = (function () {
                return 2 === (Object.keys(arguments) || "").length;
              })(1, 2);
              if (!e) {
                var t = Object.keys;
                Object.keys = function (e) {
                  return t(s(e) ? i.call(e) : e);
                };
              }
            } else Object.keys = y;
            return Object.keys || y;
          }),
            (t.exports = y);
        },
        { 10: 10 },
      ],
      10: [
        function (e, t, o) {
          "use strict";
          var r = Object.prototype.toString;
          t.exports = function (e) {
            var t = r.call(e),
              o = "[object Arguments]" === t;
            return (
              o ||
                (o =
                  "[object Array]" !== t &&
                  null !== e &&
                  "object" == typeof e &&
                  "number" == typeof e.length &&
                  e.length >= 0 &&
                  "[object Function]" === r.call(e.callee)),
              o
            );
          };
        },
        {},
      ],
      11: [
        function (e, t, o) {
          function r() {
            throw new Error("setTimeout has not been defined");
          }
          function n() {
            throw new Error("clearTimeout has not been defined");
          }
          function i(e) {
            if (p === setTimeout) return setTimeout(e, 0);
            if ((p === r || !p) && setTimeout)
              return (p = setTimeout), setTimeout(e, 0);
            try {
              return p(e, 0);
            } catch (t) {
              try {
                return p.call(null, e, 0);
              } catch (t) {
                return p.call(this, e, 0);
              }
            }
          }
          function s(e) {
            if (f === clearTimeout) return clearTimeout(e);
            if ((f === n || !f) && clearTimeout)
              return (f = clearTimeout), clearTimeout(e);
            try {
              return f(e);
            } catch (t) {
              try {
                return f.call(null, e);
              } catch (t) {
                return f.call(this, e);
              }
            }
          }
          function a() {
            m &&
              h &&
              ((m = !1),
              h.length ? (y = h.concat(y)) : (g = -1),
              y.length && c());
          }
          function c() {
            if (!m) {
              var e = i(a);
              m = !0;
              for (var t = y.length; t; ) {
                for (h = y, y = []; ++g < t; ) h && h[g].run();
                (g = -1), (t = y.length);
              }
              (h = null), (m = !1), s(e);
            }
          }
          function u(e, t) {
            (this.fun = e), (this.array = t);
          }
          function l() {}
          var p,
            f,
            d = (t.exports = {});
          !(function () {
            try {
              p = "function" == typeof setTimeout ? setTimeout : r;
            } catch (e) {
              p = r;
            }
            try {
              f = "function" == typeof clearTimeout ? clearTimeout : n;
            } catch (e) {
              f = n;
            }
          })();
          var h,
            y = [],
            m = !1,
            g = -1;
          (d.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
              for (var o = 1; o < arguments.length; o++)
                t[o - 1] = arguments[o];
            y.push(new u(e, t)), 1 !== y.length || m || i(c);
          }),
            (u.prototype.run = function () {
              this.fun.apply(null, this.array);
            }),
            (d.title = "browser"),
            (d.browser = !0),
            (d.env = {}),
            (d.argv = []),
            (d.version = ""),
            (d.versions = {}),
            (d.on = l),
            (d.addListener = l),
            (d.once = l),
            (d.off = l),
            (d.removeListener = l),
            (d.removeAllListeners = l),
            (d.emit = l),
            (d.binding = function (e) {
              throw new Error("process.binding is not supported");
            }),
            (d.cwd = function () {
              return "/";
            }),
            (d.chdir = function (e) {
              throw new Error("process.chdir is not supported");
            }),
            (d.umask = function () {
              return 0;
            });
        },
        {},
      ],
      12: [
        function (e, t, o) {
          "use strict";
          function r(e, t) {
            if (e.map) return e.map(t);
            for (var o = [], r = 0; r < e.length; r++) o.push(t(e[r], r));
            return o;
          }
          var n = function (e) {
            switch (typeof e) {
              case "string":
                return e;
              case "boolean":
                return e ? "true" : "false";
              case "number":
                return isFinite(e) ? e : "";
              default:
                return "";
            }
          };
          t.exports = function (e, t, o, a) {
            return (
              (t = t || "&"),
              (o = o || "="),
              null === e && (e = void 0),
              "object" == typeof e
                ? r(s(e), function (s) {
                    var a = encodeURIComponent(n(s)) + o;
                    return i(e[s])
                      ? r(e[s], function (e) {
                          return a + encodeURIComponent(n(e));
                        }).join(t)
                      : a + encodeURIComponent(n(e[s]));
                  }).join(t)
                : a
                ? encodeURIComponent(n(a)) + o + encodeURIComponent(n(e))
                : ""
            );
          };
          var i =
              Array.isArray ||
              function (e) {
                return "[object Array]" === Object.prototype.toString.call(e);
              },
            s =
              Object.keys ||
              function (e) {
                var t = [];
                for (var o in e)
                  Object.prototype.hasOwnProperty.call(e, o) && t.push(o);
                return t;
              };
        },
        {},
      ],
      13: [
        function (e, t, o) {
          (function (o) {
            function r(t, o, r) {
              var i = e(1)("algoliasearch"),
                s = e(21),
                a = e(7),
                u = e(26),
                l = "Usage: algoliasearch(applicationID, apiKey, opts)";
              if (r._allowEmptyCredentials !== !0 && !t)
                throw new c.AlgoliaSearchError(
                  "Please provide an application ID. " + l
                );
              if (r._allowEmptyCredentials !== !0 && !o)
                throw new c.AlgoliaSearchError(
                  "Please provide an API key. " + l
                );
              (this.applicationID = t),
                (this.apiKey = o),
                (this.hosts = { read: [], write: [] }),
                (r = r || {});
              var p = r.protocol || "https:";
              if (
                ((this._timeouts = r.timeouts || {
                  connect: 1e3,
                  read: 2e3,
                  write: 3e4,
                }),
                r.timeout &&
                  (this._timeouts.connect =
                    this._timeouts.read =
                    this._timeouts.write =
                      r.timeout),
                /:$/.test(p) || (p += ":"),
                "http:" !== r.protocol && "https:" !== r.protocol)
              )
                throw new c.AlgoliaSearchError(
                  "protocol must be `http:` or `https:` (was `" +
                    r.protocol +
                    "`)"
                );
              if ((this._checkAppIdData(), r.hosts))
                a(r.hosts)
                  ? ((this.hosts.read = s(r.hosts)),
                    (this.hosts.write = s(r.hosts)))
                  : ((this.hosts.read = s(r.hosts.read)),
                    (this.hosts.write = s(r.hosts.write)));
              else {
                var f = u(this._shuffleResult, function (e) {
                  return t + "-" + e + ".algolianet.com";
                });
                (this.hosts.read = [
                  this.applicationID + "-dsn.algolia.net",
                ].concat(f)),
                  (this.hosts.write = [
                    this.applicationID + ".algolia.net",
                  ].concat(f));
              }
              (this.hosts.read = u(this.hosts.read, n(p))),
                (this.hosts.write = u(this.hosts.write, n(p))),
                (this.extraHeaders = {}),
                (this.cache = r._cache || {}),
                (this._ua = r._ua),
                (this._useCache =
                  !(void 0 !== r._useCache && !r._cache) || r._useCache),
                (this._useFallback = void 0 === r.useFallback || r.useFallback),
                (this._setTimeout = r._setTimeout),
                i("init done, %j", this);
            }
            function n(e) {
              return function (t) {
                return e + "//" + t.toLowerCase();
              };
            }
            function i(e) {
              if (void 0 === Array.prototype.toJSON) return JSON.stringify(e);
              var t = Array.prototype.toJSON;
              delete Array.prototype.toJSON;
              var o = JSON.stringify(e);
              return (Array.prototype.toJSON = t), o;
            }
            function s(e) {
              for (var t, o, r = e.length; 0 !== r; )
                (o = Math.floor(Math.random() * r)),
                  (r -= 1),
                  (t = e[r]),
                  (e[r] = e[o]),
                  (e[o] = t);
              return e;
            }
            function a(e) {
              var t = {};
              for (var o in e)
                if (Object.prototype.hasOwnProperty.call(e, o)) {
                  var r;
                  (r =
                    "x-algolia-api-key" === o ||
                    "x-algolia-application-id" === o
                      ? "**hidden for security purposes**"
                      : e[o]),
                    (t[o] = r);
                }
              return t;
            }
            t.exports = r;
            var c = e(24),
              u = e(25),
              l = e(14),
              p = e(30),
              f = 500,
              d =
                (o.env.RESET_APP_DATA_TIMER &&
                  parseInt(o.env.RESET_APP_DATA_TIMER, 10)) ||
                12e4;
            (r.prototype.initIndex = function (e) {
              return new l(this, e);
            }),
              (r.prototype.setExtraHeader = function (e, t) {
                this.extraHeaders[e.toLowerCase()] = t;
              }),
              (r.prototype.getExtraHeader = function (e) {
                return this.extraHeaders[e.toLowerCase()];
              }),
              (r.prototype.unsetExtraHeader = function (e) {
                delete this.extraHeaders[e.toLowerCase()];
              }),
              (r.prototype.addAlgoliaAgent = function (e) {
                this._ua.indexOf(";" + e) === -1 && (this._ua += ";" + e);
              }),
              (r.prototype._jsonRequest = function (t) {
                function o(e, u) {
                  function f(e) {
                    var t =
                      (e && e.body && e.body.message && e.body.status) ||
                      e.statusCode ||
                      (e && e.body && 200);
                    s(
                      "received response: statusCode: %s, computed statusCode: %d, headers: %j",
                      e.statusCode,
                      t,
                      e.headers
                    );
                    var o = 2 === Math.floor(t / 100),
                      i = new Date();
                    if (
                      (g.push({
                        currentHost: S,
                        headers: a(n),
                        content: r || null,
                        contentLength: void 0 !== r ? r.length : null,
                        method: u.method,
                        timeouts: u.timeouts,
                        url: u.url,
                        startTime: T,
                        endTime: i,
                        duration: i - T,
                        statusCode: t,
                      }),
                      o)
                    )
                      return (
                        d._useCache && p && (p[_] = e.responseText), e.body
                      );
                    var l = 4 !== Math.floor(t / 100);
                    if (l) return (h += 1), b();
                    s("unrecoverable error");
                    var f = new c.AlgoliaSearchError(e.body && e.body.message, {
                      debugData: g,
                      statusCode: t,
                    });
                    return d._promise.reject(f);
                  }
                  function v(e) {
                    s("error: %s, stack: %s", e.message, e.stack);
                    var o = new Date();
                    return (
                      g.push({
                        currentHost: S,
                        headers: a(n),
                        content: r || null,
                        contentLength: void 0 !== r ? r.length : null,
                        method: u.method,
                        timeouts: u.timeouts,
                        url: u.url,
                        startTime: T,
                        endTime: o,
                        duration: o - T,
                      }),
                      e instanceof c.AlgoliaSearchError ||
                        (e = new c.Unknown(e && e.message, e)),
                      (h += 1),
                      e instanceof c.Unknown ||
                      e instanceof c.UnparsableJSON ||
                      (h >= d.hosts[t.hostType].length && (y || !m))
                        ? ((e.debugData = g), d._promise.reject(e))
                        : e instanceof c.RequestTimeout
                        ? w()
                        : b()
                    );
                  }
                  function b() {
                    return (
                      s("retrying request"),
                      d._incrementHostIndex(t.hostType),
                      o(e, u)
                    );
                  }
                  function w() {
                    return (
                      s("retrying request with higher timeout"),
                      d._incrementHostIndex(t.hostType),
                      d._incrementTimeoutMultipler(),
                      (u.timeouts = d._getTimeoutsForRequest(t.hostType)),
                      o(e, u)
                    );
                  }
                  d._checkAppIdData();
                  var _,
                    T = new Date();
                  if (
                    (d._useCache && (_ = t.url),
                    d._useCache && r && (_ += "_body_" + u.body),
                    d._useCache && p && void 0 !== p[_])
                  )
                    return (
                      s("serving response from cache"),
                      d._promise.resolve(JSON.parse(p[_]))
                    );
                  if (h >= d.hosts[t.hostType].length)
                    return !m || y
                      ? (s("could not get any response"),
                        d._promise.reject(
                          new c.AlgoliaSearchError(
                            "Cannot connect to the AlgoliaSearch API. Send an email to support@algolia.com to report and resolve the issue. Application id was: " +
                              d.applicationID,
                            { debugData: g }
                          )
                        ))
                      : (s("switching to fallback"),
                        (h = 0),
                        (u.method = t.fallback.method),
                        (u.url = t.fallback.url),
                        (u.jsonBody = t.fallback.body),
                        u.jsonBody && (u.body = i(u.jsonBody)),
                        (n = d._computeRequestHeaders(l)),
                        (u.timeouts = d._getTimeoutsForRequest(t.hostType)),
                        d._setHostIndexByType(0, t.hostType),
                        (y = !0),
                        o(d._request.fallback, u));
                  var S = d._getHostByType(t.hostType),
                    x = S + u.url,
                    A = {
                      body: u.body,
                      jsonBody: u.jsonBody,
                      method: u.method,
                      headers: n,
                      timeouts: u.timeouts,
                      debug: s,
                    };
                  return (
                    s(
                      "method: %s, url: %s, headers: %j, timeouts: %d",
                      A.method,
                      x,
                      A.headers,
                      A.timeouts
                    ),
                    e === d._request.fallback && s("using fallback"),
                    e.call(d, x, A).then(f, v)
                  );
                }
                this._checkAppIdData();
                var r,
                  n,
                  s = e(1)("algoliasearch:" + t.url),
                  l = t.additionalUA || "",
                  p = t.cache,
                  d = this,
                  h = 0,
                  y = !1,
                  m = d._useFallback && d._request.fallback && t.fallback;
                this.apiKey.length > f &&
                void 0 !== t.body &&
                (void 0 !== t.body.params || void 0 !== t.body.requests)
                  ? ((t.body.apiKey = this.apiKey),
                    (n = this._computeRequestHeaders(l, !1)))
                  : (n = this._computeRequestHeaders(l)),
                  void 0 !== t.body && (r = i(t.body)),
                  s("request start");
                var g = [],
                  v = o(d._request, {
                    url: t.url,
                    method: t.method,
                    body: r,
                    jsonBody: t.body,
                    timeouts: d._getTimeoutsForRequest(t.hostType),
                  });
                return "function" != typeof t.callback
                  ? v
                  : void v.then(
                      function (e) {
                        u(function () {
                          t.callback(null, e);
                        }, d._setTimeout || setTimeout);
                      },
                      function (e) {
                        u(function () {
                          t.callback(e);
                        }, d._setTimeout || setTimeout);
                      }
                    );
              }),
              (r.prototype._getSearchParams = function (e, t) {
                if (void 0 === e || null === e) return t;
                for (var o in e)
                  null !== o &&
                    void 0 !== e[o] &&
                    e.hasOwnProperty(o) &&
                    ((t += "" === t ? "" : "&"),
                    (t +=
                      o +
                      "=" +
                      encodeURIComponent(
                        "[object Array]" ===
                          Object.prototype.toString.call(e[o])
                          ? i(e[o])
                          : e[o]
                      )));
                return t;
              }),
              (r.prototype._computeRequestHeaders = function (t, o) {
                var r = e(4),
                  n = t ? this._ua + ";" + t : this._ua,
                  i = {
                    "x-algolia-agent": n,
                    "x-algolia-application-id": this.applicationID,
                  };
                return (
                  o !== !1 && (i["x-algolia-api-key"] = this.apiKey),
                  this.userToken && (i["x-algolia-usertoken"] = this.userToken),
                  this.securityTags &&
                    (i["x-algolia-tagfilters"] = this.securityTags),
                  r(this.extraHeaders, function (e, t) {
                    i[t] = e;
                  }),
                  i
                );
              }),
              (r.prototype.search = function (t, o, r) {
                var n = e(7),
                  i = e(26),
                  s = "Usage: client.search(arrayOfQueries[, callback])";
                if (!n(t)) throw new Error(s);
                "function" == typeof o
                  ? ((r = o), (o = {}))
                  : void 0 === o && (o = {});
                var a = this,
                  c = {
                    requests: i(t, function (e) {
                      var t = "";
                      return (
                        void 0 !== e.query &&
                          (t += "query=" + encodeURIComponent(e.query)),
                        {
                          indexName: e.indexName,
                          params: a._getSearchParams(e.params, t),
                        }
                      );
                    }),
                  },
                  u = i(c.requests, function (e, t) {
                    return (
                      t +
                      "=" +
                      encodeURIComponent(
                        "/1/indexes/" +
                          encodeURIComponent(e.indexName) +
                          "?" +
                          e.params
                      )
                    );
                  }).join("&"),
                  l = "/1/indexes/*/queries";
                return (
                  void 0 !== o.strategy && (l += "?strategy=" + o.strategy),
                  this._jsonRequest({
                    cache: this.cache,
                    method: "POST",
                    url: l,
                    body: c,
                    hostType: "read",
                    fallback: {
                      method: "GET",
                      url: "/1/indexes/*",
                      body: { params: u },
                    },
                    callback: r,
                  })
                );
              }),
              (r.prototype.setSecurityTags = function (e) {
                if ("[object Array]" === Object.prototype.toString.call(e)) {
                  for (var t = [], o = 0; o < e.length; ++o)
                    if (
                      "[object Array]" === Object.prototype.toString.call(e[o])
                    ) {
                      for (var r = [], n = 0; n < e[o].length; ++n)
                        r.push(e[o][n]);
                      t.push("(" + r.join(",") + ")");
                    } else t.push(e[o]);
                  e = t.join(",");
                }
                this.securityTags = e;
              }),
              (r.prototype.setUserToken = function (e) {
                this.userToken = e;
              }),
              (r.prototype.clearCache = function () {
                this.cache = {};
              }),
              (r.prototype.setRequestTimeout = function (e) {
                e &&
                  (this._timeouts.connect =
                    this._timeouts.read =
                    this._timeouts.write =
                      e);
              }),
              (r.prototype.setTimeouts = function (e) {
                this._timeouts = e;
              }),
              (r.prototype.getTimeouts = function () {
                return this._timeouts;
              }),
              (r.prototype._getAppIdData = function () {
                var e = p.get(this.applicationID);
                return null !== e && this._cacheAppIdData(e), e;
              }),
              (r.prototype._setAppIdData = function (e) {
                return (
                  (e.lastChange = new Date().getTime()),
                  this._cacheAppIdData(e),
                  p.set(this.applicationID, e)
                );
              }),
              (r.prototype._checkAppIdData = function () {
                var e = this._getAppIdData(),
                  t = new Date().getTime();
                return null === e || t - e.lastChange > d
                  ? this._resetInitialAppIdData(e)
                  : e;
              }),
              (r.prototype._resetInitialAppIdData = function (e) {
                var t = e || {};
                return (
                  (t.hostIndexes = { read: 0, write: 0 }),
                  (t.timeoutMultiplier = 1),
                  (t.shuffleResult = t.shuffleResult || s([1, 2, 3])),
                  this._setAppIdData(t)
                );
              }),
              (r.prototype._cacheAppIdData = function (e) {
                (this._hostIndexes = e.hostIndexes),
                  (this._timeoutMultiplier = e.timeoutMultiplier),
                  (this._shuffleResult = e.shuffleResult);
              }),
              (r.prototype._partialAppIdDataUpdate = function (t) {
                var o = e(4),
                  r = this._getAppIdData();
                return (
                  o(t, function (e, t) {
                    r[t] = e;
                  }),
                  this._setAppIdData(r)
                );
              }),
              (r.prototype._getHostByType = function (e) {
                return this.hosts[e][this._getHostIndexByType(e)];
              }),
              (r.prototype._getTimeoutMultiplier = function () {
                return this._timeoutMultiplier;
              }),
              (r.prototype._getHostIndexByType = function (e) {
                return this._hostIndexes[e];
              }),
              (r.prototype._setHostIndexByType = function (t, o) {
                var r = e(21),
                  n = r(this._hostIndexes);
                return (
                  (n[o] = t),
                  this._partialAppIdDataUpdate({ hostIndexes: n }),
                  t
                );
              }),
              (r.prototype._incrementHostIndex = function (e) {
                return this._setHostIndexByType(
                  (this._getHostIndexByType(e) + 1) % this.hosts[e].length,
                  e
                );
              }),
              (r.prototype._incrementTimeoutMultipler = function () {
                var e = Math.max(this._timeoutMultiplier + 1, 4);
                return this._partialAppIdDataUpdate({ timeoutMultiplier: e });
              }),
              (r.prototype._getTimeoutsForRequest = function (e) {
                return {
                  connect: this._timeouts.connect * this._timeoutMultiplier,
                  complete: this._timeouts[e] * this._timeoutMultiplier,
                };
              });
          }).call(this, e(11));
        },
        {
          1: 1,
          11: 11,
          14: 14,
          21: 21,
          24: 24,
          25: 25,
          26: 26,
          30: 30,
          4: 4,
          7: 7,
        },
      ],
      14: [
        function (e, t, o) {
          function r(e, t) {
            (this.indexName = t),
              (this.as = e),
              (this.typeAheadArgs = null),
              (this.typeAheadValueOption = null),
              (this.cache = {});
          }
          var n = e(20),
            i = e(22),
            s = e(23);
          (t.exports = r),
            (r.prototype.clearCache = function () {
              this.cache = {};
            }),
            (r.prototype.search = n("query")),
            (r.prototype.similarSearch = n("similarQuery")),
            (r.prototype.browse = function (t, o, r) {
              var n,
                i,
                s = e(27),
                a = this;
              0 === arguments.length ||
              (1 === arguments.length && "function" == typeof arguments[0])
                ? ((n = 0), (r = arguments[0]), (t = void 0))
                : "number" == typeof arguments[0]
                ? ((n = arguments[0]),
                  "number" == typeof arguments[1]
                    ? (i = arguments[1])
                    : "function" == typeof arguments[1] &&
                      ((r = arguments[1]), (i = void 0)),
                  (t = void 0),
                  (o = void 0))
                : "object" == typeof arguments[0]
                ? ("function" == typeof arguments[1] && (r = arguments[1]),
                  (o = arguments[0]),
                  (t = void 0))
                : "string" == typeof arguments[0] &&
                  "function" == typeof arguments[1] &&
                  ((r = arguments[1]), (o = void 0)),
                (o = s({}, o || {}, { page: n, hitsPerPage: i, query: t }));
              var c = this.as._getSearchParams(o, "");
              return this.as._jsonRequest({
                method: "POST",
                url:
                  "/1/indexes/" + encodeURIComponent(a.indexName) + "/browse",
                body: { params: c },
                hostType: "read",
                callback: r,
              });
            }),
            (r.prototype.browseFrom = function (e, t) {
              return this.as._jsonRequest({
                method: "POST",
                url:
                  "/1/indexes/" +
                  encodeURIComponent(this.indexName) +
                  "/browse",
                body: { cursor: e },
                hostType: "read",
                callback: t,
              });
            }),
            (r.prototype.searchForFacetValues = function (t, o) {
              var r = e(21),
                n = e(28),
                i =
                  "Usage: index.searchForFacetValues({facetName, facetQuery, ...params}[, callback])";
              if (void 0 === t.facetName || void 0 === t.facetQuery)
                throw new Error(i);
              var s = t.facetName,
                a = n(r(t), function (e) {
                  return "facetName" === e;
                }),
                c = this.as._getSearchParams(a, "");
              return this.as._jsonRequest({
                method: "POST",
                url:
                  "/1/indexes/" +
                  encodeURIComponent(this.indexName) +
                  "/facets/" +
                  encodeURIComponent(s) +
                  "/query",
                hostType: "read",
                body: { params: c },
                callback: o,
              });
            }),
            (r.prototype.searchFacet = i(function (e, t) {
              return this.searchForFacetValues(e, t);
            }, s(
              "index.searchFacet(params[, callback])",
              "index.searchForFacetValues(params[, callback])"
            ))),
            (r.prototype._search = function (e, t, o, r) {
              return this.as._jsonRequest({
                cache: this.cache,
                method: "POST",
                url:
                  t ||
                  "/1/indexes/" + encodeURIComponent(this.indexName) + "/query",
                body: { params: e },
                hostType: "read",
                fallback: {
                  method: "GET",
                  url: "/1/indexes/" + encodeURIComponent(this.indexName),
                  body: { params: e },
                },
                callback: o,
                additionalUA: r,
              });
            }),
            (r.prototype.getObject = function (e, t, o) {
              var r = this;
              (1 !== arguments.length && "function" != typeof t) ||
                ((o = t), (t = void 0));
              var n = "";
              if (void 0 !== t) {
                n = "?attributes=";
                for (var i = 0; i < t.length; ++i)
                  0 !== i && (n += ","), (n += t[i]);
              }
              return this.as._jsonRequest({
                method: "GET",
                url:
                  "/1/indexes/" +
                  encodeURIComponent(r.indexName) +
                  "/" +
                  encodeURIComponent(e) +
                  n,
                hostType: "read",
                callback: o,
              });
            }),
            (r.prototype.getObjects = function (t, o, r) {
              var n = e(7),
                i = e(26),
                s = "Usage: index.getObjects(arrayOfObjectIDs[, callback])";
              if (!n(t)) throw new Error(s);
              var a = this;
              (1 !== arguments.length && "function" != typeof o) ||
                ((r = o), (o = void 0));
              var c = {
                requests: i(t, function (e) {
                  var t = { indexName: a.indexName, objectID: e };
                  return o && (t.attributesToRetrieve = o.join(",")), t;
                }),
              };
              return this.as._jsonRequest({
                method: "POST",
                url: "/1/indexes/*/objects",
                hostType: "read",
                body: c,
                callback: r,
              });
            }),
            (r.prototype.as = null),
            (r.prototype.indexName = null),
            (r.prototype.typeAheadArgs = null),
            (r.prototype.typeAheadValueOption = null);
        },
        { 20: 20, 21: 21, 22: 22, 23: 23, 26: 26, 27: 27, 28: 28, 7: 7 },
      ],
      15: [
        function (e, t, o) {
          "use strict";
          var r = e(13),
            n = e(16);
          t.exports = n(r, "(lite) ");
        },
        { 13: 13, 16: 16 },
      ],
      16: [
        function (e, t, o) {
          (function (o) {
            "use strict";
            var r = e(5),
              n = r.Promise || e(3).Promise;
            t.exports = function (t, i) {
              function s(t, o, r) {
                var n = e(21),
                  i = e(17);
                return (
                  (r = n(r || {})),
                  void 0 === r.protocol && (r.protocol = i()),
                  (r._ua = r._ua || s.ua),
                  new a(t, o, r)
                );
              }
              function a() {
                t.apply(this, arguments);
              }
              var c = e(6),
                u = e(24),
                l = e(18),
                p = e(19),
                f = e(29);
              (i = i || ""),
                "debug" === o.env.NODE_ENV && e(1).enable("algoliasearch*"),
                (s.version = e(31)),
                (s.ua = "Algolia for vanilla JavaScript " + i + s.version),
                (s.initPlaces = f(s)),
                (r.__algolia = { debug: e(1), algoliasearch: s });
              var d = {
                hasXMLHttpRequest: "XMLHttpRequest" in r,
                hasXDomainRequest: "XDomainRequest" in r,
              };
              return (
                d.hasXMLHttpRequest &&
                  (d.cors = "withCredentials" in new XMLHttpRequest()),
                c(a, t),
                (a.prototype._request = function (e, t) {
                  return new n(function (o, r) {
                    function n() {
                      if (!h) {
                        clearTimeout(f);
                        var e;
                        try {
                          e = {
                            body: JSON.parse(m.responseText),
                            responseText: m.responseText,
                            statusCode: m.status,
                            headers:
                              (m.getAllResponseHeaders &&
                                m.getAllResponseHeaders()) ||
                              {},
                          };
                        } catch (t) {
                          e = new u.UnparsableJSON({ more: m.responseText });
                        }
                        e instanceof u.UnparsableJSON ? r(e) : o(e);
                      }
                    }
                    function i(e) {
                      h || (clearTimeout(f), r(new u.Network({ more: e })));
                    }
                    function s() {
                      (h = !0), m.abort(), r(new u.RequestTimeout());
                    }
                    function a() {
                      (g = !0),
                        clearTimeout(f),
                        (f = setTimeout(s, t.timeouts.complete));
                    }
                    function c() {
                      g || a();
                    }
                    function p() {
                      !g && m.readyState > 1 && a();
                    }
                    if (!d.cors && !d.hasXDomainRequest)
                      return void r(new u.Network("CORS not supported"));
                    e = l(e, t.headers);
                    var f,
                      h,
                      y = t.body,
                      m = d.cors ? new XMLHttpRequest() : new XDomainRequest(),
                      g = !1;
                    (f = setTimeout(s, t.timeouts.connect)),
                      (m.onprogress = c),
                      "onreadystatechange" in m && (m.onreadystatechange = p),
                      (m.onload = n),
                      (m.onerror = i),
                      m instanceof XMLHttpRequest
                        ? m.open(t.method, e, !0)
                        : m.open(t.method, e),
                      d.cors &&
                        (y &&
                          ("POST" === t.method
                            ? m.setRequestHeader(
                                "content-type",
                                "application/x-www-form-urlencoded"
                              )
                            : m.setRequestHeader(
                                "content-type",
                                "application/json"
                              )),
                        m.setRequestHeader("accept", "application/json")),
                      m.send(y);
                  });
                }),
                (a.prototype._request.fallback = function (e, t) {
                  return (
                    (e = l(e, t.headers)),
                    new n(function (o, r) {
                      p(e, t, function (e, t) {
                        return e ? void r(e) : void o(t);
                      });
                    })
                  );
                }),
                (a.prototype._promise = {
                  reject: function (e) {
                    return n.reject(e);
                  },
                  resolve: function (e) {
                    return n.resolve(e);
                  },
                  delay: function (e) {
                    return new n(function (t) {
                      setTimeout(t, e);
                    });
                  },
                }),
                s
              );
            };
          }).call(this, e(11));
        },
        {
          1: 1,
          11: 11,
          17: 17,
          18: 18,
          19: 19,
          21: 21,
          24: 24,
          29: 29,
          3: 3,
          31: 31,
          5: 5,
          6: 6,
        },
      ],
      17: [
        function (e, t, o) {
          "use strict";
          function r() {
            var e = window.document.location.protocol;
            return "http:" !== e && "https:" !== e && (e = "http:"), e;
          }
          t.exports = r;
        },
        {},
      ],
      18: [
        function (e, t, o) {
          "use strict";
          function r(e, t) {
            return (e += /\?/.test(e) ? "&" : "?"), e + n(t);
          }
          t.exports = r;
          var n = e(12);
        },
        { 12: 12 },
      ],
      19: [
        function (e, t, o) {
          "use strict";
          function r(e, t, o) {
            function r() {
              t.debug("JSONP: success"),
                m ||
                  f ||
                  ((m = !0),
                  p ||
                    (t.debug(
                      "JSONP: Fail. Script loaded but did not call the callback"
                    ),
                    a(),
                    o(new n.JSONPScriptFail())));
            }
            function s() {
              ("loaded" !== this.readyState &&
                "complete" !== this.readyState) ||
                r();
            }
            function a() {
              clearTimeout(g),
                (h.onload = null),
                (h.onreadystatechange = null),
                (h.onerror = null),
                d.removeChild(h);
            }
            function c() {
              try {
                delete window[y], delete window[y + "_loaded"];
              } catch (e) {
                window[y] = window[y + "_loaded"] = void 0;
              }
            }
            function u() {
              t.debug("JSONP: Script timeout"),
                (f = !0),
                a(),
                o(new n.RequestTimeout());
            }
            function l() {
              t.debug("JSONP: Script error"),
                m || f || (a(), o(new n.JSONPScriptError()));
            }
            if ("GET" !== t.method)
              return void o(
                new Error(
                  "Method " + t.method + " " + e + " is not supported by JSONP."
                )
              );
            t.debug("JSONP: start");
            var p = !1,
              f = !1;
            i += 1;
            var d = document.getElementsByTagName("head")[0],
              h = document.createElement("script"),
              y = "algoliaJSONP_" + i,
              m = !1;
            (window[y] = function (e) {
              return (
                c(),
                f
                  ? void t.debug("JSONP: Late answer, ignoring")
                  : ((p = !0), a(), void o(null, { body: e }))
              );
            }),
              (e += "&callback=" + y),
              t.jsonBody && t.jsonBody.params && (e += "&" + t.jsonBody.params);
            var g = setTimeout(u, t.timeouts.complete);
            (h.onreadystatechange = s),
              (h.onload = r),
              (h.onerror = l),
              (h.async = !0),
              (h.defer = !0),
              (h.src = e),
              d.appendChild(h);
          }
          t.exports = r;
          var n = e(24),
            i = 0;
        },
        { 24: 24 },
      ],
      20: [
        function (e, t, o) {
          function r(e, t) {
            return function (o, r, i) {
              if (
                ("function" == typeof o && "object" == typeof r) ||
                "object" == typeof i
              )
                throw new n.AlgoliaSearchError(
                  "index.search usage is index.search(query, params, cb)"
                );
              0 === arguments.length || "function" == typeof o
                ? ((i = o), (o = ""))
                : (1 !== arguments.length && "function" != typeof r) ||
                  ((i = r), (r = void 0)),
                "object" == typeof o && null !== o
                  ? ((r = o), (o = void 0))
                  : (void 0 !== o && null !== o) || (o = "");
              var s = "";
              void 0 !== o && (s += e + "=" + encodeURIComponent(o));
              var a;
              return (
                void 0 !== r &&
                  (r.additionalUA &&
                    ((a = r.additionalUA), delete r.additionalUA),
                  (s = this.as._getSearchParams(r, s))),
                this._search(s, t, i, a)
              );
            };
          }
          t.exports = r;
          var n = e(24);
        },
        { 24: 24 },
      ],
      21: [
        function (e, t, o) {
          t.exports = function (e) {
            return JSON.parse(JSON.stringify(e));
          };
        },
        {},
      ],
      22: [
        function (e, t, o) {
          t.exports = function (e, t) {
            function o() {
              return r || (console.warn(t), (r = !0)), e.apply(this, arguments);
            }
            var r = !1;
            return o;
          };
        },
        {},
      ],
      23: [
        function (e, t, o) {
          t.exports = function (e, t) {
            var o = e.toLowerCase().replace(/[\.\(\)]/g, "");
            return (
              "algoliasearch: `" +
              e +
              "` was replaced by `" +
              t +
              "`. Please see https://github.com/algolia/algoliasearch-client-javascript/wiki/Deprecated#" +
              o
            );
          };
        },
        {},
      ],
      24: [
        function (e, t, o) {
          "use strict";
          function r(t, o) {
            var r = e(4),
              n = this;
            "function" == typeof Error.captureStackTrace
              ? Error.captureStackTrace(this, this.constructor)
              : (n.stack =
                  new Error().stack ||
                  "Cannot get a stacktrace, browser is too old"),
              (this.name = "AlgoliaSearchError"),
              (this.message = t || "Unknown error"),
              o &&
                r(o, function (e, t) {
                  n[t] = e;
                });
          }
          function n(e, t) {
            function o() {
              var o = Array.prototype.slice.call(arguments, 0);
              "string" != typeof o[0] && o.unshift(t),
                r.apply(this, o),
                (this.name = "AlgoliaSearch" + e + "Error");
            }
            return i(o, r), o;
          }
          var i = e(6);
          i(r, Error),
            (t.exports = {
              AlgoliaSearchError: r,
              UnparsableJSON: n(
                "UnparsableJSON",
                "Could not parse the incoming response as JSON, see err.more for details"
              ),
              RequestTimeout: n(
                "RequestTimeout",
                "Request timedout before getting a response"
              ),
              Network: n("Network", "Network issue, see err.more for details"),
              JSONPScriptFail: n(
                "JSONPScriptFail",
                "<script> was loaded but did not call our provided callback"
              ),
              JSONPScriptError: n(
                "JSONPScriptError",
                "<script> unable to load due to an `error` event on it"
              ),
              Unknown: n("Unknown", "Unknown error occured"),
            });
        },
        { 4: 4, 6: 6 },
      ],
      25: [
        function (e, t, o) {
          t.exports = function (e, t) {
            t(e, 0);
          };
        },
        {},
      ],
      26: [
        function (e, t, o) {
          var r = e(4);
          t.exports = function (e, t) {
            var o = [];
            return (
              r(e, function (r, n) {
                o.push(t(r, n, e));
              }),
              o
            );
          };
        },
        { 4: 4 },
      ],
      27: [
        function (e, t, o) {
          var r = e(4);
          t.exports = function n(e) {
            var t = Array.prototype.slice.call(arguments);
            return (
              r(t, function (t) {
                for (var o in t)
                  t.hasOwnProperty(o) &&
                    ("object" == typeof e[o] && "object" == typeof t[o]
                      ? (e[o] = n({}, e[o], t[o]))
                      : void 0 !== t[o] && (e[o] = t[o]));
              }),
              e
            );
          };
        },
        { 4: 4 },
      ],
      28: [
        function (e, t, o) {
          t.exports = function (t, o) {
            var r = e(9),
              n = e(4),
              i = {};
            return (
              n(r(t), function (e) {
                o(e) !== !0 && (i[e] = t[e]);
              }),
              i
            );
          };
        },
        { 4: 4, 9: 9 },
      ],
      29: [
        function (e, t, o) {
          function r(t) {
            return function (o, r, i) {
              var s = e(21);
              (i = (i && s(i)) || {}),
                (i.hosts = i.hosts || [
                  "places-dsn.algolia.net",
                  "places-1.algolianet.com",
                  "places-2.algolianet.com",
                  "places-3.algolianet.com",
                ]),
                (0 !== arguments.length &&
                  "object" != typeof o &&
                  void 0 !== o) ||
                  ((o = ""), (r = ""), (i._allowEmptyCredentials = !0));
              var a = t(o, r, i),
                c = a.initIndex("places");
              return (
                (c.search = n("query", "/1/places/query")),
                (c.getObject = function (e, t) {
                  return this.as._jsonRequest({
                    method: "GET",
                    url: "/1/places/" + encodeURIComponent(e),
                    hostType: "read",
                    callback: t,
                  });
                }),
                c
              );
            };
          }
          t.exports = r;
          var n = e(20);
        },
        { 20: 20, 21: 21 },
      ],
      30: [
        function (e, t, o) {
          (function (o) {
            function r(e, t) {
              return c("localStorage failed with", t), s(), (a = l), a.get(e);
            }
            function n(e, t) {
              return 1 === arguments.length ? a.get(e) : a.set(e, t);
            }
            function i() {
              try {
                return (
                  "localStorage" in o &&
                  null !== o.localStorage &&
                  (o.localStorage[u] ||
                    o.localStorage.setItem(u, JSON.stringify({})),
                  !0)
                );
              } catch (e) {
                return !1;
              }
            }
            function s() {
              try {
                o.localStorage.removeItem(u);
              } catch (e) {}
            }
            var a,
              c = e(1)("algoliasearch:src/hostIndexState.js"),
              u = "algoliasearch-client-js",
              l = {
                state: {},
                set: function (e, t) {
                  return (this.state[e] = t), this.state[e];
                },
                get: function (e) {
                  return this.state[e] || null;
                },
              },
              p = {
                set: function (e, t) {
                  l.set(e, t);
                  try {
                    var n = JSON.parse(o.localStorage[u]);
                    return (
                      (n[e] = t), (o.localStorage[u] = JSON.stringify(n)), n[e]
                    );
                  } catch (i) {
                    return r(e, i);
                  }
                },
                get: function (e) {
                  try {
                    return JSON.parse(o.localStorage[u])[e] || null;
                  } catch (t) {
                    return r(e, t);
                  }
                },
              };
            (a = i() ? p : l),
              (t.exports = { get: n, set: n, supportsLocalStorage: i });
          }).call(
            this,
            "undefined" != typeof global
              ? global
              : "undefined" != typeof self
              ? self
              : "undefined" != typeof window
              ? window
              : {}
          );
        },
        { 1: 1 },
      ],
      31: [
        function (e, t, o) {
          "use strict";
          t.exports = "3.24.7";
        },
        {},
      ],
    },
    {},
    [15]
  )(15);
});
!(function ($) {
  $.fn.igsearchbox = function (args) {
    const client = algoliasearch(args.algolia_appid, args.algolia_key),
      globalIndex = client.initIndex(args.algolia_index + args.lang),
      spotlightedIndex = client.initIndex(
        args.algolia_index + args.lang + "_spotlighted_desc"
      ),
      currency_tx = args.currency_tx,
      mapper = args.mapper,
      $this = $(this),
      $body = $("body");
    let currency_format = args.currency_format,
      $searchWrapper = $(".search-wrapper"),
      noResultHtmlCache = null;
    $("#ig-header-search-box-submit").click(function () {
      initSearchPage();
      $(".search-input").focus();
    });
    this.keyup(function () {
      initSearchPage();
    });
    function initSearchPage() {
      const query = $this.val().trim(),
        $glossy = $(".glossy");
      if ($glossy.hasClass("backdrop")) {
        $glossy.removeClass("backdrop");
      }
      const $selectedNavbarMenu = $(".product-menu .nav.selected");
      if ($selectedNavbarMenu.length > 0) {
        $selectedNavbarMenu.removeClass("selected");
      }
      $(
        "#search-platform, #search-type, #search-category, #ig-search-sortby"
      ).each(function (i, item) {
        const $filter = $(item);
        if ($filter.val()) {
          $filter.data("is-reset", true).val(null).trigger("change");
        }
      });
      $(".ig-pm-resetfields:visible").click();
      $("#ig-pm-filters")
        .find("input[name=instock],input[name=preorder],input[name=is_draft]")
        .filter(":checked")
        .prop("checked", false);
      if (0 === $searchWrapper.length || $(".sub-home-header").length > 0) {
        $searchWrapper = $(
          '<div class="search-container search-wrapper">'
        ).appendTo($(".main-content").empty());
        const $body = $("body");
        $body.removeClass("search-backdrop");
        $(".search-filters-container").removeClass("hidden");
        $("#ig-header-search-box-submit").fadeOut(300);
        $(".actions-footer").hide();
        $("#ig-pm-morefilters").removeClass("hidden");
        initSearchSelects();
      }
      let index =
        "string" === typeof query && query.length > 0
          ? spotlightedIndex
          : globalIndex;
      index.search(
        query,
        { hitsPerPage: 60, filters: args.filters },
        function (err, content) {
          if (content && content.query == $this.val()) {
            let hits = [];
            for (let i = 0; i < content.hits.length; i++) {
              const hit = content.hits[i];
              if (mapper) {
                mapper(hit);
              }
              if (hit.platforms.includes("12")) {
                hit.platform_type = "xbox-series-x-s";
              } else if (hit.platforms.includes("11")) {
                hit.platform_type = "xbox-one";
              } else if (hit.platforms.includes("10")) {
                hit.platform_type = "xbox-360";
              }
              if (hit.platform_type === "nintendo-eshop") {
                hit.platform_type = "switch";
              }
              let platformIcon =
                '<div class="platform platform-' +
                hit.platform_type +
                '">' +
                '<div class="icon-' +
                hit.platform_type +
                ' icon-s"></div>' +
                "</div>";
              const canDisplayVideoPreview =
                !window.isIOS && hit.can_display_video_preview == "1";
              let $li = $(
                '<div class="item force-badge">' +
                  '<a class="cover ' +
                  (canDisplayVideoPreview ? "video" : "") +
                  '">' +
                  "<picture>" +
                  '<img class="picture" />' +
                  "</picture>" +
                  (canDisplayVideoPreview
                    ? '<video class="video-preview" loop="" muted="" preload="none"><source type="video/webm" /></video>'
                    : "") +
                  (!hit.platforms.includes("1") ? platformIcon : "") +
                  (hit.discount &&
                  hit.discount < 100 &&
                  (hit.has_stock || hit.preorder)
                    ? '<div class="discount"></div>'
                    : "") +
                  "</a>" +
                  '<div class="information">' +
                  '<div class="text">' +
                  '<div class="name"><div class="title"></div></div>' +
                  (hit.preorder == 1 ? '<div class="date"></div>' : "") +
                  "</div>" +
                  (hit.price &&
                  (hit.has_stock || hit.preorder) &&
                  !hit.is_free_to_play
                    ? '<div class="price"></div>'
                    : "") +
                  "</div>" +
                  "</div>"
              )
                .data("price", hit.price)
                .data("region", hit.region);
              $li
                .addClass(
                  i <= 3 && content.hits.length > 8
                    ? "categoryBest item"
                    : "item"
                )
                .fadeIn(300);
              const $videoPreview = $li.find(".video-preview");
              if ($videoPreview.length > 0) {
                $videoPreview
                  .find("source")
                  .attr(
                    "src",
                    `/videos/products/${hit.prod_id}/800x450/${hit.seo_name}-preview.webm?v=${hit.video_preview_updated_at}`
                  );
              }
              const $picture = $li.find(".picture");
              $picture.attr("src", "/themes/igv2/images/lazy.svg");
              const image = new Image();
              image.src =
                hit.cover.replace("157x218", "380x218") +
                "?v=" +
                hit.updated_at;
              image.onload = function () {
                $picture.attr("src", image.src);
              };
              $li.find("a").attr("href", hit.url);
              if (hit.url_target) {
                $li.find("a").attr("target", hit.url_target);
              }
              let price = hit.price;
              if (price) {
                price = parseFloat(price);
                if (price <= 0) {
                  price = null;
                } else {
                  if (currency_tx) {
                    price = price * currency_tx;
                  }
                  price = currency_format.replace("%s", price.toFixed(2));
                }
              }
              let fullName = hit.name;
              if (hit.region != "Worldwide") {
                fullName += " - " + hit.region;
              }
              $li.find(".price").html(price ? price : "N/A");
              $li
                .find(".discount")
                .text(
                  hit.discount > 0 &&
                    hit.discount < 100 &&
                    (hit.has_stock || hit.preorder)
                    ? -hit.discount + "%"
                    : "N/A"
                );
              $li.find(".title").text(fullName).attr("title", fullName);
              if (hit.is_dlc == 1) {
                $li.find(".name").prepend('<span class="dlc">DLC ');
              }
              if (hit.preorder == 1) {
                $li
                  .find(".date")
                  .append(
                    '<span class="preorder ">' +
                      window.globalLangs._LANGUAGES_PRODUCT_BADGE_PREORDER_
                  )
                  .append(formatPreorderDate(hit.avail_date));
              }
              if (
                "undefined" !== typeof hit.badges &&
                hit.badges.includes("black_friday")
              ) {
                $li
                  .find(".name")
                  .prepend(
                    '<span class="promo-badge">' +
                      window.globalLangs._LANGUAGES_PRODUCT_BADGE_BLACK_FRIDAY_
                  );
              }
              hits.push($li);
            }
            const baseQueryUrl =
              $("#ig-search-form").attr("action") + "?query=" + content.query;
            $("#ig-pm-filters input[name=query]").val(content.query);
            window.history.pushState("", "", baseQueryUrl);
            $searchWrapper.html(
              $('<div class="search listing-items">').append(hits)
            );
            if (content.nbPages > 1) {
              const $pagination = $('<ul class="pagination"></ul>').appendTo(
                  $searchWrapper
                ),
                numberOfPages =
                  Math.ceil((parseInt(content.nbHits) - 59) / 60) + 1;
              $pagination.append('<li class="selected">1</li>');
              $pagination.append(
                $("<li>").append(
                  $("<a>")
                    .attr("href", baseQueryUrl + "&page=2")
                    .text("2")
                )
              );
              if (content.nbPages >= 4) {
                $pagination.append('<li class="dotted">...</li>');
              }
              if (content.nbPages > 2) {
                $pagination.append(
                  $("<li>").append(
                    $("<a>")
                      .attr("href", baseQueryUrl + "&page=" + numberOfPages)
                      .text(numberOfPages)
                  )
                );
              }
              $pagination.append(
                $("<li>").append(
                  $(
                    '<a class="arrow"><div class="icon-arrow icon-xs"></div>'
                  ).attr("href", baseQueryUrl + "&page=2")
                )
              );
            }
            let $searchQuantityResult = $(".search-quantity-result");
            if ($searchQuantityResult.length === 0) {
              $searchQuantityResult = $(
                '<h2 class="search-quantity-result"></h2>'
              );
              $(".search-container.search-wrapper").prepend(
                $searchQuantityResult
              );
            }
            if (content.nbHits == 0) {
              if (!noResultHtmlCache) {
                $.get(
                  window.location.pathname,
                  { noresult: 1, ajax: 1 },
                  function (html) {
                    noResultHtmlCache = html;
                    $searchWrapper.html(noResultHtmlCache);
                  }
                );
              } else {
                $searchWrapper.html(noResultHtmlCache);
              }
              $searchQuantityResult.text("");
            } else {
              $searchQuantityResult.text(
                sprintf(
                  parseInt(content.nbHits) > 1
                    ? window._SEARCH_RESULTS_
                    : window._SEARCH_RESULT_,
                  content.nbHits
                )
              );
            }
          }
        }
      );
    }
  };
})(window.jQuery);
!(function () {
  "use strict";
  function a(a, b) {
    var c,
      d = Object.keys(b);
    for (c = 0; c < d.length; c++)
      a = a.replace(new RegExp("\\{" + d[c] + "\\}", "gi"), b[d[c]]);
    return a;
  }
  function b(a) {
    var b, c, d;
    if (!a)
      throw new Error(
        "cannot create a random attribute name for an undefined object"
      );
    (b = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz"), (c = "");
    do {
      for (c = "", d = 0; d < 12; d++)
        c += b[Math.floor(Math.random() * b.length)];
    } while (a[c]);
    return c;
  }
  function c(a) {
    var b = {
      left: "start",
      right: "end",
      center: "middle",
      start: "start",
      end: "end",
    };
    return b[a] || b.start;
  }
  function d(a) {
    var b = {
      alphabetic: "alphabetic",
      hanging: "hanging",
      top: "text-before-edge",
      bottom: "text-after-edge",
      middle: "central",
    };
    return b[a] || b.alphabetic;
  }
  var e, f, g, h, i;
  (i = (function (a, b) {
    var c,
      d,
      e,
      f = {};
    for (a = a.split(","), b = b || 10, c = 0; c < a.length; c += 2)
      (d = "&" + a[c + 1] + ";"),
        (e = parseInt(a[c], b)),
        (f[d] = "&#" + e + ";");
    return (f["\\xa0"] = "&#160;"), f;
  })(
    "50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",
    32
  )),
    (e = {
      strokeStyle: {
        svgAttr: "stroke",
        canvas: "#000000",
        svg: "none",
        apply: "stroke",
      },
      fillStyle: {
        svgAttr: "fill",
        canvas: "#000000",
        svg: null,
        apply: "fill",
      },
      lineCap: {
        svgAttr: "stroke-linecap",
        canvas: "butt",
        svg: "butt",
        apply: "stroke",
      },
      lineJoin: {
        svgAttr: "stroke-linejoin",
        canvas: "miter",
        svg: "miter",
        apply: "stroke",
      },
      miterLimit: {
        svgAttr: "stroke-miterlimit",
        canvas: 10,
        svg: 4,
        apply: "stroke",
      },
      lineWidth: {
        svgAttr: "stroke-width",
        canvas: 1,
        svg: 1,
        apply: "stroke",
      },
      globalAlpha: {
        svgAttr: "opacity",
        canvas: 1,
        svg: 1,
        apply: "fill stroke",
      },
      font: { canvas: "10px sans-serif" },
      shadowColor: { canvas: "#000000" },
      shadowOffsetX: { canvas: 0 },
      shadowOffsetY: { canvas: 0 },
      shadowBlur: { canvas: 0 },
      textAlign: { canvas: "start" },
      textBaseline: { canvas: "alphabetic" },
      lineDash: {
        svgAttr: "stroke-dasharray",
        canvas: [],
        svg: null,
        apply: "stroke",
      },
    }),
    (g = function (a, b) {
      (this.__root = a), (this.__ctx = b);
    }),
    (g.prototype.addColorStop = function (b, c) {
      var d,
        e,
        f = this.__ctx.__createElement("stop");
      f.setAttribute("offset", b),
        -1 !== c.indexOf("rgba")
          ? ((d =
              /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi),
            (e = d.exec(c)),
            f.setAttribute(
              "stop-color",
              a("rgb({r},{g},{b})", { r: e[1], g: e[2], b: e[3] })
            ),
            f.setAttribute("stop-opacity", e[4]))
          : f.setAttribute("stop-color", c),
        this.__root.appendChild(f);
    }),
    (h = function (a, b) {
      (this.__root = a), (this.__ctx = b);
    }),
    (f = function (a) {
      var b,
        c = { width: 500, height: 500, enableMirroring: !1 };
      if (
        (arguments.length > 1
          ? ((b = c), (b.width = arguments[0]), (b.height = arguments[1]))
          : (b = a || c),
        !(this instanceof f))
      )
        return new f(b);
      (this.width = b.width || c.width),
        (this.height = b.height || c.height),
        (this.enableMirroring =
          void 0 !== b.enableMirroring ? b.enableMirroring : c.enableMirroring),
        (this.canvas = this),
        (this.__document = b.document || document),
        b.ctx
          ? (this.__ctx = b.ctx)
          : ((this.__canvas = this.__document.createElement("canvas")),
            (this.__ctx = this.__canvas.getContext("2d"))),
        this.__setDefaultStyles(),
        (this.__stack = [this.__getStyleState()]),
        (this.__groupStack = []),
        (this.__root = this.__document.createElementNS(
          "http://www.w3.org/2000/svg",
          "svg"
        )),
        this.__root.setAttribute("version", 1.1),
        this.__root.setAttribute("xmlns", "http://www.w3.org/2000/svg"),
        this.__root.setAttributeNS(
          "http://www.w3.org/2000/xmlns/",
          "xmlns:xlink",
          "http://www.w3.org/1999/xlink"
        ),
        this.__root.setAttribute("width", this.width),
        this.__root.setAttribute("height", this.height),
        (this.__ids = {}),
        (this.__defs = this.__document.createElementNS(
          "http://www.w3.org/2000/svg",
          "defs"
        )),
        this.__root.appendChild(this.__defs),
        (this.__currentElement = this.__document.createElementNS(
          "http://www.w3.org/2000/svg",
          "g"
        )),
        this.__root.appendChild(this.__currentElement);
    }),
    (f.prototype.__createElement = function (a, b, c) {
      void 0 === b && (b = {});
      var d,
        e,
        f = this.__document.createElementNS("http://www.w3.org/2000/svg", a),
        g = Object.keys(b);
      for (
        c && (f.setAttribute("fill", "none"), f.setAttribute("stroke", "none")),
          d = 0;
        d < g.length;
        d++
      )
        (e = g[d]), f.setAttribute(e, b[e]);
      return f;
    }),
    (f.prototype.__setDefaultStyles = function () {
      var a,
        b,
        c = Object.keys(e);
      for (a = 0; a < c.length; a++) (b = c[a]), (this[b] = e[b].canvas);
    }),
    (f.prototype.__applyStyleState = function (a) {
      var b,
        c,
        d = Object.keys(a);
      for (b = 0; b < d.length; b++) (c = d[b]), (this[c] = a[c]);
    }),
    (f.prototype.__getStyleState = function () {
      var a,
        b,
        c = {},
        d = Object.keys(e);
      for (a = 0; a < d.length; a++) (b = d[a]), (c[b] = this[b]);
      return c;
    }),
    (f.prototype.__applyStyleToCurrentElement = function (b) {
      var c = this.__currentElement,
        d = this.__currentElementsToStyle;
      d &&
        (c.setAttribute(b, ""),
        (c = d.element),
        d.children.forEach(function (a) {
          a.setAttribute(b, "");
        }));
      var f,
        i,
        j,
        k,
        l,
        m,
        n = Object.keys(e);
      for (f = 0; f < n.length; f++)
        if (((i = e[n[f]]), (j = this[n[f]]), i.apply))
          if (j instanceof h) {
            if (j.__ctx)
              for (; j.__ctx.__defs.childNodes.length; )
                (k = j.__ctx.__defs.childNodes[0].getAttribute("id")),
                  (this.__ids[k] = k),
                  this.__defs.appendChild(j.__ctx.__defs.childNodes[0]);
            c.setAttribute(
              i.apply,
              a("url(#{id})", { id: j.__root.getAttribute("id") })
            );
          } else if (j instanceof g)
            c.setAttribute(
              i.apply,
              a("url(#{id})", { id: j.__root.getAttribute("id") })
            );
          else if (-1 !== i.apply.indexOf(b) && i.svg !== j)
            if (
              ("stroke" !== i.svgAttr && "fill" !== i.svgAttr) ||
              -1 === j.indexOf("rgba")
            ) {
              var o = i.svgAttr;
              if (
                "globalAlpha" === n[f] &&
                ((o = b + "-" + i.svgAttr), c.getAttribute(o))
              )
                continue;
              c.setAttribute(o, j);
            } else {
              (l =
                /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d?\.?\d*)\s*\)/gi),
                (m = l.exec(j)),
                c.setAttribute(
                  i.svgAttr,
                  a("rgb({r},{g},{b})", { r: m[1], g: m[2], b: m[3] })
                );
              var p = m[4],
                q = this.globalAlpha;
              null != q && (p *= q), c.setAttribute(i.svgAttr + "-opacity", p);
            }
    }),
    (f.prototype.__closestGroupOrSvg = function (a) {
      return (
        (a = a || this.__currentElement),
        "g" === a.nodeName || "svg" === a.nodeName
          ? a
          : this.__closestGroupOrSvg(a.parentNode)
      );
    }),
    (f.prototype.getSerializedSvg = function (a) {
      var b,
        c,
        d,
        e,
        f,
        g,
        h = new XMLSerializer().serializeToString(this.__root);
      if (
        ((g =
          /xmlns="http:\/\/www\.w3\.org\/2000\/svg".+xmlns="http:\/\/www\.w3\.org\/2000\/svg/gi),
        g.test(h) &&
          (h = h.replace(
            'xmlns="http://www.w3.org/2000/svg',
            'xmlns:xlink="http://www.w3.org/1999/xlink'
          )),
        a)
      )
        for (b = Object.keys(i), c = 0; c < b.length; c++)
          (d = b[c]),
            (e = i[d]),
            (f = new RegExp(d, "gi")),
            f.test(h) && (h = h.replace(f, e));
      return h;
    }),
    (f.prototype.getSvg = function () {
      return this.__root;
    }),
    (f.prototype.save = function () {
      var a = this.__createElement("g"),
        b = this.__closestGroupOrSvg();
      this.__groupStack.push(b),
        b.appendChild(a),
        (this.__currentElement = a),
        this.__stack.push(this.__getStyleState());
    }),
    (f.prototype.restore = function () {
      (this.__currentElement = this.__groupStack.pop()),
        (this.__currentElementsToStyle = null),
        this.__currentElement ||
          (this.__currentElement = this.__root.childNodes[1]);
      var a = this.__stack.pop();
      this.__applyStyleState(a);
    }),
    (f.prototype.__addTransform = function (a) {
      var b = this.__closestGroupOrSvg();
      if (b.childNodes.length > 0) {
        "path" === this.__currentElement.nodeName &&
          (this.__currentElementsToStyle ||
            (this.__currentElementsToStyle = { element: b, children: [] }),
          this.__currentElementsToStyle.children.push(this.__currentElement),
          this.__applyCurrentDefaultPath());
        var c = this.__createElement("g");
        b.appendChild(c), (this.__currentElement = c);
      }
      var d = this.__currentElement.getAttribute("transform");
      d ? (d += " ") : (d = ""),
        (d += a),
        this.__currentElement.setAttribute("transform", d);
    }),
    (f.prototype.scale = function (b, c) {
      void 0 === c && (c = b),
        this.__addTransform(a("scale({x},{y})", { x: b, y: c }));
    }),
    (f.prototype.rotate = function (b) {
      var c = (180 * b) / Math.PI;
      this.__addTransform(
        a("rotate({angle},{cx},{cy})", { angle: c, cx: 0, cy: 0 })
      );
    }),
    (f.prototype.translate = function (b, c) {
      this.__addTransform(a("translate({x},{y})", { x: b, y: c }));
    }),
    (f.prototype.transform = function (b, c, d, e, f, g) {
      this.__addTransform(
        a("matrix({a},{b},{c},{d},{e},{f})", {
          a: b,
          b: c,
          c: d,
          d: e,
          e: f,
          f: g,
        })
      );
    }),
    (f.prototype.beginPath = function () {
      var a, b;
      (this.__currentDefaultPath = ""),
        (this.__currentPosition = {}),
        (a = this.__createElement("path", {}, !0)),
        (b = this.__closestGroupOrSvg()),
        b.appendChild(a),
        (this.__currentElement = a);
    }),
    (f.prototype.__applyCurrentDefaultPath = function () {
      var a = this.__currentElement;
      "path" === a.nodeName
        ? a.setAttribute("d", this.__currentDefaultPath)
        : console.error("Attempted to apply path command to node", a.nodeName);
    }),
    (f.prototype.__addPathCommand = function (a) {
      (this.__currentDefaultPath += " "), (this.__currentDefaultPath += a);
    }),
    (f.prototype.moveTo = function (b, c) {
      "path" !== this.__currentElement.nodeName && this.beginPath(),
        (this.__currentPosition = { x: b, y: c }),
        this.__addPathCommand(a("M {x} {y}", { x: b, y: c }));
    }),
    (f.prototype.closePath = function () {
      this.__currentDefaultPath && this.__addPathCommand("Z");
    }),
    (f.prototype.lineTo = function (b, c) {
      (this.__currentPosition = { x: b, y: c }),
        this.__currentDefaultPath.indexOf("M") > -1
          ? this.__addPathCommand(a("L {x} {y}", { x: b, y: c }))
          : this.__addPathCommand(a("M {x} {y}", { x: b, y: c }));
    }),
    (f.prototype.bezierCurveTo = function (b, c, d, e, f, g) {
      (this.__currentPosition = { x: f, y: g }),
        this.__addPathCommand(
          a("C {cp1x} {cp1y} {cp2x} {cp2y} {x} {y}", {
            cp1x: b,
            cp1y: c,
            cp2x: d,
            cp2y: e,
            x: f,
            y: g,
          })
        );
    }),
    (f.prototype.quadraticCurveTo = function (b, c, d, e) {
      (this.__currentPosition = { x: d, y: e }),
        this.__addPathCommand(
          a("Q {cpx} {cpy} {x} {y}", { cpx: b, cpy: c, x: d, y: e })
        );
    });
  var j = function (a) {
    var b = Math.sqrt(a[0] * a[0] + a[1] * a[1]);
    return [a[0] / b, a[1] / b];
  };
  (f.prototype.arcTo = function (a, b, c, d, e) {
    var f = this.__currentPosition && this.__currentPosition.x,
      g = this.__currentPosition && this.__currentPosition.y;
    if (void 0 !== f && void 0 !== g) {
      if (e < 0)
        throw new Error(
          "IndexSizeError: The radius provided (" + e + ") is negative."
        );
      if ((f === a && g === b) || (a === c && b === d) || 0 === e)
        return void this.lineTo(a, b);
      var h = j([f - a, g - b]),
        i = j([c - a, d - b]);
      if (h[0] * i[1] == h[1] * i[0]) return void this.lineTo(a, b);
      var k = h[0] * i[0] + h[1] * i[1],
        l = Math.acos(Math.abs(k)),
        m = j([h[0] + i[0], h[1] + i[1]]),
        n = e / Math.sin(l / 2),
        o = a + n * m[0],
        p = b + n * m[1],
        q = [-h[1], h[0]],
        r = [i[1], -i[0]],
        s = function (a) {
          var b = a[0];
          return a[1] >= 0 ? Math.acos(b) : -Math.acos(b);
        },
        t = s(q),
        u = s(r);
      this.lineTo(o + q[0] * e, p + q[1] * e), this.arc(o, p, e, t, u);
    }
  }),
    (f.prototype.stroke = function () {
      "path" === this.__currentElement.nodeName &&
        this.__currentElement.setAttribute(
          "paint-order",
          "fill stroke markers"
        ),
        this.__applyCurrentDefaultPath(),
        this.__applyStyleToCurrentElement("stroke");
    }),
    (f.prototype.fill = function () {
      "path" === this.__currentElement.nodeName &&
        this.__currentElement.setAttribute(
          "paint-order",
          "stroke fill markers"
        ),
        this.__applyCurrentDefaultPath(),
        this.__applyStyleToCurrentElement("fill");
    }),
    (f.prototype.rect = function (a, b, c, d) {
      "path" !== this.__currentElement.nodeName && this.beginPath(),
        this.moveTo(a, b),
        this.lineTo(a + c, b),
        this.lineTo(a + c, b + d),
        this.lineTo(a, b + d),
        this.lineTo(a, b),
        this.closePath();
    }),
    (f.prototype.fillRect = function (a, b, c, d) {
      var e, f;
      (e = this.__createElement(
        "rect",
        { x: a, y: b, width: c, height: d, "shape-rendering": "crispEdges" },
        !0
      )),
        (f = this.__closestGroupOrSvg()),
        f.appendChild(e),
        (this.__currentElement = e),
        this.__applyStyleToCurrentElement("fill");
    }),
    (f.prototype.strokeRect = function (a, b, c, d) {
      var e, f;
      (e = this.__createElement(
        "rect",
        { x: a, y: b, width: c, height: d },
        !0
      )),
        (f = this.__closestGroupOrSvg()),
        f.appendChild(e),
        (this.__currentElement = e),
        this.__applyStyleToCurrentElement("stroke");
    }),
    (f.prototype.__clearCanvas = function () {
      for (
        var a = this.__closestGroupOrSvg(),
          b = a.getAttribute("transform"),
          c = this.__root.childNodes[1],
          d = c.childNodes,
          e = d.length - 1;
        e >= 0;
        e--
      )
        d[e] && c.removeChild(d[e]);
      (this.__currentElement = c),
        (this.__groupStack = []),
        b && this.__addTransform(b);
    }),
    (f.prototype.clearRect = function (a, b, c, d) {
      if (0 === a && 0 === b && c === this.width && d === this.height)
        return void this.__clearCanvas();
      var e,
        f = this.__closestGroupOrSvg();
      (e = this.__createElement(
        "rect",
        { x: a, y: b, width: c, height: d, fill: "#FFFFFF" },
        !0
      )),
        f.appendChild(e);
    }),
    (f.prototype.createLinearGradient = function (a, c, d, e) {
      var f = this.__createElement(
        "linearGradient",
        {
          id: b(this.__ids),
          x1: a + "px",
          x2: d + "px",
          y1: c + "px",
          y2: e + "px",
          gradientUnits: "userSpaceOnUse",
        },
        !1
      );
      return this.__defs.appendChild(f), new g(f, this);
    }),
    (f.prototype.createRadialGradient = function (a, c, d, e, f, h) {
      var i = this.__createElement(
        "radialGradient",
        {
          id: b(this.__ids),
          cx: e + "px",
          cy: f + "px",
          r: h + "px",
          fx: a + "px",
          fy: c + "px",
          gradientUnits: "userSpaceOnUse",
        },
        !1
      );
      return this.__defs.appendChild(i), new g(i, this);
    }),
    (f.prototype.__parseFont = function () {
      var a =
          /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z0-9]+?)\s*$/i,
        b = a.exec(this.font),
        c = {
          style: b[1] || "normal",
          size: b[4] || "10px",
          family: b[6] || "sans-serif",
          weight: b[3] || "normal",
          decoration: b[2] || "normal",
          href: null,
        };
      return (
        "underline" === this.__fontUnderline && (c.decoration = "underline"),
        this.__fontHref && (c.href = this.__fontHref),
        c
      );
    }),
    (f.prototype.__wrapTextLink = function (a, b) {
      if (a.href) {
        var c = this.__createElement("a");
        return (
          c.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            a.href
          ),
          c.appendChild(b),
          c
        );
      }
      return b;
    }),
    (f.prototype.__applyText = function (a, b, e, f) {
      var g = this.__parseFont(),
        h = this.__closestGroupOrSvg(),
        i = this.__createElement(
          "text",
          {
            "font-family": g.family,
            "font-size": g.size,
            "font-style": g.style,
            "font-weight": g.weight,
            "text-decoration": g.decoration,
            x: b,
            y: e,
            "text-anchor": c(this.textAlign),
            "dominant-baseline": d(this.textBaseline),
          },
          !0
        );
      i.appendChild(this.__document.createTextNode(a)),
        (this.__currentElement = i),
        this.__applyStyleToCurrentElement(f),
        h.appendChild(this.__wrapTextLink(g, i));
    }),
    (f.prototype.fillText = function (a, b, c) {
      this.__applyText(a, b, c, "fill");
    }),
    (f.prototype.strokeText = function (a, b, c) {
      this.__applyText(a, b, c, "stroke");
    }),
    (f.prototype.measureText = function (a) {
      return (this.__ctx.font = this.font), this.__ctx.measureText(a);
    }),
    (f.prototype.arc = function (b, c, d, e, f, g) {
      if (e !== f) {
        (e %= 2 * Math.PI),
          (f %= 2 * Math.PI),
          e === f &&
            (f = (f + 2 * Math.PI - 0.001 * (g ? -1 : 1)) % (2 * Math.PI));
        var h = b + d * Math.cos(f),
          i = c + d * Math.sin(f),
          j = b + d * Math.cos(e),
          k = c + d * Math.sin(e),
          l = g ? 0 : 1,
          m = 0,
          n = f - e;
        n < 0 && (n += 2 * Math.PI),
          (m = g ? (n > Math.PI ? 0 : 1) : n > Math.PI ? 1 : 0),
          this.lineTo(j, k),
          this.__addPathCommand(
            a(
              "A {rx} {ry} {xAxisRotation} {largeArcFlag} {sweepFlag} {endX} {endY}",
              {
                rx: d,
                ry: d,
                xAxisRotation: 0,
                largeArcFlag: m,
                sweepFlag: l,
                endX: h,
                endY: i,
              }
            )
          ),
          (this.__currentPosition = { x: h, y: i });
      }
    }),
    (f.prototype.clip = function () {
      var c = this.__closestGroupOrSvg(),
        d = this.__createElement("clipPath"),
        e = b(this.__ids),
        f = this.__createElement("g");
      this.__applyCurrentDefaultPath(),
        c.removeChild(this.__currentElement),
        d.setAttribute("id", e),
        d.appendChild(this.__currentElement),
        this.__defs.appendChild(d),
        c.setAttribute("clip-path", a("url(#{id})", { id: e })),
        c.appendChild(f),
        (this.__currentElement = f);
    }),
    (f.prototype.drawImage = function () {
      var a,
        b,
        c,
        d,
        e,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p = Array.prototype.slice.call(arguments),
        q = p[0],
        r = 0,
        s = 0;
      if (3 === p.length)
        (a = p[1]), (b = p[2]), (e = q.width), (g = q.height), (c = e), (d = g);
      else if (5 === p.length)
        (a = p[1]),
          (b = p[2]),
          (c = p[3]),
          (d = p[4]),
          (e = q.width),
          (g = q.height);
      else {
        if (9 !== p.length)
          throw new Error(
            "Invalid number of arguments passed to drawImage: " +
              arguments.length
          );
        (r = p[1]),
          (s = p[2]),
          (e = p[3]),
          (g = p[4]),
          (a = p[5]),
          (b = p[6]),
          (c = p[7]),
          (d = p[8]);
      }
      (h = this.__closestGroupOrSvg()), this.__currentElement;
      var t = "translate(" + a + ", " + b + ")";
      if (q instanceof f) {
        if (
          ((i = q.getSvg().cloneNode(!0)),
          i.childNodes && i.childNodes.length > 1)
        ) {
          for (j = i.childNodes[0]; j.childNodes.length; )
            (o = j.childNodes[0].getAttribute("id")),
              (this.__ids[o] = o),
              this.__defs.appendChild(j.childNodes[0]);
          if ((k = i.childNodes[1])) {
            var u,
              v = k.getAttribute("transform");
            (u = v ? v + " " + t : t),
              k.setAttribute("transform", u),
              h.appendChild(k);
          }
        }
      } else
        ("CANVAS" !== q.nodeName && "IMG" !== q.nodeName) ||
          ((l = this.__createElement("image")),
          l.setAttribute("width", c),
          l.setAttribute("height", d),
          l.setAttribute("preserveAspectRatio", "none"),
          l.setAttribute("opacity", this.globalAlpha),
          (r || s || e !== q.width || g !== q.height) &&
            ((m = this.__document.createElement("canvas")),
            (m.width = c),
            (m.height = d),
            (n = m.getContext("2d")),
            n.drawImage(q, r, s, e, g, 0, 0, c, d),
            (q = m)),
          l.setAttribute("transform", t),
          l.setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            "CANVAS" === q.nodeName ? q.toDataURL() : q.originalSrc
          ),
          h.appendChild(l));
    }),
    (f.prototype.createPattern = function (a, c) {
      var d,
        e = this.__document.createElementNS(
          "http://www.w3.org/2000/svg",
          "pattern"
        ),
        g = b(this.__ids);
      return (
        e.setAttribute("id", g),
        e.setAttribute("width", a.width),
        e.setAttribute("height", a.height),
        "CANVAS" === a.nodeName || "IMG" === a.nodeName
          ? ((d = this.__document.createElementNS(
              "http://www.w3.org/2000/svg",
              "image"
            )),
            d.setAttribute("width", a.width),
            d.setAttribute("height", a.height),
            d.setAttributeNS(
              "http://www.w3.org/1999/xlink",
              "xlink:href",
              "CANVAS" === a.nodeName ? a.toDataURL() : a.getAttribute("src")
            ),
            e.appendChild(d),
            this.__defs.appendChild(e))
          : a instanceof f &&
            (e.appendChild(a.__root.childNodes[1]), this.__defs.appendChild(e)),
        new h(e, this)
      );
    }),
    (f.prototype.setLineDash = function (a) {
      a && a.length > 0
        ? (this.lineDash = a.join(","))
        : (this.lineDash = null);
    }),
    (f.prototype.drawFocusRing = function () {}),
    (f.prototype.createImageData = function () {}),
    (f.prototype.getImageData = function () {}),
    (f.prototype.putImageData = function () {}),
    (f.prototype.globalCompositeOperation = function () {}),
    (f.prototype.setTransform = function () {}),
    "object" == typeof window && (window.C2S = f),
    "object" == typeof module &&
      "object" == typeof module.exports &&
      (module.exports = f);
})(),
  function () {
    "use strict";
    function a(a, b, c) {
      if (
        ((this.mode = q.MODE_8BIT_BYTE),
        (this.data = a),
        (this.parsedData = []),
        b)
      ) {
        for (var d = 0, e = this.data.length; d < e; d++) {
          var f = [],
            g = this.data.charCodeAt(d);
          (f[0] = g), this.parsedData.push(f);
        }
        this.parsedData = Array.prototype.concat.apply([], this.parsedData);
      } else
        this.parsedData = (function (a) {
          for (var b = [], c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            d < 128
              ? b.push(d)
              : d < 2048
              ? b.push(192 | (d >> 6), 128 | (63 & d))
              : d < 55296 || d >= 57344
              ? b.push(224 | (d >> 12), 128 | ((d >> 6) & 63), 128 | (63 & d))
              : (c++,
                (d = 65536 + (((1023 & d) << 10) | (1023 & a.charCodeAt(c)))),
                b.push(
                  240 | (d >> 18),
                  128 | ((d >> 12) & 63),
                  128 | ((d >> 6) & 63),
                  128 | (63 & d)
                ));
          }
          return b;
        })(a);
      (this.parsedData = Array.prototype.concat.apply([], this.parsedData)),
        c ||
          this.parsedData.length == this.data.length ||
          (this.parsedData.unshift(191),
          this.parsedData.unshift(187),
          this.parsedData.unshift(239));
    }
    function b(a, b) {
      (this.typeNumber = a),
        (this.errorCorrectLevel = b),
        (this.modules = null),
        (this.moduleCount = 0),
        (this.dataCache = null),
        (this.dataList = []);
    }
    function c(a, b) {
      if (a.length == i) throw new Error(a.length + "/" + b);
      for (var c = 0; c < a.length && 0 == a[c]; ) c++;
      this.num = new Array(a.length - c + b);
      for (var d = 0; d < a.length - c; d++) this.num[d] = a[d + c];
    }
    function d(a, b) {
      (this.totalCount = a), (this.dataCount = b);
    }
    function e() {
      (this.buffer = []), (this.length = 0);
    }
    function f() {
      var a = !1,
        b = navigator.userAgent;
      if (/android/i.test(b)) {
        a = !0;
        var c = b.toString().match(/android ([0-9]\.[0-9])/i);
        c && c[1] && (a = parseFloat(c[1]));
      }
      return a;
    }
    function g(a, b) {
      for (
        var c = b.correctLevel, d = 1, e = h(a), f = 0, g = w.length;
        f < g;
        f++
      ) {
        var i = 0;
        switch (c) {
          case r.L:
            i = w[f][0];
            break;
          case r.M:
            i = w[f][1];
            break;
          case r.Q:
            i = w[f][2];
            break;
          case r.H:
            i = w[f][3];
        }
        if (e <= i) break;
        d++;
      }
      if (d > w.length)
        throw new Error(
          "Too long data. the CorrectLevel." +
            ["M", "L", "H", "Q"][c] +
            " limit length is " +
            i
        );
      return (
        0 != b.version &&
          (d <= b.version
            ? ((d = b.version), (b.runVersion = d))
            : (console.warn(
                "QR Code version " +
                  b.version +
                  " too small, run version use " +
                  d
              ),
              (b.runVersion = d))),
        d
      );
    }
    function h(a) {
      return encodeURI(a)
        .toString()
        .replace(/\%[0-9a-fA-F]{2}/g, "a").length;
    }
    var i,
      j,
      k =
        "object" == typeof global &&
        global &&
        global.Object === Object &&
        global,
      l = "object" == typeof self && self && self.Object === Object && self,
      m = k || l || Function("return this")(),
      n = "object" == typeof exports && exports && !exports.nodeType && exports,
      o =
        n && "object" == typeof module && module && !module.nodeType && module,
      p = m.QRCode;
    (a.prototype = {
      getLength: function (a) {
        return this.parsedData.length;
      },
      write: function (a) {
        for (var b = 0, c = this.parsedData.length; b < c; b++)
          a.put(this.parsedData[b], 8);
      },
    }),
      (b.prototype = {
        addData: function (b, c, d) {
          var e = new a(b, c, d);
          this.dataList.push(e), (this.dataCache = null);
        },
        isDark: function (a, b) {
          if (a < 0 || this.moduleCount <= a || b < 0 || this.moduleCount <= b)
            throw new Error(a + "," + b);
          return this.modules[a][b][0];
        },
        getEye: function (a, b) {
          if (a < 0 || this.moduleCount <= a || b < 0 || this.moduleCount <= b)
            throw new Error(a + "," + b);
          var c = this.modules[a][b];
          if (c[1]) {
            var d = "P" + c[1] + "_" + c[2];
            return "A" == c[2] && (d = "A" + c[1]), { isDark: c[0], type: d };
          }
          return null;
        },
        getModuleCount: function () {
          return this.moduleCount;
        },
        make: function () {
          this.makeImpl(!1, this.getBestMaskPattern());
        },
        makeImpl: function (a, c) {
          (this.moduleCount = 4 * this.typeNumber + 17),
            (this.modules = new Array(this.moduleCount));
          for (var d = 0; d < this.moduleCount; d++) {
            this.modules[d] = new Array(this.moduleCount);
            for (var e = 0; e < this.moduleCount; e++) this.modules[d][e] = [];
          }
          this.setupPositionProbePattern(0, 0, "TL"),
            this.setupPositionProbePattern(this.moduleCount - 7, 0, "BL"),
            this.setupPositionProbePattern(0, this.moduleCount - 7, "TR"),
            this.setupPositionAdjustPattern("A"),
            this.setupTimingPattern(),
            this.setupTypeInfo(a, c),
            this.typeNumber >= 7 && this.setupTypeNumber(a),
            null == this.dataCache &&
              (this.dataCache = b.createData(
                this.typeNumber,
                this.errorCorrectLevel,
                this.dataList
              )),
            this.mapData(this.dataCache, c);
        },
        setupPositionProbePattern: function (a, b, c) {
          for (var d = -1; d <= 7; d++)
            if (!(a + d <= -1 || this.moduleCount <= a + d))
              for (var e = -1; e <= 7; e++)
                b + e <= -1 ||
                  this.moduleCount <= b + e ||
                  ((0 <= d && d <= 6 && (0 == e || 6 == e)) ||
                  (0 <= e && e <= 6 && (0 == d || 6 == d)) ||
                  (2 <= d && d <= 4 && 2 <= e && e <= 4)
                    ? ((this.modules[a + d][b + e][0] = !0),
                      (this.modules[a + d][b + e][2] = c),
                      (this.modules[a + d][b + e][1] =
                        -0 == d || -0 == e || 6 == d || 6 == e ? "O" : "I"))
                    : (this.modules[a + d][b + e][0] = !1));
        },
        getBestMaskPattern: function () {
          for (var a = 0, b = 0, c = 0; c < 8; c++) {
            this.makeImpl(!0, c);
            var d = t.getLostPoint(this);
            (0 == c || a > d) && ((a = d), (b = c));
          }
          return b;
        },
        createMovieClip: function (a, b, c) {
          var d = a.createEmptyMovieClip(b, c);
          this.make();
          for (var e = 0; e < this.modules.length; e++)
            for (var f = 1 * e, g = 0; g < this.modules[e].length; g++) {
              var h = 1 * g,
                i = this.modules[e][g][0];
              i &&
                (d.beginFill(0, 100),
                d.moveTo(h, f),
                d.lineTo(h + 1, f),
                d.lineTo(h + 1, f + 1),
                d.lineTo(h, f + 1),
                d.endFill());
            }
          return d;
        },
        setupTimingPattern: function () {
          for (var a = 8; a < this.moduleCount - 8; a++)
            null == this.modules[a][6][0] &&
              (this.modules[a][6][0] = a % 2 == 0);
          for (var b = 8; b < this.moduleCount - 8; b++)
            null == this.modules[6][b][0] &&
              (this.modules[6][b][0] = b % 2 == 0);
        },
        setupPositionAdjustPattern: function (a) {
          for (
            var b = t.getPatternPosition(this.typeNumber), c = 0;
            c < b.length;
            c++
          )
            for (var d = 0; d < b.length; d++) {
              var e = b[c],
                f = b[d];
              if (null == this.modules[e][f][0])
                for (var g = -2; g <= 2; g++)
                  for (var h = -2; h <= 2; h++)
                    -2 == g || 2 == g || -2 == h || 2 == h || (0 == g && 0 == h)
                      ? ((this.modules[e + g][f + h][0] = !0),
                        (this.modules[e + g][f + h][2] = a),
                        (this.modules[e + g][f + h][1] =
                          -2 == g || -2 == h || 2 == g || 2 == h ? "O" : "I"))
                      : (this.modules[e + g][f + h][0] = !1);
            }
        },
        setupTypeNumber: function (a) {
          for (
            var b = t.getBCHTypeNumber(this.typeNumber), c = 0;
            c < 18;
            c++
          ) {
            var d = !a && 1 == ((b >> c) & 1);
            this.modules[Math.floor(c / 3)][
              (c % 3) + this.moduleCount - 8 - 3
            ][0] = d;
          }
          for (var c = 0; c < 18; c++) {
            var d = !a && 1 == ((b >> c) & 1);
            this.modules[(c % 3) + this.moduleCount - 8 - 3][
              Math.floor(c / 3)
            ][0] = d;
          }
        },
        setupTypeInfo: function (a, b) {
          for (
            var c = (this.errorCorrectLevel << 3) | b,
              d = t.getBCHTypeInfo(c),
              e = 0;
            e < 15;
            e++
          ) {
            var f = !a && 1 == ((d >> e) & 1);
            e < 6
              ? (this.modules[e][8][0] = f)
              : e < 8
              ? (this.modules[e + 1][8][0] = f)
              : (this.modules[this.moduleCount - 15 + e][8][0] = f);
          }
          for (var e = 0; e < 15; e++) {
            var f = !a && 1 == ((d >> e) & 1);
            e < 8
              ? (this.modules[8][this.moduleCount - e - 1][0] = f)
              : e < 9
              ? (this.modules[8][15 - e - 1 + 1][0] = f)
              : (this.modules[8][15 - e - 1][0] = f);
          }
          this.modules[this.moduleCount - 8][8][0] = !a;
        },
        mapData: function (a, b) {
          for (
            var c = -1,
              d = this.moduleCount - 1,
              e = 7,
              f = 0,
              g = this.moduleCount - 1;
            g > 0;
            g -= 2
          )
            for (6 == g && g--; ; ) {
              for (var h = 0; h < 2; h++)
                if (null == this.modules[d][g - h][0]) {
                  var i = !1;
                  f < a.length && (i = 1 == ((a[f] >>> e) & 1));
                  var j = t.getMask(b, d, g - h);
                  j && (i = !i),
                    (this.modules[d][g - h][0] = i),
                    e--,
                    -1 == e && (f++, (e = 7));
                }
              if ((d += c) < 0 || this.moduleCount <= d) {
                (d -= c), (c = -c);
                break;
              }
            }
        },
      }),
      (b.PAD0 = 236),
      (b.PAD1 = 17),
      (b.createData = function (a, c, f) {
        for (
          var g = d.getRSBlocks(a, c), h = new e(), i = 0;
          i < f.length;
          i++
        ) {
          var j = f[i];
          h.put(j.mode, 4),
            h.put(j.getLength(), t.getLengthInBits(j.mode, a)),
            j.write(h);
        }
        for (var k = 0, i = 0; i < g.length; i++) k += g[i].dataCount;
        if (h.getLengthInBits() > 8 * k)
          throw new Error(
            "code length overflow. (" + h.getLengthInBits() + ">" + 8 * k + ")"
          );
        for (
          h.getLengthInBits() + 4 <= 8 * k && h.put(0, 4);
          h.getLengthInBits() % 8 != 0;

        )
          h.putBit(!1);
        for (;;) {
          if (h.getLengthInBits() >= 8 * k) break;
          if ((h.put(b.PAD0, 8), h.getLengthInBits() >= 8 * k)) break;
          h.put(b.PAD1, 8);
        }
        return b.createBytes(h, g);
      }),
      (b.createBytes = function (a, b) {
        for (
          var d = 0,
            e = 0,
            f = 0,
            g = new Array(b.length),
            h = new Array(b.length),
            i = 0;
          i < b.length;
          i++
        ) {
          var j = b[i].dataCount,
            k = b[i].totalCount - j;
          (e = Math.max(e, j)), (f = Math.max(f, k)), (g[i] = new Array(j));
          for (var l = 0; l < g[i].length; l++) g[i][l] = 255 & a.buffer[l + d];
          d += j;
          var m = t.getErrorCorrectPolynomial(k),
            n = new c(g[i], m.getLength() - 1),
            o = n.mod(m);
          h[i] = new Array(m.getLength() - 1);
          for (var l = 0; l < h[i].length; l++) {
            var p = l + o.getLength() - h[i].length;
            h[i][l] = p >= 0 ? o.get(p) : 0;
          }
        }
        for (var q = 0, l = 0; l < b.length; l++) q += b[l].totalCount;
        for (var r = new Array(q), s = 0, l = 0; l < e; l++)
          for (var i = 0; i < b.length; i++)
            l < g[i].length && (r[s++] = g[i][l]);
        for (var l = 0; l < f; l++)
          for (var i = 0; i < b.length; i++)
            l < h[i].length && (r[s++] = h[i][l]);
        return r;
      });
    for (
      var q = {
          MODE_NUMBER: 1,
          MODE_ALPHA_NUM: 2,
          MODE_8BIT_BYTE: 4,
          MODE_KANJI: 8,
        },
        r = { L: 1, M: 0, Q: 3, H: 2 },
        s = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7,
        },
        t = {
          PATTERN_POSITION_TABLE: [
            [],
            [6, 18],
            [6, 22],
            [6, 26],
            [6, 30],
            [6, 34],
            [6, 22, 38],
            [6, 24, 42],
            [6, 26, 46],
            [6, 28, 50],
            [6, 30, 54],
            [6, 32, 58],
            [6, 34, 62],
            [6, 26, 46, 66],
            [6, 26, 48, 70],
            [6, 26, 50, 74],
            [6, 30, 54, 78],
            [6, 30, 56, 82],
            [6, 30, 58, 86],
            [6, 34, 62, 90],
            [6, 28, 50, 72, 94],
            [6, 26, 50, 74, 98],
            [6, 30, 54, 78, 102],
            [6, 28, 54, 80, 106],
            [6, 32, 58, 84, 110],
            [6, 30, 58, 86, 114],
            [6, 34, 62, 90, 118],
            [6, 26, 50, 74, 98, 122],
            [6, 30, 54, 78, 102, 126],
            [6, 26, 52, 78, 104, 130],
            [6, 30, 56, 82, 108, 134],
            [6, 34, 60, 86, 112, 138],
            [6, 30, 58, 86, 114, 142],
            [6, 34, 62, 90, 118, 146],
            [6, 30, 54, 78, 102, 126, 150],
            [6, 24, 50, 76, 102, 128, 154],
            [6, 28, 54, 80, 106, 132, 158],
            [6, 32, 58, 84, 110, 136, 162],
            [6, 26, 54, 82, 110, 138, 166],
            [6, 30, 58, 86, 114, 142, 170],
          ],
          G15: 1335,
          G18: 7973,
          G15_MASK: 21522,
          getBCHTypeInfo: function (a) {
            for (
              var b = a << 10;
              t.getBCHDigit(b) - t.getBCHDigit(t.G15) >= 0;

            )
              b ^= t.G15 << (t.getBCHDigit(b) - t.getBCHDigit(t.G15));
            return ((a << 10) | b) ^ t.G15_MASK;
          },
          getBCHTypeNumber: function (a) {
            for (
              var b = a << 12;
              t.getBCHDigit(b) - t.getBCHDigit(t.G18) >= 0;

            )
              b ^= t.G18 << (t.getBCHDigit(b) - t.getBCHDigit(t.G18));
            return (a << 12) | b;
          },
          getBCHDigit: function (a) {
            for (var b = 0; 0 != a; ) b++, (a >>>= 1);
            return b;
          },
          getPatternPosition: function (a) {
            return t.PATTERN_POSITION_TABLE[a - 1];
          },
          getMask: function (a, b, c) {
            switch (a) {
              case s.PATTERN000:
                return (b + c) % 2 == 0;
              case s.PATTERN001:
                return b % 2 == 0;
              case s.PATTERN010:
                return c % 3 == 0;
              case s.PATTERN011:
                return (b + c) % 3 == 0;
              case s.PATTERN100:
                return (Math.floor(b / 2) + Math.floor(c / 3)) % 2 == 0;
              case s.PATTERN101:
                return ((b * c) % 2) + ((b * c) % 3) == 0;
              case s.PATTERN110:
                return (((b * c) % 2) + ((b * c) % 3)) % 2 == 0;
              case s.PATTERN111:
                return (((b * c) % 3) + ((b + c) % 2)) % 2 == 0;
              default:
                throw new Error("bad maskPattern:" + a);
            }
          },
          getErrorCorrectPolynomial: function (a) {
            for (var b = new c([1], 0), d = 0; d < a; d++)
              b = b.multiply(new c([1, u.gexp(d)], 0));
            return b;
          },
          getLengthInBits: function (a, b) {
            if (1 <= b && b < 10)
              switch (a) {
                case q.MODE_NUMBER:
                  return 10;
                case q.MODE_ALPHA_NUM:
                  return 9;
                case q.MODE_8BIT_BYTE:
                case q.MODE_KANJI:
                  return 8;
                default:
                  throw new Error("mode:" + a);
              }
            else if (b < 27)
              switch (a) {
                case q.MODE_NUMBER:
                  return 12;
                case q.MODE_ALPHA_NUM:
                  return 11;
                case q.MODE_8BIT_BYTE:
                  return 16;
                case q.MODE_KANJI:
                  return 10;
                default:
                  throw new Error("mode:" + a);
              }
            else {
              if (!(b < 41)) throw new Error("type:" + b);
              switch (a) {
                case q.MODE_NUMBER:
                  return 14;
                case q.MODE_ALPHA_NUM:
                  return 13;
                case q.MODE_8BIT_BYTE:
                  return 16;
                case q.MODE_KANJI:
                  return 12;
                default:
                  throw new Error("mode:" + a);
              }
            }
          },
          getLostPoint: function (a) {
            for (var b = a.getModuleCount(), c = 0, d = 0; d < b; d++)
              for (var e = 0; e < b; e++) {
                for (var f = 0, g = a.isDark(d, e), h = -1; h <= 1; h++)
                  if (!(d + h < 0 || b <= d + h))
                    for (var i = -1; i <= 1; i++)
                      e + i < 0 ||
                        b <= e + i ||
                        (0 == h && 0 == i) ||
                        (g == a.isDark(d + h, e + i) && f++);
                f > 5 && (c += 3 + f - 5);
              }
            for (var d = 0; d < b - 1; d++)
              for (var e = 0; e < b - 1; e++) {
                var j = 0;
                a.isDark(d, e) && j++,
                  a.isDark(d + 1, e) && j++,
                  a.isDark(d, e + 1) && j++,
                  a.isDark(d + 1, e + 1) && j++,
                  (0 != j && 4 != j) || (c += 3);
              }
            for (var d = 0; d < b; d++)
              for (var e = 0; e < b - 6; e++)
                a.isDark(d, e) &&
                  !a.isDark(d, e + 1) &&
                  a.isDark(d, e + 2) &&
                  a.isDark(d, e + 3) &&
                  a.isDark(d, e + 4) &&
                  !a.isDark(d, e + 5) &&
                  a.isDark(d, e + 6) &&
                  (c += 40);
            for (var e = 0; e < b; e++)
              for (var d = 0; d < b - 6; d++)
                a.isDark(d, e) &&
                  !a.isDark(d + 1, e) &&
                  a.isDark(d + 2, e) &&
                  a.isDark(d + 3, e) &&
                  a.isDark(d + 4, e) &&
                  !a.isDark(d + 5, e) &&
                  a.isDark(d + 6, e) &&
                  (c += 40);
            for (var k = 0, e = 0; e < b; e++)
              for (var d = 0; d < b; d++) a.isDark(d, e) && k++;
            return (c += (Math.abs((100 * k) / b / b - 50) / 5) * 10);
          },
        },
        u = {
          glog: function (a) {
            if (a < 1) throw new Error("glog(" + a + ")");
            return u.LOG_TABLE[a];
          },
          gexp: function (a) {
            for (; a < 0; ) a += 255;
            for (; a >= 256; ) a -= 255;
            return u.EXP_TABLE[a];
          },
          EXP_TABLE: new Array(256),
          LOG_TABLE: new Array(256),
        },
        v = 0;
      v < 8;
      v++
    )
      u.EXP_TABLE[v] = 1 << v;
    for (var v = 8; v < 256; v++)
      u.EXP_TABLE[v] =
        u.EXP_TABLE[v - 4] ^
        u.EXP_TABLE[v - 5] ^
        u.EXP_TABLE[v - 6] ^
        u.EXP_TABLE[v - 8];
    for (var v = 0; v < 255; v++) u.LOG_TABLE[u.EXP_TABLE[v]] = v;
    (c.prototype = {
      get: function (a) {
        return this.num[a];
      },
      getLength: function () {
        return this.num.length;
      },
      multiply: function (a) {
        for (
          var b = new Array(this.getLength() + a.getLength() - 1), d = 0;
          d < this.getLength();
          d++
        )
          for (var e = 0; e < a.getLength(); e++)
            b[d + e] ^= u.gexp(u.glog(this.get(d)) + u.glog(a.get(e)));
        return new c(b, 0);
      },
      mod: function (a) {
        if (this.getLength() - a.getLength() < 0) return this;
        for (
          var b = u.glog(this.get(0)) - u.glog(a.get(0)),
            d = new Array(this.getLength()),
            e = 0;
          e < this.getLength();
          e++
        )
          d[e] = this.get(e);
        for (var e = 0; e < a.getLength(); e++)
          d[e] ^= u.gexp(u.glog(a.get(e)) + b);
        return new c(d, 0).mod(a);
      },
    }),
      (d.RS_BLOCK_TABLE = [
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12, 7, 37, 13],
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16],
      ]),
      (d.getRSBlocks = function (a, b) {
        var c = d.getRsBlockTable(a, b);
        if (c == i)
          throw new Error(
            "bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b
          );
        for (var e = c.length / 3, f = [], g = 0; g < e; g++)
          for (
            var h = c[3 * g + 0], j = c[3 * g + 1], k = c[3 * g + 2], l = 0;
            l < h;
            l++
          )
            f.push(new d(j, k));
        return f;
      }),
      (d.getRsBlockTable = function (a, b) {
        switch (b) {
          case r.L:
            return d.RS_BLOCK_TABLE[4 * (a - 1) + 0];
          case r.M:
            return d.RS_BLOCK_TABLE[4 * (a - 1) + 1];
          case r.Q:
            return d.RS_BLOCK_TABLE[4 * (a - 1) + 2];
          case r.H:
            return d.RS_BLOCK_TABLE[4 * (a - 1) + 3];
          default:
            return i;
        }
      }),
      (e.prototype = {
        get: function (a) {
          var b = Math.floor(a / 8);
          return 1 == ((this.buffer[b] >>> (7 - (a % 8))) & 1);
        },
        put: function (a, b) {
          for (var c = 0; c < b; c++)
            this.putBit(1 == ((a >>> (b - c - 1)) & 1));
        },
        getLengthInBits: function () {
          return this.length;
        },
        putBit: function (a) {
          var b = Math.floor(this.length / 8);
          this.buffer.length <= b && this.buffer.push(0),
            a && (this.buffer[b] |= 128 >>> this.length % 8),
            this.length++;
        },
      });
    var w = [
        [17, 14, 11, 7],
        [32, 26, 20, 14],
        [53, 42, 32, 24],
        [78, 62, 46, 34],
        [106, 84, 60, 44],
        [134, 106, 74, 58],
        [154, 122, 86, 64],
        [192, 152, 108, 84],
        [230, 180, 130, 98],
        [271, 213, 151, 119],
        [321, 251, 177, 137],
        [367, 287, 203, 155],
        [425, 331, 241, 177],
        [458, 362, 258, 194],
        [520, 412, 292, 220],
        [586, 450, 322, 250],
        [644, 504, 364, 280],
        [718, 560, 394, 310],
        [792, 624, 442, 338],
        [858, 666, 482, 382],
        [929, 711, 509, 403],
        [1003, 779, 565, 439],
        [1091, 857, 611, 461],
        [1171, 911, 661, 511],
        [1273, 997, 715, 535],
        [1367, 1059, 751, 593],
        [1465, 1125, 805, 625],
        [1528, 1190, 868, 658],
        [1628, 1264, 908, 698],
        [1732, 1370, 982, 742],
        [1840, 1452, 1030, 790],
        [1952, 1538, 1112, 842],
        [2068, 1628, 1168, 898],
        [2188, 1722, 1228, 958],
        [2303, 1809, 1283, 983],
        [2431, 1911, 1351, 1051],
        [2563, 1989, 1423, 1093],
        [2699, 2099, 1499, 1139],
        [2809, 2213, 1579, 1219],
        [2953, 2331, 1663, 1273],
      ],
      x = (function () {
        return "undefined" != typeof CanvasRenderingContext2D;
      })()
        ? (function () {
            function a() {
              if ("svg" == this._htOption.drawer) {
                var a = this._oContext.getSerializedSvg(!0);
                (this.dataURL = a), (this._el.innerHTML = a);
              } else
                try {
                  var b = this._elCanvas.toDataURL("image/png");
                  this.dataURL = b;
                } catch (a) {
                  console.error(a);
                }
              this._htOption.onRenderingEnd &&
                (this.dataURL ||
                  console.error(
                    "Can not get base64 data, please check: 1. Published the page and image to the server 2. The image request support CORS 3. Configured `crossOrigin:'anonymous'` option"
                  ),
                this._htOption.onRenderingEnd(this._htOption, this.dataURL));
            }
            function b(a, b) {
              var c = this;
              if (
                ((c._fFail = b), (c._fSuccess = a), null === c._bSupportDataURI)
              ) {
                var d = document.createElement("img"),
                  e = function () {
                    (c._bSupportDataURI = !1), c._fFail && c._fFail.call(c);
                  },
                  f = function () {
                    (c._bSupportDataURI = !0),
                      c._fSuccess && c._fSuccess.call(c);
                  };
                (d.onabort = e),
                  (d.onerror = e),
                  (d.onload = f),
                  (d.src =
                    "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==");
              } else
                !0 === c._bSupportDataURI && c._fSuccess
                  ? c._fSuccess.call(c)
                  : !1 === c._bSupportDataURI && c._fFail && c._fFail.call(c);
            }
            if (m._android && m._android <= 2.1) {
              var c = 1 / window.devicePixelRatio,
                d = CanvasRenderingContext2D.prototype.drawImage;
              CanvasRenderingContext2D.prototype.drawImage = function (
                a,
                b,
                e,
                f,
                g,
                h,
                i,
                j,
                k
              ) {
                if ("nodeName" in a && /img/i.test(a.nodeName))
                  for (var l = arguments.length - 1; l >= 1; l--)
                    arguments[l] = arguments[l] * c;
                else
                  void 0 === j &&
                    ((arguments[1] *= c),
                    (arguments[2] *= c),
                    (arguments[3] *= c),
                    (arguments[4] *= c));
                d.apply(this, arguments);
              };
            }
            var e = function (a, b) {
              (this._bIsPainted = !1),
                (this._android = f()),
                (this._el = a),
                (this._htOption = b),
                "svg" == this._htOption.drawer
                  ? ((this._oContext = {}), (this._elCanvas = {}))
                  : ((this._elCanvas = document.createElement("canvas")),
                    this._el.appendChild(this._elCanvas),
                    (this._oContext = this._elCanvas.getContext("2d"))),
                (this._bSupportDataURI = null),
                (this.dataURL = null);
            };
            return (
              (e.prototype.draw = function (a) {
                function b() {
                  d.quietZone > 0 &&
                    d.quietZoneColor &&
                    ((j.lineWidth = 0),
                    (j.fillStyle = d.quietZoneColor),
                    j.fillRect(0, 0, k._elCanvas.width, d.quietZone),
                    j.fillRect(
                      0,
                      d.quietZone,
                      d.quietZone,
                      k._elCanvas.height - 2 * d.quietZone
                    ),
                    j.fillRect(
                      k._elCanvas.width - d.quietZone,
                      d.quietZone,
                      d.quietZone,
                      k._elCanvas.height - 2 * d.quietZone
                    ),
                    j.fillRect(
                      0,
                      k._elCanvas.height - d.quietZone,
                      k._elCanvas.width,
                      d.quietZone
                    ));
                }
                function c(a) {
                  function c(a) {
                    var c = Math.round(d.width / 3.5),
                      e = Math.round(d.height / 3.5);
                    c !== e && (c = e),
                      d.logoMaxWidth
                        ? (c = Math.round(d.logoMaxWidth))
                        : d.logoWidth && (c = Math.round(d.logoWidth)),
                      d.logoMaxHeight
                        ? (e = Math.round(d.logoMaxHeight))
                        : d.logoHeight && (e = Math.round(d.logoHeight));
                    var f, g;
                    void 0 === a.naturalWidth
                      ? ((f = a.width), (g = a.height))
                      : ((f = a.naturalWidth), (g = a.naturalHeight)),
                      (d.logoMaxWidth || d.logoMaxHeight) &&
                        (d.logoMaxWidth && f <= c && (c = f),
                        d.logoMaxHeight && g <= e && (e = g),
                        f <= c && g <= e && ((c = f), (e = g)));
                    var h = (d.realWidth - c) / 2,
                      i = (d.realHeight - e) / 2,
                      k = Math.min(c / f, e / g),
                      l = f * k,
                      m = g * k;
                    (d.logoMaxWidth || d.logoMaxHeight) &&
                      ((c = l),
                      (e = m),
                      (h = (d.realWidth - c) / 2),
                      (i = (d.realHeight - e) / 2)),
                      d.logoBackgroundTransparent ||
                        ((j.fillStyle = d.logoBackgroundColor),
                        j.fillRect(h, i, c, e));
                    var n = j.imageSmoothingQuality,
                      o = j.imageSmoothingEnabled;
                    (j.imageSmoothingEnabled = !0),
                      (j.imageSmoothingQuality = "high"),
                      j.drawImage(a, h + (c - l) / 2, i + (e - m) / 2, l, m),
                      (j.imageSmoothingEnabled = o),
                      (j.imageSmoothingQuality = n),
                      b(),
                      (s._bIsPainted = !0),
                      s.makeImage();
                  }
                  d.onRenderingStart && d.onRenderingStart(d);
                  for (var h = 0; h < e; h++)
                    for (var i = 0; i < e; i++) {
                      var k = i * f + d.quietZone,
                        l = h * g + d.quietZone,
                        m = a.isDark(h, i),
                        n = a.getEye(h, i),
                        o = d.dotScale;
                      j.lineWidth = 0;
                      var p, q;
                      n
                        ? ((p =
                            d[n.type] ||
                            d[n.type.substring(0, 2)] ||
                            d.colorDark),
                          (q = d.colorLight))
                        : d.backgroundImage
                        ? ((q = "rgba(0,0,0,0)"),
                          6 == h
                            ? d.autoColor
                              ? ((p =
                                  d.timing_H || d.timing || d.autoColorDark),
                                (q = d.autoColorLight))
                              : (p = d.timing_H || d.timing || d.colorDark)
                            : 6 == i
                            ? d.autoColor
                              ? ((p =
                                  d.timing_V || d.timing || d.autoColorDark),
                                (q = d.autoColorLight))
                              : (p = d.timing_V || d.timing || d.colorDark)
                            : d.autoColor
                            ? ((p = d.autoColorDark), (q = d.autoColorLight))
                            : (p = d.colorDark))
                        : ((p =
                            6 == h
                              ? d.timing_H || d.timing || d.colorDark
                              : 6 == i
                              ? d.timing_V || d.timing || d.colorDark
                              : d.colorDark),
                          (q = d.colorLight)),
                        (j.strokeStyle = m ? p : q),
                        (j.fillStyle = m ? p : q),
                        n
                          ? ((o =
                              "AO" == n.type
                                ? d.dotScaleAO
                                : "AI" == n.type
                                ? d.dotScaleAI
                                : 1),
                            d.backgroundImage && d.autoColor
                              ? ((p =
                                  ("AO" == n.type ? d.AI : d.AO) ||
                                  d.autoColorDark),
                                (q = d.autoColorLight))
                              : (p = ("AO" == n.type ? d.AI : d.AO) || p),
                            (m = n.isDark),
                            j.fillRect(
                              Math.ceil(k + (f * (1 - o)) / 2),
                              Math.ceil(d.titleHeight + l + (g * (1 - o)) / 2),
                              Math.ceil(f * o),
                              Math.ceil(g * o)
                            ))
                          : 6 == h
                          ? ((o = d.dotScaleTiming_H),
                            j.fillRect(
                              Math.ceil(k + (f * (1 - o)) / 2),
                              Math.ceil(d.titleHeight + l + (g * (1 - o)) / 2),
                              Math.ceil(f * o),
                              Math.ceil(g * o)
                            ))
                          : 6 == i
                          ? ((o = d.dotScaleTiming_V),
                            j.fillRect(
                              Math.ceil(k + (f * (1 - o)) / 2),
                              Math.ceil(d.titleHeight + l + (g * (1 - o)) / 2),
                              Math.ceil(f * o),
                              Math.ceil(g * o)
                            ))
                          : (d.backgroundImage,
                            j.fillRect(
                              Math.ceil(k + (f * (1 - o)) / 2),
                              Math.ceil(d.titleHeight + l + (g * (1 - o)) / 2),
                              Math.ceil(f * o),
                              Math.ceil(g * o)
                            )),
                        1 == d.dotScale || n || (j.strokeStyle = d.colorLight);
                    }
                  if (
                    (d.title &&
                      ((j.fillStyle = d.titleBackgroundColor),
                      j.fillRect(
                        d.quietZone,
                        d.quietZone,
                        d.width,
                        d.titleHeight
                      ),
                      (j.font = d.titleFont),
                      (j.fillStyle = d.titleColor),
                      (j.textAlign = "center"),
                      j.fillText(
                        d.title,
                        this._elCanvas.width / 2,
                        +d.quietZone + d.titleTop
                      )),
                    d.subTitle &&
                      ((j.font = d.subTitleFont),
                      (j.fillStyle = d.subTitleColor),
                      j.fillText(
                        d.subTitle,
                        this._elCanvas.width / 2,
                        +d.quietZone + d.subTitleTop
                      )),
                    d.logo)
                  ) {
                    var r = new Image(),
                      s = this;
                    (r.onload = function () {
                      c(r);
                    }),
                      (r.onerror = function (a) {
                        console.error(a);
                      }),
                      null != d.crossOrigin && (r.crossOrigin = d.crossOrigin),
                      (r.originalSrc = d.logo),
                      (r.src = d.logo);
                  } else b(), (this._bIsPainted = !0), this.makeImage();
                }
                var d = this._htOption,
                  e = a.getModuleCount(),
                  f = d.width / e,
                  g = d.height / e;
                f <= 1 && (f = 1), g <= 1 && (g = 1);
                var h = f * e,
                  i = g * e;
                (d.heightWithTitle = i + d.titleHeight),
                  (d.realHeight = d.heightWithTitle + 2 * d.quietZone),
                  (d.realWidth = h + 2 * d.quietZone),
                  (this._elCanvas.width = d.realWidth),
                  (this._elCanvas.height = d.realHeight),
                  "canvas" != d.drawer &&
                    (this._oContext = new C2S(
                      this._elCanvas.width,
                      this._elCanvas.height
                    )),
                  this.clear();
                var j = this._oContext;
                (j.lineWidth = 0),
                  (j.fillStyle = d.colorLight),
                  j.fillRect(0, 0, this._elCanvas.width, this._elCanvas.height),
                  j.clearRect(d.quietZone, d.quietZone, d.width, d.titleHeight);
                var k = this;
                if (d.backgroundImage) {
                  var l = new Image();
                  (l.onload = function () {
                    (j.globalAlpha = 1),
                      (j.globalAlpha = d.backgroundImageAlpha);
                    var b = j.imageSmoothingQuality,
                      e = j.imageSmoothingEnabled;
                    (j.imageSmoothingEnabled = !0),
                      (j.imageSmoothingQuality = "high"),
                      (d.title || d.subTitle) && d.titleHeight
                        ? j.drawImage(
                            l,
                            d.quietZone,
                            d.quietZone + d.titleHeight,
                            d.width,
                            d.height
                          )
                        : j.drawImage(l, 0, 0, d.realWidth, d.realHeight),
                      (j.imageSmoothingEnabled = e),
                      (j.imageSmoothingQuality = b),
                      (j.globalAlpha = 1),
                      c.call(k, a);
                  }),
                    null != d.crossOrigin && (l.crossOrigin = d.crossOrigin),
                    (l.originalSrc = d.backgroundImage),
                    (l.src = d.backgroundImage);
                } else c.call(k, a);
              }),
              (e.prototype.makeImage = function () {
                this._bIsPainted && b.call(this, a);
              }),
              (e.prototype.isPainted = function () {
                return this._bIsPainted;
              }),
              (e.prototype.clear = function () {
                this._oContext.clearRect(
                  0,
                  0,
                  this._elCanvas.width,
                  this._elCanvas.height
                ),
                  (this._bIsPainted = !1);
              }),
              (e.prototype.remove = function () {
                this._oContext.clearRect(
                  0,
                  0,
                  this._elCanvas.width,
                  this._elCanvas.height
                ),
                  (this._bIsPainted = !1),
                  (this._el.innerHTML = "");
              }),
              (e.prototype.round = function (a) {
                return a ? Math.floor(1e3 * a) / 1e3 : a;
              }),
              e
            );
          })()
        : (function () {
            var a = function (a, b) {
              (this._el = a), (this._htOption = b);
            };
            return (
              (a.prototype.draw = function (a) {
                var b = this._htOption,
                  c = this._el,
                  d = a.getModuleCount(),
                  e = b.width / d,
                  f = b.height / d;
                e <= 1 && (e = 1), f <= 1 && (f = 1);
                var g = e * d,
                  h = f * d;
                (b.heightWithTitle = h + b.titleHeight),
                  (b.realHeight = b.heightWithTitle + 2 * b.quietZone),
                  (b.realWidth = g + 2 * b.quietZone);
                var i = [],
                  j = "",
                  k = Math.round(e * b.dotScale),
                  l = Math.round(f * b.dotScale);
                k < 4 && ((k = 4), (l = 4));
                var m = b.colorDark,
                  n = b.colorLight;
                if (b.backgroundImage) {
                  b.autoColor
                    ? ((b.colorDark =
                        "rgba(0, 0, 0, .6);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#99000000', EndColorStr='#99000000');"),
                      (b.colorLight =
                        "rgba(255, 255, 255, .7);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr='#B2FFFFFF', EndColorStr='#B2FFFFFF');"))
                    : (b.colorLight = "rgba(0,0,0,0)");
                  var o =
                    '<div style="display:inline-block; z-index:-10;position:absolute;"><img src="' +
                    b.backgroundImage +
                    '" width="' +
                    (b.width + 2 * b.quietZone) +
                    '" height="' +
                    b.realHeight +
                    '" style="opacity:' +
                    b.backgroundImageAlpha +
                    ";filter:alpha(opacity=" +
                    100 * b.backgroundImageAlpha +
                    '); "/></div>';
                  i.push(o);
                }
                if (
                  (b.quietZone &&
                    (j =
                      "display:inline-block; width:" +
                      (b.width + 2 * b.quietZone) +
                      "px; height:" +
                      (b.width + 2 * b.quietZone) +
                      "px;background:" +
                      b.quietZoneColor +
                      "; text-align:center;"),
                  i.push('<div style="font-size:0;' + j + '">'),
                  i.push(
                    '<table  style="font-size:0;border:0;border-collapse:collapse; margin-top:' +
                      b.quietZone +
                      'px;" border="0" cellspacing="0" cellspadding="0" align="center" valign="middle">'
                  ),
                  i.push(
                    '<tr height="' +
                      b.titleHeight +
                      '" align="center"><td style="border:0;border-collapse:collapse;margin:0;padding:0" colspan="' +
                      d +
                      '">'
                  ),
                  b.title)
                ) {
                  var p = b.titleColor,
                    q = b.titleFont;
                  i.push(
                    '<div style="width:100%;margin-top:' +
                      b.titleTop +
                      "px;color:" +
                      p +
                      ";font:" +
                      q +
                      ";background:" +
                      b.titleBackgroundColor +
                      '">' +
                      b.title +
                      "</div>"
                  );
                }
                b.subTitle &&
                  i.push(
                    '<div style="width:100%;margin-top:' +
                      (b.subTitleTop - b.titleTop) +
                      "px;color:" +
                      b.subTitleColor +
                      "; font:" +
                      b.subTitleFont +
                      '">' +
                      b.subTitle +
                      "</div>"
                  ),
                  i.push("</td></tr>");
                for (var r = 0; r < d; r++) {
                  i.push(
                    '<tr style="border:0; padding:0; margin:0;" height="7">'
                  );
                  for (var s = 0; s < d; s++) {
                    var t = a.isDark(r, s),
                      u = a.getEye(r, s);
                    if (u) {
                      t = u.isDark;
                      var v = u.type,
                        w = b[v] || b[v.substring(0, 2)] || m;
                      i.push(
                        '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                          e +
                          "px;height:" +
                          f +
                          'px;"><span style="width:' +
                          e +
                          "px;height:" +
                          f +
                          "px;background-color:" +
                          (t ? w : n) +
                          ';display:inline-block"></span></td>'
                      );
                    } else {
                      var x = b.colorDark;
                      6 == r
                        ? ((x = b.timing_H || b.timing || m),
                          i.push(
                            '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                              e +
                              "px;height:" +
                              f +
                              "px;background-color:" +
                              (t ? x : n) +
                              ';"></td>'
                          ))
                        : 6 == s
                        ? ((x = b.timing_V || b.timing || m),
                          i.push(
                            '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                              e +
                              "px;height:" +
                              f +
                              "px;background-color:" +
                              (t ? x : n) +
                              ';"></td>'
                          ))
                        : i.push(
                            '<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' +
                              e +
                              "px;height:" +
                              f +
                              'px;"><div style="display:inline-block;width:' +
                              k +
                              "px;height:" +
                              l +
                              "px;background-color:" +
                              (t ? x : b.colorLight) +
                              ';"></div></td>'
                          );
                    }
                  }
                  i.push("</tr>");
                }
                if ((i.push("</table>"), i.push("</div>"), b.logo)) {
                  var y = new Image();
                  null != b.crossOrigin && (y.crossOrigin = b.crossOrigin),
                    (y.src = b.logo);
                  var z = b.width / 3.5,
                    A = b.height / 3.5;
                  z != A && (z = A),
                    b.logoWidth && (z = b.logoWidth),
                    b.logoHeight && (A = b.logoHeight);
                  var B =
                    "position:relative; z-index:1;display:table-cell;top:-" +
                    (b.height / 2 + A / 2 + b.quietZone) +
                    "px;text-align:center; width:" +
                    z +
                    "px; height:" +
                    A +
                    "px;line-height:" +
                    z +
                    "px; vertical-align: middle;";
                  b.logoBackgroundTransparent ||
                    (B += "background:" + b.logoBackgroundColor),
                    i.push(
                      '<div style="' +
                        B +
                        '"><img  src="' +
                        b.logo +
                        '"  style="max-width: ' +
                        z +
                        "px; max-height: " +
                        A +
                        'px;" /> <div style=" display: none; width:1px;margin-left: -1px;"></div></div>'
                    );
                }
                b.onRenderingStart && b.onRenderingStart(b),
                  (c.innerHTML = i.join(""));
                var C = c.childNodes[0],
                  D = (b.width - C.offsetWidth) / 2,
                  E = (b.heightWithTitle - C.offsetHeight) / 2;
                D > 0 && E > 0 && (C.style.margin = E + "px " + D + "px"),
                  this._htOption.onRenderingEnd &&
                    this._htOption.onRenderingEnd(this._htOption, null);
              }),
              (a.prototype.clear = function () {
                this._el.innerHTML = "";
              }),
              a
            );
          })();
    (j = function (a, b) {
      if (
        ((this._htOption = {
          width: 256,
          height: 256,
          typeNumber: 4,
          colorDark: "#000000",
          colorLight: "#ffffff",
          correctLevel: r.H,
          dotScale: 1,
          dotScaleTiming: 1,
          dotScaleTiming_H: i,
          dotScaleTiming_V: i,
          dotScaleA: 1,
          dotScaleAO: i,
          dotScaleAI: i,
          quietZone: 0,
          quietZoneColor: "rgba(0,0,0,0)",
          title: "",
          titleFont: "normal normal bold 16px Arial",
          titleColor: "#000000",
          titleBackgroundColor: "#ffffff",
          titleHeight: 0,
          titleTop: 30,
          subTitle: "",
          subTitleFont: "normal normal normal 14px Arial",
          subTitleColor: "#4F4F4F",
          subTitleTop: 60,
          logo: i,
          logoWidth: i,
          logoHeight: i,
          logoMaxWidth: i,
          logoMaxHeight: i,
          logoBackgroundColor: "#ffffff",
          logoBackgroundTransparent: !1,
          PO: i,
          PI: i,
          PO_TL: i,
          PI_TL: i,
          PO_TR: i,
          PI_TR: i,
          PO_BL: i,
          PI_BL: i,
          AO: i,
          AI: i,
          timing: i,
          timing_H: i,
          timing_V: i,
          backgroundImage: i,
          backgroundImageAlpha: 1,
          autoColor: !1,
          autoColorDark: "rgba(0, 0, 0, .6)",
          autoColorLight: "rgba(255, 255, 255, .7)",
          onRenderingStart: i,
          onRenderingEnd: i,
          version: 0,
          tooltip: !1,
          binary: !1,
          drawer: "canvas",
          crossOrigin: null,
          utf8WithoutBOM: !0,
        }),
        "string" == typeof b && (b = { text: b }),
        b)
      )
        for (var c in b) this._htOption[c] = b[c];
      this._htOption.title ||
        this._htOption.subTitle ||
        (this._htOption.titleHeight = 0),
        (this._htOption.version < 0 || this._htOption.version > 40) &&
          (console.warn(
            "QR Code version '" +
              this._htOption.version +
              "' is invalidate, reset to 0"
          ),
          (this._htOption.version = 0)),
        (this._htOption.dotScale < 0 || this._htOption.dotScale > 1) &&
          (console.warn(
            this._htOption.dotScale +
              " , is invalidate, dotScale must greater than 0, less than or equal to 1, now reset to 1. "
          ),
          (this._htOption.dotScale = 1)),
        (this._htOption.dotScaleTiming < 0 ||
          this._htOption.dotScaleTiming > 1) &&
          (console.warn(
            this._htOption.dotScaleTiming +
              " , is invalidate, dotScaleTiming must greater than 0, less than or equal to 1, now reset to 1. "
          ),
          (this._htOption.dotScaleTiming = 1)),
        this._htOption.dotScaleTiming_H
          ? (this._htOption.dotScaleTiming_H < 0 ||
              this._htOption.dotScaleTiming_H > 1) &&
            (console.warn(
              this._htOption.dotScaleTiming_H +
                " , is invalidate, dotScaleTiming_H must greater than 0, less than or equal to 1, now reset to 1. "
            ),
            (this._htOption.dotScaleTiming_H = 1))
          : (this._htOption.dotScaleTiming_H = this._htOption.dotScaleTiming),
        this._htOption.dotScaleTiming_V
          ? (this._htOption.dotScaleTiming_V < 0 ||
              this._htOption.dotScaleTiming_V > 1) &&
            (console.warn(
              this._htOption.dotScaleTiming_V +
                " , is invalidate, dotScaleTiming_V must greater than 0, less than or equal to 1, now reset to 1. "
            ),
            (this._htOption.dotScaleTiming_V = 1))
          : (this._htOption.dotScaleTiming_V = this._htOption.dotScaleTiming),
        (this._htOption.dotScaleA < 0 || this._htOption.dotScaleA > 1) &&
          (console.warn(
            this._htOption.dotScaleA +
              " , is invalidate, dotScaleA must greater than 0, less than or equal to 1, now reset to 1. "
          ),
          (this._htOption.dotScaleA = 1)),
        this._htOption.dotScaleAO
          ? (this._htOption.dotScaleAO < 0 || this._htOption.dotScaleAO > 1) &&
            (console.warn(
              this._htOption.dotScaleAO +
                " , is invalidate, dotScaleAO must greater than 0, less than or equal to 1, now reset to 1. "
            ),
            (this._htOption.dotScaleAO = 1))
          : (this._htOption.dotScaleAO = this._htOption.dotScaleA),
        this._htOption.dotScaleAI
          ? (this._htOption.dotScaleAI < 0 || this._htOption.dotScaleAI > 1) &&
            (console.warn(
              this._htOption.dotScaleAI +
                " , is invalidate, dotScaleAI must greater than 0, less than or equal to 1, now reset to 1. "
            ),
            (this._htOption.dotScaleAI = 1))
          : (this._htOption.dotScaleAI = this._htOption.dotScaleA),
        (this._htOption.backgroundImageAlpha < 0 ||
          this._htOption.backgroundImageAlpha > 1) &&
          (console.warn(
            this._htOption.backgroundImageAlpha +
              " , is invalidate, backgroundImageAlpha must between 0 and 1, now reset to 1. "
          ),
          (this._htOption.backgroundImageAlpha = 1)),
        this._htOption.quietZone || (this._htOption.quietZone = 0),
        this._htOption.titleHeight || (this._htOption.titleHeight = 0),
        (this._htOption.width = Math.round(this._htOption.width)),
        (this._htOption.height = Math.round(this._htOption.height)),
        (this._htOption.quietZone = Math.round(this._htOption.quietZone)),
        (this._htOption.titleHeight = Math.round(this._htOption.titleHeight)),
        "string" == typeof a && (a = document.getElementById(a)),
        (!this._htOption.drawer ||
          ("svg" != this._htOption.drawer &&
            "canvas" != this._htOption.drawer)) &&
          (this._htOption.drawer = "canvas"),
        (this._android = f()),
        (this._el = a),
        (this._oQRCode = null),
        (this._htOption._element = a);
      var d = {};
      for (var c in this._htOption) d[c] = this._htOption[c];
      (this._oDrawing = new x(this._el, d)),
        this._htOption.text && this.makeCode(this._htOption.text);
    }),
      (j.prototype.makeCode = function (a) {
        (this._oQRCode = new b(
          g(a, this._htOption),
          this._htOption.correctLevel
        )),
          this._oQRCode.addData(
            a,
            this._htOption.binary,
            this._htOption.utf8WithoutBOM
          ),
          this._oQRCode.make(),
          this._htOption.tooltip && (this._el.title = a),
          this._oDrawing.draw(this._oQRCode);
      }),
      (j.prototype.makeImage = function () {
        "function" == typeof this._oDrawing.makeImage &&
          (!this._android || this._android >= 3) &&
          this._oDrawing.makeImage();
      }),
      (j.prototype.clear = function () {
        this._oDrawing.remove();
      }),
      (j.prototype.resize = function (a, b) {
        (this._oDrawing._htOption.width = a),
          (this._oDrawing._htOption.height = b),
          this._oDrawing.draw(this._oQRCode);
      }),
      (j.prototype.download = function (a) {
        var b = this._oDrawing.dataURL,
          c = document.createElement("a");
        if ("svg" == this._htOption.drawer) {
          a += ".svg";
          var d = new Blob([b], { type: "text/plain" });
          if (navigator.msSaveBlob) navigator.msSaveBlob(d, a);
          else {
            c.download = a;
            var e = new FileReader();
            (e.onload = function () {
              (c.href = e.result), c.click();
            }),
              e.readAsDataURL(d);
          }
        } else if (((a += ".png"), navigator.msSaveBlob)) {
          var f = (function (a) {
            var b = atob(a.split(",")[1]),
              c = a.split(",")[0].split(":")[1].split(";")[0],
              d = new ArrayBuffer(b.length),
              e = new Uint8Array(d);
            for (v = 0; v < b.length; v++) e[v] = b.charCodeAt(v);
            return new Blob([d], { type: c });
          })(b);
          navigator.msSaveBlob(f, a);
        } else (c.download = a), (c.href = b), c.click();
      }),
      (j.prototype.noConflict = function () {
        return m.QRCode === this && (m.QRCode = p), j;
      }),
      (j.CorrectLevel = r),
      "function" == typeof define && (define.amd || define.cmd)
        ? define([], function () {
            return j;
          })
        : o
        ? (((o.exports = j).QRCode = j), (n.QRCode = j))
        : (m.QRCode = j);
  }.call(this);
defer(function () {
  if ($("#qrcode-share").length) {
    window.qrcode_share = new Vue({
      name: "Qrcode",
      el: "#qrcode-share",
      delimiters: ["%%", "%%"],
      data() {
        return {
          custom_rname: window.custom_rname,
          qrcode: null,
          qrcodeDefaultOption: {
            width: 160,
            height: 160,
            colorDark: "#ff5400",
            colorLight: "#323232",
            correctLevel: QRCode.CorrectLevel.L,
            quietZone: 30,
            drawer: "canvas",
            tooltip: true,
          },
          qrcodeDownloadOption: {
            width: 250,
            height: 250,
            quietZone: 30,
            title: "INSTANT GAMING",
            titleFont: "normal 30px barlow",
            titleColor: "#ffffff",
            titleBackgroundColor: "#323232",
            titleHeight: 50,
            titleTop: 20,
            drawer: "canvas",
          },
        };
      },
      methods: {
        generateQrcode(affiliateLink = null) {
          let container = document.getElementById("qrcode");
          let containerForDownload = document.getElementById("qrcode2");
          container.innerHTML = "";
          containerForDownload.innerHTML = "";
          let url = new URL(affiliateLink ?? window.location.href);
          url.searchParams.forEach((value, key) => {
            if (key.startsWith("utm_")) {
              url.searchParams.delete(key);
            }
          });
          if (!url.searchParams.has("igr")) {
            url.searchParams.append("igr", this.custom_rname);
          }
          url.searchParams.set("utm_source", "ig");
          url.searchParams.set("utm_medium", "qrcode");
          url.searchParams.set("utm_campaign", this.custom_rname);
          this.qrcodeDefaultOption.text = url.href;
          new QRCode(container, this.qrcodeDefaultOption);
          this.qrcode = new QRCode(containerForDownload, {
            ...this.qrcodeDefaultOption,
            ...this.qrcodeDownloadOption,
          });
        },
        downloadQrcode() {
          this.qrcode.download("qrcode");
        },
      },
    });
  }
});
