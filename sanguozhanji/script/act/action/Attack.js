/**三国战记
 * 作者：YYC
 * 日期：2014-10-08
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var Attack = YYC.AClass(YE.ActionInterval, {
    Private: {
        _getHitEnemey: function () {
            var target = this.getTarget(),
                self = this,
                result = null,
                targetAttackRange = null;

            targetAttackRange = target.convertToSpriteRange(this.P_getAttackRange());

            window.entityLayer.getChilds().forEach(function (sprite) {
                if (self._isEnemy(sprite)
                    && sprite.canBeAttack
                    && YE.collision.col_Between_Rects(targetAttackRange, sprite.convertToSpriteRange(sprite.attackedRange))) {
                    result = sprite;
                    return $break;
                }
            });

            return result;
        },
        _isEnemy: function (sprite) {
            return sprite.team === "enemy";
        },
        _isEnemyHurt: function (enemy) {
            return enemy.hitCount <= enemy.hurtMaxNum;
        },
        _isEnemyFall: function (enemy) {
            return enemy.hitCount > enemy.hurtMaxNum;
        }
    },
    Protected: {
        Abstract: {
            P_attackFrameIndex: null,

            P_getAttackRange: function () {
            }
        }
    },
    Public: {
        update: function (time) {
            var target = this.getTarget(),
                enemy = null;

            if (target.getDisplayFrame().index === this.P_attackFrameIndex) {
                enemy = this._getHitEnemey();
                if (enemy) {
                    //精灵的runxxxAction方法只负责：
                    //1、创建对应的动作类并执行
                    //2、与动作紧密相关的逻辑（如该动作执行期间是否可执行其它动作；设置精灵动作状态等）
                    //其它逻辑放在调用该方法的地方（如此处）
                    enemy.hitCount += 1;

                    if (this._isEnemyHurt(enemy)) {
                        enemy.runHurtAction();
                    }
                    else if (this._isEnemyFall(enemy)) {
                        enemy.hitCount = 0;
                        enemy.runFallAction();
                    }

                    this.finish();
                }
            }
            else if (target.getDisplayFrame().index > this.P_attackFrameIndex) {
                this.finish();
            }
        },
        copy: function () {
            //todo
        },
        reverse: function () {
            //todo
        }
    }
});


var CommonAttack = YYC.Class(Attack, {
    Protected: {
        P_attackFrameIndex: 4,

        P_getAttackRange: function () {
            return this.getTarget().commonAttackRange;
        }
    },
    Static: {
        create: function () {
            var action = new this();

            return action;
        }
    }
});

var JumpAttack = YYC.Class(Attack, {
    Protected: {
        P_attackFrameIndex: 2,

        P_getAttackRange: function () {
            return this.getTarget().jumpAttackRange;
        }
    },
    Static: {
        create: function () {
            var action = new this();

            return action;
        }
    }
});