
module.exports = {
    signUp: {
        auth: firebase => (req, res, next) => {
            firebase
                .auth()
                .createUserWithEmailAndPassword(
                    req.body.email,
                    req.body.password
                )
                .then(data => {
                    data.user.getIdToken()
                        .then(token => {
                            req.hitData = {
                                user: data.user,
                                idToken: token
                            };
                            next();
                        })
                        .catch(error => {
                            next(error);
                        })
                })
                .catch(error => {
                    next(error);
                });
        },
        save: collection => (req, res, next) => {
            let user = {
                email: req.body.email,
                createdAt: (new Date()).toISOString(),
                userId: req.hitData.user.uid
            };
    
            collection
                .add(user)
                .then(user => {
                    req.hitData = req.hitData.idToken;
                    next();
                })
                .catch(error => {
                    next(error);
                });
        }
    },
    signIn: {
        auth: ({firebase, passwordErrorMessage}) => (req, res, next) => {
            firebase
                .auth()
                .signInWithEmailAndPassword(
                    req.body.email,
                    req.body.password
                )
                .then(data => {
                    return data.user.getIdToken()
                })
                .then(token => {
                    req.hitData = token;
                    next();
                })
                .catch(error => {
                    switch(error.code) {
                        case 'auth/wrong-password': {
                            next(new Error(passwordErrorMessage));
                            break;
                        }
                        default: {
                            next(error);
                            break;
                        }
                    }
                });
        },
        updateLastLogin: collection => (req, res, next) => {
            collection
                .where('email', '==', req.body.email)
                .limit(1)
                .get()
                .then(data => {
                    return data.docs[0].id
                })
                .then(id => {
                    collection
                        .doc(id)
                        .update({
                            'lastLoginAt': (new Date()).toISOString()
                        })
                        .then(data => {
                            next();
                        })
                        .catch(error => {
                            next(error);
                        });
                })
        }
    },
    info: {
        update: collection => (req, res, next) => {
            let updateData = {
                'updatedAt': (new Date()).toISOString()
            };
            Object.keys(req.body.data).map(key => {
                updateData[key] = req.body.data[key]
            })

            collection
                .doc(req.authUserCollectionId)
                .update(updateData)
                .then(data => {
                    next();
                })
                .catch(error => {
                    next(error);
                })
        }
    }
}