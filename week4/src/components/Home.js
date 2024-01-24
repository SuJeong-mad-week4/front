// Home.js
import { Button, Flex } from "antd";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <Flex
      gap="large"
      wrap="wrap"
      vertical
      justify="center" // 수평 가운데 정렬
      align="flex-start" // 수직 가운데 정렬
      style={{
        height: user ? "93vh" : "100vh",
        backgroundImage: `url(./images/home.png)`,
        backgroundSize: "cover",
        position: "relative",
      }} // 화면 전체 높이만큼 가운데 렬
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "10px",
          marginLeft: "200px",
        }}
      >
        {/* 위로 이동한 텍스트 */}
        <div style={{ color: "white", fontSize: "30px", fontWeight: "bold" }}>
          <p>
            {user ? `'${user.nickname}' 님 반가워요 !` : `로그인 해주세요!`}
          </p>
          <p> 오늘 하루 어떠셨나요?</p>
        </div>
        {/* 나머지 텍스트들 */}
        <div
          style={{
            color: "white",
            fontSize: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "50px" }}>Simley</p>
          <p style={{ marginLeft: "10px" }}>와 함께 하세요.</p>
        </div>
        {!user && (
          <div style={{ display: "flex", gap: "20px" }}>
            <Button
              onClick={() => navigate("/login")}
              style={{
                width: "200px",
                fontWeight: "bold",
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
              }}
              size="large"
            >
              로그인
            </Button>
            <Button
              onClick={() => navigate("/Signup")}
              style={{
                width: "200px",
                fontWeight: "bold",
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
              }}
              size="large"
            >
              회원가입
            </Button>
          </div>
        )}
      </div>
    </Flex>
  );
};

export default Home;
