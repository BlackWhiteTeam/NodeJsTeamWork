class User {
    get id() {
        return this._id;
    }

    static isValid(model) {
        // more validations
        return typeof model.name !== 'undefined' && model.name.length > 3;
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
