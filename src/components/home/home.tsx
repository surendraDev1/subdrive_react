import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import CarSearch from '../carSearch/carSearch';
import './home.css';
import HowItWorks from '../howItWorks/howItWorks';
import Footer from '../footer/footer';
import FeaturedCars from '../featuredCars/featuredCars';

interface HeaderProps {
    keycloak: Keycloak | null;
    handleButtonClick: () => void;
    handleHostCarClick: () => void;
    carListingManagement: () => void;
    handleMyAccoungtClick: () => void;
}

interface HeroSectionProps {
    searchParams: {
        where: string;
        fromDate: string;
        fromTime: string;
        untilDate: string;
        untilTime: string;
    };
    setSearchParams: (params: any) => void;
    handleSearch: () => void;
}

interface LocationInfoProps {
    location: { latitude: number; longitude: number } | null;
}

interface UserWelcomeProps {
    keycloak: Keycloak | null;
}

const Home: React.FC = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const nav = useNavigate();

    const [searchParams, setSearchParams] = useState({
        where: '',
        fromDate: '08/15/2024',
        fromTime: '10:00 AM',
        untilDate: '08/18/2024',
        untilTime: '10:00 AM'
    });

    useEffect(() => {
        const initKeycloak = new Keycloak({
            url: 'YOUR_KEYCLOAK_URL',
            realm: 'YOUR_REALM',
            clientId: 'YOUR_CLIENT_ID'
        });
    
        initKeycloak.init({ onLoad: 'check-sso' })
            .then(authenticated => {
                setKeycloak(initKeycloak);
                if (authenticated) {
                    console.log('User is authenticated');
                } else {
                    console.log('User is not authenticated');
                }
            })
            .catch(error => {
                console.error('Keycloak initialization error:', error);
            });

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    sendLocationToBackend(latitude, longitude);
                },
                error => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    const sendLocationToBackend = async (latitude: number, longitude: number) => {
        try {
            await axios.post('http://your-backend-url/api/location', { latitude, longitude });
            console.log("Location sent to backend successfully");
        } catch (error) {
            console.error("Error sending location to backend:", error);
        }
    };

    const handleButtonClick = () => {
        if (keycloak) {
            if (keycloak.authenticated) {
                keycloak.logout();
            } else {
                keycloak.login();
            }
        } else {
            window.location.href = 'http://localhost:8766/subdrive/login';
        }
    };

    const handleHostCarClick = () => {
        nav('/host-car');
    };

    const carListingManagement = () => {
        nav('/carListingDashBoard');
    };
    const handleMyAccoungtClick = () => {
        nav('/myAccount');
    };
    const handleSearch = () => {
        // Implement search functionality here
        console.log('Search params:', searchParams);
    };

    return (
        <div className="home-container">
        <Header 
            keycloak={keycloak} 
            handleButtonClick={handleButtonClick} 
            handleHostCarClick={handleHostCarClick} 
            carListingManagement={carListingManagement}
            handleMyAccoungtClick={handleMyAccoungtClick}
        />
        <Routes>
            <Route path="/" element={
                <>
                    <HeroSection searchParams={searchParams} setSearchParams={setSearchParams} handleSearch={handleSearch} />
                    <FeaturedCars />
                    <HowItWorks/>
                    <Testimonials />
                    <div className="image-container">
                        <img src="assets/7d00838f-8c8d-4f26-bbd7-4dafc3c40534.jpg" alt="some car" style={{ width: '70%' }} />
                    </div>
                </>
            } />
            <Route path="/search" element={<SearchSection />} />
            <Route path="/listing/:id" element={<ListingSection />} />
            <Route path="/booking/:id" element={<BookingSection />} />
        </Routes>
        <Footer />
        <LocationInfo location={location} />
        <UserWelcome keycloak={keycloak} />
    </div>
    );
};

const Header: React.FC<HeaderProps> = ({ keycloak, handleButtonClick, handleHostCarClick, carListingManagement, handleMyAccoungtClick}) => (
    <div className="header">
        <div className="left-side">
            <h1>SubDrive Cars</h1>
        </div>
        <div className="right-side">
            <button onClick={handleButtonClick}>
                {keycloak && keycloak.authenticated ? 'Logout' : 'Login'}
            </button>
            <button >Sign Up</button>
            <button >Learn More</button>
            <button onClick={handleHostCarClick}>Host your car</button>
            <button >Rent A Car</button>
            <button onClick={handleMyAccoungtClick}>My Account</button>
            {/* <button onClick={carListingManagement}>your cars list</button> */}
        </div>
    </div>
);

const HeroSection: React.FC<HeroSectionProps> = ({ searchParams, setSearchParams, handleSearch }) => (
    <div 
        className="hero-section" 
        style={{
            backgroundImage: 'url(assets/car-120049.jpg)', 
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed',
            minHeight: '500px',
            marginLeft: '-25vw',  // Push the section to the left
            marginRight: '-25vw', // Push the section to the right
            paddingLeft: '25vw',  // Compensate the content's position
            paddingRight: '25vw', // Ensures a minimum height
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#fff',
            textAlign: 'center',
        }}
    >
        <h2 style={{ fontSize: '48px', marginBottom: '20px' }}>Find your drive</h2>
        <p style={{ fontSize: '24px', marginBottom: '40px' }}>Explore the world's largest car sharing marketplace</p>
        <div className="search-bar" style={{ display: 'inline-block', maxWidth: '800px', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '8px' }}>
            <input
                type="text"
                placeholder="City, airport, address or hotel"
                value={searchParams.where}
                onChange={(e) => setSearchParams({...searchParams, where: e.target.value})}
                style={{ padding: '10px', width: 'calc(100% - 20px)', marginBottom: '10px', borderRadius: '4px', border: 'none' }}
            />
            <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input
                    type="date"
                    value={searchParams.fromDate}
                    onChange={(e) => setSearchParams({...searchParams, fromDate: e.target.value})}
                    style={{ padding: '10px', flex: 1, borderRadius: '4px', border: 'none' }}
                />
                <input
                    type="time"
                    value={searchParams.fromTime}
                    onChange={(e) => setSearchParams({...searchParams, fromTime: e.target.value})}
                    style={{ padding: '10px', flex: 1, borderRadius: '4px', border: 'none' }}
                />
            </div>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                <input
                    type="date"
                    value={searchParams.untilDate}
                    onChange={(e) => setSearchParams({...searchParams, untilDate: e.target.value})}
                    style={{ padding: '10px', flex: 1, borderRadius: '4px', border: 'none' }}
                />
                <input
                    type="time"
                    value={searchParams.untilTime}
                    onChange={(e) => setSearchParams({...searchParams, untilTime: e.target.value})}
                    style={{ padding: '10px', flex: 1, borderRadius: '4px', border: 'none' }}
                />
            </div>
            <button onClick={handleSearch} className="search-button" style={{ padding: '10px 20px', backgroundColor: '#ff6b6b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
                🔍 Search
            </button>
        </div>
    </div>
);

const Testimonials: React.FC = () => (
    <div className="testimonials">
        <h2>What our customers say</h2>
        {/* Add testimonial components here */}
    </div>
);


const LocationInfo: React.FC<LocationInfoProps> = ({ location }) => (
    location && (
        <div className="location-info">
            <p>Your current location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</p>
        </div>
    )
);

const UserWelcome: React.FC<UserWelcomeProps> = ({ keycloak }) => {
    if (!keycloak || !keycloak.authenticated) {
      return null;
    }
  
    return (
      <div className="user-welcome">
        <p>Welcome, {keycloak.tokenParsed?.preferred_username}</p>
      </div>
    );
  };  

  const SearchSection: React.FC = () => (
    <div className="search-section">
        {/* Implement search functionality here */}
    </div>
);

const ListingSection: React.FC = () => (
    <div className="listing-section">
        {/* Implement listing details here */}
    </div>
);

const BookingSection: React.FC = () => (
    <div className="booking-section">
        {/* Implement booking process here */}
    </div>
);

export default Home;
