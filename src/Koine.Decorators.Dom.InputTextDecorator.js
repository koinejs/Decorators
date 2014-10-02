(function (Koine) {
    "use strinct";

    var Decorator = function() {};
    Decorator.prototype = Koine.Decorators.Dom.ElementDecorator.prototype;

    Koine.Decorators.Dom.InputTextDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
