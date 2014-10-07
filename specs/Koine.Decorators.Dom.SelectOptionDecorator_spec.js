describe("Koine.Decorators.Dom.SelectOption", function () {

  behavesLikeADomElementDecorator("Koine.Decorators.Dom.SelectOptionDecorator");
  behavesLikeAnInputDecorator("Koine.Decorators.Dom.SelectOptionDecorator");

  var element, subject;

  beforeEach(function () {
    element = document.createElement('options');
    element.setAttribute('value', 'foo');
    subject = new Koine.Decorators.Dom.SelectOptionDecorator(element);
  });

  describe("#setLabel()", function () {
    it("sets the label of the element", function () {
      subject.setLabel('HTML');
      expect(element.innerHTML).toEqual('HTML');
    });
  });

  describe("#getLabel()", function () {
    it("gets the label of the element", function () {
      element.innerHTML = 'php';
      expect(subject.getLabel()).toEqual('php');
    });
  });

  describe("#isSelected()", function () {
    it("returns true/false indicationg if it is selected or not", function () {
      expect(subject.isSelected()).toBeFalsy();
      subject.setAttribute("selected", "selected");
      expect(subject.isSelected()).toBeTruthy();
    });
  });

  describe("#select()", function () {
    it("marks option as selected", function () {
      subject.select();
      expect(subject.isSelected()).toBeTruthy();
    });
  });

  describe("#unselect()", function () {
    it("unmarks option as selected", function () {
      subject.select().unselect();
      expect(subject.isSelected()).toBeFalsy();
    });
  });

  describe("#toggle()", function () {
    it("marks/unmarks option as selected", function () {
      subject.toggle();
      expect(subject.isSelected()).toBeTruthy();

      subject.toggle().toggle().toggle();
      expect(subject.isSelected()).toBeFalsy();
    });
  });
});

