describe("PlayerLayer.js", function () {
    var layer = null;

    beforeEach(function () {
        layer = new PlayerLayer(100);
    });

    describe("Init", function () {
        it("���ø��๹�캯��", function () {
        });
    });


    describe("setCanvas", function () {
        it("��������", function () {
            expect(layer.setCanvas).toBeDefined();
        });
        it("���playerLayerCanvas", function () {
            spyOn(document, "getElementById");

            layer.setCanvas();

            expect(document.getElementById).toHaveBeenCalledWith("playerLayerCanvas");
        });
        it("����css", function () {
            layer.setCanvas();

            var canvas = $(layer.P__canvas);
            var expectedCss = {
                "position": "absolute",
                "top": bomberConfig.canvas.TOP.toString(),
                "left": bomberConfig.canvas.LEFT.toString(),
                "z-index": 3
            };

            expect(canvas.css("top")).toEqual(expectedCss.top);
            expect(canvas.css("left")).toEqual(expectedCss.left);
            expect(Number(canvas.css("z-index"))).toEqual(expectedCss["z-index"]);
        });
    });

    describe("init", function () {
        beforeEach(function () {
            layer.setCanvas();
        });

        it("���bombLayer", function () {
            var fakeLayers = {
                bombLayer: {}
            };
            layer.init(fakeLayers);

            expect(layer.bombLayer).toBeExist();
        });
        it("���ø���ͬ������", function () {
        });
    });

    describe("change", function () {
        function clearKeyState() {
            window.keyState = {};
            window.keyState[keyCodeMap.Left] = false;
            window.keyState[keyCodeMap.Right] = false;
            window.keyState[keyCodeMap.Up] = false;
            window.keyState[keyCodeMap.Down] = false;
            window.keyState[keyCodeMap.Space] = false;
        };
        function fakeKeyDown(keyCode) {
            keyState[keyCode] = true;
        };
        function fakeKeyUp(keyCode) {
            keyState[keyCode] = false;
        };
        function judgeKeyDown(keyCode) {
            layer = new PlayerLayer(100);
            fakeKeyDown(keyCode);

            layer.change();

            expect(layer.P__isChange()).toBeTruthy();
        };

        beforeEach(function () {
            layer.setStateNormal();
            clearKeyState();
            layer.appendChild(spriteFactory.createPlayer());
            layer.getChildAt(0).moving = false;
            layer.getChildAt(0).stand = false;
        });
        afterEach(function () {
        });


        it("���������keydown���Ұ���ΪA/D/W/S������ø���ͬ������", function () {
            judgeKeyDown(keyCodeMap.Left);
            judgeKeyDown(keyCodeMap.Right);
            judgeKeyDown(keyCodeMap.Up);
            judgeKeyDown(keyCodeMap.Down);

            clearKeyState();
        });
        it("���layer����Ҿ����������ƶ��������layer.change", function () {
            layer.getChildAt(0).moving = true;

            layer.change();

            expect(layer.P__isChange()).toBeTruthy();
        });
        it("���layer����Ҿ��������ƶ�תΪվ��������WalkState��stand������������stand��־Ϊfalse������layer.change(ˢ�¶���)", function () {
            layer.getChildAt(0).stand = true;

            layer.change();

            expect(layer.getChildAt(0).stand).toBeFalsy();
            expect(layer.P__isChange()).toBeTruthy();
        });
    });

    describe("createAndAddBomb", function () {
        var fakeLayers = null,
            fakeBombLayer = null,
            sprite = null;

        var terrainData = testTool.extendDeep(window.terrainData),
            pass = bomberConfig.map.terrain.pass,
            stop = bomberConfig.map.terrain.stop;

        function fakeTerrainData(terrainData) {
            window.terrainData = terrainData;
        };
        function createFakeSprite() {
            var sprite = spriteFactory.createPlayer();
            sprite.x = bomberConfig.WIDTH;
            sprite.y = bomberConfig.HEIGHT;
            sprite.P__context.setPlayerState(sprite.P__context.standLeftState);

            return sprite;
        };


        beforeEach(function () {
            fakeTerrainData([
                [pass, pass, pass, pass],
                [pass, pass, pass, pass],
                [pass, pass, pass, pass],
                [pass, pass, pass, pass]
            ]);

            sprite = createFakeSprite();
            layer.appendChild(sprite);
            fakeBombLayer = {
                appendChild: function () {
                },
                explode: function () {
                },
                clear: function () {
                }
            };
            layer.setCanvas();
            fakeLayers = {
                bombLayer: fakeBombLayer
            };
            layer.init(fakeLayers);
        });
        afterEach(function () {
            window.terrainData = terrainData;
        });

        it("����������createBomb����null���򷵻�false", function () {
            spyOn(sprite, "createBomb").andReturn(null);

            expect(layer.createAndAddBomb()).toBeFalsy();
        });
        it("���þ������createBomb", function () {
            spyOn(layer.getChildAt(0), "createBomb");

            layer.createAndAddBomb();

            expect(layer.getChildAt(0).createBomb).toHaveBeenCalled();
        });
        it("BombLayer���봴����һ��ը��", function () {
            spyOn(fakeBombLayer, "appendChild");

            layer.createAndAddBomb();

            expect(fakeBombLayer.appendChild.calls.length).toEqual(1);
        });

        describe("3s��", function () {
            function judge(exploded, func) {
                jasmine.Clock.useMock();

                spyOn(findPath, "aCompute");

                spyOn(fakeBombLayer, "explode");
                var bomb = layer.createAndAddBomb();
                bomb.exploded = exploded;

                jasmine.Clock.tick(2999);

                expect(fakeBombLayer.explode).not.toHaveBeenCalled();

                jasmine.Clock.tick(1);

                func();
            }

            it("���ը��û�б�ը�������ܱ��ڻ�����Χ�ڵ�ը�������ˣ�����ը����ը", function () {
                judge(false, function () {
                    expect(fakeBombLayer.explode).toHaveBeenCalledWith(bomb);
                });
            });
            it("���ը���Ѿ���ը�ˣ����ڻ�����Χ�ڵ�ը�������ˣ�����ը�������ٴα�ը", function () {
                judge(true, function () {
                    expect(fakeBombLayer.explode).not.toHaveBeenCalledWith(bomb);
                });
            });
        });


        it("���ش�����ը��������������ԣ�", function () {
            expect(layer.createAndAddBomb()).toBeExist();
        });
    });

    describe("run", function () {
        function clearKeyState() {
            window.keyState[keyCodeMap.Space] = false;
        };
        function fakeKeyDown(keyCode) {
            keyState[keyCode] = true;
        };
        function fakeKeyUp(keyCode) {
            keyState[keyCode] = false;
        };

        afterEach(function () {
            clearKeyState();
        });

        it("������¿ո���������createAndAddBomb�����ÿո��״̬Ϊfalse"
            + "��Ҫ��Ȼ�´���ѯʱ����Ϊ��û���ɿ��ո��������keyState[keyCodeMap.Space]����Ϊtrue�����Ի��ظ�����ը���� ��", function () {
            fakeKeyDown(keyCodeMap.Space);
            spyOn(layer, "createAndAddBomb");

            layer.run();

            expect(layer.createAndAddBomb).toHaveBeenCalled();
            expect(keyState[keyCodeMap.Space]).toBeFalsy();
        });
        it("���ø���ͬ������", function () {
        });
    });
});