import React from 'react';

interface HeaderProps {
  keycloak: {
    authenticated: boolean;
  } | null;
  handleButtonClick: () => void;
  handleHostCarClick: () => void;
  handleMyAccountClick: () => void;
  carListingManagement?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  keycloak,
  handleButtonClick,
  handleHostCarClick,
  handleMyAccountClick,
}) => {
  const headerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const logoStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333'
  };

  const buttonStyle: React.CSSProperties = {
    padding: '0.5rem 1rem',
    margin: '0 0.5rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#00b8d4',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  };

  return (
    <header style={headerStyle}>
      <div className="left-side">
        <h1 style={logoStyle}>SubDrive Cars</h1>
      </div>
      <div className="right-side">
        <button style={buttonStyle} onClick={handleButtonClick}>
          {keycloak && keycloak.authenticated ? 'Logout' : 'Login'}
        </button>
        <button style={buttonStyle}>Sign Up</button>
        <button style={buttonStyle}>Learn More</button>
        <button style={buttonStyle} onClick={handleHostCarClick}>Host your car</button>
        <button style={buttonStyle}>Rent A Car</button>
        <button style={buttonStyle} onClick={handleMyAccountClick}>My Account</button>
        {/* Commented out as per original code */}
        {/* <button style={buttonStyle} onClick={carListingManagement}>Your cars list</button> */}
      </div>
    </header>
  );
};

export default Header;