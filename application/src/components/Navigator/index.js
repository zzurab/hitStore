
import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';

import {
    Login,
    Welcome
} from '../../screens/Intro';

export class Navigator extends React.Component{
    constructor(props){
        super(props);

        this.appContainer = createAppContainer(
            createMaterialBottomTabNavigator({
                Intro: createStackNavigator({
                    Welcome: {
                        screen: Welcome
                    },
                    Login: {
                        screen: Login
                    }
                }, {
                    initialRouteName: 'Welcome'
                }),
                Main: createMaterialBottomTabNavigator({
                    Welcome: {
                        screen: Welcome
                    }
                })
            }, {
                initialRoutName: 'Intro'
            })
        );

        this.getAppcontainer = this.getAppcontainer.bind(this);
    }

    getAppcontainer(){
        let NavigationContainer = this.appContainer;
        return <NavigationContainer />
    }

    render(){
        return this.getAppcontainer();
    }
}