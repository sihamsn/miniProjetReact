import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from '../redux/userSlice';
import axios from 'axios';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa'; // Icônes de validation et erreur
import { IoMdColorPalette } from 'react-icons/io'; // Icône de palette de couleurs

const ModifierCouleur = () => {
  const user = useSelector((state) => state.user); 
  const dispatch = useDispatch();
  const [newColor, setNewColor] = useState(user.couleur); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChangeColor = async () => {
    try {
      await axios.put(`https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs/${user.id}`, {
        couleur: newColor,
      });
      
      dispatch(changeColor(newColor));
      setSuccess('Couleur mise à jour avec succès!');
      setError('');
    } catch (error) {
      setError('Erreur lors de la mise à jour de la couleur. Veuillez réessayer.');
      setSuccess('');
    }
  };

  if (!user.admin && user.age < 15) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Modifier Ma Couleur Préférée</h1>
        <p style={styles.errorMessage}>Vous n'avez pas les droits pour modifier la couleur.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Modifier Ma Couleur Préférée</h1>

      <div style={styles.formContainer}>
        {error && <p style={styles.errorMessage}><FaRegTimesCircle /> {error}</p>}
        {success && <p style={styles.successMessage}><FaRegCheckCircle /> {success}</p>}

        <div style={styles.selectContainer}>
          <IoMdColorPalette style={styles.paletteIcon} />
          <select
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            style={styles.select}
          >
            <option value="#ff0000">Rouge</option>
            <option value="#0000ff">Bleu</option>
            <option value="#008000">Vert</option>
            <option value="#ffff00">Jaune</option>
            <option value="#800080">Violet</option>
            <option value="#ffa500">Orange</option>
            <option value="#ffc0cb">Rose</option>
            <option value="#a52a2a">Marron</option>
          </select>
        </div>

        <button onClick={handleChangeColor} style={styles.button}>
          Valider
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '40px',
    backgroundColor: '#f4f6f9',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    color: '#2c3e50',
    marginBottom: '20px',
    fontWeight: 'bold',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  selectContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  paletteIcon: {
    fontSize: '24px',
    color: '#3498db',
    marginRight: '10px',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '200px',
    backgroundColor: '#fff',
    cursor: 'pointer',
  },
  button: {
    padding: '12px 25px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
    marginTop: '20px',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
  errorMessage: {
    color: '#e74c3c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10px',
  },
  successMessage: {
    color: '#2ecc71',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10px',
  },
};

export default ModifierCouleur;
