import axios from 'axios';

export const FETCH_SCHOOLS = 'fetch_schools';
export const FETCH_SCHOOL = 'fetch_school';
export const FETCH_USERS = 'fetch_users';
export const FETCH_ATHLETES = 'fetch_athletes';
export const EDIT_SCHOOL = 'edit_school';

const ROOT_URL = 'http://localhost:3000/api/v1';

export function fetchSchools(classification) {
    const request = axios.get(`${ROOT_URL}/schools/${classification}`);
    return {
        type: FETCH_SCHOOLS,
        payload: request
    };
}

export function fetchUsers(type = 'active') {
    const request = axios.get(`${ROOT_URL}/users/${type}`);
    return {
        type: FETCH_USERS,
        payload: request
    };
}

export function fetchAthletes(schoolid, year = 'current') {
    const request = axios.get(`${ROOT_URL}/athletes/${schoolid}/${year}`);
    return {
        type: FETCH_ATHLETES,
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

export function editSchool(schoolid, values, callback) {
    const request = axios.put(`${ROOT_URL}/school/${schoolid}`, values)
        .then(() => callback());
    return {
        type: EDIT_SCHOOL,
        payload: request
    };
}

