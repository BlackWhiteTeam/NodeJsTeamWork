const superagent = require('superagent');
const agent = superagent.agent();
const theAccount = {
    'username': 'asd',
    'password': 'asd',
};
const superAgent = () => {
    return {
        login(request, done) {
            request
                .post('/login')
                .send(theAccount)
                .end((err, res) => {
                    if (err) {
                        throw err;
                    }
                    agent.saveCookies(res);
                    done(agent);
                });
        },
    };
};
module.exports = superAgent;
