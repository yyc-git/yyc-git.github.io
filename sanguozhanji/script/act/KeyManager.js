/**三国战记
 * 作者：YYC
 * 日期：2014-09-03
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    window.KeyManager = YYC.Class({
        Init: function () {
            this._keyState = {};
            this._keyListener = [];
        },
        Private: {
            _keyState: null,
            _keyListener: null
        },
        Public: {
            keyDown: function (e) {
                this._keyState[e.keyCode] = true;
                e.preventDefault();
            },
            keyUp: function (e) {
                this._keyState[e.keyCode] = false;
                this._keyListener.push({keyCode: e.keyCode, time: +new Date() / 1000});
                this._keyListener = this._keyListener.slice(-2);
                e.preventDefault();
            },
            getKeyState: function (keyCode) {
                return this._keyState[keyCode];
            },
            getKeyListener: function () {
                return this._keyListener;
            }
        },
        Static: {
            getInstance: function () {
                if (_instance === null) {
                    _instance = new this();
                }
                return _instance;
            }
        }
    });

}());