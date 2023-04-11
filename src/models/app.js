import * as API from '@/services/api';
import { routerRedux } from 'dva';
import config from '@/utils/config';
import { createAuthTree } from '@/utils/menu';

import { getSessionID, setSessionID } from '@/utils/session';
import { redirectToLogin } from '@/utils/tools'


export default {
    namespace: 'app',
    state: {
        siderFold: localStorage.getItem(`${config.prefix}siderFold`) === 'true',
        skin: localStorage.getItem('skinName') || 'skin_2',
        isMobile: false,
        user: {},
        dynamicMerchent: [],
        menuTree: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            const { location } = history;
            dispatch({
                type: 'query',
                payload: {
                    ...location
                }
            });
        }
    },
    effects: {
        *query({ payload }, { call, put, select }) {
            try {
                const loadSessionID = getSessionID();
                if(!loadSessionID){
                    redirectToLogin();
                    return;
                }
                setSessionID(loadSessionID);
                const { data } = yield call(API.getUserSessions, {});

                
                const { role, permission } = data.config;
                let { pathname } =  payload

                let { isFind, ...menuTree} = createAuthTree(role, payload)

                if(!isFind && pathname !== '/') {
                    redirectToLogin();
                }else { 
                    yield put(routerRedux.push(pathname));
                }

                yield put({
                    type: 'setState',
                    payload: {
                        menuTree,
                        user: {
                            user_id: data.user_id,
                            email: data.email,
                            permission 
                        }
                    },
                })

            } catch (e) {
                redirectToLogin();
            }
        },

        *logout({ payload }, { call, put }) {
            sessionStorage.clear()
            yield put(routerRedux.push('/login'));
        },
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
