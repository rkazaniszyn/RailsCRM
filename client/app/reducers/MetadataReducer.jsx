import Immutable from 'immutable';
export default function metadataReducer(state = Immutable.fromJS({modules:{}, modules_list:[]}), action) {
    switch (action.type) {
        case 'RECEIVE_METADATA':
            return state.mergeDeep(action.metadata);
        default:
            return state
    }
}