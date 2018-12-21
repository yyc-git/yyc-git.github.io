/**YEngine2D
 * 作者：YYC
 * 日期：2014-02-21
 * 电子邮箱：395976266@qq.com
 * QQ: 395976266
 * 博客：http://www.cnblogs.com/chaogex/
 */
describe("FrameCache", function () {
    var frameCache = null;
    var sandbox = null;

    beforeEach(function () {
        sandbox = sinon.sandbox.create();
        frameCache = new YE.FrameCache();
    });
    afterEach(function () {
        sandbox.restore();
    });

    describe("该类为单例类", function () {
        testTool.judgeSingleInstance(YE.FrameCache);
    });

    describe("构造函数", function () {
        it("创建Hash容器", function () {
            sandbox.stub(YE.Hash, "create");

            frameCache = new YE.FrameCache();

            expect(YE.Hash.create.called).toBeTruthy();
        });
    });

    describe("_createFrameAndAddToDict", function () {
        var fakeFramesData = null;

        beforeEach(function () {
            fakeFramesData = {
                a: [1, 2, 3, 4],
                b: [11, 12, 13, 14]
            };
        });
        afterEach(function () {
        });

        it("创建bitmap", function () {
            var fakeImg = {};
            sandbox.stub(YE.Bitmap, "create");

            frameCache._createFrameAndAddToDict(fakeImg, {});

            expect(YE.Bitmap.create.callCount).toEqual(1);
            expect(YE.Bitmap.create.calledWith(fakeImg)).toBeTruthy();
        });
        it("如果字典中已经有了该帧，则继续下一次循环", function () {
            frameCache._createFrameAndAddToDict({}, {
                a: fakeFramesData.a
            });
            sandbox.stub(YE.Frame, "create");
            sandbox.stub(frameCache._frames, "add");

            frameCache._createFrameAndAddToDict({}, fakeFramesData);

            expect(YE.Frame.create.callCount).toEqual(1);
            expect(frameCache._frames.add.firstCall.args[0]).toEqual("b");
        });
        it("创建frame，保存每帧数据", function () {
            var fakeBitmap = {};
            sandbox.stub(YE.Frame, "create");
            sandbox.stub(YE.Bitmap, "create").returns(fakeBitmap);
            sandbox.stub(YE, "rect", function () {
                return [arguments[0], arguments[1], arguments[2], arguments[3]];
            });

            frameCache._createFrameAndAddToDict({}, fakeFramesData);

            expect(YE.Frame.create.callCount).toEqual(2);
            expect(YE.Frame.create.getCall(0).args).toEqual([fakeBitmap, [1, 2, 3, 4]]);
            expect(YE.Frame.create.getCall(1).args).toEqual([fakeBitmap, [11, 12, 13, 14]]);
        });
        it("加入到字典中", function () {
            var fakeFrame = {a: 1};
            sandbox.stub(YE.Frame, "create").returns(fakeFrame);

            frameCache._createFrameAndAddToDict({}, fakeFramesData);

            expect(frameCache._frames.getValue("a")).toEqual(fakeFrame);
            expect(frameCache._frames.getValue("b")).toEqual(fakeFrame);
        });
    });

    describe("addFrameData", function () {
        var fakeImgLoader = null,
            fakeJsonLoader = null,
            fakeImg = {a: 1},
            fakeframes = {};

        beforeEach(function () {
            fakeImgLoader = {
                get: sandbox.stub().returns(fakeImg)
            };
            sandbox.stub(YE.ImgLoader, "getInstance").returns(fakeImgLoader);
            fakeJsonLoader = {
                get: sandbox.stub().returns({
                    frames: fakeframes
                })
            };
           sandbox.stub(YE.JsonLoader, "getInstance").returns(fakeJsonLoader);
            sandbox.stub(frameCache, "_createFrameAndAddToDict");
        });

        it("从loader中获得已加载的图片", function () {
            var imgPath = "../a.png";

            frameCache.addFrameData("", imgPath);

            expect(fakeImgLoader.get.calledWith(imgPath)).toBeTruthy();
        });
        it("如果没有加载img，则报错", function () {
            fakeImgLoader.get = sandbox.stub().returns(undefined);

            expect(function () {
                frameCache.addFrameData("", "");
            }).toThrow();
        });
        it("从loader中获得已加载的json帧数据", function () {
            var jsonFilePath = "../a.json";

            frameCache.addFrameData(jsonFilePath, "");

            expect(fakeJsonLoader.get.calledWith(jsonFilePath)).toBeTruthy();
        });
        it("如果没有加载json，则报错", function () {
            fakeImgLoader.get = sandbox.stub().returns(undefined);
            fakeJsonLoader.get = sandbox.stub().returns(undefined);
            sandbox.stub(YE, "error");

            expect(function () {
                frameCache.addFrameData("", "");
            }).toThrow();
        });
        it("创建frame，绑定加载的图片对象，加入到字典中", function () {
            frameCache.addFrameData("", "");

            expect(frameCache._createFrameAndAddToDict.calledWith(fakeImg, fakeframes)).toBeTruthy();
        });
    });

    describe("getFrame", function () {
        it("从字典中获得该帧frame的副本", function () {
            var imgName = "a";
            var frameCopy = {};
            var fakeFrame = {copy: sandbox.stub().returns(frameCopy)};
            frameCache._frames.add(imgName, fakeFrame);

            var result = frameCache.getFrame(imgName);

            expect(result).toEqual(frameCopy);
        });
        it("如果没有找到该帧，则返回null", function () {
            expect(frameCache.getFrame("a")).toBeNull();
        });
    });
})
;
