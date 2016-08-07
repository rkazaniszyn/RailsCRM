import Immutable from 'immutable';
export default function recordReducer(state = Immutable.fromJS({item:{}}), action) {
    switch (action.type) {
        case 'RECEIVE_RECORD':
            return state.merge({
                item: action.record
            })
        default:
            return state
    }
}