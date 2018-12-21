/**YEngine2D
 * 作者：YYC
 * 日期：2014-04-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    YE.CollectionManager = YYC.AClass(YE.Entity, {
        Init: function () {
            this.ye_P_childs = YE.Collection.create();
        },
        Private: {
        },
        Protected: {
            ye_P_childs: null
        },
        Public: {
            update: function () {
                var self = this,
                    removeQueue = [],
                    time = null;

                time = 1 / YE.Director.getInstance().getFps();

                this.ye_P_childs.forEach(function (child) {
                    if (child.isFinish()) {
                        removeQueue.push(child);
                        return;
                    }
                    if (child.isStop()) {
                        return;
                    }

                    child.update(time);
                });

                removeQueue.forEach(function (child) {
                    self.remove(child);
                });
            },
            getCount: function () {
                return this.ye_P_childs.getCount();
            },
            addChild: function (child, target) {
                child.setTarget(target);
                this.ye_P_childs.addChild(child);
                child.init();
                child.onenter();
            },
            remove: function (child) {
                child.onexit();
//                child.reset();

                this.ye_P_childs.remove(function (e) {
                    return child.getUid() === e.getUid();
                });
            },
            removeAll: function () {
                this.ye_P_childs.map("onexit");
//                this.ye_P_childs.map("reset");

                this.ye_P_childs.removeAll();
            },
            hasChild: function (child) {
                var actionName = null;

                if (!child) {
                    return false;
                }

                if (YE.Tool.judge.isString(arguments[0])) {
                    actionName = arguments[0];

                    return this.ye_P_childs.hasChild(function (c) {
                        return c.hasTag(actionName);
                    });
                }

                return this.ye_P_childs.hasChild(child);
            },
            getChilds: function () {
                return this.ye_P_childs.getChilds();
            }
        }
    });
}());