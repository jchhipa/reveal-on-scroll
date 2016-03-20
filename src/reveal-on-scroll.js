/*
* Reveal elements as user scrolls 
*/

(function(){
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }

    this.revealOnScroll = (function() {
        revealOnScroll.prototype.defaults = {
            selector: 'reveal',
            delay: 100,
            offset: 0,
            animationSpeed: 1500
        };

        function revealOnScroll(options) {
            this.start = bind(this.start, this);
            this.config = this.extend(options, this.defaults);
        }

        revealOnScroll.prototype.init = function () {
            var self = this;
            this.element = window.document.documentElement;
            if ((ref = document.readyState) === "interactive" || ref === "complete") {
                this.start();
            } else {
                document.addEventListener('DOMContentLoaded', this.start);
            }
        }

        revealOnScroll.prototype.start = function () {
            var self = this;
            this.elms = function() {
                var i, elements, element, results;
                elements = this.element.querySelectorAll("."+self.config.selector);
                elements = self.nodelistToArray(elements);
                return elements;
            };
            Array.prototype.forEach.call(self.elms(), function(el, i){
                var revealed = false;
                window.addEventListener("scroll", function() {
                    if(self.scrolledIn(el,self.config.offset)) {
                        if(revealed==false) {
                            setTimeout(function(){
                                revealed = true;
                                self.fadeIn(el, self.config.animationSpeed);
                            }, self.config.delay);
                        }
                    }
                });                
            });
        }

        revealOnScroll.prototype.extend = function(custom, defaults) {
            var key, value;
            for (key in defaults) {
                value = defaults[key];
                if (custom[key] == null) {
                  custom[key] = value;
                }
            }
            return custom;
        }

        revealOnScroll.prototype.nodelistToArray = function(nodelist) {
            var results = [];
            var i, element;
            for(i=0; i < nodelist.length; i++) {
                element = nodelist[i];
                results.push(element);
            }
            return results;
        }

        revealOnScroll.prototype.scrolledIn = function(el, offset) {
            if(typeof el == 'undefined') return;
  
            var elemTop = el.getBoundingClientRect().top;
            var elemBottom = el.getBoundingClientRect().bottom;

            var scrolledInEl = (elemTop >= 0) && (elemTop <= window.innerHeight);
            return scrolledInEl;

        }

        revealOnScroll.prototype.fadeIn = function(el, duration) {
            // http://jsfiddle.net/LzX4s/
            var to = 0;
            var FX = {
                easing: {
                    linear: function(progress) {
                        return progress;
                    },
                    quadratic: function(progress) {
                        return Math.pow(progress, 2);
                    },
                    swing: function(progress) {
                        return 0.5 - Math.cos(progress * Math.PI) / 2;
                    },
                    circ: function(progress) {
                        return 1 - Math.sin(Math.acos(progress));
                    },
                    back: function(progress, x) {
                        return Math.pow(progress, 2) * ((x + 1) * progress - x);
                    },
                    bounce: function(progress) {
                        for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
                            if (progress >= (7 - 4 * a) / 11) {
                                return -Math.pow((11 - 6 * a - 11 * progress) / 4, 2) + Math.pow(b, 2);
                            }
                        }
                    },
                    elastic: function(progress, x) {
                        return Math.pow(2, 10 * (progress - 1)) * Math.cos(20 * Math.PI * x / 3 * progress);
                    }
                }
            }
            this.animate({
                duration: duration,
                delta: function(progress) {
                    progress = this.progress;
                    return FX.easing.swing(progress);
                },
                step: function(delta) {
                    el.style.opacity = to + delta;
                }
            });
        }

        revealOnScroll.prototype.animate = function(options) {
            var start = new Date;
            var id = setInterval(function() {
                var timePassed = new Date - start;
                var progress = timePassed / options.duration;
                if (progress > 1) {
                    progress = 1;
                }
                options.progress = progress;
                var delta = options.delta(progress);
                options.step(delta);
                if (progress == 1) {
                    clearInterval(id);
                }
            }, options.delay || 10);
        }

        return revealOnScroll;

    })();
}).call(this);