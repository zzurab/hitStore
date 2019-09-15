
module.exports = {
    codeExists: collection => value => new Promise((resolve, reject) => {
        collection
            .where('code', '==', value)
            .limit(1)
            .get()
            .then(data => {
                if(data.docs[0]){
                    resolve();
                }else{
                    reject();
                }
            })
            .catch(error => {
                reject(error);
            })
    }),
    nameExists: collection => value => new Promise((resolve, reject) => {
        collection
            .where('name', '==', value)
            .limit(1)
            .get()
            .then(data => {
                if(data.docs[0]){
                    resolve();
                }else{
                    reject();
                }
            })
            .catch(error => {
                reject(error);
            })
    }),
    languageExistsById: collection => value => new Promise((resolve, reject) => {
        collection
            .doc(value)
            .get()
            .then(data => {
                if(data.data()){
                    resolve();
                }else{
                    reject();
                }
            })
            .catch(error => {
                reject();
            })
    }),
    
    keywordExistsBySlag: collection => value => new Promise((resolve, reject) => {
        collection
            .where('slag', '==', value)
            .limit(1)
            .get()
            .then(data => {
                if(data.docs[0]){
                    resolve();
                }else{
                    reject();
                }
            });
    }),
    keywordExistsById: collection => value => new Promise((resolve, reject) => {
        collection
            .doc(value)
            .get()
            .then(data => {
                if(data.data()){
                    resolve();
                }else{
                    reject();
                }
            })
            .catch(error => {
                reject(error);
            })
    }),
    keywordExistsBySlagAndLanguageId: ({languageCollection, keywordsCollection}) => (value, {req}) => new Promise((resolve, reject) => {
        keywordsCollection
            .where('languageId', '==', req.body.languageId)
            .where('slag', '==', value)
            .get()
            .then(data => {
                return data.docs.length ? resolve() : reject();
            })
            .catch(error => {
                reject(error);
            })
    })
}