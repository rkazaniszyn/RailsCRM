import Immutable from 'immutable';
export default function recordsReducer(state = Immutable.fromJS({items:[], offset: 0, allDataLoaded: false}), action) {
    switch (action.type) {
        case 'RECEIVE_RECORDS':
            return state.merge({
                items: state.get('items').concat(action.records),
                offset: action.offset,
                allDataLoaded: action.allDataLoaded
            });
        case 'DELETE_RECORD':
            return state.merge({
                items: state.get('items').filter(function(el) {
                    return el.id !== action.id;
                })
            });
        case 'RESET_LIST':
            return state.merge({
                items:[],
                offset: 0,
                allDataLoaded: false
            });
        default:
            return state
    }
}