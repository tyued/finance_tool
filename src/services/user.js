// import request from '@/utils/request';
import request from '@/utils/requestMock';
/**
 * Merchant account list
 */
export async function query(params) {
  return request('/api/users/list', { params });
}


export async function getUser(params) {
  return request('/api/userinfo', { params });
}


export async function logout() {
  return request('/api/user/logout', {
    method: 'POST',
  });
}
