import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    pseudo: "",
    email: "",
    couleur: "",
    MotDePasse: "",
    confirmationMotDePasse: "",
    age: "",
    Devise: "",
    Pays: "",
    avatar: "",
    photo: "",
    admin: true,
  });

  const [errors, setErrors] = useState([]);
  const [emailExist, setEmailExist] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { MotDePasse, confirmationMotDePasse, ...rest } = formData;

    if (MotDePasse !== confirmationMotDePasse) {
      setErrors(["Les mots de passe ne correspondent pas"]);
      return;
    }

    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        MotDePasse
      )
    ) {
      setErrors([
        "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.",
      ]);
      return;
    }

    if (Object.values(formData).includes("")) {
      setErrors(["Tous les champs sont obligatoires"]);
      return;
    }
    try {
      const response = await axios.get(
        "https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs"
      );
      const emailTaken = response.data.some(
        (user) => user.email === formData.email
      );

      if (emailTaken) {
        setEmailExist(true);
        setErrors(["L'email est déjà utilisé."]);
        return;
      }

      await axios.post(
        "https://6761ef9a46efb37323734e80.mockapi.io/utilisateurs",
        {
          ...rest,
          MotDePasse,
          admin: formData.admin,
        }
      );

      alert(
        "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter!"
      );
      navigate("/");
    } catch (error) {
      setErrors(["Erreur lors de la création du compte"]);
    }
  };

  return (
    <div
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg, hsla(196,0%,79%,0.06) 0px, hsla(196,0%,79%,0.06) 1px,transparent 1px, transparent 96px),repeating-linear-gradient(0deg, hsla(196,0%,79%,0.06) 0px, hsla(196,0%,79%,0.06) 1px,transparent 1px, transparent 96px),repeating-linear-gradient(0deg, hsla(196,0%,79%,0.09) 0px, hsla(196,0%,79%,0.09) 1px,transparent 1px, transparent 12px),repeating-linear-gradient(90deg, hsla(196,0%,79%,0.09) 0px, hsla(196,0%,79%,0.09) 1px,transparent 1px, transparent 12px),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255))",
      }}
      className="container flex items-center justify-center min-h-screen p-5"
    >
      {/* <style>
        {`
          body {
            font-family: 'Roboto', sans-serif;
            // background: linear-gradient(to right, #FF7F32, #003366);
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            animation: fadeIn 1s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .container {
            width: 100%;
            max-width: 450px;
            background-color: #fff;
            padding: 100px;
            border-radius: 10px;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            justify-content: center;
            transform: translateY(50px);
            animation: slideUp 0.6s ease-out;
          }

          @keyframes slideUp {
            from {
              transform: translateY(50px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          h1 {
            color: #003366;
            font-size: 28px;
            margin-bottom: 20px;
            text-align: center;
            transition: color 0.3s;
          }

          h1:hover {
            color: #ff7f32;
          }

          input {
            width: 100%;
            padding: 14px;
            margin: 12px 0;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-size: 16px;
            transition: border-color 0.3s, box-shadow 0.3s;
          }

          input:focus {
            border-color: #003366;
            box-shadow: 0 0 5px rgba(0, 51, 102, 0.5);
            outline: none;
          }

          button {
            width: 100%;
            padding: 16px;
            background-color: #003366;
            color: #fff;
            font-size: 18px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s;
          }

          button:hover {
            background-color: #ff7f32;
            transform: translateY(-2px);
          }

          .form-group {
            width: 100%;
            margin-bottom: 20px;
          }

          .form-group label {
            font-size: 14px;
            font-weight: 600;
            color: #333;
            margin-bottom: 6px;
            transition: color 0.3s;
          }

          .form-group label:hover {
            color: #003366;
          }

          ul {
            padding-left: 20px;
            color: red;
            margin-top: 10px;
            font-size: 14px;
          }

          li {
            margin-bottom: 5px;
          }

          .login-link {
            text-align: center;
            margin-top: 20px;
          }

          .login-link a {
            color: #003366;
            text-decoration: none;
            font-weight: bold;
            transition: color 0.3s;
          }

          .login-link a:hover {
            color: #ff7f32;
          }
        `}
      </style> */}

      <form
        className="w-[800px] bg-white shadow-xl p-3 border border-slate-100 rounded-xl"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl text-center my-4 font-bold">Créer un compte</h1>
        <div className="inputs flex justify-between flex-wrap gap-3 mt-14">
          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="nom">Nom</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="text"
              id="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={(e) =>
                setFormData({ ...formData, nom: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="prenom">Prénom</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="text"
              id="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={(e) =>
                setFormData({ ...formData, prenom: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="pseudo">Pseudo</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="text"
              id="pseudo"
              placeholder="Pseudo"
              value={formData.pseudo}
              onChange={(e) =>
                setFormData({ ...formData, pseudo: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="email"
              id="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="couleur">Couleur préférée</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="text"
              id="couleur"
              placeholder="Couleur"
              value={formData.couleur}
              onChange={(e) =>
                setFormData({ ...formData, couleur: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="age">Âge</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="number"
              id="age"
              placeholder="Âge"
              value={formData.age}
              onChange={(e) =>
                setFormData({ ...formData, age: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="Devise">Devise</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="text"
              id="Devise"
              placeholder="Devise"
              value={formData.Devise}
              onChange={(e) =>
                setFormData({ ...formData, Devise: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="Pays">Pays</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="text"
              id="Pays"
              placeholder="Pays"
              value={formData.Pays}
              onChange={(e) =>
                setFormData({ ...formData, Pays: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="avatar">Avatar</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="text"
              id="avatar"
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="photo">Photo</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="text"
              id="photo"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="MotDePasse">Mot de passe</label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="password"
              id="MotDePasse"
              placeholder="Mot de passe"
              value={formData.MotDePasse}
              onChange={(e) =>
                setFormData({ ...formData, MotDePasse: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group w-[370px] flex flex-col gap-2">
            <label htmlFor="confirmationMotDePasse">
              Confirmer le mot de passe
            </label>
            <input
            className="p-2 border border-slate-300 rounded-xl focus:outline-none focus:border-blue-400"
              type="password"
              id="confirmationMotDePasse"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmationMotDePasse}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmationMotDePasse: e.target.value,
                })
              }
              required
            />
          </div>
        </div>
        <button type="submit" className="w-full hover:opacity-70 text-center mt-7 mb-2 bg-slate-950 text-white py-4 rounded-xl">Créer un compte</button>
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <div className="login-link">
          <p>
            Vous avez déjà un compte ? <a href="/" className="text-orange-500">Connectez-vous ici</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
