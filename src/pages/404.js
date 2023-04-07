import React from 'react';
import { Icon } from 'antd';

const Error404 = () => {
    return (
        <div className='errorTips'>
            <Icon type="frown-o" style={{ fontSize: 30 }} />
            <h1>404 Not Found</h1>
            <h2>页面不存在</h2>
        </div>
    );
};

export default Error404;
