/**YEngine2D
 * 作者：YYC
 * 日期：2013-12-24
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Director", function () {
    var director = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        director = new YE.Director();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("该类为单例类", function () {
        testTool.judgeSingleInstance(YE.Director);
    });

    /*
     该测试需要调用Director-》forTest_clearInstance方法：
     forTest_clearInstance: function () {
     _instance = null;
     }

     但是我想删除该方法，因为应该在产品代码中尽可能地减少测试方法。
     因此删除后，该测试就不能进行了！





     it("第一次创建实例时，进行初始化", function () {
     var stub = sandbox.stub(),
     fakeDirector = function () {
     this.initWhenCreate = stub;
     };
     fakeDirector.getInstance = YE.Director.getInstance;
     sandbox.stub(YE, "Director", fakeDirector);

     YE.Director.forTest_clearInstance();
     YE.Director.getInstance();

     expect(stub.calledOnce).toBeTruthy();
     });
     */


    describe("setCurrentScene", function () {
        it("如果当前场景存在，则调用当前场景的onexit", function () {
            var fakeScene1 = sandbox.createSpyObj("onexit");
            director.ye_currentScene = fakeScene1;
            var fakeScene2 = sandbox.createSpyObj("onenter");

            director.setCurrentScene(fakeScene2);

            expect(fakeScene1.onexit.calledOnce).toBeTruthy();

        });
        it("设置场景为当前使用场景", function () {
            var fakeScene = sandbox.createSpyObj("onenter");

            director.setCurrentScene(fakeScene);

            expect(director.getCurrentScene()).toEqual(fakeScene);
        });
        it("调用场景onenter", function () {
            var fakeScene = sandbox.createSpyObj("onenter");

            director.setCurrentScene(fakeScene);

            expect(fakeScene.onenter.calledOnce).toBeTruthy();
        });
    });

    describe("getCurrentScene", function () {
        it("获得当前使用场景", function () {
        });
    });

    describe("runWithScene", function () {
        var fakeScene = null;

        beforeEach(function () {
            fakeScene = sandbox.createSpyObj("init", "onenter");
            sandbox.stub(director, "ye_startLoop");
        });

        it("设置当前场景，获得场景类实例", function () {
            sandbox.stub(director, "setCurrentScene");

            director.runWithScene(fakeScene);

            expect(director.setCurrentScene.calledOnce).toBeTruthy();
        });
        it("初始化场景", function () {
            director.runWithScene(fakeScene);

            expect(fakeScene.init.calledWith(director)).toBeTruthy();
        });
        it("获得开始时间（毫秒）", function () {
        });
        it("初始化游戏状态", function () {
            director.forTest_setGameEnd();

            director.runWithScene(fakeScene);

            expect(director.ye_gameStatus).toEqual(director.forTest_getGameStatus().NORMAL);
        });
        it("启动主循环", function () {
            director.runWithScene(fakeScene);

            expect(director.ye_startLoop.calledOnce).toBeTruthy();
        });
    });

    describe("setLoopIntervalAndRestart", function () {
        it("设置主循环的间隔时间", function () {
            var interval = 100;

            director.setLoopIntervalAndRestart(interval);

            expect(director.ye_loopInterval).toEqual(interval);
        });
        it("更新主循环", function () {
            sandbox.stub(director, "ye_endLoop");
            sandbox.stub(director, "ye_startLoop");

            director.setLoopIntervalAndRestart();

            expect(director.ye_endLoop.calledOnce).toBeTruthy();
            expect(director.ye_startLoop.calledAfter(director.ye_endLoop)).toBeTruthy();
        });
    });

    describe("resumeRequestAnimFrameLoop", function () {
        it("恢复使用requestNextAnimationFrame实现主循环", function () {
            sandbox.stub(director, "ye_endLoop");
            sandbox.stub(director, "ye_startLoop");

            director.resumeRequestAnimFrameLoop();

            expect(director.ye_loopInterval).toEqual(1 / director.ye_STARTING_FPS);
            expect(director.ye_endLoop.calledOnce).toBeTruthy();
            expect(director.ye_startLoop.calledAfter(director.ye_endLoop)).toBeTruthy();
        });
    });


    describe("ye_startLoop", function () {
        beforeEach(function () {
            sandbox.stub(director, "ye_loopBody");
        });

        describe("如果使用setInterval实现主循环", function () {
            beforeEach(function () {
                sandbox.stub(director, "ye_isToUseIntervalLoop").returns(true);
                sandbox.stub(window, "setInterval");
            });

            it("调用setInterval循环", function () {
                director.ye_startLoop();

                expect(window.setInterval.calledOnce).toBeTruthy();
            });
            it("循环间隔时间为ye_loopInterval * 1000", function () {
                director.ye_startLoop();

                expect(window.setInterval.args[0][1]).toEqual(director.ye_loopInterval * 1000);
            });
            it("执行循环主体", function () {
                var fakeDateNow = 10;
                sandbox.stub(director, "ye_getTimeNow").returns(fakeDateNow);

                director.ye_startLoop();
                window.setInterval.callArgOn(0, director);

                expect(director.ye_loopBody.calledWith(fakeDateNow)).toBeTruthy();
            });
            it("设置循环标志", function () {
                director.ye_isIntervalLoop = false;

                director.ye_startLoop();

                expect(director.ye_isIntervalLoop).toBeTruthy();
            });
        });

        describe("如果使用requestNextAnimationFrame实现主循环", function () {
            beforeEach(function () {
                sandbox.stub(director, "ye_isToUseIntervalLoop").returns(false);
                sandbox.stub(window, "requestNextAnimationFrame");
            });

            it("调用requestNextAnimationFrame循环", function () {
                director.ye_startLoop();

                expect(window.requestNextAnimationFrame.calledOnce).toBeTruthy();
            });
            it("执行循环主体", function () {
                var time = 1;

                director.ye_startLoop();
                window.requestNextAnimationFrame.callArgOnWith(0, director, time);

                expect(director.ye_loopBody.calledWith(time)).toBeTruthy();
            });
            it("设置循环标志", function () {
                director.ye_isIntervalLoop = true;

                director.ye_startLoop();

                expect(director.ye_isIntervalLoop).toBeFalsy();
            });
        });
    });

    describe("测试循环内容ye_loopBody", function () {
        var fakeScene = null;

        beforeEach(function () {
            fakeScene = sandbox.createSpyObj("run", "startLoop", "endLoop");
            director.ye_currentScene = fakeScene;
            sandbox.stub()
        });

        describe("更新fps和gameTime", function () {
            it("如果是第一次执行，则令fps为初始值60", function () {
                director.ye_loopBody();

                expect(director.getFps()).toEqual(60);
            });
            it("否则，计算实际的fps", function () {
                director.ye_lastTime = 100;

                director.ye_loopBody(1100);

                expect(director.getFps()).toEqual(1);
            });
        });

        it("调用场景的startLoop", function () {
            director.ye_loopBody();

            expect(fakeScene.startLoop.calledOnce).toBeTruthy();
        });
        it("启动当前场景", function () {
            director.ye_loopBody();

            expect(fakeScene.run.calledOnce).toBeTruthy();
        });
        it("调用场景的endLoop", function () {
            director.ye_loopBody();

            expect(fakeScene.endLoop.calledOnce).toBeTruthy();
        });
    });

    describe("getFps", function () {

    });

    describe("getPixPerFrame", function () {
        it("如果处于调试状态，则fps为固定的ye_STARTING_FPS", function () {
            var fps = 60;
            var sandbox = sinon.sandbox.create();
            sandbox.stub(YE.main, "getConfig").returns({
                isDebug: true
            });
            director.ye_STARTING_FPS = fps;

            expect(director.getPixPerFrame(1)).toEqual(1 / director.ye_STARTING_FPS);

            sandbox.restore();
        });
        it("否则，计算精灵每帧移动的距离（单位为像素pix）。距离=精灵每秒移动像素值（即速度）*每一帧持续的秒数（即1/fps）", function () {
            var sandbox = sinon.sandbox.create();
            sandbox.stub(YE.main, "getConfig").returns({
                isDebug: false
            });
            director.ye_fps = 10;

            expect(director.getPixPerFrame(2)).toEqual(0.2);

            sandbox.restore();
        });
    });

    describe("end", function () {
        it("停止主循环", function () {
            sandbox.stub(window, "clearInterval");
            sandbox.stub(director, "ye_gameStatus", director.forTest_getGameStatus().NORMAL);
            sandbox.stub(director, "ye_loopId", 1);

            director.end();

            expect(window.clearInterval.calledWith(director.ye_loopId)).toBeTruthy();
            expect(director.ye_gameStatus).toEqual(director.forTest_getGameStatus().END);
        });
        it("停止所有计时器", function () {
            var index = 10;
            sandbox.stub(YE.Tool.asyn, "clearAllTimer");
            director.setTimerIndex(index);

            director.end();

            expect(YE.Tool.asyn.clearAllTimer.calledWith(index)).toBeTruthy();
        });
    });

    describe("pause", function () {
        it("如果已经暂停了，则返回", function () {
            director.ye_gameStatus = director.forTest_getGameStatus().PAUSE;

            var result = director.pause();

            expect(result).toEqual(YE.returnForTest);
        });

        describe("否则", function () {
            beforeEach(function () {
                director.ye_gameStatus = director.forTest_getGameStatus().NORMAL;
            });
            afterEach(function () {
            });

            it("停止主循环", function () {
                sandbox.stub(director, "ye_endLoop");

                director.pause();

                expect(director.ye_endLoop.calledOnce).toBeTruthy();
            });
            it("设置游戏状态为PAUSE", function () {
                director.pause();

                expect(director.ye_gameStatus).toEqual(director.forTest_getGameStatus().PAUSE);
            });
            it("保存间隔时间", function () {
                director.ye_loopInterval = 100;

                director.pause();

                expect(director.ye_lastLoopInterval).toEqual(director.ye_loopInterval);
            });
        });
    });

    describe("resume", function () {
        beforeEach(function () {
            sandbox.stub(director, "ye_endLoop");
            sandbox.stub(director, "ye_startLoop");
        });

        it("如果没有暂停了，则返回", function () {
            director.ye_gameStatus = director.forTest_getGameStatus().NORMAL;

            var result = director.resume();

            expect(result).toEqual(YE.returnForTest);
        });

        describe("否则", function () {
            beforeEach(function () {
                director.ye_gameStatus = director.forTest_getGameStatus().PAUSE;
            });

            it("设置游戏状态为NORMAL", function () {
                director.resume();

                expect(director.ye_gameStatus).toEqual(director.forTest_getGameStatus().NORMAL);
            });
            it("恢复间隔时间", function () {
                director.ye_lastLoopInterval = 100;

                director.resume();

                expect(director.ye_loopInterval).toEqual(director.ye_lastLoopInterval);
            });
            it("更新主循环", function () {
                director.resume();

                expect(director.ye_endLoop.calledOnce).toBeTruthy();
                expect(director.ye_startLoop.calledAfter(director.ye_endLoop)).toBeTruthy();
            });
        });
    });

    describe("initWhenCreate", function () {
        it("初始化主循环间隔时间", function () {
            director.initWhenCreate();

            expect(director.ye_loopInterval).toEqual(1 / director.ye_STARTING_FPS);
        });
    });

});