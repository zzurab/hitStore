
import React from 'react';
import {connect} from 'react-redux';

import {Navigator} from './components/Navigator';

import {Loading} from './components/Loading';

import {initLanguageData, setCurrentLanguage} from './actions/Language';

import {getMissingItemsFrom} from './helpers';

import {reactLocalStorage as Storage} from 'reactjs-localstorage';

import Translate from './components/Translate';

class App extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            ready: false
        }
    }

    componentDidMount(){
        let items = getMissingItemsFrom(this.props.Language, 'Language');

        if(items.length){
            this.props.getInitLanguageData();
        }else{
            this.setState({
                ready: true
            });
        }
    }

    componentDidUpdate(){
        if(!this.state.ready){
            let items = getMissingItemsFrom(this.props.Language, 'Language');

            if(items.length){
                console.table(items);
            }else{
                if(!this.props.Language.current.id){
                    this.props.setCurrentLanguage(
                        this.props.Language.languages.data.find(lang => lang.code === 'en')
                    );
                }
                this.setState({
                    ready: true
                })
            }
        }
    }
    
    render(){
        return this.state.ready ? (
            <div id="AppContainer">
                {/* <Navigator /> */}
                <Translate>
                    bbx_c
                </Translate>
            </div>
        ) : <Loading />
    }
}

const states = store => {
    return {
        Language: store.LanguageReducer
    }
}

const actions = dispatch => {
    return {
        setCurrentLanguage: language => {
            Storage.set('_app:language:current', JSON.stringify(language));
            dispatch(setCurrentLanguage(language));
        },
        getInitLanguageData: () => {
            dispatch(initLanguageData());
        }
    }
}

export default connect(states, actions)(App);