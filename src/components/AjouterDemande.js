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

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 rounded-lg shadow-lg p-5 max-w-[800px] mx-auto my-5"
    >
      <label className="block mb-4">
        <span className="font-bold" style={{ color: primaryColor }}>
          Titre:
        </span>
        <input
          type="text"
          placeholder="Titre"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ borderColor: primaryColor }}
        />
      </label>

      <label className="block mb-4">
        <span className="font-bold" style={{ color: primaryColor }}>
          Description:
        </span>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ borderColor: primaryColor, height: '100px' }}
        />
      </label>
      <label className="block mb-4">
        <span className="font-bold" style={{ color: primaryColor }}>
          Date de début:
        </span>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ borderColor: primaryColor }}
        />
      </label>
      <label className="block mb-4">
        <span className="font-bold" style={{ color: primaryColor }}>
          Date de fin:
        </span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ borderColor: primaryColor }}
        />
      </label>
      <label className="block mb-4">
        <span className="font-bold" style={{ color: primaryColor }}>
          Type:
        </span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
          className="w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ borderColor: primaryColor }}
        >
          <option value="">Type de demande</option>
          <option value="Congé">Congé</option>
          <option value="Maladie">Maladie</option>
          <option value="Autre">Autre</option>
        </select>
      </label>
      <button
        type="submit"
        className="w-full p-2 text-white rounded-md transition-all duration-300 hover:bg-blue-700"
        style={{ backgroundColor: primaryColor }}
      >
        Ajouter
      </button>
    </form>
  );
};

export default AjouterDemande;