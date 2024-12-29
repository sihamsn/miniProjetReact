import React, { useState } from 'react';
import axios from 'axios';
import HeaderSection from './HeaderSection';
import NavigationBar from './NavigationBar';
import Index from './Index';
import Footer from './Footer';
import { useSelector } from 'react-redux';

const AjouterUtilisateur = () => {
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    email: '',
    age: '',
    admin: false,
    pseudo: '',
    MotDePasse: '',
    couleur: '',
    devise: '',
    pays: '',
    avatar: '',
  });
  const user = useSelector((state) => state.user); // Récupération de l'utilisateur connecté

  const primaryColor = user?.couleur || '#FF7F32'; 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs', userData)
      .then((response) => {
        alert('Utilisateur ajouté');
      })
      .catch((err) => {
        alert('Erreur d\'ajout');
      });
  };


 


  const formContainerStyle = {
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    maxWidth: '600px',
    margin: '0 auto',
  };

  const formTitleStyle = {
    color: primaryColor,
    marginBottom: '20px',
    fontSize: '24px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    color: '#333',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: `1px solid ${primaryColor}`,
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    backgroundColor: primaryColor,
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: `${primaryColor}CC`,
  };

  return (

          <div style={formContainerStyle}>
            <h1 style={formTitleStyle}>Ajouter un utilisateur</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label style={labelStyle}>Prénom :</label>
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Nom :</label>
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Email :</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Âge :</label>
                <input
                  type="number"
                  name="age"
                  placeholder="Âge"
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Pseudo :</label>
                <input
                  type="text"
                  name="pseudo"
                  placeholder="Pseudo"
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Mot de passe :</label>
                <input
                  type="password"
                  name="MotDePasse"
                  placeholder="Mot de passe"
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Couleur :</label>
                <input
                  type="text"
                  name="couleur"
                  placeholder="Couleur"
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Devise :</label>
                <input
                  type="text"
                  name="devise"
                  placeholder="Devise"
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Pays :</label>
                <input
                  type="text"
                  name="pays"
                  placeholder="Pays"
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Avatar (URL) :</label>
                <input
                  type="text"
                  name="avatar"
                  placeholder="Avatar (URL)"
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                Ajouter
              </button>
            </form>
          </div>
  );
};

export default AjouterUtilisateur;
