/**三国战记
 * 作者：YYC
 * 日期：2014-09-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var MapLayer = YYC.Class(YE.Layer, {
    Private: {
        _mapBufferCanvas: null,

        _createBufferCanvas: function () {
            var data = this.getCanvasData();

            this._mapBufferCanvas = document.createElement("canvas");
            this._mapBufferCanvas.width = data.width * 2;
            this._mapBufferCanvas.height = data.height;
        },
        _initViewPoint: function () {
            var data = LevelManager.getInstance().getLevelData();

            window.playerSprite.offsetX = data.startX;
            window.playerSprite.offsetY = data.startY;
        },
        _drawBufferCanvas: function () {
            var data = this.getWholeMapSize(),
                context = this._mapBufferCanvas.getContext("2d");

            context.drawImage(YE.ImgLoader.getInstance().get("map"),
                0,
                0,
                data.width,
                data.height
            );
        },
        _setRange: function () {
            var size = this.getWholeMapSize();

            this.minX = 0;
            this.maxX = size.width;
            this.minY = 150;
            this.maxY = size.height;
        }
    },
    Public: {
        minY: null,
        maxY: null,
        minX: null,
        maxX: null,

        draw: function (context) {
            var data = this.getCanvasData();

            context.drawImage(this._mapBufferCanvas,
                window.playerSprite.offsetX, window.playerSprite.offsetY,
                data.width, data.height,
                0, 0,
                data.width, data.height
            );
        },
        getMapBufferCanvasData: function () {
            return {
                width: this._mapBufferCanvas.width,
                height: this._mapBufferCanvas.height
            };
        },
        getWholeMapSize: function () {
            var data = this.getCanvasData();

            return {
                width: data.width * 2,
                height: data.height
            }
        },
        isChange: function () {
            return false;
        },
        onenter: function () {
            this._setRange();
            this._createBufferCanvas();
            this._drawBufferCanvas();

            this._initViewPoint();

            this.setStateChange();
        }
    }
});