/**三国战记
 * 作者：YYC
 * 日期：2014-10-08
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var EnemySprite = YYC.Class(Sprite, {
    Private: {
        __prepareAnim: function () {
            var self = this,
                animNameArr = ["stand", "fall", "hurt"];

            animNameArr.forEach(function (animName) {
                self.__initAnim(animName);
            });
        },
        __initAnim: function (animName) {
            var animationFrameManager = this.getAnimationFrameManager(),
                cache = YE.AnimationCache.getInstance();

            //此处只有1个精灵使用动画，因此直接获得动画。
            //如果有多个精灵使用同一个动画，则每个精灵获得该动画副本，从而防止互相干扰。

            animationFrameManager.addAnim(animName + "_0", cache.getAnim(this.name + "_" + animName + "_0"));
            animationFrameManager.addAnim(animName + "_1", cache.getAnim(this.name + "_" + animName + "_1"));
        },
        __limitPos: function () {
            var pos = null;

            pos = this.P_getPosInRange(this.getPositionX(), this.getPositionY());

            this.setPosition(pos[0], pos[1]);
        },
        __runStandAction: function () {
            this.runOnlyOneAction(this.getAnimationFrameManager().getAnim("stand_" + this.getAnimDirection()));
        }
    },
    Public: {
        name: "xiahouyuan",
        team: "enemy",
        direction: 0,
        hitCount: 0,
        canBeAttack: true,

        runHurtAction: function () {
            this.canBeAttack = true;

            this.runOnlyOneAction(
                YE.Sequence.create(
                    this.getAnimationFrameManager().getAnim("hurt_" + this.getAnimDirection()),
                    YE.CallFunc.create(this, function () {
                        this.getAnimationFrameManager().getAnim("hurt_" + this.getAnimDirection()).reset();
                        this.__runStandAction();
                    }))
            );
        },
        runFallAction: function () {
            this.canBeAttack = false;

            this.runOnlyOneAction(YE.MoveBy.create(this.fallMoveTime, this.fallMoveDisX, this.fallMoveDisY));

            this.runAction(
                YE.Sequence.create(
                    this.getAnimationFrameManager().getAnim("fall_" + this.getAnimDirection()),
                    YE.CallFunc.create(this, function () {
                        this.canBeAttack = true;
                        this.getAnimationFrameManager().getAnim("fall_" + this.getAnimDirection()).reset();
                        this.__runStandAction();
                    }))
            );
        },
        getAnimDirection: function () {
            var animDirection = 0;

            switch (this.direction) {
                case 1:
                    animDirection = 0;
                    break;
                case 3:
                    animDirection = 1;
                    break;
                default :
                    throw new Error("方向错误");
                    break;
            }

            return animDirection;
        },
        onenter: function () {
            this.__prepareAnim();

            this.direction = 1;

            this.__runStandAction();
        },
        onbeforeDraw: function () {
            this.__limitPos();
        }
    },
    Static: {
        create: function (data) {
            var sprite = null;

            sprite = new this();
            sprite.initWhenCreate(data);

            return sprite;
        }
    }
});