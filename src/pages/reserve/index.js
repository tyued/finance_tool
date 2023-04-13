
import React, { useCallback, useState } from 'react';
import { connect } from 'dva';
import styles from '@/layouts/index.less';
import { Input, Tabs, notification } from 'antd';
import TableDetail from './components/TableDetail';
import ModifyModal from './components/ModifyModal'

const Search = Input.Search;
const { TabPane } = Tabs;

function Reserve({ app, reserveModel, dispatch }) {
    const { isMobile, user } = app;
    const permission = user.permission?.reserve
    const { dataSource, dataTotal } = reserveModel;
    const [ modeTab, setModeTab ] = useState('1')
    const [ isVisible, setIsVisible] = useState(false);
    const [ modalType, setModalType] = useState('');
    const [ formData, setFormData] = useState({});
    const [query, setQuery] = useState({
        limit: 10,
        type: 'fixed',
        keyword: ''
    })

    const openSearch = (value) => {
        const { keywords } = value
        setQuery({
            ...query,
            keyword: keywords
        })
    }
    const clickEdit = async (action, item) => {
        setIsVisible(true);
        setModalType(action);
        if(action === 'edit') {
            let res = await dispatch({
                type: 'reserveModel/getReserveDetail',
                payload: {
                    id: item.id
                }
            })
            setFormData(res)
            return;
        }
        setFormData({})
    }
    const deleteReserve = (row) => {
        const { id } = row
        const params = {
            id
        }
        dispatch({
            type: 'reserveModel/deleteReserve',
            payload: params,
            callback: (res) => {
                console.log(res, 'deleteReserve-res')
                if(res.data.status === 'success') {
                    notification.success({
                        message: 'success',
                        description: res.data.message + '.',
                        placement: 'bottomRight',
                    })
                    setQuery({...query})
                } else {
                    notification.error({
                        message: 'An error has occured',
                        description: res.data.message + '.',
                        placement: 'bottomRight',
                    })
                }
            }
        })
    }
    const onChangeTabs = (activeKey) => {
        setModeTab(activeKey)
        setQuery({
            ...query,
            type: activeKey === '1' ? 'fixed' : 'rolling'
        })
    }

    const tableProps = {
        isMobile,
        dataSource,
        dataTotal,
        modeTab,
        clickEdit,
        deleteReserve,
        getDataSource: useCallback(async (pageIndex) => {
            await dispatch({
                type: 'reserveModel/query',
                payload:{
                    query: {
                        ...query,
                        page_no: pageIndex || 1,
                    },
                }
            })
        },[dispatch, query])
    }

    const modalProps = {
        isVisible,
        modalType,
        formData,
        closeModal: () => {
            setIsVisible(false);
            setModalType('');
            setFormData({})
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
                    {permission.includes('create') && <><span onClick={()=>clickEdit('add')}>Add Reserve</span></>}
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
