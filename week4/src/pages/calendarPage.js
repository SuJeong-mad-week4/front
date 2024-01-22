import { Flex } from "antd";
import React from "react";
import Calendar from "../components/calendar";

const CalendarPage = () => {
  return (
    <Flex
      justify="center"
      align="center"
      style={{
        background: "linear-gradient(to bottom, #ff9f9f, #ffedbf 100%)",
      }}
    >
      <Calendar year={2024} month={1} />
    </Flex>
  );
};

export default CalendarPage;
