class Post {
    static isValid(model) {
        // validate
        return typeof model !== 'undefined';
    }

    static toViewModel(model) {
        const viewModel = new Post();
        Object.keys(model)
            .forEach((prop) => {
                viewModel[prop] = model[prop];
            });
        return viewModel;
    }
}

module.exports = Post;
