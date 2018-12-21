describe("Sprite.js", function () {
    var sprite = null;
    var data = null;

    //��ΪSpriteΪ�����࣬��˲���ֱ��ʵ����������ͨ����������ʵ����
    function getInstance(data, bitmap) {
        var T = YYC.Class(Sprite, {
            Init: function (data, bitmap) {
                this.base(data, bitmap);
            },
            Public: {
            }
        });

        return new T(data, bitmap);
    };

    beforeEach(function () {
        data = {
            //��ʼ����
            x: 0,
            y: 0,

            defaultAnimId: "stand_right",

            anims: {
                "stand_right": new Animation(getFrames("player", "stand_right")),
                "stand_left": new Animation(getFrames("player", "stand_left")),
                "stand_down": new Animation(getFrames("player", "stand_down")),
                "stand_up": new Animation(getFrames("player", "stand_up")),
                "walk_up": new Animation(getFrames("player", "walk_up")),
                "walk_down": new Animation(getFrames("player", "walk_down")),
                "walk_right": new Animation(getFrames("player", "walk_right")),
                "walk_left": new Animation(getFrames("player", "walk_left"))
            }
        };

        sprite = getInstance(data);
    });

    //�������еĹ��캯�������๹�캯���е���
    describe("���캯��", function () {
        beforeEach(function () {
        });

        it("���bitmap", function () {
            var sprite = getInstance(data, {});

            expect(sprite.bitmap).toEqual({});
        });
        it("���data�����ڣ��򷵻�", function () {
            sprite = getInstance();

            expect(sprite.defaultAnimId).toBeNull();
        });
        it("���data���ڣ����x��ydefaultAnimID", function () {
            var expected = {
                x: sprite.x,
                y: sprite.y,

                defaultAnimId: sprite.defaultAnimId,

                anims: sprite.anims
            };
            expect(expected).toEqual(data);
        });
    });

    describe("setAnim", function () {
        it("��õ�ǰ����currentAnim", function () {
            sprite.setAnim("walk_right");

            expect(sprite.currentAnim).toEqual(new Animation(getFrames("player", "walk_right")));
        });
    });

    describe("resetCurrentFrame", function () {
        function fakeAnim() {
            return {
                setCurrentFrame: function () {
                }
            }
        };

        beforeEach(function () {
            sprite.currentAnim = fakeAnim();
        })

        it("����_resetCurrentFrame", function () {
            spyOn(sprite.currentAnim, "setCurrentFrame");

            sprite.resetCurrentFrame(0);

            expect(sprite.currentAnim.setCurrentFrame).toHaveBeenCalledWith(0);
        });
    });

    describe("getCollideRect", function () {
        describe("���currentAnim����", function () {
            function fakeBitmap() {
                return {
                    width: 1,
                    height: 2
                };
            };

            beforeEach(function () {
                //sprite.currentAnim = fakeAnim();
                sprite.x = 10;
                sprite.y = 11;
                sprite.bitmap = fakeBitmap();
            })

            it("ȡ�þ������ײ����", function () {
                var result = sprite.getCollideRect();

                expect([result.x1, result.y1, result.x2, result.y2]).toEqual([10, 11, 11, 13]);
            });
        });
    });

    describe("init", function () {
        it("����setAnim", function () {
            spyOn(sprite, "setAnim");

            sprite.init();

            expect(sprite.setAnim).toHaveBeenCalledWith(data.defaultAnimId);
        });
    });

    describe("update", function () {
        beforeEach(function () {
            sprite.init();
        });

        it("���currentAnimΪnull�������currentAnim.update", function () {
            spyOn(sprite.currentAnim, "update");

            sprite.update(1);

            expect(sprite.currentAnim.update).toHaveBeenCalledWith(1);
        });
        it("���currentAnimΪnull����ִ��", function () {
            spyOn(sprite.currentAnim, "update");

            sprite.currentAnim = null;
            sprite.update(1);

            sprite.currentAnim && expect(sprite.currentAnim.update).not.toHaveBeenCalled();
        });
    });

    describe("getCellPosition", function () {
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
            fakeWidthAndHeight(10, 20);
        });
        afterEach(function () {
            restore();
        });

        it("��������Ӧ�ķ������꣨����ȡֵ����", function () {
            var x = 10,
                y = 18;

            var result = sprite.getCellPosition(x, y);

            expect(result).toEqual({ x: 1, y: 0 });
        });
    });

    describe("draw", function () {
        var context = null;

        function fakeContext() {
            return {
                drawImage: function () {
                }
            }
        };

        beforeEach(function () {
            context = fakeContext();
            //sprite.init();
        });

        it("����drawImage������Ϊbitmap.img,x,y,bitmap.width,bitmap.height", function () {
            spyOn(context, "drawImage");
            fakeBitmap = {
                img: {},
                width: 1,
                height: 1
            };
            sprite.bitmap = fakeBitmap;

            sprite.draw(context);

            expect(context.drawImage).toHaveBeenCalledWith(fakeBitmap.img, sprite.x, sprite.y, fakeBitmap.width, fakeBitmap.height);
        });
    });

    describe("clear", function () {
        var context = null;

        function fakeContext() {
            return {
                clearRect: function () {
                }
            }
        };

        beforeEach(function () {
            context = fakeContext();
        });

        it("��ջ���", function () {
            spyOn(context, "clearRect");

            sprite.clear(context);

            expect(context.clearRect).toHaveBeenCalledWith(0, 0, bomberConfig.canvas.WIDTH, bomberConfig.canvas.HEIGHT);
        });
    });
});