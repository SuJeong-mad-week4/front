import { Button, Image, Input } from "antd";
import React, { useState } from "react";

const TodayQA = () => {
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
    setCurrentQuestion("");
    setAnswer("");
  };

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
            top: "50%",
            transform: "translate(-50%, -50%)",
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
              width: "500px",
              height: "600px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
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
              style={{ width: "400px", marginLeft: "80px", marginTop: "50px" }}
            />
            <Button
              type="primary"
              onClick={handleAnswerSave}
              style={{
                marginLeft: "10px",
                color: "white",
                background: "#ff9f9f",
                borderRadius: "20px",
              }}
            >
              저장하기
            </Button>
            {questions.length > 0 && (
              <div style={{ marginTop: "20px" }}>
                <h3>답변한 질문 목록</h3>
                <ul>
                  {questions.map((q, index) => (
                    <li key={index}>
                      <strong>{q.question}</strong>: {q.answer}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayQA;
