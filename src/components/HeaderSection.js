import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { FaUserAlt, FaSignOutAlt } from "react-icons/fa"; // Importation des icônes
import React, { useEffect, useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import { IoMdLogOut } from "react-icons/io";
import GradientText from "./ui-components/GradientText";

const HeaderSection = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 || window.location.pathname !== "/") {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    // <header
    //   style={{
    //     display: 'flex',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     backgroundColor: user.couleur || 'lightgray',
    //     padding: '10px 20px',
    //     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    //   }}
    // >
    //   <img
    //     src="image.png"
    //     alt="logo"
    //     style={{
    //       maxWidth: '100%',
    //       height: 'auto',
    //       width: '200px',
    //       height: '160px',
    //     }}
    //   />
    //   {user.authentifie && (
    //     <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
    //       <p
    //         style={{
    //           fontSize: '18px',
    //           fontWeight: 'bold',
    //           color: '#333',
    //         }}
    //       >
    //         <FaUserAlt style={{ marginRight: '10px' }} />
    //         Bienvenue, {user.prenom} {user.nom}
    //       </p>
    //       <button
    //         onClick={handleLogout}
    //         style={{
    //           backgroundColor: '#f44336',
    //           color: 'white',
    //           border: 'none',
    //           padding: '10px 20px',
    //           fontSize: '16px',
    //           cursor: 'pointer',
    //           borderRadius: '5px',
    //           transition: 'background-color 0.3s ease',
    //           display: 'flex',
    //           alignItems: 'center',
    //           gap: '10px',
    //         }}
    //         onMouseEnter={(e) => (e.target.style.backgroundColor = '#d32f2f')}
    //         onMouseLeave={(e) => (e.target.style.backgroundColor = '#f44336')}
    //       >
    //         <FaSignOutAlt /> Se Déconnecter
    //       </button>
    //     </div>
    //   )}
    // </header>
    <header
      className={`header mb-8 w-full h-24 flex items-center z-40 bg-white shadow-md`}
    >
      <nav className="w-full px-4 lg:px-0 lg:w-[1200px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="logo w-28 h-14 md:w-40 md:h-24">
            <img
              src="image.png"
              className="w-full h-full object-cover"
              alt="logo"
            />
          </div>

          {/* Desktop menu */}
          {/* <div className="hidden lg:block nav-menu"> */}
          {/* <NavigationBar/> */}
          {/* <ul className="flex items-center justify-center gap-5 text-[14px] xl:text-[16px]"> */}
          {/* {guestRoutes.map((route,i)=>(
                <li className="nav-item" key={i}>
                <NavLink
                  className="inline-block capitalize font-[500] rounded-xl text-slate-800 hover:bg-btn-gradient hover:rounded-xl hover:text-white transition ease-linear px-5 py-2"
                  to={`${route?.index ? `/`:`${route.path}`}`}
                >
                  {route.name}
                </NavLink>
              </li>
              ))} */}

          {/* </ul> */}
          {/* </div> */}
        </div>
        <div className="center-content">
          <GradientText
            colors={["#333", "#4079ff", "green", "#4079ff", "green"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class"
          >
            {user?.authentifie && `Bienvenue, ${user.prenom} ${user.nom}`}
          </GradientText>
        </div>
        {/* Buttons for Sign In and My Events (Visible on both desktop and mobile) */}
        <div className="lg:flex items-center gap-5 hidden text-[14px] xl:text-[16px]">
          {/* Sign In Button */}
          {/* <Link to='/auth' className="xl:h-10 xl:w-32 h-10 w-28 flex items-center justify-center bg-btn-gradient rounded-xl text-slate-800 group relative">
            <span>Sign In</span>
            <div class="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </Link> */}

          {/* My Events Button */}

          {user?.authentifie ? (
            <button
              onClick={handleLogout}
              className="group relative overflow-hidden h-12 w-52 bg-red-700 rounded-xl text-white"
            >
              <span className="flex items-center gap-2 justify-center">
                <IoMdLogOut /> Se Déconnecter
              </span>
              <div class="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </button>
          ) : (
            <Link
              to="/"
              className="group relative overflow-hidden flex justify-center items-center h-12 w-40 bg-slate-800 rounded-xl text-white"
            >
              <span className="flex items-center gap-2 justify-center">
                Login
              </span>
              <div class="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
            </Link>
          )}
        </div>

        {/* Mobile menu toggle (Hamburger on the right) */}
        <div className="lg:hidden flex items-center gap-3">
          {/* Sign In Button for Mobile */}
          {/* <Link to='/auth' className="h-9 w-20 text-[12px] flex items-center justify-center bg-btn-gradient rounded-xl text-white">
            <span>Sign In</span>
          </Link> */}

          {/* My Events Button for Mobile */}
          {/* <button className="h-9 w-24 text-[12px] flex items-center gap-2 justify-center bg-btn-gradient rounded-xl text-white">
            <FaCalendarAlt /> <span> My Events </span>
          </button> */}

          {/* Hamburger Menu Icon */}
          <button
            onClick={toggleMenu}
            className="text-2xl text-slate-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden ${
          isMenuOpen ? "block" : "hidden"
        } absolute top-24 left-0 w-full bg-white shadow-lg z-50`}
      >
        <ul className="flex flex-col items-center gap-5 py-5">
          <li>
            <a
              className="block px-6 py-2 text-slate-800 font-[500]"
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="block px-6 py-2 text-slate-800 font-[500]"
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </a>
          </li>
          <li>
            <a
              className="block px-6 py-2 text-slate-800 font-[500]"
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              Promotions
            </a>
          </li>
          <li>
            <a
              className="block px-6 py-2 text-slate-800 font-[500]"
              href="#"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default HeaderSection;
