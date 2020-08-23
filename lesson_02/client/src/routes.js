import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage } from './components';

export const useRoutes = () => (
    <Switch>
        <Route path="/" exact>
            <HomePage />
        </Route>
        <Redirect to="/" />
    </Switch>
);
