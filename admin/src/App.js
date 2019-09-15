
import React from 'react';
import {connect} from 'react-redux';

class App extends React.Component{
    render(){
        return (
            <div>
                <h1>
                    Hello World
                </h1>
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