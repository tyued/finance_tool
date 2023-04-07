import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import styles from './index.less';

const Menus = ({menuTree}) => {
    const createMenu = (menu=[]) => {
        return menu.map((item) => {
            if (item.type === 2) {
                return null;
            }
            if (item.children) {
                return (
                    <Menu.SubMenu
                        key={item.id}
                        title={<span>{item.icon ? <Icon style={{fontSize:'18px'}} type={item.icon} /> : ''}{item.name}</span>}
                    >
                        {createMenu(item.children)}
                    </Menu.SubMenu>
                );
            } else {
                return item.routers ? (<Menu.Item key={item.id}>
                    <Link to={item.routers}>
                        {item.icon ? <Icon style={{fontSize:'18px'}} type={item.icon} /> : ''}{item.name}
                    </Link>
                </Menu.Item>) : null;
            }
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img alt={'logo'} src={require('../../../src/assets/image/logo-citcon.png')} />
            </div>
            {
                menuTree.tree ? <Menu className='flexScrollY' mode="inline"
                    defaultSelectedKeys={menuTree.defaultSelectedKeys}
                    defaultOpenKeys={menuTree.defaultOpenKeys}
                >
                    {createMenu(menuTree.tree)}
                </Menu>:''
            }
            
        </div>
    );
}

export default Menus;
