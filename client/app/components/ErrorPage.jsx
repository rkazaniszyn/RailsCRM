import React from 'react';
import { Link } from 'react-router';

export default class ErrorPage extends React.Component
{
    render() {
        return(
            <div>
                <h1>An error occurred</h1>
                <Link to="/">Go back to the homepage</Link>
            </div>
        )
    }
}