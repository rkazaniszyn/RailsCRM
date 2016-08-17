import app_config from '../config';
import axios from 'axios';
import { ajaxStart, ajaxStop, showHideErrorPage, populateError } from '../actions/ActionCreators';


export default function api(dispatch = false, showErrorPageOnError = true, populateErrorMessage = true) {

    let token = localStorage.getItem('id_token') || null
    let config = {
        baseURL: app_config.apiUrl,
        //timeout: 5000,
    };
    if(token) {
        config.headers = { 'Authorization': `Bearer ${token}` };
    }
    var instance = axios.create(config);
    if (dispatch) {
        instance.interceptors.request.use(function (config) {
            dispatch(ajaxStart());
            return config;
        }, function (error) {
            dispatch(ajaxStop());
            if (showErrorPageOnError) {
                dispatch(showHideErrorPage(1));
            }
            if (populateErrorMessage) {
                populateError(error)
            }
            return Promise.reject(error);
        });

        instance.interceptors.response.use(function (response) {
            dispatch(ajaxStop());
            return response;
        }, function (error) {
            dispatch(ajaxStop());
            if (showErrorPageOnError) {
                dispatch(showHideErrorPage(1));
            }
            if (populateErrorMessage) {
                populateError(error)
            }
            return Promise.reject(error);
        });
    }

    return instance;
}