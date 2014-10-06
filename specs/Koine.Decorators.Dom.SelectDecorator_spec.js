describe("Koine.Decorators.Dom.SelectDecorator", function () {

  behavesLikeADomElementDecorator("Koine.Decorators.Dom.SelectDecorator");

  var element, subject, a, b, c;

  beforeEach(function () {
    element = document.createElement('select');
    subject = new Koine.Decorators.Dom.SelectDecorator(element);
    a = subject.createOption(1, 1);
    b = subject.createOption(2, 2);
    c = subject.createOption(3, 3);
  });

  describe("#createOption()", function () {
    it("creates an option", function () {
      var option1 = subject.createOption(1, "foo", false),
          option2 = subject.createOption(2, "bar", true);

      expect(option1.getValue()).toEqual("1");
      expect(option1.getLabel()).toEqual("foo");
      expect(option1.isSelected()).toBeFalsy();

      expect(option2.getValue()).toEqual("2");
      expect(option2.getLabel()).toEqual("bar");
      expect(option2.isSelected()).toBeTruthy();
    });
  });

  describe("#addOption()", function () {
    var added = [];

    it("adds an option", function () {
      subject.addOption(a).addOption(b).addOption(c);
      expect(subject.getOptions()).toEqual([a, b, c]);
    });

    it("adds child to the select elemenet", function () {
      var method = spyOn(subject.getElement(), 'appendChild');

      subject.addOption(a);
      expect(method).toHaveBeenCalledWith(a.getElement());
    });

    it("triggers option:added", function () {
      subject.on('options:added', function (e) {
        added.push(e.option.getValue());
        added.push(e.target);
      });

      subject.addOption(a).addOption(b).addOption(c);
      expect(added).toEqual(['1', subject, '2', subject, '3', subject]);
    });
  });

  describe("#addOptions()", function () {
    it("adds options", function () {
      subject.addOptions([a, b, c]);
      expect(subject.getOptions()).toEqual([a, b, c]);
    });
  });

  describe("#setValue()", function () {
    it("selects an option", function () {
      subject.addOptions([a, b, c]);

      subject.setValue(1);

      expect(a.isSelected()).toBeTruthy();
      expect(b.isSelected()).toBeFalsy();
      expect(c.isSelected()).toBeFalsy();

      subject.setValue(2);

      expect(a.isSelected()).toBeFalsy();
      expect(b.isSelected()).toBeTruthy();
      expect(c.isSelected()).toBeFalsy();
    });

    it("triggers changed", function () {
      var o = [];

      subject.addOptions([a, b, c]);
      subject.on('change', function (e) {
        o.push(e.target);
      });

      subject.setValue(1);

      expect(o).toEqual([subject]);
    });
  });

  describe("#getValue()", function () {
    it("gets the value of the selected element", function () {
      element.setAttribute("value", "1");
      value = subject.getValue();
      expect(value).toBe('1');

      element.setAttribute("value", "2");
      value = subject.getValue();
      expect(value).toBe('2');
    });

    it("returns null when nothing is selected", function () {
      expect(subject.getValue()).toBeNull();
    });
  });

  describe("#getSelected()", function () {
    it("returns the selected option", function () {
      subject.addOptions([a, b, c]);

      b.select();
      expect(subject.getSelected()).toBe(b);

      b.unselect();
      c.select();
      expect(subject.getSelected()).toBe(c);
    });

    it("returns null when no option is selected", function () {
      expect(subject.getSelected()).toBeNull();
    });
  });
});

