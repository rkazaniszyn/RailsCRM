import Immutable from 'immutable';
export default function recordReducer(state = Immutable.fromJS({item:{}}), action) {
    switch (action.type) {
        case 'RECEIVE_RECORD':
            return state.merge({
                item: action.record
            });
        case 'RESET_RECORD':
            return state.merge({
                item: {}
            });
        case 'UPDATE_FIELD':
            return state.mergeDeep({
                item: {[action.name] : action.value}
            });
        default:
            return state
    }
}