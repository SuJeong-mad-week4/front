// List.js
import React from "react";

const List = ({ questions }) => {
  return (
    <div
      style={{
        height: "100vh",
        background: `linear-gradient(to bottom, #ff9f9f, #ffedbf 100%)`,
        position: "relative",
        textAlign: "center",
      }}
    >
      <div>
        <h2 style={{ color: "white" }}>Saved Questions and Answers</h2>
        <ul>
          {questions.map((q, index) => (
            <li key={index} style={{ color: "white" }}>
              <strong>{q.question}</strong>: {q.answer}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default List;
