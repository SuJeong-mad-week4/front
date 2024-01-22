import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import MoodCalendar from './components/MoodCalendar'; // Import MoodCalendar component
import PetCare from './components/PetCare'; // Import PetCare component
import Profile from './components/Profile';
import Signup from './components/Signup';
import CalendarPage from "./pages/calendarPage";

function App() {
  return (
    <Router>
      <div>
        {/* 헤더 */}
        <Header/>
        {/* 페이지 내용 */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/mood-calendar" element={<MoodCalendar />} /> */}
          {/* <Route path="/pet-care" element={<PetCare />} /> */}
          {/* <Route path="/profile" element={<Profile />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;