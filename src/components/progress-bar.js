/**
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

import Core from './core';

export default class ProgressBar extends Core {
  init() {
    this.__value = 0;
  }

  get tag() {
    return 'span';
  }

  get value() {
    return this.__value;
  }

  set value(val) {
    this.__value = Math.max(0, Math.min(val, 100));

    this.changeProgress();
  }

  tmpl(data) {
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

  changeProgress() {
    if (this.isVertical) {
      this.bar.style.height = this.__value + '%';
    }
    else {
      this.bar.style.width = this.__value + '%';
    }

    if (this.__text) {
      this.bar.innerHTML = this.__text.replace('${progress}', `${this.__value}`);
    }
  }
}
