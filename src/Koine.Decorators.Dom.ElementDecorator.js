(function (Koine) {
    "use strinct";

    var Decorator = function() {};

    Koine.Decorators                      = Koine.Decorators     || {};
    Koine.Decorators.Dom                  = Koine.Decorators.Dom || {};
    Koine.Decorators.Dom.ElementDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
