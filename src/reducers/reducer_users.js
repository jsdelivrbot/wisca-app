import _ from 'lodash';
import { FETCH_USERS } from '../actions';

export default function(state = {}, action) {

    switch (action.type) {
        case FETCH_USERS:
            return _.mapKeys(action.payload.data, 'userid');
        default: 
            return state;
    }
}