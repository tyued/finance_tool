/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Table, Button, Tooltip, Icon, Popconfirm } from 'antd';
import styles from '@/layouts/index.less';
import moment from 'moment';

function TableDetail(props){
    const { isMobile, dataSource, dataTotal, deleteReserve, getDataSource, modeTab, clickEdit } = props;
    
    const [ pageIndex, setPageIndex] = useState(1);
    const [ columns, setColumns] = useState([]);

    const columnFixed = [{
        title: 'CREATION DATE',
        dataIndex: 'time_created',
        width: '170px',
        render: (time_created) => (
            <span>{moment(time_created).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
    },{
        title: 'MERCHANT ID',
        dataIndex: 'merchant_id',
        key: 'merchant_id',
        width: '150px'
    },{
        title: 'MERCHANT NAME',
        dataIndex: 'merchant_name',
        width: '300px',
    },{
        title: 'TOTAL AMOUNT',
        dataIndex: 'total_amount',
        key: 'total_amount',
        width: '170px',
    },
    {
        title: () => {
            return <span>STATUS&nbsp;
                <Tooltip placement="topLeft" title={<span>
                        <b>Init:</b>  Payout has been accepted<br/>
                        <b>Pending:</b> Payout is being batch processed<br/>
                        <b>Submitted:</b> Payout is being submitted to the backend gateway<br/>
                        <b>Success:</b> Payout was processed successfully<br/>
                        <b>Fail:</b> Payout failed to be processed
                    </span>}>
                    <Icon type="question-circle" theme="filled" />
                </Tooltip>
            </span>
        },
        dataIndex: 'status', // err init pro  fail succ
        width: '130px',
        align: 'center',
        render: (status) => (
            <span className={styles[status]}>{status}</span>
        ),
    },{
        title: 'Operation',
        fixed: isMobile? false : "right",
        align: 'center',
        key: 'operation',
        width: 170,
        onlyTable: true,
        render: (item, row, index) => (
            <>
                <Button type='primary' loading={row.status==='submitted' && global.loading} size='small' onClick={()=>clickEdit('edit',row)}>Modify</Button>

                <Popconfirm
                    placement='top'
                    title='confirm to delete?'
                    onConfirm={()=>deleteReserve(row)}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button  style={{marginLeft: 10, background: '#ff4d4f', borderColor: '#ff4d4f'}} type='primary' loading={row.status==='submitted' && global.loading} size='small'>Delete</Button>
                </Popconfirm>
            </>
        )
    }] 

    const columnsRolling = [{
        title: 'CREATION DATE',
        dataIndex: 'time_created',
        width: '170px',
        render: (time_created) => (
            <span>{moment(time_created).format('YYYY-MM-DD HH:mm:ss')}</span>
        )
    },{
        title: 'MERCHANT ID',
        dataIndex: 'merchant_id',
        key: 'merchant_id',
        width: '150px'
    },{
        title: 'MERCHANT NAME',
        dataIndex: 'merchant_name',
        width: '200px',
    },{
        title: 'TOTAL AMOUNT',
        dataIndex: 'total_amount',
        key: 'total_amount',
        width: '150px',
    },{
        title: '# of Rolling Days',
        dataIndex: 'rolling_days',
        key: 'rolling_days',
        width: '150px',
    },{
        title: '% of Daily Settlements',
        dataIndex: 'daily_settlements',
        key: 'daily_settlements',
        width: '190px',
    },
    {
        title: () => {
            return <span>STATUS&nbsp;
                <Tooltip placement="topLeft" title={<span>
                        <b>Init:</b>  Payout has been accepted<br/>
                        <b>Pending:</b> Payout is being batch processed<br/>
                        <b>Submitted:</b> Payout is being submitted to the backend gateway<br/>
                        <b>Success:</b> Payout was processed successfully<br/>
                        <b>Fail:</b> Payout failed to be processed
                    </span>}>
                    <Icon type="question-circle" theme="filled" />
                </Tooltip>
            </span>
        },
        dataIndex: 'status', // err init pro  fail succ
        width: '130px',
        align: 'center',
        render: (status) => (
            <span className={styles[status]}>{status}</span>
        ),
    },{
        title: 'Operation',
        fixed: isMobile? false : "right",
        align: 'center',
        key: 'operation',
        width: 170,
        onlyTable: true,
        render: (item, row, index) => (
            <>
                <Button type='primary' loading={row.status==='submitted' && global.loading} size='small' onClick={()=>clickEdit('edit',row)}>Modify</Button>

                <Popconfirm
                    placement='top'
                    title='confirm to delete?'
                    onConfirm={()=>deleteReserve(row)}
                    okText='Yes'
                    cancelText='No'
                >
                    <Button  style={{marginLeft: 10, background: '#ff4d4f', borderColor: '#ff4d4f'}} type='primary' loading={row.status==='submitted' && global.loading} size='small'>Delete</Button>
                </Popconfirm>
            </>
        )
    }] 

    const tableProp = {
        columns: columns,
        dataSource: dataSource,
        loading: global.loading,
        rowKey: (record, index) => index,
        scroll: {
            x: 1000, 
            y: 'calc(100vh - 350px)',
        },
        pagination: {
            current: pageIndex,
            total: dataTotal,
            onChange:(current) => {
                setPageIndex(current)
                getDataSource(current)
            }
        },
    }

    useEffect(() => {
        setColumns(modeTab === '1'?columnFixed:columnsRolling)
        
        getDataSource()

    }, [getDataSource, modeTab])

    
    return (
        <>
            <Table {...tableProp} />
        </>
    )
}

export default TableDetail

