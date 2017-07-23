/* global $ */


// Влади току що осъзнах, че това тук не е валидно за нашия carrousel,
// трябва да се направи така че като се цъкне на парента примерно,
// само неговия child да се променя,
// Защото така се променят всички останали likes and dislikes btns :D
// Хрумва ми да се направи парент на всеки два бутона с id = post.index
// и по парента вече вътре двата класа лесно ще ги контролираме,
// ако успея да се включа оттам ще го направя

$(document).ready(function() {
    $('.dislike').click(function() {
        $(this).hide();
        $('.disliked').show();
    });

    $('.disliked').click(function() {
        $(this).hide();
        $('.dislike').show();
    });

    $('.like').click(function() {
        $(this).hide();
        $('.liked').show();
    });

    $('.liked').click(function() {
        $(this).hide();
        $('.like').show();
    });
});
