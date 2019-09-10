
import React from 'react';
import {connect} from 'react-redux';

import {Navigator} from './components/Navigator';

import {Sidebar} from './components/Sidebar';

class Application extends React.Component{
    render(){
        return (
            <Sidebar>
                <Navigator />
            </Sidebar>
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