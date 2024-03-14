import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
// import ChatPage from './chat-page/ChatPage';
import './App.css';

function App() {
  return (
    <Router >
      <Routes>
        <Route path="/*" element={<Home />} />
        {/* <Route path="Chat" element={<ChatPage />} /> */}
      </Routes>
    </Router>
  )
}

export default App
