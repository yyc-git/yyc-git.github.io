/**YEngine2D 集成测试
 * 作者：YYC
 * 日期：2014-01-11
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("动画集成测试", function () {
    function getSpriteData() {
        return   {
            //初始坐标
            x: bomberConfig.WIDTH * 3,
            //x: 0,
            y: bomberConfig.HEIGHT * 6,
            //定义sprite走路速度的绝对值
            walkSpeed: bomberConfig.player.speed.NORMAL,

            //速度
//                    speedX: 1,
//                    speedY: 1,

            minX: 0,
            maxX: bomberConfig.canvas.WIDTH - bomberConfig.player.IMGWIDTH,
            minY: 0,
            maxY: bomberConfig.canvas.HEIGHT - bomberConfig.player.IMGHEIGHT

//            defaultAnimId: "stand_right",

//            anims: {
//                "stand_right": YE.Animation.create(getFrames("player", "stand_right")),
//                "stand_left": YE.Animation.create(getFrames("player", "stand_left")),
//                "stand_down": YE.Animation.create(getFrames("player", "stand_down")),
//                "stand_up": YE.Animation.create(getFrames("player", "stand_up")),
//                "walk_up": YE.Animation.create(getFrames("player", "walk_up")),
//                "walk_down": YE.Animation.create(getFrames("player", "walk_down")),
//                "walk_right": YE.Animation.create(getFrames("player", "walk_right")),
//                "walk_left": YE.Animation.create(getFrames("player", "walk_left"))
//            }
        }
    }


    var MyMain = YYC.Class(YE.Main, {
        Private: {
            ye_getImg: function () {
                var urls = [];
                var i = 0, len = 0;

                var player = [
                    { id: "player", url: getImages("player") }
                ];

                this.ye_addImg(urls, player);

                return urls;
            },

            ye_addImg: function (urls, imgs) {
                var args = Array.prototype.slice.call(arguments, 1),
                    i = 0,
                    j = 0,
                    len1 = 0,
                    len2 = 0;

                for (i = 0, len1 = args.length; i < len1; i++) {
                    for (j = 0, len2 = args[i].length; j < len2; j++) {
                        urls.push({ id: args[i][j].id, url: args[i][j].url });
                    }
                }
            }
        },
        Public: {
            loadResource: function () {
                var loader = this.imgLoader,
                    self = this;

                loader.load(this.ye_getImg());

                window.imgLoader = this.imgLoader;
            },
            onload: function () {
                var game = YE.Director.getInstance();

                game.runWithScene(MyScene);
            }
        }
    });

    var PlayerLayer = YYC.Class(YE.Layer, {
        Init: function (id, zIndex, position) {
            this.base(id, zIndex, position);
        },
        Private: {
        },
        Public: {
        }
    });

    var PlayerSprite = YYC.Class(YE.Sprite, {
        Init: function (data, bitmap) {
//            data.defaultAnimId = "walk_down";
//
//
//            data.y = bomberConfig.HEIGHT * 5;

            this.base(bitmap);
            //x/y坐标的最大值和最小值, 可用来限定移动范围.
            this.minX = data.minX;
            this.maxX = data.maxX;
            this.minY = data.minY;
            this.maxY = data.maxY;
            this.walkSpeed = data.walkSpeed;
            this.speedX = data.walkSpeed;
            this.speedY = data.walkSpeed;

            this.setPosition(data.x, data.y);
        },
        Private: {
        },
        Public: {
            draw: function (context) {
                this.drawCurrentFrame(context);
            },
            initData: function () {
                //一个动作在图片中的宽度
                var width = bomberConfig.player.WIDTH,
                //一个动作在图片中的高度
                    height = bomberConfig.player.HEIGHT,
                //一个动作的偏移量
                    offset = {
                        x: bomberConfig.player.offset.X,
                        y: bomberConfig.player.offset.Y
                    },
                //一个动作横向截取的长度
                    sw = bomberConfig.player.SW,
                //一个动作纵向截取的长度
                    sh = bomberConfig.player.SH;


                //使用LoaderManager.preload加载帧数据archer_json和spritesheet图片archer_img.png

                YE.FrameCache.getInstance().addFrameData("archer_json", "archer_image");

                var animate = this.getAnimationManager().createAnim("walk_down_00", "walk_down_01", {
                    duration: 0.1,
                    flipX: true,
                    flipY: false,
                    pixelOffsetX: 0,
                    pixelOffsetY: 0
                });

                this.getAnimationManager().addAnim("walk_down", animate);
                this.runAnim("walk_down");


                var animation = YE.Animation.create(animFrames, {
                    duration: 0.1,
                    flipX: true,
                    flipY: false,
                    pixelOffsetX: 0,
                    pixelOffsetY: 0
                });
                var animate = YE.RepeatForever.create(YE.Animate.create(animation));

                this.getAnimationManager().addAnim("walk_down", animate);
                this.runAnim("walk_down");


                var frame = null;
                var animFrames = [];
                var str = "";
                var i = 0;

                YE.FrameCache.getInstance().addFrameData("archer_json", "archer_image");

                for (i = 0; i < 2; i++) {
                    str = "walk_0" + i;
                    frame = YE.FrameCache.getInstance().getFrame(str);
                    animFrames.push(frame);
                }

                var animation = YE.Animation.create(animFrames, {
                    duration: 0.1,
                    flipX: true,
                    flipY: false,
                    pixelOffsetX: 0,
                    pixelOffsetY: 0
                });
                var animate = YE.RepeatForever.create(YE.Animate.create(animation));

                this.getAnimationManager().addAnim("walk_down", animate);
                this.runAnim("walk_down");


                var img = YE.ImgLoader.getInstance().get("archer");

                var frame1 = YE.Frame.create(YE.Bitmap.create(img), YE.rect(10 * 0, 10 * 0, 10, 10));  //将图片中每一帧利用rect切出来保存到精灵帧中
                var frame2 = YE.Frame.create(YE.Bitmap.create(img), YE.rect(10 * 0, 10 * 1, 10, 10));

                var animFrames = [];

                animFrames.push(frame1);
                animFrames.push(frame2);

                var animation = YE.Animation.create(animFrames, {
                    duration: 0.1
                });

                var animate = YE.Repeat.create(YE.Animate.create(animation), _config.repeatNum);

                this.getAnimationManager().addAnim("walk_down", animate);
                this.runAnim("walk_down");


                var texture = cc.TextureCache.getInstance().addImage("res/dragon_animation.png");    //读取我们需要的图片
                var frame0 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 0, 132 * 0, 132, 132));  //将图片中每一帧利用rect切出来保存到精灵帧中
                var frame1 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 1, 132 * 0, 132, 132));
                var frame2 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 2, 132 * 0, 132, 132));
                var frame3 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 3, 132 * 0, 132, 132));
                var frame4 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 0, 132 * 1, 132, 132));
                var frame5 = cc.SpriteFrame.createWithTexture(texture, cc.rect(132 * 1, 132 * 1, 132, 132));

                var sprite = cc.Sprite.createWithSpriteFrame(frame0);    //从图片帧中创建一个精灵
                sprite.setPosition(cc.p(size.width / 2, size.height / 2));
                this.addChild(sprite);

                var animFrames = [];     //将之前的每一帧保存到数组中
                animFrames.push(frame0);
                animFrames.push(frame1);
                animFrames.push(frame2);
                animFrames.push(frame3);
                animFrames.push(frame4);
                animFrames.push(frame5);

                var animation = cc.Animation.create(animFrames, 0.2);
                创建动画， 第一个参数帧数组， 第二个参数是延迟时间，即每帧图片间隔多少播放
                var animate = cc.Animate.create(animation);
                创建动画动作
                sprite.runAction(cc.RepeatForever.create(animate));


                this.initAnim(animationFrame);

                this.runAnim("walk_down");

                var self = this;

                setTimeout(function () {
                    self.runAnim("walk_up");
                }, 1000);

            }
        }
    });

    var MyScene = YYC.Class(YE.Scene, {
        Private: {
            ye_initScene: function () {
                this.ye_addLayer();
                this.ye_addElements();
            },
            ye_addLayer: function () {
                this.addLayer("playerLayer", new PlayerLayer("playerLayerCanvas", 1, {x: 0, y: 0}));
            },
            ye_addElements: function () {
                this.getLayer("playerLayer").addSprites([new PlayerSprite(getSpriteData("player"), bitmapFactory.createBitmap({ img: window.imgLoader.get("player"), width: bomberConfig.player.IMGWIDTH, height: bomberConfig.player.IMGHEIGHT}))]);
            }
        },
        Public: {
            initData: function () {
                this.ye_initScene();
            }
        }
    });


    it("测试", function () {
        new MyMain().init();
    });
});