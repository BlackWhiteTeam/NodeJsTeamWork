/* global $ */

$(document).ready(function() {
    $('.add').click(function(ev) {
        const id = $('.item.active').attr('data-post-id');
        console.log(id);
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
        const id = $('.item.active').attr('data-post-id');
        console.log(id);
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
