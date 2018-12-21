/**YEngine2D 调用方法类
 * 作者：YYC
 * 日期：2014-04-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.CallFunc = YYC.Class(YE.ActionInstant, {
    Init: function (context, func, dataArr) {
        this.base();

        this.ye___context = context;
        this.ye___callFunc = func;
        this.ye___dataArr = dataArr;
    },
    Private: {
        ye___context: null,
        ye___callFunc: null,
        ye___dataArr: null
    },
    Public: {
//        isFinish: function () {
//            return true;
//        },
        reverse: function () {
            return this;
        },
        update: function (time) {
            if (this.ye___callFunc) {
                this.ye___callFunc.call(this.ye___context, this.getTarget(), this.ye___dataArr);
            }

            this.finish();
        },
        copy: function () {
            return new YE.CallFunc(this.ye___context, this.ye___callFunc, YE.Tool.extend.extendDeep(this.ye___dataArr));
        }
    },
    Static: {
        create: function (context, func, args) {
            var dataArr = Array.prototype.slice.call(arguments, 2),
                action = new this(context, func, dataArr);

            return action;
        }
    }
});