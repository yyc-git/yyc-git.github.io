describe("bitmapFactory.js", function () {
    beforeEach(function () {
    });
    afterEach(function () {
    });

    describe("createBitmap", function () {
        var dom = null;

        function insertDom() {
            dom = $("<img id='test_img'>");
            $("body").append(dom);
        };
        function removeDom() {
            dom.remove();
        };

        beforeEach(function () {
            insertDom();
        });
        afterEach(function () {
            removeDom();
        });

        it("��������", function () {
            expect(bitmapFactory.createBitmap).toBeDefined();
        });

        it("���������width/heightû��ָ������Ϊdata.img.width/height", function () {
            var bitmap = null,
                width = 0,
                height = 0;

            bitmap = bitmapFactory.createBitmap({ img: $("#test_img")[0] });

            expect(bitmap.width).toEqual($("#test_img")[0].width);
            expect(bitmap.height).toEqual($("#test_img")[0].height);
        });
    });
});