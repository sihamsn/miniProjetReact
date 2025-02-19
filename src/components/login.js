import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { login } from '../redux/userSlice';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [errors, setErrors] = useState([]);
  const [attempts, setAttempts] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (attempts === 0) {
      return;
    }

    setIsLoading(true);
    setErrors([]);

    try {
      const url = `https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs?email=${email}`;
      const response = await axios.get(url);

      if (response.data.length > 0) {
        const user = response.data.filter((user) => user.MotDePasse === motDePasse)[0];

        if (user) {
          dispatch(login(user));
          setEmail('');
          setMotDePasse('');
          setAttempts(3);
          navigate('/accueil');
        } else {
          setErrors(['Mot de passe incorrect']);
          setAttempts((prevAttempts) => prevAttempts - 1);
        }
      } else {
        setErrors(['Adresse email non trouvée']);
        setAttempts((prevAttempts) => prevAttempts - 1);
      }
    } catch (error) {
      setErrors(['Erreur de connexion au serveur']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Login" style={styles.container}>
      {/* Logo en haut à droite de l'écran */}
      <div style={styles.logoContainer}>
        <img
          src="/fauget.png" // Remplacez par le chemin de votre logo
          alt="Logo"
          style={styles.logo}
        />
      </div>

      {/* Moitié gauche avec formulaire */}
      <div style={styles.leftHalf}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <h1 style={styles.heading}>Connexion</h1>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            required
            style={styles.input}
          />
          <button type="submit" disabled={attempts === 0 || isLoading} style={styles.button}>
            {isLoading ? 'Chargement...' : 'Login'}
          </button>
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={styles.error}>
                {error}
              </li>
            ))}
          </ul>
          {attempts === 0 && <p style={styles.attempts}>Compte bloqué après 3 tentatives.</p>}
          <p style={styles.link}>
            Pas encore de compte ? <Link to="/create-account" style={styles.linkText}>Créez un compte ici</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundImage: `url(${"\ arriereplan.png"})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative', // Pour positionner le logo absolument
  },
  logoContainer: {
    position: 'absolute', // Position absolue pour placer le logo
    top: '0px', // Espacement depuis le haut
    right: '10px', // Espacement depuis la droite
    zIndex: 10, // Assure que le logo est au-dessus des autres éléments
  },
  logo: {
    width: '250px', // Taille du logo augmentée
    height: 'auto',
  },
  leftHalf: {
    width: '50%', // Prend la moitié gauche de la page
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Fond blanc légèrement transparent
  },
  form: {
   
    padding: '30px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '35px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '15px',
    border: '1px solid #999',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#222',
    color: '#fff',
    border: 'none',
    borderRadius: '13px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  error: {
    color: '#ff7f32',
    fontSize: '14px',
  },
  attempts: {
    color: '#ff4f00',
    fontSize: '14px',
  },
  link: {
    marginTop: '20px',
    fontSize: '14px',
  },
  linkText: {
    color: '#ff7f32',
    textDecoration: 'none',
  },
};

export default Login;