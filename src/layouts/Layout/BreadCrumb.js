import React from 'react';
import { Breadcrumb } from 'antd';
import styles from './index.less';
import { Link } from 'react-router-dom';
import authority from '@/utils/authority';

function Bread() {
    let current = '';
    //current path
    for (const item of authority) {
        if (window.location.pathname.includes(item.routers)) {
            current = item;
        }
    }
    const pathArray = [];
    //Recursively retrieve the path for crumbs
    const getArrayPath = (item) => {
        pathArray.unshift(item);
        if (item.pid) {
            const index = authority.findIndex(ev => ev.id === item.pid)
            getArrayPath(authority[index]);
        }
    };
    getArrayPath(current);
    return (
        <Breadcrumb className={styles.breadBox}>
            {pathArray.map(item => (
                item &&
                <Breadcrumb.Item key={item.id}>
                    {item.routers ? (
                        <Link to={item.routers}>
                            {item.name}
                        </Link>
                    ) : item.name}
                </Breadcrumb.Item>))}
        </Breadcrumb>
    );
}

export default Bread;
