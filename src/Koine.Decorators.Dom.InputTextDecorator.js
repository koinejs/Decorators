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
        if (value !== this.getValue()) {
            this.getElement().setAttribute('value', value);
            // this.trigger(new Koine.Publisher.EventType('changed'));
            // this.trigger(new Koine.Publisher.EventType('changed:value'));
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

    // Koine.Publisher.wrap(Decorator);

    Koine.Decorators.Dom.InputTextDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
