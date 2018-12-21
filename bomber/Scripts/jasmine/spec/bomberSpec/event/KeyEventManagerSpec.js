describe("KeyEventManager.js", function () {
    var manager = keyEventManager;

    describe("addKeyDown", function () {
        it("documen��keydown�¼�", function () {
            spyOn(YYC.Tool.event, "bindEvent").andCallThrough();
            spyOn(YYC.Tool.event, "addEvent");

            manager.addKeyDown();

            expect(YYC.Tool.event.bindEvent).toHaveBeenCalled();
            expect(YYC.Tool.event.addEvent.calls[0].args[0]).toEqual(document);
            expect(YYC.Tool.event.addEvent.calls[0].args[1]).toEqual("keydown");
            expect(YYC.Tool.event.addEvent.calls[0].args[2]).toBeFunction();
        });
    });

    describe("addKeyUp", function () {
        it("documen��keyup�¼�", function () {
            spyOn(YYC.Tool.event, "bindEvent").andCallThrough();
            spyOn(YYC.Tool.event, "addEvent");

            manager.addKeyUp();

            expect(YYC.Tool.event.bindEvent).toHaveBeenCalled();
            expect(YYC.Tool.event.addEvent.calls[0].args[0]).toEqual(document);
            expect(YYC.Tool.event.addEvent.calls[0].args[1]).toEqual("keyup");
            expect(YYC.Tool.event.addEvent.calls[0].args[2]).toBeFunction();
        });
    });

    describe("removeKeyDown", function () {
        it("document�Ƴ�keydown�¼�", function () {
            spyOn(YYC.Tool.event, "removeEvent");

            manager.removeKeyDown();

            expect(YYC.Tool.event.removeEvent.calls[0].args[0]).toEqual(document);
            expect(YYC.Tool.event.removeEvent.calls[0].args[1]).toEqual("keydown");
            expect(YYC.Tool.event.removeEvent.calls[0].args[2]).toBeFunction();
        });
    });

    describe("removeKeyUp", function () {
        it("document�Ƴ�keyup�¼�", function () {
            spyOn(YYC.Tool.event, "removeEvent");

            manager.removeKeyUp();

            expect(YYC.Tool.event.removeEvent.calls[0].args[0]).toEqual(document);
            expect(YYC.Tool.event.removeEvent.calls[0].args[1]).toEqual("keyup");
            expect(YYC.Tool.event.removeEvent.calls[0].args[2]).toBeFunction();
        });
    });
});