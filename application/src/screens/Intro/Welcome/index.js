
import React from 'react';

import {
    View,
    Text,
    ScrollView
} from 'react-native';

import {Container} from '../../../components/Container';

import {Wrapper} from '../wrapper';

import {styles} from './styles';

class Welcome extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Wrapper>
                
            </Wrapper>
        )
    }
}

export default {
    Component: Welcome,
    states: store => {
        return {
        }
    },
    actions: dispatch => {
        return {
        }
    }
};