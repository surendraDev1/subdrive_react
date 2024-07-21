import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Car {
  id: number;
  make: string;
  model: string;
  address: string;
  distance: number;
}

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userLocation = searchParams.get('location');
    const carType = searchParams.get('type');

    // Call backend API to get nearby cars
    fetch(`/api/cars?location=${userLocation}&type=${carType}`)
      .then(response => response.json())
      .then(data => setCars(data));
  }, [location]);

  return (
    <div>
      <h2>Available Cars Near You</h2>
      <ul>
        {cars.map(car => (
          <li key={car.id}>
            {car.make} {car.model} - {car.distance.toFixed(2)} km away
            <p>Address: {car.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;