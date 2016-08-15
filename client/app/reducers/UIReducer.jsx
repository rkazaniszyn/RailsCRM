import Immutable from 'immutable';
export default function uiReducer(state = Immutable.fromJS({ ajax: {isFetching: false}, errorPage:false}), action) {
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
        case 'ERROR_PAGE':
            return state.merge({
                errorPage: action.errorPage
            });
        default:
            return state
    }
}