import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/chat-page/ChatPage.jsx';
import './App.css';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/*" element={<Home socket={socket}/>}></Route>
        <Route path="Chat" element={<ChatPage socket={socket}/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
