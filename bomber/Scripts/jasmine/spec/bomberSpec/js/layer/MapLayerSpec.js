describe("MapLayer.js", function () {
    var layer = null;

    beforeEach(function () {
        layer = new MapLayer();

        layer.setCanvas();
    });

    describe("Init", function () {
    });

    describe("setCanvas", function () {
        it("��������", function () {
            expect(layer.setCanvas).toBeDefined();
        });
        it("���mapLayerCanvas", function () {
            spyOn(document, "getElementById");

            layer.setCanvas();

            expect(document.getElementById).toHaveBeenCalledWith("mapLayerCanvas");
        });
        it("����Canvas��css", function () {
            layer.setCanvas();

            var canvas = $(layer.P__canvas);
            var expectedCss = {
                "position": "absolute",
                "top": bomberConfig.canvas.TOP.toString(),
                "left": bomberConfig.canvas.LEFT.toString(),
                "z-index": 0
            };

            expect(canvas.css("top")).toEqual(expectedCss.top);
            expect(canvas.css("left")).toEqual(expectedCss.left);
            expect(Number(canvas.css("z-index"))).toEqual(expectedCss["z-index"]);
        });
        it("���û���Canvas��css������Canvas��css��mapLayerCanvas��cssһ�£�", function () {
        });
    });

    describe("init", function () {
        it("��û���canvas", function () {
            spyOn(document, "getElementById").andCallThrough();

            layer.init();

            expect(document.getElementById).toHaveBeenCalledWith("mapLayerCanvas_buffer");
        });
        it("��û���context", function () {
            layer.init();

            expect(layer.___contextBuffer).toBeDefined();
        });
    });

    describe("change", function () {
        it("����setStateNormal", function () {

            spyOn(layer, "setStateNormal");

            layer.change();

            expect(layer.setStateNormal).toHaveBeenCalled();
        });
    });

    describe("changeSpriteImg", function () {
        var config = testTool.extendDeep(window.bomberConfig),
            fakeBitmap = null,
            fakeNewImg = null,
            sprite1, sprite2, sprite3, sprite4;

        //�ٵĵ�ͼ�����С
        function fakeMap() {
            window.bomberConfig.map.ROW = 2;
            window.bomberConfig.map.COL = 2;
        };
        function restore() {
            window.bomberConfig.map.ROW = config.map.ROW;
            window.bomberConfig.map.ROW = config.map.ROW;
        };

        beforeEach(function () {
            fakeMap();

            fakeBitmap = {
                img: {},
                width: 10,
                height: 11
            },
                fakeNewImg = { x: 1 }
            sprite1 = spriteFactory.createMapElement({
                x: 0,
                y: 0
            }, fakeBitmap);
            sprite2 = spriteFactory.createMapElement({
                x: 1,
                y: 0
            }, fakeBitmap);
            sprite3 = spriteFactory.createMapElement({
                x: 0,
                y: 1
            }, fakeBitmap);
            sprite4 = spriteFactory.createMapElement({
                x: 1,
                y: 1
            }, fakeBitmap);

            layer.addSprites([sprite1, sprite2, sprite3, sprite4]);
        });
        afterEach(function () {
            restore();
        });

        it("��ָ����x���꣨�����Ӧֵ����y���꣨�����Ӧֵ���ľ����img�����滻Ϊָ����img����", function () {
            layer.changeSpriteImg(1, 1, fakeNewImg);

            expect(sprite4.bitmap.img).toEqual(fakeNewImg);
        });
    });

    describe("���ʼ������õ�API����", function () {
        beforeEach(function () {
            layer.init();
        });

        describe("draw", function () {
            var data = null,
                fakeBitmap = null,
                sprite1 = null,
                sprite2 = null;

            beforeEach(function () {
                data = {
                    x: 1,
                    y: 2
                };
                fakeBitmap = {
                    img: {},
                    width: 10,
                    height: 11
                };
                sprite1 = spriteFactory.createMapElement(data, fakeBitmap),
                    sprite2 = spriteFactory.createMapElement(data, fakeBitmap);

                layer.appendChild(sprite1).appendChild(sprite2);
            });

            it("ʹ��˫����", function () {
                spyOn(sprite1, "draw");
                spyOn(sprite2, "draw");
                spyOn(layer.P__context, "drawImage");

                layer.draw();

                expect(layer.P__context.drawImage.calls[0].args[0]).toBeCanvas();
                expect(layer.P__context.drawImage.calls[0].args[1]).toEqual(0);
                expect(layer.P__context.drawImage.calls[0].args[2]).toEqual(0);
            });
            it("����ÿ���������draw���������context", function () {
                spyOn(sprite1, "draw");
                spyOn(sprite2, "draw");

                layer.draw();

                expect(sprite1.draw).toHaveBeenCalledWith(layer.___contextBuffer);
                expect(sprite2.draw).toHaveBeenCalledWith(layer.___contextBuffer);
            });
        });

        describe("clear", function () {
            it("������滭��", function () {
                spyOn(layer.___contextBuffer, "clearRect");

                layer.clear();

                expect(layer.___contextBuffer.clearRect).toHaveBeenCalledWith(0, 0, bomberConfig.canvas.WIDTH, bomberConfig.canvas.HEIGHT);
            });
            it("�������ȫ������", function () {
                spyOn(layer.P__context, "clearRect");

                layer.clear();

                expect(layer.P__context.clearRect).toHaveBeenCalledWith(0, 0, bomberConfig.canvas.WIDTH, bomberConfig.canvas.HEIGHT);
            });
        });

        describe("run", function () {
            function setStateNormal() {
                layer.setStateNormal();
            };
            function setStateChange() {
                layer.setStateChange();
            };

            it("���P__stateΪnormal���򷵻�", function () {
                setStateNormal();
                spyOn(layer, "clear");

                layer.run();

                expect(layer.clear).not.toHaveBeenCalled();
            });

            describe("���P__stateΪchange", function () {
                beforeEach(function () {
                    setStateChange();
                });

                it("����clear", function () {
                    spyOn(layer, "clear");

                    layer.run();

                    expect(layer.clear).toHaveBeenCalled();
                });
                it("����draw", function () {
                    spyOn(layer, "draw");

                    layer.run();

                    expect(layer.draw).toHaveBeenCalled();
                });
            });
        });
    });
});