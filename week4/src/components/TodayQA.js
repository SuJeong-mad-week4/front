import React, { useState } from "react";

const TodayQA = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");

  const getRandomQuestion = () => {
    // 여기에서 랜덤 질문 가져오는 로직 추가
    const randomQuestions = ["질문 1", "질문 2", "질문 3"]; // 예시로 임시로 배열 사용
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
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={getRandomQuestion}>질문 받기</button>
      </div>

      {currentQuestion && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>오늘의 질문: {currentQuestion}</p>
          <input
            type="text"
            placeholder="답변을 입력하세요"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
          />
          <button onClick={() => handleAnswerSave(currentQuestion)}>
            저장하기
          </button>
        </div>
      )}

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
