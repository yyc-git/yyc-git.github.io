(function () {
    YE.Hash = YYC.Class({
        Init: function () {
            this.ye_childs = {};
        },
        Private: {
            ye_childs: null
        },
        Public: {
            getChilds: function () {
                return this.ye_childs;
            },
            getValue: function (key) {
                return this.ye_childs[key];
            },
            add: function (key, value) {
                this.ye_childs[key] = value;

                return this;
            },
            append: function (key, value) {
                if (YE.Tool.judge.isArray(this.ye_childs[key])) {
                    this.ye_childs[key].push(value);
                }
                else {
                    this.ye_childs[key] = [value];
                }

                return this;
            },
            remove: function (key) {
                this.ye_childs[key] = undefined;
            },
            hasChild: function (key) {
                return !!this.ye_childs[key];
            },
//            /**
//             * 迭代调用集合内元素的方法
//             * @param handler 调用的方法名
//             * @param args 可以是多个参数
//             */
//            iterate: function (handler, args) {
//                var args = Array.prototype.slice.call(arguments, 1),
//                    i = null,
//                    layers = this.getChilds();
//
//                for (i in layers) {
//                    if (layers.hasOwnProperty(i)) {
//                        layers[i][handler].apply(layers[i], args);
//                    }
//                }
//            },
            forEach: function (fn, context) {
                var i = null,
                    layers = this.getChilds();

                for (i in layers) {
                    if (layers.hasOwnProperty(i)) {
                        if (fn.call(context, layers[i], i) === $break) {
                            break;
                        }
                    }
                }
            },
            map: function (handlerName, argArr) {
                var i = null,
                    layers = this.getChilds();

                for (i in layers) {
                    if (layers.hasOwnProperty(i)) {
                        layers[i][handlerName].apply(layers[i], argArr);
                    }
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