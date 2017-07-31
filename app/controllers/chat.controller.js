const chatController = () => {
    return {
        renderChat(req, res) {
            if (req.user) {
                res.render('chat/chat');
                console.log(req.user);
            } else {
                res.redirect('/login');
            }
        },
    };
};

module.exports = chatController;
