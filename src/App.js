import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';

import './App.css'

function App() {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
      </Router>
  );
}

export default App;
