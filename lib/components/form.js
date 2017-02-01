'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _button = require('./button');

var _button2 = _interopRequireDefault(_button);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _inputPassword = require('./input-password');

var _inputPassword2 = _interopRequireDefault(_inputPassword);

var _inputText = require('./input-text');

var _inputText2 = _interopRequireDefault(_inputText);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Form component renders a form based on a FormSchema
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * FormSchema:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * { name: 'title', type: 'string', min: 3, max: 20 },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * { name: 'description', type: 'text', min: 3, max: 2000 },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * { name: 'category', type: 'category', min: 3, max: 200 },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * { name: 'timer', type: 'string', min: 3, max: 200, multiple: true },
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Form = function (_Core) {
  _inherits(Form, _Core);

  function Form() {
    _classCallCheck(this, Form);

    return _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).apply(this, arguments));
  }

  _createClass(Form, [{
    key: 'render',
    value: function render(data) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.schema[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          var CmpConstuctor = this.getConstructor(item.type);
          var cmp = new CmpConstuctor(item);
          cmp.value = data.data[item.name] || '';
          cmp.appendTo(this.domEl);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'getConstructor',
    value: function getConstructor(type) {
      if (type === 'string') {
        return _input2.default;
      }

      if (type === 'text') {
        return _inputText2.default;
      }

      if (type === 'password') {
        return _inputPassword2.default;
      }

      if (type === 'button' || type === 'submit') {
        return _button2.default;
      }
    }
  }, {
    key: 'getData',
    value: function getData() {
      var data = {};
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.domEl.elements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var el = _step2.value;

          if (!el.name) {
            continue;
          }

          data[el.name] = el.value;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return data;
    }
  }, {
    key: '$submit',
    value: function $submit(fn) {
      var _this2 = this;

      this.listen('submit', function (ev) {
        ev.preventDefault();
        fn(_this2.getData(), ev);
      });
    }
  }, {
    key: 'tag',
    get: function get() {
      return {
        tag: 'form',
        attrs: {
          action: ''
        }
      };
    }
  }]);

  return Form;
}(_core2.default);

exports.default = Form;