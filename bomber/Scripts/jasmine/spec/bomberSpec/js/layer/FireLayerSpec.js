describe("FireLayer.js", function () {
    var layer = null;

    beforeEach(function () {
        layer = new FireLayer();

        layer.setCanvas();
    });

    describe("setCanvas", function () {
        it("��������", function () {
            expect(layer.setCanvas).toBeDefined();
        });
        it("���FireLayerCanvas", function () {
            spyOn(document, "getElementById");

            layer.setCanvas();

            expect(document.getElementById).toHaveBeenCalledWith("fireLayerCanvas");
        });
        it("����Canvas��css", function () {
            layer.setCanvas();

            var canvas = $(layer.P__canvas);
            var expectedCss = {
                "position": "absolute",
                "top": bomberConfig.canvas.TOP.toString(),
                "left": bomberConfig.canvas.LEFT.toString(),
                "z-index": 2
            };

            expect(canvas.css("top")).toEqual(expectedCss.top);
            expect(canvas.css("left")).toEqual(expectedCss.left);
            expect(Number(canvas.css("z-index"))).toEqual(expectedCss["z-index"]);
        });
    });

    describe("change", function () {
        it("���������Ԫ�أ������setStateChange", function () {
            var fakeFire = {};
            layer.appendChild(fakeFire);
            spyOn(layer, "setStateChange");

            layer.change();

            expect(layer.setStateChange).toHaveBeenCalled();
        });
    });

    describe("���ʼ������õ�API����", function () {
        beforeEach(function () {
            layer.init();
        });

        describe("draw", function () {
            beforeEach(function () {
                sprite1 = spriteFactory.createBomb();
                sprite2 = spriteFactory.createBomb();

                layer.appendChild(sprite1).appendChild(sprite2);
            });

            it("����ÿ���������draw���������context", function () {
                spyOn(sprite1, "draw");
                spyOn(sprite2, "draw");

                layer.draw();

                expect(sprite1.draw).toHaveBeenCalledWith(layer.P__context);
                expect(sprite2.draw).toHaveBeenCalledWith(layer.P__context);
            });
        });

        describe("clear", function () {
            beforeEach(function () {
                sprite1 = spriteFactory.createBomb();
                sprite2 = spriteFactory.createBomb();

                layer.appendChild(sprite1).appendChild(sprite2);
            });

            it("�������ȫ������", function () {
                spyOn(sprite1, "clear");
                spyOn(sprite2, "clear");

                layer.clear();

                expect(sprite1.clear).toHaveBeenCalledWith(layer.P__context);
                expect(sprite2.clear).toHaveBeenCalledWith(layer.P__context);
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
                it("�ָ�״̬stateΪnormal", function () {
                    layer.setStateChange();

                    layer.run();

                    expect(layer.P__isNormal()).toBeTruthy();
                });
            });
        });
    });
});