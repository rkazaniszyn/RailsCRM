import api from '../helpers/api';
import { toastr } from 'react-redux-toastr';
import { pendingTask, begin, end } from 'react-redux-spinner';

export function updateName(name) {
    return {
        type: 'HELLO_WORLD_NAME_UPDATE',
        name,
    };
}

export function ajaxStart() {
    return {
        type: 'AJAX_START',
        [ pendingTask ]: begin
    }
}
export function ajaxStop() {
    return {
        type: 'AJAX_STOP',
        [ pendingTask ]: end
    }
}

function receiveRecords(json) {
    return {
        type: 'RECEIVE_RECORDS',
        records: json,
    }
}

export function updateRecordField(name, value)
{
    return {
        type: 'UPDATE_FIELD',
        name,
        value
    }
}

export function resetRecord() {
    return {
        type: 'RESET_RECORD',
    }
}

function receiveRecord(json) {
    return {
        type: 'RECEIVE_RECORD',
        record: json,
    }
}

function receiveMetadata(module, json) {
    return {
        type: 'RECEIVE_METADATA',
        module,
        metadata: json,
    }
}

export function fetchRecords(module) {
    return function (dispatch) {
        return api(dispatch).get('/'+module)
            .then((json) => {
                dispatch(receiveRecords(json.data))
            }).catch(error => {
                populateError(error);
            });
    }
}
export function fetchRecord(module, id)
{
    return function (dispatch) {
        return api(dispatch).get('/'+module+'/'+id)
            .then((json) => {
                dispatch(receiveRecord(json.data))
            }).catch(error => {
                populateError(error);
            });
    }
}

export function updateRecord(module, id, data)
{
    return function (dispatch) {
        return api(dispatch).put('/'+module+'/'+id, data)
            .then((json) => {
                populateSuccess('Record has been updated.');
                dispatch(receiveRecord(json.data))
            }).catch(error => {
                populateError(error);
            });
    }
}

export function fetchMetadata(module)
{
    return  (dispatch, getState) => {
        if (!getState().metadata.get(module)) {
            return api(dispatch).get('/metadata/' + module)
                .then((json) => {
                    dispatch(receiveMetadata(module, json.data))
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
        return api(dispatch, false).post('/auth_user', {
            'email':creds.email,
            'password':creds.password})
            .then((json) => {
                const { user, auth_token } = json.data;
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
                populateError(error.response.data.errors[0]);
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