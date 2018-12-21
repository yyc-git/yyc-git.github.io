/**三国战记
 * 作者：YYC
 * 日期：2014-09-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
var EntityLayer = YYC.Class(YE.Layer, {
    Private: {
        _sort: function () {
            this.sort(function (a, b) {
                if (a.getPosY() > b.getPosY()) {
                    return 1;
                }
                return -1;
            });
        }
    },
    Public: {
        onenter: function () {
            this.isSortAllChilds = false;
        },
        onbeforeRun: function () {
            this._sort();
        }
    }
});