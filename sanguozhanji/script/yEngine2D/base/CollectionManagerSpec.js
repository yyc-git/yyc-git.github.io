/**YEngine2D
 * 作者：YYC
 * 日期：2014-04-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("CollectionManager.js", function () {
    var manager = null;
    var sandbox = null;

    function getInstance() {
        var T = YYC.Class(YE.CollectionManager, {
        });

        return new T();
    }

    function addChild(child) {
        manager.ye_P_childs.addChild(child);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });


    describe("构造函数", function () {
        it("创建childs集合", function () {
            var manager = getInstance();

            expect(manager.ye_P_childs).toBeInstanceOf(YE.Collection);
        });
    });

    describe("update", function () {
        var fakeAction1 = null,
            fakeAction2 = null;

        function buildFakeFps() {
            sandbox.stub(YE.Director, "getInstance").returns({
                getFps: function () {
                    return 10;
                }
            });
        }

        function buildFakeAction(uid) {
            return {
                isStop: function () {
                    return false;
                },
                isFinish: function () {
                    return false;
                },
                update: function () {
                },
                getUid: function () {
                    return uid;
                }
            };
        }

        beforeEach(function () {
            fakeAction1 = buildFakeAction(1);
            fakeAction2 = buildFakeAction(2);
        });

        it("如果动作已经完成，则容器中删除该动作", function () {
            sandbox.stub(manager, "remove");
            sandbox.stub(fakeAction1, "isStop").returns(false);
            sandbox.stub(fakeAction1, "isFinish").returns(true);
            sandbox.stub(fakeAction1, "update");
            addChild(fakeAction1);

            manager.update();

            expect(manager.remove.calledWith(fakeAction1)).toBeTruthy();
            expect(fakeAction1.isFinish.calledBefore(fakeAction1.isStop)).toBeTruthy();
        });
        it("如果动作停止，则不执行该动作的update方法", function () {
            sandbox.stub(fakeAction1, "isStop").returns(true);
            sandbox.stub(fakeAction1, "isFinish").returns(false);
            sandbox.stub(fakeAction1, "update");
            addChild(fakeAction1);

            manager.update();

            expect(fakeAction1.update.callCount).toEqual(0);
        });
        it("否则，执行动作的update方法，传入游戏主循环的间隔时间（以秒为单位）", function () {
            buildFakeFps();
            sandbox.stub(fakeAction1, "isFinish").returns(false);
            sandbox.stub(fakeAction1, "update");
            sandbox.stub(fakeAction2, "isFinish").returns(false);
            sandbox.stub(fakeAction2, "update");
            addChild(fakeAction1);
            addChild(fakeAction2);

            manager.update();

            expect(fakeAction1.update.calledWith(1 / 10)).toBeTruthy();
            expect(fakeAction2.update.calledWith(1 / 10)).toBeTruthy();
        });
    });

    describe("getCount", function () {
        it("获得容器元素个数", function () {
            addChild({});

            expect(manager.getCount()).toEqual(1);
        });
    });


    describe("addChild", function () {
        var fakeChild = null;

        beforeEach(function () {
            fakeChild = {
                init: sandbox.stub(),
                onenter: sandbox.stub(),
                setTarget: sandbox.stub()
            };
            sandbox.stub(manager, "hasChild").returns(false);
        });

        it("设置元素的target", function () {
            var target = {};

            manager.addChild(fakeChild, target);

            expect(fakeChild.setTarget.calledWith(target)).toBeTruthy();
        });
        it("加入该元素", function () {
            sandbox.spy(manager.ye_P_childs, "addChild");

            manager.addChild(fakeChild);

            expect(manager.ye_P_childs.addChild.calledWith(fakeChild)).toBeTruthy();
        });
        it("初始化元素（在设置元素的target之后）", function () {
            manager.addChild(fakeChild);

            expect(fakeChild.init.calledAfter(fakeChild.setTarget)).toBeTruthy();
        });
        it("调用元素的onenter子", function () {
            manager.addChild(fakeChild);

            expect(fakeChild.onenter.calledAfter(fakeChild.init)).toBeTruthy();
        });
    });

    describe("remove", function () {
        var fakeChild = null;

        beforeEach(function () {
            fakeChild = {
                onexit: sandbox.stub(),
//                reset: sandbox.stub(),
                getUid: function () {
                    return 1;
                }
            };
            addChild(fakeChild);
        });

        it("调用元素的onexit钩子", function () {
            manager.remove(fakeChild);

            expect(fakeChild.onexit.calledOnce).toBeTruthy();
        });
//        it("重置元素", function () {
//            manager.remove(fakeChild);
//
//            expect(fakeChild.reset.calledOnce).toBeTruthy();
//        });
        it("删除指定元素（uid匹配）", function () {
            manager.remove(fakeChild);

            expect(manager.hasChild(fakeChild)).toBeFalsy();
        });
    });

    describe("removeAll", function () {
        var fakeChild1 = null,
            fakeChild2 = null;

        beforeEach(function () {
            fakeChild1 = {
                onexit: sandbox.stub()
//                reset: sandbox.stub()
            };
            fakeChild2 = {
                onexit: sandbox.stub(),
//                reset: sandbox.stub(),
                a: 2
            };
            addChild(fakeChild1);
            addChild(fakeChild2);
        });

        it("调用每个元素的onexit钩子", function () {
            manager.removeAll();

            expect(fakeChild1.onexit.calledOnce).toBeTruthy();
            expect(fakeChild2.onexit.calledOnce).toBeTruthy();
        });
//        it("重置所有元素", function () {
//            manager.removeAll();
//
//            expect(fakeChild1.reset.calledOnce).toBeTruthy();
//            expect(fakeChild2.reset.calledOnce).toBeTruthy();
//        });
        it("删除所有元素", function () {
            manager.removeAll();

            expect(manager.hasChild(fakeChild1)).toBeFalsy();
            expect(manager.hasChild(fakeChild2)).toBeFalsy();
        });
    });

    describe("hasChild", function () {
        it("如果参数为空，则返回false", function () {
            expect(manager.hasChild()).toBeFalsy();
        });
        it("如果参数为元素，判断容器中是否已加入该元素", function () {
            var fakeChild = {
            };
            sandbox.stub(manager.ye_P_childs, "hasChild").returns(true);

            var result = manager.hasChild(fakeChild);

            expect(result).toBeTruthy();
            expect(manager.ye_P_childs.hasChild.calledWith(fakeChild)).toBeTruthy();
        });
        it("如果参数为tag，则判断是否有具有该tag的元素", function () {
            var fakeAnim = {
                hasTag: sandbox.stub().returns(true)
            };
            addChild(fakeAnim);

            expect(manager.hasChild(fakeAnim)).toBeTruthy();
        });
    });

    describe("getChilds", function () {
        it("获得所有元素", function () {
            var fakeChild1 = {
                    a: 10
                },
                fakeChild2 = {};
            addChild(fakeChild1);
            addChild(fakeChild2);

            expect(manager.getChilds().length).toEqual(2);
        });
    });
});
