/* global $ */

$(document).ready(function() {
    $('.dislike').click(function(ev) {
        sendRate(ev, 'dislike', 1, false);
        $(ev.target).parent().find('.disliked').show();
        $(ev.target).parent().find('.liked').trigger('click');
    });

    $('.disliked').click(function(ev) {
        sendRate(ev, 'undislike', -1, false);
        $(ev.target).parent().find('.dislike').show();
    });

    $('.like').click(function(ev) {
        sendRate(ev, 'like', 1, true);
        $(ev.target).parent().find('.liked').show();
        $(ev.target).parent().find('.disliked').trigger('click');
    });

    $('.liked').click(function(ev) {
        sendRate(ev, 'unlike', -1, true);
        $(ev.target).parent().find('.like').show();
    });
});

function sendRate(ev, type, count, like) {
    let id = $('.item').attr('data-post-id');
    if (!id) {
        id = $(ev.target).parent().attr('data-post-id');
    }
    $.ajax({
        url: '/' + type,
        type: 'POST',
        data: ({
            postId: id,
        }),
        success: () => {
            let counter = '';
            if (like) {
                counter = $(ev.target).siblings().eq(0);
            } else {
                counter = $(ev.target).siblings().last();
            }
            let rate = +counter.text() + count;
            if (rate < 0) {
                rate = 0;
            }
            counter.text(rate);
        },
    });
    $(ev.target).hide();
}
