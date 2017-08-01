const chatController = () => {
    return {
        renderChat(req, res) {
            if (req.user) {
                return res.render('chat/chat', {
                    loggedIn: !!(req.user),
                    user: req.user,
                });
            }

            return res.redirect('/login');
        },
    };
};

module.exports = chatController;
