import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './components/login';
import CreateAccount from './components/CreateAccount';
import ModifierCouleur from './components/ModifierCouleur';
import Accueil from './components/Accueil';
import Profile from './components/Profile';
import AjouterUtilisateur from './components/AjouterUtilisateur';
import ListeUtilisateurs from './components/ListeUtilisateurs';
import ModifierUtilisateur from './components/ModifierUtilisateur';
import AjouterDemande from './components/AjouterDemande';
import ListeDesDemandes from './components/ListeDesDemandes';
import ListeDemandesAdmin from './components/ListeDemandesAdmin';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Routes sans layout */}
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />

        {/* Routes avec layout */}
        <Route path="/" element={<Layout />}>
          <Route path="accueil" element={<Accueil />} />
          <Route path="modifier-couleur" element={<ModifierCouleur />} />
          <Route path="voir-mon-profile" element={<Profile />} />
          <Route path="ajouter-utilisateur" element={<AjouterUtilisateur />} />
          <Route path="liste-utilisateurs" element={<ListeUtilisateurs />} />
          <Route path="modifier-utilisateur/:id" element={<ModifierUtilisateur />} />
          <Route path="ajouter-demande" element={<AjouterDemande />} />
          <Route path="liste-des-demandes" element={<ListeDesDemandes />} />
          <Route path="liste-pour-admin" element={<ListeDemandesAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
