﻿YYC.Pattern.namespace("Tool").event = {
    //注意！bindEvent传的参数与BindWithArguments类似，只是第一个参数为event！
    bindEvent: function (object, fun) {
        var args = Array.prototype.slice.call(arguments, 2);
        var self = this;

        return function (event) {
            return fun.apply(object, [self.wrapEvent(event)].concat(args)); //对事件对象进行包装
        }
    },
    /* oTarget既可以是单个dom元素，也可以使jquery集合。
     如：
     YYC.Tool.event.addEvent(document.getElementById("test_div"), "mousedown", _Handle);
     YYC.Tool.event.addEvent($("div"), "mousedown", _Handle);
     */
    addEvent: function (oTarget, sEventType, fnHandler) {
        var dom = null,
            i = 0,
            len = 0,
            temp = null;

        if (oTarget instanceof jQuery) {
            oTarget.each(function () {
                dom = this;

                if (YYC.Tool.judge.isHostMethod(dom, "addEventListener")) {
                    dom.addEventListener(sEventType, fnHandler, false);
                } else if (YYC.Tool.judge.isHostMethod(dom, "attachEvent")) {
                    dom.attachEvent("on" + sEventType, fnHandler);
                } else {
                    dom["on" + sEventType] = fnHandler;
                }
            });
        }
        else {
            dom = oTarget;

            if (YYC.Tool.judge.isHostMethod(dom, "addEventListener")) {
                dom.addEventListener(sEventType, fnHandler, false);
            } else if (YYC.Tool.judge.isHostMethod(dom, "attachEvent")) {
                dom.attachEvent("on" + sEventType, fnHandler);
            } else {
                dom["on" + sEventType] = fnHandler;
            }
        }


    },
    removeEvent: function (oTarget, sEventType, fnHandler) {
        var dom = null,
            i = 0,
            len = 0,
            temp = null;


        if (oTarget instanceof jQuery) {
            oTarget.each(function () {
                dom = this;
                if (YYC.Tool.judge.isHostMethod(dom, "removeEventListener")) {
                    dom.removeEventListener(sEventType, fnHandler, false);
                } else if (YYC.Tool.judge.isHostMethod(dom, "detachEvent")) {
                    dom.detachEvent("on" + sEventType, fnHandler);
                } else {
                    dom["on" + sEventType] = null;
                }
            });
        }
        else {
            dom = oTarget;
            if (YYC.Tool.judge.isHostMethod(dom, "removeEventListener")) {
                dom.removeEventListener(sEventType, fnHandler, false);
            } else if (YYC.Tool.judge.isHostMethod(dom, "detachEvent")) {
                dom.detachEvent("on" + sEventType, fnHandler);
            } else {
                dom["on" + sEventType] = null;
            }
        }
    },
    /*
     包装event对象   -待补充

     event.type:返回事件名。返回没有“on”作为前缀的事件名，比如，onclick事件返回的type是click
     event.target: 返回事件源，就是发生事件的元素
     event.preventDefault: 阻止默认事件动作
     event.stopBubble: 阻止冒泡
     event.offsetLeft:为匹配的元素集合中获取第一个元素的当前坐标的left，相对于文档（document）。
     event.offsetTop:为匹配的元素集合中获取第一个元素的当前坐标的top，相对于文档（document）。
     event.positionLeft:获取匹配元素中第一个元素的当前坐标的left，相对于offset parent的坐标。( offset parent指离该元素最近的而且被定位过的祖先元素 )
     event.positionTop:获取匹配元素中第一个元素的当前坐标的top，相对于offset parent的坐标。( offset parent指离该元素最近的而且被定位过的祖先元素 )
     event.pageX: 鼠标相对于文档的左边缘的位置。
     event.pageY: 鼠标相对于文档的上边缘的位置。
     event.relatedTarget: 发生mouseover和mouseout事件时，相关的dom元素。
     （mouseover：鼠标来之前的元素；mouseout：鼠标将要去的那个元素）
     event.mouseButton: 鼠标按键。
     左键： 1
     右键： 2
     中键： 4
     没有按键： 0


     */
    wrapEvent: function (oEvent) {
        var e = oEvent ? oEvent : window.event;
        var target = e.srcElement || e.target;
        //ie
        if (YYC.Tool.judge.browser.ie) {
            e.pageX = e.clientX + document.body.scrollLeft || document.documentElement.scrollLeft;
            e.pageY = e.clientY + document.body.scrollTop || document.documentElement.scrollTop;
            e.preventDefault = function () {
                e.returnValue = false;
            };
            e.stopBubble = function () {
                e.cancelBubble = true;
            };
            if (e.type == "mouseout") {
                e.relatedTarget = e.toElement;
            } else if (e.type == "mouseover") {
                e.relatedTarget = e.fromElement;
            }
            e.mouseButton = e.button;
            e.keyCode = e.keyCode;

        }
        else {
            e.stopBubble = e.stopPropagation;

            //ff没有多个键一起按的事件
            switch (e.button) {
                case 0:
                    e.mouseButton = 1;
                    break;
                case 1:
                    e.mouseButton = 4;
                    break;
                case 4:
                    e.mouseButton = 0;
                    break;
                default:
                    e.mouseButton = e.button;
                    break;
            }

            e.keyCode = e.which;
        }

        e.target = target;
        e.offsetLeft = $(target).offset().left;   //使用jquery的方法
        e.offsetTop = $(target).offset().top;     //使用jquery的方法
        e.positionLeft = $(target).position().left;   //使用jquery的方法
        e.positionTop = $(target).position().top;   //使用jquery的方法

        return e;
    },
    getEvent: function () {
        return this.getEvent.caller.arguments[0];
    },
    /* 手动触发事件

     默认为不冒泡，不进行默认动作。

     2012-12-03

     网上资料：http://hi.baidu.com/suchen36/item/fb3eefbb8125c0a4eaba93e2


     为大家介绍js下的几个方法：
     1. createEvent（eventType）
     参数：eventType 共5种类型：
     Events ：包括所有的事件.

     HTMLEvents：包括 'abort', 'blur', 'change', 'error', 'focus', 'load', 'reset', 'resize', 'scroll', 'select',
     'submit', 'unload'. 事件

     UIEevents ：包括 'DOMActivate', 'DOMFocusIn', 'DOMFocusOut', 'keydown', 'keypress', 'keyup'.
     间接包含 MouseEvents.

     MouseEvents：包括 'click', 'mousedown', 'mousemove', 'mouseout', 'mouseover', 'mouseup'.

     MutationEvents:包括 'DOMAttrModified', 'DOMNodeInserted', 'DOMNodeRemoved',
     'DOMCharacterDataModified', 'DOMNodeInsertedIntoDocument',
     'DOMNodeRemovedFromDocument', 'DOMSubtreeModified'.

     2. 在createEvent后必须初始化，为大家介绍5种对应的初始化方法

     HTMLEvents 和 通用 Events：
     initEvent( 'type', bubbles, cancelable )

     UIEvents ：
     initUIEvent( 'type', bubbles, cancelable, windowObject, detail )

     MouseEvents：
     initMouseEvent( 'type', bubbles, cancelable, windowObject, detail, screenX, screenY,
     clientX, clientY, ctrlKey, altKey, shiftKey, metaKey, button, relatedTarget )

     MutationEvents ：
     initMutationEvent( 'type', bubbles, cancelable, relatedNode, prevValue, newValue,
     attrName, attrChange )

     3. 在初始化完成后就可以随时触发需要的事件了，为大家介绍targetObj.dispatchEvent(event)
     使targetObj对象的event事件触发
     需要注意的是在IE 5.5+版本上请用fireEvent方法，还是浏览兼容的考虑

     4. 例子
     //例子1 立即触发鼠标被按下事件
     var fireOnThis = document.getElementById('someID');
     var evObj = document.createEvent('MouseEvents');
     evObj.initMouseEvent( 'click', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null );
     fireOnThis.dispatchEvent(evObj);

     //例子2 考虑兼容性的一个鼠标移动事件
     var fireOnThis = document.getElementById('someID');
     if( document.createEvent )
     {
     var evObj = document.createEvent('MouseEvents');
     evObj.initEvent( 'mousemove', true, false );
     fireOnThis.dispatchEvent(evObj);
     }
     else if( document.createEventObject )
     {
     fireOnThis.fireEvent('onmousemove');
     }

     */
    triggerEvent: function (oTarget, type) {
        var evObj = null,
            dom = null;

        if (YYC.Tool.judge.isHostMethod(document, "createEvent")) {
            /* 判断事件类型
             switch (type) {
             case 'abort':
             case 'blur':
             case 'change':
             case 'error':
             case 'focus':
             case 'load':
             case 'reset':
             case 'resize':
             case 'scroll':
             case 'select':
             case 'submit':
             case 'unload':
             evObj = document.createEvent('HTMLEvents');
             evObj.initEvent(type, false, true);
             break;
             case 'DOMActivate':
             case 'DOMFocusIn':
             case 'DOMFocusOut':
             case 'keydown':
             case 'keypress':
             case 'keyup':
             evObj = document.createEvent('UIEevents');
             evObj.initUIEvent(type, false, true);     //出错：参数过少
             break;
             case 'click':
             case 'mousedown':
             case 'mousemove':
             case 'mouseout':
             case 'mouseover':
             case 'mouseup':
             evObj = document.createEvent('MouseEvents');
             evObj.initMouseEvent(type, false, true);  //出错：参数过少
             break;
             case 'DOMAttrModified':
             case 'DOMNodeInserted':
             case 'DOMNodeRemoved':
             case 'DOMCharacterDataModified':
             case 'DOMNodeInsertedIntoDocument':
             case 'DOMNodeRemovedFromDocument':
             case 'DOMSubtreeModified':
             evObj = document.createEvent('MutationEvents');
             evObj.initMutationEvent(type, false, true);   //出错：参数过少
             break;
             default:
             throw new Error("超出范围！");
             break;

             }
             */

            //此处使用通用事件
            evObj = document.createEvent('Events');
            evObj.initEvent(type, false, true);
            if (oTarget instanceof jQuery) {
                oTarget.each(function () {
                    dom = this;
                    dom.dispatchEvent(evObj);
                });
            }
            else {
                dom = oTarget;
                dom.dispatchEvent(evObj);
            }
        }
        else if (YYC.Tool.judge.isHostMethod(document, "createEventObject")) {
            if (oTarget instanceof jQuery) {
                oTarget.each(function () {
                    dom = this;
                    dom.fireEvent('on' + type);
                });
            }
            else {
                dom = oTarget;
                dom.fireEvent('on' + type);
            }
        }
    }
};