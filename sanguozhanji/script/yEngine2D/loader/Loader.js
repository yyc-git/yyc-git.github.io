/**YEngine2D Loader基类
 * 作者：YYC
 * 日期：2014-05-17
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    YE.Loader = YYC.AClass(YE.Entity, {
        Init: function () {
            this.base();

            this.ye_P_container = YE.Hash.create();
            this.ye_loadedUrl = YE.Collection.create();
        },
        Private: {
            ye_loadedUrl: null
        },
        Protected: {
            ye_P_container: null   ,

            Abstract: {
                ye_P_load: function () {
                }
            }
        },
        Public: {
            get: function (key) {
                return this.ye_P_container.getValue(key);
            },
            load: function (url, id) {
                var key = id ? id : url;

                if (this.ye_loadedUrl.hasChild(url)) {
                    YE.LoaderManager.getInstance().onResLoaded();
                    return this.get(key);
                }

                this.ye_loadedUrl.addChild(url);

                this.ye_P_load(url, key);
            }
        }
    });
}());