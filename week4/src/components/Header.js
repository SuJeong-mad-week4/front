// Header.js

import { Menu } from 'antd';
import React from 'react';

const items = [{key: 0, label: `무드 캘린더`},{key:1, label: '펫 키우기' },{key:2, label:'프로필'},{key:3, label:'로그아웃'}];

const Header = () => {
    return (
    <header style={{  // 헤더 스타일
        display: 'flex',
        alignItems: 'center',
      justifyContent: 'space-between', // 오른쪽 정렬을 위해 추가
    }}>
    <div className="demo-logo" style={{ paddingLeft: '20px'}}>
    {<span> Simley Smiley </span>}
    </div>
        <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={items}
        style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
          justifyContent: 'flex-end',  // 오른쪽 정렬을 위해 추가
        }}
        />
    </header>
    );
};

export default Header;
