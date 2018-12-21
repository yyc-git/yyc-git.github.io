/**YEngine2D 动画缓存类
 * 作者：YYC
 * 日期：2014-05-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var _instance = null;

    YE.AnimationCache = YYC.Class(YE.Entity, {
        Init: function () {
            this.base();

            this.ye_animations = YE.Hash.create();
        },
        Private: {
            ye_animations: null,


            ye_buildFrameName: function (animPrex, numberLen, index) {
                index = index.toString();

                while (index.length < numberLen) {
                    index = "0" + index;
                }
                return animPrex + index;
            }
        },
        Public: {
            createAnim: function (startFrameName, endFrameName, animData) {
                var startIndex = null,
                    endIndex = null,
                    animPrex = null,
                    numberLen = 0,
                    animFrames = [],
                    animation = null,
                    animate = null,
                    frames = null,
                    _animData = {
                        duration: 0.1,
                        flipX: false,
                        flipY: false,
                        pixelOffsetX: 0,
                        pixelOffsetY: 0,
                        repeatNum: -1,
                        width: null,
                        height: null
                    } ,
                    i = 0;

                if (arguments.length === 1) {
                    frames = arguments[0].frames;
                    YE.Tool.extend.extendExist(_animData, arguments[0]);

                    frames.forEach(function (frame) {
                        animFrames.push(YE.FrameCache.getInstance().getFrame(frame));
                    });
                }
                else if (arguments.length === 2) {
                    animFrames = [YE.FrameCache.getInstance().getFrame(arguments[0])];
                    YE.Tool.extend.extendExist(_animData, arguments[1]);
                }
                else if (arguments.length === 3) {
                    startIndex = startFrameName.substring(startFrameName.search(/\d+$/), startFrameName.length);
                    endIndex = endFrameName.substring(endFrameName.search(/\d+$/), endFrameName.length);
                    animPrex = startFrameName.substring(0, startFrameName.search(/\d+$/));
                    numberLen = startIndex.length;


                    startIndex = Number(startIndex);
                    endIndex = Number(endIndex);

                    for (i = startIndex; i <= endIndex; i++) {
                        animFrames.push(YE.FrameCache.getInstance().getFrame(this.ye_buildFrameName(animPrex, numberLen, i)));
                    }

                    YE.Tool.extend.extendExist(_animData, animData);
                }

                animation = YE.Animation.create(animFrames, {
                    duration: _animData.duration,
                    flipX: _animData.flipX,
                    flipY: _animData.flipY,
                    pixelOffsetX: _animData.pixelOffsetX,
                    pixelOffsetY: _animData.pixelOffsetY,
                    size: {width: _animData.width, height: _animData.height }
                });

                if (_animData.repeatNum === -1) {
                    animate = YE.RepeatForever.create(YE.Animate.create(animation));
                }
                else {
                    animate = YE.Repeat.create(YE.Animate.create(animation), _animData.repeatNum);
                }

                return animate;
            },
            addAnim: function (animName, anim) {
                this.ye_animations.add(animName, anim);
            },
            addAnimWithFile: function (jsonFilePath) {
                var jsonData = null,
                    i = null;

                jsonData = YE.JsonLoader.getInstance().get(jsonFilePath);

                for (i in jsonData) {
                    if (jsonData.hasOwnProperty(i)) {
                        this.addAnim(i, this.createAnim(jsonData[i]));
                    }
                }
            },
            removeAnim: function (animName) {
                this.ye_animations.remove(animName);
            },
            getAnim: function (animName) {
                return this.ye_animations.getValue(animName);
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