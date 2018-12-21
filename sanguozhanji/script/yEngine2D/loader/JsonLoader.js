/**YEngine2D json文件加载类
 * 作者：YYC
 * 日期：2014-02-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    YE.JsonLoader = YYC.Class(YE.Loader, {
        Init: function () {
            this.base();
        },
        Protected: {
            ye_P_load: function (jsonFilePath, key) {
                var self = this;

                $.ajax({
                    type: "get",
                    async: true,
                    url: jsonFilePath,
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        self.ye_P_container.add(key, data);
                        YE.LoaderManager.getInstance().onResLoaded();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        YE.LoaderManager.getInstance().onResError(jsonFilePath,
                            "readyState:" + XMLHttpRequest.readyState + "\nstatus:" + XMLHttpRequest.status
                                + "\nmessage:" + errorThrown.message
                                + "\nresponseText:" +XMLHttpRequest.responseText);
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