import styles from './index.less';
import React from 'react';
import { connect, router } from 'dva';
import { ConfigProvider, BackTop } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import Menu from './Layout/Menu';
import Header from './Layout/Header';
import BreadCrumb from './Layout/BreadCrumb';
import { scrollToTop } from '@/utils/tools';
import config from '@/utils/config';


const getCurrentLocale = () => {
	const language = navigator.language;
	return language.startsWith('en') ? 'en' : 'zh-CN';
  }

function App({ children, dispatch, app }) {
	const { siderFold, user, skin, menuTree, isMobile } = app;
	const locale = getCurrentLocale() === 'en' ? enUS : zhCN;
	const menuProps = {
		menuTree: menuTree
	}
	const headerProps = {
		siderFold,
		user,
		isMobile,
		logout() {
			dispatch({
				type: 'app/logout',
			});
		},
		switchSider() {
			localStorage.setItem(`${config.prefix}siderFold`, !siderFold);
			dispatch({
				type: 'app/setState',
				payload: {
					siderFold: !siderFold,
					seed: Math.random(),
				}
			});
		}
	};


	scrollToTop();    //switch menu, scroll top
	return (
		<ConfigProvider locale={locale}>
			<div className={[styles.layout, styles[skin], isMobile&&styles.mobile].join(' ')}>
				<aside className={[styles.sider, siderFold&&styles.hideSider].join(' ')} id='layout-aside'>
					<Menu {...menuProps} />
				</aside>
				<div className={[styles.main, siderFold&&styles.mainPer].join(' ')} id='layout-main'>
					<div className={styles.flexRowContainer}>
						<Header {...headerProps} />
						{ !isMobile && <BreadCrumb /> }
						<div className={styles.container}>
							<div className={styles.content}>
								{children}
							</div>
						</div>
					</div>
				</div>
				<BackTop />
			</div>
		</ConfigProvider>
	);
}

// console.log(enGB, 'enGB');
function mapStateToProps(data) {
    const { app } = data;
    return { app };
}
export default router.withRouter(connect(mapStateToProps)(App));
