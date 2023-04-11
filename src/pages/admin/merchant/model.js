// import * as API from '@/services/admin';
import { success } from '../../../utils/tools';

export default {
    namespace: 'merchant',
    state: {
        dataSource: [],   // merchant list data
        query: {},        // query condition
        total: null,      // data count 
        loading: false,   // loading status
        curPage: 1,       // current page
        currentItem: {},  // current edit Merchant Item
    },

    subscriptions: {
    },

    effects: {
        *query({ payload }, { call, put, select }) {
            // merge search condition
            let params = yield select(state => state.merchant.query);
            params = Object.assign(params, payload);
            // const { data } = yield call(API.MerchantQuery, params);
            const {data} = {}
            
            // if (!success(data)) return;
            yield put({
                type: 'setState',
                payload: {
                    dataSource: data.data.list,
                    total: data.data.list.length,
                    query: params
                },
            });
        }
    },
    reducers: {
        setState(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
       
    },
};
