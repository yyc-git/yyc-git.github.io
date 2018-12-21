/*
 ͼƬԤ���ؿؼ�


 ���÷�ʽ��

 new YYC.PreLoadImg([{id: "a1", url: "a1.png"}], function (currentLoad, imgCount) {
 $("#progressBar_img_show").progressBar(parseInt(currentLoad * 100 / imgCount, 10));     //���ý��������
 }, function () {
 window.setTimeout(function () {
 LoadSound();
 }, 300);    //�ӳ�300ms������chrome�У���������ʾ������100%��������ʾ������Ч�Ľ���
 });

 �޸���־��

 2013-04-01
 ����oop��ܡ�
 ɾ�������õ�ע�͡�
 ���Ը���idֵ����ü��ص�ͼƬ��

 */
YYC.Pattern.namespace("Control").PreLoadImg = YYC.Class({
    Init: function (images, onstep, onload) {
        this._checkImages(images);

        this.config = {
            images: images || [],
            onstep: onstep || function () {
            },
            onload: onload || function () {
            }
        };
        this._imgs = {};
        this.imgCount = this.config.images.length;
        this.currentLoad = 0;
        this.timerID = 0;

        this.loadImg();
    },
    Private: {
        _imgs: {},

        _checkImages: function (images) {
            var i = null;

            for (var i in images) {
                if (images.hasOwnProperty(i)) {
                    if (images[i].id === undefined || images[i].url === undefined) {
                        throw new Error("Ӧ�ð���id��url����");
                    }
                }
            }
        }
    },
    Public: {
        imgCount: 0,
        currentLoad: 0,
        timerID: 0,

        get: function (id) {
            return this._imgs[id];
        },
        loadImg: function () {
            var c = this.config,
                img = null,
                i,
                self = this,
                image = null;

            for (i = 0; i < c.images.length; i++) {
                img = c.images[i];
                image = this._imgs[img.id] = new Image();
                /*
                 �����Զ��������汾�Ĳ��ԣ�����ie��opera�£���ͼƬ���ع�һ���Ժ�������жԸ�ͼƬ������ʱ������������Ѿ�����ס����ͼ

                 Ƭ�ˣ������ٷ���һ���µ����󣬶���ֱ�Ӵӻ����м��ع��������� firefox��safari��������ͼʹ�����ּ��ط�ʽ���û�͸����ͬ��

                 ������ͼƬ��onload�¼�����ie��opera�����������ͬһ�ԣ���������ͼƬ��onload�¼�������ϱߵĴ�����������߲��ܵ���ʵ��Ч����

                 ȷʵ����ie��opera�£����ڻ���ͼƬ�ĳ�ʼ״̬����firefox��safari��chrome���ǲ�һ���ģ�����Ȥ�Ļ��������ڲ�ͬ������£�����һ���ڸ�img��src��ֵ����ͼƬ��url֮ǰ��img��״̬����
                 ���Ƕ�onload�¼��Ĵ�����ȴ��һ�µģ�������ʲô�������

                 �����������ĸ���ԭ�����ڣ�img��src��ֵ�� onload�¼��İ󶨣�˳�򲻶ԣ���ie��opera�£��ȸ�ֵsrc���ٸ�ֵonload����Ϊ�ǻ���ͼƬ���ʹ����onload�¼��Ĵ�������
                 Ӧ���Ȱ�onload�¼���Ȼ���ٸ�src��ֵ��
                 */
                image.onload = function () {
                    this.onload = null;     //���ie�ڴ�й¶  �˴�thisָ��_imgs[i]
                    YYC.Tool.func.bind(self, self.onload)();
                };
                image.src = img.url;

                this.timerID = (function (i) {
                    return setTimeout(function () {
                        if (i == self.currentLoad) {
                            image.src = img.url;
                        }
                    }, 500);
                })(i);
            }
        },
        onload: function (i) {
            clearTimeout(this.timerID);
            this.currentLoad++;
            this.config.onstep(this.currentLoad, this.imgCount);
            if (this.currentLoad === this.imgCount) {
                this.config.onload(this.currentLoad);
            }
        },
        dispose: function () {
            var i, _imgs = this._imgs;
            for (i in _imgs) {
                _imgs[i].onload = null;
                _imgs[i] = null;
            }
            this.config = null;
        }
    }
});
