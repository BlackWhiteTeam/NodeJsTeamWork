/* eslint-disable max-len */
const encryptor = require('simple-encryptor')('asd214ag2t52rlla');

const init = (app) => {
    // eslint-disable-next-line
    const http = require('http').Server(app.server);
    const io = require('socket.io')(http);
    const onlineUsers = [];
    const sockets = [];

    io.on('connection', (socket) => {
        let userNow = null;

        let socketId = null;

        socket.on('crypt-name', (name) => {
            const cryptedName = encryptor.encrypt(name);

            socket.emit('crypted-name', cryptedName);
        });

        socket.on('decrypt-name', (cryptedName) => {
            const decryptedName = encryptor.decrypt(cryptedName);

            socket.emit('decrypted-name', decryptedName);
        });

        socket.on('person-connected', (username) => {
            const chatInfo = {};

            app.data.users.getAll().then((allUsers) => {
                const allUsersData = [];

                for (let i = 0; i < allUsers.length; i += 1) {
                    if (allUsers[i].name === username) {
                        userNow = {
                            username,
                            online: true,
                        };
                    } else {
                        allUsersData.push({
                            username: allUsers[i].name,
                            online: onlineUsers.filter((user) => {
                                return user.name === allUsers[i].name;
                            }).length > 0,
                        });
                    }
                }
                if (!userNow) {
                    socket.emit('wrong-token', {});
                    return;
                }
                socket.broadcast.emit('person-online', { username });
                sockets.push(socket);
                socketId = sockets.length - 1;
                onlineUsers.push(userNow);

                socket.on('send-message', (messageData) => {
                    app.data.chats.addMessageToChat(userNow.username, messageData.toUser, userNow.username, messageData.message)
                        .then((message) => {
                            const messageToSendToSender = {
                                toUsername: messageData.toUser,
                                messages: message.messages,
                                online: onlineUsers.filter((user) => {
                                    return user.name === messageData.toUser;
                                }).length > 0,
                            };
                            socket.emit('message-recive', messageToSendToSender);

                            for (let i = 0; i < onlineUsers.length; i += 1) {
                                if (onlineUsers[i].username === messageData.toUser) {
                                    const messageToSendToReciver = {
                                        toUsername: userNow.username,
                                        messages: message.messages,
                                        online: true,
                                    };

                                    sockets[i].emit('message-recive', messageToSendToReciver);
                                    break;
                                }
                            }
                        });
                });


                console.log('Connected: ' + onlineUsers.length + ' users connected');

                chatInfo.localUser = userNow;
                chatInfo.allUsersData = allUsersData;
                chatInfo.chats = [];
                app.data.chats.findChatsByUsername(userNow.username)
                    .then((chats) => {
                        for (let i = 0; i < chats.length; i += 1) {
                            if (chats[i].firstUser === userNow.username) {
                                chatInfo.chats.push({
                                    toUsername: chats[i].secondUser,
                                    messages: chats[i].messages,
                                    online: onlineUsers.filter((user) => {
                                        return user.name === chats[i].secondUser;
                                    }).length > 0,
                                });
                            } else if (chats[i].secondUser === userNow.username) {
                                chatInfo.chats.push({
                                    toUsername: chats[i].firstUser,
                                    messages: chats[i].messages,
                                    online: onlineUsers.filter((user) => {
                                        return user.name === chats[i].firstUser;
                                    }).length > 0,
                                });
                            } else {
                                throw new Error('Messages with user ' + userNow.username + ' Not found.');
                            }
                        }

                        socket.emit('draw-chat', chatInfo);
                    });
            });
        });

        socket.on('disconnect', () => {
            if (userNow) {
                for (let i = 0; i < onlineUsers.length; i += 1) {
                    if (userNow.username === onlineUsers[i].username) {
                        onlineUsers.splice(i, 1);
                    }
                }

                sockets.splice(socketId, 1);
                console.log('Disconnected: ' + onlineUsers.length + ' users connected');
            }
        });
    });

    return Promise.resolve(http);
};

module.exports = {
    init,
};

