/**YEngine2D 一直重复动作类
 * 作者：YYC
 * 日期：2014-01-19
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.RepeatForever = YYC.Class(YE.Control, {
    Init: function () {
        this.base();
    },
    Private: {
        ye____innerAction: null
    },
    Public: {
        initWhenCreate: function (action) {
            this.ye____innerAction = action;
        },
        update: function (time) {
            this.ye____innerAction.update(time);

            if (this.ye____innerAction.isFinish()) {
                this.ye____innerAction.reset();
            }
        },
//        getCurrentFrame: function () {
//            return this.ye____innerAction.getCurrentFrame();
//        },
//        getAnimSize: function () {
//            return this.ye____innerAction.getAnimSize();
//        },
        isFinish: function () {
            return false;
        },
//        canClear: function () {
//            return true;
//        },
        copy: function () {
            return YE.RepeatForever.create(this.ye____innerAction.copy());
        },
        start: function () {
            this.base();

            this.ye____innerAction.start();
        },
        stop: function () {
            this.base();

            this.ye____innerAction.stop();
        },
        getInnerActions: function () {
            return [this.ye____innerAction];
        }
//        getCurrentAction: function () {
//            return this.ye____innerAction;
//        },
    },
    Static: {
        create: function (action) {
            var repeat = new this();
            repeat.initWhenCreate(action);

            return repeat;
        }
    }
});
