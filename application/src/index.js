
import React from 'react';
import {connect} from 'react-redux';

import {Navigator} from './components/Navigator';

class Application extends React.Component{
    render(){
        return (
            <Navigator />
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

export default connect(states, actions)(Application);