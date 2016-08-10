import api from '../helpers/api';
import { toastr } from 'react-redux-toastr';

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

export function fetchRecords(module) {
    return function (dispatch) {
        dispatch(ajaxStart())
        return api().get('/'+module)
            .then((json) => {
                    dispatch(receiveRecords(module, json.data))
                    dispatch(ajaxStop())
            }).catch(error => {
                populateError(error);
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
                populateError(error);
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
                    populateError(error);
                });
        }
    }
}

function receiveLogin(user) {
    return {
        type: 'LOGIN_SUCCESS',
        data: user,
    }
}

function receiveLogout() {
    return {
        type: 'LOGOUT_SUCCESS',
    }
}

export function loginUser(creds) {
    return dispatch => {
        // We dispatch requestLogin to kickoff the call to the API
        dispatch(ajaxStart());
        return api(false).post('/auth_user', {
            'email':creds.email,
            'password':creds.password})
            .then((json) => {
                dispatch(ajaxStop());
                const { user, auth_token } = json.data
                if (!auth_token) {
                    populateError('Something went wrong.');
                } else {
                    // If login was successful, set the token in local storage
                    localStorage.setItem('id_token', auth_token)
                    // Dispatch the success action
                    dispatch(receiveLogin(user))
                    populateSuccess('Hurraaay! You are logged in.');
                }
            }).catch((error) => {
                const data = JSON.parse(error.response.data);
                populateError(data.errors[0]);
            });
    }
}

// Logs the user out
export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('id_token')
        dispatch(receiveLogout())
        populateSuccess('You have been logged out.')
    }
}

function populateError(error) {
    toastr.error('The title', error);
}
function populateSuccess(message) {
    toastr.success('The title', message);
}