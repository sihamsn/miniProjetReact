import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaBars, FaTimes } from "react-icons/fa"; // Import des icônes

const NavigationBar = () => {
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'affichage du menu mobile

  const linkColor = user?.couleur || "#999";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Fonction pour basculer l'état du menu

  return (
    <nav className="relative">
      {/* Mobile menu toggle (Hamburger on the right) */}
      <div className="lg:hidden flex items-center justify-end gap-3">
        <button
          onClick={toggleMenu}
          className="text-2xl text-slate-800"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop menu */}
      <ul className="hidden lg:flex lg:items-center lg:gap-3 lg:justify-center">
        <li className="nav-item">
          <NavLink
            to="/accueil"
            style={({ isActive }) => ({
              background: isActive && linkColor,
              color: isActive ? "#000" : linkColor,
            })}
            className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
          >
            Accueil
          </NavLink>
        </li>
        {user?.authentifie && (
          <li className="nav-item">
            <NavLink
              to="/voir-mon-profile"
              style={({ isActive }) => ({
                background: isActive && linkColor,
                color: isActive ? "#000" : linkColor,
              })}
              className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
            >
              Voir Mon Profile
            </NavLink>
          </li>
        )}
        {user?.authentifie && user?.admin && (
          <>
            <li className="nav-item">
              <NavLink
                to="/liste-utilisateurs"
                style={({ isActive }) => ({
                  background: isActive && linkColor,
                  color: isActive ? "#000" : linkColor,
                })}
                className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
              >
                Liste Utilisateurs
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ajouter-utilisateur"
                style={({ isActive }) => ({
                  background: isActive && linkColor,
                  color: isActive ? "#000" : linkColor,
                })}
                className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
              >
                Ajouter Utilisateur
              </NavLink>
            </li>
          </>
        )}
        {user?.authentifie && (
          <li className="nav-item">
            <NavLink
              to="/modifier-couleur"
              style={({ isActive }) => ({
                background: isActive && linkColor,
                color: isActive ? "#000" : linkColor,
              })}
              className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
            >
              Modifier Couleur
            </NavLink>
          </li>
        )}
        {user?.authentifie && !user?.admin && (
          <>
            <li className="nav-item">
              <NavLink
                to="/ajouter-demande"
                style={({ isActive }) => ({
                  background: isActive && linkColor,
                  color: isActive ? "#000" : linkColor,
                })}
                className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
              >
                Ajouter une demande
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/liste-des-demandes"
                style={({ isActive }) => ({
                  background: isActive && linkColor,
                  color: isActive ? "#000" : linkColor,
                })}
                className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
              >
                Voir mes demandes
              </NavLink>
            </li>
          </>
        )}
        {user?.authentifie && user?.admin && (
          <li className="nav-item">
            <NavLink
              to="/liste-pour-admin"
              style={({ isActive }) => ({
                background: isActive && linkColor,
                color: isActive ? "#000" : linkColor,
              })}
              className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
            >
              Gestion des demandes
            </NavLink>
          </li>
        )}
        {user?.authentifie && (
          <li className="nav-item">
            <NavLink
              to="/aboutus"
              style={({ isActive }) => ({
                background: isActive && linkColor,
                color: isActive ? "#000" : linkColor,
              })}
              className="inline-block capitalize text-sm font-[500] rounded-xl hover:rounded-xl hover:transform hover:scale-110 transition ease-linear px-5 py-2"
            >
              À propos de nous
            </NavLink>
          </li>
        )}
      </ul>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${isMenuOpen ? "block" : "hidden"} absolute top-24 left-0 w-full bg-white shadow-lg z-50`}
      >
        <ul className="flex flex-col items-center justify-center gap-5 py-5">
          <li>
            <NavLink
              to="/accueil"
              onClick={() => setIsMenuOpen(false)}
              className="block px-6 py-2 text-slate-800 font-[500]"
            >
              Accueil
            </NavLink>
          </li>

          {user?.authentifie && (
            <li>
              <NavLink
                to="/voir-mon-profile"
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-2 text-slate-800 font-[500]"
              >
                Voir Mon Profile
              </NavLink>
            </li>
          )}

          {user?.authentifie && user?.admin && (
            <>
              <li>
                <NavLink
                  to="/liste-utilisateurs"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-2 text-slate-800 font-[500]"
                >
                  Liste Utilisateurs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/ajouter-utilisateur"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-2 text-slate-800 font-[500]"
                >
                  Ajouter Utilisateur
                </NavLink>
              </li>
            </>
          )}

          {user?.authentifie && (
            <li>
              <NavLink
                to="/modifier-couleur"
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-2 text-slate-800 font-[500]"
              >
                Modifier Couleur
              </NavLink>
            </li>
          )}

          {user?.authentifie && !user?.admin && (
            <>
              <li>
                <NavLink
                  to="/ajouter-demande"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-2 text-slate-800 font-[500]"
                >
                  Ajouter une demande
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/liste-des-demandes"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-6 py-2 text-slate-800 font-[500]"
                >
                  Voir mes demandes
                </NavLink>
              </li>
            </>
          )}

          {user?.authentifie && user?.admin && (
            <li>
              <NavLink
                to="/liste-pour-admin"
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-2 text-slate-800 font-[500]"
              >
                Gestion des demandes
              </NavLink>
            </li>
          )}

          {user?.authentifie && (
            <li>
              <NavLink
                to="/aboutus"
                onClick={() => setIsMenuOpen(false)}
                className="block px-6 py-2 text-slate-800 font-[500]"
              >
                À propos de nous
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
