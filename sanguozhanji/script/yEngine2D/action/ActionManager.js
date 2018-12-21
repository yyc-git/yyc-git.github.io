/**YEngine2D 动作管理类
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    YE.ActionManager = YYC.Class(YE.CollectionManager, {
        Init: function () {
            this.base();
        },
        Public: {
            getChildByTag: function (tag) {
                return YE.Tool.collection.getChildByTag(this.ye_P_childs, tag);
            },
            getChildsByTag: function (tag) {
                return YE.Tool.collection.getChildsByTag(this.ye_P_childs, tag);
            },
            removeChildByTag: function (tag) {
                YE.Tool.collection.removeChildByTag(this.ye_P_childs, tag, function (child) {
                    child.onexit();
                    child.reset();
                });
            },
            removeChildsByTag: function (tag) {
                YE.Tool.collection.removeChildsByTag(this.ye_P_childs, tag, function (child) {
                    child.onexit();
                    child.reset();
                });
            }
        },
        Static: {
            create: function () {
                return new this();
            }
        }
    });
}());