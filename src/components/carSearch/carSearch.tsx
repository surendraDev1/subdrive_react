import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './carSearch.css';

const CarSearch: React.FC = () => {
  const [location, setLocation] = useState('');
  const [carType, setCarType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/cars?location=${location}&type=${carType}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
  };

  return (
    <div className="car-search-container">
      <h1>Find a Car Near You</h1>
      <div className="form-group">
        <input
          id="location"
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          id="carType"
          type="text"
          placeholder="What type of car do you need?"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          id="minPrice"
          type="number"
          placeholder="Minimum price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          id="maxPrice"
          type="number"
          placeholder="Maximum price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
      <button className="search-button" onClick={handleSearch}>Search</button>
    </div>
  );
};

export default CarSearch;
