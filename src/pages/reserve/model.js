import * as API from '@/services/reserve';
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
            
            const { data } = yield call(API.query, payload.query);
            if (!success(data)) return;

            yield put({
                type: 'setState',
                payload: {
                    dataSource: data.data.list,
                    dataTotal: data.count,
                }
            })
            return data.data.data;
        },
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