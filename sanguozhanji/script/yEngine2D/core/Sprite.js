(function () {
    YE.Sprite = YYC.AClass(YE.Node, {
        Init: function (displayTarget) {
            this.base();

            this.setDisplayTarget(displayTarget);

            this.ye___actionManager = YE.ActionManager.create();
            this.ye___animationManager = YE.AnimationManager.create();
            this.ye___animationFrameManager = YE.AnimationFrameManager.create();
        },
        Private: {
            ye___displayTarget: null,
            ye___actionManager: null,
            ye___animationManager: null,
            ye___animationFrameManager: null,
            ye___displayFrame: null,
            ye___x: 0,
            ye___y: 0,
            /**
             * 精灵在画布中显示的图片大小
             */
            ye___width: 0,
            ye___height: 0,
            ye___context: null,
            ye___canvasData: null,
            ye___offsetX: 0,
            ye___offsetY: 0,
            ye___clipRange: null,

            ye___setContextAndReturnDrawData: function (displayTarget, data, context) {
                var pixelOffsetX = 0,
                    pixelOffsetY = 0,
                    x = 0,
                    y = 0,
                    width = 0,
                    height = 0,
                    canvasWidth = this.getCanvasData().width,
                    canvasHeight = this.getCanvasData().height,
                    posX = 0,
                    posY = 0,
                    isChangeX = false,
                    isChangeY = false;

                x = data[0] || this.getPositionX();
                y = data[1] || this.getPositionY();
                width = data[2] || this.getWidth();
                height = data[3] || this.getHeight();

                if (displayTarget.isInstanceOf(YE.Frame)) {
                    pixelOffsetX = displayTarget.getPixelOffsetX();
                    pixelOffsetY = displayTarget.getPixelOffsetY();
                }
                else if (displayTarget.isInstanceOf(YE.Bitmap)) {
                    pixelOffsetX = displayTarget.pixelOffsetX;
                    pixelOffsetY = displayTarget.pixelOffsetY;
                }

                if (this.ye___clipRange) {
                    this.ye___clip(context);
                }

                if (displayTarget.isFlipX()) {
                    context.translate(canvasWidth, 0);
                    context.scale(-1, 1);

                    posX = canvasWidth - width - this.ye___computeX(x, pixelOffsetX);
                    isChangeX = true;
                }
                if (displayTarget.isFlipY()) {
                    context.translate(0, canvasHeight);
                    context.scale(1, -1);

                    posY = canvasHeight - height - this.ye___computeY(y, pixelOffsetY);
                    isChangeY = true;
                }

                posX = isChangeX ? posX : this.ye___computeX(x, pixelOffsetX);
                posY = isChangeY ? posY : this.ye___computeY(y, pixelOffsetY);

                return [posX, posY, width, height];
            },
            ye___computeX: function (x, pixelOffsetX) {
                return x - this.ye___offsetX - pixelOffsetX;
            },
            ye___computeY: function (y, pixelOffsetY) {
                return y - this.ye___offsetY - pixelOffsetY;
            },
            ye___clip: function (context) {
                var beginPoint = null;

                context.beginPath();
                beginPoint = this.ye___clipRange.shift();
                context.moveTo(beginPoint.x, beginPoint.y);

                this.ye___clipRange.forEach(function (point) {
                    context.lineTo(point.x, point.y);
                });

                context.lineTo(beginPoint.x, beginPoint.y);

                context.closePath();
                context.clip();

                this.ye___clipRange = null;
            },
//            ye___buildSpriteData: function (x, y, width, height) {
////                x = x !== undefined ? x : this.getPositionX();
////                y = y !== undefined ? y : this.getPositionY();
//
//                return [x, y, width, height];
//            },
            ye___drawDisplayTarget: function (context) {
                var bitmap = null,
                    frame = null,
//                    spriteData = this.ye___buildSpriteData(),
                    spriteData = [],
                    data = null;

                if (this.ye___displayTarget) {
                    context.save();

                    data = this.ye___setContextAndReturnDrawData(this.ye___displayTarget, spriteData, context);

                    if (this.ye___displayTarget.isInstanceOf(YE.Bitmap)) {
                        bitmap = this.ye___displayTarget;

                        context.drawImage(bitmap.img, data[0], data[1], data[2], data[3]);
                    }
                    else if (this.ye___displayTarget.isInstanceOf(YE.Frame)) {
                        frame = this.ye___displayTarget;

                        context.drawImage(
                            frame.getImg(),
                            frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight(),
                            data[0], data[1], data[2], data[3]
                        );
                    }

                    context.restore();
                }
            },
            ye___drawAnim: function (context) {
                var frame = null,
                    data = null;

                frame = this.getDisplayFrame();

                if (!frame) {
                    return "no frame";
                }

                context.save();

                data = this.ye___setContextAndReturnDrawData(frame, this.ye_getAnimData(frame), context);

                context.drawImage(
                    frame.getImg(),
                    frame.getX(), frame.getY(), frame.getWidth(), frame.getHeight(),
                    data[0], data[1], data[2], data[3]
                );

                context.restore();
            },
            ye_getAnimData: function (frame) {
                var spriteData = [],
                    animSize = null;

                animSize = frame.getCacheData("animSize");

                spriteData = [this.getPositionX(), this.getPositionY()];
                if (animSize) {
                    spriteData[2] = animSize.width !== undefined ? animSize.width : this.getWidth();
                    spriteData[3] = animSize.height !== undefined ? animSize.height : this.getHeight();
                }
                else {
                    spriteData[2] = this.getWidth();
                    spriteData[3] = this.getHeight();
                }

                return spriteData;
            }
//            ye___refreshAnimData: function (animName, x, y, width, height) {
//                this.ye___animationFrameManager.initAndReturnAnim(animName, this.ye___buildSpriteData(x, y, width, height));
//            }
//            ye___judgeRemoveAll: function (manager) {
////                var count = manager.getCount();
////
////                if (count > 1 || (count === 1 && !manager.hasChild(item))) {
//                manager.removeAll();
////                }
//            }
        },
        Public: {
            init: function (parent) {
                this.base(parent);

                this.ye___context = parent.getContext();
                this.ye___graphics = parent.getGraphics();
                this.ye___canvasData = parent.getCanvasData();
            },
            getContext: function () {
                return this.ye___context;
            },
            getGraphics: function () {
                return this.ye___graphics;
            },
            getCanvasData: function () {
                return this.ye___canvasData;
            },
            runAction: function (action, tag) {
                if (tag) {
                    action.setTag(tag);
                }

                if (this.ye___actionManager.hasChild(action) || (tag && this.ye___actionManager.hasChild(tag))) {
                    return YE.returnForTest;
                }

                this.ye___actionManager.addChild(action, this);
            },
            update: function () {
                this.ye___actionManager.update();
                this.ye___animationManager.update();
            },
            setPosition: function (x, y) {
                this.ye___x = x;
                this.ye___y = y;
            },
            setPositionX: function (x) {
                this.ye___x = x;
            },
            setPositionY: function (y) {
                this.ye___y = y;
            },
            getPositionX: function () {
                return this.ye___x;
            },
            getPositionY: function () {
                return this.ye___y;
            },
            getAnimationFrameManager: function () {
                return this.ye___animationFrameManager;
            },
            getActionManager: function () {
                return this.ye___actionManager;
            },
            setDisplayFrame: function (frame) {
                this.ye___displayFrame = frame;
            },
            getDisplayFrame: function () {
                return this.ye___displayFrame;
            },
//            runAnim: function (animName) {
//                var anim = null;

//                if (this.ye___animationManager.hasChild(animName)) {
////                    this.ye___refreshAnimData(animName, x, y, width, height);
//
//                    return YE.returnForTest;
//                }
//
//                anim = this.ye___animationFrameManager.initAndReturnAnim(animName);
//
//                this.ye___animationManager.addChild(anim, this);
//            },
            runOnlyOneAnim: function (animName) {
                if (this.isCurrentAnimExactly(animName)) {
//                    this.ye___refreshAnimData(animName, x, y, width, height);

                    return YE.returnForTest;
                }

                this.ye___animationManager.removeAll();

                this.ye___animationManager.addChild(this.ye___animationFrameManager.initAndReturnAnim(animName), this);
            },
            runOnlyOneAction: function (action, tag) {
                if (this.ye___actionManager.hasChild(action) || (tag && this.ye___actionManager.hasChild(tag))) {
                    return YE.returnForTest;
                }

                this.ye___actionManager.removeAll();
                this.runAction(action, tag);
            },
//            getCurrentAnims: function () {
//                return this.ye___animationManager.getChilds();
//            },
            getCurrentAnim: function () {
//                var anims = this.getCurrentAnims();

//                YE.error(anims.length === 0, "没有播放的动画");
//
//                YE.assert(anims.length === 1, "当前播放的动画不止一个");

//                return anims[anims.length - 1];
                return this.ye___animationManager.getChilds()[0];
            },
            getCurrentActions: function () {
                return this.ye___actionManager.getChilds();
            },
            getCurrentAction: function () {
                var actions = this.getCurrentActions();

                YE.error(actions.length === 0, "没有运行的动作");

                YE.assert(actions.length === 1, "当前运行的动作不止一个");

                return actions[actions.length - 1];
            },
//            removeAnim: function (animName) {
//                var anim = this.getAnimationFrameManager().getAnim(animName);
//
//                this.ye___animationManager.remove(anim);
//            },
            removeAllActions: function () {
                this.ye___actionManager.removeAll();
            },
            isCurrentAnimExactly: function (animName) {
                return this.ye___animationManager.hasChild(animName);
            },
            isCurrentAnim: function (animName) {
                return this.getCurrentAnim().containTag(animName)
            },
            /**
             * 获得精灵宽度
             * @returns 宽度
             */
            getWidth: function () {
                return this.ye___width;
            },
            /**
             * 获得精灵高度
             * @returns 高度
             */
            getHeight: function () {
                return this.ye___height;
            },
            setWidth: function (width) {
                this.ye___width = width;
            },
            setHeight: function (height) {
                this.ye___height = height;
            },
            setDisplayTarget: function (displayTarget) {
                this.ye___displayTarget = displayTarget;
            },
            setOffsetX: function (offsetX) {
                this.ye___offsetX = offsetX;
            },
            setOffsetY: function (offsetY) {
                this.ye___offsetY = offsetY;
            },
            getOffsetX: function () {
                return this.ye___offsetX;
            },
            getOffsetY: function () {
                return this.ye___offsetY;
            },
            /**
             * 设置画布剪辑区域
             * @param range 剪辑区域
             */
            setClipRange: function (range) {
                this.ye___clipRange = range;
            },

            Virtual: {
                draw: function (context) {
                    var returnvalueForTest = null;

                    this.ye___drawDisplayTarget(context);
                    returnvalueForTest = this.ye___drawAnim(context);

                    return returnvalueForTest;
                },
                clear: function (context) {
                    context.clearRect(this.getPositionX(), this.getPositionY(), this.getWidth(), this.getHeight());
                },
                onbeforeDraw: function (context) {
                },
                onafterDraw: function (context) {
                }
            }
        }
    });
}());