import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdPersonAdd } from "react-icons/io";
import { useSelector } from "react-redux";

const ListeUtilisateurs = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const primaryColor = user?.couleur || "#FF7F32";

  useEffect(() => {
    axios
      .get("https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Erreur de chargement des utilisateurs");
        setLoading(false);
      });
  }, []);

  const deleteUser = (id) => {
    axios
      .delete(`https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch(() => {
        setError("Erreur de suppression");
      });
  };

  const updateUser = (id) => {
    navigate(`/modifier-utilisateur/${id}`);
  };

  if (loading) return <div className="text-center py-4">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 py-4">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* En-tête */}
        <div className="flex justify-between items-center mb-8">
          <h1
            className="text-3xl font-bold"
            style={{ color: primaryColor }}
          >
            Liste des Utilisateurs
          </h1>
          <NavLink
            to="/ajouter-utilisateur"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            <IoMdPersonAdd />
            Ajouter un utilisateur
          </NavLink>
        </div>

        {/* Liste des utilisateurs sous forme de cartes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              {/* Avatar et informations */}
              <div className="p-6">
                <div className="flex items-center justify-center">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full object-cover border-4"
                    style={{ borderColor: primaryColor }}
                  />
                </div>
                <h2 className="text-xl font-semibold text-center mt-4">
                  {user.prenom} {user.nom}
                </h2>
                <p className="text-gray-600 text-center mt-2">{user.email}</p>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4 p-4 bg-gray-50">
                <button
                  className="px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                  onClick={() => updateUser(user.id)}
                >
                  Modifier
                </button>
                <button
                  className="px-4 py-2 rounded-lg text-white font-semibold transition-colors duration-300 hover:opacity-90"
                  style={{ backgroundColor: primaryColor }}
                  onClick={() => deleteUser(user.id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListeUtilisateurs;