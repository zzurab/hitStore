
import React from 'react';
import {Provider} from 'react-redux';

import Store from './src/store';

import Application from './src';

export default function App() {
	return (
		<Provider
			store={Store}>
			<Application />
		</Provider>
	)
}