import fetch from 'axios';
import config from '@/utils/config';

export default function request(url, options) {
    showLoading();
    const AUTH_TOKEN = `Bearer ${sessionStorage.getItem(config.token)}`;
    fetch.defaults.headers.common.Authorization = AUTH_TOKEN;
    return fetch(url, options)
        .catch(handleError)
        .then((response) => {
            hideLoading();
            return { data: response.data };
        });
}

function handleError(errorObj) {
    const { response } = errorObj;
    if (!response) {
      const error = new Error('network error');
      error.response = errorObj;
      error.status = 504;
      throw error;
    }
    return response;
}
function showLoading() {
    global.loading = true;
}
  
function hideLoading() {
    global.loading = false;
}