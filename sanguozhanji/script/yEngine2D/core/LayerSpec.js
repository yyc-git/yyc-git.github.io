/**YEngine2D
 * 作者：YYC
 * 日期：2013-12-28
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Layer.js", function () {
    var layer = null;
    var sandbox = null;

    function getInstance(id, position) {
        var T = YYC.Class(YE.Layer, {
        });

        return new T(id, position);
    }

    function setCanvasData(layer, width, height) {
        sandbox.stub(layer, "getCanvasData").returns({
            width: width,
            height: height
        });
    }

    beforeEach(function () {
        layer = getInstance();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("构造函数", function () {
        function insertCanvas() {
            $("body").append($("<canvas id='t_c'></canvas>"));
        }

        function removeCanvas() {
            $("body").remove("#t_c");
        }

        beforeEach(function () {
            insertCanvas();
        });
        afterEach(function () {
            removeCanvas();
        });

        it("如果传入画布的id参数，则获得canvas", function () {
            layer = getInstance("t_c");

            expect(layer.ye___canvas).toBeCanvas();
        });
        it("如果传入画布的id参数和position参数，则获得canvas，设置画布position坐标", function () {
            layer = getInstance("t_c", {x: 10, y: 20});

            expect(layer.ye___canvas).toBeCanvas();
            expect(layer.ye___canvas.style.position).toEqual("absolute");
            expect(layer.ye___canvas.style.top).toEqual("20px");
            expect(layer.ye___canvas.style.left).toEqual("10px");
        });
        it("如果只传入position参数，不传入id参数，则报错", function () {
            expect(function () {
                layer = getInstance(null, {x: 10, y: 20});
            }).toThrow();
        });
        it("如果没有参数，则什么也不做，用户需要自己调用API来设置canvas", function () {
        });

        describe("设置state", function () {
            it("如果isChange返回true，则state设为change", function () {
                sandbox.stub(layer, "isChange").returns(true);

                layer.Init();

                expect(layer.ye___state).toEqual(layer.forTest_getState().CHANGE);
            });
            it("如果isChange返回false，则state设为normal", function () {
                sandbox.stub(layer, "isChange").returns(false);

                layer.Init();

                expect(layer.ye___state).toEqual(layer.forTest_getState().NORMAL);
            });
        });
    });

    describe("getGraphics", function () {
        it("返回graphics实例", function () {
        });
    });


    describe("change", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        it("判断钩子isChange方法的返回值，如果为true，则令状态为change", function () {
            sandbox.stub(layer, "setStateChange");
            layer.isChange = function () {
                return true;
            };

            layer.change();

            expect(layer.setStateChange.calledOnce).toBeTruthy();
        });
        it("否则，调用setStateNormal", function () {
            sandbox.stub(layer, "setStateNormal");
            layer.isChange = function () {
                return false;
            };

            layer.change();

            layer.isChange = function () {
            };

            layer.change();

            expect(layer.setStateNormal.callCount).toEqual(2);
        });
    });

    describe("ye_P_run", function () {
        function setStateNormal() {
            layer.setStateNormal();
        }

        function setStateChange() {
            layer.setStateChange();
        }

        beforeEach(function () {
            setStateNormal();

            sandbox.stub(layer, "iterate");
        });

        it("执行精灵的onstartLoop方法", function () {
            layer.ye_P_run();

            expect(layer.iterate.calledWith("onbeforeRun")).toBeTruthy();
        });
        it("执行精灵类所有动作", function () {
            layer.ye_P_run();

            expect(layer.iterate.calledWith("update")).toBeTruthy();
        });

        describe("如果_state为change", function () {
            beforeEach(function () {
                setStateChange();
                sandbox.stub(layer, "clear");
                sandbox.stub(layer, "change");
            });

            it("调用clear", function () {
                layer.ye_P_run();

                expect(layer.clear.calledOnce).toBeTruthy();
            });
            it("调用精灵类的onbeforeDraw方法", function () {
                layer.ye_P_run();

                expect(layer.iterate.thirdCall.calledWith("onbeforeDraw", [layer.getContext()])).toBeTruthy();
            });
            it("调用draw，传入context", function () {
                var fakeContext = {};
                sandbox.stub(layer, "draw");
                sandbox.stub(layer, "getContext").returns(fakeContext);

                layer.ye_P_run();

                expect(layer.draw.calledWith(fakeContext)).toBeTruthy();
            });
            it("调用精灵类的onafterDraw方法", function () {
                layer.ye_P_run();

                expect(layer.iterate.getCall(4).args).toEqual(["onafterDraw", [layer.getContext()]]);
            });
            it("恢复状态state为normal", function () {
                layer.setStateChange();

                layer.ye_P_run();

                expect(layer.ye___isNormal()).toBeTruthy();
            });
        });

        it("执行精灵的onendLoop方法", function () {
            layer.ye_P_run();

            expect(layer.iterate.calledWith("onafterRun")).toBeTruthy();
        });
        it("调用change方法", function () {
            sandbox.stub(layer, "change");

            layer.ye_P_run();

            expect(layer.change.calledOnce).toBeTruthy();
        });
    });

    describe("getCanvasData", function () {
        it("获得画布数据", function () {
            sandbox.stub(layer, "ye___canvas", {width: 1, height: 2});

            expect(layer.getCanvasData().width).toEqual(1);
            expect(layer.getCanvasData().height).toEqual(2);
        });
    });


    describe("封装Canvas，提供API", function () {
        function insertCanvas() {
            $("body").append($("<canvas id='t_c'></canvas>"));
        }

        function removeCanvas() {
            $("body").remove("#t_c");
        }

        beforeEach(function () {
            insertCanvas();

            layer.setCanvasById("t_c");
        });
        afterEach(function () {
            removeCanvas();
        });

        describe("setCanvasById", function () {
            it("如果canvasId对应的canvas不存在，则报错", function () {
                sandbox.stub(document, "getElementById").returns(null);

                expect(function () {
                    layer.setCanvasById("a");
                }).toThrow();
            });

            describe("获得canvas，并进行对应设置", function () {
                var fakeCanvas = null,
                    fakeContext = null;

                beforeEach(function () {
                    fakeContext = {};
                    fakeCanvas = {
                        getContext: sandbox.stub().returns(fakeContext)
                    };
                    sandbox.stub(document, "getElementById").returns(fakeCanvas);
                });
                afterEach(function () {
                });

                it("根据传入新的canvas的id来获得新的canvas", function () {
                    var canvasId = "a";


                    layer.setCanvasById(canvasId);

                    expect(layer.ye___canvas).toEqual(fakeCanvas);
                });
                it("获得context", function () {
                    layer.setCanvasById("a");

                    expect(layer.getContext()).toEqual(fakeContext);
                });
                it("如果没有创建Graphics实例，则创建之", function () {
                    var fakeGraphics = {a: 1};
                    layer.ye___graphics = null;
                    sandbox.stub(YE.Graphics, "create").returns(fakeGraphics);

                    layer.setCanvasById("a");

                    expect(YE.Graphics.create.calledWith(fakeContext)).toBeTruthy();
                    expect(layer.getGraphics()).toEqual(fakeGraphics);
                });
                it("否则，则更新Graphics示例的context", function () {
                    layer.ye___graphics = {
                        setContext: sandbox.stub()
                    };

                    layer.setCanvasById("a");

                    expect(layer.ye___graphics.setContext.calledWith(fakeContext)).toBeTruthy();
                });
//        it("创建Graphics实例", function () {
//            layer.init(null);
//
//            expect(layer.getGraphics()).toBeInstanceOf(YE.Graphics);
//        });
            });
            beforeEach(function () {

            });

//                function getFakeCanvas(layer) {
//                    sandbox.stub(layer, "ye___canvas",
//                        {
//                            getContext: function () {
//                                return {};
//                            },
//                            style: {
//                                position: null
//                            }
//                        }
//                    );
//                }
//
//                beforeEach(function () {
//                    getFakeCanvas(layer);
//                });


        });

        describe("setWidth", function () {
            it("设置画布宽度", function () {
            });
        });

        describe("setHeight", function () {
            it("设置画布高度", function () {
            });
        });

        describe("setZIndex", function () {
            it("设置画布层叠顺序zIndex", function () {
                layer.setZIndex(10);

                expect(layer.getZIndex()).toEqual(10);
            });
        });

        describe("getZIndex", function () {
            it("获得画布层叠顺序zIndex", function () {
            });
        });

        describe("setPosition", function () {
            it("设置position的定位模式，默认为绝对定位", function () {
                layer.setPosition(10, 20);

                expect(layer.ye___canvas.style.position).toEqual("absolute");

                layer.setPosition(10, 20, "relative");

                expect(layer.ye___canvas.style.position).toEqual("relative");
            });
            it("设置画布位置", function () {
                layer.setPosition(10, 20);

                expect(layer.ye___canvas.style.top).toEqual("20px");
                expect(layer.ye___canvas.style.left).toEqual("10px");
            });
        });
    });

    describe("getContext", function () {
        it("获得画布的context", function () {
        });
    });

    describe("isSetRunInterval", function () {
        it("判断是否设置了run的间隔时间", function () {
            expect(layer.isSetRunInterval()).toBeFalsy();

            layer.setRunInterval(10);

            expect(layer.isSetRunInterval()).toBeTruthy();
        });
    });


    describe("setRunInterval", function () {
        it("设置调用run的间隔时间", function () {
            var interval = 10;

            layer.setRunInterval(interval);

            expect(layer.ye___runInterval).toEqual(interval);
        });
        it("保存当前调用layer的时间", function () {
            var dateNow = 1000;
            sandbox.stub(layer, "ye___getTimeNow").returns(dateNow);

            layer.setRunInterval(10);

            expect(layer.ye___lastTime).toEqual(dateNow);
        });
    });

    describe("changeRunInterval", function () {
        it("更改调用run的间隔时间", function () {
            var fakeInterval = 10;

            layer.changeRunInterval(fakeInterval);

            expect(layer.ye___runInterval).toEqual(fakeInterval);
        });
    });


    describe("resumeRunInterval", function () {
        it("恢复为每次主循环都调用run", function () {
            layer.resumeRunInterval();

            expect(layer.ye___runInterval).toEqual(-1);
        });
    });

    describe("run", function () {
        describe("如果设置了调用layer的间隔时间", function () {
            var interval = 0;

            beforeEach(function () {
                interval = 1;
                layer.setRunInterval(interval);
            });

            it("如果还没有到调用run的时间，则返回", function () {
                layer.ye___lastTime = 100;
                sandbox.stub(layer, "ye___getTimeNow").returns(200);

                var result = layer.run();

                expect(result).toEqual(YE.returnForTest);
            });
            it("否则，保存当前调用layer的时间，执行父类的run方法", function () {
                layer.stubParentMethodByAClass(sandbox, "run");
                layer.ye___lastTime = 100;
                sandbox.stub(layer, "ye___getTimeNow").returns(1500);

                layer.run();

                expect(layer.ye___lastTime).toEqual(1500);
                expect(layer.lastBaseClassForTest.run.calledOnce).toBeTruthy();
            });
        });

        it("否则，执行父类的run方法", function () {
            layer.stubParentMethodByAClass(sandbox, "run");

            layer.run();

            expect(layer.lastBaseClassForTest.run.calledOnce).toBeTruthy();
        });
    });

    describe("startLoop", function () {
        beforeEach(function () {
            sandbox.stub(layer, "iterate");
            sandbox.stub(layer, "onstartLoop");
        });

        it("调用onstartLoop", function () {
            layer.startLoop();

            expect(layer.onstartLoop.calledOnce).toBeTruthy();
        });
        it("调用每个sprite的onstartLoop", function () {
            layer.startLoop();

            expect(layer.iterate.calledWith("onstartLoop")).toBeTruthy();
        });
        it("先调用自己的onstartLoop，再调用每个sprite的onstartLoop", function () {
            layer.startLoop();

            expect(layer.iterate.calledAfter(layer.onstartLoop)).toBeTruthy();
        });
    });

    describe("endLoop", function () {
        beforeEach(function () {
            sandbox.stub(layer, "iterate");
            sandbox.stub(layer, "onendLoop");
        });

        it("调用onendLoop", function () {
            layer.endLoop();

            expect(layer.onendLoop.calledOnce).toBeTruthy();
        });
        it("调用每个sprite的onendLoop", function () {
            layer.endLoop();

            expect(layer.iterate.calledWith("onendLoop")).toBeTruthy();
        });
        it("先调用每个sprite的onendLoop，再调用自己的onendLoop", function () {
            layer.endLoop();

            expect(layer.iterate.calledBefore(layer.onendLoop)).toBeTruthy();
        });
    });

    describe("虚方法", function () {
        describe("isChange", function () {
            it("默认返回true", function () {
                expect(layer.isChange()).toBeTruthy();
            });
        });

        describe("clear", function () {
            it("清空画布", function () {
                setCanvasData(layer, 1, 2);
                sandbox.stub(layer, "ye___context", sandbox.createSpyObj("clearRect"));

                layer.clear();

                expect(layer.getContext().clearRect.calledWith(0, 0, 1, 2)).toBeTruthy();
            });
        });

        describe("draw", function () {
            function addChilds(childs) {
                layer.ye__childs.addChilds(childs);
            }

            it("调用每个精灵类的draw方法，传入参数context、canvasWidth、canvasHeight", function () {
                var sprite1 = sandbox.createSpyObj("draw") ,
                    sprite2 = sandbox.createSpyObj("draw");
                setCanvasData(layer, 10, 20);
                addChilds([sprite1, sprite2]);

                layer.draw();

                expect(sprite1.draw.calledWith(layer.getContext())).toBeTruthy();
                expect(sprite2.draw.calledWith(layer.getContext())).toBeTruthy();
            });
        });
    });
})
;
