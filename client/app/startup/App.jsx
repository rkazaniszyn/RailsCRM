import React from 'react';
import ReactOnRails from 'react-on-rails';
import { Router, browserHistory } from 'react-router';
import routes from '../routes/routes';

let App = (props) => (
    <Router history={browserHistory} children={routes} {...props} />
);

ReactOnRails.register({ App });