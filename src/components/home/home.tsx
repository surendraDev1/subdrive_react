import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Keycloak from 'keycloak-js';
import CarSearch from '../carSearch/carSearch';
import './home.css';

const Home: React.FC = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
    const nav = useNavigate();

    useEffect(() => {
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
        if (!keycloak) {
            const newKeycloak = new Keycloak({
                url: 'YOUR_KEYCLOAK_URL',
                realm: 'YOUR_REALM',
                clientId: 'YOUR_CLIENT_ID'
            });
            newKeycloak.init({ onLoad: 'login-required' })
                .then((authenticated) => {
                    if (authenticated) {
                        setKeycloak(newKeycloak);
                    } else {
                        console.log('not authenticated');
                    }
                })
                .catch((error) => {
                    console.error('Failed to initialize Keycloak', error);
                });
        } else {
            keycloak.logout();
            setKeycloak(null);
        }
    };

    const handleHostCarClick = () => {
        nav('/host-car');
    };

    return (
        <div className="home-container">
            <div className="header">
                <div className="left-side">
                    <h1>SubDrive Cars</h1>
                </div>
                <div className="right-side">
                    <button onClick={handleButtonClick}>
                        {keycloak ? 'Logout' : 'Login'}
                    </button>
                    <button onClick={handleHostCarClick}>Host your car</button>
                    <button>Rent a car</button>
                </div>
            </div>
            <div className="body">
                <div className="search-bar">
                    <CarSearch />
                </div>
            </div>
            <div className="image-container">
                <img src="assets/7d00838f-8c8d-4f26-bbd7-4dafc3c40534.jpg" alt="some car" style={{ width: '70%' }} />
            </div>
            {location && (
                <div className="location-info">
                    <p>Your current location: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}</p>
                </div>
            )}
            {keycloak && keycloak.authenticated && (
                <div>
                    <p>Welcome, {keycloak.tokenParsed?.preferred_username}</p>
                </div>
            )}
        </div>
    );
};

export default Home;
