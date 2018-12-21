/**三国战记
 * 作者：YYC
 * 日期：2014-10-09
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("EntityLayer", function () {
    var layer = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        layer = new EntityLayer();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("精灵绘制顺序", function () {
        var a = null,
            b = null;

        beforeEach(function () {
            a = sandbox.createStubObj("getPosX", "getPosY", "init", "onenter");
            b = sandbox.createStubObj("getPosX", "getPosY", "init", "onenter");
            layer.addChilds([a, b]);
        });

        it("如果精灵a在精灵b的下方，则a应该绘制在b的前面", function () {
            a.getPosY.returns(20);
            b.getPosY.returns(19);

            layer._sort();

            expect(layer.getChilds()).toEqual([b, a]);
        });
        it("否则b应该绘制在a的前面", function () {
            a.getPosY.returns(19);
            b.getPosY.returns(20);
            a.getPosX.returns(10);
            b.getPosX.returns(9);

            layer._sort();

            expect(layer.getChilds()).toEqual([a, b]);

            a.getPosY.returns(19);
            b.getPosY.returns(20);
            a.getPosX.returns(9);
            b.getPosX.returns(10);

            layer._sort();

            expect(layer.getChilds()).toEqual([a, b]);
        });
    });
});