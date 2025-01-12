import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const NavigationBar = () => {
  const user = useSelector((state) => state.user);

  const linkColor = user?.couleur || "#999";

  // const [hovered, setHovered] = useState(null);

  // const handleMouseEnter = (index) => setHovered(index);
  // const handleMouseLeave = () => setHovered(null);

  return (
    //     <nav style={navStyle}>
    //       <NavLink
    //         to="/accueil"
    //         style={{ ...navlinkStyle, color: linkColor }}
    //         onMouseEnter={() => handleMouseEnter(0)}
    //         onMouseLeave={handleMouseLeave}
    //       >
    //         Accueil
    //         {hovered === 0 && <span style={hoverLineStyle(linkColor)} />}
    //       </NavLink>
    //       <NavLink
    //         to="/voir-mon-profile"
    //         style={{ ...navlinkStyle, color: linkColor }}
    //         onMouseEnter={() => handleMouseEnter(1)}
    //         onMouseLeave={handleMouseLeave}
    //       >
    //         Voir Mon Profile
    //         {hovered === 1 && <span style={hoverLineStyle(linkColor)} />}
    //       </NavLink>
    //       {user?.authentifie && user?.admin && (
    //         <NavLink
    //           to="/liste-utilisateurs"
    //           style={{ ...navlinkStyle, color: linkColor }}
    //           onMouseEnter={() => handleMouseEnter(2)}
    //           onMouseLeave={handleMouseLeave}
    //         >
    //           Liste Utilisateurs
    //           {hovered === 2 && <span style={hoverLineStyle(linkColor)} />}
    //         </NavLink>
    //       )}
    //       {user?.authentifie && user?.admin && (
    //         <NavLink
    //           to="/ajouter-utilisateur"
    //           style={{ ...navlinkStyle, color: linkColor }}
    //           onMouseEnter={() => handleMouseEnter(3)}
    //           onMouseLeave={handleMouseLeave}
    //         >
    //           Ajouter Utilisateur
    //           {hovered === 3 && <span style={hoverLineStyle(linkColor)} />}
    //         </NavLink>
    //       )}
    //       <NavLink
    //         to="/modifier-couleur"
    //         style={{ ...navlinkStyle, color: linkColor }}
    //         onMouseEnter={() => handleMouseEnter(4)}
    //         onMouseLeave={handleMouseLeave}
    //       >
    //         Modifier Couleur
    //         {hovered === 4 && <span style={hoverLineStyle(linkColor)} />}
    //       </NavLink>
    //       {user?.authentifie && !user?.admin && (
    //         <NavLink
    //           to="/ajouter-demande"
    //           style={{ ...navlinkStyle, color: linkColor }}
    //           onMouseEnter={() => handleMouseEnter(5)}
    //           onMouseLeave={handleMouseLeave}
    //         >
    //           Ajouter une demande
    //           {hovered === 5 && <span style={hoverLineStyle(linkColor)} />}
    //         </NavLink>
    //       )}
    //       {user?.authentifie && !user?.admin && (
    //         <NavLink
    //           to="/liste-des-demandes"
    //           style={{ ...navlinkStyle, color: linkColor }}
    //           onMouseEnter={() => handleMouseEnter(6)}
    //           onMouseLeave={handleMouseLeave}
    //         >
    //           Voir mes demandes
    //           {hovered === 6 && <span style={hoverLineStyle(linkColor)} />}
    //         </NavLink>
    //       )}

    // {user?.authentifie && user?.admin && (
    //         <NavLink
    //           to="/liste-pour-admin"
    //           style={{ ...navlinkStyle, color: linkColor }}
    //           onMouseEnter={() => handleMouseEnter(7)}
    //           onMouseLeave={handleMouseLeave}
    //         >
    //           Gestion des demandes
    //           {hovered === 7 && <span style={hoverLineStyle(linkColor)} />}
    //         </NavLink>
    //       )}
    //     </nav>
    <ul className="relative flex items-center justify-center gap-3">
      <li className="nav-item">
        <NavLink
          to="/accueil"
          style={({ isActive }) => ({
            background: isActive && linkColor,
            color: isActive ? "#000" : linkColor,
          })}
          // style={{ color: linkColor }}
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
      )}
      {user?.authentifie && user?.admin && (
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
      )}
      {user?.authentifie && !user?.admin && (
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
    </ul>
  );
};

// const navStyle = {
//   backgroundColor:'#ffffff',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   padding: '10px 20px',
//   marginBottom: '20px',
//   borderRadius: '8px',
// };

// const navlinkStyle = {
//   fontSize: '16px',
//   textDecoration: 'none',
//   margin: '0 15px',
//   padding: '8px 16px',
//   borderRadius: '4px',
//   position: 'relative',
//   transition: 'all 0.3s ease',
// };

// const hoverLineStyle = (color) => ({
//   content: '""',
//   position: "absolute",
//   bottom: "-2px",
//   left: "0",
//   width: "100%",
//   height: "2px",
//   backgroundColor: color,
//   transition: "all 0.3s ease",
// });

export default NavigationBar;
