describe("����PlayerSprite.moveIndex", function () {
    var sprite = null,
        playerLayer = null,
        bomberConfig = testTool.extendDeep(window.bomberConfig),
        terrainData = testTool.extendDeep(window.terrainData);

    function clearKeyState() {
        window.keyState = {};
        window.keyState[keyCodeMap.Left] = false;
        window.keyState[keyCodeMap.Right] = false;
        window.keyState[keyCodeMap.Up] = false;
        window.keyState[keyCodeMap.Down] = false;
        window.keyState[keyCodeMap.Space] = false;
    };
    function fakeKeyDown() {
        var i = 0,
            len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            window.keyState[arguments[i]] = true;
        }
    };
    function fakeKeyUp(keyCode) {
        var i = 0,
            len = 0;

        for (i = 0, len = arguments.length; i < len; i++) {
            window.keyState[arguments[i]] = false;
        }
    };
    function fakeTerrainData() {
        var pass = window.bomberConfig.map.terrain.pass,
            stop = window.bomberConfig.map.terrain.stop;

        window.terrainData = [
            [pass, pass, pass, pass],
            [pass, pass, pass, pass],
            [pass, pass, pass, pass],
            [pass, pass, pass, pass]
        ];
    };
    //�ٵĵ�ͼ����ߴ�
    function fakeWidthAndHeight(width, height) {
        window.bomberConfig.WIDTH = width;
        window.bomberConfig.HEIGHT = height;
    };
    function restore() {
        window.terrainData = terrainData;
        window.bomberConfig.WIDTH = bomberConfig.WIDTH;
        window.bomberConfig.HEIGHT = bomberConfig.HEIGHT;
    };

    beforeEach(function () {
        //û�е����ϰ����ò��Բ����ǵ�����ײ
        fakeTerrainData();

        sprite = spriteFactory.createPlayer();

        //�ƶ�10��Ϊ1���ƶ�����
        fakeWidthAndHeight(10, 10);
        sprite.speedX = sprite.speedY = 1;

        //������������ʼλ��Ϊ��һ�С��ڶ���
        sprite.x = 20, sprite.y = 0;

        sprite.init();
        sprite.completeOneMove = false;

        playerLayer = new PlayerLayer(100);
        playerLayer.setCanvas();
        var fakeLayerManager = {
            getLayer: function () {
                return {};
            }
        };
        playerLayer.init(fakeLayerManager);
        playerLayer.appendChild(sprite);
        playerLayer.setStateChange();
    });
    afterEach(function () {
        clearKeyState();
        restore();
    });

    describe("����PlayerSprite.moveIndex��x����", function () {

        describe("����ѯ2�Σ�Ȼ��������������ߣ�����A����", function () {
            //��ѯnum��
            function run(num) {
                for (var i = 0; i < num; i++) {
                    playerLayer.setStateChange();
                    playerLayer.run();
                }
            };
            //�ƶ�num��
            //�롰��ѯnum�Ρ�������Ϊǰ��������ͬ��
            //���sprite.movingΪtrue����Ϊ�ƶ�move������Ϊ��ѯrun��
            function move(num) {
                for (var i = 0; i < num; i++) {
                    playerLayer.setStateChange();
                    playerLayer.run();
                }
            };

            beforeEach(function () {
                run(2);
                fakeKeyDown(keyCodeMap.Left);
            });

            it("moveIndex_xΪ0", function () {
                expect(sprite.moveIndex_x).toEqual(0);
            });
            it("�ƶ�һ�κ�moveIndex_xΪ1��movingΪtrue", function () {
                move(1);

                expect([sprite.moveIndex_x, sprite.moving]).toEqual([1, true]);
            });

            describe("�ƶ���10�Σ�һ���ƶ�������", function () {
                beforeEach(function () {
                    move(10);
                });

                it("movingΪfalse��moveIndex_xΪ0������Ϊ���ߣ���һ����ѯʱ���жϷ���", function () {
                    expect(sprite.moving).toBeFalsy();
                    expect(sprite.moveIndex_x).toEqual(0);
                    expect(sprite.dirX).toEqual(-1);
                });


                describe("����A�������������������ƶ�1��", function () {
                    beforeEach(function () {
                        fakeKeyDown(keyCodeMap.Left);
                        move(1);
                    });

                    it("moveIndex_xΪ0", function () {
                        expect(sprite.moveIndex_x).toEqual(1);
                    });
                });

                describe("����A�������������������ƶ�10��", function () {
                    beforeEach(function () {
                        fakeKeyDown(keyCodeMap.Left);
                        move(10);
                    });

                    it("movingΪfalse��moveIndex_xΪ0������Ϊ���ߣ���һ����ѯʱ���жϷ���", function () {
                        expect(sprite.moveIndex_x).toEqual(0);
                        expect(sprite.moving).toBeFalsy();
                        expect(sprite.dirX).toEqual(-1);
                    });
                });
            });
        });
    });
});