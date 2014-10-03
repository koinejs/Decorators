var exports = exports || undefined;

(function (Koine) {
  "use strinct";
  var BaseDecorator = Koine.Decorators.Dom.ElementDecorator;

  var Decorator = function (element) {
    BaseDecorator.call(this, element);
  };

  Decorator.prototype = BaseDecorator.prototype;
  var prop = Decorator.prototype;

  /**
   * Sets the value
   * @param object value
   * @return self
   */
  prop.setValue = function (value) {
    var oldValue = this.getValue(), e;

    if (value !== oldValue) {
      this.getElement().setAttribute('value', value);

      e = new Koine.Publisher.EventType('changed');
      e.oldValue = oldValue;
      this.trigger(e);

      e = new Koine.Publisher.EventType('changed:value');
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
    return this.getAttribute('value');
  };

  Koine.Publisher.wrap(Decorator);

  Koine.Decorators.Dom.InputTextDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
