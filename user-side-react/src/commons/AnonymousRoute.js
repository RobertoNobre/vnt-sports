import React from 'react';
import { Route } from 'react-router-dom';
import Base from '../base';

const AnonymousRoute = ({ component: Component, ...rest }) =>
    <Route {...rest} render={
        props => {
            return (
                <Base history={props.history}>
                    <Component {...props} />
                </Base>
                );
        }
    } />

export default AnonymousRoute;