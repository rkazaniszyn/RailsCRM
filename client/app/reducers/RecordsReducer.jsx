import Immutable from 'immutable';
export default function recordsReducer(state = Immutable.fromJS({isFetching:false, items:[]}), action) {
    switch (action.type) {
        case 'REQUEST_RECORDS':
            return state.merge({
                isFetching: true
            })
        case 'RECEIVE_RECORDS':
            const newState = state.merge({
                isFetching: false,
                items: action.records
            })
            return newState;

            return state;
        default:
            return state
    }
}