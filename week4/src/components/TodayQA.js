import { Image, Modal } from "antd";
import React, { useState } from "react";

const TodayQA = () => {
  const [questions, setQuestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");

  const getRandomQuestion = () => {
    // 여기에서 랜덤 질문 가져오는 로직 추가
    const randomQuestions = [
      "오늘 가장 행복했던 일은 무엇이었나요 ?",
      "오늘 가장 감사했던 일 한 가지!",
      "가장 나를 행복하게 하는 것은?",
      "질문 4",
    ]; // 예시로 임시로 배열 사용
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    const randomQuestion = randomQuestions[randomIndex];
    setCurrentQuestion(randomQuestion);
  };

  const handleAnswerSave = (answer) => {
    // 여기에서 답변을 저장하는 로직 추가
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: currentQuestion, answer },
    ]);
    // 답변 저장 후 현재 질문 초기화
    setCurrentQuestion("");
  };

  const handleImageClick = (imagePath) => {
    setShowModal(true);
    setCurrentImage(imagePath);
    getRandomQuestion();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setCurrentImage("");
    setCurrentQuestion("");
  };
  const [isFolded, setIsFolded] = useState(true);

  return (
    <div
      style={{
        height: "100vh",
        background: `linear-gradient(to bottom, #ff9f9f, #ffedbf 100%)`,
        position: "relative",
        textAlign: "center",
      }}
    >
      {isFolded ? (
        <Image
          preview={false}
          src="./images/쪽지.png"
          onClick={() => setIsFolded(false)}
          style={{
            cursor: "pointer",
            marginTop: "70px",
            marginLeft:"50px",
            width: "500px",
            height: "600px",
          }}
        />
        
      ) : (
        <Image
          preview={false}
          src="./images/펼친쪽지.png"
          onClick={() => setIsFolded(true)}
          style={{
            cursor: "pointer",
            marginTop: "70px",
            width: "800px",
            height: "500px",
          }}
        />
      )}

      <Modal
        visible={showModal}
        onCancel={handleModalClose}
        onOk={handleModalClose}
      >
        {currentImage && (
          <Image
            preview={false}
            src={currentImage}
            style={{
              cursor: "pointer",
              width: "400px",
              height: "500px",
            }}
          />
        )}
        {currentQuestion && (
          <div style={{ marginTop: "10px" }}>
            <p>오늘의 질문: {currentQuestion}</p>
            {/* 여기에 답변 입력 폼 등을 추가할 수 있습니다. */}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TodayQA;
