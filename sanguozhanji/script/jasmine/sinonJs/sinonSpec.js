describe("测试SinonJs", function () {
    describe("测试Spy组件", function () {
        it("如果方法被stub了，那它也被spy了", function () {
            var a = {
                done: function () {
                    return 1;
                }
            };
            var t = {
                done: function (num) {
                    return a.done(num);
                }
            };
            sinon.stub(a, "done");

            t.done(10);
            t.done(20);

            expect(a.done.firstCall.args[0]).toEqual(10);
            expect(a.done.getCall(1).args[0]).toEqual(20);
        });
        it("测试calledWith", function () {
            var a = {
                done: function () {
                    return 1;
                }
            };
            var spy = sinon.spy(a, "done");

            a.done(1, 2);

            expect(spy.calledWith(1, 2)).toBeTruthy();
        });
        it("测试withArgs，Creates a spy that only records calls when the received arguments match those passed to withArgs.", function () {
            var object = { method: function () {
            } };
            var spy = sinon.spy(object, "method");
            spy.withArgs(42);
            spy.withArgs(1);

            object.method(42);
            object.method(1);

            expect(spy.withArgs(42).calledOnce).toBeTruthy();
            expect(spy.withArgs(1).callCount).toEqual(1);
        });
        it("测试calledBefore、calledAfter", function () {
            var t = {
                a: sinon.spy(),
                b: sinon.spy()
            };

            t.b();
            t.a();

            expect(t.a.calledAfter(t.b)).toBeTruthy();
            expect(t.b.calledBefore(t.a)).toBeTruthy();
        });
        it("spy的方法仍然会执行！", function () {
            var a = {
                done: function () {
                    throw new Error("");
                }
            };
            var t = {
                done: function () {
                    a.done();
                }
            };
            sinon.spy(a, "done");


            expect(t.done).toThrow();
        });
    });


    describe("测试Stub组件", function () {
        describe("创建B类的测试桩，并通过参数注入A类实例。使用createStubInstance方法创建B的桩（需要先建立B）", function () {
            function A(b) {
                this.num = 0;
                this._b = b;
            }

            A.prototype.run = function (arg) {
                this.num = this._b.getNum(arg);
            };

            var B = sinon.createClass("getNum");

            it("调用Stub的withArgs、returns", function () {
                var stub = sinon.createStubInstance(B);
                stub.getNum.withArgs(1).returns(2);

                var a = new A(stub);
                a.run(1);

                expect(a.num).toEqual(2);
            });
            it("查看测试桩的调用信息（测试桩被spy了）", function () {
                var stub = sinon.createStubInstance(B);
                stub.getNum.withArgs(1).returns(2);

                var a = new A(stub);
                a.run(1);

                expect(stub.getNum.calledOnce).toBeTruthy();
                expect(stub.getNum.calledWith(1)).toBeTruthy();
            });
        });

        describe("stub方法", function () {
            var a = {
                done: function () {
                    return 1;
                }
            };
            var t = {
                done: function () {
                    return a.done();
                }
            };

            it("可以stub方法", function () {
                sinon.stub(a, "done");
                a.done.returns(10);

                expect(t.done()).toEqual(10);

                a.done.returns(20);

                expect(t.done()).toEqual(20);
            });
            it("stub会影响后续测试", function () {
                expect(t.done()).toEqual(20);
            });
        });

        it("stub的方法不会执行", function () {
            var mmm = 10;
            var a = {
                done: function () {
                    m = 1;
                }
            };
            var t = {
                done: function () {
                    a.done();
                }
            };
            sinon.stub(a, "done");

            t.done();

            expect(mmm).toEqual(10);
        });
        it("可以设置stub方法每次调用的行为", function () {
            var a = {
                done: function () {
                    return 1;
                }
            };
            var t = {
                done: function () {
                    return a.done();
                }
            };
            sinon.stub(a, "done");
            a.done.onCall(0).returns(10);
            a.done.onCall(1).returns(20);
            a.done.onThirdCall().returns(30);

            expect(t.done()).toEqual(10);
            expect(t.done()).toEqual(20);
            expect(t.done()).toEqual(30);
        });
        it("withArgs方法可以指定每次调用的行为", function () {
            var callback = sinon.stub();
            callback.withArgs(3).returns(1);
            callback.withArgs(1, 2).returns(2);

            expect(callback(3)).toEqual(1);
            expect(callback(1, 2)).toEqual(2);
        });
    });

    describe("调用stub或spy的方法的参数", function () {
        var t = null;

        beforeEach(function () {
            t = {
                a: sinon.stub()
            };
        });
        afterEach(function () {
        });

        it("callArg可调用指定序号的参数", function () {
            var m = 0;
            t.a(function () {
                m = 100;
            });

            expect(m).toEqual(0);

            t.a.callArg(0);

            expect(m).toEqual(100);
        });
        it("可以精确到某一次的调用", function () {
            var m = 0;
            t.a(function () {
                m = 100;
            });
            t.a(function () {
                m = 200;
            });

            expect(m).toEqual(0);

            t.a.getCall(1).callArg(0);

            expect(m).toEqual(200);
        });
        it("callArgOn(index, context)，可传入上下文", function () {
            var obj = {
                m: 0
            };

            t.a(function () {
                this.m = 100;
            });

            expect(obj.m).toEqual(0);

            t.a.callArgOn(0, obj);

            expect(obj.m).toEqual(100);
        });
        it("callArgWith(index, arg1, arg2, ...)，可传入参数", function () {
            var m = 0;
            t.a(function (val) {
                m = val;
            });

            expect(m).toEqual(0);

            t.a.callArgWith(0, 100);

            expect(m).toEqual(100);
        });
        it("callArgOnWith(index, context, arg1, arg2, ...)", function () {
            var obj = {
                m: 0
            };
            t.a(function (val1, val2) {
                obj.m = val1 + val2;
            });

            expect(obj.m).toEqual(0);

            t.a.callArgOnWith(0, obj, 100, 200);

            expect(obj.m).toEqual(300);
        });
    });

    describe("onCall与getCall的区别", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("onCall控制某次调用的行为，在方法调用前设置", function () {
            var a = {
                done: function () {
                    return 1;
                }
            };
            var t = {
                done: function () {
                    return a.done();
                }
            };
            sinon.stub(a, "done");
            a.done.onCall(0).returns(10);
            a.done.onCall(1).returns(20);
            a.done.onThirdCall().returns(30);

            expect(t.done()).toEqual(10);
            expect(t.done()).toEqual(20);
            expect(t.done()).toEqual(30);
        });
        it("getCall判断某次调用的行为，在方法调用后设置", function () {
            var t = {
                done: sinon.stub()
            };

            t.done(1);
            t.done(2);

            expect(t.done.getCall(0).calledWith(1)).toBeTruthy();
            expect(t.done.secondCall.calledWith(2)).toBeTruthy();
        });
    });


    describe("断言传入的参数", function () {
        var t = null;

        beforeEach(function () {
            t = {
                done: sinon.stub()
            };

            t.done(1);
            t.done(2);
        });
        afterEach(function () {
        });

        it("args为传入参数的二维数组，对应每次调用传入的参数", function () {
            expect(t.done.args[0][0]).toEqual(1);
            expect(t.done.args[1][0]).toEqual(2);
        });
        it("测试2", function () {
            expect(t.done.firstCall.args[0]).toEqual(1);
            expect(t.done.getCall(1).args[0]).toEqual(2);
        });
    });

    describe("测试包含创建实例逻辑的方法。如测试引擎的create方法", function () {
        var sandbox = null;

        beforeEach(function () {
            window.T = YYC.Class({
                Public: {
                    initWhenCreate: function () {
                    }
                },
                Static: {
                    create: function () {
                        var t = new this();

                        t.initWhenCreate();
                        return t;
                    }
                }
            });
            sandbox = sinon.sandbox.create();
        });
        afterEach(function () {
            sandbox.restore();
        });

        it("测试", function () {
            var stub = sandbox.stub(),
                fakeT = function () {
                    this.initWhenCreate = stub;
                };
            fakeT.create = window.T.create;
            sandbox.stub(window, "T", fakeT);

            window.T.create();

            expect(stub.calledOnce).toBeTruthy();
        });
    });

    describe("测试构造函数的示例", function () {
        var sandbox = null;

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
        });
        afterEach(function () {
            sandbox.restore();
        });

        it("测试1", function () {
            var T = YYC.Class({
                Init: function () {
                    return 1;
                }
            });
            var t = new T();

            var result = t.Init();

            expect(result).toEqual(1);
        });
        it("测试2", function () {
            var A = YYC.AClass({
                Init: function () {
                    return 1;
                }
            });
            var B = YYC.Class(A, {
                Init: function () {
                    var t = this.base();

                    return 1 + t;
                }
            });
            var b = new B();
            b.stubParentMethod(sandbox, "Init", function () {
                return 100;
            });

            var result = b.Init();

            expect(result).toEqual(101);
        });
    });


    describe("测试Mock组件", function () {
        //*产品代码

        function A(b) {
            this.num = 0;
            this._b = b;
        }

        A.prototype.run = function (arg) {
            this.num = this._b.getNum(arg) + this._b.getNum(arg + 1);
        };

        //建立空的B类
        var B = sinon.createClass("getNum");

        it("对B类进行mock（需要先创建B）", function () {
            var mock = sinon.mock(B.prototype);

            mock.expects("getNum").once().withArgs(1).returns(5);
            mock.expects("getNum").once().withArgs(2).returns(10);

            var a = new A(new B()); //此处传入B类实例，而不是传入mock！
            a.run(1);

            expect(a.num).toEqual(15);

            mock.verify();
        });
        it("退化为stub（没有进行verify验证）", function () {
            var b = sinon.createObj("getNum");
            var mock = sinon.mock(b);

            mock.expects("getNum").withArgs(1).returns(5);
            mock.expects("getNum").withArgs(2).returns(10);

            var a = new A(b);
            a.run(1);

            expect(a.num).toEqual(15);
        })
    });

    describe("测试Sandbox组件", function () {
        var sandbox = null;

        //*产品代码

        function A() {
        }

        A.prototype.run = function () {
            return window.Global.get();
        };

        window.Global = {
            val: 100,
            m: {
                a: 1,
                b: 2
            },
            get: function () {
                return 50;
            }
        };

        beforeEach(function () {
            sandbox = sinon.sandbox.create();
        });

        it("修改全局对象Global的方法进行stub或者mock后，调用sandbox.restore即可一次性复原", function () {
            sandbox.stub(window.Global, "get").returns(2);

            var a = new A();

            expect(a.run()).toEqual(2);

            sandbox.restore();

            expect(a.run()).toEqual(50);
        });
        it("对Global的属性进行stub，并调用sandbox.restore即可一次性复原", function () {
            sandbox.stub(window.Global, "val", 2);
            sandbox.stub(window.Global, "m", {a: 10});

            expect(window.Global.val).toEqual(2);
            expect(window.Global.m.a).toEqual(10);

            sandbox.restore();

            expect(window.Global.val).toEqual(100);
        });

        it("可以fake一个全局object类", function () {
            var fakeTestLayer = {a: 1};
            sandbox.stub(window, "testLayer", fakeTestLayer);

            expect(window.testLayer.a).toEqual(1);

            sandbox.restore();

            expect(window.testLayer).toBeUndefined();
        });
    });

    describe("createSpyObj", function () {
        it("创建被spy的object实例", function () {
            var t = sinon.createSpyObj("a", "b");

            t.a();
            t.b();

            expect(t.a.calledOnce).toBeTruthy();
        });
    });

    it("修改sinon.js源码，现在可以fake对象的方法了", function () {
        var t = {
            a: function () {
                return 1;
            }
        };

        sinon.stub(t, "a", function () {
            return 2;
        });

        expect(t.a()).toEqual(2);
    });

    it("“想要stub/spy对象的方法，但不知该方法是否存在”的示例代码", function () {
        var t = {};
        var backup = t.a;
        t.a = sinon.stub();

        t.a();

        expect(t.a.calledOnce).toBeTruthy();

        t.a = backup;
    });


//    describe("测试我增加的组件-Fake组件", function () {
//        //*产品代码
//
//        window.testSinonFake = {
//            val: 100,
//            method: function () {
//                return 50;
//            }
//        };
//
//        it("可以替换全局对象的对应成员（全局对象中没有被替换的成员不受影响），然后调用restore恢复", function () {
//            var fake = sinon.fake.createObj("testSinonFake");
//            fake.replace({
//                val: 5
//            });
//
//            expect(window.testSinonFake.val).toEqual(5);
//            expect(window.testSinonFake.method()).toEqual(50);
//
//            fake.restore();
//
//            expect(window.testSinonFake.val).toEqual(100);
//            expect(window.testSinonFake.method()).toEqual(50);
//        });
//        it("可以fake不存在的对象", function(){
//            var fake = sinon.fake.createObj("testSinonFake.a");
//            fake.replace({
//                m: 5
//            });
//
//            expect(window.testSinonFake.a.m).toEqual(5);
//            expect(window.testSinonFake.method()).toEqual(50);
//
//            fake.restore();
//
//            expect(window.testSinonFake.a).toBeUndefined();
//            expect(window.testSinonFake.method()).toEqual(50);
//        });
//    })
});

