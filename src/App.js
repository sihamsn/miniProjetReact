import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/login";
import CreateAccount from "./components/CreateAccount";
import ModifierCouleur from "./components/ModifierCouleur";
import Accueil from "./components/Accueil";
import Profile from "./components/Profile";
import AjouterUtilisateur from "./components/AjouterUtilisateur";
import ListeUtilisateurs from "./components/ListeUtilisateurs";
import ModifierUtilisateur from "./components/ModifierUtilisateur";
import AjouterDemande from "./components/AjouterDemande";
import ListeDesDemandes from "./components/ListeDesDemandes";
import ListeDemandesAdmin from "./components/ListeDemandesAdmin";
import "./App.css";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import AboutUs from "./components/AboutUs";
const App = () => {
  const user = useSelector((state) => state.user);
  const isAuthenticated = user?.authentifie;
  return (
    <Router>
      <Routes>
        {/* Routes sans layout */}
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />

        {/* Routes avec layout */}
        <Route path="/" element={<Layout />}>
          <Route path="accueil" element={<Accueil />} />
          <Route
            path="modifier-couleur"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ModifierCouleur />
              </ProtectedRoute>
            }
          />
          <Route
            path="voir-mon-profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="ajouter-utilisateur"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AjouterUtilisateur />
              </ProtectedRoute>
            }
          />
          <Route
            path="liste-utilisateurs"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ListeUtilisateurs />
              </ProtectedRoute>
            }
          />
          <Route
            path="modifier-utilisateur/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ModifierUtilisateur />
              </ProtectedRoute>
            }
          />
          <Route
            path="ajouter-demande"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AjouterDemande />
              </ProtectedRoute>
            }
          />
          <Route
            path="liste-des-demandes"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ListeDesDemandes />
              </ProtectedRoute>
            }
          />
          <Route
            path="liste-pour-admin"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ListeDemandesAdmin />
              </ProtectedRoute>
            }
          />
        <Route
            path="aboutus"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <AboutUs/>
              </ProtectedRoute>
            }
          />
        
        </Route>
        
      </Routes>
    </Router>
  );
};

export default App;
