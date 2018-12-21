describe("LayerManager.js", function () {
    var manager = null;

    beforeEach(function () {
        manager = new LayerManager();
    });
    afterEach(function () {
        manager = null;
    });

    describe("addLayer", function () {
        it("���ø����add", function () {
            var fakeLayer = {};
            spyOn(manager, "add");

            manager.addLayer("layer1", fakeLayer).addLayer("layer2", fakeLayer);

            expect(manager.add.calls.length).toEqual(2);
        });
    });

    describe("getLayer", function () {
        it("���ø����getValue", function () {
            spyOn(manager, "getValue");

            manager.getLayer("layer");

            expect(manager.getValue).toHaveBeenCalledWith("layer");
        });
    });

    describe("ͳһ���ò�Ĳ���", function () {
        var layer1 = null,
            layer2 = null;

        function buildFakeLayer() {
            return {
                addSprites: function () {
                },
                setCanvas: function () {
                },
                init: function () {
                },
                run: function () {
                },
                change: function () {
                }
            }
        };

        beforeEach(function () {
            layer1 = buildFakeLayer();
            layer2 = buildFakeLayer();
            manager.addLayer("layer1", layer1).addLayer("layer2", layer2);
        });

        describe("addSprites", function () {
            it("�������Ԫ�ء�����Ϊ�������ơ�Ԫ�ؼ���", function () {
                var fakeEle1 = [1];

                spyOn(layer1, "addSprites");

                manager.addSprites("layer1", fakeEle1);

                expect(layer1.addSprites).toHaveBeenCalledWith(fakeEle1);
            });
        });

        describe("initLayer", function () {
            it("����ÿ��layer��setCanvas��init����������layers��", function () {
                var fakeLayer1 = {},
                    fakeLayer2 = {};
                spyOn(layer1, "setCanvas");
                spyOn(layer1, "init");
                spyOn(layer2, "setCanvas");
                spyOn(layer2, "init");

                manager.initLayer();

                expect(layer1.setCanvas).toHaveBeenCalled();
                expect(layer1.init).toHaveBeenCalledWith(manager._childs);
                expect(layer2.setCanvas).toHaveBeenCalled();
                expect(layer2.init).toHaveBeenCalledWith(manager._childs);
            });
        });

        describe("run", function () {
            it("����ÿ��layer��run����", function () {
                spyOn(layer1, "run");
                spyOn(layer2, "run");

                manager.run();

                expect(layer1.run).toHaveBeenCalled();
                expect(layer2.run).toHaveBeenCalled();
            });
        });

        describe("change", function () {
            it("����ÿ��layer��change����", function () {
                spyOn(layer1, "change");
                spyOn(layer2, "change");

                manager.change();

                expect(layer1.change).toHaveBeenCalled();
                expect(layer2.change).toHaveBeenCalled();
            });
        });
    });


});
