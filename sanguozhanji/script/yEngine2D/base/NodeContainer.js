/**YEngine2D 节点容器类
 * 作者：YYC
 * 日期：2014-02-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.NodeContainer = YYC.AClass(YE.Node, {
    Init: function () {
        this.base();

        this.ye__childs = YE.Collection.create();
    },
    Private: {
        ye__isChangeZOrder: false,
        ye__childs: null
    },
    Protected: {
        Abstract: {
            ye_P_run: function () {
            }
        }
    },
    Public: {
        isSortAllChilds: true,

        reorderChild: function (child, zOrder) {
            this.ye__isChangeZOrder = true;

            child.ye_P_setZOrder(zOrder);
        },
        sortAllChilds: function () {
            if (this.ye__isChangeZOrder) {
                this.ye__isChangeZOrder = false;

                this.sort(function (child1, child2) {
                    return child1.getZOrder() - child2.getZOrder();
                });
            }
        },
        sort: function (func) {
            this.ye__childs.sort(func);
        },
        getChilds: function () {
            return this.ye__childs.getChilds();
        },
        getChildAt: function (index) {
            return this.ye__childs.getChildAt(index);
        },
        addChilds: function (childs, zOrder, tag) {
            var self = this;

            YE.error(!YE.Tool.judge.isArray(childs), "第一个参数必须为数组");

            if (zOrder) {
                this.ye__isChangeZOrder = true;
            }

            this.ye__childs.addChilds(childs);

            childs.forEach(function (child) {
                if (zOrder) {
                    child.ye_P_setZOrder(zOrder);
                }
                if (tag) {
                    child.addTag(tag);
                }
                child.init(self);
                child.onenter();
            });
        },
        addChild: function (child, zOrder, tag) {
            this.ye__childs.addChild(child);

            if (zOrder) {
                this.ye__isChangeZOrder = true;
                child.ye_P_setZOrder(zOrder);
            }
            if (tag) {
                child.addTag(tag);
            }
            child.init(this);
            child.onenter();
        },
        getChildByTag: function (tag) {
            return YE.Tool.collection.getChildByTag(this.ye__childs, tag);
        },
        getChildsByTag: function (tag) {
            return YE.Tool.collection.getChildsByTag(this.ye__childs, tag);
        },
        removeChildByTag: function (tag) {
            YE.Tool.collection.removeChildByTag(this.ye__childs, tag, function (child) {
                child.onexit();
            });
        },
        removeChildsByTag: function (tag) {
            YE.Tool.collection.removeChildsByTag(this.ye__childs, tag, function (child) {
                child.onexit();
            });
        },
        remove: function (child) {
            child.onexit();
            this.ye__childs.remove(child);
        },
        removeAll: function () {
            this.ye__childs.map("onexit");

            this.ye__childs.removeAll();
        },
        iterate: function (handler, args) {
//            this.ye__childs.iterate.apply(this.ye__childs, arguments);
            if (YE.Tool.judge.isFunction(arguments[0])) {
                this.ye__childs.forEach.apply(this.ye__childs, arguments);
            }
            else {
                this.ye__childs.map.apply(this.ye__childs, arguments);
            }
        },
        //游戏主循环调用的方法
        run: function () {
            this.onbeforeRun();

            if(this.isSortAllChilds){
                this.sortAllChilds();
            }

            this.ye_P_run();

            this.onafterRun();
        }
    }
});
