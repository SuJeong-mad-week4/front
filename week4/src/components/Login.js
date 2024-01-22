import { Button, Flex, Input } from 'antd';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginButtonClick = async () => {
    try {
      const response = await axios.post('http://143.248.196.22:8080/user/login', {
        loginId: id,
        password: password,
      });

      const data = response.data;

      if (data) {
        setUser({
          userId: data.userId,
          nickname: data.nickname,
        });
        alert('로그인에 성공했습니다!');
        navigate('/');
      } else {
        alert('로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleSignupButtonClick = () => {
    navigate('/Signup');
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
        <h2>Login 로그인</h2>
        <Input
          placeholder="Id"
          style={{ width: '40%', marginBottom: '10px' }}
          onChange={(e) => setId(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          style={{ width: '40%', marginBottom: '10px' }}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="text" onClick={handleLoginButtonClick} style={{ marginBottom: '10px' }}>
          로그인
        </Button>
        <Button type="text" onClick={handleSignupButtonClick} style={{ marginBottom: '10px' }}>
          회원가입
        </Button>
      </div>
    </Flex>
  );
};

export default Login;