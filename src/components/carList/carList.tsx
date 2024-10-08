import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Car {
  id: number; // Add an ID for identifying the car
  title: string;
  description: string;
  dailyRate: number;
  weeklyRate: number;
  monthlyRate: number;
  availability: string[];
  location: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  features: string[];
  imageUrl: string;
}

const carListings: Car[] = [
  {
    id: 1,
    title: 'Luxury Sedan',
    description: 'A comfortable and stylish sedan perfect for city drives.',
    dailyRate: 100,
    weeklyRate: 600,
    monthlyRate: 2200,
    availability: ['2024-08-01', '2024-08-15', '2024-09-01'],
    location: 'Downtown',
    make: 'Mercedes-Benz',
    model: 'E-Class',
    year: 2022,
    color: 'Black',
    vin: '1HGCM82633A123456',
    mileage: 12000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    features: ['GPS', 'Bluetooth', 'Child seat'],
    imageUrl: 'https://example.com/luxury-sedan.jpg',
  },
  {
    id: 2,
    title: 'Compact SUV',
    description: 'A versatile SUV for all your family trips.',
    dailyRate: 80,
    weeklyRate: 500,
    monthlyRate: 1800,
    availability: ['2024-08-05', '2024-08-20', '2024-09-10'],
    location: 'Airport',
    make: 'Toyota',
    model: 'RAV4',
    year: 2021,
    color: 'White',
    vin: '2T3ZFREV1JW123456',
    mileage: 15000,
    transmission: 'Automatic',
    fuelType: 'Hybrid',
    features: ['GPS', 'Bluetooth'],
    imageUrl: 'https://example.com/compact-suv.jpg',
  },
  {
    id: 3,
    title: 'Economy Car',
    description: 'A fuel-efficient car that is easy on the pocket.',
    dailyRate: 50,
    weeklyRate: 300,
    monthlyRate: 1000,
    availability: ['2024-08-10', '2024-08-25', '2024-09-15'],
    location: 'Uptown',
    make: 'Honda',
    model: 'Civic',
    year: 2020,
    color: 'Blue',
    vin: '19XFC2F69LE123456',
    mileage: 18000,
    transmission: 'Manual',
    fuelType: 'Diesel',
    features: ['Bluetooth'],
    imageUrl: 'https://example.com/economy-car.jpg',
  },
];

const CarList: React.FC = () => {
  const navigate = useNavigate();

  const handleRowClick = (carId: number) => {
    navigate(`/car-details/${carId}`);
  };

  return (
    <div className="car-listings-container">
      <h1>Available Car Listings</h1>
      <table className="car-listings-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Daily Rate</th>
            <th>Weekly Rate</th>
            <th>Monthly Rate</th>
            <th>Availability</th>
            <th>Location</th>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Color</th>
            <th>VIN</th>
            <th>Mileage</th>
            <th>Transmission</th>
            <th>Fuel Type</th>
            <th>Features</th>
          </tr>
        </thead>
        <tbody>
          {carListings.map((car) => (
            <tr key={car.id} onClick={() => handleRowClick(car.id)} style={{ cursor: 'pointer' }}>
              <td><img src={car.imageUrl} alt={car.title} className="car-image" /></td>
              <td>{car.title}</td>
              <td>{car.description}</td>
              <td>${car.dailyRate}/day</td>
              <td>${car.weeklyRate}/week</td>
              <td>${car.monthlyRate}/month</td>
              <td>{car.availability.join(', ')}</td>
              <td>{car.location}</td>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>{car.color}</td>
              <td>{car.vin}</td>
              <td>{car.mileage} miles</td>
              <td>{car.transmission}</td>
              <td>{car.fuelType}</td>
              <td>{car.features.join(', ')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CarList;
