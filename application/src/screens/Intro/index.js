
import {connect} from 'react-redux';

import WelcomeComponent from './Welcome';
import LoginComponent from './Login';

export const Welcome = connect(WelcomeComponent.states, WelcomeComponent.actions)(WelcomeComponent.Component);
export const Login = connect(LoginComponent.states, LoginComponent.actions)(LoginComponent.Component);