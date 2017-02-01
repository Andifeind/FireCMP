import Core from './core';

export default class List extends Core {
  get tag() {
    return 'ul';
  }

  /**
   * Sets an item template
   */
  item(data) {
    return '<li class="item">' + data + '</li>';
  }

  render(data) {
    if (Array.isArray(data)) {
      data.forEach(function(item) {
        this.push(item);
      }, this);
    }
  }

  push(data) {
    this.append(this.item(data));
  }

  pushMany(dataArr) {
    for (const data of dataArr) {
      this.push(data);
    }
  }
}
