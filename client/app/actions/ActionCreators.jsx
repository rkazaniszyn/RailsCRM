import axios from 'axios';
import config from '../config';
export function updateName(name) {
    return {
        type: 'HELLO_WORLD_NAME_UPDATE',
        name,
    };
}

function requestRecords(module) {
    return {
        type: 'REQUEST_RECORDS',
        module
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

function receiveRecordsError(error) {
    return {
        type: 'RECEIVE_RECORDS_ERROR',
        error
    }
}

// Meet our first thunk action creator!
// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

export function fetchRecords(module) {
    // Thunk middleware knows how to handle functions.
    // It passes the dispatch method as an argument to the function,
    // thus making it able to dispatch actions itself.

    return function (dispatch) {

        // First dispatch: the app state is updated to inform
        // that the API call is starting.

        dispatch(requestRecords(module))

        // The function called by the thunk middleware can return a value,
        // that is passed on as the return value of the dispatch method.

        // In this case, we return a promise to wait for.
        // This is not required by thunk middleware, but it is convenient for us.

        return axios.get(config.apiUrl+'/contacts')
            // .then(response => response.json())
            .then(json =>

                // We can dispatch many times!
                // Here, we update the app state with the results of the API call.

                dispatch(receiveRecords(module, json.data))
            ).catch(error => {
                dispatch(receiveRecordsError(error));
            });

        // In a real world app, you also want to
        // catch any error in the network call.
    }
}