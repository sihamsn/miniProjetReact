import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeColor } from '../redux/userSlice';
import axios from 'axios';
import { FaRegCheckCircle, FaRegTimesCircle } from 'react-icons/fa'; // Icônes de validation et erreur
import { IoMdColorPalette } from 'react-icons/io'; // Icône de palette de couleurs

const ModifierCouleur = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [newColor, setNewColor] = useState(user.couleur || '#000000'); // Couleur par défaut
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
      <div className="max-w-[800px] mx-auto p-10 bg-gray-50 rounded-lg shadow-lg font-sans">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">
          Modifier Ma Couleur Préférée
        </h1>
        <p className="text-red-500 font-bold text-center">
          Vous n'avez pas les droits pour modifier la couleur.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[800px] mx-auto p-10 bg-gray-50 rounded-lg shadow-lg font-sans">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-5">
        Modifier Ma Couleur Préférée
      </h1>

      <div className="flex flex-col items-center">
        {/* Messages d'erreur et de succès */}
        {error && (
          <p className="text-red-500 font-bold flex items-center gap-2">
            <FaRegTimesCircle />
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-500 font-bold flex items-center gap-2">
            <FaRegCheckCircle />
            {success}
          </p>
        )}

        {/* Sélecteur de couleur */}
        <div className="flex items-center gap-3 mb-5">
          <IoMdColorPalette className="text-blue-500 text-2xl" />
          <input
            type="color"
            value={newColor}
            onChange={(e) => setNewColor(e.target.value)}
            className="w-20 h-10 cursor-pointer"
          />
        </div>

        {/* Bouton de validation */}
        <button
          onClick={handleChangeColor}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
        >
          Valider
        </button>
      </div>
    </div>
  );
};

export default ModifierCouleur;