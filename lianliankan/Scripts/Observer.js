/* ��չArray������forEach��filter���� */
(function () {
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fn, thisObj) {
            var scope = thisObj || window;
            for (var i = 0, j = this.length; i < j; ++i) {
                fn.call(scope, this[i], i, this);
            }
        };
    }

    if (!Array.prototype.filter) {
        Array.prototype.filter = function (fn, thisObj) {
            var scope = thisObj || window;
            var a = [];
            for (var i = 0, j = this.length; i < j; ++i) {
                if (!fn.call(scope, this[i], i, this)) {
                    continue;
                }
                a.push(this[i]);
            }
            return a;
        };
    }
})();



/*  
Ӧ�ù۲���ģʽ������Observer�ࡣ

9-22

******************************************************************************************

���÷�ʽ��

var ob = new Observer();
var f1 = function (data) { console.log('Robbin: ' + data + ', �Ͻ��ɻ��ˣ�'); };
var f2 = function (data) { console.log('Randall: ' + data + ', �����ӵ㹤��ȥ��'); };

ob.Subscribe(f1);
ob.Subscribe(f2);
ob.PublishAll(null, "�ϰ�����");
ob.UnSubscribe(f1);
ob.Publish(f2, null, "���³�����");
ob.Dispose();

******************************************************************************************

*/

function Observer() {
    this.events = [];
}

Observer.prototype = (function () {
    //    var _context = null;
    return {
        /*
        ���ķ���

        �����ڶ���ʱָ��context���磺
        subject.Subject_Setting_Name.Subscribe(LianLianKan.Operate_Single, LianLianKan.Operate_Single.SetName);
        */
        Subscribe: function (fn) {
            //            console.log(fn);
            if (arguments.length == 2) {
                //                _context = arguments[1];
                this.events.push({ context: arguments[0], fn: arguments[1] });
            }
            else {
                this.events.push(fn);
            }
        },
        //����ָ������
        Publish: function (fn, context, args) {
            var args = Array.prototype.slice.call(arguments, 2);    //��ú�������
            var _context = null;
            var _fn = null;

            //            if (context) {
            this.events.filter(function (el) {
                if (el.context) {
                    _context = el.context;
                    _fn = el.fn;
                }
                else {
                    _context = context;
                    _fn = el;
                }

                if (_fn === fn) {
                    return _fn;
                }
            }).forEach(function (el) {  //ָ�����������ж��
                el.apply(_context, args);       //ִ��ÿ��ָ���ķ���
            });
            //            }
            //            else {
            //                this.events.filter(function (el) {
            //                    if (el === fn) {
            //                        return el;
            //                    }
            //                }).forEach(function (el) {  //ָ�����������ж��
            //                    el.apply(args);       //ִ��ÿ��ָ���ķ���
            //                });
            //            }
        },
        UnSubscribe: function (fn) {
            var _fn = null;
            this.events = this.events.filter(function (el) {
                if (el.fn) {
                    _fn = el.fn;
                }
                else {
                    _fn = el;
                }

                if (_fn !== fn) {
                    return el;
                }
            });
        },
        //ȫ������
        PublishAll: function (context, args) {
            var args = Array.prototype.slice.call(arguments, 1);    //��ú�������
            var _context = null;
            var _fn = null;
            //            if (context) {


            this.events.forEach(function (el) {
                if (el.context) {
                    _context = el.context;
                    _fn = el.fn;
                }
                else {
                    _context = context;
                    _fn = el;
                }

                _fn.apply(_context, args);       //ִ��ÿ��ָ���ķ���
            });


            //            }
            //            else {
            //                this.events.forEach(function (el) {
            //                    el.apply(args);       //ִ��ÿ��ָ���ķ���
            //                });
            //            }
        },
        Dispose: function () {
            this.events = [];
        },
        /* 
        ʾ����
        var obsCheck1 = document.createElement('input');
        obsCheck1.type = 'checkbox';
        obsCheck1.id = 'Obs1';
        implement( obsCheck1,new Observer());
        */
        Make: function (o, observer) {
            //            //oΪ�ࡣ
            //            //ʹo�̳�Observer��ʹ��o���ж��ġ������ȷ���
            //            if (operate.IsFunction(o)) {

            //                        o.prototype = new Observer();
            //            }
            for (var prop in observer) {
                o[prop] = observer[prop];
            }
        }
    }
})();


