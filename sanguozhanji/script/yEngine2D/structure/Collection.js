(function () {
    //*使用迭代器模式

//    var IIterator = YYC.Interface("hasNext", "next", "resetCursor");


    YE.Collection = YYC.Class({
        Init: function () {
            this.ye_childs = [];
        },
        Private: {
            //当前游标
            ye_cursor: 0,
            ye_childs: null
        },
        Public: {
            getCount: function () {
                return this.ye_childs.length;
            },
            sort: function (func) {
                this.ye_childs.sort(func);
            },
            hasChild: function (child) {
                var func = null;

                if (YE.Tool.judge.isFunction(arguments[0])) {
                    func = arguments[0];

                    return this.ye_childs.contain(function (c, i) {
                        return func(c, i);
                    });
                }

                return this.ye_childs.contain(function (c, i) {
                    if (c === child ||
                        (c.getUid && child.getUid && c.getUid() === child.getUid())) {
                        return true;
                    }
                    else {
                        return false;
                    }
                });
            },
            getChilds: function () {
                return this.ye_childs;
            },
            getChildAt: function (index) {
                return this.ye_childs[index];
            },
            addChild: function (child) {
                this.ye_childs.push(child);

                return this;
            },
            addChilds: function (childs) {
                var i = 0,
                    len = 0;

                if (!YE.Tool.judge.isArray(childs)) {
                    this.addChild(childs);
                }
                else {
                    for (i = 0, len = childs.length; i < len; i++) {
                        this.addChild(childs[i]);
                    }
                }

                return this;
            },
            removeAll: function () {
                this.ye_childs = [];
                this.ye_cursor = 0;
            },
//            hasNext: function () {
//                if (this.ye_cursor >= this.ye_childs.length) {
//                    return false;
//                }
//                else {
//                    return true;
//                }
//            },
//            next: function () {
//                var result = null;
//
//                if (this.hasNext()) {
//                    result = this.ye_childs[this.ye_cursor];
//                    this.ye_cursor += 1;
//                }
//                else {
//                    result = null;
//                }
//
//                return result;
//            },
//            resetCursor: function () {
//                this.ye_cursor = 0;
//            },
//            iterate: function (handlerName, args) {
//                this.resetCursor();
//
//                var args = Array.prototype.slice.call(arguments, 1);
//                var nextElement = null;
//
//                if (YE.Tool.judge.isFunction(arguments[0])) {
//                    var func = arguments[0];
//
//                    while (this.hasNext()) {
//                        nextElement = this.next();
//                        func.apply(nextElement, [nextElement].concat(args));
//                    }
//                    this.resetCursor();
//                }
//                else {
//                    while (this.hasNext()) {
//                        nextElement = this.next();
//                        nextElement[handlerName].apply(nextElement, args);
//                    }
//                    this.resetCursor();
//                }
//            },
            forEach: function (fn, context) {
                this.ye_childs.forEach.apply(this.ye_childs, arguments);
            },
            map: function (handlerName, argArr) {
                this.ye_childs.map.apply(this.ye_childs, arguments);
            },
            filter: function (func) {
                return this.ye_childs.filter(func, this.ye_childs);
            },
            removeAt: function (index) {
                YE.error(index < 0, "序号必须大于等于0");

                this.ye_childs.splice(index, 1);
            },
            copy: function () {
                return YE.Tool.extend.extendDeep(this.ye_childs);
            },
            reverse: function () {
                this.ye_childs.reverse();
            },
            remove: function (obj, target) {
                if (YE.Tool.judge.isFunction(obj)) {
                    return this.ye_childs.remove(obj, target);
                }
                else if (obj.isInstanceOf && obj.isInstanceOf(YE.Entity)) {
                    return this.ye_childs.remove(function (e) {
                        return e.getUid() === obj.getUid();
                    });
                }
                else {
                    return this.ye_childs.remove(function (e) {
                        return e === obj;
                    });
                }
            }
        },
        Static: {
            create: function () {
                return new this();
            }
        }
    });
}());