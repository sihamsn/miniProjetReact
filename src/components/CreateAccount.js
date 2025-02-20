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
        backgroundImage: "url('/arriereplan.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="p-5"
    >

      <form
        className="w-full max-w-4xl bg-white shadow-sm p-8 border border-slate-200 rounded-lg mx-4"
        onSubmit={handleSubmit}
      >

        <h1 className="text-2xl text-center text-black my-4 font-semibold text-slate-700">
          Créer un compte
        </h1>
        <div className="inputs grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="form-group flex flex-col gap-1">
            <label htmlFor="nom" className="text-black"> 
              Nom
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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
          <div className="form-group flex flex-col gap-1">
            <label htmlFor="prenom" className="text-black"> 
              Prénom
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="pseudo" className="text-black"> 
              Pseudo
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="email" className="text-black"> 
              Email
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="couleur" className="text-black"> 
              Couleur préférée
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="age" className="text-black">
              Âge
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="Devise" className="text-black">
              Devise
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="Pays" className="text-black"> 
              Pays
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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
          <div className="form-group flex flex-col gap-1">
            <label htmlFor="avatar" className="text-black">
              Avatar
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
              type="text"
              id="avatar"
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="photo" className="text-black"> 
              Photo
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
              type="text"
              id="photo"
              onChange={(e) =>
                setFormData({ ...formData, photo: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="MotDePasse" className="text-black"> 
              Mot de passe
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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

          <div className="form-group flex flex-col gap-1">
            <label htmlFor="confirmationMotDePasse" className="text-black"> 
              Confirmer le mot de passe
            </label>
            <input
              className="p-2 border border-slate-300 rounded-md focus:outline-none focus:border-blue-300"
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
        <button
          type="submit"
          className="w-full hover:opacity-80 text-center mt-7 mb-2 bg-black text-white py-3 rounded-md transition-all" 
        >
          Créer un compte
        </button>
        {errors.length > 0 && (
          <ul className="text-red-500 text-sm mt-4">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <div className="login-link text-center mt-4">
          <p className="text-slate-600">
            Vous avez déjà un compte ?{" "}
            <a href="/" className="text-orange-500 hover:underline">
              Connectez-vous ici
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;