import Input from './input';

export default class Radiobox extends Input {
  set value(val) {
    for (const el of this.inputEls) {
      if (el.value === val) {
        el.checked = true;
        break;
      }
    }
  }

  get value() {
    for (const el of this.inputEls) {
      if (el.checked) {
        return el.value;
      }
    }
  }

  tmpl(data) {
    this.name = data.name;
    const id = `firecmp-input-${data.name}`;
    const docFrag = document.createDocumentFragment();
    if (data.label) {
      this.labelEl = document.createElement('label');
      this.labelEl.innerHTML = data.label;
      this.labelEl.addEventListener('click', () => {
        this.selectNext();
      });
      docFrag.appendChild(this.labelEl);
    }

    let num = 0;
    this.inputEls = [];
    for (const item of data.options) {
      num += 1;
      const itemId = id + ('0' + num).substr(-2);
      const el = document.createElement('input');
      el.setAttribute('type', 'radio');
      el.setAttribute('name', data.name);
      el.setAttribute('value', item.value);
      el.setAttribute('id', itemId);
      docFrag.appendChild(el);
      this.inputEls.push(el);

      if (item.label) {
        const lbl = document.createElement('label');
        lbl.setAttribute('for', itemId);
        lbl.innerHTML = item.label;
        docFrag.appendChild(lbl);
      }
    }

    this.value = data.value;
    return docFrag;
  }

  selectNext() {
    let isNext = false;
    for (const el of this.inputEls) {
      if (isNext) {
        el.checked = true;
        return this;
      }

      isNext = el.checked;
    }

    this.inputEls[0].checked = true;
  }
}
