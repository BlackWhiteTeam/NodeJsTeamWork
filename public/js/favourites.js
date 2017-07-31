/* global $ */

$(document).ready(function() {
    $('.add').click(function(ev) {
        let id = $('.item.active').attr('data-post-id');
        if (!id) {
            id = $(ev.target).siblings().eq(0)
                .find('.float-right').attr('data-post-id');
        }
        $.ajax({
            url: '/addToFavourites',
            type: 'POST',
            data: ({
                postId: id,
            }),
            success: () => {
                $(ev.target).hide();
                $(ev.target).parent().find('.delete').show();
            },
        });
    });

    $('.delete').click(function(ev) {
        let id = $('.item.active').attr('data-post-id');
        if (!id) {
            id = $(ev.target).siblings().eq(0)
                .find('.float-right').attr('data-post-id');
        }
        $.ajax({
            url: '/deleteFromFavourites',
            type: 'POST',
            data: ({
                postId: id,
            }),
            success: () => {
                $(ev.target).hide();
                $(ev.target).parent().find('.add').show();
            },
        });
    });
});
