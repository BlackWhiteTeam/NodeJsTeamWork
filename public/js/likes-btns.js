/* global $ */

$(document).ready(function() {
    $('.dislike').click(function(ev) {
        sendRate(ev, 'dislike', 1, false);
        $(ev.target).parent().find('.disliked').show();
    });

    $('.disliked').click(function(ev) {
        sendRate(ev, 'undislike', -1, false);
        $(ev.target).parent().find('.dislike').show();
    });

    $('.like').click(function(ev) {
        sendRate(ev, 'like', 1, true);
        // $('.dislike').off('click');
        $(ev.target).parent().find('.liked').show();
    });

    $('.liked').click(function(ev) {
        sendRate(ev, 'unlike', -1, true);
        $(ev.target).parent().find('.like').show();
    });
});

function sendRate(ev, type, count, like) {
    const id = $('.item.active').attr('data-post-id');
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
            counter.text(+counter.text() + count);
        },
    });
    $(ev.target).hide();
}
