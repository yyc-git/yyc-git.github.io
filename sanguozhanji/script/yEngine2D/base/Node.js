/**YEngine2D 节点类
 * 作者：YYC
 * 日期：2014-02-09
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.Node = YYC.AClass(YE.Entity, {
    Private: {
        ye_parent: null,
        ye_zOrder: 0
    },
    Protected: {
        ye_P_setZOrder: function (zOrder) {
            this.ye_zOrder = zOrder;
        }
    },
    Public: {
        getParent: function () {
            return this.ye_parent;
        },
        getZOrder: function () {
            return this.ye_zOrder;
        },

        Virtual: {
            init: function (parent) {
                this.ye_parent = parent;
            },

            //*钩子

            onstartLoop: function () {
            },
            onendLoop: function () {
            },
            onbeforeRun: function () {
            },
            onafterRun: function () {
            },
            onenter: function () {
            },
            onexit: function () {
            }
        }
    }
//    Abstract: {
//        init: function (parent) {
//        }
//    }
});
