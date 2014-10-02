(function (Koine) {
    "use strinct";

    var Decorator = function (element) {
        if (!element) {
            throw new Error("Element required");
        }

        this._element = element;
    };

    Decorator.prototype = {

        /**
         * @return HTMLNode
         */
        getElement : function () {
            return this._element;
        },

        /**
         * Has class?
         * @param String className
         * @return boolean
         */
        hasClass : function (className) {
            return this.getElement().classList.contains(className);
        },

        /**
         * Add class to the element
         * @param String className
         * @return self
         */
        addClass : function (className) {
            if (!this.hasClass(className)) {
                this.getElement().classList.add(className);
            }

            return this;
        },

        /**
         * Removes class
         * @param String className
         * @return self
         */
        removeClass : function (className) {
            if (this.hasClass(className)) {
                this.getElement().classList.remove(className);
            }

            return this;
        },

        /**
         * Set attribute
         * @param String name
         * @param object value
         * @return self
         */
        setAttribute : function (name, value) {
            this.getElement().setAttribute(name, value);

            return this;
        },

        /**
         * Get an attribute
         * @param String name
         * @return object
         */
        getAttribute : function (name) {
            return this.getElement().getAttribute(name);
        },

        /**
         * Set the id
         * @param object value
         * @return self
         */
        setId : function (value) {
            return this.setAttribute('id', value);
        },

        /**
         * Get the id
         * @return object
         */
        getId : function () {
            return this.getAttribute('id');
        },

        /**
         * Set the html
         * @param string html
         * @return self
         */
        setHtml : function (html) {
            this.getElement().innerHTML = html;

            return this;
        },

        /**
         * Get the html
         * @return string
         */
        getHtml : function () {
            return this.getElement().innerHTML;
        }

    };

    Koine.Decorators                      = Koine.Decorators     || {};
    Koine.Decorators.Dom                  = Koine.Decorators.Dom || {};
    Koine.Decorators.Dom.ElementDecorator = Decorator;
})(typeof(exports) === "undefined" ? (this.Koine || (this.Koine = {})) : exports);
