import {
  Button,
  Calendar,
  Card,
  Flex,
  Image,
  Input,
  Modal,
  Space,
  Typography,
} from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import "./calendar.css";

const { TextArea } = Input;
const { Text, Title } = Typography;

const CustomCalendar = () => {
  const [change, setChange] = useState(false);
  const [mood, setMood] = useState(null);
  const [listData, setListData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMoodOpen, setIsMoodOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMood, setSelectedMood] = useState(null);

  const [addShow, setAddShow] = useState(true);

  const [content, setContent] = useState(null);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showMood = async (date, { source }) => {
    setSelectedDate(formatDate(date.year(), date.month() + 1, date.date()));

    const response = await axios.get(
      `http://143.248.196.72:8080/calendar/get?userId=${user.id}&moodDate=${
        formatDate(date.year(), date.month() + 1, date.date()) +
        "T00:00:00.000Z"
      }`
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
      await axios.post(`http://143.248.196.72:8080/calendar/create`, {
        userId: user.id,
        moodDate: formatedToday + "T00:00:00.000Z",
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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    // 비동기 요청을 수행하는 함수
    const fetchData = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `http://143.248.196.72:8080/calendar?userId=${user.id}`
          );
          console.log(response.data, user.id);
          setListData(response.data); // 데이터를 상태에 저장
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user, change]);

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
      <ul className='events'>
        {listData.map((item) =>
          formatedDate === item.moodDate.substring(0, 10) ? (
            <Image
              key={item.id}
              onClick={() => console.log(item.mood)}
              width={55}
              src={`./images/${item.mood}.png`}
              preview={false}
            />
          ) : null
        )}
      </ul>
    );
  };

  const formatedToday = formatDate(today_year, today_month, today_day);

  useEffect(() => {
    try {
      axios.get(
        `http://143.248.196.72:8080/calendar/get?userId=${user.id}&moodDate=${
          formatedToday + "T00:00:00.000Z"
        }`
      );
      setAddShow(false);
    } catch (error) {
      console.log(error);
      setAddShow(true);
    }
  }, [today_day]);

  return (
    <>
      <Flex vertical align='center'>
          <Button disabled onClick={showModal} style={{ width: 100, marginLeft: "90%" }}
           >
            추가하기
          </Button>
        <Modal
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
                  src='./images/행복.png'
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
                  src='./images/짜증.png'
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
                  src='./images/분노.png'
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
                  src='./images/두려움.png'
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
                  src='./images/슬픔.png'
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
                  src='./images/우울.png'
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
        <Modal
          okText='감정 쓰레기 통으로'
          cancelText='취소'
          title={`${formatedToday}의 기분 기록`}
          open={isMoodOpen}
          onOk={handleMoodOk}
          onCancel={handleMoodCancel}
        >
          {selectedMood ? (
            <Flex vertical>
              <Image
                width={100}
                src={`./images/${selectedMood.mood}.png`}
                preview={false}
              />
              <p>{selectedMood.content}</p>
            </Flex>
          ) : null}
        </Modal>
        <Card style={{ width: "80%" }}>
          <Calendar
            cellRender={dateCellRender}
            onSelect={(date, { source }) => {
              showMood(date, { source });
            }}
          />
          ;
        </Card>
      </Flex>
    </>
  );
};

export default CustomCalendar;
