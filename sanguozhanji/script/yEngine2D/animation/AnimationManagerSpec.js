/**YEngine2D
 * 作者：YYC
 * 日期：2014-02-27
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("AnimationManager", function () {
    var manager = null,
        sandbox = null;

    function addChild(child) {
        manager.ye_P_childs.addChild(child);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = new YE.AnimationManager();
    });
    afterEach(function () {
        sandbox.restore();
    });




//    describe("update", function () {
//        var fakeAnim1 = null,
//            fakeAnim2 = null;
//
//        function buildFakeFps() {
//            sandbox.stub(YE.Director, "getInstance").returns({
//                getFps: function () {
//                    return 10;
//                }
//            });
//        }
//
//        beforeEach(function () {
//            fakeAnim1 = {
//                isFinish: function () {
//                    return false;
//                },
//                isStop: function () {
//                    return false;
//                },
//                update: function () {
//                }
//            };
//            fakeAnim2 = {
//                isFinish: function () {
//                    return false;
//                },
//                isStop: function () {
//                    return false;
//                },
//                update: function () {
//                }
//            };
//        });
//
//        it("如果动画已经完成，则进入下一次循环", function () {
//            sandbox.stub(fakeAnim1, "isFinish").returns(true);
//            sandbox.stub(fakeAnim1, "update");
//            sandbox.stub(fakeAnim2, "isFinish").returns(false);
//            sandbox.stub(fakeAnim2, "update");
//            addChild(fakeAnim1);
//            addChild(fakeAnim2);
//
//            manager.update();
//
//            expect(fakeAnim1.update.callCount).toEqual(0);
//            expect(fakeAnim2.isFinish.calledOnce).toBeTruthy();
//
//        });
//        it("如果动画已经停止，则进入下一次循环", function () {
//            sandbox.stub(fakeAnim1, "isStop").returns(true);
//            sandbox.stub(fakeAnim1, "update");
//            sandbox.stub(fakeAnim2, "isStop").returns(false);
//            sandbox.stub(fakeAnim2, "update");
//            addChild(fakeAnim1);
//            addChild(fakeAnim2);
//
//            manager.update();
//
//            expect(fakeAnim1.update.callCount).toEqual(0);
//            expect(fakeAnim2.update.calledOnce).toBeTruthy();
//        });
//        it("否则，执行动画的update方法，传入游戏主循环的间隔时间（以秒为单位）", function () {
//            buildFakeFps();
//            sandbox.stub(fakeAnim1, "isFinish").returns(false);
//            sandbox.stub(fakeAnim1, "update");
//            sandbox.stub(fakeAnim2, "isFinish").returns(false);
//            sandbox.stub(fakeAnim2, "update");
//            addChild(fakeAnim1);
//            addChild(fakeAnim2);
//
//            manager.update();
//
//            expect(fakeAnim1.update.calledWith(1 / 10)).toBeTruthy();
//            expect(fakeAnim2.update.calledWith(1 / 10)).toBeTruthy();
//        });
//    });
});