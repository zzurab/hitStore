
import Axios from 'axios';

import * as ActionTypes from '../ActionTypes';

import {api} from '../../config';

export function setCurrentLanguage(language){
    return {
        type: ActionTypes.SET_LANGUAGE_CURRENT,
        payload: language
    }
}

export function initLanguageData(){
    return {
        type: ActionTypes.INIT_LANGUAGE_DATA,
        payload: new Promise((resolve, reject) => {
            Axios.all([
                Axios.get(api.getApiUrl(api.languageKeys)),
                Axios.get(api.getApiUrl(api.languageKeywords))
            ])
                .then(Axios.spread((languageKeys, languageKeywords) => {
                    resolve({
                        languages: languageKeys.data.response,
                        keywords: languageKeywords.data.response
                    });
                }))
                .catch(error => {
                    reject(error);
                });  
        })
    }
}