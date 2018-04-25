import axios from 'axios';

export const FETCH_SCHOOLS = 'fetch_schools';
export const FETCH_SCHOOL = 'fetch_school';

const ROOT_URL = 'http://localhost:3000/api/v1';

export function fetchSchools(classification) {
    const request = axios.get(`${ROOT_URL}/schools/${classification}`);
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
}

export function fetchSchool(schoolid) {
    const request = axios.get(`${ROOT_URL}/school/${schoolid}`);
    return {
        type: FETCH_SCHOOL,
        payload: request
    };
}

export function editSchool(schoolid, values) {
    const request = axios.put(`${ROOT_URL}/school/${schoolid}`, values)
        .then(() => callback());
    return {
        type: EDIT_SCHOOL,
        payload: request
    };
}

