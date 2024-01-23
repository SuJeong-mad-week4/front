import { SmileOutlined } from "@ant-design/icons";
import { Button, Card, Progress } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";

const PetCare = () => {
  const [growthStage, setGrowthStage] = useState(0);
  const [exp, setExp] = useState(0);
  const [petData, setPetData] = useState({});
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // 유저 정보를 서버에서 가져오는 함수
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://143.248.196.72:8080/pet/get", {
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
    if (user) {
      fetchUserData();
    }
  }, [exp, user]);

  const handleActivity = async (growthAmount) => {
    const newExp = exp + growthAmount;

    try {
      const response = await axios.post("http://143.248.196.72:8080/pet/grow", {
        loginId: user.id,
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
    <div
      style={{
        background: "linear-gradient(to bottom, #ff9f9f, #ffedbf 100%)",
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: 700,
          height: 600,
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          //   top: "15%",
          //   left: "45%",
          border: "none",
        }}
      >
        <p
          style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold" }}
        >
          {user ? `${user.nickname}의 펫` : "펫"}
        </p>
        <img
          src={getGrowthImage()}
          alt="Pet"
          style={{ marginLeft: "25%", width: 300, height: 300 }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <Button
            type="primary"
            onClick={() => handleActivity(2)}
            style={{
              color: "white",
              background: "#ff9f9f",
              fontWeight: "bold",
            }}
          >
            <SmileOutlined /> 노래 듣기 +2
          </Button>
          <Button
            type="primary"
            style={{
              marginLeft: "5px",
              color: "white",
              background: "#ff9f9f",
              fontWeight: "bold",
            }}
            onClick={() => handleActivity(5)}
          >
            <SmileOutlined /> 웃음 +5
          </Button>
          <Button
            type="primary"
            style={{
              marginLeft: "5px",
              color: "white",
              background: "#ff9f9f",
              fontWeight: "bold",
            }}
            onClick={() => handleActivity(1)}
          >
            <SmileOutlined /> 긍정적 말 듣기 +1
          </Button>
          <Button
            type="primary"
            style={{
              marginLeft: "5px",
              color: "white",
              background: "#ff9f9f",
              fontWeight: "bold",
            }}
            onClick={() => handleActivity(4)}
          >
            <SmileOutlined /> 스트레칭 +4
          </Button>
        </div>
        <div style={{ marginTop: "20px" }}>
          <Progress
            percent={(exp / 100) * 100}
            status="active"
            strokeColor={{ from: "#ffc839", to: "#ff6666" }}
          />
        </div>
      </Card>
    </div>
  );
};

export default PetCare;
