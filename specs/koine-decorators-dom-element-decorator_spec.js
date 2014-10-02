describe("Koine.Decorators.Dom.ElementDecorator", function () {
    var DescribedClass = Koine.Decorators.Dom.ElementDecorator;

    beforeEach(function () {
        element = new DescribedClass();
    });

    it("inherits from Koine.Decorators.Dom.ElementDecorator", function () {
        var instance = (element instanceof Koine.Decorators.Dom.ElementDecorator);
        expect(instance).toBeTruthy();
    });
});
