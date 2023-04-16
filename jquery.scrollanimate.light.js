/*!
 * scrollAnimate 20230416 - 2023-04-16
 * https://github.com/JoeSz/jQuery-ScrollAnimate-Plugin
 *
 * Licensed under the MIT license.
 * http://opensource.org/licenses/MIT
 *
 * Disclaimer
 * https://www.joeszalai.org/disclaimer/
 */
;(function ($) {

    var effectsEffectSlide = $.effects.define("slide", "show", function (options, done) {
        var startClip, startRef,
            element = $(this),
            map = {
                up: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                right: ["left", "right"]
            },
            mode = options.mode,
            direction = options.direction || "left",
            ref = (direction === "up" || direction === "down") ? "top" : "left",
            positiveMotion = (direction === "up" || direction === "left"),
            distance = options.distance ||
                element[ref === "top" ? "outerHeight" : "outerWidth"](true),
            animation = {};

        $.effects.createPlaceholder(element);

        startClip = element.cssClip();
        startRef = element.position()[ref];

        // Define hide animation
        animation[ref] = (positiveMotion ? -1 : 1) * distance + startRef;
        animation.clip = element.cssClip();
        animation.clip[map[direction][1]] = animation.clip[map[direction][0]];

        // Reverse the animation if we're showing
        if (mode === "show") {
            element.cssClip(animation.clip);
            element.css(ref, animation[ref]);
            animation.clip = startClip;
            animation[ref] = startRef;
        }

        // Actually animate
        element.animate(animation, {
            queue: false,
            duration: options.duration,
            easing: options.easing,
            complete: done
        });
    });

    // Throttle function from Underscore.js
    function throttle(func, wait) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                func.apply(context, args);
            };
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
        };
    }

    $.fn.scrollAnimate = function () {
        var elements = this;
        var animations = [];

        // Collect animations
        elements.each(function () {
            var $element = $(this);
            var show = parseInt($element.data('show'), 10);
            var hide = parseInt($element.data('hide'), 10);
            var animationType = $element.data('amination');
            var animation = {
                $element: $element,
                show: show,
                hide: hide,
                animationType: animationType
            };
            animations.push(animation);
        });

        // Animate on scroll
        var animate = throttle(function () {
            var scrollTop = $(window).scrollTop();
            animations.forEach(function (animation) {
                var $element = animation.$element;
                var show = animation.show;
                var hide = animation.hide;
                var animationType = animation.animationType;

                if (scrollTop >= show && scrollTop <= hide) {
                    if (!$element.is(':visible')) {
                        if (animationType === 'fade') {
                            $element.fadeIn();
                        } else if (animationType === 'slide') {
                            $element.slideDown();
                        } else if (animationType === 'slide-left') {
                            $element.show('slide', { direction: 'left' }, 300);
                        } else if (animationType === 'slide-right') {
                            $element.show('slide', { direction: 'right' }, 300);
                        }
                    }
                } else {
                    if ($element.is(':visible')) {
                        if (animationType === 'fade') {
                            $element.fadeOut();
                        } else if (animationType === 'slide') {
                            $element.slideUp();
                        } else if (animationType === 'slide-left') {
                            $element.hide('slide', { direction: 'left' }, 300);
                        } else if (animationType === 'slide-right') {
                            $element.hide('slide', { direction: 'right' }, 300);
                        }
                    }
                }
            });
        }, 50);

        $(window).on('scroll.scrollAnimate resize.scrollAnimate', animate);
    };
})(jQuery);
