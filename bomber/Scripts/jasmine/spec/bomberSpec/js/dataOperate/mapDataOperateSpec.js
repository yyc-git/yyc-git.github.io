describe("mapDataOperate.js", function () {
    beforeEach(function () {
    });
    afterEach(function () {
    });

    describe("getMapData", function () {
        it("����ֵΪmapData�ĸ���", function () {
            var data = mapDataOperate.getMapData();

            expect(data).not.toBeSameArray(mapData);
            expect(data).toEqual(mapData);
        });
    });
});