describe("PlayerSprite.js", function () {
    var sprite = null;

    function clearKeyState() {
        window.keyState = {};
        window.keyState[keyCodeMap.Left] = false;
        window.keyState[keyCodeMap.Right] = false;
        window.keyState[keyCodeMap.Up] = false;
        window.keyState[keyCodeMap.Down] = false;
        window.keyState[keyCodeMap.Space] = false;
    };
    function fakeKeyDown(keyCode) {
        window.keyState[keyCode] = true;
    };
    function fakeKeyUp(keyCode) {
        window.keyState[keyCode] = false;
    };

    beforeEach(function () {
        sprite = spriteFactory.createPlayer();
    });
    afterEach(function () {
        sprite = null;
    });

    describe("���캯��", function () {
        it("���� ״̬ģʽ -> ����������󣬴��뵱ǰ������ʵ��", function () {
            expect(sprite.P__context.sprite).toEqual(sprite);
        });
    });


    describe("setDir", function () {
        afterEach(function () {
            clearKeyState();
        });

        it("��������ƶ����򷵻�", function () {
        });

        describe("���ֹͣ�ƶ������ж��ƶ����򲢵��ö�Ӧ��״̬�෽��", function () {
            beforeEach(function () {
                sprite.moving = false;
            });

            it("����ɿ�A��W��S��D���������stand", function () {
                fakeKeyUp(keyCodeMap.Left);
                fakeKeyUp(keyCodeMap.Right);
                fakeKeyUp(keyCodeMap.Up);
                fakeKeyUp(keyCodeMap.Down);
                spyOn(sprite.P__context, "stand");

                sprite.setDir();

                expect(sprite.P__context.stand).toHaveBeenCalled();
            });

            describe("����", function () {
                it("�������A���������walkLeft", function () {
                    fakeKeyDown(keyCodeMap.Left);
                    spyOn(sprite.P__context, "walkLeft");

                    sprite.setDir();

                    expect(sprite.P__context.walkLeft).toHaveBeenCalled();
                });
                it("�������D���������walkRight", function () {
                    fakeKeyDown(keyCodeMap.Right);
                    spyOn(sprite.P__context, "walkRight");

                    sprite.setDir();

                    expect(sprite.P__context.walkRight).toHaveBeenCalled();
                });
                it("�������W���������walkUp", function () {
                    fakeKeyDown(keyCodeMap.Up);
                    spyOn(sprite.P__context, "walkUp");

                    sprite.setDir();

                    expect(sprite.P__context.walkUp).toHaveBeenCalled();
                });
                it("�������S���������walkDown", function () {
                    fakeKeyDown(keyCodeMap.Down);
                    spyOn(sprite.P__context, "walkDown");

                    sprite.setDir();

                    expect(sprite.P__context.walkDown).toHaveBeenCalled();
                });
            });
        });
    });

    describe("move", function () {
        it("����context.move", function () {
            spyOn(sprite.P__context, "move");

            sprite.move();

            expect(sprite.P__context.move).toHaveBeenCalled();
        });
    });

    describe("createBomb", function () {
        var config = testTool.extendDeep(window.bomberConfig),
            data = testTool.extendDeep(window.mapData),
            terrainData = testTool.extendDeep(window.terrainData),
            ground = bomberConfig.map.type.GROUND,
            wall = bomberConfig.map.type.WALL,
            pass = bomberConfig.map.terrain.pass,
            stop = bomberConfig.map.terrain.stop,
            yes = stop,
            no = pass;

        //�ٵĵ�ͼ����ߴ�
        function fakeWidthAndHeight(width, height) {
            window.bomberConfig.WIDTH = width;
            window.bomberConfig.HEIGHT = height;
        };
        function fakeMapData(data) {
            window.mapData = data;
        };
        function fakeTerrainData(terrainData) {
            window.terrainData = terrainData;
        };
        function judge(one, two, three) {
            it("����һ��ը����BombSprite��ʵ���������أ���������������������������꣬ը������1", function () {
                spyOn(spriteFactory, "createBomb").andCallThrough();

                var bomb = sprite.createBomb();

                expect(spriteFactory.createBomb).toHaveBeenCalledWith(sprite);
                expect(bomb).toBeInstanceOf(BombSprite);
                expect([bomb.x, bomb.y]).toEqual([one, 20]);
                expect(sprite.bombNum).toEqual(1);
            });

            describe("�޸ĵ������ݣ�ը�����ڷ���Ϊ����ͨ��", function () {

                var terrainData = testTool.extendDeep(window.terrainData);

                function restore() {
                    window.terrainData = terrainData;
                };

                beforeEach(function () {
                    fakeTerrainData([
                        [pass, pass, pass, pass],
                        [pass, pass, pass, pass],
                        [pass, pass, pass, pass],
                        [pass, pass, pass, pass]
                    ]);
                });
                afterEach(function () {
                    restore();
                });

                it("ը�����ڷ����Ӧ�ĵ�������Ϊ��ͨ��", function () {
                    sprite.createBomb();

                    expect(window.terrainData[2][two]).toEqual(bomberConfig.map.terrain.stop);
                });
            });

            it("ͬһ������������һ��ը�����÷���ĵ���Ϊ����ͨ�����ʾ��ը���ˣ�", function () {
                fakeTerrainData(three.terrainData);
                spyOn(spriteFactory, "createBomb").andCallThrough();

                sprite.createBomb();

                expect(spriteFactory.createBomb.calls.length).toEqual(three.callNum);
            });
        };

        beforeEach(function () {
            fakeWidthAndHeight(10, 10);
            fakeMapData([
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground]
            ]);
            fakeTerrainData([
                [pass, pass, pass, pass],
                [pass, pass, pass, pass],
                [pass, pass, pass, pass],
                [pass, pass, pass, pass]
            ]);
            sprite.bombNum = 0;
            sprite.moving = false;
        });
        afterEach(function () {
            window.bomberConfig.WIDTH = config.WIDTH;
            window.bomberConfig.HEIGHT = config.HEIGHT;
            window.mapData = data;
            window.terrainData = terrainData;
        });

        it("���ֻ�ܷ�����ը�������ը����Ϊ3���򷵻�null", function () {
            sprite.P__context.setPlayerState(sprite.P__context.standLeftState);
            sprite.bombNum = 3;

            expect(sprite.createBomb()).toBeNull();
        });

        describe("�����Ҵ���Stand״̬������õ�ը���������������������", function () {
            beforeEach(function () {
                sprite.P__context.setPlayerState(sprite.P__context.standLeftState);
                sprite.x = 20;
                sprite.y = 20;
            });

            judge(20, 2, {
                terrainData: [
                    [pass, pass, pass, pass],
                    [pass, pass, pass, pass],
                    [pass, pass, stop, pass],
                    [pass, pass, pass, pass]
                ], callNum: 0
            });
        });

        describe("�����Ҵ���Walk״̬������WalkRight״̬��������õ�ը������Ϊ�ƶ�Ŀ�ĵط��������", function () {
            beforeEach(function () {
                sprite.P__context.setPlayerState(sprite.P__context.walkRightState);
            });

            describe("�������ұ�Ϊground", function () {
                beforeEach(function () {
                    //���λ�ڵ����е��ĸ���Ҵӵ����е����������ߣ�
                    sprite.x = 22;
                    sprite.y = 20;
                    sprite.moving = true;
                });

                judge(30, 3, {
                    terrainData: [
                        [pass, pass, pass, pass],
                        [pass, pass, pass, pass],
                        [pass, pass, pass, stop],
                        [pass, pass, pass, pass]
                    ], callNum: 0
                });
            });

            describe("�������ұ�Ϊǽ", function () {
                beforeEach(function () {
                    //���λ�ڵ����е�������Ҵӵ����е����������ߡ���Ϊ�ұ�Ϊǽ���������ͣ���ڸø��С���
                    sprite.x = 20;
                    sprite.y = 20;
                    sprite.moving = false;
                });

                judge(20, 2, {
                    terrainData: [
                        [pass, pass, pass, pass],
                        [pass, pass, pass, pass],
                        [pass, pass, pass, pass],
                        [pass, pass, pass, pass]
                    ], callNum: 1
                });


            });
        });
    });
});