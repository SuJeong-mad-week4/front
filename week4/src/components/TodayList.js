import { Button, Card, Image, Input, Flex, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { useEffect } from "react";
import "./TodayList.css";

const { Text } = Typography;

const TodayList = () => {
  // const navigate = useNavigate();
  // const [questions, setQuestions] = useState([]);
  // const [currentImage, setCurrentImage] = useState("");
  // const [currentQuestion, setCurrentQuestion] = useState("");
  // const [answer, setAnswer] = useState("");
  // const [isFolded, setIsFolded] = useState(true);

  // const getRandomQuestion = () => {
  //   // 여기에서 랜덤 질문 가져오는 로직 추가
  //   const randomQuestions = [
  //     "Q. 오늘 가장 행복했던 일은 무엇이었나요 ?",
  //     "Q. 오늘 가장 감사했던 일 한 가지는 ?",
  //     "Q. 가장 나를 행복하게 하는 것은 ?",
  //     "Q. 질문 4",
  //   ]; // 예시로 임시로 배열 사용
  //   const randomIndex = Math.floor(Math.random() * randomQuestions.length);
  //   const randomQuestion = randomQuestions[randomIndex];
  //   setCurrentQuestion(randomQuestion);
  // };

  // const handleImageClick = () => {
  //   getRandomQuestion();
  //   setIsFolded(!isFolded);
  // };

  // const handleAnswerSave = () => {
  //   // Your logic to save the answer
  //   setQuestions((prevQuestions) => [
  //     ...prevQuestions,
  //     { question: currentQuestion, answer },
  //   ]);
  //   // Clear current question and answer
  //   setAnswer("");
  // };
  // const gotoList = () => {
  //   navigate("/list");
  // };

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 애니메이션 시작
    setAnimate(true);
  }, []);

  return (
    <Flex
      justify='center'
      align='center'
      style={{
        background:
          "linear-gradient(to bottom, rgba(255, 159, 159, 0.8), rgba(255, 237, 191, 0.8) 100%)",
        height: "93vh",
      }}
    >
      <Flex>
        <Flex justify='flex-end' align='center' vertical>
          <Card
            style={{
              width: 500,
              height: 150,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              opacity: 0,
              textAlign: "center",
              fontSize: 16,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 100,
            }}
            className={animate ? "slideUpFadeIn" : ""}
          >
            오늘의 질문이 도착했어요!
            <br />
            종이비행기를 클릭하면 오늘의 질문에 답변할 수 있어요.
          </Card>
          <Image src='/images/paperAirplane.png' width={500} preview={true} />
        </Flex>
      </Flex>

      {/*
        <Flex
          style={{
            backgroundImage: `url(/images/paper.png)`,
            display: "flex",
            alignItems: "center", // 세로 중앙 정렬
            justifyContent: "center", // 가로 중앙 정렬
            backgroundSize: "cover", // 이미지가 Flex 영역을 완전히 커버하도록 설정
            width: "560px", // 이미지의 실제 너비
            height: "720px", // 이미지의 실제 높이
          }}
        >
          HI
        </Flex> */}
      {/* {isFolded ? (
          <div>
            <Image
              preview={false}
              src='/images/paperAirplane.png'
              onClick={handleImageClick}
              style={{
                cursor: "pointer",
                width: 500,
              }}
            />
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
            }}
          >
            <Image
              preview={false}
              src='/images/펼친쪽지.png'
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
                placeholder='답변을 입력하세요'
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                style={{
                  width: "350px",
                  marginLeft: "50px",
                  marginTop: "50px",
                }}
              />
              <Button
                type='primary'
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
        )} */}
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
    </Flex>
  );
};

export default TodayList;
