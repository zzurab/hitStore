
import React from 'react';
import {render as ReactDOMRender} from 'react-dom';

import {Provider} from 'react-redux';

import App from './App';

import Store from './store';

import 'normalize.css'
import './styles/style.scss';

class Root extends React.Component{
    render(){
        return (
            <Provider store={Store}>
                <App />
            </Provider>
        )
    }
}

ReactDOMRender(
    <Root />,
    document.querySelector('#root')
);