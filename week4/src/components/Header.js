// Header.js
import { Menu } from 'antd';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const items = [{key: 0, label: `무드 캘린더`},{key:1, label: '펫 키우기' },{key:2, label:'프로필'}];

const Header = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleMenuItemClick = (key) => {

  };

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
        >
        {items.map(item => (
          <Menu.Item key={item.key} onClick={() => handleMenuItemClick(item.key)}>
            {item.key === 2 && user ? ( // 프로필 버튼인 경우, 로그인한 경우에만 닉네임 표시
              <div>
                <span>{user.nickname}</span>
                {/* 여기에 프로필 사진 등을 표시할 수 있습니다. */}
              </div>
            ) : (
              <span>{item.label}</span>
            )}
          </Menu.Item>
        ))}
        </Menu>
    </header>
    );
};

export default Header;
