/**
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
import Core from './core';

export default class Counter extends Core {
  get tag() {
    return 'span';
  }

  get value() {
    return this.__value;
  }

  set value(val) {
    this.__value = val;
    this.domEl.textContent = val;
  }

  tmpl(data) {
    return data && data.value ? parseInt(data.value) : 0;
  }

  init(data) {
    super.init(data);
    this.__value = data && data.value ? parseInt(data.value) : 0;
    return this;
  }
}
