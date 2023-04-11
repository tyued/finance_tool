/* eslint-disable */
const SESSION_ID = 'CITCON_INTERNAL_SESSION_ID';

export var sessionID = '';
const cookieOptions = process.env.REACT_APP_DOMAIN
    ? ';domain=' + process.env.REACT_APP_DOMAIN
    : '';

export function getSessionID() {
  var cookies = document.cookie.split('; ');
    var i = cookies.length;
    while (i--) {
        let parts = cookies[i].split('=');
        if (parts[0] === SESSION_ID) {
            sessionID = parts[1];
            return sessionID;
        }
    }
    return '';
}

export function setSessionID(sid) {
    sessionID = sid;
    document.cookie = SESSION_ID + '=' + sid + cookieOptions;
}

