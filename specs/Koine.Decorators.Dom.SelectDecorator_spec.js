describe("Koine.Decorators.Dom.SelectDecorator", function () {

  behavesLikeADomElementDecorator("Koine.Decorators.Dom.SelectDecorator");
  behavesLikeAnInputDecorator("Koine.Decorators.Dom.SelectDecorator");

  var element, subject, a, b, c;

  beforeEach(function () {
    element = document.createElement('select');
    subject = new Koine.Decorators.Dom.SelectDecorator(element);
    a = subject.createOption(1, 1);
    b = subject.createOption(2, 2);
    c = subject.createOption(3, 3);
  });

  describe("constructor", function () {
    it("reads options from the given element", function () {
      var select = document.createElement('select');
      var option1 = document.createElement('option');
      var option2 = document.createElement('option');
      select.appendChild(option1);
      select.appendChild(option2);

      option1.value = "1";
      option1.innerHTML = 'one';
      option2.value = "2";
      option2.innerHTML = 'two';
      option2.setAttribute("selected", true);

      subject = new Koine.Decorators.Dom.SelectDecorator(select);
      expect(subject.getOptions().length).toEqual(2);

      // sets value
      expect(subject.getOptions()[0].getValue()).toEqual('1');
      expect(subject.getOptions()[1].getValue()).toEqual('2');

      // sets label
      expect(subject.getOptions()[0].getLabel()).toEqual('one');
      expect(subject.getOptions()[1].getLabel()).toEqual('two');

      // sets active
      expect(subject.getOptions()[0].isSelected()).toBeFalsy();
      expect(subject.getOptions()[1].isSelected()).toBeTruthy();
    });
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

  describe("#removeOption()", function () {
    it("removes an option from the beggining of the array", function () {
      subject.addOptions([a, b, c]).removeOption(a);
      expect(subject.getOptions()).toEqual([b, c]);
    });

    it("removes an option from the end of the array", function () {
      subject.addOptions([a, b, c]).removeOption(c);
      expect(subject.getOptions()).toEqual([a, b]);
    });

    it("removes an option from the middle of the array", function () {
      subject.addOptions([a, b, c]).removeOption(b);
      expect(subject.getOptions()).toEqual([a, c]);
    });

    it("fires options:removed", function () {
      var output = '';
      subject.on('options:removed', function (e) {
        output = e.option;
      });
      subject.addOptions([a, b, c]).removeOption(b);
      expect(output).toBe(b);
    });
  });

  describe("#clearOptions()", function () {
    it("removes all options", function () {
      subject.addOptions([a, b, c]).clearOptions();
      expect(subject.getOptions().length).toEqual(0);
    });
  });

  describe("#removeOptions()", function () {
    it("removes options", function () {
      subject.addOptions([a, b, c]).removeOptions([a, c]);
      expect(subject.getOptions()).toEqual([b]);
    });
  });

  describe("#getSelected()", function () {
    describe("when select is not multiple", function () {
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

    describe("when select is multiple", function () {
      beforeEach(function () {
        subject.setAttribute("multiple", "multiple");
        subject.addOptions([a, b, c]);
        a.select();
        c.select();
      });

      it("return an array of selected options", function () {
        expect(subject.getSelected()).toEqual([a, c]);
      });
    });
  });
});

