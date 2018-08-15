;
var __WAServiceStartTime__ = Date.now();
(function(global) {
  var WeixinJSBridge = function(e) {
    "function" == typeof logxx && logxx("jsbridge start");
    var t = "undefined" != typeof __devtoolssubcontext && __devtoolssubcontext;
    if (e.navigator && e.navigator.userAgent) {
      var n = e.navigator.userAgent;
      (n.indexOf("appservice") > -1 || n.indexOf("wechatdevtools") > -1) && (t = !0)
    }
    if (t) {
      var r = e.WeixinJSBridge;
      return delete e.WeixinJSBridge, r
    }
    var o = e.__wxConfig || {},
      i = e.hasOwnProperty("document"),
      a = o.isWK,
      c = {},
      u = 0,
      s = {},
      l = {};
    if (i) {
      var n = e.navigator.userAgent;
      !(-1 != n.indexOf("Android"))
    }
    var f = e.webkit,
      d = e.WeixinJSCore;
    "object" == typeof d && "function" != typeof d.publishHandler && (d.publishHandler = function() {}), delete e.webkit, delete e.WeixinJSCore;
    var p = JSON.parse,
      h = JSON.stringify,
      v = function(e, t) {
        if (void 0 !== e && "function" == typeof c[t] && "" !== e && null !== e) {
          try {
            e = p(e), e = WeixinNativeBuffer.unpack(e)
          } catch (t) {
            e = {}
          }
          c[t](e), delete c[t]
        }
      },
      g = function(e, t, n) {
        if (d) {
          var r = d.invokeHandler(e, t, n);
          v(r, n)
        } else {
          var o = {
            event: e,
            paramsString: t,
            callbackId: n
          };
          if (a) {
            var r = prompt("webgame_invoke", h(o));
            v(r, n)
          } else f.messageHandlers.invokeHandler.postMessage(o)
        }
      },
      _ = function(e, t, n) {
        d ? d.publishHandler(e, t, n) : f.messageHandlers.publishHandler.postMessage({
          event: e,
          paramsString: t,
          webviewIds: n
        })
      },
      y = function(e, t, n) {
        t = WeixinNativeBuffer.pack(t);
        var r = h(t || {}),
          o = ++u;
        c[o] = n, g(e, r, o)
      },
      b = function(e, t) {
        t = WeixinNativeBuffer.unpack(t);
        var n = c[e];
        "function" == typeof n && n(t), delete c[e]
      },
      m = function(e, t) {
        s[e] = t
      },
      w = function(e, t, n) {
        n = n || [], n = h(n);
        var r = "custom_event_" + e,
          o = h(t);
        _(r, o, n)
      },
      k = function(e, t) {
        l["custom_event_" + e] = t
      },
      S = function(e, t, n, r) {
        t = WeixinNativeBuffer.unpack(t);
        var o;
        "function" == typeof(o = -1 != e.indexOf("custom_event_") ? l[e] : s[e]) && o(t, n, r)
      };
    return e.WeixinJSBridge = {
      on: m,
      publish: w,
      invoke: y,
      subscribe: k,
      get invokeCallbackHandler() {
        return b
      },
      get subscribeHandler() {
        return S
      }
    }, o && o.clientDebug && (e.WeixinJSBridge = {
      on: m,
      publish: w,
      invoke: y,
      subscribe: k,
      get invokeCallbackHandler() {
        return b
      },
      get subscribeHandler() {
        return S
      }
    }), {
      on: m,
      publish: w,
      invoke: y,
      subscribe: k,
      get invokeCallbackHandler() {
        return b
      },
      get subscribeHandler() {
        return S
      }
    }
  }(this);
  ! function(e) {
    var t = e.__wxConfig || {},
      n = "undefined" != typeof __devtoolssubcontext && __devtoolssubcontext,
      r = "undefined" != typeof __clientsubcontext && __clientsubcontext,
      o = n || r,
      i = !0 === t.preload,
      a = !i && !o,
      c = [],
      u = function(t) {
        a ? void 0 !== e.__wxConfig && t(e.__wxConfig) : "function" == typeof t && c.push(t)
      },
      s = function() {
        void 0 !== e.__wxConfig && (a = !0, e.__wxConfig.onReady = u, c.forEach(function(t) {
          t(e.__wxConfig)
        }))
      };
    i && function(e) {
      void 0 !== WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
    }(function() {
      WeixinJSBridge.on("onWxConfigReady", s)
    }), e.__wxConfig = e.__wxConfig || {}, e.__wxConfig.onReady = u, e.__wxConfig.__readyHandler = s
  }(this);
  var NativeBuffer = function(e) {
      var t = e.WeixinNativeBuffer,
        n = e.getNativeBufferId,
        r = e.setNativeBuffer,
        o = e.getNativeBuffer,
        i = e.__wxConfig || {},
        a = !1;
      "android" === i.platform ? a = "function" == typeof n && "function" == typeof r && "function" == typeof o && i.nativeBufferEnabled : "ios" === i.platform && (a = null != t);
      var c = function(e) {
          if (t) return t.new(e);
          if ("function" == typeof n && "function" == typeof r) {
            var o = n(),
              i = e.slice(0);
            return r(o, i), o
          }
          return -1
        },
        u = function(e) {
          return t ? t.get(e) : "function" == typeof o ? o(e) : void 0
        },
        s = function(e) {
          t && t.useCompatibleMode(e)
        },
        l = function(e) {
          var t = {};
          return a ? t.id = c(e) : t.base64 = v(e), t
        },
        f = function(e) {
          if (null != e) return a && void 0 !== e.id ? u(e.id) : void 0 !== e.base64 ? g(e.base64) : void 0
        },
        d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        p = p || function(e) {
          for (var t, n, r = String(e), o = "", i = 0, a = d; r.charAt(0 | i) || (a = "=", i % 1); o += a.charAt(63 & t >> 8 - i % 1 * 8)) {
            if ((n = r.charCodeAt(i += .75)) > 255) throw new Error('"btoa" failed');
            t = t << 8 | n
          }
          return o
        },
        h = h || function(e) {
          var t = String(e).replace(/=+$/, ""),
            n = "";
          if (t.length % 4 == 1) throw new Error('"atob" failed');
          for (var r, o, i = 0, a = 0; o = t.charAt(a++); ~o && (r = i % 4 ? 64 * r + o : o, i++ % 4) ? n += String.fromCharCode(255 & r >> (-2 * i & 6)) : 0) o = d.indexOf(o);
          return n
        },
        v = function(e) {
          var t = "";
          const n = new Uint8Array(e),
            r = n.byteLength;
          for (var o = 0; o < r; o++) t += String.fromCharCode(n[o]);
          return p(t)
        },
        g = function(e) {
          const t = h(e),
            n = t.length,
            r = new Uint8Array(n);
          for (var o = 0; o < n; o++) r[o] = t.charCodeAt(o);
          return r.buffer
        },
        _ = function(e) {
          if (null == e) return e;
          var t = [];
          for (var n in e) {
            var r = e[n];
            if (void 0 !== r && r instanceof ArrayBuffer && void 0 !== r.byteLength) {
              var o = l(r);
              o.key = n, t.push(o)
            }
          }
          if (t.length > 0) {
            for (var i = 0; i < t.length; i++) {
              var o = t[i];
              delete e[o.key]
            }
            e.__nativeBuffers__ = t
          }
          return e
        },
        y = function(e) {
          if (null == e || null == e.__nativeBuffers__) return e;
          var t = e.__nativeBuffers__;
          delete e.__nativeBuffers__;
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            if (null != r) {
              var o = f(r);
              void 0 !== o && o instanceof ArrayBuffer && (e[r.key] = o)
            }
          }
          return e
        };
      return delete e.WeixinNativeBuffer, delete e.getNativeBufferId, delete e.setNativeBuffer, delete e.getNativeBuffer, {
        new: l,
        get: f,
        useCompatibleMode: s,
        pack: _,
        unpack: y
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
    }(),
    WeixinWorker = function(e) {
      var t = (e.__wxConfig, !1);
      if (e.navigator && e.navigator.userAgent) {
        var n = e.navigator.userAgent;
        (n.indexOf("appservice") > -1 || n.indexOf("wechatdevtools") > -1) && (t = !0)
      }
      var r = e.WeixinWorker || {},
        o = [],
        i = [],
        a = [],
        c = function(e) {
          try {
            e = WeixinNativeBuffer.pack(e), e = JSON.stringify(e), r.postMsgToAppService(e)
          } catch (e) {
            console.error(e)
          }
        },
        u = function(e, t) {
          try {
            t = WeixinNativeBuffer.pack(t), t = JSON.stringify(t), r.postMsgToWorker(e, t)
          } catch (e) {
            console.error(e)
          }
        },
        s = function(e) {
          o.push(e)
        },
        l = function(e) {
          i.push(e)
        },
        f = function(e) {
          a.push(e)
        },
        d = function(e) {
          e = WeixinNativeBuffer.unpack(e), i.forEach(function(t) {
            "function" == typeof t && t(e)
          })
        },
        p = function(e, t) {
          t = WeixinNativeBuffer.unpack(t), o.forEach(function(n) {
            "function" == typeof n && n(e, t)
          })
        },
        h = function(e) {
          a.forEach(function(t) {
            "function" == typeof t && t(e)
          })
        },
        v = {
          get appServiceMsgHandler() {
            return d
          },
          get workerMsgHandler() {
            return p
          },
          get errorHandler() {
            return h
          },
          get __workerId__() {
            return r.__workerId__
          }
        },
        g = {
          create: r.create,
          terminate: r.terminate,
          postMsgToAppService: c,
          postMsgToWorker: u,
          onWorkerMsg: s,
          onAppServiceMsg: l,
          onError: f
        };
      return t && (g.appServiceMsgHandler = v.appServiceMsgHandler, g.workerMsgHandler = v.workerMsgHandler, g.errorHandler = v.errorHandler, g.__workerId__ = v.__workerId__), e.WeixinWorker = v, g
    }(this);
  ! function(e, t, n) {
    "use strict";
    ! function(e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
          i: r,
          l: !1,
          exports: {}
        };
        return e[r].call(o.exports, o, o.exports, t), o.l = !0, o.exports
      }
      var n = {};
      t.m = e, t.c = n, t.d = function(e, n, r) {
        t.o(e, n) || Object.defineProperty(e, n, {
          configurable: !1,
          enumerable: !0,
          get: r
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
    }([function(e, t, r) {
      var o = r(3),
        i = r(30),
        a = r(14),
        c = r(11),
        u = r(16),
        s = function(e, t, r) {
          var l, f, d, p, h = e & s.F,
            v = e & s.G,
            g = e & s.S,
            _ = e & s.P,
            y = e & s.B,
            b = v ? o : g ? o[t] || (o[t] = {}) : (o[t] || {}).prototype,
            m = v ? i : i[t] || (i[t] = {}),
            w = m.prototype || (m.prototype = {});
          v && (r = t);
          for (l in r) f = !h && b && b[l] !== n, d = (f ? b : r)[l], p = y && f ? u(d, o) : _ && "function" == typeof d ? u(Function.call, d) : d, b && c(b, l, d, e & s.U), m[l] != d && a(m, l, p), _ && w[l] != d && (w[l] = d)
        };
      o.core = i, s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, e.exports = s
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
      var r = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
      "number" == typeof t && (t = r)
    }, function(e, t, n) {
      var r = n(2);
      e.exports = function(e) {
        if (!r(e)) throw TypeError(e + " is not an object!");
        return e
      }
    }, function(e, t, n) {
      var r = n(57)("wks"),
        o = n(31),
        i = n(3).Symbol,
        a = "function" == typeof i;
      (e.exports = function(e) {
        return r[e] || (r[e] = a && i[e] || (a ? i : o)("Symbol." + e))
      }).store = r
    }, function(e, t, n) {
      var r = n(4),
        o = n(79),
        i = n(24),
        a = Object.defineProperty;
      t.f = n(7) ? Object.defineProperty : function(e, t, n) {
        if (r(e), t = i(t, !0), r(n), o) try {
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
      var r = n(21),
        o = Math.min;
      e.exports = function(e) {
        return e > 0 ? o(r(e), 9007199254740991) : 0
      }
    }, function(e, t) {
      var n = {}.hasOwnProperty;
      e.exports = function(e, t) {
        return n.call(e, t)
      }
    }, function(e, t, n) {
      var r = n(0),
        o = n(1),
        i = n(26),
        a = /"/g,
        c = function(e, t, n, r) {
          var o = String(i(e)),
            c = "<" + t;
          return "" !== n && (c += " " + n + '="' + String(r).replace(a, "&quot;") + '"'), c + ">" + o + "</" + t + ">"
        };
      e.exports = function(e, t) {
        var n = {};
        n[e] = t(c), r(r.P + r.F * o(function() {
          var t = "" [e]('"');
          return t !== t.toLowerCase() || t.split('"').length > 3
        }), "String", n)
      }
    }, function(e, t, n) {
      var r = n(3),
        o = n(14),
        i = n(9),
        a = n(31)("src"),
        c = Function.toString,
        u = ("" + c).split("toString");
      n(30).inspectSource = function(e) {
        return c.call(e)
      }, (e.exports = function(e, t, n, c) {
        var s = "function" == typeof n;
        s && (i(n, "name") || o(n, "name", t)), e[t] !== n && (s && (i(n, a) || o(n, a, e[t] ? "" + e[t] : u.join(String(t)))), e === r ? e[t] = n : c ? e[t] ? e[t] = n : o(e, t, n) : (delete e[t], o(e, t, n)))
      })(Function.prototype, "toString", function() {
        return "function" == typeof this && this[a] || c.call(this)
      })
    }, function(e, t, n) {
      var r = n(42),
        o = n(26);
      e.exports = function(e) {
        return r(o(e))
      }
    }, function(e, t, n) {
      var r = n(26);
      e.exports = function(e) {
        return Object(r(e))
      }
    }, function(e, t, n) {
      var r = n(6),
        o = n(25);
      e.exports = n(7) ? function(e, t, n) {
        return r.f(e, t, o(1, n))
      } : function(e, t, n) {
        return e[t] = n, e
      }
    }, function(e, t, n) {
      var r = n(1);
      e.exports = function(e, t) {
        return !!e && r(function() {
          t ? e.call(null, function() {}, 1) : e.call(null)
        })
      }
    }, function(e, t, r) {
      var o = r(17);
      e.exports = function(e, t, r) {
        if (o(e), t === n) return e;
        switch (r) {
          case 1:
            return function(n) {
              return e.call(t, n)
            };
          case 2:
            return function(n, r) {
              return e.call(t, n, r)
            };
          case 3:
            return function(n, r, o) {
              return e.call(t, n, r, o)
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
      var r = n(0),
        o = n(30),
        i = n(1);
      e.exports = function(e, t) {
        var n = (o.Object || {})[e] || Object[e],
          a = {};
        a[e] = t(n), r(r.S + r.F * i(function() {
          n(1)
        }), "Object", a)
      }
    }, function(e, t, r) {
      var o = r(16),
        i = r(42),
        a = r(13),
        c = r(8),
        u = r(201);
      e.exports = function(e, t) {
        var r = 1 == e,
          s = 2 == e,
          l = 3 == e,
          f = 4 == e,
          d = 6 == e,
          p = 5 == e || d,
          h = t || u;
        return function(t, u, v) {
          for (var g, _, y = a(t), b = i(y), m = o(u, v, 3), w = c(b.length), k = 0, S = r ? h(t, w) : s ? h(t, 0) : n; w > k; k++)
            if ((p || k in b) && (g = b[k], _ = m(g, k, y), e))
              if (r) S[k] = _;
              else if (_) switch (e) {
            case 3:
              return !0;
            case 5:
              return g;
            case 6:
              return k;
            case 2:
              S.push(g)
          } else if (f) return !1;
          return d ? -1 : l || f ? f : S
        }
      }
    }, function(e, t) {
      var n = {}.toString;
      e.exports = function(e) {
        return n.call(e).slice(8, -1)
      }
    }, function(e, t) {
      var n = Math.ceil,
        r = Math.floor;
      e.exports = function(e) {
        return isNaN(e = +e) ? 0 : (e > 0 ? r : n)(e)
      }
    }, function(e, t, n) {
      var r = n(47),
        o = n(25),
        i = n(12),
        a = n(24),
        c = n(9),
        u = n(79),
        s = Object.getOwnPropertyDescriptor;
      t.f = n(7) ? s : function(e, t) {
        if (e = i(e), t = a(t, !0), u) try {
          return s(e, t)
        } catch (e) {}
        if (c(e, t)) return o(!r.f.call(e, t), e[t])
      }
    }, function(e, t, r) {
      if (r(7)) {
        var o = r(37),
          i = r(3),
          a = r(1),
          c = r(0),
          u = r(52),
          s = r(76),
          l = r(16),
          f = r(40),
          d = r(25),
          p = r(14),
          h = r(39),
          v = r(21),
          g = r(8),
          _ = r(101),
          y = r(33),
          b = r(24),
          m = r(9),
          w = r(44),
          k = r(2),
          S = r(13),
          C = r(60),
          P = r(27),
          x = r(28),
          M = r(34).f,
          E = r(61),
          O = r(31),
          T = r(5),
          I = r(19),
          A = r(55),
          j = r(77),
          B = r(97),
          D = r(35),
          N = r(49),
          R = r(38),
          L = r(74),
          F = r(96),
          W = r(6),
          V = r(22),
          U = W.f,
          H = V.f,
          G = i.RangeError,
          q = i.TypeError,
          K = i.Uint8Array,
          J = Array.prototype,
          Y = s.ArrayBuffer,
          z = s.DataView,
          $ = I(0),
          X = I(2),
          Q = I(3),
          Z = I(4),
          ee = I(5),
          te = I(6),
          ne = A(!0),
          re = A(!1),
          oe = B.values,
          ie = B.keys,
          ae = B.entries,
          ce = J.lastIndexOf,
          ue = J.reduce,
          se = J.reduceRight,
          le = J.join,
          fe = J.sort,
          de = J.slice,
          pe = J.toString,
          he = J.toLocaleString,
          ve = T("iterator"),
          ge = T("toStringTag"),
          _e = O("typed_constructor"),
          ye = O("def_constructor"),
          be = u.CONSTR,
          me = u.TYPED,
          we = u.VIEW,
          ke = I(1, function(e, t) {
            return Me(j(e, e[ye]), t)
          }),
          Se = a(function() {
            return 1 === new K(new Uint16Array([1]).buffer)[0]
          }),
          Ce = !!K && !!K.prototype.set && a(function() {
            new K(1).set({})
          }),
          Pe = function(e, t) {
            var n = v(e);
            if (n < 0 || n % t) throw G("Wrong offset!");
            return n
          },
          xe = function(e) {
            if (k(e) && me in e) return e;
            throw q(e + " is not a typed array!")
          },
          Me = function(e, t) {
            if (!(k(e) && _e in e)) throw q("It is not a typed array constructor!");
            return new e(t)
          },
          Ee = function(e, t) {
            return Oe(j(e, e[ye]), t)
          },
          Oe = function(e, t) {
            for (var n = 0, r = t.length, o = Me(e, r); r > n;) o[n] = t[n++];
            return o
          },
          Te = function(e, t, n) {
            U(e, t, {
              get: function() {
                return this._d[n]
              }
            })
          },
          Ie = function(e) {
            var t, r, o, i, a, c, u = S(e),
              s = arguments.length,
              f = s > 1 ? arguments[1] : n,
              d = f !== n,
              p = E(u);
            if (p != n && !C(p)) {
              for (c = p.call(u), o = [], t = 0; !(a = c.next()).done; t++) o.push(a.value);
              u = o
            }
            for (d && s > 2 && (f = l(f, arguments[2], 2)), t = 0, r = g(u.length), i = Me(this, r); r > t; t++) i[t] = d ? f(u[t], t) : u[t];
            return i
          },
          Ae = function() {
            for (var e = 0, t = arguments.length, n = Me(this, t); t > e;) n[e] = arguments[e++];
            return n
          },
          je = !!K && a(function() {
            he.call(new K(1))
          }),
          Be = function() {
            return he.apply(je ? de.call(xe(this)) : xe(this), arguments)
          },
          De = {
            copyWithin: function(e, t) {
              return F.call(xe(this), e, t, arguments.length > 2 ? arguments[2] : n)
            },
            every: function(e) {
              return Z(xe(this), e, arguments.length > 1 ? arguments[1] : n)
            },
            fill: function(e) {
              return L.apply(xe(this), arguments)
            },
            filter: function(e) {
              return Ee(this, X(xe(this), e, arguments.length > 1 ? arguments[1] : n))
            },
            find: function(e) {
              return ee(xe(this), e, arguments.length > 1 ? arguments[1] : n)
            },
            findIndex: function(e) {
              return te(xe(this), e, arguments.length > 1 ? arguments[1] : n)
            },
            forEach: function(e) {
              $(xe(this), e, arguments.length > 1 ? arguments[1] : n)
            },
            indexOf: function(e) {
              return re(xe(this), e, arguments.length > 1 ? arguments[1] : n)
            },
            includes: function(e) {
              return ne(xe(this), e, arguments.length > 1 ? arguments[1] : n)
            },
            join: function(e) {
              return le.apply(xe(this), arguments)
            },
            lastIndexOf: function(e) {
              return ce.apply(xe(this), arguments)
            },
            map: function(e) {
              return ke(xe(this), e, arguments.length > 1 ? arguments[1] : n)
            },
            reduce: function(e) {
              return ue.apply(xe(this), arguments)
            },
            reduceRight: function(e) {
              return se.apply(xe(this), arguments)
            },
            reverse: function() {
              for (var e, t = this, n = xe(t).length, r = Math.floor(n / 2), o = 0; o < r;) e = t[o], t[o++] = t[--n], t[n] = e;
              return t
            },
            some: function(e) {
              return Q(xe(this), e, arguments.length > 1 ? arguments[1] : n)
            },
            sort: function(e) {
              return fe.call(xe(this), e)
            },
            subarray: function(e, t) {
              var r = xe(this),
                o = r.length,
                i = y(e, o);
              return new(j(r, r[ye]))(r.buffer, r.byteOffset + i * r.BYTES_PER_ELEMENT, g((t === n ? o : y(t, o)) - i))
            }
          },
          Ne = function(e, t) {
            return Ee(this, de.call(xe(this), e, t))
          },
          Re = function(e) {
            xe(this);
            var t = Pe(arguments[1], 1),
              n = this.length,
              r = S(e),
              o = g(r.length),
              i = 0;
            if (o + t > n) throw G("Wrong length!");
            for (; i < o;) this[t + i] = r[i++]
          },
          Le = {
            entries: function() {
              return ae.call(xe(this))
            },
            keys: function() {
              return ie.call(xe(this))
            },
            values: function() {
              return oe.call(xe(this))
            }
          },
          Fe = function(e, t) {
            return k(e) && e[me] && "symbol" != typeof t && t in e && String(+t) == String(t)
          },
          We = function(e, t) {
            return Fe(e, t = b(t, !0)) ? d(2, e[t]) : H(e, t)
          },
          Ve = function(e, t, n) {
            return !(Fe(e, t = b(t, !0)) && k(n) && m(n, "value")) || m(n, "get") || m(n, "set") || n.configurable || m(n, "writable") && !n.writable || m(n, "enumerable") && !n.enumerable ? U(e, t, n) : (e[t] = n.value, e)
          };
        be || (V.f = We, W.f = Ve), c(c.S + c.F * !be, "Object", {
          getOwnPropertyDescriptor: We,
          defineProperty: Ve
        }), a(function() {
          pe.call({})
        }) && (pe = he = function() {
          return le.call(this)
        });
        var Ue = h({}, De);
        h(Ue, Le), p(Ue, ve, Le.values), h(Ue, {
          slice: Ne,
          set: Re,
          constructor: function() {},
          toString: pe,
          toLocaleString: Be
        }), Te(Ue, "buffer", "b"), Te(Ue, "byteOffset", "o"), Te(Ue, "byteLength", "l"), Te(Ue, "length", "e"), U(Ue, ge, {
          get: function() {
            return this[me]
          }
        }), e.exports = function(e, t, r, s) {
          s = !!s;
          var l = e + (s ? "Clamped" : "") + "Array",
            d = "get" + e,
            h = "set" + e,
            v = i[l],
            y = v || {},
            b = v && x(v),
            m = !v || !u.ABV,
            S = {},
            C = v && v.prototype,
            E = function(e, n) {
              var r = e._d;
              return r.v[d](n * t + r.o, Se)
            },
            O = function(e, n, r) {
              var o = e._d;
              s && (r = (r = Math.round(r)) < 0 ? 0 : r > 255 ? 255 : 255 & r), o.v[h](n * t + o.o, r, Se)
            },
            T = function(e, t) {
              U(e, t, {
                get: function() {
                  return E(this, t)
                },
                set: function(e) {
                  return O(this, t, e)
                },
                enumerable: !0
              })
            };
          m ? (v = r(function(e, r, o, i) {
            f(e, v, l, "_d");
            var a, c, u, s, d = 0,
              h = 0;
            if (k(r)) {
              if (!(r instanceof Y || "ArrayBuffer" == (s = w(r)) || "SharedArrayBuffer" == s)) return me in r ? Oe(v, r) : Ie.call(v, r);
              a = r, h = Pe(o, t);
              var y = r.byteLength;
              if (i === n) {
                if (y % t) throw G("Wrong length!");
                if ((c = y - h) < 0) throw G("Wrong length!")
              } else if ((c = g(i) * t) + h > y) throw G("Wrong length!");
              u = c / t
            } else u = _(r), c = u * t, a = new Y(c);
            for (p(e, "_d", {
                b: a,
                o: h,
                l: c,
                e: u,
                v: new z(a)
              }); d < u;) T(e, d++)
          }), C = v.prototype = P(Ue), p(C, "constructor", v)) : a(function() {
            v(1)
          }) && a(function() {
            new v(-1)
          }) && N(function(e) {
            new v, new v(null), new v(1.5), new v(e)
          }, !0) || (v = r(function(e, r, o, i) {
            f(e, v, l);
            var a;
            return k(r) ? r instanceof Y || "ArrayBuffer" == (a = w(r)) || "SharedArrayBuffer" == a ? i !== n ? new y(r, Pe(o, t), i) : o !== n ? new y(r, Pe(o, t)) : new y(r) : me in r ? Oe(v, r) : Ie.call(v, r) : new y(_(r))
          }), $(b !== Function.prototype ? M(y).concat(M(b)) : M(y), function(e) {
            e in v || p(v, e, y[e])
          }), v.prototype = C, o || (C.constructor = v));
          var I = C[ve],
            A = !!I && ("values" == I.name || I.name == n),
            j = Le.values;
          p(v, _e, !0), p(C, me, l), p(C, we, !0), p(C, ye, v), (s ? new v(1)[ge] == l : ge in C) || U(C, ge, {
            get: function() {
              return l
            }
          }), S[l] = v, c(c.G + c.W + c.F * (v != y), S), c(c.S, l, {
            BYTES_PER_ELEMENT: t
          }), c(c.S + c.F * a(function() {
            y.of.call(v, 1)
          }), l, {
            from: Ie,
            of: Ae
          }), "BYTES_PER_ELEMENT" in C || p(C, "BYTES_PER_ELEMENT", t), c(c.P, l, De), R(l), c(c.P + c.F * Ce, l, {
            set: Re
          }), c(c.P + c.F * !A, l, Le), o || C.toString == pe || (C.toString = pe), c(c.P + c.F * a(function() {
            new v(1).slice()
          }), l, {
            slice: Ne
          }), c(c.P + c.F * (a(function() {
            return [1, 2].toLocaleString() != new v([1, 2]).toLocaleString()
          }) || !a(function() {
            C.toLocaleString.call([1, 2])
          })), l, {
            toLocaleString: Be
          }), D[l] = A ? I : j, o || A || p(C, ve, j)
        }
      } else e.exports = function() {}
    }, function(e, t, n) {
      var r = n(2);
      e.exports = function(e, t) {
        if (!r(e)) return e;
        var n, o;
        if (t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
        if ("function" == typeof(n = e.valueOf) && !r(o = n.call(e))) return o;
        if (!t && "function" == typeof(n = e.toString) && !r(o = n.call(e))) return o;
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
    }, function(e, t, r) {
      var o = r(4),
        i = r(81),
        a = r(58),
        c = r(56)("IE_PROTO"),
        u = function() {},
        s = function() {
          var e, t = r(53)("iframe"),
            n = a.length;
          for (t.style.display = "none", r(59).appendChild(t), t.src = "javascript:", e = t.contentWindow.document, e.open(), e.write("<script>document.F=Object<\/script>"), e.close(), s = e.F; n--;) delete s.prototype[a[n]];
          return s()
        };
      e.exports = Object.create || function(e, t) {
        var r;
        return null !== e ? (u.prototype = o(e), r = new u, u.prototype = null, r[c] = e) : r = s(), t === n ? r : i(r, t)
      }
    }, function(e, t, n) {
      var r = n(9),
        o = n(13),
        i = n(56)("IE_PROTO"),
        a = Object.prototype;
      e.exports = Object.getPrototypeOf || function(e) {
        return e = o(e), r(e, i) ? e[i] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? a : null
      }
    }, function(e, t, n) {
      var r = n(31)("meta"),
        o = n(2),
        i = n(9),
        a = n(6).f,
        c = 0,
        u = Object.isExtensible || function() {
          return !0
        },
        s = !n(1)(function() {
          return u(Object.preventExtensions({}))
        }),
        l = function(e) {
          a(e, r, {
            value: {
              i: "O" + ++c,
              w: {}
            }
          })
        },
        f = function(e, t) {
          if (!o(e)) return "symbol" == typeof e ? e : ("string" == typeof e ? "S" : "P") + e;
          if (!i(e, r)) {
            if (!u(e)) return "F";
            if (!t) return "E";
            l(e)
          }
          return e[r].i
        },
        d = function(e, t) {
          if (!i(e, r)) {
            if (!u(e)) return !0;
            if (!t) return !1;
            l(e)
          }
          return e[r].w
        },
        p = function(e) {
          return s && h.NEED && u(e) && !i(e, r) && l(e), e
        },
        h = e.exports = {
          KEY: r,
          NEED: !1,
          fastKey: f,
          getWeak: d,
          onFreeze: p
        }
    }, function(t, n) {
      var r = t.exports = {
        version: "2.5.1"
      };
      "number" == typeof e && (e = r)
    }, function(e, t) {
      var r = 0,
        o = Math.random();
      e.exports = function(e) {
        return "Symbol(".concat(e === n ? "" : e, ")_", (++r + o).toString(36))
      }
    }, function(e, t, n) {
      var r = n(80),
        o = n(58);
      e.exports = Object.keys || function(e) {
        return r(e, o)
      }
    }, function(e, t, n) {
      var r = n(21),
        o = Math.max,
        i = Math.min;
      e.exports = function(e, t) {
        return e = r(e), e < 0 ? o(e + t, 0) : i(e, t)
      }
    }, function(e, t, n) {
      var r = n(80),
        o = n(58).concat("length", "prototype");
      t.f = Object.getOwnPropertyNames || function(e) {
        return r(e, o)
      }
    }, function(e, t) {
      e.exports = {}
    }, function(e, t, n) {
      var r = n(6).f,
        o = n(9),
        i = n(5)("toStringTag");
      e.exports = function(e, t, n) {
        e && !o(e = n ? e : e.prototype, i) && r(e, i, {
          configurable: !0,
          value: t
        })
      }
    }, function(e, t) {
      e.exports = !1
    }, function(e, t, n) {
      var r = n(3),
        o = n(6),
        i = n(7),
        a = n(5)("species");
      e.exports = function(e) {
        var t = r[e];
        i && t && !t[a] && o.f(t, a, {
          configurable: !0,
          get: function() {
            return this
          }
        })
      }
    }, function(e, t, n) {
      var r = n(11);
      e.exports = function(e, t, n) {
        for (var o in t) r(e, o, t[o], n);
        return e
      }
    }, function(e, t) {
      e.exports = function(e, t, r, o) {
        if (!(e instanceof t) || o !== n && o in e) throw TypeError(r + ": incorrect invocation!");
        return e
      }
    }, function(e, t, n) {
      var r = n(2);
      e.exports = function(e, t) {
        if (!r(e) || e._t !== t) throw TypeError("Incompatible receiver, " + t + " required!");
        return e
      }
    }, function(e, t, n) {
      var r = n(20);
      e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
        return "String" == r(e) ? e.split("") : Object(e)
      }
    }, function(e, t, n) {
      var r = n(16),
        o = n(82),
        i = n(60),
        a = n(4),
        c = n(8),
        u = n(61),
        s = {},
        l = {},
        t = e.exports = function(e, t, n, f, d) {
          var p, h, v, g, _ = d ? function() {
              return e
            } : u(e),
            y = r(n, f, t ? 2 : 1),
            b = 0;
          if ("function" != typeof _) throw TypeError(e + " is not iterable!");
          if (i(_)) {
            for (p = c(e.length); p > b; b++)
              if ((g = t ? y(a(h = e[b])[0], h[1]) : y(e[b])) === s || g === l) return g
          } else
            for (v = _.call(e); !(h = v.next()).done;)
              if ((g = o(v, y, h.value, t)) === s || g === l) return g
        };
      t.BREAK = s, t.RETURN = l
    }, function(e, t, r) {
      var o = r(20),
        i = r(5)("toStringTag"),
        a = "Arguments" == o(function() {
          return arguments
        }()),
        c = function(e, t) {
          try {
            return e[t]
          } catch (e) {}
        };
      e.exports = function(e) {
        var t, r, u;
        return e === n ? "Undefined" : null === e ? "Null" : "string" == typeof(r = c(t = Object(e), i)) ? r : a ? o(t) : "Object" == (u = o(t)) && "function" == typeof t.callee ? "Arguments" : u
      }
    }, function(e, t, r) {
      var o = r(5)("unscopables"),
        i = Array.prototype;
      i[o] == n && r(14)(i, o, {}), e.exports = function(e) {
        i[o][e] = !0
      }
    }, function(e, t) {
      t.f = Object.getOwnPropertySymbols
    }, function(e, t) {
      t.f = {}.propertyIsEnumerable
    }, function(e, t, n) {
      var r = n(0),
        o = n(26),
        i = n(1),
        a = n(66),
        c = "[" + a + "]",
        u = "​",
        s = RegExp("^" + c + c + "*"),
        l = RegExp(c + c + "*$"),
        f = function(e, t, n) {
          var o = {},
            c = i(function() {
              return !!a[e]() || u[e]() != u
            }),
            s = o[e] = c ? t(d) : a[e];
          n && (o[n] = s), r(r.P + r.F * c, "String", o)
        },
        d = f.trim = function(e, t) {
          return e = String(o(e)), 1 & t && (e = e.replace(s, "")), 2 & t && (e = e.replace(l, "")), e
        };
      e.exports = f
    }, function(e, t, n) {
      var r = n(5)("iterator"),
        o = !1;
      try {
        var i = [7][r]();
        i.return = function() {
          o = !0
        }, Array.from(i, function() {
          throw 2
        })
      } catch (e) {}
      e.exports = function(e, t) {
        if (!t && !o) return !1;
        var n = !1;
        try {
          var i = [7],
            a = i[r]();
          a.next = function() {
            return {
              done: n = !0
            }
          }, i[r] = function() {
            return a
          }, e(i)
        } catch (e) {}
        return n
      }
    }, function(e, t, n) {
      var r = n(14),
        o = n(11),
        i = n(1),
        a = n(26),
        c = n(5);
      e.exports = function(e, t, n) {
        var u = c(e),
          s = n(a, u, "" [e]),
          l = s[0],
          f = s[1];
        i(function() {
          var t = {};
          return t[u] = function() {
            return 7
          }, 7 != "" [e](t)
        }) && (o(String.prototype, e, l), r(RegExp.prototype, u, 2 == t ? function(e, t) {
          return f.call(e, this, t)
        } : function(e) {
          return f.call(e, this)
        }))
      }
    }, function(e, t, r) {
      var o = r(3),
        i = r(0),
        a = r(11),
        c = r(39),
        u = r(29),
        s = r(43),
        l = r(40),
        f = r(2),
        d = r(1),
        p = r(49),
        h = r(36),
        v = r(67);
      e.exports = function(e, t, r, g, _, y) {
        var b = o[e],
          m = b,
          w = _ ? "set" : "add",
          k = m && m.prototype,
          S = {},
          C = function(e) {
            var t = k[e];
            a(k, e, "delete" == e ? function(e) {
              return !(y && !f(e)) && t.call(this, 0 === e ? 0 : e)
            } : "has" == e ? function(e) {
              return !(y && !f(e)) && t.call(this, 0 === e ? 0 : e)
            } : "get" == e ? function(e) {
              return y && !f(e) ? n : t.call(this, 0 === e ? 0 : e)
            } : "add" == e ? function(e) {
              return t.call(this, 0 === e ? 0 : e), this
            } : function(e, n) {
              return t.call(this, 0 === e ? 0 : e, n), this
            })
          };
        if ("function" == typeof m && (y || k.forEach && !d(function() {
            (new m).entries().next()
          }))) {
          var P = new m,
            x = P[w](y ? {} : -0, 1) != P,
            M = d(function() {
              P.has(1)
            }),
            E = p(function(e) {
              new m(e)
            }),
            O = !y && d(function() {
              for (var e = new m, t = 5; t--;) e[w](t, t);
              return !e.has(-0)
            });
          E || (m = t(function(t, r) {
            l(t, m, e);
            var o = v(new b, t, m);
            return r != n && s(r, _, o[w], o), o
          }), m.prototype = k, k.constructor = m), (M || O) && (C("delete"), C("has"), _ && C("get")), (O || x) && C(w), y && k.clear && delete k.clear
        } else m = g.getConstructor(t, e, _, w), c(m.prototype, r), u.NEED = !0;
        return h(m, e), S[e] = m, i(i.G + i.W + i.F * (m != b), S), y || g.setStrong(m, e, _), m
      }
    }, function(e, t, n) {
      for (var r, o = n(3), i = n(14), a = n(31), c = a("typed_array"), u = a("view"), s = !(!o.ArrayBuffer || !o.DataView), l = s, f = 0, d = "Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array".split(","); f < 9;)(r = o[d[f++]]) ? (i(r.prototype, c, !0), i(r.prototype, u, !0)) : l = !1;
      e.exports = {
        ABV: s,
        CONSTR: l,
        TYPED: c,
        VIEW: u
      }
    }, function(e, t, n) {
      var r = n(2),
        o = n(3).document,
        i = r(o) && r(o.createElement);
      e.exports = function(e) {
        return i ? o.createElement(e) : {}
      }
    }, function(e, t, n) {
      var r = n(32),
        o = n(46),
        i = n(47),
        a = n(13),
        c = n(42),
        u = Object.assign;
      e.exports = !u || n(1)(function() {
        var e = {},
          t = {},
          n = Symbol(),
          r = "abcdefghijklmnopqrst";
        return e[n] = 7, r.split("").forEach(function(e) {
          t[e] = e
        }), 7 != u({}, e)[n] || Object.keys(u({}, t)).join("") != r
      }) ? function(e, t) {
        for (var n = a(e), u = arguments.length, s = 1, l = o.f, f = i.f; u > s;)
          for (var d, p = c(arguments[s++]), h = l ? r(p).concat(l(p)) : r(p), v = h.length, g = 0; v > g;) f.call(p, d = h[g++]) && (n[d] = p[d]);
        return n
      } : u
    }, function(e, t, n) {
      var r = n(12),
        o = n(8),
        i = n(33);
      e.exports = function(e) {
        return function(t, n, a) {
          var c, u = r(t),
            s = o(u.length),
            l = i(a, s);
          if (e && n != n) {
            for (; s > l;)
              if ((c = u[l++]) != c) return !0
          } else
            for (; s > l; l++)
              if ((e || l in u) && u[l] === n) return e || l || 0;
          return !e && -1
        }
      }
    }, function(e, t, n) {
      var r = n(57)("keys"),
        o = n(31);
      e.exports = function(e) {
        return r[e] || (r[e] = o(e))
      }
    }, function(e, t, n) {
      var r = n(3),
        o = r["__core-js_shared__"] || (r["__core-js_shared__"] = {});
      e.exports = function(e) {
        return o[e] || (o[e] = {})
      }
    }, function(e, t) {
      e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }, function(e, t, n) {
      var r = n(3).document;
      e.exports = r && r.documentElement
    }, function(e, t, r) {
      var o = r(35),
        i = r(5)("iterator"),
        a = Array.prototype;
      e.exports = function(e) {
        return e !== n && (o.Array === e || a[i] === e)
      }
    }, function(e, t, r) {
      var o = r(44),
        i = r(5)("iterator"),
        a = r(35);
      e.exports = r(30).getIteratorMethod = function(e) {
        if (e != n) return e[i] || e["@@iterator"] || a[o(e)]
      }
    }, function(e, t, n) {
      var r = n(27),
        o = n(25),
        i = n(36),
        a = {};
      n(14)(a, n(5)("iterator"), function() {
        return this
      }), e.exports = function(e, t, n) {
        e.prototype = r(a, {
          next: o(1, n)
        }), i(e, t + " Iterator")
      }
    }, function(e, t) {
      e.exports = function(e, t) {
        return {
          value: t,
          done: !!e
        }
      }
    }, function(e, t, n) {
      var r = n(20);
      e.exports = Array.isArray || function(e) {
        return "Array" == r(e)
      }
    }, function(e, t, r) {
      var o = r(2),
        i = r(4),
        a = function(e, t) {
          if (i(e), !o(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
        };
      e.exports = {
        set: Object.setPrototypeOf || ("__proto__" in {} ? function(e, t, n) {
          try {
            n = r(16)(Function.call, r(22).f(Object.prototype, "__proto__").set, 2), n(e, []), t = !(e instanceof Array)
          } catch (e) {
            t = !0
          }
          return function(e, r) {
            return a(e, r), t ? e.__proto__ = r : n(e, r), e
          }
        }({}, !1) : n),
        check: a
      }
    }, function(e, t) {
      e.exports = "\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"
    }, function(e, t, n) {
      var r = n(2),
        o = n(65).set;
      e.exports = function(e, t, n) {
        var i, a = t.constructor;
        return a !== n && "function" == typeof a && (i = a.prototype) !== n.prototype && r(i) && o && o(e, i), e
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
    }, function(e, t, r) {
      var o = r(37),
        i = r(0),
        a = r(11),
        c = r(14),
        u = r(9),
        s = r(35),
        l = r(62),
        f = r(36),
        d = r(28),
        p = r(5)("iterator"),
        h = !([].keys && "next" in [].keys()),
        v = function() {
          return this
        };
      e.exports = function(e, t, r, g, _, y, b) {
        l(r, t, g);
        var m, w, k, S = function(e) {
            if (!h && e in M) return M[e];
            switch (e) {
              case "keys":
              case "values":
                return function() {
                  return new r(this, e)
                }
            }
            return function() {
              return new r(this, e)
            }
          },
          C = t + " Iterator",
          P = "values" == _,
          x = !1,
          M = e.prototype,
          E = M[p] || M["@@iterator"] || _ && M[_],
          O = E || S(_),
          T = _ ? P ? S("entries") : O : n,
          I = "Array" == t ? M.entries || E : E;
        if (I && (k = d(I.call(new e))) !== Object.prototype && k.next && (f(k, C, !0), o || u(k, p) || c(k, p, v)), P && E && "values" !== E.name && (x = !0, O = function() {
            return E.call(this)
          }), o && !b || !h && !x && M[p] || c(M, p, O), s[t] = O, s[C] = v, _)
          if (m = {
              values: P ? O : S("values"),
              keys: y ? O : S("keys"),
              entries: T
            }, b)
            for (w in m) w in M || a(M, w, m[w]);
          else i(i.P + i.F * (h || x), t, m);
        return m
      }
    }, function(e, t, n) {
      var r = n(72),
        o = n(26);
      e.exports = function(e, t, n) {
        if (r(t)) throw TypeError("String#" + n + " doesn't accept regex!");
        return String(o(e))
      }
    }, function(e, t, r) {
      var o = r(2),
        i = r(20),
        a = r(5)("match");
      e.exports = function(e) {
        var t;
        return o(e) && ((t = e[a]) !== n ? !!t : "RegExp" == i(e))
      }
    }, function(e, t, n) {
      var r = n(5)("match");
      e.exports = function(e) {
        var t = /./;
        try {
          "/./" [e](t)
        } catch (n) {
          try {
            return t[r] = !1, !"/./" [e](t)
          } catch (e) {}
        }
        return !0
      }
    }, function(e, t, r) {
      var o = r(13),
        i = r(33),
        a = r(8);
      e.exports = function(e) {
        for (var t = o(this), r = a(t.length), c = arguments.length, u = i(c > 1 ? arguments[1] : n, r), s = c > 2 ? arguments[2] : n, l = s === n ? r : i(s, r); l > u;) t[u++] = e;
        return t
      }
    }, function(e, t, n) {
      var r = n(4);
      e.exports = function() {
        var e = r(this),
          t = "";
        return e.global && (t += "g"), e.ignoreCase && (t += "i"), e.multiline && (t += "m"), e.unicode && (t += "u"), e.sticky && (t += "y"), t
      }
    }, function(e, t, r) {
      function o(e, t, n) {
        var r, o, i, a = Array(n),
          c = 8 * n - t - 1,
          u = (1 << c) - 1,
          s = u >> 1,
          l = 23 === t ? F(2, -24) - F(2, -77) : 0,
          f = 0,
          d = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
        for (e = L(e), e != e || e === N ? (o = e != e ? 1 : 0, r = u) : (r = W(V(e) / U), e * (i = F(2, -r)) < 1 && (r--, i *= 2), e += r + s >= 1 ? l / i : l * F(2, 1 - s), e * i >= 2 && (r++, i /= 2), r + s >= u ? (o = 0, r = u) : r + s >= 1 ? (o = (e * i - 1) * F(2, t), r += s) : (o = e * F(2, s - 1) * F(2, t), r = 0)); t >= 8; a[f++] = 255 & o, o /= 256, t -= 8);
        for (r = r << t | o, c += t; c > 0; a[f++] = 255 & r, r /= 256, c -= 8);
        return a[--f] |= 128 * d, a
      }

      function i(e, t, n) {
        var r, o = 8 * n - t - 1,
          i = (1 << o) - 1,
          a = i >> 1,
          c = o - 7,
          u = n - 1,
          s = e[u--],
          l = 127 & s;
        for (s >>= 7; c > 0; l = 256 * l + e[u], u--, c -= 8);
        for (r = l & (1 << -c) - 1, l >>= -c, c += t; c > 0; r = 256 * r + e[u], u--, c -= 8);
        if (0 === l) l = 1 - a;
        else {
          if (l === i) return r ? NaN : s ? -N : N;
          r += F(2, t), l -= a
        }
        return (s ? -1 : 1) * r * F(2, l - t)
      }

      function a(e) {
        return e[3] << 24 | e[2] << 16 | e[1] << 8 | e[0]
      }

      function c(e) {
        return [255 & e]
      }

      function u(e) {
        return [255 & e, e >> 8 & 255]
      }

      function s(e) {
        return [255 & e, e >> 8 & 255, e >> 16 & 255, e >> 24 & 255]
      }

      function l(e) {
        return o(e, 52, 8)
      }

      function f(e) {
        return o(e, 23, 4)
      }

      function d(e, t, n) {
        M(e[T], t, {
          get: function() {
            return this[n]
          }
        })
      }

      function p(e, t, n, r) {
        var o = +n,
          i = P(o);
        if (i + t > e[G]) throw D(I);
        var a = e[H]._b,
          c = i + e[q],
          u = a.slice(c, c + t);
        return r ? u : u.reverse()
      }

      function h(e, t, n, r, o, i) {
        var a = +n,
          c = P(a);
        if (c + t > e[G]) throw D(I);
        for (var u = e[H]._b, s = c + e[q], l = r(+o), f = 0; f < t; f++) u[s + f] = l[i ? f : t - f - 1]
      }
      var v = r(3),
        g = r(7),
        _ = r(37),
        y = r(52),
        b = r(14),
        m = r(39),
        w = r(1),
        k = r(40),
        S = r(21),
        C = r(8),
        P = r(101),
        x = r(34).f,
        M = r(6).f,
        E = r(74),
        O = r(36),
        T = "prototype",
        I = "Wrong index!",
        A = v.ArrayBuffer,
        j = v.DataView,
        B = v.Math,
        D = v.RangeError,
        N = v.Infinity,
        R = A,
        L = B.abs,
        F = B.pow,
        W = B.floor,
        V = B.log,
        U = B.LN2,
        H = g ? "_b" : "buffer",
        G = g ? "_l" : "byteLength",
        q = g ? "_o" : "byteOffset";
      if (y.ABV) {
        if (!w(function() {
            A(1)
          }) || !w(function() {
            new A(-1)
          }) || w(function() {
            return new A, new A(1.5), new A(NaN), "ArrayBuffer" != A.name
          })) {
          A = function(e) {
            return k(this, A), new R(P(e))
          };
          for (var K, J = A[T] = R[T], Y = x(R), z = 0; Y.length > z;)(K = Y[z++]) in A || b(A, K, R[K]);
          _ || (J.constructor = A)
        }
        var $ = new j(new A(2)),
          X = j[T].setInt8;
        $.setInt8(0, 2147483648), $.setInt8(1, 2147483649), !$.getInt8(0) && $.getInt8(1) || m(j[T], {
          setInt8: function(e, t) {
            X.call(this, e, t << 24 >> 24)
          },
          setUint8: function(e, t) {
            X.call(this, e, t << 24 >> 24)
          }
        }, !0)
      } else A = function(e) {
        k(this, A, "ArrayBuffer");
        var t = P(e);
        this._b = E.call(Array(t), 0), this[G] = t
      }, j = function(e, t, r) {
        k(this, j, "DataView"), k(e, A, "DataView");
        var o = e[G],
          i = S(t);
        if (i < 0 || i > o) throw D("Wrong offset!");
        if (r = r === n ? o - i : C(r), i + r > o) throw D("Wrong length!");
        this[H] = e, this[q] = i, this[G] = r
      }, g && (d(A, "byteLength", "_l"), d(j, "buffer", "_b"), d(j, "byteLength", "_l"), d(j, "byteOffset", "_o")), m(j[T], {
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
          return i(p(this, 4, e, arguments[1]), 23, 4)
        },
        getFloat64: function(e) {
          return i(p(this, 8, e, arguments[1]), 52, 8)
        },
        setInt8: function(e, t) {
          h(this, 1, e, c, t)
        },
        setUint8: function(e, t) {
          h(this, 1, e, c, t)
        },
        setInt16: function(e, t) {
          h(this, 2, e, u, t, arguments[2])
        },
        setUint16: function(e, t) {
          h(this, 2, e, u, t, arguments[2])
        },
        setInt32: function(e, t) {
          h(this, 4, e, s, t, arguments[2])
        },
        setUint32: function(e, t) {
          h(this, 4, e, s, t, arguments[2])
        },
        setFloat32: function(e, t) {
          h(this, 4, e, f, t, arguments[2])
        },
        setFloat64: function(e, t) {
          h(this, 8, e, l, t, arguments[2])
        }
      });
      O(A, "ArrayBuffer"), O(j, "DataView"), b(j[T], y.VIEW, !0), t.ArrayBuffer = A, t.DataView = j
    }, function(e, t, r) {
      var o = r(4),
        i = r(17),
        a = r(5)("species");
      e.exports = function(e, t) {
        var r, c = o(e).constructor;
        return c === n || (r = o(c)[a]) == n ? t : i(r)
      }
    }, function(e, t) {
      var n = !0;
      try {
        new Proxy({}, {});
        n = !1
      } catch (e) {}
      var r = !1;
      "undefined" != typeof __wxConfig && void 0 !== __wxConfig.platform && "ios" === __wxConfig.platform.toLowerCase() && (r = !0), void 0 !== WeixinJSBridge && WeixinJSBridge.invoke("getSystemInfo", {}, function(e) {
        e && e.platform && "ios" === e.platform.toLowerCase() && (r = !0)
      }), e.exports = {
        needCoreJS: n,
        isIOS: r
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
      var r = n(9),
        o = n(12),
        i = n(55)(!1),
        a = n(56)("IE_PROTO");
      e.exports = function(e, t) {
        var n, c = o(e),
          u = 0,
          s = [];
        for (n in c) n != a && r(c, n) && s.push(n);
        for (; t.length > u;) r(c, n = t[u++]) && (~i(s, n) || s.push(n));
        return s
      }
    }, function(e, t, n) {
      var r = n(6),
        o = n(4),
        i = n(32);
      e.exports = n(7) ? Object.defineProperties : function(e, t) {
        o(e);
        for (var n, a = i(t), c = a.length, u = 0; c > u;) r.f(e, n = a[u++], t[n]);
        return e
      }
    }, function(e, t, r) {
      var o = r(4);
      e.exports = function(e, t, r, i) {
        try {
          return i ? t(o(r)[0], r[1]) : t(r)
        } catch (t) {
          var a = e.return;
          throw a !== n && o(a.call(e)), t
        }
      }
    }, function(e, t, n) {
      t.f = n(5)
    }, function(e, t, n) {
      var r = n(12),
        o = n(34).f,
        i = {}.toString,
        a = "object" == typeof window && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [],
        c = function(e) {
          try {
            return o(e)
          } catch (e) {
            return a.slice()
          }
        };
      e.exports.f = function(e) {
        return a && "[object Window]" == i.call(e) ? c(e) : o(r(e))
      }
    }, function(e, t, n) {
      var r = n(17),
        o = n(2),
        i = n(86),
        a = [].slice,
        c = {},
        u = function(e, t, n) {
          if (!(t in c)) {
            for (var r = [], o = 0; o < t; o++) r[o] = "a[" + o + "]";
            c[t] = Function("F,a", "return new F(" + r.join(",") + ")")
          }
          return c[t](e, n)
        };
      e.exports = Function.bind || function(e) {
        var t = r(this),
          n = a.call(arguments, 1),
          c = function() {
            var r = n.concat(a.call(arguments));
            return this instanceof c ? u(t, r.length, r) : i(t, r, e)
          };
        return o(t.prototype) && (c.prototype = t.prototype), c
      }
    }, function(e, t) {
      e.exports = function(e, t, r) {
        var o = r === n;
        switch (t.length) {
          case 0:
            return o ? e() : e.call(r);
          case 1:
            return o ? e(t[0]) : e.call(r, t[0]);
          case 2:
            return o ? e(t[0], t[1]) : e.call(r, t[0], t[1]);
          case 3:
            return o ? e(t[0], t[1], t[2]) : e.call(r, t[0], t[1], t[2]);
          case 4:
            return o ? e(t[0], t[1], t[2], t[3]) : e.call(r, t[0], t[1], t[2], t[3])
        }
        return e.apply(r, t)
      }
    }, function(e, t, n) {
      var r = n(3).parseInt,
        o = n(48).trim,
        i = n(66),
        a = /^[-+]?0[xX]/;
      e.exports = 8 !== r(i + "08") || 22 !== r(i + "0x16") ? function(e, t) {
        var n = o(String(e), 3);
        return r(n, t >>> 0 || (a.test(n) ? 16 : 10))
      } : r
    }, function(e, t, n) {
      var r = n(3).parseFloat,
        o = n(48).trim;
      e.exports = 1 / r(n(66) + "-0") != -1 / 0 ? function(e) {
        var t = o(String(e), 3),
          n = r(t);
        return 0 === n && "-" == t.charAt(0) ? -0 : n
      } : r
    }, function(e, t, n) {
      var r = n(20);
      e.exports = function(e, t) {
        if ("number" != typeof e && "Number" != r(e)) throw TypeError(t);
        return +e
      }
    }, function(e, t, n) {
      var r = n(21),
        o = n(26);
      e.exports = function(e) {
        var t = String(o(this)),
          n = "",
          i = r(e);
        if (i < 0 || i == 1 / 0) throw RangeError("Count can't be negative");
        for (; i > 0;
          (i >>>= 1) && (t += t)) 1 & i && (n += t);
        return n
      }
    }, function(e, t, n) {
      var r = n(2),
        o = Math.floor;
      e.exports = function(e) {
        return !r(e) && isFinite(e) && o(e) === e
      }
    }, function(e, t) {
      e.exports = Math.log1p || function(e) {
        return (e = +e) > -1e-8 && e < 1e-8 ? e - e * e / 2 : Math.log(1 + e)
      }
    }, function(e, t, r) {
      var o = r(21),
        i = r(26);
      e.exports = function(e) {
        return function(t, r) {
          var a, c, u = String(i(t)),
            s = o(r),
            l = u.length;
          return s < 0 || s >= l ? e ? "" : n : (a = u.charCodeAt(s), a < 55296 || a > 56319 || s + 1 === l || (c = u.charCodeAt(s + 1)) < 56320 || c > 57343 ? e ? u.charAt(s) : a : e ? u.slice(s, s + 2) : c - 56320 + (a - 55296 << 10) + 65536)
        }
      }
    }, function(e, t, n) {
      var r = n(6),
        o = n(25);
      e.exports = function(e, t, n) {
        t in e ? r.f(e, t, o(0, n)) : e[t] = n
      }
    }, function(e, t, n) {
      var r = n(17),
        o = n(13),
        i = n(42),
        a = n(8);
      e.exports = function(e, t, n, c, u) {
        r(t);
        var s = o(e),
          l = i(s),
          f = a(s.length),
          d = u ? f - 1 : 0,
          p = u ? -1 : 1;
        if (n < 2)
          for (;;) {
            if (d in l) {
              c = l[d], d += p;
              break
            }
            if (d += p, u ? d < 0 : f <= d) throw TypeError("Reduce of empty array with no initial value")
          }
        for (; u ? d >= 0 : f > d; d += p) d in l && (c = t(c, l[d], d, s));
        return c
      }
    }, function(e, t, r) {
      var o = r(13),
        i = r(33),
        a = r(8);
      e.exports = [].copyWithin || function(e, t) {
        var r = o(this),
          c = a(r.length),
          u = i(e, c),
          s = i(t, c),
          l = arguments.length > 2 ? arguments[2] : n,
          f = Math.min((l === n ? c : i(l, c)) - s, c - u),
          d = 1;
        for (s < u && u < s + f && (d = -1, s += f - 1, u += f - 1); f-- > 0;) s in r ? r[u] = r[s] : delete r[u], u += d, s += d;
        return r
      }
    }, function(e, t, r) {
      var o = r(45),
        i = r(63),
        a = r(35),
        c = r(12);
      e.exports = r(70)(Array, "Array", function(e, t) {
        this._t = c(e), this._i = 0, this._k = t
      }, function() {
        var e = this._t,
          t = this._k,
          r = this._i++;
        return !e || r >= e.length ? (this._t = n, i(1)) : "keys" == t ? i(0, r) : "values" == t ? i(0, e[r]) : i(0, [r, e[r]])
      }, "values"), a.Arguments = a.Array, o("keys"), o("values"), o("entries")
    }, function(e, t, n) {
      n(7) && "g" != /./g.flags && n(6).f(RegExp.prototype, "flags", {
        configurable: !0,
        get: n(75)
      })
    }, function(e, t, r) {
      var o = r(6).f,
        i = r(27),
        a = r(39),
        c = r(16),
        u = r(40),
        s = r(43),
        l = r(70),
        f = r(63),
        d = r(38),
        p = r(7),
        h = r(29).fastKey,
        v = r(41),
        g = p ? "_s" : "size",
        _ = function(e, t) {
          var n, r = h(t);
          if ("F" !== r) return e._i[r];
          for (n = e._f; n; n = n.n)
            if (n.k == t) return n
        };
      e.exports = {
        getConstructor: function(e, t, r, l) {
          var f = e(function(e, o) {
            u(e, f, t, "_i"), e._t = t, e._i = i(null), e._f = n, e._l = n, e[g] = 0, o != n && s(o, r, e[l], e)
          });
          return a(f.prototype, {
            clear: function() {
              for (var e = v(this, t), r = e._i, o = e._f; o; o = o.n) o.r = !0, o.p && (o.p = o.p.n = n), delete r[o.i];
              e._f = e._l = n, e[g] = 0
            },
            delete: function(e) {
              var n = v(this, t),
                r = _(n, e);
              if (r) {
                var o = r.n,
                  i = r.p;
                delete n._i[r.i], r.r = !0, i && (i.n = o), o && (o.p = i), n._f == r && (n._f = o), n._l == r && (n._l = i), n[g]--
              }
              return !!r
            },
            forEach: function(e) {
              v(this, t);
              for (var r, o = c(e, arguments.length > 1 ? arguments[1] : n, 3); r = r ? r.n : this._f;)
                for (o(r.v, r.k, this); r && r.r;) r = r.p
            },
            has: function(e) {
              return !!_(v(this, t), e)
            }
          }), p && o(f.prototype, "size", {
            get: function() {
              return v(this, t)[g]
            }
          }), f
        },
        def: function(e, t, r) {
          var o, i, a = _(e, t);
          return a ? a.v = r : (e._l = a = {
            i: i = h(t, !0),
            k: t,
            v: r,
            p: o = e._l,
            n: n,
            r: !1
          }, e._f || (e._f = a), o && (o.n = a), e[g]++, "F" !== i && (e._i[i] = a)), e
        },
        getEntry: _,
        setStrong: function(e, t, r) {
          l(e, t, function(e, r) {
            this._t = v(e, t), this._k = r, this._l = n
          }, function() {
            for (var e = this, t = e._k, r = e._l; r && r.r;) r = r.p;
            return e._t && (e._l = r = r ? r.n : e._t._f) ? "keys" == t ? f(0, r.k) : "values" == t ? f(0, r.v) : f(0, [r.k, r.v]) : (e._t = n, f(1))
          }, r ? "entries" : "values", !r, !0), d(t)
        }
      }
    }, function(e, t, r) {
      var o = r(39),
        i = r(29).getWeak,
        a = r(4),
        c = r(2),
        u = r(40),
        s = r(43),
        l = r(19),
        f = r(9),
        d = r(41),
        p = l(5),
        h = l(6),
        v = 0,
        g = function(e) {
          return e._l || (e._l = new _)
        },
        _ = function() {
          this.a = []
        },
        y = function(e, t) {
          return p(e.a, function(e) {
            return e[0] === t
          })
        };
      _.prototype = {
        get: function(e) {
          var t = y(this, e);
          if (t) return t[1]
        },
        has: function(e) {
          return !!y(this, e)
        },
        set: function(e, t) {
          var n = y(this, e);
          n ? n[1] = t : this.a.push([e, t])
        },
        delete: function(e) {
          var t = h(this.a, function(t) {
            return t[0] === e
          });
          return ~t && this.a.splice(t, 1), !!~t
        }
      }, e.exports = {
        getConstructor: function(e, t, r, a) {
          var l = e(function(e, o) {
            u(e, l, t, "_i"), e._t = t, e._i = v++, e._l = n, o != n && s(o, r, e[a], e)
          });
          return o(l.prototype, {
            delete: function(e) {
              if (!c(e)) return !1;
              var n = i(e);
              return !0 === n ? g(d(this, t)).delete(e) : n && f(n, this._i) && delete n[this._i]
            },
            has: function(e) {
              if (!c(e)) return !1;
              var n = i(e);
              return !0 === n ? g(d(this, t)).has(e) : n && f(n, this._i)
            }
          }), l
        },
        def: function(e, t, n) {
          var r = i(a(t), !0);
          return !0 === r ? g(e).set(t, n) : r[e._i] = n, e
        },
        ufstore: g
      }
    }, function(e, t, r) {
      var o = r(21),
        i = r(8);
      e.exports = function(e) {
        if (e === n) return 0;
        var t = o(e),
          r = i(t);
        if (t !== r) throw RangeError("Wrong length!");
        return r
      }
    }, function(e, t, n) {
      var r, o, i, a = n(16),
        c = n(86),
        u = n(59),
        s = n(53),
        l = n(3),
        f = l.process,
        d = l.setImmediate,
        p = l.clearImmediate,
        h = l.MessageChannel,
        v = l.Dispatch,
        g = 0,
        _ = {},
        y = function() {
          var e = +this;
          if (_.hasOwnProperty(e)) {
            var t = _[e];
            delete _[e], t()
          }
        },
        b = function(e) {
          y.call(e.data)
        };
      d && p || (d = function(e) {
        for (var t = [], n = 1; arguments.length > n;) t.push(arguments[n++]);
        return _[++g] = function() {
          c("function" == typeof e ? e : Function(e), t)
        }, r(g), g
      }, p = function(e) {
        delete _[e]
      }, "process" == n(20)(f) ? r = function(e) {
        f.nextTick(a(y, e, 1))
      } : v && v.now ? r = function(e) {
        v.now(a(y, e, 1))
      } : h ? (o = new h, i = o.port2, o.port1.onmessage = b, r = a(i.postMessage, i, 1)) : l.addEventListener && "function" == typeof postMessage && !l.importScripts ? (r = function(e) {
        l.postMessage(e + "", "*")
      }, l.addEventListener("message", b, !1)) : r = "onreadystatechange" in s("script") ? function(e) {
        u.appendChild(s("script")).onreadystatechange = function() {
          u.removeChild(this), y.call(e)
        }
      } : function(e) {
        setTimeout(a(y, e, 1), 0)
      }), e.exports = {
        set: d,
        clear: p
      }
    }, function(e, t, r) {
      function o(e) {
        var t, r;
        this.promise = new e(function(e, o) {
          if (t !== n || r !== n) throw TypeError("Bad Promise constructor");
          t = e, r = o
        }), this.resolve = i(t), this.reject = i(r)
      }
      var i = r(17);
      e.exports.f = function(e) {
        return new o(e)
      }
    }, function(e, t, n) {
      e.exports = n(105)
    }, function(e, t, r) {
      var o = r(78),
        i = o.needCoreJS || o.isIOS;
      i && "undefined" != typeof Promise && (Promise = n), r(3), o.needCoreJS && (r(106), r(109), r(112), r(113), r(114), r(115), r(116), r(117), r(118), r(119), r(120), r(121), r(122), r(123), r(124), r(125), r(126), r(128), r(129), r(130), r(131), r(132), r(133), r(134), r(135), r(136), r(137), r(138), r(139), r(140), r(141), r(142), r(143), r(144), r(145), r(146), r(147), r(148), r(149), r(150), r(151), r(152), r(153), r(154), r(156), r(157), r(158), r(159), r(160), r(161), r(162), r(163), r(164), r(165), r(166), r(167), r(168), r(169), r(170), r(171), r(172), r(173), r(174), r(175), r(176), r(177), r(178), r(179), r(180), r(181), r(182), r(183), r(184), r(185), r(186), r(187), r(188), r(189), r(191), r(192), r(194), r(195), r(196), r(197), r(198), r(199), r(200), r(203), r(204), r(205), r(206), r(207), r(208), r(209), r(210), r(211), r(212), r(213), r(214), r(215), r(97), r(216), r(217), r(98), r(218), r(219), r(220), r(221), r(222), r(223), r(224), r(225), r(226), r(227), r(228), r(229), r(230), r(231), r(232), r(233), r(234), r(235), r(236), r(237), r(238), r(239), r(240), r(241), r(242), r(243), r(244), r(245), r(246), r(247), r(249), r(250), r(251)), i && r(252)
    }, function(e, t, r) {
      function o(e) {
        var t = h(null);
        return e != n && (w(e) ? m(e, !0, function(e, n) {
          t[e] = n
        }) : p(t, e)), t
      }

      function i(e, t, n) {
        b(t);
        var r, o, i = P(e),
          a = g(i),
          c = a.length,
          u = 0;
        if (arguments.length < 3) {
          if (!c) throw TypeError("Reduce of empty object with no initial value");
          r = i[a[u++]]
        } else r = Object(n);
        for (; c > u;) M(i, o = a[u++]) && (r = t(r, i[o], o, e));
        return r
      }

      function a(e, t) {
        return (t == t ? y(e, t) : O(e, function(e) {
          return e != e
        })) !== n
      }

      function c(e, t) {
        if (M(e, t)) return e[t]
      }

      function u(e, t, n) {
        return x && t in Object ? _.f(e, t, d(0, n)) : e[t] = n, e
      }

      function s(e) {
        return C(e) && v(e) === o.prototype
      }
      var l = r(16),
        f = r(0),
        d = r(25),
        p = r(54),
        h = r(27),
        v = r(28),
        g = r(32),
        _ = r(6),
        y = r(107),
        b = r(17),
        m = r(43),
        w = r(108),
        k = r(62),
        S = r(63),
        C = r(2),
        P = r(12),
        x = r(7),
        M = r(9),
        E = function(e) {
          var t = 1 == e,
            r = 4 == e;
          return function(i, a, c) {
            var u, s, f, d = l(a, c, 3),
              p = P(i),
              h = t || 7 == e || 2 == e ? new("function" == typeof this ? this : o) : n;
            for (u in p)
              if (M(p, u) && (s = p[u], f = d(s, u, i), e))
                if (t) h[u] = f;
                else if (f) switch (e) {
              case 2:
                h[u] = s;
                break;
              case 3:
                return !0;
              case 5:
                return s;
              case 6:
                return u;
              case 7:
                h[f[0]] = f[1]
            } else if (r) return !1;
            return 3 == e || r ? r : h
          }
        },
        O = E(6),
        T = function(e) {
          return function(t) {
            return new I(t, e)
          }
        },
        I = function(e, t) {
          this._t = P(e), this._a = g(e), this._i = 0, this._k = t
        };
      k(I, "Dict", function() {
        var e, t = this,
          r = t._t,
          o = t._a,
          i = t._k;
        do {
          if (t._i >= o.length) return t._t = n, S(1)
        } while (!M(r, e = o[t._i++]));
        return "keys" == i ? S(0, e) : "values" == i ? S(0, r[e]) : S(0, [e, r[e]])
      }), o.prototype = null, f(f.G + f.F, {
        Dict: o
      }), f(f.S, "Dict", {
        keys: T("keys"),
        values: T("values"),
        entries: T("entries"),
        forEach: E(0),
        map: E(1),
        filter: E(2),
        some: E(3),
        every: E(4),
        find: E(5),
        findKey: O,
        mapPairs: E(7),
        reduce: i,
        keyOf: y,
        includes: a,
        has: M,
        get: c,
        set: u,
        isDict: s
      })
    }, function(e, t, n) {
      var r = n(32),
        o = n(12);
      e.exports = function(e, t) {
        for (var n, i = o(e), a = r(i), c = a.length, u = 0; c > u;)
          if (i[n = a[u++]] === t) return n
      }
    }, function(e, t, r) {
      var o = r(44),
        i = r(5)("iterator"),
        a = r(35);
      e.exports = r(30).isIterable = function(e) {
        var t = Object(e);
        return t[i] !== n || "@@iterator" in t || a.hasOwnProperty(o(t))
      }
    }, function(e, t, r) {
      var o = r(3),
        i = r(9),
        a = r(7),
        c = r(0),
        u = r(11),
        s = r(29).KEY,
        l = r(1),
        f = r(57),
        d = r(36),
        p = r(31),
        h = r(5),
        v = r(83),
        g = r(110),
        _ = r(111),
        y = r(64),
        b = r(4),
        m = r(12),
        w = r(24),
        k = r(25),
        S = r(27),
        C = r(84),
        P = r(22),
        x = r(6),
        M = r(32),
        E = P.f,
        O = x.f,
        T = C.f,
        I = o.Symbol,
        A = o.JSON,
        j = A && A.stringify,
        B = h("_hidden"),
        D = h("toPrimitive"),
        N = {}.propertyIsEnumerable,
        R = f("symbol-registry"),
        L = f("symbols"),
        F = f("op-symbols"),
        W = Object.prototype,
        V = "function" == typeof I,
        U = o.QObject,
        H = !U || !U.prototype || !U.prototype.findChild,
        G = a && l(function() {
          return 7 != S(O({}, "a", {
            get: function() {
              return O(this, "a", {
                value: 7
              }).a
            }
          })).a
        }) ? function(e, t, n) {
          var r = E(W, t);
          r && delete W[t], O(e, t, n), r && e !== W && O(W, t, r)
        } : O,
        q = function(e) {
          var t = L[e] = S(I.prototype);
          return t._k = e, t
        },
        K = V && "symbol" == typeof I.iterator ? function(e) {
          return "symbol" == typeof e
        } : function(e) {
          return e instanceof I
        },
        J = function(e, t, n) {
          return e === W && J(F, t, n), b(e), t = w(t, !0), b(n), i(L, t) ? (n.enumerable ? (i(e, B) && e[B][t] && (e[B][t] = !1), n = S(n, {
            enumerable: k(0, !1)
          })) : (i(e, B) || O(e, B, k(1, {})), e[B][t] = !0), G(e, t, n)) : O(e, t, n)
        },
        Y = function(e, t) {
          b(e);
          for (var n, r = _(t = m(t)), o = 0, i = r.length; i > o;) J(e, n = r[o++], t[n]);
          return e
        },
        z = function(e, t) {
          return t === n ? S(e) : Y(S(e), t)
        },
        $ = function(e) {
          var t = N.call(this, e = w(e, !0));
          return !(this === W && i(L, e) && !i(F, e)) && (!(t || !i(this, e) || !i(L, e) || i(this, B) && this[B][e]) || t)
        },
        X = function(e, t) {
          if (e = m(e), t = w(t, !0), e !== W || !i(L, t) || i(F, t)) {
            var n = E(e, t);
            return !n || !i(L, t) || i(e, B) && e[B][t] || (n.enumerable = !0), n
          }
        },
        Q = function(e) {
          for (var t, n = T(m(e)), r = [], o = 0; n.length > o;) i(L, t = n[o++]) || t == B || t == s || r.push(t);
          return r
        },
        Z = function(e) {
          for (var t, n = e === W, r = T(n ? F : m(e)), o = [], a = 0; r.length > a;) !i(L, t = r[a++]) || n && !i(W, t) || o.push(L[t]);
          return o
        };
      V || (I = function() {
        if (this instanceof I) throw TypeError("Symbol is not a constructor!");
        var e = p(arguments.length > 0 ? arguments[0] : n),
          t = function(n) {
            this === W && t.call(F, n), i(this, B) && i(this[B], e) && (this[B][e] = !1), G(this, e, k(1, n))
          };
        return a && H && G(W, e, {
          configurable: !0,
          set: t
        }), q(e)
      }, u(I.prototype, "toString", function() {
        return this._k
      }), P.f = X, x.f = J, r(34).f = C.f = Q, r(47).f = $, r(46).f = Z, a && !r(37) && u(W, "propertyIsEnumerable", $, !0), v.f = function(e) {
        return q(h(e))
      }), c(c.G + c.W + c.F * !V, {
        Symbol: I
      });
      for (var ee = "hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","), te = 0; ee.length > te;) h(ee[te++]);
      for (var ne = M(h.store), re = 0; ne.length > re;) g(ne[re++]);
      c(c.S + c.F * !V, "Symbol", {
        for: function(e) {
          return i(R, e += "") ? R[e] : R[e] = I(e)
        },
        keyFor: function(e) {
          if (!K(e)) throw TypeError(e + " is not a symbol!");
          for (var t in R)
            if (R[t] === e) return t
        },
        useSetter: function() {
          H = !0
        },
        useSimple: function() {
          H = !1
        }
      }), c(c.S + c.F * !V, "Object", {
        create: z,
        defineProperty: J,
        defineProperties: Y,
        getOwnPropertyDescriptor: X,
        getOwnPropertyNames: Q,
        getOwnPropertySymbols: Z
      }), A && c(c.S + c.F * (!V || l(function() {
        var e = I();
        return "[null]" != j([e]) || "{}" != j({
          a: e
        }) || "{}" != j(Object(e))
      })), "JSON", {
        stringify: function(e) {
          if (e !== n && !K(e)) {
            for (var t, r, o = [e], i = 1; arguments.length > i;) o.push(arguments[i++]);
            return t = o[1], "function" == typeof t && (r = t), !r && y(t) || (t = function(e, t) {
              if (r && (t = r.call(this, e, t)), !K(t)) return t
            }), o[1] = t, j.apply(A, o)
          }
        }
      }), I.prototype[D] || r(14)(I.prototype, D, I.prototype.valueOf), d(I, "Symbol"), d(Math, "Math", !0), d(o.JSON, "JSON", !0)
    }, function(e, t, n) {
      var r = n(3),
        o = n(30),
        i = n(37),
        a = n(83),
        c = n(6).f;
      e.exports = function(e) {
        var t = o.Symbol || (o.Symbol = i ? {} : r.Symbol || {});
        "_" == e.charAt(0) || e in t || c(t, e, {
          value: a.f(e)
        })
      }
    }, function(e, t, n) {
      var r = n(32),
        o = n(46),
        i = n(47);
      e.exports = function(e) {
        var t = r(e),
          n = o.f;
        if (n)
          for (var a, c = n(e), u = i.f, s = 0; c.length > s;) u.call(e, a = c[s++]) && t.push(a);
        return t
      }
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Object", {
        create: n(27)
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S + r.F * !n(7), "Object", {
        defineProperty: n(6).f
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S + r.F * !n(7), "Object", {
        defineProperties: n(81)
      })
    }, function(e, t, n) {
      var r = n(12),
        o = n(22).f;
      n(18)("getOwnPropertyDescriptor", function() {
        return function(e, t) {
          return o(r(e), t)
        }
      })
    }, function(e, t, n) {
      var r = n(13),
        o = n(28);
      n(18)("getPrototypeOf", function() {
        return function(e) {
          return o(r(e))
        }
      })
    }, function(e, t, n) {
      var r = n(13),
        o = n(32);
      n(18)("keys", function() {
        return function(e) {
          return o(r(e))
        }
      })
    }, function(e, t, n) {
      n(18)("getOwnPropertyNames", function() {
        return n(84).f
      })
    }, function(e, t, n) {
      var r = n(2),
        o = n(29).onFreeze;
      n(18)("freeze", function(e) {
        return function(t) {
          return e && r(t) ? e(o(t)) : t
        }
      })
    }, function(e, t, n) {
      var r = n(2),
        o = n(29).onFreeze;
      n(18)("seal", function(e) {
        return function(t) {
          return e && r(t) ? e(o(t)) : t
        }
      })
    }, function(e, t, n) {
      var r = n(2),
        o = n(29).onFreeze;
      n(18)("preventExtensions", function(e) {
        return function(t) {
          return e && r(t) ? e(o(t)) : t
        }
      })
    }, function(e, t, n) {
      var r = n(2);
      n(18)("isFrozen", function(e) {
        return function(t) {
          return !r(t) || !!e && e(t)
        }
      })
    }, function(e, t, n) {
      var r = n(2);
      n(18)("isSealed", function(e) {
        return function(t) {
          return !r(t) || !!e && e(t)
        }
      })
    }, function(e, t, n) {
      var r = n(2);
      n(18)("isExtensible", function(e) {
        return function(t) {
          return !!r(t) && (!e || e(t))
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S + r.F, "Object", {
        assign: n(54)
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Object", {
        is: n(127)
      })
    }, function(e, t) {
      e.exports = Object.is || function(e, t) {
        return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t
      }
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Object", {
        setPrototypeOf: n(65).set
      })
    }, function(e, t, n) {
      var r = n(44),
        o = {};
      o[n(5)("toStringTag")] = "z", o + "" != "[object z]" && n(11)(Object.prototype, "toString", function() {
        return "[object " + r(this) + "]"
      }, !0)
    }, function(e, t, n) {
      var r = n(0);
      r(r.P, "Function", {
        bind: n(85)
      })
    }, function(e, t, n) {
      var r = n(6).f,
        o = Function.prototype,
        i = /^\s*function ([^ (]*)/;
      "name" in o || n(7) && r(o, "name", {
        configurable: !0,
        get: function() {
          try {
            return ("" + this).match(i)[1]
          } catch (e) {
            return ""
          }
        }
      })
    }, function(e, t, n) {
      var r = n(2),
        o = n(28),
        i = n(5)("hasInstance"),
        a = Function.prototype;
      i in a || n(6).f(a, i, {
        value: function(e) {
          if ("function" != typeof this || !r(e)) return !1;
          if (!r(this.prototype)) return e instanceof this;
          for (; e = o(e);)
            if (this.prototype === e) return !0;
          return !1
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(87);
      r(r.G + r.F * (parseInt != o), {
        parseInt: o
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(88);
      r(r.G + r.F * (parseFloat != o), {
        parseFloat: o
      })
    }, function(e, t, n) {
      var r = n(3),
        o = n(9),
        i = n(20),
        a = n(67),
        c = n(24),
        u = n(1),
        s = n(34).f,
        l = n(22).f,
        f = n(6).f,
        d = n(48).trim,
        p = r.Number,
        h = p,
        v = p.prototype,
        g = "Number" == i(n(27)(v)),
        _ = "trim" in String.prototype,
        y = function(e) {
          var t = c(e, !1);
          if ("string" == typeof t && t.length > 2) {
            t = _ ? t.trim() : d(t, 3);
            var n, r, o, i = t.charCodeAt(0);
            if (43 === i || 45 === i) {
              if (88 === (n = t.charCodeAt(2)) || 120 === n) return NaN
            } else if (48 === i) {
              switch (t.charCodeAt(1)) {
                case 66:
                case 98:
                  r = 2, o = 49;
                  break;
                case 79:
                case 111:
                  r = 8, o = 55;
                  break;
                default:
                  return +t
              }
              for (var a, u = t.slice(2), s = 0, l = u.length; s < l; s++)
                if ((a = u.charCodeAt(s)) < 48 || a > o) return NaN;
              return parseInt(u, r)
            }
          }
          return +t
        };
      if (!p(" 0o1") || !p("0b1") || p("+0x1")) {
        p = function(e) {
          var t = arguments.length < 1 ? 0 : e,
            n = this;
          return n instanceof p && (g ? u(function() {
            v.valueOf.call(n)
          }) : "Number" != i(n)) ? a(new h(y(t)), n, p) : y(t)
        };
        for (var b, m = n(7) ? s(h) : "MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","), w = 0; m.length > w; w++) o(h, b = m[w]) && !o(p, b) && f(p, b, l(h, b));
        p.prototype = v, v.constructor = p, n(11)(r, "Number", p)
      }
    }, function(e, t, n) {
      var r = n(0),
        o = n(21),
        i = n(89),
        a = n(90),
        c = 1..toFixed,
        u = Math.floor,
        s = [0, 0, 0, 0, 0, 0],
        l = "Number.toFixed: incorrect invocation!",
        f = function(e, t) {
          for (var n = -1, r = t; ++n < 6;) r += e * s[n], s[n] = r % 1e7, r = u(r / 1e7)
        },
        d = function(e) {
          for (var t = 6, n = 0; --t >= 0;) n += s[t], s[t] = u(n / e), n = n % e * 1e7
        },
        p = function() {
          for (var e = 6, t = ""; --e >= 0;)
            if ("" !== t || 0 === e || 0 !== s[e]) {
              var n = String(s[e]);
              t = "" === t ? n : t + a.call("0", 7 - n.length) + n
            }
          return t
        },
        h = function(e, t, n) {
          return 0 === t ? n : t % 2 == 1 ? h(e, t - 1, n * e) : h(e * e, t / 2, n)
        },
        v = function(e) {
          for (var t = 0, n = e; n >= 4096;) t += 12, n /= 4096;
          for (; n >= 2;) t += 1, n /= 2;
          return t
        };
      r(r.P + r.F * (!!c && ("0.000" !== 8e-5.toFixed(3) || "1" !== .9.toFixed(0) || "1.25" !== 1.255.toFixed(2) || "1000000000000000128" !== (0xde0b6b3a7640080).toFixed(0)) || !n(1)(function() {
        c.call({})
      })), "Number", {
        toFixed: function(e) {
          var t, n, r, c, u = i(this, l),
            s = o(e),
            g = "",
            _ = "0";
          if (s < 0 || s > 20) throw RangeError(l);
          if (u != u) return "NaN";
          if (u <= -1e21 || u >= 1e21) return String(u);
          if (u < 0 && (g = "-", u = -u), u > 1e-21)
            if (t = v(u * h(2, 69, 1)) - 69, n = t < 0 ? u * h(2, -t, 1) : u / h(2, t, 1), n *= 4503599627370496, (t = 52 - t) > 0) {
              for (f(0, n), r = s; r >= 7;) f(1e7, 0), r -= 7;
              for (f(h(10, r, 1), 0), r = t - 1; r >= 23;) d(1 << 23), r -= 23;
              d(1 << r), f(1, 1), d(2), _ = p()
            } else f(0, n), f(1 << -t, 0), _ = p() + a.call("0", s);
          return s > 0 ? (c = _.length, _ = g + (c <= s ? "0." + a.call("0", s - c) + _ : _.slice(0, c - s) + "." + _.slice(c - s))) : _ = g + _, _
        }
      })
    }, function(e, t, r) {
      var o = r(0),
        i = r(1),
        a = r(89),
        c = 1..toPrecision;
      o(o.P + o.F * (i(function() {
        return "1" !== c.call(1, n)
      }) || !i(function() {
        c.call({})
      })), "Number", {
        toPrecision: function(e) {
          var t = a(this, "Number#toPrecision: incorrect invocation!");
          return e === n ? c.call(t) : c.call(t, e)
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Number", {
        EPSILON: Math.pow(2, -52)
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(3).isFinite;
      r(r.S, "Number", {
        isFinite: function(e) {
          return "number" == typeof e && o(e)
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Number", {
        isInteger: n(91)
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Number", {
        isNaN: function(e) {
          return e != e
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(91),
        i = Math.abs;
      r(r.S, "Number", {
        isSafeInteger: function(e) {
          return o(e) && i(e) <= 9007199254740991
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Number", {
        MAX_SAFE_INTEGER: 9007199254740991
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Number", {
        MIN_SAFE_INTEGER: -9007199254740991
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(88);
      r(r.S + r.F * (Number.parseFloat != o), "Number", {
        parseFloat: o
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(87);
      r(r.S + r.F * (Number.parseInt != o), "Number", {
        parseInt: o
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(92),
        i = Math.sqrt,
        a = Math.acosh;
      r(r.S + r.F * !(a && 710 == Math.floor(a(Number.MAX_VALUE)) && a(1 / 0) == 1 / 0), "Math", {
        acosh: function(e) {
          return (e = +e) < 1 ? NaN : e > 94906265.62425156 ? Math.log(e) + Math.LN2 : o(e - 1 + i(e - 1) * i(e + 1))
        }
      })
    }, function(e, t, n) {
      function r(e) {
        return isFinite(e = +e) && 0 != e ? e < 0 ? -r(-e) : Math.log(e + Math.sqrt(e * e + 1)) : e
      }
      var o = n(0),
        i = Math.asinh;
      o(o.S + o.F * !(i && 1 / i(0) > 0), "Math", {
        asinh: r
      })
    }, function(e, t, n) {
      var r = n(0),
        o = Math.atanh;
      r(r.S + r.F * !(o && 1 / o(-0) < 0), "Math", {
        atanh: function(e) {
          return 0 == (e = +e) ? e : Math.log((1 + e) / (1 - e)) / 2
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(68);
      r(r.S, "Math", {
        cbrt: function(e) {
          return o(e = +e) * Math.pow(Math.abs(e), 1 / 3)
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Math", {
        clz32: function(e) {
          return (e >>>= 0) ? 31 - Math.floor(Math.log(e + .5) * Math.LOG2E) : 32
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = Math.exp;
      r(r.S, "Math", {
        cosh: function(e) {
          return (o(e = +e) + o(-e)) / 2
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(69);
      r(r.S + r.F * (o != Math.expm1), "Math", {
        expm1: o
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Math", {
        fround: n(155)
      })
    }, function(e, t, n) {
      var r = n(68),
        o = Math.pow,
        i = o(2, -52),
        a = o(2, -23),
        c = o(2, 127) * (2 - a),
        u = o(2, -126),
        s = function(e) {
          return e + 1 / i - 1 / i
        };
      e.exports = Math.fround || function(e) {
        var t, n, o = Math.abs(e),
          l = r(e);
        return o < u ? l * s(o / u / a) * u * a : (t = (1 + a / i) * o, n = t - (t - o), n > c || n != n ? l * (1 / 0) : l * n)
      }
    }, function(e, t, n) {
      var r = n(0),
        o = Math.abs;
      r(r.S, "Math", {
        hypot: function(e, t) {
          for (var n, r, i = 0, a = 0, c = arguments.length, u = 0; a < c;) n = o(arguments[a++]), u < n ? (r = u / n, i = i * r * r + 1, u = n) : n > 0 ? (r = n / u, i += r * r) : i += n;
          return u === 1 / 0 ? 1 / 0 : u * Math.sqrt(i)
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = Math.imul;
      r(r.S + r.F * n(1)(function() {
        return -5 != o(4294967295, 5) || 2 != o.length
      }), "Math", {
        imul: function(e, t) {
          var n = +e,
            r = +t,
            o = 65535 & n,
            i = 65535 & r;
          return 0 | o * i + ((65535 & n >>> 16) * i + o * (65535 & r >>> 16) << 16 >>> 0)
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Math", {
        log10: function(e) {
          return Math.log(e) * Math.LOG10E
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Math", {
        log1p: n(92)
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Math", {
        log2: function(e) {
          return Math.log(e) / Math.LN2
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Math", {
        sign: n(68)
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(69),
        i = Math.exp;
      r(r.S + r.F * n(1)(function() {
        return -2e-17 != !Math.sinh(-2e-17)
      }), "Math", {
        sinh: function(e) {
          return Math.abs(e = +e) < 1 ? (o(e) - o(-e)) / 2 : (i(e - 1) - i(-e - 1)) * (Math.E / 2)
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(69),
        i = Math.exp;
      r(r.S, "Math", {
        tanh: function(e) {
          var t = o(e = +e),
            n = o(-e);
          return t == 1 / 0 ? 1 : n == 1 / 0 ? -1 : (t - n) / (i(e) + i(-e))
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Math", {
        trunc: function(e) {
          return (e > 0 ? Math.floor : Math.ceil)(e)
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(33),
        i = String.fromCharCode,
        a = String.fromCodePoint;
      r(r.S + r.F * (!!a && 1 != a.length), "String", {
        fromCodePoint: function(e) {
          for (var t, n = [], r = arguments.length, a = 0; r > a;) {
            if (t = +arguments[a++], o(t, 1114111) !== t) throw RangeError(t + " is not a valid code point");
            n.push(t < 65536 ? i(t) : i(55296 + ((t -= 65536) >> 10), t % 1024 + 56320))
          }
          return n.join("")
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(12),
        i = n(8);
      r(r.S, "String", {
        raw: function(e) {
          for (var t = o(e.raw), n = i(t.length), r = arguments.length, a = [], c = 0; n > c;) a.push(String(t[c++])), c < r && a.push(String(arguments[c]));
          return a.join("")
        }
      })
    }, function(e, t, n) {
      n(48)("trim", function(e) {
        return function() {
          return e(this, 3)
        }
      })
    }, function(e, t, r) {
      var o = r(93)(!0);
      r(70)(String, "String", function(e) {
        this._t = String(e), this._i = 0
      }, function() {
        var e, t = this._t,
          r = this._i;
        return r >= t.length ? {
          value: n,
          done: !0
        } : (e = o(t, r), this._i += e.length, {
          value: e,
          done: !1
        })
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(93)(!1);
      r(r.P, "String", {
        codePointAt: function(e) {
          return o(this, e)
        }
      })
    }, function(e, t, r) {
      var o = r(0),
        i = r(8),
        a = r(71),
        c = "".endsWith;
      o(o.P + o.F * r(73)("endsWith"), "String", {
        endsWith: function(e) {
          var t = a(this, e, "endsWith"),
            r = arguments.length > 1 ? arguments[1] : n,
            o = i(t.length),
            u = r === n ? o : Math.min(i(r), o),
            s = String(e);
          return c ? c.call(t, s, u) : t.slice(u - s.length, u) === s
        }
      })
    }, function(e, t, r) {
      var o = r(0),
        i = r(71);
      o(o.P + o.F * r(73)("includes"), "String", {
        includes: function(e) {
          return !!~i(this, e, "includes").indexOf(e, arguments.length > 1 ? arguments[1] : n)
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.P, "String", {
        repeat: n(90)
      })
    }, function(e, t, r) {
      var o = r(0),
        i = r(8),
        a = r(71),
        c = "".startsWith;
      o(o.P + o.F * r(73)("startsWith"), "String", {
        startsWith: function(e) {
          var t = a(this, e, "startsWith"),
            r = i(Math.min(arguments.length > 1 ? arguments[1] : n, t.length)),
            o = String(e);
          return c ? c.call(t, o, r) : t.slice(r, r + o.length) === o
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
      var r = n(0);
      r(r.S, "Date", {
        now: function() {
          return (new Date).getTime()
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(13),
        i = n(24);
      r(r.P + r.F * n(1)(function() {
        return null !== new Date(NaN).toJSON() || 1 !== Date.prototype.toJSON.call({
          toISOString: function() {
            return 1
          }
        })
      }), "Date", {
        toJSON: function(e) {
          var t = o(this),
            n = i(t);
          return "number" != typeof n || isFinite(n) ? t.toISOString() : null
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(190);
      r(r.P + r.F * (Date.prototype.toISOString !== o), "Date", {
        toISOString: o
      })
    }, function(e, t, n) {
      var r = n(1),
        o = Date.prototype.getTime,
        i = Date.prototype.toISOString,
        a = function(e) {
          return e > 9 ? e : "0" + e
        };
      e.exports = r(function() {
        return "0385-07-25T07:06:39.999Z" != i.call(new Date(-5e13 - 1))
      }) || !r(function() {
        i.call(new Date(NaN))
      }) ? function() {
        if (!isFinite(o.call(this))) throw RangeError("Invalid time value");
        var e = this,
          t = e.getUTCFullYear(),
          n = e.getUTCMilliseconds(),
          r = t < 0 ? "-" : t > 9999 ? "+" : "";
        return r + ("00000" + Math.abs(t)).slice(r ? -6 : -4) + "-" + a(e.getUTCMonth() + 1) + "-" + a(e.getUTCDate()) + "T" + a(e.getUTCHours()) + ":" + a(e.getUTCMinutes()) + ":" + a(e.getUTCSeconds()) + "." + (n > 99 ? n : "0" + a(n)) + "Z"
      } : i
    }, function(e, t, n) {
      var r = Date.prototype,
        o = r.toString,
        i = r.getTime;
      new Date(NaN) + "" != "Invalid Date" && n(11)(r, "toString", function() {
        var e = i.call(this);
        return e === e ? o.call(this) : "Invalid Date"
      })
    }, function(e, t, n) {
      var r = n(5)("toPrimitive"),
        o = Date.prototype;
      r in o || n(14)(o, r, n(193))
    }, function(e, t, n) {
      var r = n(4),
        o = n(24);
      e.exports = function(e) {
        if ("string" !== e && "number" !== e && "default" !== e) throw TypeError("Incorrect hint");
        return o(r(this), "number" != e)
      }
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Array", {
        isArray: n(64)
      })
    }, function(e, t, r) {
      var o = r(16),
        i = r(0),
        a = r(13),
        c = r(82),
        u = r(60),
        s = r(8),
        l = r(94),
        f = r(61);
      i(i.S + i.F * !r(49)(function(e) {
        Array.from(e)
      }), "Array", {
        from: function(e) {
          var t, r, i, d, p = a(e),
            h = "function" == typeof this ? this : Array,
            v = arguments.length,
            g = v > 1 ? arguments[1] : n,
            _ = g !== n,
            y = 0,
            b = f(p);
          if (_ && (g = o(g, v > 2 ? arguments[2] : n, 2)), b == n || h == Array && u(b))
            for (t = s(p.length), r = new h(t); t > y; y++) l(r, y, _ ? g(p[y], y) : p[y]);
          else
            for (d = b.call(p), r = new h; !(i = d.next()).done; y++) l(r, y, _ ? c(d, g, [i.value, y], !0) : i.value);
          return r.length = y, r
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(94);
      r(r.S + r.F * n(1)(function() {
        function e() {}
        return !(Array.of.call(e) instanceof e)
      }), "Array", { of: function() {
          for (var e = 0, t = arguments.length, n = new("function" == typeof this ? this : Array)(t); t > e;) o(n, e, arguments[e++]);
          return n.length = t, n
        }
      })
    }, function(e, t, r) {
      var o = r(0),
        i = r(12),
        a = [].join;
      o(o.P + o.F * (r(42) != Object || !r(15)(a)), "Array", {
        join: function(e) {
          return a.call(i(this), e === n ? "," : e)
        }
      })
    }, function(e, t, r) {
      var o = r(0),
        i = r(59),
        a = r(20),
        c = r(33),
        u = r(8),
        s = [].slice;
      o(o.P + o.F * r(1)(function() {
        i && s.call(i)
      }), "Array", {
        slice: function(e, t) {
          var r = u(this.length),
            o = a(this);
          if (t = t === n ? r : t, "Array" == o) return s.call(this, e, t);
          for (var i = c(e, r), l = c(t, r), f = u(l - i), d = Array(f), p = 0; p < f; p++) d[p] = "String" == o ? this.charAt(i + p) : this[i + p];
          return d
        }
      })
    }, function(e, t, r) {
      var o = r(0),
        i = r(17),
        a = r(13),
        c = r(1),
        u = [].sort,
        s = [1, 2, 3];
      o(o.P + o.F * (c(function() {
        s.sort(n)
      }) || !c(function() {
        s.sort(null)
      }) || !r(15)(u)), "Array", {
        sort: function(e) {
          return e === n ? u.call(a(this)) : u.call(a(this), i(e))
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(19)(0),
        i = n(15)([].forEach, !0);
      r(r.P + r.F * !i, "Array", {
        forEach: function(e) {
          return o(this, e, arguments[1])
        }
      })
    }, function(e, t, n) {
      var r = n(202);
      e.exports = function(e, t) {
        return new(r(e))(t)
      }
    }, function(e, t, r) {
      var o = r(2),
        i = r(64),
        a = r(5)("species");
      e.exports = function(e) {
        var t;
        return i(e) && (t = e.constructor, "function" != typeof t || t !== Array && !i(t.prototype) || (t = n), o(t) && null === (t = t[a]) && (t = n)), t === n ? Array : t
      }
    }, function(e, t, n) {
      var r = n(0),
        o = n(19)(1);
      r(r.P + r.F * !n(15)([].map, !0), "Array", {
        map: function(e) {
          return o(this, e, arguments[1])
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(19)(2);
      r(r.P + r.F * !n(15)([].filter, !0), "Array", {
        filter: function(e) {
          return o(this, e, arguments[1])
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(19)(3);
      r(r.P + r.F * !n(15)([].some, !0), "Array", {
        some: function(e) {
          return o(this, e, arguments[1])
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(19)(4);
      r(r.P + r.F * !n(15)([].every, !0), "Array", {
        every: function(e) {
          return o(this, e, arguments[1])
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(95);
      r(r.P + r.F * !n(15)([].reduce, !0), "Array", {
        reduce: function(e) {
          return o(this, e, arguments.length, arguments[1], !1)
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(95);
      r(r.P + r.F * !n(15)([].reduceRight, !0), "Array", {
        reduceRight: function(e) {
          return o(this, e, arguments.length, arguments[1], !0)
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(55)(!1),
        i = [].indexOf,
        a = !!i && 1 / [1].indexOf(1, -0) < 0;
      r(r.P + r.F * (a || !n(15)(i)), "Array", {
        indexOf: function(e) {
          return a ? i.apply(this, arguments) || 0 : o(this, e, arguments[1])
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(12),
        i = n(21),
        a = n(8),
        c = [].lastIndexOf,
        u = !!c && 1 / [1].lastIndexOf(1, -0) < 0;
      r(r.P + r.F * (u || !n(15)(c)), "Array", {
        lastIndexOf: function(e) {
          if (u) return c.apply(this, arguments) || 0;
          var t = o(this),
            n = a(t.length),
            r = n - 1;
          for (arguments.length > 1 && (r = Math.min(r, i(arguments[1]))), r < 0 && (r = n + r); r >= 0; r--)
            if (r in t && t[r] === e) return r || 0;
          return -1
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.P, "Array", {
        copyWithin: n(96)
      }), n(45)("copyWithin")
    }, function(e, t, n) {
      var r = n(0);
      r(r.P, "Array", {
        fill: n(74)
      }), n(45)("fill")
    }, function(e, t, r) {
      var o = r(0),
        i = r(19)(5),
        a = !0;
      "find" in [] && Array(1).find(function() {
        a = !1
      }), o(o.P + o.F * a, "Array", {
        find: function(e) {
          return i(this, e, arguments.length > 1 ? arguments[1] : n)
        }
      }), r(45)("find")
    }, function(e, t, r) {
      var o = r(0),
        i = r(19)(6),
        a = "findIndex",
        c = !0;
      a in [] && Array(1)[a](function() {
        c = !1
      }), o(o.P + o.F * c, "Array", {
        findIndex: function(e) {
          return i(this, e, arguments.length > 1 ? arguments[1] : n)
        }
      }), r(45)(a)
    }, function(e, t, n) {
      n(38)("Array")
    }, function(e, t, r) {
      var o = r(3),
        i = r(67),
        a = r(6).f,
        c = r(34).f,
        u = r(72),
        s = r(75),
        l = o.RegExp,
        f = l,
        d = l.prototype,
        p = /a/g,
        h = /a/g,
        v = new l(p) !== p;
      if (r(7) && (!v || r(1)(function() {
          return h[r(5)("match")] = !1, l(p) != p || l(h) == h || "/a/i" != l(p, "i")
        }))) {
        l = function(e, t) {
          var r = this instanceof l,
            o = u(e),
            a = t === n;
          return !r && o && e.constructor === l && a ? e : i(v ? new f(o && !a ? e.source : e, t) : f((o = e instanceof l) ? e.source : e, o && a ? s.call(e) : t), r ? this : d, l)
        };
        for (var g = c(f), _ = 0; g.length > _;) ! function(e) {
          e in l || a(l, e, {
            configurable: !0,
            get: function() {
              return f[e]
            },
            set: function(t) {
              f[e] = t
            }
          })
        }(g[_++]);
        d.constructor = l, l.prototype = d, r(11)(o, "RegExp", l)
      }
      r(38)("RegExp")
    }, function(e, t, r) {
      r(98);
      var o = r(4),
        i = r(75),
        a = r(7),
        c = /./.toString,
        u = function(e) {
          r(11)(RegExp.prototype, "toString", e, !0)
        };
      r(1)(function() {
        return "/a/b" != c.call({
          source: "a",
          flags: "b"
        })
      }) ? u(function() {
        var e = o(this);
        return "/".concat(e.source, "/", "flags" in e ? e.flags : !a && e instanceof RegExp ? i.call(e) : n)
      }) : "toString" != c.name && u(function() {
        return c.call(this)
      })
    }, function(e, t, r) {
      r(50)("match", 1, function(e, t, r) {
        return [function(r) {
          var o = e(this),
            i = r == n ? n : r[t];
          return i !== n ? i.call(r, o) : new RegExp(r)[t](String(o))
        }, r]
      })
    }, function(e, t, r) {
      r(50)("replace", 2, function(e, t, r) {
        return [function(o, i) {
          var a = e(this),
            c = o == n ? n : o[t];
          return c !== n ? c.call(o, a, i) : r.call(String(a), o, i)
        }, r]
      })
    }, function(e, t, r) {
      r(50)("search", 1, function(e, t, r) {
        return [function(r) {
          var o = e(this),
            i = r == n ? n : r[t];
          return i !== n ? i.call(r, o) : new RegExp(r)[t](String(o))
        }, r]
      })
    }, function(e, t, r) {
      r(50)("split", 2, function(e, t, o) {
        var i = r(72),
          a = o,
          c = [].push,
          u = "length";
        if ("c" == "abbc".split(/(b)*/)[1] || 4 != "test".split(/(?:)/, -1)[u] || 2 != "ab".split(/(?:ab)*/)[u] || 4 != ".".split(/(.?)(.?)/)[u] || ".".split(/()()/)[u] > 1 || "".split(/.?/)[u]) {
          var s = /()??/.exec("")[1] === n;
          o = function(e, t) {
            var r = String(this);
            if (e === n && 0 === t) return [];
            if (!i(e)) return a.call(r, e, t);
            var o, l, f, d, p, h = [],
              v = (e.ignoreCase ? "i" : "") + (e.multiline ? "m" : "") + (e.unicode ? "u" : "") + (e.sticky ? "y" : ""),
              g = 0,
              _ = t === n ? 4294967295 : t >>> 0,
              y = new RegExp(e.source, v + "g");
            for (s || (o = new RegExp("^" + y.source + "$(?!\\s)", v));
              (l = y.exec(r)) && !((f = l.index + l[0][u]) > g && (h.push(r.slice(g, l.index)), !s && l[u] > 1 && l[0].replace(o, function() {
                for (p = 1; p < arguments[u] - 2; p++) arguments[p] === n && (l[p] = n)
              }), l[u] > 1 && l.index < r[u] && c.apply(h, l.slice(1)), d = l[0][u], g = f, h[u] >= _));) y.lastIndex === l.index && y.lastIndex++;
            return g === r[u] ? !d && y.test("") || h.push("") : h.push(r.slice(g)), h[u] > _ ? h.slice(0, _) : h
          }
        } else "0".split(n, 0)[u] && (o = function(e, t) {
          return e === n && 0 === t ? [] : a.call(this, e, t)
        });
        return [function(r, i) {
          var a = e(this),
            c = r == n ? n : r[t];
          return c !== n ? c.call(r, a, i) : o.call(String(a), r, i)
        }, o]
      })
    }, function(e, t, r) {
      var o = r(99),
        i = r(41);
      e.exports = r(51)("Map", function(e) {
        return function() {
          return e(this, arguments.length > 0 ? arguments[0] : n)
        }
      }, {
        get: function(e) {
          var t = o.getEntry(i(this, "Map"), e);
          return t && t.v
        },
        set: function(e, t) {
          return o.def(i(this, "Map"), 0 === e ? 0 : e, t)
        }
      }, o, !0)
    }, function(e, t, r) {
      var o = r(99),
        i = r(41);
      e.exports = r(51)("Set", function(e) {
        return function() {
          return e(this, arguments.length > 0 ? arguments[0] : n)
        }
      }, {
        add: function(e) {
          return o.def(i(this, "Set"), e = 0 === e ? 0 : e, e)
        }
      }, o)
    }, function(e, t, r) {
      var o, i = r(19)(0),
        a = r(11),
        c = r(29),
        u = r(54),
        s = r(100),
        l = r(2),
        f = r(1),
        d = r(41),
        p = c.getWeak,
        h = Object.isExtensible,
        v = s.ufstore,
        g = {};
      if (r(3).WeakMap === n) {
        var _ = function(e) {
            return function() {
              return e(this, arguments.length > 0 ? arguments[0] : n)
            }
          },
          y = {
            get: function(e) {
              if (l(e)) {
                var t = p(e);
                return !0 === t ? v(d(this, "WeakMap")).get(e) : t ? t[this._i] : n
              }
            },
            set: function(e, t) {
              return s.def(d(this, "WeakMap"), e, t)
            }
          },
          b = e.exports = r(51)("WeakMap", _, y, s, !0, !0);
        f(function() {
          return 7 != (new b).set((Object.freeze || Object)(g), 7).get(g)
        }) && (o = s.getConstructor(_, "WeakMap"), u(o.prototype, y), c.NEED = !0, i(["delete", "has", "get", "set"], function(e) {
          var t = b.prototype,
            n = t[e];
          a(t, e, function(t, r) {
            if (l(t) && !h(t)) {
              this._f || (this._f = new o);
              var i = this._f[e](t, r);
              return "set" == e ? this : i
            }
            return n.call(this, t, r)
          })
        }))
      }
    }, function(e, t, r) {
      var o = r(100),
        i = r(41);
      r(51)("WeakSet", function(e) {
        return function() {
          return e(this, arguments.length > 0 ? arguments[0] : n)
        }
      }, {
        add: function(e) {
          return o.def(i(this, "WeakSet"), e, !0)
        }
      }, o, !1, !0)
    }, function(e, t, r) {
      var o = r(0),
        i = r(52),
        a = r(76),
        c = r(4),
        u = r(33),
        s = r(8),
        l = r(2),
        f = r(3).ArrayBuffer,
        d = r(77),
        p = a.ArrayBuffer,
        h = a.DataView,
        v = i.ABV && f.isView,
        g = p.prototype.slice,
        _ = i.VIEW;
      o(o.G + o.W + o.F * (f !== p), {
        ArrayBuffer: p
      }), o(o.S + o.F * !i.CONSTR, "ArrayBuffer", {
        isView: function(e) {
          return v && v(e) || l(e) && _ in e
        }
      }), o(o.P + o.U + o.F * r(1)(function() {
        return !new p(2).slice(1, n).byteLength
      }), "ArrayBuffer", {
        slice: function(e, t) {
          if (g !== n && t === n) return g.call(c(this), e);
          for (var r = c(this).byteLength, o = u(e, r), i = u(t === n ? r : t, r), a = new(d(this, p))(s(i - o)), l = new h(this), f = new h(a), v = 0; o < i;) f.setUint8(v++, l.getUint8(o++));
          return a
        }
      }), r(38)("ArrayBuffer")
    }, function(e, t, n) {
      var r = n(0);
      r(r.G + r.W + r.F * !n(52).ABV, {
        DataView: n(76).DataView
      })
    }, function(e, t, n) {
      n(23)("Int8", 1, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      })
    }, function(e, t, n) {
      n(23)("Uint8", 1, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      })
    }, function(e, t, n) {
      n(23)("Uint8", 1, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      }, !0)
    }, function(e, t, n) {
      n(23)("Int16", 2, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      })
    }, function(e, t, n) {
      n(23)("Uint16", 2, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      })
    }, function(e, t, n) {
      n(23)("Int32", 4, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      })
    }, function(e, t, n) {
      n(23)("Uint32", 4, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      })
    }, function(e, t, n) {
      n(23)("Float32", 4, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      })
    }, function(e, t, n) {
      n(23)("Float64", 8, function(e) {
        return function(t, n, r) {
          return e(this, t, n, r)
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(17),
        i = n(4),
        a = (n(3).Reflect || {}).apply,
        c = Function.apply;
      r(r.S + r.F * !n(1)(function() {
        a(function() {})
      }), "Reflect", {
        apply: function(e, t, n) {
          var r = o(e),
            u = i(n);
          return a ? a(r, t, u) : c.call(r, t, u)
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(27),
        i = n(17),
        a = n(4),
        c = n(2),
        u = n(1),
        s = n(85),
        l = (n(3).Reflect || {}).construct,
        f = u(function() {
          function e() {}
          return !(l(function() {}, [], e) instanceof e)
        }),
        d = !u(function() {
          l(function() {})
        });
      r(r.S + r.F * (f || d), "Reflect", {
        construct: function(e, t) {
          i(e), a(t);
          var n = arguments.length < 3 ? e : i(arguments[2]);
          if (d && !f) return l(e, t, n);
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
            var r = [null];
            return r.push.apply(r, t), new(s.apply(e, r))
          }
          var u = n.prototype,
            p = o(c(u) ? u : Object.prototype),
            h = Function.apply.call(e, p, t);
          return c(h) ? h : p
        }
      })
    }, function(e, t, n) {
      var r = n(6),
        o = n(0),
        i = n(4),
        a = n(24);
      o(o.S + o.F * n(1)(function() {
        Reflect.defineProperty(r.f({}, 1, {
          value: 1
        }), 1, {
          value: 2
        })
      }), "Reflect", {
        defineProperty: function(e, t, n) {
          i(e), t = a(t, !0), i(n);
          try {
            return r.f(e, t, n), !0
          } catch (e) {
            return !1
          }
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(22).f,
        i = n(4);
      r(r.S, "Reflect", {
        deleteProperty: function(e, t) {
          var n = o(i(e), t);
          return !(n && !n.configurable) && delete e[t]
        }
      })
    }, function(e, t, r) {
      var o = r(0),
        i = r(4),
        a = function(e) {
          this._t = i(e), this._i = 0;
          var t, n = this._k = [];
          for (t in e) n.push(t)
        };
      r(62)(a, "Object", function() {
        var e, t = this,
          r = t._k;
        do {
          if (t._i >= r.length) return {
            value: n,
            done: !0
          }
        } while (!((e = r[t._i++]) in t._t));
        return {
          value: e,
          done: !1
        }
      }), o(o.S, "Reflect", {
        enumerate: function(e) {
          return new a(e)
        }
      })
    }, function(e, t, r) {
      function o(e, t) {
        var r, u, f = arguments.length < 3 ? e : arguments[2];
        return l(e) === f ? e[t] : (r = i.f(e, t)) ? c(r, "value") ? r.value : r.get !== n ? r.get.call(f) : n : s(u = a(e)) ? o(u, t, f) : void 0
      }
      var i = r(22),
        a = r(28),
        c = r(9),
        u = r(0),
        s = r(2),
        l = r(4);
      u(u.S, "Reflect", {
        get: o
      })
    }, function(e, t, n) {
      var r = n(22),
        o = n(0),
        i = n(4);
      o(o.S, "Reflect", {
        getOwnPropertyDescriptor: function(e, t) {
          return r.f(i(e), t)
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(28),
        i = n(4);
      r(r.S, "Reflect", {
        getPrototypeOf: function(e) {
          return o(i(e))
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Reflect", {
        has: function(e, t) {
          return t in e
        }
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(4),
        i = Object.isExtensible;
      r(r.S, "Reflect", {
        isExtensible: function(e) {
          return o(e), !i || i(e)
        }
      })
    }, function(e, t, n) {
      var r = n(0);
      r(r.S, "Reflect", {
        ownKeys: n(248)
      })
    }, function(e, t, n) {
      var r = n(34),
        o = n(46),
        i = n(4),
        a = n(3).Reflect;
      e.exports = a && a.ownKeys || function(e) {
        var t = r.f(i(e)),
          n = o.f;
        return n ? t.concat(n(e)) : t
      }
    }, function(e, t, n) {
      var r = n(0),
        o = n(4),
        i = Object.preventExtensions;
      r(r.S, "Reflect", {
        preventExtensions: function(e) {
          o(e);
          try {
            return i && i(e), !0
          } catch (e) {
            return !1
          }
        }
      })
    }, function(e, t, r) {
      function o(e, t, r) {
        var s, p, h = arguments.length < 4 ? e : arguments[3],
          v = a.f(f(e), t);
        if (!v) {
          if (d(p = c(e))) return o(p, t, r, h);
          v = l(0)
        }
        return u(v, "value") ? !(!1 === v.writable || !d(h)) && (s = a.f(h, t) || l(0), s.value = r, i.f(h, t, s), !0) : v.set !== n && (v.set.call(h, r), !0)
      }
      var i = r(6),
        a = r(22),
        c = r(28),
        u = r(9),
        s = r(0),
        l = r(25),
        f = r(4),
        d = r(2);
      s(s.S, "Reflect", {
        set: o
      })
    }, function(e, t, n) {
      var r = n(0),
        o = n(65);
      o && r(r.S, "Reflect", {
        setPrototypeOf: function(e, t) {
          o.check(e, t);
          try {
            return o.set(e, t), !0
          } catch (e) {
            return !1
          }
        }
      })
    }, function(e, t, r) {
      var o, i, a, c, u = r(78),
        s = r(37),
        l = r(3),
        f = r(16),
        d = r(44),
        p = r(0),
        h = r(2),
        v = r(17),
        g = r(40),
        _ = r(43),
        y = r(77),
        b = r(102).set,
        m = r(253)(),
        w = r(103),
        k = r(254),
        S = r(255),
        C = l.TypeError,
        P = l.process,
        x = l.Promise,
        M = "process" == d(P),
        E = function() {},
        O = i = w.f,
        T = !! function() {
          try {
            var e = x.resolve(1),
              t = (e.constructor = {})[r(5)("species")] = function(e) {
                e(E, E)
              };
            return (M || "function" == typeof PromiseRejectionEvent) && e.then(E) instanceof t
          } catch (e) {}
        }();
      u.isIOS && (T = !1);
      var I = function(e) {
          var t;
          return !(!h(e) || "function" != typeof(t = e.then)) && t
        },
        A = function(e, t) {
          if (!e._n) {
            e._n = !0;
            var n = e._c;
            m(function() {
              for (var r = e._v, o = 1 == e._s, i = 0; n.length > i;) ! function(t) {
                var n, i, a = o ? t.ok : t.fail,
                  c = t.resolve,
                  u = t.reject,
                  s = t.domain;
                try {
                  a ? (o || (2 == e._h && D(e), e._h = 1), !0 === a ? n = r : (s && s.enter(), n = a(r), s && s.exit()), n === t.promise ? u(C("Promise-chain cycle")) : (i = I(n)) ? i.call(n, c, u) : c(n)) : u(r)
                } catch (e) {
                  u(e)
                }
              }(n[i++]);
              e._c = [], e._n = !1, t && !e._h && j(e)
            })
          }
        },
        j = function(e) {
          b.call(l, function() {
            var t, r, o, i = e._v,
              a = B(e);
            if (a && (t = k(function() {
                M ? P.emit("unhandledRejection", i, e) : (r = l.onunhandledrejection) ? r({
                  promise: e,
                  reason: i
                }) : (o = l.console) && o.error && o.error("Unhandled promise rejection", i)
              }), e._h = M || B(e) ? 2 : 1), e._a = n, a && t.e) throw t.v
          })
        },
        B = function(e) {
          if (1 == e._h) return !1;
          for (var t, n = e._a || e._c, r = 0; n.length > r;)
            if (t = n[r++], t.fail || !B(t.promise)) return !1;
          return !0
        },
        D = function(e) {
          b.call(l, function() {
            var t;
            M ? P.emit("rejectionHandled", e) : (t = l.onrejectionhandled) && t({
              promise: e,
              reason: e._v
            })
          })
        },
        N = function(e) {
          var t = this;
          t._d || (t._d = !0, t = t._w || t, t._v = e, t._s = 2, t._a || (t._a = t._c.slice()), A(t, !0))
        },
        R = function(e) {
          var t, n = this;
          if (!n._d) {
            n._d = !0, n = n._w || n;
            try {
              if (n === e) throw C("Promise can't be resolved itself");
              (t = I(e)) ? m(function() {
                var r = {
                  _w: n,
                  _d: !1
                };
                try {
                  t.call(e, f(R, r, 1), f(N, r, 1))
                } catch (e) {
                  N.call(r, e)
                }
              }): (n._v = e, n._s = 1, A(n, !1))
            } catch (e) {
              N.call({
                _w: n,
                _d: !1
              }, e)
            }
          }
        };
      T || (x = function(e) {
        g(this, x, "Promise", "_h"), v(e), o.call(this);
        try {
          e(f(R, this, 1), f(N, this, 1))
        } catch (e) {
          N.call(this, e)
        }
      }, o = function(e) {
        this._c = [], this._a = n, this._s = 0, this._d = !1, this._v = n, this._h = 0, this._n = !1
      }, o.prototype = r(39)(x.prototype, {
        then: function(e, t) {
          var r = O(y(this, x));
          return r.ok = "function" != typeof e || e, r.fail = "function" == typeof t && t, r.domain = M ? P.domain : n, this._c.push(r), this._a && this._a.push(r), this._s && A(this, !1), r.promise
        },
        catch: function(e) {
          return this.then(n, e)
        }
      }), a = function() {
        var e = new o;
        this.promise = e, this.resolve = f(R, e, 1), this.reject = f(N, e, 1)
      }, w.f = O = function(e) {
        return e === x || e === c ? new a(e) : i(e)
      }), p(p.G + p.W + p.F * !T, {
        Promise: x
      }), r(36)(x, "Promise"), r(38)("Promise"), c = r(30).Promise, p(p.S + p.F * !T, "Promise", {
        reject: function(e) {
          var t = O(this);
          return (0, t.reject)(e), t.promise
        }
      }), p(p.S + p.F * (s || !T), "Promise", {
        resolve: function(e) {
          return S(s && this === c ? x : this, e)
        }
      }), p(p.S + p.F * !(T && r(49)(function(e) {
        x.all(e).catch(E)
      })), "Promise", {
        all: function(e) {
          var t = this,
            r = O(t),
            o = r.resolve,
            i = r.reject,
            a = k(function() {
              var r = [],
                a = 0,
                c = 1;
              _(e, !1, function(e) {
                var u = a++,
                  s = !1;
                r.push(n), c++, t.resolve(e).then(function(e) {
                  s || (s = !0, r[u] = e, --c || o(r))
                }, i)
              }), --c || o(r)
            });
          return a.e && i(a.v), r.promise
        },
        race: function(e) {
          var t = this,
            n = O(t),
            r = n.reject,
            o = k(function() {
              _(e, !1, function(e) {
                t.resolve(e).then(n.resolve, r)
              })
            });
          return o.e && r(o.v), n.promise
        }
      })
    }, function(e, t, r) {
      var o = r(3),
        i = r(102).set,
        a = o.MutationObserver || o.WebKitMutationObserver,
        c = o.process,
        u = o.Promise,
        s = "process" == r(20)(c);
      e.exports = function() {
        var e, t, r, l = function() {
          var o, i;
          for (s && (o = c.domain) && o.exit(); e;) {
            i = e.fn, e = e.next;
            try {
              i()
            } catch (o) {
              throw e ? r() : t = n, o
            }
          }
          t = n, o && o.enter()
        };
        if (s) r = function() {
          c.nextTick(l)
        };
        else if (a) {
          var f = !0,
            d = document.createTextNode("");
          new a(l).observe(d, {
            characterData: !0
          }), r = function() {
            d.data = f = !f
          }
        } else if (u && u.resolve) {
          var p = u.resolve();
          r = function() {
            p.then(l)
          }
        } else r = function() {
          i.call(o, l)
        };
        return function(o) {
          var i = {
            fn: o,
            next: n
          };
          t && (t.next = i), e || (e = i, r()), t = i
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
      var r = n(4),
        o = n(2),
        i = n(103);
      e.exports = function(e, t) {
        if (r(e), o(t) && t.constructor === e) return t;
        var n = i.f(e);
        return (0, n.resolve)(t), n.promise
      }
    }]), "undefined" != typeof module && module.exports ? module.exports = e : "function" == typeof define && define.amd ? define(function() {
      return e
    }) : t.core = e
  }(1, 1);
  var Reporter = function(e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
          exports: {},
          id: r,
          loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
      }
      var n = {};
      return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
      function r(e) {
        void 0 !== WeixinJSBridge ? e() : document.addEventListener("WeixinJSBridgeReady", e, !1)
      }

      function o() {
        var e = arguments;
        r(function() {
          WeixinJSBridge.invoke.apply(WeixinJSBridge, e)
        })
      }

      function i() {
        var e = arguments;
        r(function() {
          WeixinJSBridge.publish.apply(WeixinJSBridge, e)
        })
      }

      function a() {
        return void 0 !== wx ? wx.version && wx.version.version || "" : ""
      }

      function c() {
        !p || p.length <= 0 || (o("reportKeyValue", {
          dataArray: p
        }), p = [])
      }

      function u() {
        !h || h.length <= 0 || (o("reportIDKey", {
          dataArray: h
        }), h = [])
      }

      function s() {
        !v || v.length <= 0 || (o("systemLog", {
          dataArray: v
        }), v = [])
      }

      function l() {
        return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 ? "android" : "ios" : "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios"
      }

      function f(e) {
        return function() {
          try {
            return e.apply(e, arguments)
          } catch (e) {
            console.error("reporter error:" + e.message)
          }
        }
      }
      var d = n(1),
        p = [],
        h = [],
        v = [],
        g = 0,
        _ = 0,
        y = 0,
        b = 0,
        m = 0,
        w = {},
        k = {},
        S = {},
        C = "ios" === l(),
        P = (l(), function() {}),
        x = "",
        M = "",
        E = "",
        O = -1,
        T = d.RunType.APP;
      "undefined" != typeof __wxConfig && __wxConfig.onReady(function() {
        void 0 !== __wxConfig.appType && (O = __wxConfig.appType)
      });
      var I = {
          surroundThirdByTryCatch: function(e, t) {
            var n = "";
            return M && (n = "at " + M + " " + E + " function;"),
              function() {
                var r = void 0;
                try {
                  var o = Date.now();
                  r = e.apply(e, arguments);
                  var i = Date.now() - o;
                  i > 1e3 && I.slowReport({
                    key: "apiCallback",
                    cost: i,
                    extend: n + t
                  })
                } catch (e) {
                  I.thirdErrorReport({
                    error: e,
                    extend: n + t
                  })
                }
                return r
              }
          },
          slowReport: function(e) {
            var t = e.key,
              n = e.cost,
              r = e.extend,
              o = e.force,
              i = d.SlowValueType[t],
              a = Date.now();
            if (i && (o || !(a - m < 500)) && !(Object.keys(S).length > 50 || (S[r] || (S[r] = 0), ++S[r] > 3))) {
              m = a;
              var c = n + "," + encodeURIComponent(r) + "," + i + "," + I.getAppType();
              I.reportKeyValue({
                key: "Slow",
                value: c,
                force: !0
              })
            }
          },
          speedReport: function(e) {
            var t = e.key,
              n = e.data,
              r = e.timeMark,
              o = e.force,
              i = d.SpeedValueType[t],
              a = Date.now(),
              c = 0,
              u = r.nativeTime;
            if (i && (o || !(a - (w[i] || 0) < 500)) && r.startTime && r.endTime && (1 != i && 2 != i || u)) {
              n && (c = JSON.stringify(n).length), w[i] = a;
              var s = i + "," + r.startTime + "," + u + "," + u + "," + r.endTime + "," + c + "," + I.getAppType();
              I.reportKeyValue({
                key: "Speed",
                value: s,
                force: !0
              })
            }
          },
          reportKeyValue: function(e) {
            var t = e.key,
              n = e.value,
              r = e.force;
            d.KeyValueType[t] && (!r && Date.now() - g < 50 || (g = Date.now(), p.push({
              key: d.KeyValueType[t],
              value: n
            }), p.length >= 20 && c()))
          },
          reportIDKey: function(e) {
            var t = e.id,
              n = e.key,
              r = e.force;
            d.IDKeyType[n] && (!r && Date.now() - _ < 20 || (_ = Date.now(), h.push({
              id: t || (C ? "356" : "358"),
              key: d.IDKeyType[n],
              value: 1
            }), h.length >= 1 && u()))
          },
          thirdErrorReport: function(e) {
            var t = e.error,
              n = e.extend;
            I.errorReport({
              key: d.ThirdScriptErrorKey[T],
              error: t,
              extend: n,
              isThirdScriptError: !0
            })
          },
          errorReport: function(e) {
            var t = e.key,
              n = e.error,
              r = e.extend,
              o = e.isThirdScriptError,
              l = void 0 !== o && o;
            if (d.ErrorType[t]) {
              var f = r ? n.message + ";" + r : n.message,
                p = t + "\n" + f + "\n" + n.stack;
              if (console.error(p), "undefined" != typeof window && void 0 !== window.__webviewId__ ? i("WEBVIEW_ERROR_MSG", {
                  data: {
                    msg: p
                  },
                  options: {
                    timestamp: Date.now()
                  }
                }) : I.triggerErrorMessage(p), !(Object.keys(k).length > 50)) {
                var h = d.ErrorType[t] + "," + n.name + "," + encodeURIComponent(f) + "," + encodeURIComponent(n.stack) + "," + encodeURIComponent(a()) + "," + I.getAppType();
                if (k[h] || (k[h] = 0), k[h]++, !(l && k[h] > 3 || k[h] > 3) && (I.reportIDKey({
                    key: t,
                    force: !0
                  }), I.reportKeyValue({
                    key: "Error",
                    value: h,
                    force: !0
                  }), u(), c(), s(), __wxConfig.karmaTest)) throw n
              }
            }
          },
          log: function(e, t) {
            e && "string" == typeof e && (!t && Date.now() - y < 50 || (y = Date.now(), v.push(e + ""), v.length >= 50 && s()))
          },
          submit: function() {
            Date.now() - b < 50 || (b = Date.now(), u(), c(), s())
          },
          registerErrorListener: function(e) {
            "function" == typeof e && (P = e)
          },
          unRegisterErrorListener: function() {
            P = function() {}
          },
          triggerErrorMessage: function(e) {
            x != e && (x = e, setTimeout(function() {
              try {
                P(e)
              } catch (e) {
                console.error(e.message, "at onError callback function")
              }
            }, 0))
          },
          setAsWidget: function() {
            T = d.RunType.WIDGET
          },
          setAsGame: function() {
            T = d.RunType.GAME
          },
          setAsGameSubContext: function() {
            T = d.RunType.GAME_SUBCONTEXT
          },
          getAppType: function() {
            return -1 === O ? 0 : O + 1e3
          }
        },
        A = {};
      for (var j in I) ! function(e) {
        A.__defineGetter__(e, function() {
          return f(I[e])
        })
      }(j);
      A.__defineSetter__("__route__", function(e) {
        M = e
      }), A.__defineSetter__("__method__", function(e) {
        E = e
      }), "undefined" != typeof window && (window.onbeforeunload = function() {
        I.submit()
      }), e.exports = A
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
      var r, o = t.RunType = {
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
      }, t.ThirdScriptErrorKey = (r = {}, n(r, o.APP, "thirdScriptError"), n(r, o.WIDGET, "widgetThirdScriptError"), n(r, o.GAME, "gameThirdScriptError"), n(r, o.GAME_SUBCONTEXT, "gameSubContextThirdScriptError"), r)
    }]),
    wx = function(e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
          exports: {},
          id: r,
          loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
      }
      var n = {};
      return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
      var r = n(1),
        o = n(2),
        i = n(6);
      n(91);
      var a = n(92);
      n(93), n(94), n(153), n(155), n(156);
      var c = n(4),
        u = n(26),
        s = (function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          t.default = e
        }(u), n(157)),
        l = n(159),
        f = n(162),
        d = n(3),
        p = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(d),
        h = n(165),
        v = n(166),
        g = n(168),
        _ = n(169),
        y = n(183),
        b = n(199),
        m = n(210),
        w = n(212),
        k = n(95),
        S = n(83),
        C = n(9),
        P = n(38),
        x = n(216),
        M = n(225),
        E = n(228),
        O = n(229),
        T = n(230),
        I = n(232);
      (0, a.hijack)();
      var A = _.socket.connectSocket,
        j = _.socket.closeSocket,
        B = _.socket.sendSocketMessage,
        D = _.socket.onSocketOpen,
        N = _.socket.onSocketClose,
        R = _.socket.onSocketMessage,
        L = _.socket.onSocketError,
        F = y.image.chooseImage,
        W = y.image.previewImage,
        V = y.image.getImageInfo,
        U = y.image.saveImageToPhotosAlbum,
        H = y.record.startRecord,
        G = y.record.stopRecord,
        q = y.video.chooseVideo,
        K = y.video.saveVideoToPhotosAlbum,
        J = y.voice.playVoice,
        Y = y.voice.pauseVoice,
        z = y.voice.stopVoice,
        $ = y.voice.onVoicePlayEnd,
        X = y.backgroundAudio.getBackgroundAudioPlayerState,
        Q = y.backgroundAudio.playBackgroundAudio,
        Z = y.backgroundAudio.pauseBackgroundAudio,
        ee = y.backgroundAudio.seekBackgroundAudio,
        te = y.backgroundAudio.stopBackgroundAudio,
        ne = y.backgroundAudio.onBackgroundAudioPlay,
        re = y.backgroundAudio.onBackgroundAudioPause,
        oe = y.backgroundAudio.onBackgroundAudioStop,
        ie = k.screen.captureScreen,
        ae = k.screen.onUserCaptureScreen,
        ce = k.screen.setKeepScreenOn,
        ue = k.screen.setScreenBrightness,
        se = k.screen.getScreenBrightness,
        le = k.vibrate.vibrateShort,
        fe = k.vibrate.vibrateLong,
        de = k.contact.chooseContact,
        pe = k.contact.chooseWeChatContact,
        he = k.contact.addPhoneContact,
        ve = C.interaction.showToast,
        ge = C.interaction.hideToast,
        _e = C.interaction.showLoading,
        ye = C.interaction.hideLoading,
        be = C.interaction.showModal,
        me = C.interaction.showActionSheet,
        we = C.navigationBar.setNavigationBarTitle,
        ke = C.navigationBar.showNavigationBarLoading,
        Se = C.navigationBar.hideNavigationBarLoading,
        Ce = C.navigationBar.setNavigationBarColor,
        Pe = C.navigationBar.setNavigationBarAlpha,
        xe = C.navigationBar.setNavigationBarRightButton,
        Me = C.navigationBar.onTapNavigationBarRightButton,
        Ee = P.share.getShareInfo,
        Oe = P.share.showShareMenu,
        Te = P.share.hideShareMenu,
        Ie = P.share.updateShareMenu,
        Ae = P.share.ShareInfoStorage,
        je = {},
        Be = {
          invokeWebviewMethod: h.invokeWebviewMethod,
          drawCanvas: S.drawCanvas,
          createContext: S.createContext,
          createCanvasContext: S.createCanvasContext,
          canvasToTempFilePath: S.canvasToTempFilePath,
          canvasGetImageData: S.canvasGetImageData,
          canvasPutImageData: S.canvasPutImageData,
          getShareInfo: Ee,
          pageScrollTo: C.pageScrollTo,
          chooseInvoiceTitle: P.chooseInvoiceTitle,
          updateApp: T.updateApp,
          ShareInfoStorage: Ae,
          arrayBufferToBase64: Reporter.surroundThirdByTryCatch(o.arrayBufferToBase64),
          base64ToArrayBuffer: Reporter.surroundThirdByTryCatch(o.base64ToArrayBuffer),
          openSetting: P.openSetting,
          getExtConfig: l.getExtConfig,
          chooseMedia: y.chooseMedia,
          chooseWeChatContact: pe,
          uploadEncryptedFileToCDN: _.CDN.uploadEncryptedFileToCDN,
          onUploadEncryptedFileToCDNProgress: _.CDN.onUploadEncryptedFileToCDNProgress,
          getExtConfigSync: l.getExtConfigSync,
          showShareMenu: Oe,
          hideShareMenu: Te,
          updateShareMenu: Ie,
          openUrl: x.web.openUrl,
          setNavigationBarColor: Ce,
          setNavigationBarAlpha: Pe,
          _getRealRoute: O._getRealRoute,
          vibrateShort: le,
          vibrateLong: fe,
          getSetting: P.getSetting,
          checkIsSupportFacialRecognition: P.facialRecognition.checkIsSupportFacialRecognition,
          startFacialRecognitionVerify: P.facialRecognition.startFacialRecognitionVerify,
          startFacialRecognitionVerifyAndUploadVideo: P.facialRecognition.startFacialRecognitionVerifyAndUploadVideo,
          sendBizRedPacket: P.redPacket.sendBizRedPacket,
          sendGoldenRedPacket: P.redPacket.sendGoldenRedPacket,
          openGoldenRedPacketDetail: P.redPacket.openGoldenRedPacketDetail,
          addPhoneContact: he,
          setScreenBrightness: ue,
          getScreenBrightness: se,
          getWeRunData: P.getWeRunData,
          canIUse: w.canIUse,
          setPageStyle: C.setPageStyle,
          triggerGettingWidgetData: v.triggerGettingWidgetData,
          navigateToMiniProgram: x.miniProgram.navigateToMiniProgram,
          navigateToDevMiniProgram: x.miniProgram.navigateToDevMiniProgram,
          navigateBackMiniProgram: x.miniProgram.navigateBackMiniProgram,
          setNavigationBarRightButton: xe,
          onTapNavigationBarRightButton: Me,
          setTopBarText: C.topBar.setTopBarText,
          setTabBarBadge: C.tabBar.setTabBarBadge,
          removeTabBarBadge: C.tabBar.removeTabBarBadge,
          showTabBarRedDot: C.tabBar.showTabBarRedDot,
          hideTabBarRedDot: C.tabBar.hideTabBarRedDot,
          showTabBar: C.tabBar.showTabBar,
          hideTabBar: C.tabBar.hideTabBar,
          setTabBarStyle: C.tabBar.setTabBarStyle,
          setTabBarItem: C.tabBar.setTabBarItem,
          setEnableDebug: M.setEnableDebug,
          captureScreen: ie,
          onUserCaptureScreen: ae,
          setKeepScreenOn: ce,
          checkIsSupportSoterAuthentication: P.soter.checkIsSupportSoterAuthentication,
          startSoterAuthentication: P.soter.startSoterAuthentication,
          checkIsSoterEnrolledInDevice: P.soter.checkIsSoterEnrolledInDevice,
          openDeliveryList: x.web.openDeliveryList,
          reportIDKey: g.reportIDKey,
          reportKeyValue: g.reportKeyValue,
          setNavigationBarTitle: we,
          showNavigationBarLoading: ke,
          hideNavigationBarLoading: Se,
          startPullDownRefresh: C.startPullDownRefresh,
          stopPullDownRefresh: C.stopPullDownRefresh,
          operateWXData: P.operateWXData,
          getOpenDeviceId: P.getOpenDeviceId,
          openBluetoothAdapter: k.bluetooth.openBluetoothAdapter,
          closeBluetoothAdapter: k.bluetooth.closeBluetoothAdapter,
          getBluetoothAdapterState: k.bluetooth.getBluetoothAdapterState,
          onBluetoothAdapterStateChange: k.bluetooth.onBluetoothAdapterStateChange,
          startBluetoothDevicesDiscovery: k.bluetooth.startBluetoothDevicesDiscovery,
          stopBluetoothDevicesDiscovery: k.bluetooth.stopBluetoothDevicesDiscovery,
          getBluetoothDevices: k.bluetooth.getBluetoothDevices,
          getConnectedBluetoothDevices: k.bluetooth.getConnectedBluetoothDevices,
          createBLEConnection: k.bluetooth.createBLEConnection,
          closeBLEConnection: k.bluetooth.closeBLEConnection,
          getBLEDeviceServices: k.bluetooth.getBLEDeviceServices,
          getBLEDeviceCharacteristics: k.bluetooth.getBLEDeviceCharacteristics,
          notifyBLECharacteristicValueChanged: k.bluetooth.notifyBLECharacteristicValueChanged,
          notifyBLECharacteristicValueChange: k.bluetooth.notifyBLECharacteristicValueChange,
          readBLECharacteristicValue: k.bluetooth.readBLECharacteristicValue,
          writeBLECharacteristicValue: k.bluetooth.writeBLECharacteristicValue,
          onBluetoothDeviceFound: k.bluetooth.onBluetoothDeviceFound,
          onBLEConnectionStateChanged: k.bluetooth.onBLEConnectionStateChanged,
          onBLEConnectionStateChange: k.bluetooth.onBLEConnectionStateChange,
          onBLECharacteristicValueChange: k.bluetooth.onBLECharacteristicValueChange,
          startBeaconDiscovery: k.iBeacon.startBeaconDiscovery,
          stopBeaconDiscovery: k.iBeacon.stopBeaconDiscovery,
          getBeacons: k.iBeacon.getBeacons,
          onBeaconUpdate: k.iBeacon.onBeaconUpdate,
          onBeaconServiceChange: k.iBeacon.onBeaconServiceChange,
          startWifi: k.wifi.startWifi,
          stopWifi: k.wifi.stopWifi,
          getWifiList: k.wifi.getWifiList,
          getConnectedWifi: k.wifi.getConnectedWifi,
          connectWifi: k.wifi.connectWifi,
          presetWifiList: k.wifi.presetWifiList,
          setWifiList: k.wifi.setWifiList,
          onGetWifiList: k.wifi.onGetWifiList,
          onWifiConnected: k.wifi.onWifiConnected,
          onEvaluateWifi: k.wifi.onEvaluateWifi,
          getHCEState: k.nfc.getHCEState,
          startHCE: k.nfc.startHCE,
          stopHCE: k.nfc.stopHCE,
          sendHCEMessage: k.nfc.sendHCEMessage,
          onHCEMessage: k.nfc.onHCEMessage,
          redirectTo: C.route.redirectTo,
          reLaunch: C.route.reLaunch,
          navigateTo: C.route.navigateTo,
          switchTab: C.route.switchTab,
          navigateBack: C.route.navigateBack,
          _triggerBeforeUnloadPage: C.route._triggerBeforeUnloadPage,
          _triggerBeforeShareAppMessage: C.route._triggerBeforeShareAppMessage,
          navigateBackApplication: x.application.navigateBackApplication,
          launchApplication: x.application.launchApplication,
          getStorage: m.getStorage,
          getStorageSync: m.getStorageSync,
          setStorage: m.setStorage,
          setStorageSync: m.setStorageSync,
          removeStorage: m.removeStorage,
          removeStorageSync: m.removeStorageSync,
          clearStorage: m.clearStorage,
          clearStorageSync: m.clearStorageSync,
          getStorageInfo: m.getStorageInfo,
          getStorageInfoSync: m.getStorageInfoSync,
          request: _.request,
          connectSocket: A,
          closeSocket: j,
          sendSocketMessage: B,
          onSocketOpen: D,
          onSocketClose: N,
          onSocketMessage: R,
          onSocketError: L,
          uploadFile: _.uploadFile,
          downloadFile: _.downloadFile,
          addNativeDownloadTask: _.addNativeDownloadTask,
          chooseImage: F,
          previewImage: W,
          getImageInfo: V,
          saveImageToPhotosAlbum: U,
          startRecord: H,
          stopRecord: G,
          playVoice: J,
          pauseVoice: Y,
          stopVoice: z,
          onVoicePlayEnd: $,
          chooseVideo: q,
          saveVideoToPhotosAlbum: K,
          getLocation: function(e) {
            s.getLocation.call(Be, e)
          },
          openLocation: s.openLocation,
          chooseLocation: s.chooseLocation,
          startLocationUpdate: s.startLocationUpdate,
          stopLocationUpdate: s.stopLocationUpdate,
          onLocationChange: s.onLocationChange,
          getNetworkType: k.network.getNetworkType,
          onNetworkStatusChange: k.network.onNetworkStatusChange,
          getSystemInfo: k.systemInfo.getSystemInfo,
          getSystemInfoSync: k.systemInfo.getSystemInfoSync,
          getBatteryInfo: k.batteryInfo.getBatteryInfo,
          getBatteryInfoSync: k.batteryInfo.getBatteryInfoSync,
          startAccelerometer: k.accelerometer.startAccelerometer,
          stopAccelerometer: k.accelerometer.stopAccelerometer,
          onAccelerometerChange: k.accelerometer.onAccelerometerChange,
          startCompass: k.compass.startCompass,
          stopCompass: k.compass.stopCompass,
          onCompassChange: k.compass.onCompassChange,
          reportAction: g.reportAction,
          getBackgroundAudioManager: y.backgroundAudio.getBackgroundAudioManager,
          getRecorderManager: y.record.getRecorderManager,
          getBackgroundAudioPlayerState: X,
          playBackgroundAudio: Q,
          pauseBackgroundAudio: Z,
          seekBackgroundAudio: ee,
          stopBackgroundAudio: te,
          onBackgroundAudioPlay: ne,
          onBackgroundAudioPause: re,
          onBackgroundAudioStop: oe,
          login: P.login,
          checkSession: P.checkSession,
          authorize: P.authorize,
          getUserInfo: P.getUserInfo,
          requestPayment: P.payment.requestPayment,
          verifyPaymentPassword: P.payment.verifyPaymentPassword,
          bindPaymentCard: P.payment.bindPaymentCard,
          requestPaymentToBank: P.payment.requestPaymentToBank,
          requestVirtualPayment: P.payment.requestVirtualPayment,
          openOfflinePayView: P.payment.openOfflinePayView,
          openWCPayCardList: P.payment.openWCPayCardList,
          addCard: P.card.addCard,
          openCard: P.card.openCard,
          scanCode: k.scan.scanCode,
          chooseAddress: P.chooseAddress,
          saveFile: b.saveFile,
          openDocument: b.openDocument,
          getSavedFileList: b.getSavedFileList,
          getSavedFileInfo: b.getSavedFileInfo,
          getFileInfo: b.getFileInfo,
          removeSavedFile: b.removeSavedFile,
          readFile: b.readFile,
          chooseContact: de,
          makePhoneCall: k.phone.makePhoneCall,
          makeVoIPCall: k.phone.makeVoIPCall,
          onAppRoute: C.route.onAppRoute,
          onAppRouteDone: C.route.onAppRouteDone,
          onAppEnterBackground: function(e) {
            C.route.onAppEnterBackground.call(Be, e)
          },
          onAppEnterForeground: function(e) {
            C.route.onAppEnterForeground.call(Be, e)
          },
          onAppUnhang: function(e) {
            C.route.onAppUnhang.call(Be, e)
          },
          onPageReload: function(e) {
            C.route.onPageReload.call(Be, e)
          },
          onPageNotFound: C.route.onPageNotFound,
          createAnimation: C.createAnimation,
          createInnerAudioContext: i.createInnerAudioContext,
          createAudioContext: function(e, t) {
            var n = t && "number" == typeof t.__wxExparserNodeId__ && -1 !== t.__wxExparserNodeId__ ? t.__wxExparserNodeId__ : "";
            return i.createAudioContext.call(Be, e, p.default.currentWebviewId, n)
          },
          createVideoContext: function(e, t) {
            var n = t && "number" == typeof t.__wxExparserNodeId__ && -1 !== t.__wxExparserNodeId__ ? t.__wxExparserNodeId__ : "";
            return i.createVideoContext.call(Be, e, p.default.currentWebviewId, n)
          },
          createMapContext: function(e, t) {
            var n = t && "number" == typeof t.__wxExparserNodeId__ && -1 !== t.__wxExparserNodeId__ ? t.__wxExparserNodeId__ : "";
            return i.createMapContext.call(Be, e, p.default.currentWebviewId, n)
          },
          createCameraContext: function(e) {
            return i.createCameraContext.call(Be, p.default.currentWebviewId)
          },
          createLivePlayerContext: function(e, t) {
            var n = t && "number" == typeof t.__wxExparserNodeId__ && -1 !== t.__wxExparserNodeId__ ? t.__wxExparserNodeId__ : "";
            return i.createLivePlayerContext.call(Be, e, p.default.currentWebviewId, n)
          },
          createLivePusherContext: function() {
            return i.createLivePusherContext.call(Be, p.default.currentWebviewId)
          },
          onWebviewEvent: C.event.onWebviewEvent,
          onNativeEvent: C.event.onNativeEvent,
          hideKeyboard: C.hideKeyboard,
          getPublicLibVersion: M.getPublicLibVersion,
          showModal: be,
          showToast: ve,
          hideToast: ge,
          showLoading: _e,
          hideLoading: ye,
          showActionSheet: me,
          reportAnalytics: g.reportAnalytics,
          getClipboardData: k.clipboard.getClipboardData,
          setClipboardData: k.clipboard.setClipboardData,
          createSelectorQuery: f.createSelectorQuery,
          updatePerfData: E.updatePerfData,
          traceEvent: E.traceEvent,
          createWorker: I.createWorker,
          voiceSplitJoint: y.voiceSplitJoint,
          uploadSilkVoice: y.uploadSilkVoice,
          downloadSilkVoice: y.downloadSilkVoice,
          getResPath: y.getResPath,
          setResPath: y.setResPath
        };
      Be.appStatus = c.AppStatus.FORE_GROUND, Be.hanged = !1, (0, r.subscribe)("INVOKE_METHOD", function(e, t) {
        var n = e.name,
          r = e.args;
        Be[n](r, !0)
      }), (0, r.subscribe)("WEBVIEW_ERROR_MSG", function(e, t) {
        var n = e.msg;
        Reporter.triggerErrorMessage(n)
      }), (0, r.onMethod)("onError", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        console.error("thirdScriptError", "\n", "sdk uncaught third Error", "\n", e.message, "\n", e.stack)
      });
      for (var De in Be) ! function(e) {
        je.__defineGetter__(e, function() {
          return "function" == typeof Be[e] ? (0, o.surroundByTryCatchFactory)(Be[e], " at wx." + e) : Be[e]
        })
      }(De);
      !0 === __wxConfig.karmaTest ? e.exports = Be : e.exports = je
    }, function(e, t, n) {
      function r(e, t, n) {
        "background" === _.default.runningStatus && -1 !== y.BackgroudAPIBlackList.indexOf(e) ? n({
          errMsg: e + ":fail can not be invoked in background running status"
        }) : "active" !== _.default.runningStatus && -1 !== y.NotActiveAPIBlackList.indexOf(e) ? n({
          errMsg: e + ":fail can only be invokeed in acitve running status"
        }) : WeixinJSBridge.invoke.apply(WeixinJSBridge, arguments)
      }

      function o() {
        WeixinJSBridge.on.apply(WeixinJSBridge, arguments)
      }

      function i() {
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
          var r = e.data,
            o = e.options,
            i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {},
            a = o && o.timestamp || 0,
            c = Date.now();
          "function" == typeof t && t(r, n), Reporter.speedReport({
            key: "webview2AppService",
            data: r || {},
            timeMark: {
              startTime: a,
              endTime: c,
              nativeTime: i.nativeTime || 0
            }
          })
        }, WeixinJSBridge.subscribe.apply(WeixinJSBridge, e)
      }

      function c(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
        t = (0, v.assign)({}, t);
        var o = {};
        for (var i in t) "function" == typeof t[i] && (!0 === __wxConfig.karmaTest ? o[i] = t[i] : o[i] = Reporter.surroundThirdByTryCatch(t[i], "at api " + e + " " + i + " callback function"), delete t[i]);
        var a = {};
        for (var c in n) "function" == typeof n[c] && (a[c] = (0, v.surroundByTryCatchFactory)(n[c], "at api " + e + " " + c + " callback function"), a[c]._argumentsLength = n[c].length);
        r(e, t, function(t) {
          t.errMsg = t.errMsg || e + ":ok";
          var n = 0 === t.errMsg.indexOf(e + ":ok"),
            r = 0 === t.errMsg.indexOf(e + ":cancel"),
            i = 0 === t.errMsg.indexOf(e + ":fail");
          if ("function" == typeof a.beforeAll && a.beforeAll(t), n) {
            var c = function() {
              "function" == typeof o.success && o.success(t), "function" == typeof a.afterSuccess && a.afterSuccess(t)
            };
            "function" == typeof a.beforeSuccess ? 2 === a.beforeSuccess._argumentsLength ? a.beforeSuccess(t, c) : (a.beforeSuccess(t), c()) : c()
          } else if (r) t.errMsg = t.errMsg.replace(e + ":cancel", e + ":fail cancel"), "function" == typeof o.fail && o.fail(t), "function" == typeof a.beforeCancel && a.beforeCancel(t), "function" == typeof o.cancel && o.cancel(t), "function" == typeof a.afterCancel && a.afterCancel(t);
          else if (i) {
            "function" == typeof a.beforeFail && a.beforeFail(t), "function" == typeof o.fail && o.fail(t);
            var u = !0;
            "function" == typeof a.afterFail && (u = a.afterFail(t)), !1 !== u && Reporter.reportIDKey({
              key: e + "_fail"
            })
          }
          "function" == typeof o.complete && o.complete(t), "function" == typeof a.afterAll && a.afterAll(t), (0, b.reportJSAPI)(e, n, i, r, t.errMsg)
        }), Reporter.reportIDKey({
          key: e
        })
      }

      function u(e, t) {
        o(e, (0, v.surroundByTryCatchFactory)(t, "at api " + e + " callback function"))
      }

      function s() {}

      function l(e, t, n) {
        var r = (0, v.paramCheck)(t, n);
        return !r || (f(e, t, "parameter error: " + r), !1)
      }

      function f(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
          r = arguments[3],
          o = e + ":fail " + n;
        console.error(o);
        var i = Reporter.surroundThirdByTryCatch(t.fail || s, "at api " + e + " fail callback function"),
          a = Reporter.surroundThirdByTryCatch(t.complete || s, "at api " + e + " complete callback function"),
          c = {
            errMsg: o
          };
        "number" == typeof r && (c.errCode = r), i(c), a(c)
      }

      function d(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
          n = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2],
          r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "",
          o = arguments[4],
          i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : {},
          a = n ? e + ":ok" : e + ":fail " + r;
        n || console.error(a);
        var c = Reporter.surroundThirdByTryCatch((n ? t.success : t.fail) || s, "at api " + e + " " + (n ? "success" : "fail") + " callback function"),
          u = Reporter.surroundThirdByTryCatch(t.complete || s, "at api " + e + " complete callback function");
        i.errMsg = a, "number" == typeof o && (i.errCode = o), c(i), u(i)
      }

      function p(e, t, n) {
        var r = t.replace(/\.html\?.*|\.html$/, "");
        return -1 !== __wxConfig.pages.indexOf(r) || (f(e, n, 'url "' + (0, v.removeHtmlSuffixFromUrl)(t) + '" is not in app.json'), !1)
      }

      function h(e, t, n) {
        var r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
          o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : function() {};
        return function(i) {
          n = o(i), c("operateWXData", Object.assign({}, i, {
            data: Object.assign({
              api_name: t
            }, r, n ? {
              data: n
            } : void 0)
          }), {
            beforeAll: function(t) {
              t.errMsg = t.errMsg.replace("operateWXData", e)
            },
            beforeSuccess: function(e) {
              if ("android" === (0, v.getPlatform)() && (e.data = JSON.parse(e.data)), e.data.data) {
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
      }), t.invoke = r, t.on = o, t.publish = i, t.subscribe = a, t.invokeMethod = c, t.onMethod = u, t.noop = s, t.beforeInvoke = l, t.beforeInvokeFail = f, t.beforeInvokeCallback = d, t.checkUrlInConfig = p, t.operateWXDataFactory = h;
      var v = n(2),
        g = n(3),
        _ = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(g),
        y = n(4),
        b = n(5)
    }, function(e, t) {
      function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function r(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }

      function o(e, t) {
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

      function i(e, t) {
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

      function c(e, t) {
        return e = "String" == t ? e : "Array" == t || "Object" == t ? JSON.parse(e) : "Number" == t ? parseFloat(e) : "Boolean" == t ? "true" == e : "Date" == t ? new Date(parseInt(e)) : "Undefined" == t ? void 0 : "Null" == t ? null : ""
      }

      function u(e) {
        return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
      }

      function s(e) {
        return "Object" === u(e)
      }

      function l(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "parameter",
          r = u(t),
          o = u(e);
        if (o != r) return n + " should be " + r + " instead of " + o + ";";
        var i = "";
        switch (r) {
          case "Object":
            for (var a in t) i += l(e[a], t[a], n + "." + a);
            break;
          case "Array":
            if (e.length < t.length) return n + " should have at least " + t.length + " item;";
            for (var c = 0; c < t.length; ++c) i += l(e[c], t[c], n + "[" + c + "]")
        }
        return i
      }

      function f(e, t) {
        if ((!(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2]) && (t = y(t)), 0 === t.indexOf("/")) return t.substr(1);
        if (0 === t.indexOf("./")) return f(e, t.substr(2), !1);
        var n, r, o = t.split("/");
        for (n = 0, r = o.length; n < r && ".." === o[n]; n++);
        o.splice(0, n);
        var t = o.join("/"),
          i = e.length > 0 ? e.split("/") : [];
        return i.splice(i.length - n - 1, n + 1), i.concat(o).join("/")
      }

      function d() {
        return "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios"
      }

      function p(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        if ("object" !== (void 0 === e ? "undefined" : O(e))) return e;
        var n = [];
        for (var r in e)
          if (e.hasOwnProperty(r))
            if (t) try {
              n.push(encodeURIComponent(r) + "=" + encodeURIComponent(e[r]))
            } catch (t) {
              n.push(r + "=" + e[r])
            } else n.push(r + "=" + e[r]);
        return n.join("&")
      }

      function h(e, t) {
        if ("string" == typeof e && "object" === (void 0 === t ? "undefined" : O(t)) && null !== t && Object.keys(t).length > 0) {
          var n = e.split("?");
          return n[0] + "?" + p(g((n[1] || "").split("&").reduce(function(e, t) {
            if ("string" == typeof t && t.length > 0) {
              var n = t.split("="),
                r = n[0],
                o = n[1];
              e[r] = o
            }
            return e
          }, {}), Object.keys(t).reduce(function(e, n) {
            return "object" === O(t[n]) ? e[encodeURIComponent(n)] = encodeURIComponent(JSON.stringify(t[n])) : e[encodeURIComponent(n)] = encodeURIComponent(t[n]), e
          }, {})))
        }
        return e
      }

      function v(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "http";
        return "http" === t ? /^(http|https):\/\/.*/i.test(e) : "websocket" === t ? /^(ws|wss):\/\/.*/i.test(e) : void 0
      }

      function g() {
        for (var e = arguments.length, t = Array(e), n = 0; n < e; n++) t[n] = arguments[n];
        return t.reduce(function(e, t) {
          for (var n in t) e[n] = t[n];
          return e
        }, {})
      }

      function _(e) {
        if ("string" == typeof e) {
          var t = e.split("?"),
            n = t[0],
            r = (t[1] || "").split("&").reduce(function(e, t) {
              if ("string" == typeof t && t.length > 0) {
                var n = t.split("="),
                  r = n[0],
                  o = n[1];
                e[r] = o
              }
              return e
            }, {}),
            o = [];
          for (var i in r) r.hasOwnProperty(i) && o.push(i + "=" + encodeURIComponent(r[i]));
          return o.length > 0 ? n + "?" + o.join("&") : e
        }
        return e
      }

      function y(e) {
        if ("string" != typeof e) return e;
        var t = e.split("?")[0],
          n = e.split("?")[1];
        return t += ".html", void 0 !== n ? t + "?" + n : t
      }

      function b(e) {
        return "string" == typeof e ? -1 !== e.indexOf("?") ? e.replace(/\.html\?/, "?") : e.replace(/\.html$/, "") : e
      }

      function m(e, t) {
        for (var n in t) e[n] = t[n];
        return e
      }

      function w(e) {
        for (var t = "", n = new Uint8Array(e), r = n.byteLength, o = 0; o < r; o++) t += String.fromCharCode(n[o]);
        return I(t)
      }

      function k(e) {
        for (var t = A(e), n = t.length, r = new Uint8Array(n), o = 0; o < n; o++) r[o] = t.charCodeAt(o);
        return r.buffer
      }

      function S(e, t) {
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

      function P() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(e) {
          var t = 16 * Math.random() | 0;
          return ("x" == e ? t : 3 & t | 8).toString(16)
        })
      }

      function x(e, t) {
        switch (d()) {
          case "devtools":
            return !0;
          case "ios":
            return j > e;
          case "android":
            return j > t
        }
        return !1
      }

      function M(e, t, n) {
        !1 !== s(e) && t != n && e.hasOwnProperty(t) && (e[n] = e[t], delete e[t])
      }

      function E(e, t) {
        e = e.split("."), t = t.split(".");
        for (var n = Math.max(e.length, t.length); e.length < n;) e.push("0");
        for (; t.length < n;) t.push("0");
        for (var r = 0; r < n; r++) {
          var o = parseInt(e[r]),
            i = parseInt(t[r]);
          if (o > i) return 1;
          if (o < i) return -1
        }
        return 0
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var O = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      };
      t.surroundByTryCatchFactory = i, t.getDataType = u, t.isObject = s, t.paramCheck = l, t.getRealRoute = f, t.getPlatform = d, t.urlEncodeFormData = p, t.addQueryStringToUrl = h, t.validateUrl = v, t.assign = g, t.encodeUrlQuery = _, t.transWxmlToHtml = y, t.removeHtmlSuffixFromUrl = b, t.extend = m, t.arrayBufferToBase64 = w, t.base64ToArrayBuffer = k, t.blobToArrayBuffer = S, t.convertObjectValueToString = C, t.guid = P, t.checkClientVersion = x, t.renameProperty = M, t.compareVersion = E;
      var T = (t.anyTypeToString = i(a, "anyTypeToString"), t.stringToAnyType = i(c, "stringToAnyType"), t.AppServiceSdkKnownError = function(e) {
          function t(e) {
            n(this, t);
            var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-SDK:" + e));
            return o.type = "AppServiceSdkKnownError", o
          }
          return o(t, e), t
        }(Error), t.ThirdScriptError = function(e) {
          function t(e) {
            n(this, t);
            var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "" + e));
            return o.type = "ThirdScriptError", o
          }
          return o(t, e), t
        }(Error), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="),
        I = I || function(e) {
          for (var t, n, r = String(e), o = "", i = 0, a = T; r.charAt(0 | i) || (a = "=", i % 1); o += a.charAt(63 & t >> 8 - i % 1 * 8)) {
            if ((n = r.charCodeAt(i += .75)) > 255) throw new Error('"btoa" failed');
            t = t << 8 | n
          }
          return o
        },
        A = A || function(e) {
          var t = String(e).replace(/=+$/, ""),
            n = "";
          if (t.length % 4 == 1) throw new Error('"atob" failed');
          for (var r, o, i = 0, a = 0; o = t.charAt(a++); ~o && (r = i % 4 ? 64 * r + o : o, i++ % 4) ? n += String.fromCharCode(255 & r >> (-2 * i & 6)) : 0) o = T.indexOf(o);
          return n
        },
        j = __wxConfig.clientVersion || 1
    }, function(e, t) {
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
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.LOG_LIMIT = 1024, t.AppStatus = {
        FORE_GROUND: 0,
        BACK_GROUND: 1,
        LOCK: 2
      }, t.BackgroudAPIBlackList = [], t.NotActiveAPIBlackList = []
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = {},
        r = {},
        o = {},
        i = 0,
        a = function(e, t) {
          var n = Object.keys(t).map(function(n) {
            return Object.keys(t[n]).map(function(r) {
              return {
                func: n,
                result: e,
                errMsg: r,
                count: t[n][r]
              }
            })
          });
          return [].concat.apply([], n)
        },
        c = function() {
          n = {}, r = {}, o = {}
        },
        u = function() {
          var e = a(1, n),
            t = a(2, r),
            i = a(3, o),
            u = [].concat(e, t, i);
          0 !== u.length && WeixinJSBridge.invoke("reportRealtimeAction", {
            actionData: JSON.stringify({
              dataType: 1,
              dataArray: u,
              appType: Reporter.getAppType()
            })
          }), c()
        },
        s = function(e, t, a, c, s) {
          var l = t ? n : a ? r : o;
          l[e] = l[e] || {}, l[e][s] = (l[e][s] || 0) + 1, Date.now() - i >= 6e4 && (i = Date.now(), setTimeout(u, 6e4))
        };
      t.reportJSAPI = s
    }, function(e, t, n) {
      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createAudioContext = t.createVideoContext = t.createLivePusherContext = t.createLivePlayerContext = t.createInnerAudioContext = t.createMapContext = t.createCameraContext = void 0;
      var o = n(7);
      Object.defineProperty(t, "createCameraContext", {
        enumerable: !0,
        get: function() {
          return o.createCameraContext
        }
      });
      var i = n(72);
      Object.defineProperty(t, "createMapContext", {
        enumerable: !0,
        get: function() {
          return i.createMapContext
        }
      });
      var a = n(73);
      Object.defineProperty(t, "createInnerAudioContext", {
        enumerable: !0,
        get: function() {
          return a.createInnerAudioContext
        }
      });
      var c = n(76);
      Object.defineProperty(t, "createLivePlayerContext", {
        enumerable: !0,
        get: function() {
          return c.createLivePlayerContext
        }
      });
      var u = n(77);
      Object.defineProperty(t, "createLivePusherContext", {
        enumerable: !0,
        get: function() {
          return u.createLivePusherContext
        }
      }), n(78);
      var s = n(89),
        l = r(s),
        f = n(90),
        d = r(f);
      t.createVideoContext = l.default, t.createAudioContext = d.default
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o(e) {
        return new b(e)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.cameraInfo = t.createCameraContext = void 0;
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        a = n(1),
        c = n(2),
        u = n(8),
        s = n(9),
        l = n(38),
        f = {},
        d = {},
        p = {},
        h = [],
        v = {},
        g = new u.EventEmitter2,
        _ = new WeakMap,
        y = function(e) {
          var t = [],
            n = 1;
          return (0, a.subscribe)(e, function(e) {
              t.forEach(function(t) {
                var n = t[0],
                  r = t[1];
                n.cid === e.cid && n.cameraId === e.cameraId && r(e)
              }), t = []
            }),
            function(e, r) {
              e.cid = n++, t.push([e, r])
            }
        }("onOperateCameraCallback");
      (0, a.subscribe)("cameraInserted", function(e, t) {
        var n = e.cameraId,
          r = e.bindings;
        f[t] = n, d[t + "_" + n] = r, g.emit("cameraInsert")
      }), (0, a.subscribe)("cameraUpdated", function(e, t) {
        var n = e.cameraId,
          r = e.hidden;
        p[t + "_" + n] = r
      }), (0, a.subscribe)("cameraRemoved", function(e, t) {
        var n = e.cameraId;
        delete f[t], delete d[t + "_" + n], delete p[t + "_" + n]
      }), s.route.onAppRouteDone(function(e) {
        if ("function" == typeof getCurrentPages) {
          var t = getCurrentPages(),
            n = t.map(function(e) {
              return e.__wxWebviewId__
            });
          Object.keys(f).forEach(function(e) {
            -1 === n.indexOf(Number(e)) && (delete d[e + "_" + f[e]], delete p[e + "_" + f[e]], delete f[e], v[e] && (v[e].forEach(function(e) {
              clearTimeout(e)
            }), delete v[e]))
          })
        }
      }), (0, a.onMethod)("onCameraVideoTaken", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        h.forEach(function(n) {
          n(e, t)
        })
      });
      var b = function() {
        function e(t) {
          r(this, e), this.webviewId = t
        }
        return i(e, [{
          key: "_invoke",
          value: function(e, t) {
            var n = (0, c.getPlatform)();
            t.type = e, "ios" === n || "android" === n ? (0, a.invokeMethod)("operateCamera", t) : (y(t, function(n) {
              function r(t, n) {
                (0, a.invokeMethod)("base64ToTempFilePath", Object.assign({
                  fileType: "jpg",
                  base64Data: o
                }, t), {
                  beforeAll: function(r) {
                    "takePhoto" === t.type ? r.tempImagePath = r.tempFilePath : r.tempFilePath && (r.tempThumbPath = r.tempFilePath), n && (r.tempVideoPath = n), r.errMsg = r.errMsg.replace("base64ToTempFilePath", e), delete r.tempFilePath
                  }
                })
              }
              var o = n.imageData,
                i = n.videoData;
              i ? (0, a.invokeMethod)("base64ToTempFilePath", {
                fileType: "webm",
                base64Data: i,
                complete: function(e) {
                  r(t, e.tempFilePath)
                }
              }) : "startRecord" === e ? ("function" == typeof t.success && t.success({
                errMsg: "startRecord:ok"
              }), "function" == typeof t.complete && t.complete({
                errMsg: "startRecord:ok"
              })) : r(t)
            }), (0, a.publish)("operateCamera", t, [this.webviewId]))
          }
        }, {
          key: "_invokeMethod",
          value: function(e, t) {
            var n = this,
              r = this.webviewId;
            if ("number" == typeof f[r] || f[r]) {
              if (d[this.webviewId + "_" + f[r]].isCancelAuth) return "function" == typeof t.fail && t.fail({
                errMsg: "user cancel auth"
              }), void("function" == typeof t.complete && t.complete({
                errMsg: "user cancel auth"
              }));
              t.cameraId = f[r], this._invoke(e, t)
            } else g.once("cameraInsert", function() {
              n._invokeMethod(e, t)
            })
          }
        }, {
          key: "takePhoto",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (p[this.webviewId + "_" + f[this.webviewId]]) return "function" == typeof e.fail && e.fail({
              errMsg: "Not allow to invoke takePhoto if camera is hidden."
            }), void("function" == typeof e.complete && e.complete({
              errMsg: "Not allow to invoke takePhoto if camera is hidden."
            }));
            this._invokeMethod("takePhoto", e)
          }
        }, {
          key: "startRecord",
          value: function() {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            (0, l.authorize)({
              scope: "scope.record",
              success: function() {
                _.set(e, !0), e._startRecord(t)
              },
              fail: function() {
                "function" == typeof t.fail && t.fail({
                  errMsg: "Failed to invoke 'startRecord' on 'CameraContext': not allowed to use microphone."
                }), "function" == typeof t.complete && t.complete({
                  errMsg: "Failed to invoke 'startRecord' on 'CameraContext': not allowed to use microphone."
                })
              }
            })
          }
        }, {
          key: "_startRecord",
          value: function() {
            var e = this,
              t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if (_.get(this)) {
              if (p[this.webviewId + "_" + f[this.webviewId]]) return "function" == typeof t.fail && t.fail({
                errMsg: "Not allow to invoke takePhoto if camera is hidden."
              }), void("function" == typeof t.complete && t.complete({
                errMsg: "Not allow to invoke takePhoto if camera is hidden."
              }));
              var n = t.timeoutCallback,
                r = t.fail;
              if (t.fail = function(t) {
                  e._isRecording = !1, clearTimeout(o), "function" == typeof r && r(t)
                }, this._invokeMethod("startRecord", t), !this._isRecording) {
                this._isRecording = !0;
                var o = this._timer = setTimeout(function() {
                  e._isRecording && (e.stopRecord({
                    complete: n || function() {}
                  }), e._isRecording = !1)
                }, 3e4);
                v[this.webviewId] ? v[this.webviewId].push(o) : v[this.webviewId] = [o];
                var i = this._videoTaken = function(t, r) {
                  if (t.cameraId === f[r]) {
                    var a = h.indexOf(i);
                    a > -1 && h.splice(a, 1), e._isRecording && (delete t.cameraId, "function" == typeof n && n(t), e._isRecording = !1, clearTimeout(o))
                  }
                };
                h.push(i)
              }
            }
          }
        }, {
          key: "stopRecord",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = h.indexOf(this._videoTaken);
            t > -1 && (h.splice(t, 1), this._videoTaken = null), this._invokeMethod("stopRecord", e), this._isRecording = !1, clearTimeout(this._timer)
          }
        }]), e
      }();
      t.createCameraContext = o, t.cameraInfo = d
    }, function(e, t, n) {
      var r, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      };
      ! function(i) {
        function a() {
          this._events = {}, this._conf && c.call(this, this._conf)
        }

        function c(e) {
          e ? (this._conf = e, e.delimiter && (this.delimiter = e.delimiter), this._events.maxListeners = e.maxListeners !== i ? e.maxListeners : p, e.wildcard && (this.wildcard = e.wildcard), e.newListener && (this.newListener = e.newListener), e.verboseMemoryLeak && (this.verboseMemoryLeak = e.verboseMemoryLeak), this.wildcard && (this.listenerTree = {})) : this._events.maxListeners = p
        }

        function u(e, t) {
          var n = "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.";
          this.verboseMemoryLeak ? (n += " Event name: %s.", console.error(n, e, t)) : console.error(n, e), console.trace && console.trace()
        }

        function s(e) {
          this._events = {}, this.newListener = !1, this.verboseMemoryLeak = !1, c.call(this, e)
        }

        function l(e, t, n, r) {
          if (!n) return [];
          var o, i, a, c, u, s, f, d = [],
            p = t.length,
            h = t[r],
            v = t[r + 1];
          if (r === p && n._listeners) {
            if ("function" == typeof n._listeners) return e && e.push(n._listeners), [n];
            for (o = 0, i = n._listeners.length; o < i; o++) e && e.push(n._listeners[o]);
            return [n]
          }
          if ("*" === h || "**" === h || n[h]) {
            if ("*" === h) {
              for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && (d = d.concat(l(e, t, n[a], r + 1)));
              return d
            }
            if ("**" === h) {
              f = r + 1 === p || r + 2 === p && "*" === v, f && n._listeners && (d = d.concat(l(e, t, n, p)));
              for (a in n) "_listeners" !== a && n.hasOwnProperty(a) && ("*" === a || "**" === a ? (n[a]._listeners && !f && (d = d.concat(l(e, t, n[a], p))), d = d.concat(l(e, t, n[a], r))) : d = a === v ? d.concat(l(e, t, n[a], r + 2)) : d.concat(l(e, t, n[a], r)));
              return d
            }
            d = d.concat(l(e, t, n[h], r + 1))
          }
          if (c = n["*"], c && l(e, t, c, r + 1), u = n["**"])
            if (r < p) {
              u._listeners && l(e, t, u, p);
              for (a in u) "_listeners" !== a && u.hasOwnProperty(a) && (a === v ? l(e, t, u[a], r + 2) : a === h ? l(e, t, u[a], r + 1) : (s = {}, s[a] = u[a], l(e, t, {
                "**": s
              }, r + 1)))
            } else u._listeners ? l(e, t, u, p) : u["*"] && u["*"]._listeners && l(e, t, u["*"], p);
          return d
        }

        function f(e, t) {
          e = "string" == typeof e ? e.split(this.delimiter) : e.slice();
          for (var n = 0, r = e.length; n + 1 < r; n++)
            if ("**" === e[n] && "**" === e[n + 1]) return;
          for (var o = this.listenerTree, a = e.shift(); a !== i;) {
            if (o[a] || (o[a] = {}), o = o[a], 0 === e.length) return o._listeners ? ("function" == typeof o._listeners && (o._listeners = [o._listeners]), o._listeners.push(t), !o._listeners.warned && this._events.maxListeners > 0 && o._listeners.length > this._events.maxListeners && (o._listeners.warned = !0, u.call(this, o._listeners.length, a))) : o._listeners = t, !0;
            a = e.shift()
          }
          return !0
        }
        var d = Array.isArray ? Array.isArray : function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
          },
          p = 10;
        s.EventEmitter2 = s, s.prototype.delimiter = ".", s.prototype.setMaxListeners = function(e) {
          e !== i && (this._events || a.call(this), this._events.maxListeners = e, this._conf || (this._conf = {}), this._conf.maxListeners = e)
        }, s.prototype.event = "", s.prototype.once = function(e, t) {
          return this.many(e, 1, t), this
        }, s.prototype.many = function(e, t, n) {
          function r() {
            0 == --t && o.off(e, r), n.apply(this, arguments)
          }
          var o = this;
          if ("function" != typeof n) throw new Error("many only accepts instances of Function");
          return r._origin = n, this.on(e, r), o
        }, s.prototype.emit = function() {
          this._events || a.call(this);
          var e = arguments[0];
          if ("newListener" === e && !this.newListener && !this._events.newListener) return !1;
          var t, n, r, o, i, c = arguments.length;
          if (this._all && this._all.length) {
            if (i = this._all.slice(), c > 3)
              for (t = new Array(c), o = 0; o < c; o++) t[o] = arguments[o];
            for (r = 0, n = i.length; r < n; r++) switch (this.event = e, c) {
              case 1:
                i[r].call(this, e);
                break;
              case 2:
                i[r].call(this, e, arguments[1]);
                break;
              case 3:
                i[r].call(this, e, arguments[1], arguments[2]);
                break;
              default:
                i[r].apply(this, t)
            }
          }
          if (this.wildcard) {
            i = [];
            var u = "string" == typeof e ? e.split(this.delimiter) : e.slice();
            l.call(this, i, u, this.listenerTree, 0)
          } else {
            if ("function" == typeof(i = this._events[e])) {
              switch (this.event = e, c) {
                case 1:
                  i.call(this);
                  break;
                case 2:
                  i.call(this, arguments[1]);
                  break;
                case 3:
                  i.call(this, arguments[1], arguments[2]);
                  break;
                default:
                  for (t = new Array(c - 1), o = 1; o < c; o++) t[o - 1] = arguments[o];
                  i.apply(this, t)
              }
              return !0
            }
            i && (i = i.slice())
          }
          if (i && i.length) {
            if (c > 3)
              for (t = new Array(c - 1), o = 1; o < c; o++) t[o - 1] = arguments[o];
            for (r = 0, n = i.length; r < n; r++) switch (this.event = e, c) {
              case 1:
                i[r].call(this);
                break;
              case 2:
                i[r].call(this, arguments[1]);
                break;
              case 3:
                i[r].call(this, arguments[1], arguments[2]);
                break;
              default:
                i[r].apply(this, t)
            }
            return !0
          }
          if (!this._all && "error" === e) throw arguments[1] instanceof Error ? arguments[1] : new Error("Uncaught, unspecified 'error' event.");
          return !!this._all
        }, s.prototype.emitAsync = function() {
          this._events || a.call(this);
          var e = arguments[0];
          if ("newListener" === e && !this.newListener && !this._events.newListener) return Promise.resolve([!1]);
          var t, n, r, o, i, c = [],
            u = arguments.length;
          if (this._all) {
            if (u > 3)
              for (t = new Array(u), o = 1; o < u; o++) t[o] = arguments[o];
            for (r = 0, n = this._all.length; r < n; r++) switch (this.event = e, u) {
              case 1:
                c.push(this._all[r].call(this, e));
                break;
              case 2:
                c.push(this._all[r].call(this, e, arguments[1]));
                break;
              case 3:
                c.push(this._all[r].call(this, e, arguments[1], arguments[2]));
                break;
              default:
                c.push(this._all[r].apply(this, t))
            }
          }
          if (this.wildcard) {
            i = [];
            var s = "string" == typeof e ? e.split(this.delimiter) : e.slice();
            l.call(this, i, s, this.listenerTree, 0)
          } else i = this._events[e];
          if ("function" == typeof i) switch (this.event = e, u) {
            case 1:
              c.push(i.call(this));
              break;
            case 2:
              c.push(i.call(this, arguments[1]));
              break;
            case 3:
              c.push(i.call(this, arguments[1], arguments[2]));
              break;
            default:
              for (t = new Array(u - 1), o = 1; o < u; o++) t[o - 1] = arguments[o];
              c.push(i.apply(this, t))
          } else if (i && i.length) {
            if (u > 3)
              for (t = new Array(u - 1), o = 1; o < u; o++) t[o - 1] = arguments[o];
            for (r = 0, n = i.length; r < n; r++) switch (this.event = e, u) {
              case 1:
                c.push(i[r].call(this));
                break;
              case 2:
                c.push(i[r].call(this, arguments[1]));
                break;
              case 3:
                c.push(i[r].call(this, arguments[1], arguments[2]));
                break;
              default:
                c.push(i[r].apply(this, t))
            }
          } else if (!this._all && "error" === e) return arguments[1] instanceof Error ? Promise.reject(arguments[1]) : Promise.reject("Uncaught, unspecified 'error' event.");
          return Promise.all(c)
        }, s.prototype.on = function(e, t) {
          if ("function" == typeof e) return this.onAny(e), this;
          if ("function" != typeof t) throw new Error("on only accepts instances of Function");
          return this._events || a.call(this), this.emit("newListener", e, t), this.wildcard ? (f.call(this, e, t), this) : (this._events[e] ? ("function" == typeof this._events[e] && (this._events[e] = [this._events[e]]), this._events[e].push(t), !this._events[e].warned && this._events.maxListeners > 0 && this._events[e].length > this._events.maxListeners && (this._events[e].warned = !0, u.call(this, this._events[e].length, e))) : this._events[e] = t, this)
        }, s.prototype.onAny = function(e) {
          if ("function" != typeof e) throw new Error("onAny only accepts instances of Function");
          return this._all || (this._all = []), this._all.push(e), this
        }, s.prototype.addListener = s.prototype.on, s.prototype.off = function(e, t) {
          function n(e) {
            if (e !== i) {
              var t = Object.keys(e);
              for (var r in t) {
                var a = t[r],
                  c = e[a];
                c instanceof Function || "object" !== (void 0 === c ? "undefined" : o(c)) || null === c || (Object.keys(c).length > 0 && n(e[a]), 0 === Object.keys(c).length && delete e[a])
              }
            }
          }
          if ("function" != typeof t) throw new Error("removeListener only takes instances of Function");
          var r, a = [];
          if (this.wildcard) {
            var c = "string" == typeof e ? e.split(this.delimiter) : e.slice();
            a = l.call(this, null, c, this.listenerTree, 0)
          } else {
            if (!this._events[e]) return this;
            r = this._events[e], a.push({
              _listeners: r
            })
          }
          for (var u = 0; u < a.length; u++) {
            var s = a[u];
            if (r = s._listeners, d(r)) {
              for (var f = -1, p = 0, h = r.length; p < h; p++)
                if (r[p] === t || r[p].listener && r[p].listener === t || r[p]._origin && r[p]._origin === t) {
                  f = p;
                  break
                }
              if (f < 0) continue;
              return this.wildcard ? s._listeners.splice(f, 1) : this._events[e].splice(f, 1), 0 === r.length && (this.wildcard ? delete s._listeners : delete this._events[e]), this.emit("removeListener", e, t), this
            }(r === t || r.listener && r.listener === t || r._origin && r._origin === t) && (this.wildcard ? delete s._listeners : delete this._events[e], this.emit("removeListener", e, t))
          }
          return n(this.listenerTree), this
        }, s.prototype.offAny = function(e) {
          var t, n = 0,
            r = 0;
          if (e && this._all && this._all.length > 0) {
            for (t = this._all, n = 0, r = t.length; n < r; n++)
              if (e === t[n]) return t.splice(n, 1), this.emit("removeListenerAny", e), this
          } else {
            for (t = this._all, n = 0, r = t.length; n < r; n++) this.emit("removeListenerAny", t[n]);
            this._all = []
          }
          return this
        }, s.prototype.removeListener = s.prototype.off, s.prototype.removeAllListeners = function(e) {
          if (0 === arguments.length) return !this._events || a.call(this), this;
          if (this.wildcard)
            for (var t = "string" == typeof e ? e.split(this.delimiter) : e.slice(), n = l.call(this, null, t, this.listenerTree, 0), r = 0; r < n.length; r++) {
              var o = n[r];
              o._listeners = null
            } else this._events && (this._events[e] = null);
          return this
        }, s.prototype.listeners = function(e) {
          if (this.wildcard) {
            var t = [],
              n = "string" == typeof e ? e.split(this.delimiter) : e.slice();
            return l.call(this, t, n, this.listenerTree, 0), t
          }
          return this._events || a.call(this), this._events[e] || (this._events[e] = []), d(this._events[e]) || (this._events[e] = [this._events[e]]), this._events[e]
        }, s.prototype.listenerCount = function(e) {
          return this.listeners(e).length
        }, s.prototype.listenersAny = function() {
          return this._all ? this._all : []
        }, (r = function() {
          return s
        }.call(t, n, t, e)) !== i && (e.exports = r)
      }()
    }, function(e, t, n) {
      function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.event = t.route = t.tabBar = t.topBar = t.navigationBar = t.interaction = void 0;
      var o = n(10);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(11);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var a = n(12);
      Object.keys(a).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return a[e]
          }
        })
      });
      var c = n(13);
      Object.keys(c).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return c[e]
          }
        })
      });
      var u = n(14);
      Object.keys(u).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return u[e]
          }
        })
      });
      var s = n(15),
        l = r(s),
        f = n(16),
        d = r(f),
        p = n(33),
        h = r(p),
        v = n(19),
        g = r(v),
        _ = n(34),
        y = r(_),
        b = n(37),
        m = r(b);
      t.interaction = l, t.navigationBar = d, t.topBar = h, t.tabBar = m, t.route = g, t.event = y
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.pageScrollTo = void 0;
      var r = n(1);
      t.pageScrollTo = function(e) {
        var t = getCurrentPages(),
          n = t[t.length - 1].__wxWebviewId__;
        e.hasOwnProperty("page") && e.page.hasOwnProperty("__wxWebviewId__") && (n = e.page.__wxWebviewId__), (0, r.publish)("pageScrollTo", e, [n])
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.stopPullDownRefresh = t.startPullDownRefresh = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("startPullDownRefresh", e, {})
        },
        i = function(e) {
          (0, r.invokeMethod)("stopPullDownRefresh", e)
        };
      t.startPullDownRefresh = o, t.stopPullDownRefresh = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setPageStyle = void 0;
      var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = n(1),
        i = n(3),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = 0,
        u = {},
        s = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          u[c] = {
            success: e.success,
            fail: e.fail,
            complete: e.complete
          }, (0, o.publish)("setPageStyle", {
            callbackId: c,
            style: e.style
          }, [a.default.currentWebviewId]), c += 1
        };
      (0, o.subscribe)("callbackSetPageStyle", function(e) {
        var t = e.res,
          n = e.callbackId,
          o = t.errMsg,
          i = 0 === o.indexOf("setPageStyle:ok"),
          a = 0 === o.indexOf("setPageStyle:fail"),
          c = u[n];
        delete u[n], "object" === (void 0 === c ? "undefined" : r(c)) && (i ? "function" == typeof c.success && c.success(t) : a && "function" == typeof c.fail && c.fail(t), "function" == typeof c.complete && c.complete(t))
      }), t.setPageStyle = s
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.hideKeyboard = void 0;
      var r = n(2),
        o = n(1);
      t.hideKeyboard = function(e) {
        "devtools" == (0, r.getPlatform)() ? (0, o.publish)("hideKeyboard", {}) : (0, o.invokeMethod)("hideKeyboard", e)
      }
    }, function(e, t, n) {
      function r(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n
        }
        return Array.from(e)
      }

      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createAnimation = void 0;
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        a = n(1),
        c = function() {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            o(this, e), this.actions = [], this.currentTransform = [], this.currentStepAnimates = [], this.option = {
              transition: {
                duration: void 0 !== t.duration ? t.duration : 400,
                timingFunction: void 0 !== t.timingFunction ? t.timingFunction : "linear",
                delay: void 0 !== t.delay ? t.delay : 0
              },
              transformOrigin: t.transformOrigin || "50% 50% 0"
            }
          }
          return i(e, [{
            key: "export",
            value: function() {
              var e = this.actions;
              return this.actions = [], {
                actions: e
              }
            }
          }, {
            key: "step",
            value: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              return this.currentStepAnimates.forEach(function(t) {
                "style" !== t.type ? e.currentTransform[t.type] = t : e.currentTransform[t.type + "." + t.args[0]] = t
              }), this.actions.push({
                animates: Object.keys(this.currentTransform).reduce(function(t, n) {
                  return [].concat(r(t), [e.currentTransform[n]])
                }, []),
                option: {
                  transformOrigin: void 0 !== t.transformOrigin ? t.transformOrigin : this.option.transformOrigin,
                  transition: {
                    duration: void 0 !== t.duration ? t.duration : this.option.transition.duration,
                    timingFunction: void 0 !== t.timingFunction ? t.timingFunction : this.option.transition.timingFunction,
                    delay: void 0 !== t.delay ? t.delay : this.option.transition.delay
                  }
                }
              }), this.currentStepAnimates = [], this
            }
          }, {
            key: "matrix",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 1,
                o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 1,
                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1;
              return this.currentStepAnimates.push({
                type: "matrix",
                args: [e, t, n, r, o, i]
              }), this
            }
          }, {
            key: "matrix3d",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0,
                o = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : 0,
                i = arguments.length > 5 && void 0 !== arguments[5] ? arguments[5] : 1,
                a = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : 0,
                c = arguments.length > 7 && void 0 !== arguments[7] ? arguments[7] : 0,
                u = arguments.length > 8 && void 0 !== arguments[8] ? arguments[8] : 0,
                s = arguments.length > 9 && void 0 !== arguments[9] ? arguments[9] : 0,
                l = arguments.length > 10 && void 0 !== arguments[10] ? arguments[10] : 1,
                f = arguments.length > 11 && void 0 !== arguments[11] ? arguments[11] : 0,
                d = arguments.length > 12 && void 0 !== arguments[12] ? arguments[12] : 0,
                p = arguments.length > 13 && void 0 !== arguments[13] ? arguments[13] : 0,
                h = arguments.length > 14 && void 0 !== arguments[14] ? arguments[14] : 0,
                v = arguments.length > 15 && void 0 !== arguments[15] ? arguments[15] : 1;
              return this.currentStepAnimates.push({
                type: "matrix3d",
                args: [e, t, n, r, o, i, a, c, u, s, l, f, d, p, h, v]
              }), this.stepping = !1, this
            }
          }, {
            key: "rotate",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "rotate",
                args: [e]
              }), this
            }
          }, {
            key: "rotate3d",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0,
                r = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
              return this.currentStepAnimates.push({
                type: "rotate3d",
                args: [e, t, n, r]
              }), this.stepping = !1, this
            }
          }, {
            key: "rotateX",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "rotateX",
                args: [e]
              }), this.stepping = !1, this
            }
          }, {
            key: "rotateY",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "rotateY",
                args: [e]
              }), this.stepping = !1, this
            }
          }, {
            key: "rotateZ",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "rotateZ",
                args: [e]
              }), this.stepping = !1, this
            }
          }, {
            key: "scale",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                t = arguments[1];
              return t = void 0 !== t ? t : e, this.currentStepAnimates.push({
                type: "scale",
                args: [e, t]
              }), this
            }
          }, {
            key: "scale3d",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1;
              return this.currentStepAnimates.push({
                type: "scale3d",
                args: [e, t, n]
              }), this
            }
          }, {
            key: "scaleX",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
              return this.currentStepAnimates.push({
                type: "scaleX",
                args: [e]
              }), this
            }
          }, {
            key: "scaleY",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
              return this.currentStepAnimates.push({
                type: "scaleY",
                args: [e]
              }), this
            }
          }, {
            key: "scaleZ",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 1;
              return this.currentStepAnimates.push({
                type: "scaleZ",
                args: [e]
              }), this
            }
          }, {
            key: "skew",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              return this.currentStepAnimates.push({
                type: "skew",
                args: [e, t]
              }), this
            }
          }, {
            key: "skewX",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "skewX",
                args: [e]
              }), this
            }
          }, {
            key: "skewY",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "skewY",
                args: [e]
              }), this
            }
          }, {
            key: "translate",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              return this.currentStepAnimates.push({
                type: "translate",
                args: [e, t]
              }), this
            }
          }, {
            key: "translate3d",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
                t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
                n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
              return this.currentStepAnimates.push({
                type: "translate3d",
                args: [e, t, n]
              }), this
            }
          }, {
            key: "translateX",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "translateX",
                args: [e]
              }), this
            }
          }, {
            key: "translateY",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "translateY",
                args: [e]
              }), this
            }
          }, {
            key: "translateZ",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
              return this.currentStepAnimates.push({
                type: "translateZ",
                args: [e]
              }), this
            }
          }, {
            key: "opacity",
            value: function(e) {
              return this.currentStepAnimates.push({
                type: "style",
                args: ["opacity", e]
              }), this
            }
          }, {
            key: "backgroundColor",
            value: function(e) {
              return this.currentStepAnimates.push({
                type: "style",
                args: ["background-color", e]
              }), this
            }
          }, {
            key: "width",
            value: function(e) {
              return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                type: "style",
                args: ["width", e]
              }), this
            }
          }, {
            key: "height",
            value: function(e) {
              return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                type: "style",
                args: ["height", e]
              }), this
            }
          }, {
            key: "left",
            value: function(e) {
              return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                type: "style",
                args: ["left", e]
              }), this
            }
          }, {
            key: "right",
            value: function(e) {
              return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                type: "style",
                args: ["right", e]
              }), this
            }
          }, {
            key: "top",
            value: function(e) {
              return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                type: "style",
                args: ["top", e]
              }), this
            }
          }, {
            key: "bottom",
            value: function(e) {
              return "number" == typeof e && (e += "px"), this.currentStepAnimates.push({
                type: "style",
                args: ["bottom", e]
              }), this
            }
          }]), e
        }(),
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, a.beforeInvoke)("createAnimation", e, {})) return new c(e)
        };
      t.createAnimation = u
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.showActionSheet = t.showModal = t.hideLoading = t.showLoading = t.hideToast = t.showToast = void 0;
      var r = n(1),
        o = n(2),
        i = n(3),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = {
              title: "",
              content: "",
              confirmText: "确定",
              cancelText: "取消",
              showCancel: !0,
              confirmColor: "#3CC51F",
              cancelColor: "#000000"
            };
          if (t = (0, o.extend)(t, e), (0, r.beforeInvoke)("showModal", t, {
              title: "",
              content: "",
              confirmText: "",
              cancelText: "",
              confirmColor: "",
              cancelColor: ""
            })) return t.confirmText.length > 4 ? void(0, r.beforeInvokeFail)("showModal", e, "confirmText length should not large then 4") : t.cancelText.length > 4 ? void(0, r.beforeInvokeFail)("showModal", e, "cancelText length should not large then 4") : void(0, r.invokeMethod)("showModal", t, {
            beforeSuccess: function(e) {
              e.confirm = Boolean(e.confirm), "ios" === (0, o.getPlatform)() ? e.cancel = !e.confirm : e.cancel = !e.confirm && Boolean(e.cancel)
            }
          })
        },
        u = 1,
        s = !1,
        l = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = {
              duration: 1500,
              title: "",
              icon: "success",
              mask: !1
            };
          t = (0, o.extend)(t, e), e.image && (t.image = (0, o.getRealRoute)(a.default.lastRoute, e.image, !1)), ["success", "loading", "none"].indexOf(t.icon) < 0 && (t.icon = "success"), "none" === t.icon && (t.icon = ""), (0, r.beforeInvoke)("showToast", t, {
            duration: 1,
            title: "",
            icon: ""
          }) && (s = u++, setTimeout(function() {
            s = !1
          }, t.duration), (0, r.invokeMethod)("showToast", t))
        },
        f = function(e) {
          if ("devtools" === (0, o.getPlatform)() && d && (!s || s < d)) return s = !1, e && "function" == typeof e.success && setTimeout(function() {
            e.success({
              errMsg: "hideToast:ok"
            })
          }), e && "function" == typeof e.complete && setTimeout(function() {
            e.complete({
              errMsg: "hideToast:ok"
            })
          }), void console.warn("请注意 showToast 与 hideToast 必须配对使用");
          s = !1, (0, r.invokeMethod)("hideToast", e)
        },
        d = !1,
        p = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = {
              title: "",
              icon: "loading",
              mask: !1,
              duration: 1e8
            };
          t = (0, o.extend)(t, e), t.icon = "loading", delete t.image, (0, r.beforeInvoke)("showLoading", t, {
            duration: 1,
            title: ""
          }) && (d = u++, (0, r.invokeMethod)("showToast", t, {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("showToast", "showLoading")
            }
          }))
        },
        h = function(e) {
          if ("devtools" === (0, o.getPlatform)() && s && (!d || d < s)) return d = !1, e && "function" == typeof e.success && setTimeout(function() {
            e.success({
              errMsg: "hideLoading:ok"
            })
          }), e && "function" == typeof e.complete && setTimeout(function() {
            e.complete({
              errMsg: "hideLoading:ok"
            })
          }), void console.warn("请注意 showLoading 与 hideLoading 必须配对使用");
          d = !1, (0, r.invokeMethod)("hideToast", e, {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("hideToast", "hideLoading")
            }
          })
        },
        v = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = {
              itemList: [],
              itemColor: "#000000"
            };
          if (t = (0, o.extend)(t, e), delete t.cancelText, delete t.cancelColor, (0, r.beforeInvoke)("showActionSheet", t, {
              itemList: ["1"],
              itemColor: ""
            })) return e.itemList.length > 6 ? void(0, r.beforeInvokeFail)("showActionSheet", e, "parameter error: itemList should not be large than 6") : void(0, r.invokeMethod)("showActionSheet", t)
        };
      t.showToast = l, t.hideToast = f, t.showLoading = p, t.hideLoading = h, t.showModal = c, t.showActionSheet = v
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(17);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(18);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(31);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var a = n(32);
      Object.keys(a).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return a[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.hideNavigationBarLoading = t.showNavigationBarLoading = t.setNavigationBarTitle = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("setNavigationBarTitle", e, {
            title: ""
          }) && (0, r.invokeMethod)("setNavigationBarTitle", e)
        },
        i = function(e) {
          (0, r.invokeMethod)("showNavigationBarLoading", e)
        },
        a = function(e) {
          (0, r.invokeMethod)("hideNavigationBarLoading", e)
        };
      t.setNavigationBarTitle = o, t.showNavigationBarLoading = i, t.hideNavigationBarLoading = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setNavigationBarColor = t.setNavigationBarAlpha = void 0;
      var r = n(1),
        o = n(3),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = n(19),
        c = "#000000";
      __wxConfig.onReady(function() {
        (0, a.onAppRoute)(function() {
          "undefined" != typeof __wxConfig && __wxConfig.global && __wxConfig.global.window && (c = __wxConfig.global.window.navigationBarBackgroundColor || c);
          var e = i.default.lastRoute + ".html";
          "undefined" != typeof __wxConfig && __wxConfig.page && __wxConfig.page[e] && __wxConfig.page[e].window && (c = __wxConfig.page[e].window.navigationBarBackgroundColor || c)
        })
      });
      var u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("setNavigationBarColor", e, {
              frontColor: "",
              backgroundColor: ""
            })) {
            if (-1 === ["#ffffff", "#000000"].indexOf(e.frontColor)) return void(0, r.beforeInvokeFail)("setNavigationBarColor", e, 'invalid frontColor "' + e.frontColor + '"');
            "#ffffff" === e.frontColor ? (0, r.invokeMethod)("setStatusBarStyle", {
              color: "white"
            }) : "#000000" === e.frontColor && (0, r.invokeMethod)("setStatusBarStyle", {
              color: "black"
            });
            var t = Object.assign({}, e);
            c = e.backgroundColor, (0, r.invokeMethod)("setNavigationBarColor", t)
          }
        },
        s = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = Object.assign({}, e);
          t.backgroundColor = c, (0, r.invokeMethod)("setNavigationBarColor", t, {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("setNavigationBarColor", "setNavigationBarAlpha")
            }
          })
        };
      t.setNavigationBarAlpha = s, t.setNavigationBarColor = u
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(20);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(24);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(28);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var a = n(29);
      Object.keys(a).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return a[e]
          }
        })
      });
      var c = n(30);
      Object.keys(c).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return c[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.reLaunch = t.navigateBack = t.switchTab = t.redirectTo = t.navigateTo = void 0;
      var r = n(1),
        o = n(2),
        i = n(3),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = (n(21), function(e) {
          arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          (0, r.beforeInvoke)("redirectTo", e, {
            url: ""
          }) && (e.url = (0, o.getRealRoute)(a.default.lastRoute, e.url), e.url = (0, o.encodeUrlQuery)(e.url), (0, r.checkUrlInConfig)("redirectTo", e.url, e) && (a.default.navigatorLock = !0, (0, r.invokeMethod)("redirectTo", e, {
            afterFail: function() {
              a.default.navigatorLock = !1
            }
          })))
        }),
        u = function(e) {
          arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          if ("active" !== a.default.runningStatus) return void(0, r.beforeInvokeFail)("reLaunch", e, "can not invoke reLaunch in background");
          (0, r.beforeInvoke)("reLaunch", e, {
            url: ""
          }) && (e.url = (0, o.getRealRoute)(a.default.lastRoute, e.url), e.url = (0, o.encodeUrlQuery)(e.url), (0, r.checkUrlInConfig)("reLaunch", e.url, e) && (a.default.navigatorLock = !0, (0, r.invokeMethod)("reLaunch", e, {
            afterFail: function() {
              a.default.navigatorLock = !1
            }
          })))
        },
        s = function(e) {
          arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
          (0, r.beforeInvoke)("navigateTo", e, {
            url: ""
          }) && (e.url = (0, o.getRealRoute)(a.default.lastRoute, e.url), e.url = (0, o.encodeUrlQuery)(e.url), (0, r.checkUrlInConfig)("navigateTo", e.url, e) && (a.default.navigatorLock = !0, (0, r.invokeMethod)("navigateTo", e, {
            afterFail: function() {
              a.default.navigatorLock = !1
            }
          })))
        },
        l = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("switchTab", e, {
            url: ""
          }) && (/\?.*$/.test(e.url) && (console.warn("wx.switchTab: url 不支持 queryString"), e.url = e.url.replace(/\?.*$/, "")), e.url = (0, o.getRealRoute)(a.default.lastRoute, e.url), e.url = (0, o.encodeUrlQuery)(e.url), (0, r.checkUrlInConfig)("switchTab", e.url, e) && (a.default.navigatorLock = !0, (0, r.invokeMethod)("switchTab", e, {
            afterFail: function() {
              a.default.navigatorLock = !1
            }
          })))
        },
        f = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          "number" != typeof e.delta ? e.delta = 1 : (e.delta = parseInt(e.delta), e.delta < 1 && (e.delta = 1)), (0, r.invokeMethod)("navigateBack", e)
        };
      t.navigateTo = s, t.redirectTo = c, t.switchTab = l, t.navigateBack = f, t.reLaunch = u
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o(e) {
        b = e
      }

      function i(e) {
        return "number" == typeof e
      }

      function a(e) {
        var t = null;
        if (null != (t = /^#([0-9|A-F|a-f]{6})$/.exec(e))) {
          var n = parseInt(t[1].slice(0, 2), 16),
            r = parseInt(t[1].slice(2, 4), 16),
            o = parseInt(t[1].slice(4), 16);
          return [n, r, o, 255]
        }
        if (null != (t = /^rgb\((.+)\)$/.exec(e))) return t[1].split(",").map(function(e) {
          return parseInt(e.trim())
        }).concat(255);
        if (null != (t = /^rgba\((.+)\)$/.exec(e))) return t[1].split(",").map(function(e, t) {
          return 3 == t ? Math.floor(255 * parseFloat(e.trim())) : parseInt(e.trim())
        });
        var i = e.toLowerCase();
        if (d.predefinedColor.hasOwnProperty(i)) {
          t = /^#([0-9|A-F|a-f]{6})$/.exec(d.predefinedColor[i]);
          var n = parseInt(t[1].slice(0, 2), 16),
            r = parseInt(t[1].slice(2, 4), 16),
            o = parseInt(t[1].slice(4), 16);
          return [n, r, o, 255]
        }
        console.group("非法颜色: " + e), console.error("不支持颜色：" + e), console.groupEnd()
      }

      function c(e) {
        if (Array.isArray(e)) {
          var t = [];
          return e.forEach(function(e) {
            t.push(c(e))
          }), t
        }
        if ("object" == (void 0 === e ? "undefined" : s(e))) {
          var t = {};
          for (var n in e) t[n] = c(e[n]);
          return t
        }
        return e
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.Context = t.notifyCurrentRoutetoContext = void 0;
      var u = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        l = n(2),
        f = n(22),
        d = n(23),
        p = n(3),
        h = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(p),
        v = ["scale", "rotate", "translate", "save", "restore"],
        g = ["drawImage", "fillText", "fill", "stroke", "fillRect", "strokeRect", "clearRect"],
        _ = ["beginPath", "clip", "moveTo", "lineTo", "rect", "arc", "quadraticCurveTo", "bezierCurveTo", "closePath"],
        y = ["setFillStyle", "setTextAlign", "setStrokeStyle", "setGlobalAlpha", "setShadow", "setFontSize", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit", "setTextBaseline", "setLineDash"],
        b = "",
        m = void 0,
        w = function() {
          function e(t, n) {
            r(this, e), this.type = t, this.data = n, this.colorStop = []
          }
          return u(e, [{
            key: "addColorStop",
            value: function(e, t) {
              this.colorStop.push([e, a(t)])
            }
          }]), e
        }(),
        k = function() {
          function e(t, n, o) {
            r(this, e), this.actions = [], this.path = [], this.webviewId = t, this.canvasId = n, this.useHardwareAccelerate = !0, this.nodeId = o, m = m || (0, l.getPlatform)()
          }
          return u(e, [{
            key: "getActions",
            value: function() {
              var e = c(this.actions);
              return this.actions = [], this.path = [], e
            }
          }, {
            key: "clearActions",
            value: function() {
              this.actions = [], this.path = []
            }
          }, {
            key: "draw",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = arguments[1],
                n = this.canvasId,
                r = c(this.actions),
                o = this.useHardwareAccelerate;
              this.actions = [], this.path = [], this.useHardwareAccelerate = !0, this.isWidgetCanvas ? (0, f.drawCanvas)({
                isWidgetCanvas: !0,
                actions: r,
                reserve: e
              }) : (0, f.drawCanvas)({
                canvasId: n,
                actions: r,
                reserve: e,
                useHardwareAccelerate: o,
                complete: t
              }, this.webviewId, this.nodeId)
            }
          }, {
            key: "createLinearGradient",
            value: function(e, t, n, r) {
              return new w("linear", [e, t, n, r])
            }
          }, {
            key: "createCircularGradient",
            value: function(e, t, n) {
              return new w("radial", [e, t, n])
            }
          }]), e
        }();
      [].concat(v, g).forEach(function(e) {
        k.prototype[e] = "fill" == e || "stroke" == e ? function() {
          this.actions.push({
            method: e + "Path",
            data: c(this.path)
          })
        } : "fillRect" === e ? function(e, t, n, r) {
          this.actions.push({
            method: "fillPath",
            data: [{
              method: "rect",
              data: [e, t, n, r]
            }]
          })
        } : "strokeRect" === e ? function(e, t, n, r) {
          this.actions.push({
            method: "strokePath",
            data: [{
              method: "rect",
              data: [e, t, n, r]
            }]
          })
        } : "fillText" == e ? function(t, n, r) {
          this.actions.push({
            method: e,
            data: [t.toString(), n, r]
          })
        } : "drawImage" == e ? function(t, n, r, o, a, c, u, s, d) {
          if ("devtools" != (0, l.getPlatform)() && !/wxfile:\/\//.test(t))
            if (this.nodeId) {
              var p = (0, f.concatId)(this.webviewId, this.canvasId, this.nodeId),
                v = f.canvas[p];
              if ("number" == typeof v) {
                var g = f.canvasInfo[v];
                t = (0, l.getRealRoute)(g.compPath, t, !1).replace(/\.html$/, "")
              }
            } else t = (0, l.getRealRoute)(h.default.lastRoute, t, !1).replace(/.html$/, "");
          void 0 === d && (c = n, u = r, s = o, d = a, n = void 0, r = void 0, o = void 0, a = void 0);
          var _ = void 0;
          _ = i(n) && i(r) && i(o) && i(a) ? [t, c, u, s, d, n, r, o, a] : i(s) && i(d) ? [t, c, u, s, d] : [t, c, u], this.actions.push({
            method: e,
            data: _
          })
        } : "clearRect" === e ? function() {
          this.useHardwareAccelerate = !1, this.actions.push({
            method: e,
            data: [].slice.apply(arguments)
          })
        } : function() {
          this.actions.push({
            method: e,
            data: [].slice.apply(arguments)
          })
        }
      }), _.forEach(function(e) {
        "beginPath" == e ? k.prototype[e] = function() {
          this.path = []
        } : "clip" == e ? k.prototype[e] = function() {
          this.actions.push({
            method: e,
            data: c(this.path)
          })
        } : "lineTo" == e ? k.prototype.lineTo = function() {
          0 == this.path.length ? this.path.push({
            method: "moveTo",
            data: [].slice.apply(arguments)
          }) : this.path.push({
            method: "lineTo",
            data: [].slice.apply(arguments)
          })
        } : "rect" === e ? k.prototype.rect = function() {
          this.path.push({
            method: e,
            data: [].slice.apply(arguments)
          }), "android" === m && this.path.push({
            method: "closePath",
            data: []
          })
        } : k.prototype[e] = function() {
          this.path.push({
            method: e,
            data: [].slice.apply(arguments)
          })
        }
      }), y.forEach(function(e) {
        k.prototype[e] = "setFillStyle" == e || "setStrokeStyle" == e ? function() {
          var t = arguments[0];
          "string" == typeof t ? this.actions.push({
            method: e,
            data: ["normal", a(t)]
          }) : "object" == (void 0 === t ? "undefined" : s(t)) && t instanceof w && this.actions.push({
            method: e,
            data: [t.type, t.data, t.colorStop]
          })
        } : "setGlobalAlpha" === e ? function() {
          var t = [].slice.apply(arguments, [0, 1]);
          t[0] = Math.floor(255 * parseFloat(t[0])), this.actions.push({
            method: e,
            data: t
          })
        } : "setShadow" == e ? function() {
          var t = [].slice.apply(arguments, [0, 4]);
          t[3] = a(t[3]), this.actions.push({
            method: e,
            data: t
          })
        } : "setLineDash" == e ? function() {
          var t = [].slice.apply(arguments, [0, 2]);
          t[0] = t[0] || [0, 0], t[1] = t[1] || 0, this.actions.push({
            method: e,
            data: t
          })
        } : function() {
          this.actions.push({
            method: e,
            data: [].slice.apply(arguments, [0, 1])
          })
        }
      }), t.notifyCurrentRoutetoContext = o, t.Context = k
    }, function(e, t, n) {
      function r(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
          r = "canvas_" + e + "_" + t + "_";
        return "number" == typeof n && -1 !== n && (r += n), r
      }

      function o(e) {
        var t = [],
          n = 1;
        return (0, _.subscribe)(e, function(e) {
            t.forEach(function(t) {
              var n = t[0],
                r = t[1];
              n.cid === e.cid && n.canvasId === e.canvasId && r(e)
            }), t = []
          }),
          function(e, r) {
            e.cid = n++, t.push([e, r])
          }
      }

      function i(e) {
        for (var t = "", n = 0; n < e.length; n++) t += String.fromCharCode(e[n]);
        return window.__global.btoa(t)
      }

      function a(e) {
        for (var t = window.atob(e), n = t.length, r = new Uint8ClampedArray(n), o = 0; o < n; o++) r[o] = t.charCodeAt(o);
        return r
      }

      function c() {
        for (var e in x) e.indexOf("canvas_" + k.default.currentWebviewId + "_") > -1 && delete x[e]
      }

      function u(e, t, n) {
        var r = {
            errMsg: e + ": " + (n || "fail canvas is empty")
          },
          o = Reporter.surroundThirdByTryCatch(t.fail || S, "at api " + e + " fail callback function"),
          i = Reporter.surroundThirdByTryCatch(t.complete || S, "at api " + e + " complete callback function");
        o(r), i(r)
      }

      function s(e) {
        var t = (0, b.getPlatform)(),
          n = r(k.default.currentWebviewId, e.canvasId),
          o = (0, b.assign)({}, e);
        if ("number" == typeof x[n]) {
          if (o.canvasId = x[n], o.jsInvokedAt = Date.now(), o.x = Number(o.x) || 0, o.y = Number(o.y) || 0, o.width = Number(o.width) || 0, o.height = Number(o.height) || 0, 0 === o.width) return void u("canvasGetImageData", e, "the source width is 0");
          if (0 === o.height) return void u("canvasGetImageData", e, "the source height is 0");
          if ("ios" === t || "android" === t) {
            var i = o.success,
              c = o.fail;
            o.success = function(e) {
              "[object ArrayBuffer]" === Object.prototype.toString.call(e.data) ? (e.width = o.width, e.height = o.height, e.data = new Uint8ClampedArray(e.data), "function" == typeof i && i(e)) : (delete e.data, e.errMsg = "canvasGetImageData: fail", "function" == typeof c && c(e))
            }, (0, _.invokeMethod)("canvasGetImageData", o)
          } else j(o, function(t) {
            var n = {
              width: t.width,
              height: t.height,
              data: a(t.data)
            };
            "function" == typeof e.success && e.success(n), "function" == typeof e.complete && e.complete(n)
          }), (0, _.publish)("invokeCanvasGetImageData", o)
        } else u("canvasGetImageData", e)
      }

      function l(e) {
        var t = (0, b.getPlatform)(),
          n = r(k.default.currentWebviewId, e.canvasId),
          o = (0, b.assign)({}, e);
        return "number" != typeof o.width ? void u("canvasPutImageData", e, "invalid width argument") : o.data && "[object Uint8ClampedArray]" === Object.prototype.toString.call(o.data) ? void("number" == typeof x[n] ? (o.canvasId = x[n], o.jsInvokedAt = Date.now(), o.x = Number(o.x) || 0, o.y = Number(o.y) || 0, o.height = "number" == typeof o.height ? o.height : o.data.length / o.width / 4 | 0, "ios" === t || "android" === t ? (o.data = o.data.buffer, (0, _.invokeMethod)("canvasPutImageData", o)) : (o.data = i(o.data), (0, _.publish)("invokeCanvasPutImageData", o), "function" == typeof e.success && e.success({
          errMsg: "canvasPutImageData:ok"
        }), "function" == typeof e.complete && e.complete({
          errMsg: "canvasPutImageData:ok"
        }))) : u("canvasPutImageData", e)) : void u("canvasPutImageData", e, "data argument must be an Uint8ClampedArray")
      }

      function f(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          r = arguments[3],
          o = arguments[4],
          i = arguments[5],
          a = arguments[6],
          c = (0, b.getPlatform)();
        if ("ios" == c || "android" == c) WeixinJSBridge.invoke("drawCanvas", {
          canvasId: e,
          reserve: n,
          useHardwareAccelerate: r,
          actions: t
        }, function(e) {
          e.errMsg && /ok/.test(e.errMsg) ? "function" == typeof o && o(e) : "function" == typeof i && i(e), "function" == typeof a && a(e)
        });
        else {
          var u = {
            actions: t,
            reserve: n,
            canvasId: e
          };
          B(u, function(e) {
            "function" == typeof a && a({
              errMsg: e.errMsg
            })
          }), (0, _.publish)("canvasActionsChanged", u)
        }
      }

      function d(e) {
        var t = e.isWidgetCanvas,
          n = e.canvasId,
          o = e.actions,
          i = e.reserve,
          a = e.useHardwareAccelerate,
          c = e.success,
          u = e.fail,
          s = e.complete,
          l = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : k.default.currentWebviewId,
          d = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
          p = I();
        if (Array.isArray(o)) {
          if (t) {
            if (p - E < T) {
              var h = {
                errMsg: "drawCanvas:fail 调用 draw 过于频繁。"
              };
              return O += 1, O > 500 && (O = 0, console.warn(h.errMsg)), void("function" == typeof u && u(h))
            }
            return E = p, void WeixinJSBridge.invoke("drawCanvas", {
              canvasId: g,
              reserve: i,
              actions: o
            }, function(e) {
              e.errMsg && /ok/.test(e.errMsg) ? "function" == typeof c && c(e) : "function" == typeof u && u(e), "function" == typeof s && s(e)
            })
          }
          if (n) {
            var v = r(l, n, d);
            if ("number" == typeof x[v]) {
              var g = x[v];
              f(g, o, i, a, c, u, s)
            } else M[v] = M[v] || [], M[v] = M[v].concat({
              actions: o,
              reserve: i,
              useHardwareAccelerate: a,
              success: c,
              fail: u,
              complete: s
            })
          }
        }
      }

      function p(e) {
        var t = (0, b.getPlatform)();
        e.fileType = ["jpg", "png"].indexOf(e.fileType) > -1 ? e.fileType : "png", e.quality = "jpg" === e.fileType ? e.quality < 0 || e.quality > 1 ? 1 : e.quality : 1, e.jpgQuality = e.quality, "ios" === t || "android" === t ? D ? L(D, e) : (0, _.invokeMethod)("getSystemInfo", {}, {
          beforeSuccess: function(t) {
            D = t, L(D, e)
          }
        }) : (A(e, function(t) {
          var n = t.dataUrl;
          (0, _.invokeMethod)("base64ToTempFilePath", (0, b.assign)({
            base64Data: n
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("base64ToTempFilePath", "canvasToTempFilePath")
            }
          })
        }), (0, _.publish)("invokeCanvasToDataUrl", e))
      }

      function h(e, t) {
        var n = t && "number" == typeof t.__wxExparserNodeId__ && -1 !== t.__wxExparserNodeId__ ? t.__wxExparserNodeId__ : "";
        if (e.canvasId) {
          var o = r(k.default.currentWebviewId, e.canvasId, n);
          "number" == typeof x[o] ? (e.canvasId = x[o], p(e)) : u("canvasToTempFilePath", e)
        }
      }

      function v(e) {
        var t = (0, b.getPlatform)();
        "ios" === t || "android" === t ? (0, _.invokeMethod)("canvasToData", e) : (A(e, function(t) {
          var n = t.dataUrl;
          e.success({
            data: n
          })
        }), (0, _.publish)("invokeCanvasToDataUrl", e))
      }

      function g() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = r(k.default.currentWebviewId, e.canvasId),
          n = Object.assign({}, e),
          o = n.success,
          i = n.complete;
        n.success = function(e) {
          var t = "data:image/" + (n.fileType || "png"),
            r = t + ";base64," + e.data;
          "function" == typeof o && o({
            dataURL: r
          }), "function" == typeof i && i({
            dataURL: r
          })
        }, n.complete = S, "number" == typeof x[t] ? (n.canvasId = x[t], v(n)) : u("canvasToDataURL", e)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.canvasPutImageData = t.canvasGetImageData = t.createWidgetContext = t.createCanvasContext = t.createContext = t.canvasToDataURL = t.canvasToTempFilePath = t.drawCanvas = t.clearOldWebviewCanvas = t.concatId = t.canvasInfo = t.canvas = void 0;
      var _ = n(1),
        y = n(21),
        b = n(2),
        m = n(8),
        w = n(3),
        k = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(w),
        S = (new m.EventEmitter2, function() {}),
        C = {},
        P = {},
        x = {},
        M = {},
        E = 0,
        O = 0,
        T = 4500,
        I = Date.now,
        A = o("onCanvasToDataUrl"),
        j = o("onGetImageData"),
        B = o("onDrawCanvas");
      "undefined" != typeof __widgetConfig__ && (T = "number" == typeof __widgetConfig__.drawMinInterval ? __widgetConfig__.drawMinInterval : 25), WeixinJSBridge.subscribe("canvasInsert", function(e, t) {
        var n = e.canvasId,
          o = e.canvasNumber,
          i = e.data,
          a = e.position,
          c = e.nodeId,
          u = e.compPath,
          s = r(t, n, c);
        C[o] = {
          lastTouches: [],
          data: i,
          compPath: u
        }, x[s] = o, P[o] = a, Array.isArray(M[s]) && (M[s].forEach(function(e) {
          f(o, e.actions, e.reserve, e.useHardwareAccelerate, e.success, e.fail, e.complete)
        }), delete M[s])
      }), WeixinJSBridge.subscribe("canvasUpdate", function(e, t) {
        var n = (e.canvasId, e.canvasNumber),
          r = e.position;
        P.hasOwnProperty(n) && (P[n] = r)
      }), WeixinJSBridge.subscribe("canvasRemove", function(e, t) {
        var n = e.canvasId,
          o = e.nodeId,
          i = r(t, n, o);
        x[i] && delete x[i]
      });
      var D = void 0;
      (0, _.invokeMethod)("getSystemInfo", {}, {
        beforeSuccess: function(e) {
          D = e
        }
      });
      var N = function(e, t, n, r) {
          n *= t, r *= t, e.x = e.x ? e.x * t : 0, e.y = e.y ? e.y * t : 0, (e.x < 0 || e.x > n) && (e.x = 0), (e.y < 0 || e.y > r) && (e.y = 0), e.width = e.width ? Math.min(n - e.x, e.width * t) : n - e.x, e.height = e.height ? Math.min(r - e.y, e.height * t) : r - e.y, e.destWidth = e.destWidth ? e.destWidth / t : e.width / t,
            e.destHeight = e.destHeight ? e.destHeight / t : e.height / t
        },
        R = function(e, t, n, r) {
          e.x = e.x ? e.x : 0, e.y = e.y ? e.y : 0, (e.x < 0 || e.x > n) && (e.x = 0), (e.y < 0 || e.y > r) && (e.y = 0), e.width = e.width ? Math.min(n - e.x, e.width) : n - e.x, e.height = e.height ? Math.min(r - e.y, e.height) : r - e.y, e.destWidth = e.destWidth ? e.destWidth : e.width * t, e.destHeight = e.destHeight ? e.destHeight : e.height * t
        },
        L = function(e, t) {
          var n = (0, b.assign)({}, t);
          n.success = t.success, n.fail = t.fail, n.complete = t.complete;
          var r = 300,
            o = 150;
          P.hasOwnProperty(t.canvasId) && (r = P[t.canvasId].width, o = P[t.canvasId].height), "ios" !== (0, b.getPlatform)() || "6.5.10" !== e.version && "6.5.11" !== e.version && "6.5.12" !== e.version ? R(n, e.pixelRatio, r, o) : N(n, e.pixelRatio, r, o), (0, _.invokeMethod)("canvasToTempFilePath", n)
        },
        F = function() {
          return new y.Context
        },
        W = function() {
          var e = new y.Context;
          return e.isWidgetCanvas = !0, e
        },
        V = function(e, t) {
          var n = t && "number" == typeof t.__wxExparserNodeId__ && -1 !== t.__wxExparserNodeId__ ? t.__wxExparserNodeId__ : "";
          return new y.Context(k.default.currentWebviewId, e, n)
        };
      t.canvas = x, t.canvasInfo = C, t.concatId = r, t.clearOldWebviewCanvas = c, t.drawCanvas = d, t.canvasToTempFilePath = h, t.canvasToDataURL = g, t.createContext = F, t.createCanvasContext = V, t.createWidgetContext = W, t.canvasGetImageData = s, t.canvasPutImageData = l
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = {
        aliceblue: "#f0f8ff",
        antiquewhite: "#faebd7",
        aqua: "#00ffff",
        aquamarine: "#7fffd4",
        azure: "#f0ffff",
        beige: "#f5f5dc",
        bisque: "#ffe4c4",
        black: "#000000",
        blanchedalmond: "#ffebcd",
        blue: "#0000ff",
        blueviolet: "#8a2be2",
        brown: "#a52a2a",
        burlywood: "#deb887",
        cadetblue: "#5f9ea0",
        chartreuse: "#7fff00",
        chocolate: "#d2691e",
        coral: "#ff7f50",
        cornflowerblue: "#6495ed",
        cornsilk: "#fff8dc",
        crimson: "#dc143c",
        cyan: "#00ffff",
        darkblue: "#00008b",
        darkcyan: "#008b8b",
        darkgoldenrod: "#b8860b",
        darkgray: "#a9a9a9",
        darkgrey: "#a9a9a9",
        darkgreen: "#006400",
        darkkhaki: "#bdb76b",
        darkmagenta: "#8b008b",
        darkolivegreen: "#556b2f",
        darkorange: "#ff8c00",
        darkorchid: "#9932cc",
        darkred: "#8b0000",
        darksalmon: "#e9967a",
        darkseagreen: "#8fbc8f",
        darkslateblue: "#483d8b",
        darkslategray: "#2f4f4f",
        darkslategrey: "#2f4f4f",
        darkturquoise: "#00ced1",
        darkviolet: "#9400d3",
        deeppink: "#ff1493",
        deepskyblue: "#00bfff",
        dimgray: "#696969",
        dimgrey: "#696969",
        dodgerblue: "#1e90ff",
        firebrick: "#b22222",
        floralwhite: "#fffaf0",
        forestgreen: "#228b22",
        fuchsia: "#ff00ff",
        gainsboro: "#dcdcdc",
        ghostwhite: "#f8f8ff",
        gold: "#ffd700",
        goldenrod: "#daa520",
        gray: "#808080",
        grey: "#808080",
        green: "#008000",
        greenyellow: "#adff2f",
        honeydew: "#f0fff0",
        hotpink: "#ff69b4",
        indianred: "#cd5c5c",
        indigo: "#4b0082",
        ivory: "#fffff0",
        khaki: "#f0e68c",
        lavender: "#e6e6fa",
        lavenderblush: "#fff0f5",
        lawngreen: "#7cfc00",
        lemonchiffon: "#fffacd",
        lightblue: "#add8e6",
        lightcoral: "#f08080",
        lightcyan: "#e0ffff",
        lightgoldenrodyellow: "#fafad2",
        lightgray: "#d3d3d3",
        lightgrey: "#d3d3d3",
        lightgreen: "#90ee90",
        lightpink: "#ffb6c1",
        lightsalmon: "#ffa07a",
        lightseagreen: "#20b2aa",
        lightskyblue: "#87cefa",
        lightslategray: "#778899",
        lightslategrey: "#778899",
        lightsteelblue: "#b0c4de",
        lightyellow: "#ffffe0",
        lime: "#00ff00",
        limegreen: "#32cd32",
        linen: "#faf0e6",
        magenta: "#ff00ff",
        maroon: "#800000",
        mediumaquamarine: "#66cdaa",
        mediumblue: "#0000cd",
        mediumorchid: "#ba55d3",
        mediumpurple: "#9370db",
        mediumseagreen: "#3cb371",
        mediumslateblue: "#7b68ee",
        mediumspringgreen: "#00fa9a",
        mediumturquoise: "#48d1cc",
        mediumvioletred: "#c71585",
        midnightblue: "#191970",
        mintcream: "#f5fffa",
        mistyrose: "#ffe4e1",
        moccasin: "#ffe4b5",
        navajowhite: "#ffdead",
        navy: "#000080",
        oldlace: "#fdf5e6",
        olive: "#808000",
        olivedrab: "#6b8e23",
        orange: "#ffa500",
        orangered: "#ff4500",
        orchid: "#da70d6",
        palegoldenrod: "#eee8aa",
        palegreen: "#98fb98",
        paleturquoise: "#afeeee",
        palevioletred: "#db7093",
        papayawhip: "#ffefd5",
        peachpuff: "#ffdab9",
        peru: "#cd853f",
        pink: "#ffc0cb",
        plum: "#dda0dd",
        powderblue: "#b0e0e6",
        purple: "#800080",
        rebeccapurple: "#663399",
        red: "#ff0000",
        rosybrown: "#bc8f8f",
        royalblue: "#4169e1",
        saddlebrown: "#8b4513",
        salmon: "#fa8072",
        sandybrown: "#f4a460",
        seagreen: "#2e8b57",
        seashell: "#fff5ee",
        sienna: "#a0522d",
        silver: "#c0c0c0",
        skyblue: "#87ceeb",
        slateblue: "#6a5acd",
        slategray: "#708090",
        slategrey: "#708090",
        snow: "#fffafa",
        springgreen: "#00ff7f",
        steelblue: "#4682b4",
        tan: "#d2b48c",
        teal: "#008080",
        thistle: "#d8bfd8",
        tomato: "#ff6347",
        turquoise: "#40e0d0",
        violet: "#ee82ee",
        wheat: "#f5deb3",
        white: "#ffffff",
        whitesmoke: "#f5f5f5",
        yellow: "#ffff00",
        yellowgreen: "#9acd32"
      };
      t.predefinedColor = n
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onAppRoute = void 0;
      var r = n(1),
        o = n(3),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = n(22),
        c = n(25),
        u = n(26),
        s = function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return t.default = e, t
        }(u),
        l = n(21),
        f = [];
      (0, r.onMethod)("onAppRoute", function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (e.path = e.path.substring(0, e.path.length - 5), e.webviewId = void 0 !== e.webviewId ? e.webviewId : t, i.default.lastRoute = e.path, "redirectTo" !== e.openType && "reLaunch" !== e.openType && (0, l.notifyCurrentRoutetoContext)(i.default.lastRoute), "appLaunch" !== e.openType && "autoReLaunch" !== e.openType)
          for (var n in e.query) try {
            e.query[n] = decodeURIComponent(e.query[n])
          } catch (e) {}
        i.default.query = e.query, "navigateBack" != e.openType && "redirectTo" != e.openType || (0, a.clearOldWebviewCanvas)(), i.default.currentWebviewId = e.webviewId, (0, c.checkNeedAppEnterForegroundPatch)() && s.emitter.emit("onAppRoute"), f.forEach(function(t) {
          t(e)
        })
      });
      t.onAppRoute = function(e, t) {
        f.push(e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkNeedFixMPCustomMenuScenePatch = t.checkNeedAppEnterForegroundPatch = void 0;
      var r = (n(1), n(2)),
        o = function() {
          var e = !1;
          return "ios" === (0, r.getPlatform)() ? e = !0 : "android" === (0, r.getPlatform)() && __wxConfig.clientVersion >= 637865520 && (e = !0),
            function() {
              return e
            }
        }(),
        i = function() {
          var e = !1;
          return "ios" === (0, r.getPlatform)() && __wxConfig.clientVersion >= 369430528 && __wxConfig.clientVersion <= 369431296 && (e = !0), e
        };
      t.checkNeedAppEnterForegroundPatch = o, t.checkNeedFixMPCustomMenuScenePatch = i
    }, function(e, t, n) {
      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onBeforeShareAppMessage = t.triggerBeforeShareAppMessage = t.onBeforeUnloadPage = t.triggerBeforeUnloadPage = t.onPageReload = t.onAppRunningStatusChange = t.onAppUnhang = t.onAppEnterBackground = t.onAppEnterForeground = t.emitter = void 0;
      var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = n(1),
        a = n(4),
        c = n(8),
        u = r(c),
        s = n(27),
        l = r(s),
        f = n(2),
        d = n(3),
        p = r(d),
        h = n(25),
        v = void 0,
        g = void 0,
        _ = [],
        y = void 0;
      (0, i.subscribe)("getLaunchInfo", function(e, t) {
        var n = e.callbackId;
        (0, i.publish)("launchInfoGot", {
          data: {
            info: v,
            sceneHistory: _,
            appId: y
          },
          callbackId: n
        })
      });
      var b = void 0;
      (0, i.subscribe)("getAppEnterForegroundInfo", function(e, t) {
        var n = e.callbackId;
        (0, i.publish)("appEnterForegroundInfoGot", {
          data: {
            info: b,
            sceneHistory: _,
            appId: y
          },
          callbackId: n
        })
      }), __wxConfig.onReady(function() {
        v = __wxConfig.appLaunchInfo || {}, _.push(v.scene);
        try {
          y = v.referrerInfo.appId
        } catch (e) {}
        void 0 !== v && ("object" === o(v.shareInfo) && null !== v.shareInfo && (g = v.shareInfo, g.shareKey && g.shareName && (v.shareTicket = l.default.set(g.shareKey, g.shareName), l.default.lastShareTicket = v.shareTicket), delete v.shareInfo), v.path && (v.path = (0, f.removeHtmlSuffixFromUrl)(v.path)))
      });
      var m = new u.default;
      (0, i.onMethod)("onAppEnterForeground", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        1044 !== e.scene || e.shareInfo || (e.shareInfo = g), 1080 === e.scene && (0, h.checkNeedFixMPCustomMenuScenePatch)() && (e.scene = 1035), 1044 == e.scene ? (p.default.lastShareInfo = {
          shareInfo: e.shareInfo,
          path: (0, f.removeHtmlSuffixFromUrl)(p.default.lastRoute),
          query: e.query
        }, console.warn("onShow 的时候是群分享，记录 Global.lastShareInfo", p.default.lastShareInfo)) : (console.warn("onShow 的时候不是群分享，清空 Global.lastShareInfo"), p.default.lastShareInfo = void 0), b = e;
        try {
          y = b.referrerInfo.appId
        } catch (e) {}
        _.push(b.scene), !(0, h.checkNeedAppEnterForegroundPatch)() || 1 !== e.reLaunch && !0 !== e.reLaunch ? m.emit("onAppEnterForeground", e) : m.once("onAppRoute", function() {
          m.emit("onAppEnterForeground", e)
        })
      }), (0, i.onMethod)("onAppEnterBackground", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        m.emit("onAppEnterBackground", e)
      }), (0, i.onMethod)("onAppUnhang", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        m.emit("onAppUnhang", e)
      }), (0, i.onMethod)("onAppRunningStatusChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        p.default.runningStatus = e.status, m.emit("onAppRunningStatusChange", e)
      }), (0, i.onMethod)("onPageReload", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        e.webviewId = t, m.emit("onPageReload", e)
      });
      var w = function(e) {
          var t = this;
          m.on("onAppEnterForeground", function(n) {
            if (n || (n = {}), n.query = p.default.query, n.path = (0, f.removeHtmlSuffixFromUrl)(p.default.lastRoute), "object" === o(n.shareInfo) && null !== n.shareInfo) {
              var r = n,
                c = r.shareInfo;
              c.shareKey && c.shareName && (n.shareTicket = l.default.set(c.shareKey, c.shareName), l.default.lastShareTicket = n.shareTicket), delete n.shareInfo
            }(0, i.publish)("onAppEnterForeground", n), t.appStatus = a.AppStatus.FORE_GROUND, "function" == typeof e && e(n)
          })
        },
        k = function(e) {
          var t = this;
          m.on("onAppEnterBackground", function(n) {
            n = n || {}, (0, i.publish)("onAppEnterBackground", n), "hide" === n.mode ? t.appStatus = a.AppStatus.LOCK : t.appStatus = a.AppStatus.BACK_GROUND, "close" === n.mode ? t.hanged = !1 : "hang" === n.mode && (t.hanged = !0), "function" == typeof e && e(n)
          })
        },
        S = function(e) {
          var t = this;
          m.on("onAppUnhang", function(n) {
            t.hanged = !1, "function" == typeof e && e(n)
          })
        },
        C = function(e) {
          m.on("onAppRunningStatusChange", function(t) {
            "function" == typeof e && e(t)
          })
        },
        P = function(e) {
          m.on("onPageReload", function(t) {
            t.path && (t.path = (0, f.removeHtmlSuffixFromUrl)(t.path)), "function" == typeof e && e(t)
          })
        },
        x = function(e) {
          m.emit("onBeforeUnloadPage_" + e, e), m.removeAllListeners("onBeforeShareAppMessage_" + e)
        },
        M = function(e, t) {
          m.once("onBeforeUnloadPage_" + e, function(e) {
            "function" == typeof t && t(e)
          })
        },
        E = function(e) {
          m.emit("onBeforeShareAppMessage_" + e, e)
        },
        O = function(e, t) {
          m.on("onBeforeShareAppMessage_" + e, function(e) {
            "function" == typeof t && t(e)
          })
        };
      t.emitter = m, t.onAppEnterForeground = w, t.onAppEnterBackground = k, t.onAppUnhang = S, t.onAppRunningStatusChange = C, t.onPageReload = P, t.triggerBeforeUnloadPage = x, t.onBeforeUnloadPage = M, t.triggerBeforeShareAppMessage = E, t.onBeforeShareAppMessage = O
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(2),
        o = {},
        i = {
          lastShareTicket: null,
          get: function(e) {
            return wxConsole.log("ShareInfoStorage.get()", e), o[e]
          },
          set: function(e, t) {
            var n = (0, r.guid)();
            return o[n] = {
              shareKey: e,
              shareName: t
            }, n
          }
        };
      t.default = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onAppRouteDone = void 0;
      var r = n(1),
        o = n(3),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = [];
      (0, r.onMethod)("onAppRouteDone", function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        i.default.navigatorLock = !1, e.path = e.path.substring(0, e.path.length - 5), e.webviewId = void 0 !== e.webviewId ? e.webviewId : t, i.default.lastRoute = e.path, a.forEach(function(t) {
          t(e)
        }), (0, r.publish)("onAppRouteDone", {}, [t])
      });
      t.onAppRouteDone = function(e, t) {
        a.push(e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t._triggerBeforeShareAppMessage = t._triggerBeforeUnloadPage = t.onPageReload = t.onAppEnterBackground = t.onAppEnterForeground = t.onAppUnhang = void 0;
      var r = n(26),
        o = function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return t.default = e, t
        }(r),
        i = o.onAppEnterBackground,
        a = o.onAppEnterForeground,
        c = o.onAppUnhang,
        u = o.onPageReload,
        s = o.triggerBeforeUnloadPage,
        l = o.triggerBeforeShareAppMessage;
      t.onAppUnhang = c, t.onAppEnterForeground = a, t.onAppEnterBackground = i, t.onPageReload = u, t._triggerBeforeUnloadPage = s, t._triggerBeforeShareAppMessage = l
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onPageNotFound = void 0;
      var r = n(1),
        o = n(3),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = [];
      (0, r.onMethod)("onPageNotFound", function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        i.default.lastRoute = "", a.forEach(function(n) {
          n(e, t)
        })
      });
      t.onPageNotFound = function(e) {
        a.push(e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setNavigationBarRightButton = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("setNavigationBarRightButton", e, {
            hide: !0
          }) && (0, r.invokeMethod)("setNavigationBarRightButton", e, {})
        };
      t.setNavigationBarRightButton = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onTapNavigationBarRightButton = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.onMethod)("onTapNavigationBarRightButton", Reporter.surroundThirdByTryCatch(e, "at onTapNavigationBarRightButton callback function"))
        };
      t.onTapNavigationBarRightButton = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setTopBarText = void 0;
      var r = n(1),
        o = 0,
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return e.text ? Date.now() - o < 5e3 ? void(0, r.beforeInvokeFail)("setTopBarText", e, "invoke too frequently") : void(0, r.invokeMethod)("setTopBarText", e, {
            beforeSuccess: function() {
              o = Date.now()
            }
          }) : void(0, r.beforeInvokeFail)("setTopBarText", e, "invalid text")
        };
      t.setTopBarText = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(35);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(36);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onWebviewEvent = void 0;
      var r = n(1),
        o = n(2),
        i = n(3),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i);
      "devtools" === (0, o.getPlatform)() && (0, r.subscribe)("SPECIAL_PAGE_EVENT", function(e) {
        var t = e.data,
          n = e.eventName,
          i = e.ext,
          c = e.nodeId,
          u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (t && "input" == t.type && "function" == typeof a.default.webviewEventCallback) {
          var s = a.default.webviewEventCallback({
              data: t,
              eventName: n,
              webviewId: u,
              nodeId: c
            }),
            l = t.detail.value;
          if (i && i.setKeyboardValue)
            if (void 0 === s);
            else if ("Object" === (0, o.getDataType)(s)) {
            var f = {};
            l != s.value && (f.value = s.value + ""), isNaN(parseInt(s.cursor)) || (f.cursor = parseInt(s.cursor)), (0, r.publish)("setKeyboardValue", f, [u])
          } else l != s && (0, r.publish)("setKeyboardValue", {
            value: s + "",
            cursor: -1
          }, [u])
        }
      });
      t.onWebviewEvent = function(e, t) {
        a.default.webviewEventCallback = e, (0, r.subscribe)("PAGE_EVENT", function(t) {
          var n = t.data,
            r = t.eventName,
            o = t.nodeId,
            i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          e({
            data: n,
            eventName: r,
            webviewId: i,
            nodeId: o
          })
        })
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onNativeEvent = void 0;
      var r = n(1);
      t.onNativeEvent = function(e) {
        ["onCanvasTouchStart", "onCanvasTouchMove", "onCanvasTouchEnd"].forEach(function(t) {
          (0, r.onMethod)(t, function(n, r) {
            e({
              data: n,
              eventName: t,
              webviewId: r
            })
          })
        })
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setTabBarItem = t.setTabBarStyle = t.hideTabBar = t.showTabBar = t.hideTabBarRedDot = t.showTabBarRedDot = t.removeTabBarBadge = t.setTabBarBadge = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("setTabBarBadge", e, {
              index: 0,
              text: ""
            })) {
            var t = Object.assign({}, e);
            t.badgeValue = t.text, t.type = "text", (0, r.invokeMethod)("setTabBarBadge", t)
          }
        },
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("setTabBarBadge", e, {
              index: 0
            })) {
            var t = Object.assign({}, e);
            t.type = "none", (0, r.invokeMethod)("setTabBarBadge", t, {
              beforeAll: function(e) {
                e.errMsg = e.errMsg.replace("setTabBarBadge", "removeTabBarBadge")
              }
            })
          }
        },
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("setTabBarBadge", e, {
              index: 0
            })) {
            var t = Object.assign({}, e);
            t.type = "redDot", (0, r.invokeMethod)("setTabBarBadge", t, {
              beforeAll: function(e) {
                e.errMsg = e.errMsg.replace("setTabBarBadge", "showTabBarRedDot")
              }
            })
          }
        },
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("setTabBarBadge", e, {
              index: 0
            })) {
            var t = Object.assign({}, e);
            t.type = "none", (0, r.invokeMethod)("setTabBarBadge", t, {
              beforeAll: function(e) {
                e.errMsg = e.errMsg.replace("setTabBarBadge", "hideTabBarRedDot")
              }
            })
          }
        },
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          void 0 === e.animation && (e.animation = !1), (0, r.beforeInvoke)("showTabBar", e, {
            animation: !0
          }) && (0, r.invokeMethod)("showTabBar", e)
        },
        s = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          void 0 === e.animation && (e.animation = !1), (0, r.beforeInvoke)("hideTabBar", e, {
            animation: !0
          }) && (0, r.invokeMethod)("hideTabBar", e)
        },
        l = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("setTabBarStyle", e)
        },
        f = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("setTabBarItem", e, {
            index: 0
          }) && (0, r.invokeMethod)("setTabBarItem", e)
        };
      t.setTabBarBadge = o, t.removeTabBarBadge = i, t.showTabBarRedDot = a, t.hideTabBarRedDot = c, t.showTabBar = u, t.hideTabBar = s, t.setTabBarStyle = l, t.setTabBarItem = f
    }, function(e, t, n) {
      function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.facialRecognition = t.redPacket = t.soter = t.card = t.share = t.payment = t.operateWXData = t.reportGroupShare = t.getGroupId = t.sendGroupMessage = void 0;
      var o = n(39);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(40);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
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
      var c = n(42);
      Object.keys(c).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return c[e]
          }
        })
      });
      var u = n(43);
      Object.keys(u).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return u[e]
          }
        })
      });
      var s = n(46);
      Object.keys(s).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return s[e]
          }
        })
      });
      var l = n(47);
      Object.keys(l).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return l[e]
          }
        })
      });
      var f = n(48);
      Object.keys(f).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return f[e]
          }
        })
      });
      var d = n(49);
      Object.keys(d).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return d[e]
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
      var h = n(51);
      Object.defineProperty(t, "getGroupId", {
        enumerable: !0,
        get: function() {
          return h.getGroupId
        }
      });
      var v = n(52);
      Object.defineProperty(t, "reportGroupShare", {
        enumerable: !0,
        get: function() {
          return v.reportGroupShare
        }
      }), Object.defineProperty(t, "operateWXData", {
        enumerable: !0,
        get: function() {
          return f.operateWXData
        }
      });
      var g = n(53),
        _ = r(g),
        y = n(54),
        b = r(y),
        m = n(59),
        w = r(m),
        k = n(60),
        S = r(k),
        C = n(64),
        P = r(C),
        x = n(68),
        M = r(x);
      t.payment = _, t.share = b, t.card = w, t.soter = S, t.redPacket = P, t.facialRecognition = M
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkSession = t.login = void 0;
      var r = n(1),
        o = void 0,
        i = function(e) {
          (0, r.invokeMethod)("login", e)
        },
        a = function(e) {
          o && clearTimeout(o), (0, r.invokeMethod)("refreshSession", e, {
            beforeSuccess: function(e) {
              o = setTimeout(function() {
                (0, r.invokeMethod)("refreshSession")
              }, 1e3 * e.expireIn), delete e.err_code, delete e.expireIn
            },
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("refreshSession", "checkSession")
            }
          })
        };
      t.login = i, t.checkSession = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.authorize = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("authorize", e, {
            scope: ""
          }) && (0, r.invokeMethod)("authorize", (0, o.assign)(e, {
            scope: [e.scope]
          }), {
            beforeAll: function(e) {
              delete e.body, void 0 !== e.err_code && (e.errCode = e.err_code, delete e.err_code)
            }
          })
        };
      t.authorize = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getUserInfo = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("operateWXData", (0, o.assign)({}, e, {
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
              "android" === (0, o.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data);
              try {
                e.userInfo = JSON.parse(e.data.data), e.signature = e.data.signature, e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
              } catch (e) {}
            }
          })
        };
      t.getUserInfo = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.chooseAddress = void 0;
      var r = n(1),
        o = n(2),
        i = function(e) {
          (0, r.invokeMethod)("openAddress", e, {
            beforeSuccess: function(e) {
              (0, o.renameProperty)(e, "addressPostalCode", "postalCode"), (0, o.renameProperty)(e, "proviceFirstStageName", "provinceName"), (0, o.renameProperty)(e, "addressCitySecondStageName", "cityName"), (0, o.renameProperty)(e, "addressCountiesThirdStageName", "countyName"), (0, o.renameProperty)(e, "addressDetailInfo", "detailInfo")
            },
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("openAddress", "chooseAddress"), delete e.err_msg
            }
          })
        };
      t.chooseAddress = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(44);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(45);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getSetting = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getSetting", e, {
            beforeSuccess: function(e) {
              e.authSetting;
              e.authSetting = e.authSetting.reduce(function(e, t) {
                return e[t.scope] = 1 === t.state, e
              }, {})
            }
          })
        };
      t.getSetting = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openSetting = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("openSetting", e, {
            beforeSuccess: function(e) {
              e.authSetting;
              e.authSetting = e.authSetting.reduce(function(e, t) {
                return e[t.scope] = 1 === t.state, e
              }, {})
            }
          })
        };
      t.openSetting = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getWeRunData = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("openWeRunSetting", {
            success: function() {
              (0, r.invokeMethod)("operateWXData", (0, o.assign)({
                data: {
                  api_name: "webapi_getwerunstep_history"
                }
              }, e), {
                beforeAll: function(e) {
                  e.errMsg = e.errMsg.replace("operateWXData", "getWeRunData")
                },
                beforeSuccess: function(e) {
                  "android" === (0, o.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), delete e.data
                }
              })
            },
            fail: function(t) {
              t.errMsg = t.errMsg.replace("openWeRunSetting", "getWeRunData"), "function" == typeof e.fail && Reporter.surroundThirdByTryCatch(e.fail, "at api getWeRunData fail callback function")(t), "function" == typeof e.complete && Reporter.surroundThirdByTryCatch(e.complete, "at api getWeRunData fail callback function")(t)
            }
          })
        };
      t.getWeRunData = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.chooseInvoiceTitle = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("chooseInvoiceTitle", e, {
            beforeSuccess: function(e) {
              var t = e.invoiceTitleInfo || e.choose_invoice_title_info;
              if (t) try {
                var n = JSON.parse(t);
                delete e.invoiceTitleInfo, delete e.choose_invoice_title_info, e = Object.assign(e, n)
              } catch (e) {}
            }
          })
        };
      t.chooseInvoiceTitle = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.constructOperateWXData = t.operateWXData = void 0;
      var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = n(1),
        i = n(2),
        a = function() {
          var e = !(arguments.length > 0 && void 0 !== arguments[0]) || arguments[0],
            t = arguments[1];
          return function() {
            var n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            if ((0, o.beforeInvoke)("operateWXData", n, {
                apiName: ""
              })) {
              var a = {
                api_name: n.apiName,
                data: n.reqData || {},
                operate_directly: e
              };
              (0, o.invokeMethod)("operateWXData", Object.assign({}, {
                data: a
              }, n), {
                beforeAll: function(e) {
                  void 0 !== (void 0 === t ? "undefined" : r(t)) && (e.errMsg = e.errMsg.replace("operateWXData", t))
                },
                beforeSuccess: function(e) {
                  "android" === (0, i.getPlatform)() && (e.data = JSON.parse(e.data)), void 0 !== e.data.data && (e.rawData = e.data.data), e.data.encryptedData && (e.encryptedData = e.data.encryptedData, e.iv = e.data.iv), e.respData = e.data, delete e.data
                }
              })
            }
          }
        },
        c = a(!1);
      t.operateWXData = c, t.constructOperateWXData = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getOpenDeviceId = void 0;
      var r = n(1),
        o = (0, r.operateWXDataFactory)("getOpenDeviceId", "webapi_getdeviceinfo");
      t.getOpenDeviceId = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.sendGroupMessage = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvokeFail)("sendGroupMessage", e, "sendGroupMessage 接口已废弃")
        };
      t.sendGroupMessage = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getGroupId = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.invokeMethod)("getGroupId", e)
        };
      t.getGroupId = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.reportGroupShare = void 0;
      var r = n(48),
        o = function(e) {
          (0, r.operateWXData)({
            apiName: "webapi_reportgroupshare",
            reqData: e
          })
        };
      t.reportGroupShare = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openWCPayCardList = t.openOfflinePayView = t.requestVirtualPayment = t.requestPaymentToBank = t.bindPaymentCard = t.verifyPaymentPassword = t.requestPayment = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.beforeInvoke)("requestPayment", e, {
            timeStamp: "",
            nonceStr: "",
            package: "",
            signType: "",
            paySign: ""
          }) && (0, r.invokeMethod)("requestPayment", e)
        },
        i = function(e) {
          (0, r.invokeMethod)("verifyPaymentPassword", e)
        },
        a = function(e) {
          (0, r.invokeMethod)("bindPaymentCard", e)
        },
        c = function(e) {
          (0, r.invokeMethod)("requestPaymentToBank", e)
        },
        u = function(e) {
          (0, r.invokeMethod)("requestVirtualPayment", e)
        },
        s = function(e) {
          (0, r.invokeMethod)("openOfflinePayView", e)
        },
        l = function(e) {
          (0, r.invokeMethod)("openWCPayCardList", e)
        };
      t.requestPayment = o, t.verifyPaymentPassword = i, t.bindPaymentCard = a, t.requestPaymentToBank = c, t.requestVirtualPayment = u, t.openOfflinePayView = s, t.openWCPayCardList = l
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.ShareInfoStorage = void 0;
      var r = n(55);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(56);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(57);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
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
      var c = n(27),
        u = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(c);
      t.ShareInfoStorage = u.default
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getShareInfo = void 0;
      var r = n(1),
        o = n(27),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = n(2),
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = i.default.get(e.shareTicket);
          if (t)(0, r.invokeMethod)("operateWXData", (0, a.assign)({
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
      t.getShareInfo = c
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.showShareMenu = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          !0 === e.withShareTicket ? (0, r.invokeMethod)("showShareMenuWithShareTicket", e, {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("showShareMenuWithShareTicket", "showShareMenu")
            },
            beforeFail: function(e) {
              e.errMsg += ", with arg withShareTicket: true"
            }
          }) : (0, r.invokeMethod)("showShareMenu", e, {})
        };
      t.showShareMenu = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.hideShareMenu = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("hideShareMenu", e, {})
        };
      t.hideShareMenu = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.updateShareMenu = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          Promise.all([new Promise(function(t, n) {
            if ("boolean" == typeof e.dynamic || "boolean" == typeof e.widget) {
              var o = void 0;
              o = "boolean" == typeof e.widget ? e.widget : e.dynamic, (0, r.invokeMethod)("updateShareMenuDynamic", {
                isDynamic: o,
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
            "boolean" == typeof e.withShareTicket ? (0, r.invokeMethod)("updateShareMenuShareTicket", {
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
      t.updateShareMenu = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openCard = t.addCard = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.beforeInvoke)("addCard", e, {
            cardList: []
          }) && (0, r.invokeMethod)("addCard", e)
        },
        i = function(e) {
          (0, r.beforeInvoke)("openCard", e, {
            cardList: []
          }) && (0, r.invokeMethod)("openCard", e)
        };
      t.addCard = o, t.openCard = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(61);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(62);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(63);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkIsSupportSoterAuthentication = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("checkIsSupportSoterAuthentication", e, {})
        };
      t.checkIsSupportSoterAuthentication = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startSoterAuthentication = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("startSoterAuthentication", e, {
              challenge: ""
            })) {
            var t = e.success;
            (0, r.invokeMethod)("startSoterAuthentication", Object.assign({}, e, {
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
      t.startSoterAuthentication = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkIsSoterEnrolledInDevice = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("checkIsSoterEnrolledInDevice", e, {
            checkAuthMode: ""
          }) && (0, r.invokeMethod)("checkIsSoterEnrolledInDevice", e, {})
        };
      t.checkIsSoterEnrolledInDevice = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(65);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(66);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(67);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openGoldenRedPacketDetail = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("openGoldenRedPacketDetail", e, {})
        };
      t.openGoldenRedPacketDetail = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.sendGoldenRedPacket = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("sendGoldenRedPacket", e, {})
        };
      t.sendGoldenRedPacket = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.sendBizRedPacket = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("sendBizRedPacket", e, {})
        };
      t.sendBizRedPacket = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(69);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(70);
      Object.defineProperty(t, "startFacialRecognitionVerify", {
        enumerable: !0,
        get: function() {
          return o.startFacialRecognitionVerify
        }
      });
      var i = n(71);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.checkIsSupportFacialRecognition = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("checkIsSupportFacialRecognition", e, {})
        };
      t.checkIsSupportFacialRecognition = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startFacialRecognitionVerify = t.packageRequestVerifyPreInfo = void 0;
      var r = n(1),
        o = n(2),
        i = function(e) {
          return JSON.stringify({
            name: e.name,
            id_card_number: e.idCardNumber,
            mobile: e.mobile
          })
        },
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = i(e);
          (0, r.invokeMethod)("startFacialRecognitionVerify", (0, o.assign)(e, {
            requestVerifyPreInfo: t
          }), {})
        };
      t.packageRequestVerifyPreInfo = i, t.startFacialRecognitionVerify = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startFacialRecognitionVerifyAndUploadVideo = void 0;
      var r = n(1),
        o = n(2),
        i = n(70),
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = (0, i.packageRequestVerifyPreInfo)(e);
          (0, r.invokeMethod)("startFacialRecognitionVerifyAndUploadVideo", (0, o.assign)(e, {
            requestVerifyPreInfo: t
          }), {})
        };
      t.startFacialRecognitionVerifyAndUploadVideo = a
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o(e) {
        p[e] || (p[e] = !0, (0, s.onBeforeUnloadPage)(e, function(e) {
          delete p[e], Object.keys(l).forEach(function(t) {
            new RegExp("^" + e).test(t) && (delete f[e + "_" + l[t]], delete l[t])
          }), wxConsole.log("onBeforeUnloadPage clear map", e, l, f)
        }))
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.mapInfo = t.createMapContext = void 0;
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        a = n(1),
        c = n(2),
        u = n(8),
        s = n(26),
        l = (n(38), {}),
        f = {},
        d = new u.EventEmitter2,
        p = {},
        h = 0;
      (0, a.subscribe)("mapInsert", function(e, t) {
        var n = e.domId,
          r = e.mapId,
          i = e.bindregionchange,
          a = e.bindtap,
          c = e.showLocation,
          u = e.target,
          s = e.nodeId,
          p = t + "_" + n + "_";
        "number" == typeof s && -1 !== s && (p += s), l[p] = r, f[t + "_" + r] = {
          bindregionchange: i,
          bindtap: a,
          showLocation: c,
          target: u,
          nodeId: s
        }, d.emit("mapInsert"), o(t), wxConsole.log("mapInsert", p, r, l, f)
      }), (0, a.subscribe)("mapRemove", function(e, t) {
        var n = e.domId,
          r = e.mapId,
          o = e.nodeId,
          i = t + "_" + n + "_";
        "number" == typeof o && -1 !== o && (i += o), delete l[i], delete f[t + "_" + r], wxConsole.log("mapRemove", i, r, l, f)
      });
      var v = function() {
          function e(t, n, o) {
            var i = this;
            if (r(this, e), "string" != typeof t) throw new c.ThirdScriptError("Parameter 1 should be a string");
            this.domId = t, this.webviewId = n, this.nodeId = o, this._lastMarkerPos = {}, this._lastMarkerDeg = {}, this._translating = {}, this._delayTranslate = {}, this._isGetMarkerPos = {}, WeixinJSBridge.subscribe("doMapActionCallback", function(e, t) {
              var n = e.callbackId;
              n && "function" == typeof i[n] && (i[n](e), delete i[n])
            })
          }
          return i(e, [{
            key: "_invoke",
            value: function(e, t) {
              var n = (0, c.getPlatform)(),
                r = ["includeMapPoints", "getMapMarker"],
                o = f[this.webviewId + "_" + t.mapId];
              if ("moveToMapLocation" === e && o && !o.showLocation) return void console.warn("only show-location set to true can invoke moveToLocation");
              if ("ios" !== n && "android" !== n || -1 !== r.indexOf(e)) {
                t.method = e;
                var i = "callback" + this.webviewId + "_" + t.mapId + "_" + h++;
                this[i] = function(e) {
                  delete e.callbackId, delete e.mapId, delete e.method, e.errMsg && (e.errMsg.indexOf(":ok") > -1 ? "function" == typeof t.success && t.success(e) : e.errMsg.indexOf(":fail") > -1 && "function" == typeof t.fail && t.fail(e)), "function" == typeof t.complete && t.complete(e)
                }, t.callbackId = i, (0, a.publish)("doMapAction" + t.mapId, t, [this.webviewId])
              } else wxConsole.log("MapContext invoke", e, t), (0, a.invokeMethod)(e, t)
            }
          }, {
            key: "_invokeMethod",
            value: function(e, t) {
              var n = this,
                r = this.webviewId + "_" + this.domId + "_" + this.nodeId;
              "number" == typeof l[r] || l[r] ? (t.mapId = l[r], this._invoke(e, t)) : d.on("mapInsert", function() {
                t.mapId = l[r], n._invoke(e, t)
              })
            }
          }, {
            key: "getCenterLocation",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this._invokeMethod("getMapCenterLocation", e)
            }
          }, {
            key: "getScale",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this._invokeMethod("getMapScale", e)
            }
          }, {
            key: "getRegion",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this._invokeMethod("getMapRegion", e)
            }
          }, {
            key: "moveToLocation",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              this._invokeMethod("moveToMapLocation", e)
            }
          }, {
            key: "translateMarker",
            value: function() {
              var e = this,
                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
                n = t.markerId;
              if (void 0 === n) return void console.warn("MapContext.translateMarker: require markerId");
              if (!t.destination) return void console.warn("MapContext.translateMarker: require destination");
              if (this._translating[n]) return void(this._delayTranslate[n] ? this._delayTranslate[n].push(t) : this._delayTranslate[n] = [t]);
              var r = {
                  markerId: n,
                  keyFrames: [{
                    longitude: t.destination.longitude,
                    latitude: t.destination.latitude,
                    duration: t.duration || 1e3
                  }],
                  success: function(n) {
                    "function" == typeof t.success && t.success.call(e, n), "function" == typeof t.animationEnd && t.animationEnd.call(e)
                  },
                  fail: function(r) {
                    e._delayTranslate[n] = [], "function" == typeof t.fail && t.fail.call(e, r)
                  },
                  complete: function() {
                    e._translating[n] = !1;
                    var t = e._delayTranslate[n];
                    t && t.length && e.translateMarker(t.shift())
                  }
                },
                o = this._lastMarkerPos[n],
                i = t.destination;
              if (t.autoRotate || "number" != typeof t.rotate) {
                var a = void 0,
                  c = void 0;
                if (o) {
                  var u = i.latitude - o.latitude,
                    s = i.longitude - o.longitude,
                    l = u / s || 0;
                  a = Math.abs((s < 0 ? 180 : 0) - Math.abs(180 * Math.atan(l) / Math.PI)) * (u > 0 ? -1 : 1)
                } else if (!this._isGetMarkerPos[n]) return this._translating[n] = !0, this._invokeMethod("getMapMarker", {
                  markerId: n,
                  success: function(t) {
                    e._lastMarkerPos[n] = t.pos
                  },
                  complete: function() {
                    e._isGetMarkerPos[n] = !0, e._translating[n] = !1;
                    var t = e._delayTranslate[n];
                    t && t.length && e.translateMarker(t.shift())
                  }
                }), void(this._delayTranslate[n] ? this._delayTranslate[n].push(t) : this._delayTranslate[n] = [t]);
                "number" == typeof this._lastMarkerDeg[n] && (c = a - this._lastMarkerDeg[n], Math.abs(c) > 180 && (c = c > 0 ? c - 360 : c + 360), Math.abs(c) > 3 && t.autoRotate && r.keyFrames.unshift({
                  rotate: c,
                  duration: Math.abs(c) < 10 ? 100 : 500
                })), (Math.abs(c) > 3 && t.autoRotate || void 0 === this._lastMarkerDeg[n]) && (this._lastMarkerDeg[n] = a)
              } else {
                var f = t.rotate - (this._lastMarkerDeg[n] || 0);
                Math.abs(f) > 3 && (Math.abs(f) > 180 && (f = f > 0 ? f - 360 : f + 360), r.keyFrames.unshift({
                  rotate: f,
                  duration: Math.abs(f) < 10 ? 100 : 500
                }), this._lastMarkerDeg[n] = t.rotate)
              }
              o && o.latitude === i.latitude && o.longitude === i.longitude && (r.keyFrames.pop(), t.autoRotate && (r.keyFrames = [])), r.keyFrames.length > 0 ? (this._translating[n] = !0, this._invokeMethod("translateMapMarker", r)) : setTimeout(function() {
                r.success(), r.complete()
              }), this._lastMarkerPos[n] = t.destination
            }
          }, {
            key: "includePoints",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (e.points && e.points instanceof Array) {
                e.points.forEach(function(e) {
                  e.latitude = Number(e.latitude), e.longitude = Number(e.longitude)
                });
                var t = e.padding;
                e.padding = [0, 0, 0, 0], t && (e.padding[0] = Number(t[0]) || 0, e.padding[1] = Number(t[1]) || 0, e.padding[2] = Number(t[2]) || 0, e.padding[3] = Number(t[3]) || 0), this._invokeMethod("includeMapPoints", e)
              }
            }
          }]), e
        }(),
        g = function(e, t) {
          var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
          return new v(e, t, n)
        };
      t.createMapContext = g, t.mapInfo = f
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createInnerAudioContext = void 0;
      var r = n(74),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = function() {
          return new o.default
        };
      t.createInnerAudioContext = i
    }, function(e, t, n) {
      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function i(e, t, n) {
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
      var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        c = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        u = n(1),
        s = n(8),
        l = r(s),
        f = n(3),
        d = r(f),
        p = n(75),
        h = r(p),
        v = new WeakMap,
        g = new WeakMap,
        _ = new WeakMap,
        y = new WeakMap,
        b = new WeakMap,
        m = new WeakMap,
        w = {};
      h.default.EventHandler && (h.default.EventHandler.onbindingobjectdestruct = function(e) {
        wxConsole.log("Audio 已被 GC 回收，准备调用 destroy 接口");
        var t = w[e];
        (0, u.invokeMethod)("getAudioState", {
          audioId: t,
          success: function(e) {
            wxConsole.log("Audio.paused === true，调用 destroy"), !0 === e.paused && (0, u.invokeMethod)("destroyAudioInstance", {
              audioId: t,
              complete: function(e) {
                wxConsole.log("destroy 回调", e)
              }
            })
          }
        })
      });
      var k = new l.default;
      (0, u.onMethod)("onAudioStateChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        e.state = e.state.toLowerCase();
        var t = e.state,
          n = e.audioId;
        delete e.audioId, delete e.state, k.emit(n + "_onAudioStateChange_" + t, e)
      });
      var S = function() {
          return function(e, t) {
            var n = this;
            wxConsole.log("setAudioState", e, t), g.set(this, Object.assign(g.get(this), i({}, e, t))), "src" === e && g.set(this, Object.assign(g.get(this), {
              paused: !0
            })), y.get(this) && (setTimeout(function() {
              wxConsole.log("setAudioState，合并调用", Object.assign({}, g.get(n), b.get(n)), v.get(n)), (0, u.invokeMethod)("setAudioState", Object.assign({}, g.get(n), b.get(n), {
                audioId: v.get(n),
                success: function() {
                  g.set(n, Object.assign(g.get(n), i({}, e, t)))
                },
                fail: function() {
                  C.call(n)
                },
                complete: function(e) {
                  wxConsole.log("setAudioState.complete", e)
                }
              })), y.set(n, !0)
            }, 0), y.set(this, !1)), b.set(this, Object.assign(b.get(this), i({}, e, t))), wxConsole.log("setAudioState，延后调用", g.get(this))
          }
        }(),
        C = function(e, t) {
          var n = this,
            r = g.get(this)[e];
          return (0, u.invokeMethod)("getAudioState", {
            audioId: v.get(this),
            success: function(o) {
              delete o.errMsg, g.set(n, Object.assign(g.get(n), o)), r = o[e], "function" == typeof t && t(r)
            }
          }), r
        },
        P = function(e) {
          wxConsole.log("operateAudio", e);
          var t = v.get(this);
          (0, u.invokeMethod)("operateAudio", Object.assign({
            audioId: t,
            fail: function(e) {
              var t = e.errMsg;
              E("error", {
                errMsg: t,
                errCode: -1
              })
            }
          }, e), {
            beforeAll: function(t) {
              wxConsole.log("operateAudio[" + e.operationType + "] callback", t)
            }
          })
        },
        x = function(e, t) {
          var n = this;
          wxConsole.log("start onAudioStateChange", e);
          var r = v.get(this) + "_onAudioStateChange_" + e,
            o = function(r) {
              wxConsole.log("onAudioStateChange", e, r);
              var o = "play" !== e;
              g.set(n, Object.assign(g.get(n), {
                paused: o
              })), Reporter.surroundThirdByTryCatch(t, "at audioContext.on" + e + " callback function")(r)
            };
          m.set(t, o), k.on(r, o)
        },
        M = function(e, t) {
          wxConsole.log("offAudioStateChange", e);
          var n = v.get(this) + "_onAudioStateChange_" + e;
          if ("function" == typeof t) {
            var r = m.get(t);
            k.off(n, r)
          } else k.removeAllListeners(n)
        },
        E = function(e, t) {
          k.emit(v.get(this) + "_onAudioStateChange_" + e, t)
        },
        O = function() {
          function e() {
            var t = this;
            o(this, e), wxConsole.log("constructor");
            var n = void 0;
            if (g.set(this, {}), b.set(this, {}), _.set(this, void 0), y.set(this, !0), (0, u.invokeMethod)("createAudioInstance", {
                success: function(e) {
                  if (v.set(t, e.audioId), g.set(t, {
                      src: "",
                      startTime: 0,
                      paused: !0,
                      currentTime: 0,
                      duration: 0,
                      obeyMuteSwitch: !0,
                      volume: 1,
                      autoplay: !1,
                      loop: !1,
                      buffered: 0
                    }), h.default.BindingObject) {
                    var n = new h.default.BindingObject;
                    t.__bindingObject = n, w[n.__id] = e.audioId
                  } else wxConsole.log("typeof NativeGlobal.BindingObject = " + a(h.default.BindingObject))
                },
                fail: function(e) {
                  n = e.errMsg
                },
                complete: function(e) {
                  wxConsole.log("createAudioInstance complete", e)
                }
              }), n) throw new Error(n);
            ["Play", "Pause", "Stop", "Canplay", "Error", "Ended", "Waiting", "Seeking", "Seeked"].forEach(function(e) {
              t["on" + e] = function(n) {
                x.call(t, e.toLowerCase(), n)
              }, t["off" + e] = function(n) {
                M.call(t, e.toLowerCase(), n)
              }
            })
          }
          return c(e, [{
            key: "play",
            value: function() {
              var e = this;
              setTimeout(function() {
                P.call(e, {
                  operationType: "play"
                })
              }, 0)
            }
          }, {
            key: "pause",
            value: function() {
              var e = this;
              setTimeout(function() {
                P.call(e, {
                  operationType: "pause"
                })
              }, 0)
            }
          }, {
            key: "stop",
            value: function() {
              var e = this;
              setTimeout(function() {
                P.call(e, {
                  operationType: "stop"
                })
              }, 0)
            }
          }, {
            key: "seek",
            value: function(e) {
              var t = this;
              if ("number" != typeof e || e < 0) return void E("error", {
                errMsg: "Failed to seek, the currentTime " + e + " is invalid."
              });
              setTimeout(function() {
                P.call(t, {
                  operationType: "seek",
                  currentTime: 1e3 * e
                })
              }, 0)
            }
          }, {
            key: "destroy",
            value: function() {
              (0, u.invokeMethod)("destroyAudioInstance", {
                audioId: v.get(this)
              })
            }
          }, {
            key: "onTimeUpdate",
            value: function(e) {
              var t = this,
                n = v.get(this) + "_onAudioStateChange_timeupdate";
              void 0 === _.get(this) && _.set(this, setInterval(function() {
                if ("active" === d.default.runningStatus && !0 !== g.get(t).paused && 1 !== g.get(t).paused) {
                  var e = g.get(t).currentTime;
                  C.call(t, "currentTime", function(t) {
                    t !== e && k.emit(n)
                  })
                }
              }, 250)), k.removeAllListeners(n), k.on(n, function() {
                "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at audioContext.onTimeUpdate callback function")()
              })
            }
          }, {
            key: "offTimeUpdate",
            value: function(e) {
              M.call(this, "timeupdate", e)
            }
          }, {
            key: "src",
            get: function() {
              return C.call(this, "src")
            },
            set: function(e) {
              if ("string" != typeof e || 0 === e.length) return void E.call(this, "error", {
                errMsg: "Failed to set src, the src " + e + " is invalid."
              });
              S.call(this, "src", e)
            }
          }, {
            key: "startTime",
            get: function() {
              return C.call(this, "startTime") / 1e3
            },
            set: function(e) {
              if ("number" != typeof e) return void E("error", {
                errMsg: "Failed to set startTime, the startTime " + e + " is invalid."
              });
              S.call(this, "startTime", 1e3 * e)
            }
          }, {
            key: "autoplay",
            set: function(e) {
              "boolean" == typeof e && S.call(this, "autoplay", e)
            },
            get: function() {
              return C.call(this, "autoplay")
            }
          }, {
            key: "loop",
            set: function(e) {
              "boolean" == typeof e && S.call(this, "loop", e)
            },
            get: function() {
              return C.call(this, "loop")
            }
          }, {
            key: "obeyMuteSwitch",
            set: function(e) {
              "boolean" == typeof e && S.call(this, "obeyMuteSwitch", e)
            },
            get: function() {
              return C.call(this, "obeyMuteSwitch")
            }
          }, {
            key: "volume",
            set: function(e) {
              wxConsole.log("Audio.set volume", e), "number" != typeof e || e < 0 || e > 1 || S.call(this, "volume", e)
            },
            get: function() {
              return C.call(this, "volume")
            }
          }, {
            key: "paused",
            get: function() {
              return C.call(this, "paused")
            }
          }, {
            key: "duration",
            get: function() {
              return C.call(this, "duration") / 1e3
            }
          }, {
            key: "currentTime",
            get: function() {
              return C.call(this, "currentTime") / 1e3
            }
          }, {
            key: "buffered",
            get: function() {
              return C.call(this, "buffered")
            }
          }]), e
        }();
      t.default = O
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = void 0;
      "undefined" != typeof NativeGlobal ? (n = NativeGlobal, NativeGlobal = void 0) : n = {}, t.default = n
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o(e) {
        g[e] || (g[e] = !0, (0, f.onBeforeUnloadPage)(e, function(e) {
          delete g[e], Object.keys(p).forEach(function(t) {
            new RegExp("^" + e).test(t) && (delete h[e + "_" + p[t]], delete p[t])
          }), wxConsole.log("onBeforeUnloadPage, clear live-player", e, p, h)
        }))
      }

      function i(e, t) {
        var n = this,
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
          o = new _(e, t, r);
        return o._getAppStatus = function() {
          return n.appStatus
        }, o._getHanged = function() {
          return n.hanged
        }, o
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.playerInfo = t.createLivePlayerContext = void 0;
      var a = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        c = n(1),
        u = n(2),
        s = n(8),
        l = n(4),
        f = n(26),
        d = "ios" !== (0, u.getPlatform)() && "android" !== (0, u.getPlatform)(),
        p = {},
        h = {},
        v = new s.EventEmitter2,
        g = {};
      (0, c.subscribe)("livePlayerInsert", function(e, t) {
        var n = e.domId,
          r = e.playerId,
          i = e.data,
          a = e.nodeId,
          c = t + "_" + n + "_";
        "number" == typeof a && -1 !== a && (c += a), p[c] = r, h[t + "_" + r] = i || {}, v.emit("livePlayerInsert"), o(t), wxConsole.log("livePlayerInsert", c, r, p, h)
      }), (0, c.subscribe)("livePlayerRemoved", function(e, t) {
        var n = e.domId,
          r = e.playerId,
          o = t + "_" + n + "_";
        "number" == typeof nodeId && -1 !== nodeId && (o += nodeId), delete p[o], delete h[t + "_" + r], wxConsole.log("livePlayerRemoved", o, r, p, h)
      });
      var _ = function() {
        function e(t, n, o) {
          if (r(this, e), "string" != typeof t) throw new u.ThirdScriptError("Parameter 1 should be a string");
          this.domId = t, this.webviewId = n, this.nodeId = o
        }
        return a(e, [{
          key: "play",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = this._getAppStatus();
            t === l.AppStatus.BACK_GROUND || t === l.AppStatus.LOCK || this._invokeMethod("play", [], e)
          }
        }, {
          key: "stop",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._invokeMethod("stop", [], e)
          }
        }, {
          key: "mute",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._invokeMethod("mute", [], e)
          }
        }, {
          key: "requestFullScreen",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.direction;
            [0, 90, -90].indexOf(t) > -1 ? this._invokeMethod("requestFullScreen", [t], e) : this._invokeMethod("requestFullScreen", [], e)
          }
        }, {
          key: "exitFullScreen",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._invokeMethod("exitFullScreen", [], e)
          }
        }, {
          key: "_invokeMethod",
          value: function(e, t, n) {
            function r() {
              wxConsole.log("operateLivePlayer", e), (0, c.invokeMethod)("operateLivePlayer", {
                data: t,
                type: e,
                livePlayerId: p[i]
              }, n)
            }
            var o = this,
              i = this.webviewId + "_" + this.domId + "_" + this.nodeId;
            "number" == typeof p[i] ? (d && (n.type = e, n.playerId = p[i], (0, c.publish)("operateLivePlayer", n, [this.webviewId])), r.apply(this)) : v.once("livePlayerInsert", function() {
              o._invokeMethod(e, t, n)
            })
          }
        }]), e
      }();
      t.createLivePlayerContext = i, t.playerInfo = h
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o(e) {
        h[e] || (h[e] = !0, (0, l.onBeforeUnloadPage)(e, function(e) {
          delete h[e], Object.keys(f).forEach(function(t) {
            new RegExp("^" + e).test(t) && (delete d[e + "_" + f[t]], delete f[t])
          }), wxConsole.log("onBeforeUnloadPage, clear live-pusher", e, f, d)
        }))
      }

      function i(e) {
        return new v(e)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.pusherInfo = t.createLivePusherContext = void 0;
      var a = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        c = n(1),
        u = n(2),
        s = n(8),
        l = (n(9), n(26)),
        f = {},
        d = {},
        p = new s.EventEmitter2,
        h = {};
      (0, c.subscribe)("livePusherInserted", function(e, t) {
        var n = e.pusherId,
          r = e.data,
          i = t;
        f[i] = n, d[t + "_" + n] = r, p.emit("livePusherInserted"), o(t), wxConsole.log("livePusherInserted", i, n, f, d)
      }), (0, c.subscribe)("livePusherRemoved", function(e, t) {
        var n = e.pusherId;
        delete f[t], delete d[t + "_" + n], wxConsole.log("livePusherRemoved", t, n, f, d)
      });
      var v = function() {
        function e(t) {
          r(this, e), this.webviewId = t
        }
        return a(e, [{
          key: "_invoke",
          value: function(e, t) {
            var n = (0, u.getPlatform)();
            "ios" === n || "android" === n ? (wxConsole.log("operateLivePusher", t), (0, c.invokeMethod)("operateLivePusher", t)) : console.warn("开发者工具暂不支持调用 LivePusherContext." + e + " 方法")
          }
        }, {
          key: "_invokeMethod",
          value: function(e, t) {
            var n = this,
              r = this.webviewId;
            "number" == typeof f[r] ? (t.livePusherId = f[r], t.type = e, this._invoke(e, t)) : p.once("livePusherInserted", function() {
              n._invokeMethod(e, t)
            })
          }
        }, {
          key: "start",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._invokeMethod("start", e)
          }
        }, {
          key: "stop",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._invokeMethod("stop", e)
          }
        }, {
          key: "pause",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._invokeMethod("pause", e)
          }
        }, {
          key: "resume",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._invokeMethod("resume", e)
          }
        }, {
          key: "switchCamera",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            this._invokeMethod("switchCamera", e)
          }
        }]), e
      }();
      t.createLivePusherContext = i, t.pusherInfo = d
    }, function(e, t, n) {
      n(79), n(80), n(81), n(84), n(85), n(86), n(87), n(88)
    }, function(e, t, n) {
      var r = n(3),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = n(2),
        a = n(1);
      (0, a.onMethod)("onKeyboardValueChange", function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = e.value,
          r = e.cursor;
        if (e.data && "function" == typeof o.default.webviewEventCallback) {
          var c = JSON.parse(e.data);
          if (c.bindinput) {
            var u = void 0;
            try {
              u = o.default.webviewEventCallback({
                data: {
                  type: "input",
                  target: c.target,
                  currentTarget: c.target,
                  timeStamp: Date.now(),
                  touches: [],
                  detail: {
                    value: e.value,
                    cursor: e.cursor
                  }
                },
                eventName: c.bindinput,
                webviewId: t,
                nodeId: c.nodeId
              })
            } catch (e) {
              throw new i.AppServiceSdkKnownError("bind key input error")
            }
            if (c.setKeyboardValue)
              if (void 0 === u || null === u || !1 === u);
              else if ("Object" === (0, i.getDataType)(u)) {
              var s = {
                inputId: e.inputId
              };
              n != u.value && (s.value = u.value + ""), isNaN(parseInt(u.cursor)) || (s.cursor = parseInt(u.cursor), void 0 === s.value && (s.value = n), s.cursor > s.value.length && (s.cursor = -1)), (0, a.invokeMethod)("setKeyboardValue", s)
            } else n != u && (0, a.invokeMethod)("setKeyboardValue", {
              value: u + "",
              cursor: -1,
              inputId: e.inputId
            })
          }
        }(0, a.publish)("setKeyboardValue", {
          value: n,
          cursor: r,
          inputId: e.inputId
        }, [t])
      })
    }, function(e, t, n) {
      var r = n(1),
        o = n(3),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = n(72);
      (0, r.onMethod)("onMapMarkerClick", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (e.data && "function" == typeof i.default.webviewEventCallback) {
          var n = JSON.parse(e.data);
          n.bindmarkertap && i.default.webviewEventCallback({
            data: {
              type: "markertap",
              target: n.target,
              currentTarget: n.target,
              timeStamp: Date.now(),
              touches: [],
              detail: {
                markerId: n.markerId
              },
              markerId: n.markerId
            },
            eventName: n.bindmarkertap,
            webviewId: t,
            nodeId: n.nodeId
          })
        }
      }), (0, r.onMethod)("onMapCalloutClick", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (e.data && "function" == typeof i.default.webviewEventCallback) {
          var n = JSON.parse(e.data);
          n.bindcallouttap && i.default.webviewEventCallback({
            data: {
              type: "callouttap",
              target: n.target,
              currentTarget: n.target,
              timeStamp: Date.now(),
              touches: [],
              detail: {
                markerId: n.markerId
              },
              markerId: n.markerId
            },
            eventName: n.bindcallouttap,
            webviewId: t,
            nodeId: n.nodeId
          })
        }
      }), (0, r.onMethod)("onMapControlClick", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
        if (e.data && "function" == typeof i.default.webviewEventCallback) {
          var n = JSON.parse(e.data);
          n.bindcontroltap && i.default.webviewEventCallback({
            data: {
              type: "controltap",
              target: n.target,
              currentTarget: n.target,
              timeStamp: Date.now(),
              touches: [],
              detail: {
                controlId: n.controlId
              },
              controlId: n.controlId
            },
            eventName: n.bindcontroltap,
            webviewId: t,
            nodeId: n.nodeId
          })
        }
      }), (0, r.onMethod)("onMapRegionChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = a.mapInfo[t + "_" + e.mapId];
        n && n.bindregionchange && "function" == typeof i.default.webviewEventCallback && i.default.webviewEventCallback({
          data: {
            target: n.target,
            currentTarget: n.target,
            timeStamp: Date.now(),
            touches: [],
            detail: {
              type: e.type
            },
            type: e.type
          },
          eventName: n.bindregionchange,
          webviewId: t,
          nodeId: n.nodeId
        })
      }), (0, r.onMethod)("onMapClick", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = a.mapInfo[t + "_" + e.mapId];
        n && n.bindtap && "function" == typeof i.default.webviewEventCallback && i.default.webviewEventCallback({
          data: {
            type: "tap",
            target: n.target,
            currentTarget: n.target,
            timeStamp: Date.now(),
            touches: [],
            detail: {}
          },
          eventName: n.bindtap,
          webviewId: t,
          nodeId: n.nodeId
        })
      })
    }, function(e, t, n) {
      var r = n(3),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = n(1),
        a = n(82),
        c = n(83);
      ["onTouchStart", "onTouchMove", "onTouchEnd", "onTouchCancel", "onLongPress"].forEach(function(e) {
        (0, i.onMethod)(e, function(t) {
          var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            r = JSON.parse(t.data || "{}"),
            i = r.canvasNumber;
          if (!c.canvasInfo.hasOwnProperty(i)) return void console.error("No such canvas " + i + " register in " + n + ", but trigger " + e + " event.");
          var u = c.canvasInfo[i].data,
            s = (0, a.calTouches)(u.lastTouches, e, t),
            l = s.touches,
            f = s.changedTouches;
          u.lastTouches = l, u[e] && "function" == typeof o.default.webviewEventCallback && ("onTouchMove" === e && 0 === f.length || o.default.webviewEventCallback({
            data: {
              type: a.touchType[e],
              timeStamp: new Date - u.startTime,
              target: u.target,
              touches: l,
              changedTouches: f
            },
            eventName: u[e],
            webviewId: n,
            nodeId: r.nodeId
          }))
        })
      })
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = function(e, t, n) {
          var r = [],
            o = [];
          if ("onTouchStart" === t) {
            for (var i in e) r.push(e[i]);
            var a = {
              x: n.touch.x,
              y: n.touch.y,
              identifier: n.touch.id
            };
            o.push(a), r.push(a)
          } else if ("onTouchMove" === t)
            for (var c in e) {
              var u = e[c],
                s = !1;
              for (var l in n.touches) {
                var f = {
                  x: n.touches[l].x,
                  y: n.touches[l].y,
                  identifier: n.touches[l].id
                };
                if (f.identifier === u.identifier && (u.x !== f.x || u.y !== f.y)) {
                  r.push(f), o.push(f), s = !0;
                  break
                }
              }
              s || r.push(u)
            } else if ("onTouchEnd" === t) {
              var d = {
                x: n.touch.x,
                y: n.touch.y,
                identifier: n.touch.id
              };
              for (var p in e) {
                var h = e[p];
                h.identifier === d.identifier ? o.push(d) : r.push(h)
              }
            } else if ("onTouchCancel" === t)
            for (var v in n.touches) {
              var g = {
                x: n.touches[v].x,
                y: n.touches[v].y,
                identifier: n.touches[v].id
              };
              o.push(g)
            } else if ("onLongPress" === t) {
              var _ = {
                x: n.touch.x,
                y: n.touch.y,
                identifier: n.touch.id
              };
              for (var y in e) e[y].identifier === _.identifier ? r.push(_) : r.push(e[y]);
              o.push(_)
            }
          return {
            touches: r,
            changedTouches: o
          }
        },
        r = {
          onTouchStart: "touchstart",
          onTouchMove: "touchmove",
          onTouchEnd: "touchend",
          onTouchCancel: "touchcancel",
          onLongPress: "longtap"
        };
      t.calTouches = n, t.touchType = r
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(22);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      })
    }, function(e, t, n) {
      var r = n(3),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = n(1);
      ["onVideoPlay", "onVideoPause", "onVideoEnded", "onVideoTimeUpdate", "onVideoClickFullScreenBtn", "onVideoClickDanmuBtn", "onVideoFullScreenChange", "onVideoWaiting", "onVideoError", "onVideoLoadedData", "onVideoLoadedMetaData", "onVideoLoadStart", "onVideoSeeked", "onVideoSeeking"].forEach(function(e) {
        (0, i.onMethod)(e, function() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments[1],
            r = "bind" + e.substring(7).toLowerCase(),
            a = JSON.parse(t.data),
            c = a.handlers,
            u = a.event,
            s = a.createdTimestamp,
            l = a.nodeId;
          if ("onVideoFullScreenChange" === e && (0, i.publish)("videoFullScreenChange", t, [n]), c[r] && "function" == typeof o.default.webviewEventCallback) {
            var f = {
              type: r.substring(4),
              target: u.target,
              currentTarget: u.currentTarget,
              timeStamp: (t.timeStamp || Date.now()) - s,
              detail: {}
            };
            if ("bindtimeupdate" === r && (f.detail = {
                currentTime: t.position,
                duration: t.duration
              }), "bindfullscreenchange" === r) {
              var d = t.direction;
              d = 0 === d || 180 === d || "vertical" === d ? "vertical" : "horizontal", f.detail = {
                fullScreen: t.fullScreen,
                direction: d
              }
            }
            "binderror" === r && (f.detail = {
              errMsg: t.errMsg
            }), o.default.webviewEventCallback({
              data: f,
              eventName: c[r],
              webviewId: n,
              nodeId: l
            })
          }
        })
      })
    }, function(e, t, n) {
      var r = n(3),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = n(1);
      ["onTextViewClick", "onImageViewClick"].forEach(function(e) {
        (0, i.onMethod)(e, function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
          if (e.data && "function" == typeof o.default.webviewEventCallback) {
            var n = JSON.parse(e.data);
            n.bindtap && o.default.webviewEventCallback({
              data: {
                target: n.target,
                currentTarget: n.target
              },
              eventName: n.bindtap,
              webviewId: t
            })
          }
        })
      })
    }, function(e, t, n) {
      var r = n(3),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = n(1),
        a = n(7);
      (0, i.onMethod)("onCameraNeedAuthCancel", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = a.cameraInfo[t + "_" + e.cameraId];
        n && n.binderror && "function" == typeof o.default.webviewEventCallback && o.default.webviewEventCallback({
          data: {
            type: "error",
            target: n.target,
            currentTarget: n.target,
            timeStamp: Date.now(),
            touches: [],
            detail: {
              msg: "user cancel auth"
            }
          },
          eventName: n.binderror,
          webviewId: t,
          nodeId: n.nodeId
        }), n && (n.isCancelAuth = !0)
      }), (0, i.onMethod)("onCameraStop", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
          n = a.cameraInfo[t + "_" + e.cameraId];
        n && n.bindstop && "function" == typeof o.default.webviewEventCallback && o.default.webviewEventCallback({
          data: {
            type: "stop",
            target: n.target,
            currentTarget: n.target,
            timeStamp: Date.now(),
            touches: [],
            detail: {}
          },
          eventName: n.bindstop,
          webviewId: t,
          nodeId: n.nodeId
        })
      })
    }, function(e, t, n) {
      var r = n(3),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = n(1),
        a = n(76),
        c = {
          onLivePlayerEvent: "bindstatechange",
          onLivePlayerNetStatus: "bindnetstatus"
        };
      ["onLivePlayerEvent", "onLivePlayerNetStatus"].forEach(function(e) {
        (0, i.onMethod)(e, function() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments[1],
            r = a.playerInfo[n + "_" + t.livePlayerId],
            i = c[e];
          if (r && r.handlers[i] && "function" == typeof o.default.webviewEventCallback) {
            var u = {};
            switch (e) {
              case "onLivePlayerEvent":
                u.code = t.errCode;
                break;
              case "onLivePlayerNetStatus":
                u.info = t.info
            }
            o.default.webviewEventCallback({
              data: {
                type: r.handlers[i].replace("bind", ""),
                target: r.target,
                currentTarget: r.target,
                timeStamp: Date.now() - r.createdTimeStamp,
                touches: [],
                detail: u
              },
              eventName: r.handlers[i],
              webviewId: n
            })
          }
        })
      }), (0, i.onMethod)("onLivePlayerFullScreenChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments[1];
        (0, i.publish)("videoFullScreenChange", e, [t]);
        var n = a.playerInfo[t + "_" + e.livePlayerId];
        n && n.handlers.bindfullscreenchange && "function" == typeof o.default.webviewEventCallback && o.default.webviewEventCallback({
          data: {
            type: "fullscreenchange",
            target: n.target,
            currentTarget: n.target,
            timeStamp: Date.now() - n.createdTimeStamp,
            touches: [],
            detail: {
              fullScreen: e.fullScreen,
              direction: 0 === e.direction || 180 === e.direction || "vertical" === e.direction ? "vertical" : "horizontal"
            }
          },
          eventName: n.handlers.bindfullscreenchange,
          webviewId: t
        })
      })
    }, function(e, t, n) {
      var r = n(3),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = n(1),
        a = n(77),
        c = {
          onLivePusherEvent: "bindstatechange",
          onLivePusherNetStatus: "bindnetstatus"
        };
      ["onLivePusherEvent", "onLivePusherNetStatus"].forEach(function(e) {
        (0, i.onMethod)(e, function() {
          var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
            n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0,
            r = a.pusherInfo[n + "_" + t.livePusherId],
            i = c[e];
          if (r && r.handlers[i] && "function" == typeof o.default.webviewEventCallback) {
            var u = {};
            switch (e) {
              case "onLivePusherEvent":
                u.code = t.errCode;
                break;
              case "onLivePusherNetStatus":
                u.info = t.info
            }
            o.default.webviewEventCallback({
              data: {
                type: r.handlers[i].replace("bind", ""),
                target: r.target,
                currentTarget: r.target,
                timeStamp: Date.now() - r.createdTimeStamp,
                touches: [],
                detail: u
              },
              eventName: r.handlers[i],
              webviewId: n,
              nodeId: r.nodeId
            })
          }
        })
      })
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o(e) {
        v[e] || (v[e] = !0, (0, f.onBeforeUnloadPage)(e, function(e) {
          delete v[e], Object.keys(p).forEach(function(t) {
            new RegExp("^" + e).test(t) && delete p[t]
          }), wxConsole.log("onBeforeUnloadPage clear video", e, p)
        }))
      }

      function i(e, t) {
        var n = this,
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
          o = new g(e, t, r);
        return o._getAppStatus = function() {
          return n.appStatus
        }, o._getHanged = function() {
          return n.hanged
        }, this.onAppEnterBackground(function() {
          o.pause()
        }), o
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var a = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }();
      t.default = i;
      var c = n(1),
        u = n(2),
        s = n(8),
        l = n(4),
        f = n(26),
        d = "ios" !== (0, u.getPlatform)() && "android" !== (0, u.getPlatform)(),
        p = {},
        h = new s.EventEmitter2,
        v = {};
      (0, c.subscribe)("videoPlayerInsert", function(e, t) {
        var n = e.domId,
          r = e.videoPlayerId,
          i = e.nodeId,
          a = t + "_" + n + "_";
        "number" == typeof i && -1 !== i && (a += i), p[a] = r, h.emit("videoPlayerInsert"), o(t), wxConsole.log("videoPlayerInsert", a, p)
      }), (0, c.subscribe)("videoPlayerRemoved", function(e, t) {
        var n = e.domId,
          r = (e.videoPlayerId, e.nodeId),
          o = t + "_" + n + "_";
        "number" == typeof r && -1 !== r && (o += r), delete p[o], wxConsole.log("videoPlayerRemoved", o, p)
      });
      var g = function() {
        function e(t, n, o) {
          if (r(this, e), "string" != typeof t) throw new u.ThirdScriptError("Parameter 1 should be a string");
          this.domId = t, this.webviewId = n, this.nodeId = o
        }
        return a(e, [{
          key: "play",
          value: function() {
            var e = this._getAppStatus();
            e === l.AppStatus.BACK_GROUND || e === l.AppStatus.LOCK || this._invokeMethod("play")
          }
        }, {
          key: "pause",
          value: function() {
            this._invokeMethod("pause")
          }
        }, {
          key: "stop",
          value: function() {
            this._invokeMethod("stop")
          }
        }, {
          key: "seek",
          value: function(e) {
            this._invokeMethod("seek", [e])
          }
        }, {
          key: "sendDanmu",
          value: function(e) {
            var t = e.text,
              n = e.color;
            this._invokeMethod("sendDanmu", [t, n])
          }
        }, {
          key: "playbackRate",
          value: function(e) {
            .5 !== (e = parseFloat(e.toFixed(1))) && .8 !== e && 1 !== e && 1.25 !== e && 1.5 !== e || this._invokeMethod("playbackRate", [e])
          }
        }, {
          key: "requestFullScreen",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = e.direction;
            [0, 90, -90].indexOf(t) > -1 ? this._invokeMethod("requestFullScreen", [t]) : this._invokeMethod("requestFullScreen")
          }
        }, {
          key: "exitFullScreen",
          value: function() {
            this._invokeMethod("exitFullScreen")
          }
        }, {
          key: "showStatusBar",
          value: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            this._invokeMethod("showStatusBar", [e])
          }
        }, {
          key: "_invokeMethod",
          value: function(e, t) {
            function n() {
              d ? (this.action = {
                method: e,
                data: t
              }, this._sendAction(p[o])) : (wxConsole.log("operateVideoPlayer", e), (0, c.invokeMethod)("operateVideoPlayer", {
                data: t,
                videoPlayerId: p[o],
                type: e
              }))
            }
            var r = this,
              o = this.webviewId + "_" + this.domId + "_" + this.nodeId;
            "number" == typeof p[o] ? n.apply(this) : h.once("videoPlayerInsert", function() {
              r._invokeMethod(e, t)
            })
          }
        }, {
          key: "_sendAction",
          value: function(e) {
            WeixinJSBridge.publish("video_" + this.domId + "_" + e + "_" + this.nodeId + "_actionChanged", this.action, [this.webviewId])
          }
        }]), e
      }()
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o(e) {
        h[e] || (h[e] = !0, (0, f.onBeforeUnloadPage)(e, function(e) {
          delete h[e], Object.keys(d).forEach(function(t) {
            new RegExp("^" + e).test(t) && delete d[t]
          }), wxConsole.log("onBeforeUnloadPage, clear audio", e, d)
        }))
      }

      function i(e, t) {
        var n = this,
          r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "",
          o = new v(e, t, r);
        return o._getAppStatus = function() {
          return n.appStatus
        }, o._getHanged = function() {
          return n.hanged
        }, this.onAppEnterBackground(function() {
          o.pause()
        }), o
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var a = function() {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
          }
        }
        return function(t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t
        }
      }();
      t.default = i;
      var c = n(1),
        u = n(2),
        s = n(8),
        l = n(4),
        f = n(26),
        d = {},
        p = new s.EventEmitter2,
        h = {};
      (0, c.subscribe)("audioInsert", function(e, t) {
        var n = e.audioId,
          r = e.nodeId,
          i = t + "_" + n + "_";
        "number" == typeof r && -1 !== r && (i += r), d[i] = !0, p.emit("audioInsert_" + i), o(t), wxConsole.log("audioInsert", i, d)
      }), (0, c.subscribe)("audioRemove", function(e, t) {
        var n = e.audioId,
          r = e.nodeId,
          o = t + "_" + n + "_";
        "number" == typeof r && -1 !== r && (o += r), delete d[o], wxConsole.log("audioRemove", o, d)
      });
      var v = function() {
        function e(t, n, o) {
          if (r(this, e), "string" != typeof t) throw new u.ThirdScriptError("Parameter 1 should be a string");
          this.audioId = t, this.webviewId = n, this.nodeId = o
        }
        return a(e, [{
          key: "setSrc",
          value: function(e) {
            this._sendAction({
              method: "setSrc",
              data: e
            })
          }
        }, {
          key: "play",
          value: function() {
            var e = this._getAppStatus();
            this._getHanged();
            e === l.AppStatus.BACK_GROUND || this._sendAction({
              method: "play"
            })
          }
        }, {
          key: "pause",
          value: function() {
            this._sendAction({
              method: "pause"
            })
          }
        }, {
          key: "seek",
          value: function(e) {
            this._sendAction({
              method: "setCurrentTime",
              data: e
            })
          }
        }, {
          key: "_ready",
          value: function(e) {
            var t = this.webviewId + "_" + this.audioId + "_" + this.nodeId;
            d[t] ? e() : p.on("audioInsert_" + t, function() {
              e()
            })
          }
        }, {
          key: "_sendAction",
          value: function(e) {
            var t = this;
            this._ready(function() {
              wxConsole.log("publish audio action", e), WeixinJSBridge.publish("audio_" + t.audioId + "_" + t.nodeId + "_actionChanged", e, [t.webviewId])
            })
          }
        }]), e
      }()
    }, function(e, t) {
      if ("undefined" == typeof navigator) {
        try {
          new Function("const GeneratorFunction = Object.getPrototypeOf(function *() {}).constructor; const f = new GeneratorFunction('', 'console.log(0)'); f().__proto__.__proto__.next = () => {};")()
        } catch (e) {}
        try {
          new Function("const AsyncFunctionProto = Object.getPrototypeOf(async function() {}); Object.defineProperty(AsyncFunctionProto, 'constructor', { value: function(){} });")()
        } catch (e) {}
      }
    }, function(e, t) {
      (function(e) {
        function n() {
          if ("undefined" != typeof Function && !__wxConfig.karmaTest) {
            var t = function() {
              if (arguments.length > 0 && "return this" === arguments[arguments.length - 1]) return function() {
                return e
              }
            };
            e = {}, t.prototype = Function.prototype, Function.prototype.constructor = t, Function = t
          }
          var n = function() {
            return this
          }();
          if ("undefined" != typeof eval && (eval = void 0), "undefined" != typeof setTimeout) {
            var o = setTimeout;
            setTimeout = function(e) {
              var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
              if ("function" != typeof e) throw new TypeError("setTimetout expects a function as first argument but got " + (void 0 === e ? "undefined" : r(e)) + ".");
              var i = Reporter.surroundThirdByTryCatch(e, "at setTimeout callback function"),
                a = [].slice.call(arguments, 2);
              return o(function() {
                i.apply(n, a)
              }, t)
            };
            var i = setInterval;
            setInterval = function(e, t) {
              if ("function" != typeof e) throw new TypeError("setInterval expects a function as first argument but got " + (void 0 === e ? "undefined" : r(e)) + ".");
              var o = Reporter.surroundThirdByTryCatch(e, "at setInterval callback function"),
                a = [].slice.call(arguments, 2);
              return i(function() {
                o.apply(n, a)
              }, t)
            }
          }
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        };
        t.hijack = n
      }).call(t, function() {
        return this
      }())
    }, function(e, t, n) {
      var r = n(1),
        o = n(2),
        i = n(4);
      if ("devtools" !== (0, o.getPlatform)() && !__wxConfig.karmaTest) {
        var a = [],
          c = [],
          u = !1,
          s = ["log", "warn", "error", "info", "debug"],
          l = {};
        s.forEach(function(e) {
          l[e] = console[e], console[e] = function() {
            a.length > i.LOG_LIMIT && a.shift();
            var t = Array.prototype.slice.call(arguments);
            a.push({
              method: e,
              log: t
            }), l[e].apply(console, arguments), u && c.length > 0 && (0, r.publish)(e, {
              log: t
            }, c)
          }
        }), (0, r.subscribe)("GenerateFuncReady", function(e, t) {
          c.push(t), u && (0, r.publish)("initLogs", {
            logs: a
          }, [t])
        }), (0, r.subscribe)("webviewClearLog", function(e, t) {
          var n = c.filter(function(e) {
            return e !== t
          });
          (0, r.publish)("serviceClearLog", {
            triggerWebViewId: t
          }, n), a.length = 0
        }), __wxConfig.onReady(function() {
          __wxConfig.debug ? (u = !0, c.length > 0 && (0, r.publish)("initLogs", {
            logs: a
          }, c)) : s.forEach(function(e) {
            console[e] = l[e].bind(console)
          })
        })
      }
      void 0 === console.group && (console.group = function() {}), void 0 === console.groupEnd && (console.groupEnd = function() {})
    }, function(e, t, n) {
      function r() {
        s({
          success: function(e) {
            a.default.currentClipBoardData = e.data
          }
        })
      }
      var o = n(26),
        i = n(3),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = n(95),
        u = n(105),
        s = c.clipboard.getClipboardData;
      r(), (0, o.onAppEnterForeground)(r), (0, o.onAppEnterBackground)(function() {
        s({
          success: function(e) {
            e.data !== a.default.currentClipBoardData && (a.default.currentClipBoardData = e.data, (0, u.reportClipBoardData)(!1))
          }
        })
      })
    }, function(e, t, n) {
      function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.nfc = t.wifi = t.bluetooth = t.contact = t.vibrate = t.screen = t.iBeacon = t.clipboard = t.scan = t.phone = t.compass = t.accelerometer = t.network = t.batteryInfo = t.systemInfo = void 0;
      var o = n(96),
        i = r(o),
        a = n(98),
        c = r(a),
        u = n(99),
        s = r(u),
        l = n(100),
        f = r(l),
        d = n(101),
        p = r(d),
        h = n(102),
        v = r(h),
        g = n(103),
        _ = r(g),
        y = n(104),
        b = r(y),
        m = n(106),
        w = r(m),
        k = n(107),
        S = r(k),
        C = n(113),
        P = r(C),
        x = n(114),
        M = r(x),
        E = n(115),
        O = r(E),
        T = n(136),
        I = r(T),
        A = n(147),
        j = r(A);
      t.systemInfo = i, t.batteryInfo = c, t.network = s, t.accelerometer = f, t.compass = p, t.phone = v, t.scan = _, t.clipboard = b, t.iBeacon = w, t.screen = S, t.vibrate = P, t.contact = M, t.bluetooth = O, t.wifi = I, t.nfc = j
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getSystemInfoSync = t.getSystemInfo = void 0;
      var r = n(1),
        o = n(2),
        i = n(97),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = function(e) {
          var t = (0, o.getPlatform)();
          (0, r.invokeMethod)("getSystemInfo", e, {
            beforeSuccess: function(e) {
              "ios" === t && (e.brand = "iPhone"), e.platform = t, e.SDKVersion = a.default.SDKVersion
            }
          })
        },
        u = function(e) {
          var t = {},
            n = (0, o.getPlatform)();
          return (0, r.invokeMethod)("getSystemInfo", {}, {
            beforeSuccess: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              "ios" === n && (e.brand = "iPhone"), t = e, t.platform = n, t.SDKVersion = a.default.SDKVersion, delete e.errMsg
            }
          }), t
        };
      t.getSystemInfo = c, t.getSystemInfoSync = u
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = {
        SDKVersion: "1.9.5"
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getBatteryInfoSync = t.getBatteryInfo = void 0;
      var r = n(1),
        o = n(2),
        i = n(96),
        a = (0, o.getPlatform)(),
        c = function(e) {
          if ("ios" === a) {
            var t = {};
            try {
              var n = (0, i.getSystemInfoSync)().batteryLevel;
              t = {
                level: n
              }, "function" == typeof e.success && e.success(t)
            } catch (n) {
              t = {
                errMsg: "getBatteryInfo:fail"
              }, "function" == typeof e.fail && e.fail(t)
            }
            "function" == typeof e.complete && e.complete(t)
          } else if ("android" === a)(0, r.invokeMethod)("getBatteryInfo", {
            success: function(t) {
              delete t.isCharging, "function" == typeof e.success && e.success(t)
            },
            fail: e.fail,
            complete: e.complete
          });
          else {
            var o = {
              level: 100
            };
            "function" == typeof e.success && e.success(o), "function" == typeof e.complete && e.complete(o)
          }
        },
        u = function(e) {
          if ("ios" === a) return {
            level: (0, i.getSystemInfoSync)().batteryLevel
          };
          if ("android" === a) {
            var t = {
              level: 100
            };
            return (0, r.invokeMethod)("getBatteryInfo", {
              success: function(e) {
                var n = e.level;
                t = {
                  level: n
                }
              }
            }), t
          }
          return {
            level: 100
          }
        };
      t.getBatteryInfo = c, t.getBatteryInfoSync = u
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onNetworkStatusChange = t.getNetworkType = void 0;
      var r = n(1),
        o = [],
        i = function(e) {
          (0, r.invokeMethod)("getNetworkType", e)
        },
        a = function(e) {
          o.push(Reporter.surroundThirdByTryCatch(e, "onNetworkStatusChange"))
        };
      (0, r.onMethod)("onNetworkStatusChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        o.forEach(function(t) {
          "function" == typeof t && t(e)
        })
      }), t.getNetworkType = i, t.onNetworkStatusChange = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onAccelerometerChange = t.stopAccelerometer = t.startAccelerometer = void 0;
      var r = n(1),
        o = n(2),
        i = !1,
        a = [],
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("enableAccelerometer", (0, o.assign)(e, {
            enable: !0
          }), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("enableAccelerometer", "startAccelerometer")
            }
          }), i = !0
        },
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("enableAccelerometer", (0, o.assign)(e, {
            enable: !1
          }), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("enableAccelerometer", "stopAccelerometer")
            }
          }), i = !1
        },
        s = function(e) {
          i || ((0, r.invokeMethod)("enableAccelerometer", {
            enable: !0
          }), i = !0), a.push(Reporter.surroundThirdByTryCatch(e, "at onAccelerometerChange callback function"))
        };
      (0, r.onMethod)("onAccelerometerChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        a.forEach(function(t) {
          "function" == typeof t && t(e)
        })
      }), t.startAccelerometer = c, t.stopAccelerometer = u, t.onAccelerometerChange = s
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onCompassChange = t.stopCompass = t.startCompass = void 0;
      var r = n(1),
        o = n(2),
        i = !1,
        a = [],
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("enableCompass", (0, o.assign)(e, {
            enable: !0
          }), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("enableCompass", "startCompass")
            }
          }), i = !0
        },
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("enableCompass", (0, o.assign)(e, {
            enable: !1
          }), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("enableCompass", "stopCompass")
            }
          }), i = !1
        },
        s = function(e) {
          i || ((0, r.invokeMethod)("enableCompass", {
            enable: !0
          }), i = !0), a.push(Reporter.surroundThirdByTryCatch(e, "at onCompassChange callback function"))
        };
      (0, r.onMethod)("onCompassChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
        a.forEach(function(t) {
          "function" == typeof t && t(e)
        })
      }), t.startCompass = c, t.stopCompass = u, t.onCompassChange = s
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.makeVoIPCall = t.makePhoneCall = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("makePhoneCall", e, {
            phoneNumber: ""
          }) && (0, r.invokeMethod)("makePhoneCall", e)
        },
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("makeVoIPCall", (0, o.assign)({
            allowBackCamera: !1,
            showOther: !1
          }, e))
        };
      t.makePhoneCall = i, t.makeVoIPCall = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.scanCode = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("scanCode", e, {}) && (0, r.invokeMethod)("scanCode", e, {
            beforeSuccess: function(e) {
              "string" == typeof e.path && (e.path = e.path.replace(/\.html$/, ""), e.path = e.path.replace(/\.html\?/, "?"))
            }
          })
        };
      t.scanCode = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setClipboardData = t.getClipboardData = void 0;
      var r = n(1),
        o = n(105),
        i = n(3),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getClipboardData", e, {})
        },
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("setClipboardData", e, {
            data: ""
          }) && (0, r.invokeMethod)("setClipboardData", e, {
            beforeSuccess: function() {
              a.default.currentClipBoardData = e.data, (0, o.reportClipBoardData)(!0)
            }
          })
        };
      t.getClipboardData = c, t.setClipboardData = u
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.reportClipBoardData = void 0;
      var r = (n(1), n(3)),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = function(e) {
          if ("" !== o.default.currentClipBoardData) {
            var t = getCurrentPages().find(function(e) {
                return e.__wxWebviewId__ === o.default.currentWebviewId
              }) || {},
              n = [o.default.currentClipBoardData, t.route, e ? 1 : 0, Object.keys(t.options).map(function(e) {
                return encodeURIComponent(e) + "=" + encodeURIComponent(t.options[e])
              }).join("&"), Reporter.getAppType()].map(encodeURIComponent).join(",");
            Reporter.reportKeyValue({
              key: "Clipboard",
              value: n,
              force: !0
            })
          }
        };
      t.reportClipBoardData = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onBeaconServiceChange = t.onBeaconUpdate = t.getBeacons = t.stopBeaconDiscovery = t.startBeaconDiscovery = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (!e.uuids) return void(0, r.beforeInvokeFail)("startBeaconDiscovery", e, "must have uuid");
          if (!Array.isArray(e.uuids)) return void(0, r.beforeInvokeFail)("startBeaconDiscovery", e, "uuid must be an Array");
          if (0 !== e.uuids.length) {
            var t = new RegExp(/^[0-9a-f]{4}$|^[0-9a-f]{8}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
            if (!e.uuids.some(function(e) {
                return "string" == typeof e && t.test(e)
              })) return void(0, r.beforeInvokeFail)("startBeaconDiscovery", e, "invalid service uuid")
          }(0, r.invokeMethod)("startBeaconDiscovery", e)
        },
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("stopBeaconDiscovery", e)
        },
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getBeacons", e)
        },
        c = function(e) {
          (0, r.beforeInvoke)("onBeaconUpdate", e, r.noop) && (0, r.onMethod)("onBeaconUpdated", Reporter.surroundThirdByTryCatch(e, "at onBeaconUpdate callback function"))
        },
        u = function(e) {
          (0, r.beforeInvoke)("onBeaconServiceChange", e, r.noop) && (0, r.onMethod)("onBeaconServiceChanged", Reporter.surroundThirdByTryCatch(e, "at onBeaconServiceChange callback function"))
        };
      t.startBeaconDiscovery = o, t.stopBeaconDiscovery = i, t.getBeacons = a, t.onBeaconUpdate = c, t.onBeaconServiceChange = u
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(108);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(109);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(110);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var a = n(111);
      Object.keys(a).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return a[e]
          }
        })
      });
      var c = n(112);
      Object.keys(c).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return c[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.captureScreen = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("captureScreen", e, {})
        };
      t.captureScreen = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onUserCaptureScreen = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.onMethod)("onUserCaptureScreen", Reporter.surroundThirdByTryCatch(e, "at onUserCaptureScreen callback function"))
        };
      t.onUserCaptureScreen = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getScreenBrightness = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getScreenBrightness", e, {})
        };
      t.getScreenBrightness = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setScreenBrightness = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("setScreenBrightness", e, {})
        };
      t.setScreenBrightness = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setKeepScreenOn = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("setKeepScreenOn", e, {
            keepScreenOn: !0
          }) && (0, r.invokeMethod)("setKeepScreenOn", e, {})
        };
      t.setKeepScreenOn = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.vibrateLong = t.vibrateShort = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("vibrateShort", e, {})
        },
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("vibrateLong", e, {})
        };
      t.vibrateShort = o, t.vibrateLong = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.addPhoneContact = t.chooseWeChatContact = t.chooseContact = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.invokeMethod)("chooseContact", e)
        },
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("chooseWeChatContact", e)
        },
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("addPhoneContact", e, {})
        };
      t.chooseContact = o, t.chooseWeChatContact = i, t.addPhoneContact = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(116);
      Object.defineProperty(t, "openBluetoothAdapter", {
        enumerable: !0,
        get: function() {
          return r.openBluetoothAdapter
        }
      });
      var o = n(117);
      Object.defineProperty(t, "closeBluetoothAdapter", {
        enumerable: !0,
        get: function() {
          return o.closeBluetoothAdapter
        }
      });
      var i = n(118);
      Object.defineProperty(t, "getBluetoothAdapterState", {
        enumerable: !0,
        get: function() {
          return i.getBluetoothAdapterState
        }
      });
      var a = n(119);
      Object.defineProperty(t, "onBluetoothAdapterStateChange", {
        enumerable: !0,
        get: function() {
          return a.onBluetoothAdapterStateChange
        }
      });
      var c = n(120);
      Object.defineProperty(t, "startBluetoothDevicesDiscovery", {
        enumerable: !0,
        get: function() {
          return c.startBluetoothDevicesDiscovery
        }
      });
      var u = n(121);
      Object.defineProperty(t, "stopBluetoothDevicesDiscovery", {
        enumerable: !0,
        get: function() {
          return u.stopBluetoothDevicesDiscovery
        }
      });
      var s = n(122);
      Object.defineProperty(t, "getBluetoothDevices", {
        enumerable: !0,
        get: function() {
          return s.getBluetoothDevices
        }
      });
      var l = n(123);
      Object.defineProperty(t, "getConnectedBluetoothDevices", {
        enumerable: !0,
        get: function() {
          return l.getConnectedBluetoothDevices
        }
      });
      var f = n(124);
      Object.defineProperty(t, "createBLEConnection", {
        enumerable: !0,
        get: function() {
          return f.createBLEConnection
        }
      });
      var d = n(125);
      Object.defineProperty(t, "closeBLEConnection", {
        enumerable: !0,
        get: function() {
          return d.closeBLEConnection
        }
      });
      var p = n(126);
      Object.defineProperty(t, "getBLEDeviceServices", {
        enumerable: !0,
        get: function() {
          return p.getBLEDeviceServices
        }
      });
      var h = n(127);
      Object.defineProperty(t, "getBLEDeviceCharacteristics", {
        enumerable: !0,
        get: function() {
          return h.getBLEDeviceCharacteristics
        }
      });
      var v = n(128);
      Object.defineProperty(t, "notifyBLECharacteristicValueChanged", {
        enumerable: !0,
        get: function() {
          return v.notifyBLECharacteristicValueChanged
        }
      });
      var g = n(129);
      Object.defineProperty(t, "notifyBLECharacteristicValueChange", {
        enumerable: !0,
        get: function() {
          return g.notifyBLECharacteristicValueChange
        }
      });
      var _ = n(130);
      Object.defineProperty(t, "onBluetoothDeviceFound", {
        enumerable: !0,
        get: function() {
          return _.onBluetoothDeviceFound
        }
      });
      var y = n(131);
      Object.defineProperty(t, "readBLECharacteristicValue", {
        enumerable: !0,
        get: function() {
          return y.readBLECharacteristicValue
        }
      });
      var b = n(132);
      Object.defineProperty(t, "writeBLECharacteristicValue", {
        enumerable: !0,
        get: function() {
          return b.writeBLECharacteristicValue
        }
      });
      var m = n(133);
      Object.defineProperty(t, "onBLEConnectionStateChanged", {
        enumerable: !0,
        get: function() {
          return m.onBLEConnectionStateChanged
        }
      });
      var w = n(134);
      Object.defineProperty(t, "onBLEConnectionStateChange", {
        enumerable: !0,
        get: function() {
          return w.onBLEConnectionStateChange
        }
      });
      var k = n(135);
      Object.defineProperty(t, "onBLECharacteristicValueChange", {
        enumerable: !0,
        get: function() {
          return k.onBLECharacteristicValueChange
        }
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openBluetoothAdapter = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("openBluetoothAdapter", e, {})
        };
      t.openBluetoothAdapter = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.closeBluetoothAdapter = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("closeBluetoothAdapter", e, {})
        };
      t.closeBluetoothAdapter = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getBluetoothAdapterState = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getBluetoothAdapterState", e, {})
        };
      t.getBluetoothAdapterState = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onBluetoothAdapterStateChange = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.onMethod)("onBluetoothAdapterStateChange", Reporter.surroundThirdByTryCatch(e, "at onBluetoothAdapterStateChange callback function"))
        };
      t.onBluetoothAdapterStateChange = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startBluetoothDevicesDiscovery = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (e.services) {
            if (!Array.isArray(e.services)) return void(0, r.beforeInvokeFail)("startBluetoothDevicesDiscovery", {}, "services must be an Array");
            if (0 !== e.services.length) {
              var t = new RegExp(/^[0-9a-f]{4}$|^[0-9a-f]{8}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
              if (!e.services.some(function(e) {
                  return "string" == typeof e && t.test(e)
                })) return void(0, r.beforeInvokeFail)("startBluetoothDevicesDiscovery", {}, "invalid service uuid");
              e.services = e.services.map(function(e) {
                return "android" === (0, o.getPlatform)() && (e = e.toUpperCase()), 4 === e.length ? "0000" + e + "-0000-1000-8000-00805F9B34FB" : 8 === e.length ? e + "-0000-1000-8000-00805F9B34FB" : e
              })
            }
          }(0, r.invokeMethod)("startBluetoothDevicesDiscovery", e, {})
        };
      t.startBluetoothDevicesDiscovery = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.stopBluetoothDevicesDiscovery = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("stopBluetoothDevicesDiscovery", e, {})
        };
      t.stopBluetoothDevicesDiscovery = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getBluetoothDevices = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getBluetoothDevices", e, {
            beforeSuccess: function(e) {
              Array.isArray(e.devices) || (e.devices = []), e.devices.map(function(e) {
                if (e.name || (e.name = "未知设备"), e.advertisData && (e.advertisData = (0, o.base64ToArrayBuffer)(e.advertisData)), e.serviceData) {
                  var t = e.serviceData;
                  Object.keys(t).forEach(function(e) {
                    t[e] && (t[e] = (0, o.base64ToArrayBuffer)(t[e]))
                  })
                }
                return e
              })
            }
          })
        };
      t.getBluetoothDevices = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getConnectedBluetoothDevices = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (e.services) {
            if (!Array.isArray(e.services)) return void(0, r.beforeInvokeFail)("getConnectedBluetoothDevices", e, "services must be an Array");
            if (0 !== e.services.length) {
              var t = new RegExp(/^[0-9a-f]{4}$|^[0-9a-f]{8}$|^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
              if (!e.services.some(function(e) {
                  return "string" == typeof e && t.test(e)
                })) return void(0, r.beforeInvokeFail)("getConnectedBluetoothDevices", {}, "invalid service uuid");
              e.services = e.services.map(function(e) {
                return console.warn((0, o.getPlatform)()), "android" === (0, o.getPlatform)() && (e = e.toUpperCase()), 4 === e.length ? "0000" + e + "-0000-1000-8000-00805F9B34FB" : 8 === e.length ? e + "-0000-1000-8000-00805F9B34FB" : e
              })
            }
          }(0, r.invokeMethod)("getConnectedBluetoothDevices", e, {
            beforeSuccess: function(e) {
              Array.isArray(e.devices) || (e.devices = []), e.devices = e.devices.map(function(e) {
                return e.name || (e.name = "未知设备"), e.advertisData && (e.advertisData = (0, o.base64ToArrayBuffer)(e.advertisData)), e
              })
            }
          })
        };
      t.getConnectedBluetoothDevices = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createBLEConnection = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("createBLEConnection", e, {
            deviceId: ""
          }) && (0, r.invokeMethod)("createBLEConnection", e, {})
        };
      t.createBLEConnection = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.closeBLEConnection = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("closeBLEConnection", e, {
            deviceId: ""
          }) && (0, r.invokeMethod)("closeBLEConnection", e, {})
        };
      t.closeBLEConnection = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getBLEDeviceServices = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("getBLEDeviceServices", e, {
            deviceId: ""
          }) && (0, r.invokeMethod)("getBLEDeviceServices", e, {
            beforeSuccess: function(e) {
              Array.isArray(e.services) || (e.services = []), void 0 === e.errCode && (e.errCode = 0)
            }
          })
        };
      t.getBLEDeviceServices = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getBLEDeviceCharacteristics = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("getBLEDeviceCharacteristics", e, {
            deviceId: "",
            serviceId: ""
          }) && (0, r.invokeMethod)("getBLEDeviceCharacteristics", Object.assign({}, e, {
            serviceId: "android" === (0, o.getPlatform)() ? e.serviceId.toUpperCase() : e.serviceId
          }), {
            beforeSuccess: function(e) {
              Array.isArray(e.characteristics) || (e.characteristics = [])
            }
          })
        };
      t.getBLEDeviceCharacteristics = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.notifyBLECharacteristicValueChanged = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("notifyBLECharacteristicValueChanged", e, {
              state: !0,
              deviceId: "",
              serviceId: "",
              characteristicId: ""
            })) {
            var t = "android" === (0, o.getPlatform)();
            (0, r.invokeMethod)("notifyBLECharacteristicValueChanged", Object.assign({}, e, {
              serviceId: t ? e.serviceId.toUpperCase() : e.serviceId,
              characteristicId: t ? e.characteristicId.toUpperCase() : e.characteristicId
            }), {})
          }
        };
      t.notifyBLECharacteristicValueChanged = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.notifyBLECharacteristicValueChange = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("notifyBLECharacteristicValueChange", e, {
              state: !0,
              deviceId: "",
              serviceId: "",
              characteristicId: ""
            })) {
            var t = "android" === (0, o.getPlatform)();
            (0, r.invokeMethod)("notifyBLECharacteristicValueChanged", Object.assign({}, e, {
              serviceId: t ? e.serviceId.toUpperCase() : e.serviceId,
              characteristicId: t ? e.characteristicId.toUpperCase() : e.characteristicId
            }), {
              beforeAll: function(e) {
                e.errMsg = e.errMsg.replace("notifyBLECharacteristicValueChanged", "notifyBLECharacteristicValueChange")
              }
            })
          }
        };
      t.notifyBLECharacteristicValueChange = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onBluetoothDeviceFound = void 0;
      var r = n(1),
        o = n(2),
        i = function(e) {
          (0, r.onMethod)("onBluetoothDeviceFound", function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = [];
            Array.isArray(t.devices) ? n = t.devices : n.push(t), n = n.map(function(e) {
              try {
                e.advertisData = (0, o.base64ToArrayBuffer)(e.advertisData)
              } catch (e) {}
              try {
                var t = e.serviceData || {};
                Object.keys(t).forEach(function(e) {
                  t[e] && (t[e] = (0, o.base64ToArrayBuffer)(t[e]))
                })
              } catch (e) {}
              return e
            }), Reporter.surroundThirdByTryCatch(e, "at onBluetoothDeviceFound callback function")({
              devices: n
            })
          })
        };
      t.onBluetoothDeviceFound = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.readBLECharacteristicValue = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("readBLECharacteristicValue", e, {
              deviceId: "",
              serviceId: "",
              characteristicId: ""
            })) {
            var t = "android" === (0, o.getPlatform)();
            (0, r.invokeMethod)("readBLECharacteristicValue", Object.assign({}, e, {
              serviceId: t ? e.serviceId.toUpperCase() : e.serviceId,
              characteristicId: t ? e.characteristicId.toUpperCase() : e.characteristicId
            }), {})
          }
        };
      t.readBLECharacteristicValue = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.writeBLECharacteristicValue = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("writeBLECharacteristicValue", e, {
            value: new ArrayBuffer(0),
            deviceId: "",
            serviceId: "",
            characteristicId: ""
          }) && (0, r.invokeMethod)("writeBLECharacteristicValue", Object.assign({}, e, {
            value: (0, o.arrayBufferToBase64)(e.value),
            serviceId: e.serviceId.toUpperCase(),
            characteristicId: "android" === (0, o.getPlatform)() ? e.characteristicId.toUpperCase() : e.characteristicId
          }), {})
        };
      t.writeBLECharacteristicValue = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onBLEConnectionStateChanged = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.onMethod)("onBLEConnectionStateChanged", Reporter.surroundThirdByTryCatch(e, "at onBLEConnectionStateChanged callback function"))
        };
      t.onBLEConnectionStateChanged = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onBLEConnectionStateChange = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.onMethod)("onBLEConnectionStateChanged", Reporter.surroundThirdByTryCatch(e, "at onBLEConnectionStateChange callback function"))
        };
      t.onBLEConnectionStateChange = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onBLECharacteristicValueChange = void 0;
      var r = n(1),
        o = n(2),
        i = function(e) {
          (0, r.onMethod)("onBLECharacteristicValueChange", function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            "string" == typeof t.value && (t.value = (0, o.base64ToArrayBuffer)(t.value)), Reporter.surroundThirdByTryCatch(e, "at onBLECharacteristicValueChange callback function")(t)
          })
        };
      t.onBLECharacteristicValueChange = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(137);
      Object.defineProperty(t, "startWifi", {
        enumerable: !0,
        get: function() {
          return r.startWifi
        }
      });
      var o = n(138);
      Object.defineProperty(t, "stopWifi", {
        enumerable: !0,
        get: function() {
          return o.stopWifi
        }
      });
      var i = n(139);
      Object.defineProperty(t, "getWifiList", {
        enumerable: !0,
        get: function() {
          return i.getWifiList
        }
      });
      var a = n(140);
      Object.defineProperty(t, "getConnectedWifi", {
        enumerable: !0,
        get: function() {
          return a.getConnectedWifi
        }
      });
      var c = n(141);
      Object.defineProperty(t, "connectWifi", {
        enumerable: !0,
        get: function() {
          return c.connectWifi
        }
      });
      var u = n(142);
      Object.defineProperty(t, "presetWifiList", {
        enumerable: !0,
        get: function() {
          return u.presetWifiList
        }
      });
      var s = n(143);
      Object.defineProperty(t, "setWifiList", {
        enumerable: !0,
        get: function() {
          return s.setWifiList
        }
      });
      var l = n(144);
      Object.defineProperty(t, "onGetWifiList", {
        enumerable: !0,
        get: function() {
          return l.onGetWifiList
        }
      });
      var f = n(145);
      Object.defineProperty(t, "onWifiConnected", {
        enumerable: !0,
        get: function() {
          return f.onWifiConnected
        }
      });
      var d = n(146);
      Object.defineProperty(t, "onEvaluateWifi", {
        enumerable: !0,
        get: function() {
          return d.onEvaluateWifi
        }
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startWifi = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("startWifi", e, {})
        };
      t.startWifi = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.stopWifi = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("stopWifi", e, {})
        };
      t.stopWifi = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getWifiList = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getWifiList", e, {})
        };
      t.getWifiList = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getConnectedWifi = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getConnectedWifi", e, {})
        };
      t.getConnectedWifi = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.connectWifi = void 0;
      var r = n(1),
        o = (n(2), function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("connectWifi", e, {
            SSID: "",
            password: ""
          }) && (0, r.invokeMethod)("connectWifi", e, {})
        });
      t.connectWifi = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.presetWifiList = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ("ios" !== (0, o.getPlatform)()) return void(0, r.beforeInvokeFail)("presetWifiList", e, "presetWifiList must be invoked on iOS platform");
          (0, r.beforeInvoke)("presetWifiList", e, {
            wifiList: []
          }) && (0, r.invokeMethod)("presetWifiList", e, {})
        };
      t.presetWifiList = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setWifiList = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ("ios" !== (0, o.getPlatform)()) return void(0, r.beforeInvokeFail)("setWifiList", e, "setWifiList must be invoked on iOS platform");
          (0, r.beforeInvoke)("setWifiList", e, {
            wifiList: []
          }) && (0, r.invokeMethod)("setWifiList", e, {})
        };
      t.setWifiList = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onGetWifiList = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.onMethod)("onGetWifiList", Reporter.surroundThirdByTryCatch(e, "at onGetWifiList callback function"))
        };
      t.onGetWifiList = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onWifiConnected = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.onMethod)("onWifiConnected", Reporter.surroundThirdByTryCatch(e, "at onWifiConnected callback function"))
        };
      t.onWifiConnected = o
    }, function(e, t, n) {
      function r(e) {
        var t = {
          SSID: e.wifi.SSID,
          BSSID: e.wifi.BSSID,
          confidence: "none"
        };
        if ("function" == typeof i) {
          var n = void 0;
          try {
            n = i(e) || {}
          } finally {
            a.find(function(e) {
              return e === n.confidence
            }) && (t.confidence = n.confidence), (0, o.invokeMethod)("evaluateWifi", t, {})
          }
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onEvaluateWifi = void 0;
      var o = n(1),
        i = null,
        a = ["none", "low", "high"],
        c = function(e) {
          "function" == typeof e && (i = e)
        };
      (0, o.onMethod)("onEvaluateWifi", Reporter.surroundThirdByTryCatch(r, "at onEvaluateWifi callback function")), t.onEvaluateWifi = c
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(148);
      Object.defineProperty(t, "getHCEState", {
        enumerable: !0,
        get: function() {
          return r.getHCEState
        }
      });
      var o = n(149);
      Object.defineProperty(t, "startHCE", {
        enumerable: !0,
        get: function() {
          return o.startHCE
        }
      });
      var i = n(150);
      Object.defineProperty(t, "stopHCE", {
        enumerable: !0,
        get: function() {
          return i.stopHCE
        }
      });
      var a = n(151);
      Object.defineProperty(t, "sendHCEMessage", {
        enumerable: !0,
        get: function() {
          return a.sendHCEMessage
        }
      });
      var c = n(152);
      Object.defineProperty(t, "onHCEMessage", {
        enumerable: !0,
        get: function() {
          return c.onHCEMessage
        }
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getHCEState = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getHCEState", e, {})
        };
      t.getHCEState = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.startHCE = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("startHCE", e, {})
        };
      t.startHCE = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.stopHCE = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("stopHCE", e, {})
        };
      t.stopHCE = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.sendHCEMessage = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("sendHCEMessage", e, {
            data: new ArrayBuffer(0)
          }) && (0, r.invokeMethod)("sendHCEMessage", Object.assign({}, e, {
            data: (0, o.arrayBufferToBase64)(e.data)
          }), {})
        };
      t.sendHCEMessage = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onHCEMessage = void 0;
      var r = n(1),
        o = n(2),
        i = function(e) {
          (0, r.onMethod)("onHCEMessage", function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            "string" == typeof t.data && (t.data = (0, o.base64ToArrayBuffer)(t.data)), Reporter.surroundThirdByTryCatch(e, "at onHCEMessage callback function")(t)
          })
        };
      t.onHCEMessage = i
    }, function(e, t, n) {
      var r = n(1),
        o = n(154),
        i = {
          getCurrentRoute: o.getCurrentRoute
        },
        a = function(e, t, n, o) {
          (0, r.publish)("callbackAppServiceMethod", {
            res: e,
            isSuccess: t,
            callbackId: n
          }, [o])
        };
      (0, r.subscribe)("invokeAppServiceMethod", function(e, t) {
        var n = e.name,
          o = e.type,
          c = e.args,
          u = e.callbackId;
        try {
          if ("bridge" === o)(0, r.invoke)(n, c, function(e) {
            e.errMsg = e.errMsg || n + ":ok", -1 !== e.errMsg.indexOf(n + ":ok") ? a(e, !0, u, t) : a(e, !1, u, t)
          });
          else {
            c.success = function(e) {
              a(e, !0, u, t)
            }, c.fail = function(e) {
              a(e, !1, u, t)
            };
            ("wx" === o ? wx[n] : i[n])(c)
          }
        } catch (e) {
          var s = {
            errMsg: n + ": fail " + e.message
          };
          a(s, !1, u, t)
        }
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getCurrentRoute = void 0;
      var r = n(3),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = function() {
          (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).success({
            currentRoute: o.default.lastRoute
          })
        };
      t.getCurrentRoute = i
    }, function(e, t, n) {
      var r = n(1),
        o = n(3),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o);
      (0, r.onMethod)("onStartReportPageData", function() {
        var e = "function" == typeof getCurrentPages ? getCurrentPages() : [],
          t = e.find(function(e) {
            return e.__wxWebviewId__ === i.default.currentWebviewId
          });
        t && (0, r.invokeMethod)("reportPageData", {
          isUserReport: !0,
          pageData: JSON.stringify(t.data),
          pageRoute: t.__route__,
          complete: function(e) {}
        })
      })
    }, function(e, t, n) {
      function r(e) {
        var t = p[e],
          n = d[e];
        n && n.length && t && t.bindmessage && u.default.webviewEventCallback && u.default.webviewEventCallback({
          data: {
            type: "message",
            target: t.target,
            currentTarget: t.target,
            timeStamp: Date.now() - t.createdTimestamp,
            detail: {
              data: n
            }
          },
          eventName: t.bindmessage,
          webviewId: e,
          nodeId: t.nodeId
        })
      }

      function o(e, t) {
        var n = e.name,
          r = e.arg;
        "android" === (0, f.getPlatform)() && (t = u.default.currentWebviewId), "navigateBack" === n ? a.route.navigateBack({
          delta: r.delta
        }) : "navigateTo" === n ? a.route.navigateTo({
          url: r.url
        }) : "redirectTo" === n ? a.route.redirectTo({
          url: r.url
        }) : "reLaunch" === n ? a.route.reLaunch({
          url: r.url
        }) : "switchTab" === n ? a.route.switchTab({
          url: r.url
        }) : "postMessage" === n && d[t] && d[t].push(r)
      }
      var i = n(1),
        a = n(9),
        c = n(3),
        u = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(c),
        s = n(26),
        l = function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return t.default = e, t
        }(s),
        f = n(2),
        d = {},
        p = {};
      (0, i.subscribe)("webViewInserted", function(e, t) {
        p[t] = e, d[t] = [], l.onBeforeUnloadPage(t, function(e) {
          r(e), delete p[e], delete d[e]
        }), l.onBeforeShareAppMessage(t, r)
      }), (0, i.subscribe)("webViewRemoved", function(e, t) {
        r(t), delete p[t], delete d[t]
      }), (0, i.onMethod)("onWebInvokeAppService", o), (0, i.onMethod)("WEB_INVOKE_APPSERVICE", o)
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(158);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onLocationChange = t.stopLocationUpdate = t.startLocationUpdate = t.chooseLocation = t.openLocation = t.getLocation = void 0;
      var r = n(1),
        o = (n(4), !1),
        i = [],
        a = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          !0 === o ? i.push(e) : (o = !0, (0, r.invokeMethod)("getLocation", e, {
            beforeAll: function() {
              o = !1
            },
            afterAll: function(e) {
              i.forEach(function(t) {
                "function" == typeof t.complete && Reporter.surroundThirdByTryCatch(t.complete, "at getLocation complete callback function")(e)
              }), i = []
            },
            afterSuccess: function(e) {
              i.forEach(function(t) {
                "function" == typeof t.success && Reporter.surroundThirdByTryCatch(t.success, "at getLocation success callback function")(e)
              })
            },
            afterFail: function(e) {
              i.forEach(function(t) {
                "function" == typeof t.fail && Reporter.surroundThirdByTryCatch(t.fail, "at getLocation fail callback function")(e)
              })
            }
          }))
        },
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("openLocation", e, {
            latitude: 1,
            longitude: 1
          }) && (0, r.invokeMethod)("openLocation", e)
        },
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("chooseLocation", e)
        },
        s = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("enableLocationUpdate", Object.assign({}, e, {
            enable: !0
          }), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("enableLocationUpdate", "startLocationUpdate")
            }
          })
        },
        l = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("enableLocationUpdate", Object.assign({}, e, {
            enable: !1
          }), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("enableLocationUpdate", "stopLocationUpdate")
            }
          })
        },
        f = function(e) {
          (0, r.onMethod)("onLocationChange", function() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
            Reporter.surroundThirdByTryCatch(e, "at onLocationChange callback function")(t)
          })
        };
      t.getLocation = a, t.openLocation = c, t.chooseLocation = u, t.startLocationUpdate = s, t.stopLocationUpdate = l, t.onLocationChange = f
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(160);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(161);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getExtConfig = void 0;
      var r = n(161),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          setTimeout(function() {
            var t = {
              errMsg: "getExtConfig: ok",
              extConfig: (0, r.getExtConfigSync)()
            };
            "function" == typeof e.success && e.success(t), "function" == typeof e.complete && e.complete(t)
          }, 0)
        };
      t.getExtConfig = o
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = function() {
        if (!__wxConfig.ext) return {};
        try {
          return JSON.parse(JSON.stringify(__wxConfig.ext))
        } catch (e) {
          return {}
        }
      };
      t.getExtConfigSync = n
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(163);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createSelectorQuery = void 0;
      var r = n(164),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = function(e) {
          var t = null;
          if (e && e.page) t = e.page.__wxWebviewId__;
          else {
            var n = getCurrentPages();
            t = n[n.length - 1].__wxWebviewId__
          }
          return new o.default(t)
        };
      t.createSelectorQuery = i
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(1),
        a = 1,
        c = {},
        u = function(e, t, n) {
          var r = a++;
          c[r] = n, (0, i.publish)("requestComponentInfo", {
            reqId: r,
            reqs: t
          }, [e])
        };
      (0, i.subscribe)("responseComponentInfo", function(e) {
        var t = e.reqId,
          n = c[t];
        n && (delete c[t], n(e.res))
      });
      var s = function() {
          function e(t, n, o, i) {
            r(this, e), this._selectorQuery = t, this._component = n, this._selector = o, this._single = i
          }
          return o(e, [{
            key: "fields",
            value: function(e, t) {
              return this._selectorQuery._push(this._selector, this._component, this._single, e, t), this._selectorQuery
            }
          }, {
            key: "boundingClientRect",
            value: function(e) {
              return this._selectorQuery._push(this._selector, this._component, this._single, {
                id: !0,
                dataset: !0,
                rect: !0,
                size: !0
              }, e), this._selectorQuery
            }
          }, {
            key: "scrollOffset",
            value: function(e) {
              return this._selectorQuery._push(this._selector, this._component, this._single, {
                id: !0,
                dataset: !0,
                scrollOffset: !0
              }, e), this._selectorQuery
            }
          }]), e
        }(),
        l = function() {
          function e(t) {
            if (r(this, e), t && t.page) this._webviewId = this._defaultWebviewId = t.page.__wxWebviewId__;
            else {
              var n = getCurrentPages();
              this._defaultWebviewId = n[n.length - 1].__wxWebviewId__, this._webviewId = null
            }
            this._component = null, this._queue = [], this._queueCb = []
          }
          return o(e, [{
            key: "in",
            value: function(e) {
              return null === this._webviewId ? (this._webviewId = e.__wxWebviewId__, this._component = e) : this._webviewId !== e.__wxWebviewId__ ? (this._component = null, console.error("A single SelectorQuery could not work in components in different pages. A SelectorQuery#in call has been ignored and the page root is used as the current component.")) : this._component = e, this
            }
          }, {
            key: "select",
            value: function(e) {
              return new s(this, this._component, e, !0)
            }
          }, {
            key: "selectAll",
            value: function(e) {
              return new s(this, this._component, e, !1)
            }
          }, {
            key: "selectViewport",
            value: function() {
              return new s(this, 0, "", !0)
            }
          }, {
            key: "_push",
            value: function(e, t, n, r, o) {
              this._queue.push({
                component: t ? t.__wxExparserNodeId__ : t,
                selector: e,
                single: n,
                fields: r
              }), this._queueCb.push(o || null)
            }
          }, {
            key: "exec",
            value: function(e) {
              var t = this;
              null === this._webviewId && (this._webviewId = this._defaultWebviewId), u(this._webviewId, this._queue, function(n) {
                var r = t._queueCb;
                n.forEach(function(e, n) {
                  "function" == typeof r[n] && r[n].call(t, e)
                }), "function" == typeof e && e.call(t, n)
              })
            }
          }]), e
        }();
      t.default = l
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.invokeWebviewMethod = void 0;
      var r = n(1),
        o = n(3),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = 0,
        c = [],
        u = [],
        s = function() {},
        l = function(e) {
          var t = e.name,
            n = e.args,
            o = void 0 === n ? {} : n,
            l = e.webviewIds,
            f = e.ext,
            d = void 0 === f ? {} : f;
          c[a] = {
            success: o.success || s,
            fail: o.fail || s,
            complete: o.complete || s
          }, u[a] = {
            beforeAll: d.beforeAll || s,
            beforeSuccess: d.beforeSuccess || s,
            afterSuccess: d.afterSuccess || s,
            beforeFail: d.beforeFail || s,
            afterFail: d.afterFail || s,
            afterAll: d.afterAll || s
          }, (0, r.publish)("invokeWebviewMethod", {
            name: t,
            args: o,
            callbackId: a
          }, void 0 === l ? [i.default.currentWebviewId] : l), a += 1
        };
      (0, r.subscribe)("callbackWebviewMethod", function(e) {
        var t = e.res,
          n = e.isSuccess,
          r = e.callbackId,
          o = c[r],
          i = u[r];
        i.beforeAll(t), n ? (i.beforeSuccess(t), o.success(t), i.afterSuccess(t)) : (i.beforeFail(t), o.fail(t), i.afterFail(t)), o.complete(t), i.afterAll(t)
      }), t.invokeWebviewMethod = l
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(167);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.triggerGettingWidgetData = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("triggerGettingWidgetData", e, {
            cacheKey: ""
          }) && (0, r.invokeMethod)("triggerGettingWidgetData", e, {})
        };
      t.triggerGettingWidgetData = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.reportKeyValue = t.reportIDKey = t.reportAnalytics = t.reportAction = void 0;
      var r = n(1),
        o = n(2);
      t.reportAction = function(e) {
        (0, r.invokeMethod)("reportAction", e)
      }, t.reportAnalytics = function(e, t) {
        var n = "function" == typeof getCurrentPages && getCurrentPages(),
          r = n && n.pop && n.pop(),
          i = {
            eventID: e,
            data: t || {},
            page: r && r.__route__,
            uid: Date.now().toString(16) + Math.random().toString(16).substr(2),
            type: 1,
            version: wx && wx.version && wx.version.version || 0
          };
        "devtools" !== (0, o.getPlatform)() && (console.info("[自定义分析] 上报成功"), console.info(i)), WeixinJSBridge.invoke("reportRealtimeAction", {
          actionData: JSON.stringify(i)
        })
      }, t.reportIDKey = function(e, t) {}, t.reportKeyValue = function(e, t) {}
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.addNativeDownloadTask = t.CDN = t.socket = t.uploadFile = t.downloadFile = t._requestSkipCheckDomain = t.request = void 0;
      var r = n(170);
      Object.defineProperty(t, "request", {
        enumerable: !0,
        get: function() {
          return r.request
        }
      }), Object.defineProperty(t, "_requestSkipCheckDomain", {
        enumerable: !0,
        get: function() {
          return r._requestSkipCheckDomain
        }
      });
      var o = n(173);
      Object.defineProperty(t, "downloadFile", {
        enumerable: !0,
        get: function() {
          return o.downloadFile
        }
      });
      var i = n(175);
      Object.defineProperty(t, "uploadFile", {
        enumerable: !0,
        get: function() {
          return i.uploadFile
        }
      });
      var a = n(177);
      Object.defineProperty(t, "socket", {
        enumerable: !0,
        get: function() {
          return a.socket
        }
      });
      var c = n(179);
      Object.defineProperty(t, "addNativeDownloadTask", {
        enumerable: !0,
        get: function() {
          return c.addNativeDownloadTask
        }
      });
      var u = n(180),
        s = function(e) {
          if (e && e.__esModule) return e;
          var t = {};
          if (null != e)
            for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
          return t.default = e, t
        }(u);
      t.CDN = s
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t._requestSkipCheckDomain = t.request = void 0;
      var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = n(1),
        i = n(2),
        a = n(171),
        c = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a),
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          return e = Object.assign({
              __skipDomainCheck__: !1
            }, e),
            function() {
              var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if ((0, o.beforeInvoke)("request", t, {
                  url: ""
                })) {
                if (!1 === (0, i.validateUrl)(t.url)) return void(0, o.beforeInvokeFail)("request", t, 'invalid url "' + t.url + '"');
                if ("function" === t.data) return void(0, o.beforeInvokeFail)("request", t, "data should not be Function");
                var n = (0, i.getDataType)(t.header);
                t.header = t.header || {}, t.header = (0, i.convertObjectValueToString)(t.header), "Undefined" !== n && "Object" !== n && (console.warn("wx.request: header must be an object"), t.header = {}), t.header = Object.keys(t.header).reduce(function(e, n) {
                  return "content-type" === n.toLowerCase() ? e[n.toLowerCase()] = t.header[n] : e[n] = t.header[n], e
                }, {}), t.method && (t.method = t.method.toUpperCase());
                var a = "text";
                t.responseType && (a = t.responseType.toLowerCase());
                var u = t.header || {},
                  s = "GET";
                "string" == typeof t.method && (s = t.method.toUpperCase());
                var l = void 0;
                t.dataType = t.dataType || "json", u["content-type"] = u["content-type"] || "application/json", l = void 0 === t.data ? "" : "string" == typeof t.data || t.data instanceof ArrayBuffer ? t.data : u["content-type"].indexOf("application/x-www-form-urlencoded") > -1 ? (0, i.urlEncodeFormData)(t.data, !0) : u["content-type"].indexOf("application/json") > -1 ? JSON.stringify(t.data) : "object" === r(t.data) ? JSON.stringify(t.data) : l.toString(), "GET" == s && (t.url = (0, i.addQueryStringToUrl)(t.url, t.data));
                try {
                  return new c.default(Object.assign({}, t, {
                    header: u,
                    method: s,
                    responseType: a,
                    data: l,
                    __skipDomainCheck__: e.__skipDomainCheck__
                  }))
                } catch (e) {
                  (0, o.beforeInvokeFail)("request", t, e.message)
                }
              }
            }
        },
        s = u(),
        l = u({
          __skipDomainCheck__: !0
        });
      t.request = s, t._requestSkipCheckDomain = l
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o() {
        var e = this,
          t = g.get(this);
        v.set(this, "sending"), _.set(this, Date.now());
        var n = void 0;
        (0, c.invokeMethod)("request", {
          data: t.data,
          url: t.url,
          header: t.header,
          method: t.method,
          responseType: t.responseType,
          success: t.success,
          fail: t.fail,
          complete: t.complete
        }, {
          beforeSuccess: function(t) {
            if ("json" === e.dataType) try {
              t.data = JSON.parse(t.data)
            } catch (e) {}
            t.statusCode = parseInt(t.statusCode)
          }
        })
      }

      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        c = n(1),
        u = n(8),
        s = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(u),
        l = n(172),
        f = 10,
        d = 0,
        p = new WeakMap,
        h = new WeakMap,
        v = (new WeakMap, new WeakMap),
        g = new WeakMap,
        _ = new WeakMap,
        y = 0,
        b = [],
        m = {},
        w = new s.default;
      __wxConfig.onReady(function() {
        try {
          "number" == typeof __wxConfig.wxAppInfo.maxRequestConcurrent && (f = __wxConfig.wxAppInfo.maxRequestConcurrent)
        } catch (e) {}
      }), (0, c.onMethod)("onRequestTaskStateChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.state,
          n = e.requestTaskId;
        delete e.state, delete e.requestTaskId, "success" !== t && "fail" !== t || (y -= 1, b.length > 0 && o.call(b.shift().item)), w.emit("" + n + t, e);
        var r = m[n];
        if (r) {
          var i = g.get(r).url,
            a = "success" === t ? 1 : 2,
            c = Date.now() - _.get(r),
            u = e.errMsg;
          (0, l.reportNetworkAPI)("request", i, a, c, u), delete m[n], w.removeAllListeners(n + "success"), w.removeAllListeners(n + "fail")
        }
      });
      var k = function() {
        function e(t) {
          r(this, e);
          var n = d++;
          if (p.set(this, n), v.set(this, "waiting"), ["success", "fail", "complete"].forEach(function(e) {
              "function" == typeof t[e] && (t[e] = Reporter.surroundThirdByTryCatch(t[e], "at api request " + e + " callback function"))
            }), g.set(this, t), y >= f) return void b.push({
            id: n,
            item: this
          });
          o.call(this)
        }
        return i(e, [{
          key: "abort",
          value: function() {
            var e = this;
            if ("waiting" == typeof v.get(this)) {
              var t = b.findIndex(function(t) {
                return t.id === p.get(e)
              });
              t > -1 && (b.splice(t, 1), y -= 1), v.set(this, "done")
            } else {
              (0, c.invokeMethod)("operateRequestTask", {
                requestTaskId: h.get(this),
                operationType: "abort"
              })
            }
          }
        }]), e
      }();
      t.default = k
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = function(e, t, n, r, o) {
        var i = [e, t, n, r, o, Reporter.getAppType()].map(encodeURIComponent).join(",");
        Reporter.reportKeyValue({
          key: "NetworkAPI",
          value: i
        }), Reporter.reportIDKey({
          key: e + "_" + (1 === n ? "ok" : "fail")
        })
      };
      t.reportNetworkAPI = n
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.downloadFile = void 0;
      var r = n(1),
        o = n(174),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = (n(2), function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("downloadFile", e, {
              url: ""
            })) {
            delete e.__skipDomainCheck__;
            try {
              return new i.default(e)
            } catch (t) {
              (0, r.beforeInvokeFail)("downloadFile", e, t.message)
            }
          }
        });
      t.downloadFile = a
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function o() {
        var e = this,
          t = v.get(this);
        h.set(this, "sending"), g.set(this, Date.now());
        var n = void 0;
        (0, a.invokeMethod)("createDownloadTask", {
          url: t.url,
          header: t.header,
          filePath: t.filePath,
          success: function(t) {
            p.set(e, t.downloadTaskId), _ += 1, b[t.downloadTaskId] = e
          },
          fail: function(r) {
            n = r.errMsg;
            var o = t.url,
              i = Date.now() - g.get(e);
            (0, s.reportNetworkAPI)("downloadFile", o, 2, i, n)
          },
          complete: function(e) {
            h.set(this, "done")
          }
        }), n ? setTimeout(function() {
          var e = {
            errMsg: n.replace("createDownloadTask", "downloadFile")
          };
          "function" == typeof t.fail && t.fail(e), "function" == typeof t.complete && t.complete(e)
        }, 0) : (m.on(p.get(this) + "success", function(e) {
          e.errMsg = "downloadFile:ok", e.statusCode = parseInt(e.statusCode), -1 === [200, 304].indexOf(e.statusCode) && delete e.tempPath, delete e.timeInterval, "function" == typeof t.success && t.success(e), "function" == typeof t.complete && t.complete(e)
        }), m.on(p.get(this) + "fail", function(e) {
          e.errMsg = "downloadFile:fail " + e.errMsg, "function" == typeof t.fail && t.fail(e), "function" == typeof t.complete && t.complete(e)
        }))
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        a = n(1),
        c = n(8),
        u = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(c),
        s = n(172),
        l = 10;
      try {
        "number" == typeof __wxConfig.wxAppInfo.maxDownloadConcurrent && (l = __wxConfig.wxAppInfo.maxDownloadConcurrent)
      } catch (e) {}
      var f = 0,
        d = new WeakMap,
        p = new WeakMap,
        h = (new WeakMap, new WeakMap),
        v = new WeakMap,
        g = new WeakMap,
        _ = 0,
        y = [],
        b = {},
        m = new u.default;
      (0, a.onMethod)("onDownloadTaskStateChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.state,
          n = e.downloadTaskId;
        if (delete e.state, delete e.downloadTaskId, m.emit("" + n + t, e), "success" === t || "fail" === t) {
          _ -= 1, y.length > 0 && o.call(y.shift().item);
          try {
            var r = b[n],
              i = v.get(r).url,
              a = "success" === t ? 1 : 2,
              c = Date.now() - g.get(r),
              u = e.errMsg;
            (0, s.reportNetworkAPI)("downloadFile", i, a, c, u)
          } catch (e) {}
          delete b[n], m.removeAllListeners(n + "success"), m.removeAllListeners(n + "fail"), m.removeAllListeners(n + "progressUpdate")
        }
      });
      var w = function() {
        function e(t) {
          r(this, e);
          var n = f++;
          if (d.set(this, n), h.set(this, "waiting"), ["success", "fail", "complete"].forEach(function(e) {
              "function" == typeof t[e] && (t[e] = Reporter.surroundThirdByTryCatch(t[e], "at api downloadFile " + e + " callback function"))
            }), v.set(this, t), _ >= l) return void y.push({
            id: n,
            item: this
          });
          o.call(this)
        }
        return i(e, [{
          key: "abort",
          value: function() {
            (0, a.invokeMethod)("operateDownloadTask", {
              downloadTaskId: p.get(this),
              operationType: "abort"
            })
          }
        }, {
          key: "onProgressUpdate",
          value: function(e) {
            m.on(p.get(this) + "progressUpdate", function(t) {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at DownloadTask.onProgressUpdate callback function")(t)
            })
          }
        }]), e
      }();
      t.default = w
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.uploadFile = void 0;
      var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = n(1),
        i = n(2),
        a = n(176),
        c = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a),
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, o.beforeInvoke)("uploadFile", e, {
              url: "",
              filePath: "",
              name: ""
            })) {
            "object" !== r(e.header) && void 0 !== e.header && (console.warn("uploadFile: header must be an object"), delete e.header), "object" !== r(e.formData) && void 0 !== e.formData && (console.warn("uploadFile: formData must be an object"), delete e.formData);
            var t = {},
              n = {};
            e.header && (t = (0, i.convertObjectValueToString)(e.header)), e.formData && (n = (0, i.convertObjectValueToString)(e.formData)), delete e.__skipDomainCheck__;
            try {
              return new c.default(Object.assign({}, e, {
                header: t,
                formData: n
              }))
            } catch (t) {
              (0, o.beforeInvokeFail)("uploadFile", e, t.message)
            }
          }
        };
      t.uploadFile = u
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(1),
        a = n(8),
        c = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a),
        u = n(172),
        s = new WeakMap,
        l = (new WeakMap, new WeakMap),
        f = new WeakMap,
        d = {},
        p = new c.default;
      (0, i.onMethod)("onUploadTaskStateChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.state,
          n = e.uploadTaskId;
        if (delete e.state, delete e.uploadTaskId, p.emit("" + n + t, e), "success" === t || "fail" === t) {
          try {
            var r = d[n],
              o = l.get(r).url,
              i = "success" === t ? 1 : 2,
              a = Date.now() - f.get(r),
              c = e.errMsg;
            (0, u.reportNetworkAPI)("uploadFile", o, i, a, c)
          } catch (e) {}
          delete d[n], p.removeAllListeners(n + "success"), p.removeAllListeners(n + "fail"), p.removeAllListeners(n + "progressUpdate")
        }
      });
      var h = function() {
        function e(t) {
          var n = this;
          r(this, e);
          var o = void 0;
          if (["success", "fail", "complete"].forEach(function(e) {
              "function" == typeof t[e] && (t[e] = Reporter.surroundThirdByTryCatch(t[e], "at api uploadFile " + e + " callback function"))
            }), l.set(this), f.set(this, Date.now()), (0, i.invokeMethod)("createUploadTask", {
              url: t.url,
              header: t.header,
              filePath: t.filePath,
              name: t.name,
              formData: t.formData,
              success: function(e) {
                s.set(n, e.uploadTaskId), d[e.uploadTaskId] = n
              },
              fail: function(e) {
                o = e.errMsg;
                var r = t.url,
                  i = Date.now() - f.get(n);
                (0, u.reportNetworkAPI)("uploadFile", r, 2, i, o)
              },
              complete: function(e) {}
            }), o) throw new Error(o);
          p.on(s.get(this) + "success", function(e) {
            e.errMsg = "uploadFile:ok", e.statusCode = parseInt(e.statusCode), -1 === [200, 304].indexOf(e.statusCode) && delete e.tempPath, "function" == typeof t.success && t.success(e), "function" == typeof t.complete && t.complete(e)
          }), p.on(s.get(this) + "fail", function(e) {
            e.errMsg = "uploadFile:fail " + e.errMsg, "function" == typeof t.fail && t.fail(e), "function" == typeof t.complete && t.complete(e)
          })
        }
        return o(e, [{
          key: "abort",
          value: function() {
            (0, i.invokeMethod)("operateUploadTask", {
              uploadTaskId: s.get(this),
              operationType: "abort"
            })
          }
        }, {
          key: "onProgressUpdate",
          value: function(e) {
            p.on(s.get(this) + "progressUpdate", function(t) {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at UploadTask.onProgressUpdate callback function")(t)
            })
          }
        }]), e
      }();
      t.default = h
    }, function(e, t, n) {
      function r(e) {
        return function(t) {
          (0, i.beforeInvoke)("onSocket" + e, t, i.noop) && (a.emitter.removeAllListeners("onSocket" + e), a.emitter.on("onSocket" + e, function(n, r) {
            wxConsole.log("wx.onSocket" + e + ".callback", n), wxConsole.log("socketTask === currentSocketTask: " + (r === u)), r === u && Reporter.surroundThirdByTryCatch(t, "at onSocket" + e + " callback function")(n)
          }))
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.socket = void 0;
      var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = n(1),
        a = n(178),
        c = n(2),
        u = null;
      t.socket = {
        connectSocket: function(e) {
          if (wxConsole.log("wx.connectSocket()", e), (0, i.beforeInvoke)("connectSocket", e, {
              url: ""
            })) {
            if (!1 === (0, c.validateUrl)(e.url, "websocket")) return void(0, i.beforeInvokeFail)("request", e, 'invalid url "' + e.url + '"');
            "object" !== o(e.header) && void 0 !== e.header && delete e.header;
            var t = {};
            e.header && (t = (0, c.convertObjectValueToString)(e.header)), delete e.__skipDomainCheck__;
            try {
              var n = new a.SocketTask(Object.assign({}, e, {
                header: t
              }));
              return wxConsole.log("wx.connectSocket.ret", n), wxConsole.log("currentSocketTask: ", u), u && u.readyState !== u.CLOSED || (wxConsole.warn("更新 currentSocketTask 指针"), u = n), n
            } catch (t) {
              wxConsole.error("wx.connectSocket.fail", t), (0, i.beforeInvokeFail)("connectSocket", e, t.message)
            }
          }
        },
        closeSocket: function(e) {
          wxConsole.log("wx.connectSocket()", e), u && u.readyState !== u.CLOSED ? (u.readyState = u.CLOSED, u.close(e)) : (0, i.beforeInvokeFail)("closeSocket", e, "WebSocket is not connected");
          for (key in a.socketTaskMap) {
            var t = a.socketTaskMap[key];
            t.readyState = t.CLOSED, t !== u && t.close()
          }
        },
        sendSocketMessage: function(e) {
          wxConsole.log("wx.sendSocketMessage()", e), u && u.readyState === u.OPEN ? u.send(e) : (0, i.beforeInvokeFail)("sendSocketMessage", e, "WebSocket is not connected")
        },
        onSocketOpen: r("Open"),
        onSocketClose: r("Close"),
        onSocketMessage: r("Message"),
        onSocketError: r("Error")
      }
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.socketTaskMap = t.emitter = t.SocketTask = void 0;
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(1),
        a = n(8),
        c = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a),
        u = (n(172), n(2)),
        s = 0,
        l = new WeakMap,
        f = new WeakMap,
        d = new WeakMap,
        p = (new WeakMap, {}),
        h = new c.default;
      (0, i.onMethod)("onSocketTaskStateChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.state,
          n = e.socketTaskId,
          r = p[n],
          o = l.get(r);
        if (delete e.state, delete e.socketTaskId, r) {
          "open" === t ? r.readyState = r.OPEN : "close" !== t && "error" !== t || (r.readyState = r.CLOSED), "message" !== t && wxConsole.warn("onSocketTaskStateChange", t, n);
          h.emit("" + o + t, e), h.emit("onSocket" + (t[0].toUpperCase() + t.substr(1)), e, r), "close" === t && (delete p[n], h.removeAllListeners(o + "open"), h.removeAllListeners(o + "close"), h.removeAllListeners(o + "error"), h.removeAllListeners(o + "message"))
        }
      });
      var v = function(e, t) {
          l.get(this);
          h.on("" + l.get(this) + e, Reporter.surroundThirdByTryCatch(t, "at socketTask.on" + e + " callback function"))
        },
        g = function() {
          function e(t) {
            var n = this;
            r(this, e), this.CONNECTING = 0, this.OPEN = 1, this.CLOSING = 2, this.CLOSED = 3, this.readyState = this.CONNECTING;
            var o = s++;
            l.set(this, o), d.set(this, t), ["success", "fail", "complete"].forEach(function(e) {
              "function" == typeof t[e] && (t[e] = Reporter.surroundThirdByTryCatch(t[e], "at api connectSocket " + e + " callback function"))
            });
            var a = void 0;
            (0, i.invokeMethod)("createSocketTask", t, {
              beforeAll: function(e) {
                e.errMsg = e.errMsg.replace("createSocketTask", "connectSocket")
              },
              beforeSuccess: function(e) {
                f.set(n, e.socketTaskId), p[e.socketTaskId] = n
              },
              beforeFail: function(e) {
                a = e.errMsg
              }
            }), a && (this.readyState = this.CLOSED, setTimeout(function() {
              h.emit(o + "error", {
                errMsg: a
              })
            }, 0))
          }
          return o(e, [{
            key: "send",
            value: function(e) {
              if (this.readyState === this.OPEN) {
                var t = Object.assign({}, e);
                "android" === (0, u.getPlatform)() && void 0 !== e.data && e.data instanceof ArrayBuffer && void 0 !== e.data.byteLength && e.data.byteLength > 0 && (t.__nativeBuffers__ = [{
                  key: "data",
                  base64: (0, u.arrayBufferToBase64)(e.data)
                }], delete t.data), (0, i.invokeMethod)("operateSocketTask", Object.assign({}, t, {
                  operationType: "send",
                  socketTaskId: f.get(this)
                }), {
                  beforeAll: function(e) {
                    e.errMsg = e.errMsg.replace("operateSocketTask", "sendSocketMessage")
                  }
                })
              } else(0, i.beforeInvokeFail)("SocketTask.send", e, "SocketTask.readState is not OPEN")
            }
          }, {
            key: "close",
            value: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              (0, i.invokeMethod)("operateSocketTask", Object.assign({}, e, {
                operationType: "close",
                code: 1e3,
                socketTaskId: f.get(this)
              }), {
                beforeAll: function(e) {
                  e.errMsg = e.errMsg.replace("operateSocketTask", "closeSocket")
                }
              })
            }
          }, {
            key: "onOpen",
            value: function(e) {
              v.call(this, "open", e)
            }
          }, {
            key: "onClose",
            value: function(e) {
              v.call(this, "close", e)
            }
          }, {
            key: "onMessage",
            value: function(e) {
              v.call(this, "message", e)
            }
          }, {
            key: "onError",
            value: function(e) {
              v.call(this, "error", e)
            }
          }]), e
        }();
      t.SocketTask = g, t.emitter = h, t.socketTaskMap = p
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.addNativeDownloadTask = void 0;
      var r = n(1),
        o = n(2);
      t.addNativeDownloadTask = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        if ("ios" === (0, o.getPlatform)()) return void(0, r.beforeInvokeFail)("addNativeDownloadTask", e, "iOS not supported");
        (0, r.invokeMethod)("addNativeDownloadTask", e, {})
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(181);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(182);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.uploadEncryptedFileToCDN = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("uploadEncryptedFileToCDN", e, {})
        };
      t.uploadEncryptedFileToCDN = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onUploadEncryptedFileToCDNProgress = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.onMethod)("onUploadEncryptedFileToCDNProgress", e)
        };
      t.onUploadEncryptedFileToCDNProgress = o
    }, function(e, t, n) {
      function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setResPath = t.getResPath = t.downloadSilkVoice = t.uploadSilkVoice = t.voiceSplitJoint = t.video = t.image = void 0;
      var o = n(184);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(190);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      });
      var a = n(191);
      Object.defineProperty(t, "voiceSplitJoint", {
        enumerable: !0,
        get: function() {
          return a.voiceSplitJoint
        }
      });
      var c = n(192);
      Object.defineProperty(t, "uploadSilkVoice", {
        enumerable: !0,
        get: function() {
          return c.uploadSilkVoice
        }
      });
      var u = n(193);
      Object.defineProperty(t, "downloadSilkVoice", {
        enumerable: !0,
        get: function() {
          return u.downloadSilkVoice
        }
      });
      var s = n(194);
      Object.defineProperty(t, "getResPath", {
        enumerable: !0,
        get: function() {
          return s.getResPath
        }
      });
      var l = n(195);
      Object.defineProperty(t, "setResPath", {
        enumerable: !0,
        get: function() {
          return l.setResPath
        }
      });
      var f = n(196),
        d = r(f),
        p = n(198),
        h = r(p);
      t.image = d, t.video = h
    }, function(e, t, n) {
      function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.backgroundAudio = t.record = t.voice = void 0;
      var o = n(185),
        i = r(o),
        a = n(186),
        c = r(a),
        u = n(187),
        s = n(188),
        l = r(s),
        f = n(189);
      c.getRecorderManager = f.getRecorderManager, l.getBackgroundAudioManager = u.getBackgroundAudioManager, t.voice = i, t.record = c, t.backgroundAudio = l
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onVoicePlayEnd = t.stopVoice = t.pauseVoice = t.playVoice = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.beforeInvoke)("playVoice", e, {
            filePath: ""
          }) && (0, r.invokeMethod)("playVoice", e)
        },
        i = function(e) {
          (0, r.invokeMethod)("pauseVoice", e)
        },
        a = function(e) {
          (0, r.invokeMethod)("stopVoice", e)
        },
        c = function(e) {
          (0, r.onMethod)("onVoicePlayEnd", Reporter.surroundThirdByTryCatch(e, "at onVoicePlayEnd callback function"))
        };
      t.playVoice = o, t.pauseVoice = i, t.stopVoice = a, t.onVoicePlayEnd = c
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.stopRecord = t.startRecord = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.invokeMethod)("startRecord", e)
        },
        i = function(e) {
          (0, r.invokeMethod)("stopRecord", e)
        };
      t.startRecord = o, t.stopRecord = i
    }, function(e, t, n) {
      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function o(e) {
        "active" !== p.default.runningStatus || (0, u.invokeMethod)("operateBackgroundAudio", e)
      }

      function i(e, t) {
        if (!1 !== p.default.possessingBackgroundAudioPlayer) {
          var n = g[e];
          return (0, u.invokeMethod)("getBackgroundAudioState", {
            success: function(r) {
              g = (0, f.assign)(g, r), n = g[e], "function" == typeof t && t(n)
            },
            fail: function(e) {
              e.errMsg
            },
            complete: function(e) {}
          }), n
        }
      }

      function a(e, t) {
        if ("src" === e && !t) throw new Error("invalid wx.backgroundAudio.src: " + t);
        if ("active" !== p.default.runningStatus && !1 === p.default.possessingBackgroundAudioPlayer) throw new f.AppServiceSdkKnownError("Can not set wx.backgroundAudio." + e + ", background audio is preempted.");
        y[e] = t, 1 === Object.keys(y).length && setTimeout(function() {
          var e = (0, f.assign)({}, y);
          (0, u.invokeMethod)("setBackgroundAudioState", (0, f.assign)({}, y, {
            success: function() {
              g = (0, f.assign)({}, g, e)
            },
            fail: function(e) {
              var t = e.errMsg;
              throw new Error(t.replace(/^setBackgroundAudioState: fail /, ""))
            },
            complete: function(e) {}
          })), y = {}
        }, 0)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getBackgroundAudioManager = void 0;
      var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        u = n(1),
        s = n(8),
        l = r(s),
        f = n(2),
        d = n(3),
        p = r(d),
        h = new l.default;
      (0, u.onMethod)("onBackgroundAudioNext", function() {
        h.emit("onBackgroundAudioNext")
      }), (0, u.onMethod)("onBackgroundAudioPrev", function() {
        h.emit("onBackgroundAudioPrev")
      }), (0, u.onMethod)("onBackgroundAudioStateChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.state;
        delete e.state, "play" === t ? p.default.possessingBackgroundAudioPlayer = !0 : "preempted" !== t && "occupied" !== t || (p.default.possessingBackgroundAudioPlayer = !1, h.emit("onBackgroundAudioStateChange_stop", e)), h.emit("onBackgroundAudioStateChange_" + t, e)
      });
      var v = void 0,
        g = {
          src: "",
          currentTime: 0,
          duration: 0,
          paused: !0,
          buffered: 0,
          title: "",
          coverImgUrl: "",
          description: "",
          startTime: 0
        },
        _ = {
          play: function() {
            o({
              operationType: "play"
            })
          },
          pause: function() {
            o({
              operationType: "pause"
            })
          },
          seek: function(e) {
            if ("number" != typeof e) throw new Error("wx.backgroundAudio.seek(currentTime): unexpected type " + (void 0 === e ? "undefined" : c(e)));
            o({
              currentTime: e,
              operationType: "seek"
            })
          },
          stop: function() {
            o({
              operationType: "stop"
            })
          },
          onCanplay: function(e) {
            h.removeAllListeners("onBackgroundAudioStateChange_canplay"), h.on("onBackgroundAudioStateChange_canplay", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onCanplay callback function")()
            })
          },
          onWaiting: function(e) {
            h.removeAllListeners("onBackgroundAudioStateChange_waiting"), h.on("onBackgroundAudioStateChange_waiting", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onWaiting callback function")()
            })
          },
          onError: function(e) {
            h.removeAllListeners("onBackgroundAudioStateChange_error"), h.on("onBackgroundAudioStateChange_error", function(t) {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onError callback function")(t)
            })
          },
          onPlay: function(e) {
            h.removeAllListeners("onBackgroundAudioStateChange_play"), h.on("onBackgroundAudioStateChange_play", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onPlay callback function")()
            })
          },
          onPause: function(e) {
            h.removeAllListeners("onBackgroundAudioStateChange_pause"), h.on("onBackgroundAudioStateChange_pause", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onPause callback function")()
            })
          },
          onEnded: function(e) {
            h.removeAllListeners("onBackgroundAudioStateChange_ended"), h.on("onBackgroundAudioStateChange_ended", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onEnded callback function")()
            })
          },
          onStop: function(e) {
            h.removeAllListeners("onBackgroundAudioStateChange_stop"), h.on("onBackgroundAudioStateChange_stop", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onStop callback function")()
            })
          },
          onTimeUpdate: function(e) {
            var t = this;
            void 0 === v && (v = setInterval(function() {
              if ("active" === p.default.runningStatus && !1 !== p.default.possessingBackgroundAudioPlayer) {
                var e = g.currentTime;
                i("currentTime", function(n) {
                  t.currentTime !== e && h.emit("onBackgroundAudioStateChange_timeupdate")
                })
              }
            }, 250)), h.removeAllListeners("onBackgroundAudioStateChange_timeupdate"), h.on("onBackgroundAudioStateChange_timeupdate", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onTimeUpdate callback function")()
            })
          },
          onNext: function(e) {
            h.removeAllListeners("onBackgroundAudioNext"), h.on("onBackgroundAudioNext", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onNext callback function")()
            })
          },
          onPrev: function(e) {
            h.removeAllListeners("onBackgroundAudioPrev"), h.on("onBackgroundAudioPrev", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.backgroundAudio.onPrev callback function")()
            })
          }
        };
      ["src", "title", "epname", "singer", "startTime", "coverImgUrl", "currentTime", "duration", "paused", "buffered", "webUrl"].forEach(function(e) {
        Object.defineProperty(_, e, {
          get: function() {
            return i(e)
          },
          set: function(t) {
            ["src", "title", "epname", "singer", "coverImgUrl", "startTime", "webUrl"].indexOf(e) > -1 && a(e, t)
          }
        })
      });
      var y = {},
        b = function() {
          return _
        };
      t.getBackgroundAudioManager = b
    }, function(e, t, n) {
      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.onBackgroundAudioStop = t.onBackgroundAudioPause = t.onBackgroundAudioPlay = t.stopBackgroundAudio = t.seekBackgroundAudio = t.pauseBackgroundAudio = t.playBackgroundAudio = t.getBackgroundAudioPlayerState = void 0;
      var o = n(1),
        i = n(2),
        a = n(8),
        c = r(a),
        u = n(3),
        s = r(u),
        l = (n(4), function(e) {
          if (!1 === s.default.possessingBackgroundAudioPlayer) {
            var t = {
              errMsg: "getBackgroundAudioPlayerState: fail not playing"
            };
            "function" == typeof e.fail && e.fail(t), "function" == typeof e.complete && e.complete(t)
          } else(0, o.invokeMethod)("getMusicPlayerState", e, {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("getMusicPlayerState", "getBackgroundAudioPlayerState")
            }
          })
        }),
        f = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, o.invokeMethod)("operateMusicPlayer", (0, i.assign)({
            operationType: "play"
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateMusicPlayer", "playBackgroundAudio")
            }
          })
        },
        d = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, o.invokeMethod)("operateMusicPlayer", (0, i.assign)({
            operationType: "pause"
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateMusicPlayer", "pauseBackgroundAudio")
            }
          })
        },
        p = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, o.beforeInvoke)("seekBackgroundAudio", e, {
            position: 1
          }) && (0, o.invokeMethod)("operateMusicPlayer", (0, i.assign)({
            operationType: "seek"
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateMusicPlayer", "seekBackgroundAudio")
            }
          })
        },
        h = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, o.invokeMethod)("operateMusicPlayer", (0, i.assign)({
            operationType: "stop"
          }, e), {
            beforeAll: function(e) {
              e.errMsg = e.errMsg.replace("operateMusicPlayer", "stopBackgroundAudio")
            }
          })
        },
        v = new c.default;
      (0, o.onMethod)("onMusicPlay", function() {
        s.default.possessingBackgroundAudioPlayer = !0, v.emit("onBackgroundAudioPlay")
      });
      var g = function(e) {
          v.removeAllListeners("onBackgroundAudioPlay"), v.on("onBackgroundAudioPlay", function() {
            "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at wx.onBackgroundAudioPlay callback function")()
          })
        },
        _ = function(e) {
          (0, o.onMethod)("onMusicPause", Reporter.surroundThirdByTryCatch(e, "at onBackgroundAudioPause callback function"))
        },
        y = function(e) {
          (0, o.onMethod)("onMusicEnd", Reporter.surroundThirdByTryCatch(e, "at onBackgroundAudioStop callback function"))
        };
      t.getBackgroundAudioPlayerState = l, t.playBackgroundAudio = f, t.pauseBackgroundAudio = d, t.seekBackgroundAudio = p, t.stopBackgroundAudio = h, t.onBackgroundAudioPlay = g, t.onBackgroundAudioPause = _, t.onBackgroundAudioStop = y
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getRecorderManager = void 0;
      var r = n(1),
        o = n(8),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = new i.default,
        c = {
          8e3: [16e3, 48e3],
          11025: [16e3, 48e3],
          12e3: [24e3, 64e3],
          16e3: [24e3, 96e3],
          22050: [32e3, 128e3],
          24e3: [32e3, 128e3],
          32e3: [48e3, 192e3],
          44100: [64e3, 32e4],
          48e3: [64e3, 32e4]
        };
      (0, r.onMethod)("onRecorderStateChange", function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = e.state;
        delete e.state, a.emit("onRecorderStateChange_" + t, e)
      });
      var u = function(e) {
          (0, r.invokeMethod)("operateRecorder", Object.assign({}, e))
        },
        s = {
          start: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              t = Object.assign({
                format: "aac",
                sampleRate: 8e3,
                encodeBitRate: 48e3,
                numberOfChannels: 2
              }, e);
            if (-1 === Object.keys(c).map(function(e) {
                return parseInt(e)
              }).indexOf(t.sampleRate)) throw new Error('invalid sampleRate "' + t.sampleRate + '", sampleRate should be one of ' + JSON.stringify(Object.keys(c)));
            if (t.encodeBitRate > c[t.sampleRate][1] || t.encodeBitRate < c[t.sampleRate][0]) throw new Error('invalid encodeBitRate "' + t.encodeBitRate + '", encodeBitRate should be greater than ' + c[t.sampleRate][0] + " and less than " + c[t.sampleRate][1]);
            t.operationType = "start", t.fail = function(e) {
              a.emit("onRecorderStateChange_error", e)
            }, u(t)
          },
          pause: function() {
            u({
              operationType: "pause",
              fail: function(e) {
                a.emit("onRecorderStateChange_error", e)
              }
            })
          },
          resume: function() {
            u({
              operationType: "resume",
              success: function() {
                a.emit("onRecorderStateChange_resume")
              },
              fail: function(e) {
                a.emit("onRecorderStateChange_error", e)
              }
            })
          },
          stop: function() {
            u({
              operationType: "stop",
              fail: function(e) {
                a.emit("onRecorderStateChange_error", e)
              }
            })
          },
          onStart: function(e) {
            a.removeAllListeners("onRecorderStateChange_start"), a.on("onRecorderStateChange_start", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onPause callback function")()
            })
          },
          onResume: function(e) {
            a.removeAllListeners("onRecorderStateChange_resume"), a.on("onRecorderStateChange_resume", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onResume callback function")()
            })
          },
          onPause: function(e) {
            a.removeAllListeners("onRecorderStateChange_pause"), a.on("onRecorderStateChange_pause", function() {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onPause callback function")()
            })
          },
          onStop: function(e) {
            a.removeAllListeners("onRecorderStateChange_stop"), a.on("onRecorderStateChange_stop", function(t) {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onStop callback function")(t)
            })
          },
          onFrameRecorded: function(e) {
            a.removeAllListeners("onRecorderStateChange_frameRecorded"), a.on("onRecorderStateChange_frameRecorded", function(t) {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onFrameRecorded callback function")(t)
            })
          },
          onError: function(e) {
            a.removeAllListeners("onRecorderStateChange_error"), a.on("onRecorderStateChange_error", function(t) {
              "function" == typeof e && Reporter.surroundThirdByTryCatch(e, "at recorderManager.onError callback function")(t)
            })
          }
        };
      t.default = s;
      t.getRecorderManager = function() {
        return s
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.chooseMedia = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("chooseMedia", e)
        };
      t.chooseMedia = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.voiceSplitJoint = void 0;
      var r = n(1);
      t.voiceSplitJoint = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        wxConsole.log("args", e), (0, r.invokeMethod)("voiceSplitJoint", e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.uploadSilkVoice = void 0;
      var r = n(1);
      t.uploadSilkVoice = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        wxConsole.log("uploadSilkVoice", e), (0, r.invokeMethod)("uploadSilkVoice", e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.downloadSilkVoice = void 0;
      var r = n(1);
      t.downloadSilkVoice = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        wxConsole.log("downloadSilkVoice", e), (0, r.invokeMethod)("downloadSilkVoice", e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getResPath = void 0;
      var r = n(1);
      t.getResPath = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        wxConsole.log("getResPath", e), (0, r.invokeMethod)("getResPath", e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setResPath = void 0;
      var r = n(1);
      t.setResPath = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        wxConsole.log("setResPath", e), (0, r.invokeMethod)("setResPath", e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.saveImageToPhotosAlbum = t.getImageInfo = t.previewImage = t.chooseImage = void 0;
      var r = n(1),
        o = n(2),
        i = n(3),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = n(173),
        u = n(197),
        s = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("chooseImage", (0, o.assign)({
            count: 9,
            sizeType: ["original", "compressed"],
            sourceType: ["album", "camera"]
          }, e), {
            beforeSuccess: function(e) {
              e.tempFileSizes && (e.tempFiles = e.tempFilePaths.map(function(t, n) {
                return {
                  path: t,
                  size: e.tempFileSizes[n]
                }
              })), delete e.tempFileSizes
            }
          })
        },
        l = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("previewImage", e, {
            urls: [""]
          }) && (e.urls && (e.urls = e.urls.map(function(e) {
            return u.FakeTempFilePathMap.get(e) || e
          })), (0, r.invokeMethod)("previewImage", e))
        },
        f = function(e) {
          (0, r.beforeInvoke)("getImageInfo", e, {
            src: ""
          }) && (/^(http|https):\/\//.test(e.src) ? (0, c.downloadFile)({
            url: e.src,
            success: function(t) {
              e.src = t.tempFilePath, (0, r.invokeMethod)("getImageInfo", e, {
                beforeSuccess: function(t) {
                  t.path = e.src
                }
              })
            },
            fail: function(t) {
              (0, r.beforeInvokeFail)("getImageInfo", e, "download image fail")
            }
          }) : /^wxfile:\/\//.test(e.src) ? (0, r.invokeMethod)("getImageInfo", e, {
            beforeSuccess: function(t) {
              t.path = e.src
            }
          }) : (e.src = (0, o.getRealRoute)(a.default.lastRoute, e.src, !1), (0, r.invokeMethod)("getImageInfo", e, {
            beforeSuccess: function(t) {
              t.path = e.src
            }
          })))
        },
        d = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          e.filePath = u.FakeTempFilePathMap.get(e.filePath) || e.filePath, (0, r.invokeMethod)("saveImageToPhotosAlbum", e, {})
        };
      t.chooseImage = s, t.previewImage = l, t.getImageInfo = f, t.saveImageToPhotosAlbum = d
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.FakeTempFilePathMap = t.GlobalEmitter = void 0;
      var r = n(8),
        o = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(r),
        i = n(2),
        a = new o.default,
        c = {
          map: {},
          set: function(e) {
            var t = (0, i.guid)();
            return this.map[t] = e, t
          },
          get: function(e) {
            return this.map[e]
          }
        };
      t.GlobalEmitter = a, t.FakeTempFilePathMap = c
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.saveVideoToPhotosAlbum = t.chooseVideo = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          e.sourceType = e.sourceType || ["album", "camera"], e.camera = e.camera || ["front", "back"], "boolean" != typeof e.compressed && (e.compressed = !0), (0, r.invokeMethod)("chooseVideo", e)
        },
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("saveVideoToPhotosAlbum", e, {})
        };
      t.chooseVideo = o, t.saveVideoToPhotosAlbum = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(200);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(201);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(202);
      Object.defineProperty(t, "readFile", {
        enumerable: !0,
        get: function() {
          return i.readFile
        }
      });
      var a = n(203);
      Object.defineProperty(t, "writeFile", {
        enumerable: !0,
        get: function() {
          return a.writeFile
        }
      });
      var c = n(204);
      Object.defineProperty(t, "mkdir", {
        enumerable: !0,
        get: function() {
          return c.mkdir
        }
      });
      var u = n(205);
      Object.defineProperty(t, "rmdir", {
        enumerable: !0,
        get: function() {
          return u.rmdir
        }
      });
      var s = n(206);
      Object.defineProperty(t, "readdir", {
        enumerable: !0,
        get: function() {
          return s.readdir
        }
      });
      var l = n(207);
      Object.defineProperty(t, "access", {
        enumerable: !0,
        get: function() {
          return l.access
        }
      });
      var f = n(208);
      Object.defineProperty(t, "unlink", {
        enumerable: !0,
        get: function() {
          return f.unlink
        }
      });
      var d = n(209);
      Object.defineProperty(t, "stat", {
        enumerable: !0,
        get: function() {
          return d.stat
        }
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openDocument = t.removeSavedFile = t.getSavedFileInfo = t.getSavedFileList = t.saveFileSync = t.saveFile = void 0;
      var r = n(1),
        o = function(e) {
          (0, r.beforeInvoke)("saveFile", e, {
            tempFilePath: ""
          }) && (0, r.invokeMethod)("saveFile", e)
        },
        i = function(e, t) {
          if (!e || "string" != typeof e) throw new Error("tempFilePath must be a string");
          if (void 0 !== t && "string" != typeof t) throw new Error("filePath must be a string");
          var n = void 0,
            o = void 0;
          if ((0, r.invokeMethod)("saveFileSync", {
              tempFilePath: e,
              filePath: t,
              success: function(e) {
                o = e.savedFilePath
              },
              fail: function(e) {
                n = e.errMsg
              }
            }), n) throw new Error(n);
          return o
        },
        a = function(e) {
          (0, r.beforeInvoke)("openDocument", e, {
            filePath: ""
          }) && (0, r.invokeMethod)("openDocument", e)
        },
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("getSavedFileList", e)
        },
        u = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("getSavedFileInfo", e, {
            filePath: ""
          }) && (0, r.invokeMethod)("getSavedFileInfo", e)
        },
        s = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("removeSavedFile", e, {
            filePath: ""
          }) && (0, r.invokeMethod)("removeSavedFile", e)
        };
      t.saveFile = o, t.saveFileSync = i, t.getSavedFileList = c, t.getSavedFileInfo = u, t.removeSavedFile = s, t.openDocument = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getFileInfo = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("getFileInfo", e, {
              filePath: ""
            })) {
            if (void 0 !== e.digestAlgorithm) {
              var t = (0, o.paramCheck)(e, {
                digestAlgorithm: ""
              });
              if (t) return void(0, r.beforeInvokeFail)("getFileInfo", e, "parameter error: " + t);
              if (-1 === ["md5", "sha1"].indexOf(e.digestAlgorithm)) return void(0, r.beforeInvokeFail)("getFileInfo", e, 'parameter error: invalid digestAlgorithm "' + e.digestAlgorithm + '"')
            }(0, r.invokeMethod)("getFileInfo", e, {})
          }
        };
      t.getFileInfo = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.readFileSync = t.readFile = void 0;
      var r = n(1),
        o = (n(2), function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("readFile", e, {
            filePath: ""
          }) && (0, r.invokeMethod)("readFile", e)
        }),
        i = function(e, t) {
          if (!e || "string" != typeof e) throw new Error("filePath must be a string");
          if (t && "string" != typeof t) throw new Error("encoding must be a string");
          var n = void 0,
            o = void 0;
          if ((0, r.invokeMethod)("readFileSync", {
              filePath: e,
              encoding: t,
              success: function(e) {
                n = e.data
              },
              fail: function(e) {
                o = e.errMsg
              }
            }), o) throw new Error(o);
          return n
        };
      t.readFile = o, t.readFileSync = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.writeFileSync = t.writeFile = void 0;
      var r = n(1),
        o = ["ascii", "base64", "binary", "hex", "ucs2", "ucs-2", "utf16le", "utf-16le", "utf8", "utf-8", "latin1"],
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if ((0, r.beforeInvoke)("writeFile", e, {
              filePath: ""
            })) return e.encoding && -1 === o.indexOf(e.encoding) ? void(0, r.beforeInvokeFail)("writeFile", e, 'invalid encoding "' + e.encoding + '"') : void(0, r.invokeMethod)("writeFile", e, {})
        },
        a = function(e, t, n) {
          if (!e || "string" != typeof e) throw new Error("path must be a string");
          if (n && -1 === o.indexOf(n)) throw new Error('invalid encoding "' + n + '"');
          var i = void 0;
          if ((0, r.invokeMethod)("writeFileSync", {
              filePath: e,
              data: t,
              encoding: n,
              fail: function(e) {
                i = e.errMsg
              }
            }), i) throw new Error(i)
        };
      t.writeFile = i, t.writeFileSync = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.mkdirSync = t.mkdir = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("mkdir", e, {
            dirPath: ""
          }) && (0, r.invokeMethod)("mkdir", e)
        },
        i = function(e) {
          if (!e || "string" != typeof e) throw new TypeError("dirPath must be a string");
          var t = void 0;
          if ((0, r.invokeMethod)("mkdirSync", {
              dirPath: e,
              fail: function(e) {
                t = e.errMsg
              }
            }), t) throw new Error(t)
        };
      t.mkdir = o, t.mkdirSync = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.rmdirSync = t.rmdir = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("rmdir", e, {
            dirPath: ""
          }) && (0, r.invokeMethod)("rmdir", e)
        },
        i = function(e) {
          if (!e || "string" != typeof e) throw new Error("dirPat must be a string");
          var t = void 0;
          if ((0, r.invokeMethod)("rmdirSync", {
              dirPath: e,
              fail: function(e) {
                t = e.errMsg
              }
            }),
            t) throw new Error(t)
        };
      t.rmdir = o, t.rmdirSync = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.readdirSync = t.readdir = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("readdir", e, {
            dirPath: ""
          }) && (0, r.invokeMethod)("readdir", e)
        },
        i = function(e) {
          if (!e || "string" != typeof e) throw new TypeError("dirPath must be a string");
          var t = void 0,
            n = void 0;
          if ((0, r.invokeMethod)("readdirSync", {
              dirPath: e,
              success: function(e) {
                t = e.files
              },
              fail: function(e) {
                n = e.errMsg
              }
            }), n) throw new Error(n);
          return t
        };
      t.readdir = o, t.readdirSync = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.accessSync = t.access = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("access", e, {
            path: ""
          }) && (0, r.invokeMethod)("access", e)
        },
        i = function(e) {
          if (!e || "string" != typeof e) throw new TypeError("path must be a string");
          var t = void 0;
          if ((0, r.invokeMethod)("accessSync", {
              path: e,
              fail: function(e) {
                t = e.errMsg
              }
            }), t) throw new Error(t)
        };
      t.access = o, t.accessSync = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.unlinkSync = t.unlink = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("unlink", e, {
            filePath: ""
          }) && (0, r.invokeMethod)("unlink", e)
        },
        i = function(e) {
          if (!e || "string" != typeof e) throw new Error("filePath must be a string");
          var t = void 0;
          if ((0, r.invokeMethod)("unlink", {
              filePath: e,
              fail: function(e) {
                t = e.errMsg
              }
            }), t) throw new Error(t)
        };
      t.unlink = o, t.unlinkSync = i
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.statSync = t.stat = void 0;
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(1),
        a = function() {
          function e(t) {
            var n = t.mode,
              o = t.size,
              i = t.lastAccessedTime,
              a = t.lastModifiedTime;
            r(this, e), this.mode = n, this.size = o, this.lastAccessedTime = i, this.lastModifiedTime = a
          }
          return o(e, [{
            key: "_checkModeProperty",
            value: function(e) {
              return (61440 & this.mode) === e
            }
          }, {
            key: "isDirectory",
            value: function() {
              return this._checkModeProperty(16384)
            }
          }, {
            key: "isFile",
            value: function() {
              return this._checkModeProperty(32768)
            }
          }]), e
        }(),
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, i.beforeInvoke)("stat", e, {
            path: ""
          }) && (0, i.invokeMethod)("stat", e, {
            beforeSuccess: function(e) {
              e.stats = new a(e), delete e.mode, delete e.size, delete e.lastAccessedTime, delete e.lastModifiedTime
            }
          })
        },
        u = function(e) {
          if (!e || "string" != typeof e) throw new Error("path must be a string");
          var t = void 0,
            n = void 0;
          if ((0, i.invokeMethod)("statSync", {
              path: e,
              success: function(e) {
                t = new a(e)
              },
              fail: function(e) {
                n = e.errMsg
              }
            }), n) throw new Error(n);
          return t
        };
      t.stat = c, t.statSync = u
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(211);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.clearStorageSync = t.clearStorage = t.removeStorageSync = t.removeStorage = t.getStorageInfoSync = t.getStorageInfo = t.getStorageSync = t.getStorage = t.setStorageSync = t.setStorage = void 0;
      var r = n(1),
        o = n(2),
        i = function(e) {
          (0, r.beforeInvoke)("getStorage", e, {
            key: ""
          }) && (0, r.invokeMethod)("getStorage", e, {
            beforeSuccess: function(e) {
              e.data = (0, o.stringToAnyType)(e.data, e.dataType), delete e.dataType
            },
            afterFail: function() {
              var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
              if (e.errMsg && e.errMsg.indexOf("data not found") > 0) return !1
            }
          })
        },
        a = function(e) {
          if ((0, r.beforeInvoke)("getStorageSync", e, "")) {
            var t = "ios" === (0, o.getPlatform)() ? "getStorage" : "getStorageSync",
              n = void 0;
            return (0, r.invokeMethod)(t, {
              key: e
            }, {
              beforeAll: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                n = (0, o.stringToAnyType)(e.data, e.dataType)
              },
              afterFail: function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (e.errMsg && e.errMsg.indexOf("data not found") > 0) return !1
              }
            }), n
          }
        },
        c = function(e) {
          if ((0, r.beforeInvoke)("setStorage", e, {
              key: ""
            })) try {
            var t = (0, o.anyTypeToString)(e.data),
              n = t.data,
              i = t.dataType;
            (0, r.invokeMethod)("setStorage", {
              key: e.key,
              data: n,
              dataType: i,
              success: e.success,
              fail: e.fail,
              complete: e.complete
            })
          } catch (t) {
            "function" == typeof e.fail && e.fail({
              errMsg: "setStorage:fail " + t.message
            }), "function" == typeof e.complete && e.complete({
              errMsg: "setStorage:fail " + t.message
            })
          }
        },
        u = function(e) {
          var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
          if ((0, r.beforeInvoke)("setStorage", e, "")) {
            var n = "ios" === (0, o.getPlatform)() ? "setStorage" : "setStorageSync",
              i = (0, o.anyTypeToString)(t),
              a = i.data,
              c = i.dataType,
              u = !1,
              s = "";
            if ((0, r.invokeMethod)(n, {
                key: e,
                data: a,
                dataType: c,
                fail: function() {
                  var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                  u = !0, s = e.errMsg.replace("setStorage:", "setStorageSync:")
                }
              }), u) throw new o.AppServiceSdkKnownError(s)
          }
        },
        s = function(e) {
          (0, r.beforeInvoke)("removeStorage", e, {
            key: ""
          }) && (0, r.invokeMethod)("removeStorage", e)
        },
        l = function(e) {
          (0, r.beforeInvoke)("removeStorageSync", e, "") && (0, r.invokeMethod)("removeStorageSync", {
            key: e
          })
        },
        f = function(e) {
          (0, r.invokeMethod)("clearStorage", e)
        },
        d = function() {
          var e = "ios" === (0, o.getPlatform)() ? "clearStorage" : "clearStorageSync";
          (0, r.invokeMethod)(e)
        },
        p = function(e) {
          (0, r.invokeMethod)("getStorageInfo", e)
        },
        h = function() {
          var e = void 0;
          return (0, r.invokeMethod)("getStorageInfoSync", {}, {
            beforeAll: function(t) {
              e = t, delete t.errMsg
            }
          }), e
        };
      t.setStorage = c, t.setStorageSync = u, t.getStorage = i, t.getStorageSync = a, t.getStorageInfo = p, t.getStorageInfoSync = h, t.removeStorage = s, t.removeStorageSync = l, t.clearStorage = f, t.clearStorageSync = d
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(213);
      Object.defineProperty(t, "canIUse", {
        enumerable: !0,
        get: function() {
          return r.canIUse
        }
      })
    }, function(e, t, n) {
      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function o(e) {
        if (Array.isArray(e)) {
          for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
          return n
        }
        return Array.from(e)
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.canIUse = void 0;
      var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        a = n(214),
        c = r(a),
        u = n(215),
        s = r(u),
        l = n(2),
        f = n(97),
        d = r(f),
        p = (Object.keys(c.default), Object.keys(s.default), function(e, t, n) {
          if (!t) return [];
          var r = Object.keys(n),
            o = r.indexOf(t);
          if (-1 === o) return [];
          var i = n[r[o]];
          return Object.keys(i).filter(function(t) {
            return (0, l.compareVersion)(t, e) <= 0
          })
        }),
        h = function(e, t, n) {
          for (var r = void 0, o = 0; o < e.length; o++)
            for (var a = t[e[o]], c = 0; c < a.length; c++) {
              var u = a[c];
              if ("string" == typeof u && u === n) {
                void 0 === r && (r = []);
                break
              }
              if ("object" === (void 0 === u ? "undefined" : i(u)) && u.hasOwnProperty(n)) {
                r = void 0 === r ? u[n] : r.concat(u[n]);
                break
              }
            }
          return r
        },
        v = function(e, t) {
          for (var n = 0; n < e.length; n++) {
            if ("string" == typeof e[n] && e[n] === t) return [];
            if ("object" === i(e[n]) && e[n].hasOwnProperty(t)) return e[n][t]
          }
        },
        g = function(e, t, n) {
          return h(e, t, n)
        },
        _ = function(e, t, n) {
          return h(e, t, n)
        },
        y = function(e, t, n, r) {
          var o = void 0,
            i = void 0;
          if (o = p(e, t, c.default), 0 === o.length) return !1;
          if (n) {
            var a = c.default[t];
            if (void 0 === (i = g(o, a, n))) return !1
          }
          return !r || void 0 !== v(i, r)
        },
        b = function(e, t, n, r, o) {
          var i = void 0,
            a = void 0,
            c = void 0;
          if (i = p(e, t, s.default), 0 === i.length) return !1;
          if (n) {
            var u = s.default[t];
            if (void 0 === (a = _(i, u, n))) return !1
          }
          return (!r || void 0 !== (c = v(a, r))) && (!o || void 0 !== v(c, o))
        },
        m = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "",
            t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d.default.SDKVersion;
          if ("string" != typeof e) throw new l.AppServiceSdkKnownError("canIUse: schema should be an object");
          var n = e.split(".");
          return !!y.apply(void 0, [t].concat(o(n))) || !!b.apply(void 0, [t].concat(o(n)))
        };
      t.canIUse = m
    }, function(e, t) {
      e.exports = {
        audio: {
          "1.0.0": ["id", "src", "loop", "controls", "poster", "name", "author", "binderror", "bindplay", "bindpause", "bindtimeupdate", "bindended"]
        },
        button: {
          "1.0.0": [{
            size: ["default", "mini"]
          }, {
            type: ["primary", "default", "warn"]
          }, "plain", "disabled", "loading", {
            "form-type": ["submit", "reset"]
          }, "hover-class", "hover-start-time", "hover-stay-time"],
          "1.1.0": [{
            "open-type": ["contact"]
          }],
          "1.2.0": [{
            "open-type": ["share", "getPhoneNumber"]
          }, "bindgetphonenumber"],
          "1.3.0": [{
            "open-type": ["getUserInfo"]
          }],
          "1.7.0": [{
            "open-type": ["realnameAuth"]
          }, "bindrealnameauth"],
          "1.5.0": ["hover-stop-propagation", "send-message-title", "send-message-path", "send-message-img", "show-message-card", "bindcontact"],
          "1.4.0": ["session-from"],
          "1.9.5": [{
            "open-type": ["launchApp"]
          }]
        },
        camera: {
          "1.6.0": ["device-position", "flash", "bindstop", "binderror"]
        },
        canvas: {
          "1.0.0": ["canvas-id", "disable-scroll", "bindtouchstart", "bindtouchmove", "bindtouchend", "bindtouchcancel", "bindlongtap", "binderror"]
        },
        "checkbox-group": {
          "1.0.0": ["bindchange"]
        },
        checkbox: {
          "1.0.0": ["value", "disabled", "checked", "color"]
        },
        "contact-button": {
          "1.0.0": ["size", {
            type: ["default-dark", "default-light"]
          }, "session-from"]
        },
        "cover-view": {
          "1.4.0": []
        },
        "cover-image": {
          "1.4.0": ["src"]
        },
        form: {
          "1.0.0": ["report-submit", "bindsubmit", "bindreset"],
          "1.2.0": ["bindautofill"]
        },
        icon: {
          "1.0.0": [{
            type: ["success", "success_no_circle", "info", "warn", "waiting", "cancel", "download", "search", "clear"]
          }, "size", "color"]
        },
        image: {
          "1.0.0": ["src", {
            mode: ["scaleToFill", "aspectFit", "aspectFill", "widthFix", "top", "bottom", "center", "left", "right", "top left", "top right", "bottom left", "bottom right"]
          }, "binderror", "bindload"],
          "1.5.0": ["lazy-load"]
        },
        input: {
          "1.0.0": ["value", {
            type: ["text", "number", "idcard", "digit"]
          }, "password", "placeholder", "placeholder-style", "placeholder-class", "disabled", "maxlength", "cursor-spacing", "auto-focus", "focus", "bindinput", "bindfocus", "bindblur", "bindconfirm"],
          "1.1.0": [{
            "confirm-type": ["send", "search", "next", "go", "done"]
          }, "confirm-hold"],
          "1.5.0": ["cursor"],
          "1.8.0": ["selection-start", "selection-end"],
          "1.2.0": ["auto-fill"]
        },
        label: {
          "1.0.0": ["for"]
        },
        "live-player": {
          "1.7.0": ["src", "mode", "autoplay", "muted", "orientation", "object-fit", "background-mute", "min-cache", "max-cache", "bindstatechange", "bindfullscreenchange"],
          "1.9.0": ["bindnetstatus"]
        },
        "live-pusher": {
          "1.7.0": ["url", "mode", "autopush", "muted", "enable-camera", "auto-focus", "orientation", "beauty", "whiteness", "aspect", "min-bitrate", "max-bitrate", "waiting-image", "waiting-image-md5", "background-mute", "bindstatechange"],
          "1.9.0": ["bindnetstatus"]
        },
        map: {
          "1.0.0": ["longitude", "latitude", "scale", {
            markers: ["id", "latitude", "longitude", "title", "iconPath", "rotate", "alpha", "width", "height"]
          }, "covers", {
            polyline: ["points", "color", "width", "dottedLine"]
          }, {
            circles: ["latitude", "longitude", "color", "fillColor", "radius", "strokeWidth"]
          }, {
            controls: ["id", "position", "iconPath", "clickable"]
          }, "include-points", "show-location", "bindmarkertap", "bindcontroltap", "bindregionchange", "bindtap"],
          "1.2.0": [{
            markers: ["callout", "label", "anchor"]
          }, {
            polyline: ["arrowLine", "borderColor", "borderWidth"]
          }, "bindcallouttap"],
          "1.6.0": [{
            polyline: ["arrowIconPath"]
          }, "bindupdated"]
        },
        modal: {
          "1.0.0": []
        },
        "movable-area": {
          "1.2.0": []
        },
        "movable-view": {
          "1.2.0": ["direction", "inertia", "out-of-bounds", "x", "y", "damping", "friction"]
        },
        navigator: {
          "1.0.0": ["url", {
            "open-type": ["navigate", "redirect", "switchTab"]
          }, "delta", "hover-class", "hover-start-time", "hover-stay-time"],
          "1.1.0": [{
            "open-type": ["reLaunch", "navigateBack"]
          }],
          "1.5.0": ["hover-stop-propagation"]
        },
        "open-data": {
          "1.4.0": [{
            type: ["groupName"]
          }, "open-gid"]
        },
        "picker-view": {
          "1.0.0": ["value", "indicator-style", "bindchange"],
          "1.1.0": ["indicator-class"],
          "1.5.0": ["mask-style", "mask-class"]
        },
        "picker-view-column": {
          "1.0.0": []
        },
        picker: {
          "1.0.0": ["range", "range-key", "value", "bindchange", "disabled", "bindcolumnchange", "start", "end", {
            fields: ["year", "month", "day"]
          }, {
            mode: ["selector", "date", "time"]
          }],
          "1.2.0": ["auto-fill"],
          "1.4.0": ["bindcolumnchange", {
            mode: ["multiSelector", "region"]
          }],
          "1.5.0": ["custom-item"]
        },
        progress: {
          "1.0.0": ["percent", "show-info", "stroke-width", "color", "activeColor", "backgroundColor", "active"],
          "1.7.0": ["active-mode"]
        },
        "radio-group": {
          "1.0.0": ["bindchange"]
        },
        radio: {
          "1.0.0": ["value", "checked", "disabled", "color"]
        },
        "rich-text": {
          "1.4.0": [{
            nodes: ["name", "attrs", "children"]
          }]
        },
        "scroll-view": {
          "1.0.0": ["scroll-x", "scroll-y", "upper-threshold", "lower-threshold", "scroll-top", "scroll-left", "scroll-into-view", "scroll-with-animation", "enable-back-to-top", "bindscrolltoupper", "bindscrolltolower", "bindscroll"]
        },
        slider: {
          "1.0.0": ["min", "max", "step", "disabled", "value", "color", "selected-color", "activeColor", "backgroundColor", "show-value", "bindchange"],
          "1.9.0": ["block-size", "block-color"],
          "1.7.0": ["bindchanging"]
        },
        swiper: {
          "1.0.0": ["indicator-dots", "autoplay", "current", "interval", "duration", "circular", "vertical", "bindchange"],
          "1.1.0": ["indicator-color", "indicator-active-color"],
          "1.9.0": ["current-item-id", "previous-margin", "next-margin", "display-multiple-items", "skip-hidden-item-layout", "bindanimationfinish"]
        },
        "swiper-item": {
          "1.0.0": [],
          "1.9.0": ["item-id"]
        },
        switch: {
          "1.0.0": ["checked", {
            type: ["switch", "checkbox"]
          }, "bindchange", "color"]
        },
        text: {
          "1.0.0": [],
          "1.1.0": ["selectable"],
          "1.4.0": [{
            space: ["ensp", "emsp", "nbsp"]
          }, "decode"]
        },
        textarea: {
          "1.0.0": ["value", "placeholder", "placeholder-style", "placeholder-class", "disabled", "maxlength", "auto-focus", "focus", "auto-height", "fixed", "cursor-spacing", "bindfocus", "bindblur", "bindlinechange", "bindinput", "bindconfirm"],
          "1.5.0": ["cursor"],
          "1.6.0": ["show-confirm-bar"],
          "1.9.0": ["selection-start", "selection-end"],
          "1.2.0": ["auto-fill"]
        },
        video: {
          "1.0.0": ["src", "controls", "danmu-list", "danmu-btn", "enable-danmu", "autoplay", "bindplay", "bindpause", "bindended", "bindtimeupdate", "objectFit", "poster"],
          "1.6.0": ["initial-time", "page-gesture"],
          "1.1.0": ["duration"],
          "1.4.0": ["loop", "muted", "bindfullscreenchange"],
          "1.7.0": ["direction"]
        },
        view: {
          "1.0.0": ["hover-class", "hover-start-time", "hover-stay-time"],
          "1.5.0": ["hover-stop-propagation"]
        },
        "web-view": {
          "1.6.4": ["src"]
        }
      }
    }, function(e, t) {
      e.exports = {
        onAccelerometerChange: {
          "1.0.0": [{
            callback: ["x", "y", "z"]
          }]
        },
        startAccelerometer: {
          "1.1.0": []
        },
        stopAccelerometer: {
          "1.1.0": []
        },
        chooseAddress: {
          "1.1.0": [{
            success: ["userName", "postalCode", "provinceName", "cityName", "countyName", "detailInfo", "nationalCode", "telNumber"]
          }]
        },
        reportAnalytics: {
          "1.0.0": []
        },
        createAnimation: {
          "1.0.0": [{
            object: ["duration", {
              timingFunction: ["linear", "ease", "ease-in", "ease-in-out", "ease-out", "step-start", "step-end"]
            }, "delay", "transformOrigin"]
          }]
        },
        createAudioContext: {
          "1.0.0": []
        },
        createCameraContext: {
          "1.6.0": []
        },
        canIUse: {
          "1.0.0": []
        },
        createLivePlayerContext: {
          "1.7.0": ["play", "stop", "mute", "requestFullScreen", "exitFullScreen", "null"]
        },
        createLivePusherContext: {
          "1.7.0": ["start", "stop", "pause", "resume", "switchCamera", "null"]
        },
        login: {
          "1.0.0": [{
            success: ["code"]
          }]
        },
        checkSession: {
          "1.0.0": []
        },
        createMapContext: {
          "1.0.0": []
        },
        requestPayment: {
          "1.0.0": [{
            object: ["timeStamp", "nonceStr", "package", "signType", "paySign"]
          }]
        },
        showToast: {
          "1.0.0": [{
            object: ["title", "icon", "duration", "mask"]
          }],
          "1.1.0": [{
            object: ["image"]
          }]
        },
        showLoading: {
          "1.1.0": [{
            object: ["title", "mask"]
          }]
        },
        hideToast: {
          "1.0.0": []
        },
        hideLoading: {
          "1.1.0": []
        },
        showModal: {
          "1.0.0": [{
            object: ["title", "content", "showCancel", "cancelText", "cancelColor", "confirmText", "confirmColor"]
          }, {
            success: ["confirm"]
          }],
          "1.1.0": [{
            success: ["cancel"]
          }]
        },
        showActionSheet: {
          "1.0.0": [{
            object: ["itemList", "itemColor"]
          }, {
            success: ["tapIndex"]
          }]
        },
        arrayBufferToBase64: {
          "1.1.0": []
        },
        base64ToArrayBuffer: {
          "1.1.0": []
        },
        createVideoContext: {
          "1.0.0": []
        },
        authorize: {
          "1.2.0": [{
            object: ["scope"]
          }]
        },
        openBluetoothAdapter: {
          "1.1.0": []
        },
        closeBluetoothAdapter: {
          "1.1.0": []
        },
        getBluetoothAdapterState: {
          "1.1.0": [{
            success: ["discovering", "available"]
          }]
        },
        onBluetoothAdapterStateChange: {
          "1.1.0": [{
            callback: ["available", "discovering"]
          }]
        },
        startBluetoothDevicesDiscovery: {
          "1.1.0": [{
            object: ["services", "allowDuplicatesKey", "interval"]
          }]
        },
        stopBluetoothDevicesDiscovery: {
          "1.1.0": []
        },
        getBluetoothDevices: {
          "1.1.0": [{
            success: ["devices"]
          }]
        },
        onBluetoothDeviceFound: {
          "1.1.0": [{
            callback: ["devices"]
          }]
        },
        getConnectedBluetoothDevices: {
          "1.1.0": [{
            object: ["services"]
          }, {
            success: ["devices"]
          }]
        },
        createBLEConnection: {
          "1.1.0": [{
            object: ["deviceId"]
          }]
        },
        closeBLEConnection: {
          "1.1.0": [{
            object: ["deviceId"]
          }]
        },
        onBLEConnectionStateChange: {
          "1.1.1": [{
            callback: ["deviceId", "connected"]
          }]
        },
        getBLEDeviceServices: {
          "1.1.0": [{
            object: ["deviceId"]
          }, {
            success: ["services"]
          }]
        },
        getBLEDeviceCharacteristics: {
          "1.1.0": [{
            object: ["deviceId", "serviceId"]
          }, {
            success: ["characteristics"]
          }]
        },
        readBLECharacteristicValue: {
          "1.1.0": [{
            object: ["deviceId", "serviceId", "characteristicId"]
          }, {
            success: ["errCode"]
          }]
        },
        writeBLECharacteristicValue: {
          "1.1.0": [{
            object: ["deviceId", "serviceId", "characteristicId", "value"]
          }]
        },
        notifyBLECharacteristicValueChange: {
          "1.1.1": [{
            object: ["deviceId", "serviceId", "characteristicId", "state"]
          }]
        },
        onBLECharacteristicValueChange: {
          "1.1.0": [{
            callback: ["deviceId", "serviceId", "characteristicId", "value"]
          }]
        },
        addCard: {
          "1.1.0": [{
            object: ["cardList"]
          }, {
            success: ["cardList"]
          }]
        },
        openCard: {
          "1.1.0": [{
            object: ["cardList"]
          }]
        },
        checkIsSoterEnrolledInDevice: {
          "1.6.0": [{
            object: ["checkAuthMode"]
          }, {
            success: ["isEnrolled"]
          }]
        },
        checkIsSupportSoterAuthentication: {
          "1.5.0": [{
            success: [{
              supportMode: ["fingerPrint", "facial", "speech"]
            }]
          }]
        },
        chooseInvoiceTitle: {
          "1.5.0": [{
            success: ["type", "title", "taxNumber", "companyAddress", "telephone", "bankName", "bankAccount"]
          }]
        },
        setClipboardData: {
          "1.1.0": [{
            object: ["data"]
          }]
        },
        getClipboardData: {
          "1.1.0": [{
            success: ["data"]
          }]
        },
        onCompassChange: {
          "1.0.0": [{
            callback: ["direction"]
          }]
        },
        startCompass: {
          "1.1.0": []
        },
        stopCompass: {
          "1.1.0": []
        },
        createInnerAudioContext: {
          "1.6.0": []
        },
        setStorage: {
          "1.0.0": [{
            object: ["key", "data"]
          }]
        },
        setStorageSync: {
          "1.0.0": []
        },
        getStorage: {
          "1.0.0": [{
            object: ["key"]
          }, {
            success: ["data"]
          }]
        },
        getStorageSync: {
          "1.0.0": []
        },
        getStorageInfo: {
          "1.0.0": [{
            success: ["keys", "currentSize", "limitSize"]
          }]
        },
        removeStorage: {
          "1.0.0": [{
            object: ["key"]
          }]
        },
        removeStorageSync: {
          "1.0.0": []
        },
        clearStorage: {
          "1.0.0": []
        },
        clearStorageSync: {
          "1.0.0": []
        },
        getOpenDeviceId: {
          "1.5.0": [{
            success: ["encryptedData", "iv"]
          }]
        },
        getNetworkType: {
          "1.0.0": [{
            success: ["networkType"]
          }]
        },
        onNetworkStatusChange: {
          "1.1.0": [{
            callback: ["isConnected", {
              networkType: ["wifi", "2g", "3g", "4g", "none", "unknown"]
            }]
          }]
        },
        setScreenBrightness: {
          "1.2.0": [{
            object: ["value"]
          }]
        },
        getScreenBrightness: {
          "1.2.0": [{
            success: ["value"]
          }]
        },
        vibrateLong: {
          "1.2.0": []
        },
        vibrateShort: {
          "1.2.0": []
        },
        getExtConfig: {
          "1.1.0": [{
            success: ["extConfig"]
          }]
        },
        getExtConfigSync: {
          "1.1.0": []
        },
        saveFile: {
          "1.0.0": [{
            object: ["tempFilePath"]
          }, {
            success: ["savedFilePath"]
          }]
        },
        getSavedFileList: {
          "1.0.0": [{
            success: ["fileList"]
          }]
        },
        getSavedFileInfo: {
          "1.0.0": [{
            object: ["filePath"]
          }, {
            success: ["size", "createTime"]
          }]
        },
        removeSavedFile: {
          "1.0.0": [{
            object: ["filePath"]
          }]
        },
        openDocument: {
          "1.0.0": [{
            object: ["filePath"]
          }],
          "1.4.0": [{
            object: ["fileType"]
          }]
        },
        getBackgroundAudioManager: {
          "1.2.0": []
        },
        getFileInfo: {
          "1.4.0": [{
            object: ["filePath", {
              digestAlgorithm: ["md5", "sha1"]
            }]
          }, {
            success: ["size", "digest"]
          }]
        },
        getRecorderManager: {
          "1.6.0": []
        },
        startBeaconDiscovery: {
          "1.2.0": [{
            object: ["uuids"]
          }]
        },
        stopBeaconDiscovery: {
          "1.2.0": []
        },
        getBeacons: {
          "1.2.0": [{
            success: ["beacons"]
          }]
        },
        onBeaconUpdate: {
          "1.2.0": [{
            callback: ["beacons"]
          }]
        },
        onBeaconServiceChange: {
          "1.2.0": [{
            callback: ["available", "discovering"]
          }]
        },
        getLocation: {
          "1.0.0": [{
            object: ["type"]
          }, {
            success: ["latitude", "longitude", "speed", "accuracy"]
          }],
          "1.6.0": [{
            object: ["altitude"]
          }],
          "1.2.0": [{
            success: ["altitude", "verticalAccuracy", "horizontalAccuracy"]
          }]
        },
        chooseLocation: {
          "1.0.0": [{
            success: ["name", "address", "latitude", "longitude"]
          }]
        },
        openLocation: {
          "1.0.0": [{
            object: ["latitude", "longitude", "scale", "name", "address"]
          }]
        },
        getBackgroundAudioPlayerState: {
          "1.0.0": [{
            success: ["duration", "currentPosition", "status", "downloadPercent", "dataUrl"]
          }]
        },
        playBackgroundAudio: {
          "1.0.0": [{
            object: ["dataUrl", "title", "coverImgUrl"]
          }]
        },
        pauseBackgroundAudio: {
          "1.0.0": []
        },
        seekBackgroundAudio: {
          "1.0.0": [{
            object: ["position"]
          }]
        },
        stopBackgroundAudio: {
          "1.0.0": []
        },
        onBackgroundAudioPlay: {
          "1.0.0": []
        },
        onBackgroundAudioPause: {
          "1.0.0": []
        },
        onBackgroundAudioStop: {
          "1.0.0": []
        },
        chooseImage: {
          "1.0.0": [{
            object: ["count", "sizeType", "sourceType"]
          }, {
            success: ["tempFilePaths"]
          }],
          "1.2.0": [{
            success: ["tempFiles"]
          }]
        },
        previewImage: {
          "1.0.0": [{
            object: ["current", "urls"]
          }]
        },
        getImageInfo: {
          "1.0.0": [{
            object: ["src"]
          }, {
            success: ["width", "height", "path"]
          }]
        },
        saveImageToPhotosAlbum: {
          "1.2.0": [{
            object: ["filePath"]
          }]
        },
        startRecord: {
          "1.0.0": [{
            success: ["tempFilePath"]
          }]
        },
        stopRecord: {
          "1.0.0": []
        },
        chooseVideo: {
          "1.0.0": [{
            object: ["sourceType", "maxDuration", "camera"]
          }, {
            success: ["tempFilePath", "duration", "size", "height", "width"]
          }],
          "1.6.0": [{
            object: ["compressed"]
          }]
        },
        saveVideoToPhotosAlbum: {
          "1.2.0": [{
            object: ["filePath"]
          }]
        },
        playVoice: {
          "1.0.0": [{
            object: ["filePath"]
          }],
          "1.6.0": [{
            object: ["duration"]
          }]
        },
        pauseVoice: {
          "1.0.0": []
        },
        stopVoice: {
          "1.0.0": []
        },
        navigateBackMiniProgram: {
          "1.3.0": [{
            object: ["extraData"]
          }]
        },
        navigateToMiniProgram: {
          "1.3.0": [{
            object: ["appId", "path", "extraData", "envVersion"]
          }]
        },
        uploadFile: {
          "1.0.0": [{
            object: ["url", "filePath", "name", "header", "formData"]
          }, {
            success: ["data", "statusCode"]
          }]
        },
        downloadFile: {
          "1.0.0": [{
            object: ["url", "header"]
          }, {
            success: ["tempFilePath", "statusCode"]
          }]
        },
        request: {
          "1.0.0": [{
            object: ["url", "data", "header", {
              method: ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"]
            }, "dataType"]
          }, {
            success: ["data", "statusCode"]
          }],
          "1.7.0": [{
            object: ["responseType"]
          }],
          "1.2.0": [{
            success: ["header"]
          }]
        },
        connectSocket: {
          "1.0.0": [{
            object: ["url", "header", {
              method: ["OPTIONS", "GET", "HEAD", "POST", "PUT", "DELETE", "TRACE", "CONNECT"]
            }]
          }],
          "1.4.0": [{
            object: ["protocols"]
          }]
        },
        onSocketOpen: {
          "1.0.0": []
        },
        onSocketError: {
          "1.0.0": []
        },
        sendSocketMessage: {
          "1.0.0": [{
            object: ["data"]
          }]
        },
        onSocketMessage: {
          "1.0.0": [{
            callback: ["data"]
          }]
        },
        closeSocket: {
          "1.0.0": [],
          "1.4.0": [{
            object: ["code", "reason"]
          }]
        },
        onSocketClose: {
          "1.0.0": []
        },
        getHCEState: {
          "1.7.0": [{
            success: ["errCode"]
          }]
        },
        startHCE: {
          "1.7.0": [{
            object: ["aid_list"]
          }, {
            success: ["errCode"]
          }]
        },
        stopHCE: {
          "1.7.0": [{
            success: ["errCode"]
          }]
        },
        onHCEMessage: {
          "1.7.0": [{
            callback: ["messageType", "data", "reason"]
          }]
        },
        sendHCEMessage: {
          "1.7.0": [{
            object: ["data"]
          }, {
            success: ["errCode"]
          }]
        },
        onUserCaptureScreen: {
          "1.4.0": []
        },
        chooseContact: {
          "1.0.0": [{
            success: ["phoneNumber", "displayName"]
          }]
        },
        getUserInfo: {
          "1.0.0": [{
            success: ["userInfo", "rawData", "signature", "encryptedData", "iv"]
          }],
          "1.1.0": [{
            object: ["withCredentials"]
          }],
          "1.3.0": [{
            object: ["lang"]
          }]
        },
        addPhoneContact: {
          "1.2.0": [{
            object: ["photoFilePath", "nickName", "lastName", "middleName", "firstName", "remark", "mobilePhoneNumber", "weChatNumber", "addressCountry", "addressState", "addressCity", "addressStreet", "addressPostalCode", "organization", "title", "workFaxNumber", "workPhoneNumber", "hostNumber", "email", "url", "workAddressCountry", "workAddressState", "workAddressCity", "workAddressStreet", "workAddressPostalCode", "homeFaxNumber", "homePhoneNumber", "homeAddressCountry", "homeAddressState", "homeAddressCity", "homeAddressStreet", "homeAddressPostalCode"]
          }]
        },
        makePhoneCall: {
          "1.0.0": [{
            object: ["phoneNumber"]
          }]
        },
        startPullDownRefresh: {
          "1.5.0": []
        },
        stopPullDownRefresh: {
          "1.0.0": []
        },
        scanCode: {
          "1.0.0": [{
            success: ["result", "scanType", "charSet", "path"]
          }],
          "1.2.0": [{
            object: ["onlyFromCamera"]
          }],
          "1.7.0": [{
            object: ["scanType"]
          }]
        },
        pageScrollTo: {
          "1.4.0": [{
            object: ["scrollTop", "duration"]
          }]
        },
        setEnableDebug: {
          "1.4.0": [{
            object: ["enableDebug"]
          }]
        },
        setKeepScreenOn: {
          "1.4.0": [{
            object: ["keepScreenOn"]
          }]
        },
        setNavigationBarColor: {
          "1.4.0": [{
            object: ["frontColor", "backgroundColor", "animation", "animation.duration", {
              "animation.timingFunc": ["linear", "easeIn", "easeOut", "easeInOut"]
            }]
          }]
        },
        openSetting: {
          "1.1.0": [{
            success: ["authSetting"]
          }]
        },
        getSetting: {
          "1.2.0": [{
            success: ["authSetting"]
          }]
        },
        showShareMenu: {
          "1.1.0": [{
            object: ["withShareTicket"]
          }]
        },
        hideShareMenu: {
          "1.1.0": []
        },
        updateShareMenu: {
          "1.2.0": [{
            object: ["withShareTicket"]
          }],
          "1.4.0": [{
            object: ["dynamic", "widget"]
          }]
        },
        getShareInfo: {
          "1.1.0": [{
            object: ["shareTicket"]
          }, {
            callback: ["encryptedData", "iv"]
          }]
        },
        startSoterAuthentication: {
          "1.5.0": [{
            object: ["requestAuthModes", "challenge", "authContent"]
          }, {
            success: ["errCode", "authMode", "resultJSON", "resultJSONSignature"]
          }]
        },
        getSystemInfo: {
          "1.0.0": [{
            success: ["model", "pixelRatio", "windowWidth", "windowHeight", "language", "version", "system", "platform"]
          }],
          "1.5.0": [{
            success: ["brand", "fontSizeSetting"]
          }],
          "1.1.0": [{
            success: ["screenWidth", "screenHeight", "SDKVersion"]
          }]
        },
        getSystemInfoSync: {
          "1.0.0": [{
            return: ["model", "pixelRatio", "windowWidth", "windowHeight", "language", "version", "system", "platform"]
          }],
          "1.5.0": [{
            return: ["brand", "fontSizeSetting"]
          }],
          "1.1.0": [{
            return: ["screenWidth", "screenHeight", "SDKVersion"]
          }]
        },
        navigateTo: {
          "1.0.0": [{
            object: ["url"]
          }]
        },
        redirectTo: {
          "1.0.0": [{
            object: ["url"]
          }]
        },
        reLaunch: {
          "1.1.0": [{
            object: ["url"]
          }]
        },
        switchTab: {
          "1.0.0": [{
            object: ["url"]
          }]
        },
        navigateBack: {
          "1.0.0": [{
            object: ["delta"]
          }]
        },
        setTabBarBadge: {
          "1.9.0": [{
            object: ["index", "text"]
          }]
        },
        removeTabBarBadge: {
          "1.9.0": [{
            object: ["index"]
          }]
        },
        showTabBarRedDot: {
          "1.9.0": []
        },
        hideTabBarRedDot: {
          "1.9.0": []
        },
        setTabBarStyle: {
          "1.9.0": [{
            object: ["color", "selectedColor", "backgroundColor", "borderStyle"]
          }]
        },
        setTabBarItem: {
          "1.9.0": [{
            object: ["index", "text", "iconPath", "selectedIconPath"]
          }]
        },
        showTabBar: {
          "1.9.0": [{
            object: ["aniamtion"]
          }]
        },
        hideTabBar: {
          "1.9.0": [{
            object: ["aniamtion"]
          }]
        },
        setTopBarText: {
          "1.4.3": [{
            object: ["text"]
          }]
        },
        setNavigationBarTitle: {
          "1.0.0": [{
            object: ["title"]
          }]
        },
        showNavigationBarLoading: {
          "1.0.0": []
        },
        hideNavigationBarLoading: {
          "1.0.0": []
        },
        getWeRunData: {
          "1.2.0": [{
            success: ["encryptedData", "iv"]
          }]
        },
        startWifi: {
          "1.6.0": []
        },
        stopWifi: {
          "1.6.0": []
        },
        connectWifi: {
          "1.6.0": [{
            object: ["SSID", "BSSID", "password"]
          }]
        },
        getWifiList: {
          "1.6.0": []
        },
        onGetWifiList: {
          "1.6.0": [{
            callback: ["wifiList"]
          }]
        },
        setWifiList: {
          "1.6.0": [{
            object: ["wifiList"]
          }]
        },
        onWifiConnected: {
          "1.6.0": [{
            callback: ["wifi"]
          }]
        },
        getConnectedWifi: {
          "1.6.0": [{
            success: ["wifi"]
          }]
        },
        createSelectorQuery: {
          "1.4.0": []
        },
        makeVoIPCall: {
          "1.5.0": [{
            object: ["allowBackCamera", "showOther", "avatarUrl", "context"]
          }]
        },
        createCanvasContext: {
          "1.0.0": []
        },
        canvasGetImageData: {
          "1.9.0": [{
            object: ["canvasId", "x", "y", "width", "height"]
          }, {
            success: ["width", "height", "data"]
          }]
        },
        canvasPutImageData: {
          "1.9.0": [{
            object: ["canvasId", "data", "x", "y", "width", "height"]
          }]
        },
        canvasToTempFilePath: {
          "1.0.0": [{
            object: ["canvasId"]
          }],
          "1.2.0": [{
            object: ["x", "y", "width", "height", "destWidth", "destHeight"]
          }],
          "1.7.0": [{
            object: ["fileType", "quality"]
          }]
        },
        canvasContext: {
          "1.0.0": ["addColorStop", "arc", "beginPath", "bezierCurveTo", "clearActions", "clearRect", "closePath", "createCircularGradient", "createLinearGradient", "drawImage", "draw", "fillRect", "fillText", "fill", "lineTo", "moveTo", "quadraticCurveTo", "rect", "rotate", "save", "scale", "setFillStyle", "setFontSize", "setGlobalAlpha", "setLineCap", "setLineJoin", "setLineWidth", "setMiterLimit", "setShadow", "setStrokeStyle", "strokeRect", "stroke", "translate"],
          "1.6.0": ["clip", "setLineDash"],
          "1.1.0": ["setTextAlign"],
          "1.4.0": ["setTextBaseline"]
        },
        animation: {
          "1.0.0": ["opacity", "backgroundColor", "width", "height", "top", "left", "bottom", "right", "rotate", "rotateX", "rotateY", "rotateZ", "rotate3d", "scale", "scaleX", "scaleY", "scaleZ", "scale3d", "translate", "translateX", "translateY", "translateZ", "translate3d", "skew", "skewX", "skewY", "matrix", "matrix3d"]
        },
        audioContext: {
          "1.0.0": ["setSrc", "play", "pause", "seek"]
        },
        cameraContext: {
          "1.6.0": ["takePhoto", "startRecord", "stopRecord"]
        },
        mapContext: {
          "1.0.0": ["getCenterLocation", "moveToLocation"],
          "1.2.0": ["translateMarker", "includePoints"],
          "1.4.0": ["getRegion", "getScale"]
        },
        videoContext: {
          "1.0.0": ["play", "pause", "seek", "sendDanmu"],
          "1.4.0": ["playbackRate", "requestFullScreen", "exitFullScreen"]
        },
        innerAudioContext: {
          "1.6.0": ["play", "pause", "stop", "seek", "destroy", "onCanplay", "onPlay", "onPause", "onStop", "onEnded", "onTimeUpdate", "onError", "onWaiting", "onSeeking", "onSeeked", "src", "startTime", "autoplay", "loop", "obeyMuteSwitch", "duration", "currentTime", "paused", "buffered"]
        },
        backgroundAudioManager: {
          "1.2.0": ["play", "pause", "stop", "seek", "onCanplay", "onPlay", "onPause", "onStop", "onEnded", "onTimeUpdate", "onPrev", "onNext", "onError", "onWaiting", "duration", "currentTime", "paused", "src", "startTime", "buffered", "title", "epname", "singer", "coverImgUrl", "webUrl"]
        },
        recorderManager: {
          "1.6.0": ["start", "pause", "resume", "stop", "onStart", "onPause", "onStop", "onFrameRecorded", "onError"]
        },
        uploadTask: {
          "1.4.0": ["onProgressUpdate", "abort"]
        },
        downloadTask: {
          "1.4.0": ["onProgressUpdate", "abort"]
        },
        requestTask: {
          "1.4.0": ["abort"]
        },
        selectorQuery: {
          "1.4.0": ["in", "select", "selectAll", "selectViewport", "exec"]
        },
        onBLEConnectionStateChanged: {
          "1.1.0": [{
            callback: ["deviceId", "connected"]
          }]
        },
        notifyBLECharacteristicValueChanged: {
          "1.1.0": [{
            object: ["deviceId", "serviceId", "characteristicId", "state"]
          }]
        },
        sendBizRedPacket: {
          "1.2.0": [{
            object: ["timeStamp", "nonceStr", "package", "signType", "paySign"]
          }]
        },
        captureScreen: {
          "1.4.0": [{
            success: ["tempFilePath"]
          }]
        }
      }
    }, function(e, t, n) {
      function r(e) {
        if (e && e.__esModule) return e;
        var t = {};
        if (null != e)
          for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
        return t.default = e, t
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.web = t.miniProgram = t.application = void 0;
      var o = n(217),
        i = r(o),
        a = n(218),
        c = r(a),
        u = n(222),
        s = r(u);
      t.application = i, t.miniProgram = c, t.web = s
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.launchApplication = t.navigateBackApplication = void 0;
      var r = n(1);
      t.navigateBackApplication = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, r.invokeMethod)("navigateBackApplication", e, {})
      }, t.launchApplication = function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        (0, r.invokeMethod)("launchApplication", e, {})
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(219);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(220);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      });
      var i = n(221);
      Object.keys(i).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return i[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.navigateBackMiniProgram = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("navigateBackMiniProgram", e, {})
        };
      t.navigateBackMiniProgram = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.navigateToMiniProgram = void 0;
      var r = n(1),
        o = n(2),
        i = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("navigateToMiniProgram", e, {
            appId: ""
          }) && ("string" == typeof e.path && e.path.trim().length > 0 ? (0, r.invokeMethod)("navigateToMiniProgram", (0, o.assign)(e, {
            path: (0, o.transWxmlToHtml)(e.path).trim()
          }), {}) : (0, r.invokeMethod)("navigateToMiniProgram", (0, o.assign)(e, {
            path: void 0
          }), {}))
        };
      t.navigateToMiniProgram = i
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.navigateToDevMiniProgram = void 0;
      var r = n(1),
        o = (n(2), function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("navigateToDevMiniProgram", e, {
            appId: ""
          }) && (0, r.invokeMethod)("navigateToDevMiniProgram", e, {})
        });
      t.navigateToDevMiniProgram = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(223);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(224);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openDeliveryList = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.invokeMethod)("openDeliveryList", e, {})
        };
      t.openDeliveryList = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.openUrl = void 0;
      var r = n(1),
        o = n(2),
        i = n(3),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          if (!0 !== a.default.openUrlLock)
            if (e.url = e.url || "", (0, o.validateUrl)(e.url)) a.default.openUrlLock = !0, (0, r.invokeMethod)("openUrl", e, {
              afterAll: function() {
                a.default.openUrlLock = !1
              }
            });
            else {
              console.error("invalid url", e.url);
              var t = {
                errMsg: 'openUrl: invalid url "' + e.url + '"'
              };
              "function" == typeof e.fail && e.fail(t), "function" == typeof e.complete && e.complete(t)
            }
        };
      t.openUrl = c
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(226);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(227);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getPublicLibVersion = void 0;
      var r = n(1);
      t.getPublicLibVersion = function() {
        var e = void 0;
        return (0, r.invokeMethod)("getPublicLibVersion", {
          complete: function(t) {
            t.version ? e = t.version : (e = t, delete e.errMsg)
          }
        }), e
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.setEnableDebug = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          (0, r.beforeInvoke)("setEnableDebug", e, {
            enableDebug: !0
          }) && ((0, r.invokeMethod)("setEnableDebug", e, {}), e.enableDebug && console.warn("已通过 wx.setEnableDebug 打开调试"))
        };
      t.setEnableDebug = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.traceEvent = t.updatePerfData = void 0;
      var r = n(1);
      t.updatePerfData = function(e) {
        (0, r.invokeMethod)("updatePerfData", e)
      }, t.traceEvent = function(e) {
        (0, r.invokeMethod)("traceEvent", e)
      }
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t._getRealRoute = void 0;
      var r = n(2),
        o = n(3),
        i = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(o),
        a = function(e) {
          var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1];
          return (0, r.getRealRoute)(i.default.lastRoute, e, t)
        };
      t._getRealRoute = a
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(231);
      Object.defineProperty(t, "updateApp", {
        enumerable: !0,
        get: function() {
          return r.updateApp
        }
      })
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.updateApp = void 0;
      var r = n(1),
        o = function() {
          var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
          console.log("updateApp"), (0, r.invokeMethod)("updateApp", e)
        };
      t.updateApp = o
    }, function(e, t, n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(233);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      })
    }, function(e, t, n) {
      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createWorker = void 0;
      var o = n(234),
        i = r(o),
        a = n(235),
        c = r(a),
        u = 1;
      __wxConfig.onReady(function() {
        try {
          "number" == typeof __wxConfig.wxAppInfo.maxWorkerConcurrent && (u = __wxConfig.wxAppInfo.maxWorkerConcurrent)
        } catch (e) {}
      });
      var s = ["app-service.js", "game.js", "subContext.js"],
        l = function(e) {
          for (var t = 0; t < s.length; t++)
            if (e === s[t]) return !0;
          return !1
        },
        f = function(e) {
          if (l(e)) throw new Error('createWorker: Worker "' + name + '" hit black list');
          if (c.default.size >= u) throw new Error("createWorker: exceed max concurrent workers limit.");
          var t = WeixinWorker.create("workers.js");
          if (t > 0) return new i.default(t, e);
          throw -1 === ret ? new Error('createWorker: Worker "' + name + '" does not exists.') : new Error("createWorker: unknown error.")
        };
      t.createWorker = f
    }, function(e, t, n) {
      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(235),
        a = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(i),
        c = new WeakMap,
        u = new WeakMap,
        s = {},
        l = function(e) {
          console[e.level].apply(console, e.logs)
        };
      WeixinWorker.onWorkerMsg(function(e, t) {
        var n = s[e],
          r = u.get(n);
        if (t.__log__ && t.logs) return void l(t);
        n && "function" == typeof r && r(t)
      });
      var f = function(e) {
          this.postMessage({
            __cmd__: "requireScript",
            __script__: e
          })
        },
        d = function() {
          function e(t, n) {
            r(this, e), c.set(this, t), s[t] = this, f.call(this, n), a.default.add(this)
          }
          return o(e, [{
            key: "postMessage",
            value: function(e) {
              var t = c.get(this);
              WeixinWorker.postMsgToWorker(t, e)
            }
          }, {
            key: "onMessage",
            value: function(e) {
              u.set(this, e)
            }
          }, {
            key: "terminate",
            value: function() {
              var e = c.get(this);
              WeixinWorker.terminate(e), a.default.remove(this), c.delete(this), u.delete(this), delete s[e]
            }
          }]), e
        }();
      t.default = d
    }, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = [],
        r = {
          add: function(e) {
            e && n.indexOf(e) < 0 && n.push(e)
          },
          remove: function(e) {
            var t = n.indexOf(e);
            t >= 0 && n.splice(t, 1)
          },
          get size() {
            return n.length
          }
        };
      t.default = r
    }]);
  ! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.exparser = t() : e.exparser = t()
  }(this, function() {
    return function(e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
          exports: {},
          id: r,
          loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
      }
      var n = {};
      return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
      var r = n(1),
        o = n(3),
        i = n(4),
        a = n(6),
        c = n(9),
        u = n(11),
        s = n(10),
        l = n(12),
        f = n(13),
        d = n(7),
        p = n(2),
        h = n(14);
      t.FreeTmpl = h, t.precompileTemplate = h.precompiler ? h.precompiler.compile : null, t.Event = o, t.Element = a, t.TextNode = u, t.NativeNode = s, t.VirtualNode = l, t.ShadowRoot = f, t.Behavior = i, t.Component = c, t.Observer = d, t.registerBehavior = i.create, t.registerElement = c.register, t.createElement = c.create, t.createTextNode = u.create, t.createVirtualNode = l.create, t.appendChild = a.appendChild, t.insertBefore = a.insertBefore, t.removeChild = a.removeChild, t.replaceChild = a.replaceChild, t.addListenerToElement = o.addListenerToElement, t.removeListenerFromElement = o.removeListenerFromElement, t.triggerEvent = o.triggerEvent, t.safeCallback = r.safeCallback, t.addGlobalErrorListener = r.addGlobalErrorListener, t.removeGlobalErrorListener = r.removeGlobalErrorListener, t.globalOptions = p, c._setDefaultTemplateEngine(h), (t.updateDefaultComponent = function() {
        delete c._list[""], c.register({
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
      var v = function(e) {
          var t = "";
          if (e instanceof exparser.Element && (e.id && (t += ' id="' + e.id + '"'), e.slot && (t += ' slot="' + e.slot + '"'), e.__slotName && (t += ' name="' + e.__slotName + '"'), e.classList && (t += ' class="' + e.class + '"'), e.$$ && e.$$.getAttribute("style") && (t += ' style="' + e.$$.getAttribute("style") + '"')), e instanceof exparser.VirtualNode) return t;
          if (e instanceof exparser.Component) return c.listPublicProperties(e).forEach(function(n) {
            t += " " + n + "=" + JSON.stringify(e[n])
          }), t;
          for (var n = e.attributes, r = 0; r < n.length; r++) t += " " + n[r].name + '="' + n[r].value + '"';
          return t
        },
        g = t.dumpElementToString = function(e, t, n) {
          var r = null;
          p.hasDOMBackend && (r = window);
          var o = 0;
          n = n || 0;
          var i = "";
          for (o = n; o; o--) i += "  ";
          var a = "";
          if (e instanceof exparser.Element) a += i + "<" + (e.$$ ? e.$$.tagName.toLowerCase() + ":" : "") + e.is + v(e) + ">", a += e instanceof exparser.VirtualNode ? " [Exp-Virtual]" : e instanceof exparser.NativeNode ? " [Exp-Native]" : " [Exp-Component]", a += "\n" + g(t ? e.__wxSlotChildren : e.childNodes, t, n + 1);
          else if (e instanceof exparser.TextNode) a += i + e.textContent + " [Exp-Text]\n";
          else if (r && e instanceof r.HTMLElement) a += i + "<" + e.tagName.toLowerCase() + v(e) + "> [DOM-Element]", a += "\n" + g(t ? e.__wxSlotChildren || e.childNodes : e.childNodes, t, n + 1);
          else if (r && e instanceof r.Text) a += i + e.textContent + " [DOM-Text]\n";
          else if (void 0 !== e.length)
            for (o = 0; o < e.length; o++) a += g(e[o], t, n);
          else a = i + "[unknown node]\n";
          return a
        };
      t.dumpElement = function(e, t) {
        console.log(g(e, t))
      }
    }, function(e, t, n) {
      var r = n(2),
        o = function(e) {
          this.empty = !0, this._type = e, this._arr = [], this._index = 0
        };
      o.create = function(e) {
        return new o(e)
      }, o.prototype.add = function(e) {
        var t = this._index++;
        return this._arr.push({
          id: t,
          func: e
        }), this.empty = !1, t
      }, o.prototype.remove = function(e) {
        var t = this._arr,
          n = 0;
        if ("function" == typeof e) {
          for (n = 0; n < t.length; n++)
            if (t[n].func === e) return t.splice(n, 1), this.empty = !t.length, !0
        } else
          for (n = 0; n < t.length; n++)
            if (t[n].id === e) return t.splice(n, 1), this.empty = !t.length, !0;
        return !1
      }, o.prototype.call = function(e, t) {
        for (var n = this._arr, r = !1, o = 0; o < n.length; o++) {
          !1 === a(this._type, n[o].func, e, t) && (r = !0)
        }
        if (r) return !1
      };
      var i = function(e, t) {
          if (!t.type || !1 !== c.call(null, [e, t])) {
            if (console.error(t.message), r.throwGlobalError) throw e;
            console.error(e.stack)
          }
        },
        a = o.safeCallback = function(e, t, n, r) {
          try {
            return t.apply(n, r)
          } catch (a) {
            var o = "[Exparser] [Error] [Component] " + (e || "Error Listener") + " Error @ ";
            n && n.is && (o += n.is), o += "#" + (t.name || "(anonymous)"), i(a, {
              message: o,
              type: e,
              element: n,
              method: t,
              args: r
            })
          }
        },
        c = o.create();
      o.addGlobalErrorListener = function(e) {
        return c.add(e)
      }, o.removeGlobalErrorListener = function(e) {
        return c.remove(e)
      }, e.exports = o
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
      var r = n(1),
        o = function() {};
      o.prototype = Object.create(Object.prototype, {
        constructor: {
          value: o,
          writable: !0,
          configurable: !0
        }
      });
      var i = null;
      o._setElementSystem = function(e) {
        i = e, delete t._setElementSystem
      };
      var a = Date.now();
      o.setInitTimeStamp = function(e) {
        return a = void 0 === e ? Date.now() : e
      }, o.getInitTimeStamp = function(e) {
        return a
      }, o.create = function(e, t, n) {
        n = n || {};
        var r = n.originalEvent,
          i = n.extraFields || {},
          c = Date.now() - a,
          u = new o;
        u.currentTarget = null, u.type = e, u.timeStamp = c, u.detail = t, u.bubbles = !!n.bubbles, u.composed = !!n.composed, u.__originalEvent = r, u.__hasCapture = !!n.capturePhase, u.__stopped = !1, u.__dispatched = !1;
        for (var s in i) u[s] = i[s];
        return u
      }, o.prototype.preventDefault = function() {
        this.__originalEvent && this.__originalEvent.preventDefault()
      }, o.prototype.stopPropagation = function() {
        this.__stopped = !0
      };
      var c = function(e, t, n, r) {
        for (var o = e, a = o, c = [], u = e; u;) {
          if (o === u ? o = u.parentNode : a !== u && (c.push(e), e = u), a = u.parentNode, !1 === r(u, e)) return;
          if (u.__wxHost) {
            if (n) break;
            o && o instanceof i ? e = c.pop() : (o = u.__wxHost, e = o), u = u.__wxHost
          } else {
            var s = !0;
            u instanceof i && (s = !1), u = s || n ? u.parentNode : u.__wxSlotParent
          }
        }
      };
      o.dispatchEvent = function(e, t) {
        if (!t.__dispatched) {
          t.__dispatched = !0, e.__wxElement && e.__wxHost !== e.__wxElement && (e = e.__wxElement), t.target = e instanceof i ? e.__methodCaller : e;
          var n = function(e, n) {
              var r = t.currentTarget = n instanceof i ? n.__methodCaller : n;
              !1 === e.call(r, [t]) && (t.__originalEvent && t.__originalEvent.preventDefault(), t.__stopped = !0)
            },
            r = t.type,
            o = !t.composed;
          if (t.__hasCapture) {
            var a = [];
            c(e, 0, o, function(e, t) {
              return e.__wxCaptureEvents && e.__wxCaptureEvents[r] && a.push([e, t]), !0
            });
            for (var u = a.length - 1; u >= 0; u--) {
              var s = a[u],
                l = s[0],
                f = s[1];
              if (t.target = f instanceof i ? f.__methodCaller : f, n(l.__wxCaptureEvents[r], l), t.__stopped) break
            }
          }
          if (t.target = e instanceof i ? e.__methodCaller : e, !t.__stopped) {
            var d = !t.bubbles;
            c(e, 0, o, function(e, o) {
              if (t.target = o instanceof i ? o.__methodCaller : o, e.__wxEvents && e.__wxEvents[r] && n(e.__wxEvents[r], e), d || t.__stopped) return !1
            })
          }
        }
      }, o.triggerEvent = function(e, t, n, r) {
        var i = o.create(t, n, r);
        o.dispatchEvent(e, i)
      }, o.addListenerToElement = function(e, t, n, o) {
        return o && (o.useCapture || o.capture) ? (e.__wxCaptureEvents || (e.__wxCaptureEvents = Object.create(null)), e.__wxCaptureEvents[t] || (e.__wxCaptureEvents[t] = r.create("Event Listener")), e.__wxCaptureEvents[t].add(n)) : (e.__wxEvents || (e.__wxEvents = Object.create(null)), e.__wxEvents[t] || (e.__wxEvents[t] = r.create("Event Listener")), e.__wxEvents[t].add(n))
      }, o.removeListenerFromElement = function(e, t, n, r) {
        return r && (r.useCapture || r.capture) ? void(e.__wxCaptureEvents && e.__wxCaptureEvents[t] && e.__wxCaptureEvents[t].remove(n)) : void(e.__wxEvents && e.__wxEvents[t] && e.__wxEvents[t].remove(n))
      }, e.exports = o
    }, function(e, t, n) {
      var r = n(1),
        o = n(5),
        i = n(2),
        a = ["created", "ready", "attached", "moved", "detached"],
        c = [String, Number, Boolean, Object, Array, null],
        u = function() {},
        s = function() {};
      s.create = function(e) {
        var t = new s;
        return t.is = e.is || "", t.using = e.using || {}, t.generics = e.generics || {}, t.template = e.template, t.data = null, t.properties = Object.create(null), t.methods = Object.create(null), t.listeners = Object.create(null), t.relations = Object.create(null), t.ancestors = [], t.options = {
          publicProperties: !!(e.options && void 0 !== e.options.publicProperties ? e.options.publicProperties : i.publicProperties)
        }, t._unprepared = e, (e.options && void 0 !== e.options.lazyRegistration ? e.options.lazyRegistration : i.lazyRegistration) || s.prepare(t), e.is && (s._list[e.is] = t), t
      }, s.prepare = function(e) {
        var t = e._unprepared;
        if (t) {
          e._unprepared = null;
          var n = e.ancestors,
            r = "",
            i = 0;
          for (i = 0; i < (t.behaviors || []).length; i++) {
            var l = t.behaviors[i],
              f = l;
            "string" == typeof f && (f = s._list[l]), f._unprepared && s.prepare(f), "object" == typeof f.data && (null === e.data ? e.data = f.data : o.shallowMerge(e.data, f.data));
            for (r in f.generics) {
              var d = f.generics[r];
              "object" != typeof d && (d = {}), e.generics[r] = {
                default: d.default
              }
            }
            for (r in f.properties) e.properties[r] = f.properties[r];
            for (r in f.relations) e.relations[r] = f.relations[r];
            for (r in f.methods) e.methods[r] = f.methods[r];
            for (var p = 0; p < f.ancestors.length; p++) n.indexOf(f.ancestors[p]) < 0 && n.push(f.ancestors[p])
          }
          "object" == typeof t.data && (null === e.data ? e.data = t.data : o.shallowMerge(e.data, t.data));
          for (r in t.properties) {
            var h = t.properties[r];
            c.indexOf(h) >= 0 && (h = {
              type: h
            }), void 0 === h.value && (h.type === String ? h.value = "" : h.type === Number ? h.value = 0 : h.type === Boolean ? h.value = !1 : h.type === Array ? h.value = [] : h.value = null), e.properties[r] = {
              type: h.type,
              value: h.value,
              filter: h.filter,
              observer: h.observer,
              public: !!(void 0 === h.public ? e.options.publicProperties : h.public),
              observeAssignments: !!h.observeAssignments
            }
          }
          for (i = 0; i < a.length; i++) e[a[i]] = t[a[i]];
          for (r in t.listeners) e.listeners[r] = t.listeners[r];
          for (r in t.relations) {
            var v = t.relations[r];
            e.relations[r] = {
              target: v.target || r,
              type: v.type,
              linked: v.linked || u,
              linkChanged: v.linkChanged || u,
              unlinked: v.unlinked || u
            }
          }
          for (r in t.methods) "function" == typeof t.methods[r] && (e.methods[r] = t.methods[r]);
          n.push(e)
        }
      }, s._list = Object.create(null), s.prototype.hasBehavior = function(e) {
        this._unprepared && s.prepare(this);
        for (var t = 0; t < this.ancestors.length; t++)
          if (e instanceof s) {
            if (this.ancestors[t] === e) return !0
          } else if (this.ancestors[t] === s._list[e]) return !0;
        return !1
      }, s.prototype._getAllListeners = function() {
        for (var e = {}, t = this.ancestors, n = 0; n < t.length; n++) {
          var r = this.ancestors[n];
          for (var o in r.listeners) Object.prototype.hasOwnProperty.call(e, o) ? e[o].push(r.listeners[o]) : e[o] = [r.listeners[o]]
        }
        return e
      }, s.prototype._getAllLifeTimeFuncs = function() {
        var e = {},
          t = this.ancestors;
        return a.forEach(function(n) {
          for (var o = e[n] = r.create("Lifetime Method"), i = 0; i < t.length; i++) {
            var a = t[i];
            a[n] && o.add(a[n])
          }
        }), e
      }, e.exports = s
    }, function(e, t, n) {
      var r = n(1),
        o = null,
        i = null,
        a = function(e, t, n, r) {
          this._caller = e, this._updateCb = r, this._propUpdater = o, this._data = t, this._changes = [], this._childPaths = {}, this._propFields = n, this._hidingValue = !1
        },
        c = Object.prototype.hasOwnProperty,
        u = function(e, t, n, r) {
          e ? t._pathObservers ? t._pathObservers.push(r) : t._pathObservers = [r] : t._observers ? t._observers.push(r) : t._observers = [r]
        },
        s = function(e, t, n, r) {
          if (n.length) {
            for (var o = 0; o < n.length; o++) {
              var i = n[o];
              e._childPaths || (e._childPaths = {});
              var a = e._childPaths;
              a[i] || (a[i] = {
                _childPaths: {},
                _observers: null,
                _pathObservers: null
              }), e = a[i]
            }
            u(t, e, n[o], r)
          } else t && (e._pathObservers ? e._pathObservers.push(r) : e._pathObservers = [r])
        },
        l = function(e, t, n, r) {
          for (var o = 0; o < n.length; o++) {
            var i = n[o],
              a = e._childPaths;
            if (!a || !a[i]) return !1;
            e = a[i]
          }
          for (var c = t ? e._pathObservers : e._observers, u = 0; u < c.length; u++)
            if (c[u] === r) return c.splice(u, 1), !0;
          return !1
        };
      a.create = function(e, t, n, r) {
        return new a(e, t, n, r)
      }, a.setPropUpdater = function(e) {
        o = e
      }, a.setPropObserver = function(e) {
        i = e
      }, a.prototype.setHidingValue = function(e) {
        this._hidingValue = !!e
      }, a.prototype.addPathObserver = function(e, t) {
        s(this, !0, e, t)
      }, a.prototype.removePathObserver = function(e, t) {
        return l(this, !0, e, t)
      }, a.prototype.addObserver = function(e, t) {
        s(this, !1, e, t)
      }, a.prototype.removeObserver = function(e, t) {
        return l(this, !1, e, t)
      };
      var f = function(e, t, n) {
          var o = null,
            i = 0;
          if (e._pathObservers)
            for (o = e._pathObservers, i = 0; i < o.length; i++) r.safeCallback("Data Observer", o[i], t, e._hidingValue ? [] : [n, []]);
          if (e._observers)
            for (o = e._observers, i = 0; i < o.length; i++) r.safeCallback("Data Observer", o[i], t, e._hidingValue ? [] : [n]);
          if (e._childPaths)
            for (var a in e._childPaths) {
              var u = void 0;
              "object" == typeof n && null !== n && c.call(n, a) && (u = n[a]), f(e._childPaths[a], t, u)
            }
        },
        d = function(e, t, n, o, a) {
          for (var u = 0; u < n.length; u++) {
            if (e._pathObservers)
              for (var s = e._pathObservers, l = 0; l < s.length; l++) r.safeCallback("Data Observer", s[l], t, e._hidingValue ? [] : [o, n.slice(u)]);
            var d = n[u];
            if (e._propFields && e._propFields[d]) {
              var p = e._propFields[d];
              i.call(t, o, a, n, p, e._hidingValue)
            }
            var h = e._childPaths;
            if (!h || !c.call(h, d)) return;
            e = h[d]
          }
          f(e, t, o)
        };
      a.prototype.triggerObservers = function(e, t, n) {
        d(this, this._caller, e, t, n)
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
        for (var n = [], r = [], i = 0; i < t.length; i++) {
          var a = t[i],
            u = a[0],
            s = a[1],
            l = a[2],
            f = this._propFields[s[0]],
            v = void 0;
          if (f && 1 === s.length) v = this._data[s[0]], l = o.call(this._caller, s, f, l, this._hidingValue);
          else {
            for (var g = this._data, _ = s[0], y = 1; y < s.length; y++) {
              var b = s[y];
              "number" == typeof b && isFinite(b) ? c.call(g, _) && g[_] instanceof Array || (g[_] = []) : (!c.call(g, _) || null === g[_] || "object" != typeof g[_] || g[_] instanceof Array) && (g[_] = {}), g = g[_], _ = b
            }
            if (u) {
              var m = null !== l && "object" == typeof l;
              m && !(l instanceof Array) && c.call(g, _) && null !== g[_] && "object" == typeof g[_] && !(g[_] instanceof Array) ? h(g[_], l, this._propFields) : g[_] = m ? p(l) : l
            } else g[_] = l
          }
          n.push(s), r.push([l, v])
        }
        this._updateCb(n, t, e);
        for (var w = 0; w < r.length; w++) {
          var k = r[w];
          d(this, this._caller, n[w], k[0], k[1])
        }
      };
      var p = function(e) {
          var t = null;
          if (e instanceof Array) {
            t = [];
            for (var n = 0; n < e.length; n++) "object" == typeof e[n] ? t[n] = p(e[n]) : t[n] = e[n]
          } else {
            t = {};
            for (var r in e) "object" == typeof e[r] ? t[r] = p(e[r]) : t[r] = e[r]
          }
          return t
        },
        h = function(e, t, n) {
          for (var r in t) c.call(e, r) && "object" == typeof e[r] && null !== e[r] ? "object" == typeof t[r] && null !== t[r] ? t[r] instanceof Array ? e[r] = p(t[r]) : h(e[r], t[r]) : e[r] = t[r] : "object" == typeof t[r] && null !== t[r] ? e[r] = p(t[r]) : e[r] = t[r]
        },
        v = a.shallowMerge = function(e, t) {
          for (var n in t) c.call(e, n) ? "object" != typeof e[n] || "object" != typeof t[n] || null === t[n] || t[n] instanceof Array ? e[n] = t[n] : v(e[n], t[n]) : e[n] = t[n]
        };
      e.exports = a
    }, function(e, t, n) {
      var r = n(3),
        o = n(7),
        i = n(8),
        a = n(2),
        c = function(e) {
          u(this, e || null)
        };
      c.prototype = Object.create(Object.prototype, {
        constructor: {
          value: c,
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
            e = String(e), this.__slot !== e && (this.__inheritSlots || (this.__slot = e, _(this)))
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
      }), r._setElementSystem(c);
      var u = c.initialize = function(e, t) {
        e.__id = "", e.__slot = "", e.__virtual = !1, e.__inheritSlots = !1, e.__attributes = null, e.__attached = !1, e.parentNode = null, e.childNodes = [], e.ownerShadowRoot = null, e.__wxSlotParent = null, e.__wxSlotChildren = e.childNodes, e.__subtreeObserversCount = 0, e.classList = null, e.__methodCaller = e, e.__relationHandler = null, e.__domElement = t, t && (t.__wxElement = e)
      };
      c._clone = function(e, t, n) {
        e.__id = t.__id, e.__slot = t.__slot, e.__virtual = t.__virtual, e.__inheritSlots = t.__inheritSlots, e.__attributes = Object.create(null);
        for (var r in t.__attributes) e.__attributes[r] = t.__attributes[r];
        e.__attached = !1, e.parentNode = null, e.childNodes = [], e.ownerShadowRoot = null, e.__wxSlotParent = null, e.__wxSlotChildren = e.childNodes, e.__subtreeObserversCount = 0, e.classList = null, e.__methodCaller = e, e.__relationHandler = null, e.__domElement = n, n && (n.__wxElement = e)
      };
      var s = function(e) {
          if (!e.parentNode || e.parentNode.__attached) {
            var t = function(e) {
              if (e instanceof c) {
                e.__attached = !0, e.__lifeTimeFuncs && e.__lifeTimeFuncs.attached.call(e.__methodCaller, []), e.__relationHandler && e.__relationHandler("attached"), e.__attachedObservers && !e.__attachedObservers.empty && o._callSingleObserver(e, "__attachedObservers", {
                  type: "attachStatus",
                  target: e,
                  status: "attached"
                }), e.shadowRoot instanceof c && t(e.shadowRoot);
                for (var n = e.childNodes, r = 0; r < n.length; r++) t(n[r])
              }
            };
            t(e)
          }
        },
        l = function(e) {
          if (e.__attached) {
            var t = function(e) {
              if (e instanceof c) {
                for (var n = e.childNodes, r = 0; r < n.length; r++) t(n[r]);
                e.shadowRoot instanceof c && t(e.shadowRoot), e.__attached = !1, e.__lifeTimeFuncs && e.__lifeTimeFuncs.detached.call(e.__methodCaller, []), e.__relationHandler && e.__relationHandler("detached"), e.__attachedObservers && !e.__attachedObservers.empty && o._callSingleObserver(e, "__attachedObservers", {
                  type: "attachStatus",
                  target: e,
                  status: "detached"
                })
              }
            };
            t(e)
          }
        },
        f = function(e) {
          if (!e.__attached) return s(e);
          var t = function(e) {
            if (e instanceof c) {
              for (var n = e.childNodes, r = 0; r < n.length; r++) t(n[r]);
              e.shadowRoot instanceof c && t(e.shadowRoot), e.__lifeTimeFuncs && e.__lifeTimeFuncs.moved.call(e.__methodCaller, []), e.__relationHandler && e.__relationHandler("moved")
            }
          };
          t(e)
        },
        d = function(e, t, n) {
          if (e.__childObservers && !e.__childObservers.empty || e.__subtreeObserversCount) {
            var r = null,
              i = [n];
            r = "add" === t ? {
              type: "childList",
              target: e,
              addedNodes: i
            } : "remove" === t ? {
              type: "childList",
              target: e,
              removedNodes: i
            } : {
              type: "childList",
              target: e,
              addedNodes: i,
              removedNodes: i
            }, o._callObservers(e, "__childObservers", r)
          }
        },
        p = function(e, t, n) {
          var r = e.ownerShadowRoot,
            o = !1,
            u = !1,
            s = !1,
            l = !1,
            f = function(e) {
              if (e.ownerShadowRoot = t, e instanceof c) {
                if (t) {
                  var d = t.__wxHost.__componentOptions;
                  e.__domElement && e.__id && d.writeIdToDOM !== !(!r || !r.__wxHost.__componentOptions.writeIdToDOM) && (d.writeIdToDOM ? e.__domElement.id = e.__id : e.__domElement.id = ""), e.classList instanceof i && (e.classList._setPrefix(d.classPrefix, t.__wxHost.__using, d.addGlobalClass), a.writeExtraInfoToAttr && e.__domElement && e.__domElement.setAttribute("exparser:info-class-prefix", d.classPrefix && d.classPrefix + "--"))
                }
                n && (e.__id && (r && (o = !0), t && (s = !0)), void 0 !== e.__slotName && (r && (u = !0), t && (l = !0)));
                for (var p = e.childNodes, h = 0; h < p.length; h++) f(p[h])
              }
            };
          return f(e), o && (r.__wxHost.__idCacheDirty = !0), u && (r.__slotCacheDirty = !0), s && (t.__wxHost.__idCacheDirty = !0), l && (t.__slotCacheDirty = !0), r
        };
      c._updateIdMap = function(e) {
        var t = e.shadowRoot;
        if (e.__idCacheDirty) {
          e.__idCacheDirty = !1;
          var n = e.__idCache = Object.create(null),
            r = function(e) {
              e.__id && (n[e.__id] || (n[e.__id] = e));
              for (var t = e.childNodes, o = 0; o < t.length; o++) t[o] instanceof c && r(t[o])
            };
          r(t)
        }
      };
      var h = function(e) {
          e.__slotCacheDirty = !1;
          var t = e.__wxHost,
            n = null,
            r = Object.create(null);
          n = void 0 !== t.__singleSlot ? {
            "": t.__singleSlot
          } : t.__slots;
          var o = function(e) {
            void 0 !== e.__slotName && (r[e.__slotName] || (r[e.__slotName] = e));
            for (var t = e.childNodes, n = 0; n < t.length; n++) t[n] instanceof c && o(t[n])
          };
          o(e), void 0 !== t.__singleSlot ? t.__singleSlot !== r[""] && (r[""] && (r[""].__wxSlotChildren = t.childNodes), v(t, r, n, !0), t.__singleSlot && (t.__singleSlot.__wxSlotChildren = []), t.__singleSlot = r[""] || null) : (v(t, r, n, !1), t.__slots = r)
        },
        v = function(e, t, n, r) {
          var o = e.childNodes,
            i = 0;
          if (r) {
            var a = t[""];
            if (a)
              for (; i < o.length; i++) b(a, o[i], null, !1, !1, !1, -1);
            else if (a = n[""])
              for (; i < o.length; i++) b(a, null, o[i], !0, !1, !1, i)
          } else {
            var c = function(e) {
              for (var r = 0; r < e.length; r++) {
                var o = e[r],
                  i = o.__slot || "",
                  a = t[i];
                a ? b(a, o, null, !1, !0, !0) : (a = n[i]) && b(a, null, o, !0, !0, !0), o.__inheritSlots && c(o.childNodes)
              }
            };
            c(o)
          }
        },
        g = function(e, t, n, r) {
          for (var o = function(e, t, r) {
              var i = e.childNodes,
                a = 0;
              for (t && (a = i.indexOf(t) + (r ? 0 : 1)); a < i.length; a++) {
                var c = i[a];
                if (c.__slot === n) return c;
                if (c.__inheritSlots) {
                  var u = o(c, null, !1);
                  if (u) return u
                }
              }
              return null
            }; t !== e; t = t.parentNode) {
            var i = o(t.parentNode, t, r);
            if (i) return i;
            r = !1
          }
          return null
        },
        _ = function(e) {
          for (var t = e.parentNode; t && t.__inheritSlots;) t = t.parentNode;
          if (t && void 0 === t.__singleSlot) {
            var n = e.__slot || "",
              r = t.__slots[n];
            if (r) {
              var o = g(t, e, n, !1);
              b(r, e, o, !1, !0, !0)
            } else(r = e.__wxSlotParent) && b(r, null, e, !0, !0, !0)
          }
        },
        y = function(e, t, n, r, o) {
          var i = e;
          if (i instanceof c) {
            for (; i.__virtual;) {
              var a = i.__wxSlotParent;
              if (!a) {
                i = null;
                break
              }
              if (t && !n) {
                var u = a.__wxSlotChildren.indexOf(i);
                n = a.__wxSlotChildren[u + 1]
              }
              i = a
            }
            i instanceof c && (i = i.__domElement)
          }
          if (i) {
            var s = r,
              l = null,
              f = null;
            if (t)
              if (t.__virtual) {
                var d = document.createDocumentFragment(),
                  p = function(e) {
                    for (var t = 0; t < e.__wxSlotChildren.length; t++) {
                      var n = e.__wxSlotChildren[t];
                      n.__virtual ? p(n) : d.appendChild(n.__domElement)
                    }
                  };
                p(t), l = d
              } else l = t.__domElement;
            if (n)
              if (n.__virtual) {
                var h = e,
                  v = 0;
                if (r) {
                  var g = function(e) {
                    for (var t = 0; t < e.__wxSlotChildren.length; t++) {
                      var n = e.__wxSlotChildren[t];
                      n.__virtual ? g(n) : i.removeChild(n.__domElement)
                    }
                  };
                  g(n), s = !1, v = o + 1
                } else h = n.__wxSlotParent, v = n === t ? o : h.__wxSlotChildren.indexOf(n);
                if (t) {
                  var _ = function(e, t) {
                    for (; t < e.__wxSlotChildren.length; t++) {
                      var n = e.__wxSlotChildren[t];
                      if (!n.__virtual) return n;
                      var r = _(n, 0);
                      if (r) return r
                    }
                  };
                  n = null;
                  for (var y = h; !(n = _(y, v)) && y.__virtual; y = y.__wxSlotParent) v = y.__wxSlotParent.__wxSlotChildren.indexOf(y) + 1;
                  n && (f = n.__domElement)
                }
              } else f = n.__domElement;
            s ? l ? i.replaceChild(l, f) : i.removeChild(f) : l && (f ? i.insertBefore(l, f) : i.appendChild(l))
          } else if (t && t.__wxSlotParent) {
            var b = function(e) {
              if (e.__virtual)
                for (var t = 0; t < e.__wxSlotChildren.length; t++) b(e.__wxSlotChildren[t]);
              else {
                var n = e.__domElement;
                n && n.parentNode && n.parentNode.removeChild(n)
              }
            };
            b(t)
          }
        },
        b = function(e, t, n, r, o, i, u) {
          if (r && (n.__wxSlotParent = null), o && (u = e.__wxSlotChildren.indexOf(n)), t) {
            var s = t.__wxSlotParent;
            if (t.__wxSlotParent = e, s && i) {
              var l = s.__wxSlotChildren.indexOf(t);
              s.__wxSlotChildren.splice(l, 1), s === e && l < u && u--
            }
          }
          y(e, t, n, r, u), a.writeExtraInfoToAttr && (r && n instanceof c && n.__domElement && n.__domElement.removeAttribute("exparser:info-in-slot-of"), t instanceof c && t.__domElement && (void 0 !== e.__slotName && e.ownerShadowRoot ? t.__domElement.setAttribute("exparser:info-in-slot-of", e.ownerShadowRoot.__wxHost.__componentInstanceId) : t.__domElement.removeAttribute("exparser:info-in-slot-of"))), o && (-1 === u && (u = e.__wxSlotChildren.length), t ? e.__wxSlotChildren.splice(u, r ? 1 : 0, t) : e.__wxSlotChildren.splice(u, r ? 1 : 0))
        },
        m = function(e, t) {
          for (var n = e.childNodes, r = 0; r < n.length; r++) {
            var o = n[r];
            t(e, o), o.__inheritSlots && m(o, t)
          }
        },
        w = function(e, t, n, r) {
          if (void 0 !== e.__slotName) return !1;
          var i = -1;
          if (n && (i = e.childNodes.indexOf(n)) < 0) return !1;
          r && t === n && (r = !1);
          var a = null,
            c = e,
            u = e;
          if (t) {
            a = t.parentNode, t.parentNode = e;
            var v = e.__subtreeObserversCount;
            if (a) {
              var _ = a.childNodes.indexOf(t);
              a.childNodes.splice(_, 1), a === e && _ < i && i--, v -= a.__subtreeObserversCount
            }
            v && o._updateSubtreeCaches(t, v)
          }
          for (var y = e; y && y.__inheritSlots;) y = y.parentNode;
          for (var w = !y || !y.__slots, k = !w || e.__inheritSlots, S = a; S && S.__inheritSlots;) S = S.parentNode;
          var C = !S || !S.__slots,
            P = !C || a && a.__inheritSlots;
          if (w) void 0 !== e.__singleSlot && (c = u = e.__singleSlot), c ? b(c, t, n, r, k, P, i) : t.__wxSlotParent && b(t.__wxSlotParent, null, t, !0, P, !1), t && !C && t.__inheritSlots && m(t, function(e, t) {
            b(e, t, null, !1, !0, !0, -1)
          });
          else {
            var x = "";
            if (t && (x = t.__slot || "", c = y.__slots[x] || null), n && (u = y.__slots[n.__slot || ""] || null), n && u && r && b(u, null, n, r, !0, !1), t)
              if (c) {
                var M = n ? g(y, n, x, !r) : null;
                b(c, t, M, !1, !0, P)
              } else t.__wxSlotParent && b(t.__wxSlotParent, null, t, !0, P, !1);
            n && r && n.__inheritSlots && m(n, function(e, t) {
              b(e, t, null, !1, !0, !0, -1)
            }), t && t.__inheritSlots && m(t, function(e, t) {
              var o = t.__slot || "",
                i = y.__slots[o] || null;
              if (i) {
                var a = n ? g(y, n, o, !r) : null;
                b(i, t, a, !1, !0, !0)
              } else t.__wxSlotParent && b(t.__wxSlotParent, null, t, !0, !0, !1)
            })
          }
          r && (e.__subtreeObserversCount && o._updateSubtreeCaches(n, -e.__subtreeObserversCount), n.parentNode = null), -1 === i && (i = e.childNodes.length), t ? e.childNodes.splice(i, r ? 1 : 0, t) : e.childNodes.splice(i, r ? 1 : 0);
          var E = null,
            O = null;
          return r && null !== n.ownerShadowRoot && (E = p(n, null, !0)), t && t.ownerShadowRoot !== t.parentNode.ownerShadowRoot && (O = p(t, t.parentNode.ownerShadowRoot, !0)), r && (E && E.__slotCacheDirty && h(E), n.ownerShadowRoot && n.ownerShadowRoot.__slotCacheDirty && h(n.ownerShadowRoot)), t && (O && O.__slotCacheDirty && h(O), t.ownerShadowRoot && t.ownerShadowRoot.__slotCacheDirty && h(t.ownerShadowRoot)), r && (l(n), d(e, "remove", n)), t && (a ? f(t) : s(t), a === e ? d(e, "move", t) : (a && d(a, "remove", t), d(e, "add", t))), !0
        },
        k = function(e, t, n, r) {
          var o = r ? n : t;
          return w(e, t, n, r) ? o : null
        };
      c._attachShadowRoot = function(e) {
        var t = e.__wxHost;
        t.__wxSlotChildren = [e], b(t, e, null, !1, !1, 0), p(e, e, !1)
      }, c.appendChild = function(e, t) {
        return k(e, t, null, !1)
      }, c.insertBefore = function(e, t, n) {
        return k(e, t, n, !1)
      }, c.removeChild = function(e, t) {
        return k(e, null, t, !0)
      }, c.replaceChild = function(e, t, n) {
        return k(e, t, n, !0)
      }, c.prototype.appendChild = function(e) {
        return k(this, e, null, !1)
      }, c.prototype.insertBefore = function(e, t) {
        return k(this, e, t, !1)
      }, c.prototype.removeChild = function(e) {
        return k(this, null, e, !0)
      }, c.prototype.replaceChild = function(e, t) {
        return k(this, e, t, !0)
      }, c.prototype.triggerEvent = function(e, t, n) {
        r.triggerEvent(this, e, t, n)
      }, c.prototype.dispatchEvent = function(e) {
        r.dispatchEvent(this, e)
      }, c.prototype.addListener = function(e, t, n) {
        r.addListenerToElement(this, e, t, n)
      }, c.prototype.removeListener = function(e, t, n) {
        r.removeListenerFromElement(this, e, t, n)
      }, c.setMethodCaller = function(e, t) {
        e.__methodCaller = t
      }, c.getMethodCaller = function(e) {
        return e.__methodCaller
      }, c.prototype.getAttribute = function(e) {
        if (!this.__attributes) return null;
        var t = this.__attributes[e];
        return void 0 === t ? null : t
      }, c.prototype.setAttribute = function(e, t) {
        this.__attributes || (this.__attributes = Object.create(null)), t = String(t), this.__attributes[e] = t, this.__domElement && this.__domElement.setAttribute(e, t)
      }, c.prototype.removeAttribute = function(e) {
        this.__attributes && (delete this.__attributes[e], this.__domElement && this.__domElement.removeAttribute(e))
      }, c.replaceDocumentElement = function(e, t) {
        e.__attached || (t.parentNode.replaceChild(e.__domElement, t), s(e))
      }, c.pretendAttached = function(e) {
        e.__attached || s(e)
      }, c.pretendDetached = function(e) {
        e.__attached && l(e)
      }, c.isAttached = function(e) {
        return e.__attached
      }, c.setSlotName = function(e, t) {
        if (t = null == t ? "" : String(t), void 0 === e.__slotName) {
          if (0 !== e.childNodes.length || 0 !== e.__wxSlotChildren.length) return;
          e.__wxSlotChildren = []
        }
        e.__slotName = t, e.ownerShadowRoot && h(e.ownerShadowRoot)
      }, c.setInheritSlots = function(e) {
        e.__singleSlot || e.__slots || e.__wxSlotChildren.length || (e.__wxSlotChildren = [], e.__inheritSlots = !0)
      }, c.getInheritSlots = function(e) {
        return e.__inheritSlots
      };
      var S = function(e, t) {
          var n = e.match(/^(#[_a-zA-Z][-_a-zA-Z0-9:]*|)((?:\.-?[_a-zA-Z][-_a-zA-Z0-9]*)+|)$/);
          if (!n) return null;
          var r = n[1].slice(1),
            o = n[2].split(".");
          return o.shift(), r || o.length ? {
            id: r,
            classes: o,
            relation: t || ""
          } : null
        },
        C = c.parseSelector = function(e) {
          for (var t = e.split(","), n = [], r = !1, o = 0; o < t.length; o++) {
            for (var i = t[o].split(/( |\t|>+)/g), a = [], c = "", u = 0; u < i.length; u++) {
              var s = i[u];
              if (s && " " !== s && "\t" !== s)
                if (">" !== s[0]) {
                  var l = S(s, c);
                  if (c = "", !l) break;
                  a.push(l)
                } else {
                  if ("" !== c) break;
                  c = s, ">>>" === s && (r = !0)
                }
            }
            u === i.length && a.length && n.push(a)
          }
          return n.length ? {
            crossShadow: r,
            union: n
          } : null
        },
        P = function(e, t, n, r, o) {
          if (t === e) return !1;
          var i = n[r],
            a = !0;
          i.id && i.id !== t.__id && (a = !1);
          for (var c = i.classes, u = 0; a && u < c.length; u++) t.classList.contains(c[u]) || (a = !1);
          if (!a && ">" === o) return !1;
          var s = t;
          if (a && 0 === r) {
            if (null === e) return !0;
            for (s = s.parentNode; s; s = s.parentNode)
              if (s === e) return !0;
            if (">>>" !== o) return !1;
            s = t, a = !1
          }
          var l = a ? i.relation : o;
          do {
            s.parentNode ? s = s.parentNode : ">>>" === l ? s = s.__wxHost : ">>>" === o ? (a = !1, s = s.__wxHost) : s = null, s === e && (s = null)
          } while (s && s.__virtual);
          if (!s) return !1;
          if (a) {
            if (P(e, s, n, r - 1, l)) return !0;
            if (">>>" !== o) return !1
          }
          return P(e, s, n, r, o)
        },
        x = function(e, t, n) {
          if (n.__virtual) return !1;
          for (var r = e.union, o = 0; o < r.length; o++) {
            var i = r[o];
            if (P(t, n, i, i.length - 1, ">")) return !0
          }
          return !1
        },
        M = function(e, t, n, r, o) {
          if (x(t, n, r) && (e.push(r), o)) return !0;
          if (r.shadowRoot && t.crossShadow) {
            if ((r.ownerShadowRoot ? r.ownerShadowRoot.__wxHost.__componentOptions.domain : a.domain) === r.__componentOptions.domain && M(e, t, n, r.shadowRoot, o) && o) return !0
          }
          for (var i = r.childNodes, u = 0; u < i.length; u++)
            if (i[u] instanceof c && M(e, t, n, i[u], o) && o) return !0;
          return !1
        };
      c.prototype.querySelector = function(e) {
        var t = "object" == typeof e ? e : C(e);
        if (!t) return null;
        var n = [];
        return M(n, t, this, this, !0), n[0] || null
      }, c.prototype.querySelectorAll = function(e) {
        var t = "object" == typeof e ? e : C(e),
          n = [];
        return t ? (M(n, t, this, this, !1), n) : []
      }, c.matchSelector = function(e, t) {
        var n = "object" == typeof e ? e : C(e);
        return !!n && x(n, null, t)
      }, c.prototype.matchSelector = function(e, t) {
        var n = "object" == typeof e ? e : C(e);
        return !!n && x(n, this, t)
      }, e.exports = c
    }, function(e, t, n) {
      var r = n(1),
        o = function() {};
      o.prototype = Object.create(Object.prototype, {
        constructor: {
          value: o,
          writable: !0,
          configurable: !0
        }
      }), o.create = function(e) {
        var t = new o;
        return t._cb = e, t._noSubtreeCb = function(t) {
          t.target === this && e.call(this, t)
        }, t._binded = [], t
      }, o.prototype.observe = function(e, t) {
        t = t || {};
        var n = 0,
          o = t.subtree ? this._cb : this._noSubtreeCb;
        t.properties && (e.__propObservers || (e.__propObservers = r.create("Observer Callback")), this._binded.push({
          funcArr: e.__propObservers,
          id: e.__propObservers.add(o),
          subtree: t.subtree ? e : null
        }), n++), t.childList && (e.__childObservers || (e.__childObservers = r.create("Observer Callback")), this._binded.push({
          funcArr: e.__childObservers,
          id: e.__childObservers.add(o),
          subtree: t.subtree ? e : null
        }), n++), t.characterData && (e.__textObservers || (e.__textObservers = r.create("Observer Callback")), this._binded.push({
          funcArr: e.__textObservers,
          id: e.__textObservers.add(o),
          subtree: t.subtree ? e : null
        }), n++), t.subtree && i(e, n), t.attachStatus && (e.__attachedObservers || (e.__attachedObservers = r.create("Observer Callback")), this._binded.push({
          funcArr: e.__attachedObservers,
          id: e.__attachedObservers.add(o),
          subtree: null
        }))
      }, o.prototype.disconnect = function() {
        for (var e = this._binded, t = 0; t < e.length; t++) {
          var n = e[t];
          n.funcArr.remove(n.id), n.subtree && i(n.subtree, -1)
        }
        this._binded = []
      };
      var i = o._updateSubtreeCaches = function(e, t) {
        e.__subtreeObserversCount += t;
        var n = e.childNodes;
        if (n)
          for (var r = 0; r < n.length; r++) i(n[r], t)
      };
      o._callObservers = function(e, t, n) {
        do {
          e[t] && e[t].call(e, [n]), e = e.parentNode
        } while (e && e.__subtreeObserversCount)
      }, o._callSingleObserver = function(e, t, n) {
        e[t] && e[t].call(e, [n])
      }, e.exports = o
    }, function(e, t) {
      var n = function() {};
      n.create = function(e) {
        var t = new n;
        return t._prefix = null, t._using = null, t._rawNames = [], t._elem = e, t
      };
      var r = function(e) {
          var t = "",
            n = e._rawNames,
            r = e._prefix;
          if (!r) return n.join(" ");
          r += "--";
          for (var o = 0; o < n.length; o++) o && (t += " "), e._addOriginalClass && (t += n[o] + " "), t += r + n[o];
          return t
        },
        o = function(e) {
          var t = e._elem.__domElement;
          if (t) {
            var n = r(e);
            n ? t.setAttribute("class", n) : t.removeAttribute("class")
          }
        };
      n.prototype.toggle = function(e, t) {
        var n = this._rawNames.indexOf(e);
        void 0 === t && (t = n < 0), t ? n < 0 && (this._rawNames.push(e), o(this)) : n >= 0 && (this._rawNames.splice(n, 1), o(this))
      }, n.prototype.contains = function(e) {
        return this._rawNames.indexOf(e) >= 0
      }, n.prototype._setPrefix = function(e, t, n) {
        var r = this._prefix;
        this._prefix = e, r !== e && (this._using = t, this._addOriginalClass = n, o(this))
      }, n.prototype.setClassNames = function(e) {
        e = void 0 === e || null === e ? "" : String(e), this._rawNames = e.match(/-?[_0-9a-z][-_0-9a-z]*/gi) || [], o(this)
      }, n.prototype.getClassNames = function() {
        return r(this)
      }, e.exports = n
    }, function(e, t, n) {
      var r = n(1),
        o = n(5),
        i = n(3),
        a = n(4),
        c = n(6),
        u = n(10),
        s = n(7),
        l = n(8),
        f = n(2),
        d = i.addListenerToElement,
        p = function() {};
      p.prototype = Object.create(c.prototype, {
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
            return c._updateIdMap(this), this.__idCache
          },
          set: function() {}
        }
      });
      var h = function() {};
      h.prototype = Object.create(Object.prototype);
      var v = null;
      p._setDefaultTemplateEngine = function(e) {
        v = e, delete p._setDefaultTemplateEngine
      };
      var g = function(e, t) {
          return t === String ? null === e || void 0 === e ? "" : String(e) : t === Number ? isFinite(e) ? Number(e) : 0 : t === Boolean ? !!e : t === Array ? e instanceof Array ? e : [] : t === Object ? "object" == typeof e ? e : null : void 0 === e ? null : e
        },
        _ = function(e, t, n) {
          var r = t.replace(/[A-Z]/g, function(e) {
              return "-" + e.toLowerCase()
            }),
            o = typeof n;
          "boolean" === o ? n ? e.__domElement.setAttribute(r, "") : e.__domElement.removeAttribute(r) : "object" === o ? e.__domElement.setAttribute(r, JSON.stringify(n)) : e.__domElement.setAttribute(r, n)
        };
      o.setPropUpdater(function(e, t, n, o) {
        var i = e[0],
          a = this.__propData[i];
        if (n = g(n, t.type), t.filter) {
          var c = r.safeCallback("Property Filter", t.filter, this.__methodCaller, o ? [] : [n, a, e]);
          void 0 !== c && (n = c)
        }
        return this.__propData[i] = n, this.__domElement && this.__componentOptions.reflectToAttributes && this.__propPublic[i] && _(this, i, n), n
      }), o.setPropObserver(function(e, t, n, o, i) {
        if (o.observeAssignments || e !== t || "object" == typeof newValue) {
          var a = n[0];
          o.observer && r.safeCallback("Property Observer", o.observer, this.__methodCaller, i ? [] : [e, t, n]), o.public && (this.__propObservers && !this.__propObservers.empty || this.__subtreeObserversCount) && s._callObservers(this, "__propObservers", {
            type: "properties",
            target: this,
            propertyName: a
          })
        }
      });
      var y = function(e, t, n) {
          t.__relationLinks || (t.__relationLinks = {});
          for (var r = t.__relationLinks[n] = [], o = 0; o < e.length; o++) r.push(null)
        },
        b = function(e, t, n, r, o) {
          for (var i = p.prototype.hasBehavior, c = 0; c < e.length; c++) {
            var u = e[c],
              s = null;
            if (s = "object" != typeof u.target ? a._list[u.target] : u.target) {
              var l = t[c],
                f = null;
              if (!o)
                for (var d = n.parentNode; d; d = d.parentNode)
                  if (!d.__virtual) {
                    if (i.call(d, s))
                      for (var h = r ? d.__relationMap.descendant : d.__relationMap.child, v = 0; v < h.length; v++) {
                        var g = h[v],
                          _ = null;
                        if ((_ = "object" != typeof g.target ? a._list[g.target] : g.target) && i.call(n, _)) {
                          f = {
                            parent: d,
                            relation: g
                          };
                          break
                        }
                      }
                    if (!r || f) break
                  }
              t[c] = f, !l || f && l.parent === f.parent || (l.relation.unlinked.call(l.parent.__methodCaller, n.__methodCaller), u.unlinked.call(n.__methodCaller, l.parent.__methodCaller)), !f || l && l.parent === f.parent || (f.relation.linked.call(f.parent.__methodCaller, n.__methodCaller), u.linked.call(n.__methodCaller, f.parent.__methodCaller)), l && f && l.parent === f.parent && (f.relation.linkChanged.call(f.parent.__methodCaller, n.__methodCaller), u.linkChanged.call(n.__methodCaller, f.parent.__methodCaller))
            }
          }
        },
        m = function(e, t) {
          var n = [],
            r = "descendant" === t.type,
            o = function(i) {
              for (var a = i.childNodes, u = 0; u < a.length; u++) {
                var s = a[u];
                if (s instanceof c)
                  if (s.__virtual) o(s);
                  else {
                    if (s.__relationLinks) {
                      var l = r ? s.__relationLinks.ancestor : s.__relationLinks.parent;
                      if (l)
                        for (var f = 0; f < l.length; f++) {
                          var d = l[f];
                          if (d && d.parent === e && d.relation === t) {
                            n.push(s);
                            break
                          }
                        }
                    }
                    r && o(s)
                  }
              }
            };
          return o(e), n
        };
      p._list = {}, p.register = function(e) {
        var t = e.options || {},
          n = a.create(e),
          r = void 0 !== t.classPrefix ? t.classPrefix : f.classPrefix;
        null !== r && void 0 !== r || (r = n.is || "");
        var o = new h;
        return o._unprepared = n, o.is = e.is || "", o.behavior = n, o.protoFunc = null, o.props = null, o.template = null, o.defaultValuesJSON = "", o.innerEvents = null, o.generics = n.generics, o.options = {
          domain: t.domain || f.domain,
          writeOnly: !!(void 0 !== t.writeOnly ? t.writeOnly : f.writeOnly),
          allowInWriteOnly: !!(void 0 !== t.allowInWriteOnly ? t.allowInWriteOnly : f.allowInWriteOnly),
          classPrefix: r,
          addGlobalClass: !!(void 0 !== t.addGlobalClass ? t.addGlobalClass : f.addGlobalClass),
          templateEngine: t.templateEngine || f.templateEngine || v,
          renderingMode: t.renderingMode || f.renderingMode,
          multipleSlots: !!(void 0 !== t.multipleSlots ? t.multipleSlots : f.multipleSlots),
          reflectToAttributes: !!(void 0 !== t.reflectToAttributes ? t.reflectToAttributes : f.reflectToAttributes),
          writeFieldsToNode: !!(void 0 !== t.writeFieldsToNode ? t.writeFieldsToNode : f.writeFieldsToNode),
          writeIdToDOM: !!(void 0 !== t.writeIdToDOM ? t.writeIdToDOM : f.writeIdToDOM)
        }, n._unprepared || p.prepare(o), void 0 !== e.is && (p._list[n.is] = o), o
      }, p.isPrepared = function(e) {
        return !e._unprepared
      }, p.prepare = function(e) {
        var t = e._unprepared;
        if (t) {
          e._unprepared = null;
          var n = e.options,
            r = {};
          t._unprepared && a.prepare(t), n.writeOnly && (r.data = {
            value: null
          });
          var o = e.props = {};
          Object.keys(t.properties).forEach(function(e) {
            var i = t.properties[e];
            o[e] = {
              type: i.type,
              value: i.value,
              filter: "function" == typeof i.filter ? i.filter : null == i.filter ? null : t.methods[i.filter],
              observer: "function" == typeof i.observer ? i.observer : null == i.observer ? null : t.methods[i.observer],
              public: i.public,
              observeAssignments: i.observeAssignments
            }, n.writeFieldsToNode && (r[e] = {
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
          var i = e.protoFunc = function() {},
            c = i.prototype = Object.create(p.prototype, r);
          if (c.is = e.is, c.__componentOptions = n, c.__using = t.using, c.__behavior = t, n.writeFieldsToNode)
            for (var u in t.methods) c[u] = t.methods[u];
          c.__lifeTimeFuncs = t._getAllLifeTimeFuncs();
          var s = t.relations,
            l = c.__relationMap = {};
          for (var f in s) {
            var d = s[f],
              h = d.type;
            l[h] ? l[h].push(d) : l[h] = [d]
          }
          var v = [];
          l.parent && v.push(function(e) {
            b(this.__relationMap.parent, this.__relationLinks.parent, this, !1, "detached" === e)
          }), l.ancestor && v.push(function(e) {
            b(this.__relationMap.ancestor, this.__relationLinks.ancestor, this, !0, "detached" === e)
          }), e.relationHandler = function(e) {
            for (var t = 0; t < v.length; t++) v[t].call(this, e)
          };
          var g = {},
            _ = {},
            y = t.data,
            m = "";
          for (m in y) _[m] = y[m];
          for (m in o) {
            var w = o[m];
            _[m] = w.value, g[m] = w.public
          }
          e.defaultValuesJSON = JSON.stringify(_);
          var k = n.templateEngine;
          e.template = k.create(t, _, n), c.__propPublic = g;
          var S = t._getAllListeners(),
            C = e.innerEvents = [];
          for (var P in S) {
            for (var x = S[P], M = P.indexOf("."), E = P.slice(M + 1), O = M < 1 ? "" : P.slice(0, M), T = [], I = 0; I < x.length; I++) {
              var A = x[I];
              "function" != typeof A && (A = null == A ? null : t.methods[A]), T.push(A)
            }
            C.push({
              id: O,
              name: E,
              funcs: T
            })
          }
        }
      };
      var w = 1,
        k = Object.prototype.hasOwnProperty,
        S = function(e, t) {
          return function(n) {
            return e.call(t.__methodCaller, n)
          }
        },
        C = function(e, t, n) {
          var r = n.domain,
            o = {};
          for (var i in e) {
            var a = e[i],
              c = t[i];
            "object" != typeof c && (c = p._list[c]), "object" != typeof c && null != a.default && (c = p._list[a.default]), c && (r === c.options.domain || c.options.writeOnly) && (o[i] = c)
          }
          return o
        },
        P = p._advancedCreate = function(e, t, n, r) {
          var i = t;
          i._unprepared && p.prepare(i);
          var a = i.options,
            u = i.protoFunc,
            s = new u,
            h = i.generics;
          s.__generics = h ? C(h, n || {}, a) : {};
          var v = null;
          "dom" === f.documentBackend ? (v = document.createElement(e), c.initialize(s, v)) : c.initialize(s, null), s.classList = l.create(s), f.writeExtraInfoToAttr && v && (s.__componentInstanceId = w++, v.setAttribute("exparser:info-component-id", s.__componentInstanceId)), s.__propData = JSON.parse(i.defaultValuesJSON), s.__dataProxy = o.create(s, s.__propData, i.props, function(e, t, n) {
            s.__templateInstance.updateValues(s, s.__propData, e, t, n)
          }), a.writeOnly && s.__dataProxy.setHidingValue(!0);
          var g = s.__templateInstance = i.template.createInstance(s, s.__propData, r);
          s.__idCacheDirty = !1, s.__idCache = g.idMap, s.$$ = v, null === g.slots[""] && (g.slots[""] = v), i.options.multipleSlots ? s.__slots = g.slots : (s.__singleSlot = g.slots[""] || null, s.__singleSlot && (s.__singleSlot.__wxSlotChildren = s.childNodes)), g.shadowRoot instanceof c ? (s.shadowRoot = g.shadowRoot, c._attachShadowRoot(g.shadowRoot)) : (s.shadowRoot = v, v.__wxHost = s, s.__domElement.appendChild(g.shadowRoot), s.__wxSlotChildren = [v], v.__wxSlotParent = s);
          for (var _ = g.listeners, b = 0; b < _.length; b++) {
            var m = _[b];
            d(m.target, m.name, S(m.func, s))
          }
          for (var k = i.innerEvents, P = 0; P < k.length; P++) {
            var x = k[P],
              M = x.id ? "this" === x.id ? s : s.__idCache[x.id] : s.shadowRoot;
            if (M)
              for (var E = x.name, O = x.funcs, T = 0; T < O.length; T++) d(M, E, S(O[T], s))
          }
          var I = s.__relationMap;
          return I.parent && (y(I.parent, s, "parent"), s.__relationHandler = i.relationHandler), I.ancestor && (y(I.ancestor, s, "ancestor"), s.__relationHandler = i.relationHandler), s.__lifeTimeFuncs.created.call(s.__methodCaller, []), s
        };
      p.create = function(e, t, n) {
        return "object" == typeof e ? P(e.is, e, null, n) : e ? e.indexOf("-") < 0 && !t ? u.create(e) : P(e.toLowerCase(), t || k.call(p._list, e) && p._list[e] || p._list[""], null, n) : P("virtual", p._list[""], null, n)
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
          for (var n = this.__relationMap[t.type], r = 0; r < n.length && n[r] !== t; r++);
          return this.__relationLinks[t.type][r] ? [this.__relationLinks[t.type][r].parent] : []
        }
        return m(this, t)
      };
      var x = function(e) {
        for (var t = e.length, n = [], r = "", o = 0, i = !1, a = !1, c = 0; c < t; c++) {
          var u = e[c];
          if ("\\" === u) c + 1 < t && ("." === e[c + 1] || "[" === e[c + 1] || "]" === e[c + 1] || "\\" === e[c + 1]) ? (r += e[c + 1], c++) : r += "\\";
          else if ("." === u) r && (n.push(r), r = "");
          else if ("[" === u) {
            if (r && (n.push(r), r = ""), 0 === n.length) throw new Error("The path string should not start with []: " + e);
            a = !0, i = !1
          } else if ("]" === u) {
            if (!i) throw new Error("There should be digits inside [] in the path string: " + e);
            a = !1, n.push(o), o = 0
          } else if (a) {
            if (u < "0" || u > "9") throw new Error("Only digits (0-9) can be put inside [] in the path string: " + e);
            i = !0, o = 10 * o + u.charCodeAt(0) - 48
          } else r += u
        }
        if (r && n.push(r), 0 === t) throw new Error("The path string should not be empty");
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
        for (var n in e) t.scheduleReplace(x(n), e[n]);
        t.doUpdates()
      }, e.exports = p
    }, function(e, t, n) {
      var r = n(6),
        o = n(8),
        i = n(2),
        a = function() {};
      a.prototype = Object.create(r.prototype, {
        constructor: {
          value: a,
          writable: !0,
          configurable: !0
        }
      }), a.create = function(e) {
        var t = new a;
        t.is = e.toLowerCase();
        var n = null;
        return "dom" === i.documentBackend && (n = document.createElement(e)), r.initialize(t, n), t.$$ = n, t.classList = o.create(t), t
      }, a.cloneNode = function(e) {
        var t = new a;
        t.is = e.is;
        var n = null;
        return e.__domElement && (n = document.importNode ? document.importNode(e.__domElement, !1) : e.__domElement.cloneNode(!1)), r._clone(t, e, n), t.$$ = n, t.classList = o.create(t), t
      }, e.exports = a
    }, function(e, t, n) {
      var r = n(7),
        o = n(2),
        i = function() {};
      i.prototype = Object.create(Object.prototype, {
        constructor: {
          value: i,
          writable: !0,
          configurable: !0
        }
      }), i.create = function(e) {
        var t = new i;
        t.__slot = "";
        var n = null;
        return "dom" === o.documentBackend ? (n = document.createTextNode(e || ""), n.__wxElement = t) : t.__textContent = e, t.$$ = t.__domElement = n, t.__subtreeObserversCount = 0, t.parentNode = null, t.ownerShadowRoot = null, t
      }, Object.defineProperty(i.prototype, "textContent", {
        get: function() {
          return this.__domElement ? this.__domElement.textContent : this.__textContent
        },
        set: function(e) {
          this.__domElement ? this.__domElement.textContent = e : this.__textContent = String(e), (this.__textObservers && !this.__textObservers.empty || this.__subtreeObserversCount) && r._callObservers(this, "__textObservers", {
            type: "characterData",
            target: this
          })
        }
      }), e.exports = i
    }, function(e, t, n) {
      var r = n(6),
        o = n(2),
        i = function(e) {
          a(this, e)
        };
      i.prototype = Object.create(r.prototype);
      var a = i.initialize = function(e, t) {
        e.is = t || "";
        var n = null;
        "dom" === o.documentBackend && (n = void 0), r.initialize(e, n), e.__virtual = !0
      };
      i.create = function(e) {
        return new i(e)
      }, e.exports = i
    }, function(e, t, n) {
      var r = n(6),
        o = n(9),
        i = n(12),
        a = n(11),
        c = Object.prototype.hasOwnProperty,
        u = function(e) {
          i.initialize(this, "shadow"), this.__wxHost = e, this.__slotCacheDirty = !1, this.ownerShadowRoot = null
        };
      u.prototype = Object.create(i.prototype), u.create = function(e) {
        return new u(e)
      };
      var s = function(e, t) {
        var n = {};
        for (var r in e) {
          var i = e[r];
          "object" != typeof i && (c.call(t.__using, i) ? i = t.__using[i] : c.call(t.__generics, i) && (i = t.__generics[i] || o._list[""]), n[r] = i)
        }
        return n
      };
      u.prototype.createComponent = function(e, t, n, r) {
        var i = null;
        i = void 0 === t ? e : t;
        var a = this.__wxHost;
        return "object" != typeof i && (c.call(a.__using, i) ? i = a.__using[i] : c.call(a.__generics, i) && (i = a.__generics[i]), "object" != typeof i && (i = o._list[i] || o._list[""])), n && (n = s(n, a)), "object" == typeof e && (e = i.is), a.__componentOptions.writeOnly && !i.options.allowInWriteOnly && (i = o._list[""]), o._advancedCreate(e, i, n, r)
      }, u.prototype.tagNameUsed = function(e) {
        var t = this.__wxHost;
        return !!c.call(t.__using, e) || !!c.call(t.__generics, e)
      }, u.prototype.getHostNode = function() {
        return this.__wxHost
      }, u.prototype.createTextNode = function(e) {
        return a.create(e)
      }, u.prototype.createVirtualNode = function(e) {
        return i.create(e)
      }, u.prototype.getElementById = function(e) {
        return r._updateIdMap(this.__wxHost), this.__wxHost.__idCache[e]
      }, e.exports = u
    }, function(e, t, n) {
      (function(t) {
        var r = n(2),
          o = n(1),
          i = n(6),
          a = n(10),
          c = n(12),
          u = n(11),
          s = n(13),
          l = n(9),
          f = n(16),
          d = n(17),
          p = function() {};
        p.prototype = Object.create(Object.prototype, {
          constructor: {
            value: p,
            writable: !0,
            configurable: !0
          }
        });
        var h = function() {};
        h.prototype = Object.create(Object.prototype, {
          constructor: {
            value: h,
            writable: !0,
            configurable: !0
          }
        });
        var v = null;
        p.precompiler = v;
        var g = function(e) {
            return e.replace(/-([a-z])/g, function(e, t) {
              return t.toUpperCase()
            })
          },
          _ = Object.prototype.hasOwnProperty,
          y = function(e, t) {
            if (null !== e && "object" == typeof e && _.call(e, t)) return e[t]
          },
          b = function(e, t, n, r) {
            if (_.call(t, n)) {
              var i = t[n];
              if ("function" == typeof i) return o.safeCallback("Template Method", i, e, r)
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
          w = {
            t: 1,
            n: '"slot"',
            v: !0,
            sn: "",
            a: [],
            c: [],
            p: null
          },
          k = function(e, t, n) {
            e.classList.toggle(t, !!n)
          },
          S = function(e, t, n) {
            e[t] = n
          },
          C = function(e, t, n) {
            e.class = n
          },
          P = function(e, t, n) {
            e.setAttribute("style", n)
          },
          x = function(e, t, n) {
            e.setAttribute("class", n)
          },
          M = function(e, t, n) {
            e.textContent = n
          },
          E = function(e, t, n) {
            e.dataset || (e.dataset = {}), e.dataset[t] = n
          },
          O = {
            $: function(e, t, n) {
              !0 === n ? e.setAttribute(t, "") : !1 === n || void 0 === n || null === n ? e.removeAttribute(t) : e.setAttribute(t, n)
            },
            ":": S,
            c: k,
            s: function(e, t, n) {
              var r = e.style;
              r && (r[t] = n)
            },
            d: E
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
        p.create = function(e, n, r) {
          var o = void 0 === e.template ? T : e.template,
            i = o;
          if ("function" != typeof o)
            if (v && "undefined" != typeof window && "undefined" != typeof document) {
              var a = "__exparserFreeTmpl",
                c = v.compile(o),
                u = document.createElement("script");
              u.type = "text/javascript", u.innerHTML = "window." + a + "=" + c, document.head.appendChild(u), document.head.removeChild(u), i = window[a], window[a] = null
            } else i = void 0 !== t && void 0 !== t.versions && void 0 !== t.versions.node ? p.precompileAndGetCreator(o) : m;
          var s = Object.create(p.prototype);
          return s._tagTreeRoot = I(i, n, e.methods, r), s._renderingMode = r.renderingMode, s
        };
        var I = function(e, t, n, o) {
            var i = o.renderingMode,
              c = "native" === i,
              u = c,
              s = !1,
              l = Object.create(null);
            c && !r.hasDOMBackend && (e = m);
            var f = {},
              p = e(y, b, n),
              h = function(e) {
                for (var n = 0; n < e.length; n++) {
                  var r = e[n];
                  if (3 !== r.t) {
                    var o = r.n,
                      i = !(c || "string" == typeof o && o.indexOf("-") < 0);
                    "slot" === o && "" === r.sn && (s = !0), r.n = o;
                    var l = r.st;
                    l && l.e && (l.o = P, u && (l.v = l.e(t, f, null)));
                    var p = r.cl;
                    p && p.e && (p.o = c ? x : C, u && (p.v = p.e(t, f, null)));
                    var v = null;
                    i || (r.p = v = c ? document.createElement(r.n) : a.create(r.n), l && void 0 !== l.v && v.setAttribute("style", l.v), c && p && void 0 !== p.v && v.setAttribute("class", p.v));
                    for (var _ = r.a, y = 0; y < _.length; y++) {
                      var b = _[y];
                      if (b.d) c || d[b.n].register(b.n, b, r);
                      else {
                        c || ("bind" === b.n.slice(0, 4) ? (b.evCatch = !1, b.ev = g(b.n.slice(4)), ":" === b.ev[0] && (b.ev = b.ev.slice(1))) : "catch" === b.n.slice(0, 5) && (b.evCatch = !0, b.ev = g(b.n.slice(5)), ":" === b.ev[0] && (b.ev = b.ev.slice(1))));
                        var m = b.o;
                        if (i) m ? b.o = "&" === m ? O[":"] : O[m] : (b.o = O[":"], b.n = g(b.n)), u && b.e && (b.v = b.e(t, f, null));
                        else if (!b.ev) {
                          var w = O;
                          b.o = m ? "&" === m ? w[":"] : w[m] : w.$, u ? (b.e && (b.v = b.e(t, f, null)), (b.o !== k || c) && b.o(v, b.n, b.v)) : b.e || b.o(v, b.n, b.v)
                        }
                      }
                    }
                    h(r.c), c && (1 !== r.c.length || void 0 === r.c[0].sn || r.c[0].compressed || (r.sn = r.c[0].sn, r.compressed = !0, r.c.pop()))
                  } else r.e && (r.o = M, r.c = u ? r.e(t, f, null) : "")
                }
              };
            return h(p, l, !0), c && (s || p.push(w), 1 !== p.length || "" !== p[0].sn || p[0].compressed || p.pop()), p
          },
          A = function(e, t) {
            return function(n) {
              if (this[e](n), t) return !1
            }
          },
          j = function(e, t, n, r, o, s, p, h) {
            for (var v = null, g = 0, _ = null, y = 0; y < e.length; y++) {
              var b = p,
                m = e[y];
              if (3 === m.t) v = m.e ? u.create(m.e(r, o, null)) : u.create(m.c), m.e && f.addBindings(s, b, m.b, v, m), i.appendChild(n, v);
              else {
                var w = m.cl,
                  C = m.st,
                  P = m.a,
                  x = !1;
                for (g = 0; g < P.length; g++)
                  if (_ = P[g], _.d) {
                    var M = d[_.n].create(_.n, _, m, r, o, s, b, h, t, j, n);
                    if (d[_.n].requireBlock) {
                      v = M, i.appendChild(n, v), x = !0;
                      break
                    }
                  }
                if (x) continue;
                if (m.v) v = c.create(m.n);
                else if (m.p) {
                  for (v = a.cloneNode(m.p), g = 0; g < P.length; g++) _ = P[g], _.d || (_.ev ? h(v, _.ev, _.v, _.evCatch) : _.o === S ? v.__domElement && (_.o(v.__domElement, _.n, _.e(r, o, null)), f.addBindings(s, b, _.b, v.__domElement, _)) : (_.e && _.o(v, _.n, _.e(r, o, null)), (_.e || _.o === k || _.o === E) && f.addBindings(s, b, _.b, v, _)));
                  C && C.e && (v.setAttribute("style", C.e(r, o, null)), f.addBindings(s, b, C.b, v, C))
                } else {
                  for (v = t.createComponent(m.n, void 0, m.g), g = 0; g < P.length; g++)
                    if (_ = P[g], !_.d) {
                      var O = _.v;
                      _.o === S && l.hasPublicProperty(v, _.n) ? (_.e && (O = _.e(r, o, null), f.addBindings(s, b, _.b, v, _)), _.e ? _.o(v, _.n, O) : v.__behavior.properties[_.n].type === Boolean ? v[_.n] = !0 : v[_.n] = O) : _.ev ? h(v, _.ev, O, _.evCatch) : _.o !== S && (_.e && (O = _.e(r, o, null), f.addBindings(s, b, _.b, v, _)), _.o(v, _.n, O))
                    }
                  C && (C.e ? (v.__domElement.setAttribute("style", C.e(r, o, null)), f.addBindings(s, b, C.b, v.__domElement, C)) : v.__domElement.setAttribute("style", C.v))
                }
                m.id && (v.id = m.id), w && (w.e ? v.class = w.e(r, o, null) : v.class = w.v, w.o && f.addBindings(s, b, w.b, v, w)), m.sl && (v.slot = m.sl), void 0 !== m.sn && i.setSlotName(v, m.sn), i.appendChild(n, v), j(m.c, t, v, r, o, s, b, h)
              }
            }
          },
          B = function(e, t, n) {
            for (var r = e.childNodes, o = 0; o < r.length; o++) {
              var i = r[o];
              i instanceof u || (i.__id && (t[i.__id] = i), void 0 !== i.__slotName && (n[i.__slotName] = i), B(i, t, n))
            }
          },
          D = function(e, t, n, r, o, i) {
            for (var a = null, c = 0, u = null, s = 0; s < e.length; s++) {
              var l = e[s];
              if (void 0 === l.n) a = document.createTextNode(l.c), l.e && f.addBindings(o, i, l.b, a, l), t.appendChild(a);
              else {
                var d = l.cl,
                  p = l.st,
                  h = l.a;
                for (a = l.v ? document.createElement("virtual") : document.importNode ? document.importNode(l.p, !1) : l.p.cloneNode(!1), c = 0; c < h.length; c++) u = h[c], u.e && f.addBindings(o, i, u.b, a, u);
                t.appendChild(a), l.id && (n[l.id] = a), d && d.e && f.addBindings(o, i, d.b, a, d), p && p.e && f.addBindings(o, i, p.b, a, p), void 0 !== l.sn && (r[l.sn] = a), D(l.c, a, n, r, o, i)
              }
            }
          };
        p.prototype.createInstance = function(e, t) {
          var n = Object.create(h.prototype),
            o = Object.create(null),
            i = Object.create(null),
            a = [],
            c = f.create("", null, null, null, null, [], function(e, t) {}),
            u = null;
          if ("native" === this._renderingMode) "dom" === r.documentBackend && (u = document.createDocumentFragment()), D(this._tagTreeRoot, u, o, i, c, {}), i[""] || (i[""] = null);
          else {
            var l = function(e, t, n, r) {
              u.__wxHost ? e.addListener(t, A(n, r).bind(u.__wxHost)) : a.push({
                target: e,
                name: t,
                func: A(n, r)
              })
            };
            u = s.create(e), j(this._tagTreeRoot, u, u, t, {}, c, {}, l), B(u, o, i)
          }
          return n.shadowRoot = u, n.idMap = o, n.slots = i, n.listeners = a, n._topScope = c, n
        }, h.prototype.updateValues = function(e, t, n) {
          for (var r = i.getMethodCaller(e), o = 0; o < n.length; o++) {
            var a = n[o];
            f.updateBinding(this._topScope, a, t, {}, r)
          }
        }, e.exports = p
      }).call(t, n(15))
    }, function(e, t) {
      function n() {
        throw new Error("setTimeout has not been defined")
      }

      function r() {
        throw new Error("clearTimeout has not been defined")
      }

      function o(e) {
        if (l === setTimeout) return setTimeout(e, 0);
        if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);
        try {
          return l(e, 0)
        } catch (t) {
          try {
            return l.call(null, e, 0)
          } catch (t) {
            return l.call(this, e, 0)
          }
        }
      }

      function i(e) {
        if (f === clearTimeout) return clearTimeout(e);
        if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(e);
        try {
          return f(e)
        } catch (t) {
          try {
            return f.call(null, e)
          } catch (t) {
            return f.call(this, e)
          }
        }
      }

      function a() {
        v && p && (v = !1, p.length ? h = p.concat(h) : g = -1, h.length && c())
      }

      function c() {
        if (!v) {
          var e = o(a);
          v = !0;
          for (var t = h.length; t;) {
            for (p = h, h = []; ++g < t;) p && p[g].run();
            g = -1, t = h.length
          }
          p = null, v = !1, i(e)
        }
      }

      function u(e, t) {
        this.fun = e, this.array = t
      }

      function s() {}
      var l, f, d = e.exports = {};
      ! function() {
        try {
          l = "function" == typeof setTimeout ? setTimeout : n
        } catch (e) {
          l = n
        }
        try {
          f = "function" == typeof clearTimeout ? clearTimeout : r
        } catch (e) {
          f = r
        }
      }();
      var p, h = [],
        v = !1,
        g = -1;
      d.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        h.push(new u(e, t)), 1 !== h.length || v || o(c)
      }, u.prototype.run = function() {
        this.fun.apply(null, this.array)
      }, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = s, d.addListener = s, d.once = s, d.off = s, d.removeListener = s, d.removeAllListeners = s, d.emit = s, d.prependListener = s, d.prependOnceListener = s, d.listeners = function(e) {
        return []
      }, d.binding = function(e) {
        throw new Error("process.binding is not supported")
      }, d.cwd = function() {
        return "/"
      }, d.chdir = function(e) {
        throw new Error("process.chdir is not supported")
      }, d.umask = function() {
        return 0
      }
    }, function(e, t) {
      var n = {};
      n.create = function(e, t, n, o, i, a, c) {
        for (var u = {
            inc: 1,
            name: e,
            exp: o,
            lp: i,
            scopes: {},
            targets: {},
            children: null,
            lu: c,
            __scopeBinded: []
          }, s = 0; s < a.length; s++) {
          var l = a[s];
          null === l[0] ? r(t, l, null, u) : r(n[l[0]], l, null, u)
        }
        return u
      }, n.proxyTopScope = function(e) {
        var t = {
          inc: 1,
          linked: e,
          scopes: {},
          targets: {},
          children: null,
          __scopeBinded: []
        };
        return r(e, [null], null, t), t
      }, n.proxySubScopes = function(e) {
        var t = {};
        for (var n in e) t[n] = {
          inc: 1,
          linked: e[n],
          scopes: {},
          targets: {},
          children: null,
          __scopeBinded: []
        }, r(e[n], [null], null, t[n]);
        return t
      };
      var r = n.addBinding = function(e, t, n, r) {
        for (var o = e, i = 1; i < t.length; i++) {
          var a = t[i];
          o.children || (o.children = Object.create(null));
          var c = o.children;
          c[a] || (c[a] = {
            scopes: {},
            targets: {},
            children: null
          }), o = c[a]
        }
        var u = e.inc++;
        return n ? o.targets[u] = [n, r] : (o.scopes[u] = r, r.__scopeBinded.push([o, u])), u
      };
      n.addBindings = function(e, t, n, o, i) {
        for (var a = 0; a < n.length; a++) {
          var c = n[a];
          c[0] ? r(t[c[0]], c, o, i) : r(e, c, o, i)
        }
      }, n.updateLvaluePath = function(e, t) {
        e.lp = t
      }, n.removeBindingsForScope = function(e) {
        for (var t = e.__scopeBinded, n = 0; n < t.length; n++) {
          var r = t[n];
          delete r[0].scopes[r[1]]
        }
      };
      var o = function(e, t, n, r, o) {
          if (e.linked) return void i(e, t, n, r, o);
          var a = r[e.name];
          r[e.name] = e.exp(n, r, o), i(e, t, n, r, o), r[e.name] = a
        },
        i = n.updateBinding = function(e, t, n, r, i) {
          for (var a = e, c = 0, u = 0; u < t.length; u++) {
            for (c in a.scopes) o(a.scopes[c], t, n, r, i);
            var s = t[u];
            if (!a.children) return;
            var l = a.children;
            if (!l[s]) return;
            a = l[s]
          }
          var f = function(e) {
            for (c in e.targets) {
              var t = e.targets[c],
                a = t[1];
              a.o(t[0], a.n, a.e(n, r, i))
            }
            for (c in e.scopes) o(e.scopes[c], [], n, r, i);
            for (c in e.children) f(e.children[c])
          };
          f(a)
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
      var r = n(12),
        o = n(16),
        i = n(19).RUNTIME_NAMES;
      i.TOP_SCOPE, i.SUB_SCOPE, i.CALLER, e.exports = {
        requireBlock: !0,
        register: function(e, t, n) {},
        create: function(e, t, n, i, a, c, u, s, l, f, d) {
          var p = r.create("wx:" + e);
          p.__wxIfCondValue = !0, p.__wxIfNextNode = null, p.__wxIfHasTrueCond = !0;
          var h = null;
          "if" !== e && (h = d.childNodes[d.childNodes.length - 1], "wx:if" !== h.is && "wx:elif" !== h.is ? h = null : h.__wxIfNextNode = p), n.id && (p.id = n.id);
          var v = p.__wxIfUpdateNode = function() {
              var e = p.__wxIfCondValue;
              if (h && h.__wxIfHasTrueCond && (e = !1), e && !p.childNodes.length) {
                var t = o.proxyTopScope(c),
                  r = o.proxySubScopes(u);
                p.__wxTopScope = t, p.__wxSubScopes = r, f(n.c, l, p, i, a, t, r, s)
              } else if (!e && p.childNodes.length) {
                o.removeBindingsForScope(p.__wxTopScope);
                for (var d in p.__wxSubScopes) o.removeBindingsForScope(p.__wxSubScopes[d]);
                for (; p.childNodes.length;) p.removeChild(p.childNodes[0])
              }
              p.__wxIfNextNode && p.__wxIfNextNode.__wxIfUpdateNode()
            },
            g = function(e) {
              p.__wxIfCondValue = !!e, p.__wxIfHasTrueCond = p.__wxIfCondValue || h && h.__wxIfHasTrueCond, v()
            };
          return "else" === e ? g(!0) : (o.addBindings(c, u, t.b, p, {
            e: t.d,
            o: function(e, t, n) {
              g(n)
            }
          }), g(t.d(i, a, null))), p
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
        r = t.STRING_ESCAPE_MAP = {},
        o = "";
      for (var i in n) r[n[i]] = i, o += n[i];
      t.STRING_ESCAPE_REGEXP = new RegExp("[" + o + "]", "g")
    }, function(e, t, n) {
      var r = n(12),
        o = n(16),
        i = n(19).RUNTIME_NAMES;
      i.TOP_SCOPE, i.SUB_SCOPE, i.CALLER, e.exports = {
        requireBlock: !0,
        addDefaultAttrs: [{
          n: "wx:for-index",
          v: "index"
        }, {
          n: "wx:for-item",
          v: "item"
        }],
        register: function(e, t, n) {},
        create: function(e, t, n, i, a, c, u, s, l, f) {
          var d = n._wxForIndex || "index",
            p = n._wxForItem || "item",
            h = n._wxKey,
            v = r.create("wx:for:list");
          n.id && (v.id = n.id), o.create("", c, u, function(e, n, r) {
            var o = t.d(e, n, null);
            return m(o, e, n, r), o
          }, t.l, t.b);
          var g = function(e, t, i, a, h) {
              var g = r.create("wx:for:item"),
                _ = o.proxyTopScope(c),
                y = o.proxySubScopes(u);
              g.__wxTopScope = _, g.__wxSubScopes = y, g.__wxForToRemove = !1, g.__wxForKeyStr = "";
              var b = o.create(d, _, y, null, null, []),
                m = o.create(p, _, y, null, [i], []);
              return y[d] = b, y[p] = m, t[d] = i, t[p] = a, f(n.c, l, g, e, t, _, y, s), void 0 === h ? v.appendChild(g) : v.insertBefore(g, h), g
            },
            _ = function(e, t, n, r, a, c) {
              var u = e.__wxSubScopes[p];
              o.updateLvaluePath(u, [r]), a && (c ? v.insertBefore(e, c) : v.appendChild(e));
              var s = e.__wxSubScopes[d];
              n[d] = r, o.updateBinding(s, [], i, n, t)
            },
            y = function(e, t, n, r, i, a) {
              r[p] = i, o.updateBinding(e.__wxSubScopes[p], t, n, r, a)
            },
            b = function(e) {
              o.removeBindingsForScope(e.__wxTopScope);
              for (var t in v.__wxSubScopes) o.removeBindingsForScope(e.__wxSubScopes[t]);
              v.removeChild(e)
            },
            m = function(e, t, n, r) {
              var o = "",
                i = e;
              "object" == typeof e && null !== e || (i = []);
              var a = {};
              for (o in n) a[o] = n[o];
              var c = 0;
              if (h) {
                var u = [],
                  s = e instanceof Array,
                  l = [];
                if (!s) {
                  var f = i;
                  i = [];
                  for (o in f) i.push(f[o]), l.push(o)
                }
                for (c = 0; c < i.length; c++) u.push(String(i[c][h]));
                if (0 === i.length)
                  for (; v.childNodes.length;) b(v.childNodes[0]);
                else {
                  var d = Object.create(null),
                    p = Object.create(null),
                    m = v.childNodes,
                    w = null,
                    k = "";
                  for (c = 0; c < m.length; c++) w = m[c], k = w.__wxForKeyStr, d[k] >= 0 ? (b(w), c--) : (d[k] = c, p[k] = w, w.__wxForToRemove = !0);
                  var S = -1,
                    C = 0,
                    P = 1,
                    x = [];
                  for (C = d[i[0][h]], C >= 0 || (C = -1), m[C] && (m[C].__wxForToRemove = !1), c = 1; c < i.length; c++)(P = d[i[c][h]]) >= 0 && (S < C && (C < P || S > P) && (x.push(m[C]), S = C), C = P, m[C] && (m[C].__wxForToRemove = !1));
                  for (S < C && x.push(m[C]), c = 0; c < m.length; c++) w = m[c], w.__wxForToRemove && (b(w), c--);
                  var M = x.shift(),
                    E = 0;
                  for (c = 0; c < i.length; c++) {
                    var O = i[c],
                      T = p[O[h]];
                    if (p[O[h]] = null, T) {
                      var I = !0;
                      if (T === M) {
                        for (; m[E] !== M;) E++;
                        E++, M = x.shift(), I = !1
                      }
                      w = T, _(w, r, a, s ? c : l[c], I, m[E]), I && m[E] === w && E++, y(w, [], t, a, i[c], r)
                    } else w = g(t, a, s ? c : l[c], i[c], m[E]), E++, w.__wxForKeyStr = String(O[h])
                  }
                }
              } else {
                for (; v.childNodes.length;) b(v.childNodes[0]);
                if (e instanceof Array)
                  for (c = 0; c < i.length; c++) g(t, a, c, i[c]);
                else
                  for (o in i) g(t, a, o, i[o])
              }
            };
          return m(t.d(i, a, null), i, a, null), v
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
      var r = n(12),
        o = n(16),
        i = n(19).RUNTIME_NAMES;
      i.TOP_SCOPE, i.SUB_SCOPE, i.CALLER, e.exports = {
        requireBlock: !0,
        register: function(e, t, n) {},
        create: function(e, t, n, i, a, c, u, s, l, f) {
          var d = t.s[0],
            p = o.create(d, c, u, t.d, t.l, t.b),
            h = {},
            v = "";
          for (v in u) h[v] = u[v];
          h[d] = p;
          var g = {};
          for (v in a) g[v] = a[v];
          g[d] = t.d(i, a, null);
          var _ = r.create("wx:alias");
          return n.id && (_.id = n.id), f(n.c, l, _, i, g, c, h, s), _
        }
      }
    }])
  });
  var __virtualDOM__ = function(e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
          exports: {},
          id: r,
          loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
      }
      var n = {};
      return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getMergeDataFunc = void 0;
      var r = n(1);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(18),
        i = n(3),
        a = n(19),
        c = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a);
      t.getMergeDataFunc = function() {
        return c.default.mergeData
      };
      exparser.addGlobalErrorListener(function(e, t) {
        return Reporter.thirdErrorReport({
          error: e,
          extend: t.message.replace(/^\[exparser\] \[(error|warning)\]/i, "")
        }), !1
      }), exparser.globalOptions.createFakeDomElement = !1, exparser.globalOptions.inDocument = !1, exparser.globalOptions.documentBackend = "none", exparser.updateDefaultComponent(), (0, o.registerDataBehaviors)(), (0, i.initThread)(!0)
    }, function(e, t, n) {
      "use strict";

      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function o() {}
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.removeView = t.attachView = t.addView = t.getNodeId = t.getNodeById = t.Page = t.Component = t.Behavior = void 0;
      var i = function() {
          function e(e, t) {
            var n = [],
              r = !0,
              o = !1,
              i = void 0;
            try {
              for (var a, c = e[Symbol.iterator](); !(r = (a = c.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0);
            } catch (e) {
              o = !0, i = e
            } finally {
              try {
                !r && c.return && c.return()
              } finally {
                if (o) throw i
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
        a = n(2),
        c = n(3),
        u = n(4),
        s = n(9),
        l = r(s),
        f = n(11),
        d = r(f),
        p = {
          lazyRegistration: !0,
          publicProperties: !0
        },
        h = {
          domain: "/",
          lazyRegistration: !0,
          classPrefix: "",
          addGlobalClass: !1,
          templateEngine: u.Tmpl,
          renderingMode: "full",
          multipleSlots: !1,
          publicProperties: !0,
          reflectToAttributes: !1,
          writeFieldsToNode: !1,
          writeIdToDOM: !1
        },
        v = {
          domain: "/",
          lazyRegistration: !0,
          classPrefix: "",
          addGlobalClass: !1,
          renderingMode: "full",
          templateEngine: u.Tmpl,
          multipleSlots: !1,
          publicProperties: !0,
          reflectToAttributes: !1,
          writeFieldsToNode: !1,
          writeIdToDOM: !1
        },
        g = "undefined" != typeof WeakMap ? new WeakMap : {},
        _ = {},
        y = {},
        b = {},
        m = {},
        w = 1,
        k = Object.prototype.hasOwnProperty,
        S = function() {
          return Math.floor(4294967296 * (1 + Math.random())).toString(16).slice(1)
        },
        C = function(e) {
          for (var t = {}, n = {}, r = [], o = 0; o < e.length; o++) {
            var i = e[o],
              a = n[i] = i.split(/[^a-z0-9]+/i),
              c = a[a.length - 1];
            k.call(t, c) ? (t[c].push(i), r.push(c)) : t[c] = [i]
          }
          for (var u = 2; r.length; u++) {
            var s = r;
            r = [];
            for (var l = 0; l < s.length; l++) {
              var f = s[l];
              if (k.call(t, f)) {
                var d = t[f];
                delete t[f];
                for (var p = 0; p < d.length; p++) {
                  var h = d[p],
                    v = n[h],
                    g = v.slice(-u).join("-");
                  k.call(t, g) ? (t[g].push(h), g !== f && r.push(g)) : t[g] = [h]
                }
              }
            }
          }
          var _ = {};
          for (var y in t) {
            var b = t[y],
              m = Number(y[0]) >= 0 ? "x-" + y : y;
            if (1 === b.length) _[b[0]] = m;
            else
              for (var w = 0; w < b.length; w++) _[b[w]] = m + "-" + w
          }
          return _
        },
        P = function(e, t) {
          0 === t.indexOf("/") && (e = "");
          var n = e.split("/");
          n.pop();
          for (var r = t.split("/"); r.length;) {
            var o = r.shift();
            "" !== o && "." !== o && (".." !== o ? n.push(o) : n.pop())
          }
          return n.join("/")
        },
        x = function(e) {
          var t = __wxAppCode__[e + ".json"] || {},
            n = {},
            r = t.usingComponents;
          for (var o in r) n[o] = P(e, r[o]);
          return n
        },
        M = function(e, t) {
          for (var n in t) {
            var r = t[n];
            r.target = null != r.target ? String(r.target) : P(e, String(n))
          }
        },
        E = function e(t, n, r) {
          if ("wx://" !== n.slice(0, 5)) {
            var o = y[n];
            if (!o) throw new Error('"' + n + '" is not a behavior registered by Behavior()');
            t[0].unshift(o), r[n] = !0;
            var i = m[o.is];
            if (i)
              for (var a = 0; a < i.length; a++) {
                var c = i[a];
                r[c] || e(t, c, r)
              }
          }
        },
        O = function e(t, n, r, o) {
          var i = _[n];
          if (!i) throw new Error('Component is not found in path "' + n + '"' + (o ? ' (using by "' + o + '")' : ""));
          t[1].unshift(i), r[n] = !0;
          var a = b[i.is];
          for (var c in a) {
            var u = a[c];
            r[u] || e(t, u, r, n)
          }
          var s = m[i.is];
          if (s)
            for (var l = 0; l < s.length; l++) {
              var f = s[l];
              r[f] || E(t, f, r)
            }
        },
        T = function(e, t) {
          var n = {};
          for (var r in e.properties) {
            var o = e.properties[r];
            null === o ? n[r] = {
              type: null
            } : o === Number || o === String || o === Boolean || o === Object || o === Array ? n[r] = {
              type: o.name
            } : (void 0 === o.public || o.public) && (n[r] = {
              type: null === o.type ? null : o.type.name,
              value: o.value
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
        I = function(e) {
          if (!e.behaviors) return void(e.behaviors = null);
          for (var t = [], n = 0; n < e.behaviors.length; n++) {
            var r = String(e.behaviors[n]);
            if ("/" !== r[0] && "wx://" !== r.slice(0, 5)) throw new Error("Behaviors should be constructed with Behavior()");
            t.push(r)
          }
          e.behaviors = t, m[e.is] = t
        },
        A = (t.Behavior = function(e) {
          return e.is = "/" + w++ + "/" + S(), I(e), e.options = p, y[e.is] = T(e), exparser.registerBehavior(e), e.is
        }, function(e) {
          return g.get(e)
        }),
        j = function(e, t, n) {
          var r = A(e).shadowRoot;
          if (n) {
            return r.querySelectorAll(t).map(function(e) {
              return exparser.Element.getMethodCaller(e)
            })
          }
          var o = r.querySelector(t);
          return o ? exparser.Element.getMethodCaller(o) : null
        },
        B = function(e, t) {
          var n = A(e),
            r = n.getRelationNodes(t);
          return null === r ? null : r.map(function(e) {
            return exparser.Element.getMethodCaller(e)
          })
        },
        D = o.prototype = Object.create(Object.prototype, {
          is: {
            get: function() {
              return A(this).is
            },
            set: function() {}
          },
          id: {
            get: function() {
              return A(this).id
            },
            set: function() {}
          },
          dataset: {
            get: function() {
              return A(this).dataset
            },
            set: function() {}
          },
          properties: {
            get: function() {
              return A(this).data
            },
            set: function() {}
          },
          data: {
            get: function() {
              return A(this).data
            },
            set: function() {}
          },
          setData: {
            value: function(e, t) {
              var n = this;
              return "function" == typeof t && setTimeout(function() {
                t.call(n)
              }, 0), A(this).setData(e)
            }
          },
          replaceDataOnPath: {
            value: function(e, t) {
              return A(this).replaceDataOnPath(e, t)
            }
          },
          mergeDataOnPath: {
            value: function(e, t) {
              return A(this).mergeDataOnPath(e, t)
            }
          },
          applyDataUpdates: {
            value: function() {
              return A(this).applyDataUpdates()
            }
          },
          hasBehavior: {
            value: function(e) {
              return A(this).hasBehavior(e)
            }
          },
          triggerEvent: {
            value: function(e, t, n) {
              return A(this).triggerEvent(e, t, n)
            }
          },
          createSelectorQuery: {
            value: function() {
              return wx.createSelectorQuery().in(this)
            }
          },
          selectComponent: {
            value: function(e) {
              return j(this, e, !1)
            }
          },
          selectAllComponents: {
            value: function(e) {
              return j(this, e, !0)
            }
          },
          getRelationNodes: {
            value: function(e) {
              return B(this, e)
            }
          }
        }),
        N = function(e) {
          e.using = b[e.is] = x(e.is), I(e);
          var t = e.is + ".wxml";
          e.template = {
            func: __wxAppCode__[t]
          }, _[e.is] = T(e, t);
          var n = exparser.registerElement(e),
            r = Object.create(D, {
              constructor: {
                value: o
              }
            });
          exparser.Behavior.prepare(n.behavior);
          var i = n.behavior.methods;
          for (var a in i) r[a] = i[a];
          return r
        },
        R = (t.Component = function e(t) {
          if (!__wxAppCurrentFile__) return void console.error("Component constructors should be called while initialization. A constructor call has been ignored.");
          t.is = __wxAppCurrentFile__.slice(0, -3);
          var n = t.created;
          t.created = function() {
            this.__customConstructor__ = e;
            var t = Object.create(o);
            g.set(t, this), exparser.Element.setMethodCaller(this, t), n && n.call(t), t.__wxWebviewId__ = this.__treeManager__.viewId
          }, t.relations && M(t.is, t.relations);
          var r = t.options || {};
          t.options = h, t.options.multipleSlots = r.multipleSlots || !1, t.options.writeIdToDOM = !1;
          var o = N(t);
          return t.is
        }, t.Page = function e(t) {
          if (!__wxAppCurrentFile__) return void console.error("Page constructors should be called while initialization. A constructor call has been ignored.");
          var n = Object.create(null),
            r = Object.create(null);
          for (var o in t) "data" !== o && ("function" == typeof t[o] ? r[o] = t[o] : n[o] = t[o]);
          var i = {
            is: __wxAppCurrentFile__.slice(0, -3),
            data: t.data,
            methods: r,
            created: function() {
              this.__customConstructor__ = e;
              var t = Object.create(a);
              g.set(t, this), exparser.Element.setMethodCaller(this, t), t.__wxWebviewId__ = this.__treeManager__.viewId, t.__wxExparserNodeId__ = this.__treeManager__.nodeId.getNodeId(this)
            },
            options: h
          };
          i.options.multipleSlots = !1, i.options.writeIdToDOM = !0;
          var a = N(i);
          return a.__freeData__ = n, t.is
        }, t.getNodeById = function(e, t) {
          if ((0, c.isDataThread)()) {
            return l.default.get(t).nodeId.getNodeById(e)
          }
          return l.default.instance ? l.default.instance.nodeId.getNodeById(e) : null
        }, t.getNodeId = function(e, t) {
          if ((0, c.isDataThread)()) {
            return l.default.get(t).nodeId.getNodeId(e)
          }
          return l.default.instance.nodeId.getNodeId(e)
        }, function(e) {
          if (!e.flowInited) return L(e);
          var t = e.operationFlow.iterator;
          t.expectStart();
          var n = t.nextStep();
          if (n[0] !== a.SYNC_EVENT_NAME.FLOW_UPDATE) throw new Error("Expect FLOW_UPDATE but get another");
          var r = e.nodeId.getNodeById(n[1]),
            o = n[2];
          o.length && (exparser.Component.getDataProxy(r).setChanges(o), r.applyDataUpdates()), t.expectEnd()
        }),
        L = function(e) {
          e.flowInited = !0;
          var t = e.operationFlow.iterator;
          t.expectStart();
          var n = t.nextStep();
          if (n[0] !== a.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION) throw new Error("Expect FLOW_INITIAL_CREATION but get another");
          var r = n[1],
            o = window.__DOMTree__ = exparser.createElement("body", exparser.Component._list[r]);
          if (e.nodeId.allocNodeId(o, -1), o.setAttribute("is", r), n = t.nextStep(), n[0] !== a.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION) throw new Error("Expect FLOW_INITIAL_CREATION but get another");
          e.nodeId.addNode(o), document.body = o.$$, exparser.Element.pretendAttached(o), t.expectEnd()
        };
      d.default.setStartOperation(R);
      var F = {
        String: String,
        Number: Number,
        Boolean: Boolean,
        Object: Object,
        Array: Array,
        null: null
      };
      (0, c.setDataListener)(a.SYNC_EVENT_NAME.COMPONENT_DEF, function(e) {
        l.default.instance = new l.default(0);
        for (var t = i(e, 3), n = t[0], r = t[1], o = t[2], a = 0; a < n.length; a++) {
          var c = n[a];
          c.options = p, exparser.registerBehavior(c)
        }
        for (var u = [], s = 0; s < r.length; s++) u.push(r[s].is);
        for (var f = C(u), d = 0; d < r.length; d++) {
          var h = r[d];
          for (var g in h.properties) h.properties[g].type = F[h.properties[g].type];
          var _ = h.is === o ? "" : f[h.is],
            y = h.options,
            b = !(!y.writeIdToDOM || h.is !== o);
          h.options = v, h.options.classPrefix = _, h.options.multipleSlots = y.multipleSlots || !1, h.options.writeIdToDOM = b, h.template = {
            func: __wxAppCode__[h.template]
          }, exparser.registerElement(h);
          var m = __wxAppCode__[h.is + ".wxss"];
          m && h.is !== o && m(_ && _ + "--", {
            allowIllegalSelector: b
          })
        }
      }, 0);
      var W = function(e, t, n) {
          var r = [
            [],
            [], n
          ];
          O(r, n, Object.create(null), ""), (0, c.sendData)(a.SYNC_EVENT_NAME.COMPONENT_DEF, r, e), t.operationFlow.start(), t.operationFlow.push([a.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION, n]);
          var o = exparser.createElement("body", exparser.Component._list[n], t);
          return exparser.Element.getMethodCaller(o).__wxExparserNodeId__ = t.nodeId.allocNodeId(o, -1), t.operationFlow.push([a.SYNC_EVENT_NAME.FLOW_INITIAL_CREATION]), t.nodeId.addNode(o), o
        },
        V = function(e, t) {
          (0, c.setDataListener)(a.SYNC_EVENT_NAME.WX_EVENT, function(e) {
            var n = e[2],
              r = e[1],
              o = t.nodeId.getNodeById(e[0]),
              i = exparser.Element.getMethodCaller(o);
            "function" != typeof i[r] ? console.warn('Component "' + o.is + '" does not have a method "' + r + '" to handle event "' + n.type + '".') : exparser.safeCallback("Event Handler", i[r], i, [n])
          }, e), (0, c.setDataListener)(a.SYNC_EVENT_NAME.LAYOUT_READY, function() {
            var e = t.pendingReady;
            t.pendingReady = [];
            for (var n = 0; n < e.length; n++) e[n].triggerLifeTime("ready")
          }, e)
        };
      t.addView = function(e, t) {
        var n = l.default.create(e);
        return n.operationFlow.unblock(), V(e, n), W(e, n, t)
      }, t.attachView = function(e) {
        exparser.Element.pretendAttached(e), e.__treeManager__.operationFlow.end()
      }, t.removeView = function(e, t) {
        exparser.Element.pretendDetached(t), l.default.destroy(e), (0, c.removeDataListeners)(e)
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
    }, function(e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = {},
        r = -1,
        o = null,
        i = !1,
        a = !1,
        c = (t.initThread = function(e) {
          i = !e
        }, t.isDataThread = function() {
          return !i
        }, t.inDevtoolsWebview = function() {
          return a
        }, t.setInDevtoolsWebView = function() {
          a = !0
        }, function(e, t, n) {
          void 0 !== WeixinJSBridge ? WeixinJSBridge.publish(e, t, n) : "undefined" != typeof document && document.addEventListener("WeixinJSBridgeReady", function() {
            WeixinJSBridge.publish(e, t, n)
          }, !1)
        }),
        u = function(e, t) {
          void 0 !== WeixinJSBridge ? WeixinJSBridge.subscribe(e, t) : "undefined" != typeof document && document.addEventListener("WeixinJSBridgeReady", function() {
            WeixinJSBridge.subscribe(e, t)
          }, !1)
        },
        s = null,
        l = null,
        f = (t.queueSendingData = function(e, t, n) {
          n !== l && f(), l = n, s ? s.push([e].concat(t)) : s = [
            [e].concat(t)
          ]
        }, t.flushSendingData = function() {
          s && c("vdSyncBatch", s, void 0 !== l ? [l] : void 0), s = null, l = null
        }),
        d = (t.sendData = function(e, t, n) {
          c("vdSync", [e].concat(t), void 0 !== n ? [n] : void 0)
        }, t.setDataListener = function(e, t, i) {
          if ("" === e) return o = t, void(r >= 0 && o(r));
          i = i || 0, n[i] || (n[i] = {}), n[i][e] = t
        }, t.removeDataListeners = function(e) {
          delete n[e]
        }, function(e, t) {
          var i = e.shift();
          if ("" === i) return r = t, void(o && o(t));
          if (t = t || 0, n[t]) {
            var a = n[t][i];
            a && a(e, i)
          }
        });
      u("vdSync", d), u("vdSyncBatch", function(e, t) {
        for (var n = 0; n < e.length; n++) d(e[n], t)
      })
    }, function(e, t, n) {
      (function(e) {
        "use strict";

        function r(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }

        function o(e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        Object.defineProperty(t, "__esModule", {
          value: !0
        }), t.Tmpl = void 0;
        var i = function() {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var r = t[n];
                r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
              }
            }
            return function(t, n, r) {
              return n && e(t.prototype, n), r && e(t, r), t
            }
          }(),
          a = n(2),
          c = n(5),
          u = r(c),
          s = n(17),
          l = r(s),
          f = n(6),
          d = n(3),
          p = Object.prototype.hasOwnProperty,
          h = function(e, t) {
            for (var n = JSON.parse(JSON.stringify(e)), r = 0; r < t.length; r++) {
              for (var o = t[r], i = o[1], a = o[3], c = n, u = i[0], s = 1; s < i.length; s++)
                if (c = c[u], null != c && c.__wxspec__ && (c = c.__value__), u = i[s], null != c && !p.call(c, u)) {
                  c = null;
                  break
                }
              null != c && p.call(c, u) && (null != a ? c[u] = {
                __value__: a,
                __wxspec__: !0
              } : null != c[u] && c[u].__wxspec__ || (c[u] = {
                __value__: c[u],
                __wxspec__: !0
              }))
            }
            return n
          },
          v = function(e, t, n, r, o, i, a, c, s) {
            var l = t;
            return "virtual" !== t && "shadow" !== t && ("wx-" === t.slice(0, 3) && (l = t.slice(3)), "slot" !== l ? l = e[l] ? e[l] : t : t = "slot"), new u.default(t, l, n, r, o, i, a, c, s)
          },
          g = function e(t, n) {
            if ((0, f.isString)(n) || Number(n) === n && Number(n) % 1 == 0) return new l.default(String(n));
            var r = [];
            return n.children.forEach(function(n) {
              r.push(e(t, n))
            }), v(t, n.tag, n.attr, n.n, n.raw, n.wxKey, n.wxVkey, n.wxXCkey, r)
          },
          _ = function(t, n, r) {
            var o = n(r, null, e);
            return o.tag = "shadow", g(t, o)
          },
          y = function(e, t, n) {
            var r = new m;
            return r._data = t, r._generateFunc = e.template.func, r._using = e.using, r._virtualTree = _(r._using, r._generateFunc, r._data), r
          },
          b = function e(t, n, r) {
            for (var o = t.childNodes, i = 0; i < o.length; i++) {
              var a = o[i];
              a instanceof exparser.TextNode || (a.__id && (n[a.__id] = a), void 0 !== a.__slotName && (r[a.__slotName] = a), e(a, n, r))
            }
          },
          m = t.Tmpl = function() {
            function e() {
              o(this, e)
            }
            return i(e, [{
              key: "createInstance",
              value: function(e, t, n) {
                var r = new w,
                  o = n;
                return r._generateFunc = this._generateFunc, r._using = this._using, r.idMap = Object.create(null), r.slots = Object.create(null), r._virtualTree = this._virtualTree, r.shadowRoot = this._virtualTree.render(e, n), b(r.shadowRoot, r.idMap, r.slots), r.listeners = [], e.__component__ = !0, (0, d.isDataThread)() && (e.__treeManager__ = o, r.shadowRoot.__treeManager__ = o, o.pendingReady.push(e)), r
              }
            }]), e
          }();
        m.create = y;
        var w = function() {
          function e() {
            o(this, e)
          }
          return i(e, [{
            key: "updateValues",
            value: function(e, t, n, r, o) {
              var i = null;
              if (!o && (0, d.isDataThread)()) {
                i = e.__treeManager__, i.operationFlow.start(Date.now());
                var c = [];
                r.forEach(function(e) {
                  void 0 !== e[2] ? c.push(e) : console.error('Setting data field "' + e[1].join(".") + '" to undefined is invalid.')
                }), i.operationFlow.push([a.SYNC_EVENT_NAME.FLOW_UPDATE, i.nodeId.getNodeId(e), c])
              }
              var u = h(t, r),
                s = _(this._using, this._generateFunc, u),
                l = this._virtualTree.diff(s);
              this._virtualTree = s, l.apply(this.shadowRoot), !o && (0, d.isDataThread)() && i.operationFlow.end()
            }
          }]), e
        }()
      }).call(t, function() {
        return this
      }())
    }, function(e, t, n) {
      "use strict";

      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        a = n(2),
        c = n(6),
        u = n(7),
        s = n(12),
        l = n(17),
        f = r(l),
        d = n(3),
        p = n(9),
        h = r(p),
        v = function() {
          function e(t, n, r, i, a, u, s, l, d) {
            o(this, e), this.tagName = t || "", this.compName = n, this.props = r || {}, this.specProps = a || {}, this.children = d || [], this.newProps = i || [], this.wxVkey = s, this.wxXCkey = l, (0, c.isUndefined)(u) || (0, c.isNull)(u) ? this.wxKey = void 0 : this.wxKey = String(u), this.descendants = 0;
            for (var p = 0; p < this.children.length; ++p) {
              var h = this.children[p];
              (0, c.isVirtualNode)(h) ? this.descendants += h.descendants: (0, c.isString)(h) ? this.children[p] = new f.default(h) : (0, c.isVirtualText)(h) || console.log("invalid child", t, r, d, h), ++this.descendants
            }
          }
          return i(e, [{
            key: "render",
            value: function(e, t) {
              var n = null;
              if ("shadow" === this.tagName) n = exparser.ShadowRoot.create(e);
              else if ("virtual" === this.tagName) {
                var r = "virtual";
                1 === this.wxXCkey || 3 === this.wxXCkey ? r = "wx:if" : 2 !== this.wxXCkey && 4 !== this.wxXCkey || (r = "wx:for"), n = exparser.VirtualNode.create(r), exparser.Element.setInheritSlots(n), (0, d.isDataThread)() && (n.__treeManager__ = t)
              } else "slot" === this.tagName ? (n = exparser.VirtualNode.create("slot"), exparser.Element.setSlotName(n, "")) : (0, d.isDataThread)() && !exparser.Component._list[this.compName] ? (n = exparser.VirtualNode.create(this.tagName), n.__treeManager__ = t) : n = exparser.createElement(this.tagName, exparser.Component._list[this.compName], t);
              if (3 !== this.wxXCkey && 4 !== this.wxXCkey || (n.__wxDynamicSync__ = 4 === this.wxXCkey ? "wx:for" : "wx:if"), n.__component__)
                if ((0, d.isDataThread)()) exparser.Element.getMethodCaller(n).__wxExparserNodeId__ = t.nodeId.allocNodeId(n), t.operationFlow.push([a.SYNC_EVENT_NAME.FLOW_CREATE_NODE, t.nodeId.getNodeId(n)]);
                else {
                  t = h.default.instance;
                  var o = t.operationFlow.iterator,
                    i = o.nextStep();
                  if (i[0] !== a.SYNC_EVENT_NAME.FLOW_CREATE_NODE) throw new Error("Expect FLOW_CREATE_NODE but get another");
                  t.nodeId.allocNodeId(n, i[1]), (0, d.inDevtoolsWebview)() && n.setAttribute("exparser:info-custom-component", n.__componentInstanceId), n.setAttribute("is", this.compName)
                }
              return (0, u.applyProperties)(n, this.props, this.specProps), this.children.forEach(function(e) {
                var r = e.render(null, t);
                n.appendChild(r)
              }), n
            }
          }, {
            key: "diff",
            value: function(e) {
              return (0, s.diff)(this, e)
            }
          }]), e
        }();
      v.prototype.type = "WxVirtualNode", t.default = v
    }, function(e, t) {
      (function(e) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
          value: !0
        });
        var n = Object.assign || function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
            }
            return e
          },
          r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e
          } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
          };
        t.isObject = function(e) {
          return "object" === (void 0 === e ? "undefined" : r(e)) && null !== e
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
            var r = {};
            window.__wxConfig && window.__wxConfig.page && window.__wxConfig.page[window.__route__] && window.__wxConfig.page[window.__route__].window && (r = window.__wxConfig.page[window.__route__].window), e = n({}, t, r)
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
      }), t.applyProperties = void 0;
      var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = n(2),
        i = n(8),
        a = n(3),
        c = n(9),
        u = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(c),
        s = void 0 !== wx && wx.transformRpx,
        l = function(e) {
          return {
            id: e.id,
            offsetLeft: e.$$.offsetLeft,
            offsetTop: e.$$.offsetTop,
            dataset: e.dataset
          }
        },
        f = function(e) {
          return {
            id: e.id,
            dataset: e.dataset
          }
        },
        d = function(e) {
          if (e) {
            for (var t = [], n = 0; n < e.length; n++) {
              var r = e[n];
              t.push({
                identifier: r.identifier,
                pageX: r.pageX,
                pageY: r.pageY,
                clientX: r.clientX,
                clientY: r.clientY
              })
            }
            return t
          }
        },
        p = function(e, t, n, r, i, c) {
          var u = c ? "__wxEventCaptureHandleName" : "__wxEventHandleName";
          t[u] || (t[u] = Object.create(null)), t[u] || (t[u] = Object.create(null)), void 0 === t[u][n] && t.addListener(n, function(r) {
            var c = t[u][n];
            if (c) {
              r._hasListeners = !0;
              var s = t.ownerShadowRoot;
              if (s) {
                var p = s.__wxHost;
                if ((0, a.isDataThread)()) {
                  var h = exparser.Element.getMethodCaller(p);
                  "function" != typeof h[c] ? console.warn('Component "' + p.is + '" does not have a method "' + c + '" to handle event "' + r.type + '".') : h[c]({
                    type: r.type,
                    timeStamp: r.timeStamp,
                    target: f(r.target),
                    currentTarget: f(this),
                    detail: r.detail,
                    touches: r.touches,
                    changedTouches: r.changedTouches
                  })
                } else {
                  var v = {
                    type: r.type,
                    timeStamp: r.timeStamp,
                    target: l(r.target),
                    currentTarget: l(this),
                    detail: r.detail,
                    touches: d(r.touches),
                    changedTouches: d(r.changedTouches)
                  };
                  (0, a.sendData)(o.SYNC_EVENT_NAME.WX_EVENT, [e.nodeId.getNodeId(p), c, v])
                }
              }
              return !i && void 0
            }
          }, {
            capture: c
          }), t[u][n] = null == r ? "" : String(r)
        };
      t.applyProperties = function(e, t, n) {
        var c = (0, a.isDataThread)() ? e.__treeManager__ : u.default.instance;
        e.dataset = e.dataset || {};
        var l = !1,
          f = e instanceof exparser.Component,
          d = "wx-" === e.is.slice(0, 3),
          h = exparser.Component.getDataProxy(e);
        for (var v in t) {
          var g = t[v],
            _ = null;
          if ("slot" === e.is && e instanceof exparser.VirtualNode && "name" === v) exparser.Element.setSlotName(e, g);
          else if ("id" !== v)
            if ("slot" !== v)
              if (f && "class" === v) e.class = g;
              else if (f && "style" === v) e.$$ && function() {
            var t = e.__animationStyle || {},
              n = t.transition,
              r = t.transform,
              o = t.transitionProperty,
              i = t.transformOrigin;
            document.createElement("div").style.cssText = s(g, !0);
            var a = {
              transition: n,
              transform: r,
              transitionProperty: o,
              transformOrigin: i
            };
            a["-webkit-transition"] = a.transition, a["-webkit-transform"] = a.transform, a["-webkit-transition-property"] = a.transitionProperty, a["-webkit-transform-origin"] = a.transformOrigin, e.$$.setAttribute(v, s(g, !0) + Object.keys(a).filter(function(e) {
              return !(/transform|transition/i.test(e) && "" === a[e] || "" === e.trim() || void 0 === a[e] || "" === a[e] || !isNaN(parseInt(e)))
            }).map(function(e) {
              return e.replace(/([A-Z]{1})/g, function(e) {
                return "-" + e.toLowerCase()
              }) + ":" + a[e]
            }).join(";"))
          }();
          else {
            var y = f && exparser.Component.hasPublicProperty(e, v);
            if (y) h.scheduleReplace([v], g, n[v]), d ? h.doUpdates() : l = !0;
            else if (/^data-/.test(v)) {
              var b = (0, i.dashToCamelCase)(v.slice(5).toLowerCase());
              e.dataset[b] = g, e.setAttribute(v, g)
            } else(_ = v.match(/^(capture-)?(bind|catch):?(.+)$/)) ? (p(c, e, _[3], g, "catch" === _[2], _[1]), (0, a.inDevtoolsWebview)() && !(0, a.isDataThread)() && e.setAttribute("exparser:info-attr-" + v, g)) : "on" === v.slice(0, 2) && p(c, e, v.slice(2), g, !1, !1), f && "animation" === v && e.$$ && null !== g && "object" === (void 0 === g ? "undefined" : r(g)) && g.actions && g.actions.length > 0 && function() {
              var t = function() {
                  if (n < o) {
                    var t = wx.animationToStyle(r[n]),
                      i = t.transition,
                      a = t.transitionProperty,
                      c = t.transform,
                      u = t.transformOrigin,
                      l = t.style;
                    e.$$.style.transition = i, e.$$.style.transitionProperty = a, e.$$.style.transform = c, e.$$.style.transformOrigin = u, e.$$.style.webkitTransition = i, e.$$.style.webkitTransitionProperty = a, e.$$.style.webkitTransform = c, e.$$.style.webkitTransformOrigin = u;
                    for (var f in l) e.$$.style[f] = s(" " + l[f], !0);
                    e.__animationStyle = {
                      transition: i,
                      transform: c,
                      transitionProperty: a,
                      transformOrigin: u
                    }
                  }
                },
                n = 0,
                r = g.actions,
                o = g.actions.length;
              e.addListener("transitionend", function() {
                n += 1, t()
              }), t()
            }()
          } else e.slot = void 0 == g ? "" : g;
          else e.id = void 0 == g ? "" : g
        }
        if (l && h.doUpdates(!0), e.__component__)
          if ((0, a.isDataThread)()) c.operationFlow.push([o.SYNC_EVENT_NAME.FLOW_APPLY_PROPERTY]);
          else {
            var m = c.operationFlow.iterator,
              w = m.nextStep();
            if (w[0] !== o.SYNC_EVENT_NAME.FLOW_APPLY_PROPERTY) throw new Error("Expect FLOW_APPLY_PROPERTY but get another")
          }
      }
    }, function(e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = {},
        r = {
          dashToCamel: /-[a-z]/g,
          camelToDash: /([A-Z])/g
        };
      t.dashToCamelCase = function(e) {
        return n[e] ? n[e] : n[e] = e.indexOf("-") <= 0 ? e : e.replace(r.dashToCamel, function(e) {
          return e[1].toUpperCase()
        })
      }, t.camelToDashCase = function(e) {
        return n[e] || (n[e] = e.replace(r.camelToDash, "-$1").toLowerCase())
      }
    }, function(e, t, n) {
      "use strict";

      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        a = n(10),
        c = r(a),
        u = n(11),
        s = r(u),
        l = {},
        f = function() {
          function e(t) {
            o(this, e), this.flowInited = !1, this.pendingReady = [], this.operationFlow = new s.default(t, this), this.nodeId = new c.default
          }
          return i(e, null, [{
            key: "create",
            value: function(t) {
              var n = new e(t);
              return n.viewId = t, l[t] = n, n
            }
          }, {
            key: "destroy",
            value: function(e) {
              delete l[e]
            }
          }, {
            key: "get",
            value: function(e) {
              return l[e]
            }
          }]), e
        }();
      t.default = f
    }, function(e, t) {
      "use strict";

      function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        o = function() {
          function e() {
            n(this, e), this._idInc = 1, this._idNodeMap = {}
          }
          return r(e, [{
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
      t.default = o
    }, function(e, t, n) {
      "use strict";

      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(2),
        a = n(3),
        c = function() {
          function e(t, n, o) {
            r(this, e), this._treeManager = t, this._arr = n, this._depth = 0, this._startCb = o
          }
          return o(e, [{
            key: "nextStep",
            value: function() {
              for (; this._arr[0][0] === i.SYNC_EVENT_NAME.FLOW_DEPTH;) this._startCb(this._treeManager);
              if (this._arr[0][0] === i.SYNC_EVENT_NAME.FLOW_REPEAT) {
                var e = this._arr[0][2];
                return --this._arr[0][1] || this._arr.shift(), [e]
              }
              return this._arr.shift()
            }
          }, {
            key: "expectStart",
            value: function() {
              var e = this._arr.shift();
              if (this._depth++, e[0] !== i.SYNC_EVENT_NAME.FLOW_DEPTH || e[1] !== this._depth) throw new Error("Expect START descriptor with depth " + this._depth + " but get another")
            }
          }, {
            key: "expectEnd",
            value: function() {
              for (; this._arr[0][0] === i.SYNC_EVENT_NAME.FLOW_DEPTH && this._arr[0][1] !== this._depth - 1;) this._startCb(this._treeManager);
              var e = this._arr.shift();
              if (this._depth--, e[0] !== i.SYNC_EVENT_NAME.FLOW_DEPTH || e[1] !== this._depth) throw new Error("Expect END descriptor with depth " + this._depth + " but get another")
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
        u = function() {
          function e(t, n) {
            var o = this;
            r(this, e), this._viewId = t, this._treeManager = n, this._depth = 0, this._curWinSize = 0, this._received = [], this._cache = [], this._blocked = [];
            var u = function(t, n) {
              if (o._received.push([n].concat(t)), n === i.SYNC_EVENT_NAME.FLOW_DEPTH && (o._depth = t[0], 0 === o._depth)) {
                var r = o._received;
                o._received = [], o._blocked ? o._blocked.push(r) : (o.iterator = new c(o._treeManager, r, e._startCb), e._startCb(o._treeManager), document.dispatchEvent(new CustomEvent("pageReRender", {})), (0, a.sendData)(i.SYNC_EVENT_NAME.LAYOUT_READY, []))
              }
            };
            for (var s in i.SYNC_EVENT_NAME) "FLOW_" === s.slice(0, 5) && (0, a.setDataListener)(i.SYNC_EVENT_NAME[s], u, t)
          }
          return o(e, [{
            key: "unblock",
            value: function() {
              if (this._blocked) {
                for (; this._blocked.length;) {
                  var t = this._blocked.shift();
                  this.iterator = new c(this._treeManager, t, e._startCb), e._startCb(this._treeManager), document.dispatchEvent(new CustomEvent("pageReRender", {})), (0, a.sendData)(i.SYNC_EVENT_NAME.LAYOUT_READY, [])
                }
                this._blocked = null
              }
            }
          }, {
            key: "start",
            value: function(e) {
              this.flush(), this._depth++, (0, a.queueSendingData)(i.SYNC_EVENT_NAME.FLOW_DEPTH, [this._depth, e], this._viewId)
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
                      r = n.shift();
                    (0, a.queueSendingData)(r, n, this._viewId)
                  } else e.shift(), e[0][1]++
                }
              } else {
                var o = 0;
                if (e.length > 2 && e[0][0] === e[1][0] && e[0][0] === e[2][0] && (o = 1), o) {
                  var c = e[0][0];
                  e.splice(0, 3), this.flush(), this._curWinSize = 1, e.unshift([i.SYNC_EVENT_NAME.FLOW_REPEAT, 3, c])
                } else if (e.length > 3) {
                  var u = e.pop(),
                    s = u.shift();
                  (0, a.queueSendingData)(s, u, this._viewId)
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
              this.flush(), this._depth--, (0, a.queueSendingData)(i.SYNC_EVENT_NAME.FLOW_DEPTH, this._depth, this._viewId), 0 === this._depth && (0, a.flushSendingData)()
            }
          }], [{
            key: "setStartOperation",
            value: function(t) {
              e._startCb = t
            }
          }]), e
        }();
      t.default = u
    }, function(e, t, n) {
      "use strict";

      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.appendPatch = t.diffProps = t.diffChildren = t.diffNode = t.diff = void 0;
      var o = n(13),
        i = r(o),
        a = n(14),
        c = r(a),
        u = n(6),
        s = n(16),
        l = n(2),
        f = (t.diff = function(e, t) {
          var n = {};
          return f(e, t, n, 0), new c.default(e, n)
        }, t.diffNode = function(e, t, n, r) {
          if (e !== t) {
            var o = n[r];
            if (null == t) o = h(o, new i.default(l.PATCH_TYPE.REMOVE, e));
            else if ((0, u.isVirtualNode)(t))
              if ((0, u.isVirtualNode)(e))
                if (e.tagName === t.tagName && e.wxKey === t.wxKey)
                  if ("virtual" === e.tagName && e.wxVkey !== t.wxVkey) o = h(o, new i.default(l.PATCH_TYPE.VNODE, e, t));
                  else {
                    var a = p(t.props, t.newProps);
                    a && (o = h(o, new i.default(l.PATCH_TYPE.PROPS, e, a, t))), o = d(e, t, n, o, r)
                  }
            else o = h(o, new i.default(l.PATCH_TYPE.VNODE, e, t));
            else o = h(o, new i.default(l.PATCH_TYPE.VNODE, e, t));
            else {
              if (!(0, u.isVirtualText)(t)) throw new Error("unknow node type");
              t.text !== e.text && (o = h(o, new i.default(l.PATCH_TYPE.TEXT, e, t)))
            }
            o && (n[r] = o)
          }
        }),
        d = t.diffChildren = function(e, t, n, r, o) {
          for (var a = (0, u.getWxmlVersionTag)("customComponents"), c = !a || "virtual" === e.tagName && e.wxXCkey >= 1 && e.wxXCkey <= 4, d = e.children, p = c ? (0, s.listDiff)(d, t.children) : {
              children: t.children,
              moves: null
            }, v = p.children, g = 0; g < d.length; ++g) {
            var _ = d[g],
              y = v[g];
            ++o, y && f(_, y, n, o), (0, u.isVirtualNode)(_) && (o += _.descendants)
          }
          return p.moves && (r = h(r, new i.default(l.PATCH_TYPE.REORDER, e, p.moves, t))), r
        },
        p = t.diffProps = function(e, t) {
          for (var n = {}, r = 0; r < t.length; r++) {
            var o = t[r];
            n[o] = e[o]
          }
          return (0, u.isEmptyObject)(n) ? void 0 : n
        },
        h = t.appendPatch = function(e, t) {
          return e ? (e.push(t), e) : [t]
        }
    }, function(e, t, n) {
      "use strict";

      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(2),
        a = n(7),
        c = n(9),
        u = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(c),
        s = n(3),
        l = function(e) {
          if ((0,
              s.isDataThread)()) e.operationFlow.push([i.SYNC_EVENT_NAME.FLOW_MINIPULATE_CHILD]);
          else {
            if (e.operationFlow.iterator.nextStep()[0] !== i.SYNC_EVENT_NAME.FLOW_MINIPULATE_CHILD) throw new Error("Expect FLOW_MINIPULATE_CHILD but get another")
          }
        },
        f = function() {
          function e(t, n, o, i) {
            r(this, e), this.type = Number(t), this.vNode = n, this.patch = o, this.newVNode = i
          }
          return o(e, [{
            key: "apply",
            value: function(t) {
              switch (this.type) {
                case i.PATCH_TYPE.TEXT:
                  return e.stringPatch(t, this.patch);
                case i.PATCH_TYPE.VNODE:
                  return e.vNodePatch(t, this.patch);
                case i.PATCH_TYPE.PROPS:
                  return e.applyProperties(t, this.patch, this.newVNode.specProps);
                case i.PATCH_TYPE.REORDER:
                  return e.reorderChildren(t, this.patch, this.newVNode.children);
                case i.PATCH_TYPE.INSERT:
                  return e.insertNode(t, this.patch);
                case i.PATCH_TYPE.REMOVE:
                  return e.removeNode(t);
                default:
                  return t
              }
            }
          }], [{
            key: "stringPatch",
            value: function(e, t) {
              var n = e.parentNode,
                r = t.render();
              return n && r !== e && n.replaceChild(r, e), r
            }
          }, {
            key: "vNodePatch",
            value: function(e, t) {
              var n = (0, s.isDataThread)() ? e.__treeManager__ : u.default.instance,
                r = e.parentNode,
                o = t.render(null, n);
              return r && o !== e && ("wx:for" === r.__wxDynamicSync__ || "wx:if" === e.__wxDynamicSync__ ? (n.nodeId.addNode(o), r.replaceChild(o, e), l(n), n.nodeId.removeNode(e)) : r.replaceChild(o, e)), o
            }
          }, {
            key: "applyProperties",
            value: function(e, t, n) {
              return (0, a.applyProperties)(e, t, n), e
            }
          }, {
            key: "reorderChildren",
            value: function(e, t, n) {
              var r = (0, s.isDataThread)() ? e.__treeManager__ : u.default.instance,
                o = t.removes,
                i = t.inserts,
                a = e.childNodes,
                c = [];
              return i.forEach(function(e) {
                c.push({
                  node: void 0 !== e.oldIndex ? a[e.oldIndex] : null,
                  before: e.pos >= 0 ? a[e.pos] : void 0,
                  index: e.index
                })
              }), o.forEach(function(t) {
                var n = a[t];
                e.removeChild(n), "wx:for" === e.__wxDynamicSync__ && (l(r), r.nodeId.removeNode(n))
              }), c.forEach(function(t) {
                var o = t.node,
                  i = t.before,
                  a = t.index;
                null === o && (o = n[a].render(null, r)), "wx:for" === e.__wxDynamicSync__ ? (r.nodeId.addNode(o), e.insertBefore(o, i), l(r)) : e.insertBefore(o, i)
              }), e
            }
          }, {
            key: "insertNode",
            value: function(e, t) {
              var n = (0, s.isDataThread)() ? e.__treeManager__ : u.default.instance,
                r = t.render(null, n);
              return e && ("wx:for" === e.__wxDynamicSync__ || "wx:if" === r.__wxDynamicSync__ ? (n.nodeId.addNode(r), e.appendChild(r), l(n)) : e.appendChild(r)), e
            }
          }, {
            key: "removeNode",
            value: function(e) {
              var t = (0, s.isDataThread)() ? e.__treeManager__ : u.default.instance,
                n = e.parentNode;
              return n && (n.removeChild(e), "wx:for" !== n.__wxDynamicSync__ && "wx:if" !== e.__wxDynamicSync__ || (l(t), t.nodeId.removeNode(e))), null
            }
          }]), e
        }();
      t.default = f
    }, function(e, t, n) {
      "use strict";

      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(15),
        a = function() {
          function e(t, n) {
            r(this, e), this.oldTree = t, this.patches = n, this.patchIndexes = Object.keys(this.patches).map(function(e) {
              return Number(e)
            })
          }
          return o(e, [{
            key: "apply",
            value: function(e) {
              var t = this;
              if (0 === this.patchIndexes.length) return e;
              var n = (0, i.getDomIndex)(e, this.oldTree, this.patchIndexes);
              return this.patchIndexes.forEach(function(e) {
                var r = n[e];
                if (r) {
                  t.patches[e].forEach(function(e) {
                    e.apply(r)
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
      var n = (t.getDomIndex = function(e, t, r) {
          if (r && 0 != r.length) {
            r = r.sort(function(e, t) {
              return e - t
            });
            var o = {};
            return n(e, t, r, o, 0), o
          }
          return {}
        }, t.mapIndexToDom = function e(t, n, o, i, a) {
          if (t) {
            r(o, a, a) && (i[a] = t);
            var c = n.children;
            if (c)
              for (var u = t.childNodes, s = 0; s < c.length; ++s) {
                var l = c[s];
                ++a;
                var f = a + (l.descendants || 0);
                r(o, a, f) && e(u[s], l, o, i, a), a = f
              }
          }
        }),
        r = t.oneOfIndexesInRange = function(e, t, n) {
          for (var r = 0, o = e.length - 1; r <= o;) {
            var i = o + r >> 1,
              a = e[i];
            if (a < t) r = i + 1;
            else {
              if (!(a > n)) return !0;
              o = i - 1
            }
          }
          return !1
        }
    }, function(e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var n = Object.prototype.hasOwnProperty,
        r = (t.listDiff = function(e, t) {
          for (var i = r(e), a = i.keyIndexes, c = r(t), u = c.keyIndexes, s = c.freeIndexes, l = [], f = [], d = [], p = 0, h = 0, v = 0; v < e.length; ++v) {
            var g = e[v],
              _ = o(g);
            if (_)
              if (n.call(u, _)) {
                var y = u[_];
                l.push(t[y])
              } else f.push(v - h), ++h, l.push(null);
            else if (p < s.length) {
              var b = s[p];
              l.push(t[b]), ++p
            } else f.push(v - h), ++h, l.push(null)
          }
          for (var m = l, w = 0, k = [], S = 0; S < t.length;) {
            for (var C = t[S], P = o(C), x = m[w], M = o(x); null === x;) ++w, x = m[w], M = o(x);
            w >= m.length ? (d.push({
              oldIndex: a[P],
              index: S,
              pos: -1
            }), ++w, ++S) : M === P ? (k.push(w), ++w, ++S) : P ? (M ? u[M] === S + 1 ? d.push({
              oldIndex: a[P],
              index: S,
              pos: w
            }) : (++w, x = m[w], x && o(x) === P ? (k.push(w), ++w) : (--w, d.push({
              oldIndex: a[P],
              index: S,
              pos: w
            }))) : d.push({
              oldIndex: a[P],
              index: S,
              pos: w
            }), ++S) : ++w
          }
          for (var E = 0, O = 0; O < d.length; O++) {
            var T = d[O].pos;
            if (-1 === T) break;
            for (; E < k.length && T > k[E];) E++;
            E >= k.length ? d[O].pos = -1 : d[O].pos = k[E]
          }
          return {
            children: l,
            moves: {
              removes: f,
              inserts: d
            }
          }
        }, t.makeKeyAndFreeIndexes = function(e) {
          for (var t = {}, r = [], a = 0; a < e.length; ++a) {
            var c = e[a],
              u = o(c);
            u ? n.call(t, u) ? (console.warn('For developer:Do not set same key "' + u + '" in wx:key.'), i(c), r.push(a)) : t[u] = a : r.push(a)
          }
          return {
            keyIndexes: t,
            freeIndexes: r
          }
        }),
        o = t.getItemKey = function(e) {
          if (e) return e.wxKey
        },
        i = function(e) {
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
      var r = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        o = function() {
          function e(t) {
            n(this, e), this.text = String(t)
          }
          return r(e, [{
            key: "render",
            value: function() {
              return exparser.createTextNode(this.text)
            }
          }]), e
        }();
      o.prototype.type = "WxVirtualText", t.default = o
    }, function(e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.registerDataBehaviors = function() {
        exparser.registerBehavior({
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
        })
      }
    }, function(e, t, n) {
      "use strict";

      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(20),
        a = {},
        c = function() {
          function e() {
            r(this, e)
          }
          return o(e, null, [{
            key: "getAppData",
            value: function() {
              return a
            }
          }, {
            key: "mergeData",
            value: function(e, t) {
              if (null === t) return e;
              var n = JSON.parse(JSON.stringify(e));
              for (var r in t) {
                var o = (0, i.parsePath)(r),
                  a = (t[r], (0, i.getObjectByPath)(e, o, !1)),
                  c = a.obj,
                  u = a.key,
                  s = (0, i.getObjectByPath)(n, o, !0),
                  l = s.obj,
                  f = s.key,
                  d = s.changed;
                c && (c[u] = t[r]), l && (l[f] = d ? t[r] : {
                  __value__: t[r],
                  __wxspec__: !0
                })
              }
              return n
            }
          }]), e
        }();
      t.default = c
    }, function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getObjectByPath = t.parsePath = void 0;
      var r = n(6);
      t.parsePath = function(e) {
        for (var t = e.length, n = [], r = "", o = 0, i = !1, a = !1, c = 0; c < t; c++) {
          var u = e[c];
          if ("\\" === u) c + 1 < t && ("." === e[c + 1] || "[" === e[c + 1] || "]" === e[c + 1]) ? (r += e[c + 1], c++) : r += "\\";
          else if ("." === u) r && (n.push(r), r = "");
          else if ("[" === u) {
            if (r && (n.push(r), r = ""), 0 === n.length) throw new Error("path can not start with []: " + e);
            a = !0, i = !1
          } else if ("]" === u) {
            if (!i) throw new Error("must have number in []: " + e);
            a = !1, n.push(o), o = 0
          } else if (a) {
            if (u < "0" || u > "9") throw new Error("only number 0-9 could inside []: " + e);
            i = !0, o = 10 * o + u.charCodeAt(0) - 48
          } else r += u
        }
        if (r && n.push(r), 0 === n.length) throw new Error("path can not be empty");
        return n
      }, t.getObjectByPath = function(e, t, n) {
        for (var o = void 0, i = void 0, a = e, c = !1, u = 0; u < t.length; u++) Number(t[u]) === t[u] && t[u] % 1 == 0 ? "Array" !== (0, r.getDataType)(a) && (n && !c ? (c = !0, o[i] = {
          __value__: [],
          __wxspec__: !0
        }, a = o[i].__value__) : (o[i] = [], a = o[i])) : "Object" !== (0, r.getDataType)(a) && (n && !c ? (c = !0, o[i] = {
          __value__: {},
          __wxspec__: !0
        }, a = o[i].__value__) : (o[i] = {}, a = o[i])), i = t[u], o = a, (a = a[t[u]]) && a.__wxspec__ && (a = a.__value__, c = !0);
        return {
          obj: o,
          key: i,
          changed: c
        }
      }
    }]),
    __appServiceEngine__ = function(e) {
      function t(r) {
        if (n[r]) return n[r].exports;
        var o = n[r] = {
          exports: {},
          id: r,
          loaded: !1
        };
        return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
      }
      var n = {};
      return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(1);
      Object.defineProperty(t, "Component", {
        enumerable: !0,
        get: function() {
          return r.componentHolder
        }
      }), Object.defineProperty(t, "Page", {
        enumerable: !0,
        get: function() {
          return r.pageHolder
        }
      }), Object.defineProperty(t, "getCurrentPages", {
        enumerable: !0,
        get: function() {
          return r.getCurrentPages
        }
      });
      var o = n(15);
      Object.defineProperty(t, "App", {
        enumerable: !0,
        get: function() {
          return o.appHolder
        }
      }), Object.defineProperty(t, "getApp", {
        enumerable: !0,
        get: function() {
          return o.getApp
        }
      }), "function" == typeof logxx && logxx("app-service-engine start");
      t.Behavior = __virtualDOM__.Behavior
    }, function(e, t, n) {
      "use strict";

      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getTabBarRoutes = t.getRouteToPage = t.pageHolder = t.componentHolder = t.getCurrentPages = t.getCurrentPage = void 0;
      var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        i = n(2),
        a = n(6),
        c = r(a),
        u = n(13),
        s = r(u),
        l = n(2),
        f = n(5),
        d = n(14),
        p = n(8),
        h = r(p),
        v = n(9),
        g = r(v),
        _ = Object.prototype.hasOwnProperty,
        y = wx.ShareInfoStorage,
        b = wx._getRealRoute,
        m = wx._triggerBeforeUnloadPage,
        w = wx._triggerBeforeShareAppMessage;
      delete wx.ShareInfoStorage, delete wx._getRealRoute, delete wx._triggerBeforeUnloadPage, delete wx._triggerBeforeShareAppMessage;
      var k = void 0,
        S = void 0,
        C = {},
        P = {},
        x = [],
        M = [];
      __wxConfig.onReady(function() {
        var e = __wxConfig.page || {},
          t = __wxConfig.global ? __wxConfig.global.window : {};
        for (var n in e) e[n].window = Object.assign({}, t, e[n].window);
        __wxConfig.tabBar && __wxConfig.tabBar.list && "object" === o(__wxConfig.tabBar.list) && "function" == typeof __wxConfig.tabBar.list.forEach && __wxConfig.tabBar.list.forEach(function(e) {
          M.push(e.pagePath)
        }), S = (__wxConfig.appLaunchInfo || {}).scene || 0
      });
      var E = {
          appRouteTime: 0,
          newPageTime: 0,
          pageReadyTime: 0
        },
        O = function(e, t, n) {
          Reporter.speedReport({
            key: e,
            timeMark: {
              startTime: t,
              endTime: n
            }
          })
        },
        T = (t.getCurrentPage = function() {
          return k
        }, t.getCurrentPages = function() {
          var e = [];
          return x.forEach(function(t) {
            e.push(t.page)
          }), e
        }, function(e, t) {
          return e.__wxExparserNodeId__ ? _.call(Object.getPrototypeOf(e), t) : _.call(e, t)
        }),
        I = function(e) {
          if (void 0 === __wxConfig.pages) return !1;
          for (var t = 0; t < __wxConfig.pages.length; t++) {
            if (__wxConfig.pages[t] === e) return !0
          }
          return !1
        },
        A = (t.componentHolder = function(e) {
          __wxRouteBegin = !1;
          var t = __virtualDOM__.Component(e);
          t && (P[t] = exparser.Component._list[t])
        }, t.pageHolder = function(e) {
          if (!__wxRouteBegin) throw (0, l.error)("Page 注册错误", "Please do not register multiple Pages in " + __wxRoute + ".js"), new i.AppServiceEngineKnownError("Please do not register multiple Pages in " + __wxRoute + ".js");
          __wxRouteBegin = !1;
          var t = __wxRoute;
          if (!I(t)) throw (0, l.error)("Page 注册错误", __wxRoute + " has not been declared in app.json."), new i.AppServiceEngineKnownError(__wxRoute + " has not been declared in app.json.");
          var n = "undefined" != typeof __wxAppCode__ ? __wxAppCode__[t + ".json"] || {} : {};
          if ("Object" !== (0, l.getDataType)(e)) throw (0, l.error)("Page 注册错误", "Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js"), new i.AppServiceEngineKnownError("Options is not object: " + JSON.stringify(e) + " in " + __wxRoute + ".js");
          (0, l.info)("Register Page: " + t), void 0 !== n.usingComponents ? (__virtualDOM__.Page(e), P[t] = exparser.Component._list[t]) : P[t] = e
        }, function(e) {
          try {
            if ("number" == typeof __wxConfig.page[e + ".html"].window.onReachBottomDistance) return __wxConfig.page[e + ".html"].window.onReachBottomDistance
          } catch (e) {
            return f.DEFAULT_ON_REACH_BOTTOM_DISTANCE
          }
          return f.DEFAULT_ON_REACH_BOTTOM_DISTANCE
        }),
        j = (0, l.surroundByTryCatch)(function(e, t, n, r) {
          var o = arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
          (0, l.info)("Update view with init data");
          var i = e.page,
            a = {};
          a.webviewId = t, a.enablePullUpRefresh = T(i, "onReachBottom"), a.enablePageScroll = T(i, "onPageScroll"), a.onReachBottomDistance = A(i.__route__), a.isPageReload = o, a.pageScrollTop = i.__pageScrollTop__, a.scene = S, a.route = i.__route__, a.query = i.options, a.lastRoute = e.lastRoute, a.lastQuery = e.lastQuery;
          var c = {
            data: n ? void 0 : i.data,
            ext: a,
            options: {
              firstRender: !0,
              usingCustomComponents: n,
              timestamp: r,
              path: i.__route__
            }
          };
          h.default.emit(c, t), (0, d.triggerAnalytics)("pageReady", i)
        }),
        B = function(e, t, n) {
          var r = void 0;
          P.hasOwnProperty(e) ? r = P[e] : ((0, l.warn)("Page route 错误", "Page[" + e + "] not found. May be caused by: 1. Forgot to add page route in app.json. 2. Invoking Page() in async task."), r = {});
          var o = "undefined" != typeof __wxAppCode__ ? __wxAppCode__[e + ".json"] || {} : {},
            i = void 0 !== o.usingComponents,
            a = null;
          E.newPageTime = Date.now(), i && (a = s.default.create(t, e));
          var u = i ? a.page : new c.default(r, t, e),
            p = (0, g.default)(n);
          if (k = {
              page: u,
              webviewId: t,
              route: e,
              lastRoute: k ? k.route : "",
              lastQuery: k ? k.page.options : {},
              node: i ? a.node : void 0
            }, x.push(k), i) {
            var h = a.node,
              v = {},
              _ = !1;
            for (var y in p) exparser.Component.hasProperty(h, y) && (v[y] = decodeURIComponent(p[y]), _ = !0);
            _ && h.setData(v), __virtualDOM__.attachView(h)
          }
          u.options = p, j(k, t, void 0 !== o.usingComponents, E.newPageTime), (0, l.isDevTools)() && (__wxAppData[e] = u.data, __wxAppData[e].__webviewId__ = t, (0, l.publish)(f.UPDATE_APP_DATA)), u.onLoad(n), u.onShow(), C[t] = {
            page: u,
            route: e
          }, (0, d.triggerAnalytics)("pageLoad", u), (0, d.triggerAnalytics)("enterPage", u), O("appRoute2newPage", E.appRouteTime, E.newPageTime)
        },
        D = function(e) {
          e.page.onHide(), (0, d.triggerAnalytics)("leavePage", e.page)
        },
        N = function(e) {
          m(e.webviewId), e.page.onUnload(), e.node && s.default.destroy(e.node, e.page), (0, l.isDevTools)() && (delete __wxAppData[e.route], (0, l.publish)(f.UPDATE_APP_DATA)), delete C[e.webviewId], x = x.slice(0, x.length - 1), (0, d.triggerAnalytics)("pageUnload", e.page), (0, d.triggerAnalytics)("leavePage", e.page)
        },
        R = function(e) {
          return -1 !== M.indexOf(e.route) || -1 !== M.indexOf(e.route + ".html")
        },
        L = function(e, t, n) {
          k && D(k), C.hasOwnProperty(t) ? (0, l.error)("Page route 错误(system error)", "navigateTo with an already exist webviewId " + t) : B(e, t, n)
        },
        F = function(e, t, n) {
          k && N(k), C.hasOwnProperty(t) ? (0, l.error)("Page route 错误(system error)", "redirectTo with an already exist webviewId " + t) : B(e, t, n)
        },
        W = function(e) {
          for (var t = !1, n = x.length - 1; n >= 0; n--) {
            var r = x[n];
            if (r.webviewId === e) {
              t = !0, k = r, r.page.onShow(), (0, d.triggerAnalytics)("enterPage", r.page);
              break
            }
            N(r)
          }
          t || (0, l.error)("Page route 错误(system error)", "navigateBack with an unexist webviewId " + e)
        },
        V = function(e, t, n) {
          var r = !0;
          if (0 === x.length) return void(0, l.warn)("Page route 错误", "switchTab before pages are registered.");
          for (; x.length > 1;) N(x[x.length - 1]), r = !1;
          if (x[0].webviewId === t) k = x[0], r || k.page.onShow();
          else if (R(x[0]) ? r && D(x[0]) : N(x[0]), C.hasOwnProperty(t)) {
            var o = C[t].page;
            k = {
              webviewId: t,
              route: e,
              page: o
            }, x = [k], o.onShow(), (0, d.triggerAnalytics)("enterPage", o), (0, d.triggerAnalytics)("switchTab", o)
          } else x = [], B(e, t, n)
        },
        U = function() {
          var e = __wxConfig.pages;
          if (void 0 !== e)
            for (var t = 0; t < e.length; t++) {
              var n = e[t],
                r = exparser.Component._list[n];
              r && !exparser.Component.isPrepared(r) && exparser.Component.prepare(r)
            }
        },
        H = function(e, t, n) {
          U(), C.hasOwnProperty(t) ? (0, l.error)("Page route 错误(system error)", "appLaunch with an already exist webviewId " + t) : B(e, t, n)
        },
        G = function(e, t, n) {
          for (; x.length > 0;) N(x[x.length - 1]);
          B(e, t, n)
        },
        q = function(e, t, n, r) {
          (0, l.info)("On app route: " + e), E.appRouteTime = Date.now(), "navigateTo" === r ? L(e, t, n) : "redirectTo" === r ? F(e, t, n) : "navigateBack" === r ? W(t) : "switchTab" === r ? V(e, t, n) : "appLaunch" === r ? H(e, t, n) : "reLaunch" === r || "autoReLaunch" === r ? G(e, t, n) : (0, l.error)("Page route 错误(system error)", "Illegal open type: " + r)
        },
        K = function(e, t) {
          (0, l.info)("On page reload: " + e), C.hasOwnProperty(t) ? j(C[t], t, !1, Date.now(), !0) : (0, l.error)("Page reload(system error)", "Can not find webviewId " + t)
        },
        J = function(e, t, n, r) {
          if (!C.hasOwnProperty(e)) return void(0, l.warn)("事件警告", "OnWebviewEvent: " + n + ", WebviewId: " + e + " not found");
          var o = C[e],
            i = o.page;
          if (n === f.DOM_READY_EVENT) return E.pageReadyTime = Date.now(), (0, l.info)("Invoke event onReady in page: " + o.route), i.onReady(), void O("newPage2pageReady", E.newPageTime, E.pageReadyTime);
          if ("number" == typeof t) {
            var a = __virtualDOM__.getNodeById(t, e);
            if (!a) return;
            var c = exparser.Element.getMethodCaller(a);
            return (0, l.info)("Invoke event " + n + " in component: " + a.is), T(c, n) ? l.safeInvoke.call(c, n, r) : void(0, l.warn)("事件警告", "Do not have " + n + " handler in component: " + a.is + ". Please make sure that " + n + " handler has been defined in " + a.is + ".")
          }
          return (0, l.info)("Invoke event " + n + " in page: " + o.route), T(i, n) ? l.safeInvoke.call(i, n, r) : void(0, l.warn)("事件警告", "Do not have " + n + " handler in current page: " + o.route + ". Please make sure that " + n + " handler has been defined in " + o.route + ", or " + o.route + " has been added into app.json")
        },
        Y = function(e) {
          if (!C.hasOwnProperty(e)) return void(0, l.warn)("事件警告", "onPullDownRefresh WebviewId: " + e + " not found");
          var t = C[e],
            n = t.page;
          T(n, "onPullDownRefresh") && ((0, l.info)("Invoke event onPullDownRefresh in page: " + t.route), l.safeInvoke.call(n, "onPullDownRefresh"), (0, d.triggerAnalytics)("pullDownRefresh", n))
        },
        z = function(e, t) {
          var n = e,
            r = C[t],
            o = r.page,
            i = void 0;
          if (T(o, "onShareAppMessage") && (i = "onShareAppMessage"), i) {
            (0, l.info)("Invoke event " + i + " in page: " + r.route);
            var a = {
              from: e.fromShareButton ? "button" : "menu",
              target: e.target
            };
            e.webViewUrl && (a.webViewUrl = e.webViewUrl);
            var c = l.safeInvoke.call(o, i, a) || {};
            n.title = c.title || e.title, n.desc = c.desc || e.desc, n.path = c.path ? (0, l.addHtmlSuffixToUrl)(c.path) : e.path, c.imageUrl && !/^(http|https|wxfile):\/\//.test(c.imageUrl) ? n.imageUrl = b(c.imageUrl, !1) : n.imageUrl = c.imageUrl, c.cacheKey && (n.cacheKey = c.cacheKey), n.path.length > 0 && "/" === n.path[0] && (n.path = n.path.substr(1)), n.success = c.success, n.cancel = c.cancel, n.fail = c.fail, n.complete = c.complete, (0, d.triggerAnalytics)("share", o)
          }
          return n
        };
      wx.onAppRoute((0, l.surroundByTryCatch)(function(e) {
        var t = e.path,
          n = e.webviewId,
          r = e.query || {},
          o = e.openType;
        q(t, n, r, o)
      }), "onAppRoute"), wx.onPageReload((0, l.surroundByTryCatch)(function(e) {
        var t = e.path,
          n = e.webviewId;
        K(t, n)
      }), "onPageReload"), wx.onWebviewEvent((0, l.surroundByTryCatch)(function(e) {
        var t = e.webviewId,
          n = e.eventName,
          r = e.data,
          o = e.nodeId;
        return J(t, o, n, r)
      }, "onWebviewEvent")), wx.onAppEnterForeground(function(e) {
        0 !== e.scene && "0" !== e.scene && (S = e.scene)
      }), WeixinJSBridge.on("onPullDownRefresh", (0, l.surroundByTryCatch)(function(e, t) {
        Y(t)
      }, "onPullDownRefresh"));
      var $ = function(e, t) {
        if (null != C[t]) {
          w(t);
          var n = z(e, t),
            r = void 0;
          r = !0 === e.fromShareButton ? "shareAppMessageDirectly" : "shareAppMessage", n.useDefaultSnapshot = !0, WeixinJSBridge.invoke(r, n, function(e) {
            e.errMsg = e.errMsg.replace("shareAppMessageDirectly", "shareAppMessage"), void 0 !== e.shareInfos && e.shareInfos.length > 0 && (e.shareTickets = e.shareInfos.filter(function(e) {
              return e.shareKey && e.shareName
            }).map(function(e) {
              return y.set(e.shareKey, e.shareName)
            })), delete e.shareInfos;
            var t = /^shareAppMessage:ok/.test(e.errMsg),
              o = /^shareAppMessage:cancel/.test(e.errMsg),
              i = /^shareAppMessage:fail/.test(e.errMsg);
            t ? Reporter.reportIDKey({
              key: r
            }) : i ? Reporter.reportIDKey({
              key: r + "_fail"
            }) : Reporter.reportIDKey({
              key: r + "_cancel"
            }), t && "function" == typeof n.success ? n.success(e) : o && "function" == typeof n.fail ? (e.errMsg = "shareAppMessage:fail cancel", n.fail(e)) : i && "function" == typeof n.fail && n.fail(e), "function" == typeof n.complete && n.complete(e)
          })
        }
      };
      WeixinJSBridge.on("onShareAppMessage", (0, l.surroundByTryCatch)($, "onShareAppMessage")), WeixinJSBridge.subscribe("tapShareButton", function(e, t) {
        if (!C.hasOwnProperty(t)) return void(0, l.warn)("事件警告", "tapShareButton WebviewId: " + t + " not found");
        var n = C[t],
          r = n.page,
          o = (0, l.addHtmlSuffixToUrl)(r.route);
        Object.keys(r.options).length > 0 && (o += "?" + Object.keys(r.options).map(function(e) {
          return e + "=" + r.options[e]
        }).join("&")), (0, l.surroundByTryCatch)($, "onShareAppMessage")({
          path: o,
          title: "",
          target: e ? e.target : void 0,
          fromShareButton: !0
        }, t)
      }), WeixinJSBridge.subscribe("savePageState", (0, l.surroundByTryCatch)(function(e, t) {
        if (!C.hasOwnProperty(t)) return void(0, l.warn)("事件警告", "onPageWillManuallyTerminate WebviewId: " + t + " not found");
        C[t].page.__pageScrollTop__ = e.scrollTop
      }), "savePageState"), WeixinJSBridge.on("onTabItemTap", (0, l.surroundByTryCatch)(function(e, t) {
        if (C.hasOwnProperty(t)) {
          var n = C[t],
            r = n.page;
          if ("undefined" != typeof __wxConfig && __wxConfig.tabBar && __wxConfig.tabBar.list && __wxConfig.tabBar.list[e.index]) {
            var o = {
              index: e.index,
              pagePath: (__wxConfig.tabBar.list[e.index].pagePath || "").replace(/\.html$/, ""),
              text: __wxConfig.tabBar.list[e.index].text
            };
            if (o.pagePath !== n.route) return;
            r.hasOwnProperty("onTabItemTap") && ((0, l.info)("Invoke event onTabItemTap in page: " + n.route), l.safeInvoke.call(r, "onTabItemTap", o))
          }
        }
      }));
      t.getRouteToPage = function() {
        return P
      }, t.getTabBarRoutes = function() {
        return M
      }
    }, function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = n(3);
      Object.keys(r).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return r[e]
          }
        })
      });
      var o = n(4);
      Object.keys(o).forEach(function(e) {
        "default" !== e && "__esModule" !== e && Object.defineProperty(t, e, {
          enumerable: !0,
          get: function() {
            return o[e]
          }
        })
      })
    }, function(e, t) {
      "use strict";

      function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }

      function r(e, t) {
        if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return !t || "object" != typeof t && "function" != typeof t ? e : t
      }

      function o(e, t) {
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

      function i() {
        var e = "";
        return "undefined" != typeof window && window.navigator ? window.navigator.userAgent.indexOf("appservice") > -1 ? e = "devtools" : window.navigator.userAgent.toLowerCase().indexOf("android") > -1 && (e = "android") : e = "android" === __wxConfig.platform ? "android" : "devtools" === __wxConfig.platform ? "devtools" : "ios", e
      }

      function a() {
        var e = void 0,
          t = Array.prototype.slice.call(arguments),
          n = t[0];
        Reporter.__route__ = this.__route__, Reporter.__method__ = n, t = t.slice(1);
        try {
          var r = Date.now();
          e = this[n].apply(this, t);
          var o = Date.now() - r;
          o > 1e3 && Reporter.slowReport({
            key: "pageInvoke",
            cost: o,
            extend: "at " + this.__route__ + " page " + n + " function"
          })
        } catch (e) {
          Reporter.thirdErrorReport({
            error: e,
            extend: "at " + this.__route__ + " page " + n + " function"
          })
        }
        return e
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var c = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
      } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
      };
      t.getPlatform = i, t.safeInvoke = a;
      var u = (t.isEmptyObject = function(e) {
          for (var t in e)
            if (e.hasOwnProperty(t)) return !1;
          return !0
        }, t.extend = function(e, t) {
          for (var n = Object.keys(t), r = n.length; r--;) e[n[r]] = t[n[r]];
          return e
        }),
        s = (t.noop = function() {}, t.getDataType = function(e) {
          return Object.prototype.toString.call(e).split(" ")[1].split("]")[0]
        }, t.isObject = function(e) {
          return null !== e && "object" === (void 0 === e ? "undefined" : c(e))
        }, Object.prototype.hasOwnProperty),
        l = (t.hasOwn = function(e, t) {
          return s.call(e, t)
        }, t.def = function(e, t, n, r) {
          Object.defineProperty(e, t, {
            value: n,
            enumerable: !!r,
            writable: !0,
            configurable: !0
          })
        }, Object.prototype.toString),
        f = (t.isPlainObject = function(e) {
          return "[object Object]" === l.call(e)
        }, t.error = function(e, t) {
          console.group(new Date + " " + e), console.error(t), console.groupEnd()
        }, t.warn = function(e, t) {
          console.group(new Date + " " + e), console.warn(t), console.groupEnd()
        }, t.info = function(e) {
          __wxConfig && __wxConfig.debug && console.info(e)
        }, t.surroundByTryCatch = function(e, t) {
          return function() {
            try {
              return e.apply(e, arguments)
            } catch (e) {
              return f(e, t),
                function() {}
            }
          }
        }, t.errorReport = function(e, t) {
          if ("[object Error]" === Object.prototype.toString.apply(e)) {
            if ("AppServiceEngineKnownError" === e.type) throw e;
            Reporter.errorReport({
              key: "jsEnginScriptError",
              error: e,
              extend: t
            })
          }
        });
      t.AppServiceEngineKnownError = function(e) {
        function t(e) {
          n(this, t);
          var o = r(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, "APP-SERVICE-Engine:" + e));
          return o.type = "AppServiceEngineKnownError", o
        }
        return o(t, e), t
      }(Error), t.publish = function() {
        var e = Array.prototype.slice.call(arguments),
          t = {
            options: {
              timestamp: Date.now()
            }
          };
        e[1] ? e[1].options = u(e[1].options || {}, t.options) : e[1] = t, WeixinJSBridge.publish.apply(WeixinJSBridge, e)
      }
    }, function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.hasExitCondition = t.shouldExit = t.addHtmlSuffixToUrl = t.isDevTools = void 0;
      var r = n(5);
      t.isDevTools = function() {
        return !!("undefined" != typeof window && window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("appservice") > -1)
      }, t.addHtmlSuffixToUrl = function(e) {
        if ("string" != typeof e) return e;
        var t = e.split("?")[0],
          n = e.split("?")[1];
        return t += ".html", void 0 !== n ? t + "?" + n : t
      }, t.shouldExit = function(e) {
        return "hang" !== e && "hide" !== e
      }, t.hasExitCondition = function(e) {
        return -1 !== r.EXIT_SCENES.indexOf(e.scene)
      }
    }, function(e, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      t.DOM_READY_EVENT = "__DOMReady", t.UPDATE_APP_DATA = "__updateAppData", t.DEFAULT_ON_REACH_BOTTOM_DISTANCE = 50, t.EXIT_SCENES = [1007, "1007", 1008, "1008", 1011, "1011", 1025, "1025", 1047, "1047", 1048, "1048", 1049, "1049", 1050, "1050"]
    }, function(e, t, n) {
      "use strict";

      function r(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function o(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        a = n(2),
        c = n(7),
        u = n(8),
        s = r(u),
        l = n(9),
        f = r(l),
        d = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"],
        p = function(e) {
          for (var t = 0; t < d.length; ++t)
            if (d[t] === e) return !0;
          return "data" === e
        },
        h = ["__wxWebviewId__", "__route__"],
        v = ["route"],
        g = function(e) {
          return -1 !== h.indexOf(e)
        },
        _ = function() {
          function e() {
            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
              n = this,
              r = arguments[1],
              i = arguments[2];
            o(this, e);
            var c = {
              __wxWebviewId__: r,
              __route__: i
            };
            h.forEach(function(e) {
              n.__defineSetter__(e, function() {
                (0, a.warn)("关键字保护", "should not change the protected attribute " + e)
              }), n.__defineGetter__(e, function() {
                return c[e]
              })
            }), t.data = t.data || {}, (0, a.isPlainObject)(t.data) || (0, a.error)("Page data error", "data must be an object, your data is " + JSON.stringify(t.data)), this.data = JSON.parse(JSON.stringify(t.data)), d.forEach(function(e) {
              n[e] = function() {
                var n = (t[e] || a.noop).bind(this),
                  r = void 0;
                Reporter.__route__ = this.__route__, Reporter.__method__ = e, (0, a.info)(this.__route__ + ": " + e + " have been invoked");
                try {
                  var o = Date.now();
                  r = n.apply(this, arguments);
                  var i = Date.now() - o;
                  i > 1e3 && Reporter.slowReport({
                    key: "pageInvoke",
                    cost: i,
                    extend: "at " + this.__route__ + " page lifeCycleMethod " + e + " function"
                  })
                } catch (t) {
                  Reporter.thirdErrorReport({
                    error: t,
                    extend: "at " + this.__route__ + " page lifeCycleMethod " + e + " function"
                  })
                }
                return r
              }.bind(n)
            });
            for (var u in t) ! function(e) {
              g(e) ? (0, a.warn)("关键字保护", "Page's " + e + " is write-protected") : p(e) || ("Function" === (0, a.getDataType)(t[e]) ? n[e] = function() {
                var n = void 0;
                Reporter.__route__ = this.__route__, Reporter.__method__ = e;
                try {
                  var r = Date.now();
                  n = t[e].apply(this, arguments);
                  var o = Date.now() - r;
                  o > 1e3 && Reporter.slowReport({
                    key: "pageInvoke",
                    cost: o,
                    extend: "at " + this.__route__ + " page " + e + " function"
                  })
                } catch (t) {
                  Reporter.thirdErrorReport({
                    error: t,
                    extend: "at " + this.__route__ + " page " + e + " function"
                  })
                }
                return n
              }.bind(n) : n[e] = (0, f.default)(t[e]))
            }(u);
            var s = {
              route: i
            };
            v.forEach(function(e) {
              n.hasOwnProperty(e) || (n[e] = s[e])
            }), "function" == typeof t.onShareAppMessage && wx.showShareMenu()
          }
          return i(e, [{
            key: "update",
            value: function() {
              (0, a.warn)("将被废弃", "Page.update is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]")
            }
          }, {
            key: "forceUpdate",
            value: function() {
              (0, a.warn)("将被废弃", "Page.forceUpdate is deprecated, setData updates the view implicitly. [It will be removed in 2016.11]")
            }
          }, {
            key: "setData",
            value: function(e, t) {
              try {
                var n = (0, a.getDataType)(e);
                if ("Object" !== n) return void(0, a.error)("类型错误", "setData accepts an Object rather than some " + n);
                for (var r in e) {
                  void 0 === e[r] && (0, a.error)('Setting data field "' + r + '" to undefined is invalid.');
                  var o = (0, c.getObjectByPath)(this.data, r),
                    i = o.obj,
                    u = o.key;
                  i && (i[u] = (0, f.default)(e[r]))
                }
                s.default.emit({
                  data: e
                }, this.__wxWebviewId__, t)
              } catch (e) {
                (0, a.errorReport)(e)
              }
            }
          }, {
            key: "pageScrollTo",
            value: function(e) {
              (0, a.publish)("pageScrollTo", {
                data: e
              }, [this.__wxWebviewId__])
            }
          }]), e
        }();
      t.default = _
    }, function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getObjectByPathStrictly = t.getObjectByPath = t.parsePath = void 0;
      var r = n(2),
        o = t.parsePath = function(e) {
          if ("String" !== (0, r.getDataType)(e)) throw (0, r.error)("数据路径错误", "Path must be a string"), new r.AppServiceEngineKnownError("Path must be a string");
          for (var t = e.length, n = [], o = "", i = 0, a = !1, c = !1, u = 0; u < t; u++) {
            var s = e[u];
            if ("\\" === s) u + 1 < t && ("." === e[u + 1] || "[" === e[u + 1] || "]" === e[u + 1]) ? (o += e[u + 1], u++) : o += "\\";
            else if ("." === s) o && (n.push(o), o = "");
            else if ("[" === s) {
              if (o && (n.push(o), o = ""), 0 === n.length) throw (0, r.error)("数据路径错误", "Path can not start with []: " + e), new r.AppServiceEngineKnownError("Path can not start with []: " + e);
              c = !0, a = !1
            } else if ("]" === s) {
              if (!a) throw (0, r.error)("数据路径错误", "Must have number in []: " + e), new r.AppServiceEngineKnownError("Must have number in []: " + e);
              c = !1, n.push(i), i = 0
            } else if (c) {
              if (s < "0" || s > "9") throw (0, r.error)("数据路径错误", "Only number 0-9 could inside []: " + e), new r.AppServiceEngineKnownError("Only number 0-9 could inside []: " + e);
              a = !0, i = 10 * i + s.charCodeAt(0) - 48
            } else o += s
          }
          if (o && n.push(o), 0 === n.length) throw (0, r.error)("数据路径错误", "Path can not be empty"), new r.AppServiceEngineKnownError("Path can not be empty");
          return n
        };
      t.getObjectByPath = function(e, t) {
        for (var n = o(t), i = {}, a = void 0, c = e, u = 0; u < n.length; u++) Number(n[u]) === n[u] && n[u] % 1 == 0 ? Array.isArray(c) || (i[a] = [], c = i[a]) : (0, r.isPlainObject)(c) || (i[a] = {}, c = i[a]), a = n[u], i = c, c = c[n[u]];
        return {
          obj: i,
          key: a
        }
      }, t.getObjectByPathStrictly = function(e, t) {
        for (var n = o(t), i = void 0, a = void 0, c = e, u = 0; u < n.length; u++) Number(n[u]) === n[u] && n[u] % 1 == 0 ? Array.isArray(c) || (c = []) : (0, r.isPlainObject)(c) || (c = {}), a = n[u], i = c, c = c[n[u]];
        return {
          obj: i,
          key: a
        }
      }
    }, function(e, t) {
      "use strict";

      function n(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = Object.assign || function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r])
          }
          return e
        },
        o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = function() {
          function e() {
            n(this, e)
          }
          return o(e, null, [{
            key: "emit",
            value: function(e, t) {
              var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : function() {};
              wx.invokeWebviewMethod({
                name: "appDataChange",
                args: r({}, e, {
                  complete: n
                }),
                webviewIds: [t]
              })
            }
          }]), e
        }();
      t.default = i
    }, function(e, t, n) {
      "use strict";
      e.exports = n(10)
    }, function(e, t, n) {
      "use strict";

      function r(e) {}

      function o(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : r;
        if (null === e) return null;
        var n = (0, c.copyValue)(e);
        if (null !== n) return n;
        var o = (0, c.copyCollection)(e, t),
          a = null !== o ? o : e;
        return i(e, t, a, [e], [a])
      }

      function i(e, t, n, r, o) {
        if (null === e) return null;
        var s = (0, c.copyValue)(e);
        if (null !== s) return s;
        var l = (0, u.getKeys)(e).concat((0, u.getSymbols)(e)),
          f = void 0,
          d = void 0,
          p = void 0,
          h = void 0,
          v = void 0,
          g = void 0,
          _ = void 0,
          y = void 0;
        for (f = 0, d = l.length; f < d; ++f) p = l[f], h = e[p], v = (0, u.indexOf)(r, h), g = void 0, _ = void 0, y = void 0, -1 === v ? (g = (0, c.copy)(h, t), _ = null !== g ? g : h, null !== h && /^(?:function|object)$/.test(void 0 === h ? "undefined" : a(h)) && (r.push(h), o.push(_))) : y = o[v], n[p] = y || i(h, t, _, r, o);
        return n
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var a = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        c = n(11),
        u = n(12);
      t.default = o
    }, function(e, t) {
      "use strict";

      function n(e, t) {
        var n = o(e);
        return null !== n ? n : r(e, t)
      }

      function r(e, t) {
        if ("function" != typeof t) throw new TypeError("customizer is must be a Function");
        if ("function" == typeof e) return e;
        var n = a.call(e);
        if ("[object Array]" === n) return [];
        if ("[object Object]" === n && e.constructor === Object) return {};
        if ("[object Date]" === n) return new Date(e.getTime());
        if ("[object RegExp]" === n) {
          var r = String(e),
            o = r.lastIndexOf("/");
          return new RegExp(r.slice(1, o), r.slice(o + 1))
        }
        var i = t(e);
        return void 0 !== i ? i : null
      }

      function o(e) {
        var t = void 0 === e ? "undefined" : i(e);
        return null !== e && "object" !== t && "function" !== t ? e : null
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        a = Object.prototype.toString;
      t.copy = n, t.copyCollection = r, t.copyValue = o
    }, function(e, t) {
      "use strict";

      function n(e, t) {
        if ("[object Array]" !== o.call(e)) throw new TypeError("array must be an Array");
        var n = void 0,
          r = void 0,
          i = void 0;
        for (n = 0, r = e.length; n < r; ++n)
          if ((i = e[n]) === t || i !== i && t !== t) return n;
        return -1
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
          return typeof e
        } : function(e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
        },
        o = Object.prototype.toString,
        i = "function" == typeof Object.keys ? function(e) {
          return Object.keys(e)
        } : function(e) {
          var t = void 0 === e ? "undefined" : r(e);
          if (null === e || "function" !== t && "object" !== t) throw new TypeError("obj must be an Object");
          var n = [],
            o = void 0;
          for (o in e) Object.prototype.hasOwnProperty.call(e, o) && n.push(o);
          return n
        },
        a = "function" == typeof Symbol ? function(e) {
          return Object.getOwnPropertySymbols(e)
        } : function() {
          return []
        };
      t.getKeys = i, t.getSymbols = a, t.indexOf = n
    }, function(e, t, n) {
      "use strict";

      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      });
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(2),
        a = n(9),
        c = function(e) {
          return e && e.__esModule ? e : {
            default: e
          }
        }(a),
        u = ["onLoad", "onReady", "onShow", "onRouteEnd", "onHide", "onUnload"],
        s = function() {
          function e() {
            r(this, e)
          }
          return o(e, null, [{
            key: "create",
            value: function(e, t) {
              var n = __virtualDOM__.addView(e, t),
                r = exparser.Element.getMethodCaller(n);
              if (r.__wxWebviewId__ = e, r.__route__ = t, r.route = t, n.__customConstructor__ === __virtualDOM__.Page) {
                var o = n.getRootBehavior().methods,
                  a = r.__freeData__;
                for (var s in o) r[s] = o[s].bind(r);
                for (var l in a) r[l] = (0, c.default)(a[l])
              }
              return u.forEach(function(e) {
                var t = r[e];
                r[e] = function() {
                  var n = t || i.noop,
                    r = void 0;
                  Reporter.__route__ = this.__route__, Reporter.__method__ = e, (0, i.info)(this.__route__ + ": " + e + " have been invoked");
                  try {
                    var o = Date.now();
                    r = n.apply(this, arguments);
                    var a = Date.now() - o;
                    a > 1e3 && Reporter.slowReport({
                      key: "pageInvoke",
                      cost: a,
                      extend: 'at "' + this.__route__ + '" page lifeCycleMethod ' + e + " function"
                    })
                  } catch (t) {
                    Reporter.thirdErrorReport({
                      error: t,
                      extend: 'at "' + this.__route__ + '" page lifeCycleMethod ' + e + " function"
                    })
                  }
                  return r
                }.bind(r)
              }), "function" == typeof r.onShareAppMessage && wx.showShareMenu(), {
                page: r,
                node: n
              }
            }
          }, {
            key: "destroy",
            value: function(e, t) {
              __virtualDOM__.removeView(t.__wxWebviewId__, e)
            }
          }]), e
        }();
      t.default = s
    }, function(e, t, n) {
      "use strict";
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.triggerAnalytics = void 0;
      var r = n(1),
        o = n(7),
        i = n(2),
        a = n(15),
        c = {},
        u = {},
        s = [],
        l = !1,
        f = [],
        d = !1,
        p = !1,
        h = 0,
        v = 0,
        g = 0,
        _ = 0,
        y = 0,
        b = 0,
        m = null,
        w = null,
        k = function(e) {
          var t = {};
          return "[object Array]" !== Object.prototype.toString.call(e) ? t : (e.forEach(function(e) {
            var n = e.eventTarget;
            "[object Object]" === Object.prototype.toString.call(n) && (n = [n]), n.forEach(function(n) {
              var r = n.trigger || "click";
              t[r] || (t[r] = []), ("click" !== r || /^([\.#][a-zA-Z_][^\.#]* ?)+$/.test(n.element && n.element.trim())) && t[r].push({
                eventID: e.eventID,
                page: n.page,
                element: n.element && n.element.trim(),
                data: n.data,
                action: n.action,
                extra: e.extra
              })
            })
          }), t)
        },
        S = function(e) {
          var t = 0;
          switch (e) {
            case "PAGE_TIME":
              return t = g ? Date.now() - g - _ : 0, t >= 0 ? t : null;
            case "APP_TIME":
              return t = h ? Date.now() - h - v : 0, t >= 0 ? t : null;
            case "CURRENT_PAGE":
              return w || null;
            case "LAST_PAGE":
              return m || null;
            default:
              return
          }
        },
        C = function(e, t) {
          var n = e.data[t],
            r = (0, a.getApp)() || {},
            i = n.replace("$APP.", ""),
            c = (0, o.getObjectByPathStrictly)(r, i);
          if (c.obj && void 0 !== c.obj[c.key]) {
            var s = c.obj[c.key];
            "number" != typeof s && "string" != typeof s && "boolean" != typeof s || (u[e.eventID].data[t] = s)
          }
        },
        P = function(e, t) {
          Object.keys(e.data || {}).forEach(function(n) {
            var r = e.data[n],
              i = t && t.data || {},
              a = !1,
              c = void 0;
            if ("$" === r.charAt(0) && void 0 !== (c = S(r.substr(1)))) return void(null !== c && (u[e.eventID].data[n] = c));
            if (0 === r.indexOf("$APP")) return void C(e, n);
            if (t && (e.page === t.__route__ || "ANY_PAGE" === e.page)) {
              if (0 === r.indexOf("$DATASET")) {
                var s = r.replace("$DATASET.", "");
                c = (0, o.getObjectByPath)(e.dataset || {}, s), c.obj && void 0 !== c.obj[c.key] && (u[e.eventID].data[n] = c.obj[c.key], a = !0)
              }
              if (0 === r.indexOf("$COMP") && "number" == typeof e.nodeId) {
                var l = __virtualDOM__.getNodeById(e.nodeId, e.webviewId);
                if (!l) return void console.warn('[自定义分析] 找不到自定义组件里的 "' + e.element + '" 节点');
                var f = exparser.Element.getMethodCaller(l);
                f && (r = r.replace("$COMP.", ""), i = f.data)
              }
              if (r.indexOf("[]") > -1) {
                if ((e.index || []).forEach(function(e) {
                    r = r.replace("[]", "[" + e + "]")
                  }), r.indexOf("[-1]") > -1 || r.indexOf("[]") > -1) return void console.warn("[自定义分析] 取不到下标，请检查配置（" + r + "）");
                var d = r.match(/\[(\d+)\]\.\$INDEX$/);
                d && (u[e.eventID].data[n] = Number(d[1]), a = !0)
              }
              if (c = (0, o.getObjectByPathStrictly)(i, r), void 0 === c.obj || void 0 === c.key || void 0 === c.obj[c.key]) return void(a || console.warn("[自定义分析] 取不到该字段，请检查配置（" + r + "）"));
              u[e.eventID].data[n] = c.obj[c.key]
            }
          })
        },
        x = function(e, t) {
          var n = [];
          Object.keys(u[e].data).forEach(function(t) {
            n.push({
              id: t,
              value: u[e].data[t]
            })
          }), u[e].data = n, u[e].page = t, u[e].version = wx && wx.version && wx.version.version || 0, u[e].uid = Date.now().toString(16) + Math.random().toString(16).substr(2), u[e].type = 0, (0, i.isDevTools)() || (console.info("[自定义分析] 上报成功"), console.info(u[e])), WeixinJSBridge.invoke("reportRealtimeAction", {
            actionData: JSON.stringify(u[e])
          }), u[e] = null
        },
        M = function(e, t) {
          if ("start" !== e.action && "start_and_report" !== e.action || (u[e.eventID] = {
              eventID: e.eventID,
              data: {},
              extra: e.extra
            }), u[e.eventID]) {
            var n = t || (0, r.getCurrentPage)() && (0, r.getCurrentPage)().page;
            P(e, n), "report" !== e.action && "start_and_report" !== e.action || x(e.eventID, n && n.__route__)
          }
        },
        E = t.triggerAnalytics = function(e, t, n) {
          if ("pageReady" === e && t) return void T(t);
          if (p) return void s.push(e);
          if ("launch" === e && !d) return h = Date.now(), d = !0, p = !0, s.push(e), void WeixinJSBridge.invoke("getAppConfig", {
            type: 1
          }, (0, i.surroundByTryCatch)(function(e) {
            p = !1, e.data && (console.info("[自定义分析] 配置拉取成功"), O(e))
          }));
          if (!l) return void f.push([e, t, n]);
          n || ("enterPage" === e ? (g = Date.now(), _ = 0, w = t && t.__route__) : "leavePage" === e ? m = t && t.__route__ : "background" === e ? y = Date.now() : "foreground" === e && (b = Date.now(), y && b > y && (_ += b - y, v += b - y)));
          var r = c[e];
          if (r) {
            var o = ["enterPage", "leavePage", "pageLoad", "pageUnload", "pullDownRefresh", "switchTab"];
            r.forEach(function(n) {
              n && (o.indexOf(e) > -1 ? (t && n.page === (t && t.__route__) || "ANY_PAGE" === n.page) && M(n, t) : M(n))
            })
          }
        },
        O = function(e, t) {
          var n = {};
          try {
            n = JSON.parse(e.data)
          } catch (e) {
            n = {}
          }
          var o = (0, r.getCurrentPage)();
          c = k(n), u = {}, t || s.forEach(function(e) {
            E(e, o && o.page, !0)
          }), E("pageReady", o && o.page)
        },
        T = function(e) {
          if (e) {
            var t = e.__route__,
              n = c.click,
              r = [];
            n && (n.forEach(function(e) {
              e.page !== t && "ANY_PAGE" !== e.page || !e.element || r.push({
                eventID: e.eventID,
                page: e.page,
                element: e.element,
                action: e.action
              })
            }), 0 !== r.length && WeixinJSBridge.publish("analyticsConfig", {
              data: r
            }, [e.__wxWebviewId__]))
          }
        };
      WeixinJSBridge.subscribe("analyticsReport", function(e, t) {
        var n = e.data,
          o = c.click,
          a = void 0,
          s = void 0;
        if (o && ("start" === n.action || "start_and_report" === n.action || u[n.eventID])) {
          for (var l = (0, r.getCurrentPages)(), f = 0; f < l.length; f++) {
            var d = l[f];
            if (d.__wxWebviewId__ === t) {
              s = d;
              break
            }
          }
          if (s) {
            for (var p = 0; p < o.length; p++) {
              var h = o[p];
              if (n.eventID === h.eventID && (n.page === h.page || "ANY_PAGE" === h.page) && n.element === h.element) {
                h.dataset = n.dataset || {}, a = (0, i.extend)({}, h);
                break
              }
            }
            a && (a.index = n.index, a.nodeId = n.nodeId, a.webviewId = t, M(a, s))
          }
        }
      }), WeixinJSBridge.on("onAppConfig", (0, i.surroundByTryCatch)(function(e) {
        console.info("[自定义分析] 收到最新配置"), 1 === Number(e.type) && O(e, !0)
      })), wx.onAppRouteDone(function() {
        l = !0, f.forEach(function(e) {
          E.apply(null, e)
        })
      })
    }, function(e, t, n) {
      "use strict";

      function r(e, t) {
        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getExitCondition = t.getModeInHang = t.getApp = t.appHolder = void 0;
      var o = function() {
          function e(e, t) {
            for (var n = 0; n < t.length; n++) {
              var r = t[n];
              r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r)
            }
          }
          return function(t, n, r) {
            return n && e(t.prototype, n), r && e(t, r), t
          }
        }(),
        i = n(2),
        a = n(1),
        c = n(14),
        u = ["onLaunch", "onShow", "onHide", "onUnlaunch", "onPageNotFound"],
        s = void 0,
        l = void 0,
        f = !1,
        d = !0,
        p = !1,
        h = {
          page: void 0,
          time: Date.now(),
          count: 0
        };
      wx.onAppUnhang(function() {
        f = !1
      }), delete wx.exitMiniProgram;
      var v = function(e) {
          for (var t = 0; t < u.length; ++t)
            if (u[t] === e) return !0;
          return !1
        },
        g = function(e) {
          return "getCurrentPage" === e
        },
        _ = function() {
          var e = !1;
          return "ios" === (0, i.getPlatform)() && __wxConfig.clientVersion >= 369430528 && __wxConfig.clientVersion <= 369431296 && (e = !0), e
        },
        y = function(e) {
          var t = this;
          wx.onPageNotFound(function(n, r) {
            h.page && h.page === n.path ? h.count++ : h = {
              page: n.path,
              time: Date.now(),
              count: 1
            };
            var o = !0;
            Date.now() - h.time <= 3e3 && h.count > 3 ? (o = !1, (0, i.error)("App onPageNotFound Error", 'Can not found page "' + n.page + '".')) : t.onPageNotFound(n), WeixinJSBridge.invoke("pageNotFoundCallback", {
              hasHandler: e && o,
              webviewId: r
            })
          })
        },
        b = function() {
          function e(t) {
            var n = this;
            r(this, e), u.forEach(function(e) {
              var r = function() {
                var n = (t[e] || i.noop).bind(this);
                Reporter.__route__ = "App", Reporter.__method__ = e, (0, i.info)("App: " + e + " have been invoked");
                try {
                  n.apply(this, arguments)
                } catch (t) {
                  Reporter.thirdErrorReport({
                    error: t,
                    extend: "at App lifeCycleMethod " + e + " function"
                  })
                }
              };
              n[e] = r.bind(n)
            });
            for (var o in t) ! function(e) {
              g(e) ? (0, i.warn)("关键字保护", "App's " + e + " is write-protected") : v(e) || ("[object Function]" === Object.prototype.toString.call(t[e]) ? n[e] = function() {
                var n;
                Reporter.__route__ = "App", Reporter.__method__ = e;
                try {
                  n = t[e].apply(this, arguments)
                } catch (t) {
                  Reporter.thirdErrorReport({
                    error: t,
                    extend: "at App " + e + " function"
                  })
                }
                return n
              }.bind(n) : n[e] = t[e])
            }(o);
            this.onError && Reporter.registerErrorListener(this.onError);
            var l = function() {
                "hang" === (arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}).mode && (f = !0);
                var e = (0, a.getCurrentPages)();
                e.length && (e[e.length - 1].onHide(), (0, c.triggerAnalytics)("leavePage", e[e.length - 1], !0)), this.onHide(), (0, c.triggerAnalytics)("background")
              },
              h = function() {
                var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                if (0 === e.scene || "0" === e.scene ? e.scene = s : s = e.scene, e.query = e.query || {}, (0, i.hasExitCondition)(e) && (p = !0), this.onShow(e), (0, c.triggerAnalytics)("foreground"), d || e.reLaunch) d = !1;
                else {
                  var t = (0, a.getCurrentPages)();
                  t.length && (t[t.length - 1].onShow(), (0, c.triggerAnalytics)("enterPage", t[t.length - 1], !0))
                }
              };
            if ("undefined" != typeof __wxConfig && __wxConfig) {
              var b = __wxConfig.appLaunchInfo || {};
              1080 === b.scene && _() && (b.scene = 1035), b.query = b.query || {}, s = b.scene, (0, i.hasExitCondition)(b) && (p = !0), this.onLaunch(b), (0, c.triggerAnalytics)("launch"), h.call(this, b)
            } else(0, i.error)("App Launch Error", "Can not find __wxConfig");
            wx.onAppEnterBackground(l.bind(this)), wx.onAppEnterForeground(h.bind(this)), y.call(this, "function" == typeof t.onPageNotFound)
          }
          return o(e, [{
            key: "getCurrentPage",
            value: function() {
              (0, i.warn)("将被废弃", "App.getCurrentPage is deprecated, please use getCurrentPages.");
              var e = (0, a.getCurrentPage)();
              if (e) return e.page
            }
          }]), e
        }();
      t.appHolder = (0, i.surroundByTryCatch)(function(e) {
        l = new b(e)
      }, "create app instance"), t.getApp = function() {
        return l
      }, t.getModeInHang = function() {
        return f
      }, t.getExitCondition = function() {
        return p
      }
    }]),
    Page = __appServiceEngine__.Page,
    Component = __appServiceEngine__.Component,
    Behavior = __appServiceEngine__.Behavior,
    __webview_engine_version__ = .02,
    App = __appServiceEngine__.App,
    getApp = __appServiceEngine__.getApp,
    getCurrentPages = __appServiceEngine__.getCurrentPages;
  ! function() {
    var e = {};
    define = function(t, n) {
      e[t] = {
        status: 1,
        factory: n
      }
    };
    var t = function(e) {
        var t = e.match(/(.*)\/([^\/]+)?$/);
        return t && t[1] ? t[1] : "./"
      },
      n = function(e) {
        var n = t(e);
        return function(e) {
          if ("string" != typeof e) throw new Error("require args must be a string");
          for (var t = [], r = (n + "/" + e).split("/"), o = 0, i = r.length; o < i; ++o) {
            var a = r[o];
            if ("" != a && "." != a)
              if (".." == a) {
                if (0 == t.length) throw new Error("can't find module : " + e);
                t.pop()
              } else o + 1 < i && ".." == r[o + 1] ? o++ : t.push(a)
          }
          try {
            var c = t.join("/");
            return /\.js$/.test(c) || (c += ".js"), require(c)
          } catch (e) {
            throw e
          }
        }
      };
    require = function(t) {
      if ("string" != typeof t) throw new Error("require args must be a string");
      var r = e[t];
      if (!r) throw new Error('module "' + t + '" is not defined');
      if (1 === r.status) {
        var o = r.factory,
          i = {
            exports: {}
          },
          a = void 0;
        o && (a = o(n(t), i, i.exports)), r.exports = i.exports || a, r.status = 2
      }
      return r.exports
    }
  }(), wx.version = {
    updateTime: "2018.1.31 22:06:34",
    info: "",
    version: "1.9.5"
  };;
  global.App = App;
  global.Page = Page;
  global.Component = Component;
  global.Behavior = Behavior;
  global.__webview_engine_version__ = 0.02;
  global.getApp = getApp;
  global.getCurrentPages = getCurrentPages;
  global.wx = wx;
})(this);
var __WAServiceEndTime__ = Date.now();
