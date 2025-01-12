import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import HeaderSection from "./HeaderSection";
import NavigationBar from "./NavigationBar";
import Index from "./Index";
import Footer from "./Footer";
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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  };

  const thStyle = {
    backgroundColor: primaryColor,
    color: "#fff",
    padding: "10px",
    textAlign: "left",
    fontSize: "16px",
    borderBottom: "2px solid #ddd",
  };

  const tdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
    textAlign: "left",
    fontSize: "14px",
  };

  const avatarStyle = {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
  };

  const buttonStyle = {
    padding: "8px 12px",
    margin: "0 5px",
    backgroundColor: primaryColor,
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: `${primaryColor}CC`, // Couleur légèrement assombrie
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        padding: "15px",
      }}
    >
      <div className="flex justify-between items-center">
        <h1
          className="text-xl font-bold text-center"
          style={{ color: `${user?.couleur ? user.couleur : "#333"}` }}
        >
          Listes Des Utilisateurs
        </h1>
        <NavLink to="/ajouter-utilisateur" style={{ ...buttonStyle, textDecoration: 'none', display: 'inline-flex',gap:'12px',alignItems:'center'}}>
           <IoMdPersonAdd/>
            Ajouter un utilisateur
        </NavLink>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Nom</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Avatar</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-200">
              <td style={tdStyle}>
                {user.prenom} {user.nom}
              </td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>
                <img src={user.avatar} alt="Avatar" style={avatarStyle} />
              </td>
              <td style={tdStyle}>
                <button
                  style={buttonStyle}
                  onClick={() => updateUser(user.id)}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor =
                      buttonHoverStyle.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor =
                      buttonStyle.backgroundColor)
                  }
                >
                  Modifier
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => deleteUser(user.id)}
                  onMouseOver={(e) =>
                    (e.target.style.backgroundColor =
                      buttonHoverStyle.backgroundColor)
                  }
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor =
                      buttonStyle.backgroundColor)
                  }
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListeUtilisateurs;
