
import React from 'react';
import {Provider} from 'react-redux';

import Store from './src/store';

import Application from './src';

import {loadAsync as LoadFonts} from 'expo-font';
import {AppLoading} from 'expo';

class Element extends React.Component{
	constructor(props){
		super(props);

		this.state = {
			fontsLoaded: false
		};
	}

	componentDidMount(){
		LoadFonts({
			OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
			OpenSansLight: require('./assets/fonts/OpenSans-Light.ttf'),
			OpenSans: require('./assets/fonts/OpenSans-Regular.ttf'),
			openSansCondensedBold: require('./assets/fonts/OpenSansCondensed-Bold.ttf'),
			OpenSansCondensedLight: require('./assets/fonts/OpenSansCondensed-Light.ttf')
		})
			.then(() => {
				this.setState({
					fontsLoaded: true
				});
			})
	}

	render(){
		return this.state.fontsLoaded ? <Application /> : <AppLoading />
	}
}

export default function App() {
	return (
		<Provider
			store={Store}>
			<Element />
		</Provider>
	)
}