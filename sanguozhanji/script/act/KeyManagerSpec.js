/**三国战记
 * 作者：YYC
 * 日期：2014-09-03
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("KeyManager", function () {
    var manager = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        manager = new KeyManager();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("keyUp", function () {
        var event = null;

        beforeEach(function () {
            event = sandbox.createStubObj("preventDefault");
        });
        afterEach(function () {
        });

        it("将_keyListener中不需要的按键信息(两次以前)移除", function () {
            sandbox.stub(manager, "_keyListener", [
                {},
                {},
                {keyCode: 5, time: 123}
            ]);
            event.keyCode = 10;

            manager.keyUp(event);

            expect(manager._keyListener.length).toEqual(2);
            expect(manager._keyListener).toEqual([
                {keyCode: 5, time: 123},
                {keyCode: 10, time: jasmine.any(Number)}
            ]);
        });
    });
});