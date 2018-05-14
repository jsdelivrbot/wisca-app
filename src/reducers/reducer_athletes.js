import _ from 'lodash';
import { FETCH_ATHLETES } from '../actions';

export default function(state = {}, action) {

    switch (action.type) {
        case FETCH_ATHLETES:
            return _.mapKeys(action.payload.data, 'athleteid');
        default: 
            return state;
    }
}