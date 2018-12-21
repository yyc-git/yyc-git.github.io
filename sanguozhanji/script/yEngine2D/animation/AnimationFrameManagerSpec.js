/**YEngine2D
 * 作者：YYC
 * 日期：2014-04-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("AnimationFrameManager", function () {
    var manager = null;
    var sandbox = null;

    function getInstance() {
        return YE.AnimationFrameManager.create();
    }

    beforeEach(function () {
        manager = getInstance();
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("构造函数", function () {
        it("创建AnimationFrame实例", function () {
            sandbox.stub(YE.AnimationFrame, "create");

            manager.Init();

            expect(YE.AnimationFrame.create.calledOnce).toBeTruthy();
        });
    });

    describe("getAnim", function () {
        it("获得指定动画", function () {
            var fakeAnim = {};
            sandbox.stub(manager, "ye_animationFrame", {
                getAnim: sandbox.stub().returns(fakeAnim)
            });

            var anim = manager.getAnim("walk");

            expect(manager.ye_animationFrame.getAnim.calledWith("walk")).toBeTruthy();
            expect(anim).toEqual(fakeAnim);
        });
    });

    describe("getAnims", function () {
        it("获得hash容器ye_animationFrame的所有元素（object对象）", function () {
            var anims = {
                "anim1": {}
            };
            sandbox.stub(manager, "ye_animationFrame", {
                getAnims: sandbox.stub().returns(anims)
            });

            expect(manager.getAnims()).toEqual(anims);
        });
    });


    describe("addAnim", function () {
        var fakeAnim = null;

        beforeEach(function () {
            sandbox.stub(manager, "ye_animationFrame", {
                addAnim: sandbox.stub()
            });

            fakeAnim = {
                setTag: sandbox.stub()
            };
        });
//                it("如果加入的是action动画，则直接将动画数据保存到animationFrame中", function () {
        it("设置动画的tag为动画名", function () {
            manager.addAnim("walk", fakeAnim);

            expect(fakeAnim.setTag.calledWith("walk")).toBeTruthy();
        });
        it("将动画数据保存到animationFrame中", function () {
            manager.addAnim("walk", fakeAnim);

            expect(manager.ye_animationFrame.addAnim.calledWith("walk", fakeAnim)).toBeTruthy();
        });
//                it("否则，如果加入的是动画的帧数据，则生成action动画，并保存到animationFrame中", function () {
//                    var frames = [
//                        {},
//                        {}
//                    ];
//                    var fakeAnim = {};
//                    manager.ye_animationFrame = jasmine.createSpyObj("", ["addAnim"]);
//                    spyOn(manager, "ye___initOneAnim").andReturn(fakeAnim);
//
//                    manager.addAnim("walk", frames);
//
//                    expect(manager.ye___initOneAnim).toHaveBeenCalledWith(frames);
//                    expect(manager.ye_animationFrame.addAnim).toHaveBeenCalledWith("walk", fakeAnim);
//                });
    });
//
    describe("管理动画", function () {
        var fakeAnim = null;

        function initAnim(spyMethods) {
            fakeAnim = sandbox.createSpyObj.apply(sandbox, spyMethods);
            sandbox.stub(manager, "getAnim").returns(fakeAnim);

        }

        describe("initAndReturnAnim", function () {
            var animName = "walk";


            beforeEach(function () {
                initAnim(["start", "setCacheData", "getAnimSize"]);
                fakeAnim.getAnimSize = sandbox.stub().returns({width: 0, height: 0});
            });

            it("如果第一个参数为动画名，则获得内部对应的动画", function () {
                manager.initAndReturnAnim(animName, []);

                expect(manager.getAnim.calledWith(animName)).toBeTruthy();
            });
            it("如果第一个参数为动画（Action类型），则直接对该动画进行初始化并返回", function () {
//                var fakeAnim = sandbox.createSpyObj("start", "setCacheData", "getCacheData");

                var anim = manager.initAndReturnAnim(fakeAnim, []);

                expect(anim).toEqual(fakeAnim);
            });

//            describe("保存动画绘制数据", function () {
//                it("保存动画绘制数据", function () {
//                    var spriteData = [1, 2, 3, 4];
//
//                    manager.initAndReturnAnim(animName, spriteData);
//
//                    expect(fakeAnim.setCacheData.calledWith("animData", spriteData)).toBeTruthy();
//                });
//                it("如果动画绘制数据中没有指定显示大小，则从动画的缓存数据中获得显示大小", function () {
//                    var spriteData = [1, 2, undefined, undefined];
//                    fakeAnim.getAnimSize = sandbox.stub().returns({width: 100, height:200});
//
//                    manager.initAndReturnAnim(animName, spriteData);
//
//                    expect(fakeAnim.setCacheData.calledWith("animData", [1, 2, 100, 200])).toBeTruthy();
//                });
//            });

            it("启动动画", function () {
                manager.initAndReturnAnim(animName, []);

                expect(fakeAnim.start.calledOnce).toBeTruthy();
            });
        });

        describe("resetAnim", function () {
            it("重置指定动画", function () {
                initAnim(["reset"]);

                manager.resetAnim("walk");

                expect(fakeAnim.reset.calledOnce).toBeTruthy();
            });
        });

        describe("stopAnim", function () {
            it("停止当前动画播放", function () {
                initAnim(["stop"]);

                manager.stopAnim();

                expect(fakeAnim.stop.calledOnce).toBeTruthy();
            });
        });

        describe("startAnim", function () {
            it("启动当前动画", function () {
                initAnim(["start"]);

                manager.startAnim();

                expect(fakeAnim.start.calledOnce).toBeTruthy();
            });
        });
    });
});