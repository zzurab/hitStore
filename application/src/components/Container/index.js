
import React from 'react';

import {
    View
} from 'react-native';

import {styles} from './styles';

export class Container extends React.PureComponent{
    render(){
        return (
            <View
                {...this.props.containerProps}
                style={[
                    styles.container,
                    {...this.props.containerStyles}
                ]}>
                <View 
                    {...this.props.rowProps}
                    style={[
                        styles.row,
                        {...this.props.rowStyles}
                ]}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}