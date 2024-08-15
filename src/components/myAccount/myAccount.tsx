import React, { useState } from 'react';
import Header from '../header/header';
import Footer from '../footer/footer';

// You might need to import your actual Keycloak type if it's available
type Keycloak = {
  authenticated: boolean;
};

const iconStyle: React.CSSProperties = {
  width: '24px',
  height: '24px',
  marginRight: '12px'
};

const MyAccountPage: React.FC = () => {
  // Mock Keycloak state - replace with actual Keycloak integration if available
  const [keycloak, setKeycloak] = useState<Keycloak | null>({ authenticated: false });

  const handleButtonClick = () => {
    // Toggle authentication status for demo purposes
    setKeycloak(prev => prev ? { authenticated: !prev.authenticated } : null);
    console.log('Login/Logout clicked');
  };

  const handleHostCarClick = () => {
    console.log('Host your car clicked');
  };

  const handleMyAccountClick = () => {
    console.log('My Account clicked');
  };

  const accountOptions = [
    { icon: '📄', title: 'Account summary', description: 'Manage your account balance and view your transaction history.' },
    { icon: '💰', title: 'Financial documents', description: 'Download your invoices, transactions and financial year summary.' },
    { icon: '🔔', title: 'Notification preferences', description: 'Choose which communications you want to receive.' },
    { icon: '💳', title: 'Payment preferences', description: 'Tell us how you want to pay and be paid.' },
    { icon: '📞', title: 'Contact details', description: 'Update your phone number or home address.' },
    { icon: '🔒', title: 'Privacy & security', description: 'Deactivate your Uber Carshare account here.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header 
        keycloak={keycloak}
        handleButtonClick={handleButtonClick}
        handleHostCarClick={handleHostCarClick}
        handleMyAccountClick={handleMyAccountClick}
      />
      <main style={{ flex: 1, fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <div style={{ position: 'relative', width: '96px', height: '96px', marginRight: '16px' }}>
            <div style={{ width: '100%', height: '100%', backgroundColor: '#e0e0e0', borderRadius: '50%' }}></div>
            <div style={{ position: 'absolute', bottom: '0', right: '0', backgroundColor: '#00b8d4', padding: '6px', borderRadius: '50%' }}>
              📷
            </div>
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>Surendra</h1>
            <p style={{ color: '#666', margin: '4px 0' }}>First time borrower</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#f5f5f5', padding: '24px', borderRadius: '8px', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Get ready to drive</h2>
          <p style={{ marginBottom: '16px' }}>Add your ID and details now so you can book instantly when you need a car.</p>
          <button style={{ backgroundColor: '#00b8d4', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>
            Add your ID
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {accountOptions.map((option, index) => (
            <div key={index} style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                <span style={iconStyle}>{option.icon}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0' }}>{option.title}</h3>
              </div>
              <p style={{ color: '#666', margin: '0' }}>{option.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyAccountPage;