describe("game.js", function () {
    var game = null;

    beforeEach(function () {
        game = new Game();
    });

    describe("���캯��", function () {
        it("����ȫ�ֹ۲���ʵ��", function () {
            window.subject = null;

            game = new Game();

            expect(window.subject).toBeExist();
        });
    });

    describe("init", function () {
        describe("�����������", function () {
            it("װ���", function () {
                game.init();

                expect(game.layerManager.getLayer("mapLayer")).toBeInstanceOf(MapLayer);
                expect(game.layerManager.getLayer("playerLayer")).toBeInstanceOf(PlayerLayer);
                expect(game.layerManager.getLayer("enemyLayer")).toBeInstanceOf(EnemyLayer);
                expect(game.layerManager.getLayer("bombLayer")).toBeInstanceOf(BombLayer);
                expect(game.layerManager.getLayer("fireLayer")).toBeInstanceOf(FireLayer);
            });
            it("layerFactory.createPlayer��layerFactory.createEnemy�������sleep", function () {
                game.sleep = 10;
                spyOn(window.layerFactory, "createPlayer").andCallThrough();
                spyOn(window.layerFactory, "createEnemy").andCallThrough();

                game.init();

                expect(layerFactory.createPlayer).toHaveBeenCalledWith(game.sleep);
                expect(layerFactory.createEnemy).toHaveBeenCalledWith(game.sleep);
            });
        });


        it("�������Ԫ�أ����飩�� �����뵽����", function () {
            game.init();

            expect(game.layerManager.getLayer("mapLayer").getChilds().length).toEqual(400);
            expect(game.layerManager.getLayer("playerLayer").getChilds().length).toEqual(1);
            expect(game.layerManager.getLayer("playerLayer").getChilds()[0]).toBeInstanceOf(PlayerSprite);
            expect(game.layerManager.getLayer("enemyLayer").getChilds().length).toEqual(2);
            expect(game.layerManager.getLayer("enemyLayer").getChilds()[0]).toBeInstanceOf(EnemySprite);
        });

        describe("��ʼ����", function () {
            beforeEach(function () {
                game._createLayerManager();
            });

            it("����layermanager.initLayer", function () {
                spyOn(game.layerManager, "initLayer");

                game._initLayer();

                expect(game.layerManager.initLayer).toHaveBeenCalled();
            });
        });

        describe("���¼�", function () {
            it("�󶨼����¼�", function () {
                spyOn(keyEventManager, "addKeyDown");
                spyOn(keyEventManager, "addKeyUp");

                game.init();

                expect(keyEventManager.addKeyDown).toHaveBeenCalled();
                expect(keyEventManager.addKeyUp).toHaveBeenCalled();
            });
        });

        describe("����", function () {
            it("����mapLayer��changeSpriteImg", function () {
                spyOn(window.subject, "subscribe");

                game.init();

                expect(window.subject.subscribe).toHaveBeenCalledWith(game.layerManager.getLayer("mapLayer"), game.layerManager.getLayer("mapLayer").changeSpriteImg);
            });
        });

    });

    describe("start", function () {
        it("ÿMath.floor(1000 / bomberConfig.FPS)���ѭ������run", function () {
            spyOn(game, "run");
            jasmine.Clock.useMock();

            game.init();
            game.start();

            jasmine.Clock.tick(Math.floor(1000 / bomberConfig.FPS) * 2);

            expect(game.run.calls.length).toEqual(2);
        });
        it("���mainLoop", function () {
            spyOn(window, "setInterval").andCallFake(function () {
                return function () {
                };
            });
            game.mainLoop = null;

            game.start();

            expect(game.mainLoop).toBeExist();
        });
    });

    describe("run", function () {
        var backUp = null;

        beforeEach(function () {
            backUp = testTool.extendDeep(window.gameState);
            window.gameState = window.bomberConfig.game.state.NORMAL;
            game.init();
        });
        afterEach(function () {
            window.gameState = backUp;
        });

        it("���״̬ΪOVER���������Ϸ������", function () {
            window.gameState = window.bomberConfig.game.state.OVER;
            spyOn(game, "gameOver");
            spyOn(game.layerManager, "run");

            game.run();

            expect(game.gameOver).toHaveBeenCalled();
            expect(game.layerManager.run).not.toHaveBeenCalled();
        });
        it("����layerManager��run����", function () {
            spyOn(game.layerManager, "run");

            game.run();

            expect(game.layerManager.run).toHaveBeenCalled();
        });
        it("����layerManager��change����", function () {
            spyOn(game.layerManager, "change");

            game.run();

            expect(game.layerManager.change).toHaveBeenCalled();
        });
    });

    describe("������Ϸ", function () {
        function judge(func) {
            spyOn(YYC.Tool.asyn, "clearAllTimer");
            spyOn(window, "alert");

            func.call(game, null);

            expect(window.alert).toHaveBeenCalled();
            expect(YYC.Tool.asyn.clearAllTimer).toHaveBeenCalledWith(game.mainLoop);
        };

        describe("gameOver", function () {
            it("ֹͣ��ѭ����������ж�ʱ����������alert", function () {
                judge(game.gameOver);
            });
        });

        describe("gameWin", function () {
            it("ֹͣ��ѭ����������ж�ʱ����������alert", function () {
                judge(game.gameWin);
            });
        });
    });
});
