# reveal-on-scroll.js
FadeIn elements as you scroll down a page

## Version

1.0.0

### Demo
[Demo](http://junedchhipa.github.io/reveal-on-scroll/)

### Dependencies
- None


### Basic usage

- HTML

```html
  <section class="reveal">
    <img src="lorempixel.com/400/350"></img>
  </section>
```

- CSS

```css
  .reveal {
    opacity: 0;
  }
```

- JavaScript

```javascript
new reveal-on-scroll().init();
```

### Extend settings

- JavaScript

```javascript
var reveal = new revealOnScroll({
  selector: 'element',
      delay: 500,
      offset: 100,
      animationSpeed: 200
}); 
reveal.init();
```