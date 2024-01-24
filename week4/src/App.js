import React, { createContext, useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import PetCare from "./components/PetCare";
import Signup from "./components/Signup";
import CalendarPage from "./components/calendarPage";
import TodayQA from "./components/TodayQA";
import List from "./components/list";
import { ConfigProvider } from "antd";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  console.log(user);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log("저장해여", user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#ff9f9f",
          borderRadius: 2,
          fontFamily: "NPSfontBold",

          // Alias Token
          colorBgContainer: "#ffffff",
        },
      }}
    >
      <Router>
        <div className='font-apply'>
          <UserContext.Provider value={{ user, setUser }}>
            <Header
              style={{
                overflow: "visible",
              }}
            />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/calendar' element={<CalendarPage />} />
              <Route path='/petcare' element={<PetCare />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/todayQA' element={<TodayQA />} />
              <Route
                path='/'
                element={
                  <TodayQA questions={questions} setQuestions={setQuestions} />
                }
              />
              <Route path='/list' element={<List questions={questions} />} />
            </Routes>
          </UserContext.Provider>
        </div>
      </Router>
    </ConfigProvider>
  );
}

export default App;
