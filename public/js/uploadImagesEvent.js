/* globals $ */
$(document).ready(function() {
    $('#profile-picture').change(function() {
        $('#profile-picture-form').submit();
    });
});

$(document).ready(function() {
    $('#upload-picture').change(function() {
        $('#upload-picture-form').submit();
    });
});
