/**YEngine2D
 * 作者：YYC
 * 日期：2014-05-17
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("SoundManager", function () {
    var manager = null;
    var sandbox = null;

    beforeEach(function () {
        manager = new YE.SoundManager();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("该类为单例类", function () {
        testTool.judgeSingleInstance(YE.SoundManager);
    });

    describe("play", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("如果声音没有被加载，则返回", function () {
            sandbox.stub(YE.SoundLoader, "getInstance").returns({
                get: sandbox.stub().returns(undefined)
            });

            var result = manager.play("");

            expect(result).toEqual(YE.returnForTest);
        });
        it("依次播放声音数组", function () {
            var fakeSound1 = sandbox.createSpyObj("play"),
                fakeSound2 = sandbox.createSpyObj("play");
            sandbox.stub(YE.SoundLoader, "getInstance").returns({
                get: sandbox.stub().returns([fakeSound1, fakeSound2])
            });

            manager.play();
            manager.play();
            manager.play();

            expect(fakeSound1.play.firstCall.calledBefore(fakeSound2.play.firstCall)).toBeTruthy();
            expect(fakeSound1.play.callCount).toEqual(2);
            expect(fakeSound2.play.callCount).toEqual(1);
        });
    });
});
