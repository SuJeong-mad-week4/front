// PetCare.js

import { CloseOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import React, { useState } from "react";
import "./PetCare.css"; // 스타일 파일을 import

const PetCare = () => {
  const [isSleeping, setSleeping] = useState(true);

  const handleWakeUp = () => {
    setSleeping(false);
  };

  const handleSleep = () => {
    setSleeping(true);
  };

  return (
    <div className={`pet-care-container ${isSleeping ? "sleeping" : ""}`}>
      <Card title="진우의 펫" style={{ width: 300 }}>
        <div className={`pet-image ${isSleeping ? "sleeping" : ""}`}></div>
        {isSleeping ? (
          <Button type="primary" onClick={handleWakeUp}>
            <SmileOutlined /> 깨우기
          </Button>
        ) : (
          <Button type="danger" onClick={handleSleep}>
            <CloseOutlined /> 재우기
          </Button>
        )}
      </Card>
    </div>
  );
};

export default PetCare;
