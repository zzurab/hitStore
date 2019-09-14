
import React, {
    Fragment
} from 'react';

import {
    View,
    StatusBar
} from 'react-native';

import {styles} from './styles';

export class Wrapper extends React.Component{
    render(){
        return (
            <Fragment>
                <StatusBar
                    hidden={true}/>
                <View 
                    {...this.props.wrapperProps}
                    style={[
                        styles.wrapper,
                        {...this.props.wrapperStyles}
                    ]}>
                    {this.props.children}
                </View>
            </Fragment>
        )
    }
}