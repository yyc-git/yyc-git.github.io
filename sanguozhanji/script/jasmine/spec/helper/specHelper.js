beforeEach(function () {
    function _isSpyed(method) {
        return !!method.mostRecentCall;
    }

    this.addMatchers({
        toBeFunction: function () {
            return Object.prototype.toString.call(this.actual, null) === "[object Function]";
        },
        toBeString: function () {
            return Object.prototype.toString.call(this.actual, null) === "[object String]";
        },
        toBeArray: function () {
            return Object.prototype.toString.call(this.actual, null) === "[object Array]";
        },
        toBeNumber: function () {
            return Object.prototype.toString.call(this.actual, null) === "[object Number]";
        },
        toBeSame: function (expected) {
            return this.actual === expected;
        },
        //判断是否为jQuery对象
        toBejQuery: function () {
            if (!jQuery) {
                throw new Error("jQuery未定义！");
            }

            return this.actual instanceof jQuery;
        },
        //判断是否为canvas对象
        toBeCanvas: function () {
            return Object.prototype.toString.call(this.actual) === "[object HTMLCanvasElement]";
        },
        toBeInstanceOf: function (expected) {
            return this.actual instanceof expected;
        },
        //判断是否为同一个数组（引用同一个数组）
        toBeSameArray: function (expected) {
            return this.actual === expected;
        },
        toBeExist: function () {
            return this.actual !== undefined && this.actual !== null;
        },
        //jasmine的原生方法toBeFalsy有问题：
        //expect(undefined).toBeFalsy();    //通过！
        //所以用我的方法覆盖原方法。
        toBeFalsy: function () {
            return this.actual === false;
        },
//        //包含字符串
//        toContain: function (expected) {
//            var reg = new RegExp(expected);
//
//            if (this.actual.match(reg)) {
//                return true;
//            }
//            else {
//                return false;
//            }
//        },
        /**
         * judge whether both type is equal(recursion)

         expect({a: 1, b: {c: ""}}).toTypeEqual({a: 2, b:{c: "aaa"}});  //通过

         * @param expected
         * @returns
         */
        toTypeEqual: function (expected) {
            var like = function (expected, actual) {
                var i = null,
                    toStr = Object.prototype.toString,
                    sArr = "[object Array]",
                    sOb = "[object Object]",
                    type = null;

                for (i in expected) {
                    if (expected.hasOwnProperty(i)) {
                        type = toStr.call(expected[i]);

                        if (type !== toStr.call(actual[i])) {
                            return false;
                        }

                        if (type === sArr || type === sOb) {
                            if (!arguments.callee(expected[i], actual[i])) {
                                return false;
                            }
                        }
                    }
                }

                return true;
            }

            return like(expected, this.actual);
        },
        /**
         * 判断是否进行了断言
         * 用法：expect(function(){xxx}).toAssert();
         * @param expected
         * @returns {boolean}
         */
        toAssert: function (expected) {
            if (!_isSpyed(YE.assert)) {
                spyOn(YE, "assert");
            }

            this.actual();

            if (expected) {
                return YE.assert.wasCalled === true
                    && YE.assert.mostRecentCall.args[0] === false
                    && YE.assert.mostRecentCall.args[1] === expected;
            }

            return YE.assert.wasCalled === true && YE.assert.mostRecentCall.args[0] === false;
        }
    });
});





