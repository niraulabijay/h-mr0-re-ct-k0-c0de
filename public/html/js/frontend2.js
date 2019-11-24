(function($) {
    "use strict";
    $.fn.parallax = function(xpos, speedFactor, outerHeight) {
        var $this = $(this);
        var getHeight;
        var firstTop;
        var paddingTop = 0;
        $this.each(function() {
            firstTop = $this.offset().top;
        });
        if (outerHeight) {
            getHeight = function(jqo) {
                return jqo.outerHeight(true);
            };
        } else {
            getHeight = function(jqo) {
                return jqo.height();
            };
        }
        if (arguments.length < 1 || xpos === null) {
            xpos = "50%";
        }
        if (arguments.length < 2 || speedFactor === null) {
            speedFactor = 0.1;
        }
        if (arguments.length < 3 || outerHeight === null) {
            outerHeight = true;
        }
        function update() {
            var pos = $(window).scrollTop();
            $this.each(function() {
                var $element = $(this);
                var top = $element.offset().top;
                var height = getHeight($element);
                if (top + height < pos || top > pos + $(window).height()) {
                    return;
                }
                $this.css('backgroundPosition', xpos + " " + Math.round((firstTop - pos) * speedFactor) + "px");
            });
        }
        $(window).on('scroll', update);
        $(window).on('resize', update);
        update();
    };
    $.fn.equalizeHeights = function() {
        var max = Math.max.apply(this, $(this).map(function(i, e) {
            return $(e).height();
        }).get());
        if (max > 0)
            this.height(max);
        return max;
    };
    $.fn.equalizeWidths = function() {
        var max = Math.max.apply(this, $(this).map(function(i, e) {
            return $(e).width();
        }).get());
        if (max > 0)
            this.width(max);
        return max;
    };
    window.azh = $.extend({}, window.azh);
    $(function() {
        function unique_id() {
            return Math.round(new Date().getTime() + (Math.random() * 100));
        }
        function column_padding_fix() {
            $('[data-full-width], [data-column-padding]').each(function() {
                var p = parseInt($(this).data('column-padding'), 10);
                if (p > 15 || ($(this).data('full-width') && $(this).data('stretch-content'))) {
                    if ($(this).find('> [class*="-row"] > [class*="-col-"]').length > 0) {
                        $(this).find('> [class*="-row"]').css({
                            "margin-right": "0",
                            "margin-left": "0"
                        });
                        $(this).find('> [class*="-row"] > [class*="-col-"]').css({
                            "width": "",
                            "padding-right": "",
                            "padding-left": ""
                        });
                        var current_top = $(this).find('> [class*="-row"] > [class*="-col-"]:first-child').position().top;
                        $(this).find('> [class*="-row"] > [class*="-col-"]:first-child').css('padding-left', '0');
                        $(this).find('> [class*="-row"] > [class*="-col-"]:last-child').css('padding-right', '0');
                        var c = false;
                        var i = 0;
                        $(this).find('> [class*="-row"] > [class*="-col-"]').each(function() {
                            if (current_top < $(this).position().top) {
                                if (c === false) {
                                    c = i;
                                }
                                $(this).prev().css('padding-right', '0');
                                $(this).css('padding-left', '0');
                                current_top = $(this).position().top;
                            }
                            i++;
                        });
                        if (c === false) {
                            c = i;
                        }
                        var w = $(this).width();
                        $(this).find('> [class*="-row"] > [class*="-col-"]').each(function() {
                            if ($(this).css('padding-left') !== '0px' || $(this).css('padding-right') !== '0px') {
                                //$(this).width((w - (p * 2 * (c - 1))) / c);
                            }
                        });
                    }
                }
            });
        }
        function sticky() {
            $('[data-sticky-class]').each(function() {
                var sticky = this;
                var top = $(sticky).offset().top;
                if (top < 0) {
                    top = 0;
                }
                var sticky_class = $(sticky).data('sticky-class');

                $('body').imagesLoaded(function() {
                    var interval = setInterval(function() {
                        if (!$('body').hasClass(sticky_class)) {
                            top = $(sticky).offset().top;
                            if (top < 0) {
                                top = 0;
                            }
                            clearInterval(interval);
                        }
                    }, 100);
                    $(window).off('scroll.azh-sticky-class').on('scroll.azh-sticky-class', function() {
                        if ($(window).scrollTop() > top) {
                            $('body').addClass(sticky_class);
                        } else {
                            $('body').removeClass(sticky_class);
                        }
                    });
                });
            });
        }
        $(window).trigger('azh-extension-before-init');
        $(window).on('resize', column_padding_fix);
        $(window).on('resize', sticky);
        column_padding_fix();
        $('.az-tabs').each(function() {
            var tabs = this;
            if (!$(tabs).data('az-tabs')) {
                $(tabs).find('> div:first-child > span > a[href^="#"]').click(function(event) {
                    event.preventDefault();
                    $(this).parent().addClass("az-active");
                    $(this).parent().siblings().removeClass("az-active");
                    var tab = $(this).attr("href");
                    $(tabs).find('> div:last-child > div').not(tab).css("display", "none");
                    $(tab).fadeIn();
                });
                $(tabs).find('> div:first-child > span:first-child > a[href^="#"]').click();
                $(tabs).data('az-tabs', true);
            }
        });
        $('.az-accordion').each(function() {
            var accordion = this;
            if (!$(accordion).data('az-accordion')) {
                $(accordion).find('> div > div:first-child').click(function(event) {
                    $(this).parent().addClass("az-active").find('> div:last-child').slideDown();
                    $(this).parent().siblings().removeClass("az-active").find('> div:last-child').slideUp();
                });
                $(accordion).find('> div:first-child > div:first-child').parent().addClass("az-active").find('> div:last-child').slideDown(0);
                $(accordion).find('> div:first-child > div:first-child').parent().siblings().removeClass("az-active").find('> div:last-child').slideUp(0);
                $(accordion).data('az-accordion', true);
            }
        });
        if ('flexslider' in $.fn) {
            $('.az-slider').each(function() {
                var slider = this;
                if (!$(slider).data('az-slider')) {
                    if ($(slider).data('thumbnails') !== 'yes') {
                        $(slider).find('.az-slides').flexslider({
                            namespace: "az-flex-",
                            selector: '> *',
                            smoothHeight: true,
                            prevText: '',
                            nextText: '',
                            touch: true,
                            pauseOnHover: true,
                            mousewheel: false,
                            controlNav: false,
                            customDirectionNav: $(slider).find('.az-flex-direction-nav a')
                        });
                    } else {
                        var gallery = $(slider).find('.az-slides');
                        $(gallery).attr('id', unique_id());
                        var thumbnails = false;
                        if ($(slider).find('.az-thumbnails').length) {
                            thumbnails = $(slider).find('.az-thumbnails');
                            $(thumbnails).attr('id', $(gallery).attr('id') + '-thumbnails');
                        } else {
                            thumbnails = $('<div id="' + $(gallery).attr('id') + '-thumbnails" class="az-thumbnails"></div>');
                            $('<div class="az-flex-thumbnails"></div>').appendTo(thumbnails).append($(gallery).children().clone());
                            $('<div class="az-flex-direction-nav"><a href="#" class="az-flex-prev"></a><a href="#" class="az-flex-next"></a></div>').appendTo(thumbnails);
                            $(thumbnails).insertAfter(gallery);
                        }
                        var itemWidth = $(thumbnails).find('.az-flex-thumbnails').children().first().width();
                        if (!itemWidth) {
                            itemWidth = 150;
                        }
                        var itemHeight = $(thumbnails).find('.az-flex-thumbnails').children().first().height();
                        if (!itemHeight) {
                            itemHeight = 150;
                        }
                        $(thumbnails).flexslider({
                            namespace: "az-flex-",
                            selector: '.az-flex-thumbnails > *',
                            prevText: '',
                            nextText: '',
                            animation: "slide",
                            controlNav: false,
                            animationLoop: false,
                            pauseOnHover: true,
                            slideshow: false,
                            itemWidth: itemWidth,
                            itemHeight: itemHeight,
                            touch: true,
                            mousewheel: false,
                            customDirectionNav: $(thumbnails).find('.az-flex-direction-nav a'),
                            asNavFor: '#' + $(gallery).attr('id')
                        });

                        $(gallery).flexslider({
                            namespace: "az-flex-",
                            selector: '> *',
                            smoothHeight: true,
                            prevText: '',
                            nextText: '',
                            touch: true,
                            pauseOnHover: true,
                            mousewheel: false,
                            controlNav: false,
                            customDirectionNav: $(slider).find('> .az-flex-direction-nav a'),
                            sync: '#' + $(gallery).attr('id') + '-thumbnails'
                        });
                    }
                    $(slider).data('az-slider', true);
                }
            });
        }
        if ('AZowlCarousel' in $.fn) {
            $('.az-carousel').each(function() {
                var carousel = this;
                if (!$(carousel).data('az-carousel')) {
                    $(carousel).AZowlCarousel({
                        responsive: $(carousel).data('responsive'),
                        center: ($(carousel).data('center') === 'yes'),
                        margin: $(carousel).data('margin'),
                        loop: ($(carousel).data('loop') === 'yes'),
                        autoplay: ($(carousel).data('autoplay') === 'yes'),
                        autoplayTimeout: ($(carousel).data('timeout') ? $(carousel).data('timeout') : 5000),
                        autoplayHoverPause: true,
                        nav: true,
                        dots: true,
                        navText: ['<span></span>', '<span></span>']
                    });
                    $(window).trigger('resize');
                    $(carousel).data('az-carousel', true);
                }
            });
        }
        if ('magnificPopup' in $.fn) {
            $('.az-gallery').each(function() {
                $(this).magnificPopup({
                    delegate: 'a',
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            });
            $('a.az-image-popup').magnificPopup({
                type: 'image',
                removalDelay: 300,
                mainClass: 'mfp-fade',
                overflowY: 'scroll'
            });
            $('a.az-iframe-popup').magnificPopup({
                type: 'iframe',
                removalDelay: 300,
                mainClass: 'mfp-fade',
                overflowY: 'scroll',
                iframe: {
                    markup: '<div class="mfp-iframe-scaler">' +
                            '<div class="mfp-close"></div>' +
                            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                            '</div>',
                    patterns: {
                        youtube: {
                            index: 'youtube.com/',
                            id: 'v=',
                            src: '//www.youtube.com/embed/%id%?autoplay=1'
                        },
                        vimeo: {
                            index: 'vimeo.com/',
                            id: '/',
                            src: '//player.vimeo.com/video/%id%?autoplay=1'
                        },
                        gmaps: {
                            index: '//maps.google.',
                            src: '%id%&output=embed'
                        }
                    },
                    srcAction: 'iframe_src'
                }
            });
        }
        if ('countdown' in $.fn) {
            $('.az-countdown').each(function() {
                var countdown = this;
                if ($(countdown).data('countdownInstance') === undefined) {
                    $(countdown).countdown($(countdown).data('time'), function(event) {
                        $(countdown).find('.az-days .az-count').text(event.offset.totalDays);
                        $(countdown).find('.az-hours .az-count').text(event.offset.hours);
                        $(countdown).find('.az-minutes .az-count').text(event.offset.minutes);
                        $(countdown).find('.az-seconds .az-count').text(event.offset.seconds);
                    });
                }
            });
        }
        if ('waypoint' in $.fn) {
            $('.az-lazy-load').each(function() {
                var image = this;
                var waypoint_handler = function(direction) {
                    $('<img src="' + $(image).data('src') + '">').load(function() {
                        if ($(image).prop('tagName') === 'IMG') {
                            $(image).attr('src', $(image).data('src'));
                        } else {
                            $(image).css('background-image', 'url("' + $(image).data('src') + '")');
                        }
                        $(image).addClass('loaded');
                    });
                };
                $(image).waypoint(waypoint_handler, {offset: '100%', triggerOnce: true});
                $(image).data('waypoint_handler', waypoint_handler);
            });
        }
        window.az_gmap_init = function() {
            $('.az-gmap').each(function() {
                var gmap = this;
                if ($(gmap).data('latitude') && $(gmap).data('longitude') && !$(gmap).data('map')) {
                    var map = new google.maps.Map($(gmap).get(0), {
                        scrollwheel: false,
                        disableDefaultUI: true,
                        styles: $(gmap).data('styles') ? $(gmap).data('styles') : null,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    var location = new google.maps.LatLng(parseFloat($(gmap).data('latitude')), parseFloat($(gmap).data('longitude')));


                    var marker = new google.maps.Marker({
                        position: location,
                        map: map,
                        icon: $(gmap).data('marker') ? $(gmap).data('marker') : null
                    });

                    map.refresh = function() {
                        map.setZoom($(gmap).data('zoom') ? $(gmap).data('zoom') : 14);
                        map.setCenter(location);
                        google.maps.event.trigger(map, 'resize');
                    };
                    map.refresh();
                    $(gmap).data('map', map);
                }
            });
        };
        if ('google' in window) {
            window.az_gmap_init();
        }
        if ('isotope' in $.fn) {
            $('[data-isotope-items]').each(function() {

                var grid = this;
                $(grid).isotope($(grid).data('isotope-items'));
                $(grid).imagesLoaded().progress(function() {
                    $(grid).isotope('layout');
                });
                $(grid).one('arrangeComplete', function() {
                    $(window).trigger('resize');
                });
                var filters = false;
                var filters_closeness = false;
                $('[data-isotope-filters]').each(function() {
                    var parent = $(grid).parents().has(this).first();
                    if (filters === false) {
                        filters = this;
                        filters_closeness = $(grid).parents().index(parent);
                    } else {
                        if (filters_closeness > $(grid).parents().index(parent)) {
                            filters = this;
                            filters_closeness = $(grid).parents().index(parent);
                        }
                    }
                });
                if (filters) {
                    $(filters).find('[data-filter]').on('click', function() {
                        $(grid).isotope({filter: $(this).attr('data-filter')});
                        $(filters).find('[data-filter].az-is-checked').removeClass('az-is-checked');
                        $(this).addClass('az-is-checked');
                    });
                }
            });
        }
        if ('masonry' in $.fn) {
            $('[data-masonry-items]').each(function() {
                var grid = this;
                $(grid).masonry($(grid).data('masonry-items'));
                $(grid).imagesLoaded().progress(function() {
                    $(grid).masonry('layout');
                });
                $(grid).one('arrangeComplete', function() {
                    $(window).trigger('resize');
                });
            });
        }
        $('.az-share').each(function() {
            var share = this;
        });
        $('form').each(function() {
            $('input, textarea').on('change', function() {
                if ($(this).val() === '') {
                    $(this).parent().removeClass('az-filled');
                } else {
                    $(this).parent().addClass('az-filled');
                }
            });
        });
        $('[data-parallax="true"]').each(function() {
            $(this).css({
                "background-size": "cover",
                "background-repeat": "no-repeat",
                "background-attachment": "fixed"
            });
            $(this).parallax("50%", $(this).data('parallax-speed') / 100);
        });
        $('[data-background-mode="semi-transparent-color"]').each(function() {
            $(this).css('position', 'relative');
            $('<div></div>').prependTo(this).css({
                "position": "absolute",
                "left": "0",
                "top": "0",
                "right": "0",
                "bottom": "0",
                "opacity": 1 - parseInt($(this).data('transparency'), 10) / 100,
                "background-color": $(this).css('background-color')
            });
        });
        $('a[href*="#"].az-roll, .az-roll a[href*="#"]').off('click').on('click', function(e) {
            if (this.href.split('#')[0] === '' || window.location.href.split('#')[0] === this.href.split('#')[0]) {
                e.preventDefault();
                var hash = this.hash;
                $('html, body').stop().animate({
                    'scrollTop': $(hash).offset().top
                }, 2000);
            }
        });
        if ('knob' in $.fn) {
            $(".az-knob").knob();
        }
        if (document.documentElement.clientWidth > 768) {
            if (typeof scrollReveal === 'function') {
                window.scrollReveal = new scrollReveal();
            }
        }
        $(window).trigger('azh-extension-after-init');
    });
})(jQuery);