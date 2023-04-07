import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Tooltip, Icon } from 'antd';
import styles from '@/layouts/index.less';

function TableDetail(props){
    const { isMobile, dataSource, dataTotal, getDataSource } = props;
    
    const [sortedInfo, setSortedInfo] = useState({});
    const [ pageIndex, setPageIndex] = useState(1);

    let columns = [{
        title: 'CREATION DATE',
        dataIndex: 'time_completed',
        width: '170px',
        sorter: true,
        sortOrder: sortedInfo.columnKey==='time_completed' && sortedInfo.order,
    },{
        title: 'MERCHANT ID',
        dataIndex: 'transaction_id',
        key: 'transaction_id',
        width: '150px'
    },{
        title: 'MERCHANT NAME',
        dataIndex: 'merchant_legal_name',
        width: '300px',
    },{
        title: 'TOTAL AMOUNT',
        dataIndex: 'amount_init',
        key: 'amount_init',
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
            <span className={styles[status]}>status</span>
        ),
        sorter: true,
        sortOrder: sortedInfo.columnKey==='status' && sortedInfo.order,
    },{
        title: 'Operation',
        fixed: isMobile? false : "right",
        align: 'center',
        key: 'operation',
        width: 170,
        onlyTable: true,
        render: (item, row, index) => (
            <>
                <Button type='primary' loading={row.status==='submitted' && global.loading} size='small'>Modify</Button>
                <Button  style={{marginLeft: 10, background: '#ff4d4f', borderColor: '#ff4d4f'}} type='primary' loading={row.status==='submitted' && global.loading} size='small'>Delete</Button>
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
        // onChange: isPrint ? ()=>{} : onChangeCol,
    }

    useEffect(() => {
        getDataSource()

    }, [getDataSource])
    return (
        <>
            <Table {...tableProp} />
        </>
    )
}

export default TableDetail

