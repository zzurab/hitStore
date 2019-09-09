
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';

import Thunk from 'redux-thunk';
import Logger from 'redux-logger';

import {createPromise} from 'redux-promise-middleware'

import AuthReducer from './reducers/Auth';

export default createStore(
    combineReducers({
        AuthReducer
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
);