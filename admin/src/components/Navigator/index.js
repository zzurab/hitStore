
import React, {
    Fragment
} from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
    Link
} from 'react-router-dom';

import {Pages} from '../../pages';

export class Navigator extends React.Component{
    constructor(props){
        super(props);

        this.routeRenderingOrdering = this.routeRenderingOrdering.bind(this);
        
        this.renderRoutes = this.renderRoutes.bind(this);
    }

    routeRenderingOrdering(pages){
        let result = [];
        [
            'Dashboard',
            'Login',
            'NotFound'
        ].map(page => {
            result[page] = pages[page];
        });
        return result;
    }

    renderRoutes(){
        let pages = this.routeRenderingOrdering(Pages);
        
        return [
            ...Object.keys(pages).map((pageName, index) => (
                <Route
                    key={index}
                    path={Pages[pageName].path}
                    exact={true}
                    component={Pages[pageName].page}/>
            ))
        ];
    }
    
    render(){
        return (
            <Router>
                <Fragment>
                    <Switch>
                        {this.renderRoutes()}
                    </Switch>
                </Fragment>
            </Router>
        )
    }
}