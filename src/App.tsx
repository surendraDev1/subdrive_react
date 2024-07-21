import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import HostCar from './components/hostCar/hostCar';
import CarSearch from './components/carSearch/carSearch';
import CarList from './components/carList/carList';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host-car" element={<HostCar />} />
          <Route path="/search" element={<CarSearch />} />
          <Route path="/cars" element={<CarList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;