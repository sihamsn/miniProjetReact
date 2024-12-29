import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import HeaderSection from './HeaderSection';
import NavigationBar from './NavigationBar';
import Index from './Index';
import Footer from './Footer';
import { useSelector } from 'react-redux';

const ModifierUtilisateur = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    prenom: '',
    nom: '',
    email: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useSelector((state) => state.user); 
  const primaryColor = currentUser?.couleur || '#FF7F32'; 

  useEffect(() => {
    axios
      .get(`https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs/${id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement des données de l\'utilisateur');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs/${id}`, user)
      .then(() => {
        navigate('/liste-utilisateurs');
      })
      .catch(() => {
        setError('Erreur lors de la mise à jour de l\'utilisateur');
      });
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

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
            <h1 style={formTitleStyle}>Modifier Utilisateur</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label style={labelStyle}>Prénom :</label>
                <input
                  type="text"
                  name="prenom"
                  value={user.prenom}
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
                  value={user.nom}
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
                  value={user.email}
                  onChange={handleChange}
                  style={inputStyle}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>Avatar (URL) :</label>
                <input
                  type="text"
                  name="avatar"
                  value={user.avatar}
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
                Enregistrer
              </button>
              <button
                type="button"
                onClick={() => navigate('/liste-utilisateurs')}
                style={buttonStyle}
                onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
              >
                Annuler
              </button>
            </form>
          </div>

  );
};

export default ModifierUtilisateur;
