import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserRequestsAsyncAdmin, approveRequestAsync, rejectRequestAsync } from '../redux/demandSlice';
import { FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa'; 

const ListeDemandesAdmin = () => {
  const dispatch = useDispatch();
  const { isLoading, error, requests } = useSelector((state) => state.demands);
  const user = useSelector((state) => state.user);
  const [expandedRequestId, setExpandedRequestId] = useState(null); 

  useEffect(() => {
    dispatch(fetchUserRequestsAsyncAdmin());
  }, [dispatch]);

  const demandesEnAttente = requests?.filter((req) => req.status === 'En attente');
  const demandesApprouvees = requests?.filter((req) => req.status === 'Approuvée');
  const demandesRejetees = requests?.filter((req) => req.status === 'Rejetée');

  const handleReject = (userId, requestId) => {
    dispatch(rejectRequestAsync({ userId, requestId }));
  };

  const handleApprove = (userId, requestId) => {
    dispatch(approveRequestAsync({ userId, requestId }));
  };

  const toggleDetails = (id) => {
    if (expandedRequestId === id) {
      setExpandedRequestId(null); 
    } else {
      setExpandedRequestId(id); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gray-50 rounded-lg shadow-lg">
     
      <h1
        className="text-3xl font-bold text-center mb-8"
        style={{ color: user?.couleur || '#2c3e50' }} 
      >
        Gestion des Demandes
      </h1>

   
      {isLoading && <p className="text-center text-gray-600">Chargement des demandes...</p>}
      {error && <p className="text-center text-red-500 font-bold">Erreur : {error}</p>}

      {!isLoading && !error && (
        <div>
        
          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b-2"
              style={{ color: user?.couleur || '#16a085', borderColor: user?.couleur || '#16a085' }} 
            >
              Demandes en Attente
            </h2>
            {demandesEnAttente.length === 0 ? (
              <p className="text-center text-gray-500">Aucune demande en attente.</p>
            ) : (
              <table className="w-full mt-4">
                <thead>
                  <tr style={{ backgroundColor: user?.couleur || '#16a085' }} className="text-white">
                    <th className="p-3 text-left">Nom</th>
                    <th className="p-3 text-left">Titre</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {demandesEnAttente.map((request) => (
                    <React.Fragment key={request.id}>
                      <tr className="bg-white hover:bg-gray-100 transition-colors duration-200">
                        <td className="p-3 border-b">
                          <strong>{request.nom} {request.prenom}</strong>
                        </td>
                        <td className="p-3 border-b">{request.title}</td>
                        <td className="p-3 border-b flex gap-3">
                          <button
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                            style={{ color: user?.couleur || '#16a085' }}
                            onClick={() => handleApprove(request.userId, request.id)}
                          >
                            <FaCheck /> Approuver
                          </button>
                          <button
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                            style={{ color: user?.couleur || '#e74c3c' }} 
                            onClick={() => handleReject(request.userId, request.id)}
                          >
                            <FaTimes /> Rejeter
                          </button>
                          <button
                            className="flex items-center gap-2 hover:opacity-80 transition-opacity duration-200"
                            style={{ color: user?.couleur || '#3498db' }} 
                            onClick={() => toggleDetails(request.id)}
                          >
                            <FaInfoCircle /> Détails
                          </button>
                        </td>
                      </tr>
                      
                      {expandedRequestId === request.id && (
                        <tr>
                          <td colSpan="3" className="p-4 bg-gray-100">
                            <div className="space-y-2">
                              <p><strong>Nom :</strong> {request.nom} {request.prenom}</p>
                              <p><strong>Titre :</strong> {request.title}</p>
                              <p><strong>Description :</strong> {request.description}</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </section>

   
          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b-2"
              style={{ color: user?.couleur || '#16a085', borderColor: user?.couleur || '#16a085' }} 
            >
              Demandes Approuvées
            </h2>
            {demandesApprouvees.length === 0 ? (
              <p className="text-center text-gray-500">Aucune demande approuvée.</p>
            ) : (
              <table className="w-full mt-4">
                <tbody>
                  {demandesApprouvees.map((request) => (
                    <tr
                      key={request.id}
                      className="bg-white hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="p-3 border-b">
                        <strong>{request.nom} {request.prenom}</strong>
                      </td>
                      <td className="p-3 border-b">{request.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>


          <section className="mb-10">
            <h2
              className="text-2xl font-semibold mb-4 pb-2 border-b-2"
              style={{ color: user?.couleur || '#16a085', borderColor: user?.couleur || '#16a085' }} // Couleur dynamique
            >
              Demandes Rejetées
            </h2>
            {demandesRejetees.length === 0 ? (
              <p className="text-center text-gray-500">Aucune demande rejetée.</p>
            ) : (
              <table className="w-full mt-4">
                <tbody>
                  {demandesRejetees.map((request) => (
                    <tr
                      key={request.id}
                      className="bg-white hover:bg-gray-100 transition-colors duration-200"
                    >
                      <td className="p-3 border-b">
                        <strong>{request.nom} {request.prenom}</strong>
                      </td>
                      <td className="p-3 border-b">{request.title}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ListeDemandesAdmin;