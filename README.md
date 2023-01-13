# JustAccordion v0.1.1

Простой и лёгкий плагин для аккордеона

## Информация

+ __Никаких зависимостей__.  Библиотека написана на чистом JavaScript, для работы не требуются иные библиотеки.
+ __Простота и функциональность__. Вы можете легко и быстро подключить и использовать библиотеку, которая реализует функционал для аккордеона
+ __Доступность__. Аккордеон отвечает правилам доступности.
+ __Настройка с помощью CSS__. Вы можете легко менять внешний вид, расположение с помощью CSS.

1. Скачайте js-библиотеку just-accordion.min.js и файл стилей just-accordion.min.css
2. Подключите эти файлы к проекту
```html
  <link rel="stylesheet" href="just-accordion.min.css">
  <script src="just-accordion.min.js" defer></script>
```
3. Поместите в ваш html-документ следующую разметку:
```html
<div class="accordion">
  <div class="accordion__item">
    <button class="accordion__control">Button1</button>
    <div class="accordion__content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eos illo amet saepe, nam molestiae
      exercitationem consequuntur doloribus commodi optio suscipit veritatis quo debitis architecto!
    </div>
  </div>
  <div class="accordion__item">
    <button class="accordion__control">Button2</button>
    <div class="accordion__content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eos illo amet saepe, nam molestiae
      exercitationem consequuntur doloribus commodi optio suscipit veritatis quo debitis architecto!
    </div>
  </div>
  <div class="accordion__item">
    <button class="accordion__control">Button3</button>
    <div class="accordion__content">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia eos illo amet saepe, nam molestiae
      exercitationem consequuntur doloribus commodi optio suscipit veritatis quo debitis architecto!
    </div>
  </div>
</div>
```

4. Разместите следующий JS-код для подключения табов:
```javascript
const accordion = new JustAccordion('.accordion');
```

## Методы и свойства

Аккордеон поддерживает некоторые свойства и события

```javascript
const accordion = new JustAccordion('.accordion', {
  speed: 1000,
  showFirst: true,
  showOnlyOne: true,
  activeHandlerClass: 'custom-active-class-btn',
  activeContentClass: 'custom-active-class-content',
  isOpen: (acc) => {
    console.log(acc);
  },
  isClose: (acc) => {
    console.log(acc);
  }
});
```

1. Событие `isOpen` - срабатывает в момент открытия аккордеона. Может принимать входной параметр - объект аккордеона. Пример:
```javascript
  isOpen: (acc) => {
    console.log(acc);
  }
```

2. Событие `isClose` - срабатывает в момент закрытия аккордеона. Может принимать входной параметр - объект аккордеона. Пример: 
```javascript
  isClose: (acc) => {
    console.log(acc);
  }
```

3. Установка скорости открытия/закрытия аккордеона (по умолчанию 300)
```javascript
  speed: 1000
```

4. Показать контент первого элемента (по умолчанию false)
```javascript
  showFirst: true
```

5. Показывать только один элемент контента в момент переключения (по умолчанию false) 
```javascript
  showOnlyOne: true
```

6. Установка кастомного класса активной кнопке переключения 
```javascript
  activeHandlerClass: 'custom-active-class-btn'
```

7. Установка кастомного класса активному элементу контента 
```javascript
  activeContentClass: 'custom-active-class-content'  
```
