/**YEngine2D 并列动作类
 * 作者：YYC
 * 日期：2014-01-22
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.Spawn = YYC.Class(YE.Control, {
    Init: function () {
        this.base();
    },
    Private: {
        ye____actions: null,

        ye____isFinish: function () {
            var isFinish = true;

            this.ye____actions.forEach(function (action, i) {
                if (!action.isFinish()) {
                    isFinish = false;
                    return $break;
                }
            });

            return isFinish;
        }       ,
        ye____iterate: function (method, arg) {
            this.ye____actions.forEach(function (action, i) {
                if (!action.isFinish()) {
                    action[method].apply(action, arg);
                }
            });
        }
//        ye____one: null,
//        ye____two: null,

//        ye_P_iterate: function (method, arg) {
////            this.ye____one.forEach(function (action, i) {
////                action[method](arg);
////            });
////            this.ye____two[method](arg);
//            this.ye____actions.forEach(function (action, i) {
//                if (!action.isFinish()) {
//                    action[method](arg);
//                }
//            });
////            if (!this.ye____two.isFinish()) {
////                this.ye____two[method](arg);
////            }
//        }
    },
//    Protected: {
//        ye_P_iterate: function (method, arg) {
//            this.ye____actions.forEach(function (action, i) {
//                if (!action.isFinish()) {
//                    action[method].apply(action, arg);
//                }
//            });
//        }
//    },
    Public: {
        initWhenCreate: function (actionArr) {
//            this.ye____actions = YE.Collection.create().addChilds(actionArr);

//            this.ye____currentAction = this.ye____actions.getChildAt(0);
            this.ye____actions = actionArr;
//            this.ye____two = this.ye____actions[this.ye____actions.length - 1];
//            this.ye____one = this.ye____actions.slice(0, this.ye____actions.length - 1);
        },
//        onenter: function () {
//            this.ye_P_iterate("onenter");
//        },
//        onexit: function () {
//            this.ye_P_iterate("onexit");
//        },
        update: function (time) {
//            if (this.isStop()) {
//                return;
//            }
////
////            if (this.ye____one) {
//            this.ye____one.forEach(function (action, i) {
//                action.update(time);
//            });
////            }
////            if (this.ye____two) {
//            this.ye____two.update(time);
////            }

//            if (!this.ye____two.isFinish()) {
//                isFinish = false;
//            }

            if (this.ye____isFinish()) {
                this.finish();
            }

            this.ye____iterate("update", [time]);

        },
//        getTarget: function () {
//            var target_one = [];
//
//            this.ye____one.forEach(function (action) {
//                target_one.push(action.getTarget());
//            });
//
//            target_one.push(this.ye____two.getTarget());
//
//            return target_one;
//        },
//        setTarget: function (target) {
//            this.base(target);
//
//            this.ye_P_iterate("setTarget", target);
//        },
        start: function () {
            this.base();

            this.ye_P_iterate("start");
        },
        copy: function () {
            var actions = [];

            this.ye____actions.forEach(function (action) {
                actions.push(action.copy());
            });
            return YE.Spawn.create.apply(YE.Spawn, actions);
        },
        reverse: function () {
            this.ye____actions.reverse();

            this.base();
//            this.ye_P_iterate("reverse");

            return this;
        },
        stop: function () {
            this.base();

            this.ye_P_iterate("stop");
        },
//        reset: function () {
//            this.___baseClass.ye_P_iterate.call(this, "reset");
//        },
        getInnerActions: function () {
            return this.ye____actions;
        }
//        getCurrentAction: function () {
//            return this.ye____actions;
//        },
    },
    Static: {
        create: function (actions) {
            var spawn = null;

            YE.assert(arguments.length >= 2, "应该有2个及以上动作");

            spawn = new this();
            spawn.initWhenCreate(Array.prototype.slice.call(arguments, 0));

            return spawn;
        }
    }
});
//
//
///** Spawn a new action immediately
// * @class
// * @extends cc.ActionInterval
// */
//cc.Spawn = cc.ActionInterval.extend(/** @lends cc.Spawn# */{
//    /** initializes the Spawn action with the 2 actions to spawn
//     * @param {cc.FiniteTimeAction} action1
//     * @param {cc.FiniteTimeAction} action2
//     * @return {Boolean}
//     */
//    initOneTwo: function (action1, action2) {
//        cc.Assert(action1 != null, "no action1");
//        cc.Assert(action2 != null, "no action2");
//
//        var ret = false;
//
//        var d1 = action1.getDuration();
//        var d2 = action2.getDuration();
//
//        if (this.initWithDuration(Math.max(d1, d2))) {
//            this.ye_one = action1;
//            this.ye_two = action2;
//
//            if (d1 > d2) {
//                this.ye_two = cc.Spawn.ye_actionOneTwo(action2, cc.DelayTime.create(d1 - d2));
//            } else if (d1 < d2) {
//                this.ye_one = cc.Spawn.ye_actionOneTwo(action1, cc.DelayTime.create(d2 - d1));
//            }
//
//            ret = true;
//        }
//        return ret;
//    },
//
//    /**
//     * @param {cc.Node} target
//     */
//    startWithTarget: function (target) {
//        cc.ActionInterval.prototype.startWithTarget.call(this, target);
//        this.ye_one.startWithTarget(target);
//        this.ye_two.startWithTarget(target);
//    },
//
//    /**
//     * Stop the action
//     */
//    stop: function () {
//        this.ye_one.stop();
//        this.ye_two.stop();
//        cc.Action.prototype.stop.call(this);
//    },
//
//    /**
//     * @param {Number} time time in seconds
//     */
//    update: function (time) {
//        if (this.ye_one) {
//            this.ye_one.update(time);
//        }
//        if (this.ye_two) {
//            this.ye_two.update(time);
//        }
//    },
//
//    /**
//     * @return {cc.FiniteTimeAction}
//     */
//    reverse: function () {
//        return cc.Spawn.ye_actionOneTwo(this.ye_one.reverse(), this.ye_two.reverse());
//    },
//    ye_one: null,
//    ye_two: null
//});
//
///**
// * @param {Array|cc.FiniteTimeAction}tempArray
// * @return {cc.FiniteTimeAction}
// * @example
// * // example
// * var action = cc.Spawn.create(cc.JumpBy.create(2, cc.p(300, 0), 50, 4), cc.RotateBy.create(2, 720));
// */
//cc.Spawn.create = function (/*Multiple Arguments*/tempArray) {
//    var paramArray = (tempArray instanceof Array) ? tempArray : arguments;
//    var prev = paramArray[0];
//    for (var i = 1; i < paramArray.length; i++) {
//        if (paramArray[i] != null) {
//            prev = this.ye_actionOneTwo(prev, paramArray[i]);
//        }
//    }
//    return prev;
//};
//
///**
// * @param {cc.FiniteTimeAction} action1
// * @param {cc.FiniteTimeAction} action2
// * @return {cc.Spawn}
// * @private
// */
//cc.Spawn.ye_actionOneTwo = function (action1, action2) {
//    var pSpawn = new cc.Spawn();
//    pSpawn.initOneTwo(action1, action2);
//
//    return pSpawn;
//};