import Immutable from 'immutable';

import {
    LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
    QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
} from '../actions/ActionCreators';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function userReducer(state = Immutable.fromJS({
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
}), action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return state.merge({
                isFetching: true,
                isAuthenticated: false,
                user: action.creds
            });
        case LOGIN_SUCCESS:
            return state.merge({
                isFetching: false,
                isAuthenticated: true,
                errorMessage: ''
            });
        case LOGIN_FAILURE:
            return state.merge({
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            });
        case LOGOUT_SUCCESS:
            return state.merge({
                isFetching: true,
                isAuthenticated: false
            });
        default:
            return state
    }
}
