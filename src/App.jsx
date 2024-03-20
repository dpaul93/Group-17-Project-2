import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ChatPage from './components/chat-page/ChatPage.jsx';
import './App.css';
import socketIO from 'socket.io-client';
const socket = socketIO.connect('https://calm-scrubland-96218-01850c0a6077.herokuapp.com/');

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
