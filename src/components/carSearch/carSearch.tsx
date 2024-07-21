import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './carSearch.css';

const CarSearch: React.FC = () => {
  const [location, setLocation] = useState('');
  const [carType, setCarType] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/cars?location=${location}&type=${carType}`);
  };

  return (
    <div className="car-search-container">
      <h1>Find a Car Near You</h1>
      <div className="form-group">
        <input
          id="carType"
          type="text"
          placeholder="what type of car you need?"
          onChange={(e) => setCarType(e.target.value)}
        />
      </div>
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CarSearch;
