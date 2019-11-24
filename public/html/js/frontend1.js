(function($) {
    "use strict";
    window.azh = $.extend({}, window.azh);
    function fullWidthSection() {
        var $elements = $('[data-full-width="true"]');
        $.each($elements, function(key, item) {
            var $el = $(this);
            var fixed = false;
            $el.parents().andSelf().each(function() {
                if ($(this).css('position') === 'fixed') {
                    fixed = true;
                    return false;
                }
            });
            if (!fixed) {
                var $el_full = $("<div></div>");
                $el.after($el_full);
                $el.css({
                    left: 0,
                    width: 0
                });
                var el_margin_left = parseInt($el.css("margin-left"), 10);
                var el_margin_right = parseInt($el.css("margin-right"), 10);
                var offset = 0 - $el_full.offset().left - el_margin_left;
                var width = $("body").prop("clientWidth");
                var container_width = $el_full.width();
                $el.css("display", "none");
                if ($el.css({
                    position: "relative",
                    left: offset,
                    "box-sizing": "border-box",
                    width: width
                }), !$el.data("stretch-content")) {
                    var padding = -1 * offset;
                    if (padding < 0) {
                        padding = 0;
                    }
                    var paddingRight = width - padding - container_width + el_margin_left + el_margin_right;
                    if (paddingRight < 0) {
                        paddingRight = 0;
                    }
                    $el.css({
                        "padding-left": padding + "px",
                        "padding-right": paddingRight + "px"
                    });
                }
                $el.css("display", "");
                $el.addClass('az-full-width');
                $el.animate({
                    opacity: 1
                }, 400);
                $el.trigger("az-full-width", {
                    container_width: container_width
                });
                $(window).trigger("az-full-width", {
                    element: $el,
                    container_width: container_width
                });
                $el.find('.az-container').css('width', container_width);
                $el_full.remove();
            }
        });
    }
    function fullHeightSection() {
        $('[data-full-height="true"]').each(function() {
            var $element = $(this);
            var windowHeight = $(window).height();
            var offsetTop = $element.offset().top;
            var fullHeight = 100 - offsetTop / (windowHeight / 100);
            offsetTop < windowHeight && (fullHeight, $element.css("min-height", fullHeight + "vh"));
        });
    }
    $(function() {
        $(window).off("resize.azh-fullWidthSection").on("resize.azh-fullWidthSection", fullWidthSection).off("resize.azh-fullHeightSection").on("resize.azh-fullHeightSection", fullHeightSection);
        fullWidthSection();
        fullHeightSection();
        if ('tabs' in $.fn) {
            $('.azexo-tabs').each(function() {
                if (!$(this).tabs('instance')) {
                    $(this).tabs();
                }
            });
        }
        if ('accordion' in $.fn) {
            $('.azexo-accordion').each(function() {
                if (!$(this).accordion('instance')) {
                    $(this).accordion({
                        header: ".accordion-section > h3",
                        autoHeight: false,
                        heightStyle: "content",
                        active: $(this).data('active-section'),
                        collapsible: $(this).data('collapsible'),
                        navigation: true,
                        animate: 200
                    });
                }
            });
        }
    });
})(jQuery);