import Immutable from 'immutable';
export default function metadataReducer(state = Immutable.fromJS({}), action) {
    switch (action.type) {
        case 'RECEIVE_METADATA':
            return state.merge({
                [action.module]: action.metadata
            })
        default:
            return state
    }
}