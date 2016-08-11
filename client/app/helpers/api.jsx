import app_config from '../config';
import axios from 'axios';
import { ajaxStart, ajaxStop } from '../actions/ActionCreators';

export default function api(dispatch = false, authenticated = true) {

    let token = localStorage.getItem('id_token') || null
    let config = {
        baseURL: app_config.apiUrl,
        timeout: 1000,
    }
    if(authenticated) {
        if(token) {
            config.headers = { 'Authorization': `Bearer ${token}` };
        } else {
            throw "No token saved!"
        }
    }
    var instance = axios.create(config);
    if (dispatch) {
        instance.interceptors.request.use(function (config) {
            dispatch(ajaxStart());
            return config;
        }, function (error) {
            dispatch(ajaxStop());
            return Promise.reject(error);
        });

        instance.interceptors.response.use(function (response) {
            dispatch(ajaxStop());
            return response;
        }, function (error) {
            dispatch(ajaxStop());
            return Promise.reject(error);
        });
    }

    return instance;
}