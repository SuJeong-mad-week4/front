import { Button, Flex, Input } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = async () => {
    try {
      const response = await axios.post(
        "http://143.248.196.22:8080/user/login",
        {
          loginId: id,
          password: password,
        }
      );

      const data = response.data;

      if (data) {
        setUser({
          userId: data.userId,
          nickname: data.nickname,
        });
        alert("로그인에 성공했습니다!");
        navigate("/");
      } else {
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  const handleSignupButtonClick = () => {
    navigate("/Signup");
  };

  return (
    <Flex
      gap="large"
      wrap="wrap"
      vertical
      justify="center"
      align="center"
      style={{
        height: "100vh",
        background: `linear-gradient(to bottom, #ff9f9f, #ffedbf 100%)`,
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column", // 세로 정렬을 위해 추가
          alignItems: "center", // 가운데 정렬을 위해 추가
          justifyContent: "center",
          width: "300px",
          height: "300px",
        }}
      >
        <h2>Login</h2>
        <Input
          placeholder="Id"
          style={{ width: "80%", marginBottom: "10px", marginTop: "20px" }}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          style={{ width: "80%", marginBottom: "20px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <Button
            onClick={handleLoginButtonClick}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.8)",
              fontWeight: "bold",
              marginTop: "20px",
              color: "pink",
            }}
          >
            로그인
          </Button>
          <Button
            onClick={handleSignupButtonClick}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.8)",
              fontWeight: "bold",
              marginTop: "20px",
              marginLeft: "10px",
              color: "pink",
            }}
          >
            회원가입
          </Button>
        </div>
      </div>
    </Flex>
  );
};

export default Login;
