import React from 'react';

const FeaturedCars: React.FC = () => {
    const cars = [
        {
            id: 1,
            name: 'Tesla Model S',
            imageUrl: 'assets/7d00838f-8c8d-4f26-bbd7-4dafc3c40534.jpg',
            price: '$150/day',
            description: 'Experience the future with this high-performance electric sedan.',
        },
        {
            id: 2,
            name: 'BMW 3 Series',
            imageUrl: 'assets/7d00838f-8c8d-4f26-bbd7-4dafc3c40534.jpg',
            price: '$120/day',
            description: 'Luxury and performance in a compact sedan.',
        },
        {
            id: 3,
            name: 'Audi Q7',
            imageUrl: 'assets/7d00838f-8c8d-4f26-bbd7-4dafc3c40534.jpg',
            price: '$200/day',
            description: 'A spacious SUV with premium comfort and safety features.',
        },
    ];

    return (
        <div className="featured-cars" style={{ padding: '40px 20px', backgroundColor: '#fff' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: '#333' }}>Featured Cars</h2>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {cars.map((car) => (
                    <div key={car.id} style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <img src={car.imageUrl} alt={car.name} style={{ width: '100%', borderRadius: '8px' }} />
                        <h3 style={{ fontSize: '20px', marginTop: '15px', color: '#111' }}>{car.name}</h3>
                        <p style={{ color: '#777', marginBottom: '10px' }}>{car.price}</p>
                        <p style={{ color: '#555', lineHeight: '1.6' }}>{car.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCars;
