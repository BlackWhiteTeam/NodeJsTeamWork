/* globals $ io */

$(function() {
    const socket = io();

    socket.emit('show-messages');

    $('#message-form').submit(function() {
        const message = $('#message').val();
        if (message.length === 0) {
            return false;
        }
        const user = $('#usrname').text();
        socket.emit('send-message', { user, message });
        $('#message').val('');
        return false;
    });

    socket.on('show-messages', (messages) => {
        messages.forEach(function(message) {
            appendMessage(message);
        });
        $('#messenger')
            .animate({ scrollTop: $('#messenger').prop('scrollHeight') }, 0);
    });

    socket.on('send-message', function(message) {
        appendMessage(message);
        $('#messenger')
            .animate({ scrollTop: $('#messenger').prop('scrollHeight') }, 0);
    });

    function appendMessage(message) {
        const author = $('<li>').html(
            '<span id="author">' + message.user + ': ' + '<span/>'
        );
        $('#messages').append(author.append($('<span>').text(message.message)));
    }
});

