import React from "react";

const AboutUs = () => {
  const teamPhotos = [
    { src: "fatima.jpg", name: "Fatima Zahra", role: "Directrice Générale" },
    { src: "ahmed.jpg", name: "Ahmed", role: "Directeur Technique" },
    { src: "ilham.jpg", name: "Ilham", role: "Product Manager" },
    { src: "mohamed.jpg", name: "Mohamed", role: "Lead Developer" },
  ];

  return (
    <div className="bg-white py-16 px-5">
      {/* En-tête avec photo et texte côte à côte */}
      <div className="max-w-6xl mx-auto mb-16 animate-fade-in">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Photo à gauche */}
          <div className="w-full md:w-1/3">
            <img
              src="/aboutus.png" // Remplacez par le chemin de votre photo
              alt="À propos de Fauget Software"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          {/* Texte à droite */}
          <div className="w-full md:w-1/1">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              À propos de <span className="text-gray-800">Fauget Software</span>
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Fauget Software est une entreprise spécialisée dans le développement web,
              mettant l'<span className="font-semibold">innovation</span> et l'<span className="font-semibold">excellence</span> au cœur de ses solutions.
              Nous créons des sites web performants, des applications intuitives
              et des plateformes personnalisées qui répondent aux besoins spécifiques de nos clients.
              Notre mission est de simplifier la transformation numérique en combinant expertise technique,
              design moderne et technologies de pointe.
            </p>
          </div>
        </div>
      </div>

      {/* Section Vision et Mission */}
      <div className="max-w-6xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Vision</h2>
          <p className="text-gray-700 text-lg">
            Créer un environnement de travail transparent et efficace grâce à
            des outils numériques performants et accessibles.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Mission</h2>
          <p className="text-gray-700 text-lg">
            Offrir une plateforme intuitive pour gérer les demandes de congés,
            adaptée aux besoins des entreprises modernes.
          </p>
        </div>
      </div>

      {/* Section Vidéo */}
      <div className="max-w-6xl mx-auto mb-16 animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Témoignage d'un employé</h2>
        <div className="flex justify-center">
          <video
            controls
            className="w-full max-w-2xl rounded-lg shadow-lg"
            poster="/thumbnail.png" // Remplacez par une miniature de la vidéo si nécessaire
          >
            <source src="/expert.mp4" type="video/mp4" /> {/* Remplacez par le chemin de votre vidéo */}
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </div>
      </div>

      {/* Photos d'équipe */}
      <div className="max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">Notre Équipe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamPhotos.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300"
            >
              <img
                src={member.src}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full mb-6 object-cover shadow-md hover:scale-105 transition duration-300"
              />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">{member.name}</h3>
              <p className="text-gray-600 text-lg">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Styles et animations intégrés */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in {
            animation: fadeIn 1s ease-in-out;
          }

          .animate-fade-in-up {
            animation: fadeInUp 1s ease-in-out;
          }
        `}
      </style>
    </div>
  );
};

export default AboutUs;