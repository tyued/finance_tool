
import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'dva';
import styles from '@/layouts/index.less';
import { Input, Tabs } from 'antd';
import TableDetail from './components/TableDetail';

const Search = Input.Search;
const { TabPane } = Tabs;

function Reserve({ app, reserveModel, dispatch }) {
    const { isMobile } = app;
    const { dataSource, dataTotal } = reserveModel;
    const [ modeTab, setModeTab ] = useState('1')


    const openSearch = () => {
    }
    const clickEdit = () => {

    }
    const onChangeTabs = (activeKey) => {
        setModeTab(activeKey)
    }

    const tableProps = {
        isMobile,
        dataSource,
        dataTotal,
        getDataSource: useCallback(async (pageIndex) => {
            let initQuery = {
                page_index: pageIndex || 1,
                page_size: 10,
            }
            await dispatch({
                type: 'reserveModel/query',
                payload:{
                    query: initQuery,
                }
            })
        },[dispatch])
    }


    return (
        <div className={styles.pageContainer}>
            <div className={[styles.pageTitle, styles.clear].join(' ')}>
                Merchant Reserve
                <div className={styles.pageOpt}>
                    <Search placeholder="Enter search"
                        style={{ width: 400}}
                        onSearch={value => openSearch({ keywords: value })}
                    />
                    {!isMobile && <><span onClick={clickEdit}>Add Reserve</span></>}
                </div>
            </div>
            <Tabs defaultActiveKey='1' onChange={onChangeTabs}>
                <TabPane tab="Fixed Reserve" key='1'>
                    <TableDetail {...tableProps} />
                </TabPane>
                <TabPane tab="Rolling Reserve" key='2'>
                    {/* <TableDetail /> */}
                </TabPane>
            </Tabs>
        </div>
    )
};

function mapStateToProps( data ) {
    const { reserveModel, app } = data;
    return { reserveModel, app };
}

export default connect(mapStateToProps)(Reserve);
