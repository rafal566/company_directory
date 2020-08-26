/*!
   Copyright 2014-2020 SpryMedia Ltd.

 This source file is free software, available under the following license:
   MIT license - http://datatables.net/license/mit

 This source file is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.

 For details please refer to: http://www.datatables.net
 Responsive 2.2.5
 2014-2020 SpryMedia Ltd - datatables.net/license
*/
var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, k, g) {
  a instanceof String && (a = String(a));
  for (var n = a.length, p = 0; p < n; p++) {
    var v = a[p];
    if (k.call(g, v, p, a)) return {
      i: p,
      v: v
    }
  }
  return {
    i: -1,
    v: void 0
  }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, k, g) {
  a != Array.prototype && a != Object.prototype && (a[k] = g.value)
};
$jscomp.getGlobal = function(a) {
  a = ["object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, a];
  for (var k = 0; k < a.length; ++k) {
    var g = a[k];
    if (g && g.Math == Math) return g
  }
  throw Error("Cannot find global object");
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, k, g, n) {
  if (k) {
    g = $jscomp.global;
    a = a.split(".");
    for (n = 0; n < a.length - 1; n++) {
      var p = a[n];
      p in g || (g[p] = {});
      g = g[p]
    }
    a = a[a.length - 1];
    n = g[a];
    k = k(n);
    k != n && null != k && $jscomp.defineProperty(g, a, {
      configurable: !0,
      writable: !0,
      value: k
    })
  }
};
$jscomp.polyfill("Array.prototype.find", function(a) {
  return a ? a : function(a, g) {
    return $jscomp.findInternal(this, a, g).v
  }
}, "es6", "es3");
(function(a) {
  "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function(k) {
    return a(k, window, document)
  }) : "object" === typeof exports ? module.exports = function(k, g) {
    k || (k = window);
    g && g.fn.dataTable || (g = require("datatables.net")(k, g).$);
    return a(g, k, k.document)
  } : a(jQuery, window, document)
})(function(a, k, g, n) {
  function p(b, a, c) {
    var d = a + "-" + c;
    if (q[d]) return q[d];
    var f = [];
    b = b.cell(a, c).node().childNodes;
    a = 0;
    for (c = b.length; a < c; a++) f.push(b[a]);
    return q[d] = f
  }

  function v(b, a, c) {
    var d = a + "-" +
      c;
    if (q[d]) {
      b = b.cell(a, c).node();
      c = q[d][0].parentNode.childNodes;
      a = [];
      for (var f = 0, l = c.length; f < l; f++) a.push(c[f]);
      c = 0;
      for (f = a.length; c < f; c++) b.appendChild(a[c]);
      q[d] = n
    }
  }
  var t = a.fn.dataTable,
    m = function(b, d) {
      if (!t.versionCheck || !t.versionCheck("1.10.10")) throw "DataTables Responsive requires DataTables 1.10.10 or newer";
      this.s = {
        dt: new t.Api(b),
        columns: [],
        current: []
      };
      this.s.dt.settings()[0].responsive || (d && "string" === typeof d.details ? d.details = {
          type: d.details
        } : d && !1 === d.details ? d.details = {
          type: !1
        } : d &&
        !0 === d.details && (d.details = {
          type: "inline"
        }), this.c = a.extend(!0, {}, m.defaults, t.defaults.responsive, d), b.responsive = this, this._constructor())
    };
  a.extend(m.prototype, {
    _constructor: function() {
      var b = this,
        d = this.s.dt,
        c = d.settings()[0],
        e = a(k).innerWidth();
      d.settings()[0]._responsive = this;
      a(k).on("resize.dtr orientationchange.dtr", t.util.throttle(function() {
        var d = a(k).innerWidth();
        d !== e && (b._resize(), e = d)
      }));
      c.oApi._fnCallbackReg(c, "aoRowCreatedCallback", function(c, e, r) {
        -1 !== a.inArray(!1, b.s.current) && a(">td, >th",
          c).each(function(c) {
          c = d.column.index("toData", c);
          !1 === b.s.current[c] && a(this).css("display", "none")
        })
      });
      d.on("destroy.dtr", function() {
        d.off(".dtr");
        a(d.table().body()).off(".dtr");
        a(k).off("resize.dtr orientationchange.dtr");
        d.cells(".dtr-control").nodes().to$().removeClass("dtr-control");
        a.each(b.s.current, function(a, d) {
          !1 === d && b._setColumnVis(a, !0)
        })
      });
      this.c.breakpoints.sort(function(b, a) {
        return b.width < a.width ? 1 : b.width > a.width ? -1 : 0
      });
      this._classLogic();
      this._resizeAuto();
      c = this.c.details;
      !1 !==
        c.type && (b._detailsInit(), d.on("column-visibility.dtr", function() {
          b._timer && clearTimeout(b._timer);
          b._timer = setTimeout(function() {
            b._timer = null;
            b._classLogic();
            b._resizeAuto();
            b._resize();
            b._redrawChildren()
          }, 100)
        }), d.on("draw.dtr", function() {
          b._redrawChildren()
        }), a(d.table().node()).addClass("dtr-" + c.type));
      d.on("column-reorder.dtr", function(a, d, c) {
        b._classLogic();
        b._resizeAuto();
        b._resize(!0)
      });
      d.on("column-sizing.dtr", function() {
        b._resizeAuto();
        b._resize()
      });
      d.on("preXhr.dtr", function() {
        var a = [];
        d.rows().every(function() {
          this.child.isShown() && a.push(this.id(!0))
        });
        d.one("draw.dtr", function() {
          b._resizeAuto();
          b._resize();
          d.rows(a).every(function() {
            b._detailsDisplay(this, !1)
          })
        })
      });
      d.on("draw.dtr", function() {
        b._controlClass()
      }).on("init.dtr", function(c, e, r) {
        "dt" === c.namespace && (b._resizeAuto(), b._resize(), a.inArray(!1, b.s.current) && d.columns.adjust())
      });
      this._resize()
    },
    _columnsVisiblity: function(b) {
      var d = this.s.dt,
        c = this.s.columns,
        e, f = c.map(function(a, b) {
          return {
            columnIdx: b,
            priority: a.priority
          }
        }).sort(function(a,
          b) {
          return a.priority !== b.priority ? a.priority - b.priority : a.columnIdx - b.columnIdx
        }),
        l = a.map(c, function(c, h) {
          return !1 === d.column(h).visible() ? "not-visible" : c.auto && null === c.minWidth ? !1 : !0 === c.auto ? "-" : -1 !== a.inArray(b, c.includeIn)
        }),
        r = 0;
      var h = 0;
      for (e = l.length; h < e; h++) !0 === l[h] && (r += c[h].minWidth);
      h = d.settings()[0].oScroll;
      h = h.sY || h.sX ? h.iBarWidth : 0;
      r = d.table().container().offsetWidth - h - r;
      h = 0;
      for (e = l.length; h < e; h++) c[h].control && (r -= c[h].minWidth);
      var k = !1;
      h = 0;
      for (e = f.length; h < e; h++) {
        var g = f[h].columnIdx;
        "-" === l[g] && !c[g].control && c[g].minWidth && (k || 0 > r - c[g].minWidth ? (k = !0, l[g] = !1) : l[g] = !0, r -= c[g].minWidth)
      }
      f = !1;
      h = 0;
      for (e = c.length; h < e; h++)
        if (!c[h].control && !c[h].never && !1 === l[h]) {
          f = !0;
          break
        } h = 0;
      for (e = c.length; h < e; h++) c[h].control && (l[h] = f), "not-visible" === l[h] && (l[h] = !1); - 1 === a.inArray(!0, l) && (l[0] = !0);
      return l
    },
    _classLogic: function() {
      var b = this,
        d = this.c.breakpoints,
        c = this.s.dt,
        e = c.columns().eq(0).map(function(a) {
          var b = this.column(a),
            d = b.header().className;
          a = c.settings()[0].aoColumns[a].responsivePriority;
          b = b.header().getAttribute("data-priority");
          a === n && (a = b === n || null === b ? 1E4 : 1 * b);
          return {
            className: d,
            includeIn: [],
            auto: !1,
            control: !1,
            never: d.match(/\bnever\b/) ? !0 : !1,
            priority: a
          }
        }),
        f = function(b, d) {
          b = e[b].includeIn; - 1 === a.inArray(d, b) && b.push(d)
        },
        g = function(a, c, g, l) {
          if (!g) e[a].includeIn.push(c);
          else if ("max-" === g)
            for (l = b._find(c).width, c = 0, g = d.length; c < g; c++) d[c].width <= l && f(a, d[c].name);
          else if ("min-" === g)
            for (l = b._find(c).width, c = 0, g = d.length; c < g; c++) d[c].width >= l && f(a, d[c].name);
          else if ("not-" === g)
            for (c =
              0, g = d.length; c < g; c++) - 1 === d[c].name.indexOf(l) && f(a, d[c].name)
        };
      e.each(function(b, c) {
        for (var e = b.className.split(" "), f = !1, h = 0, l = e.length; h < l; h++) {
          var k = a.trim(e[h]);
          if ("all" === k) {
            f = !0;
            b.includeIn = a.map(d, function(b) {
              return b.name
            });
            return
          }
          if ("none" === k || b.never) {
            f = !0;
            return
          }
          if ("control" === k) {
            f = !0;
            b.control = !0;
            return
          }
          a.each(d, function(b, a) {
            b = a.name.split("-");
            var d = k.match(new RegExp("(min\\-|max\\-|not\\-)?(" + b[0] + ")(\\-[_a-zA-Z0-9])?"));
            d && (f = !0, d[2] === b[0] && d[3] === "-" + b[1] ? g(c, a.name, d[1], d[2] +
              d[3]) : d[2] !== b[0] || d[3] || g(c, a.name, d[1], d[2]))
          })
        }
        f || (b.auto = !0)
      });
      this.s.columns = e
    },
    _controlClass: function() {
      if ("inline" === this.c.details.type) {
        var b = this.s.dt,
          d = a.inArray(!0, this.s.current);
        b.cells(null, function(b) {
          return b !== d
        }, {
          page: "current"
        }).nodes().to$().filter(".dtr-control").removeClass("dtr-control");
        b.cells(null, d, {
          page: "current"
        }).nodes().to$().addClass("dtr-control")
      }
    },
    _detailsDisplay: function(b, d) {
      var c = this,
        e = this.s.dt,
        f = this.c.details;
      if (f && !1 !== f.type) {
        var g = f.display(b, d, function() {
          return f.renderer(e,
            b[0], c._detailsObj(b[0]))
        });
        !0 !== g && !1 !== g || a(e.table().node()).triggerHandler("responsive-display.dt", [e, b, g, d])
      }
    },
    _detailsInit: function() {
      var b = this,
        d = this.s.dt,
        c = this.c.details;
      "inline" === c.type && (c.target = "td.dtr-control, th.dtr-control");
      d.on("draw.dtr", function() {
        b._tabIndexes()
      });
      b._tabIndexes();
      a(d.table().body()).on("keyup.dtr", "td, th", function(b) {
        13 === b.keyCode && a(this).data("dtr-keyboard") && a(this).click()
      });
      var e = c.target;
      c = "string" === typeof e ? e : "td, th";
      if (e !== n || null !== e) a(d.table().body()).on("click.dtr mousedown.dtr mouseup.dtr",
        c,
        function(c) {
          if (a(d.table().node()).hasClass("collapsed") && -1 !== a.inArray(a(this).closest("tr").get(0), d.rows().nodes().toArray())) {
            if ("number" === typeof e) {
              var f = 0 > e ? d.columns().eq(0).length + e : e;
              if (d.cell(this).index().column !== f) return
            }
            f = d.row(a(this).closest("tr"));
            "click" === c.type ? b._detailsDisplay(f, !1) : "mousedown" === c.type ? a(this).css("outline", "none") : "mouseup" === c.type && a(this).trigger("blur").css("outline", "")
          }
        })
    },
    _detailsObj: function(b) {
      var d = this,
        c = this.s.dt;
      return a.map(this.s.columns,
        function(e, f) {
          if (!e.never && !e.control) return e = c.settings()[0].aoColumns[f], {
            className: e.sClass,
            columnIndex: f,
            data: c.cell(b, f).render(d.c.orthogonal),
            hidden: c.column(f).visible() && !d.s.current[f],
            rowIndex: b,
            title: null !== e.sTitle ? e.sTitle : a(c.column(f).header()).text()
          }
        })
    },
    _find: function(b) {
      for (var a = this.c.breakpoints, c = 0, e = a.length; c < e; c++)
        if (a[c].name === b) return a[c]
    },
    _redrawChildren: function() {
      var b = this,
        a = this.s.dt;
      a.rows({
        page: "current"
      }).iterator("row", function(c, d) {
        a.row(d);
        b._detailsDisplay(a.row(d),
          !0)
      })
    },
    _resize: function(b) {
      var d = this,
        c = this.s.dt,
        e = a(k).innerWidth(),
        f = this.c.breakpoints,
        g = f[0].name,
        r = this.s.columns,
        h, n = this.s.current.slice();
      for (h = f.length - 1; 0 <= h; h--)
        if (e <= f[h].width) {
          g = f[h].name;
          break
        } var m = this._columnsVisiblity(g);
      this.s.current = m;
      f = !1;
      h = 0;
      for (e = r.length; h < e; h++)
        if (!1 === m[h] && !r[h].never && !r[h].control && !1 === !c.column(h).visible()) {
          f = !0;
          break
        } a(c.table().node()).toggleClass("collapsed", f);
      var p = !1,
        q = 0;
      c.columns().eq(0).each(function(a, c) {
        !0 === m[c] && q++;
        if (b || m[c] !== n[c]) p = !0, d._setColumnVis(a, m[c])
      });
      p && (this._redrawChildren(), a(c.table().node()).trigger("responsive-resize.dt", [c, this.s.current]), 0 === c.page.info().recordsDisplay && a("td", c.table().body()).eq(0).attr("colspan", q))
    },
    _resizeAuto: function() {
      var b = this.s.dt,
        d = this.s.columns;
      if (this.c.auto && -1 !== a.inArray(!0, a.map(d, function(b) {
          return b.auto
        }))) {
        a.isEmptyObject(q) || a.each(q, function(a) {
          a = a.split("-");
          v(b, 1 * a[0], 1 * a[1])
        });
        b.table().node();
        var c = b.table().node().cloneNode(!1),
          e = a(b.table().header().cloneNode(!1)).appendTo(c),
          f = a(b.table().body()).clone(!1, !1).empty().appendTo(c);
        c.style.width = "auto";
        var g = b.columns().header().filter(function(a) {
          return b.column(a).visible()
        }).to$().clone(!1).css("display", "table-cell").css("width", "auto").css("min-width", 0);
        a(f).append(a(b.rows({
          page: "current"
        }).nodes()).clone(!1)).find("th, td").css("display", "");
        if (f = b.table().footer()) {
          f = a(f.cloneNode(!1)).appendTo(c);
          var k = b.columns().footer().filter(function(a) {
            return b.column(a).visible()
          }).to$().clone(!1).css("display", "table-cell");
          a("<tr/>").append(k).appendTo(f)
        }
        a("<tr/>").append(g).appendTo(e);
        "inline" === this.c.details.type && a(c).addClass("dtr-inline collapsed");
        a(c).find("[name]").removeAttr("name");
        a(c).css("position", "relative");
        c = a("<div/>").css({
          width: 1,
          height: 1,
          overflow: "hidden",
          clear: "both"
        }).append(c);
        c.insertBefore(b.table().node());
        g.each(function(a) {
          a = b.column.index("fromVisible", a);
          d[a].minWidth = this.offsetWidth || 0
        });
        c.remove()
      }
    },
    _responsiveOnlyHidden: function() {
      var b = this.s.dt;
      return a.map(this.s.current, function(a,
        c) {
        return !1 === b.column(c).visible() ? !0 : a
      })
    },
    _setColumnVis: function(b, d) {
      var c = this.s.dt;
      d = d ? "" : "none";
      a(c.column(b).header()).css("display", d);
      a(c.column(b).footer()).css("display", d);
      c.column(b).nodes().to$().css("display", d);
      a.isEmptyObject(q) || c.cells(null, b).indexes().each(function(a) {
        v(c, a.row, a.column)
      })
    },
    _tabIndexes: function() {
      var b = this.s.dt,
        d = b.cells({
          page: "current"
        }).nodes().to$(),
        c = b.settings()[0],
        e = this.c.details.target;
      d.filter("[data-dtr-keyboard]").removeData("[data-dtr-keyboard]");
      "number" === typeof e ? b.cells(null, e, {
        page: "current"
      }).nodes().to$().attr("tabIndex", c.iTabIndex).data("dtr-keyboard", 1) : ("td:first-child, th:first-child" === e && (e = ">td:first-child, >th:first-child"), a(e, b.rows({
        page: "current"
      }).nodes()).attr("tabIndex", c.iTabIndex).data("dtr-keyboard", 1))
    }
  });
  m.breakpoints = [{
    name: "desktop",
    width: Infinity
  }, {
    name: "tablet-l",
    width: 1024
  }, {
    name: "tablet-p",
    width: 768
  }, {
    name: "mobile-l",
    width: 480
  }, {
    name: "mobile-p",
    width: 320
  }];
  m.display = {
    childRow: function(b, d, c) {
      if (d) {
        if (a(b.node()).hasClass("parent")) return b.child(c(),
          "child").show(), !0
      } else {
        if (b.child.isShown()) return b.child(!1), a(b.node()).removeClass("parent"), !1;
        b.child(c(), "child").show();
        a(b.node()).addClass("parent");
        return !0
      }
    },
    childRowImmediate: function(b, d, c) {
      if (!d && b.child.isShown() || !b.responsive.hasHidden()) return b.child(!1), a(b.node()).removeClass("parent"), !1;
      b.child(c(), "child").show();
      a(b.node()).addClass("parent");
      return !0
    },
    modal: function(b) {
      return function(d, c, e) {
        if (c) a("div.dtr-modal-content").empty().append(e());
        else {
          var f = function() {
              k.remove();
              a(g).off("keypress.dtr")
            },
            k = a('<div class="dtr-modal"/>').append(a('<div class="dtr-modal-display"/>').append(a('<div class="dtr-modal-content"/>').append(e())).append(a('<div class="dtr-modal-close">&times;</div>').click(function() {
              f()
            }))).append(a('<div class="dtr-modal-background"/>').click(function() {
              f()
            })).appendTo("body");
          a(g).on("keyup.dtr", function(a) {
            27 === a.keyCode && (a.stopPropagation(), f())
          })
        }
        b && b.header && a("div.dtr-modal-content").prepend("<h2>" + b.header(d) + "</h2>")
      }
    }
  };
  var q = {};
  m.renderer = {
    listHiddenNodes: function() {
      return function(b, d, c) {
        var e = a('<ul data-dtr-index="' + d + '" class="dtr-details"/>'),
          f = !1;
        a.each(c, function(c, d) {
          d.hidden && (a("<li " + (d.className ? 'class="' + d.className + '"' : "") + ' data-dtr-index="' + d.columnIndex + '" data-dt-row="' + d.rowIndex + '" data-dt-column="' + d.columnIndex + '"><span class="dtr-title">' + d.title + "</span> </li>").append(a('<span class="dtr-data"/>').append(p(b, d.rowIndex, d.columnIndex))).appendTo(e), f = !0)
        });
        return f ? e : !1
      }
    },
    listHidden: function() {
      return function(b,
        d, c) {
        return (b = a.map(c, function(a) {
          var b = a.className ? 'class="' + a.className + '"' : "";
          return a.hidden ? "<li " + b + ' data-dtr-index="' + a.columnIndex + '" data-dt-row="' + a.rowIndex + '" data-dt-column="' + a.columnIndex + '"><span class="dtr-title">' + a.title + '</span> <span class="dtr-data">' + a.data + "</span></li>" : ""
        }).join("")) ? a('<ul data-dtr-index="' + d + '" class="dtr-details"/>').append(b) : !1
      }
    },
    tableAll: function(b) {
      b = a.extend({
        tableClass: ""
      }, b);
      return function(d, c, e) {
        d = a.map(e, function(a) {
          return "<tr " + (a.className ?
            'class="' + a.className + '"' : "") + ' data-dt-row="' + a.rowIndex + '" data-dt-column="' + a.columnIndex + '"><td>' + a.title + ":</td> <td>" + a.data + "</td></tr>"
        }).join("");
        return a('<table class="' + b.tableClass + ' dtr-details" width="100%"/>').append(d)
      }
    }
  };
  m.defaults = {
    breakpoints: m.breakpoints,
    auto: !0,
    details: {
      display: m.display.childRow,
      renderer: m.renderer.listHidden(),
      target: 0,
      type: "inline"
    },
    orthogonal: "display"
  };
  var u = a.fn.dataTable.Api;
  u.register("responsive()", function() {
    return this
  });
  u.register("responsive.index()",
    function(b) {
      b = a(b);
      return {
        column: b.data("dtr-index"),
        row: b.parent().data("dtr-index")
      }
    });
  u.register("responsive.rebuild()", function() {
    return this.iterator("table", function(a) {
      a._responsive && a._responsive._classLogic()
    })
  });
  u.register("responsive.recalc()", function() {
    return this.iterator("table", function(a) {
      a._responsive && (a._responsive._resizeAuto(), a._responsive._resize())
    })
  });
  u.register("responsive.hasHidden()", function() {
    var b = this.context[0];
    return b._responsive ? -1 !== a.inArray(!1, b._responsive._responsiveOnlyHidden()) :
      !1
  });
  u.registerPlural("columns().responsiveHidden()", "column().responsiveHidden()", function() {
    return this.iterator("column", function(a, d) {
      return a._responsive ? a._responsive._responsiveOnlyHidden()[d] : !1
    }, 1)
  });
  m.version = "2.2.5";
  a.fn.dataTable.Responsive = m;
  a.fn.DataTable.Responsive = m;
  a(g).on("preInit.dt.dtr", function(b, d, c) {
    "dt" === b.namespace && (a(d.nTable).hasClass("responsive") || a(d.nTable).hasClass("dt-responsive") || d.oInit.responsive || t.defaults.responsive) && (b = d.oInit.responsive, !1 !== b && new m(d,
      a.isPlainObject(b) ? b : {}))
  });
  return m
});
