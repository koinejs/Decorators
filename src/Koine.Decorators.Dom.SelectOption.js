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
   * Set the option label
   * @param string label
   * @return self
   */
  prop.setLabel = function (label) {
    this.setHtml(label);

    return this;
  };

  /**
   * Get the label
   * @return string
   */
  prop.getLabel = function () {
    return this.getHtml();
  };

  /**
   * If the element is selected
   * @return boolean
   */
  prop.isSelected = function () {
    return [false, undefined, null].indexOf(this.getAttribute("selected")) === -1;
  };

  /**
   * Mark the option as selected
   * @return self
   */
  prop.select = function () {
    this.setAttribute("selected", "selected");

    return this;
  };

  /**
   * Mark the option as unselected
   * @return self
   */
  prop.unselect = function () {
    this.removeAttribute("selected");

    return this;
  };

  /**
   * Toggle select option
   * @return self
   */
  prop.toggle = function () {
    if (this.isSelected()) {
      this.unselect();
    } else {
      this.select();
    }

    return this;
  };

  Koine.Decorators.Dom.SelectOption = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
