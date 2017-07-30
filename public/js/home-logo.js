/* global $ */

$(document).ready(function() {
    // For the <p>-introduction opacity
    setTimeout(function() {
        $('.p-style-introduction').css('opacity', '0.8');
    }, 4000);

    // For the logo - SVG
    let repeat;
    if (navigator.userAgent
            .match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
        repeat = 0;
    } else {
        repeat = -1;
    }

    const tmaxOptionsGlobal = {
        repeat: repeat,
        repeatDelay: 0.55,
        yoyo: true,
    };

    CSSPlugin.useSVGTransformAttr = true;

    const tl = new TimelineMax(tmaxOptionsGlobal);
    const path = 'svg *';
    const staggerVal = 0.0125;
    const duration = 1.5;

    $.each($(path), function(i, el) {
        tl.set($(this), {
            x: '+=' + getRandom(-500, 500),
            y: '+=' + getRandom(-500, 500),
            rotation: '+=' + getRandom(-720, 720),
            scale: 0,
            opacity: 0,
        });
    });

    const staggerOptsTo = {
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        ease: Power4.easeInOut,
    };

    tl.staggerTo(path, duration, staggerOptsTo, staggerVal);

    const $container = $('.container');
    $container.hover(
        function() {
            tl.timeScale(0.15);
        },
        function() {
            tl.timeScale(1);
        });

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }
});
