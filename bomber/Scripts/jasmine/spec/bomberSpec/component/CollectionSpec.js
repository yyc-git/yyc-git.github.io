describe("Collection.js", function () {
    var collection = null;

    //��ΪCollectionΪ�����࣬��˲���ֱ��ʵ����������ͨ����������ʵ����
    function getInstance() {
        var T = YYC.Class(Collection, {});

        return new T();
    };

    beforeEach(function () {
        collection = getInstance();
    });
    afterEach(function () {
    });

    describe("getChilds", function () {
        it("��������ĸ���", function () {
            var childs = collection.getChilds();

            expect(childs).not.toBeSameArray(collection._childs);
        });
    });

    describe("getChildAt", function () {
        it("�������ָ��λ�õ�����", function () {
            collection._childs = [1, 2];
            var child = collection.getChildAt(1);

            expect(child).toEqual(2);
        });
    });

    describe("appendChild", function () {
        it("���뵽������ĩβ", function () {
            var childs = null;

            collection.appendChild(1).appendChild(2);

            childs = collection.getChilds();

            expect(childs).toEqual([1, 2]);
        });
    });

    describe("appendChilds", function () {
        it("��������Ԫ��", function () {
            var fakeElement = [1, 2];

            collection.appendChilds(fakeElement);

            expect(collection.getChilds()).toEqual(fakeElement);
        });
    });

    describe("remove", function () {
        it("ɾ�������е���func����true��Ԫ�ء�", function () {
            var child = {
                x: 1,
                y: 1
            };
            collection.appendChild(child);

            collection.remove(function (e, obj) {
                if (e.x === obj.x && e.y === obj.y) {
                    return true;
                }
                return false;
            }, {
                x: 1,
                y: 1
            });

            expect(collection.getChilds().length).toEqual(0);
        });
    });

    describe("removeAll", function () {
        it("�������", function () {
            collection.appendChild(1).appendChild(2);

            collection.removeAll();

            expect(collection.getChilds().length).toEqual(0);
        });
    });

    describe("hasNext", function () {
        it("û�е���β�����򷵻�true", function () {
            collection.appendChild(1);

            expect(collection.hasNext()).toBeTruthy();
        });
        it("�Ѿ�����β�����򷵻�false", function () {
            expect(collection.hasNext()).toBeFalsy();
        });
    });

    describe("next", function () {
        it("û�е���β�����򷵻���һ��Ԫ��,�����α�ָ����һ��Ԫ��", function () {
            collection.appendChild(1);

            expect(collection.next()).toEqual(1);
            expect(collection.hasNext()).toBeFalsy();
        });
        it("�Ѿ�����β�����򷵻�null", function () {
            expect(collection.next()).toBeNull();
        });
    });

    describe("resetCursor", function () {
        it("�����α�Ϊ0", function () {
            collection.appendChild(1);

            collection.next();
            collection.resetCursor();

            expect(collection.hasNext()).toBeTruthy();
        });
    });
});