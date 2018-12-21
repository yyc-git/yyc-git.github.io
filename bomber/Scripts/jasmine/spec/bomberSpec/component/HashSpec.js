describe("Hash.js", function () {
    var hash = null;

    //��ΪHashΪ�����࣬��˲���ֱ��ʵ����������ͨ����������ʵ����
    function getInstance() {
        var T = YYC.Class(Hash, {});

        return new T();
    };

    beforeEach(function () {
        hash = getInstance();
    });
    afterEach(function () {
    });

    describe("getChilds", function () {
        it("�������", function () {
            hash.add("a1", 1);
            var childs = hash.getChilds();

            expect(childs).toBeSameArray(hash._childs);
            expect(childs.a1).toEqual(1);
        });
    });

    describe("getValue", function () {
        it("����key���value", function () {
            hash._childs = {"a1": 1};
            var value = hash.getValue("a1");

            expect(value).toEqual(1);
        });
    });

    describe("add", function () {
        it("���뵽�����У�����Ϊ��key��value", function () {
            var value1 = null,
                value2 = null;

            hash.add("a1", "1").add("a2", 2);
            value1 = hash.getValue("a1");
            value2 = hash.getValue("a2");

            expect([value1, value2]).toEqual(["1", 2]);
        });
        it("������������м�Ϊkey��ֵ�ˣ��򸲸Ǹ�key", function () {
            var value1 = null;

            hash.add("a1", "1");
            hash.add("a1", 2);
            value = hash.getValue("a1");

            expect(value).toEqual(2);
        });
    });
});