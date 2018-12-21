/*
 ���Ը�������
 01-24
 */

var testTool = (function () {
    var isString = function (str) {
        return Object.prototype.toString.call(str) === "[object String]";
    };

    return {
        bind: function (object, fun) {
            return function () {
                return fun.apply(object, arguments);
            };
        },
        /*
         ע��bindWithArguments��bind���������Ǵ��Ĳ�����һ����

         ʾ����

         var func = bind(this, A);
         func("a");  //��func�Ĳ���"a"����A

         var func = bindWithArguments(this, A, "b");
         func(); //��"b"����A
         */
        bindWithArguments: function (object, fun, args) {
            var _args = null;
            var self = this;

            _args = Array.prototype.slice.call(arguments, 2);

            return function () {
                return fun.apply(object, _args);
            }
        },
        jqueryToString: function (jq) {
            var d = $("<div>");

            d.html(jq);

            return d.html();
        },
        extend: function (destination, source) {
            for (var property in source) {
                destination[property] = source[property];
            }
            return destination;
        },
        extendDeep: function (parent, child) {
            var i,
                toStr = Object.prototype.toString,
                sArr = "[object Array]",
                sOb = "[object Object]",
                type = "",
                child = null;

            if (toStr.call(parent) === sArr) {
                child = child || [];
            }
            else if (toStr.call(parent) === sOb) {
                child = child || {};
            }
            else {
                child = child;
            }


            for (i in parent) {
                type = toStr.call(parent[i]);
                if (type === sArr || type === sOb) {    //���Ϊ�����object����
                    child[i] = type === sArr ? [] : {};
                    this.extendDeep(parent[i], child[i]);
                } else {
                    child[i] = parent[i];
                }
            }
            return child;
        },
        deleteAttribute: function (attr) {
            //��Ϊie��ʹ��delete��bug��������ָ��Ϊundefined�����棺
            //ie�У���ie8��ʹ��deleteɾ��ȫ�����ԣ��硰window.foo = 1;���е�foo����
            //���׳����󣺡�����֧�ִ˲�������
            attr = undefined;
        },
        //��obj[funcName]�滻Ϊ�պ��������ӣ��Ӷ��ﵽ��ִ�иú�����Ŀ�ġ�
        toBeEmptyFuncAndSpy: function (obj, funcName) {
            if (!isString(funcName)) {
                throw new Error("�ڶ�����������Ϊ������");
            }

            spyOn(obj, funcName).andCallFake(function () {
            });
        },
        //�첽ִ��func�������첽����Ԥ����ͼƬ�ɹ������onload���ԡ�ajax�ص����Եȣ���
        asynRun: function (func, time) {
            var flag = false,
                timer = 0;

            runs(function () {
                timer = setTimeout(function () {
                    flag = true;
                }, time);
            });

            waitsFor(function () {
                return flag;
            }, "��ָ��ʱ����δִ��", time + 500);

            runs(function () {
                clearTimeout(timer);
                func();
            });
        }
    }
}());