/* globals $, jQuery*/


const searchField = $('#searchField');
const searchButton = $('#searchButton');

searchField.focus();
searchField.val(searchField.val());

searchField.keyup((ev) => {
    setTimeout(() => {
        searchButton.trigger('click');
    }, 750);
});
