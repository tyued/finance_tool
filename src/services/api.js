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

export async function getReservesList(params) {
  return request('/reserves', { 
    method: 'GET',
    params,
    data: {}
  });
}

export async function getReserveDetail(params) {
  return request('/reserve/' + params.id, { 
    method: 'GET',
    data: {}
  });
}

export async function postCreateReserve(data) {
  return request('/reserves', { 
    method: 'POST',
    data
  });
}

export async function deleteReserve(params) {
  return request('/reserves/' + params.id, { 
    method: 'DELETE',
    data: {}
  });
}