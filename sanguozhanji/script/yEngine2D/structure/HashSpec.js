/**YEngine2D
 * 作者：YYC
 * 日期：2013-12-28
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("Hash.js", function () {
    var hash = null;
    var sandbox = null;

    //因为Hash为抽象类，因此不能直接实例化，而是通过获得子类的实例。
    function getInstance() {
        return YE.Hash.create();
    }

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        hash = getInstance();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("getChilds", function () {
        it("获得容器", function () {
            hash.add("a1", 1);
            var childs = hash.getChilds();

            expect(childs).toBeSameArray(hash.ye_childs);
            expect(childs.a1).toEqual(1);
        });
    });

    describe("getValue", function () {
        it("根据key获得value", function () {
            hash.ye_childs = {"a1": 1};
            var value = hash.getValue("a1");

            expect(value).toEqual(1);
        });
    });

    describe("add", function () {
        it("加入到容器中，参数为：key，value", function () {
            var value1 = null,
                value2 = null;

            hash.add("a1", "1").add("a2", 2);
            value1 = hash.getValue("a1");
            value2 = hash.getValue("a2");

            expect([value1, value2]).toEqual(["1", 2]);
        });
        it("如果容器中已有键为key的值了，则覆盖该key", function () {
            var value1 = null;

            hash.add("a1", "1");
            hash.add("a1", 2);
            value = hash.getValue("a1");

            expect(value).toEqual(2);
        });
    });

    describe("append", function () {
        it("如果容器中没有键为key的值，则将该key的值设为数组并加入", function () {
            var value = null;

            hash.append("a1", "1");
            value = hash.getValue("a1");

            expect(value).toEqual(["1"]);
        });
        it("否则，则将该key的值加入到数组最后", function () {
            var value = null;

            hash.append("a1", "1");
            hash.append("a1", "2");
            value = hash.getValue("a1");

            expect(value).toEqual(["1", "2"]);
        });
    });


    describe("remove", function () {
        it("从容器中删除元素", function () {
            hash.add("a", {});

            hash.remove("a");

            expect(hash.getValue("a")).toBeUndefined();
        });
    });

//    describe("iterate", function () {
//        var sprite1 = null,
//            sprite2 = null;
//
//        beforeEach(function () {
//            sprite1 = sandbox.createSpyObj("clear");
//            sprite2 = sandbox.createSpyObj("clear");
//            hash.add("a", sprite1);
//            hash.add("b", sprite2);
//        });
//
//        it("迭代调用集合内元素的方法", function () {
//            hash.iterate("clear", 1, 2);
//
//            expect(sprite1.clear.calledWith(1,2)).toBeTruthy();
//            expect(sprite2.clear.calledWith(1,2)).toBeTruthy();
//        });
//    });

    describe("forEach", function () {
        it("遍历容器", function () {
            var a = 0;
            var b = "";
            hash.add("a",1);
            hash.add("b",2);

            hash.forEach(function (val, key) {
                a += val;
                b += key;
            });

            expect(a).toEqual(3);
            expect(b).toEqual("ab");
        });
        it("如果返回$break，则跳出遍历", function () {
            var a = 0;
            hash.add("a",1);
            hash.add("b",2);

            hash.forEach(function (val, key) {
                a += val;
                return $break;
            });

            expect(a).toEqual(1);
        });
        it("可设置this", function () {
            var t = [1, 2];
            var a = 0;
            hash.add("0",100);
            hash.add("1",200);

            hash.forEach(function (val, key) {
                a += this[key];
            }, t);

            expect(a).toEqual(3);
        });
    });

    describe("map", function () {
        it("遍历容器", function () {
            var sprite1 = sandbox.createSpyObj("clear"),
                sprite2 = sandbox.createSpyObj("clear");
            hash.add("a",sprite1);
            hash.add("b",sprite2);

            hash.map("clear", [1, 2]);

            expect(sprite1.clear.calledWith(1, 2)).toBeTruthy();
            expect(sprite2.clear.calledWith(1, 2)).toBeTruthy();
        });
        it("方法的this指向元素", function () {
            var fakeElement1 = {
                a: 1,
                judge: function () {
                    this.a = 2;
                }
            };
            hash.add("a",fakeElement1);

            hash.map("judge", null);

            expect(fakeElement1.a).toEqual(2);
        });
    });
});