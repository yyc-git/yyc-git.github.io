/***********************************************
���ԣ�

DOTA.CheckBox v0.1
���ߣ��ƽ�
���ڣ�2009.09.26
�ѣѣ�573704282
Email: freewind22@163.com


�޸ģ�

���ߣ�YYC
���ڣ�2012-10-31
�������䣺395976266@qq.com
QQ: 395976266
���ͣ�http://www.cnblogs.com/chaogex/

************************************************/

/*
Ϊ��ѡ��/��ѡ���click�¼���������ʽ
��ѡ��Ҫ������һ��Ϊchecked��

���÷�ʽ��

<div id="mapType">
<label class="DOTA_Radio" for="rdoRandom">
<input type="radio" id="rdoRandom" name="rdoType" value="1" onclick="changeType(1)" checked="checked" />�����ͼ
</label>
</div>

<script type="text/javascript">
new YYC.Control.CheckBox({content: "mapType"});
</script>
*/

//if (typeof YYC == "undefined" || !YYC) {
//    window.YYC = {};
//}


YYC.namespace("Control").CheckBox = function (config) {
	this.config = YYC.Tool.extend.extend({
	    content: document.body
//        checked: false  //��ѡ���Ƿ�������checked
	}, config || {});
	
	this.parentEl = YYC.Tool.selector.getDom(this.config.content);
	this.Init();
};
YYC.CheckBox.prototype = {
    Init: function () {
        var labs = this.parentEl.getElementsByTagName("label");
        //        console.log($(this.parentEl).find("input:radio").length);
//        //���û������checked,���Զ�ѡ�е�һ����ѡ��
//        if (!this.config.checked) {
//            $(this.parentEl).find("input[type=radio]").first().attr("checked", true);
//        }
        for (var i = 0; i < labs.length; i++) {
            //��ѡ��
            if (/DOTA_CheckBox/i.test(labs[i].className)) {
                (function (i) {
                    //��click�¼�
                    labs[i].onclick = function (noSwap) {
                        var chk = labs[i].getElementsByTagName("input")[0];
                        if (chk.checked) {
                                                        labs[i].className = "DOTA_CheckBox DOTA_CheckBox_On";
                        } else {
                                                        labs[i].className = "DOTA_CheckBox DOTA_CheckBox_Off";
                        }
                    };
                })(i);
                //����click�¼���������ʽ
                labs[i].onclick();
            }
            //����
            else if (/DOTA_Switch/i.test(labs[i].className)) {
                (function (i) {
                    //��click�¼�
                    labs[i].onclick = function (noSwap) {
                        var chk = labs[i].getElementsByTagName("input")[0];
                        if (chk.checked) {
                            labs[i].className = "DOTA_Switch DOTA_Switch_On";
                        } else {
                            labs[i].className = "DOTA_Switch DOTA_Switch_Off";
                        }
                    };
                })(i);
                //����click�¼���������ʽ
                labs[i].onclick();
            }
            //��ѡ��
            else if (/DOTA_Radio/i.test(labs[i].className)) {

                (function (i) {
                    //��click�¼�
                    labs[i].onclick = function () {
                        if (labs[i].getElementsByTagName("input")[0].checked) {
                            //��ǰѡ�еĵ�ѡ����ʽ��Ϊ��DOTA_Radio_On��
                            labs[i].className = "DOTA_Radio DOTA_Radio_On";

                            //����δѡ�е�ѡ����ʽ��Ϊ��DOTA_Radio_Off��
                            for (var j = 0; j < labs.length; j++) {
                                if (/DOTA_Radio/i.test(labs[j].className) && i !== j
									&& labs[i].getElementsByTagName("input")[0].name == labs[j].getElementsByTagName("input")[0].name) {
                                    labs[j].className = "DOTA_Radio DOTA_Radio_Off";
                                }
                            }
                        }
                    };
                })(i);
                //����click�¼�,������ʽ
                labs[i].onclick();
            }
        }
        //        if (!this.config.checked) {
        //            console.log("checked");
        //            labs[0].getElementsByTagName("input")[0].checked = true;
        //        }
    },
    dispose: function () {
    }
};
