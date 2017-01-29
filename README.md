FireCMP
======

Web components framework using FireTPL, designed for the XQCore framework

## Usage

```js

const cmp = new FireCMP.Core({
  foo: 'bar'
});

// inject it into the DOM
cmp.appendTo('.content');

// disable Component
cmp.active = false;
```

## Creating an own Component

```js
class MyComponent extends FireCMP.Core {
  get tag() {
    return 'div';
  }

  // setting a tmpl method
  tmpl(data) {
    return `<span>Hello ${data.name}</span>`;
  }
}

const cmp = new MyComponent({
  name: 'Andi'
});

cmp.appendTo('.content');
```

Rendered html:

```html
<div class="firecmp-my-component">
  <span>Hello Andi</span>
</div>
```

The `tmpl()` method is getting called from `render()` and gets the `data` object. The returned value is used as the components inner html.  
<br>

### List items

List components expecting data arrays as value, each array item represents one list item.
A list component knows a `item()` method, which sets the template for one list item. This method can be overwritten.
<br>

```js
const cmp = FireCMP.List(['Foo', 'Bar']);
cmp.appendTo('.content');
```
Rendered html:

```html
<ul class="firecmp-list">
  <li class="item">Foo</li>
  <li class="item">Bar</li>
</ul>
```

### Input items

Input components are the base for all input fields. This element is a writeable element it firesa `change` event after value has changed. Event listeners can be registered by using the `$change()` method.

<br>

```js
const cmp = FireCMP.Input('Hello World', 'greeting');
cmp.label = 'Greeting:';
cmp.appendTo('.content');
cmp.$change((value) => {
  console.log('Change event:', value);
}));

```
Rendered html:

```html
<section class="firecmp-input">
  <label for="firecmp-input-greeting">Greeting:</label>
  <input type="text" name="greeting" id="firecmp-input-greeting" value="Hello World">
</section>
```
