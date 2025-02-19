import React from "react";
import { useSelector } from "react-redux";
import SpotlightCard from "./ui-components/SpotlightCard";

const Profile = () => {
  const user = useSelector((state) => state.user);

  const myfields = [
    "nom",
    "prenom",
    "pseudo",
    "Devise",
    "Pays",
    "email",
    "age",
    "couleur"
  ];

  if (!user) {
    return <p className="text-center text-gray-600">Vous devez être connecté pour voir votre profil.</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Titre */}
      <h1
        className="text-4xl font-bold mb-8"
        style={{ color: user?.couleur || "#333" }}
      >
        Mon Profil
      </h1>

      {/* Carte de Profil Verticale Asymétrique */}
      <div className="w-full max-w-5xl">
        <SpotlightCard
          className="custom-spotlight-card bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row"
          spotlightColor={`${user?.couleur ? `${user?.couleur}20` : "#33333320"}`}
        >
          {/* Section Avatar */}
          <div className="flex justify-center items-center p-8 bg-white-50 lg:w-1/3 lg:border-r lg:border-white-200">
            <div className="w-48 h-48 rounded-full border-4 overflow-hidden shadow-lg">
              <img
                onError={(e) => {
                  e.target.src =
                    "https://cdn-icons-png.flaticon.com/128/17436/17436361.png";
                }}
                src={user?.avatar}
                className="w-full h-full object-cover"
                alt="Avatar"
              />
            </div>
          </div>

    
          <div className="flex-1 p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {myfields.map((field) => (
                <div key={field} className="flex flex-col gap-2">
                  <label
                    htmlFor={field}
                    className="text-sm font-medium text-gray-500"
                    style={{ color: user?.couleur || "#333" }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <div
                    className={`w-full px-4 py-3 rounded-lg text-gray-700 bg-gray-100 border border-gray-200`}
                    style={{
                      borderColor: user?.couleur || "#333",
                    }}
                  >
                    {user[`${field}`] || "Non spécifié"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Profile;