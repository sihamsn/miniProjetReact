import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        {/* Titre du formulaire */}
        <h1
          className="text-2xl font-bold mb-6 text-center"
          style={{ color: primaryColor }}
        >
          Modifier Utilisateur
        </h1>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Champ Prénom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prénom :
            </label>
            <input
              type="text"
              name="prenom"
              value={user.prenom}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
              required
            />
          </div>

          {/* Champ Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom :
            </label>
            <input
              type="text"
              name="nom"
              value={user.nom}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
              required
            />
          </div>

          {/* Champ Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email :
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
              required
            />
          </div>

          {/* Champ Avatar (URL) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Avatar (URL) :
            </label>
            <input
              type="text"
              name="avatar"
              value={user.avatar}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
            />
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/liste-utilisateurs')}
              className="px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
              style={{ backgroundColor: primaryColor, color: '#fff' }}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg font-semibold transition-colors duration-300"
              style={{ backgroundColor: primaryColor, color: '#fff' }}
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifierUtilisateur;