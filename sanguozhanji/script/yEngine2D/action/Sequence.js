/**YEngine2D 序列动作类，顺序执行动作
 * 作者：YYC
 * 日期：2014-01-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */

YE.Sequence = YYC.Class(YE.Control, {
    Init: function () {
        this.base();

        this.ye____actions = YE.Collection.create();
    },
    Private: {
        ye____actions: null,
        ye____currentAction: null,
        ye____actionIndex: -1
    },
    Public: {
        initWhenCreate: function (actionArr) {
            this.ye____actions.addChilds(actionArr);
            this.ye____currentAction = this.ye____actions.getChildAt(0);
            this.ye____actionIndex = 0;
        },
        update: function (time) {
            if (this.ye____actionIndex === this.ye____actions.getCount()) {
                this.finish();
                return;
            }

            this.ye____currentAction = this.ye____actions.getChildAt(this.ye____actionIndex);

            if (!this.ye____currentAction.isFinish()) {
                this.ye____currentAction.update(time);

//                if (this.ye____actions.getCount() === 1 && !this.ye____currentAction.canClear()) {
//                    this.ye_P_canClear = false;
//                }

                return YE.returnForTest;
            }

//            if(this.ye____currentAction.isInstanceOf(YE.ActionInterval)){
//                this.ye____currentAction.reset();
//                this.ye____currentAction.stop();
//            }
//            this.ye____currentAction.doAfterFinish();
            this.ye____actionIndex += 1;

            this.update(time);
        },
//        getCurrentFrame: function () {
//            return this.ye____currentAction.getCurrentFrame();
//        },
//        getAnimSize: function () {
//            return this.ye____currentAction.getAnimSize();
//        },
        copy: function () {
            var actionArr = [];

            this.ye____actions.forEach(function (action) {
                actionArr.push(action.copy());
            });

            return YE.Sequence.create.apply(YE.Sequence, actionArr);
        },
        reverse: function () {
            this.ye____actions.reverse();

            this.base();

            return this;
        },
        reset: function () {
            this.base();

            this.ye____actionIndex = 0;
        },
        start: function () {
            this.base();

            this.ye____currentAction.start();
        },
        stop: function () {
            this.base();

            this.ye____currentAction.stop();
        },
        getInnerActions: function () {
            return this.ye____actions;
        }
//        getCurrentAction: function () {
//            return this.ye____currentAction;
//        },
    },
    Static: {
        create: function (actions) {
            YE.assert(arguments.length >= 2, "应该有2个及以上动作");

            var actionArr = Array.prototype.slice.call(arguments, 0),
                sequence = null;

            sequence = new this();
            sequence.initWhenCreate(actionArr);

            return sequence;
        }
    }
});

//
///** Runs actions sequentially, one after another
// * @class
// * @extends cc.ActionInterval
// */
//cc.Sequence = cc.ActionInterval.extend(/** @lends cc.Sequence# */{
//    ye_actions: null,
//    ye_split: null,
//    ye_last: 0,
//
//    /**
//     * Constructor
//     */
//    ctor: function () {
//        this.ye_actions = [];
//    },
//
//    /** initializes the action <br/>
//     * @param {cc.FiniteTimeAction} actionOne
//     * @param {cc.FiniteTimeAction} actionTwo
//     * @return {Boolean}
//     */
//    initOneTwo: function (actionOne, actionTwo) {
//        cc.Assert(actionOne != null, "Sequence.initOneTwo");
//        cc.Assert(actionTwo != null, "Sequence.initOneTwo");
//
//        var one = actionOne.getDuration();
//        var two = actionTwo.getDuration();
//        if (isNaN(one) || isNaN(two)) {
//            console.log(actionOne);
//            console.log(actionTwo);
//        }
//        var d = actionOne.getDuration() + actionTwo.getDuration();
//        this.initWithDuration(d);
//
//        this.ye_actions[0] = actionOne;
//        this.ye_actions[1] = actionTwo;
//
//        return true;
//    },
//
//    /**
//     * @param {cc.Node} target
//     */
//    startWithTarget: function (target) {
//        cc.ActionInterval.prototype.startWithTarget.call(this, target);
//        //this.ye_super(target);
//        this.ye_split = this.ye_actions[0].getDuration() / this.ye_duration;
//        this.ye_last = -1;
//    },
//
//    /**
//     * stop the action
//     */
//    stop: function () {
//        // Issue #1305
//        if (this.ye_last != -1) {
//            this.ye_actions[this.ye_last].stop();
//        }
//        cc.Action.prototype.stop.call(this);
//    },
//
//    /**
//     * @param {Number} time  time in seconds
//     */
//    update: function (time) {
//        var new_t, found = 0;
//        if (time < this.ye_split) {
//            // action[0]
//            //found = 0;
//            new_t = (this.ye_split) ? time / this.ye_split : 1;
//        } else {
//            // action[1]
//            found = 1;
//            new_t = (this.ye_split == 1) ? 1 : (time - this.ye_split) / (1 - this.ye_split);
//
//            if (this.ye_last == -1) {
//                // action[0] was skipped, execute it.
//                this.ye_actions[0].startWithTarget(this.ye_target);
//                this.ye_actions[0].update(1);
//                this.ye_actions[0].stop();
//            }
//            if (!this.ye_last) {
//                // switching to action 1. stop action 0.
//                this.ye_actions[0].update(1);
//                this.ye_actions[0].stop();
//            }
//        }
//
//        if (this.ye_last != found) {
//            this.ye_actions[found].startWithTarget(this.ye_target);
//        }
//        this.ye_actions[found].update(new_t);
//        this.ye_last = found;
//    },
//
//    /**
//     * @return {cc.ActionInterval}
//     */
//    reverse: function () {
//        return cc.Sequence.ye_actionOneTwo(this.ye_actions[1].reverse(), this.ye_actions[0].reverse());
//    },
//
//    /**
//     * to copy object with deep copy.
//     * @return {object}
//     */
//    copy: function () {
//        return cc.Sequence.ye_actionOneTwo(this.ye_actions[0].copy(), this.ye_actions[1].copy());
//    }
//});
///** helper constructor to create an array of sequenceable actions
// * @param {Array|cc.FiniteTimeAction} tempArray
// * @return {cc.FiniteTimeAction}
// * @example
// * // example
// * // create sequence with actions
// * var seq = cc.Sequence.create(act1, act2);
// *
// * // create sequence with array
// * var seq = cc.Sequence.create(actArray);
// */
//cc.Sequence.create = function (/*Multiple Arguments*/tempArray) {
//    var paraArray = (tempArray instanceof Array) ? tempArray : arguments;
//    var prev = paraArray[0];
//    for (var i = 1; i < paraArray.length; i++) {
//        if (paraArray[i]) {
//            prev = cc.Sequence.ye_actionOneTwo(prev, paraArray[i]);
//        }
//    }
//    return prev;
//};
//
///** creates the action
// * @param {cc.FiniteTimeAction} actionOne
// * @param {cc.FiniteTimeAction} actionTwo
// * @return {cc.Sequence}
// * @private
// */
//cc.Sequence.ye_actionOneTwo = function (actionOne, actionTwo) {
//    var sequence = new cc.Sequence();
//    sequence.initOneTwo(actionOne, actionTwo);
//    return sequence;
//};