import Input from './input';

export default class Checkbox extends Input {
  get type() {
    return 'checkbox';
  }

  set value(val) {
    this.inputEl.checked = !!val;
  }

  get value() {
    return this.inputEl.checked;
  }
}
