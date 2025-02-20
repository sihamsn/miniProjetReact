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

  const user = useSelector((state) => state.user); 
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
        setUserData({
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
      })
      .catch((err) => {
        alert("Erreur d'ajout");
      });
  };
  
      


  return (
    <div className="p-8 rounded-lg shadow-lg bg-white max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-5" style={{ color: primaryColor }}>
        Ajouter un utilisateur
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
     
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom :</label>
          <input
            type="text"
            name="nom"
            value={userData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom :</label>
          <input
            type="text"
            name="prenom"
            value={userData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email :</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Âge :</label>
          <input
            type="number"
            name="age"
            value={userData.age}
            onChange={handleChange}
            placeholder="Âge"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Pseudo :</label>
          <input
            type="text"
            name="pseudo"
            value={userData.pseudo}
            onChange={handleChange}
            placeholder="Pseudo"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>

  
        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe :</label>
          <input
            type="password"
            name="MotDePasse"
            value={userData.MotDePasse}
            onChange={handleChange}
            placeholder="Mot de passe"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
            required
          />
        </div>

    
        <div>
          <label className="block text-sm font-medium text-gray-700">Couleur :</label>
          <input
            type="color"
            name="couleur"
            value={userData.couleur}
            onChange={handleChange}
            className="w-full h-10 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Devise :</label>
          <input
            type="text"
            name="devise"
            value={userData.devise}
            onChange={handleChange}
            placeholder="Devise"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Pays :</label>
          <input
            type="text"
            name="pays"
            value={userData.pays}
            onChange={handleChange}
            placeholder="Pays"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Avatar (URL) :</label>
          <input
            type="text"
            name="avatar"
            value={userData.avatar}
            onChange={handleChange}
            placeholder="Avatar (URL)"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white font-semibold rounded-lg transition-colors duration-300"
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