
module.exports = {
    getLanguages: collection => (req, res, next) => {
        collection
            .get()
            .then(data => {
                let result = data.docs.map(doc => {
                    return {
                        ...doc.data(),
                        id: doc.id
                    };
                });
                req.hitData = result;
                next();
            })
            .catch(error => {
                next(error);
            })
    },
    getAllKeywords: ({keywordsCollection, languagesCollection}) => (req, res, next) => {
        languagesCollection
            .get()
            .then(data => {
                return languageDocs = data.docs.map(doc => doc);
            })
            .then(languageDocs => {
                let languageMap = [];
                languageDocs.map(doc => {
                    languageMap.push([doc.data().code, doc.id]);
                });

                keywordsCollection
                    .get()
                    .then(data => {
                        return data.docs.map(doc => doc.data());
                    })
                    .then(data => {
                        return data.map(doc => {
                            doc.languageCode = languageMap.find(lang => doc.languageId == lang[1])[0];
                            return doc;
                        })
                    })
                    .then(data => {
                        let result = {};
                        languageMap.map(doc => {
                            result[doc[0]] = [];
                        });
                        data.map(doc => {
                            let {slag, value} = doc;
                            result[doc.languageCode].push({slag, value});
                        });
                        return result;
                    })
                    .then(data => {
                        req.hitData = data;
                        next();
                    })
                    .catch(error => {
                        next(error);
                    })
            })
            .catch(error => {
                next(error);
            })
    },

    getKeywords: ({languagesCollection, keywordsCollection, errors}) => (req, res, next) => {
        languagesCollection
            .where('code', '==', req.query.code)
            .limit(1)
            .get()
            .then(data => {
                if(data.docs.length){
                    return data.docs[0].id;
                }else {
                    throw new Error(errors.prefix + '' + errors.notFound);
                }
            })
            .then(id => {
                return keywordsCollection
                    .where('languageId', '==', id)
                    .get()
            })
            .then(keywords => {
                let result = keywords.docs.map(doc => doc.data());
                req.hitData = result;
                next();
            })
            .catch(error => {
                next(error);
            });
    },

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
    addKeywords: collection => (req, res, next) => {
        let keyword = {
            slag: req.body.slag,
            createdAt: (new Date()).toISOString()
        };

        let promises = Object.keys(req.body.data).map(lang => {
            return new Promise((resolve, reject) => {
                keyword.value = req.body.data[lang];
                keyword.languageId = lang;
                collection
                    .add(keyword)
                    .then(() => {
                        resolve();
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });

        Promise.all(promises)
            .then(() => {
                next();
            })
            .catch(error => {
                next(error);
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
    removeKeywordsBySlag: collection => (req, res, next) => {
        let promises = [];
        collection
            .where('slag', '==', req.body.slag)
            .get()
            .then(data => {
                return data.docs.map(data => data.id);
            })
            .then(IDS => {
                promises = IDS.map(id => {
                    return new Promise((resolve, reject) => {
                        collection
                            .doc(id)
                            .delete()
                            .then(() => {
                                resolve();
                            })
                            .catch(error => {
                                reject(error);
                            });
                    })
                });

                Promise.all(promises)
                    .then(() => {
                        next();
                    })
                    .catch(error => {
                        next(error);
                    });
            })
            .catch(error => {
                next(error);
            });
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