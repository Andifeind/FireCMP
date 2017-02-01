import Utils from '../utils';

export default class Core {
  constructor(data) {
    this.__active = true;

    this.create(data);
  }

  /**
   * Sets the component tag. Defaults to 'section'
   *
   * @method tag
   *
   * @return {string} Returns the Component tag
   */
  get tag() {
    return 'section';
  }

  get active() {
    return this.__active;
  }

  set active(value) {
    this.__active = value;
    this.setStyle('display', value ? '' : 'none');
  }

  /**
   * Creates the element
   * @method create
   * @chainable
   * @return {object} Returns this value
   */
  create(data) {
    var tagName = this.constructor.name;
    if (typeof this.tag === 'object') {
      this.domEl = document.createElement(this.tag.tag);
      if (this.tag.attrs) {
        Object.keys(this.tag.attrs).forEach((key) => {
          this.domEl.setAttribute(key, this.tag.attrs[key]);
        });
      }
    } else {
      this.domEl = document.createElement(this.tag);
    }

    var cssClass = `firecmp-${Utils.snakeCase(tagName)}`;
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
  render(data) {
    var html = '';
    if (this.tmpl) {
      html = this.tmpl(data);
    }

    if (typeof html === 'object') {
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
  init() {
    return this;
  }

  /**
   * Creates the inner html for a component. This method can be overridden to add its own inner html
   *
   * @method tmpl
   * @returns {string} Returns the parsed inner html of a component
   */
  tmpl(data) {
    return String(data);
  }

  /**
   * Append CMP to an existing DOM element
   *
   * @method appendTo
   * @chainable
   */
  appendTo(container) {
    if (typeof container === 'string') {
      container = document.querySelector(container);
    }

    container.appendChild(this.domEl);
    return this;
  }

  /**
   * Sets a tag style. To unset it, leave value empty
   *
   * @method setStyle
   * @chainable
   */
  setStyle(style, value) {
    this.domEl.style[style] = value;
    return this;
  }

  /**
   * Checks if CMP has a given class
   *
   * @method hasClass
   * @returns {boolean} Returns true if CMP has a given class
   */
  hasClass(className) {
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
  addClass(className) {
    var classList = this.domEl.className;
    if (!classList) {
      this.domEl.className = className;
      return this;
    }

    var reg = new RegExp('\\b' + className + '\\b');
    if (!reg.test(classList)) {
      this.domEl.className += ' ' + className
    }

    return this;
  }

  /**
   * Removes a given class if CMP has it
   *
   * @method removeClass
   * @chainable
   */
  removeClass(className) {
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
  addAttribute(key, value) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function(name) {
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
  append(el) {
    var i;

    if (Array.isArray(el)) {
      for (i = 0; i < el.length; i++) {
        this.domEl.appendChild(el[i].domEl);
      }

      return;
    }
    else if (typeof el === 'string') {
      var docFrac = document.createDocumentFragment();
      var elType = /^<tr/.test(el) ? 'table' : 'div';
      var div = document.createElement(elType);
      div.innerHTML = el;
      for (i = 0; i < div.children.length; i++) {
        docFrac.appendChild(div.children[i]);
      }

      this.domEl.appendChild(docFrac);
    }
    else {
      this.domEl.appendChild(el.domEl);
    }

    return this;
  }

  listen(event, fn) {
    this.domEl.addEventListener(event, fn);
  }
}
