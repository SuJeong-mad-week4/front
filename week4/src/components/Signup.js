// Signup.js
import { Button, Flex, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");

  const handleSignupButtonClick = async () => {
    // 클라이언트에서 Axios를 사용하여 서버로 회원가입 정보 전송
    await axios
      .post("http://143.248.196.72:8080/user/sign-up", {
        loginId: id,
        nickname: nickname,
        password: password,
      })
      .then((response) => {
        console.log("res", response);
        const data = response.data;
        console.log(data);

        console.log("Signup successful");
        alert("회원가입에 성공하였습니다 !");
        navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동

        // if (data.success) {
        //   console.log('Signup successful');
        //   alert('회원가입에 성공하였습니다 !');
        //   navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
        // } else {
        //   console.log(data.data.error)
        //   console.log('Signup failed:', data.message);
        //}
      })
      .catch((error) => {
        console.error("Error during signup:", error.response.data.error);
        window.alert(error.response.data.error);
      });
  };

  return (
    <Flex
      gap="large"
      wrap="wrap"
      vertical
      justify="center"
      align="flex-start"
      style={{
        height: "100vh",
        backgroundImage: `url(./images/home.png)`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "80%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "200px",
          width: "400px",
          height: "300px",
        }}
      >
        <h2>회원가입</h2>
        <Input
          placeholder="아이디"
          style={{ width: "60%", marginBottom: "10px", marginTop: "20px" }}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder="이름"
          style={{ width: "60%", marginBottom: "10px" }}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          style={{ width: "60%", marginBottom: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          onClick={handleSignupButtonClick}
          style={{
            marginTop: "20px",
            background: "rgba(255,255,255,0.8)",
            fontWeight: "bold",
            borderRadius: "20px",
            color: "pink",
          }}
        >
          회원가입
        </Button>
      </div>
    </Flex>
  );
};

export default Signup;
