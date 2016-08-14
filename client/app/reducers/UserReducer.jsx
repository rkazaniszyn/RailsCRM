import Immutable from 'immutable';

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
        case 'RECEIVE_USER':
            return state.merge({
                data: action.data
            });
        default:
            return state
    }
}