var exports = exports || undefined;

(function (Koine) {
  "use strinct";

  var BaseDecorator = Koine.Decorators.Dom.InputDecorator;

  var Decorator = function (element) {
    BaseDecorator.call(this, element);
    this._options = [];
  };

  Decorator.prototype = new BaseDecorator(1);
  var prop = Decorator.prototype;

  /**
   * Add an option
   * @param object obj
   * @return self
   */
  prop.addOption = function (option) {
    return option;
  };

  /**
   * Creates an option
   * @return Koine.Decorators.Dom.SelectOptionDecorator
   */
  prop.createOption = function (value, label, selected) {
    var element = document.createElement('option'),
        option  = new Koine.Decorators.Dom.SelectOptionDecorator(element);

    option.setValue(value).setLabel(label);

    if (selected) {
      option.select();
    }

    return option;
  };

  /**
   * Add an option
   * @param Koine.Decorators.Dom.SelectOptionDecorator option
   * @return self
   */
  prop.addOption = function (option) {
    this._options.push(option);
    this.getElement().appendChild(option.getElement());

    var e = new Koine.Publisher.EventType("options:added", this);
    e.option = option;
    this.trigger(e);

    return this;
  };

  /**
   * Add an optin to the select
   * @param Array options
   * @return this
   */
  prop.addOptions = function (options) {
    var self = this;

    options.forEach(function (option) {
      self.addOption(option);
    });

    return this;
  };

  /**
   * Remove an option
   * @param Koine.Decorator.Dom.SelectOptionDecorator option
   * @return self
   */
  prop.removeOption = function (option) {
    var index = this.getOptions().indexOf(option);

    if (index >= 0) {
      var e = new Koine.Publisher.EventType("options:removed", this);
      e.option = option;
      this.trigger(e);
      this.getOptions().splice(index, 1);
    }

    return this;
  };

  prop.removeOptions = function (options) {
    var that = this;

    options.forEach(function (option) {
      that.removeOption(option);
    });

    return this;
  };

  prop.getOptions = function () {
    return this._options;
  };

  prop.getSelected = function () {
    var selected = null;

    this.getOptions().forEach(function (option) {
      if (option.isSelected()) {
        selected = option;

        return false;
      }
    });

    return selected;
  };

  Koine.Decorators.Dom.SelectDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
