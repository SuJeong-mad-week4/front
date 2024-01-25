import { Flex, List, Skeleton, Typography } from "antd";
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

  const loadMoreData = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://143.248.196.70:8080/today/get?userId=${user.id}`
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

  return (
    <Flex
      justify="center"
      align="center"
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
        <Flex style={{ width: 300, height: 500 }}>
          <div
            id="scrollableDiv"
            style={{
              width: 250,
              height: 400,
              overflow: "auto",
              padding: "0 16px",
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
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <div>{item.question}</div>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Flex>
        <Flex style={{ width: 300, height: 500, paddingLeft: 100 }}>
          zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TodayList;
