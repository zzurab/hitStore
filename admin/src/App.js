
import React from 'react';
import {connect} from 'react-redux';

import {Navigator} from './components/Navigator';

class App extends React.Component{
    render(){
        return (
            <div id="AppContainer">
                <Navigator />
            </div>
        )
    }
}

const states = store => {
    return {

    }
}

const actions = dispatch => {
    return {
    }
}

export default connect(states, actions)(App);