const tmaxOptionsGlobal = {
    repeat: 2,
    repeatDelay: 0.65,
    yoyo: true,
};

CSSPlugin.useSVGTransformAttr = true;

const tl = new TimelineMax(tmaxOptionsGlobal);
const path = 'svg *';
const staggerVal = 0.0125;
const duration = 2;

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
    ease: Power4.easeInOut
};

tl.staggerTo(path, duration, staggerOptsTo, staggerVal);

const $svg = $('svg');
$svg.hover(
    function() {
        tl.timeScale(0.15);
    },
    function() {
        tl.timeScale(1);
    });

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
