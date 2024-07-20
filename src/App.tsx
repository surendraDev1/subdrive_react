import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import HostCar from './components/hostCar/hostCar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host-car" element={<HostCar />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;