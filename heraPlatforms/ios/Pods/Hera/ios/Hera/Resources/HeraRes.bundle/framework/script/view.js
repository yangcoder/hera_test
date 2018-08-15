;
var __WAWebviewStartTime__ = Date.now();

function _toArray(e) {
  return Array.isArray(e) ? e : Array.from(e)
}

function _toConsumableArray(e) {
  if (Array.isArray(e)) {
    for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
    return n
  }
  return Array.from(e)
}

function uint8ClampedArrayToBase64(e) {
  for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
  return window.btoa(t)
}

function base64ToUint8ClampedArray(e) {
  for (var t = window.atob(e), n = t.length, i = new Uint8ClampedArray(n), r = 0; r < n; r++) i[r] = t.charCodeAt(r);
  return i
}
var WeixinJSBridge = function(e) {
  "function" == typeof logxx && logxx("jsbridge start");
  var t = "undefined" != typeof __devtoolssubcontext && __devtoolssubcontext;
  if (e.navigator && e.navigator.userAgent) {
    var n = e.navigator.userAgent;
    (n.indexOf("appservice") > -1 || n.indexOf("wechatdevtools") > -1) && (t = !0)
  }
  if (t) {
    var i = e.WeixinJSBridge;
    return delete e.WeixinJSBridge, i
  }
  var r = e.__wxConfig || {},
    o = e.hasOwnProperty("document"),
    a = r.isWK,
    s = {},
    l = 0,
    c = {},
    u = {};
  if (o) {
    var n = e.navigator.userAgent;
    !(-1 != n.indexOf("Android"))
  }
  var d = e.webkit,
    h = e.WeixinJSCore;
  "object" == typeof h && "function" != typeof h.publishHandler && (h.publishHandler = function() {}), delete e.webkit, delete e.WeixinJSCore;
  var p = JSON.parse,
    f = JSON.stringify,
    g = function(e, t) {
      if (void 0 !== e && "function" == typeof s[t] && "" !== e && null !== e) {
        try {
          e = p(e), e = WeixinNativeBuffer.unpack(e)
        } catch (t) {
          e = {}
        }
        s[t](e), delete s[t]
      }
    },
    A = function(e, t, n) {
      if (h) {
        var i = h.invokeHandler(e, t, n);
        g(i, n)
      } else {
        var r = {
          event: e,
          paramsString: t,
          callbackId: n
        };
        if (a) {
          var i = prompt("webgame_invoke", f(r));
          g(i, n)
        } else d.messageHandlers.invokeHandler.postMessage(r)
      }
    },
    v = function(e, t, n) {
      h ? h.publishHandler(e, t, n) : d.messageHandlers.publishHandler.postMessage({
        event: e,
        paramsString: t,
        webviewIds: n
      })
    },
    _ = function(e, t, n) {
      t = WeixinNativeBuffer.pack(t);
      var i = f(t || {}),
        r = ++l;
      s[r] = n, A(e, i, r)
    },
    w = function(e, t) {
      t = WeixinNativeBuffer.unpack(t);
      var n = s[e];
      "function" == typeof n && n(t), delete s[e]
    },
    m = function(e, t) {
      c[e] = t
    },
    b = function(e, t, n) {
      n = n || [], n = f(n);
      var i = "custom_event_" + e,
        r = f(t);
      v(i, r, n)
    },
    y = function(e, t) {
      u["custom_event_" + e] = t
    },
    x = function(e, t, n, i) {
      t = WeixinNativeBuffer.unpack(t);
      var r;
      "function" == typeof(r = -1 != e.indexOf("custom_event_") ? u[e] : c[e]) && r(t, n, i)
    };
  return e.WeixinJSBridge = {
    on: m,
    publish: b,
    invoke: _,
    subscribe: y,
    get invokeCallbackHandler() {
      return w
    },
    get subscribeHandler() {
      return x
    }
  }, r && r.clientDebug && (e.WeixinJSBridge = {
    on: m,
    publish: b,
    invoke: _,
    subscribe: y,
    get invokeCallbackHandler() {
      return w
    },
    get subscribeHandler() {
      return x
    }
  }), {
    on: m,
    publish: b,
    invoke: _,
    subscribe: y,
    get invokeCallbackHandler() {
      return w
    },
    get subscribeHandler() {
      return x
    }
  }
}(this);
! function(e) {
  var t = e.__wxConfig || {},
    n = "undefined" != typeof __devtoolssubcontext && __devtoolssubcontext,
    i = "undefined" != typeof __clientsubcontext && __clientsubcontext,
    r = n || i,
    o = !0 === t.preload,
    a = !o && !r,
    s = [],
    l = function(t) {
      a ? void 0 !== e.__wxConfig && t(e.__wxConfig) : "function" == typeof t && s.push(t)
    },
    c = function() {
      void 0 !== e.__wxConfig && (a = !0, e.__wxConfig.onReady = l, s.forEach(function(t) {
        t(e.__wxConfig)
      }))
    };
  o && function(e) {
    void 0 !== WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
  }(function() {
    WeixinJSBridge.on("onWxConfigReady", c)
  }), e.__wxConfig = e.__wxConfig || {}, e.__wxConfig.onReady = l, e.__wxConfig.__readyHandler = c
}(this);
var NativeBuffer = function(e) {
    var t = e.WeixinNativeBuffer,
      n = e.getNativeBufferId,
      i = e.setNativeBuffer,
      r = e.getNativeBuffer,
      o = e.__wxConfig || {},
      a = !1;
    "android" === o.platform ? a = "function" == typeof n && "function" == typeof i && "function" == typeof r && o.nativeBufferEnabled : "ios" === o.platform && (a = null != t);
    var s = function(e) {
        if (t) return t.new(e);
        if ("function" == typeof n && "function" == typeof i) {
          var r = n(),
            o = e.slice(0);
          return i(r, o), r
        }
        return -1
      },
      l = function(e) {
        return t ? t.get(e) : "function" == typeof r ? r(e) : void 0
      },
      c = function(e) {
        t && t.useCompatibleMode(e)
      },
      u = function(e) {
        var t = {};
        return a ? t.id = s(e) : t.base64 = g(e), t
      },
      d = function(e) {
        if (null != e) return a && void 0 !== e.id ? l(e.id) : void 0 !== e.base64 ? A(e.base64) : void 0
      },
      h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      p = p || function(e) {
        for (var t, n, i = String(e), r = "", o = 0, a = h; i.charAt(0 | o) || (a = "=", o % 1); r += a.charAt(63 & t >> 8 - o % 1 * 8)) {
          if ((n = i.charCodeAt(o += .75)) > 255) throw new Error('"btoa" failed');
          t = t << 8 | n
        }
        return r
      },
      f = f || function(e) {
        var t = String(e).replace(/=+$/, ""),
          n = "";
        if (t.length % 4 == 1) throw new Error('"atob" failed');
        for (var i, r, o = 0, a = 0; r = t.charAt(a++); ~r && (i = o % 4 ? 64 * i + r : r, o++ % 4) ? n += String.fromCharCode(255 & i >> (-2 * o & 6)) : 0) r = h.indexOf(r);
        return n
      },
      g = function(e) {
        var t = "";
        const n = new Uint8Array(e),
          i = n.byteLength;
        for (var r = 0; r < i; r++) t += String.fromCharCode(n[r]);
        return p(t)
      },
      A = function(e) {
        const t = f(e),
          n = t.length,
          i = new Uint8Array(n);
        for (var r = 0; r < n; r++) i[r] = t.charCodeAt(r);
        return i.buffer
      },
      v = function(e) {
        if (null == e) return e;
        var t = [];
        for (var n in e) {
          var i = e[n];
          if (void 0 !== i && i instanceof ArrayBuffer && void 0 !== i.byteLength) {
            var r = u(i);
            r.key = n, t.push(r)
          }
        }
        if (t.length > 0) {
          for (var o = 0; o < t.length; o++) {
            var r = t[o];
            delete e[r.key]
          }
          e.__nativeBuffers__ = t
        }
        return e
      },
      _ = function(e) {
        if (null == e || null == e.__nativeBuffers__) return e;
        var t = e.__nativeBuffers__;
        delete e.__nativeBuffers__;
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          if (null != i) {
            var r = d(i);
            void 0 !== r && r instanceof ArrayBuffer && (e[i.key] = r)
          }
        }
        return e
      };
    return delete e.WeixinNativeBuffer, delete e.getNativeBufferId, delete e.setNativeBuffer, delete e.getNativeBuffer, {
      new: u,
      get: d,
      useCompatibleMode: c,
      pack: v,
      unpack: _
    }
  }(this),
  WeixinNativeBuffer = NativeBuffer;
NativeBuffer = null;
var wxConsole = function() {
  var e = function(e) {
      return Array.prototype.unshift.call(e, "[system]"), e
    },
    t = function(t) {
      return function() {
        console[t].apply(console, e(arguments))
      }
    };
  return {
    log: t("log"),
    info: t("info"),
    warn: t("warn"),
    error: t("error"),
    debug: t("debug"),
    time: t("time"),
    timeEnd: t("timeEnd"),
    group: t("group"),
    groupEnd: t("groupEnd")
  }
}();
! function(e, t, n) {
  "use strict";
  ! function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports
    }
    var n = {};
    t.m = e, t.c = n, t.d = function(e, n, i) {
      t.o(e, n) || Object.defineProperty(e, n, {
        configurable: !1,
        enumerable: !0,
        get: i
      })
    }, t.n = function(e) {
      var n = e && e.__esModule ? function() {
        return e.default
      } : function() {
        return e
      };
      return t.d(n, "a", n), n
    }, t.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t)
    }, t.p = "", t(t.s = 104)
  }([function(e, t, i) {
    var r = i(3),
      o = i(30),
      a = i(14),
      s = i(11),
      l = i(16),
      c = function(e, t, i) {
        var u, d, h, p, f = e & c.F,
          g = e & c.G,
          A = e & c.S,
          v = e & c.P,
          _ = e & c.B,
          w = g ? r : A ? r[t] || (r[t] = {}) : (r[t] || {}).prototype,
          m = g ? o : o[t] || (o[t] = {}),
          b = m.prototype || (m.prototype = {});
        g && (i = t);
        for (u in i) d = !f && w && w[u] !== n, h = (d ? w : i)[u], p = _ && d ? l(h, r) : v && "function" == typeof h ? l(Function.call, h) : h, w && s(w, u, h, e & c.U), m[u] != h && a(m, u, p), v && b[u] != h && (b[u] = h)
      };
    r.core = o, c.F = 1, c.G = 2, c.S = 4, c.P = 8, c.B = 16, c.W = 32, c.U = 64, c.R = 128, e.exports = c
  }, function(e, t) {
    e.exports = function(e) {
      try {
        return !!e()
      } catch (e) {
        return !0
      }
    }
  }, function(e, t) {
    e.exports = function(e) {
      return "object" == typeof e ? null !== e : "function" == typeof e
    }
  }, function(e, n) {
    var i = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
    "number" == typeof t && (t = i)
  }, function(e, t, n) {
    var i = n(2);
    e.exports = function(e) {
      if (!i(e)) throw TypeError(e + " is not an object!");
      return e
    }
  }, function(e, t, n) {
    var i = n(57)("wks"),
      r = n(31),
      o = n(3).Symbol,
      a = "function" == typeof o;
    (e.exports = function(e) {
      return i[e] || (i[e] = a && o[e] || (a ? o : r)("Symbol." + e))
    }).store = i
  }, function(e, t, n) {
    var i = n(4),
      r = n(79),
      o = n(24),
      a = Object.defineProperty;
    t.f = n(7) ? Object.defineProperty : function(e, t, n) {
      if (i(e), t = o(t, !0), i(n), r) try {
        return a(e, t, n)
      } catch (e) {}
      if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
      return "value" in n && (e[t] = n.value), e
    }
  }, function(e, t, n) {
    e.exports = !n(1)(function() {
      return 7 != Object.defineProperty({}, "a", {
        get: function() {
          return 7
        }
      }).a
    })
  }, function(e, t, n) {
    var i = n(21),
      r = Math.min;
    e.exports = function(e) {
      return e > 0 ? r(i(e), 9007199254740991) : 0
    }
  }, function(e, t) {
    var n = {}.hasOwnProperty;
    e.exports = function(e, t) {
      return n.call(e, t)
    }
  }, function(e, t, n) {
    var i = n(0),
      r = n(1),
      o = n(26),
      a = /"/g,
      s = function(e, t, n, i) {
        var r = String(o(e)),
          s = "<" + t;
        return "" !== n && (s += " " + n + '="' + String(i).replace(a, "&quot;") + '"'), s + ">" + r + "</" + t + ">"
      };
    e.exports = function(e, t) {
      var n = {};
      n[e] = t(s), i(i.P + i.F * r(function() {
        var t = "" [e]('"');
        return t !== t.toLowerCase() || t.split('"').length > 3
      }), "String", n)
    }
  }, function(e, t, n) {
    var i = n(3),
      r = n(14),
      o = n(9),
      a = n(31)("src"),
      s = Function.toString,
      l = ("" + s).split("toString");
    n(30).inspectSource = function(e) {
      return s.call(e)
    }, (e.exports = function(e, t, n, s) {
      var c = "function" == typeof n;
      c && (o(n, "name") || r(n, "name", t)), e[t] !== n && (c && (o(n, a) || r(n, a, e[t] ? "" + e[t] : l.join(String(t)))), e === i ? e[t] = n : s ? e[t] ? e[t] = n : r(e, t, n) : (delete e[t], r(e, t, n)))
    })(Function.prototype, "toString", function() {
      return "function" == typeof this && this[a] || s.call(this)
    })
  }, function(e, t, n) {
    var i = n(42),
      r = n(26);
    e.exports = function(e) {
      return i(r(e))
    }
  }, function(e, t, n) {
    var i = n(26);
    e.exports = function(e) {
      return Object(i(e))
    }
  }, function(e, t, n) {
    var i = n(6),
      r = n(25);
    e.exports = n(7) ? function(e, t, n) {
      return i.f(e, t, r(1, n))
    } : function(e, t, n) {
      return e[t] = n, e
    }
  }, function(e, t, n) {
    var i = n(1);
    e.exports = function(e, t) {
      return !!e && i(function() {
        t ? e.call(null, function() {}, 1) : e.call(null)
      })
    }
  }, function(e, t, i) {
    var r = i(17);
    e.exports = function(e, t, i) {
      if (r(e), t === n) return e;
      switch (i) {
        case 1:
          return function(n) {
            return e.call(t, n)
          };
        case 2:
          return function(n, i) {
            return e.call(t, n, i)
          };
        case 3:
          return function(n, i, r) {
            return e.call(t, n, i, r)
          }
      }
      return function() {
        return e.apply(t, arguments)
      }
    }
  }, function(e, t) {
    e.exports = function(e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e
    }
  }, function(e, t, n) {
    var i = n(0),
      r = n(30),
      o = n(1);
    e.exports = function(e, t) {
      var n = (r.Object || {})[e] || Object[e],
        a = {};
      a[e] = t(n), i(i.S + i.F * o(function() {
        n(1)
      }), "Object", a)
    }
  }, function(e, t, i) {
    var r = i(16),
      o = i(42),
      a = i(13),
      s = i(8),
      l = i(201);
    e.exports = function(e, t) {
      var i = 1 == e,
        c = 2 == e,
        u = 3 == e,
        d = 4 == e,
        h = 6 == e,
        p = 5 == e || h,
        f = t || l;
      return function(t, l, g) {
        for (var A, v, _ = a(t), w = o(_), m = r(l, g, 3), b = s(w.length), y = 0, x = i ? f(t, b) : c ? f(t, 0) : n; b > y; y++)
          if ((p || y in w) && (A = w[y], v = m(A, y, _), e))
            if (i) x[y] = v;
            else if (v) switch (e) {
          case 3:
            return !0;
          case 5:
            return A;
          case 6:
            return y;
          case 2:
            x.push(A)
        } else if (d) return !1;
        return h ? -1 : u || d ? d : x
      }
    }
  }, function(e, t) {
    var n = {}.toString;
    e.exports = function(e) {
      return n.call(e).slice(8, -1)
    }
  }, function(e, t) {
    var n = Math.ceil,
      i = Math.floor;
    e.exports = function(e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? i : n)(e)
    }
  }, function(e, t, n) {
    var i = n(47),
      r = n(25),
      o = n(12),
      a = n(24),
      s = n(9),
      l = n(79),
      c = Object.getOwnPropertyDescriptor;
    t.f = n(7) ? c : function(e, t) {
      if (e = o(e), t = a(t, !0), l) try {
        return c(e, t)
      } catch (e) {}
      if (s(e, t)) return r(!i.f.call(e, t), e[t])
    }
  }, function(e, t, i) {
    if (i(7)) {
      var r = i(37),
        o = i(3),
        a = i(1),
        s = i(0),
        l = i(52),
        c = i(76),
        u = i(16),
        d = i(40),
        h = i(25),
        p = i(14),
        f = i(39),
        g = i(21),
        A = i(8),
        v = i(101),
        _ = i(33),
        w = i(24),
        m = i(9),
        b = i(44),
        y = i(2),
        x = i(13),
        C = i(60),
        S = i(27),
        E = i(28),
        I = i(34).f,
        k = i(61),
        P = i(31),
        T = i(5),
        D = i(19),
        B = i(55),
        M = i(77),
        N = i(97),
        R = i(35),
        O = i(49),
        F = i(38),
        L = i(74),
        j = i(96),
        $ = i(6),
        Q = i(22),
        W = $.f,
        H = Q.f,
        V = o.RangeError,
        z = o.TypeError,
        Y = o.Uint8Array,
        J = Array.prototype,
        U = c.ArrayBuffer,
        G = c.DataView,
        X = D(0),
        Z = D(2),
        K = D(3),
        q = D(4),
        ee = D(5),
        te = D(6),
        ne = B(!0),
        ie = B(!1),
        re = N.values,
        oe = N.keys,
        ae = N.entries,
        se = J.lastIndexOf,
        le = J.reduce,
        ce = J.reduceRight,
        ue = J.join,
        de = J.sort,
        he = J.slice,
        pe = J.toString,
        fe = J.toLocaleString,
        ge = T("iterator"),
        Ae = T("toStringTag"),
        ve = P("typed_constructor"),
        _e = P("def_constructor"),
        we = l.CONSTR,
        me = l.TYPED,
        be = l.VIEW,
        ye = D(1, function(e, t) {
          return Ie(M(e, e[_e]), t)
        }),
        xe = a(function() {
          return 1 === new Y(new Uint16Array([1]).buffer)[0]
        }),
        Ce = !!Y && !!Y.prototype.set && a(function() {
          new Y(1).set({})
        }),
        Se = function(e, t) {
          var n = g(e);
          if (n < 0 || n % t) throw V("Wrong offset!");
          return n
        },
        Ee = function(e) {
          if (y(e) && me in e) return e;
          throw z(e + " is not a typed array!")
        },
        Ie = function(e, t) {
          if (!(y(e) && ve in e)) throw z("It is not a typed array constructor!");
          return new e(t)
        },
        ke = function(e, t) {
          return Pe(M(e, e[_e]), t)
        },
        Pe = function(e, t) {
          for (var n = 0, i = t.length, r = Ie(e, i); i > n;) r[n] = t[n++];
          return r
        },
        Te = function(e, t, n) {
          W(e, t, {
            get: function() {
              return this._d[n]
            }
          })
        },
        De = function(e) {
          var t, i, r, o, a, s, l = x(e),
            c = arguments.length,
            d = c > 1 ? arguments[1] : n,
            h = d !== n,
            p = k(l);
          if (p != n && !C(p)) {
            for (s = p.call(l), r = [], t = 0; !(a = s.next()).done; t++) r.push(a.value);
            l = r
          }
          for (h && c > 2 && (d = u(d, arguments[2], 2)), t = 0, i = A(l.length), o = Ie(this, i); i > t; t++) o[t] = h ? d(l[t], t) : l[t];
          return o
        },
        Be = function() {
          for (var e = 0, t = arguments.length, n = Ie(this, t); t > e;) n[e] = arguments[e++];
          return n
        },
        Me = !!Y && a(function() {
          fe.call(new Y(1))
        }),
        Ne = function() {
          return fe.apply(Me ? he.call(Ee(this)) : Ee(this), arguments)
        },
        Re = {
          copyWithin: function(e, t) {
            return j.call(Ee(this), e, t, arguments.length > 2 ? arguments[2] : n)
          },
          every: function(e) {
            return q(Ee(this), e, arguments.length > 1 ? arguments[1] : n)
          },
          fill: function(e) {
            return L.apply(Ee(this), arguments)
          },
          filter: function(e) {
            return ke(this, Z(Ee(this), e, arguments.length > 1 ? arguments[1] : n))
          },
          find: function(e) {
            return ee(Ee(this), e, arguments.length > 1 ? arguments[1] : n)
          },
          findIndex: function(e) {
            return te(Ee(this), e, arguments.length > 1 ? arguments[1] : n)
          },
          forEach: function(e) {
            X(Ee(this), e, arguments.length > 1 ? arguments[1] : n)
          },
          indexOf: function(e) {
            return ie(Ee(this), e, arguments.length > 1 ? arguments[1] : n)
          },
          includes: function(e) {
            return ne(Ee(this), e, arguments.length > 1 ? arguments[1] : n)
          },
          join: function(e) {
            return ue.apply(Ee(this), arguments)
          },
          lastIndexOf: function(e) {
            return se.apply(Ee(this), arguments)
          },
          map: function(e) {
            return ye(Ee(this), e, arguments.length > 1 ? arguments[1] : n)
          },
          reduce: function(e) {
            return le.apply(Ee(this), arguments)
          },
          reduceRight: function(e) {
            return ce.apply(Ee(this), arguments)
          },
          reverse: function() {
            for (var e, t = this, n = Ee(t).length, i = Math.floor(n / 2), r = 0; r < i;) e = t[r], t[r++] = t[--n], t[n] = e;
            return t
          },
          some: function(e) {
            return K(Ee(this), e, arguments.length > 1 ? arguments[1] : n)
          },
          sort: function(e) {
            return de.call(Ee(this), e)
          },
          subarray: function(e, t) {
            var i = Ee(this),
              r = i.length,
              o = _(e, r);
            return new(M(i, i[_e]))(i.buffer, i.byteOffset + o * i.BYTES_PER_ELEMENT, A((t === n ? r : _(t, r)) - o))
          }
        },
        Oe = function(e, t) {
          return ke(this, he.call(Ee(this), e, t))
        },
        Fe = function(e) {
          Ee(this);
          var t = Se(arguments[1], 1),
            n = this.length,
            i = x(e),
            r = A(i.length),
            o = 0;
          if (r + t > n) throw V("Wrong length!");
          for (; o < r;) this[t + o] = i[o++]
        },
        Le = {
          entries: function() {
            return ae.call(Ee(this))
          },
          keys: function() {
            return oe.call(Ee(this))
          },
          values: function() {
            return re.call(Ee(this))
          }
        },
        je = function(e, t) {
          return y(e) && e[me] && "symbol" != typeof t && t in e && String(+t) == String(t)
        },
        $e = function(e, t) {
          return je(e, t = w(t, !0)) ? h(2, e[t]) : H(e, t)
        },
        Qe = function(e, t, n) {
          return !(je(e, t = w(t, !0)) && y(n) && m(n, "value")) || m(n, "get") || m(n, "set") || n.configurable || m(n, "writable") && !n.writable || m(n, "enumerable") && !n.enumerable ? W(e, t, n) : (e[t] = n.value, e)
        };
      we || (Q.f = $e, $.f = Qe), s(s.S + s.F * !we, "Object", {
        getOwnPropertyDescriptor: $e,
        defineProperty: Qe
      }), a(function() {
        pe.call({})
      }) && (pe = fe = function() {
        return ue.call(this)
      });
      var We = f({}, Re);
      f(We, Le), p(We, ge, Le.values), f(We, {
        slice: Oe,
        set: Fe,
        constructor: function() {},
        toString: pe,
        toLocaleString: Ne
      }), Te(We, "buffer", "b"), Te(We, "byteOffset", "o"), Te(We, "byteLength", "l"), Te(We, "length", "e"), W(We, Ae, {
        get: function() {
          return this[me]
        }
      }), e.exports = function(e, t, i, c) {
        c = !!c;
        var u = e + (c ? "Clamped" : "") + "Array",
          h = "get" + e,
          f = "set" + e,
          g = o[u],
          _ = g || {},
          w = g && E(g),
          m = !g || !l.ABV,
          x = {},
          C = g && g.prototype,
          k = function(e, n) {
            var i = e._d;
            return i.v[h](n * t + i.o, xe)
          },
          P = function(e, n, i) {
            var r = e._d;
            c && (i = (i = Math.round(i)) < 0 ? 0 : i > 255 ? 255 : 255 & i), r.v[f](n * t + r.o, i, xe)
          },
          T = function(e, t) {
            W(e, t, {
              get: function() {
                return k(this, t)
              },
              set: function(e) {
                return P(this, t, e)
              },
              enumerable: !0
            })
          };
        m ? (g = i(function(e, i, r, o) {
          d(e, g, u, "_d");
          var a, s, l, c, h = 0,
            f = 0;
          if (y(i)) {
            if (!(i instanceof U || "ArrayBuffer" == (c = b(i)) || "SharedArrayBuffer" == c)) return me in i ? Pe(g, i) : De.call(g, i);
            a = i, f = Se(r, t);
            var _ = i.byteLength;
            if (o === n) {
              if (_ % t) throw V("Wrong length!");
              if ((s = _ - f) < 0) throw V("Wrong length!")
            } else if ((s = A(o) * t) + f > _) throw V("Wrong length!");
            l = s / t
          } else l = v(i), s = l * t, a = new U(s);
          for (p(e, "_d", {
              b: a,
              o: f,
              l: s,
              e: l,
              v: new G(a)
            }); h < l;) T(e, h++)
        }), C = g.prototype = S(We), p(C, "constructor", g)) : a(function() {
          g(1)
        }) && a(function() {
          new g(-1)
        }) && O(function(e) {
          new g, new g(null), new g(1.5), new g(e)
        }, !0) || (g = i(function(e, i, r, o) {
          d(e, g, u);
          var a;
          return y(i) ? i instanceof U || "ArrayBuffer" == (a = b(i)) || "SharedArrayBuffer" == a ? o !== n ? new _(i, Se(r, t), o) : r !== n ? new _(i, Se(r, t)) : new _(i) : me in i ? Pe(g, i) : De.call(g, i) : new _(v(i))
        }), X(w !== Function.prototype ? I(_).concat(I(w)) : I(_), function(e) {
          e in g || p(g, e, _[e])
        }), g.prototype = C, r || (C.constructor = g));
        var D = C[ge],
          B = !!D && ("values" == D.name || D.name == n),
          M = Le.values;
        p(g, ve, !0), p(C, me, u), p(C, be, !0), p(C, _e, g), (c ? new g(1)[Ae] == u : Ae in C) || W(C, Ae, {
          get: function() {
            return u
          }
        }), x[u] = g, s(s.G + s.W + s.F * (g != _), x), s(s.S, u, {
          BYTES_PER_ELEMENT: t
        }), s(s.S + s.F * a(function() {
          _.of.call(g, 1)
        }), u, {
          from: De,
          of: Be
        }), "BYTES_PER_ELEMENT" in C || p(C, "BYTES_PER_ELEMENT", t), s(s.P, u, Re), F(u), s(s.P + s.F * Ce, u, {
          set: Fe
        }), s(s.P + s.F * !B, u, Le), r || C.toString == pe || (C.toString = pe), s(s.P + s.F * a(function() {
          new g(1).slice()
        }), u, {
          slice: Oe
        }), s(s.P + s.F * (a(function() {
          return [1, 2].toLocaleString() != new g([1, 2]).toLocaleString()
        }) || !a(function() {
          C.toLocaleString.call([1, 2])
        })), u, {
          toLocaleString: Ne
        }), R[u] = B ? D : M, r || B || p(C, ge, M)
      }
    } else e.exports = function() {}
  }, function(e, t, n) {
    var i = n(2);
    e.exports = function(e, t) {
      if (!i(e)) return e;
      var n, r;
      if (t && "function" == typeof(n = e.toString) && !i(r = n.call(e))) return r;
      if ("function" == typeof(n = e.valueOf) && !i(r = n.call(e))) return r;
      if (!t && "function" == typeof(n = e.toString) && !i(r = n.call(e))) return r;
      throw TypeError("Can't convert object to primitive value")
    }
  }, function(e, t) {
    e.exports = function(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      }
    }
  }, function(e, t) {
    e.exports = function(e) {
      if (e == n) throw TypeError("Can't call method on  " + e);
      return e
    }
  }, function(e, t, i) {
    var r = i(4),
      o = i(81),
      a = i(58),
      s = i(56)("IE_PROTO"),
      l = function() {},
      c = function() {
        var e, t = i(53)("iframe"),
          n = a.length;
        for (t.style.display = "none", i(59).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object<\/script>"), e.close(), c = e.F; n--;) delete c.prototype[a[n]];
        return c()
      };
    e.exports = Object.create || function(e, t) {
      var i;
      return null !== e ? (l.prototype = r(e), i = new l, l.prototype = null, i[s] = e) : i = c(), t === n ? i : o(i, t)
    }
  }, function(e, t, n) {
    var i = n(9),
      r = n(13),
      o = n(56)("IE_PROTO"),
      a = Object.prototype;
    e.exports = Object.getPrototypeOf || function(e) {
      return e = r(e), i(e, o) ? e[o] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
    }
  }, function(e, t, n) {
    var i = n(31)("meta"),
      r = n(2),
      o = n(9),
      a = n(6).f,
      s = 0,
      l = Object.isExtensible || function() {
        return !0
      },
      c = !n(1)(function() {
        return l(Object.preventExtensions({}))
      }),
      u = function(e) {
        a(e, i, {
          value: {
            i: "O" + ++s,
            w: {}
          }
        })
      },
      d = function(e, t) {
        if (!r(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
        if (!o(e, i)) {
          if (!l(e)) return "F";
          if (!t) return "E";
          u(e)
        }
        return e[i].i
      },
      h = function(e, t) {
        if (!o(e, i)) {
          if (!l(e)) return !0;
          if (!t) return !1;
          u(e)
        }
        return e[i].w
      },
      p = function(e) {
        return c && f.NEED && l(e) && !o(e, i) && u(e), e
      },
      f = e.exports = {
        KEY: i,
        NEED: !1,
        fastKey: d,
        getWeak: h,
        onFreeze: p
      }
  }, function(t, n) {
    var i = t.exports = {
      version: "2.5.1"
    };
    "number" == typeof e && (e = i)
  }, function(e, t) {
    var i = 0,
      r = Math.random();
    e.exports = function(e) {
      return "Symbol(".concat(e === n ? "" : e, ")_", (++i + r).toString(36))
    }
  }, function(e, t, n) {
    var i = n(80),
      r = n(58);
    e.exports = Object.keys || function(e) {
      return i(e, r)
    }
  }, function(e, t, n) {
    var i = n(21),
      r = Math.max,
      o = Math.min;
    e.exports = function(e, t) {
      return e = i(e), e < 0 ? r(e + t, 0) : o(e, t)
    }
  }, function(e, t, n) {
    var i = n(80),
      r = n(58).concat("length", "prototype");
    t.f = Object.getOwnPropertyNames || function(e) {
      return i(e, r)
    }
  }, function(e, t) {
    e.exports = {}
  }, function(e, t, n) {
    var i = n(6).f,
      r = n(9),
      o = n(5)("toStringTag");
    e.exports = function(e, t, n) {
      e && !r(e = n ? e : e.prototype, o) && i(e, o, {
        configurable: !0,
        value: t
      })
    }
  }, function(e, t) {
    e.exports = !1
  }, function(e, t, n) {
    var i = n(3),
      r = n(6),
      o = n(7),
      a = n(5)("species");
    e.exports = function(e) {
      var t = i[e];
      o && t && !t[a] && r.f(t, a, {
        configurable: !0,
        get: function() {
          return this
        }
      })
    }
  }, function(e, t, n) {
    var i = n(11);
    e.exports = function(e, t, n) {
      for (var r in t) i(e, r, t[r], n);
      return e
    }
  }, function(e, t) {
    e.exports = function(e, t, i, r) {
      if (!(e instanceof t) || r !== n && r in e) throw TypeError(i + ": incorrect invocation!");
      return e
    }
  }, function(e, t, n) {
    var i = n(2);
    e.exports = function(e, t) {
      if (!i(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
      return e
    }
  }, function(e, t, n) {
    var i = n(20);
    e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
      return "String" == i(e) ? e.split("") : Object(e)
    }
  }, function(e, t, n) {
    var i = n(16),
      r = n(82),
      o = n(60),
      a = n(4),
      s = n(8),
      l = n(61),
      c = {},
      u = {},
      t = e.exports = function(e, t, n, d, h) {
        var p, f, g, A, v = h ? function() {
            return e
          } : l(e),
          _ = i(n, d, t ? 2 : 1),
          w = 0;
        if ("function" != typeof v) throw TypeError(e + " is not iterable!");
        if (o(v)) {
          for (p = s(e.length); p > w; w++)
            if ((A = t ? _(a(f = e[w])[0], f[1]) : _(e[w])) === c || A === u) return A
        } else
          for (g = v.call(e); !(f = g.next()).done;)
            if ((A = r(g, _, f.value, t)) === c || A === u) return A
      };
    t.BREAK = c, t.RETURN = u
  }, function(e, t, i) {
    var r = i(20),
      o = i(5)("toStringTag"),
      a = "Arguments" == r(function() {
        return arguments
      }()),
      s = function(e, t) {
        try {
          return e[t]
        } catch (e) {}
      };
    e.exports = function(e) {
      var t, i, l;
      return e === n ? "Undefined" : null === e ? "Null" : "string" == typeof(i = s(t = Object(e), o)) ? i : a ? r(t) : "Object" == (l = r(t)) && "function" == typeof t.callee ? "Arguments" : l
    }
  }, function(e, t, i) {
    var r = i(5)("unscopables"),
      o = Array.prototype;
    o[r] == n && i(14)(o, r, {}), e.exports = function(e) {
      o[r][e] = !0
    }
  }, function(e, t) {
    t.f = Object.getOwnPropertySymbols
  }, function(e, t) {
    t.f = {}.propertyIsEnumerable
  }, function(e, t, n) {
    var i = n(0),
      r = n(26),
      o = n(1),
      a = n(66),
      s = "[" + a + "]",
      l = "​",
      c = RegExp("^" + s + s + "*"),
      u = RegExp(s + s + "*$"),
      d = function(e, t, n) {
        var r = {},
          s = o(function() {
            return !!a[e]() || l[e]() != l
          }),
          c = r[e] = s ? t(h) : a[e];
        n && (r[n] = c), i(i.P + i.F * s, "String", r)
      },
      h = d.trim = function(e, t) {
        return e = String(r(e)), 1 & t && (e = e.replace(c, "")), 2 & t && (e = e.replace(u, "")), e
      };
    e.exports = d
  }, function(e, t, n) {
    var i = n(5)("iterator"),
      r = !1;
    try {
      var o = [7][i]();
      o.return = function() {
        r = !0
      }, Array.from(o, function() {
        throw 2
      })
    } catch (e) {}
    e.exports = function(e, t) {
      if (!t && !r) return !1;
      var n = !1;
      try {
        var o = [7],
          a = o[i]();
        a.next = function() {
          return {
            done: n = !0
          }
        }, o[i] = function() {
          return a
        }, e(o)
      } catch (e) {}
      return n
    }
  }, function(e, t, n) {
    var i = n(14),
      r = n(11),
      o = n(1),
      a = n(26),
      s = n(5);
    e.exports = function(e, t, n) {
      var l = s(e),
        c = n(a, l, "" [e]),
        u = c[0],
        d = c[1];
      o(function() {
        var t = {};
        return t[l] = function() {
          return 7
        }, 7 != "" [e](t)
      }) && (r(String.prototype, e, u), i(RegExp.prototype, l, 2 == t ? function(e, t) {
        return d.call(e, this, t)
      } : function(e) {
        return d.call(e, this)
      }))
    }
  }, function(e, t, i) {
    var r = i(3),
      o = i(0),
      a = i(11),
      s = i(39),
      l = i(29),
      c = i(43),
      u = i(40),
      d = i(2),
      h = i(1),
      p = i(49),
      f = i(36),
      g = i(67);
    e.exports = function(e, t, i, A, v, _) {
      var w = r[e],
        m = w,
        b = v ? "set" : "add",
        y = m && m.prototype,
        x = {},
        C = function(e) {
          var t = y[e];
          a(y, e, "delete" == e ? function(e) {
            return !(_ && !d(e)) && t.call(this, 0 === e ? 0 : e)
          } : "has" == e ? function(e) {
            return !(_ && !d(e)) && t.call(this, 0 === e ? 0 : e)
          } : "get" == e ? function(e) {
            return _ && !d(e) ? n : t.call(this, 0 === e ? 0 : e)
          } : "add" == e ? function(e) {
            return t.call(this, 0 === e ? 0 : e), this
          } : function(e, n) {
            return t.call(this, 0 === e ? 0 : e, n), this
          })
        };
      if ("function" == typeof m && (_ || y.forEach && !h(function() {
          (new m).entries().next()
        }))) {
        var S = new m,
          E = S[b](_ ? {} : -0, 1) != S,
          I = h(function() {
            S.has(1)
          }),
          k = p(function(e) {
            new m(e)
          }),
          P = !_ && h(function() {
            for (var e = new m, t = 5; t--;) e[b](t, t);
            return !e.has(-0)
          });
        k || (m = t(function(t, i) {
          u(t, m, e);
          var r = g(new w, t, m);
          return i != n && c(i, v, r[b], r), r
        }), m.prototype = y, y.constructor = m), (I || P) && (C("delete"), C("has"), v && C("get")), (P || E) && C(b), _ && y.clear && delete y.clear
      } else m = A.getConstructor(t, e, v, b), s(m.prototype, i), l.NEED = !0;
      return f(m, e), x[e] = m, o(o.G + o.W + o.F * (m != w), x), _ || A.setStrong(m, e, v), m
    }
  }, function(e, t, n) {
    for (var i, r = n(3), o = n(14), a = n(31), s = a("typed_array"), l = a("view"), c = !(!r.ArrayBuffer || !r.DataView), u = c, d = 0, h = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); d < 9;)(i = r[h[d++]]) ? (o(i.prototype, s, !0), o(i.prototype, l, !0)) : u = !1;
    e.exports = {
      ABV: c,
      CONSTR: u,
      TYPED: s,
      VIEW: l
    }
  }, function(e, t, n) {
    var i = n(2),
      r = n(3).document,
      o = i(r) && i(r.createElement);
    e.exports = function(e) {
      return o ? r.createElement(e) : {}
    }
  }, function(e, t, n) {
    var i = n(32),
      r = n(46),
      o = n(47),
      a = n(13),
      s = n(42),
      l = Object.assign;
    e.exports = !l || n(1)(function() {
      var e = {},
        t = {},
        n = Symbol(),
        i = "abcdefghijklmnopqrst";
      return e[n] = 7, i.split("").forEach(function(e) {
        t[e] = e
      }), 7 != l({}, e)[n] || Object.keys(l({}, t)).join("") != i
    }) ? function(e, t) {
      for (var n = a(e), l = arguments.length, c = 1, u = r.f, d = o.f; l > c;)
        for (var h, p = s(arguments[c++]), f = u ? i(p).concat(u(p)) : i(p), g = f.length, A = 0; g > A;) d.call(p, h = f[A++]) && (n[h] = p[h]);
      return n
    } : l
  }, function(e, t, n) {
    var i = n(12),
      r = n(8),
      o = n(33);
    e.exports = function(e) {
      return function(t, n, a) {
        var s, l = i(t),
          c = r(l.length),
          u = o(a, c);
        if (e && n != n) {
          for (; c > u;)
            if ((s = l[u++]) != s) return !0
        } else
          for (; c > u; u++)
            if ((e || u in l) && l[u] === n) return e || u || 0;
        return !e && -1
      }
    }
  }, function(e, t, n) {
    var i = n(57)("keys"),
      r = n(31);
    e.exports = function(e) {
      return i[e] || (i[e] = r(e))
    }
  }, function(e, t, n) {
    var i = n(3),
      r = i["__core-js_shared__"] || (i["__core-js_shared__"] = {});
    e.exports = function(e) {
      return r[e] || (r[e] = {})
    }
  }, function(e, t) {
    e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
  }, function(e, t, n) {
    var i = n(3).document;
    e.exports = i && i.documentElement
  }, function(e, t, i) {
    var r = i(35),
      o = i(5)("iterator"),
      a = Array.prototype;
    e.exports = function(e) {
      return e !== n && (r.Array === e || a[o] === e)
    }
  }, function(e, t, i) {
    var r = i(44),
      o = i(5)("iterator"),
      a = i(35);
    e.exports = i(30).getIteratorMethod = function(e) {
      if (e != n) return e[o] || e["@@iterator"] || a[r(e)]
    }
  }, function(e, t, n) {
    var i = n(27),
      r = n(25),
      o = n(36),
      a = {};
    n(14)(a, n(5)("iterator"), function() {
      return this
    }), e.exports = function(e, t, n) {
      e.prototype = i(a, {
        next: r(1, n)
      }), o(e, t + " Iterator")
    }
  }, function(e, t) {
    e.exports = function(e, t) {
      return {
        value: t,
        done: !!e
      }
    }
  }, function(e, t, n) {
    var i = n(20);
    e.exports = Array.isArray || function(e) {
      return "Array" == i(e)
    }
  }, function(e, t, i) {
    var r = i(2),
      o = i(4),
      a = function(e, t) {
        if (o(e), !r(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
      };
    e.exports = {
      set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
        try {
          n = i(16)(Function.call, i(22).f(Object.prototype, "__proto__").set, 2), n(e, []), t = !(e instanceof Array)
        } catch (e) {
          t = !0
        }
        return function(e, i) {
          return a(e, i), t ? e.__proto__ = i : n(e, i), e
        }
      }({}, !1) : n),
      check: a
    }
  }, function(e, t) {
    e.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"
  }, function(e, t, n) {
    var i = n(2),
      r = n(65).set;
    e.exports = function(e, t, n) {
      var o, a = t.constructor;
      return a !== n && "function" == typeof a && (o = a.prototype) !== n.prototype && i(o) && r && r(e, o), e
    }
  }, function(e, t) {
    e.exports = Math.sign || function(e) {
      return 0 == (e = +e) || e != e ? e : e < 0 ? -1 : 1
    }
  }, function(e, t) {
    var n = Math.expm1;
    e.exports = !n || n(10) > 22025.465794806718 || n(10) < 22025.465794806718 || -2e-17 != n(-2e-17) ? function(e) {
      return 0 == (e = +e) ? e : e > -1e-6 && e < 1e-6 ? e + e * e / 2 : Math.exp(e) - 1
    } : n
  }, function(e, t, i) {
    var r = i(37),
      o = i(0),
      a = i(11),
      s = i(14),
      l = i(9),
      c = i(35),
      u = i(62),
      d = i(36),
      h = i(28),
      p = i(5)("iterator"),
      f = !([].keys && "next" in [].keys()),
      g = function() {
        return this
      };
    e.exports = function(e, t, i, A, v, _, w) {
      u(i, t, A);
      var m, b, y, x = function(e) {
          if (!f && e in I) return I[e];
          switch (e) {
            case "keys":
            case "values":
              return function() {
                return new i(this, e)
              }
          }
          return function() {
            return new i(this, e)
          }
        },
        C = t + " Iterator",
        S = "values" == v,
        E = !1,
        I = e.prototype,
        k = I[p] || I["@@iterator"] || v && I[v],
        P = k || x(v),
        T = v ? S ? x("entries") : P : n,
        D = "Array" == t ? I.entries || k : k;
      if (D && (y = h(D.call(new e))) !== Object.prototype && y.next && (d(y, C, !0), r || l(y, p) || s(y, p, g)), S && k && "values" !== k.name && (E = !0, P = function() {
          return k.call(this)
        }), r && !w || !f && !E && I[p] || s(I, p, P), c[t] = P, c[C] = g, v)
        if (m = {
            values: S ? P : x("values"),
            keys: _ ? P : x("keys"),
            entries: T
          }, w)
          for (b in m) b in I || a(I, b, m[b]);
        else o(o.P + o.F * (f || E), t, m);
      return m
    }
  }, function(e, t, n) {
    var i = n(72),
      r = n(26);
    e.exports = function(e, t, n) {
      if (i(t)) throw TypeError("String#" + n + " doesn't accept regex!");
      return String(r(e))
    }
  }, function(e, t, i) {
    var r = i(2),
      o = i(20),
      a = i(5)("match");
    e.exports = function(e) {
      var t;
      return r(e) && ((t = e[a]) !== n ? !!t : "RegExp" == o(e))
    }
  }, function(e, t, n) {
    var i = n(5)("match");
    e.exports = function(e) {
      var t = /./;
      try {
        "/./" [e](t)
      } catch (n) {
        try {
          return t[i] = !1, !"/./" [e](t)
        } catch (e) {}
      }
      return !0
    }
  }, function(e, t, i) {
    var r = i(13),
      o = i(33),
      a = i(8);
    e.exports = function(e) {
      for (var t = r(this), i = a(t.length), s = arguments.length, l = o(s > 1 ? arguments[1] : n, i), c = s > 2 ? arguments[2] : n, u = c === n ? i : o(c, i); u > l;) t[l++] = e;
      return t
    }
  }, function(e, t, n) {
    var i = n(4);
    e.exports = function() {
      var e = i(this),
        t = "";
      return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
    }
  }, function(e, t, i) {
    function r(e, t, n) {
      var i, r, o, a = Array(n),
        s = 8 * n - t - 1,
        l = (1 << s) - 1,
        c = l >> 1,
        u = 23 === t ? j(2, -24) - j(2, -77) : 0,
        d = 0,
        h = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = L(e), e != e || e === O ? (r = e != e ? 1 : 0, i = l) : (i = $(Q(e) / W), e * (o = j(2, -i)) < 1 && (i--, o *= 2), e += i + c >= 1 ? u / o : u * j(2, 1 - c), e * o >= 2 && (i++, o /= 2), i + c >= l ? (r = 0, i = l) : i + c >= 1 ? (r = (e * o - 1) * j(2, t), i += c) : (r = e * j(2, c - 1) * j(2, t), i = 0)); t >= 8; a[d++] = 255 & r, r /= 256, t -= 8);
      for (i = i << t | r, s += t; s > 0; a[d++] = 255 & i, i /= 256, s -= 8);
      return a[--d] |= 128 * h, a
    }

    function o(e, t, n) {
      var i, r = 8 * n - t - 1,
        o = (1 << r) - 1,
        a = o >> 1,
        s = r - 7,
        l = n - 1,
        c = e[l--],
        u = 127 & c;
      for (c >>= 7; s > 0; u = 256 * u + e[l], l--, s -= 8);
      for (i = u & (1 << -s) - 1, u >>= -s, s += t; s > 0; i = 256 * i + e[l], l--, s -= 8);
      if (0 === u) u = 1 - a;
      else {
        if (u === o) return i ? NaN : c ? -O : O;
        i += j(2, t), u -= a
      }
      return (c ? -1 : 1) * i * j(2, u - t)
    }

    function a(e) {
      return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
    }

    function s(e) {
      return [255 & e]
    }

    function l(e) {
      return [255 & e, e >> 8 & 255]
    }

    function c(e) {
      return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
    }

    function u(e) {
      return r(e, 52, 8)
    }

    function d(e) {
      return r(e, 23, 4)
    }

    function h(e, t, n) {
      I(e[T], t, {
        get: function() {
          return this[n]
        }
      })
    }

    function p(e, t, n, i) {
      var r = +n,
        o = S(r);
      if (o + t > e[V]) throw R(D);
      var a = e[H]._b,
        s = o + e[z],
        l = a.slice(s, s + t);
      return i ? l : l.reverse()
    }

    function f(e, t, n, i, r, o) {
      var a = +n,
        s = S(a);
      if (s + t > e[V]) throw R(D);
      for (var l = e[H]._b, c = s + e[z], u = i(+r), d = 0; d < t; d++) l[c + d] = u[o ? d : t - d - 1]
    }
    var g = i(3),
      A = i(7),
      v = i(37),
      _ = i(52),
      w = i(14),
      m = i(39),
      b = i(1),
      y = i(40),
      x = i(21),
      C = i(8),
      S = i(101),
      E = i(34).f,
      I = i(6).f,
      k = i(74),
      P = i(36),
      T = "prototype",
      D = "Wrong index!",
      B = g.ArrayBuffer,
      M = g.DataView,
      N = g.Math,
      R = g.RangeError,
      O = g.Infinity,
      F = B,
      L = N.abs,
      j = N.pow,
      $ = N.floor,
      Q = N.log,
      W = N.LN2,
      H = A ? "_b" : "buffer",
      V = A ? "_l" : "byteLength",
      z = A ? "_o" : "byteOffset";
    if (_.ABV) {
      if (!b(function() {
          B(1)
        }) || !b(function() {
          new B(-1)
        }) || b(function() {
          return new B, new B(1.5), new B(NaN), "ArrayBuffer" != B.name
        })) {
        B = function(e) {
          return y(this, B), new F(S(e))
        };
        for (var Y, J = B[T] = F[T], U = E(F), G = 0; U.length > G;)(Y = U[G++]) in B || w(B, Y, F[Y]);
        v || (J.constructor = B)
      }
      var X = new M(new B(2)),
        Z = M[T].setInt8;
      X.setInt8(0, 2147483648), X.setInt8(1, 2147483649), !X.getInt8(0) && X.getInt8(1) || m(M[T], {
        setInt8: function(e, t) {
          Z.call(this, e, t << 24 >> 24)
        },
        setUint8: function(e, t) {
          Z.call(this, e, t << 24 >> 24)
        }
      }, !0)
    } else B = function(e) {
      y(this, B, "ArrayBuffer");
      var t = S(e);
      this._b = k.call(Array(t), 0), this[V] = t
    }, M = function(e, t, i) {
      y(this, M, "DataView"), y(e, B, "DataView");
      var r = e[V],
        o = x(t);
      if (o < 0 || o > r) throw R("Wrong offset!");
      if (i = i === n ? r - o : C(i), o + i > r) throw R("Wrong length!");
      this[H] = e, this[z] = o, this[V] = i
    }, A && (h(B, "byteLength", "_l"), h(M, "buffer", "_b"), h(M, "byteLength", "_l"), h(M, "byteOffset", "_o")), m(M[T], {
      getInt8: function(e) {
        return p(this, 1, e)[0] << 24 >> 24
      },
      getUint8: function(e) {
        return p(this, 1, e)[0]
      },
      getInt16: function(e) {
        var t = p(this, 2, e, arguments[1]);
        return (t[1] << 8 | t[0]) << 16 >> 16
      },
      getUint16: function(e) {
        var t = p(this, 2, e, arguments[1]);
        return t[1] << 8 | t[0]
      },
      getInt32: function(e) {
        return a(p(this, 4, e, arguments[1]))
      },
      getUint32: function(e) {
        return a(p(this, 4, e, arguments[1])) >>> 0
      },
      getFloat32: function(e) {
        return o(p(this, 4, e, arguments[1]), 23, 4)
      },
      getFloat64: function(e) {
        return o(p(this, 8, e, arguments[1]), 52, 8)
      },
      setInt8: function(e, t) {
        f(this, 1, e, s, t)
      },
      setUint8: function(e, t) {
        f(this, 1, e, s, t)
      },
      setInt16: function(e, t) {
        f(this, 2, e, l, t, arguments[2])
      },
      setUint16: function(e, t) {
        f(this, 2, e, l, t, arguments[2])
      },
      setInt32: function(e, t) {
        f(this, 4, e, c, t, arguments[2])
      },
      setUint32: function(e, t) {
        f(this, 4, e, c, t, arguments[2])
      },
      setFloat32: function(e, t) {
        f(this, 4, e, d, t, arguments[2])
      },
      setFloat64: function(e, t) {
        f(this, 8, e, u, t, arguments[2])
      }
    });
    P(B, "ArrayBuffer"), P(M, "DataView"), w(M[T], _.VIEW, !0), t.ArrayBuffer = B, t.DataView = M
  }, function(e, t, i) {
    var r = i(4),
      o = i(17),
      a = i(5)("species");
    e.exports = function(e, t) {
      var i, s = r(e).constructor;
      return s === n || (i = r(s)[a]) == n ? t : o(i)
    }
  }, function(e, t) {
    var n = !0;
    try {
      new Proxy({}, {});
      n = !1
    } catch (e) {}
    var i = !1;
    "undefined" != typeof __wxConfig && void 0 !== __wxConfig.platform && "ios" === __wxConfig.platform.toLowerCase() && (i = !0), void 0 !== WeixinJSBridge && WeixinJSBridge.invoke("getSystemInfo", {}, function(e) {
      e && e.platform && "ios" === e.platform.toLowerCase() && (i = !0)
    }), e.exports = {
      needCoreJS: n,
      isIOS: i
    }
  }, function(e, t, n) {
    e.exports = !n(7) && !n(1)(function() {
      return 7 != Object.defineProperty(n(53)("div"), "a", {
        get: function() {
          return 7
        }
      }).a
    })
  }, function(e, t, n) {
    var i = n(9),
      r = n(12),
      o = n(55)(!1),
      a = n(56)("IE_PROTO");
    e.exports = function(e, t) {
      var n, s = r(e),
        l = 0,
        c = [];
      for (n in s) n != a && i(s, n) && c.push(n);
      for (; t.length > l;) i(s, n = t[l++]) && (~o(c, n) || c.push(n));
      return c
    }
  }, function(e, t, n) {
    var i = n(6),
      r = n(4),
      o = n(32);
    e.exports = n(7) ? Object.defineProperties : function(e, t) {
      r(e);
      for (var n, a = o(t), s = a.length, l = 0; s > l;) i.f(e, n = a[l++], t[n]);
      return e
    }
  }, function(e, t, i) {
    var r = i(4);
    e.exports = function(e, t, i, o) {
      try {
        return o ? t(r(i)[0], i[1]) : t(i)
      } catch (t) {
        var a = e.return;
        throw a !== n && r(a.call(e)), t
      }
    }
  }, function(e, t, n) {
    t.f = n(5)
  }, function(e, t, n) {
    var i = n(12),
      r = n(34).f,
      o = {}.toString,
      a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
      s = function(e) {
        try {
          return r(e)
        } catch (e) {
          return a.slice()
        }
      };
    e.exports.f = function(e) {
      return a && "[object Window]" == o.call(e) ? s(e) : r(i(e))
    }
  }, function(e, t, n) {
    var i = n(17),
      r = n(2),
      o = n(86),
      a = [].slice,
      s = {},
      l = function(e, t, n) {
        if (!(t in s)) {
          for (var i = [], r = 0; r < t; r++) i[r] = "a[" + r + "]";
          s[t] = Function("F,a", "return new F(" + i.join(",") + ")")
        }
        return s[t](e, n)
      };
    e.exports = Function.bind || function(e) {
      var t = i(this),
        n = a.call(arguments, 1),
        s = function() {
          var i = n.concat(a.call(arguments));
          return this instanceof s ? l(t, i.length, i) : o(t, i, e)
        };
      return r(t.prototype) && (s.prototype = t.prototype), s
    }
  }, function(e, t) {
    e.exports = function(e, t, i) {
      var r = i === n;
      switch (t.length) {
        case 0:
          return r ? e() : e.call(i);
        case 1:
          return r ? e(t[0]) : e.call(i, t[0]);
        case 2:
          return r ? e(t[0], t[1]) : e.call(i, t[0], t[1]);
        case 3:
          return r ? e(t[0], t[1], t[2]) : e.call(i, t[0], t[1], t[2]);
        case 4:
          return r ? e(t[0], t[1], t[2], t[3]) : e.call(i, t[0], t[1], t[2], t[3])
      }
      return e.apply(i, t)
    }
  }, function(e, t, n) {
    var i = n(3).parseInt,
      r = n(48).trim,
      o = n(66),
      a = /^[-+]?0[xX]/;
    e.exports = 8 !== i(o + "08") || 22 !== i(o + "0x16") ? function(e, t) {
      var n = r(String(e), 3);
      return i(n, t >>> 0 || (a.test(n) ? 16 : 10))
    } : i
  }, function(e, t, n) {
    var i = n(3).parseFloat,
      r = n(48).trim;
    e.exports = 1 / i(n(66) + "-0") != -1 / 0 ? function(e) {
      var t = r(String(e), 3),
        n = i(t);
      return 0 === n && "-" == t.charAt(0) ? -0 : n
    } : i
  }, function(e, t, n) {
    var i = n(20);
    e.exports = function(e, t) {
      if ("number" != typeof e && "Number" != i(e)) throw TypeError(t);
      return +e
    }
  }, function(e, t, n) {
    var i = n(21),
      r = n(26);
    e.exports = function(e) {
      var t = String(r(this)),
        n = "",
        o = i(e);
      if (o < 0 || o == 1 / 0) throw RangeError("Count can't be negative");
      for (; o > 0;
        (o >>>= 1) && (t += t)) 1 & o && (n += t);
      return n
    }
  }, function(e, t, n) {
    var i = n(2),
      r = Math.floor;
    e.exports = function(e) {
      return !i(e) && isFinite(e) && r(e) === e
    }
  }, function(e, t) {
    e.exports = Math.log1p || function(e) {
      return (e = +e) > -1e-8 && e < 1e-8 ? e - e * e / 2 : Math.log(1 + e)
    }
  }, function(e, t, i) {
    var r = i(21),
      o = i(26);
    e.exports = function(e) {
      return function(t, i) {
        var a, s, l = String(o(t)),
          c = r(i),
          u = l.length;
        return c < 0 || c >= u ? e ? "" : n : (a = l.charCodeAt(c), a < 55296 || a > 56319 || c + 1 === u || (s = l.charCodeAt(c + 1)) < 56320 || s > 57343 ? e ? l.charAt(c) : a : e ? l.slice(c, c + 2) : s - 56320 + (a - 55296 << 10) + 65536)
      }
    }
  }, function(e, t, n) {
    var i = n(6),
      r = n(25);
    e.exports = function(e, t, n) {
      t in e ? i.f(e, t, r(0, n)) : e[t] = n
    }
  }, function(e, t, n) {
    var i = n(17),
      r = n(13),
      o = n(42),
      a = n(8);
    e.exports = function(e, t, n, s, l) {
      i(t);
      var c = r(e),
        u = o(c),
        d = a(c.length),
        h = l ? d - 1 : 0,
        p = l ? -1 : 1;
      if (n < 2)
        for (;;) {
          if (h in u) {
            s = u[h], h += p;
            break
          }
          if (h += p, l ? h < 0 : d <= h) throw TypeError("Reduce of empty array with no initial value")
        }
      for (; l ? h >= 0 : d > h; h += p) h in u && (s = t(s, u[h], h, c));
      return s
    }
  }, function(e, t, i) {
    var r = i(13),
      o = i(33),
      a = i(8);
    e.exports = [].copyWithin || function(e, t) {
      var i = r(this),
        s = a(i.length),
        l = o(e, s),
        c = o(t, s),
        u = arguments.length > 2 ? arguments[2] : n,
        d = Math.min((u === n ? s : o(u, s)) - c, s - l),
        h = 1;
      for (c < l && l < c + d && (h = -1, c += d - 1, l += d - 1); d-- > 0;) c in i ? i[l] = i[c] : delete i[l], l += h, c += h;
      return i
    }
  }, function(e, t, i) {
    var r = i(45),
      o = i(63),
      a = i(35),
      s = i(12);
    e.exports = i(70)(Array, "Array", function(e, t) {
      this._t = s(e), this._i = 0, this._k = t
    }, function() {
      var e = this._t,
        t = this._k,
        i = this._i++;
      return !e || i >= e.length ? (this._t = n, o(1)) : "keys" == t ? o(0, i) : "values" == t ? o(0, e[i]) : o(0, [i, e[i]])
    }, "values"), a.Arguments = a.Array, r("keys"), r("values"), r("entries")
  }, function(e, t, n) {
    n(7) && "g" != /./g.flags && n(6).f(RegExp.prototype, "flags", {
      configurable: !0,
      get: n(75)
    })
  }, function(e, t, i) {
    var r = i(6).f,
      o = i(27),
      a = i(39),
      s = i(16),
      l = i(40),
      c = i(43),
      u = i(70),
      d = i(63),
      h = i(38),
      p = i(7),
      f = i(29).fastKey,
      g = i(41),
      A = p ? "_s" : "size",
      v = function(e, t) {
        var n, i = f(t);
        if ("F" !== i) return e._i[i];
        for (n = e._f; n; n = n.n)
          if (n.k == t) return n
      };
    e.exports = {
      getConstructor: function(e, t, i, u) {
        var d = e(function(e, r) {
          l(e, d, t, "_i"), e._t = t, e._i = o(null), e._f = n, e._l = n, e[A] = 0, r != n && c(r, i, e[u], e)
        });
        return a(d.prototype, {
          clear: function() {
            for (var e = g(this, t), i = e._i, r = e._f; r; r = r.n) r.r = !0, r.p && (r.p = r.p.n = n), delete i[r.i];
            e._f = e._l = n, e[A] = 0
          },
          delete: function(e) {
            var n = g(this, t),
              i = v(n, e);
            if (i) {
              var r = i.n,
                o = i.p;
              delete n._i[i.i], i.r = !0, o && (o.n = r), r && (r.p = o), n._f == i && (n._f = r), n._l == i && (n._l = o), n[A]--
            }
            return !!i
          },
          forEach: function(e) {
            g(this, t);
            for (var i, r = s(e, arguments.length > 1 ? arguments[1] : n, 3); i = i ? i.n : this._f;)
              for (r(i.v, i.k, this); i && i.r;) i = i.p
          },
          has: function(e) {
            return !!v(g(this, t), e)
          }
        }), p && r(d.prototype, "size", {
          get: function() {
            return g(this, t)[A]
          }
        }), d
      },
      def: function(e, t, i) {
        var r, o, a = v(e, t);
        return a ? a.v = i : (e._l = a = {
          i: o = f(t, !0),
          k: t,
          v: i,
          p: r = e._l,
          n: n,
          r: !1
        }, e._f || (e._f = a), r && (r.n = a), e[A]++, "F" !== o && (e._i[o] = a)), e
      },
      getEntry: v,
      setStrong: function(e, t, i) {
        u(e, t, function(e, i) {
          this._t = g(e, t), this._k = i, this._l = n
        }, function() {
          for (var e = this, t = e._k, i = e._l; i && i.r;) i = i.p;
          return e._t && (e._l = i = i ? i.n : e._t._f) ? "keys" == t ? d(0, i.k) : "values" == t ? d(0, i.v) : d(0, [i.k, i.v]) : (e._t = n, d(1))
        }, i ? "entries" : "values", !i, !0), h(t)
      }
    }
  }, function(e, t, i) {
    var r = i(39),
      o = i(29).getWeak,
      a = i(4),
      s = i(2),
      l = i(40),
      c = i(43),
      u = i(19),
      d = i(9),
      h = i(41),
      p = u(5),
      f = u(6),
      g = 0,
      A = function(e) {
        return e._l || (e._l = new v)
      },
      v = function() {
        this.a = []
      },
      _ = function(e, t) {
        return p(e.a, function(e) {
          return e[0] === t
        })
      };
    v.prototype = {
      get: function(e) {
        var t = _(this, e);
        if (t) return t[1]
      },
      has: function(e) {
        return !!_(this, e)
      },
      set: function(e, t) {
        var n = _(this, e);
        n ? n[1] = t : this.a.push([e, t])
      },
      delete: function(e) {
        var t = f(this.a, function(t) {
          return t[0] === e
        });
        return ~t && this.a.splice(t, 1), !!~t
      }
    }, e.exports = {
      getConstructor: function(e, t, i, a) {
        var u = e(function(e, r) {
          l(e, u, t, "_i"), e._t = t, e._i = g++, e._l = n, r != n && c(r, i, e[a], e)
        });
        return r(u.prototype, {
          delete: function(e) {
            if (!s(e)) return !1;
            var n = o(e);
            return !0 === n ? A(h(this, t)).delete(e) : n && d(n, this._i) && delete n[this._i]
          },
          has: function(e) {
            if (!s(e)) return !1;
            var n = o(e);
            return !0 === n ? A(h(this, t)).has(e) : n && d(n, this._i)
          }
        }), u
      },
      def: function(e, t, n) {
        var i = o(a(t), !0);
        return !0 === i ? A(e).set(t, n) : i[e._i] = n, e
      },
      ufstore: A
    }
  }, function(e, t, i) {
    var r = i(21),
      o = i(8);
    e.exports = function(e) {
      if (e === n) return 0;
      var t = r(e),
        i = o(t);
      if (t !== i) throw RangeError("Wrong length!");
      return i
    }
  }, function(e, t, n) {
    var i, r, o, a = n(16),
      s = n(86),
      l = n(59),
      c = n(53),
      u = n(3),
      d = u.process,
      h = u.setImmediate,
      p = u.clearImmediate,
      f = u.MessageChannel,
      g = u.Dispatch,
      A = 0,
      v = {},
      _ = function() {
        var e = +this;
        if (v.hasOwnProperty(e)) {
          var t = v[e];
          delete v[e], t()
        }
      },
      w = function(e) {
        _.call(e.data)
      };
    h && p || (h = function(e) {
      for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
      return v[++A] = function() {
        s("function" == typeof e ? e : Function(e), t)
      }, i(A), A
    }, p = function(e) {
      delete v[e]
    }, "process" == n(20)(d) ? i = function(e) {
      d.nextTick(a(_, e, 1))
    } : g && g.now ? i = function(e) {
      g.now(a(_, e, 1))
    } : f ? (r = new f, o = r.port2, r.port1.onmessage = w, i = a(o.postMessage, o, 1)) : u.addEventListener && "function" == typeof postMessage && !u.importScripts ? (i = function(e) {
      u.postMessage(e + "", "*")
    }, u.addEventListener("message", w, !1)) : i = "onreadystatechange" in c("script") ? function(e) {
      l.appendChild(c("script")).onreadystatechange = function() {
        l.removeChild(this), _.call(e)
      }
    } : function(e) {
      setTimeout(a(_, e, 1), 0)
    }), e.exports = {
      set: h,
      clear: p
    }
  }, function(e, t, i) {
    function r(e) {
      var t, i;
      this.promise = new e(function(e, r) {
        if (t !== n || i !== n) throw TypeError("Bad Promise constructor");
        t = e, i = r
      }), this.resolve = o(t), this.reject = o(i)
    }
    var o = i(17);
    e.exports.f = function(e) {
      return new r(e)
    }
  }, function(e, t, n) {
    e.exports = n(105)
  }, function(e, t, i) {
    var r = i(78),
      o = r.needCoreJS || r.isIOS;
    o && "undefined" != typeof Promise && (Promise = n), i(3), r.needCoreJS && (i(106), i(109), i(112), i(113), i(114), i(115), i(116), i(117), i(118), i(119), i(120), i(121), i(122), i(123), i(124), i(125), i(126), i(128), i(129), i(130), i(131), i(132), i(133), i(134), i(135), i(136), i(137), i(138), i(139), i(140), i(141), i(142), i(143), i(144), i(145), i(146), i(147), i(148), i(149), i(150), i(151), i(152), i(153), i(154), i(156), i(157), i(158), i(159), i(160), i(161), i(162), i(163), i(164), i(165), i(166), i(167), i(168), i(169), i(170), i(171), i(172), i(173), i(174), i(175), i(176), i(177), i(178), i(179), i(180), i(181), i(182), i(183), i(184), i(185), i(186), i(187), i(188), i(189), i(191), i(192), i(194), i(195), i(196), i(197), i(198), i(199), i(200), i(203), i(204), i(205), i(206), i(207), i(208), i(209), i(210), i(211), i(212), i(213), i(214), i(215), i(97), i(216), i(217), i(98), i(218), i(219), i(220), i(221), i(222), i(223), i(224), i(225), i(226), i(227), i(228), i(229), i(230), i(231), i(232), i(233), i(234), i(235), i(236), i(237), i(238), i(239), i(240), i(241), i(242), i(243), i(244), i(245), i(246), i(247), i(249), i(250), i(251)), o && i(252)
  }, function(e, t, i) {
    function r(e) {
      var t = f(null);
      return e != n && (b(e) ? m(e, !0, function(e, n) {
        t[e] = n
      }) : p(t, e)), t
    }

    function o(e, t, n) {
      w(t);
      var i, r, o = S(e),
        a = A(o),
        s = a.length,
        l = 0;
      if (arguments.length < 3) {
        if (!s) throw TypeError("Reduce of empty object with no initial value");
        i = o[a[l++]]
      } else i = Object(n);
      for (; s > l;) I(o, r = a[l++]) && (i = t(i, o[r], r, e));
      return i
    }

    function a(e, t) {
      return (t == t ? _(e, t) : P(e, function(e) {
        return e != e
      })) !== n
    }

    function s(e, t) {
      if (I(e, t)) return e[t]
    }

    function l(e, t, n) {
      return E && t in Object ? v.f(e, t, h(0, n)) : e[t] = n, e
    }

    function c(e) {
      return C(e) && g(e) === r.prototype
    }
    var u = i(16),
      d = i(0),
      h = i(25),
      p = i(54),
      f = i(27),
      g = i(28),
      A = i(32),
      v = i(6),
      _ = i(107),
      w = i(17),
      m = i(43),
      b = i(108),
      y = i(62),
      x = i(63),
      C = i(2),
      S = i(12),
      E = i(7),
      I = i(9),
      k = function(e) {
        var t = 1 == e,
          i = 4 == e;
        return function(o, a, s) {
          var l, c, d, h = u(a, s, 3),
            p = S(o),
            f = t || 7 == e || 2 == e ? new("function" == typeof this ? this : r) : n;
          for (l in p)
            if (I(p, l) && (c = p[l], d = h(c, l, o), e))
              if (t) f[l] = d;
              else if (d) switch (e) {
            case 2:
              f[l] = c;
              break;
            case 3:
              return !0;
            case 5:
              return c;
            case 6:
              return l;
            case 7:
              f[d[0]] = d[1]
          } else if (i) return !1;
          return 3 == e || i ? i : f
        }
      },
      P = k(6),
      T = function(e) {
        return function(t) {
          return new D(t, e)
        }
      },
      D = function(e, t) {
        this._t = S(e), this._a = A(e), this._i = 0, this._k = t
      };
    y(D, "Dict", function() {
      var e, t = this,
        i = t._t,
        r = t._a,
        o = t._k;
      do {
        if (t._i >= r.length) return t._t = n, x(1)
      } while (!I(i, e = r[t._i++]));
      return "keys" == o ? x(0, e) : "values" == o ? x(0, i[e]) : x(0, [e, i[e]])
    }), r.prototype = null, d(d.G + d.F, {
      Dict: r
    }), d(d.S, "Dict", {
      keys: T("keys"),
      values: T("values"),
      entries: T("entries"),
      forEach: k(0),
      map: k(1),
      filter: k(2),
      some: k(3),
      every: k(4),
      find: k(5),
      findKey: P,
      mapPairs: k(7),
      reduce: o,
      keyOf: _,
      includes: a,
      has: I,
      get: s,
      set: l,
      isDict: c
    })
  }, function(e, t, n) {
    var i = n(32),
      r = n(12);
    e.exports = function(e, t) {
      for (var n, o = r(e), a = i(o), s = a.length, l = 0; s > l;)
        if (o[n = a[l++]] === t) return n
    }
  }, function(e, t, i) {
    var r = i(44),
      o = i(5)("iterator"),
      a = i(35);
    e.exports = i(30).isIterable = function(e) {
      var t = Object(e);
      return t[o] !== n || "@@iterator" in t || a.hasOwnProperty(r(t))
    }
  }, function(e, t, i) {
    var r = i(3),
      o = i(9),
      a = i(7),
      s = i(0),
      l = i(11),
      c = i(29).KEY,
      u = i(1),
      d = i(57),
      h = i(36),
      p = i(31),
      f = i(5),
      g = i(83),
      A = i(110),
      v = i(111),
      _ = i(64),
      w = i(4),
      m = i(12),
      b = i(24),
      y = i(25),
      x = i(27),
      C = i(84),
      S = i(22),
      E = i(6),
      I = i(32),
      k = S.f,
      P = E.f,
      T = C.f,
      D = r.Symbol,
      B = r.JSON,
      M = B && B.stringify,
      N = f("_hidden"),
      R = f("toPrimitive"),
      O = {}.propertyIsEnumerable,
      F = d("symbol-registry"),
      L = d("symbols"),
      j = d("op-symbols"),
      $ = Object.prototype,
      Q = "function" == typeof D,
      W = r.QObject,
      H = !W || !W.prototype || !W.prototype.findChild,
      V = a && u(function() {
        return 7 != x(P({}, "a", {
          get: function() {
            return P(this, "a", {
              value: 7
            }).a
          }
        })).a
      }) ? function(e, t, n) {
        var i = k($, t);
        i && delete $[t], P(e, t, n), i && e !== $ && P($, t, i)
      } : P,
      z = function(e) {
        var t = L[e] = x(D.prototype);
        return t._k = e, t
      },
      Y = Q && "symbol" == typeof D.iterator ? function(e) {
        return "symbol" == typeof e
      } : function(e) {
        return e instanceof D
      },
      J = function(e, t, n) {
        return e === $ && J(j, t, n), w(e), t = b(t, !0), w(n), o(L, t) ? (n.enumerable ? (o(e, N) && e[N][t] && (e[N][t] = !1), n = x(n, {
          enumerable: y(0, !1)
        })) : (o(e, N) || P(e, N, y(1, {})), e[N][t] = !0), V(e, t, n)) : P(e, t, n)
      },
      U = function(e, t) {
        w(e);
        for (var n, i = v(t = m(t)), r = 0, o = i.length; o > r;) J(e, n = i[r++], t[n]);
        return e
      },
      G = function(e, t) {
        return t === n ? x(e) : U(x(e), t)
      },
      X = function(e) {
        var t = O.call(this, e = b(e, !0));
        return !(this === $ && o(L, e) && !o(j, e)) && (!(t || !o(this, e) || !o(L, e) || o(this, N) && this[N][e]) || t)
      },
      Z = function(e, t) {
        if (e = m(e), t = b(t, !0), e !== $ || !o(L, t) || o(j, t)) {
          var n = k(e, t);
          return !n || !o(L, t) || o(e, N) && e[N][t] || (n.enumerable = !0), n
        }
      },
      K = function(e) {
        for (var t, n = T(m(e)), i = [], r = 0; n.length > r;) o(L, t = n[r++]) || t == N || t == c || i.push(t);
        return i
      },
      q = function(e) {
        for (var t, n = e === $, i = T(n ? j : m(e)), r = [], a = 0; i.length > a;) !o(L, t = i[a++]) || n && !o($, t) || r.push(L[t]);
        return r
      };
    Q || (D = function() {
      if (this instanceof D) throw TypeError("Symbol is not a constructor!");
      var e = p(arguments.length > 0 ? arguments[0] : n),
        t = function(n) {
          this === $ && t.call(j, n), o(this, N) && o(this[N], e) && (this[N][e] = !1), V(this, e, y(1, n))
        };
      return a && H && V($, e, {
        configurable: !0,
        set: t
      }), z(e)
    }, l(D.prototype, "toString", function() {
      return this._k
    }), S.f = Z, E.f = J, i(34).f = C.f = K, i(47).f = X, i(46).f = q, a && !i(37) && l($, "propertyIsEnumerable", X, !0), g.f = function(e) {
      return z(f(e))
    }), s(s.G + s.W + s.F * !Q, {
      Symbol: D
    });
    for (var ee = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), te = 0; ee.length > te;) f(ee[te++]);
    for (var ne = I(f.store), ie = 0; ne.length > ie;) A(ne[ie++]);
    s(s.S + s.F * !Q, "Symbol", {
      for: function(e) {
        return o(F, e += "") ? F[e] : F[e] = D(e)
      },
      keyFor: function(e) {
        if (!Y(e)) throw TypeError(e + " is not a symbol!");
        for (var t in F)
          if (F[t] === e) return t
      },
      useSetter: function() {
        H = !0
      },
      useSimple: function() {
        H = !1
      }
    }), s(s.S + s.F * !Q, "Object", {
      create: G,
      defineProperty: J,
      defineProperties: U,
      getOwnPropertyDescriptor: Z,
      getOwnPropertyNames: K,
      getOwnPropertySymbols: q
    }), B && s(s.S + s.F * (!Q || u(function() {
      var e = D();
      return "[null]" != M([e]) || "{}" != M({
        a: e
      }) || "{}" != M(Object(e))
    })), "JSON", {
      stringify: function(e) {
        if (e !== n && !Y(e)) {
          for (var t, i, r = [e], o = 1; arguments.length > o;) r.push(arguments[o++]);
          return t = r[1], "function" == typeof t && (i = t), !i && _(t) || (t = function(e, t) {
            if (i && (t = i.call(this, e, t)), !Y(t)) return t
          }), r[1] = t, M.apply(B, r)
        }
      }
    }), D.prototype[R] || i(14)(D.prototype, R, D.prototype.valueOf), h(D, "Symbol"), h(Math, "Math", !0), h(r.JSON, "JSON", !0)
  }, function(e, t, n) {
    var i = n(3),
      r = n(30),
      o = n(37),
      a = n(83),
      s = n(6).f;
    e.exports = function(e) {
      var t = r.Symbol || (r.Symbol = o ? {} : i.Symbol || {});
      "_" == e.charAt(0) || e in t || s(t, e, {
        value: a.f(e)
      })
    }
  }, function(e, t, n) {
    var i = n(32),
      r = n(46),
      o = n(47);
    e.exports = function(e) {
      var t = i(e),
        n = r.f;
      if (n)
        for (var a, s = n(e), l = o.f, c = 0; s.length > c;) l.call(e, a = s[c++]) && t.push(a);
      return t
    }
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Object", {
      create: n(27)
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S + i.F * !n(7), "Object", {
      defineProperty: n(6).f
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S + i.F * !n(7), "Object", {
      defineProperties: n(81)
    })
  }, function(e, t, n) {
    var i = n(12),
      r = n(22).f;
    n(18)("getOwnPropertyDescriptor", function() {
      return function(e, t) {
        return r(i(e), t)
      }
    })
  }, function(e, t, n) {
    var i = n(13),
      r = n(28);
    n(18)("getPrototypeOf", function() {
      return function(e) {
        return r(i(e))
      }
    })
  }, function(e, t, n) {
    var i = n(13),
      r = n(32);
    n(18)("keys", function() {
      return function(e) {
        return r(i(e))
      }
    })
  }, function(e, t, n) {
    n(18)("getOwnPropertyNames", function() {
      return n(84).f
    })
  }, function(e, t, n) {
    var i = n(2),
      r = n(29).onFreeze;
    n(18)("freeze", function(e) {
      return function(t) {
        return e && i(t) ? e(r(t)) : t
      }
    })
  }, function(e, t, n) {
    var i = n(2),
      r = n(29).onFreeze;
    n(18)("seal", function(e) {
      return function(t) {
        return e && i(t) ? e(r(t)) : t
      }
    })
  }, function(e, t, n) {
    var i = n(2),
      r = n(29).onFreeze;
    n(18)("preventExtensions", function(e) {
      return function(t) {
        return e && i(t) ? e(r(t)) : t
      }
    })
  }, function(e, t, n) {
    var i = n(2);
    n(18)("isFrozen", function(e) {
      return function(t) {
        return !i(t) || !!e && e(t)
      }
    })
  }, function(e, t, n) {
    var i = n(2);
    n(18)("isSealed", function(e) {
      return function(t) {
        return !i(t) || !!e && e(t)
      }
    })
  }, function(e, t, n) {
    var i = n(2);
    n(18)("isExtensible", function(e) {
      return function(t) {
        return !!i(t) && (!e || e(t))
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S + i.F, "Object", {
      assign: n(54)
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Object", {
      is: n(127)
    })
  }, function(e, t) {
    e.exports = Object.is || function(e, t) {
      return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
    }
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Object", {
      setPrototypeOf: n(65).set
    })
  }, function(e, t, n) {
    var i = n(44),
      r = {};
    r[n(5)("toStringTag")] = "z", r + "" != "[object z]" && n(11)(Object.prototype, "toString", function() {
      return "[object " + i(this) + "]"
    }, !0)
  }, function(e, t, n) {
    var i = n(0);
    i(i.P, "Function", {
      bind: n(85)
    })
  }, function(e, t, n) {
    var i = n(6).f,
      r = Function.prototype,
      o = /^\s*function ([^ (]*)/;
    "name" in r || n(7) && i(r, "name", {
      configurable: !0,
      get: function() {
        try {
          return ("" + this).match(o)[1]
        } catch (e) {
          return ""
        }
      }
    })
  }, function(e, t, n) {
    var i = n(2),
      r = n(28),
      o = n(5)("hasInstance"),
      a = Function.prototype;
    o in a || n(6).f(a, o, {
      value: function(e) {
        if ("function" != typeof this || !i(e)) return !1;
        if (!i(this.prototype)) return e instanceof this;
        for (; e = r(e);)
          if (this.prototype === e) return !0;
        return !1
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(87);
    i(i.G + i.F * (parseInt != r), {
      parseInt: r
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(88);
    i(i.G + i.F * (parseFloat != r), {
      parseFloat: r
    })
  }, function(e, t, n) {
    var i = n(3),
      r = n(9),
      o = n(20),
      a = n(67),
      s = n(24),
      l = n(1),
      c = n(34).f,
      u = n(22).f,
      d = n(6).f,
      h = n(48).trim,
      p = i.Number,
      f = p,
      g = p.prototype,
      A = "Number" == o(n(27)(g)),
      v = "trim" in String.prototype,
      _ = function(e) {
        var t = s(e, !1);
        if ("string" == typeof t && t.length > 2) {
          t = v ? t.trim() : h(t, 3);
          var n, i, r, o = t.charCodeAt(0);
          if (43 === o || 45 === o) {
            if (88 === (n = t.charCodeAt(2)) || 120 === n) return NaN
          } else if (48 === o) {
            switch (t.charCodeAt(1)) {
              case 66:
              case 98:
                i = 2, r = 49;
                break;
              case 79:
              case 111:
                i = 8, r = 55;
                break;
              default:
                return +t
            }
            for (var a, l = t.slice(2), c = 0, u = l.length; c < u; c++)
              if ((a = l.charCodeAt(c)) < 48 || a > r) return NaN;
            return parseInt(l, i)
          }
        }
        return +t
      };
    if (!p(" 0o1") || !p("0b1") || p("+0x1")) {
      p = function(e) {
        var t = arguments.length < 1 ? 0 : e,
          n = this;
        return n instanceof p && (A ? l(function() {
          g.valueOf.call(n)
        }) : "Number" != o(n)) ? a(new f(_(t)), n, p) : _(t)
      };
      for (var w, m = n(7) ? c(f) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), b = 0; m.length > b; b++) r(f, w = m[b]) && !r(p, w) && d(p, w, u(f, w));
      p.prototype = g, g.constructor = p, n(11)(i, "Number", p)
    }
  }, function(e, t, n) {
    var i = n(0),
      r = n(21),
      o = n(89),
      a = n(90),
      s = 1..toFixed,
      l = Math.floor,
      c = [0, 0, 0, 0, 0, 0],
      u = "Number.toFixed: incorrect invocation!",
      d = function(e, t) {
        for (var n = -1, i = t; ++n < 6;) i += e * c[n], c[n] = i % 1e7, i = l(i / 1e7)
      },
      h = function(e) {
        for (var t = 6, n = 0; --t >= 0;) n += c[t], c[t] = l(n / e), n = n % e * 1e7
      },
      p = function() {
        for (var e = 6, t = ""; --e >= 0;)
          if ("" !== t || 0 === e || 0 !== c[e]) {
            var n = String(c[e]);
            t = "" === t ? n : t + a.call("0", 7 - n.length) + n
          }
        return t
      },
      f = function(e, t, n) {
        return 0 === t ? n : t % 2 == 1 ? f(e, t - 1, n * e) : f(e * e, t / 2, n)
      },
      g = function(e) {
        for (var t = 0, n = e; n >= 4096;) t += 12, n /= 4096;
        for (; n >= 2;) t += 1, n /= 2;
        return t
      };
    i(i.P + i.F * (!!s && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !n(1)(function() {
      s.call({})
    })), "Number", {
      toFixed: function(e) {
        var t, n, i, s, l = o(this, u),
          c = r(e),
          A = "",
          v = "0";
        if (c < 0 || c > 20) throw RangeError(u);
        if (l != l) return "NaN";
        if (l <= -1e21 || l >= 1e21) return String(l);
        if (l < 0 && (A = "-", l = -l), l > 1e-21)
          if (t = g(l * f(2, 69, 1)) - 69, n = t < 0 ? l * f(2, -t, 1) : l / f(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {
            for (d(0, n), i = c; i >= 7;) d(1e7, 0), i -= 7;
            for (d(f(10, i, 1), 0), i = t - 1; i >= 23;) h(1 << 23), i -= 23;
            h(1 << i), d(1, 1), h(2), v = p()
          } else d(0, n), d(1 << -t, 0), v = p() + a.call("0", c);
        return c > 0 ? (s = v.length, v = A + (s <= c ? "0." + a.call("0", c - s) + v : v.slice(0, s - c) + "." + v.slice(s - c))) : v = A + v, v
      }
    })
  }, function(e, t, i) {
    var r = i(0),
      o = i(1),
      a = i(89),
      s = 1..toPrecision;
    r(r.P + r.F * (o(function() {
      return "1" !== s.call(1, n)
    }) || !o(function() {
      s.call({})
    })), "Number", {
      toPrecision: function(e) {
        var t = a(this, "Number#toPrecision: incorrect invocation!");
        return e === n ? s.call(t) : s.call(t, e)
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Number", {
      EPSILON: Math.pow(2, -52)
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(3).isFinite;
    i(i.S, "Number", {
      isFinite: function(e) {
        return "number" == typeof e && r(e)
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Number", {
      isInteger: n(91)
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Number", {
      isNaN: function(e) {
        return e != e
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(91),
      o = Math.abs;
    i(i.S, "Number", {
      isSafeInteger: function(e) {
        return r(e) && o(e) <= 9007199254740991
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Number", {
      MAX_SAFE_INTEGER: 9007199254740991
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Number", {
      MIN_SAFE_INTEGER: -9007199254740991
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(88);
    i(i.S + i.F * (Number.parseFloat != r), "Number", {
      parseFloat: r
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(87);
    i(i.S + i.F * (Number.parseInt != r), "Number", {
      parseInt: r
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(92),
      o = Math.sqrt,
      a = Math.acosh;
    i(i.S + i.F * !(a && 710 == Math.floor(a(Number.MAX_VALUE)) && a(1 / 0) == 1 / 0), "Math", {
      acosh: function(e) {
        return (e = +e) < 1 ? NaN : e > 94906265.62425156 ? Math.log(e) + Math.LN2 : r(e - 1 + o(e - 1) * o(e + 1))
      }
    })
  }, function(e, t, n) {
    function i(e) {
      return isFinite(e = +e) && 0 != e ? e < 0 ? -i(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e
    }
    var r = n(0),
      o = Math.asinh;
    r(r.S + r.F * !(o && 1 / o(0) > 0), "Math", {
      asinh: i
    })
  }, function(e, t, n) {
    var i = n(0),
      r = Math.atanh;
    i(i.S + i.F * !(r && 1 / r(-0) < 0), "Math", {
      atanh: function(e) {
        return 0 == (e = +e) ? e : Math.log((1 + e) / (1 - e)) / 2
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(68);
    i(i.S, "Math", {
      cbrt: function(e) {
        return r(e = +e) * Math.pow(Math.abs(e), 1 / 3)
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Math", {
      clz32: function(e) {
        return (e >>>= 0) ? 31 - Math.floor(Math.log(e + .5) * Math.LOG2E) : 32
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = Math.exp;
    i(i.S, "Math", {
      cosh: function(e) {
        return (r(e = +e) + r(-e)) / 2
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(69);
    i(i.S + i.F * (r != Math.expm1), "Math", {
      expm1: r
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Math", {
      fround: n(155)
    })
  }, function(e, t, n) {
    var i = n(68),
      r = Math.pow,
      o = r(2, -52),
      a = r(2, -23),
      s = r(2, 127) * (2 - a),
      l = r(2, -126),
      c = function(e) {
        return e + 1 / o - 1 / o
      };
    e.exports = Math.fround || function(e) {
      var t, n, r = Math.abs(e),
        u = i(e);
      return r < l ? u * c(r / l / a) * l * a : (t = (1 + a / o) * r, n = t - (t - r), n > s || n != n ? u * (1 / 0) : u * n)
    }
  }, function(e, t, n) {
    var i = n(0),
      r = Math.abs;
    i(i.S, "Math", {
      hypot: function(e, t) {
        for (var n, i, o = 0, a = 0, s = arguments.length, l = 0; a < s;) n = r(arguments[a++]), l < n ? (i = l / n, o = o * i * i + 1, l = n) : n > 0 ? (i = n / l, o += i * i) : o += n;
        return l === 1 / 0 ? 1 / 0 : l * Math.sqrt(o)
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = Math.imul;
    i(i.S + i.F * n(1)(function() {
      return -5 != r(4294967295, 5) || 2 != r.length
    }), "Math", {
      imul: function(e, t) {
        var n = +e,
          i = +t,
          r = 65535 & n,
          o = 65535 & i;
        return 0 | r * o + ((65535 & n >>> 16) * o + r * (65535 & i >>> 16) << 16 >>> 0)
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Math", {
      log10: function(e) {
        return Math.log(e) * Math.LOG10E
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Math", {
      log1p: n(92)
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Math", {
      log2: function(e) {
        return Math.log(e) / Math.LN2
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Math", {
      sign: n(68)
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(69),
      o = Math.exp;
    i(i.S + i.F * n(1)(function() {
      return -2e-17 != !Math.sinh(-2e-17)
    }), "Math", {
      sinh: function(e) {
        return Math.abs(e = +e) < 1 ? (r(e) - r(-e)) / 2 : (o(e - 1) - o(-e - 1)) * (Math.E / 2)
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(69),
      o = Math.exp;
    i(i.S, "Math", {
      tanh: function(e) {
        var t = r(e = +e),
          n = r(-e);
        return t == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (t - n) / (o(e) + o(-e))
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Math", {
      trunc: function(e) {
        return (e > 0 ? Math.floor : Math.ceil)(e)
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(33),
      o = String.fromCharCode,
      a = String.fromCodePoint;
    i(i.S + i.F * (!!a && 1 != a.length), "String", {
      fromCodePoint: function(e) {
        for (var t, n = [], i = arguments.length, a = 0; i > a;) {
          if (t = +arguments[a++], r(t, 1114111) !== t) throw RangeError(t + " is not a valid code point");
          n.push(t < 65536 ? o(t) : o(55296 + ((t -= 65536) >> 10), t % 1024 + 56320))
        }
        return n.join("")
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(12),
      o = n(8);
    i(i.S, "String", {
      raw: function(e) {
        for (var t = r(e.raw), n = o(t.length), i = arguments.length, a = [], s = 0; n > s;) a.push(String(t[s++])), s < i && a.push(String(arguments[s]));
        return a.join("")
      }
    })
  }, function(e, t, n) {
    n(48)("trim", function(e) {
      return function() {
        return e(this, 3)
      }
    })
  }, function(e, t, i) {
    var r = i(93)(!0);
    i(70)(String, "String", function(e) {
      this._t = String(e), this._i = 0
    }, function() {
      var e, t = this._t,
        i = this._i;
      return i >= t.length ? {
        value: n,
        done: !0
      } : (e = r(t, i), this._i += e.length, {
        value: e,
        done: !1
      })
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(93)(!1);
    i(i.P, "String", {
      codePointAt: function(e) {
        return r(this, e)
      }
    })
  }, function(e, t, i) {
    var r = i(0),
      o = i(8),
      a = i(71),
      s = "".endsWith;
    r(r.P + r.F * i(73)("endsWith"), "String", {
      endsWith: function(e) {
        var t = a(this, e, "endsWith"),
          i = arguments.length > 1 ? arguments[1] : n,
          r = o(t.length),
          l = i === n ? r : Math.min(o(i), r),
          c = String(e);
        return s ? s.call(t, c, l) : t.slice(l - c.length, l) === c
      }
    })
  }, function(e, t, i) {
    var r = i(0),
      o = i(71);
    r(r.P + r.F * i(73)("includes"), "String", {
      includes: function(e) {
        return !!~o(this, e, "includes").indexOf(e, arguments.length > 1 ? arguments[1] : n)
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.P, "String", {
      repeat: n(90)
    })
  }, function(e, t, i) {
    var r = i(0),
      o = i(8),
      a = i(71),
      s = "".startsWith;
    r(r.P + r.F * i(73)("startsWith"), "String", {
      startsWith: function(e) {
        var t = a(this, e, "startsWith"),
          i = o(Math.min(arguments.length > 1 ? arguments[1] : n, t.length)),
          r = String(e);
        return s ? s.call(t, r, i) : t.slice(i, i + r.length) === r
      }
    })
  }, function(e, t, n) {
    n(10)("anchor", function(e) {
      return function(t) {
        return e(this, "a", "name", t)
      }
    })
  }, function(e, t, n) {
    n(10)("big", function(e) {
      return function() {
        return e(this, "big", "", "")
      }
    })
  }, function(e, t, n) {
    n(10)("blink", function(e) {
      return function() {
        return e(this, "blink", "", "")
      }
    })
  }, function(e, t, n) {
    n(10)("bold", function(e) {
      return function() {
        return e(this, "b", "", "")
      }
    })
  }, function(e, t, n) {
    n(10)("fixed", function(e) {
      return function() {
        return e(this, "tt", "", "")
      }
    })
  }, function(e, t, n) {
    n(10)("fontcolor", function(e) {
      return function(t) {
        return e(this, "font", "color", t)
      }
    })
  }, function(e, t, n) {
    n(10)("fontsize", function(e) {
      return function(t) {
        return e(this, "font", "size", t)
      }
    })
  }, function(e, t, n) {
    n(10)("italics", function(e) {
      return function() {
        return e(this, "i", "", "")
      }
    })
  }, function(e, t, n) {
    n(10)("link", function(e) {
      return function(t) {
        return e(this, "a", "href", t)
      }
    })
  }, function(e, t, n) {
    n(10)("small", function(e) {
      return function() {
        return e(this, "small", "", "")
      }
    })
  }, function(e, t, n) {
    n(10)("strike", function(e) {
      return function() {
        return e(this, "strike", "", "")
      }
    })
  }, function(e, t, n) {
    n(10)("sub", function(e) {
      return function() {
        return e(this, "sub", "", "")
      }
    })
  }, function(e, t, n) {
    n(10)("sup", function(e) {
      return function() {
        return e(this, "sup", "", "")
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Date", {
      now: function() {
        return (new Date).getTime()
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(13),
      o = n(24);
    i(i.P + i.F * n(1)(function() {
      return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
        toISOString: function() {
          return 1
        }
      })
    }), "Date", {
      toJSON: function(e) {
        var t = r(this),
          n = o(t);
        return "number" != typeof n || isFinite(n) ? t.toISOString() : null
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(190);
    i(i.P + i.F * (Date.prototype.toISOString !== r), "Date", {
      toISOString: r
    })
  }, function(e, t, n) {
    var i = n(1),
      r = Date.prototype.getTime,
      o = Date.prototype.toISOString,
      a = function(e) {
        return e > 9 ? e : "0" + e
      };
    e.exports = i(function() {
      return "0385-07-25T07:06:39.999Z" != o.call(new Date(-5e13 - 1))
    }) || !i(function() {
      o.call(new Date(NaN))
    }) ? function() {
      if (!isFinite(r.call(this))) throw RangeError("Invalid time value");
      var e = this,
        t = e.getUTCFullYear(),
        n = e.getUTCMilliseconds(),
        i = t < 0 ? "-" : t > 9999 ? "+" : "";
      return i + ("00000" + Math.abs(t)).slice(i ? -6 : -4) + "-" + a(e.getUTCMonth() + 1) + "-" + a(e.getUTCDate()) + "T" + a(e.getUTCHours()) + ":" + a(e.getUTCMinutes()) + ":" + a(e.getUTCSeconds()) + "." + (n > 99 ? n : "0" + a(n)) + "Z"
    } : o
  }, function(e, t, n) {
    var i = Date.prototype,
      r = i.toString,
      o = i.getTime;
    new Date(NaN) + "" != "Invalid Date" && n(11)(i, "toString", function() {
      var e = o.call(this);
      return e === e ? r.call(this) : "Invalid Date"
    })
  }, function(e, t, n) {
    var i = n(5)("toPrimitive"),
      r = Date.prototype;
    i in r || n(14)(r, i, n(193))
  }, function(e, t, n) {
    var i = n(4),
      r = n(24);
    e.exports = function(e) {
      if ("string" !== e && "number" !== e && "default" !== e) throw TypeError("Incorrect hint");
      return r(i(this), "number" != e)
    }
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Array", {
      isArray: n(64)
    })
  }, function(e, t, i) {
    var r = i(16),
      o = i(0),
      a = i(13),
      s = i(82),
      l = i(60),
      c = i(8),
      u = i(94),
      d = i(61);
    o(o.S + o.F * !i(49)(function(e) {
      Array.from(e)
    }), "Array", {
      from: function(e) {
        var t, i, o, h, p = a(e),
          f = "function" == typeof this ? this : Array,
          g = arguments.length,
          A = g > 1 ? arguments[1] : n,
          v = A !== n,
          _ = 0,
          w = d(p);
        if (v && (A = r(A, g > 2 ? arguments[2] : n, 2)), w == n || f == Array && l(w))
          for (t = c(p.length), i = new f(t); t > _; _++) u(i, _, v ? A(p[_], _) : p[_]);
        else
          for (h = w.call(p), i = new f; !(o = h.next()).done; _++) u(i, _, v ? s(h, A, [o.value, _], !0) : o.value);
        return i.length = _, i
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(94);
    i(i.S + i.F * n(1)(function() {
      function e() {}
      return !(Array.of.call(e) instanceof e)
    }), "Array", { of: function() {
        for (var e = 0, t = arguments.length, n = new("function" == typeof this ? this : Array)(t); t > e;) r(n, e, arguments[e++]);
        return n.length = t, n
      }
    })
  }, function(e, t, i) {
    var r = i(0),
      o = i(12),
      a = [].join;
    r(r.P + r.F * (i(42) != Object || !i(15)(a)), "Array", {
      join: function(e) {
        return a.call(o(this), e === n ? "," : e)
      }
    })
  }, function(e, t, i) {
    var r = i(0),
      o = i(59),
      a = i(20),
      s = i(33),
      l = i(8),
      c = [].slice;
    r(r.P + r.F * i(1)(function() {
      o && c.call(o)
    }), "Array", {
      slice: function(e, t) {
        var i = l(this.length),
          r = a(this);
        if (t = t === n ? i : t, "Array" == r) return c.call(this, e, t);
        for (var o = s(e, i), u = s(t, i), d = l(u - o), h = Array(d), p = 0; p < d; p++) h[p] = "String" == r ? this.charAt(o + p) : this[o + p];
        return h
      }
    })
  }, function(e, t, i) {
    var r = i(0),
      o = i(17),
      a = i(13),
      s = i(1),
      l = [].sort,
      c = [1, 2, 3];
    r(r.P + r.F * (s(function() {
      c.sort(n)
    }) || !s(function() {
      c.sort(null)
    }) || !i(15)(l)), "Array", {
      sort: function(e) {
        return e === n ? l.call(a(this)) : l.call(a(this), o(e))
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(19)(0),
      o = n(15)([].forEach, !0);
    i(i.P + i.F * !o, "Array", {
      forEach: function(e) {
        return r(this, e, arguments[1])
      }
    })
  }, function(e, t, n) {
    var i = n(202);
    e.exports = function(e, t) {
      return new(i(e))(t)
    }
  }, function(e, t, i) {
    var r = i(2),
      o = i(64),
      a = i(5)("species");
    e.exports = function(e) {
      var t;
      return o(e) && (t = e.constructor, "function" != typeof t || t !== Array && !o(t.prototype) || (t = n), r(t) && null === (t = t[a]) && (t = n)), t === n ? Array : t
    }
  }, function(e, t, n) {
    var i = n(0),
      r = n(19)(1);
    i(i.P + i.F * !n(15)([].map, !0), "Array", {
      map: function(e) {
        return r(this, e, arguments[1])
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(19)(2);
    i(i.P + i.F * !n(15)([].filter, !0), "Array", {
      filter: function(e) {
        return r(this, e, arguments[1])
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(19)(3);
    i(i.P + i.F * !n(15)([].some, !0), "Array", {
      some: function(e) {
        return r(this, e, arguments[1])
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(19)(4);
    i(i.P + i.F * !n(15)([].every, !0), "Array", {
      every: function(e) {
        return r(this, e, arguments[1])
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(95);
    i(i.P + i.F * !n(15)([].reduce, !0), "Array", {
      reduce: function(e) {
        return r(this, e, arguments.length, arguments[1], !1)
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(95);
    i(i.P + i.F * !n(15)([].reduceRight, !0), "Array", {
      reduceRight: function(e) {
        return r(this, e, arguments.length, arguments[1], !0)
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(55)(!1),
      o = [].indexOf,
      a = !!o && 1 / [1].indexOf(1, -0) < 0;
    i(i.P + i.F * (a || !n(15)(o)), "Array", {
      indexOf: function(e) {
        return a ? o.apply(this, arguments) || 0 : r(this, e, arguments[1])
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(12),
      o = n(21),
      a = n(8),
      s = [].lastIndexOf,
      l = !!s && 1 / [1].lastIndexOf(1, -0) < 0;
    i(i.P + i.F * (l || !n(15)(s)), "Array", {
      lastIndexOf: function(e) {
        if (l) return s.apply(this, arguments) || 0;
        var t = r(this),
          n = a(t.length),
          i = n - 1;
        for (arguments.length > 1 && (i = Math.min(i, o(arguments[1]))), i < 0 && (i = n + i); i >= 0; i--)
          if (i in t && t[i] === e) return i || 0;
        return -1
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.P, "Array", {
      copyWithin: n(96)
    }), n(45)("copyWithin")
  }, function(e, t, n) {
    var i = n(0);
    i(i.P, "Array", {
      fill: n(74)
    }), n(45)("fill")
  }, function(e, t, i) {
    var r = i(0),
      o = i(19)(5),
      a = !0;
    "find" in [] && Array(1).find(function() {
      a = !1
    }), r(r.P + r.F * a, "Array", {
      find: function(e) {
        return o(this, e, arguments.length > 1 ? arguments[1] : n)
      }
    }), i(45)("find")
  }, function(e, t, i) {
    var r = i(0),
      o = i(19)(6),
      a = "findIndex",
      s = !0;
    a in [] && Array(1)[a](function() {
      s = !1
    }), r(r.P + r.F * s, "Array", {
      findIndex: function(e) {
        return o(this, e, arguments.length > 1 ? arguments[1] : n)
      }
    }), i(45)(a)
  }, function(e, t, n) {
    n(38)("Array")
  }, function(e, t, i) {
    var r = i(3),
      o = i(67),
      a = i(6).f,
      s = i(34).f,
      l = i(72),
      c = i(75),
      u = r.RegExp,
      d = u,
      h = u.prototype,
      p = /a/g,
      f = /a/g,
      g = new u(p) !== p;
    if (i(7) && (!g || i(1)(function() {
        return f[i(5)("match")] = !1, u(p) != p || u(f) == f || "/a/i" != u(p, "i")
      }))) {
      u = function(e, t) {
        var i = this instanceof u,
          r = l(e),
          a = t === n;
        return !i && r && e.constructor === u && a ? e : o(g ? new d(r && !a ? e.source : e, t) : d((r = e instanceof u) ? e.source : e, r && a ? c.call(e) : t), i ? this : h, u)
      };
      for (var A = s(d), v = 0; A.length > v;) ! function(e) {
        e in u || a(u, e, {
          configurable: !0,
          get: function() {
            return d[e]
          },
          set: function(t) {
            d[e] = t
          }
        })
      }(A[v++]);
      h.constructor = u, u.prototype = h, i(11)(r, "RegExp", u)
    }
    i(38)("RegExp")
  }, function(e, t, i) {
    i(98);
    var r = i(4),
      o = i(75),
      a = i(7),
      s = /./.toString,
      l = function(e) {
        i(11)(RegExp.prototype, "toString", e, !0)
      };
    i(1)(function() {
      return "/a/b" != s.call({
        source: "a",
        flags: "b"
      })
    }) ? l(function() {
      var e = r(this);
      return "/".concat(e.source, "/", "flags" in e ? e.flags : !a && e instanceof RegExp ? o.call(e) : n)
    }) : "toString" != s.name && l(function() {
      return s.call(this)
    })
  }, function(e, t, i) {
    i(50)("match", 1, function(e, t, i) {
      return [function(i) {
        var r = e(this),
          o = i == n ? n : i[t];
        return o !== n ? o.call(i, r) : new RegExp(i)[t](String(r))
      }, i]
    })
  }, function(e, t, i) {
    i(50)("replace", 2, function(e, t, i) {
      return [function(r, o) {
        var a = e(this),
          s = r == n ? n : r[t];
        return s !== n ? s.call(r, a, o) : i.call(String(a), r, o)
      }, i]
    })
  }, function(e, t, i) {
    i(50)("search", 1, function(e, t, i) {
      return [function(i) {
        var r = e(this),
          o = i == n ? n : i[t];
        return o !== n ? o.call(i, r) : new RegExp(i)[t](String(r))
      }, i]
    })
  }, function(e, t, i) {
    i(50)("split", 2, function(e, t, r) {
      var o = i(72),
        a = r,
        s = [].push,
        l = "length";
      if ("c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1)[l] || 2 != "ab".split(/(?:ab)*/)[l] || 4 != ".".split(/(.?)(.?)/)[l] || ".".split(/()()/)[l] > 1 || "".split(/.?/)[l]) {
        var c = /()??/.exec("")[1] === n;
        r = function(e, t) {
          var i = String(this);
          if (e === n && 0 === t) return [];
          if (!o(e)) return a.call(i, e, t);
          var r, u, d, h, p, f = [],
            g = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
            A = 0,
            v = t === n ? 4294967295 : t >>> 0,
            _ = new RegExp(e.source, g + "g");
          for (c || (r = new RegExp("^" + _.source + "$(?!\\s)", g));
            (u = _.exec(i)) && !((d = u.index + u[0][l]) > A && (f.push(i.slice(A, u.index)), !c && u[l] > 1 && u[0].replace(r, function() {
              for (p = 1; p < arguments[l] - 2; p++) arguments[p] === n && (u[p] = n)
            }), u[l] > 1 && u.index < i[l] && s.apply(f, u.slice(1)), h = u[0][l], A = d, f[l] >= v));) _.lastIndex === u.index && _.lastIndex++;
          return A === i[l] ? !h && _.test("") || f.push("") : f.push(i.slice(A)), f[l] > v ? f.slice(0, v) : f
        }
      } else "0".split(n, 0)[l] && (r = function(e, t) {
        return e === n && 0 === t ? [] : a.call(this, e, t)
      });
      return [function(i, o) {
        var a = e(this),
          s = i == n ? n : i[t];
        return s !== n ? s.call(i, a, o) : r.call(String(a), i, o)
      }, r]
    })
  }, function(e, t, i) {
    var r = i(99),
      o = i(41);
    e.exports = i(51)("Map", function(e) {
      return function() {
        return e(this, arguments.length > 0 ? arguments[0] : n)
      }
    }, {
      get: function(e) {
        var t = r.getEntry(o(this, "Map"), e);
        return t && t.v
      },
      set: function(e, t) {
        return r.def(o(this, "Map"), 0 === e ? 0 : e, t)
      }
    }, r, !0)
  }, function(e, t, i) {
    var r = i(99),
      o = i(41);
    e.exports = i(51)("Set", function(e) {
      return function() {
        return e(this, arguments.length > 0 ? arguments[0] : n)
      }
    }, {
      add: function(e) {
        return r.def(o(this, "Set"), e = 0 === e ? 0 : e, e)
      }
    }, r)
  }, function(e, t, i) {
    var r, o = i(19)(0),
      a = i(11),
      s = i(29),
      l = i(54),
      c = i(100),
      u = i(2),
      d = i(1),
      h = i(41),
      p = s.getWeak,
      f = Object.isExtensible,
      g = c.ufstore,
      A = {};
    if (i(3).WeakMap === n) {
      var v = function(e) {
          return function() {
            return e(this, arguments.length > 0 ? arguments[0] : n)
          }
        },
        _ = {
          get: function(e) {
            if (u(e)) {
              var t = p(e);
              return !0 === t ? g(h(this, "WeakMap")).get(e) : t ? t[this._i] : n
            }
          },
          set: function(e, t) {
            return c.def(h(this, "WeakMap"), e, t)
          }
        },
        w = e.exports = i(51)("WeakMap", v, _, c, !0, !0);
      d(function() {
        return 7 != (new w).set((Object.freeze || Object)(A), 7).get(A)
      }) && (r = c.getConstructor(v, "WeakMap"), l(r.prototype, _), s.NEED = !0, o(["delete", "has", "get", "set"], function(e) {
        var t = w.prototype,
          n = t[e];
        a(t, e, function(t, i) {
          if (u(t) && !f(t)) {
            this._f || (this._f = new r);
            var o = this._f[e](t, i);
            return "set" == e ? this : o
          }
          return n.call(this, t, i)
        })
      }))
    }
  }, function(e, t, i) {
    var r = i(100),
      o = i(41);
    i(51)("WeakSet", function(e) {
      return function() {
        return e(this, arguments.length > 0 ? arguments[0] : n)
      }
    }, {
      add: function(e) {
        return r.def(o(this, "WeakSet"), e, !0)
      }
    }, r, !1, !0)
  }, function(e, t, i) {
    var r = i(0),
      o = i(52),
      a = i(76),
      s = i(4),
      l = i(33),
      c = i(8),
      u = i(2),
      d = i(3).ArrayBuffer,
      h = i(77),
      p = a.ArrayBuffer,
      f = a.DataView,
      g = o.ABV && d.isView,
      A = p.prototype.slice,
      v = o.VIEW;
    r(r.G + r.W + r.F * (d !== p), {
      ArrayBuffer: p
    }), r(r.S + r.F * !o.CONSTR, "ArrayBuffer", {
      isView: function(e) {
        return g && g(e) || u(e) && v in e
      }
    }), r(r.P + r.U + r.F * i(1)(function() {
      return !new p(2).slice(1, n).byteLength
    }), "ArrayBuffer", {
      slice: function(e, t) {
        if (A !== n && t === n) return A.call(s(this), e);
        for (var i = s(this).byteLength, r = l(e, i), o = l(t === n ? i : t, i), a = new(h(this, p))(c(o - r)), u = new f(this), d = new f(a), g = 0; r < o;) d.setUint8(g++, u.getUint8(r++));
        return a
      }
    }), i(38)("ArrayBuffer")
  }, function(e, t, n) {
    var i = n(0);
    i(i.G + i.W + i.F * !n(52).ABV, {
      DataView: n(76).DataView
    })
  }, function(e, t, n) {
    n(23)("Int8", 1, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    })
  }, function(e, t, n) {
    n(23)("Uint8", 1, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    })
  }, function(e, t, n) {
    n(23)("Uint8", 1, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    }, !0)
  }, function(e, t, n) {
    n(23)("Int16", 2, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    })
  }, function(e, t, n) {
    n(23)("Uint16", 2, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    })
  }, function(e, t, n) {
    n(23)("Int32", 4, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    })
  }, function(e, t, n) {
    n(23)("Uint32", 4, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    })
  }, function(e, t, n) {
    n(23)("Float32", 4, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    })
  }, function(e, t, n) {
    n(23)("Float64", 8, function(e) {
      return function(t, n, i) {
        return e(this, t, n, i)
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(17),
      o = n(4),
      a = (n(3).Reflect || {}).apply,
      s = Function.apply;
    i(i.S + i.F * !n(1)(function() {
      a(function() {})
    }), "Reflect", {
      apply: function(e, t, n) {
        var i = r(e),
          l = o(n);
        return a ? a(i, t, l) : s.call(i, t, l)
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(27),
      o = n(17),
      a = n(4),
      s = n(2),
      l = n(1),
      c = n(85),
      u = (n(3).Reflect || {}).construct,
      d = l(function() {
        function e() {}
        return !(u(function() {}, [], e) instanceof e)
      }),
      h = !l(function() {
        u(function() {})
      });
    i(i.S + i.F * (d || h), "Reflect", {
      construct: function(e, t) {
        o(e), a(t);
        var n = arguments.length < 3 ? e : o(arguments[2]);
        if (h && !d) return u(e, t, n);
        if (e == n) {
          switch (t.length) {
            case 0:
              return new e;
            case 1:
              return new e(t[0]);
            case 2:
              return new e(t[0], t[1]);
            case 3:
              return new e(t[0], t[1], t[2]);
            case 4:
              return new e(t[0], t[1], t[2], t[3])
          }
          var i = [null];
          return i.push.apply(i, t), new(c.apply(e, i))
        }
        var l = n.prototype,
          p = r(s(l) ? l : Object.prototype),
          f = Function.apply.call(e, p, t);
        return s(f) ? f : p
      }
    })
  }, function(e, t, n) {
    var i = n(6),
      r = n(0),
      o = n(4),
      a = n(24);
    r(r.S + r.F * n(1)(function() {
      Reflect.defineProperty(i.f({}, 1, {
        value: 1
      }), 1, {
        value: 2
      })
    }), "Reflect", {
      defineProperty: function(e, t, n) {
        o(e), t = a(t, !0), o(n);
        try {
          return i.f(e, t, n), !0
        } catch (e) {
          return !1
        }
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(22).f,
      o = n(4);
    i(i.S, "Reflect", {
      deleteProperty: function(e, t) {
        var n = r(o(e), t);
        return !(n && !n.configurable) && delete e[t]
      }
    })
  }, function(e, t, i) {
    var r = i(0),
      o = i(4),
      a = function(e) {
        this._t = o(e), this._i = 0;
        var t, n = this._k = [];
        for (t in e) n.push(t)
      };
    i(62)(a, "Object", function() {
      var e, t = this,
        i = t._k;
      do {
        if (t._i >= i.length) return {
          value: n,
          done: !0
        }
      } while (!((e = i[t._i++]) in t._t));
      return {
        value: e,
        done: !1
      }
    }), r(r.S, "Reflect", {
      enumerate: function(e) {
        return new a(e)
      }
    })
  }, function(e, t, i) {
    function r(e, t) {
      var i, l, d = arguments.length < 3 ? e : arguments[2];
      return u(e) === d ? e[t] : (i = o.f(e, t)) ? s(i, "value") ? i.value : i.get !== n ? i.get.call(d) : n : c(l = a(e)) ? r(l, t, d) : void 0
    }
    var o = i(22),
      a = i(28),
      s = i(9),
      l = i(0),
      c = i(2),
      u = i(4);
    l(l.S, "Reflect", {
      get: r
    })
  }, function(e, t, n) {
    var i = n(22),
      r = n(0),
      o = n(4);
    r(r.S, "Reflect", {
      getOwnPropertyDescriptor: function(e, t) {
        return i.f(o(e), t)
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(28),
      o = n(4);
    i(i.S, "Reflect", {
      getPrototypeOf: function(e) {
        return r(o(e))
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Reflect", {
      has: function(e, t) {
        return t in e
      }
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(4),
      o = Object.isExtensible;
    i(i.S, "Reflect", {
      isExtensible: function(e) {
        return r(e), !o || o(e)
      }
    })
  }, function(e, t, n) {
    var i = n(0);
    i(i.S, "Reflect", {
      ownKeys: n(248)
    })
  }, function(e, t, n) {
    var i = n(34),
      r = n(46),
      o = n(4),
      a = n(3).Reflect;
    e.exports = a && a.ownKeys || function(e) {
      var t = i.f(o(e)),
        n = r.f;
      return n ? t.concat(n(e)) : t
    }
  }, function(e, t, n) {
    var i = n(0),
      r = n(4),
      o = Object.preventExtensions;
    i(i.S, "Reflect", {
      preventExtensions: function(e) {
        r(e);
        try {
          return o && o(e), !0
        } catch (e) {
          return !1
        }
      }
    })
  }, function(e, t, i) {
    function r(e, t, i) {
      var c, p, f = arguments.length < 4 ? e : arguments[3],
        g = a.f(d(e), t);
      if (!g) {
        if (h(p = s(e))) return r(p, t, i, f);
        g = u(0)
      }
      return l(g, "value") ? !(!1 === g.writable || !h(f)) && (c = a.f(f, t) || u(0), c.value = i, o.f(f, t, c), !0) : g.set !== n && (g.set.call(f, i), !0)
    }
    var o = i(6),
      a = i(22),
      s = i(28),
      l = i(9),
      c = i(0),
      u = i(25),
      d = i(4),
      h = i(2);
    c(c.S, "Reflect", {
      set: r
    })
  }, function(e, t, n) {
    var i = n(0),
      r = n(65);
    r && i(i.S, "Reflect", {
      setPrototypeOf: function(e, t) {
        r.check(e, t);
        try {
          return r.set(e, t), !0
        } catch (e) {
          return !1
        }
      }
    })
  }, function(e, t, i) {
    var r, o, a, s, l = i(78),
      c = i(37),
      u = i(3),
      d = i(16),
      h = i(44),
      p = i(0),
      f = i(2),
      g = i(17),
      A = i(40),
      v = i(43),
      _ = i(77),
      w = i(102).set,
      m = i(253)(),
      b = i(103),
      y = i(254),
      x = i(255),
      C = u.TypeError,
      S = u.process,
      E = u.Promise,
      I = "process" == h(S),
      k = function() {},
      P = o = b.f,
      T = !! function() {
        try {
          var e = E.resolve(1),
            t = (e.constructor = {})[i(5)("species")] = function(e) {
              e(k, k)
            };
          return (I || "function" == typeof PromiseRejectionEvent) && e.then(k) instanceof t
        } catch (e) {}
      }();
    l.isIOS && (T = !1);
    var D = function(e) {
        var t;
        return !(!f(e) || "function" != typeof(t = e.then)) && t
      },
      B = function(e, t) {
        if (!e._n) {
          e._n = !0;
          var n = e._c;
          m(function() {
            for (var i = e._v, r = 1 == e._s, o = 0; n.length > o;) ! function(t) {
              var n, o, a = r ? t.ok : t.fail,
                s = t.resolve,
                l = t.reject,
                c = t.domain;
              try {
                a ? (r || (2 == e._h && R(e), e._h = 1), !0 === a ? n = i : (c && c.enter(), n = a(i), c && c.exit()), n === t.promise ? l(C("Promise-chain cycle")) : (o = D(n)) ? o.call(n, s, l) : s(n)) : l(i)
              } catch (e) {
                l(e)
              }
            }(n[o++]);
            e._c = [], e._n = !1, t && !e._h && M(e)
          })
        }
      },
      M = function(e) {
        w.call(u, function() {
          var t, i, r, o = e._v,
            a = N(e);
          if (a && (t = y(function() {
              I ? S.emit("unhandledRejection", o, e) : (i = u.onunhandledrejection) ? i({
                promise: e,
                reason: o
              }) : (r = u.console) && r.error && r.error("Unhandled promise rejection", o)
            }), e._h = I || N(e) ? 2 : 1), e._a = n, a && t.e) throw t.v
        })
      },
      N = function(e) {
        if (1 == e._h) return !1;
        for (var t, n = e._a || e._c, i = 0; n.length > i;)
          if (t = n[i++], t.fail || !N(t.promise)) return !1;
        return !0
      },
      R = function(e) {
        w.call(u, function() {
          var t;
          I ? S.emit("rejectionHandled", e) : (t = u.onrejectionhandled) && t({
            promise: e,
            reason: e._v
          })
        })
      },
      O = function(e) {
        var t = this;
        t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, t._a || (t._a = t._c.slice()), B(t, !0))
      },
      F = function(e) {
        var t, n = this;
        if (!n._d) {
          n._d = !0, n = n._w || n;
          try {
            if (n === e) throw C("Promise can't be resolved itself");
            (t = D(e)) ? m(function() {
              var i = {
                _w: n,
                _d: !1
              };
              try {
                t.call(e, d(F, i, 1), d(O, i, 1))
              } catch (e) {
                O.call(i, e)
              }
            }): (n._v = e, n._s = 1, B(n, !1))
          } catch (e) {
            O.call({
              _w: n,
              _d: !1
            }, e)
          }
        }
      };
    T || (E = function(e) {
      A(this, E, "Promise", "_h"), g(e), r.call(this);
      try {
        e(d(F, this, 1), d(O, this, 1))
      } catch (e) {
        O.call(this, e)
      }
    }, r = function(e) {
      this._c = [], this._a = n, this._s = 0, this._d = !1, this._v = n, this._h = 0, this._n = !1
    }, r.prototype = i(39)(E.prototype, {
      then: function(e, t) {
        var i = P(_(this, E));
        return i.ok = "function" != typeof e || e, i.fail = "function" == typeof t && t, i.domain = I ? S.domain : n, this._c.push(i), this._a && this._a.push(i), this._s && B(this, !1), i.promise
      },
      catch: function(e) {
        return this.then(n, e)
      }
    }), a = function() {
      var e = new r;
      this.promise = e, this.resolve = d(F, e, 1), this.reject = d(O, e, 1)
    }, b.f = P = function(e) {
      return e === E || e === s ? new a(e) : o(e)
    }), p(p.G + p.W + p.F * !T, {
      Promise: E
    }), i(36)(E, "Promise"), i(38)("Promise"), s = i(30).Promise, p(p.S + p.F * !T, "Promise", {
      reject: function(e) {
        var t = P(this);
        return (0, t.reject)(e), t.promise
      }
    }), p(p.S + p.F * (c || !T), "Promise", {
      resolve: function(e) {
        return x(c && this === s ? E : this, e)
      }
    }), p(p.S + p.F * !(T && i(49)(function(e) {
      E.all(e).catch(k)
    })), "Promise", {
      all: function(e) {
        var t = this,
          i = P(t),
          r = i.resolve,
          o = i.reject,
          a = y(function() {
            var i = [],
              a = 0,
              s = 1;
            v(e, !1, function(e) {
              var l = a++,
                c = !1;
              i.push(n), s++, t.resolve(e).then(function(e) {
                c || (c = !0, i[l] = e, --s || r(i))
              }, o)
            }), --s || r(i)
          });
        return a.e && o(a.v), i.promise
      },
      race: function(e) {
        var t = this,
          n = P(t),
          i = n.reject,
          r = y(function() {
            v(e, !1, function(e) {
              t.resolve(e).then(n.resolve, i)
            })
          });
        return r.e && i(r.v), n.promise
      }
    })
  }, function(e, t, i) {
    var r = i(3),
      o = i(102).set,
      a = r.MutationObserver || r.WebKitMutationObserver,
      s = r.process,
      l = r.Promise,
      c = "process" == i(20)(s);
    e.exports = function() {
      var e, t, i, u = function() {
        var r, o;
        for (c && (r = s.domain) && r.exit(); e;) {
          o = e.fn, e = e.next;
          try {
            o()
          } catch (r) {
            throw e ? i() : t = n, r
          }
        }
        t = n, r && r.enter()
      };
      if (c) i = function() {
        s.nextTick(u)
      };
      else if (a) {
        var d = !0,
          h = document.createTextNode("");
        new a(u).observe(h, {
          characterData: !0
        }), i = function() {
          h.data = d = !d
        }
      } else if (l && l.resolve) {
        var p = l.resolve();
        i = function() {
          p.then(u)
        }
      } else i = function() {
        o.call(r, u)
      };
      return function(r) {
        var o = {
          fn: r,
          next: n
        };
        t && (t.next = o), e || (e = o, i()), t = o
      }
    }
  }, function(e, t) {
    e.exports = function(e) {
      try {
        return {
          e: !1,
          v: e()
        }
      } catch (e) {
        return {
          e: !0,
          v: e
        }
      }
    }
  }, function(e, t, n) {
    var i = n(4),
      r = n(2),
      o = n(103);
    e.exports = function(e, t) {
      if (i(e), r(t) && t.constructor === e) return t;
      var n = o.f(e);
      return (0, n.resolve)(t), n.promise
    }
  }]), "undefined" != typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd ? define(function() {
    return e
  }) : t.core = e
}(1, 1);
var Reporter = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    function i(e) {
      void 0 !== WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }

    function r() {
      var e = arguments;
      i(function() {
        WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
      })
    }

    function o() {
      var e = arguments;
      i(function() {
        WeixinJSBridge.publish.apply(WeixinJSBridge, e)
      })
    }

    function a() {
      return void 0 !== wx ? wx.version && wx.version.version || "" : ""
    }

    function s() {
      !p || p.length <= 0 || (r("reportKeyValue", {
        dataArray: p
      }), p = [])
    }

    function l() {
      !f || f.length <= 0 || (r("reportIDKey", {
        dataArray: f
      }), f = [])
    }

    function c() {
      !g || g.length <= 0 || (r("systemLog", {
        dataArray: g
      }), g = [])
    }

    function u() {
      return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "ios" : "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios"
    }

    function d(e) {
      return function() {
        try {
          return e.apply(e, arguments)
        } catch (e) {
          console.error("reporter error:" + e.message)
        }
      }
    }
    var h = n(1),
      p = [],
      f = [],
      g = [],
      A = 0,
      v = 0,
      _ = 0,
      w = 0,
      m = 0,
      b = {},
      y = {},
      x = {},
      C = "ios" === u(),
      S = (u(), function() {}),
      E = "",
      I = "",
      k = "",
      P = -1,
      T = h.RunType.APP;
    "undefined" != typeof __wxConfig && __wxConfig.onReady(function() {
      void 0 !== __wxConfig.appType && (P = __wxConfig.appType)
    });
    var D = {
        surroundThirdByTryCatch: function(e, t) {
          var n = "";
          return I && (n = "at " + I + " " + k + " function;"),
            function() {
              var i = void 0;
              try {
                var r = Date.now();
                i = e.apply(e, arguments);
                var o = Date.now() - r;
                o > 1e3 && D.slowReport({
                  key: "apiCallback",
                  cost: o,
                  extend: n + t
                })
              } catch (e) {
                D.thirdErrorReport({
                  error: e,
                  extend: n + t
                })
              }
              return i
            }
        },
        slowReport: function(e) {
          var t = e.key,
            n = e.cost,
            i = e.extend,
            r = e.force,
            o = h.SlowValueType[t],
            a = Date.now();
          if (o && (r || !(a - m < 500)) && !(Object.keys(x).length > 50 || (x[i] || (x[i] = 0), ++x[i] > 3))) {
            m = a;
            var s = n + "," + encodeURIComponent(i) + "," + o + "," + D.getAppType();
            D.reportKeyValue({
              key: "Slow",
              value: s,
              force: !0
            })
          }
        },
        speedReport: function(e) {
          var t = e.key,
            n = e.data,
            i = e.timeMark,
            r = e.force,
            o = h.SpeedValueType[t],
            a = Date.now(),
            s = 0,
            l = i.nativeTime;
          if (o && (r || !(a - (b[o] || 0) < 500)) && i.startTime && i.endTime && (1 != o && 2 != o || l)) {
            n && (s = JSON.stringify(n).length), b[o] = a;
            var c = o + "," + i.startTime + "," + l + "," + l + "," + i.endTime + "," + s + "," + D.getAppType();
            D.reportKeyValue({
              key: "Speed",
              value: c,
              force: !0
            })
          }
        },
        reportKeyValue: function(e) {
          var t = e.key,
            n = e.value,
            i = e.force;
          h.KeyValueType[t] && (!i && Date.now() - A < 50 || (A = Date.now(), p.push({
            key: h.KeyValueType[t],
            value: n
          }), p.length >= 20 && s()))
        },
        reportIDKey: function(e) {
          var t = e.id,
            n = e.key,
            i = e.force;
          h.IDKeyType[n] && (!i && Date.now() - v < 20 || (v = Date.now(), f.push({
            id: t || (C ? "356" : "358"),
            key: h.IDKeyType[n],
            value: 1
          }), f.length >= 1 && l()))
        },
        thirdErrorReport: function(e) {
          var t = e.error,
            n = e.extend;
          D.errorReport({
            key: h.ThirdScriptErrorKey[T],
            error: t,
            extend: n,
            isThirdScriptError: !0
          })
        },
        errorReport: function(e) {
          var t = e.key,
            n = e.error,
            i = e.extend,
            r = e.isThirdScriptError,
            u = void 0 !== r && r;
          if (h.ErrorType[t]) {
            var d = i ? n.message + ";" + i : n.message,
              p = t + "\n" + d + "\n" + n.stack;
            if (console.error(p), "undefined" != typeof window && void 0 !== window.__webviewId__ ? o("WEBVIEW_ERROR_MSG", {
                data: {
                  msg: p
                },
                options: {
                  timestamp: Date.now()
                }
              }) : D.triggerErrorMessage(p), !(Object.keys(y).length > 50)) {
              var f = h.ErrorType[t] + "," + n.name + "," + encodeURIComponent(d) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(a()) + "," + D.getAppType();
              if (y[f] || (y[f] = 0), y[f]++, !(u && y[f] > 3 || y[f] > 3) && (D.reportIDKey({
                  key: t,
                  force: !0
                }), D.reportKeyValue({
                  key: "Error",
                  value: f,
                  force: !0
                }), l(), s(), c(), __wxConfig.karmaTest)) throw n
            }
          }
        },
        log: function(e, t) {
          e && "string" == typeof e && (!t && Date.now() - _ < 50 || (_ = Date.now(), g.push(e + ""), g.length >= 50 && c()))
        },
        submit: function() {
          Date.now() - w < 50 || (w = Date.now(), l(), s(), c())
        },
        registerErrorListener: function(e) {
          "function" == typeof e && (S = e)
        },
        unRegisterErrorListener: function() {
          S = function() {}
        },
        triggerErrorMessage: function(e) {
          E != e && (E = e, setTimeout(function() {
            try {
              S(e)
            } catch (e) {
              console.error(e.message, "at onError callback function")
            }
          }, 0))
        },
        setAsWidget: function() {
          T = h.RunType.WIDGET
        },
        setAsGame: function() {
          T = h.RunType.GAME
        },
        setAsGameSubContext: function() {
          T = h.RunType.GAME_SUBCONTEXT
        },
        getAppType: function() {
          return -1 === P ? 0 : P + 1e3
        }
      },
      B = {};
    for (var M in D) ! function(e) {
      B.__defineGetter__(e, function() {
        return d(D[e])
      })
    }(M);
    B.__defineSetter__("__route__", function(e) {
      I = e
    }), B.__defineSetter__("__method__", function(e) {
      k = e
    }), "undefined" != typeof window && (window.onbeforeunload = function() {
      D.submit()
    }), e.exports = B
  }, function(e, t) {
    function n(e, t, n) {
      return t in e ? Object.defineProperty(e, t, {
        value: n,
        enumerable: !0,
        configurable: !0,
        writable: !0
      }) : e[t] = n, e
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var i, r = t.RunType = {
      APP: 0,
      WIDGET: 1,
      GAME: 2,
      GAME_SUBCONTEXT: 3
    };
    t.IDKeyType = {
      login: 1,
      login_cancel: 2,
      login_fail: 3,
      request_fail: 4,
      connectSocket_fail: 5,
      closeSocket_fail: 6,
      sendSocketMessage_fail: 7,
      uploadFile_fail: 8,
      downloadFile_fail: 9,
      redirectTo_fail: 10,
      navigateTo_fail: 11,
      navigateBack_fail: 12,
      appServiceSDKScriptError: 13,
      webviewSDKScriptError: 14,
      jsEnginScriptError: 15,
      thirdScriptError: 16,
      webviewScriptError: 17,
      exparserScriptError: 18,
      widgetEnginScriptError: 113,
      widgetThirdScriptError: 114,
      gameSDKScriptError: 135,
      gameSubContextSDKScriptError: 136,
      gameThirdScriptError: 137,
      gameSubContextThirdScriptError: 138,
      startRecord: 19,
      startRecord_fail: 20,
      getLocation: 21,
      getLocation_fail: 22,
      chooseLocation: 23,
      chooseLocation_fail: 24,
      openAddress: 25,
      openAddress_fail: 26,
      openLocation: 27,
      openLocation_fail: 28,
      makePhoneCall: 29,
      makePhoneCall_fail: 30,
      operateWXData: 31,
      operateWXData_fail: 32,
      checkLogin: 33,
      checkLogin_fail: 34,
      refreshSession: 35,
      refreshSession_fail: 36,
      chooseVideo: 37,
      chooseVideo_fail: 38,
      chooseImage: 39,
      chooseImage_fail: 40,
      verifyPaymentPassword: 41,
      verifyPaymentPassword_fail: 42,
      requestPayment: 43,
      requestPayment_fail: 44,
      bindPaymentCard: 45,
      bindPaymentCard_fail: 46,
      requestPaymentToBank: 47,
      requestPaymentToBank_fail: 48,
      openDocument: 49,
      openDocument_fail: 50,
      chooseContact: 51,
      chooseContact_fail: 52,
      operateMusicPlayer: 53,
      operateMusicPlayer_fail: 54,
      getMusicPlayerState_fail: 55,
      playVoice_fail: 56,
      setNavigationBarTitle_fail: 57,
      switchTab_fail: 58,
      getImageInfo_fail: 59,
      enableCompass_fail: 60,
      enableAccelerometer_fail: 61,
      getStorage_fail: 62,
      setStorage_fail: 63,
      clearStorage_fail: 64,
      removeStorage_fail: 65,
      getStorageInfo_fail: 66,
      getStorageSync_fail: 67,
      setStorageSync_fail: 68,
      addCard_fail: 69,
      openCard_fail: 70,
      openSetting_fail: 71,
      reLaunch_fail: 72,
      getClipboardData_fail: 73,
      setClipboardData_fail: 74,
      showShareMenu_fail: 75,
      hideShareMenu_fail: 76,
      showToast_fail: 77,
      hideToast_fail: 78,
      openBluetoothAdapter_fail: 79,
      closeBluetoothAdapter_fail: 80,
      getBluetoothAdapterState_fail: 81,
      startBluetoothDevicesDiscovery_fail: 82,
      stopBluetoothDevicesDiscovery_fail: 83,
      getBluetoothDevices_fail: 84,
      getConnectedBluetoothDevices_fail: 85,
      createBLEConnection_fail: 86,
      closeBLEConnection_fail: 87,
      getBLEDeviceServices_fail: 88,
      getBLEDeviceCharacteristics_fail: 89,
      notifyBLECharacteristicValueChanged_fail: 90,
      readBLECharacteristicValue_fail: 91,
      checkIsSupportFacialRecognition_fail: 92,
      startFacialRecognitionVerify_fail: 93,
      startFacialRecognitionVerifyAndUploadVideo_fail: 94,
      startBeaconDiscovery_fail: 95,
      stopBeaconDiscovery_fail: 96,
      getBeacons_fail: 97,
      getSetting_fail: 98,
      setScreenBrightness_fail: 99,
      getScreenBrightness_fail: 100,
      vibrateShort_fail: 101,
      vibrateLong_fail: 102,
      shareAppMessage: 103,
      shareAppMessage_fail: 104,
      shareAppMessage_cancel: 105,
      shareAppMessageDirectly: 106,
      shareAppMessageDirectly_fail: 107,
      shareAppMessageDirectly_cancel: 108,
      sendBizRedPacket_fail: 109,
      addPhoneContact_fail: 110,
      saveImageToPhotosAlbum_fail: 111,
      saveVideoToPhotosAlbum_fail: 112,
      setTopBarText_fail: 115,
      setNavigationBarRightButton_fail: 116,
      setEnableDebug_fail: 117,
      captureScreen_fail: 118,
      setKeepScreenOn_fail: 119,
      createRequestTask: 120,
      createRequestTask_fail: 121,
      createDownloadTask: 122,
      createDownloadTask_fail: 123,
      createUploadTask: 124,
      createUploadTask_fail: 125,
      checkIsSupportSoterAuthentication_fail: 126,
      startSoterAuthentication_fail: 127,
      navigateToMiniProgram_fail: 128,
      navigateBackMiniProgram_fail: 129,
      openDeliveryList_fail: 130,
      setNavigationBarColor_fail: 131,
      setStatusBarStyle_fail: 132,
      getFileInfo_fail: 133
    }, t.KeyValueType = {
      Speed: 13544,
      Error: 13582,
      Slow: 13968,
      Clipboard: 14367,
      NetworkAPI: 14480
    }, t.SpeedValueType = {
      webview2AppService: 1,
      appService2Webview: 2,
      funcReady: 3,
      firstGetData: 4,
      firstRenderTime: 5,
      reRenderTime: 6,
      forceUpdateRenderTime: 7,
      appRoute2newPage: 8,
      newPage2pageReady: 9,
      thirdScriptRunTime: 10,
      pageframe: 11,
      WAWebview: 12,
      WAWidget: 13,
      widgetCanvasReady: 14,
      widgetFirstDataPush: 15
    }, t.SlowValueType = {
      apiCallback: 1,
      pageInvoke: 2,
      widgetInvoke: 3
    }, t.ErrorType = {
      appServiceSDKScriptError: 1,
      webviewSDKScriptError: 2,
      jsEnginScriptError: 3,
      thirdScriptError: 4,
      webviewScriptError: 5,
      exparserScriptError: 6,
      widgetEnginScriptError: 7,
      widgetThirdScriptError: 8,
      gameSDKScriptError: 10,
      gameSubContextSDKScriptError: 12,
      gameThirdScriptError: 13,
      gameSubContextThirdScriptError: 14
    }, t.ThirdScriptErrorKey = (i = {}, n(i, r.APP, "thirdScriptError"), n(i, r.WIDGET, "widgetThirdScriptError"), n(i, r.GAME, "gameThirdScriptError"), n(i, r.GAME_SUBCONTEXT, "gameSubContextThirdScriptError"), i)
  }]),
  Perf = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t) {
    var n = {
      updateData: function() {},
      updateDataGroup: function() {},
      traceCompleteEvent: function() {},
      traceBeginEvent: function() {},
      traceEndEvent: function() {}
    };
    e.exports = n
  }]),
  wx = function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }({
    0: function(e, t, n) {
      function i(e, t) {
        if ("[object Error]" === Object.prototype.toString.apply(e)) {
          if ("WebviewSdkKnownError" == e.type) throw e;
          Reporter.errorReport({
            key: "webviewSDKScriptError",
            error: e,
            extend: t
          })
        }
      }
      var r = n(292),
        o = n(293),
        a = n(295),
        s = n(296),
        l = n(299),
        c = n(300),
        u = n(301),
        d = n(302),
        h = n(303),
        p = n(304),
        f = n(305),
        g = n(306),
        A = n(294),
        v = n(297);
      n(307);
      var _ = n(298),
        w = n(308),
        m = n(309);
      n(310), n(311);
      var b = n(38),
        y = 0,
        x = [],
        C = {},
        S = "wechatdevtools" === (0, v.getPlatform)(),
        E = {
          invoke: r.invoke,
          on: r.on,
          publish: r.publish,
          subscribe: r.subscribe,
          getPlatform: v.getPlatform,
          onAppEnterForeground: a.onAppEnterForeground,
          onAppEnterBackground: a.onAppEnterBackground,
          transformRpx: s.transformRpx,
          _checkDeviceWidth: s.checkDeviceWidth,
          vibrateShort: m.vibrateShort,
          getUserAutoFillData: l.getUserAutoFillData,
          setUserAutoFillData: c.setUserAutoFillData,
          requestGetUserAutoFillData: u.requestGetUserAutoFillData,
          requestSetUserAutoFillData: d.requestSetUserAutoFillData,
          getPhoneNumber: h.getPhoneNumber,
          getUserInfo: p.getUserInfo,
          getGroupInfoByGId: f.getGroupInfoByGId,
          getAdData: g.getAdData,
          reportAdClicked: g.reportAdClicked,
          reportAdExposure: g.reportAdExposure,
          getLaunchInfo: w.getLaunchInfo,
          getAppEnterForegroundInfo: w.getAppEnterForegroundInfo,
          getHTMLLength: function() {
            return document.body.innerHTML.length
          },
          reportIDKey: function(e, t) {
            console.warn("reportIDKey has been removed wx")
          },
          reportKeyValue: function(e, t) {
            console.warn("reportKeyValue has been removed from wx")
          },
          initReady: function() {
            (0, r.invokeMethod)("initReady")
          },
          redirectTo: function(e) {
            (0, A.invokeAppServiceMethod)({
              name: "redirectTo",
              args: e
            })
          },
          navigateTo: function(e) {
            (0, A.invokeAppServiceMethod)({
              name: "navigateTo",
              args: e
            })
          },
          switchTab: function(e) {
            (0, A.invokeAppServiceMethod)({
              name: "switchTab",
              args: e
            })
          },
          reLaunch: function(e) {
            (0, A.invokeAppServiceMethod)({
              name: "reLaunch",
              args: e
            })
          },
          navigateBack: function(e) {
            (0, A.invokeAppServiceMethod)({
              name: "navigateBack",
              args: e
            })
          },
          clearStorage: function(e) {
            (0, A.invokeAppServiceMethod)({
              name: "clearStorage",
              args: e
            })
          },
          showKeyboard: function(e) {
            (0, r.invokeMethod)("showKeyboard", e)
          },
          showDatePickerView: function(e) {
            (0, r.invokeMethod)("showDatePickerView", e)
          },
          hideKeyboard: function(e) {
            (0, r.invokeMethod)("hideKeyboard", e)
          },
          insertMap: function(e) {
            (0, r.invokeMethod)("insertMap", e)
          },
          removeMap: function(e) {
            (0, r.invokeMethod)("removeMap", e)
          },
          updateMapCovers: function(e) {
            (0, r.invokeMethod)("updateMapCovers", e)
          },
          insertContactButton: o.insertContactButton,
          updateContactButton: o.updateContactButton,
          removeContactButton: o.removeContactButton,
          enterContact: o.enterContact,
          getRealRoute: v.getRealRoute,
          getCurrentRoute: function(e) {
            (0, r.invokeMethod)("getCurrentRoute", e, {
              beforeSuccess: function(e) {
                e.route = e.route.split("?")[0]
              }
            })
          },
          getLocalImgData: function(e) {
            function t() {
              if (y -= 1, x.length > 0) {
                var e = x.shift();
                E.getLocalImgData(e)
              }
            }
            y < _.MAX_GET_LOCAL_IMG_DATA_MAX_COUNT ? (y += 1, "string" == typeof e.path ? E.getCurrentRoute({
              success: function(n) {
                var i = n.route;
                // (0, r.publish)("H5_LOG_MSG",{event:"2--------------",nn:n});
                e.path = (0, v.getRealRoute)(i || "index.html", e.path), (0, r.invokeMethod)("getLocalImgData", e, {
                  beforeAll: t
                })
              }
            }) : (0, r.invokeMethod)("getLocalImgData", e, {
              beforeAll: t
            })) : x.push(e)
          },
          insertVideoPlayer: function(e) {
            (0, r.invokeMethod)("insertVideoPlayer", e)
          },
          removeVideoPlayer: function(e) {
            (0, r.invokeMethod)("removeVideoPlayer", e)
          },
          insertShareButton: function(e) {
            (0, r.invokeMethod)("insertShareButton", e)
          },
          updateShareButton: function(e) {
            (0, r.invokeMethod)("updateShareButton", e)
          },
          removeShareButton: function(e) {
            (0, r.invokeMethod)("removeShareButton", e)
          },
          onRequestComponentInfo: function(e) {
            (0, r.subscribe)("requestComponentInfo", e)
          },
          sendComponentInfo: function(e) {
            (0, r.publish)("responseComponentInfo", e)
          },
          updatePerfData: function(e) {
            (0, r.invokeMethod)("updatePerfData", e)
          },
          traceEvent: function(e) {
            (0, r.invokeMethod)("traceEvent", e)
          },
          onWebViewWillManuallyTerminate: function(e) {
            (0, r.onMethod)("onWebViewWillManuallyTerminate", e)
          },
          webViewReadyToTerminate: function(e) {
            (0, r.invokeMethod)("webViewReadyToTerminate", e)
          },
          onAppDataChange: function(e) {
            r.emitter.on("appDataChange", function(t, n) {
              e(t, n)
            })
          },
          onPageScrollTo: function(e) {
            (0, r.subscribe)("pageScrollTo", function(t) {
              e(t)
            })
          },
          publishPageEvent: function(e, t, n) {
            (0, r.publish)("PAGE_EVENT", {
              eventName: e,
              data: t,
              nodeId: n
            })
          },
          animationToStyle: v.animationToStyle,
          getSystemInfo: function(e) {
            (0, A.invokeAppServiceMethod)({
              name: "getSystemInfo",
              args: e
            })
          },
          authorize: function(e) {
            (0, A.invokeAppServiceMethod)({
              type: "bridge",
              name: "authorize",
              args: e
            })
          },
          launchApplication: function(e) {
            (0, A.invokeAppServiceMethod)({
              name: "launchApplication",
              args: e
            })
          },
          operateWXData: b.operateWXData,
          clearLog: function() {
            (0, r.publish)("webviewClearLog")
          },
          navigateToMiniProgram: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = void 0;
            "string" == typeof e.path && e.path.trim().length > 0 && (t = (e.path || "").trim().replace(/(\?|$)/, ".html$1")), (0, A.invokeAppServiceMethod)({
              name: "navigateToMiniProgram",
              type: "bridge",
              args: Object.assign(e, {
                path: t,
                __skipValidate__: !0
              })
            })
          },
          openUrl: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            !0 !== openUrlLock && (e.url = e.url || "", openUrlLock = !0, (0, A.invokeAppServiceMethod)({
              name: "openUrl",
              type: "bridge",
              args: Object.assign(e, {
                __skipValidate__: !0
              }),
              ext: {
                afterAll: function() {
                  openUrlLock = !1
                }
              }
            }))
          }
        };
      for (var I in E) ! function(e) {
        if (S) return void(C[e] = E[e]);
        C.__defineGetter__(e, function() {
          return function() {
            try {
              return E[e].apply(this, arguments)
            } catch (e) {
              i(e)
            }
          }
        })
      }(I);
      e.exports = C
    },
    1: function(e, t, n) {
      function i(e, t, n) {
        "background" === v.default.runningStatus && -1 !== _.BackgroudAPIBlackList.indexOf(e) ? n({
          errMsg: e + ":fail can not be invoked in background running status"
        }) : "active" !== v.default.runningStatus && -1 !== _.NotActiveAPIBlackList.indexOf(e) ? n({
          errMsg: e + ":fail can only be invokeed in acitve running status"
        }) : WeixinJSBridge.invoke.apply(WeixinJSBridge, arguments)
      }

      function r() {
        WeixinJSBridge.on.apply(WeixinJSBridge, arguments)
      }

      function o() {
        var e = Array.prototype.slice.call(arguments);
        e[1] = {
          data: e[1],
          options: {
            timestamp: Date.now()
          }
        }, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
      }

      function a() {
        var e = Array.prototype.slice.call(arguments),
          t = e[1];
        e[1] = function(e, n) {
          var i = e.data,
            r = e.options,
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = r && r.timestamp || 0,
            s = Date.now();
          "function" == typeof t && t(i, n), Reporter.speedReport({
            key: "webview2AppService",
            data: i || {},
            timeMark: {
              startTime: a,
              endTime: s,
              nativeTime: o.nativeTime || 0
            }
          })
        }, WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
      }

      function s(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        t = (0, g.assign)({}, t);
        var r = {};
        for (var o in t) "function" == typeof t[o] && (!0 === __wxConfig.karmaTest ? r[o] = t[o] : r[o] = Reporter.surroundThirdByTryCatch(t[o], "at api " + e + " " + o + " callback function"), delete t[o]);
        var a = {};
        for (var s in n) "function" == typeof n[s] && (a[s] = (0, g.surroundByTryCatchFactory)(n[s], "at api " + e + " " + s + " callback function"), a[s]._argumentsLength = n[s].length);
        i(e, t, function(t) {
          t.errMsg = t.errMsg || e + ":ok";
          var n = 0 === t.errMsg.indexOf(e + ":ok"),
            i = 0 === t.errMsg.indexOf(e + ":cancel"),
            o = 0 === t.errMsg.indexOf(e + ":fail");
          if ("function" == typeof a.beforeAll && a.beforeAll(t), n) {
            var s = function() {
              "function" == typeof r.success && r.success(t), "function" == typeof a.afterSuccess && a.afterSuccess(t)
            };
            "function" == typeof a.beforeSuccess ? 2 === a.beforeSuccess._argumentsLength ? a.beforeSuccess(t, s) : (a.beforeSuccess(t), s()) : s()
          } else if (i) t.errMsg = t.errMsg.replace(e + ":cancel", e + ":fail cancel"), "function" == typeof r.fail && r.fail(t), "function" == typeof a.beforeCancel && a.beforeCancel(t), "function" == typeof r.cancel && r.cancel(t), "function" == typeof a.afterCancel && a.afterCancel(t);
          else if (o) {
            "function" == typeof a.beforeFail && a.beforeFail(t), "function" == typeof r.fail && r.fail(t);
            var l = !0;
            "function" == typeof a.afterFail && (l = a.afterFail(t)), !1 !== l && Reporter.reportIDKey({
              key: e + "_fail"
            })
          }
          "function" == typeof r.complete && r.complete(t), "function" == typeof a.afterAll && a.afterAll(t), (0, w.reportJSAPI)(e, n, o, i, t.errMsg)
        }), Reporter.reportIDKey({
          key: e
        })
      }

      function l(e, t) {
        r(e, (0, g.surroundByTryCatchFactory)(t, "at api " + e + " callback function"))
      }

      function c() {}

      function u(e, t, n) {
        var i = (0, g.paramCheck)(t, n);
        return !i || (d(e, t, "parameter error: " + i), !1)
      }

      function d(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
          i = arguments[3],
          r = e + ":fail " + n;
        console.error(r);
        var o = Reporter.surroundThirdByTryCatch(t.fail || c, "at api " + e + " fail callback function"),
          a = Reporter.surroundThirdByTryCatch(t.complete || c, "at api " + e + " complete callback function"),
          s = {
            errMsg: r
          };
        "number" == typeof i && (s.errCode = i), o(s), a(s)
      }

      function h(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
          i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "",
          r = arguments[4],
          o = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
          a = n ? e + ":ok" : e + ":fail " + i;
        n || console.error(a);
        var s = Reporter.surroundThirdByTryCatch((n ? t.success : t.fail) || c, "at api " + e + " " + (n ? "success" : "fail") + " callback function"),
          l = Reporter.surroundThirdByTryCatch(t.complete || c, "at api " + e + " complete callback function");
        o.errMsg = a, "number" == typeof r && (o.errCode = r), s(o), l(o)
      }

      function p(e, t, n) {
        var i = t.replace(/\.html\?.*|\.html$/, "");
        return -1 !== __wxConfig.pages.indexOf(i) || (d(e, n, 'url "' + (0, g.removeHtmlSuffixFromUrl)(t) + '" is not in app.json'), !1)
      }

      function f(e, t, n) {
        var i = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
          r = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : function() {};
        return function(o) {
          n = r(o), s("operateWXData", Object.assign({}, o, {
            data: Object.assign({
              api_name: t
            }, i, n ? {
              data: n
            } : void 0)
          }), {
            beforeAll: function(t) {
              t.errMsg = t.errMsg.replace("operateWXData", e)
            },
            beforeSuccess: function(e) {
              if ("android" === (0, g.getPlatform)() && (e.data = JSON.parse(e.data)), e.data.data) {
                e.rawData = e.data.data;
                var t = JSON.parse(e.data.data);
                e = Object.assign(e, t)
              }
              e.data.signature && (e.signature = e.data.signature), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
            }
          })
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.invoke = i, t.on = r, t.publish = o, t.subscribe = a, t.invokeMethod = s, t.onMethod = l, t.noop = c, t.beforeInvoke = u, t.beforeInvokeFail = d, t.beforeInvokeCallback = h, t.checkUrlInConfig = p, t.operateWXDataFactory = f;
      var g = n(2),
        A = n(3),
        v = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(A),
        _ = n(4),
        w = n(5)
    },
    2: function(e, t) {
      function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }

      function r(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
      }

      function o(e, t) {
        return !0 === __wxConfig.karmaTest ? e : function() {
          try {
            return e.apply(e, arguments)
          } catch (e) {
            if ("[object Error]" === Object.prototype.toString.apply(e)) {
              if ("AppServiceSdkKnownError" == e.type) throw e;
              "ThirdScriptError" === e.type ? Reporter.thirdErrorReport({
                error: e,
                extend: t
              }) : Reporter.errorReport({
                key: "appServiceSDKScriptError",
                error: e,
                extend: t
              })
            }
          }
        }
      }

      function a(e) {
        var t = Object.prototype.toString.call(e).split(" ")[1].split("]")[0];
        if ("Array" == t || "Object" == t) try {
          e = JSON.stringify(e)
        } catch (e) {
          throw e.type = "AppServiceSdkKnownError", e
        } else e = "String" == t || "Number" == t || "Boolean" == t ? e.toString() : "Date" == t ? e.getTime().toString() : "Undefined" == t ? "undefined" : "Null" == t ? "null" : "";
        return {
          data: e,
          dataType: t
        }
      }

      function s(e, t) {
        return e = "String" == t ? e : "Array" == t || "Object" == t ? JSON.parse(e) : "Number" == t ? parseFloat(e) : "Boolean" == t ? "true" == e : "Date" == t ? new Date(parseInt(e)) : "Undefined" == t ? void 0 : "Null" == t ? null : ""
      }

      function l(e) {
        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
      }

      function c(e) {
        return "Object" === l(e)
      }

      function u(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "parameter",
          i = l(t),
          r = l(e);
        if (r != i) return n + " should be " + i + " instead of " + r + ";";
        var o = "";
        switch (i) {
          case "Object":
            for (var a in t) o += u(e[a], t[a], n + "." + a);
            break;
          case "Array":
            if (e.length < t.length) return n + " should have at least " + t.length + " item;";
            for (var s = 0; s < t.length; ++s) o += u(e[s], t[s], n + "[" + s + "]")
        }
        return o
      }

      function d(e, t) {
        if ((!(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]) && (t = _(t)), 0 === t.indexOf("/")) return t.substr(1);
        if (0 === t.indexOf("./")) return d(e, t.substr(2), !1);
        var n, i, r = t.split("/");
        for (n = 0, i = r.length; n < i && ".." === r[n]; n++);
        r.splice(0, n);
        var t = r.join("/"),
          o = e.length > 0 ? e.split("/") : [];
        return o.splice(o.length - n - 1, n + 1), o.concat(r).join("/")
      }

      function h() {
        return "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios"
      }

      function p(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if ("object" !== (void 0 === e ? "undefined" : P(e))) return e;
        var n = [];
        for (var i in e)
          if (e.hasOwnProperty(i))
            if (t) try {
              n.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]))
            } catch (t) {
              n.push(i + "=" + e[i])
            } else n.push(i + "=" + e[i]);
        return n.join("&")
      }

      function f(e, t) {
        if ("string" == typeof e && "object" === (void 0 === t ? "undefined" : P(t)) && null !== t && Object.keys(t).length > 0) {
          var n = e.split("?");
          return n[0] + "?" + p(A((n[1] || "").split("&").reduce(function(e, t) {
            if ("string" == typeof t && t.length > 0) {
              var n = t.split("="),
                i = n[0],
                r = n[1];
              e[i] = r
            }
            return e
          }, {}), Object.keys(t).reduce(function(e, n) {
            return "object" === P(t[n]) ? e[encodeURIComponent(n)] = encodeURIComponent(JSON.stringify(t[n])) : e[encodeURIComponent(n)] = encodeURIComponent(t[n]), e
          }, {})))
        }
        return e
      }

      function g(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "http";
        return "http" === t ? /^(http|https):\/\/.*/i.test(e) : "websocket" === t ? /^(ws|wss):\/\/.*/i.test(e) : void 0
      }

      function A() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return t.reduce(function(e, t) {
          for (var n in t) e[n] = t[n];
          return e
        }, {})
      }

      function v(e) {
        if ("string" == typeof e) {
          var t = e.split("?"),
            n = t[0],
            i = (t[1] || "").split("&").reduce(function(e, t) {
              if ("string" == typeof t && t.length > 0) {
                var n = t.split("="),
                  i = n[0],
                  r = n[1];
                e[i] = r
              }
              return e
            }, {}),
            r = [];
          for (var o in i) i.hasOwnProperty(o) && r.push(o + "=" + encodeURIComponent(i[o]));
          return r.length > 0 ? n + "?" + r.join("&") : e
        }
        return e
      }

      function _(e) {
        if ("string" != typeof e) return e;
        var t = e.split("?")[0],
          n = e.split("?")[1];
        return t += ".html", void 0 !== n ? t + "?" + n : t
      }

      function w(e) {
        return "string" == typeof e ? -1 !== e.indexOf("?") ? e.replace(/\.html\?/, "?") : e.replace(/\.html$/, "") : e
      }

      function m(e, t) {
        for (var n in t) e[n] = t[n];
        return e
      }

      function b(e) {
        for (var t = "", n = new Uint8Array(e), i = n.byteLength, r = 0; r < i; r++) t += String.fromCharCode(n[r]);
        return D(t)
      }

      function y(e) {
        for (var t = B(e), n = t.length, i = new Uint8Array(n), r = 0; r < n; r++) i[r] = t.charCodeAt(r);
        return i.buffer
      }

      function x(e, t) {
        var n = new FileReader;
        n.onload = function() {
          t(this.result)
        }, n.readAsArrayBuffer(e)
      }

      function C(e) {
        return Object.keys(e).reduce(function(t, n) {
          return "string" == typeof e[n] ? t[n] = e[n] : "number" == typeof e[n] ? t[n] = e[n] + "" : t[n] = Object.prototype.toString.apply(e[n]), t
        }, {})
      }

      function S() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
          var t = 16 * Math.random() | 0;
          return ("x" == e ? t : 3 & t | 8).toString(16)
        })
      }

      function E(e, t) {
        switch (h()) {
          case "devtools":
            return !0;
          case "ios":
            return M > e;
          case "android":
            return M > t
        }
        return !1
      }

      function I(e, t, n) {
        !1 !== c(e) && t != n && e.hasOwnProperty(t) && (e[n] = e[t], delete e[t])
      }

      function k(e, t) {
        e = e.split("."), t = t.split(".");
        for (var n = Math.max(e.length, t.length); e.length < n;) e.push("0");
        for (; t.length < n;) t.push("0");
        for (var i = 0; i < n; i++) {
          var r = parseInt(e[i]),
            o = parseInt(t[i]);
          if (r > o) return 1;
          if (r < o) return -1
        }
        return 0
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var P = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      };
      t.surroundByTryCatchFactory = o, t.getDataType = l, t.isObject = c, t.paramCheck = u, t.getRealRoute = d, t.getPlatform = h, t.urlEncodeFormData = p, t.addQueryStringToUrl = f, t.validateUrl = g, t.assign = A, t.encodeUrlQuery = v, t.transWxmlToHtml = _, t.removeHtmlSuffixFromUrl = w, t.extend = m, t.arrayBufferToBase64 = b, t.base64ToArrayBuffer = y, t.blobToArrayBuffer = x, t.convertObjectValueToString = C, t.guid = S, t.checkClientVersion = E, t.renameProperty = I, t.compareVersion = k;
      var T = (t.anyTypeToString = o(a, "anyTypeToString"), t.stringToAnyType = o(s, "stringToAnyType"), t.AppServiceSdkKnownError = function(e) {
          function t(e) {
            n(this, t);
            var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-SDK:" + e));
            return r.type = "AppServiceSdkKnownError", r
          }
          return r(t, e), t
        }(Error), t.ThirdScriptError = function(e) {
          function t(e) {
            n(this, t);
            var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "" + e));
            return r.type = "ThirdScriptError", r
          }
          return r(t, e), t
        }(Error), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),
        D = D || function(e) {
          for (var t, n, i = String(e), r = "", o = 0, a = T; i.charAt(0 | o) || (a = "=", o % 1); r += a.charAt(63 & t >> 8 - o % 1 * 8)) {
            if ((n = i.charCodeAt(o += .75)) > 255) throw new Error('"btoa" failed');
            t = t << 8 | n
          }
          return r
        },
        B = B || function(e) {
          var t = String(e).replace(/=+$/, ""),
            n = "";
          if (t.length % 4 == 1) throw new Error('"atob" failed');
          for (var i, r, o = 0, a = 0; r = t.charAt(a++); ~r && (i = o % 4 ? 64 * i + r : r, o++ % 4) ? n += String.fromCharCode(255 & i >> (-2 * o & 6)) : 0) r = T.indexOf(r);
          return n
        },
        M = __wxConfig.clientVersion || 1
    },
    3: function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = {
        lastRoute: "",
        query: {},
        runningStatus: "active",
        navigatorLock: !1,
        openUrlLock: !1,
        possessingBackgroundAudioPlayer: !1,
        webviewEventCallback: null
      }
    },
    4: function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.LOG_LIMIT = 1024, t.AppStatus = {
        FORE_GROUND: 0,
        BACK_GROUND: 1,
        LOCK: 2
      }, t.BackgroudAPIBlackList = [], t.NotActiveAPIBlackList = []
    },
    5: function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = {},
        i = {},
        r = {},
        o = 0,
        a = function(e, t) {
          var n = Object.keys(t).map(function(n) {
            return Object.keys(t[n]).map(function(i) {
              return {
                func: n,
                result: e,
                errMsg: i,
                count: t[n][i]
              }
            })
          });
          return [].concat.apply([], n)
        },
        s = function() {
          n = {}, i = {}, r = {}
        },
        l = function() {
          var e = a(1, n),
            t = a(2, i),
            o = a(3, r),
            l = [].concat(e, t, o);
          0 !== l.length && WeixinJSBridge.invoke("reportRealtimeAction", {
            actionData: JSON.stringify({
              dataType: 1,
              dataArray: l,
              appType: Reporter.getAppType()
            })
          }), s()
        },
        c = function(e, t, a, s, c) {
          var u = t ? n : a ? i : r;
          u[e] = u[e] || {}, u[e][c] = (u[e][c] || 0) + 1, Date.now() - o >= 6e4 && (o = Date.now(), setTimeout(l, 6e4))
        };
      t.reportJSAPI = c
    },
    8: function(e, t, n) {
      var i, r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      };
      ! function(o) {
        function a() {
          this._events = {}, this._conf && s.call(this, this._conf)
        }

        function s(e) {
          e ? (this._conf = e, e.delimiter && (this.delimiter = e.delimiter), this._events.maxListeners = e.maxListeners !== o ? e.maxListeners : p, e.wildcard && (this.wildcard = e.wildcard), e.newListener && (this.newListener = e.newListener), e.verboseMemoryLeak && (this.verboseMemoryLeak = e.verboseMemoryLeak), this.wildcard && (this.listenerTree = {})) : this._events.maxListeners = p
        }

        function l(e, t) {
          var n = "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.";
          this.verboseMemoryLeak ? (n += " Event name: %s.", console.error(n, e, t)) : console.error(n, e), console.trace && console.trace()
        }

        function c(e) {
          this._events = {}, this.newListener = !1, this.verboseMemoryLeak = !1, s.call(this, e)
        }

        function u(e, t, n, i) {
          if (!n) return [];
          var r, o, a, s, l, c, d, h = [],
            p = t.length,
            f = t[i],
            g = t[i + 1];
          if (i === p && n._listeners) {
            if ("function" == typeof n._listeners) return e && e.push(n._listeners), [n];
            for (r = 0, o = n._listeners.length; r < o; r++) e && e.push(n._listeners[r]);
            return [n]
          }
          if ("*" === f || "**" === f || n[f]) {
            if ("*" === f) {
              for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && (h = h.concat(u(e, t, n[a], i + 1)));
              return h
            }
            if ("**" === f) {
              d = i + 1 === p || i + 2 === p && "*" === g, d && n._listeners && (h = h.concat(u(e, t, n, p)));
              for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && ("*" === a || "**" === a ? (n[a]._listeners && !d && (h = h.concat(u(e, t, n[a], p))), h = h.concat(u(e, t, n[a], i))) : h = a === g ? h.concat(u(e, t, n[a], i + 2)) : h.concat(u(e, t, n[a], i)));
              return h
            }
            h = h.concat(u(e, t, n[f], i + 1))
          }
          if (s = n["*"], s && u(e, t, s, i + 1), l = n["**"])
            if (i < p) {
              l._listeners && u(e, t, l, p);
              for (a in l) "_listeners" !== a && l.hasOwnProperty(a) && (a === g ? u(e, t, l[a], i + 2) : a === f ? u(e, t, l[a], i + 1) : (c = {}, c[a] = l[a], u(e, t, {
                "**": c
              }, i + 1)))
            } else l._listeners ? u(e, t, l, p) : l["*"] && l["*"]._listeners && u(e, t, l["*"], p);
          return h
        }

        function d(e, t) {
          e = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          for (var n = 0, i = e.length; n + 1 < i; n++)
            if ("**" === e[n] && "**" === e[n + 1]) return;
          for (var r = this.listenerTree, a = e.shift(); a !== o;) {
            if (r[a] || (r[a] = {}), r = r[a], 0 === e.length) return r._listeners ? ("function" == typeof r._listeners && (r._listeners = [r._listeners]), r._listeners.push(t), !r._listeners.warned && this._events.maxListeners > 0 && r._listeners.length > this._events.maxListeners && (r._listeners.warned = !0, l.call(this, r._listeners.length, a))) : r._listeners = t, !0;
            a = e.shift()
          }
          return !0
        }
        var h = Array.isArray ? Array.isArray : function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
          },
          p = 10;
        c.EventEmitter2 = c, c.prototype.delimiter = ".", c.prototype.setMaxListeners = function(e) {
          e !== o && (this._events || a.call(this), this._events.maxListeners = e, this._conf || (this._conf = {}), this._conf.maxListeners = e)
        }, c.prototype.event = "", c.prototype.once = function(e, t) {
          return this.many(e, 1, t), this
        }, c.prototype.many = function(e, t, n) {
          function i() {
            0 == --t && r.off(e, i), n.apply(this, arguments)
          }
          var r = this;
          if ("function" != typeof n) throw new Error("many only accepts instances of Function");
          return i._origin = n, this.on(e, i), r
        }, c.prototype.emit = function() {
          this._events || a.call(this);
          var e = arguments[0];
          if ("newListener" === e && !this.newListener && !this._events.newListener) return !1;
          var t, n, i, r, o, s = arguments.length;
          if (this._all && this._all.length) {
            if (o = this._all.slice(), s > 3)
              for (t = new Array(s), r = 0; r < s; r++) t[r] = arguments[r];
            for (i = 0, n = o.length; i < n; i++) switch (this.event = e, s) {
              case 1:
                o[i].call(this, e);
                break;
              case 2:
                o[i].call(this, e, arguments[1]);
                break;
              case 3:
                o[i].call(this, e, arguments[1], arguments[2]);
                break;
              default:
                o[i].apply(this, t)
            }
          }
          if (this.wildcard) {
            o = [];
            var l = "string" == typeof e ? e.split(this.delimiter) : e.slice();
            u.call(this, o, l, this.listenerTree, 0)
          } else {
            if ("function" == typeof(o = this._events[e])) {
              switch (this.event = e, s) {
                case 1:
                  o.call(this);
                  break;
                case 2:
                  o.call(this, arguments[1]);
                  break;
                case 3:
                  o.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  for (t = new Array(s - 1), r = 1; r < s; r++) t[r - 1] = arguments[r];
                  o.apply(this, t)
              }
              return !0
            }
            o && (o = o.slice())
          }
          if (o && o.length) {
            if (s > 3)
              for (t = new Array(s - 1), r = 1; r < s; r++) t[r - 1] = arguments[r];
            for (i = 0, n = o.length; i < n; i++) switch (this.event = e, s) {
              case 1:
                o[i].call(this);
                break;
              case 2:
                o[i].call(this, arguments[1]);
                break;
              case 3:
                o[i].call(this, arguments[1], arguments[2]);
                break;
              default:
                o[i].apply(this, t)
            }
            return !0
          }
          if (!this._all && "error" === e) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
          return !!this._all
        }, c.prototype.emitAsync = function() {
          this._events || a.call(this);
          var e = arguments[0];
          if ("newListener" === e && !this.newListener && !this._events.newListener) return Promise.resolve([!1]);
          var t, n, i, r, o, s = [],
            l = arguments.length;
          if (this._all) {
            if (l > 3)
              for (t = new Array(l), r = 1; r < l; r++) t[r] = arguments[r];
            for (i = 0, n = this._all.length; i < n; i++) switch (this.event = e, l) {
              case 1:
                s.push(this._all[i].call(this, e));
                break;
              case 2:
                s.push(this._all[i].call(this, e, arguments[1]));
                break;
              case 3:
                s.push(this._all[i].call(this, e, arguments[1], arguments[2]));
                break;
              default:
                s.push(this._all[i].apply(this, t))
            }
          }
          if (this.wildcard) {
            o = [];
            var c = "string" == typeof e ? e.split(this.delimiter) : e.slice();
            u.call(this, o, c, this.listenerTree, 0)
          } else o = this._events[e];
          if ("function" == typeof o) switch (this.event = e, l) {
            case 1:
              s.push(o.call(this));
              break;
            case 2:
              s.push(o.call(this, arguments[1]));
              break;
            case 3:
              s.push(o.call(this, arguments[1], arguments[2]));
              break;
            default:
              for (t = new Array(l - 1), r = 1; r < l; r++) t[r - 1] = arguments[r];
              s.push(o.apply(this, t))
          } else if (o && o.length) {
            if (l > 3)
              for (t = new Array(l - 1), r = 1; r < l; r++) t[r - 1] = arguments[r];
            for (i = 0, n = o.length; i < n; i++) switch (this.event = e, l) {
              case 1:
                s.push(o[i].call(this));
                break;
              case 2:
                s.push(o[i].call(this, arguments[1]));
                break;
              case 3:
                s.push(o[i].call(this, arguments[1], arguments[2]));
                break;
              default:
                s.push(o[i].apply(this, t))
            }
          } else if (!this._all && "error" === e) return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
          return Promise.all(s)
        }, c.prototype.on = function(e, t) {
          if ("function" == typeof e) return this.onAny(e), this;
          if ("function" != typeof t) throw new Error("on only accepts instances of Function");
          return this._events || a.call(this), this.emit("newListener", e, t), this.wildcard ? (d.call(this, e, t), this) : (this._events[e] ? ("function" == typeof this._events[e] && (this._events[e] = [this._events[e]]), this._events[e].push(t), !this._events[e].warned && this._events.maxListeners > 0 && this._events[e].length > this._events.maxListeners && (this._events[e].warned = !0, l.call(this, this._events[e].length, e))) : this._events[e] = t, this)
        }, c.prototype.onAny = function(e) {
          if ("function" != typeof e) throw new Error("onAny only accepts instances of Function");
          return this._all || (this._all = []), this._all.push(e), this
        }, c.prototype.addListener = c.prototype.on, c.prototype.off = function(e, t) {
          function n(e) {
            if (e !== o) {
              var t = Object.keys(e);
              for (var i in t) {
                var a = t[i],
                  s = e[a];
                s instanceof Function || "object" !== (void 0 === s ? "undefined" : r(s)) || null === s || (Object.keys(s).length > 0 && n(e[a]), 0 === Object.keys(s).length && delete e[a])
              }
            }
          }
          if ("function" != typeof t) throw new Error("removeListener only takes instances of Function");
          var i, a = [];
          if (this.wildcard) {
            var s = "string" == typeof e ? e.split(this.delimiter) : e.slice();
            a = u.call(this, null, s, this.listenerTree, 0)
          } else {
            if (!this._events[e]) return this;
            i = this._events[e], a.push({
              _listeners: i
            })
          }
          for (var l = 0; l < a.length; l++) {
            var c = a[l];
            if (i = c._listeners, h(i)) {
              for (var d = -1, p = 0, f = i.length; p < f; p++)
                if (i[p] === t || i[p].listener && i[p].listener === t || i[p]._origin && i[p]._origin === t) {
                  d = p;
                  break
                }
              if (d < 0) continue;
              return this.wildcard ? c._listeners.splice(d, 1) : this._events[e].splice(d, 1), 0 === i.length && (this.wildcard ? delete c._listeners : delete this._events[e]), this.emit("removeListener", e, t), this
            }(i === t || i.listener && i.listener === t || i._origin && i._origin === t) && (this.wildcard ? delete c._listeners : delete this._events[e], this.emit("removeListener", e, t))
          }
          return n(this.listenerTree), this
        }, c.prototype.offAny = function(e) {
          var t, n = 0,
            i = 0;
          if (e && this._all && this._all.length > 0) {
            for (t = this._all, n = 0, i = t.length; n < i; n++)
              if (e === t[n]) return t.splice(n, 1), this.emit("removeListenerAny", e), this
          } else {
            for (t = this._all, n = 0, i = t.length; n < i; n++) this.emit("removeListenerAny", t[n]);
            this._all = []
          }
          return this
        }, c.prototype.removeListener = c.prototype.off, c.prototype.removeAllListeners = function(e) {
          if (0 === arguments.length) return !this._events || a.call(this), this;
          if (this.wildcard)
            for (var t = "string" == typeof e ? e.split(this.delimiter) : e.slice(), n = u.call(this, null, t, this.listenerTree, 0), i = 0; i < n.length; i++) {
              var r = n[i];
              r._listeners = null
            } else this._events && (this._events[e] = null);
          return this
        }, c.prototype.listeners = function(e) {
          if (this.wildcard) {
            var t = [],
              n = "string" == typeof e ? e.split(this.delimiter) : e.slice();
            return u.call(this, t, n, this.listenerTree, 0), t
          }
          return this._events || a.call(this), this._events[e] || (this._events[e] = []), h(this._events[e]) || (this._events[e] = [this._events[e]]), this._events[e]
        }, c.prototype.listenerCount = function(e) {
          return this.listeners(e).length
        }, c.prototype.listenersAny = function() {
          return this._all ? this._all : []
        }, (i = function() {
          return c
        }.call(t, n, t, e)) !== o && (e.exports = i)
      }()
    },
    27: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = n(2),
        r = {},
        o = {
          lastShareTicket: null,
          get: function(e) {
            return wxConsole.log("ShareInfoStorage.get()", e), r[e]
          },
          set: function(e, t) {
            var n = (0, i.guid)();
            return r[n] = {
              shareKey: e,
              shareName: t
            }, n
          }
        };
      t.default = o
    },
    38: function(e, t, n) {
      function i(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.facialRecognition = t.redPacket = t.soter = t.card = t.share = t.payment = t.operateWXData = t.reportGroupShare = t.getGroupId = t.sendGroupMessage = void 0;
      var r = n(39);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(40);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var a = n(41);
      Object.keys(a).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return a[e]
          }
        })
      });
      var s = n(42);
      Object.keys(s).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return s[e]
          }
        })
      });
      var l = n(43);
      Object.keys(l).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return l[e]
          }
        })
      });
      var c = n(46);
      Object.keys(c).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return c[e]
          }
        })
      });
      var u = n(47);
      Object.keys(u).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return u[e]
          }
        })
      });
      var d = n(48);
      Object.keys(d).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return d[e]
          }
        })
      });
      var h = n(49);
      Object.keys(h).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return h[e]
          }
        })
      });
      var p = n(50);
      Object.defineProperty(t, "sendGroupMessage", {
        enumerable: !0,
        get: function() {
          return p.sendGroupMessage
        }
      });
      var f = n(51);
      Object.defineProperty(t, "getGroupId", {
        enumerable: !0,
        get: function() {
          return f.getGroupId
        }
      });
      var g = n(52);
      Object.defineProperty(t, "reportGroupShare", {
        enumerable: !0,
        get: function() {
          return g.reportGroupShare
        }
      }), Object.defineProperty(t, "operateWXData", {
        enumerable: !0,
        get: function() {
          return d.operateWXData
        }
      });
      var A = n(53),
        v = i(A),
        _ = n(54),
        w = i(_),
        m = n(59),
        b = i(m),
        y = n(60),
        x = i(y),
        C = n(64),
        S = i(C),
        E = n(68),
        I = i(E);
      t.payment = v, t.share = w, t.card = b, t.soter = x, t.redPacket = S, t.facialRecognition = I
    },
    39: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkSession = t.login = void 0;
      var i = n(1),
        r = void 0,
        o = function(e) {
          (0, i.invokeMethod)("login", e)
        },
        a = function(e) {
          r && clearTimeout(r), (0, i.invokeMethod)("refreshSession", e, {
            beforeSuccess: function(e) {
              r = setTimeout(function() {
                (0, i.invokeMethod)("refreshSession")
              }, 1e3 * e.expireIn), delete e.err_code, delete e.expireIn
            },
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("refreshSession", "checkSession")
            }
          })
        };
      t.login = o, t.checkSession = a
    },
    40: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.authorize = void 0;
      var i = n(1),
        r = n(2),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.beforeInvoke)("authorize", e, {
            scope: ""
          }) && (0, i.invokeMethod)("authorize", (0, r.assign)(e, {
            scope: [e.scope]
          }), {
            beforeAll: function(e) {
              delete e.body, void 0 !== e.err_code && (e.errCode = e.err_code, delete e.err_code)
            }
          })
        };
      t.authorize = o
    },
    41: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getUserInfo = void 0;
      var i = n(1),
        r = n(2),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("operateWXData", (0, r.assign)({}, e, {
            data: {
              api_name: "webapi_getuserinfo",
              with_credentials: "boolean" != typeof e.withCredentials || e.withCredentials,
              data: {
                lang: e.lang || "en"
              }
            }
          }), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateWXData", "getUserInfo")
            },
            beforeSuccess: function(e) {
              "android" === (0, r.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data);
              try {
                e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
              } catch (e) {}
            }
          })
        };
      t.getUserInfo = o
    },
    42: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.chooseAddress = void 0;
      var i = n(1),
        r = n(2),
        o = function(e) {
          (0, i.invokeMethod)("openAddress", e, {
            beforeSuccess: function(e) {
              (0, r.renameProperty)(e, "addressPostalCode", "postalCode"), (0, r.renameProperty)(e, "proviceFirstStageName", "provinceName"), (0, r.renameProperty)(e, "addressCitySecondStageName", "cityName"), (0, r.renameProperty)(e, "addressCountiesThirdStageName", "countyName"), (0, r.renameProperty)(e, "addressDetailInfo", "detailInfo")
            },
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("openAddress", "chooseAddress"), delete e.err_msg
            }
          })
        };
      t.chooseAddress = o
    },
    43: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = n(44);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var r = n(45);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      })
    },
    44: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getSetting = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("getSetting", e, {
            beforeSuccess: function(e) {
              e.authSetting;
              e.authSetting = e.authSetting.reduce(function(e, t) {
                return e[t.scope] = 1 === t.state, e
              }, {})
            }
          })
        };
      t.getSetting = r
    },
    45: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openSetting = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("openSetting", e, {
            beforeSuccess: function(e) {
              e.authSetting;
              e.authSetting = e.authSetting.reduce(function(e, t) {
                return e[t.scope] = 1 === t.state, e
              }, {})
            }
          })
        };
      t.openSetting = r
    },
    46: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getWeRunData = void 0;
      var i = n(1),
        r = n(2),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("openWeRunSetting", {
            success: function() {
              (0, i.invokeMethod)("operateWXData", (0, r.assign)({
                data: {
                  api_name: "webapi_getwerunstep_history"
                }
              }, e), {
                beforeAll: function(e) {
                  e.errMsg = e.errMsg.replace("operateWXData", "getWeRunData")
                },
                beforeSuccess: function(e) {
                  "android" === (0, r.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
                }
              })
            },
            fail: function(t) {
              t.errMsg = t.errMsg.replace("openWeRunSetting", "getWeRunData"), "function" == typeof e.fail && Reporter.surroundThirdByTryCatch(e.fail, "at api getWeRunData fail callback function")(t), "function" == typeof e.complete && Reporter.surroundThirdByTryCatch(e.complete, "at api getWeRunData fail callback function")(t)
            }
          })
        };
      t.getWeRunData = o
    },
    47: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.chooseInvoiceTitle = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("chooseInvoiceTitle", e, {
            beforeSuccess: function(e) {
              var t = e.invoiceTitleInfo || e.choose_invoice_title_info;
              if (t) try {
                var n = JSON.parse(t);
                delete e.invoiceTitleInfo, delete e.choose_invoice_title_info, e = Object.assign(e, n)
              } catch (e) {}
            }
          })
        };
      t.chooseInvoiceTitle = r
    },
    48: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.constructOperateWXData = t.operateWXData = void 0;
      var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        r = n(1),
        o = n(2),
        a = function() {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
            t = arguments[1];
          return function() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if ((0, r.beforeInvoke)("operateWXData", n, {
                apiName: ""
              })) {
              var a = {
                api_name: n.apiName,
                data: n.reqData || {},
                operate_directly: e
              };
              (0, r.invokeMethod)("operateWXData", Object.assign({}, {
                data: a
              }, n), {
                beforeAll: function(e) {
                  void 0 !== (void 0 === t ? "undefined" : i(t)) && (e.errMsg = e.errMsg.replace("operateWXData", t))
                },
                beforeSuccess: function(e) {
                  "android" === (0, o.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), e.respData = e.data, delete e.data
                }
              })
            }
          }
        },
        s = a(!1);
      t.operateWXData = s, t.constructOperateWXData = a
    },
    49: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getOpenDeviceId = void 0;
      var i = n(1),
        r = (0, i.operateWXDataFactory)("getOpenDeviceId", "webapi_getdeviceinfo");
      t.getOpenDeviceId = r
    },
    50: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.sendGroupMessage = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.beforeInvokeFail)("sendGroupMessage", e, "sendGroupMessage 接口已废弃")
        };
      t.sendGroupMessage = r
    },
    51: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getGroupId = void 0;
      var i = n(1),
        r = function(e) {
          (0, i.invokeMethod)("getGroupId", e)
        };
      t.getGroupId = r
    },
    52: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.reportGroupShare = void 0;
      var i = n(48),
        r = function(e) {
          (0, i.operateWXData)({
            apiName: "webapi_reportgroupshare",
            reqData: e
          })
        };
      t.reportGroupShare = r
    },
    53: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openWCPayCardList = t.openOfflinePayView = t.requestVirtualPayment = t.requestPaymentToBank = t.bindPaymentCard = t.verifyPaymentPassword = t.requestPayment = void 0;
      var i = n(1),
        r = function(e) {
          (0, i.beforeInvoke)("requestPayment", e, {
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "",
            paySign: ""
          }) && (0, i.invokeMethod)("requestPayment", e)
        },
        o = function(e) {
          (0, i.invokeMethod)("verifyPaymentPassword", e)
        },
        a = function(e) {
          (0, i.invokeMethod)("bindPaymentCard", e)
        },
        s = function(e) {
          (0, i.invokeMethod)("requestPaymentToBank", e)
        },
        l = function(e) {
          (0, i.invokeMethod)("requestVirtualPayment", e)
        },
        c = function(e) {
          (0, i.invokeMethod)("openOfflinePayView", e)
        },
        u = function(e) {
          (0, i.invokeMethod)("openWCPayCardList", e)
        };
      t.requestPayment = r, t.verifyPaymentPassword = o, t.bindPaymentCard = a, t.requestPaymentToBank = s, t.requestVirtualPayment = l, t.openOfflinePayView = c, t.openWCPayCardList = u
    },
    54: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.ShareInfoStorage = void 0;
      var i = n(55);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var r = n(56);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(57);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var a = n(58);
      Object.keys(a).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return a[e]
          }
        })
      });
      var s = n(27),
        l = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(s);
      t.ShareInfoStorage = l.default
    },
    55: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getShareInfo = void 0;
      var i = n(1),
        r = n(27),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        a = n(2),
        s = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = o.default.get(e.shareTicket);
          if (t)(0, i.invokeMethod)("operateWXData", (0, a.assign)({
            data: {
              api_name: "webapi_getshareinfo",
              data: {
                share_key: t.shareKey,
                share_name: t.shareName
              }
            }
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateWXData", "getShareInfo")
            },
            beforeSuccess: function(e) {
              "android" === (0, a.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data);
              try {
                var t = JSON.parse(e.data.data);
                t.roomTopic && (e.roomTopic = t.roomTopic)
              } catch (e) {}
              e.iv = e.data.iv, e.encryptedData = e.data.encryptedData, delete e.data
            }
          });
          else {
            var n = {
              errMsg: "getShareInfo:fail invalid shareTicket"
            };
            "function" == typeof e.fail && e.fail(n), "function" == typeof e.complete && e.complete(n)
          }
        };
      t.getShareInfo = s
    },
    56: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.showShareMenu = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          !0 === e.withShareTicket ? (0, i.invokeMethod)("showShareMenuWithShareTicket", e, {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("showShareMenuWithShareTicket", "showShareMenu")
            },
            beforeFail: function(e) {
              e.errMsg += ", with arg withShareTicket: true"
            }
          }) : (0, i.invokeMethod)("showShareMenu", e, {})
        };
      t.showShareMenu = r
    },
    57: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.hideShareMenu = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("hideShareMenu", e, {})
        };
      t.hideShareMenu = r
    },
    58: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.updateShareMenu = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          Promise.all([new Promise(function(t, n) {
            if ("boolean" == typeof e.dynamic || "boolean" == typeof e.widget) {
              var r = void 0;
              r = "boolean" == typeof e.widget ? e.widget : e.dynamic, (0, i.invokeMethod)("updateShareMenuDynamic", {
                isDynamic: r,
                success: t,
                fail: n
              }, {
                beforeAll: function(e) {
                  e.errMsg = e.errMsg.replace("updateShareMenuDynamic", "updateShareMenu")
                },
                beforeFail: function(e) {
                  e.errMsg += ', with arg "dynamic": true'
                }
              })
            } else t({
              errMsg: "updateShareMenu:ok"
            })
          }), new Promise(function(t, n) {
            "boolean" == typeof e.withShareTicket ? (0, i.invokeMethod)("updateShareMenuShareTicket", {
              withShareTicket: e.withShareTicket,
              success: t,
              fail: n
            }, {
              beforeAll: function(e) {
                e.errMsg = e.errMsg.replace("updateShareMenuShareTicket", "updateShareMenu")
              },
              beforeFail: function(e) {
                e.errMsg += ', with arg "withShareTicket": true'
              }
            }) : t({
              errMsg: "updateShareMenu:ok"
            })
          })]).then(function(t) {
            "function" == typeof e.success && Reporter.surroundThirdByTryCatch(e.success, "at api updateShareMenu success callback function")(t[0]), "function" == typeof e.complete && Reporter.surroundThirdByTryCatch(e.complete, "at api updateShareMenu complete callback function")(t[0])
          }, function(t) {
            "function" == typeof e.fail && Reporter.surroundThirdByTryCatch(e.fail, "at api updateShareMenu fail callback function")(t[0]), "function" == typeof e.complete && Reporter.surroundThirdByTryCatch(e.complete, "at api updateShareMenu complete callback function")(t[0])
          })
        };
      t.updateShareMenu = r
    },
    59: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openCard = t.addCard = void 0;
      var i = n(1),
        r = function(e) {
          (0, i.beforeInvoke)("addCard", e, {
            cardList: []
          }) && (0, i.invokeMethod)("addCard", e)
        },
        o = function(e) {
          (0, i.beforeInvoke)("openCard", e, {
            cardList: []
          }) && (0, i.invokeMethod)("openCard", e)
        };
      t.addCard = r, t.openCard = o
    },
    60: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = n(61);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var r = n(62);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(63);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    },
    61: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkIsSupportSoterAuthentication = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("checkIsSupportSoterAuthentication", e, {})
        };
      t.checkIsSupportSoterAuthentication = r
    },
    62: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startSoterAuthentication = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, i.beforeInvoke)("startSoterAuthentication", e, {
              challenge: ""
            })) {
            var t = e.success;
            (0, i.invokeMethod)("startSoterAuthentication", Object.assign({}, e, {
              success: function(n) {
                0 !== n.errCode ? "function" == typeof e.fail && Reporter.surroundThirdByTryCatch(e.fail, "at api startSoterAuthentication fail callback function")(n) : "function" == typeof t && Reporter.surroundThirdByTryCatch(t, "at api startSoterAuthentication success callback function")(n)
              }
            }), {
              beforeSuccess: function(e) {
                "number" == typeof e.errCode && 0 !== e.errCode && (e.errMsg = "startSoterAuthentication:fail")
              }
            })
          }
        };
      t.startSoterAuthentication = r
    },
    63: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkIsSoterEnrolledInDevice = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.beforeInvoke)("checkIsSoterEnrolledInDevice", e, {
            checkAuthMode: ""
          }) && (0, i.invokeMethod)("checkIsSoterEnrolledInDevice", e, {})
        };
      t.checkIsSoterEnrolledInDevice = r
    },
    64: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = n(65);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var r = n(66);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(67);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    },
    65: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openGoldenRedPacketDetail = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("openGoldenRedPacketDetail", e, {})
        };
      t.openGoldenRedPacketDetail = r
    },
    66: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.sendGoldenRedPacket = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("sendGoldenRedPacket", e, {})
        };
      t.sendGoldenRedPacket = r
    },
    67: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.sendBizRedPacket = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("sendBizRedPacket", e, {})
        };
      t.sendBizRedPacket = r
    },
    68: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = n(69);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var r = n(70);
      Object.defineProperty(t, "startFacialRecognitionVerify", {
        enumerable: !0,
        get: function() {
          return r.startFacialRecognitionVerify
        }
      });
      var o = n(71);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    },
    69: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkIsSupportFacialRecognition = void 0;
      var i = n(1),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("checkIsSupportFacialRecognition", e, {})
        };
      t.checkIsSupportFacialRecognition = r
    },
    70: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startFacialRecognitionVerify = t.packageRequestVerifyPreInfo = void 0;
      var i = n(1),
        r = n(2),
        o = function(e) {
          return JSON.stringify({
            name: e.name,
            id_card_number: e.idCardNumber,
            mobile: e.mobile
          })
        },
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = o(e);
          (0, i.invokeMethod)("startFacialRecognitionVerify", (0, r.assign)(e, {
            requestVerifyPreInfo: t
          }), {})
        };
      t.packageRequestVerifyPreInfo = o, t.startFacialRecognitionVerify = a
    },
    71: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startFacialRecognitionVerifyAndUploadVideo = void 0;
      var i = n(1),
        r = n(2),
        o = n(70),
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = (0, o.packageRequestVerifyPreInfo)(e);
          (0, i.invokeMethod)("startFacialRecognitionVerifyAndUploadVideo", (0, r.assign)(e, {
            requestVerifyPreInfo: t
          }), {})
        };
      t.startFacialRecognitionVerifyAndUploadVideo = a
    },
    236: function(e, t) {
      function n(e) {
        switch (void 0 === e ? "undefined" : a(e)) {
          case "function":
            return "" === e.name ? "[function anonymous]" : "[function " + e.name + "]";
          case "undefined":
            return "undefined";
          default:
            return e
        }
      }

      function i(e) {
        var t = {};
        for (var r in e) {
          var o = e[r];
          "object" === (void 0 === o ? "undefined" : a(o)) && null !== o ? t[r] = i(o) : t[r] = n(o)
        }
        return t
      }

      function r(e, t, n) {
        return !0 === __wxConfig.karmaTest ? e : function() {
          try {
            return e.apply(e, arguments)
          } catch (e) {
            if ("[object Error]" === Object.prototype.toString.apply(e)) {
              if ("AppServiceSdkKnownError" == e.type) throw e;
              Reporter.errorReport({
                key: n,
                error: e,
                extend: t
              })
            }
          }
        }
      }

      function o(e, t, n, i) {
        e.__defineGetter__(n, function() {
          return "function" == typeof t[n] ? r(t[n], "wx." + n, i) : t[n]
        })
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      };
      t.surroundByTryCatchFactory = r;
      t.isObject = function(e) {
        return "object" === (void 0 === e ? "undefined" : a(e)) && null !== e
      }, t.isEmptyObject = function(e) {
        for (var t in e) return !1;
        return !0
      }, t.isVirtualNode = function(e) {
        return e && "WxVirtualNode" === e.type
      }, t.isVirtualText = function(e) {
        return e && "WxVirtualText" === e.type
      }, t.isUndefined = function(e) {
        return "[object Undefined]" === Object.prototype.toString.call(e)
      }, t.isNull = function(e) {
        return "[object Null]" === Object.prototype.toString.call(e)
      }, t.isString = function(e) {
        return "[object String]" === Object.prototype.toString.call(e)
      }, t.isArray = function(e) {
        return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
      }, t.transformLogArgs = function(e) {
        for (var t = Array.prototype.slice.call(e), r = 0; r < t.length; r++) {
          var o = t[r];
          try {
            JSON.stringify(o)
          } catch (e) {
            return void console.error("An object with circular reference can't be logged")
          }
        }
        return t.map(function(e) {
          return "object" === (void 0 === e ? "undefined" : a(e)) && null !== e ? i(e) : n(e)
        })
      }, t.surroundWXByTryCatch = function(e, t) {
        var n = {};
        for (var i in e) o(n, e, i, t);
        return n
      }
    },
    292: function(e, t, n) {
      function i(e) {
        void 0 !== WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
      }

      function r() {
        var e = arguments;
        i(function() {
          WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
        })
      }

      function o() {
        var e = arguments;
        i(function() {
          WeixinJSBridge.on.apply(WeixinJSBridge, e)
        })
      }

      function a() {
        var e = Array.prototype.slice.call(arguments);
        e[1] = {
          data: e[1],
          options: {
            timestamp: Date.now()
          }
        }, i(function() {
          WeixinJSBridge.publish.apply(WeixinJSBridge, e)
        })
      }

      function s() {
        var e = Array.prototype.slice.call(arguments),
          t = e[1];
        e[1] = function(e, n) {
          var i = e.data,
            r = e.options,
            o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = r && r.timestamp || 0,
            s = Date.now();
          "function" == typeof t && t(i, n), Reporter.speedReport({
            key: "appService2Webview",
            data: i || {},
            timeMark: {
              startTime: a,
              endTime: s,
              nativeTime: o.nativeTime
            }
          })
        }, i(function() {
          WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
        })
      }

      function l(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
          i = {};
        for (var o in t) "function" == typeof t[o] && (i[o] = t[o], delete t[o]);
        r(e, t, function(t) {
          t.errMsg = t.errMsg || e + ":ok";
          var r = 0 === t.errMsg.indexOf(e + ":ok"),
            o = 0 === t.errMsg.indexOf(e + ":cancel"),
            a = 0 === t.errMsg.indexOf(e + ":fail");
          "function" == typeof n.beforeAll && n.beforeAll(t), r ? ("function" == typeof n.beforeSuccess && n.beforeSuccess(t), "function" == typeof i.success && i.success(t), "function" == typeof n.afterSuccess && n.afterSuccess(t)) : o ? ("function" == typeof i.cancel && i.cancel(t), "function" == typeof n.cancel && n.cancel(t)) : a && ("function" == typeof n.beforeFail && n.beforeFail(t), "function" == typeof i.fail && i.fail(t), "function" == typeof n.afterFail && n.afterFail(t)), "function" == typeof i.complete && i.complete(t), "function" == typeof n.afterAll && n.afterAll(t)
        })
      }

      function c(e, t) {
        o(e, t)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.emitter = void 0, t.invoke = r, t.on = o, t.publish = a, t.subscribe = s, t.invokeMethod = l, t.onMethod = c;
      var u = n(8),
        d = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(u);
      t.emitter = new d.default
    },
    293: function(e, t, n) {
      function i(e) {
        (0, s.invokeMethod)("insertContactButton", e)
      }

      function r(e) {
        (0, s.invokeMethod)("updateContactButton", e)
      }

      function o(e) {
        (0, s.invokeMethod)("removeContactButton", e)
      }

      function a() {
        function e(e) {
          (0, s.invokeMethod)("enterContact", e, {
            beforeSuccess: function(e) {
              e.path && (e.path = "/" + (0, l.removeHtmlSuffixFromUrl)(e.path))
            }
          })
        }
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        t.showMessageCard && (t.sendMessagePath || t.sendMessageImg) ? (0, c.invokeAppServiceMethod)({
          name: "getCurrentRoute",
          type: "custom",
          args: {
            success: function(n) {
              var i = n.currentRoute,
                r = t.sendMessagePath ? (0, l.getRealRoute)(i, t.sendMessagePath, !0) : void 0,
                o = void 0;
              o = t.sendMessageImg && !/^(http|https|wxfile):\/\//.test(t.sendMessageImg) ? (0, l.getRealRoute)(i, t.sendMessageImg, !1) : t.sendMessageImg, e((0, l.assign)({}, t, {
                sendMessagePath: r,
                sendMessageImg: o
              }))
            }
          }
        }) : e(t)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.insertContactButton = i, t.updateContactButton = r, t.removeContactButton = o, t.enterContact = a;
      var s = n(292),
        l = n(2),
        c = n(294)
    },
    294: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.invokeAppServiceMethod = void 0;
      var i = n(292),
        r = 0,
        o = [],
        a = [],
        s = function() {},
        l = function(e) {
          var t = e.type,
            n = void 0 === t ? "wx" : t,
            l = e.name,
            c = e.args,
            u = void 0 === c ? {} : c,
            d = e.ext,
            h = void 0 === d ? {} : d;
          o[r] = {
            success: u.success || s,
            fail: u.fail || s,
            complete: u.complete || s
          }, a[r] = {
            beforeAll: h.beforeAll || s,
            beforeSuccess: h.beforeSuccess || s,
            afterSuccess: h.afterSuccess || s,
            beforeFail: h.beforeFail || s,
            afterFail: h.afterFail || s,
            afterAll: h.afterAll || s
          }, (0, i.publish)("invokeAppServiceMethod", {
            name: l,
            type: n,
            args: u,
            callbackId: r
          }), r += 1
        };
      (0, i.subscribe)("callbackAppServiceMethod", function(e) {
        var t = e.res,
          n = e.isSuccess,
          i = e.callbackId,
          r = o[i],
          s = a[i];
        s.beforeAll(t), n ? (s.beforeSuccess(t), r.success(t), s.afterSuccess(t)) : (s.beforeFail(t), r.fail(t), s.afterFail(t)), r.complete(t), s.afterAll(t)
      }), t.invokeAppServiceMethod = l
    },
    295: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onAppEnterBackground = t.onAppEnterForeground = void 0;
      var i = n(292),
        r = [],
        o = [],
        a = function(e) {
          r.push(e)
        },
        s = function(e) {
          o.push(e)
        };
      (0, i.subscribe)("onAppEnterForeground", function(e) {
        r.forEach(function(t) {
          t(e)
        })
      }), (0, i.subscribe)("onAppEnterBackground", function(e) {
        o.forEach(function(t) {
          t(e)
        })
      }), t.onAppEnterForeground = a, t.onAppEnterBackground = s
    },
    296: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.transformRpx = t.checkDeviceWidth = void 0;
      var i = n(236),
        r = n(297),
        o = n(298),
        a = navigator.userAgent.match("iPhone"),
        s = void 0,
        l = void 0,
        c = function() {
          var e = window.screen.width || 375,
            t = window.devicePixelRatio || 2,
            n = window.screen.height || 375;
          window.screen.orientation && /^landscape/.test(window.screen.orientation.type || "") && (e = n), e === s && t === l || (s = e, l = t, console.info("Updated device width: " + e + "px DPR " + t))
        };
      c();
      var u = function(e) {
          return 0 === e && (0, r.getWxmlVersionTag)("fixZeroRpx") ? 0 : (e = e / o.BASE_DEVICE_WIDTH * s, e = Math.floor(e + 1e-4), 0 === e ? 1 !== l && a ? .5 : 1 : e)
        },
        d = function(e) {
          for (var t = 0, n = 1, i = !1, r = !1, o = 0; o < e.length; ++o) {
            var a = e[o];
            a >= "0" && a <= "9" ? i ? (n *= .1, t += (a - "0") * n) : t = 10 * t + (a - "0") : "." === a ? i = !0 : "-" === a && (r = !0)
          }
          return r && (t = -t), u(t)
        },
        h = /%%\?[+-]?\d+(\.\d+)?rpx\?%%/g,
        p = /(:|\s)[+-]?\d+(\.\d+)?rpx/g,
        f = function(e, t) {
          if (!(0, i.isString)(e)) return e;
          var n = void 0;
          return n = t ? e.match(p) : e.match(h), n && n.forEach(function(n) {
            var i = d(n),
              r = (t ? n[0] : "") + i + "px";
            e = e.replace(n, r)
          }), e
        };
      t.checkDeviceWidth = c, t.transformRpx = f
    },
    297: function(e, t) {
      function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function i(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }

      function r(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
        e.prototype = Object.create(t && t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
      }

      function o(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n
        }
        return Array.from(e)
      }

      function a() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        if (0 === t.indexOf("/")) return t.substr(1);
        if (0 === t.indexOf("./")) return a(e, t.substr(2));
        var n, i, r = t.split("/");
        for (n = 0, i = r.length; n < i && ".." === r[n]; n++);
        r.splice(0, n);
        var t = r.join("/"),
          o = e.length > 0 ? e.split("/") : [];
        return o.splice(o.length - n - 1, n + 1), o.concat(r).join("/")
      }

      function s(e) {
        var t = e.animates,
          n = e.option,
          i = void 0 === n ? {} : n,
          r = i.transformOrigin,
          a = i.transition;
        if (void 0 === a || void 0 === t) return {
          transformOrigin: "",
          transform: "",
          transition: ""
        };
        var s = t.filter(function(e) {
            return "style" !== e.type
          }).map(function(e) {
            var t = e.type,
              n = e.args;
            switch (t) {
              case "matrix":
                return "matrix(" + n.join(",") + ")";
              case "matrix3d":
                return "matrix3d(" + n.join(",") + ")";
              case "rotate":
                return n = n.map(d), "rotate(" + n[0] + ")";
              case "rotate3d":
                return n[3] = d(n[3]), "rotate3d(" + n.join(",") + ")";
              case "rotateX":
                return n = n.map(d), "rotateX(" + n[0] + ")";
              case "rotateY":
                return n = n.map(d), "rotateY(" + n[0] + ")";
              case "rotateZ":
                return n = n.map(d), "rotateZ(" + n[0] + ")";
              case "scale":
                return "scale(" + n.join(",") + ")";
              case "scale3d":
                return "scale3d(" + n.join(",") + ")";
              case "scaleX":
                return "scaleX(" + n[0] + ")";
              case "scaleY":
                return "scaleY(" + n[0] + ")";
              case "scaleZ":
                return "scaleZ(" + n[0] + ")";
              case "translate":
                return n = n.map(u), "translate(" + n.join(",") + ")";
              case "translate3d":
                return n = n.map(u), "translate3d(" + n.join(",") + ")";
              case "translateX":
                return n = n.map(u), "translateX(" + n[0] + ")";
              case "translateY":
                return n = n.map(u), "translateY(" + n[0] + ")";
              case "translateZ":
                return n = n.map(u), "translateZ(" + n[0] + ")";
              case "skew":
                return n = n.map(d), "skew(" + n.join(",") + ")";
              case "skewX":
                return n = n.map(d), "skewX(" + n[0] + ")";
              case "skewY":
                return n = n.map(d), "skewY(" + n[0] + ")";
              default:
                return ""
            }
          }).join(" "),
          l = t.filter(function(e) {
            return "style" === e.type
          }).reduce(function(e, t) {
            return e[t.args[0]] = t.args[1], e
          }, {});
        return {
          style: l,
          transformOrigin: r,
          transform: s,
          transitionProperty: ["transform"].concat(o(Object.keys(l))).join(","),
          transition: a.duration + "ms " + a.timingFunction + " " + a.delay + "ms"
        }
      }

      function l() {
        var e = window.navigator.userAgent.toLowerCase();
        return /wechatdevtools/.test(e) ? "wechatdevtools" : /(iphone|ipad)/.test(e) ? "ios" : /android/.test(e) ? "android" : void 0
      }

      function c() {
        var e = window.navigator.userAgent;
        return (/OS 8_/.test(e) || /Version\/8/.test(e)) && "ios" === l()
      }

      function u(e) {
        return "number" == typeof e ? e + "px" : e
      }

      function d(e) {
        return e + "deg"
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getRealRoute = a, t.animationToStyle = s, t.getPlatform = l, t.isiOS8 = c;
      t.WebviewSdkKnownError = function(e) {
        function t(e) {
          n(this, t);
          var r = i(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "Webview-SDK:" + e));
          return r.type = "WebviewSdkKnownError", r
        }
        return r(t, e), t
      }(Error), t.getWxmlVersionTag = function(e) {
        var t = window.__wcc_version_info__;
        if (t) return t[e]
      }
    },
    298: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.BASE_DEVICE_WIDTH = t.MAX_GET_LOCAL_IMG_DATA_MAX_COUNT = void 0;
      var i = n(297),
        r = (0, i.isiOS8)() ? 16 : 64;
      t.MAX_GET_LOCAL_IMG_DATA_MAX_COUNT = r, t.BASE_DEVICE_WIDTH = 750
    },
    299: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getUserAutoFillData = void 0;
      var i = n(292),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("getUserAutoFillData", e)
        };
      t.getUserAutoFillData = r
    },
    300: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setUserAutoFillData = void 0;
      var i = n(292),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("setUserAutoFillData", e)
        };
      t.setUserAutoFillData = r
    },
    301: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.requestGetUserAutoFillData = void 0;
      var i = n(292),
        r = function(e) {
          (0, i.invokeMethod)("requestGetUserAutoFillData", e)
        };
      t.requestGetUserAutoFillData = r
    },
    302: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.requestSetUserAutoFillData = void 0;
      var i = n(292),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("requestSetUserAutoFillData", e)
        };
      t.requestSetUserAutoFillData = r
    },
    303: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getPhoneNumber = void 0;
      var i = n(292),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("getPhoneNumber", e)
        };
      t.getPhoneNumber = r
    },
    304: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getUserInfo = void 0;
      var i = n(297),
        r = n(294),
        o = n(2),
        a = function(e) {
          (0, r.invokeAppServiceMethod)({
            name: "operateWXData",
            type: "bridge",
            args: (0, o.assign)({}, e, {
              data: {
                api_name: "webapi_getuserinfo",
                with_credentials: "boolean" != typeof e.withCredentials || e.withCredentials,
                from_component: !0,
                data: {
                  lang: e.lang || "en"
                }
              }
            }),
            ext: {
              beforeAll: function(e) {
                e.errMsg = e.errMsg.replace("operateWXData", "getUserInfo")
              },
              beforeSuccess: function(e) {
                "android" === (0, i.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data);
                try {
                  e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
                } catch (e) {}
              }
            }
          })
        };
      t.getUserInfo = a
    },
    305: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getGroupInfoByGId = void 0;
      var i = n(297),
        r = n(294),
        o = [],
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          o.push(e), 1 === o.length && setTimeout(function() {
            var e = o;
            o = [], (0, r.invokeAppServiceMethod)({
              name: "operateWXData",
              type: "bridge",
              args: {
                data: {
                  api_name: "webapi_getshareinfo_byopengid",
                  data: {
                    opengid_list: e.map(function(e) {
                      return e.openGId
                    })
                  }
                },
                success: function(t) {
                  e.forEach(function(e, n) {
                    var i = {
                      errMsg: t.errMsg,
                      roomTopic: t.infoList[n].room_topic
                    };
                    "function" == typeof e.success && e.success(i), "function" == typeof e.complete && e.complete(i)
                  })
                },
                fail: function(t) {
                  e.forEach(function(e) {
                    var n = {
                      errMsg: t.errMsg
                    };
                    "function" == typeof e.fail && e.fail(n), "function" == typeof e.complete && e.complete(n)
                  })
                }
              },
              ext: {
                beforeAll: function(e) {
                  e.errMsg = e.errMsg.replace("operateWXData", "getGroupInfoByGId")
                },
                beforeSuccess: function(e) {
                  "android" === (0, i.getPlatform)() && (e.data = JSON.parse(e.data)), e.infoList = JSON.parse(e.data.data).info_list, delete e.data
                }
              }
            })
          }, 0)
        };
      t.getGroupInfoByGId = a
    },
    306: function(e, t, n) {
      function i(e) {
        wxConsole.log(e.method, e.data, e.data.ad_unit_id), (0, l.invokeAppServiceMethod)({
          name: "operateWXData",
          type: "bridge",
          args: {
            data: {
              api_name: e.api_name,
              data: e.data
            },
            success: function(t) {
              wxConsole.log(e.method + " [" + e.data.ad_unit_id + "] success: ", t), "function" == typeof e.success && e.success(t), "function" == typeof e.complete && e.complete(t)
            },
            fail: function(t) {
              wxConsole.log(e.method + " [" + e.data.ad_unit_id + "] fail: ", t), "function" == typeof e.fail && e.fail(t), "function" == typeof e.complete && e.complete(t)
            }
          },
          ext: {
            beforeAll: function(t) {
              t.errMsg = t.errMsg.replace("operateWXData", e.method)
            },
            beforeSuccess: function(e) {
              "android" === (0, s.getPlatform)() && (e.data = JSON.parse(e.data))
            }
          }
        })
      }

      function r() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        i(Object.assign({
          method: "getAdData",
          api_name: "webapi_getadvert"
        }, e))
      }

      function o() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = Object.assign({
            method: "reportAdClicked",
            api_name: "advert_report"
          }, e);
        t.data.report_type = 1, i(t)
      }

      function a() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = Object.assign({
            method: "reportAdExposure",
            api_name: "advert_report"
          }, e);
        t.data.report_type = 0, i(t)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getAdData = r, t.reportAdClicked = o, t.reportAdExposure = a;
      var s = n(297),
        l = n(294)
    },
    307: function(e, t, n) {
      var i = n(292),
        r = !1;
      ["log", "warn", "error", "info", "debug"].forEach(function(e) {
          (0, i.subscribe)(e, function(t) {
            var n = t.log;
            console[e].apply(console, n)
          })
        }), (0, i.subscribe)("initLogs", function(e) {
          var t = e.logs;
          !1 === r && (r = !0, t.forEach(function(e) {
            var t = e.method,
              n = e.log;
            console[t].apply(console, n)
          }), r = !0)
        }), (0, i.subscribe)("serviceClearLog", function(e) {
          var t = e.triggerWebViewId;
          void 0 !== t && t !== window.__webviewId__ && "function" == typeof console.clear && console.clear()
        }),
        function(e) {
          document.addEventListener("generateFuncReady", e)
        }(function() {
          setTimeout(function() {
            (0, i.publish)("GenerateFuncReady", {})
          }, 20)
        })
    },
    308: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getAppEnterForegroundInfo = t.getLaunchInfo = void 0;
      var i = n(292),
        r = {},
        o = 0;
      (0, i.subscribe)("launchInfoGot", function(e) {
        var t = e.data,
          n = e.callbackId;
        t.info ? r[n + "success"](t) : r[n + "fail"](t)
      });
      var a = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.success,
          n = void 0 === t ? function() {} : t,
          a = e.fail,
          s = e.complete;
        o++, r[o + "success"] = n, r[o + "fail"] = a, r[o + "complete"] = s, (0, i.publish)("getLaunchInfo", {
          callbackId: o
        })
      };
      (0, i.subscribe)("appEnterForegroundInfoGot", function(e) {
        var t = e.data,
          n = e.callbackId;
        t.info ? r[n + "success"](t) : r[n + "fail"](t)
      });
      var s = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.success,
          n = void 0 === t ? function() {} : t,
          a = e.fail,
          s = e.complete;
        o++, r[o + "success"] = n, r[o + "fail"] = a, r[o + "complete"] = s, (0, i.publish)("getAppEnterForegroundInfo", {
          callbackId: o
        })
      };
      t.getLaunchInfo = a, t.getAppEnterForegroundInfo = s
    },
    309: function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.vibrateShort = void 0;
      var i = n(292),
        r = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.invokeMethod)("vibrateShort", e, {})
        };
      t.vibrateShort = r
    },
    310: function(e, t, n) {
      var i = n(292),
        r = n(296);
      (0, i.subscribe)("setPageStyle", function(e) {
        var t = e.style,
          n = e.callbackId;
        try {
          for (key in t) document.body.style[key] = (0, r.transformRpx)(":" + t[key], !0).substr(1)
        } catch (e) {
          (0, i.publish)("callbackSetPageStyle", {
            callbackId: n,
            res: {
              errMsg: "setPageStyle:fail " + e.message
            }
          })
        }(0, i.publish)("callbackSetPageStyle", {
          callbackId: n,
          res: {
            errMsg: "setPageStyle:ok"
          }
        })
      })
    },
    311: function(e, t, n) {
      var i = n(292);
      (0, i.subscribe)("invokeWebviewMethod", function(e) {
        var t = e.name,
          n = e.args,
          r = e.callbackId;
        i.emitter.emit(t, n, function(e) {
          (0, i.publish)("callbackWebviewMethod", {
            res: e,
            callbackId: r
          })
        })
      })
    }
  });
! function(e, t) {
  "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.exparser = t() : e.exparser = t()
}(this, function() {
  return function(e) {
    function t(i) {
      if (n[i]) return n[i].exports;
      var r = n[i] = {
        exports: {},
        id: i,
        loaded: !1
      };
      return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var n = {};
    return t.m = e, t.c = n, t.p = "", t(0)
  }([function(e, t, n) {
    var i = n(1),
      r = n(3),
      o = n(4),
      a = n(6),
      s = n(9),
      l = n(11),
      c = n(10),
      u = n(12),
      d = n(13),
      h = n(7),
      p = n(2),
      f = n(14);
    t.FreeTmpl = f, t.precompileTemplate = f.precompiler ? f.precompiler.compile : null, t.Event = r, t.Element = a, t.TextNode = l, t.NativeNode = c, t.VirtualNode = u, t.ShadowRoot = d, t.Behavior = o, t.Component = s, t.Observer = h, t.registerBehavior = o.create, t.registerElement = s.register, t.createElement = s.create, t.createTextNode = l.create, t.createVirtualNode = u.create, t.appendChild = a.appendChild, t.insertBefore = a.insertBefore, t.removeChild = a.removeChild, t.replaceChild = a.replaceChild, t.addListenerToElement = r.addListenerToElement, t.removeListenerFromElement = r.removeListenerFromElement, t.triggerEvent = r.triggerEvent, t.safeCallback = i.safeCallback, t.addGlobalErrorListener = i.addGlobalErrorListener, t.removeGlobalErrorListener = i.removeGlobalErrorListener, t.globalOptions = p, s._setDefaultTemplateEngine(f), (t.updateDefaultComponent = function() {
      delete s._list[""], s.register({
        is: "",
        options: {
          writeOnly: !0,
          allowInWriteOnly: !0,
          lazyRegistration: !1,
          classPrefix: "",
          addGlobalClass: !1,
          templateEngine: null,
          renderingMode: "full",
          multipleSlots: !1,
          reflectToAttributes: !1
        }
      })
    })();
    var g = function(e) {
        var t = "";
        if (e instanceof exparser.Element && (e.id && (t += ' id="' + e.id + '"'), e.slot && (t += ' slot="' + e.slot + '"'), e.__slotName && (t += ' name="' + e.__slotName + '"'), e.classList && (t += ' class="' + e.class + '"'), e.$$ && e.$$.getAttribute("style") && (t += ' style="' + e.$$.getAttribute("style") + '"')), e instanceof exparser.VirtualNode) return t;
        if (e instanceof exparser.Component) return s.listPublicProperties(e).forEach(function(n) {
          t += " " + n + "=" + JSON.stringify(e[n])
        }), t;
        for (var n = e.attributes, i = 0; i < n.length; i++) t += " " + n[i].name + '="' + n[i].value + '"';
        return t
      },
      A = t.dumpElementToString = function(e, t, n) {
        var i = null;
        p.hasDOMBackend && (i = window);
        var r = 0;
        n = n || 0;
        var o = "";
        for (r = n; r; r--) o += "  ";
        var a = "";
        if (e instanceof exparser.Element) a += o + "<" + (e.$$ ? e.$$.tagName.toLowerCase() + ":" : "") + e.is + g(e) + ">", a += e instanceof exparser.VirtualNode ? " [Exp-Virtual]" : e instanceof exparser.NativeNode ? " [Exp-Native]" : " [Exp-Component]", a += "\n" + A(t ? e.__wxSlotChildren : e.childNodes, t, n + 1);
        else if (e instanceof exparser.TextNode) a += o + e.textContent + " [Exp-Text]\n";
        else if (i && e instanceof i.HTMLElement) a += o + "<" + e.tagName.toLowerCase() + g(e) + "> [DOM-Element]", a += "\n" + A(t ? e.__wxSlotChildren || e.childNodes : e.childNodes, t, n + 1);
        else if (i && e instanceof i.Text) a += o + e.textContent + " [DOM-Text]\n";
        else if (void 0 !== e.length)
          for (r = 0; r < e.length; r++) a += A(e[r], t, n);
        else a = o + "[unknown node]\n";
        return a
      };
    t.dumpElement = function(e, t) {
      console.log(A(e, t))
    }
  }, function(e, t, n) {
    var i = n(2),
      r = function(e) {
        this.empty = !0, this._type = e, this._arr = [], this._index = 0
      };
    r.create = function(e) {
      return new r(e)
    }, r.prototype.add = function(e) {
      var t = this._index++;
      return this._arr.push({
        id: t,
        func: e
      }), this.empty = !1, t
    }, r.prototype.remove = function(e) {
      var t = this._arr,
        n = 0;
      if ("function" == typeof e) {
        for (n = 0; n < t.length; n++)
          if (t[n].func === e) return t.splice(n, 1), this.empty = !t.length, !0
      } else
        for (n = 0; n < t.length; n++)
          if (t[n].id === e) return t.splice(n, 1), this.empty = !t.length, !0;
      return !1
    }, r.prototype.call = function(e, t) {
      for (var n = this._arr, i = !1, r = 0; r < n.length; r++) {
        !1 === a(this._type, n[r].func, e, t) && (i = !0)
      }
      if (i) return !1
    };
    var o = function(e, t) {
        if (!t.type || !1 !== s.call(null, [e, t])) {
          if (console.error(t.message), i.throwGlobalError) throw e;
          console.error(e.stack)
        }
      },
      a = r.safeCallback = function(e, t, n, i) {
        try {
          return t.apply(n, i)
        } catch (a) {
          var r = "[Exparser] [Error] [Component] " + (e || "Error Listener") + " Error @ ";
          n && n.is && (r += n.is), r += "#" + (t.name || "(anonymous)"), o(a, {
            message: r,
            type: e,
            element: n,
            method: t,
            args: i
          })
        }
      },
      s = r.create();
    r.addGlobalErrorListener = function(e) {
      return s.add(e)
    }, r.removeGlobalErrorListener = function(e) {
      return s.remove(e)
    }, e.exports = r
  }, function(e, t) {
    var n = {
      lazyRegistration: !0,
      publicProperties: !1,
      domain: "",
      writeOnly: !1,
      allowInWriteOnly: !1,
      classPrefix: null,
      addGlobalClass: !1,
      templateEngine: null,
      renderingMode: "full",
      multipleSlots: !1,
      reflectToAttributes: !1,
      writeFieldsToNode: !0,
      writeIdToDOM: !1,
      throwGlobalError: !1,
      writeExtraInfoToAttr: !1,
      documentBackend: "undefined" != typeof window && "undefined" != typeof document ? "dom" : "none",
      hasDOMBackend: !("undefined" == typeof window || "undefined" == typeof document)
    };
    e.exports = n
  }, function(e, t, n) {
    var i = n(1),
      r = function() {};
    r.prototype = Object.create(Object.prototype, {
      constructor: {
        value: r,
        writable: !0,
        configurable: !0
      }
    });
    var o = null;
    r._setElementSystem = function(e) {
      o = e, delete t._setElementSystem
    };
    var a = Date.now();
    r.setInitTimeStamp = function(e) {
      return a = void 0 === e ? Date.now() : e
    }, r.getInitTimeStamp = function(e) {
      return a
    }, r.create = function(e, t, n) {
      n = n || {};
      var i = n.originalEvent,
        o = n.extraFields || {},
        s = Date.now() - a,
        l = new r;
      l.currentTarget = null, l.type = e, l.timeStamp = s, l.detail = t, l.bubbles = !!n.bubbles, l.composed = !!n.composed, l.__originalEvent = i, l.__hasCapture = !!n.capturePhase, l.__stopped = !1, l.__dispatched = !1;
      for (var c in o) l[c] = o[c];
      return l
    }, r.prototype.preventDefault = function() {
      this.__originalEvent && this.__originalEvent.preventDefault()
    }, r.prototype.stopPropagation = function() {
      this.__stopped = !0
    };
    var s = function(e, t, n, i) {
      for (var r = e, a = r, s = [], l = e; l;) {
        if (r === l ? r = l.parentNode : a !== l && (s.push(e), e = l), a = l.parentNode, !1 === i(l, e)) return;
        if (l.__wxHost) {
          if (n) break;
          r && r instanceof o ? e = s.pop() : (r = l.__wxHost, e = r), l = l.__wxHost
        } else {
          var c = !0;
          l instanceof o && (c = !1), l = c || n ? l.parentNode : l.__wxSlotParent
        }
      }
    };
    r.dispatchEvent = function(e, t) {
      if (!t.__dispatched) {
        t.__dispatched = !0, e.__wxElement && e.__wxHost !== e.__wxElement && (e = e.__wxElement), t.target = e instanceof o ? e.__methodCaller : e;
        var n = function(e, n) {
            var i = t.currentTarget = n instanceof o ? n.__methodCaller : n;
            !1 === e.call(i, [t]) && (t.__originalEvent && t.__originalEvent.preventDefault(), t.__stopped = !0)
          },
          i = t.type,
          r = !t.composed;
        if (t.__hasCapture) {
          var a = [];
          s(e, 0, r, function(e, t) {
            return e.__wxCaptureEvents && e.__wxCaptureEvents[i] && a.push([e, t]), !0
          });
          for (var l = a.length - 1; l >= 0; l--) {
            var c = a[l],
              u = c[0],
              d = c[1];
            if (t.target = d instanceof o ? d.__methodCaller : d, n(u.__wxCaptureEvents[i], u), t.__stopped) break
          }
        }
        if (t.target = e instanceof o ? e.__methodCaller : e, !t.__stopped) {
          var h = !t.bubbles;
          s(e, 0, r, function(e, r) {
            if (t.target = r instanceof o ? r.__methodCaller : r, e.__wxEvents && e.__wxEvents[i] && n(e.__wxEvents[i], e), h || t.__stopped) return !1
          })
        }
      }
    }, r.triggerEvent = function(e, t, n, i) {
      var o = r.create(t, n, i);
      r.dispatchEvent(e, o)
    }, r.addListenerToElement = function(e, t, n, r) {
      return r && (r.useCapture || r.capture) ? (e.__wxCaptureEvents || (e.__wxCaptureEvents = Object.create(null)), e.__wxCaptureEvents[t] || (e.__wxCaptureEvents[t] = i.create("Event Listener")), e.__wxCaptureEvents[t].add(n)) : (e.__wxEvents || (e.__wxEvents = Object.create(null)), e.__wxEvents[t] || (e.__wxEvents[t] = i.create("Event Listener")), e.__wxEvents[t].add(n))
    }, r.removeListenerFromElement = function(e, t, n, i) {
      return i && (i.useCapture || i.capture) ? void(e.__wxCaptureEvents && e.__wxCaptureEvents[t] && e.__wxCaptureEvents[t].remove(n)) : void(e.__wxEvents && e.__wxEvents[t] && e.__wxEvents[t].remove(n))
    }, e.exports = r
  }, function(e, t, n) {
    var i = n(1),
      r = n(5),
      o = n(2),
      a = ["created", "ready", "attached", "moved", "detached"],
      s = [String, Number, Boolean, Object, Array, null],
      l = function() {},
      c = function() {};
    c.create = function(e) {
      var t = new c;
      return t.is = e.is || "", t.using = e.using || {}, t.generics = e.generics || {}, t.template = e.template, t.data = null, t.properties = Object.create(null), t.methods = Object.create(null), t.listeners = Object.create(null), t.relations = Object.create(null), t.ancestors = [], t.options = {
        publicProperties: !!(e.options && void 0 !== e.options.publicProperties ? e.options.publicProperties : o.publicProperties)
      }, t._unprepared = e, (e.options && void 0 !== e.options.lazyRegistration ? e.options.lazyRegistration : o.lazyRegistration) || c.prepare(t), e.is && (c._list[e.is] = t), t
    }, c.prepare = function(e) {
      var t = e._unprepared;
      if (t) {
        e._unprepared = null;
        var n = e.ancestors,
          i = "",
          o = 0;
        for (o = 0; o < (t.behaviors || []).length; o++) {
          var u = t.behaviors[o],
            d = u;
          "string" == typeof d && (d = c._list[u]), d._unprepared && c.prepare(d), "object" == typeof d.data && (null === e.data ? e.data = d.data : r.shallowMerge(e.data, d.data));
          for (i in d.generics) {
            var h = d.generics[i];
            "object" != typeof h && (h = {}), e.generics[i] = {
              default: h.default
            }
          }
          for (i in d.properties) e.properties[i] = d.properties[i];
          for (i in d.relations) e.relations[i] = d.relations[i];
          for (i in d.methods) e.methods[i] = d.methods[i];
          for (var p = 0; p < d.ancestors.length; p++) n.indexOf(d.ancestors[p]) < 0 && n.push(d.ancestors[p])
        }
        "object" == typeof t.data && (null === e.data ? e.data = t.data : r.shallowMerge(e.data, t.data));
        for (i in t.properties) {
          var f = t.properties[i];
          s.indexOf(f) >= 0 && (f = {
            type: f
          }), void 0 === f.value && (f.type === String ? f.value = "" : f.type === Number ? f.value = 0 : f.type === Boolean ? f.value = !1 : f.type === Array ? f.value = [] : f.value = null), e.properties[i] = {
            type: f.type,
            value: f.value,
            filter: f.filter,
            observer: f.observer,
            public: !!(void 0 === f.public ? e.options.publicProperties : f.public),
            observeAssignments: !!f.observeAssignments
          }
        }
        for (o = 0; o < a.length; o++) e[a[o]] = t[a[o]];
        for (i in t.listeners) e.listeners[i] = t.listeners[i];
        for (i in t.relations) {
          var g = t.relations[i];
          e.relations[i] = {
            target: g.target || i,
            type: g.type,
            linked: g.linked || l,
            linkChanged: g.linkChanged || l,
            unlinked: g.unlinked || l
          }
        }
        for (i in t.methods) "function" == typeof t.methods[i] && (e.methods[i] = t.methods[i]);
        n.push(e)
      }
    }, c._list = Object.create(null), c.prototype.hasBehavior = function(e) {
      this._unprepared && c.prepare(this);
      for (var t = 0; t < this.ancestors.length; t++)
        if (e instanceof c) {
          if (this.ancestors[t] === e) return !0
        } else if (this.ancestors[t] === c._list[e]) return !0;
      return !1
    }, c.prototype._getAllListeners = function() {
      for (var e = {}, t = this.ancestors, n = 0; n < t.length; n++) {
        var i = this.ancestors[n];
        for (var r in i.listeners) Object.prototype.hasOwnProperty.call(e, r) ? e[r].push(i.listeners[r]) : e[r] = [i.listeners[r]]
      }
      return e
    }, c.prototype._getAllLifeTimeFuncs = function() {
      var e = {},
        t = this.ancestors;
      return a.forEach(function(n) {
        for (var r = e[n] = i.create("Lifetime Method"), o = 0; o < t.length; o++) {
          var a = t[o];
          a[n] && r.add(a[n])
        }
      }), e
    }, e.exports = c
  }, function(e, t, n) {
    var i = n(1),
      r = null,
      o = null,
      a = function(e, t, n, i) {
        this._caller = e, this._updateCb = i, this._propUpdater = r, this._data = t, this._changes = [], this._childPaths = {}, this._propFields = n, this._hidingValue = !1
      },
      s = Object.prototype.hasOwnProperty,
      l = function(e, t, n, i) {
        e ? t._pathObservers ? t._pathObservers.push(i) : t._pathObservers = [i] : t._observers ? t._observers.push(i) : t._observers = [i]
      },
      c = function(e, t, n, i) {
        if (n.length) {
          for (var r = 0; r < n.length; r++) {
            var o = n[r];
            e._childPaths || (e._childPaths = {});
            var a = e._childPaths;
            a[o] || (a[o] = {
              _childPaths: {},
              _observers: null,
              _pathObservers: null
            }), e = a[o]
          }
          l(t, e, n[r], i)
        } else t && (e._pathObservers ? e._pathObservers.push(i) : e._pathObservers = [i])
      },
      u = function(e, t, n, i) {
        for (var r = 0; r < n.length; r++) {
          var o = n[r],
            a = e._childPaths;
          if (!a || !a[o]) return !1;
          e = a[o]
        }
        for (var s = t ? e._pathObservers : e._observers, l = 0; l < s.length; l++)
          if (s[l] === i) return s.splice(l, 1), !0;
        return !1
      };
    a.create = function(e, t, n, i) {
      return new a(e, t, n, i)
    }, a.setPropUpdater = function(e) {
      r = e
    }, a.setPropObserver = function(e) {
      o = e
    }, a.prototype.setHidingValue = function(e) {
      this._hidingValue = !!e
    }, a.prototype.addPathObserver = function(e, t) {
      c(this, !0, e, t)
    }, a.prototype.removePathObserver = function(e, t) {
      return u(this, !0, e, t)
    }, a.prototype.addObserver = function(e, t) {
      c(this, !1, e, t)
    }, a.prototype.removeObserver = function(e, t) {
      return u(this, !1, e, t)
    };
    var d = function(e, t, n) {
        var r = null,
          o = 0;
        if (e._pathObservers)
          for (r = e._pathObservers, o = 0; o < r.length; o++) i.safeCallback("Data Observer", r[o], t, e._hidingValue ? [] : [n, []]);
        if (e._observers)
          for (r = e._observers, o = 0; o < r.length; o++) i.safeCallback("Data Observer", r[o], t, e._hidingValue ? [] : [n]);
        if (e._childPaths)
          for (var a in e._childPaths) {
            var l = void 0;
            "object" == typeof n && null !== n && s.call(n, a) && (l = n[a]), d(e._childPaths[a], t, l)
          }
      },
      h = function(e, t, n, r, a) {
        for (var l = 0; l < n.length; l++) {
          if (e._pathObservers)
            for (var c = e._pathObservers, u = 0; u < c.length; u++) i.safeCallback("Data Observer", c[u], t, e._hidingValue ? [] : [r, n.slice(l)]);
          var h = n[l];
          if (e._propFields && e._propFields[h]) {
            var p = e._propFields[h];
            o.call(t, r, a, n, p, e._hidingValue)
          }
          var f = e._childPaths;
          if (!f || !s.call(f, h)) return;
          e = f[h]
        }
        d(e, t, r)
      };
    a.prototype.triggerObservers = function(e, t, n) {
      h(this, this._caller, e, t, n)
    }, a.prototype.scheduleMerge = function(e, t, n) {
      this._changes.push([!0, e, t, n])
    }, a.prototype.scheduleReplace = function(e, t, n) {
      this._changes.push([!1, e, t, n])
    }, a.prototype.setChanges = function(e) {
      this._changes = e
    }, a.prototype.getChanges = function() {
      return this._changes
    }, a.prototype.doUpdates = function(e) {
      var t = this._changes;
      this._changes = [];
      for (var n = [], i = [], o = 0; o < t.length; o++) {
        var a = t[o],
          l = a[0],
          c = a[1],
          u = a[2],
          d = this._propFields[c[0]],
          g = void 0;
        if (d && 1 === c.length) g = this._data[c[0]], u = r.call(this._caller, c, d, u, this._hidingValue);
        else {
          for (var A = this._data, v = c[0], _ = 1; _ < c.length; _++) {
            var w = c[_];
            "number" == typeof w && isFinite(w) ? s.call(A, v) && A[v] instanceof Array || (A[v] = []) : (!s.call(A, v) || null === A[v] || "object" != typeof A[v] || A[v] instanceof Array) && (A[v] = {}), A = A[v], v = w
          }
          if (l) {
            var m = null !== u && "object" == typeof u;
            m && !(u instanceof Array) && s.call(A, v) && null !== A[v] && "object" == typeof A[v] && !(A[v] instanceof Array) ? f(A[v], u, this._propFields) : A[v] = m ? p(u) : u
          } else A[v] = u
        }
        n.push(c), i.push([u, g])
      }
      this._updateCb(n, t, e);
      for (var b = 0; b < i.length; b++) {
        var y = i[b];
        h(this, this._caller, n[b], y[0], y[1])
      }
    };
    var p = function(e) {
        var t = null;
        if (e instanceof Array) {
          t = [];
          for (var n = 0; n < e.length; n++) "object" == typeof e[n] ? t[n] = p(e[n]) : t[n] = e[n]
        } else {
          t = {};
          for (var i in e) "object" == typeof e[i] ? t[i] = p(e[i]) : t[i] = e[i]
        }
        return t
      },
      f = function(e, t, n) {
        for (var i in t) s.call(e, i) && "object" == typeof e[i] && null !== e[i] ? "object" == typeof t[i] && null !== t[i] ? t[i] instanceof Array ? e[i] = p(t[i]) : f(e[i], t[i]) : e[i] = t[i] : "object" == typeof t[i] && null !== t[i] ? e[i] = p(t[i]) : e[i] = t[i]
      },
      g = a.shallowMerge = function(e, t) {
        for (var n in t) s.call(e, n) ? "object" != typeof e[n] || "object" != typeof t[n] || null === t[n] || t[n] instanceof Array ? e[n] = t[n] : g(e[n], t[n]) : e[n] = t[n]
      };
    e.exports = a
  }, function(e, t, n) {
    var i = n(3),
      r = n(7),
      o = n(8),
      a = n(2),
      s = function(e) {
        l(this, e || null)
      };
    s.prototype = Object.create(Object.prototype, {
      constructor: {
        value: s,
        writable: !0,
        configurable: !0
      },
      id: {
        get: function() {
          return this.__id
        },
        set: function(e) {
          var t = String(e);
          if (this.__id !== t) {
            if (this.__id = t, this.ownerShadowRoot) {
              var n = this.ownerShadowRoot.__wxHost;
              n.__idCacheDirty = !0, this.__domElement && n.__componentOptions.writeIdToDOM && (this.__domElement.id = t)
            }
            a.writeExtraInfoToAttr && this.__domElement && this.__domElement.setAttribute("exparser:info-attr-id", t)
          }
        },
        configurable: !0
      },
      slot: {
        get: function() {
          return this.__slot
        },
        set: function(e) {
          e = String(e), this.__slot !== e && (this.__inheritSlots || (this.__slot = e, v(this)))
        },
        configurable: !0
      },
      attributes: {
        get: function() {
          var e = [];
          if (!this.__attributes) return e;
          for (var t in this.__attributes) e.push({
            name: t,
            value: this.__attributes[t]
          });
          return e
        },
        set: function() {},
        configurable: !0
      },
      class: {
        get: function() {
          return this.classList.getClassNames()
        }, set: function(e) {
          this.classList && this.classList.setClassNames(e)
        }, configurable: !0
      },
      style: {
        get: function() {
          return this.__domElement ? this.__domElement.style : null
        },
        set: function() {},
        configurable: !0
      }
    }), i._setElementSystem(s);
    var l = s.initialize = function(e, t) {
      e.__id = "", e.__slot = "", e.__virtual = !1, e.__inheritSlots = !1, e.__attributes = null, e.__attached = !1, e.parentNode = null, e.childNodes = [], e.ownerShadowRoot = null, e.__wxSlotParent = null, e.__wxSlotChildren = e.childNodes, e.__subtreeObserversCount = 0, e.classList = null, e.__methodCaller = e, e.__relationHandler = null, e.__domElement = t, t && (t.__wxElement = e)
    };
    s._clone = function(e, t, n) {
      e.__id = t.__id, e.__slot = t.__slot, e.__virtual = t.__virtual, e.__inheritSlots = t.__inheritSlots, e.__attributes = Object.create(null);
      for (var i in t.__attributes) e.__attributes[i] = t.__attributes[i];
      e.__attached = !1, e.parentNode = null, e.childNodes = [], e.ownerShadowRoot = null, e.__wxSlotParent = null, e.__wxSlotChildren = e.childNodes, e.__subtreeObserversCount = 0, e.classList = null, e.__methodCaller = e, e.__relationHandler = null, e.__domElement = n, n && (n.__wxElement = e)
    };
    var c = function(e) {
        if (!e.parentNode || e.parentNode.__attached) {
          var t = function(e) {
            if (e instanceof s) {
              e.__attached = !0, e.__lifeTimeFuncs && e.__lifeTimeFuncs.attached.call(e.__methodCaller, []), e.__relationHandler && e.__relationHandler("attached"), e.__attachedObservers && !e.__attachedObservers.empty && r._callSingleObserver(e, "__attachedObservers", {
                type: "attachStatus",
                target: e,
                status: "attached"
              }), e.shadowRoot instanceof s && t(e.shadowRoot);
              for (var n = e.childNodes, i = 0; i < n.length; i++) t(n[i])
            }
          };
          t(e)
        }
      },
      u = function(e) {
        if (e.__attached) {
          var t = function(e) {
            if (e instanceof s) {
              for (var n = e.childNodes, i = 0; i < n.length; i++) t(n[i]);
              e.shadowRoot instanceof s && t(e.shadowRoot), e.__attached = !1, e.__lifeTimeFuncs && e.__lifeTimeFuncs.detached.call(e.__methodCaller, []), e.__relationHandler && e.__relationHandler("detached"), e.__attachedObservers && !e.__attachedObservers.empty && r._callSingleObserver(e, "__attachedObservers", {
                type: "attachStatus",
                target: e,
                status: "detached"
              })
            }
          };
          t(e)
        }
      },
      d = function(e) {
        if (!e.__attached) return c(e);
        var t = function(e) {
          if (e instanceof s) {
            for (var n = e.childNodes, i = 0; i < n.length; i++) t(n[i]);
            e.shadowRoot instanceof s && t(e.shadowRoot), e.__lifeTimeFuncs && e.__lifeTimeFuncs.moved.call(e.__methodCaller, []), e.__relationHandler && e.__relationHandler("moved")
          }
        };
        t(e)
      },
      h = function(e, t, n) {
        if (e.__childObservers && !e.__childObservers.empty || e.__subtreeObserversCount) {
          var i = null,
            o = [n];
          i = "add" === t ? {
            type: "childList",
            target: e,
            addedNodes: o
          } : "remove" === t ? {
            type: "childList",
            target: e,
            removedNodes: o
          } : {
            type: "childList",
            target: e,
            addedNodes: o,
            removedNodes: o
          }, r._callObservers(e, "__childObservers", i)
        }
      },
      p = function(e, t, n) {
        var i = e.ownerShadowRoot,
          r = !1,
          l = !1,
          c = !1,
          u = !1,
          d = function(e) {
            if (e.ownerShadowRoot = t, e instanceof s) {
              if (t) {
                var h = t.__wxHost.__componentOptions;
                e.__domElement && e.__id && h.writeIdToDOM !== !(!i || !i.__wxHost.__componentOptions.writeIdToDOM) && (h.writeIdToDOM ? e.__domElement.id = e.__id : e.__domElement.id = ""), e.classList instanceof o && (e.classList._setPrefix(h.classPrefix, t.__wxHost.__using, h.addGlobalClass), a.writeExtraInfoToAttr && e.__domElement && e.__domElement.setAttribute("exparser:info-class-prefix", h.classPrefix && h.classPrefix + "--"))
              }
              n && (e.__id && (i && (r = !0), t && (c = !0)), void 0 !== e.__slotName && (i && (l = !0), t && (u = !0)));
              for (var p = e.childNodes, f = 0; f < p.length; f++) d(p[f])
            }
          };
        return d(e), r && (i.__wxHost.__idCacheDirty = !0), l && (i.__slotCacheDirty = !0), c && (t.__wxHost.__idCacheDirty = !0), u && (t.__slotCacheDirty = !0), i
      };
    s._updateIdMap = function(e) {
      var t = e.shadowRoot;
      if (e.__idCacheDirty) {
        e.__idCacheDirty = !1;
        var n = e.__idCache = Object.create(null),
          i = function(e) {
            e.__id && (n[e.__id] || (n[e.__id] = e));
            for (var t = e.childNodes, r = 0; r < t.length; r++) t[r] instanceof s && i(t[r])
          };
        i(t)
      }
    };
    var f = function(e) {
        e.__slotCacheDirty = !1;
        var t = e.__wxHost,
          n = null,
          i = Object.create(null);
        n = void 0 !== t.__singleSlot ? {
          "": t.__singleSlot
        } : t.__slots;
        var r = function(e) {
          void 0 !== e.__slotName && (i[e.__slotName] || (i[e.__slotName] = e));
          for (var t = e.childNodes, n = 0; n < t.length; n++) t[n] instanceof s && r(t[n])
        };
        r(e), void 0 !== t.__singleSlot ? t.__singleSlot !== i[""] && (i[""] && (i[""].__wxSlotChildren = t.childNodes), g(t, i, n, !0), t.__singleSlot && (t.__singleSlot.__wxSlotChildren = []), t.__singleSlot = i[""] || null) : (g(t, i, n, !1), t.__slots = i)
      },
      g = function(e, t, n, i) {
        var r = e.childNodes,
          o = 0;
        if (i) {
          var a = t[""];
          if (a)
            for (; o < r.length; o++) w(a, r[o], null, !1, !1, !1, -1);
          else if (a = n[""])
            for (; o < r.length; o++) w(a, null, r[o], !0, !1, !1, o)
        } else {
          var s = function(e) {
            for (var i = 0; i < e.length; i++) {
              var r = e[i],
                o = r.__slot || "",
                a = t[o];
              a ? w(a, r, null, !1, !0, !0) : (a = n[o]) && w(a, null, r, !0, !0, !0), r.__inheritSlots && s(r.childNodes)
            }
          };
          s(r)
        }
      },
      A = function(e, t, n, i) {
        for (var r = function(e, t, i) {
            var o = e.childNodes,
              a = 0;
            for (t && (a = o.indexOf(t) + (i ? 0 : 1)); a < o.length; a++) {
              var s = o[a];
              if (s.__slot === n) return s;
              if (s.__inheritSlots) {
                var l = r(s, null, !1);
                if (l) return l
              }
            }
            return null
          }; t !== e; t = t.parentNode) {
          var o = r(t.parentNode, t, i);
          if (o) return o;
          i = !1
        }
        return null
      },
      v = function(e) {
        for (var t = e.parentNode; t && t.__inheritSlots;) t = t.parentNode;
        if (t && void 0 === t.__singleSlot) {
          var n = e.__slot || "",
            i = t.__slots[n];
          if (i) {
            var r = A(t, e, n, !1);
            w(i, e, r, !1, !0, !0)
          } else(i = e.__wxSlotParent) && w(i, null, e, !0, !0, !0)
        }
      },
      _ = function(e, t, n, i, r) {
        var o = e;
        if (o instanceof s) {
          for (; o.__virtual;) {
            var a = o.__wxSlotParent;
            if (!a) {
              o = null;
              break
            }
            if (t && !n) {
              var l = a.__wxSlotChildren.indexOf(o);
              n = a.__wxSlotChildren[l + 1]
            }
            o = a
          }
          o instanceof s && (o = o.__domElement)
        }
        if (o) {
          var c = i,
            u = null,
            d = null;
          if (t)
            if (t.__virtual) {
              var h = document.createDocumentFragment(),
                p = function(e) {
                  for (var t = 0; t < e.__wxSlotChildren.length; t++) {
                    var n = e.__wxSlotChildren[t];
                    n.__virtual ? p(n) : h.appendChild(n.__domElement)
                  }
                };
              p(t), u = h
            } else u = t.__domElement;
          if (n)
            if (n.__virtual) {
              var f = e,
                g = 0;
              if (i) {
                var A = function(e) {
                  for (var t = 0; t < e.__wxSlotChildren.length; t++) {
                    var n = e.__wxSlotChildren[t];
                    n.__virtual ? A(n) : o.removeChild(n.__domElement)
                  }
                };
                A(n), c = !1, g = r + 1
              } else f = n.__wxSlotParent, g = n === t ? r : f.__wxSlotChildren.indexOf(n);
              if (t) {
                var v = function(e, t) {
                  for (; t < e.__wxSlotChildren.length; t++) {
                    var n = e.__wxSlotChildren[t];
                    if (!n.__virtual) return n;
                    var i = v(n, 0);
                    if (i) return i
                  }
                };
                n = null;
                for (var _ = f; !(n = v(_, g)) && _.__virtual; _ = _.__wxSlotParent) g = _.__wxSlotParent.__wxSlotChildren.indexOf(_) + 1;
                n && (d = n.__domElement)
              }
            } else d = n.__domElement;
          c ? u ? o.replaceChild(u, d) : o.removeChild(d) : u && (d ? o.insertBefore(u, d) : o.appendChild(u))
        } else if (t && t.__wxSlotParent) {
          var w = function(e) {
            if (e.__virtual)
              for (var t = 0; t < e.__wxSlotChildren.length; t++) w(e.__wxSlotChildren[t]);
            else {
              var n = e.__domElement;
              n && n.parentNode && n.parentNode.removeChild(n)
            }
          };
          w(t)
        }
      },
      w = function(e, t, n, i, r, o, l) {
        if (i && (n.__wxSlotParent = null), r && (l = e.__wxSlotChildren.indexOf(n)), t) {
          var c = t.__wxSlotParent;
          if (t.__wxSlotParent = e, c && o) {
            var u = c.__wxSlotChildren.indexOf(t);
            c.__wxSlotChildren.splice(u, 1), c === e && u < l && l--
          }
        }
        _(e, t, n, i, l), a.writeExtraInfoToAttr && (i && n instanceof s && n.__domElement && n.__domElement.removeAttribute("exparser:info-in-slot-of"), t instanceof s && t.__domElement && (void 0 !== e.__slotName && e.ownerShadowRoot ? t.__domElement.setAttribute("exparser:info-in-slot-of", e.ownerShadowRoot.__wxHost.__componentInstanceId) : t.__domElement.removeAttribute("exparser:info-in-slot-of"))), r && (-1 === l && (l = e.__wxSlotChildren.length), t ? e.__wxSlotChildren.splice(l, i ? 1 : 0, t) : e.__wxSlotChildren.splice(l, i ? 1 : 0))
      },
      m = function(e, t) {
        for (var n = e.childNodes, i = 0; i < n.length; i++) {
          var r = n[i];
          t(e, r), r.__inheritSlots && m(r, t)
        }
      },
      b = function(e, t, n, i) {
        if (void 0 !== e.__slotName) return !1;
        var o = -1;
        if (n && (o = e.childNodes.indexOf(n)) < 0) return !1;
        i && t === n && (i = !1);
        var a = null,
          s = e,
          l = e;
        if (t) {
          a = t.parentNode, t.parentNode = e;
          var g = e.__subtreeObserversCount;
          if (a) {
            var v = a.childNodes.indexOf(t);
            a.childNodes.splice(v, 1), a === e && v < o && o--, g -= a.__subtreeObserversCount
          }
          g && r._updateSubtreeCaches(t, g)
        }
        for (var _ = e; _ && _.__inheritSlots;) _ = _.parentNode;
        for (var b = !_ || !_.__slots, y = !b || e.__inheritSlots, x = a; x && x.__inheritSlots;) x = x.parentNode;
        var C = !x || !x.__slots,
          S = !C || a && a.__inheritSlots;
        if (b) void 0 !== e.__singleSlot && (s = l = e.__singleSlot), s ? w(s, t, n, i, y, S, o) : t.__wxSlotParent && w(t.__wxSlotParent, null, t, !0, S, !1), t && !C && t.__inheritSlots && m(t, function(e, t) {
          w(e, t, null, !1, !0, !0, -1)
        });
        else {
          var E = "";
          if (t && (E = t.__slot || "", s = _.__slots[E] || null), n && (l = _.__slots[n.__slot || ""] || null), n && l && i && w(l, null, n, i, !0, !1), t)
            if (s) {
              var I = n ? A(_, n, E, !i) : null;
              w(s, t, I, !1, !0, S)
            } else t.__wxSlotParent && w(t.__wxSlotParent, null, t, !0, S, !1);
          n && i && n.__inheritSlots && m(n, function(e, t) {
            w(e, t, null, !1, !0, !0, -1)
          }), t && t.__inheritSlots && m(t, function(e, t) {
            var r = t.__slot || "",
              o = _.__slots[r] || null;
            if (o) {
              var a = n ? A(_, n, r, !i) : null;
              w(o, t, a, !1, !0, !0)
            } else t.__wxSlotParent && w(t.__wxSlotParent, null, t, !0, !0, !1)
          })
        }
        i && (e.__subtreeObserversCount && r._updateSubtreeCaches(n, -e.__subtreeObserversCount), n.parentNode = null), -1 === o && (o = e.childNodes.length), t ? e.childNodes.splice(o, i ? 1 : 0, t) : e.childNodes.splice(o, i ? 1 : 0);
        var k = null,
          P = null;
        return i && null !== n.ownerShadowRoot && (k = p(n, null, !0)), t && t.ownerShadowRoot !== t.parentNode.ownerShadowRoot && (P = p(t, t.parentNode.ownerShadowRoot, !0)), i && (k && k.__slotCacheDirty && f(k), n.ownerShadowRoot && n.ownerShadowRoot.__slotCacheDirty && f(n.ownerShadowRoot)), t && (P && P.__slotCacheDirty && f(P), t.ownerShadowRoot && t.ownerShadowRoot.__slotCacheDirty && f(t.ownerShadowRoot)), i && (u(n), h(e, "remove", n)), t && (a ? d(t) : c(t), a === e ? h(e, "move", t) : (a && h(a, "remove", t), h(e, "add", t))), !0
      },
      y = function(e, t, n, i) {
        var r = i ? n : t;
        return b(e, t, n, i) ? r : null
      };
    s._attachShadowRoot = function(e) {
      var t = e.__wxHost;
      t.__wxSlotChildren = [e], w(t, e, null, !1, !1, 0), p(e, e, !1)
    }, s.appendChild = function(e, t) {
      return y(e, t, null, !1)
    }, s.insertBefore = function(e, t, n) {
      return y(e, t, n, !1)
    }, s.removeChild = function(e, t) {
      return y(e, null, t, !0)
    }, s.replaceChild = function(e, t, n) {
      return y(e, t, n, !0)
    }, s.prototype.appendChild = function(e) {
      return y(this, e, null, !1)
    }, s.prototype.insertBefore = function(e, t) {
      return y(this, e, t, !1)
    }, s.prototype.removeChild = function(e) {
      return y(this, null, e, !0)
    }, s.prototype.replaceChild = function(e, t) {
      return y(this, e, t, !0)
    }, s.prototype.triggerEvent = function(e, t, n) {
      i.triggerEvent(this, e, t, n)
    }, s.prototype.dispatchEvent = function(e) {
      i.dispatchEvent(this, e)
    }, s.prototype.addListener = function(e, t, n) {
      i.addListenerToElement(this, e, t, n)
    }, s.prototype.removeListener = function(e, t, n) {
      i.removeListenerFromElement(this, e, t, n)
    }, s.setMethodCaller = function(e, t) {
      e.__methodCaller = t
    }, s.getMethodCaller = function(e) {
      return e.__methodCaller
    }, s.prototype.getAttribute = function(e) {
      if (!this.__attributes) return null;
      var t = this.__attributes[e];
      return void 0 === t ? null : t
    }, s.prototype.setAttribute = function(e, t) {
      this.__attributes || (this.__attributes = Object.create(null)), t = String(t), this.__attributes[e] = t, this.__domElement && this.__domElement.setAttribute(e, t)
    }, s.prototype.removeAttribute = function(e) {
      this.__attributes && (delete this.__attributes[e], this.__domElement && this.__domElement.removeAttribute(e))
    }, s.replaceDocumentElement = function(e, t) {
      e.__attached || (t.parentNode.replaceChild(e.__domElement, t), c(e))
    }, s.pretendAttached = function(e) {
      e.__attached || c(e)
    }, s.pretendDetached = function(e) {
      e.__attached && u(e)
    }, s.isAttached = function(e) {
      return e.__attached
    }, s.setSlotName = function(e, t) {
      if (t = null == t ? "" : String(t), void 0 === e.__slotName) {
        if (0 !== e.childNodes.length || 0 !== e.__wxSlotChildren.length) return;
        e.__wxSlotChildren = []
      }
      e.__slotName = t, e.ownerShadowRoot && f(e.ownerShadowRoot)
    }, s.setInheritSlots = function(e) {
      e.__singleSlot || e.__slots || e.__wxSlotChildren.length || (e.__wxSlotChildren = [], e.__inheritSlots = !0)
    }, s.getInheritSlots = function(e) {
      return e.__inheritSlots
    };
    var x = function(e, t) {
        var n = e.match(/^(#[_a-zA-Z][-_a-zA-Z0-9:]*|)((?:\.-?[_a-zA-Z][-_a-zA-Z0-9]*)+|)$/);
        if (!n) return null;
        var i = n[1].slice(1),
          r = n[2].split(".");
        return r.shift(), i || r.length ? {
          id: i,
          classes: r,
          relation: t || ""
        } : null
      },
      C = s.parseSelector = function(e) {
        for (var t = e.split(","), n = [], i = !1, r = 0; r < t.length; r++) {
          for (var o = t[r].split(/( |\t|>+)/g), a = [], s = "", l = 0; l < o.length; l++) {
            var c = o[l];
            if (c && " " !== c && "\t" !== c)
              if (">" !== c[0]) {
                var u = x(c, s);
                if (s = "", !u) break;
                a.push(u)
              } else {
                if ("" !== s) break;
                s = c, ">>>" === c && (i = !0)
              }
          }
          l === o.length && a.length && n.push(a)
        }
        return n.length ? {
          crossShadow: i,
          union: n
        } : null
      },
      S = function(e, t, n, i, r) {
        if (t === e) return !1;
        var o = n[i],
          a = !0;
        o.id && o.id !== t.__id && (a = !1);
        for (var s = o.classes, l = 0; a && l < s.length; l++) t.classList.contains(s[l]) || (a = !1);
        if (!a && ">" === r) return !1;
        var c = t;
        if (a && 0 === i) {
          if (null === e) return !0;
          for (c = c.parentNode; c; c = c.parentNode)
            if (c === e) return !0;
          if (">>>" !== r) return !1;
          c = t, a = !1
        }
        var u = a ? o.relation : r;
        do {
          c.parentNode ? c = c.parentNode : ">>>" === u ? c = c.__wxHost : ">>>" === r ? (a = !1, c = c.__wxHost) : c = null, c === e && (c = null)
        } while (c && c.__virtual);
        if (!c) return !1;
        if (a) {
          if (S(e, c, n, i - 1, u)) return !0;
          if (">>>" !== r) return !1
        }
        return S(e, c, n, i, r)
      },
      E = function(e, t, n) {
        if (n.__virtual) return !1;
        for (var i = e.union, r = 0; r < i.length; r++) {
          var o = i[r];
          if (S(t, n, o, o.length - 1, ">")) return !0
        }
        return !1
      },
      I = function(e, t, n, i, r) {
        if (E(t, n, i) && (e.push(i), r)) return !0;
        if (i.shadowRoot && t.crossShadow) {
          if ((i.ownerShadowRoot ? i.ownerShadowRoot.__wxHost.__componentOptions.domain : a.domain) === i.__componentOptions.domain && I(e, t, n, i.shadowRoot, r) && r) return !0
        }
        for (var o = i.childNodes, l = 0; l < o.length; l++)
          if (o[l] instanceof s && I(e, t, n, o[l], r) && r) return !0;
        return !1
      };
    s.prototype.querySelector = function(e) {
      var t = "object" == typeof e ? e : C(e);
      if (!t) return null;
      var n = [];
      return I(n, t, this, this, !0), n[0] || null
    }, s.prototype.querySelectorAll = function(e) {
      var t = "object" == typeof e ? e : C(e),
        n = [];
      return t ? (I(n, t, this, this, !1), n) : []
    }, s.matchSelector = function(e, t) {
      var n = "object" == typeof e ? e : C(e);
      return !!n && E(n, null, t)
    }, s.prototype.matchSelector = function(e, t) {
      var n = "object" == typeof e ? e : C(e);
      return !!n && E(n, this, t)
    }, e.exports = s
  }, function(e, t, n) {
    var i = n(1),
      r = function() {};
    r.prototype = Object.create(Object.prototype, {
      constructor: {
        value: r,
        writable: !0,
        configurable: !0
      }
    }), r.create = function(e) {
      var t = new r;
      return t._cb = e, t._noSubtreeCb = function(t) {
        t.target === this && e.call(this, t)
      }, t._binded = [], t
    }, r.prototype.observe = function(e, t) {
      t = t || {};
      var n = 0,
        r = t.subtree ? this._cb : this._noSubtreeCb;
      t.properties && (e.__propObservers || (e.__propObservers = i.create("Observer Callback")), this._binded.push({
        funcArr: e.__propObservers,
        id: e.__propObservers.add(r),
        subtree: t.subtree ? e : null
      }), n++), t.childList && (e.__childObservers || (e.__childObservers = i.create("Observer Callback")), this._binded.push({
        funcArr: e.__childObservers,
        id: e.__childObservers.add(r),
        subtree: t.subtree ? e : null
      }), n++), t.characterData && (e.__textObservers || (e.__textObservers = i.create("Observer Callback")), this._binded.push({
        funcArr: e.__textObservers,
        id: e.__textObservers.add(r),
        subtree: t.subtree ? e : null
      }), n++), t.subtree && o(e, n), t.attachStatus && (e.__attachedObservers || (e.__attachedObservers = i.create("Observer Callback")), this._binded.push({
        funcArr: e.__attachedObservers,
        id: e.__attachedObservers.add(r),
        subtree: null
      }))
    }, r.prototype.disconnect = function() {
      for (var e = this._binded, t = 0; t < e.length; t++) {
        var n = e[t];
        n.funcArr.remove(n.id), n.subtree && o(n.subtree, -1)
      }
      this._binded = []
    };
    var o = r._updateSubtreeCaches = function(e, t) {
      e.__subtreeObserversCount += t;
      var n = e.childNodes;
      if (n)
        for (var i = 0; i < n.length; i++) o(n[i], t)
    };
    r._callObservers = function(e, t, n) {
      do {
        e[t] && e[t].call(e, [n]), e = e.parentNode
      } while (e && e.__subtreeObserversCount)
    }, r._callSingleObserver = function(e, t, n) {
      e[t] && e[t].call(e, [n])
    }, e.exports = r
  }, function(e, t) {
    var n = function() {};
    n.create = function(e) {
      var t = new n;
      return t._prefix = null, t._using = null, t._rawNames = [], t._elem = e, t
    };
    var i = function(e) {
        var t = "",
          n = e._rawNames,
          i = e._prefix;
        if (!i) return n.join(" ");
        i += "--";
        for (var r = 0; r < n.length; r++) r && (t += " "), e._addOriginalClass && (t += n[r] + " "), t += i + n[r];
        return t
      },
      r = function(e) {
        var t = e._elem.__domElement;
        if (t) {
          var n = i(e);
          n ? t.setAttribute("class", n) : t.removeAttribute("class")
        }
      };
    n.prototype.toggle = function(e, t) {
      var n = this._rawNames.indexOf(e);
      void 0 === t && (t = n < 0), t ? n < 0 && (this._rawNames.push(e), r(this)) : n >= 0 && (this._rawNames.splice(n, 1), r(this))
    }, n.prototype.contains = function(e) {
      return this._rawNames.indexOf(e) >= 0
    }, n.prototype._setPrefix = function(e, t, n) {
      var i = this._prefix;
      this._prefix = e, i !== e && (this._using = t, this._addOriginalClass = n, r(this))
    }, n.prototype.setClassNames = function(e) {
      e = void 0 === e || null === e ? "" : String(e), this._rawNames = e.match(/-?[_0-9a-z][-_0-9a-z]*/gi) || [], r(this)
    }, n.prototype.getClassNames = function() {
      return i(this)
    }, e.exports = n
  }, function(e, t, n) {
    var i = n(1),
      r = n(5),
      o = n(3),
      a = n(4),
      s = n(6),
      l = n(10),
      c = n(7),
      u = n(8),
      d = n(2),
      h = o.addListenerToElement,
      p = function() {};
    p.prototype = Object.create(s.prototype, {
      constructor: {
        value: p,
        writable: !0,
        configurable: !0
      },
      data: {
        get: function() {
          return this.__dataProxy._data
        },
        set: function(e) {
          var t = this.__dataProxy;
          for (var n in e) t.scheduleReplace([n], e[n]);
          t.doUpdates()
        },
        configurable: !0
      },
      $: {
        get: function() {
          return s._updateIdMap(this), this.__idCache
        },
        set: function() {}
      }
    });
    var f = function() {};
    f.prototype = Object.create(Object.prototype);
    var g = null;
    p._setDefaultTemplateEngine = function(e) {
      g = e, delete p._setDefaultTemplateEngine
    };
    var A = function(e, t) {
        return t === String ? null === e || void 0 === e ? "" : String(e) : t === Number ? isFinite(e) ? Number(e) : 0 : t === Boolean ? !!e : t === Array ? e instanceof Array ? e : [] : t === Object ? "object" == typeof e ? e : null : void 0 === e ? null : e
      },
      v = function(e, t, n) {
        var i = t.replace(/[A-Z]/g, function(e) {
            return "-" + e.toLowerCase()
          }),
          r = typeof n;
        "boolean" === r ? n ? e.__domElement.setAttribute(i, "") : e.__domElement.removeAttribute(i) : "object" === r ? e.__domElement.setAttribute(i, JSON.stringify(n)) : e.__domElement.setAttribute(i, n)
      };
    r.setPropUpdater(function(e, t, n, r) {
      var o = e[0],
        a = this.__propData[o];
      if (n = A(n, t.type), t.filter) {
        var s = i.safeCallback("Property Filter", t.filter, this.__methodCaller, r ? [] : [n, a, e]);
        void 0 !== s && (n = s)
      }
      return this.__propData[o] = n, this.__domElement && this.__componentOptions.reflectToAttributes && this.__propPublic[o] && v(this, o, n), n
    }), r.setPropObserver(function(e, t, n, r, o) {
      if (r.observeAssignments || e !== t || "object" == typeof newValue) {
        var a = n[0];
        r.observer && i.safeCallback("Property Observer", r.observer, this.__methodCaller, o ? [] : [e, t, n]), r.public && (this.__propObservers && !this.__propObservers.empty || this.__subtreeObserversCount) && c._callObservers(this, "__propObservers", {
          type: "properties",
          target: this,
          propertyName: a
        })
      }
    });
    var _ = function(e, t, n) {
        t.__relationLinks || (t.__relationLinks = {});
        for (var i = t.__relationLinks[n] = [], r = 0; r < e.length; r++) i.push(null)
      },
      w = function(e, t, n, i, r) {
        for (var o = p.prototype.hasBehavior, s = 0; s < e.length; s++) {
          var l = e[s],
            c = null;
          if (c = "object" != typeof l.target ? a._list[l.target] : l.target) {
            var u = t[s],
              d = null;
            if (!r)
              for (var h = n.parentNode; h; h = h.parentNode)
                if (!h.__virtual) {
                  if (o.call(h, c))
                    for (var f = i ? h.__relationMap.descendant : h.__relationMap.child, g = 0; g < f.length; g++) {
                      var A = f[g],
                        v = null;
                      if ((v = "object" != typeof A.target ? a._list[A.target] : A.target) && o.call(n, v)) {
                        d = {
                          parent: h,
                          relation: A
                        };
                        break
                      }
                    }
                  if (!i || d) break
                }
            t[s] = d, !u || d && u.parent === d.parent || (u.relation.unlinked.call(u.parent.__methodCaller, n.__methodCaller), l.unlinked.call(n.__methodCaller, u.parent.__methodCaller)), !d || u && u.parent === d.parent || (d.relation.linked.call(d.parent.__methodCaller, n.__methodCaller), l.linked.call(n.__methodCaller, d.parent.__methodCaller)), u && d && u.parent === d.parent && (d.relation.linkChanged.call(d.parent.__methodCaller, n.__methodCaller), l.linkChanged.call(n.__methodCaller, d.parent.__methodCaller))
          }
        }
      },
      m = function(e, t) {
        var n = [],
          i = "descendant" === t.type,
          r = function(o) {
            for (var a = o.childNodes, l = 0; l < a.length; l++) {
              var c = a[l];
              if (c instanceof s)
                if (c.__virtual) r(c);
                else {
                  if (c.__relationLinks) {
                    var u = i ? c.__relationLinks.ancestor : c.__relationLinks.parent;
                    if (u)
                      for (var d = 0; d < u.length; d++) {
                        var h = u[d];
                        if (h && h.parent === e && h.relation === t) {
                          n.push(c);
                          break
                        }
                      }
                  }
                  i && r(c)
                }
            }
          };
        return r(e), n
      };
    p._list = {}, p.register = function(e) {
      var t = e.options || {},
        n = a.create(e),
        i = void 0 !== t.classPrefix ? t.classPrefix : d.classPrefix;
      null !== i && void 0 !== i || (i = n.is || "");
      var r = new f;
      return r._unprepared = n, r.is = e.is || "", r.behavior = n, r.protoFunc = null, r.props = null, r.template = null, r.defaultValuesJSON = "", r.innerEvents = null, r.generics = n.generics, r.options = {
        domain: t.domain || d.domain,
        writeOnly: !!(void 0 !== t.writeOnly ? t.writeOnly : d.writeOnly),
        allowInWriteOnly: !!(void 0 !== t.allowInWriteOnly ? t.allowInWriteOnly : d.allowInWriteOnly),
        classPrefix: i,
        addGlobalClass: !!(void 0 !== t.addGlobalClass ? t.addGlobalClass : d.addGlobalClass),
        templateEngine: t.templateEngine || d.templateEngine || g,
        renderingMode: t.renderingMode || d.renderingMode,
        multipleSlots: !!(void 0 !== t.multipleSlots ? t.multipleSlots : d.multipleSlots),
        reflectToAttributes: !!(void 0 !== t.reflectToAttributes ? t.reflectToAttributes : d.reflectToAttributes),
        writeFieldsToNode: !!(void 0 !== t.writeFieldsToNode ? t.writeFieldsToNode : d.writeFieldsToNode),
        writeIdToDOM: !!(void 0 !== t.writeIdToDOM ? t.writeIdToDOM : d.writeIdToDOM)
      }, n._unprepared || p.prepare(r), void 0 !== e.is && (p._list[n.is] = r), r
    }, p.isPrepared = function(e) {
      return !e._unprepared
    }, p.prepare = function(e) {
      var t = e._unprepared;
      if (t) {
        e._unprepared = null;
        var n = e.options,
          i = {};
        t._unprepared && a.prepare(t), n.writeOnly && (i.data = {
          value: null
        });
        var r = e.props = {};
        Object.keys(t.properties).forEach(function(e) {
          var o = t.properties[e];
          r[e] = {
            type: o.type,
            value: o.value,
            filter: "function" == typeof o.filter ? o.filter : null == o.filter ? null : t.methods[o.filter],
            observer: "function" == typeof o.observer ? o.observer : null == o.observer ? null : t.methods[o.observer],
            public: o.public,
            observeAssignments: o.observeAssignments
          }, n.writeFieldsToNode && (i[e] = {
            enumerable: !0,
            get: function() {
              return this.__propData[e]
            },
            set: function(t) {
              var n = this.__dataProxy;
              n.scheduleReplace([e], t), n.doUpdates()
            }
          })
        });
        var o = e.protoFunc = function() {},
          s = o.prototype = Object.create(p.prototype, i);
        if (s.is = e.is, s.__componentOptions = n, s.__using = t.using, s.__behavior = t, n.writeFieldsToNode)
          for (var l in t.methods) s[l] = t.methods[l];
        s.__lifeTimeFuncs = t._getAllLifeTimeFuncs();
        var c = t.relations,
          u = s.__relationMap = {};
        for (var d in c) {
          var h = c[d],
            f = h.type;
          u[f] ? u[f].push(h) : u[f] = [h]
        }
        var g = [];
        u.parent && g.push(function(e) {
          w(this.__relationMap.parent, this.__relationLinks.parent, this, !1, "detached" === e)
        }), u.ancestor && g.push(function(e) {
          w(this.__relationMap.ancestor, this.__relationLinks.ancestor, this, !0, "detached" === e)
        }), e.relationHandler = function(e) {
          for (var t = 0; t < g.length; t++) g[t].call(this, e)
        };
        var A = {},
          v = {},
          _ = t.data,
          m = "";
        for (m in _) v[m] = _[m];
        for (m in r) {
          var b = r[m];
          v[m] = b.value, A[m] = b.public
        }
        e.defaultValuesJSON = JSON.stringify(v);
        var y = n.templateEngine;
        e.template = y.create(t, v, n), s.__propPublic = A;
        var x = t._getAllListeners(),
          C = e.innerEvents = [];
        for (var S in x) {
          for (var E = x[S], I = S.indexOf("."), k = S.slice(I + 1), P = I < 1 ? "" : S.slice(0, I), T = [], D = 0; D < E.length; D++) {
            var B = E[D];
            "function" != typeof B && (B = null == B ? null : t.methods[B]), T.push(B)
          }
          C.push({
            id: P,
            name: k,
            funcs: T
          })
        }
      }
    };
    var b = 1,
      y = Object.prototype.hasOwnProperty,
      x = function(e, t) {
        return function(n) {
          return e.call(t.__methodCaller, n)
        }
      },
      C = function(e, t, n) {
        var i = n.domain,
          r = {};
        for (var o in e) {
          var a = e[o],
            s = t[o];
          "object" != typeof s && (s = p._list[s]), "object" != typeof s && null != a.default && (s = p._list[a.default]), s && (i === s.options.domain || s.options.writeOnly) && (r[o] = s)
        }
        return r
      },
      S = p._advancedCreate = function(e, t, n, i) {
        var o = t;
        o._unprepared && p.prepare(o);
        var a = o.options,
          l = o.protoFunc,
          c = new l,
          f = o.generics;
        c.__generics = f ? C(f, n || {}, a) : {};
        var g = null;
        "dom" === d.documentBackend ? (g = document.createElement(e), s.initialize(c, g)) : s.initialize(c, null), c.classList = u.create(c), d.writeExtraInfoToAttr && g && (c.__componentInstanceId = b++, g.setAttribute("exparser:info-component-id", c.__componentInstanceId)), c.__propData = JSON.parse(o.defaultValuesJSON), c.__dataProxy = r.create(c, c.__propData, o.props, function(e, t, n) {
          c.__templateInstance.updateValues(c, c.__propData, e, t, n)
        }), a.writeOnly && c.__dataProxy.setHidingValue(!0);
        var A = c.__templateInstance = o.template.createInstance(c, c.__propData, i);
        c.__idCacheDirty = !1, c.__idCache = A.idMap, c.$$ = g, null === A.slots[""] && (A.slots[""] = g), o.options.multipleSlots ? c.__slots = A.slots : (c.__singleSlot = A.slots[""] || null, c.__singleSlot && (c.__singleSlot.__wxSlotChildren = c.childNodes)), A.shadowRoot instanceof s ? (c.shadowRoot = A.shadowRoot, s._attachShadowRoot(A.shadowRoot)) : (c.shadowRoot = g, g.__wxHost = c, c.__domElement.appendChild(A.shadowRoot), c.__wxSlotChildren = [g], g.__wxSlotParent = c);
        for (var v = A.listeners, w = 0; w < v.length; w++) {
          var m = v[w];
          h(m.target, m.name, x(m.func, c))
        }
        for (var y = o.innerEvents, S = 0; S < y.length; S++) {
          var E = y[S],
            I = E.id ? "this" === E.id ? c : c.__idCache[E.id] : c.shadowRoot;
          if (I)
            for (var k = E.name, P = E.funcs, T = 0; T < P.length; T++) h(I, k, x(P[T], c))
        }
        var D = c.__relationMap;
        return D.parent && (_(D.parent, c, "parent"), c.__relationHandler = o.relationHandler), D.ancestor && (_(D.ancestor, c, "ancestor"), c.__relationHandler = o.relationHandler), c.__lifeTimeFuncs.created.call(c.__methodCaller, []), c
      };
    p.create = function(e, t, n) {
      return "object" == typeof e ? S(e.is, e, null, n) : e ? e.indexOf("-") < 0 && !t ? l.create(e) : S(e.toLowerCase(), t || y.call(p._list, e) && p._list[e] || p._list[""], null, n) : S("virtual", p._list[""], null, n)
    }, p.listProperties = function(e) {
      var t = [];
      for (var n in e.__propPublic) void 0 !== e.__propPublic[n] && t.push(n);
      return t
    }, p.listPublicProperties = function(e) {
      var t = [];
      for (var n in e.__propPublic) !0 === e.__propPublic[n] && t.push(n);
      return t
    }, p.hasProperty = function(e, t) {
      return void 0 !== e.__propPublic[t]
    }, p.hasPublicProperty = function(e, t) {
      return !0 === e.__propPublic[t]
    }, p.getMethodsFromDef = function(e) {
      return e.behavior._unprepared && a.prepare(e.behavior), e.behavior.methods
    }, p.getMethod = function(e, t) {
      return e.__behavior.methods[t]
    }, p.getComponentOptions = function(e) {
      return e.__componentOptions
    }, p.prototype.triggerLifeTime = function(e, t) {
      this.__lifeTimeFuncs[e].call(this.__methodCaller, t || [])
    }, p.prototype.hasBehavior = function(e) {
      return "object" != typeof e && Object.prototype.hasOwnProperty.call(this.__using, e) && (e = this.__using[e]), !!this.__behavior && this.__behavior.hasBehavior(e)
    }, p.prototype.getRootBehavior = function() {
      return this.__behavior
    }, p.prototype.getRelationNodes = function(e) {
      var t = this.__behavior.relations[e];
      if (!t) return null;
      if ("parent" === t.type || "ancestor" === t.type) {
        for (var n = this.__relationMap[t.type], i = 0; i < n.length && n[i] !== t; i++);
        return this.__relationLinks[t.type][i] ? [this.__relationLinks[t.type][i].parent] : []
      }
      return m(this, t)
    };
    var E = function(e) {
      for (var t = e.length, n = [], i = "", r = 0, o = !1, a = !1, s = 0; s < t; s++) {
        var l = e[s];
        if ("\\" === l) s + 1 < t && ("." === e[s + 1] || "[" === e[s + 1] || "]" === e[s + 1] || "\\" === e[s + 1]) ? (i += e[s + 1], s++) : i += "\\";
        else if ("." === l) i && (n.push(i), i = "");
        else if ("[" === l) {
          if (i && (n.push(i), i = ""), 0 === n.length) throw new Error("The path string should not start with []: " + e);
          a = !0, o = !1
        } else if ("]" === l) {
          if (!o) throw new Error("There should be digits inside [] in the path string: " + e);
          a = !1, n.push(r), r = 0
        } else if (a) {
          if (l < "0" || l > "9") throw new Error("Only digits (0-9) can be put inside [] in the path string: " + e);
          o = !0, r = 10 * r + l.charCodeAt(0) - 48
        } else i += l
      }
      if (i && n.push(i), 0 === t) throw new Error("The path string should not be empty");
      return n
    };
    p.prototype.mergeDataOnPath = function(e, t) {
      this.__dataProxy.scheduleMerge(e, t)
    }, p.prototype.replaceDataOnPath = function(e, t) {
      this.__dataProxy.scheduleReplace(e, t)
    }, p.getDataProxy = function(e) {
      return e.__dataProxy
    }, p.prototype.applyDataUpdates = function() {
      this.__dataProxy.doUpdates()
    }, p.prototype.setData = function(e) {
      var t = this.__dataProxy;
      for (var n in e) t.scheduleReplace(E(n), e[n]);
      t.doUpdates()
    }, e.exports = p
  }, function(e, t, n) {
    var i = n(6),
      r = n(8),
      o = n(2),
      a = function() {};
    a.prototype = Object.create(i.prototype, {
      constructor: {
        value: a,
        writable: !0,
        configurable: !0
      }
    }), a.create = function(e) {
      var t = new a;
      t.is = e.toLowerCase();
      var n = null;
      return "dom" === o.documentBackend && (n = document.createElement(e)), i.initialize(t, n), t.$$ = n, t.classList = r.create(t), t
    }, a.cloneNode = function(e) {
      var t = new a;
      t.is = e.is;
      var n = null;
      return e.__domElement && (n = document.importNode ? document.importNode(e.__domElement, !1) : e.__domElement.cloneNode(!1)), i._clone(t, e, n), t.$$ = n, t.classList = r.create(t), t
    }, e.exports = a
  }, function(e, t, n) {
    var i = n(7),
      r = n(2),
      o = function() {};
    o.prototype = Object.create(Object.prototype, {
      constructor: {
        value: o,
        writable: !0,
        configurable: !0
      }
    }), o.create = function(e) {
      var t = new o;
      t.__slot = "";
      var n = null;
      return "dom" === r.documentBackend ? (n = document.createTextNode(e || ""), n.__wxElement = t) : t.__textContent = e, t.$$ = t.__domElement = n, t.__subtreeObserversCount = 0, t.parentNode = null, t.ownerShadowRoot = null, t
    }, Object.defineProperty(o.prototype, "textContent", {
      get: function() {
        return this.__domElement ? this.__domElement.textContent : this.__textContent
      },
      set: function(e) {
        this.__domElement ? this.__domElement.textContent = e : this.__textContent = String(e), (this.__textObservers && !this.__textObservers.empty || this.__subtreeObserversCount) && i._callObservers(this, "__textObservers", {
          type: "characterData",
          target: this
        })
      }
    }), e.exports = o
  }, function(e, t, n) {
    var i = n(6),
      r = n(2),
      o = function(e) {
        a(this, e)
      };
    o.prototype = Object.create(i.prototype);
    var a = o.initialize = function(e, t) {
      e.is = t || "";
      var n = null;
      "dom" === r.documentBackend && (n = void 0), i.initialize(e, n), e.__virtual = !0
    };
    o.create = function(e) {
      return new o(e)
    }, e.exports = o
  }, function(e, t, n) {
    var i = n(6),
      r = n(9),
      o = n(12),
      a = n(11),
      s = Object.prototype.hasOwnProperty,
      l = function(e) {
        o.initialize(this, "shadow"), this.__wxHost = e, this.__slotCacheDirty = !1, this.ownerShadowRoot = null
      };
    l.prototype = Object.create(o.prototype), l.create = function(e) {
      return new l(e)
    };
    var c = function(e, t) {
      var n = {};
      for (var i in e) {
        var o = e[i];
        "object" != typeof o && (s.call(t.__using, o) ? o = t.__using[o] : s.call(t.__generics, o) && (o = t.__generics[o] || r._list[""]), n[i] = o)
      }
      return n
    };
    l.prototype.createComponent = function(e, t, n, i) {
      var o = null;
      o = void 0 === t ? e : t;
      var a = this.__wxHost;
      return "object" != typeof o && (s.call(a.__using, o) ? o = a.__using[o] : s.call(a.__generics, o) && (o = a.__generics[o]), "object" != typeof o && (o = r._list[o] || r._list[""])), n && (n = c(n, a)), "object" == typeof e && (e = o.is), a.__componentOptions.writeOnly && !o.options.allowInWriteOnly && (o = r._list[""]), r._advancedCreate(e, o, n, i)
    }, l.prototype.tagNameUsed = function(e) {
      var t = this.__wxHost;
      return !!s.call(t.__using, e) || !!s.call(t.__generics, e)
    }, l.prototype.getHostNode = function() {
      return this.__wxHost
    }, l.prototype.createTextNode = function(e) {
      return a.create(e)
    }, l.prototype.createVirtualNode = function(e) {
      return o.create(e)
    }, l.prototype.getElementById = function(e) {
      return i._updateIdMap(this.__wxHost), this.__wxHost.__idCache[e]
    }, e.exports = l
  }, function(e, t, n) {
    (function(t) {
      var i = n(2),
        r = n(1),
        o = n(6),
        a = n(10),
        s = n(12),
        l = n(11),
        c = n(13),
        u = n(9),
        d = n(16),
        h = n(17),
        p = function() {};
      p.prototype = Object.create(Object.prototype, {
        constructor: {
          value: p,
          writable: !0,
          configurable: !0
        }
      });
      var f = function() {};
      f.prototype = Object.create(Object.prototype, {
        constructor: {
          value: f,
          writable: !0,
          configurable: !0
        }
      });
      var g = null;
      p.precompiler = g;
      var A = function(e) {
          return e.replace(/-([a-z])/g, function(e, t) {
            return t.toUpperCase()
          })
        },
        v = Object.prototype.hasOwnProperty,
        _ = function(e, t) {
          if (null !== e && "object" == typeof e && v.call(e, t)) return e[t]
        },
        w = function(e, t, n, i) {
          if (v.call(t, n)) {
            var o = t[n];
            if ("function" == typeof o) return r.safeCallback("Template Method", o, e, i)
          }
        },
        m = function(e, t) {
          return [{
            t: 1,
            n: "slot",
            a: [],
            c: [],
            p: null
          }]
        },
        b = {
          t: 1,
          n: '"slot"',
          v: !0,
          sn: "",
          a: [],
          c: [],
          p: null
        },
        y = function(e, t, n) {
          e.classList.toggle(t, !!n)
        },
        x = function(e, t, n) {
          e[t] = n
        },
        C = function(e, t, n) {
          e.class = n
        },
        S = function(e, t, n) {
          e.setAttribute("style", n)
        },
        E = function(e, t, n) {
          e.setAttribute("class", n)
        },
        I = function(e, t, n) {
          e.textContent = n
        },
        k = function(e, t, n) {
          e.dataset || (e.dataset = {}), e.dataset[t] = n
        },
        P = {
          $: function(e, t, n) {
            !0 === n ? e.setAttribute(t, "") : !1 === n || void 0 === n || null === n ? e.removeAttribute(t) : e.setAttribute(t, n)
          },
          ":": x,
          c: y,
          s: function(e, t, n) {
            var i = e.style;
            i && (i[t] = n)
          },
          d: k
        },
        T = function(e, t, n) {
          return [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        };
      p.create = function(e, n, i) {
        var r = void 0 === e.template ? T : e.template,
          o = r;
        if ("function" != typeof r)
          if (g && "undefined" != typeof window && "undefined" != typeof document) {
            var a = "__exparserFreeTmpl",
              s = g.compile(r),
              l = document.createElement("script");
            l.type = "text/javascript", l.innerHTML = "window." + a + "=" + s, document.head.appendChild(l), document.head.removeChild(l), o = window[a], window[a] = null
          } else o = void 0 !== t && void 0 !== t.versions && void 0 !== t.versions.node ? p.precompileAndGetCreator(r) : m;
        var c = Object.create(p.prototype);
        return c._tagTreeRoot = D(o, n, e.methods, i), c._renderingMode = i.renderingMode, c
      };
      var D = function(e, t, n, r) {
          var o = r.renderingMode,
            s = "native" === o,
            l = s,
            c = !1,
            u = Object.create(null);
          s && !i.hasDOMBackend && (e = m);
          var d = {},
            p = e(_, w, n),
            f = function(e) {
              for (var n = 0; n < e.length; n++) {
                var i = e[n];
                if (3 !== i.t) {
                  var r = i.n,
                    o = !(s || "string" == typeof r && r.indexOf("-") < 0);
                  "slot" === r && "" === i.sn && (c = !0), i.n = r;
                  var u = i.st;
                  u && u.e && (u.o = S, l && (u.v = u.e(t, d, null)));
                  var p = i.cl;
                  p && p.e && (p.o = s ? E : C, l && (p.v = p.e(t, d, null)));
                  var g = null;
                  o || (i.p = g = s ? document.createElement(i.n) : a.create(i.n), u && void 0 !== u.v && g.setAttribute("style", u.v), s && p && void 0 !== p.v && g.setAttribute("class", p.v));
                  for (var v = i.a, _ = 0; _ < v.length; _++) {
                    var w = v[_];
                    if (w.d) s || h[w.n].register(w.n, w, i);
                    else {
                      s || ("bind" === w.n.slice(0, 4) ? (w.evCatch = !1, w.ev = A(w.n.slice(4)), ":" === w.ev[0] && (w.ev = w.ev.slice(1))) : "catch" === w.n.slice(0, 5) && (w.evCatch = !0, w.ev = A(w.n.slice(5)), ":" === w.ev[0] && (w.ev = w.ev.slice(1))));
                      var m = w.o;
                      if (o) m ? w.o = "&" === m ? P[":"] : P[m] : (w.o = P[":"], w.n = A(w.n)), l && w.e && (w.v = w.e(t, d, null));
                      else if (!w.ev) {
                        var b = P;
                        w.o = m ? "&" === m ? b[":"] : b[m] : b.$, l ? (w.e && (w.v = w.e(t, d, null)), (w.o !== y || s) && w.o(g, w.n, w.v)) : w.e || w.o(g, w.n, w.v)
                      }
                    }
                  }
                  f(i.c), s && (1 !== i.c.length || void 0 === i.c[0].sn || i.c[0].compressed || (i.sn = i.c[0].sn, i.compressed = !0, i.c.pop()))
                } else i.e && (i.o = I, i.c = l ? i.e(t, d, null) : "")
              }
            };
          return f(p, u, !0), s && (c || p.push(b), 1 !== p.length || "" !== p[0].sn || p[0].compressed || p.pop()), p
        },
        B = function(e, t) {
          return function(n) {
            if (this[e](n), t) return !1
          }
        },
        M = function(e, t, n, i, r, c, p, f) {
          for (var g = null, A = 0, v = null, _ = 0; _ < e.length; _++) {
            var w = p,
              m = e[_];
            if (3 === m.t) g = m.e ? l.create(m.e(i, r, null)) : l.create(m.c), m.e && d.addBindings(c, w, m.b, g, m), o.appendChild(n, g);
            else {
              var b = m.cl,
                C = m.st,
                S = m.a,
                E = !1;
              for (A = 0; A < S.length; A++)
                if (v = S[A], v.d) {
                  var I = h[v.n].create(v.n, v, m, i, r, c, w, f, t, M, n);
                  if (h[v.n].requireBlock) {
                    g = I, o.appendChild(n, g), E = !0;
                    break
                  }
                }
              if (E) continue;
              if (m.v) g = s.create(m.n);
              else if (m.p) {
                for (g = a.cloneNode(m.p), A = 0; A < S.length; A++) v = S[A], v.d || (v.ev ? f(g, v.ev, v.v, v.evCatch) : v.o === x ? g.__domElement && (v.o(g.__domElement, v.n, v.e(i, r, null)), d.addBindings(c, w, v.b, g.__domElement, v)) : (v.e && v.o(g, v.n, v.e(i, r, null)), (v.e || v.o === y || v.o === k) && d.addBindings(c, w, v.b, g, v)));
                C && C.e && (g.setAttribute("style", C.e(i, r, null)), d.addBindings(c, w, C.b, g, C))
              } else {
                for (g = t.createComponent(m.n, void 0, m.g), A = 0; A < S.length; A++)
                  if (v = S[A], !v.d) {
                    var P = v.v;
                    v.o === x && u.hasPublicProperty(g, v.n) ? (v.e && (P = v.e(i, r, null), d.addBindings(c, w, v.b, g, v)), v.e ? v.o(g, v.n, P) : g.__behavior.properties[v.n].type === Boolean ? g[v.n] = !0 : g[v.n] = P) : v.ev ? f(g, v.ev, P, v.evCatch) : v.o !== x && (v.e && (P = v.e(i, r, null), d.addBindings(c, w, v.b, g, v)), v.o(g, v.n, P))
                  }
                C && (C.e ? (g.__domElement.setAttribute("style", C.e(i, r, null)), d.addBindings(c, w, C.b, g.__domElement, C)) : g.__domElement.setAttribute("style", C.v))
              }
              m.id && (g.id = m.id), b && (b.e ? g.class = b.e(i, r, null) : g.class = b.v, b.o && d.addBindings(c, w, b.b, g, b)), m.sl && (g.slot = m.sl), void 0 !== m.sn && o.setSlotName(g, m.sn), o.appendChild(n, g), M(m.c, t, g, i, r, c, w, f)
            }
          }
        },
        N = function(e, t, n) {
          for (var i = e.childNodes, r = 0; r < i.length; r++) {
            var o = i[r];
            o instanceof l || (o.__id && (t[o.__id] = o), void 0 !== o.__slotName && (n[o.__slotName] = o), N(o, t, n))
          }
        },
        R = function(e, t, n, i, r, o) {
          for (var a = null, s = 0, l = null, c = 0; c < e.length; c++) {
            var u = e[c];
            if (void 0 === u.n) a = document.createTextNode(u.c), u.e && d.addBindings(r, o, u.b, a, u), t.appendChild(a);
            else {
              var h = u.cl,
                p = u.st,
                f = u.a;
              for (a = u.v ? document.createElement("virtual") : document.importNode ? document.importNode(u.p, !1) : u.p.cloneNode(!1), s = 0; s < f.length; s++) l = f[s], l.e && d.addBindings(r, o, l.b, a, l);
              t.appendChild(a), u.id && (n[u.id] = a), h && h.e && d.addBindings(r, o, h.b, a, h), p && p.e && d.addBindings(r, o, p.b, a, p), void 0 !== u.sn && (i[u.sn] = a), R(u.c, a, n, i, r, o)
            }
          }
        };
      p.prototype.createInstance = function(e, t) {
        var n = Object.create(f.prototype),
          r = Object.create(null),
          o = Object.create(null),
          a = [],
          s = d.create("", null, null, null, null, [], function(e, t) {}),
          l = null;
        if ("native" === this._renderingMode) "dom" === i.documentBackend && (l = document.createDocumentFragment()), R(this._tagTreeRoot, l, r, o, s, {}), o[""] || (o[""] = null);
        else {
          var u = function(e, t, n, i) {
            l.__wxHost ? e.addListener(t, B(n, i).bind(l.__wxHost)) : a.push({
              target: e,
              name: t,
              func: B(n, i)
            })
          };
          l = c.create(e), M(this._tagTreeRoot, l, l, t, {}, s, {}, u), N(l, r, o)
        }
        return n.shadowRoot = l, n.idMap = r, n.slots = o, n.listeners = a, n._topScope = s, n
      }, f.prototype.updateValues = function(e, t, n) {
        for (var i = o.getMethodCaller(e), r = 0; r < n.length; r++) {
          var a = n[r];
          d.updateBinding(this._topScope, a, t, {}, i)
        }
      }, e.exports = p
    }).call(t, n(15))
  }, function(e, t) {
    function n() {
      throw new Error("setTimeout has not been defined")
    }

    function i() {
      throw new Error("clearTimeout has not been defined")
    }

    function r(e) {
      if (u === setTimeout) return setTimeout(e, 0);
      if ((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(e, 0);
      try {
        return u(e, 0)
      } catch (t) {
        try {
          return u.call(null, e, 0)
        } catch (t) {
          return u.call(this, e, 0)
        }
      }
    }

    function o(e) {
      if (d === clearTimeout) return clearTimeout(e);
      if ((d === i || !d) && clearTimeout) return d = clearTimeout, clearTimeout(e);
      try {
        return d(e)
      } catch (t) {
        try {
          return d.call(null, e)
        } catch (t) {
          return d.call(this, e)
        }
      }
    }

    function a() {
      g && p && (g = !1, p.length ? f = p.concat(f) : A = -1, f.length && s())
    }

    function s() {
      if (!g) {
        var e = r(a);
        g = !0;
        for (var t = f.length; t;) {
          for (p = f, f = []; ++A < t;) p && p[A].run();
          A = -1, t = f.length
        }
        p = null, g = !1, o(e)
      }
    }

    function l(e, t) {
      this.fun = e, this.array = t
    }

    function c() {}
    var u, d, h = e.exports = {};
    ! function() {
      try {
        u = "function" == typeof setTimeout ? setTimeout : n
      } catch (e) {
        u = n
      }
      try {
        d = "function" == typeof clearTimeout ? clearTimeout : i
      } catch (e) {
        d = i
      }
    }();
    var p, f = [],
      g = !1,
      A = -1;
    h.nextTick = function(e) {
      var t = new Array(arguments.length - 1);
      if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
      f.push(new l(e, t)), 1 !== f.length || g || r(s)
    }, l.prototype.run = function() {
      this.fun.apply(null, this.array)
    }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = c, h.addListener = c, h.once = c, h.off = c, h.removeListener = c, h.removeAllListeners = c, h.emit = c, h.prependListener = c, h.prependOnceListener = c, h.listeners = function(e) {
      return []
    }, h.binding = function(e) {
      throw new Error("process.binding is not supported")
    }, h.cwd = function() {
      return "/"
    }, h.chdir = function(e) {
      throw new Error("process.chdir is not supported")
    }, h.umask = function() {
      return 0
    }
  }, function(e, t) {
    var n = {};
    n.create = function(e, t, n, r, o, a, s) {
      for (var l = {
          inc: 1,
          name: e,
          exp: r,
          lp: o,
          scopes: {},
          targets: {},
          children: null,
          lu: s,
          __scopeBinded: []
        }, c = 0; c < a.length; c++) {
        var u = a[c];
        null === u[0] ? i(t, u, null, l) : i(n[u[0]], u, null, l)
      }
      return l
    }, n.proxyTopScope = function(e) {
      var t = {
        inc: 1,
        linked: e,
        scopes: {},
        targets: {},
        children: null,
        __scopeBinded: []
      };
      return i(e, [null], null, t), t
    }, n.proxySubScopes = function(e) {
      var t = {};
      for (var n in e) t[n] = {
        inc: 1,
        linked: e[n],
        scopes: {},
        targets: {},
        children: null,
        __scopeBinded: []
      }, i(e[n], [null], null, t[n]);
      return t
    };
    var i = n.addBinding = function(e, t, n, i) {
      for (var r = e, o = 1; o < t.length; o++) {
        var a = t[o];
        r.children || (r.children = Object.create(null));
        var s = r.children;
        s[a] || (s[a] = {
          scopes: {},
          targets: {},
          children: null
        }), r = s[a]
      }
      var l = e.inc++;
      return n ? r.targets[l] = [n, i] : (r.scopes[l] = i, i.__scopeBinded.push([r, l])), l
    };
    n.addBindings = function(e, t, n, r, o) {
      for (var a = 0; a < n.length; a++) {
        var s = n[a];
        s[0] ? i(t[s[0]], s, r, o) : i(e, s, r, o)
      }
    }, n.updateLvaluePath = function(e, t) {
      e.lp = t
    }, n.removeBindingsForScope = function(e) {
      for (var t = e.__scopeBinded, n = 0; n < t.length; n++) {
        var i = t[n];
        delete i[0].scopes[i[1]]
      }
    };
    var r = function(e, t, n, i, r) {
        if (e.linked) return void o(e, t, n, i, r);
        var a = i[e.name];
        i[e.name] = e.exp(n, i, r), o(e, t, n, i, r), i[e.name] = a
      },
      o = n.updateBinding = function(e, t, n, i, o) {
        for (var a = e, s = 0, l = 0; l < t.length; l++) {
          for (s in a.scopes) r(a.scopes[s], t, n, i, o);
          var c = t[l];
          if (!a.children) return;
          var u = a.children;
          if (!u[c]) return;
          a = u[c]
        }
        var d = function(e) {
          for (s in e.targets) {
            var t = e.targets[s],
              a = t[1];
            a.o(t[0], a.n, a.e(n, i, o))
          }
          for (s in e.scopes) r(e.scopes[s], [], n, i, o);
          for (s in e.children) d(e.children[s])
        };
        d(a)
      };
    e.exports = n
  }, function(e, t, n) {
    e.exports = {
      if: n(18),
      elif: n(18),
      else: n(18),
      for: n(20),
      key: n(21),
      "for-index": n(22),
      "for-item": n(23),
      alias: n(24)
    }
  }, function(e, t, n) {
    var i = n(12),
      r = n(16),
      o = n(19).RUNTIME_NAMES;
    o.TOP_SCOPE, o.SUB_SCOPE, o.CALLER, e.exports = {
      requireBlock: !0,
      register: function(e, t, n) {},
      create: function(e, t, n, o, a, s, l, c, u, d, h) {
        var p = i.create("wx:" + e);
        p.__wxIfCondValue = !0, p.__wxIfNextNode = null, p.__wxIfHasTrueCond = !0;
        var f = null;
        "if" !== e && (f = h.childNodes[h.childNodes.length - 1], "wx:if" !== f.is && "wx:elif" !== f.is ? f = null : f.__wxIfNextNode = p), n.id && (p.id = n.id);
        var g = p.__wxIfUpdateNode = function() {
            var e = p.__wxIfCondValue;
            if (f && f.__wxIfHasTrueCond && (e = !1), e && !p.childNodes.length) {
              var t = r.proxyTopScope(s),
                i = r.proxySubScopes(l);
              p.__wxTopScope = t, p.__wxSubScopes = i, d(n.c, u, p, o, a, t, i, c)
            } else if (!e && p.childNodes.length) {
              r.removeBindingsForScope(p.__wxTopScope);
              for (var h in p.__wxSubScopes) r.removeBindingsForScope(p.__wxSubScopes[h]);
              for (; p.childNodes.length;) p.removeChild(p.childNodes[0])
            }
            p.__wxIfNextNode && p.__wxIfNextNode.__wxIfUpdateNode()
          },
          A = function(e) {
            p.__wxIfCondValue = !!e, p.__wxIfHasTrueCond = p.__wxIfCondValue || f && f.__wxIfHasTrueCond, g()
          };
        return "else" === e ? A(!0) : (r.addBindings(s, l, t.b, p, {
          e: t.d,
          o: function(e, t, n) {
            A(n)
          }
        }), A(t.d(o, a, null))), p
      }
    }
  }, function(e, t) {
    t.TAG_TYPES = {
      TAG_START: 1,
      TAG_END: -1,
      TEXT: 3,
      COMMENT: 8
    }, t.RUNTIME_NAMES = {
      MEMBER: "m",
      CALL: "f",
      METHODS: "e",
      CALLER: "c",
      TOP_SCOPE: "t",
      SUB_SCOPE: "s"
    };
    var n = t.STRING_UNESCAPE_MAP = {
        n: "\n",
        r: "\r",
        b: "\b",
        f: "\f",
        t: "\t",
        v: "\v",
        '"': '"',
        "'": "'",
        "\\": "\\",
        "\r": "\r",
        "\n": "\n"
      },
      i = t.STRING_ESCAPE_MAP = {},
      r = "";
    for (var o in n) i[n[o]] = o, r += n[o];
    t.STRING_ESCAPE_REGEXP = new RegExp("[" + r + "]", "g")
  }, function(e, t, n) {
    var i = n(12),
      r = n(16),
      o = n(19).RUNTIME_NAMES;
    o.TOP_SCOPE, o.SUB_SCOPE, o.CALLER, e.exports = {
      requireBlock: !0,
      addDefaultAttrs: [{
        n: "wx:for-index",
        v: "index"
      }, {
        n: "wx:for-item",
        v: "item"
      }],
      register: function(e, t, n) {},
      create: function(e, t, n, o, a, s, l, c, u, d) {
        var h = n._wxForIndex || "index",
          p = n._wxForItem || "item",
          f = n._wxKey,
          g = i.create("wx:for:list");
        n.id && (g.id = n.id), r.create("", s, l, function(e, n, i) {
          var r = t.d(e, n, null);
          return m(r, e, n, i), r
        }, t.l, t.b);
        var A = function(e, t, o, a, f) {
            var A = i.create("wx:for:item"),
              v = r.proxyTopScope(s),
              _ = r.proxySubScopes(l);
            A.__wxTopScope = v, A.__wxSubScopes = _, A.__wxForToRemove = !1, A.__wxForKeyStr = "";
            var w = r.create(h, v, _, null, null, []),
              m = r.create(p, v, _, null, [o], []);
            return _[h] = w, _[p] = m, t[h] = o, t[p] = a, d(n.c, u, A, e, t, v, _, c), void 0 === f ? g.appendChild(A) : g.insertBefore(A, f), A
          },
          v = function(e, t, n, i, a, s) {
            var l = e.__wxSubScopes[p];
            r.updateLvaluePath(l, [i]), a && (s ? g.insertBefore(e, s) : g.appendChild(e));
            var c = e.__wxSubScopes[h];
            n[h] = i, r.updateBinding(c, [], o, n, t)
          },
          _ = function(e, t, n, i, o, a) {
            i[p] = o, r.updateBinding(e.__wxSubScopes[p], t, n, i, a)
          },
          w = function(e) {
            r.removeBindingsForScope(e.__wxTopScope);
            for (var t in g.__wxSubScopes) r.removeBindingsForScope(e.__wxSubScopes[t]);
            g.removeChild(e)
          },
          m = function(e, t, n, i) {
            var r = "",
              o = e;
            "object" == typeof e && null !== e || (o = []);
            var a = {};
            for (r in n) a[r] = n[r];
            var s = 0;
            if (f) {
              var l = [],
                c = e instanceof Array,
                u = [];
              if (!c) {
                var d = o;
                o = [];
                for (r in d) o.push(d[r]), u.push(r)
              }
              for (s = 0; s < o.length; s++) l.push(String(o[s][f]));
              if (0 === o.length)
                for (; g.childNodes.length;) w(g.childNodes[0]);
              else {
                var h = Object.create(null),
                  p = Object.create(null),
                  m = g.childNodes,
                  b = null,
                  y = "";
                for (s = 0; s < m.length; s++) b = m[s], y = b.__wxForKeyStr, h[y] >= 0 ? (w(b), s--) : (h[y] = s, p[y] = b, b.__wxForToRemove = !0);
                var x = -1,
                  C = 0,
                  S = 1,
                  E = [];
                for (C = h[o[0][f]], C >= 0 || (C = -1), m[C] && (m[C].__wxForToRemove = !1), s = 1; s < o.length; s++)(S = h[o[s][f]]) >= 0 && (x < C && (C < S || x > S) && (E.push(m[C]), x = C), C = S, m[C] && (m[C].__wxForToRemove = !1));
                for (x < C && E.push(m[C]), s = 0; s < m.length; s++) b = m[s], b.__wxForToRemove && (w(b), s--);
                var I = E.shift(),
                  k = 0;
                for (s = 0; s < o.length; s++) {
                  var P = o[s],
                    T = p[P[f]];
                  if (p[P[f]] = null, T) {
                    var D = !0;
                    if (T === I) {
                      for (; m[k] !== I;) k++;
                      k++, I = E.shift(), D = !1
                    }
                    b = T, v(b, i, a, c ? s : u[s], D, m[k]), D && m[k] === b && k++, _(b, [], t, a, o[s], i)
                  } else b = A(t, a, c ? s : u[s], o[s], m[k]), k++, b.__wxForKeyStr = String(P[f])
                }
              }
            } else {
              for (; g.childNodes.length;) w(g.childNodes[0]);
              if (e instanceof Array)
                for (s = 0; s < o.length; s++) A(t, a, s, o[s]);
              else
                for (r in o) A(t, a, r, o[r])
            }
          };
        return m(t.d(o, a, null), o, a, null), g
      }
    }
  }, function(e, t) {
    e.exports = {
      attachedToBlock: !0,
      register: function(e, t, n) {
        n._wxKey = t.d
      },
      create: function() {}
    }
  }, function(e, t) {
    e.exports = {
      attachedToBlock: "for",
      register: function(e, t, n) {
        n._wxForIndex = t.d
      },
      create: function() {}
    }
  }, function(e, t) {
    e.exports = {
      attachedToBlock: "for",
      register: function(e, t, n) {
        n._wxForItem = t.d
      },
      create: function() {}
    }
  }, function(e, t, n) {
    var i = n(12),
      r = n(16),
      o = n(19).RUNTIME_NAMES;
    o.TOP_SCOPE, o.SUB_SCOPE, o.CALLER, e.exports = {
      requireBlock: !0,
      register: function(e, t, n) {},
      create: function(e, t, n, o, a, s, l, c, u, d) {
        var h = t.s[0],
          p = r.create(h, s, l, t.d, t.l, t.b),
          f = {},
          g = "";
        for (g in l) f[g] = l[g];
        f[h] = p;
        var A = {};
        for (g in a) A[g] = a[g];
        A[h] = t.d(o, a, null);
        var v = i.create("wx:alias");
        return n.id && (v.id = n.id), d(n.c, u, v, o, A, s, f, c), v
      }
    }
  }])
}), Object.assign = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
    }
    return e
  },
  function(e) {
    var t = function(e) {
        return {
          animationName: e.animationName,
          elapsedTime: e.elapsedTime
        }
      },
      n = null;
    ["webkitAnimationStart", "webkitAnimationIteration", "webkitAnimationEnd", "animationstart", "animationiteration", "animationend", "webkitTransitionEnd", "transitionend"].forEach(function(i) {
      if (null === n && (n = "webkit" === i.slice(0, 6)), n) {
        if ("webkit" !== i.slice(0, 6)) return;
        i = i.slice(6).toLowerCase()
      } else if ("webkit" === i.slice(0, 6)) return;
      e.addEventListener(i, function(e) {
        e.target.__wxElement && exparser.triggerEvent(e.target.__wxElement, i, t(e)), document.dispatchEvent(new CustomEvent("pageReRender", {}))
      }, !0)
    })
  }(window),
  function(e) {
    ! function(e) {
      void 0 !== WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }(function() {
      WeixinJSBridge.subscribe("onAppRouteDone", function() {
        window.__onAppRouteDone = !0, exparser.triggerEvent(document, "routeDone", {}, {
          bubbles: !0
        }), document.dispatchEvent(new CustomEvent("pageReRender", {}))
      }), WeixinJSBridge.subscribe("setKeyboardValue", function(e) {
        e && e.data && exparser.triggerEvent(document, "setKeyboardValue", {
          value: e.data.value,
          cursor: e.data.cursor,
          inputId: e.data.inputId
        }, {
          bubbles: !0
        })
      }), WeixinJSBridge.subscribe("hideKeyboard", function(e) {
        exparser.triggerEvent(document, "hideKeyboard", {}, {
          bubbles: !0
        })
      }), WeixinJSBridge.on("onKeyboardComplete", function(e) {
        exparser.triggerEvent(document, "onKeyboardComplete", {
          value: e.value,
          inputId: e.inputId,
          cursor: "number" == typeof e.cursor ? e.cursor : -1
        }, {
          bubbles: !0
        })
      }), WeixinJSBridge.on("onKeyboardConfirm", function(e) {
        exparser.triggerEvent(document, "onKeyboardConfirm", {
          value: e.value,
          inputId: e.inputId
        }, {
          bubbles: !0
        })
      }), WeixinJSBridge.on("onTextAreaHeightChange", function(e) {
        exparser.triggerEvent(document, "onTextAreaHeightChange", {
          height: e.height,
          lineCount: e.lineCount,
          inputId: e.inputId
        }, {
          bubbles: !0
        })
      }), WeixinJSBridge.on("onKeyboardShow", function(e) {
        exparser.triggerEvent(document, "onKeyboardShow", {
          inputId: e.inputId
        }, {
          bubbles: !0
        })
      })
    })
  }(window),
  function(e) {
    exparser.globalOptions.renderingMode = "native", exparser.globalOptions.lazyRegistration = !1, exparser.globalOptions.classPrefix = "", exparser.globalOptions.reflectToAttributes = !0, exparser.globalOptions.domain = "//", e.addEventListener("change", function(e) {
      exparser.triggerEvent(e.target, "change", {
        value: e.target.value
      })
    }, !0), e.addEventListener("input", function(e) {
      exparser.triggerEvent(e.target, "input")
    }, !0), e.addEventListener("load", function(e) {
      exparser.triggerEvent(e.target, "load")
    }, !0), e.addEventListener("error", function(e) {
      exparser.triggerEvent(e.target, "error")
    }, !0), e.addEventListener("focus", function(e) {
      exparser.triggerEvent(e.target, "focus"), e.preventDefault()
    }, !0), e.addEventListener("blur", function(e) {
      exparser.triggerEvent(e.target, "blur")
    }, !0), window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, window.requestAnimationFrame || (window.requestAnimationFrame = function(e) {
      "function" == typeof e && setTimeout(function() {
        e()
      }, 17)
    })
  }(window),
  function(e) {
    var t = function(e, t, n) {
        var i = exparser.Event.create(t, n, {
          originalEvent: e,
          bubbles: !0,
          capturePhase: !0,
          composed: !0,
          extraFields: {
            touches: e.touches || {},
            changedTouches: e.changedTouches || {}
          }
        });
        return exparser.Event.dispatchEvent(e.target, i), i
      },
      n = function(e, t) {
        return e[t ? "changedTouches" : "touches"] = [{
          identifier: 0,
          pageX: e.pageX,
          pageY: e.pageY,
          clientX: e.clientX,
          clientY: e.clientY,
          screenX: e.screenX,
          screenY: e.screenY,
          target: e.target
        }], e
      },
      i = !1,
      r = 0,
      o = 0,
      a = 0,
      s = 0,
      l = null,
      c = !1,
      u = !1,
      d = function(e) {
        for (; e; e = e.parentNode) {
          var t = e.__wxElem || e;
          if (t.__wxScrolling && Date.now() - t.__wxScrolling < 50) return !0
        }
        return !1
      },
      h = function() {
        t(s, "longtap", {
          x: o,
          y: a
        })._hasListeners && console.warn('For developer:"longtap" event is deprecated. Please use "longpress" event instead.'), t(s, "longpress", {
          x: o,
          y: a
        })._hasListeners && (c = !0)
      },
      p = function(e, n, i) {
        if (!r) {
          if (e.defaultPrevented) return void(r = 0);
          r = e.timeStamp, o = n, a = i, d(e.target) ? (l = null, c = !0, t(e, "canceltap", {
            x: n,
            y: i
          })) : (l = setTimeout(h, 350), c = !1), s = e
        }
      },
      f = function(e, n, i) {
        r && (Math.abs(n - o) < 10 && Math.abs(i - a) < 10 || (l && (clearTimeout(l), l = null), c = !0, t(s, "canceltap", {
          x: n,
          y: i
        })))
      },
      g = function(e, n, i, u) {
        r && (r = 0, l && (clearTimeout(l), l = null), u && (s, n = o, i = a), u || c || (t(s, "tap", {
          x: n,
          y: i
        }), _(s)))
      };
    e.addEventListener("scroll", function(e) {
      e.target.__wxScrolling = Date.now()
    }, {
      capture: !0,
      passive: !1
    });
    var A = !1;
    e.addEventListener("touchstart", function(e) {
      i = !0, u = !!d(e.target);
      for (var n = 0; n < e.touches.length; n++)
        if (e.touches[n].pageX < -50) return void(A = !0);
      A = !1, t(e, "touchstart"), 1 === e.touches.length && p(e, e.touches[0].pageX, e.touches[0].pageY)
    }, {
      capture: !0,
      passive: !1
    }), e.addEventListener("touchmove", function(e) {
      if (!A) {
        for (var n = 0; n < e.touches.length; n++)
          if (e.touches[n].pageX < -50) return A = !0, t(e, "touchcancel"), void g(0, 0, 0, !0);
        t(e, "touchmove"), 1 === e.touches.length && f(0, e.touches[0].pageX, e.touches[0].pageY)
      }
    }, {
      capture: !0,
      passive: !1
    }), e.addEventListener("touchend", function(e) {
      if (u && e.preventDefault(), !A) {
        for (var n = 0; n < e.touches.length; n++)
          if (e.touches[n].pageX < -50) return A = !0, t(e, "touchcancel"), void g(0, 0, 0, !0);
        t(e, "touchend"), 0 === e.touches.length && g(0, e.changedTouches[0].pageX, e.changedTouches[0].pageY)
      }
    }, {
      capture: !0,
      passive: !1
    }), e.addEventListener("touchcancel", function(e) {
      A || (t(e, "touchcancel"), g(0, 0, 0, !0))
    }, {
      capture: !0,
      passive: !1
    }), window.addEventListener("blur", function() {
      g(0, 0, 0, !0)
    }), e.addEventListener("mousedown", function(e) {
      i || r || (n(e, !1), t(e, "touchstart"), p(e, e.pageX, e.pageY))
    }, {
      capture: !0,
      passive: !1
    }), e.addEventListener("mousemove", function(e) {
      !i && r && (n(e, !1), t(e, "touchmove"), f(0, e.pageX, e.pageY))
    }, {
      capture: !0,
      passive: !1
    }), e.addEventListener("mouseup", function(e) {
      !i && r && (n(e, !0), t(e, "touchend"), g(0, e.pageX, e.pageY))
    }, {
      capture: !0,
      passive: !1
    });
    var v = {},
      _ = function(e) {
        if (v.selector) {
          for (var t = v.selector, n = e.target; n && !n.__wxElement;) n = n.parentNode;
          for (n = n && n.__wxElement; n;) t.forEach(function(e) {
            exparser.Element.matchSelector(">>> " + e, n) && w(n, e)
          }), n = n.parentNode
        }
      },
      w = function(e, t) {
        for (var n = 0; n < v.data.length; n++) {
          var i = v.data[n],
            r = i.element.split(" ");
          if (i.element === t) {
            var o = {
              eventID: i.eventID,
              page: i.page,
              element: i.element,
              action: i.action,
              dataset: e.dataset,
              nodeId: e.ownerShadowRoot ? __virtualDOM__.getNodeId(e.ownerShadowRoot.__wxHost) : null,
              time: Date.now()
            };
            if (0 === t.indexOf(".")) {
              for (var a = e, s = e, l = []; a;) {
                if (a instanceof exparser.VirtualNode && "wx:for" === a.is) {
                  var c = a.childNodes.indexOf(s);
                  l.unshift(c)
                }
                s = a, a = a.parentNode
              }
              l.length === r.length && (o.index = l)
            }
            wx.publish("analyticsReport", o)
          }
        }
      };
    wx.subscribe("analyticsConfig", function(e) {
      "[object Array]" === Object.prototype.toString.call(e) && (v.data = e, v.selector = [], v.data.forEach(function(e) {
        e.element && -1 === v.selector.indexOf(e.element) && v.selector.push(e.element)
      }))
    })
  }(window), window.exparser.registerBehavior({
    is: "wx-base",
    properties: {
      hidden: {
        type: Boolean,
        public: !0
      }
    },
    methods: {
      getNodeId: function() {
        return this.ownerShadowRoot ? __virtualDOM__.getNodeId(this.ownerShadowRoot.__wxHost) : ""
      },
      _isDevTools: function() {
        return /wechatdevtools/.test(window.navigator.userAgent.toLowerCase())
      },
      debounce: function(e, t, n) {
        var i = this;
        this.__debouncers = this.__debouncers || {}, this.__debouncers[e] && clearTimeout(this.__debouncers[e]), this.__debouncers[e] = setTimeout(function() {
          "function" == typeof t && t(), i.__debouncers[e] = void 0
        }, n)
      },
      getRealRoute: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
        return /^wxfile:\/\//.test(e) || /^(http|https):\/\//.test(e) || /^\s*data:image\//.test(e) || (this.ownerShadowRoot ? (e = wx.getRealRoute(this.ownerShadowRoot.__wxHost.is, e), this._isDevTools() && (e = "/" + e)) : !this._isDevTools() && t && (e = wx.getRealRoute(t, e))), e
      }
    }
  }), window.exparser.registerBehavior({
    is: "wx-class-prefix",
    created: function() {
      this._classPrefix = ""
    },
    attached: function() {
      if (this.ownerShadowRoot) {
        var e = this.classList._prefix;
        e && (this._classPrefix = e + "--")
      }
    },
    methods: {
      getClassPrefix: function() {
        return this._classPrefix
      }
    }
  }), window.exparser.registerBehavior({
    is: "wx-data-component",
    properties: {
      name: {
        type: String,
        public: !0
      },
      autoFill: {
        type: String,
        public: !0
      }
    },
    methods: {
      getFormData: function() {
        return this.value || ""
      },
      resetFormData: function() {}
    }
  }), window.exparser.registerBehavior({
    is: "wx-disabled",
    properties: {
      disabled: {
        type: Boolean,
        value: !1,
        public: !0
      }
    }
  }), window.exparser.registerBehavior({
    is: "wx-group",
    listeners: {
      "this.wxItemValueChanged": "_handleItemValueChanged",
      "this.wxItemCheckedChanged": "_handleItemCheckedChanged",
      "this.wxItemAdded": "_handleItemAdded",
      "this.wxItemRemoved": "_handleItemRemoved",
      "this.wxItemChangedByTap": "_handleChangedByTap"
    },
    methods: {
      _handleItemValueChanged: function(e) {
        this.renameItem(e.detail.item, e.detail.newVal, e.detail.oldVal)
      },
      _handleItemCheckedChanged: function(e) {
        this.changed(e.detail.item)
      },
      _handleItemAdded: function(e) {
        return e.detail.item._relatedGroup = this, this.addItem(e.detail.item), !1
      },
      _handleItemRemoved: function(e) {
        return this.removeItem(e.detail.item), !1
      },
      _handleChangedByTap: function() {
        this.triggerEvent("change", {
          value: this.value
        })
      },
      addItem: function() {},
      removeItem: function() {},
      renameItem: function() {},
      changed: function() {},
      resetFormData: function() {
        if (this.hasBehavior("wx-data-component")) {
          ! function e(t) {
            t.childNodes.forEach(function(t) {
              if (t instanceof exparser.Element) {
                if (t instanceof exparser.Component) {
                  if (t.hasBehavior("wx-group")) return;
                  if (t.hasBehavior("wx-item")) return void t.resetFormData()
                }
                e(t)
              }
            })
          }(this)
        }
      }
    }
  }), window.exparser.registerBehavior({
    is: "wx-hover",
    properties: {
      hoverStartTime: {
        type: Number,
        value: 50,
        public: !0
      },
      hoverStayTime: {
        type: Number,
        value: 400,
        public: !0
      },
      hoverClass: {
        type: String,
        value: "",
        public: !0,
        observer: "_hoverClassChange"
      },
      hoverStopPropagation: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "_hoverStopChange"
      },
      hover: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "_hoverChanged"
      }
    },
    created: function() {
      this._hoverClass = []
    },
    attached: function() {
      this.hoverClass && "none" !== this.hoverStyle && "none" !== this.hoverClass && this._hoverClassChange(this.hoverClass)
    },
    detached: function() {
      this.unbindHover()
    },
    methods: {
      isScrolling: function() {
        for (var e = this.$$; e; e = e.parentNode) {
          var t = e.__wxElem || e;
          if (t.__wxScrolling && Date.now() - t.__wxScrolling < 50) return !0
        }
        return !1
      },
      _hoverChanged: function(e) {
        e ? this.bindHover() : this.unbindHover()
      },
      _hoverClassChange: function(e) {
        var t = e.split(/\s/);
        if (this._hoverClass = [], "none" === e && !this.hoverStopPropagation) return void this.unbindHover();
        for (var n = 0; n < t.length; n++) t[n] && this._hoverClass.push(t[n]);
        this.bindHover()
      },
      _hoverStopChange: function(e) {
        if ("none" === e && !this.hoverStopPropagation) return void this.unbindHover();
        this.bindHover()
      },
      bindHover: function() {
        this._bindHover || (this._bindHover = !0, this.addListener("touchstart", this.hoverTouchStart), this.addListener("canceltap", this.hoverCancel), this.addListener("touchcancel", this.hoverCancel), this.addListener("touchend", this.hoverTouchEnd))
      },
      unbindHover: function() {
        this._bindHover && (this._bindHover = !1, this.removeListener("touchstart", this.hoverTouchStart), this.removeListener("canceltap", this.hoverCancel), this.removeListener("touchcancel", this.hoverCancel), this.removeListener("touchend", this.hoverTouchEnd))
      },
      hoverTouchMove: function() {
        this.hoverCancel()
      },
      hoverTouchStart: function(e) {
        var t = this;
        if (!this.isScrolling() && !e._hoverPropagationStopped)
          if (this.hoverStopPropagation && (e._hoverPropagationStopped = !0), this._hoverTouch = !0, "none" === this.hoverStyle || "none" === this.hoverClass || this.disabled);
          else {
            if (e.touches.length > 1) return;
            this._hoverStyleTimeId = setTimeout(function() {
              if (t._hovering = !0, t._hoverClass.length > 0)
                for (var e = 0; e < t._hoverClass.length; e++) t.classList.toggle(t._hoverClass[e], !0);
              t._hoverTouch || window.requestAnimationFrame(function() {
                clearTimeout(t._hoverStayTimeId), t._hoverStayTimeId = setTimeout(function() {
                  t._hoverReset()
                }, t.hoverStayTime)
              })
            }, this.hoverStartTime)
          }
      },
      hoverTouchEnd: function() {
        var e = this;
        this._hoverTouch = !1, this._hovering && window.requestAnimationFrame(function() {
          clearTimeout(e._hoverStayTimeId), e._hoverStayTimeId = setTimeout(function() {
            e._hoverReset()
          }, e.hoverStayTime)
        })
      },
      hoverCancel: function() {
        this._hoverTouch = !1, clearTimeout(this._hoverStyleTimeId), this._hoverStyleTimeId = void 0, this._hoverReset()
      },
      _hoverReset: function() {
        if (this._hovering)
          if (this._hovering = !1, "none" === this.hoverStyle || "none" === this.hoverClass);
          else if (this._hoverClass.length > 0)
          for (var e = 0; e < this._hoverClass.length; e++) this.classList.contains(this._hoverClass[e]) && this.classList.toggle(this._hoverClass[e], !1)
      }
    }
  }), window.exparser.registerBehavior({
    is: "wx-item",
    properties: {
      value: {
        type: String,
        public: !0,
        observer: "valueChange"
      },
      checked: {
        type: Boolean,
        value: !1,
        observer: "checkedChange",
        public: !0
      }
    },
    attached: function() {
      this.triggerEvent("wxItemAdded", {
        item: this
      }, {
        bubbles: !0
      })
    },
    moved: function() {
      this._relatedGroup && (this._relatedGroup.triggerEvent("wxItemRemoved"), this._relatedGroup = null), this.triggerEvent("wxItemAdded", {
        item: this
      }, {
        bubbles: !0
      })
    },
    detached: function() {
      this._relatedGroup && (this._relatedGroup.triggerEvent("wxItemRemoved", {
        item: this
      }), this._relatedGroup = null)
    },
    methods: {
      valueChange: function(e, t) {
        this._relatedGroup && this._relatedGroup.triggerEvent("wxItemValueChanged", {
          item: this,
          newVal: e,
          oldVal: t
        })
      },
      checkedChange: function(e, t) {
        e !== t && this._relatedGroup && this._relatedGroup.triggerEvent("wxItemCheckedChanged", {
          item: this
        })
      },
      changedByTap: function() {
        this._relatedGroup && this._relatedGroup.triggerEvent("wxItemChangedByTap")
      },
      resetFormData: function() {
        this.checked = !1
      }
    }
  }), window.exparser.registerBehavior({
    is: "wx-label-target",
    properties: {},
    methods: {
      handleLabelTap: function(e) {}
    }
  }), window.exparser.registerBehavior({
    is: "wx-mask-behavior",
    properties: {
      mask: {
        type: Boolean,
        value: !1,
        public: !0
      }
    },
    methods: {
      _getMaskStyle: function(e) {
        return e ? "" : "background-color: transparent"
      }
    }
  }),
  function() {
    function e(e) {
      return e instanceof exparser.Component && (e.hasBehavior("wx-map") || e.hasBehavior("wx-video") || e.hasBehavior("wx-canvas") || e.hasBehavior("wx-camera") || e.hasBehavior("wx-live-player") || e.hasBehavior("wx-live-pusher"))
    }

    function t() {
      s && l && (s.removeChild(l), l = null)
    }
    var n = wx.getPlatform(),
      i = "wechatdevtools" === n,
      r = "android" === n,
      o = "ios" === n,
      a = /matrix\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+),\s*([^,]+)\)/;
    if (!i) {
      var s = document.head || document.querySelector("head"),
        l = document.createElement("style");
      l.type = "text/css", l.innerHTML = "wx-cover-view, wx-cover-image { visibility: hidden; }", s && s.appendChild(l)
    }
    window.exparser.registerBehavior({
      is: "wx-native-cover",
      listeners: {
        "this.tap": "handleTap",
        "this.animationstart": "animationStart",
        "this.animationend": "animationEnd"
      },
      created: function() {
        var e = this;
        this._couldInsert = !0, this._isRoot = !1, this._isTotallyRoot = !1, this._observer = exparser.Observer.create(function() {
          e._update()
        }), this._observer.observe(this, {
          childList: !0,
          subtree: !0,
          characterData: !0,
          properties: !0
        }), this.__pageRerender = function() {
          var t = e.updateNativeCoverView.bind(e);
          window.requestAnimationFrame(t)
        }, document.addEventListener("pageReRender", this.__pageRerender), this.__resize = function() {
          window.requestAnimationFrame(function() {
            window.requestAnimationFrame(function() {
              e._detached || e.__pageRerender()
            })
          })
        }, document.addEventListener("CoverViewContainerResize", this.__resize), i || (this.$.container.style.visibility = "hidden", this.$.content.style.visibility = "hidden"), this._args = {}, this._propReseted = !0
      },
      attached: function() {
        var t = this,
          n = this.parentNode;
        if (this.ownerShadowRoot)
          for (; !(n instanceof exparser.Component) && n !== this.ownerShadowRoot; n = n.parentNode);
        else
          for (; n instanceof exparser.VirtualNode; n = n.parentNode);
        n instanceof exparser.Component && !n.hasBehavior("wx-cover-view") ? this._isRoot = !0 : n !== window.__DOMTree__ && n !== this.ownerShadowRoot || (this._isRoot = !0, this._isTotallyRoot = !0);
        for (var r = 0, o = this.childNodes.length; i && r < o; r++) {
          var a = this.childNodes[r];
          a instanceof exparser.Component && !a.hasBehavior("wx-cover-view") && !a.hasBehavior("wx-cover-image") && console.error("<cover-view /> 内只能嵌套 <cover-view /> 和 <cover-image />，" + a.is.replace("wx-", "") + " 标签的子节点树都会被忽略。")
        }
        var s = n,
          l = !1;
        if (this._isRoot) {
          for (; n && !e(n); n = n.parentNode);
          null !== n && (l = !0)
        }
        if (this._underNativeComp = l, i && l && !e(s) && console.error(n.is.replace("wx-", "") + " 标签内只能嵌套 <cover-view /> 和 <cover-image />。"), i || !this._isRoot || l || (this._update(), this.insertNativeCoverView(0, n, "bubble", !0, function(e) {
            t.findCoverView(e, !1)
          })), i) {
          "hidden" !== window.getComputedStyle(this.$$).overflow && console.warn("For developer:cover-view 暂不支持 overflow 样式。")
        }
      },
      detached: function() {
        document.removeEventListener("CoverViewContainerResize", this.__resize), document.removeEventListener("pageReRender", this.__pageRerender), this._detached = !0
      },
      methods: {
        insertNativeCoverView: function(e, n, i, r, o) {
          if (this.isParentInsert2WebLayer) return this.$.container.style.visibility = "", this.$.content.style.visibility = "", t(), document.removeEventListener("CoverViewContainerResize", this.__resize), document.removeEventListener("pageReRender", this.__pageRerender), this._update(), void("function" == typeof o && o(0));
          if ("number" != typeof e || this._viewId || !this._couldInsert) return void(this._couldInsert && this._viewId && "function" == typeof o && o(this._viewId));
          var a = window.getComputedStyle(this.$$);
          this._parentNode = n, this._isRoot = r, this._box = this.getCoverViewBox(a);
          var s = this.getPositioningId(),
            l = {
              parentId: e,
              viewId: s,
              position: this._box,
              style: this.getContainerStyle(a),
              clickable: !0,
              transEvt: !1,
              sendTo: "webview",
              data: JSON.stringify({
                target: {
                  id: this.id,
                  offsetLeft: this.$$.offsetLeft,
                  offsetTop: this.$$.offsetTop,
                  dataset: this.dataset
                },
                bindtap: this.bindtap,
                viewId: s
              })
            };
          this.insert(l, o)
        },
        updateNativeCoverView: function() {
          if (this._viewId) {
            var e = window.getComputedStyle(this.$$),
              t = this.getCoverViewBox(e);
            if (this.animateCoverView(e), !(0 !== this._box.width && 0 !== this._box.height || 0 !== t.width && 0 !== t.height)) return void(this._box = t);
            this._box = t;
            var n = {
              position: this._box,
              style: this.getContainerStyle(e),
              viewId: this._viewId
            };
            this.update(n)
          }
        },
        animateCoverView: function(e) {
          var t = this,
            n = parseFloat(e.transitionDuration || e.webkitTransitionDuration),
            i = e.transitionProperty || e.webkitTransitionProperty;
          if (!n || !(/all/.test(i) || /opacity/.test(i) || /transform/.test(i) || /-webkit-transform/.test(i))) {
            var r = this.getTranslate(e);
            return this._lastX = r.x, this._lastY = r.y, void(this._lastOpacity = parseFloat(e.opacity))
          }
          setTimeout(function() {
            t._animateCoverView(n, i)
          }, 0)
        },
        _animateCoverView: function(e, t) {
          var n = this,
            i = this.$$.style.transitionProperty || this.$$.style.webkitTransitionProperty || "";
          this.$$.style.setProperty("transition-property", "none", "important"), this.$$.style.setProperty("-webkit-transition-property", "none", "important"), this._propReseted && (window.requestAnimationFrame(function() {
            n.$$.style.webkitTransitionProperty = "none", n.$$.style.transitionProperty = "none", n.$$.style.webkitTransitionProperty = i, n.$$.style.transitionProperty = i, n._propReseted = !0
          }), this._propReseted = !1);
          var r = window.getComputedStyle(this.$$),
            a = this.getTranslate(r),
            s = parseFloat(r.opacity),
            l = {
              opacity: s
            },
            c = this._box.top - this._lastY + a.y,
            u = this._box.left - this._lastX + a.x;
          !(o && this.parentNode instanceof exparser.Component && this.parentNode.hasBehavior("wx-native")) || this._isRoot && window.__isFullScreen || (c -= this.parentNode._box.top, u -= this.parentNode._box.left);
          var d = !1;
          s !== this._lastOpacity && (/all/.test(t) || /opacity/.test(t)) && (d = !0), a.y !== this._lastY && (/all/.test(t) || /transform/.test(t) || /-webkit-transform/.test(t)) && (l.top = c, d = !0), a.x !== this._lastX && (/all/.test(t) || /transform/.test(t) || /-webkit-transform/.test(t)) && (l.left = u, d = !0), this._lastOpacity = s, this._lastX = a.x, this._lastY = a.y, d && (this._isAnimating = !0, wx.invoke("animateCoverView", {
            viewId: this._viewId,
            finalStyle: l,
            duration: 1e3 * e,
            easing: r.transitionTimingFunction
          }, function(t) {
            n._isAnimating = !1, void 0 !== l.opacity && (n._args.style.opacity = l.opacity), void 0 !== l.top && (n._args.position.top = l.top), void 0 !== l.left && (n._args.position.left = l.left), n.triggerEvent("transitionend", {
              elapsedTime: e
            })
          }))
        },
        getCoverViewBox: function(e) {
          "inline" === e.display && (this.$$.style.display = "inline-block");
          var t = this._getBox(e, !0),
            n = this._parentNode;
          if (r && n instanceof exparser.Component && (!this._isRoot || !window.__isFullScreen)) {
            var i = n._getBox(null, !0);
            t.top -= i.top, t.left -= i.left
          }
          return window.__isFullScreen && this._isRoot && (t.top -= window.scrollY), t
        },
        getContainerStyle: function(e) {
          var t = parseFloat(e.borderRadius) || 0;
          if (/%$/.test(e.borderRadius)) {
            var n = t / 100;
            t = Math.min(this._box.width * n / 2, this._box.height * n / 2)
          } else this._isiOS() && (t = Math.min(this._box.width / 2, this._box.height / 2, t));
          var i = parseFloat(e.opacity);
          if (void 0 === this._lastOpacity && (this._lastOpacity = i), void 0 === this._lastX || void 0 === this._lastY) {
            var r = this.getTranslate(e);
            this._lastX = r.x, this._lastY = r.y
          }
          var o = parseFloat(e.paddingTop) || 0,
            a = parseFloat(e.paddingRight) || 0,
            s = parseFloat(e.paddingBottom) || 0,
            l = parseFloat(e.paddingLeft) || 0,
            c = "wx-cover-image" === this.is || this._content ? [o, a, s, l] : [0, 0, 0, 0];
          return "hidden" !== e.overflow && console.warn("cover-view 暂不支持 overflow 样式。"), {
            bgColor: this.getHexColor(e.backgroundColor),
            borderRadius: t,
            borderWidth: parseFloat(e.borderWidth) || 0,
            borderColor: this.getHexColor(e.borderColor) || "#00000000",
            padding: c,
            opacity: i,
            overflow: "hidden"
          }
        },
        getHexColor: function(e) {
          var t = e.match(/rgba?\((\s*\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*(\d+(\.\d+)?)\s*)?\)/);
          if (!t) return "";
          var n = isNaN(Number(t[5])) ? 1 : Number(t[5]);
          return "#" + ("0" + Number(t[1]).toString(16)).slice(-2) + ("0" + Number(t[2]).toString(16)).slice(-2) + ("0" + Number(t[3]).toString(16)).slice(-2) + ("0" + (255 * n | 0).toString(16)).slice(-2)
        },
        getTranslate: function(e) {
          var t = e.transform || e.webkitTransform,
            n = t && t.match(a) || ["", 0, 0, 0, 0, 0, 0],
            i = Number(n[5]),
            r = Number(n[6]);
          return {
            x: i || 0,
            y: r || 0
          }
        },
        diff: function(e, t) {
          for (var n = Object.keys(e), i = [], r = 0; r < n.length; r++) {
            var o = n[r];
            if ("[object Object]" === Object.prototype.toString.call(e[o])) {
              if ("position" === o && this._isAnimating) continue;
              t && !this.diff(e[o], t[o]) || i.push(o)
            } else "[object Array]" === Object.prototype.toString.call(e[o]) ? t && JSON.stringify(e[o]) === JSON.stringify(t[o]) || i.push(o) : t && e[o] === t[o] || i.push(o)
          }
          return i.length ? i : null
        },
        handleCoverViewTap: function(e) {
          if (e.data.viewId === this._viewId) {
            var t = new CustomEvent("tap", {
              bubbles: !0,
              cancelable: !0
            });
            exparser.triggerEvent(this.$$, "tap", {
              x: this._box.left,
              y: this._box.top
            }, {
              originalEvent: t,
              bubbles: !0,
              capturePhase: !1,
              composed: !0,
              extraFields: {}
            })
          }
        },
        handleTap: function(e) {
          function t(e) {
            return {
              id: e.id,
              offsetLeft: e.$$.offsetLeft,
              offsetTop: e.$$.offsetTop,
              dataset: e.dataset
            }
          }
          var n = this;
          if ([this.catchtap, this.bindtap].forEach(function(i) {
              i && window.wx.publishPageEvent(i, {
                type: e.type,
                timeStamp: e.timeStamp,
                target: t(e.target),
                currentTarget: t(n),
                detail: e.detail,
                touches: null,
                changedTouches: null
              }, n.getNodeId())
            }), this.catchtap || this._underNativeComp && this._isRoot) return !1
        },
        animationUpdate: function() {
          var e = this;
          this.isParentInsert2WebLayer || (this.updateNativeCoverView(), this.raf = window.requestAnimationFrame(function() {
            e.animationUpdate()
          }))
        },
        animationStart: function() {
          var e = this;
          i || this.isParentInsert2WebLayer || (this.raf = window.requestAnimationFrame(function() {
            e.animationUpdate()
          }))
        },
        animationEnd: function() {
          if (i || this.isParentInsert2WebLayer) return void window.cancelAnimationFrame(this.raf);
          window.cancelAnimationFrame(this.raf)
        }
      }
    })
  }(),
  function() {
    var e = 1e4;
    window.exparser.registerBehavior({
      is: "wx-native",
      properties: {
        hidden: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "hiddenChanged"
        },
        eventModel: {
          type: String,
          value: "no-bubble",
          public: !0
        },
        _isReady: {
          type: Boolean,
          value: !1
        },
        _deferred: {
          type: Array,
          value: []
        },
        _isError: {
          type: Boolean,
          value: !1
        },
        _box: {
          type: Object,
          value: {
            left: 0,
            top: 0,
            width: 0,
            height: 0
          }
        }
      },
      created: function() {
        this.__containerId = e++
      },
      methods: {
        _isiOS: function() {
          var e = window.navigator.userAgent.toLowerCase();
          return !/wechatdevtools/.test(e) && /iphone/.test(e)
        },
        _isAndroid: function() {
          var e = window.navigator.userAgent.toLowerCase();
          return !/wechatdevtools/.test(e) && /android/.test(e)
        },
        _isMobile: function() {
          return this._isiOS() || this._isAndroid()
        },
        _getBox: function(e, t) {
          var n = this.$$.getBoundingClientRect(),
            i = {
              left: n.left + window.scrollX,
              top: n.top + window.scrollY,
              width: this.$$.offsetWidth,
              height: this.$$.offsetHeight
            };
          if (t) return i;
          var r = e || window.getComputedStyle(this.$$),
            o = parseFloat(r.getPropertyValue("border-top-width")) || 0,
            a = parseFloat(r.getPropertyValue("border-bottom-width")) || 0,
            s = parseFloat(r.getPropertyValue("border-left-width")) || 0,
            l = parseFloat(r.getPropertyValue("border-right-width")) || 0;
          return i.left += s, i.top += o, i.width -= s + l, i.height -= o + a, i
        },
        _diff: function() {
          var e = this._getBox();
          for (var t in e)
            if (e[t] !== this._box[t]) return e;
          return !1
        },
        _ready: function() {
          this._isReady = !0, this._deferred.forEach(function(e) {
            this[e.callback].apply(this, e.args)
          }, this), this._deferred = []
        },
        hiddenChanged: function(e, t) {
          if (!this._isError) return this._isReady ? void this._hiddenChanged(e, t) : void this._deferred.push({
            callback: "hiddenChanged",
            args: [e, t]
          })
        },
        _pageReRenderCallback: function() {
          var e = this;
          if (!this._isError) {
            var t = this;
            window.requestAnimationFrame(function() {
              var n = e._diff();
              n && (t._box = n, t._updatePosition())
            })
          }
        },
        _findCoverView: function(e, t) {
          var n = this;
          ! function e(t, i, r, o) {
            for (var a = 0; a < t.childNodes.length; a++) ! function() {
              var s = t.childNodes[a];
              s instanceof exparser.Element && (s instanceof exparser.Component ? s.hasBehavior("wx-cover-view") || s.hasBehavior("wx-cover-image") ? (s.isParentInsert2WebLayer = n._isiOS() && n._insert2WebLayer, s.insertNativeCoverView(i, r, n.eventModel, o, function(t) {
                e(s, t, s)
              })) : s.hasBehavior("wx-ad") || (o ? console.error(t.is.replace("wx-", "") + " 标签内只能嵌套 <cover-view /> 和 <cover-image />") : console.error("<cover-view /> 内只能嵌套 <cover-view /> 和 <cover-image />，" + s.is.replace("wx-", "") + " 标签的子节点树都会被忽略。")) : e(s, i, r, o))
            }()
          }(this, e, this, t)
        },
        _pageReRenderForCoverView: function(e) {
          var t = this;
          this._coverViewUpdated && window.requestAnimationFrame(function() {
            t._findCoverView(e)
          }), this._coverViewUpdated = !1
        },
        findCoverView: function(e) {
          var t = this,
            n = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          this._findCoverView(e, n), this._observerCoverView = exparser.Observer.create(function() {
            t._coverViewUpdated = !0
          }), this._observerCoverView.observe(this, {
            childList: !0,
            subtree: !0
          }), this.__pageReRenderForCoverView = this._pageReRenderForCoverView.bind(this, e), document.addEventListener("pageReRender", this.__pageReRenderForCoverView)
        },
        insertNativeView: function(e, t, n) {
          this._isAndroid(), wx.invoke(e, t, n)
        },
        updateNativeView: function(e, t, n) {
          this._isAndroid(), wx.invoke(e, t, n)
        },
        removeNativeView: function(e, t, n) {
          wx.invoke(e, t, n), this._isAndroid() && wx.invoke("removeContainer", {
            containerId: this.__containerId
          })
        }
      }
    })
  }(),
  function() {
    var e = [],
      t = window.screen && window.screen.width || window.innerWidth,
      n = window.screen && window.screen.height || window.innerHeight;
    wx.getSystemInfo({
      success: function(e) {
        t = e.screenWidth, n = e.screenHeight
      }
    }), wx.subscribe("videoFullScreenChange", function(t) {
      window.__isFullScreen = t.fullScreen, e.forEach(function(e) {
        e(t)
      })
    }), window.exparser.registerBehavior({
      is: "wx-player",
      properties: {
        src: {
          type: String,
          observer: "_srcChanged",
          public: !0
        },
        poster: {
          type: String,
          observer: "_posterChanged",
          public: !0
        },
        playing: {
          type: Boolean,
          value: !1
        },
        _buttonType: {
          type: String,
          value: "play"
        },
        _currentTime: {
          type: String,
          value: "00:00"
        },
        _duration: {
          type: String,
          value: "00:00"
        },
        _isLive: {
          type: Boolean,
          value: !1
        },
        isBackground: {
          type: Boolean,
          value: !1
        },
        stopped: {
          type: Boolean,
          value: !0
        },
        paused: {
          type: Boolean,
          value: !0
        }
      },
      methods: {
        _formatTime: function(e) {
          if (e === 1 / 0) return "00:00";
          var t = Math.floor(e / 3600),
            n = Math.floor((e - 3600 * t) / 60),
            i = e - 3600 * t - 60 * n;
          return 0 == t ? (n >= 10 ? n : "0" + n) + ":" + (i >= 10 ? i : "0" + i) : (t >= 10 ? t : "0" + t) + ":" + (n >= 10 ? n : "0" + n) + ":" + (i >= 10 ? i : "0" + i)
        },
        _publish: function(e, t) {
          this.triggerEvent(e, t)
        },
        _updatePosition: function() {
          ["wx-video", "wx-live-player"].indexOf(this.is) > -1 && window.__isFullScreen && (this._box = {
            top: 0,
            left: 0
          }, "vertical" === this._direction ? (this._box.width = t, this._box.height = n) : (this._box.width = n, this._box.height = t)), this._update({
            position: this._box
          })
        },
        toggleFullscreen: function(e) {
          var i = this;
          if ("function" == typeof this._canToggleFullscreen && this._canToggleFullscreen(e)) {
            var r = this.$.coverviewcontainer;
            e.fullScreen ? (r.style.position = "fixed", r.style.zIndex = 100000001, 0 === e.direction || "vertical" === e.direction ? (r.style.height = n + "px", this._direction = "vertical") : (r.style.height = t + "px", this._direction = "horizontal"), this._updatePosition()) : (r.style.position = "absolute", r.style.zIndex = 1, r.style.height = "100%", window.requestAnimationFrame(function() {
              i._box = i._getBox(), i._updatePosition()
            })), document.dispatchEvent(new CustomEvent("CoverViewContainerResize", {}))
          }
        }
      },
      created: function() {
        this.__toggleFullscreen = this.toggleFullscreen.bind(this), e.push(this.__toggleFullscreen)
      },
      attached: function() {
        var e = this;
        if (this.$.player) {
          var t = this.$.player.$$ || this.$.player,
            n = this,
            i = {};
          for (var r in MediaError) i[MediaError[r]] = r;
          t.onerror = function(e) {
            if (e.stopPropagation(), e.srcElement.error) {
              var t = e.srcElement.error.code;
              n._publish("error", {
                errMsg: i[t]
              })
            }
          }, t.onplay = function(e) {
            n.playing = !0, e.stopPropagation(), n._publish("play", {}), n._buttonType = "pause", "function" == typeof n.onPlay && n.onPlay(e), n.paused = !1
          }, t.onpause = function(e) {
            n.playing = !1, e.stopPropagation(), n._publish("pause", {}), n._buttonType = "play", "function" == typeof n.onPause && n.onPause(e), n.paused = !0
          }, t.onended = function(e) {
            n.playing = !1, e.stopPropagation(), n._publish("ended", {}), "function" == typeof n.onEnded && n.onEnded(e)
          }, "AUDIO" == t.tagName && (t.onratechange = function(e) {
            e.stopPropagation(), n._publish("ratechange", {
              playbackRate: t.playbackRate
            })
          });
          var o = 0;
          t.addEventListener("timeupdate", function(e) {
            e.stopPropagation(), Math.abs(t.currentTime - o) % t.duration >= 1 && (n._publish("timeupdate", {
              currentTime: t.currentTime,
              duration: t.duration
            }), o = 1e3 * t.currentTime), n._isLockTimeUpdateProgress || (n._currentTime = n._formatTime(Math.floor(t.currentTime))), "function" == typeof n.onTimeUpdate && n.onTimeUpdate(e)
          }), t.addEventListener("durationchange", function() {
            t.duration === 1 / 0 ? e._isLive = !0 : e._isLive = !1, NaN !== t.duration && 0 === e.duration && (n._duration = n._formatTime(Math.floor(t.duration)))
          })
        }
      },
      detached: function() {
        var t = e.indexOf(this.__toggleFullscreen);
        t > -1 && e.splice(t, 1)
      }
    })
  }(),
  function() {
    var e = 1;
    window.exparser.registerBehavior({
      is: "wx-positioning-target",
      created: function() {
        this._positioningId = e++, this._parentPositioningContainer = null, this._positioningSyncing = !1
      },
      detached: function() {
        this._positioningId = e++
      },
      methods: {
        _requestPositioningContainer: function() {
          this.triggerEvent("wxAddPositionTracker", {
            element: this
          }, {
            bubbles: !0,
            composed: !0
          })
        },
        trackPositionInDocument: function() {
          this._positioningSyncing || (this._positioningSyncing = !0, this._parentPositioningContainer = document)
        },
        trackPositionInContainer: function(e) {
          this._positioningSyncing || (this._positioningSyncing = !0, this._parentPositioningContainer = e)
        },
        getPositioningOffset: function() {
          var e = this.$$.getBoundingClientRect();
          if (this._parentPositioningContainer === document) return {
            left: e.left + window.scrollX,
            top: e.top + window.scrollY,
            width: this.$$.offsetWidth,
            height: this.$$.offsetHeight
          };
          var t = this._parentPositioningContainer.$$.getBoundingClientRect();
          return {
            left: e.left - t.left,
            top: e.top - t.top,
            width: this.$$.offsetWidth,
            height: this.$$.offsetHeight
          }
        },
        fetchPositioningParentId: function() {
          return 0
        },
        getPositioningId: function() {
          return this._positioningId
        }
      }
    }), window.exparser.registerBehavior({
      is: "wx-positioning-container",
      behaviors: ["wx-positioning-target"],
      attached: function() {
        var e = this;
        document.addEventListener("pageReRender", function() {
          if (e._positioningSyncing) {
            var t = e.getPositioningOffset(),
              n = e.getScrollPosition(),
              i = n.scrollLeft,
              r = n.scrollTop;
            e._sendContainerUpdate(i, r, t)
          }
        })
      },
      detached: function() {
        this._positioningSyncing && this._sendContainerRemoval()
      },
      listeners: {
        "this.wxAddPositionTracker": "_addPositionTracker"
      },
      methods: {
        _addPositionTracker: function(e) {
          if (e.target !== this) return this._positioningSyncing || (this._requestPositioningContainer(), this._positioningSyncing || this.trackPositionInDocument()), e.detail.element.trackPositionInContainer(this), !1
        },
        trackPositionInDocument: function() {
          this._positioningSyncing || (this._positioningSyncing = !0, this._parentPositioningContainer = document, this._initPositioningContainer())
        },
        trackPositionInContainer: function(e) {
          this._positioningSyncing || (this._positioningSyncing = !0, this._parentPositioningContainer = e, this._initPositioningContainer())
        },
        _initPositioningContainer: function() {
          var e = this.getPositioningOffset(),
            t = this.getScrollPosition(),
            n = t.scrollLeft,
            i = t.scrollTop;
          this._sendContainerCreation(n, i, e)
        },
        _sendContainerCreation: function(e, t, n) {
          this._positioningId, this._parentPositioningContainer === document || this._parentPositioningContainer._positioningId
        },
        _sendContainerUpdate: function(e, t, n) {
          this._positioningId
        },
        _sendContainerRemoval: function() {},
        getScrollPosition: function() {
          return {
            scrollLeft: 0,
            scrollTop: 0
          }
        },
        updateScrollPosition: function(e) {
          if (this._positioningSyncing) {
            var t = this.getScrollPosition(),
              n = t.scrollLeft,
              i = t.scrollTop;
            return !(!e && this._prevScrollLeft === n && this._prevScrollTop === i) && (this._prevScrollLeft = n, this._prevScrollTop = i, this._sendContainerUpdate(n, i, e), !0)
          }
        }
      }
    })
  }(), window.exparser.registerBehavior({
    is: "wx://form-field",
    properties: {
      name: {
        type: String,
        public: !0
      },
      value: {
        type: null,
        public: !0
      }
    }
  }),
  function() {
    function e() {
      if (!p) {
        var e;
        e = f ? window.atob("UklGRl4RAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToRAAABAAAAAgD9/wQA9f88ACIA3P/M/63/kP+p/xIAFAAfABYAIQAfACAAIgAdACMAFwAiAAsALAAr/yf+T/5V/nv+jf6y/s3+7f4U/yv/kP8+Ac4BxAHUAcgBzAG1AbkBlQGcAV4BgAH7/2n+mf6c/sr+2f76/hP/Lf9P/2X/jv+b/8b/yv+CADsCiAJlAlICLgIRAuoBwQGZAR0A/f0a/dT9o/7d/gD/DP8p/zX/UP9k/3v/j//x/54BKAL/AfABzAGyAYwBawE/ARoB6ADAAJQAYAAE/679Ev31/E79DP4u/mz+2P4lANsAyQDQALwAtwCkAJsAjAB8AGgAWQBGADQAJQAOAPb/y/7u/er99f0b/kP+Zf6Z/sH+CP91/1wAKgExAUEBNwE8ATEBKwEgAQ4B8ADn/y3/CP8M/x3/Nf9I/2T/dv+N/6f/uf/V/+b/AAAcAEoAkgAEAZYB+wEEAuYBuwEgAX8ADADB/5v/e/9y/2v/c/99/4r/mf+q/8T/6v86ANsAjgGWAXoBYgFDASEBBQHdAL8AmAB2AE4AMwAHAPD/wv+o/1b/Iv8M/zb/Sf9E/zv/M/8n/yj/Gv8h/xX/Hf8Z/x3/JP8i/zL/MP8+/0P/S/85/9T+of6V/qb+wv7r/hb/UP+I/8v/FABdAKcA4QADARABFgH/ANEAnwBzAFIAPgA0ADIANgA8AEYATgBYAGIAbAB0AIIAiQCZAKkAuQDTAOYA+gAKAQ4BBgH1ANUAswCKAGQAQQAfAAsA8v/r/+H/4//t//7/HgBIAIIAnwCLAHYAXwBCAC8AEAD7/+T//v8DAP3/AgD+/wIA/v8CAP7/AQAAAAAAAAAAAP//AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8CAP3/AwD+/wIA/f8DAP3/AgAAAP//AQD//wAAAQAAAP//AQD+/wMA/f8DAP3/AgD//wAAAQD+/wMA/f8DAP7/AAABAAAA//8BAP//AAACAP3/AgD/////AwD8/wQA/P8EAPz/BAD8/wMA/v8CAP//AAAAAP//AgD//wAAAAAAAP//AwD8/wQA/f8BAAAA//8CAP//AAD//wEA//8CAP7/AQD//wIA/f8EAPv/BAD/////AgD+/wEA//8CAP7/AgD+/wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8CAP7/AwD9/wIA//8AAAEA//8BAP//AQD//wEA//8CAP3/AwD+/wEA//8CAP3/BAD8/wMA/v8BAAAAAAD//wIA/f8DAP7/AAACAP3/AwD9/wIA//8BAP//AQAAAP7/BAD7/wYA+v8FAPz/BAD8/wMA/v8BAAAAAAD+/wQA/P8DAP7/AQAAAAAAAQD+/wEAAQD9/wUA+/8DAP////8DAP3/AgD+/wEAAQD//wAAAQD9/wQA/f8BAAEA/v8BAAAAAAAAAAAA//8BAAAAAAD//wEAAAD//wIA/f8DAP7/AgD+/wEAAAAAAAAAAAD//wIA/v8CAP7/AgD+/wIA//8AAAAAAQD//wAAAQD+/wIA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wIA/v8BAAAA//8BAP//AQD//wEA//8AAAEA/v8CAP//AAABAP7/AgD//wAAAQD//wEA//8BAP//AQAAAP7/BAD7/wUA/P8CAP//AAABAP//AAAAAAAAAAABAP7/AgD+/wIA/v8CAP7/AgD+/wIA/f8EAPz/AwD/////AgD/////AgD+/wEAAAAAAAAA//8CAP3/BAD8/wMA/v8CAP3/BAD8/wMA/////wEAAAAAAP//AgD9/wQA/P8DAP7/AgD+/wIA/v8BAAEA/f8DAP7/AAABAP7/AgD+/wIA//8AAAEA/v8DAP7/AAABAAAA//8DAPv/BQD8/wIAAAAAAAAAAAD//wEAAAD//wEAAAD//wIA/f8DAP7/AQAAAAAA//8CAP7/AQAAAP//AgD+/wEAAAAAAAAAAAD//wIA/v8CAP7/AQABAP7/AQAAAP//AwD9/wIA/v8CAP7/AwD9/wIA/////wMA/P8EAP3/AQABAP7/AgAAAP//AAABAP//AQAAAP//AQAAAP//AQD//wIA/f8EAPv/BQD9/wEAAAAAAAAAAQD+/wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8CAP//AAABAP//AAACAPz/BgD5/wYA/f8AAAIA/f8DAP7/AQAAAP//AgD9/wMA/v8BAAAA/v8DAP3/AwD9/wIA//8AAAAAAAABAP//AAABAP3/BQD7/wQA/f8CAP7/AwD9/wIA//8AAAEA//8BAP//AQD//wIA/f8CAP//AAABAAAA/v8DAPz/AwD//wAAAQD+/wIA/v8CAP7/AgD+/wMA/P8EAP3/AgD//wAAAQD//wEA//8BAP7/AwD8/wUA/P8CAP//AAACAP3/AwD9/wMA/v8BAP//AQD//wEA//8BAAAA//8BAP//AgD+/wIA/v8BAAEA/v8CAP7/AQABAP7/AgD/////AgD+/wIA//8AAP//AwD9/wIA/////wIA//8BAP//AAABAP//AAABAP7/AwD9/wIA/v8CAP//AAABAP//AAAAAAEA//8BAP7/AgD+/wMA/f8CAP7/AgD+/wMA/P8EAPz/BAD8/wMA//8AAAEA/f8DAP7/AwD8/wQA+/8FAP3/AQAAAAAAAAAAAAAA//8CAP7/AgD+/wIA/v8CAP3/AwD//wAAAAD//wEAAAAAAP//AgD+/wIA/v8CAP7/AgD//wAAAQD+/wIA/v8CAP7/AgD+/wEAAQD9/wQA/P8DAP7/AgD+/wEAAAAAAAAAAQD+/wIA/v8CAP//AQD+/wIA/v8CAP//AAAAAAEA/v8DAPz/BAD9/wIA//8AAAAAAQD+/wMA/f8CAP//AAABAAAA/v8DAP3/AgAAAP7/AwD9/wIA//8BAP//AQD+/wMA/f8DAP3/AgAAAP//AQD//wEA//8BAAAA/v8DAPz/BAD9/wIA//8AAAAAAAAAAAAAAQD+/wIA//8AAAAAAQD+/wMA/f8CAP//AAABAP//AQD//wAAAQD//wIA/f8DAP7/AQAAAAAA//8CAP7/AgD+/wEAAAAAAAAAAAAAAAAA//8CAP7/AwD8/wMA/v8CAP//AAAAAP//AgD+/wIA/////wIA/f8DAP7/AgD+/wEA//8CAP3/AwD+/wIA/v8BAP//AgD+/wEAAAD//wEAAAD//wEAAAD//wEAAAD//wEA//8BAAAAAAD//wIA/v8BAAEA/f8EAP3/AQAAAAAA//8CAP7/AgD+/wIA/f8EAPz/AwD//wAAAAAAAP//AQABAP7/AgD+/wEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8CAP7/AgD+/wEAAAD//wIA/v8BAAAA//8CAP7/AQAAAAAAAAAAAP//AgD/////AgD9/wMA/v8BAAAA//8BAAAA//8BAAAA//8CAP7/AQAAAAAAAAD//wIA/v8CAP7/AgD+/wIA/v8CAP//AQD+/wIA/v8DAP3/AgD+/wIA/v8CAP7/AgD//wAAAQD9/wUA+/8EAP3/AQAAAAAAAAAAAP//AgD+/wIA/////wMA/f8CAP//AAABAP//AAABAP//AAABAP7/AwD9/wIA/v8DAPz/BQD6/wYA+/8EAP3/AQABAP7/AgD+/wEAAAAAAP//AgD9/wMA/v8BAAAA//8BAAAAAAAAAAAAAAD//wIA/v8CAP////8CAP7/AQAAAP//AQD//wEAAAD//wEA//8BAP//AgD+/wEA//8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD//wEAAAD//wIA/v8AAAMA+/8FAPz/AwD/////AgD9/wQA/P8EAPz/AwD+/wIA//8AAAAAAAAAAAEA/v8DAPz/BAD9/wIA//8AAAAAAQD//wAAAAAAAAAAAQD//wAAAAAAAAAAAAABAP7/AgD/////AgD+/wIA//8AAAAAAAAAAAEA//8AAAEA/v8DAP7/AQD//wEA//8CAP3/AwD9/wMA/v8AAAEA/v8DAP3/AgD//wAAAQD+/wMA/P8FAPz/AgAAAP7/AwD+/wEAAAD//wEA//8BAP//AQD//wAAAAABAP//AQD+/wIA/v8CAP//AAAAAP//AQAAAAAAAAD//wEAAAAAAAEA/v8CAP7/AgD//wEA/v8DAPz/BQD7/wQA/f8CAP//AAABAP//AQD//wAAAQD//wEAAAD+/wMA/f8DAP7/AAACAP3/AwD///7/BAD8/wQA/P8EAPz/AwD/////AgD+/wEAAAAAAAAAAAAAAP//AwD9/wMA/P8EAPz/BQD8/wIA//8AAAEA//8BAP//AQD//wAAAAABAP//AQD+/wIA/v8DAP3/AgD//wAAAgD9/wMA/f8DAP3/AwD+/wEAAAD//wEA//8BAP//AQD//wEA//8AAAAAAAABAP//AAAAAAAAAQD//wAAAQD+/wIA//8AAAEA/v8CAP//AAAAAAEA/v8DAP3/AgAAAP7/AwD9/wMA/v8BAP//AQD//wEAAAD//wEA//8BAP//AQD//wEA//8BAP//AQD//wEA//8CAP7/AgD9/wMA//8BAP//AAAAAAEAAAD//wAAAQD//wEA//8BAP7/AwD9/wIAAAD+/wMA/f8CAP//AQD//wAAAQD//wEAAAD//wEAAAD//wIA/v8BAP//AQAAAAAA//8BAP7/BAD8/wMA/f8DAP7/AgD+/wEAAAAAAAEA/v8DAP3/AgD+/wIA//8BAP7/AQAAAAAA//8CAP3/AwD+/wEAAAAAAP//AgD9/wQA/P8DAP7/AQD//wEA//8BAP7/AwD9/wIA//8AAAAAAQD+/wIA/v8CAP7/AwD8/wMA//8AAAEA/v8BAAEA/v8CAP7/AQAAAAAAAAAAAAAAAAAAAAAAAAAAAAEA/v8DAPz/AwD+/wIA//8AAP//AQAAAP//AgD9/wMA/v8BAAAA//8BAAAA//8BAP//AQD//wIA/f8DAP3/AwD+/wEAAAD//wEA//8AAAIA/P8FAPv/AwD/////AwD9/wEAAQD+/wIA/////wMA/f8CAP//AAAAAAEA/v8DAP3/AgD//wAAAAABAP//AAAAAP//AwD8/wQA/P8DAP7/AQAAAAAA//8BAP//AQABAP7/AQAAAP//AwD9/wIA//8AAAEA//8BAP//AQD//wEAAAD//wEA//8BAP//AQD//wEA//8BAP//AQAAAP7/BAD8/wMA/v8BAP//AgD+/wIA/v8CAP////8DAPz/BAD+////AgD/////AgD+/wEAAQD+/wEA//8CAP7/AgD9/wMA/f8DAP7/AQAAAP//AAABAP//AQD//wEA//8BAP//AQD//wEAAAD//wIA/v8BAP//AQAAAAAAAAAAAP//AgD+/wIA/v8CAP7/AgD//wAAAAABAP7/AwD9/wIA//8AAAAAAQD+/wIA/v8CAP7/AQAAAAAAAAD//wIA/f8EAPz/AwD+/wIA/f8DAP////8CAP7/AQABAP3/AwD+/wEAAQD9/wMA/v8BAAAAAAD//wIA/////wIA/f8DAP////8BAP//AAACAP3/AgD//wAAAQD//wEA//8BAP//AQD//wEAAAAAAAAA//8BAAAAAAAAAAAA//8CAP7/AQABAP3/AwD+/wIA/v8BAP//AAACAP3/AwD+/wAAAgD8/wYA+v8FAPz/AwD//wAAAAAAAAAAAQD+/wMA/P8EAP3/AQACAPz/AwD/////AwD9/wEAAQD+/wIA//8AAAEA/v8DAPz/BAD8/wQA/P8FAPr/BQD9/wEAAQD+/wIA//8AAAAAAAABAP//AQA=") : window.atob("UklGRl4RAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YToRAAAPAPX/IQDT/z0AgP9mAkgBnf72/b/8qPuZ/KwA1gAXAQUBJgFNATYBWwEeAWEB2ABpAVwAxAGn94ftHO9P78DwmPHi8g/0SfWq9tT3hvtxDBoSjxFgEsAR/REWETQR1g8REL0N8g7f/wHwDvIS8uXzfvTC9bH21vcC+Qb6evsg/KP9/v3/BGAWQhn4FzMXzxWoFCUTiRH5DyIB7ev04lzqQfLB9OX1jvaF9xv4Ivnl+dH6hvt+/xwQoRXmE2kT7hH/EHUPKQ6CDO4KIAmFB7oFyAMn9srouuKT4fXkn+yx7UTwbvRsAZUI2wcbCFoHKgdgBhQGbwXeBBkEaQPGAgUCdwGIAKH/5/NY6x7riesp7XfuJPDM8aLzUfZ++r0DegsMDG4MQwxDDPQLqgs6C6MKRQkf/6H3dPZW9j/38/f2+MD5svqA+3b8Vv05/gj///8fAdgCuwUsCtAP6RMBFCETMRFWC+0EdgCU/ff76vpi+jX6fvrb+m777fu3/I39S/8cAqQIjA/ND9oOxw2ZDGALEArFCGAH/wWHBC0D0gF2AC//yP1f/I75Fveu9v736vig+E/48vem92T3OfcS9wb39vYP9yb3UPeC98H3A/hd+Jf4Avki+GD0NfLj8WvyoPMf9fj2BPlb++79xQCsA38GywgZCqgK2Ar3CSoINAZ9BDcDawIHAvcBGAJdArMCDwN1A9EDNQSWBPcEdAXuBZcGTgclCAUJzAlcCowKRAqFCV8I8QZrBecDgQJOAUwAlf8T/9j+4f48//H/JgHQAh4FKgZ1BZ8EowOxArEBwADG/9/+/P8CAAAA//8CAP7/AQAAAAAAAAAAAAAA//8CAP7/AgD+/wEAAAD//wEAAQD9/wMA/v8BAAAAAAD//wIA/v8CAP3/BAD8/wQA/P8CAAAA//8CAPz/BQD7/wUA+/8EAP3/AwD9/wMA/f8DAP3/AgD//wAAAQD//wAAAAAAAAAAAAABAP7/AgD+/wEAAAABAP////8CAP7/AgD+/wIA/f8FAPr/BgD6/wUA/P8EAP3/AgD+/wEAAAD//wIA/v8BAAAA//8BAAAA//8CAP3/AwD+/wIA/v8BAP//AQAAAAAA//8CAP3/AwD/////AgD+/wEAAAAAAAAAAAAAAP//AgD//wAAAAABAP7/AwD9/wIA//8BAP7/AwD9/wEAAQD+/wIA/v8BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8BAP//AgD+/wEAAAD//wEAAQD+/wMA/f8CAP//AQD//wIA/f8DAP7/AQD//wEAAAD//wEA//8AAAEAAAD//wAAAQD+/wQA+/8EAP3/AgD//wEA//8AAAAAAAAAAAEA/v8CAP3/AwD+/wEAAAD+/wMA/f8CAP//AAABAP//AAAAAAAAAQD+/wIA//8AAAAAAAAAAAAAAQD9/wMA//8AAAAAAAAAAAAAAQD+/wIAAAD+/wMA/P8DAP7/AgD/////AQD//wEAAAAAAP//AgD9/wMA/v8BAAAAAAD//wIA/f8DAP7/AgD/////AQD//wIA/v8CAP7/AQAAAAAAAAAAAAAA//8CAP7/AQD//wEA//8BAP//AQD//wEA//8CAP7/AgD+/wEAAAD//wIA/v8BAP//AAABAP//AQD//wAAAQD//wAAAQD+/wMA/f8BAAEA/v8CAAAA/f8FAPr/BgD7/wQA/f8CAP//AAABAP//AQD//wAAAQD//wEA//8AAAAAAAAAAAEA//8AAAAAAQD+/wMA/f8CAP//AQD+/wMA/f8CAP//AAABAP7/AwD8/wQA/f8CAP7/AgD+/wIAAAD+/wIA/v8CAP//AQD/////AwD8/wUA+/8EAP3/AgD//wEA/v8CAP//AQD//wEA/v8CAAAA/v8EAPv/BAD+/wEAAAD//wEA//8CAP3/BAD8/wMA/f8DAP7/AgD9/wQA+/8FAPz/AwD+/wEA//8AAAIA/f8CAP//AAABAP//AQD+/wIA/v8CAAAA//8AAAEA//8BAAAA//8CAP7/AgD9/wMA/v8BAAAAAAD//wEA//8BAAEA/v8AAAEAAAD//wEA//8AAAEA//8AAAEA/v8BAAEA/v8CAP//AAAAAAAAAAAAAAEA/v8CAP7/AgD+/wIA/v8CAP//AAAAAAAAAAAAAAAAAAAAAAAAAAD//wIA/v8CAP7/AQAAAAAA//8CAP7/AgD+/wIA/v8CAP7/AQABAP7/AQD//wIA/f8EAPv/BAD+/wEAAAD//wEA//8BAAAA//8BAP//AQD//wIA/f8CAP//AAABAP//AAABAP7/AgD/////AgD+/wIA/v8BAP7/BAD8/wIAAAD+/wMA/v8AAAIA/f8CAP//AAACAP3/AgD/////AgD+/wEAAQD9/wQA+/8EAP7/AQAAAAAA//8BAP//AQAAAAAAAAD+/wMA/f8DAP////8BAAAA//8CAP7/AgD+/wIA/v8CAP7/AgD9/wMA//8AAAAAAAD//wMA/P8EAP3/AgD//wAAAAABAP//AQD+/wMA/P8FAPv/BAD+////AwD8/wQA/f8BAAEA/v8CAP//AAABAP//AAABAP//AQD//wEA/v8CAP//AAABAP7/AgD//wAAAAABAP7/AwD8/wQA/f8CAP//AAABAP//AQD//wEA//8CAP3/BAD7/wUA/P8DAP7/AAACAPz/BQD7/wQA/f8CAP//AQD//wAAAQD//wEA//8BAP//AQD//wAAAgD9/wQA+/8EAP7/AQAAAAAA//8BAP//AgD9/wQA/P8EAP3/AQAAAAAAAAACAPz/BAD8/wQA/P8EAPz/AwD+/wIA/v8CAP7/AQAAAAAAAAABAP7/AQAAAP//AwD8/wQA/f8BAAEA//8AAAIA/P8EAP7/AAABAP//AAABAP//AAABAP//AQD//wAAAQD//wEA//8BAAAA//8BAP//AQABAP7/AQAAAAAAAAABAP3/AwD//wAAAAD//wEAAAAAAP//AQD+/wQA/P8DAP7/AAABAAAAAAAAAAAA//8CAP////8CAP7/AgD/////AQAAAAAAAAAAAP//AgD9/wQA+/8FAPz/AwD9/wIAAAD+/wMA/P8EAP7/AAABAP//AAABAP7/AwD9/wMA/f8DAP7/AQAAAAAAAAAAAAEA//8AAAEA/f8EAP3/AgD//wAAAAAAAAAAAQD+/wIA//8BAP////8CAAAA//8CAPz/BAD+/wEAAAD//wAAAQD//wIA/f8CAP//AQD//wEA/v8DAP3/AwD9/wEAAQD//wEA//8AAAAAAQD//wAAAQD+/wIA//8AAAAAAAD//wMA/f8CAP7/AQAAAAAAAQD+/wIA/v8BAAEA/v8CAP//AAABAP7/AwD9/wMA/f8CAP//AQD+/wMA/P8EAP3/AQABAP7/AgD9/wQA/f8BAAAA/v8EAPz/AwD+/wAAAQAAAAAAAAD//wEAAAAAAAEA/f8EAPz/BAD9/wEAAQD9/wQA/P8DAP////8BAP//AQD//wEA//8BAAAA//8BAAAA//8BAP//AQAAAP7/BAD6/wcA+f8HAPr/BQD8/wMA//8AAAAAAQD9/wQA+/8GAPv/AwD+/wEAAAAAAAAAAAABAP//AQD+/wMA/f8DAP7/AAABAAAA/v8DAP3/AgAAAP7/AwD9/wMA/v8AAAEA//8BAAAA//8AAAEA/v8DAPz/BAD9/wIA//8AAAAAAAABAP//AQD//wAAAQAAAP//AQAAAAAAAAAAAAAAAAABAP//AAAAAAEA//8AAAAAAAABAP//AAAAAAEA//8BAP//AQD//wIA/v8BAAAA/v8EAPz/AwD///7/BAD7/wUA/P8DAP7/AAABAAAA//8BAP//AAACAP3/AwD9/wIA//8AAAEA//8AAAEA/v8BAAEA/v8DAPz/AwD//wAAAAAAAAAAAQD+/wIA/v8CAP7/AgD+/wIA/v8BAAAAAAAAAAAAAAAAAAAAAAD//wIA/v8CAP3/AwD9/wMA/v8BAAAA/v8DAP3/AwD+/wAAAQD+/wIA/v8DAPz/AwD+/wEAAQD+/wEA//8CAP3/BQD6/wUA/f8AAAIA/////wIA/v8BAAEA/v8CAP3/BAD8/wQA/f8AAAIA/f8DAP7/AAACAPz/BQD7/wQA/f8DAP7/AQD//wEA//8BAAAA//8CAP3/AgD//wIA/v8CAP7/AQABAP7/AgD+/wEAAQD+/wIA/v8AAAIA/v8CAP7/AQAAAP//AgD+/wEAAQD9/wQA/P8DAP////8CAP7/AgD+/wEAAAD//wMA/P8DAP7/AQAAAAAAAAD//wIA/v8BAAEA/f8EAPz/AwD+/wIA/v8CAP7/AQAAAAAA//8DAPz/BAD8/wMA/v8CAP7/AgD+/wIA/v8BAAEA/v8DAPz/BAD9/wMA/f8CAP7/AgAAAP7/AwD8/wMA//8AAAAAAAAAAP//AgD+/wEAAAD//wEAAAD//wEA//8BAP//AQD+/wIA//8BAP//AQD+/wIA//8BAP//AQD//wAAAgD9/wIA//8BAAAA//8BAP7/AwD9/wMA/f8DAP3/AgAAAP//AAABAP//AQAAAP//AAAAAAIA/P8FAPv/BAD+/wAAAQD//wEAAAD//wEAAAD//wIA/f8DAP7/AQABAPz/BgD6/wUA/f8BAAAA//8CAP7/AwD8/wMA/////wMA/P8EAP3/AQABAP7/AwD8/wQA/f8DAP3/AgD+/wIA//8AAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8CAP7/AgD+/wEAAAD//wIA/v8BAP//AgD+/wEAAAD//wEAAAAAAAAAAAAAAP//AwD8/wMA/////wEAAQD+/wIA/v8CAP3/BQD5/wcA/P8AAAIA/f8DAP7/AgD9/wMA/f8CAAAA/v8DAP3/AQAAAAAAAQD+/wIA/f8FAPv/AwD/////BAD7/wQA/v8AAAEA//8AAAIA/P8FAPv/BQD8/wIA//8BAAAA//8BAAAA//8BAP//AQAAAAAA//8BAP//AQAAAP//AAAAAAEA//8BAP7/AgD+/wIA//8BAP//AAABAP7/AwD9/wIA//8AAAAAAQD+/wIA/v8BAAEA/v8CAP////8DAPz/BAD9/wIA//8AAAAAAAAAAAEA/v8CAP7/AgD+/wMA/P8EAP3/AQABAP7/AgD+/wIA/v8CAP////8DAP3/AQACAPz/BAD9/wIA//8BAP//AAAAAAEA//8BAP//AQD//wIA/f8CAAAA//8BAP//AAABAP//AAAAAAAAAQD//wAAAAABAP//AQD//wEA//8BAP//AQAAAP//AAABAP//AQD//wAAAAABAP7/AgD+/wIA/v8BAP//AgD9/wQA+/8EAP7/AQAAAP//AAACAP7/AgD+/wEAAQD+/wIA//8AAAEA/f8EAP3/AQABAP7/AQABAP3/BAD9/wIA//8AAAAAAAAAAAEA/f8FAPr/BQD9/wEAAQD+/wIA/v8CAP//AAAAAAAAAAAAAAEA/v8CAP7/AgD+/wIA//8AAAAA//8CAP7/AgD9/wQA/P8EAPz/AwD+/wIA/v8CAP7/AQAAAAAAAAD//wEAAAAAAAAA//8BAAAAAQD+/wIA/v8DAP3/AgD//wAAAQD//wAAAAAAAAEA/v8CAP//AAABAP7/AwD+/wAAAgD8/wUA/P8CAAAA//8BAP//AQD+/wQA+v8GAPv/AwD//wAAAAAAAAAAAAABAP//AAAAAAAAAQD//wAAAQD+/wMA/f8CAP//AQD//wEAAAD+/wMA/f8CAAAA/v8DAP3/AgD//wAAAQD+/wMA/f8CAP//AAACAP3/AgD//wAAAQD//wAAAQD+/wMA/f8BAAEA//8AAAEA/v8=");
        for (var t = e.length, n = new Uint8Array(t), i = 0; i < t; i++) n[i] = e.charCodeAt(i);
        p = !0, u = new(window.AudioContext || window.webkitAudioContext), u.decodeAudioData(n.buffer, function(e) {
          d = e
        })
      }
    }

    function t(e, t) {
      e && !e.stoped && (e.stop(t), e.stoped = !0)
    }

    function n() {
      f && "function" == typeof wx.vibrateShort && wx.vibrateShort()
    }

    function i(e, t, n) {
      function i(t, n, r, o) {
        if (!t || !t.cancelled) {
          r(n);
          var a = e.done();
          a || t.cancelled || (t.id = requestAnimationFrame(i.bind(null, t, n, r, o))), a && o && o(n)
        }
      }

      function r(e) {
        e && e.id && cancelAnimationFrame(e.id), e && (e.cancelled = !0)
      }
      var o = {
        id: 0,
        cancelled: !1
      };
      return i(o, e, t, n), {
        cancel: r.bind(null, o),
        model: e
      }
    }

    function r(e) {
      this._drag = e, this._dragLog = Math.log(e), this._x = 0, this._v = 0, this._startTime = 0
    }

    function o(e, t, n) {
      return e > t - n && e < t + n
    }

    function a(e, t) {
      return o(e, 0, t)
    }

    function s(e, t, n) {
      this._m = e, this._k = t, this._c = n, this._solution = null, this._endPosition = 0, this._startTime = 0
    }

    function l(e) {
      this._extent = e, this._friction = new r(.01), this._spring = new s(1, 90, 20), this._startTime = 0, this._springing = !1, this._springOffset = 0
    }

    function c(t, n) {
      n = n || {}, this._element = t, this._options = n, this._enableSnap = n.enableSnap || !1, this._itemSize = n.itemSize || 0, this._enableX = n.enableX || !1, this._enableY = n.enableY || !1, this._shouldDispatchScrollEvent = !!n.onScroll, this._enableX ? (this._extent = (n.scrollWidth || this._element.offsetWidth) - this._element.parentElement.offsetWidth, this._scrollWidth = n.scrollWidth) : (this._extent = (n.scrollHeight || this._element.offsetHeight) - this._element.parentElement.offsetHeight, this._scrollHeight = n.scrollHeight), this._position = 0, this._scroll = new l(this._extent), this._onTransitionEnd = this.onTransitionEnd.bind(this), this.updatePosition(), h && !d && e()
    }
    var u, d, h = (window.AudioContext || window.webkitAudioContext) && window.atob && window.Uint8Array,
      p = !1,
      f = "ios" === wx.getPlatform();
    r.prototype.set = function(e, t) {
        this._x = e, this._v = t, this._startTime = (new Date).getTime()
      }, r.prototype.setVelocityByEnd = function(e) {
        this._v = (e - this._x) * this._dragLog / (Math.pow(this._drag, 100) - 1)
      }, r.prototype.x = function(e) {
        void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3);
        var t;
        return t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e), this._dt = e, this._x + this._v * t / this._dragLog - this._v / this._dragLog
      }, r.prototype.dx = function(e) {
        void 0 === e && (e = ((new Date).getTime() - this._startTime) / 1e3);
        var t;
        return t = e === this._dt && this._powDragDt ? this._powDragDt : this._powDragDt = Math.pow(this._drag, e), this._dt = e, this._v * t
      }, r.prototype.done = function() {
        return Math.abs(this.dx()) < 3
      },
      r.prototype.reconfigure = function(e) {
        var t = this.x(),
          n = this.dx();
        this._drag = e, this._dragLog = Math.log(e), this.set(t, n)
      }, r.prototype.configuration = function() {
        var e = this;
        return [{
          label: "Friction",
          read: function() {
            return e._drag
          },
          write: function(t) {
            e.reconfigure(t)
          },
          min: .001,
          max: .1,
          step: .001
        }]
      };
    s.prototype._solve = function(e, t) {
      var n = this._c,
        i = this._m,
        r = this._k,
        o = n * n - 4 * i * r;
      if (0 == o) {
        var a = -n / (2 * i),
          s = e,
          l = t / (a * e);
        return {
          x: function(e) {
            return (s + l * e) * Math.pow(Math.E, a * e)
          },
          dx: function(e) {
            var t = Math.pow(Math.E, a * e);
            return a * (s + l * e) * t + l * t
          }
        }
      }
      if (o > 0) {
        var c = (-n - Math.sqrt(o)) / (2 * i),
          u = (-n + Math.sqrt(o)) / (2 * i),
          l = (t - c * e) / (u - c),
          s = e - l;
        return {
          x: function(e) {
            var t, n;
            return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, c * e)), n || (n = this._powER2T = Math.pow(Math.E, u * e)), s * t + l * n
          },
          dx: function(e) {
            var t, n;
            return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, c * e)), n || (n = this._powER2T = Math.pow(Math.E, u * e)), s * c * t + l * u * n
          }
        }
      }
      var d = Math.sqrt(4 * i * r - n * n) / (2 * i),
        a = -n / 2 * i,
        s = e,
        l = (t - a * e) / d;
      return {
        x: function(e) {
          return Math.pow(Math.E, a * e) * (s * Math.cos(d * e) + l * Math.sin(d * e))
        },
        dx: function(e) {
          var t = Math.pow(Math.E, a * e),
            n = Math.cos(d * e),
            i = Math.sin(d * e);
          return t * (l * d * n - s * d * i) + a * t * (l * i + s * n)
        }
      }
    }, s.prototype.x = function(e) {
      return void 0 == e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._endPosition + this._solution.x(e) : 0
    }, s.prototype.dx = function(e) {
      return void 0 == e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._solution.dx(e) : 0
    }, s.prototype.setEnd = function(e, t, n) {
      if (n || (n = (new Date).getTime()), e != this._endPosition || !a(t, .4)) {
        t = t || 0;
        var i = this._endPosition;
        this._solution && (a(t, .4) && (t = this._solution.dx((n - this._startTime) / 1e3)), i = this._solution.x((n - this._startTime) / 1e3), a(t, .4) && (t = 0), a(i, .4) && (i = 0), i += this._endPosition), this._solution && a(i - e, .4) && a(t, .4) || (this._endPosition = e, this._solution = this._solve(i - this._endPosition, t), this._startTime = n)
      }
    }, s.prototype.snap = function(e) {
      this._startTime = (new Date).getTime(), this._endPosition = e, this._solution = {
        x: function() {
          return 0
        },
        dx: function() {
          return 0
        }
      }
    }, s.prototype.done = function(e) {
      return e || (e = (new Date).getTime()), o(this.x(), this._endPosition, .4) && a(this.dx(), .4)
    }, s.prototype.reconfigure = function(e, t, n) {
      this._m = e, this._k = t, this._c = n, this.done() || (this._solution = this._solve(this.x() - this._endPosition, this.dx()), this._startTime = (new Date).getTime())
    }, s.prototype.springConstant = function() {
      return this._k
    }, s.prototype.damping = function() {
      return this._c
    }, s.prototype.configuration = function() {
      function e(e, t) {
        e.reconfigure(1, t, e.damping())
      }

      function t(e, t) {
        e.reconfigure(1, e.springConstant(), t)
      }
      return [{
        label: "Spring Constant",
        read: this.springConstant.bind(this),
        write: e.bind(this, this),
        min: 100,
        max: 1e3
      }, {
        label: "Damping",
        read: this.damping.bind(this),
        write: t.bind(this, this),
        min: 1,
        max: 500
      }]
    }, l.prototype.snap = function(e, t) {
      this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(t)
    }, l.prototype.set = function(e, t) {
      this._friction.set(e, t), e > 0 && t >= 0 ? (this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(0)) : e < -this._extent && t <= 0 ? (this._springOffset = 0, this._springing = !0, this._spring.snap(e), this._spring.setEnd(-this._extent)) : this._springing = !1, this._startTime = (new Date).getTime()
    }, l.prototype.x = function(e) {
      if (!this._startTime) return 0;
      if (e || (e = ((new Date).getTime() - this._startTime) / 1e3), this._springing) return this._spring.x() + this._springOffset;
      var t = this._friction.x(e),
        n = this.dx(e);
      return (t > 0 && n >= 0 || t < -this._extent && n <= 0) && (this._springing = !0, this._spring.setEnd(0, n), t < -this._extent ? this._springOffset = -this._extent : this._springOffset = 0, t = this._spring.x() + this._springOffset), t
    }, l.prototype.dx = function(e) {
      var t = 0;
      return t = this._lastTime === e ? this._lastDx : this._springing ? this._spring.dx(e) : this._friction.dx(e), this._lastTime = e, this._lastDx = t, t
    }, l.prototype.done = function() {
      return this._springing ? this._spring.done() : this._friction.done()
    }, l.prototype.setVelocityByEnd = function(e) {
      this._friction.setVelocityByEnd(e)
    }, l.prototype.configuration = function() {
      var e = this._friction.configuration();
      return e.push.apply(e, this._spring.configuration()), e
    };
    c.prototype.onTouchStart = function() {
      if (this._startPosition = this._position, this._lastChangePos = this._startPosition, this._startPosition > 0 ? this._startPosition /= .5 : this._startPosition < -this._extent && (this._startPosition = (this._startPosition + this._extent) / .5 - this._extent), this._animation && (this._animation.cancel(), this._scrolling = !1), this.updatePosition(), d) {
        this._sound && (clearInterval(this._vibrateTimer), this._sound.loop = !1, t(this._sound, .04), this._sound = null);
        var e = u.createBufferSource();
        e.buffer = d, e.connect(u.destination), e.start(0), e.stop(0)
      }
    }, c.prototype.onTouchMove = function(e, i) {
      var r = this,
        o = this._startPosition;
      this._position;
      if (this._enableX ? o += e : this._enableY && (o += i), o > 0 ? o *= .5 : o < -this._extent && (o = .5 * (o + this._extent) - this._extent), this._position = o, this.updatePosition(), this.dispatchScroll(), d && o < 0 && o > -this._extent) {
        var a = Math.floor(Math.abs(o / this._itemSize));
        Math.abs(o - this._lastChangePos) > this._itemSize / 2 && "number" == typeof this._lastIdx && this._lastIdx !== a && (n(), setTimeout(function() {
          t(r._sound, .04);
          var e = r._sound = u.createBufferSource();
          e.buffer = d, e.connect(u.destination), e.start(0)
        }), this._lastChangePos = o), this._lastIdx = a
      }
    }, c.prototype.onTouchEnd = function(e, r, o) {
      var a = this;
      if (this._enableSnap && this._position > -this._extent && this._position < 0) {
        if (this._enableY && (Math.abs(r) < this._itemSize && Math.abs(o.y) < 300 || Math.abs(o.y) < 150)) return void this.snap();
        if (this._enableX && (Math.abs(e) < this._itemSize && Math.abs(o.x) < 300 || Math.abs(o.x) < 150)) return void this.snap()
      }
      if (this._enableX ? this._scroll.set(this._position, o.x) : this._enableY && this._scroll.set(this._position, o.y), this._enableSnap) {
        var s = this._scroll._friction.x(100),
          l = s % this._itemSize,
          c = Math.abs(l) > this._itemSize / 2 ? s - (this._itemSize - Math.abs(l)) : s - l;
        c <= 0 && c >= -this._extent && this._scroll.setVelocityByEnd(c)
      }
      this._lastTime = Date.now(), this._lastDelay = 0, this._scrolling = !0, this._lastChangePos = this._position, this._lastIdx = Math.floor(Math.abs(this._position / this._itemSize));
      Date.now();
      if (d && Math.abs(o.y) > 800) {
        n();
        var h = this._vibrateTimer = setInterval(function() {
            n()
          }, 30),
          p = this._sound = u.createBufferSource();
        p.buffer = d, p.connect(u.destination), p.loopStart = 0, p.loopEnd = .04, p.loop = !0, p.start(0)
      }
      this._animation = i(this._scroll, function() {
        var e = Date.now(),
          i = (e - a._scroll._startTime) / 1e3,
          r = a._scroll.x(i);
        a._position = r, a.updatePosition();
        var o = a._scroll.dx(i),
          s = a._scroll._springing;
        if ((Math.abs(o) <= 800 || s) && p && (clearInterval(h), p.loop = !1, t(p, .04), p = a._sound = null, a._lastIdx = Math.floor(Math.abs(r / a._itemSize))), !s && !p && d) {
          var l = Math.floor(Math.abs(r / a._itemSize)),
            c = Math.abs(r % a._itemSize);
          Math.abs(r - a._lastChangePos) > a._itemSize / 2 && (a._lastIdx !== l || o < 5 && (c < 1 || a._itemSize - c < 1)) && (n(), setTimeout(function() {
            t(a._sound, .04);
            var e = a._sound = u.createBufferSource();
            e.buffer = d, e.connect(u.destination), e.start(0)
          }), a._lastChangePos = r), a._lastIdx = l
        }
        a._shouldDispatchScrollEvent && e - a._lastTime > a._lastDelay && (a.dispatchScroll(), a._lastDelay = Math.abs(2e3 / o), a._lastTime = e)
      }, function() {
        a._enableSnap && (c <= 0 && c >= -a._extent && (a._position = c, a.updatePosition()), "function" == typeof a._options.onSnap && a._options.onSnap(Math.floor(Math.abs(a._position) / a._itemSize))), a._shouldDispatchScrollEvent && a.dispatchScroll(), a._scrolling = !1
      })
    }, c.prototype.onTransitionEnd = function() {
      this._element.style.transition = "", this._element.style.webkitTransition = "", this._element.removeEventListener("transitionend", this._onTransitionEnd), this._element.removeEventListener("webkitTransitionEnd", this._onTransitionEnd), this._snapping && (this._snapping = !1), this.dispatchScroll()
    }, c.prototype.snap = function() {
      var e = this._itemSize,
        t = this._position % e,
        i = Math.abs(t) > this._itemSize / 2 ? this._position - (e - Math.abs(t)) : this._position - t;
      this._position !== i && (d && this._startPosition !== i && setTimeout(function() {
        n();
        var e = u.createBufferSource();
        e.buffer = d, e.connect(u.destination), e.start(0)
      }, 200), this._snapping = !0, this.scrollTo(-i), "function" == typeof this._options.onSnap && this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize)))
    }, c.prototype.scrollTo = function(e, t) {
      this._animation && (this._animation.cancel(), this._scrolling = !1), "number" == typeof e && (this._position = -e), this._position < -this._extent ? this._position = -this._extent : this._position > 0 && (this._position = 0), this._element.style.transition = "transform " + (t || .2) + "s ease-out", this._element.style.webkitTransition = "-webkit-transform " + (t || .2) + "s ease-out", this.updatePosition(), this._element.addEventListener("transitionend", this._onTransitionEnd), this._element.addEventListener("webkitTransitionEnd", this._onTransitionEnd)
    }, c.prototype.dispatchScroll = function() {
      if ("function" == typeof this._options.onScroll && Math.round(this._lastPos) !== Math.round(this._position)) {
        this._lastPos = this._position;
        var e = {
          target: {
            scrollLeft: this._enableX ? -this._position : 0,
            scrollTop: this._enableY ? -this._position : 0,
            scrollHeight: this._scrollHeight || this._element.offsetHeight,
            scrollWidth: this._scrollWidth || this._element.offsetWidth,
            offsetHeight: this._element.parentElement.offsetHeight,
            offsetWidth: this._element.parentElement.offsetWidth
          }
        };
        this._options.onScroll(e)
      }
    }, c.prototype.update = function(e, t, n) {
      var i = 0,
        r = this._position;
      this._enableX ? (i = this._element.childNodes.length ? (t || this._element.offsetWidth) - this._element.parentElement.offsetWidth : 0, this._scrollWidth = t) : (i = this._element.childNodes.length ? (t || this._element.offsetHeight) - this._element.parentElement.offsetHeight : 0, this._scrollHeight = t), "number" == typeof e && (this._position = -e), this._position < -i ? this._position = -i : this._position > 0 && (this._position = 0), this._itemSize = n || this._itemSize, this.updatePosition(), r !== this._position && (this.dispatchScroll(), "function" == typeof this._options.onSnap && this._options.onSnap(Math.floor(Math.abs(this._position) / this._itemSize))), this._extent = i, this._scroll._extent = i
    }, c.prototype.updatePosition = function() {
      var e = "";
      this._enableX ? e = "translateX(" + this._position + "px) translateZ(0)" : this._enableY && (e = "translateY(" + this._position + "px) translateZ(0)"), this._element.style.webkitTransform = e, this._element.style.transform = e
    }, c.prototype.isScrolling = function() {
      return this._scrolling || this._snapping
    }, window.exparser.registerBehavior({
      is: "wx-scroller",
      methods: {
        initScroller: function(e, t) {
          this._touchInfo = {
            trackingID: -1,
            maxDy: 0,
            maxDx: 0
          }, this._scroller = new c(e, t), this.__handleTouchStart = this._handleTouchStart.bind(this), this.__handleTouchMove = this._handleTouchMove.bind(this), this.__handleTouchEnd = this._handleTouchEnd.bind(this), this._initedScroller = !0
        },
        _findDelta: function(e) {
          var t = this._touchInfo;
          return "move" == e.detail.state || "end" == e.detail.state ? {
            x: e.detail.dx,
            y: e.detail.dy
          } : {
            x: e.screenX - t.x,
            y: e.screenY - t.y
          }
        },
        _handleTouchStart: function(e) {
          var t = this._touchInfo,
            n = this._scroller;
          n && ("start" == e.detail.state ? (t.trackingID = "touch", t.x = e.detail.x, t.y = e.detail.y) : (t.trackingID = "mouse", t.x = e.screenX, t.y = e.screenY), t.maxDx = 0, t.maxDy = 0, t.historyX = [0], t.historyY = [0], t.historyTime = [e.detail.timeStamp], t.listener = n, n.onTouchStart && n.onTouchStart())
        },
        _handleTouchMove: function(e) {
          var t = this._touchInfo;
          if (-1 != t.trackingID) {
            e.preventDefault();
            var n = this._findDelta(e);
            if (n) {
              for (t.maxDy = Math.max(t.maxDy, Math.abs(n.y)), t.maxDx = Math.max(t.maxDx, Math.abs(n.x)), t.historyX.push(n.x), t.historyY.push(n.y), t.historyTime.push(e.detail.timeStamp); t.historyTime.length > 10;) t.historyTime.shift(), t.historyX.shift(), t.historyY.shift();
              t.listener && t.listener.onTouchMove && t.listener.onTouchMove(n.x, n.y, e.detail.timeStamp)
            }
          }
        },
        _handleTouchEnd: function(e) {
          var t = this._touchInfo;
          if (-1 != t.trackingID) {
            e.preventDefault();
            var n = this._findDelta(e);
            if (n) {
              var i = t.listener;
              t.trackingID = -1, t.listener = null;
              var r = t.historyTime.length,
                o = {
                  x: 0,
                  y: 0
                };
              if (r > 2)
                for (var a = t.historyTime.length - 1, s = t.historyTime[a], l = t.historyX[a], c = t.historyY[a]; a > 0;) {
                  a--;
                  var u = t.historyTime[a],
                    d = s - u;
                  if (d > 30 && d < 50) {
                    o.x = (l - t.historyX[a]) / (d / 1e3), o.y = (c - t.historyY[a]) / (d / 1e3);
                    break
                  }
                }
              t.historyTime = [], t.historyX = [], t.historyY = [], i && i.onTouchEnd && i.onTouchEnd(n.x, n.y, o)
            }
          }
        }
      }
    })
  }(), exparser.registerBehavior({
    is: "wx-touchtrack",
    methods: {
      touchtrack: function(e, t, n) {
        var i = this,
          r = 0,
          o = 0,
          a = 0,
          s = 0,
          l = function(e, n, l, c) {
            if (!1 === i[t].call(i, {
                target: e.target,
                currentTarget: e.currentTarget,
                preventDefault: e.preventDefault.bind(e),
                stopPropagation: e.stopPropagation.bind(e),
                detail: {
                  state: n,
                  x: l,
                  y: c,
                  dx: l - r,
                  dy: c - o,
                  ddx: l - a,
                  ddy: c - s,
                  timeStamp: e.timeStamp
                }
              })) return !1
          },
          c = null;
        exparser.addListenerToElement(e, "touchstart", function(e) {
          if (1 === e.touches.length && !c) return c = e, r = a = e.touches[0].pageX, o = s = e.touches[0].pageY, l(e, "start", r, o)
        }), exparser.addListenerToElement(e, "touchmove", function(e) {
          if (1 === e.touches.length && c) {
            var t = l(e, "move", e.touches[0].pageX, e.touches[0].pageY);
            return a = e.touches[0].pageX, s = e.touches[0].pageY, t
          }
        }), exparser.addListenerToElement(e, "touchend", function(e) {
          if (0 === e.touches.length && c) return c = null, l(e, "end", e.changedTouches[0].pageX, e.changedTouches[0].pageY)
        }), exparser.addListenerToElement(e, "touchcancel", function(e) {
          if (c) {
            var t = c;
            return c = null, l(e, n ? "cancel" : "end", t.touches[0].pageX, t.touches[0].pageY)
          }
        })
      }
    }
  }), window.exparser.registerElement({
    is: "wx-action-sheet-cancel",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "middle",
        cl: {
          v: "wx-action-sheet-middle"
        },
        a: [],
        c: []
      }, {
        t: 1,
        n: "div",
        id: "cancel",
        cl: {
          v: "wx-action-sheet-cancel"
        },
        a: [],
        c: [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      }]
    },
    properties: {},
    listeners: {
      "middle.tap": "handleMiddleTap",
      "cancel.tap": "handleCancelTap"
    },
    behaviors: ["wx-base"],
    methods: {
      handleMiddleTap: function(e) {
        return !1
      },
      handleCancelTap: function(e) {
        this.triggerEvent("actionSheetCancel", void 0, {
          bubbles: !0
        })
      }
    }
  }), window.exparser.registerElement({
    is: "wx-action-sheet",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "mask",
        cl: {
          v: "wx-action-sheet-mask"
        },
        st: {
          v: "display: none;"
        },
        a: [{
          n: "z-index",
          v: "1000",
          o: "s"
        }],
        c: []
      }, {
        t: 1,
        n: "div",
        cl: {
          v: "wx-action-sheet"
        },
        a: [{
          n: "wx-action-sheet-show",
          o: "c",
          e: function(e, t, n) {
            return !e.hidden
          },
          l: null,
          b: [
            [null, "hidden"]
          ]
        }],
        c: [{
          t: 1,
          n: "div",
          cl: {
            v: "wx-action-sheet-menu"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      }]
    },
    behaviors: ["wx-base"],
    properties: {
      hidden: {
        type: Boolean,
        value: !0,
        observer: "hiddenChange",
        public: !0
      }
    },
    listeners: {
      "mask.tap": "hide",
      "this.actionSheetCancel": "cancel"
    },
    methods: {
      cancel: function(e) {
        return this.hide(), !1
      },
      hide: function() {
        this.triggerEvent("change")
      },
      hiddenChange: function(e) {
        var t = this.$.mask;
        e ? (setTimeout(function() {
          t.style.display = "none"
        }, 300), t.style.backgroundColor = "rgba(0,0,0,0)") : (t.style.display = "block", t.focus(), t.style.backgroundColor = "rgba(0,0,0,0.6)")
      }
    }
  }), window.exparser.registerElement({
    is: "wx-action-sheet-item",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    },
    properties: {},
    behaviors: ["wx-base"]
  }),
  function() {
    function e(e) {
      return Math.ceil((e + window.scrollY) / document.documentElement.scrollHeight)
    }

    function t() {
      return window.__route__ + "?" + window.__queryString__
    }

    function n() {
      return window.__lastRoute__ ? window.__lastRoute__ + "?" + window.__lastQueryString__ : ""
    }

    function i(e) {
      return e instanceof exparser.Component && e.hasBehavior("wx-native")
    }
    var r = !1,
      o = 0,
      a = window.navigator.userAgent,
      s = {};
    s[2] = "brand", s[1] = "goods";
    var l = {};
    l[123] = 166, l[124] = 166, l[2] = 166, window.exparser.registerElement({
      is: "wx-ad",
      options: {
        renderingMode: "full"
      },
      behaviors: ["wx-base"],
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "block",
          v: !0,
          a: [{
            s: [],
            n: "if",
            d: function(e, t, n) {
              return e.useNativeRender && e.show
            },
            b: [
              [null, "useNativeRender"],
              [null, "show"]
            ]
          }],
          c: [{
            t: 1,
            n: "div",
            st: {
              v: "height: 100%;"
            },
            a: [],
            c: [{
              t: 1,
              n: "div",
              id: "main",
              cl: {
                e: function(e, t, n) {
                  return "da_container banner_full " + e.type
                },
                b: [
                  [null, "type"]
                ]
              },
              a: [],
              c: [{
                t: 1,
                n: "wx-cover-image",
                cl: {
                  v: "da_banner_img"
                },
                a: [{
                  n: "src",
                  e: function(e, t, n) {
                    return e.imgUrl
                  },
                  l: [null],
                  b: [
                    [null, "imgUrl"]
                  ]
                }],
                c: []
              }, {
                t: 1,
                n: "div",
                cl: {
                  v: "da_content"
                },
                a: [],
                c: [{
                  t: 1,
                  n: "wx-cover-view",
                  cl: {
                    v: "hd_label"
                  },
                  a: [],
                  c: [{
                    c: "广告",
                    t: 3
                  }]
                }, {
                  t: 1,
                  n: "div",
                  cl: {
                    v: "ft_label_cover_wrap"
                  },
                  a: [],
                  c: [{
                    t: 1,
                    n: "wx-cover-image",
                    cl: {
                      v: "ft_label_cover_before"
                    },
                    a: [{
                      n: "src",
                      v: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBlCVBMOEJcBG3gwvvib7PaILKylSg8q3zREMv97IkENoQZOy7b1Uv87pSylmuWIvY7A/0?wx_fmt=png"
                    }],
                    c: []
                  }, {
                    t: 1,
                    n: "wx-cover-view",
                    cl: {
                      v: "ft_label_cover"
                    },
                    st: {
                      e: function(e, t, n) {
                        return "width: " + e.ftLabelWidth + "px"
                      },
                      b: [
                        [null, "ftLabelWidth"]
                      ]
                    },
                    a: [],
                    c: [{
                      t: 1,
                      n: "block",
                      v: !0,
                      a: [{
                        s: [],
                        n: "if",
                        d: function(e, t, n) {
                          return e.isWeApp
                        },
                        b: [
                          [null, "isWeApp"]
                        ]
                      }],
                      c: [{
                        t: 1,
                        n: "wx-cover-image",
                        cl: {
                          v: "ic ic_miniapp_cover"
                        },
                        a: [{
                          n: "src",
                          v: "http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBruyC5aHd9iaG0YZ9lDb5GRJyrnscVVb7QpWAxfFhwicLQjooErar2YicZECbW7JoAcPQ/0?wx_fmt=png"
                        }],
                        c: []
                      }]
                    }, {
                      t: 1,
                      n: "block",
                      v: !0,
                      a: [{
                        s: [],
                        n: "if",
                        d: function(e, t, n) {
                          return "brand" === e.type
                        },
                        b: [
                          [null, "type"]
                        ]
                      }],
                      c: [{
                        t: 1,
                        n: "wx-cover-view",
                        cl: {
                          v: "text"
                        },
                        a: [],
                        c: [{
                          c: "活动推广",
                          t: 3
                        }]
                      }]
                    }, {
                      t: 1,
                      n: "block",
                      v: !0,
                      a: [{
                        s: [],
                        n: "if",
                        d: function(e, t, n) {
                          return "goods" === e.type
                        },
                        b: [
                          [null, "type"]
                        ]
                      }],
                      c: [{
                        t: 1,
                        n: "wx-cover-view",
                        cl: {
                          v: "text"
                        },
                        a: [],
                        c: [{
                          c: "商品推广",
                          t: 3
                        }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }, {
          t: 1,
          n: "block",
          v: !0,
          a: [{
            s: [],
            n: "if",
            d: function(e, t, n) {
              return !e.useNativeRender && e.show
            },
            b: [
              [null, "useNativeRender"],
              [null, "show"]
            ]
          }],
          c: [{
            t: 1,
            n: "div",
            st: {
              v: "height: 100%;"
            },
            a: [],
            c: [{
              t: 1,
              n: "div",
              id: "main",
              cl: {
                e: function(e, t, n) {
                  return "da_container banner_full " + e.type
                },
                b: [
                  [null, "type"]
                ]
              },
              st: {
                e: function(e, t, n) {
                  return "background: url(" + e.imgUrl + ") no-repeat center; background-size: cover;"
                },
                b: [
                  [null, "imgUrl"]
                ]
              },
              a: [],
              c: [{
                t: 1,
                n: "div",
                cl: {
                  v: "da_content"
                },
                a: [],
                c: [{
                  t: 1,
                  n: "div",
                  cl: {
                    v: "hd_label"
                  },
                  a: [],
                  c: [{
                    c: "广告",
                    t: 3
                  }]
                }, {
                  t: 1,
                  n: "div",
                  cl: {
                    v: "ft_label"
                  },
                  a: [],
                  c: [{
                    t: 1,
                    n: "i",
                    cl: {
                      v: "ft_label_before"
                    },
                    st: {
                      v: "background: url(http://mmbiz.qpic.cn/mmbiz_png/icTdbqWNOwNQ0ia79enzYJBlCVBMOEJcBG3gwvvib7PaILKylSg8q3zREMv97IkENoQZOy7b1Uv87pSylmuWIvY7A/0?wx_fmt=png) no-repeat 0 0; background-size: auto 100%;"
                    },
                    a: [],
                    c: []
                  }, {
                    t: 1,
                    n: "block",
                    v: !0,
                    a: [{
                      s: [],
                      n: "if",
                      d: function(e, t, n) {
                        return e.isWeApp
                      },
                      b: [
                        [null, "isWeApp"]
                      ]
                    }],
                    c: [{
                      t: 1,
                      n: "i",
                      cl: {
                        v: "ic ic_miniapp"
                      },
                      a: [],
                      c: []
                    }]
                  }, {
                    t: 1,
                    n: "block",
                    v: !0,
                    a: [{
                      s: [],
                      n: "if",
                      d: function(e, t, n) {
                        return "brand" === e.type
                      },
                      b: [
                        [null, "type"]
                      ]
                    }],
                    c: [{
                      t: 1,
                      n: "span",
                      a: [],
                      c: [{
                        c: "活动推广",
                        t: 3
                      }]
                    }]
                  }, {
                    t: 1,
                    n: "block",
                    v: !0,
                    a: [{
                      s: [],
                      n: "if",
                      d: function(e, t, n) {
                        return "goods" === e.type
                      },
                      b: [
                        [null, "type"]
                      ]
                    }],
                    c: [{
                      t: 1,
                      n: "span",
                      a: [],
                      c: [{
                        c: "商品推广",
                        t: 3
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      },
      properties: {
        unitId: {
          type: String,
          public: !0,
          value: ""
        },
        useNativeRender: {
          type: Boolean,
          value: !1
        },
        show: {
          type: Boolean,
          value: !1
        },
        type: {
          type: String,
          value: ""
        },
        size: {
          type: Number,
          value: 166
        },
        imgUrl: {
          type: String,
          value: ""
        },
        title: {
          type: String,
          value: ""
        },
        isWeApp: {
          type: Boolean,
          value: ""
        },
        ftLabelWidth: {
          type: Number,
          value: 59
        }
      },
      created: function() {
        this._ad_num = o++
      },
      attached: function() {
        var e = this;
        if (!this.unitId) return void console.error("广告单元 id(unit-id) 为空，请先在 'https://mp.weixin.qq.com' 上创建广告单元");
        this.$$.style.setProperty("width", "100%", "important"), this._adData = {};
        var n = window.__route__ + "_" + this.unitId + "_" + this._ad_num,
          i = localStorage.getItem(n + "_time");
        if (i && Date.now() - i < 18e4) {
          var r = localStorage.getItem(n);
          try {
            return this._adData = JSON.parse(r), void this.render()
          } catch (e) {}
        }
        wx.getAdData({
          data: {
            ad_unit_id: this.unitId,
            scene_type: window.__scene__,
            weapp_path: t(),
            user_agent: a
          },
          success: function(t) {
            try {
              var i = JSON.parse(t.data.data);
              if (i.advertisement_num > 0) {
                e._adData = i.advertisement_info[0], e.render();
                try {
                  localStorage.setItem(n, JSON.stringify(e._adData)), localStorage.setItem(n + "_time", Date.now())
                } catch (e) {
                  localStorage.clear()
                }
              }
              wxConsole.log("getAdData", t, e._adData)
            } catch (e) {}
          },
          fail: function(e) {}
        })
      },
      methods: {
        render: function() {
          for (var e = this.parentNode; e && !i(e); e = e.parentNode);
          null !== e && (this.useNativeRender = !0), this.type = s[this._adData.watermark_type], this.imgUrl = this._adData.image_url, this.isWeApp = 6 === this._adData.dest_type, this.ftLabelWidth = this.isWeApp ? 59 : 45;
          var t = l[this._adData.pt] || 0,
            n = this.$$.offsetWidth;
          this.$$.style.setProperty("height", n / 582 * t + "px", "important"), this.show = ["brand", "goods"].indexOf(this.type) > -1, wxConsole.log("render. type:" + this.type + " imgUrl:" + this.imgUrl + " isWeApp:" + this.isWeApp + " size:" + t + " width:" + n + " show:" + this.show, this._adData), this.show || (this.$$.style.display = "none"), this.useNativeRender && window.requestAnimationFrame(function() {
            document.dispatchEvent(new CustomEvent("pageReRender", {}))
          }), this.addListener2(), this.addIntersectionObserver()
        },
        addIntersectionObserver: function() {
          var e = this,
            t = [{
              selector: null
            }],
            n = {
              thresholds: [0, .5]
            };
          this._lastIntersectionRatio = 0, this._intersectionObserverId = __virtualDOM__.addIntersectionObserver(this.shadowRoot, "#main", t, n, function(t) {
            wxConsole.log("wx-ad IntersectionObserver", t.intersectionRatio);
            var n = t.intersectionRatio;
            n > .5 ? e._exposureTimer = setTimeout(function() {
              !e._viewableExposured && e.reportExposure(!0)
            }, 1e3) : clearTimeout(e._exposureTimer), 0 === e._lastIntersectionRatio && n > 0 && !e._exposured && (e.reportExposure(), e._exposured = !0), e._lastIntersectionRatio = n
          })
        },
        reportExposure: function(t) {
          var i = this.$$.getBoundingClientRect(),
            r = {
              ad_unit_id: this.unitId,
              apurl: this._adData.apurl,
              ad_group_id: this._adData.group_id,
              trace_id: this._adData.traceid,
              aid: this._adData.aid,
              user_agent: a,
              referrer: n(),
              screen_cnt: e(i.top),
              weapp_ghid: this._adData.weapp_info && this._adData.weapp_info.original_id || "",
              pt: this._adData.pt
            };
          t && (r.viewable = !0, this._viewableExposured = !0), wx.reportAdExposure({
            data: r
          }), this._viewableExposured && this._exposured && (wxConsole.log("finish exposure.", this.unitId), __virtualDOM__.removeIntersectionObserver(this._intersectionObserverId), this._intersectionObserverId = null)
        },
        addListener2: function() {
          exparser.addListenerToElement(this.$.main, "touchstart", this.touchstart.bind(this)), exparser.addListenerToElement(this.$.main, "touchend", this.touchend.bind(this)), exparser.addListenerToElement(this.$.main, "tap", this.tap.bind(this)), this.$.follow && exparser.addListenerToElement(this.$.follow, "tap", this.follow.bind(this))
        },
        touchstart: function() {
          this._touchStartTime = Date.now()
        },
        touchend: function() {
          this._touchInterval = Date.now() - this._touchStartTime
        },
        tap: function(e) {
          this.reportClicked(e), this.isWeApp ? this.navigateToMiniProgram(this._adData.weapp_info.appid, this._adData.url) : this.openUrl(this._adData.url)
        },
        follow: function() {
          this.openUrl(this._adData.url)
        },
        reportClicked: function(t) {
          var i = this.$$.getBoundingClientRect(),
            r = t.touches && t.touches[0] || {
              clientX: i.left,
              clientY: i.top
            },
            o = {
              rl: this._adData.rl,
              ad_group_id: this._adData.group_id,
              trace_id: this._adData.traceid,
              aid: this._adData.aid,
              user_agent: a,
              referrer: n(),
              screen_cnt: e(i.top),
              ad_w: Math.round(i.width),
              ad_h: Math.round(i.height),
              click_point: JSON.stringify({
                x: Math.round(t.detail.x),
                y: Math.round(t.detail.y)
              }),
              weapp_ghid: this._adData.weapp_info && this._adData.weapp_info.original_id || "",
              pt: this._adData.pt,
              from_h5: this.useNativeRender ? 0 : 1
            };
          this.useNativeRender || (o.pos_x = Math.round(r.clientX - i.left), o.pos_y = Math.round(r.clientY - i.top), o.press_interval = this._touchInterval), wx.reportAdClicked({
            data: o
          })
        },
        navigateToMiniProgram: function(e, t) {
          wxConsole.log("invoke navigateToMiniProgram", e, t), wx.navigateToMiniProgram({
            appId: e,
            path: t,
            extraData: {},
            envVersion: "release",
            sourcetype: 1,
            complete: function(e) {
              wxConsole.log("navigateToMiniProgram callback", e)
            }
          })
        },
        openUrl: function(e) {
          !0 !== r && (r = !0, wxConsole.log("invoke private_openUrl", e), wx.invoke("private_openUrl", {
            url: e
          }, function(e) {
            r = !1, wxConsole.log("private_openUrl callback", e)
          }))
        }
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-audio",
    behaviors: ["wx-base", "wx-player"],
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "audio",
        id: "player",
        st: {
          v: "display: none;"
        },
        a: [{
          n: "loop",
          o: "$",
          e: function(e, t, n) {
            return e.loop
          },
          l: [null],
          b: [
            [null, "loop"]
          ]
        }],
        c: []
      }, {
        t: 1,
        n: "div",
        id: "default",
        cl: {
          v: "wx-audio-default"
        },
        st: {
          v: "display: none;"
        },
        a: [],
        c: [{
          t: 1,
          n: "div",
          id: "poster",
          cl: {
            v: "wx-audio-left"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            id: "button",
            cl: {
              e: function(e, t, n) {
                return "wx-audio-button " + e._buttonType
              },
              b: [
                [null, "_buttonType"]
              ]
            },
            a: [],
            c: []
          }]
        }, {
          t: 1,
          n: "div",
          cl: {
            v: "wx-audio-right"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            cl: {
              v: "wx-audio-time"
            },
            a: [{
              n: "parse-text-content",
              v: ""
            }],
            c: [{
              c: "",
              e: function(e, t, n) {
                return e._currentTime
              },
              b: [
                [null, "_currentTime"]
              ],
              t: 3
            }]
          }, {
            t: 1,
            n: "div",
            cl: {
              v: "wx-audio-info"
            },
            a: [],
            c: [{
              t: 1,
              n: "div",
              cl: {
                v: "wx-audio-name"
              },
              a: [{
                n: "parse-text-content",
                v: ""
              }],
              c: [{
                c: "",
                e: function(e, t, n) {
                  return e.name
                },
                b: [
                  [null, "name"]
                ],
                t: 3
              }]
            }, {
              t: 1,
              n: "div",
              cl: {
                v: "wx-audio-author"
              },
              a: [{
                n: "parse-text-content",
                v: ""
              }],
              c: [{
                c: "",
                e: function(e, t, n) {
                  return e.author
                },
                b: [
                  [null, "author"]
                ],
                t: 3
              }]
            }]
          }]
        }]
      }, {
        t: 1,
        n: "div",
        id: "fakebutton",
        a: [],
        c: []
      }]
    },
    properties: {
      action: {
        type: Object,
        observer: "actionChanged",
        public: !0
      },
      name: {
        type: String,
        value: "未知歌曲",
        public: !0
      },
      author: {
        type: String,
        value: "未知作者",
        public: !0
      },
      loop: {
        type: Boolean,
        value: !1,
        public: !0
      },
      controls: {
        type: Boolean,
        value: !1,
        observer: "controlsChanged",
        public: !0
      },
      _srcTimer: {
        type: Number
      },
      _actionTimer: {
        type: Number
      },
      _canSrc: {
        type: Boolean,
        value: !0
      },
      _deferredSrc: {
        type: String,
        value: ""
      },
      _canAction: {
        type: Boolean,
        value: !1
      },
      _deferredAction: {
        type: Array,
        value: []
      }
    },
    methods: {
      _reset: function() {
        this._buttonType = "play", this._currentTime = "00:00", this._duration = "00:00"
      },
      _readySrc: function() {
        this._canSrc = !0, this._srcChanged(this._deferredSrc), this._deferredSrc = ""
      },
      _readyAction: function() {
        var e = this;
        this._canAction = !0, this._deferredAction.forEach(function(t) {
          e.actionChanged(t)
        }, this), this._deferredAction = []
      },
      _srcChanged: function(e, t) {
        if (e) {
          clearTimeout(this._srcTimer), this._canAction = !1, this.$.player.src = e;
          var n = this;
          this._srcTimer = setTimeout(function() {
            n._reset(), n._readyAction()
          }, 0)
        }
      },
      _posterChanged: function(e, t) {
        this.$.poster.style.backgroundImage = "url('" + e + "')"
      },
      controlsChanged: function(e, t) {
        this.$.default.style.display = e ? "" : "none"
      },
      actionChanged: function(e, t) {
        var n = this;
        if (e) {
          var i = e.method;
          if (this.action = e, !this._canAction && "setSrc" !== i) return void this._deferredAction.push(e);
          var r = null;
          if (null != (r = /^set([a-z|A-Z]*)/.exec(i))) {
            var o = r[1],
              a = e.data;
            if ("currentTime" == (o = o[0].toLowerCase() + o.slice(1))) {
              if (a = parseFloat(a), isNaN(a)) return;
              if (0 === this.$.player.readyState || 1 === this.$.player.readyState) {
                var s = function e() {
                  n.$.player[o] = a, n.$.player.removeEventListener("canplay", e, !1)
                };
                this.$.player.addEventListener("canplay", s, !1)
              } else this.$.player[o] = a
            } else "src" === o ? this._srcChanged(a) : this.triggerEvent("error", {
              errMsg: i + " is not an action"
            })
          } else if ("play" == i || "pause" == i) {
            if (!0 === this.isBackground && "play" === i) return;
            this.$.fakebutton.click()
          } else this.triggerEvent("error", {
            errMsg: i + " is not an action"
          });
          this.action = null
        }
      },
      onPlay: function() {
        wx.invoke("syncAudioEvent", {
          type: "play"
        })
      },
      onPause: function() {
        wx.invoke("syncAudioEvent", {
          type: "pause"
        })
      },
      onEnded: function() {
        wx.invoke("syncAudioEvent", {
          type: "ended"
        })
      }
    },
    attached: function() {
      var e = this,
        t = this.$.player,
        n = this;
      this.$.button.onclick = function(e) {
        e.stopPropagation(), n.action = {
          method: n._buttonType
        }
      }, this.$.fakebutton.onclick = function(e) {
        e.stopPropagation(), n.action && "function" == typeof t[n.action.method] && t[n.action.method]()
      };
      var i = this.getNodeId(),
        r = "";
      "number" == typeof i && -1 !== i && (r = i), WeixinJSBridge.subscribe("audio_" + this.id + "_" + r + "_actionChanged", function(t) {
        e.action = t
      }), wx.publish("audioInsert", {
        audioId: this.id,
        nodeId: i
      }), wx.onAppEnterBackground(function(t) {
        e.$.player.pause(), e.isBackground = !0
      }), wx.onAppEnterForeground(function(t) {
        e.isBackground = !1
      })
    },
    detached: function() {
      wx.publish("audioRemove", {
        audioId: this.id,
        nodeId: this.getNodeId()
      })
    }
  }),
  function() {
    function e(e, t) {
      return new Promise(function(n, i) {
        e(Object.assign({}, t, {
          success: function(e) {
            return n(e)
          },
          fail: function(e) {
            return i(e)
          }
        }))
      })
    }
    window.exparser.registerElement({
      is: "wx-button",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      },
      behaviors: ["wx-base", "wx-hover", "wx-label-target"],
      properties: {
        type: {
          type: String,
          value: "default",
          public: !0
        },
        size: {
          type: String,
          value: "default",
          public: !0
        },
        disabled: {
          type: Boolean,
          public: !0
        },
        plain: {
          type: Boolean,
          public: !0
        },
        loading: {
          type: Boolean,
          public: !0
        },
        formType: {
          type: String,
          public: !0
        },
        openType: {
          value: "",
          type: String,
          public: !0
        },
        appParameter: {
          value: "",
          type: String,
          public: !0
        },
        withCredentials: {
          value: !0,
          type: Boolean,
          public: !0
        },
        lang: {
          value: "en",
          type: String,
          public: !0
        },
        hoverStartTime: {
          type: Number,
          value: 20,
          public: !0
        },
        hoverStayTime: {
          type: Number,
          value: 70,
          public: !0
        },
        hoverClass: {
          type: String,
          value: "button-hover",
          public: !0,
          observer: "_hoverClassChange"
        },
        sessionFrom: {
          type: String,
          value: "wxapp",
          public: !0
        },
        businessId: {
          type: String,
          value: "",
          public: !0
        },
        sendMessageTitle: {
          type: String,
          value: "",
          public: !0
        },
        sendMessagePath: {
          type: String,
          value: "",
          public: !0
        },
        sendMessageImg: {
          type: String,
          value: "",
          public: !0
        },
        showMessageCard: {
          type: Boolean,
          value: !1,
          public: !0
        },
        categoryId: {
          type: Array,
          value: [],
          public: !0
        }
      },
      listeners: {
        tap: "_preventTapOnDisabled",
        longtap: "_preventTapOnDisabled",
        canceltap: "_preventTapOnDisabled",
        "this.tap": "_onThisTap"
      },
      methods: {
        _preventTapOnDisabled: function() {
          if (this.disabled) return !1
        },
        _onThisTap: function() {
          var t = this,
            n = this;
          "submit" === this.formType ? this.triggerEvent("formSubmit", void 0, {
            bubbles: !0
          }) : "reset" === this.formType && this.triggerEvent("formReset", void 0, {
            bubbles: !0
          }), this._lock || (this._lock = !0, setTimeout(function() {
            t._lock = !1
          }, 1e3), "contact" === this.openType ? wx.enterContact({
            sessionFrom: this.sessionFrom,
            businessId: this.businessId,
            sendMessageTitle: this.sendMessageTitle,
            sendMessagePath: this.sendMessagePath,
            sendMessageImg: this.sendMessageImg,
            showMessageCard: this.showMessageCard,
            complete: function(e) {
              n.triggerEvent("contact", e)
            }
          }) : "getPhoneNumber" === this.openType ? wx.getPhoneNumber({
            data: {
              api_name: "webapi_getuserwxphone",
              with_credentials: !0
            },
            complete: function(e) {
              var t = {};
              e.errMsg && (t.errMsg = e.errMsg), e.encryptedData && (t.encryptedData = e.encryptedData), e.iv && (t.iv = e.iv), n.triggerEvent("getphonenumber", t)
            }
          }) : "share" === this.openType ? WeixinJSBridge.publish("tapShareButton", {
            target: {
              id: this.id,
              dataset: this.dataset,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            }
          }) : "getUserInfo" === this.openType ? wx.getUserInfo({
            withCredentials: n.withCredentials,
            lang: n.lang,
            complete: function(e) {
              n.triggerEvent("getuserinfo", e)
            }
          }) : "realnameAuth" === this.openType ? wx.invoke("openRealnameAuth", {
            categoryId: this.categoryId
          }, function(e) {
            t.triggerEvent("realnameauth", e)
          }) : "getRealnameAuthInfo" === this.openType ? wx.invoke("openRealnameAuth", {
            categoryId: this.categoryId
          }, function(e) {
            t.triggerEvent("getrealnameauthinfo", e)
          }) : "launchApp" === this.openType && e(wx.getAppEnterForegroundInfo, {}).then(function(e) {
            var t = !1,
              n = e.info,
              i = n.scene,
              r = (n.path, n.query, n.reLaunch, e.sceneHistory),
              o = e.appId;
            console.log("切前台", e), console.log("appId", o);
            var a = !1,
              s = "";
            return r.forEach(function(e) {
              1036 === e ? (a = !0, s = "1036") : 1089 === e || 1090 === e ? s += " " + e : (a = !1, s = "")
            }), 1036 === i ? (console.log("1036 随便打开"), t = !0) : a ? (console.log(i + " 但是按照 " + s + " 的路线打开, 维护了可以被打开的状态"), t = !0) : (console.log(i + " 不能打开"), t = !1), {
              canLaunchApp: t,
              appId: o
            }
          }).catch(function(t) {
            return e(wx.getLaunchInfo, {}).then(function(e) {
              var t = !1,
                n = e.info.scene,
                i = e.appId;
              return console.log("启动", e), console.log("appId", i), 1036 === n ? (t = !0, console.log("从 1036 启动, 可以打开")) : console.log("不是从 1036 启动, 不可以打开"), {
                canLaunchApp: t,
                appId: i
              }
            })
          }).then(function(e) {
            var n = e.canLaunchApp,
              i = e.appId;
            if (!n) return void t.triggerEvent("error", {
              errMsg: "invalid scene"
            });
            var r = {
              appId: i,
              success: function(e) {
                console.log("打开 app 成功", e)
              },
              fail: function(e) {
                console.log("打开 app 失败", e), t.triggerEvent("error", e)
              }
            };
            "ios" === wx.getPlatform() ? (r.messageExt = t.appParameter, console.log("messageExt", r.messageExt)) : (r.extInfo = t.appParameter, console.log("extInfo", r.extInfo)), wx.launchApplication(r)
          }))
        },
        handleLabelTap: function(e) {
          exparser.triggerEvent(this.shadowRoot, "tap", e.detail, {
            bubbles: !0,
            composed: !0,
            extraFields: {
              touches: e.touches,
              changedTouches: e.changedTouches
            }
          })
        }
      }
    })
  }(),
  function() {
    var e = !1,
      t = [];
    wx.subscribe("operateCamera", function(e) {
      t.forEach(function(t) {
        t(e)
      })
    }), window.exparser.registerElement({
      is: "wx-camera",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "container",
          st: {
            v: "width: 100%; height: 100%;"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            id: "inner",
            st: {
              v: "width: 100%; height: 100%;"
            },
            a: [],
            c: []
          }]
        }, {
          t: 1,
          n: "video",
          id: "video",
          st: {
            v: "display: none;"
          },
          a: [],
          c: []
        }, {
          t: 1,
          n: "div",
          st: {
            v: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      },
      behaviors: ["wx-base", "wx-native", "wx-positioning-target"],
      properties: {
        mode: {
          type: String,
          value: "photo",
          public: !0,
          observer: "modeChanged"
        },
        devicePosition: {
          type: String,
          value: "back",
          public: !0,
          observer: "devicePositionChanged"
        },
        filter: {
          type: Number,
          value: 0,
          public: !0,
          observer: "filterChanged"
        },
        flash: {
          type: String,
          value: "auto",
          public: !0,
          observer: "flashChanged"
        },
        needOutput: {
          type: Boolean,
          value: !1,
          public: !0
        },
        _insert2WebLayer: {
          type: Boolean,
          value: !1
        },
        bindstop: {
          type: String,
          value: ""
        },
        binderror: {
          type: String,
          value: ""
        },
        bindoutput: {
          type: String,
          value: ""
        }
      },
      created: function() {
        this._createdTimeStamp = Date.now()
      },
      attached: function() {
        return this._attached = !0, e ? void console.error("一个页面只能插入一个 '<camera />'。") : "wechatdevtools" === wx.getPlatform() ? (this.insertCamera4Tools(), void(e = !0)) : (this.insertCamera(), e = !0, void(this.__pageRender = this._pageReRenderCallback.bind(this)))
      },
      detached: function() {
        var n = this;
        this._attached = !1;
        var i = t.indexOf(this._handleCameraOperations);
        if (i > -1 && t.splice(i, 1), "wechatdevtools" === wx.getPlatform()) return this._videoTrack && this._videoTrack.stop(), e = !1, void wx.publish("cameraRemoved", {
          cameraId: this._cameraId
        });
        document.removeEventListener("pageReRender", this.__pageRender), wx.invoke("removeCamera", {
          cameraId: this._cameraId
        }, function(t) {
          e = !1, wx.publish("cameraRemoved", {
            cameraId: n._cameraId
          })
        })
      },
      methods: {
        _delay: function(e, t, n) {
          this._deferred.push({
            callback: e,
            args: [t, n]
          })
        },
        _hiddenChanged: function(e) {
          e ? this.updateNativeView("updateCamera", {
            cameraId: this._cameraId,
            hide: this.hidden,
            position: {
              width: 0,
              height: 0
            }
          }, function(e) {}) : this._updatePosition(), wx.publish("cameraUpdated", {
            cameraId: this._cameraId,
            hidden: e
          })
        },
        _updatePosition: function(e) {
          this._box = this._getBox();
          var t = {
            cameraId: this._cameraId,
            hide: this.hidden,
            position: this._box
          };
          "number" == typeof e && (t.parentId = e), this.updateNativeView("updateCamera", t, function() {})
        },
        insertCamera: function() {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
          this._box = this._getBox();
          var n = this.getPositioningId(),
            i = {
              parentId: t,
              cameraId: n,
              position: this._box,
              mode: this.mode,
              devicePosition: this.devicePosition,
              flash: this.flash,
              filter: this.filter,
              hide: this.hidden
            };
          this.insertNativeView("insertCamera", i, function(t) {
            /:ok/.test(t.errMsg) ? (e._cameraId = n, e._ready(), e.findCoverView(t.containerId || e._cameraId), wx.publish("cameraInserted", {
              cameraId: e._cameraId,
              bindings: {
                bindstop: e.bindstop,
                binderror: e.binderror,
                bindoutput: e.bindoutput,
                target: {
                  dataset: e.dataset,
                  id: e.id,
                  offsetTop: e.$$.offsetTop,
                  offsetLeft: e.$$.offsetLeft
                },
                nodeId: e.getNodeId()
              }
            }), e.__pageRender(), document.addEventListener("pageReRender", e.__pageRender)) : e.binderror && wx.publishPageEvent(e.binderror, {
              type: "error",
              timeStamp: Date.now() - e._createdTimeStamp,
              target: {
                dataset: e.dataset,
                id: e.id,
                offsetTop: e.$$.offsetTop,
                offsetLeft: e.$$.offsetLeft
              },
              currentTarget: {
                dataset: e.dataset,
                id: e.id,
                offsetTop: e.$$.offsetTop,
                offsetLeft: e.$$.offsetLeft
              },
              detail: {
                errMsg: t.errMsg
              }
            }, e.getNodeId())
          })
        },
        modeChanged: function(e) {
          if (this._attached) return this._isReady ? void wx.invoke("updateCamera", {
            cameraId: this._cameraId,
            mode: e
          }) : void this._delay("modeChanged", e)
        },
        devicePositionChanged: function(e) {
          if (this._attached) return this._isReady ? void wx.invoke("updateCamera", {
            cameraId: this._cameraId,
            devicePosition: e
          }) : void this._delay("devicePositionChanged", e)
        },
        filterChanged: function(e) {
          if (this._attached) return this._isReady ? void wx.invoke("updateCamera", {
            cameraId: this._cameraId,
            filter: e
          }) : void this._delay("filterChanged", e)
        },
        flashChanged: function(e) {
          if (this._attached) return this._isReady ? void wx.invoke("updateCamera", {
            cameraId: this._cameraId,
            flash: e
          }) : void this._delay("flashChanged", e)
        },
        insertCamera4Tools: function() {
          var e = this,
            n = function(t) {
              e.$.container.innerText = t, e.$.container.style.lineHeight = e.$.container.offsetHeight + "px", e.$.container.style.textAlign = "center", e.$.container.style.backgroundColor = "gray", e.$.container.style.color = "#EEE"
            },
            i = window.createObjectURL || window.URL && window.URL.createObjectURL || window.webkitURL.createObjectURL,
            r = this.$.video;
          navigator.getUserMedia({
            video: {
              width: 1920,
              height: 1080,
              frameRate: 60
            },
            audio: !1
          }, function(n) {
            e.$.container.style.display = "none", e.$.video.style.display = "block", r.src = i(n), r.play();
            var o = "";
            MediaRecorder.isTypeSupported("video/webm;codecs=vp9") ? o = "video/webm;codecs=vp9" : MediaRecorder.isTypeSupported("video/webm;codecs=vp8") ? o = "video/webm;codecs=vp8" : MediaRecorder.isTypeSupported("video/webm;codecs=h264") ? o = "video/webm;codecs=h264" : MediaRecorder.isTypeSupported("video/webm") && (o = "video/webm"), e._videoTrack = n.getTracks()[0], e._mediaRecorder = new MediaRecorder(n, {
              mimeType: o
            }), e._mediaChunks = [], e._cameraId = e.getPositioningId(), e._handleCameraOperations = e.handleCameraOperations.bind(e), t.push(e._handleCameraOperations), wx.publish("cameraInserted", {
              cameraId: e._cameraId,
              bindings: {}
            })
          }, function(e) {
            n("DevicesNotFoundError" === e.name ? "未找到摄像头" : "IDE暂不支持camera组件，请在真机调试。")
          })
        },
        handleCameraOperations: function(e) {
          var t = this,
            n = e.cid,
            i = e.cameraId;
          if (i === this._cameraId)
            if ("takePhoto" === e.type) {
              var r = this.takePhoto(e.quality);
              wx.publish("onOperateCameraCallback", {
                imageData: r,
                cameraId: i,
                cid: n
              })
            } else "startRecord" === e.type ? (this._mediaThumb = this.takePhoto(), this._mediaRecorder.ondataavailable = function(e) {
              e.data && e.data.size > 0 && t._mediaChunks.push(e.data)
            }, this._mediaRecorder.start(1e3), wx.publish("onOperateCameraCallback", {
              errMsg: "startRecord:ok",
              cameraId: i,
              cid: n
            })) : "stopRecord" === e.type && (this._mediaRecorder.onstop = function() {
              var e = new Blob(t._mediaChunks, {
                  type: "video/webm"
                }),
                r = new FileReader;
              r.onloadend = function() {
                wx.publish("onOperateCameraCallback", {
                  videoData: r.result.replace(/^data:[^;]+;base64,/, ""),
                  imageData: t._mediaThumb,
                  cameraId: i,
                  cid: n
                })
              }, r.readAsDataURL(e), t._mediaChunks = [], t._mediaRecorder.ondataavailable = null, t._mediaRecorder.onstop = null
            }, this._mediaRecorder.stop())
        },
        takePhoto: function(e) {
          var t = this.$.video,
            n = document.createElement("canvas"),
            i = n.getContext("2d"),
            r = this.$$.getBoundingClientRect(),
            o = {
              high: 1,
              normal: .7,
              low: .3
            }[e] || .7,
            a = 0,
            s = 0,
            l = 0,
            c = 0;
          return l = r.width / r.height * t.videoHeight, l < t.videoWidth ? (a = (t.videoWidth - l) / 2, s = 0, c = t.videoHeight) : (a = 0, l = t.videoWidth, c = r.height / r.width * t.videoWidth, s = (t.videoHeight - c) / 2), n.width = r.width, n.height = r.height, i.drawImage(this.$.video, a, s, l, c, 0, 0, n.width, n.height), n.toDataURL("image/jpeg", o).replace(/^data:image\/(jpg|png|jpeg);base64,/, "")
        }
      }
    })
  }();
var touchEventNames = ["touchstart", "touchmove", "touchend", "touchcancel", "longtap"],
  touchEventMap = {
    touchstart: "onTouchStart",
    touchmove: "onTouchMove",
    touchend: "onTouchEnd",
    touchcancel: "onTouchCancel",
    longtap: "onLongPress"
  },
  LONG_PRESS_TIME_THRESHOLD = 300,
  LONG_PRESS_DISTANCE_THRESHOLD = 5,
  format = function(e, t, n, i) {
    n = Array.prototype.slice.call(n);
    var r = e + "." + t + "(" + n.map(function(e) {
      return "string" == typeof e ? "'" + e + "'" : e
    }).join(", ") + ")";
    return i && (r = i + " = " + r), r
  },
  resolveColor = function(e) {
    var t = e.slice(0);
    return t[3] = t[3] / 255, "rgba(" + t.join(",") + ")"
  },
  getCanvasTouches = function(e) {
    var t = this;
    return [].concat(_toConsumableArray(e)).map(function(e) {
      return {
        identifier: e.identifier,
        x: e.pageX - t._box.left,
        y: e.pageY - t._box.top
      }
    })
  },
  calcDistance = function(e, t) {
    var n = e.x - t.x,
      i = e.y - t.y;
    return n * n + i * i
  },
  canvasToDataURLHandlers = [];
wx.subscribe("invokeCanvasToDataUrl", function(e) {
  canvasToDataURLHandlers.forEach(function(t) {
    t(e)
  })
});
var canvasGetImageDataHandlers = [];
wx.subscribe("invokeCanvasGetImageData", function(e) {
  canvasGetImageDataHandlers.forEach(function(t) {
    t(e)
  })
});
var canvasPutImageDataHandlers = [];
wx.subscribe("invokeCanvasPutImageData", function(e) {
  canvasPutImageDataHandlers.forEach(function(t) {
    t(e)
  })
});
var drawCanvasHandlers = [];
wx.subscribe("canvasActionsChanged", function(e) {
  drawCanvasHandlers.forEach(function(t) {
    t(e)
  })
}), window.exparser.registerElement({
  is: "wx-canvas",
  behaviors: ["wx-base", "wx-native"],
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "canvas",
      id: "canvas",
      a: [{
        n: "width",
        v: "300"
      }, {
        n: "height",
        v: "150"
      }],
      c: []
    }, {
      t: 1,
      n: "div",
      st: {
        v: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;"
      },
      a: [],
      c: [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    }]
  },
  properties: {
    canvasId: {
      type: String,
      public: !0
    },
    bindtouchstart: {
      type: String,
      value: "",
      public: !0
    },
    bindtouchmove: {
      type: String,
      value: "",
      public: !0
    },
    bindtouchend: {
      type: String,
      value: "",
      public: !0
    },
    bindtouchcancel: {
      type: String,
      value: "",
      public: !0
    },
    bindlongtap: {
      type: String,
      value: "",
      public: !0
    },
    disableScroll: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "disableScrollChanged"
    }
  },
  created: function() {
    this._actionsDefer = [], this._actionsWaiting = !1, this.__pageReRender = this._pageReRenderCallback.bind(this)
  },
  attached: function() {
    var e = this,
      t = (this.$.canvas, this);
    if (this._images = {}, this._box = this._getBox(), this.$.canvas.width = this.$$.offsetWidth, this.$.canvas.height = this.$$.offsetHeight, !this.canvasId) return this.triggerEvent("error", {
      errMsg: "canvas-id attribute is undefined"
    }), this._isError = !0, void(this.$$.style.display = "none");
    window.__canvasNumbers__ = window.__canvasNumbers__ || {};
    var n = this.getNodeId(),
      i = window.__webviewId__ + "_canvas_" + n + "_" + this.canvasId;
    if (window.__canvasNumbers__.hasOwnProperty(i)) return this.triggerEvent("error", {
      errMsg: "canvas-id " + t.canvasId + " in this page has already existed"
    }), this._isError = !0, void(this.$$.style.display = "none");
    if (window.__canvasNumber__ = window.__canvasNumber__ || 1e5, window.__canvasNumbers__[i] = window.__canvasNumber__ + __webviewId__, window.__canvasNumber__ += 1e5, this._canvasNumber = window.__canvasNumbers__[i], this._isMobile()) {
      t._isReady = !1;
      var r = {
          target: {
            target: this.id,
            dataset: this.dataset,
            offsetTop: this.$$.offsetTop,
            offsetLeft: this.$$.offsetLeft
          },
          startTime: +new Date
        },
        o = !1;
      touchEventNames.forEach(function(t) {
        e["bind" + t] && (r[touchEventMap[t]] = e["bind" + t], o = !0)
      }), this.insertNativeView("insertCanvas", {
        data: JSON.stringify({
          type: "canvas",
          webviewId: window.__webviewId__,
          canvasNumber: t._canvasNumber,
          nodeId: this.getNodeId()
        }),
        gesture: o,
        canvasId: t._canvasNumber,
        position: t._box,
        hide: this.hidden,
        disableScroll: this.disableScroll
      }, function(e) {
        WeixinJSBridge.publish("canvasInsert", {
          canvasId: t.canvasId,
          canvasNumber: t._canvasNumber,
          nodeId: n,
          data: r,
          position: t._box,
          compPath: t.ownerShadowRoot ? t.ownerShadowRoot.__wxHost.is : ""
        }), t._ready(), t.findCoverView(e.containerId || t._canvasNumber), document.addEventListener("pageReRender", t.__pageReRender)
      })
    } else WeixinJSBridge.publish("canvasInsert", {
      canvasId: t.canvasId,
      canvasNumber: t._canvasNumber,
      nodeId: n,
      position: t._box,
      compPath: this.ownerShadowRoot ? this.ownerShadowRoot.__wxHost.is : ""
    }), WeixinJSBridge.subscribe("canvas" + t._canvasNumber + "actionsChanged", function(e) {
      var n = e.actions,
        i = e.reserve;
      t.actions = n, t.actionsChanged(n, i)
    }), this._actionsChanged = function(t) {
      var n = t.actions,
        i = t.reserve,
        r = t.canvasId,
        o = t.cid;
      r === e._canvasNumber && (e.actions = n, e.actionsChanged(n, i, o))
    }.bind(this), drawCanvasHandlers.push(this._actionsChanged), this._toDataURL = this.toDataURL.bind(this), canvasToDataURLHandlers.push(this._toDataURL), this._getImageData = this.getImageData.bind(this), canvasGetImageDataHandlers.push(this._getImageData), this._putImageData = this.putImageData.bind(this), canvasPutImageDataHandlers.push(this._putImageData), t._ready(), document.addEventListener("pageReRender", this.__pageReRender), this.addTouchEventForWebview()
  },
  detached: function() {
    var e = this,
      t = this.getNodeId(),
      n = __webviewId__ + "_canvas_" + t + "_" + this.canvasId;
    if (window.__canvasNumbers__ && delete window.__canvasNumbers__[n], document.removeEventListener("pageReRender", this.__pageReRender), this._isMobile()) this.removeNativeView("removeCanvas", {
      canvasId: this._canvasNumber
    }, function(n) {
      WeixinJSBridge.publish("canvasRemove", {
        canvasId: e.canvasId,
        canvasNumber: e._canvasNumber,
        nodeId: t
      })
    });
    else {
      var i = canvasToDataURLHandlers.indexOf(this._toDataURL);
      i > -1 && canvasToDataURLHandlers.splice(i, 1);
      var r = canvasGetImageDataHandlers.indexOf(this._getImageData);
      r > -1 && canvasGetImageDataHandlers.splice(r, 1);
      var o = canvasPutImageDataHandlers.indexOf(this._putImageData);
      o > -1 && canvasPutImageDataHandlers.splice(o, 1);
      var a = drawCanvasHandlers.indexOf(this._actionsChanged);
      a > -1 && drawCanvasHandlers.splice(a, 1)
    }
    WeixinJSBridge.publish("canvasRemove", {
      canvasId: this.canvasId,
      canvasNumber: this._canvasNumber,
      nodeId: t
    })
  },
  methods: {
    toDataURL: function(e) {
      if (e.canvasId === this._canvasNumber) {
        var t = e.x,
          n = e.y,
          i = e.width,
          r = e.height,
          o = e.destWidth,
          a = e.destHeight,
          s = e.fileType,
          l = e.quality,
          c = e.cid,
          u = "jpg" === s ? "image/jpeg" : "image/png";
        t = t || 0, n = n || 0, (t < 0 || t > this._box.width) && (t = 0), (n < 0 || n > this._box.height) && (n = 0), i = i ? Math.min(i, this._box.width - t) : this._box.width - t, r = r ? Math.min(r, this._box.height - n) : this._box.height - n, o = o || i, a = a || r;
        var d = document.createElement("canvas");
        d.width = o, d.height = a;
        var h = d.getContext("2d");
        "jpg" === s && (h.fillStyle = "#fff", h.fillRect(0, 0, d.width, d.height)), h.drawImage(this.$.canvas, t, n, i, r, 0, 0, o, a);
        var p = d.toDataURL(u, l).replace(/^data:image\/(jpg|png|jpeg);base64,/, "");
        wx.publish("onCanvasToDataUrl", {
          dataUrl: p,
          cid: c,
          canvasId: this._canvasNumber
        })
      }
    },
    getImageData: function(e) {
      if (e.canvasId === this._canvasNumber) {
        var t = e.x,
          n = e.y,
          i = e.width,
          r = e.height,
          o = {
            width: 0,
            height: 0,
            data: []
          };
        t = Number(t) || 0, n = Number(n) || 0;
        try {
          o = this.$.canvas.getContext("2d").getImageData(t, n, i, r)
        } catch (e) {}
        wx.publish("onGetImageData", {
          width: o.width,
          height: o.height,
          data: uint8ClampedArrayToBase64(o.data),
          cid: e.cid,
          canvasId: this._canvasNumber
        })
      }
    },
    putImageData: function(e) {
      if (e.canvasId === this._canvasNumber) {
        var t = e.x,
          n = e.y,
          i = e.width,
          r = e.height,
          o = base64ToUint8ClampedArray(e.data);
        t = Number(t) || 0, n = Number(n) || 0, this.$.canvas.getContext("2d").putImageData(new ImageData(o, i, r), t, n)
      }
    },
    _updatePosition: function() {
      this.hidden || (this.$.canvas.width = this._box.width, this.$.canvas.height = this._box.height, WeixinJSBridge.publish("canvasUpdate", {
        canvasId: this.canvasId,
        canvasNumber: this._canvasNumber,
        position: this._box
      })), this._isMobile() ? this.hidden || this.updateNativeView("updateCanvas", {
        canvasId: this._canvasNumber,
        position: this._box
      }, function(e) {}) : this.actionsChanged(this.actions)
    },
    addTouchEventForWebview: function() {
      var e = this;
      touchEventNames.forEach(function(t) {
        e.$$.addEventListener(t, function(n) {
          var i = getCanvasTouches.call(e, n.touches),
            r = getCanvasTouches.call(e, n.changedTouches);
          e.bindlongtap && (e._longTapInfo = e._longTapInfo || {}, e._longTapCounter = e._longTapCounter || 0, "touchstart" === t ? r.forEach(function(t) {
            e._longTapInfo[t.identifier] = {}, e._longTapInfo[t.identifier].x = t.x, e._longTapInfo[t.identifier].y = t.y, e._longTapInfo[t.identifier].timeStamp = n.timeStamp, e._longTapInfo[t.identifier].handler = setTimeout(function() {
              if (e._longTapInfo.hasOwnProperty(t.identifier)) {
                e._longTapInfo[t.identifier].longPress = !0, ++e._longTapCounter;
                var i = [],
                  r = [];
                for (var o in e._longTapInfo) {
                  var a = {
                    identifier: o,
                    x: e._longTapInfo[o].x,
                    y: e._longTapInfo[o].y
                  };
                  i.push(a), o === String(t.identifier) && r.push(a)
                }
                wx.publishPageEvent(e.bindlongtap, {
                  type: "longtap",
                  timeStamp: e._longTapInfo[t.identifier].timeStamp + LONG_PRESS_TIME_THRESHOLD,
                  target: {
                    id: n.target.parentElement.id,
                    offsetLeft: n.target.offsetLeft,
                    offsetTop: n.target.offsetTop,
                    dataset: e.dataset
                  },
                  touches: i,
                  changedTouches: r
                }, e.getNodeId())
              }
            }, LONG_PRESS_TIME_THRESHOLD)
          }) : "touchend" === t || "touchcancel" === t ? r.forEach(function(n) {
            e._longTapInfo.hasOwnProperty(n.identifier) || console.error("in " + t + ", can not found " + n.identifier + " in " + JSON.stringify(e._longTapInfo)), e._longTapInfo[n.identifier].longPress && --e._longTapCounter, clearTimeout(e._longTapInfo[n.identifier].handler), delete e._longTapInfo[n.identifier]
          }) : r.forEach(function(n) {
            e._longTapInfo.hasOwnProperty(n.identifier) || console.error("in " + t + ", can not found " + n.identifier + " in " + JSON.stringify(e._longTapInfo)), calcDistance(e._longTapInfo[n.identifier], n) > LONG_PRESS_DISTANCE_THRESHOLD && !e._longTapInfo[n.identifier].longPress && clearTimeout(e._longTapInfo[n.identifier].handler), e._longTapInfo[n.identifier].x = n.x, e._longTapInfo[n.identifier].y = n.y
          })), e["bind" + t] && i.length + r.length > 0 && wx.publishPageEvent(e["bind" + t], {
            type: t,
            timeStamp: n.timeStamp,
            target: {
              id: n.target.parentElement.id,
              offsetLeft: n.target.offsetLeft,
              offsetTop: n.target.offsetTop,
              dataset: e.dataset
            },
            touches: i,
            changedTouches: r
          }, e.getNodeId());
          var o = !1;
          touchEventNames.forEach(function(t) {
            e["bind" + t] && (o = !0)
          }), (e.disableScroll && o || e._longTapCounter) && (n.preventDefault(), n.stopPropagation())
        })
      })
    },
    actionsChanged: function(e) {
      var t = this,
        n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
        i = arguments[2];
      if (!this._isMobile() && e) {
        if (this._actionsWaiting) return void this._actionsDefer.push([e, n, i]);
        var r = this.$.canvas,
          o = r.getContext("2d");
        !1 === n && (o.fillStyle = "#000000", o.strokeStyle = "#000000", o.shadowColor = "#000000", o.shadowBlur = 0, o.shadowOffsetX = 0, o.shadowOffsetY = 0, o.setTransform(1, 0, 0, 1, 0, 0), o.clearRect(0, 0, r.width, r.height));
        for (var a = 0; a < e.length; a++) {
          var s = e[a],
            l = s.method,
            c = s.data;
          if (/^set/.test(l)) {
            var u = l[3].toLowerCase() + l.slice(4),
              d = void 0;
            if ("fillStyle" === u || "strokeStyle" === u) {
              if ("normal" === c[0]) d = resolveColor(c[1]);
              else if ("linear" === c[0]) {
                var d = o.createLinearGradient.apply(o, c[1]);
                c[2].forEach(function(e) {
                  var t = e[0],
                    n = resolveColor(e[1]);
                  d.addColorStop(t, n)
                })
              } else if ("radial" === c[0]) {
                var h = c[1][0],
                  p = c[1][1],
                  f = c[1][2],
                  g = [h, p, 0, h, p, f],
                  d = o.createRadialGradient.apply(o, g);
                c[2].forEach(function(e) {
                  var t = e[0],
                    n = resolveColor(e[1]);
                  d.addColorStop(t, n)
                })
              }
              o[u] = d
            } else if ("globalAlpha" === u) o[u] = c[0] / 255;
            else if ("shadow" === u) {
              var A = ["shadowOffsetX", "shadowOffsetY", "shadowBlur", "shadowColor"];
              c.forEach(function(e, t) {
                o[A[t]] = "shadowColor" === A[t] ? resolveColor(e) : e
              })
            } else "fontSize" === u ? o.font = o.font.replace(/\d+\.?\d*px/, c[0] + "px") : "lineDash" === u ? (o.setLineDash(c[0]), o.lineDashOffset = c[1] || 0) : "textBaseline" === u ? ("normal" === c[0] && (c[0] = "alphabetic"), o[u] = c[0]) : o[u] = c[0]
          } else if ("fillPath" === l || "strokePath" === l) l = l.replace(/Path/, ""), o.beginPath(), c.forEach(function(e) {
            o[e.method].apply(o, e.data)
          }), o[l]();
          else if ("fillText" === l) o.fillText.apply(o, c);
          else if ("drawImage" === l) {
            var v = function() {
              var n = _toArray(c),
                r = n[0],
                s = n.slice(1);
              if (t._images = t._images || {}, r = r.replace("wxfile://", "http://wxfile.open.weixin.qq.com/"), r = t.getRealRoute(r), !t._images[r]) {
                var l = e.slice(a + 1);
                return t._actionsDefer.unshift([l, !0, i]), t._actionsWaiting = !0, t._images[r] = new Image, t._images[r].src = r, t._images[r].queue = [], t._images[r].onload = function() {
                  t._images[r].ready = !0, o.drawImage.apply(o, [t._images[r]].concat(_toConsumableArray(s.slice(4, 8)), _toConsumableArray(s.slice(0, 4)))), t._images[r].queue.forEach(function(e) {
                    o.drawImage.apply(o, [t._images[r]].concat(_toConsumableArray(e.slice(4, 8)), _toConsumableArray(e.slice(0, 4))))
                  }), t._images[r].queue = [], t._actionsWaiting = !1;
                  var e = t._actionsDefer.slice(0);
                  t._actionsDefer = [];
                  for (var n = e.shift(); n;) t.actionsChanged(n[0], n[1], n[2]), n = e.shift()
                }, "break"
              }
              t._images[r].ready ? o.drawImage.apply(o, [t._images[r]].concat(_toConsumableArray(s.slice(4, 8)), _toConsumableArray(s.slice(0, 4)))) : t._images[r].queue.push(s)
            }();
            if ("break" === v) break
          } else "clip" === l ? (c.forEach(function(e) {
            o[e.method].apply(o, e.data)
          }), o.clip()) : o[l].apply(o, c)
        }!this._actionsWaiting && i && wx.publish("onDrawCanvas", {
          errMsg: "drawCanvas:ok",
          cid: i,
          canvasId: this._canvasNumber
        })
      }
    },
    _hiddenChanged: function(e, t) {
      this._isMobile() ? (this.$$.style.display = e ? "none" : "", WeixinJSBridge.invoke("updateCanvas", {
        canvasId: this._canvasNumber,
        hide: e
      }, function(e) {})) : this.$$.style.display = e ? "none" : ""
    },
    disableScrollChanged: function(e, t) {
      if (this._isMobile()) {
        if (!this._isReady) return void this._deferred.push({
          callback: "disableScrollChanged",
          args: [e, t]
        });
        WeixinJSBridge.invoke("updateCanvas", {
          canvasId: this._canvasNumber,
          disableScroll: e
        }, function(e) {})
      }
    }
  }
}), window.exparser.registerElement({
  is: "wx-checkbox",
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "div",
      cl: {
        v: "wx-checkbox-wrapper"
      },
      a: [],
      c: [{
        t: 1,
        n: "div",
        id: "input",
        cl: {
          v: "wx-checkbox-input"
        },
        a: [{
          n: "wx-checkbox-input-checked",
          o: "c",
          e: function(e, t, n) {
            return e.checked
          },
          l: [null],
          b: [
            [null, "checked"]
          ]
        }, {
          n: "wx-checkbox-input-disabled",
          o: "c",
          e: function(e, t, n) {
            return e.disabled
          },
          l: [null],
          b: [
            [null, "disabled"]
          ]
        }, {
          n: "color",
          o: "s",
          e: function(e, i, r) {
            return t(r, n, "_getColor", [e.checked, e.color])
          },
          l: null,
          b: [
            [null, "_getColor"],
            [null, "checked"],
            [null, "color"]
          ]
        }],
        c: []
      }, {
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    }]
  },
  behaviors: ["wx-base", "wx-label-target", "wx-item", "wx-disabled"],
  properties: {
    color: {
      type: String,
      value: "#09BB07",
      public: !0
    }
  },
  listeners: {
    tap: "_inputTap"
  },
  methods: {
    _getColor: function(e, t) {
      return e ? t : ""
    },
    _inputTap: function() {
      if (this.disabled) return !1;
      this.checked = !this.checked, this.changedByTap()
    },
    handleLabelTap: function() {
      this._inputTap()
    }
  }
}), window.exparser.registerElement({
  is: "wx-checkbox-group",
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "slot",
      v: !0,
      sn: "",
      a: [],
      c: []
    }]
  },
  behaviors: ["wx-base", "wx-data-component", "wx-group"],
  properties: {
    value: {
      type: Array,
      value: []
    }
  },
  methods: {
    addItem: function(e) {
      e.checked && this.value.push(e.value)
    },
    removeItem: function(e) {
      if (e.checked) {
        var t = this.value.indexOf(e.value);
        t >= 0 && this.value.splice(t, 1)
      }
    },
    renameItem: function(e, t, n) {
      if (e.checked) {
        var i = this.value.indexOf(n);
        i >= 0 && (this.value[i] = t)
      }
    },
    changed: function(e) {
      if (e.checked) this.value.push(e.value);
      else {
        var t = this.value.indexOf(e.value);
        t >= 0 && this.value.splice(t, 1)
      }
    }
  }
});
var MAX_SIZE = 27,
  MIN_SIZE = 18,
  buttonTypes = {
    "default-dark": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABRCAYAAABBuPE1AAAAAXNSR0IArs4c6QAAA1tJREFUeAHtm89rE0EcxZttbA00ePBc8CLkEEMlNId69uKtWKt/gqRevcejeBNRj/aiKNibHpVST4GQ5gc9F/RYEaE1BNLG9y1ZSNXa3eyb7Ya8hWUmuztv5vuZN9nJTnZqSpsIiIAIiIAIiMB4EEiVSqXLnU7neb/fv4Umz41Hs09t5X4qlfqYyWTK1Wr1+6lXOTiRHkBcdaB9HpJzMMQqYrK678bZAG/gxDjrdF7XecTkIapxH87/6pjYYzKQ2ggEBJIA0SQEUiBJBEgycqRAkgiQZORIgSQRIMnIkQJJIkCSkSMFkkSAJCNHCiSJAElGjhRIEgGSjBxJApkm6SRaJp/P9x008CsW2p41m80nSPty5OiE57E29LhQKDw0CYEcHeRxScB8IJARIQ6KzwskB+SxioY2CaZACiSJAElGjhRIEgGSjBwpkCQCJBk5UiBJBEgycqRAkgiQZORIIsh9klaSZGKPybPXKZJEgNSWD77OwsLCop93mXr2TgpgvkMlsfeig8AshrfZbLbsax8eHq75eZdpKox40LUPdMwv6K61Wq1XYfTZ18KNNwDyM55iX2BrD+u12+2Ui8WvnXQ6fader+8MVxZ3HhCvAuJ71xD9uKgg4cT1mZmZcq1WM0fGvhWLxUtHR0dXer3ebey2KHUxrkZQQEYdykG/Ms6C0u12z7rE2XkGyEQMZWeEAgpHmpDbUJ6dnV087+/DgLE6vWwkR9pQxl7GvwzWnbZujMRDgQS8b4jtB+7K9+TCk70camhPT09fy+Vy1wXxJET7FGpC/ndxzhHWXZvTmvAqNiEP5cjwVUxOCYEk9bVACiSJAElGjhRIEgGSTFIc+YUUT+wy+JGyZZUmAiR+ry+jQW+w/4ydxIgVWluxv8YKw7JJJGJCPmIsIxXD5P8+ADwN+sDXJttBKkqEI4M0lHUNwLyE1k3seyxN05k4kBY01pI28eBlEc5s2mfGNpEgDdz29vYuQC4huyGQEQngeeoB3Lnied4jSEV6O2xiHen3AVzZB9AKHhGuIH/gHw+bTjxIH1ij0djAnXwJMHf9Y2FSgRyihTt6E8vJdhPatMNIPw2d/m9WIP/AgzX5PcC06dELgLS1cW1RCFQqFZksCkCVFQEREAEREIHEEvgNdubEHW4rptkAAAAASUVORK5CYII=",
    "default-light": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFIAAABRCAYAAABBuPE1AAAAAXNSR0IArs4c6QAAAsJJREFUeAHtm71KA0EUhbOijT8o6APY2FgoCFYW9nYK/pSWkvTaig9hrY2iYKmdIOgLWGgrqIUgIpKoIOh6RjMQgpid3bOb3cwZOEyMd86d++UmG3fdUklDBERABERABESgGAQCs80wDIcxbUNzUD9U5FHD5k+gchAET1kVYkEeIOFSVkkzynMIkMsZ5SpZkFUkLHonNjOrAeRA85Np/WxBhmklaKcvQP7Ul8UeurJI4kMOgSS9ygIpkCQCJBt1pECSCJBs1JECSSJAslFHCiSJAMlGHSmQJAIkG3WkQJIIkGzUkQJJIkCyUUcKpBsBXOBLY9zCdB36PRVvMrhtqxjRjZcaUq5xw5trNimDvBNI0ptLBxuBJBEg2agjBZJEgGSjjhRIEgGSjTpSIEkESDbqSIEkESDZqCMFkkSAZKOOJIM0dwJ02si0JtuR5naKThvHtiCci5y2j9Oau+vG5frcKffZGIi2JlNapV5ffiZzpjnieEXcart3jj3MQB8R9xw7zLnOiJmuEDfubE5egD2MQQ8R95wozHnrEbLtIKbX2Zi0ALkHoUloC3qHMhn2M5JRxhtMKrhytxPHzFQbZ11e1rBAXqOgRUA0s5fDfv1JUvwuFk/7DNHAS9KR5q1sbuU1IL0fcUDeg9oztOJ7FzZ2z88/CDQ+0eoxjglDiKkC4merWJffF/1g4wzSBY5LbNFBMg42Lrw6NlYgSS+tQAokiQDJRh0pkCQCJJs8deQFqaZ22JznCeQ8COxDL+0gETOn2eseZPbu38CX/zUo8llz/wg5VAyQs9Aj1HI42PoZCoKj0GUrkn7ScawaEPugo/9gOlr6Gw6IAbQJff0F1F8yMSsHxAWo1gwzpp3fywBxArpphOk3kQTVA+IIdFaHeZrASksBsQfahqZEIyEBQMzTX34Jq9FyERABERABERCBXwLfe8eGVVx752oAAAAASUVORK5CYII="
  };
window.exparser.registerElement({
    is: "wx-contact-button",
    behaviors: ["wx-base", "wx-native"],
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "wrapper",
        cl: {
          v: "wx-contact-button-wrapper"
        },
        a: [],
        c: []
      }]
    },
    properties: {
      type: {
        type: String,
        value: "default-dark",
        public: !0,
        observer: "typeChanged"
      },
      size: {
        type: Number,
        value: 36,
        public: !0,
        observer: "sizeChanged"
      },
      sessionFrom: {
        type: String,
        value: "wxapp",
        public: !0
      },
      businessId: {
        type: String,
        value: "",
        public: !0
      }
    },
    attached: function() {
      var e = this;
      if (this._isMobile(), 1) {
        var t = void 0;
        t = buttonTypes[this.type] ? buttonTypes[this.type] : buttonTypes["default-dark"], this.$.wrapper.style.backgroundImage = "url('" + t + "')", this.$.wrapper.addEventListener("click", function() {
          e._isMobile() ? wx.enterContact({
            sessionFrom: e.sessionFrom,
            businessId: e.businessId
          }) : alert("进入客服会话，sessionFrom: " + e.sessionFrom)
        })
      } else this._box = this._getBox(), wx.insertContactButton({
        position: this._box,
        buttonType: this.type,
        sessionFrom: this.sessionFrom,
        complete: function(t) {
          e.contactButtonId = t.contactButtonId, document.addEventListener("pageReRender", e._pageReRender.bind(e), !1)
        }
      })
    },
    detached: function() {
      this._isMobile()
    },
    methods: {
      sizeChanged: function(e, t) {
        this._box = this._getBox(), this.$.wrapper.style.width = this._box.width + "px", this.$.wrapper.style.height = this._box.height + "px", this._updateContactButton()
      },
      typeChanged: function(e, t) {
        if (this._isMobile(), 1) {
          var n = void 0;
          n = buttonTypes[this.type] ? buttonTypes[this.type] : buttonTypes["default-dark"], this.$.wrapper.style.backgroundImage = "url('" + n + "')"
        } else this._updateContactButton()
      },
      _updateContactButton: function() {
        this._isMobile(), 1
      },
      _getBox: function() {
        var e = this.$.wrapper.getBoundingClientRect(),
          t = this.size;
        return "number" != typeof t && (t = MIN_SIZE), t = t > MAX_SIZE ? MAX_SIZE : t, t = t < MIN_SIZE ? MIN_SIZE : t, {
          left: e.left + window.scrollX,
          top: e.top + window.scrollY,
          width: t,
          height: t
        }
      },
      _pageReRender: function() {
        this._updateContactButton()
      }
    }
  }),
  function() {
    var e = [];
    wx.on("onImageViewClick", function(t) {
      t.data = JSON.parse(t.data), e.forEach(function(e) {
        e(t)
      })
    });
    var t = "wechatdevtools" === wx.getPlatform(),
      n = {
        is: "wx-cover-image",
        template: function(e, t, n) {
          return [{
            t: 1,
            n: "div",
            id: "container",
            cl: {
              v: "wx-cover-image"
            },
            st: {
              v: "display: inherit;"
            },
            a: [],
            c: []
          }, {
            t: 1,
            n: "div",
            id: "content",
            cl: {
              v: "wx-cover-image"
            },
            st: {
              v: "display: none;"
            },
            a: [],
            c: [{
              t: 1,
              n: "slot",
              v: !0,
              sn: "",
              a: [],
              c: []
            }]
          }]
        },
        behaviors: ["wx-base", "wx-native", "wx-positioning-target", "wx-native-cover"],
        properties: {
          src: {
            type: String,
            value: "",
            observer: "_srcChanged",
            public: !0
          },
          bindtap: {
            type: String,
            value: "",
            public: !0
          },
          catchtap: {
            type: String,
            value: "",
            public: !0
          }
        },
        created: function() {
          e.push(this.handleCoverViewTap.bind(this))
        },
        attached: function() {},
        detached: function() {
          this.removeNativeView("removeImageView", {
            viewId: this._viewId
          }, function(e) {}), this._viewId = null
        },
        methods: {
          insert: function(e, t) {
            var n = this;
            e.iconPath = this.src.indexOf("wxfile://") > -1 || this.src.match(/^https?\:\/\//) ? this.src : this.getRealRoute(this.src, window.__route__), wxConsole.log("invoke insertImageView", e, window.__route__), wx.invoke("insertImageView", e, function(i) {
              i.errMsg.indexOf(":ok") > -1 && (n._viewId = e.viewId, n._args = {
                position: e.position,
                style: e.style,
                viewId: e.viewId
              }, "function" == typeof t && t(n._viewId))
            })
          },
          update: function(e, t) {
            if (!this._detached) {
              var n = e;
              if (!t) {
                var i = this.diff(e, this._args);
                if (!i) return;
                this._args = e, n = {
                  viewId: this._viewId
                }, i.forEach(function(t) {
                  n[t] = e[t]
                })
              }
              wxConsole.log("invoke updateImageView", n), wx.invoke("updateImageView", n, function(e) {});
              var r = window.navigator.userAgent;
              this._isiOS() && /MicroMessenger\/6\.5\.21/.test(r) && n.style && this._srcChanged(this.src)
            }
          },
          _update: function() {
            var e = this;
            if (t) {
              var n = this.getRealRoute(this.src.replace("wxfile://", "http://wxfile.open.weixin.qq.com/"));
              this.$.container.innerHTML = '<img src="' + n + '">'
            } else this.isParentInsert2WebLayer && wx.getLocalImgData({
              path: this.src.trim(),
              success: function(t) {
                e.$.container.innerHTML = '<img src="' + t.localData + '">'
              }
            })
          },
          _srcChanged: function(e) {
            if (this.isParentInsert2WebLayer || t) return void this._update();
            if (this._viewId) {
              var n = e.indexOf("wxfile://") > -1 || e.match(/^https?\:\/\//) ? e : this.getRealRoute(e, window.__route__);
              this.update({
                viewId: this._viewId,
                iconPath: n
              }, !0)
            }
          }
        }
      };
    window.exparser.registerElement(n)
  }(),
  function() {
    var e = [];
    wx.on("onTextViewClick", function(t) {
      t.data = JSON.parse(t.data), e.forEach(function(e) {
        e(t)
      })
    });
    var t = (wx.getPlatform(), {
      is: "wx-cover-view",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "container",
          cl: {
            v: "wx-cover-view"
          },
          st: {
            v: "display: inherit;"
          },
          a: [],
          c: []
        }, {
          t: 1,
          n: "div",
          id: "content",
          cl: {
            v: "wx-cover-view"
          },
          st: {
            v: "display: none;"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      },
      behaviors: ["wx-base", "wx-native", "wx-positioning-target", "wx-native-cover"],
      properties: {
        bindtap: {
          type: String,
          value: "",
          public: !0
        },
        catchtap: {
          type: String,
          value: "",
          public: !0
        }
      },
      created: function() {
        e.push(this.handleCoverViewTap.bind(this))
      },
      attached: function() {
        this.$.content.style.display = "inherit", this.$.container.style.display = "none"
      },
      detached: function() {
        this.removeNativeView("removeTextView", {
          viewId: this._viewId
        }, function(e) {}), this._viewId = null
      },
      methods: {
        insert: function(e, t) {
          var n = this;
          e.label = this.getLabelStyle(), wxConsole.log("invoke insertTextView", e), this.insertNativeView("insertTextView", e, function(i) {
            i.errMsg.indexOf(":ok") > -1 && (n._viewId = e.viewId, n._args = {
              position: e.position,
              style: e.style,
              viewId: e.viewId,
              label: e.label
            }, "function" == typeof t && t(i.containerId || n._viewId))
          })
        },
        update: function(e) {
          e.label = this.getLabelStyle();
          var t = this.diff(e, this._args);
          if (t) {
            this._args = e;
            var n = {
              viewId: this._viewId
            };
            t.forEach(function(t) {
              n[t] = e[t]
            }), wxConsole.log("invoke updateTextView", n), this.updateNativeView("updateTextView", n, function(e) {})
          }
        },
        _update: function() {
          var e = this.$.content,
            t = document.createDocumentFragment();
          this._content = "";
          for (var n = 0, i = e.childNodes.length; n < i; n++) {
            var r = e.childNodes.item(n);
            if (r.nodeType !== r.ELEMENT_NODE || !(["WX-COVER-VIEW", "WX-COVER-IMAGE"].indexOf(r.tagName) > -1) && r instanceof exparser.Component) {
              var o = document.createTextNode(r.textContent || "");
              t.appendChild(o), this._content += r.textContent
            } else t.appendChild(r.cloneNode(!0))
          }
          this._content = this._content.trim()
        },
        getLabelStyle: function() {
          var e = window.getComputedStyle(this.$$),
            t = parseFloat(e.fontSize) || 12,
            n = e.textAlign;
          "start" === n ? n = "left" : "end" === n ? n = "right" : -1 === ["left", "center", "right"].indexOf(n) && (n = "left");
          var i = parseFloat(e.fontWeight);
          if (isNaN(i)) switch (e.fontWeight) {
            case "bold":
            case "bolder":
              i = "bold";
              break;
            case "normal":
            case "lighter":
            default:
              i = "normal"
          } else i < 500 ? i = "normal" : i >= 500 && (i = "bold");
          var r = e.wordBreak,
            o = e.wordWrap,
            a = e.textOverflow,
            s = e.whiteSpace,
            l = e.overflow,
            c = "break-word";
          "visible" === l || "nowrap" !== s || "ellipsis" !== a && "clip" !== a ? "break-all" !== r && "break-all" !== o || (c = "break-all") : c = a;
          var u = "nowrap";
          return "nowrap" !== s && (u = "normal"), {
            color: this.getHexColor(e.color),
            fontSize: t,
            lineHeight: parseFloat(e.lineHeight) || 1.2 * t,
            textAlign: n,
            fontWeight: i,
            lineBreak: c,
            whiteSpace: u,
            content: this._content || ""
          }
        }
      }
    });
    window.exparser.registerElement(t)
  }(),
  function() {
    var e = ["birthday", "validity"],
      t = ["address", "company_address", "birth_place", "residence_place"],
      n = [];
    wx.on("onKeyboardDropdownOperate", function(e) {
      n.forEach(function(t) {
        "function" == typeof t && t(e)
      })
    }), window.exparser.registerElement({
      is: "wx-form",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "span",
          id: "wrapper",
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      },
      behaviors: ["wx-base"],
      properties: {
        reportSubmit: {
          type: Boolean,
          value: !1,
          public: !0
        }
      },
      listeners: {
        "this.formSubmit": "submitHandler",
        "this.formReset": "resetHandler",
        "this.wxDevInutDropdownOperate": "devAutoFillOperate"
      },
      attached: function() {
        var e = this;
        this._userData = [], this._autoFillNodes = [], this.autoFillDfs(this), this.getUserAutoFillDataFromSvr(), this.uniqueId = Date.now() / 1e3 | 0, n.push(this.autoFillOperate.bind(this)), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
          e.uniqueId = Date.now() / 1e3 | 0
        }), wx.onAppEnterForeground(function() {
          e.getUserAutoFillDataFromSvr()
        })
      },
      detached: function() {
        exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId)
      },
      methods: {
        resetDfs: function(e) {
          if (e.childNodes)
            for (var t = 0; t < e.childNodes.length; ++t) {
              var n = e.childNodes[t];
              n instanceof exparser.Element && (n instanceof exparser.Component && n.hasBehavior("wx-data-component") && n.resetFormData(), this.resetDfs(n))
            }
        },
        getFormData: function(e, t) {
          if (e instanceof exparser.Component) {
            if (e.hasBehavior("wx-data-component")) return "wx-input" === e.is || "wx-picker" === e.is || "wx-textarea" === e.is ? e.getFormData(function(e) {
              t(e)
            }) : t(e.getFormData());
            if (e.hasBehavior("wx://form-field")) return t(e.data.value)
          }
          return t()
        },
        asyncDfs: function(e, t) {
          var n = this,
            i = function() {
              "function" == typeof t && t(), t = void 0
            };
          if (!e.childNodes) return i();
          for (var r = e.childNodes.length, o = 0; o < e.childNodes.length; ++o) {
            var a = e.childNodes[o];
            a instanceof exparser.Element ? function(e) {
              n.getFormData(e, function(t) {
                if (void 0 !== t) {
                  var o = e.name || e.data.name;
                  o && (n._data[o] = t), n.willSaveAutoFillData(e, t)
                }
                n.asyncDfs(e, function() {
                  0 == --r && i()
                })
              })
            }(a) : --r
          }
          0 === r && i()
        },
        _asyncDfs: function(e) {
          var t = this;
          this.asyncDfs(this, function() {
            t.reportSubmit ? t._isDevTools() ? t.triggerEvent("submit", {
              value: t._data,
              formId: "the formId is a mock one",
              target: e
            }) : WeixinJSBridge.invoke("reportSubmitForm", {}, function(n) {
              t.triggerEvent("submit", {
                value: t._data,
                formId: n.formId,
                target: e
              })
            }) : t.triggerEvent("submit", {
              value: t._data,
              target: e
            }), t._autoFillData.length && (WeixinJSBridge.invoke("setUserAutoFillData", {
              dataList: JSON.stringify({
                user_data_list: t._autoFillData
              })
            }, function(e) {
              t.getUserAutoFillDataFromSvr()
            }), t._autoFillData = null)
          })
        },
        submitHandler: function(e) {
          var t = this,
            n = {
              id: e.target.id,
              dataset: e.target.dataset,
              offsetTop: e.target.$$.offsetTop,
              offsetLeft: e.target.$$.offsetLeft
            };
          return this._data = Object.create(null), this._autoFillData = [], 3 === this.autoFillAuthStatus ? WeixinJSBridge.invoke("requestAuthUserAutoFillData", {
            fields: this.getAllAutoFillFields() || [],
            wording: this.autoFillAuthInfo,
            authStatus: 3,
            authGroupList: this.autoFillAuthGroupList
          }, function(e) {
            e.errMsg.indexOf(":ok") > -1 ? void 0 !== e.confirm ? 1 === Number(e.confirm) ? t.autoFillAuthStatus = 1 : t.autoFillAuthStatus = 5 : t.autoFillAuthStatus = 1 : t.autoFillAuthStatus = 5, t._asyncDfs(n)
          }) : this._asyncDfs(n), !1
        },
        resetHandler: function(e) {
          var t = {
            id: e.target.id,
            dataset: e.target.dataset,
            offsetTop: e.target.$$.offsetTop,
            offsetLeft: e.target.$$.offsetLeft
          };
          return this._data = Object.create(null), this.resetDfs(this), this.triggerEvent("reset", {
            target: t
          }), !1
        },
        autoFillDfs: function(e) {
          if (e.childNodes)
            for (var t = 0; t < e.childNodes.length; t++) {
              var n = e.childNodes[t];
              n instanceof exparser.Element && (n instanceof exparser.Component && (n.hasBehavior("wx-input") || n.hasBehavior("wx-textarea") || n.hasBehavior("wx-picker")) && n.autoFill && this._autoFillNodes.push(n), this.autoFillDfs(n))
            }
        },
        getAllAutoFillFields: function() {
          return this._autoFillNodes.map(function(e) {
            return e.autoFill
          })
        },
        getUserAutoFillDataFromSvr: function(e) {
          var t = this;
          this._autoFillNodes.length && WeixinJSBridge.invoke("getUserAutoFillData", {
            fields: this.getAllAutoFillFields()
          }, function(n) {
            if (/:ok/.test(n.errMsg)) {
              try {
                t._userData = JSON.parse(n.userData).user_data_list || []
              } catch (e) {}
              t.autoFillAuthStatus = Number(n.authStatus), t.autoFillAuthInfo = n.authInfo, t.autoFillAuthGroupList = n.authGroupList, "function" == typeof e && e()
            } else {
              var i = Number(n.ret),
                r = (n.errMsg || "").match(/ErrMsg:(.*)/) || "";
              r && (r = r[1]), r && [10003, 10005, 10011].indexOf(i) > -1 && (console.error("拉取快速填充数据出错：" + r), t.triggerEvent("autofillerror", {
                errMsg: r
              }))
            }
          })
        },
        willSaveAutoFillData: function(n, i) {
          if ((i || 0 === i) && 1 === this.autoFillAuthStatus) {
            var r = n.autoFill,
              o = n._groupID,
              a = i,
              s = (r || "").split(".");
            if (2 === s.length && (!n.hasBehavior("wx-picker") || "selector" !== n.mode || (a = n.rangeKey ? n.range[i] && n.range[i][n.rangeKey] : n.range[i]) || 0 === a)) {
              for (var l = s[0], c = s[1], u = !1, d = 0; d < this._autoFillData.length; d++) {
                var h = this._autoFillData[d];
                if (h.group_key === l) {
                  var p = {
                    key: c
                  };
                  if (e.indexOf(c) > -1) {
                    var f = a.split("-");
                    p.date_info = {
                      year: f[0],
                      month: f[1] || null,
                      day: f[2] || null
                    }
                  } else t.indexOf(c) > -1 ? p.address_info = {
                    province: a[0] || "",
                    city: a[1] || "",
                    region: a[2] || ""
                  } : p.value = a;
                  h.group_info.field_list.push(p), u = !0;
                  break
                }
              }
              if (!u) {
                var g = {
                  group_key: l,
                  group_info: {
                    field_list: [{
                      key: c,
                      value: a
                    }]
                  }
                };
                "number" == typeof o || (g.group_info.unique_id = this.uniqueId), this._autoFillData.push(g)
              }
            }
          }
        },
        getAutoFillData: function(e, t) {
          var n = [],
            i = !1,
            r = [];
          this._autoFillNodes.forEach(function(t) {
            0 === (t.autoFill || "").indexOf(e + ".") && (i |= !(!t.value && !t._value), r.push(t))
          }), i || r.forEach(function(e) {
            e._groupID = null
          }), this._userData.forEach(function(i) {
            i.group_key === e && i.group_info_list.forEach(function(e) {
              if (e.field_list && e.field_list.length)
                for (var i = 0; i < e.field_list.length; i++) {
                  var r = e.field_list[i];
                  if (r.key === t) {
                    n.push(e);
                    break
                  }
                }
            })
          });
          var o = this.getAllAutoFillFields();
          return n.forEach(function(t) {
            t.field_list.sort(function(t, n) {
              return o.indexOf(e + "." + t.key) < o.indexOf(e + "." + n.key) ? -1 : 1
            })
          }), n
        },
        delAutoFillData: function(e, t) {
          this._userData.forEach(function(n) {
            n.group_key === e && n.group_info_list.forEach(function(e, i) {
              e.group_id === t && n.group_info_list.splice(i, 1)
            })
          }), WeixinJSBridge.invoke("deleteUserAutoFillData", {
            groupKey: e,
            groupId: t
          }, function(e) {})
        },
        fillData: function(n, i, r, o) {
          var a = {},
            s = {};
          if (this._autoFillNodes.reduce(function(e, t) {
              return e | t._inputId === o
            }, 0)) {
            var l = !1;
            this._userData.forEach(function(o) {
              o.group_key === n && o.group_info_list.forEach(function(o) {
                l || o.group_id === i && (a = o, o.field_list.forEach(function(i) {
                  if (i.key === r && (l = !0), e.indexOf(i.key) > -1) a[n + "." + i.key] = i.date_info;
                  else if (t.indexOf(i.key) > -1) {
                    var o = i.address_info || {};
                    a[n + "." + i.key] = [o.province, o.city, o.region]
                  } else a[n + "." + i.key] = i.value
                }))
              })
            }), this._autoFillNodes.forEach(function(e) {
              var t = a[e.autoFill];
              if (0 === (e.autoFill || "").indexOf(n + ".") && (e._groupID = i), t)
                if (e.hasBehavior("wx-input") || e.hasBehavior("wx-textarea")) e.value = t, e._keyboardShow ? wx.hideKeyboard() : e.triggerEvent("change", {
                  value: e.value
                }), s[e.autoFill] = e.value;
                else if (e.hasBehavior("wx-picker")) {
                var r = !1;
                if ("date" === e.mode) {
                  var o = [];
                  if (!t.year) return;
                  o.push(t.year), t.month && (o.push(("00" + t.month).substr(-2)), t.day && o.push(("00" + t.day).substr(-2))), e.value = o.join("-"), r = e.value
                } else if ("time" === e.mode) e.value = t, r = e.value;
                else if ("selector" === e.mode)
                  for (var l = 0; l < e.range.length; l++) {
                    var c = e.range[l];
                    if (e.rangeKey) {
                      if (c[e.rangeKey] == t) {
                        e.value = l, r = l;
                        break
                      }
                    } else if (e.range[l] == t) {
                      e.value = l, r = l;
                      break
                    }
                  } else "region" === e.mode && (e.value = t, r = t);
                !1 !== r && (e.triggerEvent("change", {
                  value: r
                }), s[e.autoFill] = r)
              }
            }), this.triggerEvent("autofill", {
              value: s
            })
          }
        },
        autoFillOperate: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = (e.id || "").split(".");
          if (3 === t.length) {
            var n = t[0],
              i = Number(t[1]),
              r = t[2];
            "delete" === e.type ? this.delAutoFillData(n, i) : "select" === e.type && this.fillData(n, i, r, Number(e.inputId))
          }
        },
        devAutoFillOperate: function(e) {
          this.autoFillOperate(e.detail)
        }
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-icon",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "i",
        cl: {
          e: function(e, t, n) {
            return "wx-icon-" + e.type
          },
          b: [
            [null, "type"]
          ]
        },
        a: [{
          n: "color",
          o: "s",
          e: function(e, t, n) {
            return e.color
          },
          l: [null],
          b: [
            [null, "color"]
          ]
        }, {
          n: "font-size",
          o: "s",
          e: function(e, t, n) {
            return e.size + "px"
          },
          l: null,
          b: [
            [null, "size"]
          ]
        }],
        c: []
      }]
    },
    behaviors: ["wx-base"],
    properties: {
      type: {
        type: String,
        public: !0
      },
      size: {
        type: Number,
        value: 23,
        public: !0
      },
      color: {
        type: String,
        public: !0
      }
    }
  });
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function() {
  var e = function() {
    var e = Object.create(null),
      t = 0,
      n = function(e, t, n) {
        var i, r, o, a = null,
          s = 0;
        n || (n = {});
        var l = function() {
          s = !1 === n.leading ? 0 : Date.now(), a = null, o = e.apply(i, r), a || (i = r = null)
        };
        return function() {
          var c = Date.now();
          s || !1 !== n.leading || (s = c);
          var u = t - (c - s);
          return i = this, r = arguments, u <= 0 || u > t ? (a && (clearTimeout(a), a = null), s = c, o = e.apply(i, r), a || (i = r = null)) : a || !1 === n.trailing || (a = setTimeout(l, u)), o
        }
      },
      i = function() {
        for (var t in e) {
          var n = e[t];
          n._hasScrollViewParent && c(n.$$) && n._showImage(n._changeId)
        }
      },
      r = function() {
        for (var t in e) {
          var n = e[t];
          c(n.$$) && n._showImage(n._changeId)
        }
      };
    document.addEventListener("wx-scroll-view", n(i, 200));
    var o = n(r, 200);
    document.addEventListener("scroll", o);
    var a = function() {
        for (var n = t++; e[n];) n = t++;
        return n
      },
      s = function e(t) {
        var n = t.parentNode;
        return !!n && (!!(n instanceof exparser.Component && n.hasBehavior("wx-scroll-view")) || e(n))
      },
      l = function(e, t) {
        return !(e.left > t.right || e.top > t.bottom || t.left > e.right || t.top > e.bottom)
      },
      c = function(e) {
        var t = 2 * document.documentElement.clientWidth,
          n = 2 * document.documentElement.clientHeight;
        return l(e.getBoundingClientRect(), {
          top: -n,
          right: document.documentElement.clientWidth + t,
          bottom: document.documentElement.clientHeight + n,
          left: -t
        })
      };
    return {
      registerInstance: function(t) {
        if (!t._imageInstanceId) {
          var n = t._imageInstanceId = a();
          e[n] = t
        }
      },
      deregisterInstance: function(t) {
        t._imageInstanceId && (delete e[t._imageInstanceId], t._imageInstanceId = void 0)
      },
      hasScrollViewParent: s,
      isNodeVisible: c,
      checkUnloadedImages: o
    }
  }();
  window.exparser.registerElement({
    is: "wx-image",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "div",
        a: [],
        c: []
      }]
    },
    behaviors: ["wx-base"],
    properties: {
      src: {
        type: String,
        observer: "srcChanged",
        public: !0
      },
      mode: {
        type: String,
        observer: "modeChanged",
        public: !0
      },
      lazyLoad: {
        type: Boolean,
        value: !1,
        observer: "lazyLoadChanged",
        public: !0
      },
      _disableSizePositionRepeat: {
        type: Boolean,
        value: !1
      },
      backgroundSize: {
        type: String,
        observer: "backgroundSizeChanged",
        value: "100% 100%",
        public: !0
      },
      backgroundPosition: {
        type: String,
        observer: "backgroundPositionChanged",
        public: !0
      },
      backgroundRepeat: {
        type: String,
        observer: "backgroundRepeatChanged",
        value: "no-repeat",
        public: !0
      },
      _hasScrollViewParent: {
        type: Boolean,
        value: !1
      },
      _imageInstanceId: {
        type: String
      }
    },
    created: function() {
      this._attached = !1, this._pageReRenderCallback = this._pageReRenderCallback.bind(this), this._showImage = this._showImage.bind(this), this._changeId = 0
    },
    attached: function() {
      this._hasScrollViewParent = e.hasScrollViewParent(this), this._attached = !0, this._originalHeight = this.$$.style.height || "", this.src && this._initialize(this.lazyLoad), this.backgroundSizeChanged(this.backgroundSize), this.backgroundRepeatChanged(this.backgroundRepeat)
    },
    detached: function() {
      this._attached = !1, this.lazyLoad && e.deregisterInstance(this), document.removeEventListener("pageReRender", this._pageReRenderCallback)
    },
    methods: {
      _initialize: function(t) {
        !t || e.isNodeVisible(this.$$) ? this._showImage(this._changeId) : e.registerInstance(this)
      },
      _getImagePath: function(e, t) {
        if (void 0 !== (void 0 === e ? "undefined" : _typeof(e)) && "function" == typeof t) {
          e = this.getRealRoute(e), e = e.trim();
          var n = window.navigator.userAgent.toLowerCase(),
            i = this,
            r = {
              success: function(e) {
                t(e.localData), window.requestAnimationFrame(function() {
                  i.$.div.style.transform = "translateZ(0)"
                })
              },
              fail: function(e) {
                i.triggerEvent("error", e)
              }
            };

          var o = wx.getRealRoute(window.__route__, (i.ownerShadowRoot ? "/" : "") + e);
          t(o)
          if (!/wechatdevtools/.test(n) && /iphone/.test(n)) {
            if (/^(http|https):\/\//.test(e) || /^\s*data:image\//.test(e) || "" === e) {
              t(e)
            }else{
              if (/^wxfile:\/\//.test(e)) {
                (r.filePath = e, wx.getLocalImgData(r))
              }else{
                var o = wx.getRealRoute(window.__route__, (i.ownerShadowRoot ? "/" : "") + e);
                t(o)
              }
            }
          }
        }
      },
      _showImage: function(t) {
        var n = this;
        this._getImagePath(this.src, function(i) {
          var r = new Image;
          r.onerror = function(e) {
            e.stopPropagation(), t === n._changeId && (n.triggerEvent("error", {
              errMsg: "GET " + i + " 404 (Not Found)"
            }), r = void 0)
          }, r.onload = function(e) {
            if (e.stopPropagation(), t === n._changeId) {
              n.triggerEvent("load", {
                width: this.width,
                height: this.height
              });
              var i = n.rate = this.width / this.height;
              "widthFix" === n.mode && (n.$$.style.height = n.$$.offsetWidth / i + "px", document.dispatchEvent(new CustomEvent("pageReRender", {}))), r = void 0, document.addEventListener("pageReRender", n._pageReRenderCallback), window.requestAnimationFrame(function() {
                n.$.div.style.transform = "translateZ(0)", window.requestAnimationFrame(function() {
                  n.$.div.style.transform = ""
                })
              })
            }
          }, e.deregisterInstance(n), r.src = i, n.$.div.style.backgroundImage = "url('" + i + "')"
        })
      },
      _pageReRenderCallback: function() {
        "widthFix" === this.mode && void 0 !== this.rate && (this.$$.style.height = this.$$.offsetWidth / this.rate + "px"), e.checkUnloadedImages()
      },
      srcChanged: function(e, t) {
        if (this._attached && e !== t) {
          var n = this;
          setTimeout(function() {
            n._changeId++, document.removeEventListener("pageReRender", n._pageReRenderCallback), n._initialize(n.lazyLoad)
          })
        }
      },
      _checkMode: function(e) {
        for (var t = ["scaleToFill", "aspectFit", "aspectFill", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"], n = !1, i = 0; i < t.length; i++)
          if (e === t[i]) {
            n = !0;
            break
          }
        return n
      },
      lazyLoadChanged: function(e, t) {
        e !== t && t && this._initialize(e)
      },
      modeChanged: function(e, t) {
        if (!this._checkMode(e)) return void(this._disableSizePositionRepeat = !1);
        switch ("widthFix" === t && (this.$$.style.height = this._originalHeight), this._disableSizePositionRepeat = !0, this.$.div.style.backgroundSize = "auto auto", this.$.div.style.backgroundPosition = "0% 0%", this.$.div.style.backgroundRepeat = "no-repeat", e) {
          case "scaleToFill":
            this.$.div.style.backgroundSize = "100% 100%";
            break;
          case "aspectFit":
            this.$.div.style.backgroundSize = "contain", this.$.div.style.backgroundPosition = "center center";
            break;
          case "aspectFill":
            this.$.div.style.backgroundSize = "cover", this.$.div.style.backgroundPosition = "center center";
            break;
          case "widthFix":
            this.$.div.style.backgroundSize = "100% 100%";
            break;
          case "top":
            this.$.div.style.backgroundPosition = "top center";
            break;
          case "bottom":
            this.$.div.style.backgroundPosition = "bottom center";
            break;
          case "center":
            this.$.div.style.backgroundPosition = "center center";
            break;
          case "left":
            this.$.div.style.backgroundPosition = "center left";
            break;
          case "right":
            this.$.div.style.backgroundPosition = "center right";
            break;
          case "top left":
            this.$.div.style.backgroundPosition = "top left";
            break;
          case "top right":
            this.$.div.style.backgroundPosition = "top right";
            break;
          case "bottom left":
            this.$.div.style.backgroundPosition = "bottom left";
            break;
          case "bottom right":
            this.$.div.style.backgroundPosition = "bottom right"
        }
      },
      backgroundSizeChanged: function(e, t) {
        this._disableSizePositionRepeat || (this.$.div.style.backgroundSize = e)
      },
      backgroundPositionChanged: function(e, t) {
        this._disableSizePositionRepeat || (this.$.div.style.backgroundPosition = e)
      },
      backgroundRepeatChanged: function(e, t) {
        this._disableSizePositionRepeat || (this.$.div.style.backgroundRepeat = e)
      }
    }
  })
}(),
function() {
  function e(e) {
    return e = Number(e), isNaN(e) ? -1 : e
  }
  if (/wechatdevtools/.test(window.navigator.userAgent.toLowerCase())) {
    var t = 0,
      n = !1,
      i = ["birthday", "validity"],
      r = ["address", "company_address", "birth_place", "residence_place"];
    window.exparser.registerElement({
      is: "wx-input",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "wrapper",
          a: [{
            n: "disabled",
            o: "$",
            e: function(e, t, n) {
              return e.disabled
            },
            l: [null],
            b: [
              [null, "disabled"]
            ]
          }],
          c: [{
            t: 1,
            n: "input",
            id: "input",
            a: [{
              n: "type",
              o: "$",
              e: function(e, i, r) {
                return t(r, n, "_getType", [e.type, e.password])
              },
              l: null,
              b: [
                [null, "_getType"],
                [null, "type"],
                [null, "password"]
              ]
            }, {
              n: "maxlength",
              o: "$",
              e: function(e, t, n) {
                return e.maxlength
              },
              l: [null],
              b: [
                [null, "maxlength"]
              ]
            }, {
              n: "value",
              o: "$",
              e: function(e, t, n) {
                return e.showValue
              },
              l: [null],
              b: [
                [null, "showValue"]
              ]
            }, {
              n: "disabled",
              o: "$",
              e: function(e, t, n) {
                return e.disabled
              },
              l: [null],
              b: [
                [null, "disabled"]
              ]
            }],
            c: []
          }, {
            t: 1,
            n: "div",
            id: "placeholder",
            cl: {
              e: function(e, t, n) {
                return "input-placeholder " + e._prefixedPlaceholderClass
              },
              b: [
                [null, "_prefixedPlaceholderClass"]
              ]
            },
            st: {
              e: function(e, i, r) {
                return t(r, n, "_getPlaceholderStyle", [e.placeholderStyle])
              },
              b: [
                [null, "_getPlaceholderStyle"],
                [null, "placeholderStyle"]
              ]
            },
            a: [{
              n: "parse-text-content",
              v: ""
            }],
            c: [{
              c: "",
              e: function(e, t, n) {
                return e.placeholder
              },
              b: [
                [null, "placeholder"]
              ],
              t: 3
            }]
          }, {
            t: 1,
            n: "ul",
            id: "dropdown",
            st: {
              v: "display: none;"
            },
            a: [],
            c: []
          }]
        }]
      },
      behaviors: ["wx-base", "wx-class-prefix", "wx-data-component"],
      properties: {
        focus: {
          type: Boolean,
          value: 0,
          filter: "_focusChange",
          public: !0
        },
        autoFocus: {
          type: Boolean,
          value: !1,
          public: !0
        },
        placeholder: {
          type: String,
          value: "",
          observer: "_placeholderChange",
          public: !0
        },
        placeholderStyle: {
          type: String,
          value: "",
          public: !0
        },
        placeholderClass: {
          type: String,
          value: "",
          public: !0,
          observer: "_placeholderClassChange"
        },
        dropdownStyle: {
          type: Object,
          value: {},
          public: !0
        },
        value: {
          type: String,
          value: "",
          filter: "defaultValueChange",
          public: !0
        },
        showValue: {
          type: String,
          value: ""
        },
        maxlength: {
          type: Number,
          value: 140,
          observer: "_maxlengthChanged",
          public: !0
        },
        type: {
          type: String,
          value: "text",
          public: !0
        },
        password: {
          type: Boolean,
          value: !1,
          public: !0
        },
        disabled: {
          type: Boolean,
          value: !1,
          public: !0
        },
        bindinput: {
          type: String,
          value: "",
          public: !0
        },
        confirmHold: {
          type: Boolean,
          value: !1,
          public: !0
        },
        cursor: {
          type: null,
          value: -1,
          public: !0
        },
        selectionStart: {
          type: null,
          value: -1,
          public: !0
        },
        selectionEnd: {
          type: null,
          value: -1,
          public: !0
        }
      },
      data: {
        _prefixedPlaceholderClass: ""
      },
      listeners: {
        tap: "_inputFocus",
        "input.focus": "_inputFocus",
        "input.blur": "_inputBlur",
        "input.input": "_inputKey",
        "dropdown.touchstart": "_touchDropdown",
        "dropdown.touchmove": "_touchDropdown",
        "dropdown.touchend": "_tapDropdown",
        "dropdown.touchcancel": "_touchDropdown"
      },
      attached: function() {
        this._inputId = t++, this._attachedCb()
      },
      detached: function() {
        this._detachedCb()
      },
      methods: {
        resetFormData: function() {
          this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this.value = "", this.showValue = ""
        },
        getFormData: function(e) {
          this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
        },
        _formGetDataCallback: function() {
          "function" == typeof this.__formCallback && this.__formCallback(this.value), this.__formCallback = void 0
        },
        _focusChange: function(e) {
          return this._couldFocus(e), e
        },
        _couldFocus: function(t) {
          var n = this;
          this._attached && (!this._keyboardShow && t ? window.requestAnimationFrame(function() {
            n.selectionStart = e(n.selectionStart), n.selectionEnd = e(n.selectionEnd), n.cursor = e(n.cursor), n._inputFocus(null, n.cursor, n.selectionStart, n.selectionEnd)
          }) : this._keyboardShow && !t && this.$.input.blur())
        },
        _maxlengthChanged: function(e, t) {
          var n = this.value.slice(0, e);
          n != this.value && (this.value = n)
        },
        _placeholderChange: function() {
          this._checkPlaceholderStyle(this.value)
        },
        _attachedCb: function() {
          var e = this;
          this._placeholderClassChange(this.placeholderClass), this._checkPlaceholderStyle(this.value), this._attached = !0, this._value = this.value, this.updateInput(), window.__onAppRouteDone && this._couldFocus(this.autoFocus || this.focus), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
            e._couldFocus(e.autoFocus || e.focus)
          }), this.__setKeyboardValueId = exparser.addListenerToElement(document, "setKeyboardValue", function(t) {
            if (e._keyboardShow) {
              var n = t.detail.value,
                i = t.detail.cursor;
              void 0 !== n && (e._value = n, e.value = n), void 0 !== i && -1 != i && (e.$.input.setSelectionRange(i, i), e.cursor = i)
            }
          }), this.__hideKeyboardId = exparser.addListenerToElement(document, "hideKeyboard", function(t) {
            e._keyboardShow && e.$.input.blur()
          }), this.__onDocumentTouchStart = this.onDocumentTouchStart.bind(this), this.__updateInput = this.updateInput.bind(this), this.__inputKeyUp = this._inputKeyUp.bind(this), this.$.input.addEventListener("keyup", this.__inputKeyUp), document.addEventListener("touchstart", this.__onDocumentTouchStart), document.addEventListener("pageReRender", this.__updateInput), (this.autoFocus || this.focus) && setTimeout(function() {
            e._couldFocus(e.autoFocus || e.focus)
          }, 500)
        },
        _detachedCb: function() {
          document.removeEventListener("pageReRender", this.__updateInput), document.removeEventListener("touchstart", this.__onDocumentTouchStart), this.$.input.removeEventListener("keyup", this.__inputKeyUp), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "hideKeyboard", this.__hideKeyboardId), exparser.removeListenerFromElement(document, "setKeyboardValue", this.__setKeyboardValueId)
        },
        onDocumentTouchStart: function(e) {
          var t = e.target;
          for (this.$.input; t;) {
            if (t === this.$.input || t === this.$.dropdown) return;
            t = t.parentNode
          }
          this._keyboardShow && this.$.input.blur()
        },
        _getType: function(e, t) {
          return t || "password" == e ? "password" : "text"
        },
        _showValueChange: function(e) {
          this.$.input.value = e
        },
        getForm: function() {
          for (var e = void 0, t = this.parentNode; t;) {
            if (t instanceof exparser.Component && t.hasBehavior("wx-form")) {
              e = t;
              break
            }
            t = t.parentNode
          }
          return e
        },
        _showDropdown: function() {
          var e = this;
          if (this.autoFill) {
            var t = this.autoFill.split(".");
            if (2 == t.length) {
              var n = t[0],
                o = t[1],
                a = this.getForm();
              if (a && (1 === a.autoFillAuthStatus || 3 === a.autoFillAuthStatus)) {
                var s = a.getAutoFillData(n, o),
                  l = s.map(function(t) {
                    var a = "",
                      s = [];
                    return t.field_list.forEach(function(t) {
                      if (i.indexOf(t.key) > -1) {
                        var n = [],
                          l = t.date_info;
                        if (!l.year) return;
                        n.push(l.year), l.month && (n.push(("00" + l.month).substr(-2)), l.day && n.push(("00" + l.day).substr(-2))), t.value = n.join("-")
                      }
                      if (r.indexOf(t.key) > -1) {
                        var c = t.address_info || {};
                        t.value = [c.province, c.city, c.region].join("")
                      }
                      t.key === o ? a = t.value : "number" != typeof e._groupID && t.value && s.push(t.value)
                    }), {
                      id: n + "." + t.group_id + "." + o,
                      title: a,
                      content: s.join(",")
                    }
                  }),
                  c = "number" == typeof this._groupID ? [] : l,
                  u = [];
                "number" == typeof this._groupID && l.forEach(function(e) {
                  e.content || -1 !== u.indexOf(e.title) || (u.push(e.title), c.push(e))
                });
                var d = "%%?" + (this.dropdownStyle.marginLeft || 0) + "?%%",
                  h = wx.transformRpx(d);
                h = h === d ? parseFloat(this.dropdownStyle.marginLeft || 0) : parseFloat(h), d = "%%?" + (this.dropdownStyle.marginRight || 0) + "?%%";
                var p = wx.transformRpx(d);
                p = p === d ? parseFloat(this.dropdownStyle.marginRight || 0) : parseFloat(p);
                var f = this.$.input.getBoundingClientRect();
                "input" === this.dropdownStyle.width ? (this.$.dropdown.style.left = f.left + h + "px", this.$.dropdown.style.right = window.innerWidth - (f.right - p) + "px") : (this.$.dropdown.style.left = f.left + "px", this.$.dropdown.style.right = window.innerWidth - f.right + "px"), this.$.dropdown.innerHTML = "", c.forEach(function(t) {
                  var n = document.createElement("li");
                  n.setAttribute("data-id", t.id), n.innerHTML = '\n          <p class="title">' + t.title + '</p>\n          <p class="content">' + t.content + '</p>\n          <p class="del">✕</p>\n        ', e.$.dropdown.appendChild(n)
                }), c.length && (this.$.dropdown.style.display = "block")
              }
            }
          }
        },
        _hideDropdown: function() {
          this.$.dropdown.innerHTML = "", this.$.dropdown.style.display = "none"
        },
        _triggerDropdownOperate: function(e, t) {
          var n = e.parentNode.dataset.id,
            i = this._inputId;
          n && this.triggerEvent("wxDevInutDropdownOperate", {
            id: n,
            type: t,
            inputId: i
          }, {
            bubbles: !0
          })
        },
        _touchDropdown: function() {
          return !1
        },
        _tapDropdown: function(e) {
          var t = e.__originalEvent && e.__originalEvent.target;
          t && (["title", "content"].indexOf(t.className) > -1 ? (this._triggerDropdownOperate(t, "select"), this._hideDropdown(), this.$.input.blur()) : "del" === t.className && (this._triggerDropdownOperate(t, "delete"), this.$.dropdown.removeChild(t.parentNode), 0 === this.$.dropdown.childNodes.length && this._hideDropdown()))
        },
        _inputFocus: function(e, t, i, r) {
          var o = this;
          if (!(this.disabled || this._keyboardShow || n)) {
            if (this.autoFill) {
              var a = this.getForm();
              if (a && 2 === a.autoFillAuthStatus) return n = !0, WeixinJSBridge.invoke("requestAuthUserAutoFillData", {
                fields: a.getAllAutoFillFields() || [],
                wording: a.autoFillAuthInfo,
                authStatus: 2,
                authGroupList: a.autoFillAuthGroupList
              }, function(e) {
                e.errMsg.indexOf(":ok") > -1 ? a.autoFillAuthStatus = 1 : a.autoFillAuthStatus = 5, n = !1, o._focusInputWithSelection(t, i, r)
              }), !1
            }
            this._focusInputWithSelection(t, i, r)
          }
        },
        _focusInputWithSelection: function(e, t, n) {
          this._keyboardShow = !0, this.triggerEvent("focus", {
            value: this.value
          }), this.$.input.focus(), "number" == typeof t && "number" == typeof n && -1 !== t ? this.$.input.setSelectionRange(t, n) : "number" == typeof e && this.$.input.setSelectionRange(e, e), this.selectionStart = -1, this.selectionEnd = -1, this.cursor = -1, this._showDropdown()
        },
        _inputBlur: function(e) {
          this._keyboardShow = !1, this.value = this._value, this._formGetDataCallback(), this.triggerEvent("change", {
            value: this.value
          }), this.triggerEvent("blur", {
            value: this.value
          }), this._checkPlaceholderStyle(this.value), this._hideDropdown()
        },
        _inputKeyUp: function(e) {
          if (13 == e.keyCode) return this.triggerEvent("confirm", {
            value: this._value
          }), void(this.confirmHold || (this.value = this._value, this.$.input.blur()))
        },
        _inputKey: function(e) {
          var t = e.target.value;
          if (this._value = t, this._checkPlaceholderStyle(t), this.bindinput) {
            var n = {
              id: this.id,
              dataset: this.dataset,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            };
            WeixinJSBridge.publish("SPECIAL_PAGE_EVENT", {
              eventName: this.bindinput,
              data: {
                ext: {
                  setKeyboardValue: !0
                },
                data: {
                  type: "input",
                  timeStamp: Date.now(),
                  detail: {
                    value: e.target.value,
                    cursor: this.$.input.selectionStart
                  },
                  target: n,
                  currentTarget: n,
                  touches: []
                },
                eventName: this.bindinput,
                nodeId: this.getNodeId()
              }
            })
          }
          return !1
        },
        updateInput: function() {
          var e = window.getComputedStyle(this.$$),
            t = this.$$.getBoundingClientRect(),
            n = (["Left", "Right"].map(function(t) {
              return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
            }), ["Top", "Bottom"].map(function(t) {
              return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
            })),
            i = this.$.input,
            r = t.height - n[0] - n[1];
          r != this.__lastHeight && (i.style.height = r + "px", i.style.lineHeight = r + "px", this.__lastHeight = r), i.style.color = e.color;
          var o = this.$.placeholder;
          o.style.height = t.height - n[0] - n[1] + "px", o.style.lineHeight = o.style.height
        },
        defaultValueChange: function(e, t) {
          return this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._checkPlaceholderStyle(e), this._showValueChange(e), this._value = e, e
        },
        _getPlaceholderStyle: function(e) {
          return e
        },
        _placeholderClassChange: function(e) {
          var t = e.split(/\s+/),
            n = this ? this.getClassPrefix() : "";
          this._placeholderClass = [];
          for (var i = 0; i < t.length; i++) t[i] && this._placeholderClass.push(n + t[i]);
          this.setData({
            _prefixedPlaceholderClass: this._placeholderClass.join(" ")
          })
        },
        _checkPlaceholderStyle: function(e) {
          var t = this._placeholderClass || [],
            n = this.$.placeholder;
          if (e) {
            if (this._placeholderShow && (n.classList.remove("input-placeholder"), n.setAttribute("style", ""), t.length > 0))
              for (var i = 0; i < t.length; i++) n.classList.contains(t[i]) && n.classList.remove(t[i]);
            n.style.display = "none", this._placeholderShow = !1
          } else {
            if (!this._placeholderShow && (n.classList.add("input-placeholder"), this.placeholderStyle && n.setAttribute("style", this.placeholderStyle), t.length > 0))
              for (var i = 0; i < t.length; i++) n.classList.add(t[i]);
            n.style.display = "", this.updateInput(), this._placeholderShow = !0
          }
        }
      }
    })
  }
}(),
function() {
  function e(e) {
    return e = Number(e), isNaN(e) ? -1 : e
  }
  if (!/wechatdevtools/.test(window.navigator.userAgent.toLowerCase())) {
    var t = wx.getPlatform(),
      n = !1,
      i = ["birthday", "validity"],
      r = ["address", "company_address", "birth_place", "residence_place"];
    window.exparser.registerElement({
      is: "wx-input",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "wrapper",
          a: [{
            n: "disabled",
            o: "$",
            e: function(e, t, n) {
              return e.disabled
            },
            l: [null],
            b: [
              [null, "disabled"]
            ]
          }],
          c: [{
            t: 1,
            n: "input",
            st: {
              v: "visibility:hidden"
            },
            a: [{
              n: "disabled",
              v: ""
            }],
            c: []
          }, {
            t: 1,
            n: "div",
            id: "input",
            a: [{
              n: "parse-text-content",
              v: ""
            }],
            c: [{
              c: "",
              e: function(e, t, n) {
                return e.showValue
              },
              b: [
                [null, "showValue"]
              ],
              t: 3
            }]
          }, {
            t: 1,
            n: "div",
            id: "placeholder",
            cl: {
              e: function(e, t, n) {
                return "input-placeholder " + e._prefixedPlaceholderClass
              },
              b: [
                [null, "_prefixedPlaceholderClass"]
              ]
            },
            st: {
              e: function(e, i, r) {
                return t(r, n, "_getPlaceholderStyle", [e.placeholderStyle])
              },
              b: [
                [null, "_getPlaceholderStyle"],
                [null, "placeholderStyle"]
              ]
            },
            a: [],
            c: []
          }]
        }]
      },
      behaviors: ["wx-base", "wx-class-prefix", "wx-data-component", "wx-positioning-target"],
      properties: {
        focus: {
          type: Boolean,
          value: 0,
          filter: "_focusChange",
          public: !0
        },
        autoFocus: {
          type: Boolean,
          value: !1,
          public: !0
        },
        placeholder: {
          type: String,
          value: "",
          observer: "_placeholderChange",
          public: !0
        },
        placeholderStyle: {
          type: String,
          value: "",
          public: !0
        },
        placeholderClass: {
          type: String,
          value: "",
          public: !0,
          observer: "_placeholderClassChange"
        },
        dropdownStyle: {
          type: Object,
          value: {},
          public: !0
        },
        value: {
          type: String,
          value: "",
          filter: "defaultValueChange",
          public: !0
        },
        showValue: {
          type: String,
          value: ""
        },
        maxlength: {
          type: Number,
          value: 140,
          observer: "_maxlengthChanged",
          public: !0
        },
        type: {
          type: String,
          value: "text",
          public: !0
        },
        password: {
          type: Boolean,
          value: !1,
          public: !0
        },
        disabled: {
          type: Boolean,
          value: !1,
          public: !0
        },
        bindinput: {
          type: String,
          value: "",
          public: !0
        },
        cursorSpacing: {
          type: Number,
          value: 0,
          public: !0
        },
        confirmHold: {
          type: Boolean,
          value: !1,
          public: !0
        },
        confirmType: {
          type: String,
          value: "done",
          public: !0
        },
        cursor: {
          type: null,
          value: -1,
          public: !0
        },
        selectionStart: {
          type: null,
          value: -1,
          public: !0
        },
        selectionEnd: {
          type: null,
          value: -1,
          public: !0
        }
      },
      data: {
        _prefixedPlaceholderClass: ""
      },
      listeners: {
        tap: "_inputFocusWrap"
      },
      attached: function() {
        this._attachedCb()
      },
      detached: function() {
        this._detachedCb()
      },
      methods: {
        resetFormData: function() {
          this._keyboardShow ? (this.__formResetCallback = !0, wx.hideKeyboard({
            inputId: this._inputId
          })) : (this.value = "", this._checkPlaceholderStyle(this.value)), "number" == typeof this._groupID && (this._groupID = null)
        },
        getFormData: function(e) {
          this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
        },
        _focusChange: function(e) {
          return this._couldFocus(e), e
        },
        _couldFocus: function(n) {
          var i = this;
          if (this._attached)
            if (!this._keyboardShow && n) window.requestAnimationFrame(function() {
              i.selectionStart = e(i.selectionStart), i.selectionEnd = e(i.selectionEnd), i.cursor = e(i.cursor), i._inputFocus(i.cursor, i.selectionStart, i.selectionEnd)
            });
            else if (this._keyboardShow && !n) {
            if ("ios" === t) {
              var r = Date.now() - this._keyboardShowTimeStamp,
                o = Math.max(200 - r, 0);
              if (o > 0) return void setTimeout(function() {
                wx.hideKeyboard({
                  inputId: i._inputId
                })
              }, o)
            }
            window.requestAnimationFrame(function() {
              wx.hideKeyboard({
                inputId: i._inputId
              })
            })
          }
        },
        _maxlengthChanged: function(e, t) {
          var n = this.value.slice(0, e);
          n != this.value && (this.value = n)
        },
        _placeholderChange: function(e) {
          this._keyboardShow || this._checkPlaceholderStyle(this.value)
        },
        _attachedCb: function() {
          var e = this;
          if (!this._inputFontSize) {
            var t = window.getComputedStyle(this.$$);
            this._inputFontSize = parseFloat(t.fontSize) || 16
          }
          this._attached = !0, this._placeholderClassChange(this.placeholderClass), this._checkPlaceholderStyle(this.value), this._value = this.value, this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
            e.checkAutoFocus()
          }), this.__onKeyboardCompleteId = exparser.addListenerToElement(document, "onKeyboardComplete", function(t) {
            e._keyboardShow && t.detail.inputId == e._inputId && (e._value = t.detail.value, e.onKeyboardComplete())
          }), this.__setKeyboardValueId = exparser.addListenerToElement(document, "setKeyboardValue", function(t) {
            e._keyboardShow && t.detail.inputId == e._inputId && (e._value = t.detail.value, e.cursor = t.detail.cursor)
          }), this.__onKeyboardConfirmId = exparser.addListenerToElement(document, "onKeyboardConfirm", this.onKeyboardConfirm.bind(this)), this.__pageReRenderCallback = this.pageReRenderCallback.bind(this), this.__onDocumentTouchEnd = this.onDocumentTouchEnd.bind(this), this.__onDocumentTouchMove = this.onDocumentTouchMove.bind(this), document.addEventListener("touchend", this.__onDocumentTouchEnd), document.addEventListener("touchmove", this.__onDocumentTouchMove), document.addEventListener("pageReRender", this.__pageReRenderCallback)
        },
        _detachedCb: function() {
          document.removeEventListener("pageReRender", this.__pageReRenderCallback), document.removeEventListener("touchend", this.__onDocumentTouchEnd), document.removeEventListener("touchmove", this.__onDocumentTouchMove), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "onKeyboardComplete", this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, "setKeyboardValue", this.__setKeyboardValueId), exparser.removeListenerFromElement(document, "onKeyboardConfirm", this.__onKeyboardConfirmId), this._keyboardShow && wx.hideKeyboard({
            inputId: this._inputId
          })
        },
        checkAutoFocus: function() {
          this.__autoFocused || window.__onAppRouteDone && (this.__autoFocused = !0, this._couldFocus(this.autoFocus || this.focus))
        },
        onDocumentTouchMove: function() {
          this._keyboardShow && wx.hideKeyboard({
            inputId: this._inputId
          })
        },
        onDocumentTouchEnd: function(e) {
          this._keyboardShow && wx.hideKeyboard({
            inputId: this._inputId
          })
        },
        onKeyboardConfirm: function(e) {
          this._keyboardShow && e.detail.inputId == this._inputId && (this._value = e.detail.value, this.triggerEvent("confirm", {
            value: this._value
          }))
        },
        onKeyboardComplete: function() {
          WeixinJSBridge.invoke("updateInput", {
            value: "",
            placeholder: "",
            inputId: this._inputId
          }, function(e) {}), this.__formResetCallback && (this.value = "", this.__formResetCallback = void 0), "function" == typeof this.__formCallback && (this.__formCallback(this._value), this.__formCallback = void 0), this.triggerEvent("change", {
            value: this._value
          }), this.triggerEvent("blur", {
            value: this._value
          }), this._resetInputState()
        },
        getComputedStyle: function() {
          var e = this.$$,
            t = window.getComputedStyle(e),
            n = e.getBoundingClientRect(),
            i = ["Left", "Right"].map(function(e) {
              return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
            }),
            r = ["Top", "Bottom"].map(function(e) {
              return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
            }),
            o = parseFloat(t.fontWeight);
          isNaN(o) ? o = t.fontWeight : o < 500 ? o = "normal" : o >= 500 && (o = "bold");
          var a = t.textAlign;
          return ["left", "center", "right"].indexOf(a) < 0 && (a = "left"), this._inputFontSize = parseFloat(t.fontSize) || 16, {
            width: n.width - i[0] - i[1],
            height: n.height - r[0] - r[1],
            left: n.left + i[0] + window.scrollX,
            top: n.top + r[0] + window.scrollY,
            fontFamily: t.fontFamily,
            fontSize: this._inputFontSize,
            fontWeight: o,
            color: this._getHexColor(t.color),
            backgroundColor: "#00000000",
            marginBottom: this.cursorSpacing || parseFloat(t.marginBottom),
            textAlign: a
          }
        },
        getPlaceholderStyle: function() {
          var e = this.$.placeholder,
            t = window.getComputedStyle(e),
            n = parseFloat(t.fontWeight);
          return isNaN(n) ? n = t.fontWeight : n < 500 ? n = "normal" : n >= 500 && (n = "bold"), {
            fontSize: parseFloat(t.fontSize) || 16,
            fontWeight: n,
            color: this._getHexColor(t.color)
          }
        },
        getForm: function() {
          for (var e = void 0, t = this.parentNode; t;) {
            if (t instanceof exparser.Component && t.hasBehavior("wx-form")) {
              e = t;
              break
            }
            t = t.parentNode
          }
          return e
        },
        getAutoFillDropdown: function() {
          var e = this;
          if (!this.autoFill) return {};
          var t = this.autoFill.split(".");
          if (2 != t.length) return {};
          var n = t[0],
            o = t[1],
            a = this.getForm();
          if (!a || 1 !== a.autoFillAuthStatus && 3 !== a.autoFillAuthStatus) return {};
          var s = a.getAutoFillData(n, o),
            l = s.map(function(e) {
              var t = "",
                a = [];
              return e.field_list.forEach(function(e) {
                if (i.indexOf(e.key) > -1) {
                  var n = [],
                    s = e.date_info;
                  if (!s.year) return;
                  n.push(s.year), s.month && (n.push(("00" + s.month).substr(-2)), s.day && n.push(("00" + s.day).substr(-2))), e.value = n.join("-")
                }
                if (r.indexOf(e.key) > -1) {
                  var l = e.address_info || {};
                  e.value = [l.province, l.city, l.region].join("")
                }
                e.key === o ? t = e.value : e.value && a.push(e.value)
              }), {
                id: n + "." + e.group_id + "." + o,
                title: t,
                content: a.join(",")
              }
            }),
            c = [];
          l.forEach(function(t) {
            t.id !== n + "." + e._groupID + "." + o && c.push(t)
          });
          var u = "%%?" + (this.dropdownStyle.marginLeft || 0) + "?%%",
            d = wx.transformRpx(u);
          d = d === u ? parseFloat(this.dropdownStyle.marginLeft || 0) : parseFloat(d), u = "%%?" + (this.dropdownStyle.marginRight || 0) + "?%%";
          var h = wx.transformRpx(u);
          return h = h === u ? parseFloat(this.dropdownStyle.marginRight || 0) : parseFloat(h), {
            width: this.dropdownStyle.width || "screen",
            marginLeft: d,
            marginRight: h,
            options: c
          }
        },
        pageReRenderCallback: function() {
          this.checkAutoFocus(), this._updateInput(), this.checkLineHeight()
        },
        _inputFocusWrap: function() {
          this._inputFocus(-1, -1, -1)
        },
        _inputFocus: function(e, t, i) {
          var r = this;
          if (this.disabled) return !1;
          if (this.triggerEvent("focus", {
              value: this.value
            }), this._keyboardShow || n) return !1;
          if (this.autoFill) {
            var o = this.getForm();
            if (o && 2 === o.autoFillAuthStatus) return n = !0, WeixinJSBridge.invoke("requestAuthUserAutoFillData", {
              fields: o.getAllAutoFillFields() || [],
              wording: o.autoFillAuthInfo,
              authStatus: 2,
              authGroupList: o.autoFillAuthGroupList
            }, function(a) {
              a.errMsg.indexOf(":ok") > -1 ? void 0 !== a.confirm ? 1 === Number(a.confirm) ? o.autoFillAuthStatus = 1 : o.autoFillAuthStatus = 5 : o.autoFillAuthStatus = 1 : o.autoFillAuthStatus = 5, n = !1, r._showNativeInput(e, t, i)
            }), !1
          }
          return this._showNativeInput(e, t, i), !1
        },
        defaultValueChange: function(e, t) {
          var n = this;
          return this.maxlength > 0 && (e = e.slice(0, this.maxlength)), this._inputId && this._keyboardShow ? WeixinJSBridge.invoke("updateInput", {
            value: e || "",
            inputId: this._inputId,
            confirmHold: this.confirmHold
          }, function(t) {
            n._keyboardShow || (n._value = e, n._resetInputState())
          }) : this._checkPlaceholderStyle(e), this._value = e, e
        },
        _showNativeInput: function(e, t, n) {
          var i = this;
          this.inputArgs = this.getCurrentInputArgs(), this.inputArgs.defaultValue = this.value, -1 !== t ? (t = -1 === n ? t : Math.min(t, n), this.inputArgs.selectionStart = t, this.inputArgs.selectionEnd = n) : this.inputArgs.cursor = e;
          var r = this.value,
            o = this.placeholder;
          WeixinJSBridge.invoke("showKeyboard", this.inputArgs, function(e) {
            /:ok/.test(e.errMsg) ? (i._inputId = Number(e.inputId), i._keyboardShow = !0, i._keyboardShowTimeStamp = Date.now(), i.showValue = " ", i.selectionStart = -1, i.selectionEnd = -1, i.cursor = -1, r !== i.value && wx.invoke("updateInput", {
              value: i.value || "",
              inputId: i._inputId
            }, function(e) {}), o !== i.placeholder && wx.invoke("updateInput", {
              placeholder: i.placeholder || "",
              inputId: i._inputId
            }, function(e) {})) : console.info(e.errMsg)
          })
        },
        _diff: function(e, t) {
          var n = {},
            i = !1;
          for (var r in t) "[object Object]" === Object.prototype.toString.call(t[r]) ? JSON.stringify(t[r]) != JSON.stringify(e[r]) && (n[r] = t[r], i = !0) : e[r] != t[r] && (n[r] = t[r], i = !0);
          return i ? n : void 0
        },
        formateEventTarget: function() {
          var e = {
            bindinput: this.bindinput,
            target: {
              id: this.id,
              dataset: this.dataset,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            },
            setKeyboardValue: !0
          };
          return e.currentTarget = e.target, e.nodeId = this.getNodeId(), this.bindinput ? JSON.stringify(e) : ""
        },
        _updateInput: function() {
          if (this._keyboardShow) {
            var e = this.getCurrentInputArgs(),
              t = this._diff(this.inputArgs, e);
            t && (this.inputArgs = e, t.inputId = this._inputId, WeixinJSBridge.invoke("updateInput", t, function(e) {}))
          }
        },
        getCurrentInputArgs: function() {
          var e = ["text", "number", "idcard", "digit", "emoji"].indexOf(this.type) > -1 ? this.type : "text",
            t = {
              type: e,
              maxLength: this.maxlength,
              password: this.password || "password" == this.type,
              style: this.getComputedStyle(),
              data: this.formateEventTarget(),
              placeholder: this.placeholder,
              placeholderStyle: this.getPlaceholderStyle(),
              confirmHold: this.confirmHold,
              confirmType: this.confirmType
            },
            n = this.getAutoFillDropdown();
          return n.options && n.options.length && (t.dropdown = n), t
        },
        _resetInputState: function() {
          this._keyboardShow = !1, this._inputId = void 0, this.value = this._value || "", this._value = void 0, this._checkPlaceholderStyle(this.value)
        },
        _getHexColor: function(e) {
          if (!e) return "#000000";
          if (e.indexOf("#") >= 0) return e;
          try {
            var t = e.match(/\d+/g),
              n = [];
            if (t.map(function(e, t) {
                if (t < 3) {
                  var i = parseInt(e).toString(16);
                  i = i.length > 1 ? i : "0" + i, n.push(i)
                }
              }), t.length > 3) {
              var i = parseFloat(t.slice(3).join("."));
              0 == i ? n.push("00") : i >= 1 ? n.push("ff") : (i = parseInt(255 * i).toString(16), i = i.length > 1 ? i : "0" + i, n.push(i))
            }
            return "#" + n.join("")
          } catch (e) {
            return "#000000"
          }
        },
        _getPlaceholderStyle: function(e) {
          return e + ";display:none;"
        },
        checkLineHeight: function() {
          var e = this;
          window.requestAnimationFrame(function() {
            var t = window.getComputedStyle(e.$$),
              n = e.$$.getBoundingClientRect(),
              i = ["Left", "Right"].map(function(e) {
                return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
              }),
              r = ["Top", "Bottom"].map(function(e) {
                return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
              }),
              o = n.height - r[0] - r[1];
            if (o != e.__lastHeight) {
              var a = e.$.input;
              a.style.height = o + "px", a.style.lineHeight = o + "px", a.style.width = n.width - i[0] - i[1] + "px", e.__lastHeight = o, e.__lastWidth = n.width - i[0] - i[1]
            }
          })
        },
        _placeholderClassChange: function(e) {
          var t = e.split(/\s+/),
            n = this ? this.getClassPrefix() : "";
          this._placeholderClass = [];
          for (var i = 0; i < t.length; i++) t[i] && this._placeholderClass.push(n + t[i]);
          this.setData({
            _prefixedPlaceholderClass: this._placeholderClass.join(" ")
          }), this._attached && this._checkPlaceholderStyle(this.value)
        },
        _checkPlaceholderStyle: function(e) {
          var n = e || " ",
            i = this.$.input,
            r = this._placeholderClass || [];
          if (e) {
            if (i.classList.remove("input-placeholder"), r.length > 0)
              for (var o = 0; o < r.length; o++) i.classList.contains(r[o]) && i.classList.remove(r[o]);
            i.setAttribute("style", ""), this.__lastHeight ? (i.style.height = this.__lastHeight + "px", i.style.lineHeight = this.__lastHeight + "px", this.__lastWidth && (i.style.width = this.__lastWidth + "px")) : this.checkLineHeight(), (this.password || "password" == this.type) && ("ios" === t ? (n = e ? new Array(e.length + 1).join("•") : "", i.style.fontSize = 29 * this._inputFontSize / 20 + "px", i.style.letterSpacing = -1 - this._inputFontSize / 20 + "px", i.style.top = 2 - this._inputFontSize / 20 * 3 + "px", i.style.left = -.5 - this._inputFontSize / 40 + "px") : ("number" === this.type && (i.style.fontSize = 2 + this._inputFontSize / 10 * 7 + "px", i.style.letterSpacing = this._inputFontSize / 10 * 3 - 2 + "px", i.style.left = this._inputFontSize / 10 + "px", i.style.top = this._inputFontSize / 10 - 1 + "px"), n = e ? new Array(e.length + 1).join("●") : "")), this.showValue = n
          } else {
            if (i.setAttribute("class", ""), i.classList.add("input-placeholder"), r.length > 0)
              for (var o = 0; o < r.length; o++) i.classList.add(r[o]);
            i.style.fontSize = "", i.style.letterSpacing = "", i.style.top = "", i.style.left = "", this.placeholderStyle && (i.setAttribute("style", this.placeholderStyle), this.__lastHeight ? (i.style.height = this.__lastHeight + "px", i.style.lineHeight = this.__lastHeight + "px") : this.checkLineHeight()), this.showValue = this.placeholder || " "
          }
        }
      }
    })
  }
}(), window.exparser.registerElement({
    is: "wx-label",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    },
    properties: {
      for: {
        type: String,
        public: !0
      }
    },
    listeners: {
      "this.tap": "onTap"
    },
    behaviors: ["wx-base"],
    methods: {
      _handleNode: function(e, t) {
        return !!(e instanceof exparser.Component && e.hasBehavior("wx-label-target")) && (e.handleLabelTap(t), !0)
      },
      dfs: function(e, t) {
        if (this._handleNode(e, t)) return !0;
        if (!e.childNodes) return !1;
        for (var n = 0; n < e.childNodes.length; ++n)
          if (this.dfs(e.childNodes[n], t)) return !0;
        return !1
      },
      onTap: function(e) {
        for (var t = e.target; t instanceof exparser.Element && t !== this; t = t.parentNode)
          if (t instanceof exparser.Component && t.hasBehavior("wx-label-target")) return;
        if (this.for) {
          var n = null;
          this.ownerShadowRoot ? (n = this.ownerShadowRoot.getElementById(this.for)) && this._handleNode(n, e) : (n = document.getElementById(this.for)) && this._handleNode(n.__wxElement, e)
        } else this.dfs(this, e)
      }
    }
  }),
  function() {
    var e = "wechatdevtools" === wx.getPlatform(),
      t = [];
    wx.subscribe("operateLivePlayer", function(e) {
      t.forEach(function(t) {
        t(e)
      })
    }), window.exparser.registerElement({
      is: "wx-live-player",
      behaviors: ["wx-base", "wx-player", "wx-native", "wx-positioning-target"],
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "container",
          cl: {
            v: "wx-video-container"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            id: "inner",
            st: {
              v: "width: 100%; height: 100%;"
            },
            a: [],
            c: []
          }]
        }, {
          t: 1,
          n: "video",
          id: "player",
          a: [{
            n: "webkit-playsinline",
            v: ""
          }],
          c: []
        }, {
          t: 1,
          n: "div",
          id: "coverviewcontainer",
          st: {
            v: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      },
      properties: {
        mode: {
          type: String,
          value: "live",
          public: !0,
          observer: "modeChanged"
        },
        autoplay: {
          type: Boolean,
          value: !1,
          public: !0
        },
        muted: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "mutedChanged"
        },
        orientation: {
          type: String,
          value: "vertical",
          public: !0,
          observer: "orientationChanged"
        },
        objectFit: {
          type: String,
          value: "contain",
          public: !0,
          observer: "objectFitChanged"
        },
        backgroundMute: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "backgroundMuteChanged"
        },
        minCache: {
          type: Number,
          value: 1,
          public: !0,
          observer: "minCacheChanged"
        },
        maxCache: {
          type: Number,
          value: 3,
          public: !0,
          observer: "maxCacheChanged"
        },
        bindstatechange: {
          type: String,
          value: "",
          public: !0
        },
        bindfullscreenchange: {
          type: String,
          value: "",
          public: !0
        },
        bindnetstatus: {
          type: String,
          value: "",
          public: !0
        },
        _insert2WebLayer: {
          type: Boolean,
          value: !1
        },
        debug: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "debugChanged"
        }
      },
      created: function() {
        this.__pageReRenderCallback = this._pageReRenderCallback.bind(this)
      },
      attached: function() {
        if (this._attached = !0, e) return this._handleLivePlayerOperations = this.handleLivePlayerOperations.bind(this), t.push(this._handleLivePlayerOperations), this._playerId = this.getPositioningId(), void wx.publish("livePlayerInsert", {
          domId: this.id,
          playerId: this._playerId,
          nodeId: this.getNodeId()
        });
        this.insertLivePlayer()
      },
      detached: function() {
        if (this._attached = !1, e) {
          var n = t.indexOf(this._handleLivePlayerOperations);
          return n > -1 && t.splice(n, 1), void wx.publish("livePlayerRemoved", {
            domId: this.id,
            playerId: this._playerId,
            nodeId: this.getNodeId()
          })
        }
        this.removeLivePlayer(), document.removeEventListener("pageReRender", this.__pageReRenderCallback)
      },
      methods: {
        _canToggleFullscreen: function(e) {
          return this._playerId && e.livePlayerId === this._playerId
        },
        _getData: function() {
          var e = this;
          return {
            handlers: ["bindstatechange", "bindfullscreenchange", "bindnetstatus"].reduce(function(t, n) {
              return n && (t[n] = e[n]), t
            }, {}),
            target: {
              dataset: this.dataset,
              id: this.id,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            },
            createdTimeStamp: this.createdTimeStamp
          }
        },
        _update: function() {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (this._attached && this._playerId) {
            if (!this._isReady) return void this._deferred.push({
              callback: "_update",
              args: [t]
            });
            var n = this._getData();
            t.needEvent = Object.keys(n.handlers).length > 0, t.needNetStatus = !!this.bindnetstatus, t.livePlayerId = this._playerId, this.updateNativeView("updateLivePlayer", t, function(t) {
              /:ok/.test(t.errMsg) || e._publish("error", {
                errMsg: t.errMsg
              })
            })
          }
        },
        _hiddenChanged: function(e, t) {
          this._update({
            hide: e
          })
        },
        _transformMode: function(e) {
          switch (e) {
            case "RTC":
              return 2;
            case "live":
            default:
              return 1
          }
        },
        insertLivePlayer: function() {
          var e = this;
          this._box = this._getBox();
          var t = this.getPositioningId(),
            n = this._getData(),
            i = {
              livePlayerId: t,
              position: this._box,
              mode: this._transformMode(this.mode),
              playUrl: this.src,
              muted: this.muted,
              orientation: this.orientation,
              objectFit: this.objectFit,
              debug: this.debug,
              autoplay: this.autoplay,
              backgroundMute: this.backgroundMute,
              needEvent: Object.keys(n.handlers).length > 0,
              needNetStatus: !!this.bindnetstatus,
              maxCache: this.maxCache,
              minCache: this.minCache,
              hide: this.hidden
            };
          this.insertNativeView("insertLivePlayer", i, function(n) {
            if (/:ok/.test(n.errMsg)) e._playerId = t, e._ready(), e.findCoverView(n.containerId || e._playerId), e.createdTimeStamp = Date.now(), wx.publish("livePlayerInsert", {
              domId: e.id,
              playerId: e._playerId,
              data: e._getData(),
              nodeId: e.getNodeId()
            }), e._attached ? document.addEventListener("pageReRender", e.__pageReRenderCallback) : e.removeLivePlayer();
            else {
              e._isError = !0;
              var i = {
                errMsg: n.errMsg
              };
              void 0 !== n.errCode && (i.errCode = n.errCode), e._publish("error", i), console.error("'<live-player />' 渲染失败，错误原因: " + n.errMsg)
            }
          })
        },
        removeLivePlayer: function() {
          this.removeNativeView("removeLivePlayer", {
            livePlayerId: this._playerId
          }), wx.publish("livePlayerRemoved", {
            domId: this.id,
            playerId: this._playerId,
            nodeId: this.getNodeId()
          })
        },
        _srcChanged: function(t) {
          if (e) return t.indexOf("rtmp://") > -1 ? void console.warn("For developer:开发者工具暂不支持 rtmp 协议，请到客户端调试。") : void(this.$.player.src = t.replace("wxfile://", "http://wxfile.open.weixin.qq.com/"));
          this._update({
            playUrl: t,
            autoplay: this.autoplay
          })
        },
        modeChanged: function(e) {
          this._update({
            mode: this._transformMode(e)
          })
        },
        mutedChanged: function(e) {
          this._update({
            muted: e
          })
        },
        orientationChanged: function(e) {
          -1 === ["horizontal", "vertical"].indexOf(e) && (e = "vertical"), this._update({
            orientation: e
          })
        },
        objectFitChanged: function(e) {
          -1 === ["fillCrop", "contain"].indexOf(e) && (e = "fillCrop"), this._update({
            objectFit: e
          })
        },
        backgroundMuteChanged: function(e) {
          this._update({
            backgroundMute: e
          })
        },
        minCacheChanged: function(e) {
          this._update({
            minCache: e
          })
        },
        maxCacheChanged: function(e) {
          this._update({
            maxCache: e
          })
        },
        debugChanged: function(e) {
          this._update({
            debug: e
          })
        },
        handleLivePlayerOperations: function(e) {
          e.playerId === this._playerId && ("play" === e.type ? this.$.player.play() : "stop" === e.type ? this.$.player.pause() : "mute" === e.type && (this.$.player.muted = !0))
        }
      }
    })
  }(),
  function() {
    var e = !1,
      t = !1,
      n = !1,
      i = "wechatdevtools" === wx.getPlatform();
    window.exparser.registerElement({
      is: "wx-live-pusher",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "container",
          st: {
            v: "width: 100%; height: 100%;"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            id: "inner",
            st: {
              v: "width: 100%; height: 100%;"
            },
            a: [],
            c: []
          }]
        }, {
          t: 1,
          n: "video",
          id: "video",
          st: {
            v: "display: none;"
          },
          a: [],
          c: []
        }, {
          t: 1,
          n: "div",
          st: {
            v: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      },
      behaviors: ["wx-base", "wx-native", "wx-positioning-target"],
      properties: {
        url: {
          type: String,
          value: "",
          public: !0,
          observer: "urlChanged"
        },
        mode: {
          type: String,
          value: "RTC",
          public: !0,
          observer: "modeChanged"
        },
        autopush: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "autopushChanged"
        },
        muted: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "mutedChanged"
        },
        enableCamera: {
          type: Boolean,
          value: !0,
          public: !0,
          observer: "enableCameraChanged"
        },
        autoFocus: {
          type: Boolean,
          value: !0,
          public: !0,
          observer: "autoFocusChanged"
        },
        orientation: {
          type: String,
          value: "vertical",
          public: !0,
          observer: "orientationChanged"
        },
        beauty: {
          type: Number,
          value: 0,
          public: !0,
          observer: "beautyChanged"
        },
        whiteness: {
          type: Number,
          value: 0,
          public: !0,
          observer: "whitenessChanged"
        },
        aspect: {
          type: String,
          value: "9:16",
          public: !0,
          observer: "aspectChanged"
        },
        minBitrate: {
          type: Number,
          value: 200,
          public: !0,
          observer: "minBitrateChanged"
        },
        maxBitrate: {
          type: Number,
          value: 1e3,
          public: !0,
          observer: "maxBitrateChanged"
        },
        waitingImage: {
          type: String,
          value: "",
          public: !0,
          observer: "waitingImageChanged"
        },
        backgroundMute: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "backgroundMuteChanged"
        },
        waitingImageHash: {
          type: String,
          value: "",
          public: !0,
          observer: "waitingImageHashChanged"
        },
        audioQuality: {
          type: String,
          value: "high",
          public: !0,
          observer: "audioQualityChanged"
        },
        debug: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "debugChanged"
        },
        _insert2WebLayer: {
          type: Boolean,
          value: !1
        },
        bindstatechange: {
          type: String,
          value: "",
          public: !0
        },
        bindnetstatus: {
          type: String,
          value: "",
          public: !0
        }
      },
      attached: function() {
        var t = this;
        if (this._attached = !0, e) return void console.error("一个页面只能插入一个 '<live-pusher />'。");
        this.authorize(function() {
          i ? t.insertLivePusher4Tools() : t.insertLivePusher()
        }, function() {
          e = !1
        }), e = !0, this.__pageRender = this._pageReRenderCallback.bind(this)
      },
      detached: function() {
        if (this._attached = !1, i) return void this.removeLivePusher4Tools();
        this.removeLivePusher(), document.removeEventListener("pageReRender", this.__pageRender)
      },
      methods: {
        _delay: function(e, t, n) {
          this._deferred.push({
            callback: e,
            args: [t, n]
          })
        },
        _getData: function() {
          var e = this;
          return {
            handlers: ["bindstatechange", "bindnetstatus"].reduce(function(t, n) {
              return n && (t[n] = e[n]), t
            }, {}),
            target: {
              dataset: this.dataset,
              id: this.id,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            },
            createdTimeStamp: this.createdTimeStamp,
            nodeId: this.getNodeId()
          }
        },
        _update: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (this._attached && this._pusherId) {
            if (!this._isReady) return void this._delay("_update", e);
            e.livePusherId = this._pusherId, e.needEvent = !!this.bindstatechange, e.needNetStatus = !!this.bindnetstatus, this.updateNativeView("updateLivePusher", e, function() {})
          }
        },
        _hiddenChanged: function(e) {
          this._update({
            hide: e
          })
        },
        _updatePosition: function(e) {
          var t = {
            position: this._box
          };
          "number" == typeof e && (t.parentId = e), this._update(t)
        },
        _transformMode: function(e) {
          switch (e) {
            case "SD":
              return 1;
            case "HD":
              return 2;
            case "FHD":
              return 3;
            case "RTC":
            default:
              return 6
          }
        },
        _transformAspect: function(e) {
          switch (e) {
            case "3:4":
              return 1;
            case "9:16":
            default:
              return 2
          }
        },
        authorize: function(e, i) {
          var r = this,
            o = !n && this.enableCamera,
            a = !t && !this.muted,
            s = !1,
            l = !1;
          o && wx.authorize({
            scope: ["scope.camera"],
            success: function(t) {
              n = !0, s = !0, (!a || a && c) && e()
            },
            fail: function(e) {
              l = !0, r.triggerEvent("error", {
                errMsg: "Not allowed to use camera.",
                errCode: 10001
              }), (!a || a && u) && "function" == typeof i && i()
            }
          });
          var c = !1,
            u = !1;
          a && wx.authorize({
            scope: ["scope.record"],
            success: function(n) {
              t = !0, c = !0, (!o || o && s) && e()
            },
            fail: function(e) {
              u = !0, r.triggerEvent("error", {
                errMsg: "Not allowed to use microphone.",
                errCode: 10002
              }), (!o || o && l) && "function" == typeof i && i()
            }
          }), o || a || setTimeout(e)
        },
        insertLivePusher: function() {
          var t = this,
            n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
            i = this._box = this._getBox(),
            r = this.getPositioningId(),
            o = this._getData(),
            a = {
              parentId: n,
              livePusherId: r,
              position: i,
              pushUrl: this.url,
              mode: this._transformMode(this.mode),
              autopush: this.autopush,
              muted: this.muted,
              focusMode: this.autoFocus ? 0 : 1,
              orientation: this.orientation,
              beauty: this.beauty,
              whiteness: this.whiteness,
              aspect: this._transformAspect(this.aspect),
              backgroundImage: this.waitingImage,
              backgroundMute: this.backgroundMute,
              backgroundMD5: this.waitingImageHash,
              debug: this.debug,
              hide: this.hidden,
              enableCamera: this.enableCamera,
              minBitrate: this.minBitrate,
              maxBitrate: this.maxBitrate,
              audioQuality: this.audioQuality,
              needEvent: Object.keys(o.handlers).length > 0,
              needNetStatus: !!this.bindnetstatus
            };
          wxConsole.log("insertLivePusher", a), this.insertNativeView("insertLivePusher", a, function(n) {
            wxConsole.log("insertLivePusher callback", n), /:ok/.test(n.errMsg) ? (t._pusherId = r, t._ready(), t.createdTimeStamp = Date.now(), t.findCoverView(n.containerId || t._pusherId), e = !0, wx.publish("livePusherInserted", {
              pusherId: t._pusherId,
              data: t._getData()
            }), t._attached ? document.addEventListener("pageReRender", t.__pageRender) : t.removeLivePusher()) : console.error("'<live-pusher />' 渲染失败，错误原因: " + n.errMsg)
          })
        },
        removeLivePusher: function() {
          var t = this;
          this.removeNativeView("removeLivePusher", {
            livePusherId: this._pusherId
          }, function(n) {
            e = !1, wx.publish("livePusherRemoved", {
              pusherId: t._pusherId
            })
          })
        },
        urlChanged: function(e) {
          this._update({
            pushUrl: this.url,
            autopush: this.autopush
          })
        },
        modeChanged: function(e) {
          this._update({
            mode: this._transformMode(e)
          })
        },
        autopushChanged: function(e) {
          this._update({
            autopush: e
          })
        },
        mutedChanged: function(e) {
          var t = this;
          if (!this._isReady && !i) return void this._delay("mutedChanged", e);
          this.authorize(function() {
            t._update({
              muted: e
            })
          })
        },
        enableCameraChanged: function(e) {
          var t = this;
          if (!this._isReady && !i) return void this._delay("enableCameraChanged", e);
          this.authorize(function() {
            i ? t.insertLivePusher4Tools() : t._update({
              enableCamera: e
            })
          })
        },
        autoFocusChanged: function(e) {
          this._update({
            focusMode: e ? 0 : 1
          })
        },
        orientationChanged: function(e) {
          -1 === ["horizontal", "vertical"].indexOf(e) && (e = "vertical"), this._update({
            orientation: e
          })
        },
        beautyChanged: function(e) {
          this._update({
            beauty: e
          })
        },
        whitenessChanged: function(e) {
          this._update({
            whiteness: e
          })
        },
        aspectChanged: function(e) {
          this._update({
            aspect: this._transformAspect(e)
          })
        },
        minBitrateChanged: function(e) {
          this._update({
            minBitrate: e
          })
        },
        maxBitrateChanged: function(e) {
          this._update({
            maxBitrate: e
          })
        },
        waitingImageChanged: function(e) {
          this._update({
            backgroundImage: e,
            backgroundMD5: this.waitingImageHash
          })
        },
        waitingImageHashChanged: function(e) {
          this._update({
            backgroundImage: this.waitingImage,
            backgroundMD5: e
          })
        },
        debugChanged: function(e) {
          this._update({
            debug: e
          })
        },
        audioQualityChanged: function(e) {
          this._update({
            audioQuality: e
          })
        },
        insertLivePusher4Tools: function() {
          var e = this;
          if (this.enableCamera) {
            var t = function(t) {
                e.$.container.innerText = t, e.$.container.style.lineHeight = e.$.container.offsetHeight + "px", e.$.container.style.textAlign = "center", e.$.container.style.backgroundColor = "gray", e.$.container.style.color = "#EEE"
              },
              n = window.createObjectURL || window.URL && window.URL.createObjectURL || window.webkitURL.createObjectURL,
              i = this.$.video;
            navigator.getUserMedia({
              video: {
                width: 1920,
                height: 1080,
                frameRate: 60
              },
              audio: !1
            }, function(t) {
              e.$.container.style.display = "none", e.$.video.style.display = "block", i.src = n(t), i.play(), e._videoTrack = t.getTracks()[0], wx.publish("livePusherInserted", {
                pusherId: 1
              })
            }, function(e) {
              t("DevicesNotFoundError" === e.name ? "未找到摄像头" : "IDE暂不支持camera组件，请在真机调试。")
            })
          }
        },
        removeLivePusher4Tools: function() {
          this._videoTrack && this._videoTrack.stop(), e = !1, wx.publish("livePusherRemoved", {
            pusherId: 1
          })
        }
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-loading",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        cl: {
          v: "wx-loading-mask"
        },
        st: {
          v: "background-color: transparent;"
        },
        a: [],
        c: []
      }, {
        t: 1,
        n: "div",
        cl: {
          v: "wx-loading"
        },
        a: [],
        c: [{
          t: 1,
          n: "i",
          cl: {
            v: "wx-loading-icon"
          },
          a: [],
          c: []
        }, {
          t: 1,
          n: "p",
          cl: {
            v: "wx-loading-content"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      }]
    },
    behaviors: ["wx-base"]
  });
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function() {
  function e(e) {
    return e.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }
  "wechatdevtools" === wx.getPlatform() && (window.__map_jssdk_id = 0, window.__map_jssdk_ready = !1, window.__map_jssdk_callback = [], window.__map_jssdk_init = function() {
    for (__map_jssdk_ready = !0; __map_jssdk_callback.length;) {
      __map_jssdk_callback.pop()()
    }
  }, window.exparser.registerElement({
    is: "wx-map",
    behaviors: ["wx-base", "wx-native"],
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "map",
        st: {
          v: "width: 100%; height: 100%;"
        },
        a: [],
        c: []
      }, {
        t: 1,
        n: "div",
        id: "coverviewcontainer",
        st: {
          v: "position: absolute; top: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;"
        },
        a: [],
        c: [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      }]
    },
    properties: {
      latitude: {
        type: Number,
        public: !0,
        filter: "latitudeChanged",
        value: 39.92
      },
      longitude: {
        type: Number,
        public: !0,
        filter: "longitudeChanged",
        value: 116.46
      },
      scale: {
        type: Number,
        public: !0,
        filter: "scaleChanged",
        value: 16
      },
      markers: {
        type: Array,
        value: [],
        public: !0,
        observer: "markersChanged"
      },
      covers: {
        type: Array,
        value: [],
        public: !0,
        observer: "coversChanged"
      },
      includePoints: {
        type: Array,
        value: [],
        public: !0,
        observer: "pointsChanged"
      },
      polyline: {
        type: Array,
        value: [],
        public: !0,
        observer: "linesChanged"
      },
      circles: {
        type: Array,
        value: [],
        public: !0,
        observer: "circlesChanged"
      },
      controls: {
        type: Array,
        value: [],
        public: !0,
        observer: "controlsChanged"
      },
      showLocation: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "showLocationChanged"
      },
      bindmarkertap: {
        type: String,
        value: "",
        public: !0
      },
      bindcallouttap: {
        type: String,
        value: "",
        public: !0
      },
      bindcontroltap: {
        type: String,
        value: "",
        public: !0
      },
      bindregionchange: {
        type: String,
        value: "",
        public: !0
      },
      bindtap: {
        type: String,
        value: "",
        public: !0
      },
      _mapId: {
        type: Number
      }
    },
    methods: {
      _delay: function(e, t, n) {
        this._deferred.push({
          callback: e,
          args: [t, n]
        })
      },
      _hiddenChanged: function(e, t) {
        this.$$.style.display = e ? "none" : ""
      },
      _transformColor: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        if (0 !== e.indexOf("#")) return "";
        e = e.substr(1);
        var t = Number("0x" + e.substr(0, 2)),
          n = Number("0x" + e.substr(2, 2)),
          i = Number("0x" + e.substr(4, 2)),
          r = e.substr(6, 2) ? Number("0x" + e.substr(6, 2)) / 255 : 1;
        return new qq.maps.Color(t, n, i, r)
      },
      _validateColor: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "";
        return !!/^#/.test(e) && e
      },
      _insertIframeMap: function() {
        var e = this,
          t = this._map = new qq.maps.Map(this.$.map, {
            zoom: Math.max(0, this.scale - 2),
            center: new qq.maps.LatLng(this.latitude, this.longitude),
            mapTypeId: qq.maps.MapTypeId.ROADMAP,
            zoomControl: !1,
            mapTypeControl: !1
          });
        this.$.map.addEventListener("touchmove", function(e) {
          e.stopPropagation()
        });
        var n = !1,
          i = !1;
        qq.maps.event.addListener(t, "click", function() {
          e.bindtap && (e._hideShowCallout(), wx.publishPageEvent(e.bindtap, {
            type: "tap",
            target: {
              dataset: e.dataset,
              id: e.id,
              offsetTop: e.$$.offsetTop,
              offsetLeft: e.$$.offsetLeft
            },
            currentTarget: {
              dataset: e.dataset,
              id: e.id,
              offsetTop: e.$$.offsetTop,
              offsetLeft: e.$$.offsetLeft
            },
            timeStamp: Date.now(),
            details: {}
          }, e.getNodeId()))
        }), qq.maps.event.addListener(t, "drag", function(t) {
          e.bindregionchange && !n && (wx.publishPageEvent(e.bindregionchange, {
            type: "begin",
            target: {
              dataset: e.dataset,
              id: e.id,
              offsetTop: e.$$.offsetTop,
              offsetLeft: e.$$.offsetLeft
            },
            currentTarget: {
              dataset: e.dataset,
              id: e.id,
              offsetTop: e.$$.offsetTop,
              offsetLeft: e.$$.offsetLeft
            },
            timeStamp: Date.now(),
            details: {}
          }, e.getNodeId()), n = !t || t.dragging, i = !!t && t.dragend)
        }), qq.maps.event.addListener(t, "dragend", function() {
          n && (n = !1, i = !0)
        }), qq.maps.event.addListener(t, "bounds_changed", function() {
          e.bindregionchange && i && (wx.publishPageEvent(e.bindregionchange, {
            type: "end",
            target: {
              dataset: e.dataset,
              id: e.id,
              offsetTop: e.$$.offsetTop,
              offsetLeft: e.$$.offsetLeft
            },
            currentTarget: {
              dataset: e.dataset,
              id: e.id,
              offsetTop: e.$$.offsetTop,
              offsetLeft: e.$$.offsetLeft
            },
            timeStamp: Date.now(),
            details: {}
          }, e.getNodeId()), i = !1)
        });
        var r = this._translateQueue = {},
          o = this._translating = [],
          a = qq.maps.event.addListener(t, "tilesloaded", function() {
            e._mapId = __map_jssdk_id++, e._ready(), WeixinJSBridge.subscribe("doMapAction" + e._mapId, function(n) {
              if (e._map && e._mapId === n.data.mapId)
                if ("getMapCenterLocation" === n.data.method) {
                  var i = e._map.getCenter();
                  WeixinJSBridge.publish("doMapActionCallback", {
                    errMsg: "getMapCenterLocation:ok",
                    mapId: e._mapId,
                    callbackId: n.data.callbackId,
                    method: n.data.method,
                    latitude: i.getLat(),
                    longitude: i.getLng()
                  })
                } else if ("moveToMapLocation" === n.data.method && e.showLocation) WeixinJSBridge.invoke("private_geolocation", {}, function(n) {
                try {
                  n = JSON.parse(n)
                } catch (e) {
                  n = {}
                }
                if (n.result && n.result.location) {
                  var i = n.result.location;
                  e._posOverlay && e._posOverlay.setMap(null), e._posOverlay = new e.CustomOverlay(new qq.maps.LatLng(i.lat, i.lng)), e._posOverlay.setMap(e._map), qq.maps.event.trigger(t, "drag", {
                    dragging: !1,
                    dragend: !0
                  }), e._map.panTo(new qq.maps.LatLng(i.lat, i.lng))
                }
              });
              else if ("translateMapMarker" === n.data.method) {
                var a = n.data.markerId,
                  s = function(e, t) {
                    var n = null;
                    return t._markers.map(function(t) {
                      e === t.markerId && (n = t)
                    }), n
                  }(a, e);
                if (null === s) return void console.warn("For developer:找不到 id 为 " + a + " 的 marker");
                var l = s.marker,
                  c = n.data.keyFrames,
                  u = {
                    latitude: 0,
                    longitude: 0,
                    rotate: 0
                  },
                  d = l.getPosition(),
                  h = {
                    latitude: d.getLat(),
                    longitude: d.getLng(),
                    rotate: l.getRotation()
                  },
                  p = {
                    latitude: 0,
                    longitude: 0,
                    rotate: 0
                  },
                  f = 1,
                  g = 1;
                switch (c.length) {
                  case 1:
                    u.latitude = c[0].latitude, u.longitude = c[0].longitude, f = Math.ceil(c[0].duration / 1e3 * 60);
                    break;
                  case 2:
                  default:
                    u.latitude = c[1].latitude, u.longitude = c[1].longitude, u.rotate = c[0].rotate, f = Math.ceil(c[1].duration / 1e3 * 60), g = Math.ceil(c[0].duration / 1e3 * 60)
                }
                if (p.latitude = (u.latitude - h.latitude) / f, p.longitude = (u.longitude - h.longitude) / f, p.rotate = u.rotate / g, r[a] || (r[a] = []), 0 !== p.rotate) {
                  for (var A = 0, v = h.rotate; A < g - 1; A++) v += p.rotate, r[a].push({
                    rotate: v,
                    markerObj: s
                  });
                  r[a].push({
                    rotate: h.rotate + u.rotate,
                    markerObj: s
                  })
                }
                for (var A = 0, _ = h.latitude, w = h.longitude; A < f - 1; A++) _ += p.latitude, w += p.longitude, r[a].push({
                  latitude: _,
                  longitude: w,
                  markerObj: s
                });
                r[a].push({
                  latitude: u.latitude,
                  longitude: u.longitude,
                  markerObj: s,
                  complete: {
                    mapId: e._mapId,
                    callbackId: n.data.callbackId,
                    method: n.data.method,
                    errMsg: "translateMapMarker:ok"
                  }
                }), -1 === o.indexOf(a) && o.push(a)
              } else if ("includeMapPoints" === n.data.method) {
                if (n.data.points.length <= 0) return;
                var m = new qq.maps.LatLngBounds;
                n.data.points.forEach(function(e) {
                  m.extend(new qq.maps.LatLng(e.latitude, e.longitude))
                }), e._map.fitBounds(m)
              } else if ("getMapMarker" === n.data.method) {
                var b = void 0;
                e.markers.forEach(function(e) {
                  e.id === n.data.markerId && (b = {
                    longitude: e.longitude,
                    latitude: e.latitude
                  })
                }), WeixinJSBridge.publish("doMapActionCallback", {
                  errMsg: b ? "getMapMarker:ok" : "getMapMarker:fail",
                  mapId: e._mapId,
                  callbackId: n.data.callbackId,
                  method: n.data.method,
                  pos: b || {}
                })
              } else if ("getMapScale" === n.data.method) WeixinJSBridge.publish("doMapActionCallback", {
                errMsg: "getMapScale:ok",
                mapId: e._mapId,
                callbackId: n.data.callbackId,
                method: n.data.method,
                scale: e._map.getZoom()
              });
              else if ("getMapRegion" === n.data.method) {
                var y = e._map.getBounds(),
                  x = y.getSouthWest(),
                  C = y.getNorthEast();
                WeixinJSBridge.publish("doMapActionCallback", {
                  errMsg: "getMapRegion:ok",
                  mapId: e._mapId,
                  callbackId: n.data.callbackId,
                  method: n.data.method,
                  southwest: {
                    longitude: x.getLng(),
                    latitude: x.getLat()
                  },
                  northeast: {
                    longitude: C.getLng(),
                    latitude: C.getLat()
                  }
                })
              }
            }), wx.publish("mapInsert", {
              domId: e.id,
              mapId: e._mapId,
              showLocation: e.showLocation,
              bindregionchange: e.bindregionchange,
              bindtap: e.bindtap,
              nodeId: e.getNodeId()
            }), qq.maps.event.removeListener(a), a = null, e.triggerEvent("updated")
          });
        window.requestAnimFrame = function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
              window.setTimeout(e, 1e3 / 60)
            }
          }(),
          function e() {
            window.requestAnimationFrame(e), o.length && o.map(function(e) {
              if (r[e].length) {
                var t = r[e].shift(),
                  n = t.markerObj,
                  i = n.marker,
                  a = n.label,
                  s = n.callout,
                  l = n.calloutArrow;
                if (void 0 !== t.rotate && i.setRotation(t.rotate), void 0 !== t.latitude && void 0 !== t.longitude) {
                  var c = new qq.maps.LatLng(t.latitude, t.longitude);
                  i.setPosition(c), null !== a && a.setPosition(c), null !== s && s.setPosition(c), null !== l && l.setPosition(c)
                }
                t.complete && WeixinJSBridge.publish("doMapActionCallback", t.complete)
              } else o.splice(o.indexOf(e), 1)
            })
          }();
        var s = this.CustomOverlay = function(e, t) {
          this.index = t, this.position = e
        };
        s.prototype = new qq.maps.Overlay, s.prototype.construct = function() {
          var e = this.div = document.createElement("div");
          e.setAttribute("style", "width: 32px;height: 32px;background: rgba(31, 154, 228,.3);border-radius: 20px;position: absolute;");
          var t = document.createElement("div");
          t.setAttribute("style", "position: absolute;width: 16px;height: 16px;background: white;border-radius: 8px;top: 8px;left: 8px;"), e.appendChild(t);
          var n = document.createElement("div");
          n.setAttribute("style", "position: absolute;width: 12px;height: 12px;background: rgb(31, 154, 228);border-radius: 6px;top: 2px;left: 2px;"), t.appendChild(n), this.getPanes().overlayMouseTarget.appendChild(e)
        }, s.prototype.draw = function() {
          var e = this.getProjection(),
            t = e.fromLatLngToDivPixel(this.position),
            n = this.div.style;
          n.left = t.x - 16 + "px", n.top = t.y - 16 + "px"
        }, s.prototype.destroy = function() {
          this.div.onclick = null, this.div.parentNode.removeChild(this.div), this.div = null
        }
      },
      latitudeChanged: function(e, t) {
        if (e) return this._isReady ? void this._map.setCenter(new qq.maps.LatLng(e, this.longitude)) : void this._delay("latitudeChanged", e, t)
      },
      longitudeChanged: function(e, t) {
        if (e) return this._isReady ? void this._map.setCenter(new qq.maps.LatLng(this.latitude, e)) : void this._delay("longitudeChanged", e, t)
      },
      scaleChanged: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16,
          t = arguments[1];
        if (e) return this._isReady ? void this._map.zoomTo(Math.max(0, e - 2)) : void this._delay("scaleChanged", e, t)
      },
      coversChanged: function() {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          n = arguments[1];
        if (!this._isReady) return void this._delay("coversChanged", t, n);
        (this._covers || []).forEach(function(e) {
          e.setMap(null)
        }), this._covers = t.map(function(t) {
          var n = new qq.maps.Marker({
            position: new qq.maps.LatLng(t.latitude, t.longitude),
            map: e._map
          });
          return t.iconPath && (t.iconPath.match(/^(http|\/\/)/) ? (console.group(new Date + " iconPath不支持网络地址"),
            console.warn("For developer:iconPath不支持网络地址，如需要，可传入通过wx.downloadFile接口下载得到的临时地址。"), console.groupEnd()) : n.setIcon(new qq.maps.MarkerImage(e.getRealRoute(t.iconPath)))), n
        })
      },
      markersChanged: function() {
        var t = this,
          n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          i = arguments[1];
        if (!this._isReady) return void this._delay("markersChanged", n, i);
        (this._markers || []).forEach(function(e) {
          if (t._translateQueue[e.markerId] && t._translateQueue[e.markerId].length) {
            var n = t._translateQueue[e.markerId].pop().complete;
            t._translating.splice(t._translating.indexOf(e.markerId), 1), t._translateQueue[e.markerId] = [], n.errMsg = "translateMapMarker:fail", WeixinJSBridge.publish("doMapActionCallback", n)
          }
          e.marker.setMap(null), null !== e.label && e.label.setMap(null), null !== e.callout && e.callout.setMap(null), null !== e.calloutArrow && e.calloutArrow.setMap(null)
        }), this._markers = n.map(function(n) {
          (n.latitude > 90 || n.latitude < -90) && console.warn("For developer:markers.latitude 范围是 -90 ~ 90，markers.id: [" + ret._id + "]"), (n.longitude > 180 || n.longitude < -180) && console.warn("For developer:markers.longitude 范围是 -180 ~ 180，markers.id: [" + ret._id + "]");
          var i = new qq.maps.LatLng(n.latitude, n.longitude),
            r = new qq.maps.Marker({
              position: i,
              map: t._map
            }),
            o = "object" === _typeof(n.label) && "string" == typeof n.label.content && "" !== n.label.content ? new qq.maps.Label({
              position: i,
              offset: new qq.maps.Size("number" == typeof n.label.x ? n.label.x : 0, "number" == typeof n.label.y ? n.label.y : 0),
              style: {
                color: t._validateColor(n.label.color) || "#000",
                fontSize: ("number" == typeof n.label.fontSize ? n.label.fontSize : 12) + "px",
                backgroundColor: t._validateColor(n.label.bgColor) || "transparent",
                border: ("number" == typeof n.label.borderWidth ? n.label.borderWidth : 0) + "px " + (t._validateColor(n.label.borderColor) || "transparent") + " solid",
                borderRadius: ("number" == typeof n.label.borderRadius ? n.label.borderRadius : 0) + "px",
                textAlign: n.label.textAlign || "left",
                padding: ("number" == typeof n.label.padding ? n.label.padding : 0) + "px",
                whiteSpace: "pre"
              },
              map: t._map,
              content: e(n.label.content)
            }) : null,
            a = new qq.maps.Size(0, -((Number(n.height) || 0) - -10)),
            s = {
              position: i,
              offset: a,
              style: {
                color: "#000",
                fontSize: "12px",
                borderRadius: 0,
                backgroundColor: "#FFF",
                padding: 0,
                boxShadow: "none",
                transform: "translate(-50%, -100%)",
                border: "none",
                whiteSpace: "pre",
                boxSizing: "content-box"
              },
              map: t._map,
              content: ""
            },
            l = {
              position: i,
              offset: a,
              style: {
                border: "3px solid transparent",
                borderTopColor: "#FFF",
                width: 0,
                height: 0,
                backgroundColor: "transparent",
                padding: 0,
                transform: "translate(-50%, 0)"
              },
              map: t._map,
              content: ""
            };
          if ("object" === _typeof(n.callout)) {
            s.content = e(n.callout.content || "");
            var c = s.style,
              u = l.style;
            t._validateColor(n.callout.color) && (c.color = n.callout.color), "number" == typeof n.callout.fontSize && (c.fontSize = n.callout.fontSize + "px"), "number" == typeof n.callout.borderRadius && (c.borderRadius = n.callout.borderRadius + "px"), t._validateColor(n.callout.bgColor) && (c.backgroundColor = u.borderTopColor = n.callout.bgColor), "number" == typeof n.callout.padding && (c.padding = n.callout.padding + "px"), n.callout.boxShadow && (c.boxShadow = n.callout.boxShadow.replace(/^(-?\d*)( -?\d*)( #.*)$/, "$1px$2px$3")), n.callout.textAlign && (c.textAlign = n.callout.textAlign)
          } else "string" == typeof n.title ? s.content = e(n.title) : (s.destroy = !0, l.destroy = !0);
          var d = s.destroy ? null : new qq.maps.Label(s),
            h = l.destroy ? null : new qq.maps.Label(l);
          if (d && h && (n.callout && n.callout.display && "ALWAYS" === n.callout.display ? d.always = !0 : (d.setVisible(!1), h.setVisible(!1))), (n.iconPath || "").match(/^(http|\/\/)/)) console.group(new Date + " iconPath不支持网络地址"), console.warn("For developer:iconPath不支持网络地址，如需要，可传入通过wx.downloadFile接口下载得到的临时地址。"), console.groupEnd();
          else if (n.iconPath) {
            var p = t.getRealRoute(n.iconPath.replace("wxfile://", "http://wxfile.open.weixin.qq.com/"));
            if (Number(n.width) && Number(n.height)) {
              var f = {
                x: "object" === _typeof(n.anchor) && "number" == typeof n.anchor.x && n.anchor.x >= 0 && n.anchor.x <= 1 ? n.anchor.x : .5,
                y: "object" === _typeof(n.anchor) && "number" == typeof n.anchor.y && n.anchor.y >= 0 && n.anchor.y <= 1 ? n.anchor.y : 1
              };
              r.setIcon(new qq.maps.MarkerImage(p, new qq.maps.Size(n.width, n.height), new qq.maps.Point(0, 0), new qq.maps.Point(n.width * f.x, n.height * f.y), new qq.maps.Size(n.width, n.height)))
            } else r.setIcon(new qq.maps.MarkerImage(p))
          }
          if ((n.title || n.name) && r.setTitle(n.title || n.name), "number" == typeof n.rotate && r.setRotation && r.setRotation(n.rotate), t.bindmarkertap && void 0 !== n.id) {
            var g = function() {
              if (d && d.always) t._hideShowCallout();
              else if (t.showCalloutEl && t.showCalloutEl.callout != d && t._hideShowCallout(), d && h) {
                t.showCalloutEl = {
                  callout: d,
                  calloutArrow: h
                }, t.showCalloutEl.callout.setVisible(!0), t.showCalloutEl.calloutArrow.setVisible(!0);
                var e = r.getPosition();
                t.showCalloutEl.callout.setPosition(e), t.showCalloutEl.calloutArrow.setPosition(e)
              } else t.showCalloutEl = null;
              wx.publishPageEvent(t.bindmarkertap, {
                markerId: n.id,
                type: "markertap",
                target: {
                  dataset: t.dataset,
                  id: t.id,
                  offsetTop: t.$$.offsetTop,
                  offsetLeft: t.$$.offsetLeft
                },
                currentTarget: {
                  dataset: t.dataset,
                  id: t.id,
                  offsetTop: t.$$.offsetTop,
                  offsetLeft: t.$$.offsetLeft
                },
                timeStamp: Date.now(),
                details: {}
              }, t.getNodeId())
            };
            qq.maps.event.addListener(r, "click", function(e) {
              var t = e.event;
              t instanceof TouchEvent ? "touchend" === t.type && g() : g()
            })
          }
          return t.bindcallouttap && void 0 !== n.id && null !== d && qq.maps.event.addListener(d, "mouseup", function(e) {
            t.showCalloutEl && t.showCalloutEl.callout != d && t._hideShowCallout(), wx.publishPageEvent(t.bindcallouttap, {
              markerId: n.id,
              type: "callouttap",
              target: {
                dataset: t.dataset,
                id: t.id,
                offsetTop: t.$$.offsetTop,
                offsetLeft: t.$$.offsetLeft
              },
              currentTarget: {
                dataset: t.dataset,
                id: t.id,
                offsetTop: t.$$.offsetTop,
                offsetLeft: t.$$.offsetLeft
              },
              timeStamp: Date.now(),
              details: {}
            }, t.getNodeId())
          }), {
            markerId: n.id,
            marker: r,
            label: o,
            callout: d,
            calloutArrow: h
          }
        }), this.triggerEvent("updated")
      },
      linesChanged: function() {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          n = arguments[1];
        if (!this._isReady) return void this._delay("linesChanged", t, n);
        (this._lines || []).forEach(function(e) {
          e.line.setMap(null), null !== e.border && e.border.setMap(null)
        }), this._lines = t.map(function(t) {
          var n = t.points.map(function(e) {
            return new qq.maps.LatLng(e.latitude, e.longitude)
          });
          return {
            border: "number" == typeof t.borderWidth && t.borderWidth > 0 ? new qq.maps.Polyline({
              map: e._map,
              path: n,
              strokeColor: e._transformColor(t.borderColor) || "",
              strokeWeight: t.width + t.borderWidth,
              strokeDashStyle: t.dottedLine ? "dash" : "solid"
            }) : null,
            line: new qq.maps.Polyline({
              map: e._map,
              path: n,
              strokeColor: e._transformColor(t.color) || "",
              strokeWeight: t.width,
              strokeDashStyle: t.dottedLine ? "dash" : "solid"
            })
          }
        }), this.triggerEvent("updated")
      },
      circlesChanged: function() {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          n = arguments[1];
        if (!this._isReady) return void this._delay("circlesChanged", t, n);
        (this._circles || []).forEach(function(e) {
          e.setMap(null)
        }), this._circles = t.map(function(t) {
          return new qq.maps.Circle({
            map: e._map,
            center: new qq.maps.LatLng(t.latitude, t.longitude),
            radius: t.radius,
            fillColor: e._transformColor(t.fillColor) || "",
            strokeColor: e._transformColor(t.color) || "",
            strokeWidth: t.strokeWidth
          })
        }), this.triggerEvent("updated")
      },
      pointsChanged: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          t = arguments[1];
        if (!this._isReady) return void this._delay("pointsChanged", e, t);
        if (!(e.length <= 0)) {
          var n = new qq.maps.LatLngBounds;
          e.forEach(function(e) {
            n.extend(new qq.maps.LatLng(e.latitude, e.longitude))
          }), this._map.fitBounds(n)
        }
      },
      controlsChanged: function() {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
          n = arguments[1];
        if (!this._isReady) return void this._delay("controlsChanged", t, n);
        for (var i = this._controls = this._controls || []; i.length;) {
          var r = i.pop();
          r.onclick = null, r.parentNode.removeChild(r)
        }
        t.forEach(function(t) {
          var n = document.createElement("img");
          n.style.position = "absolute", n.style.left = (t.position && t.position.left || 0) + "px", n.style.top = (t.position && t.position.top || 0) + "px", n.style.width = (t.position && t.position.width || "") + "px", n.style.height = (t.position && t.position.height || "") + "px", n.style.zIndex = 9999, (t.iconPath || "").match(/^(http|\/\/)/) ? (console.group(new Date + " iconPath不支持网络地址"), console.warn("For developer:iconPath不支持网络地址，如需要，可传入通过wx.downloadFile接口下载得到的临时地址。"), console.groupEnd()) : n.src = e.getRealRoute(t.iconPath.replace("wxfile://", "http://wxfile.open.weixin.qq.com/")), t.clickable && void 0 !== t.id && (n.onclick = function() {
            e._hideShowCallout(), wx.publishPageEvent(e.bindcontroltap, {
              controlId: t.id,
              type: "controltap",
              target: {
                dataset: e.dataset,
                id: e.id,
                offsetTop: e.$$.offsetTop,
                offsetLeft: e.$$.offsetLeft
              },
              currentTarget: {
                dataset: e.dataset,
                id: e.id,
                offsetTop: e.$$.offsetTop,
                offsetLeft: e.$$.offsetLeft
              },
              timeStamp: Date.now(),
              details: {}
            }, e.getNodeId())
          }), i.push(n), e.$.map.appendChild(n)
        })
      },
      showLocationChanged: function() {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
          n = arguments[1];
        if (!this._isReady) return void this._delay("showLocationChanged", t, n);
        this._posOverlay && (this._posOverlay.setMap(null), this._posOverlay = null), t && WeixinJSBridge.invoke("private_geolocation", {}, function(t) {
          try {
            t = JSON.parse(t)
          } catch (e) {
            t = {}
          }
          if (t.result && t.result.location) {
            var n = t.result.location;
            e._posOverlay = new e.CustomOverlay(new qq.maps.LatLng(n.lat, n.lng)), e._posOverlay.setMap(e._map)
          }
        })
      },
      _hideShowCallout: function() {
        this.showCalloutEl && this.showCalloutEl.callout && this.showCalloutEl.calloutArrow && (this.showCalloutEl.callout.setVisible(!1), this.showCalloutEl.calloutArrow.setVisible(!1)), this.showCalloutEl = null
      }
    },
    attached: function() {
      if (this.latitude > 90 || this.latitude < -90) return console.group(new Date + " latitude 字段取值有误"), console.error("纬度范围应为 -90 ~ 90"), void console.groupEnd();
      if (this.longitude > 180 || this.longitude < -180) return console.group(new Date + " longitude 字段取值有误"), console.error("经度范围应为 -180 ~ 180"), void console.groupEnd();
      if (__map_jssdk_ready) this._insertIframeMap();
      else if (__map_jssdk_callback.push(this._insertIframeMap.bind(this)), !document.getElementById("__wx_map_jssdk__")) {
        var e = document.createElement("script");
        e.id = "__wx_map_jssdk__", e.type = "text/javascript", e.src = "https://map.qq.com/api/js?v=2.exp&callback=__map_jssdk_init", e.async = !0, document.body.appendChild(e)
      }
    },
    detached: function() {
      wx.publish("mapRemove", {
        domId: this.id,
        mapId: this._mapId,
        nodeId: this.getNodeId()
      })
    }
  }))
}(),
function() {
  if ("wechatdevtools" !== wx.getPlatform()) {
    var e = 9e8;
    window.exparser.registerElement({
      is: "wx-map",
      behaviors: ["wx-base", "wx-native", "wx-positioning-target"],
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "map",
          st: {
            v: "width: 100%; height: 100%;"
          },
          a: [],
          c: []
        }, {
          t: 1,
          n: "div",
          st: {
            v: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      },
      properties: {
        latitude: {
          type: Number,
          public: !0,
          filter: "latitudeChanged",
          value: 39.92
        },
        longitude: {
          type: Number,
          public: !0,
          filter: "longitudeChanged",
          value: 116.46
        },
        scale: {
          type: Number,
          public: !0,
          filter: "scaleChanged",
          value: 16
        },
        markers: {
          type: Array,
          value: [],
          public: !0,
          observer: "markersChanged"
        },
        covers: {
          type: Array,
          value: [],
          public: !0,
          observer: "coversChanged"
        },
        includePoints: {
          type: Array,
          value: [],
          public: !0,
          observer: "pointsChanged"
        },
        polyline: {
          type: Array,
          value: [],
          public: !0,
          observer: "linesChanged"
        },
        circles: {
          type: Array,
          value: [],
          public: !0,
          observer: "circlesChanged"
        },
        controls: {
          type: Array,
          value: [],
          public: !0,
          observer: "controlsChanged"
        },
        showLocation: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "showLocationChanged"
        },
        bindmarkertap: {
          type: String,
          value: "",
          public: !0
        },
        bindcallouttap: {
          type: String,
          value: "",
          public: !0
        },
        bindcontroltap: {
          type: String,
          value: "",
          public: !0
        },
        bindregionchange: {
          type: String,
          value: "",
          public: !0
        },
        bindtap: {
          type: String,
          value: "",
          public: !0
        },
        _mapId: {
          type: Number
        }
      },
      methods: {
        _delay: function(e, t, n) {
          this._deferred.push({
            callback: e,
            args: [t, n]
          })
        },
        _update: function(e, t) {
          e.mapId = this._mapId, e.hide = this.hidden, this.updateNativeView("updateMap", e, function(e) {})
        },
        _updatePosition: function() {
          this._isiOS() && (this._box.width = this._box.width || 1, this._box.height = this._box.height || 1), this.updateNativeView("updateMap", {
            mapId: this._mapId,
            position: this._box,
            covers: this.covers || []
          }, function(e) {})
        },
        _transformPath: function(e, t) {
          var n = this;
          return e.map(function(e) {
            var i = {};
            if (!e.iconPath) return e;
            Object.keys(e).forEach(function(t) {
              i[t] = e[t]
            });
            var r = i.iconPath;
            return i.iconPath = r.indexOf("wxfile://") > -1 || r.match(/^https?\:\/\//) ? r : n.getRealRoute(r, t), i
          })
        },
        _hiddenChanged: function(e, t) {
          this.$$.style.display = e ? "none" : "", this.updateNativeView("updateMap", {
            mapId: this._mapId,
            hide: e
          }, function(e) {})
        },
        _transformMarkers: function(e) {
          var t = this;
          return (e || []).map(function(e) {
            var n = {};
            if (!e) return n;
            if (Object.keys(e).forEach(function(t) {
                "[object Object]" === Object.prototype.toString.call(e[t]) ? (n[t] = {}, Object.keys(e[t]).forEach(function(i) {
                  n[t][i] = e[t][i]
                })) : n[t] = e[t]
              }), n.name && (n.title = n.title || n.name), n.label && (n.label.fontSize = n.label.fontSize || 12, n.label.bgColor = n.label.bgColor || "#00000000"), (n.latitude > 90 || n.latitude < -90) && console.warn("markers.latitude 范围是 -90 ~ 90，markers.id: [" + n._id + "]"), (n.longitude > 180 || n.longitude < -180) && console.warn("markers.longitude 范围是 -180 ~ 180，markers.id: [" + n._id + "]"), (n.iconPath || "").match(/^(http|\/\/)/) && (console.group(new Date + " iconPath不支持网络地址"), console.warn("markers.iconPath不支持网络地址，如需要，可传入通过wx.downloadFile接口下载得到的临时地址。"), console.groupEnd(), n.iconPath = ""), n.longitude = Number(n.longitude), n.latitude = Number(n.latitude), n.anchor = n.anchor || {
                x: .5,
                y: 1
              }, n.callout) {
              var i = (n.callout.boxShadow || "").trim().split(/\s+/);
              3 === i.length ? (n.callout.shadowOffsetX = parseFloat(i[0]), n.callout.shadowOffsetY = parseFloat(i[1]), t._isiOS() ? (n.callout.shadowColor = i[2].substr(0, 7), n.callout.shadowOpacity = Number("0x" + i[2].substr(7, 2)) / 255 || 1) : n.callout.shadowColor = i[2]) : (n.callout.shadowColor = "#FFFFFF", n.callout.shadowOpacity = 0), n.callout.display = "ALWAYS" === n.callout.display ? 1 : 0, n.callout.bgColor = n.callout.bgColor || "#FFFFFF", n.callout.textAlign = n.callout.textAlign || "left", n.callout.content = n.callout.content || "", delete n.title
            } else n.title && (n.callout = {
              content: n.title,
              bgColor: "#FFFFFF",
              padding: 10,
              display: 0,
              shadowColor: "#FFFFFF",
              shadowOpacity: 0,
              textAlign: "left"
            }, delete n.title);
            if ((n.callout || n.label) && t._isiOS()) {
              var r = window.navigator.userAgent;
              (/MicroMessenger\/6\.5\.16/.test(r) || /MicroMessenger\/6\.5\.17/.test(r) || /MicroMessenger\/6\.5\.18/.test(r)) && (n.anchor = {
                x: .5,
                y: .5
              })
            }
            return void 0 !== n._id && (t.bindmarkertap || t.bindcallouttap) && (n.data = JSON.stringify({
              markerId: n._id,
              bindmarkertap: t.bindmarkertap,
              bindcallouttap: t.bindcallouttap,
              target: {
                dataset: t.dataset,
                id: t.id,
                offsetTop: t.$$.offsetTop,
                offsetLeft: t.$$.offsetLeft
              },
              nodeId: t.getNodeId()
            })), n
          })
        },
        _transformControls: function(e) {
          var t = this;
          return e.map(function(e) {
            var n = {};
            return Object.keys(e).forEach(function(t) {
              n[t] = e[t]
            }), void 0 !== e.id && t.bindcontroltap && e.clickable && (n.data = JSON.stringify({
              controlId: e.id,
              bindcontroltap: t.bindcontroltap,
              target: {
                dataset: t.dataset,
                id: t.id,
                offsetTop: t.$$.offsetTop,
                offsetLeft: t.$$.offsetLeft
              },
              nodeId: t.getNodeId()
            })), n
          })
        },
        _insertNativeMap: function() {
          var e = this,
            t = this,
            n = this.getPositioningId(),
            i = this.fetchPositioningParentId();
          this._box = this._getBox(), this._box.width = this._box.width || 1, this._box.height = this._box.height || 1;
          var r = {
              position: this._box,
              centerLongitude: this.longitude,
              centerLatitude: this.latitude,
              scale: this.scale,
              covers: this.covers || [],
              hide: this.hidden,
              showLocation: this.showLocation,
              keepCenter: this.keepCenter,
              mapId: n,
              parentId: i
            },
            o = this.longitude,
            a = this.latitude,
            s = this.scale;
          this.insertNativeView("insertMap", r, function(i) {
            /ok/.test(i.errMsg) ? (t._mapId = n, t._ready(), t.findCoverView(i.containerId || t._mapId), wx.publish("mapInsert", {
              domId: t.id,
              mapId: t._mapId,
              showLocation: t.showLocation,
              bindregionchange: t.bindregionchange,
              bindtap: t.bindtap,
              target: {
                dataset: e.dataset,
                id: e.id,
                offsetTop: e.$$.offsetTop,
                offsetLeft: e.$$.offsetLeft
              },
              nodeId: e.getNodeId()
            }), t.__pageReRenderCallback = t._pageReRenderCallback.bind(t), document.addEventListener("pageReRender", t.__pageReRenderCallback), WeixinJSBridge.subscribe("doMapAction" + e._mapId, function(t) {
              if (e._mapId === t.data.mapId)
                if ("includeMapPoints" === t.data.method) WeixinJSBridge.invoke("includeMapPoints", {
                  mapId: e._mapId,
                  points: t.data.points,
                  padding: t.data.padding || [0, 0, 0, 0]
                }, function(e) {});
                else if ("getMapMarker" === t.data.method) {
                var n = void 0;
                e.markers.forEach(function(e) {
                  e.id === t.data.markerId && (n = {
                    longitude: e.longitude,
                    latitude: e.latitude
                  })
                }), WeixinJSBridge.publish("doMapActionCallback", {
                  errMsg: n ? "getMapMarker:ok" : "getMapMarker:fail",
                  mapId: e._mapId,
                  callbackId: t.data.callbackId,
                  method: t.data.method,
                  pos: n || {}
                })
              }
            }), o !== e.longitude && e.longitudeChanged(e.longitude), a !== e.latitude && e.latitudeChanged(e.latitude), s !== e.scale && e.scaleChanged(e.scale), t.triggerEvent("updated")) : t.triggerEvent("error", {
              errMsg: i.errMsg
            })
          })
        },
        latitudeChanged: function(e, t) {
          e && this._isReady && this._update({
            centerLatitude: e,
            centerLongitude: this.longitude
          }, "纬度")
        },
        longitudeChanged: function(e, t) {
          e && this._isReady && this._update({
            centerLatitude: this.latitude,
            centerLongitude: e
          }, "经度")
        },
        scaleChanged: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 16;
          arguments[1];
          e && this._isReady && this._update({
            centerLatitude: this.latitude,
            centerLongitude: this.longitude,
            scale: e
          }, "缩放")
        },
        coversChanged: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
          if (!this._isReady) return void this._delay("coversChanged", e, t);
          this._update({
            centerLatitude: this.latitude,
            centerLongitude: this.longitude,
            covers: this._transformPath(e, window.__route__)
          }, "覆盖物")
        },
        markersChanged: function() {
          function t(e, t) {
            for (var n = 0; n < e.length; n++) {
              if (e[n].id === t) return n
            }
            return -1
          }

          function n(e, t) {
            return JSON.stringify(e) !== JSON.stringify(t)
          }
          var i = this,
            r = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            o = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
          if (!this._isReady) return void this._delay("markersChanged", r, o);
          o = this._oldMarkers || [];
          var a = [],
            s = [],
            l = [];
          r = r.map(function(i) {
            var r = {};
            Object.keys(i).forEach(function(e) {
              r[e] = i[e]
            }), r._id = r.id, void 0 === r.id || isNaN(Number(r.id)) ? r.id = e++ : r.id = Number(r.id);
            var c = t(o, r.id);
            return c > -1 ? (n(r, o[c]) && (a.push(r), s.push(r.id)), l.push(c)) : a.push(r), r
          }), this._oldMarkers = r;
          for (var c = 0; c < o.length; c++) - 1 === l.indexOf(c) && s.push(Number(o[c].id));
          wx.invoke("removeMapMarkers", {
            mapId: this._mapId,
            markers: s
          }, function(e) {});
          var u = this._transformPath(this._transformMarkers(a), window.__route__);
          wx.invoke("addMapMarkers", {
            mapId: this._mapId,
            markers: u,
            clear: !1
          }, function(e) {
            i.triggerEvent("updated")
          })
        },
        linesChanged: function() {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            n = arguments[1];
          if (!this._isReady) return void this._delay("linesChanged", t, n);
          var i = [];
          t.forEach(function(t) {
            if (t) {
              var n = {};
              if (Object.keys(t).forEach(function(e) {
                  n[e] = t[e]
                }), (n.points || []).forEach(function(e) {
                  e.longitude = Number(e.longitude), e.latitude = Number(e.latitude)
                }), n.arrowIconPath) {
                var r = n.arrowIconPath;
                n.arrowIconPath = r.indexOf("wxfile://") > -1 || r.match(/^https?\:\/\//) ? r : e.getRealRoute(r, window.__route__)
              }
              i.push(n)
            }
          }), WeixinJSBridge.invoke("addMapLines", {
            mapId: this._mapId,
            lines: i
          }, function(t) {
            e.triggerEvent("updated")
          })
        },
        circlesChanged: function() {
          var e = this,
            t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            n = arguments[1];
          if (!this._isReady) return void this._delay("circlesChanged", t, n);
          t.forEach(function(e) {
            e.longitude = Number(e.longitude), e.latitude = Number(e.latitude)
          }), WeixinJSBridge.invoke("addMapCircles", {
            mapId: this._mapId,
            circles: t
          }, function(t) {
            e.triggerEvent("updated")
          })
        },
        pointsChanged: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
          if (!this._isReady) return void this._delay("pointsChanged", e, t);
          e.forEach(function(e) {
            e.latitude = Number(e.latitude), e.longitude = Number(e.longitude)
          });
          var n = .05 * this.$$.offsetWidth;
          WeixinJSBridge.invoke("includeMapPoints", {
            mapId: this._mapId,
            points: e,
            padding: [n, n, n, n]
          }, function(e) {})
        },
        controlsChanged: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [],
            t = arguments[1];
          if (!this._isReady) return void this._delay("controlsChanged", e, t);
          var n = this._transformPath(this._transformControls(e), window.__route__);
          WeixinJSBridge.invoke("addMapControls", {
            mapId: this._mapId,
            controls: n
          }, function(e) {})
        },
        showLocationChanged: function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
            t = arguments[1];
          if (!this._isReady) return void this._delay("showLocationChanged", e, t);
          this._update({
            showLocation: e
          })
        }
      },
      attached: function() {
        return this.latitude > 90 || this.latitude < -90 ? (console.group(new Date + " latitude 字段取值有误"), console.warn("纬度范围 -90 ~ 90"), void console.groupEnd()) : this.longitude > 180 || this.longitude < -180 ? (console.group(new Date + " longitude 字段取值有误"), console.warn("经度范围 -180 ~ 180"), void console.groupEnd()) : void this._insertNativeMap()
      },
      detached: function() {
        var e = this;
        this.removeNativeView("removeMap", {
          mapId: this._mapId
        }, function(t) {
          wx.publish("mapRemove", {
            domId: e.id,
            mapId: e._mapId,
            nodeId: e.getNodeId()
          })
        }), this.__pageReRenderCallback && document.removeEventListener("pageReRender", this.__pageReRenderCallback)
      }
    })
  }
}(), window.exparser.registerElement({
    is: "wx-modal",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "mask",
        cl: {
          v: "wx-modal-mask"
        },
        a: [],
        c: []
      }, {
        t: 1,
        n: "div",
        cl: {
          v: "wx-modal-dialog"
        },
        a: [],
        c: [{
          t: 1,
          n: "div",
          cl: {
            v: "wx-modal-dialog-hd"
          },
          a: [],
          c: [{
            t: 1,
            n: "strong",
            a: [{
              n: "parse-text-content",
              v: ""
            }],
            c: [{
              c: "",
              e: function(e, t, n) {
                return e.title
              },
              b: [
                [null, "title"]
              ],
              t: 3
            }]
          }]
        }, {
          t: 1,
          n: "div",
          cl: {
            v: "wx-modal-dialog-bd"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }, {
          t: 1,
          n: "div",
          cl: {
            v: "wx-modal-dialog-ft"
          },
          a: [],
          c: [{
            t: 1,
            n: "a",
            id: "cancel",
            cl: {
              v: "wx-modal-btn-default"
            },
            a: [{
              n: "hidden",
              o: "$",
              e: function(e, t, n) {
                return e.noCancel
              },
              l: [null],
              b: [
                [null, "noCancel"]
              ]
            }, {
              n: "parse-text-content",
              v: ""
            }],
            c: [{
              c: "",
              e: function(e, t, n) {
                return e.cancelText
              },
              b: [
                [null, "cancelText"]
              ],
              t: 3
            }]
          }, {
            t: 1,
            n: "a",
            id: "confirm",
            cl: {
              v: "wx-modal-btn-primary"
            },
            a: [{
              n: "parse-text-content",
              v: ""
            }],
            c: [{
              c: "",
              e: function(e, t, n) {
                return e.confirmText
              },
              b: [
                [null, "confirmText"]
              ],
              t: 3
            }]
          }]
        }]
      }]
    },
    behaviors: ["wx-base"],
    properties: {
      title: {
        type: String,
        public: !0
      },
      noCancel: {
        type: Boolean,
        value: !1,
        public: !0
      },
      confirmText: {
        type: String,
        value: "确定",
        public: !0
      },
      cancelText: {
        type: String,
        value: "取消",
        public: !0
      }
    },
    listeners: {
      "mask.tap": "_handleCancel",
      "confirm.tap": "_handleConfirm",
      "cancel.tap": "_handleCancel"
    },
    methods: {
      _handleConfirm: function() {
        this.triggerEvent("confirm")
      },
      _handleCancel: function() {
        this.triggerEvent("cancel")
      }
    }
  }), window.exparser.registerElement({
    is: "wx-mask",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "mask",
        cl: {
          v: "wx-mask"
        },
        st: {
          v: "display: none;"
        },
        a: [],
        c: []
      }]
    },
    behaviors: ["wx-base"],
    properties: {
      hidden: {
        type: Boolean,
        value: !0,
        observer: "hiddenChange",
        public: !0
      }
    },
    methods: {
      hiddenChange: function(e) {
        var t = this.$.mask;
        !0 === e ? (setTimeout(function() {
          t.style.display = "none"
        }, 300), this.$.mask.classList.add("wx-mask-transparent")) : (t.style.display = "block", t.focus(), t.classList.remove("wx-mask-transparent"))
      }
    }
  }), window.exparser.registerElement({
    is: "wx-movable-area",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    },
    behaviors: ["wx-base", "wx-positioning-container"],
    properties: {
      style: {
        type: String,
        public: !0,
        observer: "_styleChanged"
      },
      class: {
        type: String, public: !0, observer: "_classChanged"
      }
    },
    listeners: {
      "this.wxMovableViewChanged": "_movableViewChanged"
    },
    created: function() {
      this._items = []
    },
    attached: function() {
      this._movableViewChanged(), document.addEventListener("pageReRender", this._updateArea)
    },
    detached: function() {
      this._items = [], document.removeEventListener("pageReRender", this._updateArea)
    },
    methods: {
      _movableViewChanged: function() {
        var e = this._views = [];
        return function t(n) {
          for (var i = 0; i < n.childNodes.length; i++) {
            var r = n.childNodes[i];
            r instanceof exparser.Element && (r instanceof exparser.Component && r.hasBehavior("wx-movable-view") ? e.push(r) : t(r))
          }
        }(this), this._updateArea(), !1
      },
      _styleChanged: function(e) {
        this.$$.setAttribute("style", e), this._updateArea()
      },
      _classChanged: function(e) {
        this.classList.setClassNames(e), this._updateArea()
      },
      _updateArea: function() {
        var e = this;
        if (!this.__attached) return !1;
        this._height = this._getWH().height, this._width = this._getWH().width;
        var t = this;
        this._views.forEach(function(n, i) {
          n._setParent(t), n._updateArea(e._width, e._height)
        })
      },
      _getWH: function() {
        var e = window.getComputedStyle(this.$$),
          t = this.$$.getBoundingClientRect(),
          n = (["Left", "Right"].map(function(t) {
            return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
          }), ["Top", "Bottom"].map(function(t) {
            return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
          }));
        return {
          height: t.height - n[0] - n[1],
          width: t.width - n[0] - n[1]
        }
      }
    }
  }), window.exparser.registerElement({
    is: "wx-navigator",
    behaviors: ["wx-base", "wx-hover"],
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    },
    properties: {
      url: {
        type: String,
        public: !0
      },
      delta: {
        type: Number,
        public: !0,
        value: 1
      },
      redirect: {
        type: Boolean,
        value: !1,
        public: !0
      },
      openType: {
        type: String,
        value: "navigate",
        public: !0
      },
      hoverClass: {
        type: String,
        value: "navigator-hover",
        public: !0,
        observer: "_hoverClassChange"
      },
      hover: {
        type: Boolean,
        value: !0
      },
      hoverStayTime: {
        type: Number,
        value: 600,
        public: !0
      }
    },
    listeners: {
      tap: "navigateTo"
    },
    attached: function() {
      this._lock = !1
    },
    methods: {
      navigateTo: function() {
        var e = this;
        if ("navigateBack" !== this.openType && !this.url) return void console.error("<navigator/> should have url attribute when using navigateTo, redirectTo or switchTab");
        if (!this._lock) {
          if (this._lock = !0, setTimeout(function() {
              e._lock = !1
            }, 1e3), this.redirect) return void wx.redirectTo({
            url: this.url
          });
          switch (this.openType) {
            case "navigate":
            case "navigateTo":
              return void wx.navigateTo({
                url: this.url
              });
            case "redirect":
            case "redirectTo":
              return void wx.redirectTo({
                url: this.url
              });
            case "switchTab":
              return void wx.switchTab({
                url: this.url
              });
            case "navigateBack":
              return void wx.navigateBack({
                delta: this.delta
              });
            case "reLaunch":
              return void wx.reLaunch({
                url: this.url
              });
            default:
              return void console.error("<navigator/> with invalid openType " + this.openType)
          }
        }
      }
    }
  }),
  function() {
    function e(e, t, n) {
      return e > t - n && e < t + n
    }

    function t(t, n) {
      return e(t, 0, n)
    }

    function n() {}

    function i(e, t) {
      this._m = e, this._f = 1e3 * t, this._startTime = 0, this._v = 0
    }

    function r(e, t, n) {
      this._m = e, this._k = t, this._c = n, this._solution = null, this._endPosition = 0, this._startTime = 0
    }

    function o(e, t, n) {
      this._springX = new r(e, t, n), this._springY = new r(e, t, n), this._startTime = 0
    }

    function a(e) {
      u || (u = !0, requestAnimationFrame(function() {
        e(), u = !1
      }))
    }
    var s = function e(t, n) {
        if (t === n) return 0;
        var i = t.offsetLeft;
        return t.offsetParent ? i += e(t.offsetParent, n) : 0
      },
      l = function e(t, n) {
        if (t === n) return 0;
        var i = t.offsetTop;
        return t.offsetParent ? i += e(t.offsetParent, n) : 0
      },
      c = function(e, t, n) {
        var i = function(e) {
            e && e.id && cancelAnimationFrame(e.id), e && (e.cancelled = !0)
          },
          r = {
            id: 0,
            cancelled: !1
          };
        return function t(n, i, r, o) {
          if (!n || !n.cancelled) {
            r(i);
            var a = e.done();
            a || n.cancelled || (n.id = requestAnimationFrame(t.bind(null, n, i, r, o))), a && o && o(i)
          }
        }(r, e, t, n), {
          cancel: i.bind(null, r),
          model: e
        }
      };
    n.prototype.x = function(e) {
      return Math.sqrt(e)
    }, i.prototype.setV = function(e, t) {
      var n = Math.pow(Math.pow(e, 2) + Math.pow(t, 2), .5);
      this._x_v = e, this._y_v = t, this._x_a = -this._f * this._x_v / n, this._y_a = -this._f * this._y_v / n, this._t = Math.abs(e / this._x_a) || Math.abs(t / this._y_a), this._startTime = (new Date).getTime()
    }, i.prototype.setS = function(e, t) {
      this._x_s = e, this._y_s = t
    }, i.prototype.s = function(e) {
      void 0 == e && (e = ((new Date).getTime() - this._startTime) / 1e3), e > this._t && (e = this._t);
      var t = this._x_v * e + .5 * this._x_a * Math.pow(e, 2) + this._x_s,
        n = this._y_v * e + .5 * this._y_a * Math.pow(e, 2) + this._y_s;
      return (this._x_a > 0 && t < this._endPositionX || this._x_a < 0 && t > this._endPositionX) && (t = this._endPositionX), (this._y_a > 0 && n < this._endPositionY || this._y_a < 0 && n > this._endPositionY) && (n = this._endPositionY), {
        x: t,
        y: n
      }
    }, i.prototype.ds = function(e) {
      return void 0 == e && (e = ((new Date).getTime() - this._startTime) / 1e3), e > this._t && (e = this._t), {
        dx: this._x_v + this._x_a * e,
        dy: this._y_v + this._y_a * e
      }
    }, i.prototype.delta = function() {
      return {
        x: -1.5 * Math.pow(this._x_v, 2) / this._x_a || 0,
        y: -1.5 * Math.pow(this._y_v, 2) / this._y_a || 0
      }
    }, i.prototype.dt = function() {
      return -this._x_v / this._x_a
    }, i.prototype.done = function(t) {
      return e(this.s().x, this._endPositionX) || e(this.s().y, this._endPositionY)
    }, i.prototype.setEnd = function(e, t) {
      this._endPositionX = e, this._endPositionY = t
    }, i.prototype.reconfigure = function(e, t) {
      this._m = e, this._f = 1e3 * t
    }, r.prototype._solve = function(e, t) {
      var n = this._c,
        i = this._m,
        r = this._k,
        o = n * n - 4 * i * r;
      if (0 == o) {
        var a = -n / (2 * i),
          s = e,
          l = t / (a * e);
        return {
          x: function(e) {
            return (s + l * e) * Math.pow(Math.E, a * e)
          },
          dx: function(e) {
            var t = Math.pow(Math.E, a * e);
            return a * (s + l * e) * t + l * t
          }
        }
      }
      if (o > 0) {
        var c = (-n - Math.sqrt(o)) / (2 * i),
          u = (-n + Math.sqrt(o)) / (2 * i),
          l = (t - c * e) / (u - c),
          s = e - l;
        return {
          x: function(e) {
            var t, n;
            return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, c * e)), n || (n = this._powER2T = Math.pow(Math.E, u * e)), s * t + l * n
          },
          dx: function(e) {
            var t, n;
            return e === this._t && (t = this._powER1T, n = this._powER2T), this._t = e, t || (t = this._powER1T = Math.pow(Math.E, c * e)), n || (n = this._powER2T = Math.pow(Math.E, u * e)), s * c * t + l * u * n
          }
        }
      }
      var d = Math.sqrt(4 * i * r - n * n) / (2 * i),
        a = -n / 2 * i,
        s = e,
        l = (t - a * e) / d;
      return {
        x: function(e) {
          return Math.pow(Math.E, a * e) * (s * Math.cos(d * e) + l * Math.sin(d * e))
        },
        dx: function(e) {
          var t = Math.pow(Math.E, a * e),
            n = Math.cos(d * e),
            i = Math.sin(d * e);
          return t * (l * d * n - s * d * i) + a * t * (l * i + s * n)
        }
      }
    }, r.prototype.x = function(e) {
      return void 0 == e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._endPosition + this._solution.x(e) : 0
    }, r.prototype.dx = function(e) {
      return void 0 == e && (e = ((new Date).getTime() - this._startTime) / 1e3), this._solution ? this._solution.dx(e) : 0
    }, r.prototype.setEnd = function(e, n, i) {
      if (i || (i = (new Date).getTime()), e != this._endPosition || !t(n, .1)) {
        n = n || 0;
        var r = this._endPosition;
        this._solution && (t(n, .1) && (n = this._solution.dx((i - this._startTime) / 1e3)), r = this._solution.x((i - this._startTime) / 1e3), t(n, .1) && (n = 0), t(r, .1) && (r = 0), r += this._endPosition), this._solution && t(r - e, .1) && t(n, .1) || (this._endPosition = e, this._solution = this._solve(r - this._endPosition, n), this._startTime = i)
      }
    }, r.prototype.snap = function(e) {
      this._startTime = (new Date).getTime(), this._endPosition = e, this._solution = {
        x: function() {
          return 0
        },
        dx: function() {
          return 0
        }
      }
    }, r.prototype.done = function(n) {
      return n || (n = (new Date).getTime()), e(this.x(), this._endPosition, .1) && t(this.dx(), .1)
    }, r.prototype.reconfigure = function(e, t, n) {
      this._m = e, this._k = t, this._c = n, this.done() || (this._solution = this._solve(this.x() - this._endPosition, this.dx()), this._startTime = (new Date).getTime())
    }, r.prototype.springConstant = function() {
      return this._k
    }, r.prototype.damping = function() {
      return this._c
    }, r.prototype.configuration = function() {
      function e(e, t) {
        e.reconfigure(1, t, e.damping())
      }

      function t(e, t) {
        e.reconfigure(1, e.springConstant(), t)
      }
      return [{
        label: "Spring Constant",
        read: this.springConstant.bind(this),
        write: e.bind(this, this),
        min: 100,
        max: 1e3
      }, {
        label: "Damping",
        read: this.damping.bind(this),
        write: t.bind(this, this),
        min: 1,
        max: 500
      }]
    }, o.prototype.setEnd = function(e, t, n) {
      var i = (new Date).getTime();
      this._springX.setEnd(e, n, i), this._springY.setEnd(t, n, i), this._startTime = i
    }, o.prototype.x = function() {
      var e = ((new Date).getTime() - this._startTime) / 1e3;
      return {
        x: this._springX.x(e),
        y: this._springY.x(e)
      }
    }, o.prototype.done = function() {
      var e = (new Date).getTime();
      return this._springX.done(e) && this._springY.done(e)
    }, o.prototype.reconfigure = function(e, t, n) {
      this._springX.reconfigure(e, t, n), this._springY.reconfigure(e, t, n)
    };
    var u = !1;
    window.exparser.registerElement({
      is: "wx-movable-view",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      },
      behaviors: ["wx-base", "wx-touchtrack", "wx-positioning-container"],
      properties: {
        x: {
          type: Number,
          value: 0,
          public: !0,
          observer: "_setX"
        },
        y: {
          type: Number,
          value: 0,
          public: !0,
          observer: "_setY"
        },
        direction: {
          type: String,
          value: "none",
          public: !0
        },
        outOfBounds: {
          type: Boolean,
          value: !1,
          public: !0
        },
        inertia: {
          type: Boolean,
          value: !1,
          public: !0
        },
        style: {
          type: String,
          public: !0,
          observer: "_styleChanged"
        },
        class: {
          type: String, public: !0, observer: "_classChanged"
        },
        friction: {
          type: Number,
          value: 2,
          public: !0
        },
        damping: {
          type: Number,
          value: 20,
          public: !0
        }
      },
      created: function() {
        this._canMove = !1, this._xMove = !1, this._yMove = !1, this._offset = {
          x: 0,
          y: 0
        }, this._translateX = 0, this._translateY = 0, this.__minX = 0, this.__minY = 0, this.__maxX = 0, this.__maxY = 0, this._STD = new o(1, 9 * Math.pow(this.damping, 2) / 40, this.damping), this._friction = new i(1, this.friction), this._declineX = new n, this._declineY = new n, this.__touchInfo = {
          historyX: [0, 0],
          historyY: [0, 0],
          historyT: [0, 0]
        }
      },
      attached: function() {
        var e = this;
        this.triggerEvent("wxMovableViewChanged", void 0, {
          bubbles: !0
        }), "horizontal" === this.direction || "all" === this.direction ? this._xMove = !0 : this._xMove = !1, "vertical" === this.direction || "all" === this.direction ? this._yMove = !0 : this._yMove = !1;
        var t = this;
        this.friction <= 0 && (this.friction = 2), this._friction.reconfigure(1, this.friction), this._STD.reconfigure(1, 9 * Math.pow(this.damping, 2) / 40, this.damping), this.__handleTouchStart = function(n) {
          WeixinJSBridge.invoke("disableScrollBounce", {
            disable: !0
          }, function() {}), e._FA && e._FA.cancel(), e._SFA && e._SFA.cancel(), t.__touchInfo.historyX = [0, 0], t.__touchInfo.historyY = [0, 0], t.__touchInfo.historyT = [0, 0], 1 == n.touches.length && (t._touchStartX = n.touches[0].pageX, t._touchStartY = n.touches[0].pageY, t._xMove && (t.__baseX = t._translateX), t._yMove && (t.__baseY = t._translateY), t.$$.style.willChange = "transform", t._bubble = null)
        }, this.__handleTouchMove = function(e) {
          if (1 == e.touches.length) {
            var n = t.x,
              i = t.y;
            t._xMove && (n = e.touches[0].pageX - t._touchStartX + t.__baseX, t.__touchInfo.historyX.splice(0, 1), t.__touchInfo.historyX.push(n), t._yMove || null !== t._bubble || (Math.abs((e.touches[0].pageX - t._touchStartX) / (e.touches[0].pageY - t._touchStartY)) > 1 ? t._bubble = !1 : t._bubble = !0)), t._yMove && (i = e.touches[0].pageY - t._touchStartY + t.__baseY, t.__touchInfo.historyY.splice(0, 1), t.__touchInfo.historyY.push(i), t._xMove || null !== t._bubble || (Math.abs((e.touches[0].pageY - t._touchStartY) / (e.touches[0].pageX - t._touchStartX)) > 1 ? t._bubble = !1 : t._bubble = !0)), t.__touchInfo.historyT.splice(0, 1), t.__touchInfo.historyT.push(e.timeStamp), !0 !== t._bubble && (e.preventDefault(), e.stopPropagation(), n < t.__minX ? n = t.outOfBounds ? t.__minX - t._declineX.x(t.__minX - n) : t.__minX : n > t.__maxX && (n = t.outOfBounds ? t.__maxX + t._declineX.x(n - t.__maxX) : t.__maxX), i < t.__minY ? i = t.outOfBounds ? t.__minY - t._declineY.x(t.__minY - i) : t.__minY : i > t.__maxY && (i = t.outOfBounds ? t.__maxY + t._declineY.x(i - t.__maxY) : t.__maxY), a(function() {
              t._setTransform(n, i)
            }))
          }
        }, this.__handleTouchEnd = function(e) {
          if (t.$$.style.willChange = "auto", WeixinJSBridge.invoke("disableScrollBounce", {
              disable: !1
            }, function() {}), !0 !== t._bubble && !t._revise() && (t.x = t._translateX, t.y = t._translateY, t.inertia)) {
            var n = 1e3 * (t.__touchInfo.historyX[1] - t.__touchInfo.historyX[0]) / (t.__touchInfo.historyT[1] - t.__touchInfo.historyT[0]),
              i = 1e3 * (t.__touchInfo.historyY[1] - t.__touchInfo.historyY[0]) / (t.__touchInfo.historyT[1] - t.__touchInfo.historyT[0]);
            t._friction.setV(n, i), t._friction.setS(t._translateX, t._translateY);
            var r = t._friction.delta().x,
              o = t._friction.delta().y,
              a = r + t._translateX,
              s = o + t._translateY;
            a < t.__minX ? (a = t.__minX, s = t._translateY + (t.__minX - t._translateX) * o / r) : a > t.__maxX && (a = t.__maxX, s = t._translateY + (t.__maxX - t._translateX) * o / r), s < t.__minY ? (s = t.__minY, a = t._translateX + (t.__minY - t._translateY) * r / o) : s > t.__maxY && (s = t.__maxY, a = t._translateX + (t.__maxY - t._translateY) * r / o), t._friction.setEnd(a, s), t._FA = c(t._friction, function() {
              t._setTransform(t._friction.s().x, t._friction.s().y)
            }, function() {
              t._FA.cancel(), t.x = t._translateX, t.y = t._translateY
            })
          }
        }, this.$$.addEventListener("touchstart", this.__handleTouchStart), this.$$.addEventListener("touchmove", this.__handleTouchMove), this.$$.addEventListener("touchend", this.__handleTouchEnd)
      },
      detached: function() {
        this.triggerEvent("wxMovableViewChanged", void 0, {
          bubbles: !0
        }), this.$$.removeEventListener("touchstart", this.__handleTouchStart), this.$$.removeEventListener("touchmove", this.__handleTouchMove), this.$$.removeEventListener("touchend", this.__handleTouchEnd)
      },
      methods: {
        _setX: function(e, t) {
          return !!this._xMove && (e != this._translateX && (this._SFA && this._SFA.cancel(), void this._moveTo(e, this.y)))
        },
        _setY: function(e, t) {
          return !!this._yMove && (e != this._translateY && (this._SFA && this._SFA.cancel(), void this._moveTo(this.x, e)))
        },
        _moveTo: function(e, t) {
          this._FA && this._FA.cancel(), this._SFA && this._SFA.cancel(), this._xMove || (e = this._translateX), this._yMove || (t = this._translateY), e > this.__maxX ? e = this.__maxX : e < this.__minX && (e = this.__minX), t > this.__maxY ? t = this.__maxY : t < this.__minY && (t = this.__minY);
          var n = this;
          this._STD._springX._solution = null, this._STD._springY._solution = null, this._STD._springX._endPosition = this._translateX, this._STD._springY._endPosition = this._translateY, this._STD.setEnd(e, t, 1), this._SFA = c(n._STD, function() {
            n._setTransform(n._STD.x().x, n._STD.x().y)
          }, function() {
            n._SFA.cancel(), n.x = n._translateX, n.y = n._translateY
          })
        },
        _setTransform: function(e, t) {
          null != e && "NaN" != e.toString() && "number" == typeof e || (e = this._translateX || 0), null != t && "NaN" != t.toString() && "number" == typeof t || (t = this._translateY || 0), e = Number(e.toFixed(1)), t = Number(t.toFixed(1));
          var n = "translateX(" + e + "px) translateY(" + t + "px) translateZ(0px)";
          this.$$.style.transform = n, this.$$.style.webkitTransform = n, this._translateX = e, this._translateY = t
        },
        _setParent: function(e) {
          this._parentArea = e, this._canMove = !0, this._areaWidth = this._parentArea._width || 0, this._areaHeight = this._parentArea._height || 0, this._updateWH(), this._updateOffset(), this._updateBoundary(), this._translateX = this.x, this._translateY = this.y, this._revise()
        },
        _updateArea: function(e, t) {
          e && (this._areaWidth = e), t && (this._areaHeight = t), this._updateBoundary(), this._revise()
        },
        _resetPosition: function() {
          this._updateOffset(), this._updateBoundary(), this._revise()
        },
        _revise: function() {
          var e = !1,
            t = this._translateX,
            n = this._translateY;
          return this._translateX > this.__maxX ? (t = this.__maxX, e = !0) : this._translateX < this.__minX && (t = this.__minX, e = !0), this._translateY > this.__maxY ? (n = this.__maxY, e = !0) : this._translateY < this.__minY && (n = this.__minY, e = !0), this._moveTo(t, n), e
        },
        _styleChanged: function(e) {
          this.$$.setAttribute("style", e), this._updateWH(), this._updateBoundary(), this._revise()
        },
        _classChanged: function(e) {
          this.classList.setClassNames(e), this._updateWH(), this._updateBoundary(), this._revise()
        },
        _updateWH: function() {
          var e = this.$$.getBoundingClientRect();
          this._height = e.height, this._width = e.width
        },
        _updateOffset: function() {
          this._offset.x = s(this.$$, this._parentArea.$$), this._offset.y = l(this.$$, this._parentArea.$$)
        },
        _updateBoundary: function() {
          this._areaWidth > this._width ? (this.__minX = 0 - this._offset.x, this.__maxX = this._areaWidth - this._width - this._offset.x) : (this.__minX = this._areaWidth - this._width - this._offset.x, this.__maxX = 0 - this._offset.x), this._areaHeight > this._height ? (this.__minY = 0 - this._offset.y, this.__maxY = this._areaHeight - this._height - this._offset.y) : (this.__minY = this._areaHeight - this._height - this._offset.y, this.__maxY = 0 - this._offset.y)
        }
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-open-data",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "span",
        id: "main",
        a: [],
        c: []
      }]
    },
    behaviors: ["wx-base"],
    properties: {
      openGid: {
        type: String,
        public: !0,
        observer: "_update"
      },
      type: {
        type: String,
        public: !0,
        observer: "_update"
      },
      gidCounter: {
        type: Number,
        value: 0
      },
      lastGid: {
        type: Number,
        value: 0
      }
    },
    methods: {
      _update: function() {
        var e = this;
        this.gidCounter += 1;
        var t = this.gidCounter;
        "groupName" === this.type && this.openGid && wx.getGroupInfoByGId({
          openGId: this.openGid,
          complete: function(n) {
            t > e.lastGid && (e.lastGid = t, e.$.main.innerHTML = n.roomTopic, delete n.roomTopic, e.triggerEvent("getgroupname", n))
          }
        })
      }
    },
    created: function() {
      this._update()
    }
  });
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
window.exparser.registerElement({
  is: "wx-picker",
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "div",
      id: "wrapper",
      a: [],
      c: [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    }]
  },
  behaviors: ["wx-base", "wx-data-component"],
  properties: {
    range: {
      type: Array,
      value: [],
      public: !0,
      observer: "rangeChanged"
    },
    value: {
      value: "",
      public: !0,
      observer: "valueChanged"
    },
    mode: {
      type: String,
      value: "selector",
      public: !0
    },
    fields: {
      type: String,
      value: "day",
      public: !0
    },
    start: {
      type: String,
      value: "",
      public: !0
    },
    end: {
      type: String,
      value: "",
      public: !0
    },
    disabled: {
      type: Boolean,
      value: !1,
      public: !0
    },
    rangeKey: {
      type: String,
      value: "",
      public: !0
    },
    customItem: {
      type: String,
      value: "",
      public: !0
    }
  },
  listeners: {
    "wrapper.tap": "showPickerView"
  },
  methods: {
    resetFormData: function() {
      "selector" == this.mode ? this.value = -1 : this.value = "", "number" == typeof this._groupID && (this._groupID = null)
    },
    getFormData: function(e) {
      this.__pickerShow ? this.__formCallback = e : "function" == typeof e && e("region" === this.mode ? this.__region_data_ready ? this._getRegionByValue(this.value) : "object" === _typeof(this.value) && this.value instanceof Array ? this.value : [] : this.value)
    },
    formGetDataCallback: function() {
      "function" == typeof this.__formCallback && this.__formCallback(this.value), this.__formCallback = void 0
    },
    showPickerView: function() {
      "date" == this.mode || "time" == this.mode ? this.showDatePickerView() : "multiSelector" === this.mode ? this.showMultiPickerView() : "region" === this.mode ? this.showRegionView() : "selector" === this.mode && this.showSelector()
    },
    getCustomerStyle: function() {
      var e = this.$.wrapper.getBoundingClientRect();
      return {
        width: e.width,
        height: e.height,
        left: e.left + window.scrollX,
        top: e.top + window.scrollY
      }
    },
    getForm: function() {
      for (var e = void 0, t = this.parentNode; t;) {
        if (t instanceof exparser.Component && t.hasBehavior("wx-form")) {
          e = t;
          break
        }
        t = t.parentNode
      }
      return e
    },
    showSelector: function(e) {
      var t = this;
      if (!this.disabled) {
        var n = parseInt(this.value);
        (isNaN(n) || n >= this.range.length) && (n = 0);
        var i = [];
        if (this.rangeKey)
          for (var r = 0; r < this.range.length; r++) {
            var o = this.range[r];
            i.push(o[this.rangeKey] + "")
          } else
            for (var r = 0; r < this.range.length; r++) i.push(this.range[r] + "");
        WeixinJSBridge.invoke("showPickerView", {
          array: i,
          current: n,
          style: this.getCustomerStyle()
        }, function(e) {
          /:ok/.test(e.errMsg) && (t.value = e.index.toString(), t.triggerEvent("change", {
            value: t.value
          })), t.resetPickerState(), t.formGetDataCallback()
        }), this.__pickerShow = !0
      }
    },
    showDatePickerView: function() {
      var e = this;
      this.disabled || (WeixinJSBridge.invoke("showDatePickerView", {
        range: {
          start: this.start,
          end: this.end
        },
        mode: this.mode,
        current: this.value,
        fields: this.fields,
        style: this.getCustomerStyle()
      }, function(t) {
        /:ok/.test(t.errMsg) && (e.value = t.value, e.triggerEvent("change", {
          value: e.value
        })), e.resetPickerState(), e.formGetDataCallback()
      }), this.__pickerShow = !0)
    },
    showMultiPickerView: function(e, t, n) {
      var i = this;
      if (!this.disabled) {
        var r = [],
          o = [];
        if (void 0 !== e) this.value = r = e.current, this.range = o = e.array;
        else
          for (var a = 0; a < this.range.length; a++) {
            this.value && "object" === _typeof(this.value) && this.value instanceof Array ? (r.push(parseInt(this.value[a])), (isNaN(r[a]) || r[a] >= this.range[a].length) && (r[a] = 0)) : r.push(0);
            var s = [];
            if (this.rangeKey)
              for (var l = 0; l < this.range[a].length; l++) {
                var c = this.range[a][l];
                s.push(c[this.rangeKey] + "")
              } else
                for (var l = 0; l < this.range[a].length; l++) s.push(this.range[a][l] + "");
            o.push(s)
          }
        WeixinJSBridge.invoke("showMultiPickerView", {
          array: o,
          current: r
        }, function(e) {
          /:ok/.test(e.errMsg) && (i.value = e.current, i.triggerEvent("change", {
            value: "function" == typeof n ? n(i.value) : i.value
          })), i.resetPickerState(), i.formGetDataCallback()
        }), this.__pickerShow = !0, this.__multi_picker_watching = !0, WeixinJSBridge.on("onMultiPickerViewChange", function(e) {
          i.__pickerShow && i.value[e.column] !== e.current && (i.value[e.column] = e.current, "function" == typeof t ? t(e) : i.triggerEvent("columnchange", {
            column: e.column,
            value: e.current
          }))
        })
      }
    },
    showRegionView: function() {
      var e = this;
      if (!this.disabled) {
        var t = function(t) {
          var n = [e.value[0], e.value[1], e.value[2]];
          switch (n[t.column] = t.current, t.column) {
            case 0:
              n[1] = 0;
            case 1:
              n[2] = 0;
              var i = e._getCurrentData(n);
              e.value = i.current, e.range = i.array;
              break;
            case 2:
              e.value = n
          }
        };
        this.__region_data_ready ? this.showMultiPickerView(this._getCurrentData(this.value), t, this._getRegionByValue.bind(this)) : WeixinJSBridge.invoke("getRegionData", {}, function(n) {
          /:ok/.test(n.errMsg) && (e._getRegionData(n.data), e.showMultiPickerView(e._getCurrentData(e.value), t, e._getRegionByValue.bind(e)))
        })
      }
    },
    resetPickerState: function() {
      this.__pickerShow = !1
    },
    valueChanged: function(e, t) {
      var n = this;
      this.__pickerShow && this.__multi_picker_watching && function i(r, o) {
        if (!(r >= o))
          if (e[r] !== t[r]) {
            var a = e[r] >= n.range[r].length ? 0 : e[r],
              s = [];
            if (n.rangeKey)
              for (var l = 0; l < n.range[r].length; l++) {
                var c = n.range[r][l];
                s.push(c[n.rangeKey] + "")
              } else
                for (var l = 0; l < n.range[r].length; l++) s.push(n.range[r][l] + "");
            WeixinJSBridge.invoke("updateMultiPickerView", {
              column: r,
              array: s,
              current: a
            }, function(e) {
              /:ok/.test(e.errMsg) && (n.value[r] = a, i(r + 1, o))
            })
          } else i(r + 1, o)
      }(0, e.length)
    },
    rangeChanged: function(e, t) {
      var n = this;
      this.__pickerShow && this.__multi_picker_watching && function i(r, o) {
        if (!(r >= o))
          if (n._diffArray(e[r], t[r])) i(r + 1, o);
          else {
            var a = n.value[r] >= e[r].length ? 0 : n.value[r],
              s = [];
            if (n.rangeKey)
              for (var l = 0; l < e[r].length; l++) {
                var c = e[r][l];
                s.push(c[n.rangeKey] + "")
              } else
                for (var l = 0; l < e[r].length; l++) s.push(e[r][l] + "");
            WeixinJSBridge.invoke("updateMultiPickerView", {
              column: r,
              array: s,
              current: a
            }, function(e) {
              /:ok/.test(e.errMsg) && (n.value[r] = a, i(r + 1, o))
            })
          }
      }(0, e.length)
    },
    _getRegionByValue: function(e) {
      "object" === (void 0 === e ? "undefined" : _typeof(e)) && e instanceof Array || (e = []);
      var t = this._getCurrentDataList(e);
      return [t.province.array[t.province.current], t.city.array[t.city.current], t.district.array[t.district.current]]
    },
    _getRegionData: function(e) {
      var t = this;
      this.__region_data_provinces = [], this.__region_data_cities = {}, this.__region_data_districts = {}, e.split("\n").forEach(function(e) {
        var n = e.replace(/[\r]/g, "").split(/\s+/);
        if (3 == n.length) {
          var i = n[0],
            r = n[1],
            o = i.substr(0, 2),
            a = i.substr(0, 4);
          /0000$/.test(i) ? (t.__region_data_provinces.push({
            code: o,
            name: r
          }), t.__region_data_cities[o] = []) : /00$/.test(i) ? (t.__region_data_cities[o].push({
            code: a,
            name: r
          }), t.__region_data_districts[a] = []) : t.__region_data_districts[a].push(r)
        }
      }), this.__region_data_ready = !0
    },
    _getCurrentData: function(e) {
      var t = this._getCurrentDataList(e);
      return {
        array: [t.province.array, t.city.array, t.district.array],
        current: [t.province.current, t.city.current, t.district.current]
      }
    },
    _getCurrentDataList: function(e) {
      var t, n, i, r = e.length;
      return t = r >= 1 ? this._getCurrentDataEach(e[0], this.__region_data_provinces) : this._getCurrentDataEach("" !== this.customItem ? this.customItem : this.__region_data_provinces[0].name, this.__region_data_provinces), n = r >= 2 ? this._getCurrentDataEach(e[1], -1 === t.code ? [] : this.__region_data_cities[t.code] || []) : this._getCurrentDataEach(-1 === t.code ? this.customItem : this.__region_data_cities[t.code] ? this.__region_data_cities[t.code][0].name : "", -1 === t.code ? [] : this.__region_data_cities[t.code] || []), i = r >= 3 ? this._getCurrentDataEach(e[2], -1 === n.code ? [] : this.__region_data_districts[n.code] || []) : this._getCurrentDataEach(-1 === n.code ? this.customItem : this.__region_data_districts[n.code] ? this.__region_data_districts[n.code][0] : "", -1 === n.code ? [] : this.__region_data_districts[n.code] || []), {
        province: t,
        city: n,
        district: i
      }
    },
    _getCurrentDataEach: function(e, t) {
      var n = t.length && "object" === _typeof(t[0]),
        i = {
          current: 0,
          array: ("" !== this.customItem ? [this.customItem] : []).concat(n ? t.map(function(e) {
            return e.name
          }) : t)
        };
      return i.current = "number" == typeof e ? e : i.array.indexOf(e), i.current < 0 && (i.current = 0), n ? "" !== this.customItem ? 0 === i.current ? i.code = -1 : i.code = t[i.current - 1].code : i.code = t[i.current].code : t.length || (i.code = -1), i
    },
    _diffArray: function(e, t) {
      if (e.length !== t.length) return !1;
      for (var n = 0, i = e.length; n < i; n++)
        if ("object" === _typeof(e[n]) && "object" === _typeof(t[n])) {
          if (e[n][this.rangeKey] !== t[n][this.rangeKey]) return !1
        } else if (_typeof(e[n]) !== _typeof(t[n]) || e[n] !== t[n]) return !1;
      return !0
    }
  }
}), window.exparser.registerElement({
  is: "wx-picker-view",
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "div",
      id: "wrapper",
      cl: {
        v: "wrapper"
      },
      a: [],
      c: [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    }]
  },
  behaviors: ["wx-base", "wx-class-prefix", "wx-data-component"],
  properties: {
    value: {
      type: Array,
      value: [],
      public: !0,
      observer: "_valueChanged"
    },
    indicatorStyle: {
      type: String,
      value: "",
      public: !0
    },
    indicatorClass: {
      type: String,
      value: "",
      public: !0
    },
    maskStyle: {
      type: String,
      value: "",
      public: !0
    },
    maskClass: {
      type: String,
      value: "",
      public: !0
    }
  },
  listeners: {
    "this.wxPickerColumnValueChanged": "_columnValueChanged",
    "this.wxPickerColumnChanged": "_initColumns"
  },
  attached: function() {
    this._initColumns(), this.__updateColumns = this._updateColumns.bind(this), document.addEventListener("pageReRender", this.__updateColumns)
  },
  detached: function() {
    document.removeEventListener("pageReRender", this.__updateColumns)
  },
  methods: {
    _initColumns: function() {
      var e = this,
        t = this._columns = [];
      ! function e(n) {
        for (var i = 0; i < n.childNodes.length; i++) {
          var r = n.childNodes[i];
          r instanceof exparser.Element && (r instanceof exparser.Component && r.hasBehavior("wx-picker-view-column") ? t.push(r) : e(r))
        }
      }(this);
      var n = "[object Array]" === Object.prototype.toString.call(this.value) ? this.value : [];
      this._height = this.$$.offsetHeight, t.forEach(function(t, i) {
        t._setStyle(e.indicatorStyle, e.maskStyle), t._setClass(e.indicatorClass, e.maskClass), t._setHeight(e._height), t._setCurrent(n[i] || 0), t._init()
      }), this._valueChanged(this.value)
    },
    _updateColumns: function() {
      var e = this;
      if (this._columns && 0 !== this._columns.length) {
        var t = !1;
        this._columns.forEach(function(e) {
          e._height !== e.$$.offsetHeight && (t = !0)
        }), !t && this._height === this.$$.offsetHeight || 0 === this.$$.offsetHeight || (this._height = this.$$.offsetHeight, this._columns.forEach(function(t, n) {
          t._setHeight(e._height), t._update()
        }))
      }
    },
    _columnValueChanged: function() {
      var e = this._columns.map(function(e) {
        return e._getCurrent()
      });
      this.triggerEvent("change", {
        value: e
      })
    },
    _valueChanged: function() {
      var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : [];
      (this._columns || []).forEach(function(t, n) {
        t._setCurrent(e[n] || 0), t._update()
      })
    }
  }
});
var PROGRESS_BACKGROUND_COLOR = "#EBEBEB",
  PROGRESS_ACTIVE_COLOR = "#09BB07";
window.exparser.registerElement({
  is: "wx-progress",
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "div",
      cl: {
        v: "wx-progress-bar"
      },
      a: [{
        n: "background-color",
        o: "s",
        e: function(e, t, n) {
          return e.backgroundColor
        },
        l: [null],
        b: [
          [null, "backgroundColor"]
        ]
      }, {
        n: "height",
        o: "s",
        e: function(e, t, n) {
          return e.strokeWidth + "px"
        },
        l: null,
        b: [
          [null, "strokeWidth"]
        ]
      }],
      c: [{
        t: 1,
        n: "div",
        cl: {
          v: "wx-progress-inner-bar"
        },
        a: [{
          n: "width",
          o: "s",
          e: function(e, t, n) {
            return e.curPercent + "%"
          },
          l: null,
          b: [
            [null, "curPercent"]
          ]
        }, {
          n: "background-color",
          o: "s",
          e: function(e, i, r) {
            return t(r, n, "_getActiveColor", [e.color, e.activeColor])
          },
          l: null,
          b: [
            [null, "_getActiveColor"],
            [null, "color"],
            [null, "activeColor"]
          ]
        }],
        c: []
      }]
    }, {
      t: 1,
      n: "p",
      cl: {
        v: "wx-progress-info"
      },
      a: [{
        n: "parse-text-content",
        v: ""
      }, {
        n: "hidden",
        o: "$",
        e: function(e, t, n) {
          return !e.showInfo
        },
        l: null,
        b: [
          [null, "showInfo"]
        ]
      }],
      c: [{
        c: "",
        e: function(e, t, n) {
          return e.curPercent + "%"
        },
        b: [
          [null, "curPercent"]
        ],
        t: 3
      }]
    }]
  },
  behaviors: ["wx-base"],
  properties: {
    percent: {
      type: Number,
      observer: "percentChange",
      public: !0
    },
    curPercent: {
      type: Number
    },
    showInfo: {
      type: Boolean,
      value: !1,
      public: !0
    },
    strokeWidth: {
      type: Number,
      value: 6,
      public: !0
    },
    active: {
      type: Boolean,
      value: !1,
      public: !0,
      observer: "activeAnimation"
    },
    activeColor: {
      type: String,
      value: PROGRESS_ACTIVE_COLOR,
      public: !0
    },
    activeMode: {
      type: String,
      value: "backwards",
      public: !0
    },
    backgroundColor: {
      type: String,
      value: PROGRESS_BACKGROUND_COLOR,
      public: !0
    },
    color: {
      type: String,
      value: PROGRESS_ACTIVE_COLOR
    }
  },
  methods: {
    _getActiveColor: function(e, t) {
      return t !== PROGRESS_ACTIVE_COLOR ? t : e !== PROGRESS_ACTIVE_COLOR ? e : PROGRESS_ACTIVE_COLOR
    },
    percentChange: function(e, t) {
      e > 100 && (this.percent = 100), e < 0 && (this.percent = 0), this.__timerId && clearInterval(this.__timerId), this._lastPercent = t || 0, this.activeAnimation(this.active)
    },
    activeAnimation: function(e) {
      if (!isNaN(this.percent))
        if (e) {
          var t = function() {
            if (this.percent <= this.curPercent + 1) return this.curPercent = this.percent, void clearInterval(this.__timerId);
            ++this.curPercent
          };
          this.curPercent = "forwards" === this.activeMode ? this._lastPercent : 0, this.__timerId = setInterval(t.bind(this), 30), t.call(this)
        } else this.curPercent = this.percent
    }
  },
  created: function() {
    this._lastPercent = this.percent || 0
  },
  detached: function() {
    this.__timerId && clearInterval(this.__timerId)
  }
}), window.exparser.registerElement({
  is: "wx-picker-view-column",
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "div",
      id: "main",
      cl: {
        v: "wx-picker__group"
      },
      a: [],
      c: [{
        t: 1,
        n: "div",
        id: "mask",
        cl: {
          v: "wx-picker__mask"
        },
        a: [],
        c: []
      }, {
        t: 1,
        n: "div",
        id: "indicator",
        cl: {
          v: "wx-picker__indicator"
        },
        a: [],
        c: []
      }, {
        t: 1,
        n: "div",
        id: "content",
        cl: {
          v: "wx-picker__content"
        },
        a: [],
        c: [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      }]
    }]
  },
  behaviors: ["wx-base", "wx-touchtrack", "wx-class-prefix", "wx-scroller"],
  listeners: {
    "this.tap": "_handleTap"
  },
  created: function() {
    this.touchtrack(this.$.main, "_handleTrack", !0), this.__pageRerender = this._pageRerender.bind(this)
  },
  attached: function() {
    var e = this;
    this._subtreeModified = !1, this._observer = exparser.Observer.create(function() {
      e._subtreeModified = !0
    }), this._observer.observe(this, {
      childList: !0,
      subtree: !0
    }), document.addEventListener("pageReRender", this.__pageRerender), this.triggerEvent("wxPickerColumnChanged", void 0, {
      bubbles: !0
    })
  },
  detached: function() {
    this.triggerEvent("wxPickerColumnChanged", void 0, {
      bubbles: !0
    }), document.removeEventListener("pageReRender", this.__pageRerender)
  },
  methods: {
    _pageRerender: function() {
      if (this._subtreeModified) {
        for (var e = this.$.indicator.offsetHeight, t = this.$.content.children, n = 0, i = t.length; n < i; n++) {
          var r = t.item(n);
          r.style.height = e + "px", r.style.overflow = "hidden"
        }
        this._itemHeight = e, this._scroller.update(), this._subtreeModified = !1
      }
    },
    _handleTrack: function(e) {
      if (this._scroller) switch (e.detail.state) {
        case "start":
          this._handleTouchStart(e);
          break;
        case "move":
          this._handleTouchMove(e);
          break;
        case "end":
        case "cancel":
          this._handleTouchEnd(e)
      }
    },
    _handleTap: function(e) {
      if (e.target !== e.currentTarget && !this._scroller.isScrolling()) {
        var t = e.touches && e.touches[0] && e.touches[0].clientY,
          n = "number" == typeof t ? t : e.detail.y - document.body.scrollTop,
          i = this.$$.getBoundingClientRect(),
          r = n - i.top - this._height / 2,
          o = this._itemHeight / 2;
        if (!(Math.abs(r) <= o)) {
          var a = Math.ceil((Math.abs(r) - o) / this._itemHeight),
            s = r < 0 ? -a : a;
          this._current += s, this._scroller.scrollTo(this._current * this._itemHeight), this.triggerEvent("wxPickerColumnValueChanged", {
            idx: this._current
          }, {
            bubbles: !0
          })
        }
      }
    },
    _getCurrent: function() {
      return this._current || 0
    },
    _setCurrent: function(e) {
      var t = Math.max(this.$.content.children.length - 1, 0);
      this._current = Math.min(e, t)
    },
    _setStyle: function(e, t) {
      this.$.indicator.setAttribute("style", e), this.$.mask.setAttribute("style", t)
    },
    _setClass: function(e, t) {
      e = this.getClassPrefix() + e, t = this.getClassPrefix() + t, this.$.indicator.setAttribute("class", "wx-picker__indicator " + e), this.$.mask.setAttribute("class", "wx-picker__mask " + t)
    },
    _setHeight: function(e) {
      for (var t = this.$.indicator.offsetHeight, n = this.$.content.children, i = 0, r = n.length; i < r; i++) {
        var o = n.item(i);
        o.style.height = t + "px", o.style.overflow = "hidden"
      }
      this._itemHeight = t, this.$.main.style.height = e + "px";
      var a = (e - t) / 2;
      this.$.mask.style.backgroundSize = "100% " + a + "px", this.$.indicator.style.top = a + "px", this.$.content.style.padding = a + "px 0", this._height = this.$$.offsetHeight
    },
    _init: function() {
      var e = this;
      this.initScroller(this.$.content, {
        enableY: !0,
        enableX: !1,
        enableSnap: !0,
        itemSize: this._itemHeight,
        onSnap: function(t) {
          t !== e._current && (e._current = t, e.triggerEvent("wxPickerColumnValueChanged", {
            idx: t
          }, {
            bubbles: !0
          }))
        }
      })
    },
    _update: function() {
      this._scroller.update(this._current * this._itemHeight, void 0, this._itemHeight)
    }
  }
}), window.exparser.registerElement({
  is: "wx-radio",
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "div",
      cl: {
        v: "wx-radio-wrapper"
      },
      a: [],
      c: [{
        t: 1,
        n: "div",
        id: "input",
        cl: {
          v: "wx-radio-input"
        },
        a: [{
          n: "wx-radio-input-checked",
          o: "c",
          e: function(e, t, n) {
            return e.checked
          },
          l: [null],
          b: [
            [null, "checked"]
          ]
        }, {
          n: "wx-radio-input-disabled",
          o: "c",
          e: function(e, t, n) {
            return e.disabled
          },
          l: [null],
          b: [
            [null, "disabled"]
          ]
        }, {
          n: "background-color",
          o: "s",
          e: function(e, i, r) {
            return t(r, n, "_getColor", [e.checked, e.color])
          },
          l: null,
          b: [
            [null, "_getColor"],
            [null, "checked"],
            [null, "color"]
          ]
        }, {
          n: "border-color",
          o: "s",
          e: function(e, i, r) {
            return t(r, n, "_getColor", [e.checked, e.color])
          },
          l: null,
          b: [
            [null, "_getColor"],
            [null, "checked"],
            [null, "color"]
          ]
        }],
        c: []
      }, {
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    }]
  },
  behaviors: ["wx-base", "wx-label-target", "wx-disabled", "wx-item"],
  properties: {
    color: {
      type: String,
      value: "#09BB07",
      public: !0
    }
  },
  listeners: {
    tap: "_inputTap"
  },
  methods: {
    _getColor: function(e, t) {
      return e ? t : ""
    },
    _inputTap: function() {
      if (this.disabled) return !1;
      this.checked || (this.checked = !0, this.changedByTap())
    },
    handleLabelTap: function() {
      this._inputTap()
    }
  }
}), window.exparser.registerElement({
  is: "wx-radio-group",
  template: function(e, t, n) {
    return [{
      t: 1,
      n: "slot",
      v: !0,
      sn: "",
      a: [],
      c: []
    }]
  },
  behaviors: ["wx-base", "wx-data-component", "wx-group"],
  properties: {
    value: {
      type: String
    }
  },
  created: function() {
    this._selectedItem = null
  },
  methods: {
    addItem: function(e) {
      e.checked && (this._selectedItem && (this._selectedItem.checked = !1), this.value = e.value, this._selectedItem = e)
    },
    removeItem: function(e) {
      this._selectedItem === e && (this.value = "", this._selectedItem = null)
    },
    renameItem: function(e, t) {
      this._selectedItem === e && (this.value = t)
    },
    changed: function(e) {
      this._selectedItem === e ? this.removeItem(e) : this.addItem(e)
    }
  }
});
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
  return typeof e
} : function(e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
};
! function() {
  var e = {
      rules: {
        a: "nA",
        abbr: "nA",
        b: "nA",
        blockquote: "nA",
        br: "nA",
        code: "nA",
        col: "fA",
        colgroup: "fA",
        dd: "nA",
        del: "nA",
        div: "nA",
        dl: "nA",
        dt: "nA",
        em: "nA",
        fieldset: "nA",
        h1: "nA",
        h2: "nA",
        h3: "nA",
        h4: "nA",
        h5: "nA",
        h6: "nA",
        hr: "nA",
        i: "nA",
        img: "fA",
        ins: "nA",
        label: "nA",
        legend: "nA",
        li: "nA",
        ol: "fA",
        p: "nA",
        q: "nA",
        span: "nA",
        strong: "nA",
        sub: "nA",
        sup: "nA",
        table: "fA",
        tbody: "nA",
        td: "fA",
        tfoot: "nA",
        th: "fA",
        thead: "nA",
        tr: "nA",
        ul: "nA"
      },
      fA: function(t, n, i, r) {
        var o = {
            col: {
              span: "nF",
              width: "nF"
            },
            colgroup: {
              span: "nF",
              width: "nF"
            },
            img: {
              alt: "nF",
              src: "fL",
              height: "nF",
              width: "nF"
            },
            ol: {
              start: "nF",
              type: "nF"
            },
            table: {
              width: "nF"
            },
            td: {
              colspan: "nF",
              height: "nF",
              rowspan: "nF",
              width: "nF"
            },
            th: {
              colspan: "nF",
              height: "nF",
              rowspan: "nF",
              width: "nF"
            }
          },
          a = o[i][t];
        if (o.hasOwnProperty(i) && o[i].hasOwnProperty(t)) switch (a) {
          case void 0:
            break;
          case "nF":
            r.setAttribute(t, n);
            break;
          default:
            return e[a] && e[a](t, n, i, r)
        }
      },
      fL: function(e, t, n, i) {
        i.setAttribute(e, t)
      },
      parse: function(n, i, r) {
        return n.map(function(n) {
          if ("object" === (void 0 === n ? "undefined" : _typeof(n)))
            if (void 0 === n.type || "node" === n.type || "" === n.type) {
              if ("string" == typeof n.name && "" !== n.name) {
                var o = n.name.toLowerCase();
                if (e.rules.hasOwnProperty(o)) {
                  var a = e.rules[o],
                    s = document.createElement(o);
                  if (s) {
                    if ("object" === _typeof(n.attrs))
                      for (var l in n.attrs) {
                        var c = l.toLowerCase(),
                          u = t.decodeEntities(n.attrs[l]);
                        if ("class" === c) {
                          var d = r ? u.replace(/\S+/g, function(e) {
                            return r + e
                          }) : u;
                          s.setAttribute("class", d)
                        } else "style" === c ? s.setAttribute("style", u) : "nA" !== a && e[a] && e[a](c, u, o, s)
                      }
                    "object" === _typeof(n.children) && n.children instanceof Array && n.children.length && e.parse(n.children, s, r), i.appendChild(s)
                  }
                }
              }
            } else "text" === n.type && "string" == typeof n.text && "" !== n.text && i.appendChild(document.createTextNode(t.decodeEntities(n.text)))
        }), i
      }
    },
    t = function() {
      var e = function() {
          var e = function() {};
          e.prototype = Object.create(Object.prototype, {
            constructor: {
              value: e,
              writable: !0,
              configurable: !0
            }
          });
          var t = function(e, t) {
            var n = t - 30 + 1;
            return n < 0 && (n = 0), "L" + ((e.slice(0, t).match(/(\r|\n|\r\n)/g) || []).length + 1) + ": " + e.slice(n, t + 1)
          };
          e.create = function(t, n) {
            var i = Object.create(e.prototype);
            i._cbs = n;
            var r = i._stateTable = {},
              o = i._stateRecTable = {},
              a = {},
              s = {},
              l = function(e, n, i, r, o) {
                if (Object.prototype.hasOwnProperty.call(t, i))
                  if (o[i]) {
                    if (!o[i].overwrite) throw new Error('State "' + e + '" has multiple possible rules on symbol "' + i + '".')
                  } else o[i] = n;
                else if ("ALL" !== i && "NULL" !== i && i.length > 1)
                  if (r[i]) {
                    if (!r[i].overwrite) throw new Error('State "' + e + '" has multiple possible rules on symbol "' + i + '".')
                  } else
                    for (var a = 0; a < i.length; a++)
                      if ("-" === i[a + 1] && i[a + 2]) {
                        for (var s = i.charCodeAt(a + 2), l = i.charCodeAt(a); l <= s; l++) r[String.fromCharCode(l)] = n;
                        a += 2
                      } else r[i[a]] = n;
                else if (r[i]) {
                  if (!r[i].overwrite) throw new Error('State "' + e + '" has multiple possible rules on symbol "' + i + '".')
                } else r[i] = n
              },
              c = "";
            for (c in t)
              for (var u = t[c], d = r[c] = {}, h = o[c] = {}, p = a[c] = {}, f = s[c] = {}, g = 0; g < u.length; g++) {
                var A = u[g],
                  v = A.states[0];
                v === c ? (v = A.states[1], l(c, A, v, h, f)) : l(c, A, v, d, p)
              }
            var _ = null,
              w = function e(t, n, i) {
                if (2 !== _[t]) {
                  if (1 === _[t]) throw new Error('State "' + t + '" has illegal recursive rule definition.');
                  _[t] = 1;
                  var o = n[t],
                    a = i[t];
                  for (var s in o) {
                    e(s, n, i);
                    var l = r[s];
                    for (var c in l)
                      if (a[c]) {
                        if (!a[c].overwrite) throw new Error('State "' + t + '" has multiple possible rules on symbol "' + c + '".')
                      } else a[c] = o[s]
                  }
                  _[t] = 2
                }
              };
            _ = {};
            for (c in a) w(c, a, r);
            _ = {};
            for (c in s) w(c, s, o);
            return i
          }, e.prototype.parse = function(e, i, r) {
            var o = {
                str: i,
                pos: 0
              },
              a = n(this._stateTable, this._stateRecTable, e, o, this._cbs, r);
            if (o.str.length > o.pos) throw new Error('Unexpected character "' + o.str[o.pos] + '" in position ' + t(o.str, o.pos) + o.pos + ", near ");
            return a
          };
          var n = function e(n, i, r, o, a, s) {
            var l = n[r],
              c = null;
            if (o.str.length > o.pos && (c = l[o.str[o.pos]]), !c && (o.str.length > o.pos && (c = l.ALL), !c)) {
              if (!(c = l.NULL)) throw new Error('Unexpected character "' + o.str[o.pos] + '" in position ' + o.pos + ' (in state "' + r + '"), near ' + t(o.str, o.pos));
              if ("NULL" === c.states[0]) return a[c.id] ? a[c.id]([], s) : {
                r: c.id,
                c: []
              }
            }
            for (var u = function(l, c, u) {
                var d = l.states,
                  h = [];
                c && h.push(u);
                for (var p = c ? 1 : 0; p < d.length; p++) {
                  var f = d[p];
                  if (Object.prototype.hasOwnProperty.call(n, f)) h.push(e(n, i, f, o, a, s));
                  else if ("ALL" === f) h.push(o.str[o.pos]), o.pos++;
                  else {
                    for (var g = o.str[o.pos], A = o.str.charCodeAt(o.pos), v = 0; v < f.length; v++)
                      if ("-" === f[v + 1] && f[v + 2]) {
                        var _ = f.charCodeAt(v),
                          w = f.charCodeAt(v + 2);
                        if (_ <= A && A <= w) break;
                        v += 2
                      } else if (g === f[v]) break;
                    if (v === f.length) throw new Error('Unexpected character "' + g + '" in position ' + o.pos + ' (expect "' + f + '" in state "' + r + '"), near ' + t(o.str, o.pos));
                    h.push(g), o.pos++
                  }
                }
                return a[l.id] ? a[l.id](h, s) : {
                  r: l.id,
                  c: h
                }
              }, d = u(c); o.str.length > o.pos && ((c = i[r][o.str[o.pos]]) || (c = i[r].ALL));) d = u(c, !0, d);
            return d
          };
          return e
        }(),
        t = {
          TAG_START: 1,
          TAG_END: -1,
          TEXT: 3,
          COMMENT: 8
        },
        n = {
          amp: "&",
          gt: ">",
          lt: "<",
          nbsp: " ",
          quot: '"',
          apos: "'"
        },
        i = function(e) {
          return e.replace(/&([a-zA-Z]*?);/g, function(e, t) {
            if (n.hasOwnProperty(t) && n[t]) return n[t];
            if (/^#[0-9]{1,4}$/.test(t)) return String.fromCharCode(t.slice(1));
            if (/^#x[0-9a-f]{1,4}$/i.test(t)) return String.fromCharCode("0" + t.slice(1));
            throw new Error('HTML Entity "' + e + '" is not supported.')
          })
        },
        r = function(e) {
          switch (e) {
            case "area":
            case "base":
            case "basefont":
            case "br":
            case "col":
            case "frame":
            case "hr":
            case "img":
            case "input":
            case "keygen":
            case "link":
            case "meta":
            case "param":
            case "source":
            case "track":
              return !0;
            default:
              return !1
          }
        },
        o = null,
        a = function() {
          o = e.create({
            TEXT: [{
              id: "tag",
              states: ["TEXT", "TAG"]
            }, {
              id: "text",
              states: ["TEXT", "ALL"]
            }, {
              id: "tag1",
              states: ["TAG"]
            }, {
              id: "text1",
              states: ["ALL"]
            }, {
              id: "_null",
              states: ["NULL"],
              overwrite: !0
            }],
            TAG: [{
              id: "_blank",
              states: ["<", "TAG_START"]
            }],
            TAG_END: [{
              id: "_concat",
              states: ["/", ">"]
            }, {
              id: "_jump",
              states: [">"]
            }],
            TAG_START: [{
              id: "comment",
              states: ["!", "-", "-", "COMMENT_CONTENT"]
            }, {
              id: "endTag",
              states: ["/", "TAG_NAME", ">"]
            }, {
              id: "startTag",
              states: ["TAG_NAME", "ATTRS", "TAG_END"]
            }],
            TAG_NAME: [{
              id: "_concat",
              states: ["TAG_NAME", "-_a-zA-Z0-9.:"]
            }, {
              id: "_jump",
              states: ["a-zA-Z"]
            }],
            ATTRS: [{
              id: "_blank",
              states: [" \n\r\t\f", "ATTRS"]
            }, {
              id: "_jump",
              states: ["ATTRS", " \n\r\t\f"]
            }, {
              id: "attrs",
              states: ["ATTR", "ATTRS"]
            }, {
              id: "_null",
              states: ["NULL"],
              overwrite: !0
            }],
            ATTR: [{
              id: "attr",
              states: ["ATTR_NAME", "ATTR_NAME_AFTER"]
            }],
            ATTR_NAME: [{
              id: "_concat",
              states: ["ATTR_NAME", "-_a-zA-Z0-9.:$&"]
            }, {
              id: "_jump",
              states: ["-_a-zA-Z0-9.:$&"]
            }],
            ATTR_NAME_AFTER: [{
              id: "_blank",
              states: ["=", "ATTR_VALUE"]
            }, {
              id: "_empty",
              states: ["NULL"]
            }],
            ATTR_VALUE: [{
              id: "_blank",
              states: ['"', "ATTR_VALUE_INNER_1"]
            }, {
              id: "_blank",
              states: ["'", "ATTR_VALUE_INNER_2"]
            }],
            ATTR_VALUE_INNER_1: [{
              id: "_empty",
              states: ['"']
            }, {
              id: "_concat",
              states: ["ALL", "ATTR_VALUE_INNER_1"]
            }],
            ATTR_VALUE_INNER_2: [{
              id: "_empty",
              states: ["'"]
            }, {
              id: "_concat",
              states: ["ALL", "ATTR_VALUE_INNER_2"]
            }],
            COMMENT_CONTENT: [{
              id: "_concat",
              states: ["ALL", "COMMENT_CONTENT"]
            }, {
              id: "_concat",
              states: ["-", "COMMENT_CONTENT_DASH_1"]
            }],
            COMMENT_CONTENT_DASH_1: [{
              id: "_concat",
              states: ["ALL", "COMMENT_CONTENT"]
            }, {
              id: "_concat",
              states: ["-", "COMMENT_CONTENT_DASH_2"]
            }],
            COMMENT_CONTENT_DASH_2: [{
              id: "_concat",
              states: ["ALL", "COMMENT_CONTENT"]
            }, {
              id: "_concat",
              states: ["-", "COMMENT_CONTENT_DASH_2"]
            }, {
              id: "_jump",
              states: [">"]
            }]
          }, {
            _null: function() {},
            _empty: function() {
              return ""
            },
            _jump: function(e) {
              return e[0]
            },
            _concat: function(e) {
              return e[0] + e[1]
            },
            _blank: function(e) {
              return e[1]
            },
            attr: function(e) {
              return {
                n: e[0],
                v: e[1]
              }
            },
            attrs: function(e) {
              var t = e[1] || {};
              return t[e[0].n] = e[0].v, t
            },
            startTag: function(e) {
              var n = e[0].toLowerCase();
              return {
                t: t.TAG_START,
                n: n,
                a: e[1] || {},
                selfClose: "/>" === e[2] || r(n)
              }
            },
            endTag: function(e) {
              return {
                t: t.TAG_END,
                n: e[1].toLowerCase()
              }
            },
            comment: function(e) {
              return {
                t: t.COMMENT,
                c: e[3].slice(0, -3)
              }
            },
            tag1: function(e) {
              return [e[0]]
            },
            text1: function(e) {
              return [{
                t: t.TEXT,
                c: e[0]
              }]
            },
            tag: function(e) {
              return e[0].push(e[1]), e[0]
            },
            text: function(e) {
              var n = e[0];
              return n[n.length - 1].t === t.TEXT ? n[n.length - 1].c += e[1] : n.push({
                t: t.TEXT,
                c: e[1]
              }), n
            }
          })
        },
        s = function(e) {
          for (var n = {
              children: []
            }, i = n, r = [], o = null, a = 0; a < e.length; a++) {
            var s = e[a];
            if (s.t === t.TAG_START) o = {
              name: s.n,
              attrs: s.a,
              children: []
            }, i.children.push(o), s.selfClose || (r.push(i), i = o);
            else if (s.t === t.TAG_END) {
              for (; s.n !== i.name;)
                if (!(i = r.pop())) throw new Error('No matching start tag found for "</' + s.n + '>"');
              i = r.pop()
            } else s.t === t.TEXT && s.c && i.children.push({
              type: "text",
              text: s.c
            })
          }
          return n
        };
      return {
        parse: function(e) {
          o || a();
          var t = o.parse("TEXT", e) || [];
          return s(t).children
        },
        decodeEntities: i
      }
    }();
  window.exparser.registerElement({
    is: "wx-rich-text",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "rich-text",
        a: [],
        c: [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      }]
    },
    behaviors: ["wx-base", "wx-class-prefix"],
    properties: {
      nodes: {
        value: [],
        public: !0,
        observer: "_nodesObserver"
      }
    },
    created: function() {
      this._ready = !1, this._cachedVal = null
    },
    attached: function() {
      if (this._ready = !0, this._cachedVal) {
        var e = this._cachedVal;
        this._cachedVal = null, this._nodesObserver(e)
      }
    },
    methods: {
      _nodesObserver: function(n) {
        if (!this._ready) return void(this._cachedVal = n);
        "string" == typeof n && (n = t.parse(n)), this.$["rich-text"].innerHTML = "", "object" === (void 0 === n ? "undefined" : _typeof(n)) && n instanceof Array ? this.$["rich-text"].appendChild(e.parse(n, document.createDocumentFragment(), this.getClassPrefix())) : (console.group(new Date + " nodes属性只支持 String 和 Array 类型"), console.warn("For developer:nodes属性只支持 String 和 Array 类型，请检查输入的值。"), console.groupEnd())
      }
    }
  })
}(),
function() {
  var e = wx.getPlatform(),
    t = [];
  wx.on("onTapStatusBar", function(e) {
    t.forEach(function(t) {
      t(e)
    })
  }), window.exparser.registerElement({
    is: "wx-scroll-view",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "wrap",
        cl: {
          v: "wx-scroll-view"
        },
        a: [],
        c: [{
          t: 1,
          n: "div",
          id: "main",
          cl: {
            v: "wx-scroll-view"
          },
          st: {
            v: "overflow-x: hidden; overflow-y: hidden;"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            id: "content",
            a: [],
            c: [{
              t: 1,
              n: "slot",
              v: !0,
              sn: "",
              a: [],
              c: []
            }]
          }]
        }]
      }]
    },
    behaviors: ["wx-base", "wx-touchtrack", "wx-scroller", "wx-positioning-container"],
    properties: {
      scrollX: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "_scrollXChanged"
      },
      scrollY: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "_scrollYChanged"
      },
      upperThreshold: {
        type: Number,
        value: 50,
        public: !0
      },
      lowerThreshold: {
        type: Number,
        value: 50,
        public: !0
      },
      scrollTop: {
        type: Number,
        filter: "_scrollTopChanged",
        public: !0
      },
      scrollLeft: {
        type: Number,
        filter: "_scrollLeftChanged",
        public: !0
      },
      scrollIntoView: {
        type: String,
        filter: "_scrollIntoViewChanged",
        public: !0
      },
      scrollWithAnimation: {
        type: Boolean,
        observer: "_scrollWithAnimationChanged",
        public: !0,
        value: !1
      },
      enableBackToTop: {
        type: Boolean,
        observer: "_enableBackToTopChanged",
        public: !0,
        value: !1
      }
    },
    created: function() {
      this._lastScrollTop = this.scrollTop || 0, this._lastScrollLeft = this.scrollLeft || 0, this._lastScrollToUpperTime = 0, this._lastScrollToLowerTime = 0, this.__pageRerender = this._pageRerender.bind(this), this.touchtrack(this.$.main, "_handleTrack"), this._handleScrollPos()
    },
    attached: function() {
      var e = this,
        n = this;
      this._attached = !0, this._scrollXChanged(this.scrollX), this._scrollYChanged(this.scrollY), this._scrollTopChanged(this.scrollTop), this._scrollLeftChanged(this.scrollLeft), this._scrollIntoViewChanged(this.scrollIntoView), this.__handleScroll = function(e) {
        e.preventDefault(), e.stopPropagation(), n._handleScroll.bind(n, e)(), document.dispatchEvent(new CustomEvent("wx-scroll-view"))
      }, this.__handleTouchMove = function(e) {
        var t = e.touches[0].pageY,
          i = n.$.main;
        n.__touchStartY < t ? i.scrollTop > 0 && e.stopPropagation() : i.scrollHeight > i.offsetHeight + i.scrollTop && e.stopPropagation()
      }, this.__handleTouchStart = function(e) {
        var t = n.$.main;
        t.scrollHeight <= t.offsetHeight || (n.__touchStartY = e.touches[0].pageY, WeixinJSBridge.invoke("disableScrollBounce", {
          disable: !0
        }, function() {}))
      }, this.__handleTouchEnd = function() {
        WeixinJSBridge.invoke("disableScrollBounce", {
          disable: !1
        }, function() {})
      }, this.$.main.addEventListener("touchstart", this.__handleTouchStart), this.$.main.addEventListener("touchmove", this.__handleTouchMove), this.$.main.addEventListener("touchend", this.__handleTouchEnd), this.$.main.addEventListener("scroll", this.__handleScroll), t.push(function(t) {
        e.scrollY && e.enableBackToTop && e.scrollTo(0, "y")
      });
      var i = window.navigator.userAgent.toLowerCase();
      if (!/wechatdevtools/.test(i) && /iphone/.test(i)) {
        document.getElementById("__scroll_view_hack") && document.body.removeChild(document.getElementById("__scroll_view_hack"));
        var r = document.createElement("div");
        r.setAttribute("style", "position: fixed; left: 0; bottom: 0; line-height: 1; font-size: 1px; z-index: 10000; border-radius: 4px; box-shadow: 0 0 8px rgba(0,0,0,.4); width: 1px; height: 1px; overflow: hidden;"), r.innerText = ".", r.id = "__scroll_view_hack", document.body.appendChild(r)
      }
    },
    detached: function() {
      this.$.main.removeEventListener("scroll", this.__handleScroll), this.$.main.removeEventListener("touchstart", this.__handleTouchStart), this.$.main.removeEventListener("touchmove", this.__handleTouchMove), this.$.main.removeEventListener("touchend", this.__handleTouchEnd), document.removeEventListener("pageReRender", this._reScrollPos)
    },
    methods: {
      getScrollPosition: function() {
        var e = this.$.main;
        return {
          scrollLeft: e.scrollLeft,
          scrollTop: e.scrollTop
        }
      },
      _syncScrollPosition: function() {
        var e = this;
        if (!this._scheduledScrollPosition) {
          this._scheduledScrollPosition = !0;
          var t = 4,
            n = function n() {
              e._scheduledScrollPosition = !1, e.updateScrollPosition() ? t = 4 : t--, t && window.requestAnimationFrame(n)
            };
          window.requestAnimationFrame(n)
        }
      },
      scrollTo: function(t, n) {
        var i = this.$.main;
        t < 0 ? t = 0 : "x" === n && t > i.scrollWidth - i.offsetWidth ? t = i.scrollWidth - i.offsetWidth : "y" === n && t > i.scrollHeight - i.offsetHeight && (t = i.scrollHeight - i.offsetHeight);
        var r = 0,
          o = "";
        "x" === n ? r = i.scrollLeft - t : "y" === n && (r = i.scrollTop - t), 0 !== r && (this.$.content.style.transition = "transform .3s ease-out", this.$.content.style.webkitTransition = "-webkit-transform .3s ease-out", "x" === n ? o = "translateX(" + r + "px) translateZ(0)" : "y" === n && (o = "translateY(" + r + "px) translateZ(0)"), this.$.content.removeEventListener("transitionend", this.__transitionEnd), this.$.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd), this.__transitionEnd = this._transitionEnd.bind(this, t, n), this.$.content.addEventListener("transitionend", this.__transitionEnd), this.$.content.addEventListener("webkitTransitionEnd", this.__transitionEnd), "x" === n ? "ios" != e && (i.style.overflowX = "hidden") : "y" === n && (i.style.overflowY = "hidden"), this.$.content.style.transform = o, this.$.content.style.webkitTransform = o)
      },
      _getStyle: function(e, t) {
        return "overflow-x: " + (e ? "auto" : "hidden") + "; overflow-y: " + (t ? "auto" : "hidden") + ";"
      },
      _handleTrack: function(e) {
        if ("start" === e.detail.state) return this._x = e.detail.x, this._y = e.detail.y, void(this._noBubble = null);
        "end" === e.detail.state && (this._noBubble = !1), null === this._noBubble && this.scrollY && (Math.abs(this._y - e.detail.y) / Math.abs(this._x - e.detail.x) > 1 ? this._noBubble = !0 : this._noBubble = !1), null === this._noBubble && this.scrollX && (Math.abs(this._x - e.detail.x) / Math.abs(this._y - e.detail.y) > 1 ? this._noBubble = !0 : this._noBubble = !1), this._x = e.detail.x, this._y = e.detail.y, this._noBubble && e.stopPropagation()
      },
      _handleScroll: function(e) {
        if (!(e.timeStamp - this._lastScrollTime < 20)) {
          this._lastScrollTime = e.timeStamp;
          var t = e.target;
          if (this.triggerEvent("scroll", {
              scrollLeft: t.scrollLeft,
              scrollTop: t.scrollTop,
              scrollHeight: t.scrollHeight,
              scrollWidth: t.scrollWidth,
              deltaX: this._lastScrollLeft - t.scrollLeft,
              deltaY: this._lastScrollTop - t.scrollTop
            }), this.scrollY) {
            var n = this._lastScrollTop - t.scrollTop > 0,
              i = this._lastScrollTop - t.scrollTop < 0;
            t.scrollTop <= this.upperThreshold && n && e.timeStamp - this._lastScrollToUpperTime > 200 && (this.triggerEvent("scrolltoupper", {
              direction: "top"
            }), this._lastScrollToUpperTime = e.timeStamp), t.scrollTop + t.offsetHeight + this.lowerThreshold >= t.scrollHeight && i && e.timeStamp - this._lastScrollToLowerTime > 200 && (this.triggerEvent("scrolltolower", {
              direction: "bottom"
            }), this._lastScrollToLowerTime = e.timeStamp)
          }
          if (this.scrollX) {
            var r = this._lastScrollLeft - t.scrollLeft > 0,
              o = this._lastScrollLeft - t.scrollLeft < 0;
            t.scrollLeft <= this.upperThreshold && r && e.timeStamp - this._lastScrollToUpperTime > 200 && (this.triggerEvent("scrolltoupper", {
              direction: "left"
            }), this._lastScrollToUpperTime = e.timeStamp), t.scrollLeft + t.offsetWidth + this.lowerThreshold >= t.scrollWidth && o && e.timeStamp - this._lastScrollToLowerTime > 200 && (this.triggerEvent("scrolltolower", {
              direction: "right"
            }), this._lastScrollToLowerTime = e.timeStamp)
          }
          this._lastScrollTop = t.scrollTop, this._lastScrollLeft = t.scrollLeft
        }
      },
      _scrollXChanged: function(e) {
        var t = this,
          n = window.navigator.userAgent.toLowerCase();
        if (e) {
          if (this.scrollY || /android/.test(n)) return document.removeEventListener("pageReRender", t.__pageRerender), this.$.main.style.overflowX = "auto", this.$.main.style.paddingBottom = "", this.$.wrap.style.overflowY = "", this.$.wrap.style.height = "", void(this.$.content.style.height = "100%");
          void 0 === this._isAutoHeight && this._checkIsAutoHeight(), this.$.main.style.overflowX = "auto", this.$.main.style.paddingBottom = "20px", this.$.wrap.style.overflowY = "hidden", this._isAutoHeight ? (this.$.wrap.style.height = this.$.content.offsetHeight + "px", this.$.content.style.height = "") : (this.$.wrap.style.height = "", this.$.content.style.height = this.$$.offsetHeight + "px"), document.addEventListener("pageReRender", t.__pageRerender)
        } else document.removeEventListener("pageReRender", t.__pageRerender), this.$.main.style.overflowX = "hidden", this.$.main.style.paddingBottom = "", this.$.wrap.style.overflowY = "", this.$.wrap.style.height = "", this.$.content.style.height = "100%"
      },
      _scrollYChanged: function(e) {
        this.$.main.style.overflowY = e ? "auto" : "hidden"
      },
      _scrollTopChanged: function(e) {
        this.scrollY && (this._innerSetScrollTop ? this._innerSetScrollTop = !1 : this.scrollWithAnimation ? this.scrollTo(e, "y") : this.$.main.scrollTop = e)
      },
      _scrollLeftChanged: function(e) {
        this.scrollX && (this._innerSetScrollLeft ? this._innerSetScrollLeft = !1 : this.scrollWithAnimation ? this.scrollTo(e, "x") : this.$.main.scrollLeft = e)
      },
      _scrollIntoViewChanged: function(e) {
        if (e) {
          if (!/^[_a-zA-Z][-_a-zA-Z0-9:]*$/.test(e)) return console.group('scroll-into-view="' + e + '" 有误'), console.error("id 属性值格式错误。如不能以数字开头。"), void console.groupEnd();
          var t = this.querySelector("#" + e);
          if (t) {
            var n = this.$.main.getBoundingClientRect(),
              i = t.$$.getBoundingClientRect();
            if (this.scrollX) {
              var r = i.left - n.left,
                o = this.$.main.scrollLeft,
                a = o + r;
              this.scrollWithAnimation ? this.scrollTo(a, "x") : this.$.main.scrollLeft = a
            }
            if (this.scrollY) {
              var s = i.top - n.top,
                l = this.$.main.scrollTop,
                c = l + s;
              this.scrollWithAnimation ? this.scrollTo(c, "y") : this.$.main.scrollTop = c
            }
          }
        }
      },
      _enableBackToTopChanged: function(e) {
        e ? WeixinJSBridge.invoke("listenTapStatusBar", {
          listen: !0
        }, function() {}) : WeixinJSBridge.invoke("listenTapStatusBar", {
          listen: !1
        }, function() {})
      },
      _transitionEnd: function(e, t) {
        this.$.content.style.transition = "", this.$.content.style.webkitTransition = "", this.$.content.style.transform = "", this.$.content.style.webkitTransform = "";
        var n = this.$.main;
        "x" === t ? (n.style.overflowX = this.scrollX ? "auto" : "hidden", n.scrollLeft = e) : "y" === t && (n.style.overflowY = this.scrollY ? "auto" : "hidden", n.scrollTop = e), this.$.content.removeEventListener("transitionend", this.__transitionEnd), this.$.content.removeEventListener("webkitTransitionEnd", this.__transitionEnd)
      },
      _checkIsAutoHeight: function() {
        this.$.wrap.style.height = 0;
        var e = getComputedStyle(this.$$),
          t = parseFloat(e.borderBottomWidth) || 0,
          n = parseFloat(e.borderTopWidth) || 0,
          i = parseFloat(e.paddingTop) || 0,
          r = parseFloat(e.paddingBottom) || 0;
        this._isAutoHeight = this.$$.offsetHeight === t + n + i + r;
        var o = 1e4 * Math.random() | 0;
        this.$.wrap.style.height = o + "px", e = getComputedStyle(this.$$), t = parseFloat(e.borderBottomWidth) || 0, n = parseFloat(e.borderTopWidth) || 0, i = parseFloat(e.paddingTop) || 0, r = parseFloat(e.paddingBottom) || 0, this._isAutoHeight = this._isAutoHeight || this.$$.offsetHeight === t + n + i + r + o
      },
      _pageRerender: function() {
        var e = this;
        window.requestAnimationFrame(function() {
          e.$$.offsetHeight === e._lastOutterHeight && e.$.content.offsetHeight === e._lastContenHeight || (e._checkIsAutoHeight(), e._isAutoHeight ? (e.$.wrap.style.height = e.$.content.offsetHeight + "px", e.$.content.style.height = "") : (e.$.wrap.style.height = "", e.$.content.style.height = e.$$.offsetHeight + "px"), e._lastOutterHeight = e.$$.offsetHeight, e._lastContenHeight = e.$.content.offsetHeight)
        })
      },
      _handleScrollPos: function() {
        var e = this,
          t = "",
          n = !1;
        this._observer = exparser.Observer.create(function(e) {
          "properties" === e.type ? ["scrollLeft", "scrollTop", "scrollIntoView"].indexOf(e.propertyName) > -1 && (t = e.propertyName) : "childList" === e.type && (n = !0)
        }), this._observer.observe(this, {
          childList: !0,
          subtree: !0,
          properties: !0
        }), this._reScrollPos = function() {
          e._attached && (t && n && e["_" + t + "Changed"](e[t]), t = "", n = !1)
        }, document.addEventListener("pageReRender", this._reScrollPos)
      }
    }
  })
}(),
function() {
  var e = function(e) {
      return e % 1 != 0
    },
    t = function(t) {
      return t = +t, isNaN(t) || !e(t) ? 0 : t.toString().split(".")[1].length
    },
    n = function(e, t, n) {
      return e < t ? t : e > n ? n : e
    };
  window.exparser.registerElement({
    is: "wx-slider",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        cl: {
          v: "wx-slider-wrapper"
        },
        a: [{
          n: "wx-slider-disabled",
          o: "c",
          e: function(e, t, n) {
            return e.disabled
          },
          l: [null],
          b: [
            [null, "disabled"]
          ]
        }],
        c: [{
          t: 1,
          n: "div",
          id: "wrapper",
          cl: {
            v: "wx-slider-tap-area"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            cl: {
              v: "wx-slider-handle-wrapper"
            },
            a: [{
              n: "background-color",
              o: "s",
              e: function(e, i, r) {
                return t(r, n, "_getBackgroundColor", [e.color, e.backgroundColor])
              },
              l: null,
              b: [
                [null, "_getBackgroundColor"],
                [null, "color"],
                [null, "backgroundColor"]
              ]
            }],
            c: [{
              t: 1,
              n: "div",
              id: "handle",
              cl: {
                v: "wx-slider-handle"
              },
              a: [{
                n: "left",
                o: "s",
                e: function(e, i, r) {
                  return t(r, n, "_getValueWidth", [e._filteredValue, e.min, e.max])
                },
                l: null,
                b: [
                  [null, "_getValueWidth"],
                  [null, "_filteredValue"],
                  [null, "min"],
                  [null, "max"]
                ]
              }],
              c: []
            }, {
              t: 1,
              n: "div",
              cl: {
                v: "wx-slider-thumb"
              },
              a: [{
                n: "width",
                o: "s",
                e: function(e, i, r) {
                  return t(r, n, "_getBlockSize", [e.blockSize]) + "px"
                },
                l: null,
                b: [
                  [null, "_getBlockSize"],
                  [null, "blockSize"]
                ]
              }, {
                n: "height",
                o: "s",
                e: function(e, i, r) {
                  return t(r, n, "_getBlockSize", [e.blockSize]) + "px"
                },
                l: null,
                b: [
                  [null, "_getBlockSize"],
                  [null, "blockSize"]
                ]
              }, {
                n: "margin-left",
                o: "s",
                e: function(e, i, r) {
                  return -t(r, n, "_getBlockSize", [e.blockSize]) / 2 + "px"
                },
                l: null,
                b: [
                  [null, "_getBlockSize"],
                  [null, "blockSize"]
                ]
              }, {
                n: "margin-top",
                o: "s",
                e: function(e, i, r) {
                  return -t(r, n, "_getBlockSize", [e.blockSize]) / 2 + "px"
                },
                l: null,
                b: [
                  [null, "_getBlockSize"],
                  [null, "blockSize"]
                ]
              }, {
                n: "left",
                o: "s",
                e: function(e, i, r) {
                  return t(r, n, "_getValueWidth", [e._filteredValue, e.min, e.max])
                },
                l: null,
                b: [
                  [null, "_getValueWidth"],
                  [null, "_filteredValue"],
                  [null, "min"],
                  [null, "max"]
                ]
              }, {
                n: "background-color",
                o: "s",
                e: function(e, t, n) {
                  return e.blockColor
                },
                l: [null],
                b: [
                  [null, "blockColor"]
                ]
              }],
              c: []
            }, {
              t: 1,
              n: "div",
              cl: {
                v: "wx-slider-track"
              },
              a: [{
                n: "width",
                o: "s",
                e: function(e, i, r) {
                  return t(r, n, "_getValueWidth", [e._filteredValue, e.min, e.max])
                },
                l: null,
                b: [
                  [null, "_getValueWidth"],
                  [null, "_filteredValue"],
                  [null, "min"],
                  [null, "max"]
                ]
              }, {
                n: "background-color",
                o: "s",
                e: function(e, i, r) {
                  return t(r, n, "_getActiveColor", [e.selectedColor, e.activeColor])
                },
                l: null,
                b: [
                  [null, "_getActiveColor"],
                  [null, "selectedColor"],
                  [null, "activeColor"]
                ]
              }],
              c: []
            }, {
              t: 1,
              n: "div",
              id: "step",
              cl: {
                v: "wx-slider-step"
              },
              a: [],
              c: []
            }]
          }]
        }, {
          t: 1,
          n: "span",
          cl: {
            v: "wx-slider-value"
          },
          a: [{
            n: "hidden",
            o: "$",
            e: function(e, t, n) {
              return !e.showValue
            },
            l: null,
            b: [
              [null, "showValue"]
            ]
          }],
          c: [{
            t: 1,
            n: "p",
            a: [{
              n: "parse-text-content",
              v: ""
            }],
            c: [{
              c: "",
              e: function(e, t, n) {
                return e._filteredValue
              },
              b: [
                [null, "_filteredValue"]
              ],
              t: 3
            }]
          }]
        }]
      }]
    },
    properties: {
      min: {
        type: Number,
        value: 0,
        public: !0,
        observer: "_revalicateRange"
      },
      max: {
        type: Number,
        value: 100,
        public: !0,
        observer: "_revalicateRange"
      },
      step: {
        type: Number,
        value: 1,
        public: !0
      },
      value: {
        type: Number,
        value: 0,
        public: !0,
        observer: "_revalicateRange"
      },
      showValue: {
        type: Boolean,
        value: !1,
        public: !0
      },
      activeColor: {
        type: String,
        value: "#1AAD19",
        public: !0
      },
      backgroundColor: {
        type: String,
        value: "#E9E9E9",
        public: !0
      },
      blockSize: {
        type: Number,
        value: 28,
        public: !0
      },
      blockColor: {
        type: String,
        value: "#FFFFFF",
        public: !0
      },
      selectedColor: {
        type: String,
        value: "#1AAD19"
      },
      color: {
        type: String,
        value: "#E9E9E9"
      },
      _filteredValue: {
        type: Number
      }
    },
    listeners: {
      "wrapper.tap": "_onTap"
    },
    behaviors: ["wx-base", "wx-data-component", "wx-disabled", "wx-touchtrack"],
    created: function() {
      this.touchtrack(this.$.handle, "_onTrack")
    },
    methods: {
      _filterValue: function(e) {
        return e < this.min ? this.min : e > this.max ? this.max : Math.round((e - this.min) / this.step) * this.step + this.min
      },
      _revalicateRange: function() {
        var n = this._filterValue(this.value);
        if (e(this.min) || e(this.max) || e(this.step)) {
          var i = Math.max(t(this.min), t(this.max), t(this.step));
          n = +n.toFixed(i)
        }
        this._filteredValue = n
      },
      _getValueWidth: function(e, t, n) {
        return 100 * (e - t) / (n - t) + "%"
      },
      _getBlockSize: function(e) {
        return n(e, 12, 28)
      },
      _getBackgroundColor: function(e, t) {
        return "#E9E9E9" !== t ? t : "#E9E9E9" !== e ? e : "#E9E9E9"
      },
      _getActiveColor: function(e, t) {
        return "#1AAD19" !== t ? t : "#1AAD19" !== e ? e : "#1AAD19"
      },
      _getXPosition: function(e) {
        for (var t = e.offsetLeft; e; e = e.offsetParent) t += e.offsetLeft;
        return t - document.body.scrollLeft
      },
      _onUserChangedValue: function(e) {
        var t = this.$.step.offsetWidth,
          n = this._getXPosition(this.$.step),
          i = (e.detail.x - n) * (this.max - this.min) / t + this.min;
        i = this._filterValue(i), this.value = i
      },
      _onTrack: function(e) {
        if (!this.disabled) return "move" === e.detail.state ? (this._onUserChangedValue(e), this.triggerEvent("changing", {
          value: this.value
        }), !1) : void("end" === e.detail.state && this.triggerEvent("change", {
          value: this.value
        }))
      },
      _onTap: function(e) {
        this.disabled || (this._onUserChangedValue(e), this.triggerEvent("change", {
          value: this.value
        }))
      },
      resetFormData: function() {
        this.value = this.min
      }
    }
  })
}(), window.exparser.registerElement({
    is: "wx-swiper",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "slidesWrapper",
        cl: {
          v: "wx-swiper-wrapper"
        },
        a: [],
        c: [{
          t: 1,
          n: "div",
          id: "slides",
          cl: {
            v: "wx-swiper-slides"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            id: "slideFrame",
            cl: {
              v: "wx-swiper-slide-frame"
            },
            a: [],
            c: [{
              t: 1,
              n: "slot",
              v: !0,
              sn: "",
              a: [],
              c: []
            }]
          }]
        }, {
          t: 1,
          n: "div",
          id: "slidesDots",
          cl: {
            v: "wx-swiper-dots"
          },
          a: [{
            n: "hidden",
            o: "$",
            e: function(e, t, n) {
              return !e.indicatorDots
            },
            l: null,
            b: [
              [null, "indicatorDots"]
            ]
          }, {
            n: "wx-swiper-dots-horizontal",
            o: "c",
            e: function(e, t, n) {
              return !e.vertical
            },
            l: null,
            b: [
              [null, "vertical"]
            ]
          }, {
            n: "wx-swiper-dots-vertical",
            o: "c",
            e: function(e, t, n) {
              return e.vertical
            },
            l: [null],
            b: [
              [null, "vertical"]
            ]
          }],
          c: []
        }]
      }]
    },
    behaviors: ["wx-base", "wx-touchtrack", "wx-positioning-container"],
    properties: {
      indicatorDots: {
        type: Boolean,
        value: !1,
        public: !0
      },
      vertical: {
        type: Boolean,
        value: !1,
        observer: "_updateLayout",
        public: !0
      },
      autoplay: {
        type: Boolean,
        value: !1,
        observer: "_autoplayChanged",
        public: !0
      },
      circular: {
        type: Boolean,
        value: !1,
        observer: "_updateLayout",
        public: !0
      },
      interval: {
        type: Number,
        value: 5e3,
        public: !0,
        observer: "_autoplayChanged"
      },
      duration: {
        type: Number,
        value: 500,
        public: !0
      },
      current: {
        type: Number,
        value: 0,
        observer: "_currentChanged",
        public: !0
      },
      indicatorColor: {
        type: String,
        value: "",
        observer: "_updateDotsColor",
        public: !0
      },
      indicatorActiveColor: {
        type: String,
        value: "",
        observer: "_updateDotsColor",
        public: !0
      },
      previousMargin: {
        type: String,
        value: "",
        observer: "_updateMargin",
        public: !0
      },
      nextMargin: {
        type: String,
        value: "",
        observer: "_updateMargin",
        public: !0
      },
      currentItemId: {
        type: String,
        value: "",
        observer: "_currentItemIdChanged",
        public: !0
      },
      skipHiddenItemLayout: {
        type: Boolean,
        value: !1,
        observer: "_skipHiddenItemLayoutChanged",
        public: !0
      },
      displayMultipleItems: {
        type: Number,
        value: 1,
        observer: "_updateLayout",
        public: !0
      }
    },
    relations: {
      "wx-swiper-item": {
        type: "descendant",
        linked: function() {
          this._itemListChanged(), this._resetLayout()
        },
        linkChanged: function() {
          this._itemListChanged(), this._resetLayout()
        },
        unlinked: function() {
          this._itemListChanged(), this._resetLayout()
        }
      }
    },
    attached: function() {
      this._attachedCb()
    },
    moved: function() {
      this._detachedCb(), this._attachedCb()
    },
    detached: function() {
      this._detachedCb()
    },
    created: function() {
      this._attached = !1, this._invalid = !0, this._circularEnabled = !1, this._currentChangeSource = "", this._viewportPosition = 0, this._marginSpecified = !1, this._scheduleTimeoutObj = null, this._animating = null, this._requestedAnimation = !1, this._animateFrameFunc = this._animateFrameFuncProto.bind(this), this._itemIdItemMap = {}, this._items = [], this._itemListDirty = !1, this._userTracking = !1, this._userDirectionChecked = !1, this._contentTrackViewport = 0, this._contentTrackSpeed = 0, this._contentTrackT = 0, this._skipHiddenItemLayoutModified = !1, this.touchtrack(this.$.slidesWrapper, "_handleContentTrack", !0)
    },
    methods: {
      _attachedCb: function() {
        this._attached = !0, this._resetLayout(), this.autoplay && this._scheduleAutoplay()
      },
      _detachedCb: function() {
        this._attached = !1, this._cancelSchedule()
      },
      _itemIdUpdated: function(e, t, n) {
        t !== n && (this._itemListChanged(), this.currentItemId && this._currentItemIdChanged())
      },
      _currentItemIdChanged: function(e) {
        if ("__none__" === this._currentChangeSource) return void(this._currentChangeSource = "");
        "" !== e && (this.current = this._getPositionFromCurrent())
      },
      _currentChanged: function(e, t) {
        if ("__none__" === this._currentChangeSource) return void(this._currentChangeSource = "");
        var n = this._currentChangeSource;
        if (this._currentChangeSource = "", !this._isCurrentValueLegal(e)) return void this._resetLayout();
        if (!this._isCurrentValueLegal(t)) return void this._resetLayout();
        if (n || this._animateViewport(e, "", 0), e !== t) {
          var i = this._getItems()[e];
          i && (this._currentChangeSource = "__none__", this.currentItemId = i.itemId, "__none__" === this._currentChangeSource && (this._currentChangeSource = ""), this.triggerEvent("change", {
            current: this.current,
            currentItemId: i.itemId,
            source: n
          })), this._updateDots(e)
        }
      },
      _updateMargin: function() {
        this._marginSpecified = !0, this._resetLayout()
      },
      _skipHiddenItemLayoutChanged: function() {
        this._skipHiddenItemLayoutModified = !0, this._updateLayout()
      },
      _updateLayout: function() {
        this._resetLayout()
      },
      _autoplayChanged: function(e) {
        e ? this._scheduleAutoplay() : this._cancelSchedule()
      },
      _itemListChanged: function() {
        this._itemListDirty = !0
      },
      _updateItemList: function() {
        var e = this;
        this._itemListDirty = !1, (this._items = this.getRelationNodes("wx-swiper-item")).forEach(function(t) {
          t.itemId && (e._itemIdItemMap[t.itemId] || (e._itemIdItemMap[t.itemId] = t))
        })
      },
      _getItems: function() {
        return this._itemListDirty && this._updateItemList(), this._items
      },
      _getItemByItemId: function(e) {
        return this._itemListDirty && this._updateItemList(), this._itemIdItemMap[e]
      },
      _scheduleAutoplay: function() {
        var e = this;
        if (this._cancelSchedule(), !(!this._attached || this._invalid || this._getItems().length <= this.displayMultipleItems)) {
          var t = function t() {
            e._scheduleTimeoutObj = null, e._currentChangeSource = "autoplay", e._circularEnabled ? e.current = e._normalizeCurrentValue(e.current + 1) : e.current = e.current + e.displayMultipleItems < e._getItems().length ? e.current + 1 : 0, e._animateViewport(e.current, "autoplay", e._circularEnabled ? 1 : 0), e._scheduleTimeoutObj = setTimeout(t, e.interval)
          };
          this._scheduleTimeoutObj = setTimeout(t, this.interval)
        }
      },
      _cancelSchedule: function() {
        this._scheduleTimeoutObj && (clearTimeout(this._scheduleTimeoutObj), this._scheduleTimeoutObj = null)
      },
      _updateDots: function(e) {
        var t = !this._invalid,
          n = this.$.slidesDots;
        n.innerHTML = "";
        for (var i = this._getItems(), r = document.createDocumentFragment(), o = 0; o < i.length; o++) {
          var a = document.createElement("div");
          a.setAttribute("data-dot-index", o), t && o >= e && o < e + this.displayMultipleItems || o < e + this.displayMultipleItems - i.length ? (a.setAttribute("class", "wx-swiper-dot wx-swiper-dot-active"), this.indicatorActiveColor && (a.style.backgroundColor = this.indicatorActiveColor)) : (a.setAttribute("class", "wx-swiper-dot"), this.indicatorColor && (a.style.backgroundColor = this.indicatorColor)), r.appendChild(a)
        }
        n.appendChild(r)
      },
      _updateDotsColor: function() {
        for (var e = this.$.slidesDots, t = 0; t < e.childNodes.length; t++) {
          var n = e.childNodes[t];
          n.getAttribute("class").indexOf("wx-swiper-dot-active") >= 0 ? this.indicatorActiveColor && (n.style.backgroundColor = this.indicatorActiveColor) : this.indicatorColor && (n.style.backgroundColor = this.indicatorColor)
        }
      },
      _normalizeCurrentValue: function(e) {
        var t = this._getItems().length;
        if (!t) return -1;
        var n = (Math.round(e) % t + t) % t;
        if (this._circularEnabled) {
          if (t <= this.displayMultipleItems) return 0
        } else if (n > t - this.displayMultipleItems) return t - this.displayMultipleItems;
        return n
      },
      _isCurrentValueLegal: function(e) {
        return !!this._getItems().length && e === this._normalizeCurrentValue(e)
      },
      _transformPropRpx: function(e) {
        return /^\s*[+-]?\d+(\.\d+)?(px)?\s*$/i.test(e) ? "px" !== e.slice(-2) ? e + "px" : e : /^\s*[+-]?\d+(\.\d+)?rpx\s*$/i.test(e) ? wx.transformRpx("%%?" + e + "?%%") : ""
      },
      _getPositionFromCurrent: function() {
        return this.currentItemId ? this._getItems().indexOf(this._getItemByItemId(this.currentItemId)) : this._isCurrentValueLegal(this.current) ? this.current : -2
      },
      _updateHiddenItemDisplay: function(e) {
        if (this._skipHiddenItemLayoutModified)
          for (var t = this._getItems(), n = 0; n < t.length; n++) {
            var i = t[n],
              r = i._position <= e - 2 || i._position >= e + this.displayMultipleItems + 1;
            i.style.display = r ? "none" : i._originalDisplay
          }
      },
      _resetLayout: function() {
        if (this._attached) {
          this._cancelSchedule(), this._endViewportAnimation();
          var e = this._getItems();
          this.currentItemId && (this._currentChangeSource = "__none__", this.current = this._getPositionFromCurrent(), "__none__" === this._currentChangeSource && (this._currentChangeSource = ""));
          var t = this.$.slides,
            n = this.$.slideFrame;
          this.vertical ? (this._marginSpecified && (t.style.left = 0, t.style.right = 0, t.style.top = this._transformPropRpx(this.previousMargin), t.style.bottom = this._transformPropRpx(this.nextMargin)), n.style.width = "100%", n.style.height = Math.abs(100 / this.displayMultipleItems) + "%") : (this._marginSpecified && (t.style.top = 0, t.style.bottom = 0, t.style.left = this._transformPropRpx(this.previousMargin), t.style.right = this._transformPropRpx(this.nextMargin)), n.style.height = "100%", n.style.width = Math.abs(100 / this.displayMultipleItems) + "%"), this._itemPos = [];
          for (var i = 0; i < e.length; i++) this._skipHiddenItemLayoutModified && (e[i].style.display = e[i]._originalDisplay), this._updateItemPos(i, i);
          this._circularEnabled = this.circular && e.length > this.displayMultipleItems;
          var r = this._viewportPosition;
          this._viewportPosition = -2;
          var o = this._getPositionFromCurrent();
          o >= 0 ? (this._invalid = !1, this._userTracking ? (this._updateViewport(r + o - this._contentTrackViewport), this._contentTrackViewport = o) : this._updateViewport(o), this.autoplay && this._scheduleAutoplay()) : (this._invalid = !0, this._updateViewport(-this.displayMultipleItems - 1)), this._updateDots(o)
        }
      },
      _checkCircularLayout: function(e) {
        if (!this._invalid)
          for (var t = this._getItems(), n = t.length, i = e + this.displayMultipleItems, r = 0; r < n; r++) {
            var o = t[r],
              a = o._position,
              s = Math.floor(e / n) * n + r,
              l = s + n,
              c = s - n,
              u = Math.max(e - (s + 1), s - i, 0),
              d = Math.max(e - (l + 1), l - i, 0),
              h = Math.max(e - (c + 1), c - i, 0),
              p = Math.min(u, d, h),
              f = [s, l, c][
                [u, d, h].indexOf(p)
              ];
            a !== f && this._updateItemPos(r, f)
          }
      },
      _updateItemPos: function(e, t) {
        var n = this.vertical ? "0" : 100 * t + "%",
          i = this.vertical ? 100 * t + "%" : "0",
          r = "translate(" + n + ", " + i + ") translateZ(0)",
          o = this._getItems()[e];
        o.style["-webkit-transform"] = r, o.style.transform = r, o._position = t
      },
      _updateViewport: function(e) {
        Math.floor(2 * this._viewportPosition) === Math.floor(2 * e) && Math.ceil(2 * this._viewportPosition) === Math.ceil(2 * e) || (this._circularEnabled && this._checkCircularLayout(e), this.skipHiddenItemLayout && this._updateHiddenItemDisplay(e));
        var t = this.vertical ? "0" : 100 * -e + "%",
          n = this.vertical ? 100 * -e + "%" : "0",
          i = "translate(" + t + ", " + n + ") translateZ(0)";
        this.$.slideFrame.style["-webkit-transform"] = i, this.$.slideFrame.style.transform = i, this._viewportPosition = e
      },
      _animateFrameFuncProto: function() {
        if (!this._animating) return void(this._requestedAnimation = !1);
        var e = this._animating,
          t = e.toPos,
          n = e.acc,
          i = e.endTime,
          r = e.source,
          o = i - Date.now();
        if (o <= 0) {
          this._updateViewport(t), this._animating = null, this._requestedAnimation = !1;
          var a = this._getItems()[this.current];
          return void(a && this.triggerEvent("animationfinish", {
            current: this.current,
            currentItemId: a.itemId,
            source: r
          }))
        }
        var s = n * o * o / 2,
          l = t + s;
        this._updateViewport(l), requestAnimationFrame(this._animateFrameFunc)
      },
      _animateViewport: function(e, t, n) {
        this._cancelViewportAnimation();
        var i = this.duration,
          r = this._getItems().length,
          o = this._viewportPosition;
        if (n < 0) {
          for (; o < e;) o += r;
          for (; o - r > e;) o -= r
        } else if (n > 0) {
          for (; o > e;) o -= r;
          for (; o + r < e;) o += r
        } else {
          for (; o + r < e;) o += r;
          for (; o - r > e;) o -= r;
          o + r - e < e - o && (o += r)
        }
        this._animating = {
          toPos: e,
          acc: 2 * (o - e) / (i * i),
          endTime: Date.now() + i,
          source: t
        }, this._requestedAnimation || (this._requestedAnimation = !0, requestAnimationFrame(this._animateFrameFunc))
      },
      _cancelViewportAnimation: function() {
        this._animating = null
      },
      _endViewportAnimation: function() {
        this._animating && (this._updateViewport(this._animating.toPos), this._animating = null)
      },
      _handleTrackStart: function() {
        this._cancelSchedule(), this._contentTrackViewport = this._viewportPosition, this._contentTrackSpeed = 0, this._contentTrackT = Date.now(), this._cancelViewportAnimation()
      },
      _handleTrackMove: function(e) {
        var t = this,
          n = this._contentTrackT;
        this._contentTrackT = Date.now();
        var i = this._getItems().length,
          r = i - this.displayMultipleItems,
          o = function(e) {
            return .5 - .25 / (e + .5)
          },
          a = function(e, n) {
            var i = t._contentTrackViewport + e;
            t._contentTrackSpeed = .6 * t._contentTrackSpeed + .4 * n, t._circularEnabled || (i < 0 || i > r) && (i < 0 ? i = -o(-i) : i > r && (i = r + o(i - r)), t._contentTrackSpeed = 0), t._updateViewport(i)
          };
        this.vertical ? a(-e.dy / this.$.slideFrame.offsetHeight, -e.ddy / (this._contentTrackT - n)) : a(-e.dx / this.$.slideFrame.offsetWidth, -e.ddx / (this._contentTrackT - n))
      },
      _handleTrackEnd: function(e) {
        this.autoplay && this._scheduleAutoplay(), this._userTracking = !1;
        var t = this._contentTrackSpeed / Math.abs(this._contentTrackSpeed),
          n = 0;
        !e && Math.abs(this._contentTrackSpeed) > .2 && (n = .5 * t);
        var i = this._normalizeCurrentValue(this._viewportPosition + n);
        e ? this._updateViewport(this._contentTrackViewport) : this.current !== i ? (this._currentChangeSource = "touch", this.current = i, this._animateViewport(i, "touch", n)) : this._animateViewport(i, "touch", n)
      },
      _handleContentTrack: function(e) {
        if (!this._invalid) {
          if ("start" === e.detail.state) return this._userTracking = !0, this._userDirectionChecked = !1, this._handleTrackStart();
          if (this._userTracking) {
            if (!this._userDirectionChecked) {
              this._userDirectionChecked = !0;
              var t = Math.abs(e.detail.dx),
                n = Math.abs(e.detail.dy);
              if (t >= n && this.vertical ? this._userTracking = !1 : t <= n && !this.vertical && (this._userTracking = !1), !this._userTracking) return void(this.autoplay && this._scheduleAutoplay())
            }
            return "end" === e.detail.state ? this._handleTrackEnd(!1) : "cancel" === e.detail.state ? this._handleTrackEnd(!0) : (this._handleTrackMove(e.detail), !1)
          }
        }
      },
      getScrollPosition: function() {
        return {
          scrollLeft: 0,
          scrollTop: 0
        }
      }
    }
  }), window.exparser.registerElement({
    is: "wx-swiper-item",
    behaviors: ["wx-base", "wx-positioning-container"],
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    },
    properties: {
      itemId: {
        type: String,
        value: "",
        observer: function(e, t) {
          var n = this.getRelationNodes("wx-swiper")[0];
          n && n._itemIdUpdated(this, e, t)
        },
        public: !0
      }
    },
    relations: {
      "wx-swiper": {
        type: "ancestor"
      }
    },
    attached: function() {
      this._scheduledScrollPosition = !1, this._attachedCb()
    },
    moved: function() {
      this._detachedCb(), this._attachedCb()
    },
    detached: function() {
      this._detachedCb()
    },
    methods: {
      _invalidChild: function(e) {
        if (e.target !== this) return !1
      },
      _setDomStyle: function() {
        var e = this.$$;
        e.style.position = "absolute", e.style.width = "100%", e.style.height = "100%"
      },
      _attachedCb: function() {
        this._setDomStyle(), this._originalDisplay = this.$$.style.display
      },
      _detachedCb: function() {},
      getScrollPosition: function() {
        return {
          scrollLeft: 0,
          scrollTop: 0
        }
      },
      _keepSyncScrollPosition: function() {
        var e = this;
        if (!this._scheduledScrollPosition) {
          this._scheduledScrollPosition = !0;
          var t = 0,
            n = {},
            i = function i() {
              var r = e.getPositioningOffset();
              if (r.left === n.left && r.top === n.top && 4 === ++t) return void(e._scheduledScrollPosition = !1);
              n = r, e.updateScrollPosition(r), window.requestAnimationFrame(i)
            };
          window.requestAnimationFrame(i)
        }
      }
    }
  }),
  function() {
    function e() {
      t && "function" == typeof wx.vibrateShort && wx.vibrateShort()
    }
    var t = "ios" === wx.getPlatform();
    window.exparser.registerElement({
      is: "wx-switch",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          cl: {
            v: "wx-switch-wrapper"
          },
          a: [],
          c: [{
            t: 1,
            n: "div",
            id: "switchInput",
            cl: {
              v: "wx-switch-input"
            },
            a: [{
              n: "hidden",
              o: "$",
              e: function(e, i, r) {
                return !t(r, n, "isSwitch", [e.type])
              },
              l: null,
              b: [
                [null, "isSwitch"],
                [null, "type"]
              ]
            }, {
              n: "type",
              v: "checkbox"
            }, {
              n: "wx-switch-input-checked",
              o: "c",
              e: function(e, t, n) {
                return e.checked
              },
              l: [null],
              b: [
                [null, "checked"]
              ]
            }, {
              n: "wx-switch-input-disabled",
              o: "c",
              e: function(e, t, n) {
                return e.disabled
              },
              l: [null],
              b: [
                [null, "disabled"]
              ]
            }, {
              n: "background-color",
              o: "s",
              e: function(e, t, n) {
                return e.color
              },
              l: [null],
              b: [
                [null, "color"]
              ]
            }, {
              n: "border-color",
              o: "s",
              e: function(e, i, r) {
                return t(r, n, "_getSwitchBorderColor", [e.checked, e.color])
              },
              l: null,
              b: [
                [null, "_getSwitchBorderColor"],
                [null, "checked"],
                [null, "color"]
              ]
            }],
            c: []
          }, {
            t: 1,
            n: "div",
            id: "checkboxInput",
            cl: {
              v: "wx-checkbox-input"
            },
            a: [{
              n: "hidden",
              o: "$",
              e: function(e, i, r) {
                return !t(r, n, "isCheckbox", [e.type])
              },
              l: null,
              b: [
                [null, "isCheckbox"],
                [null, "type"]
              ]
            }, {
              n: "type",
              v: "checkbox"
            }, {
              n: "wx-checkbox-input-checked",
              o: "c",
              e: function(e, t, n) {
                return e.checked
              },
              l: [null],
              b: [
                [null, "checked"]
              ]
            }, {
              n: "wx-checkbox-input-disabled",
              o: "c",
              e: function(e, t, n) {
                return e.disabled
              },
              l: [null],
              b: [
                [null, "disabled"]
              ]
            }, {
              n: "color",
              o: "s",
              e: function(e, t, n) {
                return e.color
              },
              l: [null],
              b: [
                [null, "color"]
              ]
            }],
            c: []
          }]
        }]
      },
      properties: {
        checked: {
          type: Boolean,
          value: !1,
          public: !0
        },
        type: {
          type: String,
          value: "switch",
          public: !0
        },
        color: {
          type: String,
          value: "#04BE02",
          public: !0
        }
      },
      behaviors: ["wx-base", "wx-label-target", "wx-disabled", "wx-data-component"],
      listeners: {
        "switchInput.tap": "onInputChange",
        "checkboxInput.tap": "onInputChange"
      },
      methods: {
        _getSwitchBorderColor: function(e, t) {
          return e ? t : ""
        },
        handleLabelTap: function(e) {
          this.onInputChange(e)
        },
        onInputChange: function() {
          if (this.checked = !this.checked, this.disabled) return void(this.checked = !this.checked);
          this.triggerEvent("change", {
            value: this.checked
          }), "switch" === this.type && e()
        },
        isSwitch: function(e) {
          return "checkbox" !== e
        },
        isCheckbox: function(e) {
          return "checkbox" === e
        },
        getFormData: function() {
          return this.checked
        },
        resetFormData: function() {
          this.checked = !1
        }
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-text",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "span",
        id: "raw",
        st: {
          v: "display:none;"
        },
        a: [],
        c: [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      }, {
        t: 1,
        n: "span",
        id: "main",
        a: [],
        c: []
      }]
    },
    behaviors: ["wx-base"],
    properties: {
      style: {
        type: String,
        public: !0,
        observer: "_styleChanged"
      },
      class: {
        type: String, public: !0, observer: "_classChanged"
      },
      selectable: {
        type: Boolean,
        value: !1,
        public: !0
      },
      decode: {
        type: Boolean,
        value: !1,
        public: !0
      },
      space: {
        type: String,
        value: "",
        public: !0
      }
    },
    methods: {
      _styleChanged: function(e) {
        this.$$.setAttribute("style", e)
      },
      _classChanged: function(e) {
        this.classList.setClassNames(e)
      },
      _htmlDecode: function(e) {
        return this.space && ("nbsp" === this.space ? e = e.replace(/ /g, " ") : "ensp" === this.space ? e = e.replace(/ /g, " ") : "emsp" === this.space && (e = e.replace(/ /g, " "))), this.decode ? e.replace(/&nbsp;/g, " ").replace(/&ensp;/g, " ").replace(/&emsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&") : e
      },
      _update: function() {
        for (var e = this.$.raw, t = document.createDocumentFragment(), n = 0, i = e.childNodes.length; n < i; n++) {
          var r = e.childNodes.item(n);
          if (r.nodeType === r.TEXT_NODE)
            for (var o = this._htmlDecode(r.textContent).split("\n"), a = 0; a < o.length; a++) a && t.appendChild(document.createElement("br")), t.appendChild(document.createTextNode(o[a]));
          else r.nodeType === r.ELEMENT_NODE && "WX-TEXT" === r.tagName && t.appendChild(r.cloneNode(!0))
        }
        this.$.main.innerHTML = "", this.$.main.appendChild(t)
      }
    },
    created: function() {
      this._observer = exparser.Observer.create(function() {
        this._update()
      }), this._observer.observe(this, {
        childList: !0,
        subtree: !0,
        characterData: !0,
        properties: !0
      })
    },
    attached: function() {
      this._update()
    }
  }),
  function() {
    function e(e) {
      return e = Number(e), isNaN(e) ? -1 : e
    }
    /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) && window.exparser.registerElement({
      is: "wx-textarea",
      behaviors: ["wx-base", "wx-class-prefix", "wx-data-component"],
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "wrapped",
          a: [],
          c: [{
            t: 1,
            n: "div",
            id: "placeholder",
            a: [{
              n: "parse-text-content",
              v: ""
            }],
            c: [{
              c: "",
              e: function(e, t, n) {
                return e.placeholder
              },
              b: [
                [null, "placeholder"]
              ],
              t: 3
            }]
          }, {
            t: 1,
            n: "textarea",
            id: "textarea",
            a: [{
              n: "maxlength",
              o: "$",
              e: function(e, i, r) {
                return t(r, n, "_getMaxlength", [e.maxlength])
              },
              l: null,
              b: [
                [null, "_getMaxlength"],
                [null, "maxlength"]
              ]
            }],
            c: []
          }, {
            t: 1,
            n: "div",
            id: "compute",
            cl: {
              v: "compute"
            },
            a: [],
            c: []
          }, {
            t: 1,
            n: "div",
            id: "stylecompute",
            cl: {
              e: function(e, t, n) {
                return "textarea-placeholder " + e._prefixedPlaceholderClass
              },
              b: [
                [null, "_prefixedPlaceholderClass"]
              ]
            },
            st: {
              e: function(e, i, r) {
                return t(r, n, "_getPlaceholderStyle", [e.placeholderStyle])
              },
              b: [
                [null, "_getPlaceholderStyle"],
                [null, "placeholderStyle"]
              ]
            },
            a: [],
            c: []
          }]
        }]
      },
      properties: {
        value: {
          type: String,
          value: "",
          public: !0,
          filter: "defaultValueChange"
        },
        maxlength: {
          type: Number,
          value: 140,
          public: !0,
          observer: "maxlengthChanged"
        },
        placeholder: {
          type: String,
          value: "",
          public: !0
        },
        hidden: {
          type: Boolean,
          value: !1,
          public: !0
        },
        disabled: {
          type: Boolean,
          value: !1,
          public: !0
        },
        focus: {
          type: Number,
          value: 0,
          public: !0,
          filter: "focusChanged"
        },
        autoFocus: {
          type: Boolean,
          value: !1,
          public: !0
        },
        placeholderClass: {
          type: String,
          value: "textarea-placeholder",
          observer: "_placeholderClassChange",
          public: !0
        },
        placeholderStyle: {
          type: String,
          value: "",
          observer: "_getComputePlaceholderStyle",
          public: !0
        },
        autoHeight: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "autoHeightChanged"
        },
        bindinput: {
          type: String,
          value: "",
          public: !0
        },
        cursor: {
          type: null,
          value: -1,
          public: !0
        },
        selectionStart: {
          type: null,
          value: -1,
          public: !0
        },
        selectionEnd: {
          type: null,
          value: -1,
          public: !0
        }
      },
      data: {
        _prefixedPlaceholderClass: ""
      },
      listeners: {
        "textarea.input": "onTextAreaInput",
        "textarea.focus": "onTextAreaFocus",
        "textarea.blur": "onTextAreaBlur"
      },
      attached: function() {
        var e = this;
        this.__attached = !0, this._placeholderClassChange(this.placeholderClass), this.__scale = 750 / window.innerWidth, this.getComputedStyle(), this.checkRows(this.value), this.__updateTextArea = this.updateTextArea.bind(this), document.addEventListener("pageReRender", this.__updateTextArea), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
          e.checkAutoFocus()
        }), this.__setKeyboardValueId = exparser.addListenerToElement(document, "setKeyboardValue", function(t) {
          if (e._keyboardShow) {
            var n = t.detail.value,
              i = t.detail.cursor;
            void 0 !== n && (e.value = n), void 0 !== i && -1 != i && (e.$.textarea.setSelectionRange(i, i), e.cursor = i)
          }
        }), this.checkPlaceholderStyle(this.value)
      },
      detached: function() {
        document.removeEventListener("pageReRender", this.__updateTextArea), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "setKeyboardValue", this.__setKeyboardValueId)
      },
      methods: {
        resetFormData: function() {
          this.$.textarea.value = "", this.value = ""
        },
        getFormData: function(e) {
          var t = this;
          this.value = this.$.textarea.value, setTimeout(function() {
            "function" == typeof e && e(t.value)
          }, 0)
        },
        couldFocus: function(t) {
          var n = this;
          this.__attached && (!this._keyboardShow && t ? this.disabled || window.requestAnimationFrame(function() {
            n.selectionStart = e(n.selectionStart), n.selectionEnd = e(n.selectionEnd), n.cursor = e(n.cursor), n.$.textarea.focus(), -1 !== n.selectionStart ? n.$.textarea.setSelectionRange(n.selectionStart, n.selectionEnd) : n.$.textarea.setSelectionRange(n.cursor, n.cursor), n.selectionStart = -1, n.selectionEnd = -1, n.cursor = -1
          }) : this._keyboardShow && !t && this.$.textarea.blur())
        },
        focusChanged: function(e, t) {
          return this.couldFocus(Boolean(e)), e
        },
        checkAutoFocus: function() {
          this.__autoFocused || (this.__autoFocused = !0, this.couldFocus(this.autoFocus || this.focus))
        },
        getHexColor: function(e) {
          try {
            if (e.indexOf("#") >= 0) return e;
            var t = e.match(/\d+/g),
              n = [];
            if (t.map(function(e, t) {
                if (t < 3) {
                  var i = parseInt(e);
                  i = i > 9 ? i.toString(16) : "0" + i, n.push(i)
                }
              }), t.length > 3) {
              var i = parseFloat(t.slice(3).join("."));
              0 == i ? n.push("00") : i >= 1 ? n.push("ff") : (i = parseInt(255 * i), i = i > 9 ? i.toString(16) : "0" + i, n.push(i))
            }
            return "#" + n.join("")
          } catch (e) {
            return ""
          }
        },
        getComputedStyle: function() {
          var e = this;
          window.requestAnimationFrame(function() {
            var t = window.getComputedStyle(e.$$),
              n = e.$$.getBoundingClientRect(),
              i = ["Left", "Right"].map(function(e) {
                return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
              }),
              r = ["Top", "Bottom"].map(function(e) {
                return parseFloat(t["border" + e + "Width"]) + parseFloat(t["padding" + e])
              }),
              o = e.$.textarea;
            o.style.width = n.width - i[0] - i[1] + "px", o.style.height = n.height - r[0] - r[1] + "px", o.style.fontWeight = t.fontWeight, o.style.fontSize = t.fontSize || "16px", o.style.color = t.color, o.style.lineHeight = Math.max(1.2 * parseFloat(t.fontSize), parseFloat(t.lineHeight)) + "px", o.style.textAlign = t.textAlign, e.$.compute.style.fontSize = t.fontSize || "16px", e.$.compute.style.width = o.style.width, e.$.placeholder.style.width = o.style.width, e.$.placeholder.style.height = o.style.height, e._styleMaxHeight = parseFloat(t.maxHeight.replace("px")), e.autoHeight && e._lineHeight && e._lineHeight > e._styleMaxHeight && (e.$$.style.maxHeight = e._lineHeight + "px"), e.disabled ? o.setAttribute("disabled", !0) : o.removeAttribute("disabled")
          })
        },
        getCurrentRows: function(e, t) {
          var n = this;
          window.requestAnimationFrame(function() {
            var i = window.getComputedStyle(n.$.compute),
              r = 1.2 * (parseFloat(i.fontSize) || 16);
            n.$.compute.innerText = e, n.$.compute.appendChild(document.createElement("br")), t({
              height: Math.max(n.$.compute.scrollHeight, r),
              heightRpx: n.__scale * n.$.compute.scrollHeight,
              lineHeight: r,
              lineCount: Math.ceil(n.$.compute.scrollHeight / r)
            })
          })
        },
        onTextAreaInput: function(e) {
          if (this.value = e.target.value, this.bindinput) {
            var t = {
              id: this.id,
              dataset: this.dataset,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            };
            WeixinJSBridge.publish("SPECIAL_PAGE_EVENT", {
              eventName: this.bindinput,
              data: {
                ext: {
                  setKeyboardValue: !0
                },
                data: {
                  type: "input",
                  timestamp: Date.now(),
                  detail: {
                    value: e.target.value,
                    cursor: this.$.textarea.selectionEnd
                  },
                  target: t,
                  currentTarget: t,
                  touches: []
                },
                eventName: this.bindinput,
                nodeId: this.getNodeId()
              }
            })
          }
          return !1
        },
        onTextAreaFocus: function(e) {
          this._keyboardShow = !0, this.triggerEvent("focus", {
            value: this.value
          })
        },
        onTextAreaBlur: function(e) {
          this._keyboardShow = !1, this.triggerEvent("blur", {
            value: this.value
          })
        },
        updateTextArea: function() {
          this.checkAutoFocus(), this.getComputedStyle(), this.autoHeightChanged(this.autoHeight)
        },
        hiddenChanged: function(e, t) {
          this.$$.style.display = e ? "none" : ""
        },
        _getPlaceholderStyle: function(e) {
          return e + ";display:none;"
        },
        _getComputePlaceholderStyle: function() {
          var e = this.$.stylecompute,
            t = window.getComputedStyle(e),
            n = parseInt(t.fontWeight);
          isNaN(n) ? n = t.fontWeight : n < 500 ? n = "normal" : n >= 500 && (n = "bold"), this.placeholderStyle && this.placeholderStyle.split(";");
          var i = this.$.placeholder;
          i.style.position = "absolute", i.style.fontSize = (parseFloat(t.fontSize) || 16) + "px", i.style.fontWeight = n, i.style.color = this.getHexColor(t.color)
        },
        _placeholderClassChange: function(e) {
          for (var t = e.split(/\s+/), n = this ? this.getClassPrefix() : "", i = [], r = 0; r < t.length; r++) t[r] && i.push(n + t[r]);
          this.setData({
            _prefixedPlaceholderClass: i.join(" ")
          }), this._getComputePlaceholderStyle()
        },
        defaultValueChange: function(e) {
          return this.maxlength > 0 && e.length > this.maxlength && (e = e.slice(0, this.maxlength)), this.checkPlaceholderStyle(e), this.$.textarea.value = e, this.__attached && this.checkRows(e), e
        },
        autoHeightChanged: function(e) {
          var t = this;
          e && this.getCurrentRows(this.value, function(e) {
            var n = e.height < e.lineHeight ? e.lineHeight : e.height;
            t.$$.style.height = n + "px", t.getComputedStyle()
          })
        },
        checkRows: function(e) {
          var t = this;
          this.getCurrentRows(e, function(e) {
            if (t.lastRows != e.lineCount) {
              if (t.lastRows = e.lineCount, wxConsole.log(t.lastRows), t.autoHeight) {
                var n = e.height < e.lineHeight ? e.lineHeight : e.height;
                t._lineHeight = n / (e.lineCount || 1), t.$$.style.height = n + "px", t.getComputedStyle()
              }
              t.triggerEvent("linechange", e)
            }
          })
        },
        checkPlaceholderStyle: function(e) {
          e ? this.$.placeholder.style.display = "none" : (this._getComputePlaceholderStyle(), this.$.placeholder.style.display = "")
        },
        _getMaxlength: function(e) {
          return e <= 0 ? -1 : e
        },
        maxlengthChanged: function(e) {
          e > 0 && this.value.length > e && (this.value = this.value.slice(0, e))
        }
      }
    })
  }(),
  function() {
    function e(e) {
      return e = Number(e), isNaN(e) ? -1 : e
    }
    /wechatdevtools/.test(window.navigator.userAgent.toLowerCase()) || window.exparser.registerElement({
      is: "wx-textarea",
      behaviors: ["wx-base", "wx-class-prefix", "wx-native", "wx-data-component", "wx-positioning-target"],
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          id: "textarea",
          a: [],
          c: [{
            t: 1,
            n: "p",
            id: "placeholder",
            cl: {
              e: function(e, t, n) {
                return "textarea-placeholder " + e._prefixedPlaceholderClass
              },
              b: [
                [null, "_prefixedPlaceholderClass"]
              ]
            },
            st: {
              e: function(e, i, r) {
                return t(r, n, "_getPlaceholderStyle", [e.placeholderStyle])
              },
              b: [
                [null, "_getPlaceholderStyle"],
                [null, "placeholderStyle"]
              ]
            },
            a: [],
            c: []
          }]
        }]
      },
      properties: {
        value: {
          type: String,
          value: "",
          filter: "defaultValueChange",
          public: !0
        },
        maxlength: {
          type: Number,
          value: 140,
          public: !0
        },
        placeholder: {
          type: String,
          value: "",
          public: !0
        },
        disabled: {
          type: Boolean,
          value: !1,
          public: !0
        },
        hidden: {
          type: Boolean,
          value: !1,
          public: !0,
          observer: "hiddenChanged"
        },
        focus: {
          type: Boolean,
          value: !1,
          public: !0,
          filter: "focusChanged"
        },
        autoFocus: {
          type: Boolean,
          value: !1,
          public: !0
        },
        placeholderStyle: {
          type: String,
          value: "",
          public: !0
        },
        placeholderClass: {
          type: String,
          value: "textarea-placeholder",
          observer: "_placeholderClassChange",
          public: !0
        },
        autoHeight: {
          type: Boolean,
          value: !1,
          public: !0
        },
        confirm: {
          type: Boolean,
          value: !0,
          public: !0
        },
        bindinput: {
          type: String,
          value: "",
          public: !0
        },
        cursorSpacing: {
          type: Number,
          value: 0,
          public: !0
        },
        fixed: {
          type: Boolean,
          value: !1,
          public: !0
        },
        cursor: {
          type: null,
          value: -1,
          public: !0
        },
        selectionStart: {
          type: null,
          value: -1,
          public: !0
        },
        selectionEnd: {
          type: null,
          value: -1,
          public: !0
        },
        showConfirmBar: {
          type: Boolean,
          value: !0,
          public: !0
        }
      },
      data: {
        _prefixedPlaceholderClass: ""
      },
      attached: function() {
        this._attachedCb()
      },
      detached: function() {
        this._detachedCb()
      },
      methods: {
        resetFormData: function() {
          this._keyboardShow && (this.__formResetCallback = !0, wx.hideKeyboard()), this.value = "", "number" == typeof this._groupID && (this._groupID = null)
        },
        getFormData: function(e) {
          this._keyboardShow ? this.__formCallback = e : "function" == typeof e && e(this.value)
        },
        _attachedCb: function() {
          var e = this;
          this._isReady = !1, this._detached = !1, this._placeholderClassChange(this.placeholderClass), this._inputId = this.getPositioningId(), this._parentId = this.fetchPositioningParentId(), this.insertTextArea(), this.__scale = 750 / window.innerWidth, this.__reRenderCallback = this.reRenderCallback.bind(this), document.addEventListener("pageReRender", this.__reRenderCallback, !1), this.__onKeyboardShowId = exparser.addListenerToElement(document, "onKeyboardShow", this.onKeyboardShow.bind(this)), this.__onKeyboardCompleteId = exparser.addListenerToElement(document, "onKeyboardComplete", this.onKeyboardComplete.bind(this)), this.__onTextAreaHeightChangeId = exparser.addListenerToElement(document, "onTextAreaHeightChange", this.onTextAreaHeightChange.bind(this)), this.__onKeyboardConfirmId = exparser.addListenerToElement(document, "onKeyboardConfirm", this.onKeyboardConfirm.bind(this)), this.__routeDoneId = exparser.addListenerToElement(document, "routeDone", function() {
            e.checkAutoFocus()
          })
        },
        _detachedCb: function() {
          this._detached = !0, document.removeEventListener("pageReRender", this.__reRenderCallback, !1), exparser.removeListenerFromElement(document, "onKeyboardShow", this.__onKeyboardShowId), exparser.removeListenerFromElement(document, "onKeyboardComplete", this.__onKeyboardCompleteId), exparser.removeListenerFromElement(document, "onTextAreaHeightChange", this.__onTextAreaHeightChangeId), exparser.removeListenerFromElement(document, "routeDone", this.__routeDoneId), exparser.removeListenerFromElement(document, "onKeyboardConfirm", this.__onKeyboardConfirmId), this.removeTextArea()
        },
        removeTextArea: function() {
          this._detached && this._inputId && WeixinJSBridge.invoke("removeTextArea", {
            inputId: this._inputId
          }, function(e) {})
        },
        checkAutoFocus: function() {
          this.__autoFocused || window.__onAppRouteDone && (this.__autoFocused = !0, this.couldFocus(this.autoFocus || this.focus))
        },
        couldFocus: function(t) {
          var n = this,
            i = function t() {
              n.selectionStart = e(n.selectionStart), n.selectionEnd = e(n.selectionEnd), n.cursor = e(n.cursor);
              var i = {
                inputId: n._inputId
              };
              if (-1 !== n.selectionStart) {
                var r = -1 === n.selectionEnd ? n.selectionStart : Math.min(n.selectionStart, n.selectionEnd);
                i.selectionStart = r, i.selectionEnd = n.selectionEnd
              } else i.cursor = n.cursor;
              WeixinJSBridge.invoke("showKeyboard", i, function(e) {
                n.cursor = -1, n.selectionStart = -1, n.selectionEnd = -1
              }), document.removeEventListener("pageReRender", t)
            };
          this._isReady && window.__onAppRouteDone && (!this._keyboardShow && t ? this.hidden || this.disabled || !this._inputId || document.addEventListener("pageReRender", i) : this._keyboardShow && !t && wx.hideKeyboard())
        },
        focusChanged: function(e) {
          this.couldFocus(e)
        },
        onKeyboardConfirm: function(e) {
          e.detail.inputId === this._inputId && (this.value = e.detail.value, this.triggerEvent("confirm", {
            value: this.value
          }))
        },
        onKeyboardShow: function(e) {
          e.detail.inputId === this._inputId && (this._keyboardShow = !0, this.triggerEvent("focus", {
            value: this.value
          }))
        },
        onKeyboardComplete: function(e) {
          e.detail.inputId === this._inputId && (this.value = e.detail.value, this.__formResetCallback && (this.value = "", this.__formResetCallback = void 0), "function" == typeof this.__formCallback && this.__formCallback(this.value), this._keyboardShow = !1, this.triggerEvent("blur", {
            value: this.value,
            cursor: e.detail.cursor
          }))
        },
        onTextAreaHeightChange: function(e) {
          e.detail.inputId === this._inputId && (this.triggerEvent("linechange", {
            lineCount: e.detail.lineCount,
            height: e.detail.height,
            heightRpx: e.detail.height * this.__scale
          }), this.styleHeight = e.detail.height, this.autoHeight && (this._lineHeight = e.detail.height / (e.detail.lineCount || 1), this.checkMaxHeight(), this.$$.style.height = this.styleHeight + "px", document.dispatchEvent(new CustomEvent("pageReRender", {}))))
        },
        getForm: function() {
          for (var e = void 0, t = this.parentNode; t;) {
            if (t instanceof exparser.Component && t.hasBehavior("wx-form")) {
              e = t;
              break
            }
            t = t.parentNode
          }
          return e
        },
        getHexColor: function(e) {
          if (!e) return "#000000";
          if (e.indexOf("#") >= 0) return e;
          try {
            var t = e.match(/\d+/g),
              n = [];
            if (t.map(function(e, t) {
                if (t < 3) {
                  var i = parseInt(e).toString(16);
                  i = i.length > 1 ? i : "0" + i, n.push(i)
                }
              }), t.length > 3) {
              var i = parseFloat(t.slice(3).join("."));
              0 == i ? n.push("00") : i >= 1 ? n.push("ff") : (i = parseInt(255 * i).toString(16), i = i.length > 1 ? i : "0" + i, n.push(i))
            }
            return "#" + n.join("")
          } catch (e) {
            return "#000000"
          }
        },
        getComputedStyle: function() {
          var e = window.getComputedStyle(this.$$),
            t = this.$$.getBoundingClientRect(),
            n = ["Left", "Right"].map(function(t) {
              return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
            }),
            i = ["Top", "Bottom"].map(function(t) {
              return parseFloat(e["border" + t + "Width"]) + parseFloat(e["padding" + t])
            }),
            r = parseInt(e.fontWeight);
          isNaN(r) ? r = e.fontWeight : r < 500 ? r = "normal" : r >= 500 && (r = "bold");
          var o = 0,
            a = 0;
          try {
            o = parseFloat(e.minHeight.replace("px")), a = parseFloat(e.maxHeight.replace("px"))
          } catch (e) {}
          this.invalidHeight = i[0] + i[1], this.invalidWidth = n[0] + n[1], this._styleMaxHeight = a;
          var s = parseFloat(e.lineHeight),
            l = parseFloat(e.fontSize) || 14,
            c = Math.max(0, s - 1.2 * l),
            u = e.textAlign;
          "start" === u ? u = "left" : "end" === u ? u = "right" : -1 === ["left", "center", "right"].indexOf(u) && (u = "left");
          var d = 0;
          this.fixed && this._isiOS() && (window.scrollY < 0 ? d = window.scrollY : window.scrollY + window.innerHeight > document.documentElement.scrollHeight && (d = window.scrollY + window.innerHeight - document.documentElement.scrollHeight));
          var h = {
            width: t.width - this.invalidWidth,
            left: t.left + n[0] + window.scrollX,
            minHeight: o,
            maxHeight: a,
            top: this.fixed ? t.top + i[0] + d : t.top + i[0] + window.scrollY,
            fontWeight: r,
            fontSize: l,
            lineSpace: c,
            textAlign: u,
            color: this.getHexColor(e.color),
            marginBottom: this.cursorSpacing || parseFloat(e.marginBottom)
          };
          return this.autoHeight || (h.height = t.height - this.invalidHeight), h
        },
        getPlaceholderStyle: function() {
          var e = this.$.placeholder,
            t = window.getComputedStyle(e),
            n = parseInt(t.fontWeight);
          return isNaN(n) ? n = t.fontWeight : n < 500 ? n = "normal" : n >= 500 && (n = "bold"), this.placeholderStyle && this.placeholderStyle.split(";"), {
            fontSize: parseFloat(t.fontSize) || 16,
            fontWeight: n,
            color: this.getHexColor(t.color)
          }
        },
        checkMaxHeight: function() {
          if (this.autoHeight && this._lineHeight && this._lineHeight > this._styleMaxHeight) {
            this.$$.style.maxHeight = this._lineHeight + "px";
            var e = this.getCurrrentArgs();
            e.style.maxHeight = this._lineHeight, this.updateTextArea(e)
          }
        },
        insertTextArea: function() {
          var e = this;
          this.args = this.getCurrrentArgs(), this.args.value = this.value, WeixinJSBridge.invoke("insertTextArea", this.args, function(t) {
            if (/:ok/.test(t.errMsg)) {
              if (e._ready(), e._inputId = t.inputId || e._inputId, e._detached && e.removeTextArea(), e.checkAutoFocus(), e._isiOS() && (e.triggerEvent("linechange", {
                  lineCount: t.lineCount,
                  height: t.height,
                  heightRpx: t.height * e.__scale
                }), e.styleHeight = t.height, e.autoHeight && (e._lineHeight = t.height / (t.lineCount || 1), e.checkMaxHeight(), e.$$.style.height = e.styleHeight + "px", document.dispatchEvent(new CustomEvent("pageReRender", {})))), e._needUpdate) {
                var n = e.getCurrrentArgs();
                n.value = e.value, e.updateTextArea(n), e._needUpdate = !1
              }
            } else console.error(t.errMsg)
          })
        },
        diff: function(e, t) {
          var n = {},
            i = !1;
          for (var r in t) "[object Object]" === Object.prototype.toString.call(t[r]) ? JSON.stringify(t[r]) != JSON.stringify(e[r]) && (n[r] = t[r], i = !0) : e[r] != t[r] && (n[r] = t[r], i = !0);
          return i ? n : void 0
        },
        reRenderCallback: function() {
          var e = this;
          window.requestAnimationFrame(function() {
            e.afterRerender()
          })
        },
        afterRerender: function() {
          if (!this._detached) {
            var e = this.getCurrrentArgs();
            this.updateTextArea(e);
            var t = e.style;
            this._keyboardShow && t && (0 === t.width || 0 === t.height) && wx.hideKeyboard()
          }
        },
        getCurrrentArgs: function() {
          return {
            inputId: this._inputId,
            parentId: this._parentId,
            style: this.getComputedStyle(),
            placeholderStyle: this.getPlaceholderStyle(),
            maxLength: this.maxlength,
            placeholder: this.placeholder,
            disabled: this.disabled,
            hidden: this.hidden,
            autoSize: this.autoHeight,
            confirm: this.showConfirmBar,
            data: this.formateEventTarget(),
            fixed: this.fixed
          }
        },
        updateTextArea: function(e) {
          var t = this;
          if (!this._isReady) return void(this._needUpdate = !0);
          this.autoHeight && this.styleHeight && (this.$$.style.height = this.styleHeight + "px");
          var n = this.diff(this.args, e);
          n && (n.inputId = this._inputId, WeixinJSBridge.invoke("updateTextArea", n, function(n) {
            if (/:ok/.test(n.errMsg))
              for (var i in e) t.args[i] = e[i]
          }))
        },
        hiddenChanged: function(e) {
          e && this._keyboardShow && wx.hideKeyboard()
        },
        _getPlaceholderStyle: function(e) {
          return e + ";display:none;"
        },
        _placeholderClassChange: function(e) {
          for (var t = e.split(/\s+/), n = this ? this.getClassPrefix() : "", i = [], r = 0; r < t.length; r++) t[r] && i.push(n + t[r]);
          this.setData({
            _prefixedPlaceholderClass: i.join(" ")
          })
        },
        defaultValueChange: function(e, t) {
          return this.maxlength > 0 && e.length > this.maxlength && (e = e.slice(0, this.maxlength)), this.args && (this.args.value = void 0), this.updateTextArea({
            value: e
          }), e
        },
        formateEventTarget: function() {
          var e = {
            bindinput: this.bindinput,
            target: {
              id: this.id,
              dataset: this.dataset,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            },
            setKeyboardValue: !0
          };
          return e.currentTarget = e.target, e.nodeId = this.getNodeId(), this.bindinput ? JSON.stringify(e) : ""
        }
      }
    })
  }(), window.exparser.registerElement({
    is: "wx-toast",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "mask",
        cl: {
          v: "wx-toast-mask"
        },
        st: {
          e: function(e, i, r) {
            return t(r, n, "_getMaskStyle", [e.mask])
          },
          b: [
            [null, "_getMaskStyle"],
            [null, "mask"]
          ]
        },
        a: [],
        c: []
      }, {
        t: 1,
        n: "div",
        cl: {
          v: "wx-toast"
        },
        a: [],
        c: [{
          t: 1,
          n: "i",
          cl: {
            e: function(e, t, n) {
              return "wx-toast-icon wx-icon-" + e.icon
            },
            b: [
              [null, "icon"]
            ]
          },
          a: [{
            n: "color",
            v: "#FFFFFF",
            o: "s"
          }, {
            n: "font-size",
            v: "55px",
            o: "s"
          }, {
            n: "display",
            v: "block",
            o: "s"
          }],
          c: []
        }, {
          t: 1,
          n: "p",
          cl: {
            v: "wx-toast-content"
          },
          a: [],
          c: [{
            t: 1,
            n: "slot",
            v: !0,
            sn: "",
            a: [],
            c: []
          }]
        }]
      }]
    },
    behaviors: ["wx-base", "wx-mask-behavior"],
    properties: {
      icon: {
        type: String,
        value: "success_no_circle",
        public: !0
      },
      hidden: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "hiddenChange"
      },
      duration: {
        type: Number,
        value: 1500,
        public: !0,
        observer: "durationChange"
      }
    },
    methods: {
      durationChange: function(e, t) {
        this.timer && (clearTimeout(this.timer), this.hiddenChange(this.hidden))
      },
      hiddenChange: function(e) {
        if (!e && 0 != this.duration) {
          var t = this;
          this.timer = setTimeout(function() {
            t.triggerEvent("change", {
              value: t.hidden
            })
          }, this.duration)
        }
      }
    }
  });
var _slicedToArray = function() {
    function e(e, t) {
      var n = [],
        i = !0,
        r = !1,
        o = void 0;
      try {
        for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
      } catch (e) {
        r = !0, o = e
      } finally {
        try {
          !i && s.return && s.return()
        } finally {
          if (r) throw o
        }
      }
      return n
    }
    return function(t, n) {
      if (Array.isArray(t)) return t;
      if (Symbol.iterator in Object(t)) return e(t, n);
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }
  }(),
  _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
    return typeof e
  } : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
  };
if ("ios" !== wx.getPlatform() && "android" !== wx.getPlatform()) {
  var HIDE_BAR_TIMEOUT = 5e3,
    __videoPlayerId__ = 1;
  window.exparser.registerElement({
    is: "wx-video",
    behaviors: ["wx-base", "wx-player"],
    options: {
      renderingMode: "full"
    },
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        cl: {
          v: "wx-video-container"
        },
        a: [],
        c: [{
          t: 1,
          n: "video",
          id: "player",
          a: [{
            n: "webkit-playsinline",
            v: ""
          }],
          c: []
        }, {
          t: 1,
          n: "block",
          v: !0,
          a: [{
            s: [],
            n: "if",
            d: function(e, t, n) {
              return !e.stopped && e.controls
            },
            b: [
              [null, "stopped"],
              [null, "controls"]
            ]
          }],
          c: [{
            t: 1,
            n: "div",
            id: "bar",
            cl: {
              v: "wx-video-bar full"
            },
            a: [{
              n: "bindtap",
              v: "handleTapBar"
            }],
            c: [{
              t: 1,
              n: "div",
              id: "controls",
              cl: {
                v: "wx-video-controls"
              },
              a: [],
              c: [{
                t: 1,
                n: "div",
                id: "controlButton",
                cl: {
                  e: function(e, t, n) {
                    return "wx-video-control-button " + (e.paused ? "play" : "pause")
                  },
                  b: [
                    [null, "paused"]
                  ]
                },
                a: [{
                  n: "bindtap",
                  v: "handleTapControlButton"
                }],
                c: []
              }, {
                t: 1,
                n: "block",
                v: !0,
                a: [{
                  s: [],
                  n: "if",
                  d: function(e, t, n) {
                    return !e.live
                  },
                  b: [
                    [null, "live"]
                  ]
                }],
                c: [{
                  t: 1,
                  n: "div",
                  cl: {
                    v: "wx-video-current-time"
                  },
                  a: [{
                    n: "parse-text-content",
                    v: ""
                  }],
                  c: [{
                    c: "",
                    e: function(e, t, n) {
                      return e._currentTime
                    },
                    b: [
                      [null, "_currentTime"]
                    ],
                    t: 3
                  }]
                }]
              }, {
                t: 1,
                n: "block",
                v: !0,
                a: [{
                  s: [],
                  n: "if",
                  d: function(e, t, n) {
                    return !e.live
                  },
                  b: [
                    [null, "live"]
                  ]
                }],
                c: [{
                  t: 1,
                  n: "div",
                  cl: {
                    v: "wx-video-progress-container"
                  },
                  a: [{
                    n: "bindtap",
                    v: "handleTapProgress"
                  }],
                  c: [{
                    t: 1,
                    n: "div",
                    id: "progress",
                    cl: {
                      v: "wx-video-progress"
                    },
                    a: [],
                    c: [{
                      t: 1,
                      n: "div",
                      id: "ball",
                      cl: {
                        v: "wx-video-ball"
                      },
                      st: {
                        e: function(e, t, n) {
                          return "left: " + e._progressLeft + "px;"
                        },
                        b: [
                          [null, "_progressLeft"]
                        ]
                      },
                      a: [{
                        n: "bindtouchstart",
                        v: "handleTouchStartBall"
                      }],
                      c: [{
                        t: 1,
                        n: "div",
                        cl: {
                          v: "wx-video-inner"
                        },
                        a: [],
                        c: []
                      }]
                    }]
                  }]
                }]
              }, {
                t: 1,
                n: "block",
                v: !0,
                a: [{
                  s: [],
                  n: "if",
                  d: function(e, t, n) {
                    return !e.live
                  },
                  b: [
                    [null, "live"]
                  ]
                }],
                c: [{
                  t: 1,
                  n: "div",
                  cl: {
                    v: "wx-video-duration"
                  },
                  a: [{
                    n: "parse-text-content",
                    v: ""
                  }],
                  c: [{
                    c: "",
                    e: function(e, t, n) {
                      return e._duration
                    },
                    b: [
                      [null, "_duration"]
                    ],
                    t: 3
                  }]
                }]
              }, {
                t: 1,
                n: "block",
                v: !0,
                a: [{
                  s: [],
                  n: "if",
                  d: function(e, t, n) {
                    return e.live
                  },
                  b: [
                    [null, "live"]
                  ]
                }],
                c: [{
                  t: 1,
                  n: "div",
                  cl: {
                    v: "wx-video-live-button"
                  },
                  a: [],
                  c: [{
                    c: "直播",
                    t: 3
                  }]
                }]
              }]
            }, {
              t: 1,
              n: "block",
              v: !0,
              a: [{
                s: [],
                n: "if",
                d: function(e, t, n) {
                  return e.danmuBtn
                },
                b: [
                  [null, "danmuBtn"]
                ]
              }],
              c: [{
                t: 1,
                n: "div",
                id: "danmuBtn",
                cl: {
                  e: function(e, t, n) {
                    return "wx-video-danmu-btn " + (e.enableDanmu ? "active" : "")
                  },
                  b: [
                    [null, "enableDanmu"]
                  ]
                },
                a: [{
                  n: "bindtap",
                  v: "handleTapDanmuButton"
                }],
                c: [{
                  c: "弹幕",
                  t: 3
                }]
              }]
            }, {
              t: 1,
              n: "div",
              id: "fullscreen",
              cl: {
                v: "wx-video-fullscreen"
              },
              a: [{
                n: "bindtap",
                v: "handleTapFullscreen"
              }],
              c: []
            }]
          }]
        }, {
          t: 1,
          n: "block",
          v: !0,
          a: [{
            s: [],
            n: "if",
            d: function(e, t, n) {
              return e.stopped
            },
            b: [
              [null, "stopped"]
            ]
          }],
          c: [{
            t: 1,
            n: "div",
            id: "cover",
            cl: {
              v: "wx-video-cover"
            },
            a: [],
            c: [{
              t: 1,
              n: "img",
              id: "coverPlayBtn",
              cl: {
                v: "wx-video-cover-play-button"
              },
              a: [{
                n: "src",
                v: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAWhJREFUSA1j+P///0cgBoHjQGzCQCsAtgJB/AMy5wCxGNXtQ9iBwvoA5BUCMQvVLEQxHpNzDSjkRhXLMM3GKrIeKKpEkYVYjcUu+AMo3ALE3GRZiN1MvKKPgbIRJFuG10j8koeA0gZEW4jfLIKyf4EqpgOxMEELCRpFnIJ3QGU5QMyM00LizCFa1SWgSkeslhFtBGkKVwGVy6FYSJp+klR/A6quB2JOkIWMIK0oNlOf8xBoZDE9LAI7nYn6HsBq4l96WHQEaLUpAyiOaASeAM2NgvuPBpaACt82IEYtfKls0UagecpwXyAzqGTRdaA57sjmYrAptAjUsCkGYlYMg9EFyLQI1IiZB8Ti6Obh5JNh0QmgHlOcBuKSIMGi50C18UDMiMssvOJEWPQLqKYbiHnxGkRIkoBF24DyaoTMIEoeh0W3geI+RBlArCI0iz4D+RVAzEasfqLVAQ19AcSg5LoYiKWI1kiiQgCMBLnEEcfDSgAAAABJRU5ErkJggg=="
              }, {
                n: "bindtap",
                v: "handleTapCoverPlayButton"
              }],
              c: []
            }, {
              t: 1,
              n: "block",
              v: !0,
              a: [{
                s: [],
                n: "if",
                d: function(e, t, n) {
                  return !e.live
                },
                b: [
                  [null, "live"]
                ]
              }],
              c: [{
                t: 1,
                n: "p",
                cl: {
                  v: "wx-video-cover-duration"
                },
                a: [],
                c: [{
                  c: "",
                  e: function(e, t, n) {
                    return e._duration
                  },
                  b: [
                    [null, "_duration"]
                  ],
                  t: 3
                }]
              }]
            }]
          }]
        }, {
          t: 1,
          n: "div",
          id: "danmu",
          cl: {
            v: "wx-video-danmu"
          },
          st: {
            v: "z-index: -9999"
          },
          a: [],
          c: []
        }]
      }, {
        t: 1,
        n: "div",
        st: {
          v: "position: absolute; top: 0; width: 100%; height: 100%; overflow: hidden; pointer-events: none;"
        },
        a: [],
        c: [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      }]
    },
    properties: {
      hidden: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "_hiddenChanged"
      },
      autoplay: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: function(e, t) {
          this.$.player.$$.autoplay = e
        }
      },
      danmuBtn: {
        type: Boolean,
        value: !1,
        public: !0
      },
      enableDanmu: {
        type: Boolean,
        value: !1,
        observer: "_enableDanmuChanged",
        public: !0
      },
      enableFullScreen: {
        type: Boolean,
        value: !1,
        public: !0
      },
      controls: {
        type: Boolean,
        value: !0,
        public: !0
      },
      danmuList: {
        type: Array,
        value: [],
        public: !0,
        observer: "_danmuListChanged"
      },
      objectFit: {
        type: String,
        value: "contain",
        public: !0,
        observer: "_objectFitChanged"
      },
      initialTime: {
        type: Number,
        value: 0,
        public: !0
      },
      duration: {
        type: Number,
        value: 0,
        public: !0,
        observer: "_durationChanged"
      },
      live: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "liveChanged"
      },
      muted: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: function(e, t) {
          this.$.player.$$.muted = e
        }
      },
      loop: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: function(e, t) {
          this.$.player.$$.loop = e
        }
      },
      playbackRate: {
        type: Number,
        value: 1,
        public: !0,
        observer: "playbackRateChanged"
      },
      _isLockTimeUpdateProgress: {
        type: Boolean,
        value: !1
      },
      _rate: {
        type: Number,
        value: 0
      },
      _progressLeft: {
        type: Number,
        value: -22
      },
      _progressLength: {
        type: Number,
        value: 0
      },
      _danmuStatus: {
        type: String,
        value: ""
      },
      _isBarShow: {
        type: Boolean,
        value: !0
      },
      _danmuObject: {
        type: Object,
        value: {}
      }
    },
    listeners: {
      tap: function() {
        this._isBarShow ? this._hideBar() : this._showBar()
      }
    },
    methods: {
      onPlay: function() {
        this.stopped = !1, this._showBar()
      },
      onPause: function() {
        this._showBar(), clearTimeout(this._hideBarTimer)
      },
      onTimeUpdate: function() {
        var e = this,
          t = this.$.player.$$.currentTime / this.$.player.$$.duration;
        this._isLockTimeUpdateProgress || this._setProgress(t);
        var n = this._danmuObject[parseInt(this.$.player.$$.currentTime)];
        void 0 !== n && n.length > 0 && n.forEach(function(t) {
          e._sendDanmu(t)
        })
      },
      onEnded: function() {
        this.stopped = !0
      },
      _srcChanged: function(e, t) {
        if (this._resetDanmu(), "wechatdevtools" === wx.getPlatform() ? this.$.player.$$.src = e.replace("wxfile://", "http://wxfile.open.weixin.qq.com/") : this.$.player.$$.src = e, this.live || this._seek(this.initialTime), "wechatdevtools" === wx.getPlatform() && !0 === this.live && "undefined" != typeof Hls) {
          var n = new Hls;
          n.loadSource(e), n.attachMedia(this.$.player.$$)
        }
      },
      _posterChanged: function(e, t) {
        this.$.player.$$.poster = e
      },
      _objectFitChanged: function(e, t) {
        this.$.player.$$.style.objectFit = e
      },
      _durationChanged: function(e, t) {
        e > 0 && (this._duration = this._formatTime(Math.floor(e)))
      },
      _hiddenChanged: function(e, t) {
        this.$.player.$$.pause()
      },
      _danmuListChanged: function(e, t) {
        this._danmuObject = e.reduce(function(e, t) {
          return "number" == typeof t.time && t.time >= 0 && "string" == typeof t.text && t.text.length > 0 && (e[t.time] ? e[t.time].push({
            text: t.text,
            color: t.color || "#ffffff"
          }) : e[t.time] = [{
            text: t.text,
            color: t.color || "#ffffff"
          }]), e
        }, {})
      },
      _enableDanmuChanged: function(e, t) {
        this._danmuStatus = e ? "active" : "", this.$.danmu.$$.style.zIndex = e ? "0" : "-9999"
      },
      _mutedChanged: function(e, t) {},
      _seek: function(e) {
        var t = this,
          n = function n() {
            t.$.player.$$.duration !== 1 / 0 && !0 !== t.live && (t.$.player.$$.currentTime = e, t._resetDanmu(), t.$.player.$$.removeEventListener("canplay", n, !1))
          };
        0 === this.$.player.$$.readyState || 1 === this.$.player.$$.readyState ? this.$.player.$$.addEventListener("canplay", n, !1) : n()
      },
      actionChanged: function(e, t) {
        var n = this;
        if ("object" === (void 0 === e ? "undefined" : _typeof(e))) {
          var i = e.method,
            r = e.data;
          if ("play" === i) this.$.player.$$.play();
          else if ("pause" === i) this.$.player.$$.pause();
          else if ("seek" === i) {
            var o = function e() {
              n.$.player.$$.duration !== 1 / 0 && !0 !== n.live && (n.$.player.$$.currentTime = r[0], n._resetDanmu(), n.$.player.$$.removeEventListener("canplay", e, !1))
            };
            0 === this.$.player.$$.readyState || 1 === this.$.player.$$.readyState ? this.$.player.$$.addEventListener("canplay", o, !1) : o()
          } else if ("sendDanmu" === i) {
            var a = _slicedToArray(r, 2),
              s = a[0],
              l = a[1],
              c = parseInt(this.$.player.$$.currentTime);
            this._danmuObject[c] ? this._danmuObject[c].push({
              text: s,
              color: l,
              time: c
            }) : this._danmuObject[c] = [{
              text: s,
              color: l,
              time: c
            }]
          } else "playbackRate" === i && (this.$.player.$$.playbackRate = r[0])
        }
      },
      handleTapBar: function(e) {
        e.stopPropagation(), this._showBar()
      },
      handleTapCoverPlayButton: function(e) {
        this.$.player.$$.play()
      },
      handleTapControlButton: function(e) {
        this.paused ? this.$.player.$$.play() : this.$.player.$$.pause()
      },
      handleTapFullscreen: function(e) {
        "android" === wx.getPlatform() ? this.enableFullScreen = !0 : this.enableFullScreen = !this.enableFullScreen, this.enableFullScreen && this.$.player.$$.webkitEnterFullscreen(), this.triggerEvent("togglefullscreen", {
          enable: this.enableFullScreen
        })
      },
      handleTapProgress: function(e) {
        var t = this,
          n = function n() {
            var i = t._computeRate(e.touches[0].clientX),
              r = t.$.player.$$.duration * i;
            !isNaN(parseFloat(r)) && isFinite(r) && (t.$.player.$$.currentTime = r), t._resetDanmu(), t.$.player.$$.removeEventListener("canplay", n, !1)
          };
        0 === this.$.player.$$.readyState || 1 === this.$.player.$$.readyState ? this.$.player.$$.addEventListener("canplay", n, !1) : n()
      },
      handleTapDanmuButton: function(e) {
        e.stopPropagation(), this.enableDanmu = !this.enableDanmu, this.triggerEvent("toggledanmu", {
          enable: this.enableDanmu
        })
      },
      handleTouchStartBall: function(e) {
        var t = this;
        this._isLockTimeUpdateProgress = !0;
        var n = function(e) {
            e.preventDefault(), t._showBar(), t._rate = t._computeRate(e.touches[0].clientX), t._currentTime = t._formatTime(Math.floor(t.$.player.$$.duration * t._rate)), t._setProgress(t._rate)
          },
          i = function e(i) {
            var r = t.$.player.$$.duration * t._rate;
            !isNaN(parseFloat(r)) && isFinite(r) && (t.$.player.$$.currentTime = r), document.removeEventListener("touchmove", n), document.removeEventListener("touchend", e), t._isLockTimeUpdateProgress = !1, t._resetDanmu()
          };
        document.addEventListener("touchmove", n), document.addEventListener("touchend", i)
      },
      _reset: function() {},
      _computeRate: function(e) {
        var t = this.$.progress.$$.getBoundingClientRect().left,
          n = this.$.progress.$$.offsetWidth,
          i = (e - t) / n;
        return i < 0 ? i = 0 : i > 1 && (i = 1), i
      },
      _setProgress: function(e) {
        this.live || this.$.progress && (this._progressLength = Math.floor(this.$.progress.$$.offsetWidth * e), this._progressLeft = this._progressLength - 22)
      },
      _showBar: function() {
        var e = this;
        this.$.bar && (this._isBarShow = !0, this.$.bar.$$.style.transition = "", this.$.bar.$$.style.webkitTransition = "", this.$.bar.$$.style.opacity = "1", this.$.bar.$$.style.display = "", clearTimeout(this._hideBarTimer), this._hideBarTimer = setTimeout(function() {
          e._hideBar(!0)
        }, HIDE_BAR_TIMEOUT))
      },
      _hideBar: function() {
        var e = this,
          t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        this._isBarShow = !1, this.$.bar && (t ? (this.$.bar.$$.style.transition = "400ms", this.$.bar.$$.style.webkitTransition = "400ms", this.$.bar.$$.style.opacity = "0", setTimeout(function() {
          e.$.bar && (e.$.bar.$$.style.display = "none")
        }, 400)) : this.$.bar.$$.style.display = "none")
      },
      _sendDanmu: function(e) {
        if (!this.$.player.$$.paused && !e.flag) {
          e.flag = !0;
          var t = document.createElement("p");
          t.className += "wx-video-danmu-item", t.textContent = e.text, t.style.top = this._genDanmuPosition() + "%", t.style.color = e.color, this.$.danmu.$$.appendChild(t), t.style.left = "-" + t.offsetWidth + "px"
        }
      },
      _resetDanmu: function() {
        var e = this;
        this.$.danmu && (this.$.danmu.$$.innerHTML = "", Object.keys(this._danmuObject).forEach(function(t) {
          e._danmuObject[t].forEach(function(e) {
            e.flag = !1
          })
        }))
      },
      _genDanmuPosition: function() {
        if (this._lastDanmuPosition) {
          var e = 100 * Math.random();
          Math.abs(e - this._lastDanmuPosition) < 10 ? this._lastDanmuPosition = (this._lastDanmuPosition + 50) % 100 : this._lastDanmuPosition = e
        } else this._lastDanmuPosition = 100 * Math.random();
        return this._lastDanmuPosition
      }
    },
    created: function() {},
    attached: function() {
      var e = this,
        t = this.getNodeId(),
        n = __videoPlayerId__++;
      wx.publish("videoPlayerInsert", {
        domId: this.id,
        videoPlayerId: n,
        nodeId: t
      }), this.$.player.$$.autoplay = this.autoplay;
      var i = "";
      "number" == typeof t && -1 !== t && (i = t), WeixinJSBridge.subscribe("video_" + this.id + "_" + n + "_" + i + "_actionChanged", function(t) {
        e.action = t, e.actionChanged(t)
      })
    },
    detached: function() {
      wx.publish("videoPlayerRemoved", {
        domId: this.id,
        videoPlayerId: this.videoPlayerId,
        nodeId: this.getNodeId()
      })
    }
  })
}! function() {
  "wechatdevtools" !== wx.getPlatform() && window.exparser.registerElement({
    is: "wx-video",
    behaviors: ["wx-base", "wx-player", "wx-native", "wx-positioning-target"],
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "div",
        id: "container",
        cl: {
          v: "wx-video-container"
        },
        a: [],
        c: [{
          t: 1,
          n: "div",
          id: "inner",
          st: {
            v: "width: 100%; height: 100%;"
          },
          a: [],
          c: []
        }]
      }, {
        t: 1,
        n: "div",
        id: "coverviewcontainer",
        st: {
          v: "position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden;"
        },
        a: [],
        c: [{
          t: 1,
          n: "slot",
          v: !0,
          sn: "",
          a: [],
          c: []
        }]
      }]
    },
    properties: {
      autoplay: {
        type: Boolean,
        value: !1,
        public: !0
      },
      bindplay: {
        type: String,
        value: "",
        public: !0
      },
      bindpause: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindended: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindtimeupdate: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindfullscreenchange: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      binderror: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindwaiting: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindloadeddata: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindloadedmetadata: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindloadstart: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindseeked: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      bindseeking: {
        type: String,
        value: "",
        public: !0,
        observer: "handlersChanged"
      },
      danmuBtn: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "danmuBtnChanged"
      },
      enableDanmu: {
        type: Boolean,
        value: !1,
        observer: "enableDanmuChanged",
        public: !0
      },
      controls: {
        type: Boolean,
        value: !0,
        public: !0,
        observer: "controlsChanged"
      },
      danmuList: {
        type: Array,
        value: [],
        public: !0,
        observer: "_danmuListChanged"
      },
      objectFit: {
        type: String,
        value: "contain",
        public: !0
      },
      initialTime: {
        type: Number,
        value: 0,
        public: !0
      },
      duration: {
        type: Number,
        value: 0,
        public: !0
      },
      live: {
        type: Number,
        value: !1,
        public: !0,
        observer: "liveChanged"
      },
      muted: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "mutedChanged"
      },
      loop: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "loopChanged"
      },
      pageGesture: {
        type: Boolean,
        value: !1,
        public: !0,
        observer: "pageGestureChanged"
      },
      direction: {
        type: Number,
        value: -1,
        public: !0,
        observer: "directionChanged"
      },
      _videoId: {
        type: Number
      },
      _insert2WebLayer: {
        type: Boolean,
        value: !1
      },
      customCache: {
        type: Boolean,
        value: !0,
        public: !0
      },
      showLiveBtn: {
        type: Boolean,
        value: !0,
        public: !0,
        observer: "showLiveBtnChanged"
      },
      showProgress: {
        type: Boolean,
        value: !0,
        public: !0,
        filter: "showProgressChanged"
      },
      showFullscreenBtn: {
        type: Boolean,
        value: !0,
        public: !0,
        observer: "showFullscreenBtnChanged"
      },
      showPlayBtn: {
        type: Boolean,
        value: !0,
        public: !0,
        observer: "showPlayBtnChanged"
      },
      showCenterPlayBtn: {
        type: Boolean,
        value: !0,
        public: !0,
        observer: "showCenterPlayBtnChanged"
      },
      enableProgressGesture: {
        type: Boolean,
        value: !0,
        public: !0,
        observer: "enableProgressGestureChanged"
      }
    },
    created: function() {
      this._needAdjust = !0, this.createdTimestamp = Date.now()
    },
    attached: function() {
      this.__pageReRenderCallback = this._pageReRenderCallback.bind(this), this._attachedCb()
    },
    detached: function() {
      this._detachedCb()
    },
    methods: {
      handlersChanged: function() {
        this._update()
      },
      _update: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if (this._videoId) {
          var t = this;
          e.videoPlayerId = this._videoId, e.hide = this.hidden;
          var n = this._getData();
          e.needEvent = Object.keys(n.handlers).length > 0, e.objectFit = this.objectFit, e.autoplay = this.autoplay, e.showBasicControls = this.controls, e.showDanmuBtn = this.danmuBtn, e.enableDanmu = this.enableDanmu, e.data = JSON.stringify(n), e.live = this.live, e.muted = this.muted, e.loop = this.loop, e.pageGesture = this.pageGesture, e.danmuList = this.danmuList, e.initialTime = this.initialTime, e.customCache = this.customCache, e.showProgress = this._needAdjust ? this._box.width > 240 : this.showProgress, e.showLiveBtn = this.showLiveBtn, e.showPlayBtn = this.showPlayBtn, e.showCenterPlayBtn = this.showCenterPlayBtn, e.showFullScreenBtn = this.showFullscreenBtn, e.enableProgressGesture = this.enableProgressGesture, this.duration > 0 && (e.duration = this.duration), this.updateNativeView("updateVideoPlayer", e, function(e) {
            /ok/.test(e.errMsg) || t._publish("error", {
              errMsg: e.errMsg
            })
          })
        }
      },
      _hiddenChanged: function(e, t) {
        this.$$.style.display = e ? "none" : "", this._update({
          hide: e
        }, e ? "隐藏" : "显示")
      },
      _posterChanged: function(e, t) {
        if (!this._isError) return this._isReady ? void((/http:\/\//.test(e) || /https:\/\//.test(e)) && this._update({
          poster: e
        }, "封面")) : void this._deferred.push({
          callback: "_posterChanged",
          args: [e, t]
        })
      },
      _srcChanged: function(e, t) {
        if (!this._isError && e) return this._isReady ? void(/wxfile:\/\//.test(e) || /http:\/\//.test(e) || /https:\/\//.test(e) ? this._update({
          filePath: e
        }, "资源") : this._publish("error", {
          errMsg: "MEDIA_ERR_SRC_NOT_SUPPORTED"
        })) : void this._deferred.push({
          callback: "_srcChanged",
          args: [e, t]
        })
      },
      controlsChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "controlsChanged",
          args: [e, t]
        });
        this._update({})
      },
      danmuBtnChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "danmuBtnChanged",
          args: [e, t]
        });
        this._update({})
      },
      enableDanmuChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "enableDanmuChanged",
          args: [e, t]
        });
        this._update({})
      },
      mutedChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "mutedChanged",
          args: [e, t]
        });
        this._update({})
      },
      loopChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "loopChanged",
          args: [e, t]
        });
        this._update({})
      },
      pageGestureChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "pageGestureChanged",
          args: [e, t]
        });
        this._update({})
      },
      directionChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "directionChanged",
          args: [e, t]
        });
        var n = {};
        [0, 90, -90].indexOf(e) > -1 && (n.direction = e), this._update(n)
      },
      _danmuListChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "_danmuListChanged",
          args: [e, t]
        });
        this._update({})
      },
      showProgressChanged: function(e) {
        this._needAdjust = !1, this._update({})
      },
      showLiveBtnChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "showLiveBtnChanged",
          args: [e, t]
        });
        this._update({})
      },
      showFullscreenBtnChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "showFullscreenBtnChanged",
          args: [e, t]
        });
        this._update({})
      },
      showPlayBtnChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "showPlayBtnChanged",
          args: [e, t]
        });
        this._update({})
      },
      showCenterPlayBtnChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "showCenterPlayBtnChanged",
          args: [e, t]
        });
        this._update({})
      },
      enableProgressGestureChanged: function(e, t) {
        if (!this._isReady) return void this._deferred.push({
          callback: "enableProgressGestureChanged",
          args: [e, t]
        });
        this._update({})
      },
      _attachedCb: function() {
        var e = this;
        this._videoId = this.getPositioningId();
        var t = this.fetchPositioningParentId(),
          n = this._getData();
        this._box = this._getBox();
        var i = {
          data: JSON.stringify(n),
          needEvent: Object.keys(n.handlers).length > 0,
          position: this._box,
          hide: this.hidden,
          enableDanmu: this.enableDanmu,
          showDanmuBtn: this.danmuBtn,
          showBasicControls: this.controls,
          objectFit: this.objectFit,
          autoplay: this.autoplay,
          danmuList: this.danmuList,
          live: this.live,
          muted: this.muted,
          loop: this.loop,
          pageGesture: this.pageGesture,
          videoPlayerId: this._videoId,
          initialTime: this.initialTime,
          parentId: t,
          customCache: this.customCache,
          showProgress: this._needAdjust ? this._box.width > 200 : this.showProgress,
          showLiveBtn: this.showLiveBtn,
          showPlayBtn: this.showPlayBtn,
          showCenterPlayBtn: this.showCenterPlayBtn,
          showFullScreenBtn: this.showFullscreenBtn,
          enableProgressGesture: this.enableProgressGesture
        };
        this.duration > 0 && (i.duration = this.duration), [0, 90, -90].indexOf(this.direction) > -1 && (i.direction = this.direction), this.insertNativeView("insertVideoPlayer", i, function(t) {
          /ok/.test(t.errMsg) ? (e._ready(), e.findCoverView(t.containerId || e._videoId), document.addEventListener("pageReRender", e.__pageReRenderCallback), wx.publish("videoPlayerInsert", {
            domId: e.id,
            videoPlayerId: e._videoId,
            nodeId: e.getNodeId()
          }), this._detached && this.removeNativeView("removeVideoPlayer", {
            videoPlayerId: e._videoId
          })) : (e._isError = !0, e.$$.style.display = "none", e._publish("error", {
            errMsg: t.errMsg
          }))
        })
      },
      _detachedCb: function() {
        var e = this;
        this._detached = !0, this.removeNativeView("removeVideoPlayer", {
          videoPlayerId: this._videoId
        }, function(t) {
          wx.publish("videoPlayerRemoved", {
            domId: e.id,
            videoPlayerId: e.videoPlayerId,
            nodeId: e.getNodeId()
          })
        }), document.removeEventListener("pageReRender", this.__pageReRenderCallback)
      },
      _getData: function() {
        var e = this;
        return {
          handlers: ["bindplay", "bindpause", "bindended", "bindtimeupdate", "bindfullscreenchange", "bindwaiting", "binderror", "bindloadstart", "bindloadedmetadata", "bindloadeddata", "bindseeked", "bindseeking"].reduce(function(t, n) {
            return n && (t[n] = e[n]), t
          }, {}),
          event: {
            target: {
              dataset: this.dataset,
              id: this.id,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            },
            currentTarget: {
              dataset: this.dataset,
              id: this.id,
              offsetTop: this.$$.offsetTop,
              offsetLeft: this.$$.offsetLeft
            }
          },
          createdTimestamp: this.createdTimestamp,
          nodeId: this.getNodeId()
        }
      },
      _canToggleFullscreen: function(e) {
        var t = this._videoId && e.videoPlayerId === this._videoId;
        return t && (e.fullScreen ? document.removeEventListener("pageReRender", this.__pageReRenderCallback) : document.addEventListener("pageReRender", this.__pageReRenderCallback)), t
      }
    }
  })
}(), window.exparser.registerElement({
    is: "wx-view",
    template: function(e, t, n) {
      return [{
        t: 1,
        n: "slot",
        v: !0,
        sn: "",
        a: [],
        c: []
      }]
    },
    behaviors: ["wx-base", "wx-hover"],
    properties: {
      inline: {
        type: Boolean,
        public: !0
      },
      hover: {
        type: Boolean,
        value: !1,
        public: !0
      },
      sessionFrom: {
        type: String,
        value: "wxapp",
        public: !0
      }
    }
  }),
  function() {
    var e = !1;
    window.exparser.registerElement({
      is: "wx-web-view",
      template: function(e, t, n) {
        return [{
          t: 1,
          n: "div",
          a: [],
          c: []
        }]
      },
      behaviors: ["wx-base", "wx-native", "wx-positioning-target"],
      properties: {
        src: {
          type: String,
          public: !0,
          observer: "srcChange"
        },
        bindmessage: {
          type: String,
          public: !0,
          value: ""
        }
      },
      methods: {
        srcChange: function(e, t) {
          if (this._isReady) {
            var n = this.uuid;
            WeixinJSBridge.invoke("updateHTMLWebView", {
              htmlId: n,
              src: (e || "").trim()
            }, function(e) {})
          } else this._deferred.push({
            callback: "srcChange",
            args: [e, t]
          })
        },
        _hiddenChanged: function(e, t) {}
      },
      created: function() {
        this.createdTimestamp = Date.now()
      },
      attached: function() {
        var t = this;
        if (e) return void console.error("一个页面只能插入一个 '<web-view />'。");
        this.uuid = this.getPositioningId();
        var n = this,
          i = this.uuid;
        wx.getSystemInfo({
          success: function(e) {
            n.$$.style.width = e.windowWidth + "px", n.$$.style.height = e.windowHeight + "px";
            var r = document.querySelector("body");
            r.style.height = e.windowHeight + "px", r.style.overflowY = "hidden", WeixinJSBridge.invoke("insertHTMLWebView", {
              htmlId: i,
              position: {
                left: 0,
                top: 0,
                width: e.windowWidth,
                height: e.windowHeight
              }
            }, function(e) {
              /ok/.test(e.errMsg) && (n._ready(), wx.publish("webViewInserted", {
                bindmessage: t.bindmessage,
                target: {
                  dataset: t.dataset,
                  id: t.id,
                  offsetTop: t.$$.offsetTop,
                  offsetLeft: t.$$.offsetLeft
                },
                createdTimestamp: t.createdTimestamp,
                nodeId: t.getNodeId()
              }))
            })
          }
        }), e = !0
      },
      detached: function() {
        var t = this.uuid;
        WeixinJSBridge.invoke("removeHTMLWebView", {
          htmlId: t
        }, function(t) {
          document.body.style.height = "", document.body.style.overflowY = "", e = !1
        }), wx.publish("webViewRemoved", {})
      }
    })
  }();
var __virtualDOM__ = function(e) {
  function t(i) {
    if (n[i]) return n[i].exports;
    var r = n[i] = {
      exports: {},
      id: i,
      loaded: !1
    };
    return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
  }
  var n = {};
  return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  var o = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    a = n(1),
    s = i(a),
    l = n(11),
    c = i(l),
    u = n(12),
    d = i(u),
    h = n(2),
    p = n(14),
    f = i(p),
    g = n(18),
    A = n(17),
    v = n(27);
  /wechatdevtools/.test(navigator.userAgent) && (0, A.setInDevtoolsWebView)(), (0, A.inDevtoolsWebview)() && (exparser.globalOptions.writeExtraInfoToAttr = !0), (0, A.initThread)(!1);
  var _ = function e(t) {
      if ((0, h.isString)(t) || Number(t) === t && Number(t) % 1 == 0) return new c.default(String(t));
      var n = [];
      return t.children.forEach(function(t) {
        n.push(e(t))
      }), new s.default(t.tag, t.attr, t.n, t.wxKey, t.wxVkey, t.wxXCkey, n)
    },
    w = function() {
      function e() {
        r(this, e)
      }
      return o(e, null, [{
        key: "createVirtualTree",
        value: function(e, t) {
          wx._checkDeviceWidth();
          var n = e(d.default.getAppData(), t);
          return n.tag = "body", _(n)
        }
      }, {
        key: "render",
        value: function(e) {
          return e.render()
        }
      }, {
        key: "diff",
        value: function(e, t) {
          return e.diff(t)
        }
      }, {
        key: "apply",
        value: function(e, t) {
          return e.apply(t)
        }
      }, {
        key: "getMergeDataFunc",
        value: function() {
          return d.default.mergeData
        }
      }, {
        key: "startInitRender",
        value: function() {
          this.customComponentMode = !0, f.default.instance.operationFlow.unblock()
        }
      }]), e
    }();
  w.customComponentMode = !1, w.getNodeById = g.getNodeById, w.getNodeId = g.getNodeId, w.scheduleIntersectionUpdate = v.scheduleIntersectionUpdate, w.addIntersectionObserver = v.addIntersectionObserver, w.removeIntersectionObserver = v.removeIntersectionObserver, e.exports = w
}, function(e, t, n) {
  "use strict";

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    o = n(2),
    a = n(3),
    s = n(6),
    l = n(11),
    c = function(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(l),
    u = (n(5), function() {
      function e(t, n, r, a, s, l, u) {
        i(this, e), this.tagName = t || "div", this.props = n || {}, this.children = u || [], this.newProps = r || [], this.wxVkey = s, this.wxXCkey = l, (0, o.isUndefined)(a) || (0, o.isNull)(a) ? this.wxKey = void 0 : this.wxKey = String(a), this.descendants = 0;
        for (var d = 0; d < this.children.length; ++d) {
          var h = this.children[d];
          (0, o.isVirtualNode)(h) ? this.descendants += h.descendants: (0, o.isString)(h) ? this.children[d] = new c.default(h) : (0, o.isVirtualText)(h) || console.log("invalid child", t, n, u, h), ++this.descendants
        }
      }
      return r(e, [{
        key: "render",
        value: function() {
          var e = null;
          if ("virtual" !== this.tagName) e = exparser.createElement(this.tagName);
          else {
            var t = "virtual";
            1 === this.wxXCkey || 3 === this.wxXCkey ? t = "wx:if" : 2 !== this.wxXCkey && 4 !== this.wxXCkey || (t = "wx:for"), e = exparser.VirtualNode.create(t)
          }
          return (0, a.applyProperties)(e, this.props), this.children.forEach(function(t) {
            var n = t.render();
            e.appendChild(n)
          }), e
        }
      }, {
        key: "diff",
        value: function(e) {
          return (0, s.diff)(this, e)
        }
      }]), e
    }());
  u.prototype.type = "WxVirtualNode", t.default = u
}, function(e, t) {
  (function(e) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0
    });
    var n = Object.assign || function(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var i in n) Object.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i])
        }
        return e
      },
      i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      };
    t.isObject = function(e) {
      return "object" === (void 0 === e ? "undefined" : i(e)) && null !== e
    }, t.isEmptyObject = function(e) {
      for (var t in e) return !1;
      return !0
    }, t.isVirtualNode = function(e) {
      return e && "WxVirtualNode" === e.type
    }, t.isVirtualText = function(e) {
      return e && "WxVirtualText" === e.type
    }, t.isUndefined = function(e) {
      return "[object Undefined]" === Object.prototype.toString.call(e)
    }, t.isNull = function(e) {
      return "[object Null]" === Object.prototype.toString.call(e)
    }, t.isString = function(e) {
      return "[object String]" === Object.prototype.toString.call(e)
    }, t.isArray = function(e) {
      return Array.isArray ? Array.isArray(e) : "[object Array]" === Object.prototype.toString.call(e)
    }, t.getPrototype = function(e) {
      return Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__ ? e.__proto__ : e.constructor ? e.constructor.prototype : void 0
    }, t.getDataType = function(e) {
      return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
    }, t.getPageConfig = function() {
      var e = {};
      if (window.__wxConfig && window.__wxConfig.window) e = window.__wxConfig.window;
      else {
        var t = {};
        window.__wxConfig && window.__wxConfig.global && window.__wxConfig.global.window && (t = window.__wxConfig.global.window);
        var i = {};
        window.__wxConfig && window.__wxConfig.page && window.__wxConfig.page[window.__route__] && window.__wxConfig.page[window.__route__].window && (i = window.__wxConfig.page[window.__route__].window), e = n({}, t, i)
      }
      return e
    }, t.getWxmlVersionTag = function(t) {
      var n = ("undefined" == typeof window ? e : window).__wxml_version_info__;
      if (n) return n[t]
    }, t.guid = function() {
      return Math.floor(4294967296 * (1 + Math.random())).toString(16).slice(1)
    }
  }).call(t, function() {
    return this
  }())
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.removeProperty = t.applyProperties = void 0;
  var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    r = n(4),
    o = n(5),
    a = /^data-/,
    s = wx.transformRpx,
    l = function(e) {
      return {
        id: e.id,
        offsetLeft: e.$$.offsetLeft,
        offsetTop: e.$$.offsetTop,
        dataset: e.dataset
      }
    },
    c = function(e) {
      if (e) {
        for (var t = [], n = 0; n < e.length; n++) {
          var i = e[n];
          t.push({
            identifier: i.identifier,
            pageX: i.pageX,
            pageY: i.pageY,
            clientX: i.clientX,
            clientY: i.clientY
          })
        }
        return t
      }
    },
    u = function(e, t, n, i, r) {
      var o = r ? "__wxEventCaptureHandleName" : "__wxEventHandleName";
      e[o] || (e[o] = Object.create(null)), void 0 === e[o][t] && e.addListener(t, function(n) {
        if (e[o][t]) return n._hasListeners = !0, window.wx.publishPageEvent(e[o][t], {
          type: n.type,
          timeStamp: n.timeStamp,
          target: l(n.target),
          currentTarget: l(this),
          detail: n.detail,
          touches: c(n.touches),
          changedTouches: c(n.changedTouches)
        }), !i && void 0
      }, {
        capture: r
      }), e[o][t] = n
    },
    d = (t.applyProperties = function(e, t) {
      e.dataset = e.dataset || {};
      for (var n in t) {
        var l = t[n],
          c = null,
          h = exparser.Component.hasProperty(e, n);
        if (a.test(n)) {
          var p = (0, r.dashToCamelCase)(n.substring(5).toLowerCase());
          e.dataset[p] = l, e.$$.setAttribute(n, l)
        } else "id" === n ? (e.$$.id = void 0 == l ? "" : l, e.id = void 0 == l ? "" : l) : "class" === n ? e.class = void 0 == l ? "" : l : void 0 === l ? d(e, n) : h ? -1 !== o.INLINE_STYLE.indexOf(n) ? e[n] = s(l, !0) : e[n] = l : (c = n.match(/^(capture-)?(bind|catch):?(.+)$/)) ? u(e, c[3], l, "catch" === c[2], c[1]) : "on" === n.slice(0, 2) ? u(e, n.slice(2), l, !1, !1) : "style" === n ? function() {
          var t = e.animationStyle || {},
            i = t.transition,
            r = t.transform,
            o = t.transitionProperty,
            a = t.transformOrigin,
            c = {
              transition: i,
              transform: r,
              transitionProperty: o,
              transformOrigin: a
            };
          c["-webkit-transition"] = c.transition, c["-webkit-transform"] = c.transform, c["-webkit-transition-property"] = c.transitionProperty, c["-webkit-transform-origin"] = c.transformOrigin, e.$$.setAttribute(n, s(l, !0) + Object.keys(c).filter(function(e) {
            return !(/transform|transition/i.test(e) && "" === c[e] || "" === e.trim() || void 0 === c[e] || "" === c[e] || !isNaN(parseInt(e)))
          }).map(function(e) {
            return e.replace(/([A-Z]{1})/g, function(e) {
              return "-" + e.toLowerCase()
            }) + ":" + c[e]
          }).join(";"))
        }() : "animation" === n && null !== l && "object" === (void 0 === l ? "undefined" : i(l)) && l.actions && l.actions.length > 0 && function() {
          var t = function() {
              if (n < r) {
                var t = wx.animationToStyle(i[n]),
                  o = t.transition,
                  a = t.transitionProperty,
                  l = t.transform,
                  c = t.transformOrigin,
                  u = t.style;
                e.$$.style.transition = o, e.$$.style.transitionProperty = a, e.$$.style.transform = l, e.$$.style.transformOrigin = c, e.$$.style.webkitTransition = o, e.$$.style.webkitTransitionProperty = a, e.$$.style.webkitTransform = l, e.$$.style.webkitTransformOrigin = c;
                for (var d in u) e.$$.style[d] = s(" " + u[d], !0);
                e.animationStyle = {
                  transition: o,
                  transform: l,
                  transitionProperty: a,
                  transformOrigin: c
                }
              }
            },
            n = 0,
            i = l.actions,
            r = l.actions.length;
          e.addListener("transitionend", function() {
            n += 1, t()
          }), t()
        }()
      }
    }, t.removeProperty = function(e, t) {
      exparser.Component.hasProperty(e, t) ? e[t] = void 0 : "bind" === t.slice(0, 4) ? u(e, t.slice(4), "") : "catch" === t.slice(0, 5) ? u(e, t.slice(5), "", !0) : "on" === t.slice(0, 2) ? u(e, t.slice(2), "") : "style" === t && e.$$.removeAttribute(t)
    })
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var n = {},
    i = {
      dashToCamel: /-[a-z]/g,
      camelToDash: /([A-Z])/g
    };
  t.dashToCamelCase = function(e) {
    return n[e] ? n[e] : n[e] = e.indexOf("-") <= 0 ? e : e.replace(i.dashToCamel, function(e) {
      return e[1].toUpperCase()
    })
  }, t.camelToDashCase = function(e) {
    return n[e] || (n[e] = e.replace(i.camelToDash, "-$1").toLowerCase())
  }
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  t.PATCH_TYPE = {
    NONE: 0,
    TEXT: 1,
    VNODE: 2,
    PROPS: 3,
    REORDER: 4,
    INSERT: 5,
    REMOVE: 6
  }, t.WX_KEY = "wxKey", t.RPX_RATE = 20, t.BASE_DEVICE_WIDTH = 750, t.INLINE_STYLE = ["placeholderStyle", "hoverStyle", "style"], t.SYNC_EVENT_NAME = {
    WX_EVENT: 11,
    COMPONENT_DEF: 21,
    LAYOUT_READY: 31,
    FLOW_DEPTH: 2,
    FLOW_INITIAL_CREATION: 3,
    FLOW_UPDATE: 6,
    FLOW_APPLY_PROPERTY: 4,
    FLOW_MINIPULATE_CHILD: 7,
    FLOW_CREATE_NODE: 5,
    FLOW_REPEAT: 9
  }
}, function(e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.appendPatch = t.diffProps = t.diffChildren = t.diffNode = t.diff = void 0;
  var r = n(7),
    o = i(r),
    a = n(8),
    s = i(a),
    l = n(2),
    c = n(10),
    u = n(5),
    d = (t.diff = function(e, t) {
      var n = {};
      return d(e, t, n, 0), new s.default(e, n)
    }, t.diffNode = function(e, t, n, i) {
      if (e !== t) {
        var r = n[i];
        if (null == t) r = f(r, new o.default(u.PATCH_TYPE.REMOVE, e));
        else if ((0, l.isVirtualNode)(t))
          if ((0, l.isVirtualNode)(e))
            if (e.tagName === t.tagName && e.wxKey === t.wxKey)
              if ("virtual" === e.tagName && e.wxVkey !== t.wxVkey) r = f(r, new o.default(u.PATCH_TYPE.VNODE, e, t));
              else {
                var a = p(t.props, t.newProps);
                a && (r = f(r, new o.default(u.PATCH_TYPE.PROPS, e, a))), r = h(e, t, n, r, i)
              }
        else r = f(r, new o.default(u.PATCH_TYPE.VNODE, e, t));
        else r = f(r, new o.default(u.PATCH_TYPE.VNODE, e, t));
        else {
          if (!(0, l.isVirtualText)(t)) throw console.log("unknow node type", e, t), {
            message: "unknow node type",
            node: t
          };
          t.text !== e.text && (r = f(r, new o.default(u.PATCH_TYPE.TEXT, e, t)))
        }
        r && (n[i] = r)
      }
    }),
    h = t.diffChildren = function(e, t, n, i, r) {
      for (var a = e.children, s = (0, c.listDiff)(a, t.children), h = s.children, p = a.length > h.length ? a.length : h.length, g = 0; g < p; ++g) {
        var A = a[g],
          v = h[g];
        ++r, A ? d(A, v, n, r) : v && (i = f(i, new o.default(u.PATCH_TYPE.INSERT, A, v))), (0, l.isVirtualNode)(A) && (r += A.descendants)
      }
      return s.moves && (i = f(i, new o.default(u.PATCH_TYPE.REORDER, e, s.moves))), i
    },
    p = t.diffProps = function(e, t) {
      for (var n = {}, i = 0; i < t.length; i++) {
        var r = t[i];
        n[r] = e[r]
      }
      return (0, l.isEmptyObject)(n) ? void 0 : n
    },
    f = t.appendPatch = function(e, t) {
      return e ? (e.push(t), e) : [t]
    }
}, function(e, t, n) {
  "use strict";

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    o = n(3),
    a = n(5),
    s = function() {
      function e(t, n, r) {
        i(this, e), this.type = Number(t), this.vNode = n, this.patch = r
      }
      return r(e, [{
        key: "apply",
        value: function(t) {
          switch (this.type) {
            case a.PATCH_TYPE.TEXT:
              return e.stringPatch(t, this.patch);
            case a.PATCH_TYPE.VNODE:
              return e.vNodePatch(t, this.patch);
            case a.PATCH_TYPE.PROPS:
              return e.applyProperties(t, this.patch, this.vNode.props);
            case a.PATCH_TYPE.REORDER:
              return e.reorderChildren(t, this.patch);
            case a.PATCH_TYPE.INSERT:
              return e.insertNode(t, this.patch);
            case a.PATCH_TYPE.REMOVE:
              return e.removeNode(t);
            default:
              return t
          }
        }
      }], [{
        key: "stringPatch",
        value: function(e, t) {
          var n = e.parentNode,
            i = t.render();
          return n && i !== e && n.replaceChild(i, e), i
        }
      }, {
        key: "vNodePatch",
        value: function(e, t) {
          var n = e.parentNode,
            i = t.render();
          return n && i !== e && n.replaceChild(i, e), i
        }
      }, {
        key: "applyProperties",
        value: function(e, t, n) {
          return (0, o.applyProperties)(e, t, n), e
        }
      }, {
        key: "reorderChildren",
        value: function(e, t) {
          var n = t.removes,
            i = t.inserts,
            r = e.childNodes,
            o = {};
          return n.forEach(function(t) {
            var n = r[t.index];
            t.key && (o[t.key] = n), e.removeChild(n)
          }), i.forEach(function(t) {
            var n = o[t.key];
            e.insertBefore(n, r[t.index])
          }), e
        }
      }, {
        key: "insertNode",
        value: function(e, t) {
          var n = t.render();
          return e && e.appendChild(n), e
        }
      }, {
        key: "removeNode",
        value: function(e) {
          var t = e.parentNode;
          return t && t.removeChild(e), null
        }
      }]), e
    }();
  t.default = s
}, function(e, t, n) {
  "use strict";

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    o = n(9),
    a = function() {
      function e(t, n) {
        i(this, e), this.oldTree = t, this.patches = n, this.patchIndexes = Object.keys(this.patches).map(function(e) {
          return Number(e)
        })
      }
      return r(e, [{
        key: "apply",
        value: function(e) {
          var t = this;
          if (0 === this.patchIndexes.length) return e;
          var n = (0, o.getDomIndex)(e, this.oldTree, this.patchIndexes);
          return this.patchIndexes.forEach(function(e) {
            var i = n[e];
            if (i) {
              t.patches[e].forEach(function(e) {
                e.apply(i)
              })
            }
          }), e
        }
      }]), e
    }();
  t.default = a
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var n = (t.getDomIndex = function(e, t, i) {
      if (i && 0 != i.length) {
        i = i.sort(function(e, t) {
          return e - t
        });
        var r = {};
        return n(e, t, i, r, 0), r
      }
      return {}
    }, t.mapIndexToDom = function e(t, n, r, o, a) {
      if (t) {
        i(r, a, a) && (o[a] = t);
        var s = n.children;
        if (s)
          for (var l = t.childNodes, c = 0; c < s.length; ++c) {
            var u = s[c];
            ++a;
            var d = a + (u.descendants || 0);
            i(r, a, d) && e(l[c], u, r, o, a), a = d
          }
      }
    }),
    i = t.oneOfIndexesInRange = function(e, t, n) {
      for (var i = 0, r = e.length - 1; i <= r;) {
        var o = r + i >> 1,
          a = e[o];
        if (a < t) i = o + 1;
        else {
          if (!(a > n)) return !0;
          r = o - 1
        }
      }
      return !1
    }
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getItemKey = t.makeKeyAndFreeIndexes = t.listDiff = void 0;
  var i = n(2),
    r = (t.listDiff = function(e, t) {
      function n(e, t, n) {
        return e.splice(t, 1), {
          index: t,
          key: n
        }
      }
      var a = r(e),
        s = a.keyIndexes;
      a.freeIndexes;
      if ((0, i.isEmptyObject)(s)) return {
        children: t,
        moves: null
      };
      var l = r(t),
        c = l.keyIndexes,
        u = l.freeIndexes;
      if ((0, i.isEmptyObject)(c)) return {
        children: t,
        moves: null
      };
      for (var d = [], h = 0, p = 0, f = 0; f < e.length; ++f) {
        var g = e[f],
          A = o(g);
        if (A)
          if (c.hasOwnProperty(A)) {
            var v = c[A];
            d.push(t[v])
          } else ++p, d.push(null);
        else if (h < u.length) {
          var _ = u[h];
          d.push(t[_]), ++h
        } else ++p, d.push(null)
      }
      for (var w = u[h] || t.length, m = 0; m < t.length; ++m) {
        var b = t[m];
        o(b) ? s.hasOwnProperty(o(b)) || d.push(b) : m >= w && d.push(b)
      }
      for (var y = d.slice(0), x = 0, C = [], S = [], E = 0; E < t.length;) {
        for (var I = t[E], k = o(I), P = y[x], T = o(P); null === P;) C.push(n(y, x, T)), P = y[x], T = o(P);
        T === k ? (++x, ++E) : k ? (T ? c[T] === E + 1 ? S.push({
          key: k,
          index: E
        }) : (C.push(n(y, x, T)), P = y[x], P && o(P) === k ? ++x : S.push({
          key: k,
          index: E
        })) : S.push({
          key: k,
          index: E
        }), ++E) : C.push(n(y, x, T))
      }
      for (; x < y.length;) {
        var D = y[x],
          B = o(D);
        C.push(n(y, x, B))
      }
      return C.length === p && 0 == S.length ? {
        children: d,
        moves: null
      } : {
        children: d,
        moves: {
          removes: C,
          inserts: S
        }
      }
    }, t.makeKeyAndFreeIndexes = function(e) {
      for (var t = {}, n = [], i = 0; i < e.length; ++i) {
        var r = e[i],
          s = o(r);
        s ? t.hasOwnProperty(s) ? (console.warn("For developer:Do not set same key {" + s + "} in wx:key."), a(r), n.push(i)) : t[s] = i : n.push(i)
      }
      return {
        keyIndexes: t,
        freeIndexes: n
      }
    }),
    o = t.getItemKey = function(e) {
      if (e) return e.wxKey
    },
    a = function(e) {
      e.wxKey = void 0
    }
}, function(e, t) {
  "use strict";

  function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    r = function() {
      function e(t) {
        n(this, e), this.text = String(t)
      }
      return i(e, [{
        key: "render",
        value: function(e) {
          return (e ? e.document || exparser : exparser).createTextNode(this.text)
        }
      }]), e
    }();
  r.prototype.type = "WxVirtualText", t.default = r
}, function(e, t, n) {
  "use strict";

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    o = n(13),
    a = {},
    s = function() {
      function e() {
        i(this, e)
      }
      return r(e, null, [{
        key: "getAppData",
        value: function() {
          return a
        }
      }, {
        key: "mergeData",
        value: function(e, t) {
          if (null === t) return e;
          var n = JSON.parse(JSON.stringify(e));
          for (var i in t) {
            var r = (0, o.parsePath)(i),
              a = (t[i], (0, o.getObjectByPath)(e, r, !1)),
              s = a.obj,
              l = a.key,
              c = (0, o.getObjectByPath)(n, r, !0),
              u = c.obj,
              d = c.key,
              h = c.changed;
            s && (s[l] = t[i]), u && (u[d] = h ? t[i] : {
              __value__: t[i],
              __wxspec__: !0
            })
          }
          return n
        }
      }]), e
    }();
  t.default = s
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.getObjectByPath = t.parsePath = void 0;
  var i = n(2);
  t.parsePath = function(e) {
    for (var t = e.length, n = [], i = "", r = 0, o = !1, a = !1, s = 0; s < t; s++) {
      var l = e[s];
      if ("\\" === l) s + 1 < t && ("." === e[s + 1] || "[" === e[s + 1] || "]" === e[s + 1]) ? (i += e[s + 1], s++) : i += "\\";
      else if ("." === l) i && (n.push(i), i = "");
      else if ("[" === l) {
        if (i && (n.push(i), i = ""), 0 === n.length) throw new Error("path can not start with []: " + e);
        a = !0, o = !1
      } else if ("]" === l) {
        if (!o) throw new Error("must have number in []: " + e);
        a = !1, n.push(r), r = 0
      } else if (a) {
        if (l < "0" || l > "9") throw new Error("only number 0-9 could inside []: " + e);
        o = !0, r = 10 * r + l.charCodeAt(0) - 48
      } else i += l
    }
    if (i && n.push(i), 0 === n.length) throw new Error("path can not be empty");
    return n
  }, t.getObjectByPath = function(e, t, n) {
    for (var r = void 0, o = void 0, a = e, s = !1, l = 0; l < t.length; l++) Number(t[l]) === t[l] && t[l] % 1 == 0 ? "Array" !== (0, i.getDataType)(a) && (n && !s ? (s = !0, r[o] = {
      __value__: [],
      __wxspec__: !0
    }, a = r[o].__value__) : (r[o] = [], a = r[o])) : "Object" !== (0, i.getDataType)(a) && (n && !s ? (s = !0, r[o] = {
      __value__: {},
      __wxspec__: !0
    }, a = r[o].__value__) : (r[o] = {}, a = r[o])), o = t[l], r = a, (a = a[t[l]]) && a.__wxspec__ && (a = a.__value__, s = !0);
    return {
      obj: r,
      key: o,
      changed: s
    }
  }
}, function(e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var o = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    a = n(15),
    s = i(a),
    l = n(16),
    c = i(l),
    u = {},
    d = function() {
      function e(t) {
        r(this, e), this.flowInited = !1, this.pendingReady = [], this.operationFlow = new c.default(t, this), this.nodeId = new s.default
      }
      return o(e, null, [{
        key: "create",
        value: function(t) {
          var n = new e(t);
          return n.viewId = t, u[t] = n, n
        }
      }, {
        key: "destroy",
        value: function(e) {
          delete u[e]
        }
      }, {
        key: "get",
        value: function(e) {
          return u[e]
        }
      }]), e
    }();
  t.default = d
}, function(e, t) {
  "use strict";

  function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    r = function() {
      function e() {
        n(this, e), this._idInc = 1, this._idNodeMap = {}
      }
      return i(e, [{
        key: "getNodeById",
        value: function(e) {
          return this._idNodeMap[e]
        }
      }, {
        key: "getNodeId",
        value: function(e) {
          return e.__wxTmplId
        }
      }, {
        key: "allocNodeId",
        value: function(e, t) {
          var n = t || this._idInc++;
          return e.__wxTmplId = n, this._idNodeMap[e.__wxTmplId] = e, n
        }
      }, {
        key: "addNode",
        value: function() {}
      }, {
        key: "removeNode",
        value: function(e) {
          if (e.__wxTmplId && delete this._idNodeMap[e.__wxTmplId], e.childNodes)
            for (var t = 0; t < e.childNodes.length; t++) this.removeNode(e.childNodes[t]);
          e.shadowRoot instanceof exparser.Element && this.removeNode(e.shadowRoot)
        }
      }]), e
    }();
  t.default = r
}, function(e, t, n) {
  "use strict";

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    o = n(5),
    a = n(17),
    s = function() {
      function e(t, n, r) {
        i(this, e), this._treeManager = t, this._arr = n, this._depth = 0, this._startCb = r
      }
      return r(e, [{
        key: "nextStep",
        value: function() {
          for (; this._arr[0][0] === o.SYNC_EVENT_NAME.FLOW_DEPTH;) this._startCb(this._treeManager);
          if (this._arr[0][0] === o.SYNC_EVENT_NAME.FLOW_REPEAT) {
            var e = this._arr[0][2];
            return --this._arr[0][1] || this._arr.shift(), [e]
          }
          return this._arr.shift()
        }
      }, {
        key: "expectStart",
        value: function() {
          var e = this._arr.shift();
          if (this._depth++, e[0] !== o.SYNC_EVENT_NAME.FLOW_DEPTH || e[1] !== this._depth) throw new Error("Expect START descriptor with depth " + this._depth + " but get another")
        }
      }, {
        key: "expectEnd",
        value: function() {
          for (; this._arr[0][0] === o.SYNC_EVENT_NAME.FLOW_DEPTH && this._arr[0][1] !== this._depth - 1;) this._startCb(this._treeManager);
          var e = this._arr.shift();
          if (this._depth--, e[0] !== o.SYNC_EVENT_NAME.FLOW_DEPTH || e[1] !== this._depth) throw new Error("Expect END descriptor with depth " + this._depth + " but get another")
        }
      }, {
        key: "getQueueLength",
        value: function() {
          return this._arr.length
        }
      }, {
        key: "getDepth",
        value: function() {
          return this._depth
        }
      }]), e
    }(),
    l = function() {
      function e(t, n) {
        var r = this;
        i(this, e), this._viewId = t, this._treeManager = n, this._depth = 0, this._curWinSize = 0, this._received = [], this._cache = [], this._blocked = [];
        var l = function(t, n) {
          if (r._received.push([n].concat(t)), n === o.SYNC_EVENT_NAME.FLOW_DEPTH && (r._depth = t[0], 0 === r._depth)) {
            var i = r._received;
            r._received = [], r._blocked ? r._blocked.push(i) : (r.iterator = new s(r._treeManager, i, e._startCb), e._startCb(r._treeManager), document.dispatchEvent(new CustomEvent("pageReRender", {})), (0, a.sendData)(o.SYNC_EVENT_NAME.LAYOUT_READY, []))
          }
        };
        for (var c in o.SYNC_EVENT_NAME) "FLOW_" === c.slice(0, 5) && (0, a.setDataListener)(o.SYNC_EVENT_NAME[c], l, t)
      }
      return r(e, [{
        key: "unblock",
        value: function() {
          if (this._blocked) {
            for (; this._blocked.length;) {
              var t = this._blocked.shift();
              this.iterator = new s(this._treeManager, t, e._startCb), e._startCb(this._treeManager), document.dispatchEvent(new CustomEvent("pageReRender", {})), (0, a.sendData)(o.SYNC_EVENT_NAME.LAYOUT_READY, [])
            }
            this._blocked = null
          }
        }
      }, {
        key: "start",
        value: function(e) {
          this.flush(), this._depth++, (0, a.queueSendingData)(o.SYNC_EVENT_NAME.FLOW_DEPTH, [this._depth, e], this._viewId)
        }
      }, {
        key: "dedupe",
        value: function() {
          var e = this._cache;
          if (this._curWinSize) {
            if (2 === e.length) {
              var t = e[1][2];
              if (e[0][0] !== t) {
                var n = e.pop(),
                  i = n.shift();
                (0, a.queueSendingData)(i, n, this._viewId)
              } else e.shift(), e[0][1]++
            }
          } else {
            var r = 0;
            if (e.length > 2 && e[0][0] === e[1][0] && e[0][0] === e[2][0] && (r = 1), r) {
              var s = e[0][0];
              e.splice(0, 3), this.flush(), this._curWinSize = 1, e.unshift([o.SYNC_EVENT_NAME.FLOW_REPEAT, 3, s])
            } else if (e.length > 3) {
              var l = e.pop(),
                c = l.shift();
              (0, a.queueSendingData)(c, l, this._viewId)
            }
          }
        }
      }, {
        key: "push",
        value: function(e) {
          this._cache.unshift(e), 1 !== e.length ? this.flush() : this.dedupe()
        }
      }, {
        key: "flush",
        value: function() {
          for (this._curWinSize = 0; this._cache.length;) {
            var e = this._cache.pop(),
              t = e.shift();
            (0, a.queueSendingData)(t, e, this._viewId)
          }
        }
      }, {
        key: "end",
        value: function() {
          this.flush(), this._depth--, (0, a.queueSendingData)(o.SYNC_EVENT_NAME.FLOW_DEPTH, this._depth, this._viewId), 0 === this._depth && (0, a.flushSendingData)()
        }
      }], [{
        key: "setStartOperation",
        value: function(t) {
          e._startCb = t
        }
      }]), e
    }();
  t.default = l
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var n = {},
    i = -1,
    r = null,
    o = !1,
    a = !1,
    s = (t.initThread = function(e) {
      o = !e
    }, t.isDataThread = function() {
      return !o
    }, t.inDevtoolsWebview = function() {
      return a
    }, t.setInDevtoolsWebView = function() {
      a = !0
    }, function(e, t, n) {
      void 0 !== WeixinJSBridge ? WeixinJSBridge.publish(e, t, n) : "undefined" != typeof document && document.addEventListener("WeixinJSBridgeReady", function() {
        WeixinJSBridge.publish(e, t, n)
      }, !1)
    }),
    l = function(e, t) {
      void 0 !== WeixinJSBridge ? WeixinJSBridge.subscribe(e, t) : "undefined" != typeof document && document.addEventListener("WeixinJSBridgeReady", function() {
        WeixinJSBridge.subscribe(e, t)
      }, !1)
    },
    c = null,
    u = null,
    d = (t.queueSendingData = function(e, t, n) {
      n !== u && d(), u = n, c ? c.push([e].concat(t)) : c = [
        [e].concat(t)
      ]
    }, t.flushSendingData = function() {
      c && s("vdSyncBatch", c, void 0 !== u ? [u] : void 0), c = null, u = null
    }),
    h = (t.sendData = function(e, t, n) {
      s("vdSync", [e].concat(t), void 0 !== n ? [n] : void 0)
    }, t.setDataListener = function(e, t, o) {
      if ("" === e) return r = t, void(i >= 0 && r(i));
      o = o || 0, n[o] || (n[o] = {}), n[o][e] = t
    }, t.removeDataListeners = function(e) {
      delete n[e]
    }, function(e, t) {
      var o = e.shift();
      if ("" === o) return i = t, void(r && r(t));
      if (t = t || 0, n[t]) {
        var a = n[t][o];
        a && a(e, o)
      }
    });
  l("vdSync", h), l("vdSyncBatch", function(e, t) {
    for (var n = 0; n < e.length; n++) h(e[n], t)
  })
}, function(e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function r() {}
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.removeView = t.attachView = t.addView = t.getNodeId = t.getNodeById = t.Page = t.Component = t.Behavior = void 0;
  var o = function() {
      function e(e, t) {
        var n = [],
          i = !0,
          r = !1,
          o = void 0;
        try {
          for (var a, s = e[Symbol.iterator](); !(i = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); i = !0);
        } catch (e) {
          r = !0, o = e
        } finally {
          try {
            !i && s.return && s.return()
          } finally {
            if (r) throw o
          }
        }
        return n
      }
      return function(t, n) {
        if (Array.isArray(t)) return t;
        if (Symbol.iterator in Object(t)) return e(t, n);
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
      }
    }(),
    a = n(5),
    s = n(17),
    l = n(19),
    c = n(14),
    u = i(c),
    d = n(16),
    h = i(d),
    p = {
      lazyRegistration: !0,
      publicProperties: !0
    },
    f = {
      domain: "/",
      lazyRegistration: !0,
      classPrefix: "",
      addGlobalClass: !1,
      templateEngine: l.Tmpl,
      renderingMode: "full",
      multipleSlots: !1,
      publicProperties: !0,
      reflectToAttributes: !1,
      writeFieldsToNode: !1,
      writeIdToDOM: !1
    },
    g = {
      domain: "/",
      lazyRegistration: !0,
      classPrefix: "",
      addGlobalClass: !1,
      renderingMode: "full",
      templateEngine: l.Tmpl,
      multipleSlots: !1,
      publicProperties: !0,
      reflectToAttributes: !1,
      writeFieldsToNode: !1,
      writeIdToDOM: !1
    },
    A = "undefined" != typeof WeakMap ? new WeakMap : {},
    v = {},
    _ = {},
    w = {},
    m = {},
    b = 1,
    y = Object.prototype.hasOwnProperty,
    x = function() {
      return Math.floor(4294967296 * (1 + Math.random())).toString(16).slice(1)
    },
    C = function(e) {
      for (var t = {}, n = {}, i = [], r = 0; r < e.length; r++) {
        var o = e[r],
          a = n[o] = o.split(/[^a-z0-9]+/i),
          s = a[a.length - 1];
        y.call(t, s) ? (t[s].push(o), i.push(s)) : t[s] = [o]
      }
      for (var l = 2; i.length; l++) {
        var c = i;
        i = [];
        for (var u = 0; u < c.length; u++) {
          var d = c[u];
          if (y.call(t, d)) {
            var h = t[d];
            delete t[d];
            for (var p = 0; p < h.length; p++) {
              var f = h[p],
                g = n[f],
                A = g.slice(-l).join("-");
              y.call(t, A) ? (t[A].push(f), A !== d && i.push(A)) : t[A] = [f]
            }
          }
        }
      }
      var v = {};
      for (var _ in t) {
        var w = t[_],
          m = Number(_[0]) >= 0 ? "x-" + _ : _;
        if (1 === w.length) v[w[0]] = m;
        else
          for (var b = 0; b < w.length; b++) v[w[b]] = m + "-" + b
      }
      return v
    },
    S = function(e, t) {
      0 === t.indexOf("/") && (e = "");
      var n = e.split("/");
      n.pop();
      for (var i = t.split("/"); i.length;) {
        var r = i.shift();
        "" !== r && "." !== r && (".." !== r ? n.push(r) : n.pop())
      }
      return n.join("/")
    },
    E = function(e) {
      var t = __wxAppCode__[e + ".json"] || {},
        n = {},
        i = t.usingComponents;
      for (var r in i) n[r] = S(e, i[r]);
      return n
    },
    I = function(e, t) {
      for (var n in t) {
        var i = t[n];
        i.target = null != i.target ? String(i.target) : S(e, String(n))
      }
    },
    k = function e(t, n, i) {
      if ("wx://" !== n.slice(0, 5)) {
        var r = _[n];
        if (!r) throw new Error('"' + n + '" is not a behavior registered by Behavior()');
        t[0].unshift(r), i[n] = !0;
        var o = m[r.is];
        if (o)
          for (var a = 0; a < o.length; a++) {
            var s = o[a];
            i[s] || e(t, s, i)
          }
      }
    },
    P = function e(t, n, i, r) {
      var o = v[n];
      if (!o) throw new Error('Component is not found in path "' + n + '"' + (r ? ' (using by "' + r + '")' : ""));
      t[1].unshift(o), i[n] = !0;
      var a = w[o.is];
      for (var s in a) {
        var l = a[s];
        i[l] || e(t, l, i, n)
      }
      var c = m[o.is];
      if (c)
        for (var u = 0; u < c.length; u++) {
          var d = c[u];
          i[d] || k(t, d, i)
        }
    },
    T = function(e, t) {
      var n = {};
      for (var i in e.properties) {
        var r = e.properties[i];
        null === r ? n[i] = {
          type: null
        } : r === Number || r === String || r === Boolean || r === Object || r === Array ? n[i] = {
          type: r.name
        } : (void 0 === r.public || r.public) && (n[i] = {
          type: null === r.type ? null : r.type.name,
          value: r.value
        })
      }
      return {
        is: e.is,
        using: e.using,
        behaviors: e.behaviors,
        data: e.data,
        properties: n,
        template: t,
        options: {
          multipleSlots: e.options.multipleSlots || void 0,
          writeIdToDOM: e.options.writeIdToDOM || void 0
        }
      }
    },
    D = function(e) {
      if (!e.behaviors) return void(e.behaviors = null);
      for (var t = [], n = 0; n < e.behaviors.length; n++) {
        var i = String(e.behaviors[n]);
        if ("/" !== i[0] && "wx://" !== i.slice(0, 5)) throw new Error("Behaviors should be constructed with Behavior()");
        t.push(i)
      }
      e.behaviors = t, m[e.is] = t
    },
    B = (t.Behavior = function(e) {
      return e.is = "/" + b++ + "/" + x(), D(e), e.options = p, _[e.is] = T(e), exparser.registerBehavior(e), e.is
    }, function(e) {
      return A.get(e)
    }),
    M = function(e, t, n) {
      var i = B(e).shadowRoot;
      if (n) {
        return i.querySelectorAll(t).map(function(e) {
          return exparser.Element.getMethodCaller(e)
        })
      }
      var r = i.querySelector(t);
      return r ? exparser.Element.getMethodCaller(r) : null
    },
    N = function(e, t) {
      var n = B(e),
        i = n.getRelationNodes(t);
      return null === i ? null : i.map(function(e) {
        return exparser.Element.getMethodCaller(e)
      })
    },
    R = r.prototype = Object.create(Object.prototype, {
      is: {
        get: function() {
          return B(this).is
        },
        set: function() {}
      },
      id: {
        get: function() {
          return B(this).id
        },
        set: function() {}
      },
      dataset: {
        get: function() {
          return B(this).dataset
        },
        set: function() {}
      },
      properties: {
        get: function() {
          return B(this).data
        },
        set: function() {}
      },
      data: {
        get: function() {
          return B(this).data
        },
        set: function() {}
      },
      setData: {
        value: function(e, t) {
          var n = this;
          return "function" == typeof t && setTimeout(function() {
            t.call(n)
          }, 0), B(this).setData(e)
        }
      },
      replaceDataOnPath: {
        value: function(e, t) {
          return B(this).replaceDataOnPath(e, t)
        }
      },
      mergeDataOnPath: {
        value: function(e, t) {
          return B(this).mergeDataOnPath(e, t)
        }
      },
      applyDataUpdates: {
        value: function() {
          return B(this).applyDataUpdates()
        }
      },
      hasBehavior: {
        value: function(e) {
          return B(this).hasBehavior(e)
        }
      },
      triggerEvent: {
        value: function(e, t, n) {
          return B(this).triggerEvent(e, t, n)
        }
      },
      createSelectorQuery: {
        value: function() {
          return wx.createSelectorQuery().in(this)
        }
      },
      selectComponent: {
        value: function(e) {
          return M(this, e, !1)
        }
      },
      selectAllComponents: {
        value: function(e) {
          return M(this, e, !0)
        }
      },
      getRelationNodes: {
        value: function(e) {
          return N(this, e)
        }
      }
    }),
    O = function(e) {
      e.using = w[e.is] = E(e.is), D(e);
      var t = e.is + ".wxml";
      e.template = {
        func: __wxAppCode__[t]
      }, v[e.is] = T(e, t);
      var n = exparser.registerElement(e),
        i = Object.create(R, {
          constructor: {
            value: r
          }
        });
      exparser.Behavior.prepare(n.behavior);
      var o = n.behavior.methods;
      for (var a in o) i[a] = o[a];
      return i
    },
    F = (t.Component = function e(t) {
      if (!__wxAppCurrentFile__) return void console.error("Component constructors should be called while initialization. A constructor call has been ignored.");
      t.is = __wxAppCurrentFile__.slice(0, -3);
      var n = t.created;
      t.created = function() {
        this.__customConstructor__ = e;
        var t = Object.create(r);
        A.set(t, this), exparser.Element.setMethodCaller(this, t), n && n.call(t), t.__wxWebviewId__ = this.__treeManager__.viewId
      }, t.relations && I(t.is, t.relations);
      var i = t.options || {};
      t.options = f, t.options.multipleSlots = i.multipleSlots || !1, t.options.writeIdToDOM = !1;
      var r = O(t);
      return t.is
    }, t.Page = function e(t) {
      if (!__wxAppCurrentFile__) return void console.error("Page constructors should be called while initialization. A constructor call has been ignored.");
      var n = Object.create(null),
        i = Object.create(null);
      for (var r in t) "data" !== r && ("function" == typeof t[r] ? i[r] = t[r] : n[r] = t[r]);
      var o = {
        is: __wxAppCurrentFile__.slice(0, -3),
        data: t.data,
        methods: i,
        created: function() {
          this.__customConstructor__ = e;
          var t = Object.create(a);
          A.set(t, this), exparser.Element.setMethodCaller(this, t), t.__wxWebviewId__ = this.__treeManager__.viewId, t.__wxExparserNodeId__ = this.__treeManager__.nodeId.getNodeId(this)
        },
        options: f
      };
      o.options.multipleSlots = !1, o.options.writeIdToDOM = !0;
      var a = O(o);
      return a.__freeData__ = n, t.is
    }, t.getNodeById = function(e, t) {
      if ((0, s.isDataThread)()) {
        return u.default.get(t).nodeId.getNodeById(e)
      }
      return u.default.instance ? u.default.instance.nodeId.getNodeById(e) : null
    }, t.getNodeId = function(e, t) {
      if ((0, s.isDataThread)()) {
        return u.default.get(t).nodeId.getNodeId(e)
      }
      return u.default.instance.nodeId.getNodeId(e)
    }, function(e) {
      if (!e.flowInited) return L(e);
      var t = e.operationFlow.iterator;
      t.expectStart();
      var n = t.nextStep();
      if (n[0] !== a.SYNC_EVENT_NAME.FLOW_UPDATE) throw new Error("Expect FLOW_UPDATE but get another");
      var i = e.nodeId.getNodeById(n[1]),
        r = n[2];
      r.length && (exparser.Component.getDataProxy(i).setChanges(r), i.applyDataUpdates()), t.expectEnd()
    }),
    L = function(e) {
      e.flowInited = !0;
      var t = e.operationFlow.iterator;
      t.expectStart();
      var n = t.nextStep();
      if (n[0] !== a.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION) throw new Error("Expect FLOW_INITIAL_CREATION but get another");
      var i = n[1],
        r = window.__DOMTree__ = exparser.createElement("body", exparser.Component._list[i]);
      if (e.nodeId.allocNodeId(r, -1), r.setAttribute("is", i), n = t.nextStep(), n[0] !== a.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION) throw new Error("Expect FLOW_INITIAL_CREATION but get another");
      e.nodeId.addNode(r), document.body = r.$$, exparser.Element.pretendAttached(r), t.expectEnd()
    };
  h.default.setStartOperation(F);
  var j = {
    String: String,
    Number: Number,
    Boolean: Boolean,
    Object: Object,
    Array: Array,
    null: null
  };
  (0, s.setDataListener)(a.SYNC_EVENT_NAME.COMPONENT_DEF, function(e) {
    u.default.instance = new u.default(0);
    for (var t = o(e, 3), n = t[0], i = t[1], r = t[2], a = 0; a < n.length; a++) {
      var s = n[a];
      s.options = p, exparser.registerBehavior(s)
    }
    for (var l = [], c = 0; c < i.length; c++) l.push(i[c].is);
    for (var d = C(l), h = 0; h < i.length; h++) {
      var f = i[h];
      for (var A in f.properties) f.properties[A].type = j[f.properties[A].type];
      var v = f.is === r ? "" : d[f.is],
        _ = f.options,
        w = !(!_.writeIdToDOM || f.is !== r);
      f.options = g, f.options.classPrefix = v, f.options.multipleSlots = _.multipleSlots || !1, f.options.writeIdToDOM = w, f.template = {
        func: __wxAppCode__[f.template]
      }, exparser.registerElement(f);
      var m = __wxAppCode__[f.is + ".wxss"];
      m && f.is !== r && m(v && v + "--", {
        allowIllegalSelector: w
      })
    }
  }, 0);
  var $ = function(e, t, n) {
      var i = [
        [],
        [], n
      ];
      P(i, n, Object.create(null), ""), (0, s.sendData)(a.SYNC_EVENT_NAME.COMPONENT_DEF, i, e), t.operationFlow.start(), t.operationFlow.push([a.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION, n]);
      var r = exparser.createElement("body", exparser.Component._list[n], t);
      return exparser.Element.getMethodCaller(r).__wxExparserNodeId__ = t.nodeId.allocNodeId(r, -1), t.operationFlow.push([a.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION]), t.nodeId.addNode(r), r
    },
    Q = function(e, t) {
      (0, s.setDataListener)(a.SYNC_EVENT_NAME.WX_EVENT, function(e) {
        var n = e[2],
          i = e[1],
          r = t.nodeId.getNodeById(e[0]),
          o = exparser.Element.getMethodCaller(r);
        "function" != typeof o[i] ? console.warn('Component "' + r.is + '" does not have a method "' + i + '" to handle event "' + n.type + '".') : exparser.safeCallback("Event Handler", o[i], o, [n])
      }, e), (0, s.setDataListener)(a.SYNC_EVENT_NAME.LAYOUT_READY, function() {
        var e = t.pendingReady;
        t.pendingReady = [];
        for (var n = 0; n < e.length; n++) e[n].triggerLifeTime("ready")
      }, e)
    };
  t.addView = function(e, t) {
    var n = u.default.create(e);
    return n.operationFlow.unblock(), Q(e, n), $(e, n, t)
  }, t.attachView = function(e) {
    exparser.Element.pretendAttached(e), e.__treeManager__.operationFlow.end()
  }, t.removeView = function(e, t) {
    exparser.Element.pretendDetached(t), u.default.destroy(e), (0, s.removeDataListeners)(e)
  }
}, function(e, t, n) {
  (function(e) {
    "use strict";

    function i(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }

    function r(e, t) {
      if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
    }
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.Tmpl = void 0;
    var o = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var i = t[n];
            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
          }
        }
        return function(t, n, i) {
          return n && e(t.prototype, n), i && e(t, i), t
        }
      }(),
      a = n(5),
      s = n(20),
      l = i(s),
      c = n(26),
      u = i(c),
      d = n(2),
      h = n(17),
      p = Object.prototype.hasOwnProperty,
      f = function(e, t) {
        for (var n = JSON.parse(JSON.stringify(e)), i = 0; i < t.length; i++) {
          for (var r = t[i], o = r[1], a = r[3], s = n, l = o[0], c = 1; c < o.length; c++)
            if (s = s[l], null != s && s.__wxspec__ && (s = s.__value__), l = o[c], null != s && !p.call(s, l)) {
              s = null;
              break
            }
          null != s && p.call(s, l) && (null != a ? s[l] = {
            __value__: a,
            __wxspec__: !0
          } : null != s[l] && s[l].__wxspec__ || (s[l] = {
            __value__: s[l],
            __wxspec__: !0
          }))
        }
        return n
      },
      g = function(e, t, n, i, r, o, a, s, c) {
        var u = t;
        return "virtual" !== t && "shadow" !== t && ("wx-" === t.slice(0, 3) && (u = t.slice(3)), "slot" !== u ? u = e[u] ? e[u] : t : t = "slot"), new l.default(t, u, n, i, r, o, a, s, c)
      },
      A = function e(t, n) {
        if ((0, d.isString)(n) || Number(n) === n && Number(n) % 1 == 0) return new u.default(String(n));
        var i = [];
        return n.children.forEach(function(n) {
          i.push(e(t, n))
        }), g(t, n.tag, n.attr, n.n, n.raw, n.wxKey, n.wxVkey, n.wxXCkey, i)
      },
      v = function(t, n, i) {
        var r = n(i, null, e);
        return r.tag = "shadow", A(t, r)
      },
      _ = function(e, t, n) {
        var i = new m;
        return i._data = t, i._generateFunc = e.template.func, i._using = e.using, i._virtualTree = v(i._using, i._generateFunc, i._data), i
      },
      w = function e(t, n, i) {
        for (var r = t.childNodes, o = 0; o < r.length; o++) {
          var a = r[o];
          a instanceof exparser.TextNode || (a.__id && (n[a.__id] = a), void 0 !== a.__slotName && (i[a.__slotName] = a), e(a, n, i))
        }
      },
      m = t.Tmpl = function() {
        function e() {
          r(this, e)
        }
        return o(e, [{
          key: "createInstance",
          value: function(e, t, n) {
            var i = new b,
              r = n;
            return i._generateFunc = this._generateFunc, i._using = this._using, i.idMap = Object.create(null), i.slots = Object.create(null), i._virtualTree = this._virtualTree, i.shadowRoot = this._virtualTree.render(e, n), w(i.shadowRoot, i.idMap, i.slots), i.listeners = [], e.__component__ = !0, (0, h.isDataThread)() && (e.__treeManager__ = r, i.shadowRoot.__treeManager__ = r, r.pendingReady.push(e)), i
          }
        }]), e
      }();
    m.create = _;
    var b = function() {
      function e() {
        r(this, e)
      }
      return o(e, [{
        key: "updateValues",
        value: function(e, t, n, i, r) {
          var o = null;
          if (!r && (0, h.isDataThread)()) {
            o = e.__treeManager__, o.operationFlow.start(Date.now());
            var s = [];
            i.forEach(function(e) {
              void 0 !== e[2] ? s.push(e) : console.error('Setting data field "' + e[1].join(".") + '" to undefined is invalid.')
            }), o.operationFlow.push([a.SYNC_EVENT_NAME.FLOW_UPDATE, o.nodeId.getNodeId(e), s])
          }
          var l = f(t, i),
            c = v(this._using, this._generateFunc, l),
            u = this._virtualTree.diff(c);
          this._virtualTree = c, u.apply(this.shadowRoot), !r && (0, h.isDataThread)() && o.operationFlow.end()
        }
      }]), e
    }()
  }).call(t, function() {
    return this
  }())
}, function(e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }

  function r(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var o = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    a = n(5),
    s = n(2),
    l = n(21),
    c = n(22),
    u = n(26),
    d = i(u),
    h = n(17),
    p = n(14),
    f = i(p),
    g = function() {
      function e(t, n, i, o, a, l, c, u, h) {
        r(this, e), this.tagName = t || "", this.compName = n, this.props = i || {}, this.specProps = a || {}, this.children = h || [], this.newProps = o || [], this.wxVkey = c, this.wxXCkey = u, (0, s.isUndefined)(l) || (0, s.isNull)(l) ? this.wxKey = void 0 : this.wxKey = String(l), this.descendants = 0;
        for (var p = 0; p < this.children.length; ++p) {
          var f = this.children[p];
          (0, s.isVirtualNode)(f) ? this.descendants += f.descendants: (0, s.isString)(f) ? this.children[p] = new d.default(f) : (0, s.isVirtualText)(f) || console.log("invalid child", t, i, h, f), ++this.descendants
        }
      }
      return o(e, [{
        key: "render",
        value: function(e, t) {
          var n = null;
          if ("shadow" === this.tagName) n = exparser.ShadowRoot.create(e);
          else if ("virtual" === this.tagName) {
            var i = "virtual";
            1 === this.wxXCkey || 3 === this.wxXCkey ? i = "wx:if" : 2 !== this.wxXCkey && 4 !== this.wxXCkey || (i = "wx:for"), n = exparser.VirtualNode.create(i), exparser.Element.setInheritSlots(n), (0, h.isDataThread)() && (n.__treeManager__ = t)
          } else "slot" === this.tagName ? (n = exparser.VirtualNode.create("slot"), exparser.Element.setSlotName(n, "")) : (0, h.isDataThread)() && !exparser.Component._list[this.compName] ? (n = exparser.VirtualNode.create(this.tagName), n.__treeManager__ = t) : n = exparser.createElement(this.tagName, exparser.Component._list[this.compName], t);
          if (3 !== this.wxXCkey && 4 !== this.wxXCkey || (n.__wxDynamicSync__ = 4 === this.wxXCkey ? "wx:for" : "wx:if"), n.__component__)
            if ((0, h.isDataThread)()) exparser.Element.getMethodCaller(n).__wxExparserNodeId__ = t.nodeId.allocNodeId(n), t.operationFlow.push([a.SYNC_EVENT_NAME.FLOW_CREATE_NODE, t.nodeId.getNodeId(n)]);
            else {
              t = f.default.instance;
              var r = t.operationFlow.iterator,
                o = r.nextStep();
              if (o[0] !== a.SYNC_EVENT_NAME.FLOW_CREATE_NODE) throw new Error("Expect FLOW_CREATE_NODE but get another");
              t.nodeId.allocNodeId(n, o[1]), (0, h.inDevtoolsWebview)() && n.setAttribute("exparser:info-custom-component", n.__componentInstanceId), n.setAttribute("is", this.compName)
            }
          return (0, l.applyProperties)(n, this.props, this.specProps), this.children.forEach(function(e) {
            var i = e.render(null, t);
            n.appendChild(i)
          }), n
        }
      }, {
        key: "diff",
        value: function(e) {
          return (0, c.diff)(this, e)
        }
      }]), e
    }();
  g.prototype.type = "WxVirtualNode", t.default = g
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.applyProperties = void 0;
  var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
      return typeof e
    } : function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    },
    r = n(5),
    o = n(4),
    a = n(17),
    s = n(14),
    l = function(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(s),
    c = void 0 !== wx && wx.transformRpx,
    u = function(e) {
      return {
        id: e.id,
        offsetLeft: e.$$.offsetLeft,
        offsetTop: e.$$.offsetTop,
        dataset: e.dataset
      }
    },
    d = function(e) {
      return {
        id: e.id,
        dataset: e.dataset
      }
    },
    h = function(e) {
      if (e) {
        for (var t = [], n = 0; n < e.length; n++) {
          var i = e[n];
          t.push({
            identifier: i.identifier,
            pageX: i.pageX,
            pageY: i.pageY,
            clientX: i.clientX,
            clientY: i.clientY
          })
        }
        return t
      }
    },
    p = function(e, t, n, i, o, s) {
      var l = s ? "__wxEventCaptureHandleName" : "__wxEventHandleName";
      t[l] || (t[l] = Object.create(null)), t[l] || (t[l] = Object.create(null)), void 0 === t[l][n] && t.addListener(n, function(i) {
        var s = t[l][n];
        if (s) {
          i._hasListeners = !0;
          var c = t.ownerShadowRoot;
          if (c) {
            var p = c.__wxHost;
            if ((0, a.isDataThread)()) {
              var f = exparser.Element.getMethodCaller(p);
              "function" != typeof f[s] ? console.warn('Component "' + p.is + '" does not have a method "' + s + '" to handle event "' + i.type + '".') : f[s]({
                type: i.type,
                timeStamp: i.timeStamp,
                target: d(i.target),
                currentTarget: d(this),
                detail: i.detail,
                touches: i.touches,
                changedTouches: i.changedTouches
              })
            } else {
              var g = {
                type: i.type,
                timeStamp: i.timeStamp,
                target: u(i.target),
                currentTarget: u(this),
                detail: i.detail,
                touches: h(i.touches),
                changedTouches: h(i.changedTouches)
              };
              (0, a.sendData)(r.SYNC_EVENT_NAME.WX_EVENT, [e.nodeId.getNodeId(p), s, g])
            }
          }
          return !o && void 0
        }
      }, {
        capture: s
      }), t[l][n] = null == i ? "" : String(i)
    };
  t.applyProperties = function(e, t, n) {
    var s = (0, a.isDataThread)() ? e.__treeManager__ : l.default.instance;
    e.dataset = e.dataset || {};
    var u = !1,
      d = e instanceof exparser.Component,
      h = "wx-" === e.is.slice(0, 3),
      f = exparser.Component.getDataProxy(e);
    for (var g in t) {
      var A = t[g],
        v = null;
      if ("slot" === e.is && e instanceof exparser.VirtualNode && "name" === g) exparser.Element.setSlotName(e, A);
      else if ("id" !== g)
        if ("slot" !== g)
          if (d && "class" === g) e.class = A;
          else if (d && "style" === g) e.$$ && function() {
        var t = e.__animationStyle || {},
          n = t.transition,
          i = t.transform,
          r = t.transitionProperty,
          o = t.transformOrigin;
        document.createElement("div").style.cssText = c(A, !0);
        var a = {
          transition: n,
          transform: i,
          transitionProperty: r,
          transformOrigin: o
        };
        a["-webkit-transition"] = a.transition, a["-webkit-transform"] = a.transform, a["-webkit-transition-property"] = a.transitionProperty, a["-webkit-transform-origin"] = a.transformOrigin, e.$$.setAttribute(g, c(A, !0) + Object.keys(a).filter(function(e) {
          return !(/transform|transition/i.test(e) && "" === a[e] || "" === e.trim() || void 0 === a[e] || "" === a[e] || !isNaN(parseInt(e)))
        }).map(function(e) {
          return e.replace(/([A-Z]{1})/g, function(e) {
            return "-" + e.toLowerCase()
          }) + ":" + a[e]
        }).join(";"))
      }();
      else {
        var _ = d && exparser.Component.hasPublicProperty(e, g);
        if (_) f.scheduleReplace([g], A, n[g]), h ? f.doUpdates() : u = !0;
        else if (/^data-/.test(g)) {
          var w = (0, o.dashToCamelCase)(g.slice(5).toLowerCase());
          e.dataset[w] = A, e.setAttribute(g, A)
        } else(v = g.match(/^(capture-)?(bind|catch):?(.+)$/)) ? (p(s, e, v[3], A, "catch" === v[2], v[1]), (0, a.inDevtoolsWebview)() && !(0, a.isDataThread)() && e.setAttribute("exparser:info-attr-" + g, A)) : "on" === g.slice(0, 2) && p(s, e, g.slice(2), A, !1, !1), d && "animation" === g && e.$$ && null !== A && "object" === (void 0 === A ? "undefined" : i(A)) && A.actions && A.actions.length > 0 && function() {
          var t = function() {
              if (n < r) {
                var t = wx.animationToStyle(i[n]),
                  o = t.transition,
                  a = t.transitionProperty,
                  s = t.transform,
                  l = t.transformOrigin,
                  u = t.style;
                e.$$.style.transition = o, e.$$.style.transitionProperty = a, e.$$.style.transform = s, e.$$.style.transformOrigin = l, e.$$.style.webkitTransition = o, e.$$.style.webkitTransitionProperty = a, e.$$.style.webkitTransform = s, e.$$.style.webkitTransformOrigin = l;
                for (var d in u) e.$$.style[d] = c(" " + u[d], !0);
                e.__animationStyle = {
                  transition: o,
                  transform: s,
                  transitionProperty: a,
                  transformOrigin: l
                }
              }
            },
            n = 0,
            i = A.actions,
            r = A.actions.length;
          e.addListener("transitionend", function() {
            n += 1, t()
          }), t()
        }()
      } else e.slot = void 0 == A ? "" : A;
      else e.id = void 0 == A ? "" : A
    }
    if (u && f.doUpdates(!0), e.__component__)
      if ((0, a.isDataThread)()) s.operationFlow.push([r.SYNC_EVENT_NAME.FLOW_APPLY_PROPERTY]);
      else {
        var m = s.operationFlow.iterator,
          b = m.nextStep();
        if (b[0] !== r.SYNC_EVENT_NAME.FLOW_APPLY_PROPERTY) throw new Error("Expect FLOW_APPLY_PROPERTY but get another")
      }
  }
}, function(e, t, n) {
  "use strict";

  function i(e) {
    return e && e.__esModule ? e : {
      default: e
    }
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.appendPatch = t.diffProps = t.diffChildren = t.diffNode = t.diff = void 0;
  var r = n(23),
    o = i(r),
    a = n(24),
    s = i(a),
    l = n(2),
    c = n(25),
    u = n(5),
    d = (t.diff = function(e, t) {
      var n = {};
      return d(e, t, n, 0), new s.default(e, n)
    }, t.diffNode = function(e, t, n, i) {
      if (e !== t) {
        var r = n[i];
        if (null == t) r = f(r, new o.default(u.PATCH_TYPE.REMOVE, e));
        else if ((0, l.isVirtualNode)(t))
          if ((0, l.isVirtualNode)(e))
            if (e.tagName === t.tagName && e.wxKey === t.wxKey)
              if ("virtual" === e.tagName && e.wxVkey !== t.wxVkey) r = f(r, new o.default(u.PATCH_TYPE.VNODE, e, t));
              else {
                var a = p(t.props, t.newProps);
                a && (r = f(r, new o.default(u.PATCH_TYPE.PROPS, e, a, t))), r = h(e, t, n, r, i)
              }
        else r = f(r, new o.default(u.PATCH_TYPE.VNODE, e, t));
        else r = f(r, new o.default(u.PATCH_TYPE.VNODE, e, t));
        else {
          if (!(0, l.isVirtualText)(t)) throw new Error("unknow node type");
          t.text !== e.text && (r = f(r, new o.default(u.PATCH_TYPE.TEXT, e, t)))
        }
        r && (n[i] = r)
      }
    }),
    h = t.diffChildren = function(e, t, n, i, r) {
      for (var a = (0, l.getWxmlVersionTag)("customComponents"), s = !a || "virtual" === e.tagName && e.wxXCkey >= 1 && e.wxXCkey <= 4, h = e.children, p = s ? (0, c.listDiff)(h, t.children) : {
          children: t.children,
          moves: null
        }, g = p.children, A = 0; A < h.length; ++A) {
        var v = h[A],
          _ = g[A];
        ++r, _ && d(v, _, n, r), (0, l.isVirtualNode)(v) && (r += v.descendants)
      }
      return p.moves && (i = f(i, new o.default(u.PATCH_TYPE.REORDER, e, p.moves, t))), i
    },
    p = t.diffProps = function(e, t) {
      for (var n = {}, i = 0; i < t.length; i++) {
        var r = t[i];
        n[r] = e[r]
      }
      return (0, l.isEmptyObject)(n) ? void 0 : n
    },
    f = t.appendPatch = function(e, t) {
      return e ? (e.push(t), e) : [t]
    }
}, function(e, t, n) {
  "use strict";

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    o = n(5),
    a = n(21),
    s = n(14),
    l = function(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(s),
    c = n(17),
    u = function(e) {
      if ((0, c.isDataThread)()) e.operationFlow.push([o.SYNC_EVENT_NAME.FLOW_MINIPULATE_CHILD]);
      else {
        if (e.operationFlow.iterator.nextStep()[0] !== o.SYNC_EVENT_NAME.FLOW_MINIPULATE_CHILD) throw new Error("Expect FLOW_MINIPULATE_CHILD but get another")
      }
    },
    d = function() {
      function e(t, n, r, o) {
        i(this, e), this.type = Number(t), this.vNode = n, this.patch = r, this.newVNode = o
      }
      return r(e, [{
        key: "apply",
        value: function(t) {
          switch (this.type) {
            case o.PATCH_TYPE.TEXT:
              return e.stringPatch(t, this.patch);
            case o.PATCH_TYPE.VNODE:
              return e.vNodePatch(t, this.patch);
            case o.PATCH_TYPE.PROPS:
              return e.applyProperties(t, this.patch, this.newVNode.specProps);
            case o.PATCH_TYPE.REORDER:
              return e.reorderChildren(t, this.patch, this.newVNode.children);
            case o.PATCH_TYPE.INSERT:
              return e.insertNode(t, this.patch);
            case o.PATCH_TYPE.REMOVE:
              return e.removeNode(t);
            default:
              return t
          }
        }
      }], [{
        key: "stringPatch",
        value: function(e, t) {
          var n = e.parentNode,
            i = t.render();
          return n && i !== e && n.replaceChild(i, e), i
        }
      }, {
        key: "vNodePatch",
        value: function(e, t) {
          var n = (0, c.isDataThread)() ? e.__treeManager__ : l.default.instance,
            i = e.parentNode,
            r = t.render(null, n);
          return i && r !== e && ("wx:for" === i.__wxDynamicSync__ || "wx:if" === e.__wxDynamicSync__ ? (n.nodeId.addNode(r), i.replaceChild(r, e), u(n), n.nodeId.removeNode(e)) : i.replaceChild(r, e)), r
        }
      }, {
        key: "applyProperties",
        value: function(e, t, n) {
          return (0, a.applyProperties)(e, t, n), e
        }
      }, {
        key: "reorderChildren",
        value: function(e, t, n) {
          var i = (0, c.isDataThread)() ? e.__treeManager__ : l.default.instance,
            r = t.removes,
            o = t.inserts,
            a = e.childNodes,
            s = [];
          return o.forEach(function(e) {
            s.push({
              node: void 0 !== e.oldIndex ? a[e.oldIndex] : null,
              before: e.pos >= 0 ? a[e.pos] : void 0,
              index: e.index
            })
          }), r.forEach(function(t) {
            var n = a[t];
            e.removeChild(n), "wx:for" === e.__wxDynamicSync__ && (u(i), i.nodeId.removeNode(n))
          }), s.forEach(function(t) {
            var r = t.node,
              o = t.before,
              a = t.index;
            null === r && (r = n[a].render(null, i)), "wx:for" === e.__wxDynamicSync__ ? (i.nodeId.addNode(r), e.insertBefore(r, o), u(i)) : e.insertBefore(r, o)
          }), e
        }
      }, {
        key: "insertNode",
        value: function(e, t) {
          var n = (0, c.isDataThread)() ? e.__treeManager__ : l.default.instance,
            i = t.render(null, n);
          return e && ("wx:for" === e.__wxDynamicSync__ || "wx:if" === i.__wxDynamicSync__ ? (n.nodeId.addNode(i), e.appendChild(i), u(n)) : e.appendChild(i)), e
        }
      }, {
        key: "removeNode",
        value: function(e) {
          var t = (0, c.isDataThread)() ? e.__treeManager__ : l.default.instance,
            n = e.parentNode;
          return n && (n.removeChild(e), "wx:for" !== n.__wxDynamicSync__ && "wx:if" !== e.__wxDynamicSync__ || (u(t), t.nodeId.removeNode(e))), null
        }
      }]), e
    }();
  t.default = d
}, function(e, t, n) {
  "use strict";

  function i(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var r = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    o = n(9),
    a = function() {
      function e(t, n) {
        i(this, e), this.oldTree = t, this.patches = n, this.patchIndexes = Object.keys(this.patches).map(function(e) {
          return Number(e)
        })
      }
      return r(e, [{
        key: "apply",
        value: function(e) {
          var t = this;
          if (0 === this.patchIndexes.length) return e;
          var n = (0, o.getDomIndex)(e, this.oldTree, this.patchIndexes);
          return this.patchIndexes.forEach(function(e) {
            var i = n[e];
            if (i) {
              t.patches[e].forEach(function(e) {
                e.apply(i)
              })
            }
          }), e
        }
      }]), e
    }();
  t.default = a
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var n = Object.prototype.hasOwnProperty,
    i = (t.listDiff = function(e, t) {
      for (var o = i(e), a = o.keyIndexes, s = i(t), l = s.keyIndexes, c = s.freeIndexes, u = [], d = [], h = [], p = 0, f = 0, g = 0; g < e.length; ++g) {
        var A = e[g],
          v = r(A);
        if (v)
          if (n.call(l, v)) {
            var _ = l[v];
            u.push(t[_])
          } else d.push(g - f), ++f, u.push(null);
        else if (p < c.length) {
          var w = c[p];
          u.push(t[w]), ++p
        } else d.push(g - f), ++f, u.push(null)
      }
      for (var m = u, b = 0, y = [], x = 0; x < t.length;) {
        for (var C = t[x], S = r(C), E = m[b], I = r(E); null === E;) ++b, E = m[b], I = r(E);
        b >= m.length ? (h.push({
          oldIndex: a[S],
          index: x,
          pos: -1
        }), ++b, ++x) : I === S ? (y.push(b), ++b, ++x) : S ? (I ? l[I] === x + 1 ? h.push({
          oldIndex: a[S],
          index: x,
          pos: b
        }) : (++b, E = m[b], E && r(E) === S ? (y.push(b), ++b) : (--b, h.push({
          oldIndex: a[S],
          index: x,
          pos: b
        }))) : h.push({
          oldIndex: a[S],
          index: x,
          pos: b
        }), ++x) : ++b
      }
      for (var k = 0, P = 0; P < h.length; P++) {
        var T = h[P].pos;
        if (-1 === T) break;
        for (; k < y.length && T > y[k];) k++;
        k >= y.length ? h[P].pos = -1 : h[P].pos = y[k]
      }
      return {
        children: u,
        moves: {
          removes: d,
          inserts: h
        }
      }
    }, t.makeKeyAndFreeIndexes = function(e) {
      for (var t = {}, i = [], a = 0; a < e.length; ++a) {
        var s = e[a],
          l = r(s);
        l ? n.call(t, l) ? (console.warn('For developer:Do not set same key "' + l + '" in wx:key.'), o(s), i.push(a)) : t[l] = a : i.push(a)
      }
      return {
        keyIndexes: t,
        freeIndexes: i
      }
    }),
    r = t.getItemKey = function(e) {
      if (e) return e.wxKey
    },
    o = function(e) {
      e.wxKey = void 0
    }
}, function(e, t) {
  "use strict";

  function n(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
  }
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = function() {
      function e(e, t) {
        for (var n = 0; n < t.length; n++) {
          var i = t[n];
          i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
        }
      }
      return function(t, n, i) {
        return n && e(t.prototype, n), i && e(t, i), t
      }
    }(),
    r = function() {
      function e(t) {
        n(this, e), this.text = String(t)
      }
      return i(e, [{
        key: "render",
        value: function() {
          return exparser.createTextNode(this.text)
        }
      }]), e
    }();
  r.prototype.type = "WxVirtualText", t.default = r
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  }), t.scheduleIntersectionUpdate = t.removeIntersectionObserver = t.addIntersectionObserver = void 0;
  var i = n(2),
    r = {},
    o = {},
    a = function(e) {
      return {
        left: e.left,
        top: e.top,
        right: e.right,
        bottom: e.bottom,
        width: e.width,
        height: e.height
      }
    },
    s = function(e, t) {
      var n = {
        left: e.left < t.left ? t.left : e.left,
        top: e.top < t.top ? t.top : e.top,
        right: e.right > t.right ? t.right : e.right,
        bottom: e.bottom > t.bottom ? t.bottom : e.bottom,
        width: 0,
        height: 0
      };
      return n.right > n.left ? n.width = n.right - n.left : n.right = n.left = n.bottom = n.top = 0, n.bottom > n.top ? n.height = n.bottom - n.top : n.right = n.left = n.bottom = n.top = 0, n
    },
    l = function(e) {
      for (var t = document.documentElement.clientWidth, n = document.documentElement.clientHeight, i = null, r = 0; r < e.length; r++) {
        var o = e[r],
          a = o.node,
          l = o.margins,
          c = a ? a.$$.getBoundingClientRect() : {
            left: 0,
            top: 0,
            right: t,
            bottom: n,
            width: t,
            height: n
          },
          u = {
            left: c.left - l.left,
            top: c.top - l.top,
            right: c.right + l.right,
            bottom: c.bottom + l.bottom
          };
        i = i ? s(i, u) : u
      }
      return i
    },
    c = function(e) {
      var t = e.targetNode,
        n = e.relatives,
        i = e.thresholds,
        r = e.cb,
        o = e.currentRatio,
        c = l(n),
        u = t.$$.getBoundingClientRect(),
        d = s(c, u),
        h = d.width * d.height / (u.width * u.height);
      e.currentRatio = h;
      var p = void 0 === o;
      h !== o && i.forEach(function(e) {
        if (p) return !1;
        h <= e && o >= e ? p = !0 : h >= e && o <= e && (p = !0)
      }), p && r.call(t, {
        time: Date.now(),
        boundingClientRect: a(u),
        intersectionRatio: h,
        intersectionRect: a(d),
        relativeRect: c
      })
    },
    u = function() {
      for (var e in r) c(r[e])
    },
    d = function(e) {
      return e = e || {}, {
        left: e.left || 0,
        top: e.top || 0,
        right: e.right || 0,
        bottom: e.bottom || 0
      }
    },
    h = function(e, t, n, a, s) {
      var l = (0, i.guid)();
      if (!e || !t.length) return l;
      var u = {
          targetNode: e,
          relatives: t,
          thresholds: n,
          currentRatio: a,
          cb: s
        },
        d = exparser.Observer.create(function(e) {
          "attached" === e.status ? (r[l] = u, requestAnimationFrame(function() {
            c(u)
          })) : "detached" === e.status && (delete r[l], d.disconnect(), delete o[l])
        });
      return o[l] = d, d.observe(e, {
        attachStatus: !0
      }), exparser.Element.isAttached(e) && (r[l] = u, requestAnimationFrame(function() {
        c(u)
      })), l
    },
    p = (t.addIntersectionObserver = function(e, t, n, i, r) {
      i = i || {};
      var o = e.querySelector(t);
      o || console.warn('For developer:Node "' + t + '" is not found. Intersection observer will not trigger.');
      var a = [];
      return n.forEach(function(t) {
        var n = t.selector,
          i = t.margins,
          r = null == n ? null : e.querySelector(n);
        r || null == n ? a.push({
          node: r,
          margins: d(i)
        }) : console.warn('For developer:Node "' + n + '" is not found. The relative node for intersection observer will be ignored.')
      }), a.length || console.warn("For developer:Intersection observer will be ignored because no relative nodes are found."), h(o, a, i.thresholds || [0], i.initialRatio || 0, r)
    }, t.removeIntersectionObserver = function(e) {
      var t = o[e];
      t && (delete r[e], t.disconnect(), delete o[e])
    }, !1),
    f = t.scheduleIntersectionUpdate = function() {
      p || (p = !0, requestAnimationFrame(function() {
        p = !1, u()
      }))
    };
  "undefined" != typeof window && "undefined" != typeof document && (document.addEventListener("pageReRender", function() {
    f()
  }), window.addEventListener("scroll", function() {
    f()
  }, {
    capture: !0,
    passive: !0
  }))
}]);
! function(e) {
  function t(i) {
    if (n[i]) return n[i].exports;
    var r = n[i] = {
      exports: {},
      id: i,
      loaded: !1
    };
    return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
  }
  var n = {};
  t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
  "use strict";
  var i = n(1),
    r = n(6),
    o = function(e) {
      return e && e.__esModule ? e : {
        default: e
      }
    }(r),
    a = window.__virtualDOM__;
  (0, i.init)(), (0, o.default)(), window.__mergeData__ = a.getMergeDataFunc();
  var s = void 0,
    l = {
      funcReady: !1,
      dataReady: !1,
      firstRender: !1
    },
    c = [];
  window.__DOMTree__ = void 0;
  var u = {
    webviewStartTime: Date.now(),
    funcReady: 0
  };
  window.onerror = function(e, t, n, i, r) {
    console.error(r.stack), Reporter.errorReport({
      key: "webviewScriptError",
      msg: e,
      file: t,
      line: n,
      col: i,
      error: r
    }), "ios" === wx.getPlatform() && webkit.messageHandlers.publishHandler.postMessage("wawebview sdk error:" + r.msg)
  };
  var d = function(e, t, n, i) {
      Reporter.speedReport({
        key: e,
        timeMark: {
          startTime: t,
          endTime: n
        },
        force: "reRenderTime" !== e,
        data: i
      })
    },
    h = function(e) {
      var t = !1;
      e.ext && (void 0 !== e.ext.webviewId && (window.__webviewId__ = e.ext.webviewId), e.ext.enablePullUpRefresh && (window.__onReachBottomDistance__ = e.ext.onReachBottomDistance), void 0 !== e.ext.isPageReload && (t = e.ext.isPageReload), void 0 !== e.ext.scene && (window.__scene__ = e.ext.scene), window.__route__ = e.ext.route, window.__lastRoute__ = e.ext.lastRoute, window.__query__ = e.ext.query, window.__queryString__ = Object.keys(e.ext.query || {}).map(function(t) {
        return t + "=" + e.ext.query[t]
      }).join("&"), window.__lastQueryString__ = Object.keys(e.ext.lastQuery || {}).map(function(t) {
        return t + "=" + e.ext.lastQuery[t]
      }).join("&")), e.options && e.options.usingCustomComponents ? a.startInitRender() : (s = a.createVirtualTree(window.__generateFunc__, e.data), window.__DOMTree__ = a.render(s), exparser.Element.replaceDocumentElement(window.__DOMTree__, document.body), document.dispatchEvent(new CustomEvent("pageReRender", {}))), window.requestAnimationFrame(function() {
        t || wx.publishPageEvent("__DOMReady", {}), wx.initReady(), (0, i.enableScroll)(e.ext), t && (0, i.recoverPageState)({
          scrollTop: e.ext.pageScrollTop
        })
      })
    },
    p = function(e) {
      var t = a.createVirtualTree(window.__generateFunc__, e.data),
        n = a.diff(s, t);
      a.apply(n, window.__DOMTree__), s = t
    };
  wx.onAppDataChange((0, i.catchError)(function(e, t) {
    l.dataReady = !0, l.funcReady ? f(e, t) : c.push({
      res: e,
      cb: t
    })
  })), document.addEventListener("generateFuncReady", (0, i.catchError)(function(e) {
    if (u.funcReady = Date.now(), d("funcReady", u.webviewStartTime, u.funcReady), window.__pageFrameStartTime__ && window.__pageFrameEndTime__ && d("pageframe", window.__pageFrameStartTime__, window.__pageFrameEndTime__), window.__WAWebviewStartTime__ && window.__WAWebviewEndTime__ && d("WAWebview", window.__WAWebviewStartTime__, window.__WAWebviewEndTime__), window.__generateFunc__ = e.detail.generateFunc, l.funcReady = !0, l.dataReady)
      for (var t in c) f(c[t].res, c[t].cb)

  }));
  var f = function(e, t) {
      if (l.firstRender) setTimeout(function() {
        var n = Date.now();
        p(e), d("reRenderTime", n, Date.now()), document.dispatchEvent(new CustomEvent("pageReRender", {})), t()
      }, 0);
      else {
        var n = Date.now();
        d("firstGetData", u.funcReady, Date.now()), h(e), d("firstRenderTime", n, Date.now()), e.options && e.options.firstRender || (console.error("firstRender not the data from Page.data"), Reporter.errorReport({
          key: "webviewScriptError",
          error: new Error("firstRender not the data from Page.data"),
          extend: "firstRender not the data from Page.data"
        })), l.firstRender = !0
      }
    },
    g = function() {
      (0, i.savePageState)(), wx.webViewReadyToTerminate()
    };
  wx.onPageScrollTo((0, i.catchError)(i.onPageScrollTo)), wx.onWebViewWillManuallyTerminate((0, i.catchError)(g))
}, function(e, t, n) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var i = n(2);
  Object.defineProperty(t, "enableScroll", {
    enumerable: !0,
    get: function() {
      return i.enableScroll
    }
  }), Object.defineProperty(t, "onPageScrollTo", {
    enumerable: !0,
    get: function() {
      return i.onPageScrollTo
    }
  });
  var r = n(3);
  Object.defineProperty(t, "init", {
    enumerable: !0,
    get: function() {
      return r.init
    }
  });
  var o = n(4);
  Object.defineProperty(t, "catchError", {
    enumerable: !0,
    get: function() {
      return o.catchError
    }
  });
  var a = n(5);
  Object.defineProperty(t, "savePageState", {
    enumerable: !0,
    get: function() {
      return a.savePageState
    }
  }), Object.defineProperty(t, "recoverPageState", {
    enumerable: !0,
    get: function() {
      return a.recoverPageState
    }
  })
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var n = t.getWindowHeight = function() {
      return "CSS1Compat" === document.compatMode ? document.documentElement.clientHeight : document.body.clientHeight
    },
    i = t.getScrollHeight = function() {
      var e = 0,
        t = 0;
      return document.body && (e = document.body.scrollHeight), document.documentElement && (t = document.documentElement.scrollHeight), Math.max(e, t)
    },
    r = !1,
    o = function(e) {
      var t = n(),
        o = i(),
        a = window.scrollY,
        s = a > 0 && o > t && a + t + e >= o;
      return s && !r ? (r = !0, !0) : (!s || !r) && (r = !1, !1)
    },
    a = !0,
    s = t.triggerPullUpRefresh = function() {
      a && (wx.publishPageEvent("onReachBottom", {}), a = !1, setTimeout(function() {
        a = !0
      }, 350))
    },
    l = function(e) {
      var t = 0;
      window.__DOMTree__.addListener("touchstart", function(e) {
        t = e.touches[0].pageY
      }), window.__DOMTree__.addListener("touchmove", function(n) {
        n.touches[0].pageY < t && o(e) && s()
      })
    };
  t.onPageScrollTo = function(e) {
    var t = document.body,
      r = isNaN(Number(e.duration)) ? 300 : Math.max(0, Number(e.duration)),
      o = e.scrollTop;
    if (void 0 !== o) {
      o < 0 && (o = 0);
      var a = n(),
        s = i();
      if (o > s - a && (o = s - a), 0 === r) return t.scrollTop = o, void(document.documentElement.scrollTop = o);
      if ("wechatdevtools" !== wx.getPlatform()) return void wx.invoke("scrollWebviewTo", {
        duration: r,
        scrollTop: o
      });
      var l = function e() {
          t.style.transition = "", t.style.webkitTransition = "", t.style.transform = "", t.style.webkitTransform = "", t.scrollTop = o, document.documentElement.scrollTop = o, t.removeEventListener("transitionend", e), t.removeEventListener("webkitTransitionEnd", e)
        },
        c = "translateY(" + ((t.scrollTop || document.documentElement.scrollTop) - o) + "px) translateZ(0)";
      t.style.transition = "transform " + r + "ms ease-out", t.style.webkitTransition = "-webkit-transform " + r + "ms ease-out", t.addEventListener("transitionend", l), t.addEventListener("webkitTransitionEnd", l), t.style.transform = c, t.style.webkitTransform = c
    }
  }, t.enableScroll = function(e) {
    var t = e.onReachBottomDistance,
      n = e.enablePullUpRefresh,
      i = e.enablePageScroll;
    (i || n) && (window.onscroll = function() {
      i && wx.publishPageEvent("onPageScroll", {
        scrollTop: window.pageYOffset
      }), n && o(t) && s()
    }), n && l(t)
  }
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var n = function() {
    document.addEventListener("DOMContentLoaded", function() {
      var e = window.innerWidth > 0 ? window.innerWidth : screen.width;
      document.documentElement.style.fontSize = e / 20 + "px"
    }, 1e3)
  };
  t.init = function() {
    window.__webview_engine_version__ = .02, n()
  }
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  t.catchError = function(e) {
    return function() {
      for (var t = arguments.length, n = Array(t), i = 0; i < t; i++) n[i] = arguments[i];
      try {
        e.apply(void 0, n)
      } catch (e) {
        console.error(e.stack), Reporter.errorReport({
          key: "exparserScriptError",
          error: e
        })
      }
    }
  };
  exparser.addGlobalErrorListener(function(e, t) {
    Reporter.errorReport({
      key: "webviewScriptError",
      error: e,
      extend: t.message
    })
  })
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  t.savePageState = function() {
    var e = document.body.scrollTop || document.documentElement.scrollTop,
      t = {
        scrollTop: e
      };
    WeixinJSBridge.publish("savePageState", t)
  }, t.recoverPageState = function() {
    var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    if (void 0 !== e.scrollTop) {
      var t = parseInt(e.scrollTop, 10);
      document.body.scrollTop = t, document.documentElement.scrollTop = t
    }
  }
}, function(e, t) {
  "use strict";
  Object.defineProperty(t, "__esModule", {
    value: !0
  });
  var n = window.__virtualDOM__,
    i = function() {
      var e = function(e) {
          var t = {};
          return e.id && (t.id = ""), e.dataset && (t.dataset = {}), e.rect && (t.left = 0, t.right = 0, t.top = 0, t.bottom = 0), e.size && (t.width = document.documentElement.clientWidth, t.height = document.documentElement.clientHeight), e.scrollOffset && (t.scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0, t.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0), t
        },
        t = function(e, t) {
          var n = e.$$,
            i = {};
          if (t.id && (i.id = e.id || ""), t.dataset && (i.dataset = e.dataset || {}), t.rect || t.size) {
            var r = n.getBoundingClientRect();
            t.rect && (i.left = r.left, i.right = r.right, i.top = r.top, i.bottom = r.bottom), t.size && (i.width = r.width, i.height = r.height)
          }
          if (t.properties && t.properties.forEach(function(t) {
              var n = t.replace(/-([a-z])/g, function(e, t) {
                return t.toUpperCase()
              });
              exparser.Component.hasPublicProperty(e, n) && (i[n] = e[n])
            }), t.scrollOffset)
            if (e.hasBehavior("wx-positioning-container")) {
              var o = e.getScrollPosition();
              i.scrollLeft = o.scrollLeft, i.scrollTop = o.scrollTop
            } else i.scrollLeft = 0, i.scrollTop = 0;
          return i
        };
      wx.onRequestComponentInfo(function(i) {
        var r = i.reqId,
          o = [];
        i.reqs.forEach(function(i) {
          var r = i.component,
            a = i.selector,
            s = i.single,
            l = i.fields,
            c = null;
          if (0 === r) c = e(l);
          else {
            var u = window.__DOMTree__;
            if (null == r && n.customComponentMode && (r = -1), null != r && (u = n.getNodeById(r), u ? u = u.shadowRoot : null === u && (u = window.__DOMTree__)), s) {
              var d = u ? u.querySelector(a) : null;
              c = d ? t(d, l) : null
            } else {
              var h = u ? u.querySelectorAll(a) : [];
              c = [];
              for (var p = 0; p < h.length; p++) c.push(t(h[p], l))
            }
          }
          o.push(c)
        }), wx.sendComponentInfo({
          reqId: r,
          res: o
        })
      })
    };
  t.default = i
}]),
function(e) {
  function t() {
    var t = document.createElement("style");
    if (document.getElementsByTagName("head")[0].insertBefore(t, document.getElementsByTagName("head")[0].firstChild), t.styleSheet) t.styleSheet.disabled || (t.styleSheet.cssText = e);
    else try {
      t.innerHTML = e
    } catch (n) {
      t.innerText = e
    }
  }
  window.document && "complete" === window.document.readyState ? t() : window.onload = t
}('html {\n  -webkit-user-select: none;\n          user-select: none;\n  height: 100%;\n  width: 100%;\n}\nbody {\n  -webkit-user-select: none;\n          user-select: none;\n  width: 100%;\n  overflow-x: hidden;\n}\nwx-action-sheet-item {\n  background-color: #FFFFFF;\n  position: relative;\n  padding: 10px 0;\n  text-align: center;\n  font-size: 18px;\n  display: block;\n}\nwx-action-sheet-item:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 1px;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\nwx-action-sheet-item:active {\n  background-color: #ECECEC;\n}\nwx-action-sheet .wx-action-sheet {\n  position: fixed;\n  left: 0;\n  bottom: 0;\n  -webkit-transform: translate(0, 100%);\n          transform: translate(0, 100%);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden;\n  z-index: 5000;\n  width: 100%;\n  background-color: #FFFFFF;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\nwx-action-sheet .wx-action-sheet-show {\n  -webkit-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\nwx-action-sheet .wx-action-sheet-menu {\n  background-color: #FFFFFF;\n}\nwx-action-sheet .wx-action-sheet-mask {\n  position: fixed;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  transition: background-color 0.3s;\n  background-color: rgba(0, 0, 0, 0.6);\n}\nwx-audio {\n  display: inline-block;\n  line-height: 0;\n}\nwx-audio[hidden] {\n  display: none;\n}\nwx-audio > .wx-audio-default {\n  max-width: 100%;\n  min-width: 302px;\n  height: 65px;\n  background: #fcfcfc;\n  border: 1px solid #e0e0e0;\n  border-radius: 2.5px;\n  display: inline-block;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-left {\n  width: 65px;\n  height: 65px;\n  float: left;\n  background-color: #e6e6e6;\n  background-size: 100% 100%;\n  background-position: 50% 50%;\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button {\n  width: 24px;\n  height: 24px;\n  margin: 20.5px;\n  background-size: cover;\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button.play {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAB4dJREFUaAXNWg1MlVUYvpcfIRCJ+MnCaOBl8dOcOCEQZ9kmI5cQG5Yb6MifKbMaGVobOtlibTWHDpgpxBUwF07826iFsMkYJhg559JdGiQSkUzSBA0QkZ7n4/u+nXsvwf3jwru99/y/3/N+3znvec97rlbjABofH38GYtaAV4MjwDqwH9gHTBoE3wd3gA3gi+B6rVY7hHR2CKD9wFngs+BHYGuJYziWMqiscwgP8wLvBQ+AHUWURZle1mqhtXQAhLui7xZwPvgFsBENDg7+Drp069at2z09Pf03b978u6mpqZ+dVq1aFRAVFeW/aNGigNDQ0JfDwsISfXx8wowETBT+QpIPLsf0GpuomvrXIgUAPhhizoGXi+II+tq1az/o9fpLFRUVd8S26fJZWVkLN2/enBgTE/PW/PnzF5v0b0P5HSjxp0m9WXFaBQD+NYw6C1bf+vDwcF9DQ4N+/fr19ciPm0m1osLT01N76tSpNaD3PTw8FgpD+TXSoESrUGeWnVIBgM/EiDKwJ0eiPNrS0nJsw4YNNd3d3aOscxSFhIS4V1dXpyckJGRB5jxZ7jDSbVDiW7lslriY1cgVMvjjKErgR0dH/zl06NCuFStWfOdo8HwkZVL2wYMHP3ny5AlNLonPPi5jkSpMfyb9AhjAadMIlsBjrndmZ2fnnThxos9UwEyUMzIynj9y5EgB1gb3ExK/xBuTTSczBQCeC/ZnsDTnCR6f9YMbN25QiNMoOjras7W1tcjb2ztcfijXRKzpwjaaQgBPU0lrI4HntOGbdzZ4AuYzt2/fvm9sbOweyyBiOidjlCr4Y6QAyrTzkqlEx9GSkpJ9zpo2BGNKfHZRUdF+1D+W24iNGFVSpxAAcxekryK9/cuXLx/FoqpWe85iBlPpvbi4uB0yBE4lHabSvyyLX2AXyhJ42nmYytPsMBcI+80ZWKZeGQsxEqtEkgJ4+3Sm9sh1Gm5SM2EqFfnWpsRSV1dXIYzbI2NWv0AqGiXXl+4Bd1ihs0XZu3fvHhgYGNBXVVUlWDTAyk7p6ekNIyMj7fIwYiVmIwWkNvo2trgHAQEBy+CghW7cuPGLvr6+L3fu3PmSJNBBP8R09erVHwVxEwrgU/AwkqQ00DFT8lamqkEICgqKKy4u1sMU7li6dKnVLvL/Pbe0tLRFaEsidi1+UlB5ng3ctBYsWLBV6GRxFnJ4yjIj7CX36uvrS1NTU+uwEM3ara3Al/gaTl+EPC6Vi/hNRUhHR8dPSt5Rqbu7+3Nr1679rL+//3BBQYHyYJvFd3V1iTNkNRV4RZF2G6TkHZ36+vpG5uXlHcah59Pk5GSbj5AY3y1gi6ACisOk4UlKaJyJrBYnsuTa2trjzc3N7/r7+9N1sYo6OzsfCAN0VEB9GzwGCo0zlnV1dfVOTEzMhn3Xl5eXx1rzIBOMflRAsv8UopxhrRFoT18vL68QHCu/am9vz7FUjglGHyow6xQcHBxjKwgqwKCTRIweKHlnpZhGDfC7LP4CJhgH3QCUxzd/AmboA0kP8zNNcDt+w8ZUvHv37l+tedaSJUueFfrfpwJ0oSVLxLiN0DgjWWxsDxobG79JSUn53haXRafT+QrAOjiFDEoFg05K3tEpduoxg8FweuXKlRlJSUm1toAnpvDwcB55FTJQAdUFYMRMaXFkil34l9zc3K2RkZElV65ceWSPbCz414XxF6kAXWfpdMNwHyNmQge7skNDQ3dOnjy5PzAwMLewsLDLLmEYDJMb5ObmFiXLIeZ6FxzNGOK+IFeyk91f4enTpyNtbW3HIiIiNsHCNCmy7U1zcnKWCTIuEDu/AOn8RKLRMFbJcJ9StjRlBIN94Y40ZmZmboqNja3iScrS8dP1IyaEWt4W+kmYaYVILHA/8GGglbHKdevWqV+FHaYjOGofw811hcfZOV1fW9pxzE1wcXGJlscSq6SA+qZhJfai8nN2wNHtDhb0pt7eXoe9Qcq1lRg3hRvNkLtyytuHfAHlKVOI+UIwQxYaRolramrSmZ8LhLefJIAnRmKVSFUAHbiq8yeqNRpGiWE5XlXKs5WWlZUthu3/SHh+voxVqlKnEEuYRvTPee5czjKjxDCr2bMVnYNF9IO7fRRQAokHxIuPeCig3t4YKcAeUCIYiRrcffjwYUd8fPyHzo6PwuJ4XL9+/QAWrjILOHWmDu5SAWjHa500sBSNZoibUWKGvNnuDOKbNwFPLLytITYjUteAWIuOvNbZptQxxF1ZWXnYGWuCc57TRnjzhMFbGmIyI7MpJPbAdMpEuQzsKdc/hi+jT0tLO+NoE0tTSWsjL9h58vP45qe8YppSAQqBEmaXfAy0MlbJcJ+tXqUMUMMdlpsUIuE78JYVO89mznn7LvmUh8gL+xzKknVS6hmrZLiPETNrr1npmNG3oXsg7LCKaFobx1yzKhKhBE3sFnA+mCFuI4IyBuyWzYjb/MHQh+lFN09SPIxgirxIlxhepeIWiHL41vPBFl90i4MtykOROfVXA4tAT9YJisyJP3tMu4gnA29aB2UY4V4DXg1m/FMH9gMrMSd6jwwe8PxtAPMU6JC/2/wHuyI2cMsNBRIAAAAASUVORK5CYII=\');\n}\nwx-audio > .wx-audio-default > .wx-audio-left > .wx-audio-button.pause {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABatJREFUaAXVWl1IpFUYnllZGUf3wlz6MXER1ES7s83VUDJw6KpdaSTDwMnYFSK6KNirooHullKQCNzQRjZ/wom1u9ALQ0mT1ktFdEBWXLdibaH1jwmx5zme83W+z2Hm+7bZmc8X3jl/73vO837n/z3j9aSBjo6O8lBNC7gZXAUuBxeCz4FJj8APwTHwCngaPOX1evcRZocAuhAcAt8G74KdEnWoyzpobGYIjfnBn4D/BqeLWBfr9Du1wmtXAZXnQPY9cBj8HNhEe3t7sbW1tfn19fW7m5ubD5aXl7dnZmYeUKipqel8dXV1UUlJyfmysrILFRUV9X6/n8PMSveREQYPYHgdWgsTpW0ZAPDPQ3kC/JJeCUEvLi7+NDg4+EskEvldL0sVD4VCz3Z1db1SW1v7egJj7kD/Coy4l6qelAYAfB0quQ02vno8Hr8/OTkZaWtrmzo4ODhK1Uiycp/P5x0fH28JBAKh3Nxcow3osDdaYcRCMv2kBgD8O1D+BuyTlcTn5+cj7e3t0Y2NjX+SVey0rLS09OzY2Fiwvr4+BN1cqX+A8CqM+E6mTwRnTuTIDAn+FpIC/OHh4V+9vb0fNzQ0jKYbPJtknaybbbAtCYNt35JYZJY5SNgDctj8DFEBfnd3d627u/vT4eHhP8zqTybV0dHxTH9//+f5+fkVsgX2xKuJhtMJAwCeE/Y3sBiPBF9XV/fh0tISK8kY1dTU+BYWFvo0IzgnLlontmkIATyXSq42Ajy7kl8+0+D5ldgm29aGEzFNSIwUEWQyADlc59VSGe/r6/ssU8PmGI75l20TA3LjsoTYiNEgYwjBMu6CPKuIr4/Vph+TasyQzGJkbm7ubaxO1yQEDqVyDKU9pvUe+AhpAZ7rPJbKHyjgBuKyTUwSCzESqyBhAL4+D1PXZZ6Hm9STWCpV/U5DYiEmTe+6xOwRQwiJEAq/pQCPB0VFRdf+7w7LutJJ3LG3t7dvaseOdzGMImoIXVaN8WzjNvDERkzEpnAiFJjP4OvzMhJQBTyYqbjdEDov7+/vf4+6pu0wZQcGBi7arV/JWbAFiN2Lnzcg8COFuGkVFBSo2a70UoYEhC5+OqWgJoAv+mdeXt5bWpat6M7Ozk1tc7vMIfSa0lxdXf1VxZ2ETsGz7sfRoV4sFtMxNtOAF1hAugs6jrn3lxcmDV0VDTBuRrxJaYWujFowltMA40LNa6ArUWugLBgLaYByfXjUHVaTd13UgvEcDTjVRAPodBJE74GKuzW0YHxEA+gxE0TXh4q7NbRgfEgDeIQWRL+Nirs1tGCM0YAVBZZOJxV3a2jBuEIDphVYesxU3EnIY4ETeco+jg71LBinacAUWNxueFSlx4yCTmh0dPRLJ4AoOzIy8oWTNihLbNpxmpin1H2AnrcrFJqdnf0KM901tzFiUoQ94M3GxsYPZHoC94FW9gBJnEYZoa8SBy1hGNNuIWIiNg2PwKwbIPYDdhF9lZqgK6LEpA0fYv3PAHQF94IbCikdrcXFxWdVOtsh/abEpOG4ITGbvBI9EBA3f3qJo9FoUFPIapROX81zTYzEKkgNIQ8s4qwOH2d7PPQS9/T0vKjS2QqJQXqsFYSwxCrSpsmK6yVdi7zx0APmoVuvs7Pz/Wx55+jkHRoa+jonJ+cp4gHdAV+CAcbrjckASsCI0+vcpQGw7h6CVrDwRvMCTS8xvwbLM0Fsy+KZJha+1hCbiYw5oOdCkM86V1UejWBXZmJOsA22pXkeCIOvNAmfmk4MIQWaIYZTwiemYDAY3dracsUTU1IDpBGn95FP9Yac2KfzmVUzgkssHxfCYOGGR2gQvXp0jNG3lOyh+wKosrLykmWMq3q4SYXBth+6laLtEL3hqr8a2AZuFYQhrvizR8pJbAWeKA1j6OFuATeDq8D09hWClc+Jp0ceGHn/5hWWt8C0/N3mX15C4bDnCIuAAAAAAElFTkSuQmCC\');\n}\nwx-audio > .wx-audio-default > .wx-audio-right {\n  box-sizing: border-box;\n  height: 65px;\n  margin-left: 65px;\n  padding: 11px 16.5px 13.5px 15px;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info {\n  margin-right: 70px;\n  overflow: hidden;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info > .wx-audio-name {\n  height: 22.5px;\n  line-height: 22.5px;\n  margin-bottom: 3.5px;\n  font-size: 14px;\n  color: #353535;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-info > .wx-audio-author {\n  height: 14.5px;\n  line-height: 14.5px;\n  font-size: 12px;\n  color: #888888;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n}\nwx-audio > .wx-audio-default > .wx-audio-right > .wx-audio-time {\n  margin-top: 3.5px;\n  height: 16.5px;\n  font-size: 12px;\n  color: #888888;\n  float: right;\n}\nwx-button {\n  position: relative;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 14px;\n  padding-right: 14px;\n  box-sizing: border-box;\n  font-size: 18px;\n  text-align: center;\n  text-decoration: none;\n  line-height: 2.55555556;\n  border-radius: 5px;\n  -webkit-tap-highlight-color: transparent;\n  overflow: hidden;\n  color: #000000;\n  background-color: #F8F8F8;\n}\nwx-button[hidden] {\n  display: none !important;\n}\nwx-button:after {\n  content: " ";\n  width: 200%;\n  height: 200%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  -webkit-transform: scale(0.5);\n          transform: scale(0.5);\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  box-sizing: border-box;\n  border-radius: 10px;\n}\nwx-button[type=default] {\n  color: #000000;\n  background-color: #F8F8F8;\n}\nwx-button[type=primary] {\n  color: #FFFFFF;\n  background-color: #1AAD19;\n}\nwx-button[type=warn] {\n  color: #FFFFFF;\n  background-color: #E64340;\n}\nwx-button[disabled] {\n  color: rgba(255, 255, 255, 0.6);\n}\nwx-button[disabled][type=default],\nwx-button[disabled]:not([type]) {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: #F7F7F7;\n}\nwx-button[disabled][type=primary] {\n  background-color: #9ED99D;\n}\nwx-button[disabled][type=warn] {\n  background-color: #EC8B89;\n}\nwx-button[type=primary][plain] {\n  color: #1aad19;\n  border: 1px solid #1aad19;\n  background-color: transparent;\n}\nwx-button[type=primary][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=primary][plain]:after {\n  border-width: 0;\n}\nwx-button[type=default][plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\nwx-button[type=default][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=default][plain]:after {\n  border-width: 0;\n}\nwx-button[plain] {\n  color: #353535;\n  border: 1px solid #353535;\n  background-color: transparent;\n}\nwx-button[plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[plain]:after {\n  border-width: 0;\n}\nwx-button[type=warn][plain] {\n  color: #e64340;\n  border: 1px solid #e64340;\n  background-color: transparent;\n}\nwx-button[type=warn][plain][disabled] {\n  color: rgba(0, 0, 0, 0.2);\n  border-color: rgba(0, 0, 0, 0.2);\n}\nwx-button[type=warn][plain]:after {\n  border-width: 0;\n}\nwx-button[size=mini] {\n  display: inline-block;\n  line-height: 2.3;\n  font-size: 13px;\n  padding: 0 1.34em;\n}\nwx-button[loading]:before {\n  content: " ";\n  display: inline-block;\n  width: 18px;\n  height: 18px;\n  vertical-align: middle;\n  -webkit-animation: wx-button-loading-animate 1s steps(12, end) infinite;\n          animation: wx-button-loading-animate 1s steps(12, end) infinite;\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;\n  background-size: 100%;\n}\nwx-button[loading][type=primary] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #179B16;\n}\nwx-button[loading][type=primary][plain] {\n  color: #1aad19;\n  background-color: transparent;\n}\nwx-button[loading][type=default] {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #DEDEDE;\n}\nwx-button[loading][type=default][plain] {\n  color: #353535;\n  background-color: transparent;\n}\nwx-button[loading][type=warn] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #CE3C39;\n}\nwx-button[loading][type=warn][plain] {\n  color: #e64340;\n  background-color: transparent;\n}\n@-webkit-keyframes wx-button-loading-animate {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes wx-button-loading-animate {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n            transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n            transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n.button-hover {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #DEDEDE;\n}\n.button-hover[plain] {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\n.button-hover[type=primary] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #179B16;\n}\n.button-hover[type=primary][plain] {\n  color: rgba(26, 173, 25, 0.6);\n  border-color: rgba(26, 173, 25, 0.6);\n  background-color: transparent;\n}\n.button-hover[type=default] {\n  color: rgba(0, 0, 0, 0.6);\n  background-color: #DEDEDE;\n}\n.button-hover[type=default][plain] {\n  color: rgba(53, 53, 53, 0.6);\n  border-color: rgba(53, 53, 53, 0.6);\n  background-color: transparent;\n}\n.button-hover[type=warn] {\n  color: rgba(255, 255, 255, 0.6);\n  background-color: #CE3C39;\n}\n.button-hover[type=warn][plain] {\n  color: rgba(230, 67, 64, 0.6);\n  border-color: rgba(230, 67, 64, 0.6);\n  background-color: transparent;\n}\nwx-canvas {\n  width: 300px;\n  height: 150px;\n  display: block;\n  position: relative;\n}\nwx-canvas > canvas {\n  position: absolute;\n  top: 0;\n  left: 0;\n}\nwx-checkbox {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n}\nwx-checkbox[hidden] {\n  display: none;\n}\nwx-checkbox .wx-checkbox-wrapper {\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  -webkit-align-items: center;\n          align-items: center;\n  vertical-align: middle;\n}\nwx-checkbox .wx-checkbox-input {\n  margin-right: 5px;\n  -webkit-appearance: none;\n          appearance: none;\n  outline: 0;\n  border: 1px solid #D1D1D1;\n  background-color: #FFFFFF;\n  border-radius: 3px;\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\nwx-checkbox .wx-checkbox-input.wx-checkbox-input-checked {\n  color: #09BB07;\n}\nwx-checkbox .wx-checkbox-input.wx-checkbox-input-checked:before {\n  font: normal normal normal 14px/1 "weui";\n  content: "\\EA08";\n  font-size: 22px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n  -webkit-transform: translate(-50%, -48%) scale(0.73);\n}\nwx-checkbox .wx-checkbox-input.wx-checkbox-input-disabled {\n  background-color: #E1E1E1;\n}\nwx-checkbox .wx-checkbox-input.wx-checkbox-input-disabled:before {\n  color: #ADADAD;\n}\nwx-checkbox-group {\n  display: block;\n}\nwx-checkbox-group[hidden] {\n  display: none;\n}\nwx-icon {\n  display: inline-block;\n  font-size: 0;\n}\nwx-icon[hidden] {\n  display: none;\n}\nwx-icon i {\n  font: normal normal normal 14px/1 "weui";\n}\n@font-face {\n  font-weight: normal;\n  font-style: normal;\n  font-family: "weui";\n  src: url(\'data:application/octet-stream;base64,AAEAAAALAIAAAwAwR1NVQrD+s+0AAAE4AAAAQk9TLzJAKEx+AAABfAAAAFZjbWFw65cFHQAAAhwAAAJQZ2x5ZvCRR/EAAASUAAAKtGhlYWQLKIN9AAAA4AAAADZoaGVhCCwD+gAAALwAAAAkaG10eEJo//8AAAHUAAAASGxvY2EYqhW6AAAEbAAAACZtYXhwASEAVQAAARgAAAAgbmFtZeNcHtgAAA9IAAAB5nBvc3T6bLhLAAARMAAAAOYAAQAAA+gAAABaA+j/////A+kAAQAAAAAAAAAAAAAAAAAAABIAAQAAAAEAACkCj3dfDzz1AAsD6AAAAADUER9XAAAAANQRH1f//wAAA+kD6gAAAAgAAgAAAAAAAAABAAAAEgBJAAUAAAAAAAIAAAAKAAoAAAD/AAAAAAAAAAEAAAAKAB4ALAABREZMVAAIAAQAAAAAAAAAAQAAAAFsaWdhAAgAAAABAAAAAQAEAAQAAAABAAgAAQAGAAAAAQAAAAAAAQOwAZAABQAIAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA6gHqEQPoAAAAWgPqAAAAAAABAAAAAAAAAAAAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+j//wPoAAAD6AAAAAAABQAAAAMAAAAsAAAABAAAAXQAAQAAAAAAbgADAAEAAAAsAAMACgAAAXQABABCAAAABAAEAAEAAOoR//8AAOoB//8AAAABAAQAAAABAAIAAwAEAAUABgAHAAgACQAKAAsADAANAA4ADwAQABEAAAEGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAAANwAAAAAAAAAEQAA6gEAAOoBAAAAAQAA6gIAAOoCAAAAAgAA6gMAAOoDAAAAAwAA6gQAAOoEAAAABAAA6gUAAOoFAAAABQAA6gYAAOoGAAAABgAA6gcAAOoHAAAABwAA6ggAAOoIAAAACAAA6gkAAOoJAAAACQAA6goAAOoKAAAACgAA6gsAAOoLAAAACwAA6gwAAOoMAAAADAAA6g0AAOoNAAAADQAA6g4AAOoOAAAADgAA6g8AAOoPAAAADwAA6hAAAOoQAAAAEAAA6hEAAOoRAAAAEQAAAAAARgCMANIBJgF4AcQCMgJgAqgC/ANIA6YD/gROBKAE9AVaAAAAAgAAAAADrwOtABQAKQAAASIHBgcGFBcWFxYyNzY3NjQnJicmAyInJicmNDc2NzYyFxYXFhQHBgcGAfV4Z2Q7PDw7ZGfwZmQ7PDw7ZGZ4bl5bNjc3Nlte215bNjc3NlteA608O2Rn8GdjOzw8O2Nn8GdkOzz8rzc1W17bXlw1Nzc1XF7bXls1NwAAAAACAAAAAAOzA7MAFwAtAAABIgcGBwYVFBcWFxYzMjc2NzY1NCcmJyYTBwYiLwEmNjsBETQ2OwEyFhURMzIWAe52Z2Q7PT07ZGd2fGpmOz4+O2ZpIXYOKA52Dg0XXQsHJgcLXRcNA7M+O2ZqfHZnZDs9PTtkZ3Z9aWY7Pv3wmhISmhIaARcICwsI/ukaAAMAAAAAA+UD5QAXACMALAAAASIHBgcGFRQXFhcWMzI3Njc2NTQnJicmAxQrASI1AzQ7ATIHJyImNDYyFhQGAe6Ecm9BRERBb3KEiXZxQkREQnF1aQIxAwgCQgMBIxIZGSQZGQPkREJxdomEcm9BRERBb3KEinVxQkT9HQICAWICAjEZIxkZIxkAAAAAAwAAAAADsQPkABsAKgAzAAABBgcGBwYHBjcRFBcWFxYXNjc2NzY1ESQXJicmBzMyFhUDFAYrASInAzQ2EyImNDYyFhQGAfVBQTg7LDt/IEc+bF5sbF1tPUj+2KhQQVVvNAQGDAMCJgUBCwYeDxYWHhUVA+QPEg4SDhIpCv6tj3VkST4dHT5JZHWPAVNeNRkSGPwGBP7GAgMFAToEBv5AFR8VFR8VAAAAAgAAAAADsQPkABkALgAAAQYHBgc2BREUFxYXFhc2NzY3NjURJBcmJyYTAQYvASY/ATYyHwEWNjclNjIfARYB9VVVQk+v/tFHPmxebGxdbT1I/tGvT0JVo/7VBASKAwMSAQUBcQEFAgESAgUBEQQD4xMYEhk3YP6sjnVlSD8cHD9IZXWOAVRgNxkSGP62/tkDA48EBBkCAVYCAQHlAQIQBAAAAAACAAAAAAPkA+QAFwAtAAABIgcGBwYVFBcWFxYzMjc2NzY1NCcmJyYTAQYiLwEmPwE2Mh8BFjI3ATYyHwEWAe6Ecm9BQ0NCbnODiXVxQkREQnF1kf6gAQUBowMDFgEFAYUCBQEBQwIFARUEA+NEQnF1iYNzbkJDQ0FvcoSJdXFCRP6j/qUBAagEBR4CAWYBAQENAgIVBAAAAAQAAAAAA68DrQAUACkAPwBDAAABIgcGBwYUFxYXFjI3Njc2NCcmJyYDIicmJyY0NzY3NjIXFhcWFAcGBwYTBQ4BLwEmBg8BBhYfARYyNwE+ASYiFzAfAQH1eGdkOzw8O2Rn8GZkOzw8O2RmeG5eWzY3NzZbXtteWzY3NzZbXmn+9gYSBmAGDwUDBQEGfQUQBgElBQELEBUBAQOtPDtkZ/BnYzs8PDtjZ/BnZDs8/K83NVte215cNTc3NVxe215bNTcCJt0FAQVJBQIGBAcRBoAGBQEhBQ8LBAEBAAABAAAAAAO7AzoAFwAAEy4BPwE+AR8BFjY3ATYWFycWFAcBBiInPQoGBwUHGgzLDCELAh0LHwsNCgr9uQoeCgGzCyEOCw0HCZMJAQoBvgkCCg0LHQv9sQsKAAAAAAIAAAAAA+UD5gAXACwAAAEiBwYHBhUUFxYXFjMyNzY3NjU0JyYnJhMHBi8BJicmNRM0NjsBMhYVExceAQHvhHJvQUNDQm5zg4l1cUJEREJxdVcQAwT6AwIEEAMCKwIDDsUCAQPlREJxdYmDc25CQ0NBb3KEiXVxQkT9VhwEAncCAgMGAXoCAwMC/q2FAgQAAAQAAAAAA68DrQADABgALQAzAAABMB8BAyIHBgcGFBcWFxYyNzY3NjQnJicmAyInJicmNDc2NzYyFxYXFhQHBgcGAyMVMzUjAuUBAfJ4Z2Q7PDw7ZGfwZmQ7PDw7ZGZ4bl5bNjc3Nlte215bNjc3NltemyT92QKDAQEBLDw7ZGfwZ2M7PDw7Y2fwZ2Q7PPyvNzVbXtteXDU3NzVcXtteWzU3AjH9JAAAAAMAAAAAA+QD5AAXACcAMAAAASIHBgcGFRQXFhcWMzI3Njc2NTQnJicmAzMyFhUDFAYrASImNQM0NhMiJjQ2MhYUBgHuhHJvQUNDQm5zg4l1cUJEREJxdZ42BAYMAwInAwMMBh8PFhYeFhYD40RCcXWJg3NuQkNDQW9yhIl1cUJE/vYGBf7AAgMDAgFABQb+NhYfFhYfFgAABAAAAAADwAPAAAgAEgAoAD0AAAEyNjQmIgYUFhcjFTMRIxUzNSMDIgcGBwYVFBYXFjMyNzY3NjU0Jy4BAyInJicmNDc2NzYyFxYXFhQHBgcGAfQYISEwISFRjzk5yTorhG5rPT99am+DdmhlPD4+PMyFbV5bNTc3NVte2l5bNTc3NVteAqAiLyIiLyI5Hf7EHBwCsT89a26Ed8w8Pj48ZWh2g29qffyjNzVbXtpeWzU3NzVbXtpeWzU3AAADAAAAAAOoA6gACwAgADUAAAEHJwcXBxc3FzcnNwMiBwYHBhQXFhcWMjc2NzY0JyYnJgMiJyYnJjQ3Njc2MhcWFxYUBwYHBgKOmpocmpocmpocmpq2dmZiOjs7OmJm7GZiOjs7OmJmdmtdWTQ2NjRZXdZdWTQ2NjRZXQKqmpocmpocmpocmpoBGTs6YmbsZmI6Ozs6YmbsZmI6O/zCNjRZXdZdWTQ2NjRZXdZdWTQ2AAMAAAAAA+kD6gAaAC8AMAAAAQYHBiMiJyYnJjQ3Njc2MhcWFxYVFAcGBwEHATI3Njc2NCcmJyYiBwYHBhQXFhcWMwKONUBCR21dWjU3NzVaXdpdWzU2GBcrASM5/eBXS0grKysrSEuuSkkqLCwqSUpXASMrFxg2NVtd2l1aNTc3NVpdbUdCQDX+3jkBGSsrSEuuSkkqLCwqSUquS0grKwAC//8AAAPoA+gAFAAwAAABIgcGBwYQFxYXFiA3Njc2ECcmJyYTFg4BIi8BBwYuATQ/AScmPgEWHwE3Nh4BBg8BAfSIdHFDRERDcXQBEHRxQ0REQ3F0SQoBFBsKoqgKGxMKqKIKARQbCqKoChsUAQqoA+hEQ3F0/vB0cUNERENxdAEQdHFDRP1jChsTCqiiCgEUGwqiqAobFAEKqKIKARQbCqIAAAIAAAAAA+QD5AAXADQAAAEiBwYHBhUUFxYXFjMyNzY3NjU0JyYnJhMUBiMFFxYUDwEGLwEuAT8BNh8BFhQPAQUyFh0BAe6Ecm9BQ0NCbnODiXVxQkREQnF1fwQC/pGDAQEVAwTsAgEC7AQEFAIBhAFwAgMD40RCcXWJg3NuQkNDQW9yhIl1cUJE/fYCAwuVAgQCFAQE0AIFAtEEBBQCBQGVCwMDJwAAAAUAAAAAA9QD0wAjACcANwBHAEgAAAERFAYjISImNREjIiY9ATQ2MyE1NDYzITIWHQEhMhYdARQGIyERIREHIgYVERQWOwEyNjURNCYjISIGFREUFjsBMjY1ETQmKwEDeyYb/XYbJkMJDQ0JAQYZEgEvExkBBgkNDQn9CQJc0QkNDQktCQ0NCf7sCQ0NCS0JDQ0JLQMi/TQbJiYbAswMCiwJDS4SGRkSLg0JLAoM/UwCtGsNCf5NCQ0NCQGzCQ0NCf5NCQ0NCQGzCQ0AAAAAEADGAAEAAAAAAAEABAAAAAEAAAAAAAIABwAEAAEAAAAAAAMABAALAAEAAAAAAAQABAAPAAEAAAAAAAUACwATAAEAAAAAAAYABAAeAAEAAAAAAAoAKwAiAAEAAAAAAAsAEwBNAAMAAQQJAAEACABgAAMAAQQJAAIADgBoAAMAAQQJAAMACAB2AAMAAQQJAAQACAB+AAMAAQQJAAUAFgCGAAMAAQQJAAYACACcAAMAAQQJAAoAVgCkAAMAAQQJAAsAJgD6d2V1aVJlZ3VsYXJ3ZXVpd2V1aVZlcnNpb24gMS4wd2V1aUdlbmVyYXRlZCBieSBzdmcydHRmIGZyb20gRm9udGVsbG8gcHJvamVjdC5odHRwOi8vZm9udGVsbG8uY29tAHcAZQB1AGkAUgBlAGcAdQBsAGEAcgB3AGUAdQBpAHcAZQB1AGkAVgBlAHIAcwBpAG8AbgAgADEALgAwAHcAZQB1AGkARwBlAG4AZQByAGEAdABlAGQAIABiAHkAIABzAHYAZwAyAHQAdABmACAAZgByAG8AbQAgAEYAbwBuAHQAZQBsAGwAbwAgAHAAcgBvAGoAZQBjAHQALgBoAHQAdABwADoALwAvAGYAbwBuAHQAZQBsAGwAbwAuAGMAbwBtAAAAAgAAAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAQIBAwEEAQUBBgEHAQgBCQEKAQsBDAENAQ4BDwEQAREBEgETAAZjaXJjbGUIZG93bmxvYWQEaW5mbwxzYWZlX3N1Y2Nlc3MJc2FmZV93YXJuB3N1Y2Nlc3MOc3VjY2Vzcy1jaXJjbGURc3VjY2Vzcy1uby1jaXJjbGUHd2FpdGluZw53YWl0aW5nLWNpcmNsZQR3YXJuC2luZm8tY2lyY2xlBmNhbmNlbAZzZWFyY2gFY2xlYXIEYmFjawZkZWxldGUAAAAA\') format(\'truetype\');\n}\n[class^="wx-icon-"]:before,\n[class*=" wx-icon-"]:before {\n  margin: 0;\n}\n.wx-icon-success {\n  color: #09BB07;\n}\n.wx-icon-success:before {\n  content: "\\EA06";\n}\n.wx-icon-info {\n  color: #10AEFF;\n}\n.wx-icon-info:before {\n  content: "\\EA03";\n}\n.wx-icon-warn {\n  color: #F76260;\n}\n.wx-icon-warn:before {\n  content: "\\EA0B";\n}\n.wx-icon-waiting {\n  color: #10AEFF;\n}\n.wx-icon-waiting:before {\n  content: "\\EA09";\n}\n.wx-icon-safe_success {\n  color: #09BB07;\n}\n.wx-icon-safe_success:before {\n  content: "\\EA04";\n}\n.wx-icon-safe_warn {\n  color: #FFBE00;\n}\n.wx-icon-safe_warn:before {\n  content: "\\EA05";\n}\n.wx-icon-success_circle {\n  color: #09BB07;\n}\n.wx-icon-success_circle:before {\n  content: "\\EA07";\n}\n.wx-icon-success_no_circle {\n  color: #09BB07;\n}\n.wx-icon-success_no_circle:before {\n  content: "\\EA08";\n}\n.wx-icon-waiting_circle {\n  color: #10AEFF;\n}\n.wx-icon-waiting_circle:before {\n  content: "\\EA0A";\n}\n.wx-icon-circle {\n  color: #C9C9C9;\n}\n.wx-icon-circle:before {\n  content: "\\EA01";\n}\n.wx-icon-download {\n  color: #09BB07;\n}\n.wx-icon-download:before {\n  content: "\\EA02";\n}\n.wx-icon-info_circle {\n  color: #09BB07;\n}\n.wx-icon-info_circle:before {\n  content: "\\EA0C";\n}\n.wx-icon-cancel {\n  color: #F43530;\n}\n.wx-icon-cancel:before {\n  content: "\\EA0D";\n}\n.wx-icon-search {\n  color: #B2B2B2;\n}\n.wx-icon-search:before {\n  content: "\\EA0E";\n}\n.wx-icon-clear {\n  color: #B2B2B2;\n}\n.wx-icon-clear:before {\n  content: "\\EA0F";\n}\n[class^="wx-icon-"]:before,\n[class*=" wx-icon-"]:before {\n  box-sizing: border-box;\n}\nwx-image {\n  width: 320px;\n  height: 240px;\n  display: inline-block;\n  overflow: hidden;\n}\nwx-image[hidden] {\n  display: none;\n}\nwx-image > div {\n  width: 100%;\n  height: 100%;\n}\nwx-image > img {\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  display: block;\n}\n.input-placeholder {\n  color: gray;\n}\nwx-input {\n  display: block;\n  height: 1.4rem;\n  text-overflow: clip;\n  overflow: hidden;\n  white-space: nowrap;\n  font-family: UICTFontTextStyleBody;\n  min-height: 1.4rem;\n}\nwx-input input {\n  position: relative;\n  min-height: 1.4rem;\n  border: none;\n  height: inherit;\n  width: 100%;\n  font-size: inherit;\n  font-weight: inherit;\n  font-family: UICTFontTextStyleBody;\n  color: inherit;\n  background: transparent;\n  display: inherit;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  vertical-align: middle;\n  text-align: inherit;\n  overflow: inherit;\n  white-space: inherit;\n  text-overflow: inherit;\n  -webkit-tap-highlight-color: transparent;\n  z-index: 2;\n}\nwx-input[hidden] {\n  display: none;\n}\nwx-input div {\n  position: relative;\n  min-height: 1.4rem;\n  text-overflow: inherit;\n  border: none;\n  height: inherit;\n  width: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  font-family: UICTFontTextStyleBody;\n  color: inherit;\n  background: inherit;\n  padding: 0;\n  margin: 0;\n  outline: none;\n  text-align: inherit;\n  -webkit-tap-highlight-color: transparent;\n}\nwx-input div[type=password] div {\n  color: black;\n}\nwx-input div div {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  line-height: 100%;\n  height: inherit;\n  min-height: 1.4rem;\n  white-space: nowrap;\n  text-align: inherit;\n  overflow: hidden;\n  vertical-align: middle;\n  z-index: 1;\n}\nwx-input ul {\n  position: fixed;\n  left: 0;\n  right: 0;\n  z-index: 999999;\n  padding: 0;\n  background-color: white;\n  border: 0.5px solid #cccccc;\n  max-height: 204px;\n  min-height: 51px;\n  overflow: auto;\n}\nwx-input ul li {\n  display: block;\n  padding: 10px;\n  position: relative;\n  padding: 10px 0;\n  border-bottom: 0.5px solid #cccccc;\n  margin: 0 15px;\n}\nwx-input ul li:last-child {\n  border-bottom: none;\n}\nwx-input ul li .title {\n  font-weight: bold;\n  font-size: 18px;\n  margin-right: 50px;\n}\nwx-input ul li .content {\n  font-size: 12px;\n  color: #cccccc;\n  margin-right: 50px;\n}\nwx-input ul li .del {\n  position: absolute;\n  width: 50px;\n  height: 50px;\n  line-height: 50px;\n  top: 50%;\n  right: 0;\n  margin-top: -25px;\n  text-align: center;\n}\n.wx-loading {\n  position: fixed;\n  z-index: 2000000000;\n  width: 7.6em;\n  min-height: 7.6em;\n  top: 180px;\n  left: 50%;\n  margin-left: -3.8em;\n  background: rgba(40, 40, 40, 0.75);\n  text-align: center;\n  border-radius: 5px;\n  color: #FFFFFF;\n  font-size: 16px;\n  line-height: normal;\n}\n.wx-loading-icon {\n  margin: 30px 0 10px;\n  width: 38px;\n  height: 38px;\n  vertical-align: baseline;\n  display: inline-block;\n  -webkit-animation: weuiLoading 1s steps(12, end) infinite;\n          animation: weuiLoading 1s steps(12, end) infinite;\n  background: transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=) no-repeat;\n  background-size: 100%;\n}\n.wx-loading-content {\n  margin: 0 0 15px;\n}\n.wx-loading-mask {\n  position: fixed;\n  z-index: 1000;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n@-webkit-keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\n@keyframes weuiLoading {\n  0% {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n  }\n  100% {\n    -webkit-transform: rotate3d(0, 0, 1, 360deg);\n  }\n}\nwx-map {\n  position: relative;\n  width: 300px;\n  height: 150px;\n  display: block;\n}\nwx-map > div > div > div {\n  display: none;\n}\nwx-map > div > div > div:first-child {\n  display: block;\n}\n.wx-mask {\n  position: fixed;\n  z-index: inherit;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  transition: background-color 0.3s;\n  background-color: inherit;\n}\n.wx-mask[show=false] {\n  display: none;\n}\n.wx-mask-transparent {\n  background-color: rgba(0, 0, 0, 0);\n}\nwx-mask {\n  z-index: 1000;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.6);\n}\nwx-modal .wx-modal-mask {\n  z-index: inherit;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  transition: background-color 0.3s;\n  background-color: inherit;\n  z-index: 1000;\n  position: fixed;\n  background-color: rgba(0, 0, 0, 0.6);\n  -webkit-animation: fadeIn ease .3s forwards;\n          animation: fadeIn ease .3s forwards;\n}\nwx-modal .wx-modal-dialog {\n  position: fixed;\n  z-index: 5000;\n  width: 85%;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  background-color: #FAFAFC;\n  text-align: center;\n  border-radius: 3px;\n  overflow: hidden;\n}\nwx-modal .wx-modal-dialog-hd {\n  padding: 1.2em 20px .5em;\n}\nwx-modal .wx-modal-dialog-hd strong {\n  font-weight: normal;\n  font-size: 17px;\n}\nwx-modal .wx-modal-dialog-bd {\n  text-align: left;\n  padding: 0 20px;\n  font-size: 15px;\n  color: #888;\n  word-wrap: break-word;\n  word-break: break-all;\n}\nwx-modal .wx-modal-dialog-ft {\n  position: relative;\n  line-height: 42px;\n  margin-top: 20px;\n  font-size: 17px;\n  display: -webkit-flex;\n  display: flex;\n}\nwx-modal .wx-modal-dialog-ft:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 1px;\n  border-top: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 0 0;\n          transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n          transform: scaleY(0.5);\n}\nwx-modal .wx-modal-dialog-ft a {\n  position: relative;\n  display: block;\n  -webkit-flex: 1;\n          flex: 1;\n  text-decoration: none;\n  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nwx-modal .wx-modal-dialog-ft a[hidden] {\n  display: none;\n}\nwx-modal .wx-modal-dialog-ft a:active {\n  background-color: #eee;\n}\nwx-modal .wx-modal-btn-primary {\n  color: #3CC51F;\n}\nwx-modal .wx-modal-btn-default {\n  color: #000000;\n}\nwx-modal .wx-modal-btn-default:before {\n  content: " ";\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 1px;\n  height: 100%;\n  border-right: 1px solid #D5D5D6;\n  color: #D5D5D6;\n  -webkit-transform-origin: 100% 0;\n          transform-origin: 100% 0;\n  -webkit-transform: scaleX(0.5);\n          transform: scaleX(0.5);\n}\n@media screen and (min-width: 1024px) {\n  wx-modal .wx-modal-dialog {\n    width: 35%;\n  }\n}\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\nwx-picker {\n  display: block;\n}\nwx-picker-view {\n  display: block;\n}\nwx-picker-view .wrapper {\n  display: -webkit-flex;\n  display: flex;\n  position: relative;\n  overflow: hidden;\n}\nwx-picker-view[hidden] {\n  display: none;\n}\nwx-picker-view-column {\n  -webkit-flex: 1;\n  flex: 1;\n  position: relative;\n  height: 100%;\n  overflow: hidden;\n}\n.wx-picker__mask {\n  transform: translateZ(0);\n  -webkit-transform: translateZ(0);\n}\n.wx-picker__indicator,\n.wx-picker__mask {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  z-index: 3;\n}\n.wx-picker__mask {\n  top: 0;\n  height: 100%;\n  margin: 0 auto;\n  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6)), linear-gradient(0deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.6));\n  background-position: top,bottom;\n  background-size: 100% 102px;\n  background-repeat: no-repeat;\n}\n.wx-picker__indicator {\n  height: 34px;\n  top: 102px;\n}\n.wx-picker__indicator,\n.wx-picker__mask {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  z-index: 3;\n  pointer-events: none;\n}\n.wx-picker__content {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  will-change: transform;\n}\n.wx-picker__indicator:after,\n.wx-picker__indicator:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 1px;\n  color: #e5e5e5;\n}\n.wx-picker__indicator:before {\n  top: 0;\n  border-top: 1px solid #e5e5e5;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\n.wx-picker__indicator:after {\n  bottom: 0;\n  border-bottom: 1px solid #e5e5e5;\n  -webkit-transform-origin: 0 100%;\n  transform-origin: 0 100%;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\n.wx-picker__indicator:after,\n.wx-picker__indicator:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  right: 0;\n  height: 1px;\n  color: #e5e5e5;\n}\nwx-progress {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n          align-items: center;\n}\nwx-progress[hidden] {\n  display: none;\n}\n.wx-progress-bar {\n  -webkit-flex: 1;\n          flex: 1;\n}\n.wx-progress-inner-bar {\n  width: 0;\n  height: 100%;\n}\n.wx-progress-info {\n  margin-top: 0;\n  margin-bottom: 0;\n  min-width: 2em;\n  margin-left: 15px;\n  font-size: 16px;\n}\nwx-radio {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n}\nwx-radio[hidden] {\n  display: none;\n}\nwx-radio .wx-radio-wrapper {\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  -webkit-align-items: center;\n          align-items: center;\n  vertical-align: middle;\n}\nwx-radio .wx-radio-input {\n  -webkit-appearance: none;\n          appearance: none;\n  margin-right: 5px;\n  outline: 0;\n  border: 1px solid #D1D1D1;\n  background-color: #ffffff;\n  border-radius: 50%;\n  width: 22px;\n  height: 22px;\n  position: relative;\n}\nwx-radio .wx-radio-input.wx-radio-input-checked {\n  background-color: #09BB07;\n  border-color: #09BB07;\n}\nwx-radio .wx-radio-input.wx-radio-input-checked:before {\n  font: normal normal normal 14px/1 "weui";\n  content: "\\EA08";\n  color: #ffffff;\n  font-size: 18px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n  -webkit-transform: translate(-50%, -48%) scale(0.73);\n}\nwx-radio .wx-radio-input.wx-radio-input-disabled {\n  background-color: #E1E1E1;\n  border-color: #D1D1D1;\n}\nwx-radio .wx-radio-input.wx-radio-input-disabled:before {\n  color: #ADADAD;\n}\nwx-radio-group {\n  display: block;\n}\nwx-radio-group[hidden] {\n  display: none;\n}\nwx-scroll-view {\n  display: block;\n  width: 100%;\n}\nwx-scroll-view[hidden] {\n  display: none;\n}\n.wx-scroll-view {\n  position: relative;\n  -webkit-overflow-scrolling: touch;\n  height: 100%;\n  max-height: inherit;\n}\nwx-swiper {\n  display: block;\n  height: 150px;\n}\nwx-swiper[hidden] {\n  display: none;\n}\nwx-swiper .wx-swiper-wrapper {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n}\nwx-swiper .wx-swiper-slides {\n  position: absolute;\n  left: 0;\n  top: 0;\n  right: 0;\n  bottom: 0;\n}\nwx-swiper .wx-swiper-slide-frame {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  will-change: transform;\n}\nwx-swiper .wx-swiper-dots {\n  position: absolute;\n  font-size: 0;\n}\nwx-swiper .wx-swiper-dots-horizontal {\n  left: 50%;\n  bottom: 10px;\n  text-align: center;\n  white-space: nowrap;\n  -webkit-transform: translate(-50%, 0);\n  transform: translate(-50%, 0);\n}\nwx-swiper .wx-swiper-dots-horizontal .wx-swiper-dot {\n  margin-right: 8px;\n}\nwx-swiper .wx-swiper-dots-horizontal .wx-swiper-dot:last-child {\n  margin-right: 0;\n}\nwx-swiper .wx-swiper-dots-vertical {\n  right: 10px;\n  top: 50%;\n  text-align: right;\n  -webkit-transform: translate(0, -50%);\n  transform: translate(0, -50%);\n}\nwx-swiper .wx-swiper-dots-vertical .wx-swiper-dot {\n  display: block;\n  margin-bottom: 9px;\n}\nwx-swiper .wx-swiper-dots-vertical .wx-swiper-dot:last-child {\n  margin-bottom: 0;\n}\nwx-swiper .wx-swiper-dot {\n  display: inline-block;\n  width: 8px;\n  height: 8px;\n  cursor: pointer;\n  transition-property: background-color;\n  transition-timing-function: ease;\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 50%;\n}\nwx-swiper .wx-swiper-dot-active {\n  background-color: #000000;\n}\nwx-swiper-item {\n  display: block;\n  overflow: hidden;\n  will-change: \'transform\';\n}\nwx-swiper-item[hidden] {\n  display: none;\n}\nwx-slider {\n  margin: 10px 18px;\n  padding: 0;\n  display: block;\n}\nwx-slider[hidden] {\n  display: none;\n}\nwx-slider .wx-slider-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n          align-items: center;\n  min-height: 16px;\n}\nwx-slider .wx-slider-tap-area {\n  -webkit-flex: 1;\n          flex: 1;\n  padding: 8px 0;\n}\nwx-slider .wx-slider-handle-wrapper {\n  position: relative;\n  height: 2px;\n  border-radius: 5px;\n  background-color: #e9e9e9;\n  cursor: pointer;\n  transition: background-color 0.3s ease;\n  -webkit-tap-highlight-color: transparent;\n}\nwx-slider .wx-slider-track {\n  height: 100%;\n  border-radius: 6px;\n  background-color: #1aad19;\n  transition: background-color 0.3s ease;\n}\nwx-slider .wx-slider-handle,\nwx-slider .wx-slider-thumb {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  cursor: pointer;\n  border-radius: 50%;\n  transition: border-color 0.3s ease;\n}\nwx-slider .wx-slider-handle {\n  width: 28px;\n  height: 28px;\n  margin-top: -14px;\n  margin-left: -14px;\n  background-color: transparent;\n  z-index: 3;\n}\nwx-slider .wx-slider-thumb {\n  z-index: 2;\n  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);\n}\nwx-slider .wx-slider-step {\n  position: absolute;\n  width: 100%;\n  height: 2px;\n  background: transparent;\n  z-index: 1;\n}\nwx-slider .wx-slider-value {\n  color: #888;\n  font-size: 14px;\n  margin-left: 1em;\n}\nwx-slider .wx-slider-disabled .wx-slider-track {\n  background-color: #ccc;\n}\nwx-slider .wx-slider-disabled .wx-slider-handle {\n  background-color: #FFF;\n  border-color: #ccc;\n}\n* {\n  margin: 0;\n}\nwx-switch {\n  -webkit-tap-highlight-color: transparent;\n  display: inline-block;\n}\nwx-switch[hidden] {\n  display: none;\n}\nwx-switch .wx-switch-wrapper {\n  display: -webkit-inline-flex;\n  display: inline-flex;\n  -webkit-align-items: center;\n          align-items: center;\n  vertical-align: middle;\n}\nwx-switch .wx-switch-input {\n  -webkit-appearance: none;\n          appearance: none;\n  position: relative;\n  width: 52px;\n  height: 32px;\n  margin-right: 5px;\n  border: 1px solid #DFDFDF;\n  outline: 0;\n  border-radius: 16px;\n  box-sizing: border-box;\n  background-color: #DFDFDF;\n  transition: background-color 0.1s, border 0.1s;\n}\nwx-switch .wx-switch-input:before {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 50px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FDFDFD;\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\nwx-switch .wx-switch-input:after {\n  content: " ";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 30px;\n  height: 30px;\n  border-radius: 15px;\n  background-color: #FFFFFF;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);\n  transition: -webkit-transform .3s;\n  transition: transform .3s;\n  transition: transform .3s, -webkit-transform .3s;\n}\nwx-switch .wx-switch-input.wx-switch-input-checked {\n  border-color: #04BE02;\n  background-color: #04BE02;\n}\nwx-switch .wx-switch-input.wx-switch-input-checked:before {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\nwx-switch .wx-switch-input.wx-switch-input-checked:after {\n  -webkit-transform: translateX(20px);\n          transform: translateX(20px);\n}\nwx-switch .wx-checkbox-input {\n  margin-right: 5px;\n  -webkit-appearance: none;\n          appearance: none;\n  outline: 0;\n  border: 1px solid #D1D1D1;\n  background-color: #FFFFFF;\n  border-radius: 3px;\n  width: 22px;\n  height: 22px;\n  position: relative;\n  color: #09BB07;\n}\nwx-switch .wx-checkbox-input.wx-checkbox-input-checked:before {\n  font: normal normal normal 14px/1 "weui";\n  content: "\\EA08";\n  color: inherit;\n  font-size: 22px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -48%) scale(0.73);\n  -webkit-transform: translate(-50%, -48%) scale(0.73);\n}\nwx-switch .wx-checkbox-input.wx-checkbox-input-disabled {\n  background-color: #E1E1E1;\n}\nwx-switch .wx-checkbox-input.wx-checkbox-input-disabled:before {\n  color: #ADADAD;\n}\nwx-text[selectable] {\n  user-select: text;\n  -webkit-user-select: text;\n}\n.wx-toast {\n  position: fixed;\n  z-index: 2000000000;\n  width: 7.6em;\n  min-height: 7.6em;\n  top: 180px;\n  left: 50%;\n  margin-left: -3.8em;\n  background: rgba(40, 40, 40, 0.75);\n  text-align: center;\n  border-radius: 5px;\n  color: #FFFFFF;\n  font-size: 16px;\n  line-height: normal;\n}\n.wx-toast-icon {\n  margin-top: 14px;\n  margin-bottom: 8px;\n  font-family: weui;\n  font-style: normal;\n}\n.wx-toast-content {\n  margin: 0 0 15px;\n}\n.wx-toast-mask {\n  position: fixed;\n  z-index: 1000;\n  background-color: rgba(0, 0, 0, 0.6);\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\nwx-video {\n  width: 300px;\n  height: 225px;\n  display: inline-block;\n  line-height: 0;\n  overflow: hidden;\n  position: relative;\n}\nwx-video[hidden] {\n  display: none;\n}\nwx-video .wx-video-container {\n  width: 100%;\n  height: 100%;\n  background-color: black;\n  display: inline-block;\n  position: absolute;\n  top: 0;\n  left: 0;\n}\nwx-video video {\n  width: 100%;\n  height: 100%;\n}\nwx-video .wx-video-bar {\n  height: 44px;\n  background-color: rgba(0, 0, 0, 0.5);\n  overflow: hidden;\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n          align-items: center;\n  padding: 0 10px;\n}\nwx-video .wx-video-bar.full {\n  left: 0;\n}\nwx-video .wx-video-bar.part {\n  margin: 5px;\n  border-radius: 5px;\n  height: 34px;\n}\nwx-video .wx-video-bar.none {\n  display: none;\n}\nwx-video .wx-video-bar > .wx-video-controls {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-grow: 1;\n          flex-grow: 1;\n  margin: 0 8.5px;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-control-button {\n  width: 13px;\n  height: 15px;\n  margin: 14.5px 12.5px 14.5px 0;\n  background-size: 100%;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-control-button.play {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAeCAYAAAAy2w7YAAAAAXNSR0IArs4c6QAAAWhJREFUSA1j+P///0cgBoHjQGzCQCsAtgJB/AMy5wCxGNXtQ9iBwvoA5BUCMQvVLEQxHpNzDSjkRhXLMM3GKrIeKKpEkYVYjcUu+AMo3ALE3GRZiN1MvKKPgbIRJFuG10j8koeA0gZEW4jfLIKyf4EqpgOxMEELCRpFnIJ3QGU5QMyM00LizCFa1SWgSkeslhFtBGkKVwGVy6FYSJp+klR/A6quB2JOkIWMIK0oNlOf8xBoZDE9LAI7nYn6HsBq4l96WHQEaLUpAyiOaASeAM2NgvuPBpaACt82IEYtfKls0UagecpwXyAzqGTRdaA57sjmYrAptAjUsCkGYlYMg9EFyLQI1IiZB8Ti6Obh5JNh0QmgHlOcBuKSIMGi50C18UDMiMssvOJEWPQLqKYbiHnxGkRIkoBF24DyaoTMIEoeh0W3geI+RBlArCI0iz4D+RVAzEasfqLVAQ19AcSg5LoYiKWI1kiiQgCMBLnEEcfDSgAAAABJRU5ErkJggg==\');\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-control-button.pause {\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAAAXNSR0IArs4c6QAAAFlJREFUSA3tksEKACAIQ7X//5zq98wOgQayum8QaGweHhMzG/6OujzKAymn+0LMqivu1XznWmX8/echTIyMyAgTwA72iIwwAexgj8gIE8CO3aMRbDPMaEy5BRGaKcZv8YxRAAAAAElFTkSuQmCC\');\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress-container {\n  -webkit-flex-grow: 2;\n          flex-grow: 2;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress-container > .wx-video-progress {\n  height: 2px;\n  margin: 21px 12px;\n  background-color: rgba(255, 255, 255, 0.5);\n  position: relative;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress-container > .wx-video-progress > .wx-video-progress-inner {\n  width: 100%;\n  height: 100%;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress-container > .wx-video-progress > .wx-video-ball {\n  width: 16px;\n  height: 16px;\n  padding: 14px;\n  position: absolute;\n  top: -21px;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress-container > .wx-video-progress > .wx-video-ball > .wx-video-inner {\n  width: 100%;\n  height: 100%;\n  background-color: #ffffff;\n  border-radius: 50%;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-progress-container > .wx-video-progress > .wx-video-inner {\n  width: 0;\n  height: 100%;\n  background-color: #ffffff;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-current-time,\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-duration {\n  height: 14.5px;\n  line-height: 14.5px;\n  margin-top: 15px;\n  margin-bottom: 14.5px;\n  font-size: 12px;\n  color: #cbcbcb;\n}\nwx-video .wx-video-bar > .wx-video-controls > .wx-video-live-button {\n  height: 14.5px;\n  line-height: 14.5px;\n  margin-top: 15px;\n  margin-bottom: 14.5px;\n  font-size: 12px;\n  color: #cbcbcb;\n}\nwx-video .wx-video-bar > .wx-video-danmu-btn {\n  white-space: nowrap;\n  line-height: 1;\n  padding: 2px 10px;\n  border: 1px solid #fff;\n  border-radius: 5px;\n  font-size: 13px;\n  color: #fff;\n  margin: 0 8.5px;\n}\nwx-video .wx-video-bar > .wx-video-danmu-btn.active {\n  border-color: #48c23d;\n  color: #48c23d;\n}\nwx-video .wx-video-bar > .wx-video-fullscreen {\n  width: 17px;\n  height: 17px;\n  /*margin: 13.5px 16px 13.5px 17px;*/\n  margin: 0 8.5px;\n  background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAQRJREFUWAnt1d0NwiAQB/CmS7hHX5zFxLF0Ah2hE/lg7BT4PyMJUj6Oyt299BIioZT7ARYG59wLpTXmoXOMGO/QecxtwyWW4o42AupGALkFdX1MkHxE3Q7jIbQPqNthQogpJoZkMLRlsn/gFMQEk4OoY0oQVUwNoobhQFQwgMxUKFkt0C8+Zy61d8SeR5iHWCLOwF/MCb8Tp//ex3QFsE1HlCfKFUX2OijNFMnPKD7k76YcBoL402Zh8B77+MjlXrVvwfglXA32b0MrRgxCE2nBiEJaMOIQLkYFwsGoQWoYVUgJow4pYD4Weq4ayBqfwDYQmnUK0301kITujuawu65/l2B5A4z3Qe+Ut7EBAAAAAElFTkSuQmCC\');\n  background-size: cover;\n  background-position: 50% 50%;\n  background-repeat: no-repeat;\n}\nwx-video .wx-video-danmu {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  margin-bottom: 44px;\n}\nwx-video .wx-video-danmu > .wx-video-danmu-item {\n  line-height: 1;\n  position: absolute;\n  color: #ffffff;\n  white-space: nowrap;\n  left: 100%;\n  transition: 3s linear;\n}\nwx-video .wx-video-cover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-align-items: center;\n          align-items: center;\n  background-color: rgba(1, 1, 1, 0.5);\n  z-index: 1;\n}\nwx-video .wx-video-cover .wx-video-cover-play-button {\n  width: 15px;\n  height: 15px;\n}\nwx-video .wx-video-cover .wx-video-cover-duration {\n  color: #fff;\n  font-size: 16px;\n  line-height: 1;\n  margin-top: 10px;\n}\nwx-view {\n  display: block;\n}\nwx-view[hidden] {\n  display: none;\n}\n.navigator-hover {\n  background-color: rgba(0, 0, 0, 0.1);\n  opacity: 0.7;\n}\nwx-navigator {\n  height: auto;\n  width: auto;\n  display: block;\n}\nwx-navigator[hidden] {\n  display: none;\n}\nwx-action-sheet-cancel {\n  background-color: #FFFFFF;\n  font-size: 18px;\n}\nwx-action-sheet-cancel .wx-action-sheet-middle {\n  background-color: #EFEFF4;\n  height: 6px;\n  width: 100%;\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel {\n  background-color: inherit;\n  position: relative;\n  padding: 10px 0;\n  text-align: center;\n  font-size: inherit;\n  display: block;\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel:before {\n  content: " ";\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  border-top: 1px solid #D9D9D9;\n  color: #D9D9D9;\n  -webkit-transform-origin: 0 0;\n  transform-origin: 0 0;\n  -webkit-transform: scaleY(0.5);\n  transform: scaleY(0.5);\n}\nwx-action-sheet-cancel .wx-action-sheet-cancel:active {\n  background-color: #ECECEC;\n}\n.textarea-placeholder {\n  color: grey;\n}\nwx-textarea {\n  width: 300px;\n  height: 150px;\n  display: block;\n  position: relative;\n}\nwx-textarea[hidden] {\n  display: none;\n}\nwx-textarea textarea {\n  outline: none;\n  border: none;\n  resize: none;\n  background-color: transparent;\n  line-height: 1.2;\n  z-index: 2;\n  position: absolute;\n  padding: 0;\n  font-family: inherit;\n  background: transparent;\n}\nwx-textarea .compute {\n  color: transparent;\n  top: 0;\n  z-index: 0;\n}\nwx-textarea div {\n  word-break: break-all;\n  line-height: 1.2;\n  font-family: inherit;\n  position: absolute;\n}\n/*wx-share-button {*/\n/*display: inline-block;*/\n/*line-height: 0;*/\n/*z-index: 9999999999;*/\n/*-webkit-tap-highlight-color: transparent;*/\n/*>.wx-share-button-wrapper {*/\n/*width: 36px;*/\n/*height: 36px;*/\n/*display: inline-block;*/\n/*background-size: 100% 100%;*/\n/*background-repeat: no-repeat;*/\n/*-webkit-tap-highlight-color: transparent;*/\n/*}*/\n/*}*/\nwx-contact-button {\n  display: inline-block;\n  line-height: 0;\n  z-index: 9999999999;\n}\nwx-contact-button[hidden] {\n  display: none;\n}\nwx-contact-button > .wx-contact-button-wrapper {\n  width: 18px;\n  height: 18px;\n  display: inline-block;\n  background-size: 100% 100%;\n  background-repeat: no-repeat;\n  -webkit-tap-highlight-color: transparent;\n}\nwx-movable-area {\n  display: block;\n  position: relative;\n  width: 10px;\n  height: 10px;\n}\nwx-movable-area[hidden] {\n  display: none;\n}\nwx-movable-view {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  top: 0px;\n  left: 0px;\n  position: absolute;\n}\nwx-movable-view[hidden] {\n  display: none;\n}\nwx-cover-view {\n  display: block;\n  line-height: 1.2;\n  overflow: hidden;\n  white-space: nowrap;\n  pointer-events: auto;\n}\nwx-cover-view[hidden] {\n  display: none;\n}\nwx-cover-view .wx-cover-view {\n  width: 100%;\n  height: 100%;\n  text-overflow: inherit;\n  overflow: hidden;\n  white-space: inherit;\n  -webkit-align-items: inherit;\n          align-items: inherit;\n  -webkit-justify-content: inherit;\n          justify-content: inherit;\n  -webkit-flex-direction: inherit;\n          flex-direction: inherit;\n}\nwx-cover-image {\n  display: block;\n  line-height: 1.2;\n  overflow: hidden;\n  pointer-events: auto;\n  height: 100%;\n  width: 100%;\n}\nwx-cover-image img {\n  width: 100%;\n  height: 100%;\n}\nwx-cover-image[hidden] {\n  display: none;\n}\nwx-cover-image .wx-cover-image {\n  width: 100%;\n  height: 100%;\n  text-overflow: inherit;\n  overflow: inherit;\n  white-space: nowrap;\n  -webkit-align-items: inherit;\n          align-items: inherit;\n  -webkit-justify-content: inherit;\n          justify-content: inherit;\n  -webkit-flex-direction: inherit;\n          flex-direction: inherit;\n  font-size: 0;\n}\nwx-camera {\n  position: relative;\n  width: 100%;\n  display: block;\n  overflow: hidden;\n}\nwx-camera[hidden] {\n  display: none;\n}\nwx-camera video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\nwx-live-player {\n  width: 300px;\n  height: 225px;\n  display: inline-block;\n  line-height: 0;\n  overflow: hidden;\n  position: relative;\n  background-color: black;\n}\nwx-live-player[hidden] {\n  display: none;\n}\nwx-live-player video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}\nwx-live-pusher {\n  position: relative;\n  width: 100%;\n  display: block;\n  overflow: hidden;\n  background-color: black;\n}\nwx-live-pusher[hidden] {\n  display: none;\n}\nwx-live-pusher video {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\nwx-web-view {\n  width: 100%;\n  height: 100%;\n}\nwx-web-view > div {\n  width: 100%;\n  height: 100%;\n}\nwx-ad {\n  display: block;\n  width: 100%;\n  height: 100px;\n  overflow: hidden;\n  pointer-events: auto;\n}\nwx-ad .ad_bg {\n  width: 100%;\n  height: 100%;\n}\nwx-ad .hd_label {\n  position: absolute;\n  top: 4px;\n  left: 4px;\n  width: 28px;\n  text-align: center;\n  height: 14px;\n  line-height: 14px;\n  border-radius: 2px;\n  background-color: rgba(40, 40, 40, 0.6);\n  color: #fff;\n  font-size: 11px;\n}\nwx-ad .ft_label {\n  font-size: 11px;\n  background-color: rgba(40, 40, 40, 0.6);\n  position: absolute;\n  display: block;\n  height: 17px;\n  line-height: 17px;\n  font-style: normal;\n  color: #fff;\n  padding-right: 3.5px;\n  text-align: right;\n  right: 0;\n  bottom: 0;\n}\nwx-ad .ft_label_before {\n  content: \' \';\n  display: block;\n  width: 14px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: 100%;\n  overflow: hidden;\n}\nwx-ad .ft_label_cover_wrap {\n  right: 0;\n  bottom: 0;\n  height: 17px;\n  position: absolute;\n}\nwx-ad .ft_label_cover_before {\n  display: block;\n  width: 14px;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  right: 100%;\n}\nwx-ad .ft_label_cover {\n  font-size: 11px;\n  background-color: rgba(40, 40, 40, 0.6);\n  display: block;\n  height: 17px;\n  font-style: normal;\n  color: #fff;\n  padding-right: 3px;\n  text-align: right;\n}\nwx-ad .ft_label_cover .text {\n  line-height: 17px;\n}\nwx-ad .btn_miniapp {\n  display: inline-block;\n  vertical-align: middle;\n  padding: 0 10.5px;\n  height: 22.5px;\n  line-height: 22.5px;\n  font-size: 13px;\n  border-radius: 5px;\n  text-decoration: none;\n}\nwx-ad .btn_miniapp.skin1 {\n  color: #1AAD19;\n  border: 1px solid #1AAD19;\n}\nwx-ad .btn_miniapp.skin2 {\n  color: rgba(255, 255, 255, 0.8);\n  border: 1px solid rgba(255, 255, 255, 0.8);\n}\nwx-ad .ic_miniapp {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAgZJREFUSA3tlr0vBFEUxWfQ+YjSR6XQIkgoFBpRij+BiMQfIJKlIxKtTvwNJEIhyi1UiASNSMRXUAliFbLW77Ivzr7dGWaz5d7k7Jz73rnnzr7Z2feCoBrVFfhjBXK5XAOYAWlwD97BBVgDHX+UlzeN8SC4BlGRYWIO1JTXoUQVZt3gDfwnUiUskg/RKQRnXscN8gkwDhbBE3DxARlI3smrwGTEOeavU54kYLwV3Ihuw9ckzjFbEMODKAM006J7VF25D71dTI6F+/RcBhqFB+U21rqsGnp8VPJL4UGdJpXiLG8tXvNgVjy3hMc3xqAX8RA4CMNwXwujODU9zK2DftHcw1clL00p7gLbwEUW0uLUcPtXcrEm4/UM3rqJ/PWZq91MQRQtNaJuFGnQJEq74xfJo2gzE20yuQNPsVonMvZNCxrT1L7VLtCmR+STFGe+K2I+0NzhMYykD6TJD2Pkv1MULQMXtrz2voa/ih/GWMml9nVxecE3Rjgm4hXueEnyilJ9H81Yt7G9mE72urj4dCTJ1W/8KsWdwn2qv9I7fzJxzrPbBC7sD77VN2Fsygny1xFfkzjHaADYFubCtjbb4myrsy3Ptj6NU5KiH1/ixlaAUUqdY7gdAuydr0xgVgPsuGLHlqi4YmKwMh09F4w7gL2vdnCzA9wDsAOdHewaPHk1ra5A0Qp8AStESai4b58oAAAAAElFTkSuQmCC) no-repeat center;\n  background-size: contain;\n  vertical-align: middle;\n  position: relative;\n  bottom: 1px;\n  right: 3px;\n}\nwx-ad .ic_miniapp_cover {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  position: absolute;\n  top: 50%;\n  margin-top: -7px;\n  left: 0;\n  margin-left: -2px;\n}\nwx-ad .da_container {\n  height: 100%;\n}\nwx-ad .da_container.goods {\n  position: relative;\n}\nwx-ad .da_container.brand {\n  position: relative;\n}\nwx-ad .da_container.brand .da_content {\n  height: 100%;\n}\nwx-ad .da_container.brand .brand_info {\n  height: 100%;\n  padding-left: 8px;\n}\nwx-ad .da_container.brand .btn_miniapp {\n  position: absolute;\n  top: 50%;\n  margin-top: -11.2px;\n  right: 6px;\n}\nwx-ad .brand_info {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n}\nwx-ad .brand_info .avatar {\n  margin-right: 8.5px;\n}\nwx-ad .brand_info .brand_info_title {\n  text-align: left;\n  font-size: 13px;\n  margin: 0;\n  margin-bottom: 3.5px;\n}\nwx-ad .brand_info .brand_info_desc {\n  font-size: 10px;\n  color: #888;\n  margin: 0;\n}\nwx-ad .avatar {\n  display: block;\n  width: 33px;\n  height: 33px;\n}\nwx-ad .avatar_img {\n  display: block;\n  width: 100%;\n  height: 100%;\n}\nwx-ad .avatar.radius .avatar_img {\n  border-radius: 50%;\n}\nwx-ad .info_ele {\n  display: inline-block;\n}\nwx-ad .info_ele.separate {\n  position: relative;\n  padding-right: 6px;\n  margin-right: 6px;\n  color: #888;\n}\nwx-ad .info_ele.separate:before {\n  content: \' \';\n  width: 1px;\n  height: 9px;\n  position: absolute;\n  top: 50%;\n  margin-top: -4.5px;\n  right: 0;\n  background-color: #888;\n}\nwx-ad .banner_full {\n  position: relative;\n}\nwx-ad .banner_full .da_banner_img {\n  display: block;\n  position: absolute;\n  top: 0;\n  height: 100%;\n  left: 0;\n  right: 0;\n  width: 100%;\n}\n\n/*# sourceMappingURL=wx-components.css.map */'),
wx.version = {
  updateTime: "2018.1.31 22:06:34",
  info: "",
  version: "1.9.5"
};;
window.BASE_DEVICE_WIDTH = 750, window.EPS = 1e-4, window.RPXRE = /%%\?[+-]?\d+(\.\d+)?rpx\?%%/g;
window.transformByDPR = function(e, t, n) {
   return e = e / BASE_DEVICE_WIDTH * t, e = Math.floor(e + EPS), 0 === e ? 1 === n ? 1 : .5 : e
 };
window.getNumber = function(e, t, n) {
   for (var i = 0, r = 1, o = !1, a = !1, s = 0; s < e.length; ++s) {
     var c = e[s];
     c >= "0" && c <= "9" ? o ? (r *= .1, i += (c - "0") * r) : i = 10 * i + (c - "0") : "." === c ? o = !0 : "-" === c && (a = !0)
   }
   return a && (i = -i), transformByDPR(i, t, n)
 };
window.inlineCss = function(e, t, n, i) {
   var r;
   if (r = e.match(RPXRE), r && r.forEach(function(i) {
       var r = getNumber(i, t, n),
         o = " " + r + "px ";
       e = e.replace(i, o)
     }), e) {
     var o = document.querySelector("head"),
       a = document.createElement("style");
     a.setAttribute("type", "text/css"), a.setAttribute("page", i), a.innerHTML = e, o.appendChild(a)
   }
 };
var __WAWebviewEndTime__ = Date.now();
