//Array.prototype.remove = function (obj) {
//    var index = this.indexOf(function (e) {
//        console.log(e);
//        return YE.Tool.judge.isEqual(e, obj);
//    });
//    console.log("index = ", index);

//    this.splice(index, 1);
//};


describe("jsExtend.js", function () {
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("Array", function () {
        describe("indexOf", function () {
            it("返回满足条件的元素的位置", function () {
                var result = [
                    { type: "a", num: 1 },
                    { type: "b", num: 2 }
                ];

                var index = result.indexOf(function (value, index) {
                    if (value.type == "b") {
                        return index;
                    }
                    else {
                        return false;
                    }
                });

                expect(index).toEqual(1);
            });
        });

        describe("remove", function () {
            it("删除数组中调用func返回true的第1个元素。参数为：判断函数func（func的this指向数组）", function () {
                var arr = [1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 1, y: { a: 1 }, z: 2 }];

                arr.remove(function (e) {
                    return e.x === 1;
                });

                expect(arr).toEqual([1, 2,{ x: 1, y: { a: 1 }, z: 2 }]);
            });
            it("如果数组中所有元素调用func返回false，则不删除元素", function () {
                var arr = [1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 2, y: { a: 1 }, z: 2 }];

                arr.remove(function (e, obj) {
                    return e.x === 3;
                });

                expect(arr).toEqual([1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 2, y: { a: 1 }, z: 2 }]);
            });
            it("删除成功返回true，失败返回false", function () {
                var arr = [1, 2];

                expect(arr.remove(function (e) {
                    return e === 1;
                })).toBeTruthy();
                expect(arr.remove(function (e) {
                    return e === 3;
                })).toBeFalsy();
            });
        });

//        describe("removeAll", function () {
//            it("删除数组中调用func返回true的所有元素。参数为：判断函数func（func的this指向数组）", function () {
//                var arr = [1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 1, y: { a: 1 }, z: 2 }];
//
//                arr.removeAll(function (e) {
//                    return e.x === 1;
//                });
//
//                expect(arr).toEqual([1, 2]);
//            });
////            it("如果数组中所有元素调用func返回false，则不删除元素", function () {
////                var arr = [1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 2, y: { a: 1 }, z: 2 }];
////
////                arr.remove(function (e, obj) {
////                    return e.x === 3;
////                });
////
////                expect(arr).toEqual([1, 2, { x: 1, y: { a: 1 }, z: 1 }, { x: 2, y: { a: 1 }, z: 2 }]);
////            });
////            it("删除成功返回true，失败返回false", function () {
////                var arr = [1, 2];
////
////                expect(arr.remove(function (e) {
////                    return e === 1;
////                })).toBeTruthy();
////                expect(arr.remove(function (e) {
////                    return e === 3;
////                })).toBeFalsy();
////            });
//        });

        describe("map", function () {
            beforeEach(function () {
            });
            afterEach(function () {
            });

            it("调用数组内每个元素的指定方法", function () {
                var fakeElement1 = sandbox.createSpyObj("judge"),
                    fakeElement2 = sandbox.createSpyObj("judge");
                var arr = [fakeElement1, fakeElement2];

                arr.map("judge");

                expect(fakeElement1.judge.calledOnce).toBeTruthy();
                expect(fakeElement2.judge.calledOnce).toBeTruthy();
            });
            it("如果元素为null，则跳过", function () {
                var fakeElement1 = null,
                    fakeElement2 = sandbox.createSpyObj("judge");
                var arr = [fakeElement1, fakeElement2];

                arr.map("judge");

                expect(fakeElement2.judge.calledOnce).toBeTruthy();
            });
            it("如果元素没有该指定方法，则跳过", function () {
                var fakeElement1 = sandbox.createSpyObj("show"),
                    fakeElement2 = sandbox.createSpyObj("judge");
                var arr = [fakeElement1, fakeElement2];

                arr.map("judge");

                expect(fakeElement1.show.called).toBeFalsy();
                expect(fakeElement2.judge.calledOnce).toBeTruthy();
            });
            it("可传入指定参数", function () {
                var fakeElement1 = sandbox.createSpyObj("judge"),
                    fakeElement2 = sandbox.createSpyObj("judge");
                var arr = [fakeElement1, fakeElement2];

                arr.map("judge", [1, 2]);

                expect(fakeElement1.judge.calledWith(1, 2)).toBeTruthy();
                expect(fakeElement2.judge.calledWith(1, 2)).toBeTruthy();
            });
            it("方法的this指向元素", function () {
                var fakeElement1 = {
                    a: 1,
                    judge: function () {
                        this.a = 2;
                    }
                };
                var arr = [fakeElement1];

                arr.map("judge", null);

                expect(fakeElement1.a).toEqual(2);
            });
        });

        describe("contain，判断数组是否包含元素", function () {
            beforeEach(function () {
            });
            afterEach(function () {
            });

            it("如果参数为function", function () {
                var arr = [1, 2];

                expect(arr.contain(function (val) {
                    return val === 2;
                })).toBeTruthy();
                expect(arr.contain(function (val) {
                    return val === 3;
                })).toBeFalsy();
            });
            it("如果参数不是function，则判断数组是否包含该参数", function () {
                var arr = [1, 2, "abc"];

                expect(arr.contain(1)).toBeTruthy();
                expect(arr.contain(3)).toBeFalsy();
                expect(arr.contain("ab")).toBeTruthy();
            });
        });

        describe("forEach", function () {
            it("遍历集合", function () {
                var arr = [1, 2, 3],
                    result = 0,
                    i = 0;

                arr.forEach(function (num, index) {
                    result += num;
                    i += index;
                });

                expect(result).toEqual(6);
                expect(i).toEqual(3);
            });
            it("如果返回$break，则跳出遍历", function () {
                var arr = [1, 2, 3],
                    result = null;

                arr.forEach(function (num) {
                    result = num;
                    return $break;
                });

                expect(result).toEqual(1);
            });
            it("可设置this", function () {
                var t = [1, 2];
                var m = [100, 200];
                var a = 0;
                t.forEach(function (ele, index) {
                    a += this[index];
                }, m);

                expect(a).toEqual(300);
            });
        });

    });
});