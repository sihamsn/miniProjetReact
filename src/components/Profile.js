import React from "react";
import { useSelector } from "react-redux";
import {
  FaEnvelope,
  FaUser,
  FaMapMarkerAlt,
  FaMoneyBillAlt,
  FaBirthdayCake,
} from "react-icons/fa"; // Importation des icônes
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
    return <p>Vous devez être connecté pour voir votre profil.</p>;
  }

  // const profileContainerStyle = {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   backgroundColor: '#fff',
  //   borderRadius: '15px',
  //   padding: '20px',
  //   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  //   maxWidth: '400px',
  //   margin: '20px auto',
  //   textAlign: 'center',
  // };

  // const avatarStyle = {
  //   width: '120px',
  //   height: '120px',
  //   borderRadius: '50%',
  //   objectFit: 'cover',
  //   marginBottom: '15px',
  //   border: `4px solid ${user.couleur || '#FF7F32'}`, // Bordure colorée selon la couleur utilisateur
  // };

  // const infoStyle = {
  //   fontSize: '16px',
  //   color: '#333',
  //   marginBottom: '10px',
  // };

  // const labelStyle = {
  //   fontWeight: 'bold',
  //   color: user.couleur || '#FF7F32', // Texte en couleur utilisateur
  // };

  return (
    // <div>
    //   <h1 style={{ textAlign: 'center', color: user.couleur || '#FF7F32' }}>Mon Profil</h1>
    //   <div style={profileContainerStyle}>
    //     <img src={user.avatar} alt="Avatar" style={avatarStyle} />
    //     <h2 style={{ marginBottom: '10px' }}>{user.prenom} {user.nom}</h2>
    //     <p style={infoStyle}>
    //       <FaEnvelope style={{ marginRight: '8px' }} />
    //       <span style={labelStyle}>Email:</span> {user.email}
    //     </p>
    //     <p style={infoStyle}>
    //       <FaUser style={{ marginRight: '8px' }} />
    //       <span style={labelStyle}>Pseudo:</span> {user.pseudo}
    //     </p>
    //     <p style={infoStyle}>
    //       <FaBirthdayCake style={{ marginRight: '8px' }} />
    //       <span style={labelStyle}>Âge:</span> {user.age} ans
    //     </p>
    //     <p style={infoStyle}>
    //       <FaMapMarkerAlt style={{ marginRight: '8px' }} />
    //       <span style={labelStyle}>Pays:</span> {user.Pays}
    //     </p>
    //     <p style={infoStyle}>
    //       <FaMoneyBillAlt style={{ marginRight: '8px' }} />
    //       <span style={labelStyle}>Devise:</span> {user.Devise}
    //     </p>
    //   </div>
    // </div>
    <div className="flex items-center flex-col gap-5">
      <h1
        className="text-xl font-bold"
        style={{ color: `${user?.couleur ? user.couleur : "#333"}` }}
      >
        Mon Profil
      </h1>
      <div className="top-card">
        <SpotlightCard
          className="custom-spotlight-card flex px-3 py-10 items-center flex-col gap-5 w-[800px] border border-slate-300 bg-slate-50/10"
          spotlightColor={`${
            user?.couleur ? `${user?.couleur}45` : "#33333345"
          }`}
        >
          <div className="img-box w-[150px] h-[150px] rounded-full border mb-10">
            <img
              onError={(e) => {
                e.target.src =
                  "https://cdn-icons-png.flaticon.com/128/17436/17436361.png";
              }}
              src={user?.avatar}
              className="w-full h-full"
              alt="Avatar"
            />
          </div>
          <div className="w-full flex items-center justify-between flex-wrap">
            {myfields.map((field)=>(
              <div className="form-group mb-3 flex flex-col gap-2 w-[340px]">
              <label
                htmlFor="nom"
                className="text-[#333]"
                style={{ color: `${user?.couleur}` }}
                >
                {field}
              </label>
              <input
                disabled
                value={field !== "couleur" ? user[`${field}`] : ''}
                className={`px-2 border w-full h-10 rounded-xl text-[#333]`}
                style={{ background: `${user?.couleur}` }}
                />
            </div>
              ))}
            {/* <div className="form-group mb-3 flex flex-col gap-2 w-[340px]">
              <label
                htmlFor="prenom"
                className="text-[#333]"
                style={{ color: `${user?.couleur}` }}
              >
                Prenom
              </label>
              <input
                disabled
                value={user?.prenom}
                className={`px-2 border w-full h-10 rounded-xl text-[#333]`}
                style={{ background: `${user?.couleur}` }}
              />
            </div>
            <div className="form-group mb-3 flex flex-col gap-2 w-[340px]">
              <label
                htmlFor="nom"
                className="text-[#333]"
                style={{ color: `${user?.couleur}` }}
              >
                Nom
              </label>
              <input
                disabled
                value={user?.nom}
                className={`px-2 border w-full h-10 rounded-xl text-[#333]`}
                style={{ background: `${user?.couleur}` }}
              />
            </div> */}
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};

export default Profile;
