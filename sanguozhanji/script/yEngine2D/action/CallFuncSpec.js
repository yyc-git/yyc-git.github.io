/**YEngine2D
 * 作者：YYC
 * 日期：2014-04-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("CallFunc", function () {
    var action = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        action = new YE.CallFunc();
    });
    afterEach(function () {
    });

    describe("init", function () {
        it("获得方法上下文、方法、传入方法的参数数组", function () {
        });
    });

    describe("update", function () {
//        it("如果方法为空，则直接完成动作", function () {
//            sandbox.stub(action, "finish");
//
//            action.update();
//
//            expect(action.finish.calledOnce).toBeTruthy();
//        });

//        describe("否则", function () {
        var context = null,
            func = null,
            data = null,
            target = null;

        beforeEach(function () {
            context = {};
            func = sandbox.createSpyObj("call");
            data = 1;
            target = {a: 1};
            action = YE.CallFunc.create(context, func, data);
            sandbox.stub(action, "getTarget").returns(target);
        });

        it("调用方法，设置其上下文为context，并传入target和参数数组", function () {
            action.update();

            expect(func.call.calledWith(context, target, [data])).toBeTruthy();
        });
        it("完成动作", function () {
            sandbox.stub(action, "finish");

            action.update();

            expect(action.finish.calledOnce).toBeTruthy();
        });
//        });
    });

    describe("copy", function () {
        it("返回动作副本", function () {
            var a = action.copy();

            expect(a).toBeInstanceOf(YE.CallFunc);
            expect(a === action).toBeFalsy();

        });
        it("传入的参数要进行深拷贝", function () {
            var data = {a: 1};
            action = YE.CallFunc.create(null, null, data);

            var a = action.copy();
            a.ye___dataArr[0].a = 100;

            expect(data.a).toEqual(1);
        });
    });

    describe("reverse", function () {
        it("直接返回动作", function () {
            expect(action.reverse()).toBeSame(action);
        });
    });

//    describe("isFinish", function () {
//        it("返回true", function () {
//            expect(action.isFinish()).toBeTruthy();
//        });
//    });


    describe("create", function () {
        it("创建实例并返回", function () {
            expect(YE.CallFunc.create()).toBeInstanceOf(YE.CallFunc);
        });
    });
});
   