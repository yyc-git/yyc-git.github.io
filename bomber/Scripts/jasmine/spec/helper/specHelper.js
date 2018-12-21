beforeEach(function () {
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
        //�ж��Ƿ�ΪjQuery����
        toBejQuery: function () {
            if (!jQuery) {
                throw new Error("jQueryδ���壡");
            }

            return this.actual instanceof jQuery;
        },
        //�ж��Ƿ�Ϊcanvas����
        toBeCanvas: function () {
            return Object.prototype.toString.call(this.actual) === "[object HTMLCanvasElement]";
        },
        toBeInstanceOf: function (expected) {
            return this.actual instanceof expected;
        },
        //�ж��Ƿ�Ϊͬһ�����飨����ͬһ�����飩
        toBeSameArray: function (expected) {
            return this.actual === expected;
        },
        toBeExist: function () {
            return this.actual !== undefined && this.actual !== null;
        },
        //jasmine��ԭ������toBeFalsy�����⣺
        //expect(undefined).toBeFalsy();    //ͨ����
        //�������ҵķ�������ԭ������
        toBeFalsy: function () {
            return this.actual === false;
        }
    });
});
