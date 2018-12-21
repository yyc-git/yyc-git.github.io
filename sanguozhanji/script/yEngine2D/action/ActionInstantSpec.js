/**YEngine2D
 * 作者：YYC
 * 日期：2014-10-04
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("ActionInstant", function () {
    var action = null;

    function getInstance() {
        var T = YYC.Class(YE.ActionInterval, {
            Public: {
                copy: function () {
                },
                update: function () {
                },
                reverse: function () {
                }
            }
        });
        return new T();
    }

    beforeEach(function () {
        action = getInstance();

    });

    describe("start", function () {
        it("空方法", function () {
            expect(action.start).toBeExist();
        });
    });

    describe("stop", function () {
        it("空方法", function () {
            expect(action.stop).toBeExist();
        });
    });

    describe("isStop", function () {
        it("返回false", function () {
            expect(action.isStop()).toBeFalsy();
        });
    });

});
