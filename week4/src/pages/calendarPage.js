import { Button, Flex } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/calendar";

const CalendarPage = () => {
  return (
    <Flex justify='center' align='center'>
      <Calendar year={2024} month={1} />
    </Flex>
  );
};

export default CalendarPage;
