import { Button, Card, Image, Input, Flex, Typography } from "antd";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "./TodayAnswer.css";
import { UserContext } from "../App";
import axios from "axios";

const { Text } = Typography;

const TodayQA = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const [alreadyAnswered, setAlreadyAnswered] = useState(false);
  const [answerShow, setAnswerShow] = useState(false);

  function formatDate(year, month, date) {
    // 월과 일을 두 자리 숫자로 만듭니다. 예: 5 -> 05
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDate = date.toString().padStart(2, "0");

    // 문자열을 조합하여 반환합니다.
    return `${year}-${formattedMonth}-${formattedDate}`;
  }
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const today = new Date(); // 현재 날짜와 시간을 생성합니다.

    const today_year = today.getFullYear(); // 현재 연도를 얻습니다.
    const today_month = today.getMonth() + 1; // 월을 얻습니다. 주의: getMonth()는 0부터 시작하기 때문에 1을 더해야 합니다.
    const today_day = today.getDate(); // 일을 얻습니다.

    const formatedToday = formatDate(today_year, today_month, today_day);

    // 비동기 요청을 수행하는 함수
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://143.248.196.134:8080/today/get-today?userId=${user.id}&todayDate=${formatedToday}`
          );
          console.log("todayㅎ", response.data);
          if (response.data) {
            setAlreadyAnswered(response.data.success);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [user]);

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
      {answerShow ? (
        <Flex
        style={{
          backgroundImage: `url(./images/paper.png)`,
          display: "flex",
          alignItems: "center", // 세로 중앙 정렬
          justifyContent: "center", // 가로 중앙 정렬
          backgroundSize: "cover", // 이미지가 Flex 영역을 완전히 커버하도록 설정
          width: "560px", // 이미지의 실제 너비
          height: "720px", // 이미지의 실제 높이
        }}
      >
        HI
      </Flex>
      ) : (
        <Flex>
          {alreadyAnswered ? (
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
                오늘의 질문을 이미 답변했어요.
                <br />
                다음날 다시 날라오는 종이비행기를 기다려주세요.
              </Card>
            </Flex>
          ) : (
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
              <Image
                src='./images/airplane.png'
                width={500}
                preview={false}
                onClick={() => {
                  setAnswerShow(true);
                }}
              />
            </Flex>
          )}
        </Flex>
      )}

      {/*
        <Flex
          style={{
            backgroundImage: `url(./images/paper.png)`,
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
              src='./images/airplane.png'
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
              src='./images/펼친쪽지.png'
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

export default TodayQA;
