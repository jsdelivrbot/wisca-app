import _ from 'lodash';
import { FETCH_SCHOOLS, FETCH_SCHOOL, EDIT_SCHOOL } from '../actions';

export default function(state = {}, action) {

    switch (action.type) {
        case FETCH_SCHOOLS:
            return _.mapKeys(action.payload.data, 'schoolid');
        case FETCH_SCHOOL:
            return { ...state, [action.payload.data[0].schoolid]: action.payload.data[0]};
        case EDIT_SCHOOL:
        default: 
            return state;
    }
}