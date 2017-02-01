/**
 * Form component renders a form based on a FormSchema
 *
 * FormSchema:
 * { name: 'title', type: 'string', min: 3, max: 20 },
 * { name: 'description', type: 'text', min: 3, max: 2000 },
 * { name: 'category', type: 'category', min: 3, max: 200 },
 * { name: 'timer', type: 'string', min: 3, max: 200, multiple: true },
 *
 */

import Button from './button';
import Core from './core';
import Input from './input';
import Password from './input-password';
import Text from './input-text';

export default class Form extends Core {
  get tag() {
    return {
      tag: 'form',
      attrs: {
        action: ''
      }
    }
  }

  render(data) {
    for (const item of data.schema) {
      const CmpConstuctor = this.getConstructor(item.type);
      const cmp = new CmpConstuctor(item);
      cmp.value = data.data[item.name] || '';
      cmp.appendTo(this.domEl);
    }
  }

  getConstructor(type) {
    if (type === 'string') {
      return Input;
    }

    if (type === 'text') {
      return Text;
    }

    if (type === 'password') {
      return Password;
    }

    if (type === 'button' || type === 'submit') {
      return Button;
    }
  }

  getData() {
    const data = {};
    for (const el of this.domEl.elements) {
      if (!el.name) {
        continue;
      }

      data[el.name] = el.value;
    }

    return data;
  }

  $submit(fn) {
    this.listen('submit', (ev) => {
      ev.preventDefault();
      fn(this.getData(), ev);
    });
  }
}
