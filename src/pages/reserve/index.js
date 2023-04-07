
import React, { useCallback, useState } from 'react';
import { connect } from 'dva';
import styles from '@/layouts/index.less';
import { Input, Tabs } from 'antd';
import TableDetail from './components/TableDetail';
import ModifyModal from './components/ModifyModal'

const Search = Input.Search;
const { TabPane } = Tabs;

function Reserve({ app, reserveModel, dispatch }) {
    const { isMobile } = app;
    const { dataSource, dataTotal } = reserveModel;
    const [ modeTab, setModeTab ] = useState('1')
    const [ isVisible, setIsVisible] = useState(false);
    const [ modalType, setModalType] = useState('');


    const openSearch = () => {
    }
    const clickEdit = (action) => {
        setIsVisible(true);
        setModalType(action);
    }
    const onChangeTabs = (activeKey) => {
        setModeTab(activeKey)
    }

    const tableProps = {
        isMobile,
        dataSource,
        dataTotal,
        modeTab,
        clickEdit,
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

    const modalProps = {
        isVisible,
        modalType,
        closeModal: () => {
            setIsVisible(false);
            setModalType('');
        }
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
                    {!isMobile && <><span onClick={()=>clickEdit('add')}>Add Reserve</span></>}
                </div>
            </div>
            <Tabs defaultActiveKey='1' onChange={onChangeTabs}>
                <TabPane tab="Fixed Reserve" key='1'>
                    {modeTab === '1' && <TableDetail {...tableProps} />}
                </TabPane>
                <TabPane tab="Rolling Reserve" key='2'>
                    {modeTab === '2' && <TableDetail {...tableProps} />}
                </TabPane>
            </Tabs>

            {isVisible && <ModifyModal {...modalProps} />}

        </div>
    )
};

function mapStateToProps( data ) {
    const { reserveModel, app } = data;
    return { reserveModel, app };
}

export default connect(mapStateToProps)(Reserve);
