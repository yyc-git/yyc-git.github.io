/**YEngine2D 精灵动画帧管理类
 * 作者：YYC
 * 日期：2014-04-20
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.AnimationFrameManager = YYC.Class(YE.Entity, {
    Init: function () {
//        this.ye_actionManager = actionManager;
        this.ye_animationFrame = YE.AnimationFrame.create();
//        this.ye_anims = YE.AnimationFrame.create();
    },
    Private: {
//        ye_actionManager: null,
//        ye_recentAnim: null,
        ye_animationFrame: null

//        ye_setAnimSize: function (spriteData, anim) {
//            var animSize = anim.getAnimSize();
//
//            spriteData[2] = spriteData[2] === undefined ? animSize.width : spriteData[2];
//            spriteData[3] = spriteData[3] === undefined ? animSize.height : spriteData[3];
//        }
    },
    Public: {
        initAndReturnAnim: function (animName) {
            var anim = null;

            if (YE.Tool.judge.isString(arguments[0])) {
                anim = this.getAnim(arguments[0]);
            }
            else {
                anim = arguments[0];
            }

////            //AnimationCache->createAnim中将动画json数据中的width、height（显示大小）保存到动画cacheData中，
////            //此处将spriteData数据（精灵坐标、精灵动画指定显示大小（Sprite->runAnim中指定的动画数据））合并到动画cacheData中
////            //从而在Sprite->ye___drawAnims中调用anim.getCacheData()时，获得动画的精灵坐标、精灵动画指定显示大小
//            this.ye_setAnimSize(spriteData, anim);
//            anim.setCacheData("animData", spriteData);

            anim.start();
//            this.ye_recentAnim = anim;

            return anim;
        },
//        removeAnim: function (animName) {
//            var anim = this.getAnim(animName);
//
//            this.ye_actionManager.removeAction(anim);
//        },
//        removeRecentAnim: function () {
//            this.ye_actionManager.removeAction(this.ye_recentAnim);
//        },
//        removeAll: function () {
//            this.ye_actionManager.removeAll();
//        },
        stopAnim: function (animName) {
            this.getAnim(animName).stop();
        },
        startAnim: function (animName) {
            this.getAnim(animName).start();
        },
        getAnim: function (animName) {
            return this.ye_animationFrame.getAnim(animName);
        },
        getAnims: function () {
            return this.ye_animationFrame.getAnims();
        },
        addAnim: function (animName, anim) {
            anim.setTag(animName);
            this.ye_animationFrame.addAnim(animName, anim);
        },
        resetAnim: function (animName) {
            this.getAnim(animName).reset();
        }
    },
    Static: {
        create: function () {
            return new this();
        }
    }
});
