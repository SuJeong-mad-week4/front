// import React, { useState } from "react";
// import { Button, Card } from "antd";
// import { getDaysInMonth, getDay, startOfMonth } from "date-fns";

// const Calendar = ({ id, year, month }) => {
//   const [selectedDay, setSelectedDay] = useState(0);

//   const today = new Date(); // 현재 날짜와 시간을 생성합니다.

//   const today_year = today.getFullYear(); // 현재 연도를 얻습니다.
//   const today_month = today.getMonth() + 1; // 월을 얻습니다. 주의: getMonth()는 0부터 시작하기 때문에 1을 더해야 합니다.
//   const today_day = today.getDate(); // 일을 얻습니다.

//   console.log(`오늘 날짜는 ${today_year}년 ${today_month}월 ${today_day}일입니다.`);

//   // Get the total number of days in the month and the first day of the week
//   const daysInMonth = getDaysInMonth(new Date(year, month - 1));
//   const firstDayOfWeek = getDay(startOfMonth(new Date(year, month - 1)));

//   // Calculate the total number of cells needed (including empty cells at the start)
//   const totalCells = firstDayOfWeek + daysInMonth;

//   // Calculate the number of empty cells needed at the end to fill the last week
//   const emptyCellsAtEnd = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);

//   // Function to handle the button click to show the next image
//   const showNextImage = () => {
//     setSelectedDay((prevSelectedDay) => {
//       return prevSelectedDay >= daysInMonth ? 1 : prevSelectedDay + 1;
//     });
//   };

//   // Generate the weekday headers
//   const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
//   const weekdayHeaders = weekdays.map((day) => (
//     <div key={day} style={{ flex: "1 0 14.28%", textAlign: "center" }}>
//       {day}
//     </div>
//   ));

//   // Generate empty divs for days before the first day of the month
//   const emptyStartDays = Array.from({ length: firstDayOfWeek }, (_, index) => (
//     <div key={`empty-start-${index}`} style={{ flex: "1 0 14.28%" }}></div>
//   ));

//   // Generate divs for each day of the month
//   const monthDays = Array.from({ length: daysInMonth }, (_, day) => (
//     <div
//       key={day}
//       style={{
//         flex: "1 0 14.28%",
//         textAlign: "center",
//         width: 150,
//         height: 130,
//       }}
//     >
//       {day + 1}
//       {selectedDay === day + 1 && (
//         <img
//           style={{ width: "100%", paddingTop: "4px" }}
//           src={`./images/home.png`}
//           alt={`Day ${day + 1}`}
//         />
//       )}
//     </div>
//   ));

//   // Generate empty divs for days after the last day of the month to fill the last week
//   const emptyEndDays = Array.from({ length: emptyCellsAtEnd }, (_, index) => (
//     <div key={`empty-end-${index}`} style={{ flex: "1 0 14.28%" }}></div>
//   ));

//   return (
//     <div style={{ margin: "0 auto" }}>
//       <Button onClick={showNextImage} style={{ marginBottom: "16px" }}>
//         Show Next Image
//       </Button>
//       <Card style={{ height: "90%", width: "60%" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "space-between",
//             marginBottom: "5px",
//           }}
//         >
//           {weekdayHeaders}
//         </div>
//         <div style={{ display: "flex", flexWrap: "wrap" }}>
//           {emptyStartDays}
//           {monthDays}
//           {emptyEndDays}
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default Calendar;
import React, { useEffect, useState } from "react";
import { Badge, Calendar, Button, Card, Flex } from "antd";
import axios from "axios";

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
      <ul className='events'>
        {listData.map((item) =>
          formatedDate === item.moodDate.substring(0, 10) ? (
            <Button key={item.id} onClick={()=>console.log("??")}>{item.mood}</Button>
          ) : (
            null
          )
        )}
      </ul>
    );
  };

  return (
    <>
      <Flex vertical>
        <Button onClick={addImageToDate} style={{width:100, marginLeft:"90%"}}>추가하기</Button>
        <Card style={{ width: "80%", height: "60%" }}>
          <Calendar cellRender={dateCellRender} />;
        </Card>
      </Flex>
    </>
  );
};

export default CustomCalendar;
