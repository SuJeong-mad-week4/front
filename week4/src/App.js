import React, { createContext, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import CalendarPage from "./pages/calendarPage";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  console.log(user)

  useEffect(()=> {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if(user){
      console.log("저장해여",user)
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <Router>
      <div>
      <UserContext.Provider value={{ user, setUser }}>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/mood-calendar" element={<MoodCalendar />} /> */}
          {/* <Route path="/pet-care" element={<PetCare />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;