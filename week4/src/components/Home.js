// Home.js
import { Button, Flex } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [sad, setSad] = useState(false);
  const navigate = useNavigate();

  return (
    <Flex
      gap="large"
      wrap="wrap"
      vertical
      justify="center" // 수평 가운데 정렬
      align="center"   // 수직 가운데 정렬
      style={{ height: '100vh', backgroundImage: 'url("./images/home.png")', backgroundSize: 'cover', position: 'relative' }} // 화면 전체 높이만큼 가운데 정렬
    >
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
    {/* 위로 이동한 텍스트 */}
      <div style={{ color: 'white', fontSize: '30px'}}>
        <p> 오늘 하루 어떠셨나요?</p>
      </div>
    {/* 나머지 텍스트들 */}
    <div style={{ color: 'white', fontSize: '30px', display: 'flex', alignItems: 'center' }}>
      <p style={{ fontSize: '50px', marginLeft: '10px' }}>Simley</p>
      <p style={{ marginLeft: '10px' }}>와 함께 하세요.</p>
    </div>
        <div>
        <Button onClick={() => navigate('/login')} type="dashed" style={{ width: '150px'}}>로그인</Button>
        </div>
        <div>
        <Button onClick={() => navigate('/Signup')} type="dashed" style={{ width: '150px'}}>회원가입</Button>
        </div>
    
      </div>
    </Flex>
  );
};

export default Home;