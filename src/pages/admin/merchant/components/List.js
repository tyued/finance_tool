/* eslint-disable */
import React from 'react';
import { Table, Tag } from 'antd';
import { setPage } from '@/utils/tools'

const MerchantList = ({
	total,
	curPage,
	dataSource,
	onQueryChange,
}) => {
	const columns = [{
		title: 'merchant_ID',
		dataIndex: 'merchant_id',
		key: 'id',
	}, {
		title: 'merchant_name',
		dataIndex: 'merchant_name',
	}, {
		title: 'email',
		dataIndex: 'merchant_email',
	}, {
		title: 'phone',
		dataIndex: 'merchant_phone',
		key: 'cellphone',
	}, {
		title: 'status',
		dataIndex: 'status',
		key: 'status',
		render: status => (
			<Tag color={status==='A' ? 'green' : 'red'}>{status==='A' ? 'normal' : 'disable'}</Tag>
		),
	}];
	const pagination = setPage({
		curPage,
		total,
		onChange: onQueryChange,
	});
	return (
		<Table 
			columns={columns}
			dataSource={dataSource}
			loading={global.loading}
			rowKey="merchant_id"
			pagination={pagination}
			scroll={{ x: true }}
		/>
	);
};

export default MerchantList;