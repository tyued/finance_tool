// import request from '@/utils/request';
import request from '@/utils/requestMock';

export async function query(params) {
  return request('/api/fixedreserve/list', { params });
}
