import request from '@/utils/request';

export async function getUserSessions(params) {
  return request('/users/sessions', { 
    method: 'GET',
    data: {},
    params
  });
}

export async function getMerchantDetail(params) {
  return request('/merchant/' + params.id, { 
    method: 'GET',
    data: {}
  });
}