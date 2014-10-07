var exports = exports || undefined;

(function (Koine) {
  "use strinct";
  var BaseDecorator = Koine.Decorators.Dom.ElementDecorator;

  var Decorator = function (element) {
    BaseDecorator.call(this, element);
  };

  Decorator.prototype = new BaseDecorator(1);
  var prop = Decorator.prototype;

  /**
   * Sets the value
   * @param object value
   * @return self
   */
  prop.setValue = function (value) {
    var oldValue = this.getValue();
    var e;

    if (value !== oldValue) {
      this.getElement().value = value;

      e = new Koine.Publisher.EventType('change');
      e.oldValue = oldValue;
      this.trigger(e);

      e = new Koine.Publisher.EventType('change:value');
      e.oldValue = oldValue;
      this.trigger(e);
    }

    return this;
  };

  /**
   * Gets the value
   * @return self
   */
  prop.getValue = function () {
    return this.getElement().value;
  };

  Koine.Publisher.wrap(Decorator);

  Koine.Decorators.Dom.InputDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
