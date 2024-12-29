import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const user = useSelector((state) => state.user);

  
  const backgroundColor = user.couleur || '#1A1A1A'; 

  return (
    <footer style={{ ...footerStyle, backgroundColor }}>
      <div style={footerContentStyle}>
        <p style={footerTextStyle}>Adresse: Hay Salam, Salé, Maroc</p>
        <div style={socialLinksStyle}>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <i className="fab fa-facebook-f"></i> Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={linkStyle}>
            <i className="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
      <p style={copyrightStyle}>© 2024 Fauget Software. Tous droits réservés.</p>
    </footer>
  );
};

const footerStyle = {
  color: '#fff',
  textAlign: 'center',
  padding: '30px 20px',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'background-color 0.5s ease',
};

const footerContentStyle = {
  marginBottom: '20px',
};

const footerTextStyle = {
  fontSize: '14px',
  fontWeight: '300',
  color: 'rgba(255, 255, 255, 0.8)',
};

const socialLinksStyle = {
  marginTop: '15px',
};

const linkStyle = {
  color: '#fff',
  textDecoration: 'none',
  fontSize: '18px',
  padding: '10px 15px',
  borderRadius: '30px',
  margin: '0 10px',
  display: 'inline-block',
  transition: 'background-color 0.3s, transform 0.3s',
};

const copyrightStyle = {
  fontSize: '12px',
  color: 'rgba(255, 255, 255, 0.5)',
  marginTop: '20px',
  fontWeight: '300',
};

export default Footer;
