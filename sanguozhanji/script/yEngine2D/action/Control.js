/**YEngine2D 控制动作基类
 * 作者：YYC
 * 日期：2014-04-23
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.Control = YYC.AClass(YE.ActionInterval, {
    Init: function () {
        this.base();
    },
    Protected: {
        Virtual: {
            ye_P_iterate: function (method, arg) {
                var actions = this.getInnerActions();

                actions.map.apply(actions, arguments);
//
//                if (actions.forEach) {
//                    actions.forEach(function (action) {
//                        action[method](arg);
//                    })
//                }
//                else {
//                    actions.iterate(method, arg);
//                }
            }
        }
    },
    Public: {
        init: function () {
            this.ye_P_iterate("init");
        },
        onenter: function () {
            this.ye_P_iterate("onenter");
        },
        onexit: function () {
            this.ye_P_iterate("onexit");
        },
        setTarget: function (target) {
            this.base(target);

            this.ye_P_iterate("setTarget", [target]);
        },
//        start: function () {
//            this.base();
//
//            this.getCurrentAction().start();
//        },
        reverse: function () {
            this.ye_P_iterate("reverse");

            return this;
        },
//        stop: function () {
//            this.base();
//
//            this.getCurrentAction().stop();
//        },
        reset: function () {
            this.base();

//            this.ye___times = this.ye___originTimes;

            this.ye_P_iterate("reset");
        }
    },
    Abstract: {
        getInnerActions: function () {
        }
//        getCurrentAction: function () {
//        }
    }
//    Static: {
//        create: function (action, times) {
//            var repeat = new YE.Repeat(action.copy(), times);
//
//            return repeat;
//        }
//    }
});