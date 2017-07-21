/* globals $ */

const jumboHeight = $('.jumbotron').outerHeight();
function parallax() {
    const scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
    $('.bg').css('width', ($(window).width()));
}

$(window).scroll(function(e) {
    parallax();
});
