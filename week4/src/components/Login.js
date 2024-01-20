import { UserOutlined } from '@ant-design/icons';
import { Button, Flex, Input } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const handleLoginButtonClick = () => {
    axios.post('http://143.248.196.22:8080/user/login', { loginId: id, password: password })
        .then((response) => {
        const data = response.data;
        console.log(data)
        alert('로그인에 성공했습니다!');
        navigate('/Home');
        })
        .catch((error) => {
        console.error('Error during login:', error);
        alert('로그인 중 오류가 발생했습니다.');
        });
    
    }

    const handleSignupButtonClick = () => {
    navigate('/Signup');
    }

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
            prefix={<UserOutlined />}
            style={{ width: '40%', marginBottom: '10px' }}
            onChange={(e) => setId(e.target.value)}
        />
        <Input
            placeholder="Password"
            type="password"
            prefix={<UserOutlined />}
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
