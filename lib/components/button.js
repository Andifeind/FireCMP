'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Button Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Renders a button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Expects:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ```js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   text: 'Button text' // the button text
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   type: 'submit' // button type, defaults to `button`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ```
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example {js}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * const cmp = new Button({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   text: 'Submit form'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * cmp.appendTo('.content');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example {html} Output:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <button type="button">Submit form</button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Button = function (_Core) {
  _inherits(Button, _Core);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  _createClass(Button, [{
    key: 'tmpl',
    value: function tmpl(data) {
      if (data.type) {
        this.domEl.setAttribute('type', data.type);
      }

      return data.text;
    }
  }, {
    key: '$click',
    value: function $click(fn) {
      this.listen('click', function (ev) {
        fn({
          name: ev.target.name,
          form: ev.target.form
        }, ev);
      });
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'button';
    }
  }, {
    key: 'enabled',
    get: function get() {
      return this.domEl.enabled;
    },
    set: function set(value) {
      this.domEl.enabled = !!value;
    }
  }]);

  return Button;
}(_core2.default);

exports.default = Button;