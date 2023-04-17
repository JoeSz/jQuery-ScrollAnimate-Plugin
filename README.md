# jQuery-ScrollAnimate-Plugin

The jQuery ScrollAnimate plugin allows you to add animations to elements when the user scrolls down the page. It is designed to be lightweight and easy to use.

## Usage

To use the plugin, you need to include the jQuery library and the ScrollAnimate plugin in your HTML file.

```html
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script src="jquery.scrollanimate.light.js"></script>
<!-- or -->
<script src="jquery.scrollanimate.js"></script>
```

Then, you can use the plugin on any element that you want to animate when the user scrolls down the page. You need to add some data attributes to the element:

- **'data-show'** : the scroll position (in pixels or percent of document) where the animation should start
- **'data-hide'** : the scroll position (in pixels or percent of document) where the animation should end
- **'data-animation'** : the type of animation to use (**'fade'**, **'slide'**, **'slide-left'**, or **'slide-right'**)

## Example

- **HTML**
```html
<div class="element" id="first" data-show="200" data-hide="400" data-animation="fade">...</div>
<div class="element" id="second" data-show="1000" data-hide="2500" data-amination="slide">...</div>
<div class="element" id="third" data-show="50%" data-hide="60%" data-amination="slide">...</div>
```

- **CSS**
```css
.element {
    background-color: #000;
    color: #fff;
    display: none;
    float: left;
    font-size: 2em;
    font-weight: bold;
    opacity: 0.5;
    padding: 2% 0;
    position: fixed;
    text-align: center;
    width: 100%;
    z-index: 9;
}
.element#second {
    top: 300px;
    right: 0;
    width: 200px;
}
.element#second {
    top: 500px;
    right: 0;
    width: 200px;
}
```

- **JavaScript**

Finally, you need to call the **'scrollAnimate'** function on the elements that you want to animate.

```javascript
$('.element').scrollAnimate();
```

**OPTIONAL:** To run a function on element show and element hide

```javascript
// Add before initializing, so it will be triggered even if the item already appears on the init.
$('.element').on('scrollAnimate:onShow', function (event, element){
    console.log('onShow: ' + $(element).attr('id') );
});

$('.element').on('scrollAnimate:onHide', function (event, element){
    console.log('onHide: ' + $(element).attr('id') );
});
```

## Animation Types

- **'fade'** : The element fades in or out.
- **'slide'** : The element slides up or down.
- **'slide-left'** : The element slides in from the left or out to the left.
- **'slide-right'** : The element slides in from the right or out to the right.

<hr>

## Additional functions for the full version
jquery.scrollanimate.js

### Methods

**'destroy'**

Destroys the plugin and unbinds all events.

```javascript
$('.element').scrollAnimate('destroy');
```

**'setShowHide'**

Recalulate show and height<br>
<br>
It is useful if elements were added dynamically after the plugin was initialized (so the height of the document changed), and percentages were used in data-show and/or data-hide elements.

```javascript
$('.element').scrollAnimate('setShowHide');
```

## Implementation

The plugin uses the **'throttle'** function from the Underscore.js library to optimize performance. It collects all the animations into an array and applies them when the user scrolls down the page. When the element is visible, the plugin applies the appropriate animation using the **'fadeIn'**, **'slideDown'**, **'show'**, or **'hide'** functions from jQuery.

## LICENSE DETAILS

The GPL license grants you the right to use, study, share (copy), modify and (re)distribute the software, as long as these license terms are retained.

## DISCLAMER

NO WARRANTY OF ANY KIND! USE THIS SOFTWARES AND INFORMATIONS AT YOUR OWN RISK!
[READ DISCLAMER.TXT!](https://www.joeszalai.org/disclaimer/)
License: GNU General Public License v3

[![forthebadge](http://forthebadge.com/images/badges/built-by-developers.svg)](http://forthebadge.com) [![forthebadge](http://forthebadge.com/images/badges/for-you.svg)](http://forthebadge.com)

SUPPORT/UPDATES/CONTRIBUTIONS
-----------------------------

If you use my program(s), I would **greatly appreciate it if you kindly give me some suggestions/feedback**. If you solve some issue or fix some bugs or add a new feature, please share with me or mke a pull request. (But I don't have to agree with you or necessarily follow your advice.)<br/>
**Before open an issue** please read the readme (if any :) ), use google and your brain to try to solve the issue by yourself. After all, Github is for developers.<br/>
My **updates will be irregular**, because if the current stage of the program fulfills all of my needs or I do not encounter any bugs, then I have nothing to do.<br/>
**I provide no support.** I wrote these programs for myself. For fun. For free. In my free time. It does not have to work for everyone. However, that does not mean that I do not want to help.<br/>
I've always tested my codes very hard, but it's impossible to test all possible scenarios. Most of the problem could be solved by a simple google search in a matter of minutes. I do the same thing if I download and use a plugin and I run into some errors/bugs.
