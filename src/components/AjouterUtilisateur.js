import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const AjouterUtilisateur = () => {
  const [userData, setUserData] = useState({
    nom: '',
    prenom: '',
    email: '',
    age: '',
    admin: false,
    pseudo: '',
    MotDePasse: '',
    couleur: '',
    devise: '',
    pays: '',
    avatar: '',
  });

  const user = useSelector((state) => state.user); // Récupération de l'utilisateur connecté
  const primaryColor = user?.couleur || '#FF7F32';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs', userData)
      .then((response) => {
        alert('Utilisateur ajouté');
      })
      .catch((err) => {
        alert('Erreur d\'ajout');
      });
  };

  return (
    <div className="p-8 rounded-lg shadow-lg bg-white max-w-2xl mx-auto">
      <h1 className={`text-2xl font-bold mb-5`} style={{ color: primaryColor }}>
        Ajouter un utilisateur
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom :</label>
          <input
            type="text"
            name="prenom"
            placeholder="Prénom"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom :</label>
          <input
            type="text"
            name="nom"
            placeholder="Nom"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email :</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Âge :</label>
          <input
            type="number"
            name="age"
            placeholder="Âge"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pseudo :</label>
          <input
            type="text"
            name="pseudo"
            placeholder="Pseudo"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe :</label>
          <input
            type="password"
            name="MotDePasse"
            placeholder="Mot de passe"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
            required
          />
        </div>
        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Couleur :</label>
  <input
    type="color"
    name="couleur"
    value={userData.couleur} // Assurez-vous que `userData.couleur` contient la valeur actuelle
    onChange={handleChange}
    className="w-full h-10 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
    style={{ 
      borderColor: primaryColor,
      focusRingColor: primaryColor,
    }}
  />
</div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Devise :</label>
          <input
            type="text"
            name="devise"
            placeholder="Devise"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Pays :</label>
          <input
            type="text"
            name="pays"
            placeholder="Pays"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar (URL) :</label>
          <input
            type="text"
            name="avatar"
            placeholder="Avatar (URL)"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{ borderColor: primaryColor, focusRingColor: primaryColor }}
          />
        </div>
        <button
          type="submit"
          className={`w-full px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-300`}
          style={{ backgroundColor: primaryColor }}
          onMouseOver={(e) => (e.target.style.backgroundColor = `${primaryColor}CC`)}
          onMouseOut={(e) => (e.target.style.backgroundColor = primaryColor)}
        >
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AjouterUtilisateur;