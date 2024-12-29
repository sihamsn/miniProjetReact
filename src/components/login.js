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
      console.log('Requête API :', url); 
      const response = await axios.get(url);
      console.log('Réponse API :', response.data); 

      if (response.data.length > 0) {
        const user = response.data.filter((user)=>user.MotDePasse === motDePasse)[0];

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
      console.error('Erreur de connexion :', error);
      setErrors(['Erreur de connexion au serveur']);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="Login" style={styles.container}>
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
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#1a2b3c', 
    padding: '0 15px',
  },
  form: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#ff7f32', 
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '6px',
    border: '1px solid #ff7f32',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#ff7f32', 
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
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
