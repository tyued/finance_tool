// import request from '@/utils/request';
import request from "@/utils/requestMock";

/**
 * Merchant account list
 */
export async function MerchantQuery(params) {
  return request('/api/merchant/list', { params });
}




