jQuery( document ).ready(function( $ ) {
	  $('a').click(function(){
	    $('html, body').animate({
	        scrollTop: $( $.attr(this, 'href') ).offset().top
	    }, 500);
	    return false;
	});
});


//Affix sidebar
jQuery( document ).ready(function( $ ) {
	$('#sidebar').affix({
	      offset: {
	        top: 245
	      }
		});

		var $body   = $(document.body);
		var navHeight = $('.navbar').outerHeight(true) + 10;

		$body.scrollspy({
			target: '#leftCol',
			offset: navHeight
		});
});



//Navbar Collapsing and in
jQuery( document ).ready(function( $ ) {
	$(document).ready(function () {
	$(".navbar-nav li a").click(function(event) {
	$("#navbar-collapse").collapse('hide');
	});
	});
});


//Sidebar li.active
jQuery( document ).ready(function( $ ) {
$(document).ready(function () {
    $('.nav li a').click(function(e) {

        $('.nav li').removeClass('active');

        var $parent = $(this).parent();
        if (!$parent.hasClass('active')) {
            $parent.addClass('active');
        }
        e.preventDefault();
    });
});
});



//Typewriter 
$( document ).ready(function( $ ) {

    typeContent(1);

    function typeContent(row)
    {
        if($('.section' + row).length > 0 && $('.section' + row).find("#src").html() != undefined)
        {
            var srcText = $('.section' + row).find("#src").html();
            var i = 0;
            var result = srcText[i];
            setInterval(function() {
                    if(i == srcText.length) {
                        clearInterval(this);
                        typeContent(++row);
                    };
                    i++;

                    if(srcText[i] != undefined && srcText[i] != '')
                    {
                        result += srcText[i].replace("\n", "<br />");
                        $('.section' + row).find("#target").html( result);
                    }
            },
            50); // the period between every character and next one, in milliseonds.
        }
    }
});


// Toggle
jQuery( document ).ready(function( $ ) {
$(document).ready(function(){
	
	$('ul.tabs li').click(function(){
		var tab_id = $(this).attr('data-tab');

		$('ul.tabs li').removeClass('current');
		$('.tab-content').removeClass('current');

		$(this).addClass('current');
		$("#"+tab_id).addClass('current');
	})

})
});
