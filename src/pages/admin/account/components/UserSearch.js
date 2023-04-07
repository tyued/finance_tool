import React from 'react';
import { Input } from 'antd';

const Search = Input.Search;
const UserSearch = ({ onSearch }) => {
    return (
        <div className='searchBox'>
            <Search placeholder="Enter name or account search"
                style={{ width: 200, marginRight: 20 }}
                onSearch={value => onSearch({ keywords: value })}
            />
        </div>
    );
};
export default UserSearch;
