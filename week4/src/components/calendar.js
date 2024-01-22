import { Button, Calendar, Card, Flex } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    // 비동기 요청을 수행하는 함수
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://143.248.196.22:8080/calendar?userId=${0}`
        );
        setListData(response.data); // 데이터를 상태에 저장
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const today = new Date(); // 현재 날짜와 시간을 생성합니다.

  const today_year = today.getFullYear(); // 현재 연도를 얻습니다.
  const today_month = today.getMonth() + 1; // 월을 얻습니다. 주의: getMonth()는 0부터 시작하기 때문에 1을 더해야 합니다.
  const today_day = today.getDate(); // 일을 얻습니다.

  const addImageToDate = () => {
    listData.push({
      id: listData.length,
      mood: "😀",
      moodDate: "2024-01-24",
      userId: 0,
    });
    setSelectedDate(new Date()); // 현재 날짜를 선택 (이 부분은 필요에 따라 수정)
  };
  const dateCellRender = (selectedDay) => {
    function formatDate(year, month, date) {
      // 월과 일을 두 자리 숫자로 만듭니다. 예: 5 -> 05
      const formattedMonth = month.toString().padStart(2, "0");
      const formattedDate = date.toString().padStart(2, "0");

      // 문자열을 조합하여 반환합니다.
      return `${year}-${formattedMonth}-${formattedDate}`;
    }

    // 함수 사용 예시
    const formatedDate = formatDate(
      selectedDay.year(),
      selectedDay.month() + 1,
      selectedDay.date()
    );

    return (
      <ul className="events">
        {listData.map((item) =>
          formatedDate === item.moodDate.substring(0, 10) ? (
            <Button key={item.id} onClick={() => console.log("??")}>
              {item.mood}
            </Button>
          ) : null
        )}
      </ul>
    );
  };

  return (
    <>
      <Flex vertical>
        <Button
          onClick={addImageToDate}
          style={{ width: 100, marginLeft: "90%" }}
        >
          추가하기
        </Button>
        <Card style={{ width: "80%", height: "60%" }}>
          <Calendar cellRender={dateCellRender} />;
        </Card>
      </Flex>
    </>
  );
};

export default CustomCalendar;
