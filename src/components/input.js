import Core from './core';

export default class Input extends Core {
  set label(value) {
    this.labelEl.textContent = value;
  }

  get type() {
    return 'text';
  }

  set value(val) {
    this.inputEl.value = val;
  }

  get value() {
    return this.inputEl.value;
  }

  tmpl(data) {
    this.name = data.name;
    const id = `firecmp-input-${data.name}`;
    const docFrag = document.createDocumentFragment();
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
  $change(fn) {
    this.listen('change', (ev) => {
      fn({
        name: this.name,
        value: this.value
      }, ev);
    });
  }
}
