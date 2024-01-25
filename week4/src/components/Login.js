import { Button, Divider, Flex, Input, Typography } from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const { Text, Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginButtonClick = async () => {
    try {
      const response = await axios.post(
        "http://143.248.196.70:8080/user/login",
        {
          loginId: id,
          password: password,
        }
      );

      const data = response.data;

      if (data) {
        console.log(data);
        setUser({
          id: data.id,
          loginId: data.loginId,
          nickname: data.nickname,
          profile: data.profile,
          currentPet: data.currentPet,
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
      gap='large'
      wrap='wrap'
      vertical
      justify='center'
      align='flex-start'
      marginLeft='100px'
      style={{
        height: "100vh",
        backgroundImage: `url(/images/home.png)`,
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.6)",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
          display: "flex",
          flexDirection: "column", // 세로 정렬을 위해 추가
          alignItems: "center", // 가운데 정렬을 위해 추가
          justifyContent: "center",
          width: "300px",
          height: "300px",
          marginLeft: "250px",
        }}
      >
        <h2>로그인</h2>
        <Input
          placeholder='아이디'
          style={{
            width: "100%",
            marginBottom: "10px",
            marginTop: "20px",
            borderRadius: "10px",
          }}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder='비밀번호'
          type='password'
          style={{ width: "100%", marginBottom: "20px", borderRadius: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          block={true}
          onClick={handleLoginButtonClick}
          style={{
            color: "white",
            background: "#ff9f9f",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        >
          로그인
        </Button>
        <Divider plain>
          <Text type='secondary'>아직 회원이 아니신가요?</Text>
        </Divider>
        <Button
          onClick={handleSignupButtonClick}
          type='text'
          style={{
            borderRadius: "20px",
            color: "#ff9f9f",
          }}
        >
          회원가입
        </Button>
      </div>
    </Flex>
  );
};

export default Login;
