
import React from 'react';

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {
    Login,
    Welcome
} from '../../screens/Intro';

export class Navigator extends React.Component{
    constructor(props){
        super(props);

        this.appContainer = createAppContainer(
            createBottomTabNavigator({
                Intro: createStackNavigator({
                    Welcome: {
                        screen: Welcome
                    },
                    Login: {
                        screen: Login
                    }
                }, {
                    initialRouteName: 'Welcome',
                    headerMode: 'none'
                }),
                Main: createBottomTabNavigator({
                    Welcome: {
                        screen: Welcome
                    }
                })
            }, {
                initialRoutName: 'Intro',
                tabBarComponent: () => null
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