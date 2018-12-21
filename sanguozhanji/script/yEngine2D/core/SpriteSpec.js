describe("Sprite.js", function () {
    var sprite = null;
    var sandbox = null;

    function getInstance(bitmap) {
        var T = YYC.Class(YE.Sprite, {
        });

        return new T(bitmap);
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        sprite = getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("构造函数", function () {
        it("获得displayTarget", function () {
            var sprite = getInstance({});

            expect(sprite.ye___displayTarget).toEqual({});
        });
        it("创建ActionManager实例", function () {
            var sprite = getInstance();

            expect(sprite.ye___actionManager).toBeInstanceOf(YE.ActionManager);
        });
        it("创建AnimationManager实例", function () {
            var sprite = getInstance();

            expect(sprite.ye___animationManager).toBeInstanceOf(YE.AnimationManager);
        });
        it("创建AnimationFrameManager实例", function () {
            var sprite = getInstance();

            expect(sprite.getAnimationFrameManager()).toBeInstanceOf(YE.AnimationFrameManager);
        });
    });

    describe("init", function () {
        var container = {};

        function buildFakeContainer() {
            return sandbox.createSpyObj("getContext", "getGraphics", "getCanvasData");
        }

        beforeEach(function () {
            container = buildFakeContainer();
        });

//        it("获得父节点", function () {
//            sprite.init(container);
//
//            expect(sprite.getParent()).toEqual(container);
//        });
        it("获得context", function () {
            sprite.init(container);

            expect(container.getContext.calledOnce).toBeTruthy();
        });
        it("获得graphics", function () {
            sprite.init(container);

            expect(container.getGraphics.calledOnce).toBeTruthy();
        });
        it("获得canvasData", function () {
            sprite.init(container);

            expect(container.getCanvasData.calledOnce).toBeTruthy();
        });
    });

    describe("getGraphics", function () {
        it("返回graphics实例", function () {
        });
    });

    describe("getContext", function () {
        it("获得所在画布的context", function () {
        });
    });

    describe("runAction", function () {
        beforeEach(function () {
            sandbox.stub(sprite.ye___actionManager, "addChild");
        });

        it("如果传入了tag，则设置该动作的tag", function () {
            var fakeAction = sandbox.createStubObj("setTag");

            sprite.runAction(fakeAction, "a");

            expect(fakeAction.setTag.calledWith("a")).toBeTruthy();
        });

        describe("动作序列actionManager中只能有1个uid相同的动作或者tag相同的动作", function () {
            it("如果已经加入了该动作，则返回", function () {
                var fakeAction = {
                };
                sandbox.stub(sprite.ye___actionManager, "hasChild").returns(true);

                var result = sprite.runAction(fakeAction);

                expect(result).toEqual(YE.returnForTest);
                expect(sprite.ye___actionManager.addChild.called).toBeFalsy();
            });
            it("如果已经加入了同一tag的动作，则返回", function () {
                var fakeAction = {
                    setTag: sandbox.stub()
                };
                sandbox.stub(sprite.ye___actionManager, "hasChild").onCall(0).returns(true);
                sprite.ye___actionManager.hasChild.onCall(1).returns(true);

                var result = sprite.runAction(fakeAction, "a");

                expect(result).toEqual(YE.returnForTest);
                expect(sprite.ye___actionManager.addChild.called).toBeFalsy();
            });
        });

        it("加入动作，传入精灵实例", function () {
            var fakeAction = {};

            sprite.runAction(fakeAction);

            expect(sprite.ye___actionManager.addChild.calledWith(fakeAction, sprite)).toBeTruthy();
        });
    });

//    describe("runOnlyOneAction", function () {
//        beforeEach(function () {
//            sandbox.stub(sprite, "runAction");
//        });
//
//        it("如果精灵当前正在执行1个动作且该动作为准备执行的动作，则返回", function () {
//            sandbox.stub(sprite, "ye___actionManager", {
//                getCount: sandbox.stub().returns(1),
//                hasChild: sandbox.stub().returns(true)
//            });
//
//            var result = sprite.runOnlyOneAction({});
//
//            expect(result).toEqual(YE.returnForTest);
//        });
//        it("删除执行的所有动作", function () {
//            sandbox.stub(sprite, "ye___actionManager", {
//                getCount: sandbox.stub().returns(2),
//                removeAll: sandbox.stub()
//            });
//
//            sprite.runOnlyOneAction({});
//
//            expect(sprite.ye___actionManager.removeAll.calledOnce).toBeTruthy();
//
//        });
//        it("执行指定动作", function () {
//            var action = {};
//            sandbox.stub(sprite, "ye___actionManager", {
//                getCount: sandbox.stub().returns(2),
//                removeAll: sandbox.stub()
//            });
//
//            sprite.runOnlyOneAction(action);
//
//            expect(sprite.runAction.calledWith(action)).toBeTruthy();
//        });
//    });
    describe("runOnlyOneAction", function () {
        beforeEach(function () {
            sandbox.stub(sprite, "runAction");
            sandbox.stub(sprite, "ye___actionManager", {
//                getCount: sandbox.stub().returns(2),
                hasChild: sandbox.stub(),
                removeAll: sandbox.stub()
            });
        });

//        it("如果运行的动作数大于1，则删除运行的所有动作", function () {
//            sandbox.stub(sprite, "ye___actionManager", {
//                getCount: sandbox.stub().returns(2),
//                removeAll: sandbox.stub()
//            });
//
//            sprite.runOnlyOneAction({});
//
//            expect(sprite.ye___actionManager.removeAll.calledOnce).toBeTruthy();
//        });
//        it("如果运行的动作数为1且该动作不是要运行的动作，则删除运行的所有动作", function () {
//            sandbox.stub(sprite, "ye___actionManager", {
//                getCount: sandbox.stub().returns(1),
//                hasChild: sandbox.stub().returns(false),
//                removeAll: sandbox.stub()
//            });
//
//            sprite.runOnlyOneAction({});
//
//            expect(sprite.ye___actionManager.removeAll.calledOnce).toBeTruthy();
//        });

        describe("动作序列actionManager中只能有1个uid相同的动作或者tag相同的动作", function () {
            it("如果已经加入了该动作，则返回", function () {
                var fakeAction = {
                };
                sprite.ye___actionManager.hasChild.returns(true);

                var result = sprite.runOnlyOneAction(fakeAction);

                expect(result).toEqual(YE.returnForTest);
                expect(sprite.runAction.called).toBeFalsy();
            });
            it("如果已经加入了同一tag的动作，则返回", function () {
                var fakeAction = {
                };
                sprite.ye___actionManager.hasChild.onCall(0).returns(true);
                sprite.ye___actionManager.hasChild.onCall(1).returns(true);

                var result = sprite.runOnlyOneAction(fakeAction, "a");

                expect(result).toEqual(YE.returnForTest);
                expect(sprite.runAction.called).toBeFalsy();
            });
        });

        it("删除执行的所有动作", function () {
            sprite.runOnlyOneAction({});

            expect(sprite.ye___actionManager.removeAll.calledOnce).toBeTruthy();

        });
        it("运行指定动作", function () {
            var action = {};
//            sandbox.stub(sprite, "ye___actionManager", {
//                getCount: sandbox.stub().returns(0)
//            });

            sprite.runOnlyOneAction(action);

            expect(sprite.runAction.calledWith(action)).toBeTruthy();
        });
    });

    describe("getCurrentActions", function () {
        it("获得执行的动作数组", function () {
            var action = [
                {}
            ];
            sandbox.stub(sprite.ye___actionManager, "getChilds").returns(action);

            expect(sprite.getCurrentActions()).toEqual(action);
        });
    });

    describe("getCurrentAction", function () {
        it("如果没有执行的动作，抛出异常", function () {
            sandbox.stub(sprite, "getCurrentActions").returns([]);

            expect(sprite.getCurrentAction).toThrow();
        });
        it("如果当前执行的动作不止一个，断言提示，返回最近加入执行的动作", function () {
            var action1 = {},
                action2 = {a: 1};
            sandbox.stub(sprite, "getCurrentActions").returns([action1, action2]);

            expect(function () {
                sprite.getCurrentAction();
            }).toAssert();
            expect(sprite.getCurrentAction()).toEqual(action2);
        });
        it("获得当前执行的动作", function () {
            var action = {};
            sandbox.stub(sprite, "getCurrentActions").returns([action]);

            expect(sprite.getCurrentAction()).toEqual(action);
        });
    });

    describe("removeAllActions", function () {
        it("移除执行的所有动作", function () {
            sandbox.stub(sprite.ye___actionManager, "removeAll");

            sprite.removeAllActions();

            expect(sprite.ye___actionManager.removeAll.calledOnce).toBeTruthy();
        });
    });

    describe("update", function () {
        var fakeManager = null;

        beforeEach(function () {
            fakeManager = sandbox.createSpyObj("update");
        });

        it("执行动作", function () {
            sprite.ye___actionManager = fakeManager;

            sprite.update();

            expect(sprite.ye___actionManager.update.calledOnce).toBeTruthy();
        });
        it("播放动画", function () {
            sprite.ye___animationManager = fakeManager;

            sprite.update();

            expect(sprite.ye___animationManager.update.calledOnce).toBeTruthy();
        });
    });

    describe("操作坐标", function () {
        describe("setPosition", function () {
            it("设置精灵坐标", function () {
                sprite.setPosition(5, 10);

                expect(sprite.getPositionX()).toEqual(5);
                expect(sprite.getPositionY()).toEqual(10);
            });
        });

        describe("setPositionX", function () {
            it("设置精灵坐标X", function () {
            });
        });

        describe("setPositionY", function () {
            it("设置精灵坐标Y", function () {
            });
        });

        describe("getPositionX", function () {
            it("获得精灵坐标X", function () {
            });
        });

        describe("getPositionY", function () {
            it("获得精灵坐标Y", function () {
            });
        });
    });

    describe("操作displayTarget", function () {
        describe("setDisplayTarget", function () {
            it("设置displayTarget", function () {
            });
        });
    });

    describe("精灵大小操作", function () {

        describe("getWidth", function () {
            it("获得精灵宽度", function () {
            });
        });

        describe("setWidth", function () {
            it("设置精灵宽度", function () {
            });
        });

        describe("setHeight", function () {
            it("设置精灵高度", function () {
            });
        });

        describe("getHeight", function () {
            it("获得精灵高度", function () {
            });
        });
    });

    describe("setClipRange", function () {
        it("设置画布剪辑区域", function () {
            var range = [
                {x: 1, y: 1},
                {x: 2, y: 1}
            ];

            sprite.setClipRange(range);

            expect(sprite.ye___clipRange).toEqual(range);
        });
    });

    describe("动画", function () {
        describe("getAnimationFrameManager", function () {
            it("获得animationFrameManager实例", function () {
            });
        });

//        describe("runAnim", function () {
//            beforeEach(function () {
//                sandbox.stub(sprite, "ye___animationFrameManager", {
//                    initAndReturnAnim: sandbox.stub()
//                });
//                sandbox.stub(sprite, "ye___animationManager", {
//                    hasChild: sandbox.stub(),
//                    addChild: sandbox.stub().returns(false)
//                });
//            });
//
//            it("如果已经加入了该动画，则更新动画数据并返回", function () {
//                sprite.ye___animationManager.hasChild.returns(true);
//
//                var result = sprite.runAnim("a", 1, 2, 3, 4);
//
//                expect(sprite.ye___animationManager.hasChild.calledWith("a")).toBeTruthy();
//                expect(sprite.ye___animationFrameManager.initAndReturnAnim.calledWith("a", [1, 2, 3, 4])).toBeTruthy();
//                expect(result).toEqual(YE.returnForTest);
//            });
//            it("初始化动画，生成动画绘制数据", function () {
//                var animName = "a";
//
//                sprite.runAnim(animName, 1, 2, 3, 4);
//
//                expect(sprite.ye___animationFrameManager.initAndReturnAnim.calledWith(animName, [1, 2, 3, 4])).toBeTruthy();
//            });
//            it("加入到AnimationManager的anim中，传入精灵实例", function () {
//                var fakeAnim = {};
//                sprite.ye___animationFrameManager.initAndReturnAnim.returns(fakeAnim);
//
//                sprite.runAnim();
//
//                expect(sprite.ye___animationManager.addChild.calledWith(fakeAnim, sprite)).toBeTruthy();
//            });
//        });


//        describe("runOnlyOneAnim", function () {
//            beforeEach(function () {
//                sandbox.stub(sprite, "runAnim");
//            });
//
//            it("如果精灵当前正在播放1个动画且该动画为准备播放的动画，则返回", function () {
//                sandbox.stub(sprite, "ye___animationManager", {
//                    getCount: sandbox.stub().returns(1),
//                    hasChild: sandbox.stub().returns(true)
//                });
//
//                var result = sprite.runOnlyOneAnim();
//
//                expect(result).toEqual(YE.returnForTest);
//            });
//            it("删除播放的所有动画", function () {
//                sandbox.stub(sprite, "ye___animationManager", {
//                    getCount: sandbox.stub().returns(2),
//                    removeAll: sandbox.stub()
//                });
//
//                sprite.runOnlyOneAnim();
//
//                expect(sprite.ye___animationManager.removeAll.calledOnce).toBeTruthy();
//
//            });
//
//            it("播放指定动画", function () {
//                sandbox.stub(sprite, "ye___animationManager", {
//                    getCount: sandbox.stub().returns(2),
//                    removeAll: sandbox.stub()
//                });
//
//                sprite.runOnlyOneAnim("walk", 1, 2, 3, 4);
//
//                expect(sprite.runAnim.calledWith("walk", 1, 2, 3, 4)).toBeTruthy();
//            });
//        });
        describe("runOnlyOneAnim", function () {
            beforeEach(function () {
//                sandbox.stub(sprite, "runAnim");
                sandbox.stub(sprite, "ye___animationManager", {
                    removeAll: sandbox.stub(),
                    addChild: sandbox.stub(),
                    hasChild: sandbox.stub()
                });
                sandbox.stub(sprite, "ye___animationFrameManager", {
                    initAndReturnAnim: sandbox.stub()
                });
            });

//            it("如果播放的动画数大于1，则删除播放的所有动画", function () {
//                sandbox.stub(sprite, "ye___animationManager", {
//                    getCount: sandbox.stub().returns(2),
//                    removeAll: sandbox.stub()
//                });
//
//                sprite.runOnlyOneAnim();
//
//                expect(sprite.ye___animationManager.removeAll.calledOnce).toBeTruthy();
//            });
            it("如果要播放的动画为当前正在播放的动画，直接返回", function () {
                sprite.ye___animationManager.hasChild.returns(true);

                var result = sprite.runOnlyOneAnim("a");

//                expect(sprite.ye___animationFrameManager.initAndReturnAnim.calledWith("a", [1, 2, 3, 4])).toBeTruthy();
                expect(result).toEqual(YE.returnForTest);
            });

            describe("否则", function () {
                beforeEach(function () {
                    sprite.ye___animationManager.hasChild.returns(false);
                });

                it("删除播放的所有动画", function () {
                    sprite.runOnlyOneAnim();

                    expect(sprite.ye___animationManager.removeAll.calledOnce).toBeTruthy();

                });
                it("播放指定动画", function () {
                    var fakeAnim = {};
                    sprite.ye___animationFrameManager.initAndReturnAnim.returns(fakeAnim);

                    sprite.runOnlyOneAnim("walk");

                    expect(sprite.ye___animationFrameManager.initAndReturnAnim.calledWith("walk")).toBeTruthy();
                    expect(sprite.ye___animationManager.addChild.calledWith(fakeAnim)).toBeTruthy();
                });
            });
        });


//        describe("getCurrentAnims", function () {
//            it("获得播放的动画数组", function () {
//                var anims = [
//                    {}
//                ];
//                sandbox.stub(sprite.ye___animationManager, "getChilds").returns(anims);
//
//                expect(sprite.getCurrentAnims()).toEqual(anims);
//            });
//        });

        describe("getCurrentAnim", function () {
//            it("如果没有播放的动画，抛出异常", function () {
//                sandbox.stub(sprite, "getCurrentAnims").returns([]);
//
//                expect(sprite.getCurrentAnim).toThrow();
//            });
//            it("如果当前播放的动画不止一个，断言提示，返回最近播放的动画", function () {
//                var anim1 = {},
//                    anim2 = {a: 1};
//                sandbox.stub(sprite, "getCurrentAnims").returns([anim1, anim2]);
//
//                expect(function () {
//                    sprite.getCurrentAnim();
//                }).toAssert();
//                expect(sprite.getCurrentAnim()).toEqual(anim2);
//            });
            it("获得当前播放的动画", function () {
//                sandbox.stub(sprite, "getCurrentAnims").returns([anim]);
                var anims = [
                    {}
                ];
                sandbox.stub(sprite.ye___animationManager, "getChilds").returns(anims);

                expect(sprite.getCurrentAnim()).toEqual(anims[0]);
            });
        });

//        describe("removeAnim", function () {
//            var anim = null;
//
//            beforeEach(function () {
//                anim = {};
//                sandbox.stub(sprite.getAnimationFrameManager(), "getAnim").returns(anim);
//                sandbox.stub(sprite.ye___animationManager, "remove");
//            });
//
//            it("根据动画名，从AnimationFrameManager中获得动画", function () {
//                var animName = "a";
//
//                sprite.removeAnim(animName);
//
//                expect(sprite.getAnimationFrameManager().getAnim.calledWith(animName)).toBeTruthy();
//            });
//            it("不再播放指定动画", function () {
//                sprite.removeAnim("");
//
//                expect(sprite.ye___animationManager.remove.calledWith(anim)).toBeTruthy();
//            });
//        });

        describe("判断指定动画是否为精灵当前动画", function () {
            it("isCurrentAnim（动画名contain匹配，匹配大小写）", function () {
                var anim1 = {
                    containTag: sandbox.stub().returns(true)
                };
                sandbox.stub(sprite, "getCurrentAnim").returns(anim1);

                var result = sprite.isCurrentAnim("a");

                expect(result).toBeTruthy();
                expect(anim1.containTag.calledWith("a")).toBeTruthy();
            });
            it("isCurrentAnimExactly（动画名完全匹配）", function () {
                sandbox.stub(sprite, "ye___animationManager", {
                    hasChild: sandbox.stub().returns(true)
                });

                var result = sprite.isCurrentAnimExactly("a");

                expect(result).toBeTruthy();
                expect(sprite.ye___animationManager.hasChild.calledWith("a")).toBeTruthy();
            });
        });

        describe("setDisplayFrame", function () {
            it("设置播放的动画帧", function () {
                var frame = {};

                sprite.setDisplayFrame(frame);

                expect(sprite.getDisplayFrame()).toEqual(frame);
            });
        });

        describe("getDisplayFrame", function () {
            it("获得播放的动画帧", function () {
                var frame = {};
                sprite.setDisplayFrame(frame);

                var result = sprite.getDisplayFrame(frame);

                expect(result).toEqual(frame);
            });
        });
    });

    describe("虚方法", function () {
        describe("draw", function () {
            describe("绘制displayTarget", function () {
                var target = null;

                beforeEach(function () {
                    sandbox.stub(sprite, "ye___actionManager", {
                        getChilds: function () {
                            return [];
                        }
                    });
                    target = {
                        isInstanceOf: function () {
                        }
                    };
                    sprite.setDisplayTarget(target);
                    sandbox.stub(sprite, "ye___setContextAndReturnDrawData");
                    fakeContext = sandbox.createSpyObj("drawImage", "save", "restore");
                    sandbox.stub(sprite, "getCanvasData").returns({
                        width: 0,
                        height: 0
                    });
                });

                it("设置上下文并返回绘制数据", function () {
                    sprite.draw(fakeContext);

                    expect(sprite.ye___setContextAndReturnDrawData.calledOnce).toBeTruthy();

                });
                it("保存上下文状态", function () {
                    sprite.draw(fakeContext);

                    expect(fakeContext.save.calledOnce).toBeTruthy();
                });

                describe("绘制displayTarget", function () {
                    var fakeData = null,
                        fakeImg = null;

                    beforeEach(function () {
                        fakeData = [1, 2, 3, 4];
                        fakeImg = {};
                        sprite.ye___setContextAndReturnDrawData.returns(fakeData);
                    });

                    describe("如果displayTarget为bitmap", function () {
                        beforeEach(function () {
                            target = {
                                isInstanceOf: function () {
                                    if (arguments[0] === YE.Bitmap) {
                                        return true;
                                    }
                                    return false;
                                },
                                img: fakeImg
                            };
                            sprite.setDisplayTarget(target);
                        });

                        it("绘制bitmap的图片对象", function () {
                            sprite.draw(fakeContext);

                            expect(fakeContext.drawImage.calledWith(fakeImg, fakeData[0], fakeData[1], fakeData[2], fakeData[3])).toBeTruthy();
                        });
                    });

                    describe("如果displayTarget为frame", function () {
                        beforeEach(function () {
                            target.getImg = function () {
                                return fakeImg;
                            };
                            target.getX = function () {
                                return 1;
                            };
                            target.getY = function () {
                                return 2;
                            };
                            target.getWidth = function () {
                                return 3;
                            };
                            target.getHeight = function () {
                                return 4;
                            };
                            target.isInstanceOf = function () {
                                if (arguments[0] === YE.Frame) {
                                    return true;
                                }
                                return false;
                            };
                            sprite.setDisplayTarget(target);
                        });

                        it("绘制帧", function () {
                            sprite.draw(fakeContext);

                            expect(fakeContext.drawImage.calledWith(fakeImg, 1, 2, 3, 4,
                                fakeData[0], fakeData[1], fakeData[2], fakeData[3])).toBeTruthy();
                        });
                    });
                });

                it("恢复上下文状态", function () {
                    sprite.draw(fakeContext);

                    expect(fakeContext.restore.calledOnce).toBeTruthy();
                });
            });

            describe("绘制动画帧", function () {
                it("如果没有要播放的动画，则返回", function () {
                    sandbox.stub(sprite, "getDisplayFrame").returns(null);

                    expect(sprite.draw()).toEqual("no frame");
                });

                describe("否则，遍历要播放的动画数组", function () {
                    var fakeFrame = null,
                        fakeContext = null,
                        fakeAnim = {},
                        anims = [],
                        fakeData = null;

                    beforeEach(function () {
//                        fakeData = [1, 2, 3, 4];
//                        sandbox.stub(sprite, "ye___animationManager", {
//                            getChilds: function () {
//                                return anims;
//                            }
//                        });
                        fakeFrame = sandbox.createSpyObj("getImg", "getX", "getY", "getWidth", "getHeight");
                        fakeFrame.getCacheData = sandbox.stub();
                        fakeFrame.getCacheData.returns({});
                        sandbox.stub(sprite, "getDisplayFrame").returns(fakeFrame);
//                        fakeAnim = {
//                            getCacheData: function () {
//                                return fakeData;
//                            },
//                            getCurrentFrame: sandbox.stub().returns(fakeFrame)
//                        };
                        sandbox.stub(sprite, "getCanvasData").returns({
                            width: 0,
                            height: 0
                        });
//                        anims[0] = fakeAnim;
//                        anims.forEach = function (func) {
//                            func(fakeAnim);
//                        };
                        sandbox.stub(sprite, "ye___setContextAndReturnDrawData").returns([]);
                        fakeContext = sandbox.createSpyObj("drawImage", "save", "restore");
                    });

//                    it("获得当前要播放的动画的当前帧", function () {
//                        sprite.draw(fakeContext);
//
//                        expect(fakeAnim.getCurrentFrame.calledOnce).toBeTruthy();
//                    });
                    it("保存上下文状态", function () {
                        sprite.draw(fakeContext);

                        expect(fakeContext.save.calledOnce).toBeTruthy();
                    });

                    describe("设置上下文并返回绘制数据", function () {
                        beforeEach(function () {
                            sandbox.stub(sprite, "getPositionX").returns(10);
                            sandbox.stub(sprite, "getPositionY").returns(20);
                        });

                        it("如果动画帧有animSize数据，则绘制的精灵大小为animSize", function () {
                            var animSize = {width: 1, height: 2};
                            fakeFrame.getCacheData.returns(animSize);

                            sprite.draw(fakeContext);

                            expect(sprite.ye___setContextAndReturnDrawData.args[0][1]).toEqual([10, 20, 1, 2]);
                        });
                        it("否则，绘制的精灵大小为精灵本身的大小", function () {
                            fakeFrame.getCacheData.returns(undefined);
                            sandbox.stub(sprite, "getWidth").returns(1);
                            sandbox.stub(sprite, "getHeight").returns(2);

                            sprite.draw(fakeContext);

                            expect(sprite.ye___setContextAndReturnDrawData.args[0][1]).toEqual([10, 20, 1, 2]);
                        });
                    });

                    it("绘制当前帧", function () {
                        var fakeImg = {};
                        fakeFrame.getImg = function () {
                            return fakeImg;
                        };
                        fakeFrame.getX = function () {
                            return 1;
                        };
                        fakeFrame.getY = function () {
                            return 2;
                        };
                        fakeFrame.getWidth = function () {
                            return 3;
                        };
                        fakeFrame.getHeight = function () {
                            return 4;
                        };
                        var fakeData = [10, 20, 30, 40];
                        sprite.ye___setContextAndReturnDrawData.returns(fakeData);


                        sprite.draw(fakeContext);

                        expect(fakeContext.drawImage.calledWith(fakeImg, 1, 2, 3, 4,
                            fakeData[0], fakeData[1], fakeData[2], fakeData[3])).toBeTruthy();
                    });
                    it("恢复上下文", function () {
                        sprite.draw(fakeContext);

                        expect(fakeContext.restore.calledOnce).toBeTruthy();

                    });
                });
            });
        });

        describe("ye___setContextAndReturnDrawData", function () {
            var fakeFrame = null,
                fakeContext = null,
                fakeData = null;

            function prepare() {
                sandbox.stub(sprite, "ye___offsetX", 10);
                sandbox.stub(sprite, "ye___offsetY",10);
            }

            function buildFakeCanvasData(canvasWidth, canvasHeight) {
                sprite.getCanvasData = sandbox.stub().returns({
                    width: canvasWidth,
                    height: canvasHeight
                });
            }

            beforeEach(function () {
                fakeData = [1, 2, 3, 4];
                fakeFrame = {
                    isFlipX: function () {
                        return false;
                    },
                    isFlipY: function () {
                        return false;
                    },
                    isInstanceOf: function () {
                        return true;
                    },
                    getBitmap: function () {
                        return fakeBitmap;
                    },
                    getPixelOffsetX: function () {
                    },
                    getPixelOffsetY: function () {
                    }
                };
                sprite.setClipRange(null);
                buildFakeCanvasData(0, 0);
            });
            afterEach(function () {
            });

            it("如果数据中的x、y、width和height为undefined，则x、y为精灵的坐标，width和height为精灵的width和height", function () {
                fakeData[0] = undefined;
                fakeData[1] = undefined;
                fakeData[2] = undefined;
                fakeData[3] = undefined;
                sandbox.stub(sprite, "getPositionX");
                sandbox.stub(sprite, "getPositionY");
                sandbox.stub(sprite, "getWidth").returns(3);
                sandbox.stub(sprite, "getHeight").returns(4);

                var data = sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                expect(sprite.getPositionX.calledOnce).toBeTruthy();
                expect(sprite.getPositionY.calledOnce).toBeTruthy();
                expect(data[2]).toEqual(3);
                expect(data[3]).toEqual(4);
            });

            describe("如果displayTarget为Frame", function () {
                it("获得帧的pixelOffset", function () {
                    sandbox.stub(fakeFrame, "getPixelOffsetX");
                    sandbox.stub(fakeFrame, "getPixelOffsetY");

                    sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                    expect(fakeFrame.getPixelOffsetX.calledOnce).toBeTruthy();
                    expect(fakeFrame.getPixelOffsetY.calledOnce).toBeTruthy();
                });
            });

            describe("如果displayTarget为Bitmap", function () {
                it("获得它的pixelOffset", function () {
                });
            });

            describe("设置上下文", function () {
                beforeEach(function () {
                    prepare();
                    fakeContext = sandbox.createSpyObj("translate", "scale");
                });

                describe("如果要剪辑区域", function () {
                    var clipRange = null;

                    beforeEach(function () {
                        fakeContext = sandbox.createSpyObj("beginPath", "moveTo", "lineTo", "closePath", "clip");
                        clipRange = [
                            {x: 1, y: 1},
                            {x: 2, y: 1},
                            {x: 2, y: 2}
                        ];
                        sprite.setClipRange(clipRange);
                    });

                    it("剪辑该区域", function () {
                        sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext, 0, 0);

                        expect(fakeContext.beginPath.calledOnce).toBeTruthy();
                        expect(fakeContext.moveTo.calledWith(1, 1)).toBeTruthy();
                        expect(fakeContext.lineTo.args[0]).toEqual([2, 1]);
                        expect(fakeContext.lineTo.args[1]).toEqual([2, 2]);
                        expect(fakeContext.lineTo.args[2]).toEqual([1, 1]);
                        expect(fakeContext.closePath.calledOnce).toBeTruthy();
                        expect(fakeContext.clip.calledOnce).toBeTruthy();
                    });
                    it("置剪辑区域为空", function () {
                        sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext, 0, 0);

                        expect(sprite.ye___clipRange).toBeNull();
                    });
                });


                describe("如果要水平翻转", function () {
                    beforeEach(function () {
                        sandbox.stub(fakeFrame, "isFlipX").returns(true);
                        sandbox.stub(fakeFrame, "getPixelOffsetX").returns(1);
                        fakeData[0] = 11;
                        fakeData[2] = 5;
                        buildFakeCanvasData(10, 0);
                    });

                    it("则通过翻转画布来实现", function () {
                        sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                        expect(fakeContext.translate.calledWith(10, 0)).toBeTruthy();
                        expect(fakeContext.scale.calledWith(-1, 1)).toBeTruthy();
                    });
                    it("设置x坐标", function () {
                        var data = sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                        expect(data[0]).toEqual(5);
                    });
                });

                describe("如果要垂直翻转", function () {
                    beforeEach(function () {
                        sandbox.stub(fakeFrame, "isFlipY").returns(true);
                        sandbox.stub(fakeFrame, "getPixelOffsetY").returns(1);
                        fakeData[1] = 12;
                        fakeData[3] = 5;
                        buildFakeCanvasData(0, 10);
                    });

                    it("则通过翻转画布来实现", function () {
                        sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                        expect(fakeContext.translate.calledWith(0, 10)).toBeTruthy();
                        expect(fakeContext.scale.calledWith(1, -1));
                    });
                    it("设置y坐标", function () {
                        var data = sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                        expect(data[1]).toEqual(4);
                    });
                });

                describe("如果既要水平翻转，又要垂直翻转", function () {
                    beforeEach(function () {
                        sandbox.stub(fakeFrame, "isFlipX").returns(true);
                        sandbox.stub(fakeFrame, "isFlipY").returns(true);
                        sandbox.stub(fakeFrame, "getPixelOffsetX").returns(1);
                        fakeData[0] = 11;
                        fakeData[2] = 5;
                        sandbox.stub(fakeFrame, "getPixelOffsetY").returns(1);
                        fakeData[1] = 12;
                        fakeData[3] = 5;
                        buildFakeCanvasData(10, 10);
                    });

                    it("则通过翻转画布来实现", function () {
                        sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                        expect(fakeContext.translate.calledTwice).toBeTruthy();
                        expect(fakeContext.scale.calledTwice).toBeTruthy();
                    });
                    it("设置坐标", function () {
                        var data = sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                        expect(data[0]).toEqual(5);
                        expect(data[1]).toEqual(4);
                    });
                });
            });

            it("否则，设置默认坐标", function () {
                prepare();
                sandbox.stub(fakeFrame, "getPixelOffsetX").returns(1);
                sandbox.stub(fakeFrame, "getPixelOffsetY").returns(1);

                var data = sprite.ye___setContextAndReturnDrawData(fakeFrame, fakeData, fakeContext);

                expect(data[0]).toEqual(-10);
                expect(data[1]).toEqual(-9);
            });
        });

        describe("clear", function () {
            it("从画布中清除精灵", function () {
                var fakeContext = sandbox.createSpyObj("clearRect");
                sprite.setPosition(1, 2);
                sandbox.stub(sprite, "getWidth").returns(3);
                sandbox.stub(sprite, "getHeight").returns(4);

                sprite.clear(fakeContext);

                expect(fakeContext.clearRect.calledWith(1, 2, 3, 4)).toBeTruthy();
            });
        });
    });

    describe("钩子", function () {
        it("onbeforeDraw存在", function () {
            expect(sprite.onbeforeDraw).toBeExist();
        });
        it("onafterDraw存在", function () {
            expect(sprite.onafterDraw).toBeExist();
        });
    });

});