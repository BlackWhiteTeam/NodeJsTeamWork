const chatController = () => {
    return {
        renderChat(req, res) {
            if (req.user) {
                res.render('chat/chat');
            } else {
                res.redirect('/login');
            }
        },
    };
};

module.exports = chatController;
