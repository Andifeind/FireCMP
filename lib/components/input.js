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
      this.name = data.name;
      var id = 'firecmp-input-' + data.name;
      var docFrag = document.createDocumentFragment();
      if (data.label) {
        this.labelEl = document.createElement('label');
        this.labelEl.setAttribute('for', id);
        this.labelEl.innerHTML = data.label;
        docFrag.appendChild(this.labelEl);
      }

      this.inputEl = document.createElement('input');
      this.inputEl.setAttribute('type', this.type);
      this.inputEl.setAttribute('name', data.name);
      this.inputEl.setAttribute('id', id);
      this.value = data.value;

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
      var _this2 = this;

      this.listen('change', function (ev) {
        fn({
          name: _this2.name,
          value: _this2.value
        }, ev);
      });
    }
  }, {
    key: 'label',
    set: function set(value) {
      this.labelEl.textContent = value;
    }
  }, {
    key: 'type',
    get: function get() {
      return 'text';
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