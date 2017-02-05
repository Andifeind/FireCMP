import Input from './input';

export default class Text extends Input {
  set label(value) {
    this.labelEl.textContent = value;
  }

  set value(val) {
    this.inputEl.value = val;
  }

  get value() {
    return this.inputEl.value;
  }

  tmpl(data) {
    const id = `firecmp-input-${data.name}`;
    this.labelEl = document.createElement('label');
    this.labelEl.setAttribute('id', id);

    this.inputEl = document.createElement('textarea');
    this.inputEl.setAttribute('name', data.name);
    this.inputEl.setAttribute('for', id);
    this.inputEl.value = data.value;

    const docFrag = document.createDocumentFragment();
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
  $change(fn) {
    this.inputEl.addEventListener('change', (ev) => {
      fn({
        name: ev.currentTarget.name,
        value: ev.currentTarget.value
      }, ev);
    });
  }
}
