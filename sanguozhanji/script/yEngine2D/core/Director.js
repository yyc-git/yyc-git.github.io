﻿/**YEngine2D 导演类
 * 作者：YYC
 * 日期：2013-12-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    var GameStatus = {
        NORMAL: 0,
        PAUSE: 1,
        END: 2
    };

    YE.Director = YYC.Class(YE.Entity, {
        Init: function () {
            this.base();
        },
        Private: {
            ye_STARTING_FPS: 60,

            ye_startTime: 0,
            ye_lastTime: 0,

            ye_fps: 0,
            ye_loopInterval: 0,
            ye_lastLoopInterval: 0,

            ye_currentScene: null,

            ye_loopId: null,
            ye_isIntervalLoop: false,

            //内部游戏状态
            ye_gameStatus: null,
            //计时器序号
            ye_timerIndex: 0,


            ye_getTimeNow: function () {
                return +new Date();
            },
            ye_loopBody: function (time) {
                this.ye_tick(time);

                this.ye_currentScene.startLoop();
                this.ye_currentScene.run();
                this.ye_currentScene.endLoop();
            },
            ye_tick: function (time) {
                this.ye_updateFps(time);
                this.gameTime = this.ye_getTimeNow() - this.ye_startTime;
                this.ye_lastTime = time;
            },
            ye_updateFps: function (time) {
                if (this.ye_isIntervalLoop) {
                    this.ye_fps = 1 / this.ye_loopInterval;
                    return;
                }

                if (this.ye_lastTime === 0) {
                    this.ye_fps = this.ye_STARTING_FPS;
                }
                else {
                    this.ye_fps = 1000 / (time - this.ye_lastTime);
                }
            },
            ye_isToUseIntervalLoop: function () {
                return this.ye_loopInterval !== 1 / this.ye_STARTING_FPS;
            },
            ye_startLoop: function () {
                var self = this,
                    mainLoop = null;

                if (this.ye_isToUseIntervalLoop()) {
                    this.ye_loopId = window.setInterval(function mainLoop() {
                        self.ye_loopBody(self.ye_getTimeNow());
                    }, this.ye_loopInterval * 1000);

                    this.ye_isIntervalLoop = true;
                }
                else {
                    mainLoop = function (time) {
                        self.ye_loopBody(time);

                        if (self.ye_gameStatus === GameStatus.END) {
                            return;
                        }

                        self.ye_loopId = window.requestNextAnimationFrame(mainLoop);
                    };
                    this.ye_loopId = window.requestNextAnimationFrame(mainLoop);
                    this.ye_isIntervalLoop = false;
                }
            },
            ye_endLoop: function () {
                window.clearInterval(this.ye_loopId);
//                window.cancelNextRequestAnimationFrame(this.ye_loopId);
                this.ye_gameStatus = GameStatus.END;
            }
        },
        Public: {
            //游戏运行时间
            gameTime: 0,

            initWhenCreate: function () {
                this.ye_loopInterval = 1 / this.ye_STARTING_FPS;
            },
            runWithScene: function (scene) {
                scene.init(this);
                this.setCurrentScene(scene);

                this.ye_startTime = this.ye_getTimeNow();
                this.ye_gameStatus = GameStatus.NORMAL;

                this.ye_startLoop();
            },
            setCurrentScene: function (scene) {
                if (this.ye_currentScene) {
                    this.ye_currentScene.onexit();
                }

                this.ye_currentScene = scene;
                scene.onenter();
            },
            getCurrentScene: function () {
                return this.ye_currentScene;
            },
            getFps: function () {
                return this.ye_fps;
            },
            getPixPerFrame: function (speed) {
                if (YE.main.getConfig().isDebug) {
                    return speed / this.ye_STARTING_FPS;
                }

                return speed / this.ye_fps;
            },
            end: function () {
                this.ye_endLoop();
//                this.ye_gameStatus = GameStatus.END;
                YE.Tool.asyn.clearAllTimer(this.ye_timerIndex);
            },
            pause: function () {
                if (this.ye_gameStatus === GameStatus.PAUSE) {
                    return YE.returnForTest;
                }

                ////                降低cpu消耗
//                this.setLoopIntervalAndRestart(1);

                this.ye_endLoop();

                this.ye_gameStatus = GameStatus.PAUSE;
                this.ye_lastLoopInterval = this.ye_loopInterval;
            },
            resume: function () {
                if (this.ye_gameStatus !== GameStatus.PAUSE) {
                    return YE.returnForTest;
                }

                this.ye_gameStatus = GameStatus.NORMAL;
                this.ye_loopInterval = this.ye_lastLoopInterval;
                this.ye_endLoop();
                this.ye_startLoop();
            },
            /**
             * 设置主循环间隔时间
             * @param interval 间隔时间（单位为秒）
             */
            setLoopIntervalAndRestart: function (interval) {
                this.ye_loopInterval = interval;
                this.ye_endLoop();
                this.ye_startLoop();
            },
            resumeRequestAnimFrameLoop: function () {
                this.ye_loopInterval = 1 / this.ye_STARTING_FPS;
                this.ye_endLoop();
                this.ye_startLoop();
            },
            /**
             * 设置定时器起始序号，用于stop中清除所有定时器
             * @param index
             */
            setTimerIndex: function (index) {
                this.ye_timerIndex = index;
            },

            //*供测试使用
            forTest_getGameStatus: function () {
                return GameStatus;
            },
            forTest_setGameEnd: function () {
                this.ye_gameStatus = GameStatus.END;
            }
        },
        Static: {
            getInstance: function () {
                if (_instance === null) {
                    _instance = new this();
                    _instance.initWhenCreate();
                }
                return _instance;
            }
        }
    });
}());