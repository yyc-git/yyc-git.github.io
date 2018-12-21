describe("ActionManager.js", function () {
    var manager = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = YE.ActionManager.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("根据tag操作", function () {
        describe("getChildByTag", function () {
            it("调用YE.Tool.collection.getChildByTag", function () {
                sandbox.stub(YE.Tool.collection, "getChildByTag");

                manager.getChildByTag("aa");

                expect(YE.Tool.collection.getChildByTag.calledWith(manager.ye_P_childs, "aa")).toBeTruthy();
            });
        });

        describe("getChildsByTag", function () {
            it("调用YE.Tool.collection.getChildsByTag", function () {
                sandbox.stub(YE.Tool.collection, "getChildsByTag");

                manager.getChildsByTag("aa");

                expect(YE.Tool.collection.getChildsByTag.calledWith(manager.ye_P_childs, "aa")).toBeTruthy();
            });
        });

        describe("removeChildByTag", function () {
            it("调用YE.Tool.collection.removeChildByTag，删除时触发child的onexit和reset方法", function () {
                sandbox.stub(YE.Tool.collection, "removeChildByTag");

                manager.removeChildByTag("aa");

                expect(YE.Tool.collection.removeChildByTag.args[0][0]).toEqual(manager.ye_P_childs);
                expect(YE.Tool.collection.removeChildByTag.args[0][1]).toEqual("aa");

                var fakeChild = sandbox.createStubObj("onexit", "reset");
                YE.Tool.collection.removeChildByTag.getCall(0).callArgWith(2, fakeChild);
                expect(fakeChild.onexit.calledBefore(fakeChild.reset)).toBeTruthy();
            });
        });

        describe("removeChildsByTag", function () {
            it("调用YE.Tool.collection.removeChildsByTag，删除时触发child的onexit和reset方法", function () {
                sandbox.stub(YE.Tool.collection, "removeChildsByTag");

                manager.removeChildsByTag("aa");

                expect(YE.Tool.collection.removeChildsByTag.args[0][0]).toEqual(manager.ye_P_childs);
                expect(YE.Tool.collection.removeChildsByTag.args[0][1]).toEqual("aa");

                var fakeChild = sandbox.createStubObj("onexit", "reset");
                YE.Tool.collection.removeChildsByTag.getCall(0).callArgWith(2, fakeChild);
                expect(fakeChild.onexit.calledBefore(fakeChild.reset)).toBeTruthy();
            });
        });
    });
});