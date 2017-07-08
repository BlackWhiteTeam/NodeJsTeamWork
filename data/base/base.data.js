class BaseData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        let result = this.collection
            .find()
            .toArray();

        if (this.ModelClass.toViewModel) {
            result = result.then((models) => {
                return models.map((model) =>
                    this.ModelClass.toViewModel(model));
            });
        }
        return result;
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Invalid model');
        }
        return this.collection.insert(model)
            .then(() => {
                return this.ModelClass.toViewModel(model);
            });
    }

    getById(id) {
        const mongo = require('mongodb');
        const objectId = new mongo.ObjectID(id);
        return this.collection
            .findOne({ _id: objectId });
    }

    _isModelValid(model) {
        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;
