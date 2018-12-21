/**YEngine2D
 * 作者：YYC
 * 日期：2014-05-17
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    YE.SoundLoader = YYC.Class(YE.Loader, {
        Init: function () {
            this.base();
        },
        Protected: {
            ye_P_load: function (urlArr, key) {
                var self = this;

                YE.YSoundEngine.create({
                    url: urlArr,
                    onload: function () {
                        YE.LoaderManager.getInstance().onResLoaded();
                        self.ye_P_container.append(key, this);
                    },
                    onerror: function (code) {
                        YE.LoaderManager.getInstance().onResError(urlArr, "错误原因：code" + code);
                    }
                });
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