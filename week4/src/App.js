import React, { createContext, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div>
      <UserContext.Provider value={{ user, setUser }}>
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
        </Routes>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;