
import React from 'react';
import {connect} from 'react-redux';

import {
    Container,
    Grid,
    Paper,
    Box,
    Hidden,
    Button,
    ButtonGroup
} from '@material-ui/core';

import {
    ArrowDropDown
} from '@material-ui/icons';

class Login extends React.Component{
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);

        this.toggle = this.toggle.bind(this);
    }

    onClick(){

    }

    toggle(){

    }

    render(){
        return (
            <Container>
                <Grid
                    container={true}
                    spacing={3}>
                    <Grid item={true} xs={12}/>
                    <Grid item={true}
                        xs={12}>
                        <ButtonGroup
                            onClick={this.onClick}>
                            <Button
                                color={'secondary'}
                                size={'small'}
                                onClick={this.toggle}>
                                <ArrowDropDown />
                            </Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            </Container>
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

export default connect(states, actions)(Login)