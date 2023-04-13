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
            const data = yield call(API.getReservesList, payload.query);
            if (!success(data)) return;
            yield put({
                type: 'setState',
                payload: {
                    dataSource: data.data.list,
                    dataTotal: data.data.count,
                }
            })
            return true
        },
        *getReserveDetail({ payload }, { call, put, select }) {
            const data = yield call(API.getReserveDetail, payload);
            if (!success(data)) return;
            return data.data
        },
        *getMerchantDetail({ payload }, { call, put, select }) {
            const data = yield call(API.getMerchantDetail, payload);
            if (!success(data)) return;
            return data.data
        },
        *createReserve({ payload }, { call, put, select }) {
            const data = yield call(API.postCreateReserve, payload);
            if (!success(data)) return;
            return data.data
        },
        *deleteReserve({ payload, callback }, { call, put, select }) {
            const data = yield call(API.deleteReserve, payload);
            if (!success(data)) return;
            callback(data)
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