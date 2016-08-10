import app_config from '../config';
import axios from 'axios';


export default function api(authenticated = true) {

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

    return axios.create(config);
}