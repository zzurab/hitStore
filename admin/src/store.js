
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import Thunk from 'redux-thunk';
import Logger from 'redux-logger';
import {createPromise} from 'redux-promise-middleware';

import AuthReducer from './reducers/Auth';
import LanguageReducer from './reducers/Language';

export default createStore(
    combineReducers({
        AuthReducer,
        LanguageReducer
    }),
    {},
    applyMiddleware(
        Thunk,
        Logger,
        createPromise({
            types: {
                fulfilled: 'success'
            }
        })
    )
)