const attachTo = (app, { chatController }) => {
    app.get('/chat', chatController.renderChat);
};

module.exports = { attachTo };
