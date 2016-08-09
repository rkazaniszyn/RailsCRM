const BASE_URL = 'http://localhost:5000/api/v1/'
import axios from 'axios';
function callApi(method, endpoint, authenticated) {

    let token = localStorage.getItem('id_token') || null
    let config = {
        baseURL: BASE_URL,
        timeout: 1000,
    }

    if(authenticated) {
        if(token) {
            config.headers = { 'Authorization': `Bearer ${token}` };
        } else {
            throw "No token saved!"
        }
    }

    var axios = axios.create(config);

    return axios.request({
        method: method,
        url: endpoint
    })
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

    const callAPI = action[CALL_API]
    // So the middleware doesn't get applied to every single action
    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, types, authenticated } = callAPI

    const [ requestType, successType, errorType ] = types

    // Passing the authenticated boolean back in our data will let us distinguish between normal and secret quotes
    return callApi(requestType, endpoint, authenticated).then(
        response =>
    next({
        response,
        authenticated,
        type: successType
    }),
        error => next({
        error: error.message || 'There was an error.',
        type: errorType
    })
    )
}