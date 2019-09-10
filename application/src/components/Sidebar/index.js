
import React from 'react';

import RNSidebar from 'react-native-sidebar';

import {LeftSide} from './leftSide';
import {RightSide} from './rightSide';

export class Sidebar extends React.Component{
    render(){
        return (
            <RNSidebar
                open={false}
                leftSidebar={<LeftSide />}
                rightSidebar={<RightSide />}
                style={{
                    flex: 1
                }}>
                {this.props.children}
            </RNSidebar>
        )
    }
}