describe("main.js", function () {
    var temp = {};

    function backUpShowMap() {
        testTool.extend(temp, main);
    };
    function restoreShowMap() {
        testTool.extend(main, temp);
    };

    beforeEach(function () {
        backUpShowMap();
    });
    afterEach(function () {
        restoreShowMap();
    });

    describe("init", function () {
        beforeEach(function () {
        });
        afterEach(function () {
        });

        describe("init", function () {
            beforeEach(function () {
            });
            afterEach(function () {
            });

            it("Ԥ����ͼƬ", function () {
                var urls = [];
                var temp = [];
                var i = 0, len = 0;
                spyOn(window.YYC.Control, "PreLoadImg");    //����д��spyOn(window, "YYC.Control.PreLoadImg");

                main.init();

                expect(YYC.Control.PreLoadImg).toHaveBeenCalled();
            });
            it("��ʾ������", function () {
            });
        });

        describe("onload", function () {
            it("���ؼ��ؽ�����", function () {
            });
            it("����game.init��game.start", function () {
            });
        });

    });
});
