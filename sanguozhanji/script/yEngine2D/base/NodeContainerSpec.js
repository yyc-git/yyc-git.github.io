/**YEngine2D
 * 作者：YYC
 * 日期：2014-02-18
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("NodeContainer", function () {
    var container = null;
    var sandbox = null;

    function getInstance() {
        var T = YYC.Class(YE.NodeContainer, {
            Init: function () {
                this.base();
            },
            Public: {
                ye_P_run: function () {
                }
            }
        });

        return new T();
    }

    function addChild(child) {
        container.ye__childs.addChild(child);
    }

    function addChilds(childs) {
        container.ye__childs.addChilds(childs);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        container = getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("构造函数", function () {
        it("创建Collection集合", function () {
            var container = getInstance();

            expect(container.ye__childs).toBeInstanceOf(YE.Collection);
        });
    });

    describe("reorderChild，重排元素的z轴显示顺序", function () {
        var child = null;

        beforeEach(function () {
            child = sandbox.createSpyObj("ye_P_setZOrder");
            addChild(child);
        });

        it("置标志位为true", function () {
            container.reorderChild(child);

            expect(container.ye__isChangeZOrder).toBeTruthy();
        });
        it("设置元素的zOrder", function () {
            container.reorderChild(child, 1);

            expect(child.ye_P_setZOrder.calledOnce).toBeTruthy();
        });
    });


    describe("sortAllChilds", function () {
        describe("如果需要排序", function () {
            beforeEach(function () {
                container.ye__isChangeZOrder = true;
            });

            it("按元素的zOrder排序", function () {
                var child1 = sandbox.createSpyObj("a"),
                    child2 = sandbox.createSpyObj("b"),
                    child3 = sandbox.createSpyObj("c"),
                    child4 = sandbox.createSpyObj("d");
                child1.getZOrder = function () {
                    return 0;
                };
                child2.getZOrder = function () {
                    return -1;
                };
                child3.getZOrder = function () {
                    return 3;
                };
                child4.getZOrder = function () {
                    return 2;
                };
                addChilds([child1, child2, child3, child4]);

                container.sortAllChilds();

                expect(container.getChilds()).toEqual([child2, child1, child4, child3]);
            });
        });
    });

    describe("sort", function () {
        it("对容器内元素排序", function () {
            var func = function () {
            };
            var child1 = {},
                child2 = {a: 1};
            addChilds([child1, child2]);
            sandbox.stub(container.ye__childs, "sort");

            container.sort(func);

            expect(container.ye__childs.sort.calledWith(func)).toBeTruthy();
        });
    });

    describe("加入元素", function () {
        function buildFakeChild() {
            return sandbox.createSpyObj("init", "ye_P_setZOrder", "onenter", "addTag");
        }

        describe("addChilds", function () {
            var fakeElement1 = null,
                fakeElement2 = null;

            beforeEach(function () {
                fakeElement1 = buildFakeChild();
                fakeElement2 = buildFakeChild();
            });

            it("如果第1个参数不是数组，则报错", function () {
                expect(function () {
                    container.addChilds({});
                }).toThrow();
                expect(function () {
                    container.addChilds([]);
                }).not.toThrow();
            });
            it("加入元素", function () {
                container.addChilds([fakeElement1, fakeElement2]);

                expect(container.getChilds().length).toEqual(2);
            });

            describe("如果传入了ZOrder", function () {
                it("置标志位为true", function () {
                    container.addChilds([fakeElement1, fakeElement2], 1);

                    expect(container.ye__isChangeZOrder).toBeTruthy();
                });
                it("设置元素的zOrder", function () {
                    container.addChilds([fakeElement1, fakeElement2], 1);

                    expect(fakeElement1.ye_P_setZOrder.calledWith(1)).toBeTruthy();
                    expect(fakeElement2.ye_P_setZOrder.calledWith(1)).toBeTruthy();
                });
            });

            it("否则，不设置ZOrder", function () {
                container.addChilds([fakeElement1, fakeElement2]);

                expect(fakeElement1.ye_P_setZOrder.called).toBeFalsy();
                expect(fakeElement2.ye_P_setZOrder.called).toBeFalsy();
            });
            it("如果传入了tag，则设置元素tag", function () {
                container.addChilds([fakeElement1, fakeElement2], 0, "a");

                expect(fakeElement1.addTag.calledOnce).toBeTruthy();
                expect(fakeElement2.addTag.calledOnce).toBeTruthy();
            });
            it("初始化元素", function () {
                container.addChilds([fakeElement1, fakeElement2]);

                expect(fakeElement1.init.calledWith(container)).toBeTruthy();
                expect(fakeElement2.init.calledWith(container)).toBeTruthy();
            });
            it("调用元素的onenter", function () {
                container.addChilds([fakeElement1, fakeElement2]);

                expect(fakeElement1.onenter.calledOnce).toBeTruthy();
                expect(fakeElement2.onenter.calledOnce).toBeTruthy();
            });
        });

        describe("addChild", function () {
            var fakeElement = null;

            beforeEach(function () {
                fakeElement = buildFakeChild();
            });

            it("加入一个元素", function () {
                container.addChild(fakeElement);

                expect(container.getChilds().length).toEqual(1);
            });

            describe("如果传入了ZOrder", function () {
                it("置标志位为true", function () {
                    container.addChild(fakeElement, 1);

                    expect(container.ye__isChangeZOrder).toBeTruthy();
                });
                it("设置元素的zOrder", function () {
                    container.addChild(fakeElement, 1);

                    expect(fakeElement.ye_P_setZOrder.calledWith(1)).toBeTruthy();
                });
            });

            it("否则，不设置ZOrder", function () {
                container.addChild(fakeElement);

                expect(fakeElement.ye_P_setZOrder.called).toBeFalsy();
            });
            it("如果传入了tag，则设置元素tag", function () {
                container.addChild(fakeElement, 0, "a");

                expect(fakeElement.addTag.calledOnce).toBeTruthy();
            });
            it("初始化元素", function () {
                container.addChild(fakeElement);

                expect(fakeElement.init.calledOnce).toBeTruthy();
            });
            it("调用元素的onenter", function () {
                container.addChild(fakeElement);

                expect(fakeElement.onenter.calledOnce).toBeTruthy();
            });
        });
    });

    describe("根据tag操作", function () {
        describe("getChildByTag", function () {
            it("调用YE.Tool.collection.getChildByTag", function () {
                sandbox.stub(YE.Tool.collection, "getChildByTag");

                container.getChildByTag("aa");

                expect(YE.Tool.collection.getChildByTag.calledWith(container.ye__childs, "aa")).toBeTruthy();
            });
        });

        describe("getChildsByTag", function () {
            it("调用YE.Tool.collection.getChildsByTag", function () {
                sandbox.stub(YE.Tool.collection, "getChildsByTag");

                container.getChildsByTag("aa");

                expect(YE.Tool.collection.getChildsByTag.calledWith(container.ye__childs, "aa")).toBeTruthy();
            });
        });

        describe("removeChildByTag", function () {
            it("调用YE.Tool.collection.removeChildByTag，删除时触发child的onexit和reset方法", function () {
                sandbox.stub(YE.Tool.collection, "removeChildByTag");

                container.removeChildByTag("aa");

                expect(YE.Tool.collection.removeChildByTag.args[0][0]).toEqual(container.ye__childs);
                expect(YE.Tool.collection.removeChildByTag.args[0][1]).toEqual("aa");

                var fakeChild = sandbox.createStubObj("onexit", "reset");
                YE.Tool.collection.removeChildByTag.getCall(0).callArgWith(2, fakeChild);
                expect(fakeChild.onexit.calledBefore(fakeChild.reset)).toBeTruthy();
            });
        });

        describe("removeChildsByTag", function () {
            it("调用YE.Tool.collection.removeChildsByTag，删除时触发child的onexit和reset方法", function () {
                sandbox.stub(YE.Tool.collection, "removeChildsByTag");

                container.removeChildsByTag("aa");

                expect(YE.Tool.collection.removeChildsByTag.args[0][0]).toEqual(container.ye__childs);
                expect(YE.Tool.collection.removeChildsByTag.args[0][1]).toEqual("aa");

                var fakeChild = sandbox.createStubObj("onexit", "reset");
                YE.Tool.collection.removeChildsByTag.getCall(0).callArgWith(2, fakeChild);
                expect(fakeChild.onexit.calledBefore(fakeChild.reset)).toBeTruthy();
            });
        });
    });

//        describe("getChildsByTagExactly（tag为完全匹配）", function () {
//            it("如果参数为一个标签，则获得tag为该标签的元素", function () {
//                expect(container.getChildsByTagExactly("a")).toEqual([]);
//                expect(container.getChildsByTagExactly("aa")).toEqual([child1]);
//            });
//            it("如果参数为标签数组，则获得tag为数组中任一标签的元素", function () {
//                var childs = container.getChildsByTagExactly(["aa", "b", "cc"]);
//
//                expect(childs).toEqual([child1, child3]);
//            });
//        });

    describe("删除元素", function () {
        var child1 = null,
            child2 = null,
            child3 = null;

        function buildChilds() {
            child1 = sandbox.createSpyObj("onexit");
            child2 = sandbox.createSpyObj("onexit");
            child3 = sandbox.createSpyObj("onexit");
            child1.getUid = sandbox.stub().returns(1);
            child2.getUid = sandbox.stub().returns(2);
            child3.getUid = sandbox.stub().returns(3);
        }

        beforeEach(function () {
        });
        afterEach(function () {
        });

        describe("remove", function () {
            beforeEach(function () {
            });

            it("调用精灵onexit", function () {
                child = sandbox.createSpyObj("onexit");
                addChild(child);

                container.remove(child);

                expect(child.onexit.calledOnce).toBeTruthy();
            });
            it("删除层内指定元素（uid匹配）", function () {
                buildChilds();
                addChilds([child1, child2, child3]);

                container.remove(child2);

                expect(container.getChilds().length).toEqual(2);
                expect(container.getChilds()[0]).toEqual(child1);
                expect(container.getChilds()[1]).toEqual(child3);
            });
        });

        describe("removeAll", function () {
            beforeEach(function () {
            });

            it("调用精灵onexit", function () {
                child1 = sandbox.createSpyObj("onexit");
                child2 = sandbox.createSpyObj("onexit");
                addChilds([child1, child2]);

                container.removeAll();

                expect(child1.onexit.calledOnce).toBeTruthy();
                expect(child2.onexit.calledOnce).toBeTruthy();
            });
            it("删除层内指定元素（uid匹配）", function () {
                buildChilds();
                addChilds([child1, child2, child3]);

                container.removeAll();

                expect(container.getChilds().length).toEqual(0);
            });
        });
    });

    describe("getChilds", function () {
        it("获得层内所有精灵", function () {
            addChilds([1, 2]);

            expect(container.getChilds()).toEqual([1, 2]);
        });
    });

    describe("getChildAt", function () {
        it("获得层内指定序号的精灵", function () {
            addChilds([1, 2]);

            expect(container.getChildAt(1)).toEqual(2);
        });
    });


    describe("iterate", function () {
        it("调用容器元素的方法，可传入参数", function () {
            var child1 = null,
                child2 = null;

            child1 = sandbox.createSpyObj("draw");
            child2 = sandbox.createSpyObj("draw");
            addChilds([child1, child2]);

            container.iterate("draw", [1]);

            expect(child1.draw.calledWith(1)).toBeTruthy();
            expect(child2.draw.calledWith(1)).toBeTruthy();
        });
    });

    describe("run", function () {
        it("调用onstartLoop方法", function () {
            sandbox.stub(container, "onbeforeRun");

            container.run();

            expect(container.onbeforeRun.calledOnce).toBeTruthy();
        });

        describe("判断是否对元素排序", function () {
            it("如果isSortAllChilds为true，则排序", function () {
                sandbox.stub(container, "isSortAllChilds", true);
                sandbox.stub(container, "sortAllChilds");

                container.run();

                expect(container.sortAllChilds.calledOnce).toBeTruthy();
            });
            it("否则不排序", function () {
                sandbox.stub(container, "isSortAllChilds", false);
                sandbox.stub(container, "sortAllChilds");

                container.run();

                expect(container.sortAllChilds.called).toBeFalsy();
            });
        });

        it("调用抽象方法ye_P_run", function () {
            sandbox.stub(container, "ye_P_run");

            container.run();

            expect(container.ye_P_run.calledOnce).toBeTruthy();
        });
        it("调用onendLoop方法", function () {
            sandbox.stub(container, "onafterRun");
            sandbox.stub(container, "ye_P_run");

            container.run();

            expect(container.onafterRun.calledOnce).toBeTruthy();
            expect(container.onafterRun.calledAfter(container.ye_P_run)).toBeTruthy();
        });
    });
});