import Immutable from 'immutable';
export default function uiReducer(state = Immutable.fromJS({ ajax: {isFetching: false}}), action) {
    switch (action.type) {
        case 'AJAX_START':
            return state.mergeDeep({
                ajax: {
                    isFetching: true,
                }
            });
        case 'AJAX_STOP':
            return state.mergeDeep({
                ajax: {
                    isFetching: false,
                }
            });
        default:
            return state
    }
}