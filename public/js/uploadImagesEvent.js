/* globals $ */
$(document).ready(function() {
    $('#profile-picture').change(() => {
        $('#profile-picture-form').submit();
    });
});
