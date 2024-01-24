// Header.js
import { Button, Dropdown, Menu, Image, Flex, Typography } from "antd";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { UserContext } from "../App";
import "./Header.css";
import { CloseOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const items = [
  { key: 0, label: `펫 키우기`, path: "/petcare" },
  { key: 1, label: `무드 캘린더`, path: "/calendar" },
  { key: 2, label: "오늘의 질문", path: "/TodayQA" },
];

const Header = () => {
  const { user, setUser } = useContext(UserContext);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate(); // useNavigate 추가

  const handleMenuItemClick = (key) => {
    if (key === 3) {
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
    <Menu
      style={{
        borderRadius: "10px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
        marginTop: 5,
        padding: 20,
      }}
    >
      <CloseOutlined
        size={"large"}
        style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10}}
        onClick={handleCloseProfile}
      />
      <Flex vertical gap={10}>
        <Flex gap={10} justify='center' align='center'>
          <Text>{user?.nickname}</Text>
          <Text type='secondary' style={{ fontSize: 12 }}>
            @{user?.loginId}
          </Text>
        </Flex>
        <Button
          block={true}
          style={{
            color: "white",
            background: "#ff9f9f",
          }}
          shape='round'
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Flex>
    </Menu>
  );

  if (!user) {
    return null;
  }

  return (
    <header
      style={{
        // 헤더 스타일
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between", // 오른쪽 정렬을 위해 추가
        paddingRight: "40px",
        height: "7vh",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.8)", // Add box-shadow here
        overflow: "visible", // or overflow: "inherit"
      }}
    >
      <div className='demo-logo' style={{ paddingLeft: "40px" }}>
        <Flex
          justifyContent='center'
          align='center'
          onClick={handleLogoClick}
          style={{
            width: "auto",
            cursor: "pointer", // Change cursor to 'pointer' on hover
          }}
        >
          <Image src='./images/logo.png' width={40} preview={false} />
          <Text
            style={{
              whiteSpace: "nowrap", // Prevent text from wrapping
              overflow: "hidden", // Hide overflowing text
              textOverflow: "ellipsis", // Show ellipsis for overflow
              color: "black",
              fontWeight: "800",
              fontSize: "18px",
              marginLeft: 20,
            }}
          >
            {"Simley : )"}
          </Text>
        </Flex>
      </div>
      <Menu
        theme='light'
        mode='horizontal'
        defaultSelectedKeys={["3"]}
        style={{
          height: "100%",
          display: "flex",
          width: "100%",
          fontSize: "16px",
          justifyContent: "center", // 오른쪽 정렬을 위해 추가
        }}
      >
        {items.map((item) => (
          <Menu.Item
            key={item.key}
            style={{
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => handleMenuItemClick(item.key)}
          >
            <span>{item.label}</span>
          </Menu.Item>
        ))}
      </Menu>
      {user ? (
        // 프로필 버튼인 경우, 로그인한 경우에만 닉네임 표시
        <Dropdown
          overlay={profileMenu}
          visible={showProfile}
          onClick={() => setShowProfile(!showProfile)}
        >
          <Flex
            justifyContent='center'
            align='center'
            style={{
              width: "auto",
              cursor: "pointer", // Change cursor to 'pointer' on hover
              alignContent: "center",
            }}
          >
            <Image src='./images/user.png' width={40} preview={false} />
            <Text
              style={{
                fontSize: 16,
                marginLeft: 10,
                whiteSpace: "nowrap", // Prevent text from wrapping
                overflow: "hidden", // Hide overflowing text
                textOverflow: "ellipsis", // Show ellipsis for overflow
              }}
            >
              {user?.nickname} 님
            </Text>
          </Flex>
        </Dropdown>
      ) : (
        "로그인 해주세요."
      )}
    </header>
  );
};

export default Header;
