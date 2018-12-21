/**三国战记
 * 作者：YYC
 * 日期：2014-09-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var ActionState = {
    JUMP: 0,
    JUMPATTACK: 1,
    COMMONATTACK: 2,
    MOVE: 3,
    STAND: 4,
    RUN: 5
};
var PlayerSprite = YYC.Class(Sprite, {
    Private: {
        __keyLock: false,
        __actionState: null,
        __moveX: null,
        //精灵位于空中时（如跳跃）的实际y坐标
        __posYWhileInAir: null,

        __prepareAnim: function () {
            var self = this,
                animNameArr = ["stand", "move", "run", "jump", "jumpAttack", "commonAttack"];

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
        __isMoveXKeyDown: function () {
            var keyCodeMap = YE.Event.KeyCodeMap;

            return window.KeyManager.getInstance().getKeyState(keyCodeMap.D)
                || window.KeyManager.getInstance().getKeyState(keyCodeMap.A);
        },
        __isMoveYKeyDown: function () {
            var keyCodeMap = YE.Event.KeyCodeMap;

            return window.KeyManager.getInstance().getKeyState(keyCodeMap.W)
                || window.KeyManager.getInstance().getKeyState(keyCodeMap.S);
        },
        __isMoveKeyDown: function () {
            return this.__isMoveXKeyDown() || this.__isMoveYKeyDown();
        },
        __isJumpKeyDown: function () {
            var keyCodeMap = YE.Event.KeyCodeMap;

            return window.KeyManager.getInstance().getKeyState(keyCodeMap.SPACE);
        },
        __isAttackKeyDown: function () {
            var keyCodeMap = YE.Event.KeyCodeMap;

            return window.KeyManager.getInstance().getKeyState(keyCodeMap.J);
        },
        __isJumpAttack: function () {
            return this.__actionState === ActionState.JUMP && this.__isAttackKeyDown();
        },
        __isRunKeyDown: function () {
            var keyListener = window.KeyManager.getInstance().getKeyListener();

            return this.__isMoveXKeyDown()
                && keyListener.length > 1
                && keyListener[0].keyCode === keyListener[1].keyCode
                && keyListener[1].time - keyListener[0].time <= this.keyMaxInterval;
        },
        __setDirection: function () {
            var keyCodeMap = YE.Event.KeyCodeMap;

            if (window.KeyManager.getInstance().getKeyState(keyCodeMap.W)) {
                this.direction = 0;
            }
            else if (window.KeyManager.getInstance().getKeyState(keyCodeMap.D)) {
                this.direction = 1;
            }
            else if (window.KeyManager.getInstance().getKeyState(keyCodeMap.S)) {
                this.direction = 2;
            }
            else if (window.KeyManager.getInstance().getKeyState(keyCodeMap.A)) {
                this.direction = 3;
            }
        },
        __runJumpAttackAction: function () {
            this.__keyLock = true;
            this.__actionState = ActionState.JUMPATTACK;

            this.getActionManager().removeChildByTag("jumpAnim");
            this.runAction(
                YE.Sequence.create(
                    //与CommonAttack一样，每次更新时，应该先更新jumpAttack动画，再更新JumpAttack动作。
                    YE.Spawn.create(this.getAnimationFrameManager().getAnim("jumpAttack_" + this.getAnimDirection()), JumpAttack.create()),
                    YE.CallFunc.create(this, function () {
                        this.__keyLock = false;
                        this.getAnimationFrameManager().getAnim("jump_" + this.getAnimDirection()).reset();
                        this.getAnimationFrameManager().getAnim("jumpAttack_" + this.getAnimDirection()).reset();
                    }))
            );
        },
        __runJumpAction: function () {
            var pos = null;

            this.__keyLock = true;
            this.__actionState = ActionState.JUMP;
            //设置精灵实际的y坐标
            this.__posYWhileInAir = this.getPositionY();

            if (this.__isMoveKeyDown()) {
                this.__setDirection();
                pos = this.__getMoveDistance(this.speedX, 0);
            }
            else {
                pos = [0, 0];
                this.__moveX = null;
            }

            this.runOnlyOneAction(YE.JumpBy.create(this.jumpTime, pos[0] * this.jumpSpeedFactor, 0, this.jumpHeight));
            this.runAction(
                YE.Sequence.create(this.getAnimationFrameManager().getAnim("jump_" + this.getAnimDirection()),
                    YE.CallFunc.create(this, function () {
                        this.__keyLock = false;
                        this.getAnimationFrameManager().getAnim("jump_" + this.getAnimDirection()).reset();
                    })),
                "jumpAnim"
            );
        },
        __runCommonAttackAction: function () {
            this.__keyLock = true;
            this.__actionState = ActionState.COMMONATTACK;
            this.__moveX = null;

            //每次更新时，应该先更新commonAttack动画，再更新Attack动作，
            //这样在第1次更新Attack时，target.getDisplayFrame()才为commonAttack动画的帧
            //（否则，第1次更新Attack时，target.getDisplayFrame()可能为stand动画的帧）
            this.runOnlyOneAction(
                YE.Sequence.create(
                    YE.Spawn.create(this.getAnimationFrameManager().getAnim("commonAttack_" + this.getAnimDirection()), CommonAttack.create()),
                    YE.CallFunc.create(this, function () {
                        this.__keyLock = false;
                        this.getAnimationFrameManager().getAnim("commonAttack_" + this.getAnimDirection()).reset();
                    }))
            );
        },
        __runRunAction: function () {
            var pos = null;

            this.__setDirection();
            this.__actionState = ActionState.RUN;
            pos = this.__getPos(this.__getMoveDistance(this.runSpeedX, 0));

            this.runOnlyOneAction(YE.Spawn.create(YE.Place.create(pos[0], pos[1]),
                this.getAnimationFrameManager().getAnim("run_" + this.getAnimDirection()))
            );
        },
        __runMoveAction: function () {
            var pos = null;

            this.__setDirection();
            this.__actionState = ActionState.MOVE;
            pos = this.__getPos(this.__getMoveDistance(this.speedX, this.speedY));

            this.runOnlyOneAction(YE.Spawn.create(YE.Place.create(pos[0], pos[1]),
                this.getAnimationFrameManager().getAnim("move_" + this.getAnimDirection()))
            );
        },
        __runStandAction: function () {
            this.__actionState = ActionState.STAND;
            this.__moveX = null;

            this.runOnlyOneAction(this.getAnimationFrameManager().getAnim("stand_" + this.getAnimDirection()));
        },
        __getMoveDistance: function (speedX, speedY) {
            var director = YE.Director.getInstance(),
                moveX = 0,
                moveY = 0;

            switch (this.direction) {
                case 0:
                    moveY = -director.getPixPerFrame(speedY);
                    break;
                case 1:
                    moveX = director.getPixPerFrame(speedX);
                    break;
                case 2:
                    moveY = director.getPixPerFrame(speedY);
                    break;
                case 3:
                    moveX = -director.getPixPerFrame(speedX);
                    break;
            }

            this.__moveX = Math.abs(moveX);

            return [moveX, moveY];
        },
        __getPos: function (dis) {
            return [this.getPositionX() + dis[0], this.getPositionY() + dis[1]];
        },
        __isMoveX: function () {
            return !!this.__moveX;
        },
        __handleRoll: function () {
            var posX = null;

            //如果精灵不是横向移动，则不滚动地图
            if (!this.__isMoveX()) {
                return;
            }

            posX = this.getPositionX();

            if (this.__isRollLeft(posX) && this.__notLeftEnd()) {
                this.offsetX -= this.__moveX;
                window.mapLayer.setStateChange();
            }
            else if (this.__isRollRight(posX) && this.__notRightEnd()) {
                this.offsetX += this.__moveX;
                window.mapLayer.setStateChange();
            }

            this.setPositionX(posX);
        },
        __isRollLeft: function (posX) {
            return posX - this.offsetX < this.leftThreshold;
        },
        __isRollRight: function (posX) {
            return posX - this.offsetX > this.rightThreshold
        },
        __notLeftEnd: function () {
            return this.offsetX >= this.__moveX
        },
        __notRightEnd: function () {
            return this.offsetX + window.mapLayer.getCanvasData().width <= window.mapLayer.getWholeMapSize().width;
        },

        __limitPos: function () {
            var pos = null;

            pos = this.P_getPosInRange(this.getPositionX(), this.getPositionY());

            //跳跃和跳砍动作只限制x坐标，不限制y坐标
            if (this.__actionState === ActionState.JUMP || this.__actionState === ActionState.JUMPATTACK) {
                this.setPositionX(pos[0]);
                return;
            }

            this.setPosition(pos[0], pos[1]);
        },
        __isInTheAir: function () {
            return this.__actionState === ActionState.JUMP || this.__actionState === ActionState.JUMPATTACK;
        }
    },
    Public: {
        name: "zhangfei",
        team: "friend",
        direction: null,
        lastDirection: null,
        offsetX: null,
        offsetY: null,

        getPosY: function () {
            if (this.__isInTheAir()) {
                return this.__posYWhileInAir;
            }

            return this.getPositionY();
        },
        getAnimDirection: function () {
            var animDirection = 0;

            switch (this.direction) {
                case 0:
                    animDirection = this.lastDirection;
                    break;
                case 1:
                    animDirection = 0;
                    break;
                case 2:
                    animDirection = this.lastDirection;
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

            this.direction = 0;
            this.lastDirection = this.direction;

            this.__runStandAction();
        },
        onstartLoop: function () {
            this.base();

            this.lastDirection = this.getAnimDirection();

            if (this.__keyLock) {
                if (this.__isJumpAttack()) {
                    this.__runJumpAttackAction();
                }

                return;
            }

            if (this.__isJumpKeyDown()) {
                this.__runJumpAction();
                return;
            }

            if (this.__isAttackKeyDown()) {
                this.__runCommonAttackAction();
                return;
            }

            if (this.__isRunKeyDown()) {
                this.__runRunAction();
            }
            else if (this.__isMoveKeyDown()) {
                this.__runMoveAction();
            }
            else {
                this.__runStandAction();
            }
        },
        onbeforeDraw: function () {
            this.__handleRoll();
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