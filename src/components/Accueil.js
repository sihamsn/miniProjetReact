import React from "react";
import { useSelector } from "react-redux";
import { ReactTyped } from "react-typed";
import SplitText from "./ui-components/SplitText";

const Accueil = () => {
  const user = useSelector((state) => state.user);
  const handleAnimationComplete = () => {
    console.log('Animation des lettres terminée !');
  };

  return (
    <div className="flex items-center justify-between p-10 font-roboto max-w-[1200px] mx-auto bg-gray-50 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
      {/* Section Texte */}
      <div className="flex-1 pr-5">
        <h1
          className="text-4xl font-bold mb-2 transition-all duration-300 hover:text-blue-500"
          style={{ color: user?.couleur || "#2c3e50" }}
        >
         
          {user?.authentifie && (
                <SplitText
                 text={`Bienvenue,${user.prenom} ${user.nom}`}
                 className="text-4xl font-semibold text-center"
                 delay={150}
                 animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                 animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                 easing="easeOutCubic"
                 threshold={0.2}
                 rootMargin="-50px"
                 onLetterAnimationComplete={handleAnimationComplete}
               />
         
          )}
        </h1>

        {/* Message selon le rôle */}
        {user?.admin ? (
          <div className="bg-green-500 text-white px-5 py-2 rounded-md mt-5 text-lg text-center transition-all duration-300 hover:bg-green-600">
            Bienvenue,Vous êtes connecté en tant qu'administrateur.
          </div>
        ) : (
          <p className="text-lg leading-relaxed text-gray-600 transition-all duration-300 hover:text-gray-800">
            Notre plateforme vous permet de gérer facilement vos demandes de
            congé ou d'absence pour maladie. Que vous soyez employé ou
            gestionnaire, accédez à des outils performants pour organiser vos
            absences en toute transparence.
          </p>
        )}
      </div>

      {/* Section Image */}
      <div>
        <img
          src="entreprise.png" // Remplacez par le chemin de votre image
          alt="Entreprise"
          className="w-[350px] h-auto rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
        />
      </div>
    </div>
  );
};

export default Accueil;