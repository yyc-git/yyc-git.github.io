/**三国战记
 * 作者：YYC
 * 日期：2014-10-09
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var Sprite = YYC.Class(YE.Sprite, {
    Private: {
        _getSettingFromConfig: function () {
            if (config[this.name]) {
                YE.Tool.extend.extendDeep(config[this.name], this);
            }
        }
    },
    Protected: {
        P_getPosInRange: function (posX, posY) {
            var mapLayer = window.mapLayer;

            posX = posX < mapLayer.minX ? mapLayer.minX : (posX > mapLayer.maxX ? mapLayer.maxX : posX);
            posY = posY < mapLayer.minY ? mapLayer.minY : (posY > mapLayer.maxY ? mapLayer.maxY : posY);

            return [posX, posY];
        }
    },
    Public: {
        convertToSpriteRange: function (range) {
            var spriteRange = null;

            spriteRange = range[this.getAnimDirection()];

            return YE.rect(this.getPosX() + spriteRange[0], this.getPosY() + spriteRange[1], spriteRange[2], spriteRange[3]);
        },
        initWhenCreate: function (data) {
            this._getSettingFromConfig();
            this.setPosition(data.x, data.y);
        },
        onstartLoop: function () {
            this.setOffsetX(window.playerSprite.offsetX);
            this.setOffsetY(window.playerSprite.offsetY);
        },

        Virtual: {
            getPosX: function () {
                return this.getPositionX()
            },
            getPosY: function () {
                return this.getPositionY();
            }
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