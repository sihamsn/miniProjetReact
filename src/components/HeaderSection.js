import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import { GrLogout } from "react-icons/gr";
import React, { useState, useEffect } from "react";
import GradientText from "./ui-components/GradientText";


const HeaderSection = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/";
  };

  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <header
      className={`header mb-8 w-full h-24 flex items-center z-40 bg-white shadow-md`}
    >
      <nav className="w-full px-4 lg:px-0 lg:w-[1200px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-5">
        <div className="logo w-32 h-16 md:w-40 md:h-20 lg:w-48 lg:h-24">
  <img
    src="fauget.png"
    className="w-full h-full object-cover"
    alt="logo"
  />
</div>

        </div>

 
        <div className="center-content flex flex-col lg:flex-row items-center gap-4">
          
          <GradientText
            colors={["#333", "#4079ff", "green", "#4079ff", "green"]}
            animationSpeed={3}
            showBorder={false}
            className="custom-class text-lg"
          >
            {user?.authentifie && `Bienvenue, ${user.prenom} ${user.nom}`}
          </GradientText>
        </div>


        <div className="flex items-center gap-4">
          {user?.authentifie && (
            <button
  onClick={handleLogout}
  className="group relative overflow-hidden bg-black rounded-xl text-white flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4"
>

  <span className="flex items-center gap-2 justify-center">
    <GrLogout />
    <span className="hidden sm:block">Se Déconnecter</span>
  </span>
  <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
</button>


          )}
        </div>
      </nav>
    </header>
  );
};

export default HeaderSection;
