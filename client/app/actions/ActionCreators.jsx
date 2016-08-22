import api from '../helpers/api';
import { toastr } from 'react-redux-toastr';
import { pendingTask, begin, end } from 'react-redux-spinner';
import _ from 'lodash';
import config from '../config';

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

function receiveRecords(json, offset = 0, allDataLoaded = false) {
    return {
        type: 'RECEIVE_RECORDS',
        records: json,
        offset,
        allDataLoaded
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

export function resetList() {
    return {
        type: 'RESET_LIST',
    }
}

function receiveRecord(json) {
    return {
        type: 'RECEIVE_RECORD',
        record: json,
    }
}

export function populateValidationErrors(validationErrors) {
    return {
        type: 'POPULATE_VALIDATION_ERRORS',
        validationErrors
    }
}

function receiveUser(data) {
    return {
        type: 'RECEIVE_USER',
        data: data
    }
}

function receiveMetadata(json) {
    return {
        type: 'RECEIVE_METADATA',
        metadata: json,
    }
}

export function fetchRecords(module, offset = 0, limit = config.listRecordsLimit) {
    return function (dispatch, getState) {
        return api(dispatch).get('/'+module, {
                params: {
                    offset,
                    limit
                }
            })
            .then((json) => {
                const allDataLoaded = json.data.all <= (getState().records.get('items').size + json.data.records.length);
                dispatch(receiveRecords(json.data.records, offset, allDataLoaded))
            }).catch((error) => {/*custom error handling if needed*/});
    }
}
export function fetchRecord(module, id)
{
    return function (dispatch) {
        return api(dispatch).get('/'+module+'/'+id)
            .then((json) => {
                dispatch(receiveRecord(json.data))
            }).catch((error) => {/*custom error handling if needed*/});
    }
}

export function updateRecord(module, id, data, callback = function(){})
{
    return function (dispatch) {
        return api(dispatch).put('/'+module+'/'+id, data)
            .then((json) => {
                populateSuccess('Record has been updated.');
                dispatch(receiveRecord(json.data))
                callback();
            }).catch((error) => {/*custom error handling if needed*/});
    }
}

export function addRecord(module, data, callback = function(){})
{
    return function (dispatch) {
        return api(dispatch).post('/'+module, data)
            .then((json) => {
                populateSuccess('Record has been created.');
                dispatch(receiveRecord(json.data));
                callback();
            }).catch((error) => {/*custom error handling if needed*/});
    }
}

export function deleteRecord(module, id, callback = function() {})
{
    return function (dispatch) {
        return api(dispatch).delete('/'+module+'/'+id)
            .then((json) => {
                populateSuccess('Record has been deleted.');
                dispatch({
                    type: 'DELETE_RECORD',
                    id
                });
                callback();
            }).catch((error) => {/*custom error handling if needed*/});
    }
}

export function fetchMetadata()
{
    return  (dispatch, getState) => {
        if (!getState().metadata.get('modules_list').size) {
            return api(dispatch).get('/metadata/all')
                .then((json) => {
                    dispatch(receiveMetadata(json.data))
                }).catch((error) => {/*custom error handling if needed*/});
        }
    }
}

export function fetchCurrentUser()
{
    return  (dispatch, getState) => {
        if (_.isEmpty(getState().user.get('data').toJS())) {
            return api(dispatch).get('/me')
                .then((json) => {
                    dispatch(receiveUser(json.data))
                }).catch((error) => {/*custom error handling if needed*/});
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

export function showHideErrorPage(errorPage = 0) {
    return {
        type: 'ERROR_PAGE',
        errorPage
    }
}

export function loginUser(creds) {
    return dispatch => {
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
            }).catch(error => {
                console.log(error);
            });
    }
}

export function logoutUser() {
    return dispatch => {
        localStorage.removeItem('id_token');
        dispatch(receiveLogout())
        populateSuccess('You have been logged out.')
    }
}

export function populateError(error) {
    let msg = error;
    if (_.isObject(error.response)) {
        msg = error.response.data.errors[0];
    }
    toastr.error('Error', msg);
}

function populateSuccess(message) {
    toastr.success('Success', message);
}