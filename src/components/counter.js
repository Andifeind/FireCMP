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
}
