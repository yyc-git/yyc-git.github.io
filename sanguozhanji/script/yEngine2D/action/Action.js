/**YEngine2D 动作基类
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    YE.Action = YYC.AClass(YE.Entity, {
        Init: function () {
            this.base();

            this.ye_isFinish = false;
        },
        Private: {
            ye_target: null,
            ye_isFinish: null
        },
        Public: {
            setTarget: function (target) {
                this.ye_target = target;
            },
            getTarget: function () {
                return this.ye_target;
            },
            isStart: function () {
                return !this.isStop();
            },
            isFinish: function () {
                return this.ye_isFinish;
            },
            reset: function () {
                this.ye_isFinish = false;
            },
            finish: function () {
                this.ye_isFinish = true;
                this.stop();
            },

            Virtual: {
                init: function () {
                },

                //*自定义动作的钩子

                onenter: function () {
                },
                onexit: function () {
                }
            }
        },
        Abstract: {
            update: function (time) {
            },
            copy: function () {
            },
            start: function () {
            },
            stop: function () {
            },
            isStop: function () {
            },
            reverse: function () {
            }
        }
    });
}());