/**
 * Account Manager
 */
import React from 'react';
import { connect } from 'dva';
import UserList from './components/UserList';
import UserSearch from './components/UserSearch';
import styles from '../../../layouts/index.less';

const Users = ({ users, dispatch }) => {
    const {
        dataSource, total, curPage,
        userRoles, query
    } = users;

    const userSearchProps = {
        userRoles,
        onSearch(params) {
            dispatch({
                type: 'users/query',
                payload: {
                    ...query,
                    ...params
                },
            });
        }
    };
    const userListProps = {
        dataSource,
        total,
        curPage,
        userRoles,
        getUserList: () => {
            dispatch({
                type: 'users/query',
            })
        },
        onQueryChange: (pageNum) => {
            dispatch({
                type: 'users/query',
                payload: {
                    ...query,
                    curPage: pageNum,
                },
            });
        },
    };
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageTitle}>
                Merchant Manage
            </div>
            <UserSearch {...userSearchProps} />
            <UserList {...userListProps} />
        </div>
    );
};
function mapStateToProps(data) {
    const { users } = data;
    return { users };
}
export default connect(mapStateToProps)(Users);