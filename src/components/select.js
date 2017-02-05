import Input from './input';

export default class Select extends Input {
  set value(val) {
    for (const el of this.options) {
      if (el.value === val) {
        el.selected = true;
        break;
      }
    }
  }

  get value() {
    for (const el of this.options) {
      if (el.selected) {
        return el.value;
      }
    }
  }

  tmpl(data) {
    this.name = data.name;
    const id = `firecmp-select-${data.name}`;
    const docFrag = document.createDocumentFragment();
    if (data.label) {
      this.labelEl = document.createElement('label');
      this.labelEl.innerHTML = data.label;
      this.labelEl.addEventListener('click', () => {
        this.selectNext();
      });
      docFrag.appendChild(this.labelEl);
    }

    const select = document.createElement('select');
    select.setAttribute('name', data.name);
    select.setAttribute('size', data.size || 1);

    let num = 0;
    this.options = [];
    for (const item of data.options) {
      num += 1;
      const itemId = id + ('0' + num).substr(-2);
      const el = document.createElement('option');
      el.setAttribute('value', item.value);
      el.setAttribute('id', itemId);
      el.innerHTML = item.label;
      select.appendChild(el);
      this.options.push(el);
    }

    docFrag.appendChild(select);
    this.value = data.value;
    return docFrag;
  }

  selectNext() {
    let isNext = false;
    for (const el of this.options) {
      if (isNext) {
        el.selected = true;
        return this;
      }

      isNext = el.selected;
    }

    this.options[0].selected = true;
  }
}
