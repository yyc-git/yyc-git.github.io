/**三国战记
 * 作者：YYC
 * 日期：2014-09-01
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
(function () {
    var ui = {
        showLoadingMessage: function (msg) {
            $("#info").html(msg);
        },
        showGameArea: function () {
            $('#info').hide();
            $("#gameArea").show();
        },
        showSystemInfo: function (info) {
            $("#systemInfo").html(info);
        },
        show: function (id) {
            $("#" + id).show();
        },
        hide: function (id) {
            $("#" + id).hide();
        }
    };

    window.ui = ui;
}());


