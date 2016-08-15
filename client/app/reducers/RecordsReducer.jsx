import Immutable from 'immutable';
export default function recordsReducer(state = Immutable.fromJS({items:[]}), action) {
    switch (action.type) {
        case 'RECEIVE_RECORDS':
            return state.merge({
                items: action.records
            })
        case 'RESET_LIST':
            return state.merge({
                items:[]
            })
        default:
            return state
    }
}