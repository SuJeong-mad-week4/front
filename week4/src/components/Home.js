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
        height: "100vh",
        background: `linear-gradient(to bottom, #ff9f9f, #ffedbf 100%)`,
        position: "relative",
      }} // 화면 전체 높이만큼 가운데 정렬
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
        <div style={{ color: "black", fontSize: "30px", fontWeight: "bold" }}>
          <p>
            {user ? `'${user.nickname}' 님 반가워요 !` : `로그인 해주세요!`}
          </p>
          <p> 오늘 하루 어떠셨나요?</p>
        </div>
        {/* 나머지 텍스트들 */}
        <div
          style={{
            color: "black",
            fontSize: "30px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "50px" }}>Simley</p>
          <p style={{ marginLeft: "10px" }}>와 함께 하세요.</p>
        </div>
        {!user && (
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              onClick={() => navigate("/login")}
              style={{
                width: "150px",
                color: "pink",
                fontWeight: "bold",
                background: "rgba(255,255,255,0.8)",
                borderRadius: "20px",
              }}
            >
              로그인
            </Button>
            <Button
              onClick={() => navigate("/Signup")}
              style={{
                width: "150px",
                color: "pink",
                fontWeight: "bold",
                background: "rgba(255,255,255,0.8)",
                borderRadius: "20px",
              }}
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
