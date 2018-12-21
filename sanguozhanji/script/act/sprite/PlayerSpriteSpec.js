/**三国战记
 * 作者：YYC
 * 日期：2014-09-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("PlayerSprite", function () {
    var sprite = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sprite = new PlayerSprite();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("getAnimDirection", function () {
        it("如果精灵往上移动，则精灵保持之前的动画方向", function () {
            sprite.direction = 0;
            sprite.lastDirection = 1;

            var result = sprite.getAnimDirection();

            expect(result).toEqual(sprite.lastDirection);
        });
        it("如果精灵往下移动，则精灵保持之前的动画方向", function () {
            sprite.direction = 2;
            sprite.lastDirection = 0;

            var result = sprite.getAnimDirection();

            expect(result).toEqual(sprite.lastDirection);
        });
        it("如果精灵往右移动，则动画方向为0", function () {
            sprite.direction = 1;

            var result = sprite.getAnimDirection();

            expect(result).toEqual(0);
        });
        it("如果精灵往左移动，则动画方向为1", function () {
            sprite.direction = 3;

            var result = sprite.getAnimDirection();

            expect(result).toEqual(1);
        });
    });
});
