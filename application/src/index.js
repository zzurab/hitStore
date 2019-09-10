
import React, {
    Fragment
} from 'react';
import {connect} from 'react-redux';

import {Navigator} from './components/Navigator';

import Sidebar from 'react-native-sidebar';

import {
    View,
    Text
} from 'react-native';

class Application extends React.Component{
    render(){
        return (
            <Fragment>
                <Sidebar
                    open={'right'}
                    rightSidebar={(
                        <View style={{flex: 1, backgroundColor: '#323232', paddingTop: 60}}>
                            <Text style={{color: 'white'}}>
                                RightSide
                            </Text>
                        </View>
                    )}
                    style={{
                        flex: 1
                    }}>
                    <Navigator />
                </Sidebar>
            </Fragment>
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