import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequestsAsync, cancelRequestAsync } from '../redux/demandSlice';

const ListeDesDemandes = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user?.id); 
  const requests = useSelector((state) => state.demands.requests); 
  const isLoading = useSelector((state) => state.demands.isLoading);
  const error = useSelector((state) => state.demands.error);

  const user = useSelector((state) => state.user);
  const primaryColor = user?.couleur || '#007BFF'; 

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserRequestsAsync(userId)); 
    }
  }, [dispatch, userId]);

  const handleCancelRequest = (requestId) => {
    console.log(`Tentative d'annulation de la demande avec ID: ${requestId} pour l'utilisateur ID: ${userId}`);
    if (window.confirm("Voulez-vous annuler cette demande ?")) {
      dispatch(cancelRequestAsync({ userId, requestId })); 
    }
  };

  if (isLoading) {
    return <p className="text-center">Chargement...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erreur : {error}</p>;
  }

  return (
    <div className="max-w-[600px] mx-auto my-5 p-5 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-5">Mes demandes</h2>
      {requests.length === 0 ? (
        <p className="text-center">Aucune demande trouvée.</p>
      ) : (
        <div>
        
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-3" style={{ color: primaryColor }}>
              Demandes en attente
            </h3>
            {requests.filter((request) => request.status === 'En attente').length > 0 ? (
              requests
                .filter((request) => request.status === 'En attente')
                .map((request) => (
                  <div key={request.id} className="p-4 border border-gray-200 rounded-lg mb-3 bg-white">
                    <h4 className="font-bold">{request.title}</h4>
                    <p className="text-gray-700">{request.description}</p>
                    <p className="text-gray-600">Du {request.startDate} au {request.endDate}</p>
                    <p className="text-gray-600">Status: {request.status}</p>
                    <button
                      onClick={() => handleCancelRequest(request.id)}
                      className="mt-2 px-4 py-2 text-white rounded-md transition-all duration-300 hover:bg-blue-700"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Annuler la demande
                    </button>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">Aucune demande en attente.</p>
            )}
          </div>

      
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-3" style={{ color: primaryColor }}>
              Demandes approuvées
            </h3>
            {requests.filter((request) => request.status === 'Approuvée').length > 0 ? (
              requests
                .filter((request) => request.status === 'Approuvée')
                .map((request) => (
                  <div key={request.id} className="p-4 border border-gray-200 rounded-lg mb-3 bg-white">
                    <h4 className="font-bold">{request.title}</h4>
                    <p className="text-gray-700">{request.description}</p>
                    <p className="text-gray-600">Du {request.startDate} au {request.endDate}</p>
                    <p className="text-gray-600">Status: {request.status}</p>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">Aucune demande approuvée.</p>
            )}
          </div>

      
          <div className="mb-5">
            <h3 className="text-xl font-semibold mb-3" style={{ color: primaryColor }}>
              Demandes rejetées
            </h3>
            {requests.filter((request) => request.status === 'Rejetée').length > 0 ? (
              requests
                .filter((request) => request.status === 'Rejetée')
                .map((request) => (
                  <div key={request.id} className="p-4 border border-gray-200 rounded-lg mb-3 bg-white">
                    <h4 className="font-bold">{request.title}</h4>
                    <p className="text-gray-700">{request.description}</p>
                    <p className="text-gray-600">Du {request.startDate} au {request.endDate}</p>
                    <p className="text-gray-600">Status: {request.status}</p>
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">Aucune demande rejetée.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ListeDesDemandes;