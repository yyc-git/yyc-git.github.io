/**YEngine2D
 * 作者：YYC
 * 日期：2014-01-13
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Geometry", function () {
    describe("rect", function () {
        it("方法存在", function () {
            expect(YE.rect).toBeExist();
        });
        it("返回格式化的切片区域数据", function () {
           var imgData = YE.rect(1, 2, 10, 20);

            expect(imgData).toEqual({
                origin: {x: 1, y: 2},
                size: {width: 10, height: 20}
            });
        });
    });
});