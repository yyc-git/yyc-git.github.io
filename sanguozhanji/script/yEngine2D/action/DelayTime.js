/**YEngine2D 延迟动作类
 * 作者：YYC
 * 日期：2014-04-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.DelayTime = YYC.Class(YE.ActionInterval, {
    Init: function (delayTime) {
        this.base();

        this.___delayTime = delayTime;
    },
    Private: {
        ___delayTime: -1,
        ___elapsed: -1,
        ___firstTick: true
    },
    Public: {
        reverse: function () {
            return this;
        },
        update: function (time) {
            if (this.___firstTick) {
                this.___firstTick = false;
                this.___elapsed = 0;

                return YE.returnForTest;
            }
            this.___elapsed += time;

            if (this.___elapsed >= this.___delayTime) {
                this.finish();
            }
        },
        copy: function () {
            return YE.DelayTime.create(this.___delayTime);
        }
    },
    Static: {
        /**
         * 创建实例
         * @param delayTime 延迟时间，以秒为单位
         * @returns {YE.DelayTime}
         */
        create: function (delayTime) {
            var action = new this(delayTime);

            return action;
        }
    }
});
