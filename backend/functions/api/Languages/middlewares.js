
module.exports = {
    addLanguage: collection => (req, res, next) => {
        let language = {
            code: req.body.code,
            name: req.body.name,
            createdAt: (new Date()).toISOString()
        };

        collection
            .add(language)
            .then(data => {
                next();
            })
            .catch(error => {
                next(error);
            });
    },

    updateLanguageName: collection => (req, res, next) => {
        collection
            .doc(req.body.id)
            .update({
                name: req.body.name,
                updatedAt: (new Date()).toISOString()
            })
            .then(data => {
                next();
            })
            .catch(error => {
                next(error);
            });
    },
    removeLanguageById: collection => (req, res, next) => {
        collection
            .doc(req.body.id)
            .delete()
            .then(() => {
                next();
            })
            .catch(error => {
                next(error);
            })
    },
    removeKeywordsByLanguageId: collection => (req, res, next) => {
        collection
            .where('languageId', '==', req.body.id)
            .get()
            .then(data => {
                let promises = [];
                data.forEach(doc => {
                    promises.push(doc.ref.delete());
                });
                Promise.all(promises).then(() => {
                    next();
                });
            })
            .catch(error => {
                next(error);
            })
    },
    addKeyword: collection => (req, res, next) => {
        let keyword = {
            languageId: req.body.languageId,
            slag: req.body.slag,
            value: req.body.value,
            createdAt: (new Date()).toISOString()
        };
        collection
            .add(keyword)
            .then(() => {
                next();
            })
            .catch(error => {
                reject(error);
            })
    },
    removeKeywordById: collection => (req, res, next) => {
        collection
            .doc(req.body.id)
            .delete()
            .then(() => {
                next();
            })
            .catch(error => {
                next(error);
            })
    },
    updateKeyword: collection => (req, res, next) => {
        let updateData = {
            updatedAt: (new Date()).toISOString(),
            value: req.body.value
        };
        collection
            .doc(req.body.id)
            .update(updateData)
            .then(() => {
                next();
            })
            .catch(error => {
                next(error);
            });
    }
}