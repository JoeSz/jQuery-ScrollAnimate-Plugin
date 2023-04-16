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
; (function ($, window, document, undefined) {

    "use strict";

    // from jQuery UI
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

    var pluginName = "scrollAnimate";

    function Plugin(element, options) {
        this.element = element;
        this.$element = $(element);
        this.settings = $.extend({
            show: parseInt(this.$element.data('show'), 10),
            hide: parseInt(this.$element.data('hide'), 10),
            animationType: this.$element.data('amination'),
            throttle: 50,
            duration: 300,
            easing: "swing"
        }, options);
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function () {
            var plugin = this;
            plugin.bindEvents();
            plugin.check();
        },
        bindEvents: function () {
            var plugin = this;
            $(window).on('scroll' + '.' + plugin._name + ' ' + 'resize' + '.' + plugin._name, plugin.throttle(plugin.settings.throttle, function () {
                plugin.check();
            }));
        },
        destroy: function () {
            this.unbindEvents();
            // this.$element.removeData();
            this.$element.removeData("plugin_" + pluginName);
        },
        unbindEvents: function () {
            this.$element.off('.' + this._name);
            $(window).off('.' + this._name);
        },
        throttle: function (delay, callback) {
            var timeout = null;
            return function () {
                var args = arguments;
                var context = this;
                if (!timeout) {
                    timeout = setTimeout(function () {
                        callback.apply(context, args);
                        timeout = null;
                    }, delay);
                }
            };
        },
        check: function () {
            var plugin = this;
            var scrollTop = $(window).scrollTop();

            if (scrollTop >= plugin.settings.show && scrollTop <= plugin.settings.hide) {
                if (!plugin.$element.is(':visible')) {
                    plugin._showElement(plugin.$element, plugin.settings.animationType);
                    plugin.$element.trigger(pluginName + ':onShow', plugin.$element);
                }
            } else {
                if (plugin.$element.is(':visible')) {
                    plugin._hideElement(plugin.$element, plugin.settings.animationType);
                    plugin.$element.trigger(pluginName + ':onHide', plugin.$element);
                }
            }

        },
        _showElement: function ($element, animationType) {
            var plugin = this;

            switch (animationType) {
                case 'fade':
                    $element.fadeIn(plugin.settings.duration);
                    break;
                case 'slide':
                    $element.slideDown(plugin.settings.duration);
                    break;
                case 'slide-left':
                    $element.show('slide', { direction: 'left' }, plugin.settings.duration);
                    break;
                case 'slide-right':
                    $element.show('slide', { direction: 'right' }, plugin.settings.duration);
                    break;
                default:
                    $element.fadeIn(plugin.settings.duration);
            }

        },

        _hideElement: function ($element, animationType) {
            var plugin = this;

            switch (animationType) {
                case 'fade':
                    $element.fadeOut(plugin.settings.duration);
                    break;
                case 'slide':
                    $element.slideUp(plugin.settings.duration);
                    break;
                case 'slide-left':
                    $element.hide('slide', { direction: 'left' }, plugin.settings.duration);
                    break;
                case 'slide-right':
                    $element.hide('slide', { direction: 'right' }, plugin.settings.duration);
                    break;
                default:
                    $element.fadeOut(plugin.settings.duration);
            }

        }
    });

    $.fn[pluginName] = function (options) {
        var args = Array.prototype.slice.call(arguments, 1);

        return this.each(function () {
            var instance = $.data(this, "plugin_" + pluginName);

            if (!instance) {
                $.data(this, "plugin_" + pluginName, new Plugin(this, options));
            } else if (typeof options === 'string' && typeof instance[options] === 'function') {
                instance[options].apply(instance, args);
            }
        });
    };

})(jQuery, window, document);
