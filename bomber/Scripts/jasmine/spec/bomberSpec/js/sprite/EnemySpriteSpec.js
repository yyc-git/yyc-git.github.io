describe("EnemySprite.js", function () {
    var sprite = null;
    var data = null;

    beforeEach(function () {
        sprite = spriteFactory.createEnemy();
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
        function fakeContext() {
            return {
                walkRight: function () {
                },
                walkLeft: function () {
                },
                walkUp: function () {
                },
                walkDown: function () {
                },
                stand: function () {
                }
            };
        };

        beforeEach(function () {
            sprite.P__context = fakeContext();
        });


        it("��������ƶ������Ҳ���·�����򷵻�", function () {
        });

        describe("����", function () {
            beforeEach(function () {
                sprite.moving = false;
            });

            it("·������pathȥ����һ��Ԫ�أ���ñ����ƶ���Ŀ������꣩", function () {
                sprite.path = [
                    { x: 1, y: 1 }
                ];

                sprite.setDir();

                expect(sprite.path).toEqual([]);
            });

            describe("�ж��ƶ����򲢵��ö�Ӧ��״̬�෽��", function () {
                function fakeTarget(target) {
                    sprite.path = [target];
                };
                function fakeCurrent(current) {
                    sprite.x = current.x * bomberConfig.WIDTH;
                    sprite.y = current.y * bomberConfig.HEIGHT;
                };

                it("���Ŀ�������target��x���ڵ�ǰ����current��x�������walkRight", function () {
                    fakeTarget({ x: 3, y: 1 });
                    fakeCurrent({ x: 2, y: 1 });
                    spyOn(sprite.P__context, "walkRight");

                    sprite.setDir();

                    expect(sprite.P__context.walkRight).toHaveBeenCalled();
                });
                it("���Ŀ�������target��xС�ڵ�ǰ����current��x�������walkLeft", function () {
                    fakeTarget({ x: 1, y: 1 });
                    fakeCurrent({x: 2, y: 1});
                    spyOn(sprite.P__context, "walkLeft");

                    sprite.setDir();

                    expect(sprite.P__context.walkLeft).toHaveBeenCalled();
                });
                it("���Ŀ�������target��y���ڵ�ǰ����current��y�������walkDown", function () {
                    fakeTarget({ x: 3, y: 2 });
                    fakeCurrent({ x: 3, y: 1 });
                    spyOn(sprite.P__context, "walkDown");

                    sprite.setDir();

                    expect(sprite.P__context.walkDown).toHaveBeenCalled();
                });
                it("���Ŀ�������target��yС�ڵ�ǰ����current��y�������walkUp", function () {
                    fakeTarget({ x: 3, y: 2 });
                    fakeCurrent({ x: 3, y: 3 });
                    spyOn(sprite.P__context, "walkUp");

                    sprite.setDir();

                    expect(sprite.P__context.walkUp).toHaveBeenCalled();
                });
                it("���Ŀ�������target���ڵ�ǰ����current�������stand", function () {
                    fakeTarget({ x: 3, y: 3 });
                    fakeCurrent({ x: 3, y: 3 });
                    spyOn(sprite.P__context, "stand");

                    sprite.setDir();    //����stand

                    fakeTarget({ x: 2, y: 4 });
                    fakeCurrent({ x: 3, y: 3 });

                    sprite.setDir();    //������stand������walkLeft

                    expect(sprite.P__context.stand.calls.length).toEqual(1);
                });
            });
        });
    });

    describe("getPath", function () {
        var bomberConfig = testTool.extendDeep(window.bomberConfig);

        //�ٵĵ�ͼ����ߴ�
        function fakeWidthAndHeight(width, height) {
            window.bomberConfig.WIDTH = width;
            window.bomberConfig.HEIGHT = height;
        };
        function restore() {
            window.bomberConfig.WIDTH = bomberConfig.WIDTH;
            window.bomberConfig.HEIGHT = bomberConfig.HEIGHT;
        };

        beforeEach(function () {
            fakeWidthAndHeight(30, 30);
        });
        afterEach(function () {
            restore();
        });

        it("��������ƶ����򷵻�", function () {
            sprite.moving = true;
            sprite.path = [];

            sprite.getPath();

            expect(sprite.path).toEqual([]);
        });

        describe("���ֹͣ�ƶ�", function () {
            beforeEach(function () {
                sprite.moving = false;
            });

            describe("��������Ѿ������յ���߻�û�п�ʼ��һ��Ѱ·����Ѱ��·��", function () {
                function fakePlayerSprite() {
                    return {
                        x: 35,
                        y: 59
                    };
                };

                beforeEach(function () {
                    sprite.path = [];
                    sprite.playerSprite = fakePlayerSprite();
                    spyOn(window.findPath, "aCompute").andReturn({ path: [
                        { x: 1, y: 1 },
                        { x: 2, y: 1 }
                    ], time: 1 });
                });

                it("������˵�ǰ���겻�Ƿ���ߴ�������������׳��쳣", function () {
                    sprite.x = 10;
                    sprite.y = 45;

                    expect(function () {
                        sprite.getPath();
                    }).toThrow();
                });
                it("������˵�ǰ����", function () {
                    sprite.x = 30;
                    sprite.y = 60;

                    sprite.getPath();

                    expect(window.findPath.aCompute.calls[0].args[1]).toEqual({ x: 1, y: 2 });
                });
                it("������Ҿ�������꣨��Ҿ���ĵ�ǰ��������ȡ����", function () {
                    sprite.getPath();

                    expect(window.findPath.aCompute.calls[0].args[2]).toEqual({ x: 1, y: 1 });
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

    describe("collideWithPlayer", function () {
        function fakePlayerSprite() {
            return {
                x: 1,
                y: 1,
                bitmap: {
                    width: 1,
                    height: 1
                }
            }
        };

        beforeEach(function () {
        });

        it("�����ײ�����׳��쳣", function () {
            spyOn(YYC.Tool.collision, "col_Between_Rects").andReturn(true);

            expect(function () {
                sprite.collideWithPlayer(fakePlayerSprite());
            }).toThrow();
        });
        it("���û����ײ�����׳��쳣", function () {
            spyOn(YYC.Tool.collision, "col_Between_Rects").andReturn(false);

            expect(function () {
                sprite.collideWithPlayer(fakePlayerSprite());
            }).not.toThrow();
        });
    });

    describe("setPlayerSprite", function () {
        it("�����Ҿ���", function () {
            var fakeSprite = {
                x: 1
            };

            sprite.setPlayerSprite(fakeSprite);

            expect(sprite.playerSprite).toEqual(fakeSprite);
        });
    });
});