import {
  Button,
  Calendar,
  Card,
  Flex,
  Image,
  Input,
  Modal,
  Progress,
  Space,
  Typography,
} from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import "./calendar.css";

const { TextArea } = Input;
const { Text, Title } = Typography;

const CalendarPage = () => {
  const [change, setChange] = useState(false);
  const [mood, setMood] = useState(null);
  const [listData, setListData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);
  const [moodSummary, setMoodSummary] = useState([
    { mood: "행복", percentage: 0 },
    { mood: "짜증", percentage: 0 },
    { mood: "분노", percentage: 0 },
    { mood: "두려움", percentage: 0 },
    { mood: "슬픔", percentage: 0 },
    { mood: "우울", percentage: 0 },
  ]);

  const [addShow, setAddShow] = useState(true);

  const [content, setContent] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showMood = async (date, { source }) => {
    const response = await axios.get(
      `http://143.248.196.70:8080/calendar/get?userId=${
        user.id
      }&moodDate=${formatDate(date.year(), date.month() + 1, date.date())}`
    );
    if (response.data) {
      setIsMoodOpen(true);
      setSelectedMood(response.data);
    }
  };

  const handleOk = async () => {
    if (!mood || !content) {
      alert("모든 항목을 입력해주세요.");
      return;
    }
    try {
      await axios.post(`http://143.248.196.70:8080/calendar/create`, {
        userId: user.id,
        moodDate: formatedToday,
        mood: mood,
        content: content,
      });
    } catch (error) {
      console.log(error);
    }
    setIsModalOpen(false);
    setChange(!change);
  };

  const handleMoodOk = () => {
    const deleteMood = async () => {
      try {
        await axios.post(`http://143.248.196.70:8080/calendar/delete`, {
          userId: user.id,
          moodDate: selectedMood.moodDate,
        });
      } catch (error) {
        console.log(error);
      }
    };
    deleteMood();
    setIsMoodOpen(false);
  };

  const handleCancel = () => {
    setMood(null);
    setContent(null);
    setIsModalOpen(false);
  };

  const handleMoodCancel = () => {
    setIsMoodOpen(false);
  };
  const { user, setUser } = useContext(UserContext);

  const today = new Date(); // 현재 날짜와 시간을 생성합니다.

  const today_year = today.getFullYear(); // 현재 연도를 얻습니다.
  const today_month = today.getMonth() + 1; // 월을 얻습니다. 주의: getMonth()는 0부터 시작하기 때문에 1을 더해야 합니다.
  const today_day = today.getDate(); // 일을 얻습니다.

  function formatDate(year, month, date) {
    // 월과 일을 두 자리 숫자로 만듭니다. 예: 5 -> 05
    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDate = date.toString().padStart(2, "0");

    // 문자열을 조합하여 반환합니다.
    return `${year}-${formattedMonth}-${formattedDate}`;
  }

  const dateCellRender = (selectedDay) => {
    // 함수 사용 예시
    const formatedDate = formatDate(
      selectedDay.year(),
      selectedDay.month() + 1,
      selectedDay.date()
    );

    return (
      <Flex justify='center' align='center'>
        {listData.map((item) =>
          formatedDate === item.moodDate.substring(0, 10) ? (
            <Image
              key={item.id}
              width={55}
              src={`/images/${item.mood}.png`}
              preview={false}
            />
          ) : null
        )}
      </Flex>
    );
  };

  const formatedToday = formatDate(today_year, today_month, today_day);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const showMoodSummary = async (date) => {
    if (user) {
      const moodSummary = await axios.get(
        `http://143.248.196.70:8080/calendar/summarize?userId=${
          user.id
        }&moodDate=${formatDate(
          date.year(),
          date.month() + 1,
          date.date()
        ).substring(0, 7)}`
      );
      setMoodSummary(moodSummary.data);
    }
  };

  useEffect(() => {
    // 비동기 요청을 수행하는 함수
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://143.248.196.70:8080/calendar?userId=${user.id}`
          );
          setListData(response.data); // 데이터를 상태에 저장

          // 오늘 날짜의 데이터가 있는지 확인
          const todayData = response.data.find(
            (data) => data.moodDate.substring(0, 10) === formatedToday
          );
          // 상태 업데이트
          setAddShow(!todayData);
          const moodSummary = await axios.get(
            `http://143.248.196.70:8080/calendar/summarize?userId=${
              user.id
            }&moodDate=${formatedToday.substring(0, 7)}`
          );
          setMoodSummary(moodSummary.data);
        } catch (error) {
          console.error("Error fetching data:", error);
          setAddShow(true); // 오류 발생 시 addShow를 true로 설정
        }
      }
    };

    fetchData();
  }, [user, change]);

  useEffect(() => {
    try {
      const { response } = axios.get(
        `http://143.248.196.70:8080/calendar/get?userId=${user.id}&moodDate=${formatedToday}`
      );
      setAddShow(true);
    } catch (error) {
      console.log(error);
      setAddShow(true);
    }
  }, [today_day]);

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
      <Flex gap='middle'>
        <Flex vertical>
          <Modal
            closeIcon={false}
            okText='기록'
            cancelText='취소'
            width={700}
            title={`${formatedToday}의 기분 기록`}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Title level={5}>오늘의 기분은 어떤가요?</Title>
            <Flex horizontal justify='center'>
              <Space>
                <Flex
                  vertical
                  align='center'
                  style={{ opacity: mood === "행복" ? 1 : 0.3 }}
                >
                  <Image
                    width={100}
                    src='/images/행복.png'
                    preview={false}
                    onClick={() => setMood("행복")}
                  />
                  <Text>행복</Text>
                </Flex>
                <Flex
                  vertical
                  align='center'
                  style={{ opacity: mood === "짜증" ? 1 : 0.3 }}
                >
                  <Image
                    width={100}
                    src='/images/짜증.png'
                    preview={false}
                    onClick={() => setMood("짜증")}
                  />
                  <Text>짜증</Text>
                </Flex>
                <Flex
                  vertical
                  align='center'
                  style={{ opacity: mood === "분노" ? 1 : 0.3 }}
                >
                  <Image
                    width={100}
                    src='/images/분노.png'
                    preview={false}
                    onClick={() => setMood("분노")}
                  />
                  <Text>분노</Text>
                </Flex>
                <Flex
                  vertical
                  align='center'
                  style={{ opacity: mood === "두려움" ? 1 : 0.3 }}
                >
                  <Image
                    width={100}
                    src='/images/두려움.png'
                    preview={false}
                    onClick={() => setMood("두려움")}
                  />
                  <Text>두려움</Text>
                </Flex>
                <Flex
                  vertical
                  align='center'
                  style={{ opacity: mood === "슬픔" ? 1 : 0.3 }}
                >
                  <Image
                    width={100}
                    src='/images/슬픔.png'
                    preview={false}
                    onClick={() => setMood("슬픔")}
                  />
                  <Text>슬픔</Text>
                </Flex>
                <Flex
                  vertical
                  align='center'
                  style={{ opacity: mood === "우울" ? 1 : 0.3 }}
                >
                  <Image
                    width={100}
                    src='/images/우울.png'
                    preview={false}
                    onClick={() => setMood("우울")}
                  />
                  <Text>우울</Text>
                </Flex>
              </Space>
            </Flex>

            <Title level={5}>왜 그런 감정이 들었나요?</Title>
            <TextArea
              placeholder='솔직하게 작성해주세요.'
              autoSize={{ minRows: 6 }}
              onChange={(e) => setContent(e.target.value)}
            />
          </Modal>
          {selectedMood ? (
            <Modal
              closeIcon={false}
              okButtonProps={{
                disabled: selectedMood.content ? false : true,
                shape: "round",
              }}
              cancelButtonProps={{ visible: false, shape: "round" }}
              okText='감정 쓰레기 통으로'
              cancelText='취소'
              title={`${selectedMood.moodDate.substring(0, 10)}의 기분 기록`}
              open={isMoodOpen}
              onOk={handleMoodOk}
              onCancel={handleMoodCancel}
            >
              <Flex vertical>
                <Image
                  width={100}
                  src={`/images/${selectedMood.mood}.png`}
                  preview={false}
                />
                <p>
                  {selectedMood.content ? (
                    selectedMood.content
                  ) : (
                    <Text type='secondary'>
                      (감정 쓰레기통에 들어간 일기입니다.)
                    </Text>
                  )}
                </p>
              </Flex>
            </Modal>
          ) : null}
          <Card
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Calendar
              style={{ width: 700, background: "rgba(255, 255, 255, 0.0)" }}
              cellRender={dateCellRender}
              onSelect={(date, { source }) => {
                setSelectedDate(date);
                showMoodSummary(date);
                showMood(date, { source });
              }}
            />
          </Card>
        </Flex>
        <Flex>
          <Card
            title={
              selectedDate
                ? `${selectedDate.month() + 1}월의 통계`
                : `${today_month}월의 통계`
            }
            style={{
              width: 300,
              background: "rgba(255, 255, 255, 0.6)",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Flex vertical gap='small'>
              {moodSummary.map((item, index) => {
                return (
                  <Flex vertical justify='space-between' align='center'>
                    <Text>{item.mood}</Text>
                    <Progress
                      status='active'
                      percent={item.percentage}
                      strokeColor={{ "0%": "#ffc839", "100%": "#ff6666" }}
                    />
                  </Flex>
                );
              })}
              <Card style={{ height: 150, margin: 10 }}>
                {user && moodSummary[0].percentage === 100
                  ? `이 달은 늘 행복하셨군요. Simley는 ${user?.nickname}님이 늘 행복하길 바라요.`
                  : `이 달도 수고 많았어요. Simley는 ${user?.nickname}님이 늘 행복하도록 노력할게요.`}
              </Card>
              {addShow ? (
                <Button
                  block={true}
                  onClick={showModal}
                  style={{
                    color: "white",
                    background: "#ff9f9f",
                    borderRadius: "20px",
                  }}
                  shape='round'
                >
                  추가하기
                </Button>
              ) : (
                <Button
                  block={true}
                  disabled
                  onClick={showModal}
                  style={{
                    color: "white",
                    background: "#ff9f9f",
                    borderRadius: "20px",
                  }}
                  shape='round'
                >
                  추가하기
                </Button>
              )}
            </Flex>
          </Card>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CalendarPage;
