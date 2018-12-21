/**YEngine2D 动画管理类
 * 作者：YYC
 * 日期：2014-02-27
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.AnimationManager = YYC.Class(YE.CollectionManager, {
    Init: function () {
        this.base();
    },
    Public: {
    },
    Static: {
        create: function () {
            return new this();
        }
    }
});
