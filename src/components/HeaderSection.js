import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import { FaUserAlt, FaSignOutAlt } from 'react-icons/fa'; // Importation des icônes

const HeaderSection = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: user.couleur || 'lightgray',
        padding: '10px 20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <img
        src="image.png"
        alt="logo"
        style={{
          maxWidth: '100%',
          height: 'auto',
          width: '200px',
          height: '160px',
        }}
      />
      {user.authentifie && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <p
            style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#333',
            }}
          >
            <FaUserAlt style={{ marginRight: '10px' }} />
            Bienvenue, {user.prenom} {user.nom}
          </p>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '5px',
              transition: 'background-color 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#d32f2f')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#f44336')}
          >
            <FaSignOutAlt /> Se Déconnecter
          </button>
        </div>
      )}
    </header>
  );
};

export default HeaderSection;
