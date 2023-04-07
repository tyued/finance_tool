import * as API from '@/services/user';

export default {
    namespace: 'users',
    state: {
        dataSource: [],
        query: {},       
        total: null,
        loading: false,  
        curPage: 1,     
        currentItem: {}, 
        userRoles: [],
    },

    subscriptions: {
        
    },

    effects: {
        *query({ payload }, { call, put, select }) {
            let params = yield select(state => state.users.query);
            params = Object.assign(params, payload);
            const { data } = yield call(API.query, params);
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        dataSource: data.data.list || [],
                        total: data.data.total,
                        query: params
                    },
                });
            }
        }
    },
    reducers: {
        querySuccess(state, { payload }) {
            return {
                ...state,
                ...payload,
                curPage: state.query.curPage,
                loading: false
            };
        },
    },
};
