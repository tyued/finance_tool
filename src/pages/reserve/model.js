import * as API from '@/services/api';
import { success } from '@/utils/tools';

export default {
    namespace: 'reserveModel',
    state: {
        dataSource: [],
        dataTotal: 0,


    },
    subscriptions: {

    },
    effects: {
        *query({ payload }, { call, put, select }) {
            
        },
        *getMerchantDetail({ payload }, { call, put, select }) {
            const data = yield call(API.getMerchantDetail, payload);
            if (!success(data)) return;
            return data
        }
    },
    reducers: {
        setState( state, { payload } ) {
            return {
                ...state,
                ...payload,
            }
        },
    }
}