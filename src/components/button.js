/**
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

import Core from './core';

export default class Button extends Core {
  get tag() {
    return 'button';
  }

  get enabled() {
    return this.domEl.enabled;
  }

  set enabled(value) {
    this.domEl.enabled = !!value;
  }

  tmpl(data) {
    if (data.type) {
      this.domEl.setAttribute('type', data.type);
    }
    
    return data.text;
  }

  $click(fn) {
    this.listen('click', (ev) => {
      fn({
        name: ev.target.name,
        form: ev.target.form
      }, ev);
    });
  }
}
