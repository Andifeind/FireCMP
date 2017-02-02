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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ProgressBar Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Renders a progress-bar
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Expects:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ```js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   text: '34%' // the button text
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   value: 34 // button type, defaults to `button`
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ```
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example {js}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * const cmp = new ProgressBar({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   text: '35%',
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   value: 35,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   vertical: true // Draws a vertical bar
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * cmp.appendTo('.content');
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example {html} Output:
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * <span type="firecmp-progress-bar">34%</span>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var ProgressBar = function (_Core) {
  _inherits(ProgressBar, _Core);

  function ProgressBar() {
    _classCallCheck(this, ProgressBar);

    return _possibleConstructorReturn(this, (ProgressBar.__proto__ || Object.getPrototypeOf(ProgressBar)).apply(this, arguments));
  }

  _createClass(ProgressBar, [{
    key: 'init',
    value: function init() {
      this.__value = 0;
    }
  }, {
    key: 'tmpl',
    value: function tmpl(data) {
      this.isVertical = !!data.vertical;
      this.bar = document.createElement('span');
      this.bar.className = 'progress';

      if (this.isVertical) {
        this.addClass('vertical');
      }

      if (data.text) {
        this.__text = data.text;
      }

      this.changeProgress();
      return this.bar;
    }
  }, {
    key: 'changeProgress',
    value: function changeProgress() {
      if (this.isVertical) {
        this.bar.style.height = this.__value + '%';
      } else {
        this.bar.style.width = this.__value + '%';
      }

      if (this.__text) {
        this.bar.innerHTML = this.__text.replace('${progress}', '' + this.__value);
      }
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'span';
    }
  }, {
    key: 'value',
    get: function get() {
      return this.__value;
    },
    set: function set(val) {
      this.__value = Math.max(0, Math.min(val, 100));

      this.changeProgress();
    }
  }]);

  return ProgressBar;
}(_core2.default);

exports.default = ProgressBar;