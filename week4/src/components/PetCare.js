import { SmileOutlined } from "@ant-design/icons";
import { Button, Card, Progress } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./PetCare.css";

const PetCare = () => {
  const [growthStage, setGrowthStage] = useState(0);
  const [exp, setExp] = useState(0);
  const [petData, setPetData] = useState({});

  useEffect(() => {
    // 유저 정보를 서버에서 가져오는 함수
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://143.248.196.22:8080/pet", {
          params: { petId: 1 }, // 펫 ID에 맞게 설정
        });
        setPetData(response.data);
        setExp(response.data.exp);
        setGrowthStage(calculateGrowthStage(response.data.exp));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    // 로그인 상태에서만 유저 정보를 가져옴
    // if (/* 여기에 로그인 상태를 확인하는 조건 추가 */) {
    //     fetchUserData();
    //   }
  }, []);

  const handleActivity = async (growthAmount) => {
    const newExp = exp + growthAmount;

    try {
      const response = await axios.post("http://143.248.196.22:8080/pet/grow", {
        loginId: id,
        petId: 1,
        exp: growthAmount,
      });
      setPetData(response.data);
      setExp(response.data.exp);
      setGrowthStage(calculateGrowthStage(response.data.exp));
    } catch (error) {
      console.error("Error updating growth activity:", error);
    }
  };

  const calculateGrowthStage = (currentExp) => {
    if (currentExp < 10) {
      return 0;
    } else if (currentExp < 20) {
      return 10;
    } else if (currentExp < 40) {
      return 20;
    } else if (currentExp < 70) {
      return 40;
    } else if (currentExp < 100) {
      return 70;
    } else {
      return 100;
    }
  };

  const getGrowthImage = () => {
    switch (growthStage) {
      case 0:
        return "./images/egg.png";
      case 10:
        return "./images/baby1.png";
      case 20:
        return "./images/teen1.png";
      case 40:
        return "./images/young_adult1.png";
      case 70:
        return "./images/adult1.png";
      default:
        return "./images/final1.png";
    }
  };

  return (
    <div className={`pet-care-container ${growthStage === 100 ? "adult" : ""}`}>
      {/* <div className={`pet-image ${growthStage < 10 ? "egg" : "final"}`}></div> */}
      <img src={growthImage()} alt="Pet" />
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
