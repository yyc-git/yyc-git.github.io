/**YEngine2D
 * 作者：YYC
 * 日期：2014-01-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.ActionInterval = YYC.AClass(YE.Action, {
    Init: function () {
        this.base();
    },
    Private: {
        ye__isStop: false
    },
    Public: {
        start: function () {
            this.ye__isStop = false;
        },
        reset: function () {
            this.base();

            this.ye__isStop = false;
        },
        stop: function () {
            this.ye__isStop = true;
        },
        isStop: function () {
            return this.ye__isStop;
        }
    }
});
