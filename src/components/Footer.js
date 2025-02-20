import React from 'react';
import { useSelector } from 'react-redux';

const Footer = () => {
  const user = useSelector((state) => state.user);
  const backgroundColor = user?.couleur || '#1A1A1A'; 
  return (
    <footer
      className="text-white text-center py-8 px-5 shadow-lg border-t border-opacity-10 transition-colors duration-500"
      style={{ backgroundColor }}
    >
      <div className="max-w-4xl mx-auto">
  
        <p className="text-sm font-light text-white text-opacity-80 mb-5">
          Adresse: Hay Salam, Salé, Maroc
        </p>

 
        <div className="flex justify-center space-x-4 mt-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center"
          >
            <i className="fab fa-facebook-f mr-2"></i>
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white text-lg px-4 py-2 rounded-full hover:bg-white hover:bg-opacity-10 transition-all duration-300 flex items-center"
          >
            <i className="fab fa-instagram mr-2"></i>
            Instagram
          </a>
        </div>

     
        <p className="text-xs text-white text-opacity-50 mt-8 font-light">
          © 2024 Fauget Software. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;