var exports = exports || undefined;

(function (Koine) {
  "use strinct";

  var BaseDecorator = Koine.Decorators.Dom.InputDecorator;

  var Decorator = function (element) {
    BaseDecorator.call(this, element);
    this._options = [];
    this.factoryFromElement(element);
  };

  Decorator.prototype = new BaseDecorator(1);
  var prot = Decorator.prototype;

  /**
   * Add an option
   * @param object obj
   * @return self
   */
  prot.addOption = function (option) {
    return option;
  };

  /**
   * Creates an option
   * @return Koine.Decorators.Dom.SelectOptionDecorator
   */
  prot.createOption = function (value, label, selected) {
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
  prot.addOption = function (option) {
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
  prot.addOptions = function (options) {
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
  prot.removeOption = function (option) {
    var index = this.getOptions().indexOf(option);

    if (index >= 0) {
      var e = new Koine.Publisher.EventType("options:removed", this);
      e.option = option;
      this.trigger(e);
      this.getOptions().splice(index, 1);
    }

    return this;
  };

  /**
   * Remove options
   * @param Array[Koine.Decorator.Dom.SelectOptionDecorator] option
   * @return self
   */
  prot.removeOptions = function (options) {
    var that = this;

    options.slice(0).forEach(function (option) {
      that.removeOption(option);
    });

    return this;
  };

  /**
   * Remove all options
   * @return self
   */
  prot.clearOptions = function () {
    this.removeOptions(this.getOptions());

    return this;
  };

  /**
   * Get the options
   * @return Array[Koine.Decorator.Dom.SelectOptionDecorator] option
   */
  prot.getOptions = function () {
    return this._options;
  };

  /**
   * Get the selected elements
   * @return Koine.Decorator.Dom.SelectOptionDecorator
   */
  prot.getSelected = function () {
    var selected = [];

    this.getOptions().forEach(function (option) {
      if (option.isSelected()) {
        selected.push(option);
      }
    });

    if (this.isMultiple()) {
      return selected;
    } else if (selected.length > 0) {
      return selected[0];
    }

    return null;
  };

  /**
   * Is it a multiple select?
   * @param object obj
   * @return boolean
   */
  prot.isMultiple = function () {
    return this.getAttribute("multiple") !== null;
  };

  /**
   * Add options based on a given element
   * @param object obj
   * @return self
   */
  prot.factoryFromElement = function (element) {
    var options = [].slice.call(element.querySelectorAll('option'));
    var that = this;

    options.forEach(function (option) {
      option = new Koine.Decorators.Dom.SelectOptionDecorator(option);
      that.addOption(option);
    });
  };

  Koine.Decorators.Dom.SelectDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
