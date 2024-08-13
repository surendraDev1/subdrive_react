import React from 'react';

const HowItWorks: React.FC = () => {
    return (
        <div className="how-it-works" style={{ padding: '40px 20px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '32px', color: '#333' }}>How SubDrive Works</h2>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#111' }}>1. Find Your Car</h3>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>
                        Browse our extensive list of vehicles to find the one that suits your needs. Filter by make, model, location, and more.
                    </p>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#111' }}>2. Book Your Ride</h3>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>
                        Select your preferred dates, review the pricing options, and book your car directly through our secure platform.
                    </p>
                </div>
                <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#111' }}>3. Drive & Enjoy</h3>
                    <p style={{ color: '#555', lineHeight: '1.6' }}>
                        Pick up the car at the agreed location and enjoy your ride. Our support team is always here to help if you need anything.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
