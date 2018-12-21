describe("BombSprite.js", function () {
    var sprite = null;


    beforeEach(function () {
        sprite = spriteFactory.createBomb();

    });
    afterEach(function () {
        sprite = null;
    });

    describe("���캯��", function () {
        beforeEach(function () {
        });

        it("����������ﾫ����", function () {
            var fakePlayerSprite = {};
            sprite = spriteFactory.createBomb(fakePlayerSprite);

            expect(sprite.playerSprite).toEqual(fakePlayerSprite);
        });
        it("���ø��๹�캯��", function () {
        });
    });


    describe("explode", function () {
        var fakePlayerSprite = null;
        var ob = testTool.extendDeep(window.subject);

        function fakeObserver() {
            window.subject = {
                publishAll: function () {
                }
            };
        };

        beforeEach(function () {
            fakePlayerSprite = {
                bombNum: 0
            };
            sprite = spriteFactory.createBomb(fakePlayerSprite);

            fakeObserver();
        });
        afterEach(function () {
            window.subject = ob;
        });

        it("��������", function () {
            expect(sprite.explode).toBeDefined();
        });
        it("playerSprite.bombNum��1", function () {
            var bombNum = fakePlayerSprite.bombNum;

            sprite.explode();

            expect(sprite.playerSprite.bombNum).toEqual(bombNum - 1);
        });
        it("��־�ѱ�ը", function () {
            sprite.exploded = false;

            sprite.explode();

            expect(sprite.exploded).toBeTruthy();
        });

        describe("��û��淶Χ������˳��Ϊ[[up]��[down]��[left]��[right]", function () {
        });

        describe("�жϵ�ͼ������", function () {
            var data = testTool.extendDeep(window.mapData),
                config = testTool.extendDeep(window.bomberConfig),
                ground = bomberConfig.map.type.GROUND,
                wall = bomberConfig.map.type.WALL;

            //�ٵĵ�ͼ����ߴ�
            function fakeWidthAndHeight(width, height) {
                window.bomberConfig.WIDTH = width;
                window.bomberConfig.HEIGHT = height;
            };
            function fakeMapData(data) {
                window.mapData = data;
            };
            function restore() {
                window.mapData = data;
                window.bomberConfig.WIDTH = config.WIDTH;
                window.bomberConfig.HEIGHT = config.HEIGHT;
            };

            beforeEach(function () {
                fakeWidthAndHeight(10, 10);
            });
            afterEach(function () {
                restore();
            });

            describe("�޸ĵ������ݣ�ը�����ڷ���Ϊ����ͨ��", function () {

                var terrainData = testTool.extendDeep(window.terrainData);

                function fakeTerrainData() {
                    var pass = bomberConfig.map.terrain.pass,
                        stop = bomberConfig.map.terrain.stop;

                    window.terrainData = [
                        [pass, stop, pass, pass],
                        [pass, stop, pass, pass],
                        [pass, stop, pass, pass],
                        [pass, stop, pass, pass]
                    ];
                };

                function restore() {
                    window.terrainData = terrainData;
                };

                beforeEach(function () {
                    fakeTerrainData();
                    fakeWidthAndHeight(10, 10);
                });
                afterEach(function () {
                    restore();
                });

                it("ը�����ڷ����Ӧ�ĵ�������Ϊ����ͨ��", function () {
                    sprite.x = 10;
                    sprite.y = 10;

                    sprite.explode();

                    expect(window.terrainData[1][1]).toEqual(bomberConfig.map.terrain.pass);
                });
            });

            describe("Ĭ�ϻ�����ΧΪ2������������FireSprite�����������ꡣ���ص�˳��Ϊcenter��up1��up2��down1��down2��left1��left2��right1��right2", function () {
                describe("���ը�����ܲ��Ǳ߽���Ϊ�յ�", function () {

                    beforeEach(function () {
                        fakeMapData([
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground]
                        ]);

                        sprite.x = 20;
                        sprite.y = 20;
                    });


                    it("����9��FireSprite��������������", function () {
                        var fire = sprite.explode().fires;

                        expect(fire.length).toEqual(9);
                        expect([fire[0].x, fire[0].y]).toEqual([20, 20]);   //center
                        expect([fire[1].x, fire[1].y]).toEqual([20, 10]);   //up1
                        expect([fire[2].x, fire[2].y]).toEqual([20, 0]);   //up2
                        expect([fire[3].x, fire[3].y]).toEqual([20, 30]);    //down1
                        expect([fire[4].x, fire[4].y]).toEqual([20, 40]);    //down2
                        expect([fire[5].x, fire[5].y]).toEqual([10, 20]);    //left1
                        expect([fire[6].x, fire[6].y]).toEqual([0, 20]);    //left2
                        expect([fire[7].x, fire[7].y]).toEqual([30, 20]);    //right1
                        expect([fire[8].x, fire[8].y]).toEqual([40, 20]);    //right2
                    });
                });

                describe("���ը���Ϸ���һ��Ϊ�߽�", function () {

                    beforeEach(function () {
                        fakeMapData([
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground]
                        ]);

                        sprite.x = 20;
                        sprite.y = 0;
                    });


                    it("����7��FireSprite��������������", function () {
                        var fire = sprite.explode().fires;

                        expect(fire.length).toEqual(7);
                        expect([fire[0].x, fire[0].y]).toEqual([20, 0]);   //center
                        expect([fire[1].x, fire[1].y]).toEqual([20, 10]);    //down1
                        expect([fire[2].x, fire[2].y]).toEqual([20, 20]);    //down2
                        expect([fire[3].x, fire[3].y]).toEqual([10, 0]);    //left1
                        expect([fire[4].x, fire[4].y]).toEqual([0, 0]);    //left2
                        expect([fire[5].x, fire[5].y]).toEqual([30, 0]);    //right1
                        expect([fire[6].x, fire[6].y]).toEqual([40, 0]);    //right2
                    });
                });

                describe("���ը���Ϸ���һ��Ϊǽ", function () {

                    beforeEach(function () {
                        fakeMapData([
                            [ground, ground, ground, ground, ground],
                            [ground, ground, wall, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground]
                        ]);

                        sprite.x = 20;
                        sprite.y = 20;
                    });


                    it("����7��FireSprite���Ϸ���һ��Ϊǽ�󣬾Ͳ����ж��Ϸ��ڶ����ˣ���������������", function () {
                        var fire = sprite.explode().fires;

                        expect(fire.length).toEqual(7);
                        expect([fire[0].x, fire[0].y]).toEqual([20, 20]);   //center
                        expect([fire[1].x, fire[1].y]).toEqual([20, 30]);    //down1
                        expect([fire[2].x, fire[2].y]).toEqual([20, 40]);    //down2
                        expect([fire[3].x, fire[3].y]).toEqual([10, 20]);    //left1
                        expect([fire[4].x, fire[4].y]).toEqual([0, 20]);    //left2
                        expect([fire[5].x, fire[5].y]).toEqual([30, 20]);    //right1
                        expect([fire[6].x, fire[6].y]).toEqual([40, 20]);    //right2

                    });
                });

                describe("���ը���Ϸ��ڶ���Ϊǽ", function () {

                    beforeEach(function () {
                        fakeMapData([
                            [ground, ground, wall, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground]
                        ]);

                        sprite.x = 20;
                        sprite.y = 20;
                    });


                    it("����8��FireSprite��������������", function () {
                        var fire = sprite.explode().fires;

                        expect(fire.length).toEqual(8);
                        expect([fire[0].x, fire[0].y]).toEqual([20, 20]);   //center
                        expect([fire[1].x, fire[1].y]).toEqual([20, 10]);    //up1
                        expect([fire[2].x, fire[2].y]).toEqual([20, 30]);    //down1
                        expect([fire[3].x, fire[3].y]).toEqual([20, 40]);    //down2
                        expect([fire[4].x, fire[4].y]).toEqual([10, 20]);    //left1
                        expect([fire[5].x, fire[5].y]).toEqual([0, 20]);    //left2
                        expect([fire[6].x, fire[6].y]).toEqual([30, 20]);    //right1
                        expect([fire[7].x, fire[7].y]).toEqual([40, 20]);    //right2

                    });
                });
            });

            describe("Ĭ�ϻ�����ΧΪ2���жϻ��淶Χ���Ƿ���ǽ������У���ը��ǽ���޸ĵ�ͼΪ�յء���������Ϊͨ����", function () {
                var terrainData = testTool.extendDeep(window.terrainData),
                    pass = bomberConfig.map.terrain.pass,
                    stop = bomberConfig.map.terrain.stop;


                beforeEach(function () {
                });
                afterEach(function () {
                    window.terrainData = terrainData;
                });

                describe("���ը������Ϊ�յ�", function () {
                    beforeEach(function () {
                        fakeMapData([
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground]
                        ]);

                        sprite.x = 20;
                        sprite.y = 20;
                    });


                    it("��ͼ���������ݲ��䣬���ء�mapChange:false��", function () {
                        spyOn(window.mapDataOperate, "setMapData");
                        spyOn(window.terrainDataOperate, "setTerrainData");

                        var result = sprite.explode();

                        expect(window.mapDataOperate.setMapData).not.toHaveBeenCalled();
                        //��__changeTerrainData�е�һ�ε���
                        expect(window.terrainDataOperate.setTerrainData.calls.length).toEqual(1)

                        expect(result.mapChange).toBeFalsy();
                    });
                });

                describe("���ը���Ϸ���һ�񡢵ڶ���Ϊǽ", function () {
                    beforeEach(function () {
                        fakeMapData([
                            [ground, ground, wall, ground, ground],
                            [ground, ground, wall, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground],
                            [ground, ground, ground, ground, ground]
                        ]);

                        sprite.x = 20;
                        sprite.y = 20;
                    });
                    afterEach(function () {
                    });

                    it("�Ϸ��ڶ��񲻱䣬�ı��Ϸ���һ���ͼΪground������Ϊͨ�����޸�mapLayer�ж�Ӧ�ľ����img���󣨹۲���ģʽ -> �����������ء�mapChange:true��", function () {
                        spyOn(window.mapDataOperate, "setMapData");
                        spyOn(window.terrainDataOperate, "setTerrainData");
                        spyOn(window.subject, "publishAll");

                        var result = sprite.explode();

                        expect(window.mapDataOperate.setMapData.calls.length).toEqual(1);
                        expect(window.mapDataOperate.setMapData).toHaveBeenCalledWith(2, 1, ground);
                        //��__changeTerrainData�е�����һ��
                        expect(window.terrainDataOperate.setTerrainData.calls.length).toEqual(2);
                        expect(window.terrainDataOperate.setTerrainData.calls[1].args).toEqual([2, 1, pass]);
                        expect(window.subject.publishAll).toHaveBeenCalledWith(null, 2, 1, window.imgLoader.get("ground"));
                        expect(result.mapChange).toBeTruthy();
                    });
                });
            });
        });

    });

    describe("collideFireWithCharacter", function () {
        var config = testTool.extendDeep(window.bomberConfig),
            data = testTool.extendDeep(window.mapData),
            ground = bomberConfig.map.type.GROUND,
            wall = bomberConfig.map.type.WALL;

        //�ٵĵ�ͼ����ߴ�
        function fakeWidthAndHeight(width, height) {
            window.bomberConfig.WIDTH = width;
            window.bomberConfig.HEIGHT = height;
        };
        function fakeMapData(data) {
            window.mapData = data;
        };
        function restore() {
            window.mapData = data;
            window.bomberConfig.WIDTH = config.WIDTH;
            window.bomberConfig.HEIGHT = config.HEIGHT;
        };

        beforeEach(function () {
            fakeWidthAndHeight(10, 10);
        });
        afterEach(function () {
            restore();
        });

        it("������ﾫ�鴦����Ч������Χ�ڣ�Ĭ�ϻ�����ΧΪ2�������򷵻�true", function () {
            var fakeSprite = null;
            fakeMapData([
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground]
            ]);
            sprite.x = 20;
            sprite.y = 20;
            sprite.bitmap = {
                width: 10,
                height: 10
            };
            fakeSprite = {
                x: 20,
                y: 12,
                bitmap: {
                    width: 10,
                    height: 10
                }
            };

            var result = sprite.collideFireWithCharacter(fakeSprite);

            expect(result).toBeTruthy();
        });
        it("�����򷵻�false", function () {
            var fakeSprite = null;
            fakeMapData([
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, wall, ground],
                [ground, ground, ground, ground, ground],
                [ground, ground, ground, ground, ground]
            ]);
            sprite.x = 20;
            sprite.y = 20;
            sprite.bitmap = {
                width: 10,
                height: 10
            };
            fakeSprite = {
                x: 40,
                y: 20,
                bitmap: {
                    width: 10,
                    height: 10
                }
            };

            var result = sprite.collideFireWithCharacter(fakeSprite);

            expect(result).toBeFalsy();
        });
    });

    describe("getFireEffectiveRange", function () {
        var data = testTool.extendDeep(window.mapData),
            config = testTool.extendDeep(window.bomberConfig),
            ground = bomberConfig.map.type.GROUND,
            wall = bomberConfig.map.type.WALL;

        //�ٵĵ�ͼ����ߴ�
        function fakeWidthAndHeight(width, height) {
            window.bomberConfig.WIDTH = width;
            window.bomberConfig.HEIGHT = height;
        };
        function fakeMapData(data) {
            window.mapData = data;
        };
        function restore() {
            window.mapData = data;
            window.bomberConfig.WIDTH = config.WIDTH;
            window.bomberConfig.HEIGHT = config.HEIGHT;
        };

        beforeEach(function () {
            fakeWidthAndHeight(10, 10);
        });
        afterEach(function () {
            restore();
        });

        describe("���ը�������һ��Ϊǽ������ڶ���Ϊ�߽�", function () {
            beforeEach(function () {
                fakeMapData([
                    [ground, ground, ground, ground, ground],
                    [ground, ground, ground, ground, ground],
                    [ground, ground, wall, ground, ground],
                    [ground, ground, ground, ground, ground],
                    [ground, ground, ground, ground, ground]
                ]);

                sprite.x = 20;
                sprite.y = 10;
            });

            it("��Ч��Χ�������ը�����ڷ���Ϊ��Ч��Χ��center����"
                + "���淶Χ���������ҷ��򣬶�ÿ���������ѭ���жϡ�"
                + "���ж�up����ʱ���������Ϊǽ����÷���Ϊ��Ч��Χ��up�������ķ��񶼲�����Ч��Χ��"
                + "����÷���Ϊ�߽磬��÷���up�����Ժ�ķ��񶼲�����Ч��Χ��", function () {
                var expected = {center: {x: 20, y: 10}, groundRange: [
                    {x: 20, y: 0},
                    {x: 10, y: 10},
                    {x: 0, y: 10},
                    {x: 30, y: 10},
                    {x: 40, y: 10}
                ], wallRange: [
                    {x: 20, y: 20}
                ]};
                expect(sprite.getFireEffectiveRange()).toEqual(expected);
            });
        });
    });

    describe("isInEffectiveRangeը����ըʱ�������ڻ�����Χ�ڵ�ը��", function () {
        it("���ը��λ�ڲ��������ը������Ч��Χ�ڣ��򷵻�true�����򷵻�false", function () {
            var fakeBomb = {
                getFireEffectiveRange: function () {
                    return { center: { x: 20, y: 10 }, groundRange: [
                        { x: 20, y: 0 },
                        { x: 10, y: 10 },
                        { x: 0, y: 10 },
                        { x: 30, y: 10 },
                        { x: 40, y: 10 }
                    ], wallRange: [
                        { x: 20, y: 20 }
                    ] };
                }
            };
            sprite.x = 10;
            sprite.y = 10;

            expect(sprite.isInEffectiveRange(fakeBomb)).toBeTruthy();

            sprite.x = 40;
            sprite.y = 40;

            expect(sprite.isInEffectiveRange(fakeBomb)).toBeFalsy();
        });
    });
});