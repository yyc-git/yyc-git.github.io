<%@LANGUAGE="VBSCRIPT" CODEPAGE="936"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>Map Editor v.01</title>
<link rel="stylesheet" type="text/css" href="../Skin/QQ/Option.css"/>
<link href="../Css/Control/YYC_Control.css" rel="stylesheet" type="text/css" />
<style type="text/css">
html, body{
	margin:0px; padding:0px; font-size:12px; color:#eee; overflow:hidden;
}
.text{
	border:1px solid #2B4A84; background:#E4F4FD; color:#2B4A84; height:17px; line-height:16px; width:60px;
}
.btnx{
	height:22px; width:50px; background:#555; color:#fff;
}
form{
	margin:0px; padding:0px;
}
#container{
	width:600px; height: 460px; margin:0px auto;
}
#menu{
	height:26px;
}
#content{
	height:377px; padding:4px;
}
#content table{
	border-collapse:collapse; background:#6b8bbb;
}
#content table td{
	width:30px; height:34px; border:1px solid #2B4A84;
}
#content table .sett{
	background:#2980BE;
}
#mapMsg, #userInfo{
	padding-left:5px; padding-right:5px; line-height:22px;
}
#userInfo div{
	float:left; margin-right:10px;
}
#formAbout{
	display:none;
}
#about{
	padding-left:20px; line-height:20px; color:#fff; letter-spacing:1px;
}
#saveMap{
	display:none;
}
</style>
<script type="text/javascript" src="../Scripts/Base.js" charset="utf-8"></script>
<script type="text/javascript" src="../Scripts/Menu.js" charset="utf-8"></script>
<script type="text/javascript" src="../Scripts/Animation.js" charset="utf-8"></script>
<script type="text/javascript" src="../Scripts/Toolbar.js" charset="utf-8"></script>
<script type="text/javascript" src="../Scripts/Button.js" charset="utf-8"></script>
<script type="text/javascript" src="../Scripts/Drag.js" charset="utf-8"></script>
<script type="text/javascript" src="../Scripts/Window.js" charset="utf-8"></script>
<script type="text/javascript">
var MapEditor = {
	initMap : function(){
		var html = ["<table border='0' cellpadding='0' cellspacing='0'>"];
		html.push(new Array(12).join("<tr>" + new Array(20).join("<td style='height:33px;'></td>") + "</tr>"));
		html.push("</table>");
		DOTA.$("content").innerHTML = html.join("");
		
		this.Table = DOTA.$("content").getElementsByTagName("table")[0];
	},
	initMenu : function(){
		this.menu = new DOTA.MENU.Menu({id : "mainMenu", items : [
			{
				text : '�ļ�(F)',
				menu : {
					items : [
						{
							text : '�½�',
							hotKey : 'Ctrl + D',
							handler : DOTA.Event.bindEvent(this, this.handler, 'New')
						},{
							text : '����', handler : DOTA.Event.bindEvent(this, this.handler, 'Save')
						}, '-' , {
							text : '�˳�', handler : DOTA.Event.bindEvent(this, this.handler, 'Exit')
						}
					]
				}
			}, {
				text : '�༭(E)',
				menu : {
					items : [
						{ text : '���' , handler : DOTA.Event.bindEvent(this, this.handler, 'Clear') },
						{ text : 'ȫѡ' , handler : DOTA.Event.bindEvent(this, this.handler, 'SelectAll') }
					]
				}
			}, {
				text : '����(H)',
				menu : {
					items : [
						 { text : '����', handler : DOTA.Event.bindEvent(this, this.handler, 'About') }
					]
				}
			}
		]});
		this.menu.renderTo("menu");
	},
	initEvent : function(){
		DOTA.Event.addEvent(this.Table, "click", DOTA.Event.bindEvent(this, this.onClick));
		DOTA.Event.addEvent(this.Table, "mousedown", DOTA.Event.bindEvent(this, this.onMouseDown));
		DOTA.Event.addEvent(this.Table, "mousemove", DOTA.Event.bindEvent(this, this.onMouseMove));
		DOTA.Event.addEvent(this.Table, "mouseup", DOTA.Event.bindEvent(this, this.onMouseUp));
		
		DOTA.Event.addEvent(document, "contextmenu", DOTA.Event.bindEvent(this, this.onContext));   //�һ�����Ҫ�޸�
	},
	init : function(){
		this.mouseDown = true;
		this.flag = false;
		this.isSaving = false;
		DOTA.$("num").value = this.num = 0;
		
		this.initMenu();
		this.initMap();
		this.initEvent();
	},
	setFlag : function(oEvent, flag){
		var target = oEvent.target;
		if(target.tagName && target.tagName.toLowerCase() == "td"){
			if(flag){
				if(target.className != "set"){
					target.className = "set";
					this.num++;
				}
			}else{
				if(target.className == "set"){
					target.className = "";
					this.num--;
				}
			}
			DOTA.$("num").value = this.num;
		}
	},
	onMouseDown : function(oEvent){
		this.flag = oEvent.button == 2 ? false : true;
		this.mouseDown = true;
		this.setFlag(oEvent, this.flag);
	},
	onMouseMove : function(oEvent){
		if(this.mouseDown){
			this.setFlag(oEvent, this.flag);
		}
	},
	onMouseUp : function(){
		this.mouseDown = false;
	},
	onClick : function(oEvent){
		if(oEvent.button != 2){
			this.setFlag(oEvent, true);		
		}
	},
	onContext : function(oEvent){
		this.setFlag(oEvent, false);
		oEvent.preventDefault();
	},
	handler : function(oEvent, type){
		switch(type.toLowerCase()){
			case "new":
				this.setMap(false);
				DOTA.$("mapName").value = "";
				DOTA.$("authorName").value = "";
				break;
			case "save":
				this.saveMap();
				break;
			case "exit":
				this.dispose();
				parent.closeDialog();
				break;
			case "clear":
				this.setMap(false);
				break;
			case "selectall":
				this.setMap(true);
				break;
			case "about":
				this.showHelp();
				break;
		}
		this.mouseDown = false;
	},
	setMap : function(flag){
		var T = this.Table, css = flag ? "set" : "";
		for(var i = 0; i < T.rows.length; i++){
			for(var j = 0; j < T.rows[i].cells.length; j++){
				T.rows[i].cells[j].className = css;
			}
		}
		this.num = flag ? 11 * 19 : 0;
		DOTA.$("num").value = this.num;
	},
	saveMap : function(){
		var T = this.Table, map = [], num = parseInt(DOTA.$("num").value, 10);
		if(this.isSaving){
			alert("���ڱ����ͼ�����Ժ����ԣ�");
			return;
		}
		if(num < 40 || num > 200 || num % 2 == 1){
			alert("��ͼ�з������������޸ĺ��ٱ��棡");
			return;
		}
		if(DOTA.$("mapName").value == ""){
			alert("�������ͼ����!");
			return;
		}
		if(DOTA.$("authorName").value == ""){
			alert("��������������!");
			return;
		}
		for(var i = 0; i < T.rows.length; i++){
			for(var j = 0; j < T.rows[i].cells.length; j++){
				map.push(T.rows[i].cells[j].className == "" ? "_" : "1");
			}
		}
		DOTA.$("mapString").value = map.join("");
		this.isSaving = true;
		DOTA.$("form1").submit();
	},
	showHelp : function(){
		if(!this.help){
			this.help = new DOTA.Dialog({title: "����", width:300, height:190});
		}
		this.help.show(DOTA.$("formAbout").innerHTML);
	},
	dispose : function(){
		this.menu.dispose();
		if(this.help){
			this.help.dispose();
		}
	}
}
function addMap(id, name, data, author, time){
	parent.addMap(id, name, data, author, time);
}
function callback(success, msg){
	MapEditor.isSaving = false;
	alert(msg);
}
window.onload = function(){
	MapEditor.init();
	new DOTA.Button({text: "�� ��", onClick: function(){
		MapEditor.handler(null, 'save');
	}}).renderTo(DOTA.$("btnList"));
	new DOTA.Button({text: "�� ��", onClick: function(){
		MapEditor.handler(null, 'clear');
	}}).renderTo(DOTA.$("btnList"));
	new DOTA.Button({text: "ȫ ѡ", onClick: function(){
		MapEditor.handler(null, 'selectAll');
	}}).renderTo(DOTA.$("btnList"));
	new DOTA.Button({text: "�� ��", onClick: function(){
		MapEditor.handler(null, 'exit');
	}}).renderTo(DOTA.$("btnList"));
};

</script>
</head>
<body onselectstart="return false;">
<form method="post" id="form1" name="form1" action="saveMap.asp" target="saveMap">
	<input type="hidden" name="mapString" id="mapString" value="" />
    <div id="container">
        <div id="menu"></div>
        <div id="content">
            
        </div>
        <div id="mapMsg">
            ��������: <input type="text" class="text" id="num" readonly="readonly" maxlength="4" size="2" style="width:25px;" />
            <b>&nbsp;ע</b>������������40-200����Ϊ˫��ʱ��Ч��
        </div>
        <div id="userInfo">
        	<div>
                ��ͼ����: <input type="text" class="text" id="mapName" name="mapName" maxlength="20" size="10" /> &nbsp;
                ����������<input type="text" class="text" id="authorName" name="authorName" maxlength="20" size="10" /> &nbsp;
            </div>
            <div id="btnList"></div>
        </div>
    </div>
</form>
<div id="formAbout">
	<div id="about">
        <div>��������ͼ�༭��</div> 
        <div>�汾��v0.1</div> 
        <div>���ߣ�Freewind</div> 
        <div>�ѣѣ�573704282</div> 
        <div>��Ȩ���� Copyright&copy; 2010</div> 
	</div>
</div>
<iframe frameborder="0" name="saveMap" id="saveMap" style="width:0px; height:0px; overflow:hidden; line-height:0px;"></iframe>
</body>
</html>
