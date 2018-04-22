import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user') && JSON.parse(localStorage.user).type == 'admin'
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/adminsOnly', state: { from: props.location } }} />
    )} />
)