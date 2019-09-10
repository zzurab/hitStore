
import React from 'react';

import {
    View,
    Text,
} from 'react-native';
import {
    Button
} from 'react-native-material-ui';

class Welcome extends React.Component{
    static navigationOptions = {
        headerMode: 'none',
        header: () => null
    }
    
    render(){
        return (
            <View style={{marginTop: 60}}>
                <Text>
                    Content
                </Text>
                <Button 
                    text={'login'}
                    primary
                    raised
                    onPress={() => {
                        this.props.navigation.navigate('Login');
                    }}/>
            </View>
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