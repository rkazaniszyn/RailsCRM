import Immutable from 'immutable';
export default function uiReducer(state = Immutable.fromJS({ ajax: {isFetching: false, error: false}}), action) {
    switch (action.type) {
        case 'AJAX_START':
            return state.mergeDeep({
                ajax: {
                    isFetching: true,
                    error: false,
                }
            });
        case 'AJAX_STOP':
            return state.mergeDeep({
                ajax: {
                    isFetching: false,
                    error: false,
                }
            });
        case 'AJAX_ERROR':
            return state.mergeDeep({
                ajax: {
                    isFetching: false,
                    error: true,
                }
            });
        default:
            return state
    }
}