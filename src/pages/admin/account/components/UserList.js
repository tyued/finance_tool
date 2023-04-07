/* eslint-disable */
import React, { useEffect } from 'react';
import { Table, Tag } from 'antd';
import { setPage } from '@/utils/tools'

const UserList = ({
	total,
	curPage,
	dataSource,
	getUserList,
	onQueryChange
}) => {
	useEffect(() => {
		getUserList();
	}, [])
	

	const columns = [{
		title: 'id',
		dataIndex: 'user_id',
		key: 'user_id',
	}, {
		title: 'accountName',
		dataIndex: 'user_name',
		key: 'user_name',
	}, {
		title: 'roles',
		dataIndex: 'role_name',
		key: 'role_name',
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
			rowKey="user_id"
			pagination={pagination}
			scroll={{ x: true }}
		/>
	);
};

export default UserList;