import { getUser } from '@/services/user';
import { routerRedux } from 'dva';
import config from '@/utils/config';
import { createAuthTree } from '@/utils/menu';


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
                const { data } = yield call(getUser, {id:sessionStorage.getItem(`${config.prefix}_userInfo`)});

                const { userInfo } = data.data

                sessionStorage.setItem('userName',userInfo.realName);
                const authorities = userInfo.roleList.join(',');
                userInfo.authorities = authorities;


                const merchantList = yield select(state => state.app.dynamicMerchent);
                let { isLogin, pathname } =  payload
                let { isFind, ...menuTree} = createAuthTree(authorities, payload, merchantList)

                if(!isFind) {
                    yield put(routerRedux.push('/reserve'));
                }else if(isLogin){ 
                    yield put(routerRedux.push(pathname));
                }

                yield put({
                    type: 'setState',
                    payload: {
                        menuTree,
                        user: userInfo
                    },
                })

            } catch (e) {
                yield put(routerRedux.push('/login'));
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
