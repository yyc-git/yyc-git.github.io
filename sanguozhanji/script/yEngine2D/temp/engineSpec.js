/**YEngine2D 入口配置类
 * 作者：YYC
 * 日期：2014-07-27
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
//单例
//setConfig
////loadEngine
//isLoadWhenDomReady:true
(function () {

    var _instance = null,
        JsLoader = null;

    function _extend(destination, source) {
        var property = "";

        for (property in source) {
            destination[property] = source[property];
        }
        return destination;
    }

    JsLoader = YYC.Class({
        Init: function () {
        },
        Private: {
            ye_container: [],

            ye_loadJsSync: function (js, func) {
                var script = null;

                script = this.ye_createScript(js);
                this.ye_appendScript(script);

                this.ye_onloadSync(js, script, func);
            },
            ye_loadJsAsync: function (js, func) {
                var script = null;

                script = this.ye_createScript(js);
                this.ye_appendScript(script);

                this.ye_onloadAsync(js, script, func);
                this.ye_loadNext(func);
            },
            ye_appendScript: function (script) {
                var head = document.getElementsByTagName("head")[0];

                head.appendChild(script);
            },
            ye_createScript: function (js) {
                var script = document.createElement("script");
                script.type = "text/javascript";
                script.src = js.src;

                return script;
            },
            ye_onloadSync: function (js, script, func) {
                var self = this;

                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            js.callback && js.callback.apply(js.obj, js.args);

                            self.ye_loadNext(func);
                        }
                    };
                }
                else { //Others
                    script.onload = function () {
                        js.callback && js.callback.apply(js.obj, js.args);

                        self.ye_loadNext(func);
                    };
                }
            },
            ye_onloadAsync: function (js, script, func) {
                var self = this;

                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            js.callback && js.callback.apply(js.obj, js.args);
                        }
                    };
                } else { //Others
                    script.onload = function () {
                        js.callback && js.callback.apply(js.obj, js.args);
                    };
                }
            },
            ye_loadNext: function (func) {
                if (this.ye_container.length == 0) {
                    return;
                }
                else {
                    func.call(this, null);
                }
            }
        },
        Public: {
            add: function (src, callback, args, obj) {
                this.ye_container.push({ src: src, callback: callback, args: args || [], obj: obj ? obj : window });

                return this;
            },
            loadSync: function () {
                if (this.ye_container.length == 0) {
                    throw new Error("请先加入js");
                }
                var js = this.ye_container.shift();

                this.ye_loadJsSync(js, this.loadSync);
            },
            loadAsync: function () {
                if (this.ye_container.length == 0) {
                    throw new Error("请先加入js");
                }
                var js = this.ye_container.shift();

                this.ye_loadJsAsync(js, this.loadAsync);
            },
            deferLoadSync: function (time) {
                var self = this;

                setTimeout(function () {
                    self.loadSync();
                }, time * 1000);
            },
            require: function (fileSrc, callback) {
                var script = document.createElement("script");

                if (script.readyState) { //IE
                    script.onreadystatechange = function () {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback && callback();
                        }
                    };
                }
                else { //Others
                    script.onload = function () {
                        callback && callback();
                    };
                }

                script.src = fileSrc;
                //script.type = "text/javascript";
                this.ye_appendScript(script);
            },
            preload: (function () {
                var preload = null;

                if (YE.Tool.judge.browser.isIE()) {
                    preload = function (fileSrc) {
                        new Image().src = fileSrc;  //灯塔模式
                    };
                }
                else {
                    preload = function (fileSrc) {
                        var obj = document.createElement("object"),
                            body = document.body;

                        obj.width = 0;
                        obj.height = 0;
                        obj.data = fileSrc;
                        body.appendChild(obj);
                    }
                }
            }())
        }
    });

    //*全局方法
    (function () {
        /**
         * 创建命名空间。
         示例：
         namespace("YE.Tool.Button");
         */
        var global = {
            namespace: function (str) {
                var parent = window,
                    parts = str.split('.'),
                    i = 0,
                    len = 0;

                if (str.length == 0) {
                    YE.error(true, "命名空间不能为空");
                }

                for (i = 0, len = parts.length; i < len; i++) {
                    if (typeof parent[parts[i]] === "undefined") {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];  //递归增加命名空间
                }

                return parent;
            },
            /**
             * 生成命名空间,并执行func

             示例：
             register("YYC.Test.t", function () {
	                    YYC.Test.t = {
	                        a: 100
	                    };
                });
             */
            register: function (str, func) {
                var parent = window,
                    parts = str.split('.'),
                    i = 0,
                    len = 0;

                if (str.length == 0) {
                    YE.error(true, "命名空间不能为空");
                }

                for (i = 0, len = parts.length; i < len; i++) {
                    if (typeof parent[parts[i]] === "undefined") {
                        parent[parts[i]] = {};
                    }
                    parent = parent[parts[i]];  //递归增加命名空间
                }

                if (func) {
                    func.call(parent, this);
                }

                return parent;
            }
        };

        _extend(window, global);
    }());


    YE.Main = YYC.Class({
        Init: function () {
        },
        Private: {
            ye_config: null,

            ye_loadJsLoader: function () {
                var config = this.ye_config;

                window.addEventListener("DOMContentLoaded", function () {
                    var engineFilePaths = [
                            "myTool/frame/YOOP.js",
                            "extend/jsExtend.js"
                        ],
                        engineDir = config.engineDir,
                        userFilePaths = config.userFilePaths,
                        jsLoader = new JsLoader();

                    engineFilePaths.forEach(function (filePath) {
                        jsLoader.add(engineDir + filePath);
                    });

                    userFilePaths.forEach(function (filePath) {
                        jsLoader.add(filePath);
                    });

                    jsLoader.loadSync();

//                    //first load engine file if specified
//                    var s = d.createElement('script');
//                    /*********Delete this section if you have packed all files into one*******/
//                    if (c.SingleEngineFile && !c.engineDir) {
//                        s.src = c.SingleEngineFile;
//                    }
//                    else if (c.engineDir && !c.SingleEngineFile) {
//                        s.src = c.engineDir + 'platform/jsloader.js';
//                    }
//                    else {
//                        alert('You must specify either the single engine file OR the engine directory in "cocos2d.js"');
//                    }
//                    /*********Delete this section if you have packed all files into one*******/
//
//                        //s.src = 'Packed_Release_File.js'; //IMPORTANT: Un-comment this line if you have packed all files into one
//
//                    d.body.appendChild(s);
//                    s.c = c;
//                    s.id = 'cocos2d-html5';
//                    //else if single file specified, load singlefile

                });
            }
        },
        Public: {
            setConfig: function (config) {
                this.ye_config = _extend({
                    //*调试配置

                    //是否处于调试状态
                    //如果是，则会开启assert、log方法，Director->getPixPerFrame返回的速度不会受到fps的影响
                    isDebug: false,
                    isShowDebugOnPage: false, //是否在页面上显示调试信息
                    isLoadWhenDomReady: true, //是否在DOM加载完成后自动加载
//                    showFPS:true,
//                    frameRate:60,
//                    tag:'gameCanvas', //the dom element to run cocos2d on
                    engineDir: "",
                    //SingleEngineFile:'',
                    userFilePaths: []               //add your own files in order here
                }, config);

                if (this.ye_config.isLoadWhenDomReady) {
                    this.ye_loadJsLoader();
                }
            },
            getConfig: function () {
                return this.ye_config;
            },
            load: function () {
                if (this.ye_config.isLoadWhenDomReady) {
                    YE.log("已配置为DOM加载完成后自动加载文件，此处不再进行加载");
                    return false;
                }

                this.ye_loadJsLoader();
            }
        },
        Static: {
            getInstance: function () {
                if (_instance === null) {
                    _instance = new this();
                }
                return _instance;
            },
            forTest_clearInstance: function () {
                _instance = null;
            }
        }
    });

}());