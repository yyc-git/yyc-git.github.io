/**YEngine2D 层类
 * 作者：YYC
 * 日期：2013-12-28
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    /**
     * 枚举量移到Layer外面。
     * 因为如果放到Layer中，则在定义属性_state时，this._State.CHANGE为undefined！
     * @type {{NORMAL: number, CHANGE: number}}
     */
    var State = {
        NORMAL: 0,
        CHANGE: 1
    };

    YE.Layer = YYC.AClass(YE.NodeContainer, {
        Init: function (id, position) {
            this.base();

            id && this.setCanvasById(id);
            position && this.setPosition(position.x, position.y);

            if (!id && position) {
                YE.error("请传入画布id");
            }

            if (this.isChange()) {
                this.ye___state = State.CHANGE;
            }
            else {
                this.ye___state = State.NORMAL;
            }
        },
        Private: {
            ye___graphics: null,
            ye___zOrder: 0,
            ye___state: null,
            ye___context: null,
            ye___canvas: null,
            ye___runInterval: -1,
            ye___lastTime: 0,

            ye___getContext: function () {
                this.ye___context = this.ye___canvas.getContext("2d");
            },
            ye___isChange: function () {
                return this.ye___state === State.CHANGE;
            },
            ye___isNormal: function () {
                return this.ye___state === State.NORMAL;
            },
            ye___clearCanvas: function () {
                var canvasData = this.getCanvasData();

                this.ye___context.clearRect(0, 0, canvasData.width, canvasData.height);
            },
            ye___getDurationFromLastLoop: function () {
                return this.ye___getTimeNow() - this.ye___lastTime;
            },
            ye___getTimeNow: function () {
                return +new Date();
            }
        },
        Protected: {
            ye_P_run: function () {
                this.iterate("onbeforeRun");

                this.iterate("update");

                if (this.ye___isChange()) {
                    this.clear();
                    this.iterate("onbeforeDraw", [this.getContext()]);
                    this.draw(this.getContext());
                    this.iterate("onafterDraw", [this.getContext()]);
                    this.setStateNormal();
                }

                this.iterate("onafterRun");
                this.change();
            }
        },
        Public: {
            setStateNormal: function () {
                this.ye___state = State.NORMAL;
            },
            setStateChange: function () {
                this.ye___state = State.CHANGE;
            },
            setZIndex: function (zIndex) {
                this.ye___canvas.style.zIndex = zIndex;
            },
            getZIndex: function () {
                return Number(this.ye___canvas.style.zIndex);
            },
            setCanvasById: function (canvasID) {
                var canvas = document.getElementById(canvasID);

                YE.error(!canvas, "没有找到" + canvasID);

                this.ye___canvas = canvas;
                this.ye___getContext();
//
                if (!this.ye___graphics) {
                    this.ye___graphics = YE.Graphics.create(this.getContext());
                }
                else {
                    this.ye___graphics.setContext(this.getContext());
                }
            },
            setWidth: function (width) {
                this.ye___canvas.width = width;
            },
            setHeight: function (height) {
                this.ye___canvas.height = height;
            },
            setPosition: function (x, y, position) {
                this.ye___canvas.style.position = position || "absolute";
                this.ye___canvas.style.top = y.toString() + "px";
                this.ye___canvas.style.left = x.toString() + "px";
            },
            getContext: function () {
                return this.ye___context;
            },
            getGraphics: function () {
                return this.ye___graphics;
            },
            change: function () {
                if (this.isChange() === true) {
                    this.setStateChange();
                }
                else {
                    this.setStateNormal();
                }
            },
            getCanvasData: function () {
                return {
                    width: this.ye___canvas.width,
                    height: this.ye___canvas.height
                }
            },
            isSetRunInterval: function () {
                return this.ye___runInterval !== -1;
            },
            /**
             * 设置调用run的间隔时间
             * @param interval 间隔时间（单位为秒）
             */
            setRunInterval: function (interval) {
                this.ye___runInterval = interval;
                this.ye___lastTime = this.ye___getTimeNow();
            },
            changeRunInterval: function (interval) {
                this.ye___runInterval = interval;
            },
            /**
             * 恢复为每次主循环都调用run
             */
            resumeRunInterval: function () {
                this.ye___runInterval = -1;
            },
            run: function () {
                if (this.isSetRunInterval()) {
                    if (this.ye___getDurationFromLastLoop() < this.ye___runInterval * 1000) {
                        return YE.returnForTest;
                    }
                    this.ye___lastTime = this.ye___getTimeNow();
                }

                this.base();
            },
            startLoop: function () {
                this.onstartLoop();
                this.iterate("onstartLoop");
            },
            endLoop: function () {
                this.iterate("onendLoop");
                this.onendLoop();
            },
            Virtual: {
                clear: function () {
                    this.ye___clearCanvas();
                },
                isChange: function () {
                    return true;
                },
                draw: function (context) {
                    this.iterate("draw", [context || this.getContext()]);
                }
            },

            //*供测试使用

            forTest_getState: function () {
                return State;
            }
        }
    });
}());