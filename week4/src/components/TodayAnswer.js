import { Alert, Button, Card, Flex, Image, Input, Typography } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import { UserContext } from "../App";
import "./TodayAnswer.css";

const { Text } = Typography;

const { TextArea } = Input;

const questionList = [
  "당신의 장점 세가지는 무엇인가요?",
  "오늘의 소확행은 무엇이 있었나요?",
  "오늘의 감사한 일은 무엇인가요?",
  "인생에서 가장 행복했던 기억을 하나 공유해주세요.",
  "당신이 사랑받는다고 느낄 때는 언제인가요?",
  "가장 최근 감사인사를 받은 때는 언제인가요?",
  "당신이 가장 좋아하는 문구는 무엇인가요?",
];

const TodayQA = () => {
  const { user, setUser } = useContext(UserContext);
  const [selectedQusetion, setSelectedQuestion] = useState(null);
  const [formatedToday, setFormatedToday] = useState(null);
  const [answer, setAnswer] = useState("");
  const seedrandom = require("seedrandom"); // 라이브러리를 불러옵니다.
  const [saved, setSaved] = useState(false);

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

    setFormatedToday(formatDate(today_year, today_month, today_day));

    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://143.248.196.70:8080/today/get-today?userId=${user.id}&todayDate=${formatedToday}`
          );
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

  useEffect(() => {
    const random = seedrandom(formatedToday);
    // 랜덤으로 질문을 선택합니다.
    const randomIndex = Math.floor(random() * questionList.length);
    setSelectedQuestion(questionList[randomIndex]);
  }, [formatedToday]);

  const onAnswerSave = async () => {
    try {
      const response = await axios.post(
        `http://143.248.196.70:8080/today/create`,
        {
          userId: user.id,
          question: selectedQusetion,
          answer: answer,
          todayDate: formatedToday,
        }
      );
      console.log("", response.data);
      setSaved(true);
      setTimeout(() => {
        window.location.href = "/today/answer"; // 또는 원하는 경로로 변경
      }, 1000); // 1000 밀리초(1초)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {saved ? (
        <Alert
          closable
          style={{
            display: "flex",
            justifyContent: "center", // 수직 가운데 정렬
            alignItems: "center", // 수평 가운데 정렬
            width: 500,
            height: 100,
            position: "fixed",
            top: "15%",
            left: "50%",
            borderRadius: 20,
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
            textAlign: "center",
            fontSize: 16,
            margin: "auto",
            transform: "translate(-50%, -50%)",
            background: "rgba(255, 237, 191, 0.8)",
          }}
          type="success"
          description="오늘의 질문이 저장되었습니다."
          banner
        />
      ) : null}

      <Flex
        justify="center"
        align="center"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255, 159, 159, 0.8), rgba(255, 237, 191, 0.8) 100%)",
          height: "93vh",
        }}
      >
        {answerShow ? (
          <Flex
            vertical
            style={{
              backgroundImage: `url(/images/paper.png)`,
              display: "flex",
              backgroundSize: "cover",
              width: "330px",
              height: "500px",
              paddingLeft: 120,
              paddingRight: 100,
              paddingTop: 100,
              paddingBottom: 100,
              alignContent: "flex-start",
            }}
          >
            <Text
              style={{
                whiteSpace: "pre-wrap", // 텍스트 줄바꿈을 활성화합니다.
                wordWrap: "break-word", // 긴 단어가 컨테이너를 넘어갈 때 줄바꿈을 유지합니다.
                overflow: "hidden", // Hide overflowing text
                textOverflow: "ellipsis",
                fontSize: 16,
              }}
            >
              Q. {selectedQusetion}
            </Text>
            <TextArea
              style={{
                marginTop: 20,
                marginBottom: 20,
                borderRadius: 10,
                background: "transparent",
              }}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="당신의 답을 적어주세요."
              autoSize={{ minRows: 18 }}
            />
            <Button
              block={true}
              style={{
                color: "white",
                background: "#ff9f9f",
              }}
              shape="round"
              onClick={onAnswerSave}
            >
              저장하기
            </Button>
          </Flex>
        ) : (
          <Flex>
            {alreadyAnswered ? (
              <Flex justify="flex-end" align="center" vertical>
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
                  다음날 다시 날아오는 종이비행기를 기다려주세요.
                </Card>
                <Image
                  src="/images/paperAirplane.png"
                  width={500}
                  preview={false}
                  style={{
                    // 금지
                    cursor: "not-allowed",
                    opacity: "0.4",
                  }}
                />
              </Flex>
            ) : (
              <Flex justify="flex-end" align="center" vertical>
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
                  src="/images/paperAirplane.png"
                  width={500}
                  preview={false}
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setAnswerShow(true);
                    setSaved(false);
                  }}
                />
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default TodayQA;
