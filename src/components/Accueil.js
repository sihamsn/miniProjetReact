import React from 'react';
import { useSelector } from 'react-redux';

const Accueil = () => {
  const user = useSelector((state) => state.user);

  const containerStyle = {
  
    padding: '0px 20px',
    fontFamily: 'Roboto, Arial, sans-serif',
    maxWidth: '900px',
    margin: '0 auto',
  };

  const welcomeStyle = {
    color: user.couleur || '#2c3e50',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
    paddingLeft: '20px',
    borderLeft: `6px solid ${user.couleur || '#2c3e50'}`,
    marginBottom: '30px',
  };

  const subtitleStyle = {
    color: '#555',
    fontSize: '18px',
    lineHeight: '1.7',
    marginTop: '0',
    paddingTop: '15px',
    paddingBottom: '15px',
    borderTop: '1px solid #ddd',
    paddingLeft: '20px',
    paddingRight: '20px',
    borderRadius: '8px',
  };

  const adminStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    marginTop: '20px',
  };

  const guestStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    marginTop: '20px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={welcomeStyle}>
        Bienvenue, {user.prenom} {user.nom} dans Fauget Software
      </h1>


      {user.admin ? (
        <div style={adminStyle}>
          <p>Vous êtes connecté en tant qu'administrateur</p>
        </div>
      ) : (
        <p style={subtitleStyle}>
        "Notre plateforme vous permet de gérer facilement vos demandes de congé ou d'absence pour maladie.
        Que vous soyez employé ou gestionnaire, accédez à des outils performants pour organiser vos absences en toute transparence."
      </p>
      )}
    </div>
  );
};

export default Accueil;
