// Signup.js
import { Button, Flex, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');

  const handleSignupButtonClick = async() => {
    // 클라이언트에서 Axios를 사용하여 서버로 회원가입 정보 전송
    await axios.post('http://143.248.196.22:8080/user/sign-up',
    { loginId:id, nickname:nickname, password:password })
      .then((response) => {
        console.log("res",response)
        const data = response.data;
        console.log(data)

        console.log('Signup successful');
        alert('회원가입에 성공하였습니다 !');
        navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동

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
        console.error('Error during signup:', error.response.data.error);
        window.alert(error.response.data.error);
      });
  };

  return (
    <Flex
      gap="large"
      wrap="wrap"
      vertical
      justify="center"
      align="center"
      style={{
        height: '100vh',
        background: `linear-gradient(to bottom, #fff383, #ff8d7d)`,
      }}
    >
      <div style={{ textAlign: 'center', width: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Simley Smiley</h2>
        <Input
          placeholder="ID"
          style={{ width: '40%', marginBottom: '10px' }}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder="닉네임"
          style={{ width: '40%', marginBottom: '10px' }}
          onChange={(e) => setNickname(e.target.value)}
        />
        <Input
          placeholder="비밀번호"
          type="password"
          style={{ width: '40%', marginBottom: '10px' }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="text" onClick={handleSignupButtonClick} style={{ marginBottom: '10px' }}>
          회원가입
        </Button>
      </div>
    </Flex>
  );
};

export default Signup;
