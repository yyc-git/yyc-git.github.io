describe("findPath.js", function () {

    describe("A*�Ľ��㷨����aCompute", function () {

        describe("�����Ѱ�ҵ�·��", function () {
            it("���ص�pathΪѰ�ҵ�·������ά���飩��timeΪ�㷨ʱ��", function () {
                var fakeTerrainData = [
                        [0, 0, 0, 0],
                        [0, 1, 0, 0],
                        [0, 1, 1, 0],
                        [0, 0, 0, 0]
                    ],
                    begin = { x: 0, y: 0 },
                    end = { x: 2, y: 3 },
                    result = null;

                result = findPath.aCompute(fakeTerrainData, begin, end);

                expect(result.path).toEqual([
                    { x: 0, y: 1 },
                    { x: 0, y: 2 },
                    { x: 0, y: 3 },
                    { x: 1, y: 3 },
                    { x: 2, y: 3 }
                ]);
                expect(result.time).toBeNumber();

            });
        });

        describe("��������ҵ�·��", function () {
        });

        describe("bug����", function () {
        });
    });
});