import React from 'react';
import { Route } from 'react-router';

import RouterLayout from '../components/RouterLayout';
import RouterFirstPage from '../components/RouterFirstPage';
import RouterSecondPage from '../components/RouterSecondPage';

export default (
    <Route path="/" component={RouterLayout}>
        <Route path="first_page" component={RouterFirstPage} />
        <Route path="second_page" component={RouterSecondPage} />
    </Route>
);