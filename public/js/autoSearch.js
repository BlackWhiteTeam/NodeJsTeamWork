/* globals $, jQuery*/
$(document).ready(function() {
    const searchField = $('#searchField');
    const searchButton = $('#searchButton');

    searchField.focus();
    searchField.val(searchField.val());

    searchField.keyup(function(ev) {
        if (meaningfulKey(ev.keyCode)) {
            setTimeout(() => {
                searchButton.trigger('click');
            }, 1000);
        }
    });

    const meaningfulKey = (key) => {
        return (key !== 9 && key < 16) ||
            (key > 45 && key < 91) ||
            (key > 93 && key < 112) ||
            key > 188;
    };
});
