/**YEngine2D 立即移动动作类
 * 作者：YYC
 * 日期：2014-10-04
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.Place = YYC.Class(YE.ActionInstant, {
    Init: function (x, y) {
        this.base();

        this.ye___posX = x;
        this.ye___posY = y;
    },
    Private: {
        ye___posX: null,
        ye___posY: null
    },
    Public: {
        update: function (time) {
            var target = null;

            target = this.getTarget();

            target.setPositionX(this.ye___posX);
            target.setPositionY(this.ye___posY);

            this.finish();
        },
        copy: function () {
            return YE.Place.create(this.ye___posX, this.ye___posY);
        },
        reverse: function () {
            this.ye___posX = -this.ye___posX;
            this.ye___posY = -this.ye___posY;

            return this;
        }
    },
    Static: {
        create: function (x, y) {
            var action = new this(x, y);

            return action;
        }
    }
});