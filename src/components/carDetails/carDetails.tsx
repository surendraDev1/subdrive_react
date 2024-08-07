import React from 'react';
import { useParams } from 'react-router-dom';

interface Car {
  id: number;
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

const CarDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const carId = parseInt(id || '0', 10);
  const car = carListings.find(car => car.id === carId);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <div className="car-details-container">
      <h1>{car.title}</h1>
      <img src={car.imageUrl} alt={car.title} className="car-details-image" />
      <p><strong>Description:</strong> {car.description}</p>
      <p><strong>Daily Rate:</strong> ${car.dailyRate}</p>
      <p><strong>Weekly Rate:</strong> ${car.weeklyRate}</p>
      <p><strong>Monthly Rate:</strong> ${car.monthlyRate}</p>
      <p><strong>Availability:</strong> {car.availability.join(', ')}</p>
      <p><strong>Location:</strong> {car.location}</p>
      <p><strong>Make:</strong> {car.make}</p>
      <p><strong>Model:</strong> {car.model}</p>
      <p><strong>Year:</strong> {car.year}</p>
      <p><strong>Color:</strong> {car.color}</p>
      <p><strong>VIN:</strong> {car.vin}</p>
      <p><strong>Mileage:</strong> {car.mileage} miles</p>
      <p><strong>Transmission:</strong> {car.transmission}</p>
      <p><strong>Fuel Type:</strong> {car.fuelType}</p>
      <p><strong>Features:</strong> {car.features.join(', ')}</p>
    </div>
  );
};

export default CarDetails;
