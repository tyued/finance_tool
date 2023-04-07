/**
 * Merchant Manager
 */
import React, { useEffect } from 'react';
import { connect } from 'dva';
import List from './components/List';
import Search from './components/Search';
import styles from '../../../layouts/index.less';

const Merchants = ({ merchant, dispatch }) => {

    const {
        dataSource, total, curPage,
        query
    } = merchant;

    useEffect(() => {
        dispatch({
            type: 'merchant/query',
        })
    }, [dispatch])

    const SearchProps = {
        // search merchant list 
        onSearch(params) {
            dispatch({
                type: 'merchant/query',
                payload: {
                    ...query,
                    ...params
                },
            });
        },
    };

    const ListProps = {
        dataSource,
        total,
        curPage,
        // change query get merchant list
        onQueryChange: (pageNum) => {
            dispatch({
                type: 'merchant/query',
                payload: {
                    ...query,
                    curPage: pageNum,
                },
            });
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageTitle}>Merchant Manage</div>
            <Search {...SearchProps} />
            <List {...ListProps} />
        </div>
    );
};

function mapStateToProps(data) {
    const { merchant } = data;
    return { merchant };
}

export default connect(mapStateToProps)(Merchants);