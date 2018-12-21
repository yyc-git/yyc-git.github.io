/**YEngine2D 场景类
 * 作者：YYC
 * 日期：2013-12-24
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    YE.Scene = YYC.AClass(YE.NodeContainer, {
        Protected: {
            ye_P_run: function () {
                this.iterate("run");
            }
        },
        Public: {
            addChilds: function (childs, zOrder, tag) {
                this.base(childs, zOrder, tag);

                if (zOrder) {
                    childs.map("setZIndex", zOrder);
                }
            },
            addChild: function (child, zOrder, tag) {
                this.base(child, zOrder, tag);

                if (zOrder) {
                    child.setZIndex(zOrder);
                }
            },
            startLoop: function () {
                this.onstartLoop();
                this.iterate("startLoop");
            },
            endLoop: function () {
                this.iterate("endLoop");
                this.onendLoop();
            }
        }
    });
}());