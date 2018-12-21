/**三国战记
 * 作者：YYC
 * 日期：2014-09-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    var LevelManager = YYC.Class({
        Private: {
            _resetLevel: function () {
                YE.LoaderManager.getInstance().reset();
            }
        },
        Public: {
            currentLevel: 0,

            start: function () {
                this.currentLevel = 0;

                this.startCurrentLevel();
            },
            getLevelData: function () {
                return  levelData[this.currentLevel];
            },
            startCurrentLevel: function () {
                var loaderManager = YE.LoaderManager.getInstance(),
                    self = this;

                this._resetLevel();

                loaderManager.onloading = function (currentLoad, resCount) {
                    ui.showLoadingMessage("正在加载第" + currentLoad + "/" + resCount + "个资源");
                };
                loaderManager.onload = function () {
                    ui.showLoadingMessage("正在初始化动画");

                    YE.FrameCache.getInstance().addFrameData("zhangfei_json", "zhangfei_image");
                    YE.AnimationCache.getInstance().addAnimWithFile("anim_zhangfei_json");

                    YE.FrameCache.getInstance().addFrameData("xiahouyuan_json", "xiahouyuan_image");
                    YE.AnimationCache.getInstance().addAnimWithFile("anim_xiahouyuan_json");

                    //延迟50ms执行，从而显示加载信息后再执行初始化；
                    setTimeout(function () {
                        self.enterGame();
                    }, 50);
                };

                loaderManager.preload(resourceTable);
            },
            enterGame: function () {
                ui.showGameArea();
                YE.Director.getInstance().runWithScene(new Scene());
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

    window.LevelManager = LevelManager;
}());