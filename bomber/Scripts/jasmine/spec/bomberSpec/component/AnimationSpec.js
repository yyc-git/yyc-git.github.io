describe("Animation.js", function () {
    var animation = null;
    var img = null,
        frames = null,
        data = null;

    beforeEach(function () {
        data = getFrames("player", "walk_down");
    });
    afterEach(function () {
    });

    describe("���캯��", function () {
        it("���_frames�����鸱����", function () {
            animation = new Animation(data);

            expect(animation._frames).not.toBeSameArray(frames);
        });
        it("���frameCount", function () {
            animation = new Animation(data);

            expect(animation._frameCount).toEqual(4);
        });
        it("����setCurrentFrame", function () {
            animation = new Animation(data);

            spyOn(animation, "setCurrentFrame");
            animation.Init(data);  //���ù��캯��

            expect(animation.setCurrentFrame).toHaveBeenCalledWith(0);
        });
    });

    describe("setCurrentFrame", function () {
        it("���� ��ǰ֡�Ѳ���ʱ��Ϊ0,��ǰ֡�������ڲ���index��"
            + "��ǰѡ��֡����Ϊthis._frames[index]", function () {
        });
    });

    describe("update", function () {
    });

    describe("getCurrentFrame", function () {
    });

    describe("getImg", function () {
    });
});