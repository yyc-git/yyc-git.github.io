///*   

//8-3

//����ʵ���Ƽ���ϢͼƬԤ���ء�

//����ʵ���ˣ�������


//�ع�Ϊmodule(9-25)

//********************************************************************************
//���÷�ʽ

//array = [];
//<% 
//foreach (var item in photo)
//{
//%>
////                alert("zzz");
////                var count = <%= photo.Count() %>;
//array.push("<%= item %>");
////alert(array);
//<% } %>
//}


//        
//preLoadImg.Set(array, function(img, j){
//$("#index_recommend").find("img").eq(j).attr("src", img.src);
//});

//********************************************************************************





//*/

////function PreLoadImg(images, onStep, OnLoad) {
////    this.Imgs = images || [];

////    this.imgCount = this.Imgs.length;
////    this.currentLoad = 0;
////    this.timer = 0;

////    //���ù��캯��ʱ��ִ�иú���
////    this.LoadImg();
////};

////PreLoadImg.prototype = {
////    
////};





//var preLoadImg = (function () {
//    var Imgs = [];
//    var array = null;

//    var len = 0,
//        delay = 500;    //Ĭ���ӳ�ʱ��

//    //    var options = { };


//    var OnLoad = function () { };


//    var ImageCache = function (img) {
//        //                var Imgs = new Array(array.length);
//        for (var i = 0, len = array.length; i < len; i++) {
//            img[i] = new Image();
//            img[i].src = array[i];
//        }
//    };


//    //����ͼƬ
//    var Delay = function (img) {
//        for (var j = 0, len = img.length; j < len; j++) {
//            if (img[j].complete) {
//                OnLoad(img[j], j);  //����OnLoadί��
//            }
//            else {
//                img[j].onload = function () {
//                    OnLoad(img[j], j);  //����OnLoadί��
//                };
//            }
//        }
//        return;
//    }

//    var LoadImg = function (img) {

//        //    i = 0;
//        setTimeout(function () { Delay(img) }, delay);   //Ҫ�ӳټ��أ����ӳ�ʱ��Ҫ����������(С�ڵ���200ms���Ҳ��Բ�����)
//        //    i = 0;

//    }

//    var Initialize = function () {
//        if (!array) {
//            throw new Error("array����Ϊ�գ�");
//        }

//        if (!Imgs) {    //���ͼƬ�������鲻���ڣ����ʼ��������ֱ�ӵ���
//            Imgs = new Array(array.length);
//            ImageCache(Imgs);  //��ʼ��ͼƬ��������
//        }
//        //        console.log("Initialize! Imgs.length = " + Imgs.length);
//        LoadImg(Imgs); //Ԥ����ͼƬ
////        console.log("Initialize! Imgs.length = " + Imgs.length);
//    };


//    return {
//        //��ڣ�Ԥ����ͼƬ������OnLoad��ʾͼƬ��
//        //����array,onload�Լ��ӳ�ʱ��
//        Set: function (_array, _onLoad, _delay) {
//            this.Clear();

//            array = DOTA.Clone(_array);
//            OnLoad = _onLoad;
//            if (_delay !== undefined) {
//                delay = _delay;
//            }

//            Initialize();
//        },
//        //ֻԤ����ͼƬ��������ͼƬ���飨�������Ϊ1���򷵻ص���Image���󣩡�
//        //����Ѿ�Ԥ���ع��ˣ���ֱ�ӷ���ͼƬ���顣
//        SetImg: function (_array) {
//            //this.Clear();
//            if (!Imgs) {
//                Imgs = new Array(array.length);
//                ImageCache(Imgs);  //��ʼ��ͼƬ��������
//            }
//            return Imgs.length == 1 ? Imgs[0] : Imgs;
//        },
//        Clear: function () {
//            Imgs = null;
//            array = null;
//            len = 0;
//            OnLoad = function () { };
//        },
//        /* ����д�ɡ�GetImgs: Imgs����
//        �������д��ʹ��preLoadImg.GetImgs��õ�Imgs�ǳ�ʼ����(var Imgs = [];)Imgs��
//        ��Ϊ������[]
//        */
//        GetImgs: function () {
//            return Imgs.length == 1 ? Imgs[0] : Imgs;
//        }
//    }
//} ());

YYC.PreLoadImg = function(images, onStep, onLoad){
	this.config = images.images ? images : {
		images : images || [],
		onStep : onStep || function(){},
		onLoad : onLoad || function(){}
	};
	this.imgs = [];
	
	this.imgCount = this.config.images.length;
	this.currentLoad = 0;
	this.timerID = 0;
	
	this.LoadImg();
};
YYC.PreLoadImg.prototype = {
    LoadImg: function () {
        var c = this.config, i, imgs = this.imgs, self = this;
        for (i = 0; i < c.images.length; i++) {
            imgs.push(new Image());
            /* 
            �����Զ��������汾�Ĳ��ԣ�����ie��opera�£���ͼƬ���ع�һ���Ժ�������жԸ�ͼƬ������ʱ������������Ѿ�����ס����ͼ
 
            Ƭ�ˣ������ٷ���һ���µ����󣬶���ֱ�Ӵӻ����м��ع��������� firefox��safari��������ͼʹ�����ּ��ط�ʽ���û�͸����ͬ��
 
            ������ͼƬ��onload�¼�����ie��opera�����������ͬһ�ԣ���������ͼƬ��onload�¼�������ϱߵĴ�����������߲��ܵ���ʵ��Ч����
 
            ȷʵ����ie��opera�£����ڻ���ͼƬ�ĳ�ʼ״̬����firefox��safari��chrome���ǲ�һ���ģ�����Ȥ�Ļ��������ڲ�ͬ������£�����һ���ڸ�img��src��ֵ����ͼƬ��url֮ǰ��img��״̬����
            ���Ƕ�onload�¼��Ĵ�����ȴ��һ�µģ�������ʲô�������

            �����������ĸ���ԭ�����ڣ�img��src��ֵ�� onload�¼��İ󶨣�˳�򲻶ԣ���ie��opera�£��ȸ�ֵsrc���ٸ�ֵonload����Ϊ�ǻ���ͼƬ���ʹ����onload�¼��Ĵ�������
            Ӧ���Ȱ�onload�¼���Ȼ���ٸ�src��ֵ��
            */
            imgs[i].onload = function () {
                this.onload = null;     //���ie�ڴ�й¶  �˴�thisָ��imgs[i]
                MyGameEngine.Event.Bind(self, self.OnLoad)();
            };
            imgs[i].src = c.images[i];
            this.timerID = (function (i) {
                return setTimeout(function () {
                    if (i == self.currentLoad) {
                        imgs[i].src = c.images[i];
                    }
                }, 500);
            })(i);
        }
    },
    OnLoad: function (i) {
//        console.log("����ͼƬ���");
        clearTimeout(this.timerID);
        this.currentLoad++;
        this.config.onStep(this.currentLoad, this.imgCount);

        if (this.currentLoad === this.imgCount) {
            this.config.onLoad(this.currentLoad);
            this.Dispose();
        }
    },
    Dispose: function () {
        var i, imgs = this.imgs;
        for (i = 0; i < imgs.length; i++) {
            imgs[i].onload = null;
            imgs[i] = null;
        }
        imgs.length = 0;
        this.config = null;
    }
};
