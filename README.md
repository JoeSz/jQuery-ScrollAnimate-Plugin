# jQuery-ScrollAnimate-Plugin
The jQuery ScrollAnimate plugin allows you to add animations to elements when the user scrolls down the page.

The jQuery ScrollAnimate plugin allows you to add animations to elements when the user scrolls down the page. It is designed to be lightweight and easy to use.

## Usage

To use the plugin, you need to include the jQuery library and the ScrollAnimate plugin in your HTML file.

```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="jquery.scrollanimate.js"></script>
```

Then, you can use the plugin on any element that you want to animate when the user scrolls down the page. You need to add some data attributes to the element:

- **'data-show'** : the scroll position (in pixels) where the animation should start
- **'data-hide'** : the scroll position (in pixels) where the animation should end
- **'data-animation'** : the type of animation to use (**'fade'**, **'slide'**, **'slide-left'**, or **'slide-right'**)

```html
<div class="animate" data-show="200" data-hide="400" data-animation="fade">...</div>
```

Finally, you need to call the **'scrollAnimate'** function on the elements that you want to animate.

```javascript
$('.animate').scrollAnimate();
```

## Animation Types

- **'fade'** : The element fades in or out.
- **'slide'** : The element slides up or down.
- **'slide-left'** : The element slides in from the left or out to the left.
- **'slide-right'** : The element slides in from the right or out to the right.

## Implementation

The plugin uses the **'throttle'** function from the Underscore.js library to optimize performance. It collects all the animations into an array and applies them when the user scrolls down the page. When the element is visible, the plugin applies the appropriate animation using the **'fadeIn'**, **'slideDown'**, **'show'**, or **'hide'** functions from jQuery.
