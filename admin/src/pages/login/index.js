
import React from 'react';
import {connect} from 'react-redux';

class Login extends React.Component{
    render(){
        return (
            <div>
                <h1>
                    Login
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

export default connect(states, actions)(Login)