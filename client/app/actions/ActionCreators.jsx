import axios from 'axios';
import config from '../config';
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
        return axios.get(config.apiUrl+'/'+module)
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
        return axios.get(config.apiUrl+'/'+module+'/'+id)
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
            return axios.get(config.apiUrl + '/metadata/' + module)
                .then((json) => {
                    dispatch(receiveMetadata(module, json.data))
                    dispatch(ajaxStop())
                }).catch(error => {
                    dispatch(ajaxError(error));
                });
        }
    }
}