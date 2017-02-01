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

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Core) {
  _inherits(Input, _Core);

  function Input() {
    _classCallCheck(this, Input);

    return _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).apply(this, arguments));
  }

  _createClass(Input, [{
    key: 'tmpl',
    value: function tmpl(data) {
      var id = 'firecmp-input-' + data.name;
      this.labelEl = document.createElement('label');
      this.labelEl.setAttribute('id', id);

      this.inputEl = document.createElement('textarea');
      this.inputEl.setAttribute('name', data.name);
      this.inputEl.setAttribute('for', id);
      this.inputEl.value = data.value;

      var docFrag = document.createDocumentFragment();
      docFrag.appendChild(this.labelEl);
      docFrag.appendChild(this.inputEl);
      return docFrag;
    }

    /**
     * Listen on value changes
     *
     * @method $change
     *
     * @param {function} fn Event handler
     */

  }, {
    key: '$change',
    value: function $change(fn) {
      this.inputEl.addEventListener('change', function (ev) {
        fn({
          name: ev.currentTarget.name,
          value: ev.currentTarget.value
        }, ev);
      });
    }
  }, {
    key: 'label',
    set: function set(value) {
      this.labelEl.textContent = value;
    }
  }, {
    key: 'value',
    set: function set(val) {
      this.inputEl.value = val;
    },
    get: function get() {
      return this.inputEl.value;
    }
  }]);

  return Input;
}(_core2.default);

exports.default = Input;