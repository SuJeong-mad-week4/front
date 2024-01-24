import {
  Button,
  Card,
  Image,
  Input,
  Flex,
  Typography,
  List,
  Divider,
  Skeleton,
} from "antd";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "./TodayList.css";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

import { UserContext } from "../App";
const { Text } = Typography;

const TodayList = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedQusetion, setSelectedQuestion] = useState(null);

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      setData([]);
      const response = await axios.get(
        `http://143.248.196.134:8080/today/get?userId=${user.id}`
      );
      setData([...data, ...response.data]);
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    loadMoreData();
    console.log("명상ㅋㅋ");
  }, []);

  const onSelectToday = async (item) => {
    console.log("item임둥", item);
    try {
      const response = await axios.get(
        `http://143.248.196.134:8080/today/find?todayId=${item.id}`
      );
      console.log("selectDate", response.data);
      setSelectedQuestion(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Flex
        style={{
          backgroundImage: `url(/images/notebook.png)`,
          display: "flex",
          backgroundSize: "cover",
          width: "900px",
          height: "800px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Flex style={{ width: 300, height: 480 }}>
          <Flex vertical gap={10} style={{ textAlign: "center" }}>
            <div
              style={{ fontSize: 20, color: "rgb(255, 159, 159)", margin: 10 }}
            >
              질문 목록
            </div>
            <div
              id='scrollableDiv'
              style={{
                width: 250,
                height: 450,
                overflow: "auto",
                paddingLeft: 10,
                paddingRight: 40,
              }}
            >
              <InfiniteScroll
                dataLength={data.length}
                next={loadMoreData}
                hasMore={data.length < 5}
                loader={
                  <Skeleton
                    paragraph={{
                      rows: 1,
                    }}
                    active
                  />
                }
                scrollableTarget='scrollableDiv'
              >
                <List
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      onClick={() => {
                        onSelectToday(item);
                      }}
                    >
                      <div>{item.question}</div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </Flex>
        </Flex>
        <Flex style={{ width: 300, height: 480, paddingLeft: 100 }}>
          {selectedQusetion ? (
            <Flex vertical gap={10}>
              <Text>{selectedQusetion.question}</Text>
              <Text>{selectedQusetion.answer}</Text>
              <Text>{selectedQusetion.todayDate}</Text>
            </Flex>
          ) : (
            <Text>보고 싶은 질문을 클릭해주세요.</Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TodayList;
