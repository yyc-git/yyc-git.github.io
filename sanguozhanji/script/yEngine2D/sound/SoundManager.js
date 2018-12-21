/**YEngine2D
 * 作者：YYC
 * 日期：2014-05-17
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    YE.SoundManager = YYC.Class(YE.Entity, {
        Init: function () {
            this.base();
        },
        Private: {
            ye_counter: 0
        },
        Public: {
            play: function (soundId) {
                var sound = YE.SoundLoader.getInstance().get(soundId),
                    audioObject = null;

                if (!sound || sound.length === 0) {
                    return YE.returnForTest;
                }

                if (this.ye_counter >= sound.length) {
                    this.ye_counter = 0;
                }

                audioObject = sound[this.ye_counter];
                this.ye_counter++;
                audioObject.play();
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