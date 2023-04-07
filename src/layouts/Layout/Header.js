import React from 'react';
import { Icon, Menu } from 'antd';
import styles from './index.less';

const SubMenu = Menu.SubMenu;
function Header({ switchSider, siderFold, user, logout }) {

    const handleClickMenu = (e) => {
        switch (e.key) {
            case 'logout':
                logout();
                break;
            default:
                break;
        }
    };
    
    return (
        <div className={styles.header}>
           <div className={styles.siderFoldBtn} onClick={switchSider}>
                <Icon type={siderFold ? 'menu-unfold' : 'menu-fold'} />
            </div>
            <div className={styles.right}>
                <Menu className={styles.userMenu} mode="horizontal" onClick={handleClickMenu}>
                    <SubMenu title={<span> <Icon style={{fontSize:'18px'}} type="user" />{user.realName} </span>}>
                        <Menu.Item key="logout" style={{ textAlign: 'center' }}>
                            <span style={{ color: '#000' }}>Logout</span>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        </div>
    );
}

export default Header;
