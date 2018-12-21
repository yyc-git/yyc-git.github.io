/**三国战记
 * 作者：YYC
 * 日期：2014-10-09
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var config = {
    zhangfei: {
        speedX: 100,
        speedY: 100,
        runSpeedX: 200,
        jumpTime: 0.7,
        jumpSpeedFactor: 50,
        jumpHeight: 100,
        keyMaxInterval: 0.5,
        leftThreshold: 100,
        rightThreshold: 700,
        commonAttackRange: [
            [40, -10, 90, 20],
            [-150, -10, 80, 20]
        ],
        jumpAttackRange: [
            [40, -10, 115, 25],
            [-165, -10, 95, 25]
        ]
    },
    xiahouyuan: {
        hurtMaxNum: 2,
        fallMoveTime: 0.6,
        fallMoveDisX: -100,
        fallMoveDisY: 0,
        attackedRange: [
            [-50, -10, 100, 20],
            [-50, -10, 100, 20]
        ]
    }
};