(function (root, factory) {
    /*global define:false */

    if (typeof define === 'function' && define.amd) {
        define('FireCMP', [], factory);
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        root.FireCMP = factory();
    }
}(this, function () {
    // 'use strict';

    var deps = [],
        args = Array.prototype.slice.call(arguments);

    var lastCache;
    var require = function(file) {

        if (deps.indexOf(file) !== -1) {
            return args[deps.indexOf(file)];
        }

        if (require.alias && require.alias[file]) {
            file = require.alias[file];
        }

        file = require.resolve(file, this ? this.file : null);

        var module = {
            exports: {},
            file: file
        };

        lastCache = require.cache;
        if (require.cache[file]) {

            if (require.cache[file].obj) {
                return require.cache[file].obj;
            }

            require.cache[file].fn(module, module.exports, require.bind(module));
            require.cache[file].obj = module.exports || {};
            return require.cache[file].obj;
        }
        else {
            throw new Error('Module ' + file + ' not found!');
        }
    };

    require.resolve = function(path, parent) {
        parent = parent || '';

        var resolved = [];
        if (path.charAt(0) === '.') {
            var newPath = parent;
            newPath = newPath.split('/');
            newPath.pop();
            newPath = newPath.concat(path.split('/'));

            newPath.forEach(function(p) {
                if (p === '..') {
                    resolved.pop();
                    return;
                }
                else if (p === '.' || p === '') {
                    return;
                }

                resolved.push(p);
            });

            if (!parent ||parent.charAt(0) === '.') {
                resolved.unshift('.');
            }
        }
        else {
            return path;
        }

        resolved = resolved.join('/');
        if (!/\.js(on)?$/.test(resolved)) {
            resolved += '.js';
        }

        return resolved;
    };

    require.register = function(alias, path, fn) {
        if (arguments.length === 2) {
            fn = path;
            path = alias;
            alias= null;
        }

        require.cache[path] = {fn: fn, calls: 0};
        if (alias) {
            require.alias[alias] = path;
        }
    };

    require.cache = {};
    require.alias = {};

require.register('./index.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = exports.Select = exports.Radiobox = exports.ProgressBar = exports.Password = exports.List = exports.Input = exports.Form = exports.Counter = exports.Core = exports.Checkbox = exports.Button = undefined;

var _button = require('./components/button');

var _button2 = _interopRequireDefault(_button);

var _core = require('./components/core');

var _core2 = _interopRequireDefault(_core);

var _checkbox = require('./components/checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _counter = require('./components/counter');

var _counter2 = _interopRequireDefault(_counter);

var _form = require('./components/form');

var _form2 = _interopRequireDefault(_form);

var _input = require('./components/input');

var _input2 = _interopRequireDefault(_input);

var _list = require('./components/list');

var _list2 = _interopRequireDefault(_list);

var _password = require('./components/password');

var _password2 = _interopRequireDefault(_password);

var _progressBar = require('./components/progress-bar');

var _progressBar2 = _interopRequireDefault(_progressBar);

var _radiobox = require('./components/radiobox');

var _radiobox2 = _interopRequireDefault(_radiobox);

var _select = require('./components/select');

var _select2 = _interopRequireDefault(_select);

var _text = require('./components/text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Button = _button2.default;
exports.Checkbox = _checkbox2.default;
exports.Core = _core2.default;
exports.Counter = _counter2.default;
exports.Form = _form2.default;
exports.Input = _input2.default;
exports.List = _list2.default;
exports.Password = _password2.default;
exports.ProgressBar = _progressBar2.default;
exports.Radiobox = _radiobox2.default;
exports.Select = _select2.default;
exports.Text = _text2.default;
});
require.register('./components/button.js', function(module, exports, require) { 'use strict';

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
});
require.register('./components/core.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Core = function () {
  function Core(data) {
    _classCallCheck(this, Core);

    this.__active = true;

    this.create(data || {});
  }

  /**
   * Sets the component tag. Defaults to 'section'
   *
   * @method tag
   *
   * @return {string} Returns the Component tag
   */


  _createClass(Core, [{
    key: 'create',


    /**
     * Creates the element
     * @method create
     * @chainable
     * @return {object} Returns this value
     */
    value: function create(data) {
      var _this = this;

      var tagName = this.constructor.name;
      if (_typeof(this.tag) === 'object') {
        this.domEl = document.createElement(this.tag.tag);
        if (this.tag.attrs) {
          Object.keys(this.tag.attrs).forEach(function (key) {
            _this.domEl.setAttribute(key, _this.tag.attrs[key]);
          });
        }
      } else {
        this.domEl = document.createElement(this.tag);
      }

      var cssClass = 'firecmp-' + _utils2.default.snakeCase(tagName);
      if (this.cssClass) {
        cssClass += ' ' + this.cssClass;
      }

      if (this.attrs) {
        for (var attr in this.attrs) {
          if (this.attrs.hasOwnProperty(attr)) {
            this.domEl.setAttribute(attr, this.attrs[attr]);
          }
        }
      }

      this.domEl.className = cssClass;
      this.init(data);
      this.render(data);
      if (this.onElementReady) {
        this.onElementReady();
      }

      return this;
    }

    /**
     * Renders the elements content
     * @method render
     *
     * @param {object} data Render data
     *
     * @chainable
     * @return {object} Returns this value
     */

  }, {
    key: 'render',
    value: function render(data) {
      var html = '';
      if (this.tmpl) {
        html = this.tmpl(data);
      }

      if ((typeof html === 'undefined' ? 'undefined' : _typeof(html)) === 'object') {
        while (this.domEl.firstChild) {
          this.domEl.removeChild(this.domEl.firstChild);
        }

        this.domEl.appendChild(html);
      } else {
        this.domEl.innerHTML = html;
      }

      return this;
    }

    /**
     * Called once Component has been created, but before it gets rendered
     *
     * @method init
     * @chainable
     */

  }, {
    key: 'init',
    value: function init() {
      return this;
    }

    /**
     * Creates the inner html for a component. This method can be overridden to add its own inner html
     *
     * @method tmpl
     * @returns {string} Returns the parsed inner html of a component
     */

  }, {
    key: 'tmpl',
    value: function tmpl(data) {
      return String(data.text);
    }

    /**
     * Append CMP to an existing DOM element
     *
     * @method appendTo
     * @chainable
     */

  }, {
    key: 'appendTo',
    value: function appendTo(container) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }

      container.appendChild(this.domEl);
      return this;
    }

    /**
     * Prepend CMP to an existing DOM element
     *
     * @method prependTo
     * @chainable
     */

  }, {
    key: 'prependTo',
    value: function prependTo(container) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }

      if (container.firstChild) {
        container.insertBefore(this.domEl, container.firstChild);
      } else {
        container.appendChild(this.domEl);
      }
      return this;
    }

    /**
     * Replace all childs with CMP
     *
     * @method replaceAll
     * @chainable
     */

  }, {
    key: 'replaceAll',
    value: function replaceAll(container) {
      if (typeof container === 'string') {
        container = document.querySelector(container);
      }

      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

      this.appendTo(container);
      return this;
    }

    /**
     * Sets a tag style. To unset it, leave value empty
     *
     * @method setStyle
     * @chainable
     */

  }, {
    key: 'setStyle',
    value: function setStyle(style, value) {
      this.domEl.style[style] = value;
      return this;
    }

    /**
     * Checks if CMP has a given class
     *
     * @method hasClass
     * @returns {boolean} Returns true if CMP has a given class
     */

  }, {
    key: 'hasClass',
    value: function hasClass(className) {
      var classList = this.domEl.className;
      if (!classList) {
        this.domEl.className = className;
        return false;
      }

      var reg = new RegExp('\\b' + className + '\\b');
      return reg.test(classList);
    }

    /**
     * Sets a class if CMP hasn't it already
     *
     * @method addClass
     * @chainable
     */

  }, {
    key: 'addClass',
    value: function addClass(className) {
      var classList = this.domEl.className;
      if (!classList) {
        this.domEl.className = className;
        return this;
      }

      var reg = new RegExp('\\b' + className + '\\b');
      if (!reg.test(classList)) {
        this.domEl.className += ' ' + className;
      }

      return this;
    }

    /**
     * Removes a given class if CMP has it
     *
     * @method removeClass
     * @chainable
     */

  }, {
    key: 'removeClass',
    value: function removeClass(className) {
      var classList = this.domEl.className;
      var reg = new RegExp(' ?\\b' + className + '\\b ?');
      this.domEl.className = classList.replace(reg, '');
      return this;
    }

    /**
     * Add a CMP attribute
     *
     * @method addAttribute
     * @chainable
     */

  }, {
    key: 'addAttribute',
    value: function addAttribute(key, value) {
      if ((typeof key === 'undefined' ? 'undefined' : _typeof(key)) === 'object') {
        Object.keys(key).forEach(function (name) {
          this.domEl.setAttribute(name, key[name]);
        });

        return this;
      }

      this.domEl.setAttribute(key, value);
      return this;
    }

    /**
     * Append one or multiple elements to the Component
     *
     * @method append
     * @param  {Object|Array|String} el Elements to been append
     *
     * @chainable
     * @return {Object}    Returns this value
     */

  }, {
    key: 'append',
    value: function append(el) {
      var i;

      if (Array.isArray(el)) {
        for (i = 0; i < el.length; i++) {
          this.domEl.appendChild(el[i].domEl);
        }

        return;
      } else if (typeof el === 'string') {
        var docFrac = document.createDocumentFragment();
        var elType = /^<tr/.test(el) ? 'table' : 'div';
        var div = document.createElement(elType);
        div.innerHTML = el;
        for (i = 0; i < div.children.length; i++) {
          docFrac.appendChild(div.children[i]);
        }

        this.domEl.appendChild(docFrac);
      } else {
        this.domEl.appendChild(el.domEl);
      }

      return this;
    }
  }, {
    key: 'listen',
    value: function listen(event, fn) {
      this.domEl.addEventListener(event, fn);
    }
  }, {
    key: 'tag',
    get: function get() {
      return 'section';
    }
  }, {
    key: 'active',
    get: function get() {
      return this.__active;
    },
    set: function set(value) {
      this.__active = value;
      this.setStyle('display', value ? '' : 'none');
    }
  }]);

  return Core;
}();

exports.default = Core;
});
require.register('./utils.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * FireCMP Utils
 */

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'snakeCase',
    value: function snakeCase(str) {
      return str.replace(/[A-Z]/g, function (match, offset) {
        return (offset ? '-' : '') + match.toLowerCase();
      });
    }
  }]);

  return Utils;
}();

exports.default = Utils;
});
require.register('./components/checkbox.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = function (_Input) {
  _inherits(Checkbox, _Input);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    return _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).apply(this, arguments));
  }

  _createClass(Checkbox, [{
    key: 'type',
    get: function get() {
      return 'checkbox';
    }
  }, {
    key: 'value',
    set: function set(val) {
      this.inputEl.checked = !!val;
    },
    get: function get() {
      return this.inputEl.checked;
    }
  }]);

  return Checkbox;
}(_input2.default);

exports.default = Checkbox;
});
require.register('./components/input.js', function(module, exports, require) { 'use strict';

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
});
require.register('./components/counter.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Counter Component
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Renders a counter element
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @example {js}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * const counter = new Counter({
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *   value: 2
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * });
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * // change value
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * counter.value = 3;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */


var Counter = function (_Core) {
  _inherits(Counter, _Core);

  function Counter() {
    _classCallCheck(this, Counter);

    return _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).apply(this, arguments));
  }

  _createClass(Counter, [{
    key: 'tmpl',
    value: function tmpl(data) {
      return data && data.value ? parseInt(data.value) : 0;
    }
  }, {
    key: 'init',
    value: function init(data) {
      _get(Counter.prototype.__proto__ || Object.getPrototypeOf(Counter.prototype), 'init', this).call(this, data);
      this.__value = data && data.value ? parseInt(data.value) : 0;
      return this;
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
      this.__value = val;
      this.domEl.textContent = val;
    }
  }]);

  return Counter;
}(_core2.default);

exports.default = Counter;
});
require.register('./components/form.js', function(module, exports, require) { 'use strict';

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
});
require.register('./components/input-password.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Password = function (_Input) {
  _inherits(Password, _Input);

  function Password() {
    _classCallCheck(this, Password);

    return _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).apply(this, arguments));
  }

  _createClass(Password, [{
    key: 'type',
    get: function get() {
      return 'password';
    }
  }]);

  return Password;
}(_input2.default);

exports.default = Password;
});
require.register('./components/input-text.js', function(module, exports, require) { 'use strict';

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
});
require.register('./components/list.js', function(module, exports, require) { 'use strict';

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

var List = function (_Core) {
  _inherits(List, _Core);

  function List() {
    _classCallCheck(this, List);

    return _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).apply(this, arguments));
  }

  _createClass(List, [{
    key: 'item',


    /**
     * Sets an item template
     */
    value: function item(data) {
      return '<li class="item">' + data + '</li>';
    }
  }, {
    key: 'render',
    value: function render(data) {
      if (Array.isArray(data)) {
        data.forEach(function (item) {
          this.push(item);
        }, this);
      }
    }
  }, {
    key: 'push',
    value: function push(data) {
      this.append(this.item(data));
    }
  }, {
    key: 'pushMany',
    value: function pushMany(dataArr) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = dataArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var data = _step.value;

          this.push(data);
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
    key: 'tag',
    get: function get() {
      return 'ul';
    }
  }]);

  return List;
}(_core2.default);

exports.default = List;
});
require.register('./components/password.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Password = function (_Input) {
  _inherits(Password, _Input);

  function Password() {
    _classCallCheck(this, Password);

    return _possibleConstructorReturn(this, (Password.__proto__ || Object.getPrototypeOf(Password)).apply(this, arguments));
  }

  _createClass(Password, [{
    key: 'type',
    get: function get() {
      return 'password';
    }
  }]);

  return Password;
}(_input2.default);

exports.default = Password;
});
require.register('./components/progress-bar.js', function(module, exports, require) { 'use strict';

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
});
require.register('./components/radiobox.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radiobox = function (_Input) {
  _inherits(Radiobox, _Input);

  function Radiobox() {
    _classCallCheck(this, Radiobox);

    return _possibleConstructorReturn(this, (Radiobox.__proto__ || Object.getPrototypeOf(Radiobox)).apply(this, arguments));
  }

  _createClass(Radiobox, [{
    key: 'tmpl',
    value: function tmpl(data) {
      var _this2 = this;

      this.name = data.name;
      var id = 'firecmp-input-' + data.name;
      var docFrag = document.createDocumentFragment();
      if (data.label) {
        this.labelEl = document.createElement('label');
        this.labelEl.innerHTML = data.label;
        this.labelEl.addEventListener('click', function () {
          _this2.selectNext();
        });
        docFrag.appendChild(this.labelEl);
      }

      var num = 0;
      this.inputEls = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          num += 1;
          var itemId = id + ('0' + num).substr(-2);
          var el = document.createElement('input');
          el.setAttribute('type', 'radio');
          el.setAttribute('name', data.name);
          el.setAttribute('value', item.value);
          el.setAttribute('id', itemId);
          docFrag.appendChild(el);
          this.inputEls.push(el);

          if (item.label) {
            var lbl = document.createElement('label');
            lbl.setAttribute('for', itemId);
            lbl.innerHTML = item.label;
            docFrag.appendChild(lbl);
          }
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

      this.value = data.value;
      return docFrag;
    }
  }, {
    key: 'selectNext',
    value: function selectNext() {
      var isNext = false;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.inputEls[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var el = _step2.value;

          if (isNext) {
            el.checked = true;
            return this;
          }

          isNext = el.checked;
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

      this.inputEls[0].checked = true;
    }
  }, {
    key: 'value',
    set: function set(val) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.inputEls[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var el = _step3.value;

          if (el.value === val) {
            el.checked = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    },
    get: function get() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.inputEls[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var el = _step4.value;

          if (el.checked) {
            return el.value;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }]);

  return Radiobox;
}(_input2.default);

exports.default = Radiobox;
});
require.register('./components/select.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Select = function (_Input) {
  _inherits(Select, _Input);

  function Select() {
    _classCallCheck(this, Select);

    return _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).apply(this, arguments));
  }

  _createClass(Select, [{
    key: 'tmpl',
    value: function tmpl(data) {
      var _this2 = this;

      this.name = data.name;
      var id = 'firecmp-select-' + data.name;
      var docFrag = document.createDocumentFragment();
      if (data.label) {
        this.labelEl = document.createElement('label');
        this.labelEl.innerHTML = data.label;
        this.labelEl.addEventListener('click', function () {
          _this2.selectNext();
        });
        docFrag.appendChild(this.labelEl);
      }

      var select = document.createElement('select');
      select.setAttribute('name', data.name);
      select.setAttribute('size', data.size || 1);

      var num = 0;
      this.options = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = data.options[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          num += 1;
          var itemId = id + ('0' + num).substr(-2);
          var el = document.createElement('option');
          el.setAttribute('value', item.value);
          el.setAttribute('id', itemId);
          el.innerHTML = item.label;
          select.appendChild(el);
          this.options.push(el);
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

      docFrag.appendChild(select);
      this.value = data.value;
      return docFrag;
    }
  }, {
    key: 'selectNext',
    value: function selectNext() {
      var isNext = false;
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.options[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var el = _step2.value;

          if (isNext) {
            el.selected = true;
            return this;
          }

          isNext = el.selected;
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

      this.options[0].selected = true;
    }
  }, {
    key: 'value',
    set: function set(val) {
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = this.options[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var el = _step3.value;

          if (el.value === val) {
            el.selected = true;
            break;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    },
    get: function get() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = this.options[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var el = _step4.value;

          if (el.selected) {
            return el.value;
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }]);

  return Select;
}(_input2.default);

exports.default = Select;
});
require.register('./components/text.js', function(module, exports, require) { 'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Text = function (_Input) {
  _inherits(Text, _Input);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).apply(this, arguments));
  }

  _createClass(Text, [{
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

  return Text;
}(_input2.default);

exports.default = Text;
});
return require('./index.js');

}));
