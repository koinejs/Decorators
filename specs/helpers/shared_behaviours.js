function behavesLikeADomElementDecorator(describedClassName) {
    eval('var describedClass = ' + describedClassName);
    var subject, element;

    beforeEach(function () {
        element = document.createElement('div');
        subject = new describedClass(element);
    });

    describe(describedClassName, function () {
        it("inherits from Koine.Decorators.Dom.ElementDecorator", function () {
            var instance = (subject instanceof Koine.Decorators.Dom.ElementDecorator);
            expect(subject).toBeTruthy();
        });

        describe("#constructor()", function () {
            it("requires an html element", function () {
                expect(function() {
                    new describedClass();
                }).toThrow();
            });
        });

        describe("#getElement()", function () {
            it("returns true if the class exists", function () {
                expect(subject.getElement()).toBe(element);
            });
        });

        describe("#hasClass()", function () {
            it("returns true if the class exists", function () {
                element.classList.add('yeps');
                expect(subject.hasClass('nops')).toBeFalsy();
                expect(subject.hasClass('yeps')).toBeTruthy();
            });
        });

        describe("#addClass()", function () {
            it("adds a class", function () {
                var has = subject.addClass('yeps').hasClass('yeps');
                expect(has).toBeTruthy();
            });
        });

        describe("#removeClass()", function () {
            it("removes class", function () {
                var has = subject.addClass('yeps').removeClass('yeps').hasClass('yeps');
                expect(has).toBeFalsy();
            });
        });

        describe("#setAttribute()", function () {
            it("sets attribute", function () {
                subject.setAttribute('id', 'foo');
                expect(element.id).toBe('foo');
            });
        });

        describe("#getAttribute()", function () {
            it("gets an attribute", function () {
                var value = subject.setAttribute('id', 'foo').getAttribute('id');
                expect(value).toBe('foo');
            });
        });

        describe("#setId()", function () {
            it("sets the id", function () {
                var value = subject.setId('foo').getAttribute('id');
                expect(value).toBe('foo');
            });
        });

        describe("#getId()", function () {
            it("gets the id", function () {
                var value = subject.setId('foo').getId();
                expect(value).toBe('foo');
            });
        });

        describe("#setHtml()", function () {
            it("sets the inner html", function () {
                var html = subject.setHtml('foo').getElement().innerHTML;
                expect(html).toBe('foo');
            });
        });

        describe("#hetHtml()", function () {
            it("gets the inner html", function () {
                var html = subject.setHtml('foo').getHtml();
                expect(html).toBe('foo');
            });
        });
    });
};

function behavesLikeAnInputDecorator(describedClassName) {
    eval('var describedClass = ' + describedClassName);
    var subject, element, output = [];

    beforeEach(function () {
        element = document.createElement('input');
        subject = new describedClass(element);
    });

    describe("#setValue()", function () {
        it("sets the value", function () {
            var value = subject.setValue('foo').getElement().value;
            expect(value).toBe('foo');
        });

        it("triggers 'changed' when value changes", function () {
            subject.setValue('abc');

            subject.on('changed', function (e) {
                output.push(e.type);
                output.push(this.getValue());
                output.push(e.oldValue);
            });

            subject.setValue('foo').setValue('foo');
            expect(output).toEqual(['changed', 'foo', 'abc']);
        });

        it("triggers 'changed:value' when value changes", function () {
            subject.setValue('abc');
            subject.on('changed:value', function (e) {
                output.push(e.type);
                output.push(this.getValue());
                output.push(e.oldValue);
            });

            subject.setValue('foo').setValue('foo');
            expect(output).toEqual(['changed:value', 'foo', 'abc']);
        });
    });

    describe("#getValue()", function () {
        it("gets the value", function () {
            var value = subject.setValue('foo').getValue();
            expect(value).toBe('foo');
        });
    });
}
