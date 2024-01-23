import { Button, Card, Image } from "antd";
import React, { useState } from "react";

const TodayQA = () => {
  const [questions, setQuestions] = useState([]);
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

  return (
    <div
      style={{
        height: "100vh",
        background: "linear-gradient(to bottom, #ff9f9f, #ffedbf 100%)",
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
          background: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          position: "absolute",
          border: "none",
          textAlign: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Image
            preview={false}
            src="./images/쪽지.png" // 이미지 경로 설정
            onClick={getRandomQuestion}
            style={{
              cursor: "pointer", // 커서를 손가락으로 표시하여 클릭 가능함을 나타냄
              width: "300px",
              height: "400px",
            }}
          />
          <p>쪽지를 받아보세요 !</p>
        </div>

        {currentQuestion && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>오늘의 질문: {currentQuestion}</p>
            <input
              type="text"
              placeholder="답변을 입력하세요"
              onChange={(e) => setCurrentQuestion(e.target.value)}
              style={{ borderRadius: "20px", width: "400px", height: "40px" }}
            />
            <Button
              onClick={() => handleAnswerSave(currentQuestion)}
              style={{
                borderRadius: "20px",
                background: "rgba(255,255,255,0.8)",
                color: "pink",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              저장하기
            </Button>
          </div>
        )}
      </Card>

      {questions.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>답변한 질문 목록</h3>
          <ul>
            {questions.map((q, index) => (
              <li key={index}>
                <strong>질문:</strong> {q.question}, <strong>답변:</strong>{" "}
                {q.answer}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TodayQA;
