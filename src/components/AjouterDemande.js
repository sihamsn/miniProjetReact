import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addDemandAsync } from '../redux/demandSlice';
import { v4 as uuidv4 } from 'uuid'; 
import { useNavigate } from 'react-router-dom';

const AjouterDemande = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [type, setType] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


 
  const user = useSelector((state) => state.user); 
  const primaryColor = user?.couleur || '#007BFF'; 

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!user.id) {
      alert("Utilisateur non connecté. Veuillez vous connecter pour ajouter une demande.");
      return;
    }
  
    const newRequest = {
      id: uuidv4(),
      title,
      description,
      startDate,
      endDate,
      type,
      status: 'En attente',
      createdAt: new Date().toISOString(),
    };
  
 
    dispatch(addDemandAsync({ id: user.id, newDemand: newRequest }));
    alert("Votre demande a bien été enregistrée.");
    navigate('/ajouter-demande'); 
    console.log('Demande ajoutée:', newRequest);
  
  
    setTitle('');
    setDescription('');
    setStartDate('');
    setEndDate('');
    setType('');
  };

  const formStyle = {

    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '800px',
    margin: '20px auto',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    fontWeight: 'bold',
    color: primaryColor,
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: `1px solid ${primaryColor}`,
    borderRadius: '4px',
    fontSize: '16px',
  };

  const buttonStyle = {
    backgroundColor: primaryColor,
    color: '#fff',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>
        Titre:
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Description:
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ ...inputStyle, height: '100px' }} /
        />
      </label>
      <label style={labelStyle}>
        Date de début:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Date de fin:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          style={inputStyle}
        />
      </label>
      <label style={labelStyle}>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)} required style={inputStyle}>
          <option value="">Type de demande</option>
          <option value="Congé">Congé</option>
          <option value="Maladie">Maladie</option>
          <option value="Autre">Autre</option>
        </select>
      </label>
      <button 
        type="submit" 
        style={buttonStyle} 
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'} 
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryColor} 
      >
        Ajouter
      </button>
    </form>
  );
};

export default AjouterDemande;