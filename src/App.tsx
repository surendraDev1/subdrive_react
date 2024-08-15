import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import HostCar from './components/hostCar/hostCar';
import CarSearch from './components/carSearch/carSearch';
import CarList from './components/carList/carList';
import ListingManagementDashboard from './components/listingCarManagement/listingCarManagement';
import MyAccountPage from './components/myAccount/myAccount';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/host-car" element={<HostCar />} />
          <Route path="/search" element={<CarSearch />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/carListingDashBoard" element={<ListingManagementDashboard />} />
          <Route path="/myAccount" element={<MyAccountPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
