import Immutable from 'immutable';

export default function recordReducer(state = Immutable.fromJS({item:{}, validationErrors:[]}), action) {
    switch (action.type) {
        case 'RECEIVE_RECORD':
            return state.merge({
                item: action.record
            });
        case 'RESET_RECORD':
            return state.merge({
                item: {},
                validationErrors: [],
            });
        case 'UPDATE_FIELD':
            return state.mergeDeep({
                item: {[action.name] : action.value}
            });
        case 'POPULATE_VALIDATION_ERRORS':
            return state.merge({
                validationErrors: action.validationErrors
            });
        default:
            return state
    }
}