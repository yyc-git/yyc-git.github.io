/**YEngine2D 重复动作类
 * 作者：YYC
 * 日期：2014-01-19
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.Repeat = YYC.Class(YE.Control, {
    Init: function () {
        this.base();
    },
    Private: {
        ye____innerAction: null,
        ye____originTimes: 0,
        ye____times: 0
    },
    Public: {
        initWhenCreate: function (action, times) {
            this.ye____innerAction = action;
            this.ye____times = times;
            this.ye____originTimes = times;
        },
        update: function (time) {
            if (this.ye____times === 0) {
                this.finish();

                return;
            }
            this.ye____innerAction.update(time);

            if (this.ye____innerAction.isFinish()) {
                this.ye____times -= 1;

                if (this.ye____times !== 0) {
                    this.ye____innerAction.reset();
//                        this.ye____innerAction.start();
                }
            }
        },
//        getCurrentFrame: function () {
//            return this.ye____innerAction.getCurrentFrame();
//        },
//        getAnimSize: function () {
//            return this.ye____innerAction.getAnimSize();
//        },
        copy: function () {
            return YE.Repeat.create(this.ye____innerAction.copy(), this.ye____times);
        },
        reset: function () {
            this.base();

            this.ye____times = this.ye____originTimes;
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
        create: function (action, times) {
            var repeat = new this();
            repeat.initWhenCreate(action, times);

            return repeat;
        }
    }
});