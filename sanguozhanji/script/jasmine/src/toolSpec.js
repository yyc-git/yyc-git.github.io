/**
 * Created with yyc
 * Date: 2014-09-01
 */
describe("jasmine工具类testTool", function () {
    var tool = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        tool = testTool;
    });
    afterEach(function () {
        sandbox.restore();
    });

//    describe("buildFakeObj", function () {
//        describe("参数为3个", function () {
//            it("对象加上指定名字的fakeFunc", function () {
//                var fakeYYC = {};
//                var func = function (obj) {
//                    return obj.toString();
//                };
//
//                tool.buildFakeObj(fakeYYC, ["toString"], func);
//
//                expect(fakeYYC).toEqual({
//                    toString: func
//                });
//            });
//        });
//
//        describe("参数为2个", function () {
////            it("可以创建多层次的fake object对象", function () {
////                var func = function (obj) {
////                    return obj.toString();
////                };
////
////                var fakeYYC = tool.buildFakeObj(["Tool", "toString"], func);
////
////                expect(fakeYYC).toEqual({
////                    Tool: {
////                        toString: func
////                    }
////                });
////            });
//            it("可以创建有多个fakeFunc的fake object对象", function () {
//                var fakeYYC = {};
//                var func = function (obj) {
//                    return obj.toString();
//                };
//
//                tool.buildFakeObj(fakeYYC, ["toString", "b"], func);
//
//                expect(fakeYYC).toEqual({
//                    toString: func,
//                    b: func
//                });
//            });
//        });
//    });

    describe("asyncRun", function () {
        var t = null;

        beforeEach(function () {
            t = 0;
        });
        afterEach(function () {
        });

        describe("参数为2个", function () {
            it("延迟time时间后测试", function () {
                var expectFunc = function () {
                        expect(t).toEqual(1);
                    }   ,
                    time = 50;
                setTimeout(function () {
                    t = 1;
                }, 50);

                testTool.asynRun(expectFunc, time);
            });
        });

        describe("参数为3个", function () {
            it("callback被调用后，再进行测试（不会执行callback，如需执行，可采用“延迟time时间后测试”）", function () {
                var obj = {
                    done: function () {
                        var self = this;

                        setTimeout(function () {
                            t += 1;
                            self.onload();
                            t += 1;
                        }, 50);
                    },
                    //onload应该为空方法，如果不是，则里面的代码也不会执行
                    onload: function () {
                        t = 100;    //不执行
                    }
                };
                var expectFunc = function () {
                    expect(t).toEqual(2);
                };

                obj.done();

                testTool.asynRun(expectFunc, obj, "onload");
            });
        });
    });
});