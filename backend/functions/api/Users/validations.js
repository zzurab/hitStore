
const {userInfoKeys} = require('../../config');

const validator = require('validator');

module.exports = {
    passwordMatch: (value, {req}) => new Promise((resolve, reject) => {
        if(value !== req.body.password){
            reject();
        }else{
            resolve();
        }
    }),
    correctInfoKeys: (value, {req}) => new Promise((resolve, reject) => {
        let data = JSON.parse(value);
        let realData = {};
        let keys = Object.keys(data);
        keys = keys.filter(key => userInfoKeys.indexOf(key) !== -1);
        if(keys.length){
            keys.map(key => {
                realData[key] = data[key];
            });
            req.body.data = realData;
            resolve();
        }else{
            reject();
        }
    }),
    validateData: ({
        errorMessages,
        errorPrefix
    }) => (value, {req}) => new Promise((resolve, reject) => {
        let data = value;

        function formatError(item, code){
            return errorPrefix + item + '/' + errorMessages[code];
        }

        Object.keys(data).map(item => {
            switch(item){
                case 'firstName': {
                }
                case 'lastName': {
                    if(validator.isEmpty(data[item])){
                        throw new Error(formatError(item, 'EMPTY'));
                    }
                    data[item] = data[item].trim().toLowerCase();
                    break;
                }
                case 'phoneNumber': {
                    if(!validator.isEmpty(req.body.countryCodePhoneNumber)){
                        if(!validator.isEmpty(data[item])){
                            data[item] = data[item].replace(/[^0-9]/g, '');
                        }else{
                            throw new Error(formatError(item, 'EMPTY'));
                        }
                        if(!validator.isMobilePhone(data[item])){
                            throw new Error(formatError(item, 'INVALID'));
                        }
                        req.body.countryCodePhoneNumber = req.body.countryCodePhoneNumber.replace(/[^0-9+]/g, '');
                        data[item] = (req.body.countryCodePhoneNumber ? req.body.countryCodePhoneNumber : '?country_code?') + data[item].trim().toLowerCase();
                    }else {
                        throw new Error(formatError(item, 'INVALID'));
                    }
                    break;
                }
                case 'location': {
                    if(!validator.isEmpty(data[item])){
                        data[item] = data[item].replace(/[^0-9,-.]/g, '');
                    }else{
                        throw new Error(formatError(item, 'EMPTY'));
                    }
                    if(!validator.isLatLong(data[item])){
                        throw new Error(formatError(item, 'INVALID'));
                    }
                    break;
                }
                case 'birthDate': {
                    if(validator.isEmpty(data[item])){
                        throw new Error(formatError(item, 'EMPTY'));
                    }
                    if(!validator.isNumeric(data[item])){
                        throw new Error(formatError(item, 'INVALID'));
                    }else{
                        data[item] = (new Date(parseInt(data[item]))).toISOString();
                    }
                    break;
                }
                default: {
                    break;
                }
            }
        });
        req.body.data = data;
        resolve();
    })
}