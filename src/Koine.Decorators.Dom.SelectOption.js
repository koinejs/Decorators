var exports = exports || undefined;

(function (Koine) {
  "use strinct";
  var BaseDecorator = Koine.Decorators.Dom.ElementDecorator;

  var Decorator = function (element) {
    BaseDecorator.call(this, element);
  };

  Decorator.prototype = BaseDecorator.prototype;
  // var prop = Decorator.prototype;


  Koine.Decorators.Dom.SelectOption = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
