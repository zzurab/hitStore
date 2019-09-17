
import React from 'react';
import {connect} from 'react-redux';

class Translate extends React.Component{
    static translate = ({data, from, to, keywords}) => {
        console.log(keywords);
        let result = keywords[to].find(keyword => keyword.slag === data);
        return result ? result.value : '__' + data + '__';
    }
    
    render(){
        return this.props.children ? Translate.translate({
            data: this.props.children, 
            from: this.props.from || undefined,
            to: this.props.to || this.props.Language.current.data.code,
            keywords: this.props.Language.keywords.data
        }) : '__?__';
    }
}

const states = store => {
    return {
        Language: store.LanguageReducer
    }
}
const actions = dispatch => {
    return {
    }
}

export default connect(states, actions)(Translate);