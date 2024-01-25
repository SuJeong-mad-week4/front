import { Flex, List, Skeleton, Typography, Divider, Image } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import "./TodayList.css";

import { UserContext } from "../App";
const { Text } = Typography;

const TodayList = () => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [selectedQusetion, setSelectedQuestion] = useState(null);

  const loadMoreData = async () => {
    console.log("?", user);
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      if (user) {
        const response = await axios.get(
          `http://143.248.196.70:8080/today/get?userId=${user.id}`
        );
        setData([...data, ...response.data]);
        setLoading(false);
      }
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
  }, []);

  useEffect(() => {
    if (user) {
      console.log("");
      loadMoreData();
    }
  }, [user]);

  const onSelectToday = async (item) => {
    try {
      const response = await axios.get(
        `http://143.248.196.70:8080/today/find?todayId=${item.id}`
      );
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
                next={{ loadMoreData }}
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
                      <Flex style={{ textAlign: "start" }}>
                        {item.question}
                      </Flex>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
            </div>
          </Flex>
        </Flex>
        <Flex style={{ width: 300, height: 480, paddingLeft: 100 }}>
          {selectedQusetion ? (
            <Flex vertical gap={10} style={{ width: 300, height: 480 }}>
              <Flex style={{ height: 30, marginTop: 10, marginBottom: 10 }}>
                <Text style={{ fontSize: 20 }}>
                  {selectedQusetion.question}
                </Text>
              </Flex>
              <Divider style={{ margin: 0 }} />
              <Flex style={{ height: 400 }}>
                <Text style={{ fontSize: 16 }}>{selectedQusetion.answer}</Text>
              </Flex>
              <Divider style={{ margin: 0 }} />
              <Text
                style={{
                  fontSize: 10,
                  display: "flex",
                  justifyItems: "flex-end",
                  alignSelf: "flex-end",
                  justifySelf: "flex-end",
                }}
              >
                {selectedQusetion.todayDate}
              </Text>
            </Flex>
          ) : (
            <>
              <Text style={{ fontSize: 20, paddingTop: 200 }}>
                보고 싶은 질문을 클릭해주세요!
              </Text>
              <Image
                width={100}
                src='/images/행복.png'
                preview={false}
              />
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TodayList;
