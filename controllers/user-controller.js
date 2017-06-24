module.exports = function () {
    return {
        getRegister(req, res){
            return Promise.resolve()
                .then(() => {
                    if(!req.isAuthenticated()){
                        res.render('register')
                    } else {
                        res.redirect('/home')
                    }
                })
        }
    }
};
