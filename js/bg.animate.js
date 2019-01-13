jQuery(document).ready(function($){
    function detectIE() {
        var ua = window.navigator.userAgent;

        var msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        var trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        var edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // IE 12 (aka Edge) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }

    if ((Modernizr && !Modernizr.inlinesvg) || (false !== detectIE())) {
        var after;

        for (i=1; i<10; i++) {
            var section = $('.section' + i);
            var cssBGImage = section.css('backgroundImage');
            var cssBGPosition = section.css('backgroundPosition');

            section.css({background: 'none'});

            after = $('<div></div>')
                .addClass('section-after')
                .addClass('section-after' + i)
                .css({
                backgroundImage: cssBGImage,
                backgroundPosition: cssBGPosition,
                backgroundRepeat: 'no-repeat',
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                height: '100%',
                opacity: 0
            }).on('appear', function() {
                if (!$(this).is(':animated')) {
                    $(this).animate({opacity: 1}, 1000);
                }
            }).appendTo(section);
        }

        $('.section-after').appear();
    } else {
        for (i=1; i<10; i++) {
            $('.section' + i).css({
                backgroundImage: 'none'
            });
        }

        var mult = 30;
        var del = 0;

        $('svg').appear();

        $('svg').each(function(j,k){
            $(k).on('appear', function(){
                del = 0;

                $('ellipse, path, circle, polygon, rect', this).each(function(i,e){
                    del += mult;

                    $(e).delay(del).animate({
                        opacity: 1,
                        duration: mult
                    });
                });
            });
        });
    }


});