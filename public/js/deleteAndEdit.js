/* global $, toastr */
$(document).ready(function() {
    $('.deletePost').click(function(ev) {
        let id = $(ev.target).attr('data-post');
        let bin = false;
        if (!id) {
            id = $(ev.target).parent().attr('data-post');
            bin = true;
        }
        console.log(id);
        $('#confirm-delete').click(function() {
            $.ajax({
                url: '/deletePost',
                type: 'POST',
                data: ({
                    postId: id,
                }),
                success: () => {
                    if (bin) {
                        $(ev.target).parent().parent().parent().hide();
                    }
                    $(ev.target).parent().parent().hide();
                    toastr.success('Successfully deleted');
                },
                error: () => {
                    console.log('error');
                },
            });
        });
    });
});

