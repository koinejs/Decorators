var exports = exports || undefined;

(function (Koine) {
  "use strinct";
  var BaseDecorator = Koine.Decorators.Dom.InputDecorator;

  var Decorator = function (element) {
    BaseDecorator.call(this, element);
  };

  Decorator.prototype = new BaseDecorator(1);

  var prot = Decorator.prototype;

  /**
   * Set the option label
   * @param string label
   * @return self
   */
  prot.setLabel = function (label) {
    this.setHtml(label);

    return this;
  };

  /**
   * Get the label
   * @return string
   */
  prot.getLabel = function () {
    return this.getHtml();
  };

  /**
   * If the element is selected
   * @return boolean
   */
  prot.isSelected = function () {
    return [false, undefined, null].indexOf(this.getAttribute("selected")) === -1;
  };

  /**
   * Mark the option as selected
   * @return self
   */
  prot.select = function () {
    this.setAttribute("selected", "selected");

    return this;
  };

  /**
   * Mark the option as unselected
   * @return self
   */
  prot.unselect = function () {
    this.removeAttribute("selected");

    return this;
  };

  /**
   * Toggle select option
   * @return self
   */
  prot.toggle = function () {
    if (this.isSelected()) {
      this.unselect();
    } else {
      this.select();
    }

    return this;
  };

  Koine.Decorators.Dom.SelectOptionDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
