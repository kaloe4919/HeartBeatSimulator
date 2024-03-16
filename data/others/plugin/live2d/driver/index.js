!(function (t) {
  var e = {};
  function i(r) {
    if (e[r]) return e[r].exports;
    var n = (e[r] = { i: r, l: !1, exports: {} });
    return t[r].call(n.exports, n, n.exports, i), (n.l = !0), n.exports;
  }
  (i.m = t),
    (i.c = e),
    (i.d = function (t, e, r) {
      i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: r });
    }),
    (i.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (i.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          i.d(
            r,
            n,
            function (e) {
              return t[e];
            }.bind(null, n),
          );
      return r;
    }),
    (i.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return i.d(e, "a", e), e;
    }),
    (i.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (i.p = ""),
    i((i.s = 0));
})([
  function (t, e, i) {
    "use strict";
    var r;
    i.r(e),
      (function (t) {
        var e = (function () {
          function t(t) {
            this.s = t;
          }
          return (
            (t.prototype.append = function (t, e) {
              return (this.s += void 0 !== e ? t.substr(0, e) : t), this;
            }),
            (t.prototype.expansion = function (t, e) {
              for (var i = 0; i < t; i++) this.append(e);
              return this;
            }),
            (t.prototype.getBytes = function () {
              return encodeURIComponent(this.s).replace(/%../g, "x").length;
            }),
            (t.prototype.getLength = function () {
              return this.s.length;
            }),
            (t.prototype.isLess = function (t) {
              return this.s < t.s;
            }),
            (t.prototype.isGreat = function (t) {
              return this.s > t.s;
            }),
            (t.prototype.isEqual = function (t) {
              return this.s == t;
            }),
            (t.prototype.isEmpty = function () {
              return 0 == this.s.length;
            }),
            t
          );
        })();
        t.csmString = e;
      })(r || (r = {}));
    var n,
      o,
      a,
      s,
      u,
      l,
      h,
      p,
      g,
      c = function (t, e, i) {
        !(function (t, e, i) {
          u.CubismDebug.print(t, "[CSM]" + e, i);
        })(t, e + "\n", i);
      },
      d = function (t) {
        console.assert(t);
      };
    (n = function (t) {
      for (var e = [], i = 1; i < arguments.length; i++)
        e[i - 1] = arguments[i];
      c(R.LogLevel_Debug, "[D]" + t, e);
    }),
      (o = function (t) {
        for (var e = [], i = 1; i < arguments.length; i++)
          e[i - 1] = arguments[i];
        c(R.LogLevel_Info, "[I]" + t, e);
      }),
      (a = function (t) {
        for (var e = [], i = 1; i < arguments.length; i++)
          e[i - 1] = arguments[i];
        c(R.LogLevel_Warning, "[W]" + t, e);
      }),
      (s = function (t) {
        for (var e = [], i = 1; i < arguments.length; i++)
          e[i - 1] = arguments[i];
        c(R.LogLevel_Error, "[E]" + t, e);
      }),
      (l = u || (u = {})),
      (h = (function () {
        function t() {}
        return (
          (t.print = function (t, e, i) {
            if (!(t < w.CubismFramework.getLoggingLevel())) {
              var r = w.CubismFramework.coreLogFunction;
              if (r)
                r(
                  e.replace(/\{(\d+)\}/g, function (t, e) {
                    return i[e];
                  }),
                );
            }
          }),
          (t.dumpBytes = function (t, e, i) {
            for (var r = 0; r < i; r++)
              r % 16 == 0 && r > 0
                ? this.print(t, "\n")
                : r % 8 == 0 && r > 0 && this.print(t, "  "),
                this.print(t, "{0} ", [255 & e[r]]);
            this.print(t, "\n");
          }),
          t
        );
      })()),
      (l.CubismDebug = h),
      (function (t) {
        var e = (function () {
          return function (t, e) {
            (this.first = null == t ? null : t),
              (this.second = null == e ? null : e);
          };
        })();
        t.csmPair = e;
        var i = (function () {
          function t(t) {
            null != t
              ? t < 1
                ? ((this._keyValues = []),
                  (this._dummyValue = null),
                  (this._size = 0))
                : ((this._keyValues = new Array(t)), (this._size = t))
              : ((this._keyValues = []),
                (this._dummyValue = null),
                (this._size = 0));
          }
          return (
            (t.prototype.release = function () {
              this.clear();
            }),
            (t.prototype.appendKey = function (t) {
              this.prepareCapacity(this._size + 1, !1),
                (this._keyValues[this._size] = new e(t)),
                (this._size += 1);
            }),
            (t.prototype.getValue = function (t) {
              for (var e = -1, i = 0; i < this._size; i++)
                if (this._keyValues[i].first == t) {
                  e = i;
                  break;
                }
              return e >= 0
                ? this._keyValues[e].second
                : (this.appendKey(t), this._keyValues[this._size - 1].second);
            }),
            (t.prototype.setValue = function (t, e) {
              for (var i = -1, r = 0; r < this._size; r++)
                if (this._keyValues[r].first == t) {
                  i = r;
                  break;
                }
              i >= 0
                ? (this._keyValues[i].second = e)
                : (this.appendKey(t),
                  (this._keyValues[this._size - 1].second = e));
            }),
            (t.prototype.isExist = function (t) {
              for (var e = 0; e < this._size; e++)
                if (this._keyValues[e].first == t) return !0;
              return !1;
            }),
            (t.prototype.clear = function () {
              (this._keyValues = void 0),
                (this._keyValues = null),
                (this._keyValues = []),
                (this._size = 0);
            }),
            (t.prototype.getSize = function () {
              return this._size;
            }),
            (t.prototype.prepareCapacity = function (e, i) {
              e > this._keyValues.length &&
                (0 == this._keyValues.length
                  ? (!i && e < t.DefaultSize && (e = t.DefaultSize),
                    (this._keyValues.length = e))
                  : (!i &&
                      e < 2 * this._keyValues.length &&
                      (e = 2 * this._keyValues.length),
                    (this._keyValues.length = e)));
            }),
            (t.prototype.begin = function () {
              return new r(this, 0);
            }),
            (t.prototype.end = function () {
              return new r(this, this._size);
            }),
            (t.prototype.erase = function (t) {
              var e = t._index;
              return e < 0 || this._size <= e
                ? t
                : (this._keyValues.splice(e, 1), --this._size, new r(this, e));
            }),
            (t.prototype.dumpAsInt = function () {
              for (var t = 0; t < this._size; t++)
                n("{0} ,", this._keyValues[t]), n("\n");
            }),
            (t.DefaultSize = 10),
            t
          );
        })();
        t.csmMap = i;
        var r = (function () {
          function t(t, e) {
            (this._map = null != t ? t : new i()),
              (this._index = null != e ? e : 0);
          }
          return (
            (t.prototype.set = function (t) {
              return (this._index = t._index), (this._map = t._map), this;
            }),
            (t.prototype.preIncrement = function () {
              return ++this._index, this;
            }),
            (t.prototype.preDecrement = function () {
              return --this._index, this;
            }),
            (t.prototype.increment = function () {
              var e = new t(this._map, this._index++);
              return (this._map = e._map), (this._index = e._index), this;
            }),
            (t.prototype.decrement = function () {
              var e = new t(this._map, this._index);
              return (this._map = e._map), (this._index = e._index), this;
            }),
            (t.prototype.ptr = function () {
              return this._map._keyValues[this._index];
            }),
            (t.prototype.notEqual = function (t) {
              return this._index != t._index || this._map != t._map;
            }),
            t
          );
        })();
        t.iterator = r;
      })(p || (p = {})),
      (function (t) {
        var e = (function () {
          function t(t) {
            void 0 === t && (t = 0),
              t < 1
                ? ((this._ptr = []), (this._capacity = 0), (this._size = 0))
                : ((this._ptr = new Array(t)),
                  (this._capacity = t),
                  (this._size = 0));
          }
          return (
            (t.prototype.at = function (t) {
              return this._ptr[t];
            }),
            (t.prototype.set = function (t, e) {
              this._ptr[t] = e;
            }),
            (t.prototype.get = function (t) {
              void 0 === t && (t = 0);
              for (var e = new Array(), i = t; i < this._size; i++)
                e.push(this._ptr[i]);
              return e;
            }),
            (t.prototype.pushBack = function (e) {
              this._size >= this._capacity &&
                this.prepareCapacity(
                  0 == this._capacity ? t.s_defaultSize : 2 * this._capacity,
                ),
                (this._ptr[this._size++] = e);
            }),
            (t.prototype.clear = function () {
              (this._ptr.length = 0), (this._size = 0);
            }),
            (t.prototype.getSize = function () {
              return this._size;
            }),
            (t.prototype.assign = function (t, e) {
              this._size < t && this.prepareCapacity(t);
              for (var i = 0; i < t; i++) this._ptr[i] = e;
              this._size = t;
            }),
            (t.prototype.resize = function (t, e) {
              void 0 === e && (e = null), this.updateSize(t, e, !0);
            }),
            (t.prototype.updateSize = function (t, e, i) {
              if (
                (void 0 === e && (e = null),
                void 0 === i && (i = !0),
                this._size < t)
              )
                if ((this.prepareCapacity(t), i))
                  for (var r = this._size; r < t; r++)
                    this._ptr[r] =
                      "function" == typeof e
                        ? JSON.parse(JSON.stringify(new e()))
                        : e;
                else for (r = this._size; r < t; r++) this._ptr[r] = e;
              else {
                var n = this._size - t;
                this._ptr.splice(this._size - n, n);
              }
              this._size = t;
            }),
            (t.prototype.insert = function (t, e, i) {
              var r = t._index,
                n = e._index,
                o = i._index,
                a = o - n;
              this.prepareCapacity(this._size + a);
              var s = this._size - r;
              if (s > 0)
                for (var u = 0; u < s; u++) this._ptr.splice(r + u, 0, null);
              for (u = n; u < o; u++, r++) this._ptr[r] = e._vector._ptr[u];
              this._size = this._size + a;
            }),
            (t.prototype.remove = function (t) {
              return (
                !(t < 0 || this._size <= t) &&
                (this._ptr.splice(t, 1), --this._size, !0)
              );
            }),
            (t.prototype.erase = function (t) {
              var e = t._index;
              return e < 0 || this._size <= e
                ? t
                : (this._ptr.splice(e, 1), --this._size, new i(this, e));
            }),
            (t.prototype.prepareCapacity = function (t) {
              t > this._capacity &&
                (0 == this._capacity
                  ? ((this._ptr = new Array(t)), (this._capacity = t))
                  : ((this._ptr.length = t), (this._capacity = t)));
            }),
            (t.prototype.begin = function () {
              return 0 == this._size ? this.end() : new i(this, 0);
            }),
            (t.prototype.end = function () {
              return new i(this, this._size);
            }),
            (t.prototype.getOffset = function (e) {
              var i = new t();
              return (
                (i._ptr = this.get(e)),
                (i._size = this.get(e).length),
                (i._capacity = this.get(e).length),
                i
              );
            }),
            (t.s_defaultSize = 10),
            t
          );
        })();
        t.csmVector = e;
        var i = (function () {
          function t(t, e) {
            (this._vector = null != t ? t : null),
              (this._index = null != e ? e : 0);
          }
          return (
            (t.prototype.set = function (t) {
              return (this._index = t._index), (this._vector = t._vector), this;
            }),
            (t.prototype.preIncrement = function () {
              return ++this._index, this;
            }),
            (t.prototype.preDecrement = function () {
              return --this._index, this;
            }),
            (t.prototype.increment = function () {
              var e = new t(this._vector, this._index++);
              return (this._vector = e._vector), (this._index = e._index), this;
            }),
            (t.prototype.decrement = function () {
              var e = new t(this._vector, this._index--);
              return (this._vector = e._vector), (this._index = e._index), this;
            }),
            (t.prototype.ptr = function () {
              return this._vector._ptr[this._index];
            }),
            (t.prototype.substitution = function (t) {
              return (this._index = t._index), (this._vector = t._vector), this;
            }),
            (t.prototype.notEqual = function (t) {
              return this._index != t._index || this._vector != t._vector;
            }),
            t
          );
        })();
        t.iterator = i;
      })(g || (g = {}));
    var _,
      m,
      f =
        ((_ = function (t, e) {
          return (_ =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(t, e);
        }),
        function (t, e) {
          function i() {
            this.constructor = t;
          }
          _(t, e),
            (t.prototype =
              null === e
                ? Object.create(e)
                : ((i.prototype = e.prototype), new i()));
        }),
      y = g.csmVector,
      v = p.csmMap,
      S = r.csmString;
    !(function (t) {
      var e = (function () {
        function t() {}
        return (
          (t.prototype.getRawString = function (t, e) {
            return this.getString(t, e);
          }),
          (t.prototype.toInt = function (t) {
            return void 0 === t && (t = 0), t;
          }),
          (t.prototype.toFloat = function (t) {
            return void 0 === t && (t = 0), t;
          }),
          (t.prototype.toBoolean = function (t) {
            return void 0 === t && (t = !1), t;
          }),
          (t.prototype.getSize = function () {
            return 0;
          }),
          (t.prototype.getArray = function (t) {
            return void 0 === t && (t = null), t;
          }),
          (t.prototype.getVector = function (t) {
            return t;
          }),
          (t.prototype.getMap = function (t) {
            return t;
          }),
          (t.prototype.getValueByIndex = function (e) {
            return t.errorValue.setErrorNotForClientCall(
              "Error: type mismatch",
            );
          }),
          (t.prototype.getValueByString = function (e) {
            return t.nullValue.setErrorNotForClientCall("Error: type mismatch");
          }),
          (t.prototype.getKeys = function () {
            return t.s_dummyKeys;
          }),
          (t.prototype.isError = function () {
            return !1;
          }),
          (t.prototype.isNull = function () {
            return !1;
          }),
          (t.prototype.isBool = function () {
            return !1;
          }),
          (t.prototype.isFloat = function () {
            return !1;
          }),
          (t.prototype.isString = function () {
            return !1;
          }),
          (t.prototype.isArray = function () {
            return !1;
          }),
          (t.prototype.isMap = function () {
            return !1;
          }),
          (t.prototype.equals = function (t) {
            return !1;
          }),
          (t.prototype.isStatic = function () {
            return !1;
          }),
          (t.prototype.setErrorNotForClientCall = function (t) {
            return s.errorValue;
          }),
          (t.staticInitializeNotForClientCall = function () {
            (n.trueValue = new n(!0)),
              (n.falseValue = new n(!1)),
              (s.errorValue = new s("ERROR", !0)),
              (this.nullValue = new u()),
              (t.s_dummyKeys = new y());
          }),
          (t.staticReleaseNotForClientCall = function () {
            (n.trueValue = null),
              (n.falseValue = null),
              (s.errorValue = null),
              (t.nullValue = null),
              (t.s_dummyKeys = null),
              (n.trueValue = null),
              (n.falseValue = null),
              (s.errorValue = null),
              (t.nullValue = null),
              (t.s_dummyKeys = null);
          }),
          t
        );
      })();
      t.Value = e;
      var i = (function () {
        function t(t, e) {
          (this._error = null),
            (this._lineCount = 0),
            (this._root = null),
            null != t && this.parseBytes(t, e);
        }
        return (
          (t.create = function (e, i) {
            var r = new t();
            return r.parseBytes(e, i) ? r : (t.delete(r), null);
          }),
          (t.delete = function (t) {
            null;
          }),
          (t.prototype.getRoot = function () {
            return this._root;
          }),
          (t.prototype.arrayBufferToString = function (t) {
            for (
              var e = new Uint8Array(t), i = "", r = 0, n = e.length;
              r < n;
              ++r
            )
              i += "%" + this.pad(e[r].toString(16));
            return (i = decodeURIComponent(i));
          }),
          (t.prototype.pad = function (t) {
            return t.length < 2 ? "0" + t : t;
          }),
          (t.prototype.parseBytes = function (t, e) {
            var i = new Array(1),
              r = this.arrayBufferToString(t);
            if (((this._root = this.parseValue(r, e, 0, i)), this._error)) {
              var n;
              return (
                (n =
                  "Json parse error : @line " + (this._lineCount + 1) + "\n"),
                (this._root = new a(n)),
                o("{0}", this._root.getRawString()),
                !1
              );
            }
            return (
              null != this._root ||
              ((this._root = new s(new S(this._error), !1)), !1)
            );
          }),
          (t.prototype.getParseError = function () {
            return this._error;
          }),
          (t.prototype.checkEndOfFile = function () {
            return this._root.getArray()[1].equals("EOF");
          }),
          (t.prototype.parseValue = function (t, e, i, o) {
            if (this._error) return null;
            for (var s, l = null, h = i; h < e; h++) {
              switch (t[h]) {
                case "-":
                case ".":
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                  var p = new Array(1);
                  return (
                    (s = L(t.slice(h), p)), (o[0] = t.indexOf(p[0])), new r(s)
                  );
                case '"':
                  return new a(this.parseString(t, e, h + 1, o));
                case "[":
                  return (l = this.parseArray(t, e, h + 1, o));
                case "{":
                  return (l = this.parseObject(t, e, h + 1, o));
                case "n":
                  return (
                    h + 3 < e
                      ? ((l = new u()), (o[0] = h + 4))
                      : (this._error = "parse null"),
                    l
                  );
                case "t":
                  return (
                    h + 3 < e
                      ? ((l = n.trueValue), (o[0] = h + 4))
                      : (this._error = "parse true"),
                    l
                  );
                case "f":
                  return (
                    h + 4 < e
                      ? ((l = n.falseValue), (o[0] = h + 5))
                      : (this._error = "illegal ',' position"),
                    l
                  );
                case ",":
                  return (this._error = "illegal ',' position"), null;
                case "]":
                  return (o[0] = h), null;
                case "\n":
                  this._lineCount++;
              }
            }
            return (this._error = "illegal end of value"), null;
          }),
          (t.prototype.parseString = function (t, e, i, r) {
            if (this._error) return null;
            for (var n = i, o = new S(""), a = i; n < e; n++)
              switch (t[n]) {
                case '"':
                  return (r[0] = n + 1), o.append(t.slice(a), n - a), o.s;
                case "//":
                  if (
                    (++n - 1 > a && o.append(t.slice(a), n - a),
                    (a = n + 1),
                    n < e)
                  )
                    switch (t[n]) {
                      case "\\":
                        o.expansion(1, "\\");
                        break;
                      case '"':
                        o.expansion(1, '"');
                        break;
                      case "/":
                        o.expansion(1, "/");
                        break;
                      case "b":
                        o.expansion(1, "\b");
                        break;
                      case "f":
                        o.expansion(1, "\f");
                        break;
                      case "n":
                        o.expansion(1, "\n");
                        break;
                      case "r":
                        o.expansion(1, "\r");
                        break;
                      case "t":
                        o.expansion(1, "\t");
                        break;
                      case "u":
                        this._error =
                          "parse string/unicord escape not supported";
                    }
                  else this._error = "parse string/escape error";
              }
            return (this._error = "parse string/illegal end"), null;
          }),
          (t.prototype.parseObject = function (t, e, i, r) {
            if (this._error) return null;
            for (
              var n = new h(), o = "", a = i, s = Array(1), u = !1;
              a < e;
              a++
            ) {
              t: for (; a < e; a++)
                switch (t[a]) {
                  case '"':
                    if (((o = this.parseString(t, e, a + 1, s)), this._error))
                      return null;
                    (a = s[0]), (u = !0);
                    break t;
                  case "}":
                    return (r[0] = a + 1), n;
                  case ":":
                    this._error = "illegal ':' position";
                    break;
                  case "\n":
                    this._lineCount++;
                }
              if (!u) return (this._error = "key not found"), null;
              u = !1;
              t: for (; a < e; a++)
                switch (t[a]) {
                  case ":":
                    (u = !0), a++;
                    break t;
                  case "}":
                    this._error = "illegal '}' position";
                    break;
                  case "\n":
                    this._lineCount++;
                }
              if (!u) return (this._error = "':' not found"), null;
              var l = this.parseValue(t, e, a, s);
              if (this._error) return null;
              (a = s[0]), n.put(o, l);
              t: for (; a < e; a++)
                switch (t[a]) {
                  case ",":
                    break t;
                  case "}":
                    return (r[0] = a + 1), n;
                  case "\n":
                    this._lineCount++;
                }
            }
            return (this._error = "illegal end of perseObject"), null;
          }),
          (t.prototype.parseArray = function (t, e, i, r) {
            if (this._error) return null;
            for (var n = new l(), o = i, a = new Array(1); o < e; o++) {
              var s = this.parseValue(t, e, o, a);
              if (this._error) return null;
              (o = a[0]), s && n.add(s);
              t: for (; o < e; o++)
                switch (t[o]) {
                  case ",":
                    break t;
                  case "]":
                    return (r[0] = o + 1), n;
                  case "\n":
                    ++this._lineCount;
                }
            }
            return (
              (n = void 0), (this._error = "illegal end of parseObject"), null
            );
          }),
          t
        );
      })();
      t.CubismJson = i;
      var r = (function (t) {
        function e(e) {
          var i = t.call(this) || this;
          return (i._value = e), i;
        }
        return (
          f(e, t),
          (e.prototype.isFloat = function () {
            return !0;
          }),
          (e.prototype.getString = function (t, e) {
            return (
              (this._value = parseFloat("\0")),
              (this._stringBuffer = "\0"),
              this._stringBuffer
            );
          }),
          (e.prototype.toInt = function (t) {
            return void 0 === t && (t = 0), parseInt(this._value.toString());
          }),
          (e.prototype.toFloat = function (t) {
            return void 0 === t && (t = 0), this._value;
          }),
          (e.prototype.equals = function (t) {
            return "number" == typeof t && !Math.round(t) && t == this._value;
          }),
          e
        );
      })(e);
      t.JsonFloat = r;
      var n = (function (t) {
        function e(e) {
          var i = t.call(this) || this;
          return (i._boolValue = e), i;
        }
        return (
          f(e, t),
          (e.prototype.isBool = function () {
            return !0;
          }),
          (e.prototype.toBoolean = function (t) {
            return void 0 === t && (t = !1), this._boolValue;
          }),
          (e.prototype.getString = function (t, e) {
            return (
              (this._stringBuffer = this._boolValue ? "true" : "false"),
              this._stringBuffer
            );
          }),
          (e.prototype.equals = function (t) {
            return "boolean" == typeof t && t == this._boolValue;
          }),
          (e.prototype.isStatic = function () {
            return !0;
          }),
          e
        );
      })(e);
      t.JsonBoolean = n;
      var a = (function (t) {
        function e(e) {
          var i = t.call(this) || this;
          return (
            "string" == typeof e && (i._stringBuffer = e),
            e instanceof S && (i._stringBuffer = e.s),
            i
          );
        }
        return (
          f(e, t),
          (e.prototype.isString = function () {
            return !0;
          }),
          (e.prototype.getString = function (t, e) {
            return this._stringBuffer;
          }),
          (e.prototype.equals = function (t) {
            return "string" == typeof t
              ? this._stringBuffer == t
              : t instanceof S && this._stringBuffer == t.s;
          }),
          e
        );
      })(e);
      t.JsonString = a;
      var s = (function (t) {
        function e(e, i) {
          var r = this;
          return ((r = t.call(this, e) || this)._isStatic = i), r;
        }
        return (
          f(e, t),
          (e.prototype.isStatic = function () {
            return this._isStatic;
          }),
          (e.prototype.setErrorNotForClientCall = function (t) {
            return (this._stringBuffer = t), this;
          }),
          (e.prototype.isError = function () {
            return !0;
          }),
          e
        );
      })(a);
      t.JsonError = s;
      var u = (function (t) {
        function e() {
          var e = t.call(this) || this;
          return (e._stringBuffer = "NullValue"), e;
        }
        return (
          f(e, t),
          (e.prototype.isNull = function () {
            return !0;
          }),
          (e.prototype.getString = function (t, e) {
            return this._stringBuffer;
          }),
          (e.prototype.isStatic = function () {
            return !0;
          }),
          e
        );
      })(e);
      t.JsonNullvalue = u;
      var l = (function (t) {
        function i() {
          var e = t.call(this) || this;
          return (e._array = new y()), e;
        }
        return (
          f(i, t),
          (i.prototype.release = function () {
            for (
              var t = this._array.begin();
              t.notEqual(this._array.end());
              t.preIncrement()
            ) {
              var e = t.ptr();
              e && !e.isStatic() && ((e = void 0), (e = null));
            }
          }),
          (i.prototype.isArray = function () {
            return !0;
          }),
          (i.prototype.getValueByIndex = function (t) {
            if (t < 0 || this._array.getSize() <= t)
              return e.errorValue.setErrorNotForClientCall(
                "Error: index out of bounds",
              );
            var i = this._array.at(t);
            return null == i ? e.nullValue : i;
          }),
          (i.prototype.getValueByString = function (t) {
            return e.errorValue.setErrorNotForClientCall(
              "Error: type mismatch",
            );
          }),
          (i.prototype.getString = function (t, e) {
            for (
              var i = e + "[\n", r = this._array.begin();
              r.notEqual(this._array.end());
              r.increment()
            ) {
              var n = r.ptr();
              this._stringBuffer += e + "" + n.getString(e + " ") + "\n";
            }
            return (this._stringBuffer = i + e + "]\n"), this._stringBuffer;
          }),
          (i.prototype.add = function (t) {
            this._array.pushBack(t);
          }),
          (i.prototype.getVector = function (t) {
            return void 0 === t && (t = null), this._array;
          }),
          (i.prototype.getSize = function () {
            return this._array.getSize();
          }),
          i
        );
      })(e);
      t.JsonArray = l;
      var h = (function (t) {
        function i() {
          var e = t.call(this) || this;
          return (e._map = new v()), e;
        }
        return (
          f(i, t),
          (i.prototype.release = function () {
            for (var t = this._map.begin(); t.notEqual(this._map.end()); ) {
              var e = t.ptr().second;
              e && !e.isStatic() && ((e = void 0), (e = null)),
                t.preIncrement();
            }
          }),
          (i.prototype.isMap = function () {
            return !0;
          }),
          (i.prototype.getValueByString = function (t) {
            if (t instanceof S) {
              var i = this._map.getValue(t.s);
              return null == i ? e.nullValue : i;
            }
            for (
              var r = this._map.begin();
              r.notEqual(this._map.end());
              r.preIncrement()
            )
              if (r.ptr().first == t)
                return null == r.ptr().second ? e.nullValue : r.ptr().second;
            return e.nullValue;
          }),
          (i.prototype.getValueByIndex = function (t) {
            return e.errorValue.setErrorNotForClientCall(
              "Error: type mismatch",
            );
          }),
          (i.prototype.getString = function (t, e) {
            this._stringBuffer = e + "{\n";
            for (var i = this._map.begin(); i.notEqual(this._map.end()); ) {
              var r = i.ptr().first,
                n = i.ptr().second;
              (this._stringBuffer +=
                e + " " + r + " : " + n.getString(e + "   ") + " \n"),
                i.preIncrement();
            }
            return (this._stringBuffer += e + "}\n"), this._stringBuffer;
          }),
          (i.prototype.getMap = function (t) {
            return this._map;
          }),
          (i.prototype.put = function (t, e) {
            this._map.setValue(t, e);
          }),
          (i.prototype.getKeys = function () {
            if (!this._keys) {
              this._keys = new y();
              for (var t = this._map.begin(); t.notEqual(this._map.end()); ) {
                var e = t.ptr().first;
                this._keys.pushBack(e), t.preIncrement();
              }
            }
            return this._keys;
          }),
          (i.prototype.getSize = function () {
            return this._keys.getSize();
          }),
          i
        );
      })(e);
      t.JsonMap = h;
    })(m || (m = {}));
    var x,
      B = r.csmString;
    !(function (t) {
      var e = (function () {
        function t(t) {
          this._id = "string" != typeof t ? t : new B(t);
        }
        return (
          (t.prototype.getString = function () {
            return this._id;
          }),
          (t.prototype.isEqual = function (e) {
            return "string" == typeof e
              ? this._id.isEqual(e)
              : e instanceof B
                ? this._id.isEqual(e.s)
                : e instanceof t && this._id.isEqual(e._id.s);
          }),
          (t.prototype.isNotEqual = function (e) {
            return "string" == typeof e
              ? !this._id.isEqual(e)
              : e instanceof B
                ? !this._id.isEqual(e.s)
                : e instanceof t && !this._id.isEqual(e._id.s);
          }),
          t
        );
      })();
      t.CubismId = e;
    })(x || (x = {}));
    var C,
      b,
      M = x.CubismId,
      P = g.csmVector;
    !(function (t) {
      var e = (function () {
        function t() {
          this._ids = new P();
        }
        return (
          (t.prototype.release = function () {
            for (var t = 0; t < this._ids.getSize(); ++t)
              this._ids.set(t, void 0);
            this._ids = null;
          }),
          (t.prototype.registerIds = function (t) {
            for (var e = 0; e < t.length; e++) this.registerId(t[e]);
          }),
          (t.prototype.registerId = function (t) {
            var e = null;
            return "string" != typeof t
              ? this.registerId(t.s)
              : null != (e = this.findId(t))
                ? e
                : ((e = new M(t)), this._ids.pushBack(e), e);
          }),
          (t.prototype.getId = function (t) {
            return this.registerId(t);
          }),
          (t.prototype.isExist = function (t) {
            return "string" == typeof t
              ? null != this.findId(t)
              : this.isExist(t.s);
          }),
          (t.prototype.findId = function (t) {
            for (var e = 0; e < this._ids.getSize(); ++e)
              if (this._ids.at(e).getString().isEqual(t))
                return this._ids.at(e);
            return null;
          }),
          t
        );
      })();
      t.CubismIdManager = e;
    })(C || (C = {})),
      (function (t) {
        var e = (function () {
          function t() {
            (this._tr = new Float32Array(16)), this.loadIdentity();
          }
          return (
            (t.multiply = function (t, e, i) {
              for (
                var r = new Float32Array([
                    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  ]),
                  n = 0;
                n < 4;
                ++n
              )
                for (var o = 0; o < 4; ++o)
                  for (var a = 0; a < 4; ++a)
                    r[o + 4 * n] += t[a + 4 * n] * e[o + 4 * a];
              for (n = 0; n < 16; ++n) i[n] = r[n];
            }),
            (t.prototype.loadIdentity = function () {
              var t = new Float32Array([
                1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
              ]);
              this.setMatrix(t);
            }),
            (t.prototype.setMatrix = function (t) {
              for (var e = 0; e < 16; ++e) this._tr[e] = t[e];
            }),
            (t.prototype.getArray = function () {
              return this._tr;
            }),
            (t.prototype.getScaleX = function () {
              return this._tr[0];
            }),
            (t.prototype.getScaleY = function () {
              return this._tr[5];
            }),
            (t.prototype.getTranslateX = function () {
              return this._tr[12];
            }),
            (t.prototype.getTranslateY = function () {
              return this._tr[13];
            }),
            (t.prototype.transformX = function (t) {
              return this._tr[0] * t + this._tr[12];
            }),
            (t.prototype.transformY = function (t) {
              return this._tr[5] * t + this._tr[13];
            }),
            (t.prototype.invertTransformX = function (t) {
              return (t - this._tr[12]) / this._tr[0];
            }),
            (t.prototype.invertTransformY = function (t) {
              return (t - this._tr[13]) / this._tr[5];
            }),
            (t.prototype.translateRelative = function (e, i) {
              var r = new Float32Array([
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                e,
                i,
                0,
                1,
              ]);
              t.multiply(r, this._tr, this._tr);
            }),
            (t.prototype.translate = function (t, e) {
              (this._tr[12] = t), (this._tr[13] = e);
            }),
            (t.prototype.translateX = function (t) {
              this._tr[12] = t;
            }),
            (t.prototype.translateY = function (t) {
              this._tr[13] = t;
            }),
            (t.prototype.scaleRelative = function (e, i) {
              var r = new Float32Array([
                e,
                0,
                0,
                0,
                0,
                i,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
              ]);
              t.multiply(r, this._tr, this._tr);
            }),
            (t.prototype.scale = function (t, e) {
              (this._tr[0] = t), (this._tr[5] = e);
            }),
            (t.prototype.multiplyByMatrix = function (e) {
              t.multiply(e.getArray(), this._tr, this._tr);
            }),
            (t.prototype.clone = function () {
              for (var e = new t(), i = 0; i < this._tr.length; i++)
                e._tr[i] = this._tr[i];
              return e;
            }),
            t
          );
        })();
        t.CubismMatrix44 = e;
      })(b || (b = {}));
    var V,
      I = b.CubismMatrix44;
    !(function (t) {
      var e = (function () {
        function t() {
          (this._isCulling = !1),
            (this._isPremultipliedAlpha = !1),
            (this._anisortopy = 0),
            (this._model = null),
            (this._modelColor = new i()),
            (this._mvpMatrix4x4 = new I()),
            this._mvpMatrix4x4.loadIdentity();
        }
        return (
          (t.create = function () {
            return null;
          }),
          (t.delete = function (t) {
            null;
          }),
          (t.prototype.initialize = function (t) {
            this._model = t;
          }),
          (t.prototype.drawModel = function () {
            null != this.getModel() && this.doDrawModel();
          }),
          (t.prototype.setMvpMatrix = function (t) {
            this._mvpMatrix4x4.setMatrix(t.getArray());
          }),
          (t.prototype.getMvpMatrix = function () {
            return this._mvpMatrix4x4;
          }),
          (t.prototype.setModelColor = function (t, e, i, r) {
            t < 0 ? (t = 0) : t > 1 && (t = 1),
              e < 0 ? (e = 0) : e > 1 && (e = 1),
              i < 0 ? (i = 0) : i > 1 && (i = 1),
              r < 0 ? (r = 0) : r > 1 && (r = 1),
              (this._modelColor.R = t),
              (this._modelColor.G = e),
              (this._modelColor.B = i),
              (this._modelColor.A = r);
          }),
          (t.prototype.getModelColor = function () {
            return JSON.parse(JSON.stringify(this._modelColor));
          }),
          (t.prototype.setIsPremultipliedAlpha = function (t) {
            this._isPremultipliedAlpha = t;
          }),
          (t.prototype.isPremultipliedAlpha = function () {
            return this._isPremultipliedAlpha;
          }),
          (t.prototype.setIsCulling = function (t) {
            this._isCulling = t;
          }),
          (t.prototype.isCulling = function () {
            return this._isCulling;
          }),
          (t.prototype.setAnisotropy = function (t) {
            this._anisortopy = t;
          }),
          (t.prototype.getAnisotropy = function () {
            return this._anisortopy;
          }),
          (t.prototype.getModel = function () {
            return this._model;
          }),
          t
        );
      })();
      (t.CubismRenderer = e),
        (function (t) {
          (t[(t.CubismBlendMode_Normal = 0)] = "CubismBlendMode_Normal"),
            (t[(t.CubismBlendMode_Additive = 1)] = "CubismBlendMode_Additive"),
            (t[(t.CubismBlendMode_Multiplicative = 2)] =
              "CubismBlendMode_Multiplicative");
        })(t.CubismBlendMode || (t.CubismBlendMode = {}));
      var i = (function () {
        return function () {
          (this.R = 1), (this.G = 1), (this.B = 1), (this.A = 1);
        };
      })();
      t.CubismTextureColor = i;
    })(V || (V = {}));
    var w,
      T = m.Value,
      E = C.CubismIdManager,
      F = V.CubismRenderer;
    function L(t, e) {
      for (var i = 0, r = 1; ; r++) {
        var n = t.slice(r - 1, r);
        if ("e" != n && "-" != n && "E" != n) {
          var o = t.substring(0, r),
            a = Number(o);
          if (isNaN(a)) break;
          i = r;
        }
      }
      var s = parseFloat(t);
      return isNaN(s) && (s = NaN), (e[0] = t.slice(i)), s;
    }
    !(function (t) {
      var e = !1,
        i = !1,
        r = null,
        n = null;
      !(function (t) {
        (t.vertexOffset = 0), (t.vertexStep = 2);
      })(t.Constant || (t.Constant = {})),
        (t.csmDelete = function (t) {
          t && (t = void 0);
        });
      var s = (function () {
        function t() {}
        return (
          (t.startUp = function (t) {
            if ((void 0 === t && (t = null), e))
              return o("CubismFramework.startUp() is already done."), e;
            if (
              (null != (r = t) &&
                Live2DCubismCore.Logging.csmSetLogFunction(r.logFunction),
              (e = !0))
            ) {
              var i = Live2DCubismCore.Version.csmGetVersion(),
                n = (16711680 & i) >> 16,
                a = 65535 & i,
                s = i;
              o(
                "Live2D Cubism Core version: {0}.{1}.{2} ({3})",
                ("00" + ((4278190080 & i) >> 24)).slice(-2),
                ("00" + n).slice(-2),
                ("0000" + a).slice(-4),
                s,
              );
            }
            return o("CubismFramework.startUp() is complete."), e;
          }),
          (t.cleanUp = function () {
            (e = !1), (i = !1), (r = null), (n = null);
          }),
          (t.initialize = function () {
            d(e),
              e
                ? i
                  ? a(
                      "CubismFramework.initialize() skipped, already initialized.",
                    )
                  : (T.staticInitializeNotForClientCall(),
                    (n = new E()),
                    (i = !0),
                    o("CubismFramework.initialize() is complete."))
                : a("CubismFramework is not started.");
          }),
          (t.dispose = function () {
            d(e),
              e
                ? i
                  ? (T.staticReleaseNotForClientCall(),
                    n.release(),
                    (n = null),
                    F.staticRelease(),
                    (i = !1),
                    o("CubismFramework.dispose() is complete."))
                  : a("CubismFramework.dispose() skipped, not initialized.")
                : a("CubismFramework is not started.");
          }),
          (t.isStarted = function () {
            return e;
          }),
          (t.isInitialized = function () {
            return i;
          }),
          (t.coreLogFunction = function (t) {
            Live2DCubismCore.Logging.csmGetLogFunction() &&
              Live2DCubismCore.Logging.csmGetLogFunction()(t);
          }),
          (t.getLoggingLevel = function () {
            return null != r ? r.loggingLevel : R.LogLevel_Off;
          }),
          (t.getIdManager = function () {
            return n;
          }),
          t
        );
      })();
      t.CubismFramework = s;
    })(w || (w = {}));
    var R,
      A = (function () {
        return function () {};
      })();
    !(function (t) {
      (t[(t.LogLevel_Verbose = 0)] = "LogLevel_Verbose"),
        (t[(t.LogLevel_Debug = 1)] = "LogLevel_Debug"),
        (t[(t.LogLevel_Info = 2)] = "LogLevel_Info"),
        (t[(t.LogLevel_Warning = 3)] = "LogLevel_Warning"),
        (t[(t.LogLevel_Error = 4)] = "LogLevel_Error"),
        (t[(t.LogLevel_Off = 5)] = "LogLevel_Off");
    })(R || (R = {}));
    var D,
      k,
      N,
      O = (function () {
        var t = function (e, i) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(e, i);
        };
        return function (e, i) {
          function r() {
            this.constructor = e;
          }
          t(e, i),
            (e.prototype =
              null === i
                ? Object.create(i)
                : ((r.prototype = i.prototype), new r()));
        };
      })(),
      U = b.CubismMatrix44;
    !(function (t) {
      var e = (function (t) {
        function e() {
          var e = t.call(this) || this;
          return (
            (e._screenLeft = 0),
            (e._screenRight = 0),
            (e._screenTop = 0),
            (e._screenBottom = 0),
            (e._maxLeft = 0),
            (e._maxRight = 0),
            (e._maxTop = 0),
            (e._maxBottom = 0),
            (e._maxScale = 0),
            (e._minScale = 0),
            e
          );
        }
        return (
          O(e, t),
          (e.prototype.adjustTranslate = function (t, e) {
            this._tr[0] * this._maxLeft + (this._tr[12] + t) >
              this._screenLeft &&
              (t =
                this._screenLeft - this._tr[0] * this._maxLeft - this._tr[12]),
              this._tr[0] * this._maxRight + (this._tr[12] + t) <
                this._screenRight &&
                (t =
                  this._screenRight -
                  this._tr[0] * this._maxRight -
                  this._tr[12]),
              this._tr[5] * this._maxTop + (this._tr[13] + e) <
                this._screenTop &&
                (e =
                  this._screenTop - this._tr[5] * this._maxTop - this._tr[13]),
              this._tr[5] * this._maxBottom + (this._tr[13] + e) >
                this._screenBottom &&
                (e =
                  this._screenBottom -
                  this._tr[5] * this._maxBottom -
                  this._tr[13]);
            var i = new Float32Array([
              1,
              0,
              0,
              0,
              0,
              1,
              0,
              0,
              0,
              0,
              1,
              0,
              t,
              e,
              0,
              1,
            ]);
            U.multiply(i, this._tr, this._tr);
          }),
          (e.prototype.adjustScale = function (t, e, i) {
            var r = this.getMaxScale(),
              n = this.getMinScale(),
              o = i * this._tr[0];
            o < n
              ? this._tr[0] > 0 && (i = n / this._tr[0])
              : o > r && this._tr[0] > 0 && (i = r / this._tr[0]);
            var a = new Float32Array([
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                t,
                e,
                0,
                1,
              ]),
              s = new Float32Array([
                i,
                0,
                0,
                0,
                0,
                i,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
              ]),
              u = new Float32Array([
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                0,
                0,
                0,
                1,
                0,
                -t,
                -e,
                0,
                1,
              ]);
            U.multiply(u, this._tr, this._tr),
              U.multiply(s, this._tr, this._tr),
              U.multiply(a, this._tr, this._tr);
          }),
          (e.prototype.setScreenRect = function (t, e, i, r) {
            (this._screenLeft = t),
              (this._screenRight = e),
              (this._screenBottom = i),
              (this._screenTop = r);
          }),
          (e.prototype.setMaxScreenRect = function (t, e, i, r) {
            (this._maxLeft = t),
              (this._maxRight = e),
              (this._maxTop = r),
              (this._maxBottom = i);
          }),
          (e.prototype.setMaxScale = function (t) {
            this._maxScale = t;
          }),
          (e.prototype.setMinScale = function (t) {
            this._minScale = t;
          }),
          (e.prototype.getMaxScale = function () {
            return this._maxScale;
          }),
          (e.prototype.getMinScale = function () {
            return this._minScale;
          }),
          (e.prototype.isMaxScale = function () {
            return this.getScaleX() >= this._maxScale;
          }),
          (e.prototype.isMinScale = function () {
            return this.getScaleX() <= this._minScale;
          }),
          (e.prototype.getScreenLeft = function () {
            return this._screenLeft;
          }),
          (e.prototype.getScreenRight = function () {
            return this._screenRight;
          }),
          (e.prototype.getScreenBottom = function () {
            return this._screenBottom;
          }),
          (e.prototype.getScreenTop = function () {
            return this._screenTop;
          }),
          (e.prototype.getMaxLeft = function () {
            return this._maxLeft;
          }),
          (e.prototype.getMaxRight = function () {
            return this._maxRight;
          }),
          (e.prototype.getMaxBottom = function () {
            return this._maxBottom;
          }),
          (e.prototype.getMaxTop = function () {
            return this._maxTop;
          }),
          e
        );
      })(U);
      t.CubismViewMatrix = e;
    })(D || (D = {})),
      ((N = k || (k = {})).ViewMaxScale = 2),
      (N.ViewMinScale = 0.8),
      (N.ViewLogicalLeft = -1),
      (N.ViewLogicalRight = 1),
      (N.ViewLogicalMaxLeft = -2),
      (N.ViewLogicalMaxRight = 2),
      (N.ViewLogicalMaxBottom = -2),
      (N.ViewLogicalMaxTop = 2),
      (N.ResourcesPath = "data/others/plugin/live2d/model/"),
      (N.BackImageName = "back_class_normal.png"),
      (N.GearImageName = "icon_gear.png"),
      (N.PowerImageName = "CloseNormal.png"),
      (N.CanvasID = "live2d_canvas"),
      (N.ModelDir = ["Haru", "Hiyori", "Mark"]),
      (N.ModelDirSize = N.ModelDir.length),
      (N.MotionGroupIdle = "Idle"),
      (N.MotionGroupTapBody = "TapBody"),
      (N.HitAreaNameHead = "Head"),
      (N.HitAreaNameBody = "Body"),
      (N.PriorityNone = 0),
      (N.PriorityIdle = 1),
      (N.PriorityNormal = 2),
      (N.PriorityForce = 3),
      (N.DebugLogEnable = !0),
      (N.DebugTouchLogEnable = !1),
      (N.CubismLoggingLevel = R.LogLevel_Verbose),
      (N.flag = !1);
    var z,
      j = (function () {
        function t(t, e, i, r, n, o) {
          (this.lappdelegate = o),
            (this._rect = new X()),
            (this._rect.left = t - 0.5 * i),
            (this._rect.right = t + 0.5 * i),
            (this._rect.up = e + 0.5 * r),
            (this._rect.down = e - 0.5 * r),
            (this._texture = n),
            (this._vertexBuffer = null),
            (this._uvBuffer = null),
            (this._indexBuffer = null),
            (this._positionLocation = null),
            (this._uvLocation = null),
            (this._textureLocation = null),
            (this._positionArray = null),
            (this._uvArray = null),
            (this._indexArray = null),
            (this._firstDraw = !0);
        }
        return (
          (t.prototype.release = function () {
            this._rect = null;
            var t = this.lappdelegate.gl;
            t.deleteTexture(this._texture),
              (this._texture = null),
              t.deleteBuffer(this._uvBuffer),
              (this._uvBuffer = null),
              t.deleteBuffer(this._vertexBuffer),
              (this._vertexBuffer = null),
              t.deleteBuffer(this._indexBuffer),
              (this._indexBuffer = null);
          }),
          (t.prototype.getTexture = function () {
            return this._texture;
          }),
          (t.prototype.render = function (t) {
            var e = this.lappdelegate.gl,
              i = this.lappdelegate.canvas;
            if (null != this._texture) {
              if (this._firstDraw) {
                (this._positionLocation = e.getAttribLocation(t, "position")),
                  e.enableVertexAttribArray(this._positionLocation),
                  (this._uvLocation = e.getAttribLocation(t, "uv")),
                  e.enableVertexAttribArray(this._uvLocation),
                  (this._textureLocation = e.getUniformLocation(t, "texture")),
                  e.uniform1i(this._textureLocation, 0),
                  (this._uvArray = [1, 0, 0, 0, 0, 1, 1, 1]),
                  (this._uvBuffer = e.createBuffer());
                var r = i.width,
                  n = i.height;
                (this._positionArray = [
                  (this._rect.right - 0.5 * r) / (0.5 * r),
                  (this._rect.up - 0.5 * n) / (0.5 * n),
                  (this._rect.left - 0.5 * r) / (0.5 * r),
                  (this._rect.up - 0.5 * n) / (0.5 * n),
                  (this._rect.left - 0.5 * r) / (0.5 * r),
                  (this._rect.down - 0.5 * n) / (0.5 * n),
                  (this._rect.right - 0.5 * r) / (0.5 * r),
                  (this._rect.down - 0.5 * n) / (0.5 * n),
                ]),
                  (this._vertexBuffer = e.createBuffer()),
                  (this._indexArray = [0, 1, 2, 3, 2, 0]),
                  (this._indexBuffer = e.createBuffer()),
                  (this._firstDraw = !1);
              }
              e.bindBuffer(e.ARRAY_BUFFER, this._uvBuffer),
                e.bufferData(
                  e.ARRAY_BUFFER,
                  new Float32Array(this._uvArray),
                  e.STATIC_DRAW,
                ),
                e.vertexAttribPointer(this._uvLocation, 2, e.FLOAT, !1, 0, 0),
                e.bindBuffer(e.ARRAY_BUFFER, this._vertexBuffer),
                e.bufferData(
                  e.ARRAY_BUFFER,
                  new Float32Array(this._positionArray),
                  e.STATIC_DRAW,
                ),
                e.vertexAttribPointer(
                  this._positionLocation,
                  2,
                  e.FLOAT,
                  !1,
                  0,
                  0,
                ),
                e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, this._indexBuffer),
                e.bufferData(
                  e.ELEMENT_ARRAY_BUFFER,
                  new Uint16Array(this._indexArray),
                  e.DYNAMIC_DRAW,
                ),
                e.bindTexture(e.TEXTURE_2D, this._texture),
                e.drawElements(
                  e.TRIANGLES,
                  this._indexArray.length,
                  e.UNSIGNED_SHORT,
                  0,
                );
            }
          }),
          (t.prototype.isHit = function (t, e) {
            var i = this.lappdelegate.canvas;
            i.width;
            var r = i.height - e;
            return (
              t >= this._rect.left &&
              t <= this._rect.right &&
              r <= this._rect.up &&
              r >= this._rect.down
            );
          }),
          t
        );
      })(),
      X = (function () {
        return function () {};
      })(),
      G = D.CubismViewMatrix,
      q = b.CubismMatrix44,
      Y = (function () {
        function t(t) {
          (this.lappdelegate = t),
            (this._programId = null),
            (this._back = null),
            (this._gear = null),
            (this._deviceToScreen = new q()),
            (this._viewMatrix = new G());
        }
        return (
          (t.prototype.initialize = function () {
            var t,
              e,
              i = this.lappdelegate.canvas;
            t = i.width;
            var r = (e = i.height) / t,
              n = k.ViewLogicalLeft,
              o = k.ViewLogicalRight,
              a = -r,
              s = r;
            this._viewMatrix.setScreenRect(n, o, a, s);
            var u = Math.abs(n - o);
            this._deviceToScreen.scaleRelative(u / t, -u / t),
              this._deviceToScreen.translateRelative(0.5 * -t, 0.5 * -e),
              this._viewMatrix.setMaxScale(k.ViewMaxScale),
              this._viewMatrix.setMinScale(k.ViewMinScale),
              this._viewMatrix.setMaxScreenRect(
                k.ViewLogicalMaxLeft,
                k.ViewLogicalMaxRight,
                k.ViewLogicalMaxBottom,
                k.ViewLogicalMaxTop,
              );
          }),
          (t.prototype.release = function () {
            (this._viewMatrix = null),
              (this._touchManager = null),
              (this._deviceToScreen = null),
              this.lappdelegate.gl.deleteProgram(this._programId),
              (this._programId = null);
          }),
          (t.prototype.render = function () {
            var t = this.lappdelegate.gl;
            t.useProgram(this._programId),
              this._back && this._back.render(this._programId),
              this._gear && this._gear.render(this._programId),
              t.flush(),
              this.lappdelegate.lapplive2dmanager.onUpdate();
          }),
          (t.prototype.initializeSprite = function () {
            var t,
              e = this,
              i = this.lappdelegate.canvas,
              r = i.width,
              n = i.height,
              o = this.lappdelegate.getTextureManager(),
              a = k.ResourcesPath;
            t = k.BackImageName;
            o.createTextureFromPngFile(a + t, function (t) {
              var i = 0.5 * r,
                o = 0.5 * n,
                a = 2 * t.width,
                s = 0.95 * n;
              e._back = new j(i, o, a, s, t.id, e.lappdelegate);
            }),
              null == this._programId &&
                (this._programId = this.lappdelegate.createShader());
          }),
          (t.prototype.onTouchesEnded = function (t, e) {
            return {
              x: this._deviceToScreen.transformX(t),
              y: this._deviceToScreen.transformY(e),
            };
          }),
          t
        );
      })(),
      H = (function () {
        function t() {}
        return (
          (t.loadFileAsBytes = function (t, e) {
            var i = 0;
            fetch(t)
              .then(function (t) {
                return t.arrayBuffer();
              })
              .then(function (t) {
                (i = t.byteLength), e(t, i);
              });
          }),
          (t.releaseBytes = function (t) {
            void 0;
          }),
          (t.getDeltaTime = function () {
            return this.s_deltaTime;
          }),
          (t.updateTime = function () {
            (this.s_currentFrame = Date.now()),
              (this.s_deltaTime =
                (this.s_currentFrame - this.s_lastFrame) / 1e3),
              (this.s_lastFrame = this.s_currentFrame);
          }),
          (t.printLog = function (t) {
            for (var e = [], i = 1; i < arguments.length; i++)
              e[i - 1] = arguments[i];
            console.log(
              t.replace(/\{(\d+)\}/g, function (t, i) {
                return e[i];
              }),
            );
          }),
          (t.printMessage = function (t) {
            this.printLog(t);
          }),
          (t.lastUpdate = Date.now()),
          (t.s_currentFrame = 0),
          (t.s_lastFrame = 0),
          (t.s_deltaTime = 0),
          t
        );
      })(),
      W = g.csmVector,
      J = (function () {
        function t(t) {
          (this.lappdelegate = t), (this._textures = new W());
        }
        return (
          (t.prototype.release = function () {
            this._textures.clear(), (this._textures = null);
          }),
          (t.prototype.premultiply = function (t, e, i, r) {
            return (
              ((t * (r + 1)) >> 8) |
              (((e * (r + 1)) >> 8) << 8) |
              (((i * (r + 1)) >> 8) << 16) |
              (r << 24)
            );
          }),
          (t.prototype.createTextureFromPngFile = function (t, e) {
            for (var i = this, r = 0; r < this._textures.getSize(); r++)
              if (this._textures.at(r).fileName == t)
                return this._textures.at(r);
            var n = new Image();
            return (
              (n.onload = function () {
                var r = i.lappdelegate.gl,
                  o = r.createTexture();
                r.bindTexture(r.TEXTURE_2D, o),
                  r.texParameteri(
                    r.TEXTURE_2D,
                    r.TEXTURE_MIN_FILTER,
                    r.LINEAR_MIPMAP_LINEAR,
                  ),
                  r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR),
                  r.texImage2D(
                    r.TEXTURE_2D,
                    0,
                    r.RGBA,
                    r.RGBA,
                    r.UNSIGNED_BYTE,
                    n,
                  ),
                  r.generateMipmap(r.TEXTURE_2D),
                  r.bindTexture(r.TEXTURE_2D, o);
                var a = new K();
                null != a &&
                  ((a.fileName = t),
                  (a.width = n.width),
                  (a.height = n.height),
                  (a.id = o),
                  i._textures.pushBack(a)),
                  e(a);
              }),
              (n.src = t),
              null
            );
          }),
          (t.prototype.releaseTextures = function () {
            for (var t = 0; t < this._textures.getSize(); t++)
              this._textures.set(t, void 0);
            this._textures.clear();
          }),
          (t.prototype.releaseTextureByTexture = function (t) {
            for (var e = 0; e < this._textures.getSize(); e++)
              if (this._textures.at(e).id == t) {
                this._textures.set(e, void 0), this._textures.remove(e);
                break;
              }
          }),
          (t.prototype.releaseTextureByFilePath = function (t) {
            for (var e = 0; e < this._textures.getSize(); e++)
              if (this._textures.at(e).fileName == t) {
                this._textures.set(e, void 0), this._textures.remove(e);
                break;
              }
          }),
          t
        );
      })(),
      K = (function () {
        return function () {
          (this.id = null), (this.width = 0), (this.height = 0);
        };
      })(),
      HeartStatus = (function () {
        function t() {}
        return (
          (t.getHeartRate = function () {
            return this.heartRate;
          }),
          (t.setHeartRate = function (heartRate) {
            this.heartRate = heartRate;
          }),
          (t.getAtrialHeartRate = function () {
            return this.atrialHeartRate;
          }),
          (t.setAtrialHeartRate = function (atrialHeartRate) {
            this.atrialHeartRate = atrialHeartRate;
          }),
          (t.getIntervalRate = function () {
            return this.intervalRate;
          }),
          (t.setIntervalRate = function (intervalRate) {
            this.intervalRate = intervalRate;
          }),
          (t.getAtrialIntervalRate = function () {
            return this.atrialIntervalRate;
          }),
          (t.setAtrialIntervalRate = function (atrialIntervalRate) {
            this.atrialIntervalRate = atrialIntervalRate;
          }),
          (t.heartRate = 65),
          (t.atrialHeartRate = 65),
          (t.intervalRate = 0.2),
          (t.atrialIntervalRate = 0.2),
          t
        );
      })(),
      BreathStatus = (function () {
        function t() {}
        return (
          (t.getRespiratoryRate = function () {
            return this.respiratoryRate;
          }),
          (t.setRespiratoryRate = function (respiratoryRate) {
            this.respiratoryRate = respiratoryRate;
          }),
          (t.getIntervalRate = function () {
            return this.intervalRate;
          }),
          (t.setIntervalRate = function (intervalRate) {
            this.intervalRate = intervalRate;
          }),
          (t.respiratoryRate = 20),
          (t.intervalRate = 0.2),
          t
        );
      })();
    !(function (t) {
      var e = (function () {
        function t(t, e) {
          (this.x = t),
            (this.y = e),
            (this.x = null == t ? 0 : t),
            (this.y = null == e ? 0 : e);
        }
        return (
          (t.prototype.add = function (e) {
            var i = new t(0, 0);
            return (i.x = this.x + e.x), (i.y = this.y + e.y), i;
          }),
          (t.prototype.substract = function (e) {
            var i = new t(0, 0);
            return (i.x = this.x - e.x), (i.y = this.y - e.y), i;
          }),
          (t.prototype.multiply = function (e) {
            var i = new t(0, 0);
            return (i.x = this.x * e.x), (i.y = this.y * e.y), i;
          }),
          (t.prototype.multiplyByScaler = function (e) {
            return this.multiply(new t(e, e));
          }),
          (t.prototype.division = function (e) {
            var i = new t(0, 0);
            return (i.x = this.x / e.x), (i.y = this.y / e.y), i;
          }),
          (t.prototype.divisionByScalar = function (e) {
            return this.division(new t(e, e));
          }),
          (t.prototype.getLength = function () {
            return Math.sqrt(this.x * this.x + this.y * this.y);
          }),
          (t.prototype.getDistanceWith = function (t) {
            return Math.sqrt(
              (this.x - t.x) * (this.x - t.x) + (this.y - t.y) * (this.y - t.y),
            );
          }),
          (t.prototype.dot = function (t) {
            return this.x * t.x + this.y * t.y;
          }),
          (t.prototype.normalize = function () {
            var t = Math.pow(this.x * this.x + this.y * this.y, 0.5);
            (this.x = this.x / t), (this.y = this.y / t);
          }),
          (t.prototype.isEqual = function (t) {
            return this.x == t.x && this.y == t.y;
          }),
          (t.prototype.isNotEqual = function (t) {
            return !this.isEqual(t);
          }),
          t
        );
      })();
      t.CubismVector2 = e;
    })(z || (z = {}));
    var Z,
      Q = z.CubismVector2;
    !(function (t) {
      var e = (function () {
        function t() {}
        return (
          (t.range = function (t, e, i) {
            return t < e ? (t = e) : t > i && (t = i), t;
          }),
          (t.sin = function (t) {
            return Math.sin(t);
          }),
          (t.cos = function (t) {
            return Math.cos(t);
          }),
          (t.abs = function (t) {
            return Math.abs(t);
          }),
          (t.sqrt = function (t) {
            return Math.sqrt(t);
          }),
          (t.getEasingSine = function (t) {
            return t < 0 ? 0 : t > 1 ? 1 : 0.5 - 0.5 * this.cos(t * Math.PI);
          }),
          (t.max = function (t, e) {
            return t > e ? t : e;
          }),
          (t.min = function (t, e) {
            return t > e ? e : t;
          }),
          (t.degreesToRadian = function (t) {
            return (t / 180) * Math.PI;
          }),
          (t.radianToDegrees = function (t) {
            return (180 * t) / Math.PI;
          }),
          (t.directionToRadian = function (t, e) {
            for (
              var i = Math.atan2(e.y, e.x) - Math.atan2(t.y, t.x);
              i < -Math.PI;

            )
              i += 2 * Math.PI;
            for (; i > Math.PI; ) i -= 2 * Math.PI;
            return i;
          }),
          (t.directionToDegrees = function (t, e) {
            var i = this.directionToRadian(t, e),
              r = this.radianToDegrees(i);
            return e.x - t.x > 0 && (r = -r), r;
          }),
          (t.radianToDirection = function (t) {
            var e = new Q();
            return (e.x = this.sin(t)), (e.y = this.cos(t)), e;
          }),
          t
        );
      })();
      t.CubismMath = e;
    })(Z || (Z = {}));
    var $,
      tt = g.csmVector,
      et = Z.CubismMath;
    !(function (t) {
      var e = (function () {
        function t() {
          var t = this;
          (this.setFinishedMotionHandler = function (e) {
            return (t._onFinishedMotion = e);
          }),
            (this.getFinishedMotionHandler = function () {
              return t._onFinishedMotion;
            }),
            (this._fadeInSeconds = -1),
            (this._fadeOutSeconds = -1),
            (this._weight = 1),
            (this._offsetSeconds = 0),
            (this._firedEventValues = new tt());
        }
        return (
          (t.delete = function (t) {
            t.release(), (t = void 0), (t = null);
          }),
          (t.prototype.release = function () {
            this._weight = 0;
          }),
          (t.prototype.updateParameters = function (t, e, i) {
            if (e.isAvailable() && !e.isFinished()) {
              if (!e.isStarted()) {
                e.setIsStarted(!0),
                  e.setStartTime(i - this._offsetSeconds),
                  e.setFadeInStartTime(i);
                var r = this.getDuration();
                e.getEndTime() < 0 &&
                  e.setEndTime(r <= 0 ? -1 : e.getStartTime() + r);
              }
              var n = this._weight;
              (n =
                n *
                (0 == this._fadeInSeconds
                  ? 1
                  : et.getEasingSine(
                      (i - e.getFadeInStartTime()) / this._fadeInSeconds,
                    )) *
                (0 == this._fadeOutSeconds || e.getEndTime() < 0
                  ? 1
                  : et.getEasingSine(
                      (e.getEndTime() - i) / this._fadeOutSeconds,
                    ))),
                e.setState(i, n),
                d(0 <= n && n <= 1),
                this.doUpdateParameters(t, i, n, e),
                e.getEndTime() > 0 && e.getEndTime() < i && e.setIsFinished(!0);
            }
          }),
          (t.prototype.setFadeInTime = function (t) {
            this._fadeInSeconds = t;
          }),
          (t.prototype.setFadeOutTime = function (t) {
            this._fadeOutSeconds = t;
          }),
          (t.prototype.getFadeOutTime = function () {
            return this._fadeOutSeconds;
          }),
          (t.prototype.getFadeInTime = function () {
            return this._fadeInSeconds;
          }),
          (t.prototype.setWeight = function (t) {
            this._weight = t;
          }),
          (t.prototype.getWeight = function () {
            return this._weight;
          }),
          (t.prototype.getDuration = function () {
            return -1;
          }),
          (t.prototype.getLoopDuration = function () {
            return -1;
          }),
          (t.prototype.setOffsetTime = function (t) {
            this._offsetSeconds = t;
          }),
          (t.prototype.getFiredEvent = function (t, e) {
            return this._firedEventValues;
          }),
          t
        );
      })();
      t.ACubismMotion = e;
    })($ || ($ = {}));
    var it,
      rt = $.ACubismMotion;
    !(function (t) {
      var e = (function () {
        function t() {
          (this._autoDelete = !1),
            (this._motion = null),
            (this._available = !0),
            (this._finished = !1),
            (this._started = !1),
            (this._startTimeSeconds = -1),
            (this._fadeInStartTimeSeconds = 0),
            (this._endTimeSeconds = -1),
            (this._stateTimeSeconds = 0),
            (this._stateWeight = 0),
            (this._lastEventCheckSeconds = 0),
            (this._motionQueueEntryHandle = this);
        }
        return (
          (t.prototype.release = function () {
            this._autoDelete && this._motion && rt.delete(this._motion);
          }),
          (t.prototype.startFadeout = function (t, e) {
            var i = e + t;
            (this._endTimeSeconds < 0 || i < this._endTimeSeconds) &&
              (this._endTimeSeconds = i);
          }),
          (t.prototype.isFinished = function () {
            return this._finished;
          }),
          (t.prototype.isStarted = function () {
            return this._started;
          }),
          (t.prototype.getStartTime = function () {
            return this._startTimeSeconds;
          }),
          (t.prototype.getFadeInStartTime = function () {
            return this._fadeInStartTimeSeconds;
          }),
          (t.prototype.getEndTime = function () {
            return this._endTimeSeconds;
          }),
          (t.prototype.setStartTime = function (t) {
            this._startTimeSeconds = t;
          }),
          (t.prototype.setFadeInStartTime = function (t) {
            this._fadeInStartTimeSeconds = t;
          }),
          (t.prototype.setEndTime = function (t) {
            this._endTimeSeconds = t;
          }),
          (t.prototype.setIsFinished = function (t) {
            this._finished = t;
          }),
          (t.prototype.setIsStarted = function (t) {
            this._started = t;
          }),
          (t.prototype.isAvailable = function () {
            return this._available;
          }),
          (t.prototype.setIsAvailable = function (t) {
            this._available = t;
          }),
          (t.prototype.setState = function (t, e) {
            (this._stateTimeSeconds = t), (this._stateWeight = e);
          }),
          (t.prototype.getStateTime = function () {
            return this._stateTimeSeconds;
          }),
          (t.prototype.getStateWeight = function () {
            return this._stateWeight;
          }),
          (t.prototype.getLastCheckEventTime = function () {
            return this._lastEventCheckSeconds;
          }),
          (t.prototype.setLastCheckEventTime = function (t) {
            this._lastEventCheckSeconds = t;
          }),
          t
        );
      })();
      t.CubismMotionQueueEntry = e;
    })(it || (it = {}));
    var nt,
      ot = g.csmVector,
      at = it.CubismMotionQueueEntry;
    !(function (t) {
      var e = (function () {
        function e() {
          (this._userTimeSeconds = 0),
            (this._eventCallBack = null),
            (this._eventCustomData = null),
            (this._motions = new ot());
        }
        return (
          (e.prototype.release = function () {
            for (var t = 0; t < this._motions.getSize(); ++t)
              this._motions.at(t) &&
                (this._motions.at(t).release(),
                this._motions.set(t, void 0),
                this._motions.set(t, null));
            this._motions = null;
          }),
          (e.prototype.startMotion = function (e, i, r) {
            if (null == e) return t.InvalidMotionQueueEntryHandleValue;
            for (var n = null, o = 0; o < this._motions.getSize(); ++o)
              null != (n = this._motions.at(o)) &&
                n.startFadeout(n._motion.getFadeOutTime(), r);
            return (
              ((n = new at())._autoDelete = i),
              (n._motion = e),
              this._motions.pushBack(n),
              n._motionQueueEntryHandle
            );
          }),
          (e.prototype.isFinished = function () {
            for (
              var t = this._motions.begin();
              t.notEqual(this._motions.end());

            ) {
              var e = t.ptr();
              if (null != e)
                if (null != e._motion) {
                  if (!e.isFinished()) return !1;
                  t.preIncrement();
                } else
                  e.release(),
                    (e = void 0),
                    (e = null),
                    (t = this._motions.erase(t));
              else t = this._motions.erase(t);
            }
            return !0;
          }),
          (e.prototype.isFinishedByHandle = function (t) {
            for (
              var e = this._motions.begin();
              e.notEqual(this._motions.end());
              e.increment()
            ) {
              var i = e.ptr();
              if (
                null != i &&
                i._motionQueueEntryHandle == t &&
                !i.isFinished()
              )
                return !1;
            }
            return !0;
          }),
          (e.prototype.stopAllMotions = function () {
            for (
              var t = this._motions.begin();
              t.notEqual(this._motions.end());

            ) {
              var e = t.ptr();
              null != e
                ? (e.release(),
                  (e = void 0),
                  (e = null),
                  (t = this._motions.erase(t)))
                : (t = this._motions.erase(t));
            }
          }),
          (e.prototype.getCubismMotionQueueEntry = function (t) {
            for (
              var e = this._motions.begin();
              e.notEqual(this._motions.end());
              e.preIncrement()
            ) {
              var i = e.ptr();
              if (null != i && i._motionQueueEntryHandle == t) return i;
            }
            return null;
          }),
          (e.prototype.setEventCallback = function (t, e) {
            void 0 === e && (e = null),
              (this._eventCallBack = t),
              (this._eventCustomData = e);
          }),
          (e.prototype.doUpdateMotion = function (t, e) {
            for (
              var i = !1, r = this._motions.begin();
              r.notEqual(this._motions.end());

            ) {
              var n = r.ptr();
              if (null != n) {
                var o = n._motion;
                if (null != o) {
                  o.updateParameters(t, n, e), (i = !0);
                  for (
                    var a = o.getFiredEvent(
                        n.getLastCheckEventTime() - n.getStartTime(),
                        e - n.getStartTime(),
                      ),
                      s = 0;
                    s < a.getSize();
                    ++s
                  )
                    this._eventCallBack(this, a.at(s), this._eventCustomData);
                  n.setLastCheckEventTime(e),
                    n.isFinished()
                      ? (n.release(),
                        (n = void 0),
                        (n = null),
                        (r = this._motions.erase(r)))
                      : r.preIncrement();
                } else
                  n.release(),
                    (n = void 0),
                    (n = null),
                    (r = this._motions.erase(r));
              } else r = this._motions.erase(r);
            }
            return i;
          }),
          e
        );
      })();
      (t.CubismMotionQueueManager = e),
        (t.InvalidMotionQueueEntryHandleValue = -1);
    })(nt || (nt = {}));
    var st,
      ut = (function () {
        var t = function (e, i) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(e, i);
        };
        return function (e, i) {
          function r() {
            this.constructor = e;
          }
          t(e, i),
            (e.prototype =
              null === i
                ? Object.create(i)
                : ((r.prototype = i.prototype), new r()));
        };
      })(),
      lt = nt.CubismMotionQueueManager;
    !(function (t) {
      var e = (function (t) {
        function e() {
          var e = t.call(this) || this;
          return (e._currentPriority = 0), (e._reservePriority = 0), e;
        }
        return (
          ut(e, t),
          (e.prototype.getCurrentPriority = function () {
            return this._currentPriority;
          }),
          (e.prototype.getReservePriority = function () {
            return this._reservePriority;
          }),
          (e.prototype.setReservePriority = function (t) {
            this._reservePriority = t;
          }),
          (e.prototype.startMotionPriority = function (e, i, r) {
            return (
              r == this._reservePriority && (this._reservePriority = 0),
              (this._currentPriority = r),
              t.prototype.startMotion.call(this, e, i, this._userTimeSeconds)
            );
          }),
          (e.prototype.updateMotion = function (e, i) {
            this._userTimeSeconds += i;
            var r = t.prototype.doUpdateMotion.call(
              this,
              e,
              this._userTimeSeconds,
            );
            return this.isFinished() && (this._currentPriority = 0), r;
          }),
          (e.prototype.reserveMotion = function (t) {
            return (
              !(t <= this._reservePriority || t <= this._currentPriority) &&
              ((this._reservePriority = t), !0)
            );
          }),
          e
        );
      })(lt);
      t.CubismMotionManager = e;
    })(st || (st = {}));
    var ht,
      pt = Z.CubismMath;
    !(function (t) {
      var e = (function () {
        function t() {
          (this._faceTargetX = 0),
            (this._faceTargetY = 0),
            (this._faceX = 0),
            (this._faceY = 0),
            (this._faceVX = 0),
            (this._faceVY = 0),
            (this._lastTimeSeconds = 0),
            (this._userTimeSeconds = 0);
        }
        return (
          (t.prototype.update = function (t) {
            this._userTimeSeconds += t;
            if (0 != this._lastTimeSeconds) {
              var e = 30 * (this._userTimeSeconds - this._lastTimeSeconds);
              this._lastTimeSeconds = this._userTimeSeconds;
              var i = (e * (4 / 30)) / 4.5,
                r = this._faceTargetX - this._faceX,
                n = this._faceTargetY - this._faceY;
              if (!(pt.abs(r) <= 0.01 && pt.abs(n) <= 0.01)) {
                var o = pt.sqrt(r * r + n * n),
                  a = ((4 / 30) * n) / o,
                  s = ((4 / 30) * r) / o - this._faceVX,
                  u = a - this._faceVY,
                  l = pt.sqrt(s * s + u * u);
                (l < -i || l > i) && ((s *= i / l), (u *= i / l)),
                  (this._faceVX += s),
                  (this._faceVY += u);
                var h = 0.5 * (pt.sqrt(i * i + 16 * i * o - 8 * i * o) - i),
                  p = pt.sqrt(
                    this._faceVX * this._faceVX + this._faceVY * this._faceVY,
                  );
                p > h && ((this._faceVX *= h / p), (this._faceVY *= h / p)),
                  (this._faceX += this._faceVX),
                  (this._faceY += this._faceVY);
              }
            } else this._lastTimeSeconds = this._userTimeSeconds;
          }),
          (t.prototype.getX = function () {
            return this._faceX;
          }),
          (t.prototype.getY = function () {
            return this._faceY;
          }),
          (t.prototype.set = function (t, e) {
            (this._faceTargetX = t), (this._faceTargetY = e);
          }),
          t
        );
      })();
      t.CubismTargetPoint = e;
    })(ht || (ht = {}));
    var gt,
      ct = (function () {
        var t = function (e, i) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(e, i);
        };
        return function (e, i) {
          function r() {
            this.constructor = e;
          }
          t(e, i),
            (e.prototype =
              null === i
                ? Object.create(i)
                : ((r.prototype = i.prototype), new r()));
        };
      })(),
      dt = b.CubismMatrix44;
    !(function (t) {
      var e = (function (t) {
        function e(e, i) {
          var r = t.call(this) || this;
          return (
            (r._width = void 0 !== e ? e : 0),
            (r._height = void 0 !== i ? i : 0),
            r.setHeight(1),
            r
          );
        }
        return (
          ct(e, t),
          (e.prototype.setWidth = function (t) {
            var e = t / this._width,
              i = e;
            this.scale(e, i);
          }),
          (e.prototype.setHeight = function (t) {
            var e = t / this._height,
              i = e;
            this.scale(e, i);
          }),
          (e.prototype.setPosition = function (t, e) {
            this.translate(t, e);
          }),
          (e.prototype.setCenterPosition = function (t, e) {
            this.centerX(t), this.centerY(e);
          }),
          (e.prototype.top = function (t) {
            this.setY(t);
          }),
          (e.prototype.bottom = function (t) {
            var e = this._height * this.getScaleY();
            this.translateY(t - e);
          }),
          (e.prototype.left = function (t) {
            this.setX(t);
          }),
          (e.prototype.right = function (t) {
            var e = this._width * this.getScaleX();
            this.translateX(t - e);
          }),
          (e.prototype.centerX = function (t) {
            var e = this._width * this.getScaleX();
            this.translateX(t - e / 2);
          }),
          (e.prototype.setX = function (t) {
            this.translateX(t);
          }),
          (e.prototype.centerY = function (t) {
            var e = this._height * this.getScaleY();
            this.translateY(t - e / 2);
          }),
          (e.prototype.setY = function (t) {
            this.translateY(t);
          }),
          (e.prototype.setupFromLayout = function (t) {
            for (var e = t.begin(); e.notEqual(t.end()); e.preIncrement()) {
              var i = e.ptr().first,
                r = e.ptr().second;
              "width" == i
                ? this.setWidth(r)
                : "height" == i && this.setHeight(r);
            }
            for (e = t.begin(); e.notEqual(t.end()); e.preIncrement()) {
              (i = e.ptr().first), (r = e.ptr().second);
              "x" == i
                ? this.setX(r)
                : "y" == i
                  ? this.setY(r)
                  : "center_x" == i
                    ? this.centerX(r)
                    : "center_y" == i
                      ? this.centerY(r)
                      : "top" == i
                        ? this.top(r)
                        : "bottom" == i
                          ? this.bottom(r)
                          : "left" == i
                            ? this.left(r)
                            : "right" == i && this.right(r);
            }
          }),
          e
        );
      })(dt);
      t.CubismModelMatrix = e;
    })(gt || (gt = {}));
    var _t,
      mt = w.CubismFramework,
      ft = V.CubismBlendMode,
      yt = g.csmVector,
      vt = p.csmMap;
    !(function (t) {
      var e = (function () {
        function t(t) {
          (this._model = t),
            (this._parameterValues = null),
            (this._parameterMaximumValues = null),
            (this._parameterMinimumValues = null),
            (this._partOpacities = null),
            (this._savedParameters = new yt()),
            (this._parameterIds = new yt()),
            (this._drawableIds = new yt()),
            (this._partIds = new yt()),
            (this._notExistPartId = new vt()),
            (this._notExistParameterId = new vt()),
            (this._notExistParameterValues = new vt()),
            (this._notExistPartOpacities = new vt());
        }
        return (
          (t.prototype.update = function () {
            this._model.update(), this._model.drawables.resetDynamicFlags();
          }),
          (t.prototype.getCanvasWidth = function () {
            return null == this._model
              ? 0
              : this._model.canvasinfo.CanvasWidth /
                  this._model.canvasinfo.PixelsPerUnit;
          }),
          (t.prototype.getCanvasHeight = function () {
            return null == this._model
              ? 0
              : this._model.canvasinfo.CanvasHeight /
                  this._model.canvasinfo.PixelsPerUnit;
          }),
          (t.prototype.saveParameters = function () {
            for (
              var t = this._model.parameters.count,
                e = this._savedParameters.getSize(),
                i = 0;
              i < t;
              ++i
            )
              i < e
                ? this._savedParameters.set(i, this._parameterValues[i])
                : this._savedParameters.pushBack(this._parameterValues[i]);
          }),
          (t.prototype.getModel = function () {
            return this._model;
          }),
          (t.prototype.getPartIndex = function (t) {
            var e,
              i = this._model.parts.count;
            for (e = 0; e < i; ++e) if (t == this._partIds.at(e)) return e;
            return this._notExistPartId.isExist(t)
              ? this._notExistPartId.getValue(t)
              : ((e = i + this._notExistPartId.getSize()),
                this._notExistPartId.setValue(t, e),
                this._notExistPartOpacities.appendKey(e),
                e);
          }),
          (t.prototype.getPartCount = function () {
            return this._model.parts.count;
          }),
          (t.prototype.setPartOpacityByIndex = function (t, e) {
            this._notExistPartOpacities.isExist(t)
              ? this._notExistPartOpacities.setValue(t, e)
              : (d(0 <= t && t < this.getPartCount()),
                (this._partOpacities[t] = e));
          }),
          (t.prototype.setPartOpacityById = function (t, e) {
            var i = this.getPartIndex(t);
            i < 0 || this.setPartOpacityByIndex(i, e);
          }),
          (t.prototype.getPartOpacityByIndex = function (t) {
            return this._notExistPartOpacities.isExist(t)
              ? this._notExistPartOpacities.getValue(t)
              : (d(0 <= t && t < this.getPartCount()), this._partOpacities[t]);
          }),
          (t.prototype.getPartOpacityById = function (t) {
            var e = this.getPartIndex(t);
            return e < 0 ? 0 : this.getPartOpacityByIndex(e);
          }),
          (t.prototype.getParameterIndex = function (t) {
            var e,
              i = this._model.parameters.count;
            for (e = 0; e < i; ++e) if (t == this._parameterIds.at(e)) return e;
            return this._notExistParameterId.isExist(t)
              ? this._notExistParameterId.getValue(t)
              : ((e =
                  this._model.parameters.count +
                  this._notExistParameterId.getSize()),
                this._notExistParameterId.setValue(t, e),
                this._notExistParameterValues.appendKey(e),
                e);
          }),
          (t.prototype.getParameterCount = function () {
            return this._model.parameters.count;
          }),
          (t.prototype.getParameterMaximumValue = function (t) {
            return this._model.parameters.maximumValues[t];
          }),
          (t.prototype.getParameterMinimumValue = function (t) {
            return this._model.parameters.minimumValues[t];
          }),
          (t.prototype.getParameterDefaultValue = function (t) {
            return this._model.parameters.defaultValues[t];
          }),
          (t.prototype.getParameterValueByIndex = function (t) {
            return this._notExistParameterValues.isExist(t)
              ? this._notExistParameterValues.getValue(t)
              : (d(0 <= t && t < this.getParameterCount()),
                this._parameterValues[t]);
          }),
          (t.prototype.getParameterValueById = function (t) {
            var e = this.getParameterIndex(t);
            return this.getParameterValueByIndex(e);
          }),
          (t.prototype.setParameterValueByIndex = function (t, e, i) {
            void 0 === i && (i = 1),
              this._notExistParameterValues.isExist(t)
                ? this._notExistParameterValues.setValue(
                    t,
                    1 == i
                      ? e
                      : this._notExistParameterValues.getValue(t) * (1 - i) +
                          e * i,
                  )
                : (d(0 <= t && t < this.getParameterCount()),
                  this._model.parameters.maximumValues[t] < e &&
                    (e = this._model.parameters.maximumValues[t]),
                  this._model.parameters.minimumValues[t] > e &&
                    (e = this._model.parameters.minimumValues[t]),
                  (this._parameterValues[t] =
                    1 == i
                      ? e
                      : (this._parameterValues[t] =
                          this._parameterValues[t] * (1 - i) + e * i)));
          }),
          (t.prototype.setParameterValueById = function (t, e, i) {
            void 0 === i && (i = 1);
            var r = this.getParameterIndex(t);
            this.setParameterValueByIndex(r, e, i);
          }),
          (t.prototype.addParameterValueByIndex = function (t, e, i) {
            void 0 === i && (i = 1),
              this.setParameterValueByIndex(
                t,
                this.getParameterValueByIndex(t) + e * i,
              );
          }),
          (t.prototype.addParameterValueById = function (t, e, i) {
            void 0 === i && (i = 1);
            var r = this.getParameterIndex(t);
            this.addParameterValueByIndex(r, e, i);
          }),
          (t.prototype.multiplyParameterValueById = function (t, e, i) {
            void 0 === i && (i = 1);
            var r = this.getParameterIndex(t);
            this.multiplyParameterValueByIndex(r, e, i);
          }),
          (t.prototype.multiplyParameterValueByIndex = function (t, e, i) {
            void 0 === i && (i = 1),
              this.setParameterValueByIndex(
                t,
                this.getParameterValueByIndex(t) * (1 + (e - 1) * i),
              );
          }),
          (t.prototype.getDrawableIndex = function (t) {
            for (var e = this._model.drawables.count, i = 0; i < e; ++i)
              if (this._drawableIds.at(i) == t) return i;
            return -1;
          }),
          (t.prototype.getDrawableCount = function () {
            return this._model.drawables.count;
          }),
          (t.prototype.getDrawableId = function (t) {
            var e = this._model.drawables.ids;
            return mt.getIdManager().getId(e[t]);
          }),
          (t.prototype.getDrawableRenderOrders = function () {
            return this._model.drawables.renderOrders;
          }),
          (t.prototype.getDrawableTextureIndices = function (t) {
            return this._model.drawables.textureIndices[t];
          }),
          (t.prototype.getDrawableDynamicFlagVertexPositionsDidChange =
            function (t) {
              var e = this._model.drawables.dynamicFlags;
              return Live2DCubismCore.Utils.hasVertexPositionsDidChangeBit(
                e[t],
              );
            }),
          (t.prototype.getDrawableVertexIndexCount = function (t) {
            return this._model.drawables.indexCounts[t];
          }),
          (t.prototype.getDrawableVertexCount = function (t) {
            return this._model.drawables.vertexCounts[t];
          }),
          (t.prototype.getDrawableVertices = function (t) {
            return this.getDrawableVertexPositions(t);
          }),
          (t.prototype.getDrawableVertexIndices = function (t) {
            return this._model.drawables.indices[t];
          }),
          (t.prototype.getDrawableVertexPositions = function (t) {
            return this._model.drawables.vertexPositions[t];
          }),
          (t.prototype.getDrawableVertexUvs = function (t) {
            return this._model.drawables.vertexUvs[t];
          }),
          (t.prototype.getDrawableOpacity = function (t) {
            return this._model.drawables.opacities[t];
          }),
          (t.prototype.getDrawableCulling = function (t) {
            var e = this._model.drawables.constantFlags;
            return !Live2DCubismCore.Utils.hasIsDoubleSidedBit(e[t]);
          }),
          (t.prototype.getDrawableBlendMode = function (t) {
            var e = this._model.drawables.constantFlags;
            return Live2DCubismCore.Utils.hasBlendAdditiveBit(e[t])
              ? ft.CubismBlendMode_Additive
              : Live2DCubismCore.Utils.hasBlendMultiplicativeBit(e[t])
                ? ft.CubismBlendMode_Multiplicative
                : ft.CubismBlendMode_Normal;
          }),
          (t.prototype.getDrawableInvertedMaskBit = function (t) {
            var e = this._model.drawables.constantFlags;
            return Live2DCubismCore.Utils.hasIsInvertedMaskBit(e[t]);
          }),
          (t.prototype.getDrawableMasks = function () {
            return this._model.drawables.masks;
          }),
          (t.prototype.getDrawableMaskCounts = function () {
            return this._model.drawables.maskCounts;
          }),
          (t.prototype.isUsingMasking = function () {
            for (var t = 0; t < this._model.drawables.count; ++t)
              if (!(this._model.drawables.maskCounts[t] <= 0)) return !0;
            return !1;
          }),
          (t.prototype.getDrawableDynamicFlagIsVisible = function (t) {
            var e = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasIsVisibleBit(e[t]);
          }),
          (t.prototype.getDrawableDynamicFlagVisibilityDidChange = function (
            t,
          ) {
            var e = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasVisibilityDidChangeBit(e[t]);
          }),
          (t.prototype.getDrawableDynamicFlagOpacityDidChange = function (t) {
            var e = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasOpacityDidChangeBit(e[t]);
          }),
          (t.prototype.getDrawableDynamicFlagRenderOrderDidChange = function (
            t,
          ) {
            var e = this._model.drawables.dynamicFlags;
            return Live2DCubismCore.Utils.hasRenderOrderDidChangeBit(e[t]);
          }),
          (t.prototype.loadParameters = function () {
            var t = this._model.parameters.count,
              e = this._savedParameters.getSize();
            t > e && (t = e);
            for (var i = 0; i < t; ++i)
              this._parameterValues[i] = this._savedParameters.at(i);
          }),
          (t.prototype.initialize = function () {
            d(this._model),
              (this._parameterValues = this._model.parameters.values),
              (this._partOpacities = this._model.parts.opacities),
              (this._parameterMaximumValues =
                this._model.parameters.maximumValues),
              (this._parameterMinimumValues =
                this._model.parameters.minimumValues);
            var t = this._model.parameters.ids,
              e = this._model.parameters.count;
            this._parameterIds.prepareCapacity(e);
            for (var i = 0; i < e; ++i)
              this._parameterIds.pushBack(mt.getIdManager().getId(t[i]));
            var r = this._model.parts.ids,
              n = this._model.parts.count;
            this._partIds.prepareCapacity(n);
            for (i = 0; i < n; ++i)
              this._partIds.pushBack(mt.getIdManager().getId(r[i]));
            var o = this._model.drawables.ids,
              a = this._model.drawables.count;
            this._drawableIds.prepareCapacity(a);
            for (i = 0; i < a; ++i)
              this._drawableIds.pushBack(mt.getIdManager().getId(o[i]));
          }),
          (t.prototype.release = function () {
            this._model.release(), (this._model = null);
          }),
          t
        );
      })();
      t.CubismModel = e;
    })(_t || (_t = {}));
    var St,
      xt = _t.CubismModel;
    !(function (t) {
      var e = (function () {
        function t(t) {
          (this._moc = t), (this._modelCount = 0);
        }
        return (
          (t.create = function (e) {
            var i = null,
              r = Live2DCubismCore.Moc.fromArrayBuffer(e);
            return r && (i = new t(r)), i;
          }),
          (t.delete = function (t) {
            t._moc._release(), (t._moc = null), (t = null);
          }),
          (t.prototype.createModel = function () {
            var t = null,
              e = Live2DCubismCore.Model.fromMoc(this._moc);
            return e && ((t = new xt(e)).initialize(), ++this._modelCount), t;
          }),
          (t.prototype.deleteModel = function (t) {
            null != t && (t.release(), (t = null), --this._modelCount);
          }),
          (t.prototype.release = function () {
            d(0 == this._modelCount), this._moc._release(), (this._moc = null);
          }),
          t
        );
      })();
      t.CubismMoc = e;
    })(St || (St = {}));
    var Bt,
      Ct = r.csmString,
      bt = w.CubismFramework,
      Mt = m.CubismJson;
    !(function (t) {
      var e = "Meta",
        i = (function () {
          function t(t, e) {
            this._json = Mt.create(t, e);
          }
          return (
            (t.prototype.release = function () {
              Mt.delete(this._json);
            }),
            (t.prototype.getMotionDuration = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("Duration")
                .toFloat();
            }),
            (t.prototype.isMotionLoop = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("Loop")
                .toBoolean();
            }),
            (t.prototype.getMotionCurveCount = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("CurveCount")
                .toInt();
            }),
            (t.prototype.getMotionFps = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("Fps")
                .toFloat();
            }),
            (t.prototype.getMotionTotalSegmentCount = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("TotalSegmentCount")
                .toInt();
            }),
            (t.prototype.getMotionTotalPointCount = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("TotalPointCount")
                .toInt();
            }),
            (t.prototype.isExistMotionFadeInTime = function () {
              return !this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("FadeInTime")
                .isNull();
            }),
            (t.prototype.isExistMotionFadeOutTime = function () {
              return !this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("FadeOutTime")
                .isNull();
            }),
            (t.prototype.getMotionFadeInTime = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("FadeInTime")
                .toFloat();
            }),
            (t.prototype.getMotionFadeOutTime = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("FadeOutTime")
                .toFloat();
            }),
            (t.prototype.getMotionCurveTarget = function (t) {
              return this._json
                .getRoot()
                .getValueByString("Curves")
                .getValueByIndex(t)
                .getValueByString("Target")
                .getRawString();
            }),
            (t.prototype.getMotionCurveId = function (t) {
              return bt
                .getIdManager()
                .getId(
                  this._json
                    .getRoot()
                    .getValueByString("Curves")
                    .getValueByIndex(t)
                    .getValueByString("Id")
                    .getRawString(),
                );
            }),
            (t.prototype.isExistMotionCurveFadeInTime = function (t) {
              return !this._json
                .getRoot()
                .getValueByString("Curves")
                .getValueByIndex(t)
                .getValueByString("FadeInTime")
                .isNull();
            }),
            (t.prototype.isExistMotionCurveFadeOutTime = function (t) {
              return !this._json
                .getRoot()
                .getValueByString("Curves")
                .getValueByIndex(t)
                .getValueByString("FadeOutTime")
                .isNull();
            }),
            (t.prototype.getMotionCurveFadeInTime = function (t) {
              return this._json
                .getRoot()
                .getValueByString("Curves")
                .getValueByIndex(t)
                .getValueByString("FadeInTime")
                .toFloat();
            }),
            (t.prototype.getMotionCurveFadeOutTime = function (t) {
              return this._json
                .getRoot()
                .getValueByString("Curves")
                .getValueByIndex(t)
                .getValueByString("FadeOutTime")
                .toFloat();
            }),
            (t.prototype.getMotionCurveSegmentCount = function (t) {
              return this._json
                .getRoot()
                .getValueByString("Curves")
                .getValueByIndex(t)
                .getValueByString("Segments")
                .getVector()
                .getSize();
            }),
            (t.prototype.getMotionCurveSegment = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString("Curves")
                .getValueByIndex(t)
                .getValueByString("Segments")
                .getValueByIndex(e)
                .toFloat();
            }),
            (t.prototype.getEventCount = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("UserDataCount")
                .toInt();
            }),
            (t.prototype.getTotalEventValueSize = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("TotalUserDataSize")
                .toInt();
            }),
            (t.prototype.getEventTime = function (t) {
              return this._json
                .getRoot()
                .getValueByString("UserData")
                .getValueByIndex(t)
                .getValueByString("Time")
                .toInt();
            }),
            (t.prototype.getEventValue = function (t) {
              return new Ct(
                this._json
                  .getRoot()
                  .getValueByString("UserData")
                  .getValueByIndex(t)
                  .getValueByString("Value")
                  .getRawString(),
              );
            }),
            t
          );
        })();
      t.CubismMotionJson = i;
    })(Bt || (Bt = {}));
    var Pt,
      Vt = g.csmVector;
    !(function (t) {
      var e;
      !(function (t) {
        (t[(t.CubismMotionCurveTarget_Model = 0)] =
          "CubismMotionCurveTarget_Model"),
          (t[(t.CubismMotionCurveTarget_Parameter = 1)] =
            "CubismMotionCurveTarget_Parameter"),
          (t[(t.CubismMotionCurveTarget_PartOpacity = 2)] =
            "CubismMotionCurveTarget_PartOpacity");
      })((e = t.CubismMotionCurveTarget || (t.CubismMotionCurveTarget = {}))),
        (function (t) {
          (t[(t.CubismMotionSegmentType_Linear = 0)] =
            "CubismMotionSegmentType_Linear"),
            (t[(t.CubismMotionSegmentType_Bezier = 1)] =
              "CubismMotionSegmentType_Bezier"),
            (t[(t.CubismMotionSegmentType_Stepped = 2)] =
              "CubismMotionSegmentType_Stepped"),
            (t[(t.CubismMotionSegmentType_InverseStepped = 3)] =
              "CubismMotionSegmentType_InverseStepped");
        })(t.CubismMotionSegmentType || (t.CubismMotionSegmentType = {}));
      var i = (function () {
        return function () {
          (this.time = 0), (this.value = 0);
        };
      })();
      t.CubismMotionPoint = i;
      var r = (function () {
        return function () {
          (this.evaluate = null),
            (this.basePointIndex = 0),
            (this.segmentType = 0);
        };
      })();
      t.CubismMotionSegment = r;
      var n = (function () {
        return function () {
          (this.type = e.CubismMotionCurveTarget_Model),
            (this.segmentCount = 0),
            (this.baseSegmentIndex = 0),
            (this.fadeInTime = 0),
            (this.fadeOutTime = 0);
        };
      })();
      t.CubismMotionCurve = n;
      var o = (function () {
        return function () {
          this.fireTime = 0;
        };
      })();
      t.CubismMotionEvent = o;
      var a = (function () {
        return function () {
          (this.duration = 0),
            (this.loop = !1),
            (this.curveCount = 0),
            (this.eventCount = 0),
            (this.fps = 0),
            (this.curves = new Vt()),
            (this.segments = new Vt()),
            (this.points = new Vt()),
            (this.events = new Vt());
        };
      })();
      t.CubismMotionData = a;
    })(Pt || (Pt = {}));
    var It,
      wt = (function () {
        var t = function (e, i) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(e, i);
        };
        return function (e, i) {
          function r() {
            this.constructor = e;
          }
          t(e, i),
            (e.prototype =
              null === i
                ? Object.create(i)
                : ((r.prototype = i.prototype), new r()));
        };
      })(),
      Tt = r.csmString,
      Et = Pt.CubismMotionData,
      Ft = Pt.CubismMotionSegment,
      Lt = Pt.CubismMotionPoint,
      Rt = Pt.CubismMotionEvent,
      At = Pt.CubismMotionSegmentType,
      Dt = Pt.CubismMotionCurve,
      kt = Pt.CubismMotionCurveTarget,
      Nt = Z.CubismMath,
      Ot = w.CubismFramework,
      Ut = $.ACubismMotion,
      zt = Bt.CubismMotionJson;
    !(function (t) {
      function e(t, e, i) {
        var r = new Lt();
        return (
          (r.time = t.time + (e.time - t.time) * i),
          (r.value = t.value + (e.value - t.value) * i),
          r
        );
      }
      function i(t, e) {
        var i = (e - t[0].time) / (t[1].time - t[0].time);
        return i < 0 && (i = 0), t[0].value + (t[1].value - t[0].value) * i;
      }
      function r(t, i) {
        var r = (i - t[0].time) / (t[3].time - t[0].time);
        r < 0 && (r = 0);
        var n = e(t[0], t[1], r),
          o = e(t[1], t[2], r),
          a = e(t[2], t[3], r),
          s = e(n, o, r),
          u = e(o, a, r);
        return e(s, u, r).value;
      }
      function o(t, e) {
        return t[0].value;
      }
      function a(t, e) {
        return t[1].value;
      }
      function s(t, e, i) {
        for (
          var r = t.curves.at(e),
            n = -1,
            o = r.baseSegmentIndex + r.segmentCount,
            a = 0,
            s = r.baseSegmentIndex;
          s < o;
          ++s
        )
          if (
            ((a =
              t.segments.at(s).basePointIndex +
              (t.segments.at(s).segmentType == At.CubismMotionSegmentType_Bezier
                ? 3
                : 1)),
            t.points.at(a).time > i)
          ) {
            n = s;
            break;
          }
        if (-1 == n) return t.points.at(a).value;
        var u = t.segments.at(n);
        return u.evaluate(t.points.get(u.basePointIndex), i);
      }
      var u = (function (t) {
        function e() {
          var e = t.call(this) || this;
          return (
            (e._sourceFrameRate = 30),
            (e._loopDurationSeconds = -1),
            (e._isLoop = !1),
            (e._isLoopFadeIn = !0),
            (e._lastWeight = 0),
            (e._motionData = null),
            (e._modelCurveIdEyeBlink = null),
            (e._modelCurveIdLipSync = null),
            (e._eyeBlinkParameterIds = null),
            (e._lipSyncParameterIds = null),
            e
          );
        }
        return (
          wt(e, t),
          (e.create = function (t, i, r) {
            var n = new e();
            return (
              n.parse(t, i),
              (n._sourceFrameRate = n._motionData.fps),
              (n._loopDurationSeconds = n._motionData.duration),
              (n._onFinishedMotion = r),
              n
            );
          }),
          (e.prototype.doUpdateParameters = function (t, e, i, r) {
            null == this._modelCurveIdEyeBlink &&
              (this._modelCurveIdEyeBlink =
                Ot.getIdManager().getId("EyeBlink")),
              null == this._modelCurveIdLipSync &&
                (this._modelCurveIdLipSync =
                  Ot.getIdManager().getId("LipSync"));
            var o = e - r.getStartTime();
            o < 0 && (o = 0);
            var a = Number.MAX_VALUE,
              u = Number.MAX_VALUE,
              l = 0,
              h = 0;
            this._eyeBlinkParameterIds.getSize() > 64 &&
              n(
                "too many eye blink targets : {0}",
                this._eyeBlinkParameterIds.getSize(),
              ),
              this._lipSyncParameterIds.getSize() > 64 &&
                n(
                  "too many lip sync targets : {0}",
                  this._lipSyncParameterIds.getSize(),
                );
            var p,
              g,
              c,
              d =
                this._fadeInSeconds <= 0
                  ? 1
                  : Nt.getEasingSine(
                      (e - r.getFadeInStartTime()) / this._fadeInSeconds,
                    ),
              _ =
                this._fadeOutSeconds <= 0 || r.getEndTime() < 0
                  ? 1
                  : Nt.getEasingSine(
                      (r.getEndTime() - e) / this._fadeOutSeconds,
                    ),
              m = o;
            if (this._isLoop)
              for (; m > this._motionData.duration; )
                m -= this._motionData.duration;
            var f = this._motionData.curves;
            for (
              g = 0;
              g < this._motionData.curveCount &&
              f.at(g).type == kt.CubismMotionCurveTarget_Model;
              ++g
            )
              (p = s(this._motionData, g, m)),
                f.at(g).id == this._modelCurveIdEyeBlink
                  ? (u = p)
                  : f.at(g).id == this._modelCurveIdLipSync && (a = p);
            for (
              ;
              g < this._motionData.curveCount &&
              f.at(g).type == kt.CubismMotionCurveTarget_Parameter;
              ++g
            )
              if ((0, -1 != (c = t.getParameterIndex(f.at(g).id)))) {
                var y = t.getParameterValueByIndex(c);
                if (((p = s(this._motionData, g, m)), u != Number.MAX_VALUE))
                  for (
                    var v = 0;
                    v < this._eyeBlinkParameterIds.getSize() && v < 64;
                    ++v
                  )
                    if (this._eyeBlinkParameterIds.at(v) == f.at(g).id) {
                      (p *= u), (h |= 1 << v);
                      break;
                    }
                if (a != Number.MAX_VALUE)
                  for (
                    v = 0;
                    v < this._lipSyncParameterIds.getSize() && v < 64;
                    ++v
                  )
                    if (this._lipSyncParameterIds.at(v) == f.at(g).id) {
                      (p += a), (l |= 1 << v);
                      break;
                    }
                var S = void 0;
                if (f.at(g).fadeInTime < 0 && f.at(g).fadeOutTime < 0)
                  S = y + (p - y) * i;
                else {
                  var x = void 0,
                    B = void 0;
                  (x =
                    f.at(g).fadeInTime < 0
                      ? d
                      : 0 == f.at(g).fadeInTime
                        ? 1
                        : Nt.getEasingSine(
                            (e - r.getFadeInStartTime()) / f.at(g).fadeInTime,
                          )),
                    (B =
                      f.at(g).fadeOutTime < 0
                        ? _
                        : 0 == f.at(g).fadeOutTime || r.getEndTime() < 0
                          ? 1
                          : Nt.getEasingSine(
                              (r.getEndTime() - e) / f.at(g).fadeOutTime,
                            )),
                    (S = y + (p - y) * (this._weight * x * B));
                }
                t.setParameterValueByIndex(c, S, 1);
              }
            if (u != Number.MAX_VALUE)
              for (
                v = 0;
                v < this._eyeBlinkParameterIds.getSize() && v < 64;
                ++v
              ) {
                y = t.getParameterValueById(this._eyeBlinkParameterIds.at(v));
                if (!((h >> v) & 1)) {
                  S = y + (u - y) * i;
                  t.setParameterValueById(this._eyeBlinkParameterIds.at(v), S);
                }
              }
            if (a != Number.MAX_VALUE)
              for (
                v = 0;
                v < this._lipSyncParameterIds.getSize() && v < 64;
                ++v
              ) {
                y = t.getParameterValueById(this._lipSyncParameterIds.at(v));
                if (!((l >> v) & 1)) {
                  S = y + (a - y) * i;
                  t.setParameterValueById(this._lipSyncParameterIds.at(v), S);
                }
              }
            for (
              ;
              g < this._motionData.curveCount &&
              f.at(g).type == kt.CubismMotionCurveTarget_PartOpacity;
              ++g
            )
              -1 != (c = t.getParameterIndex(f.at(g).id)) &&
                ((p = s(this._motionData, g, m)),
                t.setParameterValueByIndex(c, p));
            o >= this._motionData.duration &&
              (this._isLoop
                ? (r.setStartTime(e),
                  this._isLoopFadeIn && r.setFadeInStartTime(e))
                : (this._onFinishedMotion && this._onFinishedMotion(this),
                  r.setIsFinished(!0))),
              (this._lastWeight = i);
          }),
          (e.prototype.setIsLoop = function (t) {
            this._isLoop = t;
          }),
          (e.prototype.isLoop = function () {
            return this._isLoop;
          }),
          (e.prototype.setIsLoopFadeIn = function (t) {
            this._isLoopFadeIn = t;
          }),
          (e.prototype.isLoopFadeIn = function () {
            return this._isLoopFadeIn;
          }),
          (e.prototype.getDuration = function () {
            return this._isLoop ? -1 : this._loopDurationSeconds;
          }),
          (e.prototype.getLoopDuration = function () {
            return this._loopDurationSeconds;
          }),
          (e.prototype.setParameterFadeInTime = function (t, e) {
            for (
              var i = this._motionData.curves, r = 0;
              r < this._motionData.curveCount;
              ++r
            )
              if (t == i.at(r).id) return void (i.at(r).fadeInTime = e);
          }),
          (e.prototype.setParameterFadeOutTime = function (t, e) {
            for (
              var i = this._motionData.curves, r = 0;
              r < this._motionData.curveCount;
              ++r
            )
              if (t == i.at(r).id) return void (i.at(r).fadeOutTime = e);
          }),
          (e.prototype.getParameterFadeInTime = function (t) {
            for (
              var e = this._motionData.curves, i = 0;
              i < this._motionData.curveCount;
              ++i
            )
              if (t == e.at(i).id) return e.at(i).fadeInTime;
            return -1;
          }),
          (e.prototype.getParameterFadeOutTime = function (t) {
            for (
              var e = this._motionData.curves, i = 0;
              i < this._motionData.curveCount;
              ++i
            )
              if (t == e.at(i).id) return e.at(i).fadeOutTime;
            return -1;
          }),
          (e.prototype.setEffectIds = function (t, e) {
            (this._eyeBlinkParameterIds = t), (this._lipSyncParameterIds = e);
          }),
          (e.prototype.release = function () {
            (this._motionData = void 0), (this._motionData = null);
          }),
          (e.prototype.parse = function (t, e) {
            this._motionData = new Et();
            var n = new zt(t, e);
            (this._motionData.duration = n.getMotionDuration()),
              (this._motionData.loop = n.isMotionLoop()),
              (this._motionData.curveCount = n.getMotionCurveCount()),
              (this._motionData.fps = n.getMotionFps()),
              (this._motionData.eventCount = n.getEventCount()),
              n.isExistMotionFadeInTime()
                ? (this._fadeInSeconds =
                    n.getMotionFadeInTime() < 0 ? 1 : n.getMotionFadeInTime())
                : (this._fadeInSeconds = 1),
              n.isExistMotionFadeOutTime()
                ? (this._fadeOutSeconds =
                    n.getMotionFadeOutTime() < 0 ? 1 : n.getMotionFadeOutTime())
                : (this._fadeOutSeconds = 1),
              this._motionData.curves.updateSize(
                this._motionData.curveCount,
                Dt,
                !0,
              ),
              this._motionData.segments.updateSize(
                n.getMotionTotalSegmentCount(),
                Ft,
                !0,
              ),
              this._motionData.points.updateSize(
                n.getMotionTotalPointCount(),
                Lt,
                !0,
              ),
              this._motionData.events.updateSize(
                this._motionData.eventCount,
                Rt,
                !0,
              );
            for (
              var s = 0, u = 0, l = 0;
              l < this._motionData.curveCount;
              ++l
            ) {
              "Model" == n.getMotionCurveTarget(l)
                ? (this._motionData.curves.at(l).type =
                    kt.CubismMotionCurveTarget_Model)
                : "Parameter" == n.getMotionCurveTarget(l)
                  ? (this._motionData.curves.at(l).type =
                      kt.CubismMotionCurveTarget_Parameter)
                  : "PartOpacity" == n.getMotionCurveTarget(l) &&
                    (this._motionData.curves.at(l).type =
                      kt.CubismMotionCurveTarget_PartOpacity),
                (this._motionData.curves.at(l).id = n.getMotionCurveId(l)),
                (this._motionData.curves.at(l).baseSegmentIndex = u),
                (this._motionData.curves.at(l).fadeInTime =
                  n.isExistMotionCurveFadeInTime(l)
                    ? n.getMotionCurveFadeInTime(l)
                    : -1),
                (this._motionData.curves.at(l).fadeOutTime =
                  n.isExistMotionCurveFadeOutTime(l)
                    ? n.getMotionCurveFadeOutTime(l)
                    : -1);
              for (var h = 0; h < n.getMotionCurveSegmentCount(l); ) {
                switch (
                  (0 == h
                    ? ((this._motionData.segments.at(u).basePointIndex = s),
                      (this._motionData.points.at(s).time =
                        n.getMotionCurveSegment(l, h)),
                      (this._motionData.points.at(s).value =
                        n.getMotionCurveSegment(l, h + 1)),
                      (s += 1),
                      (h += 2))
                    : (this._motionData.segments.at(u).basePointIndex = s - 1),
                  n.getMotionCurveSegment(l, h))
                ) {
                  case At.CubismMotionSegmentType_Linear:
                    (this._motionData.segments.at(u).segmentType =
                      At.CubismMotionSegmentType_Linear),
                      (this._motionData.segments.at(u).evaluate = i),
                      (this._motionData.points.at(s).time =
                        n.getMotionCurveSegment(l, h + 1)),
                      (this._motionData.points.at(s).value =
                        n.getMotionCurveSegment(l, h + 2)),
                      (s += 1),
                      (h += 3);
                    break;
                  case At.CubismMotionSegmentType_Bezier:
                    (this._motionData.segments.at(u).segmentType =
                      At.CubismMotionSegmentType_Bezier),
                      (this._motionData.segments.at(u).evaluate = r),
                      (this._motionData.points.at(s).time =
                        n.getMotionCurveSegment(l, h + 1)),
                      (this._motionData.points.at(s).value =
                        n.getMotionCurveSegment(l, h + 2)),
                      (this._motionData.points.at(s + 1).time =
                        n.getMotionCurveSegment(l, h + 3)),
                      (this._motionData.points.at(s + 1).value =
                        n.getMotionCurveSegment(l, h + 4)),
                      (this._motionData.points.at(s + 2).time =
                        n.getMotionCurveSegment(l, h + 5)),
                      (this._motionData.points.at(s + 2).value =
                        n.getMotionCurveSegment(l, h + 6)),
                      (s += 3),
                      (h += 7);
                    break;
                  case At.CubismMotionSegmentType_Stepped:
                    (this._motionData.segments.at(u).segmentType =
                      At.CubismMotionSegmentType_Stepped),
                      (this._motionData.segments.at(u).evaluate = o),
                      (this._motionData.points.at(s).time =
                        n.getMotionCurveSegment(l, h + 1)),
                      (this._motionData.points.at(s).value =
                        n.getMotionCurveSegment(l, h + 2)),
                      (s += 1),
                      (h += 3);
                    break;
                  case At.CubismMotionSegmentType_InverseStepped:
                    (this._motionData.segments.at(u).segmentType =
                      At.CubismMotionSegmentType_InverseStepped),
                      (this._motionData.segments.at(u).evaluate = a),
                      (this._motionData.points.at(s).time =
                        n.getMotionCurveSegment(l, h + 1)),
                      (this._motionData.points.at(s).value =
                        n.getMotionCurveSegment(l, h + 2)),
                      (s += 1),
                      (h += 3);
                    break;
                  default:
                    d(0);
                }
                ++this._motionData.curves.at(l).segmentCount, ++u;
              }
            }
            for (var p = 0; p < n.getEventCount(); ++p)
              (this._motionData.events.at(p).fireTime = n.getEventTime(p)),
                (this._motionData.events.at(p).value = n.getEventValue(p));
            n.release(), (n = void 0), (n = null);
          }),
          (e.prototype.getFiredEvent = function (t, e) {
            this._firedEventValues.updateSize(0);
            for (var i = 0; i < this._motionData.eventCount; ++i)
              this._motionData.events.at(i).fireTime > t &&
                this._motionData.events.at(i).fireTime <= e &&
                this._firedEventValues.pushBack(
                  new Tt(this._motionData.events.at(i).value.s),
                );
            return this._firedEventValues;
          }),
          e
        );
      })(Ut);
      t.CubismMotion = u;
    })(It || (It = {}));
    var jt,
      Xt = (function () {
        var t = function (e, i) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(e, i);
        };
        return function (e, i) {
          function r() {
            this.constructor = e;
          }
          t(e, i),
            (e.prototype =
              null === i
                ? Object.create(i)
                : ((r.prototype = i.prototype), new r()));
        };
      })(),
      Gt = g.csmVector,
      qt = w.CubismFramework,
      Yt = m.CubismJson,
      Ht = $.ACubismMotion;
    !(function (t) {
      var e,
        i = (function (t) {
          function i() {
            var e = t.call(this) || this;
            return (e._parameters = new Gt()), e;
          }
          return (
            Xt(i, t),
            (i.create = function (t, n) {
              var o = new i(),
                a = Yt.create(t, n),
                s = a.getRoot();
              o.setFadeInTime(s.getValueByString("FadeInTime").toFloat(1)),
                o.setFadeOutTime(s.getValueByString("FadeOutTime").toFloat(1));
              var u = s.getValueByString("Parameters").getSize();
              o._parameters.prepareCapacity(u);
              for (var l = 0; l < u; ++l) {
                var h = s.getValueByString("Parameters").getValueByIndex(l),
                  p = qt
                    .getIdManager()
                    .getId(h.getValueByString("Id").getRawString()),
                  g = h.getValueByString("Value").toFloat(),
                  c = void 0;
                c =
                  h.getValueByString("Blend").isNull() ||
                  "Add" == h.getValueByString("Blend").getString()
                    ? e.ExpressionBlendType_Add
                    : "Multiply" == h.getValueByString("Blend").getString()
                      ? e.ExpressionBlendType_Multiply
                      : "Overwrite" == h.getValueByString("Blend").getString()
                        ? e.ExpressionBlendType_Overwrite
                        : e.ExpressionBlendType_Add;
                var d = new r();
                (d.parameterId = p),
                  (d.blendType = c),
                  (d.value = g),
                  o._parameters.pushBack(d);
              }
              return Yt.delete(a), o;
            }),
            (i.prototype.doUpdateParameters = function (t, i, r, n) {
              for (var o = 0; o < this._parameters.getSize(); ++o) {
                var a = this._parameters.at(o);
                switch (a.blendType) {
                  case e.ExpressionBlendType_Add:
                    t.addParameterValueById(a.parameterId, a.value, r);
                    break;
                  case e.ExpressionBlendType_Multiply:
                    t.multiplyParameterValueById(a.parameterId, a.value, r);
                    break;
                  case e.ExpressionBlendType_Overwrite:
                    t.setParameterValueById(a.parameterId, a.value, r);
                }
              }
            }),
            i
          );
        })(Ht);
      (t.CubismExpressionMotion = i),
        (function (t) {
          (t[(t.ExpressionBlendType_Add = 0)] = "ExpressionBlendType_Add"),
            (t[(t.ExpressionBlendType_Multiply = 1)] =
              "ExpressionBlendType_Multiply"),
            (t[(t.ExpressionBlendType_Overwrite = 2)] =
              "ExpressionBlendType_Overwrite");
        })((e = t.ExpressionBlendType || (t.ExpressionBlendType = {})));
      var r = (function () {
        return function () {};
      })();
      t.ExpressionParameter = r;
    })(jt || (jt = {}));
    var Wt,
      Jt = g.csmVector,
      Kt = w.CubismFramework,
      Zt = m.CubismJson;
    !(function (t) {
      var e = 0.5,
        i = (function () {
          function t() {
            (this._fadeTimeSeconds = e),
              (this._lastModel = null),
              (this._partGroups = new Jt()),
              (this._partGroupCounts = new Jt());
          }
          return (
            (t.create = function (i, n) {
              var o = new t(),
                a = Zt.create(i, n),
                s = a.getRoot();
              s.getValueByString("FadeInTime").isNull() ||
                ((o._fadeTimeSeconds = s
                  .getValueByString("FadeInTime")
                  .toFloat(e)),
                o._fadeTimeSeconds <= 0 && (o._fadeTimeSeconds = e));
              for (
                var u = s.getValueByString("Groups"), l = u.getSize(), h = 0;
                h < l;
                ++h
              ) {
                for (
                  var p = u.getValueByIndex(h), g = p.getSize(), c = 0, d = 0;
                  d < g;
                  ++d
                ) {
                  var _ = p.getValueByIndex(d),
                    m = new r(),
                    f = Kt.getIdManager().getId(
                      _.getValueByString("Id").getRawString(),
                    );
                  if (((m.partId = f), !_.getValueByString("Link").isNull()))
                    for (
                      var y = _.getValueByString("Link"),
                        v = y.getSize(),
                        S = 0;
                      S < v;
                      ++S
                    ) {
                      var x = new r(),
                        B = Kt.getIdManager().getId(
                          y.getValueByIndex(S).getString(),
                        );
                      (x.partId = B), m.link.pushBack(x);
                    }
                  o._partGroups.pushBack(m.clone()), ++c;
                }
                o._partGroupCounts.pushBack(c);
              }
              return Zt.delete(a), o;
            }),
            (t.delete = function (t) {
              null != t && (t = null);
            }),
            (t.prototype.updateParameters = function (t, e) {
              t != this._lastModel && this.reset(t),
                (this._lastModel = t),
                e < 0 && (e = 0);
              for (var i = 0, r = 0; r < this._partGroupCounts.getSize(); r++) {
                var n = this._partGroupCounts.at(r);
                this.doFade(t, e, i, n), (i += n);
              }
              this.copyPartOpacities(t);
            }),
            (t.prototype.reset = function (t) {
              for (var e = 0, i = 0; i < this._partGroupCounts.getSize(); ++i) {
                for (
                  var r = this._partGroupCounts.at(i), n = e;
                  n < e + r;
                  ++n
                ) {
                  this._partGroups.at(n).initialize(t);
                  var o = this._partGroups.at(n).partIndex,
                    a = this._partGroups.at(n).parameterIndex;
                  if (!(o < 0)) {
                    t.setPartOpacityByIndex(o, n == e ? 1 : 0),
                      t.setParameterValueByIndex(a, n == e ? 1 : 0);
                    for (
                      var s = 0;
                      s < this._partGroups.at(n).link.getSize();
                      ++s
                    )
                      this._partGroups.at(n).link.at(s).initialize(t);
                  }
                }
                e += r;
              }
            }),
            (t.prototype.copyPartOpacities = function (t) {
              for (var e = 0; e < this._partGroups.getSize(); ++e) {
                var i = this._partGroups.at(e);
                if (0 != i.link.getSize())
                  for (
                    var r = this._partGroups.at(e).partIndex,
                      n = t.getPartOpacityByIndex(r),
                      o = 0;
                    o < i.link.getSize();
                    ++o
                  ) {
                    var a = i.link.at(o).partIndex;
                    a < 0 || t.setPartOpacityByIndex(a, n);
                  }
              }
            }),
            (t.prototype.doFade = function (t, e, i, r) {
              for (var n = -1, o = 1, a = i; a < i + r; ++a) {
                var s = this._partGroups.at(a).partIndex,
                  u = this._partGroups.at(a).parameterIndex;
                if (t.getParameterValueByIndex(u) > 0.001) {
                  if (n >= 0) break;
                  (n = a),
                    (o = t.getPartOpacityByIndex(s)),
                    (o += e / this._fadeTimeSeconds) > 1 && (o = 1);
                }
              }
              n < 0 && ((n = 0), (o = 1));
              for (a = i; a < i + r; ++a) {
                var l = this._partGroups.at(a).partIndex;
                if (n == a) t.setPartOpacityByIndex(l, o);
                else {
                  var h = t.getPartOpacityByIndex(l),
                    p = void 0;
                  (1 -
                    (p =
                      o < 0.5 ? (-0.5 * o) / 0.5 + 1 : (0.5 * (1 - o)) / 0.5)) *
                    (1 - o) >
                    0.15 && (p = 1 - 0.15 / (1 - o)),
                    h > p && (h = p),
                    t.setPartOpacityByIndex(l, h);
                }
              }
            }),
            t
          );
        })();
      t.CubismPose = i;
      var r = (function () {
        function t(t) {
          if (
            ((this.parameterIndex = 0),
            (this.partIndex = 0),
            (this.link = new Jt()),
            null != t)
          ) {
            this.partId = t.partId;
            for (
              var e = t.link.begin();
              e.notEqual(t.link.end());
              e.preIncrement()
            )
              this.link.pushBack(e.ptr().clone());
          }
        }
        return (
          (t.prototype.assignment = function (t) {
            this.partId = t.partId;
            for (
              var e = t.link.begin();
              e.notEqual(t.link.end());
              e.preIncrement()
            )
              this.link.pushBack(e.ptr().clone());
            return this;
          }),
          (t.prototype.initialize = function (t) {
            (this.parameterIndex = t.getParameterIndex(this.partId)),
              (this.partIndex = t.getPartIndex(this.partId)),
              t.setParameterValueByIndex(this.parameterIndex, 1);
          }),
          (t.prototype.clone = function () {
            var e = new t();
            (e.partId = this.partId),
              (e.parameterIndex = this.parameterIndex),
              (e.partIndex = this.partIndex),
              (e.link = new Jt());
            for (
              var i = this.link.begin();
              i.notEqual(this.link.end());
              i.increment()
            )
              e.link.pushBack(i.ptr().clone());
            return e;
          }),
          t
        );
      })();
      t.PartData = r;
    })(Wt || (Wt = {}));
    var Qt,
      $t = w.CubismFramework,
      te = m.CubismJson;
    !(function (t) {
      var e = (function () {
        function t(t, e) {
          this._json = te.create(t, e);
        }
        return (
          (t.prototype.release = function () {
            te.delete(this._json);
          }),
          (t.prototype.getUserDataCount = function () {
            return this._json
              .getRoot()
              .getValueByString("Meta")
              .getValueByString("UserDataCount")
              .toInt();
          }),
          (t.prototype.getTotalUserDataSize = function () {
            return this._json
              .getRoot()
              .getValueByString("Meta")
              .getValueByString("TotalUserDataSize")
              .toInt();
          }),
          (t.prototype.getUserDataTargetType = function (t) {
            return this._json
              .getRoot()
              .getValueByString("UserData")
              .getValueByIndex(t)
              .getValueByString("Target")
              .getRawString();
          }),
          (t.prototype.getUserDataId = function (t) {
            return $t
              .getIdManager()
              .getId(
                this._json
                  .getRoot()
                  .getValueByString("UserData")
                  .getValueByIndex(t)
                  .getValueByString("Id")
                  .getRawString(),
              );
          }),
          (t.prototype.getUserDataValue = function (t) {
            return this._json
              .getRoot()
              .getValueByString("UserData")
              .getValueByIndex(t)
              .getValueByString("Value")
              .getRawString();
          }),
          t
        );
      })();
      t.CubismModelUserDataJson = e;
    })(Qt || (Qt = {}));
    var ee,
      ie = w.CubismFramework,
      re = g.csmVector,
      ne = r.csmString,
      oe = Qt.CubismModelUserDataJson;
    !(function (t) {
      var e = (function () {
        return function () {};
      })();
      t.CubismModelUserDataNode = e;
      var i = (function () {
        function t() {
          (this._userDataNodes = new re()),
            (this._artMeshUserDataNode = new re());
        }
        return (
          (t.create = function (e, i) {
            var r = new t();
            return r.parseUserData(e, i), r;
          }),
          (t.delete = function (t) {
            null != t && (t.release(), (t = null));
          }),
          (t.prototype.getArtMeshUserDatas = function () {
            return this._artMeshUserDataNode;
          }),
          (t.prototype.parseUserData = function (t, i) {
            for (
              var r = new oe(t, i),
                n = ie.getIdManager().getId("ArtMesh"),
                o = r.getUserDataCount(),
                a = 0;
              a < o;
              a++
            ) {
              var s = new e();
              (s.targetId = r.getUserDataId(a)),
                (s.targetType = ie
                  .getIdManager()
                  .getId(r.getUserDataTargetType(a))),
                (s.value = new ne(r.getUserDataValue(a))),
                this._userDataNodes.pushBack(s),
                s.targetType == n && this._artMeshUserDataNode.pushBack(s);
            }
            r.release(), (r = void 0);
          }),
          (t.prototype.release = function () {
            for (var t = 0; t < this._userDataNodes.getSize(); ++t)
              this._userDataNodes.set(t, null);
            this._userDataNodes = null;
          }),
          t
        );
      })();
      t.CubismModelUserData = i;
    })(ee || (ee = {}));
    var ae,
      se = g.csmVector,
      ue = z.CubismVector2;
    !(function (t) {
      !(function (t) {
        t[(t.CubismPhysicsTargetType_Parameter = 0)] =
          "CubismPhysicsTargetType_Parameter";
      })(t.CubismPhysicsTargetType || (t.CubismPhysicsTargetType = {})),
        (function (t) {
          (t[(t.CubismPhysicsSource_X = 0)] = "CubismPhysicsSource_X"),
            (t[(t.CubismPhysicsSource_Y = 1)] = "CubismPhysicsSource_Y"),
            (t[(t.CubismPhysicsSource_Angle = 2)] =
              "CubismPhysicsSource_Angle");
        })(t.CubismPhysicsSource || (t.CubismPhysicsSource = {}));
      var e = (function () {
        return function () {
          (this.gravity = new ue(0, 0)), (this.wind = new ue(0, 0));
        };
      })();
      t.PhysicsJsonEffectiveForces = e;
      var i = (function () {
        return function () {};
      })();
      t.CubismPhysicsParameter = i;
      var r = (function () {
        return function () {};
      })();
      t.CubismPhysicsNormalization = r;
      var n = (function () {
        return function () {
          (this.initialPosition = new ue(0, 0)),
            (this.position = new ue(0, 0)),
            (this.lastPosition = new ue(0, 0)),
            (this.lastGravity = new ue(0, 0)),
            (this.force = new ue(0, 0)),
            (this.velocity = new ue(0, 0));
        };
      })();
      t.CubismPhysicsParticle = n;
      var o = (function () {
        return function () {
          (this.normalizationPosition = new r()),
            (this.normalizationAngle = new r());
        };
      })();
      t.CubismPhysicsSubRig = o;
      var a = (function () {
        return function () {
          this.source = new i();
        };
      })();
      t.CubismPhysicsInput = a;
      var s = (function () {
        return function () {
          (this.destination = new i()), (this.translationScale = new ue(0, 0));
        };
      })();
      t.CubismPhysicsOutput = s;
      var u = (function () {
        return function () {
          (this.settings = new se()),
            (this.inputs = new se()),
            (this.outputs = new se()),
            (this.particles = new se()),
            (this.gravity = new ue(0, 0)),
            (this.wind = new ue(0, 0));
        };
      })();
      t.CubismPhysicsRig = u;
    })(ae || (ae = {}));
    var le,
      he = w.CubismFramework,
      pe = z.CubismVector2,
      ge = m.CubismJson;
    !(function (t) {
      var e = "Meta",
        i = "PhysicsSettings",
        r = (function () {
          function t(t, e) {
            this._json = ge.create(t, e);
          }
          return (
            (t.prototype.release = function () {
              ge.delete(this._json);
            }),
            (t.prototype.getGravity = function () {
              var t = new pe(0, 0);
              return (
                (t.x = this._json
                  .getRoot()
                  .getValueByString(e)
                  .getValueByString("EffectiveForces")
                  .getValueByString("Gravity")
                  .getValueByString("X")
                  .toFloat()),
                (t.y = this._json
                  .getRoot()
                  .getValueByString(e)
                  .getValueByString("EffectiveForces")
                  .getValueByString("Gravity")
                  .getValueByString("Y")
                  .toFloat()),
                t
              );
            }),
            (t.prototype.getWind = function () {
              var t = new pe(0, 0);
              return (
                (t.x = this._json
                  .getRoot()
                  .getValueByString(e)
                  .getValueByString("EffectiveForces")
                  .getValueByString("Wind")
                  .getValueByString("X")
                  .toFloat()),
                (t.y = this._json
                  .getRoot()
                  .getValueByString(e)
                  .getValueByString("EffectiveForces")
                  .getValueByString("Wind")
                  .getValueByString("Y")
                  .toFloat()),
                t
              );
            }),
            (t.prototype.getSubRigCount = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("PhysicsSettingCount")
                .toInt();
            }),
            (t.prototype.getTotalInputCount = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("TotalInputCount")
                .toInt();
            }),
            (t.prototype.getTotalOutputCount = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("TotalOutputCount")
                .toInt();
            }),
            (t.prototype.getVertexCount = function () {
              return this._json
                .getRoot()
                .getValueByString(e)
                .getValueByString("VertexCount")
                .toInt();
            }),
            (t.prototype.getNormalizationPositionMinimumValue = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Normalization")
                .getValueByString("Position")
                .getValueByString("Minimum")
                .toFloat();
            }),
            (t.prototype.getNormalizationPositionMaximumValue = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Normalization")
                .getValueByString("Position")
                .getValueByString("Maximum")
                .toFloat();
            }),
            (t.prototype.getNormalizationPositionDefaultValue = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Normalization")
                .getValueByString("Position")
                .getValueByString("Default")
                .toFloat();
            }),
            (t.prototype.getNormalizationAngleMinimumValue = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Normalization")
                .getValueByString("Angle")
                .getValueByString("Minimum")
                .toFloat();
            }),
            (t.prototype.getNormalizationAngleMaximumValue = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Normalization")
                .getValueByString("Angle")
                .getValueByString("Maximum")
                .toFloat();
            }),
            (t.prototype.getNormalizationAngleDefaultValue = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Normalization")
                .getValueByString("Angle")
                .getValueByString("Default")
                .toFloat();
            }),
            (t.prototype.getInputCount = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Input")
                .getVector()
                .getSize();
            }),
            (t.prototype.getInputWeight = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Input")
                .getValueByIndex(e)
                .getValueByString("Weight")
                .toFloat();
            }),
            (t.prototype.getInputReflect = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Input")
                .getValueByIndex(e)
                .getValueByString("Reflect")
                .toBoolean();
            }),
            (t.prototype.getInputType = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Input")
                .getValueByIndex(e)
                .getValueByString("Type")
                .getRawString();
            }),
            (t.prototype.getInputSourceId = function (t, e) {
              return he
                .getIdManager()
                .getId(
                  this._json
                    .getRoot()
                    .getValueByString(i)
                    .getValueByIndex(t)
                    .getValueByString("Input")
                    .getValueByIndex(e)
                    .getValueByString("Source")
                    .getValueByString("Id")
                    .getRawString(),
                );
            }),
            (t.prototype.getOutputCount = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Output")
                .getVector()
                .getSize();
            }),
            (t.prototype.getOutputVertexIndex = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Output")
                .getValueByIndex(e)
                .getValueByString("VertexIndex")
                .toInt();
            }),
            (t.prototype.getOutputAngleScale = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Output")
                .getValueByIndex(e)
                .getValueByString("Scale")
                .toFloat();
            }),
            (t.prototype.getOutputWeight = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Output")
                .getValueByIndex(e)
                .getValueByString("Weight")
                .toFloat();
            }),
            (t.prototype.getOutputDestinationId = function (t, e) {
              return he
                .getIdManager()
                .getId(
                  this._json
                    .getRoot()
                    .getValueByString(i)
                    .getValueByIndex(t)
                    .getValueByString("Output")
                    .getValueByIndex(e)
                    .getValueByString("Destination")
                    .getValueByString("Id")
                    .getRawString(),
                );
            }),
            (t.prototype.getOutputType = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Output")
                .getValueByIndex(e)
                .getValueByString("Type")
                .getRawString();
            }),
            (t.prototype.getOutputReflect = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Output")
                .getValueByIndex(e)
                .getValueByString("Reflect")
                .toBoolean();
            }),
            (t.prototype.getParticleCount = function (t) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Vertices")
                .getVector()
                .getSize();
            }),
            (t.prototype.getParticleMobility = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Vertices")
                .getValueByIndex(e)
                .getValueByString("Mobility")
                .toFloat();
            }),
            (t.prototype.getParticleDelay = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Vertices")
                .getValueByIndex(e)
                .getValueByString("Delay")
                .toFloat();
            }),
            (t.prototype.getParticleAcceleration = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Vertices")
                .getValueByIndex(e)
                .getValueByString("Acceleration")
                .toFloat();
            }),
            (t.prototype.getParticleRadius = function (t, e) {
              return this._json
                .getRoot()
                .getValueByString(i)
                .getValueByIndex(t)
                .getValueByString("Vertices")
                .getValueByIndex(e)
                .getValueByString("Radius")
                .toInt();
            }),
            (t.prototype.getParticlePosition = function (t, e) {
              var r = new pe(0, 0);
              return (
                (r.x = this._json
                  .getRoot()
                  .getValueByString(i)
                  .getValueByIndex(t)
                  .getValueByString("Vertices")
                  .getValueByIndex(e)
                  .getValueByString("Position")
                  .getValueByString("X")
                  .toFloat()),
                (r.y = this._json
                  .getRoot()
                  .getValueByString(i)
                  .getValueByIndex(t)
                  .getValueByString("Vertices")
                  .getValueByIndex(e)
                  .getValueByString("Position")
                  .getValueByString("Y")
                  .toFloat()),
                r
              );
            }),
            t
          );
        })();
      t.CubismPhysicsJson = r;
    })(le || (le = {}));
    var ce,
      de,
      _e = le.CubismPhysicsJson,
      me = Z.CubismMath,
      fe = ae.CubismPhysicsRig,
      ye = ae.CubismPhysicsSubRig,
      ve = ae.CubismPhysicsInput,
      Se = ae.CubismPhysicsOutput,
      xe = ae.CubismPhysicsParticle,
      Be = ae.CubismPhysicsSource,
      Ce = ae.CubismPhysicsTargetType,
      be = z.CubismVector2;
    !(function (t) {
      var e = 100,
        i = (function () {
          function t() {
            (this._physicsRig = null),
              (this._options = new r()),
              (this._options.gravity.y = -1),
              (this._options.gravity.x = 0),
              (this._options.wind.x = 0),
              (this._options.wind.y = 0);
          }
          return (
            (t.create = function (e, i) {
              var r = new t();
              return r.parse(e, i), (r._physicsRig.gravity.y = 0), r;
            }),
            (t.delete = function (t) {
              null != t && (t.release(), (t = null));
            }),
            (t.prototype.evaluate = function (t, i) {
              var r,
                n,
                o,
                a,
                s,
                u,
                l,
                h,
                p,
                g,
                c,
                m,
                f = new be();
              (p = t.getModel().parameters.values),
                (g = t.getModel().parameters.maximumValues),
                (c = t.getModel().parameters.minimumValues),
                (m = t.getModel().parameters.defaultValues);
              for (var y = 0; y < this._physicsRig.subRigCount; ++y) {
                (r = { angle: 0 }),
                  (f.x = 0),
                  (f.y = 0),
                  (s = this._physicsRig.settings.at(y)),
                  (u = this._physicsRig.inputs.get(s.baseInputIndex)),
                  (l = this._physicsRig.outputs.get(s.baseOutputIndex)),
                  (h = this._physicsRig.particles.get(s.baseParticleIndex));
                for (var v = 0; v < s.inputCount; ++v)
                  (n = u[v].weight / e),
                    -1 == u[v].sourceParameterIndex &&
                      (u[v].sourceParameterIndex = t.getParameterIndex(
                        u[v].source.id,
                      )),
                    u[v].getNormalizedParameterValue(
                      f,
                      r,
                      p[u[v].sourceParameterIndex],
                      c[u[v].sourceParameterIndex],
                      g[u[v].sourceParameterIndex],
                      m[u[v].sourceParameterIndex],
                      s.normalizationPosition,
                      s.normalizationAngle,
                      u[0].reflect,
                      n,
                    );
                (o = me.degreesToRadian(-r.angle)),
                  (f.x = f.x * me.cos(o) - f.y * me.sin(o)),
                  (f.y = f.x * me.sin(o) + f.y * me.cos(o)),
                  d(
                    h,
                    s.particleCount,
                    f,
                    r.angle,
                    this._options.wind,
                    0.001 * s.normalizationPosition.maximum,
                    i,
                    5,
                  );
                for (v = 0; v < s.outputCount; ++v) {
                  var S = l[v].vertexIndex;
                  if (S < 1 || S >= s.particleCount) break;
                  -1 == l[v].destinationParameterIndex &&
                    (l[v].destinationParameterIndex = t.getParameterIndex(
                      l[v].destination.id,
                    ));
                  var x = new be();
                  (x.x = h[S].position.x - h[S - 1].position.x),
                    (x.y = h[S].position.y - h[S - 1].position.y),
                    (a = l[v].getValue(
                      x,
                      h,
                      S,
                      l[v].reflect,
                      this._options.gravity,
                    ));
                  var B = l[v].destinationParameterIndex,
                    C =
                      !Float32Array.prototype.slice &&
                      "subarray" in Float32Array.prototype
                        ? JSON.parse(JSON.stringify(p.subarray(B)))
                        : p.slice(B);
                  _(C, c[B], g[B], a, l[v]);
                  for (var b = B, M = 0; b < p.length; b++, M++) p[b] = C[M];
                }
              }
            }),
            (t.prototype.setOptions = function (t) {
              this._options = t;
            }),
            (t.prototype.getOption = function () {
              return this._options;
            }),
            (t.prototype.release = function () {
              (this._physicsRig = void 0), (this._physicsRig = null);
            }),
            (t.prototype.parse = function (t, e) {
              this._physicsRig = new fe();
              var i = new _e(t, e);
              (this._physicsRig.gravity = i.getGravity()),
                (this._physicsRig.wind = i.getWind()),
                (this._physicsRig.subRigCount = i.getSubRigCount()),
                this._physicsRig.settings.updateSize(
                  this._physicsRig.subRigCount,
                  ye,
                  !0,
                ),
                this._physicsRig.inputs.updateSize(
                  i.getTotalInputCount(),
                  ve,
                  !0,
                ),
                this._physicsRig.outputs.updateSize(
                  i.getTotalOutputCount(),
                  Se,
                  !0,
                ),
                this._physicsRig.particles.updateSize(
                  i.getVertexCount(),
                  xe,
                  !0,
                );
              for (
                var r = 0, h = 0, d = 0, _ = 0;
                _ < this._physicsRig.settings.getSize();
                ++_
              ) {
                (this._physicsRig.settings.at(_).normalizationPosition.minimum =
                  i.getNormalizationPositionMinimumValue(_)),
                  (this._physicsRig.settings.at(
                    _,
                  ).normalizationPosition.maximum =
                    i.getNormalizationPositionMaximumValue(_)),
                  (this._physicsRig.settings.at(
                    _,
                  ).normalizationPosition.defalut =
                    i.getNormalizationPositionDefaultValue(_)),
                  (this._physicsRig.settings.at(_).normalizationAngle.minimum =
                    i.getNormalizationAngleMinimumValue(_)),
                  (this._physicsRig.settings.at(_).normalizationAngle.maximum =
                    i.getNormalizationAngleMaximumValue(_)),
                  (this._physicsRig.settings.at(_).normalizationAngle.defalut =
                    i.getNormalizationAngleDefaultValue(_)),
                  (this._physicsRig.settings.at(_).inputCount =
                    i.getInputCount(_)),
                  (this._physicsRig.settings.at(_).baseInputIndex = r);
                for (
                  var m = 0;
                  m < this._physicsRig.settings.at(_).inputCount;
                  ++m
                )
                  (this._physicsRig.inputs.at(r + m).sourceParameterIndex = -1),
                    (this._physicsRig.inputs.at(r + m).weight =
                      i.getInputWeight(_, m)),
                    (this._physicsRig.inputs.at(r + m).reflect =
                      i.getInputReflect(_, m)),
                    "X" == i.getInputType(_, m)
                      ? ((this._physicsRig.inputs.at(r + m).type =
                          Be.CubismPhysicsSource_X),
                        (this._physicsRig.inputs.at(
                          r + m,
                        ).getNormalizedParameterValue = n))
                      : "Y" == i.getInputType(_, m)
                        ? ((this._physicsRig.inputs.at(r + m).type =
                            Be.CubismPhysicsSource_Y),
                          (this._physicsRig.inputs.at(
                            r + m,
                          ).getNormalizedParameterValue = o))
                        : "Angle" == i.getInputType(_, m) &&
                          ((this._physicsRig.inputs.at(r + m).type =
                            Be.CubismPhysicsSource_Angle),
                          (this._physicsRig.inputs.at(
                            r + m,
                          ).getNormalizedParameterValue = a)),
                    (this._physicsRig.inputs.at(r + m).source.targetType =
                      Ce.CubismPhysicsTargetType_Parameter),
                    (this._physicsRig.inputs.at(r + m).source.id =
                      i.getInputSourceId(_, m));
                (r += this._physicsRig.settings.at(_).inputCount),
                  (this._physicsRig.settings.at(_).outputCount =
                    i.getOutputCount(_)),
                  (this._physicsRig.settings.at(_).baseOutputIndex = h);
                for (
                  m = 0;
                  m < this._physicsRig.settings.at(_).outputCount;
                  ++m
                )
                  (this._physicsRig.outputs.at(
                    h + m,
                  ).destinationParameterIndex = -1),
                    (this._physicsRig.outputs.at(h + m).vertexIndex =
                      i.getOutputVertexIndex(_, m)),
                    (this._physicsRig.outputs.at(h + m).angleScale =
                      i.getOutputAngleScale(_, m)),
                    (this._physicsRig.outputs.at(h + m).weight =
                      i.getOutputWeight(_, m)),
                    (this._physicsRig.outputs.at(h + m).destination.targetType =
                      Ce.CubismPhysicsTargetType_Parameter),
                    (this._physicsRig.outputs.at(h + m).destination.id =
                      i.getOutputDestinationId(_, m)),
                    "X" == i.getOutputType(_, m)
                      ? ((this._physicsRig.outputs.at(h + m).type =
                          Be.CubismPhysicsSource_X),
                        (this._physicsRig.outputs.at(h + m).getValue = s),
                        (this._physicsRig.outputs.at(h + m).getScale = p))
                      : "Y" == i.getOutputType(_, m)
                        ? ((this._physicsRig.outputs.at(h + m).type =
                            Be.CubismPhysicsSource_Y),
                          (this._physicsRig.outputs.at(h + m).getValue = u),
                          (this._physicsRig.outputs.at(h + m).getScale = g))
                        : "Angle" == i.getOutputType(_, m) &&
                          ((this._physicsRig.outputs.at(h + m).type =
                            Be.CubismPhysicsSource_Angle),
                          (this._physicsRig.outputs.at(h + m).getValue = l),
                          (this._physicsRig.outputs.at(h + m).getScale = c)),
                    (this._physicsRig.outputs.at(h + m).reflect =
                      i.getOutputReflect(_, m));
                (h += this._physicsRig.settings.at(_).outputCount),
                  (this._physicsRig.settings.at(_).particleCount =
                    i.getParticleCount(_)),
                  (this._physicsRig.settings.at(_).baseParticleIndex = d);
                for (
                  m = 0;
                  m < this._physicsRig.settings.at(_).particleCount;
                  ++m
                )
                  (this._physicsRig.particles.at(d + m).mobility =
                    i.getParticleMobility(_, m)),
                    (this._physicsRig.particles.at(d + m).delay =
                      i.getParticleDelay(_, m)),
                    (this._physicsRig.particles.at(d + m).acceleration =
                      i.getParticleAcceleration(_, m)),
                    (this._physicsRig.particles.at(d + m).radius =
                      i.getParticleRadius(_, m)),
                    (this._physicsRig.particles.at(d + m).position =
                      i.getParticlePosition(_, m));
                d += this._physicsRig.settings.at(_).particleCount;
              }
              this.initialize(), i.release(), (i = void 0), (i = null);
            }),
            (t.prototype.initialize = function () {
              for (var t, e, i, r = 0; r < this._physicsRig.subRigCount; ++r) {
                (e = this._physicsRig.settings.at(r)),
                  ((t = this._physicsRig.particles.get(
                    e.baseParticleIndex,
                  ))[0].initialPosition = new be(0, 0)),
                  (t[0].lastPosition = new be(
                    t[0].initialPosition.x,
                    t[0].initialPosition.y,
                  )),
                  (t[0].lastGravity = new be(0, -1)),
                  (t[0].lastGravity.y *= -1),
                  (t[0].velocity = new be(0, 0)),
                  (t[0].force = new be(0, 0));
                for (var n = 1; n < e.particleCount; ++n)
                  ((i = new be(0, 0)).y = t[n].radius),
                    (t[n].initialPosition = new be(
                      t[n - 1].initialPosition.x + i.x,
                      t[n - 1].initialPosition.y + i.y,
                    )),
                    (t[n].position = new be(
                      t[n].initialPosition.x,
                      t[n].initialPosition.y,
                    )),
                    (t[n].lastPosition = new be(
                      t[n].initialPosition.x,
                      t[n].initialPosition.y,
                    )),
                    (t[n].lastGravity = new be(0, -1)),
                    (t[n].lastGravity.y *= -1),
                    (t[n].velocity = new be(0, 0)),
                    (t[n].force = new be(0, 0));
              }
            }),
            t
          );
        })();
      t.CubismPhysics = i;
      var r = (function () {
        return function () {
          (this.gravity = new be(0, 0)), (this.wind = new be(0, 0));
        };
      })();
      function n(t, e, i, r, n, o, a, s, u, l) {
        t.x += m(i, r, n, o, a.minimum, a.maximum, a.defalut, u) * l;
      }
      function o(t, e, i, r, n, o, a, s, u, l) {
        t.y += m(i, r, n, o, a.minimum, a.maximum, a.defalut, u) * l;
      }
      function a(t, e, i, r, n, o, a, s, u, l) {
        e.angle += m(i, r, n, o, s.minimum, s.maximum, s.defalut, u) * l;
      }
      function s(t, e, i, r, n) {
        var o = t.x;
        return r && (o *= -1), o;
      }
      function u(t, e, i, r, n) {
        var o = t.y;
        return r && (o *= -1), o;
      }
      function l(t, e, i, r, n) {
        var o;
        return (
          (n =
            i >= 2
              ? e[i - 1].position.substract(e[i - 2].position)
              : n.multiplyByScaler(-1)),
          (o = me.directionToRadian(n, t)),
          r && (o *= -1),
          o
        );
      }
      function h(t, e) {
        return (
          me.min(t, e) +
          (function (t, e) {
            var i = me.max(t, e),
              r = me.min(t, e);
            return me.abs(i - r);
          })(t, e) /
            2
        );
      }
      function p(t, e) {
        return JSON.parse(JSON.stringify(t.x));
      }
      function g(t, e) {
        return JSON.parse(JSON.stringify(t.y));
      }
      function c(t, e) {
        return JSON.parse(JSON.stringify(e));
      }
      function d(t, e, i, r, n, o, a, s) {
        var u,
          l,
          h,
          p,
          g = new be(0, 0),
          c = new be(0, 0),
          d = new be(0, 0),
          _ = new be(0, 0);
        (t[0].position = new be(i.x, i.y)),
          (u = me.degreesToRadian(r)),
          (p = me.radianToDirection(u)).normalize();
        for (var m = 1; m < e; ++m)
          (t[m].force = p.multiplyByScaler(t[m].acceleration).add(n)),
            (t[m].lastPosition = new be(t[m].position.x, t[m].position.y)),
            (l = t[m].delay * a * 30),
            (g = t[m].position.substract(t[m - 1].position)),
            (h = me.directionToRadian(t[m].lastGravity, p) / s),
            (g.x = me.cos(h) * g.x - g.y * me.sin(h)),
            (g.y = me.sin(h) * g.x + g.y * me.cos(h)),
            (t[m].position = t[m - 1].position.add(g)),
            (c = t[m].velocity.multiplyByScaler(l)),
            (d = t[m].force.multiplyByScaler(l).multiplyByScaler(l)),
            (t[m].position = t[m].position.add(c).add(d)),
            (_ = t[m].position.substract(t[m - 1].position)).normalize(),
            (t[m].position = t[m - 1].position.add(
              _.multiplyByScaler(t[m].radius),
            )),
            me.abs(t[m].position.x) < o && (t[m].position.x = 0),
            0 != l &&
              ((t[m].velocity = t[m].position.substract(t[m].lastPosition)),
              (t[m].velocity = t[m].velocity.divisionByScalar(l)),
              (t[m].velocity = t[m].velocity.multiplyByScaler(t[m].mobility))),
            (t[m].force = new be(0, 0)),
            (t[m].lastGravity = new be(p.x, p.y));
      }
      function _(t, i, r, n, o) {
        var a, s;
        (a = n * o.getScale(o.translationScale, o.angleScale)) < i
          ? (a < o.valueBelowMinimum && (o.valueBelowMinimum = a), (a = i))
          : a > r &&
            (a > o.valueExceededMaximum && (o.valueExceededMaximum = a),
            (a = r)),
          (s = o.weight / e) >= 1
            ? (t[0] = a)
            : ((a = t[0] * (1 - s) + a * s), (t[0] = a));
      }
      function m(t, e, i, r, n, o, a, s) {
        var u = 0,
          l = me.max(i, e);
        l < t && (t = l);
        var p = me.min(i, e);
        p > t && (t = p);
        var g = me.min(n, o),
          c = me.max(n, o),
          d = a,
          _ = h(p, l),
          m = t - _;
        switch (
          (function (t) {
            var e = 0;
            return t > 0 ? (e = 1) : t < 0 && (e = -1), e;
          })(m)
        ) {
          case 1:
            var f = c - d;
            0 != (y = l - _) && ((u = m * (f / y)), (u += d));
            break;
          case -1:
            var y;
            f = g - d;
            0 != (y = p - _) && ((u = m * (f / y)), (u += d));
            break;
          case 0:
            u = d;
        }
        return s ? u : -1 * u;
      }
      t.Options = r;
    })(ce || (ce = {})),
      (function (t) {
        var e = (function () {
          function t() {
            this._currentTime = 0;
          }
          return (
            (t.create = function () {
              return new t();
            }),
            (t.delete = function (t) {
              null != t && (t = null);
            }),
            (t.prototype.setParameters = function (t) {
              this._breathParameters = t;
            }),
            (t.prototype.getParameters = function () {
              return this._breathParameters;
            }),
            (t.prototype.updateParameters = function (t, e) {
              this._currentTime += e;
              for (
                var i = 2 * this._currentTime * 3.14159, r = 0;
                r < this._breathParameters.getSize();
                ++r
              ) {
                var n = this._breathParameters.at(r);
                t.addParameterValueById(
                  n.parameterId,
                  n.offset + n.peak * Math.sin(i / n.cycle),
                  n.weight,
                );
              }
            }),
            t
          );
        })();
        t.CubismBreath = e;
        var i = (function () {
          return function (t, e, i, r, n) {
            (this.parameterId = null == t ? null : t),
              (this.offset = null == e ? 0 : e),
              (this.peak = null == i ? 0 : i),
              (this.cycle = null == r ? 0 : r),
              (this.weight = null == n ? 0 : n);
          };
        })();
        t.BreathParameterData = i;
      })(de || (de = {}));
    var Me,
      Pe,
      Ve = g.csmVector;
    !(function (t) {
      var e,
        i = (function () {
          function t(t) {
            if (
              ((this._blinkingState = e.EyeState_First),
              (this._nextBlinkingTime = 0),
              (this._stateStartTimeSeconds = 0),
              (this._blinkingIntervalSeconds = 4),
              (this._closingSeconds = 0.1),
              (this._closedSeconds = 0.05),
              (this._openingSeconds = 0.15),
              (this._userTimeSeconds = 0),
              (this._parameterIds = new Ve()),
              null != t)
            )
              for (var i = 0; i < t.getEyeBlinkParameterCount(); ++i)
                this._parameterIds.pushBack(t.getEyeBlinkParameterId(i));
          }
          return (
            (t.create = function (e) {
              return void 0 === e && (e = null), new t(e);
            }),
            (t.delete = function (t) {
              null != t && (t = null);
            }),
            (t.prototype.setBlinkingInterval = function (t) {
              this._blinkingIntervalSeconds = t;
            }),
            (t.prototype.setBlinkingSetting = function (t, e, i) {
              (this._closingSeconds = t),
                (this._closedSeconds = e),
                (this._openingSeconds = i);
            }),
            (t.prototype.setParameterIds = function (t) {
              this._parameterIds = t;
            }),
            (t.prototype.getParameterIds = function () {
              return this._parameterIds;
            }),
            (t.prototype.updateParameters = function (i, r) {
              var n;
              this._userTimeSeconds += r;
              var o = 0;
              switch (this._blinkingState) {
                case e.EyeState_Closing:
                  (o =
                    (this._userTimeSeconds - this._stateStartTimeSeconds) /
                    this._closingSeconds) >= 1 &&
                    ((o = 1),
                    (this._blinkingState = e.EyeState_Closed),
                    (this._stateStartTimeSeconds = this._userTimeSeconds)),
                    (n = 1 - o);
                  break;
                case e.EyeState_Closed:
                  (o =
                    (this._userTimeSeconds - this._stateStartTimeSeconds) /
                    this._closedSeconds) >= 1 &&
                    ((this._blinkingState = e.EyeState_Opening),
                    (this._stateStartTimeSeconds = this._userTimeSeconds)),
                    (n = 0);
                  break;
                case e.EyeState_Opening:
                  (o =
                    (this._userTimeSeconds - this._stateStartTimeSeconds) /
                    this._openingSeconds) >= 1 &&
                    ((o = 1),
                    (this._blinkingState = e.EyeState_Interval),
                    (this._nextBlinkingTime =
                      this.determinNextBlinkingTiming())),
                    (n = o);
                  break;
                case e.EyeState_Interval:
                  this._nextBlinkingTime < this._userTimeSeconds &&
                    ((this._blinkingState = e.EyeState_Closing),
                    (this._stateStartTimeSeconds = this._userTimeSeconds)),
                    (n = 1);
                  break;
                case e.EyeState_First:
                default:
                  (this._blinkingState = e.EyeState_Interval),
                    (this._nextBlinkingTime =
                      this.determinNextBlinkingTiming()),
                    (n = 1);
              }
              t.CloseIfZero || (n = -n);
              for (var a = 0; a < this._parameterIds.getSize(); ++a)
                i.setParameterValueById(this._parameterIds.at(a), n);
            }),
            (t.prototype.determinNextBlinkingTiming = function () {
              var t = Math.random();
              return (
                this._userTimeSeconds +
                t * (2 * this._blinkingIntervalSeconds - 1)
              );
            }),
            (t.CloseIfZero = !0),
            t
          );
        })();
      (t.CubismEyeBlink = i),
        (function (t) {
          (t[(t.EyeState_First = 0)] = "EyeState_First"),
            (t[(t.EyeState_Interval = 1)] = "EyeState_Interval"),
            (t[(t.EyeState_Closing = 2)] = "EyeState_Closing"),
            (t[(t.EyeState_Closed = 3)] = "EyeState_Closed"),
            (t[(t.EyeState_Opening = 4)] = "EyeState_Opening");
        })((e = t.EyeState || (t.EyeState = {})));
    })(Me || (Me = {})),
      (function (t) {
        var e = (function () {
          function t(t, e, i, r) {
            (this.x = t), (this.y = e), (this.width = i), (this.height = r);
          }
          return (
            (t.prototype.getCenterX = function () {
              return this.x + 0.5 * this.width;
            }),
            (t.prototype.getCenterY = function () {
              return this.y + 0.5 * this.height;
            }),
            (t.prototype.getRight = function () {
              return this.x + this.width;
            }),
            (t.prototype.getBottom = function () {
              return this.y + this.height;
            }),
            (t.prototype.setRect = function (t) {
              (this.x = t.x),
                (this.y = t.y),
                (this.width = t.width),
                (this.height = t.height);
            }),
            (t.prototype.expand = function (t, e) {
              (this.x -= t),
                (this.y -= e),
                (this.width += 2 * t),
                (this.height += 2 * e);
            }),
            t
          );
        })();
        t.csmRect = e;
      })(Pe || (Pe = {}));
    var Ie,
      we = (function () {
        var t = function (e, i) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(e, i);
        };
        return function (e, i) {
          function r() {
            this.constructor = e;
          }
          t(e, i),
            (e.prototype =
              null === i
                ? Object.create(i)
                : ((r.prototype = i.prototype), new r()));
        };
      })(),
      Te = w.Constant,
      Ee = b.CubismMatrix44,
      Fe = Pe.csmRect,
      Le = p.csmMap,
      Re = g.csmVector,
      Ae = V.CubismRenderer,
      De = V.CubismBlendMode,
      ke = V.CubismTextureColor;
    !(function (t) {
      var e,
        i,
        r,
        n = (function () {
          function t() {
            (this._maskRenderTexture = null),
              (this._colorBuffer = null),
              (this._currentFrameNo = 0),
              (this._clippingMaskBufferSize = 256),
              (this._clippingContextListForMask = new Re()),
              (this._clippingContextListForDraw = new Re()),
              (this._channelColors = new Re()),
              (this._tmpBoundsOnModel = new Fe()),
              (this._tmpMatrix = new Ee()),
              (this._tmpMatrixForMask = new Ee()),
              (this._tmpMatrixForDraw = new Ee()),
              (this._maskTexture = null);
            var t = new ke();
            (t.R = 1),
              (t.G = 0),
              (t.B = 0),
              (t.A = 0),
              this._channelColors.pushBack(t),
              ((t = new ke()).R = 0),
              (t.G = 1),
              (t.B = 0),
              (t.A = 0),
              this._channelColors.pushBack(t),
              ((t = new ke()).R = 0),
              (t.G = 0),
              (t.B = 1),
              (t.A = 0),
              this._channelColors.pushBack(t),
              ((t = new ke()).R = 0),
              (t.G = 0),
              (t.B = 0),
              (t.A = 1),
              this._channelColors.pushBack(t);
          }
          return (
            (t.prototype.getChannelFlagAsColor = function (t) {
              return this._channelColors.at(t);
            }),
            (t.prototype.getMaskRenderTexture = function () {
              var t = 0;
              if (
                (this._maskTexture &&
                  0 != this._maskTexture.texture &&
                  ((this._maskTexture.frameNo = this._currentFrameNo),
                  (t = this._maskTexture.texture)),
                0 == t)
              ) {
                var e = this._clippingMaskBufferSize;
                (this._colorBuffer = this.gl.createTexture()),
                  this.gl.bindTexture(this.gl.TEXTURE_2D, this._colorBuffer),
                  this.gl.texImage2D(
                    this.gl.TEXTURE_2D,
                    0,
                    this.gl.RGBA,
                    e,
                    e,
                    0,
                    this.gl.RGBA,
                    this.gl.UNSIGNED_BYTE,
                    null,
                  ),
                  this.gl.texParameteri(
                    this.gl.TEXTURE_2D,
                    this.gl.TEXTURE_WRAP_S,
                    this.gl.CLAMP_TO_EDGE,
                  ),
                  this.gl.texParameteri(
                    this.gl.TEXTURE_2D,
                    this.gl.TEXTURE_WRAP_T,
                    this.gl.CLAMP_TO_EDGE,
                  ),
                  this.gl.texParameteri(
                    this.gl.TEXTURE_2D,
                    this.gl.TEXTURE_MIN_FILTER,
                    this.gl.LINEAR,
                  ),
                  this.gl.texParameteri(
                    this.gl.TEXTURE_2D,
                    this.gl.TEXTURE_MAG_FILTER,
                    this.gl.LINEAR,
                  ),
                  this.gl.bindTexture(this.gl.TEXTURE_2D, null),
                  (t = this.gl.createFramebuffer()),
                  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, t),
                  this.gl.framebufferTexture2D(
                    this.gl.FRAMEBUFFER,
                    this.gl.COLOR_ATTACHMENT0,
                    this.gl.TEXTURE_2D,
                    this._colorBuffer,
                    0,
                  ),
                  this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, r),
                  (this._maskTexture = new o(this._currentFrameNo, t));
              }
              return t;
            }),
            (t.prototype.setGL = function (t) {
              this.gl = t;
            }),
            (t.prototype.calcClippedDrawTotalBounds = function (t, e) {
              for (
                var i = Number.MAX_VALUE,
                  r = Number.MAX_VALUE,
                  n = Number.MIN_VALUE,
                  o = Number.MIN_VALUE,
                  a = e._clippedDrawableIndexList.length,
                  s = 0;
                s < a;
                s++
              ) {
                for (
                  var u = e._clippedDrawableIndexList[s],
                    l = t.getDrawableVertexCount(u),
                    h = t.getDrawableVertices(u),
                    p = Number.MAX_VALUE,
                    g = Number.MAX_VALUE,
                    c = Number.MIN_VALUE,
                    d = Number.MIN_VALUE,
                    _ = l * Te.vertexStep,
                    m = Te.vertexOffset;
                  m < _;
                  m += Te.vertexStep
                ) {
                  var f = h[m],
                    y = h[m + 1];
                  f < p && (p = f),
                    f > c && (c = f),
                    y < g && (g = y),
                    y > d && (d = y);
                }
                if (p != Number.MAX_VALUE)
                  if (
                    (p < i && (i = p),
                    g < r && (r = g),
                    c > n && (n = c),
                    d > o && (o = d),
                    i == Number.MAX_VALUE)
                  )
                    (e._allClippedDrawRect.x = 0),
                      (e._allClippedDrawRect.y = 0),
                      (e._allClippedDrawRect.width = 0),
                      (e._allClippedDrawRect.height = 0),
                      (e._isUsing = !1);
                  else {
                    e._isUsing = !0;
                    var v = n - i,
                      S = o - r;
                    (e._allClippedDrawRect.x = i),
                      (e._allClippedDrawRect.y = r),
                      (e._allClippedDrawRect.width = v),
                      (e._allClippedDrawRect.height = S);
                  }
              }
            }),
            (t.prototype.release = function () {
              for (
                var t = 0;
                t < this._clippingContextListForMask.getSize();
                t++
              )
                this._clippingContextListForMask.at(t) &&
                  (this._clippingContextListForMask.at(t).release(),
                  this._clippingContextListForMask.set(t, void 0)),
                  this._clippingContextListForMask.set(t, null);
              this._clippingContextListForMask = null;
              for (t = 0; t < this._clippingContextListForDraw.getSize(); t++)
                this._clippingContextListForDraw.set(t, null);
              (this._clippingContextListForDraw = null),
                this._maskTexture &&
                  (this.gl.deleteFramebuffer(this._maskTexture.texture),
                  (this._maskTexture = null));
              for (t = 0; t < this._channelColors.getSize(); t++)
                this._channelColors.set(t, null);
              (this._channelColors = null),
                this.gl.deleteTexture(this._colorBuffer),
                (this._colorBuffer = null);
            }),
            (t.prototype.initialize = function (t, e, i, r) {
              for (var n = 0; n < e; n++)
                if (r[n] <= 0) this._clippingContextListForDraw.pushBack(null);
                else {
                  var o = this.findSameClip(i[n], r[n]);
                  null == o &&
                    ((o = new a(this, i[n], r[n])),
                    this._clippingContextListForMask.pushBack(o)),
                    o.addClippedDrawable(n),
                    this._clippingContextListForDraw.pushBack(o);
                }
            }),
            (t.prototype.setupClippingContext = function (t, e) {
              this._currentFrameNo++;
              for (
                var n = 0, o = 0;
                o < this._clippingContextListForMask.getSize();
                o++
              ) {
                var a = this._clippingContextListForMask.at(o);
                this.calcClippedDrawTotalBounds(t, a), a._isUsing && n++;
              }
              if (n > 0) {
                this.gl.viewport(
                  0,
                  0,
                  this._clippingMaskBufferSize,
                  this._clippingMaskBufferSize,
                ),
                  (this._maskRenderTexture = this.getMaskRenderTexture());
                e.getMvpMatrix();
                e.preDraw(),
                  this.setupLayoutBounds(n),
                  this.gl.bindFramebuffer(
                    this.gl.FRAMEBUFFER,
                    this._maskRenderTexture,
                  ),
                  this.gl.clearColor(1, 1, 1, 1),
                  this.gl.clear(this.gl.COLOR_BUFFER_BIT);
                for (
                  o = 0;
                  o < this._clippingContextListForMask.getSize();
                  o++
                ) {
                  var s = this._clippingContextListForMask.at(o),
                    u = s._allClippedDrawRect,
                    l = s._layoutBounds;
                  this._tmpBoundsOnModel.setRect(u),
                    this._tmpBoundsOnModel.expand(
                      0.05 * u.width,
                      0.05 * u.height,
                    );
                  var h = l.width / this._tmpBoundsOnModel.width,
                    p = l.height / this._tmpBoundsOnModel.height;
                  this._tmpMatrix.loadIdentity(),
                    this._tmpMatrix.translateRelative(-1, -1),
                    this._tmpMatrix.scaleRelative(2, 2),
                    this._tmpMatrix.translateRelative(l.x, l.y),
                    this._tmpMatrix.scaleRelative(h, p),
                    this._tmpMatrix.translateRelative(
                      -this._tmpBoundsOnModel.x,
                      -this._tmpBoundsOnModel.y,
                    ),
                    this._tmpMatrixForMask.setMatrix(
                      this._tmpMatrix.getArray(),
                    ),
                    this._tmpMatrix.loadIdentity(),
                    this._tmpMatrix.translateRelative(l.x, l.y),
                    this._tmpMatrix.scaleRelative(h, p),
                    this._tmpMatrix.translateRelative(
                      -this._tmpBoundsOnModel.x,
                      -this._tmpBoundsOnModel.y,
                    ),
                    this._tmpMatrixForDraw.setMatrix(
                      this._tmpMatrix.getArray(),
                    ),
                    s._matrixForMask.setMatrix(
                      this._tmpMatrixForMask.getArray(),
                    ),
                    s._matrixForDraw.setMatrix(
                      this._tmpMatrixForDraw.getArray(),
                    );
                  for (var g = s._clippingIdCount, c = 0; c < g; c++) {
                    var d = s._clippingIdList[c];
                    t.getDrawableDynamicFlagVertexPositionsDidChange(d) &&
                      (e.setIsCulling(0 != t.getDrawableCulling(d)),
                      e.setClippingContextBufferForMask(s),
                      e.drawMesh(
                        t.getDrawableTextureIndices(d),
                        t.getDrawableVertexIndexCount(d),
                        t.getDrawableVertexCount(d),
                        t.getDrawableVertexIndices(d),
                        t.getDrawableVertices(d),
                        t.getDrawableVertexUvs(d),
                        t.getDrawableOpacity(d),
                        De.CubismBlendMode_Normal,
                        !1,
                      ));
                  }
                }
                this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, r),
                  e.setClippingContextBufferForMask(null),
                  this.gl.viewport(i[0], i[1], i[2], i[3]);
              }
            }),
            (t.prototype.findSameClip = function (t, e) {
              for (
                var i = 0;
                i < this._clippingContextListForMask.getSize();
                i++
              ) {
                var r = this._clippingContextListForMask.at(i),
                  n = r._clippingIdCount;
                if (n == e) {
                  for (var o = 0, a = 0; a < n; a++)
                    for (var s = r._clippingIdList[a], u = 0; u < n; u++)
                      if (t[u] == s) {
                        o++;
                        break;
                      }
                  if (o == n) return r;
                }
              }
              return null;
            }),
            (t.prototype.setupLayoutBounds = function (t) {
              var e = t / 4,
                i = t % 4;
              (e = ~~e), (i = ~~i);
              for (var r = 0, n = 0; n < 4; n++) {
                var o = e + (n < i ? 1 : 0);
                if (0 == o);
                else if (1 == o) {
                  var a = this._clippingContextListForMask.at(r++);
                  (a._layoutChannelNo = n),
                    (a._layoutBounds.x = 0),
                    (a._layoutBounds.y = 0),
                    (a._layoutBounds.width = 1),
                    (a._layoutBounds.height = 1);
                } else if (2 == o)
                  for (var u = 0; u < o; u++) {
                    (l = ~~(l = u % 2)),
                      ((p = this._clippingContextListForMask.at(
                        r++,
                      ))._layoutChannelNo = n),
                      (p._layoutBounds.x = 0.5 * l),
                      (p._layoutBounds.y = 0),
                      (p._layoutBounds.width = 0.5),
                      (p._layoutBounds.height = 1);
                  }
                else if (o <= 4)
                  for (u = 0; u < o; u++) {
                    (l = ~~(l = u % 2)),
                      (h = ~~(h = u / 2)),
                      ((p = this._clippingContextListForMask.at(
                        r++,
                      ))._layoutChannelNo = n),
                      (p._layoutBounds.x = 0.5 * l),
                      (p._layoutBounds.y = 0.5 * h),
                      (p._layoutBounds.width = 0.5),
                      (p._layoutBounds.height = 0.5);
                  }
                else if (o <= 9)
                  for (u = 0; u < o; u++) {
                    var l, h, p;
                    (l = ~~(l = u % 3)),
                      (h = ~~(h = u / 3)),
                      ((p = this._clippingContextListForMask.at(
                        r++,
                      ))._layoutChannelNo = n),
                      (p._layoutBounds.x = l / 3),
                      (p._layoutBounds.y = h / 3),
                      (p._layoutBounds.width = 1 / 3),
                      (p._layoutBounds.height = 1 / 3);
                  }
                else s("not supported mask count : {0}", o);
              }
            }),
            (t.prototype.getColorBuffer = function () {
              return this._colorBuffer;
            }),
            (t.prototype.getClippingContextListForDraw = function () {
              return this._clippingContextListForDraw;
            }),
            (t.prototype.setClippingMaskBufferSize = function (t) {
              this._clippingMaskBufferSize = t;
            }),
            (t.prototype.getClippingMaskBufferSize = function () {
              return this._clippingMaskBufferSize;
            }),
            t
          );
        })();
      t.CubismClippingManager_WebGL = n;
      var o = (function () {
        return function (t, e) {
          (this.frameNo = t), (this.texture = e);
        };
      })();
      t.CubismRenderTextureResource = o;
      var a = (function () {
        function t(t, e, i) {
          (this._owner = t),
            (this._clippingIdList = e),
            (this._clippingIdCount = i),
            (this._allClippedDrawRect = new Fe()),
            (this._layoutBounds = new Fe()),
            (this._clippedDrawableIndexList = []),
            (this._matrixForMask = new Ee()),
            (this._matrixForDraw = new Ee());
        }
        return (
          (t.prototype.release = function () {
            null != this._layoutBounds && (this._layoutBounds = null),
              null != this._allClippedDrawRect &&
                (this._allClippedDrawRect = null),
              null != this._clippedDrawableIndexList &&
                (this._clippedDrawableIndexList = null);
          }),
          (t.prototype.addClippedDrawable = function (t) {
            this._clippedDrawableIndexList.push(t);
          }),
          (t.prototype.getClippingManager = function () {
            return this._owner;
          }),
          (t.prototype.setGl = function (t) {
            this._owner.setGL(t);
          }),
          t
        );
      })();
      t.CubismClippingContext = a;
      var u = (function () {
        function i() {
          this._shaderSets = new Re();
        }
        return (
          (i.getInstance = function () {
            return null == e ? (e = new i()) : e;
          }),
          (i.deleteInstance = function () {
            e && (e.release(), (e = null));
          }),
          (i.prototype.release = function () {
            this.releaseShaderProgram();
          }),
          (i.prototype.setupShaderProgram = function (
            t,
            e,
            i,
            r,
            n,
            o,
            a,
            u,
            p,
            g,
            c,
            d,
            _,
          ) {
            var m, f, y, v;
            if (
              (c || s("NoPremultipliedAlpha is not allowed"),
              0 == this._shaderSets.getSize() && this.generateShaders(),
              null != t.getClippingContextBufferForMask())
            ) {
              var S = this._shaderSets.at(l.ShaderNames_SetupMask);
              this.gl.useProgram(S.shaderProgram),
                this.gl.activeTexture(this.gl.TEXTURE0),
                this.gl.bindTexture(this.gl.TEXTURE_2D, e),
                this.gl.uniform1i(S.samplerTexture0Location, 0),
                null == a.vertex && (a.vertex = this.gl.createBuffer()),
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, a.vertex),
                this.gl.bufferData(
                  this.gl.ARRAY_BUFFER,
                  r,
                  this.gl.DYNAMIC_DRAW,
                ),
                this.gl.enableVertexAttribArray(S.attributePositionLocation),
                this.gl.vertexAttribPointer(
                  S.attributePositionLocation,
                  2,
                  this.gl.FLOAT,
                  !1,
                  0,
                  0,
                ),
                null == a.uv && (a.uv = this.gl.createBuffer()),
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, a.uv),
                this.gl.bufferData(
                  this.gl.ARRAY_BUFFER,
                  o,
                  this.gl.DYNAMIC_DRAW,
                ),
                this.gl.enableVertexAttribArray(S.attributeTexCoordLocation),
                this.gl.vertexAttribPointer(
                  S.attributeTexCoordLocation,
                  2,
                  this.gl.FLOAT,
                  !1,
                  0,
                  0,
                );
              var x = t.getClippingContextBufferForMask()._layoutChannelNo,
                B = t
                  .getClippingContextBufferForMask()
                  .getClippingManager()
                  .getChannelFlagAsColor(x);
              this.gl.uniform4f(
                S.uniformChannelFlagLocation,
                B.R,
                B.G,
                B.B,
                B.A,
              ),
                this.gl.uniformMatrix4fv(
                  S.uniformClipMatrixLocation,
                  !1,
                  t.getClippingContextBufferForMask()._matrixForMask.getArray(),
                );
              var C = t.getClippingContextBufferForMask()._layoutBounds;
              this.gl.uniform4f(
                S.uniformBaseColorLocation,
                2 * C.x - 1,
                2 * C.y - 1,
                2 * C.getRight() - 1,
                2 * C.getBottom() - 1,
              ),
                (m = this.gl.ZERO),
                (f = this.gl.ONE_MINUS_SRC_COLOR),
                (y = this.gl.ZERO),
                (v = this.gl.ONE_MINUS_SRC_ALPHA);
            } else {
              var b = null != t.getClippingContextBufferForDraw(),
                M = b ? (_ ? 2 : 1) : 0;
              S = new h();
              switch (p) {
                case De.CubismBlendMode_Normal:
                default:
                  (S = this._shaderSets.at(
                    l.ShaderNames_NormalPremultipliedAlpha + M,
                  )),
                    (m = this.gl.ONE),
                    (f = this.gl.ONE_MINUS_SRC_ALPHA),
                    (y = this.gl.ONE),
                    (v = this.gl.ONE_MINUS_SRC_ALPHA);
                  break;
                case De.CubismBlendMode_Additive:
                  (S = this._shaderSets.at(
                    l.ShaderNames_AddPremultipliedAlpha + M,
                  )),
                    (m = this.gl.ONE),
                    (f = this.gl.ONE),
                    (y = this.gl.ZERO),
                    (v = this.gl.ONE);
                  break;
                case De.CubismBlendMode_Multiplicative:
                  (S = this._shaderSets.at(
                    l.ShaderNames_MultPremultipliedAlpha + M,
                  )),
                    (m = this.gl.DST_COLOR),
                    (f = this.gl.ONE_MINUS_SRC_ALPHA),
                    (y = this.gl.ZERO),
                    (v = this.gl.ONE);
              }
              if (
                (this.gl.useProgram(S.shaderProgram),
                null == a.vertex && (a.vertex = this.gl.createBuffer()),
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, a.vertex),
                this.gl.bufferData(
                  this.gl.ARRAY_BUFFER,
                  r,
                  this.gl.DYNAMIC_DRAW,
                ),
                this.gl.enableVertexAttribArray(S.attributePositionLocation),
                this.gl.vertexAttribPointer(
                  S.attributePositionLocation,
                  2,
                  this.gl.FLOAT,
                  !1,
                  0,
                  0,
                ),
                null == a.uv && (a.uv = this.gl.createBuffer()),
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, a.uv),
                this.gl.bufferData(
                  this.gl.ARRAY_BUFFER,
                  o,
                  this.gl.DYNAMIC_DRAW,
                ),
                this.gl.enableVertexAttribArray(S.attributeTexCoordLocation),
                this.gl.vertexAttribPointer(
                  S.attributeTexCoordLocation,
                  2,
                  this.gl.FLOAT,
                  !1,
                  0,
                  0,
                ),
                b)
              ) {
                this.gl.activeTexture(this.gl.TEXTURE1);
                var P = t
                  .getClippingContextBufferForDraw()
                  .getClippingManager()
                  .getColorBuffer();
                this.gl.bindTexture(this.gl.TEXTURE_2D, P),
                  this.gl.uniform1i(S.samplerTexture1Location, 1),
                  this.gl.uniformMatrix4fv(
                    S.uniformClipMatrixLocation,
                    !1,
                    t
                      .getClippingContextBufferForDraw()
                      ._matrixForDraw.getArray(),
                  );
                (x = t.getClippingContextBufferForDraw()._layoutChannelNo),
                  (B = t
                    .getClippingContextBufferForDraw()
                    .getClippingManager()
                    .getChannelFlagAsColor(x));
                this.gl.uniform4f(
                  S.uniformChannelFlagLocation,
                  B.R,
                  B.G,
                  B.B,
                  B.A,
                );
              }
              this.gl.activeTexture(this.gl.TEXTURE0),
                this.gl.bindTexture(this.gl.TEXTURE_2D, e),
                this.gl.uniform1i(S.samplerTexture0Location, 0),
                this.gl.uniformMatrix4fv(
                  S.uniformMatrixLocation,
                  !1,
                  d.getArray(),
                ),
                this.gl.uniform4f(
                  S.uniformBaseColorLocation,
                  g.R,
                  g.G,
                  g.B,
                  g.A,
                );
            }
            null == a.index && (a.index = this.gl.createBuffer()),
              this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, a.index),
              this.gl.bufferData(
                this.gl.ELEMENT_ARRAY_BUFFER,
                n,
                this.gl.DYNAMIC_DRAW,
              ),
              this.gl.blendFuncSeparate(m, f, y, v);
          }),
          (i.prototype.releaseShaderProgram = function () {
            for (var t = 0; t < this._shaderSets.getSize(); t++)
              this.gl.deleteProgram(this._shaderSets.at(t).shaderProgram),
                (this._shaderSets.at(t).shaderProgram = 0),
                this._shaderSets.set(t, void 0),
                this._shaderSets.set(t, null);
          }),
          (i.prototype.generateShaders = function () {
            for (var e = 0; e < 10; e++) this._shaderSets.pushBack(new h());
            (this._shaderSets.at(0).shaderProgram = this.loadShaderProgram(
              t.vertexShaderSrcSetupMask,
              t.fragmentShaderSrcsetupMask,
            )),
              (this._shaderSets.at(1).shaderProgram = this.loadShaderProgram(
                t.vertexShaderSrc,
                t.fragmentShaderSrcPremultipliedAlpha,
              )),
              (this._shaderSets.at(2).shaderProgram = this.loadShaderProgram(
                t.vertexShaderSrcMasked,
                t.fragmentShaderSrcMaskPremultipliedAlpha,
              )),
              (this._shaderSets.at(3).shaderProgram = this.loadShaderProgram(
                t.vertexShaderSrcMasked,
                t.fragmentShaderSrcMaskInvertedPremultipliedAlpha,
              )),
              (this._shaderSets.at(4).shaderProgram =
                this._shaderSets.at(1).shaderProgram),
              (this._shaderSets.at(5).shaderProgram =
                this._shaderSets.at(2).shaderProgram),
              (this._shaderSets.at(6).shaderProgram =
                this._shaderSets.at(3).shaderProgram),
              (this._shaderSets.at(7).shaderProgram =
                this._shaderSets.at(1).shaderProgram),
              (this._shaderSets.at(8).shaderProgram =
                this._shaderSets.at(2).shaderProgram),
              (this._shaderSets.at(9).shaderProgram =
                this._shaderSets.at(3).shaderProgram),
              (this._shaderSets.at(0).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(0).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(0).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(0).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(0).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(0).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(0).uniformClipMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(0).shaderProgram,
                  "u_clipMatrix",
                )),
              (this._shaderSets.at(0).uniformChannelFlagLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(0).shaderProgram,
                  "u_channelFlag",
                )),
              (this._shaderSets.at(0).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(0).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(1).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(1).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(1).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(1).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(1).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(1).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(1).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(1).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(1).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(1).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(2).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(2).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(2).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(2).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(2).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(2).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(2).samplerTexture1Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(2).shaderProgram,
                  "s_texture1",
                )),
              (this._shaderSets.at(2).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(2).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(2).uniformClipMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(2).shaderProgram,
                  "u_clipMatrix",
                )),
              (this._shaderSets.at(2).uniformChannelFlagLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(2).shaderProgram,
                  "u_channelFlag",
                )),
              (this._shaderSets.at(2).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(2).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(3).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(3).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(3).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(3).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(3).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(3).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(3).samplerTexture1Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(3).shaderProgram,
                  "s_texture1",
                )),
              (this._shaderSets.at(3).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(3).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(3).uniformClipMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(3).shaderProgram,
                  "u_clipMatrix",
                )),
              (this._shaderSets.at(3).uniformChannelFlagLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(3).shaderProgram,
                  "u_channelFlag",
                )),
              (this._shaderSets.at(3).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(3).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(4).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(4).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(4).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(4).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(4).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(4).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(4).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(4).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(4).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(4).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(5).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(5).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(5).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(5).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(5).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(5).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(5).samplerTexture1Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(5).shaderProgram,
                  "s_texture1",
                )),
              (this._shaderSets.at(5).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(5).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(5).uniformClipMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(5).shaderProgram,
                  "u_clipMatrix",
                )),
              (this._shaderSets.at(5).uniformChannelFlagLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(5).shaderProgram,
                  "u_channelFlag",
                )),
              (this._shaderSets.at(5).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(5).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(6).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(6).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(6).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(6).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(6).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(6).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(6).samplerTexture1Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(6).shaderProgram,
                  "s_texture1",
                )),
              (this._shaderSets.at(6).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(6).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(6).uniformClipMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(6).shaderProgram,
                  "u_clipMatrix",
                )),
              (this._shaderSets.at(6).uniformChannelFlagLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(6).shaderProgram,
                  "u_channelFlag",
                )),
              (this._shaderSets.at(6).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(6).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(7).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(7).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(7).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(7).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(7).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(7).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(7).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(7).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(7).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(7).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(8).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(8).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(8).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(8).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(8).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(8).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(8).samplerTexture1Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(8).shaderProgram,
                  "s_texture1",
                )),
              (this._shaderSets.at(8).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(8).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(8).uniformClipMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(8).shaderProgram,
                  "u_clipMatrix",
                )),
              (this._shaderSets.at(8).uniformChannelFlagLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(8).shaderProgram,
                  "u_channelFlag",
                )),
              (this._shaderSets.at(8).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(8).shaderProgram,
                  "u_baseColor",
                )),
              (this._shaderSets.at(9).attributePositionLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(9).shaderProgram,
                  "a_position",
                )),
              (this._shaderSets.at(9).attributeTexCoordLocation =
                this.gl.getAttribLocation(
                  this._shaderSets.at(9).shaderProgram,
                  "a_texCoord",
                )),
              (this._shaderSets.at(9).samplerTexture0Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(9).shaderProgram,
                  "s_texture0",
                )),
              (this._shaderSets.at(9).samplerTexture1Location =
                this.gl.getUniformLocation(
                  this._shaderSets.at(9).shaderProgram,
                  "s_texture1",
                )),
              (this._shaderSets.at(9).uniformMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(9).shaderProgram,
                  "u_matrix",
                )),
              (this._shaderSets.at(9).uniformClipMatrixLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(9).shaderProgram,
                  "u_clipMatrix",
                )),
              (this._shaderSets.at(9).uniformChannelFlagLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(9).shaderProgram,
                  "u_channelFlag",
                )),
              (this._shaderSets.at(9).uniformBaseColorLocation =
                this.gl.getUniformLocation(
                  this._shaderSets.at(9).shaderProgram,
                  "u_baseColor",
                ));
          }),
          (i.prototype.loadShaderProgram = function (t, e) {
            var i = this.gl.createProgram(),
              r = this.compileShaderSource(this.gl.VERTEX_SHADER, t);
            if (!r) return s("Vertex shader compile error!"), 0;
            var n = this.compileShaderSource(this.gl.FRAGMENT_SHADER, e);
            return n
              ? (this.gl.attachShader(i, r),
                this.gl.attachShader(i, n),
                this.gl.linkProgram(i),
                this.gl.getProgramParameter(i, this.gl.LINK_STATUS)
                  ? (this.gl.deleteShader(r), this.gl.deleteShader(n), i)
                  : (s("Failed to link program: {0}", i),
                    this.gl.deleteShader(r),
                    (r = 0),
                    this.gl.deleteShader(n),
                    (n = 0),
                    i && (this.gl.deleteProgram(i), (i = 0)),
                    0))
              : (s("Vertex shader compile error!"), 0);
          }),
          (i.prototype.compileShaderSource = function (t, e) {
            var i = e,
              r = this.gl.createShader(t);
            if ((this.gl.shaderSource(r, i), this.gl.compileShader(r), !r)) {
              var n = this.gl.getShaderInfoLog(r);
              s("Shader compile log: {0} ", n);
            }
            return this.gl.getShaderParameter(r, this.gl.COMPILE_STATUS)
              ? r
              : (this.gl.deleteShader(r), null);
          }),
          (i.prototype.setGl = function (t) {
            this.gl = t;
          }),
          i
        );
      })();
      t.CubismShader_WebGL = u;
      var l,
        h = (function () {
          return function () {};
        })();
      (t.CubismShaderSet = h),
        (function (t) {
          (t[(t.ShaderNames_SetupMask = 0)] = "ShaderNames_SetupMask"),
            (t[(t.ShaderNames_NormalPremultipliedAlpha = 1)] =
              "ShaderNames_NormalPremultipliedAlpha"),
            (t[(t.ShaderNames_NormalMaskedPremultipliedAlpha = 2)] =
              "ShaderNames_NormalMaskedPremultipliedAlpha"),
            (t[(t.ShaderNames_NomralMaskedInvertedPremultipliedAlpha = 3)] =
              "ShaderNames_NomralMaskedInvertedPremultipliedAlpha"),
            (t[(t.ShaderNames_AddPremultipliedAlpha = 4)] =
              "ShaderNames_AddPremultipliedAlpha"),
            (t[(t.ShaderNames_AddMaskedPremultipliedAlpha = 5)] =
              "ShaderNames_AddMaskedPremultipliedAlpha"),
            (t[(t.ShaderNames_AddMaskedPremultipliedAlphaInverted = 6)] =
              "ShaderNames_AddMaskedPremultipliedAlphaInverted"),
            (t[(t.ShaderNames_MultPremultipliedAlpha = 7)] =
              "ShaderNames_MultPremultipliedAlpha"),
            (t[(t.ShaderNames_MultMaskedPremultipliedAlpha = 8)] =
              "ShaderNames_MultMaskedPremultipliedAlpha"),
            (t[(t.ShaderNames_MultMaskedPremultipliedAlphaInverted = 9)] =
              "ShaderNames_MultMaskedPremultipliedAlphaInverted");
        })((l = t.ShaderNames || (t.ShaderNames = {}))),
        (t.vertexShaderSrcSetupMask =
          "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_myPos;uniform mat4       u_clipMatrix;void main(){   gl_Position = u_clipMatrix * a_position;   v_myPos = u_clipMatrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}"),
        (t.fragmentShaderSrcsetupMask =
          "precision mediump float;varying vec2       v_texCoord;varying vec4       v_myPos;uniform vec4       u_baseColor;uniform vec4       u_channelFlag;uniform sampler2D  s_texture0;void main(){   float isInside =        step(u_baseColor.x, v_myPos.x/v_myPos.w)       * step(u_baseColor.y, v_myPos.y/v_myPos.w)       * step(v_myPos.x/v_myPos.w, u_baseColor.z)       * step(v_myPos.y/v_myPos.w, u_baseColor.w);   gl_FragColor = u_channelFlag * texture2D(s_texture0, v_texCoord).a * isInside;}"),
        (t.vertexShaderSrc =
          "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;uniform mat4       u_matrix;void main(){   gl_Position = u_matrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}"),
        (t.vertexShaderSrcMasked =
          "attribute vec4     a_position;attribute vec2     a_texCoord;varying vec2       v_texCoord;varying vec4       v_clipPos;uniform mat4       u_matrix;uniform mat4       u_clipMatrix;void main(){   gl_Position = u_matrix * a_position;   v_clipPos = u_clipMatrix * a_position;   v_texCoord = a_texCoord;   v_texCoord.y = 1.0 - v_texCoord.y;}"),
        (t.fragmentShaderSrcPremultipliedAlpha =
          "precision mediump float;varying vec2       v_texCoord;uniform vec4       u_baseColor;uniform sampler2D  s_texture0;void main(){   gl_FragColor = texture2D(s_texture0 , v_texCoord) * u_baseColor;}"),
        (t.fragmentShaderSrcMaskPremultipliedAlpha =
          "precision mediump float;varying vec2       v_texCoord;varying vec4       v_clipPos;uniform vec4       u_baseColor;uniform vec4       u_channelFlag;uniform sampler2D  s_texture0;uniform sampler2D  s_texture1;void main(){   vec4 col_formask = texture2D(s_texture0 , v_texCoord) * u_baseColor;   vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;   float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;   col_formask = col_formask * maskVal;   gl_FragColor = col_formask;}"),
        (t.fragmentShaderSrcMaskInvertedPremultipliedAlpha =
          "precision mediump float;varying vec2 v_texCoord;varying vec4 v_clipPos;uniform sampler2D s_texture0;uniform sampler2D s_texture1;uniform vec4 u_channelFlag;uniform vec4 u_baseColor;void main(){vec4 col_formask = texture2D(s_texture0, v_texCoord) * u_baseColor;vec4 clipMask = (1.0 - texture2D(s_texture1, v_clipPos.xy / v_clipPos.w)) * u_channelFlag;float maskVal = clipMask.r + clipMask.g + clipMask.b + clipMask.a;col_formask = col_formask * (1.0 - maskVal);gl_FragColor = col_formask;}");
      var p = (function (t) {
        function e() {
          var e = t.call(this) || this;
          return (
            (e._clippingContextBufferForMask = null),
            (e._clippingContextBufferForDraw = null),
            (e._clippingManager = new n()),
            (e.firstDraw = !0),
            (e._textures = new Le()),
            (e._sortedDrawableIndexList = new Re()),
            (e._bufferData = {
              vertex: (WebGLBuffer = null),
              uv: (WebGLBuffer = null),
              index: (WebGLBuffer = null),
            }),
            e._textures.prepareCapacity(32, !0),
            e
          );
        }
        return (
          we(e, t),
          (e.prototype.initialize = function (e) {
            e.isUsingMasking() &&
              ((this._clippingManager = new n()),
              this._clippingManager.initialize(
                e,
                e.getDrawableCount(),
                e.getDrawableMasks(),
                e.getDrawableMaskCounts(),
              )),
              this._sortedDrawableIndexList.resize(e.getDrawableCount(), 0),
              t.prototype.initialize.call(this, e);
          }),
          (e.prototype.bindTexture = function (t, e) {
            this._textures.setValue(t, e);
          }),
          (e.prototype.getBindedTextures = function () {
            return this._textures;
          }),
          (e.prototype.setClippingMaskBufferSize = function (t) {
            this._clippingManager.release(),
              (this._clippingManager = void 0),
              (this._clippingManager = null),
              (this._clippingManager = new n()),
              this._clippingManager.setClippingMaskBufferSize(t),
              this._clippingManager.initialize(
                this.getModel(),
                this.getModel().getDrawableCount(),
                this.getModel().getDrawableMasks(),
                this.getModel().getDrawableMaskCounts(),
              );
          }),
          (e.prototype.getClippingMaskBufferSize = function () {
            return this._clippingManager.getClippingMaskBufferSize();
          }),
          (e.prototype.release = function () {
            this._clippingManager.release(),
              (this._clippingManager = void 0),
              (this._clippingManager = null),
              this.gl.deleteBuffer(this._bufferData.vertex),
              (this._bufferData.vertex = null),
              this.gl.deleteBuffer(this._bufferData.uv),
              (this._bufferData.uv = null),
              this.gl.deleteBuffer(this._bufferData.index),
              (this._bufferData.index = null),
              (this._bufferData = null),
              (this._textures = null);
          }),
          (e.prototype.doDrawModel = function () {
            null != this._clippingManager &&
              (this.preDraw(),
              this._clippingManager.setupClippingContext(
                this.getModel(),
                this,
              )),
              this.preDraw();
            for (
              var t = this.getModel().getDrawableCount(),
                e = this.getModel().getDrawableRenderOrders(),
                i = 0;
              i < t;
              ++i
            ) {
              var r = e[i];
              this._sortedDrawableIndexList.set(r, i);
            }
            for (i = 0; i < t; ++i) {
              var n = this._sortedDrawableIndexList.at(i);
              this.getModel().getDrawableDynamicFlagIsVisible(n) &&
                (this.setClippingContextBufferForDraw(
                  null != this._clippingManager
                    ? this._clippingManager
                        .getClippingContextListForDraw()
                        .at(n)
                    : null,
                ),
                this.setIsCulling(this.getModel().getDrawableCulling(n)),
                this.drawMesh(
                  this.getModel().getDrawableTextureIndices(n),
                  this.getModel().getDrawableVertexIndexCount(n),
                  this.getModel().getDrawableVertexCount(n),
                  this.getModel().getDrawableVertexIndices(n),
                  this.getModel().getDrawableVertices(n),
                  this.getModel().getDrawableVertexUvs(n),
                  this.getModel().getDrawableOpacity(n),
                  this.getModel().getDrawableBlendMode(n),
                  this.getModel().getDrawableInvertedMaskBit(n),
                ));
            }
          }),
          (e.prototype.drawMesh = function (t, e, i, r, n, o, a, s, l) {
            this.isCulling()
              ? this.gl.enable(this.gl.CULL_FACE)
              : this.gl.disable(this.gl.CULL_FACE),
              this.gl.frontFace(this.gl.CCW);
            var h,
              p = this.getModelColor();
            null == this.getClippingContextBufferForMask() &&
              ((p.A *= a),
              this.isPremultipliedAlpha() &&
                ((p.R *= p.A), (p.G *= p.A), (p.B *= p.A))),
              (h =
                null != this._textures.getValue(t)
                  ? this._textures.getValue(t)
                  : null),
              u
                .getInstance()
                .setupShaderProgram(
                  this,
                  h,
                  i,
                  n,
                  r,
                  o,
                  this._bufferData,
                  a,
                  s,
                  p,
                  this.isPremultipliedAlpha(),
                  this.getMvpMatrix(),
                  l,
                ),
              this.gl.drawElements(
                this.gl.TRIANGLES,
                e,
                this.gl.UNSIGNED_SHORT,
                0,
              ),
              this.gl.useProgram(null),
              this.setClippingContextBufferForDraw(null),
              this.setClippingContextBufferForMask(null);
          }),
          (e.doStaticRelease = function () {
            u.deleteInstance();
          }),
          (e.prototype.setRenderState = function (t, e) {
            (r = t), (i = e);
          }),
          (e.prototype.preDraw = function () {
            this.firstDraw &&
              ((this.firstDraw = !1),
              (this._anisortopy =
                this.gl.getExtension("EXT_texture_filter_anisotropic") ||
                this.gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") ||
                this.gl.getExtension("MOZ_EXT_texture_filter_anisotropic"))),
              this.gl.disable(this.gl.SCISSOR_TEST),
              this.gl.disable(this.gl.STENCIL_TEST),
              this.gl.disable(this.gl.DEPTH_TEST),
              this.gl.frontFace(this.gl.CW),
              this.gl.enable(this.gl.BLEND),
              this.gl.colorMask(!0, !0, !0, !0),
              this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null),
              this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
          }),
          (e.prototype.setClippingContextBufferForMask = function (t) {
            this._clippingContextBufferForMask = t;
          }),
          (e.prototype.getClippingContextBufferForMask = function () {
            return this._clippingContextBufferForMask;
          }),
          (e.prototype.setClippingContextBufferForDraw = function (t) {
            this._clippingContextBufferForDraw = t;
          }),
          (e.prototype.getClippingContextBufferForDraw = function () {
            return this._clippingContextBufferForDraw;
          }),
          (e.prototype.startUp = function (t) {
            (this.gl = t),
              this._clippingManager.setGL(t),
              u.getInstance().setGl(t);
          }),
          e
        );
      })(Ae);
      (t.CubismRenderer_WebGL = p),
        (Ae.staticRelease = function () {
          p.doStaticRelease();
        });
    })(Ie || (Ie = {}));
    var Ne,
      Oe,
      Ue = Ie.CubismRenderer_WebGL,
      ze = Me.CubismEyeBlink,
      je = de.CubismBreath,
      Xe = w.Constant,
      Ge = ce.CubismPhysics,
      qe = ee.CubismModelUserData,
      Ye = Wt.CubismPose,
      He = jt.CubismExpressionMotion,
      We = It.CubismMotion,
      Je = St.CubismMoc,
      Ke = gt.CubismModelMatrix,
      Ze = ht.CubismTargetPoint,
      Qe = st.CubismMotionManager;
    !(function (t) {
      var e = (function () {
        function t() {
          (this.loadMotion = function (t, e, i, r) {
            return We.create(t, e, r);
          }),
            (this._moc = null),
            (this._model = null),
            (this._motionManager = null),
            (this._beatMotionManager = null),
            (this._atrialBeatMotionManager = null),
            (this._breathMotionManager = null),
            (this._expressionManager = null),
            (this._eyeBlink = null),
            (this._breath = null),
            (this._modelMatrix = null),
            (this._pose = null),
            (this._dragManager = null),
            (this._physics = null),
            (this._modelUserData = null),
            (this._initialized = !1),
            (this._updating = !1),
            (this._opacity = 1),
            (this._lipsync = !0),
            (this._lastLipSyncValue = 0),
            (this._dragX = 0),
            (this._dragY = 0),
            (this._accelerationX = 0),
            (this._accelerationY = 0),
            (this._accelerationZ = 0),
            (this._debugMode = !1),
            (this._renderer = null),
            (this._motionManager = new Qe()),
            this._motionManager.setEventCallback(
              t.cubismDefaultMotionEventCallback,
              this,
            ),
            (this._breathMotionManager = new Qe()),
            this._breathMotionManager.setEventCallback(
              t.cubismDefaultMotionEventCallback,
              this,
            ),
            (this._beatMotionManager = new Qe()),
            this._beatMotionManager.setEventCallback(
              t.cubismDefaultMotionEventCallback,
              this,
            ),
            (this._atrialBeatMotionManager = new Qe()),
            this._atrialBeatMotionManager.setEventCallback(
              t.cubismDefaultMotionEventCallback,
              this,
            ),
            (this._expressionManager = new Qe()),
            (this._dragManager = new Ze());
        }
        return (
          (t.prototype.isInitialized = function () {
            return this._initialized;
          }),
          (t.prototype.setInitialized = function (t) {
            this._initialized = t;
          }),
          (t.prototype.isUpdating = function () {
            return this._updating;
          }),
          (t.prototype.setUpdating = function (t) {
            this._updating = t;
          }),
          (t.prototype.setDragging = function (t, e) {
            this._dragManager.set(t, e);
          }),
          (t.prototype.setAcceleration = function (t, e, i) {
            (this._accelerationX = t),
              (this._accelerationY = e),
              (this._accelerationZ = i);
          }),
          (t.prototype.getModelMatrix = function () {
            return this._modelMatrix;
          }),
          (t.prototype.setOpacity = function (t) {
            this._opacity = t;
          }),
          (t.prototype.getOpacity = function () {
            return this._opacity;
          }),
          (t.prototype.loadModel = function (t) {
            (this._moc = Je.create(t)),
              (this._model = this._moc.createModel()),
              this._model.saveParameters(),
              null != this._moc && null != this._model
                ? (this._modelMatrix = new Ke(
                    this._model.getCanvasWidth(),
                    this._model.getCanvasHeight(),
                  ))
                : s("Failed to CreateModel().");
          }),
          (t.prototype.loadExpression = function (t, e, i) {
            return He.create(t, e);
          }),
          (t.prototype.loadPose = function (t, e) {
            this._pose = Ye.create(t, e);
          }),
          (t.prototype.loadUserData = function (t, e) {
            this._modelUserData = qe.create(t, e);
          }),
          (t.prototype.loadPhysics = function (t, e) {
            this._physics = Ge.create(t, e);
          }),
          (t.prototype.isHit = function (t, e, i) {
            var r = this._model.getDrawableIndex(t);
            if (r < 0) return !1;
            for (
              var n = this._model.getDrawableVertexCount(r),
                o = this._model.getDrawableVertices(r),
                a = o[0],
                s = o[0],
                u = o[1],
                l = o[1],
                h = 1;
              h < n;
              ++h
            ) {
              var p = o[Xe.vertexOffset + h * Xe.vertexStep],
                g = o[Xe.vertexOffset + h * Xe.vertexStep + 1];
              p < a && (a = p),
                p > s && (s = p),
                g < u && (u = g),
                g > l && (l = g);
            }
            var c = this._modelMatrix.invertTransformX(e),
              d = this._modelMatrix.invertTransformY(i);
            return a <= c && c <= s && u <= d && d <= l;
          }),
          (t.prototype.getModel = function () {
            return this._model;
          }),
          (t.prototype.getRenderer = function () {
            return this._renderer;
          }),
          (t.prototype.createRenderer = function () {
            this._renderer && this.deleteRenderer(),
              (this._renderer = new Ue()),
              this._renderer.initialize(this._model);
          }),
          (t.prototype.deleteRenderer = function () {
            null != this._renderer &&
              (this._renderer.release(), (this._renderer = null));
          }),
          (t.prototype.motionEventFired = function (t) {
            o("{0}", t.s);
          }),
          (t.cubismDefaultMotionEventCallback = function (t, e, i) {
            null != i && i.motionEventFired(e);
          }),
          (t.prototype.release = function () {
            null != this._motionManager &&
              (this._motionManager.release(), (this._motionManager = null)),
              null != this._expressionManager &&
                (this._expressionManager.release(),
                (this._expressionManager = null)),
              null != this._moc &&
                (this._moc.deleteModel(this._model),
                this._moc.release(),
                (this._moc = null)),
              (this._modelMatrix = null),
              Ye.delete(this._pose),
              ze.delete(this._eyeBlink),
              je.delete(this._breath),
              (this._dragManager = null),
              Ge.delete(this._physics),
              qe.delete(this._modelUserData),
              this.deleteRenderer();
          }),
          t
        );
      })();
      t.CubismUserModel = e;
    })(Ne || (Ne = {})),
      (function (t) {
        var e = (function () {
          return function () {};
        })();
        t.ICubismModelSetting = e;
      })(Oe || (Oe = {}));
    var $e,
      ti,
      ei,
      ii = (function () {
        var t = function (e, i) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(e, i);
        };
        return function (e, i) {
          function r() {
            this.constructor = e;
          }
          t(e, i),
            (e.prototype =
              null === i
                ? Object.create(i)
                : ((r.prototype = i.prototype), new r()));
        };
      })(),
      ri = g.csmVector,
      ni = w.CubismFramework,
      oi = m.CubismJson,
      ai = Oe.ICubismModelSetting;
    !(function (t) {
      var e,
        i = "FileReferences",
        r = "Groups",
        n = "HitAreas",
        o = "Moc",
        a = "Textures",
        s = "Physics",
        u = "Pose",
        l = "Expressions",
        h = "Motions",
        p = "Name";
      !(function (t) {
        (t[(t.FrequestNode_Groups = 0)] = "FrequestNode_Groups"),
          (t[(t.FrequestNode_Moc = 1)] = "FrequestNode_Moc"),
          (t[(t.FrequestNode_Motions = 2)] = "FrequestNode_Motions"),
          (t[(t.FrequestNode_Expressions = 3)] = "FrequestNode_Expressions"),
          (t[(t.FrequestNode_Textures = 4)] = "FrequestNode_Textures"),
          (t[(t.FrequestNode_Physics = 5)] = "FrequestNode_Physics"),
          (t[(t.FrequestNode_Pose = 6)] = "FrequestNode_Pose"),
          (t[(t.FrequestNode_HitAreas = 7)] = "FrequestNode_HitAreas");
      })(e || (e = {}));
      var g = (function (t) {
        function g(e, p) {
          var g = t.call(this) || this;
          return (
            (g._json = oi.create(e, p)),
            g._json &&
              ((g._jsonValue = new ri()),
              g._jsonValue.pushBack(g._json.getRoot().getValueByString(r)),
              g._jsonValue.pushBack(
                g._json.getRoot().getValueByString(i).getValueByString(o),
              ),
              g._jsonValue.pushBack(
                g._json.getRoot().getValueByString(i).getValueByString(h),
              ),
              g._jsonValue.pushBack(
                g._json.getRoot().getValueByString(i).getValueByString(l),
              ),
              g._jsonValue.pushBack(
                g._json.getRoot().getValueByString(i).getValueByString(a),
              ),
              g._jsonValue.pushBack(
                g._json.getRoot().getValueByString(i).getValueByString(s),
              ),
              g._jsonValue.pushBack(
                g._json.getRoot().getValueByString(i).getValueByString(u),
              ),
              g._jsonValue.pushBack(g._json.getRoot().getValueByString(n))),
            g
          );
        }
        return (
          ii(g, t),
          (g.prototype.release = function () {
            oi.delete(this._json), (this._jsonValue = null);
          }),
          (g.prototype.GetJson = function () {
            return this._json;
          }),
          (g.prototype.getModelFileName = function () {
            return this.isExistModelFile()
              ? this._jsonValue.at(e.FrequestNode_Moc).getRawString()
              : "";
          }),
          (g.prototype.getTextureCount = function () {
            return this.isExistTextureFiles()
              ? this._jsonValue.at(e.FrequestNode_Textures).getSize()
              : 0;
          }),
          (g.prototype.getTextureDirectory = function () {
            return this._jsonValue.at(e.FrequestNode_Textures).getRawString();
          }),
          (g.prototype.getTextureFileName = function (t) {
            return this._jsonValue
              .at(e.FrequestNode_Textures)
              .getValueByIndex(t)
              .getRawString();
          }),
          (g.prototype.getHitAreasCount = function () {
            return this.isExistHitAreas()
              ? this._jsonValue.at(e.FrequestNode_HitAreas).getSize()
              : 0;
          }),
          (g.prototype.getHitAreaId = function (t) {
            return ni
              .getIdManager()
              .getId(
                this._jsonValue
                  .at(e.FrequestNode_HitAreas)
                  .getValueByIndex(t)
                  .getValueByString("Id")
                  .getRawString(),
              );
          }),
          (g.prototype.getHitAreaName = function (t) {
            return this._jsonValue
              .at(e.FrequestNode_HitAreas)
              .getValueByIndex(t)
              .getValueByString(p)
              .getRawString();
          }),
          (g.prototype.getPhysicsFileName = function () {
            return this.isExistPhysicsFile()
              ? this._jsonValue.at(e.FrequestNode_Physics).getRawString()
              : "";
          }),
          (g.prototype.getPoseFileName = function () {
            return this.isExistPoseFile()
              ? this._jsonValue.at(e.FrequestNode_Pose).getRawString()
              : "";
          }),
          (g.prototype.getExpressionCount = function () {
            return this.isExistExpressionFile()
              ? this._jsonValue.at(e.FrequestNode_Expressions).getSize()
              : 0;
          }),
          (g.prototype.getExpressionName = function (t) {
            return this._jsonValue
              .at(e.FrequestNode_Expressions)
              .getValueByIndex(t)
              .getValueByString(p)
              .getRawString();
          }),
          (g.prototype.getExpressionFileName = function (t) {
            return this._jsonValue
              .at(e.FrequestNode_Expressions)
              .getValueByIndex(t)
              .getValueByString("File")
              .getRawString();
          }),
          (g.prototype.getMotionGroupCount = function () {
            return this.isExistMotionGroups()
              ? this._jsonValue.at(e.FrequestNode_Motions).getKeys().getSize()
              : 0;
          }),
          (g.prototype.getMotionGroupName = function (t) {
            return this.isExistMotionGroups()
              ? this._jsonValue.at(e.FrequestNode_Motions).getKeys().at(t)
              : null;
          }),
          (g.prototype.getMotionCount = function (t) {
            return this.isExistMotionGroupName(t)
              ? this._jsonValue
                  .at(e.FrequestNode_Motions)
                  .getValueByString(t)
                  .getSize()
              : 0;
          }),
          (g.prototype.getMotionFileName = function (t, i) {
            return this.isExistMotionGroupName(t)
              ? this._jsonValue
                  .at(e.FrequestNode_Motions)
                  .getValueByString(t)
                  .getValueByIndex(i)
                  .getValueByString("File")
                  .getRawString()
              : "";
          }),
          (g.prototype.getMotionSoundFileName = function (t, i) {
            return this.isExistMotionSoundFile(t, i)
              ? this._jsonValue
                  .at(e.FrequestNode_Motions)
                  .getValueByString(t)
                  .getValueByIndex(i)
                  .getValueByString("Sound")
                  .getRawString()
              : "";
          }),
          (g.prototype.getMotionFadeInTimeValue = function (t, i) {
            return this.isExistMotionFadeIn(t, i)
              ? this._jsonValue
                  .at(e.FrequestNode_Motions)
                  .getValueByString(t)
                  .getValueByIndex(i)
                  .getValueByString("FadeInTime")
                  .toFloat()
              : -1;
          }),
          (g.prototype.getMotionFadeOutTimeValue = function (t, i) {
            return this.isExistMotionFadeOut(t, i)
              ? this._jsonValue
                  .at(e.FrequestNode_Motions)
                  .getValueByString(t)
                  .getValueByIndex(i)
                  .getValueByString("FadeOutTime")
                  .toFloat()
              : -1;
          }),
          (g.prototype.getUserDataFile = function () {
            return this.isExistUserDataFile()
              ? this._json
                  .getRoot()
                  .getValueByString(i)
                  .getValueByString("UserData")
                  .getRawString()
              : "";
          }),
          (g.prototype.getLayoutMap = function (t) {
            var e = this._json.getRoot().getValueByString("Layout").getMap();
            if (null == e) return !1;
            for (
              var i = !1, r = e.begin();
              r.notEqual(e.end());
              r.preIncrement()
            )
              t.setValue(r.ptr().first, r.ptr().second.toFloat()), (i = !0);
            return i;
          }),
          (g.prototype.getEyeBlinkParameterCount = function () {
            if (!this.isExistEyeBlinkParameters()) return 0;
            for (
              var t = 0, i = 0;
              i < this._jsonValue.at(e.FrequestNode_Groups).getSize();
              i++
            ) {
              var r = this._jsonValue
                .at(e.FrequestNode_Groups)
                .getValueByIndex(i);
              if (
                !r.isNull() &&
                !r.isError() &&
                "EyeBlink" == r.getValueByString(p).getRawString()
              ) {
                t = r.getValueByString("Ids").getVector().getSize();
                break;
              }
            }
            return t;
          }),
          (g.prototype.getEyeBlinkParameterId = function (t) {
            if (!this.isExistEyeBlinkParameters()) return null;
            for (
              var i = 0;
              i < this._jsonValue.at(e.FrequestNode_Groups).getSize();
              i++
            ) {
              var r = this._jsonValue
                .at(e.FrequestNode_Groups)
                .getValueByIndex(i);
              if (
                !r.isNull() &&
                !r.isError() &&
                "EyeBlink" == r.getValueByString(p).getRawString()
              )
                return ni
                  .getIdManager()
                  .getId(
                    r.getValueByString("Ids").getValueByIndex(t).getRawString(),
                  );
            }
            return null;
          }),
          (g.prototype.getLipSyncParameterCount = function () {
            if (!this.isExistLipSyncParameters()) return 0;
            for (
              var t = 0, i = 0;
              i < this._jsonValue.at(e.FrequestNode_Groups).getSize();
              i++
            ) {
              var r = this._jsonValue
                .at(e.FrequestNode_Groups)
                .getValueByIndex(i);
              if (
                !r.isNull() &&
                !r.isError() &&
                "LipSync" == r.getValueByString(p).getRawString()
              ) {
                t = r.getValueByString("Ids").getVector().getSize();
                break;
              }
            }
            return t;
          }),
          (g.prototype.getLipSyncParameterId = function (t) {
            if (!this.isExistLipSyncParameters()) return null;
            for (
              var i = 0;
              i < this._jsonValue.at(e.FrequestNode_Groups).getSize();
              i++
            ) {
              var r = this._jsonValue
                .at(e.FrequestNode_Groups)
                .getValueByIndex(i);
              if (
                !r.isNull() &&
                !r.isError() &&
                "LipSync" == r.getValueByString(p).getRawString()
              )
                return ni
                  .getIdManager()
                  .getId(
                    r.getValueByString("Ids").getValueByIndex(t).getRawString(),
                  );
            }
            return null;
          }),
          (g.prototype.isExistModelFile = function () {
            var t = this._jsonValue.at(e.FrequestNode_Moc);
            return !t.isNull() && !t.isError();
          }),
          (g.prototype.isExistTextureFiles = function () {
            var t = this._jsonValue.at(e.FrequestNode_Textures);
            return !t.isNull() && !t.isError();
          }),
          (g.prototype.isExistHitAreas = function () {
            var t = this._jsonValue.at(e.FrequestNode_HitAreas);
            return !t.isNull() && !t.isError();
          }),
          (g.prototype.isExistPhysicsFile = function () {
            var t = this._jsonValue.at(e.FrequestNode_Physics);
            return !t.isNull() && !t.isError();
          }),
          (g.prototype.isExistPoseFile = function () {
            var t = this._jsonValue.at(e.FrequestNode_Pose);
            return !t.isNull() && !t.isError();
          }),
          (g.prototype.isExistExpressionFile = function () {
            var t = this._jsonValue.at(e.FrequestNode_Expressions);
            return !t.isNull() && !t.isError();
          }),
          (g.prototype.isExistMotionGroups = function () {
            var t = this._jsonValue.at(e.FrequestNode_Motions);
            return !t.isNull() && !t.isError();
          }),
          (g.prototype.isExistMotionGroupName = function (t) {
            var i = this._jsonValue
              .at(e.FrequestNode_Motions)
              .getValueByString(t);
            return !i.isNull() && !i.isError();
          }),
          (g.prototype.isExistMotionSoundFile = function (t, i) {
            var r = this._jsonValue
              .at(e.FrequestNode_Motions)
              .getValueByString(t)
              .getValueByIndex(i)
              .getValueByString("Sound");
            return !r.isNull() && !r.isError();
          }),
          (g.prototype.isExistMotionFadeIn = function (t, i) {
            var r = this._jsonValue
              .at(e.FrequestNode_Motions)
              .getValueByString(t)
              .getValueByIndex(i)
              .getValueByString("FadeInTime");
            return !r.isNull() && !r.isError();
          }),
          (g.prototype.isExistMotionFadeOut = function (t, i) {
            var r = this._jsonValue
              .at(e.FrequestNode_Motions)
              .getValueByString(t)
              .getValueByIndex(i)
              .getValueByString("FadeOutTime");
            return !r.isNull() && !r.isError();
          }),
          (g.prototype.isExistUserDataFile = function () {
            var t = this._json
              .getRoot()
              .getValueByString(i)
              .getValueByString("UserData");
            return !t.isNull() && !t.isError();
          }),
          (g.prototype.isExistEyeBlinkParameters = function () {
            if (
              this._jsonValue.at(e.FrequestNode_Groups).isNull() ||
              this._jsonValue.at(e.FrequestNode_Groups).isError()
            )
              return !1;
            for (
              var t = 0;
              t < this._jsonValue.at(e.FrequestNode_Groups).getSize();
              ++t
            )
              if (
                "EyeBlink" ==
                this._jsonValue
                  .at(e.FrequestNode_Groups)
                  .getValueByIndex(t)
                  .getValueByString(p)
                  .getRawString()
              )
                return !0;
            return !1;
          }),
          (g.prototype.isExistLipSyncParameters = function () {
            if (
              this._jsonValue.at(e.FrequestNode_Groups).isNull() ||
              this._jsonValue.at(e.FrequestNode_Groups).isError()
            )
              return !1;
            for (
              var t = 0;
              t < this._jsonValue.at(e.FrequestNode_Groups).getSize();
              ++t
            )
              if (
                "LipSync" ==
                this._jsonValue
                  .at(e.FrequestNode_Groups)
                  .getValueByIndex(t)
                  .getValueByString(p)
                  .getRawString()
              )
                return !0;
            return !1;
          }),
          g
        );
      })(ai);
      t.CubismModelSettingJson = g;
    })($e || ($e = {})),
      (function (t) {
        (t.HitAreaPrefix = "HitArea"),
          (t.HitAreaHead = "Head"),
          (t.HitAreaBody = "Body"),
          (t.PartsIdCore = "Parts01Core"),
          (t.PartsArmPrefix = "Parts01Arm_"),
          (t.PartsArmLPrefix = "Parts01ArmL_"),
          (t.PartsArmRPrefix = "Parts01ArmR_"),
          (t.ParamAngleX = "ParamAngleX"),
          (t.ParamAngleY = "ParamAngleY"),
          (t.ParamAngleZ = "ParamAngleZ"),
          (t.ParamEyeLOpen = "ParamEyeLOpen"),
          (t.ParamEyeLSmile = "ParamEyeLSmile"),
          (t.ParamEyeROpen = "ParamEyeROpen"),
          (t.ParamEyeRSmile = "ParamEyeRSmile"),
          (t.ParamEyeBallX = "ParamEyeBallX"),
          (t.ParamEyeBallY = "ParamEyeBallY"),
          (t.ParamEyeBallForm = "ParamEyeBallForm"),
          (t.ParamBrowLY = "ParamBrowLY"),
          (t.ParamBrowRY = "ParamBrowRY"),
          (t.ParamBrowLX = "ParamBrowLX"),
          (t.ParamBrowRX = "ParamBrowRX"),
          (t.ParamBrowLAngle = "ParamBrowLAngle"),
          (t.ParamBrowRAngle = "ParamBrowRAngle"),
          (t.ParamBrowLForm = "ParamBrowLForm"),
          (t.ParamBrowRForm = "ParamBrowRForm"),
          (t.ParamMouthForm = "ParamMouthForm"),
          (t.ParamMouthOpenY = "ParamMouthOpenY"),
          (t.ParamCheek = "ParamCheek"),
          (t.ParamBodyAngleX = "ParamBodyAngleX"),
          (t.ParamBodyAngleY = "ParamBodyAngleY"),
          (t.ParamBodyAngleZ = "ParamBodyAngleZ"),
          (t.ParamBreath = "ParamBreath"),
          (t.ParamArmLA = "ParamArmLA"),
          (t.ParamArmRA = "ParamArmRA"),
          (t.ParamArmLB = "ParamArmLB"),
          (t.ParamArmRB = "ParamArmRB"),
          (t.ParamHandL = "ParamHandL"),
          (t.ParamHandR = "ParamHandR"),
          (t.ParamHairFront = "ParamHairFront"),
          (t.ParamHairSide = "ParamHairSide"),
          (t.ParamHairBack = "ParamHairBack"),
          (t.ParamHairFluffy = "ParamHairFluffy"),
          (t.ParamShoulderY = "ParamShoulderY"),
          (t.ParamBustX = "ParamBustX"),
          (t.ParamBustY = "ParamBustY"),
          (t.ParamBaseX = "ParamBaseX"),
          (t.ParamBaseY = "ParamBaseY"),
          (t.ParamNONE = "NONE:");
      })(ti || (ti = {})),
      (function (t) {
        var e = (function () {
          function t() {}
          return (
            (t.getFormatedString = function (t) {
              for (var e = [], i = 1; i < arguments.length; i++)
                e[i - 1] = arguments[i];
              return t.replace(/\{(\d+)\}/g, function (t, i) {
                return e[i];
              });
            }),
            (t.isStartWith = function (t, e) {
              for (var i = 0, r = 0; "\0" != e[r]; )
                if ("\0" == t[i] || t[i++] != e[r++]) return !1;
              return !1;
            }),
            (t.stringToFloat = function (t, e, i, r) {
              var n = i,
                o = !1,
                a = !1,
                s = 0,
                u = parseInt(t[n]);
              for (u < 0 && ((o = !0), n++); n < e; n++) {
                var l = t[n];
                if (!(0 <= parseInt(l) && parseInt(l) <= 9)) {
                  if ("." == l) {
                    (a = !0), n++;
                    break;
                  }
                  break;
                }
                s = 10 * s + (parseInt(l) - 0);
              }
              if (a)
                for (
                  var h = 0.1;
                  n < e &&
                  0 <= (u = 255 & parseFloat(t[n])) &&
                  u <= 9 &&
                  ((s += h * (u - 0)), (h *= 0.1), u);
                  n++
                );
              return n == i ? ((r[0] = -1), 0) : (o && (s = -s), (r[0] = n), s);
            }),
            t
          );
        })();
        t.CubismString = e;
      })(ei || (ei = {}));
    var si = {
      searchParams: "URLSearchParams" in self,
      iterable: "Symbol" in self && "iterator" in Symbol,
      blob:
        "FileReader" in self &&
        "Blob" in self &&
        (function () {
          try {
            return new Blob(), !0;
          } catch (t) {
            return !1;
          }
        })(),
      formData: "FormData" in self,
      arrayBuffer: "ArrayBuffer" in self,
    };
    if (si.arrayBuffer)
      var ui = [
          "[object Int8Array]",
          "[object Uint8Array]",
          "[object Uint8ClampedArray]",
          "[object Int16Array]",
          "[object Uint16Array]",
          "[object Int32Array]",
          "[object Uint32Array]",
          "[object Float32Array]",
          "[object Float64Array]",
        ],
        li =
          ArrayBuffer.isView ||
          function (t) {
            return t && ui.indexOf(Object.prototype.toString.call(t)) > -1;
          };
    function hi(t) {
      if (
        ("string" != typeof t && (t = String(t)),
        /[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))
      )
        throw new TypeError("Invalid character in header field name");
      return t.toLowerCase();
    }
    function pi(t) {
      return "string" != typeof t && (t = String(t)), t;
    }
    function gi(t) {
      var e = {
        next: function () {
          var e = t.shift();
          return { done: void 0 === e, value: e };
        },
      };
      return (
        si.iterable &&
          (e[Symbol.iterator] = function () {
            return e;
          }),
        e
      );
    }
    function ci(t) {
      (this.map = {}),
        t instanceof ci
          ? t.forEach(function (t, e) {
              this.append(e, t);
            }, this)
          : Array.isArray(t)
            ? t.forEach(function (t) {
                this.append(t[0], t[1]);
              }, this)
            : t &&
              Object.getOwnPropertyNames(t).forEach(function (e) {
                this.append(e, t[e]);
              }, this);
    }
    function di(t) {
      if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
      t.bodyUsed = !0;
    }
    function _i(t) {
      return new Promise(function (e, i) {
        (t.onload = function () {
          e(t.result);
        }),
          (t.onerror = function () {
            i(t.error);
          });
      });
    }
    function mi(t) {
      var e = new FileReader(),
        i = _i(e);
      return e.readAsArrayBuffer(t), i;
    }
    function fi(t) {
      if (t.slice) return t.slice(0);
      var e = new Uint8Array(t.byteLength);
      return e.set(new Uint8Array(t)), e.buffer;
    }
    function yi() {
      return (
        (this.bodyUsed = !1),
        (this._initBody = function (t) {
          var e;
          (this._bodyInit = t),
            t
              ? "string" == typeof t
                ? (this._bodyText = t)
                : si.blob && Blob.prototype.isPrototypeOf(t)
                  ? (this._bodyBlob = t)
                  : si.formData && FormData.prototype.isPrototypeOf(t)
                    ? (this._bodyFormData = t)
                    : si.searchParams &&
                        URLSearchParams.prototype.isPrototypeOf(t)
                      ? (this._bodyText = t.toString())
                      : si.arrayBuffer &&
                          si.blob &&
                          (e = t) &&
                          DataView.prototype.isPrototypeOf(e)
                        ? ((this._bodyArrayBuffer = fi(t.buffer)),
                          (this._bodyInit = new Blob([this._bodyArrayBuffer])))
                        : si.arrayBuffer &&
                            (ArrayBuffer.prototype.isPrototypeOf(t) || li(t))
                          ? (this._bodyArrayBuffer = fi(t))
                          : (this._bodyText = t =
                              Object.prototype.toString.call(t))
              : (this._bodyText = ""),
            this.headers.get("content-type") ||
              ("string" == typeof t
                ? this.headers.set("content-type", "text/plain;charset=UTF-8")
                : this._bodyBlob && this._bodyBlob.type
                  ? this.headers.set("content-type", this._bodyBlob.type)
                  : si.searchParams &&
                    URLSearchParams.prototype.isPrototypeOf(t) &&
                    this.headers.set(
                      "content-type",
                      "application/x-www-form-urlencoded;charset=UTF-8",
                    ));
        }),
        si.blob &&
          ((this.blob = function () {
            var t = di(this);
            if (t) return t;
            if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
            if (this._bodyArrayBuffer)
              return Promise.resolve(new Blob([this._bodyArrayBuffer]));
            if (this._bodyFormData)
              throw new Error("could not read FormData body as blob");
            return Promise.resolve(new Blob([this._bodyText]));
          }),
          (this.arrayBuffer = function () {
            return this._bodyArrayBuffer
              ? di(this) || Promise.resolve(this._bodyArrayBuffer)
              : this.blob().then(mi);
          })),
        (this.text = function () {
          var t,
            e,
            i,
            r = di(this);
          if (r) return r;
          if (this._bodyBlob)
            return (
              (t = this._bodyBlob),
              (e = new FileReader()),
              (i = _i(e)),
              e.readAsText(t),
              i
            );
          if (this._bodyArrayBuffer)
            return Promise.resolve(
              (function (t) {
                for (
                  var e = new Uint8Array(t), i = new Array(e.length), r = 0;
                  r < e.length;
                  r++
                )
                  i[r] = String.fromCharCode(e[r]);
                return i.join("");
              })(this._bodyArrayBuffer),
            );
          if (this._bodyFormData)
            throw new Error("could not read FormData body as text");
          return Promise.resolve(this._bodyText);
        }),
        si.formData &&
          (this.formData = function () {
            return this.text().then(xi);
          }),
        (this.json = function () {
          return this.text().then(JSON.parse);
        }),
        this
      );
    }
    (ci.prototype.append = function (t, e) {
      (t = hi(t)), (e = pi(e));
      var i = this.map[t];
      this.map[t] = i ? i + ", " + e : e;
    }),
      (ci.prototype.delete = function (t) {
        delete this.map[hi(t)];
      }),
      (ci.prototype.get = function (t) {
        return (t = hi(t)), this.has(t) ? this.map[t] : null;
      }),
      (ci.prototype.has = function (t) {
        return this.map.hasOwnProperty(hi(t));
      }),
      (ci.prototype.set = function (t, e) {
        this.map[hi(t)] = pi(e);
      }),
      (ci.prototype.forEach = function (t, e) {
        for (var i in this.map)
          this.map.hasOwnProperty(i) && t.call(e, this.map[i], i, this);
      }),
      (ci.prototype.keys = function () {
        var t = [];
        return (
          this.forEach(function (e, i) {
            t.push(i);
          }),
          gi(t)
        );
      }),
      (ci.prototype.values = function () {
        var t = [];
        return (
          this.forEach(function (e) {
            t.push(e);
          }),
          gi(t)
        );
      }),
      (ci.prototype.entries = function () {
        var t = [];
        return (
          this.forEach(function (e, i) {
            t.push([i, e]);
          }),
          gi(t)
        );
      }),
      si.iterable && (ci.prototype[Symbol.iterator] = ci.prototype.entries);
    var vi = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
    function Si(t, e) {
      var i,
        r,
        n = (e = e || {}).body;
      if (t instanceof Si) {
        if (t.bodyUsed) throw new TypeError("Already read");
        (this.url = t.url),
          (this.credentials = t.credentials),
          e.headers || (this.headers = new ci(t.headers)),
          (this.method = t.method),
          (this.mode = t.mode),
          (this.signal = t.signal),
          n || null == t._bodyInit || ((n = t._bodyInit), (t.bodyUsed = !0));
      } else this.url = String(t);
      if (
        ((this.credentials =
          e.credentials || this.credentials || "same-origin"),
        (!e.headers && this.headers) || (this.headers = new ci(e.headers)),
        (this.method =
          ((i = e.method || this.method || "GET"),
          (r = i.toUpperCase()),
          vi.indexOf(r) > -1 ? r : i)),
        (this.mode = e.mode || this.mode || null),
        (this.signal = e.signal || this.signal),
        (this.referrer = null),
        ("GET" === this.method || "HEAD" === this.method) && n)
      )
        throw new TypeError("Body not allowed for GET or HEAD requests");
      this._initBody(n);
    }
    function xi(t) {
      var e = new FormData();
      return (
        t
          .trim()
          .split("&")
          .forEach(function (t) {
            if (t) {
              var i = t.split("="),
                r = i.shift().replace(/\+/g, " "),
                n = i.join("=").replace(/\+/g, " ");
              e.append(decodeURIComponent(r), decodeURIComponent(n));
            }
          }),
        e
      );
    }
    function Bi(t, e) {
      e || (e = {}),
        (this.type = "default"),
        (this.status = void 0 === e.status ? 200 : e.status),
        (this.ok = this.status >= 200 && this.status < 300),
        (this.statusText = "statusText" in e ? e.statusText : "OK"),
        (this.headers = new ci(e.headers)),
        (this.url = e.url || ""),
        this._initBody(t);
    }
    (Si.prototype.clone = function () {
      return new Si(this, { body: this._bodyInit });
    }),
      yi.call(Si.prototype),
      yi.call(Bi.prototype),
      (Bi.prototype.clone = function () {
        return new Bi(this._bodyInit, {
          status: this.status,
          statusText: this.statusText,
          headers: new ci(this.headers),
          url: this.url,
        });
      }),
      (Bi.error = function () {
        var t = new Bi(null, { status: 0, statusText: "" });
        return (t.type = "error"), t;
      });
    var Ci = [301, 302, 303, 307, 308];
    Bi.redirect = function (t, e) {
      if (-1 === Ci.indexOf(e)) throw new RangeError("Invalid status code");
      return new Bi(null, { status: e, headers: { location: t } });
    };
    var bi = self.DOMException;
    try {
      new bi();
    } catch (t) {
      ((bi = function (t, e) {
        (this.message = t), (this.name = e);
        var i = Error(t);
        this.stack = i.stack;
      }).prototype = Object.create(Error.prototype)),
        (bi.prototype.constructor = bi);
    }
    function Mi(t, e) {
      return new Promise(function (i, r) {
        var n = new Si(t, e);
        if (n.signal && n.signal.aborted)
          return r(new bi("Aborted", "AbortError"));
        var o = new XMLHttpRequest();
        function a() {
          o.abort();
        }
        (o.onload = function () {
          var t,
            e,
            r = {
              status: o.status,
              statusText: o.statusText,
              headers:
                ((t = o.getAllResponseHeaders() || ""),
                (e = new ci()),
                t
                  .replace(/\r?\n[\t ]+/g, " ")
                  .split(/\r?\n/)
                  .forEach(function (t) {
                    var i = t.split(":"),
                      r = i.shift().trim();
                    if (r) {
                      var n = i.join(":").trim();
                      e.append(r, n);
                    }
                  }),
                e),
            };
          r.url =
            "responseURL" in o ? o.responseURL : r.headers.get("X-Request-URL");
          var n = "response" in o ? o.response : o.responseText;
          i(new Bi(n, r));
        }),
          (o.onerror = function () {
            r(new TypeError("Network request failed"));
          }),
          (o.ontimeout = function () {
            r(new TypeError("Network request failed"));
          }),
          (o.onabort = function () {
            r(new bi("Aborted", "AbortError"));
          }),
          o.open(n.method, n.url, !0),
          "include" === n.credentials
            ? (o.withCredentials = !0)
            : "omit" === n.credentials && (o.withCredentials = !1),
          "responseType" in o && si.blob && (o.responseType = "blob"),
          n.headers.forEach(function (t, e) {
            o.setRequestHeader(e, t);
          }),
          n.signal &&
            (n.signal.addEventListener("abort", a),
            (o.onreadystatechange = function () {
              4 === o.readyState && n.signal.removeEventListener("abort", a);
            })),
          o.send(void 0 === n._bodyInit ? null : n._bodyInit);
      });
    }
    (Mi.polyfill = !0),
      self.fetch ||
        ((self.fetch = Mi),
        (self.Headers = ci),
        (self.Request = Si),
        (self.Response = Bi));
    var Pi,
      Vi = (function () {
        var t = function (e, i) {
          return (t =
            Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array &&
              function (t, e) {
                t.__proto__ = e;
              }) ||
            function (t, e) {
              for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
            })(e, i);
        };
        return function (e, i) {
          function r() {
            this.constructor = e;
          }
          t(e, i),
            (e.prototype =
              null === i
                ? Object.create(i)
                : ((r.prototype = i.prototype), new r()));
        };
      })(),
      Ii = nt.InvalidMotionQueueEntryHandleValue,
      wi = ei.CubismString,
      Ti = p.csmMap,
      Ei = g.csmVector,
      Fi = de.CubismBreath,
      Li = de.BreathParameterData,
      Ri = Me.CubismEyeBlink,
      Ai = $.ACubismMotion,
      Di = w.CubismFramework,
      ki = Ne.CubismUserModel,
      Ni = $e.CubismModelSettingJson,
      Oi = ti;
    function Ui(t, e) {
      void 0 === e && (e = ""), H.releaseBytes(t);
    }
    !(function (t) {
      (t[(t.LoadAssets = 0)] = "LoadAssets"),
        (t[(t.LoadModel = 1)] = "LoadModel"),
        (t[(t.WaitLoadModel = 2)] = "WaitLoadModel"),
        (t[(t.LoadExpression = 3)] = "LoadExpression"),
        (t[(t.WaitLoadExpression = 4)] = "WaitLoadExpression"),
        (t[(t.LoadPhysics = 5)] = "LoadPhysics"),
        (t[(t.WaitLoadPhysics = 6)] = "WaitLoadPhysics"),
        (t[(t.LoadPose = 7)] = "LoadPose"),
        (t[(t.WaitLoadPose = 8)] = "WaitLoadPose"),
        (t[(t.SetupEyeBlink = 9)] = "SetupEyeBlink"),
        (t[(t.SetupBreath = 10)] = "SetupBreath"),
        (t[(t.LoadUserData = 11)] = "LoadUserData"),
        (t[(t.WaitLoadUserData = 12)] = "WaitLoadUserData"),
        (t[(t.SetupEyeBlinkIds = 13)] = "SetupEyeBlinkIds"),
        (t[(t.SetupLipSyncIds = 14)] = "SetupLipSyncIds"),
        (t[(t.SetupLayout = 15)] = "SetupLayout"),
        (t[(t.LoadMotion = 16)] = "LoadMotion"),
        (t[(t.WaitLoadMotion = 17)] = "WaitLoadMotion"),
        (t[(t.CompleteInitialize = 18)] = "CompleteInitialize"),
        (t[(t.CompleteSetupModel = 19)] = "CompleteSetupModel"),
        (t[(t.LoadTexture = 20)] = "LoadTexture"),
        (t[(t.WaitLoadTexture = 21)] = "WaitLoadTexture"),
        (t[(t.CompleteSetup = 22)] = "CompleteSetup");
    })(Pi || (Pi = {}));
    var zi,
      ji = (function (t) {
        function e(e, i) {
          var r = t.call(this) || this;
          return (
            (r.lappdelegate = e),
            (r.pm = i),
            (r._modelSetting = null),
            (r._modelHomeDir = null),
            (r._userTimeSeconds = 0),
            (r._eyeBlinkIds = new Ei()),
            (r._lipSyncIds = new Ei()),
            (r._motions = new Ti()),
            (r._expressions = new Ti()),
            (r._hitArea = new Ei()),
            (r._userArea = new Ei()),
            (r._idParamAngleX = Di.getIdManager().getId(Oi.ParamAngleX)),
            (r._idParamAngleY = Di.getIdManager().getId(Oi.ParamAngleY)),
            (r._idParamAngleZ = Di.getIdManager().getId(Oi.ParamAngleZ)),
            (r._idParamEyeBallX = Di.getIdManager().getId(Oi.ParamEyeBallX)),
            (r._idParamEyeBallY = Di.getIdManager().getId(Oi.ParamEyeBallY)),
            (r._idParamBodyAngleX = Di.getIdManager().getId(
              Oi.ParamBodyAngleX,
            )),
            (r._state = Pi.LoadAssets),
            (r._expressionCount = 0),
            (r._textureCount = 0),
            (r._motionCount = 0),
            (r._allMotionCount = 0),
            r
          );
        }
        return (
          Vi(e, t),
          (e.prototype.loadAssets = function (t, e) {
            var i = this;
            (this._modelHomeDir = t),
              fetch(t + e)
                .then(function (t) {
                  return t.arrayBuffer();
                })
                .then(function (t) {
                  var e = t,
                    r = e.byteLength,
                    n = new Ni(e, r);
                  (i._state = Pi.LoadModel), i.setupModel(n);
                });
          }),
          (e.prototype.setupModel = function (t) {
            var e,
              i = this;
            if (
              ((this._updating = !0),
              (this._initialized = !1),
              (this._modelSetting = t),
              "" != this._modelSetting.getModelFileName())
            ) {
              var r = this._modelSetting.getModelFileName();
              (r = this._modelHomeDir + r),
                fetch(r)
                  .then(function (t) {
                    return t.arrayBuffer();
                  })
                  .then(function (t) {
                    (e = t),
                      i.loadModel(e),
                      Ui(e, r),
                      (i._state = Pi.LoadExpression),
                      n();
                  }),
                (this._state = Pi.WaitLoadModel);
            } else console.log("ModelData is not exist");
            var n = function () {
                if (i._modelSetting.getExpressionCount() > 0) {
                  for (
                    var t = i._modelSetting.getExpressionCount(),
                      e = function (e) {
                        var r = i._modelSetting.getExpressionName(e),
                          n = i._modelSetting.getExpressionFileName(e);
                        (n = i._modelHomeDir + n),
                          fetch(n)
                            .then(function (t) {
                              return t.arrayBuffer();
                            })
                            .then(function (e) {
                              var a = e,
                                s = a.byteLength,
                                u = i.loadExpression(a, s, r);
                              null != i._expressions.getValue(r) &&
                                (Ai.delete(i._expressions.getValue(r)),
                                i._expressions.setValue(r, null)),
                                i._expressions.setValue(r, u),
                                Ui(a, n),
                                i._expressionCount++,
                                i._expressionCount >= t &&
                                  ((i._state = Pi.LoadPhysics), o());
                            });
                      },
                      r = 0;
                    r < t;
                    r++
                  )
                    e(r);
                  i._state = Pi.WaitLoadExpression;
                } else (i._state = Pi.LoadPhysics), o();
              },
              o = function () {
                if ("" != i._modelSetting.getPhysicsFileName()) {
                  var t = i._modelSetting.getPhysicsFileName();
                  (t = i._modelHomeDir + t),
                    fetch(t)
                      .then(function (t) {
                        return t.arrayBuffer();
                      })
                      .then(function (e) {
                        var r = e,
                          n = r.byteLength;
                        i.loadPhysics(r, n),
                          Ui(r, t),
                          (i._state = Pi.LoadPose),
                          a();
                      }),
                    (i._state = Pi.WaitLoadPhysics);
                } else (i._state = Pi.LoadPose), a();
              },
              a = function () {
                if ("" != i._modelSetting.getPoseFileName()) {
                  var t = i._modelSetting.getPoseFileName();
                  (t = i._modelHomeDir + t),
                    fetch(t)
                      .then(function (t) {
                        return t.arrayBuffer();
                      })
                      .then(function (e) {
                        var r = e,
                          n = r.byteLength;
                        i.loadPose(r, n),
                          Ui(r, t),
                          (i._state = Pi.SetupEyeBlink),
                          s();
                      }),
                    (i._state = Pi.WaitLoadPose);
                } else (i._state = Pi.SetupEyeBlink), s();
              },
              s = function () {
                i._modelSetting.getEyeBlinkParameterCount() > 0 &&
                  ((i._eyeBlink = Ri.create(i._modelSetting)),
                  (i._state = Pi.SetupBreath)),
                  u();
              },
              u = function () {
                i._breath = Fi.create();
                var t = new Ei();
                t.pushBack(new Li(i._idParamAngleX, 0, 15, 6.5345, 0.5)),
                  t.pushBack(new Li(i._idParamAngleY, 0, 8, 3.5345, 0.5)),
                  t.pushBack(new Li(i._idParamAngleZ, 0, 10, 5.5345, 0.5)),
                  t.pushBack(new Li(i._idParamBodyAngleX, 0, 4, 15.5345, 0.5)),
                  t.pushBack(
                    new Li(
                      Di.getIdManager().getId(Oi.ParamBreath),
                      0,
                      0.5,
                      3.2345,
                      0.5,
                    ),
                  ),
                  i._breath.setParameters(t),
                  (i._state = Pi.LoadUserData),
                  l();
              },
              l = function () {
                if ("" != i._modelSetting.getUserDataFile()) {
                  var t = i._modelSetting.getUserDataFile();
                  (t = i._modelHomeDir + t),
                    fetch(t)
                      .then(function (t) {
                        return t.arrayBuffer();
                      })
                      .then(function (e) {
                        var r = e,
                          n = r.byteLength;
                        i.loadUserData(r, n),
                          Ui(r, t),
                          (i._state = Pi.SetupEyeBlinkIds),
                          h();
                      }),
                    (i._state = Pi.WaitLoadUserData);
                } else (i._state = Pi.SetupEyeBlinkIds), h();
              },
              h = function () {
                for (
                  var t = i._modelSetting.getEyeBlinkParameterCount(), e = 0;
                  e < t;
                  ++e
                )
                  i._eyeBlinkIds.pushBack(
                    i._modelSetting.getEyeBlinkParameterId(e),
                  );
                (i._state = Pi.SetupLipSyncIds), p();
              },
              p = function () {
                for (
                  var t = i._modelSetting.getLipSyncParameterCount(), e = 0;
                  e < t;
                  ++e
                )
                  i._lipSyncIds.pushBack(
                    i._modelSetting.getLipSyncParameterId(e),
                  );
                (i._state = Pi.SetupLayout), g();
              },
              g = function () {
                var t = new Ti();
                i._modelSetting.getLayoutMap(t),
                  i._modelMatrix.setupFromLayout(t),
                  (i._state = Pi.LoadMotion),
                  c();
              },
              c = function () {
                (i._state = Pi.WaitLoadMotion),
                  i._model.saveParameters(),
                  (i._allMotionCount = 0),
                  (i._motionCount = 0);
                for (
                  var t = [], e = i._modelSetting.getMotionGroupCount(), r = 0;
                  r < e;
                  r++
                )
                  (t[r] = i._modelSetting.getMotionGroupName(r)),
                    (i._allMotionCount += i._modelSetting.getMotionCount(t[r]));
                for (r = 0; r < e; r++) i.preLoadMotionGroup(t[r]);
                0 == e &&
                  ((i._state = Pi.LoadTexture),
                  i._motionManager.stopAllMotions(),
                  (i._updating = !1),
                  (i._initialized = !0),
                  i.createRenderer(),
                  i.setupTextures(),
                  i.getRenderer().startUp(i.lappdelegate.gl)),
                  "function" == typeof i.pm.onFinishLoad && i.pm.onFinishLoad();
              };
          }),
          (e.prototype.setupTextures = function () {
            var t = this;
            if (this._state == Pi.LoadTexture) {
              for (
                var e = this._modelSetting.getTextureCount(),
                  i = new Array(e),
                  r = function (r) {
                    if ("" == n._modelSetting.getTextureFileName(r))
                      return console.log("getTextureFileName null"), "continue";
                    var o = n._modelSetting.getTextureFileName(r);
                    (o = n._modelHomeDir + o),
                      (i[r] = new Image()),
                      (i[r].onload = function () {
                        var n = t.lappdelegate.gl,
                          o = n.createTexture();
                        n.bindTexture(n.TEXTURE_2D, o),
                          n.texParameteri(
                            n.TEXTURE_2D,
                            n.TEXTURE_MIN_FILTER,
                            n.LINEAR_MIPMAP_LINEAR,
                          ),
                          n.texParameteri(
                            n.TEXTURE_2D,
                            n.TEXTURE_MAG_FILTER,
                            n.LINEAR,
                          ),
                          n.texParameteri(
                            n.TEXTURE_2D,
                            n.TEXTURE_WRAP_S,
                            n.CLAMP_TO_EDGE,
                          ),
                          n.texParameteri(
                            n.TEXTURE_2D,
                            n.TEXTURE_WRAP_T,
                            n.CLAMP_TO_EDGE,
                          ),
                          n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 1),
                          n.texImage2D(
                            n.TEXTURE_2D,
                            0,
                            n.RGBA,
                            n.RGBA,
                            n.UNSIGNED_BYTE,
                            i[r],
                          ),
                          n.generateMipmap(n.TEXTURE_2D),
                          t.getRenderer().bindTexture(r, o),
                          t._textureCount++,
                          t._textureCount >= e && (t._state = Pi.CompleteSetup);
                      }),
                      (i[r].src = o),
                      n.getRenderer().setIsPremultipliedAlpha(!0);
                  },
                  n = this,
                  o = 0;
                o < e;
                o++
              )
                r(o);
              this._state = Pi.WaitLoadTexture;
            }
          }),
          (e.prototype.reloadRenderer = function () {
            this.deleteRenderer(), this.createRenderer(), this.setupTextures();
          }),
          (e.prototype.update = function () {
            if (this._state == Pi.CompleteSetup) {
              var t = H.getDeltaTime();
              var heartRate = HeartStatus.getHeartRate();
              var heartIntervalRate = HeartStatus.getIntervalRate();
              var atrialHeartRate = HeartStatus.getAtrialHeartRate();
              var atrialIntervalRate = HeartStatus.getAtrialIntervalRate();
              var respiratoryRate = BreathStatus.getRespiratoryRate();
              var breathIntervalRate = BreathStatus.getIntervalRate();
              this._userTimeSeconds += t;
              var e = !1;
              if (
                (this._model.loadParameters(),
                (e = this._motionManager.updateMotion(this._model, t)),
                (e = this._beatMotionManager.updateMotion(
                  this._model,
                  t * (heartRate / 60) * (1 + heartIntervalRate),
                )),
                (e = this._atrialBeatMotionManager.updateMotion(
                  this._model,
                  t * (atrialHeartRate / 60) * (1 + atrialIntervalRate),
                )),
                (e = this._breathMotionManager.updateMotion(
                  this._model,
                  t * (respiratoryRate / 20) * (1 + breathIntervalRate),
                )),
                this._model.saveParameters(),
                e ||
                  (null != this._eyeBlink &&
                    this._eyeBlink.updateParameters(this._model, t)),
                null != this._expressionManager &&
                  this._expressionManager.updateMotion(this._model, t),
                null != this._breath &&
                  "true" == this.pm.breath &&
                  this._breath.updateParameters(this._model, t),
                null != this._physics && this._physics.evaluate(this._model, t),
                this._lipsync)
              )
                for (
                  var i = parseFloat(this.pm.lip_value), r = 0;
                  r < this._lipSyncIds.getSize();
                  ++r
                )
                  this._model.addParameterValueById(
                    this._lipSyncIds.at(r),
                    i,
                    0.8,
                  );
              null != this._pose && this._pose.updateParameters(this._model, t),
                this._model.update();
            }
          }),
          (e.prototype.startMotion = function (t, e, i) {
            var r = this;
            if (i == k.PriorityForce) this._motionManager.setReservePriority(i);
            else if (!this._motionManager.reserveMotion(i))
              return (
                this._debugMode && H.printLog("[APP]can't start motion."), Ii
              );
            var n = this._modelSetting.getMotionFileName(t, e),
              o = wi.getFormatedString("{0}_{1}", t, e),
              a = this._motions.getValue(o),
              s = !1;
            if (null == a) {
              var u = n;
              (u = this._modelHomeDir + u),
                fetch(u)
                  .then(function (t) {
                    return t.arrayBuffer();
                  })
                  .then(function (i) {
                    var n = i,
                      o = n.byteLength;
                    a = r.loadMotion(n, o, null);
                    var l = r._modelSetting.getMotionFadeInTimeValue(t, e);
                    l >= 0 && a.setFadeInTime(l),
                      (l = r._modelSetting.getMotionFadeOutTimeValue(t, e)) >=
                        0 && a.setFadeOutTime(l),
                      a.setEffectIds(r._eyeBlinkIds, r._lipSyncIds),
                      (s = !0),
                      Ui(n, u);
                  });
            }
            return (
              this._debugMode &&
                H.printLog("[APP]start motion: [{0}_{1}", t, e),
              this._motionManager.startMotionPriority(a, s, i)
            );
          }),
          (e.prototype.startBeatMotion = function (
            t,
            e,
            i,
            heartRate,
            intervalRate,
          ) {
            var r = this;
            HeartStatus.setHeartRate(heartRate);
            HeartStatus.setIntervalRate(intervalRate);
            if (i == k.PriorityForce)
              this._beatMotionManager.setReservePriority(i);
            else if (!this._beatMotionManager.reserveMotion(i))
              return (
                this._debugMode && H.printLog("[APP]can't start motion."), Ii
              );
            var n = this._modelSetting.getMotionFileName(t, e),
              o = wi.getFormatedString("{0}_{1}", t, e),
              a = this._motions.getValue(o),
              s = !1;
            if (null == a) {
              var u = n;
              (u = this._modelHomeDir + u),
                fetch(u)
                  .then(function (t) {
                    return t.arrayBuffer();
                  })
                  .then(function (i) {
                    var n = i,
                      o = n.byteLength;
                    a = r.loadMotion(n, o, null);
                    var l = r._modelSetting.getMotionFadeInTimeValue(t, e);
                    l >= 0 && a.setFadeInTime(l),
                      (l = r._modelSetting.getMotionFadeOutTimeValue(t, e)) >=
                        0 && a.setFadeOutTime(l),
                      a.setEffectIds(r._eyeBlinkIds, r._lipSyncIds),
                      (s = !0),
                      Ui(n, u);
                  });
            }
            return (
              this._debugMode &&
                H.printLog("[APP]start motion: [{0}_{1}", t, e),
              this._beatMotionManager.startMotionPriority(a, s, i)
            );
          }),
          (e.prototype.startAtrialBeatMotion = function (
            t,
            e,
            i,
            atrialHeartRate,
            intervalRate,
          ) {
            var r = this;
            HeartStatus.setAtrialHeartRate(atrialHeartRate);
            HeartStatus.setAtrialIntervalRate(intervalRate);
            if (i == k.PriorityForce)
              this._atrialBeatMotionManager.setReservePriority(i);
            else if (!this._atrialBeatMotionManager.reserveMotion(i))
              return (
                this._debugMode && H.printLog("[APP]can't start motion."), Ii
              );
            var n = this._modelSetting.getMotionFileName(t, e),
              o = wi.getFormatedString("{0}_{1}", t, e),
              a = this._motions.getValue(o),
              s = !1;
            if (null == a) {
              var u = n;
              (u = this._modelHomeDir + u),
                fetch(u)
                  .then(function (t) {
                    return t.arrayBuffer();
                  })
                  .then(function (i) {
                    var n = i,
                      o = n.byteLength;
                    a = r.loadMotion(n, o, null);
                    var l = r._modelSetting.getMotionFadeInTimeValue(t, e);
                    l >= 0 && a.setFadeInTime(l),
                      (l = r._modelSetting.getMotionFadeOutTimeValue(t, e)) >=
                        0 && a.setFadeOutTime(l),
                      a.setEffectIds(r._eyeBlinkIds, r._lipSyncIds),
                      (s = !0),
                      Ui(n, u);
                  });
            }
            return (
              this._debugMode &&
                H.printLog("[APP]start motion: [{0}_{1}", t, e),
              this._atrialBeatMotionManager.startMotionPriority(a, s, i)
            );
          }),
          (e.prototype.startBreathMotion = function (
            t,
            e,
            i,
            respiratoryRate,
            intervalRate,
          ) {
            var r = this;
            BreathStatus.setRespiratoryRate(respiratoryRate);
            BreathStatus.setIntervalRate(intervalRate);
            if (i == k.PriorityForce)
              this._breathMotionManager.setReservePriority(i);
            else if (!this._breathMotionManager.reserveMotion(i))
              return (
                this._debugMode && H.printLog("[APP]can't start motion."), Ii
              );
            var n = this._modelSetting.getMotionFileName(t, e),
              o = wi.getFormatedString("{0}_{1}", t, e),
              a = this._motions.getValue(o),
              s = !1;
            if (null == a) {
              var u = n;
              (u = this._modelHomeDir + u),
                fetch(u)
                  .then(function (t) {
                    return t.arrayBuffer();
                  })
                  .then(function (i) {
                    var n = i,
                      o = n.byteLength;
                    a = r.loadMotion(n, o, null);
                    var l = r._modelSetting.getMotionFadeInTimeValue(t, e);
                    l >= 0 && a.setFadeInTime(l),
                      (l = r._modelSetting.getMotionFadeOutTimeValue(t, e)) >=
                        0 && a.setFadeOutTime(l),
                      a.setEffectIds(r._eyeBlinkIds, r._lipSyncIds),
                      (s = !0),
                      Ui(n, u);
                  });
            }
            return (
              this._debugMode &&
                H.printLog("[APP]start motion: [{0}_{1}", t, e),
              this._breathMotionManager.startMotionPriority(a, s, i)
            );
          }),
          (e.prototype.startRandomMotion = function (t, e) {
            if (0 == this._modelSetting.getMotionCount(t)) return Ii;
            var i = Math.floor(
              Math.random() * this._modelSetting.getMotionCount(t),
            );
            return this.startMotion(t, i, e);
          }),
          (e.prototype.setExpression = function (t) {
            var e = this._expressions.getValue(t);
            this._debugMode && H.printLog("[APP]expression: [{0}]", t),
              null != e
                ? this._expressionManager.startMotionPriority(
                    e,
                    !1,
                    k.PriorityForce,
                  )
                : this._debugMode &&
                  H.printLog("[APP]expression[{0}] is null", t);
          }),
          (e.prototype.setRandomExpression = function () {
            if (0 != this._expressions.getSize())
              for (
                var t = Math.floor(Math.random() * this._expressions.getSize()),
                  e = 0;
                e < this._expressions.getSize();
                e++
              )
                if (e == t) {
                  var i = this._expressions._keyValues[e].first;
                  return void this.setExpression(i);
                }
          }),
          (e.prototype.motionEventFired = function (t) {
            o("{0} is fired on LAppModel!!", t.s);
          }),
          (e.prototype.hitTest = function (t, e, i) {
            if (this._opacity < 1) return !1;
            for (
              var r = this._modelSetting.getHitAreasCount(), n = 0;
              n < r;
              n++
            )
              if (this._modelSetting.getHitAreaName(n) == t) {
                var o = this._modelSetting.getHitAreaId(n);
                return this.isHit(o, e, i);
              }
            return !1;
          }),
          (e.prototype.preLoadMotionGroup = function (t) {
            for (
              var e = this,
                i = function (i) {
                  var n = wi.getFormatedString("{0}_{1}", t, i),
                    o = r._modelSetting.getMotionFileName(t, i);
                  o = r._modelHomeDir + o;
                  var a = r.lappdelegate.gl;
                  r._debugMode &&
                    H.printLog("[APP]load motion: {0} => [{1}_{2}]", o, t, i),
                    fetch(o)
                      .then(function (t) {
                        return t.arrayBuffer();
                      })
                      .then(function (r) {
                        var s = r,
                          u = s.byteLength,
                          l = e.loadMotion(s, u, n),
                          h = e._modelSetting.getMotionFadeInTimeValue(t, i);
                        h >= 0 && l.setFadeInTime(h),
                          (h = e._modelSetting.getMotionFadeOutTimeValue(
                            t,
                            i,
                          )) >= 0 && l.setFadeOutTime(h),
                          l.setEffectIds(e._eyeBlinkIds, e._lipSyncIds),
                          null != e._motions.getValue(n) &&
                            Ai.delete(e._motions.getValue(n)),
                          e._motions.setValue(n, l),
                          Ui(s, o),
                          e._motionCount++,
                          e._motionCount >= e._allMotionCount &&
                            ((e._state = Pi.LoadTexture),
                            e._motionManager.stopAllMotions(),
                            (e._updating = !1),
                            (e._initialized = !0),
                            e.createRenderer(),
                            e.setupTextures(),
                            e.getRenderer().startUp(a));
                      });
                },
                r = this,
                n = 0;
              n < this._modelSetting.getMotionCount(t);
              n++
            )
              i(n);
          }),
          (e.prototype.releaseMotions = function () {
            this._motions.clear();
          }),
          (e.prototype.releaseExpressions = function () {
            this._expressions.clear();
          }),
          (e.prototype.doDraw = function () {
            var t = this.lappdelegate.canvas,
              e = this.lappdelegate.frameBuffer;
            if (null != this._model) {
              var i = [0, 0, t.width, t.height];
              this.getRenderer().setRenderState(e, i),
                this.getRenderer().drawModel();
            }
          }),
          (e.prototype.draw = function (t) {
            null != this._model &&
              ((this.pm && "false" == this.pm.visible) ||
                (this._state == Pi.CompleteSetup &&
                  (t.multiplyByMatrix(this._modelMatrix),
                  this.getRenderer().setMvpMatrix(t),
                  this.doDraw())));
          }),
          e
        );
      })(ki),
      Xi = g.csmVector,
      Gi = b.CubismMatrix44,
      qi = null,
      Yi = (function () {
        function t(t) {
          (this.context = t),
            (this._viewMatrix = new Gi()),
            (this._models = new Xi()),
            (this._sceneIndex = 0);
        }
        return (
          (t.releaseInstance = function () {
            null != qi && (qi = void 0), (qi = null);
          }),
          (t.prototype.getModel = function (t) {
            return t < this._models.getSize() ? this._models.at(t) : null;
          }),
          (t.prototype.releaseAllModel = function () {
            for (var t = 0; t < this._models.getSize(); t++)
              this._models.at(t).release(), this._models.set(t, null);
            this._models.clear();
          }),
          (t.prototype.onDrag = function (t, e) {
            for (var i = 0; i < this._models.getSize(); i++) {
              var r = this.getModel(i);
              r && r.setDragging(t, e);
            }
          }),
          (t.prototype.onTap = function (t, e) {
            k.DebugLogEnable &&
              H.printLog(
                "[APP]tap point: {x: {0} y: {1}}",
                t.toFixed(2),
                e.toFixed(2),
              );
            for (var i = 0; i < this._models.getSize(); i++)
              this._models.at(i).hitTest(k.HitAreaNameHead, t, e)
                ? (k.DebugLogEnable &&
                    H.printLog("[APP]hit area: [{0}]", k.HitAreaNameHead),
                  this._models.at(i).setRandomExpression())
                : this._models.at(i).hitTest(k.HitAreaNameBody, t, e) &&
                  (k.DebugLogEnable &&
                    H.printLog("[APP]hit area: [{0}]", k.HitAreaNameBody),
                  this._models
                    .at(i)
                    .startRandomMotion(k.MotionGroupTapBody, k.PriorityNormal));
          }),
          (t.prototype.onUpdate = function () {
            this.context.gl.clear(this.context.gl.COLOR_BUFFER_BIT);
            var t,
              e,
              i = new Gi();
            (t = this.context.canvas.width),
              (e = this.context.canvas.height),
              null != this._viewMatrix && i.multiplyByMatrix(this._viewMatrix);
            for (
              var r = i.clone(), n = this._models.getSize(), o = 0;
              o < n;
              ++o
            ) {
              var a = this.getModel(o),
                s = parseFloat(a.pm.x),
                u = parseFloat(a.pm.y),
                l = parseFloat(a.pm.scale);
              "false" == a.pm.visible && (s = 99999),
                (i = r.clone()).scale(1 * l, (t / e) * l),
                i.translateX(s),
                i.translateY(u),
                a.update(),
                a.draw(i);
            }
          }),
          (t.prototype.nextScene = function () {
            var t = (this._sceneIndex + 1) % k.ModelDirSize;
            this.changeScene(t);
          }),
          (t.prototype.changeScene = function (t) {
            (this._sceneIndex = t),
              k.DebugLogEnable &&
                H.printLog("[APP]model index: {0}", this._sceneIndex);
            var e = k.ModelDir[t];
            k.ResourcesPath, k.ModelDir[t];
          }),
          (t.prototype.addModel = function (t, e) {
            var i = k.ResourcesPath + t + "/",
              r = t;
            return (
              (r += ".model3.json"),
              this._models.pushBack(new ji(this.context, e)),
              this._models.at(this._models.getSize() - 1).loadAssets(i, r),
              this._models.getSize() - 1
            );
          }),
          t
        );
      })(),
      Hi = b.CubismMatrix44,
      Wi = w.CubismFramework,
      Ji = (function () {
        function t() {
          (this.canvas = null),
            (this.gl = null),
            (this.frameBuffer = null),
            (this._captured = !1),
            (this._mouseX = 0),
            (this._mouseY = 0),
            (this._isEnd = !1),
            (this._cubismOption = new A()),
            (this._view = new Y(this)),
            (this._textureManager = new J(this));
        }
        return (
          (t.prototype.initialize = function (t) {
            this.canvas = document.getElementById(t);
            this.canvas;
            var e = {
              alpha: !0,
              premultipliedAlpha: !0,
              preserveDrawingBuffer: !0,
            };
            this.gl =
              this.canvas.getContext("webgl", e) ||
              this.canvas.getContext("experimental-webgl", e);
            var i = this.gl;
            return i
              ? (this.frameBuffer ||
                  (this.frameBuffer = i.getParameter(i.FRAMEBUFFER_BINDING)),
                i.enable(i.BLEND),
                i.blendFunc(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA),
                this._view.initialize(),
                (this.lapplive2dmanager = new Yi(this)),
                !0)
              : (alert(
                  "WebGLを初期化できません。ブラウザはサポートしていないようです。",
                ),
                (i = null),
                !1);
          }),
          (t.prototype.release = function () {
            V.CubismRenderer.staticRelease(),
              Ie.CubismRenderer_WebGL.doStaticRelease(),
              this._textureManager.release(),
              (this._textureManager = null),
              this._view.release(),
              (this._view = null);
          }),
          (t.prototype.run = function () {
            var t = this,
              e = this.gl,
              i = function () {
                H.updateTime(),
                  e.clearColor(0, 0, 0, 0),
                  e.enable(e.DEPTH_TEST),
                  e.depthFunc(e.LEQUAL),
                  t._view.render(),
                  requestAnimationFrame(i);
              };
            i();
          }),
          (t.prototype.createShader = function () {
            var t = this.gl,
              e = t.createShader(t.VERTEX_SHADER);
            if (null == e)
              return H.printLog("failed to create vertexShader"), null;
            t.shaderSource(
              e,
              "precision mediump float;attribute vec3 position;attribute vec2 uv;varying vec2 vuv;void main(void){   gl_Position = vec4(position, 1.0);   vuv = uv;}",
            ),
              t.compileShader(e);
            var i = t.createShader(t.FRAGMENT_SHADER);
            if (null == i)
              return H.printLog("failed to create fragmentShader"), null;
            t.shaderSource(
              i,
              "precision mediump float;varying vec2 vuv;uniform sampler2D texture;void main(void){   gl_FragColor = texture2D(texture, vuv);}",
            ),
              t.compileShader(i);
            var r = t.createProgram();
            return (
              t.attachShader(r, e),
              t.attachShader(r, i),
              t.deleteShader(e),
              t.deleteShader(i),
              t.linkProgram(r),
              t.useProgram(r),
              r
            );
          }),
          (t.prototype.getView = function () {
            return this._view;
          }),
          (t.prototype.getTextureManager = function () {
            return this._textureManager;
          }),
          (t.prototype.initializeCubism = function () {
            Wi.startUp(), Wi.initialize();
            new Hi();
            H.updateTime();
          }),
          t
        );
      })(),
      Ki = (function () {
        function t() {
          (this.model_index = 0),
            console.log("New Tyrano Manager!"),
            (this.models = {}),
            (this.lappdelegate = new Ji()),
            this.lappdelegate.initialize("live2d_canvas_tyrano"),
            this.lappdelegate.run(),
            this.lappdelegate.initializeCubism();
        }
        return (
          (t.prototype.nextScene = function () {}),
          (t.prototype.setResourcesPath = function (t) {
            k.ResourcesPath = t;
          }),
          (t.prototype.addModel = function (t) {
            var e = t.name,
              i = t.model_id;
            this.lappdelegate.lapplive2dmanager.addModel(i, t),
              (this.models[e] = { index: this.model_index, pm: t }),
              this.model_index++;
          }),
          (t.prototype.updateModel = function (t) {
            var e = t.name;
            this.models[e] ||
              alert("Live2Dエラー：name=「" + e + "」は存在しません。");
            var i = this.models[t.name],
              r = this.lappdelegate.lapplive2dmanager.getModel(i.index);
            for (var n in t) r.pm[n] = t[n];
            return r.pm;
          }),
          (t.prototype.deleteAllModel = function () {
            this.lappdelegate.lapplive2dmanager.releaseAllModel(),
              (this.models = {}),
              (this.model_index = 0);
          }),
          (t.prototype.setLipValue = function (t, e) {
            if (this.models[t]) {
              var i = this.models[t];
              this.lappdelegate.lapplive2dmanager.getModel(
                i.index,
              ).pm.lip_value = e;
            }
          }),
          (t.prototype.setMotion = function (t, e, i, r) {
            this.models[t] ||
              alert("Live2Dエラー：name=「" + t + "」は存在しません。");
            var n = this.models[t],
              o = 2;
            "true" === r && (o = 3),
              this.lappdelegate.lapplive2dmanager
                .getModel(n.index)
                .startMotion(e, i, o);
          }),
          (t.prototype.setBeatMotion = function (
            t,
            e,
            i,
            r,
            heartRate,
            intervalRate,
          ) {
            this.models[t] ||
              alert("Live2Dエラー：name=「" + t + "」は存在しません。");
            var n = this.models[t],
              o = 2;
            "true" === r && (o = 3),
              this.lappdelegate.lapplive2dmanager
                .getModel(n.index)
                .startBeatMotion(e, i, o, heartRate, intervalRate);
          }),
          (t.prototype.setAtrialBeatMotion = function (
            t,
            e,
            i,
            r,
            atrialHeartRate,
            intervalRate,
          ) {
            this.models[t] ||
              alert("Live2Dエラー：name=「" + t + "」は存在しません。");
            var n = this.models[t],
              o = 2;
            "true" === r && (o = 3),
              this.lappdelegate.lapplive2dmanager
                .getModel(n.index)
                .startAtrialBeatMotion(e, i, o, atrialHeartRate, intervalRate);
          }),
          (t.prototype.setBreathMotion = function (
            t,
            e,
            i,
            r,
            respiratoryRate,
            intervalRate,
          ) {
            this.models[t] ||
              alert("Live2Dエラー：name=「" + t + "」は存在しません。");
            var n = this.models[t],
              o = 2;
            "true" === r && (o = 3),
              this.lappdelegate.lapplive2dmanager
                .getModel(n.index)
                .startBreathMotion(e, i, o, respiratoryRate, intervalRate);
          }),
          (t.prototype.convertCanvasPos = function (t, e) {
            return this.lappdelegate.getView().onTouchesEnded(t, e);
          }),
          (t.prototype.setExpression = function (t, e) {
            this.models[t] ||
              alert("Live2Dエラー：name=「" + t + "」は存在しません。");
            var i = this.models[t];
            this.lappdelegate.lapplive2dmanager
              .getModel(i.index)
              .setExpression(e);
          }),
          (t.prototype.start = function () {}),
          t
        );
      })();
    (window.onbeforeunload = function () {}),
      (tyranolive2dplugin.getTyranoManager = function (t) {
        return null == zi && (zi = new Ki()), zi;
      }),
      (tyranolive2dplugin.releaseTyranoManager = function (t) {
        zi.lappdelegate.release(), (zi = null);
      });
  },
]);
