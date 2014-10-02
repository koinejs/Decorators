(function (Koine) {
    "use strinct";
    var BaseDecorator = Koine.Decorators.Dom.ElementDecorator;

    var Decorator = function (element) {
        BaseDecorator.call(this, element);
    };

    Decorator.prototype = BaseDecorator.prototype;

    Koine.Decorators.Dom.InputTextDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
