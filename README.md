# JustAccordion

A simple and lightweight accordion plugin

## Overview

+ __No dependencies.__ <br>
The library is written in pure JavaScript and requires no additional dependencies.

+ __Simplicity and functionality.__ <br>
Easily integrate and use the library to implement essential tab functionality.

+ __Accessibility.__ <br>
The plugin follows all accessibility best practices.

+ __CSS customization.__ <br>
Modify the appearance and layout effortlessly using CSS.

## Installation

1. Download the JS library __just-accordion.min.js__ and the stylesheet __just-accordion.min.css__  from the `dist` folder.<br>
Alternatively, install via NPM:

```
npm i just-accordion
```

2. Include the files in your project:

```html
<link rel="stylesheet" href="just-accordion.min.css">
<script src="just-accordion.min.js"></script>
```

Or (for module bundlers): 

```javascript
import 'just-accordion/dist/just-accordion.min.css';
import JustAccordion from 'just-accordion';
```

3. Add the following HTML structure:

```html
<div class="accordion">
  <details>
    <summary>Item</summary>
    <div>
      Content
    </div>
  </details>
  <details>
    <summary>Item</summary>
    <div>
      Content
    </div>
  </details>
  <details>
    <summary>Item</summary>
    <div>
      Content
    </div>
  </details>
</div>
```

> The structure of each item is implemented using the HTML `<details>` tag. The trigger must be a `<summary>` tag, and the content must be a `<div>` tag.

4. Initialize the library:

```javascript
new JustAccordion( '.accordion' );
```

or

```javascript
const accordion = document.querySelector( '.accordion' );
new JustAccordion( accordion );
```

## Plugin Configuration

The JustAccordion constructor accepts two arguments:

* __Required__: A selector (string) or HTML element.
* __Optional__: A configuration object.

### Properties

1. `el`

To display only one accordion item at a time, set the `isToggleMode` property to `true` in the configuration object (default is `false`):

```javascript
const accordion = new JustAccordion( '.accordion' );
console.log( accordion.el ); // Выводит HTML Element аккордеона

```

2. `isToggleMode`

To enable single-item mode (only one accordion item `open` at a time), set the `isToggleMode` property to `true` in the configuration object:

```javascript
new JustAccordion( '.accordion', {
	isToggleMode: true
} );
```

__Important! `isToggleMode` ignores all `open` attributes in the markup. To open a specific item, use the `active` property.__

3. `active`

When using `isToggleMode`, specify which item to open by default using the `active` property with the item's index:

```javascript
new JustAccordion( '.accordion', {
	isToggleMode: true,
  active: 1
} );
```

The `active` property only works with `isToggleMode`. To have multiple items open by default, don't enable `isToggleMode` and add the `open` attribute to desired elements.

4. `duration`

To change the accordion's opening/closing speed, set the `duration` property in milliseconds:

```javascript
new JustAccordion( '.accordion', {
	duration: 400
} );
```

You can also control the speed via CSS:

```css
.accordion {
	--accordion-duration: 0.4s;
}
```

> Default duration is 0.3s (set in `just-accordion.min.css`)

### Events

1. `onInit`

Triggered when the accordion initializes. Receives one argument: the accordion object.

```javascript
new JustAccordion( '.accordion', {
	onInit: ( accordion ) => {
    // function body
	}
} );
```

2. `onClick`

Triggered when clicking a summary element. Receives three arguments: the summary element, the accordion item, and the accordion object.

```javascript
new JustAccordion( '.accordion', {
	onClick: ( summary, item, accordion ) => {
    // function body
	}
} );
```

3. `onOpen`

Triggered when opening an accordion item. Unlike `onOpenComplete`, this fires immediately after click before internal processing. Receives two arguments: the accordion item and the accordion object.

```javascript
new JustAccordion( '.accordion', {
	onOpen: ( item, accordion ) => {
		// function body
	}
} );
```

4. `onOpenComplete`

Triggered after an accordion item has fully opened (after internal processing). Receives two arguments: the accordion item and the accordion object.

```javascript
new JustAccordion( '.accordion', {
	onOpenComplete: ( item, accordion ) => {
		// function body
	}
} );
```

5. `onClose`

Triggered when closing an accordion item. Unlike `onCloseComplete`, this fires immediately after click before internal processing. Receives two arguments: the accordion item and the accordion object.

```javascript
new JustAccordion( '.accordion', {
	onClose: ( item, accordion ) => {
		// function body
	}
} );
```

6. `onCloseComplete`

Triggered after an accordion item has fully closed (after internal processing). Receives two arguments: the accordion item and the accordion object.

```javascript
new JustAccordion( '.accordion', {
	onCloseComplete: ( item, accordion ) => {
		// function body
	}
} );
```