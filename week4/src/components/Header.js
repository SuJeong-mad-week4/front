// Header.js
import { Button, Dropdown, Menu } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { UserContext } from "../App";

const items = [
  { key: 0, label: `무드 캘린더`, path: "/calendar" },
  { key: 1, label: "펫 키우기" },
  { key: 2, label: "프로필" },
];

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate(); // useNavigate 추가

  const handleMenuItemClick = (key) => {
    if (key === 2) {
      setShowProfile(!showProfile);
      console.log("프로필 열림", showProfile);
    } else if (items.some((item) => item.key === key && item.path)) {
      // path가 있는 경우 해당 path로 navigate
      navigate(items.find((item) => item.key === key && item.path).path);
    }
  };

  const handleCloseProfile = () => {
    setShowProfile(false);
    console.log("프로필 닫힘");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    // 로그아웃 처리
    setUser(null);
    localStorage.removeItem("user");
    // 로그인 화면으로 이동
    navigate("/");
  };

  const profileMenu = (
    <Menu>
      <Menu.Item>
        {user ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{user.nickname}</span>
            <div style={{ marginLeft: "auto" }}>
              <Button type="link" onClick={handleCloseProfile}>
                닫기
              </Button>
            </div>
          </div>
        ) : (
          <span>로그인 필요</span>
        )}
      </Menu.Item>
      <Menu.Item>
        {user && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={handleLogout}>로그아웃</Button>
          </div>
        )}
      </Menu.Item>
      {/* 다른 프로필 메뉴 아이템들을 추가할 수 있습니다. */}
    </Menu>
  );

  return (
    <header
      style={{
        // 헤더 스타일
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // 오른쪽 정렬을 위해 추가
        paddingRight: "40px",
      }}
    >
      <div className="demo-logo" style={{ paddingLeft: "40px" }}>
        <Button
          type="text"
          onClick={handleLogoClick}
          style={{ color: "black", fontWeight: "bold", fontSize:"18px", textAlign:"center" }}
        >
          Simley Smiley
        </Button>
      </div>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          justifyContent: "flex-end", // 오른쪽 정렬을 위해 추가
        }}
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            onClick={() => handleMenuItemClick(item.key)}
          >
            {item.key === 2 && user ? (
              // 프로필 버튼인 경우, 로그인한 경우에만 닉네임 표시
              <Dropdown overlay={profileMenu} visible={showProfile}>
                <span>{user.nickname}</span>
              </Dropdown>
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
