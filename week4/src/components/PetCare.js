import { SmileOutlined } from "@ant-design/icons";
import { Button, Card, Progress } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import "./PetCare.css";

const PetCare = () => {
  const [growthStage, setGrowthStage] = useState(0);
  const [exp, setExp] = useState(0);
  const [petData, setPetData] = useState({});
  const [petName, setPetName] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showCollectionModal, setShowCollectionModal] = useState(false);
  const [collectedPets, setCollectedPets] = useState([]);

  console.log(petData);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const response = await axios.get(
          "http://143.248.196.134:8080/pet/collection",
          {
            params: { loginId: user.id },
          }
        );
        setCollectedPets(response.data);
      } catch (error) {
        console.error("Error fetching user collection:", error);
      }
    };
    // 유저 정보를 서버에서 가져오는 함수
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://143.248.196.134:8080/pet/get",
          {
            params: { petId: user.currentPet }, // 펫 ID에 맞게 설정
          }
        );
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
      fetchCollection();
    }
    console.log("asdf", user);
  }, [exp, user]);

  const createPet = async () => {
    try {
      const response = await axios.post(
        "http://143.248.196.134:8080/pet/create",
        {
          userId: user.id,
          nickname: petName,
        }
      );
      console.log(response);
      const createdPetId = response.data.id;
      setUser((prevUser) => ({
        ...prevUser,
        currentPet: createdPetId,
      }));
      console.log("Newly created pet ID:", createdPetId);
      console.log(user);
    } catch (error) {
      console.error("Error creating pet:", error);
    }
  };

  const handleActivity = async (growthAmount) => {
    const newExp = exp + growthAmount;

    try {
      const response = await axios.post(
        "http://143.248.196.134:8080/pet/grow",
        {
          loginId: user.id,
          petId: user.currentPet,
          exp: growthAmount,
        }
      );
      setPetData(response.data);
      setExp(response.data.exp);
      setGrowthStage(calculateGrowthStage(response.data.exp));
      if (response.data.exp >= 100) {
        setShowCollectModal(true);
      }
    } catch (error) {
      console.error("Error updating growth activity:", error);
    }
  };

  const handleCollect = async () => {
    try {
      const response = await axios.post(
        "http://143.248.196.134:8080/pet/save",
        {
          userId: user.id,
        }
      );

      await setUser((prevUser) => ({
        ...prevUser,
        currentPet: null,
      }));

      setShowCollectModal(false);
    } catch (error) {
      console.error("Error collecting pet:", error);
      // Handle error if needed
    }
  };

  const handleCancelCollect = () => {
    setShowCollectModal(false);
    // You might want to perform additional actions when canceling the collection
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

  const handleShowCollection = () => {
    setShowCollectModal(true);
  };
  const handleCloseCollection = () => {
    setShowCollectModal(false);
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 159, 159, 0.8), rgba(255, 237, 191, 0.8) 100%)",
        height: "93vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          width: 700,
          height: 600,
          background: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "20px",
          position: "absolute",
          border: "none",
          textAlign: "center",
        }}
      >
        {user && user.currentPet ? (
          <>
            <div
              style={{
                position: "absolute",
                left: "5px",
                top: "5px",
                cursor: "pointer",
              }}
            ></div>
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {user ? `${user.nickname}의 펫` : "펫"}
            </p>

            <img
              src={getGrowthImage()}
              alt='Pet'
              style={{ width: 300, height: 300 }}
            />
            <div
              style={{
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              <Progress
                percent={(exp / 100) * 100}
                status="active"
                strokeColor={{ from: "#ffc839", to: "#ff6666" }}
                style={{ width: "400px" }}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <Button
                type='primary'
                onClick={() => handleActivity(2)}
                style={{
                  color: "white",
                  background: "#ff9f9f",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
              >
                <SmileOutlined /> 노래 듣기 +2
              </Button>
              <Button
                type='primary'
                style={{
                  marginLeft: "5px",
                  color: "white",
                  background: "#ff9f9f",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
                onClick={() => handleActivity(5)}
              >
                <SmileOutlined /> 웃음 +5
              </Button>
              <Button
                type='primary'
                style={{
                  marginLeft: "5px",
                  color: "white",
                  background: "#ff9f9f",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
                onClick={() => handleActivity(1)}
              >
                <SmileOutlined /> 긍정적 말 듣기 +1
              </Button>
              <Button
                type='primary'
                style={{
                  marginLeft: "5px",
                  color: "white",
                  background: "#ff9f9f",
                  fontWeight: "bold",
                  borderRadius: "20px",
                }}
                onClick={() => handleActivity(4)}
              >
                <SmileOutlined /> 스트레칭 +4
              </Button>
            </div>
            <div style={{ marginTop: "20px" }}>
              <Progress
                percent={(exp / 100) * 100}
                status='active'
                strokeColor={{ from: "#ffc839", to: "#ff6666" }}
              />
            </div>
            <div style={{ marginTop: "20px" }}></div>
          </>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img width={300} src='./images/questionmark.png' />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <input
                type='text'
                placeholder='펫 이름을 입력해주세요'
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                style={{ marginTop: "10px", textAlign: "center" }}
              />
              <Button
                style={{
                  marginTop: "20px",
                  color: "white",
                  background: "#ff9f9f",
                  borderRadius: "20px",
                }}
                onClick={() => createPet()}
              >
                이름 짓고 새로운 펫 만나기
              </Button>
            </div>
          </div>
        )}
      </Card>
      {showCollectModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card
            style={{
              width: 400,
              padding: 20,
              textAlign: "center",
              background: "white",
            }}
          >
            <p>{`' ${petData.nickname} '펫을 컬렉션에 저장하시겠습니까?`}</p>
            <img
              src='./images/final1.png'
              style={{ width: "100%", maxHeight: "400px", objectFit: "cover" }}
            />
            <Button
              type='primary'
              onClick={handleCollect}
              style={{
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
              }}
            >
              저장하기
            </Button>
            <Button
              onClick={handleCancelCollect}
              style={{
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
                marginLeft: "10px",
              }}
            >
              취소
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
};

export default PetCare;
