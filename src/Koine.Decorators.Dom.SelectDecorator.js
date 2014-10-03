var exports = exports || undefined;

(function (Koine) {
  "use strinct";

  var BaseDecorator = Koine.Decorators.Dom.InputDecorator;

  var Decorator = function (element) {
    BaseDecorator.call(this, element);
  };

  Decorator.prototype = BaseDecorator.prototype;
  var prop = Decorator.prototype;

  /**
   * Add an option
   * @param object obj
   * @return self
   */
  prop.addOption = function (option) {
    return option;
  };

  prop.addOptions = function (options) {
    return options;
  };

  prop.addOptions = function (options) {
    return options;
  };

  var _setValue = prop.setValue;
  prop.setValue = function (value) {
    _setValue.call(this, value);
    return this;
  };

  prop.select = function (value) {
    _setValue.call(this, value);
    return this;
  };

  Koine.Decorators.Dom.SelectDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
