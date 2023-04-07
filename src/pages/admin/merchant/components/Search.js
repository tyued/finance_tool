import React from 'react';
import { Input } from 'antd';

const Search = Input.Search;
const MerchantSearch = ({ onSearch }) => {
    return (
        <div className='searchBox'>
            <Search placeholder="Enter name or merchantid search"
                style={{ width: 400, marginRight: 20 }}
                onSearch={value => onSearch({ keywords: value })}
            />
        </div>
    );
};
export default MerchantSearch;
