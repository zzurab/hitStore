
import * as ActionTypes from '../../actions/ActionTypes';

const reducer = (state = {
    languages: {
        type: 1,
        ready: false,
        data: []
    },
    keywords: {
        type: 1,
        ready: false,
        data: []
    },
    current: {
        type: 0,
        data: {
            code: 'en'
        }
    }
}, action) => {
    switch(action.type){

        case ActionTypes.INIT_LANGUAGE_DATA: {}
        case ActionTypes.INIT_LANGUAGE_DATA + '_FULFILLED': {
            state = {
                ...state,
                languages: {
                    ...state.languages,
                    ready: true,
                    data: action.payload.languages
                },
                keywords: {
                    ...state.keywords,
                    ready: true,
                    data: action.payload.keywords
                }
            };
            if(!state.current.data.id){
                state = {
                    ...state,
                    current: {
                        ...state.current,
                        data: {
                            ...action.payload.languages.find(lang => lang.code === 'en')
                        }
                    }
                };
            }
            break;
        }
        
        default: {

            break;
        }
    }
    
    return state;
}

export default reducer;