import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/profile'
import { useState, useEffect } from 'react'
import Navbar from './pages/Navbar'
import UserHome from './pages/UserHome'
import Checkup from './pages/Checkup'
import Result from './pages/Result' 
import Chart from './pages/Chart'
import About from './pages/About'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chart/:username" element={<Chart />} />
        <Route path="/:username" element={<UserHome />} />
        <Route path="/checkup/:username" element={<Checkup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/result/:username" element={<Result />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App