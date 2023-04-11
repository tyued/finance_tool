import fetch from 'axios';
import nprogress from 'nprogress';
import { sessionID } from '@/utils/session';

const BASE_URL = process.env.API_BASEPATH;

export default function request(url, options) {
    options.headers = {
        'Content-Type': 'application/json',
        session_token: sessionID,
    }
    nprogress.start();
    return fetch(`${BASE_URL}${url}`, options).catch(handleError).then((response) => {
        nprogress.done();
        try{
            return response.data;
        }catch(e){
            return response.data;
        }
    });
}
function handleError(errorObj) {
    nprogress.done();
    const { response } = errorObj;

    if (!response) {
        let error = {};
        error.response = errorObj;
        error.status = 504;
        throw error;
    } else if(response.status === 401) {
        const error = new Error(response.statusText);
        error.response = response;
        error.status = response.status;
        throw error;
    }
    return response;
}
