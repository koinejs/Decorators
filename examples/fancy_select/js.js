var Koine = Koine || {};
var input, select, $input, $select, $list, fancySelect, log;

var FancySelect = function (select, container) {
  var that = this;

  select.on('options:added', function () {
    this.trigger('change');
  });

  select.on('change', function () {
    that.render();
  });

  container.on('click', '.option', function () {
    var value = $(this).data('value');
    select.setValue(value);
  });

  this.select = select;
  this.container = container;
};

FancySelect.prototype.render = function () {
  log('fancy select rendered');
  var o = [];
  var select = this.select;

  this.select.getOptions().forEach(function (option) {
    var active = (option.getValue() == select.getValue()) ? 'active' : '';
    var a = [
      '<div data-value="', option.getValue() ,'" class="option ', active , '">',
      option.getValue(),
      '</div>'
    ];
    o.push(a.join(""));
  });

  this.container.html(o.join(""));
};

(function(jQuery, Koine) {
  $(document).ready(function () {
    $input  = $('#name');
    $select = $('#role');
    $list   = $('#log');
    input   = new Koine.Decorators.Dom.InputDecorator(document.getElementById('name'));
    select  = new Koine.Decorators.Dom.SelectDecorator(document.getElementById('role'));
    log     = function (message) {
      $list.prepend(['<li>-', new Date(), ':' , message, '</li>'].join(' '));
    };

    fancySelect = new FancySelect(select, $('#fancy-select'));

    $input.on("change", function () {
      input.trigger('change');
    });

    $select.on("change", function () {
      select.trigger('change');
    });


    select.on('change', function () {
      log('select changed to ' + this.getValue());
    });

    input.on('change', function () {
      var value = this.getValue();
      var option = select.createOption(value, value);
      select.addOption(option);
      log('input changed to ' + value);
    });
  });

})(jQuery, Koine);
