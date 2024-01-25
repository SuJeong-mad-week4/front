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

const { TextArea } = Input;
const { Text, Title } = Typography;

const CustomCalendar = () => {
  const [mood, setMood] = useState(null);
  const [listData, setListData] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
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
            `http://143.248.196.70:8080/calendar?userId=${user.id}`
          );
          setListData(response.data); // 데이터를 상태에 저장
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user]);

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
      <ul className="events">
        {listData.map((item) =>
          formatedDate === item.moodDate ? (
            <Button key={item.id}>
              {item.mood}
            </Button>
          ) : null
        )}
      </ul>
    );
  };

  const formatedToday = formatDate(today_year, today_month, today_day);
  return (
    <>
      <Flex vertical align="center">
        <Button onClick={showModal} style={{ width: 100, marginLeft: "90%" }}>
          추가하기
        </Button>
        <Modal
          width={1000}
          title={`${formatedToday}의 기분`}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Title level={5}>오늘의 기분은 어떤가요?</Title>
          <Flex justify="center">
            <Space>
              <Flex vertical align="center">
                <Image
                  width={100}
                  src="/images/tmp2.png"
                  preview={false}
                  onClick={() => setMood("행복")}
                />
                <Text>행복</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={100}
                  src="/images/tmp2.png"
                  preview={false}
                  onClick={() => setMood("슬픔")}
                />
                <Text>슬픔</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={100}
                  src="/images/tmp2.png"
                  preview={false}
                  onClick={() => setMood("짜증")}
                />
                <Text>짜증</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={100}
                  src="/images/tmp2.png"
                  preview={false}
                  onClick={() => setMood("분노")}
                />
                <Text>분노</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={100}
                  src="/images/tmp2.png"
                  preview={false}
                  onClick={() => setMood("두려움")}
                />
                <Text>두려움</Text>
              </Flex>
              <Flex vertical align="center">
                <Image
                  width={100}
                  src="/images/tmp2.png"
                  preview={false}
                  onClick={() => setMood("우울")}
                />
                <Text>우울</Text>
              </Flex>
            </Space>
          </Flex>

          <Title level={5}>왜 그런 감정이 들었나요?</Title>
          <TextArea
            placeholder="솔직하게 작성해주세요."
            autoSize={{ minRows: 6 }}
          />
        </Modal>
        <Card style={{ width: "80%", height: "60%" }}>
          <Calendar cellRender={dateCellRender} />;
        </Card>
      </Flex>
    </>
  );
};

export default CustomCalendar;
