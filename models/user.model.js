const USERNAME_MATCH_PATTERN = /^[a-zA-Z0-9 ]{3,30}$/g;
const USER_PASSWORD_MATCH_PATTERN = /^[a-zA-Z0-9 ]{3,30}$/g;
const USER_EMAIL_MATCH_PATTERN =
/^[a-z0-9]+[_a-z0-9\.-]*[a-z0-9]+@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/g;
const USER_PROFILE_PICTURE_MATCH_PATTERN =
/^(\w*\.jpg\b)|(\w*\.JPG\b)|(\w*\.png\b)|(\w*\.PNG\b)|(\w*\.bmp\b)$/g;

class User {
    get id() {
        return this._id;
    }

    static isValid(model) {
        const result =
            (typeof model.name !== 'undefined' && typeof model.name === 'string'
            && model.password.match(USER_PASSWORD_MATCH_PATTERN)
            && model.name.match(USERNAME_MATCH_PATTERN)
            && model.email.match(USER_EMAIL_MATCH_PATTERN)
            && model.stringProfilePicture
            .match(USER_PROFILE_PICTURE_MATCH_PATTERN));
        return result;
    }

    static toViewModel(model) {
        const viewModel = new User();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = User;
