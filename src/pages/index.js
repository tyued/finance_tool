import React from 'react';
import styles from '@/layouts/index.less';
import { connect } from 'dva';

function Dashboard () {
	return (
		<div className={styles.fullBox} id='dashboard_box'>
		</div>
	);
}

function mapStateToProps( data ) {
	const { app } = data;
	return { app };
}

export default connect(mapStateToProps)(Dashboard);