import authority from './authority';
import { reject } from 'lodash';
import { RESTRICTE } from '../common/constants';

export function array2Tree(arr, dynamicMerchent=[]) {
    const localArr = arr.map(arrItem => (Object.assign({}, arrItem)));
    const hash = {};
    const result = [];
    localArr.forEach((item) => {
        hash[item.id] = item;
    });
    localArr.forEach((item) => {
        const parent = hash[item.pid];
        if (parent) {
            if (!parent.children) {
                parent.children = [];
            }
            parent.children.push(item);
        } else {
            result.push(item);
        }
    });
    return result;
}

export function createAuthTree(authorities, payload, dynamicMerchant=[]) {
    // Filter user's existing permissions
    let authArr = [], authList = [], tree = '';
    // Permissions are cached in authorities
    if (authorities === '*') {  
        authList = reject(authority, (item) => {
            return RESTRICTE.includes(item.id) || RESTRICTE.includes(item.pid)
        })

    } else {
        if (authorities) {
            authArr = authorities.split(',');   //分隔已有权限
        }
        authList = authority.filter((item) => {
            if (authArr.includes(item.id)) {
                return item;
            }
            return '';
        });
    }
    tree = array2Tree(authList, dynamicMerchant);
    const { pathname } = payload


    let defaultSelectedKeys = [],   
        defaultOpenKeys = [],        
        isFind = false;
    const dfs = (node, keys) => {
        if (!node) return;
        
        if(node.id){
            keys.push(node.id);
            if (node.routers === pathname && (!node.children || !node.children.length)) {
                isFind = true;
                defaultSelectedKeys.push(node.id);
                defaultOpenKeys = keys;
                return;
            }
        }
        node.children && node.children.forEach(value => {
            if (isFind)
                return;
            dfs(value, [...keys]);
        });
    };
    dfs({ children: tree}, []);

    return {
        tree,
        defaultSelectedKeys,
        defaultOpenKeys,
        isFind
    };
}
