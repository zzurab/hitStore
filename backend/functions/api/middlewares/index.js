
module.exports = {
    transformTempdDataToData: dataNotFound => (req, res, next) => {
        if(req.tempdData){
            req.body[req.tempdData[0]] = req.tempdData[1];
            next();
        }else{
            next(new Error(dataNotFound))
        }
    },
    validationErrors: validationResult => (req, res, next) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            next();
        }else{
            next(errors);
        }
    },
    
    emailExists: collection => (value, {req}) => new Promise((resolve, reject) => {
        collection
            .where('email', '==', value)
            .limit(1)
            .get()
            .then(data => {
                return data.size ? resolve() : reject();
            })
            .catch(error => {
                reject(error);
            });
    }),
    
    authorized: admin => (value, {req}) => new Promise((resolve, reject) => {
        let idToken;

        try{
            if(value){
                if(value.startsWith('__MOTHERFUCKER__-')){
                    idToken = value.split('__MOTHERFUCKER__-')[1];
                }else{
                    throw new Error('invalid_token');
                }
            }else{
                throw new Error('token_not_found');
            }
        }catch(error){
            reject(error);
        }

        admin
            .auth()
            .verifyIdToken(idToken)
            .then(decodedToken => {
                req.authToken = decodedToken;
                return decodedToken;
            })
            .then(decodedToken => {
                return admin
                        .firestore()
                        .collection('users')
                        .where('userId', '==', decodedToken.user_id)
                        .limit(1)
                        .get()
            })
            .then(data => {
                req.authUserId = data.docs[0].data().userId;
                req.authUserCollectionId = data.docs[0].id;

                resolve();
            })
            .catch(error => {
                // let err;
                // switch(error.code){
                //     case 'auth/id-token-expired': {
                //         err = new Error('token-expired');
                //         break;
                //     }
                //     default: {
                //         err = error;
                //         break;
                //     }
                // }
                reject();
            });
    }),

    isAdmin: ({collection, ADMIN_ERROR}) => (req, res, next) => {
        if(req.authUserCollectionId){
            collection
                .doc(req.authUserCollectionId)
                .get()
                .then(data => {
                    let userData = data.data();
                    if(userData.admin === true){
                        next();
                    }else{
                        next(new Error(ADMIN_ERROR));
                    }
                })
                .catch(error => {
                    next(error);
                });
        }else{
            next(new Error('token_not_found'));
        }
    }
}