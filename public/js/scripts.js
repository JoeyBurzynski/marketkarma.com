window.log = function () {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        var b = arguments;
        b.callee = b.callee.caller;
        b = [].slice.call(b);
        "object" === typeof console.log ? log.apply.call(console.log, console, b) : console.log.apply(console, b)
    }
};
(function (b) {
    function a() {}
    for (var k = "assert count debug dir dirxml error exception group groupCollapsed groupEnd info log markTimeline profile profileEnd time timeEnd trace warn".split(" "), l; l = k.pop();) b[l] = b[l] || a
})(function () {
    try {
        return console.log(), window.console
    } catch (b) {
        return window.console = {}
    }
}());
window.enquire = function (b) {
    function a(a, c) {
        var b, l = 0,
            k = a.length;
        for (l; k > l && (b = c(a[l], l), !1 !== b); l++);
    }

    function k(a) {
        this.options = a;
        !a.deferSetup && this.setup()
    }

    function l(a, c) {
        this.query = a;
        this.isUnconditional = c;
        this.handlers = [];
        this.mql = b(a);
        var l = this;
        this.listener = function (a) {
            l.mql = a;
            l.assess()
        };
        this.mql.addListener(this.listener)
    }

    function c() {
        if (!b) throw Error("matchMedia not present, legacy browsers require a polyfill");
        this.queries = {};
        this.browserIsIncapable = !b("only all").matches
    }
    return k.prototype = {
        setup: function () {
            this.options.setup && this.options.setup();
            this.initialised = !0
        },
        on: function () {
            !this.initialised && this.setup();
            this.options.match && this.options.match()
        },
        off: function () {
            this.options.unmatch && this.options.unmatch()
        },
        destroy: function () {
            this.options.destroy ? this.options.destroy() : this.off()
        },
        equals: function (a) {
            return this.options === a || this.options.match === a
        }
    }, l.prototype = {
        addHandler: function (a) {
            a = new k(a);
            this.handlers.push(a);
            this.mql.matches && a.on()
        },
        removeHandler: function (c) {
            var b = this.handlers;
            a(b, function (a, l) {
                return a.equals(c) ? (a.destroy(), !b.splice(l, 1)) : void 0
            })
        },
        clear: function () {
            a(this.handlers, function (a) {
                a.destroy()
            });
            this.mql.removeListener(this.listener);
            this.handlers.length = 0
        },
        assess: function () {
            var c = this.mql.matches || this.isUnconditional ? "on" : "off";
            a(this.handlers, function (a) {
                a[c]()
            })
        }
    }, c.prototype = {
        register: function (c, b, q) {
            var k = this.queries;
            q = q && this.browserIsIncapable;
            return k[c] || (k[c] = new l(c, q)), "function" == typeof b && (b = {
                match: b
            }), "[object Array]" === Object.prototype.toString.apply(b) ||
                (b = [b]), a(b, function (a) {
                k[c].addHandler(a)
            }), this
        },
        unregister: function (a, c) {
            var b = this.queries[a];
            return b && (c ? b.removeHandler(c) : (b.clear(), delete this.queries[a])), this
        }
    }, new c
}(window.matchMedia);
(function () {
    function b(a) {
        this.path = a;
        a = this.path.split(".");
        this.at_2x_path = a.slice(0, a.length - 1).join(".") + "@2x." + a[a.length - 1]
    }

    function a(a) {
        this.el = a;
        this.path = new b(this.el.getAttribute("src"));
        var c = this;
        this.path.check_2x_variant(function (a) {
            a && c.swap()
        })
    }
    var k = "undefined" == typeof exports ? window : exports;
    k.RetinaImagePath = b;
    b.confirmed_paths = [];
    b.prototype.is_external = function () {
        return !!this.path.match(/^https?\:/i) && !this.path.match("//" + document.domain)
    };
    b.prototype.check_2x_variant = function (a) {
        var c,
            f = this;
        if (this.is_external()) return a(!1);
        if (this.at_2x_path in b.confirmed_paths) return a(!0);
        c = new XMLHttpRequest;
        c.open("HEAD", this.at_2x_path);
        c.onreadystatechange = function () {
            return 4 != c.readyState ? a(!1) : 200 <= c.status && 399 >= c.status ? (b.confirmed_paths.push(f.at_2x_path), a(!0)) : a(!1)
        };
        c.send()
    };
    k.RetinaImage = a;
    a.prototype.swap = function (a) {
        function c() {
            b.el.complete ? (b.el.setAttribute("width", b.el.offsetWidth), b.el.setAttribute("height", b.el.offsetHeight), b.el.setAttribute("src", a)) : setTimeout(c,
                5)
        }
        "undefined" == typeof a && (a = this.path.at_2x_path);
        var b = this;
        c()
    };
    1 < k.devicePixelRatio && (window.onload = function () {
        var b = document.getElementsByTagName("img"),
            c = [],
            f, p;
        for (f = 0; f < b.length; f++) p = b[f], c.push(new a(p))
    })
})();
(function (b) {
    b.fn.extend({
        tabify: function (a) {
            function k(a) {
                hash = b(a).find("a").attr("href");
                return hash = hash.substring(0, hash.length - 4)
            }
            return this.each(function () {
                function l() {
                    if (location.hash && 0 < b(c).find("a[href=" + location.hash + "]").length) {
                        var a = b(c).find("a[href=" + location.hash + "]").parent();
                        b(a).addClass("active");
                        b(k(a)).show();
                        b(a).siblings("li").each(function () {
                            b(this).removeClass("active");
                            b(k(this)).hide()
                        })
                    }
                }
                var c = this,
                    f = {
                        ul: b(c)
                    };
                b(this).find("li a").each(function () {
                    b(this).attr("href",
                        b(this).attr("href") + "-tab")
                });
                location.hash && l();
                setInterval(l, 100);
                b(this).find("li").each(function () {
                    b(this).hasClass("active") ? b(k(this)).show() : b(k(this)).hide()
                });
                a && a(f)
            })
        }
    })
})(jQuery);
(function () {
    var b = [].indexOf || function (a) {
            for (var b = 0, l = this.length; b < l; b++)
                if (b in this && this[b] === a) return b;
            return -1
        }, a = [].slice;
    var k = this,
        l = function (c, f) {
            var l, q, k, t, w, s, m, h;
            l = c(f);
            w = 0 <= b.call(f, "ontouchstart");
            q = {
                horizontal: {},
                vertical: {}
            };
            k = 1;
            t = {};
            h = 1;
            var z = function (a) {
                var b = this;
                this.$element = a;
                this.element = a[0];
                this.didScroll = this.didResize = !1;
                this.id = "context" + k++;
                this.oldScroll = {
                    x: a.scrollLeft(),
                    y: a.scrollTop()
                };
                this.waypoints = {
                    horizontal: {},
                    vertical: {}
                };
                a.data("waypoints-context-id", this.id);
                t[this.id] = this;
                a.bind("scroll.waypoints", function () {
                    if (!b.didScroll && !w) return b.didScroll = !0, f.setTimeout(function () {
                        b.doScroll();
                        return b.didScroll = !1
                    }, c.waypoints.settings.scrollThrottle)
                });
                a.bind("resize.waypoints", function () {
                    if (!b.didResize) return b.didResize = !0, f.setTimeout(function () {
                        c.waypoints("refresh");
                        return b.didResize = !1
                    }, c.waypoints.settings.resizeThrottle)
                })
            };
            z.prototype.doScroll = function () {
                var a, b = this;
                a = {
                    horizontal: {
                        newScroll: this.$element.scrollLeft(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left"
                    },
                    vertical: {
                        newScroll: this.$element.scrollTop(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up"
                    }
                };
                w && (!a.vertical.oldScroll || !a.vertical.newScroll) && c.waypoints("refresh");
                c.each(a, function (a, e) {
                    var v, g, n;
                    n = [];
                    v = (g = e.newScroll > e.oldScroll) ? e.forward : e.backward;
                    c.each(b.waypoints[a], function (a, b) {
                        var j, c;
                        if (e.oldScroll < (j = b.offset) && j <= e.newScroll || e.newScroll < (c = b.offset) && c <= e.oldScroll) return n.push(b)
                    });
                    n.sort(function (a, b) {
                        return a.offset - b.offset
                    });
                    g || n.reverse();
                    return c.each(n, function (a, b) {
                        if (b.options.continuous || a === n.length - 1) return b.trigger([v])
                    })
                });
                return this.oldScroll = {
                    x: a.horizontal.newScroll,
                    y: a.vertical.newScroll
                }
            };
            z.prototype.refresh = function () {
                var a, b, j = this;
                b = c.isWindow(this.element);
                a = this.$element.offset();
                this.doScroll();
                a = {
                    horizontal: {
                        contextOffset: b ? 0 : a.left,
                        contextScroll: b ? 0 : this.oldScroll.x,
                        contextDimension: this.$element.width(),
                        oldScroll: this.oldScroll.x,
                        forward: "right",
                        backward: "left",
                        offsetProp: "left"
                    },
                    vertical: {
                        contextOffset: b ? 0 : a.top,
                        contextScroll: b ? 0 : this.oldScroll.y,
                        contextDimension: b ? c.waypoints("viewportHeight") : this.$element.height(),
                        oldScroll: this.oldScroll.y,
                        forward: "down",
                        backward: "up",
                        offsetProp: "top"
                    }
                };
                return c.each(a, function (a, b) {
                    return c.each(j.waypoints[a], function (a, j) {
                        var e, n, r, d, f;
                        e = j.options.offset;
                        r = j.offset;
                        n = c.isWindow(j.element) ? 0 : j.$element.offset()[b.offsetProp];
                        c.isFunction(e) ? e = e.apply(j.element) : "string" === typeof e && (e = parseFloat(e), -1 < j.options.offset.indexOf("%") && (e = Math.ceil(b.contextDimension *
                            e / 100)));
                        j.offset = n - b.contextOffset + b.contextScroll - e;
                        if (!(j.options.onlyOnScroll && null != r) && j.enabled) {
                            if (null !== r && r < (d = b.oldScroll) && d <= j.offset) return j.trigger([b.backward]);
                            if (null !== r && r > (f = b.oldScroll) && f >= j.offset || null === r && b.oldScroll >= j.offset) return j.trigger([b.forward])
                        }
                    })
                })
            };
            z.prototype.checkEmpty = function () {
                if (c.isEmptyObject(this.waypoints.horizontal) && c.isEmptyObject(this.waypoints.vertical)) return this.$element.unbind("resize.waypoints scroll.waypoints"), delete t[this.id]
            };
            var d =
                function (a, b, j) {
                    var e;
                    j = c.extend({}, c.fn.waypoint.defaults, j);
                    "bottom-in-view" === j.offset && (j.offset = function () {
                        var a;
                        a = c.waypoints("viewportHeight");
                        c.isWindow(b.element) || (a = b.$element.height());
                        return a - c(this).outerHeight()
                    });
                    this.$element = a;
                    this.element = a[0];
                    this.axis = j.horizontal ? "horizontal" : "vertical";
                    this.callback = j.handler;
                    this.context = b;
                    this.enabled = j.enabled;
                    this.id = "waypoints" + h++;
                    this.offset = null;
                    this.options = j;
                    b.waypoints[this.axis][this.id] = this;
                    q[this.axis][this.id] = this;
                    j = null !=
                        (e = a.data("waypoints-waypoint-ids")) ? e : [];
                    j.push(this.id);
                    a.data("waypoints-waypoint-ids", j)
            };
            d.prototype.trigger = function (a) {
                if (this.enabled && (null != this.callback && this.callback.apply(this.element, a), this.options.triggerOnce)) return this.destroy()
            };
            d.prototype.disable = function () {
                return this.enabled = !1
            };
            d.prototype.enable = function () {
                this.context.refresh();
                return this.enabled = !0
            };
            d.prototype.destroy = function () {
                delete q[this.axis][this.id];
                delete this.context.waypoints[this.axis][this.id];
                return this.context.checkEmpty()
            };
            d.getWaypointsByElement = function (a) {
                var b;
                a = c(a).data("waypoints-waypoint-ids");
                if (!a) return [];
                b = c.extend({}, q.horizontal, q.vertical);
                return c.map(a, function (a) {
                    return b[a]
                })
            };
            m = {
                init: function (a, b) {
                    null == b && (b = {});
                    null == b.handler && (b.handler = a);
                    this.each(function () {
                        var a, e, v;
                        a = c(this);
                        v = null != (e = b.context) ? e : c.fn.waypoint.defaults.context;
                        c.isWindow(v) || (v = a.closest(v));
                        v = c(v);
                        (e = t[v.data("waypoints-context-id")]) || (e = new z(v));
                        return new d(a, e, b)
                    });
                    c.waypoints("refresh");
                    return this
                },
                disable: function () {
                    return m._invoke(this,
                        "disable")
                },
                enable: function () {
                    return m._invoke(this, "enable")
                },
                destroy: function () {
                    return m._invoke(this, "destroy")
                },
                prev: function (a, b) {
                    return m._traverse.call(this, a, b, function (a, b, c) {
                        if (0 < b) return a.push(c[b - 1])
                    })
                },
                next: function (a, b) {
                    return m._traverse.call(this, a, b, function (a, b, c) {
                        if (b < c.length - 1) return a.push(c[b + 1])
                    })
                },
                _traverse: function (a, b, j) {
                    var e, v;
                    null == a && (a = "vertical");
                    null == b && (b = f);
                    v = s.aggregate(b);
                    e = [];
                    this.each(function () {
                        var b;
                        b = c.inArray(this, v[a]);
                        return j(e, b, v[a])
                    });
                    return this.pushStack(e)
                },
                _invoke: function (a, b) {
                    a.each(function () {
                        var a;
                        a = d.getWaypointsByElement(this);
                        return c.each(a, function (a, j) {
                            j[b]();
                            return !0
                        })
                    });
                    return this
                }
            };
            c.fn.waypoint = function () {
                var b, d;
                d = arguments[0];
                b = 2 <= arguments.length ? a.call(arguments, 1) : [];
                return m[d] ? m[d].apply(this, b) : c.isFunction(d) ? m.init.apply(this, arguments) : c.isPlainObject(d) ? m.init.apply(this, [null, d]) : d ? c.error("The " + d + " method does not exist in jQuery Waypoints.") : c.error("jQuery Waypoints needs a callback function or handler option.")
            };
            c.fn.waypoint.defaults = {
                context: f,
                continuous: !0,
                enabled: !0,
                horizontal: !1,
                offset: 0,
                triggerOnce: !1
            };
            s = {
                refresh: function () {
                    return c.each(t, function (a, b) {
                        return b.refresh()
                    })
                },
                viewportHeight: function () {
                    var a;
                    return null != (a = f.innerHeight) ? a : l.height()
                },
                aggregate: function (a) {
                    var b, j, e;
                    b = q;
                    a && (b = null != (e = t[c(a).data("waypoints-context-id")]) ? e.waypoints : void 0);
                    if (!b) return [];
                    j = {
                        horizontal: [],
                        vertical: []
                    };
                    c.each(j, function (a, e) {
                        c.each(b[a], function (a, b) {
                            return e.push(b)
                        });
                        e.sort(function (a, b) {
                            return a.offset - b.offset
                        });
                        j[a] =
                            c.map(e, function (a) {
                                return a.element
                            });
                        return j[a] = c.unique(j[a])
                    });
                    return j
                },
                above: function (a) {
                    null == a && (a = f);
                    return s._filter(a, "vertical", function (a, b) {
                        return b.offset <= a.oldScroll.y
                    })
                },
                below: function (a) {
                    null == a && (a = f);
                    return s._filter(a, "vertical", function (a, b) {
                        return b.offset > a.oldScroll.y
                    })
                },
                left: function (a) {
                    null == a && (a = f);
                    return s._filter(a, "horizontal", function (a, b) {
                        return b.offset <= a.oldScroll.x
                    })
                },
                right: function (a) {
                    null == a && (a = f);
                    return s._filter(a, "horizontal", function (a, b) {
                        return b.offset >
                            a.oldScroll.x
                    })
                },
                enable: function () {
                    return s._invoke("enable")
                },
                disable: function () {
                    return s._invoke("disable")
                },
                destroy: function () {
                    return s._invoke("destroy")
                },
                extendFn: function (a, b) {
                    return m[a] = b
                },
                _invoke: function (a) {
                    var b;
                    b = c.extend({}, q.vertical, q.horizontal);
                    return c.each(b, function (b, c) {
                        c[a]();
                        return !0
                    })
                },
                _filter: function (a, b, j) {
                    var e, d;
                    e = t[c(a).data("waypoints-context-id")];
                    if (!e) return [];
                    d = [];
                    c.each(e.waypoints[b], function (a, b) {
                        if (j(e, b)) return d.push(b)
                    });
                    d.sort(function (a, b) {
                        return a.offset -
                            b.offset
                    });
                    return c.map(d, function (a) {
                        return a.element
                    })
                }
            };
            c.waypoints = function () {
                var b, c;
                c = arguments[0];
                b = 2 <= arguments.length ? a.call(arguments, 1) : [];
                return s[c] ? s[c].apply(null, b) : s.aggregate.call(null, c)
            };
            c.waypoints.settings = {
                resizeThrottle: 100,
                scrollThrottle: 30
            };
            return l.load(function () {
                return c.waypoints("refresh")
            })
        };
    "function" === typeof define && define.amd ? define("waypoints", ["jquery"], function (a) {
        return l(a, k)
    }) : l(k.jQuery, k)
}).call(this);
(function (b) {
    b.fn.fitText = function (a, k) {
        var l = a || 1,
            c = b.extend({
                minFontSize: Number.NEGATIVE_INFINITY,
                maxFontSize: Number.POSITIVE_INFINITY
            }, k);
        return this.each(function () {
            var a = b(this),
                p = function () {
                    a.css("font-size", Math.max(Math.min(a.width() / (10 * l), parseFloat(c.maxFontSize)), parseFloat(c.minFontSize)))
                };
            p();
            b(window).on("resize.fittext orientationchange.fittext", p)
        })
    }
})(jQuery);

function Swipe(b, a) {
    function k() {
        r = n.children;
        v = r.length;
        2 > r.length && (a.continuous = !1);
        d.transitions && (a.continuous && 3 > r.length) && (n.appendChild(r[0].cloneNode(!0)), n.appendChild(n.children[1].cloneNode(!0)), r = n.children);
        j = Array(r.length);
        e = b.getBoundingClientRect().width || b.offsetWidth;
        n.style.width = r.length * e + "px";
        for (var G = r.length; G--;) {
            var f = r[G];
            f.style.width = e + "px";
            f.setAttribute("data-index", G);
            d.transitions && (f.style.left = G * -e + "px", p(G, g > G ? -e : g < G ? e : 0, 0))
        }
        a.continuous && d.transitions && (p(c(g -
            1), -e, 0), p(c(g + 1), e, 0));
        d.transitions || (n.style.left = g * -e + "px");
        b.style.visibility = "visible"
    }

    function l() {
        a.continuous ? f(g + 1) : g < r.length - 1 && f(g + 1)
    }

    function c(a) {
        return (r.length + a % r.length) % r.length
    }

    function f(b, v) {
        if (g != b) {
            if (d.transitions) {
                var f = Math.abs(g - b) / (g - b);
                if (a.continuous) {
                    var h = f,
                        f = -j[c(b)] / e;
                    f !== h && (b = -f * r.length + b)
                }
                for (h = Math.abs(g - b) - 1; h--;) p(c((b > g ? b : g) - h - 1), e * f, 0);
                b = c(b);
                p(g, e * f, v || x);
                p(b, 0, v || x);
                a.continuous && p(c(b - f), -(e * f), 0)
            } else {
                b = c(b);
                var k = g * -e,
                    q = b * -e,
                    m = v || x;
                if (m) var F = +new Date,
                u = setInterval(function () {
                    var b = +new Date - F;
                    b > m ? (n.style.left = q + "px", B && (C = setTimeout(l, B)), a.transitionEnd && a.transitionEnd.call(event, g, r[g]), clearInterval(u)) : n.style.left = (q - k) * (Math.floor(100 * (b / m)) / 100) + k + "px"
                }, 4);
                else n.style.left = q + "px"
            }
            g = b;
            f = a.callback && a.callback(g, r[g]);
            setTimeout(f || t, 0)
        }
    }

    function p(a, b, c) {
        q(a, b, c);
        j[a] = b
    }

    function q(a, b, c) {
        if (a = (a = r[a]) && a.style) a.webkitTransitionDuration = a.MozTransitionDuration = a.msTransitionDuration = a.OTransitionDuration = a.transitionDuration = c + "ms", a.webkitTransform =
            "translate(" + b + "px,0)translateZ(0)", a.msTransform = a.MozTransform = a.OTransform = "translateX(" + b + "px)"
    }

    function u() {
        B = 0;
        clearTimeout(C)
    }
    var t = function () {}, w = !! window.addEventListener,
        s = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch,
        m;
    a: {
        m = document.createElement("swipe");
        var h = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"],
            z;
        for (z in h)
            if (void 0 !== m.style[h[z]]) {
                m = !0;
                break a
            }
        m = !1
    }
    var d = {
        addEventListener: w,
        touch: s,
        transitions: m
    };
    if (b) {
        var n = b.children[0],
            r, j, e, v;
        a = a || {};
        var g = parseInt(a.startSlide, 10) || 0,
            x = a.speed || 300;
        a.continuous = void 0 !== a.continuous ? a.continuous : !0;
        var B = a.auto || 0,
            C, D, F, I, y, H, E, A = {
                handleEvent: function (b) {
                    switch (b.type) {
                    case "touchstart":
                        this.start(b);
                        break;
                    case "touchmove":
                        this.move(b);
                        break;
                    case "touchend":
                        var c = this.end(b);
                        setTimeout(c || t, 0);
                        break;
                    case "webkitTransitionEnd":
                    case "msTransitionEnd":
                    case "oTransitionEnd":
                    case "otransitionend":
                    case "transitionend":
                        c = this.transitionEnd(b);
                        setTimeout(c ||
                            t, 0);
                        break;
                    case "resize":
                        c = k.call(), setTimeout(c || t, 0)
                    }
                    a.stopPropagation && b.stopPropagation()
                },
                start: function (a) {
                    a = a.touches[0];
                    D = a.pageX;
                    F = a.pageY;
                    I = +new Date;
                    H = y = E = void 0;
                    n.addEventListener("touchmove", this, !1);
                    n.addEventListener("touchend", this, !1)
                },
                move: function (b) {
                    if (!(1 < b.touches.length || b.scale && 1 !== b.scale)) {
                        a.disableScroll && b.preventDefault();
                        var d = b.touches[0];
                        y = d.pageX - D;
                        H = d.pageY - F;
                        "undefined" == typeof E && (E = !! (E || Math.abs(y) < Math.abs(H)));
                        E || (b.preventDefault(), u(), a.continuous ? (q(c(g -
                            1), y + j[c(g - 1)], 0), q(g, y + j[g], 0), q(c(g + 1), y + j[c(g + 1)], 0)) : (y /= !g && 0 < y || g == r.length - 1 && 0 > y ? Math.abs(y) / e + 1 : 1, q(g - 1, y + j[g - 1], 0), q(g, y + j[g], 0), q(g + 1, y + j[g + 1], 0)))
                    }
                },
                end: function () {
                    var b = 250 > Number(+new Date - I) && 20 < Math.abs(y) || Math.abs(y) > e / 2,
                        d = !g && 0 < y || g == r.length - 1 && 0 > y;
                    a.continuous && (d = !1);
                    var f = 0 > y;
                    E || (b && !d ? (f ? (a.continuous ? (p(c(g - 1), -e, 0), p(c(g + 2), e, 0)) : p(g - 1, -e, 0), p(g, j[g] - e, x), p(c(g + 1), j[c(g + 1)] - e, x), g = c(g + 1)) : (a.continuous ? (p(c(g + 1), e, 0), p(c(g - 2), -e, 0)) : p(g + 1, e, 0), p(g, j[g] + e, x), p(c(g - 1), j[c(g -
                        1)] + e, x), g = c(g - 1)), a.callback && a.callback(g, r[g])) : a.continuous ? (p(c(g - 1), -e, x), p(g, 0, x), p(c(g + 1), e, x)) : (p(g - 1, -e, x), p(g, 0, x), p(g + 1, e, x)));
                    n.removeEventListener("touchmove", A, !1);
                    n.removeEventListener("touchend", A, !1)
                },
                transitionEnd: function (b) {
                    parseInt(b.target.getAttribute("data-index"), 10) == g && (B && (C = setTimeout(l, B)), a.transitionEnd && a.transitionEnd.call(b, g, r[g]))
                }
            };
        k();
        B && (C = setTimeout(l, B));
        d.addEventListener ? (d.touch && n.addEventListener("touchstart", A, !1), d.transitions && (n.addEventListener("webkitTransitionEnd",
            A, !1), n.addEventListener("msTransitionEnd", A, !1), n.addEventListener("oTransitionEnd", A, !1), n.addEventListener("otransitionend", A, !1), n.addEventListener("transitionend", A, !1)), window.addEventListener("resize", A, !1)) : window.onresize = function () {
            k()
        };
        return {
            setup: function () {
                k()
            },
            slide: function (a, b) {
                u();
                f(a, b)
            },
            prev: function () {
                u();
                a.continuous ? f(g - 1) : g && f(g - 1)
            },
            next: function () {
                u();
                l()
            },
            getPos: function () {
                return g
            },
            getNumSlides: function () {
                return v
            },
            kill: function () {
                u();
                n.style.width = "auto";
                n.style.left = 0;
                for (var a = r.length; a--;) {
                    var b = r[a];
                    b.style.width = "100%";
                    b.style.left = 0;
                    d.transitions && q(a, 0, 0)
                }
                d.addEventListener ? (n.removeEventListener("touchstart", A, !1), n.removeEventListener("webkitTransitionEnd", A, !1), n.removeEventListener("msTransitionEnd", A, !1), n.removeEventListener("oTransitionEnd", A, !1), n.removeEventListener("otransitionend", A, !1), n.removeEventListener("transitionend", A, !1), window.removeEventListener("resize", A, !1)) : window.onresize = null
            }
        }
    }
}
if (window.jQuery || window.Zepto)(function (b) {
    b.fn.Swipe = function (a) {
        return this.each(function () {
            b(this).data("Swipe", new Swipe(b(this)[0], a))
        })
    }
})(window.jQuery || window.Zepto);
(function (b, a, k) {
    b.fn.responsiveSlides = function (l) {
        var c = b.extend({
            auto: !0,
            speed: 500,
            timeout: 4E3,
            pager: !1,
            nav: !1,
            random: !1,
            pause: !1,
            pauseControls: !0,
            prevText: "Previous",
            nextText: "Next",
            maxwidth: "",
            navContainer: "",
            manualControls: "",
            namespace: "rslides",
            before: b.noop,
            after: b.noop
        }, l);
        return this.each(function () {
            k++;
            var f = b(this),
                p, q, u, t, w, s, m = 0,
                h = f.children(),
                z = h.size(),
                d = parseFloat(c.speed),
                n = parseFloat(c.timeout),
                r = parseFloat(c.maxwidth),
                j = c.namespace,
                e = j + k,
                v = j + "_nav " + e + "_nav",
                g = j + "_here",
                x = e + "_on",
                B = e + "_s",
                C = b("<ul class='" + j + "_tabs " + e + "_tabs' />"),
                D = {
                    "float": "left",
                    position: "relative",
                    opacity: 1,
                    zIndex: 2
                }, F = {
                    "float": "none",
                    position: "absolute",
                    opacity: 0,
                    zIndex: 1
                }, I = function () {
                    var a = (document.body || document.documentElement).style,
                        b = "transition";
                    if ("string" === typeof a[b]) return !0;
                    p = ["Moz", "Webkit", "Khtml", "O", "ms"];
                    var b = b.charAt(0).toUpperCase() + b.substr(1),
                        c;
                    for (c = 0; c < p.length; c++)
                        if ("string" === typeof a[p[c] + b]) return !0;
                    return !1
                }(),
                y = function (a) {
                    c.before(a);
                    I ? (h.removeClass(x).css(F).eq(a).addClass(x).css(D),
                        m = a, setTimeout(function () {
                            c.after(a)
                        }, d)) : h.stop().fadeOut(d, function () {
                        b(this).removeClass(x).css(F).css("opacity", 1)
                    }).eq(a).fadeIn(d, function () {
                        b(this).addClass(x).css(D);
                        c.after(a);
                        m = a
                    })
                };
            c.random && (h.sort(function () {
                return Math.round(Math.random()) - 0.5
            }), f.empty().append(h));
            h.each(function (a) {
                this.id = B + a
            });
            f.addClass(j + " " + e);
            l && l.maxwidth && f.css("max-width", r);
            h.hide().css(F).eq(0).addClass(x).css(D).show();
            I && h.show().css({
                "-webkit-transition": "opacity " + d + "ms ease-in-out",
                "-moz-transition": "opacity " + d + "ms ease-in-out",
                "-o-transition": "opacity " + d + "ms ease-in-out",
                transition: "opacity " + d + "ms ease-in-out"
            });
            if (1 < h.size()) {
                if (n < d + 100) return;
                if (c.pager && !c.manualControls) {
                    var H = [];
                    h.each(function (a) {
                        a += 1;
                        H += "<li><a href='#' class='" + B + a + "'>" + a + "</a></li>"
                    });
                    C.append(H);
                    l.navContainer ? b(c.navContainer).append(C) : f.after(C)
                }
                c.manualControls && (C = b(c.manualControls), C.addClass(j + "_tabs " + e + "_tabs"));
                (c.pager || c.manualControls) && C.find("li").each(function (a) {
                    b(this).addClass(B + (a + 1))
                });
                if (c.pager || c.manualControls) s =
                    C.find("a"), q = function (a) {
                        s.closest("li").removeClass(g).eq(a).addClass(g)
                };
                c.auto && (u = function () {
                    w = setInterval(function () {
                        h.stop(!0, !0);
                        var a = m + 1 < z ? m + 1 : 0;
                        (c.pager || c.manualControls) && q(a);
                        y(a)
                    }, n)
                }, u());
                t = function () {
                    c.auto && (clearInterval(w), u())
                };
                c.pause && f.hover(function () {
                    clearInterval(w)
                }, function () {
                    t()
                });
                if (c.pager || c.manualControls) s.bind("click", function (a) {
                    a.preventDefault();
                    c.pauseControls || t();
                    a = s.index(this);
                    m === a || b("." + x).queue("fx").length || (q(a), y(a))
                }).eq(0).closest("li").addClass(g),
                c.pauseControls && s.hover(function () {
                    clearInterval(w)
                }, function () {
                    t()
                });
                if (c.nav) {
                    j = "<a href='#' class='" + v + " prev'>" + c.prevText + "</a><a href='#' class='" + v + " next'>" + c.nextText + "</a>";
                    l.navContainer ? b(c.navContainer).append(j) : f.after(j);
                    var e = b("." + e + "_nav"),
                        E = e.filter(".prev");
                    e.bind("click", function (a) {
                        a.preventDefault();
                        a = b("." + x);
                        if (!a.queue("fx").length) {
                            var j = h.index(a);
                            a = j - 1;
                            j = j + 1 < z ? m + 1 : 0;
                            y(b(this)[0] === E[0] ? a : j);
                            if (c.pager || c.manualControls) q(b(this)[0] === E[0] ? a : j);
                            c.pauseControls || t()
                        }
                    });
                    c.pauseControls && e.hover(function () {
                        clearInterval(w)
                    }, function () {
                        t()
                    })
                }
            }
            if ("undefined" === typeof document.body.style.maxWidth && l.maxwidth) {
                var A = function () {
                    f.css("width", "100%");
                    f.width() > r && f.css("width", r)
                };
                A();
                b(a).bind("resize", function () {
                    A()
                })
            }
        })
    }
})(jQuery, this, 0);
(function (b) {
    b.picturefill = function () {
        for (var a = b.document.getElementsByTagName("div"), k = 0, l = a.length; l > k; k++)
            if (null !== a[k].getAttribute("data-picture")) {
                for (var c = a[k].getElementsByTagName("div"), f = [], p = 0, q = c.length; q > p; p++) {
                    var u = c[p].getAttribute("data-media");
                    (!u || b.matchMedia && b.matchMedia(u).matches) && f.push(c[p])
                }
                c = a[k].getElementsByTagName("img")[0];
                f.length ? (c || (c = b.document.createElement("img"), c.alt = a[k].getAttribute("data-alt"), a[k].appendChild(c)), c.src = f.pop().getAttribute("data-src")) :
                    c && a[k].removeChild(c)
            }
    };
    b.addEventListener ? (b.addEventListener("resize", b.picturefill, !1), b.addEventListener("DOMContentLoaded", function () {
        b.picturefill();
        b.removeEventListener("load", b.picturefill, !1)
    }, !1), b.addEventListener("load", b.picturefill, !1)) : b.attachEvent && b.attachEvent("onload", b.picturefill)
})(this);
(function (b) {
    function a(a) {
        return a.replace(/(:|\.)/g, "\\$1")
    }
    var k = function (a) {
        var c = [],
            f = !1,
            p = a.dir && "left" == a.dir ? "scrollLeft" : "scrollTop";
        return this.each(function () {
            if (this != document && this != window) {
                var a = b(this);
                0 < a[p]() ? c.push(this) : (a[p](1), f = 0 < a[p](), f && c.push(this), a[p](0))
            }
        }), c.length || this.each(function () {
            "BODY" === this.nodeName && (c = [this])
        }), "first" === a.el && 1 < c.length && (c = [c[0]]), c
    };
    b.fn.extend({
        scrollable: function (a) {
            a = k.call(this, {
                dir: a
            });
            return this.pushStack(a)
        },
        firstScrollable: function (a) {
            a =
                k.call(this, {
                    el: "first",
                    dir: a
                });
            return this.pushStack(a)
        },
        smoothScroll: function (l) {
            l = l || {};
            var c = b.extend({}, b.fn.smoothScroll.defaults, l),
                f = b.smoothScroll.filterPath(location.pathname);
            return this.unbind("click.smoothscroll").bind("click.smoothscroll", function (l) {
                var k = b(this),
                    u = c.exclude,
                    t = c.excludeWithin,
                    w = 0,
                    s = 0,
                    m = !0,
                    h = {}, z = location.hostname === this.hostname || !this.hostname,
                    d = c.scrollTarget || (b.smoothScroll.filterPath(this.pathname) || f) === f,
                    n = a(this.hash);
                if (c.scrollTarget || z && d && n) {
                    for (; m && u.length >
                        w;) k.is(a(u[w++])) && (m = !1);
                    for (; m && t.length > s;) k.closest(t[s++]).length && (m = !1)
                } else m = !1;
                m && (l.preventDefault(), b.extend(h, c, {
                    scrollTarget: c.scrollTarget || n,
                    link: this
                }), b.smoothScroll(h))
            }), this
        }
    });
    b.smoothScroll = function (a, c) {
        var f, k, q, u;
        u = 0;
        var t = "offset",
            w = "scrollTop",
            s = {};
        q = {};
        "number" == typeof a ? (f = b.fn.smoothScroll.defaults, q = a) : (f = b.extend({}, b.fn.smoothScroll.defaults, a || {}), f.scrollElement && (t = "position", "static" == f.scrollElement.css("position") && f.scrollElement.css("position", "relative")));
        f = b.extend({
            link: null
        }, f);
        w = "left" == f.direction ? "scrollLeft" : w;
        f.scrollElement ? (k = f.scrollElement, u = k[w]()) : k = b("html, body").firstScrollable();
        f.beforeScroll.call(k, f);
        q = "number" == typeof a ? a : c || b(f.scrollTarget)[t]() && b(f.scrollTarget)[t]()[f.direction] || 0;
        s[w] = q + u + f.offset;
        u = f.speed;
        "auto" === u && (u = s[w] || k.scrollTop(), u /= f.autoCoefficent);
        q = {
            duration: u,
            easing: f.easing,
            complete: function () {
                f.afterScroll.call(f.link, f)
            }
        };
        f.step && (q.step = f.step);
        k.length ? k.stop().animate(s, q) : f.afterScroll.call(f.link,
            f)
    };
    b.smoothScroll.version = "1.4.10";
    b.smoothScroll.filterPath = function (a) {
        return a.replace(/^\//, "").replace(/(index|default).[a-zA-Z]{3,4}$/, "").replace(/\/$/, "")
    };
    b.fn.smoothScroll.defaults = {
        exclude: [],
        excludeWithin: [],
        offset: 0,
        direction: "top",
        scrollElement: null,
        scrollTarget: null,
        beforeScroll: function () {},
        afterScroll: function () {},
        easing: "swing",
        speed: 400,
        autoCoefficent: 2
    }
})(jQuery);
(function (b) {
    b.isScrollToFixed = function (a) {
        return void 0 !== b(a).data("ScrollToFixed")
    };
    b.ScrollToFixed = function (a, k) {
        function l() {
            var a = h.options.limit;
            return !a ? 0 : "function" === typeof a ? a.apply(d) : a
        }

        function c() {
            return "fixed" === n
        }

        function f() {
            return "absolute" === n
        }

        function p() {
            c() || (B.css({
                    display: d.css("display"),
                    width: d.outerWidth(!0),
                    height: d.outerHeight(!0),
                    "float": d.css("float")
                }), cssOptions = {
                    position: "fixed",
                    top: -1 == h.options.bottom ? w() : "",
                    bottom: -1 == h.options.bottom ? "" : h.options.bottom,
                    "margin-left": "0px"
                },
                h.options.dontSetWidth || (cssOptions.width = d.width()), d.css(cssOptions), d.addClass("scroll-to-fixed-fixed"), h.options.className && d.addClass(h.options.className), n = "fixed")
        }

        function q() {
            var a = l(),
                b = v;
            h.options.removeOffsets && (b = 0, a -= e);
            cssOptions = {
                position: "absolute",
                top: a,
                left: b,
                "margin-left": "0px",
                bottom: ""
            };
            h.options.dontSetWidth || (cssOptions.width = d.width());
            d.css(cssOptions);
            n = "absolute"
        }

        function u() {
            if (c() || f()) x = -1, B.css("display", "none"), d.css({
                width: "",
                position: r,
                left: "",
                top: j.top,
                "margin-left": ""
            }),
            d.removeClass("scroll-to-fixed-fixed"), h.options.className && d.removeClass(h.options.className), n = null
        }

        function t(a) {
            a != x && (d.css("left", v - a), x = a)
        }

        function w() {
            var a = h.options.marginTop;
            return !a ? 0 : "function" === typeof a ? a.apply(d) : a
        }

        function s() {
            if (b.isScrollToFixed(d)) {
                var a = z;
                z || (d.trigger("preUnfixed.ScrollToFixed"), u(), d.trigger("unfixed.ScrollToFixed"), x = -1, e = d.offset().top, v = d.offset().left, h.options.offsets && (v += d.offset().left - d.position().left), -1 == g && (g = v), n = d.css("position"), z = !0, -1 != h.options.bottom &&
                    (d.trigger("preFixed.ScrollToFixed"), p(), d.trigger("fixed.ScrollToFixed")));
                var j = b(window).scrollLeft(),
                    k = b(window).scrollTop(),
                    s = l();
                if (h.options.minWidth && b(window).width() < h.options.minWidth) {
                    if (c() || f() || !a) m(), d.trigger("preUnfixed.ScrollToFixed"), u(), d.trigger("unfixed.ScrollToFixed")
                } else if (-1 == h.options.bottom)
                    if (0 < s && k >= s - w()) {
                        if (!f() || !a) m(), d.trigger("preAbsolute.ScrollToFixed"), q(), d.trigger("unfixed.ScrollToFixed")
                    } else if (k >= e - w()) {
                    if (!c() || !a) m(), d.trigger("preFixed.ScrollToFixed"),
                    p(), x = -1, d.trigger("fixed.ScrollToFixed");
                    t(j)
                } else {
                    if (c() || f() || !a) m(), d.trigger("preUnfixed.ScrollToFixed"), u(), d.trigger("unfixed.ScrollToFixed")
                } else if (0 < s) {
                    a = k + b(window).height() - d.outerHeight(!0);
                    if (!(k = w())) k = h.options.bottom ? h.options.bottom : 0, k = -k;
                    a >= s - k ? c() && (m(), d.trigger("preUnfixed.ScrollToFixed"), "absolute" === r ? q() : u(), d.trigger("unfixed.ScrollToFixed")) : (c() || (m(), d.trigger("preFixed.ScrollToFixed"), p()), t(j), d.trigger("fixed.ScrollToFixed"))
                } else t(j)
            }
        }

        function m() {
            var a = d.css("position");
            "absolute" == a ? d.trigger("postAbsolute.ScrollToFixed") : "fixed" == a ? d.trigger("postFixed.ScrollToFixed") : d.trigger("postUnfixed.ScrollToFixed")
        }
        var h = this;
        h.$el = b(a);
        h.el = a;
        h.$el.data("ScrollToFixed", h);
        var z = !1,
            d = h.$el,
            n, r, j, e = 0,
            v = 0,
            g = -1,
            x = -1,
            B = null,
            C = function () {
                d.is(":visible") && (z = !1, s())
            }, D = function () {
                s()
            };
        h.init = function () {
            h.options = b.extend({}, b.ScrollToFixed.defaultOptions, k);
            h.$el.css("z-index", h.options.zIndex);
            B = b("<div />");
            n = d.css("position");
            r = d.css("position");
            j = b.extend({}, d.offset());
            !c() && !f() && h.$el.after(B);
            b(window).bind("resize.ScrollToFixed", C);
            b(window).bind("scroll.ScrollToFixed", D);
            h.options.preFixed && d.bind("preFixed.ScrollToFixed", h.options.preFixed);
            h.options.postFixed && d.bind("postFixed.ScrollToFixed", h.options.postFixed);
            h.options.preUnfixed && d.bind("preUnfixed.ScrollToFixed", h.options.preUnfixed);
            h.options.postUnfixed && d.bind("postUnfixed.ScrollToFixed", h.options.postUnfixed);
            h.options.preAbsolute && d.bind("preAbsolute.ScrollToFixed", h.options.preAbsolute);
            h.options.postAbsolute &&
                d.bind("postAbsolute.ScrollToFixed", h.options.postAbsolute);
            h.options.fixed && d.bind("fixed.ScrollToFixed", h.options.fixed);
            h.options.unfixed && d.bind("unfixed.ScrollToFixed", h.options.unfixed);
            h.options.spacerClass && B.addClass(h.options.spacerClass);
            d.bind("resize.ScrollToFixed", function () {
                B.height(d.height())
            });
            d.bind("scroll.ScrollToFixed", function () {
                d.trigger("preUnfixed.ScrollToFixed");
                u();
                d.trigger("unfixed.ScrollToFixed");
                s()
            });
            d.bind("detach.ScrollToFixed", function (a) {
                a = a || window.event;
                a.preventDefault &&
                    a.preventDefault();
                a.returnValue = !1;
                d.trigger("preUnfixed.ScrollToFixed");
                u();
                d.trigger("unfixed.ScrollToFixed");
                b(window).unbind("resize.ScrollToFixed", C);
                b(window).unbind("scroll.ScrollToFixed", D);
                d.unbind(".ScrollToFixed");
                h.$el.removeData("ScrollToFixed")
            });
            C()
        };
        h.init()
    };
    b.ScrollToFixed.defaultOptions = {
        marginTop: 0,
        limit: 0,
        bottom: -1,
        zIndex: 1E3
    };
    b.fn.scrollToFixed = function (a) {
        return this.each(function () {
            new b.ScrollToFixed(this, a)
        })
    }
})(jQuery);
(function (b) {
    var a, k = function () {}, l = !! window.jQuery,
        c, f = b(window),
        p, q, u, t, w, s = function (a, c, d, g) {
            var f = document.createElement("div");
            return f.className = "mfp-" + a, d && (f.innerHTML = d), g ? c && c.appendChild(f) : (f = b(f), c && f.appendTo(c)), f
        }, m = function (c, e) {
            a.ev.triggerHandler("mfp" + c, e);
            a.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1), a.st.callbacks[c] && a.st.callbacks[c].apply(a, b.isArray(e) ? e : [e]))
        }, h = function () {
            (a.st.focus ? a.content.find(a.st.focus).eq(0) : a.wrap).focus()

        }, z = function (c) {
            if (c !== w || !a.currTemplate.closeBtn) a.currTemplate.closeBtn =
                b(a.st.closeMarkup.replace("%title%", a.st.tClose)), w = c;
            return a.currTemplate.closeBtn
        }, d = function () {
            b.magnificPopup.instance || (a = new k, a.init(), b.magnificPopup.instance = a)
        }, n = function (c) {
            if (!b(c).hasClass("mfp-prevent-close")) {
                var e = a.st.closeOnContentClick,
                    d = a.st.closeOnBgClick;
                if (e && d || !a.content || b(c).hasClass("mfp-close") || a.preloader && c === a.preloader[0]) return !0;
                if (c !== a.content[0] && !b.contains(a.content[0], c)) {
                    if (d) return !0
                } else if (e) return !0;
                return !1
            }
        };
    k.prototype = {
        constructor: k,
        init: function () {
            var c =
                navigator.appVersion;
            a.isIE7 = -1 !== c.indexOf("MSIE 7.");
            a.isIE8 = -1 !== c.indexOf("MSIE 8.");
            a.isLowIE = a.isIE7 || a.isIE8;
            a.isAndroid = /android/gi.test(c);
            a.isIOS = /iphone|ipad|ipod/gi.test(c);
            a.probablyMobile = a.isAndroid || a.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent);
            p = b(document.body);
            q = b(document);
            a.popupsCache = {}
        },
        open: function (c) {
            var e;
            if (!1 === c.isObj) {
                a.items = c.items.toArray();
                a.index = 0;
                var d = c.items,
                    g;
                for (e = 0; e < d.length; e++)
                    if (g = d[e],
                        g.parsed && (g = g.el[0]), g === c.el[0]) {
                        a.index = e;
                        break
                    }
            } else a.items = b.isArray(c.items) ? c.items : [c.items], a.index = c.index || 0; if (a.isOpen) a.updateItemHTML();
            else {
                a.types = [];
                t = "";
                a.ev = c.mainEl || q;
                c.key ? (a.popupsCache[c.key] || (a.popupsCache[c.key] = {}), a.currTemplate = a.popupsCache[c.key]) : a.currTemplate = {};
                a.st = b.extend(!0, {}, b.magnificPopup.defaults, c);
                a.fixedContentPos = "auto" === a.st.fixedContentPos ? !a.probablyMobile : a.st.fixedContentPos;
                a.bgOverlay || (a.bgOverlay = s("bg").on("click.mfp", function () {
                        a.close()
                    }),
                    a.wrap = s("wrap").attr("tabindex", -1).on("click.mfp", function (b) {
                        n(b.target) && a.close()
                    }), a.container = s("container", a.wrap));
                a.contentContainer = s("content");
                a.st.preloader && (a.preloader = s("preloader", a.container, a.st.tLoading));
                c = b.magnificPopup.modules;
                for (e = 0; e < c.length; e++) d = c[e], d = d.charAt(0).toUpperCase() + d.slice(1), a["init" + d].call(a);
                m("BeforeOpen");
                a.st.closeBtnInside ? (a.ev.on("mfpMarkupParse.mfp", function (a, b, c, e) {
                    c.close_replaceWith = z(e.type)
                }), t += " mfp-close-btn-in") : a.wrap.append(z());
                a.st.alignTop && (t += " mfp-align-top");
                a.fixedContentPos ? a.wrap.css({
                    overflow: a.st.overflowY,
                    overflowX: "hidden",
                    overflowY: a.st.overflowY
                }) : a.wrap.css({
                    top: f.scrollTop(),
                    position: "absolute"
                });
                (!1 === a.st.fixedBgPos || "auto" === a.st.fixedBgPos && !a.fixedContentPos) && a.bgOverlay.css({
                    height: q.height(),
                    position: "absolute"
                });
                q.on("keyup.mfp", function (b) {
                    27 === b.keyCode && a.close()
                });
                f.on("resize.mfp", function () {
                    a.updateSize()
                });
                a.st.closeOnContentClick || (t += " mfp-auto-cursor");
                t && a.wrap.addClass(t);
                e = a.wH = f.height();
                c = {};
                a.fixedContentPos && a._hasScrollBar(e) && (d = a._getScrollbarSize()) && (c.paddingRight = d);
                a.fixedContentPos && (a.isIE7 ? b("body, html").css("overflow", "hidden") : c.overflow = "hidden");
                d = a.st.mainClass;
                a.isIE7 && (d += " mfp-ie7");
                d && a._addClassToMFP(d);
                a.updateItemHTML();
                m("BuildControls");
                p.css(c);
                a.bgOverlay.add(a.wrap).prependTo(document.body);
                a._lastFocusedEl = document.activeElement;
                setTimeout(function () {
                    a.content ? (a._addClassToMFP("mfp-ready"), h()) : a.bgOverlay.addClass("mfp-ready");
                    q.on("focusin.mfp",
                        function (c) {
                            if (c.target !== a.wrap[0] && !b.contains(a.wrap[0], c.target)) return h(), !1
                        })
                }, 16);
                a.isOpen = !0;
                a.updateSize(e);
                m("Open")
            }
        },
        close: function () {
            a.isOpen && (a.isOpen = !1, a.st.removalDelay && !a.isLowIE ? (a._addClassToMFP("mfp-removing"), setTimeout(function () {
                a._close()
            }, a.st.removalDelay)) : a._close())
        },
        _close: function () {
            m("Close");
            var c = "mfp-removing mfp-ready ";
            a.bgOverlay.detach();
            a.wrap.detach();
            a.container.empty();
            a.st.mainClass && (c += a.st.mainClass + " ");
            a._removeClassFromMFP(c);
            a.fixedContentPos &&
                (c = {
                paddingRight: ""
            }, a.isIE7 ? b("body, html").css("overflow", "") : c.overflow = "", p.css(c));
            q.off("keyup.mfp focusin.mfp");
            a.ev.off(".mfp");
            a.wrap.attr("class", "mfp-wrap").removeAttr("style");
            a.bgOverlay.attr("class", "mfp-bg");
            a.container.attr("class", "mfp-container");
            (!a.st.closeBtnInside || !0 === a.currTemplate[a.currItem.type]) && a.currTemplate.closeBtn && a.currTemplate.closeBtn.detach();
            a._lastFocusedEl && b(a._lastFocusedEl).focus();
            a.currItem = null;
            a.content = null;
            a.currTemplate = null;
            a.prevHeight = 0;
            m("AfterClose")
        },
        updateSize: function (b) {
            a.isIOS ? (b = window.innerHeight * (document.documentElement.clientWidth / window.innerWidth), a.wrap.css("height", b), a.wH = b) : a.wH = b || f.height();
            a.fixedContentPos || a.wrap.css("height", a.wH);
            m("Resize")
        },
        updateItemHTML: function () {
            var c = a.items[a.index];
            a.contentContainer.detach();
            a.content && a.content.detach();
            c.parsed || (c = a.parseEl(a.index));
            var e = c.type;
            m("BeforeChange", [a.currItem ? a.currItem.type : "", e]);
            a.currItem = c;
            if (!a.currTemplate[e]) {
                var d = a.st[e] ? a.st[e].markup : !1;
                m("FirstMarkupParse",
                    d);
                d ? a.currTemplate[e] = b(d) : a.currTemplate[e] = !0
            }
            u && u !== c.type && a.container.removeClass("mfp-" + u + "-holder");
            d = a["get" + e.charAt(0).toUpperCase() + e.slice(1)](c, a.currTemplate[e]);
            a.appendContent(d, e);
            c.preloaded = !0;
            m("Change", c);
            u = c.type;
            a.container.prepend(a.contentContainer);
            m("AfterChange")
        },
        appendContent: function (b, c) {
            (a.content = b) ? a.st.closeBtnInside && !0 === a.currTemplate[c] ? a.content.find(".mfp-close").length || a.content.append(z()) : a.content = b : a.content = "";
            m("BeforeAppend");
            a.container.addClass("mfp-" +
                c + "-holder");
            a.contentContainer.append(a.content)
        },
        parseEl: function (c) {
            var e = a.items[c],
                d = e.type;
            e.tagName ? e = {
                el: b(e)
            } : e = {
                data: e,
                src: e.src
            };
            if (e.el) {
                for (var g = a.types, f = 0; f < g.length; f++)
                    if (e.el.hasClass("mfp-" + g[f])) {
                        d = g[f];
                        break
                    }
                e.src = e.el.attr("data-mfp-src");
                e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || a.st.type || "inline", e.index = c, e.parsed = !0, a.items[c] = e, m("ElementParse", e), a.items[c]
        },
        addGroup: function (b, c) {
            var d = function (d) {
                d.mfpEl = this;
                a._openClick(d, b, c)
            };
            c || (c = {});
            c.mainEl = b;
            c.items ?
                (c.isObj = !0, b.off("click.magnificPopup").on("click.magnificPopup", d)) : (c.isObj = !1, c.delegate ? b.off("click.magnificPopup").on("click.magnificPopup", c.delegate, d) : (c.items = b, b.off("click.magnificPopup").on("click.magnificPopup", d)))
        },
        _openClick: function (c, e, d) {
            if ((void 0 !== d.midClick ? d.midClick : b.magnificPopup.defaults.midClick) || 2 !== c.which) {
                var g = void 0 !== d.disableOn ? d.disableOn : b.magnificPopup.defaults.disableOn;
                if (g)
                    if (b.isFunction(g)) {
                        if (!g.call(a)) return !0
                    } else if (f.width() < g) return !0;
                c.type &&
                    (c.preventDefault(), a.isOpen && c.stopPropagation());
                d.el = b(c.mfpEl);
                d.delegate && (d.items = e.find(d.delegate));
                a.open(d)
            }
        },
        updateStatus: function (b, e) {
            if (a.preloader) {
                c !== b && a.container.removeClass("mfp-s-" + c);
                !e && "loading" === b && (e = a.st.tLoading);
                var d = {
                    status: b,
                    text: e
                };
                m("UpdateStatus", d);
                b = d.status;
                e = d.text;
                a.preloader.html(e);
                a.preloader.find("a").click(function (a) {
                    a.stopImmediatePropagation()
                });
                a.container.addClass("mfp-s-" + b);
                c = b
            }
        },
        _addClassToMFP: function (b) {
            a.bgOverlay.addClass(b);
            a.wrap.addClass(b)
        },
        _removeClassFromMFP: function (b) {
            this.bgOverlay.removeClass(b);
            a.wrap.removeClass(b)
        },
        _hasScrollBar: function (b) {
            return (a.isIE7 ? q.height() : document.body.scrollHeight) > (b || f.height())
        },
        _parseMarkup: function (a, c, d) {
            var f;
            d.data && (c = b.extend(d.data, c));
            m("MarkupParse", [a, c, d]);
            b.each(c, function (b, c) {
                if (void 0 === c || !1 === c) return !0;
                f = b.split("_");
                if (1 < f.length) {
                    var e = a.find(".mfp-" + f[0]);
                    if (0 < e.length) {
                        var d = f[1];
                        "replaceWith" === d ? e[0] !== c[0] && e.replaceWith(c) : "img" === d ? e.is("img") ? e.attr("src", c) : e.replaceWith('<img src="' +
                            c + '" class="' + e.attr("class") + '" />') : e.attr(f[1], c)
                    }
                } else a.find(".mfp-" + b).html(c)
            })
        },
        _getScrollbarSize: function () {
            if (void 0 === a.scrollbarSize) {
                var b = document.createElement("div");
                b.id = "mfp-sbm";
                b.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;";
                document.body.appendChild(b);
                a.scrollbarSize = b.offsetWidth - b.clientWidth;
                document.body.removeChild(b)
            }
            return a.scrollbarSize
        }
    };
    b.magnificPopup = {
        instance: null,
        proto: k.prototype,
        modules: [],
        open: function (a, b) {
            return d(),
            a || (a = {}), a.isObj = !0, a.index = b || 0, this.instance.open(a)
        },
        close: function () {
            return b.magnificPopup.instance.close()
        },
        registerModule: function (a, c) {
            c.options && (b.magnificPopup.defaults[a] = c.options);
            b.extend(this.proto, c.proto);
            this.modules.push(a)
        },
        defaults: {
            disableOn: 0,
            key: null,
            midClick: !1,
            mainClass: "",
            preloader: !0,
            focus: "",
            closeOnContentClick: !1,
            closeOnBgClick: !0,
            closeBtnInside: !0,
            alignTop: !1,
            removalDelay: 0,
            fixedContentPos: "auto",
            fixedBgPos: "auto",
            overflowY: "auto",
            closeMarkup: '<button title="%title%" type="button" class="mfp-close">&times;</button>',
            tClose: "Close (Esc)",
            tLoading: "Loading..."
        }
    };
    b.fn.magnificPopup = function (c) {
        d();
        var e = b(this);
        if ("string" == typeof c)
            if ("open" === c) {
                var f, g = l ? e.data("magnificPopup") : e[0].magnificPopup,
                    h = parseInt(arguments[1], 10) || 0;
                g.items ? f = g.items[h] : (f = e, g.delegate && (f = f.find(g.delegate)), f = f.eq(h));
                a._openClick({
                    mfpEl: f
                }, e, g)
            } else a.isOpen && a[c].apply(a, Array.prototype.slice.call(arguments, 1));
            else l ? e.data("magnificPopup", c) : e[0].magnificPopup = c, a.addGroup(e, c);
        return e
    };
    var r = function (b) {
        if (a.currTemplate.iframe) {
            var c =
                a.currTemplate.iframe.find("iframe");
            c.length && (b || (c[0].src = "//about:blank"), a.isIE8 && c.css("display", b ? "block" : "none"))
        }
    };
    b.magnificPopup.registerModule("iframe", {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function () {
                a.types.push("iframe");
                a.ev.on("mfpBeforeChange.mfp", function (a, b, c) {
                    b !== c && ("iframe" === b ? r() : "iframe" === c && r(!0))
                });
                a.ev.on("mfpClose.iframe.mfp", function () {
                    r()
                })
            },
            getIframe: function (c, d) {
                var f = c.src,
                    g = a.st.iframe;
                b.each(g.patterns, function () {
                    if (-1 < f.indexOf(this.index)) return this.id && ("string" == typeof this.id ? f = f.substr(f.lastIndexOf(this.id) + this.id.length, f.length) : f = this.id.call(this, f)), f = this.src.replace("%id%",
                        f), !1
                });
                var h = {};
                return g.srcAction && (h[g.srcAction] = f), a._parseMarkup(d, h, c), a.updateStatus("ready"), d
            }
        }
    })
})(window.jQuery || window.Zepto);
$(document).ready(function () {
    function f() {
        $("body").hasClass("menuActive") && $("body").removeClass("menuActive")
    }

    function e() {
        $("body").hasClass("menuActive") ? f() : $("body").addClass("menuActive")
    }
    $("a.tweet", this).bind("click", function (a) {
        a.preventDefault();
        a = $(this).attr("href");
        window.open(a, "twitterwindow", "height=450, width=550, top=" + ($(window).height() / 2 - 225) + ", left=" + $(window).width() / 2 + ", toolbar=0, location=0, menubar=0, directories=0, scrollbars=0");
        console.log("Thanks for sharing our content! Market Karma Karma Boost +10")
    });
    var a = document.referrer.split("/"),
        b = $(".greeting");
    b.length && ("t.co" === a[2] || "twitter.com" === a[2] ? b.text("Tweeter!") : "www.facebook.com" === a[2] || "m.facebook.com" === a[2] ? b.text("Facebooker!") : "www.google.com" === a[2] || "www.google.ca" === a[2] ? b.text("Googler!") : "moz.com" === a[2] ? b.text("Mozzer!") : "plus.url.google.com" === a[2] ? b.text("Google Pluser!") : "www.linkedin.com" === a[2] ? b.text("Linkediner!") : "unitb.ca" === a[2] ? b.text("Friend of Unit B!") : "adclubedm.com" === a[2] ? b.text("Ad Clubber!") : "arandomsampling.com" ===
        a[2] && b.text("Random Sampler!"));
    $(".tabMenu").tabify();
    $(".openLightbox").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1
    });
    $(".standAlonePage").fitText(0.4, {
        maxFontSize: "175px"
    });
    $("section.headerImage p.largeText").fitText(0.6, {
        maxFontSize: "75px"
    });
    $(".author .headerImage h1").fitText(0.8, {
        maxFontSize: "75px"
    });
    $(".blog .headerImage p, .single .headerImage p, .category .headerImage p, .error404 .headerImage p").fitText(0.3, {
        maxFontSize: "325px"
    });
    $(".error404 .headerImage h1").fitText(0.1, {
        maxFontSize: "425px"
    });
    $(".search .headerImage h1").fitText(0.3, {
        maxFontSize: "325px"
    });
    $(".headerImage h2").fitText(1.3, {
        maxFontSize: "50px"
    });
    $(".madProps h3").fitText(0.5, {
        maxFontSize: "40px"
    });
    windowHeight = 0.9 * $(window).innerHeight();
    $(".home .headerImage, .page .headerImage, .page-about .headerImage, .page-services .headerImage, .page-contact .headerImage, .error404 .headerImage").height(windowHeight);
    $('.home [role="main"], .page [role="main"], .page-about [role="main"], .page-services [role="main"], .page-contact [role="main"], .error404 [role="main"]').not('.page-groot-dermasurgery-case-study [role="main"]').css("padding-top",
        windowHeight + 20);
    $(window).resize(function () {
        windowHeight = 0.9 * $(window).innerHeight();
        $(".home .headerImage, .page .headerImage, .page-about .headerImage, .page-services .headerImage, .page-contact .headerImage, .error404 .headerImage").height(windowHeight);
        $('.home [role="main"], .page [role="main"],.page-about [role="main"], .page-services [role="main"], .page-contact [role="main"], .error404 [role="main"]').not('.page-groot-dermasurgery-case-study [role="main"]').css("padding-top", windowHeight +
            20)
    });
    a = document.getElementById("mySwipe");
    window.mySwipe1 = Swipe(a, {
        continuous: !0,
        stopPropagation: !1
    });
    a = document.getElementById("gossipSwipe");
    window.mySwipe2 = Swipe(a, {
        continuous: !0,
        stopPropagation: !1
    });
    var c = -1;
    $(".weLoveYou").each(function () {
        c = c > $(this).height() ? c : $(this).height()
    });
    $(".weLoveYou").each(function () {
        c != $(this).height() && (newHeight = (c - $(this).height()) / 2, $(this).children("p").css("padding-top", newHeight))
    });
    var d = -1;
    $(".weTalkCrazy").each(function () {
        d = d > $(this).height() ? d : $(this).height()
    });
    $(".weTalkCrazy").each(function () {
        d != $(this).height() && (newHeight2 = (d - $(this).height()) / 2, $(this).children("p").css("padding-top", newHeight2))
    });
    a = $(".psych");
    a.not(".fakeout").hide();
    a.click(function () {
        $(this).addClass("passed").fadeOut(1E3);
        $(this).next().delay(1001).fadeIn()
    });
    $(".mobileMenu, .mobileClose").click(function () {
        e();
        return !1
    });
    $(".mainNav li a").click(function () {
        e()
    });
    $(document).on("click", "body.menuActive .tabulaRasa", function () {
        f();
        return !1
    });
    $(document).keyup(function (a) {
        27 == a.keyCode &&
            f();
        37 == a.keyCode && ($("body").hasClass("menuActive") || e());
        39 == a.keyCode && $("body").hasClass("menuActive") && e()
    });
    if ("ontouchstart" in window || navigator.msMaxTouchPoints) $(".servicesNav ul a, h1.looksie a").smoothScroll({
        offset: -40,
        easing: "swing",
        speed: 1200
    });
    else {
        windowHeight = $(window).innerHeight();
        $(".servicesStroll article").not(".cmServices").css("margin-bottom", windowHeight);
        $(window).resize(function () {
            windowHeight = $(window).innerHeight();
            $(".servicesStroll article").not(".cmServices").css("margin-bottom",
                windowHeight)
        });
        var g = $(".servicesSticky");
        $(".servicesStroll").waypoint({
            handler: function (a) {
                "down" === a ? g.addClass("sticky") : g.removeClass("sticky")
            },
            offset: function () {
                return 76
            }
        });
        $("nav.servicesNav h2 a, h1.looksie a, body.page-contact h1 a").smoothScroll({
            offset: -75,
            easing: "swing",
            speed: 1200
        });
        $(".seoServices").waypoint(function (a) {
            "down" === a ? $(".seoNav").addClass("active") : $(".seoNav").removeClass("active")
        }, {
            offset: "100%"
        });
        $(".ppcServices").waypoint(function (a) {
            "down" === a ? ($(".services").removeClass("seoServices"),
                $(".services").addClass("ppcServices"), $(".seoNav").removeClass("active"), $(".ppcNav").addClass("active"), $(".servicesSticky .servicesDescription").html(function () {
                    return $("#ppc .servicesDescription").clone().contents()
                })) : ($(".services").removeClass("ppcServices"), $(".services").addClass("seoServices"), $(".ppcNav").removeClass("active"), $(".seoNav").addClass("active"), $(".servicesSticky .servicesDescription").html(function () {
                return $("#seo .servicesDescription").clone().contents()
            }))
        }, {
            offset: "100%"
        });
        $(".smServices").waypoint(function (a) {
            "down" === a ? ($(".services").removeClass("ppcServices"), $(".services").addClass("smServices"), $(".ppcNav").removeClass("active"), $(".smNav").addClass("active"), $(".servicesSticky .servicesDescription").html(function () {
                return $("#smm .servicesDescription").clone().contents()
            })) : ($(".services").removeClass("smServices"), $(".services").addClass("ppcServices"), $(".smNav").removeClass("active"), $(".ppcNav").addClass("active"), $(".servicesSticky .servicesDescription").html(function () {
                return $("#ppc .servicesDescription").clone().contents()
            }))
        }, {
            offset: "100%"
        });
        $(".cmServices").waypoint(function (a) {
            "down" === a ? ($(".services").removeClass("smServices"), $(".services").addClass("cmServices"), $(".smNav").removeClass("active"), $(".cmNav").addClass("active"), $(".servicesSticky .servicesDescription").html(function () {
                return $("#cm .servicesDescription").clone().contents()
            })) : ($(".services").removeClass("cmServices"), $(".services").addClass("smServices"), $(".cmNav").removeClass("active"), $(".smNav").addClass("active"), $(".servicesSticky .servicesDescription").html(function () {
                return $("#smm .servicesDescription").clone().contents()
            }))
        }, {
            offset: "100%"
        })
    }
    enquire.register("screen and (max-width:767px)", {
        match: function () {},
        unmatch: function () {}
    }).register("screen and (min-width:768px)", {
        match: function () {},
        unmatch: function () {}
    })
});