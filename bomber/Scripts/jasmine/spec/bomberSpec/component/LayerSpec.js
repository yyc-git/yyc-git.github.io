describe("Layer.js", function () {
    var layer = null;

    //��ΪLayerΪ�����࣬��˲���ֱ��ʵ����������ͨ����������ʵ����
    function getInstance() {
        var T = YYC.Class(Layer, {
            Init: function () {
            },
            Public: {
                change: function () {
                },
                setCanvas: function () {
                },
                draw: function () {
                },
                run: function () {
                }
            }
        });

        return new T();
    };

    beforeEach(function () {
        layer = getInstance();
    });

    describe("Init", function () {
    });

    describe("addSprites", function () {
        it("���ø���appendChilds", function () {
            spyOn(layer, "appendChilds");
            var fakeElements = [];

            layer.addSprites(fakeElements);

            expect(layer.appendChilds).toHaveBeenCalledWith(fakeElements);
        });
    });

    describe("init", function () {
        function getFakeCanvas(layer) {
            layer.P__canvas = {
                getContext: function () {
                    return {};
                }
            }
        };

        it("���context", function () {
            getFakeCanvas(layer);

            layer.init();

            expect(layer.P__context).toBeExist();
        });
    });

    describe("clear", function () {
        var sprite1 = null,
            sprite2 = null;

        beforeEach(function () {
            sprite1 = {
                clear: function () {
                }
            };
            sprite2 = {
                clear: function () {
                }
            };
            layer.appendChild(sprite1);
            layer.appendChild(sprite2);
        });

        describe("�������أ�����Ϊ0��", function () {
            it("����ÿ���������clear���������context", function () {
                spyOn(sprite1, "clear");
                spyOn(sprite2, "clear");
                layer.clear();

                expect(sprite1.clear).toHaveBeenCalledWith(layer.P__context);
                expect(sprite2.clear).toHaveBeenCalledWith(layer.P__context);
            });
        });

        describe("�������أ�����Ϊ1��", function () {
            it("���þ������clear���������P__context", function () {
                spyOn(sprite1, "clear");
                layer.clear(sprite1);

                expect(sprite1.clear).toHaveBeenCalledWith(layer.P__context);
            });
        });
    });
});