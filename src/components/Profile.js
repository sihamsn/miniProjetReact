import React from 'react';
import { useSelector } from 'react-redux';
import { FaEnvelope, FaUser, FaMapMarkerAlt, FaMoneyBillAlt, FaBirthdayCake } from 'react-icons/fa'; // Importation des icônes

const Profile = () => {
  const user = useSelector((state) => state.user);

  if (!user) {
    return <p>Vous devez être connecté pour voir votre profil.</p>;
  }

  const profileContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: '20px auto',
    textAlign: 'center',
  };

  const avatarStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '15px',
    border: `4px solid ${user.couleur || '#FF7F32'}`, // Bordure colorée selon la couleur utilisateur
  };

  const infoStyle = {
    fontSize: '16px',
    color: '#333',
    marginBottom: '10px',
  };

  const labelStyle = {
    fontWeight: 'bold',
    color: user.couleur || '#FF7F32', // Texte en couleur utilisateur
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center', color: user.couleur || '#FF7F32' }}>Mon Profil</h1>
      <div style={profileContainerStyle}>
        <img src={user.avatar} alt="Avatar" style={avatarStyle} />
        <h2 style={{ marginBottom: '10px' }}>{user.prenom} {user.nom}</h2>
        <p style={infoStyle}>
          <FaEnvelope style={{ marginRight: '8px' }} />
          <span style={labelStyle}>Email:</span> {user.email}
        </p>
        <p style={infoStyle}>
          <FaUser style={{ marginRight: '8px' }} />
          <span style={labelStyle}>Pseudo:</span> {user.pseudo}
        </p>
        <p style={infoStyle}>
          <FaBirthdayCake style={{ marginRight: '8px' }} />
          <span style={labelStyle}>Âge:</span> {user.age} ans
        </p>
        <p style={infoStyle}>
          <FaMapMarkerAlt style={{ marginRight: '8px' }} />
          <span style={labelStyle}>Pays:</span> {user.Pays}
        </p>
        <p style={infoStyle}>
          <FaMoneyBillAlt style={{ marginRight: '8px' }} />
          <span style={labelStyle}>Devise:</span> {user.Devise}
        </p>
      </div>
    </div>
  );
};

export default Profile;
