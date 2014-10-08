Koine Decorators
-----------------------

Decorators for some dom elements

Code information:

[![Build Status](https://travis-ci.org/koinejs/Decorators.png?branch=master)](https://travis-ci.org/koinejs/Decorators)
[![Coverage Status](https://coveralls.io/repos/koinejs/Decorators/badge.png?branch=master)](https://coveralls.io/r/koinejs/Decorators?branch=master)
[![Code Climate](https://codeclimate.com/github/koinejs/Decorators.png)](https://codeclimate.com/github/koinejs/Decorators)

Package information:

[![Dependency Status](https://gemnasium.com/koinejs/Decorators.png)](https://gemnasium.com/koinejs/Decorators)


### Usage

```javascript
var select = new Koine.Decorators.Dom.SelectDecorator(document.getElementById('some-select'));
var option = select.createOption('value', 'label', checked);

select.addOption(option);
```

#### Events

##### Koine.Decorators.Dom.SelectDecorator

- ```change``` - when the value change
- ```options:added``` - when an option was added
- ```options:remove``` - when an option was added

### Installing

@TODO

### Issues/Features proposals

[Here](https://github.com/koinejs/Decorators/issues) is the issue tracker.

## Contributing

Please refer to the [contribuiting guide](https://github.com/koinejs/Decorators/blob/master/CONTRIBUTING.md).

### Lincense
[MIT](MIT-LICENSE)

### Authors

- [Marcelo Jacobus](https://github.com/mjacobus)
