/**YEngine2D
 * 作者：YYC
 * 日期：2014-02-09
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Node", function () {
    var node = null;

    function getInstance() {
        var T = YYC.Class(YE.Node, {
            Init: function () {
                this.base();
            },
            Public: {
            }
        });

        return new T();
    }


    beforeEach(function () {
        node = getInstance();
    });
    afterEach(function () {
    });

    describe("init", function () {
        it("获得父节点", function () {
            var container = {};

            node.init(container);

            expect(node.getParent()).toEqual(container);
        });
    });

    describe("getParent", function () {
        it("获得父节点", function () {
        });
    });

    describe("getZOrder", function () {
        it("获得zOrder", function () {
        });
    });

    describe("ye_P_setZOrder", function () {
        it("设置元素z轴的显示顺序", function () {
            node.ye_P_setZOrder(1);

            expect(node.getZOrder()).toEqual(1);
        });
    });

    describe("外部钩子", function () {
        it("onstartLoop存在", function () {
            expect(node.onstartLoop).toBeExist();
        });
        it("onendLoop存在", function () {
            expect(node.onendLoop).toBeExist();
        });
        it("onbeforeRun存在", function () {
            expect(node.onbeforeRun).toBeExist();
        });
        it("onendRun存在", function () {
            expect(node.onafterRun).toBeExist();
        });
        it("onenter存在", function () {
            expect(node.onenter).toBeExist();
        });
        it("onexit存在", function () {
            expect(node.onexit).toBeExist();
        });
    });
});