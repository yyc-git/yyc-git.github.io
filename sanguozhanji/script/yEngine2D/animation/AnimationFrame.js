/**YEngine2D 精灵动画帧类
 * 存储精灵所有的动画帧信息，它为hash结构，元素为Animation
 *
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    YE.AnimationFrame = YYC.Class(YE.Entity, {
        Init: function () {
            this.base();

            this.ye_spriteFrames = YE.Hash.create();
        },
        Private: {
            ye_spriteFrames: null
        },
        Public: {
            getAnims: function () {
                return this.ye_spriteFrames.getChilds();
            },
            getAnim: function (animName) {
                return this.ye_spriteFrames.getValue(animName);
            },
            addAnim: function (animName, anim) {
//                YE.assert(this.ye_spriteFrames[animName] === undefined, "该动画已存在");
                this.ye_spriteFrames.add(animName, anim);
            }
        },
        Static: {
            create: function () {
                return new this();
            }
        }
    });
}());