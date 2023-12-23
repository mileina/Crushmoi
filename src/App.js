import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulaire from './Formulaire';
import Invitation from './invitation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Formulaire />} />
        <Route path="/invitation/:id" element={<Invitation />} />
      </Routes>
    </Router>
  );
}

export default App;
