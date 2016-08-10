import api from '../helpers/api';

export function updateName(name) {
    return {
        type: 'HELLO_WORLD_NAME_UPDATE',
        name,
    };
}

function ajaxStart() {
    return {
        type: 'AJAX_START'
    }
}
function ajaxStop() {
    return {
        type: 'AJAX_STOP'
    }
}

function receiveRecords(module, json) {
    return {
        type: 'RECEIVE_RECORDS',
        module,
        records: json,
        receivedAt: Date.now()
    }
}

function receiveRecord(module, json) {
    return {
        type: 'RECEIVE_RECORD',
        module,
        record: json,
        receivedAt: Date.now()
    }
}

function receiveMetadata(module, json) {
    return {
        type: 'RECEIVE_METADATA',
        module,
        metadata: json,
        receivedAt: Date.now()
    }
}

function ajaxError(error) {
    return {
        type: 'AJAX_ERROR',
        error
    }
}

export function fetchRecords(module) {
    return function (dispatch) {
        dispatch(ajaxStart())
        return api().get('/'+module)
            .then((json) => {
                    dispatch(receiveRecords(module, json.data))
                    dispatch(ajaxStop())
            }).catch(error => {
                dispatch(ajaxError(error));
            });
    }
}
export function fetchRecord(module, id)
{
    return function (dispatch) {
        dispatch(ajaxStart())
        return api().get('/'+module+'/'+id)
            .then((json) => {
                dispatch(receiveRecord(module, json.data))
                dispatch(ajaxStop())
            }).catch(error => {
                dispatch(ajaxError(error));
            });
    }
}

export function fetchMetadata(module)
{
    return  (dispatch, getState) => {
        if (!getState().metadata.get(module)) {
            return api().get('/metadata/' + module)
                .then((json) => {
                    dispatch(receiveMetadata(module, json.data))
                    dispatch(ajaxStop())
                }).catch(error => {
                    dispatch(ajaxError(error));
                });
        }
    }
}

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
    return {
        type: LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
    }
}

function receiveLogin(user) {
    return {
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        data: user,
    }
}

function loginError(message) {
    return {
        type: LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message
    }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true
    }
}

function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false
    }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(requestLogin(creds));
        return api(false).post('/auth_user', {
            'email':creds.email,
            'password':creds.password})
            .then((json) => {
                const { user, auth_token } = json.data
                if (!auth_token) {
                    // If there was a problem, we want to
                    // dispatch the error condition
                    dispatch(loginError(json.data.errors[0]))
                }
                else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('id_token', auth_token)

                    // Dispatch the success action
                    dispatch(receiveLogin(user))
                }
            }).catch(error => {
                dispatch(ajaxError(error));
            });
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        localStorage.removeItem('id_token')
        dispatch(receiveLogout())
    }
}