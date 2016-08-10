import Immutable from 'immutable';


// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function userReducer(state = Immutable.fromJS({
    isAuthenticated: localStorage.getItem('id_token') ? true : false,
    data: {},
}), action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return state.merge({
                isAuthenticated: true,
                data: action.data,
            });
        case 'LOGOUT_SUCCESS':
            return state.merge({
                isAuthenticated: false,
                data: {},
            });
        default:
            return state
    }
}
