import { Button, Image, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가

const TodayQA = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentImage, setCurrentImage] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isFolded, setIsFolded] = useState(true);

  const getRandomQuestion = () => {
    // 여기에서 랜덤 질문 가져오는 로직 추가
    const randomQuestions = [
      "Q. 오늘 가장 행복했던 일은 무엇이었나요 ?",
      "Q. 오늘 가장 감사했던 일 한 가지는 ?",
      "Q. 가장 나를 행복하게 하는 것은 ?",
      "Q. 질문 4",
    ]; // 예시로 임시로 배열 사용
    const randomIndex = Math.floor(Math.random() * randomQuestions.length);
    const randomQuestion = randomQuestions[randomIndex];
    setCurrentQuestion(randomQuestion);
  };

  const handleImageClick = () => {
    getRandomQuestion();
    setIsFolded(!isFolded);
  };

  const handleAnswerSave = () => {
    // Your logic to save the answer
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      { question: currentQuestion, answer },
    ]);
    // Clear current question and answer
    setAnswer("");
  };
  const gotoList = () => {
    navigate("/list");
  };

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 159, 159, 0.8), rgba(255, 237, 191, 0.8) 100%)",
        height: "93vh",
        position: "relative",
        textAlign: "center",
      }}
    >
      {isFolded ? (
        <div>
          <Image
            preview={false}
            src="./images/쪽지.png"
            onClick={handleImageClick}
            style={{
              cursor: "pointer",
              marginTop: "70px",
              marginLeft: "50px",
              width: "500px",
              height: "600px",
            }}
          />
          <p style={{ marginTop: "10px" }}>오늘의 질문을 받아보세요 !</p>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
          }}
        >
          <Image
            preview={false}
            src="./images/펼친쪽지.png"
            onClick={() => setIsFolded(true)}
            style={{
              cursor: "pointer",
              marginTop: "70px",
              marginLeft: "50px",
              width: "800px",
              height: "600px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "350px",
              left: "440px",
              transform: "translate(-50%, -50%)",
            }}
          >
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
              {currentQuestion}
            </p>
            <Input
              placeholder="답변을 입력하세요"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              style={{ width: "350px", marginLeft: "50px", marginTop: "50px" }}
            />
            <Button
              type="primary"
              onClick={handleAnswerSave}
              style={{
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
                marginTop: "10px",
              }}
            >
              저장하기
            </Button>
          </div>
        </div>
      )}
      {/* <Button
        type='primary'
        onClick={gotoList}
        style={{
          color: "white",
          background: "#ff9f9f",
          borderRadius: "20px",
          marginTop: "700px",
          marginLeft: "60px",
        }}
      >
        리스트 보기
      </Button> */}
    </div>
  );
};

export default TodayQA;
