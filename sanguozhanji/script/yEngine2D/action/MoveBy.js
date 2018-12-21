/**YEngine2D 移动动作类
 * 作者：YYC
 * 日期：2014-10-09
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
YE.MoveBy = YYC.Class(YE.ActionInterval, {
    Init: function () {
        this.base();
    },
    Private: {
        ye___elapsed: 0,
        ye___duration: null,
        ye___x: null,
        ye___y: null,
        ye___destX: null,
        ye___destY: null,

        ye___computeDestPos: function () {
            var target = null;

            target = this.getTarget();

            this.ye___destX = target.getPositionX() + this.ye___x;
            this.ye___destY = target.getPositionY() + this.ye___y;
        },
        ye___computeMoveDistance: function (time) {
            var ratio = null,
                moveX = null,
                moveY = null;

            ratio = time / this.ye___duration;
            moveX = ratio * this.ye___x;
            moveY = ratio * this.ye___y;

            return [moveX, moveY];
        },
        ye___isFinish: function () {
            return this.ye___elapsed >= this.ye___duration;
        },
        ye___setTargetToDest: function () {
            this.getTarget().setPosition(this.ye___destX, this.ye___destY);
        }
    },
    Public: {
        initWhenCreate: function (duration, x, y) {
            this.base();

            this.ye___duration = duration;
            this.ye___x = x;
            this.ye___y = y;
        },
        init: function () {
            this.ye___computeDestPos();
        },
        update: function (time) {
            var target = null,
                dis = null;

            target = this.getTarget();

            if (this.ye___isFinish()) {
                this.finish();
                this.ye___setTargetToDest();
                return;
            }

            dis = this.ye___computeMoveDistance(time);

            target.setPositionX(target.getPositionX() + dis[0]);
            target.setPositionY(target.getPositionY() + dis[1]);

            this.ye___elapsed += time;
        },
        copy: function () {
            return YE.MoveBy.create(this.ye___duration, this.ye___x, this.ye___y);
        },
        reverse: function () {
            return YE.MoveBy.create(this.ye___duration, -this.ye___x, -this.ye___y);
        }
    },
    Static: {
        create: function (duration, x, y) {
            var action = new this();

            action.initWhenCreate(duration, x, y);

            return action;
        }
    }
});