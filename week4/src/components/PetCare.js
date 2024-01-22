import { SmileOutlined } from "@ant-design/icons";
import { Button, Card, Progress } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PetCare.css";

const PetCare = () => {
  const [growthStage, setGrowthStage] = useState(0);
  const [exp, setExp] = useState(0);

  const handleActivity = async (growthAmount) => {
    const newGrowthStage = growthStage + growthAmount;
    const newExp = exp + growthAmount;

    const response = await axios.post("http://143.248.196.22:8080/pet/grow", {
      loginId: id,
      petId: 1,
      exp: growthAmount,
    });

    // Growth Stage 업데이트
    if (newExp < 10) {
      setGrowthStage(0);
    } else if (newExp >= 10 && newExp < 20) {
      setGrowthStage(10);
    } else if (newExp >= 20 && newExp < 40) {
      setGrowthStage(20);
    } else if (newExp >= 40 && newExp < 70) {
      setGrowthStage(40);
    } else if (newExp >= 70 && newExp < 100) {
      setGrowthStage(70);
    } else {
      setGrowthStage(newGrowthStage); // 나머지 경우에는 newGrowthStage로 업데이트
    }

    // 최대 성장 단계는 100으로 제한
    if (newGrowthStage >= 100) {
      setGrowthStage(100);
    }

    setExp(newExp);
  };

  const [growthImage, setGrowthImage] = useState(null);
  useEffect(() => {
    console.log(growthStage);
    switch (growthStage) {
      case 0:
        setGrowthImage("./images/egg.png");
        break;
      //10보다 작을떄
      case 10:
        setGrowthImage("./images/baby1.png");
        break;
      case 20:
        setGrowthImage("./images/teen1.png");
        break;
      case 40:
        setGrowthImage("./images/young_adult1.png");
        break;
      case 70:
        setGrowthImage("./images/adult1.png");
        break;
      default:
        setGrowthImage("./images/final1.png");
        break;
    }
  }, [growthStage]);
  console.log(`pet-image ${growthStage < 10 ? "egg" : "final"}`);
  return (
    <div className={`pet-care-container ${growthStage === 100 ? "adult" : ""}`}>
      {/* <div className={`pet-image ${growthStage < 10 ? "egg" : "final"}`}></div> */}
      <img src={growthImage} />
      <Card
        style={{
          width: 300,
          background: "transparent",
          boxShadow: "none",
          position: "absolute",
          top: "50%",
          left: "50%",
          border: "none",
        }}
      >
        <p
          style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}
        >
          진우의 펫
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Button type="primary" onClick={() => handleActivity(2)}>
            <SmileOutlined /> 노래 듣기 +2
          </Button>
          <Button type="primary" onClick={() => handleActivity(5)}>
            <SmileOutlined /> 웃음 +5
          </Button>
          <Button type="primary" onClick={() => handleActivity(1)}>
            <SmileOutlined /> 긍정적 말 듣기 +1
          </Button>
          <Button type="primary" onClick={() => handleActivity(4)}>
            <SmileOutlined /> 스트레칭 +4
          </Button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Progress percent={(exp / 100) * 100} status="active" />
        </div>
      </Card>
    </div>
  );
};

export default PetCare;
